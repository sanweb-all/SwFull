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
