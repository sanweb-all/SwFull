(function (window, document) {
  "use strict";

  class WfPag {
    constructor(element) {
      this.element = element;
      this.itemsPerPage =
        parseInt(this.element.getAttribute("WfPag-items-per-page")) || 10;
      this.maxVisible =
        parseInt(this.element.getAttribute("WfPag-max-visible")) || 5;
      this.showFirstLast =
        this.element.getAttribute("WfPag-show-first-last") !== "false";
      this.showPrevNext =
        this.element.getAttribute("WfPag-show-prev-next") !== "false";

      this.currentPage = 1;
      this.items = [];
      this.totalPages = 0;

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupComponent();
      this.createPagination();
      this.showPage(1);
    }

    loadCSS() {
      if (!document.getElementById("wfpag-styles")) {
        const style = document.createElement("style");
        style.id = "wfpag-styles";
        style.textContent = `
.wfpag-pagination {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;
   margin: 1.5rem 0 1rem 0;
   flex-wrap: wrap;
   list-style: none;
   padding: 0;
   clear: both;
}
.wfpag-button {
   background: var(--container, #fff);
   border: 1px solid var(--border-color, #d0d0d0);
   color: var(--color, #333);
   font-size: 1.4rem;
   min-width: 2.4rem;
   min-height: 2.4rem;
   border-radius: 0;
   cursor: pointer;
   transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
   outline: none;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   text-decoration: none;
   font-family: inherit;
}
.wfpag-button:hover:not(:disabled) {
   background: var(--navbar-hover, #f0f4ff);
   color: var(--navbar-link, #1a237e);
   border-color: var(--border-color, #90caf9);
   transform: translateY(-1px);
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.wfpag-button.active {
   background: var(--navbar-bg, #1976d2);
   color: var(--navbar-color, #fff);
   border-color: var(--navbar-bg, #1976d2);
   font-weight: bold;
   box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
   z-index: 1;
}
.wfpag-button:disabled {
   opacity: 0.5;
   cursor: not-allowed;
}
         `;
        document.head.appendChild(style);
      }
    }

    setupComponent() {
      this.items = Array.from(this.element.children);
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      this.element.classList.add("wfpag-container");
    }

    createPagination() {
      this.pagination = document.createElement("div");
      this.pagination.className = "wfpag-pagination";
      this.element.parentNode.insertBefore(
        this.pagination,
        this.element.nextSibling
      );
      this.renderPagination();
    }

    renderPagination() {
      this.pagination.innerHTML = "";

      if (this.showFirstLast) {
        const firstBtn = this.createButton("«", 1, this.currentPage === 1);
        this.pagination.appendChild(firstBtn);
      }

      if (this.showPrevNext) {
        const prevBtn = this.createButton(
          "‹",
          this.currentPage - 1,
          this.currentPage === 1
        );
        this.pagination.appendChild(prevBtn);
      }

      this.renderPageButtons();

      if (this.showPrevNext) {
        const nextBtn = this.createButton(
          "›",
          this.currentPage + 1,
          this.currentPage === this.totalPages
        );
        this.pagination.appendChild(nextBtn);
      }

      if (this.showFirstLast) {
        const lastBtn = this.createButton(
          "»",
          this.totalPages,
          this.currentPage === this.totalPages
        );
        this.pagination.appendChild(lastBtn);
      }
    }

    renderPageButtons() {
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(this.maxVisible / 2)
      );
      let endPage = Math.min(this.totalPages, startPage + this.maxVisible - 1);

      if (endPage - startPage + 1 < this.maxVisible) {
        startPage = Math.max(1, endPage - this.maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = this.createButton(i, i, i === this.currentPage);
        if (i === this.currentPage) {
          pageBtn.classList.add("active");
        }
        this.pagination.appendChild(pageBtn);
      }
    }

    createButton(text, page, disabled = false) {
      const button = document.createElement("button");
      button.className = "wfpag-button";
      button.innerHTML = text;
      button.disabled = disabled;
      button.addEventListener("click", () => this.goToPage(page));
      return button;
    }

    showPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;

      const start = (page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      this.items.forEach((item, index) => {
        item.style.display = index >= start && index < end ? "" : "none";
      });

      this.renderPagination();

      this.element.dispatchEvent(
        new CustomEvent("wfpag:page-changed", {
          detail: {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
          },
        })
      );
    }

    goToPage(page) {
      this.showPage(page);
    }

    refresh() {
      this.setupComponent();
      this.createPagination();
      this.showPage(1);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfPag]");
      elements.forEach((el) => {
        if (!el._wfPag) {
          el._wfPag = new WfPag(el);
        }
      });
    }
  }

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfPag = WfPag;
  } else if (typeof window !== "undefined") {
    window.WfPag = WfPag;
  }

  // Auto-inicialização e Observer
  if (typeof window !== "undefined") {
    const init = () => {
      WfPag.initAll();

      // Observer para elementos adicionados dinamicamente
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (
                node.hasAttribute &&
                node.hasAttribute("WfPag") &&
                !node._wfPag
              ) {
                node._wfPag = new WfPag(node);
              }
              if (node.querySelectorAll) {
                const elements = node.querySelectorAll("[WfPag]");
                elements.forEach((el) => {
                  if (!el._wfPag) el._wfPag = new WfPag(el);
                });
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(window, document);
