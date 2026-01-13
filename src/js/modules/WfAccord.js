(function (window, document) {
  "use strict";

  /**
   * WfAccord - Sistema de Acordeão
   *
   * @author SandroWeb
   * @version 3.0
   * @since WEBFULL Framework v1.0
   */

  class WfAccord {
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfAccord) return element._wfAccord;

      this.element = element;
      this.element._wfAccord = this;

      const getAttrVar = (el, attr) => {
        if (!el || !attr) return null;
        try {
          const parts = attr.split("-"); // e.g., ['WfAccord','multiple']
          const base = parts[0];
          const rest = parts.slice(1).join("-");
          const kebab =
            base
              .replace(/([A-Z])/g, "-$1")
              .replace(/^-/, "")
              .toLowerCase() + (rest ? "-" + rest : ""); // sw-accord-*
          const compact = base.toLowerCase() + (rest ? "-" + rest : ""); // swaccord-*
          return (
            el.getAttribute(attr) ??
            el.getAttribute(compact) ??
            el.getAttribute(kebab)
          );
        } catch (_) {
          return el.getAttribute(attr);
        }
      };

      const attrMultiple = getAttrVar(this.element, "WfAccord-multiple");
      const attrActive = getAttrVar(this.element, "WfAccord-active");
      const attrEffect = getAttrVar(this.element, "WfAccord-effect");
      const attrAutoHeight = getAttrVar(this.element, "WfAccord-auto-height");

      this.multiple = attrMultiple === "true";
      this.active = attrActive || "0";
      this.effect = attrEffect || "slide";
      this.autoHeight = attrAutoHeight !== "false";

      this.items = [];
      this.activeItems = new Set();

      this.init();
    }

    init() {
      this.loadCSS();
      this.setupItems();
      this.bindEvents();
      this.activateInitial();
    }

    loadCSS() {
      const cssId = "webfull-wfaccord-css";
      if (!document.getElementById(cssId)) {
        const style = document.createElement("style");
        style.id = cssId;
        style.textContent = `
/**
 * WfAccord.css - Estilos do Sistema de Acordeão
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
[WfAccord], [wfaccord], [wf-accord] {
    width: 100%;
    margin: 2rem auto;
    border: 2px solid var(--wf-border);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: var(--wf-bg);
    display: block;
    overflow: hidden;
}

/* ===== ITENS DO ACORDEÃO ===== */
[WfAccordItem], [wfaccorditem], [wf-accord-item] {
    border: none;
    background: none;
    position: relative;
}

:is([WfAccordItem],[wfaccorditem],[wf-accord-item]) + :is([WfAccordItem],[wfaccorditem],[wf-accord-item]) {
    border-top: 1px solid var(--wf-border);
}

/* ===== CABEÇALHOS ===== */
.wfaccord-header {
    background: transparent;
    padding: 1rem 1.2rem;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--wf-color);
    border: none;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    position: relative;
}

.wfaccord-header:hover,
.wfaccord-header:focus {
    background-color: var(--wf-bg);
}

/* ===== ÍCONES ===== */
.wfaccord-icon {
    font-size: 2rem;
    transition: transform 0.3s ease;
    color: var(--wf-color-);
    margin-left: 1rem;
}

.wfaccord-header.active .wfaccord-icon {
    transform: rotate(180deg);
    color: var(--prin);
}

/* ===== CONTEÚDO ===== */
.wfaccord-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.6s ease, padding 0.3s ease;
    padding: 0 1.2rem;
    background-color: var(--wf-bg-);
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--wf-color);
}

.wfaccord-content.active {
    max-height: 1000px;
    padding: 1.2rem;
}

.wfaccord-content p {
    margin: 1.2rem 0;
}

.wfaccord-content p:first-child {
    margin-top: 0;
}

.wfaccord-content p:last-child {
    margin-bottom: 0;
}

/* ===== EFEITOS DE ANIMAÇÃO ===== */
/* Slide */
.wfaccord-content[data-effect="slide"] {
    transition: max-height 0.6s ease, padding 0.3s ease;
}

/* Fade */
.wfaccord-content[data-effect="fade"] {
    transition: max-height 0.6s ease, padding 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.wfaccord-content[data-effect="fade"].active {
    opacity: 1;
}

/* Zoom */
.wfaccord-content[data-effect="zoom"] {
    transition: max-height 0.6s ease, padding 0.3s ease, transform 0.3s ease;
    transform: scale(0.95);
}

.wfaccord-content[data-effect="zoom"].active {
    transform: scale(1);
}

/* Bounce */
.wfaccord-content[data-effect="bounce"] {
    transition: max-height 0.6s ease, padding 0.3s ease, transform 0.4s ease;
    transform: scale(0.9);
}

.wfaccord-content[data-effect="bounce"].active {
    transform: scale(1);
}

/* ===== TEMAS ===== */
.wfaccord-primary .wfaccord-header.active {
    background: var(--prin);
    color: white;
}

.wfaccord-success .wfaccord-header.active {
    background: var(--suce);
    color: white;
}

.wfaccord-warning .wfaccord-header.active {
    background: var(--aler);
    color: var(--wf-color);
}

.wfaccord-danger .wfaccord-header.active {
    background: var(--peri);
    color: white;
}

.wfaccord-info .wfaccord-header.active {
    background: var(--info);
    color: white;
}

.wfaccord-dark .wfaccord-header.active {
    background: var(--notu);
    color: white;
}

/* ===== TAMANHOS ===== */
.wfaccord-small .wfaccord-header {
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
}

.wfaccord-small .wfaccord-content {
    padding: 0 1rem;
    font-size: 1.2rem;
}

.wfaccord-small .wfaccord-content.active {
    padding: 1rem;
}

.wfaccord-large .wfaccord-header {
    padding: 1.5rem 1.5rem;
    font-size: 1.6rem;
}

.wfaccord-large .wfaccord-content {
    padding: 0 1.5rem;
    font-size: 1.6rem;
}

.wfaccord-large .wfaccord-content.active {
    padding: 1.5rem;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    [WfAccord] {
        margin: 1rem auto;
        border-radius: 6px;
    }

    .wfaccord-header {
        padding: 0.8rem 1rem;
        font-size: 1.3rem;
    }

    .wfaccord-content {
        padding: 0 1rem;
        font-size: 1.3rem;
    }

    .wfaccord-content.active {
        padding: 1rem;
    }

    .wfaccord-icon {
        font-size: 1.1rem;
    }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfaccord-content,
    .wfaccord-header,
    .wfaccord-icon {
        transition: none;
    }
}


/* ===== ESTADOS DE CARREGAMENTO ===== */
.wfaccord-loading {
    position: relative;
    min-height: 100px;
}

.wfaccord-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid var(--wf-bg);
    border-top: 3px solid var(--prin);
    border-radius: 50%;
    animation: wfaccord-spin 1s linear infinite;
}

@keyframes wfaccord-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night [WfAccord] {
    background: var(--notu);
    border-color: var(--notu_);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

html.wfday-night [SwAccordItem] + [SwAccordItem] {
    border-top-color: var(--notu_);
}

html.wfday-night .wfaccord-header {
    color: var(--wf-color);
    background: transparent;
}

html.wfday-night .wfaccord-header:hover,
html.wfday-night .wfaccord-header:focus {
    background-color: var(--notu_);
}

html.wfday-night .wfaccord-content {
    background-color: #1a1a1a;
    color: #ddd;
}

html.wfday-night .wfaccord-icon {
    color: #aaa;
}

html.wfday-night .wfaccord-header.active .wfaccord-icon {
    color: #4a90e2;
}
         `;
        document.head.appendChild(style);
      }
    }

    setupItems() {
      const isDev =
        typeof window !== "undefined" &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1");

      let accordionItems = this.element.querySelectorAll(
        "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
      );

      // Fallback: quando os wrappers de item não existem, derivar itens a partir de headers/contents
      if (accordionItems.length === 0) {
        const headers = Array.from(
          this.element.querySelectorAll(
            "[WfAccordHeader], [wfaccordheader], [wf-accord-header], .wfaccord-header"
          )
        );

        const findNextContent = (hdr) => {
          let el = hdr.nextElementSibling;
          while (el) {
            if (
              el.matches(
                "[WfAccordContent], [wfaccordcontent], [wf-accord-content], .wfaccord-content"
              )
            )
              return el;
            el = el.nextElementSibling;
          }
          return null;
        };

        headers.forEach((header, index) => {
          const content =
            findNextContent(header) ||
            (header.parentElement
              ? header.parentElement.querySelector(
                  "[WfAccordContent], [wfaccordcontent], [wf-accord-content], .wfaccord-content"
                )
              : null);

          if (!header || !content) {
            console.warn("WfAccord: Item sem header ou content:", header);
            return;
          }

          // Adicionar classes se não existirem
          if (!header.classList.contains("wfaccord-header")) {
            header.classList.add("wfaccord-header");
          }
          if (!content.classList.contains("wfaccord-content")) {
            content.classList.add("wfaccord-content");
          }

          // Adicionar ícone se não existir
          if (!header.querySelector(".wfaccord-icon")) {
            const icon = document.createElement("i");
            icon.className = "wfaccord-icon wf wf-chevron-down Tprin f20";
            header.appendChild(icon);
          }

          // Configurar atributos de acessibilidade
          header.setAttribute("role", "button");
          header.setAttribute("tabindex", "0");
          header.setAttribute("aria-expanded", "false");
          header.setAttribute("aria-controls", `wfaccord-content-${index}`);
          if (!header.id) header.id = `wfaccord-header-${index}`;

          content.setAttribute("role", "region");
          content.setAttribute("aria-labelledby", `wfaccord-header-${index}`);
          content.id = `wfaccord-content-${index}`;
          content.setAttribute("data-effect", this.effect);

          // Armazenar referências
          const accordionItem = {
            element:
              header.closest(
                "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
              ) || header.parentElement,
            header: header,
            content: content,
            index: index,
          };

          this.items.push(accordionItem);
        });

        return; // itens inicializados via fallback
      }

      accordionItems.forEach((item, index) => {
        const header =
          item.querySelector(
            "[WfAccordHeader], [wfaccordheader], [wf-accord-header]"
          ) || item.querySelector(".wfaccord-header");
        const content =
          item.querySelector(
            "[WfAccordContent], [wfaccordcontent], [wf-accord-content]"
          ) || item.querySelector(".wfaccord-content");

        if (!header || !content) {
          console.warn("WfAccord: Item sem header ou content:", item);
          return;
        }

        // Adicionar classes se não existirem
        if (!header.classList.contains("wfaccord-header")) {
          header.classList.add("wfaccord-header");
        }

        if (!content.classList.contains("wfaccord-content")) {
          content.classList.add("wfaccord-content");
        }

        // Adicionar ícone se não existir
        if (!header.querySelector(".wfaccord-icon")) {
          const icon = document.createElement("i");
          icon.className = "wfaccord-icon wf wf-chevron-down Tprin f20";
          header.appendChild(icon);
        }

        // Configurar atributos de acessibilidade
        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0");
        header.setAttribute("aria-expanded", "false");
        header.setAttribute("aria-controls", `wfaccord-content-${index}`);
        if (!header.id) header.id = `wfaccord-header-${index}`;

        content.setAttribute("role", "region");
        content.setAttribute("aria-labelledby", `wfaccord-header-${index}`);
        content.id = `wfaccord-content-${index}`;
        content.setAttribute("data-effect", this.effect);

        // Armazenar referências
        const accordionItem = {
          element: item,
          header: header,
          content: content,
          index: index,
        };

        this.items.push(accordionItem);
      });
    }

    bindEvents() {
      this.items.forEach((item) => {
        // Click event
        item.header.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleItem(item);
        });

        // Keyboard events
        item.header.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggleItem(item);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            this.focusNextItem(item);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            this.focusPreviousItem(item);
          } else if (e.key === "Home") {
            e.preventDefault();
            this.focusFirstItem();
          } else if (e.key === "End") {
            e.preventDefault();
            this.focusLastItem();
          }
        });
      });
    }

    toggleItem(item) {
      const isActive = item.header.classList.contains("active");

      if (isActive) {
        this.closeItem(item);
      } else {
        this.openItem(item);
      }
    }

    openItem(item) {
      // Se não permite múltiplos, fechar todos os outros
      if (!this.multiple) {
        this.closeAllItems();
      }

      // Ativar item
      item.header.classList.add("active");
      item.content.classList.add("active");
      item.header.setAttribute("aria-expanded", "true");

      this.activeItems.add(item.index);

      // Disparar evento
      this.element.dispatchEvent(
        new CustomEvent("wfaccord:item-opened", {
          detail: { item: item, index: item.index },
        })
      );
    }

    closeItem(item) {
      // Desativar item
      item.header.classList.remove("active");
      item.content.classList.remove("active");
      item.header.setAttribute("aria-expanded", "false");

      this.activeItems.delete(item.index);

      // Disparar evento
      this.element.dispatchEvent(
        new CustomEvent("wfaccord:item-closed", {
          detail: { item: item, index: item.index },
        })
      );
    }

    closeAllItems() {
      this.items.forEach((item) => {
        this.closeItem(item);
      });
    }

    openAllItems() {
      if (this.multiple) {
        this.items.forEach((item) => {
          this.openItem(item);
        });
      }
    }

    activateInitial() {
      if (this.active === "all" && this.multiple) {
        this.openAllItems();
      } else if (this.active !== "0") {
        const activeIndex = parseInt(this.active) - 1;
        if (this.items[activeIndex]) {
          this.openItem(this.items[activeIndex]);
        }
      }
    }

    // Navegação por teclado
    focusNextItem(currentItem) {
      const currentIndex = this.items.indexOf(currentItem);
      const nextIndex = (currentIndex + 1) % this.items.length;
      this.items[nextIndex].header.focus();
    }

    focusPreviousItem(currentItem) {
      const currentIndex = this.items.indexOf(currentItem);
      const prevIndex =
        currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
      this.items[prevIndex].header.focus();
    }

    focusFirstItem() {
      if (this.items.length > 0) {
        this.items[0].header.focus();
      }
    }

    focusLastItem() {
      if (this.items.length > 0) {
        this.items[this.items.length - 1].header.focus();
      }
    }

    // Métodos públicos
    getActiveItems() {
      return Array.from(this.activeItems).map((index) => this.items[index]);
    }

    openItemByIndex(index) {
      if (this.items[index]) {
        this.openItem(this.items[index]);
      }
    }

    closeItemByIndex(index) {
      if (this.items[index]) {
        this.closeItem(this.items[index]);
      }
    }

    // Métodos estáticos
    static initAll(container = document) {
      const isDev =
        typeof window !== "undefined" &&
        (location.hostname === "localhost" ||
          location.hostname === "127.0.0.1");
      // support passing a specific container element that itself may have the attribute
      let elements = [];
      try {
        const selector = "[WfAccord], [wfaccord], [wf-accord]";
        if (container && container.nodeType === 1) {
          // include the container itself if it already has the attribute (any variation)
          const includeSelf =
            container.hasAttribute &&
            (container.hasAttribute("WfAccord") ||
              container.hasAttribute("wfaccord") ||
              container.hasAttribute("wf-accord"));
          const looksLikeAccord =
            !includeSelf &&
            container.querySelector &&
            (container.querySelector(
              "[WfAccordItem], [wfaccorditem], [wf-accord-item]"
            ) ||
              container.querySelector(".wfaccord-header") ||
              container.querySelector(".wfaccord-content"));
          const found = Array.from(container.querySelectorAll(selector));
          elements =
            includeSelf || (looksLikeAccord && found.length === 0)
              ? [container]
              : [];
          elements = elements.concat(found);
        } else {
          elements = Array.from(document.querySelectorAll(selector));
        }
      } catch (e) {
        elements = Array.from(
          document.querySelectorAll("[WfAccord], [wfaccord], [wf-accord]")
        );
      }

      const instances = [];
      const seen = new Set();

      elements.forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (!element._wfAccord) {
          try {
            const instance = new WfAccord(element);
            element._wfAccord = instance;
            instances.push(instance);
          } catch (error) {
            // Em contexto de docs, evitar quebrar tudo — logar apenas em dev
            if (
              typeof window !== "undefined" &&
              (location.hostname === "localhost" ||
                location.hostname === "127.0.0.1")
            )
              console.error("Erro ao inicializar WfAccord:", error);
          }
        }
      });

      return instances;
    }

    // Métodos de conveniência
    static open(selector, index) {
      const element = document.querySelector(selector);
      if (element && element._wfAccord) {
        element._wfAccord.openItemByIndex(index);
      }
    }
  }

  // ===== EXPORTAR E REGISTRAR =====
  // SEMPRE registrar no window para compatibilidade com WfAjax
  if (typeof window !== "undefined") {
    window.WfAccord = WfAccord;

    if (window.WebFull) {
      window.WebFull.modules.WfAccord = WfAccord;
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = WfAccord;
  }

  // ===== INICIALIZAÇÃO IMEDIATA =====
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      WfAccord.initAll();
    });
  } else {
    WfAccord.initAll();
  }
})(window, document);
