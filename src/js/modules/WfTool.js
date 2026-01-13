/**
 * WfTool - Sistema de Tooltips Avançado
 * SandroWeb - 2025
 */

class WfTool {
  constructor(element) {
    this.element = element;
    this.tooltip = null;
    this.position = this.element.getAttribute("WfTool-position") || "top";
    this.delay = parseInt(this.element.getAttribute("WfTool-delay")) || 300;
    this.theme = this.element.getAttribute("WfTool-theme") || "night";
    this.autoTheme = this.element.getAttribute("WfTool-auto-theme") === "true";
    this.focusEnabled = this.element.getAttribute("WfTool-focus") !== "false";
    // Raw attribute and decoded version (decodes HTML entities)
    this._rawText =
      this.element.getAttribute("WfTool") ||
      this.element.getAttribute("WfTool-text") ||
      "";
    const txtArea = document.createElement("textarea");
    txtArea.innerHTML = this._rawText;
    this._decodedText = txtArea.value;

    // Detecta automaticamente se o conteúdo contém tags HTML (ex: <i>)
    const hasHtml = /<[^>]+>/.test(this._decodedText);
    this.html = this.element.getAttribute("WfTool-html") === "true" || hasHtml;
    this.arrow = this.element.getAttribute("WfTool-arrow") !== "false";
    this.text = this._decodedText || this._rawText;

    // Última posição do mouse (para posicionamento mouse)
    this._lastMouseX = null;
    this._lastMouseY = null;

    this.init();
  }

  init() {
    this.loadCSS();
    this.createTooltip();
    this.bindEvents();
    this.element._wftool = this;
    try {
      this._domObserver = new MutationObserver(() => {
        if (!document.body.contains(this.element)) {
          this.destroy();
        }
      });
      this._domObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } catch (_) {}
  }

  loadCSS() {
    if (document.querySelector("#wftool-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "wftool-styles";
    style.textContent = `
         .wftool {
            position: fixed;
            z-index: 10000;
            background: var(--wftool-bg, #333);
            color: var(--wftool-color, #fff);
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 13px;
            line-height: 1.2;
            max-width: 200px;
            word-wrap: break-word;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            opacity: 0;
            visibility: hidden;
            transform: scale(0.95);
            transition: opacity 150ms ease, transform 150ms ease;
            pointer-events: none;
         }

         .wftool.wftool-show {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            pointer-events: auto;
         }

         /* Animações por keyframes para garantir execução mesmo com overrides */
         @keyframes wftoolIn {
            from { opacity: 0; transform: scale(0.95); }
            to   { opacity: 1; transform: scale(1); }
         }
         @keyframes wftoolOut {
            from { opacity: 1; transform: scale(1); }
            to   { opacity: 0; transform: scale(0.95); }
         }

         .wftool-anim-in {
            animation: wftoolIn 200ms ease forwards;
         }
         .wftool-anim-out {
            animation: wftoolOut 200ms ease forwards;
         }

         .wftool-arrow {
            position: absolute;
            width: 0;
            height: 0;
            border: 5px solid transparent;
         }

         .wftool-arrow.top {
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.bottom {
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.left {
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: var(--wftool-bg, #333);
         }

         .wftool-arrow.right {
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: var(--wftool-bg, #333);
         }

         .wftool-day {
            --wftool-bg: #ffffff;
            --wftool-color: #333333;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15);
         }

         .wftool-night {
            --wftool-bg: #1a1a1a;
            --wftool-color: #ffffff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3);
         }
      `;
    document.head.appendChild(style);
  }

  createTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
    }

    this.tooltip = document.createElement("div");
    this.tooltip.className = "wftool";

    // Acessibilidade: role, aria-hidden e vínculo com o elemento alvo
    this.tooltip.setAttribute("role", "tooltip");
    this.tooltip.setAttribute("aria-hidden", "true");
    if (!this.tooltip.id) {
      this.tooltip.id = `wftool-${Math.random().toString(36).slice(2, 9)}`;
    }
    if (!this.element.hasAttribute("aria-describedby")) {
      this.element.setAttribute("aria-describedby", this.tooltip.id);
    }

    // Estado inicial para animações
    this.tooltip.style.display = "none";

    // Conteúdo: se detectamos HTML, inserir como HTML; caso contrário texto
    if (this.html) {
      // Inserir HTML decodificado (mantém ícones <i> e outras tags)
      this.tooltip.innerHTML = this.text;
    } else {
      this.tooltip.textContent = this.text;
    }

    // Seta (exceto para mouse)
    if (this.arrow && this.position !== "mouse") {
      const arrow = document.createElement("div");
      arrow.className = "wftool-arrow";
      this.tooltip.appendChild(arrow);
    }

    // Aplicar tema
    this.applyTheme();

    // Se o tooltip segue o tema automaticamente (auto) ou inverte o WfDay,
    // observar mudanças de classe no documentElement para atualizar o tema em tempo real.
    if (this.theme === "auto" || this.autoTheme) {
      if (typeof MutationObserver !== "undefined") {
        this._themeObserver = new MutationObserver(() => {
          this.applyTheme();
        });
        this._themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      } else {
        // Fallback: escutar evento global de mudança de tema, se existir
        this._themeListener = () => this.applyTheme();
        document.addEventListener("wfday:changed", this._themeListener);
      }
    }

    document.body.appendChild(this.tooltip);
  }

