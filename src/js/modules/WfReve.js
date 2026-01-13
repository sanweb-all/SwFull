(function (window, document) {
  "use strict";

  class WfReve {
    // Construtor recebe o elemento, o limite de rolagem e o tipo de animação
    constructor(element, scrollThreshold = 600, animation = "fade") {
      if (typeof element === "string") {
        this.element = document.getElementById(element);
      } else {
        this.element = element;
      }
      this.scrollThreshold = scrollThreshold;
      this.animation = animation;
      if (!this.element) {
        console.warn(`Elemento não encontrado.`);
        return;
      }
      this.init();
    }

    // Inicializa o elemento com estilos iniciais e adiciona listeners de scroll e load
    init() {
      this.element.style.opacity = "0";
      this.element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      this.element.style.pointerEvents = "none";
      this.element.style.display = "none";

      // Define a transformação inicial com base no tipo de animação
      switch (this.animation) {
        case "left":
          this.element.style.transform = "translateX(-100px)";
          break;
        case "right":
          this.element.style.transform = "translateX(100px)";
          break;
        case "top":
          this.element.style.transform = "translateY(-100px)";
          break;
        case "bottom":
          this.element.style.transform = "translateY(100px)";
          break;
        default:
          this.element.style.transform = "none";
      }

      // Adiciona listeners para eventos de scroll e load da página
      window.addEventListener("scroll", () => this.checkScroll());
      window.addEventListener("load", () => this.checkScroll());

      // Verifica a posição da rolagem inicialmente
      this.checkScroll();
    }

    // Verifica a posição da rolagem e aplica as animações de mostrar/ocultar
    checkScroll() {
      if (window.scrollY >= this.scrollThreshold) {
        if (this.element.style.display === "none") {
          this.element.style.display = "inline-block";
          setTimeout(() => {
            this.element.style.opacity = "1";
            this.element.style.pointerEvents = "auto";
            this.element.style.transform = "translateX(0) translateY(0)";
          }, 10);
        }
      } else {
        if (this.element.style.display !== "none") {
          this.element.style.opacity = "0";
          this.element.style.pointerEvents = "none";
          switch (this.animation) {
            case "left":
              this.element.style.transform = "translateX(-100px)";
              break;
            case "right":
              this.element.style.transform = "translateX(100px)";
              break;
            case "top":
              this.element.style.transform = "translateY(-100px)";
              break;
            case "bottom":
              this.element.style.transform = "translateY(100px)";
              break;
            default:
              this.element.style.transform = "none";
          }
          setTimeout(() => {
            this.element.style.display = "none";
          }, 500); // duração da transição CSS
        }
      }
    }

    // Inicializa todos os elementos com o atributo WfReve na página
    static initAll() {
      const elements = document.querySelectorAll(
        "[WfReve],[WfReve-threshold],[WfReve-animation],[swreve-threshold],[swreve-animation]"
      );
      elements.forEach((el) => {
        const attr = el.getAttribute("WfReve") || el.getAttribute("wfreve");
        let threshold = 600;
        let animation = "fade";
        const thAttr =
          el.getAttribute("WfReve-threshold") ||
          el.getAttribute("wfreve-threshold");
        const animAttr =
          el.getAttribute("WfReve-animation") ||
          el.getAttribute("wfreve-animation");
        if (attr) {
          const parts = attr.split(",");
          if (parts.length > 0) {
            const match = parts[0].match(/\d+/);
            if (match) {
              threshold = parseInt(match[0], 10);
            }
          }
          if (parts.length > 1) {
            animation = parts[1].trim();
          }
        }
        if (thAttr) {
          const m = thAttr.match(/\d+/);
          if (m) threshold = parseInt(m[0], 10);
        }
        if (animAttr) {
          animation = animAttr.trim();
        }
        new WfReve(el, threshold, animation);
      });
    }
  }

  // Exportação Global
  if (typeof window !== 'undefined') {
     window.WfReve = WfReve;
     if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfReve = WfReve;
     }
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfReve.initAll());
    } else {
      WfReve.initAll();
    }
  }
})(window, document);
