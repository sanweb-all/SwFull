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
