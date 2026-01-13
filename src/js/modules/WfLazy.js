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
