(function (window, document) {
  "use strict";

  class WfLgpd {
    constructor(container, options = {}) {
      const existing = document.querySelector(".wflgpd-container");
      if (existing) {
        this.container = existing;
      } else {
        if (typeof container === "string") {
          this.container = document.querySelector(container);
        } else if (container instanceof HTMLElement) {
          this.container = container;
        } else {
          console.warn("WfLgpd: container inválido.");
          return;
        }
      }
      if (!this.container) {
        console.warn("WfLgpd: container não encontrado.");
        return;
      }

      // Mover container para o body para evitar problemas de stacking context
      if (this.container.parentNode !== document.body) {
        document.body.appendChild(this.container);
      }

      // MODELO: lê data-modelo ou opção modelo, fallback para 1
      this.modelo = parseInt(
        this.container.getAttribute("data-modelo") || options.modelo || 1,
        10
      );
      this.applyModeloClass();
      this.localStorageKey = options.localStorageKey || "wflgpd_accepted";
      this.messageText =
        options.messageText ||
        "Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa Política de Privacidade.";
      this.acceptText = options.acceptText || "Aceitar";
      this.rejectText = options.rejectText || "Rejeitar";
      this.onlyAccept = options.onlyAccept || false;
      this.cookieExpireDays = parseInt(
        this.container.getAttribute("ok") || options.cookieExpireDays || 365
      );
      this.onAccept = options.onAccept || function () {};
      this.onReject = options.onReject || function () {};
      this.onChange = options.onChange || function () {};
      this.styleInjected = false;
      this.css = options.css !== false; // css opcional, padrão true
      if (this.css) this.injectDefaultStyles();
      if (this.css) this.injectModelosStyles();
      this.init();
      // Sincronização entre abas
      this._storageListener = (e) => {
        if (e.key === this.localStorageKey) {
          this.reset();
        }
      };
      window.addEventListener("storage", this._storageListener);
    }

    injectDefaultStyles() {
      if (document.getElementById("wflgpd-default-styles")) return;
      const styleSheet = document.createElement("style");
      styleSheet.id = "wflgpd-default-styles";
      styleSheet.type = "text/css";
      styleSheet.innerText = `
      .wflgpd-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: var(--swlgpd-bg, #000000c9);
        color: var(--swlgpd-color, #eeeeeec2);
        padding: 20px;
        text-align: center;
        font-size: 13px;
        z-index: 2147483647;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideUpFadeIn 0.5s ease forwards;
      }
      .wflgpd-message {
        display: flex;
        align-items: center;
      }
      .wflgpd-message i {
        margin-right: 8px;
      }
      .wflgpd-buttons {
        display: flex;
        gap: 10px;
      }
      .wflgpd-button-accept,
      .wflgpd-button-reject {
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 0;
        font-size: 13px;
        color: var(--swlgpd-btn-color, #fff);
      }
      .wflgpd-button-accept {
        background-color: var(--swlgpd-btn-accept, #29772c);
      }
      .wflgpd-button-reject {
        background-color: var(--swlgpd-btn-reject, #ff1503);
      }
      @keyframes slideUpFadeIn {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideDownFadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(30px); }
      }
    `;
      document.head.appendChild(styleSheet);
    }

    injectModelosStyles() {
      if (document.getElementById("wflgpd-modelos-styles")) return;
      const style = document.createElement("style");
      style.id = "wflgpd-modelos-styles";
      style.textContent =
        this.getModelo1CSS() +
        this.getModelo2CSS() +
        this.getModelo3CSS() +
        this.getModelo4CSS();
      document.head.appendChild(style);
    }

    getModelo1CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 1: Clássico\n   ======================= */
    .wflgpd-modelo-1.wflgpd-container {
      background: var(--swlgpd-bg, #fff);
      color: var(--swlgpd-color, #000000c9);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -8px 32px #0005;
      font-family: var(--swlgpd-font, var(--font1));
      border: 1px solid #eeeeeec2;
    }
    .wflgpd-modelo-1 .wflgpd-button-accept { background: var(--swlgpd-btn-accept, #1976d2); color: #fff; border-radius: 0; }
    .wflgpd-modelo-1 .wflgpd-button-reject { background: var(--swlgpd-btn-reject, #ff1503); color: #fff; border-radius: 0; }
    .wflgpd-modelo-1 .wflgpd-message i { color: #fff; font-size: 1.8rem; }
    `;
    }
    getModelo2CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 2: Moderno\n   ======================= */
    .wflgpd-modelo-2.wflgpd-container {
      background: linear-gradient(90deg, #29772c 0%, #185a9d 100%);
      color: #fff;
      border-radius: 24px 24px 0 0;
      box-shadow: 0 -8px 32px #185a9d55;
      font-family: var(--swlgpd-font, 'Montserrat', Arial, sans-serif);
      border: none;
    }
    .wflgpd-modelo-2 .wflgpd-button-accept { background: #fff; color: #185a9d; font-weight: bold; border-radius: 24px; }
    .wflgpd-modelo-2 .wflgpd-button-reject { background: #fff; color: #ff1503; font-weight: bold; border-radius: 24px; }
    .wflgpd-modelo-2 .wflgpd-message i { color: #29772c; }
    `;
    }
    getModelo3CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 3: Minimalista\n   ======================= */
    .wflgpd-modelo-3.wflgpd-container {
      background: rgba(255,255,255,0.85);
      color: #333;
      border-radius: 0;
      box-shadow: none;
      font-family: var(--swlgpd-font, 'Roboto', Arial, sans-serif);
      border: none;
      padding: 12px 8px;
    }
    .wflgpd-modelo-3 .wflgpd-button-accept { background: #333; color: #fff; border-radius: 0; }
    .wflgpd-modelo-3 .wflgpd-button-reject { background: #eee; color: #333; border-radius: 0; }
    .wflgpd-modelo-3 .wflgpd-message i { display: none; }
    .wflgpd-modelo-3 .wflgpd-buttons { gap: 4px; }
    `;
    }
    getModelo4CSS() {
      return `
    /* =======================\n   WfLgpd Modelo 4: Dark\n   ======================= */
    .wflgpd-modelo-4.wflgpd-container {
      background: var(--swlgpd-bg, #23283a);
      color: var(--swlgpd-color, #ffe082);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -8px 32px #000a;
      font-family: var(--swlgpd-font, 'Poppins', Arial, sans-serif);
      border: none;
    }
    .wflgpd-modelo-4 .wflgpd-button-accept { background: #29772c; color: #23283a; border-radius: 8px; font-weight: bold; }
    .wflgpd-modelo-4 .wflgpd-button-reject { background: #ff1503; color: #23283a; border-radius: 8px; font-weight: bold; }
    .wflgpd-modelo-4 .wflgpd-message i { color: #ffe082; }
    `;
    }

    init() {
      const cookieValue =
        this.getCookie(this.localStorageKey) ??
        window.localStorage.getItem(this.localStorageKey);
      if (cookieValue === "true") {
        this.hide();
        return;
      }
      this.applyModeloClass();
      this.container.classList.add("wflgpd-container");
      this.container.setAttribute("role", "dialog");
      this.container.setAttribute("aria-live", "polite");
      if (!this.styleInjected && this.css) {
        this.injectStyles();
        this.styleInjected = true;
      }
      if (!this.container.querySelector(".wflgpd-message")) {
        const message = document.createElement("div");
        message.className = "wflgpd-message";
        message.setAttribute("role", "alert");
        message.setAttribute("aria-live", "polite");
        message.innerHTML =
          "<i class='bx bxs-bell bx-tada'></i> " + this.messageText;
        this.container.appendChild(message);
      }
      if (!this.container.querySelector(".wflgpd-buttons")) {
        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "wflgpd-buttons";
        const acceptButton = document.createElement("button");
        acceptButton.className = "wflgpd-button-accept";
        acceptButton.textContent = this.acceptText;
        acceptButton.setAttribute("aria-label", "Aceitar cookies");
        acceptButton.addEventListener("click", () => this.accept());
        buttonsDiv.appendChild(acceptButton);
        if (!this.onlyAccept) {
          const rejectButton = document.createElement("button");
          rejectButton.className = "wflgpd-button-reject";
          rejectButton.textContent = this.rejectText;
          rejectButton.setAttribute("aria-label", "Rejeitar cookies");
          rejectButton.addEventListener("click", () => this.reject());
          buttonsDiv.appendChild(rejectButton);
        }
        this.container.appendChild(buttonsDiv);
        // Foco automático no botão aceitar
        setTimeout(() => acceptButton.focus(), 100);
      }
    }

    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
      try {
        window.localStorage.setItem(name, value);
      } catch (_) {}
    }

    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    clearCookie(name) {
      document.cookie = name + "=; Max-Age=0; path=/";
      try {
        window.localStorage.removeItem(name);
      } catch (_) {}
    }

    accept() {
      this.container.style.animation = "slideDownFadeOut 0.4s ease forwards";
      this.container.addEventListener(
        "animationend",
        () => {
          this.setCookie(this.localStorageKey, "true", this.cookieExpireDays);
          this.hide();
          this.container.style.animation = "";
          this.onAccept();
          this.onChange(true);
        },
        { once: true }
      );
    }

    reject() {
      this.container.style.animation = "slideDownFadeOut 0.4s ease forwards";
      this.container.addEventListener(
        "animationend",
        () => {
          this.setCookie(this.localStorageKey, "false", this.cookieExpireDays);
          this.hide();
          this.container.style.animation = "";
          this.onReject();
          this.onChange(false);
        },
        { once: true }
      );
    }

    injectStyles() {
      if (document.getElementById("wflgpd-styles")) return;
      const styleSheet = document.createElement("style");
      styleSheet.id = "wflgpd-styles";
      styleSheet.type = "text/css";
      styleSheet.innerText = `
      @keyframes slideUpFadeIn {
        0% { opacity: 0; transform: translateY(30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideDownFadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(30px); }
      }
    `;
      document.head.appendChild(styleSheet);
    }

    show() {
      this.container.style.display = "flex";
      this.container.style.animation = "slideUpFadeIn 0.5s ease forwards";
      const btn = this.container.querySelector(".wflgpd-button-accept");
      if (btn) setTimeout(() => btn.focus(), 100);
    }

    hide() {
      this.container.style.display = "none";
    }

    reset() {
      this.container.innerHTML = "";
      this.init();
      this.show();
    }

    destroy() {
      window.removeEventListener("storage", this._storageListener);
      this.container.innerHTML = "";
      this.hide();
    }

    static initAll(container = document, options = {}) {
      let containers = [];
      if (typeof container === "string") {
        containers = document.querySelectorAll(container);
      } else if (
        container instanceof HTMLElement ||
        container instanceof Document
      ) {
        containers = container.querySelectorAll("[WfLgpd], .wflgpd");
      } else {
        return;
      }
      containers.forEach((container) => {
        new WfLgpd(container, options);
      });
    }

    // Aplica a classe do modelo no container
    applyModeloClass() {
      for (let i = 1; i <= 4; i++) {
        this.container.classList.remove(`wflgpd-modelo-${i}`);
      }
      this.container.classList.add(`wflgpd-modelo-${this.modelo}`);
    }

    // Permite trocar o modelo dinamicamente
    setModelo(modelo) {
      this.modelo = parseInt(modelo, 10) || 1;
      this.applyModeloClass();
    }

    static clearConsent(key = "wflgpd_accepted") {
      try {
        document.cookie = key + "=; Max-Age=0; path=/";
      } catch (_) {}
      try {
        window.localStorage.removeItem(key);
      } catch (_) {}
    }

    static reopen(container = document, options = {}) {
      WfLgpd.clearConsent(options.localStorageKey || "wflgpd_accepted");
      WfLgpd.initAll(container, options);
      const banner = document.querySelector(".wflgpd-container");
      if (banner) {
        banner.style.display = "flex";
      }
    }
  }
  // Variáveis CSS padrão (fallback)
  document.documentElement.style.setProperty(
    "--swlgpd-bg",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-bg"
    ) || "#222"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-color",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-color"
    ) || "#fff"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-color",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-color"
    ) || "#fff"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-accept",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-accept"
    ) || "#29772c"
  );
  document.documentElement.style.setProperty(
    "--swlgpd-btn-reject",
    getComputedStyle(document.documentElement).getPropertyValue(
      "--swlgpd-btn-reject"
    ) || "#ff1503"
  );

  // Disponibilizar globalmente
  if (window.WebFull) {
    window.WebFull.modules.WfLgpd = WfLgpd;
  }

  // Expor globalmente sempre
  if (typeof window !== "undefined") {
    window.WfLgpd = WfLgpd;
  }

  // Auto-inicialização
  if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => WfLgpd.initAll());
    } else {
      WfLgpd.initAll();
    }
  }
})(window, document);
