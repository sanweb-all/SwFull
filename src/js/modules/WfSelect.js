(function (window, document) {
  "use strict";

  class WfSelect {
    constructor(element) {
      this.element = element;

      // Evita dupla inicialização
      if (this.element._wfSelect) return this.element._wfSelect;
      this.element._wfSelect = this;

      this.search = this.element.getAttribute("WfSelect-search") === "true";
      this.placeholder = this.element.getAttribute("WfSelect-placeholder");
      this.searchPlaceholder =
        this.element.getAttribute("WfSelect-search-placeholder") || "Buscar...";
      this.noResultsText =
        this.element.getAttribute("WfSelect-no-results-text") ||
        "Nenhum resultado encontrado";

      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.render();
      this.bindEvents();
    }

    // loadCSS removed

    render() {
      this.element.style.display = "none";

      const container = document.createElement("div");
      container.className = "wfselect-wrapper";
      this.element.classList.forEach((cls) => container.classList.add(cls));

      const selected = document.createElement("div");
      selected.className = "wfselect-display";
      this.element.classList.forEach((cls) => selected.classList.add(cls));
      selected.textContent =
        this.placeholder ||
        this.element.options[this.element.selectedIndex].textContent;

      const optionsContainer = document.createElement("div");
      optionsContainer.className = "wfselect-dropdown";
      // display controlled by CSS (.wfselect-wrapper.open)

      if (this.element.disabled) {
        selected.setAttribute("aria-disabled", "true");
        // styles handled by CSS
      }

      if (this.search) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "wfselect-search";
        searchInput.placeholder = this.searchPlaceholder;
        optionsContainer.appendChild(searchInput);
      }

      for (const option of this.element.options) {
        const optionEl = document.createElement("div");
        optionEl.className = "wfselect-option";
        optionEl.textContent = option.textContent;
        optionEl.dataset.value = option.value;
        optionsContainer.appendChild(optionEl);
      }

      container.appendChild(selected);
      container.appendChild(optionsContainer);

      this.element.parentNode.insertBefore(container, this.element.nextSibling);

      this.customSelect = container;
      this.selectedEl = selected;
      this.optionsContainer = optionsContainer;
    }

    bindEvents() {
      this.selectedEl.addEventListener("click", () => {
        this.customSelect.classList.toggle("open");
      });

      this.optionsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("wfselect-option")) {
          this.selectedEl.textContent = e.target.textContent;
          this.element.value = e.target.dataset.value;
          this.customSelect.classList.remove("open");
          this.element.dispatchEvent(new Event("change"));
        }
      });

      if (this.search) {
        const searchInput =
          this.optionsContainer.querySelector(".wfselect-search");
        searchInput.addEventListener("input", (e) => {
          const filter = e.target.value.toLowerCase();
          const options =
            this.optionsContainer.querySelectorAll(".wfselect-option");
          let hasResults = false;
          options.forEach((option) => {
            if (option.classList.contains("wfselect-no-results")) return;
            const text = option.textContent.toLowerCase();
            if (text.includes(filter)) {
              option.style.display = "block";
              hasResults = true;
            } else {
              option.style.display = "none";
            }
          });

          const noResultsEl = this.optionsContainer.querySelector(
            ".wfselect-no-results"
          );
          if (!hasResults && !noResultsEl) {
            const noResults = document.createElement("div");
            noResults.className = "wfselect-no-results";
            noResults.textContent = this.noResultsText;
            this.optionsContainer.appendChild(noResults);
          } else if (hasResults && noResultsEl) {
            noResultsEl.remove();
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!this.customSelect.contains(e.target)) {
          this.customSelect.classList.remove("open");
        }
      });
    }

    static initAll(container = document) {
      // Selecionar descendentes
      let elements = Array.from(container.querySelectorAll("[WfSelect]"));
      // Incluir o próprio container se ele tiver o atributo (compatível com WebfullLoader)
      try {
        const includeSelf =
          container !== document &&
          container.hasAttribute &&
          container.hasAttribute("WfSelect");
        if (includeSelf) {
          // evitar duplicatas caso já esteja presente na lista
          if (!elements.includes(container)) elements.unshift(container);
        }
      } catch (_) {}
      const instances = [];
      elements.forEach((element) => {
        if (!element._wfSelect) {
          element._wfSelect = new WfSelect(element);
        }
        instances.push(element._wfSelect);
      });
      return instances;
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfSelect = WfSelect;
    }
    window.WfSelect = WfSelect;

    // Auto-init
    const init = () => {
      WfSelect.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfSelect.initAll();
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
      init();
    }
  }
})(window, document);
