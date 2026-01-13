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
