(function(window, document) {
'use strict';

class WfPagInfinite {
  constructor(element) {
    this.element = element;
    this.itemsPerPage =
      parseInt(element.getAttribute("WfPagInfinite-items")) || 6;
    this.customHeight = element.getAttribute("WfPagInfinite-height") || "600px";
    this.className = element.getAttribute("WfPagInfinite-class") || null;

    this.currentPage = 1;
    this.loading = false;

    this.init();
  }

  init() {
    this.setupContainer();
    this.setupItems();
    this.bindScroll();

    // Verificar se precisa carregar mais itens inicialmente
    setTimeout(() => {
      const { scrollHeight, clientHeight } = this.element;
      if (
        scrollHeight <= clientHeight &&
        this.currentPage * this.itemsPerPage < this.items.length
      ) {
        this.loadMore();
      }
    }, 100);
  }

  setupContainer() {
    // Aplicar altura e overflow
    this.element.style.height = this.customHeight;
    this.element.style.overflowY = "auto";
    this.element.style.border = "1px solid #ddd";
    this.element.style.padding = "10px";
  }

  setupItems() {
    // Pegar todos os itens filhos
    const selector = this.className ? `.${this.className}` : ":scope > *";
    this.items = Array.from(this.element.querySelectorAll(selector));

    if (this.items.length === 0) {
      this.items = Array.from(this.element.children);
    }

    // Esconder todos os itens inicialmente
    this.items.forEach((item) => (item.style.display = "none"));

    // Mostrar os primeiros itens
    this.showItems();
  }

  showItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    for (let i = startIndex; i < endIndex && i < this.items.length; i++) {
      this.items[i].style.display = "block";
    }
  }

  bindScroll() {
    this.element.addEventListener("scroll", () => {
      if (this.loading) return;

      const { scrollTop, scrollHeight, clientHeight } = this.element;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // Se chegou a 80% do scroll
      if (scrollPercentage >= 0.8) {
        this.loadMore();
      }
    });

    // Também verificar se precisa carregar mais ao redimensionar
    window.addEventListener("resize", () => {
      if (!this.loading) {
        const { scrollTop, scrollHeight, clientHeight } = this.element;
        if (scrollHeight <= clientHeight) {
          this.loadMore();
        }
      }
    });
  }

  loadMore() {
    if (this.loading) return;

    const totalShown = this.currentPage * this.itemsPerPage;
    if (totalShown >= this.items.length) {
      return;
    }

    this.loading = true;

    // Simular delay de carregamento
    setTimeout(() => {
      this.currentPage++;
      this.showItems();
      this.loading = false;

      // Verificar se ainda precisa carregar mais (se o container ainda não tem scroll)
      setTimeout(() => {
        const { scrollHeight, clientHeight } = this.element;
        if (
          scrollHeight <= clientHeight &&
          this.currentPage * this.itemsPerPage < this.items.length
        ) {
          this.loadMore();
        }
      }, 100);
    }, 200);
  }

  static initAll(container = document) {
    const elements = container.querySelectorAll("[WfPagInfinite]");

    elements.forEach((element, index) => {
      if (!element._wfPagInfinite) {
          element._wfPagInfinite = new WfPagInfinite(element);
      }
    });
  }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfPagInfinite = WfPagInfinite;
   window.SwPaginfinite = WfPagInfinite; // Alias para compatibilidade
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfPagInfinite = WfPagInfinite;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WfPagInfinite.initAll());
  } else {
    WfPagInfinite.initAll();
  }
}

})(window, document);
