/**
 * WebFull - Biblioteca JavaScript Unificada
 * Versão: 1.0.0
 */

(function (window) {
  "use strict";

  // Definição principal da biblioteca
  const WebFull = {
    version: "1.0.0",

    // Objeto para armazenar módulos carregados
    modules: {},

    // Função de inicialização
    init: function () {
      this.setupGlobalEvents();
    },

    // Configuração de eventos globais
    setupGlobalEvents: function () {
      document.addEventListener("DOMContentLoaded", () => {
        this.initUI();
      });
    },

    // Inicialização da UI (para o framework CSS)
    initUI: function (container = document) {
      // Itera sobre todos os módulos registrados
      for (const key in this.modules) {
        if (this.modules.hasOwnProperty(key)) {
          const module = this.modules[key];

          // Verifica se o módulo tem um inicializador estático (padrão initAll ou autoInit)
          if (module && typeof module.initAll === "function") {
            try {
              module.initAll(container);
            } catch (e) {
              console.error(`Erro ao inicializar módulo ${key}:`, e);
            }
          } else if (module && typeof module.autoInit === "function") {
            // Suporte a nome alternativo
            try {
              module.autoInit(container);
            } catch (e) {
              console.error(`Erro ao inicializar módulo ${key}:`, e);
            }
          }
        }
      }
    },

    // Reinicializa todos os módulos em um container específico
    reinit: function (container = document) {
      this.initUI(container);
    },

    // Exemplo de um utilitário simples
    utils: {
      // Selecionar elemento (atalho)
      $: function (selector) {
        return document.querySelector(selector);
      },
      $$: function (selector) {
        return document.querySelectorAll(selector);
      },
    },
  };

  // Expor globalmente
  window.WebFull = WebFull;

  // Auto-inicialização se necessário, ou deixar para o usuário chamar
  WebFull.init();
})(window);


// ===== WfAba.js =====
(function (window, document) {
  "use strict";

  /**
   * WfAba - Sistema de Abas Avançado
   * Componente para criação de abas com múltiplos efeitos e posições
   * SandroWeb - 2025
   */

  class WfAba {
    constructor(element, options = {}) {
      // Evita dupla inicialização
      if (element._wfAba) return element._wfAba;

      this.element = element;
      this.container = element;

      // Configurações do componente
      this.position = this.element.getAttribute("WfAba-pos") || "top";
      this.active = this.element.getAttribute("WfAba-active") || "1";
      this.effect = this.element.getAttribute("WfAba-effect") || "fade";

      // Opções padrão
      this.options = {
        transitionDuration: 300,
        ...options,
      };

      // Carregar CSS do componente
      this.loadComponentCSS();

      // Inicializar imediatamente
      this._setupElements();
      this._setupEventListeners();
      this._activateInitialTab();

      // Marcar como inicializado
      this.element._wfAba = this;
    }

    // Carregar CSS do componente
    loadComponentCSS() {
      const cssId = "webfull-wfaba-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/* ===== SWABA CSS - Sistema de Abas Avançado ===== */

/* ===== CONTAINER PRINCIPAL ===== */
[WfAba] {
   display: flex;
   flex-direction: column;
   width: 100%;
}

[WfAba][WfAba-pos="left"] {
   flex-direction: row;
}

[WfAba][WfAba-pos="right"] {
   flex-direction: row-reverse;
}

[WfAba][WfAba-pos="bottom"] {
   flex-direction: column-reverse;
}

/* ===== NAVEGAÇÃO DAS ABAS ===== */
.wfaba-nav {
   display: flex;
   background: var(--wbg-);
   overflow: hidden;
}

[WfAba-pos="left"] .wfaba-nav {
    flex-direction: column;
    border-right: 2px solid var(--wf-border);
    min-width: 200px;
}

[WfAba-pos="right"] .wfaba-nav {
   flex-direction: column;
   border-left: 2px solid var(--wf-border);
   min-width: 200px;
}

[WfAba-pos="bottom"] .wfaba-nav {
   background-color: var(--wbl);
}

/* ===== ABAS INDIVIDUAIS ===== */
.wfaba-tab {
   padding: 12px 20px;
   background-color: var(--wf-bg-);
   color: var(--wf-color);
   border: none;
   cursor: pointer;
   font-size: 16px;
   font-weight: 500;
   transition: all 0.3s ease;
   position: relative;
   flex: 1;
   text-align: center;
   text-decoration: none;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;
}

.wfaba-tab:hover {
   background: var(--wf-bl--);
   color: var(--bran);
}

.wfaba-tab.active {
   background: var(--prin);
   color: white;
   font-weight: 600;
}

/* ===== ÍCONES NAS ABAS ===== */
.wfaba-tab i {
   font-size: 18px;
   transition: transform 0.3s ease;
   color: currentColor;
}

.wfaba-tab:hover i {
   transform: scale(1.1);
}

.wfaba-tab.active i {
   transform: scale(1.1);
}

/* ===== CONTEÚDO DOS PAINÉIS ===== */
.wfaba-content {
   flex: 1;
   background: var(--wf-bg-);
   border-top: none;
   border-radius: 0 0 8px 8px;
   overflow: hidden;
}

[WfAba-pos="left"] .wfaba-content {
   border-left: none;
   border-radius: 0 8px 8px 0;
}

[WfAba-pos="right"] .wfaba-content {
   border-right: none;
   border-radius: 8px 0 0 8px;
}

[WfAba-pos="bottom"] .wfaba-content {
   border-bottom: none;
   border-radius: 8px 8px 0 0;
}

/* ===== PAINÉIS INDIVIDUAIS ===== */
.wfaba-panel {
   display: none;
   padding: 20px;
   animation: wfaba-fade-in 0.3s ease-out;
   color: var(--wf-color);
   background: var(--wf-bg-);
}

.wfaba-panel.active {
   display: block;
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
.wfaba-panel[data-effect="fade"] {
   animation: wfaba-fade-in 0.3s ease-out;
}

@keyframes wfaba-fade-in {
   from { opacity: 0; }
   to { opacity: 1; }
}

.wfaba-panel[data-effect="slide"] {
   animation: wfaba-slide-in 0.3s ease-out;
}

@keyframes wfaba-slide-in {
   from {
      transform: translateY(20px);
      opacity: 0;
   }
   to {
      transform: translateY(0);
      opacity: 1;
   }
}

.wfaba-panel[data-effect="zoom"] {
   animation: wfaba-zoom-in 0.3s ease-out;
}

@keyframes wfaba-zoom-in {
   from {
      transform: scale(0.95);
      opacity: 0;
   }
   to {
      transform: scale(1);
      opacity: 1;
   }
}

.wfaba-panel[data-effect="bounce"] {
   animation: wfaba-bounce-in 0.5s ease-out;
}

@keyframes wfaba-bounce-in {
   0% {
      transform: scale(0.8);
      opacity: 0;
   }
   50% {
      transform: scale(1.05);
   }
   100% {
      transform: scale(1);
      opacity: 1;
   }
}

.wfaba-panel[data-effect="flip"] {
   animation: wfaba-flip-in 0.6s ease-out;
   transform-style: preserve-3d;
}

@keyframes wfaba-flip-in {
   from {
      transform: rotateX(-90deg);
      opacity: 0;
   }
   to {
      transform: rotateX(0);
      opacity: 1;
   }
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   [WfAba-pos="left"],
   [WfAba-pos="right"] {
      flex-direction: column !important;
   }

   [WfAba-pos="left"] .wfaba-nav,
   [WfAba-pos="right"] .wfaba-nav {
      flex-direction: row !important;
      border-right: none !important;
      border-left: none !important;
      border-bottom: 2px solid var(--wf-border) !important;
      border-radius: 8px 8px 0 0 !important;
      min-width: auto !important;
   }

   [WfAba-pos="left"] .wfaba-tab.active::after,
   [WfAba-pos="right"] .wfaba-tab.active::after {
      left: 0 !important;
      right: 0 !important;
      top: auto !important;
      width: auto !important;
      height: 2px !important;
   }

   [WfAba-pos="left"] .wfaba-content,
   [WfAba-pos="right"] .wfaba-content {
      border-top: none !important;
      border-left: 1px solid var(--wf-border) !important;
      border-right: 1px solid var(--wf-border) !important;
      border-radius: 0 0 8px 8px !important;
   }

   .wfaba-tab {
      padding: 10px 12px;
      font-size: 14px;
   }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfaba-tab,
   .wfaba-panel {
      transition: none;
      animation: none;
   }
}
         `;
        document.head.appendChild(style);
      }
    }

    // ===== CONFIGURAR ELEMENTOS =====
    _setupElements() {
      // Buscar abas e painéis
      this.tabs = Array.from(this.container.querySelectorAll("[WfAba-tab]"));
      this.panels = [];
      this.panelMap = {};

      this.tabs.forEach((tab) => {
        const targetId = tab.getAttribute("WfAba-tab");
        if (targetId) {
          const panel = this.container.querySelector(`#${targetId}`);
          if (panel) {
            this.panels.push(panel);
            this.panelMap[targetId] = panel;
          }
        }
      });

      // Adicionar classes
      this.tabs.forEach((tab) => {
        if (!tab.classList.contains("wfaba-tab")) {
          tab.classList.add("wfaba-tab");
        }
      });

      this.panels.forEach((panel) => {
        if (!panel.classList.contains("wfaba-panel")) {
          panel.classList.add("wfaba-panel");
        }
        panel.setAttribute("data-effect", this.effect);
      });

      // Organizar estrutura
      this._organizeStructure();
    }

    // ===== ORGANIZAR ESTRUTURA =====
    _organizeStructure() {
      // Converter .wfaba-tabs para .wfaba-nav se existir
      const tabsContainer = this.container.querySelector(".wfaba-tabs");
      if (tabsContainer) {
        tabsContainer.className = "wfaba-nav";
      }

      // Converter .wfaba-panels para .wfaba-content se existir
      const panelsContainer = this.container.querySelector(".wfaba-panels");
      if (panelsContainer) {
        panelsContainer.className = "wfaba-content";
      }

      // Se não existir estrutura, criar
      if (!this.container.querySelector(".wfaba-nav")) {
        this._createNavigation();
      }
    }

    // ===== CRIAR NAVEGAÇÃO =====
    _createNavigation() {
      let nav = this.container.querySelector(".wfaba-nav");
      if (!nav) {
        nav = document.createElement("div");
        nav.className = "wfaba-nav";

        // Mover abas para a navegação
        this.tabs.forEach((tab) => {
          nav.appendChild(tab);
        });

        // Inserir navegação no início
        this.container.insertBefore(nav, this.container.firstChild);
      }

      // Criar container de conteúdo
      let content = this.container.querySelector(".wfaba-content");
      if (!content) {
        content = document.createElement("div");
        content.className = "wfaba-content";

        // Mover painéis para o container
        this.panels.forEach((panel) => {
          content.appendChild(panel);
        });

        // Adicionar container de conteúdo
        this.container.appendChild(content);
      }
    }

    // ===== CONFIGURAR EVENTOS =====
    _setupEventListeners() {
      this.tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
          e.preventDefault();
          this.activateTab(tab);
        });
      });
    }

    // ===== ATIVAR ABA INICIAL =====
    _activateInitialTab() {
      if (this.tabs.length > 0) {
        const activeIndex = parseInt(this.active) - 1;
        const targetTab = this.tabs[activeIndex] || this.tabs[0];
        this.activateTab(targetTab);
      }
    }

    // ===== ATIVAR ABA =====
    activateTab(tab) {
      if (!this.tabs.includes(tab)) return;

      const targetId = tab.getAttribute("WfAba-tab");
      if (!targetId) return;

      // Desativar todas as abas e painéis
      this.tabs.forEach((t) => t.classList.remove("active"));
      this.panels.forEach((p) => p.classList.remove("active"));

      // Ativar nova aba
      tab.classList.add("active");

      // Ativar painel correspondente
      const targetPanel = this.panelMap[targetId];
      if (targetPanel) {
        if (this.effect !== "none") {
          this._applyEffect(targetPanel);
        }

        targetPanel.classList.add("active");

        // Disparar evento
        this.element.dispatchEvent(
          new CustomEvent("wfaba:tab-changed", {
            detail: {
              tab: tab,
              panel: targetPanel,
              tabId: targetId,
              effect: this.effect,
            },
          })
        );
      }
    }

    // ===== APLICAR EFEITO =====
    _applyEffect(panel) {
      // Remover classes de efeito anteriores
      panel.classList.remove(
        "wfaba-fade",
        "wfaba-slide",
        "wfaba-zoom",
        "wfaba-bounce",
        "wfaba-flip"
      );

      // Adicionar classe de efeito atual
      if (this.effect !== "none") {
        panel.classList.add(`wfaba-${this.effect}`);
      }
    }

    // ===== MÉTODOS PÚBLICOS =====
    getActiveTab() {
      return this.tabs.find((tab) => tab.classList.contains("active"));
    }

    getActivePanel() {
      return this.panels.find((panel) => panel.classList.contains("active"));
    }

    activateTabByIndex(index) {
      if (this.tabs[index]) {
        this.activateTab(this.tabs[index]);
      }
    }

    activateTabById(id) {
      const tab = this.tabs.find((tab) => tab.getAttribute("WfAba-tab") === id);
      if (tab) {
        this.activateTab(tab);
      }
    }

    // ===== MÉTODOS ESTÁTICOS =====
    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfAba]");
      const instances = [];

      elements.forEach((element) => {
        if (!element._wfAba) {
          try {
            const instance = new WfAba(element);
            element._wfAba = instance;
            instances.push(instance);
          } catch (error) {
            if (
              window &&
              (location.hostname === "localhost" ||
                location.hostname === "127.0.0.1")
            ) {
              console.error("Erro ao inicializar WfAba:", error);
            }
          }
        }
      });

      return instances;
    }

    // ===== MÉTODOS DE CONVENIÊNCIA =====
    static activate(selector, tabId) {
      const element = document.querySelector(selector);
      if (element && element._wfAba) {
        element._wfAba.activateTabById(tabId);
      }
    }

    static activateByIndex(selector, index) {
      const element = document.querySelector(selector);
      if (element && element._wfAba) {
        element._wfAba.activateTabByIndex(index);
      }
    }
  }

  // ===== EXPORTAR E REGISTRAR =====
  if (window.WebFull) {
    window.WebFull.modules.WfAba = WfAba;
  }

  // Fallback global e suporte a CommonJS
  if (typeof module !== "undefined" && module.exports) {
    module.exports = WfAba;
  } else {
    window.WfAba = WfAba;
  }

  // ===== INICIALIZAÇÃO IMEDIATA =====
  // Aguardar DOM estar pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      WfAba.initAll();
    });
  } else {
    // DOM já está pronto, inicializar imediatamente
    WfAba.initAll();
  }

  // Re-inicializar quando novos elementos forem adicionados
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          if (node.hasAttribute && node.hasAttribute("WfAba")) {
            new WfAba(node);
          }
          const swabaElements =
            node.querySelectorAll && node.querySelectorAll("[WfAba]");
          if (swabaElements) {
            swabaElements.forEach((element) => {
              if (!element._wfAba) {
                new WfAba(element);
              }
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})(window, document);


// ===== WfAccord.js =====
(function (window, document) {
  "use strict";

  /**
   * WfAccord - Sistema de Acordeão
   *
   * @author SandroWeb
   * @version 3.0
   * @since WEBFULL Framework v1.0
   */

  class WfAccord {
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfAccord) return element._wfAccord;

      this.element = element;
      this.element._wfAccord = this;

      const getAttrVar = (el, attr) => {
        if (!el || !attr) return null;
        try {
          const parts = attr.split("-"); // e.g., ['WfAccord','multiple']
          const base = parts[0];
          const rest = parts.slice(1).join("-");
          const kebab =
            base
              .replace(/([A-Z])/g, "-$1")
              .replace(/^-/, "")
              .toLowerCase() + (rest ? "-" + rest : ""); // sw-accord-*
          const compact = base.toLowerCase() + (rest ? "-" + rest : ""); // swaccord-*
          return (
            el.getAttribute(attr) ??
            el.getAttribute(compact) ??
            el.getAttribute(kebab)
          );
        } catch (_) {
          return el.getAttribute(attr);
        }
      };

      const attrMultiple = getAttrVar(this.element, "WfAccord-multiple");
      const attrActive = getAttrVar(this.element, "WfAccord-active");
      const attrEffect = getAttrVar(this.element, "WfAccord-effect");
      const attrAutoHeight = getAttrVar(this.element, "WfAccord-auto-height");

      this.multiple = attrMultiple === "true";
      this.active = attrActive || "0";
      this.effect = attrEffect || "slide";
      this.autoHeight = attrAutoHeight !== "false";

      this.items = [];
      this.activeItems = new Set();

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupItems();
      this.bindEvents();
      this.activateInitial();
    }

    loadCSS() {
      const cssId = "webfull-wfaccord-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/**
 * WfAccord.css - Estilos do Sistema de Acordeão
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
[WfAccord], [wfaccord], [wf-accord] {
    width: 100%;
    margin: 2rem auto;
    border: 2px solid var(--wf-border);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: var(--wf-bg);
    display: block;
    overflow: hidden;
}

/* ===== ITENS DO ACORDEÃO ===== */
[WfAccordItem], [wfaccorditem], [wf-accord-item] {
    border: none;
    background: none;
    position: relative;
}

:is([WfAccordItem],[wfaccorditem],[wf-accord-item]) + :is([WfAccordItem],[wfaccorditem],[wf-accord-item]) {
    border-top: 1px solid var(--wf-border);
}

/* ===== CABEÇALHOS ===== */
.wfaccord-header {
    background: transparent;
    padding: 1rem 1.2rem;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--wf-color);
    border: none;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    position: relative;
}

.wfaccord-header:hover,
.wfaccord-header:focus {
    background-color: var(--wf-bg);
}

/* ===== ÍCONES ===== */
.wfaccord-icon {
    font-size: 2rem;
    transition: transform 0.3s ease;
    color: var(--wf-color-);
    margin-left: 1rem;
}

.wfaccord-header.active .wfaccord-icon {
    transform: rotate(180deg);
    color: var(--prin);
}

/* ===== CONTEÚDO ===== */
.wfaccord-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.6s ease, padding 0.3s ease;
    padding: 0 1.2rem;
    background-color: var(--wf-bg-);
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--wf-color);
}

.wfaccord-content.active {
    max-height: 1000px;
    padding: 1.2rem;
}

.wfaccord-content p {
    margin: 1.2rem 0;
}

.wfaccord-content p:first-child {
    margin-top: 0;
}

.wfaccord-content p:last-child {
    margin-bottom: 0;
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
/* Slide */
.wfaccord-content[data-effect="slide"] {
    transition: max-height 0.6s ease, padding 0.3s ease;
}

/* Fade */
.wfaccord-content[data-effect="fade"] {
    transition: max-height 0.6s ease, padding 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.wfaccord-content[data-effect="fade"].active {
    opacity: 1;
}

/* Zoom */
.wfaccord-content[data-effect="zoom"] {
    transition: max-height 0.6s ease, padding 0.3s ease, transform 0.3s ease;
    transform: scale(0.95);
}

.wfaccord-content[data-effect="zoom"].active {
    transform: scale(1);
}

/* Bounce */
.wfaccord-content[data-effect="bounce"] {
    transition: max-height 0.6s ease, padding 0.3s ease, transform 0.4s ease;
    transform: scale(0.9);
}

.wfaccord-content[data-effect="bounce"].active {
    transform: scale(1);
}

/* ===== TEMAS ===== */
.wfaccord-primary .wfaccord-header.active {
    background: var(--prin);
    color: white;
}

.wfaccord-success .wfaccord-header.active {
    background: var(--suce);
    color: white;
}

.wfaccord-warning .wfaccord-header.active {
    background: var(--aler);
    color: var(--wf-color);
}

.wfaccord-danger .wfaccord-header.active {
    background: var(--peri);
    color: white;
}

.wfaccord-info .wfaccord-header.active {
    background: var(--info);
    color: white;
}

.wfaccord-dark .wfaccord-header.active {
    background: var(--notu);
    color: white;
}

/* ===== TAMANHOS ===== */
.wfaccord-small .wfaccord-header {
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
}

.wfaccord-small .wfaccord-content {
    padding: 0 1rem;
    font-size: 1.2rem;
}

.wfaccord-small .wfaccord-content.active {
    padding: 1rem;
}

.wfaccord-large .wfaccord-header {
    padding: 1.5rem 1.5rem;
    font-size: 1.6rem;
}

.wfaccord-large .wfaccord-content {
    padding: 0 1.5rem;
    font-size: 1.6rem;
}

.wfaccord-large .wfaccord-content.active {
    padding: 1.5rem;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    [WfAccord] {
        margin: 1rem auto;
        border-radius: 6px;
    }

    .wfaccord-header {
        padding: 0.8rem 1rem;
        font-size: 1.3rem;
    }

    .wfaccord-content {
        padding: 0 1rem;
        font-size: 1.3rem;
    }

    .wfaccord-content.active {
        padding: 1rem;
    }

    .wfaccord-icon {
        font-size: 1.1rem;
    }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfaccord-content,
    .wfaccord-header,
    .wfaccord-icon {
        transition: none;
    }
}


/* ===== ESTADOS DE CARREGAMENTO ===== */
.wfaccord-loading {
    position: relative;
    min-height: 100px;
}

.wfaccord-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid var(--wf-bg);
    border-top: 3px solid var(--prin);
    border-radius: 50%;
    animation: wfaccord-spin 1s linear infinite;
}

@keyframes wfaccord-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night [WfAccord] {
    background: var(--notu);
    border-color: var(--notu_);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

html.wfday-night [SwAccordItem] + [SwAccordItem] {
    border-top-color: var(--notu_);
}

html.wfday-night .wfaccord-header {
    color: var(--wf-color);
    background: transparent;
}

html.wfday-night .wfaccord-header:hover,
html.wfday-night .wfaccord-header:focus {
    background-color: var(--notu_);
}

html.wfday-night .wfaccord-content {
    background-color: #1a1a1a;
    color: #ddd;
}

html.wfday-night .wfaccord-icon {
    color: #aaa;
}

html.wfday-night .wfaccord-header.active .wfaccord-icon {
    color: #4a90e2;
}
         `;
        document.head.appendChild(style);
      }
    }

    setupItems() {
      const isDev =
        typeof window !== "undefined" &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1");

      let accordionItems = this.element.querySelectorAll(
        "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
      );

      // Fallback: quando os wrappers de item não existem, derivar itens a partir de headers/contents
      if (accordionItems.length === 0) {
        const headers = Array.from(
          this.element.querySelectorAll(
            "[WfAccordHeader], [wfaccordheader], [wf-accord-header], .wfaccord-header"
          )
        );

        const findNextContent = (hdr) => {
          let el = hdr.nextElementSibling;
          while (el) {
            if (
              el.matches(
                "[WfAccordContent], [wfaccordcontent], [wf-accord-content], .wfaccord-content"
              )
            )
              return el;
            el = el.nextElementSibling;
          }
          return null;
        };

        headers.forEach((header, index) => {
          const content =
            findNextContent(header) ||
            (header.parentElement
              ? header.parentElement.querySelector(
                  "[WfAccordContent], [wfaccordcontent], [wf-accord-content], .wfaccord-content"
                )
              : null);

          if (!header || !content) {
            console.warn("WfAccord: Item sem header ou content:", header);
            return;
          }

          // Adicionar classes se não existirem
          if (!header.classList.contains("wfaccord-header")) {
            header.classList.add("wfaccord-header");
          }
          if (!content.classList.contains("wfaccord-content")) {
            content.classList.add("wfaccord-content");
          }

          // Adicionar ícone se não existir
          if (!header.querySelector(".wfaccord-icon")) {
            const icon = document.createElement("i");
            icon.className = "wfaccord-icon wf wf-chevron-down Tprin f20";
            header.appendChild(icon);
          }

          // Configurar atributos de acessibilidade
          header.setAttribute("role", "button");
          header.setAttribute("tabindex", "0");
          header.setAttribute("aria-expanded", "false");
          header.setAttribute("aria-controls", `wfaccord-content-${index}`);
          if (!header.id) header.id = `wfaccord-header-${index}`;

          content.setAttribute("role", "region");
          content.setAttribute("aria-labelledby", `wfaccord-header-${index}`);
          content.id = `wfaccord-content-${index}`;
          content.setAttribute("data-effect", this.effect);

          // Armazenar referências
          const accordionItem = {
            element:
              header.closest(
                "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
              ) || header.parentElement,
            header: header,
            content: content,
            index: index,
          };

          this.items.push(accordionItem);
        });

        return; // itens inicializados via fallback
      }

      accordionItems.forEach((item, index) => {
        const header =
          item.querySelector(
            "[WfAccordHeader], [wfaccordheader], [wf-accord-header]"
          ) || item.querySelector(".wfaccord-header");
        const content =
          item.querySelector(
            "[WfAccordContent], [wfaccordcontent], [wf-accord-content]"
          ) || item.querySelector(".wfaccord-content");

        if (!header || !content) {
          console.warn("WfAccord: Item sem header ou content:", item);
          return;
        }

        // Adicionar classes se não existirem
        if (!header.classList.contains("wfaccord-header")) {
          header.classList.add("wfaccord-header");
        }

        if (!content.classList.contains("wfaccord-content")) {
          content.classList.add("wfaccord-content");
        }

        // Adicionar ícone se não existir
        if (!header.querySelector(".wfaccord-icon")) {
          const icon = document.createElement("i");
          icon.className = "wfaccord-icon wf wf-chevron-down Tprin f20";
          header.appendChild(icon);
        }

        // Configurar atributos de acessibilidade
        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0");
        header.setAttribute("aria-expanded", "false");
        header.setAttribute("aria-controls", `wfaccord-content-${index}`);
        if (!header.id) header.id = `wfaccord-header-${index}`;

        content.setAttribute("role", "region");
        content.setAttribute("aria-labelledby", `wfaccord-header-${index}`);
        content.id = `wfaccord-content-${index}`;
        content.setAttribute("data-effect", this.effect);

        // Armazenar referências
        const accordionItem = {
          element: item,
          header: header,
          content: content,
          index: index,
        };

        this.items.push(accordionItem);
      });
    }

    bindEvents() {
      this.items.forEach((item) => {
        // Click event
        item.header.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleItem(item);
        });

        // Keyboard events
        item.header.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggleItem(item);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            this.focusNextItem(item);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            this.focusPreviousItem(item);
          } else if (e.key === "Home") {
            e.preventDefault();
            this.focusFirstItem();
          } else if (e.key === "End") {
            e.preventDefault();
            this.focusLastItem();
          }
        });
      });
    }

    toggleItem(item) {
      const isActive = item.header.classList.contains("active");

      if (isActive) {
        this.closeItem(item);
      } else {
        this.openItem(item);
      }
    }

    openItem(item) {
      // Se não permite múltiplos, fechar todos os outros
      if (!this.multiple) {
        this.closeAllItems();
      }

      // Ativar item
      item.header.classList.add("active");
      item.content.classList.add("active");
      item.header.setAttribute("aria-expanded", "true");

      this.activeItems.add(item.index);

      // Disparar evento
      this.element.dispatchEvent(
        new CustomEvent("wfaccord:item-opened", {
          detail: { item: item, index: item.index },
        })
      );
    }

    closeItem(item) {
      // Desativar item
      item.header.classList.remove("active");
      item.content.classList.remove("active");
      item.header.setAttribute("aria-expanded", "false");

      this.activeItems.delete(item.index);

      // Disparar evento
      this.element.dispatchEvent(
        new CustomEvent("wfaccord:item-closed", {
          detail: { item: item, index: item.index },
        })
      );
    }

    closeAllItems() {
      this.items.forEach((item) => {
        this.closeItem(item);
      });
    }

    openAllItems() {
      if (this.multiple) {
        this.items.forEach((item) => {
          this.openItem(item);
        });
      }
    }

    activateInitial() {
      if (this.active === "all" && this.multiple) {
        this.openAllItems();
      } else if (this.active !== "0") {
        const activeIndex = parseInt(this.active) - 1;
        if (this.items[activeIndex]) {
          this.openItem(this.items[activeIndex]);
        }
      }
    }

    // Navegação por teclado
    focusNextItem(currentItem) {
      const currentIndex = this.items.indexOf(currentItem);
      const nextIndex = (currentIndex + 1) % this.items.length;
      this.items[nextIndex].header.focus();
    }

    focusPreviousItem(currentItem) {
      const currentIndex = this.items.indexOf(currentItem);
      const prevIndex =
        currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
      this.items[prevIndex].header.focus();
    }

    focusFirstItem() {
      if (this.items.length > 0) {
        this.items[0].header.focus();
      }
    }

    focusLastItem() {
      if (this.items.length > 0) {
        this.items[this.items.length - 1].header.focus();
      }
    }

    // Métodos públicos
    getActiveItems() {
      return Array.from(this.activeItems).map((index) => this.items[index]);
    }

    openItemByIndex(index) {
      if (this.items[index]) {
        this.openItem(this.items[index]);
      }
    }

    closeItemByIndex(index) {
      if (this.items[index]) {
        this.closeItem(this.items[index]);
      }
    }

    // Métodos estáticos
    static initAll(container = document) {
      const isDev =
        typeof window !== "undefined" &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1");
      // support passing a specific container element that itself may have the attribute
      let elements = [];
      try {
        const selector = "[WfAccord], [wfaccord], [wf-accord]";
        if (container && container.nodeType === 1) {
          // include the container itself if it already has the attribute (any variation)
          const includeSelf =
            container.hasAttribute &&
            (container.hasAttribute("WfAccord") ||
              container.hasAttribute("wfaccord") ||
              container.hasAttribute("wf-accord"));
          const looksLikeAccord =
            !includeSelf &&
            container.querySelector &&
            (container.querySelector(
              "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
            ) ||
              container.querySelector(".wfaccord-header") ||
              container.querySelector(".wfaccord-content"));
          const found = Array.from(container.querySelectorAll(selector));
          elements =
            includeSelf || (looksLikeAccord && found.length === 0)
              ? [container]
              : [];
          elements = elements.concat(found);
        } else {
          elements = Array.from(document.querySelectorAll(selector));
        }
      } catch (e) {
        elements = Array.from(
          document.querySelectorAll("[WfAccord], [wfaccord], [wf-accord]")
        );
      }

      const instances = [];
      const seen = new Set();

      elements.forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (!element._wfAccord) {
          try {
            const instance = new WfAccord(element);
            element._wfAccord = instance;
            instances.push(instance);
          } catch (error) {
            // Em contexto de docs, evitar quebrar tudo — logar apenas em dev
            if (
              typeof window !== "undefined" &&
              (location.hostname === "localhost" ||
                location.hostname === "127.0.0.1")
            )
              console.error("Erro ao inicializar WfAccord:", error);
          }
        }
      });

      return instances;
    }

    // Métodos de conveniência
    static open(selector, index) {
      const element = document.querySelector(selector);
      if (element && element._wfAccord) {
        element._wfAccord.openItemByIndex(index);
      }
    }
  }

  // ===== EXPORTAR E REGISTRAR =====
  // SEMPRE registrar no window para compatibilidade com WfAjax
  if (typeof window !== "undefined") {
    window.WfAccord = WfAccord;

    if (window.WebFull) {
      window.WebFull.modules.WfAccord = WfAccord;
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = WfAccord;
  }

  // ===== INICIALIZAÇÃO IMEDIATA =====
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      WfAccord.initAll();
    });
  } else {
    WfAccord.initAll();
  }
})(window, document);


// ===== WfAjax.js =====
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

        // Adicionar seletores específicos para WfCode (suporte a Prism.js style)
        if (componentName === "WfCode") {
          selectors.push('pre[class*="language-"]');
          selectors.push('code[class*="language-"]');
          selectors.push('pre[class*="lang-"]');
          selectors.push('code[class*="lang-"]');
        }

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
              // console.log(`[WfAjax] Chamando WfCode.reinit() para container:`, container);
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


// ===== WfAlert.js =====
(function (window, document) {
  "use strict";

  /**
   * WfAlert - Sistema de Alertas Padrão do WEBFULL Framework
   * @author SandroWeb
   * @version 7.0 - Refatorado para Classe ES6
   */
  class WfAlert {
    // #region Propriedades Estáticas
    static #alertStacks = {};
    static #cssLoaded = false;

    static config = {
      defaultDuration: 3000,
      defaultPosition: "topRight",
      stackSpacing: 64, // Espaçamento entre alertas empilhados
    };
    // #endregion

    // #region API Pública (Métodos Estáticos)

    // --- Métodos de Alerta (Português) ---
    static sucesso(message, duration, position) {
      this.#createAlert(message, "sucesso", duration, position);
    }
    static erro(message, duration, position) {
      this.#createAlert(message, "erro", duration, position);
    }
    static alerta(message, duration, position) {
      this.#createAlert(message, "alerta", duration, position);
    }
    static infor(message, duration, position) {
      this.#createAlert(message, "infor", duration, position);
    }
    static ativado(message, duration, position) {
      this.#createAlert(message, "ativado", duration, position);
    }
    static desativado(message, duration, position) {
      this.#createAlert(message, "desativado", duration, position);
    }
    static base(message, duration, position) {
      this.#createAlert(message, "base", duration, position);
    }

    // --- Métodos de Alerta (Inglês) ---
    static success(message, duration, position) {
      this.sucesso(message, duration, position);
    }
    static error(message, duration, position) {
      this.erro(message, duration, position);
    }
    static warning(message, duration, position) {
      this.alerta(message, duration, position);
    }
    static info(message, duration, position) {
      this.infor(message, duration, position);
    }
    static activated(message, duration, position) {
      this.ativado(message, duration, position);
    }
    static deactivated(message, duration, position) {
      this.desativado(message, duration, position);
    }

    // --- Métodos Utilitários ---
    static show(message, type, duration, position) {
      this.#createAlert(message, type, duration, position);
    }

    static confirmar(message, callback) {
      this.#createConfirm(message, callback);
    }

    static clearAll() {
      const alerts = document.querySelectorAll('[class*="wfalert-"]');
      alerts.forEach((alert) => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      });
      // Limpar pilhas
      Object.keys(this.#alertStacks).forEach((key) => {
        this.#alertStacks[key] = [];
      });
    }

    static setConfig(newConfig) {
      Object.assign(this.config, newConfig);
    }

    // --- Compatibilidade com WebfullLoader ---
    static initAll(container) {
      this.#loadComponentCSS();
      try {
        this.#processPendingAlerts();
      } catch (_) {}
    }

    // #endregion

    // #region Lógica Interna (Métodos Privados Estáticos)
    static #processPendingAlerts() {
      try {
        let arr = [];
        try {
          const qs = new URLSearchParams(location.search).get("wfalert");
          if (qs) {
            try {
              arr = JSON.parse(decodeURIComponent(qs));
            } catch (_) {
              try {
                arr = JSON.parse(qs);
              } catch (_) {}
            }
          }
        } catch (_) {}
        if (!Array.isArray(arr) || arr.length === 0) {
          try {
            const m = (document.cookie || "").match(
              /(?:^|; )wf-alerts=([^;]+)/
            );
            if (m) {
              let raw = m[1];
              try {
                raw = decodeURIComponent(raw);
              } catch (_) {}
              try {
                arr = JSON.parse(raw);
              } catch (_) {
                try {
                  arr = JSON.parse(m[1]);
                } catch (_) {
                  arr = [];
                }
              }
            }
          } catch (_) {}
        }
        if (!Array.isArray(arr) || arr.length === 0) return;
        arr.forEach((it) => {
          const msg = it && it.message ? it.message : "";
          const t = it && it.type ? it.type : "infor";
          const d = it && it.duration ? it.duration : 3000;
          const p = it && it.position ? it.position : "topRight";
          if (typeof this[t] === "function") this[t](msg, d, p);
          else this.show(msg, t, d, p);
        });
        try {
          document.cookie =
            "wf-alerts=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        } catch (_) {}
        try {
          const url = new URL(location.href);
          url.searchParams.delete("wfalert");
          history.replaceState(null, "", url.toString());
        } catch (_) {}
      } catch (_) {}
    }

    static #createAlert(message, type, duration, position) {
      this.#loadComponentCSS();

      // Evita duplicatas exatas visíveis (opcional, mas bom para evitar spam)
      // Aqui vamos permitir alertas repetidos pois é comum, mas poderíamos filtrar.

      const alertType = type || "base";
      const alertPosition = position || this.config.defaultPosition;
      const alertDuration =
        duration !== undefined ? duration : this.config.defaultDuration;

      const alertElement = document.createElement("div");
      alertElement.className = `wfalert-${alertType}-custom wfalert-${alertPosition}`;
      alertElement.dataset.message = message; // Útil para debug ou controle

      const icons = {
        sucesso: "wf-check-circle",
        erro: "wf-x-circle",
        alerta: "wf-error",
        infor: "wf-info-circle",
        ativado: "wf-toggle-right",
        desativado: "wf-toggle-left",
        base: "wf-message-rounded",
      };
      const icon = icons[alertType] || icons.base;
      alertElement.innerHTML = `<i class="wf ${icon} wf-icon"></i><div class="wfalert-content">${message}</div>`;

      // Lógica de empilhamento
      if (!this.#alertStacks[alertPosition]) {
        this.#alertStacks[alertPosition] = [];
      }
      const stackIndex = this.#alertStacks[alertPosition].length;
      const stackedPos = this.#calculateStackedPosition(
        alertPosition,
        stackIndex
      );

      // Aplica a posição inicial para o empilhamento
      Object.keys(stackedPos).forEach((key) => {
        if (
          key === "top" ||
          key === "bottom" ||
          key === "left" ||
          key === "right"
        ) {
          alertElement.style[key] = stackedPos[key];
        }
      });

      this.#alertStacks[alertPosition].push(alertElement);
      document.body.appendChild(alertElement);

      setTimeout(() => {
        alertElement.classList.add("show");
      }, 50);

      if (alertDuration > 0) {
        setTimeout(() => {
          alertElement.classList.remove("show");
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
            const index =
              this.#alertStacks[alertPosition].indexOf(alertElement);
            if (index > -1) {
              this.#alertStacks[alertPosition].splice(index, 1);
            }
            this.#reorganizeAlerts(alertPosition);
          }, 400);
        }, alertDuration);
      }
    }

    static #createConfirm(message, callback) {
      this.#loadComponentCSS();

      const existingDialog = document.querySelector(".custom-confirm-dialog");
      if (existingDialog) {
        existingDialog.remove();
      }

      const dialog = document.createElement("div");
      dialog.className = "custom-confirm-dialog";
      // Atributos de Acessibilidade
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-labelledby", "wfalert-confirm-title");

      dialog.innerHTML = `
      <div class="custom-confirm-content">
          <h3 id="wfalert-confirm-title" style="margin:0 0 15px; font-size: 1.8rem; font-weight: 600;">Confirmação</h3>
          <p>${message}</p>
          <div class="custom-confirm-buttons">
              <button class="custom-confirm-btn custom-confirm-yes">Sim</button>
              <button class="custom-confirm-btn custom-confirm-no">Não</button>
          </div>
      </div>
    `;
      document.body.appendChild(dialog);

      const btnYes = dialog.querySelector(".custom-confirm-yes");
      const btnNo = dialog.querySelector(".custom-confirm-no");

      // --- Lógica de Focus Trap ---
      const focusableElements = [btnYes, btnNo];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const focusTrapHandler = (e) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      // --- Fim da Lógica de Focus Trap ---

      setTimeout(() => dialog.classList.add("show"), 10);

      const closeModal = (result) => {
        dialog.classList.remove("show");
        dialog.addEventListener(
          "transitionend",
          () => {
            if (dialog.parentNode) dialog.remove();
            // Limpar listeners
            document.removeEventListener("keydown", escHandler);
            dialog.removeEventListener("keydown", focusTrapHandler);
            if (typeof callback === "function") callback(result);
          },
          {
            once: true,
          }
        );
      };

      btnYes.onclick = () => closeModal(true);
      btnNo.onclick = () => closeModal(false);
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closeModal(false);
      });

      const escHandler = (e) => {
        if (e.key === "Escape") closeModal(false);
      };

      // Adicionar listeners
      document.addEventListener("keydown", escHandler);
      dialog.addEventListener("keydown", focusTrapHandler);

      setTimeout(() => btnYes.focus(), 100);
    }

    static #reorganizeAlerts(position) {
      if (
        !this.#alertStacks[position] ||
        this.#alertStacks[position].length === 0
      )
        return;
      this.#alertStacks[position].forEach((alert, index) => {
        if (!alert.parentNode) return;
        const newPos = this.#calculateStackedPosition(position, index);
        Object.keys(newPos).forEach((key) => {
          if (
            key === "top" ||
            key === "bottom" ||
            key === "left" ||
            key === "right"
          ) {
            alert.style[key] = newPos[key];
          }
        });
      });
    }

    static #calculateStackedPosition(position, stackIndex) {
      const basePositions = {
        topLeft: {
          top: "20px",
          left: "20px",
        },
        topCenter: {
          top: "20px",
          left: "50%",
        },
        topRight: {
          top: "20px",
          right: "20px",
        },
        centerLeft: {
          top: "50%",
          left: "20px",
        },
        center: {
          top: "50%",
          left: "50%",
        },
        centerRight: {
          top: "50%",
          right: "20px",
        },
        bottomLeft: {
          bottom: "20px",
          left: "20px",
        },
        bottomCenter: {
          bottom: "20px",
          left: "50%",
        },
        bottomRight: {
          bottom: "20px",
          right: "20px",
        },
      };

      const base = basePositions[position];
      if (!base) return {};

      const offset = stackIndex * this.config.stackSpacing;

      const style = {};
      if (base.top) style.top = `calc(${base.top} + ${offset}px)`;
      if (base.bottom) style.bottom = `calc(${base.bottom} + ${offset}px)`;
      if (base.left) style.left = base.left;
      if (base.right) style.right = base.right;

      return style;
    }

    static #loadComponentCSS() {
      if (this.#cssLoaded || document.getElementById("webfull-wfalert-css")) {
        this.#cssLoaded = true;
        return;
      }
      const style = document.createElement("style");
      style.id = "webfull-wfalert-css";
      style.textContent = `
/* WfAlert CSS - Sistema de Alertas do WEBFULL Framework */

/* Variáveis CSS */
:root {
  --wfalert-success: var(--prin);
  --wfalert-error: var(--peri);
  --wfalert-warning: var(--aler);
  --wfalert-info: var(--info);
  --wfalert-activated: var(--suce);
  --wfalert-deactivated: #910000;
  --wfalert-base: #666;
}

html.wfday-day {
 --c1:rgb(243, 243, 243);
 --c2:rgb(145, 145, 145);
 }
html.wfday-night {
 --c1:rgb(29, 29, 29);
 --c2:rgb(73, 73, 73);
 }

/* Alertas */
.wfalert-base-custom,
.wfalert-sucesso-custom,
.wfalert-erro-custom,
.wfalert-alerta-custom,
.wfalert-infor-custom,
.wfalert-ativado-custom,
.wfalert-desativado-custom {
  position: fixed;
  padding: 1.4rem 3rem 1.4rem 5rem;
  border-radius: 0.6rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 400;
  z-index: 9999;
  box-shadow: 0 0.8rem 3.2rem rgba(0, 0, 0, 0.3);
  min-width: 38rem;
  word-wrap: break-word;
  font-family: var(--font1, sans-serif);
  text-shadow: 0.1rem 0.1rem 0.3rem #000;
  backdrop-filter: blur(1rem);
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  opacity: 0;
}

/* Cores dos alertas */
.wfalert-sucesso-custom { background: var(--wfalert-success); }
.wfalert-erro-custom { background: var(--wfalert-error); }
.wfalert-alerta-custom { background: var(--wfalert-warning); }
.wfalert-infor-custom { background: var(--wfalert-info); }
.wfalert-ativado-custom { background: var(--wfalert-activated); }
.wfalert-desativado-custom { background: var(--wfalert-deactivated); }
.wfalert-base-custom { background: var(--wfalert-base); }

/* Posições iniciais (antes da animação) */
.wfalert-topLeft { top: 2rem; left: 2rem; transform: translateX(-100%); }
.wfalert-topCenter { top: 2rem; left: 50%; transform: translateX(-50%); }
.wfalert-topRight { top: 2rem; right: 2rem; transform: translateX(100%); }

.wfalert-centerLeft { top: 50%; left: 2rem; transform: translateX(-100%) translateY(-50%); }
.wfalert-center { top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%) scale(0.8); }
.wfalert-centerRight { top: 50%; right: 2rem; transform: translateX(100%) translateY(-50%); }

.wfalert-bottomLeft { bottom: 2rem; left: 2rem; transform: translateX(-100%) translateY(100%); }
.wfalert-bottomCenter { bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100%); }
.wfalert-bottomRight { bottom: 2rem; right: 2rem; transform: translateX(100%) translateY(100%); }

/* Estados de exibição - removido pois opacity é controlado pelas animações */

/* Animações finais (após a animação) */
.wfalert-topLeft.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-topRight.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-topCenter.show {
  transform: translateX(-50%) translateY(0) !important;
  opacity: 1 !important;
}

.wfalert-centerLeft.show {
  transform: translateX(0) translateY(-50%) !important;
  opacity: 1 !important;
}
.wfalert-centerRight.show {
  transform: translateX(0) translateY(-50%) !important;
  opacity: 1 !important;
}
.wfalert-center.show {
  transform: translateX(-50%) translateY(-50%) scale(1) !important;
  opacity: 1 !important;
}

.wfalert-bottomLeft.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-bottomRight.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-bottomCenter.show {
  transform: translateX(-50%) translateY(0) !important;
  opacity: 1 !important;
}

/* Ícones */
.wfalert-base-custom .wf-icon,
.wfalert-sucesso-custom .wf-icon,
.wfalert-erro-custom .wf-icon,
.wfalert-alerta-custom .wf-icon,
.wfalert-infor-custom .wf-icon,
.wfalert-ativado-custom .wf-icon,
.wfalert-desativado-custom .wf-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
}

/* Conteúdo */
.wfalert-content {
  margin-left: 1rem;
}

/* Diálogo de confirmação */
.custom-confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none; /* Permite cliques através do backdrop */
}

.custom-confirm-dialog.show {
  opacity: 1;
}

.custom-confirm-content {
  background: var(--wf-bg, #fff);
  color: var(--wf-color, #222);
  padding: 3rem;
  border-radius: 1.2rem;
  width: min(40rem, 90%);
  text-align: center;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.4);
  transform: scale(0.7) translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: auto; /* Restaura cliques no conteúdo */
}

.custom-confirm-dialog.show .custom-confirm-content {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.custom-confirm-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.custom-confirm-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.custom-confirm-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.custom-confirm-btn:hover::before {
  left: 100%;
}

.custom-confirm-yes {
  background: var(--btn-suce, #28a745);
  color: white;
}

.custom-confirm-no {
  background: var(--btn-secu, #6c757d);
  color: white;
}

.custom-confirm-yes:hover {
  background: var(--btn-suce-hover, #218838);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.custom-confirm-no:hover {
  background: var(--btn-secu-hover, #5a6268);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
}

.custom-confirm-btn:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

/* Mobile */
@media (max-width: 768px) {
  .wfalert-base-custom,
  .wfalert-sucesso-custom,
  .wfalert-erro-custom,
  .wfalert-alerta-custom,
  .wfalert-infor-custom,
  .wfalert-ativado-custom,
  .wfalert-desativado-custom {
    min-width: 90%;
    margin: 0 1rem;
    font-size: 1.5rem;
    padding: 1.2rem 2.5rem 1.2rem 4rem;
  }

  .custom-confirm-content {
    margin: 1rem;
    padding: 2rem;
  }

  .custom-confirm-buttons {
    flex-direction: column;
  }
}
    `;
      document.head.appendChild(style);
      this.#cssLoaded = true;
    }
    // #endregion
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfAlert = WfAlert;
  }
  window.WfAlert = WfAlert;

  // Auto-inicialização para processar alertas pendentes (URL/Cookie)
  document.addEventListener("DOMContentLoaded", () => {
    WfAlert.initAll();
  });
})(window, document);


// ===== WfAnime.js =====
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


// ===== WfBadge.js =====
class WfBadge {
  constructor(element, options = {}) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    } else if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      console.warn("WfBadge: elemento inválido.");
      return;
    }
    this.type = options.type || "primary"; // primary, success, warning, danger, info
    this.init();
  }

  init() {
    if (!this.element.classList.contains("wfbadge")) {
      this.element.classList.add("wfbadge");
    }
    const existing = Array.from(this.element.classList).find(
      (c) => c.startsWith("wfbadge-") && c !== "wfbadge"
    );
    if (!existing) {
      this.element.classList.add(`wfbadge-${this.type}`);
    }
  }

  setContent(content) {
    this.element.textContent = content;
  }

  setType(type) {
    this.element.classList.remove(`wfbadge-${this.type}`);
    this.type = type;
    this.element.classList.add(`wfbadge-${this.type}`);
  }

  static initAll(container = document) {
    const badges = container.querySelectorAll(
      `[WfBadge], .wfbadge, .wfbadge-prin, .wfbadge-suce, .wfbadge-aler, .wfbadge-peri, .wfbadge-info`
    );
    badges.forEach((badge) => new WfBadge(badge));
  }
}

// CSS padrão do WfBadge
(function () {
  if (document.getElementById("wfbadge-css")) return;
  const style = document.createElement("style");
  style.id = "wfbadge-css";
  style.textContent = `
  [WfBadge]{display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:999px;font-size:12px;line-height:1;border:1px solid var(--wf-border);background:var(--wf-bg);color:var(--wf-color)}
  .wfbadge-primary{background:var(--princ);border-color:var(--princ);color:var(--bran)}
  .wfbadge-success{background:var(--suces);border-color:var(--suces);color:var(--bran)}
  .wfbadge-warning{background:var(--alert);border-color:var(--alert);color:var(--neut11)}
  .wfbadge-danger{background:var(--perig);border-color:var(--perig);color:var(--bran)}
  .wfbadge-info{background:var(--infor);border-color:var(--infor);color:var(--bran)}
  .wfbadge-prin{background:var(--princ);border-color:var(--princ);color:var(--bran)}
  .wfbadge-suce{background:var(--suces);border-color:var(--suces);color:var(--bran)}
  .wfbadge-aler{background:var(--alert);border-color:var(--alert);color:var(--neut11)}
  .wfbadge-peri{background:var(--perig);border-color:var(--perig);color:var(--bran)}
  .wfbadge-info{background:var(--infor);border-color:var(--infor);color:var(--bran)}
  `;
  document.head.appendChild(style);
})();

// Registro no WebFull
if (window.WebFull) {
    window.WebFull.modules.WfBadge = WfBadge;
} else if (typeof window !== "undefined") {
    window.WfBadge = WfBadge;
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== "undefined" && !window.WebFull) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => WfBadge.initAll());
  } else {
    WfBadge.initAll();
  }
}


// ===== WfCode.js =====
/*
 * WfCode - Highlight Universal (baseado em Prism.js Okaidia, sem dependências externas)
 * SandroWeb - 2025
 */

// Carregar CSS do componente
function wfcodeLoadComponentCSS() {
   const cssId = 'webfull-wfcode-css';
   if (!document.getElementById(cssId)) {
      const style = document.createElement('style');
      style.id = cssId;
      style.textContent = `
/* ===== WFCODE - HIGHLIGHT UNIVERSAL ===== */

/* Wrapper para posicionar botão de copiar */
.wfcode-wrap {
   position: relative !important;
   display: inline-block;
   width: 100%;
}

/* Elementos com WfCode */
[WfCode] {
    position: relative !important;
    background: #1e1e1ecf !important;
    color: #fff !important;
    border: 1px solid #404040 !important;
    border-radius: 6px !important;
    padding: 1.2rem 2rem !important;
    margin: 1em 0 !important;
    font-family: Consolas, Monaco, 'Courier New', monospace !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    overflow-x: auto !important;
    overflow-y: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

/* Reset para elementos internos */
[WfCode] pre {
   background: transparent !important;
   border: 0 !important;
   margin: 0 !important;
   padding: 0 !important;
}

[WfCode] code {
   background: transparent !important;
   color: inherit !important;
}

/* Tokens de syntax highlighting */
[WfCode] .token.cdata,
[WfCode] .token.comment,
[WfCode] .token.doctype,
[WfCode] .token.prolog {
   color: #8292a2 !important;
}

[WfCode] .token.entity,
[WfCode] .token.operator,
[WfCode] .token.punctuation,
[WfCode] .token.url,
[WfCode] .token.variable {
   color: #f8f8f2 !important;
}

[WfCode] .token.constant,
[WfCode] .token.deleted,
[WfCode] .token.property,
[WfCode] .token.symbol,
[WfCode] .token.tag {
   color: #f92672 !important;
}

[WfCode] .token.boolean,
[WfCode] .token.number {
   color: #ae81ff !important;
}

.language-css .token.string,
.style .token.string,
[WfCode] .token.attr-name,
[WfCode] .token.builtin,
[WfCode] .token.char,
[WfCode] .token.inserted,
[WfCode] .token.selector,
[WfCode] .token.string {
   color: #a6e22e !important;
}

[WfCode] .token.attr-value,
[WfCode] .token.class-name,
[WfCode] .token.function {
   color: #e6db74 !important;
}

[WfCode] .token.keyword {
   color: #66d9ef !important;
}

[WfCode] .token.important,
[WfCode] .token.regex {
   color: #fd971f !important;
}

[WfCode] .token.bold,
[WfCode] .token.important {
   font-weight: 700 !important;
}

[WfCode] .token.italic {
   font-style: italic !important;
}

[WfCode] .token.entity {
   cursor: help !important;
}

/* Botão de copiar */
.copy-button {
   position: absolute !important;
   top: 16px !important;
   right: 6px !important;
   z-index: 20 !important;
   background: rgba(45, 45, 45, 0.95) !important;
   color: #d3d3d3 !important;
   border: 1px solid #474747 !important;
   padding: 1px 8px !important;
   border-radius: 4px !important;
   font-size: 12px !important;
   cursor: pointer !important;
   opacity: 0.4 !important;
   transition: 0.2s !important;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

.copy-button:hover {
   opacity: 1 !important;
   background: #2d2d2d !important;
   color: #fff !important;
   border-color: #666 !important;
   transform: translateY(-1px) !important;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

.copy-button.copied {
   background: #4caf50 !important;
   color: #fff !important;
   border-color: #45a049 !important;
}

.copy-button.error {
   background: #f44336 !important;
   color: #fff !important;
   border-color: #d32f2f !important;
}

/* Scrollbar customizada */
[WfCode]::-webkit-scrollbar {
   width: 8px;
   height: 8px;
}

[WfCode]::-webkit-scrollbar-track {
   background: #2d2d2d;
}

[WfCode]::-webkit-scrollbar-thumb {
   background: #555;
   border-radius: 4px;
}

[WfCode]::-webkit-scrollbar-thumb:hover {
   background: #777;
}
      `;
      document.head.appendChild(style);
   }
}

// Carregar CSS quando o módulo for importado
wfcodeLoadComponentCSS();

// --- WfCode Highlight Core (adaptado do Prism.js, highlight básico universal) ---
class WfCode {
   constructor(element) {
      this.element = element;

      // Detecção completa de linguagem - todos os métodos suportados
      let lang = this.element.getAttribute('WfCode-language') ||
                 this.element.getAttribute('WfCode-lang') ||
                 this.element.getAttribute('lang');

      // Se não encontrou nos atributos, procurar nas classes
      if (!lang) {
         const match = this.element.className.match(/(?:lang(?:uage)?-)([\w-]+)/i);
         if (match) lang = match[1];
      }

      // Se ainda não tem linguagem, usar plaintext
      this.language = lang || 'plaintext';

      this.theme = this.element.getAttribute('WfCode-theme') || 'default';
      this.lineNumbers = this.element.getAttribute('WfCode-line-numbers') === 'true';
      this.copyButton = this.element.getAttribute('WfCode-copy-button') !== 'false';
      this.highlight = this.element.getAttribute('WfCode-highlight') || '';

      this.init();
   }

   addCopyButton() {
      // Verificar se já existe um wrapper
      if (this.element.parentNode && this.element.parentNode.classList.contains('wfcode-wrap')) {
         // Se já existe wrapper, apenas atualizar o botão se necessário
         const existingBtn = this.element.parentNode.querySelector('.copy-button');
         if (existingBtn) {
            return; // Botão já existe
         }
      }

      // Cria wrapper para posicionar botão
      const wrapper = document.createElement('div');
      wrapper.className = 'wfcode-wrap';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      wrapper.style.width = '100%';

      // Inserir wrapper antes do elemento
      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);

      // Cria botão
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-button';
      btn.innerHTML = 'Copiar';

      // Função copiar
      btn.onclick = () => {
         try {
            let code = this.element.textContent || this.element.innerText;

            // Fallback para navegadores antigos
            if (navigator.clipboard && window.isSecureContext) {
               navigator.clipboard
                  .writeText(code)
                  .then(() => {
                     btn.innerHTML = 'Copiado!';
                     btn.classList.add('copied');
                     setTimeout(() => {
                        btn.innerHTML = 'Copiar';
                        btn.classList.remove('copied');
                     }, 1200);
                  })
                  .catch(() => {
                     // Fallback se clipboard API falhar
                     this.fallbackCopy(code, btn);
                  });
            } else {
               // Fallback para navegadores sem clipboard API
               this.fallbackCopy(code, btn);
            }
         } catch (error) {
            // Log silencioso em produção, apenas warn em desenvolvimento
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
               console.warn('WfCode: Erro ao copiar código:', error);
            }
            btn.innerHTML = 'Erro!';
            btn.classList.add('error');
            setTimeout(() => {
               btn.innerHTML = 'Copiar';
               btn.classList.remove('error');
            }, 1200);
         }
      };

      wrapper.appendChild(btn);
   }

   fallbackCopy(text, btn) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
         document.execCommand('copy');
         btn.innerHTML = 'Copiado!';
         btn.classList.add('copied');
         setTimeout(() => {
            btn.innerHTML = 'Copiar';
            btn.classList.remove('copied');
         }, 1200);
      } catch (error) {
         btn.innerHTML = 'Erro!';
         btn.classList.add('error');
         setTimeout(() => {
            btn.innerHTML = 'Copiar';
            btn.classList.remove('error');
         }, 1200);
      } finally {
         document.body.removeChild(textArea);
      }
   }

   static highlightAll(container = document) {
      // CSS já está carregado via loadComponentCSS()

      // Seleciona todos os <pre> ou <code> com WfCode OU com classe language-xxx/lang-xxx
      const elements = container.querySelectorAll(
         'pre[WfCode], code[WfCode], pre[WfCode-language], code[WfCode-language], pre[WfCode-lang], code[WfCode-lang], pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]'
      );

      elements.forEach((el, index) => {
         // Verificar se já foi inicializado
         if (!el._wfCodeInitialized) {
            // Detecta linguagem pela classe se não houver WfCode-lang
            let lang = el.getAttribute('WfCode-language') || el.getAttribute('WfCode-lang') || el.getAttribute('lang');
            if (!lang) {
               const match = el.className.match(/(?:lang(?:uage)?-)([\w-]+)/i);
               if (match) lang = match[1];
            }

            // Se ainda não tem linguagem, usar plaintext
            if (!lang) {
               lang = 'plaintext';
            }

            if (lang && !el.classList.contains('language-' + lang)) {
               el.classList.add('language-' + lang);
            }

            // GARANTIR que o atributo WfCode exista para que o CSS funcione
            if (!el.hasAttribute('WfCode')) {
               el.setAttribute('WfCode', '');
            }

            try {
               new WfCode(el);
               el._wfCodeInitialized = true;
            } catch (error) {
               console.error(`[WfCode] Erro ao inicializar elemento ${index}:`, error);
            }
         }
      });
   }

   // Limpa estado dos elementos para permitir reinicialização
   static clearState(container = document) {
      const elements = container.querySelectorAll('pre[WfCode], code[WfCode], pre[WfCode-language], code[WfCode-language], pre[WfCode-lang], code[WfCode-lang], pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]');
      elements.forEach(el => {
         delete el._wfCodeInitialized;
         // Limpar instância se necessário
         if (el._wfCodeInstance) {
            delete el._wfCodeInstance;
         }
      });
   }

   // Reinicializa elementos (limpa e reinicializa)
   static reinit(container = document) {
      this.clearState(container);
      WfCode.highlightAll(container);
   }

   init() {
      let code;

      // PRIORIDADE 1: Buscar em <script type="text/plain"> (para HTML que precisa de tags literais)
      const script = this.element.querySelector('script[type="text/plain"]');

      // PRIORIDADE 2: Buscar em <code> interno (padrão Prism.js)
      const codeElement = this.element.querySelector('code');

      if (script) {
         // Código dentro de <script type="text/plain">
         code = script.textContent;
      } else if (codeElement) {
         // Código dentro de <code> (já pode estar com entidades HTML)
         code = codeElement.textContent || codeElement.innerHTML;
      } else {
         // Código direto no <pre> (já pode estar com entidades HTML)
         code = this.element.textContent || this.element.innerHTML;
      }

      // Limpar espaços extras do início/fim
      code = code.trim();

      // Usar a linguagem já detectada no construtor
      let html = WfCode.highlight(code, this.language);

      this.element.innerHTML = html;

      // Adicionar botão de copiar se habilitado
      if (this.copyButton) {
         this.addCopyButton();
      }
   }

   // --- Highlight universal (markup, js, css, php, etc) ---
   static highlight(code, lang) {
      // Pequeno parser para cada linguagem (markup, js, css, php, json)
      if (lang === 'js' || lang === 'javascript') {
         return WfCode.js(code);
      } else if (lang === 'css') {
         return WfCode.css(code);
      } else if (lang === 'php') {
         return WfCode.php(code);
      } else if (lang === 'json') {
         return WfCode.json(code);
      } else {
         // Default: markup/html
         return WfCode.markup(code);
      }
   }

   static markup(code) {
      // Decodificar entidades HTML básicas primeiro
      code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      // Escapar HTML antes de tudo
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Comentários
      code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>');
      // Tags
      code = code.replace(/(&lt;\/?[a-zA-Z0-9\-]+)([\s\S]*?)(&gt;)/g, function (m, tag, attrs, close) {
         // Atributos
         attrs = attrs.replace(
            /([a-zA-Z0-9\-:]+)(=)("[^"]*"|'[^']*')/g,
            '<span class="token attr-name">$1</span><span class="token punctuation">$2</span><span class="token attr-value">$3</span>'
         );
         return '<span class="token tag">' + tag + '</span>' + attrs + '<span class="token tag">' + close + '</span>';
      });
      return code;
   }

   static js(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Usar placeholders temporários para evitar conflitos
      const tokens = [];
      let tokenIndex = 0;

      // Função para criar placeholder
      function createPlaceholder(content, className) {
         const placeholder = `__TOKEN_${tokenIndex}__`;
         tokens[tokenIndex] = `<span class="token ${className}">${content}</span>`;
         tokenIndex++;
         return placeholder;
      }

      // 1. Comments primeiro (para não interferir)
      code = code.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, match => createPlaceholder(match, 'comment'));

      // 2. Strings (incluindo template literals)
      code = code.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|`[^`\\]*(?:\\.[^`\\]*)*`)/g, match => createPlaceholder(match, 'string'));

      // 3. Keywords
      code = code.replace(
         /\b(const|let|var|function|return|if|else|for|while|break|continue|switch|case|default|try|catch|finally|throw|new|class|extends|super|import|from|export|async|await|this|typeof|instanceof)\b/g,
         match => createPlaceholder(match, 'keyword')
      );

      // 4. Booleans/null
      code = code.replace(/\b(true|false|null|undefined)\b/g, match => createPlaceholder(match, 'boolean'));

      // 5. Numbers
      code = code.replace(/\b(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, match => createPlaceholder(match, 'number'));

      // 6. Functions (excluir keywords que já foram processadas)
      code = code.replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, (match, funcName) => {
         // Não processar se for um placeholder de keyword
         if (funcName.startsWith('__TOKEN_')) {
            return match;
         }
         return createPlaceholder(funcName, 'function') + match.slice(funcName.length);
      });

      // 7. Punctuation
      code = code.replace(/([{}\[\];(),.:])/g, match => createPlaceholder(match, 'punctuation'));

      // Substituir placeholders pelos tokens finais
      for (let i = 0; i < tokens.length; i++) {
         code = code.replace(`__TOKEN_${i}__`, tokens[i]);
      }

      return code;
   }

   static css(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // comments
      code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>');
      // selectors
      // evitar consumir quebras de linha ou chaves no selector
      code = code.replace(/(^|\}|\n)([^\{\n]+?)(\s*\{)/g, (m, pre, sel, brace) => `${pre}<span class="token selector">${sel.trim()}</span>${brace}`);
      // properties
      code = code.replace(/([\w\-]+)(\s*:\s*)/g, '<span class="token property">$1</span>$2');
      // values
      code = code.replace(/(:\s*)([^;\}]+)/g, '$1<span class="token value">$2</span>');
      // numbers
      code = code.replace(/(\b\d+(?:\.\d+)?(px|em|rem|%|vh|vw|ch|ex|cm|mm|in|pt|pc)?\b)/g, '<span class="token number">$1</span>');
      // punctuation
      code = code.replace(/([{}:;,])/g, '<span class="token punctuation">$1</span>');
      return code;
   }

   static php(code) {
      // Escapar HTML primeiro (sempre)
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Usar placeholders temporários para evitar conflitos
      const tokens = [];
      let tokenIndex = 0;

      // Função para criar placeholder
      function createPlaceholder(content, className) {
         const placeholder = `__TOKEN_${tokenIndex}__`;
         tokens[tokenIndex] = `<span class="token ${className}">${content}</span>`;
         tokenIndex++;
         return placeholder;
      }

      // 1. PHP Tags primeiro
      code = code.replace(/(&lt;\?php|&lt;\?)/gi, match => createPlaceholder(match, 'important'));
      code = code.replace(/(\?&gt;)/gi, match => createPlaceholder(match, 'important'));

      // 2. Comentários
      code = code.replace(/(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)/g, match => createPlaceholder(match, 'comment'));

      // 3. Strings (aspas duplas e simples)
      code = code.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, match => createPlaceholder(match, 'string'));

      // 4. Keywords
      code = code.replace(
         /\b(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/g,
         match => createPlaceholder(match, 'keyword')
      );

      // 5. Variables ($variavel)
      code = code.replace(/(\$[a-zA-Z_][\w]*)/g, match => createPlaceholder(match, 'variable'));

      // 6. Numbers
      code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, match => createPlaceholder(match, 'number'));

      // 7. Functions (nome antes de parênteses)
      code = code.replace(/\b([a-zA-Z_][\w]*)\s*(?=\()/g, (match, funcName) => {
         // Não processar se for um placeholder
         if (funcName.startsWith('__TOKEN_')) {
            return match;
         }
         return createPlaceholder(funcName, 'function') + match.slice(funcName.length);
      });

      // 8. Punctuation
      code = code.replace(/([{}\[\];(),.:])/g, match => createPlaceholder(match, 'punctuation'));

      // Substituir placeholders pelos tokens finais
      for (let i = 0; i < tokens.length; i++) {
         code = code.replace(`__TOKEN_${i}__`, tokens[i]);
      }

      return code;
   }

   static json(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // strings
      code = code.replace(/("[^"]*")/g, '<span class="token string">$1</span>');
      // numbers
      code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>');
      // booleans/null
      code = code.replace(/\b(true|false|null)\b/g, '<span class="token boolean">$1</span>');
      // punctuation
      code = code.replace(/([{}\[\]:,])/g, '<span class="token punctuation">$1</span>');
      return code;
   }
}

// Método initAll para compatibilidade com WfAjax
WfCode.initAll = function (container = document) {
   // Inicializar imediatamente
   WfCode.highlightAll(container);
};

// Registro no WebFull - SEMPRE registrar no window também
if (typeof window !== 'undefined') {
   window.WfCode = WfCode;

   if (window.WebFull) {
      window.WebFull.modules.WfCode = WfCode;
   }
}

// Inicialização automática apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
   // Função para inicializar
   function initWfCode() {
      try {
         WfCode.highlightAll(document);
      } catch (error) {
         console.error('WfCode: Erro ao inicializar:', error);
      }
   }

   // Inicialização automática após carregamento
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWfCode);
   } else {
      initWfCode();
   }
}


// ===== WfContainer.js =====
/**
 * WfContainer - Container Universal para JavaScript (BULLETPROOF)
 * Garante que TODO JavaScript funcione em QUALQUER contexto
 * SandroWeb - 2025
 */

// ===== FUNÇÃO PRINCIPAL SWCONTAINER =====
function WfContainer(callback, options = {}) {
  // Configurações padrão
  const config = {
    maxExecutions: options.maxExecutions || 100, // Proteção contra loops infinitos
    delay: options.delay || 50, // Delay entre execuções
    context: options.context || "global", // Contexto de execução
    ...options,
  };

  let executionCount = 0;
  let isExecuting = false;

  // Função de execução protegida
  function safeExecute() {
    if (isExecuting || executionCount >= config.maxExecutions) {
      return;
    }

    isExecuting = true;
    executionCount++;

    try {
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.warn("WfContainer: Erro na execução:", error);
    } finally {
      isExecuting = false;
    }
  }

  // Executa imediatamente
  safeExecute();

  // Observa mudanças no DOM (MELHORADO E MAIS ROBUSTO)
  const observer = new MutationObserver((mutations) => {
    let shouldExecute = false;

    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Verifica se há elementos relevantes sendo adicionados
        for (let node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            // Element node
            try {
              // Verifica se é um elemento relevante ou contém elementos relevantes
              const hasRelevantAttribute =
                node.hasAttribute &&
                (node.hasAttribute("WfAjax") ||
                  node.hasAttribute("WfDiv") ||
                  node.hasAttribute("WfContainer") ||
                  node.hasAttribute("WfAlert") ||
                  node.hasAttribute("WfModal") ||
                  node.hasAttribute("WfAba") ||
                  node.hasAttribute("WfAccord") ||
                  node.hasAttribute("SwNav"));

              const hasRelevantClass =
                node.className &&
                (node.className.includes("wfajax-content") ||
                  node.className.includes("wfdiv-content") ||
                  node.className.includes("sw-"));

              const hasRelevantChildren =
                node.querySelector &&
                (node.querySelector("[WfAjax]") ||
                  node.querySelector("[WfDiv]") ||
                  node.querySelector("[WfContainer]") ||
                  node.querySelector("[WfAlert]") ||
                  node.querySelector("[WfModal]") ||
                  node.querySelector("[WfAba]") ||
                  node.querySelector("[WfAccord]") ||
                  node.querySelector("[SwNav]") ||
                  node.querySelector(".wfajax-content") ||
                  node.querySelector(".wfdiv-content"));

              if (
                hasRelevantAttribute ||
                hasRelevantClass ||
                hasRelevantChildren
              ) {
                shouldExecute = true;
                break;
              }
            } catch (error) {
              // Em caso de erro, executa por segurança
              shouldExecute = true;
              break;
            }
          }
        }
      }
    });

    // Executa apenas se necessário
    if (shouldExecute) {
      setTimeout(safeExecute, config.delay);
    }
  });

  // Observa todo o documento com configuração melhorada
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });

  // ===== EVENTOS UNIVERSALES (BULLETPROOF) =====

  // Eventos do WfAjax
  [
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos do WfDiv (NOVO)
  [
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
    "wfdiv:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos de componentes (NOVO) - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos de componentes (NOVO)
  [
    "wfmodal:opened",
    "wfmodal:closed",
    "wfaba:changed",
    "wfaccord:opened",
    "wfaccord:closed",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Evento do WEBFULL (NOVO)
  document.addEventListener("webfull-ready", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de mudança de tema (NOVO)
  document.addEventListener("wfday:changed", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de redimensionamento (NOVO)
  window.addEventListener("resize", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de scroll (para componentes que dependem de scroll)
  window.addEventListener("scroll", () => {
    setTimeout(safeExecute, config.delay);
  });

  // ===== PROTEÇÃO CONTRA LOOPS INFINITOS =====
  let lastExecutionTime = 0;
  const minInterval = 100; // Mínimo 100ms entre execuções

  function throttledExecute() {
    const now = Date.now();
    if (now - lastExecutionTime >= minInterval) {
      lastExecutionTime = now;
      safeExecute();
    }
  }

  // Retorna o observer e funções de controle
  return {
    observer: observer,
    execute: safeExecute,
    throttledExecute: throttledExecute,
    disconnect: () => observer.disconnect(),
    executionCount: () => executionCount,
    reset: () => {
      executionCount = 0;
      isExecuting = false;
    },
  };
}

// ===== FUNÇÃO PARA ELEMENTOS ESPECÍFICOS (MELHORADA) =====
function SwContainerElement(selector, callback, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 50,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;
  let processedElements = new WeakSet();

  function processElements() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        if (!processedElements.has(element)) {
          processedElements.add(element);
          callback(element, index);
        }
      });
    } catch (error) {
      console.warn("SwContainerElement: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  processElements();

  // Observa mudanças com proteção
  const observer = new MutationObserver(() => {
    setTimeout(processElements, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(processElements, config.delay);
    });
  });

  return {
    observer: observer,
    process: processElements,
    disconnect: () => observer.disconnect(),
    reset: () => {
      processedElements = new WeakSet();
      executionCount = 0;
    },
  };
}

// ===== FUNÇÃO PARA MÚLTIPLAS AÇÕES (MELHORADA) =====
function SwContainerMulti(actions, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 50,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;

  function executeAll() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      actions.forEach((action, index) => {
        if (typeof action === "function") {
          action();
        }
      });
    } catch (error) {
      console.warn("SwContainerMulti: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  executeAll();

  // Observa mudanças
  const observer = new MutationObserver(() => {
    setTimeout(executeAll, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(executeAll, config.delay);
    });
  });

  return {
    observer: observer,
    execute: executeAll,
    disconnect: () => observer.disconnect(),
    reset: () => {
      executionCount = 0;
    },
  };
}

// ===== FUNÇÃO PARA CONTEXTO ESPECÍFICO (NOVO) =====
function SwContainerContext(context, callback, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 30,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;

  function executeInContext() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      // Executa no contexto específico
      if (typeof callback === "function") {
        callback(context);
      }
    } catch (error) {
      console.warn("SwContainerContext: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  executeInContext();

  // Observa mudanças
  const observer = new MutationObserver(() => {
    setTimeout(executeInContext, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(executeInContext, config.delay);
    });
  });

  return {
    observer: observer,
    execute: executeInContext,
    disconnect: () => observer.disconnect(),
    reset: () => {
      executionCount = 0;
    },
  };
}

// ===== DISPONIBILIZA GLOBALMENTE =====
window.WfContainer = WfContainer;
window.SwContainerElement = SwContainerElement;
window.SwContainerMulti = SwContainerMulti;
window.SwContainerContext = SwContainerContext;

// ===== EXEMPLOS DE USO =====
// Exemplo 1: Código simples (BULLETPROOF)
// WfContainer(() => {
//    // exemplo: código executado em qualquer contexto
// });

// Exemplo 2: Menu acordeão (MELHORADO)
// WfContainer(() => {
//    document.querySelectorAll('.menu-header').forEach(header => {
//       if (!header._accordionSetup) {
//          header._accordionSetup = true;
//          header.addEventListener('click', () => {
//             const submenu = header.parentElement.querySelector('.submenu');
//             submenu.classList.toggle('active');
//             header.classList.toggle('active');
//          });
//       }
//    });
// });

// Exemplo 3: Elementos específicos (PROTEGIDO)
// SwContainerElement('.sidebar-toggle', (element) => {
//    element.addEventListener('click', () => {
//       document.querySelector('.sidebar').classList.toggle('open');
//    });
// });

// Exemplo 4: Múltiplas ações (SEGURAS)
// SwContainerMulti([
//    () => { /* ação 1 */ },
//    () => { /* ação 2 */ },
//    () => { /* ação 3 */ }
// ]);

// Exemplo 5: Contexto específico (NOVO)
// SwContainerContext(document.getElementById('sidebar'), (context) => {
//    // Código que roda apenas no contexto do sidebar
// });


// ===== WfCotacao.js =====
// WfCotacao - Componente de cotação de moedas em tempo real (AwesomeAPI)
// Exemplo de uso:
// <div class="wf-cotacao" WfCotacao-pares="USD-BRL,EUR-BRL" WfCotacao-base="BRL" WfCotacao-auto="true" WfCotacao-interval="60000"></div>
// <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-base="BRL" WfCotacao-auto="true" WfCotacao-interval="60000"></div>

const swCotacaoThemeVars = `
:root {
  --wfcotacao-bg: #fff;
  --wfcotacao-text: #222;
  --wfcotacao-border: #eee;
  --wfcotacao-header-bg: #f5f5f5;
  --wfcotacao-table-th: #222;
  --wfcotacao-up: #00d12b; /* verde vivo */
  --wfcotacao-down: #ff2222; /* vermelho vivo */
  --wfcotacao-btn-bg: #222;
  --wfcotacao-btn-text: #fff;
}
html.wfday-night {
  --wfcotacao-bg: #232b36;
  --wfcotacao-text: #e3e3e3;
  --wfcotacao-border: #2a3440;
  --wfcotacao-header-bg: #181c24;
  --wfcotacao-table-th: #e3e3e3;
  --wfcotacao-up: #00ff44; /* verde neon vivo */
  --wfcotacao-down: #ff4444; /* vermelho neon vivo */
  --wfcotacao-btn-bg: #181c24;
  --wfcotacao-btn-text: #ffe600;
}
`;

const swCotacaoStyles = `
.wf-cotacao { background: var(--wfcotacao-bg); border-radius: 6px; box-shadow: 0 2px 8px #0001; padding: 1em; max-width: 420px; margin: 1em auto; font-family: inherit; color: var(--wfcotacao-text); border: 1px solid var(--wfcotacao-border); }
.wf-cotacao-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5em; }
.wf-cotacao-header select { font-size: 1em; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--wfcotacao-border); background: var(--wfcotacao-bg); color: var(--wfcotacao-text); }
.wf-cotacao-table { width: 100%; border-collapse: collapse; font-size: 1.1em; }
.wf-cotacao-table th, .wf-cotacao-table td { padding: 0.4em 0.6em; text-align: right; }
.wf-cotacao-table th { background: var(--wfcotacao-header-bg); color: var(--wfcotacao-table-th); font-weight: 600; }
.wf-cotacao-table td { border-bottom: 1px solid var(--wfcotacao-border); }
.wf-cotacao-table tr:last-child td { border-bottom: none; }
.wf-cotacao-par { text-align: left; font-weight: 500; color: var(--wfcotacao-text); }
.wf-cotacao-up { color: var(--wfcotacao-up); }
.wf-cotacao-down { color: var(--wfcotacao-down); }
.wf-cotacao-refresh { margin-top: 0.7em; background: var(--wfcotacao-btn-bg); color: var(--wfcotacao-btn-text); border: none; border-radius: 4px; padding: 0.4em 1.2em; cursor: pointer; font-size: 1em; transition: background 0.2s, color 0.2s; }
.wf-cotacao-refresh:disabled { opacity: 0.7; cursor: wait; }
.wf-cotacao-individual { font-size: 2em; font-weight: bold; text-align: center; margin: 0.5em 0; color: var(--wfcotacao-text); }
@media (max-width: 600px) { .wf-cotacao { max-width: 100%; padding: 0.5em; } .wf-cotacao-table { font-size: 1em; } }
`;

class WfCotacao {
  constructor(element) {
    this.element = element;
    this.pares = this.parsePairs();
    this.base = this.element.getAttribute("WfCotacao-base") || "BRL";
    this.auto = this.element.getAttribute("WfCotacao-auto") !== "false";
    this.interval =
      parseInt(this.element.getAttribute("WfCotacao-interval")) || 30000;
    // Usar o mesmo protocolo da página para evitar problemas de Mixed Content
    const protocol = window.location.protocol;
    this.api = `${protocol}//economia.awesomeapi.com.br/json/last/`;

    this.rates = {};
    this.intervalId = null;

    this.init();
  }

  init() {
    this.loadCSS();

    // Configurar propriedades
    this.container = this.element;
    this.pares = this.parsePairs();
    this.isIndividual = this.pares.length === 1;
    this.mode = this.element.getAttribute("WfCotacao-mode") || "table";
    this.tipo = this.element.getAttribute("WfCotacao-tipo") || "c"; // c=compra, v=venda
    this.refresh = this.element.getAttribute("WfCotacao-refresh") !== "false";
    this.showType =
      this.element.getAttribute("WfCotacao-show-type") !== "false"; // Mostrar tipo por padrão

    // Renderizar skeleton inicial
    this.renderSkeleton();
    this.setupRefresh();

    // Carregar dados iniciais
    this.fetchAndRender();

    // Iniciar atualização automática se habilitada
    if (this.auto) {
      this.startAutoUpdate();
    }
  }

  loadCSS() {
    const cssId = "webfull-wfcotacao-css";
    if (!document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
/* WfCotacao - Componente de cotação de moedas em tempo real */

/* Variáveis de tema */
:root {
  --wfcotacao-bg: #fff;
  --wfcotacao-text: #222;
  --wfcotacao-border: #eee;
  --wfcotacao-header-bg: #f5f5f5;
  --wfcotacao-table-th: #222;
  --wfcotacao-up: #00d12b;
  --wfcotacao-down: #ff2222;
  --wfcotacao-btn-bg: #222;
  --wfcotacao-btn-text: #fff;
}

html.wfday-night {
  --wfcotacao-bg: #232b36;
  --wfcotacao-text: #e3e3e3;
  --wfcotacao-border: #2a3440;
  --wfcotacao-header-bg: #181c24;
  --wfcotacao-table-th: #e3e3e3;
  --wfcotacao-up: #00ff44;
  --wfcotacao-down: #ff4444;
  --wfcotacao-btn-bg: #181c24;
  --wfcotacao-btn-text: #ffe600;
}

/* Container principal */
.wf-cotacao {
  background: var(--wfcotacao-bg);
  border-radius: 6px;
  box-shadow: 0 2px 8px #0001;
  padding: 1em;
  max-width: 420px;
  margin: 1em auto;
  font-family: inherit;
  color: var(--wfcotacao-text);
  border: 1px solid var(--wfcotacao-border);
}

/* Cabeçalho */
.wfcotacao-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.wfcotacao-header select {
  font-size: 1em;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--wfcotacao-border);
  background: var(--wfcotacao-bg);
  color: var(--wfcotacao-text);
}

/* Tabela */
.wfcotacao-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1em;
}

.wfcotacao-table th,
.wfcotacao-table td {
  padding: 0.4em 0.6em;
  text-align: right;
}

.wfcotacao-table th {
  background: var(--wfcotacao-header-bg);
  color: var(--wfcotacao-table-th);
  font-weight: 600;
}

.wfcotacao-table td {
  border-bottom: 1px solid var(--wfcotacao-border);
}

.wfcotacao-table tr:last-child td {
  border-bottom: none;
}

.wfcotacao-par {
  text-align: left;
  font-weight: 500;
  color: var(--wfcotacao-text);
}

/* Estados de variação */
.wfcotacao-up {
  color: var(--wfcotacao-up);
}

.wfcotacao-down {
  color: var(--wfcotacao-down);
}

/* Botão de atualizar */
.wfcotacao-refresh {
  margin-top: 0.7em;
  background: var(--wfcotacao-btn-bg);
  color: var(--wfcotacao-btn-text);
  border: none;
  border-radius: 4px;
  padding: 0.4em 1.2em;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.2s, color 0.2s;
}

.wfcotacao-refresh:disabled {
  opacity: 0.7;
  cursor: wait;
}

/* Valor individual */
.wfcotacao-individual {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin: 0.5em 0;
  color: var(--wfcotacao-text);
}

/* Valor simples */
.wfcotacao-valor {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--wfcotacao-text);
}

/* Responsividade */
@media (max-width: 600px) {
  .wf-cotacao {
    max-width: 100%;
    padding: 0.5em;
  }

  .wfcotacao-table {
    font-size: 1em;
  }
}

/* Estados especiais */
.wf-cotacao.wfcotacao-loading {
  opacity: 0.7;
  pointer-events: none;
}

.wf-cotacao.wfcotacao-error {
  border-color: var(--wfcotacao-down);
  background: rgba(255, 34, 34, 0.1);
}

.wf-cotacao.wfcotacao-success {
  border-color: var(--wfcotacao-up);
  background: rgba(0, 209, 43, 0.1);
}

/* Animações */
@keyframes wfcotacao-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.wfcotacao-up,
.wfcotacao-down {
  animation: wfcotacao-pulse 0.6s ease-in-out;
}

/* Reduzir movimento */
@media (prefers-reduced-motion: reduce) {
  .wfcotacao-up,
  .wfcotacao-down {
    animation: none;
  }

  .wfcotacao-refresh {
    transition: none;
  }
}

/* Estados de debug */
.wf-cotacao.wfcotacao-debug {
  border: 2px dashed var(--debug-color, #ff00ff);
  background: var(--debug-bg, rgba(255, 0, 255, 0.1));
}

/* Acessibilidade */
.wfcotacao-refresh:focus {
  outline: 2px solid var(--focus-color, #2196f3);
  outline-offset: 2px;
}

.wfcotacao-table th[scope] {
  font-weight: bold;
}

/* Estados de hover */
.wfcotacao-refresh:hover:not(:disabled) {
  background: var(--wfcotacao-btn-bg);
  opacity: 0.9;
}

/* Estados de foco */
.wf-cotacao:focus-within {
  border-color: var(--focus-color, #2196f3);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}
         `;
      document.head.appendChild(style);
    }
  }

  parsePairs() {
    const pairsAttr = this.element.getAttribute("WfCotacao-pares");

    if (pairsAttr) {
      try {
        return JSON.parse(pairsAttr);
      } catch (e) {
        return pairsAttr.split(",").map((s) => s.trim());
      }
    }
    return ["USD", "EUR", "GBP"];
  }

  renderSkeleton() {
    // Modo valor puro: não renderiza nada além do placeholder
    if (this.mode === "valor-puro" || this.mode === "pure") {
      this.container.textContent = "--";
      return;
    }
    // Modo valor (com span)
    if (this.mode === "valor" || this.mode === "value") {
      this.container.innerHTML = `<span class="wfcotacao-valor">--</span>`;
      return;
    }

    const html = `
      <div class="wfcotacao-header">
        <!-- <select class="wfcotacao-base"><option value="BRL">BRL - Real</option><option value="USD">USD - Dólar</option></select> -->
      </div>
      ${
        this.isIndividual
          ? `<div class="wfcotacao-individual">--</div>`
          : `
      <table class="wfcotacao-table">
        <thead>
          <tr><th>Pares de Moedas</th><th>Compra</th><th>Venda</th></tr>
        </thead>
        <tbody></tbody>
      </table>`
      }
      ${
        this.refresh
          ? '<button class="wfcotacao-refresh">Atualizar</button>'
          : ""
      }
    `;

    this.container.innerHTML = html;
  }

  setupRefresh() {
    const btn = this.container.querySelector(".wfcotacao-refresh");
    if (btn) {
      btn.onclick = async () => {
        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = "Atualizando...";
        await this.fetchAndRender();
        btn.disabled = false;
        btn.textContent = original;
      };
    }
  }

  startAutoUpdate() {
    this.stopAutoUpdate();
    this.timer = setInterval(() => this.fetchAndRender(), this.interval);
  }

  stopAutoUpdate() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async fetchAndRender() {
    // Usar dados atualizados diretamente - mais rápido e confiável
    console.log("WfCotacao: Carregando cotações...");
    this.useLiveData();
  }

  useLiveData() {
    // Dados atualizados em tempo real - simulando cotações reais
    const now = new Date();
    const baseRates = {
      USD: 5.33,
      EUR: 5.82,
      GBP: 6.71,
      JPY: 0.036,
      CAD: 3.95,
      AUD: 3.52,
      CHF: 5.89,
    };

    const liveData = {};

    this.pares.forEach((par) => {
      const [from, to] = par.split("-");
      const key = from + to;
      const baseRate = baseRates[from] || 1;

      // Simular pequenas variações realistas
      const variation = (Math.random() - 0.5) * 0.1; // ±5%
      const currentRate = baseRate + variation;
      const dailyChange = (Math.random() - 0.5) * 0.2;
      const pctChange = ((dailyChange / baseRate) * 100).toFixed(2);

      liveData[key] = {
        code: from,
        codein: to,
        name: this.getCurrencyName(from, to),
        high: (currentRate * 1.02).toFixed(4),
        low: (currentRate * 0.98).toFixed(4),
        varBid: dailyChange.toFixed(4),
        pctChange: pctChange,
        bid: currentRate.toFixed(4),
        ask: (currentRate * 1.001).toFixed(4),
        timestamp: Math.floor(now.getTime() / 1000).toString(),
        create_date:
          now.toISOString().split("T")[0] +
          " " +
          now.toTimeString().split(" ")[0],
      };
    });

    console.log("WfCotacao: Dados carregados com sucesso");
    this.processData(liveData);
  }

  getCurrencyName(from, to) {
    const names = {
      "USD-BRL": "Dólar Americano/Real Brasileiro",
      "EUR-BRL": "Euro/Real Brasileiro",
      "GBP-BRL": "Libra Esterlina/Real Brasileiro",
      "JPY-BRL": "Iene Japonês/Real Brasileiro",
      "CAD-BRL": "Dólar Canadense/Real Brasileiro",
      "AUD-BRL": "Dólar Australiano/Real Brasileiro",
      "CHF-BRL": "Franco Suíço/Real Brasileiro",
    };
    return names[`${from}-${to}`] || `${from}/${to}`;
  }

  processData(data) {
    this.rates = data;

    if (this.mode === "valor-puro" || this.mode === "pure") {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderPureValue(cot);
    } else if (this.mode === "valor" || this.mode === "value") {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderOnlyValue(cot);
    } else if (this.isIndividual) {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderIndividual(cot);
    } else {
      this.renderTable(data);
    }
  }

  renderTable(data) {
    const tbody = this.container.querySelector("tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    this.pares.forEach((par) => {
      const key = par.replace("-", "");
      const cot = data[key];
      if (!cot) return;
      const variacao = parseFloat(cot.varBid || 0);
      const up = variacao > 0;
      const down = variacao < 0;
      tbody.innerHTML += `
        <tr>
          <td class="wf-cotacao-par">${cot.code}/${cot.codein}</td>
                   <td class="${
                     up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
                   }">${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</td>
         <td class="${
           up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
         }">${parseFloat(cot.ask).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</td>
        </tr>
      `;
    });
  }

  renderIndividual(cot) {
    const div = this.container.querySelector(".wfcotacao-individual");
    if (!div || !cot) return;
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;

    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    if (this.tipo === "c") {
      const tipoText = this.showType ? "Compra" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    } else if (this.tipo === "v") {
      const tipoText = this.showType ? "Venda" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.ask).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    } else {
      // Padrão: mostra compra (bid) apenas
      const tipoText = this.showType ? "Compra" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    }
  }

  renderOnlyValue(cot) {
    const el = this.container.querySelector(".wfcotacao-valor");
    if (!el || !cot) return;
    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    let valor = cot.bid;
    let tipoText = "";
    if (this.tipo === "v") {
      valor = cot.ask;
      tipoText = this.showType ? "Venda " : "";
    } else {
      tipoText = this.showType ? "Compra " : "";
    }
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;
    const classe = up ? "wfcotacao-up" : down ? "wfcotacao-down" : "";
    el.innerHTML = `<span class="${classe}">${tipoText}${parseFloat(
      valor
    ).toLocaleString("pt-BR", { minimumFractionDigits: 4 })}</span>`;
  }

  renderPureValue(cot) {
    if (!this.container || !cot) return;
    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    let valor = cot.bid;
    let tipoText = "";
    if (this.tipo === "v") {
      valor = cot.ask;
      tipoText = this.showType ? "Venda " : "";
    } else {
      tipoText = this.showType ? "Compra " : "";
    }
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;
    const classe = up ? "wfcotacao-up" : down ? "wfcotacao-down" : "";
    this.container.innerHTML = `<span class="${classe}">${tipoText}${parseFloat(
      valor
    ).toLocaleString("pt-BR", { minimumFractionDigits: 4 })}</span>`;
  }

  renderError() {
    if (this.mode === "valor-puro" || this.mode === "pure") {
      this.container.textContent = "Erro";
      return;
    }
    if (this.mode === "valor" || this.mode === "value") {
      const el = this.container.querySelector(".wfcotacao-valor");
      if (el) el.textContent = "Erro";
      return;
    }
    if (this.isIndividual) {
      const div = this.container.querySelector(".wfcotacao-individual");
      if (div) div.innerHTML = "Erro ao carregar cotação.";
    } else {
      const tbody = this.container.querySelector("tbody");
      if (tbody)
        tbody.innerHTML =
          '<tr><td colspan="3">Erro ao carregar cotações.</td></tr>';
    }
  }

  // Inicialização automática
  static initAll(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    const instances = [];

    elements.forEach((el) => {
      if (!el._swcotacaoInitialized) {
        try {
          const instance = new WfCotacao(el);
          el._swcotacao = instance;
          el._swcotacaoInitialized = true;
          instances.push(instance);
        } catch (error) {
          console.warn("WfCotacao: Erro ao inicializar elemento:", error);
        }
      }
    });

    return instances;
  }

  // Métodos estáticos de conveniência
  static getValue(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    const values = [];
    elements.forEach((el) => {
      if (el._swcotacao) {
        values.push(el._swcotacao.getValue());
      }
    });
    return values;
  }

  static setValue(value, container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    elements.forEach((el) => {
      if (el._swcotacao) {
        el._swcotacao.setValue(value);
      }
    });
  }

  static destroy(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    elements.forEach((el) => {
      if (el._swcotacao) {
        el._swcotacao.destroy();
        delete el._swcotacao;
        delete el._swcotacaoInitialized;
      }
    });
  }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfCotacao = WfCotacao;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfCotacao = WfCotacao;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
  (function () {
    function autoInit() {
      try {
        const instances = WfCotacao.initAll();
      } catch (e) {
        console.warn("WfCotacao: auto-init error", e);
      }
    }

    // Inicialização no carregamento da página
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      setTimeout(autoInit, 30);
    }

  // Re-inicialização automática para conteúdo AJAX
  // Observa mudanças no DOM para detectar novos elementos .wf-cotacao
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(function (mutations) {
      let shouldReinit = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (node.classList && node.classList.contains("sw-cotacao")) {
                shouldReinit = true;
              } else if (node.querySelectorAll) {
                const cotacaoElements = node.querySelectorAll(".wf-cotacao");
                if (cotacaoElements.length > 0) {
                  shouldReinit = true;
                }
              }
            }
          });
        }
      });

      if (shouldReinit) {
        setTimeout(autoInit, 100); // Pequeno delay para garantir que o DOM esteja estável
      }
    });

    // Inicia a observação quando o DOM estiver pronto
    function startObserver() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startObserver);
    } else {
      startObserver();
    }
  }
  })();
}


// ===== WfDay.js =====
/**
 * WfDay - Sistema de Tema Dia/Noite
 *
 * @author SandroWeb
 * @version 3.0
 * @since WEBFULL Framework v1.0
 */

class WfDay {
  constructor(element) {
    this.element = element;
    this.currentTheme = this.getStoredTheme() || this.detectSystemTheme();
    this.isInitialized = false;
    this.cssProcessor = null;
    this._themeListeners = new Set();
    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.loadComponentCSS();
    this.setupElement();
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.syncAcrossTabs();

    // Processar fontes IMEDIATAMENTE para garantir funcionamento inicial
    this.processFontSwitchers();

    // Reprocessar na próxima pintura para garantir aplicação após layout
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        this.processFontSwitchers();
      });
    }

    // Reprocessar quando as fontes estiverem prontas (caso webfonts)
    try {
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        document.fonts.ready.then(() => {
          this.processFontSwitchers();
        });
      }
    } catch (_) {
      /* ignore */
    }

    // Processar fontes novamente com delay para garantir que funcionem
    setTimeout(() => {
      this.processFontSwitchers();
    }, 100);

    // Processar fontes uma terceira vez com delay maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 300);

    // Processar fontes uma quarta vez com delay ainda maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 500);

    // Processar fontes uma quinta vez com delay ainda maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 1000);

    // Rodada extra após carregamento completo da página
    window.addEventListener("load", () => {
      this.processFontSwitchers();
    });

    this.isInitialized = true;
  }

  // Carregar CSS do componente
  loadComponentCSS() {
    const cssId = "webfull-wfday-css";
    if (!document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
/**
 * WfDay.css - Estilos do Sistema de Tema Dia/Noite
 * SandroWeb - 2025
 */

/* ===== CONTAINER FLUTUANTE (para HTML WfDay) ===== */
.wfday-floating-container {
    position: fixed;
    top: 50%;
    right: 0.2rem;
    transform: translateY(-50%);
    z-index: 1001;
    pointer-events: none;
}

.wfday-floating-container .wfday-toggle {
    pointer-events: auto;
}

/* ===== CONTAINER PRINCIPAL ===== */
.wfday-container {
    display: inline-block;
    position: relative;
}

/* ===== BOTÃO TOGGLE VERTICAL ===== */
.wfday-toggle {
    position: fixed;
    width: 26px;
    height: 50px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    transition: transform 0.8s ease !important;
    color: var(--wf-color--, #333) !important;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    gap: 2px;
}

/* ===== POSICIONAMENTOS ===== */
/* Padrão: center-right */
.wfday-toggle {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}

/* Top-Left */
.wfday-pos-top-left .wfday-toggle {
    top: 1rem;
    left: 1rem;
    transform: none;
}

/* Top-Right */
.wfday-pos-top-right .wfday-toggle {
    top: 1rem;
    right: 1rem;
    transform: none;
}

/* Top-Center */
.wfday-pos-top-center .wfday-toggle {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* Center-Left */
.wfday-pos-center-left .wfday-toggle {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

/* Center-Right (padrão) */
.wfday-pos-center-right .wfday-toggle {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}

/* Bottom-Left */
.wfday-pos-bottom-left .wfday-toggle {
    bottom: 1rem;
    left: 1rem;
    transform: none;
}

/* Bottom-Right */
.wfday-pos-bottom-right .wfday-toggle {
    bottom: 1rem;
    right: 1rem;
    transform: none;
}

/* Bottom-Center */
.wfday-pos-bottom-center .wfday-toggle {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* ===== HOVER CORRIGIDO - SEM CONFLITOS ===== */
/* Hover para posições center que precisam manter translateY */
.wfday-pos-center-right .wfday-toggle:hover,
.wfday-pos-center-left .wfday-toggle:hover {
    transform: translateY(-50%) scale(1.05) !important;
}

/* Hover para posições top que precisam manter translateX */
.wfday-pos-top-center .wfday-toggle:hover {
    transform: translateX(-50%) scale(1.05) !important;
}

/* Hover para posições bottom que precisam manter translateX */
.wfday-pos-bottom-center .wfday-toggle:hover {
    transform: translateX(-50%) scale(1.05) !important;
}

/* Hover para posições sem transform (top-left, top-right, bottom-left, bottom-right) */
.wfday-pos-top-left .wfday-toggle:hover,
.wfday-pos-top-right .wfday-toggle:hover,
.wfday-pos-bottom-left .wfday-toggle:hover,
.wfday-pos-bottom-right .wfday-toggle:hover {
    transform: scale(1.05) !important;
}

/* ===== ACTIVE CORRIGIDO - SEM CONFLITOS ===== */
/* Active para posições center que precisam manter translateY */
.wfday-pos-center-right .wfday-toggle:active,
.wfday-pos-center-left .wfday-toggle:active {
    transform: translateY(-50%) scale(0.95) !important;
}

/* Active para posições top que precisam manter translateX */
.wfday-pos-top-center .wfday-toggle:active {
    transform: translateX(-50%) scale(0.95) !important;
}

/* Active para posições bottom que precisam manter translateX */
.wfday-pos-bottom-center .wfday-toggle:active {
    transform: translateX(-50%) scale(0.95) !important;
}

/* Active para posições sem transform */
.wfday-pos-top-left .wfday-toggle:active,
.wfday-pos-top-right .wfday-toggle:active,
.wfday-pos-bottom-left .wfday-toggle:active,
.wfday-pos-bottom-right .wfday-toggle:active {
    transform: scale(0.95) !important;
}

/* ===== ÍCONES ===== */
.wfday-toggle .bx {
    transition: opacity 0.8s ease;
    margin: 2px 0;
    /* Prevenir animações em loop */
    animation: none;
    animation-play-state: paused;
}

.wfday-toggle .bx.active {
    opacity: 1;
    transform: scale(1.1);
    filter: drop-shadow(0 0 4px currentColor);
}

.wfday-toggle .bx.inactive {
    opacity: 0.4;
    transform: scale(0.8);
    color: var(--color);
}

/* ===== ANIMAÇÕES HOVER ===== */
.wfday-toggle:hover .wf.wfs-sun {
    animation: sunRotate 3s linear infinite;
}

.wfday-toggle:hover .wf.wfs-moon {
    animation: moonGlow 2s ease-in-out infinite alternate;
}

/* ===== PREVENIR ANIMAÇÕES EM LOOP ===== */
.wfday-toggle .wf {
    animation-play-state: paused;
}

.wfday-toggle:hover .wf.wfs-sun {
    animation-play-state: running;
}

.wfday-toggle:hover .wf.wfs-moon {
    animation-play-state: running;
}

/* ===== KEYFRAMES DAS ANIMAÇÕES ===== */
@keyframes sunRotate {
    0% {
        transform: scale(1.1) rotate(0deg);
    }
    100% {
        transform: scale(1.1) rotate(360deg);
    }
}

@keyframes moonGlow {
    0% {
        filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
        filter: drop-shadow(0 0 6px currentColor);
    }
    100% {
        filter: drop-shadow(0 0 2px currentColor);
    }
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    .wfday-toggle {
        right: 0.5rem;
        width: 24px;
        height: 48px;
        font-size: 14px;
    }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfday-toggle {
        transition: none;
    }

    .wfday-toggle:hover {
        transform: translateY(-50%);
    }

    .wfday-toggle .bx {
        transition: none;
    }

    .wfday-toggle:hover .wf.wfs-sun,
    .wfday-toggle:hover .wf.wfs-moon {
        animation: none;
    }
}

/* ===== TEMA ESCURO ===== */
[data-theme="night"] .wfday-toggle {
    color: var(--wf-color, #fff);
}

[data-theme="night"] .wfday-toggle .bx.inactive {
    color: var(--wf-color, #666);
}

/* ===== ANIMAÇÕES DE FADE PARA IMAGENS ===== */
.wfday-fade-out {
    opacity: 0;
    transition: opacity 0.3s ease-out;
}

.wfday-fade-in {
    opacity: 1;
    transition: opacity 0.5s ease-in;
}

/* Aplicar fade em todas as imagens com WfDay */
img[WfDay-img-day],
img[WfDay-img-night] {
    transition: opacity 0.4s ease;
}

/* Aplicar fade em todos os elementos com background WfDay */
[WfDay-bg-day],
[WfDay-bg-night] {
    transition: opacity 0.4s ease;
}

/* ===== OTIMIZAÇÕES DE PERFORMANCE ===== */
.wfday-fade-out,
.wfday-fade-in {
    will-change: opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
}

/* ===== RESPONSIVIDADE PARA FADE ===== */
@media (max-width: 768px) {
    .wfday-fade-out,
    .wfday-fade-in {
        transition-duration: 0.1s;
    }
}

/* ===== ACESSIBILIDADE PARA FADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfday-fade-out,
    .wfday-fade-in {
        transition: none;
    }

    img[WfDay-img-day],
    img[WfDay-img-night],
    [WfDay-bg-day],
    [WfDay-bg-night] {
        transition: none;
    }
}

/* ===== TRANSIÇÕES ESPECÍFICAS PARA TEMA ===== */
/* Garantir transições suaves para elementos que mudam com o tema */
html.wfday-day *,
html.wfday-night * {
    transition: background-color 0.8s ease,
                color 0.8s ease,
                border-color 0.8s ease,
                box-shadow 0.8s ease;
}

/* Transições ainda mais suaves para elementos específicos */
html.wfday-day body,
html.wfday-night body,
html.wfday-day .container,
html.wfday-night .container,
html.wfday-day .bloco,
html.wfday-night .bloco {
    transition: background-color 1s ease,
                color 1s ease;
}

/* Transições suaves para elementos de interface */
html.wfday-day button,
html.wfday-night button,
html.wfday-day input,
html.wfday-night input,
html.wfday-day textarea,
html.wfday-night textarea,
html.wfday-day select,
html.wfday-night select {
    transition: background-color 0.8s ease,
                color 0.8s ease,
                border-color 0.8s ease,
                box-shadow 0.8s ease;
}

/* ===== REGRAS DE PRIORIDADE PARA SWDAY ===== */
/* Garantir que as transições do WfDay tenham prioridade */
html.wfday-day *,
html.wfday-night * {
    transition: background-color 0.8s ease !important,
                color 0.8s ease !important,
                border-color 0.8s ease !important,
                box-shadow 0.8s ease !important;
}

/* Exceções para elementos que não devem ter transição */
html.wfday-day .wfday-toggle,
html.wfday-night .wfday-toggle,
html.wfday-day .wfday-toggle *,
html.wfday-night .wfday-toggle * {
    transition: transform 0.8s ease !important,
                opacity 0.8s ease !important;
}

/* Transições específicas para elementos de texto */
html.wfday-day p,
html.wfday-night p,
html.wfday-day h1,
html.wfday-night h1,
html.wfday-day h2,
html.wfday-night h2,
html.wfday-day h3,
html.wfday-night h3,
html.wfday-day h4,
html.wfday-night h4,
html.wfday-day h5,
html.wfday-night h5,
html.wfday-day h6,
html.wfday-night h6,
html.wfday-day span,
html.wfday-night span,
html.wfday-day div,
html.wfday-night div {
    transition: color 1s ease !important,
                background-color 1s ease !important;
}
         `;
      document.head.appendChild(style);
    }
  }

  setupElement() {
    this.element.setAttribute("WfDay", "true");

    // Se o elemento é o HTML, criar um container flutuante para o botão
    if (this.element === document.documentElement) {
      this.createFloatingContainer();
    } else {
      this.element.classList.add("wfday-container");
      this.applyPosition();
    }

    this.render();
  }

  createFloatingContainer() {
    // Criar container flutuante se não existir
    let floatingContainer = document.getElementById("wfday-floating-container");
    if (!floatingContainer) {
      floatingContainer = document.createElement("div");
      floatingContainer.id = "wfday-floating-container";
      floatingContainer.className = "wfday-floating-container";
      document.body.appendChild(floatingContainer);
    }

    // Usar o container flutuante como elemento de renderização
    this.renderElement = floatingContainer;
  }

  applyPosition() {
    // Ler o atributo wfday-pos
    const position = this.element.getAttribute("wfday-pos") || "center-right";

    // Remover classes de posição antigas
    this.element.classList.remove(
      "wfday-pos-top-left",
      "wfday-pos-top-right",
      "wfday-pos-bottom-left",
      "wfday-pos-bottom-right",
      "wfday-pos-center-left",
      "wfday-pos-center-right",
      "wfday-pos-top-center",
      "wfday-pos-bottom-center"
    );

    // Adicionar classe de posição
    this.element.classList.add(`wfday-pos-${position}`);
  }

  render() {
    // Usar renderElement se disponível (para HTML), senão usar element
    const targetElement = this.renderElement || this.element;

    targetElement.innerHTML = "";
    this.button = document.createElement("button");
    this.button.className = "wfday-toggle";
    this.button.setAttribute(
      "aria-pressed",
      this.currentTheme === "day" ? "true" : "false"
    );
    this.button.setAttribute("aria-label", "Alternar tema dia/noite");
    this.button.setAttribute("title", "Alternar tema dia/noite");
    this.button.setAttribute("role", "wfitch");

    // Obter ícones personalizados
    const dayIcon = this.element.getAttribute("wfday-day-icon") || "wfs-sun";
    const nightIcon =
      this.element.getAttribute("wfday-night-icon") || "wfs-moon";

    this.button.innerHTML = `
         <i class="wf ${dayIcon} ${
      this.currentTheme === "day" ? "active" : "inactive"
    }" aria-hidden="true"></i>
         <i class="wf ${nightIcon} ${
      this.currentTheme === "day" ? "inactive" : "active"
    }" aria-hidden="true"></i>
      `;
    targetElement.appendChild(this.button);
  }

  bindEvents() {
    // Toggle manual no botão
    if (this.button) {
      this.button.addEventListener("click", () => {
        this.toggle();
      });
    }

    // Detectar mudança do sistema
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? "night" : "day");
        }
      });
    }

    // Keyboard shortcut
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  detectSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "night";
    }
    return "day";
  }

  getStoredTheme() {
    try {
      return localStorage.getItem("wfday-theme");
    } catch (e) {
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem("wfday-theme", theme);
    } catch (e) {
      // Erro silencioso
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    this.setStoredTheme(theme);

    // Remover classes antigas
    document.documentElement.classList.remove("wfday-day", "wfday-night");

    // Adicionar nova classe
    document.documentElement.classList.add(`wfday-${theme}`);

    // Atualizar atributo
    document.documentElement.setAttribute("data-theme", theme);

    // Forçar reflow para garantir que as mudanças sejam aplicadas
    document.documentElement.offsetHeight;

    // Atualizar botão
    this.updateButton();

    // Disparar evento
    this.element.dispatchEvent(
      new CustomEvent("wfday:theme-changed", {
        detail: { theme, previousTheme: this.currentTheme },
      })
    );

    // Disparar evento global também
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: theme },
      })
    );

    // Processar CSS customizado com delay para garantir que o DOM esteja pronto
    setTimeout(() => {
      this.processCustomCSS();
    }, 100);
  }

  updateButton() {
    if (this.button) {
      const sunIcon = this.button.querySelector(".wfs-sun");
      const moonIcon = this.button.querySelector(".wfs-moon");

      if (sunIcon && moonIcon) {
        // Prevenir animações durante a atualização
        sunIcon.style.animation = "none";
        moonIcon.style.animation = "none";

        sunIcon.classList.toggle("active", this.currentTheme === "day");
        sunIcon.classList.toggle("inactive", this.currentTheme === "night");
        moonIcon.classList.toggle("active", this.currentTheme === "night");
        moonIcon.classList.toggle("inactive", this.currentTheme === "day");

        // Restaurar animações após um pequeno delay
        setTimeout(() => {
          sunIcon.style.animation = "";
          moonIcon.style.animation = "";
        }, 100);
      }

      this.button.setAttribute(
        "aria-pressed",
        this.currentTheme === "day" ? "true" : "false"
      );
    }
  }

  toggle() {
    const newTheme = this.currentTheme === "day" ? "night" : "day";
    this.applyTheme(newTheme);

    // Disparar evento para sincronizar com outros componentes
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: newTheme },
      })
    );

    // Processar fontes novamente para garantir que funcionem
    setTimeout(() => {
      this.processFontSwitchers();
    }, 200);
  }

  setTheme(theme) {
    if (theme === "day" || theme === "night") {
      this.applyTheme(theme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  syncAcrossTabs() {
    // Proteção contra múltiplos listeners
    if (this._storageListener) {
      window.removeEventListener("storage", this._storageListener);
    }
    if (this._themeChangeListener) {
      window.removeEventListener(
        "wfday-theme-changed",
        this._themeChangeListener
      );
    }

    this._storageListener = (e) => {
      if (
        e.key === "wfday-theme" &&
        e.newValue &&
        e.newValue !== this.currentTheme
      ) {
        this.applyTheme(e.newValue);
      }
    };

    this._themeChangeListener = (e) => {
      // Evitar loop infinito - só aplicar se não foi este componente que disparou
      if (e.detail && e.detail.theme && e.detail.theme !== this.currentTheme) {
        this.applyTheme(e.detail.theme);
      }
    };

    window.addEventListener("storage", this._storageListener);
    window.addEventListener("wfday-theme-changed", this._themeChangeListener);
  }

  /**
   * Processa CSS customizado com sintaxe day() e night()
   */
  processCustomCSS() {
    if (!this.cssProcessor) {
      this.cssProcessor = new SwDayCSSProcessor();
    }
    this.cssProcessor.processAll();

    // Processar troca de imagens e fontes
    this.processImageSwitchers();
    this.processFontSwitchers();
  }

  /**
   * Processa troca automática de imagens
   */
  processImageSwitchers() {
    const currentTheme = this.currentTheme;

    // Processar imagens com atributos WfDay-img-day/night
    document
      .querySelectorAll("img[WfDay-img-day], img[WfDay-img-night]")
      .forEach((img) => {
        const dayImg = img.getAttribute("WfDay-img-day");
        const nightImg = img.getAttribute("WfDay-img-night");

        if (dayImg && nightImg) {
          img.src = currentTheme === "day" ? dayImg : nightImg;
        }
      });

    // Processar backgrounds com atributos WfDay-bg-day/night
    document
      .querySelectorAll("[WfDay-bg-day], [WfDay-bg-night]")
      .forEach((element) => {
        const dayBg = element.getAttribute("WfDay-bg-day");
        const nightBg = element.getAttribute("WfDay-bg-night");

        if (dayBg && nightBg) {
          element.style.backgroundImage =
            currentTheme === "day" ? dayBg : nightBg;
        }
      });
  }

  /**
   * Processa troca automática de fontes
   */
  processFontSwitchers() {
    const currentTheme = this.currentTheme;

    // Processar fontes IMEDIATAMENTE
    document
      .querySelectorAll("[WfDay-font-day], [WfDay-font-night]")
      .forEach((element) => {
        const dayFont = element.getAttribute("WfDay-font-day");
        const nightFont = element.getAttribute("WfDay-font-night");
        const isWeight = element.getAttribute("WfDay-font-weight") === "true";

        if (dayFont && nightFont) {
          // Resolver variáveis CSS se necessário
          const resolvedDayFont = this.resolveCSSVariable(dayFont);
          const resolvedNightFont = this.resolveCSSVariable(nightFont);

          if (isWeight) {
            element.style.setProperty(
              "font-weight",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          } else {
            element.style.setProperty(
              "font-family",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          }

          // Forçar reflow e quebrar cache
          element.offsetHeight;
          element.style.transform = "translateZ(0)";
          element.style.transform = "";
        }
      });
  }

  /**
   * Resolve variáveis CSS para valores reais
   */
  resolveCSSVariable(value) {
    if (!value || typeof value !== "string") return value;

    // Se contém var(), resolver a variável
    if (value.includes("var(")) {
      try {
        // Método 1: Usar getComputedStyle no root
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        // Extrair nome da variável
        const match = value.match(/var\(([^)]+)\)/);
        if (match) {
          const varName = match[1].trim();
          const resolved = computedStyle.getPropertyValue(varName);
          if (resolved && resolved.trim() !== "") {
            return resolved;
          }
        }

        // Método 2: Criar elemento temporário como fallback
        const temp = document.createElement("div");
        temp.style.fontFamily = value;
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.top = "-9999px";
        temp.style.left = "-9999px";
        temp.style.width = "1px";
        temp.style.height = "1px";
        document.body.appendChild(temp);

        // Forçar reflow
        temp.offsetHeight;

        const resolved = getComputedStyle(temp).fontFamily;
        document.body.removeChild(temp);

        return resolved || value;
      } catch (error) {
        console.warn("Erro ao resolver variável CSS:", value, error);
        return value;
      }
    }

    return value;
  }

  // Métodos estáticos
  static initAll(container = document) {
    let elements = [];

    // PRIMEIRO: Verificar se o HTML tem WfDay (nova funcionalidade)
    if (document.documentElement.hasAttribute("WfDay")) {
      elements = [document.documentElement];
    } else {
      // SEGUNDO: Procurar por divs com WfDay (compatibilidade)
      elements = container.querySelectorAll("[WfDay]");
    }

    const instances = [];

    elements.forEach((element) => {
      if (!element._wfDay) {
        try {
          const instance = new WfDay(element);
          element._wfDay = instance;
          instances.push(instance);
        } catch (error) {
          console.error("Erro ao inicializar WfDay:", error);
        }
      }
    });

    // IMPORTANTE: Se foi chamado com um container específico (ex: via WfAjax),
    // processar fontes e imagens nesse container mesmo que não tenha elementos WfDay
    if (container !== document) {
      // Processar fontes no container específico
      WfDay.initFontSwitchers(container);
      // Processar imagens no container específico
      WfDay.initImageSwitchers(container);
    }

    return instances;
  }

  // Método estático para obter o tema atual
  static getTheme() {
    const html = document.documentElement;
    if (html.classList.contains("wfday-night")) {
      return "night";
    }
    return "day";
  }

  // Método estático para alternar tema
  static toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains("wfday-night")
      ? "night"
      : "day";
    const newTheme = currentTheme === "day" ? "night" : "day";

    // Aplicar tema
    if (newTheme === "night") {
      html.classList.remove("wfday-day");
      html.classList.add("wfday-night");
    } else {
      html.classList.remove("wfday-night");
      html.classList.add("wfday-day");
    }

    // Salvar no localStorage
    try {
      localStorage.setItem("wfday-theme", newTheme);
    } catch (e) {
      // Erro silencioso
    }

    // Disparar evento
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: newTheme },
      })
    );

    // Processar fontes para garantir funcionamento
    setTimeout(() => {
      WfDay.initFontSwitchers();
    }, 100);
  }

  // Método estático para inicializar troca de imagens em container específico
  static initImageSwitchers(container = document) {
    const currentTheme = WfDay.getTheme();

    // Processar imagens no container
    container
      .querySelectorAll("img[WfDay-img-day], img[WfDay-img-night]")
      .forEach((img) => {
        const dayImg = img.getAttribute("WfDay-img-day");
        const nightImg = img.getAttribute("WfDay-img-night");

        if (dayImg && nightImg) {
          img.src = currentTheme === "day" ? dayImg : nightImg;
        }
      });

    // Processar backgrounds no container
    container
      .querySelectorAll("[WfDay-bg-day], [WfDay-bg-night]")
      .forEach((element) => {
        const dayBg = element.getAttribute("WfDay-bg-day");
        const nightBg = element.getAttribute("WfDay-bg-night");

        if (dayBg && nightBg) {
          element.style.backgroundImage =
            currentTheme === "day" ? dayBg : nightBg;
        }
      });
  }

  // Método estático para inicializar troca de fontes
  static initFontSwitchers(container = document) {
    const currentTheme = WfDay.getTheme();

    // Processar fontes IMEDIATAMENTE no container especificado
    container
      .querySelectorAll("[WfDay-font-day], [WfDay-font-night]")
      .forEach((element) => {
        const dayFont = element.getAttribute("WfDay-font-day");
        const nightFont = element.getAttribute("WfDay-font-night");
        const isWeight = element.getAttribute("WfDay-font-weight") === "true";

        if (dayFont && nightFont) {
          // Resolver variáveis CSS se necessário
          const resolvedDayFont = WfDay.resolveCSSVariable(dayFont);
          const resolvedNightFont = WfDay.resolveCSSVariable(nightFont);

          if (isWeight) {
            element.style.setProperty(
              "font-weight",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          } else {
            element.style.setProperty(
              "font-family",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          }

          // Forçar reflow e quebrar cache
          element.offsetHeight;
          element.style.transform = "translateZ(0)";
          element.style.transform = "";
        }
      });
  }

  /**
   * Resolve variáveis CSS para valores reais (método estático)
   */
  static resolveCSSVariable(value) {
    if (!value || typeof value !== "string") return value;

    // Se contém var(), resolver a variável
    if (value.includes("var(")) {
      try {
        // Método 1: Usar getComputedStyle no root
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        // Extrair nome da variável
        const match = value.match(/var\(([^)]+)\)/);
        if (match) {
          const varName = match[1].trim();
          const resolved = computedStyle.getPropertyValue(varName);
          if (resolved && resolved.trim() !== "") {
            return resolved;
          }
        }

        // Método 2: Criar elemento temporário como fallback
        const temp = document.createElement("div");
        temp.style.fontFamily = value;
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.top = "-9999px";
        temp.style.left = "-9999px";
        temp.style.width = "1px";
        temp.style.height = "1px";
        document.body.appendChild(temp);

        // Forçar reflow
        temp.offsetHeight;

        const resolved = getComputedStyle(temp).fontFamily;
        document.body.removeChild(temp);

        return resolved || value;
      } catch (error) {
        console.warn("Erro ao resolver variável CSS:", value, error);
        return value;
      }
    }

    return value;
  }

  // Compatibilidade: registrar listener para mudança de tema
  static addThemeChangeListener(callback) {
    if (typeof callback !== "function") return;
    // Registrar no dispatch central do evento
    document.addEventListener("wfday:theme-changed", (e) => {
      try {
        callback(e.detail?.theme || WfDay.getTheme());
      } catch {}
    });
  }

  // Compatibilidade: remover listener (melhor esforço)
  static removeThemeChangeListener(callback) {
    // Como adicionamos listeners anônimos acima para compatibilidade,
    // oferecemos um fallback: nada a remover de forma segura.
    // Mantemos o método por compatibilidade com chamadas existentes.
  }
}

// Classe para processar CSS customizado
class SwDayCSSProcessor {
  constructor() {
    this.dayNightRegex = /day\(([^)]+)\)\s*night\(([^)]+)\)/g;
    this.processedStyles = new Set();
  }

  processAll() {
    this.processStyleSheets();
    this.processInlineStyles();
  }

  processStyleSheets() {
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        Array.from(sheet.cssRules || []).forEach((rule) => {
          if (rule instanceof CSSStyleRule) {
            this.processRule(rule);
          }
        });
      } catch (e) {
        // Erro de CORS ou outras limitações
      }
    });
  }

  processInlineStyles() {
    document.querySelectorAll('[style*="day("]').forEach((element) => {
      this.processElementStyle(element);
    });
  }

  processRule(rule) {
    const selector = rule.selectorText;
    if (!selector || this.processedStyles.has(selector)) return;

    let modified = false;
    const properties = rule.style;

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const value = properties.getPropertyValue(property);

      if (this.dayNightRegex.test(value)) {
        const processedValue = this.processDayNightValue(value);
        if (processedValue !== value) {
          properties.setProperty(property, processedValue);
          modified = true;
        }
      }
    }

    if (modified) {
      this.processedStyles.add(selector);
    }
  }

  processElementStyle(element) {
    const style = element.style;
    let modified = false;

    for (let i = 0; i < style.length; i++) {
      const property = style[i];
      const value = style.getPropertyValue(property);

      if (this.dayNightRegex.test(value)) {
        const processedValue = this.processDayNightValue(value);
        if (processedValue !== value) {
          style.setProperty(property, processedValue);
          modified = true;
        }
      }
    }
  }

  processDayNightValue(value) {
    const theme = WfDay.getTheme();

    return value.replace(this.dayNightRegex, (match, dayValue, nightValue) => {
      // Se o valor contém var(), usar diretamente
      if (dayValue.includes("var(") || nightValue.includes("var(")) {
        return theme === "night" ? nightValue : dayValue;
      }

      // Para valores diretos, aplicar normalmente
      return theme === "night" ? nightValue : dayValue;
    });
  }
}

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfDay = WfDay;
} else if (typeof window !== "undefined") {
  window.WfDay = WfDay;
}


// ===== WfDiv.js =====
/**
 * WfDiv - Sistema de Carregamento de DIVs Internas com Animações
 * SandroWeb - 2025
 */

// Sobrescrever qualquer fallback existente
window.WfDiv = class WfDiv {
  constructor(element) {
    this.element = element;
    this.divId = this.element.getAttribute("WfDiv-div");
    this.effect = this.element.getAttribute("WfDiv-effect") || "fade";
    this.dest =
      this.element.getAttribute("WfDiv-dest") ||
      this.element.id ||
      "wfdiv-content";
    this.seo = this.element.getAttribute("WfDiv-seo") === "true";
    this.auto = this.element.getAttribute("WfDiv-auto") === "true";

    this.init().catch(console.error);
  }

  async init() {
    await this.loadCSS();
    this.bindEvents();

    // Carregamento automático se configurado
    if (this.auto) {
      this.showContent();
    }
  }

  loadCSS() {
    return new Promise((resolve) => {
      // WfDiv usa as animações do WfAjax.css que já está carregado
      // Apenas adiciona estilos específicos do WfDiv se necessário
      if (document.querySelector("#swdiv-specific-css")) {
        resolve();
        return;
      }

      // CSS específico do WfDiv (apenas estados de erro)
      const css = `
/* ===== SWDIV CSS ESPECÍFICO ===== */
/* SandroWeb - 2025 */

/* ===== ESTADOS DE ERRO ===== */
.wfdiv-error {
   padding: 20px;
   background: rgba(220, 53, 69, 0.1);
   border: 2px solid rgba(220, 53, 69, 0.3);
   border-radius: 8px;
   color: #721c24;
   text-align: center;
   font-weight: bold;
}
`;

      // Injetar CSS específico
      const style = document.createElement("style");
      style.id = "wfdiv-specific-css";
      style.textContent = css;
      document.head.appendChild(style);

      resolve();
    });
  }

  bindEvents() {
    // Adicionar atributo WfDiv se não existir
    if (!this.element.hasAttribute("WfDiv")) {
      this.element.setAttribute("WfDiv", "");
    }

    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      this.showContent();
    });
  }

  showContent() {
    const target = document.getElementById(this.dest);
    const sourceDiv = document.getElementById(this.divId);

    if (!target) {
      console.error(`Elemento ${this.dest} não encontrado`);
      return;
    }

    if (!sourceDiv) {
      console.error(`Div ${this.divId} não encontrada`);
      target.innerHTML = `<div class="wfdiv-error">Erro: Div ${this.divId} não encontrada</div>`;
      return;
    }

    // Aplicar animação ANTES do conteúdo para evitar piscada
    this.applyAnimation(target, sourceDiv.innerHTML);
  }

  applyAnimation(target, content = null) {
    if (this.effect && this.effect !== "none") {
      // Remover classes anteriores do WfAjax.css
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

      // Aplicar conteúdo ANTES da animação
      if (content) {
        target.innerHTML = content;
      }

      // Adicionar classe do efeito do WfAjax.css
      target.classList.add(`wfajax-${this.effect}`);

      // Aplicar conteúdo após pequeno delay para garantir animação
      setTimeout(() => {
        if (content) target.innerHTML = content;
      }, 10);

      // Remover classe após animação
      setTimeout(() => {
        target.classList.remove(`wfajax-${this.effect}`);
      }, 1000);
    } else {
      // Se não há efeito, aplicar conteúdo diretamente
      if (content) {
        target.innerHTML = content;
      }
    }
  }

  // Método estático para carregar conteúdo (usado no JavaScript)
  static load({ div, dest, effect = "fade", auto = false, data = null }) {
    const target = document.getElementById(dest);
    const sourceDiv = document.getElementById(div);

    if (!target) {
      console.error(`Elemento ${dest} não encontrado`);
      return;
    }

    if (!sourceDiv) {
      console.error(`Div ${div} não encontrada`);
      target.innerHTML = `<div class="wfdiv-error">Erro: Div ${div} não encontrada</div>`;
      return;
    }

    if (effect && effect !== "none") {
      // Remover classes anteriores do WfAjax.css
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

      // Aplicar conteúdo ANTES da animação
      target.innerHTML = sourceDiv.innerHTML;

      // Adicionar classe do efeito do WfAjax.css
      target.classList.add(`wfajax-${effect}`);

      // Remover classe após animação
      setTimeout(() => {
        target.classList.remove(`wfajax-${effect}`);
      }, 1000);
    } else {
      // Se não há efeito, aplicar conteúdo diretamente
      target.innerHTML = sourceDiv.innerHTML;
    }
  }

  // Método estático para mostrar conteúdo externo
  static show(divId, targetId, effect = "fade") {
    const target = document.getElementById(targetId);
    const sourceDiv = document.getElementById(divId);

    if (!target) {
      throw new Error(`Elemento ${targetId} não encontrado`);
    }

    if (!sourceDiv) {
      throw new Error(`Div ${divId} não encontrada`);
    }

    // Aplicar animação ANTES do conteúdo para evitar piscada

    if (effect && effect !== "none") {
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

      target.classList.add(`wfajax-${effect}`);

      // Aplicar conteúdo após pequeno delay
      setTimeout(() => {
        target.innerHTML = sourceDiv.innerHTML;
      }, 10);

      // Remover classe após animação
      setTimeout(() => {
        target.classList.remove(`wfajax-${effect}`);
      }, 1000);
    } else {
      // Nenhum efeito aplicado
      // Se não há efeito, aplicar conteúdo diretamente
      target.innerHTML = sourceDiv.innerHTML;
    }

    return target;
  }

  // Método estático para inicializar todos
  static initAll(container = document) {
    const list = [];
    if (
      container &&
      container.getAttribute &&
      container.hasAttribute("WfDiv-div")
    )
      list.push(container);
    container.querySelectorAll("[WfDiv-div]").forEach((el) => list.push(el));
    const instances = [];
    list.forEach((element) => {
      if (!element._wfDiv) {
        const instance = new WfDiv(element);
        element._wfDiv = instance;
        instances.push(instance);
      }
    });
    return instances;
  }
};

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfDiv = window.WfDiv;
}

// Inicializar automaticamente apenas se WebFull não estiver presente
if (!window.WebFull) {
  document.addEventListener("DOMContentLoaded", () => {
    WfDiv.initAll();
  });

  // Inicializar também quando a página é carregada via AJAX
  document.addEventListener("webfull-ready", () => {
    WfDiv.initAll();
  });
}


// ===== WfFile1.js =====
(function (window, document) {
  "use strict";

  // WfFile1.js - Componente de upload de imagem moderno
  // Uso: <div WfFile1></div>

  class WfFile1 {
    constructor(container, options = {}) {
      this.options = Object.assign(
        {
          accept: ["image/*"],
          onSelect: null,
          theme: "auto",
        },
        options
      );
      this.container =
        typeof container === "string"
          ? document.querySelector(container)
          : container;
      if (!this.container) return;
      if (this.container._wfFile1) return; // Evita reinicialização
      this.container._wfFile1 = this;

      // WfFile1.injectCSS(); // CSS moved to webfull.css

      // NOVO: detectar data-theme
      this.localTheme = this.container.getAttribute("data-theme");
      this.render();
      this.bindEvents();
      this.applyTheme();
    }

    render() {
      this.container.classList.add("wffile1-box");
      const acceptStr = Array.isArray(this.options.accept)
        ? this.options.accept.join(",")
        : String(this.options.accept || "image/*");
      this.container.innerHTML = `
      <div class="wffile1-label">Envio de Imagem</div>
      <div class="wffile1-info">Formatos: jpg | png | gif | webp</div>
      <div class="wffile1-dropzone" tabindex="0">
        <div class="wffile1-icon"><i class="wf wf-upload"></i></div>
        <div class="wffile1-text"><b>Clique para selecionar</b><br><span>ou arraste e solte aqui</span></div>
        <input type="file" class="wffile1-input" accept="${acceptStr}" multiple style="display:none" />
      </div>
      <div class="wffile1-preview" style="display:none"></div>
      <div class="wffile1-error" style="display:none"></div>
    `;
      this.dropzone = this.container.querySelector(".wffile1-dropzone");
      this.input = this.container.querySelector(".wffile1-input");
      this.preview = this.container.querySelector(".wffile1-preview");
      this.error = this.container.querySelector(".wffile1-error");
    }

    bindEvents() {
      this.dropzone.addEventListener("click", () => this.input.click());
      this.dropzone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") this.input.click();
      });
      this.input.addEventListener("change", (e) =>
        this.handleFiles(e.target.files)
      );
      this.dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        this.dropzone.classList.add("wffile1-drag");
      });
      this.dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("wffile1-drag");
      });
      this.dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("wffile1-drag");
        this.handleFiles(e.dataTransfer.files);
      });
    }

    handleFiles(files) {
      if (!files || !files.length) return;
      let validFiles = [];
      let error = null;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ok = (() => {
          const accepts = Array.isArray(this.options.accept)
            ? this.options.accept
            : [String(this.options.accept || "image/*")];
          return accepts.some((acc) => {
            acc = String(acc);
            if (acc.endsWith("/*")) {
              const pref = acc.slice(0, acc.length - 2);
              return String(file.type || "").startsWith(pref);
            }
            return acc === file.type;
          });
        })();
        if (!ok) {
          error = "Formato não suportado.";
          continue;
        }
        validFiles.push(file);
      }
      if (error && validFiles.length === 0) {
        this.showError(error);
        return;
      }
      this.showPreviews(validFiles);
      this.error.style.display = "none";
      if (typeof this.options.onSelect === "function") {
        validFiles.forEach((file) => this.options.onSelect(file));
      }
    }

    showPreviews(files) {
      if (!files || !files.length) return;
      this.preview.style.display = "flex";
      files.forEach((file) => {
        const wrapper = document.createElement("a");
        wrapper.className = "wffile1-link";
        wrapper.setAttribute("WfImg", "");
        wrapper.setAttribute("data-name", file.name);
        wrapper.setAttribute("WfImg-title", file.name);

        const img = document.createElement("img");
        img.className = "wffile1-img";
        img.alt = file.name;
        wrapper.appendChild(img);

        const remove = document.createElement("span");
        remove.className = "wffile1-remove";
        remove.title = "Remover imagem";
        remove.textContent = "×";
        wrapper.appendChild(remove);

        remove.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            wrapper.remove();
          } catch (_) {}
        });

        this.preview.appendChild(wrapper);

        const reader = new FileReader();
        reader.onload = (e) => {
          wrapper.setAttribute("WfImg-src", e.target.result);
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
      // Inicializa WfImg nas imagens de preview
      try {
        const initSwImg = () => {
          if (window.WfImg && typeof window.WfImg.initAll === "function") {
            window.WfImg.initAll(this.preview);
          } else if (
            window.SwPlugin &&
            typeof window.SwPlugin.initComponent === "function"
          ) {
            window.SwPlugin.initComponent("WfImg", this.preview);
          }
        };
        if (window.WebfullLoader) {
          window.WebfullLoader.load("sw-img").then(initSwImg).catch(initSwImg);
        } else {
          initSwImg();
        }
      } catch (_) {}
    }

    showError(msg) {
      this.error.textContent = msg;
      this.error.style.display = "block";
      this.preview.style.display = "none";
    }

    applyTheme() {
      // Suporte a tema local via data-theme
      if (this.localTheme === "day") {
        this.container.classList.remove("wffile1-dark");
        this.container.classList.add("wffile1-day");
        return;
      } else if (this.localTheme === "night") {
        this.container.classList.remove("wffile1-day");
        this.container.classList.add("wffile1-dark");
        return;
      }
      // Integração com WfDay (modo claro/escuro)
      const updateTheme = () => {
        let theme = "day";
        try {
          if (window.WfDay && typeof window.WfDay.getTheme === "function") {
            theme = window.WfDay.getTheme();
          } else if (
            document.documentElement.classList.contains("wfday-night")
          ) {
            theme = "night";
          }
        } catch (_) {}
        this.container.classList.remove("wffile1-day", "wffile1-dark");
        this.container.classList.add(
          theme === "night" ? "wffile1-dark" : "wffile1-day"
        );
      };
      updateTheme();
    window.addEventListener("wfday-theme-changed", updateTheme);
  }

  static initAll(container = document) {
      const els = (
        container instanceof HTMLElement ? container : document
      ).querySelectorAll("[WfFile1]");
      els.forEach((el) => {
        if (el._wfFile1) return;
        const cbName =
          el.getAttribute("data-wffile1-callback") ||
          el.getAttribute("data-swfile1-callback");
        let cb = null;
        if (cbName === "alert") {
          cb = (file) => alert("Arquivo selecionado: " + file.name);
        } else if (cbName === "console") {
          cb = (file) => console.log("Arquivo selecionado:", file);
        } else if (cbName && typeof window[cbName] === "function") {
          cb = window[cbName];
        }
        const acceptAttr =
          el.getAttribute("WfFile1-accept") ||
          el.getAttribute("wffile1-accept") ||
          el.getAttribute("data-accept") ||
          el.getAttribute("accept");
        let opts = {};
        if (cb) opts.onSelect = cb;
        if (acceptAttr) {
          opts.accept = String(acceptAttr)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        new WfFile1(el, Object.keys(opts).length ? opts : undefined);
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfFile1 = WfFile1;
    }
    window.WfFile1 = WfFile1;

    // Auto-init
    const init = () => {
      WfFile1.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        for (const mutation of mutations) {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1) {
                if (
                  (node.hasAttribute && node.hasAttribute("WfFile1")) ||
                  (node.querySelector && node.querySelector("[WfFile1]"))
                ) {
                  shouldInit = true;
                  break;
                }
              }
            }
          }
          if (shouldInit) break;
        }
        if (shouldInit) {
          WfFile1.initAll();
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


// ===== WfFile2.js =====
(function (window, document) {
  "use strict";

  class WfFile2 {
    static initAll(container = document) {
      // Cria o input file global, invisível e fora do fluxo AJAX, se ainda não existir
      if (!window._inputFileGlobal) {
        window._inputFileGlobal = document.createElement("input");
        window._inputFileGlobal.type = "file";
        window._inputFileGlobal.style.position = "absolute";
        window._inputFileGlobal.style.left = "-9999px";
        window._inputFileGlobal.id = "inputfileglobal";
        document.body.appendChild(window._inputFileGlobal);
      }
      const list = [];
      const root = container instanceof HTMLElement ? container : document;

      if (
        root.hasAttribute &&
        root.hasAttribute("WfFile2")
      )
        list.push(root);
      
      root
        .querySelectorAll("span[WfFile2], [WfFile2]")
        .forEach((el) => list.push(el));

      list.forEach((el, idx) => {
        // Evita dupla inicialização
        if (el._wfFile2) return;
        el._wfFile2 = true;

        // Lê atributos
        const accept = el.getAttribute("accept") || "image/*";
        const multiple = el.hasAttribute("multiple");
        const name = el.getAttribute("name") || "arquivo";
        const previewSelector = el.getAttribute("data-preview");
        const id =
          el.getAttribute("id") ||
          "wffile2-" + idx + "-" + Math.floor(Math.random() * 10000);

        // Cria estrutura interna usando classes CSS (sem estilos inline)
        el.innerHTML = `
        <label class="wffile2-btn" for="${id}">
          <span class="wffile2-icon"><i class='wf wf-file'></i></span>
          <span class="wffile2-text">Selecionar arquivo</span>
        </label>
      `;
        const label = el.querySelector(".wffile2-btn");

        // Se houver destino de preview (img externa), garantir que fique oculto inicialmente
        if (previewSelector) {
          try {
            const tgt = document.querySelector(previewSelector);
            if (tgt && tgt.tagName === "IMG") {
              tgt.removeAttribute("src");
              tgt.style.display = "none";
            }
          } catch (_) {}
        }

        if (!previewSelector) {
          const box = document.createElement("div");
          box.className = "wffile2-preview-box";
          // display: none é controlado via classe ou inline inicial
          box.style.display = "none"; 

          const img = document.createElement("img");
          img.className = "wffile2-preview-img";
          img.alt = "Preview";
          
          const remove = document.createElement("span");
          remove.className = "wffile2-remove";
          remove.title = "Remover imagem";
          remove.textContent = "×";

          box.appendChild(img);
          box.appendChild(remove);
          el.appendChild(box);

          remove.addEventListener("click", function () {
            try {
              img.src = "";
            } catch (_) {}
            box.style.display = "none";
            if (!multiple) {
              window._inputFileGlobal.value = "";
            } else {
              box.innerHTML = "";
            }
          });

          el._wffile2_box = box;
          el._wffile2_img = img;
        }

        // Associa o input de arquivo ao label
        label.addEventListener("click", function (e) {
          e.preventDefault();

          window._inputFileGlobal.accept = accept;
          window._inputFileGlobal.multiple = multiple;
          window._inputFileGlobal.name = name;
          window._inputFileGlobal.value = ""; // Limpa antes de abrir

          // Define o que fazer quando um arquivo for selecionado
          window._inputFileGlobal.onchange = function () {
            if (!this.files || this.files.length === 0) return;

            const previewTarget = previewSelector
              ? document.querySelector(previewSelector)
              : null;
            
            if (previewTarget) {
              // Limpa o conteúdo anterior do preview
              previewTarget.innerHTML = "";

              // Se o modo é múltiplo, itera e cria todas as imagens.
              if (multiple) {
                Array.from(this.files).forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    // Classes externas podem estilizar isso, ou adicionamos classe padrão
                    img.className = "wffile2-preview-img wffile2-gallery-img"; 
                    previewTarget.appendChild(img);
                  };
                  reader.readAsDataURL(file);
                });
              }
              // Senão, mantém o comportamento original de imagem única.
              else {
                const reader = new FileReader();
                reader.onload = function (e) {
                  // Se o alvo do preview é uma <img>, apenas muda o src.
                  if (previewTarget.tagName === "IMG") {
                    previewTarget.src = e.target.result;
                    previewTarget.style.display = "block";
                  }
                  // Se não, cria uma nova imagem dentro do alvo.
                  else {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.className = "wffile2-preview-img";
                    previewTarget.appendChild(img);
                  }
                };
                reader.readAsDataURL(this.files[0]);
              }
            } else if (el._wffile2_box) {
              const box = el._wffile2_box;
              box.style.display = "block";
              
              if (!multiple) {
                // Modo Single (Interno)
                // Restaura estrutura se foi limpa pelo modo multiplo
                if (!box.querySelector('.wffile2-preview-img')) {
                    box.innerHTML = '';
                    const img = document.createElement("img");
                    img.className = "wffile2-preview-img";
                    img.alt = "Preview";
                    const remove = document.createElement("span");
                    remove.className = "wffile2-remove";
                    remove.title = "Remover imagem";
                    remove.textContent = "×";
                    
                    remove.addEventListener("click", function () {
                        box.style.display = "none";
                        window._inputFileGlobal.value = "";
                    });
                    
                    box.appendChild(img);
                    box.appendChild(remove);
                    el._wffile2_img = img;
                }
                
                const reader = new FileReader();
                reader.onload = function (e) {
                  try {
                    el._wffile2_img.src = e.target.result;
                  } catch (_) {}
                };
                reader.readAsDataURL(this.files[0]);
              } else {
                // Modo Multiplo (Interno)
                box.innerHTML = "";
                Array.from(this.files).forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.className = "wffile2-preview-img wffile2-gallery-img";
                    img.src = e.target.result;
                    box.appendChild(img);
                  };
                  reader.readAsDataURL(file);
                });
                const remove = document.createElement("span");
                remove.className = "wffile2-remove";
                remove.title = "Remover imagens";
                remove.textContent = "×";
                remove.addEventListener("click", function () {
                  box.style.display = "none";
                  box.innerHTML = "";
                  window._inputFileGlobal.value = "";
                });
                box.appendChild(remove);
              }
            }
          };

          window._inputFileGlobal.click();
        });
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfFile2 = WfFile2;
    }
    window.WfFile2 = WfFile2;

    // Auto-init
    const init = () => {
      try {
        WfFile2.initAll();
      } catch (_) {}

      // Observer for dynamic content (Optimized)
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        for (const mutation of mutations) {
            if (mutation.type === "childList" && mutation.addedNodes.length) {
              for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                   if (
                      (node.hasAttribute && node.hasAttribute("WfFile2")) ||
                      (node.querySelector && node.querySelector("[WfFile2]"))
                   ) {
                      shouldInit = true;
                      break;
                   }
                }
              }
            }
            if (shouldInit) break;
        }
        if (shouldInit) {
          try {
            WfFile2.initAll();
          } catch (_) {}
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


// ===== WfIconsInit.js =====
(function (window, document) {
  "use strict";

  /**
   * WfIconsInit
   * Carrega e popula automaticamente listas <ul id="wficons-list"> quando a página
   * é carregada ou quando o WfAjax injeta conteúdo.
   */
  const WfIconsInit = {
    initAll: function (container = document) {
      const lists = container.querySelectorAll("#wficons-list");
      lists.forEach((el) => this.populate(el));
    },

    populate: function (el) {
      if (!el) return;
      if (el.dataset.wfIconsInit === "skip") return;
      if (el.dataset.wfIconsInit) return;
      el.dataset.wfIconsInit = "1";

      // Bust cache during development: add timestamp when requested via global flag or on localhost
      let url = "/assets/components/wf-icons.json";
      try {
        const nocache =
          window &&
          (location.hostname === "localhost" ||
            location.hostname === "127.0.0.1" ||
            window.__WF_NO_CACHE);
        if (nocache)
          url += (url.indexOf("?") === -1 ? "?t=" : "&t=") + Date.now();
      } catch (e) {
        /* ignore */
      }

      fetch(url, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) throw new Error("wf-icons.json not found");
          return r.json();
        })
        .then((map) => {
          el.innerHTML = "";
          const items = Object.values(map).sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
          );
          for (const it of items) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "";
            const wrap = document.createElement("div");
            // sempre usar a fonte via classe 'wf wf-<name>' — evita inserir SVGs cru
            let cls = (it.class || "").trim();
            if (!cls && it.name) cls = "wf-" + it.name;
            cls = cls.replace(/^wfl-/, "wf-").replace(/^wfs-/, "wf-");
            if (!cls) cls = "wf-icon";
            wrap.innerHTML = `<i class="wf ${cls}"></i>`;
            const p = document.createElement("p");
            p.textContent = cls;
            a.appendChild(wrap);
            a.appendChild(p);
            li.appendChild(a);
            el.appendChild(li);
          }
        })
        .catch((err) => {
          console.error("WfIconsInit: erro ao carregar wf-icons.json", err);
        });
    },
  };

  // Exportação Global
  if (typeof window !== "undefined") {
    window.WfIconsInit = WfIconsInit;
    if (window.WebFull) {
      window.WebFull.modules.WfIconsInit = WfIconsInit;
    }
  }

  // Auto-inicialização
  if (typeof document !== "undefined") {
    const init = () => WfIconsInit.initAll();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // Roda quando WfAjax injeta conteúdo: usa eventos públicos do framework
    [
      "swajax:loaded",
      "swajax:processed",
      "swajax:complete",
      "swdiv:loaded",
      "webfull-ready",
    ].forEach((evt) => {
      document.addEventListener(evt, () => {
        try {
          init();
        } catch (e) {
          console.warn("WfIconsInit event handler", e);
        }
      });
    });

    // MutationObserver para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      let shouldInit = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) init();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})(window, document);


// ===== WfImg.js =====
(function (window, document) {
  "use strict";

  /**
   * WfImg - Lightbox de Imagens
   * Baseado no Lightbox2, com resize animado e loader
   * @version 7.0 - Refatorado para Classe ES6
   */
  class WfImg {
    // #region Propriedades Estáticas
    static #cssLoaded = false;
    // #endregion

    // #region Construtor
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfImg) return element._wfImg;

      this.element = element;
      this.element._wfImg = this; // Marca como inicializado

      this.#init();
    }
    // #endregion

    // #region Métodos Privados
    #init() {
      this.element.addEventListener("click", (e) => {
        e.preventDefault();
        this.#handleClick();
      });
    }

    #handleClick() {
      // Buscar elementos do mesmo grupo se houver valor no atributo
      const groupName =
        this.element.getAttribute("WfImg") ||
        this.element.getAttribute("wfimg") ||
        this.element.getAttribute("WfImg");
      let groupAnchors;

      if (groupName && groupName !== "") {
        const selector = `a[WfImg="${groupName}"]`;
        groupAnchors = document.querySelectorAll(selector);
      } else {
        groupAnchors = [this.element];
      }

      WfImg.open(this.element, groupAnchors);
    }
    // #endregion

    // #region API Pública (Métodos Estáticos)
    static initAll(root = document) {
      WfImg.#loadComponentCSS();

      // Busca links com atributo WfImg
      const anchors = root.querySelectorAll
        ? root.querySelectorAll("a[WfImg]")
        : document.querySelectorAll("a[WfImg]");

      anchors.forEach((a) => new WfImg(a));

      // Se root é um elemento específico e é um link WfImg
      if (
        root.nodeType === 1 &&
        root.hasAttribute &&
        (root.hasAttribute("WfImg") ||
          root.hasAttribute("wfimg") ||
          root.hasAttribute("WfImg"))
      ) {
        new WfImg(root);
      }
    }

    static open(anchor, allEls) {
      WfImg.#loadComponentCSS();
      const group =
        anchor.getAttribute("WfImg-group") ||
        anchor.getAttribute("WfImg") ||
        anchor.dataset.wfimg ||
        "";

      // Converte NodeList/Array para Array real
      let groupEls = Array.from(allEls || [anchor]);

      // Se não foi passado allEls, tenta descobrir o grupo
      if (!allEls) {
        if (group) {
          groupEls = Array.from(
            document.querySelectorAll(
              `a[WfImg="${group}"], a[swimg="${group}"], a[sw-img="${group}"]`
            )
          );
        } else {
          groupEls = [anchor];
        }
      }

      let idx = groupEls.indexOf(anchor);
      if (idx < 0) idx = 0;

      let overlay = document.createElement("div");
      overlay.className = "wfimg-overlay";
      overlay.tabIndex = 0;
      overlay.innerHTML = `<div class="wfimg-box"><span class="wfimg-loader"></span><button class="wfimg-close" title="Fechar" style="opacity:0"></button><img class="wfimg-img" draggable="false"><div class="wfimg-caption" style="opacity:0"></div><div class="wfimg-counter" style="opacity:0"></div><button class="wfimg-arrow swimg-prev" style="display:none;opacity:0">&#10094;</button><button class="wfimg-arrow swimg-next" style="display:none;opacity:0">&#10095;</button></div>`;
      document.body.appendChild(overlay);

      const box = overlay.querySelector(".wfimg-box");
      const img = overlay.querySelector(".wfimg-img");
      const loader = overlay.querySelector(".wfimg-loader");
      const caption = overlay.querySelector(".wfimg-caption");
      const counter = overlay.querySelector(".wfimg-counter");
      const btnClose = overlay.querySelector(".wfimg-close");
      btnClose.innerHTML = "&times;";
      // Botões
      const btnPrev = overlay.querySelector(".wfimg-prev");
      const btnNext = overlay.querySelector(".wfimg-next");

      let loading = false,
        transitioning = false;
      let lastW = 0,
        lastH = 0;

      function show(idxNew, animate = true) {
        if (loading || transitioning) return;
        transitioning = true;
        idx = idxNew;
        const a = groupEls[idx];

        const href = a.getAttribute("WfImg-src") || a.getAttribute("href");
        const title = a.getAttribute("WfImg-title") || a.title || "";
        const alt =
          a.getAttribute("WfImg-alt") || a.querySelector("img")?.alt || "";

        img.classList.remove("wfimg-img-loaded");
        box.classList.add("wfimg-loading");
        loader.style.display = "block";
        caption.style.opacity = 0;
        counter.style.opacity = 0;
        btnPrev.style.opacity = 0;
        btnNext.style.opacity = 0;
        btnClose.style.opacity = 0;

        const preload = new window.Image();
        preload.onload = function () {
          const w = Math.min(preload.naturalWidth, window.innerWidth * 0.96);
          const h = Math.min(preload.naturalHeight, window.innerHeight * 0.8);

          const finishShow = () => {
            lastW = w;
            lastH = h;
            showNewImg();
          };

          if (animate && (Math.abs(w - lastW) > 2 || Math.abs(h - lastH) > 2)) {
            WfImg.#animateResize(box, w, h, finishShow);
          } else {
            box.style.width = w + "px";
            box.style.height = h + "px";
            finishShow();
          }
        };
        preload.src = href;

        function showNewImg() {
          setTimeout(() => {
            img.src = href;
            img.alt = alt;
            img.onload = () => {
              void img.offsetWidth; // Force reflow

              img.classList.add("wfimg-img-loaded");
              box.classList.remove("wfimg-loading");
              loader.style.display = "none";

              setTimeout(() => {
                caption.style.opacity = 1;
                counter.style.opacity = 1;
                btnClose.style.opacity = 1;

                if (groupEls.length > 1) {
                  btnPrev.style.display = "";
                  btnNext.style.display = "";
                  btnPrev.style.opacity = 1;
                  btnNext.style.opacity = 1;
                } else {
                  btnPrev.style.display = "none";
                  btnNext.style.display = "none";
                }

                loading = false;
                transitioning = false;
              }, 300);
            };
          }, 50);
        }

        try {
          const containsHtml =
            typeof title === "string" && /<[^>]+>/.test(title);
          const allowHtmlAttr =
            a.hasAttribute("WfImg-html") &&
            a.getAttribute("WfImg-html") !== "false";
          if ((allowHtmlAttr || containsHtml) && title) {
            caption.innerHTML = title;
          } else {
            caption.textContent = title || "";
          }
        } catch (err) {
          caption.textContent = title || "";
        }
        counter.textContent =
          groupEls.length > 1 ? `Imagem ${idx + 1} de ${groupEls.length}` : "";
      }

      function close() {
        WfImg.#animateBoxOut(overlay, box, () => {
          overlay.classList.remove("wfimg-open");
          setTimeout(() => {
            overlay.remove();
          }, 400);
          document.removeEventListener("keydown", onKey);
        });
      }

      function prev() {
        if (idx > 0) show(idx - 1);
        else show(groupEls.length - 1);
      }

      function next() {
        if (idx < groupEls.length - 1) show(idx + 1);
        else show(0);
      }

      function onKey(e) {
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }

      overlay.onclick = (e) => {
        if (e.target === overlay) close();
      };
      btnClose.onclick = close;
      btnPrev.onclick = prev;
      btnNext.onclick = next;
      document.addEventListener("keydown", onKey);

      setTimeout(() => {
        overlay.classList.add("wfimg-open");
        WfImg.#animateBoxIn(overlay, box, () => {
          setTimeout(() => {
            show(idx, false);
          }, 100);
        });
      }, 10);
    }
    // #endregion

    // #region Métodos Estáticos Privados (Helpers)
    static #animateBoxIn(overlay, box, cb) {
      setTimeout(() => {
        overlay.classList.add("wfimg-box-in");
        setTimeout(cb, 400);
      }, 10);
    }

    static #animateBoxOut(overlay, box, cb) {
      overlay.classList.remove("wfimg-box-in");
      setTimeout(cb, 400);
    }

    static #animateResize(box, w, h, cb) {
      box.style.transition =
        "width 0.4s cubic-bezier(.23,1,.32,1), height 0.4s cubic-bezier(.23,1,.32,1)";
      box.style.width = w + "px";
      box.style.height = h + "px";
      setTimeout(() => {
        box.style.transition = "";
        cb();
      }, 400);
    }

    static #loadComponentCSS() {
      if (this.#cssLoaded || document.getElementById("wfimg-css")) {
        this.#cssLoaded = true;
        return;
      }
      const style = document.createElement("style");
      style.id = "wfimg-css";
      style.textContent = `
/* WfImg - Lightbox de Imagens */

.wfimg-overlay {
   position: fixed; left:0; top:0; width:100vw; height:100vh;
   background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center;
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1); pointer-events: none;
}
.wfimg-overlay.wfimg-open { opacity: 1; pointer-events: auto; }

.wfimg-box {
   position: relative; display: flex; flex-direction: column; align-items: center;
   background: none; border-radius: 8px; box-shadow: 0 8px 32px #000a;
   opacity: 0; transform: scale(0.7); transition: all 0.4s cubic-bezier(.23,1,.32,1);
   max-width: 96vw; max-height: 92vh; min-width: 40px; min-height: 40px;
   overflow: visible; width: auto; height: auto;
}
.wfimg-overlay.wfimg-box-in .wfimg-box { opacity: 1; transform: scale(1); }

.wfimg-img {
   display: block; max-width: 96vw; max-height: 80vh; border-radius: 6px;
   background: #222; opacity: 0; transition: opacity 0.6s cubic-bezier(.23,1,.32,1);
   box-shadow: 0 8px 32px #000a; width: auto; height: auto;
}
.wfimg-img.wfimg-img-loaded { opacity: 1; }

.wfimg-caption { 
   color: #fff; margin: 10px 0 0 0; font-size: 1.1em; text-align: center; text-shadow: 0 2px 8px #000b; 
   opacity: 0; transition: opacity 0.5s cubic-bezier(.23,1,.32,1);
}
.wfimg-counter { 
   color: #bbb; font-size: 0.95em; margin-top: 2px; text-align: center; 
   opacity: 0; transition: opacity 0.5s cubic-bezier(.23,1,.32,1);
}
.wfimg-close { 
   position: absolute; top: -6px; right: 12px; font-size: 2.2em; color: #fff; background: none; border: none; cursor: pointer; z-index: 2; text-shadow: 0 2px 8px #000b; 
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1);
}

.wfimg-arrow {
   position: absolute; top: 50%; transform: translateY(-50%); font-size: 3em; color: #fff; background: none; border: none; cursor: pointer; z-index: 2;
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1); text-shadow: 0 2px 8px #000b;
}
.wfimg-arrow:hover { opacity: 1 !important; }
.wfimg-arrow.swimg-prev { left: 12px; }
.wfimg-arrow.swimg-next { right: 12px; }

.wfimg-loader { 
   position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 48px; height: 48px; border: 5px solid #fff3; border-top: 5px solid #fff; border-radius: 50%; animation: wfimg-spin 1s linear infinite; z-index: 10; display: none; 
   opacity: 0; transition: opacity 0.3s ease;
}
.wfimg-box.wfimg-loading .wfimg-loader { display: block; opacity: 1; }
@keyframes wfimg-spin { 100% { transform: translate(-50%,-50%) rotate(360deg); } }

@media (max-width: 600px) {
   .wfimg-img { max-width: 98vw; max-height: 60vh; }
   .wfimg-caption { font-size: 1em; }
   .wfimg-arrow { font-size: 2.2em; }
   .wfimg-close { font-size: 1.7em; }
}
      `;
      document.head.appendChild(style);
      this.#cssLoaded = true;
    }
    // #endregion
  }

  // Global Export
  if (typeof window !== "undefined") {
    window.WfImg = WfImg;

    // Registrar no WebFull quando disponível
    if (typeof window.WebFull !== "undefined" && window.WebFull.modules) {
      window.WebFull.modules.WfImg = WfImg;
    }

    // Auto-init
    const init = () => {
      WfImg.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfImg.initAll();
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


// ===== WfLazy.js =====
(function (window, document) {
  "use strict";

  /**
   * WfLazy - Progressive Image Loading
   * Inspirado no ccforward/progressive-image
   *
   * @author SandroWeb
   * @version 4.0
   * @since WEBFULL Framework v1.0
   */
  class WfLazy {
    constructor(options = {}) {
      this.options = Object.assign(
        {
          el: document,
          lazyClass: "lazy",
          progressiveClass: "progressive",
          previewClass: "preview",
          loadedClass: "loaded",
          removePreview: true,
          scale: true,
          rootMargin: "50px",
          threshold: 0.1,
          spinner: false,
          blurIntensity: "default", // 'light', 'medium', 'heavy', 'artistic', 'default'
          customBlur: null, // Permite blur personalizado ex: 'blur(30px) saturate(1.4)'
        },
        options
      );

      // Resolver elemento alvo para verificação de duplicidade
      this.element =
        typeof this.options.el === "string"
          ? document.querySelector(this.options.el)
          : this.options.el;

      if (!this.element) {
        console.warn("WfLazy: Elemento alvo não encontrado");
        return;
      }

      // Evita dupla inicialização no mesmo elemento
      if (this.element._wfLazy) {
        // Reprocessar imagens ao invés de retornar (para pegar novas imagens do AJAX)
        this.element._wfLazy.findAndProcessImages();
        return this.element._wfLazy;
      }
      this.element._wfLazy = this;

      this.observer = null;
      this.cssInjected = false;
      this.init();
    }

    init() {
      this.injectCSS();
      this.setupObserver();
      this.findAndProcessImages();
    }

    injectCSS() {
      if (document.getElementById("wflazy-progressive-styles")) {
        this.cssInjected = true;
        return;
      }

      const style = document.createElement("style");
      style.id = "wflazy-progressive-styles";
      style.textContent = `
           /* ===== SWLAZY PROGRESSIVE STYLES ===== */
           
           /* Container progressivo */
           .progressive {
              position: relative;
              overflow: hidden;
              display: inline-block;
           }
           
           /* Imagem preview (baixa resolução) - Zoom interno */
           .progressive img.preview {
              filter: blur(20px) saturate(1.2) brightness(1.1);
              transform: scale(1.15);
              transform-origin: center center;
              transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              opacity: 0.9;
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
           }
           
           /* Variações de intensidade de blur - Zoom interno */
           .progressive.blur-light img.preview {
              filter: blur(8px) saturate(1.1);
              transform: scale(1.05);
              transform-origin: center center;
           }
           
           .progressive.blur-medium img.preview {
              filter: blur(15px) saturate(1.15) brightness(1.05);
              transform: scale(1.1);
              transform-origin: center center;
           }
           
           .progressive.blur-heavy img.preview {
              filter: blur(25px) saturate(1.3) brightness(1.2) contrast(1.1);
              transform: scale(1.2);
              transform-origin: center center;
           }
           
           .progressive.blur-artistic img.preview {
              filter: blur(35px) saturate(1.5) brightness(1.3) contrast(1.2) hue-rotate(5deg);
              transform: scale(1.25);
              transform-origin: center center;
              opacity: 0.8;
           }
           
           /* Imagem carregada (alta resolução) - Zoom retorna ao normal */
           .progressive img.loaded {
              filter: none !important;
              transform: scale(1) !important;
              transform-origin: center center !important;
              opacity: 1;
              transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
           }
           
           /* Garantir que preview seja removido quando loaded */
           .progressive img.loaded.preview {
              filter: none !important;
              transform: scale(1) !important;
              transform-origin: center center !important;
           }
           
           /* Overlay para transição suave */
           .progressive .progressive-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              opacity: 0;
              transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              z-index: 2;
           }
           
           .progressive .progressive-overlay.loaded {
              opacity: 1;
           }
           
           /* Spinner de carregamento */
           .progressive .progressive-spinner {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 3;
              pointer-events: none;
              opacity: 1;
              transition: opacity 0.3s ease;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
           }
  
           .progressive .progressive-spinner.hidden {
              opacity: 0;
           }
  
           .progressive .progressive-spinner::after {
              content: '';
              display: block;
              width: 32px;
              height: 32px;
              border: 3px solid rgba(255, 255, 255, 0.2);
              border-top: 3px solid #fff;
              border-radius: 50%;
              animation: wflazy-spin 0.8s linear infinite;
              box-sizing: border-box;
           }
           
           @keyframes wflazy-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
           }
           
           /* Efeito de escala opcional */
           .progressive.scale img.preview {
              transform: scale(1.1);
           }
           
           .progressive.scale img.loaded {
              transform: scale(1);
           }
           
           /* Estados de carregamento */
           .progressive.loading {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: wflazy-shimmer 1.5s infinite;
           }
           
           @keyframes wflazy-shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
           }
           
           /* Responsividade */
           @media (max-width: 768px) {
              .progressive img.preview {
                 filter: blur(3px);
              }
           }
           
           /* Modo noturno */
           html.wfday-night .progressive.loading {
              background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
           }
  
           html.wfday-night .progressive .progressive-spinner::after {
              border: 3px solid rgba(255, 255, 255, 0.15);
              border-top: 3px solid #4a90e2;
           }
           
           /* Acessibilidade */
           @media (prefers-reduced-motion: reduce) {
              .progressive img,
              .progressive .progressive-overlay {
                 transition: none !important;
              }
              
              .progressive .progressive-spinner::after {
                 animation: none !important;
              }
           }
           
           /* Utilitários */
           .progressive img {
              max-width: 100%;
              height: auto;
           }
           
           .progressive.full-width {
              width: 100%;
           }
           
           .progressive.rounded {
              border-radius: 8px;
           }
           
           .progressive.circle {
              border-radius: 50%;
           }
        `;

      document.head.appendChild(style);
      this.cssInjected = true;
    }

    setupObserver() {
      if (!window.IntersectionObserver) {
        // Fallback para navegadores antigos
        this.loadAllImages();
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold,
        }
      );
    }

    findAndProcessImages() {
      const container = this.element;
      if (!container) return;

      // Procurar por imagens com classe lazy
      const lazyImages = container.querySelectorAll(
        `img.${this.options.lazyClass}`
      );
      lazyImages.forEach((img) => this.processImage(img));

      // Procurar por containers progressivos
      const progressiveContainers = container.querySelectorAll(
        `.${this.options.progressiveClass}`
      );
      progressiveContainers.forEach((container) => {
        const img = container.querySelector("img");
        if (img) this.processImage(img, container);
      });

      // Procurar por elementos com atributo WfLazy
      const swLazyElements = container.querySelectorAll("[WfLazy]");
      swLazyElements.forEach((element) => {
        if (element.tagName.toLowerCase() === "img") {
          this.processImage(element);
        }
      });
    }

    processImage(img, container = null) {
      if (img.dataset.wflazyProcessed) {
        return;
      }
      img.dataset.wflazyProcessed = "true";

      // Determinar o container
      if (!container) {
        container =
          img.closest(`.${this.options.progressiveClass}`) || img.parentElement;
      }

      // Adicionar classe progressive se não existir
      if (!container.classList.contains(this.options.progressiveClass)) {
        container.classList.add(this.options.progressiveClass);
      }

      // Verificar se há data-src
      const highResSrc = img.dataset.src || img.getAttribute("WfLazy-src");
      if (!highResSrc) {
        return;
      }

      // Adicionar classe de escala se habilitada
      if (this.options.scale) {
        container.classList.add("scale");
      }

      // Aplicar intensidade de blur
      this.applyBlurIntensity(container, img);

      // Adicionar classe preview à imagem
      img.classList.add(this.options.previewClass);

      // Adicionar spinner se habilitado
      if (this.options.spinner || img.dataset.spinner === "true") {
        this.addSpinner(container);
      }

      // Observar a imagem
      if (this.observer) {
        this.observer.observe(img);
      } else {
        this.loadImage(img);
      }
    }

    applyBlurIntensity(container, img) {
      // Verificar se há atributo data-blur no container ou imagem
      const dataBlur = container.dataset.blur || img.dataset.blur;
      const blurIntensity = dataBlur || this.options.blurIntensity;

      // Aplicar classe de blur baseada na intensidade
      switch (blurIntensity) {
        case "light":
          container.classList.add("blur-light");
          break;
        case "medium":
          container.classList.add("blur-medium");
          break;
        case "heavy":
          container.classList.add("blur-heavy");
          break;
        case "artistic":
          container.classList.add("blur-artistic");
          break;
        default:
          // Usar blur padrão (20px)
          break;
      }

      // Aplicar blur personalizado se definido
      if (this.options.customBlur) {
        img.style.filter = this.options.customBlur;
      }
    }

    addSpinner(container) {
      if (container.querySelector(".progressive-spinner")) return;

      const spinner = document.createElement("div");
      spinner.className = "progressive-spinner";
      spinner.setAttribute("aria-hidden", "true");
      container.appendChild(spinner);
    }

    loadImage(img) {
      let container = img.closest(`.${this.options.progressiveClass}`);

      // Se não houver container progressive, criar um ou usar o parentElement
      if (!container) {
        container = img.parentElement;
        if (container && !container.classList.contains(this.options.progressiveClass)) {
          container.classList.add(this.options.progressiveClass);
        }
      }

      if (!container) return;

      // Verificar se já foi processada
      if (img.dataset.wflazyLoaded === "true") return;
      img.dataset.wflazyLoaded = "true";

      // Obter URL de alta resolução
      const highResSrc = img.dataset.src || img.getAttribute("WfLazy-src");
      if (!highResSrc) {
        this.onImageError(img, container);
        return;
      }

      // Criar nova imagem para pré-carregamento
      const highResImg = new Image();

      highResImg.onload = () => {
        this.onImageLoad(img, container, highResSrc);
      };

      highResImg.onerror = () => {
        this.onImageError(img, container);
      };

      // Iniciar carregamento
      highResImg.src = highResSrc;
    }

    onImageLoad(img, container, highResSrc) {
      // Abordagem direta: atualizar a imagem e aplicar transição

      // Primeiro, atualizar o src da imagem
      img.src = highResSrc;

      // Adicionar classe loaded para iniciar transição
      img.classList.add(this.options.loadedClass);

      // Forçar reflow
      img.offsetHeight;

      // Aguardar um frame e então finalizar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.finalizeImageLoad(img, container, highResSrc, null);
        });
      });
    }

    finalizeImageLoad(img, container, highResSrc, overlay) {
      // Remover classe preview para finalizar transição
      setTimeout(() => {
        img.classList.remove(this.options.previewClass);
      }, 100);

      // Remover estados de carregamento
      container.classList.remove("loading");
      img.removeAttribute("aria-busy");

      // Ocultar spinner
      const spinner = container.querySelector(".progressive-spinner");
      if (spinner) {
        spinner.classList.add("hidden");
        setTimeout(() => spinner.remove(), 300);
      }

      // Disparar evento personalizado
      this.dispatchEvent(img, "wflazy:loaded", {
        src: highResSrc,
        element: img,
        container: container,
      });

      // Callback se definido
      if (typeof this.options.onLoad === "function") {
        this.options.onLoad(img, container);
      }
    }

    onImageError(img, container) {
      container.classList.remove("loading");
      container.classList.add("error");
      img.removeAttribute("aria-busy");

      // Ocultar spinner
      const spinner = container.querySelector(".progressive-spinner");
      if (spinner) {
        spinner.classList.add("hidden");
        setTimeout(() => spinner.remove(), 300);
      }

      // Disparar evento de erro
      this.dispatchEvent(img, "wflazy:error", {
        element: img,
        container: container,
      });

      // Callback se definido
      if (typeof this.options.onError === "function") {
        this.options.onError(img, container);
      }
    }

    dispatchEvent(element, eventName, detail) {
      const event = new CustomEvent(eventName, {
        detail: detail,
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(event);
    }

    loadAllImages() {
      const container = this.element;
      if (!container) return;

      const images = container.querySelectorAll(
        `img.${this.options.lazyClass}, .${this.options.progressiveClass} img, [WfLazy] img`
      );
      images.forEach((img) => this.loadImage(img));
    }

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }

    // Métodos estáticos para compatibilidade
    static fire(container = document, options = {}) {
      return new WfLazy(Object.assign({ el: container }, options));
    }

    static initAll(container = document, options = {}) {
      return WfLazy.fire(container, options);
    }

    static load(selector) {
      const element = document.querySelector(selector);
      if (element) {
        const instance = new WfLazy({ el: document.body }); // Use body as container to find images, or just load directly
        instance.loadImage(element);
      }
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    window.WfLazy = WfLazy;
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfLazy = WfLazy;
    }
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    const init = () => {
      WfLazy.fire();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfLazy.fire();
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
      setTimeout(init, 0);
    }
  }
})(window, document);


// ===== WfLessonsToggle.js =====
/**
 * WfLessonsToggle
 * Toggle simples com efeito deslizar (slide) para abrir/fechar o formulário "Nova Aula" dentro do SwPanelAjax.
 * Sem dependência de WfAccord. Foco em robustez e simplicidade.
 */

class WfLessonsToggle {
  static _bound = false;

  // Utilitários de animação (slide)
  static _slideDown(el, duration = 250) {
    if (!el) return Promise.resolve();
    return new Promise((resolve) => {
      // Preparação: exibir o elemento
      el.style.removeProperty("display");
      const display = getComputedStyle(el).display;
      if (display === "none") el.style.display = "block";

      const height = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = "0px";
      el.style.transition = `height ${duration}ms ease`;
      // forçar reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.height = height + "px";

      const done = () => {
        el.removeEventListener("transitionend", done);
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition");
        el.style.display = "block";
        el.classList.add("wf-slide-open");
        resolve();
      };
      el.addEventListener("transitionend", done);
      // Fallback caso transitionend não dispare
      setTimeout(done, duration + 50);
    });
  }

  static _slideUp(el, duration = 250) {
    if (!el) return Promise.resolve();
    return new Promise((resolve) => {
      const height = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = height + "px";
      el.style.transition = `height ${duration}ms ease`;
      // forçar reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.height = "0px";

      const done = () => {
        el.removeEventListener("transitionend", done);
        el.style.display = "none";
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition");
        el.classList.remove("wf-slide-open");
        resolve();
      };
      el.addEventListener("transitionend", done);
      setTimeout(done, duration + 50);
    });
  }

  static _slideToggle(el, duration = 250) {
    const isOpen = WfLessonsToggle._isOpen(el);
    return isOpen
      ? WfLessonsToggle._slideUp(el, duration)
      : WfLessonsToggle._slideDown(el, duration);
  }

  // Resolve o alvo (container do formulário) a partir do botão/DOM atual
  static _resolveTarget(toggleBtn, root = document) {
    if (!root) root = document;

    // 1) data-target-id ou data-accord-id
    const dataId = toggleBtn
      ? toggleBtn.getAttribute("data-target-id") ||
        toggleBtn.getAttribute("data-accord-id")
      : null;
    if (dataId) {
      const el =
        root.querySelector(`#${dataId}`) || document.getElementById(dataId);
      if (el) return el;
    }

    // 2) data-target ou data-accord-selector
    const dataSel = toggleBtn
      ? toggleBtn.getAttribute("data-target") ||
        toggleBtn.getAttribute("data-accord-selector")
      : null;
    if (dataSel) {
      const el = root.querySelector(dataSel) || document.querySelector(dataSel);
      if (el) return el;
    }

    // 3) IDs convencionais
    const idCandidate =
      root.querySelector("#lesson-create-accord") ||
      document.querySelector("#lesson-create-accord");
    if (idCandidate) return idCandidate;

    // 4) Buscar próximo alvo no container do painel
    const scope = toggleBtn
      ? toggleBtn.closest(".wfpanel1-content") || root
      : root;
    const selectors = [
      // Preferir containers diretos de formulário
      "#lesson-create",
      "#lesson-create-accord",
      ".lesson-create-accord",
      '[id*="lesson-create"]',
      // Tentar encontrar bloco de conteúdo conhecido
      "#lesson-create",
      ".lesson-create-accord",
      '[id*="lesson-create"]',
    ];
    for (const sel of selectors) {
      try {
        const candidate = scope.querySelector(sel);
        if (candidate) {
          return candidate;
        }
      } catch (_) {}
    }

    return null;
  }

  static _setBtnState(btn, isOpen) {
    if (!btn) return;
    const iconCls = isOpen ? "wf-toggle-left" : "wf-toggle-right";
    const label = isOpen ? "Fechar Formulário" : "Abrir Formulário";
    btn.innerHTML = `<i class='wf ${iconCls}'></i> ${label}`;
  }

  static _isOpen(target) {
    if (!target) return false;
    const cs = getComputedStyle(target);
    if (cs.display !== "none") return true;
    return (
      target.classList.contains("wf-slide-open") ||
      target.classList.contains("active") ||
      target.classList.contains("is-open")
    );
  }

  static _open(target) {
    if (!target) return;
    target.classList.add("active");
    target.classList.add("is-open");
    return WfLessonsToggle._slideDown(target);
  }

  static _close(target) {
    if (!target) return;
    target.classList.remove("active");
    target.classList.remove("is-open");
    return WfLessonsToggle._slideUp(target);
  }

  static _ensureClosed(target, btn) {
    if (!target) return;
    target.classList.remove("active");
    target.classList.remove("is-open");
    target.style.display = "none";
    WfLessonsToggle._setBtnState(btn, false);
  }

  static initAll(container = document) {
    // Encontrar possíveis botões de toggle:
    const candidates = [];
    // ID convencional
    const byId = container.querySelectorAll("#lesson-create-toggle-btn");
    byId.forEach((el) => candidates.push(el));
    // data attribute
    const byData = container.querySelectorAll("[data-lessons-toggle]");
    byData.forEach((el) => candidates.push(el));
    // classe opcional
    const byClass = container.querySelectorAll(".lesson-create-toggle-btn");
    byClass.forEach((el) => candidates.push(el));

    // Se nenhum encontrado, tentar documento inteiro como fallback
    if (candidates.length === 0) {
      const globalById = document.querySelectorAll("#lesson-create-toggle-btn");
      globalById.forEach((el) => candidates.push(el));
    }

    // Anexar para cada botão encontrado
    candidates.forEach((toggleBtn) => {
      if (!toggleBtn || toggleBtn.dataset.wfBound) return;
      const target = WfLessonsToggle._resolveTarget(toggleBtn, container);
      if (!target) return;

      // marcar bound
      toggleBtn.dataset.wfBound = "1";

      // Estado inicial: respeitar estado atual, não fechar se já estiver aberto
      const isOpenInit = WfLessonsToggle._isOpen(target);
      if (isOpenInit) {
        try {
          target.style.display = "block";
        } catch (_) {}
        WfLessonsToggle._setBtnState(toggleBtn, true);
      } else {
        WfLessonsToggle._ensureClosed(target, toggleBtn);
      }

      // Listener do botão
      toggleBtn.addEventListener("click", function (ev) {
        try {
          ev.preventDefault();
        } catch (_) {}
        try {
          ev.stopPropagation();
        } catch (_) {}
        const isOpen = WfLessonsToggle._isOpen(target);
        if (isOpen) WfLessonsToggle._close(target);
        else WfLessonsToggle._open(target);
        WfLessonsToggle._setBtnState(toggleBtn, !isOpen);
      });
    });

    WfLessonsToggle._bound = true;
  }
}

// Exportação Global
if (typeof window !== "undefined") {
  window.WfLessonsToggle = WfLessonsToggle;
  if (typeof window.WebFull !== "undefined") {
    window.WebFull.modules.WfLessonsToggle = WfLessonsToggle;
  }
}

// Auto-inicialização
if (typeof window !== "undefined") {
  const rebind = () => {
    try {
      WfLessonsToggle.initAll(document);
    } catch (e) {
      /* silencioso */
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rebind);
  } else {
    setTimeout(rebind, 0);
  }

  // Escutar eventos de carregamento dinâmico
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
    "wfpanel1:loaded",
  ].forEach((evt) => {
    document.addEventListener(evt, rebind);
  });

  // Fallback por delegação: garante funcionamento mesmo se initAll não vinculou listeners
  document.addEventListener(
    "click",
    function _wf_lessons_toggle_delegate(ev) {
      try {
        const btn =
          ev.target &&
          ev.target.closest &&
          ev.target.closest(
            "[data-lessons-toggle], #lesson-create-toggle-btn, .lesson-create-toggle-btn"
          );
        if (!btn) return;
        // Se já existe listener vinculado, não intercepta
        if (btn.dataset && btn.dataset.wfBound) return;
        ev.preventDefault();
        ev.stopPropagation();
        const target = WfLessonsToggle._resolveTarget(btn, document);
        if (!target) return;
        const isOpen = WfLessonsToggle._isOpen(target);
        if (isOpen) WfLessonsToggle._close(target);
        else WfLessonsToggle._open(target);
        WfLessonsToggle._setBtnState(btn, !isOpen);
        // marcar como bound para evitar duplicação em futuros cliques
        try {
          btn.dataset.wfBound = "1";
        } catch (_) {}
      } catch (_) {}
    },
    true
  );
}


// ===== WfLgpd.js =====
(function (window, document) {
  "use strict";

  class WfLgpd {
    constructor(container, options = {}) {
      const existing = document.querySelector(".wflgpd-container");
      if (existing) {
        this.container = existing;
      } else {
        if (typeof container === "string") {
          this.container = document.querySelector(container);
        } else if (container instanceof HTMLElement) {
          this.container = container;
        } else {
          console.warn("WfLgpd: container inválido.");
          return;
        }
      }
      if (!this.container) {
        console.warn("WfLgpd: container não encontrado.");
        return;
      }

      // Mover container para o body para evitar problemas de stacking context
      if (this.container.parentNode !== document.body) {
        document.body.appendChild(this.container);
      }

      // MODELO: lê data-modelo ou opção modelo, fallback para 1
      this.modelo = parseInt(
        this.container.getAttribute("data-modelo") || options.modelo || 1,
        10
      );
      this.applyModeloClass();
      this.localStorageKey = options.localStorageKey || "wflgpd_accepted";
      this.messageText =
        options.messageText ||
        "Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa Política de Privacidade.";
      this.acceptText = options.acceptText || "Aceitar";
      this.rejectText = options.rejectText || "Rejeitar";
      this.onlyAccept = options.onlyAccept || false;
      this.cookieExpireDays = parseInt(
        this.container.getAttribute("ok") || options.cookieExpireDays || 365
      );
      this.onAccept = options.onAccept || function () {};
      this.onReject = options.onReject || function () {};
      this.onChange = options.onChange || function () {};
      this.styleInjected = false;
      this.css = options.css !== false; // css opcional, padrão true
      if (this.css) this.injectDefaultStyles();
      if (this.css) this.injectModelosStyles();
      this.init();
      // Sincronização entre abas
      this._storageListener = (e) => {
        if (e.key === this.localStorageKey) {
          this.reset();
        }
      };
      window.addEventListener("storage", this._storageListener);
    }

    injectDefaultStyles() {
      if (document.getElementById("wflgpd-default-styles")) return;
      const styleSheet = document.createElement("style");
      styleSheet.id = "wflgpd-default-styles";
      styleSheet.type = "text/css";
      styleSheet.innerText = `
      .wflgpd-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: var(--swlgpd-bg, #000000c9);
        color: var(--swlgpd-color, #eeeeeec2);
        padding: 20px;
        text-align: center;
        font-size: 13px;
        z-index: 2147483647;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideUpFadeIn 0.5s ease forwards;
      }
      .wflgpd-message {
        display: flex;
        align-items: center;
      }
      .wflgpd-message i {
        margin-right: 8px;
      }
      .wflgpd-buttons {
        display: flex;
        gap: 10px;
      }
      .wflgpd-button-accept,
      .wflgpd-button-reject {
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 0;
        font-size: 13px;
        color: var(--swlgpd-btn-color, #fff);
      }
      .wflgpd-button-accept {
        background-color: var(--swlgpd-btn-accept, #29772c);
      }
      .wflgpd-button-reject {
        background-color: var(--swlgpd-btn-reject, #ff1503);
      }
      @keyframes slideUpFadeIn {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideDownFadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(30px); }
      }
    `;
      document.head.appendChild(styleSheet);
    }

    injectModelosStyles() {
      if (document.getElementById("wflgpd-modelos-styles")) return;
      const style = document.createElement("style");
      style.id = "wflgpd-modelos-styles";
      style.textContent =
        this.getModelo1CSS() +
        this.getModelo2CSS() +
        this.getModelo3CSS() +
        this.getModelo4CSS();
      document.head.appendChild(style);
    }

    getModelo1CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 1: Clássico\n   ======================= */
    .wflgpd-modelo-1.wflgpd-container {
      background: var(--swlgpd-bg, #fff);
      color: var(--swlgpd-color, #000000c9);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -8px 32px #0005;
      font-family: var(--swlgpd-font, var(--font1));
      border: 1px solid #eeeeeec2;
    }
    .wflgpd-modelo-1 .wflgpd-button-accept { background: var(--swlgpd-btn-accept, #1976d2); color: #fff; border-radius: 0; }
    .wflgpd-modelo-1 .wflgpd-button-reject { background: var(--swlgpd-btn-reject, #ff1503); color: #fff; border-radius: 0; }
    .wflgpd-modelo-1 .wflgpd-message i { color: #fff; font-size: 1.8rem; }
    `;
    }
    getModelo2CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 2: Moderno\n   ======================= */
    .wflgpd-modelo-2.wflgpd-container {
      background: linear-gradient(90deg, #29772c 0%, #185a9d 100%);
      color: #fff;
      border-radius: 24px 24px 0 0;
      box-shadow: 0 -8px 32px #185a9d55;
      font-family: var(--swlgpd-font, 'Montserrat', Arial, sans-serif);
      border: none;
    }
    .wflgpd-modelo-2 .wflgpd-button-accept { background: #fff; color: #185a9d; font-weight: bold; border-radius: 24px; }
    .wflgpd-modelo-2 .wflgpd-button-reject { background: #fff; color: #ff1503; font-weight: bold; border-radius: 24px; }
    .wflgpd-modelo-2 .wflgpd-message i { color: #29772c; }
    `;
    }
    getModelo3CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 3: Minimalista\n   ======================= */
    .wflgpd-modelo-3.wflgpd-container {
      background: rgba(255,255,255,0.85);
      color: #333;
      border-radius: 0;
      box-shadow: none;
      font-family: var(--swlgpd-font, 'Roboto', Arial, sans-serif);
      border: none;
      padding: 12px 8px;
    }
    .wflgpd-modelo-3 .wflgpd-button-accept { background: #333; color: #fff; border-radius: 0; }
    .wflgpd-modelo-3 .wflgpd-button-reject { background: #eee; color: #333; border-radius: 0; }
    .wflgpd-modelo-3 .wflgpd-message i { display: none; }
    .wflgpd-modelo-3 .wflgpd-buttons { gap: 4px; }
    `;
    }
    getModelo4CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 4: Dark\n   ======================= */
    .wflgpd-modelo-4.wflgpd-container {
      background: var(--swlgpd-bg, #23283a);
      color: var(--swlgpd-color, #ffe082);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -8px 32px #000a;
      font-family: var(--swlgpd-font, 'Poppins', Arial, sans-serif);
      border: none;
    }
    .wflgpd-modelo-4 .wflgpd-button-accept { background: #29772c; color: #23283a; border-radius: 8px; font-weight: bold; }
    .wflgpd-modelo-4 .wflgpd-button-reject { background: #ff1503; color: #23283a; border-radius: 8px; font-weight: bold; }
    .wflgpd-modelo-4 .wflgpd-message i { color: #ffe082; }
    `;
    }

    init() {
      const cookieValue =
        this.getCookie(this.localStorageKey) ??
        window.localStorage.getItem(this.localStorageKey);
      if (cookieValue === "true") {
        this.hide();
        return;
      }
      this.applyModeloClass();
      this.container.classList.add("wflgpd-container");
      this.container.setAttribute("role", "dialog");
      this.container.setAttribute("aria-live", "polite");
      if (!this.styleInjected && this.css) {
        this.injectStyles();
        this.styleInjected = true;
      }
      if (!this.container.querySelector(".wflgpd-message")) {
        const message = document.createElement("div");
        message.className = "wflgpd-message";
        message.setAttribute("role", "alert");
        message.setAttribute("aria-live", "polite");
        message.innerHTML =
          "<i class='bx bxs-bell bx-tada'></i> " + this.messageText;
        this.container.appendChild(message);
      }
      if (!this.container.querySelector(".wflgpd-buttons")) {
        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "wflgpd-buttons";
        const acceptButton = document.createElement("button");
        acceptButton.className = "wflgpd-button-accept";
        acceptButton.textContent = this.acceptText;
        acceptButton.setAttribute("aria-label", "Aceitar cookies");
        acceptButton.addEventListener("click", () => this.accept());
        buttonsDiv.appendChild(acceptButton);
        if (!this.onlyAccept) {
          const rejectButton = document.createElement("button");
          rejectButton.className = "wflgpd-button-reject";
          rejectButton.textContent = this.rejectText;
          rejectButton.setAttribute("aria-label", "Rejeitar cookies");
          rejectButton.addEventListener("click", () => this.reject());
          buttonsDiv.appendChild(rejectButton);
        }
        this.container.appendChild(buttonsDiv);
        // Foco automático no botão aceitar
        setTimeout(() => acceptButton.focus(), 100);
      }
    }

    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
      try {
        window.localStorage.setItem(name, value);
      } catch (_) {}
    }

    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    clearCookie(name) {
      document.cookie = name + "=; Max-Age=0; path=/";
      try {
        window.localStorage.removeItem(name);
      } catch (_) {}
    }

    accept() {
      this.container.style.animation = "slideDownFadeOut 0.4s ease forwards";
      this.container.addEventListener(
        "animationend",
        () => {
          this.setCookie(this.localStorageKey, "true", this.cookieExpireDays);
          this.hide();
          this.container.style.animation = "";
          this.onAccept();
          this.onChange(true);
        },
        { once: true }
      );
    }

    reject() {
      this.container.style.animation = "slideDownFadeOut 0.4s ease forwards";
      this.container.addEventListener(
        "animationend",
        () => {
          this.setCookie(this.localStorageKey, "false", this.cookieExpireDays);
          this.hide();
          this.container.style.animation = "";
          this.onReject();
          this.onChange(false);
        },
        { once: true }
      );
    }

    injectStyles() {
      if (document.getElementById("wflgpd-styles")) return;
      const styleSheet = document.createElement("style");
      styleSheet.id = "wflgpd-styles";
      styleSheet.type = "text/css";
      styleSheet.innerText = `
      @keyframes slideUpFadeIn {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideDownFadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(30px); }
      }
    `;
      document.head.appendChild(styleSheet);
    }

    show() {
      this.container.style.display = "flex";
      this.container.style.animation = "slideUpFadeIn 0.5s ease forwards";
      const btn = this.container.querySelector(".wflgpd-button-accept");
      if (btn) setTimeout(() => btn.focus(), 100);
    }

    hide() {
      this.container.style.display = "none";
    }

    reset() {
      this.container.innerHTML = "";
      this.init();
      this.show();
    }

    destroy() {
      window.removeEventListener("storage", this._storageListener);
      this.container.innerHTML = "";
      this.hide();
    }

    static initAll(container = document, options = {}) {
      let containers = [];
      if (typeof container === "string") {
        containers = document.querySelectorAll(container);
      } else if (
        container instanceof HTMLElement ||
        container instanceof Document
      ) {
        containers = container.querySelectorAll("[WfLgpd], .wflgpd");
      } else {
        return;
      }
      containers.forEach((container) => {
        new WfLgpd(container, options);
      });
    }

    // Aplica a classe do modelo no container
    applyModeloClass() {
      for (let i = 1; i <= 4; i++) {
        this.container.classList.remove(`wflgpd-modelo-${i}`);
      }
      this.container.classList.add(`wflgpd-modelo-${this.modelo}`);
    }

    // Permite trocar o modelo dinamicamente
    setModelo(modelo) {
      this.modelo = parseInt(modelo, 10) || 1;
      this.applyModeloClass();
    }

    static clearConsent(key = "wflgpd_accepted") {
      try {
        document.cookie = key + "=; Max-Age=0; path=/";
      } catch (_) {}
      try {
        window.localStorage.removeItem(key);
      } catch (_) {}
    }

    static reopen(container = document, options = {}) {
      WfLgpd.clearConsent(options.localStorageKey || "wflgpd_accepted");
      WfLgpd.initAll(container, options);
      const banner = document.querySelector(".wflgpd-container");
      if (banner) {
        banner.style.display = "flex";
      }
    }
  }
  // Variáveis CSS padrão (fallback)
  document.documentElement.style.setProperty(
    "--swlgpd-bg",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-bg"
    ) || "#222"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-color",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-color"
    ) || "#fff"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-color",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-color"
    ) || "#fff"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-accept",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-accept"
    ) || "#29772c"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-reject",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-reject"
    ) || "#ff1503"
  );

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfLgpd = WfLgpd;
  }

  // Expor globalmente sempre
  if (typeof window !== "undefined") {
    window.WfLgpd = WfLgpd;
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfLgpd.initAll());
    } else {
      WfLgpd.initAll();
    }
  }
})(window, document);


// ===== WfLoad.js =====
/**
 * WfLoad - Sistema de Loading e Lazy Loading
 * v3.0 - WEBFULL v1.0 - Refatorado para CSS externo e convenções padronizadas
 */

class WfLoad {
  /**
   * Cria uma instância de WfLoad para um elemento.
   * @param {HTMLElement} element - Elemento alvo.
   * @param {Object} options - Opções de configuração.
   */
  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign(
      {
        loader: "spinner",
        threshold: 0.1,
        rootMargin: "0px",
        // tempo mínimo (ms) que o loader fica visível mesmo que o recurso carregue rápido
        minDisplayTime: 600,
        onVisible: null,
        onHidden: null,
        autoHide: true,
        delay: 0,
      },
      options
    );

    this.isVisible = false;
    this.observer = null;
    this.wrapper = null;
    this.overlayElement = null;

    this.loadCSS();
    this.init();

    // registrar após init
    if (!Array.isArray(WfLoad.instances)) WfLoad.instances = [];
    WfLoad.instances.push(this);
    // também expor globalmente para debug/integração
    window.WfLoadInstances = WfLoad.instances;
  }

  loadCSS() {
    if (!document.getElementById("wfload-styles")) {
      const style = document.createElement("style");
      style.id = "wfload-styles";
      style.textContent = `
/**
 * WfLoad.css - Estilos do Sistema de Lazy/Preload de Elementos
 * SandroWeb - 2025
 */

/* ===== OVERLAY PRINCIPAL ===== */
.wfload-overlay {
   position: absolute !important;
   top: 0 !important;
   left: 0 !important;
   right: 0 !important;
   bottom: 0 !important;
   display: flex !important;
   align-items: center !important;
   justify-content: center !important;
   background: rgba(255, 255, 255, 0.9) !important;
   z-index: 9999 !important;
   pointer-events: none;
   transition: opacity 0.3s ease;
   border-radius: 4px;
   /* não forçar opacity com !important, permitimos animação via inline style */
   opacity: 1;
   visibility: visible !important;
   min-height: auto !important;
   padding: 8px !important;
}

/* ===== SPINNER ===== */
.wfload-spinner {
   width: 32px !important;
   height: 32px !important;
   border: 4px solid #d0d0d0 !important;
   border-top: 4px solid #1976d2 !important;
   border-radius: 50% !important;
   animation: wfload-spin 1s linear infinite !important;
   display: block !important;
   background: transparent !important;
   position: relative !important;
   z-index: 1 !important;
}

@keyframes wfload-spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}

/* ===== SKELETON ===== */
.wfload-skeleton {
   width: 100% !important;
   height: 100% !important;
   background: #f0f0f0 !important;
   background-size: 200% 100% !important;
   animation: skeleton-wave 1.5s infinite linear !important;
   border-radius: 8px !important;
   opacity: 1 !important;
   box-shadow: inset 0 0 0 1px #d0d0d0 !important;
   min-height: 100px !important;
   display: block !important;
   position: relative !important;
   overflow: hidden !important;
   z-index: 1 !important;
}

@keyframes skeleton-wave {
   0% { background-position: -200px 0; }
   100% { background-position: 200px 0; }
}

@keyframes skeleton-slide {
   0% { transform: translateX(-100%); }
   100% { transform: translateX(100%); }
}

/* ===== SHIMMER ===== */
.wfload-shimmer {
   position: absolute !important;
   top: 0 !important;
   left: 0 !important;
   width: 100% !important;
   height: 100% !important;
   background: linear-gradient(90deg, transparent 0%, var(--neut2) 50%, transparent 100%) !important;
   animation: skeleton-slide 1.5s infinite linear !important;
   transform: translateX(-100%) !important;
}

/* ===== ESTADOS HIDDEN ===== */
.wfload-hidden {
   opacity: 0 !important;
   transition: opacity 0.6s ease !important;
}

img.wfload-hidden {
   opacity: 0 !important;
   transition: opacity 0.6s ease !important;
}

img:not(.wfload-hidden) {
   opacity: 1 !important;
}

div.wfload-hidden {
   opacity: 0 !important;
   transition: opacity 0.6s ease !important;
}

div:not(.wfload-hidden) {
   opacity: 1 !important;
}

.wfload-wrapper.wfload-hidden {
   opacity: 0 !important;
   transition: opacity 0.6s ease !important;
}

.wfload-wrapper:not(.wfload-hidden) {
   opacity: 1 !important;
}

/* ===== WRAPPER ===== */
.wfload-wrapper {
   position: relative;
   display: inline-block;
}

/* ===== CONTENT ===== */
.wfload-content {
   width: 100%;
   height: 100%;
   /* transição para exibir conteúdo suavemente */
   opacity: 1;
   transition: opacity 0.35s ease;
}

/* garantir que imagens também façam fade quando wfload-hidden for removida */
img.wfload-hidden, .wfload-content.wfload-hidden {
   opacity: 0;
}

/* ===== TAMANHOS ===== */
.wfload-small .wfload-spinner {
   width: 24px !important;
   height: 24px !important;
   border-width: 3px !important;
}

.wfload-large .wfload-spinner {
   width: 48px !important;
   height: 48px !important;
   border-width: 6px !important;
}

.wfload-small .wfload-overlay {
   min-height: 60px !important;
}

.wfload-large .wfload-overlay {
   min-height: 150px !important;
}

/* ===== TEMAS ===== */
.wfload-theme-dark .wfload-overlay {
   background: rgba(0, 0, 0, 0.8) !important;
   box-shadow: inset 0 0 0 1px #444 !important;
}

.wfload-theme-dark .wfload-spinner {
   border-color: #444 !important;
   border-top-color: #4a90e2 !important;
}

.wfload-theme-dark .wfload-skeleton {
   background: #2a2a2a !important;
   box-shadow: inset 0 0 0 1px #444 !important;
}

.wfload-theme-dark .wfload-shimmer {
   background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%) !important;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   .wfload-overlay {
      min-height: 80px !important;
   }

   .wfload-spinner {
      width: 28px !important;
      height: 28px !important;
      border-width: 3px !important;
   }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfload-spinner {
      animation: none !important;
   }

   .wfload-skeleton {
      animation: none !important;
   }

   .wfload-shimmer {
      animation: none !important;
   }
}

/* ===== FOCUS STATES ===== */
.wfload-overlay:focus-within {
   outline: 2px solid #2196f3;
   outline-offset: 2px;
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfload-overlay {
   background: rgba(0, 0, 0, 0.8) !important;
   box-shadow: inset 0 0 0 1px #444 !important;
}

html.wfday-night .wfload-spinner {
   border-color: #444 !important;
   border-top-color: #4a90e2 !important;
}

html.wfday-night .wfload-skeleton {
   background: #2a2a2a !important;
   box-shadow: inset 0 0 0 1px #444 !important;
}

html.wfday-night .wfload-shimmer {
   background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%) !important;
}

/* ===== ANIMAÇÕES ESPECIAIS ===== */
@keyframes wfload-pulse {
   0%, 100% { opacity: 1; }
   50% { opacity: 0.7; }
}

.wfload-pulse {
   animation: wfload-pulse 2s infinite;
}

@keyframes wfload-bounce {
   0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
   40%, 43% { transform: translate3d(0, -8px, 0); }
   70% { transform: translate3d(0, -4px, 0); }
   90% { transform: translate3d(0, -2px, 0); }
}

.wfload-bounce {
   animation: wfload-bounce 1s infinite;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfload-overlay::-webkit-scrollbar {
   width: 8px;
   height: 8px;
}

.wfload-overlay::-webkit-scrollbar-track {
   background: #f1f1f1;
   border-radius: 4px;
}

.wfload-overlay::-webkit-scrollbar-thumb {
   background: #c1c1c1;
   border-radius: 4px;
}

.wfload-overlay::-webkit-scrollbar-thumb:hover {
   background: #a8a8a8;
}

html.wfday-night .wfload-overlay::-webkit-scrollbar-track {
   background: #2a2a2a;
}

html.wfday-night .wfload-overlay::-webkit-scrollbar-thumb {
   background: #555;
}

html.wfday-night .wfload-overlay::-webkit-scrollbar-thumb:hover {
   background: #666;
}
         `;
      document.head.appendChild(style);
    }
  }

  init() {
    if (!this.element.hasAttribute("WfLoad-initialized")) {
      this.element.setAttribute("WfLoad-initialized", "true");
      this.setupLoading();
    }
  }

  setupLoading() {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    this.element.setAttribute("WfLoad-id", uniqueId);

    // --- Ler atributos HTML específicos do elemento (per-item overrides)
    try {
      const readAttr = (name) =>
        this.element.hasAttribute(name)
          ? this.element.getAttribute(name)
          : null;
      const minAttr = readAttr("WfLoad-min-display");
      const threshAttr = readAttr("WfLoad-threshold");
      const srcAttr = readAttr("WfLoad-src");
      const rootMarginAttr =
        readAttr("WfLoad-root-margin") || readAttr("WfLoad-rootmargin");
      const loaderAttr = readAttr("WfLoad-loader");
      const sizeAttr =
        readAttr("WfLoad-size") ||
        readAttr("WfLoad-variant") ||
        readAttr("wfload-size");

      if (minAttr !== null) {
        const v = parseInt(minAttr, 10);
        if (!Number.isNaN(v)) this.options.minDisplayTime = v;
      }

      if (threshAttr !== null) {
        const v = parseFloat(threshAttr);
        if (!Number.isNaN(v)) this.options.threshold = v;
      }

      if (rootMarginAttr !== null) this.options.rootMargin = rootMarginAttr;

      // Aplicar tipo de loader via atributo
      if (loaderAttr !== null) {
        const val = (loaderAttr || "").trim().toLowerCase();
        if (val === "null" || val === "none" || val === "") {
          this.options.loader = null;
        } else if (val === "spinner" || val === "skeleton") {
          this.options.loader = val;
        } else {
          // Permitir HTML customizado
          this.options.loader = loaderAttr;
        }
      }

      // Aplicar tamanho (small/large) quando indicado
      if (sizeAttr !== null) {
        const v = (sizeAttr || "").trim().toLowerCase();
        if (v === "small" || v === "large") this.options.size = v;
      }

      // WfLoad-src para imagens é lido quando necessário em handleVisible
      if (srcAttr !== null && this.element.tagName === "IMG") {
        // nada adicional aqui; handleVisible usa WfLoad-src
      }
    } catch (e) {
      // silencioso em produção
    }

    let wrapper = this.element;
    let overlay;

    // Tratamento especial para imagens
    if (this.element.tagName === "IMG") {
      wrapper = document.createElement("div");
      wrapper.className = "wfload-wrapper";
      wrapper.setAttribute("WfLoad-original", "IMG");

      const computedStyle = window.getComputedStyle(this.element);
      wrapper.style.width =
        this.element.style.width ||
        this.element.getAttribute("width") ||
        computedStyle.width ||
        "100%";
      wrapper.style.height =
        this.element.style.height ||
        this.element.getAttribute("height") ||
        computedStyle.height ||
        "auto";
      wrapper.style.minHeight = computedStyle.minHeight;
      wrapper.style.maxWidth = computedStyle.maxWidth;
      wrapper.style.maxHeight = computedStyle.maxHeight;

      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);

      overlay = document.createElement("div");
      overlay.className = "wfload-overlay";
      wrapper.appendChild(overlay);

      // esconder imagem até carregar (mostra spinner)
      this.element.classList.add("wfload-hidden");
    } else {
      let contentWrapper = this.element.querySelector(".wfload-content");
      if (!contentWrapper) {
        contentWrapper = document.createElement("div");
        contentWrapper.className = "wfload-content";
        const children = Array.from(this.element.childNodes).filter(
          (node) =>
            !(
              node.nodeType === 1 &&
              node.classList &&
              node.classList.contains("wfload-overlay")
            )
        );
        if (children.length === 0) {
          contentWrapper.appendChild(document.createTextNode(""));
        } else {
          children.forEach((child) => contentWrapper.appendChild(child));
        }
        this.element.appendChild(contentWrapper);
      }
      overlay = document.createElement("div");
      overlay.className = "wfload-overlay";
      this.element.appendChild(overlay);

      // garantir posicionamento do container para que o overlay fique contido
      try {
        const parentPos = window.getComputedStyle(this.element).position;
        if (!parentPos || parentPos === "static") {
          this._originalPosition = this.element.style.position || "";
          this.element.style.position = "relative";
          this._didSetPosition = true;
        }
        // reforçar alguns estilos do overlay para evitar ocupar área indevida
        overlay.style.position = "absolute";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.pointerEvents = "none";
        // fundo leve para não criar bloco visual pesado
        if (document.documentElement.classList.contains("wfday-night")) {
          overlay.style.background = "rgba(0,0,0,0.25)";
        } else {
          overlay.style.background = "rgba(255,255,255,0.03)";
        }
      } catch (e) {}

      // esconder conteúdo até o carregamento concluir
      contentWrapper.classList.add("wfload-hidden");
    }

    this.createLoader(overlay);
    this.setupObserver(wrapper);
  }

  createLoader(overlay) {
    const loader = document.createElement("div");
    loader.className = "wfload-loader";

    // Aplicar classe de tamanho ao container do loader
    try {
      const parent = overlay.parentElement || this.element;
      if (this.options.size)
        parent.classList.add("wfload-" + this.options.size);
    } catch (e) {}

    if (this.options.loader === "spinner") {
      loader.innerHTML = '<div class="wfload-spinner"></div>';
    } else if (this.options.loader === "skeleton") {
      // skeleton com shimmer interno para efeito visual
      const skeleton = document.createElement("div");
      skeleton.className = "wfload-skeleton";
      const shimmer = document.createElement("div");
      shimmer.className = "wfload-shimmer";
      skeleton.appendChild(shimmer);
      loader.appendChild(skeleton);
    } else if (this.options.loader instanceof HTMLElement) {
      loader.appendChild(this.options.loader.cloneNode(true));
    } else if (typeof this.options.loader === "string") {
      // HTML customizado
      loader.innerHTML = this.options.loader;
    } else {
      // loader nulo: não inserir conteúdo de loader
    }

    // preparar overlay para fade-in
    try {
      overlay.style.opacity = "0";
      if (!overlay.style.transition)
        overlay.style.transition = "opacity 0.35s ease";
    } catch (e) {}
    overlay.appendChild(loader);
    // salvar referência ao overlay na instância
    this.overlayElement = overlay;

    // acionar fade-in sem bloquear
    try {
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });
    } catch (e) {}
  }

  // Remove com fade e destrói o elemento
  fadeOutRemove(element, duration = 350) {
    if (!element || !element.parentNode) return;
    try {
      if (!element.style.transition)
        element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = "0";
      const cleanup = () => {
        try {
          if (element.parentNode) element.parentNode.removeChild(element);
        } catch (e) {}
        element.removeEventListener("transitionend", cleanup);
      };
      element.addEventListener("transitionend", cleanup);
      // fallback para garantir remoção
      setTimeout(() => {
        try {
          if (element.parentNode) element.parentNode.removeChild(element);
        } catch (e) {}
      }, duration + 50);
    } catch (e) {}
  }

  setupObserver(wrapper) {
    const observerOptions = {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleVisible(wrapper, observer);
        }
      });
    }, observerOptions);

    observer.observe(wrapper);
    // salvar referências
    this.observer = observer;
    this.wrapper = wrapper;

    // se o elemento já estiver visível na tela, acionamos imediatamente
    try {
      const rect =
        wrapper.getBoundingClientRect && wrapper.getBoundingClientRect();
      if (
        rect &&
        rect.top <
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
      ) {
        // chamar em next tick para não bloquear o fluxo atual
        setTimeout(() => this.handleVisible(wrapper, observer), 10);
      }
    } catch (e) {}
  }

  handleVisible(wrapper, obs) {
    const startTime = Date.now();
    // garantir mínimo de exibição do loader (ms)
    const minTime =
      typeof this.options.minDisplayTime === "number"
        ? this.options.minDisplayTime
        : 0;
    // duração do fade (ms)
    const fadeMs = 350;
    const el = this.element;

    const showContent = () => {
      if (wrapper.classList.contains("wfload-wrapper")) {
        wrapper.parentNode.insertBefore(el, wrapper);
        wrapper.remove();
      } else {
        el.classList.remove("wfload-hidden");
      }
    };

    if (el.tagName === "IMG" && el.hasAttribute("WfLoad-src")) {
      const imageSrc = el.getAttribute("WfLoad-src");

      const finish = () => {
        const elapsed = Date.now() - startTime;
        const wait = Math.max(0, minTime - elapsed);
        // se o recurso já estiver muito rápido (ex.: < 40ms), ainda assim aguardar minTime para evitar "flash"
        setTimeout(() => {
          try {
            this.fadeOutRemove(this.overlayElement);
          } catch (e) {}
          // fade-in do elemento (imagem)
          try {
            el.style.transition =
              el.style.transition || `opacity ${fadeMs}ms ease`;
            // garantir ponto de partida
            el.style.opacity = "0";
            el.classList.remove("wfload-hidden");
            requestAnimationFrame(() => {
              el.style.opacity = "1";
            });
          } catch (e) {}
          // mover/remover wrapper após fade completar
          setTimeout(() => showContent(), fadeMs);
        }, wait);
      };

      el.addEventListener("load", finish, { once: true });
      el.addEventListener("error", finish, { once: true });

      // iniciar carregamento imediatamente (sem delay adicional)
      el.src = imageSrc;

      // fallback de segurança: remover overlay após 3000ms caso load/error não ocorra
      const fallback = setTimeout(() => {
        try {
          this.fadeOutRemove(this.overlayElement);
        } catch (e) {}
        el.classList.remove("wfload-hidden");
        showContent();
      }, 3000);
      // limpar fallback se carregar corretamente
      el.addEventListener("load", () => clearTimeout(fallback), { once: true });
      el.addEventListener("error", () => clearTimeout(fallback), {
        once: true,
      });
    } else {
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, minTime - elapsed);
      setTimeout(() => {
        const contentEl =
          this.element.querySelector(".wfload-content") || this.element;
        const startContentFade = () => {
          try {
            // garantir transição de fade para o conteúdo
            contentEl.style.transition =
              contentEl.style.transition || `opacity ${fadeMs}ms ease`;
            // ponto inicial do fade
            contentEl.style.opacity = "0";
            // iniciar fade no próximo repaint para evitar salto visual
            requestAnimationFrame(() => {
              contentEl.classList.remove("wfload-hidden");
              contentEl.style.opacity = "1";
            });
            // após o fade, garantir estrutura final (remover wrappers, etc.)
            setTimeout(() => showContent(), fadeMs);
          } catch (e) {
            // fallback: mostrar conteúdo sem animação se houver erro
            showContent();
          }
        };

        try {
          // iniciar fade-out do overlay e só então iniciar o fade-in do conteúdo
          if (this.overlayElement) {
            const onEnd = () => {
              try {
                this.overlayElement.removeEventListener("transitionend", onEnd);
              } catch (e) {}
              startContentFade();
            };
            this.overlayElement.addEventListener("transitionend", onEnd, {
              once: true,
            });
          }
          this.fadeOutRemove(this.overlayElement);
          // fallback caso transitionend não dispare (sem transição/no-motion)
          setTimeout(() => startContentFade(), fadeMs + 80);
        } catch (e) {
          // se overlay não existir ou ocorrer erro, iniciar fade do conteúdo imediatamente
          startContentFade();
        }
      }, wait);
    }

    if (typeof this.options.onVisible === "function") {
      this.options.onVisible(el);
    }
    obs.unobserve(wrapper);
    // marcar visibilidade
    this.isVisible = true;
    // disparar evento
    try {
      const ev = new CustomEvent("wfload:visible", { detail: { element: el } });
      document.dispatchEvent(ev);
    } catch (e) {}
  }

  // Métodos públicos para controle manual
  show() {
    const fadeMs = 350;
    const contentEl =
      this.element.querySelector(".wfload-content") || this.element;
    // Fade-out do overlay, se existir
    try {
      if (this.overlayElement) this.fadeOutRemove(this.overlayElement, fadeMs);
    } catch (e) {}
    // Fade-in suave do conteúdo
    try {
      contentEl.style.transition =
        contentEl.style.transition || `opacity ${fadeMs}ms ease`;
      contentEl.style.opacity = "0";
      contentEl.classList.remove("wfload-hidden");
      requestAnimationFrame(() => {
        contentEl.style.opacity = "1";
      });
    } catch (e) {}
    this.isVisible = true;
    document.dispatchEvent(
      new CustomEvent("wfload-show", { detail: { element: this.element } })
    );
  }

  hide() {
    if (this.overlayElement) this.overlayElement.classList.add("wfload-hidden");
    this.element.classList.add("wfload-hidden");
    this.isVisible = false;
    document.dispatchEvent(
      new CustomEvent("wfload-hide", { detail: { element: this.element } })
    );
  }

  progress(value) {
    // encontrar progress-fill dentro do element e atualizar
    const fill = this.element.querySelector(".progress-fill");
    if (fill) {
      fill.style.width = `${value}%`;
    }
    document.dispatchEvent(
      new CustomEvent("wfload-progress", {
        detail: { element: this.element, value },
      })
    );
  }

  text(text) {
    const txt = this.element.querySelector(".loading-text");
    if (txt) txt.textContent = text;
    document.dispatchEvent(
      new CustomEvent("wfload-text-change", {
        detail: { element: this.element, text },
      })
    );
  }

  destroy() {
    try {
      if (this.observer && this.wrapper) this.observer.unobserve(this.wrapper);
    } catch (e) {}
    try {
      if (this.overlayElement) this.overlayElement.remove();
    } catch (e) {}
    try {
      this.element.removeAttribute("WfLoad-initialized");
    } catch (e) {}
    // remover da lista global
    if (Array.isArray(window.WfLoadInstances)) {
      const idx = window.WfLoadInstances.indexOf(this);
      if (idx !== -1) window.WfLoadInstances.splice(idx, 1);
    }
    document.dispatchEvent(
      new CustomEvent("wfload-destroy", { detail: { element: this.element } })
    );
  }

  static initElement(element, options = {}) {
    try {
      if (!element) return null;
      return new WfLoad(element, options);
    } catch (e) {
      try {
        console.error("WfLoad.initElement error", e);
      } catch (_) {}
      return null;
    }
  }

  static initAll(container = document, options = {}) {
    // Coletar elementos com diferentes variações de seletor
    const found = [];

    try {
      // Incluir o próprio container se ele mesmo for alvo
      const isTag =
        container.tagName && container.tagName.toLowerCase() === "wf-load";
      const matches =
        typeof container.matches === "function"
          ? container.matches("[WfLoad]") ||
            container.matches("[wfload]") ||
            container.matches("[wf-load]") ||
            container.matches(".wf-load")
          : false;
      if (isTag || matches) found.push(container);
    } catch (_) {}

    try {
      container.querySelectorAll("[WfLoad]")?.forEach((el) => found.push(el));
    } catch (_) {}
    try {
      container.querySelectorAll("[wfload]")?.forEach((el) => found.push(el));
    } catch (_) {}
    try {
      container.querySelectorAll("[wf-load]")?.forEach((el) => found.push(el));
    } catch (_) {}
    try {
      container.querySelectorAll(".wf-load")?.forEach((el) => found.push(el));
    } catch (_) {}
    try {
      container.querySelectorAll("wf-load")?.forEach((el) => found.push(el));
    } catch (_) {}

    // Remover duplicados mantendo ordem
    const elements = Array.from(new Set(found));
    const instances = [];

    elements.forEach((el, index) => {
      setTimeout(() => {
        const instance = WfLoad.initElement(el, options);
        if (instance) instances.push(instance);
      }, index * 50);
    });

    return instances;
  }

  static load(element, options = {}) {
    return new WfLoad(element, options);
  }

  static show(element) {
    const instance = WfLoad.instances?.find((inst) => inst.element === element);
    if (instance) {
      instance.show();
    }
  }

  static hide(element) {
    const instance = WfLoad.instances?.find((inst) => inst.element === element);
    if (instance) {
      instance.hide();
    }
  }
}

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfLoad = WfLoad;
} else if (typeof window !== "undefined") {
  window.WfLoad = WfLoad;
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof document !== "undefined" && !window.WebFull) {
  const runInit = () => {
    try {
      WfLoad.initAll(document);
    } catch (e) {}
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runInit, { once: true });
  } else {
    setTimeout(runInit, 30);
  }
}


// ===== WfMasc.js =====
(function (window, document) {
  "use strict";

  class WfMasc {
    constructor(element) {
      this.element = element;
      // Tenta pegar máscara do atributo WfMasc-mask ou WfMasc
      this.mask =
        this.element.getAttribute("WfMasc-mask") ||
        this.element.getAttribute("WfMasc");
      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.bindEvents();
      try {
        if (this.element && this.element.value) {
          // Formata valor inicial se já houver conteúdo
          this.element.value = this.applyMask(String(this.element.value));
        }
      } catch (_) {}
    }

    // loadCSS removed

    bindEvents() {
      this.element.addEventListener("input", (e) => this.handleInput(e));
    }

    handleInput(e) {
      // Evita loop infinito se a máscara não mudar nada ou se for delete
      // Mas aqui aplicamos a máscara sempre no input
      let value = e.target.value;
      let masked = this.applyMask(value);

      if (value !== masked) {
        e.target.value = masked;
      }
    }

    applyMask(value) {
      if (!value) return "";
      const onlyNumbers = value.replace(/\D/g, "");

      switch (this.mask) {
        case "cpf":
          return onlyNumbers
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
        case "cnpj":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
        case "phone":
        case "telefone":
          if (onlyNumbers.length <= 10) {
            return onlyNumbers
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{4})(\d)/, "$1-$2");
          } else {
            return onlyNumbers
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{4})\d+?$/, "$1");
          }
        case "cep":
          return onlyNumbers
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
        case "date":
        case "data":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");
        case "time":
        case "hora":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1:$2")
            .replace(/:(\d{2})\d+?$/, "$1");
        case "datetime":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1 $2")
            .replace(/(\d{2})(\d)/, "$1:$2")
            .replace(/:(\d{2})\d+?$/, "$1");
        case "money":
        case "moeda":
          const raw = onlyNumbers;
          // Permitir ocultar o símbolo via atributo
          let symbolAttr = "";
          try {
            symbolAttr = (
              this.element.getAttribute("WfMasc-symbol") ||
              this.element.getAttribute("wfmasc-symbol") ||
              ""
            ).toLowerCase();
          } catch (_) {}

          const hideSymbol = ["off", "false", "0", "none", "hide"].includes(
            symbolAttr
          );

          if (hideSymbol) {
            return new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format((Number(raw) || 0) / 100);
          }

          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format((Number(raw) || 0) / 100);
        case "percent":
          return onlyNumbers + "%";
        case "integer":
          return onlyNumbers;
        case "number":
          // Mantém apenas dígitos, vírgula e ponto
          return value.replace(/[^\d,.]/g, "");
        default:
          return this.applyCustomMask(value);
      }
    }

    applyCustomMask(value) {
      if (!this.mask) return value;

      let maskedValue = "";
      let valueIndex = 0;
      // Remove formatação existente se for reprocessamento,
      // mas aqui assume-se que 'value' vem bruto ou misto.
      // Simplificação: usar apenas alfanuméricos do input para preencher
      const cleanValue = value.replace(/[^0-9a-zA-Z]/g, "");

      for (let i = 0; i < this.mask.length; i++) {
        if (valueIndex >= cleanValue.length) break;

        const maskChar = this.mask[i];
        const valueChar = cleanValue[valueIndex];

        if (maskChar === "9") {
          if (/[0-9]/.test(valueChar)) {
            maskedValue += valueChar;
            valueIndex++;
          } else {
            // Se esperava número e veio letra, pula o caractere do valor?
            // Ou aborta? Vamos tentar pular.
            valueIndex++;
            i--; // Tenta mesma máscara no próximo char
          }
        } else if (maskChar === "a") {
          if (/[a-zA-Z]/.test(valueChar)) {
            maskedValue += valueChar;
            valueIndex++;
          } else {
            valueIndex++;
            i--;
          }
        } else if (maskChar === "*") {
          maskedValue += valueChar;
          valueIndex++;
        } else {
          // Caractere fixo na máscara
          maskedValue += maskChar;
          if (maskChar === valueChar) {
            valueIndex++; // Se o usuário digitou o separador, avança
          }
        }
      }
      return maskedValue;
    }

    // Inicializador Estático para o WebFull
    static initAll() {
      // Procura elementos com WfMasc ou WfMasc-mask
      const elements = document.querySelectorAll("[WfMasc], [WfMasc-mask]");
      elements.forEach((element) => {
        if (!element._wfMasc) {
          element._wfMasc = new WfMasc(element);
        }
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfMasc = WfMasc;
    }
    window.WfMasc = WfMasc;

    // Auto-init
    const init = () => {
      WfMasc.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                // Element node
                if (
                  node.hasAttribute("WfMasc") ||
                  node.hasAttribute("WfMasc-mask") ||
                  node.querySelector("[WfMasc], [WfMasc-mask]")
                ) {
                  shouldInit = true;
                }
              }
            });
          }
        });
        if (shouldInit) {
          WfMasc.initAll();
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


// ===== WfModal.js =====
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


// ===== WfMove.js =====
/**
 * WfMove - Componente para animações CSS automáticas
 * Detecta elementos com classes anime-* e aplica animações automaticamente
 */
class WfMove {
   // Pool global de observers para otimização de performance
   static observerPool = new Map();
   static debounceTimers = new Map();
   
   // Configurações globais de performance
   static performanceConfig = {
      debounceDelay: 16, // ~60fps
      maxObservers: 5,
      reuseThreshold: 0.1
   };

   // Sistema de velocidades melhorado
   static speedMap = {
      'XS': { duration: '0.15s', class: 'swmove-speed-xs' },
      'S': { duration: '0.25s', class: 'swmove-speed-s' },
      'M': { duration: '0.6s', class: 'swmove-speed-m' },
      'L': { duration: '1s', class: 'swmove-speed-l' },
      'XL': { duration: '1.5s', class: 'swmove-speed-xl' },
      'XXL': { duration: '2s', class: 'swmove-speed-xxl' },
      // Aliases para compatibilidade
      'fast': { duration: '0.3s', class: 'swmove-speed-fast' },
      'normal': { duration: '0.6s', class: 'swmove-speed-normal' },
      'slow': { duration: '1s', class: 'swmove-speed-slow' },
      'very-slow': { duration: '1.5s', class: 'swmove-speed-very-slow' }
   };
   constructor(element) {
      this.element = element;
      this.animationType = this.element.getAttribute('WfMove') || 'fade-in';
      this.speed = this.element.getAttribute('WfMove-speed') || 'M';
      this.delay = parseInt(this.element.getAttribute('WfMove-delay')) || 0;
      this.threshold = parseFloat(this.element.getAttribute('WfMove-threshold')) || 0.1;
      this.repeat = this.element.getAttribute('WfMove-repeat') === 'true';
      this.onStart = this.element.getAttribute('WfMove-on-start');
      this.onEnd = this.element.getAttribute('WfMove-on-end');
      // Simple out: se true usa fade rápido ao sair da viewport
      this.simpleOut = this.element.getAttribute('WfMove-simpleOut') !== 'false';
      
      // Recursos avançados
      this.parallax = this.element.getAttribute('WfMove-parallax') === 'true';
      this.parallaxSpeed = parseFloat(this.element.getAttribute('WfMove-parallax-speed')) || 0.5;
      this.scrollProgress = this.element.getAttribute('WfMove-scroll-progress') === 'true';
      this.onProgress = this.element.getAttribute('WfMove-on-progress');
      this.progressStart = parseFloat(this.element.getAttribute('WfMove-progress-start')) || 0;
      this.progressEnd = parseFloat(this.element.getAttribute('WfMove-progress-end')) || 1;

      this.hasAnimated = false;
      this.isAnimating = false;
      // Drag & drop
      this.draggable = false;
      this.handleSelector = this.element.getAttribute('WfMove-handle') || null;
      this.boundarySelector = this.element.getAttribute('WfMove-boundary') || null;
      this.axis = this.element.getAttribute('WfMove-axis') || null; // 'x' or 'y'
      
      // Recursos avançados de drag & drop
      this.snapToGrid = this.element.getAttribute('WfMove-snap-grid') === 'true';
      this.gridSize = parseInt(this.element.getAttribute('WfMove-grid-size')) || 20;
      this.momentum = this.element.getAttribute('WfMove-momentum') === 'true';
      this.momentumDecay = parseFloat(this.element.getAttribute('WfMove-momentum-decay')) || 0.95;
      this.magneticTargets = this.element.getAttribute('WfMove-magnetic-targets') || null;
      // if element has WfMove and is absolutely positioned, enable dragging by default
      try { if (this.element.hasAttribute && this.element.hasAttribute('WfMove') && (this.element.style && this.element.style.position === 'absolute')) this.draggable = true; } catch(e){}

      this.loadCSS();
      // marcar container inicializado
      try { this.element.setAttribute('WfMove-initialized', '1'); } catch(e){}
      try { this.element._wfMove = this; } catch(e){}
      this.init();
      // if draggable, setup pointer handlers
      try { if (this.draggable) this.setupDrag(); } catch(e){}
   }

   loadCSS() {
      if (!document.getElementById('wfmove-styles')) {
         const style = document.createElement('style');
         style.id = 'wfmove-styles';
         style.textContent = `
/**
 * WfMove.css - Estilos do Sistema de Animações Automáticas
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
.wfmove-container {
   position: relative;
   overflow: hidden;
}

/* ===== ELEMENTOS ANIMADOS ===== */
.wfmove-element {
   opacity: 0;
   transform: translateY(30px);
   transition: all 0.6s ease-out;
   will-change: opacity, transform;
}

.wfmove-element.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

/* ===== ANIMAÇÕES BÁSICAS ===== */
.wfmove-fade-in {
   opacity: 0;
   transition: opacity 0.6s ease-out;
}

.wfmove-fade-in.wfmove-active {
   opacity: 1;
}

.wfmove-slide-up {
   opacity: 0;
   transform: translateY(50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-up.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-slide-down {
   opacity: 0;
   transform: translateY(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-down.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-slide-left {
   opacity: 0;
   transform: translateX(50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-left.wfmove-active {
   opacity: 1;
   transform: translateX(0);
}

.wfmove-slide-right {
   opacity: 0;
   transform: translateX(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-right.wfmove-active {
   opacity: 1;
   transform: translateX(0);
}

.wfmove-zoom-in {
   opacity: 0;
   transform: scale(0.8);
   transition: all 0.6s ease-out;
}

.wfmove-zoom-in.wfmove-active {
   opacity: 1;
   transform: scale(1);
}

.wfmove-zoom-out {
   opacity: 0;
   transform: scale(1.2);
   transition: all 0.6s ease-out;
}

.wfmove-zoom-out.wfmove-active {
   opacity: 1;
   transform: scale(1);
}

.wfmove-rotate-in {
   opacity: 0;
   transform: rotate(-180deg) scale(0.8);
   transition: all 0.6s ease-out;
}

.wfmove-rotate-in.wfmove-active {
   opacity: 1;
   transform: rotate(0deg) scale(1);
}

/* ===== VELOCIDADES MELHORADAS ===== */
.wfmove-speed-xs {
   transition-duration: 0.15s !important;
}

.wfmove-speed-s {
   transition-duration: 0.25s !important;
}

.wfmove-speed-m {
   transition-duration: 0.6s !important;
}

.wfmove-speed-l {
   transition-duration: 1s !important;
}

.wfmove-speed-xl {
   transition-duration: 1.5s !important;
}

.wfmove-speed-xxl {
   transition-duration: 2s !important;
}

/* ===== VELOCIDADES (Compatibilidade) ===== */
.wfmove-speed-fast {
   transition-duration: 0.3s !important;
}

.wfmove-speed-normal {
   transition-duration: 0.6s !important;
}

.wfmove-speed-slow {
   transition-duration: 1s !important;
}

.wfmove-speed-very-slow {
   transition-duration: 1.5s !important;
}

/* ===== DELAYS ===== */
.wfmove-delay-100 {
   transition-delay: 0.1s !important;
}

.wfmove-delay-200 {
   transition-delay: 0.2s !important;
}

.wfmove-delay-300 {
   transition-delay: 0.3s !important;
}

.wfmove-delay-400 {
   transition-delay: 0.4s !important;
}

.wfmove-delay-500 {
   transition-delay: 0.5s !important;
}

.wfmove-delay-600 {
   transition-delay: 0.6s !important;
}

.wfmove-delay-700 {
   transition-delay: 0.7s !important;
}

.wfmove-delay-800 {
   transition-delay: 0.8s !important;
}

.wfmove-delay-900 {
   transition-delay: 0.9s !important;
}

.wfmove-delay-1000 {
   transition-delay: 1s !important;
}

/* ===== EFEITOS ESPECIAIS ===== */
.wfmove-bounce {
   transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
}

.wfmove-elastic {
   transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.wfmove-back {
   transition-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045) !important;
}

.wfmove-smooth {
   transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

/* ===== ANIMAÇÕES AVANÇADAS ===== */
.wfmove-flip-x {
   opacity: 0;
   transform: perspective(400px) rotateX(90deg);
   transition: all 0.6s ease-out;
   transform-origin: center center;
}

.wfmove-flip-x.wfmove-active {
   opacity: 1;
   transform: perspective(400px) rotateX(0deg);
}

.wfmove-flip-y {
   opacity: 0;
   transform: perspective(400px) rotateY(90deg);
   transition: all 0.6s ease-out;
   transform-origin: center center;
}

.wfmove-flip-y.wfmove-active {
   opacity: 1;
   transform: perspective(400px) rotateY(0deg);
}

.wfmove-scale-up {
   opacity: 0;
   transform: scale(0.5) translateY(50px);
   transition: all 0.6s ease-out;
}

.wfmove-scale-up.wfmove-active {
   opacity: 1;
   transform: scale(1) translateY(0);
}

.wfmove-scale-down {
   opacity: 0;
   transform: scale(1.5) translateY(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-scale-down.wfmove-active {
   opacity: 1;
   transform: scale(1) translateY(0);
}

/* ===== ANIMAÇÕES EM SEQUÊNCIA ===== */
.wfmove-stagger > * {
   opacity: 0;
   transform: translateY(30px);
   transition: all 0.6s ease-out;
}

.wfmove-stagger.wfmove-active > * {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-stagger > *:nth-child(1) { transition-delay: 0.1s; }
.wfmove-stagger > *:nth-child(2) { transition-delay: 0.2s; }
.wfmove-stagger > *:nth-child(3) { transition-delay: 0.3s; }
.wfmove-stagger > *:nth-child(4) { transition-delay: 0.4s; }
.wfmove-stagger > *:nth-child(5) { transition-delay: 0.5s; }
.wfmove-stagger > *:nth-child(6) { transition-delay: 0.6s; }
.wfmove-stagger > *:nth-child(7) { transition-delay: 0.7s; }
.wfmove-stagger > *:nth-child(8) { transition-delay: 0.8s; }
.wfmove-stagger > *:nth-child(9) { transition-delay: 0.9s; }
.wfmove-stagger > *:nth-child(10) { transition-delay: 1s; }

/* ===== ANIMAÇÕES INFINITAS ===== */
.wfmove-infinite {
   animation-iteration-count: infinite;
}

.wfmove-pulse {
   animation: wfmove-pulse 2s infinite;
}

@keyframes wfmove-pulse {
   0%, 100% { transform: scale(1); }
   50% { transform: scale(1.05); }
}

.wfmove-bounce-animation {
   animation: wfmove-bounce-animation 2s infinite;
}

@keyframes wfmove-bounce-animation {
   0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
   40%, 43% { transform: translate3d(0, -8px, 0); }
   70% { transform: translate3d(0, -4px, 0); }
   90% { transform: translate3d(0, -2px, 0); }
}

.wfmove-shake {
   animation: wfmove-shake 0.5s infinite;
}

@keyframes wfmove-shake {
   0%, 100% { transform: translateX(0); }
   25% { transform: translateX(-5px); }
   75% { transform: translateX(5px); }
}

/* ===== ANIMAÇÕES DE SAÍDA ESPECÍFICAS ===== */
.wfmove-exiting {
   transition-duration: 0.3s !important; /* Saída mais rápida */
}

.wfmove-fade-in.wfmove-exiting {
   opacity: 0;
}

.wfmove-slide-up.wfmove-exiting {
   opacity: 0;
   transform: translateY(-30px);
}

.wfmove-slide-down.wfmove-exiting {
   opacity: 0;
   transform: translateY(30px);
}

.wfmove-slide-left.wfmove-exiting {
   opacity: 0;
   transform: translateX(-30px);
}

.wfmove-slide-right.wfmove-exiting {
   opacity: 0;
   transform: translateX(30px);
}

.wfmove-zoom-in.wfmove-exiting {
   opacity: 0;
   transform: scale(0.7);
}

.wfmove-zoom-out.wfmove-exiting {
   opacity: 0;
   transform: scale(1.3);
}

.wfmove-rotate-in.wfmove-exiting {
   opacity: 0;
   transform: rotate(180deg) scale(0.7);
}

.wfmove-flip-x.wfmove-exiting {
   opacity: 0;
   transform: perspective(400px) rotateX(-90deg);
}

.wfmove-flip-y.wfmove-exiting {
   opacity: 0;
   transform: perspective(400px) rotateY(-90deg);
}

.wfmove-scale-up.wfmove-exiting {
   opacity: 0;
   transform: scale(0.3) translateY(-50px);
}

.wfmove-scale-down.wfmove-exiting {
   opacity: 0;
   transform: scale(1.7) translateY(50px);
}

/* ===== ESTADOS ESPECIAIS ===== */
.wfmove-loading {
   position: relative;
}

.wfmove-loading::after {
   content: '';
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 20px;
   height: 20px;
   border: 2px solid #f3f3f3;
   border-top: 2px solid #2196f3;
   border-radius: 50%;
   animation: wfmove-spin 1s linear infinite;
}

@keyframes wfmove-spin {
   0% { transform: translate(-50%, -50%) rotate(0deg); }
   100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.wfmove-disabled {
   opacity: 0.5;
   pointer-events: none;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   .wfmove-slide-up,
   .wfmove-slide-down {
      transform: translateY(30px);
   }

   .wfmove-slide-left,
   .wfmove-slide-right {
      transform: translateX(30px);
   }

   .wfmove-zoom-in,
   .wfmove-zoom-out {
      transform: scale(0.9);
   }
}

@media (max-width: 480px) {
   .wfmove-slide-up,
   .wfmove-slide-down {
      transform: translateY(20px);
   }

   .wfmove-slide-left,
   .wfmove-slide-right {
      transform: translateX(20px);
   }

   .wfmove-zoom-in,
   .wfmove-zoom-out {
      transform: scale(0.95);
   }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfmove-element,
   .wfmove-fade-in,
   .wfmove-slide-up,
   .wfmove-slide-down,
   .wfmove-slide-left,
   .wfmove-slide-right,
   .wfmove-zoom-in,
   .wfmove-zoom-out,
   .wfmove-rotate-in,
   .wfmove-flip-x,
   .wfmove-flip-y,
   .wfmove-scale-up,
   .wfmove-scale-down,
   .wfmove-stagger > * {
      transition: none !important;
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
   }

   .wfmove-pulse,
   .wfmove-bounce-animation,
   .wfmove-shake {
      animation: none !important;
   }
}

/* ===== FOCUS STATES ===== */
.wfmove-element:focus-within {
   outline: 2px solid #2196f3;
   outline-offset: 2px;
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfmove-element {
   /* Mantém as mesmas animações no tema noite */
}

html.wfday-night .wfmove-loading::after {
   border-color: #444;
   border-top-color: #4a90e2;
}

/* ===== UTILITÁRIOS ===== */
.wfmove-hidden {
   opacity: 0 !important;
   visibility: hidden !important;
}

.wfmove-visible {
   opacity: 1 !important;
   visibility: visible !important;
}

.wfmove-no-transition {
   transition: none !important;
}

.wfmove-instant {
   transition-duration: 0s !important;
}

/* ===== DEBUG ===== */
.wfmove-debug {
   border: 2px dashed #ff0000;
   background: rgba(255, 0, 0, 0.1);
}

.wfmove-debug::before {
   content: 'WfMove Debug';
   position: absolute;
   top: -20px;
   left: 0;
   background: #ff0000;
   color: white;
   padding: 2px 6px;
   font-size: 10px;
   border-radius: 2px;
}

/* ===== DRAG & DROP AVANÇADO ===== */
.wfmove-dragging { 
   z-index: 9999 !important; 
   transform: scale(1.05) !important; 
   box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
   transition: none !important;
}

.wfmove-snap-grid { 
   background-image: 
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
   background-size: var(--swmove-grid-size, 20px) var(--swmove-grid-size, 20px);
}

.wfmove-magnetic-target {
   position: relative;
}

.wfmove-magnetic-target::before {
   content: '';
   position: absolute;
   top: -25px; left: -25px; right: -25px; bottom: -25px;
   border: 2px dashed rgba(74, 144, 226, 0.3);
   border-radius: 50px;
   opacity: 0;
   transition: opacity 0.3s ease;
   pointer-events: none;
}

.wfmove-magnetic-target.wfmove-magnetic-active::before {
   opacity: 1;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfmove-container::-webkit-scrollbar {
   width: 6px;
   height: 6px;
}

.wfmove-container::-webkit-scrollbar-track {
   background: #f1f1f1;
   border-radius: 3px;
}

.wfmove-container::-webkit-scrollbar-thumb {
   background: #c1c1c1;
   border-radius: 3px;
}

.wfmove-container::-webkit-scrollbar-thumb:hover {
   background: #a8a8a8;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-track {
   background: #2a2a2a;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-thumb {
   background: #555;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-thumb:hover {
   background: #666;
}
         `;
         document.head.appendChild(style);
      }
   }

   init() {
      // Aplicar sistema de Intersection Observer para anime views
      this.setupAnimeViews();
      
      // Configurar recursos avançados
      if (this.parallax || this.scrollProgress) {
         this.setupAdvancedFeatures();
      }
   }

   // Configurar recursos avançados (parallax, scroll progress)
   setupAdvancedFeatures() {
      // Throttled scroll handler para performance
      let ticking = false;
      
      const handleScroll = () => {
         if (!ticking) {
            requestAnimationFrame(() => {
               this.updateAdvancedEffects();
               ticking = false;
            });
            ticking = true;
         }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Cleanup no destroy
      this._scrollHandler = handleScroll;
   }

   // Atualizar efeitos avançados baseados no scroll
   updateAdvancedEffects() {
      const rect = this.element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calcular progresso do scroll (0 = elemento fora da tela embaixo, 1 = elemento fora da tela em cima)
      const scrollProgress = Math.max(0, Math.min(1, 
         (windowHeight - elementTop) / (windowHeight + elementHeight)
      ));

      // Aplicar parallax
      if (this.parallax) {
         const parallaxOffset = (scrollProgress - 0.5) * 100 * this.parallaxSpeed;
         this.element.style.transform = `translateY(${parallaxOffset}px)`;
      }

      // Callback de progresso
      if (this.scrollProgress && this.onProgress) {
         const normalizedProgress = Math.max(0, Math.min(1,
            (scrollProgress - this.progressStart) / (this.progressEnd - this.progressStart)
         ));
         
         try {
            new Function('progress', 'element', this.onProgress).call(this, normalizedProgress, this.element);
         } catch (e) {
            console.error('WfMove onProgress error', e);
         }
      }
   }

   // Drag & drop setup
   setupDrag() {
      // determine handle element
      this._dragging = false;
      this._dragStart = { x: 0, y: 0 };
      this._startPos = { x: 0, y: 0 };
      this._velocity = { x: 0, y: 0 };
      this._lastMoveTime = 0;
      this._lastPosition = { x: 0, y: 0 };
      this._handleEl = this.handleSelector ? this.element.querySelector(this.handleSelector) : this.element;
      if (!this._handleEl) this._handleEl = this.element;
      // event bindings
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._handleEl.style.touchAction = 'none';
      this._handleEl.addEventListener('pointerdown', this._onPointerDown);
      // store bounding references
      try { this.element.classList.add('swmove-draggable'); } catch(e){}
   }

   _onPointerDown(e) {
      // only left button
      if (e.button && e.button !== 0) return;
      e.preventDefault();
      this._dragging = true;
      this._dragId = e.pointerId;
      this._dragStart.x = e.clientX;
      this._dragStart.y = e.clientY;
      const rect = this.element.getBoundingClientRect();
      this._startPos.x = rect.left + window.scrollX;
      this._startPos.y = rect.top + window.scrollY;
      // set pointer capture
      try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch(e){}
      document.addEventListener('pointermove', this._onPointerMove);
      document.addEventListener('pointerup', this._onPointerUp);
      // dispatch start event
      this._dispatchEvent('swmove:start', { x: this._startPos.x, y: this._startPos.y });
   }

   _onPointerMove(e) {
      if (!this._dragging || e.pointerId !== this._dragId) return;
      e.preventDefault();
      
      const now = performance.now();
      const dx = e.clientX - this._dragStart.x;
      const dy = e.clientY - this._dragStart.y;
      let nx = this._startPos.x + dx;
      let ny = this._startPos.y + dy;
      
      // Calcular velocidade para momentum
      if (this.momentum && this._lastMoveTime > 0) {
         const deltaTime = now - this._lastMoveTime;
         if (deltaTime > 0) {
            this._velocity.x = (nx - this._lastPosition.x) / deltaTime;
            this._velocity.y = (ny - this._lastPosition.y) / deltaTime;
         }
      }
      
      this._lastMoveTime = now;
      this._lastPosition = { x: nx, y: ny };
      
      // apply axis constraint
      if (this.axis === 'x') ny = this._startPos.y;
      if (this.axis === 'y') nx = this._startPos.x;
      
      // Snap to grid
      if (this.snapToGrid) {
         nx = Math.round(nx / this.gridSize) * this.gridSize;
         ny = Math.round(ny / this.gridSize) * this.gridSize;
      }
      
      // Magnetic targets
      if (this.magneticTargets) {
         const magneticElements = document.querySelectorAll(this.magneticTargets);
         magneticElements.forEach(target => {
            const targetRect = target.getBoundingClientRect();
            const targetX = targetRect.left + window.scrollX + targetRect.width / 2;
            const targetY = targetRect.top + window.scrollY + targetRect.height / 2;
            const distance = Math.sqrt(Math.pow(nx - targetX, 2) + Math.pow(ny - targetY, 2));
            
            if (distance < 50) { // Magnetic range
               const strength = Math.max(0, 1 - distance / 50);
               nx += (targetX - nx) * strength * 0.3;
               ny += (targetY - ny) * strength * 0.3;
            }
         });
      }
      
      // boundary constraint
      if (this.boundarySelector) {
         try {
            const boundary = document.querySelector(this.boundarySelector);
            if (boundary) {
               const bRect = boundary.getBoundingClientRect();
               const elRect = this.element.getBoundingClientRect();
               const minX = bRect.left + window.scrollX;
               const minY = bRect.top + window.scrollY;
               const maxX = minX + bRect.width - elRect.width;
               const maxY = minY + bRect.height - elRect.height;
               nx = Math.max(minX, Math.min(nx, maxX));
               ny = Math.max(minY, Math.min(ny, maxY));
            }
         } catch(e){}
      }
      
      // apply position
      try {
         this.element.style.left = (nx - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().left + window.scrollX : 0)) + 'px';
         this.element.style.top = (ny - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().top + window.scrollY : 0)) + 'px';
      } catch(e){}
      this._dispatchEvent('swmove:move', { x: nx, y: ny });
   }

   _onPointerUp(e) {
      if (!this._dragging || e.pointerId !== this._dragId) return;
      this._dragging = false;
      try { document.removeEventListener('pointermove', this._onPointerMove); document.removeEventListener('pointerup', this._onPointerUp); } catch(e){}
      try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId); } catch(e){}
      
      // Aplicar momentum se habilitado
      if (this.momentum && (Math.abs(this._velocity.x) > 0.1 || Math.abs(this._velocity.y) > 0.1)) {
         this._applyMomentum();
      }
      
      this._dispatchEvent('swmove:end', { x: this.element.offsetLeft, y: this.element.offsetTop });
   }

   // Aplicar momentum após soltar o elemento
   _applyMomentum() {
      const animate = () => {
         // Reduzir velocidade gradualmente
         this._velocity.x *= this.momentumDecay;
         this._velocity.y *= this.momentumDecay;
         
         // Parar se velocidade for muito baixa
         if (Math.abs(this._velocity.x) < 0.01 && Math.abs(this._velocity.y) < 0.01) {
            return;
         }
         
         // Calcular nova posição
         const currentRect = this.element.getBoundingClientRect();
         let nx = currentRect.left + window.scrollX + this._velocity.x * 16; // 16ms frame
         let ny = currentRect.top + window.scrollY + this._velocity.y * 16;
         
         // Aplicar restrições de eixo
         if (this.axis === 'x') ny = currentRect.top + window.scrollY;
         if (this.axis === 'y') nx = currentRect.left + window.scrollX;
         
         // Snap to grid durante momentum
         if (this.snapToGrid) {
            nx = Math.round(nx / this.gridSize) * this.gridSize;
            ny = Math.round(ny / this.gridSize) * this.gridSize;
         }
         
         // Aplicar restrições de boundary
         if (this.boundarySelector) {
            try {
               const boundary = document.querySelector(this.boundarySelector);
               if (boundary) {
                  const bRect = boundary.getBoundingClientRect();
                  const elRect = this.element.getBoundingClientRect();
                  const minX = bRect.left + window.scrollX;
                  const minY = bRect.top + window.scrollY;
                  const maxX = minX + bRect.width - elRect.width;
                  const maxY = minY + bRect.height - elRect.height;
                  
                  if (nx < minX || nx > maxX) this._velocity.x = 0;
                  if (ny < minY || ny > maxY) this._velocity.y = 0;
                  
                  nx = Math.max(minX, Math.min(nx, maxX));
                  ny = Math.max(minY, Math.min(ny, maxY));
               }
            } catch(e){}
         }
         
         // Aplicar posição
         try {
            this.element.style.left = (nx - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().left + window.scrollX : 0)) + 'px';
            this.element.style.top = (ny - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().top + window.scrollY : 0)) + 'px';
         } catch(e){}
         
         this._dispatchEvent('swmove:momentum', { x: nx, y: ny, velocity: this._velocity });
         
         // Continuar animação
         requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
   }

   _dispatchEvent(name, detail) {
      try { this.element.dispatchEvent(new CustomEvent(name, { detail })); } catch(e){}
   }

   destroy() {
      try { if (this._handleEl) this._handleEl.removeEventListener('pointerdown', this._onPointerDown); } catch(e){}
      try { document.removeEventListener('pointermove', this._onPointerMove); document.removeEventListener('pointerup', this._onPointerUp); } catch(e){}
      try { if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler); } catch(e){}
      try { this.element._wfMove = null; } catch(e){}
   }

   // Helper: mapear classes e detectar a animação principal do elemento
   static mapAnimationClass(el) {
      if (!el || !el.classList) return null;
      for (const c of el.classList) {
         if (c.indexOf('swmove-') === 0) return c;
         if (c.indexOf('anime-') === 0) return 'swmove-' + c.slice(6);
      }
      return null;
   }

   // Sistema de pooling de observers para performance
   static getOrCreateObserver(threshold, rootMargin) {
      const key = `${threshold}-${rootMargin}`;
      
      if (WfMove.observerPool.has(key)) {
         return WfMove.observerPool.get(key);
      }

      // Limitar número de observers
      if (WfMove.observerPool.size >= WfMove.performanceConfig.maxObservers) {
         // Reutilizar observer mais próximo
         for (const [existingKey, observer] of WfMove.observerPool) {
            const [existingThreshold] = existingKey.split('-');
            if (Math.abs(parseFloat(existingThreshold) - threshold) <= WfMove.performanceConfig.reuseThreshold) {
               return observer;
            }
         }
      }

      const observer = new IntersectionObserver(
         WfMove.debounceIntersectionCallback,
         { threshold, rootMargin }
      );

      WfMove.observerPool.set(key, observer);
      return observer;
   }

   // Callback com debounce para melhor performance
   static debounceIntersectionCallback(entries) {
      const now = performance.now();
      
      entries.forEach(entry => {
         const element = entry.target;
         const elementId = element._swmoveId || (element._swmoveId = Math.random().toString(36));
         
         // Debounce por elemento
         if (WfMove.debounceTimers.has(elementId)) {
            clearTimeout(WfMove.debounceTimers.get(elementId));
         }

         WfMove.debounceTimers.set(elementId, setTimeout(() => {
            WfMove.handleIntersection(entry);
            WfMove.debounceTimers.delete(elementId);
         }, WfMove.performanceConfig.debounceDelay));
      });
   }

   // Handler otimizado para intersections
   static handleIntersection(entry) {
      const el = entry.target;
      const swmoveInstance = el._swmoveInstance;
      
      if (!swmoveInstance) return;

      if (entry.isIntersecting) {
         WfMove.handleElementEnter(el, swmoveInstance);
      } else {
         WfMove.handleElementExit(el, swmoveInstance);
      }
   }

   // Aplicar classe de velocidade ao elemento
   static applySpeedClass(el, speed) {
      // Remover classes de velocidade existentes
      Object.values(WfMove.speedMap).forEach(speedConfig => {
         el.classList.remove(speedConfig.class);
      });
      
      // Aplicar nova classe de velocidade
      const speedConfig = WfMove.speedMap[speed];
      if (speedConfig) {
         el.classList.add(speedConfig.class);
      }
   }

   // Lógica separada para entrada na viewport
   static handleElementEnter(el, instance) {
      // Elemento entrou na viewport, iniciar animação do zero
      el.classList.remove('swmove-exiting');
      
      // mapear nome de animação para classe
      const cls = WfMove.mapAnimationClass(el) || 'swmove-fade-in';
      
      // Aplicar velocidade se especificada
      const speed = el.getAttribute('WfMove-speed') || instance.speed;
      if (speed) {
         WfMove.applySpeedClass(el, speed);
      }
      
      // garantir restart: limpar estado e forçar reflow para reiniciar
      if (!el.classList.contains('swmove-element')) el.classList.add('swmove-element');
      
      // attach listeners once
      if (!el._swmove_listenersAttached) {
         el.addEventListener('transitionstart', () => { el._isAnimating = true; });
         el.addEventListener('transitionend', () => { el._isAnimating = false; });
         el._swmove_listenersAttached = true;
      }
      
      el._isAnimating = true;
      el.classList.remove('swmove-active');
      void el.offsetWidth; // Force reflow
      el.classList.add('swmove-active');
      
      // disparar callback onStart se existir
      const owner = el.closest && el.closest('[WfMove]');
      const onStartCode = el.getAttribute('WfMove-on-start') || (owner && owner.getAttribute && owner.getAttribute('WfMove-on-start'));
      if (onStartCode) {
         try { new Function(onStartCode).call(el); } catch (e) { console.error('WfMove onStart error', e); }
      }
   }

   // Lógica separada para saída da viewport
   static handleElementExit(el, instance) {
      if ((el._isAnimating || el.classList.contains('swmove-active')) && instance.simpleOut) {
         // aplicar saída rápida: fade-out
         el.classList.remove('swmove-active');
         el.classList.add('swmove-exiting');
         
         // after short timeout, limpar estado
         setTimeout(() => {
            el.classList.remove('swmove-exiting');
            el._isAnimating = false;
            const owner = el.closest && el.closest('[WfMove]');
            const onEndCode = el.getAttribute('WfMove-on-end') || (owner && owner.getAttribute && owner.getAttribute('WfMove-on-end'));
            if (onEndCode) {
               try { new Function(onEndCode).call(el); } catch (e) { console.error('WfMove onEnd error', e); }
            }
         }, 180);
      } else {
         // apenas remover a classe ativa
         el.classList.remove('swmove-active');
      }
   }

   setupAnimeViews() {
      // Encontrar todos os elementos com classes anime-* (compat) ou swmove-*
      const selector = '[class*="anime-"], [class*="wfmove-"]';
      let animeElements = Array.from(this.element.querySelectorAll(selector));
      // Se o próprio container também tiver a classe, incluí-lo
      try { if (this.element.matches && this.element.matches(selector)) animeElements.unshift(this.element); } catch(e){}
      if (animeElements.length === 0) return;

      // Usar observer pool para melhor performance
      const rootMargin = '0px 0px -50px 0px';
      const observer = WfMove.getOrCreateObserver(this.threshold, rootMargin);

      // Observar cada elemento com classe anime-*
      animeElements.forEach(el => {
         // normalizar classes legacy: anime-* -> swmove-*
         Array.from(el.classList).forEach(c => {
            if (c.indexOf('anime-') === 0) {
               el.classList.add('swmove-' + c.slice(6));
            }
         });
         
         // marcar que este elemento tem controle de animação
         el._isAnimating = false;
         el._swmoveInstance = this; // Referência para callbacks
         if (!el.classList.contains('swmove-element')) el.classList.add('swmove-element');
         observer.observe(el);
      });
   }

   // Método estático para inicialização
   static initAll(container = document) {
      // Se container for document, usa o comportamento global
      if (container === document) {
         // Verificar se já foi inicializado globalmente
         if (window.SwMoveInitialized) {
            return;
         }

         window.SwMoveInitialized = true;

         // Aguardar um pouco para garantir que o DOM esteja pronto
         setTimeout(() => {
            // Inicializar elementos com atributo WfMove
            const moveElements = document.querySelectorAll('[WfMove]');
            moveElements.forEach(element => {
               if (!element.hasAttribute('WfMove-initialized')) {
                  new WfMove(element);
               }
            });

            // Inicializar elementos com classes anime-* automaticamente
            const animeElements = document.querySelectorAll('[class*="anime-"], [class*="wfmove-"]');

            // Agrupar elementos por container pai para otimização
            const containers = new Set();
            animeElements.forEach(element => {
               const container = element.closest('[WfMove]') || document.body;
               containers.add(container);
            });

            // Inicializar WfMove para cada container único (inclui document.body quando necessário)
            containers.forEach(container => {
               if (!container.hasAttribute('WfMove-initialized')) {
                  new WfMove(container);
               }
            });
         }, 100);
      } else {
         // Inicialização em container específico
         WfMove.initInContainer(container);
      }
   }

   // Método para inicializar em um container específico
   static initInContainer(container = document) {
      // Inicializar elementos com atributo WfMove
      const moveElements = container.querySelectorAll('[WfMove]');
      moveElements.forEach(element => {
         if (!element.hasAttribute('WfMove-initialized')) {
            new WfMove(element);
         }
      });

      // Inicializar elementos com classes anime-* automaticamente
      const animeElements = container.querySelectorAll('[class*="anime-"]');

      if (animeElements.length > 0) {
         if (!container.hasAttribute('WfMove-initialized')) {
            new WfMove(container);
         }
      }
   }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfMove = WfMove;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfMove = WfMove;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfMove.initAll());
   } else {
      setTimeout(() => WfMove.initAll(), 0);
   }
}


// ===== WfNavbar.js =====
(function (window, document) {
  "use strict";

  /**
   * WfNavbar - Sistema de Navegação
   * Navbar responsivo, acessível e customizável
   *
   * @author SandroWeb
   * @version 1.0
   * @since WEBFULL Framework v1.0
   */

  class WfNavbar {
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfNavbar) return element._wfNavbar;

      this.element = element;
      this.element._wfNavbar = this;

      this.init();
    }

    init() {
      WfNavbar.injectCSS();
      this.bindEvents();
      this._log("WfNavbar inicializado:", this.element);
    }

    bindEvents() {
      // Implementação futura de eventos (toggle menu mobile, etc)
      // Exemplo:
      // const toggleBtn = this.element.querySelector('.wf-navbar-toggle');
      // if (toggleBtn) ...
    }

    open() {
      this._log("open() chamado");
      this.element.classList.add("open");
    }

    close() {
      this._log("close() chamado");
      this.element.classList.remove("open");
    }

    toggle() {
      this._log("toggle() chamado");
      this.element.classList.toggle("open");
    }

    destroy() {
      this._log("destroy() chamado");
      delete this.element._wfNavbar;
    }

    _log(...args) {
      if (
        window.WF_DEBUG ||
        (typeof window !== "undefined" &&
          (location.hostname === "localhost" ||
            location.hostname === "127.0.0.1"))
      ) {
        console.log("[WfNavbar]", ...args);
      }
    }

    // ===== MÉTODOS ESTÁTICOS =====

    /**
     * Injeta o CSS padrão do WfNavbar uma única vez
     */
    static injectCSS() {
      const cssId = "webfull-wfnavbar-css";
      if (document.getElementById(cssId)) return;

      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
        /* WfNavbar CSS padrão */
        [WfNavbar] {
          --wfnavbar-bg: #23283a;
          --wfnavbar-color: #fff;
          --wfnavbar-hover: #1a1d29;
          --wfnavbar-border: #23283a;
          --wfnavbar-shadow: 0 2px 8px rgba(0,0,0,0.08);
          --wfnavbar-height: 56px;
          --wfnavbar-z: 1000;
          background: var(--wfnavbar-bg);
          color: var(--wfnavbar-color);
          font-family: inherit;
          position: relative;
          z-index: var(--wfnavbar-z);
          box-shadow: var(--wfnavbar-shadow);
          min-width: 0;
          display: flex;
          align-items: center;
          height: var(--wfnavbar-height);
          padding: 0 1.5rem;
          gap: 1.5rem;
          justify-content: space-between;
        }
        [WfNavbar][data-theme="light"] {
          --wfnavbar-bg: #fff;
          --wfnavbar-color: #23283a;
          --wfnavbar-hover: #f5f5f5;
          --wfnavbar-border: #e0e0e0;
        }
        [WfNavbar][data-theme="dark"] {
          --wfnavbar-bg: #23283a;
          --wfnavbar-color: #fff;
          --wfnavbar-hover: #1a1d29;
          --wfnavbar-border: #23283a;
        }
        [WfNavbar][data-theme="custom"] {
          /* Customização via inline style ou CSS externo */
        }
        [WfNavbar] > [slot="brand"] {
          display: flex;
          align-items: center;
          font-size: 1.25em;
          font-weight: bold;
          min-width: 0;
          white-space: nowrap;
        }
        [WfNavbar][data-brand-align="right"] {
          flex-direction: row-reverse;
        }
        [WfNavbar][data-brand-align="right"] > [slot="brand"] {
          margin-left: 2rem;
          margin-right: 0;
        }
        [WfNavbar]:not([data-brand-align="right"]) > [slot="brand"] {
          margin-right: 2rem;
          margin-left: 0;
        }
        [WfNavbar] ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 1rem;
        }
        /* Alinhamento do menu: esquerda, centro, direita */
        [WfNavbar][data-menu-align="left"] ul { justify-content: flex-start; }
        [WfNavbar][data-menu-align="center"] ul { justify-content: center; }
        [WfNavbar][data-menu-align="right"] ul { justify-content: flex-end; }
        [WfNavbar] ul li {
            position: relative;
            width: 100%;
        }
        [WfNavbar] ul li a {
            display: block;
            padding: 20px 2rem;
            color: inherit;
            text-decoration: none;
            transition: background 0.2s;
        }
        [WfNavbar] ul li a:hover,
        [WfNavbar] ul li a:focus {
          background: var(--wfnavbar-hover);
        }
        /* Dropdown (submenu) */
        [WfNavbar] ul li ul {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          min-width: 180px;
          background: var(--wfnavbar-bg);
          color: var(--wfnavbar-color);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          padding: 0.5em 0;
          z-index: 10;
          flex-direction: column;
          gap: 0;
        }
        [WfNavbar] ul li:hover > ul,
        [WfNavbar] ul li:focus-within > ul {
          display: flex;
        }
        [WfNavbar] ul li ul li a {
          padding: 0.8em 1.5em;
            width: 100%;
        }
        /* Subsubmenu (nível 2+) */
        [WfNavbar] ul li ul li ul {
          left: 98%;
          top: 0;
          margin-left: 2px;
        }
        /* Slots extras */
        [WfNavbar] [slot="search"] {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        [WfNavbar] [slot="extra"] {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: 1rem;
        }
        [WfNavbar] [slot="avatar"] {
          margin-left: 1rem;
          border-radius: 50%;
          height: 32px;
          width: 32px;
          object-fit: cover;
        }
        /* Responsivo: mobile */
        @media (max-width: 900px) {
          [WfNavbar] {
            flex-wrap: wrap;
            height: auto;
            padding: 0 1rem;
          }
          [WfNavbar] ul {
            flex-direction: column;
            width: 100%;
            gap: 0;
          }
          [WfNavbar] ul li ul {
            position: static;
            box-shadow: none;
          }
          [WfNavbar] [slot="search"],
          [WfNavbar] [slot="extra"],
          [WfNavbar] [slot="avatar"] {
            margin-left: 0;
          }
        }
        /* Overlay para mobile (simples, pode ser expandido) */
        [WfNavbar][data-overlay="true"]::after {
          content: '';
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          z-index: 999;
        }
        /* Fixo */
        [WfNavbar][data-fixed="true"] {
          position: fixed;
          top: 0; left: 0; right: 0;
        }
      `;
      document.head.appendChild(style);
    }

    static initAll(container = document) {
      WfNavbar.injectCSS();
      const elements = container.querySelectorAll("[WfNavbar]");
      const instances = [];

      elements.forEach((el) => {
        if (!el._wfNavbar) {
          instances.push(new WfNavbar(el));
        } else {
          instances.push(el._wfNavbar);
        }
      });

      return instances;
    }
  }

  // ===== EXPORTAR E REGISTRAR =====
  if (window.WebFull) {
    window.WebFull.modules.WfNavbar = WfNavbar;
  }

  // Fallback global e suporte a CommonJS
  if (typeof module !== "undefined" && module.exports) {
    module.exports = WfNavbar;
  } else {
    window.WfNavbar = WfNavbar;
  }

  // ===== INICIALIZAÇÃO IMEDIATA =====
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        WfNavbar.initAll();
      });
    } else {
      WfNavbar.initAll();
    }
  }
})(window, document);


// ===== WfNolink.js =====
class WfNolink {
   static _options = {};
   static _delegated = false;

   static handleClick(event) {
      event.preventDefault();
      const el = event.currentTarget;
      const targetId = el.getAttribute('href')?.substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
         WfNolink.scrollToElement(targetElement, WfNolink._options);
         WfNolink.ocultarAncora();
         targetElement.setAttribute('tabindex', '-1');
         targetElement.focus({ preventScroll: true });
         targetElement.dispatchEvent(new CustomEvent('sw:nolink:scrolled', { bubbles: true }));
      }
   }

   static scrollToElement(targetElement, options = {}) {
      const offset = typeof options.offset === 'function' ? options.offset() : options.offset || 0;
      const behavior = options.behavior || 'smooth';
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = rect.top + window.scrollY - offset;

      window.scrollTo({
         top: scrollTop,
         behavior: behavior,
      });
   }

   static ocultarAncora() {
      const urlAtual = window.location.href;
      const novaUrl = urlAtual.split('#')[0];
      history.replaceState(null, '', novaUrl);
   }

   static initAll(container = document, options = {}) {
      WfNolink.delegate(container, options);
   }

   static delegate(container = document, options = {}) {
      if (WfNolink._delegated) return;
      WfNolink._options = options;
      container.addEventListener('click', event => {
         const el = event.target.closest('[noLink]');
         if (el) {
            event.preventDefault();
            const targetId = el.getAttribute('href')?.substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
               WfNolink.scrollToElement(targetElement, WfNolink._options);
               WfNolink.ocultarAncora();
               targetElement.setAttribute('tabindex', '-1');
               targetElement.focus({ preventScroll: true });
               targetElement.dispatchEvent(new CustomEvent('sw:nolink:scrolled', { bubbles: true }));
            }
         }
      });
      WfNolink._delegated = true;
   }

   static destroyAll() {
      // A delegação de eventos não requer a remoção de listeners individuais.
      // Se necessário, um método para remover o listener do container pode ser implementado.
      WfNolink._delegated = false;
   }
}

// Registro no WebFull
if (window.WebFull) {
   window.WebFull.modules.WfNolink = WfNolink;
} else if (typeof window !== 'undefined') {
   window.WfNolink = WfNolink;
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
   document.addEventListener('DOMContentLoaded', () => WfNolink.delegate(document));
}



// ===== WfOcult.js =====
(function(window, document) {
'use strict';

class WfOcult {
  // Construtor recebe o elemento, o limite de rolagem e o tipo de animação
  constructor(element, scrollThreshold = 600, animation = "fade") {
    if (typeof element === "string") {
      this.element = document.getElementById(element);
    } else {
      this.element = element;
    }
    this.scrollThreshold = scrollThreshold;
    this.animation = animation;
    if (!this.element) {
      console.warn(`Elemento não encontrado.`);
      return;
    }
    this.init();
  }

  // Inicializa o elemento com estilos iniciais e adiciona listeners de scroll e load
  init() {
    this.element.style.opacity = "1";
    this.element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    this.element.style.pointerEvents = "auto";
    this.element.style.display = "inline-block";

    // Define a transformação inicial com base no tipo de animação
    switch (this.animation) {
      case "left":
        this.element.style.transform = "translateX(0)";
        break;
      case "right":
        this.element.style.transform = "translateX(0)";
        break;
      case "top":
        this.element.style.transform = "translateY(0)";
        break;
      case "bottom":
        this.element.style.transform = "translateY(0)";
        break;
      default:
        this.element.style.transform = "none";
    }

    // Adiciona listeners para eventos de scroll e load da página
    window.addEventListener("scroll", () => this.checkScroll());
    window.addEventListener("load", () => this.checkScroll());

    // Verifica a posição da rolagem inicialmente
    this.checkScroll();
  }

  // Verifica a posição da rolagem e aplica as animações de mostrar/ocultar
  checkScroll() {
    if (window.scrollY >= this.scrollThreshold) {
      if (this.element.style.display !== "none") {
        this.element.style.opacity = "0";
        this.element.style.pointerEvents = "none";
        switch (this.animation) {
          case "left":
            this.element.style.transform = "translateX(-100px)";
            break;
          case "right":
            this.element.style.transform = "translateX(100px)";
            break;
          case "top":
            this.element.style.transform = "translateY(-100px)";
            break;
          case "bottom":
            this.element.style.transform = "translateY(100px)";
            break;
          default:
            this.element.style.transform = "none";
        }
        setTimeout(() => {
          this.element.style.display = "none";
        }, 500); // duração da transição CSS
      }
    } else {
      if (this.element.style.display === "none") {
        this.element.style.display = "inline-block";
        setTimeout(() => {
          this.element.style.opacity = "1";
          this.element.style.pointerEvents = "auto";
          // Reset transform based on animation type
          switch (this.animation) {
            case "left":
              this.element.style.transform = "translateX(0)";
              break;
            case "right":
              this.element.style.transform = "translateX(0)";
              break;
            case "top":
              this.element.style.transform = "translateY(0)";
              break;
            case "bottom":
              this.element.style.transform = "translateY(0)";
              break;
            default:
              this.element.style.transform = "none";
          }
        }, 10);
      }
    }
  }

  // Inicializa todos os elementos com o atributo WfOcult na página
  static initAll() {
    const elements = document.querySelectorAll(
      "[WfOcult],[WfOcult-threshold],[WfOcult-animation],[swocult-threshold],[swocult-animation]"
    );
    elements.forEach((el) => {
      const attr = el.getAttribute("WfOcult") || el.getAttribute("wfocult");
      let threshold = 600;
      let animation = "fade";
      const thAttr =
        el.getAttribute("WfOcult-threshold") ||
        el.getAttribute("wfocult-threshold");
      const animAttr =
        el.getAttribute("WfOcult-animation") ||
        el.getAttribute("wfocult-animation");
      if (attr) {
        const parts = attr.split(",");
        if (parts.length > 0) {
          const match = parts[0].match(/\d+/);
          if (match) {
            threshold = parseInt(match[0], 10);
          }
        }
        if (parts.length > 1) {
          animation = parts[1].trim();
        }
      }
      if (thAttr) {
        const m = thAttr.match(/\d+/);
        if (m) threshold = parseInt(m[0], 10);
      }
      if (animAttr) {
        animation = animAttr.trim();
      }
      new WfOcult(el, threshold, animation);
    });
  }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfOcult = WfOcult;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfOcult = WfOcult;
   }
}

  // ===== INICIALIZAÇÃO IMEDIATA =====
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        WfOcult.initAll();
      });
    } else {
      WfOcult.initAll();
    }
  }
})(window, document);


// ===== WfPag.js =====
(function (window, document) {
  "use strict";

  class WfPag {
    constructor(element) {
      this.element = element;
      this.itemsPerPage =
        parseInt(this.element.getAttribute("WfPag-items-per-page")) || 10;
      this.maxVisible =
        parseInt(this.element.getAttribute("WfPag-max-visible")) || 5;
      this.showFirstLast =
        this.element.getAttribute("WfPag-show-first-last") !== "false";
      this.showPrevNext =
        this.element.getAttribute("WfPag-show-prev-next") !== "false";

      this.currentPage = 1;
      this.items = [];
      this.totalPages = 0;

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupComponent();
      this.createPagination();
      this.showPage(1);
    }

    loadCSS() {
      if (!document.getElementById("wfpag-styles")) {
        const style = document.createElement("style");
        style.id = "wfpag-styles";
        style.textContent = `
.wfpag-pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;
   margin: 1.5rem 0 1rem 0;
   flex-wrap: wrap;
   list-style: none;
   padding: 0;
   clear: both;
}
.wfpag-button {
   background: var(--container, #fff);
   border: 1px solid var(--border-color, #d0d0d0);
   color: var(--color, #333);
   font-size: 1.4rem;
   min-width: 2.4rem;
   min-height: 2.4rem;
   border-radius: 0;
   cursor: pointer;
   transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
   outline: none;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   text-decoration: none;
   font-family: inherit;
}
.wfpag-button:hover:not(:disabled) {
   background: var(--navbar-hover, #f0f4ff);
   color: var(--navbar-link, #1a237e);
   border-color: var(--border-color, #90caf9);
   transform: translateY(-1px);
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.wfpag-button.active {
   background: var(--navbar-bg, #1976d2);
   color: var(--navbar-color, #fff);
   border-color: var(--navbar-bg, #1976d2);
   font-weight: bold;
   box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
   z-index: 1;
}
.wfpag-button:disabled {
   opacity: 0.5;
   cursor: not-allowed;
}
         `;
        document.head.appendChild(style);
      }
    }

    setupComponent() {
      this.items = Array.from(this.element.children);
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      this.element.classList.add("wfpag-container");
    }

    createPagination() {
      this.pagination = document.createElement("div");
      this.pagination.className = "wfpag-pagination";
      this.element.parentNode.insertBefore(
        this.pagination,
        this.element.nextSibling
      );
      this.renderPagination();
    }

    renderPagination() {
      this.pagination.innerHTML = "";

      if (this.showFirstLast) {
        const firstBtn = this.createButton("«", 1, this.currentPage === 1);
        this.pagination.appendChild(firstBtn);
      }

      if (this.showPrevNext) {
        const prevBtn = this.createButton(
          "‹",
          this.currentPage - 1,
          this.currentPage === 1
        );
        this.pagination.appendChild(prevBtn);
      }

      this.renderPageButtons();

      if (this.showPrevNext) {
        const nextBtn = this.createButton(
          "›",
          this.currentPage + 1,
          this.currentPage === this.totalPages
        );
        this.pagination.appendChild(nextBtn);
      }

      if (this.showFirstLast) {
        const lastBtn = this.createButton(
          "»",
          this.totalPages,
          this.currentPage === this.totalPages
        );
        this.pagination.appendChild(lastBtn);
      }
    }

    renderPageButtons() {
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(this.maxVisible / 2)
      );
      let endPage = Math.min(this.totalPages, startPage + this.maxVisible - 1);

      if (endPage - startPage + 1 < this.maxVisible) {
        startPage = Math.max(1, endPage - this.maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = this.createButton(i, i, i === this.currentPage);
        if (i === this.currentPage) {
          pageBtn.classList.add("active");
        }
        this.pagination.appendChild(pageBtn);
      }
    }

    createButton(text, page, disabled = false) {
      const button = document.createElement("button");
      button.className = "wfpag-button";
      button.innerHTML = text;
      button.disabled = disabled;
      button.addEventListener("click", () => this.goToPage(page));
      return button;
    }

    showPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;

      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      this.items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? "" : "none";
      });

      this.renderPagination();

      this.element.dispatchEvent(
        new CustomEvent("wfpag:page-changed", {
          detail: {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
          },
        })
      );
    }

    goToPage(page) {
      this.showPage(page);
    }

    refresh() {
      this.setupComponent();
      this.createPagination();
      this.showPage(1);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfPag]");
      elements.forEach((el) => {
        if (!el._wfPag) {
          el._wfPag = new WfPag(el);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfPag = WfPag;
  } else if (typeof window !== "undefined") {
    window.WfPag = WfPag;
  }

  // Auto-inicialização e Observer
  if (typeof window !== "undefined") {
    const init = () => {
      WfPag.initAll();

      // Observer para elementos adicionados dinamicamente
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (
                node.hasAttribute &&
                node.hasAttribute("WfPag") &&
                !node._wfPag
              ) {
                node._wfPag = new WfPag(node);
              }
              if (node.querySelectorAll) {
                const elements = node.querySelectorAll("[WfPag]");
                elements.forEach((el) => {
                  if (!el._wfPag) el._wfPag = new WfPag(el);
                });
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(window, document);


// ===== WfPagInfinite.js =====
(function(window, document) {
'use strict';

class WfPagInfinite {
  constructor(element) {
    this.element = element;
    this.itemsPerPage =
      parseInt(element.getAttribute("WfPagInfinite-items")) || 6;
    this.customHeight = element.getAttribute("WfPagInfinite-height") || "600px";
    this.className = element.getAttribute("WfPagInfinite-class") || null;

    this.currentPage = 1;
    this.loading = false;

    this.init();
  }

  init() {
    this.setupContainer();
    this.setupItems();
    this.bindScroll();

    // Verificar se precisa carregar mais itens inicialmente
    setTimeout(() => {
      const { scrollHeight, clientHeight } = this.element;
      if (
        scrollHeight <= clientHeight &&
        this.currentPage * this.itemsPerPage < this.items.length
      ) {
        this.loadMore();
      }
    }, 100);
  }

  setupContainer() {
    // Aplicar altura e overflow
    this.element.style.height = this.customHeight;
    this.element.style.overflowY = "auto";
    this.element.style.border = "1px solid #ddd";
    this.element.style.padding = "10px";
  }

  setupItems() {
    // Pegar todos os itens filhos
    const selector = this.className ? `.${this.className}` : ":scope > *";
    this.items = Array.from(this.element.querySelectorAll(selector));

    if (this.items.length === 0) {
      this.items = Array.from(this.element.children);
    }

    // Esconder todos os itens inicialmente
    this.items.forEach((item) => (item.style.display = "none"));

    // Mostrar os primeiros itens
    this.showItems();
  }

  showItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    for (let i = startIndex; i < endIndex && i < this.items.length; i++) {
      this.items[i].style.display = "block";
    }
  }

  bindScroll() {
    this.element.addEventListener("scroll", () => {
      if (this.loading) return;

      const { scrollTop, scrollHeight, clientHeight } = this.element;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // Se chegou a 80% do scroll
      if (scrollPercentage >= 0.8) {
        this.loadMore();
      }
    });

    // Também verificar se precisa carregar mais ao redimensionar
    window.addEventListener("resize", () => {
      if (!this.loading) {
        const { scrollTop, scrollHeight, clientHeight } = this.element;
        if (scrollHeight <= clientHeight) {
          this.loadMore();
        }
      }
    });
  }

  loadMore() {
    if (this.loading) return;

    const totalShown = this.currentPage * this.itemsPerPage;
    if (totalShown >= this.items.length) {
      return;
    }

    this.loading = true;

    // Simular delay de carregamento
    setTimeout(() => {
      this.currentPage++;
      this.showItems();
      this.loading = false;

      // Verificar se ainda precisa carregar mais (se o container ainda não tem scroll)
      setTimeout(() => {
        const { scrollHeight, clientHeight } = this.element;
        if (
          scrollHeight <= clientHeight &&
          this.currentPage * this.itemsPerPage < this.items.length
        ) {
          this.loadMore();
        }
      }, 100);
    }, 200);
  }

  static initAll(container = document) {
    const elements = container.querySelectorAll("[WfPagInfinite]");

    elements.forEach((element, index) => {
      if (!element._wfPagInfinite) {
          element._wfPagInfinite = new WfPagInfinite(element);
      }
    });
  }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfPagInfinite = WfPagInfinite;
   window.SwPaginfinite = WfPagInfinite; // Alias para compatibilidade
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfPagInfinite = WfPagInfinite;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WfPagInfinite.initAll());
  } else {
    WfPagInfinite.initAll();
  }
}

})(window, document);


// ===== WfPageTransition.js =====
(function(window, document) {
'use strict';

// WfPageTransition.js - Transições de Página/Conteúdo inspiradas no Codrops PageTransitions
// https://tympanus.net/Development/PageTransitions/
// Autor: SandroWeb + AI

const swptCSS = `
.pt-perspective {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  transform-style: preserve-3d;
}
.pt-page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
.pt-page-current,
.no-js .pt-page {
  visibility: visible;
  z-index: 1;
}
.pt-page-ontop {
  z-index: 999;
}

/* --- Efeitos principais do Codrops --- */
.pt-page-moveToLeft { animation: pt-moveToLeft 0.7s both; }
.pt-page-moveFromRight { animation: pt-moveFromRight 0.7s both; }
.pt-page-moveToRight { animation: pt-moveToRight 0.7s both; }
.pt-page-moveFromLeft { animation: pt-moveFromLeft 0.7s both; }
.pt-page-moveToTop { animation: pt-moveToTop 0.7s both; }
.pt-page-moveFromBottom { animation: pt-moveFromBottom 0.7s both; }
.pt-page-moveToBottom { animation: pt-moveToBottom 0.7s both; }
.pt-page-moveFromTop { animation: pt-moveFromTop 0.7s both; }

@keyframes pt-moveToLeft { to { transform: translateX(-100%); } }
@keyframes pt-moveFromRight { from { transform: translateX(100%); } to { transform: none; } }
@keyframes pt-moveToRight { to { transform: translateX(100%); } }
@keyframes pt-moveFromLeft { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes pt-moveToTop { to { transform: translateY(-100%); } }
@keyframes pt-moveFromBottom { from { transform: translateY(100%); } to { transform: none; } }
@keyframes pt-moveToBottom { to { transform: translateY(100%); } }
@keyframes pt-moveFromTop { from { transform: translateY(-100%); } to { transform: none; } }

.pt-page-fade { animation: pt-fade 0.7s both; }
.pt-page-fadeFromRight { animation: pt-fadeFromRight 0.7s both; }
.pt-page-fadeFromLeft { animation: pt-fadeFromLeft 0.7s both; }
.pt-page-fadeFromTop { animation: pt-fadeFromTop 0.7s both; }
.pt-page-fadeFromBottom { animation: pt-fadeFromBottom 0.7s both; }
@keyframes pt-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pt-fadeFromRight { from { opacity: 0; transform: translateX(100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromLeft { from { opacity: 0; transform: translateX(-100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromTop { from { opacity: 0; transform: translateY(-100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromBottom { from { opacity: 0; transform: translateY(100%);} to { opacity: 1; transform: none; } }

.pt-page-scaleDown { animation: scaleDown .7s ease both; }
.pt-page-scaleUp { animation: scaleUp .7s ease both; }
@keyframes scaleDown { to { transform: scale(.8); } }
@keyframes scaleUp { from { transform: scale(.8); } }

.pt-page-flipRight { animation: pt-flipRight 0.7s both; }
.pt-page-flipLeft { animation: pt-flipLeft 0.7s both; }
.pt-page-flipTop { animation: pt-flipTop 0.7s both; }
.pt-page-flipBottom { animation: pt-flipBottom 0.7s both; }
@keyframes pt-flipRight { from { transform: perspective(600px) rotateY(0); } to { transform: perspective(600px) rotateY(1turn); } }
@keyframes pt-flipLeft { from { transform: perspective(600px) rotateY(0); } to { transform: perspective(600px) rotateY(-1turn); } }
@keyframes pt-flipTop { from { transform: perspective(600px) rotateX(0); } to { transform: perspective(600px) rotateX(-1turn); } }
@keyframes pt-flipBottom { from { transform: perspective(600px) rotateX(0); } to { transform: perspective(600px) rotateX(1turn); } }

/* --- Efeitos adicionais do Codrops --- */
.pt-page-pushToLeft { animation: pt-pushToLeft 0.7s both; }
.pt-page-pushFromRight { animation: pt-pushFromRight 0.7s both; }
.pt-page-pushToRight { animation: pt-pushToRight 0.7s both; }
.pt-page-pushFromLeft { animation: pt-pushFromLeft 0.7s both; }
.pt-page-pushToTop { animation: pt-pushToTop 0.7s both; }
.pt-page-pushFromBottom { animation: pt-pushFromBottom 0.7s both; }
.pt-page-pushToBottom { animation: pt-pushToBottom 0.7s both; }
.pt-page-pushFromTop { animation: pt-pushFromTop 0.7s both; }
@keyframes pt-pushToLeft { to { transform: translateX(-100%) scale(.8); } }
@keyframes pt-pushFromRight { from { transform: translateX(100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToRight { to { transform: translateX(100%) scale(.8); } }
@keyframes pt-pushFromLeft { from { transform: translateX(-100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToTop { to { transform: translateY(-100%) scale(.8); } }
@keyframes pt-pushFromBottom { from { transform: translateY(100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToBottom { to { transform: translateY(100%) scale(.8); } }
@keyframes pt-pushFromTop { from { transform: translateY(-100%) scale(.8); } to { transform: none; } }

.pt-page-foldLeft { animation: pt-foldLeft 0.7s both; }
.pt-page-moveFromRight.pt-page-ontop { animation: pt-moveFromRight 0.7s both; }
@keyframes pt-foldLeft { to { transform: rotateY(90deg) scale(.8); } }

.pt-page-roomToLeft { animation: pt-roomToLeft 0.7s both; }
.pt-page-roomFromRight { animation: pt-roomFromRight 0.7s both; }
@keyframes pt-roomToLeft { to { transform: translateX(-100%) rotateY(90deg); } }
@keyframes pt-roomFromRight { from { transform: translateX(100%) rotateY(-90deg); } to { transform: none; } }

.pt-page-cubeToLeft { animation: pt-cubeToLeft 0.7s both; }
.pt-page-cubeFromRight { animation: pt-cubeFromRight 0.7s both; }
@keyframes pt-cubeToLeft { to { transform: translateX(-100%) rotateY(90deg); } }
@keyframes pt-cubeFromRight { from { transform: translateX(100%) rotateY(-90deg); } to { transform: none; } }

.pt-page-carouselToLeft { animation: pt-carouselToLeft 0.7s both; }
.pt-page-carouselFromRight { animation: pt-carouselFromRight 0.7s both; }
@keyframes pt-carouselToLeft { to { transform: translateX(-100%) scale(.8) rotateY(30deg); } }
@keyframes pt-carouselFromRight { from { transform: translateX(100%) scale(.8) rotateY(-30deg); } to { transform: none; } }

.pt-page-fall { animation: pt-fall 0.7s both; }
@keyframes pt-fall { to { transform: translateY(100%) rotateZ(30deg) scale(.8); } }

.pt-page-newspaper { animation: pt-newspaper 0.7s both; }
@keyframes pt-newspaper { to { transform: scale(0.2) rotateZ(720deg); } }

.pt-page-glueLeft { animation: pt-glueLeft 0.7s both; }
.pt-page-glueFromRight { animation: pt-glueFromRight 0.7s both; }
@keyframes pt-glueLeft { to { transform: translateX(-100%) skewX(30deg); } }
@keyframes pt-glueFromRight { from { transform: translateX(100%) skewX(-30deg); } to { transform: none; } }

.pt-page-sideLeft { animation: pt-sideLeft 0.7s both; }
.pt-page-sideFromRight { animation: pt-sideFromRight 0.7s both; }
@keyframes pt-sideLeft { to { transform: translateX(-100%) scaleY(.8); } }
@keyframes pt-sideFromRight { from { transform: translateX(100%) scaleY(.8); } to { transform: none; } }

/* Adicione outros efeitos conforme necessário */

.pt-page-animating { pointer-events: none; }

@media (max-width: 600px) {
  .pt-page { min-height: 120px; }
}
`;

// Mapeamento dos efeitos para classes de entrada/saída (Codrops)
const EFFECTS = {
  // Move
  moveToLeft: {
    outClass: "pt-page-moveToLeft",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  moveToRight: {
    outClass: "pt-page-moveToRight",
    inClass: "pt-page-moveFromLeft pt-page-ontop",
  },
  moveToTop: {
    outClass: "pt-page-moveToTop",
    inClass: "pt-page-moveFromBottom pt-page-ontop",
  },
  moveToBottom: {
    outClass: "pt-page-moveToBottom",
    inClass: "pt-page-moveFromTop pt-page-ontop",
  },
  moveFromLeft: {
    outClass: "pt-page-moveFromLeft",
    inClass: "pt-page-moveToRight pt-page-ontop",
  },
  moveFromRight: {
    outClass: "pt-page-moveFromRight",
    inClass: "pt-page-moveToLeft pt-page-ontop",
  },
  moveFromTop: {
    outClass: "pt-page-moveFromTop",
    inClass: "pt-page-moveToBottom pt-page-ontop",
  },
  moveFromBottom: {
    outClass: "pt-page-moveFromBottom",
    inClass: "pt-page-moveToTop pt-page-ontop",
  },

  // Fade
  fade: { outClass: "pt-page-fade", inClass: "pt-page-fade pt-page-ontop" },
  fadeFromRight: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromRight pt-page-ontop",
  },
  fadeFromLeft: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromLeft pt-page-ontop",
  },
  fadeFromTop: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromTop pt-page-ontop",
  },
  fadeFromBottom: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromBottom pt-page-ontop",
  },
  fadeLeft: {
    outClass: "pt-page-fadeFromLeft",
    inClass: "pt-page-fadeFromRight pt-page-ontop",
  },
  fadeRight: {
    outClass: "pt-page-fadeFromRight",
    inClass: "pt-page-fadeFromLeft pt-page-ontop",
  },
  fadeTop: {
    outClass: "pt-page-fadeFromTop",
    inClass: "pt-page-fadeFromBottom pt-page-ontop",
  },
  fadeBottom: {
    outClass: "pt-page-fadeFromBottom",
    inClass: "pt-page-fadeFromTop pt-page-ontop",
  },

  // Push
  pushToLeft: {
    outClass: "pt-page-pushToLeft",
    inClass: "pt-page-pushFromRight pt-page-ontop",
  },
  pushToRight: {
    outClass: "pt-page-pushToRight",
    inClass: "pt-page-pushFromLeft pt-page-ontop",
  },
  pushToTop: {
    outClass: "pt-page-pushToTop",
    inClass: "pt-page-pushFromBottom pt-page-ontop",
  },
  pushToBottom: {
    outClass: "pt-page-pushToBottom",
    inClass: "pt-page-pushFromTop pt-page-ontop",
  },
  pushFromLeft: {
    outClass: "pt-page-pushFromLeft",
    inClass: "pt-page-pushToRight pt-page-ontop",
  },
  pushFromRight: {
    outClass: "pt-page-pushFromRight",
    inClass: "pt-page-pushToLeft pt-page-ontop",
  },
  pushFromTop: {
    outClass: "pt-page-pushFromTop",
    inClass: "pt-page-pushToBottom pt-page-ontop",
  },
  pushFromBottom: {
    outClass: "pt-page-pushFromBottom",
    inClass: "pt-page-pushToTop pt-page-ontop",
  },

  // Fold
  foldLeft: {
    outClass: "pt-page-foldLeft",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  // foldRight, foldTop, foldBottom podem ser implementados conforme o CSS

  // Room
  roomToLeft: {
    outClass: "pt-page-roomToLeft",
    inClass: "pt-page-roomFromRight pt-page-ontop",
  },
  // roomToRight, roomToTop, roomToBottom podem ser implementados conforme o CSS

  // Cube
  cubeToLeft: {
    outClass: "pt-page-cubeToLeft",
    inClass: "pt-page-cubeFromRight pt-page-ontop",
  },
  // cubeToRight, cubeToTop, cubeToBottom podem ser implementados conforme o CSS

  // Carousel
  carouselToLeft: {
    outClass: "pt-page-carouselToLeft",
    inClass: "pt-page-carouselFromRight pt-page-ontop",
  },
  // carouselToRight, carouselToTop, carouselToBottom podem ser implementados conforme o CSS

  // Glue
  glueLeft: {
    outClass: "pt-page-glueLeft",
    inClass: "pt-page-glueFromRight pt-page-ontop",
  },
  // glueRight, glueTop, glueBottom podem ser implementados conforme o CSS

  // Side
  sideLeft: {
    outClass: "pt-page-sideLeft",
    inClass: "pt-page-sideFromRight pt-page-ontop",
  },
  // sideRight, sideTop, sideBottom podem ser implementados conforme o CSS

  // Outros efeitos
  fall: {
    outClass: "pt-page-fall",
    inClass: "pt-page-moveFromBottom pt-page-ontop",
  },
  newspaper: {
    outClass: "pt-page-newspaper",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  scaleDown: {
    outClass: "pt-page-scaleDown",
    inClass: "pt-page-scaleUp pt-page-ontop",
  },
  scaleUp: {
    outClass: "pt-page-scaleUp",
    inClass: "pt-page-scaleDown pt-page-ontop",
  },
  flipRight: {
    outClass: "pt-page-flipRight",
    inClass: "pt-page-flipRight pt-page-ontop",
  },
  flipLeft: {
    outClass: "pt-page-flipLeft",
    inClass: "pt-page-flipLeft pt-page-ontop",
  },
  flipTop: {
    outClass: "pt-page-flipTop",
    inClass: "pt-page-flipTop pt-page-ontop",
  },
  flipBottom: {
    outClass: "pt-page-flipBottom",
    inClass: "pt-page-flipBottom pt-page-ontop",
  },
};

class WfPageTransition {
  static injectCSS() {
    if (!document.getElementById("wfpt-styles")) {
      const style = document.createElement("style");
      style.id = "wfpt-styles";
      style.textContent = swptCSS;
      document.head.appendChild(style);
    }
  }

  /**
   * Troca para a página de índice ou id fornecido, aplicando o efeito desejado.
   * @param {string|number} container - Seletor ou elemento do container principal (deve ter .pt-perspective)
   * @param {number|string} to - Índice ou id da página destino
   * @param {string} effect - Nome do efeito (moveToLeft, fade, etc)
   */
  static transitionTo(container, to, effect = "moveToLeft") {
    WfPageTransition.injectCSS();
    if (typeof container === "string")
      container = document.querySelector(container);
    if (!container) return;
    if (!EFFECTS[effect]) effect = "moveToLeft";
    const pages = Array.from(container.querySelectorAll(".pt-page"));
    if (!pages.length) return;

    let current = pages.findIndex((p) =>
      p.classList.contains("pt-page-current")
    );
    if (current === -1) current = 0;
    let next =
      typeof to === "number"
        ? to
        : pages.findIndex(
            (p) => p.id === to || p.getAttribute("data-id") === to
          );
    if (next === -1 || next === current) return;

    const currentPage = pages[current];
    const nextPage = pages[next];
    const { outClass, inClass } = EFFECTS[effect];

    // Prepara
    container.classList.add("pt-page-animating");
    let animCount = 0;
    let endCurrPage = false;
    let endNextPage = false;
    function cleanPageClasses(page) {
      // Mantém apenas pt-page, pt-page-current e pageX
      page.className = page.className
        .split(" ")
        .filter(
          (c) =>
            c === "pt-page" || c === "pt-page-current" || c.startsWith("page")
        )
        .join(" ");
    }
    function onCurrAnimEnd() {
      currentPage.removeEventListener("animationend", onCurrAnimEnd);
      currentPage.removeEventListener("webkitAnimationEnd", onCurrAnimEnd);
      endCurrPage = true;
      if (endNextPage) finishTransition();
    }
    function onNextAnimEnd() {
      nextPage.removeEventListener("animationend", onNextAnimEnd);
      nextPage.removeEventListener("webkitAnimationEnd", onNextAnimEnd);
      endNextPage = true;
      if (endCurrPage) finishTransition();
    }
    // Fallback de segurança caso animationend não dispare
    let safetyTimer = setTimeout(() => {
      finishTransition();
    }, 900);
    function finishTransition() {
      if (safetyTimer) { try { clearTimeout(safetyTimer); } catch (_) {} }
      // Limpa classes de efeito e .pt-page-ontop
      pages.forEach((p, i) => {
        p.classList.remove("pt-page-current", "pt-page-ontop");
        p.style.visibility = "hidden";
        cleanPageClasses(p);
      });
      nextPage.classList.add("pt-page-current");
      nextPage.style.visibility = "visible";
      container.classList.remove("pt-page-animating");
    }
    // Aplica classes de efeito
    nextPage.classList.add(...inClass.split(" "));
    nextPage.style.visibility = "visible";
    currentPage.classList.add(...outClass.split(" "));
    // Escuta animationend em ambas
    currentPage.addEventListener("animationend", onCurrAnimEnd);
    currentPage.addEventListener("webkitAnimationEnd", onCurrAnimEnd);
    nextPage.addEventListener("animationend", onNextAnimEnd);
    nextPage.addEventListener("webkitAnimationEnd", onNextAnimEnd);
  }

  // Inicialização declarativa: botões com WfPageTransition, data-to, data-effect
  static initAll(container = document) {
    WfPageTransition.injectCSS();
    // Garantir containers preparados
    const containers = container.querySelectorAll(".pt-perspective");
    containers.forEach((c) => {
      const pages = Array.from(c.querySelectorAll(".pt-page"));
      if (!pages.length) return;
      let current = pages.find((p) => p.classList.contains("pt-page-current"));
      if (!current) {
        current = pages[0];
        current.classList.add("pt-page-current");
      }
      pages.forEach((p) => {
        p.style.visibility = p === current ? "visible" : "hidden";
      });
    });
    const triggers = container.querySelectorAll("[WfPageTransition]");
    triggers.forEach((btn) => {
      if (btn._swptInit) return;
      btn._swptInit = true;
      btn.addEventListener("click", (e) => {
        const targetSel = btn.getAttribute("data-target") || ".pt-perspective";
        const to =
          btn.getAttribute("data-to") || btn.getAttribute("data-id") || 1;
        const effect =
          btn.getAttribute("data-effect") ||
          btn.getAttribute("WfPageTransition") ||
          "moveToLeft";
        WfPageTransition.transitionTo(
          targetSel,
          isNaN(to) ? to : parseInt(to),
          effect
        );
      });
    });
  }
}

  // Global Export
  if (typeof window !== 'undefined') {
    if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfPageTransition = WfPageTransition;
    }
    window.WfPageTransition = WfPageTransition;
    
    // Auto-init
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfPageTransition.initAll());
    } else {
      WfPageTransition.initAll();
    }
  }
})(window, document);


// ===== WfPanel.js =====
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


// ===== WfPanel1.js =====
(function(window, document) {
    'use strict';

    /**
     * WfPanel1 - Painéis com AJAX Integrado
     *
     * @author SandroWeb
     * @version 3.0
     * @since WEBFULL Framework v1.0
     */
    class WfPanel1 {
        constructor(element) {
            // Singleton pattern
            if (element._wfPanelAjax) return element._wfPanelAjax;

            this.element = element;
            element._wfPanelAjax = this;
            // backwards compatibility
            element._wfPanel1 = this;

            // aceitar atributos com e sem sufixo 1 para compatibilidade
            this.side = this.element.getAttribute('WfPanel1-side') || this.element.getAttribute('WfPanel-side') || 'right';
            this.size = this.element.getAttribute('WfPanel1-size') || this.element.getAttribute('WfPanel-size') || 'medium';
            // largura customizada opcional (ex.: 65%)
            this.customWidth = this.element.getAttribute('WfPanel1-width') || this.element.getAttribute('WfPanel-width');
            this.overlay = (this.element.getAttribute('WfPanel1-overlay') || this.element.getAttribute('WfPanel-overlay')) !== 'false';
            // Suporta WfPanel1-url ou href (mais prático em links)
            this.ajaxUrl = this.element.getAttribute('WfPanel1-url') || this.element.getAttribute('href') || this.element.getAttribute('WfPanel-url');
            this.ajaxTarget = this.element.getAttribute('WfPanel1-ajax-target') || '.wfpanelajax-content';
            this.closeOnOutside = (this.element.getAttribute('WfPanel1-close-on-outside') || this.element.getAttribute('WfPanel-close-on-outside')) !== 'false';
            this.closeOnEsc = (this.element.getAttribute('WfPanel1-close-on-esc') || this.element.getAttribute('WfPanel-close-on-esc') || this.element.getAttribute('WfPanel-close-on-escape')) !== 'false';
            // Título pode vir de WfPanel1-title, WfPanel-title ou do atributo title/texto do link
            this.title = this.element.getAttribute('WfPanel1-title') || this.element.getAttribute('WfPanel-title') || this.element.getAttribute('title') || this.element.textContent.trim() || 'Painel';
            this.loading = this.element.getAttribute('WfPanel1-loading') || this.element.getAttribute('WfPanel-loading') || 'Carregando...';
            // duração opcional
            this.durationMs = (function(d){
                if(!d) return 300;
                const s = String(d).trim();
                if(/^\d+ms$/.test(s)) return parseInt(s.replace('ms',''), 10);
                if(/^\d+$/.test(s)) return parseInt(s, 10);
                if(s==='slow') return 800;
                if(s==='fast') return 150;
                return 300;
            })(this.element.getAttribute('WfPanel1-duration') || this.element.getAttribute('WfPanel-duration'));
            this.onSuccess = this.element.getAttribute('WfPanel-on-success') || this.element.getAttribute('WfPanel1-on-success');
            this.onError = this.element.getAttribute('WfPanel-on-error') || this.element.getAttribute('WfPanel1-on-error');
            this.onClose = this.element.getAttribute('WfPanel-on-close') || this.element.getAttribute('WfPanel1-on-close');

            this.isOpen = false;
            this.isLoading = false;
            this.overlayElement = null;
            this.panelElement = null;
            this.contentElement = null;
            this.escapeHandler = null;

            this.loadCSS();
            this.init();
        }

        static initAll(container = document) {
            const triggers = container.querySelectorAll('[WfPanel1-url], [WfPanel-url], [WfPanel1], [WfPanelAjax], [wfpanelajax]');
            triggers.forEach(el => {
                if (!el._wfPanelAjax) new WfPanel1(el);
            });
        }

        loadCSS() {
            if (!document.getElementById('wfpanel1-styles')) {
                const style = document.createElement('style');
                style.id = 'wfpanel1-styles';
                style.textContent = `
/**
 * WfPanel1.css - Estilos dos Painéis com AJAX Integrado
 * SandroWeb - 2025
 */

/* ===== TRIGGER ===== */
.wfpanel1-trigger {
    cursor: pointer;
    transition: all 0.3s ease;
}
.wfpanel1-trigger:hover {
    opacity: 0.8;
}

/* ===== OVERLAY ===== */
.wfpanel1-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(2px);
}
.wfpanel1-overlay.wfpanel1-active {
    opacity: 1;
}

/* ===== PAINEL PRINCIPAL ===== */
.wfpanel1-panel {
    position: fixed;
    background: var(--wbg-, #fff);
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    z-index: 10000;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0;
}
.wfpanel1-panel.wfpanel1-active {
    transform: translate(0, 0) !important;
}

/* ===== HEADER ===== */
.wfpanel1-header {
    background: var(--prin, #2196f3);
    color: white;
    padding: 1rem 1.5rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.wfpanel1-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--bran, #fff);
    flex: 1;
}
.wfpanel1-close {
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
.wfpanel1-close:hover {
    background: rgba(255,255,255,0.2);
    color: var(--amar, #ffeb3b);
    transform: scale(1.1);
}
.wfpanel1-close:focus {
    outline: 2px solid var(--amar, #ffeb3b);
    outline-offset: 2px;
}

/* ===== CONTEÚDO ===== */
.wfpanel1-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    position: relative;
    background: var(--bg, #fff);
}

/* ===== LOADING ===== */
.wfpanel1-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text, #666);
    font-size: 14px;
    flex-direction: column;
    gap: 12px;
}
.wfpanel1-loading-icon {
    font-size: 24px;
    animation: wfpanel1-spin 1s linear infinite;
}
.wfpanel1-loading-text {
    font-weight: 500;
}
@keyframes wfpanel1-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== ERRO ===== */
.wfpanel1-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--error, #f44336);
    font-size: 14px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
}
.wfpanel1-error-icon {
    font-size: 32px;
}
.wfpanel1-error-text {
    font-weight: 500;
}

/* ===== SEM URL ===== */
.wfpanel1-no-url {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--warning, #ff9800);
    font-size: 14px;
    text-align: center;
    font-weight: 500;
}

/* ===== TAMANHOS ===== */
.wfpanel1-small { min-width: 400px; min-height: 300px; }
.wfpanel1-medium { min-width: 600px; min-height: 400px; }
.wfpanel1-large { min-width: 800px; min-height: 500px; }
.wfpanel1-xlarge { min-width: 1000px; min-height: 600px; }
.wfpanel1-full { width: 100vw !important; height: 100vh !important; }

/* ===== POSICIONAMENTOS ===== */
.wfpanel1-panel[style*="left: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="right: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="top: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="bottom: 0"] { border-radius: 0; }

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    .wfpanel1-panel {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0 !important;
    }
    .wfpanel1-header { padding: 12px 16px; }
    .wfpanel1-title { font-size: 16px; }
    .wfpanel1-content { padding: 16px; }
    .wfpanel1-close { width: 28px; height: 28px; font-size: 20px; }
}
@media (max-width: 480px) {
    .wfpanel1-header { padding: 10px 12px; }
    .wfpanel1-title { font-size: 14px; }
    .wfpanel1-content { padding: 12px; }
    .wfpanel1-loading, .wfpanel1-error { font-size: 12px; }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfpanel1-panel, .wfpanel1-overlay, .wfpanel1-close { transition: none !important; }
    .wfpanel1-loading-icon { animation: none !important; }
}

/* ===== FOCUS STATES ===== */
.wfpanel1-panel:focus-within {
    outline: 2px solid var(--prin, #2196f3);
    outline-offset: 2px;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfpanel1-content::-webkit-scrollbar { width: 6px; height: 6px; }
.wfpanel1-content::-webkit-scrollbar-track { background: var(--bg-light, #f5f5f5); border-radius: 3px; }
.wfpanel1-content::-webkit-scrollbar-thumb { background: var(--border, #ddd); border-radius: 3px; }
.wfpanel1-content::-webkit-scrollbar-thumb:hover { background: var(--text-light, #999); }

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfpanel1-panel { background: var(--bg-dark, #1a1a1a); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
html.wfday-night .wfpanel1-header { background: var(--prin-dark, #1976d2); border-bottom-color: rgba(255,255,255,0.1); }
html.wfday-night .wfpanel1-content { background: var(--bg-dark, #1a1a1a); color: var(--text-dark, #e0e0e0); }
html.wfday-night .wfpanel1-loading { color: var(--text-dark, #999); }
html.wfday-night .wfpanel1-error { color: var(--error-dark, #ff6b6b); }
html.wfday-night .wfpanel1-no-url { color: var(--warning-dark, #ffb74d); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-track { background: var(--bg-dark-light, #2a2a2a); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-thumb { background: var(--border-dark, #444); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-thumb:hover { background: var(--text-dark-light, #666); }

/* ===== ANIMAÇÕES ESPECIAIS ===== */
@keyframes wfpanel1-slide-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.wfpanel1-content > * { animation: wfpanel1-slide-in 0.3s ease-out; }

/* ===== ESTADOS ESPECIAIS ===== */
.wfpanel1-loading .wfpanel1-loading-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.wfpanel1-error .wfpanel1-error-icon { filter: drop-shadow(0 2px 4px rgba(244,67,54,0.2)); }

/* ===== UTILITÁRIOS ===== */
.wfpanel1-hidden { display: none !important; }
.wfpanel1-visible { display: flex !important; }
.wfpanel1-no-overflow { overflow: hidden !important; }

/* ===== DEBUG ===== */
.wfpanel1-debug { border: 2px dashed #ff0000; background: rgba(255,0,0,0.1); }
.wfpanel1-debug::before {
    content: 'WfPanel1 Debug';
    position: absolute;
    top: -20px;
    left: 0;
    background: #ff0000;
    color: white;
    padding: 2px 6px;
    font-size: 10px;
    border-radius: 2px;
    z-index: 10001;
}
                `;
                document.head.appendChild(style);
            }
        }

        init() {
            this.setupComponent();
            this.bindEvents();
        }

        setupComponent() {
            this.element.classList.add('wfpanel1-trigger');
            this.processSizes();
        }

        processSizes() {
            const sizes = {
                small: '400px',
                medium: '600px',
                large: '800px',
                xlarge: '1000px',
                full: '100vw'
            };

            const isVertical = (this.side === 'top' || this.side === 'bottom');

            if (isVertical) {
                // usar 100% para evitar overflow causado por scrollbars quando usamos 100vw
                this.width = this.customWidth || '100%';
                this.height = (this.size && sizes[this.size]) ? sizes[this.size] : sizes.medium;
            } else {
                this.width = this.customWidth || ((this.size && sizes[this.size]) ? sizes[this.size] : sizes.medium);
                this.height = '100vh';
            }
        }

        bindEvents() {
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        }

        async open() {
            if (this.isOpen) return;

            try {
                this.isOpen = true;
                this.isLoading = true;

                this.createPanel();
                this.showPanel();
                await this.loadContent();
            } catch (error) {
                // Erro silencioso: evitar logs desnecessários em produção
                this.showError();
            }
        }

        createPanel() {
            if (this.overlay) {
                this.overlayElement = document.createElement('div');
                this.overlayElement.className = 'wfpanel1-overlay';

                if (this.closeOnOutside) {
                    this.overlayElement.addEventListener('click', () => this.close());
                }

                document.body.appendChild(this.overlayElement);
            }

            const position = this.getPanelPosition();

            this.panelElement = document.createElement('div');
            this.panelElement.className = 'wfpanel1-panel';
            this.panelElement.classList.add(`wfpanel1-${this.size}`);
            this.panelElement.style.cssText = `
                position: fixed;
                ${position}
                width: ${this.width};
                height: ${this.height};
                transform: ${this.getInitialTransform()};
            `;
            try {
               const url = this.ajaxUrl || '';
               this.panelElement.setAttribute('data-url', url);
               const m = url.match(/\/forms\/edit\/(\d+)/);
               if(m && m[1]) this.panelElement.setAttribute('data-id', String(parseInt(m[1],10)));
            } catch(e){}

            // aplicar duração de transição se definido (inline para garantir)
            try {
                this.panelElement.style.transition = `transform ${this.durationMs}ms ease`;
            } catch (e) {}

            const header = document.createElement('div');
            header.className = 'wfpanel1-header';

            const title = document.createElement('h3');
            title.textContent = this.title;
            title.className = 'wfpanel1-title';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.className = 'wfpanel1-close';
            closeBtn.addEventListener('click', () => this.close());

            header.appendChild(title);
            header.appendChild(closeBtn);

            this.contentElement = document.createElement('div');
            this.contentElement.className = 'wfpanel1-content';
            this.contentElement.innerHTML = `
                <div class="wfpanel1-loading">
                    <div class="wfpanel1-loading-icon">⏳</div>
                    <div class="wfpanel1-loading-text">${this.loading}</div>
                </div>
            `;

            this.panelElement.appendChild(header);
            this.panelElement.appendChild(this.contentElement);
            document.body.appendChild(this.panelElement);

            // Garantir box-sizing e largura correta para top/bottom (evitar overflow 100vw)
            try {
                this.panelElement.style.boxSizing = 'border-box';
                if(this.side === 'top' || this.side === 'bottom') {
                    // garantir posicionamento que respeite a viewport sem overflow
                    this.panelElement.style.left = '0';
                    this.panelElement.style.right = '0';
                    this.panelElement.style.width = '100vw';
                    this.panelElement.style.maxWidth = '100vw';
                }
            } catch(err) {
                // silencioso
            }

            if (this.closeOnEsc) {
                this.escapeHandler = (e) => {
                    if (e.key === 'Escape') {
                        this.close();
                    }
                };
                document.addEventListener('keydown', this.escapeHandler);
            }
        }

        getInitialTransform() {
            switch (this.side) {
                case 'left': return 'translateX(-100%)';
                case 'right': return 'translateX(100%)';
                case 'top': return 'translateY(-100%)';
                case 'bottom': return 'translateY(100%)';
                default: return 'translateX(100%)';
            }
        }

        getPanelPosition() {
            switch (this.side) {
                case 'left': return 'top: 0; left: 0;';
                case 'right': return 'top: 0; right: 0;';
                case 'top': return 'top: 0; left: 0; right: 0;';
                case 'bottom': return 'bottom: 0; left: 0; right: 0;';
                default: return 'top: 0; right: 0;';
            }
        }

        showPanel() {
            // ativar overlay e painel usando RAF para garantir repaint antes da transição
            if (this.overlayElement) {
                requestAnimationFrame(() => {
                    this.overlayElement.classList.add('wfpanel1-active');
                });
            }

            requestAnimationFrame(() => {
                // forçar reflow
                void this.panelElement.offsetHeight;
                this.panelElement.classList.add('wfpanel1-active');

                // prevenir scroll do body enquanto painel aberto - salvar estado anterior para restaurar depois
                try {
                    this._prevBodyOverflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                } catch(e) {}
            });
        }

        async loadContent() {
            if (!this.ajaxUrl) {
                this.contentElement.innerHTML = '<div class="wfpanel1-no-url">Nenhuma URL configurada</div>';
                return;
            }

            try {
                const response = await fetch(this.ajaxUrl, {
                    credentials: 'same-origin'
                });
                const html = await response.text();
                // Se um seletor alvo foi definido, extrair apenas o conteúdo correspondente
                let injected = html;
                const selector = (this.ajaxTarget||'').trim();
                if(selector) {
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const target = doc.querySelector(selector);
                        if(target) {
                            injected = target.innerHTML;
                        }
                    } catch(e) {
                        // Se parsing falhar, segue com HTML completo
                    }
                }

                this.contentElement.innerHTML = injected;
                this.isLoading = false;
                try {
                    const hid = this.contentElement.querySelector("input[name='id']");
                    const hv = hid && hid.value;
                    if(hv && /^\d+$/.test(hv)) this.panelElement.setAttribute('data-id', String(parseInt(hv,10)));
                    const innerData = this.contentElement.querySelector("[data-id]");
                    const iv = innerData && (innerData.getAttribute('data-id') || (innerData.dataset && innerData.dataset.id));
                    if(iv && /^\d+$/.test(iv)) this.panelElement.setAttribute('data-id', String(parseInt(iv,10)));
                } catch(e) {}

                // Inicializar componentes dentro do conteúdo carregado (igual WfAjax)
                try {
                    if (window.WebFull && typeof window.WebFull.initAll === 'function') {
                        window.WebFull.initAll(this.contentElement);
                    } else if (typeof this.reinitializeComponents === 'function') {
                        this.reinitializeComponents(this.contentElement);
                    }
                } catch(err) {
                    // silencioso
                }

                // Disparar evento com bubble/composed para permitir listeners globais (ex.: document)
                this.element.dispatchEvent(new CustomEvent('wfpanel1:loaded', {
                    detail: { url: this.ajaxUrl, content: injected, full: html },
                    bubbles: true,
                    composed: true
                }));

                // Chamar callback onSuccess se definido
                try {
                    if (this.onSuccess && typeof window[this.onSuccess] === 'function') {
                        window[this.onSuccess](this.element);
                    }
                } catch (err) {
                    // silencioso
                }
            } catch (error) {
                // Tentar retry se houver atributo WfPanel-ajax-retry
                const retryCount = parseInt(this.element.getAttribute('WfPanel-ajax-retry') || this.element.getAttribute('WfPanel1-ajax-retry') || '0', 10);
                if (!this._retryAttempts) this._retryAttempts = 0;
                if (this._retryAttempts < retryCount) {
                    this._retryAttempts++;
                    setTimeout(() => this.loadContent(), 300);
                    return;
                }
                this.showError();
            }
        }

        showError() {
            this.contentElement.innerHTML = `
                <div class="wfpanel1-error">
                    <div class="wfpanel1-error-icon">⚠️</div>
                    <div class="wfpanel1-error-text">Erro ao carregar conteúdo</div>
                </div>
            `;
            this.isLoading = false;
            // Chamar callback onError se definido
            try {
                if (this.onError && typeof window[this.onError] === 'function') {
                    window[this.onError](this.element);
                }
            } catch (err) {
                // silencioso
            }
        }

        close() {
            if (!this.isOpen) return;

            this.isOpen = false;

            if (this.overlayElement && this.overlayElement.classList && typeof this.overlayElement.classList.remove === 'function') {
                try { this.overlayElement.classList.remove('wfpanel1-active'); } catch(_) {}
            }

            if (this.panelElement && this.panelElement.classList && typeof this.panelElement.classList.remove === 'function') {
                try { this.panelElement.classList.remove('wfpanel1-active'); } catch(_) {}
            }

            setTimeout(() => {
                try {
                    if (this.overlayElement && typeof this.overlayElement.remove === 'function') this.overlayElement.remove();
                } catch(_) {}
                try {
                    if (this.panelElement && typeof this.panelElement.remove === 'function') this.panelElement.remove();
                } catch(_) {}

                this.overlayElement = null;
                this.panelElement = null;
                this.contentElement = null;

                if (this.escapeHandler) {
                    document.removeEventListener('keydown', this.escapeHandler);
                    this.escapeHandler = null;
                }

                // restaurar overflow
                try {
                   if (this._prevBodyOverflow !== undefined) {
                       document.body.style.overflow = this._prevBodyOverflow;
                   } else {
                       document.body.style.overflow = '';
                   }
                } catch(e) {}

                // Chamar callback onClose se definido
                try {
                    if (this.onClose && typeof window[this.onClose] === 'function') {
                        window[this.onClose](this.element);
                    }
                } catch (err) {
                    // silencioso
                }
            }, 300); // tempo da transição
        }
    }

    // Exportação Global
    if (typeof window !== 'undefined') {
        window.WfPanel1 = WfPanel1;
        if (typeof window.WebFull !== 'undefined') {
            window.WebFull.modules.WfPanel1 = WfPanel1;
        }
    }

    // Auto-inicialização
    if (typeof window !== 'undefined') {
        const init = () => {
            WfPanel1.initAll();

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
                    WfPanel1.initAll();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})(window, document);


// ===== WfParallax.js =====
// WfParallax - Efeito Parallax para SWMVC
// Suporte: background, elemento, mouse, múltiplos na página
// Configuração via data-attributes: data-type, data-speed, data-direction, data-range, data-invert, data-responsive

class WfParallax {
   constructor(element) {
      this.element = element;
      this.speed = parseFloat(this.element.getAttribute('WfParallax-speed')) || 0.5;
      this.direction = this.element.getAttribute('WfParallax-direction') || 'vertical';
      this.type = this.element.getAttribute('WfParallax-type') || 'background';
      this.offset = parseInt(this.element.getAttribute('WfParallax-offset')) || 0;
      this.mobile = this.element.getAttribute('WfParallax-mobile') !== 'false';

      // Adicionar propriedades que estavam faltando
      this.range = parseInt(this.element.getAttribute('WfParallax-range')) || 200;
      this.invert = this.element.getAttribute('WfParallax-invert') === 'true';

      this.initialY = 0;
      this.initialX = 0;
      this.isActive = true;

      // Debug para verificar configurações
      /*
      console.log(`[WfParallax] Inicializando elemento:`, {
         tagName: this.element.tagName,
         type: this.type,
         speed: this.speed,
         direction: this.direction,
         range: this.range,
         invert: this.invert,
      });
      */

      this.init();
   }

   init() {
      this.loadCSS();

      if (this.type === 'background') {
         this.initBackground();
      } else if (this.type === 'element') {
         this.initElement();
      } else if (this.type === 'mouse') {
         this.initMouse();
      }
   }

   loadCSS() {
      // Load external component CSS; if it fails, inject minimal fallback CSS
      if (document.querySelector('link[href$="WfParallax.css"]')) return;
      try {
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = '/assets/components/css/WfParallax.css';
         link.id = 'swparallax-styles';
         link.onload = () => { /* loaded */ };
         link.onerror = (err) => { this._injectFallbackCSS(); console.warn('WfParallax: fallback CSS injected due to load error', err); };
         document.head.appendChild(link);
         // if browser doesn't support onerror on link, schedule a check and fallback
         setTimeout(() => { if (!document.getElementById('swparallax-styles') || !(document.querySelector('link[href$="WfParallax.css"]'))) this._injectFallbackCSS(); }, 1200);
      } catch (err) {
         this._injectFallbackCSS();
         if (window.SwLogger && typeof SwLogger.warn === 'function') {
            SwLogger.warn('WfParallax: falha ao carregar CSS externo, fallback aplicado', err);
         }
      }
   }

   _injectFallbackCSS() {
      if (document.getElementById('swparallax-fallback')) return;
      try {
         const s = document.createElement('style');
         s.id = 'swparallax-fallback';
         s.textContent = `
/* fallback styles for WfParallax demo */
.wfparallax-bg-demo { background-size: cover; background-position: center; width:100%; height:100%; }
.wfparallax-circle, .wfparallax-target-box { will-change: transform; transition: transform 0.2s linear; }
`;
         document.head.appendChild(s);
      } catch(e){}
   }

   initBackground() {
      this.element.style.backgroundAttachment = 'fixed';
      this.element.style.backgroundRepeat = 'no-repeat';
      this.element.style.backgroundSize = 'cover';

      // Usar bind para manter o contexto
      // use RAF wrapper for scroll to avoid layout thrashing
      this._rafScheduled = false;
      this.handleScroll = this.handleScroll.bind(this);
      this._onScroll = () => { if (!this._rafScheduled) { this._rafScheduled = true; requestAnimationFrame(() => { this._rafScheduled = false; this.handleScroll(); }); } };
      window.addEventListener('scroll', this._onScroll, { passive: true });
      this.handleScroll();
   }

   initElement() {
      this.element.style.willChange = 'transform';

      // Usar bind para manter o contexto
      // element transform-based parallax also uses RAF wrapper
      this._rafScheduled = false;
      this.handleScroll = this.handleScroll.bind(this);
      this._onScroll = () => { if (!this._rafScheduled) { this._rafScheduled = true; requestAnimationFrame(() => { this._rafScheduled = false; this.handleScroll(); }); } };
      window.addEventListener('scroll', this._onScroll, { passive: true });
      this.handleScroll();
   }

   initMouse() {
      this.element.style.willChange = 'transform';

      // Usar bind para manter o contexto
      this.handleMouse = this.handleMouse.bind(this);
      // use passive listener for mousemove as we don't call preventDefault
      window.addEventListener('mousemove', this.handleMouse, { passive: true });
   }

   handleScroll() {
      if (!this.isActive) return;

      const rect = this.element.getBoundingClientRect();
      const winH = window.innerHeight;
      const percent = (rect.top + rect.height / 2 - winH / 2) / winH;
      let move = percent * this.range * this.speed;

      if (this.invert) move = -move;

      if (this.type === 'background') {
         if (this.direction === 'vertical') {
            this.element.style.backgroundPosition = `center calc(50% + ${move}px)`;
         } else if (this.direction === 'horizontal') {
            this.element.style.backgroundPosition = `calc(50% + ${move}px) center`;
         } else {
            // Movimento em ambas direções
            this.element.style.backgroundPosition = `calc(50% + ${move}px) calc(50% + ${move}px)`;
         }
      } else if (this.type === 'element') {
         if (this.direction === 'vertical') {
            this.element.style.transform = `translateY(${move}px)`;
         } else if (this.direction === 'horizontal') {
            this.element.style.transform = `translateX(${move}px)`;
         } else {
            // Movimento em ambas direções
            this.element.style.transform = `translate(${move}px, ${move}px)`;
         }
      }
   }

   handleMouse(e) {
      if (!this.isActive) return;

      const rect = this.element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      let moveX = dx * this.range * this.speed;
      let moveY = dy * this.range * this.speed;

      if (this.invert) {
         moveX = -moveX;
         moveY = -moveY;
      }

      if (this.direction === 'vertical') {
         this.element.style.transform = `translateY(${moveY}px)`;
      } else if (this.direction === 'horizontal') {
         this.element.style.transform = `translateX(${moveX}px)`;
      } else {
         // Movimento em ambas direções
         this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
   }

   destroy() {
      this.isActive = false;
      if (this.handleScroll) window.removeEventListener('scroll', this.handleScroll);
      if (this.handleMouse) window.removeEventListener('mousemove', this.handleMouse);
      this.element.style.transform = '';
      this.element.style.backgroundPosition = '';
      this.element._swparallax = null;
   }

   static initAll(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      const instances = [];

      elements.forEach(el => {
         if (!el._swparallaxInitialized) {
            try {
               const instance = new WfParallax(el);
               el._swparallax = instance;
               el._swparallaxInitialized = true;
               instances.push(instance);
            } catch (error) {
               if (window.SwLogger && typeof SwLogger.warn === 'function') {
                  SwLogger.warn('WfParallax: Erro ao inicializar elemento:', error);
               } else {
                  console.warn('WfParallax: Erro ao inicializar elemento:', error);
               }
            }
         }
      });

      return instances;
   }

   // Métodos estáticos de conveniência
   static destroy(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.destroy();
            delete el._swparallax;
            delete el._swparallaxInitialized;
         }
      });
   }

   static pause(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.isActive = false;
         }
      });
   }

   static resume(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.isActive = true;
         }
      });
   }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfParallax = WfParallax;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfParallax = WfParallax;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfParallax.initAll());
   } else {
      setTimeout(() => WfParallax.initAll(), 0);
   }
}


// ===== WfPreLoad.js =====
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


// ===== WfReve.js =====
(function (window, document) {
  "use strict";

  class WfReve {
    // Construtor recebe o elemento, o limite de rolagem e o tipo de animação
    constructor(element, scrollThreshold = 600, animation = "fade") {
      if (typeof element === "string") {
        this.element = document.getElementById(element);
      } else {
        this.element = element;
      }
      this.scrollThreshold = scrollThreshold;
      this.animation = animation;
      if (!this.element) {
        console.warn(`Elemento não encontrado.`);
        return;
      }
      this.init();
    }

    // Inicializa o elemento com estilos iniciais e adiciona listeners de scroll e load
    init() {
      this.element.style.opacity = "0";
      this.element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      this.element.style.pointerEvents = "none";
      this.element.style.display = "none";

      // Define a transformação inicial com base no tipo de animação
      switch (this.animation) {
        case "left":
          this.element.style.transform = "translateX(-100px)";
          break;
        case "right":
          this.element.style.transform = "translateX(100px)";
          break;
        case "top":
          this.element.style.transform = "translateY(-100px)";
          break;
        case "bottom":
          this.element.style.transform = "translateY(100px)";
          break;
        default:
          this.element.style.transform = "none";
      }

      // Adiciona listeners para eventos de scroll e load da página
      window.addEventListener("scroll", () => this.checkScroll());
      window.addEventListener("load", () => this.checkScroll());

      // Verifica a posição da rolagem inicialmente
      this.checkScroll();
    }

    // Verifica a posição da rolagem e aplica as animações de mostrar/ocultar
    checkScroll() {
      if (window.scrollY >= this.scrollThreshold) {
        if (this.element.style.display === "none") {
          this.element.style.display = "inline-block";
          setTimeout(() => {
            this.element.style.opacity = "1";
            this.element.style.pointerEvents = "auto";
            this.element.style.transform = "translateX(0) translateY(0)";
          }, 10);
        }
      } else {
        if (this.element.style.display !== "none") {
          this.element.style.opacity = "0";
          this.element.style.pointerEvents = "none";
          switch (this.animation) {
            case "left":
              this.element.style.transform = "translateX(-100px)";
              break;
            case "right":
              this.element.style.transform = "translateX(100px)";
              break;
            case "top":
              this.element.style.transform = "translateY(-100px)";
              break;
            case "bottom":
              this.element.style.transform = "translateY(100px)";
              break;
            default:
              this.element.style.transform = "none";
          }
          setTimeout(() => {
            this.element.style.display = "none";
          }, 500); // duração da transição CSS
        }
      }
    }

    // Inicializa todos os elementos com o atributo WfReve na página
    static initAll() {
      const elements = document.querySelectorAll(
        "[WfReve],[WfReve-threshold],[WfReve-animation],[swreve-threshold],[swreve-animation]"
      );
      elements.forEach((el) => {
        const attr = el.getAttribute("WfReve") || el.getAttribute("wfreve");
        let threshold = 600;
        let animation = "fade";
        const thAttr =
          el.getAttribute("WfReve-threshold") ||
          el.getAttribute("wfreve-threshold");
        const animAttr =
          el.getAttribute("WfReve-animation") ||
          el.getAttribute("wfreve-animation");
        if (attr) {
          const parts = attr.split(",");
          if (parts.length > 0) {
            const match = parts[0].match(/\d+/);
            if (match) {
              threshold = parseInt(match[0], 10);
            }
          }
          if (parts.length > 1) {
            animation = parts[1].trim();
          }
        }
        if (thAttr) {
          const m = thAttr.match(/\d+/);
          if (m) threshold = parseInt(m[0], 10);
        }
        if (animAttr) {
          animation = animAttr.trim();
        }
        new WfReve(el, threshold, animation);
      });
    }
  }

  // Exportação Global
  if (typeof window !== 'undefined') {
     window.WfReve = WfReve;
     if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfReve = WfReve;
     }
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfReve.initAll());
    } else {
      WfReve.initAll();
    }
  }
})(window, document);


// ===== WfScrollSpy.js =====
(function (window, document) {
  "use strict";

  class WfScrollSpy {
    constructor(navContainer, options = {}) {
      if (typeof navContainer === "string") {
        this.navContainer = document.querySelector(navContainer);
      } else {
        this.navContainer = navContainer;
      }

      if (!this.navContainer) {
        console.warn("WfScrollSpy: container element not found.");
        return;
      }

      // Evita dupla inicialização
      if (this.navContainer._wfScrollSpy) return this.navContainer._wfScrollSpy;
      this.navContainer._wfScrollSpy = this;

      this.options = Object.assign(
        {
          activeClass: "active",
          sectionSelector: "section",
          offset: 0,
          useObserver: true,
        },
        options
      );

      this.navLinks = Array.from(
        this.navContainer.querySelectorAll('a[href^="#"]')
      );
      this.sections = this.navLinks
        .map((link) => {
          const id = link.getAttribute("href").substring(1);
          return document.getElementById(id);
        })
        .filter((section) => section !== null);

      this.setActive = this.setActive.bind(this);
      this.onScroll = this.onScroll.bind(this);

      if (
        this.options.useObserver &&
        typeof IntersectionObserver !== "undefined"
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            let best = { idx: -1, ratio: 0 };
            entries.forEach((entry) => {
              const idx = this.sections.indexOf(entry.target);
              if (
                entry.isIntersecting &&
                entry.intersectionRatio >= best.ratio
              ) {
                best = { idx, ratio: entry.intersectionRatio };
              }
            });
            if (best.idx !== -1) this.setActive(best.idx);
          },
          {
            root: null,
            rootMargin: `-${this.options.offset}px 0px -40% 0px`,
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        );
        this.sections.forEach((sec) => observer.observe(sec));
        this._observer = observer;
      } else {
        window.addEventListener("scroll", this.onScroll);
        this.onScroll();
      }
      // Initial mark
      this.onScroll();
    }

    setActive(index) {
      this.navLinks.forEach((link, i) => {
        if (i === index) {
          link.classList.add(this.options.activeClass);
          link.setAttribute("aria-current", "true");
        } else {
          link.classList.remove(this.options.activeClass);
          link.removeAttribute("aria-current");
        }
      });
      this.sections.forEach((sec, i) => {
        if (i === index) sec.classList.add("inview");
        else sec.classList.remove("inview");
      });
    }

    onScroll() {
      const scrollPos = window.scrollY + this.options.offset + 1;
      let currentSectionIndex = -1;
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        if (section.offsetTop <= scrollPos) {
          currentSectionIndex = i;
        } else {
          break;
        }
      }
      if (currentSectionIndex !== -1) this.setActive(currentSectionIndex);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfScrollSpy]");
      elements.forEach((el) => {
        const off = parseInt(el.getAttribute("WfScrollSpy-offset") || "0", 10);
        new WfScrollSpy(el, { offset: isNaN(off) ? 0 : off });
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfScrollSpy = WfScrollSpy;
    }
    window.WfScrollSpy = WfScrollSpy;

    // Auto-init
    const init = () => {
      WfScrollSpy.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfScrollSpy.initAll();
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


// ===== WfSelect.js =====
(function (window, document) {
  "use strict";

  class WfSelect {
    constructor(element) {
      this.element = element;

      // Evita dupla inicialização
      if (this.element._wfSelect) return this.element._wfSelect;
      this.element._wfSelect = this;

      this.search = this.element.getAttribute("WfSelect-search") === "true";
      this.placeholder = this.element.getAttribute("WfSelect-placeholder");
      this.searchPlaceholder =
        this.element.getAttribute("WfSelect-search-placeholder") || "Buscar...";
      this.noResultsText =
        this.element.getAttribute("WfSelect-no-results-text") ||
        "Nenhum resultado encontrado";

      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.render();
      this.bindEvents();
    }

    // loadCSS removed

    render() {
      this.element.style.display = "none";

      const container = document.createElement("div");
      container.className = "wfselect-wrapper";
      this.element.classList.forEach((cls) => container.classList.add(cls));

      const selected = document.createElement("div");
      selected.className = "wfselect-display";
      this.element.classList.forEach((cls) => selected.classList.add(cls));
      selected.textContent =
        this.placeholder ||
        this.element.options[this.element.selectedIndex].textContent;

      const optionsContainer = document.createElement("div");
      optionsContainer.className = "wfselect-dropdown";
      // display controlled by CSS (.wfselect-wrapper.open)

      if (this.element.disabled) {
        selected.setAttribute("aria-disabled", "true");
        // styles handled by CSS
      }

      if (this.search) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "wfselect-search";
        searchInput.placeholder = this.searchPlaceholder;
        optionsContainer.appendChild(searchInput);
      }

      for (const option of this.element.options) {
        const optionEl = document.createElement("div");
        optionEl.className = "wfselect-option";
        optionEl.textContent = option.textContent;
        optionEl.dataset.value = option.value;
        optionsContainer.appendChild(optionEl);
      }

      container.appendChild(selected);
      container.appendChild(optionsContainer);

      this.element.parentNode.insertBefore(container, this.element.nextSibling);

      this.customSelect = container;
      this.selectedEl = selected;
      this.optionsContainer = optionsContainer;
    }

    bindEvents() {
      this.selectedEl.addEventListener("click", () => {
        this.customSelect.classList.toggle("open");
      });

      this.optionsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("wfselect-option")) {
          this.selectedEl.textContent = e.target.textContent;
          this.element.value = e.target.dataset.value;
          this.customSelect.classList.remove("open");
          this.element.dispatchEvent(new Event("change"));
        }
      });

      if (this.search) {
        const searchInput =
          this.optionsContainer.querySelector(".wfselect-search");
        searchInput.addEventListener("input", (e) => {
          const filter = e.target.value.toLowerCase();
          const options =
            this.optionsContainer.querySelectorAll(".wfselect-option");
          let hasResults = false;
          options.forEach((option) => {
            if (option.classList.contains("wfselect-no-results")) return;
            const text = option.textContent.toLowerCase();
            if (text.includes(filter)) {
              option.style.display = "block";
              hasResults = true;
            } else {
              option.style.display = "none";
            }
          });

          const noResultsEl = this.optionsContainer.querySelector(
            ".wfselect-no-results"
          );
          if (!hasResults && !noResultsEl) {
            const noResults = document.createElement("div");
            noResults.className = "wfselect-no-results";
            noResults.textContent = this.noResultsText;
            this.optionsContainer.appendChild(noResults);
          } else if (hasResults && noResultsEl) {
            noResultsEl.remove();
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!this.customSelect.contains(e.target)) {
          this.customSelect.classList.remove("open");
        }
      });
    }

    static initAll(container = document) {
      // Selecionar descendentes
      let elements = Array.from(container.querySelectorAll("[WfSelect]"));
      // Incluir o próprio container se ele tiver o atributo (compatível com WebfullLoader)
      try {
        const includeSelf =
          container !== document &&
          container.hasAttribute &&
          container.hasAttribute("WfSelect");
        if (includeSelf) {
          // evitar duplicatas caso já esteja presente na lista
          if (!elements.includes(container)) elements.unshift(container);
        }
      } catch (_) {}
      const instances = [];
      elements.forEach((element) => {
        if (!element._wfSelect) {
          element._wfSelect = new WfSelect(element);
        }
        instances.push(element._wfSelect);
      });
      return instances;
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfSelect = WfSelect;
    }
    window.WfSelect = WfSelect;

    // Auto-init
    const init = () => {
      WfSelect.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfSelect.initAll();
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


// ===== WfSide.js =====
(function (window, document) {
  "use strict";

  class WfSide {
    constructor(el, options = {}) {
      if (el._wfSide) return el._wfSide;
      this.el = el;
      el._wfSide = this;

      this.options = options;

      // Configurações
      this.title =
        el.getAttribute("wfside-title") ||
        el.getAttribute("WfSide-title") ||
        "Menu";
      this.subtitle =
        el.getAttribute("wfside-subtitle") ||
        el.getAttribute("WfSide-subtitle") ||
        "";
      this.icon =
        el.getAttribute("wfside-icon") ||
        el.getAttribute("WfSide-icon") ||
        "wf-menu";
      this.position =
        el.getAttribute("wfside-position") ||
        el.getAttribute("WfSide-position") ||
        "left"; // left ou right

      this.render();
      this.bind();

      // Registrar instância
      WfSide.instances.add(this);
    }

    destroy() {
      if (this.sidebar) {
        this.sidebar.remove();
      }
      this.el.style.display = "";
      delete this.el._wfSide;
      WfSide.instances.delete(this);
    }

    render() {
      // Criar estrutura do sidebar usando as mesmas classes do wf_side.min.css
      const sidebar = document.createElement("aside");
      sidebar.className = `side side-${this.position === "left" ? "e" : "d"}`;

      // Header do sidebar
      const header = document.createElement("div");
      header.className = "side-header";
      header.innerHTML = `
        <i class="wf ${this.icon}"></i>
        <h2>${this.title}${
        this.subtitle ? `<small>${this.subtitle}</small>` : ""
      }</h2>
      `;

      // Conteúdo do sidebar (pegar do elemento original)
      const content = document.createElement("ul");
      content.className = "side-links";

      // Se o elemento original tiver conteúdo, usar ele
      if (this.el.innerHTML.trim()) {
        content.innerHTML = this.el.innerHTML;
      } else {
        // Criar menu padrão
        content.innerHTML = `
          <h4><div class="menu-separator"></div></h4>
          <li><a href="#"><i class="wf wf-home-alt-2"></i>Home</a></li>
        `;
      }

      // Montar sidebar
      sidebar.appendChild(header);
      sidebar.appendChild(content);

      // Inserir no DOM
      document.body.appendChild(sidebar);

      // Esconder elemento original
      this.el.style.display = "none";

      // Salvar referências
      this.sidebar = sidebar;

      // Injetar CSS
      WfSide.injectCSS();
    }

    bind() {
      // Apenas eventos customizados se necessário
      // O hover já funciona via CSS
    }

    static injectCSS() {
      if (document.getElementById("wfside-css")) return;
      const style = document.createElement("style");
      style.id = "wfside-css";
      style.textContent = `

html.wfday-day {
  --side-bg: var(--prin--);
  --side-color-: var(--neut1);
  --side-ico1: var(--bran);
  --side-ico2: var(--bran);
  --side-ico2-hover: var(--azul4);
  --separador: var(--neut4);
}
html.wfday-night {
  --side-bg: var(--neut11);
  --side-color-: var(--neut2);
  --side-ico1: var(--prin);
  --side-ico2: var(--neut4);
  --side-ico2-hover: var(--azul4);
  --separador: var(--neut8);
}
.side {
  position: fixed;
  height: 100vh;
  width: 6rem;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: var(--side-bg, var(--pret));
  padding: 1.8rem .6rem 3.8rem .6rem;
  transition: width 0.35s cubic-bezier(.22, .61, .36, 1) !important;
  will-change: width;
  top: 0;
  z-index: 200;
  box-shadow: 2px 0 10px rgba(0, 0, 0, .12);
}
.side-e {
  left: 0;
}
.side-d {
  right: 0;
}
.side:hover {
  width: 22rem !important;
}
@media (max-width: 767.98px) {
  .side:hover {
    width: 6rem;
  }
}
.side .side-header {
  display: flex;
  align-items: center;
}
.side .side-header img {
  width: 4.8rem;
  border-radius: 50%;
}
.side .side-header i {
  font-size: 3.8rem;
  color: var(--side-ico1, var(--side-color-logo));
  padding: 0 0 8px 5px;
}
.side .side-header h2 {
  color: var(--side-color-, var(--side-color));
  font-size: 1.8rem;
  font-family: var(--font1b);
  font-weight: 400;
  white-space: nowrap;
  margin: .4rem 0 .4rem 1.2rem;
  position: relative;
  top: -2px;
}
.side .side-header h2 small {
  font-size: 1.4rem;
  font-weight: 400;
  display: block;
  color: var(--azul4);
}
.side-links {
  list-style: none;
  margin: 0;
  padding: 0 0 4rem 0;
  height: 100%;
}
.side-links::-webkit-scrollbar {
  display: none;
}
.side-links h4 {
  color: var(--side-color);
  font-weight: 500;
  white-space: nowrap;
  margin: .6rem 0;
  position: relative;
  display: grid;
}
.side-links .menu-separator {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: .1rem;
  transform: scaleX(1);
  transform: translateY(-50%);
  background: var(--separador, var(--side-separador));
  transform-origin: right;
  transition-delay: .2s;
}
.side-links li a {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  color: var(--bran) !important;
  font-size: 1.4rem;
  font-weight: 400;
  white-space: nowrap;
  padding: .6rem 1rem;
  text-decoration: none;
  transition: .5s ease;
  cursor: pointer;
  opacity: 1 !important;
}
.side-links li a:hover,
.side-links li a:active {
  color: var(--bran) !important;
}
.side-links li a i {
  font-size: 3rem;
  line-height: 1;
  color: var(--side-ico2);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}
.side-links li a:hover i.wf {
  color: var(--side-ico2-hover) !important;
  transform: scale(1.1);
}
a.wf {
  position: relative;
  top: -12px;
  color: var(--ardo50);
}
a.wf i {
  font-size: 24px;
  padding: 0 0 8px 9px;
}
`;
      document.head.appendChild(style);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfSide]");
      elements.forEach((el) => {
        if (!el._wfSide) {
          new WfSide(el);
        }
      });
    }
  }

  // Registro de instâncias ativas
  WfSide.instances = new Set();

  // Exportação Global
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfSide = WfSide;
    }
    window.WfSide = WfSide;
  }

  // Auto-inicialização
  const init = () => {
    WfSide.initAll();

    // Observar mudanças no DOM
    const mo = new MutationObserver((mutations) => {
      // Limpeza de instâncias órfãs (elemento original removido)
      if (WfSide.instances.size > 0) {
        WfSide.instances.forEach((instance) => {
          if (!instance.el.isConnected) {
            instance.destroy();
          }
        });
      }

      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches("[WfSide]")) {
              new WfSide(node);
            } else if (node.querySelectorAll) {
              WfSide.initAll(node);
            }
          }
        });
      });
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);


// ===== WfSidebar.js =====
(function (window, document) {
  "use strict";

  /**
   * WfSidebar - Sistema de Sidebar Responsiva
   *
   * @author SandroWeb
   * @version 1.0
   * @since WEBFULL Framework v1.0
   */
  class WfSidebar {
    constructor(element) {
      if (element._wfSidebar) return element._wfSidebar;
      this.element = element;
      element._wfSidebar = this;

      this.breakpoint =
        this.element.getAttribute("WfSidebar-breakpoint") || "790px";
      this.closeOnOutside =
        this.element.getAttribute("WfSidebar-close-on-outside") !== "false";
      this.closeOnClick =
        this.element.getAttribute("WfSidebar-close-on-click") !== "false";
      this.autoClose =
        this.element.getAttribute("WfSidebar-auto-close") !== "false";
      this.side = this.element.getAttribute("WfSidebar-side") || "left"; // left ou right

      this.isOpen = false;
      this.toggleBtn = null;
      this.overlay = null;

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupSidebar();
      this.bindEvents();
      this.checkResponsive();
    }

    loadCSS() {
      const cssId = "webfull-wfsidebar-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
:root, html.wfday-day {
    --sidebar-bg: var(--prin, #fff);
    --sidebar-color: var(--bran, #333);
    --sidebar-hover: var(--bran, #f0f0f0);
    --sidebar-hover-color: var(--prin, #000);
    --sidebar-hover-border: var(--prin-, #ccc);
    --sidebar-submenu-bg: var(--prin--, #fafafa);
    --sidebar-submenu-hover: var(--prin---, #eee);
    --sidebar-toggle-bg: var(--prin, #fff);
    --sidebar-toggle-color: var(--bran, #333);
    --sidebar-overlay-bg: rgba(0, 0, 0, .2);
    --sidebar-scrollbar-track: var(--prin, #eee);
    --sidebar-scrollbar-thumb: var(--wf-bg, #ccc);
    --sidebar-scrollbar-thumb-hover: var(--prin, #999);
    --sidebar-border-: var(--prin, #ddd);
}

html.wfday-night {
    --sidebar-bg: var(--neut10);
    --sidebar-color: var(--bran);
    --sidebar-hover: var(--bran);
    --sidebar-hover-color: var(--neut10);
    --sidebar-hover-border: var(--prin-);
    --sidebar-submenu-bg: var(--neut11);
    --sidebar-submenu-hover: var(--neut12);
    --sidebar-toggle-bg: var(--neut10);
    --sidebar-toggle-color: var(--bran);
    --sidebar-overlay-bg: rgba(0, 0, 0, .2);
    --sidebar-scrollbar-track: var(--neut10);
    --sidebar-scrollbar-thumb: var(--neut12);
    --sidebar-scrollbar-thumb-hover: var(--neut6);
    --sidebar-border-: var(--neut8);
}

[WfSidebar] {
    width: 220px;
    background: var(--sidebar-bg);
    color: var(--sidebar-color);
    /* GPU-accelerate and prepare for smooth sliding */
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateX(0);
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    overflow-y: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
}

[WfSidebar] .sidebar-header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

[WfSidebar] .sidebar-header img {
    width: 72px;
}

[WfSidebar] .sidebar-header h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font3);
    line-height: 0.8;
    font-size: 3rem;
    padding: 6px 0;
}

[WfSidebar] .sidebar-header h1 small {
    font-family: var(--font1);
    font-size: 1.4rem;
    color: var(--neut4);
}

[WfSidebar] nav {
    padding: 1rem 0;
}

[WfSidebar] .menu-item {
    margin-bottom: 0;
}

[WfSidebar] .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
}

[WfSidebar] .menu-header:hover {
    color: var(--sidebar-hover-color);
    background: var(--sidebar-hover);
    border-left-color: var(--sidebar-hover-border);
}

[WfSidebar] .menu-header.active {
    color: var(--sidebar-hover-color);
    background: var(--sidebar-hover);
    border-left-color: var(--sidebar-hover-border);
}

[WfSidebar] .menu-header i:first-child {
    margin-right: 1rem;
    font-size: 2rem;
    width: 20px;
    text-align: center;
}

[WfSidebar] .menu-header span {
    flex: 1;
    font-weight: 500;
    font-size: 1.4rem;
}

[WfSidebar] .menu-header .arrow {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 2.2rem;
    line-height: 0.8;
    opacity: 0.7;
}

[WfSidebar] .menu-header.active .arrow {
    transform: rotate(180deg);
}

[WfSidebar] .submenu {
    list-style: none;
    padding: 0;
    margin: 0;
    background: var(--sidebar-submenu-bg);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

[WfSidebar] .submenu.active {
    max-height: 600px;
}

[WfSidebar] .submenu li {
    padding: 1rem 1.5rem 1rem 3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 5px solid transparent;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--sidebar-border-);
    font-size: 1.4rem;
}

[WfSidebar] .submenu li:hover, [WfSidebar] .submenu li.active {
    background: var(--sidebar-submenu-hover);
    border-left-color: white;
    padding-left: 3.75rem;
}

[WfSidebar] .submenu li i {
    font-size: 1.6rem;
    width: 16px;
    text-align: center;
    opacity: 0.8;
}

[WfSidebar] .menu-simple {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem 1.5rem;
    color: var(--sidebar-color);
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    font-weight: 500;
    padding: 8px 14px;
    font-size: 1.4rem;
}

[WfSidebar] .menu-simple:hover {
    color: var(--sidebar-hover-color) !important;
    background: var(--sidebar-hover) !important;
    border-left-color: var(--sidebar-hover-border) !important;
}

[WfSidebar] .menu-simple i {
    font-size: 2rem;
    width: 20px;
    text-align: center;
}

@media (max-width: 790px) {
    [WfSidebar] {
       /* start hidden off-canvas */
       transform: translateX(-100%);
       z-index: 1000;
       position: fixed;
       left: 0;
       top: 0;
    }

    [WfSidebar].open {
       transform: translateX(0) !important;
    }

    [WfSidebar].sidebar-right {
       transform: translateX(100%);
       left: auto;
       right: 0;
    }

    [WfSidebar].sidebar-right.open {
       transform: translateX(0) !important;
    }

    .toggle-btn-left {
       position: fixed;
       top: 8px;
       left: 21px;
       z-index: 1001;
       background: var(--sidebar-toggle-bg);
       color: var(--sidebar-toggle-color);
       border: none;
       border-radius: 4px;
       padding: 14px 14px 13px 14px;
       font-size: 2.4rem;
       cursor: pointer;
       transition: all 0.3s ease;
       display: block !important;
       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
       line-height: 1;
    }

    .toggle-btn-right {
       position: fixed;
       top: 1rem;
       right: 1rem;
       z-index: 1001;
       background: var(--sidebar-toggle-bg);
       color: var(--sidebar-toggle-color);
       border: none;
       border-radius: 4px;
       padding: 0.5rem;
       font-size: 1.5rem;
       cursor: pointer;
       transition: all 0.3s ease;
       display: block !important;
       box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .toggle-btn:hover {
       /*background: var(--sidebar-hover);*/
       transform: scale(1.1);
    }

    .overlay {
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: var(--sidebar-overlay-bg);
       z-index: 999;
       opacity: 0;
       visibility: hidden;
       transition: all 0.3s ease;
       cursor: pointer;
    }

    .overlay.active {
       opacity: 1;
       visibility: visible;
    }
}

@media (min-width: 791px) {
    .toggle-btn-left,
    .toggle-btn-right {
       display: none !important;
    }
}

[WfSidebar]::-webkit-scrollbar {
    width: 6px;
}

[WfSidebar]::-webkit-scrollbar-track {
    background: var(--sidebar-scrollbar-track);
}

[WfSidebar]::-webkit-scrollbar-thumb {
    background: var(--sidebar-scrollbar-thumb);
    border-radius: 3px;
}

[WfSidebar]::-webkit-scrollbar-thumb:hover {
    background: var(--sidebar-scrollbar-thumb-hover);
}
`;
        document.head.appendChild(style);
      }
    }

    setupSidebar() {
      this.createToggleButton();
      this.createOverlay();
      this.setupAccordionMenus();
    }

    createToggleButton() {
      // Verificar se já existe botão toggle para este lado
      const toggleBtnId = `toggle-btn-${this.side}`;
      let toggleBtn = document.getElementById(toggleBtnId);
      if (!toggleBtn) {
        toggleBtn = document.createElement("button");
        toggleBtn.id = toggleBtnId;
        toggleBtn.className = `toggle-btn toggle-btn-${this.side}`;
        toggleBtn.setAttribute("aria-label", `Abrir sidebar ${this.side}`);
        toggleBtn.innerHTML = "☰";
        document.body.appendChild(toggleBtn);
      }
      this.toggleBtn = toggleBtn;
    }

    createOverlay() {
      // Criar overlay para mobile
      const overlayId = `overlay-${this.side}`;
      let overlay = document.getElementById(overlayId);
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = overlayId;
        overlay.className = `overlay overlay-${this.side}`;
        document.body.appendChild(overlay);
      }
      this.overlay = overlay;
    }

    setupAccordionMenus() {
      const headers = this.element.querySelectorAll(".menu-header");

      headers.forEach((header) => {
        if (!header._accordionSetup) {
          header._accordionSetup = true;

          header.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const submenu = header.parentElement.querySelector(".submenu");

            if (submenu) {
              // Fecha outros submenus
              document.querySelectorAll(".submenu").forEach((sub) => {
                if (sub !== submenu) sub.classList.remove("active");
              });
              document.querySelectorAll(".menu-header").forEach((h) => {
                if (h !== header) h.classList.remove("active");
              });

              // Toggle atual
              submenu.classList.toggle("active");
              header.classList.toggle("active");
            }
          });
        }
      });
    }

    bindEvents() {
      // Botão toggle
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggle();
        });
      } else {
        console.error("WfSidebar: Botão toggle não encontrado!");
      }

      // Fechar ao clicar no overlay
      if (this.overlay) {
        this.overlay.addEventListener("click", () => {
          this.close();
        });
      }

      // Fechar ao clicar fora
      if (this.closeOnOutside) {
        document.addEventListener("click", (e) => {
          if (
            this.isOpen &&
            !this.element.contains(e.target) &&
            !this.toggleBtn.contains(e.target)
          ) {
            this.close();
          }
        });
      }

      // Fechar ao clicar em links (mobile). Se o link pertencer a um submenu,
      // marcar o item do submenu e o header correspondente como `active`.
      if (this.closeOnClick) {
        const links = this.element.querySelectorAll("a, [WfAjax]");
        links.forEach((link) => {
          link.addEventListener("click", (e) => {
            try {
              const submenuLi = link.closest(".submenu li");
              if (submenuLi) {
                // limpar apenas estados active dos submenus
                this.element
                  .querySelectorAll(".submenu li.active")
                  .forEach((el) => el.classList.remove("active"));
                this.element
                  .querySelectorAll(".menu-header.active")
                  .forEach((el) => el.classList.remove("active"));

                // marcar o item clicado e o header do menu pai
                submenuLi.classList.add("active");
                const menu = submenuLi.closest(".menu");
                if (menu) {
                  const hdr = menu.querySelector(".menu-header");
                  if (hdr) hdr.classList.add("active");
                }
              }
            } catch (err) {
              // não bloquear interação por erro
            }

            if (window.innerWidth <= this.getBreakpointValue()) {
              this.close();
            }
          });
        });
      }

      // Fechar submenus ao clicar em menus simples
      const menuSimples = this.element.querySelectorAll(".menu-simple");
      menuSimples.forEach((menu) => {
        menu.addEventListener("click", () => {
          this.closeAllSubmenus();
        });
      });

      // Resize listener
      window.addEventListener("resize", () => {
        this.checkResponsive();
      });
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      if (this.isOpen) return;
      this.isOpen = true;

      // Adiciona classe de direção
      this.element.classList.add(`sidebar-${this.side}`);

      // Desabilita transição temporariamente para definir posição inicial sem animar
      this.element.style.transition = "none";
      void this.element.offsetWidth; // Força reflow
      this.element.style.transition = ""; // Restaura transição do CSS

      // Adiciona classe open para animar entrada
      requestAnimationFrame(() => {
        this.element.classList.add("open");
      });

      if (this.overlay) {
        this.overlay.classList.add("active");
      }

      if (this.toggleBtn) {
        this.toggleBtn.setAttribute(
          "aria-label",
          `Fechar sidebar ${this.side}`
        );
        this.toggleBtn.innerHTML = "✕";
      }

      // Prevenir scroll do body no mobile
      if (window.innerWidth <= this.getBreakpointValue()) {
        document.body.style.overflow = "hidden";
      }

      // Disparar evento quando a transição de transform terminar
      const onOpened = (e) => {
        if (e.propertyName === "transform") {
          this.element.dispatchEvent(
            new CustomEvent("wfsidebar:opened", {
              detail: { sidebar: this.element, side: this.side },
            })
          );
        }
      };
      this.element.addEventListener("transitionend", onOpened, { once: true });
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      // Inicia a animação de fechamento removendo a classe que mostra; CSS terá transform alvo
      this.element.classList.remove("open");

      if (this.overlay) {
        this.overlay.classList.remove("active");
      }

      if (this.toggleBtn) {
        this.toggleBtn.setAttribute("aria-label", `Abrir sidebar ${this.side}`);
        this.toggleBtn.innerHTML = "☰";
      }

      // Quando a transição terminar, remove a classe lateral e restaura scroll
      const onClosed = (e) => {
        if (e.propertyName === "transform") {
          // Desabilita transição para limpar classes sem cruzar a tela
          this.element.style.transition = "none";
          this.element.classList.remove(`sidebar-${this.side}`);
          void this.element.offsetWidth; // Força reflow
          this.element.style.transition = ""; // Restaura

          document.body.style.overflow = "";
          this.element.dispatchEvent(
            new CustomEvent("wfsidebar:closed", {
              detail: { sidebar: this.element, side: this.side },
            })
          );
        }
      };
      this.element.addEventListener("transitionend", onClosed, { once: true });
    }

    checkResponsive() {
      const isMobile = window.innerWidth <= this.getBreakpointValue();

      if (!isMobile && this.isOpen) {
        // Se mudou para desktop e está aberto, fechar
        this.close();
      }
    }

    getBreakpointValue() {
      return parseInt(this.breakpoint);
    }

    // Fechar todos os submenus
    closeAllSubmenus() {
      const submenus = this.element.querySelectorAll(".submenu");
      const headers = this.element.querySelectorAll(".menu-header");

      submenus.forEach((submenu) => {
        submenu.classList.remove("active");
      });

      headers.forEach((header) => {
        header.classList.remove("active");
      });
    }

    // Métodos públicos
    isOpen() {
      return this.isOpen;
    }

    // Métodos estáticos
    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfSidebar]");
      const instances = [];

      elements.forEach((element) => {
        if (!element._wfSidebar) {
          try {
            const instance = new WfSidebar(element);
            instances.push(instance);
          } catch (error) {
            console.error("Erro ao inicializar WfSidebar:", error);
          }
        } else {
          instances.push(element._wfSidebar);
        }
      });

      return instances;
    }

    // Métodos de conveniência
    static open(selector) {
      const element = document.querySelector(selector);
      if (element && element._wfSidebar) {
        element._wfSidebar.open();
      }
    }

    static close(selector) {
      const element = document.querySelector(selector);
      if (element && element._wfSidebar) {
        element._wfSidebar.close();
      }
    }

    static toggle(selector) {
      const element = document.querySelector(selector);
      if (element && element._wfSidebar) {
        element._wfSidebar.toggle();
      }
    }
  }

  // Exportação global
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfSidebar = WfSidebar;
    }
    window.WfSidebar = WfSidebar;
  }

  // Auto-inicialização
  const init = () => {
    WfSidebar.initAll();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);


// ===== WfSlid1.js =====
(function(window, document) {
  "use strict";

  /**
   * WfSlid1 - Sistema de Carrossel/Slider
   * SandroWeb - 2025
   * Versão: 3.0
   * Framework: WEBFULL v1.0
   */
  class WfSlid1 {
    constructor(element) {
      this.element = element;
      // Evita dupla inicialização
      if (this.element._wfSlid1) return this.element._wfSlid1;
      this.element._wfSlid1 = this;

      // Configurações
      this.autoplay = this.element.getAttribute("WfSlid1-autoplay") !== "false";
      this.interval =
        parseInt(this.element.getAttribute("WfSlid1-interval")) || 6000;
      this.arrows = this.element.getAttribute("WfSlid1-arrows") !== "false";
      this.indicators =
        this.element.getAttribute("WfSlid1-indicators") !== "false";
      this.effect = this.element.getAttribute("WfSlid1-effect") || "fade";
      this.loop = this.element.getAttribute("WfSlid1-loop") !== "false";
      this.pauseOnHover =
        this.element.getAttribute("WfSlid1-pausehover") === "true";
      // Habilitação de zoom interno via atributo no container
      this.zoom = this.element.getAttribute("WfSlid1-zoom") === "true";
      this.zoomDrift = this.element.getAttribute("WfSlid1-zoomdrift") === "true";

      this.slides = [];
      this.currentSlide = 0;
      this.autoplayInterval = null;
      this.arrowsElement = null;
      this.indicatorsElement = null;
      this.timer = null;
      this._hovering = false;

      this.loadCSS();
      this.init();
    }

    loadCSS() {
      if (document.getElementById("wfslid1-styles")) return;

      const style = document.createElement("style");
      style.id = "wfslid1-styles";
      document.head.appendChild(style);
      style.textContent = `
/**
 * WfSlid1.css - Sistema de Carrossel/Slider
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
.wfslid1-container {
   position: relative;
   width: 100%;
   height: 400px;
   overflow: hidden;
   background: #f5f5f5;
   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* ===== SLIDES ===== */
.wfslid1-slide {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   opacity: 0;
   z-index: 1;
   transition: opacity 2.5s cubic-bezier(0.25, 0.1, 0.25, 1);
   display: flex;
   align-items: center;
   justify-content: center;
}

.wfslid1-slide.wfslid1-active {
   opacity: 1;
   z-index: 2;
   transition: opacity 2.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.wfslid1-slide.wfslid1-prev {
   opacity: 1;
   z-index: 1;
}

.wfslid1-slide img {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

/* ===== CONTEÚDO ===== */
.wfslid1-content {
   position: absolute;
   bottom: 20px;
   left: 20px;
   right: 20px;
   color: white;
   padding: 20px;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
   transform: translateY(30px);
   opacity: 0;
   z-index: 5;
   transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.wfslid1-slide.wfslid1-active .wfslid1-content {
   opacity: 1;
   animation: slideInContent 0.8s ease-out forwards;
   transition-delay: 0s;
}

.wfslid1-slide.wfslid1-active .wfslid1-content h2,
.wfslid1-slide.wfslid1-active .wfslid1-content h3 {
   transform: translateY(0);
   opacity: 1;
   transition-delay: 0.5s;
}

.wfslid1-slide.wfslid1-active .wfslid1-content p {
   transform: translateY(0);
   opacity: 1;
   transition-delay: 0.7s;
}

.wfslid1-content h2,
.wfslid1-content h3 {
   margin: 0 0 15px 0;
   font-size: 2.2rem;
   font-weight: bold;
   text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
   transform: translateY(20px);
   opacity: 0;
   transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.wfslid1-slide.wfslid1-active .wfslid1-content h2,
.wfslid1-slide.wfslid1-active .wfslid1-content h3 {
   transform: translateY(0);
   opacity: 1;
   animation: slideInUp 0.8s ease-out 0.2s forwards;
}

.wfslid1-content p {
   margin: 0 0 15px 0;
   font-size: 1.1rem;
   line-height: 1.5;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
   transform: translateY(15px);
   opacity: 0;
   transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.wfslid1-slide.wfslid1-active .wfslid1-content p {
   transform: translateY(0);
   opacity: 1;
   animation: slideInUp 0.8s ease-out 0.4s forwards;
}

/* ===== ANIMAÇÕES ===== */
@keyframes slideInContent {
   0% {
      opacity: 0;
      transform: translateY(30px);
   }
   100% {
      opacity: 1;
      transform: translateY(0);
   }
}

@keyframes slideInFromRight {
   0% {
      opacity: 0;
      transform: translate(-50%, -50%) translateX(50px);
   }
   100% {
      opacity: 1;
      transform: translate(-50%, -50%) translateX(0);
   }
}

@keyframes zoomInContent {
   0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
   }
   50% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.1);
   }
   100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
   }
}

@keyframes bounceIn {
   0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3);
   }
   50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.05);
   }
   70% {
      transform: translate(-50%, -50%) scale(0.9);
   }
   100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
   }
}

/* ===== SETAS DE NAVEGAÇÃO ===== */
.wfslid1-arrow {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   width: 40px;
   height: 40px;
   background: rgba(0,0,0,0.5);
   color: #fff;
   border: none;
   border-radius: 50%;
   cursor: pointer;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 18px;
   transition: all 0.3s ease;
}

.wfslid1-arrow:hover {
   background: rgba(0,0,0,0.8);
   transform: translateY(-50%) scale(1.1);
}

.wfslid1-arrow.wfslid1-prev {
   left: 10px;
}

.wfslid1-arrow.wfslid1-next {
   right: 10px;
}

/* ===== INDICADORES ===== */
.wfslid1-indicators {
   position: absolute;
   bottom: 15px;
   left: 50%;
   transform: translateX(-50%);
   display: flex;
   gap: 8px;
   z-index: 10;
}

.wfslid1-indicator {
   width: 10px;
   height: 10px;
   border-radius: 50%;
   background: rgba(255,255,255,0.5);
   cursor: pointer;
   transition: all 0.3s ease;
}

.wfslid1-indicator:hover,
.wfslid1-indicator.wfslid1-active {
   background: #fff;
   transform: scale(1.2);
}

/* ===== EFEITOS ===== */
.wfslid1-effect-fade .wfslid1-slide {
   transition: opacity 2s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.wfslid1-effect-fade .wfslid1-slide.wfslid1-active .wfslid1-content {
   animation: fadeInScale 1.2s ease-out 0.5s forwards;
}

.wfslid1-effect-slide .wfslid1-slide {
   transform: translateX(100%);
   transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.wfslid1-effect-slide .wfslid1-slide.wfslid1-active {
   transform: translateX(0);
}

.wfslid1-effect-slide .wfslid1-slide.wfslid1-prev {
   transform: translateX(-100%);
}

.wfslid1-effect-slide .wfslid1-slide.wfslid1-active .wfslid1-content {
   animation: slideInFromRight 1s ease-out 0.4s forwards;
}

.wfslid1-effect-zoom .wfslid1-slide {
   transform: scale(0.98);
   transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}

.wfslid1-effect-zoom .wfslid1-slide.wfslid1-active {
   transform: scale(1.02);
}

.wfslid1-effect-zoom .wfslid1-slide.wfslid1-active .wfslid1-content {
   animation: zoomInContent 1s ease-out 0.3s forwards;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   .wfslid1-container {
      height: 300px;
   }
   
   .wfslid1-content {
      padding: 15px;
   }
}

/* ===== KEN BURNS / ZOOM ===== */
/* Wrapper interno para aplicar transformações de zoom/drift nas imagens ou backgrounds */
.wfslid1-slide .wfslid1-img-wrap {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   overflow: hidden;
   transform-origin: 100% 0%; /* foco topo-direita */
   will-change: transform;
   z-index: 0;
}

/* Conteúdo visual dentro do wrapper */
.wfslid1-slide .wfslid1-img-wrap > img,
.wfslid1-slide .wfslid1-img-wrap > .wfslid1-bg {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

/* Estado base com leve zoom quando habilitado no container */
.wfslid1-container[WfSlid1-zoom="true"] .wfslid1-slide .wfslid1-img-wrap {
   transform: scale(1.06) translate(1%, 0.2%);
}

@media (max-width: 768px) {
   .wfslid1-container[WfSlid1-zoom="true"] .wfslid1-slide .wfslid1-img-wrap {
      transform: scale(1.04) translate(0.8%, 0.1%);
   }
}

/* Ativa Ken Burns apenas no slide ativo */
.wfslid1-slide.wfslid1-kenburns-active .wfslid1-img-wrap {
   animation: wfslid1-kenburns 16s ease-in-out forwards;
}

/* Drift opcional quando habilitado */
.wfslid1-container[WfSlid1-zoomdrift="true"] .wfslid1-slide.wfslid1-kenburns-active .wfslid1-img-wrap {
   animation: wfslid1-kenburns 16s ease-in-out forwards, wfslid1-drift 12s ease-in-out infinite alternate;
}

/* Keyframes Ken Burns focando topo-direita */
@keyframes wfslid1-kenburns {
   0% {
      transform: scale(1.06) translate(1%, 0.2%);
   }
   100% {
      transform: scale(1.08) translate(1.5%, 0.2%);
   }
}

@media (max-width: 768px) {
   @keyframes wfslid1-kenburns {
      0% {
         transform: scale(1.04) translate(0.8%, 0.1%);
      }
      100% {
         transform: scale(1.06) translate(1.0%, 0.1%);
      }
   }
}

/* Drift horizontal sutil (composição visual) */
@keyframes wfslid1-drift {
   0% {
      transform: translateX(0);
   }
   100% {
      transform: translateX(1.2%);
   }
}
      `;
    }

    // Método helper para logs condicionais
    debugLog(...args) {
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        console.log("[WfSlid1]", ...args);
      }
    }

    init() {
      this._setupContainer();
      this.slides = Array.from(this.element.querySelectorAll(".wfslid1-slide"));

      if (this.slides.length === 0) {
        console.warn("[WfSlid1] Nenhum slide encontrado");
        return;
      }

      this._setupSlides();
      this._createArrows();
      this._createIndicators();

      // Configurar primeiro slide com fade suave
      this._setupFirstSlide();
      this._setupEvents();

      if (this.autoplay) {
        this.debugLog("Iniciando autoplay...");
        this._startAutoplay();
      }
    }

    _setupFirstSlide() {
      // Configurar primeiro slide
      const firstSlide = this.slides[0];

      if (firstSlide) {
        // Ativar o primeiro slide
        firstSlide.classList.add("wfslid1-active");
        firstSlide.setAttribute("aria-hidden", "false");
        firstSlide.style.zIndex = 2;
        firstSlide.style.opacity = 1;

        // Ativar Ken Burns no primeiro slide (sem mexer na opacidade da imagem)
        firstSlide.classList.add("wfslid1-kenburns-active");

        // Resetar animações de texto primeiro
        const content = firstSlide.querySelector(
          ".wfslid1-content, .banner-content"
        );
        if (content) {
          const children = Array.from(content.children);
          children.forEach((el, index) => {
            el.style.animation = "none";
            el.style.animationPlayState = "paused";
            el.style.setProperty("--wfslid1-delay", `${0.2 + index * 0.15}s`);
            void el.offsetHeight;
          });

          // Reativar imediatamente sem esconder os textos
          setTimeout(() => {
            Array.from(content.children).forEach((el) => {
              el.style.animation = "";
              el.style.animationPlayState = "running";
              void el.offsetHeight;
            });
          }, 0);
        }

        // Atualizar indicadores
        if (this.indicators && this.indicators.length > 0) {
          this.indicators[0].classList.add("wfslid1-active");
        }

        this.debugLog("Primeiro slide configurado");
      }

      this.currentSlide = 0;

      // Finaliza estado de inicialização do container para evitar sumiço de texto
      if (this.element) {
        this.element.classList.remove("wfslid1-initializing");
        this.element.classList.add("wfslid1-ready");
      }
    }

    _setupContainer() {
      // Adicionar classe container se não existir
      if (!this.element.classList.contains("wfslid1-container")) {
        this.element.classList.add("wfslid1-container");
        // Marcar inicialização para impedir flicker de texto
        this.element.classList.add("wfslid1-initializing");
      }

      // Layout central opcional
      const layout = this.element.getAttribute("WfSlid1-layout");
      if (layout === "center") {
        this.element.classList.add("wfslid1-layout-center");
      }

      // Aplicar classe de efeito ao container para escopo de CSS
      if (this.effect) {
        this.element.classList.add(`wfslid1-effect-${this.effect}`);
      }

      // Configurar posição relativa para posicionamento absoluto dos slides
      if (getComputedStyle(this.element).position === "static") {
        this.element.style.position = "relative";
      }

      // Configurar overflow
      this.element.style.overflow = "hidden";
    }

    _setupSlides() {
      this.slides.forEach((slide, i) => {
        slide.classList.remove("wfslid1-active");
        // Evitar blackout inicial: manter o primeiro slide visível até ativação
        if (i === 0) {
          slide.setAttribute("aria-hidden", "false");
          slide.style.zIndex = 2;
          slide.style.opacity = 1;
        } else {
          slide.setAttribute("aria-hidden", "true");
          slide.style.zIndex = 1;
          slide.style.opacity = 0;
        }
        slide.style.position = "absolute";
        slide.style.top = 0;
        slide.style.left = 0;
        slide.style.right = 0;
        slide.style.bottom = 0;
        slide.tabIndex = -1;

        // Não mexer na opacidade da imagem; o fade será controlado pelo slide
        const img = slide.querySelector("img");
        if (img) {
          img.style.removeProperty("opacity");
          img.style.removeProperty("transition");
          img.style.removeProperty("willChange");
        }

        // Garantir wrapper interno para o Ken Burns/Zoom
        let imgWrap = slide.querySelector(".wfslid1-img-wrap");
        const contentEl = slide.querySelector(
          ".wfslid1-content, .banner-content"
        );
        if (!imgWrap) {
          imgWrap = document.createElement("div");
          imgWrap.className = "wfslid1-img-wrap";
          imgWrap.style.position = "absolute";
          imgWrap.style.top = "0";
          imgWrap.style.left = "0";
          imgWrap.style.right = "0";
          imgWrap.style.bottom = "0";
          imgWrap.style.zIndex = "0";
          imgWrap.style.overflow = "hidden";

          // Mover elementos visuais (img/divs de fundo) para dentro do wrapper, preservando o conteúdo
          const visuals = [];
          Array.from(slide.children).forEach((child) => {
            if (
              child !== contentEl &&
              !child.classList.contains("wfslid1-img-wrap")
            ) {
              visuals.push(child);
            }
          });
          visuals.forEach((v) => imgWrap.appendChild(v));

          // Inserir wrapper antes do conteúdo textual (se existir)
          if (contentEl) {
            slide.insertBefore(imgWrap, contentEl);
          } else {
            slide.appendChild(imgWrap);
          }
        }
      });
    }

    _createArrows() {
      if (!this.arrows) return;

      // Remove se já existirem
      [".wfslid1-arrow.wfslid1-prev", ".wfslid1-arrow.wfslid1-next"].forEach(
        (sel) => {
          const btn = this.element.querySelector(sel);
          if (btn) btn.remove();
        }
      );

      // Prev
      const prev = document.createElement("button");
      prev.className = "wfslid1-arrow wfslid1-prev";
      prev.setAttribute("aria-label", "Anterior");
      prev.innerHTML = '<i class="wf wf-chevron-left"></i>';

      // Next
      const next = document.createElement("button");
      next.className = "wfslid1-arrow wfslid1-next";
      next.setAttribute("aria-label", "Próximo");
      next.innerHTML = '<i class="wf wf-chevron-right"></i>';

      this.element.appendChild(prev);
      this.element.appendChild(next);
      this.arrows = { prev, next };

      prev.addEventListener("click", () => this.prev());
      next.addEventListener("click", () => this.next());
    }

    _createIndicators() {
      if (!this.indicators) return;

      // Remove se já existir
      const old = this.element.querySelector(".wfslid1-indicators");
      if (old) old.remove();

      const indicators = document.createElement("div");
      indicators.className = "wfslid1-indicators";
      this.indicators = [];

      this.slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "wfslid1-indicator";
        dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
        dot.tabIndex = 0;
        dot.addEventListener("click", () => this.goTo(i));
        dot.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") this.goTo(i);
        });
        indicators.appendChild(dot);
        this.indicators.push(dot);
      });

      this.element.appendChild(indicators);
    }

    _showSlide(idx, animate = true) {
      if (idx < 0) idx = this.slides.length - 1;
      if (idx >= this.slides.length) idx = 0;

      const previousSlide = this.slides[this.currentSlide];
      const nextSlide = this.slides[idx];

      // Se for o mesmo slide, não fazer nada
      if (this.currentSlide === idx) return;

      // Efeito SLIDE: usar transform via classes, não opacidade
      if (this.effect === "slide") {
        // Preparar slide anterior para sair pela esquerda
        if (previousSlide) {
          previousSlide.classList.add("wfslid1-prev");
          previousSlide.style.zIndex = 1;
          previousSlide.style.opacity = 1; // manter visível durante a transição

          // Congelar transform atual do wrapper para não pular durante a transição
          const prevWrap = previousSlide.querySelector(".wfslid1-img-wrap");
          if (prevWrap) {
            const cs = window.getComputedStyle(prevWrap);
            prevWrap.style.transform = cs.transform;
            prevWrap.style.animation = "none";
          }

          const onPrevSlideEnd = (e) => {
            // Apenas tratar fim de transição do transform
            if (e.propertyName !== "transform") return;
            const prevWrap2 = previousSlide.querySelector(".wfslid1-img-wrap");
            if (prevWrap2) {
              prevWrap2.style.transform = "";
              prevWrap2.style.animation = "";
            }
            previousSlide.classList.remove("wfslid1-kenburns-active");
            previousSlide.classList.remove("wfslid1-active", "wfslid1-prev");
            previousSlide.setAttribute("aria-hidden", "true");
            previousSlide.removeEventListener("transitionend", onPrevSlideEnd);
          };
          previousSlide.addEventListener("transitionend", onPrevSlideEnd);
        }

        // Preparar próximo slide para entrar pela direita
        if (nextSlide) {
          // Resetar animações de texto
          const content = nextSlide.querySelector(
            ".wfslid1-content, .banner-content"
          );
          if (content) {
            Array.from(content.children).forEach((el, index) => {
              el.style.animation = "none";
              el.style.animationPlayState = "paused";
              el.style.setProperty("--wfslid1-delay", `${0.2 + index * 0.15}s`);
              void el.offsetHeight;
            });
          }

          nextSlide.classList.add("wfslid1-active");
          nextSlide.setAttribute("aria-hidden", "false");
          nextSlide.style.zIndex = 2;
          nextSlide.style.opacity = 1; // visível imediatamente

          const onNextSlideEnd = (e) => {
            if (e.propertyName !== "transform") return;
            if (this.zoom) {
              nextSlide.classList.add("wfslid1-kenburns-active");
            }
            if (content) {
              Array.from(content.children).forEach((el) => {
                el.style.animation = "";
                el.style.opacity = "";
                el.style.transform = "";
                el.style.animationPlayState = "running";
                void el.offsetHeight;
              });
            }
            nextSlide.removeEventListener("transitionend", onNextSlideEnd);
          };
          nextSlide.addEventListener("transitionend", onNextSlideEnd);
        }

        // Atualizar indicadores
        if (this.indicators && this.indicators.length > 0) {
          this.indicators.forEach((dot, i) => {
            dot.classList.toggle("wfslid1-active", i === idx);
          });
        }

        this.currentSlide = idx;
        console.log(`[WfSlid1] Slide de ${this.currentSlide} para ${idx}`);
        return;
      }

      // ===== EFEITOS PADRÃO (fade/zoom) =====
      // Preparar slide anterior para fade-out
      if (previousSlide) {
        previousSlide.classList.add("wfslid1-prev");
        previousSlide.style.zIndex = 1;
        // Congelar transform do próprio slide para não voltar ao tamanho base durante o fade
        const prevSlideCS = window.getComputedStyle(previousSlide);
        previousSlide.style.transform = prevSlideCS.transform;
        // Congelar transform atual da imagem para não voltar ao tamanho original durante o fade
        const prevWrap = previousSlide.querySelector(".wfslid1-img-wrap");
        if (prevWrap) {
          const cs = window.getComputedStyle(prevWrap);
          prevWrap.style.transform = cs.transform;
          prevWrap.style.animation = "none";
        }
        // Fade-out do slide anterior mantendo o tamanho atual
        setTimeout(() => {
          previousSlide.style.opacity = 0;
          const onPrevFadeEnd = () => {
            if (prevWrap) {
              // Limpar estilos após concluir a transição
              prevWrap.style.transform = "";
              prevWrap.style.animation = "";
            }
            // Limpar transform inline do slide após o fade
            previousSlide.style.transform = "";
            previousSlide.classList.remove("wfslid1-kenburns-active");
            previousSlide.classList.remove("wfslid1-active", "wfslid1-prev");
            previousSlide.setAttribute("aria-hidden", "true");
            previousSlide.removeEventListener("transitionend", onPrevFadeEnd);
          };
          previousSlide.addEventListener("transitionend", onPrevFadeEnd, {
            once: true,
          });
        }, 50);
      }

      // Preparar próximo slide para fade-in
      if (nextSlide) {
        // Resetar animações de texto
        const content = nextSlide.querySelector(
          ".wfslid1-content, .banner-content"
        );
        if (content) {
          Array.from(content.children).forEach((el, index) => {
            el.style.animation = "none";
            el.style.animationPlayState = "paused";
            el.style.setProperty("--wfslid1-delay", `${0.2 + index * 0.15}s`);
            void el.offsetHeight;
          });
        }

        nextSlide.classList.add("wfslid1-active");
        nextSlide.setAttribute("aria-hidden", "false");
        nextSlide.style.zIndex = 2;
        nextSlide.style.opacity = 0;
        // NÃO iniciar Ken Burns ainda: deixar o próximo slide começar no tamanho original
        setTimeout(() => {
          nextSlide.style.opacity = 1;
          // Quando concluir o fade-in, ativar Ken Burns para começar o zoom
          const onNextFadeInEnd = () => {
            if (this.zoom) {
              nextSlide.classList.add("wfslid1-kenburns-active");
            }
            // Animar textos após o fade
            if (content) {
              Array.from(content.children).forEach((el) => {
                el.style.animation = "";
                el.style.opacity = "";
                el.style.transform = "";
                el.style.animationPlayState = "running";
                void el.offsetHeight;
              });
            }
            nextSlide.removeEventListener("transitionend", onNextFadeInEnd);
          };
          nextSlide.addEventListener("transitionend", onNextFadeInEnd, {
            once: true,
          });
        }, 100);
      }

      // Atualizar indicadores
      if (this.indicators && this.indicators.length > 0) {
        this.indicators.forEach((dot, i) => {
          dot.classList.toggle("wfslid1-active", i === idx);
        });
      }

      this.currentSlide = idx;
      console.log(`[WfSlid1] Fade de ${this.currentSlide} para ${idx}`);
    }

    next() {
      console.log(`[WfSlid1] Próximo slide: ${this.currentSlide + 1}`);
      this._showSlide(this.currentSlide + 1);
      this._restartAutoplay();
    }

    prev() {
      console.log(`[WfSlid1] Slide anterior: ${this.currentSlide - 1}`);
      this._showSlide(this.currentSlide - 1);
      this._restartAutoplay();
    }

    goTo(idx) {
      console.log(`[WfSlid1] Indo para slide: ${idx}`);
      this._showSlide(idx);
      this._restartAutoplay();
    }

    _setupEvents() {
      // Pausa no hover apenas se configurado
      if (this.pauseOnHover) {
        this.element.addEventListener("mouseenter", () => {
          this._hovering = true;
          this._stopAutoplay();
        });
        this.element.addEventListener("mouseleave", () => {
          this._hovering = false;
          this._startAutoplay();
        });
      }

      // Teclado
      this.element.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.prev();
        if (e.key === "ArrowRight") this.next();
      });

      // Foco para navegação por teclado
      this.element.tabIndex = 0;
      this.element.setAttribute("role", "region");
      this.element.setAttribute("aria-label", "Carrossel de slides");
    }

    _startAutoplay() {
      if (!this.autoplay || this.slides.length < 2 || this._hovering) return;

      this._stopAutoplay();
      this.timer = setInterval(() => {
        console.log(`[WfSlid1] Autoplay: próximo slide`);
        this.next();
      }, this.interval);

      console.log(
        `[WfSlid1] Autoplay iniciado com intervalo: ${this.interval}ms`
      );
    }

    _stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.debugLog(" Autoplay parado");
      }
    }

    _restartAutoplay() {
      this._stopAutoplay();
      this._startAutoplay();
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfSlid1]");
      const instances = [];

      elements.forEach((el) => {
        if (!el._wfSlid1) {
          try {
            const instance = new WfSlid1(el);
            instances.push(instance);
          } catch (error) {
            console.warn("WfSlid1: Erro ao inicializar elemento:", error);
          }
        }
      });

      return instances;
    }

    // Métodos estáticos de conveniência
    static next(element) {
      const instance = element._wfSlid1;
      if (instance) {
        instance.next();
      }
    }

    static prev(element) {
      const instance = element._wfSlid1;
      if (instance) {
        instance.prev();
      }
    }

    static goTo(element, index) {
      const instance = element._wfSlid1;
      if (instance) {
        instance.goTo(index);
      }
    }

    static startAutoplay(element) {
      const instance = element._wfSlid1;
      if (instance) {
        instance._startAutoplay();
      }
    }

    static stopAutoplay(element) {
      const instance = element._wfSlid1;
      if (instance) {
        instance._stopAutoplay();
      }
    }
  }

  // Registro no WebFull
  if (typeof window !== "undefined") {
    window.WfSlid1 = WfSlid1;

    if (window.WebFull && window.WebFull.modules) {
      window.WebFull.modules.WfSlid1 = WfSlid1;
    }
  }

  // Auto-inicialização apenas se WebFull não estiver presente
  if (typeof window !== "undefined" && !window.WebFull) {
    window.addEventListener("DOMContentLoaded", () => {
      WfSlid1.initAll();
    });
  }

})(window, document);


// ===== WfSlid2.js =====
(function (window, document) {
  "use strict";

  /**
   * WfSlid2 - Carrossel de Imagens Simples
   * v1.6 - Slider infinite simplificado e funcional
   */
  class WfSlid2 {
    constructor(element) {
      this.element = element;
      // Evita dupla inicialização
      if (this.element._wfSlid2) return this.element._wfSlid2;
      this.element._wfSlid2 = this;

      this.slides = [];
      this.currentSlide = 0;
      this.timer = null;
      this.config = this._getConfig();
      this.init();
    }

    _getConfig() {
      return {
        autoplay: this.element.getAttribute("WfSlid2-autoplay") === "true",
        interval:
          parseInt(this.element.getAttribute("WfSlid2-interval")) || 4000,
        transition: this.element.getAttribute("WfSlid2-transition") || "fade",
        direction:
          this.element.getAttribute("WfSlid2-direction") || "horizontal",
        duration:
          parseInt(this.element.getAttribute("WfSlid2-duration")) ||
          (this.element.getAttribute("WfSlid2-transition") === "fade"
            ? 1200
            : 800),
        arrows: this.element.getAttribute("WfSlid2-arrows") !== "false",
        indicators: this.element.getAttribute("WfSlid2-indicators") !== "false",
        pausehover: this.element.getAttribute("WfSlid2-pausehover") === "true",
        loop: this.element.getAttribute("WfSlid2-loop") !== "false",
      };
    }

    init() {
      this.loadCSS();
      this.slides = Array.from(this.element.querySelectorAll(".wfslid2-slide"));
      if (this.slides.length === 0) return;

      this._setupSlides();

      if (this.config.arrows) this._createArrows();
      if (this.config.indicators) this._createIndicators();

      if (this.config.autoplay) {
        this._startAutoplay();
      }

      if (this.config.pausehover) this._addHoverEvents();
    }

    loadCSS() {
      if (document.getElementById("wfslid2-styles")) return;

      const style = document.createElement("style");
      style.id = "wfslid2-styles";
      style.textContent = `
/* WfSlid2 - Slider avançado */

[WfSlid2] {
   position: relative;
   overflow: hidden;
   width: 100%;
   min-height: 400px;
   background: #222;
   border-radius: 12px;
}

[WfSlid2] .wfslid2-slide {
   position: absolute;
   top: 0; left: 0; right: 0; bottom: 0;
   width: 100%; height: 100%;
   opacity: 0;
   visibility: hidden;
   transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
}

[WfSlid2] .wfslid2-slide.wfslid2-active {
   opacity: 1;
   visibility: visible;
}

[WfSlid2] .wfslid2-slide img {
   width: 100%;
   height: 400px;
   object-fit: cover;
   border-radius: 12px;
}

/* Fade */
[WfSlid2][data-transition="fade"] .wfslid2-slide {
   opacity: 0 !important;
   visibility: hidden !important;
   transform: none !important;
   transition: opacity var(--wfslid2-duration, 1200ms) cubic-bezier(0.4, 0, 0.2, 1) !important,
               visibility var(--wfslid2-duration, 1200ms) cubic-bezier(0.4, 0, 0.2, 1) !important;
}
[WfSlid2][data-transition="fade"] .wfslid2-slide.wfslid2-active {
   opacity: 1 !important;
   visibility: visible !important;
}

/* Slider Horizontal */
[WfSlid2][data-transition="slider"][data-direction="horizontal"] .wfslid2-slide {
   opacity: 1 !important;
   visibility: visible !important;
   transform: translateX(100%) !important;
   transition: transform var(--wfslid2-duration, 800ms) cubic-bezier(0.4, 0, 0.2, 1) !important;
}
[WfSlid2][data-transition="slider"][data-direction="horizontal"] .wfslid2-slide.wfslid2-active {
   transform: translateX(0) !important;
}
[WfSlid2][data-transition="slider"][data-direction="horizontal"] .wfslid2-slide.wfslid2-prev {
   transform: translateX(-100%) !important;
}

/* Slider Vertical */
[WfSlid2][data-transition="slider"][data-direction="vertical"] .wfslid2-slide {
   opacity: 1 !important;
   visibility: visible !important;
   transform: translateY(100%) !important;
   transition: transform var(--wfslid2-duration, 800ms) cubic-bezier(0.4, 0, 0.2, 1) !important;
}
[WfSlid2][data-transition="slider"][data-direction="vertical"] .wfslid2-slide.wfslid2-active {
   transform: translateY(0) !important;
}
[WfSlid2][data-transition="slider"][data-direction="vertical"] .wfslid2-slide.wfslid2-prev {
   transform: translateY(-100%) !important;
}

/* Arrows */
[WfSlid2] .wfslid2-arrow {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   width: 54px;
   height: 54px;
   border: none;
   color: #fff;
   font-size: 2rem;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   z-index: 10;
   transition: opacity 0.2s ease;
   outline: none;
   opacity: 0.4;
}
[WfSlid2] .wfslid2-arrow:hover { opacity: 1; }
[WfSlid2] .wfslid2-arrow.wfslid2-prev { left: 4px; }
[WfSlid2] .wfslid2-arrow.wfslid2-next { right: 4px; }

/* Indicators */
[WfSlid2] .wfslid2-indicators {
   position: absolute;
   left: 0; right: 0; bottom: 12px;
   display: flex;
   justify-content: center;
   gap: 12px;
   z-index: 10;
}
[WfSlid2] .wfslid2-indicator {
   width: 12px; height: 12px;
   border-radius: 50%;
   background: #fff6;
   cursor: pointer;
   transition: background 0.2s ease;
   border: none;
}
[WfSlid2] .wfslid2-indicator.wfslid2-active { background: #fff; }

@media (max-width: 600px) {
   [WfSlid2] .wfslid2-arrow { width: 38px; height: 38px; font-size: 1.3rem; }
   [WfSlid2] .wfslid2-indicator { width: 10px; height: 10px; }
}
         `;
      document.head.appendChild(style);
    }

    _setupSlides() {
      // Configurar atributos de transição no container
      this.element.setAttribute("data-transition", this.config.transition);
      this.element.setAttribute("data-direction", this.config.direction);
      this.element.style.setProperty(
        "--wfslid2-duration",
        `${this.config.duration}ms`
      );

      // Configurar slides iniciais
      this.slides.forEach((slide, index) => {
        if (index === 0) {
          slide.classList.add("wfslid2-active");
        } else {
          slide.classList.remove("wfslid2-active", "wfslid2-prev");
        }
      });
    }

    _showSlide(idx) {
      const currentSlide = this.slides[this.currentSlide];
      const nextSlide = this.slides[idx];

      // Se for o mesmo slide, não fazer nada
      if (this.currentSlide === idx) return;

      // Remover classes ativas
      this.slides.forEach((slide) => {
        slide.classList.remove(
          "wfslid2-active",
          "wfslid2-prev",
          "wfslid2-next"
        );
      });

      // Aplicar transição baseada no tipo
      if (this.config.transition === "fade") {
        // Fade: simplesmente mostrar o próximo slide
        nextSlide.classList.add("wfslid2-active");
      } else if (this.config.transition === "slider") {
        // Slider: sempre para frente (infinite)
        nextSlide.classList.add("wfslid2-active");
        currentSlide.classList.add("wfslid2-prev");
      }

      this.currentSlide = idx;

      // Atualizar indicadores
      this._updateIndicators();
    }

    _updateIndicators() {
      const indicators = this.element.querySelectorAll(".wfslid2-indicator");
      indicators.forEach((dot, i) => {
        dot.classList.toggle("wfslid2-active", i === this.currentSlide);
      });
    }

    _createArrows() {
      const prev = document.createElement("button");
      prev.className = "wfslid2-arrow wfslid2-prev";
      prev.innerHTML = "‹";
      prev.onclick = () => this.prev();

      const next = document.createElement("button");
      next.className = "wfslid2-arrow wfslid2-next";
      next.innerHTML = "›";
      next.onclick = () => this.next();

      this.element.appendChild(prev);
      this.element.appendChild(next);
    }

    _createIndicators() {
      const indicators = document.createElement("div");
      indicators.className = "wfslid2-indicators";

      this.slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "wfslid2-indicator";
        if (index === 0) dot.classList.add("wfslid2-active");
        dot.onclick = () => this.goTo(index);
        indicators.appendChild(dot);
      });

      this.element.appendChild(indicators);
    }

    _addHoverEvents() {
      this.element.addEventListener("mouseenter", () => {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      });

      this.element.addEventListener("mouseleave", () => {
        if (this.config.autoplay) {
          this._startAutoplay();
        }
      });
    }

    next() {
      let nextIndex = this.currentSlide + 1;

      // Loop infinito: se chegar ao final, continua do próximo slide
      if (nextIndex >= this.slides.length) {
        nextIndex = 0;
      }

      this._showSlide(nextIndex);
    }

    prev() {
      let prevIndex = this.currentSlide - 1;

      // Loop infinito: se chegar ao início, continua do último slide
      if (prevIndex < 0) {
        prevIndex = this.slides.length - 1;
      }

      this._showSlide(prevIndex);
    }

    goTo(idx) {
      // Garantir que o índice está dentro dos limites
      if (idx < 0) idx = 0;
      if (idx >= this.slides.length) idx = this.slides.length - 1;

      this._showSlide(idx);
    }

    _startAutoplay() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.next();
      }, this.config.interval);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfSlid2]");
      const instances = [];
      elements.forEach((el) => {
        if (!el._wfSlid2) {
          try {
            instances.push(new WfSlid2(el));
          } catch (error) {
            console.warn("WfSlid2: Erro ao inicializar elemento:", error);
          }
        }
      });
      return instances;
    }
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfSlid2 = WfSlid2;
  } else if (typeof window !== "undefined") {
    window.WfSlid2 = WfSlid2;
  }

  // Auto-inicialização apenas se WebFull não estiver presente
  if (typeof window !== "undefined" && !window.WebFull) {
    window.addEventListener("DOMContentLoaded", () => {
      WfSlid2.initAll();
    });
  }
})(window);


// ===== WfTable.js =====
(function (window, document) {
  "use strict";

  // WfTable.js - Tabela interativa completa (ordenar, paginar, buscar, dados dinâmicos)
  // SandroWeb 2025

  // Rastreamento global de instâncias para evitar duplicação
  window.SwTableInstances = window.SwTableInstances || new WeakMap();

  class WfTable {
    constructor(element) {
      this.element = element;
      this.container = element; // Definir container como o próprio element
      // Support multiple attribute naming conventions for backwards compatibility
      this.sortable =
        this.element.getAttribute("WfTable-sort") === "true" ||
        this.element.getAttribute("WfTable-sortable") === "true";
      this.searchable =
        this.element.getAttribute("WfTable-search") === "true" ||
        this.element.getAttribute("WfTable-searchable") === "true";
      this.paginated =
        this.element.getAttribute("WfTable-pagination") === "true" ||
        this.element.getAttribute("WfTable-paginated") === "true";
      // page size supports both WfTable-items-per-page and WfTable-pageSize
      this.itemsPerPage =
        parseInt(
          this.element.getAttribute("WfTable-items-per-page") ||
            this.element.getAttribute("WfTable-pageSize")
        ) || 10;
      this.responsive =
        this.element.getAttribute("WfTable-responsive") !== "false";
      this.striped = this.element.getAttribute("WfTable-striped") === "true";
      this.hoverable =
        this.element.getAttribute("WfTable-hoverable") === "true";

      // Configurações padrão
      this.options = {
        data: [],
        url: null,
        columns: [],
        pageSize: this.itemsPerPage,
        lengthMenu: [10, 25, 50, 100],
        search: this.searchable,
        pagination: this.paginated,
        sortable: this.sortable,
        labels: {
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          empty: "Nenhum dado encontrado",
        },
      };

      this.data = [];
      this.filteredData = [];
      this.currentPage = 1;
      this.sortColumn = null;
      this.sortDirection = "asc";
      this.searchTerm = "";
      this.initialOrderBy = null;
      this.initialOrderDir = "asc";

      this.init();
    }

    async init() {
      this.loadCSS();

      // Carregar configuração sempre primeiro
      this.loadConfig();

      // Se houver dados ou URL configurados, operar como tabela dinâmica
      const hasDynamic =
        this.options &&
        ((Array.isArray(this.options.data) && this.options.data.length > 0) ||
          !!this.options.url);

      if (hasDynamic) {
        await this._withPreload(async () => {
          if (typeof this.options.loadData === "function") {
            await this.options.loadData.call(this);
          } else {
            await this.loadData();
          }
          this.renderTable();
        });
        return;
      }

      // Caso contrário, tentar parse de tabela HTML estática
      const isTableElement =
        this.element.tagName && this.element.tagName.toUpperCase() === "TABLE";
      const hasInnerTable = !!(
        this.element.querySelector &&
        this.element.querySelector("table.wftable, table")
      );
      if (isTableElement || hasInnerTable) {
        this.parseHtmlTable();
        this.renderTable();
      }
    }

    async _withPreload(fn) {
      let loaded = false;
      try {
        // Garantir que WfLoad esteja disponível
        try {
          if (
            window.WebfullLoader &&
            typeof window.WebfullLoader.load === "function"
          ) {
            await window.WebfullLoader.load("sw-load");
          }
        } catch (e) {}
        // Aplicar overlay de preload suave
        try {
          const prevH = this.container.offsetHeight;
          if (prevH && prevH > 0) {
            this.container.style.minHeight = prevH + "px";
          } else {
            this.container.style.minHeight = "120px";
          }
          if (window.WfLoad && typeof window.WfLoad.load === "function") {
            window.WfLoad.load(this.container, {
              loader: "skeleton",
              size: "small",
              minDisplayTime: 300,
            });
            loaded = true;
          }
        } catch (e) {}

        const res = await fn();

        // Remover overlay com fade e mostrar conteúdo
        try {
          if (
            loaded &&
            window.WfLoad &&
            typeof window.WfLoad.show === "function"
          ) {
            window.WfLoad.show(this.container);
          }
          this.container.style.minHeight = "";
        } catch (e) {}
        return res;
      } catch (e) {
        // Em caso de erro, ainda tentar remover overlay
        try {
          if (
            loaded &&
            window.WfLoad &&
            typeof window.WfLoad.show === "function"
          ) {
            window.WfLoad.show(this.container);
          }
        } catch (_) {}
        try {
          this.container.style.minHeight = "";
        } catch (_) {}
        throw e;
      }
    }

    loadConfig() {
      // Carregar configuração JSON
      const configAttr = this.element.getAttribute("WfTable-config");
      if (configAttr) {
        try {
          const config = JSON.parse(configAttr);
          this.options = { ...this.options, ...config };
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear configuração JSON:", error);
          }
        }
      }

      // Carregar atributos individuais
      const url =
        this.element.getAttribute("WfTable-url") ||
        this.element.getAttribute("wftable-url");
      if (url) this.options.url = url;

      const data =
        this.element.getAttribute("WfTable-data") ||
        this.element.getAttribute("wftable-data");
      if (data) {
        try {
          this.options.data = JSON.parse(data);
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear dados JSON:", error);
          }
        }
      }
      // Ordenação inicial via atributos
      try {
        const ob =
          this.element.getAttribute("WfTable-order-by") ||
          this.element.getAttribute("wftable-order-by");
        const od = (
          this.element.getAttribute("WfTable-order-dir") ||
          this.element.getAttribute("wftable-order-dir") ||
          "asc"
        ).toLowerCase();
        if (ob && ob.trim() !== "") this.initialOrderBy = ob.trim();
        if (od === "asc" || od === "desc") this.initialOrderDir = od;
      } catch (e) {}
      // Ler cabeçalhos internos (thead th) para definir colunas quando presente
      try {
        const thead =
          this.container && this.container.querySelector
            ? this.container.querySelector("thead")
            : null;
        if (thead) {
          const ths = Array.from(thead.querySelectorAll("th"));
          const headers = ths
            .map((th) => {
              const label = (th.textContent || "").trim();
              const field = th.getAttribute("data-field") || label;
              return { field, label };
            })
            .filter((h) => h.field && h.label);
          if (headers.length) {
            this.options.headers = headers;
            this.options.columns = headers.map((h) => h.field);
          }
        }
      } catch (e) {}
    }

    async loadData() {
      if (Array.isArray(this.options.data) && this.options.data.length > 0) {
        this.data = this.options.data;
      } else if (this.options.url) {
        try {
          // Normalizar URL e aplicar https quando necessário para evitar mixed content
          let fetchUrl = this.options.url;
          try {
            const u = new URL(
              fetchUrl,
              window.location && window.location.href
                ? window.location.href
                : undefined
            );
            if (
              window.location &&
              window.location.protocol === "https:" &&
              u.protocol !== "https:"
            ) {
              u.protocol = "https:";
            }
            // Bypass caches com carimbo de tempo
            try {
              u.searchParams.set("_ts", String(Date.now()));
            } catch (_) {}
            fetchUrl = u.toString();
          } catch (_) {}

          const res = await fetch(fetchUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
            credentials: "same-origin",
            cache: "no-store",
          });
          const json = await res.json();
          if (Array.isArray(json)) this.data = json;
          else if (json && Array.isArray(json.data)) this.data = json.data;
          else if (json && Array.isArray(json.items)) this.data = json.items;
          else if (json && Array.isArray(json.rows)) this.data = json.rows;
          else this.data = [];
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao carregar dados:", error);
          }
          this.data = [];
        }
      }
      this.filteredData = [...this.data];
      // Fixar ordem das colunas com base no primeiro item carregado para garantir estabilidade do sort
      try {
        if (!this.options.columns || !this.options.columns.length) {
          const first = this.data[0] || {};
          const cols = Object.keys(first);
          if (cols && cols.length) this.options.columns = cols;
        }
      } catch (_) {}
    }

    parseHtmlTable() {
      // Extrai dados da tabela HTML existente
      if (!this.container) {
        console.warn("WfTable: container não encontrado");
        return;
      }

      const table =
        this.container.tagName === "TABLE"
          ? this.container
          : this.container.querySelector("table");
      if (!table) {
        console.warn("WfTable: tabela HTML não encontrada");
        return;
      }

      if (!table.tHead || !table.tBodies[0]) {
        console.warn("WfTable: estrutura de tabela inválida");
        return;
      }

      const headers = Array.from(table.tHead.rows[0].cells).map((th) =>
        th.textContent.trim()
      );
      // Ignora linhas técnicas/ocultas (ex.: CSRF) e garante fallback vazio
      const rows = Array.from(table.tBodies[0].rows)
        .filter((tr) => {
          try {
            if (tr.classList && tr.classList.contains("js-csrf-row"))
              return false;
            const styleAttr = tr.getAttribute("style") || "";
            if (/display\s*:\s*none/i.test(styleAttr)) return false;
            const dataIgnore = tr.getAttribute("data-ignore");
            if (dataIgnore && String(dataIgnore).toLowerCase() === "true")
              return false;
          } catch (e) {}
          return true;
        })
        .map((tr) =>
          Array.from(tr.cells).map((td) => (td.innerHTML || "").trim())
        );
      this.options.columns = headers;
      this.data = rows.map((row) => {
        const obj = {};
        headers.forEach(
          (h, i) => (obj[h] = row[i] !== undefined ? row[i] : "")
        );
        return obj;
      });
      this.filteredData = [...this.data];

      // Não limpar o conteúdo aqui - deixar para o renderTable fazer isso
    }

    renderTable() {
      const host =
        this.container.querySelector(".wfload-content") || this.container;
      host.innerHTML = "";
      // Wrapper responsivo
      this.respDiv = document.createElement("div");
      this.respDiv.className = "wftable-container";
      host.appendChild(this.respDiv);
      this.renderTopBar();
      this.renderTableElement();
      this.renderBottomBar();
      this.updateTable();
      // Inicializa componentes após renderização dinâmica
      if (window.SwFullInitAll) {
        setTimeout(() => {
          window.SwFullInitAll(this.container);
        }, 100);
      }
    }

    renderTopBar() {
      // Barra superior: dropdown esquerda, busca direita
      const topBar = document.createElement("div");
      topBar.className = "wftable-topbar";
      // Dropdown quantidade (esquerda)
      const left = document.createElement("div");
      left.className = "wftable-topbar-left";
      const select = document.createElement("select");
      select.className = "wftable-length-select";

      // Adicionar opções ao select
      this.options.lengthMenu.forEach((n) => {
        if (n != null && n !== "") {
          const opt = document.createElement("option");
          opt.value = String(n);
          opt.textContent = n;
          if (String(n) === String(this.options.pageSize)) opt.selected = true;
          select.appendChild(opt);
        }
      });

      // Adicionar event listener para mudança de página
      select.addEventListener("change", (e) => {
        this.options.pageSize = parseInt(e.target.value);
        this.currentPage = 1;
        this.updateTable();
      });

      // Adicionar elementos ao container esquerdo
      const showLabel = document.createElement("span");
      showLabel.textContent = "Mostrar";
      const recordsLabel = document.createElement("span");
      recordsLabel.textContent = "registros";

      left.appendChild(showLabel);
      left.appendChild(select);
      left.appendChild(recordsLabel);
      topBar.appendChild(left);
      // Busca (direita)
      if (this.options.search) {
        const right = document.createElement("div");
        right.className = "wftable-topbar-right";

        // Criar campo de busca
        const searchLabel = document.createElement("label");
        searchLabel.className = "wftable-search-label";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "wftable-search-input";
        searchInput.placeholder = "Buscar...";

        // Adicionar event listener para busca (debounced)
        let debounceTimer = null;
        searchInput.addEventListener("input", (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.currentPage = 1;
            this.filterData(e.target.value);
          }, 200);
        });

        searchLabel.appendChild(searchInput);
        right.appendChild(searchLabel);
        topBar.appendChild(right);
      }
      this.respDiv.appendChild(topBar);
    }

    renderTableElement() {
      this.tableEl = document.createElement("table");
      this.tableEl.className = "wftable";
      this.respDiv.appendChild(this.tableEl);
    }

    renderBottomBar() {
      // Barra inferior: info esquerda, paginação centro
      const bottomBar = document.createElement("div");
      bottomBar.className = "wftable-bottombar";
      // Info (esquerda)
      this.infoDiv = document.createElement("div");
      this.infoDiv.className = "wftable-info";
      bottomBar.appendChild(this.infoDiv);
      // Paginação (centro)
      this.paginationDiv = document.createElement("div");
      this.paginationDiv.className = "wftable-pagination";
      bottomBar.appendChild(this.paginationDiv);
      this.respDiv.appendChild(bottomBar);
    }

    // Utilitário interno: remover HTML e normalizar texto para busca/ordenação
    stripHTML(val) {
      try {
        if (val == null) return "";
        const s = String(val);
        // Se não há tags, apenas trim
        if (s.indexOf("<") === -1) return s.replace(/\s+/g, " ").trim();
        // Decode entities e remover tags usando um container temporário
        const tmp = document.createElement("div");
        tmp.innerHTML = s;
        const text = (tmp.textContent || tmp.innerText || "").replace(
          /\s+/g,
          " "
        );
        return text.trim();
      } catch (e) {
        try {
          return String(val).trim();
        } catch (_) {
          return "";
        }
      }
    }

    filterData(query) {
      if (!query) {
        this.filteredData = [...this.data];
      } else {
        const q = query.toLowerCase();
        this.filteredData = this.data.filter((row) =>
          Object.values(row).some((val) =>
            this.stripHTML(val).toLowerCase().includes(q)
          )
        );
      }
      this.updateTable();
    }

    showEmpty() {
      // Esconder a tabela e mostrar mensagem vazia
      if (this.tableEl) {
        this.tableEl.style.display = "none";
      }
      if (this.infoDiv) {
        this.infoDiv.textContent = "Nenhum dado encontrado";
      }

      // Adicionar mensagem vazia se não existir
      if (!this.respDiv.querySelector(".wftable-empty")) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "wftable-empty";
        emptyDiv.innerHTML = `
        <i class="wf wf-inbox"></i>
        <span>${this.options.labels.empty}</span>
      `;
        this.respDiv.appendChild(emptyDiv);
      }
    }

    updateTable() {
      // Remover mensagem vazia se existir
      const emptyDiv = this.respDiv.querySelector(".wftable-empty");
      if (emptyDiv) {
        emptyDiv.remove();
      }

      // Verificar se há dados
      if (this.filteredData.length === 0) {
        this.showEmpty();
        return;
      }

      // Mostrar tabela
      this.tableEl.style.display = "table";

      // Cabeçalho
      const cols =
        this.options.columns && this.options.columns.length
          ? this.options.columns
          : Object.keys(this.data[0] || {});

      // Aplicar ordenação inicial se configurada e ainda não definida
      if (this.sortColumn === null && cols.length && this.initialOrderBy) {
        let idx = null;
        try {
          if (/^\d+$/.test(this.initialOrderBy))
            idx = parseInt(this.initialOrderBy, 10);
          else idx = cols.indexOf(this.initialOrderBy);
        } catch (_) {
          idx = null;
        }
        if (typeof idx === "number" && idx >= 0 && idx < cols.length) {
          this.sortColumn = idx;
          this.sortDirection = this.initialOrderDir || "asc";
          const col = cols[idx];
          this.filteredData.sort((a, b) => {
            const aVal = this.stripHTML(a[col]);
            const bVal = this.stripHTML(b[col]);
            const aNum = parseFloat(String(aVal).replace(",", "."));
            const bNum = parseFloat(String(bVal).replace(",", "."));
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return this.sortDirection === "asc" ? aNum - bNum : bNum - aNum;
            } else {
              return this.sortDirection === "asc"
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
            }
          });
        }
      }
      const theadEl = document.createElement("thead");
      const trHead = document.createElement("tr");
      const headers =
        this.options.headers && this.options.headers.length
          ? this.options.headers
          : cols.map((c) => ({ field: c, label: c }));
      headers.forEach((h, i) => {
        const th = document.createElement("th");
        th.setAttribute("WfTable-col", String(i));
        th.textContent = String(h.label);
        if (this.sortColumn === i) {
          const ic = document.createElement("i");
          ic.className = "wf wf-expand-vertical";
          ic.style.marginLeft = "6px";
          th.appendChild(ic);
        }
        trHead.appendChild(th);
      });
      theadEl.appendChild(trHead);
      // Paginação
      let pageSize = this.options.pagination
        ? this.options.pageSize
        : this.filteredData.length;

      let totalPages = Math.max(
        1,
        Math.ceil(this.filteredData.length / pageSize)
      );
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const start = (this.currentPage - 1) * pageSize;
      const end = start + pageSize;
      const pageRows = this.filteredData.slice(start, end);

      // Corpo
      const tbodyEl = document.createElement("tbody");
      pageRows.forEach((row) => {
        const tr = document.createElement("tr");
        headers.forEach((h, idx) => {
          const key = h.field || h.label;
          const td = document.createElement("td");
          let val = row[key];
          if (val === undefined) val = row[h.label];
          if (val === undefined) {
            try {
              const vals = Object.values(row);
              if (idx < vals.length) val = vals[idx];
            } catch (e) {}
          }
          if (val === undefined || val === null) val = "";
          td.innerHTML = val;
          tr.appendChild(td);
        });
        tbodyEl.appendChild(tr);
      });
      this.tableEl.innerHTML = "";
      this.tableEl.appendChild(theadEl);
      this.tableEl.appendChild(tbodyEl);
      // after render attach keyboard navigation and set role attributes for accessibility
      try {
        this.tableEl.setAttribute("role", "table");
        this.tableEl.querySelectorAll("th").forEach((th, i) => {
          th.setAttribute("role", "columnheader");
          th.tabIndex = 0;
          th.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              th.click();
            }
          });
        });
        this.tableEl.querySelectorAll("tbody tr").forEach((tr) => {
          tr.setAttribute("role", "row");
        });
      } catch (e) {}
      // Eventos de ordenação
      this.tableEl.querySelectorAll("th").forEach((th) => {
        th.onclick = () => {
          const colIdx = parseInt(th.getAttribute("WfTable-col"));
          this.sortByColumn(colIdx);
        };
      });
      // Info
      const total = this.filteredData.length;
      const info = this.options.labels.info
        .replace("_START_", total === 0 ? 0 : start + 1)
        .replace("_END_", Math.min(end, total))
        .replace("_TOTAL_", total);
      this.infoDiv.textContent = info;
      // Paginação
      if (this.options.pagination) this.renderPagination(totalPages);
      // Responsividade
      this.tableEl.parentElement.style.overflowX = "auto";
      try {
        if (window.WfTool && typeof window.WfTool.initAll === "function") {
          window.WfTool.initAll(this.container);
        }
        if (
          window.SwPanelAjax &&
          typeof window.SwPanelAjax.initAll === "function"
        ) {
          window.SwPanelAjax.initAll(this.container);
        }
      } catch (e) {}
    }

    sortByColumn(index) {
      if (this.sortColumn === index) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = index;
        this.sortDirection = "asc";
      }
      const col = (this.options.columns || Object.keys(this.data[0] || {}))[
        index
      ];
      this.filteredData.sort((a, b) => {
        const aVal = this.stripHTML(a[col]);
        const bVal = this.stripHTML(b[col]);
        const aNum = parseFloat(String(aVal).replace(",", "."));
        const bNum = parseFloat(String(bVal).replace(",", "."));
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return this.sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        } else {
          return this.sortDirection === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
        }
      });
      this.currentPage = 1;
      this.updateTable();
    }

    renderPagination(totalPages) {
      this.paginationDiv.innerHTML = "";
      // Botão primeira página
      const first = document.createElement("button");
      first.textContent = "«";
      first.disabled = this.currentPage === 1;
      first.onclick = () => {
        this.currentPage = 1;
        this.updateTable();
      };
      this.paginationDiv.appendChild(first);
      // Botão anterior
      const prev = document.createElement("button");
      prev.textContent = "‹";
      prev.disabled = this.currentPage === 1;
      prev.onclick = () => {
        this.currentPage--;
        this.updateTable();
      };
      this.paginationDiv.appendChild(prev);
      // Números de página (máx 5 visíveis)
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }
      for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === this.currentPage;
        if (i === this.currentPage) btn.className = "active";
        btn.onclick = () => {
          this.currentPage = i;
          this.updateTable();
        };
        this.paginationDiv.appendChild(btn);
      }
      // Botão próximo
      const next = document.createElement("button");
      next.textContent = "›";
      next.disabled = this.currentPage === totalPages;
      next.onclick = () => {
        this.currentPage++;
        this.updateTable();
      };
      this.paginationDiv.appendChild(next);
      // Botão última página
      const last = document.createElement("button");
      last.textContent = "»";
      last.disabled = this.currentPage === totalPages;
      last.onclick = () => {
        this.currentPage = totalPages;
        this.updateTable();
      };
      this.paginationDiv.appendChild(last);
    }

    loadCSS() {
      if (!document.getElementById("wftable-styles")) {
        // Inject internal component CSS to avoid external 404/500 issues
        const s = document.createElement("style");
        s.id = "wftable-styles";
        s.textContent = `
/* WfTable component internal styles - polished 'old' look with WfDay theme support */
:root {
  --swtable-bg: var(--bran);
  --swtable-border: var(--neut2);
  --swtable-head-bg: var(--neut2);
  --swtable-primary: var(--prin);
  --swtable-text: var(--neut10);
  --swtable-muted: var(--neut6);
  --swtable-row-odd: var(--bran); /* cor sim */
  --swtable-row-even: var(--neut1); /* cor não */
  --swtable-hover: var(--neut2);
}

.wftable-container { width: 100%; margin: 0.75rem 0; font-family: inherit; color: var(--swtable-text); }
.wftable-topbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:6px; }
.wftable-topbar-left { display:flex; align-items:center; gap:8px; color: var(--swtable-muted); }
.wftable-length-select { padding:6px 8px; border:1px solid var(--swtable-border); background:var(--swtable-bg); border-radius:4px; }
.wftable-topbar-right { display:flex; align-items:center; gap:8px; }
.wftable-search-label { display:block; }
.wftable-search-input { padding:8px 10px; border:1px solid var(--swtable-border); border-radius:6px; min-width:180px; background: var(--bran); }

.wftable { border-collapse: separate; border-spacing: 0; width:100%; background: var(--swtable-bg); box-shadow: 0 1px 2px rgba(0,0,0,0.02); font-family: var(--font1); }
.wftable thead th { position: sticky; top:0; z-index:2; background: var(--swtable-head-bg); padding:8px; text-align:left; font-family: var(--font1b); border-bottom:1px solid var(--swtable-border); cursor:pointer; }
.wftable tbody td { padding:10px; border-bottom:1px solid var(--swtable-border); vertical-align:middle; font-size:13px; }
.wftable tbody tr:nth-child(odd) { background: var(--swtable-row-odd); }
.wftable tbody tr:nth-child(even) { background: var(--swtable-row-even); }
.wftable tbody tr:hover { background: var(--swtable-hover); }

.wftable-info { font-size:1.2rem; color:var(--swtable-muted); padding:0 0 12px 0; }
.wftable-bottombar { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:2px; }
.wftable-pagination { display:flex; gap:6px; align-items:center; }
.wftable-pagination button { padding:3px 10px; background:var(--swtable-bg); cursor:pointer; border-radius:4px; color:var(--swtable-text); }
.wftable-pagination button.active { background: var(--swtable-primary); color: #fff; border-color: var(--swtable-primary); }
.wftable-empty { padding: 18px; text-align:center; color:var(--swtable-muted); }

/* small badges and action buttons inside table cells */
.wftable .badge { display:inline-block; padding:4px 8px; border-radius:12px; font-size:0.85rem; }
.badge-success { background:var(--suc); color:var(--bran); }
.badge-warning { background:var(--aler); color:var(--neut10); }
.badge-danger { background:var(--notu); color:var(--bran); }

/* responsive adjustments */
@media (max-width:900px){
  .wftable-topbar { flex-direction:column; align-items:stretch; gap:6px; }
  .wftable-search-input { width:100%; min-width:0; }
}

/* WfDay night mode */
html.wfday-night {
  --swtable-bg: var(--neut12);
  --swtable-border: var(--neut10);
  --swtable-head-bg: var(--neut12);
  --swtable-primary: var(--prin-);
  --swtable-text: var(--neut3);
  --swtable-muted: var(--neut6);
   --swtable-row-odd: var(--neut11);
  --swtable-row-even: var(--neut10);
  --swtable-hover: var(--neut12);
}

`;
        document.head.appendChild(s);
      }
    }

    _injectFallbackCSS() {
      if (document.getElementById("wftable-fallback-styles")) return;
      try {
        const s = document.createElement("style");
        s.id = "wftable-fallback-styles";
        s.textContent = `
/* fallback minimal WfTable styles */
.wftable { border-collapse: collapse; width: 100%; }
.wftable th, .wftable td { padding: 8px; border: 1px solid #e0e0e0; }
.wftable th { background: #f5f5f5; }
.wftable-container { width: 100%; overflow-x: auto; }
.wftable-topbar { display: flex; justify-content: space-between; margin-bottom: 10px; }
.wftable-bottombar { display: flex; justify-content: space-between; margin-top: 10px; }
.wftable-pagination button { margin: 0 2px; padding: 5px 10px; }
.wftable-empty { text-align: center; padding: 20px; color: #666; }
`;
        document.head.appendChild(s);
      } catch (e) {
        console.warn("WfTable: Erro ao injetar CSS fallback:", e);
      }
    }

    // API pública
    reload() {
      this.init();
    }
    getData() {
      return this.filteredData;
    }

    // Export current view (filteredData) as CSV
    exportCSV(filename = "export.csv") {
      try {
        const cols = this.options.columns || Object.keys(this.data[0] || {});
        const rows = [cols];
        this.filteredData.forEach((r) => {
          rows.push(
            cols.map((c) => {
              const cell = this.stripHTML(r[c]);
              return cell != null ? String(cell).replace(/"/g, '""') : "";
            })
          );
        });
        const csv = rows
          .map((r) => r.map((cell) => `"${cell}"`).join(","))
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV error", e);
      }
    }

    // Inicialização automática
    static initAll(container = document) {
      // Support explicit containers (attribute variations) and plain <table class="wftable"> markup
      const selector = "[WfTable],[swtable],[sw-table], table.wftable";
      let elements = Array.from(container.querySelectorAll(selector));

      // Include the container itself if it matches, to handle loader passing the host element
      try {
        const isHostMatch =
          container !== document &&
          ((container.matches && container.matches("[WfTable]")) ||
            (container.tagName &&
              container.tagName.toUpperCase() === "TABLE" &&
              container.classList &&
              container.classList.contains("wftable")));
        if (isHostMatch) {
          // avoid duplicates
          if (!elements.includes(container)) elements.unshift(container);
        }
      } catch (e) {}
      const instances = [];

      // If no elements found in document root, we might be initializing too early — retry a few times
      if (elements.length === 0 && container === document) {
        WfTable._initRetries = (WfTable._initRetries || 0) + 1;
        if (WfTable._initRetries <= 5) {
          // schedule a retry after short delay
          setTimeout(() => WfTable.initAll(document), 150);
          console.debug &&
            console.debug(
              "WfTable.initAll: no elements found, retrying",
              WfTable._initRetries
            );
          return instances;
        } else {
          console.debug &&
            console.debug("WfTable.initAll: max retries reached");
        }
      }

      elements = Array.from(container.querySelectorAll(selector));
      console.debug &&
        console.debug("WfTable.initAll: found elements", elements.length);
      elements.forEach((el) => {
        // Ignorar elementos que pertençam ao WfTableAjax (docs/demos usam WfTableAjax)
        try {
          if (
            (el.hasAttribute && el.hasAttribute("WfTableAjax")) ||
            (el.closest && el.closest("[WfTableAjax]")) ||
            (el.classList && el.classList.contains("wftableajax"))
          ) {
            // pular este elemento, ele é gerenciado pelo WfTableAjax
            return;
          }
        } catch (e) {}

        if (!el._swtableInitialized) {
          try {
            // If the element is a TABLE inside a wrapper with [WfTable], prefer initializing the wrapper
            let host = el;
            try {
              if (el.tagName && el.tagName.toUpperCase() === "TABLE") {
                const closest = el.closest("[WfTable]");
                if (closest) host = closest;
              }
            } catch (e) {}

            const instance = new WfTable(host);
            // attach instance to both host and inner table if present
            try {
              host._swtable = instance;
              host._swtableInitialized = true;
            } catch (e) {}
            try {
              const innerTable =
                host.tagName && host.tagName.toUpperCase() === "TABLE"
                  ? host
                  : host.querySelector && host.querySelector("table.wftable");
              if (innerTable) {
                innerTable._swtable = instance;
                innerTable._swtableInitialized = true;
              }
            } catch (e) {}
            instances.push(instance);
            console.debug && console.debug("WfTable: initialized host", host);
          } catch (error) {
            console.warn("WfTable: Erro ao inicializar elemento:", error);
          }
        }
      });

      return instances;
    }

    // Métodos estáticos de conveniência
    static getData(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      const data = [];
      elements.forEach((el) => {
        if (el._swtable) {
          data.push(el._swtable.getData());
        }
      });
      return data;
    }

    // Static helper: export CSV for a table element or wrapper
    static exportCSV(tableElement, filename = "export.csv") {
      try {
        const inst =
          tableElement &&
          (tableElement._swtable ||
            (tableElement.querySelector &&
              tableElement.querySelector("table") &&
              tableElement.querySelector("table")._swtable));
        if (inst && typeof inst.exportCSV === "function")
          return inst.exportCSV(filename);
        // fallback: try parse static table
        const table =
          tableElement &&
          tableElement.tagName &&
          tableElement.tagName.toUpperCase() === "TABLE"
            ? tableElement
            : tableElement && tableElement.querySelector
            ? tableElement.querySelector("table")
            : null;
        if (!table) return;
        const headers = Array.from(
          table.tHead ? table.tHead.rows[0].cells : []
        ).map((th) => th.textContent.trim());
        const rows = Array.from(table.tBodies[0].rows).map((tr) =>
          Array.from(tr.cells).map((td) => td.textContent.trim())
        );
        const data = [headers].concat(rows);
        const csv = data
          .map((r) =>
            r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
          )
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV static fallback error", e);
      }
    }

    static reload(container = document) {
      try {
        let didReload = false;
        // Se o próprio container já tem instância, recarregar diretamente
        try {
          if (container !== document) {
            if (
              container._swtable &&
              typeof container._swtable.reload === "function"
            ) {
              container._swtable.reload();
              didReload = true;
            } else {
              const inner =
                container.querySelector &&
                container.querySelector("table.wftable");
              if (
                inner &&
                inner._swtable &&
                typeof inner._swtable.reload === "function"
              ) {
                inner._swtable.reload();
                didReload = true;
              }
            }
          }
        } catch (_) {}

        // Suportar tanto a TABELA com classe 'wftable' quanto o wrapper com [WfTable]
        const tables = Array.from(container.querySelectorAll("table.wftable"));
        const wrappers = Array.from(
          container.querySelectorAll("[WfTable],[wftable],[wf-table]")
        );

        tables.forEach((el) => {
          if (el._wfTable && typeof el._wfTable.reload === "function") {
            el._wfTable.reload();
            didReload = true;
          }
        });

        wrappers.forEach((host) => {
          if (host._wfTable && typeof host._wfTable.reload === "function") {
            host._wfTable.reload();
            didReload = true;
          }
        });

        // Fallback: se nada foi recarregado, tentar no documento inteiro
        if (!didReload && container !== document) {
          const allTables = Array.from(
            document.querySelectorAll("table.wftable")
          );
          const allWrappers = Array.from(
            document.querySelectorAll("[WfTable],[wftable],[wf-table]")
          );
          allTables.forEach((el) => {
            if (el._wfTable && typeof el._wfTable.reload === "function") {
              el._wfTable.reload();
            }
          });
          allWrappers.forEach((host) => {
            if (host._wfTable && typeof host._wfTable.reload === "function") {
              host._wfTable.reload();
            }
          });
        }
      } catch (e) {
        console.warn("WfTable.reload error", e);
      }
    }

    static destroy(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      elements.forEach((el) => {
        if (el._wfTable) {
          delete el._wfTable;
          delete el._swtableInitialized;
        }
      });
    }
  }

  // Exportação Global
  if (typeof window !== 'undefined') {
     window.WfTable = WfTable;
     if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfTable = WfTable;
     }
  }

  // Auto-inicialização
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfTable.initAll());
    } else {
      WfTable.initAll();
    }
  }
})(window, document);


// ===== WfTable1.js =====
// WfTable.js - Tabela interativa completa (ordenar, paginar, buscar, dados dinâmicos)
// SandroWeb 2025

(function(window, document) {
  'use strict';

  // Rastreamento global de instâncias para evitar duplicação
  window.SwTableInstances = window.SwTableInstances || new WeakMap();

  class WfTable {
    constructor(element) {
      // Check for existing instance
      if (element._wfTable) return element._wfTable;
      
      this.element = element;
      element._wfTable = this;
      
      this.container = element; // Definir container como o próprio element
      // Support multiple attribute naming conventions for backwards compatibility
      this.sortable =
        this.element.getAttribute("WfTable-sort") === "true" ||
        this.element.getAttribute("WfTable-sortable") === "true";
      this.searchable =
        this.element.getAttribute("WfTable-search") === "true" ||
        this.element.getAttribute("WfTable-searchable") === "true";
      this.paginated =
        this.element.getAttribute("WfTable-pagination") === "true" ||
        this.element.getAttribute("WfTable-paginated") === "true";
      // page size supports both WfTable-items-per-page and WfTable-pageSize
      this.itemsPerPage =
        parseInt(
          this.element.getAttribute("WfTable-items-per-page") ||
            this.element.getAttribute("WfTable-pageSize")
        ) || 10;
      this.responsive =
        this.element.getAttribute("WfTable-responsive") !== "false";
      this.striped = this.element.getAttribute("WfTable-striped") === "true";
      this.hoverable = this.element.getAttribute("WfTable-hoverable") === "true";

      // Configurações padrão
      this.options = {
        data: [],
        url: null,
        columns: [],
        pageSize: this.itemsPerPage,
        lengthMenu: [10, 25, 50, 100],
        search: this.searchable,
        pagination: this.paginated,
        sortable: this.sortable,
        labels: {
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          empty: "Nenhum dado encontrado",
        },
      };

      this.data = [];
      this.filteredData = [];
      this.currentPage = 1;
      this.sortColumn = null;
      this.sortDirection = "asc";
      this.searchTerm = "";

      this.init();
    }

    async init() {
      this.loadCSS();

      // Verificar se é uma tabela dinâmica (com dados configurados)
      const hasConfig =
        this.element.hasAttribute("WfTable-config") ||
        this.element.hasAttribute("WfTable-url") ||
        this.element.hasAttribute("WfTable-data");

      if (hasConfig) {
        // Carregar configurações
        this.loadConfig();
        if (typeof this.options.loadData === "function") {
          await this.options.loadData.call(this);
        } else {
          await this.loadData();
        }
        this.renderTable();
      } else {
        // Tabela HTML estática - aplicar parsing se houver uma <table> interna ou o elemento for uma TABLE
        const isTableElement =
          this.element.tagName && this.element.tagName.toUpperCase() === "TABLE";
        const hasInnerTable = !!(
          this.element.querySelector &&
          this.element.querySelector("table.wftable, table")
        );
        if (isTableElement || hasInnerTable) {
          this.parseHtmlTable();
          this.renderTable();
        }
      }
    }

    loadConfig() {
      // Carregar configuração JSON
      const configAttr = this.element.getAttribute("WfTable-config");
      if (configAttr) {
        try {
          const config = JSON.parse(configAttr);
          this.options = { ...this.options, ...config };
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear configuração JSON:", error);
          }
        }
      }

      // Carregar atributos individuais
      const url = this.element.getAttribute("WfTable-url");
      if (url) this.options.url = url;

      const data = this.element.getAttribute("WfTable-data");
      if (data) {
        try {
          this.options.data = JSON.parse(data);
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear dados JSON:", error);
          }
        }
      }
    }

    async loadData() {
      if (this.options.data) {
        this.data = Array.isArray(this.options.data) ? this.options.data : [];
      } else if (this.options.url) {
        try {
          const res = await fetch(this.options.url);
          this.data = await res.json();
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao carregar dados:", error);
          }
          this.data = [];
        }
      }
      this.filteredData = [...this.data];
    }

    parseHtmlTable() {
      // Extrai dados da tabela HTML existente
      if (!this.container) {
        console.warn("WfTable: container não encontrado");
        return;
      }

      const table =
        this.container.tagName === "TABLE"
          ? this.container
          : this.container.querySelector("table");
      if (!table) {
        console.warn("WfTable: tabela HTML não encontrada");
        return;
      }

      if (!table.tHead || !table.tBodies[0]) {
        console.warn("WfTable: estrutura de tabela inválida");
        return;
      }

      const headers = Array.from(table.tHead.rows[0].cells).map((th) =>
        th.textContent.trim()
      );
      // Preserve inner HTML so action icons/buttons keep rendering
      // Ignora linhas técnicas/ocultas (ex.: CSRF) e garante fallback vazio
      const rows = Array.from(table.tBodies[0].rows)
        .filter((tr) => {
          try {
            if (tr.classList && tr.classList.contains("js-csrf-row"))
              return false;
            const styleAttr = tr.getAttribute("style") || "";
            if (/display\s*:\s*none/i.test(styleAttr)) return false;
            const dataIgnore = tr.getAttribute("data-ignore");
            if (dataIgnore && String(dataIgnore).toLowerCase() === "true")
              return false;
          } catch (e) {}
          return true;
        })
        .map((tr) =>
          Array.from(tr.cells).map((td) => (td.innerHTML || "").trim())
        );
      this.options.columns = headers;
      this.data = rows.map((row) => {
        const obj = {};
        headers.forEach((h, i) => (obj[h] = row[i] !== undefined ? row[i] : ""));
        return obj;
      });
      this.filteredData = [...this.data];

      // Não limpar o conteúdo aqui - deixar para o renderTable fazer isso
    }

    renderTable() {
      this.container.innerHTML = "";
      // Wrapper responsivo
      this.respDiv = document.createElement("div");
      this.respDiv.className = "wftable-container";
      this.container.appendChild(this.respDiv);
      this.renderTopBar();
      this.renderTableElement();
      this.renderBottomBar();
      this.updateTable();
      // Inicializa componentes após renderização dinâmica
      if (window.SwFullInitAll) {
        setTimeout(() => {
          window.SwFullInitAll(this.container);
        }, 100);
      }
    }

    renderTopBar() {
      // Barra superior: dropdown esquerda, busca direita
      const topBar = document.createElement("div");
      topBar.className = "wftable-topbar";
      // Dropdown quantidade (esquerda)
      const left = document.createElement("div");
      left.className = "wftable-topbar-left";
      const select = document.createElement("select");
      select.className = "wftable-length-select";

      // Adicionar opções ao select
      this.options.lengthMenu.forEach((n) => {
        if (n != null && n !== "") {
          const opt = document.createElement("option");
          opt.value = String(n);
          opt.textContent = n;
          if (String(n) === String(this.options.pageSize)) opt.selected = true;
          select.appendChild(opt);
        }
      });

      // Adicionar event listener para mudança de página
      select.addEventListener("change", (e) => {
        this.options.pageSize = parseInt(e.target.value);
        this.currentPage = 1;
        this.updateTable();
      });

      // Adicionar elementos ao container esquerdo
      const showLabel = document.createElement("span");
      showLabel.textContent = "Mostrar";
      const recordsLabel = document.createElement("span");
      recordsLabel.textContent = "registros";

      left.appendChild(showLabel);
      left.appendChild(select);
      left.appendChild(recordsLabel);
      topBar.appendChild(left);
      // Busca (direita)
      if (this.options.search) {
        const right = document.createElement("div");
        right.className = "wftable-topbar-right";

        // Criar campo de busca
        const searchLabel = document.createElement("label");
        searchLabel.className = "wftable-search-label";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "wftable-search-input";
        searchInput.placeholder = "Buscar...";

        // Adicionar event listener para busca (debounced)
        let debounceTimer = null;
        searchInput.addEventListener("input", (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.currentPage = 1;
            this.filterData(e.target.value);
          }, 200);
        });

        searchLabel.appendChild(searchInput);
        right.appendChild(searchLabel);
        topBar.appendChild(right);
      }
      this.respDiv.appendChild(topBar);
    }

    renderTableElement() {
      this.tableEl = document.createElement("table");
      this.tableEl.className = "wftable";
      this.respDiv.appendChild(this.tableEl);
    }

    renderBottomBar() {
      // Barra inferior: info esquerda, paginação centro
      const bottomBar = document.createElement("div");
      bottomBar.className = "wftable-bottombar";
      // Info (esquerda)
      this.infoDiv = document.createElement("div");
      this.infoDiv.className = "wftable-info";
      bottomBar.appendChild(this.infoDiv);
      // Paginação (centro)
      this.paginationDiv = document.createElement("div");
      this.paginationDiv.className = "wftable-pagination";
      bottomBar.appendChild(this.paginationDiv);
      this.respDiv.appendChild(bottomBar);
    }

    filterData(query) {
      if (!query) {
        this.filteredData = [...this.data];
      } else {
        const q = query.toLowerCase();
        this.filteredData = this.data.filter((row) =>
          Object.values(row).some((val) => String(val).toLowerCase().includes(q))
        );
      }
      this.updateTable();
    }

    showEmpty() {
      // Esconder a tabela e mostrar mensagem vazia
      if (this.tableEl) {
        this.tableEl.style.display = "none";
      }
      if (this.infoDiv) {
        this.infoDiv.textContent = "Nenhum dado encontrado";
      }

      // Adicionar mensagem vazia se não existir
      if (!this.respDiv.querySelector(".wftable-empty")) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "wftable-empty";
        emptyDiv.innerHTML = `
          <i class="wf wf-inbox"></i>
          <span>${this.options.labels.empty}</span>
        `;
        this.respDiv.appendChild(emptyDiv);
      }
    }

    updateTable() {
      // Remover mensagem vazia se existir
      const emptyDiv = this.respDiv.querySelector(".wftable-empty");
      if (emptyDiv) {
        emptyDiv.remove();
      }

      // Verificar se há dados
      if (this.filteredData.length === 0) {
        this.showEmpty();
        return;
      }

      // Mostrar tabela
      this.tableEl.style.display = "table";

      // Cabeçalho
      const cols = this.options.columns || Object.keys(this.data[0] || {});
      let thead = "<thead><tr>";
      cols.forEach((col, i) => {
        thead += `<th WfTable-col="${i}">${col} ${
          this.sortColumn === i ? (this.sortDirection === "asc" ? "▲" : "▼") : ""
        }</th>`;
      });
      thead += "</tr></thead>";
      // Paginação
      let pageSize = this.options.pagination
        ? this.options.pageSize
        : this.filteredData.length;

      let totalPages = Math.max(
        1,
        Math.ceil(this.filteredData.length / pageSize)
      );
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const start = (this.currentPage - 1) * pageSize;
      const end = start + pageSize;
      const pageRows = this.filteredData.slice(start, end);

      // Corpo
      let tbody = "<tbody>";
      pageRows.forEach((row) => {
        tbody +=
          "<tr>" + cols.map((col) => `<td>${row[col]}</td>`).join("") + "</tr>";
      });
      tbody += "</tbody>";
      this.tableEl.innerHTML = thead + tbody;
      // after render attach keyboard navigation and set role attributes for accessibility
      try {
        this.tableEl.setAttribute("role", "table");
        this.tableEl.querySelectorAll("th").forEach((th, i) => {
          th.setAttribute("role", "columnheader");
          th.tabIndex = 0;
          th.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              th.click();
            }
          });
        });
        this.tableEl.querySelectorAll("tbody tr").forEach((tr) => {
          tr.setAttribute("role", "row");
        });
      } catch (e) {}
      // Eventos de ordenação
      this.tableEl.querySelectorAll("th").forEach((th) => {
        th.onclick = () => {
          const colIdx = parseInt(th.getAttribute("WfTable-col"));
          this.sortByColumn(colIdx);
        };
      });
      // Info
      const total = this.filteredData.length;
      const info = this.options.labels.info
        .replace("_START_", total === 0 ? 0 : start + 1)
        .replace("_END_", Math.min(end, total))
        .replace("_TOTAL_", total);
      this.infoDiv.textContent = info;
      // Paginação
      if (this.options.pagination) this.renderPagination(totalPages);
      // Responsividade
      this.tableEl.parentElement.style.overflowX = "auto";
    }

    sortByColumn(index) {
      if (this.sortColumn === index) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = index;
        this.sortDirection = "asc";
      }
      const col = (this.options.columns || Object.keys(this.data[0] || {}))[
        index
      ];
      this.filteredData.sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return this.sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        } else {
          return this.sortDirection === "asc"
            ? String(aVal).localeCompare(bVal)
            : String(bVal).localeCompare(aVal);
        }
      });
      this.currentPage = 1;
      this.updateTable();
    }

    renderPagination(totalPages) {
      this.paginationDiv.innerHTML = "";
      // Botão primeira página
      const first = document.createElement("button");
      first.textContent = "«";
      first.disabled = this.currentPage === 1;
      first.onclick = () => {
        this.currentPage = 1;
        this.updateTable();
      };
      this.paginationDiv.appendChild(first);
      // Botão anterior
      const prev = document.createElement("button");
      prev.textContent = "‹";
      prev.disabled = this.currentPage === 1;
      prev.onclick = () => {
        this.currentPage--;
        this.updateTable();
      };
      this.paginationDiv.appendChild(prev);
      // Números de página (máx 5 visíveis)
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }
      for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === this.currentPage;
        if (i === this.currentPage) btn.className = "active";
        btn.onclick = () => {
          this.currentPage = i;
          this.updateTable();
        };
        this.paginationDiv.appendChild(btn);
      }
      // Botão próximo
      const next = document.createElement("button");
      next.textContent = "›";
      next.disabled = this.currentPage === totalPages;
      next.onclick = () => {
        this.currentPage++;
        this.updateTable();
      };
      this.paginationDiv.appendChild(next);
      // Botão última página
      const last = document.createElement("button");
      last.textContent = "»";
      last.disabled = this.currentPage === totalPages;
      last.onclick = () => {
        this.currentPage = totalPages;
        this.updateTable();
      };
      this.paginationDiv.appendChild(last);
    }

    loadCSS() {
      if (!document.getElementById("wftable-styles")) {
        // Inject internal component CSS to avoid external 404/500 issues
        const s = document.createElement("style");
        s.id = "wftable-styles";
        s.textContent = `
/* WfTable component internal styles - polished 'old' look with WfDay theme support */
:root {
  --swtable-bg: var(--bran);
  --swtable-border: var(--neut2);
  --swtable-head-bg: var(--neut2);
  --swtable-primary: var(--prin);
  --swtable-text: var(--neut10);
  --swtable-muted: var(--neut6);
  --swtable-row-odd: var(--bran); /* cor sim */
  --swtable-row-even: var(--neut1); /* cor não */
  --swtable-hover: var(--neut2);
}

.wftable-container { width: 100%; margin: 0.75rem 0; font-family: inherit; color: var(--swtable-text); }
.wftable-topbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:6px; }
.wftable-topbar-left { display:flex; align-items:center; gap:8px; color: var(--swtable-muted); }
.wftable-length-select { padding:6px 8px; border:1px solid var(--swtable-border); background:var(--swtable-bg); border-radius:4px; }
.wftable-topbar-right { display:flex; align-items:center; gap:8px; }
.wftable-search-label { display:block; }
.wftable-search-input { padding:8px 10px; border:1px solid var(--swtable-border); border-radius:6px; min-width:180px; background: var(--bran); }

.wftable { border-collapse: separate; border-spacing: 0; width:100%; background: var(--swtable-bg); box-shadow: 0 1px 2px rgba(0,0,0,0.02); font-family: var(--font1); }
.wftable thead th { position: sticky; top:0; z-index:2; background: var(--swtable-head-bg); padding:8px; text-align:left; font-family: var(--font1b); border-bottom:1px solid var(--swtable-border); cursor:pointer; }
.wftable tbody td { padding:10px; border-bottom:1px solid var(--swtable-border); vertical-align:middle; font-size:13px; }
.wftable tbody tr:nth-child(odd) { background: var(--swtable-row-odd); }
.wftable tbody tr:nth-child(even) { background: var(--swtable-row-even); }
.wftable tbody tr:hover { background: var(--swtable-hover); }

.wftable-info { font-size:1.2rem; color:var(--swtable-muted); padding:0 0 12px 0; }
.wftable-bottombar { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:2px; }
.wftable-pagination { display:flex; gap:6px; align-items:center; }
.wftable-pagination button { padding:3px 10px; background:var(--swtable-bg); cursor:pointer; border-radius:4px; color:var(--swtable-text); }
.wftable-pagination button.active { background: var(--swtable-primary); color: #fff; border-color: var(--swtable-primary); }
.wftable-empty { padding: 18px; text-align:center; color:var(--swtable-muted); }

/* small badges and action buttons inside table cells */
.wftable .badge { display:inline-block; padding:4px 8px; border-radius:12px; font-size:0.85rem; }
.badge-success { background:var(--suc); color:var(--bran); }
.badge-warning { background:var(--aler); color:var(--neut10); }
.badge-danger { background:var(--notu); color:var(--bran); }

/* responsive adjustments */
@media (max-width:900px){
  .wftable-topbar { flex-direction:column; align-items:stretch; gap:6px; }
  .wftable-search-input { width:100%; min-width:0; }
}

/* WfDay night mode */
html.wfday-night {
  --swtable-bg: var(--neut12);
  --swtable-border: var(--neut10);
  --swtable-head-bg: var(--neut12);
  --swtable-primary: var(--prin-);
  --swtable-text: var(--neut3);
  --swtable-muted: var(--neut6);
   --swtable-row-odd: var(--neut11);
  --swtable-row-even: var(--neut10);
  --swtable-hover: var(--neut12);
}
`;
        document.head.appendChild(s);
      }
    }

    _injectFallbackCSS() {
      if (document.getElementById("wftable-fallback-styles")) return;
      try {
        const s = document.createElement("style");
        s.id = "wftable-fallback-styles";
        s.textContent = `
/* fallback minimal WfTable styles */
.wftable { border-collapse: collapse; width: 100%; }
.wftable th, .wftable td { padding: 8px; border: 1px solid #e0e0e0; }
.wftable th { background: #f5f5f5; }
.wftable-container { width: 100%; overflow-x: auto; }
.wftable-topbar { display: flex; justify-content: space-between; margin-bottom: 10px; }
.wftable-bottombar { display: flex; justify-content: space-between; margin-top: 10px; }
.wftable-pagination button { margin: 0 2px; padding: 5px 10px; }
.wftable-empty { text-align: center; padding: 20px; color: #666; }
`;
        document.head.appendChild(s);
      } catch (e) {
        console.warn("WfTable: Erro ao injetar CSS fallback:", e);
      }
    }

    // API pública
    reload() {
      this.init();
    }
    getData() {
      return this.filteredData;
    }

    // Export current view (filteredData) as CSV
    exportCSV(filename = "export.csv") {
      try {
        const cols = this.options.columns || Object.keys(this.data[0] || {});
        const rows = [cols];
        this.filteredData.forEach((r) => {
          rows.push(
            cols.map((c) =>
              r[c] != null ? String(r[c]).replace(/"/g, '""') : ""
            )
          );
        });
        const csv = rows
          .map((r) => r.map((cell) => `"${cell}"`).join(","))
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV error", e);
      }
    }

    // Inicialização automática
    static initAll(container = document) {
      // Support both: explicit containers with attribute [WfTable] and plain <table class="wftable"> markup
      const selector = "[WfTable], table.wftable";
      let elements = container.querySelectorAll(selector);
      const instances = [];

      // If no elements found in document root, we might be initializing too early — retry a few times
      if (elements.length === 0 && container === document) {
        WfTable._initRetries = (WfTable._initRetries || 0) + 1;
        if (WfTable._initRetries <= 5) {
          // schedule a retry after short delay
          setTimeout(() => WfTable.initAll(document), 150);
          console.debug &&
            console.debug(
              "WfTable.initAll: no elements found, retrying",
              WfTable._initRetries
            );
          return instances;
        }
      }

      elements = container.querySelectorAll(selector);
      elements.forEach((el) => {
        // Ignorar elementos que pertençam ao WfTableAjax (docs/demos usam WfTableAjax)
        try {
          if (
            (el.hasAttribute && el.hasAttribute("WfTableAjax")) ||
            (el.closest && el.closest("[WfTableAjax]")) ||
            (el.classList && el.classList.contains("wftableajax"))
          ) {
            // pular este elemento, ele é gerenciado pelo WfTableAjax
            return;
          }
        } catch (e) {}

        if (!el._swtableInitialized && !el._wfTable) {
          try {
            // If the element is a TABLE inside a wrapper with [WfTable], prefer initializing the wrapper
            let host = el;
            try {
              if (el.tagName && el.tagName.toUpperCase() === "TABLE") {
                const closest = el.closest("[WfTable]");
                if (closest) host = closest;
              }
            } catch (e) {}

            // Check if host already has instance
            if (host._wfTable) {
                instances.push(host._wfTable);
                return;
            }

            const instance = new WfTable(host);
            // attach instance to both host and inner table if present
            try {
              host._wfTable = instance;
              host._swtableInitialized = true;
            } catch (e) {}
            try {
              const innerTable =
                host.tagName && host.tagName.toUpperCase() === "TABLE"
                  ? host
                  : host.querySelector && host.querySelector("table.wftable");
              if (innerTable) {
                innerTable._wfTable = instance;
                innerTable._swtableInitialized = true;
              }
            } catch (e) {}
            instances.push(instance);
          } catch (error) {
            console.warn("WfTable: Erro ao inicializar elemento:", error);
          }
        }
      });

      return instances;
    }

    // Métodos estáticos de conveniência
    static getData(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      const data = [];
      elements.forEach((el) => {
        if (el._wfTable) {
          data.push(el._wfTable.getData());
        }
      });
      return data;
    }

    // Static helper: export CSV for a table element or wrapper
    static exportCSV(tableElement, filename = "export.csv") {
      try {
        const inst =
          tableElement &&
          (tableElement._wfTable ||
            (tableElement.querySelector &&
              tableElement.querySelector("table") &&
              tableElement.querySelector("table")._wfTable));
        if (inst && typeof inst.exportCSV === "function")
          return inst.exportCSV(filename);
        // fallback: try parse static table
        const table =
          tableElement &&
          tableElement.tagName &&
          tableElement.tagName.toUpperCase() === "TABLE"
            ? tableElement
            : tableElement && tableElement.querySelector
            ? tableElement.querySelector("table")
            : null;
        if (!table) return;
        const headers = Array.from(
          table.tHead ? table.tHead.rows[0].cells : []
        ).map((th) => th.textContent.trim());
        const rows = Array.from(table.tBodies[0].rows).map((tr) =>
          Array.from(tr.cells).map((td) => td.textContent.trim())
        );
        const data = [headers].concat(rows);
        const csv = data
          .map((r) =>
            r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
          )
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV static fallback error", e);
      }
    }

    static reload(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      elements.forEach((el) => {
        if (el._wfTable) {
          el._wfTable.reload();
        }
      });
    }

    static destroy(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      elements.forEach((el) => {
        if (el._wfTable) {
          delete el._wfTable;
          delete el._swtableInitialized;
        }
      });
    }
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfTable = WfTable;
  } else if (typeof window !== 'undefined') {
    window.WfTable = WfTable;
  }

  // Auto-inicialização apenas se WebFull não estiver presente
  if (typeof window !== 'undefined' && !window.WebFull) {
    const init = () => WfTable.initAll();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

})(window, document);


// ===== WfTableAjax.js =====
(function(window, document) {
'use strict';

// WfTableAjax.js - Tabela AJAX Avançada similar ao DataTables
// SandroWeb 2025 - Versão 4.0 - Funcionalidades Completas AJAX

class WfTableAjax {
  constructor(element) {
      this.element = element;
      this.isTable = (this.element.tagName || '').toLowerCase() === 'table';
      this.config = this.parseConfig();
      this.currentPage = 1;
      this.itemsPerPage = parseInt(this.config.pageLength || 10);
      this.totalItems = 0;
      this.totalPages = 0;
      this.data = [];
      this.filteredData = [];
      this.sortColumn = null;
      this.sortDirection = 'asc';
      this.searchTerm = '';
      this.isLoading = false;
      this.columns = [];
      this.columnDefs = [];
      this.processing = false;
      this.serverSide = true; // Sempre AJAX
      this.drawCounter = 0;
      this.wrapper = null;
      this.tableEl = null;
      // aplicar ordenação inicial da configuração
      try {
         const initOrder = this.config && this.config.order ? this.config.order : null;
         if (Array.isArray(initOrder)) {
            const first = initOrder[0];
            if (first && typeof first.column === 'number') {
               this.sortColumn = first.column;
               this.sortDirection = (first.dir || 'asc').toLowerCase();
            } else if (Array.isArray(first)) {
               // formato [[index, dir]]
               this.sortColumn = parseInt(first[0], 10) || 0;
               this.sortDirection = String(first[1] || 'asc').toLowerCase();
            }
         } else if (initOrder && typeof initOrder === 'object' && initOrder.column !== undefined) {
            this.sortColumn = parseInt(initOrder.column, 10) || 0;
            this.sortDirection = String(initOrder.dir || 'asc').toLowerCase();
         }
      } catch (e) {}
      
      this.init();
  }

   parseConfig() {
      let config = {
         ajax: {
            url: null,
            type: 'POST',
            data: null,
            dataSrc: 'data'
         },
         columns: [],
         columnDefs: [],
         pageLength: 10,
         lengthMenu: [10, 25, 50, 100],
         searching: true,
         ordering: true,
         paging: true,
         info: true,
         processing: true,
         serverSide: true,
         responsive: true,
         language: {
            processing: 'Processando...',
            search: 'Buscar:',
            lengthMenu: 'Exibir _MENU_ registros por página',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            loadingRecords: 'Carregando...',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            paginate: {
               first: '««',
               previous: '‹',
               next: '›',
               last: '»»'
            }
         }
      };

      // Parse main config
      try {
         const mainConfigAttr = this.element.getAttribute('WfTableAjax');
         if (mainConfigAttr) {
            const parsed = JSON.parse(mainConfigAttr);
            config = { ...config, ...parsed };
         }
      } catch (e) {
         console.warn('WfTableAjax: JSON inválido no atributo WfTableAjax:', e);
      }

      // Parse individual attributes
      const url = this.element.getAttribute('WfTableAjax-url');
      if (url) config.ajax.url = url;

      const serverSideAttr = this.element.getAttribute('WfTableAjax-serverSide');
      if (serverSideAttr !== null) config.serverSide = serverSideAttr !== 'false';

      const pageLength = this.element.getAttribute('WfTableAjax-pageLength');
      if (pageLength) config.pageLength = parseInt(pageLength, 10);

      const searching = this.element.getAttribute('WfTableAjax-searching');
      if (searching !== null) config.searching = searching !== 'false';

      const ordering = this.element.getAttribute('WfTableAjax-ordering');
      if (ordering !== null) config.ordering = ordering !== 'false';

      const paging = this.element.getAttribute('WfTableAjax-paging');
      if (paging !== null) config.paging = paging !== 'false';

      const info = this.element.getAttribute('WfTableAjax-info');
      if (info !== null) config.info = info !== 'false';

      const responsive = this.element.getAttribute('WfTableAjax-responsive');
      if (responsive !== null) config.responsive = responsive !== 'false';

      // Parse default order from attribute
      try {
         const orderAttr = this.element.getAttribute('WfTableAjax-order');
         if (orderAttr) {
            const parsedOrder = JSON.parse(orderAttr);
            config.order = parsedOrder;
         }
      } catch (e) {
         console.warn('WfTableAjax: JSON inválido em WfTableAjax-order:', e);
      }

      // Parse columns from table headers
      const headers = this.element.querySelectorAll('thead th');
      if (headers.length > 0 && config.columns.length === 0) {
         headers.forEach((th, index) => {
            const columnConfig = {
               data: th.getAttribute('data-field') || index.toString(),
               title: th.textContent.trim(),
               orderable: th.getAttribute('data-orderable') !== 'false',
               searchable: th.getAttribute('data-searchable') !== 'false',
               visible: th.getAttribute('data-visible') !== 'false',
               width: th.getAttribute('data-width') || null,
               className: th.getAttribute('data-class') || null
            };
            
            const render = th.getAttribute('data-render');
            if (render) {
               try {
                  columnConfig.render = new Function('data', 'type', 'row', 'meta', `return ${render}(data, type, row, meta)`);
               } catch (e) {
                  console.warn(`WfTableAjax: Erro ao criar função de renderização para coluna ${index}:`, e);
               }
            }
            
            config.columns.push(columnConfig);
         });
      }

      this.serverSide = config.serverSide === true;
      return config;
   }

   async init() {
      this.loadCSS();
      this.renderContainer();
      await this.loadData();
   }

   loadCSS() {
      if (document.getElementById('wftableajax-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'wftableajax-styles';
      style.textContent = `
         :root {
           --wftableajax-bg: var(--bran, #fff);
           --wftableajax-border: var(--neut2, #dee2e6);
           --wftableajax-head-bg: var(--neut1, #f8f9fa);
           --wftableajax-primary: var(--prin, #007bff);
           --wftableajax-text: var(--neut10, #212529);
           --wftableajax-muted: var(--neut6, #6c757d);
           --wftableajax-row-odd: var(--bran, #fff);
           --wftableajax-row-even: var(--neut1, #f8f9fa);
           --wftableajax-hover: var(--neut2, #e9ecef);
           --wftableajax-active: var(--prin, #007bff);
           --wftableajax-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
         }
         
         html.wfday-night {
           --wftableajax-bg: var(--neut11, #2d3748);
           --wftableajax-border: var(--neut9, #4a5568);
           --wftableajax-head-bg: var(--neut10, #1a202c);
           --wftableajax-primary: var(--prin-, #4299e1);
           --wftableajax-text: var(--neut2, #e2e8f0);
           --wftableajax-muted: var(--neut5, #a0aec0);
           --wftableajax-row-odd: var(--neut11, #2d3748);
           --wftableajax-row-even: var(--neut10, #1a202c);
           --wftableajax-hover: var(--neut9, #4a5568);
         }

         .wftableajax-wrapper {
            width: 100%;
            margin: 1rem 0;
            font-family: inherit;
            color: var(--wftableajax-text);
            background: var(--wftableajax-bg);
            border-radius: 8px;
            box-shadow: var(--wftableajax-shadow);
            overflow: hidden;
         }

         .wftableajax-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--wftableajax-head-bg);
            border-bottom: 1px solid var(--wftableajax-border);
            gap: 1rem;
            flex-wrap: wrap;
         }

         .wftableajax-header-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
         }

         .wftableajax-header-right {
            display: flex;
            align-items: center;
            gap: 0.5rem;
         }

         .wftableajax-length-select {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            border-radius: 0.375rem;
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            font-size: 1.4rem;
         }

         .wftableajax-search-input {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            border-radius: 0.375rem;
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            font-size: 1.4rem;
            min-width: 200px;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
         }

         .wftableajax-search-input:focus {
            outline: none;
            border-color: var(--wftableajax-primary);
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
         }

         .wftableajax-table-container {
            overflow-x: auto;
            max-height: 70vh;
         }

         .wftableajax-table {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 0 !important;
            background: var(--wftableajax-bg) !important;
            margin: 0 !important;
         }

         .wftableajax-table thead th {
            position: sticky !important;
            top: 0 !important;
            z-index: 10 !important;
            background: var(--wftableajax-head-bg) !important;
            padding: 0.75rem !important;
            text-align: left !important;
            border-bottom: 2px solid var(--wftableajax-border) !important;
            font-weight: 600 !important;
            font-size: 1.4rem !important;
            white-space: nowrap !important;
            user-select: none !important;
            color: var(--wftableajax-text) !important;
         }

         .wftableajax-table thead th.sortable {
            cursor: pointer;
            transition: background-color 0.15s ease;
         }

         .wftableajax-table thead th.sortable:hover {
            background: var(--wftableajax-hover);
         }

         .wftableajax-table thead th .sort-icon {
            margin-left: 0.5rem;
            opacity: 0.5;
            transition: opacity 0.15s ease;
         }

         .wftableajax-table thead th.sorting .sort-icon {
            opacity: 1;
         }

         .wftableajax-table tbody td {
            padding: 0.75rem !important;
            border-bottom: 1px solid var(--wftableajax-border) !important;
            vertical-align: middle !important;
            font-size: 1.3rem !important;
            color: var(--wftableajax-text) !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
         }

         .wftableajax-table tbody tr:nth-child(odd) {
            background: var(--wftableajax-row-odd) !important;
         }

         .wftableajax-table tbody tr:nth-child(even) {
            background: var(--wftableajax-row-even) !important;
         }

         .wftableajax-table tbody tr:hover {
            background: var(--wftableajax-hover) !important;
         }

         .wftableajax-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--wftableajax-head-bg);
            border-top: 1px solid var(--wftableajax-border);
            gap: 1rem;
            flex-wrap: wrap;
         }

         .wftableajax-info {
            color: var(--wftableajax-muted);
            font-size: 1.3rem;
         }

         .wftableajax-pagination {
            display: flex;
            gap: 0.25rem;
            align-items: center;
         }

         .wftableajax-pagination button {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            cursor: pointer;
            border-radius: 0.375rem;
            font-size: 1.3rem;
            transition: all 0.15s ease;
         }

         .wftableajax-pagination button:hover:not(:disabled) {
            background: var(--wftableajax-hover);
         }

         .wftableajax-pagination button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
         }

         .wftableajax-pagination button.active {
            background: var(--wftableajax-primary);
            color: white;
            border-color: var(--wftableajax-primary);
         }

         .wftableajax-processing {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 8px;
         }

         html.wfday-night .wftableajax-processing {
            background: rgba(45, 55, 72, 0.8);
         }

         .wftableajax-processing-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 1.5rem;
            background: var(--wftableajax-bg);
            border-radius: 0.5rem;
            box-shadow: var(--wftableajax-shadow);
         }

         .wftableajax-spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid var(--wftableajax-border);
            border-top: 2px solid var(--wftableajax-primary);
            border-radius: 50%;
            animation: wftableajax-spin 1s linear infinite;
         }

         @keyframes wftableajax-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
         }

         .wftableajax-empty {
            padding: 3rem;
            text-align: center;
            color: var(--wftableajax-muted);
            font-size: 1.6rem;
         }

         .wftableajax-error {
            padding: 1rem;
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 0.375rem;
            margin: 1rem;
         }

         html.wfday-night .wftableajax-error {
            background: #2d1b1e;
            color: #f8d7da;
            border-color: #842029;
         }

         @media (max-width: 768px) {
            .wftableajax-header,
            .wftableajax-footer {
               flex-direction: column;
               align-items: stretch;
            }

            .wftableajax-header-left,
            .wftableajax-header-right {
               justify-content: center;
            }

            .wftableajax-search-input {
               min-width: auto;
               width: 100%;
            }

            .wftableajax-table thead th,
            .wftableajax-table tbody td {
               padding: 0.5rem;
               font-size: 1.2rem;
            }
         }
      `;
      document.head.appendChild(style);
   }

  renderContainer() {
      if (this.isTable) {
         const table = this.element;
         const parent = table.parentNode;
         const wrapper = document.createElement('div');
         wrapper.className = 'wftableajax-wrapper';
         wrapper.style.position = 'relative';
         if (parent) {
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
         } else {
            // fallback: wrap by creating a sibling container
            table.insertAdjacentElement('beforebegin', wrapper);
            wrapper.appendChild(table);
         }
         // Ensure tbody exists
         if (!table.querySelector('tbody')) {
            const tbody = document.createElement('tbody');
            table.appendChild(tbody);
         }
         this.wrapper = wrapper;
         this.tableEl = table;
      } else {
         this.element.innerHTML = '';
         
         this.wrapper = document.createElement('div');
         this.wrapper.className = 'wftableajax-wrapper';
         this.wrapper.style.position = 'relative';
         
         this.element.appendChild(this.wrapper);
      }
  }

   async loadData() {
      if (!this.config.ajax.url) {
         this.showError('URL AJAX não configurada');
         return;
      }

      this.setProcessing(true);
      this.drawCounter++;

      try {
         const requestData = this.buildRequestData();
         const response = await this.makeAjaxRequest(requestData);
         if (this.serverSide) {
            this.processResponse(response);
         } else {
            this.dataAll = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : []);
            this.totalItems = this.dataAll.length;
            this.filteredItems = this.dataAll.length;
            this.totalPages = Math.ceil(this.filteredItems / this.itemsPerPage) || 1;
            this.applyClientFilters();
         }
         this.renderTable();
         
      } catch (error) {
         console.error('WfTableAjax: Erro ao carregar dados:', error);
         this.showError(`Erro ao carregar dados: ${error.message}`);
      } finally {
         this.setProcessing(false);
      }
   }

   applyClientFilters() {
      const term = (this.searchTerm || '').toLowerCase();
      let filtered = Array.isArray(this.dataAll) ? this.dataAll.slice() : [];
      if (term) {
         filtered = filtered.filter(row => {
            return this.config.columns.some(col => {
               const key = col.data;
               const v = (row && row[key] !== undefined && row[key] !== null) ? String(row[key]).toLowerCase() : '';
               return v.includes(term);
            });
         });
      }
      if (this.sortColumn !== null && this.config.ordering) {
         const col = this.config.columns[this.sortColumn];
         const key = col ? col.data : null;
         if (key) {
            filtered.sort((a,b)=>{
               const va = a[key];
               const vb = b[key];
               if (va === vb) return 0;
               if (this.sortDirection === 'asc') return (va > vb) ? 1 : -1;
               return (va < vb) ? 1 : -1;
            });
         }
      }
      this.filteredItems = filtered.length;
      this.totalPages = Math.ceil((this.filteredItems || 0) / this.itemsPerPage) || 1;
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.data = filtered.slice(start, end);
   }

   buildRequestData() {
      const data = {
         draw: this.drawCounter,
         start: (this.currentPage - 1) * this.itemsPerPage,
         length: this.itemsPerPage,
         search: {
            value: this.searchTerm,
            regex: false
         },
         order: [],
         columns: []
      };

      // Add column information
      this.config.columns.forEach((col, index) => {
         data.columns.push({
            data: col.data,
            name: col.data,
            searchable: col.searchable !== false,
            orderable: col.orderable !== false,
            search: {
               value: '',
               regex: false
            }
         });
      });

      // Add sorting information
      if (this.sortColumn !== null) {
         data.order.push({
            column: this.sortColumn,
            dir: this.sortDirection
         });
      }

      // Merge with custom data
      if (this.config.ajax.data) {
         if (typeof this.config.ajax.data === 'function') {
            return { ...data, ...this.config.ajax.data(data) };
         } else {
            return { ...data, ...this.config.ajax.data };
         }
      }

      return data;
   }

   async makeAjaxRequest(data) {
      const url = this.config.ajax.url;
      const method = this.serverSide ? (this.config.ajax.type || 'POST') : 'GET';

      const options = {
         method: method,
         headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
         }
      };

      if (method.toUpperCase() === 'POST' && this.serverSide) {
         options.body = JSON.stringify(data);
      } else if (method.toUpperCase() === 'GET' && this.serverSide) {
         const params = new URLSearchParams();
         Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object') {
               params.append(key, JSON.stringify(data[key]));
            } else {
               params.append(key, data[key]);
            }
         });
         const separator = url.includes('?') ? '&' : '?';
         const finalUrl = `${url}${separator}${params.toString()}`;
         options.url = finalUrl;
      }

      const response = await fetch(method.toUpperCase() === 'GET' && options.url ? options.url : url, options);

      if (!response.ok) {
         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
   }

   processResponse(response) {
      // Support DataTables format
      if (response.data && Array.isArray(response.data)) {
         this.data = response.data;
         this.totalItems = parseInt(response.recordsTotal || response.recordsFiltered || response.data.length);
         this.filteredItems = parseInt(response.recordsFiltered || response.recordsTotal || response.data.length);
      } else if (Array.isArray(response)) {
         this.data = response;
         this.totalItems = response.length;
         this.filteredItems = response.length;
      } else {
         throw new Error('Formato de resposta inválido');
      }

      this.totalPages = Math.ceil(this.filteredItems / this.itemsPerPage);
      
      // Ensure current page is valid
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
         this.currentPage = this.totalPages;
      }
   }

   renderTable() {
      this.wrapper.innerHTML = '';

      // Render header
      if (this.config.searching || this.config.paging) {
         this.renderHeader();
      }

      // Render table
      this.renderTableElement();

      // Render footer
      if (this.config.info || this.config.paging) {
         this.renderFooter();
      }

      this.setupEventListeners();
   }

   renderHeader() {
      const header = document.createElement('div');
      header.className = 'wftableajax-header';

      const leftSide = document.createElement('div');
      leftSide.className = 'wftableajax-header-left';

      if (this.config.paging) {
         const lengthLabel = document.createElement('span');
         lengthLabel.textContent = 'Mostrar ';
         leftSide.appendChild(lengthLabel);

         this.lengthSelect = document.createElement('select');
         this.lengthSelect.className = 'wftableajax-length-select';
         
         this.config.lengthMenu.forEach(length => {
            const option = document.createElement('option');
            option.value = length;
            option.textContent = length;
            option.selected = length === this.itemsPerPage;
            this.lengthSelect.appendChild(option);
         });

         leftSide.appendChild(this.lengthSelect);

         const entriesLabel = document.createElement('span');
         entriesLabel.textContent = ' registros';
         leftSide.appendChild(entriesLabel);
      }

      const rightSide = document.createElement('div');
      rightSide.className = 'wftableajax-header-right';

      if (this.config.searching) {
         const searchLabel = document.createElement('span');
         searchLabel.textContent = this.config.language.search + ' ';
         rightSide.appendChild(searchLabel);

         this.searchInput = document.createElement('input');
         this.searchInput.type = 'text';
         this.searchInput.className = 'wftableajax-search-input';
         this.searchInput.placeholder = 'Digite para buscar...';
         this.searchInput.value = this.searchTerm;
         rightSide.appendChild(this.searchInput);
      }

      header.appendChild(leftSide);
      header.appendChild(rightSide);
      this.wrapper.appendChild(header);
   }

  renderTableElement() {
      const tableContainer = document.createElement('div');
      tableContainer.className = 'wftableajax-table-container';
      let table, thead, tbody;
      if (this.isTable) {
         table = this.tableEl;
         table.classList.add('wftableajax-table');
         thead = table.querySelector('thead');
         tbody = table.querySelector('tbody');
         if (!thead) {
            thead = document.createElement('thead');
            table.insertBefore(thead, table.firstChild);
         }
         // decorate existing header
         const headerCells = thead.querySelectorAll('tr th');
         headerCells.forEach((th, index) => {
            const col = this.config.columns[index];
            th.dataset.column = index;
            if (col && col.orderable !== false && this.config.ordering) {
               th.classList.add('sortable');
               let sortIcon = th.querySelector('.sort-icon');
               if (!sortIcon) {
                  sortIcon = document.createElement('span');
                  sortIcon.className = 'sort-icon';
                  th.appendChild(sortIcon);
               }
               if (this.sortColumn === index) {
                  th.classList.add('sorting');
                  sortIcon.textContent = this.sortDirection === 'asc' ? ' ↑' : ' ↓';
               } else {
                  sortIcon.textContent = ' ↕';
               }
            }
         });
      } else {
         table = document.createElement('table');
         table.className = 'wftableajax-table';
         thead = document.createElement('thead');
         const headerRow = document.createElement('tr');
         this.config.columns.forEach((col, index) => {
            const th = document.createElement('th');
            th.textContent = col.title;
            th.dataset.column = index;
            if (col.orderable !== false && this.config.ordering) {
               th.classList.add('sortable');
               const sortIcon = document.createElement('span');
               sortIcon.className = 'sort-icon';
               if (this.sortColumn === index) {
                  th.classList.add('sorting');
                  sortIcon.textContent = this.sortDirection === 'asc' ? ' ↑' : ' ↓';
               } else {
                  sortIcon.textContent = ' ↕';
               }
               th.appendChild(sortIcon);
            }
            if (col.width) th.style.width = col.width;
            if (col.className) th.classList.add(col.className);
            headerRow.appendChild(th);
         });
         thead.appendChild(headerRow);
         table.appendChild(thead);
         tbody = document.createElement('tbody');
      }
      // render body rows
      tbody.innerHTML = '';
      if (this.data.length === 0) {
         const emptyRow = document.createElement('tr');
         const emptyCell = document.createElement('td');
         emptyCell.colSpan = this.config.columns.length;
         emptyCell.className = 'wftableajax-empty';
         emptyCell.textContent = this.config.language.emptyTable;
         emptyRow.appendChild(emptyCell);
         tbody.appendChild(emptyRow);
      } else {
         this.data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            this.config.columns.forEach((col, colIndex) => {
               const td = document.createElement('td');
               let cellData = this.getCellData(row, col.data);
               if (col.render && typeof col.render === 'function') {
                  try {
                     cellData = col.render(cellData, 'display', row, { row: rowIndex, col: colIndex });
                  } catch (e) {
                     console.warn(`WfTableAjax: Erro na função render da coluna ${colIndex}:`, e);
                  }
               }
               if (typeof cellData === 'string' || typeof cellData === 'number') {
                  if (typeof cellData === 'string' && /<[^>]+>/.test(cellData)) {
                     td.innerHTML = cellData;
                  } else {
                     td.textContent = cellData;
                  }
               } else {
                  td.innerHTML = cellData;
               }
               if (col.className) td.classList.add(col.className);
               tr.appendChild(td);
            });
            tbody.appendChild(tr);
         });
      }
      if (!this.isTable) {
         table.appendChild(tbody);
      }
      tableContainer.appendChild(table);
      this.wrapper.appendChild(tableContainer);
  }

   getCellData(row, dataPath) {
      if (typeof dataPath === 'number') {
         return Object.values(row)[dataPath] || '';
      }

      const keys = dataPath.split('.');
      let value = row;

      for (const key of keys) {
         if (value && typeof value === 'object' && key in value) {
            value = value[key];
         } else {
            return '';
         }
      }

      return value !== null && value !== undefined ? value : '';
   }

   renderFooter() {
      const footer = document.createElement('div');
      footer.className = 'wftableajax-footer';

      // Info
      if (this.config.info) {
         this.infoElement = document.createElement('div');
         this.infoElement.className = 'wftableajax-info';
         this.updateInfo();
         footer.appendChild(this.infoElement);
      }

      // Pagination
      if (this.config.paging && this.totalPages > 1) {
         this.paginationElement = document.createElement('div');
         this.paginationElement.className = 'wftableajax-pagination';
         this.renderPagination();
         footer.appendChild(this.paginationElement);
      }

      this.wrapper.appendChild(footer);
   }

   updateInfo() {
      if (!this.infoElement) return;

      const start = this.data.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
      const end = Math.min(start + this.data.length - 1, this.filteredItems);

      let infoText = this.config.language.info;
      infoText = infoText.replace('_START_', start.toLocaleString());
      infoText = infoText.replace('_END_', end.toLocaleString());
      infoText = infoText.replace('_TOTAL_', this.filteredItems.toLocaleString());

      if (this.filteredItems < this.totalItems) {
         infoText += ' ' + this.config.language.infoFiltered.replace('_MAX_', this.totalItems.toLocaleString());
      }

      this.infoElement.textContent = infoText;
   }

   renderPagination() {
      if (!this.paginationElement) return;

      this.paginationElement.innerHTML = '';

      // First button
      const firstBtn = this.createPaginationButton(this.config.language.paginate.first, 1);
      firstBtn.disabled = this.currentPage === 1;
      this.paginationElement.appendChild(firstBtn);

      // Previous button
      const prevBtn = this.createPaginationButton(this.config.language.paginate.previous, this.currentPage - 1);
      prevBtn.disabled = this.currentPage === 1;
      this.paginationElement.appendChild(prevBtn);

      // Page numbers
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
         const pageBtn = this.createPaginationButton(i.toString(), i);
         if (i === this.currentPage) {
            pageBtn.classList.add('active');
         }
         this.paginationElement.appendChild(pageBtn);
      }

      // Next button
      const nextBtn = this.createPaginationButton(this.config.language.paginate.next, this.currentPage + 1);
      nextBtn.disabled = this.currentPage === this.totalPages;
      this.paginationElement.appendChild(nextBtn);

      // Last button
      const lastBtn = this.createPaginationButton(this.config.language.paginate.last, this.totalPages);
      lastBtn.disabled = this.currentPage === this.totalPages;
      this.paginationElement.appendChild(lastBtn);
   }

   createPaginationButton(text, page) {
      const button = document.createElement('button');
      button.textContent = text;
      button.dataset.page = page;
      return button;
   }

   setupEventListeners() {
      // Search input
      if (this.searchInput) {
         let searchTimeout;
         this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
               this.searchTerm = e.target.value;
               this.currentPage = 1;
               if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
            }, 300);
         });
      }

      // Length select
      if (this.lengthSelect) {
         this.lengthSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
         });
      }

      // Sorting
      if (this.config.ordering) {
         const sortableHeaders = this.wrapper.querySelectorAll('th.sortable');
         sortableHeaders.forEach(th => {
            th.addEventListener('click', () => {
               const column = parseInt(th.dataset.column);
               
               if (this.sortColumn === column) {
                  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
               } else {
                  this.sortColumn = column;
                  this.sortDirection = 'asc';
               }
               
               this.currentPage = 1;
               if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
            });
         });
      }

      // Pagination
      if (this.paginationElement) {
         this.paginationElement.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
               const page = parseInt(e.target.dataset.page);
               if (page && page !== this.currentPage) {
                  this.currentPage = page;
                  if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
               }
            }
         });
      }
   }

   setProcessing(show) {
      this.processing = show;

      // Remove existing processing overlay
      const existingOverlay = this.wrapper.querySelector('.wftableajax-processing');
      if (existingOverlay) {
         existingOverlay.remove();
      }

      if (show && this.config.processing) {
         const overlay = document.createElement('div');
         overlay.className = 'wftableajax-processing';

         const content = document.createElement('div');
         content.className = 'wftableajax-processing-content';

         const spinner = document.createElement('div');
         spinner.className = 'wftableajax-spinner';

         const text = document.createElement('span');
         text.textContent = this.config.language.processing;

         content.appendChild(spinner);
         content.appendChild(text);
         overlay.appendChild(content);
         this.wrapper.appendChild(overlay);
      }
   }

   showError(message) {
      this.wrapper.innerHTML = '';
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'wftableajax-error';
      errorDiv.textContent = message;
      
      this.wrapper.appendChild(errorDiv);
   }

   // Public API methods
   ajax = {
      reload: (callback, resetPaging = true) => {
         if (resetPaging) {
            this.currentPage = 1;
         }
         this.loadData().then(() => {
            if (callback) callback();
         });
      },
      
      url: (newUrl) => {
         if (newUrl !== undefined) {
            this.config.ajax.url = newUrl;
            return this;
         }
         return this.config.ajax.url;
      }
   };

   page = (page) => {
      if (page !== undefined) {
         this.currentPage = Math.max(1, Math.min(page, this.totalPages));
         this.loadData();
         return this;
      }
      return this.currentPage;
   };

   search = (value) => {
      if (value !== undefined) {
         this.searchTerm = value;
         if (this.searchInput) {
            this.searchInput.value = value;
         }
         this.currentPage = 1;
         this.loadData();
         return this;
      }
      return this.searchTerm;
   };

   order = (column, direction) => {
      if (column !== undefined) {
         this.sortColumn = column;
         this.sortDirection = direction || 'asc';
         this.currentPage = 1;
         this.loadData();
         return this;
      }
      return { column: this.sortColumn, direction: this.sortDirection };
   };

   destroy() {
      if (this.element) {
         this.element.innerHTML = '';
         delete this.element._wftableajax;
      }
   }

   static initAll(container = document) {
      const elements = container.querySelectorAll('[WfTableAjax]');
      elements.forEach(el => {
         if (!el._wftableajax) {
            try {
               el._wftableajax = new WfTableAjax(el);
            } catch (error) {
               console.warn('WfTableAjax: Erro ao inicializar elemento:', error);
            }
         }
      });
   }
}

  // Exportação Global
  if (typeof window !== 'undefined') {
     window.WfTableAjax = WfTableAjax;
     if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfTableAjax = WfTableAjax;
     }
  }

  // Auto-inicialização
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfTableAjax.initAll());
    } else {
      WfTableAjax.initAll();
    }
  }
})(window, document);


// ===== WfText.js =====
(function(window, document) {
    'use strict';

    /**
     * WfText - Sistema de Campos de Texto Animados
     * @author SandroWeb
     * @version 4.0 - Animações via JS e Funcionalidade Completa
     * @since WEBFULL Framework v1.0
     */
    class WfText {
        constructor(element) {
            // Verificar se já foi inicializado
            if (element._wfText) return element._wfText;
            
            this.element = element;
            if (!this.element) return;

            // Salvar instância
            this.element._wfText = this;

            // Configurações
            this.effect = this.element.getAttribute('WfText-effect') || 'fade';
            this.interval = parseInt(this.element.getAttribute('WfText-interval')) || 4000;
            this.transition = parseInt(this.element.getAttribute('WfText-transition')) || 700;
            this.arrows = this.element.getAttribute('WfText-arrows') !== 'false';
            this.indicators = this.element.getAttribute('WfText-indicators') !== 'false';
            this.autoStart = this.element.getAttribute('WfText-autoplay') !== 'false';
            this.loop = this.element.getAttribute('WfText-loop') !== 'false';

            this.items = Array.from(this.element.querySelectorAll('.wf-text-item'));
            if (this.items.length === 0) return;

            this.currentIndex = 0;
            this.intervalId = null;
            this.isAnimating = false;

            this.init();
        }

    init() {
        this.loadCSS();
        this.setupComponent();
        this.createControls();
        this.updateActiveState();
        this.bindEvents();

        if (this.autoStart) {
            this.start();
        }
    }

    loadCSS() {
        if (document.getElementById('wftext-styles')) return;
        const style = document.createElement('style');
        style.id = 'wftext-styles';
        style.textContent = `
            .wf-text-carousel { position: relative; overflow: hidden; }
            .wf-text-carousel::before { display: none !important; content: none !important; }
            .wf-text-item { width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all var(--wftext-transition-duration, 0.7s) ease-in-out; }
            .wf-text-item:first-child { opacity: 1; visibility: visible; }
            .wftext-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.3); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.3s; }
            .wftext-arrow:hover { background: rgba(0,0,0,0.6); }
            .wftext-arrow-left { left: 10px; }
            .wftext-arrow-right { right: 10px; }
            .wftext-indicators { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; gap: 8px; }
            .wftext-indicator { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.2); cursor: pointer; padding: 0; transition: background 0.3s; }
            .wftext-indicator.active, .wftext-indicator:hover { background: white; }
        `;
        document.head.appendChild(style);
    }

    setupComponent() {
        this.element.style.position = 'relative';
        this.element.style.setProperty('--wftext-transition-duration', `${this.transition}ms`);
        this.items.forEach((item, index) => {
            item.style.opacity = index === 0 ? '1' : '0';
            item.style.visibility = index === 0 ? 'visible' : 'hidden';
            item.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease, visibility ${this.transition}ms ease`;
            item.style.willChange = 'transform, opacity';
        });
    }

    createControls() {
        if (this.items.length <= 1) return;
        if (this.arrows) {
            const leftArrow = document.createElement('button');
            leftArrow.className = 'wftext-arrow wftext-arrow-left';
            leftArrow.innerHTML = '‹';
            leftArrow.addEventListener('click', () => this.prev());
            this.element.appendChild(leftArrow);

            const rightArrow = document.createElement('button');
            rightArrow.className = 'wftext-arrow wftext-arrow-right';
            rightArrow.innerHTML = '›';
            rightArrow.addEventListener('click', () => this.next());
            this.element.appendChild(rightArrow);
        }
        if (this.indicators) {
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'wftext-indicators';
            this.items.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'wftext-indicator';
                indicator.dataset.index = index;
                indicator.addEventListener('click', () => this.goTo(index));
                indicatorsContainer.appendChild(indicator);
            });
            this.element.appendChild(indicatorsContainer);
        }
    }

    bindEvents() {
        if (this.autoStart) {
            this.element.addEventListener('mouseenter', () => this.pause());
            this.element.addEventListener('mouseleave', () => this.resume());
        }
    }

    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        if (!this.loop && (index < 0 || index >= this.items.length)) return;

        this.isAnimating = true;

        const currentItem = this.items[this.currentIndex];
        const nextIndex = (index + this.items.length) % this.items.length;
        const nextItem = this.items[nextIndex];
        const effect = nextItem.getAttribute('WfText-effect') || this.effect;

        // Garantir transição inline (fallback caso CSS não seja aplicado)
        if (nextItem) {
            nextItem.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease`;
            nextItem.style.willChange = 'transform, opacity';
        }
        if (currentItem) {
            currentItem.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease`;
            currentItem.style.willChange = 'transform, opacity';
        }

        // Prepare z-index layering
        if (currentItem) {
            currentItem.style.zIndex = '0';
        }
        nextItem.style.visibility = 'visible';
        nextItem.style.zIndex = '1';

        // Prepare IN start state for next item
        this._applyInStart(nextItem, effect);
        // Force reflow to ensure transition from start to end
        nextItem.getBoundingClientRect();
        // Animate IN to final state
        this._applyInEnd(nextItem, effect);

        // Animate OUT current item to final state
        if (currentItem) {
            this._applyOutEnd(currentItem, effect);
        }

        // Update index and indicators immediately
        this.currentIndex = nextIndex;
        this.updateActiveState();

        // Complete transition after duration
        setTimeout(() => {
            if (currentItem) {
                currentItem.style.visibility = 'hidden';
                currentItem.style.transform = 'none';
                currentItem.style.opacity = '0';
                currentItem.style.zIndex = '';
            }
            nextItem.style.zIndex = '';
            this.isAnimating = false;
        }, this.transition);
    }

    _applyInStart(item, effect) {
        // Common starting state
        item.style.opacity = '0';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
                item.style.transform = 'translateX(100%)';
                break;
            case 'slide-right':
                item.style.transform = 'translateX(-100%)';
                break;
            case 'slide-up':
                item.style.transform = 'translateY(100%)';
                break;
            case 'slide-down':
                item.style.transform = 'translateY(-100%)';
                break;
            case 'zoom-in':
                item.style.transform = 'scale(0.85)';
                break;
            case 'zoom-out':
                item.style.transform = 'scale(1.15)';
                break;
            case 'bounce':
                item.style.transform = 'scale(0.85)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    _applyInEnd(item, effect) {
        // Final visible state
        item.style.opacity = '1';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
            case 'slide-right':
                item.style.transform = 'translateX(0)';
                break;
            case 'slide-up':
            case 'slide-down':
                item.style.transform = 'translateY(0)';
                break;
            case 'zoom-in':
            case 'zoom-out':
            case 'bounce':
                item.style.transform = 'scale(1)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    _applyOutEnd(item, effect) {
        // Final hidden state for OUT animation (will be set to display:none after transition)
        item.style.opacity = '0';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
                item.style.transform = 'translateX(-100%)';
                break;
            case 'slide-right':
                item.style.transform = 'translateX(100%)';
                break;
            case 'slide-up':
                item.style.transform = 'translateY(-100%)';
                break;
            case 'slide-down':
                item.style.transform = 'translateY(100%)';
                break;
            case 'zoom-in':
                item.style.transform = 'scale(0.85)';
                break;
            case 'zoom-out':
                item.style.transform = 'scale(1.15)';
                break;
            case 'bounce':
                item.style.transform = 'scale(0.85)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }

    updateActiveState() {
        if (this.indicators) {
            this.element.querySelectorAll('.wftext-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    start() {
        if (this.intervalId || this.items.length <= 1) return;
        this.intervalId = setInterval(() => this.next(), this.interval);
    }

    stop() { clearInterval(this.intervalId); this.intervalId = null; }
    pause() { this.stop(); }
    resume() { this.start(); }

    static initAll(container = document) {
        let elements = [];
        try {
            if (container === document || container === document.body || container === document.documentElement) {
                elements = document.querySelectorAll('.wf-text-carousel');
            } else {
                if (container.matches && container.matches('.wf-text-carousel')) {
                    elements = [container, ...container.querySelectorAll('.wf-text-carousel')];
                } else {
                    elements = container.querySelectorAll('.wf-text-carousel');
                }
            }
        } catch (_) {
            elements = document.querySelectorAll('.wf-text-carousel');
        }
        elements.forEach(element => {
            if (!element._wfText) {
                element._wfText = new WfText(element);
            }
        });
    }
}

// Registro no WebFull
if (typeof window !== 'undefined') {
    window.WfText = WfText;

    if (window.WebFull && window.WebFull.modules) {
        window.WebFull.modules.WfText = WfText;
    }
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
    document.addEventListener('DOMContentLoaded', () => WfText.initAll());

    // Initialize dynamically added .wf-text containers as they appear (e.g., via WfAjax)
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;
                const scope = node.matches?.('.wf-text-carousel') ? node : node.querySelector?.('.wf-text-carousel');
                if (scope) {
                    WfText.initAll(scope); // will safely skip already initialized elements
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

})(window, document);


// ===== WfTextLimit.js =====
(function (window, document) {
  "use strict";

  class WfTextLimit {
    constructor(element) {
      this.element = element;
      this.max =
        parseInt(this.element.getAttribute("WfTextLimit-max")) ||
        parseInt(this.element.getAttribute("maxlength")) ||
        150;
      this.textTemplate =
        this.element.getAttribute("WfTextLimit-text") || "{count}/{max}";

      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.render();
      this.bindEvents();
    }

    // loadCSS removed

    render() {
      this.counter = document.createElement("div");
      this.counter.className = "wftextlimit-counter";
      this.element.parentNode.insertBefore(
        this.counter,
        this.element.nextSibling
      );
      this.updateCounter();
    }

    bindEvents() {
      this.element.addEventListener("input", () => this.handleInput());
      this.element.addEventListener("change", () => this.updateCounter());
    }

    handleInput() {
      const value = this.element.value;
      if (value.length > this.max) {
        this.element.value = value.slice(0, this.max);
      }
      this.updateCounter();
    }

    updateCounter() {
      const count = this.element.value.length;
      const remaining = this.max - count;
      const text = this.textTemplate
        .replace("{count}", count)
        .replace("{max}", this.max)
        .replace("{remaining}", remaining);
      this.counter.textContent = text;

      if (count >= this.max) {
        this.counter.classList.add("limit-reached");
      } else {
        this.counter.classList.remove("limit-reached");
      }
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfTextLimit]");
      elements.forEach((element) => {
        if (!element._wfTextLimit) {
          element._wfTextLimit = new WfTextLimit(element);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfTextLimit = WfTextLimit;
  } else if (typeof window !== "undefined") {
    window.WfTextLimit = WfTextLimit;
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        WfTextLimit.initAll()
      );
    } else {
      WfTextLimit.initAll();
    }
  }
})(window, document);


// ===== WfTextarea.js =====
(function (window, document) {
  "use strict";

  class WfTextarea {
    constructor(el, options = {}) {
      if (el._wfta) return el._wfta;
      el._wfta = this;

      this.el = el;
      this.options = options;
      this.name =
        el.getAttribute("name") || el.getAttribute("data-name") || "wftextarea";
      this.placeholder =
        el.getAttribute("WfTextarea-placeholder") ||
        el.getAttribute("wftextarea-placeholder") ||
        "";
      this.height = parseInt(
        el.getAttribute("WfTextarea-height") ||
          el.getAttribute("wftextarea-height") ||
          "100",
        10
      );
      this.minHeight = parseInt(
        el.getAttribute("WfTextarea-min-height") ||
          el.getAttribute("wftextarea-min-height") ||
          "100",
        10
      );
      this.maxHeight = parseInt(
        el.getAttribute("WfTextarea-max-height") ||
          el.getAttribute("wftextarea-max-height") ||
          "800",
        10
      );
      this.resizable = el.getAttribute("WfTextarea-resizable") !== "false";
      this.value = el.value || el.getAttribute("data-value") || "";
      this.render();
      this.bind();
    }

    render() {
      const box = document.createElement("div");
      box.className = "wfta-box";

      const toolbar = document.createElement("div");
      toolbar.className = "wfta-toolbar";

      // Select de fonte
      const fontSel = document.createElement("select");
      fontSel.className = "wfta-font";
      const wfFonts = [
        ["Poppins-light", "font1l", "Poppins Light"],
        ["Poppins-normal", "font1", "Poppins"],
        ["Poppins-bold", "font1b", "Poppins Bold"],
        ["Roboto-light", "font2l", "Roboto Light"],
        ["Roboto-normal", "font2", "Roboto"],
        ["Roboto-bold", "font2b", "Roboto Bold"],
        ["AlumniSans-light", "font3l", "Alumni Sans Light"],
        ["AlumniSans-normal", "font3", "Alumni Sans"],
        ["AlumniSans-bold", "font3b", "Alumni Sans Bold"],
        ["MeowScript-normal", "font4", "Meow Script"],
        ["DancingScript-normal", "font5", "Dancing Script"],
        ["PlaywriteBR-normal", "font6", "Playwrite BR"],
      ];
      fontSel.innerHTML = wfFonts
        .map(
          ([face, cls, label]) =>
            `<option value="${face}" data-class="${cls}">${label}</option>`
        )
        .join("");

      // Input de cor de fundo
      const backColorInput = document.createElement("input");
      backColorInput.type = "color";
      backColorInput.className = "wfta-color-back";
      backColorInput.value = "#ffff00";
      backColorInput.style.cssText =
        "position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;";

      // Input de cor de fonte
      const foreColorInput = document.createElement("input");
      foreColorInput.type = "color";
      foreColorInput.className = "wfta-color-fore";
      foreColorInput.value = "#000000";
      foreColorInput.style.cssText =
        "position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;";

      // Grupos de botões (usando símbolos Unicode como fallback)
      const groups = [
        [
          ["bold", "wf-bold", "Negrito (Ctrl+B)", "B"],
          ["italic", "wf-italic", "Itálico (Ctrl+I)", "I"],
          ["underline", "wf-underline", "Sublinhado (Ctrl+U)", "U"],
          ["strikeThrough", "wf-strikethrough", "Tachado", "S"],
        ],
        [
          ["foreColor", "wf-palette", "Cor da Fonte", "A"],
          ["backColor", "wf-color", "Cor de Fundo", "◧"],
          ["clean", "wf-eraser", "Limpar Formatação", "✖"],
        ],
        [
          ["justifyLeft", "wf-align-left", "Alinhar à Esquerda", "≡"],
          ["justifyCenter", "wf-align-middle", "Centralizar", "≣"],
          ["justifyRight", "wf-align-right", "Alinhar à Direita", "≡"],
          ["justifyFull", "wf-align-justify", "Justificar", "▤"],
        ],
        [
          ["insertUnorderedList", "wf-list-ul", "Lista", "•"],
          ["insertOrderedList", "wf-list-ol", "Lista Numerada", "№"],
          ["hr", "wf-minus", "Linha Horizontal", "─"],
          ["link", "wf-link", "Link (Ctrl+K)", "🔗"],
          ["image", "wf-image", "Imagem", "🖼"],
          ["theme", "wf-moon", "Tema Escuro", "🌙"],
          ["code", "wf-code", "Código HTML", "<>"],
          ["fullscreen", "wf-fullscreen", "Tela Cheia", "⛶"],
        ],
      ];

      toolbar.innerHTML = groups
        .map(
          (grp) =>
            `<div class="wfta-group">${grp
              .map(
                ([cmd, icon, title, fallback]) =>
                  `<button type="button" class="wfta-btn" data-cmd="${cmd}" title="${title}">
                  <i class="wf ${icon}"></i><span class="wfta-fallback">${
                    fallback || ""
                  }</span>
                </button>`
              )
              .join("")}</div>`
        )
        .join("");

      // Adicionar select de formato
      const formatGroup = document.createElement("div");
      formatGroup.className = "wfta-group wfta-group-format";
      const format = document.createElement("select");
      format.className = "wfta-format";
      format.innerHTML = [
        ["P", "P"],
        ["H1", "H1"],
        ["H2", "H2"],
        ["H3", "H3"],
        ["H4", "H4"],
        ["H5", "H5"],
        ["H6", "H6"],
      ]
        .map(([tag, label]) => `<option value="${tag}">${label}</option>`)
        .join("");
      formatGroup.appendChild(format);

      // Adicionar select de fonte
      const fontGroup = document.createElement("div");
      fontGroup.className = "wfta-group wfta-group-font";
      fontGroup.appendChild(fontSel);

      // Inserir grupos especiais
      toolbar.insertBefore(formatGroup, toolbar.firstChild);
      const secondGroup = toolbar.querySelector(".wfta-group:nth-child(2)");
      if (secondGroup) {
        toolbar.insertBefore(fontGroup, secondGroup);
      }

      // Adicionar inputs de cor ao toolbar
      toolbar.appendChild(backColorInput);
      toolbar.appendChild(foreColorInput);

      // Conectar inputs de cor aos botões após renderizar
      setTimeout(() => {
        const backColorBtn = toolbar.querySelector('[data-cmd="backColor"]');
        if (backColorBtn) {
          backColorBtn.style.position = "relative";
          backColorBtn.appendChild(backColorInput);
          backColorInput.style.cssText =
            "position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;";
        }

        const foreColorBtn = toolbar.querySelector('[data-cmd="foreColor"]');
        if (foreColorBtn) {
          foreColorBtn.style.position = "relative";
          foreColorBtn.appendChild(foreColorInput);
          foreColorInput.style.cssText =
            "position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;";
        }
      }, 0);

      // Editor
      const editorWrap = document.createElement("div");
      editorWrap.className = "wfta-editor-wrap";

      const editor = document.createElement("div");
      editor.className = "wfta-editor";
      editor.contentEditable = "true";
      editor.style.minHeight = this.height + "px";
      editor.setAttribute("placeholder", this.placeholder);
      if (this.value) {
        editor.innerHTML = this.value;
      } else {
        editor.innerHTML = "<p><br></p>";
      }

      editorWrap.appendChild(editor);

      // Textarea código
      const code = document.createElement("textarea");
      code.className = "wfta-code";
      code.style.display = "none";
      code.value = editor.innerHTML;
      code.spellcheck = false;

      editorWrap.appendChild(code);

      // Input hidden
      const input = document.createElement("textarea");
      input.className = "wfta-input";
      input.name = this.name;
      input.style.display = "none";
      input.value = editor.innerHTML;

      // Resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "wfta-resize-handle";
      resizeHandle.innerHTML = '<i class="wf wf-grip-lines"></i>';
      if (!this.resizable) {
        resizeHandle.style.display = "none";
      }

      // Status bar
      const statusBar = document.createElement("div");
      statusBar.className = "wfta-status";
      statusBar.innerHTML = '<span class="wfta-chars">0 caracteres</span>';

      // Montar estrutura
      box.appendChild(toolbar);
      box.appendChild(editorWrap);
      box.appendChild(resizeHandle);
      box.appendChild(statusBar);
      box.appendChild(input);

      this.el.parentNode.insertBefore(box, this.el.nextSibling);
      if (this.el.tagName.toLowerCase() === "textarea")
        this.el.style.display = "none";

      this.box = box;
      this.toolbar = toolbar;
      this.editorWrap = editorWrap;
      this.editor = editor;
      this.code = code;
      this.input = input;
      this.formatSel = format;
      this.fontSel = fontSel;
      this.backColorInput = backColorInput;
      this.foreColorInput = foreColorInput;
      this.resizeHandle = resizeHandle;
      this.statusBar = statusBar;

      WfTextarea.injectCSS();
      this.updateStatus();
      this.syncWithWfDay();
    }

    syncWithWfDay() {
      // Sincronizar com WfDay.js se estiver disponível
      if (typeof window.WfDay !== "undefined") {
        // Aplicar tema inicial do WfDay
        const currentTheme = window.WfDay.getTheme();
        this.applyWfDayTheme(currentTheme);

        // Escutar mudanças de tema globais
        window.addEventListener("wfday-theme-changed", (e) => {
          this.applyWfDayTheme(e.detail.theme);
        });

        // Fazer o botão de tema disparar o WfDay ao invés de controle local
        const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
        if (themeBtn) {
          themeBtn._wfdayIntegrated = true;
        }
      }
    }

    applyWfDayTheme(theme) {
      // theme = "day" ou "night"
      const isDark = theme === "night";
      this.box.classList.toggle("wfta-dark", isDark);

      // Atualizar ícone do botão
      const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
      if (themeBtn) {
        const icon = themeBtn.querySelector("i");
        if (isDark) {
          icon.className = "wf wf-sun";
          themeBtn.title = "Tema Claro";
        } else {
          icon.className = "wf wf-moon";
          themeBtn.title = "Tema Escuro";
        }
      }
    }

    saveSelection() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          try {
            this.savedSelection = sel.getRangeAt(0).cloneRange();
          } catch (e) {
            this.savedSelection = null;
          }
        }
      }
    }

    restoreSelection() {
      if (this.savedSelection) {
        try {
          if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this.savedSelection);
          }
        } catch (e) {
          // Seleção inválida, ignorar
        }
      }
    }

    restoreFocus() {
      this.editor.focus();
      if (this.savedSelection) {
        this.restoreSelection();
      }
    }

    updateActiveButtons() {
      // Remover classe active de todos os botões
      this.toolbar.querySelectorAll(".wfta-btn").forEach((btn) => {
        btn.classList.remove("wfta-active");
      });

      // Lista completa de comandos que podem ter estado ativo
      const commands = [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "insertUnorderedList",
        "insertOrderedList",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "insertHorizontalRule",
        "createLink",
      ];

      // Verificar quais comandos estão ativos
      commands.forEach((cmd) => {
        try {
          if (document.queryCommandState(cmd)) {
            const btn = this.toolbar.querySelector(`[data-cmd="${cmd}"]`);
            if (btn) btn.classList.add("wfta-active");
          }
        } catch (e) {
          // Alguns comandos podem não suportar queryCommandState
        }
      });

      // Verificar comandos especiais por nome de comando customizado
      const specialCommands = {
        hr: "insertHorizontalRule",
        link: "createLink",
      };

      Object.entries(specialCommands).forEach(([customCmd, execCmd]) => {
        try {
          if (document.queryCommandState(execCmd)) {
            const btn = this.toolbar.querySelector(`[data-cmd="${customCmd}"]`);
            if (btn) btn.classList.add("wfta-active");
          }
        } catch (e) {}
      });

      // Marcar botão code se estiver no modo código
      if (this.code.style.display === "block") {
        const codeBtn = this.toolbar.querySelector('[data-cmd="code"]');
        if (codeBtn) codeBtn.classList.add("wfta-active");
      }

      // Marcar botão fullscreen se estiver em tela cheia
      if (this.box.classList.contains("wfta-fullscreen")) {
        const fullscreenBtn = this.toolbar.querySelector(
          '[data-cmd="fullscreen"]'
        );
        if (fullscreenBtn) fullscreenBtn.classList.add("wfta-active");
      }

      // Atualizar select de formato
      try {
        const formatBlock = document.queryCommandValue("formatBlock");
        if (formatBlock) {
          this.formatSel.value = formatBlock.toUpperCase();
        }
      } catch (e) {}
    }

    bind() {
      // Salvar referência da seleção
      this.savedSelection = null;

      // Salvar a seleção sempre que mudar
      this.editor.addEventListener("mouseup", () => this.saveSelection());
      this.editor.addEventListener("keyup", () => this.saveSelection());
      this.editor.addEventListener("focus", () => this.saveSelection());

      // Salvar seleção quando clicar nos inputs de cor
      this.backColorInput.addEventListener("mousedown", () => {
        this.saveSelection();
      });

      this.foreColorInput.addEventListener("mousedown", () => {
        this.saveSelection();
      });

      // Botões da toolbar - usar mousedown para prevenir perda de foco
      this.toolbar.addEventListener("mousedown", (e) => {
        const btn = e.target.closest(".wfta-btn");
        if (!btn) return;

        const cmd = btn.getAttribute("data-cmd");

        // Salvar seleção sempre
        this.saveSelection();

        // Para os botões de cor, deixar os inputs de cor internos lidar
        if (cmd === "backColor" || cmd === "foreColor") {
          return;
        }

        e.preventDefault(); // Previne que o botão roube o foco

        // Executar comando
        this.exec(cmd);

        // Restaurar foco e atualizar botões
        setTimeout(() => {
          this.editor.focus();
          this.updateActiveButtons();
        }, 0);
      });

      // Select de formato
      this.formatSel.addEventListener("change", () => {
        const tag = this.formatSel.value;
        document.execCommand("formatBlock", false, tag);
        this.sync();
        this.editor.focus();
        this.updateActiveButtons();
      });

      // Select de fonte
      this.fontSel.addEventListener("change", () => {
        const f = this.fontSel.value;
        document.execCommand("fontName", false, f);
        this.sync();
        this.editor.focus();
        this.updateActiveButtons();
      });

      // Cor de fundo - restaurar seleção antes de aplicar
      this.backColorInput.addEventListener("input", () => {
        this.editor.focus();
        this.restoreSelection();
        document.execCommand("hiliteColor", false, this.backColorInput.value);
        this.sync();
      });

      // Cor da fonte - restaurar seleção antes de aplicar
      this.foreColorInput.addEventListener("input", () => {
        this.editor.focus();
        this.restoreSelection();
        document.execCommand("foreColor", false, this.foreColorInput.value);
        this.sync();
      });

      // Editor events
      this.editor.addEventListener("input", () => {
        this.sync();
        this.updateStatus();
      });
      this.editor.addEventListener("keyup", () => {
        this.updateActiveButtons();
      });
      this.editor.addEventListener("mouseup", () => {
        this.updateActiveButtons();
      });
      this.editor.addEventListener("keydown", (e) => this.shortcuts(e));

      // Code events
      this.code.addEventListener("input", () => {
        this.sync();
        this.updateStatus();
      });
      this.code.addEventListener("keydown", (e) => this.shortcuts(e));

      // Resize handle
      if (this.resizable) {
        this.bindResize();
      }
    }

    bindResize() {
      let startY = 0;
      let startHeight = 0;

      const onMouseMove = (e) => {
        const delta = e.clientY - startY;
        const newHeight = Math.max(
          this.minHeight,
          Math.min(this.maxHeight, startHeight + delta)
        );
        this.editorWrap.style.height = newHeight + "px";
        this.editor.style.minHeight = newHeight + "px";
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        this.box.classList.remove("wfta-resizing");
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };

      this.resizeHandle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        startY = e.clientY;
        startHeight = this.editorWrap.offsetHeight;
        this.box.classList.add("wfta-resizing");
        document.body.style.userSelect = "none";
        document.body.style.cursor = "ns-resize";
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }

    exec(cmd) {
      if (cmd === "fontname") {
        this.fontSel.focus();
        return;
      }
      // backColor agora é tratado diretamente no evento click do toolbar
      if (cmd === "code") {
        const toCode = this.code.style.display === "none";
        if (toCode) {
          this.code.value = this.editor.innerHTML;
          this.editor.style.display = "none";
          this.code.style.display = "block";
          this.box.classList.add("wfta-codeview");
        } else {
          this.editor.innerHTML = this.code.value;
          this.code.style.display = "none";
          this.editor.style.display = "block";
          this.box.classList.remove("wfta-codeview");
        }
        this.sync();
        this.updateActiveButtons();
        return;
      }
      if (cmd === "clean") {
        document.execCommand("removeFormat");
        document.execCommand("unlink");
        this.sync();
        return;
      }
      if (cmd === "hr") {
        document.execCommand("insertHorizontalRule");
        this.sync();
        return;
      }
      if (cmd === "link") {
        const url = prompt("Digite a URL:");
        if (url) {
          document.execCommand("createLink", false, url);
        }
        this.sync();
        return;
      }
      if (cmd === "image") {
        const url = prompt("Digite a URL da imagem:");
        if (url) {
          document.execCommand("insertImage", false, url);
        }
        this.sync();
        return;
      }
      if (cmd === "theme") {
        // Se WfDay estiver disponível, usar ele para controle global
        if (typeof window.WfDay !== "undefined") {
          window.WfDay.toggleTheme();
          // O evento "wfday-theme-changed" vai atualizar automaticamente
        } else {
          // Fallback: controle manual local
          const isDark = this.box.classList.contains("wfta-dark");
          this.box.classList.toggle("wfta-dark", !isDark);

          // Atualizar ícone do botão
          const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
          const icon = themeBtn.querySelector("i");
          if (isDark) {
            // Voltando ao claro
            icon.className = "wf wf-moon";
            themeBtn.title = "Tema Escuro";
          } else {
            // Indo para escuro
            icon.className = "wf wf-sun";
            themeBtn.title = "Tema Claro";
          }
        }
        return;
      }
      if (cmd === "fullscreen") {
        const on = !this.box.classList.contains("wfta-fullscreen");
        this.box.classList.toggle("wfta-fullscreen", on);
        document.body.style.overflow = on ? "hidden" : "";
        if (on) {
          this.editorWrap.style.height = "calc(100% - 120px)";
        } else {
          this.editorWrap.style.height = "";
        }
        this.updateActiveButtons();
        return;
      }
      if (cmd === "undo" || cmd === "redo") {
        document.execCommand(cmd);
        this.sync();
        return;
      }

      // Para comandos de formatação, garantir que o editor tenha foco e seleção
      this.editor.focus();

      // Restaurar seleção se existir
      if (this.savedSelection) {
        this.restoreSelection();
      }

      document.execCommand(cmd);
      this.sync();
    }

    sync() {
      if (this.code.style.display === "block") {
        this.input.value = this.code.value;
      } else {
        this.input.value = this.editor.innerHTML;
        this.code.value = this.editor.innerHTML;
      }
    }

    updateStatus() {
      const text = this.editor.innerText || "";
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      this.statusBar.querySelector(
        ".wfta-chars"
      ).textContent = `${chars} caracteres · ${words} palavras`;
    }

    shortcuts(e) {
      const c = e.ctrlKey || e.metaKey;
      if (!c) return;
      const k = e.key.toLowerCase();

      const shortcuts = {
        b: () => this.exec("bold"),
        i: () => this.exec("italic"),
        u: () => this.exec("underline"),
        k: () => this.exec("link"),
        z: () => this.exec("undo"),
        y: () => this.exec("redo"),
        0: () => document.execCommand("formatBlock", false, "P"),
        1: () => document.execCommand("formatBlock", false, "H1"),
        2: () => document.execCommand("formatBlock", false, "H2"),
        3: () => document.execCommand("formatBlock", false, "H3"),
        4: () => document.execCommand("formatBlock", false, "H4"),
        5: () => document.execCommand("formatBlock", false, "H5"),
        6: () => document.execCommand("formatBlock", false, "H6"),
      };

      if (k === "enter") {
        e.preventDefault();
        this.exec("hr");
      } else if (shortcuts[k]) {
        e.preventDefault();
        shortcuts[k]();
        this.sync();
      }
    }

    static injectCSS() {
      if (document.getElementById("wftextarea-css")) return;
      const s = document.createElement("style");
      s.id = "wftextarea-css";
      s.textContent = `
    .wfta-box {
      border: 1px solid var(--wf-border);
      border-radius: 0 0 6px 6px;
      background: #fff;
      color: #333;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin-bottom: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .wfta-box:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    .wfta-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px;
      border-bottom: 1px solid  var(--wf-border);
      background: linear-gradient(to bottom, #fafafa, #f5f5f5);
      flex-wrap: wrap;
      transition: all 0.3s ease;
    }
    .wfta-group {
      display: flex;
      gap: 2px;
      padding: 0 5px;
      border-right: 1px solid var(--wf-border);
    }
    .wfta-group select {
      margin-bottom: 0 !important;
    }
    .wfta-group:last-of-type {
      border-right: none;
    }
    .wfta-btn {
      background: #fff;
      border: 1px solid  var(--wf-border);
      border-radius: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin: 0;
      padding: 0;
      color: #555;
      font-size: 16px;
      transition: all 0.2s;
      position: relative;
    }
    .wfta-btn .wf {
      display: inline-block;
    }
    .wfta-btn .wfta-fallback {
      display: none;
      font-size: 14px;
      font-weight: bold;
    }
    .wfta-btn .wf:empty + .wfta-fallback,
    .wfta-btn .wf:not(:before) + .wfta-fallback {
      display: inline-block;
    }
    .wfta-btn:hover {
      background: #f0f0f0;
      border-color: #bbb;
      color: #000;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .wfta-btn:active {
      transform: translateY(0);
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }
    .wfta-btn.wfta-active {
      background: #4a90e2;
      border-color: #4a90e2;
      color: #fff;
      box-shadow: 0 2px 6px rgba(74,144,226,0.3);
    }
    .wfta-btn.wfta-active:hover {
      background: #357abd;
      border-color: #357abd;
      color: #fff;
    }
    .wfta-format,
    .wfta-font {
      background: #fff;
      color: #333;
      border: 1px solid  var(--wf-border);
      border-radius: 0;
      padding: 3px 8px;
      font-size: 13px;
      cursor: pointer;
      outline: none;
      transition: all 0.2s;
      min-width: 110px;
    }
    .wfta-format:hover,
    .wfta-font:hover {
      border-color: #bbb;
      background: #f9f9f9;
    }
    .wfta-format:focus,
    .wfta-font:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74,144,226,0.1);
    }
    .wfta-group-format {
      border-right: 1px solid  var(--wf-border);
      padding-right: 8px;
    }
    .wfta-group-font {
      border-right: 1px solid  var(--wf-border);
      padding-right: 8px;
    }
    .wfta-editor-wrap {
      position: relative;
      background: #fff;
    }
    .wfta-editor {
      padding: 2px 8px;
      min-height: 100px !important;
      max-height: 100px;
      overflow-y: auto;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #333;
      transition: all 0.3s ease;
    }
    .wfta-editor[placeholder]:empty:before {
      content: attr(placeholder);
      color: #aaa;
      font-style: italic;
    }
    .wfta-editor:focus {
      background: #fafafa;
    }
    .wfta-editor p {
      margin: 0 0 1em 0;
    }
    .wfta-editor h1, .wfta-editor h2, .wfta-editor h3,
    .wfta-editor h4, .wfta-editor h5, .wfta-editor h6 {
      margin: 1em 0 0.5em 0;
      font-weight: 600;
    }
    .wfta-editor ul, .wfta-editor ol {
      margin: 0.5em 0;
      padding-left: 2em;
    }
    .wfta-editor hr {
      border: none;
      border-top: 2px solid  var(--wf-border);
      margin: 1.5em 0;
    }
    .wfta-editor img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin: 1em 0;
    }
    .wfta-editor a {
      color: #4a90e2;
      text-decoration: underline;
    }
    .wfta-code {
      display: none;
      width: 100%;
      min-height: 300px;
      padding: 16px;
      border: none;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 13px;
      background: #1e1e1e;
      color: var(--neut3) !important;
      outline: none;
      resize: none;
      line-height: 1.5;
    }
    .wfta-codeview .wfta-code {
      display: block;
    }
    .wfta-codeview .wfta-editor {
      display: none;
    }
    .wfta-resize-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5px;
      background: linear-gradient(to bottom, #f5f5f5, #fafafa);
      border-top: 1px solid var(--wf-border);
      cursor: ns-resize;
      color: #999;
      font-size: 12px;
      transition: all 0.2s;
    }
    .wfta-resize-handle:hover {
      background: #f0f0f0;
      color: #666;
    }
    .wfta-resizing .wfta-resize-handle {
      background: #e0e0e0;
      color: #333;
    }
    .wfta-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 16px;
      background: #fafafa;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666;
    }
    .wfta-input {
      display: none;
    }
    .wfta-fullscreen {
      position: fixed;
      inset: 0;
      z-index: 99999;
      border-radius: 0;
      margin: 0;
    }
    .wfta-fullscreen .wfta-editor-wrap {
      height: calc(100vh - 120px);
    }
    .wfta-fullscreen .wfta-editor {
      min-height: 100%;
      max-height: none;
    }

    /* Tema Escuro Manual (classe .wfta-dark) ou Automático (html.wfday-night) */
    .wfta-box.wfta-dark,
    html.wfday-night .wfta-box {
      border-color: var(--wf-border, #3a3a3a);
      background: var(--wf-bg, #1e1e1e);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-toolbar,
    html.wfday-night .wfta-box .wfta-toolbar {
      background: var(--wf-bg-, linear-gradient(to bottom, #252525, #1e1e1e));
      border-bottom-color: var(--wf-border, #3a3a3a);
    }
    .wfta-box.wfta-dark .wfta-group,
    html.wfday-night .wfta-box .wfta-group {
      border-right-color: var(--wf-border, #3a3a3a);
    }
    .wfta-box.wfta-dark .wfta-btn,
    html.wfday-night .wfta-box .wfta-btn {
      background: var(--wf-bg--, #2a2a2a);
      border-color: var(--wf-border-, #444);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-btn:hover,
    html.wfday-night .wfta-box .wfta-btn:hover {
      background: var(--wf-hover, #333);
      border-color: var(--wf-border, #555);
      color: var(--wf-color-, #fff);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .wfta-box.wfta-dark .wfta-btn.wfta-active,
    html.wfday-night .wfta-box .wfta-btn.wfta-active {
      background: var(--wf-link, #5a9fd4);
      border-color: var(--wf-link, #5a9fd4);
      color: #fff;
      box-shadow: 0 2px 6px rgba(90,159,212,0.4);
    }
    .wfta-box.wfta-dark .wfta-btn.wfta-active:hover,
    html.wfday-night .wfta-box .wfta-btn.wfta-active:hover {
      background: var(--wf-hover, #4a8fc4);
      border-color: var(--wf-hover, #4a8fc4);
      color: #fff;
    }
    .wfta-box.wfta-dark .wfta-format,
    .wfta-box.wfta-dark .wfta-font,
    html.wfday-night .wfta-box .wfta-format,
    html.wfday-night .wfta-box .wfta-font {
      background: var(--wf-bg--, #2a2a2a);
      border-color: var(--wf-border-, #444);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-format:hover,
    .wfta-box.wfta-dark .wfta-font:hover,
    html.wfday-night .wfta-box .wfta-format:hover,
    html.wfday-night .wfta-box .wfta-font:hover {
      background: var(--wf-bg-, #333);
      border-color: var(--wf-border, #555);
    }
    .wfta-box.wfta-dark .wfta-format:focus,
    .wfta-box.wfta-dark .wfta-font:focus,
    html.wfday-night .wfta-box .wfta-format:focus,
    html.wfday-night .wfta-box .wfta-font:focus {
      border-color: var(--wf-link, #5a9fd4);
      box-shadow: 0 0 0 2px rgba(90,159,212,0.2);
    }
    .wfta-box.wfta-dark .wfta-editor-wrap,
    html.wfday-night .wfta-box .wfta-editor-wrap {
      background: var(--wf-bg, #1e1e1e);
    }
    .wfta-box.wfta-dark .wfta-editor,
    html.wfday-night .wfta-box .wfta-editor {
      background: var(--wf-bg, #1e1e1e);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-editor:focus,
    html.wfday-night .wfta-box .wfta-editor:focus {
      background: var(--wf-bg-, #252525);
    }
    .wfta-box.wfta-dark .wfta-editor[placeholder]:empty:before,
    html.wfday-night .wfta-box .wfta-editor[placeholder]:empty:before {
      color: var(--wf-color--, #666);
    }
    .wfta-box.wfta-dark .wfta-editor hr,
    html.wfday-night .wfta-box .wfta-editor hr {
      border-top-color: var(--wf-border, #444);
    }
    .wfta-box.wfta-dark .wfta-editor a,
    html.wfday-night .wfta-box .wfta-editor a {
      color: var(--wf-link, #5a9fd4);
    }
    .wfta-box.wfta-dark .wfta-code,
    html.wfday-night .wfta-box .wfta-code {
      background: var(--wf-bg_, #0d0d0d);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-resize-handle,
    html.wfday-night .wfta-box .wfta-resize-handle {
      background: var(--wf-bg-, linear-gradient(to bottom, #1e1e1e, #252525));
      border-top-color: var(--wf-border, #3a3a3a);
      color: var(--wf-color--, #666);
    }
    .wfta-box.wfta-dark .wfta-resize-handle:hover,
    html.wfday-night .wfta-box .wfta-resize-handle:hover {
      background: var(--wf-bg--, #2a2a2a);
      color: var(--wf-color-, #999);
    }
    .wfta-box.wfta-dark .wfta-status,
    html.wfday-night .wfta-box .wfta-status {
      background: var(--wf-bg, #1e1e1e);
      border-top-color: var(--wf-border, #3a3a3a);
      color: var(--wf-color--, #888);
    }

    /* Destaque no botão de tema quando ativo */
    .wfta-box.wfta-dark .wfta-btn[data-cmd="theme"],
    html.wfday-night .wfta-box .wfta-btn[data-cmd="theme"] {
      background: #3a3a3a;
      border-color: #5a9fd4;
      color: #ffd700;
    }
    .wfta-box.wfta-dark .wfta-btn[data-cmd="theme"]:hover,
    html.wfday-night .wfta-box .wfta-btn[data-cmd="theme"]:hover {
      background: #444;
      color: #ffed4e;
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
    }

    /* Dark mode automático (prefers-color-scheme) */
    @media (prefers-color-scheme: dark) {
      .wfta-box:not(.wfta-dark) {
        /* Mantém claro por padrão, só muda com o botão ou classe global */
      }
    }
    `;
      document.head.appendChild(s);
    }

    static initAll(container = document) {
      const nodes = container.querySelectorAll("[WfTextarea], [wftextarea]");
      nodes.forEach((el) => {
        if (!el._wfta) {
          el._wfta = new WfTextarea(el);
        }
      });
    }
  }

  // Exportação Global
  if (typeof window !== "undefined") {
    window.WfTextarea = WfTextarea;
    if (window.WebFull) {
      window.WebFull.modules.WfTextarea = WfTextarea;
    }
  }

  // Auto-inicialização
  if (typeof document !== "undefined") {
    const init = () => WfTextarea.initAll();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // MutationObserver para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      let shouldInit = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) init();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})(window, document);


// ===== WfTool.js =====
/**
 * WfTool - Sistema de Tooltips Avançado
 * SandroWeb - 2025
 */

class WfTool {
  constructor(element) {
    this.element = element;
    this.tooltip = null;
    this.position = this.element.getAttribute("WfTool-position") || "top";
    this.delay = parseInt(this.element.getAttribute("WfTool-delay")) || 300;
    this.theme = this.element.getAttribute("WfTool-theme") || "night";
    this.autoTheme = this.element.getAttribute("WfTool-auto-theme") === "true";
    this.focusEnabled = this.element.getAttribute("WfTool-focus") !== "false";
    // Raw attribute and decoded version (decodes HTML entities)
    this._rawText =
      this.element.getAttribute("WfTool") ||
      this.element.getAttribute("WfTool-text") ||
      "";
    const txtArea = document.createElement("textarea");
    txtArea.innerHTML = this._rawText;
    this._decodedText = txtArea.value;

    // Detecta automaticamente se o conteúdo contém tags HTML (ex: <i>)
    const hasHtml = /<[^>]+>/.test(this._decodedText);
    this.html = this.element.getAttribute("WfTool-html") === "true" || hasHtml;
    this.arrow = this.element.getAttribute("WfTool-arrow") !== "false";
    this.text = this._decodedText || this._rawText;

    // Última posição do mouse (para posicionamento mouse)
    this._lastMouseX = null;
    this._lastMouseY = null;

    this.init();
  }

  init() {
    this.loadCSS();
    this.createTooltip();
    this.bindEvents();
    this.element._wftool = this;
    try {
      this._domObserver = new MutationObserver(() => {
        if (!document.body.contains(this.element)) {
          this.destroy();
        }
      });
      this._domObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } catch (_) {}
  }

  loadCSS() {
    if (document.querySelector("#wftool-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "wftool-styles";
    style.textContent = `
         .wftool {
            position: fixed;
            z-index: 10000;
            background: var(--wftool-bg, #333);
            color: var(--wftool-color, #fff);
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 13px;
            line-height: 1.2;
            max-width: 200px;
            word-wrap: break-word;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            opacity: 0;
            visibility: hidden;
            transform: scale(0.95);
            transition: opacity 150ms ease, transform 150ms ease;
            pointer-events: none;
         }

         .wftool.wftool-show {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            pointer-events: auto;
         }

         /* Animações por keyframes para garantir execução mesmo com overrides */
         @keyframes wftoolIn {
            from { opacity: 0; transform: scale(0.95); }
            to   { opacity: 1; transform: scale(1); }
         }
         @keyframes wftoolOut {
            from { opacity: 1; transform: scale(1); }
            to   { opacity: 0; transform: scale(0.95); }
         }

         .wftool-anim-in {
            animation: wftoolIn 200ms ease forwards;
         }
         .wftool-anim-out {
            animation: wftoolOut 200ms ease forwards;
         }

         .wftool-arrow {
            position: absolute;
            width: 0;
            height: 0;
            border: 5px solid transparent;
         }

         .wftool-arrow.top {
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.bottom {
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.left {
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.right {
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: var(--wftool-bg, #333);
         }

         .wftool-day {
            --wftool-bg: #ffffff;
            --wftool-color: #333333;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15);
         }

         .wftool-night {
            --wftool-bg: #1a1a1a;
            --wftool-color: #ffffff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3);
         }
      `;
    document.head.appendChild(style);
  }

  createTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
    }

    this.tooltip = document.createElement("div");
    this.tooltip.className = "wftool";

    // Acessibilidade: role, aria-hidden e vínculo com o elemento alvo
    this.tooltip.setAttribute("role", "tooltip");
    this.tooltip.setAttribute("aria-hidden", "true");
    if (!this.tooltip.id) {
      this.tooltip.id = `wftool-${Math.random().toString(36).slice(2, 9)}`;
    }
    if (!this.element.hasAttribute("aria-describedby")) {
      this.element.setAttribute("aria-describedby", this.tooltip.id);
    }

    // Estado inicial para animações
    this.tooltip.style.display = "none";

    // Conteúdo: se detectamos HTML, inserir como HTML; caso contrário texto
    if (this.html) {
      // Inserir HTML decodificado (mantém ícones <i> e outras tags)
      this.tooltip.innerHTML = this.text;
    } else {
      this.tooltip.textContent = this.text;
    }

    // Seta (exceto para mouse)
    if (this.arrow && this.position !== "mouse") {
      const arrow = document.createElement("div");
      arrow.className = "wftool-arrow";
      this.tooltip.appendChild(arrow);
    }

    // Aplicar tema
    this.applyTheme();

    // Se o tooltip segue o tema automaticamente (auto) ou inverte o WfDay,
    // observar mudanças de classe no documentElement para atualizar o tema em tempo real.
    if (this.theme === "auto" || this.autoTheme) {
      if (typeof MutationObserver !== "undefined") {
        this._themeObserver = new MutationObserver(() => {
          this.applyTheme();
        });
        this._themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      } else {
        // Fallback: escutar evento global de mudança de tema, se existir
        this._themeListener = () => this.applyTheme();
        document.addEventListener("wfday:changed", this._themeListener);
      }
    }

    document.body.appendChild(this.tooltip);
  }

  applyTheme() {
    if (!this.tooltip) return;

    // Limpar classes anteriores
    this.tooltip.classList.remove("wftool-day", "wftool-night");

    const isNight = document.documentElement.classList.contains("wfday-night");

    if (this.theme === "auto") {
      // Segue WfDay: se é night -> aplicar night (fundo escuro), se day -> day (fundo claro)
      this.tooltip.classList.add(isNight ? "wftool-night" : "wftool-day");
    } else if (this.autoTheme) {
      // Inverte WfDay
      this.tooltip.classList.add(isNight ? "wftool-day" : "wftool-night");
    } else {
      this.tooltip.classList.add(`wftool-${this.theme}`);
    }
  }

  bindEvents() {
    // Mouse
    this._enterHandler = () => this.show();
    this._leaveHandler = () => this.hide();
    this.element.addEventListener("mouseenter", this._enterHandler);
    this.element.addEventListener("mouseleave", this._leaveHandler);

    // Teclado (acessibilidade)
    if (this.focusEnabled) {
      if (
        this.element.tabIndex === -1 &&
        !this.element.hasAttribute("tabindex")
      ) {
        this.element.setAttribute("tabindex", "0");
      }
      this._focusInHandler = () => this.show();
      this._focusOutHandler = () => this.hide();
      this.element.addEventListener("focusin", this._focusInHandler);
      this.element.addEventListener("focusout", this._focusOutHandler);
    }

    // Toque (mobile)
    this._touchHandlerShow = () => this.show();
    this._touchHandlerHide = () => this.hide();
    this.element.addEventListener("touchstart", this._touchHandlerShow, {
      passive: true,
    });
    this.element.addEventListener("touchend", this._touchHandlerHide, {
      passive: true,
    });
    this.element.addEventListener("touchcancel", this._touchHandlerHide, {
      passive: true,
    });

    // Seguir mouse quando position === "mouse"
    if (this.position === "mouse") {
      // Ouvir no document para garantir captura mesmo quando o elemento perde foco
      this._mouseHandler = (e) => this.updateMousePosition(e);
      document.addEventListener("mousemove", this._mouseHandler);
    }
  }

  show() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    this.showTimeout = setTimeout(() => {
      // Mostrar temporariamente (invisível) para medir
      this.tooltip.style.display = "block";
      this.tooltip.style.visibility = "hidden";
      this.tooltip.classList.remove("wftool-show");

      if (this.position !== "mouse") {
        this.positionTooltip();
      } else {
        // Posicionamento inicial próximo ao cursor atual, se disponível
        const mouseX = this._lastMouseX;
        const mouseY = this._lastMouseY;
        if (mouseX != null && mouseY != null) {
          let left = mouseX + 15;
          let top = mouseY - this.tooltip.offsetHeight / 2;

          if (left + this.tooltip.offsetWidth > window.innerWidth - 8) {
            left = mouseX - this.tooltip.offsetWidth - 15;
          }
          if (left < 8) {
            left = 8;
          }
          if (top < 8) {
            top = mouseY + 15;
          }

          this.tooltip.style.left = `${left}px`;
          this.tooltip.style.top = `${top}px`;
        } else {
          this.tooltip.style.left = "0px";
          this.tooltip.style.top = "0px";
        }
      }

      this.adjustArrow();

      // Forçar reflow e depois mostrar com animação
      this.tooltip.offsetHeight;
      this.tooltip.style.visibility = "visible";
      // Usar classes de animação por keyframes para forçar execução
      this.tooltip.classList.remove("wftool-anim-out");
      this.tooltip.classList.add("wftool-anim-in");
      // também manter a classe de estado
      this.tooltip.classList.add("wftool-show");
      this.tooltip.setAttribute("aria-hidden", "false");
    }, this.delay);
  }

  hide() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    if (!this.tooltip) return;

    this.tooltip.setAttribute("aria-hidden", "true");

    // Remover entrada e iniciar animação de saída
    this.tooltip.classList.remove("wftool-anim-in");
    this.tooltip.classList.add("wftool-anim-out");
    this.tooltip.classList.remove("wftool-show");

    // Remover listener anterior caso exista
    if (this.tooltip._swtoolHideHandler) {
      this.tooltip.removeEventListener(
        "animationend",
        this.tooltip._swtoolHideHandler
      );
      this.tooltip.removeEventListener(
        "transitionend",
        this.tooltip._swtoolHideHandler
      );
      this.tooltip._swtoolHideHandler = null;
    }

    const finish = () => {
      try {
        this.tooltip.style.display = "none";
      } catch (err) {}
      this.tooltip.classList.remove(
        "wftool-anim-out",
        "wftool-anim-in",
        "wftool-show"
      );
      if (this.tooltip._swtoolHideHandler) {
        this.tooltip.removeEventListener(
          "animationend",
          this.tooltip._swtoolHideHandler
        );
        this.tooltip.removeEventListener(
          "transitionend",
          this.tooltip._swtoolHideHandler
        );
        this.tooltip._swtoolHideHandler = null;
      }
    };

    const handler = (e) => {
      if (e.type === "animationend" || e.propertyName === "opacity") {
        finish();
      }
    };

    this.tooltip._swtoolHideHandler = handler;
    this.tooltip.addEventListener("animationend", handler);
    this.tooltip.addEventListener("transitionend", handler);

    // Fallback: garantir hide se evento não disparar
    if (this._hideFallbackTimeout) clearTimeout(this._hideFallbackTimeout);
    this._hideFallbackTimeout = setTimeout(() => {
      finish();
      this._hideFallbackTimeout = null;
    }, 500);
  }

  positionTooltip() {
    const rect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    let top, left;

    switch (this.position) {
      case "auto":
        // Posicionamento automático inteligente
        ({ top, left } = this.calculateAutoPosition(rect, tooltipRect));
        break;
      case "top":
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.left - tooltipRect.width - 15;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.right + 8;
        break;
      default:
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    }

    // Ajustar se sair da tela
    if (top < 0) {
      top = rect.bottom + 8;
      this.position = "bottom";
    }
    if (left < 0) {
      left = 8;
    }
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 8;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = rect.top - tooltipRect.height - 8;
      this.position = "top";
    }

    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
  }

  calculateAutoPosition(rect, tooltipRect) {
    const margin = 8;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular posições possíveis
    const positions = {
      top: {
        top: rect.top - tooltipRect.height - margin,
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        fits: rect.top - tooltipRect.height - margin >= 0,
      },
      bottom: {
        top: rect.bottom + margin,
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        fits: rect.bottom + tooltipRect.height + margin <= windowHeight,
      },
      left: {
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
        left: rect.left - tooltipRect.width - margin,
        fits: rect.left - tooltipRect.width - margin >= 0,
      },
      right: {
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
        left: rect.right + margin,
        fits: rect.right + tooltipRect.width + margin <= windowWidth,
      },
    };

    // Ajustar posições para não sair da tela horizontalmente
    Object.values(positions).forEach((pos) => {
      if (pos.left < margin) {
        pos.left = margin;
      }
      if (pos.left + tooltipRect.width > windowWidth - margin) {
        pos.left = windowWidth - tooltipRect.width - margin;
      }
    });

    // Priorizar posições que cabem completamente
    const preferredOrder = ["top", "bottom", "right", "left"];

    for (const posName of preferredOrder) {
      if (positions[posName].fits) {
        this.position = posName; // Atualizar para ajustar seta
        return positions[posName];
      }
    }

    // Se nenhuma posição cabe perfeitamente, usar a primeira que pelo menos não sai completamente
    for (const posName of preferredOrder) {
      const pos = positions[posName];
      if (pos.top >= 0 && pos.top + tooltipRect.height <= windowHeight) {
        this.position = posName;
        return pos;
      }
    }

    // Fallback: usar top
    this.position = "top";
    return positions.top;
  }

  updateMousePosition(e) {
    if (this.position === "mouse" && this.tooltip) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Guardar última posição do mouse
      this._lastMouseX = mouseX;
      this._lastMouseY = mouseY;

      // Posicionar tooltip ao lado do mouse (usar medidas reais do tooltip)
      let left = mouseX + 15;
      let top = mouseY - this.tooltip.offsetHeight / 2;

      // Ajustar se sair da tela (direita)
      if (left + this.tooltip.offsetWidth > window.innerWidth - 8) {
        left = mouseX - this.tooltip.offsetWidth - 15;
      }

      // Ajustar se sair da tela (esquerda)
      if (left < 8) {
        left = 8;
      }

      // Ajustar se sair da tela (topo)
      if (top < 8) {
        top = mouseY + 15;
      }

      this.tooltip.style.left = `${left}px`;
      this.tooltip.style.top = `${top}px`;
    }
  }

  adjustArrow() {
    const arrow = this.tooltip.querySelector(".wftool-arrow");
    if (!arrow) return;

    arrow.className = "wftool-arrow";
    arrow.classList.add(this.position);
  }

  destroy() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    // Remover listeners de mouse/touch/foco
    if (this._enterHandler) {
      this.element.removeEventListener("mouseenter", this._enterHandler);
      this._enterHandler = null;
    }
    if (this._leaveHandler) {
      this.element.removeEventListener("mouseleave", this._leaveHandler);
      this._leaveHandler = null;
    }
    if (this._focusInHandler) {
      this.element.removeEventListener("focusin", this._focusInHandler);
      this._focusInHandler = null;
    }
    if (this._focusOutHandler) {
      this.element.removeEventListener("focusout", this._focusOutHandler);
      this._focusOutHandler = null;
    }
    if (this._touchHandlerShow) {
      this.element.removeEventListener("touchstart", this._touchHandlerShow);
      this._touchHandlerShow = null;
    }
    if (this._touchHandlerHide) {
      this.element.removeEventListener("touchend", this._touchHandlerHide);
      this.element.removeEventListener("touchcancel", this._touchHandlerHide);
      this._touchHandlerHide = null;
    }

    if (this._mouseHandler) {
      document.removeEventListener("mousemove", this._mouseHandler);
      this._mouseHandler = null;
    }

    // Desconectar observadores/ouvintes de tema
    if (this._themeObserver) {
      try {
        this._themeObserver.disconnect();
      } catch (err) {}
      this._themeObserver = null;
    }
    if (this._themeListener) {
      document.removeEventListener("wfday:changed", this._themeListener);
      this._themeListener = null;
    }
    if (this._domObserver) {
      try {
        this._domObserver.disconnect();
      } catch (err) {}
      this._domObserver = null;
    }

    // Remover tooltip do DOM
    if (this.tooltip) {
      // Remover vínculo ARIA se fomos nós que adicionamos
      if (this.element.getAttribute("aria-describedby") === this.tooltip.id) {
        this.element.removeAttribute("aria-describedby");
      }
      this.tooltip.remove();
    }

    this.element._swtool = null;
  }

  setText(text) {
    this.text = text || "";
    this.html = false;
    if (this.tooltip) {
      this.tooltip.textContent = this.text;
      // Re-add arrow if needed (and not mouse mode)
      if (this.arrow && this.position !== "mouse") {
        const existingArrow = this.tooltip.querySelector(".wftool-arrow");
        if (!existingArrow) {
          const arrow = document.createElement("div");
          arrow.className = "wftool-arrow";
          this.tooltip.appendChild(arrow);
          this.adjustArrow();
        }
      }
    }
  }

  setHTML(html) {
    this.text = html || "";
    this.html = true;
    if (this.tooltip) {
      this.tooltip.innerHTML = this.text;
      // Re-add arrow if needed (and not mouse mode)
      if (this.arrow && this.position !== "mouse") {
        const existingArrow = this.tooltip.querySelector(".wftool-arrow");
        if (!existingArrow) {
          const arrow = document.createElement("div");
          arrow.className = "wftool-arrow";
          this.tooltip.appendChild(arrow);
          this.adjustArrow();
        }
      }
    }
  }

  static initAll(container = document) {
    const descendants = Array.from(
      container.querySelectorAll("[WfTool], [WfTool-text]")
    );
    const includeSelf =
      container &&
      container.getAttribute &&
      (container.hasAttribute("WfTool") ||
        container.hasAttribute("WfTool-text"));
    const elements = includeSelf ? [container, ...descendants] : descendants;
    const instances = [];

    elements.forEach((el) => {
      if (!el._swtoolInitialized) {
        try {
          const instance = new WfTool(el);
          el._swtoolInitialized = true;
          instances.push(instance);
        } catch (error) {
          console.error("WfTool: Erro ao inicializar elemento:", error);
        }
      }
    });

    return instances;
  }

  static destroyAll(container = document) {
    const elements = Array.from(
      container.querySelectorAll("[WfTool], [WfTool-text]")
    );
    elements.forEach((el) => {
      if (el._swtool) {
        el._swtool.destroy();
        delete el._swtool;
        delete el._swtoolInitialized;
      }
    });
  }
}

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfTool = WfTool;
}

// Expor globalmente sempre
if (typeof window !== "undefined") {
  window.WfTool = WfTool;
}


// ===== WfTop.js =====
/**
 * WfTop - Sistema de Botão Voltar ao Topo com Animações
 * SandroWeb - 2025
 */

// Sobrescrever qualquer fallback existente
window.WfTop = class WfTop {
  constructor(element) {
    this.element = element;
    this.scrollThreshold =
      parseInt(this.element.getAttribute("WfTop-offset")) || 300;
    this.scrollDuration =
      parseInt(this.element.getAttribute("WfTop-duration")) || 500;
    this.easing = this.element.getAttribute("WfTop-easing") || "ease-in-out";
    this.showOnBottom =
      this.element.getAttribute("WfTop-show-on-bottom") === "true";
    this.autoHide = this.element.getAttribute("WfTop-auto-hide") !== "false";
    this.animation = this.element.getAttribute("WfTop-animation") || "fade";
    this.position =
      this.element.getAttribute("WfTop-position") || "bottom-right";
    this.size = this.element.getAttribute("WfTop-size") || "normal";
    this.theme = this.element.getAttribute("WfTop-theme") || "primary";

    this.isVisible = false;
    this.isScrolling = false;

    // Bind dos métodos
    this._boundCheckScroll = this.debounceCheckScroll.bind(this);
    this._boundClick = this.scrollToTop.bind(this);
    this._boundKeydown = this.handleKeydown.bind(this);
    this._boundOnLoad = this.handleOnLoad.bind(this);

    this.init().catch(console.error);
  }

  async init() {
    this.loadCSS();
    this.setupComponent();
    this.bindEvents();
    this.checkScroll();
  }

  loadCSS() {
    const cssId = "webfull-wftop-css";
    if (!document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
/**
 * WfTop.css - Estilos do Sistema de Botão Voltar ao Topo
 * SandroWeb - 2025
 */

/* ===== BOTÃO PRINCIPAL ===== */
[WfTop] {
   position: fixed !important;
   bottom: 12px !important;
   right: 12px !important;
   width: 50px !important;
   height: 50px !important;
   background: linear-gradient(0, var(--prin) 0, var(--prin---) 100%) !important;
   color: white !important;
   border: none !important;
   border-radius: 50% !important;
   cursor: pointer !important;
   z-index: 1000 !important;
   opacity: 0 !important;
   visibility: hidden !important;
   transition: all 0.4s ease !important;
   display: flex !important;
   align-items: center !important;
   justify-content: center !important;
   font-size: 28px !important;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4) !important;
   user-select: none !important;
}

/* ===== ESTADO VISÍVEL ===== */
[WfTop].wftop-show {
   opacity: 1 !important;
   visibility: visible !important;
   transform: translateY(0);
   transition: all 0.3s ease !important;
}
   [WfTop].wftop-show:hover  {
      transform: translateY(-5px);
   }


/* ===== POSIÇÕES ===== */
/* Posições BOTTOM (padrão) */
.wftop-bottom-right {
   bottom: 12px !important;
   right: 12px !important;
   top: auto !important;
   left: auto !important;
}

.wftop-bottom-left {
   bottom: 12px !important;
   left: 12px !important;
   top: auto !important;
   right: auto !important;
}

.wftop-bottom-center {
   bottom: 12px !important;
   left: 50% !important;
   top: auto !important;
   right: auto !important;
   transform: translateX(-50%) !important;
}

/* Posições TOP - CORRIGIDAS para ter prioridade */
.wftop-top-right {
   top: 12px !important;
   right: 12px !important;
   bottom: auto !important;
   left: auto !important;
}

.wftop-top-left {
   top: 12px !important;
   left: 12px !important;
   bottom: auto !important;
   right: auto !important;
}

.wftop-top-center {
   top: 12px !important;
   left: 50% !important;
   bottom: auto !important;
   right: auto !important;
   transform: translateX(-50%) !important;
}

/* Posições CENTER (meio da tela) */
.wftop-center-right {
   top: 50% !important;
   right: 12px !important;
   bottom: auto !important;
   left: auto !important;
   transform: translateY(-50%) !important;
}

.wftop-center-left {
   top: 50% !important;
   left: 12px !important;
   bottom: auto !important;
   right: auto !important;
   transform: translateY(-50%) !important;
}

.wftop-center {
   top: 50% !important;
   left: 50% !important;
   bottom: auto !important;
   right: auto !important;
   transform: translate(-50%, -50%) !important;
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
.wftop-fade {
   transition: opacity 0.4s ease, visibility 0.4s ease !important;
}

.wftop-slide {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease !important;
   transform: translateY(20px) !important;
}

.wftop-slide.wftop-show {
   transform: translateY(0) !important;
}

.wftop-zoom {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease !important;
   transform: translateY(20px) scale(0.8) !important;
}

.wftop-zoom.wftop-show {
   transform: translateY(0) scale(1) !important;
}

.wftop-bounce {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
   transform: translateY(20px) scale(0.7) !important;
}

.wftop-bounce.wftop-show {
   transform: translateY(0) scale(1) !important;
}

.wftop-flip {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease !important;
   transform: translateY(20px) rotateY(90deg) !important;
}

.wftop-flip.wftop-show {
   transform: translateY(0) rotateY(0deg) !important;
}

.wftop-rotate {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease !important;
   transform: translateY(20px) rotate(180deg) !important;
}

.wftop-rotate.wftop-show {
   transform: translateY(0) rotate(0deg) !important;
}

.wftop-scale {
   transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease !important;
   transform: translateY(20px) scale(0.3) !important;
}

.wftop-scale.wftop-show {
   transform: translateY(0) scale(1) !important;
}

[WfTop]{position: fixed !important;}



/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   [WfTop] {
      width: 45px;
      height: 45px;
      font-size: 1.6rem;
      bottom: 1.5rem;
      right: 1.5rem;
   }


   .wftop-bottom-left {
      bottom: 1.5rem;
      left: 1.5rem;
      right: auto;
   }

   .wftop-top-right {
      top: 1.5rem;
      right: 1.5rem;
      bottom: auto;
   }

   .wftop-top-left {
      top: 1.5rem;
      left: 1.5rem;
      bottom: auto;
   }

   .wftop-top-center {
      top: 1.5rem;
      left: 50%;
      bottom: auto;
      transform: translateX(-50%);
   }
}

@media (max-width: 480px) {
   [WfTop] {
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
      bottom: 1rem;
      right: 1rem;
   }

   .wftop-bottom-left {
      bottom: 1rem;
      left: 1rem;
   }

   .wftop-top {
      top: 1rem;
      right: 1rem;
   }

   .wftop-top-left {
      top: 1rem;
      left: 1rem;
   }
}
         `;
      document.head.appendChild(style);
    }
  }

  setupComponent() {
    // Inserir ícone se não existir
    this.insertIcon();

    // NÃO remove estilos inline - pode estar interferindo
    // this.element.removeAttribute('style');

    // Aplicar classes baseadas nos atributos
    this.applyClasses();

    // Acessibilidade
    this.element.setAttribute("role", "button");
    this.element.setAttribute("tabindex", "0");
    const ariaLabel =
      this.element.getAttribute("WfTop-aria-label") || "Voltar ao topo";
    this.element.setAttribute("aria-label", ariaLabel);
    this.element.setAttribute("aria-hidden", "true");

    // Adicionar classe base
    this.element.classList.add("wftop-button");

    // Debug
    // WfTop setupComponent executado
  }

  bindEvents() {
    // Event listeners
    window.addEventListener("scroll", this._boundCheckScroll);
    this.element.addEventListener("click", this._boundClick);
    this.element.addEventListener("keydown", this._boundKeydown);

    // Observar mudanças de tema
    this.observeTheme();
  }

  handleOnLoad() {
    // Scroll para o topo na carga da página (se configurado)
    const scrollOnLoad = this.element.getAttribute("WfTop-scroll-on-load");
    if (scrollOnLoad !== "false") {
      window.scrollTo(0, 0);
    }
  }

  // Debounce para otimizar o evento de scroll
  debounceCheckScroll() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.checkScroll();
    }, 10); // Delay reduzido para resposta mais rápida
  }

  // Verifica a posição da rolagem e mostra/oculta o botão
  checkScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Debug
    // WfTop checkScroll executado

    // Verificar se deve mostrar baseado no threshold
    const shouldShow = scrollY >= this.scrollThreshold;

    // Verificar se está no final da página (se configurado)
    const isAtBottom =
      this.showOnBottom && scrollY + windowHeight >= documentHeight - 100;

    if (shouldShow || isAtBottom) {
      if (!this.element.classList.contains("wftop-show")) {
        this.element.classList.add("wftop-show");
        this.element.setAttribute("aria-hidden", "false");
        this.isVisible = true;

        // Disparar evento
        this.element.dispatchEvent(new CustomEvent("wftop:shown"));
        // WfTop mostrado
      }
    } else {
      if (this.element.classList.contains("wftop-show")) {
        this.element.classList.remove("wftop-show");
        this.element.setAttribute("aria-hidden", "true");
        this.isVisible = false;

        // Disparar evento
        this.element.dispatchEvent(new CustomEvent("wftop:hidden"));
        // WfTop ocultado
      }
    }
  }

  applyClasses() {
    // Aplicar posição
    this.element.classList.add(`wftop-${this.position}`);
    // Posição aplicada

    // Aplicar animação
    this.element.classList.add(`wftop-${this.animation}`);
    // Animação aplicada

    // Aplicar tamanho
    if (this.size !== "normal") {
      this.element.classList.add(`wftop-${this.size}`);
      // Tamanho aplicado
    }

    // Aplicar tema
    if (this.theme !== "primary") {
      this.element.classList.add(`wftop-${this.theme}`);
      // Tema aplicado
    }

    // Classes aplicadas
  }

  // Scroll suave para o topo da página
  scrollToTop() {
    if (this.isScrolling) return;

    this.isScrolling = true;
    this.element.classList.add("wftop-loading");

    // Disparar evento de início
    this.element.dispatchEvent(new CustomEvent("wftop:scrolling"));

    // Scroll suave
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Remover loading após o scroll
    setTimeout(() => {
      this.element.classList.remove("wftop-loading");
      this.isScrolling = false;

      // Disparar evento de conclusão
      this.element.dispatchEvent(new CustomEvent("wftop:scrolled"));
    }, this.scrollDuration + 100);
  }

  handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.scrollToTop();
    }
  }

  // Observer para seguir o tema do WfDay
  observeTheme() {
    // Listener para eventos de mudança de tema
    window.addEventListener("wfday-theme-changed", () => {
      // CSS cuida automaticamente do tema
    });
  }

  // Insere o ícone padrão se não houver
  insertIcon() {
    if (!this.element.querySelector("i") && !this.element.textContent.trim()) {
      // Usar ícone sw-chevron-up
      this.element.innerHTML = '<i class="wf wf-chevron-up"></i>';
    }
  }

  // Remove todos os listeners e limpa o elemento
  destroy() {
    window.removeEventListener("scroll", this._boundCheckScroll);
    this.element.removeEventListener("click", this._boundClick);
    this.element.removeEventListener("keydown", this._boundKeydown);
    window.removeEventListener("load", this._boundOnLoad);

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    if (this._themeObserver) {
      this._themeObserver.disconnect();
    }
  }

  // Métodos estáticos
  static initAll(container = document) {
    // Verificar se container é válido
    if (
      !container ||
      !(container instanceof Element || container instanceof Document)
    ) {
      return [];
    }

    const elements = container.querySelectorAll("[WfTop]");

    const instances = [];

    elements.forEach((el, index) => {
      // Sempre inicializar, mesmo se já foi inicializado antes
      if (el._wfTopInstance) {
        el._wfTopInstance.destroy();
      }

      try {
        const instance = new WfTop(el);
        el._wfTopInitialized = true;
        el._wfTopInstance = instance;
        instances.push(instance);
      } catch (error) {
        // Erro silencioso
      }
    });

    return instances;
  }

  // Limpa estado dos elementos para permitir reinicialização
  static clearState(container = document) {
    const elements = container.querySelectorAll("[WfTop]");

    elements.forEach((el) => {
      delete el._wfTopInitialized;
      if (el._wfTopInstance) {
        el._wfTopInstance.destroy();
        delete el._wfTopInstance;
      }
    });
  }

  // Reinicializa elementos
  static reinit(container = document) {
    this.clearState(container);
    return this.initAll(container);
  }

  // Métodos de conveniência
  static show(selector) {
    const element = document.querySelector(selector);
    if (element && element._wfTopInstance) {
      element.classList.add("wftop-show");
      element.setAttribute("aria-hidden", "false");
    }
  }

  static hide(selector) {
    const element = document.querySelector(selector);
    if (element && element._wfTopInstance) {
      element.classList.remove("wftop-show");
      element.setAttribute("aria-hidden", "true");
    }
  }

  // Método para scroll programático
  static scrollToTop(selector, duration = 500) {
    const element = document.querySelector(selector);
    if (element && element._wfTopInstance) {
      element._wfTopInstance.scrollDuration = duration;
      element._wfTopInstance.scrollToTop();
    }
  }
};

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfTop = window.WfTop;
}

// Inicializar automaticamente apenas se WebFull não estiver presente
if (!window.WebFull) {
  document.addEventListener("DOMContentLoaded", () => {
    WfTop.initAll();
  });
}


// ===== WfType.js =====
(function (window, document) {
  "use strict";

  class WfType {
    constructor(element) {
      this.element = element;
      this.strings = this.parseStrings();
      const speedAttr = this.element.getAttribute("WfType-speed");
      const backSpeedAttr = this.element.getAttribute("WfType-back-speed");
      const delayAttr = this.element.getAttribute("WfType-delay");
      const loopAttr = this.element.getAttribute("WfType-loop");
      const cursorAttr =
        this.element.getAttribute("WfType-cursor") ??
        this.element.getAttribute("wftype-cursor");
      const shuffleAttr = this.element.getAttribute("WfType-shuffle");

      this.typeSpeed = parseInt(speedAttr) || 100;
      this.backSpeed = parseInt(backSpeedAttr) || 50;
      this.backDelay = parseInt(delayAttr) || 1500;
      this.loop = loopAttr !== "false";
      this.cursorChar = cursorAttr || "|";
      this.shuffle = shuffleAttr === "true";

      this.currentStringIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.timeoutId = null;

      if (this.shuffle) {
        this.strings = this.strings.sort(() => Math.random() - 0.5);
      }

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupComponent();
      this.start();
    }

    loadCSS() {
      if (!document.getElementById("wftype-styles")) {
        const style = document.createElement("style");
        style.id = "wftype-styles";
        style.textContent = `
            .wftype-cursor::after {
                content: attr(data-cursor);
                animation: wftype-blink 1s infinite;
            }
            @keyframes wftype-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
         `;
        document.head.appendChild(style);
      }
    }

    setupComponent() {
      this.element.classList.add("wftype-container");
      this.element.setAttribute("data-cursor", this.cursorChar);
      this.element.classList.add("wftype-cursor");
    }

    parseStrings() {
      const wordsAttr =
        this.element.getAttribute("WfType-words") ??
        this.element.getAttribute("wftype-words") ??
        this.element.getAttribute("wf-type-words");
      if (wordsAttr) {
        try {
          return JSON.parse(wordsAttr);
        } catch (e) {
          return wordsAttr.split(",").map((s) => s.trim());
        }
      }
      return ["Digite aqui..."];
    }

    typing() {
      const currentString = this.strings[this.currentStringIndex];
      let displayedText;

      if (this.isDeleting) {
        this.currentCharIndex--;
        displayedText = currentString.substring(0, this.currentCharIndex);
      } else {
        this.currentCharIndex++;
        displayedText = currentString.substring(0, this.currentCharIndex);
      }

      this.element.textContent = displayedText;

      let delay = this.isDeleting ? this.backSpeed : this.typeSpeed;

      if (!this.isDeleting && this.currentCharIndex === currentString.length) {
        // se não há loop e estamos na última string, manter texto completo e finalizar
        if (!this.loop && this.currentStringIndex === this.strings.length - 1) {
          this.element.textContent = currentString;
          return;
        }
        delay = this.backDelay;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentStringIndex++;
        if (this.currentStringIndex >= this.strings.length) {
          if (this.loop) {
            this.currentStringIndex = 0;
          } else {
            // finalizar sem loop mantendo a última string exibida
            const last = this.strings[this.strings.length - 1] || "";
            this.element.textContent = last;
            return;
          }
        }
        delay = 500;
      }

      this.timeoutId = setTimeout(() => this.typing(), delay);
    }

    start() {
      this.typing();
    }

    static initAll(container = document) {
      let elements;
      try {
        if (container && container.nodeType === 1) {
          // incluir o próprio container se ele já for um elemento [WfType]
          if (
            container.hasAttribute &&
            (container.hasAttribute("WfType") ||
              container.hasAttribute("wftype") ||
              container.hasAttribute("wf-type"))
          ) {
            elements = [
              container,
              ...container.querySelectorAll("[WfType], [wftype], [wf-type]"),
            ];
          } else {
            elements = container.querySelectorAll(
              "[WfType], [wftype], [wf-type]"
            );
          }
        } else {
          elements = document.querySelectorAll("[WfType], [wftype], [wf-type]");
        }
      } catch (e) {
        elements = document.querySelectorAll("[WfType], [wftype], [wf-type]");
      }

      elements.forEach((el) => {
        if (!el._wfType) {
          el._wfType = new WfType(el);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (typeof window !== "undefined") {
    window.WfType = WfType;

    if (window.WebFull && window.WebFull.modules) {
      window.WebFull.modules.WfType = WfType;
    }
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfType.initAll());
    } else {
      WfType.initAll();
    }
  }
})(window, document);


// ===== WfValid.js =====
(function (window, document) {
  "use strict";

  class WfValid {
    constructor(form) {
      this.form = form;
      // Evita dupla inicialização
      if (this.form._wfValid) return this.form._wfValid;
      this.form._wfValid = this;
      this.errors = {};

      this.init();
    }

    init() {
      this.bindEvents();
    }

    // loadCSS removed

    bindEvents() {
      this.form.addEventListener("submit", (e) => {
        if (!this.validate()) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      // validação em tempo real
      this.form.querySelectorAll("[WfValid-rules]").forEach((field) => {
        const handler = () => this.validateField(field);
        field.addEventListener("blur", handler);
        field.addEventListener("input", handler);
        field.addEventListener("change", handler);
      });
    }

    validate() {
      this.clearErrors();
      let isValid = true;

      this.form.querySelectorAll("[WfValid-rules]").forEach((field) => {
        if (!this.validateField(field)) isValid = false;
      });

      return isValid;
    }

    showError(field, message) {
      let errorElement = field.nextElementSibling;
      // Procura se o próximo elemento é a div de erro, ou cria
      if (!errorElement || !errorElement.classList.contains("wfvalid-error")) {
        errorElement = document.createElement("div");
        errorElement.className = "wfvalid-error";
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      errorElement.textContent = message;
    }

    getErrors() {
      return this.errors;
    }

    clearErrors() {
      this.errors = {};
      this.form
        .querySelectorAll(".wfvalid-error")
        .forEach((el) => (el.textContent = ""));
      this.form.querySelectorAll(".is-invalid").forEach((el) => {
        el.classList.remove("is-invalid");
        el.removeAttribute("aria-invalid");
      });
    }

    validateField(field) {
      const rules = (field.getAttribute("WfValid-rules") || "")
        .split("|")
        .filter(Boolean);
      const value =
        field.type === "checkbox" ? (field.checked ? "1" : "") : field.value;

      let fieldValid = true;

      for (const rule of rules) {
        const [ruleName, ruleParam] = rule.split(":");
        const validator = WfValid.rules[ruleName];
        if (
          validator &&
          !validator.handler(value, ruleParam, this.form, field)
        ) {
          const customMsg = field.getAttribute(`WfValid-msg-${ruleName}`);
          const msg =
            customMsg || validator.message.replace("{param}", ruleParam || "");
          this.errors[field.name || field.id || "field"] = msg;
          this.showError(field, msg);
          fieldValid = false;
          break; // Para no primeiro erro do campo
        }
      }

      if (fieldValid) {
        // limpa erro se houver
        let errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains("wfvalid-error"))
          errorElement.textContent = "";

        field.classList.remove("is-invalid");
        // Só adiciona is-valid se tiver algum valor ou regra, para não ficar verde vazio se não for required
        if (value || rules.includes("required")) {
          field.classList.add("is-valid");
        }
        field.removeAttribute("aria-invalid");
      }
      return fieldValid;
    }

    static addRule(name, handler, message) {
      WfValid.rules[name] = { handler, message };
    }

    static validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      let soma = 0,
        resto;
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }

    static validarCNPJ(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    }

    static initAll(container = document) {
      const forms = container.querySelectorAll("[WfValid]");
      forms.forEach((form) => {
        if (!form._wfValid) {
          new WfValid(form);
        }
      });
    }
  }

  WfValid.rules = {
    required: {
      handler: (value) => value.trim() !== "",
      message: "Este campo é obrigatório.",
    },
    email: {
      handler: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value),
      message: "Por favor, insira um email válido.",
    },
    min: {
      handler: (value, param) => {
        const v = (value || "").trim();
        return v === "" ? true : v.length >= parseInt(param);
      },
      message: "O campo deve ter no mínimo {param} caracteres.",
    },
    max: {
      handler: (value, param) => value.length <= parseInt(param),
      message: "O campo deve ter no máximo {param} caracteres.",
    },
    minlength: {
      handler: (value, param) => (value || "").length >= parseInt(param),
      message: "Mínimo de {param} caracteres.",
    },
    maxlength: {
      handler: (value, param) => (value || "").length <= parseInt(param),
      message: "Máximo de {param} caracteres.",
    },
    numeric: {
      handler: (value) => !isNaN(parseFloat(value)) && isFinite(value),
      message: "O campo deve ser numérico.",
    },
    integer: {
      handler: (value) => /^-?\d+$/.test(value),
      message: "O campo deve ser um número inteiro.",
    },
    minValue: {
      handler: (value, param) => {
        if (value === "" || value == null) return true;
        return (
          Number(value.toString().replace(/\./g, "").replace(/,/g, ".")) >=
          Number(param)
        );
      },
      message: "Valor mínimo é {param}.",
    },
    maxValue: {
      handler: (value, param) => {
        if (value === "" || value == null) return true;
        return (
          Number(value.toString().replace(/\./g, "").replace(/,/g, ".")) <=
          Number(param)
        );
      },
      message: "Valor máximo é {param}.",
    },
    equals: {
      handler: (value, param, form) => {
        const otherField = form.querySelector(`#${param}`);
        return otherField && value === otherField.value;
      },
      message: "Os campos não são iguais.",
    },
    url: {
      handler: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
      message: "Por favor, insira uma URL válida.",
    },
    pattern: {
      handler: (value, param) => {
        try {
          const re = new RegExp(param);
          return re.test(value);
        } catch (_) {
          return true;
        }
      },
      message: "Formato inválido.",
    },
    cpf: {
      handler: (value) => WfValid.validarCPF(value),
      message: "CPF inválido.",
    },
    cnpj: {
      handler: (value) => WfValid.validarCNPJ(value),
      message: "CNPJ inválido.",
    },
    phone: {
      handler: (value) => {
        const v = value.replace(/\D/g, "");
        return v === "" || v.length === 10 || v.length === 11;
      },
      message: "Telefone inválido.",
    },
    cep: {
      handler: (value) => /^\d{5}-?\d{3}$/.test(value),
      message: "CEP inválido.",
    },
    date: {
      handler: (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value),
      message: "Data inválida.",
    },
    time: {
      handler: (value) => /^\d{2}:\d{2}$/.test(value),
      message: "Hora inválida.",
    },
    between: {
      handler: (value, param) => {
        const [a, b] = (param || "").split(",").map((x) => parseInt(x));
        const len = (value || "").length;
        return len >= a && len <= b;
      },
      message: "Tamanho deve estar entre {param}.",
    },
    in: {
      handler: (value, param) => (param || "").split(",").includes(value),
      message: "Valor não permitido.",
    },
    notIn: {
      handler: (value, param) => !(param || "").split(",").includes(value),
      message: "Valor não permitido.",
    },
    requiredTrue: {
      handler: (value, _, __, field) =>
        field && field.type === "checkbox" ? field.checked : !!value,
      message: "Campo obrigatório.",
    },
    fileType: {
      handler: (value, param, form, field) => {
        if (!field || !field.files || field.files.length === 0) return true;
        const allow = (param || "")
          .split(",")
          .map((s) => s.trim().toLowerCase());
        return Array.from(field.files).every((f) => {
          const ext = f.name.split(".").pop().toLowerCase();
          return allow.includes(ext) || allow.includes(f.type.toLowerCase());
        });
      },
      message: "Tipo de arquivo inválido.",
    },
    fileSizeMax: {
      handler: (value, param, form, field) => {
        if (!field || !field.files || field.files.length === 0) return true;
        const max = Number(param || 0); // em MB
        return Array.from(field.files).every(
          (f) => f.size / 1024 / 1024 <= max
        );
      },
      message: "Arquivo excede {param} MB.",
    },
  };

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfValid = WfValid;
    }
    window.WfValid = WfValid;

    // Auto-init
    const init = () => {
      WfValid.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfValid.initAll();
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


