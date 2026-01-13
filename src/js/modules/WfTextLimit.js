(function (window, document) {
  "use strict";

  class WfTextLimit {
    constructor(element) {
      this.element = element;
      this.max =
        parseInt(this.element.getAttribute("WfTextLimit-max")) ||
        parseInt(this.element.getAttribute("maxlength")) ||
        150;
      this.textTemplate =
        this.element.getAttribute("WfTextLimit-text") || "{count}/{max}";

      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.render();
      this.bindEvents();
    }

    // loadCSS removed

    render() {
      this.counter = document.createElement("div");
      this.counter.className = "wftextlimit-counter";
      this.element.parentNode.insertBefore(
        this.counter,
        this.element.nextSibling
      );
      this.updateCounter();
    }

    bindEvents() {
      this.element.addEventListener("input", () => this.handleInput());
      this.element.addEventListener("change", () => this.updateCounter());
    }

    handleInput() {
      const value = this.element.value;
      if (value.length > this.max) {
        this.element.value = value.slice(0, this.max);
      }
      this.updateCounter();
    }

    updateCounter() {
      const count = this.element.value.length;
      const remaining = this.max - count;
      const text = this.textTemplate
        .replace("{count}", count)
        .replace("{max}", this.max)
        .replace("{remaining}", remaining);
      this.counter.textContent = text;

      if (count >= this.max) {
        this.counter.classList.add("limit-reached");
      } else {
        this.counter.classList.remove("limit-reached");
      }
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfTextLimit]");
      elements.forEach((element) => {
        if (!element._wfTextLimit) {
          element._wfTextLimit = new WfTextLimit(element);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfTextLimit = WfTextLimit;
  } else if (typeof window !== "undefined") {
    window.WfTextLimit = WfTextLimit;
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        WfTextLimit.initAll()
      );
    } else {
      WfTextLimit.initAll();
    }
  }
})(window, document);
