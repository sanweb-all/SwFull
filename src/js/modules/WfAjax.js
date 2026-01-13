(function (window, document) {
  "use strict";

  /**
   * WfAjax - Sistema de Requisições AJAX Simples e Funcional
   * SandroWeb - 2025
   */
  class WfAjax {
    // Fila para carregamentos automáticos
    static autoLoadQueue = [];
    static isProcessingQueue = false;

    constructor(element) {
      this.element = element;
      // Evita dupla inicialização
      if (this.element._wfAjax) return this.element._wfAjax;
      this.element._wfAjax = this;

      this.url = this.element.getAttribute("WfAjax-url");
      this.divId = this.element.getAttribute("WfAjax-div");
      this.effect = this.element.getAttribute("WfAjax-effect") || "fade";
      this.dest =
        this.element.getAttribute("WfAjax-dest") ||
        this.element.id ||
        "wfajax-content";
      this.timeout =
        parseInt(this.element.getAttribute("WfAjax-timeout")) || 10000;
      this.retry = parseInt(this.element.getAttribute("WfAjax-retry")) || 3;
      this.seo = this.element.getAttribute("WfAjax-seo") === "true";
      this.auto = this.element.getAttribute("WfAjax-auto") === "true";

      // Carregar CSS do componente
      this.loadComponentCSS();
      this.init();
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfAjax]");
      elements.forEach((element) => {
        if (!element._wfAjax) {
          new WfAjax(element);
        }
      });
    }

    // Carregar CSS do componente
    loadComponentCSS() {
      const cssId = "webfull-wfajax-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/* ===== SWAJAX CSS - SISTEMA DE ANIMAÇÕES COM KEYFRAMES ===== */
/* SandroWeb - 2025 */

/* ===== ESTADOS DE CARREGAMENTO ===== */
.wfajax-loading {
   position: relative;
   min-height: 100px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: rgba(255, 255, 255, 0.8);
   border-radius: 8px;
   border: 2px dashed #ddd;
}

.wfajax-loading::before {
   content: "⏳ Carregando...";
   font-size: 16px;
   color: #666;
   animation: none;
}

/* ===== ESTADOS DE ERRO ===== */
.wfajax-error {
   padding: 20px;
   background: rgba(220, 53, 69, 0.1);
   border: 2px solid rgba(220, 53, 69, 0.3);
   border-radius: 8px;
   color: #721c24;
   text-align: center;
   font-weight: bold;
}

/* ===== ANIMAÇÕES COM KEYFRAMES ===== */

/* Fade - Invisível para Visível */
.wfajax-fade {
   opacity: 0;
   transform: translateX(0);
   animation: wfajax-fadeIn 1s ease-out forwards;
}

@keyframes wfajax-fadeIn {
   from {
      opacity: 0;
      transform: translateX(0);
   }
   to {
      opacity: 1;
      transform: translateX(0);
   }
}

/* Fade Left - Desliza da esquerda */
.wfajax-fadeLeft {
   transform: translateX(-100px);
   opacity: 0;
   animation: wfajax-fadeLeftIn 1s ease-out forwards;
}

@keyframes wfajax-fadeLeftIn {
   from {
      transform: translateX(-100px);
      opacity: 0;
   }
   to {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Fade Right - Desliza da direita */
.wfajax-fadeRight {
   transform: translateX(100px);
   opacity: 0;
   animation: wfajax-fadeRightIn 1s ease-out forwards;
}

@keyframes wfajax-fadeRightIn {
   from {
      transform: translateX(100px);
      opacity: 0;
   }
   to {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Fade Top - Fade de cima para baixo */
.wfajax-fadeTop {
   transform: translateY(-100px);
   opacity: 0;
   animation: wfajax-fadeTopIn 1s ease-out forwards;
}

@keyframes wfajax-fadeTopIn {
   from {
      transform: translateY(-100px);
      opacity: 0;
   }
   to {
      transform: translateY(0);
      opacity: 1;
   }
}

/* Fade Bottom - Fade de baixo para cima */
.wfajax-fadeBottom {
   transform: translateY(100px);
   opacity: 0;
   animation: wfajax-fadeBottomIn 1s ease-out forwards;
}

@keyframes wfajax-fadeBottomIn {
   from {
      transform: translateY(100px);
      opacity: 0;
   }
   to {
      transform: translateY(0);
      opacity: 1;
   }
}

/* Slide Left - Desliza da direita para esquerda */
.wfajax-slideLeft {
   transform: translateX(200px);
   opacity: 0;
   animation: wfajax-slideLeftIn 1s ease-out forwards;
}

@keyframes wfajax-slideLeftIn {
   from {
      transform: translateX(200px);
      opacity: 0;
   }
   to {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Slide Right - Desliza da esquerda para direita */
.wfajax-slideRight {
   transform: translateX(-200px);
   opacity: 0;
   animation: wfajax-slideRightIn 1s ease-out forwards;
}

@keyframes wfajax-slideRightIn {
   from {
      transform: translateX(-200px);
      opacity: 0;
   }
   to {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Slide Top - Desliza de cima para baixo */
.wfajax-slideTop {
   transform: translateY(-200px);
   opacity: 0;
   animation: wfajax-slideTopIn 1s ease-out forwards;
}

@keyframes wfajax-slideTopIn {
   from {
      transform: translateY(-200px);
      opacity: 0;
   }
   to {
      transform: translateY(0);
      opacity: 1;
   }
}

/* Slide Bottom - Desliza de baixo para cima */
.wfajax-slideBottom {
   transform: translateY(200px);
   opacity: 0;
   animation: wfajax-slideBottomIn 1s ease-out forwards;
}

@keyframes wfajax-slideBottomIn {
   from {
      transform: translateY(200px);
      opacity: 0;
   }
   to {
      transform: translateY(0);
      opacity: 1;
   }
}

/* Zoom - Escala de pequeno para normal */
.wfajax-zoom {
   transform: scale(0.1);
   opacity: 0;
   animation: wfajax-zoomIn 1s ease-out forwards;
}

@keyframes wfajax-zoomIn {
   from {
      transform: scale(0.1);
      opacity: 0;
   }
   to {
      transform: scale(1);
      opacity: 1;
   }
}

/* Bounce - Salta de cima */
.wfajax-bounce {
   transform: translateY(-300px);
   opacity: 0;
   animation: wfajax-bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes wfajax-bounceIn {
   0% {
      transform: translateY(-300px);
      opacity: 0;
   }
   60% {
      transform: translateY(20px);
      opacity: 0.8;
   }
   100% {
      transform: translateY(0);
      opacity: 1;
   }
}

/* Flip - Gira no eixo Y */
.wfajax-flip {
   transform: rotateY(180deg);
   opacity: 0;
   animation: wfajax-flipIn 1s ease-out forwards;
}

@keyframes wfajax-flipIn {
   from {
      transform: rotateY(180deg);
      opacity: 0;
   }
   to {
      transform: rotateY(0deg);
      opacity: 1;
   }
}

/* Shake - Tremor */
.wfajax-shake {
   transform: translateX(-20px);
   opacity: 0;
   animation: wfajax-shakeIn 1s ease-out forwards;
}

@keyframes wfajax-shakeIn {
   0% {
      transform: translateX(-20px);
      opacity: 0;
   }
   25% {
      transform: translateX(0);
      opacity: 0.5;
   }
   50% {
      transform: translateX(-10px);
      opacity: 0.8;
   }
   75% {
      transform: translateX(5px);
      opacity: 0.9;
   }
   100% {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Pulse - Pulsação */
.wfajax-pulse {
   transform: scale(0.5);
   opacity: 0;
   animation: wfajax-pulseIn 1s ease-out forwards;
}

@keyframes wfajax-pulseIn {
   0% {
      transform: scale(0.5);
      opacity: 0;
   }
   50% {
      transform: scale(1.1);
      opacity: 0.7;
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}

/* Elastic - Elástico */
.wfajax-elastic {
   transform: scale(0.05);
   opacity: 0;
   animation: wfajax-elasticIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes wfajax-elasticIn {
   0% {
      transform: scale(0.05);
      opacity: 0;
   }
   25% {
      transform: scale(1.2);
      opacity: 0.5;
   }
   50% {
      transform: scale(0.9);
      opacity: 0.8;
   }
   75% {
      transform: scale(1.05);
      opacity: 0.9;
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}

/* Swing - Balanço */
.wfajax-swing {
   transform: rotate(-30deg);
   opacity: 0;
   animation: wfajax-swingIn 1s ease-out forwards;
}

@keyframes wfajax-swingIn {
   0% {
      transform: rotate(-30deg);
      opacity: 0;
   }
   20% {
      transform: rotate(10deg);
      opacity: 0.3;
   }
   40% {
      transform: rotate(-5deg);
      opacity: 0.6;
   }
   60% {
      transform: rotate(2deg);
      opacity: 0.8;
   }
   80% {
      transform: rotate(-1deg);
      opacity: 0.9;
   }
   100% {
      transform: rotate(0deg);
      opacity: 1;
   }
}

/* Rotate - Rotação */
.wfajax-rotate {
   transform: rotate(720deg) scale(0.3);
   opacity: 0;
   animation: wfajax-rotateIn 1s ease-out forwards;
}

@keyframes wfajax-rotateIn {
   from {
      transform: rotate(720deg) scale(0.3);
      opacity: 0;
   }
   to {
      transform: rotate(0deg) scale(1);
      opacity: 1;
   }
}

/* Scale - Escala */
.wfajax-scale {
   transform: scale(0.1);
   opacity: 0;
   animation: wfajax-scaleIn 1s ease-out forwards;
}

@keyframes wfajax-scaleIn {
   from {
      transform: scale(0.1);
      opacity: 0;
   }
   to {
      transform: scale(1);
      opacity: 1;
   }
}

/* Wobble - Oscilação */
.wfajax-wobble {
   transform: translateX(-25%);
   opacity: 0;
   animation: wfajax-wobbleIn 1s ease-out forwards;
}

@keyframes wfajax-wobbleIn {
   0% {
      transform: translateX(-25%);
      opacity: 0;
   }
   15% {
      transform: translateX(15%);
      opacity: 0.3;
   }
   30% {
      transform: translateX(-10%);
      opacity: 0.5;
   }
   45% {
      transform: translateX(5%);
      opacity: 0.7;
   }
   60% {
      transform: translateX(-2%);
      opacity: 0.8;
   }
   75% {
      transform: translateX(1%);
      opacity: 0.9;
   }
   100% {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Tada - Tada */
.wfajax-tada {
   transform: scale(0.3) rotate(-3deg);
   opacity: 0;
   animation: wfajax-tadaIn 1s ease-out forwards;
}

@keyframes wfajax-tadaIn {
   0% {
      transform: scale(0.3) rotate(-3deg);
      opacity: 0;
   }
   10%, 20% {
      transform: scale(0.9) rotate(-3deg);
      opacity: 0.5;
   }
   30%, 50%, 70%, 90% {
      transform: scale(1.1) rotate(3deg);
      opacity: 0.8;
   }
   40%, 60%, 80% {
      transform: scale(1.1) rotate(-3deg);
      opacity: 0.9;
   }
   100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
   }
}

/* RubberBand - Banda de Borracha */
.wfajax-rubberBand {
   transform: scale(0.1);
   opacity: 0;
   animation: wfajax-rubberBandIn 1s ease-out forwards;
}

@keyframes wfajax-rubberBandIn {
   0% {
      transform: scale(0.1);
      opacity: 0;
   }
   30% {
      transform: scale(1.25);
      opacity: 0.5;
   }
   40% {
      transform: scale(0.75);
      opacity: 0.7;
   }
   50% {
      transform: scale(1.15);
      opacity: 0.8;
   }
   65% {
      transform: scale(0.95);
      opacity: 0.9;
   }
   75% {
      transform: scale(1.05);
      opacity: 0.95;
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}

/* LightSpeed - Velocidade da Luz */
.wfajax-lightSpeed {
   transform: translateX(100%) skewX(-30deg);
   opacity: 0;
   animation: wfajax-lightSpeedIn 1s ease-out forwards;
}

@keyframes wfajax-lightSpeedIn {
   0% {
      transform: translateX(100%) skewX(-30deg);
      opacity: 0;
   }
   60% {
      transform: translateX(-20%) skewX(20deg);
      opacity: 0.6;
   }
   80% {
      transform: translateX(0%) skewX(-5deg);
      opacity: 0.8;
   }
   100% {
      transform: translateX(0%) skewX(0deg);
      opacity: 1;
   }
}

/* Hinge - Dobradiça */
.wfajax-hinge {
   transform: rotate(0deg);
   transform-origin: top left;
   opacity: 0;
   animation: wfajax-hingeIn 1s ease-out forwards;
}

@keyframes wfajax-hingeIn {
   0% {
      transform: rotate(0deg);
      transform-origin: top left;
      opacity: 0;
   }
   20%, 60% {
      transform: rotate(80deg);
      transform-origin: top left;
      opacity: 0.4;
   }
   40%, 80% {
      transform: rotate(60deg);
      transform-origin: top left;
      opacity: 0.6;
   }
   100% {
      transform: rotate(0deg);
      transform-origin: top left;
      opacity: 1;
   }
}

/* RollIn - Rolar Para Dentro */
.wfajax-rollIn {
   transform: translateX(-100%) rotate(-120deg);
   opacity: 0;
   animation: wfajax-rollIn 1s ease-out forwards;
}

@keyframes wfajax-rollIn {
   0% {
      transform: translateX(-100%) rotate(-120deg);
      opacity: 0;
   }
   100% {
      transform: translateX(0%) rotate(0deg);
      opacity: 1;
   }
}

/* JackInTheBox - Jack na Caixa */
.wfajax-jackInTheBox {
   transform: scale(0.1) rotate(30deg);
   transform-origin: center bottom;
   opacity: 0;
   animation: wfajax-jackInTheBoxIn 1s ease-out forwards;
}

@keyframes wfajax-jackInTheBoxIn {
   0% {
      transform: scale(0.1) rotate(30deg);
      transform-origin: center bottom;
      opacity: 0;
   }
   50% {
      transform: scale(1.2) rotate(-10deg);
      transform-origin: center bottom;
      opacity: 0.7;
   }
   70% {
      transform: scale(0.9) rotate(3deg);
      transform-origin: center bottom;
      opacity: 0.9;
   }
   100% {
      transform: scale(1) rotate(0deg);
      transform-origin: center bottom;
      opacity: 1;
   }
}

/* HeartBeat - Batida do Coração */
.wfajax-heartBeat {
   transform: scale(0.3);
   opacity: 0;
   animation: wfajax-heartBeatIn 1s ease-out forwards;
}

@keyframes wfajax-heartBeatIn {
   0% {
      transform: scale(0.3);
      opacity: 0;
   }
   14% {
      transform: scale(1.3);
      opacity: 0.5;
   }
   28% {
      transform: scale(0.9);
      opacity: 0.7;
   }
   42% {
      transform: scale(1.1);
      opacity: 0.8;
   }
   70% {
      transform: scale(1);
      opacity: 0.9;
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}

/* Jello - Gelatina */
.wfajax-jello {
   transform: skewX(0deg) skewY(0deg);
   opacity: 0;
   animation: wfajax-jelloIn 1s ease-out forwards;
}

@keyframes wfajax-jelloIn {
   0% {
      transform: skewX(0deg) skewY(0deg);
      opacity: 0;
   }
   11.1% {
      transform: skewX(12.5deg) skewY(12.5deg);
      opacity: 0.3;
   }
   22.2% {
      transform: skewX(-6.25deg) skewY(-6.25deg);
      opacity: 0.5;
   }
   33.3% {
      transform: skewX(3.125deg) skewY(3.125deg);
      opacity: 0.7;
   }
   44.4% {
      transform: skewX(-1.5625deg) skewY(-1.5625deg);
      opacity: 0.8;
   }
   55.5% {
      transform: skewX(0.78125deg) skewY(0.78125deg);
      opacity: 0.9;
   }
   66.6% {
      transform: skewX(-0.390625deg) skewY(-0.390625deg);
      opacity: 0.95;
   }
   77.7% {
      transform: skewX(0.1953125deg) skewY(0.1953125deg);
      opacity: 0.98;
   }
   88.8% {
      transform: skewX(-0.09765625deg) skewY(-0.09765625deg);
      opacity: 0.99;
   }
   100% {
      transform: skewX(0deg) skewY(0deg);
      opacity: 1;
   }
}

/* FlipInX - Flip no Eixo X */
.wfajax-flipInX {
   transform: perspective(400px) rotateX(90deg);
   opacity: 0;
   animation: wfajax-flipInXIn 1s ease-out forwards;
}

@keyframes wfajax-flipInXIn {
   0% {
      transform: perspective(400px) rotateX(90deg);
      opacity: 0;
   }
   40% {
      transform: perspective(400px) rotateX(-20deg);
      opacity: 0.6;
   }
   60% {
      transform: perspective(400px) rotateX(10deg);
      opacity: 0.8;
   }
   80% {
      transform: perspective(400px) rotateX(-5deg);
      opacity: 0.9;
   }
   100% {
      transform: perspective(400px) rotateX(0deg);
      opacity: 1;
   }
}

/* FlipInY - Flip no Eixo Y */
.wfajax-flipInY {
   transform: perspective(400px) rotateY(90deg);
   opacity: 0;
   animation: wfajax-flipInYIn 1s ease-out forwards;
}

@keyframes wfajax-flipInYIn {
   0% {
      transform: perspective(400px) rotateY(90deg);
      opacity: 0;
   }
   40% {
      transform: perspective(400px) rotateY(-20deg);
      opacity: 0.6;
   }
   60% {
      transform: perspective(400px) rotateY(10deg);
      opacity: 0.8;
   }
   80% {
      transform: perspective(400px) rotateY(-5deg);
      opacity: 0.9;
   }
   100% {
      transform: perspective(400px) rotateY(0deg);
      opacity: 1;
   }
}

/* FadeInDown - Fade de cima para baixo */
.wfajax-fadeInDown {
   transform: translateY(-100px);
   opacity: 0;
   animation: wfajax-fadeInDownIn 1s ease-out forwards;
}

@keyframes wfajax-fadeInDownIn {
   0% {
      transform: translateY(-100px);
      opacity: 0;
   }
   100% {
      transform: translateY(0);
      opacity: 1;
   }
}
         `;
        document.head.appendChild(style);
      }
    }

    init() {
      this.bindEvents();

      // Carregamento automático se configurado
      if (this.auto) {
        WfAjax.autoLoadQueue.push(this);
        WfAjax.processAutoLoadQueue();
      }
    }

    bindEvents() {
      // Adicionar atributo WfAjax se não existir
      if (!this.element.hasAttribute("WfAjax")) {
        this.element.setAttribute("WfAjax", "");
      }

      // Só adicionar event listener de clique se NÃO for auto-load
      if (!this.auto) {
        const tag = (this.element.tagName || "").toLowerCase();
        if (tag !== "form") {
          this.element.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.makeRequest();
          });
        }
      }
    }

    async makeRequest() {
      let target = null;
      try {
        const d = this.dest;
        if (d) {
          if (
            typeof d === "string" &&
            (d.startsWith("#") || d.startsWith(".") || /[\[\s]/.test(d))
          ) {
            target = document.querySelector(d);
          } else {
            target = document.getElementById(d);
          }
        }
      } catch (e) {}
      if (!target) {
        target = document.getElementById("wfajax-content");
      }
      if (!target) {
        try {
          const div = document.createElement("div");
          div.id = "wfajax-content";
          div.className = "wfajax-content";
          const parent = this.element.parentNode || document.body;
          if (parent && parent.insertBefore)
            parent.insertBefore(div, this.element.nextSibling);
          else document.body.appendChild(div);
          target = div;
        } catch (e) {}
      }
      if (!target) {
        console.error(`WfAjax: Elemento ${this.dest} não encontrado`);
        return;
      }

      // Se tem divId, carregar div interna
      if (this.divId) {
        const sourceDiv = document.getElementById(this.divId);
        if (!sourceDiv) {
          console.error(`WfAjax: Elemento ${this.divId} não encontrado`);
          return;
        }

        const content = sourceDiv.innerHTML;
        this.applyAnimation(target, content);
        return;
      }

      // Se tem URL, carregar conteúdo externo
      if (this.url) {
        try {
          const response = await fetch(this.url, {
            method: "GET",
            // Evitar cache durante desenvolvimento
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.text();
          this.applyAnimation(target, data);
        } catch (error) {
          console.error("WfAjax: Erro na requisição:", error);
          target.innerHTML = `<div class="wfajax-error">Erro: ${error.message}</div>`;
        }
      }
    }

    applyAnimation(target, content = null) {
      // aplicar animação para o elemento destino com o efeito configurado

      // Garantir que o elemento está visível
      target.style.display = "block";
      target.style.visibility = "visible";

      // Aplicar conteúdo primeiro
      if (content) {
        target.innerHTML = content;
      }

      // INICIALIZAR COMPONENTES IMEDIATAMENTE (ANTES DA ANIMAÇÃO)
      try {
        console.debug &&
          console.debug("WfAjax.applyAnimation", {
            url: this.url,
            dest: this.dest,
          });
      } catch (e) {}
      this.afterContentLoad(target);

      // Inicializar WfCode
      if (window.WfCode && typeof window.WfCode.initAll === "function") {
        window.WfCode.initAll(target);
      }

      // Aplicar animação se especificada
      if (this.effect && this.effect !== "none") {
        this.applyJavaScriptAnimation(target);
      } else {
        // Se não há efeito, mostrar diretamente
        target.style.opacity = "1";
      }
    }

    // Aplicar animação via CSS classes
    applyJavaScriptAnimation(target) {
      // Limpar classes anteriores do WfAjax.css
      target.classList.remove(
        "wfajax-fade",
        "wfajax-fadeLeft",
        "wfajax-fadeRight",
        "wfajax-fadeTop",
        "wfajax-fadeBottom",
        "wfajax-slideLeft",
        "wfajax-slideRight",
        "wfajax-slideTop",
        "wfajax-slideBottom",
        "wfajax-zoom",
        "wfajax-bounce",
        "wfajax-flip",
        "wfajax-shake",
        "wfajax-pulse",
        "wfajax-elastic",
        "wfajax-swing",
        "wfajax-rotate",
        "wfajax-scale",
        "wfajax-wobble",
        "wfajax-tada",
        "wfajax-rubberBand",
        "wfajax-lightSpeed",
        "wfajax-hinge",
        "wfajax-rollIn",
        "wfajax-jackInTheBox",
        "wfajax-heartBeat",
        "wfajax-jello",
        "wfajax-flipInX",
        "wfajax-flipInY"
      );

      // Remover CSS inline que pode interferir com as animações
      target.style.removeProperty("opacity");
      target.style.removeProperty("transform");
      target.style.removeProperty("transition");
      target.style.removeProperty("animation");

      // Garantir que o elemento está visível
      target.style.display = "block";
      target.style.visibility = "visible";

      // Para fade, usar CSS existente (mais confiável)
      if (this.effect === "fade") {
        // Aplicar classe CSS para animação
        target.classList.add("wfajax-fade");

        // Aguardar a animação terminar e limpar
        setTimeout(() => {
          target.classList.remove("wfajax-fade");
        }, 1000);
        return;
      }

      // Para outros efeitos, usar CSS classes
      const animationClass = `wfajax-${this.effect}`;
      target.classList.add(animationClass);

      // Aguardar a animação terminar (apenas para limpar classes)
      setTimeout(() => {
        // Remover classe de animação
        target.classList.remove(animationClass);
      }, 1000); // Duração da animação
    }

    afterContentLoad(target) {
      // Fechar sidebar no mobile após carregamento
      if (window.innerWidth <= 790) {
        const sidebar = document.querySelector(".wf-sidebar");
        const overlay = document.querySelector(".wf-overlay");
        if (sidebar) {
          sidebar.classList.remove("open");
          sidebar.style.transform = "translateX(-100%)";
        }
        if (overlay) overlay.classList.remove("active");
      }

      // Disparar eventos que o WfContainer está aguardando
      const events = ["wfajax:processed", "wfajax:success"];
      events.forEach((eventName) => {
        const event = new CustomEvent(eventName, {
          detail: {
            target: target,
            url: this.url,
            divId: this.divId,
            effect: this.effect,
            timestamp: Date.now(),
          },
        });
        document.dispatchEvent(event);
      });

      // Re-inicializar componentes IMEDIATAMENTE (sem delay)
      this.reinitializeComponents(target, this.url);

      // Mostrar badge de debug leve na UI para ajudar usuário que não pode usar console
      // debug badge removed to avoid UI artifacts in production
    }

    reinitializeComponents(container, sourceUrl = null) {
      // Usar o loader dinâmico se disponível para inicializar novos elementos
      try {
        if (
          window.WebfullLoader &&
          typeof window.WebfullLoader.initAll === "function"
        ) {
          window.WebfullLoader.initAll(container);
        }
      } catch (e) {
        console.warn("WfAjax: Erro no WebfullLoader:", e);
      }

      // Lista completa de TODOS os 49 componentes do WebFull Framework
      const allComponents = [
        "WfAba",
        "WfAccord",
        "WfAjax",
        "WfAlert",
        "WfAnime",
        "WfBadge",
        "WfCode",
        "WfContainer",
        "WfCotacao",
        "WfDay",
        "WfDiv",
        "WfFile1",
        "WfFile2",
        "WfIconsInit",
        "WfImg",
        "WfLazy",
        "WfLessonsToggle",
        "WfLgpd",
        "WfLoad",
        "WfMasc",
        "WfModal",
        "WfMove",
        "WfNavbar",
        "WfNolink",
        "WfOcult",
        "WfPag",
        "WfPageTransition",
        "WfPagInfinite",
        "WfPanel",
        "WfPanel1",
        "WfParallax",
        "WfPreLoad",
        "WfReve",
        "WfScrollSpy",
        "WfSelect",
        "WfSide",
        "WfSidebar",
        "WfSlid1",
        "WfSlid2",
        "WfTable",
        "WfTable1",
        "WfTableAjax",
        "WfText",
        "WfTextarea",
        "WfTextLimit",
        "WfTool",
        "WfTop",
        "WfType",
        "WfValid",
      ];

      const isDev =
        typeof window !== "undefined" &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1");

      // Detectar quais componentes estão realmente presentes no container
      const presentComponents = [];
      allComponents.forEach((componentName) => {
        const selectors = [
          `[${componentName}]`,
          `[${componentName.toLowerCase()}]`,
          `.${componentName.toLowerCase()}`,
          `${componentName.toLowerCase()}`,
        ];

        for (const selector of selectors) {
          try {
            if (container.querySelector(selector)) {
              presentComponents.push(componentName);
              break;
            }
          } catch (e) {
            // Selector inválido, continuar
          }
        }
      });

      // Antes de reinicializar, detectar WfAccord mesmo sem atributo [WfAccord]
      try {
        if (!presentComponents.includes("WfAccord")) {
          const hasAccord =
            container.querySelector("[WfAccord]") ||
            container.querySelector("[swaccord]") ||
            container.querySelector("[sw-accord]") ||
            container.querySelector("[SwAccordItem]") ||
            container.querySelector(".wfaccord-header") ||
            container.querySelector(".wfaccord-content") ||
            container.querySelector(".wfaccord-primary") ||
            container.querySelector(".wfaccord-success") ||
            container.querySelector(".wfaccord-warning") ||
            container.querySelector(".wfaccord-danger") ||
            container.querySelector(".wfaccord-info") ||
            container.querySelector(".wfaccord-dark") ||
            container.querySelector(".wfaccord-small") ||
            container.querySelector(".wfaccord-large");
          if (hasAccord) presentComponents.push("WfAccord");
        }
      } catch (_) {}

      if (isDev)
        console.debug(
          "WfAjax.reinitializeComponents:presentComponents",
          presentComponents
        );

      // Re-inicializar apenas os componentes detectados
      presentComponents.forEach((componentName) => {
        if (
          window[componentName] &&
          typeof window[componentName].initAll === "function"
        ) {
          try {
            // WfCode precisa usar reinit para limpar estado antes
            if (
              componentName === "WfCode" &&
              typeof window[componentName].reinit === "function"
            ) {
              console.log(
                `[WfAjax] Chamando WfCode.reinit() para container:`,
                container
              );
              window[componentName].reinit(container);
            } else {
              window[componentName].initAll(container, { baseUrl: sourceUrl });
            }
            if (isDev)
              console.debug(
                "WfAjax.reinitializeComponents:initialized",
                componentName
              );
          } catch (error) {
            try {
              // Fallback sem options
              if (
                componentName === "WfCode" &&
                typeof window[componentName].reinit === "function"
              ) {
                console.log(
                  `[WfAjax] Fallback: Chamando WfCode.reinit() para container:`,
                  container
                );
                window[componentName].reinit(container);
              } else {
                window[componentName].initAll(container);
              }
              if (isDev)
                console.debug(
                  "WfAjax.reinitializeComponents:fallbackInitialized",
                  componentName
                );
            } catch (fallbackError) {
              if (
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1"
              ) {
                console.warn(
                  `WfAjax: Erro ao re-inicializar ${componentName}:`,
                  fallbackError
                );
              }
            }
          }
        }
      });

      // Reinicializar todos os módulos via WebFull
      if (
        typeof window.WebFull !== "undefined" &&
        typeof window.WebFull.reinit === "function"
      ) {
        console.log(
          "[WfAjax] Chamando WebFull.reinit() para container:",
          container
        );
        window.WebFull.reinit(container);
      }

      // Executar scripts inline no container carregado
      const scripts = container.querySelectorAll("script");
      scripts.forEach((script) => {
        // Ignorar scripts que não devem ser executados
        const type = script.getAttribute("type");
        if (
          type &&
          type !== "text/javascript" &&
          type !== "application/javascript" &&
          type !== "module"
        ) {
          return; // Ignorar scripts com type diferente (como text/plain, text/html, etc)
        }

        const content = script.textContent.trim();
        if (content) {
          try {
            // Criar novo elemento script ao invés de usar eval
            const newScript = document.createElement("script");
            if (type) {
              newScript.type = type;
            }
            newScript.textContent = content;
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
          } catch (e) {
            console.warn("WfAjax: Erro ao executar script inline:", e);
          }
        }
      });
    }

    // Método estático para carregamento externo
    static async load(options) {
      const { url, dest, effect = "fade" } = options;
      let target = null;
      try {
        if (dest) {
          if (
            typeof dest === "string" &&
            (dest.startsWith("#") ||
              dest.startsWith(".") ||
              /[\[\s]/.test(dest))
          ) {
            target = document.querySelector(dest);
          } else {
            target = document.getElementById(dest);
          }
        }
      } catch (e) {}
      if (!target) {
        target = document.getElementById("wfajax-content");
      }
      if (!target) {
        try {
          const div = document.createElement("div");
          div.id = "wfajax-content";
          div.className = "wfajax-content";
          const parent = document.body;
          parent.appendChild(div);
          target = div;
        } catch (e) {}
      }
      if (!target) {
        console.error(`WfAjax.load: Elemento ${dest} não encontrado`);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.text();

        // Detectar chamadas inline onclick que referenciam componentes (ex: WfAlert.xxx)
        try {
          const onclickEls = target.querySelectorAll("[onclick]");
          const compsToLoad = new Set();
          onclickEls.forEach((el) => {
            const v = el.getAttribute("onclick");
            if (!v) return;
            const matches = v.match(/\bSw[A-Z][A-Za-z0-9_]*/g);
            if (matches) matches.forEach((nm) => compsToLoad.add(nm));
          });
          // Carregar dinamicamente módulos que aparecem em onclick
          if (compsToLoad.size && window.WebfullLoader) {
            const loadPromises = [];
            compsToLoad.forEach((pascalName) => {
              try {
                const key = pascalName
                  .replace(/([A-Z])/g, "-$1")
                  .replace(/^-/, "")
                  .toLowerCase();
                const p = window.WebfullLoader.load(key)
                  .then((m) => {
                    const exported = (m && (m.default || m[pascalName])) || m;
                    if (exported && !window[pascalName])
                      window[pascalName] = exported;
                    try {
                      if (
                        window[pascalName] &&
                        typeof window[pascalName].initAll === "function"
                      )
                        window[pascalName].initAll(target);
                    } catch (e) {}
                  })
                  .catch(() => {});
                loadPromises.push(p);
              } catch (e) {
                // ignore
              }
            });

            // impedir interação do usuário enquanto carregamos dependências
            try {
              target.style.pointerEvents = "none";
            } catch (e) {}
            try {
              await Promise.all(loadPromises);
            } catch (e) {}
            try {
              target.style.pointerEvents = "";
            } catch (e) {}
          }
        } catch (e) {
          // ignore
        }

        // Aplicar conteúdo DEPOIS da detecção de onclick mas ANTES das animações
        target.innerHTML = data;

        // Inicializar componentes críticos imediatamente (antes do reinitializeComponents)
        // Estes componentes precisam ser inicializados primeiro por questões de dependência/prioridade
        [
          { name: "WfAba", obj: window.WfAba },
          { name: "WfAccord", obj: window.WfAccord },
          { name: "WfPanel", obj: window.WfPanel },
          { name: "WfPanel1", obj: window.WfPanel1 },
          { name: "WfModal", obj: window.WfModal },
          { name: "WfAlert", obj: window.WfAlert },
          { name: "WfSidebar", obj: window.WfSidebar },
          { name: "WfTable", obj: window.WfTable },
          { name: "WfTable1", obj: window.WfTable1 },
          { name: "WfTableAjax", obj: window.WfTableAjax },
        ].forEach((comp) => {
          try {
            if (comp.obj && typeof comp.obj.initAll === "function")
              comp.obj.initAll(target);
          } catch (error) {
            if (
              window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1"
            ) {
              console.warn(
                `WfAjax.load: Erro ao inicializar ${comp.name}:`,
                error
              );
            }
          }
        });

        // WfDay precisa ser inicializado no nível do documento para funcionar com fontes
        if (window.WfDay && typeof window.WfDay.initAll === "function") {
          try {
            window.WfDay.initAll();
          } catch (error) {
            if (
              window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1"
            ) {
              console.warn(`WfAjax.load: Erro ao inicializar WfDay:`, error);
            }
          }
        }

        // Inicializar todos os outros componentes
        const tempElement = document.createElement("div");
        const instance = new WfAjax(tempElement);
        instance.reinitializeComponents(target);

        // Aplicar animação usando o método completo (igual ao das instâncias)
        if (effect && effect !== "none") {
          const tempElement = document.createElement("div");
          const instance = new WfAjax(tempElement);
          instance.effect = effect;
          instance.applyJavaScriptAnimation(target);
        }

        return data;
      } catch (error) {
        target.innerHTML = `<div class="wfajax-error">Erro: ${error.message}</div>`;
        throw error;
      }
    }

    // Método estático para mostrar div interna
    static show(options) {
      const { divId, dest, effect = "fade" } = options;
      const target = document.getElementById(dest);
      const sourceDiv = document.getElementById(divId);

      if (!target) {
        console.error(`WfAjax.show: Elemento ${dest} não encontrado`);
        return;
      }

      if (!sourceDiv) {
        console.error(`WfAjax.show: Elemento ${divId} não encontrado`);
        return;
      }

      const content = sourceDiv.innerHTML;

      // Aplicar conteúdo primeiro
      target.innerHTML = content;

      // Inicializar todos os componentes imediatamente
      const tempElement = document.createElement("div");
      const instance = new WfAjax(tempElement);
      instance.reinitializeComponents(target);

      // Aplicar animação depois
      if (effect && effect !== "none") {
        target.classList.add(`wfajax-${effect}`);
        setTimeout(() => {
          target.classList.remove(`wfajax-${effect}`);
        }, 1000);
      }

      return content;
    }

    // Método estático para inicializar todos
    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfAjax]");
      const instances = [];

      elements.forEach((element, index) => {
        if (!element._wfAjax) {
          try {
            const instance = new WfAjax(element);
            element._wfAjax = instance;
            instances.push(instance);
          } catch (error) {
            console.error(`Erro ao inicializar elemento ${index}:`, error);
          }
        }
      });

      // Disparar evento de inicialização completa
      if (instances.length > 0) {
        const event = new CustomEvent("wfajax:loaded", {
          detail: {
            instances: instances,
            container: container,
            count: instances.length,
            timestamp: Date.now(),
          },
        });
        document.dispatchEvent(event);
      }

      return instances;
    }

    // Processar fila de carregamento automático
    static async processAutoLoadQueue() {
      if (WfAjax.isProcessingQueue || WfAjax.autoLoadQueue.length === 0) {
        return;
      }

      WfAjax.isProcessingQueue = true;

      while (WfAjax.autoLoadQueue.length > 0) {
        const instance = WfAjax.autoLoadQueue.shift();
        try {
          await instance.makeRequest();
          // Pequeno delay entre carregamentos para evitar conflitos
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error("WfAjax: Erro no carregamento automático:", error);
        }
      }

      WfAjax.isProcessingQueue = false;
    }

    // Configura listeners globais para formulários
    static setupFormListeners() {
      if (this._listenersInitialized) return;
      this._listenersInitialized = true;

      try {
        const closePanelIfOpen = () => {
          try {
            const triggers = document.querySelectorAll(
              "[WfPanelAjax], [WfPanel1]"
            );
            triggers.forEach((el) => {
              const inst = (el && (el._wfPanelAjax || el._wfPanel1)) || null;
              if (!inst) return;
              try {
                inst.close();
              } catch (_) {}
              try {
                inst.isOpen = false;
                inst.isLoading = false;
                inst.overlayElement = null;
                inst.panelElement = null;
              } catch (_) {}
            });
          } catch (_) {}
          try {
            const ov = document.querySelector(".wfpanel1-overlay");
            if (ov) ov.remove();
            const pn = document.querySelector(".wfpanel1-panel");
            if (pn) pn.remove();
          } catch (e) {}
          try {
            if (
              window.WfPanelAjax &&
              typeof window.WfPanelAjax.initAll === "function"
            ) {
              window.WfPanelAjax.initAll(document);
            }
          } catch (_) {}
        };

        document.addEventListener(
          "click",
          (ev) => {
            const btn =
              ev.target && ev.target.closest && ev.target.closest("button, a");
            if (!btn) return;
            const form = btn.closest && btn.closest("form");
            if (!form || !form.matches || !form.matches("form[WfAjax]")) return;
            try {
              if (
                btn.matches &&
                btn.matches(
                  "a[WfPanelAjax], a[wfpanelajax], a[WfPanel], a[wfpanel]"
                )
              )
                return;
            } catch (e) {}
            window.__WfAjaxLastBtn = btn;
            const tag = (btn.tagName || "").toLowerCase();
            const type = (btn.getAttribute && btn.getAttribute("type")) || "";
            const isSubmit =
              tag === "button"
                ? type
                  ? type.toLowerCase() === "submit"
                  : true
                : tag === "input"
                ? type.toLowerCase() === "submit"
                : false;
            if (isSubmit || btn.hasAttribute("WfAjax")) {
              ev.preventDefault();
              ev.stopPropagation();
              try {
                if (!form.wfValidator && window.WfValid) {
                  new window.WfValid(form);
                }
              } catch (e) {}
              try {
                if (
                  form.swValidator &&
                  typeof form.swValidator.validate === "function"
                ) {
                  const ok = form.swValidator.validate();
                  if (!ok) return;
                }
              } catch (e) {}
              form.dispatchEvent(new Event("submit", { cancelable: true }));
            }
          },
          true
        );

        document.addEventListener(
          "submit",
          async (ev) => {
            const form = ev.target;
            if (!form || !form.matches || !form.matches("form[WfAjax]")) return;
            ev.preventDefault();
            ev.stopPropagation();
            try {
              if (form.checkValidity && !form.checkValidity()) {
                if (form.reportValidity) form.reportValidity();
                return;
              }
            } catch (e) {}
            try {
              if (!form.swValidator && window.WfValid) {
                new window.WfValid(form);
              }
              if (
                form.swValidator &&
                typeof form.swValidator.validate === "function"
              ) {
                const ok = form.swValidator.validate();
                if (!ok) return;
              }
            } catch (e) {}
            try {
              // Confirm com WfAlert se houver atributo
              let confirmMsg = null;
              try {
                const btn = window.__SwAjaxLastBtn;
                confirmMsg =
                  (btn &&
                    btn.getAttribute &&
                    btn.getAttribute("WfAlert-confirm")) ||
                  form.getAttribute("WfAlert-confirm");
              } catch (e) {}
              // Garantir que WfAlert esteja carregado antes de usar
              if (
                confirmMsg &&
                !(
                  window.WfAlert &&
                  typeof window.WfAlert.confirmar === "function"
                )
              ) {
                try {
                  if (
                    window.WebfullLoader &&
                    typeof window.WebfullLoader.load === "function"
                  ) {
                    await window.WebfullLoader.load("sw-alert");
                  }
                } catch (e) {}
              }
              if (confirmMsg) {
                if (
                  window.WfAlert &&
                  typeof window.WfAlert.confirmar === "function"
                ) {
                  const proceed = await new Promise((resolve) =>
                    window.WfAlert.confirmar(confirmMsg, resolve)
                  );
                  if (!proceed) return;
                } else {
                  const ok = window.confirm(confirmMsg);
                  if (!ok) return;
                }
              }
              const action =
                form.getAttribute("action") || form.getAttribute("WfAjax-url");
              const method = (
                form.getAttribute("method") || "POST"
              ).toUpperCase();
              if (!action) return;
              let finalAction = action;
              try {
                const m = finalAction.match(
                  /\/(edit|status|delete|remove|redit)(?:\/(\d+))?\b/i
                );
                if (m && m[1].toLowerCase() === "edit") {
                  const rid = m && m[2] ? parseInt(m[2], 10) : 0;
                  if (!rid || rid === 0) {
                    let sid = null;
                    try {
                      const attrId = form.getAttribute("WfAjax-id");
                      if (attrId) {
                        const p = parseInt(attrId, 10);
                        if (!isNaN(p) && p > 0) sid = p;
                      }
                    } catch (_) {}
                    if (!sid) {
                      try {
                        const hid = form.querySelector("[name='id']");
                        if (hid) {
                          const p = parseInt((hid.value || "").trim(), 10);
                          if (!isNaN(p) && p > 0) sid = p;
                        }
                      } catch (_) {}
                    }
                    if (!sid) {
                      try {
                        const dataId = form.dataset && form.dataset.id;
                        if (dataId) {
                          const p = parseInt(dataId, 10);
                          if (!isNaN(p) && p > 0) sid = p;
                        }
                        if (!sid) {
                          const qData = form.querySelector("[data-id]");
                          const v =
                            (qData &&
                              (qData.getAttribute("data-id") ||
                                (qData.dataset && qData.dataset.id))) ||
                            null;
                          if (v) {
                            const p = parseInt(v, 10);
                            if (!isNaN(p) && p > 0) sid = p;
                          }
                        }
                        if (!sid) {
                          const cData =
                            form.closest && form.closest("[data-id]");
                          const cv =
                            (cData &&
                              (cData.getAttribute("data-id") ||
                                (cData.dataset && cData.dataset.id))) ||
                            null;
                          if (cv) {
                            const p = parseInt(cv, 10);
                            if (!isNaN(p) && p > 0) sid = p;
                          }
                        }
                        if (!sid) {
                          const panel =
                            document.querySelector &&
                            document.querySelector(".wfpanel1-panel");
                          if (panel) {
                            const pv =
                              (panel.getAttribute &&
                                panel.getAttribute("data-id")) ||
                              (panel.dataset && panel.dataset.id) ||
                              null;
                            if (pv) {
                              const p = parseInt(pv, 10);
                              if (!isNaN(p) && p > 0) sid = p;
                            }
                            if (!sid) {
                              const innerData =
                                panel.querySelector &&
                                panel.querySelector("[data-id]");
                              const iv =
                                innerData &&
                                (innerData.getAttribute("data-id") ||
                                  (innerData.dataset && innerData.dataset.id));
                              if (iv) {
                                const p = parseInt(iv, 10);
                                if (!isNaN(p) && p > 0) sid = p;
                              }
                            }
                            if (!sid) {
                              const hrefEl =
                                panel.querySelector &&
                                panel.querySelector("a[href*='/forms/edit/']");
                              const href =
                                hrefEl &&
                                hrefEl.getAttribute &&
                                hrefEl.getAttribute("href");
                              const hm =
                                href && href.match(/\/forms\/edit\/(\d+)/);
                              if (hm && hm[1]) {
                                const p = parseInt(hm[1], 10);
                                if (!isNaN(p) && p > 0) sid = p;
                              }
                            }
                          }
                        }
                        if (!sid) {
                          const anyHidden = form.querySelector(
                            "input[type='hidden'][name*='id']"
                          );
                          const hv = anyHidden && anyHidden.value;
                          if (hv) {
                            const p = parseInt(hv, 10);
                            if (!isNaN(p) && p > 0) sid = p;
                          }
                        }
                      } catch (_) {}
                    }
                    if (sid && sid > 0) {
                      if (/\/edit\/\d+\b/i.test(finalAction)) {
                        finalAction = finalAction.replace(
                          /\/edit\/\d+\b/i,
                          "/edit/" + sid
                        );
                      } else if (/\/edit\b/i.test(finalAction)) {
                        finalAction = finalAction.replace(
                          /\/edit\b/i,
                          "/edit/" + sid
                        );
                      } else {
                        finalAction = finalAction.replace(
                          /\/?$/i,
                          "/edit/" + sid
                        );
                      }
                    } else {
                    }
                  }
                }
              } catch (e) {}
              const fd = new FormData(form);
              try {
                // Garantir que o ID seja enviado em edit quando a URL não inclui /edit/{id}
                const hasEditNoId = /\/(edit)(?!\/\d+)\b/i.test(finalAction);
                const hid = form.querySelector("[name='id']");
                const hv = hid ? (hid.value || "").trim() : "";
                if (hasEditNoId && hv && !fd.has("id")) {
                  fd.append("id", hv);
                }
              } catch (_) {}
              const res = await fetch(finalAction, {
                method,
                body: fd,
                headers: { "X-Requested-With": "XMLHttpRequest" },
                credentials: "same-origin",
              });
              if (!res.ok) {
                let detail = "";
                try {
                  const t = await res.text();
                  if (t && t.trim()) detail = " - " + t.trim().slice(0, 300);
                } catch (_) {}
                throw new Error(
                  "HTTP " + res.status + " " + res.statusText + detail
                );
              }

              let position = "topRight";
              let duration = 2500;
              let successMsg = null;
              try {
                const btn = window.__SwAjaxLastBtn;
                successMsg =
                  (btn &&
                    btn.getAttribute &&
                    btn.getAttribute("WfAlert-success")) ||
                  form.getAttribute("WfAlert-success");
                const posAttr =
                  (btn &&
                    btn.getAttribute &&
                    btn.getAttribute("WfAlert-position")) ||
                  form.getAttribute("WfAlert-position");
                const durAttr =
                  (btn &&
                    btn.getAttribute &&
                    btn.getAttribute("WfAlert-duration")) ||
                  form.getAttribute("WfAlert-duration");
                if (posAttr) position = posAttr;
                if (durAttr) {
                  const d = parseInt(durAttr);
                  if (!isNaN(d) && d > 0) duration = d;
                }
              } catch (e) {}

              let msg = successMsg || "Operação concluída";
              let resp = null;
              let alertType = null;
              try {
                const ct = res.headers.get("content-type") || "";
                if (ct.includes("application/json")) {
                  resp = await res.json();
                  if (
                    resp &&
                    typeof resp.message === "string" &&
                    resp.message.trim() !== ""
                  )
                    msg = resp.message.trim();
                  // Se a API retornou sucesso falso, tratar como erro e não fechar/recarregar
                  if (resp.success === false) {
                    throw new Error(msg || "Falha na operação");
                  }
                } else {
                  // manter mensagem padrão/atributo
                }
              } catch (e) {}
              try {
                if (!successMsg) {
                  if (/\/status\//.test(action)) msg = "Status atualizado";
                  else if (/\/create$/.test(action)) msg = "Dados criado";
                  else if (/\/edit\//.test(action)) msg = "Dados atualizado";
                  else if (/\/delete\//.test(action)) msg = "Registro deletado";
                  else if (/\/remove\//.test(action)) msg = "Registro removido";
                  else if (/\/redit\//.test(action))
                    msg = "Registro restaurado";
                }
                // selecionar tipo verde/vermelho para status
                if (/\/status\//.test(action)) {
                  const st =
                    resp && typeof resp.status === "string"
                      ? resp.status
                      : null;
                  if (st === "A") alertType = "ativado";
                  else if (st === "I") alertType = "desativado";
                }
              } catch (e) {}
              // Feedback de sucesso robusto com WfAlert (carregando o componente se necessário)
              try {
                if (!window.WfAlert) {
                  try {
                    if (
                      window.WebfullLoader &&
                      typeof window.WebfullLoader.load === "function"
                    ) {
                      await window.WebfullLoader.load("sw-alert");
                    }
                  } catch (_) {}
                }
                if (window.WfAlert) {
                  if (
                    alertType === "ativado" &&
                    typeof window.WfAlert.ativado === "function"
                  ) {
                    window.WfAlert.ativado(msg, duration, position);
                  } else if (
                    alertType === "desativado" &&
                    typeof window.WfAlert.desativado === "function"
                  ) {
                    window.WfAlert.desativado(msg, duration, position);
                  } else if (typeof window.WfAlert.sucesso === "function") {
                    window.WfAlert.sucesso(msg, duration, position);
                  }
                }
              } catch (e) {}
              try {
                if (/\/create$/.test(action)) {
                  const els = form.querySelectorAll("input, textarea, select");
                  els.forEach((el) => {
                    const tag = (el.tagName || "").toUpperCase();
                    const type = (el.getAttribute("type") || "").toLowerCase();
                    if (tag === "SELECT") {
                      el.selectedIndex = 0;
                    } else if (type === "checkbox" || type === "radio") {
                      el.checked = false;
                    } else {
                      try {
                        el.value = "";
                      } catch (_) {}
                    }
                  });
                }
              } catch (_) {}
              try {
                const evt = new CustomEvent("wfajax:complete", {
                  detail: { action: finalAction, form },
                  bubbles: true,
                  composed: true,
                });
                document.dispatchEvent(evt);
              } catch (_) {}
              closePanelIfOpen();
              try {
                // Pequeno atraso para garantir que DOM do painel finalize antes do reload
                setTimeout(() => {
                  // Priorizar recarregar a tabela relacionada ao último botão usado
                  try {
                    const btn = window.__SwAjaxLastBtn;
                    let host = null;
                    if (btn && btn.closest) {
                      host = btn.closest("[WfTable]");
                      if (!host) host = btn.closest("table.wftable");
                    }
                    if (
                      host &&
                      window.WfTable &&
                      typeof window.WfTable.reload === "function"
                    ) {
                      window.WfTable.reload(host);
                    }
                  } catch (_) {}
                  try {
                    if (
                      window.WfTable &&
                      typeof window.WfTable.reload === "function"
                    ) {
                      window.WfTable.reload(document);
                    } else if (
                      window.WfTable &&
                      typeof window.WfTable.initAll === "function"
                    ) {
                      window.WfTable.initAll(document);
                      try {
                        window.WfTable.reload(document);
                      } catch (_) {}
                    }
                  } catch (_) {}
                  try {
                    if (
                      window.WfTableAjax &&
                      typeof window.WfTableAjax.initAll === "function"
                    ) {
                      window.WfTableAjax.initAll(document);
                    }
                  } catch (_) {}
                }, 280);
              } catch (e) {}
              try {
                if (
                  window.WfTool &&
                  typeof window.WfTool.initAll === "function"
                )
                  window.WfTool.initAll(document);
              } catch (e) {}
              try {
                if (
                  window.SwPanelAjax &&
                  typeof window.SwPanelAjax.initAll === "function"
                )
                  window.SwPanelAjax.initAll(document);
              } catch (e) {}
            } catch (error) {
              console.warn("WfAjax submit error", error);
              let extra = "";
              try {
                const hid = form.querySelector("[name='id']");
                const idv = hid ? (hid.value || "").trim() : "";
                extra =
                  "\nURL: " + (finalAction || "") + (idv ? "\nID: " + idv : "");
              } catch (_) {}
              const emsg =
                error && error.message
                  ? error.message + extra
                  : "Erro na operação" + extra;
              try {
                if (
                  window.WfAlert &&
                  typeof window.WfAlert.erro === "function"
                ) {
                  window.WfAlert.erro(emsg);
                } else {
                  console.error(emsg);
                }
              } catch (e) {}
              try {
                const evtErr = new CustomEvent("wfajax:error", {
                  detail: { action: finalAction, message: emsg, error },
                  bubbles: true,
                  composed: true,
                });
                document.dispatchEvent(evtErr);
              } catch (_) {}
            }
          },
          true
        );
      } catch (e) {}
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    window.WfAjax = WfAjax;
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfAjax = WfAjax;
    }
  }

  // Auto-init
  const init = () => {
    WfAjax.initAll();
    WfAjax.setupFormListeners();

    const observer = new MutationObserver((mutations) => {
      let shouldInit = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) {
        WfAjax.initAll();
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
