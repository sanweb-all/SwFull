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
