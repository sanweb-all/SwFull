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
