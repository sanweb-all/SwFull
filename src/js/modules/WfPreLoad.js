/**
 * WfPreLoad - Sistema de Preload de Páginas
 *
 * @author SandroWeb
 * @version 3.0
 * @since WEBFULL Framework v1.0
 */
(function (window, document) {
  "use strict";

  class WfPreLoad {
    constructor(element) {
      if (element._wfPreLoad) return element._wfPreLoad;
      this.element = element;
      element._wfPreLoad = this;

      this.effect = this.element.getAttribute("WfPreLoad-effect") || "fadeup";
      this.minDisplayTime =
        parseInt(this.element.getAttribute("WfPreLoad-min-display-time")) ||
        1000;
      this.transitionDuration =
        parseInt(this.element.getAttribute("WfPreLoad-transition-duration")) ||
        900;
      this.backgroundColor =
        this.element.getAttribute("WfPreLoad-background-color") || "#fff";
      this.mainSelector =
        this.element.getAttribute("WfPreLoad-main-selector") || "main";
      this.debug = this.element.getAttribute("WfPreLoad-debug") === "true";
      this.handleMain =
        this.element.getAttribute("WfPreLoad-handle-main") !== "false";
      this.maxWait =
        parseInt(this.element.getAttribute("WfPreLoad-max-wait")) || 5000;
      this.onFinish = this.element.getAttribute("WfPreLoad-on-finish");

      this.isFinished = false;
      this.startTime = null;
      this.hideCalled = false;

      this.loadCSS();
      this.init();
      try {
        this.element._wfPreLoad = this;
      } catch (_) {}
    }

    loadCSS() {
      if (!document.getElementById("wfpreload-styles")) {
        const style = document.createElement("style");
        style.id = "wfpreload-styles";
        style.textContent = `
/**
 * WfPreLoad.css - Estilos do Sistema de Preload de Páginas
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
.wfpreload-container {
   display: flex !important;
   align-items: center;
   justify-content: center;
   position: fixed !important;
   top: 0;
   left: 0;
   width: 100vw !important;
   height: 100vh !important;
   background: var(--bg, #ffffff);
   color: var(--text, #374151);
   z-index: 999999 !important;
   transition: opacity 0.9s ease, transform 0.9s ease;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* ===== CONTEÚDO ===== */
.wfpreload-content {
   text-align: center;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 20px;
   max-width: 300px;
   padding: 40px;
}

.wfpreload-content > * {
   text-align: center;
   width: 100%;
}

/* ===== SPINNER ===== */
.wfpreload-spinner {
   width: 40px;
   height: 40px;
   border: 3px solid var(--border, #e5e7eb);
   border-top: 3px solid var(--prin, #3b82f6);
   border-radius: 50%;
   animation: wfpreload-spin 1s linear infinite;
   margin: 0 auto;
}

@keyframes wfpreload-spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}

/* ===== TEXTO ===== */
.wfpreload-text {
   font-size: 16px;
   font-weight: 500;
   color: var(--text, #374151);
   margin: 0;
   line-height: 1.4;
}

/* ===== EFEITOS DE ENTRADA ===== */
.wfpreload-container[style*="opacity: 0"] {
   opacity: 0 !important;
}

.wfpreload-container[style*="transform"] {
   transform: var(--transform-value);
}

/* ===== EFEITOS DE SAÍDA ===== */
.wfpreload-container.wfpreload-exit {
   opacity: 0;
}

.wfpreload-container.wfpreload-exit-fadeup {
   opacity: 0;
   transform: translateY(-20px);
}

.wfpreload-container.wfpreload-exit-fadedown {
   opacity: 0;
   transform: translateY(20px);
}

.wfpreload-container.wfpreload-exit-fadeleft {
   opacity: 0;
   transform: translateX(-20px);
}

.wfpreload-container.wfpreload-exit-faderight {
   opacity: 0;
   transform: translateX(20px);
}

.wfpreload-container.wfpreload-exit-zoomout {
   opacity: 0;
   transform: scale(0.9);
}

.wfpreload-container.wfpreload-exit-zoomin {
   opacity: 0;
   transform: scale(1.1);
}

/* ===== VARIAÇÕES DE SPINNER ===== */
.wfpreload-spinner.wfpreload-spinner-dots {
   width: 40px;
   height: 40px;
   border: none;
   background: none;
   position: relative;
}

.wfpreload-spinner.wfpreload-spinner-dots::before,
.wfpreload-spinner.wfpreload-spinner-dots::after {
   content: '';
   position: absolute;
   width: 8px;
   height: 8px;
   border-radius: 50%;
   background: var(--prin, #3b82f6);
   animation: wfpreload-dots 1.4s ease-in-out infinite both;
}

.wfpreload-spinner.wfpreload-spinner-dots::before {
   left: 0;
   animation-delay: -0.32s;
}

.wfpreload-spinner.wfpreload-spinner-dots::after {
   right: 0;
   animation-delay: 0.32s;
}

@keyframes wfpreload-dots {
   0%, 80%, 100% {
      transform: scale(0);
   }
   40% {
      transform: scale(1);
   }
}

.wfpreload-spinner.wfpreload-spinner-pulse {
   width: 40px;
   height: 40px;
   border: none;
   background: var(--prin, #3b82f6);
   border-radius: 50%;
   animation: wfpreload-pulse 1.2s ease-in-out infinite;
}

@keyframes wfpreload-pulse {
   0% {
      transform: scale(0.8);
      opacity: 1;
   }
   100% {
      transform: scale(2.4);
      opacity: 0;
   }
}

.wfpreload-spinner.wfpreload-spinner-bars {
   width: 40px;
   height: 40px;
   border: none;
   background: none;
   position: relative;
}

.wfpreload-spinner.wfpreload-spinner-bars::before {
   content: '';
   position: absolute;
   width: 4px;
   height: 40px;
   background: var(--prin, #3b82f6);
   left: 50%;
   transform: translateX(-50%);
   animation: wfpreload-bars 1.2s ease-in-out infinite;
}

@keyframes wfpreload-bars {
   0%, 40%, 100% {
      transform: translateX(-50%) scaleY(0.4);
   }
   20% {
      transform: translateX(-50%) scaleY(1);
   }
}

/* ===== TEMAS ===== */
.wfpreload-theme-light {
   --bg: #ffffff;
   --text: #374151;
   --border: #e5e7eb;
   --prin: #3b82f6;
}

.wfpreload-theme-dark {
   --bg: #1e293b;
   --text: #f1f5f9;
   --border: #475569;
   --prin: #60a5fa;
}

.wfpreload-theme-primary {
   --bg: #3b82f6;
   --text: #ffffff;
   --border: #60a5fa;
   --prin: #ffffff;
}

.wfpreload-theme-success {
   --bg: #10b981;
   --text: #ffffff;
   --border: #34d399;
   --prin: #ffffff;
}

.wfpreload-theme-warning {
   --bg: #f59e0b;
   --text: #ffffff;
   --border: #fbbf24;
   --prin: #ffffff;
}

.wfpreload-theme-danger {
   --bg: #ef4444;
   --text: #ffffff;
   --border: #f87171;
   --prin: #ffffff;
}

/* ===== TAMANHOS ===== */
.wfpreload-small .wfpreload-spinner {
   width: 24px;
   height: 24px;
   border-width: 2px;
}

.wfpreload-small .wfpreload-text {
   font-size: 14px;
}

.wfpreload-large .wfpreload-spinner {
   width: 60px;
   height: 60px;
   border-width: 4px;
}

.wfpreload-large .wfpreload-text {
   font-size: 20px;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   .wfpreload-content {
      padding: 30px 20px;
      gap: 16px;
   }

   .wfpreload-spinner {
      width: 32px;
      height: 32px;
      border-width: 2px;
   }

   .wfpreload-text {
      font-size: 14px;
   }
}

@media (max-width: 480px) {
   .wfpreload-content {
      padding: 20px 16px;
      gap: 12px;
   }

   .wfpreload-spinner {
      width: 28px;
      height: 28px;
      border-width: 2px;
   }

   .wfpreload-text {
      font-size: 13px;
   }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfpreload-container,
   .wfpreload-spinner {
      transition: none !important;
      animation: none !important;
   }

   .wfpreload-spinner {
      border: 3px solid var(--border, #e5e7eb);
      border-top: 3px solid var(--prin, #3b82f6);
   }
}

/* ===== FOCUS STATES ===== */
.wfpreload-container:focus-within {
   outline: 2px solid var(--prin, #3b82f6);
   outline-offset: 2px;
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfpreload-container {
   --bg: #1e293b;
   --text: #f1f5f9;
   --border: #475569;
   --prin: #60a5fa;
}

html.wfday-night .wfpreload-spinner {
   border-color: #475569;
   border-top-color: #60a5fa;
}

/* ===== ANIMAÇÕES ESPECIAIS ===== */
@keyframes wfpreload-fade-in {
   from {
      opacity: 0;
      transform: translateY(20px);
   }
   to {
      opacity: 1;
      transform: translateY(0);
   }
}

.wfpreload-container {
   animation: wfpreload-fade-in 0.5s ease-out;
}

/* ===== ESTADOS ESPECIAIS ===== */
.wfpreload-container.wfpreload-loading {
   cursor: wait;
}

.wfpreload-container.wfpreload-error {
   background: var(--error-bg, #fef2f2);
   color: var(--error-text, #dc2626);
}

.wfpreload-container.wfpreload-error .wfpreload-spinner {
   border-color: var(--error-border, #fecaca);
   border-top-color: var(--error-text, #dc2626);
}

/* ===== UTILITÁRIOS ===== */
.wfpreload-hidden {
   display: none !important;
}

.wfpreload-visible {
   display: flex !important;
}

.wfpreload-no-transition {
   transition: none !important;
}

/* ===== DEBUG ===== */
.wfpreload-debug {
   border: 2px dashed #ff0000;
   background: rgba(255, 0, 0, 0.1);
}

.wfpreload-debug::before {
   content: 'WfPreLoad Debug';
   position: absolute;
   top: -20px;
   left: 0;
   background: #ff0000;
   color: white;
   padding: 2px 6px;
   font-size: 10px;
   border-radius: 2px;
   z-index: 2001;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfpreload-container::-webkit-scrollbar {
   width: 6px;
   height: 6px;
}

.wfpreload-container::-webkit-scrollbar-track {
   background: var(--bg-light, #f5f5f5);
   border-radius: 3px;
}

.wfpreload-container::-webkit-scrollbar-thumb {
   background: var(--border, #ddd);
   border-radius: 3px;
}

.wfpreload-container::-webkit-scrollbar-thumb:hover {
   background: var(--text-light, #999);
}

html.wfday-night .wfpreload-container::-webkit-scrollbar-track {
   background: var(--bg-light, #2a2a2a);
}

html.wfday-night .wfpreload-container::-webkit-scrollbar-thumb {
   background: var(--border, #555);
}

html.wfday-night .wfpreload-container::-webkit-scrollbar-thumb:hover {
   background: var(--text-light, #666);
}
         `;
        document.head.appendChild(style);
      }
    }

    init() {
      this.setupComponent();
      this.startPreload();
    }

    setupComponent() {
      this.element.classList.add("wfpreload-container");
      this.startTime = Date.now();

      if (this.debug) {
        console.log("WfPreLoad: Iniciando preload...");
      }
    }

    startPreload() {
      // Ocultar conteúdo principal se handleMain estiver ativo
      if (this.handleMain) {
        const mainContent = document.querySelector(this.mainSelector);
        if (mainContent) {
          mainContent.style.display = "none";
        }
      }

      // Aguardar carregamento da página
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () =>
          this.handlePageReady()
        );
      } else {
        this.handlePageReady();
      }

      // Timeout de segurança
      setTimeout(() => {
        if (!this.isFinished) {
          this.finish();
        }
      }, this.maxWait);
    }

    handlePageReady() {
      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, this.minDisplayTime - elapsed);

      setTimeout(() => {
        this.finish();
      }, remaining);
    }

    finish() {
      if (this.isFinished || this.hideCalled) return;

      this.isFinished = true;
      this.hideCalled = true;

      if (this.debug) {
        console.log("WfPreLoad: Finalizando preload...");
      }

      // Aplicar efeito de saída
      this.applyExitEffect();

      // Mostrar conteúdo principal
      if (this.handleMain) {
        const mainContent = document.querySelector(this.mainSelector);
        if (mainContent) {
          mainContent.style.display = "";
        }
      }

      // Executar callback
      if (this.onFinish && typeof window[this.onFinish] === "function") {
        window[this.onFinish]();
      }

      // Disparar evento customizado
      this.element.dispatchEvent(new CustomEvent("wfpreload:finished"));

      // Remover elemento após transição
      setTimeout(() => {
        this.element.remove();
      }, this.transitionDuration);
    }

    applyExitEffect() {
      switch (this.effect) {
        case "fadeup":
          this.element.style.transform = "translateY(-20px)";
          this.element.style.opacity = "0";
          break;
        case "fadedown":
          this.element.style.transform = "translateY(20px)";
          this.element.style.opacity = "0";
          break;
        case "fadeleft":
          this.element.style.transform = "translateX(-20px)";
          this.element.style.opacity = "0";
          break;
        case "faderight":
          this.element.style.transform = "translateX(20px)";
          this.element.style.opacity = "0";
          break;
        case "zoomout":
          this.element.style.transform = "scale(0.9)";
          this.element.style.opacity = "0";
          break;
        case "zoomin":
          this.element.style.transform = "scale(1.1)";
          this.element.style.opacity = "0";
          break;
        case "fade":
        default:
          this.element.style.opacity = "0";
          break;
      }
    }

    // Método público para forçar finalização
    forceFinish() {
      this.finish();
    }

    // Método público para verificar status
    isFinished() {
      return this.isFinished;
    }

    static initAll(container = document, options = {}) {
      const elements = container.querySelectorAll("[WfPreLoad]");
      const instances = [];

      elements.forEach((el) => {
        if (!el._wfPreLoad) {
          const instance = new WfPreLoad(el);
          try {
            el._wfPreLoad = instance;
          } catch (_) {}
          instances.push(instance);
        } else {
          instances.push(el._wfPreLoad);
        }
      });

      return instances;
    }

    // Métodos estáticos de conveniência
    static finish(element) {
      const instance = element._wfPreLoad;
      if (instance) {
        instance.forceFinish();
      }
    }

    static isFinished(element) {
      const instance = element._wfPreLoad;
      return instance ? instance.isFinished() : false;
    }

    static create(options = {}) {
      const element = document.createElement("div");
      element.setAttribute("WfPreLoad", "");

      // Aplicar opções como atributos
      if (options.effect)
        element.setAttribute("WfPreLoad-effect", options.effect);
      if (options.minDisplayTime)
        element.setAttribute(
          "WfPreLoad-min-display-time",
          options.minDisplayTime
        );
      if (options.transitionDuration)
        element.setAttribute(
          "WfPreLoad-transition-duration",
          options.transitionDuration
        );
      if (options.backgroundColor)
        element.setAttribute(
          "WfPreLoad-background-color",
          options.backgroundColor
        );
      if (options.mainSelector)
        element.setAttribute("WfPreLoad-main-selector", options.mainSelector);
      if (options.debug) element.setAttribute("WfPreLoad-debug", options.debug);
      if (options.handleMain !== undefined)
        element.setAttribute("WfPreLoad-handle-main", options.handleMain);
      if (options.maxWait)
        element.setAttribute("WfPreLoad-max-wait", options.maxWait);
      if (options.onFinish)
        element.setAttribute("WfPreLoad-on-finish", options.onFinish);

      // Conteúdo padrão
      element.innerHTML = `
         <div class="wfpreload-content">
            <div class="wfpreload-spinner"></div>
            <div class="wfpreload-text">Carregando...</div>
         </div>
      `;

      document.body.appendChild(element);
      return new WfPreLoad(element);
    }

    static show(options = {}) {
      return WfPreLoad.create(options);
    }

    static hide() {
      const preloads = document.querySelectorAll("[WfPreLoad]");
      preloads.forEach((preload) => {
        const instance = preload._wfPreLoad;
        if (instance) {
          instance.forceFinish();
        }
      });
    }
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfPreLoad = WfPreLoad;
  }

  // Expor globalmente sempre
  if (typeof window !== "undefined") {
    window.WfPreLoad = WfPreLoad;
  }

  // Auto-inicialização apenas se WebFull não estiver presente
  if (typeof window !== "undefined" && !window.WebFull) {
    document.addEventListener("DOMContentLoaded", () => {
      WfPreLoad.initAll();
    });
  }
})(window, document);
