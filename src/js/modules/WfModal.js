(function (window, document) {
  "use strict";

  /**
   * WfModal - Sistema de Modais
   *
   * @author SandroWeb
   * @version 3.0
   * @since WEBFULL Framework v1.0
   */

  class WfModal {
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfModal) return element._wfModal;

      this.element = element;
      this.element._wfModal = this;

      this.id = element.id;
      this.effect = element.getAttribute("WfModal-effect") || "fade";
      const _sizeAttr = element.getAttribute("WfModal-size") || "m";
      this.size = WfModal.normalizeSize(String(_sizeAttr).toLowerCase());
      this.bgColor =
        element.getAttribute("WfModal-bgcolor") || "rgba(0,0,0,0.5)";
      this.contentBgColor =
        element.getAttribute("WfModal-content-bgcolor") ||
        "var(--wf-bg-, #fff)";
      this.contentPadding =
        element.getAttribute("WfModal-content-padding") || "10px";
      this.contentBorderRadius =
        element.getAttribute("WfModal-content-border-radius") || "8px";

      this.isOpen = false;
      this._lastActiveElement = null;

      // Armazenar referências importantes
      this._wfmodalContent = null;
      this._wfmodalEffect = this.effect;

      this.init();
    }

    loadCSS() {
      const cssId = "webfull-wfmodal-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/**
 * WfModal.css - Estilos do Sistema de Modais
 * SandroWeb - 2025
 */

/* ===== MODAL PRINCIPAL ===== */
[WfModal] {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

[WfModal].wfmodal-open {
    display: flex;
    opacity: 1;
}

/* ===== CONTEÚDO DO MODAL ===== */
.wfmodal-content {
    outline: none;
    background: var(--wf-bg-, #fff);
    color: var(--wf-color, #222);
    padding: 20px;
    border-radius: 8px;
    position: relative;
    overflow-y: auto;
    width: min(100% - 2rem, 500px);
    box-sizing: border-box;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    max-height: 90vh;
}

/* ===== TOPO DO MODAL ===== */
.wfmodal-topo {
    padding: 1px 10px;
    position: relative;
    margin: 0 0 12px 0;
    border-radius: 6px 6px 0 0;
    color: white;
    font-size: 22px;
    line-height: 1;
    height: 54px;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ===== TAMANHOS ===== */
.wfmodal-content.wfmodal-pp {
    width: min(100% - 2rem, var(--pp, 380px));
    max-width: var(--pp, 380px);
}

.wfmodal-content.wfmodal-p {
    width: min(100% - 2rem, var(--p, 576px));
    max-width: var(--p, 576px);
}

.wfmodal-content.wfmodal-m {
    width: min(100% - 2rem, var(--m, 768px));
    max-width: var(--m, 768px);
}

.wfmodal-content.wfmodal-g {
    width: min(100% - 2rem, var(--g, 992px));
    max-width: var(--g, 992px);
}

.wfmodal-content.wfmodal-gg {
    width: min(100% - 2rem, var(--gg, 1200px));
    max-width: var(--gg, 1200px);
}

.wfmodal-content.wfmodal-xg {
    width: min(100% - 2rem, var(--xg, 1400px));
    max-width: var(--xg, 1400px);
}

.wfmodal-content.wfmodal-xxg {
    width: min(100% - 2rem, var(--xxg, 1780px));
    max-width: var(--xxg, 1780px);
}

.wfmodal-content.wfmodal-full {
    width: 95vw;
    height: 95vh;
    max-width: none;
    max-height: none;
}

/* ===== TAMANHOS RESPONSIVOS ===== */
@media (max-width: 768px) {
    .wfmodal-content.wfmodal-pp,
    .wfmodal-content.wfmodal-p,
    .wfmodal-content.wfmodal-m,
    .wfmodal-content.wfmodal-g,
    .wfmodal-content.wfmodal-gg,
    .wfmodal-content.wfmodal-xg {
        width: 95%;
        max-width: 95%;
    }

    .wfmodal-content.wfmodal-full {
        width: 98vw;
        height: 98vh;
    }
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
/* Fade */
.wfmodal-fade {
    animation: wfmodal-fade-in 0.3s ease-out;
}

@keyframes wfmodal-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Slide */
.wfmodal-slide {
    animation: wfmodal-slide-in 0.3s ease-out;
}

@keyframes wfmodal-slide-in {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Zoom */
.wfmodal-zoom {
    animation: wfmodal-zoom-in 0.3s ease-out;
}

@keyframes wfmodal-zoom-in {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Bounce */
.wfmodal-bounce {
    animation: wfmodal-bounce-in 0.5s ease-out;
}

@keyframes wfmodal-bounce-in {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    50% {
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Flip */
.wfmodal-flip {
    animation: wfmodal-flip-in 0.6s ease-out;
    transform-style: preserve-3d;
}

@keyframes wfmodal-flip-in {
    from {
        transform: rotateY(-90deg);
        opacity: 0;
    }
    to {
        transform: rotateY(0);
        opacity: 1;
    }
}

/* Rotate */
.wfmodal-rotate {
    animation: wfmodal-rotate-in 0.5s ease-out;
}

@keyframes wfmodal-rotate-in {
    from {
        transform: rotate(-180deg) scale(0.5);
        opacity: 0;
    }
    to {
        transform: rotate(0) scale(1);
        opacity: 1;
    }
}

/* Slide Left */
.wfmodal-slideLeft {
    animation: wfmodal-slide-left-in 0.3s ease-out;
}

@keyframes wfmodal-slide-left-in {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* ===== BOTÃO FECHAR ===== */
.wfmodal-close {
    position: absolute;
    top: 8px;
    right: 10px;
    background: transparent;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    line-height: 1;
}

.wfmodal-close:hover {
    opacity: 0.9;
}

.wfmodal-close:active {
    opacity: 0.8;
}

/* Header title and buttons */
.wfmodal-title {
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin: 0;
}

.wfmodal-close-btn {
    background: transparent;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    line-height: 1;
}

.wfmodal-close-btn:hover {
    opacity: 0.9;
}

.wfmodal-footer {
    text-align: center;
    margin-top: 24px;
}

.wfmodal-action-btn {
    padding: 10px 32px;
    font-size: 1.1rem;
    border-radius: 6px;
    background: #2196f3;
    color: #fff;
    border: none;
    cursor: pointer;
}

.wfmodal-action-btn:hover {
    opacity: 0.95;
}

/* ===== OVERLAY ===== */
.wfmodal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.wfmodal-overlay.wfmodal-open {
    opacity: 1;
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    [WfModal],
    .wfmodal-content,
    .wfmodal-overlay {
        transition: none;
        animation: none;
    }
}

/* ===== ESTADOS DE CARREGAMENTO ===== */
.wfmodal-loading {
    position: relative;
}

.wfmodal-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: wfmodal-spin 1s linear infinite;
}

@keyframes wfmodal-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== FOCUS TRAP ===== */
.wfmodal-content:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}
         `;
        document.head.appendChild(style);
      }
    }

    // Normalize size values to supported class keys
    static normalizeSize(size) {
      const map = {
        pp: "pp",
        p: "p",
        sm: "pp",
        small: "pp",
        m: "m",
        md: "m",
        medium: "m",
        g: "g",
        lg: "g",
        large: "g",
        gg: "gg",
        xg: "xg",
        xxg: "xxg",
        full: "full",
        max: "full",
      };
      return map[size] || "m";
    }

    // Apply inline sizing fallback to ensure modal sizes work across contexts
    static applySizeToElement(el, size) {
      if (!el) return;
      const sizes = {
        pp: "380px",
        p: "576px",
        m: "768px",
        g: "992px",
        gg: "1200px",
        xg: "1400px",
        xxg: "1780px",
      };

      if (size === "full") {
        el.style.width = "95vw";
        el.style.height = "95vh";
        el.style.maxWidth = "none";
        el.style.maxHeight = "none";
        return;
      }

      const px = sizes[size] || sizes["m"];
      el.style.width = `min(100% - 2rem, ${px})`;
      el.style.maxWidth = px;
    }

    init() {
      this.loadCSS();
      this.setupModal();
      this.bindEvents();
    }

    setupModal() {
      // Configurar estilos básicos do modal
      this.element.style.display = "none";
      this.element.style.position = "fixed";
      this.element.style.top = "0";
      this.element.style.left = "0";
      this.element.style.width = "100%";
      this.element.style.height = "100%";
      this.element.style.backgroundColor = this.bgColor;
      this.element.style.justifyContent = "center";
      this.element.style.alignItems = "center";
      this.element.style.zIndex = "10000";
      this.element.style.opacity = "0";
      this.element.style.transition = "opacity 0.3s ease";

      // Configurar conteúdo do modal
      let content = this.element.querySelector(".wfmodal-content");
      if (!content) {
        content = document.createElement("div");
        content.classList.add("wfmodal-content");
        content.classList.add(`wfmodal-${this.size}`);
        content.classList.add(`wfmodal-${this.effect}`);

        // Mover conteúdo existente para dentro do wrapper
        while (this.element.firstChild) {
          content.appendChild(this.element.firstChild);
        }
        this.element.appendChild(content);
      } else {
        content.classList.add(`wfmodal-${this.size}`);
        content.classList.add(`wfmodal-${this.effect}`);
      }

      // aplicar fallback inline de tamanho (garante funcionamento mesmo com specificity falhando)
      WfModal.applySizeToElement(content, this.size);

      // Aplicar estilos ao conteúdo
      content.style.backgroundColor = this.contentBgColor;
      content.style.color = "var(--wf-color, #222)";
      content.style.padding = this.contentPadding;
      content.style.borderRadius = this.contentBorderRadius;
      content.style.position = "relative";
      content.style.overflowY = "auto";
      content.style.boxSizing = "border-box";
      content.setAttribute("tabindex", "-1");
      content.setAttribute("role", "dialog");
      content.setAttribute("aria-modal", "true");

      // Armazenar referência ao conteúdo
      this._wfmodalContent = content;

      // Se existir header `.wfmodal-topo` e ele já tiver um botão com classe
      // `wfmodal-close-btn`, marque-o também como `.wfmodal-close` para reutilizar
      // o comportamento de fechamento já existente (evita criação de botões duplicados).
      const headerEl = content.querySelector(".wfmodal-topo");
      if (headerEl) {
        const existingHeaderBtn = headerEl.querySelector(".wfmodal-close-btn");
        if (existingHeaderBtn) {
          existingHeaderBtn.classList.add("wfmodal-close");
        }
        // Ensure header is positioned to host an absolute close button
        if (getComputedStyle(headerEl).position === "static") {
          headerEl.style.position = "relative";
        }
        // If there's no close button in the header, create one here so
        // the component always provides a top-right close control.
        if (
          !headerEl.querySelector(".wfmodal-close-btn") &&
          !content.querySelector(".wfmodal-close-btn")
        ) {
          const hdrBtn = document.createElement("button");
          hdrBtn.type = "button";
          hdrBtn.className = "wfmodal-close-btn wfmodal-close";
          hdrBtn.setAttribute("aria-label", "Fechar");
          hdrBtn.innerHTML = "&times;";
          // Minimal inline positioning to ensure it sits at the top-right
          hdrBtn.style.background = "none";
          hdrBtn.style.border = "none";
          hdrBtn.style.padding = "0";
          hdrBtn.style.margin = "0";
          hdrBtn.style.fontSize = "24px";
          hdrBtn.style.lineHeight = "1";
          hdrBtn.style.position = "absolute";
          hdrBtn.style.right = "10px";
          hdrBtn.style.top = "12px";
          hdrBtn.style.color = "inherit";
          headerEl.appendChild(hdrBtn);
        }
      }

      // Aplicar transform inicial baseado no efeito
      switch (this.effect) {
        case "slide":
          content.style.transform = "translateY(-50px)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "zoom":
          content.style.transform = "scale(0.8)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "bounce":
          content.style.transform = "scale(0.3)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "flip":
          content.style.transform = "rotateY(-90deg)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "rotate":
          content.style.transform = "rotate(-180deg) scale(0.5)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "slideLeft":
          content.style.transform = "translateX(-100px)";
          content.style.transition = "transform 0.3s ease";
          break;
        case "fade":
        default:
          content.style.transition = "opacity 0.3s ease";
          break;
      }

      // Adicionar botão de fechar se não existir
      let closeBtn = this.element.querySelector(".wfmodal-close");
      if (!closeBtn) {
        closeBtn = document.createElement("button");
        closeBtn.className = "wfmodal-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute("aria-label", "Fechar modal");
        closeBtn.setAttribute("type", "button");
        content.appendChild(closeBtn);
      }
    }

    bindEvents() {
      // Botão de fechar
      const closeBtn = this.element.querySelector(".wfmodal-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.close();
        });
      }

      // Clicar fora do modal
      this.element.addEventListener("click", (e) => {
        if (e.target === this.element) {
          this.close();
        }
      });

      // Tecla ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.close();
        }
      });

      // Focus trap
      this.element.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          this.handleFocusTrap(e);
        }
      });
    }

    handleFocusTrap(e) {
      const focusableElements = this.element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    open() {
      this._lastActiveElement = document.activeElement;
      this.isOpen = true;

      this.element.classList.add("wfmodal-open");
      this.element.style.display = "flex";

      // Aplicar animação com setTimeout para timing perfeito
      setTimeout(() => {
        this.element.style.opacity = "1";

        // Aplicar transform final baseado no efeito
        if (this._wfmodalContent) {
          switch (this.effect) {
            case "slide":
              this._wfmodalContent.style.transform = "translateY(0)";
              break;
            case "zoom":
              this._wfmodalContent.style.transform = "scale(1)";
              break;
            case "bounce":
              this._wfmodalContent.style.transform = "scale(1)";
              break;
            case "flip":
              this._wfmodalContent.style.transform = "rotateY(0deg)";
              break;
            case "rotate":
              this._wfmodalContent.style.transform = "rotate(0deg) scale(1)";
              break;
            case "slideLeft":
              this._wfmodalContent.style.transform = "translateX(0)";
              break;
            case "fade":
            default:
              this._wfmodalContent.style.transform = "none";
              break;
          }
        }

        // Focus no conteúdo
        if (this._wfmodalContent) {
          this._wfmodalContent.focus();
        }

        // Disparar evento
        this.element.dispatchEvent(
          new CustomEvent("wfmodal:opened", {
            detail: { modal: this.element, id: this.id },
          })
        );
      }, 10);

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    close() {
      this.isOpen = false;

      // Aplicar transform de fechamento baseado no efeito
      if (this._wfmodalContent) {
        switch (this.effect) {
          case "slide":
            this._wfmodalContent.style.transform = "translateY(-50px)";
            break;
          case "zoom":
            this._wfmodalContent.style.transform = "scale(0.8)";
            break;
          case "bounce":
            this._wfmodalContent.style.transform = "scale(0.3)";
            break;
          case "flip":
            this._wfmodalContent.style.transform = "rotateY(-90deg)";
            break;
          case "rotate":
            this._wfmodalContent.style.transform = "rotate(-180deg) scale(0.5)";
            break;
          case "slideLeft":
            this._wfmodalContent.style.transform = "translateX(-100px)";
            break;
          case "fade":
          default:
            this._wfmodalContent.style.transform = "none";
            break;
        }
      }

      this.element.style.opacity = "0";

      // Fechar com setTimeout para permitir animação
      setTimeout(() => {
        this.element.classList.remove("wfmodal-open");
        this.element.style.display = "none";

        // Restore body scroll
        document.body.style.overflow = "";

        // Restore focus
        if (this._lastActiveElement) {
          this._lastActiveElement.focus();
        }

        // Disparar evento
        this.element.dispatchEvent(
          new CustomEvent("wfmodal:closed", {
            detail: { modal: this.element, id: this.id },
          })
        );
      }, 300);
    }

    // Métodos estáticos
    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfModal]");
      const instances = [];

      elements.forEach((el) => {
        if (!el._wfModal) {
          instances.push(new WfModal(el));
        } else {
          instances.push(el._wfModal);
        }
      });

      // Configurar triggers
      WfModal.setupTriggers();

      return instances;
    }

    static setupTriggers() {
      const triggers = document.querySelectorAll(
        "[WfModal-id], [data-wfmodal]"
      );
      triggers.forEach((trigger) => {
        if (trigger._wfModalBound) return;

        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          let id =
            trigger.getAttribute("WfModal-id") ||
            trigger.getAttribute("data-wfmodal");

          // Fallback para href
          if (
            !id &&
            trigger.getAttribute("href") &&
            trigger.getAttribute("href").startsWith("#")
          ) {
            id = trigger.getAttribute("href").substring(1);
          }

          if (id) {
            WfModal.open(id);
          }
        });

        trigger._wfModalBound = true;
      });
    }

    static open(id) {
      // Remover # se existir
      const cleanId = id && id.startsWith && id.startsWith('#') ? id.substring(1) : id;
      const el = document.getElementById(cleanId);
      if (el && el._wfModal) {
        el._wfModal.open();
      }
    }

    static close(id) {
      // Remover # se existir
      const cleanId = id && id.startsWith && id.startsWith('#') ? id.substring(1) : id;
      const el = document.getElementById(cleanId);
      if (el && el._wfModal) {
        el._wfModal.close();
      }
    }

    static closeAll() {
      const modals = document.querySelectorAll('[WfModal].wfmodal-open');
      modals.forEach(modal => {
        if (modal._wfModal) {
          modal._wfModal.close();
        }
      });
    }

    static show(options) {
      // Se receber apenas uma string, assume que é o conteúdo
      if (typeof options === 'string') {
        options = { content: options };
      }

      // Configurações padrão
      const config = {
        title: options.title || '',
        content: options.content || '',
        btn: options.btn || '',
        size: options.size || 'm',
        effect: options.effect || 'fade',
        bgcolor: options.bgcolor || 'rgba(0,0,0,0.5)',
      };

      // Criar ID único para o modal
      const modalId = 'wfmodal-dynamic-' + Date.now();

      // Criar estrutura do modal
      const modalHTML = `
        <div WfModal id="${modalId}" WfModal-size="${config.size}" WfModal-effect="${config.effect}" WfModal-bgcolor="${config.bgcolor}">
          <div class="wfmodal-topo Bprin">
            <h3 class="wfmodal-title">${config.title}</h3>
          </div>
          <div style="padding: 20px;">
            ${config.content}
          </div>
        </div>
      `;

      // Adicionar modal ao body
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = modalHTML.trim();
      const modalElement = tempDiv.firstChild;
      document.body.appendChild(modalElement);

      // Inicializar o modal
      const modalInstance = new WfModal(modalElement);

      // Remover modal do DOM quando fechar
      modalElement.addEventListener('wfmodal:closed', () => {
        setTimeout(() => {
          modalElement.remove();
        }, 100);
      });

      // Abrir o modal
      setTimeout(() => {
        modalInstance.open();
      }, 10);

      return modalInstance;
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfModal = WfModal;
    }
    window.WfModal = WfModal;

    // Auto-init
    const init = () => {
      WfModal.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfModal.initAll();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(window, document);