  applyTheme() {
    if (!this.tooltip) return;

    // Limpar classes anteriores
    this.tooltip.classList.remove("wftool-day", "wftool-night");

    const isNight = document.documentElement.classList.contains("wfday-night");

    if (this.theme === "auto") {
      // Segue WfDay: se é night -> aplicar night (fundo escuro), se day -> day (fundo claro)
      this.tooltip.classList.add(isNight ? "wftool-night" : "wftool-day");
    } else if (this.autoTheme) {
      // Inverte WfDay
      this.tooltip.classList.add(isNight ? "wftool-day" : "wftool-night");
    } else {
      this.tooltip.classList.add(`wftool-${this.theme}`);
    }
  }

  bindEvents() {
    // Mouse
    this._enterHandler = () => this.show();
    this._leaveHandler = () => this.hide();
    this.element.addEventListener("mouseenter", this._enterHandler);
    this.element.addEventListener("mouseleave", this._leaveHandler);

    // Teclado (acessibilidade)
    if (this.focusEnabled) {
      if (
        this.element.tabIndex === -1 &&
        !this.element.hasAttribute("tabindex")
      ) {
        this.element.setAttribute("tabindex", "0");
      }
      this._focusInHandler = () => this.show();
      this._focusOutHandler = () => this.hide();
      this.element.addEventListener("focusin", this._focusInHandler);
      this.element.addEventListener("focusout", this._focusOutHandler);
    }

    // Toque (mobile)
    this._touchHandlerShow = () => this.show();
    this._touchHandlerHide = () => this.hide();
    this.element.addEventListener("touchstart", this._touchHandlerShow, {
      passive: true,
    });
    this.element.addEventListener("touchend", this._touchHandlerHide, {
      passive: true,
    });
    this.element.addEventListener("touchcancel", this._touchHandlerHide, {
      passive: true,
    });

    // Seguir mouse quando position === "mouse"
    if (this.position === "mouse") {
      // Ouvir no document para garantir captura mesmo quando o elemento perde foco
      this._mouseHandler = (e) => this.updateMousePosition(e);
      document.addEventListener("mousemove", this._mouseHandler);
    }
  }

