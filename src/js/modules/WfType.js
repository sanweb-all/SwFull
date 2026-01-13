(function (window, document) {
  "use strict";

  class WfType {
    constructor(element) {
      this.element = element;
      this.strings = this.parseStrings();
      const speedAttr = this.element.getAttribute("WfType-speed");
      const backSpeedAttr = this.element.getAttribute("WfType-back-speed");
      const delayAttr = this.element.getAttribute("WfType-delay");
      const loopAttr = this.element.getAttribute("WfType-loop");
      const cursorAttr =
        this.element.getAttribute("WfType-cursor") ??
        this.element.getAttribute("wftype-cursor");
      const shuffleAttr = this.element.getAttribute("WfType-shuffle");

      this.typeSpeed = parseInt(speedAttr) || 100;
      this.backSpeed = parseInt(backSpeedAttr) || 50;
      this.backDelay = parseInt(delayAttr) || 1500;
      this.loop = loopAttr !== "false";
      this.cursorChar = cursorAttr || "|";
      this.shuffle = shuffleAttr === "true";

      this.currentStringIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.timeoutId = null;

      if (this.shuffle) {
        this.strings = this.strings.sort(() => Math.random() - 0.5);
      }

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupComponent();
      this.start();
    }

    loadCSS() {
      if (!document.getElementById("wftype-styles")) {
        const style = document.createElement("style");
        style.id = "wftype-styles";
        style.textContent = `
            .wftype-cursor::after {
                content: attr(data-cursor);
                animation: wftype-blink 1s infinite;
            }
            @keyframes wftype-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
         `;
        document.head.appendChild(style);
      }
    }

    setupComponent() {
      this.element.classList.add("wftype-container");
      this.element.setAttribute("data-cursor", this.cursorChar);
      this.element.classList.add("wftype-cursor");
    }

    parseStrings() {
      const wordsAttr =
        this.element.getAttribute("WfType-words") ??
        this.element.getAttribute("wftype-words") ??
        this.element.getAttribute("wf-type-words");
      if (wordsAttr) {
        try {
          return JSON.parse(wordsAttr);
        } catch (e) {
          return wordsAttr.split(",").map((s) => s.trim());
        }
      }
      return ["Digite aqui..."];
    }

    typing() {
      const currentString = this.strings[this.currentStringIndex];
      let displayedText;

      if (this.isDeleting) {
        this.currentCharIndex--;
        displayedText = currentString.substring(0, this.currentCharIndex);
      } else {
        this.currentCharIndex++;
        displayedText = currentString.substring(0, this.currentCharIndex);
      }

      this.element.textContent = displayedText;

      let delay = this.isDeleting ? this.backSpeed : this.typeSpeed;

      if (!this.isDeleting && this.currentCharIndex === currentString.length) {
        // se não há loop e estamos na última string, manter texto completo e finalizar
        if (!this.loop && this.currentStringIndex === this.strings.length - 1) {
          this.element.textContent = currentString;
          return;
        }
        delay = this.backDelay;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentStringIndex++;
        if (this.currentStringIndex >= this.strings.length) {
          if (this.loop) {
            this.currentStringIndex = 0;
          } else {
            // finalizar sem loop mantendo a última string exibida
            const last = this.strings[this.strings.length - 1] || "";
            this.element.textContent = last;
            return;
          }
        }
        delay = 500;
      }

      this.timeoutId = setTimeout(() => this.typing(), delay);
    }

    start() {
      this.typing();
    }

    static initAll(container = document) {
      let elements;
      try {
        if (container && container.nodeType === 1) {
          // incluir o próprio container se ele já for um elemento [WfType]
          if (
            container.hasAttribute &&
            (container.hasAttribute("WfType") ||
              container.hasAttribute("wftype") ||
              container.hasAttribute("wf-type"))
          ) {
            elements = [
              container,
              ...container.querySelectorAll("[WfType], [wftype], [wf-type]"),
            ];
          } else {
            elements = container.querySelectorAll(
              "[WfType], [wftype], [wf-type]"
            );
          }
        } else {
          elements = document.querySelectorAll("[WfType], [wftype], [wf-type]");
        }
      } catch (e) {
        elements = document.querySelectorAll("[WfType], [wftype], [wf-type]");
      }

      elements.forEach((el) => {
        if (!el._wfType) {
          el._wfType = new WfType(el);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (typeof window !== "undefined") {
    window.WfType = WfType;

    if (window.WebFull && window.WebFull.modules) {
      window.WebFull.modules.WfType = WfType;
    }
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfType.initAll());
    } else {
      WfType.initAll();
    }
  }
})(window, document);
