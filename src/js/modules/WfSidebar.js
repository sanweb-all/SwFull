(function(window, document) {
  'use strict';

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

      this.breakpoint = this.element.getAttribute("WfSidebar-breakpoint") || "790px";
      this.closeOnOutside = this.element.getAttribute("WfSidebar-close-on-outside") !== "false";
      this.closeOnClick = this.element.getAttribute("WfSidebar-close-on-click") !== "false";
      this.autoClose = this.element.getAttribute("WfSidebar-auto-close") !== "false";
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
                this.element.querySelectorAll(".submenu li.active").forEach((el) => el.classList.remove("active"));
                this.element.querySelectorAll(".menu-header.active").forEach((el) => el.classList.remove("active"));

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

      // Garantir que a classe lateral exista antes da animação
      this.element.classList.add(`sidebar-${this.side}`);

      // Definir transform inicial inline (fora da tela) para garantir ponto de partida
      const startTransform =
        this.side === "right" ? "translateX(100%)" : "translateX(-100%)";
      this.element.style.transform = startTransform;

      // Forçar reflow e, na próxima frame, adicionar a classe que aciona a transição
      requestAnimationFrame(() => {
        // força repaint
        void this.element.offsetWidth;
        this.element.classList.add("open");
      });

      if (this.overlay) {
        this.overlay.classList.add("active");
      }

      if (this.toggleBtn) {
        this.toggleBtn.setAttribute("aria-label", `Fechar sidebar ${this.side}`);
        this.toggleBtn.innerHTML = "✕";
      }

      // Prevenir scroll do body no mobile
      if (window.innerWidth <= this.getBreakpointValue()) {
        document.body.style.overflow = "hidden";
      }

      // Disparar evento quando a transição de transform terminar e limpar estilo inline
      const onOpened = (e) => {
        if (e.propertyName === "transform") {
          // remover transform inline para devolver controle ao CSS
          this.element.style.transform = "";
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
          this.element.classList.remove(`sidebar-${this.side}`);
          // garantir que não fique transform inline residuado
          this.element.style.transform = "";
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
    if (typeof window.WebFull !== 'undefined') {
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

