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
