(function (window, document) {
  "use strict";

  class WfValid {
    constructor(form) {
      this.form = form;
      // Evita dupla inicialização
      if (this.form._wfValid) return this.form._wfValid;
      this.form._wfValid = this;
      this.errors = {};

      this.init();
    }

    init() {
      this.bindEvents();
    }

    // loadCSS removed

    bindEvents() {
      this.form.addEventListener("submit", (e) => {
        if (!this.validate()) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      // validação em tempo real
      this.form.querySelectorAll("[WfValid-rules]").forEach((field) => {
        const handler = () => this.validateField(field);
        field.addEventListener("blur", handler);
        field.addEventListener("input", handler);
        field.addEventListener("change", handler);
      });
    }

    validate() {
      this.clearErrors();
      let isValid = true;

      this.form.querySelectorAll("[WfValid-rules]").forEach((field) => {
        if (!this.validateField(field)) isValid = false;
      });

      return isValid;
    }

    showError(field, message) {
      let errorElement = field.nextElementSibling;
      // Procura se o próximo elemento é a div de erro, ou cria
      if (!errorElement || !errorElement.classList.contains("wfvalid-error")) {
        errorElement = document.createElement("div");
        errorElement.className = "wfvalid-error";
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      errorElement.textContent = message;
    }

    getErrors() {
      return this.errors;
    }

    clearErrors() {
      this.errors = {};
      this.form
        .querySelectorAll(".wfvalid-error")
        .forEach((el) => (el.textContent = ""));
      this.form.querySelectorAll(".is-invalid").forEach((el) => {
        el.classList.remove("is-invalid");
        el.removeAttribute("aria-invalid");
      });
    }

    validateField(field) {
      const rules = (field.getAttribute("WfValid-rules") || "")
        .split("|")
        .filter(Boolean);
      const value =
        field.type === "checkbox" ? (field.checked ? "1" : "") : field.value;

      let fieldValid = true;

      for (const rule of rules) {
        const [ruleName, ruleParam] = rule.split(":");
        const validator = WfValid.rules[ruleName];
        if (
          validator &&
          !validator.handler(value, ruleParam, this.form, field)
        ) {
          const customMsg = field.getAttribute(`WfValid-msg-${ruleName}`);
          const msg =
            customMsg || validator.message.replace("{param}", ruleParam || "");
          this.errors[field.name || field.id || "field"] = msg;
          this.showError(field, msg);
          fieldValid = false;
          break; // Para no primeiro erro do campo
        }
      }

      if (fieldValid) {
        // limpa erro se houver
        let errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains("wfvalid-error"))
          errorElement.textContent = "";

        field.classList.remove("is-invalid");
        // Só adiciona is-valid se tiver algum valor ou regra, para não ficar verde vazio se não for required
        if (value || rules.includes("required")) {
          field.classList.add("is-valid");
        }
        field.removeAttribute("aria-invalid");
      }
      return fieldValid;
    }

    static addRule(name, handler, message) {
      WfValid.rules[name] = { handler, message };
    }

    static validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      let soma = 0,
        resto;
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }

    static validarCNPJ(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, "");
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    }

    static initAll(container = document) {
      const forms = container.querySelectorAll("[WfValid]");
      forms.forEach((form) => {
        if (!form._wfValid) {
          new WfValid(form);
        }
      });
    }
  }

  WfValid.rules = {
    required: {
      handler: (value) => value.trim() !== "",
      message: "Este campo é obrigatório.",
    },
    email: {
      handler: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value),
      message: "Por favor, insira um email válido.",
    },
    min: {
      handler: (value, param) => {
        const v = (value || "").trim();
        return v === "" ? true : v.length >= parseInt(param);
      },
      message: "O campo deve ter no mínimo {param} caracteres.",
    },
    max: {
      handler: (value, param) => value.length <= parseInt(param),
      message: "O campo deve ter no máximo {param} caracteres.",
    },
    minlength: {
      handler: (value, param) => (value || "").length >= parseInt(param),
      message: "Mínimo de {param} caracteres.",
    },
    maxlength: {
      handler: (value, param) => (value || "").length <= parseInt(param),
      message: "Máximo de {param} caracteres.",
    },
    numeric: {
      handler: (value) => !isNaN(parseFloat(value)) && isFinite(value),
      message: "O campo deve ser numérico.",
    },
    integer: {
      handler: (value) => /^-?\d+$/.test(value),
      message: "O campo deve ser um número inteiro.",
    },
    minValue: {
      handler: (value, param) => {
        if (value === "" || value == null) return true;
        return (
          Number(value.toString().replace(/\./g, "").replace(/,/g, ".")) >=
          Number(param)
        );
      },
      message: "Valor mínimo é {param}.",
    },
    maxValue: {
      handler: (value, param) => {
        if (value === "" || value == null) return true;
        return (
          Number(value.toString().replace(/\./g, "").replace(/,/g, ".")) <=
          Number(param)
        );
      },
      message: "Valor máximo é {param}.",
    },
    equals: {
      handler: (value, param, form) => {
        const otherField = form.querySelector(`#${param}`);
        return otherField && value === otherField.value;
      },
      message: "Os campos não são iguais.",
    },
    url: {
      handler: (value) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value),
      message: "Por favor, insira uma URL válida.",
    },
    pattern: {
      handler: (value, param) => {
        try {
          const re = new RegExp(param);
          return re.test(value);
        } catch (_) {
          return true;
        }
      },
      message: "Formato inválido.",
    },
    cpf: {
      handler: (value) => WfValid.validarCPF(value),
      message: "CPF inválido.",
    },
    cnpj: {
      handler: (value) => WfValid.validarCNPJ(value),
      message: "CNPJ inválido.",
    },
    phone: {
      handler: (value) => {
        const v = value.replace(/\D/g, "");
        return v === "" || v.length === 10 || v.length === 11;
      },
      message: "Telefone inválido.",
    },
    cep: {
      handler: (value) => /^\d{5}-?\d{3}$/.test(value),
      message: "CEP inválido.",
    },
    date: {
      handler: (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value),
      message: "Data inválida.",
    },
    time: {
      handler: (value) => /^\d{2}:\d{2}$/.test(value),
      message: "Hora inválida.",
    },
    between: {
      handler: (value, param) => {
        const [a, b] = (param || "").split(",").map((x) => parseInt(x));
        const len = (value || "").length;
        return len >= a && len <= b;
      },
      message: "Tamanho deve estar entre {param}.",
    },
    in: {
      handler: (value, param) => (param || "").split(",").includes(value),
      message: "Valor não permitido.",
    },
    notIn: {
      handler: (value, param) => !(param || "").split(",").includes(value),
      message: "Valor não permitido.",
    },
    requiredTrue: {
      handler: (value, _, __, field) =>
        field && field.type === "checkbox" ? field.checked : !!value,
      message: "Campo obrigatório.",
    },
    fileType: {
      handler: (value, param, form, field) => {
        if (!field || !field.files || field.files.length === 0) return true;
        const allow = (param || "")
          .split(",")
          .map((s) => s.trim().toLowerCase());
        return Array.from(field.files).every((f) => {
          const ext = f.name.split(".").pop().toLowerCase();
          return allow.includes(ext) || allow.includes(f.type.toLowerCase());
        });
      },
      message: "Tipo de arquivo inválido.",
    },
    fileSizeMax: {
      handler: (value, param, form, field) => {
        if (!field || !field.files || field.files.length === 0) return true;
        const max = Number(param || 0); // em MB
        return Array.from(field.files).every(
          (f) => f.size / 1024 / 1024 <= max
        );
      },
      message: "Arquivo excede {param} MB.",
    },
  };

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfValid = WfValid;
    }
    window.WfValid = WfValid;

    // Auto-init
    const init = () => {
      WfValid.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfValid.initAll();
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
