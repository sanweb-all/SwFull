(function(window, document) {
  "use strict";

/**
 * WfPanel - Sistema de Painéis Deslizantes
 *
 * @author SandroWeb
 * @version 3.0
 * @since WEBFULL Framework v1.0
 */

class WfPanel {
  constructor(element) {
    this.element = element;
    this.side = this.element.getAttribute("WfPanel-side") || "right";
    this.size = this.element.getAttribute("WfPanel-size") || "medium";
    this.overlay = this.element.getAttribute("WfPanel-overlay") !== "false";
    this.closeOnOutside =
      this.element.getAttribute("WfPanel-close-on-outside") !== "false";
    this.closeOnEsc =
      this.element.getAttribute("WfPanel-close-on-esc") !== "false";
    this.effect = this.element.getAttribute("WfPanel-effect") || "slide";
    // Duração da animação em ms (atributo opcional WfPanel-duration: '800', '800ms', or keywords 'slow'/'fast')
    this.duration = this.element.getAttribute("WfPanel-duration") || "";
    this.durationMs = (function (effect, duration) {
      if (!duration) {
        // map by effect default
        if (effect === "bounce") return 400;
        if (effect === "elastic") return 500;
        return 300;
      }
      const d = String(duration).trim();
      if (/^\d+ms$/.test(d)) return parseInt(d.replace("ms", ""), 10);
      if (/^\d+$/.test(d)) return parseInt(d, 10);
      if (d === "slow") return 800;
      if (d === "fast") return 150;
      return 300;
    })(this.effect, this.duration);

    this.isOpen = false;
    this.overlayElement = null;
    this._lastActiveElement = null;

    this.init();
  }

  init() {
    this.loadCSS();
    this.setupPanel();
    this.createOverlay();
    this.bindEvents();
  }

  loadCSS() {
    if (!document.getElementById("wfpanel-styles")) {
      const style = document.createElement("style");
      style.id = "wfpanel-styles";
      style.textContent = `
/**
 * WfPanel.css - Estilos do Sistema de Painéis Deslizantes
 * SandroWeb - 2025
 */

/* ===== PAINEL PRINCIPAL ===== */
[WfPanel] {
    position: fixed;
    z-index: 99998;
    background: var(--container, #fff);
    color: var(--color, #222);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    display: none;
    overflow-y: auto;
    overflow-x: hidden;
}

/* ===== POSICIONAMENTO ===== */
/* Esquerda */
[WfPanel][WfPanel-side="left"] {
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
}

[WfPanel][WfPanel-side="left"].wfpanel-open {
    transform: translateX(0);
}

/* Direita */
[WfPanel][WfPanel-side="right"] {
    top: 0;
    right: 0;
    height: 100vh;
    transform: translateX(100%);
}

[WfPanel][WfPanel-side="right"].wfpanel-open {
    transform: translateX(0);
}

/* Topo */
[WfPanel][WfPanel-side="top"] {
    top: 0;
    left: 0;
    width: 100vw;
    transform: translateY(-100%);
}

[WfPanel][WfPanel-side="top"].wfpanel-open {
    transform: translateY(0);
}

/* Baixo */
[WfPanel][WfPanel-side="bottom"] {
    bottom: 0;
    left: 0;
    width: 100vw;
    transform: translateY(100%);
}

[WfPanel][WfPanel-side="bottom"].wfpanel-open {
    transform: translateY(0);
}

/* ===== TAMANHOS ===== */
.wfpanel-small {
    width: 250px;
}

.wfpanel-medium {
    width: 350px;
}

.wfpanel-large {
    width: 500px;
}

.wfpanel-xlarge {
    width: 700px;
}

.wfpanel-full {
    width: 100vw;
}

/* Para painéis verticais (top/bottom) */
[WfPanel-side="top"].wfpanel-small,
[WfPanel-side="bottom"].wfpanel-small {
    width: 100vw;
    height: 250px;
}

[WfPanel-side="top"].wfpanel-medium,
[WfPanel-side="bottom"].wfpanel-medium {
    width: 100vw;
    height: 350px;
}

[WfPanel-side="top"].wfpanel-large,
[WfPanel-side="bottom"].wfpanel-large {
    width: 100vw;
    height: 500px;
}

[WfPanel-side="top"].wfpanel-xlarge,
[WfPanel-side="bottom"].wfpanel-xlarge {
    width: 100vw;
    height: 700px;
}

[WfPanel-side="top"].wfpanel-full,
[WfPanel-side="bottom"].wfpanel-full {
    width: 100vw;
    height: 100vh;
}

/* ===== CABEÇALHO DO PAINEL ===== */
.wfpanel-header {
    background: var(--prin, #2196f3);
    color: white;
    padding: 1rem 1.5rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.wfpanel-title {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
}

.wfpanel-close {
    background: none;
    border: none;
    color: white;
    font-size: 4rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.wfpanel-close:hover {
   background: rgba(255, 255, 255, 0.2);
   color: var(--amar, #ffeb3b);
   transform: scale(1.1);
}

.wfpanel-close:active {
    transform: scale(0.95);
}

/* ===== CONTEÚDO DO PAINEL ===== */
.wfpanel-content {
    padding: 1.5rem;
    flex: 1;
    overflow-y: auto;
}

.wfpanel-body {
    line-height: 1.6;
    font-size: 1.4rem;
}

/* ===== RODAPÉ DO PAINEL ===== */
.wfpanel-footer {
    background: #f8f9fa;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

/* ===== OVERLAY ===== */
.wfpanel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: none;
}

.wfpanel-overlay.wfpanel-open {
    opacity: 1;
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
/* Slide */
.wfpanel-slide {
    transition: transform 0.3s ease;
}

/* Fade */
.wfpanel-fade {
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.wfpanel-fade.wfpanel-open {
    opacity: 1;
}

/* Bounce */
.wfpanel-bounce {
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Elastic */
.wfpanel-elastic {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* ===== TEMAS ===== */
.wfpanel-primary .wfpanel-header {
    background: #007bff;
}

.wfpanel-success .wfpanel-header {
    background: #28a745;
}

.wfpanel-warning .wfpanel-header {
    background: #ffc107;
    color: #212529;
}

.wfpanel-danger .wfpanel-header {
    background: #dc3545;
}

.wfpanel-info .wfpanel-header {
    background: #17a2b8;
}

.wfpanel-dark .wfpanel-header {
    background: #343a40;
}



/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    [WfPanel],
    .wfpanel-overlay {
        transition: none;
    }
}

/* ===== FOCUS STATES ===== */
.wfpanel-close:focus {
    outline: 2px solid #transparent;
    outline-offset: 2px;
}

/* ===== ESTADOS DE CARREGAMENTO ===== */
.wfpanel-loading {
    position: relative;
    min-height: 200px;
}

.wfpanel-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #2196f3;
    border-radius: 50%;
    animation: wfpanel-spin 1s linear infinite;
}

@keyframes wfpanel-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night [WfPanel] {
    background: #1a1a1a;
    color: #eee;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

html.wfday-night .wfpanel-footer {
    background: #2a2a2a;
    border-top-color: #444;
}

html.wfday-night .wfpanel-close:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfpanel-content::-webkit-scrollbar {
    width: 6px;
}

.wfpanel-content::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.wfpanel-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 0;
}

.wfpanel-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

html.wfday-night .wfpanel-content::-webkit-scrollbar-track {
    background: #2a2a2a;
}

html.wfday-night .wfpanel-content::-webkit-scrollbar-thumb {
    background: #555;
}

html.wfday-night .wfpanel-content::-webkit-scrollbar-thumb:hover {
    background: #666;
}

/* ===== RESPONSIVO (MOBILE) ===== */
@media (max-width: 768px) {
    /* Em mobile, painéis laterais devem ocupar 100% da largura */
    [WfPanel][WfPanel-side="left"],
    [WfPanel][WfPanel-side="right"] {
        width: 100vw !important;
        max-width: 100vw !important;
    }

    /* Garantir altura total também quando aplicável */
    [WfPanel][WfPanel-side="left"],
    [WfPanel][WfPanel-side="right"],
    [WfPanel][WfPanel-side="top"],
    [WfPanel][WfPanel-side="bottom"] {
        height: 100vh !important;
        max-height: 100vh !important;
    }
}
          `;
      document.head.appendChild(style);
    }
  }

  setupPanel() {
    // Ocultar completamente o painel
    this.element.style.display = "none";

    // Aplicar classes CSS de efeito
    this.element.classList.add(`wfpanel-${this.effect}`);

    // Processar tamanho
    const processedSize = this.processSize(this.size);

    // Se processedSize for uma keyword (small, medium, large, etc) adiciona classe
    // Caso contrário (valor com unidade CSS) aplica inline style para largura/altura
    if (!/\d+(px|%|vw|vh|em|rem)$/.test(String(processedSize))) {
      const sizeClass = `wfpanel-${processedSize}`;
      this.element.classList.add(sizeClass);
    } else {
      if (this.side === "left" || this.side === "right") {
        this.element.style.width = processedSize;
      } else {
        this.element.style.height = processedSize;
      }
    }

    // Criar estrutura se não existir
    this.createStructure();
  }

  createStructure() {
    // Verificar se já tem estrutura
    if (this.element.querySelector(".wfpanel-header")) {
      return;
    }

    // Criar header se não existir
    let header = this.element.querySelector(".wfpanel-header");
    if (!header) {
      header = document.createElement("div");
      header.className = "wfpanel-header";

      const title = document.createElement("h3");
      title.className = "wfpanel-title";
      // título será preenchido ao abrir (pode vir do botão que chamou)
      title.textContent = "";

      const closeBtn = document.createElement("button");
      closeBtn.className = "wfpanel-close";
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute("aria-label", "Fechar painel");
      closeBtn.setAttribute("type", "button");

      header.appendChild(title);
      header.appendChild(closeBtn);

      this.element.insertBefore(header, this.element.firstChild);
    }

    // Criar content wrapper se não existir
    let content = this.element.querySelector(".wfpanel-content");
    if (!content) {
      content = document.createElement("div");
      content.className = "wfpanel-content";

      // Mover conteúdo existente para o wrapper
      const children = Array.from(this.element.children);
      children.forEach((child) => {
        if (
          !child.classList.contains("wfpanel-header") &&
          !child.classList.contains("wfpanel-footer")
        ) {
          content.appendChild(child);
        }
      });

      this.element.appendChild(content);
    }
  }

  createOverlay() {
    if (this.overlay) {
      this.overlayElement = document.createElement("div");
      this.overlayElement.className = "wfpanel-overlay";
      document.body.appendChild(this.overlayElement);
    }
  }

  bindEvents() {
    // Botão fechar
    const closeBtn = this.element.querySelector(".wfpanel-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Overlay click
    if (this.overlayElement && this.closeOnOutside) {
      this.overlayElement.addEventListener("click", () => this.close());
    }

    // ESC key
    if (this.closeOnEsc) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.close();
        }
      });
    }

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
    if (this.isOpen) return;

    this._lastActiveElement = document.activeElement;
    this.isOpen = true;

    // Mostrar painel
    // Se o painel estiver dentro de outro container que cria stacking context,
    // movemos temporariamente para document.body para garantir que o z-index funcione
    try {
      if (this.element.parentNode !== document.body) {
        this._originalParent = this.element.parentNode;
        this._originalNextSibling = this.element.nextSibling;
        document.body.appendChild(this.element);
      }
    } catch (err) {
      // falha silenciosa ao reparentar
    }

    // Garantir z-index acima do overlay
    if (this.overlayElement) {
      this.overlayElement.style.zIndex = 99998;
      this.overlayElement.style.display = "block";
    }
    this.element.style.zIndex = 99999;

    // Preparar transform inicial para forçar animação via inline styles
    const side = this.side;
    let initialTransform = "";
    let targetTransform = "";
    if (side === "left") {
      initialTransform = "translateX(-100%)";
      targetTransform = "translateX(0)";
    } else if (side === "right") {
      initialTransform = "translateX(100%)";
      targetTransform = "translateX(0)";
    } else if (side === "top") {
      initialTransform = "translateY(-100%)";
      targetTransform = "translateY(0)";
    } else if (side === "bottom") {
      initialTransform = "translateY(100%)";
      targetTransform = "translateY(0)";
    }

    // Aplicar estado inicial e mostrar
    if (initialTransform) {
      this.element.style.transform = initialTransform;
    }

    // Definir transição inline para garantir que a alteração de transform seja animada
    const durationMs =
      this.durationMs ||
      (this.effect === "bounce" ? 400 : this.effect === "elastic" ? 500 : 300);
    this.element.style.setProperty(
      "transition",
      `transform ${durationMs}ms ease`,
      "important"
    );
    this.element.style.willChange = "transform";

    this.element.style.display = "block";

    // Forçar reflow
    this.element.offsetHeight;

    // Ativar animação no próximo frame para garantir transição
    requestAnimationFrame(() => {
      // aplicar transform alvo via inline — isso anima porque transition está definido inline
      if (targetTransform) this.element.style.transform = targetTransform;
      // marcar como aberto para estados dependentes de classe
      this.element.classList.add("wfpanel-open");
    });

    // Mostrar overlay
    if (this.overlayElement) {
      this.overlayElement.style.display = "block";
      setTimeout(() => {
        this.overlayElement.classList.add("wfpanel-open");
      }, 10);
    }

    // Prevenir scroll do body
    document.body.style.overflow = "hidden";

    // Atualizar título do header (pode ter sido definido pelo botão que chamou)
    const headerTitle = this.element.querySelector(".wfpanel-title");
    if (headerTitle) {
      const t = this.element.getAttribute("WfPanel-title") || "Painel";
      headerTitle.textContent = t;
    }

    // Focus no primeiro elemento focável
    const focusableElement = this.element.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElement) {
      focusableElement.focus();
    }

    // Disparar evento
    this.element.dispatchEvent(
      new CustomEvent("wfpanel:opened", {
        detail: { panel: this.element, side: this.side },
      })
    );
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Remover classe de animação (marca estado fechado)
    this.element.classList.remove("wfpanel-open");

    // Forçar transform de saída correspondente ao side para disparar a transição
    try {
      const side = this.side;
      let exitTransform = "";
      if (side === "left") exitTransform = "translateX(-100%)";
      else if (side === "right") exitTransform = "translateX(100%)";
      else if (side === "top") exitTransform = "translateY(-100%)";
      else if (side === "bottom") exitTransform = "translateY(100%)";
      if (exitTransform) {
        // aplicar transform alvo de saída para animar
        // garantir que a propriedade transition ainda esteja presente
        this.element.style.transform = exitTransform;
        this.element.style.willChange = "transform";
      }
    } catch (err) {
      // silencioso
    }

    // Ocultar overlay (fade out)
    if (this.overlayElement) {
      this.overlayElement.classList.remove("wfpanel-open");
      setTimeout(() => {
        this.overlayElement.style.display = "none";
      }, 300);
    }

    // Restaurar scroll do body
    document.body.style.overflow = "";

    // Ocultar painel após animação
    // Usar event listener de transitionend se disponível, fallback para timeout
    const cleanup = () => {
      this.element.style.display = "none";

      // Restaurar elemento ao pai original se necessário
      try {
        if (this._originalParent) {
          if (
            this._originalNextSibling &&
            this._originalNextSibling.parentNode === this._originalParent
          ) {
            this._originalParent.insertBefore(
              this.element,
              this._originalNextSibling
            );
          } else {
            this._originalParent.appendChild(this.element);
          }
          // limpar referências
          this._originalParent = null;
          this._originalNextSibling = null;
        }
        // remover z-index e transform inline
        this.element.style.zIndex = "";
        this.element.style.transform = "";
      } catch (err) {
        // silencioso
      }
    };

    const onTransitionEnd = (e) => {
      if (e.target === this.element) {
        this.element.removeEventListener("transitionend", onTransitionEnd);
        cleanup();
      }
    };

    this.element.addEventListener("transitionend", onTransitionEnd);

    // Fallback: garantir cleanup após duração da transição + margem
    setTimeout(() => {
      try {
        this.element.removeEventListener("transitionend", onTransitionEnd);
      } catch (e) {}
      cleanup();
    }, (this.durationMs || 300) + 100);

    // Restaurar focus sem rolar a página
    if (
      this._lastActiveElement &&
      typeof this._lastActiveElement.focus === "function"
    ) {
      try {
        this._lastActiveElement.focus({ preventScroll: true });
      } catch (e) {
        // Fallback para navegadores que não suportam preventScroll
        try {
          this._lastActiveElement.focus();
        } catch (err) {}
      }
    }

    // Disparar evento
    this.element.dispatchEvent(
      new CustomEvent("wfpanel:closed", {
        detail: { panel: this.element, side: this.side },
      })
    );
  }

  // Processa o tamanho do painel (aceita px e %)
  processSize(size) {
    if (typeof size !== "string") return size;

    // Se já é um valor com unidade CSS válida, retorna
    if (size.includes("px") || size.includes("%") || size.includes("vw") || size.includes("vh") || size.includes("em") || size.includes("rem")) {
      return size;
    }

    // Se é apenas número, assume px
    if (!isNaN(size)) {
      return size + "px";
    }

    return size;
  }

  // Métodos públicos
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.isOpen;
  }

  // Métodos estáticos
  static initAll(container = document) {
    const elements = container.querySelectorAll("[WfPanel]");
    const instances = [];

    elements.forEach((element) => {
      if (!element._wfPanel) {
        try {
          const instance = new WfPanel(element);
          element._wfPanel = instance;
          instances.push(instance);
        } catch (error) {
          // Erro ao inicializar um painel; silenciar para evitar logs desnecessários
        }
      }
    });

    // Vincular elementos que disparam painéis via atributo WfPanel-target
    try {
      const triggers = container.querySelectorAll("[WfPanel-target]");
      triggers.forEach((trigger) => {
        if (trigger._wfPanelTrigger) return;
        trigger._wfPanelTrigger = true;
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = trigger.getAttribute("WfPanel-target");
          if (!targetId) return;
          const panelEl = document.getElementById(targetId);
          if (!panelEl) return;

          // Determinar título a partir do botão/link chamador (prioridade: atributo WfPanel-title do trigger, atributo title, texto do botão)
          try {
            const tTitle =
              trigger.getAttribute("WfPanel-title") ||
              trigger.getAttribute("title") ||
              trigger.textContent.trim();
            if (tTitle) {
              panelEl.setAttribute("WfPanel-title", tTitle);
            }
          } catch (err) {
            // silencioso
          }

          // Inicializar painel se necessário
          if (!panelEl._wfPanel) {
            try {
              const inst = new WfPanel(panelEl);
              panelEl._wfPanel = inst;
              inst.open();
            } catch (err) {
              // falha silenciosa
            }
          } else {
            try {
              panelEl._wfPanel.open();
            } catch (err) {
              // falha silenciosa
            }
          }
        });
      });
    } catch (err) {
      // silencioso
    }

    return instances;
  }

  // Métodos de conveniência
  static open(selector) {
    const element = document.querySelector(selector);
    if (element && element._wfPanel) {
      element._wfPanel.open();
    }
  }

  static close(selector) {
    const element = document.querySelector(selector);
    if (element && element._wfPanel) {
      element._wfPanel.close();
    }
  }

  static toggle(selector) {
    const element = document.querySelector(selector);
    if (element && element._wfPanel) {
      element._wfPanel.toggle();
    }
  }
}

// Exportação global
if (typeof window !== 'undefined') {
    window.WfPanel = WfPanel;
    if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfPanel = WfPanel;
    }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WfPanel.initAll());
    } else {
        WfPanel.initAll();
    }
}

})(window, document);
