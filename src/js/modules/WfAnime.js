(function (window, document) {
  "use strict";

  /**
   * WfAnime - Sistema de Animações Avançadas
   * v3.0 - WEBFULL v1.0 - Refatorado para CSS externo e convenções padronizadas
   */

  class WfAnime {
    /**
     * Cria uma instância de WfAnime para animar um elemento container.
     * @param {HTMLElement|string} container - Elemento DOM ou seletor CSS do container.
     * @param {Object} options - Opções de configuração da animação.
     * @param {string} options.animationType - Tipo de animação ('fade', 'fadeIn', 'fadeLeft', 'fadeRight', 'fadeTop', 'fadeBottom', 'zoom', 'rotate', 'bounce', 'slide', 'flip').
     * @param {string} options.speed - Velocidade da animação ('PP', 'P', 'M', 'G', 'GG', 'XG').
     * @param {number} options.distancePx - Distância em pixels para animações de translação.
     * @param {string} options.rootMargin - Margem para o IntersectionObserver.
     * @param {number} options.threshold - Limiar para o IntersectionObserver.
     * @param {function} options.onAnimationStart - Função callback chamada no início da animação.
     * @param {function} options.onAnimationEnd - Função callback chamada no fim da animação.
     */
    constructor(container, options = {}) {
      if (typeof container === "string") {
        this.container = document.querySelector(container);
      } else {
        this.container = container;
      }
      if (!this.container) {
        if (
          window &&
          (location.hostname === "localhost" ||
            location.hostname === "127.0.0.1")
        ) {
          console.warn("WfAnime: container element not found.");
        }
        return;
      }

      this.loadCSS();

      // Extrair opções dos atributos HTML se disponíveis
      const htmlOptions = this.extractHtmlOptions();

      this.options = Object.assign(
        {
          animationType: "fade",
          speed: "M",
          distancePx: 40,
          rootMargin: "0px 0px -6% 0px",
          threshold: 0,
          onAnimationStart: null,
          onAnimationEnd: null,
          loop: false,
          delay: 0,
          direction: "normal",
          fillMode: "forwards",
          easing: "ease-in-out",
          // If true, exit (out) animations will use a simple fade out instead of mirroring the entry
          simpleOut: true,
          // debounce time (ms) to stabilize intersection changes
          debounceMs: 80,
          // hysteresis thresholds for stable enter/exit (0-1)
          enterThreshold: 0.15,
          exitThreshold: 0.05,
        },
        htmlOptions,
        options
      );

      this.isAnimating = false;
      this.currentAnimation = null;

      // Mapeamento de velocidades para classes CSS
      this.speedClassMap = {
        XS: "wfanime-speedXS",
        PP: "wfanime-speedPP",
        P: "wfanime-speedP",
        M: "wfanime-speedM",
        G: "wfanime-speedG",
        GG: "wfanime-speedGG",
        XG: "wfanime-speedXG",
      };

      // Garantir que o elemento inicie em estado 'ready' (escondido) para evitar flash
      try {
        if (!this.container.classList.contains("wfanime-ready"))
          this.container.classList.add("wfanime-ready");
      } catch (e) {}

      // conjunto para rastrear classes aplicadas por esta instância (otimização)
      this._appliedClasses = new Set();

      this.init();
    }

    /**
     * Extrai opções dos atributos HTML do elemento
     */
    extractHtmlOptions() {
      const options = {};

      const getAttr = (name) =>
        this.container.hasAttribute(name)
          ? this.container.getAttribute(name)
          : null;

      const type = getAttr("WfAnime-type");
      if (type) options.animationType = String(type).trim();

      const speed = getAttr("WfAnime-speed");
      if (speed) options.speed = String(speed).trim().toUpperCase();

      const distanceAttr = getAttr("WfAnime-distance");
      if (distanceAttr !== null) {
        const distance = parseInt(distanceAttr, 10);
        if (!isNaN(distance)) options.distancePx = distance;
      }

      const delayAttr = getAttr("WfAnime-delay");
      if (delayAttr !== null) {
        const delay = parseInt(delayAttr, 10);
        if (!isNaN(delay)) options.delay = delay;
      }

      const loopAttr = getAttr("WfAnime-loop");
      if (loopAttr !== null)
        options.loop = String(loopAttr).toLowerCase() === "true";

      const dir = getAttr("WfAnime-direction");
      if (dir) options.direction = String(dir).trim();

      const fm = getAttr("WfAnime-fillMode");
      if (fm) options.fillMode = String(fm).trim();

      const ez = getAttr("WfAnime-easing");
      // Trigger mode: 'auto' (observer), 'click', 'hover', or 'manual'
      const trigger = getAttr("WfAnime-trigger");
      if (trigger) options.trigger = String(trigger).trim().toLowerCase();
      if (ez) options.easing = String(ez).trim();

      const enterAttr = getAttr("WfAnime-enter-threshold");
      if (enterAttr !== null) {
        const v = parseFloat(enterAttr);
        if (!isNaN(v)) options.enterThreshold = Math.max(0, Math.min(1, v));
      }

      const exitAttr = getAttr("WfAnime-exit-threshold");
      if (exitAttr !== null) {
        const v = parseFloat(exitAttr);
        if (!isNaN(v)) options.exitThreshold = Math.max(0, Math.min(1, v));
      }

      // Normalizações adicionais (speed fallback)
      if (options.speed) {
        const s = options.speed.toUpperCase();
        const allowed = ["PP", "P", "M", "G", "GG", "XG"];
        options.speed = allowed.includes(s) ? s : "M";
      }

      return options;
    }

    /**
     * Carrega o CSS do componente dinamicamente
     */
    loadCSS() {
      const cssId = "webfull-wfanime-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/**
 * WfAnime.css - Estilos do Sistema de Animações
 * SandroWeb - 2025
 */

/* ===== ANIMAÇÕES BÁSICAS ===== */
.wfanime-fadeInOnly {
   animation-name: wfanime-fadeInOnly;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-fadeOutOnly {
   animation-name: wfanime-fadeOutOnly;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-fadeIn {
   animation-name: wfanime-fadeIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-fadeOut {
   animation-name: wfanime-fadeOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

/* ===== ANIMAÇÕES DE DIREÇÃO ===== */
.wfanime-fadeLeftIn {
   animation-name: wfanime-fadeLeftIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateX(calc(var(--wfanime-distance, 20px) * -1));
}

.wfanime-fadeLeftOut {
   animation-name: wfanime-fadeLeftOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateX(0);
}

.wfanime-fadeRightIn {
   animation-name: wfanime-fadeRightIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateX(var(--wfanime-distance, 20px));
}

.wfanime-fadeRightOut {
   animation-name: wfanime-fadeRightOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateX(0);
}

.wfanime-fadeTopIn {
   animation-name: wfanime-fadeTopIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateY(calc(var(--wfanime-distance, 20px) * -1));
}

.wfanime-fadeTopOut {
   animation-name: wfanime-fadeTopOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateY(0);
}

.wfanime-fadeBottomIn {
   animation-name: wfanime-fadeBottomIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateY(var(--wfanime-distance, 20px));
}

.wfanime-fadeBottomOut {
   animation-name: wfanime-fadeBottomOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: translateY(0);
}

/* ===== ANIMAÇÕES DE ESCALA ===== */
.wfanime-zoomIn {
   animation-name: wfanime-zoomIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: scale(0.8);
}

.wfanime-zoomOut {
   animation-name: wfanime-zoomOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform: scale(1);
}

/* ===== ANIMAÇÕES DE ROTAÇÃO ===== */
.wfanime-rotateIn {
   animation-name: wfanime-rotateIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: center center;
   transform: rotate(-90deg);
}

.wfanime-rotateOut {
   animation-name: wfanime-rotateOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: center center;
   transform: rotate(0deg);
}

/* ===== VELOCIDADES ===== */
.wfanime-speedXS { --wfanime-duration: 0.1s; }
.wfanime-speedPP { --wfanime-duration: 0.25s; }
.wfanime-speedP { --wfanime-duration: 0.5s; }
.wfanime-speedM { --wfanime-duration: 1s; }
.wfanime-speedG { --wfanime-duration: 2s; }
.wfanime-speedGG { --wfanime-duration: 3s; }
.wfanime-speedXG { --wfanime-duration: 4s; }

/* ===== KEYFRAMES BÁSICOS ===== */
@keyframes wfanime-fadeInOnly {
   from { opacity: 0; }
   to { opacity: 1; }
}

@keyframes wfanime-fadeOutOnly {
   from { opacity: 1; }
   to { opacity: 0; }
}

@keyframes wfanime-fadeIn {
   from { opacity: 0; transform: translateY(var(--wfanime-distance, 20px)); }
   to { opacity: 1; transform: translateY(0); }
}

@keyframes wfanime-fadeOut {
   from { opacity: 1; transform: translateY(0); }
   to { opacity: 0; transform: translateY(calc(var(--wfanime-distance, 20px) * 2)); }
}

/* ===== KEYFRAMES DE DIREÇÃO ===== */
@keyframes wfanime-fadeLeftIn {
   from { opacity: 0; transform: translateX(calc(var(--wfanime-distance, 20px) * -1)); }
   to { opacity: 1; transform: translateX(0); }
}

@keyframes wfanime-fadeLeftOut {
   from { opacity: 1; transform: translateX(0); }
   to { opacity: 0; transform: translateX(calc(var(--wfanime-distance, 20px) * -2)); }
}

@keyframes wfanime-fadeRightIn {
   from { opacity: 0; transform: translateX(var(--wfanime-distance, 20px)); }
   to { opacity: 1; transform: translateX(0); }
}

@keyframes wfanime-fadeRightOut {
   from { opacity: 1; transform: translateX(0); }
   to { opacity: 0; transform: translateX(calc(var(--wfanime-distance, 20px) * 2)); }
}

@keyframes wfanime-fadeTopIn {
   from { opacity: 0; transform: translateY(calc(var(--wfanime-distance, 20px) * -1)); }
   to { opacity: 1; transform: translateY(0); }
}

@keyframes wfanime-fadeTopOut {
   from { opacity: 1; transform: translateY(0); }
   to { opacity: 0; transform: translateY(calc(var(--wfanime-distance, 20px) * -2)); }
}

@keyframes wfanime-fadeBottomIn {
   from { opacity: 0; transform: translateY(var(--wfanime-distance, 20px)); }
   to { opacity: 1; transform: translateY(0); }
}

@keyframes wfanime-fadeBottomOut {
   from { opacity: 1; transform: translateY(0); }
   to { opacity: 0; transform: translateY(calc(var(--wfanime-distance, 20px) * 2)); }
}

/* ===== KEYFRAMES DE ESCALA ===== */
@keyframes wfanime-zoomIn {
   from { opacity: 0; transform: scale(0.8); }
   to { opacity: 1; transform: scale(1); }
}

@keyframes wfanime-zoomOut {
   from { opacity: 1; transform: scale(1); }
   to { opacity: 0; transform: scale(0.8); }
}

/* ===== KEYFRAMES DE ROTAÇÃO ===== */
@keyframes wfanime-rotateIn {
   from { opacity: 0; transform: rotate(-90deg); }
   to { opacity: 1; transform: rotate(0deg); }
}

@keyframes wfanime-rotateOut {
   from { opacity: 1; transform: rotate(0deg); }
   to { opacity: 0; transform: rotate(90deg); }
}

/* ===== ANIMAÇÕES DE BOUNCE ===== */
.wfanime-bounceIn {
   animation-name: wfanime-bounceIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-bounceOut {
   animation-name: wfanime-bounceOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-bounceIn {
   0% { opacity: 0; transform: scale(0.3); }
   50% { opacity: 1; transform: scale(1.05); }
   70% { transform: scale(0.9); }
   100% { opacity: 1; transform: scale(1); }
}

@keyframes wfanime-bounceOut {
   0% { opacity: 1; transform: scale(1); }
   20% { transform: scale(0.9); }
   50% { opacity: 1; transform: scale(1.1); }
   100% { opacity: 0; transform: scale(0.3); }
}

/* ===== ANIMAÇÕES DE SLIDE ===== */
.wfanime-slideIn {
   animation-name: wfanime-slideIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideOut {
   animation-name: wfanime-slideOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-slideIn {
   0% { opacity: 0; transform: translateX(-100%); }
   100% { opacity: 1; transform: translateX(0); }
}

@keyframes wfanime-slideOut {
   0% { opacity: 1; transform: translateX(0); }
   100% { opacity: 0; transform: translateX(100%); }
}

/* ===== ANIMAÇÕES DE FLIP ===== */
.wfanime-flipIn {
   animation-name: wfanime-flipIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

.wfanime-flipOut {
   animation-name: wfanime-flipOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

@keyframes wfanime-flipIn {
   0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
   40% { transform: perspective(400px) rotateY(-20deg); }
   60% { transform: perspective(400px) rotateY(10deg); }
   80% { transform: perspective(400px) rotateY(-5deg); }
   100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
}

@keyframes wfanime-flipOut {
   0% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
   100% { transform: perspective(400px) rotateY(-90deg); opacity: 0; }
}

/* ===== ANIMAÇÕES DE PULSE ===== */
.wfanime-pulseIn {
   animation-name: wfanime-pulseIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-pulseOut {
   animation-name: wfanime-pulseOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-pulseIn {
   0% { transform: scale(1); }
   50% { transform: scale(1.05); }
   100% { transform: scale(1); }
}

@keyframes wfanime-pulseOut {
   0% { transform: scale(1); }
   50% { transform: scale(0.95); }
   100% { transform: scale(1); }
}

/* ===== ANIMAÇÕES DE RUBBER BAND ===== */
.wfanime-rubberBandIn {
   animation-name: wfanime-rubberBandIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-rubberBandOut {
   animation-name: wfanime-rubberBandOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-rubberBandIn {
   0% { transform: scale(1); }
   30% { transform: scaleX(1.25) scaleY(0.75); }
   40% { transform: scaleX(0.75) scaleY(1.25); }
   50% { transform: scaleX(1.15) scaleY(0.85); }
   65% { transform: scaleX(0.95) scaleY(1.05); }
   75% { transform: scaleX(1.05) scaleY(0.95); }
   100% { transform: scale(1); }
}

@keyframes wfanime-rubberBandOut {
   0% { transform: scale(1); }
   30% { transform: scaleX(1.25) scaleY(0.75); }
   40% { transform: scaleX(0.75) scaleY(1.25); }
   50% { transform: scaleX(1.15) scaleY(0.85); }
   65% { transform: scaleX(0.95) scaleY(1.05); }
   75% { transform: scaleX(1.05) scaleY(0.95); }
   100% { transform: scale(0); }
}

/* ===== ANIMAÇÕES DE SHAKE ===== */
.wfanime-shakeIn {
   animation-name: wfanime-shakeIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-shakeOut {
   animation-name: wfanime-shakeOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-shakeIn {
   0%, 100% { transform: translateX(0); }
   10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
   20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes wfanime-shakeOut {
   0%, 100% { transform: translateX(0); }
   10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
   20%, 40%, 60%, 80% { transform: translateX(10px); }
}

/* ===== ANIMAÇÕES DE WOBBLE ===== */
.wfanime-wobbleIn {
   animation-name: wfanime-wobbleIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-wobbleOut {
   animation-name: wfanime-wobbleOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-wobbleIn {
   0% { transform: translateX(0%); }
   15% { transform: translateX(-25%) rotate(-5deg); }
   30% { transform: translateX(20%) rotate(3deg); }
   45% { transform: translateX(-15%) rotate(-3deg); }
   60% { transform: translateX(10%) rotate(2deg); }
   75% { transform: translateX(-5%) rotate(-1deg); }
   100% { transform: translateX(0%); }
}

@keyframes wfanime-wobbleOut {
   0% { transform: translateX(0%); }
   15% { transform: translateX(-25%) rotate(-5deg); }
   30% { transform: translateX(20%) rotate(3deg); }
   45% { transform: translateX(-15%) rotate(-3deg); }
   60% { transform: translateX(10%) rotate(2deg); }
   75% { transform: translateX(-5%) rotate(-1deg); }
   100% { transform: translateX(100%); }
}

/* ===== ANIMAÇÕES DE TADA ===== */
.wfanime-tadaIn {
   animation-name: wfanime-tadaIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-tadaOut {
   animation-name: wfanime-tadaOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-tadaIn {
   0% { transform: scale(1); }
   10%, 20% { transform: scale(0.9) rotate(-3deg); }
   30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
   40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
   100% { transform: scale(1) rotate(0deg); }
}

@keyframes wfanime-tadaOut {
   0% { transform: scale(1); }
   10%, 20% { transform: scale(0.9) rotate(-3deg); }
   30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
   40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
   100% { transform: scale(0) rotate(0deg); }
}

/* ===== ANIMAÇÕES DE ROLL ===== */
.wfanime-rollIn {
   animation-name: wfanime-rollIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-rollOut {
   animation-name: wfanime-rollOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-rollIn {
   0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }
   100% { opacity: 1; transform: translateX(0) rotate(0deg); }
}

@keyframes wfanime-rollOut {
   0% { opacity: 1; transform: translateX(0) rotate(0deg); }
   100% { opacity: 0; transform: translateX(100%) rotate(120deg); }
}

/* ===== ANIMAÇÕES DE LIGHT SPEED ===== */
.wfanime-lightSpeedIn {
   animation-name: wfanime-lightSpeedIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-lightSpeedOut {
   animation-name: wfanime-lightSpeedOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-lightSpeedIn {
   0% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
   60% { transform: translateX(-20%) skewX(30deg); opacity: 1; }
   80% { transform: translateX(0%) skewX(-15deg); opacity: 1; }
   100% { transform: translateX(0%) skewX(0deg); opacity: 1; }
}

@keyframes wfanime-lightSpeedOut {
   0% { transform: translateX(0%) skewX(0deg); opacity: 1; }
   100% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
}

/* ===== ANIMAÇÕES DE HINGE ===== */
.wfanime-hingeIn {
   animation-name: wfanime-hingeIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: top left;
}

.wfanime-hingeOut {
   animation-name: wfanime-hingeOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: top left;
}

@keyframes wfanime-hingeIn {
   0% { transform: rotate(0); transform-origin: top left; animation-timing-function: ease-in-out; }
   20%, 60% { transform: rotate(80deg); transform-origin: top left; animation-timing-function: ease-in-out; }
   40% { transform: rotate(60deg); transform-origin: top left; animation-timing-function: ease-in-out; }
   80% { transform: rotate(15deg) translateY(0); transform-origin: top left; animation-timing-function: ease-out; }
   100% { transform: rotate(0deg) translateY(0); opacity:1; }
}

@keyframes wfanime-hingeOut {
   0% { transform: rotate(0); transform-origin: top left; animation-timing-function: ease-in-out; }
   20%, 60% { transform: rotate(80deg); transform-origin: top left; animation-timing-function: ease-in-out; }
   40% { transform: rotate(60deg); transform-origin: top left; animation-timing-function: ease-in-out; }
   80% { transform: rotate(60deg) translateY(0); transform-origin: top left; animation-timing-function: ease-out; }
   100% { transform: translateY(700px); opacity:0; }
}

/* ===== ANIMAÇÕES DE JACK IN THE BOX ===== */
.wfanime-jackInTheBoxIn {
   animation-name: wfanime-jackInTheBoxIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-jackInTheBoxOut {
   animation-name: wfanime-jackInTheBoxOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-jackInTheBoxIn {
   0% { opacity: 0; transform: scale(0.1) rotate(30deg); transform-origin: center bottom; }
   50% { transform: rotate(-10deg); }
   70% { transform: rotate(3deg); }
   100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

@keyframes wfanime-jackInTheBoxOut {
   0% { opacity: 1; transform: scale(1) rotate(0deg); transform-origin: center bottom; }
   100% { opacity: 0; transform: scale(0.1) rotate(30deg); }
}

/* ===== ANIMAÇÕES DE SWING ===== */
.wfanime-swingIn {
   animation-name: wfanime-swingIn;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: top center;
}

.wfanime-swingOut {
   animation-name: wfanime-swingOut;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-origin: top center;
}

@keyframes wfanime-swingIn {
   20% { transform: rotate(15deg); }
   40% { transform: rotate(-10deg); }
   60% { transform: rotate(5deg); }
   80% { transform: rotate(-5deg); }
   100% { transform: rotate(0deg); }
}

@keyframes wfanime-swingOut {
   20% { transform: rotate(15deg); }
   40% { transform: rotate(-10deg); }
   60% { transform: rotate(5deg); }
   80% { transform: rotate(-5deg); }
   100% { transform: rotate(90deg); }
}

/* ===== ANIMAÇÕES DE SLIDE DIRECIONAIS ===== */
.wfanime-slideInUp {
   animation-name: wfanime-slideInUp;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideOutUp {
   animation-name: wfanime-slideOutUp;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideInDown {
   animation-name: wfanime-slideInDown;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideOutDown {
   animation-name: wfanime-slideOutDown;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideInLeft {
   animation-name: wfanime-slideInLeft;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideOutLeft {
   animation-name: wfanime-slideOutLeft;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideInRight {
   animation-name: wfanime-slideInRight;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

.wfanime-slideOutRight {
   animation-name: wfanime-slideOutRight;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
}

@keyframes wfanime-slideInUp {
   0% { opacity: 0; transform: translateY(100%); }
   100% { opacity: 1; transform: translateY(0); }
}

@keyframes wfanime-slideOutUp {
   0% { opacity: 1; transform: translateY(0); }
   100% { opacity: 0; transform: translateY(-100%); }
}

@keyframes wfanime-slideInDown {
   0% { opacity: 0; transform: translateY(-100%); }
   100% { opacity: 1; transform: translateY(0); }
}

@keyframes wfanime-slideOutDown {
   0% { opacity: 1; transform: translateY(0); }
   100% { opacity: 0; transform: translateY(100%); }
}

@keyframes wfanime-slideInLeft {
   0% { opacity: 0; transform: translateX(-100%); }
   100% { opacity: 1; transform: translateX(0); }
}

@keyframes wfanime-slideOutLeft {
   0% { opacity: 1; transform: translateX(0); }
   100% { opacity: 0; transform: translateX(-100%); }
}

@keyframes wfanime-slideInRight {
   0% { opacity: 0; transform: translateX(100%); }
   100% { opacity: 1; transform: translateX(0); }
}

@keyframes wfanime-slideOutRight {
   0% { opacity: 1; transform: translateX(0); }
   100% { opacity: 0; transform: translateX(100%); }
}

/* ===== ANIMAÇÕES 3D FLIP ===== */
.wfanime-flipInX {
   animation-name: wfanime-flipInX;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

.wfanime-flipOutX {
   animation-name: wfanime-flipOutX;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

.wfanime-flipInY {
   animation-name: wfanime-flipInY;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

.wfanime-flipOutY {
   animation-name: wfanime-flipOutY;
   animation-fill-mode: forwards;
   animation-timing-function: ease-in-out;
   animation-duration: var(--wfanime-duration, 1s);
   transform-style: preserve-3d;
}

@keyframes wfanime-flipInX {
   0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
   40% { transform: perspective(400px) rotateX(-20deg); }
   60% { transform: perspective(400px) rotateX(10deg); }
   80% { transform: perspective(400px) rotateX(-5deg); }
   100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
}

@keyframes wfanime-flipOutX {
   0% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
   100% { transform: perspective(400px) rotateX(-90deg); opacity: 0; }
}

@keyframes wfanime-flipInY {
   0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
   40% { transform: perspective(400px) rotateY(-20deg); }
   60% { transform: perspective(400px) rotateY(10deg); }
   80% { transform: perspective(400px) rotateY(-5deg); }
   100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
}

@keyframes wfanime-flipOutY {
   0% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
   100% { transform: perspective(400px) rotateY(-90deg); opacity: 0; }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfanime-fadeInOnly,
   .wfanime-fadeOutOnly,
   .wfanime-fadeIn,
   .wfanime-fadeOut,
   .wfanime-fadeLeftIn,
   .wfanime-fadeLeftOut,
   .wfanime-fadeRightIn,
   .wfanime-fadeRightOut,
   .wfanime-fadeTopIn,
   .wfanime-fadeTopOut,
   .wfanime-fadeBottomIn,
   .wfanime-fadeBottomOut,
   .wfanime-zoomIn,
   .wfanime-zoomOut,
   .wfanime-rotateIn,
   .wfanime-rotateOut,
   .wfanime-bounceIn,
   .wfanime-bounceOut,
   .wfanime-slideIn,
   .wfanime-slideOut,
   .wfanime-flipIn,
   .wfanime-flipOut,
   .wfanime-pulseIn,
   .wfanime-pulseOut,
   .wfanime-rubberBandIn,
   .wfanime-rubberBandOut,
   .wfanime-shakeIn,
   .wfanime-shakeOut,
   .wfanime-wobbleIn,
   .wfanime-wobbleOut,
   .wfanime-tadaIn,
   .wfanime-tadaOut,
   .wfanime-rollIn,
   .wfanime-rollOut,
   .wfanime-lightSpeedIn,
   .wfanime-lightSpeedOut,
   .wfanime-hingeIn,
   .wfanime-hingeOut,
   .wfanime-jackInTheBoxIn,
   .wfanime-jackInTheBoxOut,
   .wfanime-swingIn,
   .wfanime-swingOut,
   .wfanime-slideInUp,
   .wfanime-slideOutUp,
   .wfanime-slideInDown,
   .wfanime-slideOutDown,
   .wfanime-slideInLeft,
   .wfanime-slideOutLeft,
   .wfanime-slideInRight,
   .wfanime-slideOutRight,
   .wfanime-flipInX,
   .wfanime-flipOutX,
   .wfanime-flipInY,
   .wfanime-flipOutY {
      animation: none !important;
   }
}
         `;
        document.head.appendChild(style);
      }

      // Pequena regra para esconder elementos até a animação começar
      const readyId = "webfull-wfanime-ready-css";
      if (!document.getElementById(readyId)) {
        const s = document.createElement("style");
        s.id = readyId;
        s.textContent = `.wfanime-ready{opacity:0;pointer-events:none;transition:opacity 0.2s ease;}`;
        document.head.appendChild(s);
      }
    }

    /**
     * Inicializa o componente
     */
    init() {
      this.setupAnimationMap();
      this.setupObserver();
      this.setupCSSVariables();

      // Aplicar delay se especificado
      // Trigger modes: if trigger is 'click' or 'hover' or 'manual', do not auto-observe
      const trigger =
        this.options && this.options.trigger ? this.options.trigger : "auto";
      if (trigger === "click") {
        // animate on click
        this._clickHandler = () => {
          const animationClasses =
            this.animationClassMap[this.options.animationType] ||
            this.animationClassMap.fade;
          const speedClass =
            this.speedClassMap[this.options.speed] || this.speedClassMap.M;
          this.playAnimation(animationClasses.in, speedClass, "in");
          // schedule out animation if not loop and simpleOut false
          if (!this.options.loop) {
            setTimeout(() => {
              if (this.options.simpleOut) {
                const fadeOutClass = this.animationClassMap.fade.out;
                const speedCls =
                  this.speedClassMap[this.options.speed] ||
                  this.speedClassMap.M;
                this.playAnimation(fadeOutClass, speedCls, "out");
              } else {
                const animationClasses =
                  this.animationClassMap[this.options.animationType] ||
                  this.animationClassMap.fade;
                this.playAnimation(animationClasses.out, speedClass, "out");
              }
            }, this.getAnimationDuration());
          }
        };
        this.container.addEventListener("click", this._clickHandler);
      } else if (trigger === "hover") {
        this._hoverHandler = () => {
          const animationClasses =
            this.animationClassMap[this.options.animationType] ||
            this.animationClassMap.fade;
          const speedClass =
            this.speedClassMap[this.options.speed] || this.speedClassMap.M;
          this.playAnimation(animationClasses.in, speedClass, "in");
        };
        this.container.addEventListener("mouseenter", this._hoverHandler);
      } else if (trigger === "manual") {
        // do nothing; user will call instance.playAnimation(...) manually
      } else {
        // default: observe in viewport
        if (this.options.delay > 0) {
          setTimeout(() => {
            this.observe();
          }, this.options.delay);
        } else {
          this.observe();
        }
      }
    }

    /**
     * Configura o IntersectionObserver
     */
    setupObserver() {
      // Shared observer pool by rootMargin|enter|exit thresholds to reduce number of observers
      const enterT =
        this.options && typeof this.options.enterThreshold === "number"
          ? this.options.enterThreshold
          : 0.15;
      const exitT =
        this.options && typeof this.options.exitThreshold === "number"
          ? this.options.exitThreshold
          : 0.05;
      const key = `${this.options.rootMargin}|${enterT}|${exitT}`;
      if (!WfAnime._observerPool) WfAnime._observerPool = {};
      if (!WfAnime._observerPool[key]) {
        const thresholds = [exitT, enterT];
        WfAnime._observerPool[key] = new IntersectionObserver(
          (entries) => {
            try {
              // Stagger entrance animations when multiple entries become visible at once
              const staggerMs = 80; // default stagger between elements
              const inEntries = entries.filter((en) => {
                const ratio =
                  typeof en.intersectionRatio === "number"
                    ? en.intersectionRatio
                    : en.isIntersecting
                    ? 1
                    : 0;
                return ratio >= enterT;
              });
              const outEntries = entries.filter(
                (en) => !inEntries.includes(en)
              );

              // Handle exits immediately to avoid leaving animations pending
              outEntries.forEach((entry) => {
                const inst = entry.target && entry.target._wfAnime;
                if (inst && typeof inst.handleIntersect === "function") {
                  try {
                    inst.handleIntersect([entry]);
                  } catch (e) {}
                }
              });

              // Handle enters with a small stagger so demos don't animate all at once
              inEntries.forEach((entry, idx) => {
                setTimeout(() => {
                  const inst = entry.target && entry.target._wfAnime;
                  if (inst && typeof inst.handleIntersect === "function") {
                    try {
                      inst.handleIntersect([entry]);
                    } catch (e) {}
                  }
                }, idx * staggerMs);
              });
            } catch (e) {
              // fallback: process entries normally
              entries.forEach((entry) => {
                const inst = entry.target && entry.target._wfAnime;
                if (inst && typeof inst.handleIntersect === "function") {
                  try {
                    inst.handleIntersect([entry]);
                  } catch (err) {}
                }
              });
            }
          },
          {
            rootMargin: this.options.rootMargin,
            threshold: thresholds,
          }
        );
      }
      this.observer = WfAnime._observerPool[key];
    }

    /**
     * Configura as variáveis CSS
     */
    setupCSSVariables() {
      this.container.style.setProperty(
        "--wfanime-distance",
        `${this.options.distancePx}px`
      );
      this.container.style.setProperty(
        "--wfanime-delay",
        `${this.options.delay}ms`
      );
      this.container.style.setProperty(
        "--wfanime-direction",
        this.options.direction
      );
      this.container.style.setProperty(
        "--wfanime-fill-mode",
        this.options.fillMode
      );
      this.container.style.setProperty("--wfanime-easing", this.options.easing);
    }

    setupAnimationMap() {
      this.animationClassMap = {
        fade: {
          in: "wfanime-fadeInOnly",
          out: "wfanime-fadeOutOnly",
        },
        fadeIn: {
          in: "wfanime-fadeIn",
          out: "wfanime-fadeOut",
        },
        fadeLeft: {
          in: "wfanime-fadeLeftIn",
          out: "wfanime-fadeLeftOut",
        },
        fadeRight: {
          in: "wfanime-fadeRightIn",
          out: "wfanime-fadeRightOut",
        },
        fadeTop: {
          in: "wfanime-fadeTopIn",
          out: "wfanime-fadeTopOut",
        },
        fadeBottom: {
          in: "wfanime-fadeBottomIn",
          out: "wfanime-fadeBottomOut",
        },
        zoom: {
          in: "wfanime-zoomIn",
          out: "wfanime-zoomOut",
        },
        rotate: {
          in: "wfanime-rotateIn",
          out: "wfanime-rotateOut",
        },
        bounce: {
          in: "wfanime-bounceIn",
          out: "wfanime-bounceOut",
        },
        slide: {
          in: "wfanime-slideIn",
          out: "wfanime-slideOut",
        },
        flip: {
          in: "wfanime-flipIn",
          out: "wfanime-flipOut",
        },
        pulse: {
          in: "wfanime-pulseIn",
          out: "wfanime-pulseOut",
        },
        rubberBand: {
          in: "wfanime-rubberBandIn",
          out: "wfanime-rubberBandOut",
        },
        shake: {
          in: "wfanime-shakeIn",
          out: "wfanime-shakeOut",
        },
        wobble: {
          in: "wfanime-wobbleIn",
          out: "wfanime-wobbleOut",
        },
        tada: {
          in: "wfanime-tadaIn",
          out: "wfanime-tadaOut",
        },
        roll: {
          in: "wfanime-rollIn",
          out: "wfanime-rollOut",
        },
        lightSpeed: {
          in: "wfanime-lightSpeedIn",
          out: "wfanime-lightSpeedOut",
        },
        hinge: {
          in: "wfanime-hingeIn",
          out: "wfanime-hingeOut",
        },
        jackInTheBox: {
          in: "wfanime-jackInTheBoxIn",
          out: "wfanime-jackInTheBoxOut",
        },
        swing: {
          in: "wfanime-swingIn",
          out: "wfanime-swingOut",
        },
        slideInUp: {
          in: "wfanime-slideInUp",
          out: "wfanime-slideOutUp",
        },
        slideInDown: {
          in: "wfanime-slideInDown",
          out: "wfanime-slideOutDown",
        },
        slideInLeft: {
          in: "wfanime-slideInLeft",
          out: "wfanime-slideOutLeft",
        },
        slideInRight: {
          in: "wfanime-slideInRight",
          out: "wfanime-slideOutRight",
        },
        flipInX: {
          in: "wfanime-flipInX",
          out: "wfanime-flipOutX",
        },
        flipInY: {
          in: "wfanime-flipInY",
          out: "wfanime-flipOutY",
        },
      };
    }

    observe() {
      this.observer.observe(this.container);
    }

    handleIntersect(entries) {
      entries.forEach((entry) => {
        const speedClass =
          this.speedClassMap[this.options.speed] || this.speedClassMap.M;
        const animationClasses =
          this.animationClassMap[this.options.animationType] ||
          this.animationClassMap.fade;

        const ratio =
          typeof entry.intersectionRatio === "number"
            ? entry.intersectionRatio
            : entry.isIntersecting
            ? 1
            : 0;
        const enterT =
          this.options && typeof this.options.enterThreshold === "number"
            ? this.options.enterThreshold
            : 0.15;
        const exitT =
          this.options && typeof this.options.exitThreshold === "number"
            ? this.options.exitThreshold
            : 0.05;

        // Determinar estado com hysteresis: só considerar 'in' se >= enterT, e 'out' se <= exitT.
        let now;
        if (ratio >= enterT) now = true;
        else if (ratio <= exitT) now = false;
        else return; // permanecer no estado anterior quando entre thresholds

        const was = !!this._wasIntersecting;
        if (now === was) return;

        // debounce para estabilidade
        try {
          if (this._intersectionTimer) {
            clearTimeout(this._intersectionTimer);
            this._intersectionTimer = null;
          }
        } catch (e) {}
        const confirmNow = now;
        const debounceMs =
          this.options && this.options.debounceMs
            ? this.options.debounceMs
            : 80;
        // Se estivermos em hold (após um 'in' recente), ignorar saídas imediatas
        if (!confirmNow && this._holdTimer) {
          return;
        }

        this._intersectionTimer = setTimeout(() => {
          // checagem extra via bounding rect para reduzir falsos-positivos
          try {
            const rect = this.container.getBoundingClientRect();
            const inViewport =
              rect.bottom > 0 &&
              rect.top <
                (window.innerHeight || document.documentElement.clientHeight);
            if (confirmNow && !inViewport) {
              this._intersectionTimer = null;
              return;
            }
          } catch (e) {}

          if (confirmNow && !was) {
            this.playAnimation(animationClasses.in, speedClass, "in");
          } else if (!confirmNow && was) {
            // Se uma animação já está em andamento, cancele-a imediatamente
            try {
              if (this._swanime_fallback_timer) {
                clearTimeout(this._swanime_fallback_timer);
                this._swanime_fallback_timer = null;
              }
            } catch (e) {}
            try {
              if (this._swanime_animation_end_handler) {
                this.container.removeEventListener(
                  "animationend",
                  this._swanime_animation_end_handler
                );
                this._swanime_animation_end_handler = null;
              }
            } catch (e) {}
            try {
              if (this._intersectionTimer) {
                clearTimeout(this._intersectionTimer);
                this._intersectionTimer = null;
              }
            } catch (e) {}
            try {
              if (this._holdTimer) {
                clearTimeout(this._holdTimer);
                this._holdTimer = null;
              }
            } catch (e) {}

            // FORÇA INTERRUPÇÃO IMEDIATA da animação CSS
            try {
              // Pausa a animação CSS imediatamente
              this.container.style.animationPlayState = "paused";
              // Remove todas as classes de animação
              this.resetClasses();
              // Força o estado final da animação de saída
              this.container.style.animationPlayState = "running";
            } catch (e) {}

            this.isAnimating = false;
            this.currentAnimation = null;

            // Executa fade-out imediato e rápido
            const fadeOutClass = this.animationClassMap.fade.out;
            const fastSpeedClass = this.speedClassMap.XS; // Usa velocidade extra rápida para saída

            // Aplica fade-out imediato sem usar playAnimation para evitar conflitos
            try {
              this.container.classList.add(fadeOutClass, fastSpeedClass);

              // Remove classes após animação rápida
              setTimeout(() => {
                try {
                  this.container.classList.remove(fadeOutClass, fastSpeedClass);
                  this.container.classList.add("wfanime-ready");
                } catch (e) {}
              }, 150); // Tempo fixo curto para fade-out rápido
            } catch (e) {}
          }

          this._wasIntersecting = confirmNow;
          this._intersectionTimer = null;
        }, debounceMs);
      });
    }

    /**
     * Força a parada imediata de qualquer animação em andamento
     */
    forceStopAnimation() {
      try {
        // Pausa imediatamente a animação CSS
        this.container.style.animationPlayState = "paused";

        // Limpa todos os timers e handlers
        if (this._swanime_fallback_timer) {
          clearTimeout(this._swanime_fallback_timer);
          this._swanime_fallback_timer = null;
        }
        if (this._swanime_animation_end_handler) {
          this.container.removeEventListener(
            "animationend",
            this._swanime_animation_end_handler
          );
          this._swanime_animation_end_handler = null;
        }
        if (this._holdTimer) {
          clearTimeout(this._holdTimer);
          this._holdTimer = null;
        }

        // Remove todas as classes de animação
        this.resetClasses();

        // Restaura o estado de animação
        this.container.style.animationPlayState = "running";

        // Marca como não animando
        this.isAnimating = false;
        this.currentAnimation = null;
        this._pendingAnimation = null;
      } catch (e) {
        console.warn("Erro ao forçar parada da animação:", e);
      }
    }

    /**
     * Executa a animação com controle de estado
     */
    playAnimation(animationClass, speedClass, direction) {
      // Se já estivermos animando e não for loop, verificar se deve interromper
      if (this.isAnimating && !this.options.loop) {
        // Se a nova direção é 'out' e estamos fazendo 'in', interromper imediatamente
        if (this.currentAnimation === "in" && direction === "out") {
          this.forceStopAnimation();
        } else if (
          this.currentAnimation &&
          this.currentAnimation !== direction
        ) {
          // Para outras mudanças de direção, enfileirar
          this._pendingAnimation = { animationClass, speedClass, direction };
          return;
        } else {
          return;
        }
      }

      this.isAnimating = true;
      this.currentAnimation = direction;

      // Limpar handlers/timers antigos
      if (this._swanime_animation_end_handler) {
        try {
          this.container.removeEventListener(
            "animationend",
            this._swanime_animation_end_handler
          );
        } catch (e) {}
        this._swanime_animation_end_handler = null;
      }
      if (this._swanime_fallback_timer) {
        try {
          clearTimeout(this._swanime_fallback_timer);
        } catch (e) {}
        this._swanime_fallback_timer = null;
      }

      // Remover classes anteriores para evitar sobreposição
      Object.values(this.animationClassMap).forEach((anim) => {
        this.container.classList.remove(anim.in, anim.out);
      });
      Object.values(this.speedClassMap).forEach((cls) => {
        this.container.classList.remove(cls);
      });

      // Preparar elemento para animação (evita piscadas): forçar estado inicial
      try {
        this.container.style.willChange = "opacity, transform";
      } catch (e) {}

      // Forçar reflow antes de aplicar classes de animação
      void this.container.offsetWidth;

      // Aplicar nova animação no próximo frame para evitar 'flash'
      requestAnimationFrame(() => {
        // Remover classe ready para a entrada; a animação controla opacity
        try {
          if (direction === "in")
            this.container.classList.remove("wfanime-ready");
        } catch (e) {}
        try {
          this.container.classList.add(animationClass, speedClass);
          // marcar classes aplicadas para limpeza eficiente
          try {
            this._appliedClasses.add(animationClass);
            this._appliedClasses.add(speedClass);
          } catch (e) {}
        } catch (e) {}

        // Se é uma animação de entrada, manter um hold temporário para evitar saídas imediatas
        try {
          if (direction === "in") {
            try {
              if (this._holdTimer) {
                clearTimeout(this._holdTimer);
                this._holdTimer = null;
              }
            } catch (e) {}
            // hold por até duração da animação (limitado a 500ms para evitar long holds)
            const holdMs = Math.min(this.getAnimationDuration(), 500);
            this._holdTimer = setTimeout(() => {
              try {
                this._holdTimer = null;
              } catch (e) {}
            }, holdMs);
          }
        } catch (e) {}

        // Disparar eventos customizados
        const eventName = direction === "in" ? "wfanime:start" : "wfanime:end";
        const event = new CustomEvent(eventName, {
          detail: {
            element: this.container,
            direction: direction,
            animationType: this.options.animationType,
            speed: this.options.speed,
          },
        });
        this.container.dispatchEvent(event);

        // Callbacks
        if (
          direction === "in" &&
          typeof this.options.onAnimationStart === "function"
        ) {
          this.options.onAnimationStart(this.container);
        } else if (
          direction === "out" &&
          typeof this.options.onAnimationEnd === "function"
        ) {
          this.options.onAnimationEnd(this.container);
        }

        // Handler de fim de animação
        const handleAnimationEnd = (ev) => {
          if (ev && ev.target !== this.container) return;

          try {
            this.container.removeEventListener(
              "animationend",
              handleAnimationEnd
            );
          } catch (e) {}
          if (this._swanime_fallback_timer) {
            try {
              clearTimeout(this._swanime_fallback_timer);
            } catch (e) {}
            this._swanime_fallback_timer = null;
          }

          // Se não for loop, limpar classes aplicadas
          if (!this.options.loop) {
            try {
              this.resetClasses();
            } catch (e) {}
          }

          // Se animação de saída, garantir que o elemento volte para estado ready (escondido)
          try {
            if (direction === "out" && !this.options.loop)
              this.container.classList.add("wfanime-ready");
          } catch (e) {}

          // Restaurar estilos temporários
          try {
            this.container.style.willChange = "";
            this.container.style.opacity = "";
            this.container.style.animationPlayState = "running";
          } catch (e) {}

          this.isAnimating = false;

          // Se houver animação pendente, executá-la imediatamente
          if (this._pendingAnimation) {
            try {
              const pending = this._pendingAnimation;
              this._pendingAnimation = null;
              // Executar próxima animação (garantir que não estamos marcados como animando)
              this.playAnimation(
                pending.animationClass,
                pending.speedClass,
                pending.direction
              );
            } catch (e) {}
          }
        };

        // guardar referência para remoção posterior
        this._swanime_animation_end_handler = handleAnimationEnd;
        this.container.addEventListener("animationend", handleAnimationEnd);

        // fallback seguro: tempo baseado na duração mapeada
        if (!this.options.loop) {
          const fallback = this.getAnimationDuration() + 50;
          this._swanime_fallback_timer = setTimeout(() => {
            try {
              handleAnimationEnd();
            } catch (e) {}
          }, fallback);
        }
      });
    }

    /**
     * Obtém a duração da animação em milissegundos
     */
    getAnimationDuration() {
      const speedMap = {
        PP: 250,
        P: 500,
        M: 1000,
        G: 2000,
        GG: 3000,
        XG: 4000,
      };
      return speedMap[this.options.speed] || 1000;
    }

    /**
     * Inicializa todas as instâncias de WfAnime para elementos com atributo [WfAnime].
     * @param {HTMLElement|Document} container - O elemento container a partir do qual procurar por elementos para animar.
     */
    static initAll(container = document) {
      let elements = [];
      if (typeof container === "string") {
        elements = document.querySelectorAll(container);
      } else if (
        container instanceof HTMLElement ||
        container instanceof Document
      ) {
        elements = container.querySelectorAll("[WfAnime]");
      } else {
        return;
      }

      elements.forEach((el) => {
        // Verificar se já foi inicializado
        if (el._wfAnime) return;

        try {
          const instance = new WfAnime(el);
          el._wfAnime = instance;
        } catch (error) {
          // Log silencioso em produção
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfAnime: Erro ao inicializar elemento:", error);
          }
        }
      });
    }

    /**
     * Para de observar o elemento e remove classes de animação.
     */
    destroy() {
      try {
        // se estiver usando observer compartilhado, apenas desobservar o elemento
        if (this.observer && typeof this.observer.unobserve === "function") {
          try {
            this.observer.unobserve(this.container);
          } catch (e) {}
        }
      } catch (e) {}

      // limpar timers e handlers
      try {
        if (this._swanime_fallback_timer) {
          clearTimeout(this._swanime_fallback_timer);
          this._swanime_fallback_timer = null;
        }
      } catch (e) {}
      try {
        if (this._swanime_animation_end_handler) {
          this.container.removeEventListener(
            "animationend",
            this._swanime_animation_end_handler
          );
          this._swanime_animation_end_handler = null;
        }
      } catch (e) {}
      try {
        if (this._intersectionTimer) {
          clearTimeout(this._intersectionTimer);
          this._intersectionTimer = null;
        }
      } catch (e) {}
      try {
        if (this._holdTimer) {
          clearTimeout(this._holdTimer);
          this._holdTimer = null;
        }
      } catch (e) {}

      // limpar classes aplicadas
      try {
        this.resetClasses();
      } catch (e) {}

      this.isAnimating = false;
      this.currentAnimation = null;

      // remover marcação da instância no elemento
      try {
        if (this.container && this.container._wfAnime)
          delete this.container._wfAnime;
      } catch (e) {}
    }

    /**
     * Remove todas as classes de animação
     */
    resetClasses() {
      // Remover somente classes que registramos como aplicadas
      try {
        if (this._appliedClasses && this._appliedClasses.size > 0) {
          this._appliedClasses.forEach((cls) => {
            try {
              this.container.classList.remove(cls);
            } catch (e) {}
          });
          this._appliedClasses.clear();
        } else {
          // fallback: remover tudo do mapa
          Object.values(this.animationClassMap).forEach((anim) => {
            this.container.classList.remove(anim.in, anim.out);
          });
          Object.values(this.speedClassMap).forEach((cls) => {
            this.container.classList.remove(cls);
          });
        }
      } catch (e) {}
    }

    /**
     * Pausa a animação atual
     */
    pause() {
      if (this.isAnimating) {
        this.container.style.animationPlayState = "paused";
      }
    }

    /**
     * Resume a animação pausada
     */
    resume() {
      if (this.isAnimating) {
        this.container.style.animationPlayState = "running";
      }
    }

    /**
     * Para a animação atual
     */
    stop() {
      this.isAnimating = false;
      this.currentAnimation = null;
      this.resetClasses();
      this.container.style.animationPlayState = "running";
    }

    /**
     * Reinicia a animação manualmente.
     */
    reset() {
      this.stop();
      this.setupObserver();
      this.observe();
    }

    /**
     * Animação em grupo (stagger): anima todos os elementos filhos com seletor, em sequência.
     * @param {string} childSelector - Seletor dos filhos a animar em sequência.
     * @param {number} delay - Delay entre cada animação (ms).
     */
    animateGroup(childSelector = "*", delay = 100) {
      const children = Array.from(
        this.container.querySelectorAll(childSelector)
      );
      if (children.length === 0) return;

      const animationClasses =
        this.animationClassMap[this.options.animationType] ||
        this.animationClassMap.fade;
      const speedClass =
        this.speedClassMap[this.options.speed] || this.speedClassMap.M;

      children.forEach((el, idx) => {
        try {
          // aplicar delay por elemento via variável CSS ou style direto
          el.style.setProperty("--wfanime-delay", `${idx * delay}ms`);
          // garantir estado inicial
          el.classList.add("wfanime-ready");
          // aplicar classes com pequeno timeout para evitar reflow problems
          setTimeout(() => {
            el.classList.remove("wfanime-ready");
            el.classList.add(animationClasses.in, speedClass);
          }, idx * delay);
        } catch (e) {}
      });
    }

    // Métodos estáticos de conveniência
    static animate(element, options = {}) {
      return new WfAnime(element, options);
    }

    static animateGroup(
      container,
      childSelector = "*",
      options = {},
      delay = 100
    ) {
      const children = Array.from(container.querySelectorAll(childSelector));
      children.forEach((el, idx) => {
        setTimeout(() => {
          new WfAnime(el, options);
        }, idx * delay);
      });
    }

    static fadeIn(element, speed = "M") {
      return new WfAnime(element, { animationType: "fadeIn", speed });
    }

    static fadeOut(element, speed = "M") {
      return new WfAnime(element, { animationType: "fadeOut", speed });
    }

    static slideIn(element, speed = "M") {
      return new WfAnime(element, { animationType: "slideIn", speed });
    }

    static slideOut(element, speed = "M") {
      return new WfAnime(element, { animationType: "slideOut", speed });
    }

    static zoomIn(element, speed = "M") {
      return new WfAnime(element, { animationType: "zoomIn", speed });
    }

    static zoomOut(element, speed = "M") {
      return new WfAnime(element, { animationType: "zoomOut", speed });
    }

    static bounceIn(element, speed = "M") {
      return new WfAnime(element, { animationType: "bounceIn", speed });
    }

    static bounceOut(element, speed = "M") {
      return new WfAnime(element, { animationType: "bounceOut", speed });
    }

    static flipIn(element, speed = "M") {
      return new WfAnime(element, { animationType: "flipIn", speed });
    }

    static flipOut(element, speed = "M") {
      return new WfAnime(element, { animationType: "flipOut", speed });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    window.WfAnime = WfAnime;

    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfAnime = WfAnime;
    }

    // Integração com WfDay para temas
    if (typeof window.WfDay !== "undefined") {
      try {
        window.WfDay.addThemeChangeListener(() => {
          // Re-aplicar se necessário ou apenas ajustar cores
        });
      } catch (e) {}
    }
  }

  // Auto-init
  const init = () => {
    WfAnime.initAll();
    
    // Observer para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      let shouldInit = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) {
        WfAnime.initAll();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);
