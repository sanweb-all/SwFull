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
