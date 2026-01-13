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
        console.log(
          "🚀 Carregando mais itens inicialmente (container muito alto)..."
        );
        this.loadMore();
      }
    }, 100);

    console.log("✅ WfPagInfinite inicializado:", this.element);
  }

  setupContainer() {
    // Aplicar altura e overflow
    this.element.style.height = this.customHeight;
    this.element.style.overflowY = "auto";
    this.element.style.border = "1px solid #ddd";
    this.element.style.padding = "10px";

    console.log(`📏 Altura aplicada: ${this.customHeight}`);
  }

  setupItems() {
    // Pegar todos os itens filhos
    const selector = this.className ? `.${this.className}` : ":scope > *";
    this.items = Array.from(this.element.querySelectorAll(selector));

    if (this.items.length === 0) {
      this.items = Array.from(this.element.children);
    }

    console.log(`📋 Encontrados ${this.items.length} itens`);

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

    console.log(
      `👁️ Mostrando itens ${startIndex + 1} a ${Math.min(
        endIndex,
        this.items.length
      )}`
    );
  }

  bindScroll() {
    this.element.addEventListener("scroll", () => {
      if (this.loading) return;

      const { scrollTop, scrollHeight, clientHeight } = this.element;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      console.log(
        `📊 Scroll: ${Math.round(
          scrollPercentage * 100
        )}% - Top: ${scrollTop}, Height: ${scrollHeight}, Client: ${clientHeight}`
      );

      // Se chegou a 80% do scroll
      if (scrollPercentage >= 0.8) {
        console.log("🎯 Trigger de scroll atingido! Carregando mais...");
        this.loadMore();
      }
    });

    // Também verificar se precisa carregar mais ao redimensionar
    window.addEventListener("resize", () => {
      if (!this.loading) {
        const { scrollTop, scrollHeight, clientHeight } = this.element;
        if (scrollHeight <= clientHeight) {
          console.log("📏 Container muito pequeno, carregando mais itens...");
          this.loadMore();
        }
      }
    });
  }

  loadMore() {
    if (this.loading) return;

    const totalShown = this.currentPage * this.itemsPerPage;
    if (totalShown >= this.items.length) {
      console.log("🏁 Todos os itens já foram carregados");
      return;
    }

    this.loading = true;
    console.log(`⏳ Carregando mais itens... Página ${this.currentPage + 1}`);

    // Simular delay de carregamento
    setTimeout(() => {
      this.currentPage++;
      this.showItems();
      this.loading = false;
      console.log(
        `✅ Página ${this.currentPage} carregada - Total visível: ${
          this.currentPage * this.itemsPerPage
        }/${this.items.length}`
      );

      // Verificar se ainda precisa carregar mais (se o container ainda não tem scroll)
      setTimeout(() => {
        const { scrollHeight, clientHeight } = this.element;
        if (
          scrollHeight <= clientHeight &&
          this.currentPage * this.itemsPerPage < this.items.length
        ) {
          console.log(
            "🔄 Container ainda sem scroll, carregando mais automaticamente..."
          );
          this.loadMore();
        }
      }, 100);
    }, 200);
  }

  static initAll(container = document) {
    const elements = container.querySelectorAll("[WfPagInfinite]");

    elements.forEach((element, index) => {
      console.log(
        `🚀 Inicializando WfPagInfinite ${index + 1}/${elements.length}`
      );
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
