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
