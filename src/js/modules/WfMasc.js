(function (window, document) {
  "use strict";

  class WfMasc {
    constructor(element) {
      this.element = element;
      // Tenta pegar máscara do atributo WfMasc-mask ou WfMasc
      this.mask =
        this.element.getAttribute("WfMasc-mask") ||
        this.element.getAttribute("WfMasc");
      this.init();
    }

    init() {
      // CSS moved to webfull.css
      this.bindEvents();
      try {
        if (this.element && this.element.value) {
          // Formata valor inicial se já houver conteúdo
          this.element.value = this.applyMask(String(this.element.value));
        }
      } catch (_) {}
    }

    // loadCSS removed

    bindEvents() {
      this.element.addEventListener("input", (e) => this.handleInput(e));
    }

    handleInput(e) {
      // Evita loop infinito se a máscara não mudar nada ou se for delete
      // Mas aqui aplicamos a máscara sempre no input
      let value = e.target.value;
      let masked = this.applyMask(value);

      if (value !== masked) {
        e.target.value = masked;
      }
    }

    applyMask(value) {
      if (!value) return "";
      const onlyNumbers = value.replace(/\D/g, "");

      switch (this.mask) {
        case "cpf":
          return onlyNumbers
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
        case "cnpj":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
        case "phone":
        case "telefone":
          if (onlyNumbers.length <= 10) {
            return onlyNumbers
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{4})(\d)/, "$1-$2");
          } else {
            return onlyNumbers
              .replace(/(\d{2})(\d)/, "($1) $2")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{4})\d+?$/, "$1");
          }
        case "cep":
          return onlyNumbers
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1");
        case "date":
        case "data":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");
        case "time":
        case "hora":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1:$2")
            .replace(/:(\d{2})\d+?$/, "$1");
        case "datetime":
          return onlyNumbers
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1 $2")
            .replace(/(\d{2})(\d)/, "$1:$2")
            .replace(/:(\d{2})\d+?$/, "$1");
        case "money":
        case "moeda":
          const raw = onlyNumbers;
          // Permitir ocultar o símbolo via atributo
          let symbolAttr = "";
          try {
            symbolAttr = (
              this.element.getAttribute("WfMasc-symbol") ||
              this.element.getAttribute("wfmasc-symbol") ||
              ""
            ).toLowerCase();
          } catch (_) {}

          const hideSymbol = ["off", "false", "0", "none", "hide"].includes(
            symbolAttr
          );

          if (hideSymbol) {
            return new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format((Number(raw) || 0) / 100);
          }

          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format((Number(raw) || 0) / 100);
        case "percent":
          return onlyNumbers + "%";
        case "integer":
          return onlyNumbers;
        case "number":
          // Mantém apenas dígitos, vírgula e ponto
          return value.replace(/[^\d,.]/g, "");
        default:
          return this.applyCustomMask(value);
      }
    }

    applyCustomMask(value) {
      if (!this.mask) return value;

      let maskedValue = "";
      let valueIndex = 0;
      // Remove formatação existente se for reprocessamento,
      // mas aqui assume-se que 'value' vem bruto ou misto.
      // Simplificação: usar apenas alfanuméricos do input para preencher
      const cleanValue = value.replace(/[^0-9a-zA-Z]/g, "");

      for (let i = 0; i < this.mask.length; i++) {
        if (valueIndex >= cleanValue.length) break;

        const maskChar = this.mask[i];
        const valueChar = cleanValue[valueIndex];

        if (maskChar === "9") {
          if (/[0-9]/.test(valueChar)) {
            maskedValue += valueChar;
            valueIndex++;
          } else {
            // Se esperava número e veio letra, pula o caractere do valor?
            // Ou aborta? Vamos tentar pular.
            valueIndex++;
            i--; // Tenta mesma máscara no próximo char
          }
        } else if (maskChar === "a") {
          if (/[a-zA-Z]/.test(valueChar)) {
            maskedValue += valueChar;
            valueIndex++;
          } else {
            valueIndex++;
            i--;
          }
        } else if (maskChar === "*") {
          maskedValue += valueChar;
          valueIndex++;
        } else {
          // Caractere fixo na máscara
          maskedValue += maskChar;
          if (maskChar === valueChar) {
            valueIndex++; // Se o usuário digitou o separador, avança
          }
        }
      }
      return maskedValue;
    }

    // Inicializador Estático para o WebFull
    static initAll() {
      // Procura elementos com WfMasc ou WfMasc-mask
      const elements = document.querySelectorAll("[WfMasc], [WfMasc-mask]");
      elements.forEach((element) => {
        if (!element._wfMasc) {
          element._wfMasc = new WfMasc(element);
        }
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfMasc = WfMasc;
    }
    window.WfMasc = WfMasc;

    // Auto-init
    const init = () => {
      WfMasc.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                // Element node
                if (
                  node.hasAttribute("WfMasc") ||
                  node.hasAttribute("WfMasc-mask") ||
                  node.querySelector("[WfMasc], [WfMasc-mask]")
                ) {
                  shouldInit = true;
                }
              }
            });
          }
        });
        if (shouldInit) {
          WfMasc.initAll();
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