  show() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    this.showTimeout = setTimeout(() => {
      // Mostrar temporariamente (invisível) para medir
      this.tooltip.style.display = "block";
      this.tooltip.style.visibility = "hidden";
      this.tooltip.classList.remove("wftool-show");

      if (this.position !== "mouse") {
        this.positionTooltip();
      } else {
        // Posicionamento inicial próximo ao cursor atual, se disponível
        const mouseX = this._lastMouseX;
        const mouseY = this._lastMouseY;
        if (mouseX != null && mouseY != null) {
          let left = mouseX + 15;
          let top = mouseY - this.tooltip.offsetHeight / 2;

          if (left + this.tooltip.offsetWidth > window.innerWidth - 8) {
            left = mouseX - this.tooltip.offsetWidth - 15;
          }
          if (left < 8) {
            left = 8;
          }
          if (top < 8) {
            top = mouseY + 15;
          }

          this.tooltip.style.left = `${left}px`;
          this.tooltip.style.top = `${top}px`;
        } else {
          this.tooltip.style.left = "0px";
          this.tooltip.style.top = "0px";
        }
      }

      this.adjustArrow();

      // Forçar reflow e depois mostrar com animação
      this.tooltip.offsetHeight;
      this.tooltip.style.visibility = "visible";
      // Usar classes de animação por keyframes para forçar execução
      this.tooltip.classList.remove("wftool-anim-out");
      this.tooltip.classList.add("wftool-anim-in");
      // também manter a classe de estado
      this.tooltip.classList.add("wftool-show");
      this.tooltip.setAttribute("aria-hidden", "false");
    }, this.delay);
  }

  hide() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    if (!this.tooltip) return;

    this.tooltip.setAttribute("aria-hidden", "true");

    // Remover entrada e iniciar animação de saída
    this.tooltip.classList.remove("wftool-anim-in");
    this.tooltip.classList.add("wftool-anim-out");
    this.tooltip.classList.remove("wftool-show");

    // Remover listener anterior caso exista
    if (this.tooltip._swtoolHideHandler) {
      this.tooltip.removeEventListener(
        "animationend",
        this.tooltip._swtoolHideHandler
      );
      this.tooltip.removeEventListener(
        "transitionend",
        this.tooltip._swtoolHideHandler
      );
      this.tooltip._swtoolHideHandler = null;
    }

    const finish = () => {
      try {
        this.tooltip.style.display = "none";
      } catch (err) {}
      this.tooltip.classList.remove(
        "wftool-anim-out",
        "wftool-anim-in",
        "wftool-show"
      );
      if (this.tooltip._swtoolHideHandler) {
        this.tooltip.removeEventListener(
          "animationend",
          this.tooltip._swtoolHideHandler
        );
        this.tooltip.removeEventListener(
          "transitionend",
          this.tooltip._swtoolHideHandler
        );
        this.tooltip._swtoolHideHandler = null;
      }
    };

    const handler = (e) => {
      if (e.type === "animationend" || e.propertyName === "opacity") {
        finish();
      }
    };

    this.tooltip._swtoolHideHandler = handler;
    this.tooltip.addEventListener("animationend", handler);
    this.tooltip.addEventListener("transitionend", handler);

    // Fallback: garantir hide se evento não disparar
    if (this._hideFallbackTimeout) clearTimeout(this._hideFallbackTimeout);
    this._hideFallbackTimeout = setTimeout(() => {
      finish();
      this._hideFallbackTimeout = null;
    }, 500);
  }

  positionTooltip() {
    const rect = this.element.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    let top, left;

    switch (this.position) {
      case "auto":
        // Posicionamento automático inteligente
        ({ top, left } = this.calculateAutoPosition(rect, tooltipRect));
        break;
      case "top":
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "bottom":
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.left - tooltipRect.width - 15;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.right + 8;
        break;
      default:
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    }

    // Ajustar se sair da tela
    if (top < 0) {
      top = rect.bottom + 8;
      this.position = "bottom";
    }
    if (left < 0) {
      left = 8;
    }
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 8;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = rect.top - tooltipRect.height - 8;
      this.position = "top";
    }

    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
  }

  calculateAutoPosition(rect, tooltipRect) {
    const margin = 8;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular posições possíveis
    const positions = {
      top: {
        top: rect.top - tooltipRect.height - margin,
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        fits: rect.top - tooltipRect.height - margin >= 0,
      },
      bottom: {
        top: rect.bottom + margin,
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
        fits: rect.bottom + tooltipRect.height + margin <= windowHeight,
      },
      left: {
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
        left: rect.left - tooltipRect.width - margin,
        fits: rect.left - tooltipRect.width - margin >= 0,
      },
      right: {
        top: rect.top + rect.height / 2 - tooltipRect.height / 2,
        left: rect.right + margin,
        fits: rect.right + tooltipRect.width + margin <= windowWidth,
      },
    };

    // Ajustar posições para não sair da tela horizontalmente
    Object.values(positions).forEach((pos) => {
      if (pos.left < margin) {
        pos.left = margin;
      }
      if (pos.left + tooltipRect.width > windowWidth - margin) {
        pos.left = windowWidth - tooltipRect.width - margin;
      }
    });

    // Priorizar posições que cabem completamente
    const preferredOrder = ["top", "bottom", "right", "left"];

    for (const posName of preferredOrder) {
      if (positions[posName].fits) {
        this.position = posName; // Atualizar para ajustar seta
        return positions[posName];
      }
    }

    // Se nenhuma posição cabe perfeitamente, usar a primeira que pelo menos não sai completamente
    for (const posName of preferredOrder) {
      const pos = positions[posName];
      if (pos.top >= 0 && pos.top + tooltipRect.height <= windowHeight) {
        this.position = posName;
        return pos;
      }
    }

    // Fallback: usar top
    this.position = "top";
    return positions.top;
  }

  updateMousePosition(e) {
    if (this.position === "mouse" && this.tooltip) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Guardar última posição do mouse
      this._lastMouseX = mouseX;
      this._lastMouseY = mouseY;

      // Posicionar tooltip ao lado do mouse (usar medidas reais do tooltip)
      let left = mouseX + 15;
      let top = mouseY - this.tooltip.offsetHeight / 2;

      // Ajustar se sair da tela (direita)
      if (left + this.tooltip.offsetWidth > window.innerWidth - 8) {
        left = mouseX - this.tooltip.offsetWidth - 15;
      }

      // Ajustar se sair da tela (esquerda)
      if (left < 8) {
        left = 8;
      }

      // Ajustar se sair da tela (topo)
      if (top < 8) {
        top = mouseY + 15;
      }

      this.tooltip.style.left = `${left}px`;
      this.tooltip.style.top = `${top}px`;
    }
  }

  adjustArrow() {
    const arrow = this.tooltip.querySelector(".wftool-arrow");
    if (!arrow) return;

    arrow.className = "wftool-arrow";
    arrow.classList.add(this.position);
  }

  destroy() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    // Remover listeners de mouse/touch/foco
    if (this._enterHandler) {
      this.element.removeEventListener("mouseenter", this._enterHandler);
      this._enterHandler = null;
    }
    if (this._leaveHandler) {
      this.element.removeEventListener("mouseleave", this._leaveHandler);
      this._leaveHandler = null;
    }
    if (this._focusInHandler) {
      this.element.removeEventListener("focusin", this._focusInHandler);
      this._focusInHandler = null;
    }
    if (this._focusOutHandler) {
      this.element.removeEventListener("focusout", this._focusOutHandler);
      this._focusOutHandler = null;
    }
    if (this._touchHandlerShow) {
      this.element.removeEventListener("touchstart", this._touchHandlerShow);
      this._touchHandlerShow = null;
    }
    if (this._touchHandlerHide) {
      this.element.removeEventListener("touchend", this._touchHandlerHide);
      this.element.removeEventListener("touchcancel", this._touchHandlerHide);
      this._touchHandlerHide = null;
    }

    if (this._mouseHandler) {
      document.removeEventListener("mousemove", this._mouseHandler);
      this._mouseHandler = null;
    }

    // Desconectar observadores/ouvintes de tema
    if (this._themeObserver) {
      try {
        this._themeObserver.disconnect();
      } catch (err) {}
      this._themeObserver = null;
    }
    if (this._themeListener) {
      document.removeEventListener("wfday:changed", this._themeListener);
      this._themeListener = null;
    }
    if (this._domObserver) {
      try {
        this._domObserver.disconnect();
      } catch (err) {}
      this._domObserver = null;
    }

    // Remover tooltip do DOM
    if (this.tooltip) {
      // Remover vínculo ARIA se fomos nós que adicionamos
      if (this.element.getAttribute("aria-describedby") === this.tooltip.id) {
        this.element.removeAttribute("aria-describedby");
      }
      this.tooltip.remove();
    }

    this.element._swtool = null;
  }

  setText(text) {
    this.text = text || "";
    this.html = false;
    if (this.tooltip) {
      this.tooltip.textContent = this.text;
      // Re-add arrow if needed (and not mouse mode)
      if (this.arrow && this.position !== "mouse") {
        const existingArrow = this.tooltip.querySelector(".wftool-arrow");
        if (!existingArrow) {
          const arrow = document.createElement("div");
          arrow.className = "wftool-arrow";
          this.tooltip.appendChild(arrow);
          this.adjustArrow();
        }
      }
    }
  }

  setHTML(html) {
    this.text = html || "";
    this.html = true;
    if (this.tooltip) {
      this.tooltip.innerHTML = this.text;
      // Re-add arrow if needed (and not mouse mode)
      if (this.arrow && this.position !== "mouse") {
        const existingArrow = this.tooltip.querySelector(".wftool-arrow");
        if (!existingArrow) {
          const arrow = document.createElement("div");
          arrow.className = "wftool-arrow";
          this.tooltip.appendChild(arrow);
          this.adjustArrow();
        }
      }
    }
  }

  static initAll(container = document) {
    const descendants = Array.from(
      container.querySelectorAll("[WfTool], [WfTool-text]")
    );
    const includeSelf =
      container &&
      container.getAttribute &&
      (container.hasAttribute("WfTool") ||
        container.hasAttribute("WfTool-text"));
    const elements = includeSelf ? [container, ...descendants] : descendants;
    const instances = [];

    elements.forEach((el) => {
      if (!el._swtoolInitialized) {
        try {
          const instance = new WfTool(el);
          el._swtoolInitialized = true;
          instances.push(instance);
        } catch (error) {
          console.error("WfTool: Erro ao inicializar elemento:", error);
        }
      }
    });

    return instances;
  }

  static destroyAll(container = document) {
    const elements = Array.from(
      container.querySelectorAll("[WfTool], [WfTool-text]")
    );
    elements.forEach((el) => {
      if (el._swtool) {
        el._swtool.destroy();
        delete el._swtool;
        delete el._swtoolInitialized;
      }
    });
  }
}

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfTool = WfTool;
}

// Expor globalmente sempre
if (typeof window !== "undefined") {
  window.WfTool = WfTool;
}
