/**
 * WfDay - Sistema de Tema Dia/Noite
 *
 * @author SandroWeb
 * @version 3.0
 * @since WEBFULL Framework v1.0
 */

class WfDay {
  constructor(element) {
    this.element = element;
    this.currentTheme = this.getStoredTheme() || this.detectSystemTheme();
    this.isInitialized = false;
    this.cssProcessor = null;
    this._themeListeners = new Set();
    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.loadComponentCSS();
    this.setupElement();
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.syncAcrossTabs();

    // Processar fontes IMEDIATAMENTE para garantir funcionamento inicial
    this.processFontSwitchers();

    // Reprocessar na próxima pintura para garantir aplicação após layout
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        this.processFontSwitchers();
      });
    }

    // Reprocessar quando as fontes estiverem prontas (caso webfonts)
    try {
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        document.fonts.ready.then(() => {
          this.processFontSwitchers();
        });
      }
    } catch (_) {
      /* ignore */
    }

    // Processar fontes novamente com delay para garantir que funcionem
    setTimeout(() => {
      this.processFontSwitchers();
    }, 100);

    // Processar fontes uma terceira vez com delay maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 300);

    // Processar fontes uma quarta vez com delay ainda maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 500);

    // Processar fontes uma quinta vez com delay ainda maior para garantir funcionamento
    setTimeout(() => {
      this.processFontSwitchers();
    }, 1000);

    // Rodada extra após carregamento completo da página
    window.addEventListener("load", () => {
      this.processFontSwitchers();
    });

    this.isInitialized = true;
  }

  // Carregar CSS do componente
  loadComponentCSS() {
    const cssId = "webfull-wfday-css";
    if (!document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
/**
 * WfDay.css - Estilos do Sistema de Tema Dia/Noite
 * SandroWeb - 2025
 */

/* ===== CONTAINER FLUTUANTE (para HTML WfDay) ===== */
.wfday-floating-container {
    position: fixed;
    top: 50%;
    right: 0.2rem;
    transform: translateY(-50%);
    z-index: 1001;
    pointer-events: none;
}

.wfday-floating-container .wfday-toggle {
    pointer-events: auto;
}

/* ===== CONTAINER PRINCIPAL ===== */
.wfday-container {
    display: inline-block;
    position: relative;
}

/* ===== BOTÃO TOGGLE VERTICAL ===== */
.wfday-toggle {
    position: fixed;
    width: 26px;
    height: 50px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    transition: transform 0.8s ease !important;
    color: var(--wf-color--, #333) !important;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    gap: 2px;
}

/* ===== POSICIONAMENTOS ===== */
/* Padrão: center-right */
.wfday-toggle {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}

/* Top-Left */
.wfday-pos-top-left .wfday-toggle {
    top: 1rem;
    left: 1rem;
    transform: none;
}

/* Top-Right */
.wfday-pos-top-right .wfday-toggle {
    top: 1rem;
    right: 1rem;
    transform: none;
}

/* Top-Center */
.wfday-pos-top-center .wfday-toggle {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* Center-Left */
.wfday-pos-center-left .wfday-toggle {
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

/* Center-Right (padrão) */
.wfday-pos-center-right .wfday-toggle {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}

/* Bottom-Left */
.wfday-pos-bottom-left .wfday-toggle {
    bottom: 1rem;
    left: 1rem;
    transform: none;
}

/* Bottom-Right */
.wfday-pos-bottom-right .wfday-toggle {
    bottom: 1rem;
    right: 1rem;
    transform: none;
}

/* Bottom-Center */
.wfday-pos-bottom-center .wfday-toggle {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* ===== HOVER CORRIGIDO - SEM CONFLITOS ===== */
/* Hover para posições center que precisam manter translateY */
.wfday-pos-center-right .wfday-toggle:hover,
.wfday-pos-center-left .wfday-toggle:hover {
    transform: translateY(-50%) scale(1.05) !important;
}

/* Hover para posições top que precisam manter translateX */
.wfday-pos-top-center .wfday-toggle:hover {
    transform: translateX(-50%) scale(1.05) !important;
}

/* Hover para posições bottom que precisam manter translateX */
.wfday-pos-bottom-center .wfday-toggle:hover {
    transform: translateX(-50%) scale(1.05) !important;
}

/* Hover para posições sem transform (top-left, top-right, bottom-left, bottom-right) */
.wfday-pos-top-left .wfday-toggle:hover,
.wfday-pos-top-right .wfday-toggle:hover,
.wfday-pos-bottom-left .wfday-toggle:hover,
.wfday-pos-bottom-right .wfday-toggle:hover {
    transform: scale(1.05) !important;
}

/* ===== ACTIVE CORRIGIDO - SEM CONFLITOS ===== */
/* Active para posições center que precisam manter translateY */
.wfday-pos-center-right .wfday-toggle:active,
.wfday-pos-center-left .wfday-toggle:active {
    transform: translateY(-50%) scale(0.95) !important;
}

/* Active para posições top que precisam manter translateX */
.wfday-pos-top-center .wfday-toggle:active {
    transform: translateX(-50%) scale(0.95) !important;
}

/* Active para posições bottom que precisam manter translateX */
.wfday-pos-bottom-center .wfday-toggle:active {
    transform: translateX(-50%) scale(0.95) !important;
}

/* Active para posições sem transform */
.wfday-pos-top-left .wfday-toggle:active,
.wfday-pos-top-right .wfday-toggle:active,
.wfday-pos-bottom-left .wfday-toggle:active,
.wfday-pos-bottom-right .wfday-toggle:active {
    transform: scale(0.95) !important;
}

/* ===== ÍCONES ===== */
.wfday-toggle .bx {
    transition: opacity 0.8s ease;
    margin: 2px 0;
    /* Prevenir animações em loop */
    animation: none;
    animation-play-state: paused;
}

.wfday-toggle .bx.active {
    opacity: 1;
    transform: scale(1.1);
    filter: drop-shadow(0 0 4px currentColor);
}

.wfday-toggle .bx.inactive {
    opacity: 0.4;
    transform: scale(0.8);
    color: var(--color);
}

/* ===== ANIMAÇÕES HOVER ===== */
.wfday-toggle:hover .wf.wfs-sun {
    animation: sunRotate 3s linear infinite;
}

.wfday-toggle:hover .wf.wfs-moon {
    animation: moonGlow 2s ease-in-out infinite alternate;
}

/* ===== PREVENIR ANIMAÇÕES EM LOOP ===== */
.wfday-toggle .wf {
    animation-play-state: paused;
}

.wfday-toggle:hover .wf.wfs-sun {
    animation-play-state: running;
}

.wfday-toggle:hover .wf.wfs-moon {
    animation-play-state: running;
}

/* ===== KEYFRAMES DAS ANIMAÇÕES ===== */
@keyframes sunRotate {
    0% {
        transform: scale(1.1) rotate(0deg);
    }
    100% {
        transform: scale(1.1) rotate(360deg);
    }
}

@keyframes moonGlow {
    0% {
        filter: drop-shadow(0 0 2px currentColor);
    }
    50% {
        filter: drop-shadow(0 0 6px currentColor);
    }
    100% {
        filter: drop-shadow(0 0 2px currentColor);
    }
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    .wfday-toggle {
        right: 0.5rem;
        width: 24px;
        height: 48px;
        font-size: 14px;
    }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfday-toggle {
        transition: none;
    }

    .wfday-toggle:hover {
        transform: translateY(-50%);
    }

    .wfday-toggle .bx {
        transition: none;
    }

    .wfday-toggle:hover .wf.wfs-sun,
    .wfday-toggle:hover .wf.wfs-moon {
        animation: none;
    }
}

/* ===== TEMA ESCURO ===== */
[data-theme="night"] .wfday-toggle {
    color: var(--wf-color, #fff);
}

[data-theme="night"] .wfday-toggle .bx.inactive {
    color: var(--wf-color, #666);
}

/* ===== ANIMAÇÕES DE FADE PARA IMAGENS ===== */
.wfday-fade-out {
    opacity: 0;
    transition: opacity 0.3s ease-out;
}

.wfday-fade-in {
    opacity: 1;
    transition: opacity 0.5s ease-in;
}

/* Aplicar fade em todas as imagens com WfDay */
img[WfDay-img-day],
img[WfDay-img-night] {
    transition: opacity 0.4s ease;
}

/* Aplicar fade em todos os elementos com background WfDay */
[WfDay-bg-day],
[WfDay-bg-night] {
    transition: opacity 0.4s ease;
}

/* ===== OTIMIZAÇÕES DE PERFORMANCE ===== */
.wfday-fade-out,
.wfday-fade-in {
    will-change: opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
}

/* ===== RESPONSIVIDADE PARA FADE ===== */
@media (max-width: 768px) {
    .wfday-fade-out,
    .wfday-fade-in {
        transition-duration: 0.1s;
    }
}

/* ===== ACESSIBILIDADE PARA FADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfday-fade-out,
    .wfday-fade-in {
        transition: none;
    }

    img[WfDay-img-day],
    img[WfDay-img-night],
    [WfDay-bg-day],
    [WfDay-bg-night] {
        transition: none;
    }
}

/* ===== TRANSIÇÕES ESPECÍFICAS PARA TEMA ===== */
/* Garantir transições suaves para elementos que mudam com o tema */
html.wfday-day *,
html.wfday-night * {
    transition: background-color 0.8s ease,
                color 0.8s ease,
                border-color 0.8s ease,
                box-shadow 0.8s ease;
}

/* Transições ainda mais suaves para elementos específicos */
html.wfday-day body,
html.wfday-night body,
html.wfday-day .container,
html.wfday-night .container,
html.wfday-day .bloco,
html.wfday-night .bloco {
    transition: background-color 1s ease,
                color 1s ease;
}

/* Transições suaves para elementos de interface */
html.wfday-day button,
html.wfday-night button,
html.wfday-day input,
html.wfday-night input,
html.wfday-day textarea,
html.wfday-night textarea,
html.wfday-day select,
html.wfday-night select {
    transition: background-color 0.8s ease,
                color 0.8s ease,
                border-color 0.8s ease,
                box-shadow 0.8s ease;
}

/* ===== REGRAS DE PRIORIDADE PARA SWDAY ===== */
/* Garantir que as transições do WfDay tenham prioridade */
html.wfday-day *,
html.wfday-night * {
    transition: background-color 0.8s ease !important,
                color 0.8s ease !important,
                border-color 0.8s ease !important,
                box-shadow 0.8s ease !important;
}

/* Exceções para elementos que não devem ter transição */
html.wfday-day .wfday-toggle,
html.wfday-night .wfday-toggle,
html.wfday-day .wfday-toggle *,
html.wfday-night .wfday-toggle * {
    transition: transform 0.8s ease !important,
                opacity 0.8s ease !important;
}

/* Transições específicas para elementos de texto */
html.wfday-day p,
html.wfday-night p,
html.wfday-day h1,
html.wfday-night h1,
html.wfday-day h2,
html.wfday-night h2,
html.wfday-day h3,
html.wfday-night h3,
html.wfday-day h4,
html.wfday-night h4,
html.wfday-day h5,
html.wfday-night h5,
html.wfday-day h6,
html.wfday-night h6,
html.wfday-day span,
html.wfday-night span,
html.wfday-day div,
html.wfday-night div {
    transition: color 1s ease !important,
                background-color 1s ease !important;
}
         `;
      document.head.appendChild(style);
    }
  }

  setupElement() {
    this.element.setAttribute("WfDay", "true");

    // Se o elemento é o HTML, criar um container flutuante para o botão
    if (this.element === document.documentElement) {
      this.createFloatingContainer();
    } else {
      this.element.classList.add("wfday-container");
      this.applyPosition();
    }

    this.render();
  }

  createFloatingContainer() {
    // Criar container flutuante se não existir
    let floatingContainer = document.getElementById("wfday-floating-container");
    if (!floatingContainer) {
      floatingContainer = document.createElement("div");
      floatingContainer.id = "wfday-floating-container";
      floatingContainer.className = "wfday-floating-container";
      document.body.appendChild(floatingContainer);
    }

    // Usar o container flutuante como elemento de renderização
    this.renderElement = floatingContainer;
  }

  applyPosition() {
    // Ler o atributo wfday-pos
    const position = this.element.getAttribute("wfday-pos") || "center-right";

    // Remover classes de posição antigas
    this.element.classList.remove(
      "wfday-pos-top-left",
      "wfday-pos-top-right",
      "wfday-pos-bottom-left",
      "wfday-pos-bottom-right",
      "wfday-pos-center-left",
      "wfday-pos-center-right",
      "wfday-pos-top-center",
      "wfday-pos-bottom-center"
    );

    // Adicionar classe de posição
    this.element.classList.add(`wfday-pos-${position}`);
  }

  render() {
    // Usar renderElement se disponível (para HTML), senão usar element
    const targetElement = this.renderElement || this.element;

    targetElement.innerHTML = "";
    this.button = document.createElement("button");
    this.button.className = "wfday-toggle";
    this.button.setAttribute(
      "aria-pressed",
      this.currentTheme === "day" ? "true" : "false"
    );
    this.button.setAttribute("aria-label", "Alternar tema dia/noite");
    this.button.setAttribute("title", "Alternar tema dia/noite");
    this.button.setAttribute("role", "wfitch");

    // Obter ícones personalizados
    const dayIcon = this.element.getAttribute("wfday-day-icon") || "wfs-sun";
    const nightIcon =
      this.element.getAttribute("wfday-night-icon") || "wfs-moon";

    this.button.innerHTML = `
         <i class="wf ${dayIcon} ${
      this.currentTheme === "day" ? "active" : "inactive"
    }" aria-hidden="true"></i>
         <i class="wf ${nightIcon} ${
      this.currentTheme === "day" ? "inactive" : "active"
    }" aria-hidden="true"></i>
      `;
    targetElement.appendChild(this.button);
  }

  bindEvents() {
    // Toggle manual no botão
    if (this.button) {
      this.button.addEventListener("click", () => {
        this.toggle();
      });
    }

    // Detectar mudança do sistema
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? "night" : "day");
        }
      });
    }

    // Keyboard shortcut
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  detectSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "night";
    }
    return "day";
  }

  getStoredTheme() {
    try {
      return localStorage.getItem("wfday-theme");
    } catch (e) {
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem("wfday-theme", theme);
    } catch (e) {
      // Erro silencioso
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    this.setStoredTheme(theme);

    // Remover classes antigas
    document.documentElement.classList.remove("wfday-day", "wfday-night");

    // Adicionar nova classe
    document.documentElement.classList.add(`wfday-${theme}`);

    // Atualizar atributo
    document.documentElement.setAttribute("data-theme", theme);

    // Forçar reflow para garantir que as mudanças sejam aplicadas
    document.documentElement.offsetHeight;

    // Atualizar botão
    this.updateButton();

    // Disparar evento
    this.element.dispatchEvent(
      new CustomEvent("wfday:theme-changed", {
        detail: { theme, previousTheme: this.currentTheme },
      })
    );

    // Disparar evento global também
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: theme },
      })
    );

    // Processar CSS customizado com delay para garantir que o DOM esteja pronto
    setTimeout(() => {
      this.processCustomCSS();
    }, 100);
  }

  updateButton() {
    if (this.button) {
      const sunIcon = this.button.querySelector(".wfs-sun");
      const moonIcon = this.button.querySelector(".wfs-moon");

      if (sunIcon && moonIcon) {
        // Prevenir animações durante a atualização
        sunIcon.style.animation = "none";
        moonIcon.style.animation = "none";

        sunIcon.classList.toggle("active", this.currentTheme === "day");
        sunIcon.classList.toggle("inactive", this.currentTheme === "night");
        moonIcon.classList.toggle("active", this.currentTheme === "night");
        moonIcon.classList.toggle("inactive", this.currentTheme === "day");

        // Restaurar animações após um pequeno delay
        setTimeout(() => {
          sunIcon.style.animation = "";
          moonIcon.style.animation = "";
        }, 100);
      }

      this.button.setAttribute(
        "aria-pressed",
        this.currentTheme === "day" ? "true" : "false"
      );
    }
  }

  toggle() {
    const newTheme = this.currentTheme === "day" ? "night" : "day";
    this.applyTheme(newTheme);

    // Disparar evento para sincronizar com outros componentes
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: newTheme },
      })
    );

    // Processar fontes novamente para garantir que funcionem
    setTimeout(() => {
      this.processFontSwitchers();
    }, 200);
  }

  setTheme(theme) {
    if (theme === "day" || theme === "night") {
      this.applyTheme(theme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  syncAcrossTabs() {
    // Proteção contra múltiplos listeners
    if (this._storageListener) {
      window.removeEventListener("storage", this._storageListener);
    }
    if (this._themeChangeListener) {
      window.removeEventListener(
        "wfday-theme-changed",
        this._themeChangeListener
      );
    }

    this._storageListener = (e) => {
      if (
        e.key === "wfday-theme" &&
        e.newValue &&
        e.newValue !== this.currentTheme
      ) {
        this.applyTheme(e.newValue);
      }
    };

    this._themeChangeListener = (e) => {
      // Evitar loop infinito - só aplicar se não foi este componente que disparou
      if (e.detail && e.detail.theme && e.detail.theme !== this.currentTheme) {
        this.applyTheme(e.detail.theme);
      }
    };

    window.addEventListener("storage", this._storageListener);
    window.addEventListener("wfday-theme-changed", this._themeChangeListener);
  }

  /**
   * Processa CSS customizado com sintaxe day() e night()
   */
  processCustomCSS() {
    if (!this.cssProcessor) {
      this.cssProcessor = new SwDayCSSProcessor();
    }
    this.cssProcessor.processAll();

    // Processar troca de imagens e fontes
    this.processImageSwitchers();
    this.processFontSwitchers();
  }

  /**
   * Processa troca automática de imagens
   */
  processImageSwitchers() {
    const currentTheme = this.currentTheme;

    // Processar imagens com atributos WfDay-img-day/night
    document
      .querySelectorAll("img[WfDay-img-day], img[WfDay-img-night]")
      .forEach((img) => {
        const dayImg = img.getAttribute("WfDay-img-day");
        const nightImg = img.getAttribute("WfDay-img-night");

        if (dayImg && nightImg) {
          img.src = currentTheme === "day" ? dayImg : nightImg;
        }
      });

    // Processar backgrounds com atributos WfDay-bg-day/night
    document
      .querySelectorAll("[WfDay-bg-day], [WfDay-bg-night]")
      .forEach((element) => {
        const dayBg = element.getAttribute("WfDay-bg-day");
        const nightBg = element.getAttribute("WfDay-bg-night");

        if (dayBg && nightBg) {
          element.style.backgroundImage =
            currentTheme === "day" ? dayBg : nightBg;
        }
      });
  }

  /**
   * Processa troca automática de fontes
   */
  processFontSwitchers() {
    const currentTheme = this.currentTheme;

    // Processar fontes IMEDIATAMENTE
    document
      .querySelectorAll("[WfDay-font-day], [WfDay-font-night]")
      .forEach((element) => {
        const dayFont = element.getAttribute("WfDay-font-day");
        const nightFont = element.getAttribute("WfDay-font-night");
        const isWeight = element.getAttribute("WfDay-font-weight") === "true";

        if (dayFont && nightFont) {
          // Resolver variáveis CSS se necessário
          const resolvedDayFont = this.resolveCSSVariable(dayFont);
          const resolvedNightFont = this.resolveCSSVariable(nightFont);

          if (isWeight) {
            element.style.setProperty(
              "font-weight",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          } else {
            element.style.setProperty(
              "font-family",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          }

          // Forçar reflow e quebrar cache
          element.offsetHeight;
          element.style.transform = "translateZ(0)";
          element.style.transform = "";
        }
      });
  }

  /**
   * Resolve variáveis CSS para valores reais
   */
  resolveCSSVariable(value) {
    if (!value || typeof value !== "string") return value;

    // Se contém var(), resolver a variável
    if (value.includes("var(")) {
      try {
        // Método 1: Usar getComputedStyle no root
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        // Extrair nome da variável
        const match = value.match(/var\(([^)]+)\)/);
        if (match) {
          const varName = match[1].trim();
          const resolved = computedStyle.getPropertyValue(varName);
          if (resolved && resolved.trim() !== "") {
            return resolved;
          }
        }

        // Método 2: Criar elemento temporário como fallback
        const temp = document.createElement("div");
        temp.style.fontFamily = value;
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.top = "-9999px";
        temp.style.left = "-9999px";
        temp.style.width = "1px";
        temp.style.height = "1px";
        document.body.appendChild(temp);

        // Forçar reflow
        temp.offsetHeight;

        const resolved = getComputedStyle(temp).fontFamily;
        document.body.removeChild(temp);

        return resolved || value;
      } catch (error) {
        console.warn("Erro ao resolver variável CSS:", value, error);
        return value;
      }
    }

    return value;
  }

  // Métodos estáticos
  static initAll(container = document) {
    let elements = [];

    // PRIMEIRO: Verificar se o HTML tem WfDay (nova funcionalidade)
    if (document.documentElement.hasAttribute("WfDay")) {
      elements = [document.documentElement];
    } else {
      // SEGUNDO: Procurar por divs com WfDay (compatibilidade)
      elements = container.querySelectorAll("[WfDay]");
    }

    const instances = [];

    elements.forEach((element) => {
      if (!element._wfDay) {
        try {
          const instance = new WfDay(element);
          element._wfDay = instance;
          instances.push(instance);
        } catch (error) {
          console.error("Erro ao inicializar WfDay:", error);
        }
      }
    });

    // IMPORTANTE: Se foi chamado com um container específico (ex: via WfAjax),
    // processar fontes e imagens nesse container mesmo que não tenha elementos WfDay
    if (container !== document) {
      // Processar fontes no container específico
      WfDay.initFontSwitchers(container);
      // Processar imagens no container específico
      WfDay.initImageSwitchers(container);
    }

    return instances;
  }

  // Método estático para obter o tema atual
  static getTheme() {
    const html = document.documentElement;
    if (html.classList.contains("wfday-night")) {
      return "night";
    }
    return "day";
  }

  // Método estático para alternar tema
  static toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains("wfday-night")
      ? "night"
      : "day";
    const newTheme = currentTheme === "day" ? "night" : "day";

    // Aplicar tema
    if (newTheme === "night") {
      html.classList.remove("wfday-day");
      html.classList.add("wfday-night");
    } else {
      html.classList.remove("wfday-night");
      html.classList.add("wfday-day");
    }

    // Salvar no localStorage
    try {
      localStorage.setItem("wfday-theme", newTheme);
    } catch (e) {
      // Erro silencioso
    }

    // Disparar evento
    window.dispatchEvent(
      new CustomEvent("wfday-theme-changed", {
        detail: { theme: newTheme },
      })
    );

    // Processar fontes para garantir funcionamento
    setTimeout(() => {
      WfDay.initFontSwitchers();
    }, 100);
  }

  // Método estático para inicializar troca de imagens em container específico
  static initImageSwitchers(container = document) {
    const currentTheme = WfDay.getTheme();

    // Processar imagens no container
    container
      .querySelectorAll("img[WfDay-img-day], img[WfDay-img-night]")
      .forEach((img) => {
        const dayImg = img.getAttribute("WfDay-img-day");
        const nightImg = img.getAttribute("WfDay-img-night");

        if (dayImg && nightImg) {
          img.src = currentTheme === "day" ? dayImg : nightImg;
        }
      });

    // Processar backgrounds no container
    container
      .querySelectorAll("[WfDay-bg-day], [WfDay-bg-night]")
      .forEach((element) => {
        const dayBg = element.getAttribute("WfDay-bg-day");
        const nightBg = element.getAttribute("WfDay-bg-night");

        if (dayBg && nightBg) {
          element.style.backgroundImage =
            currentTheme === "day" ? dayBg : nightBg;
        }
      });
  }

  // Método estático para inicializar troca de fontes
  static initFontSwitchers(container = document) {
    const currentTheme = WfDay.getTheme();

    // Processar fontes IMEDIATAMENTE no container especificado
    container
      .querySelectorAll("[WfDay-font-day], [WfDay-font-night]")
      .forEach((element) => {
        const dayFont = element.getAttribute("WfDay-font-day");
        const nightFont = element.getAttribute("WfDay-font-night");
        const isWeight = element.getAttribute("WfDay-font-weight") === "true";

        if (dayFont && nightFont) {
          // Resolver variáveis CSS se necessário
          const resolvedDayFont = WfDay.resolveCSSVariable(dayFont);
          const resolvedNightFont = WfDay.resolveCSSVariable(nightFont);

          if (isWeight) {
            element.style.setProperty(
              "font-weight",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          } else {
            element.style.setProperty(
              "font-family",
              currentTheme === "day" ? resolvedDayFont : resolvedNightFont,
              "important"
            );
          }

          // Forçar reflow e quebrar cache
          element.offsetHeight;
          element.style.transform = "translateZ(0)";
          element.style.transform = "";
        }
      });
  }

  /**
   * Resolve variáveis CSS para valores reais (método estático)
   */
  static resolveCSSVariable(value) {
    if (!value || typeof value !== "string") return value;

    // Se contém var(), resolver a variável
    if (value.includes("var(")) {
      try {
        // Método 1: Usar getComputedStyle no root
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);

        // Extrair nome da variável
        const match = value.match(/var\(([^)]+)\)/);
        if (match) {
          const varName = match[1].trim();
          const resolved = computedStyle.getPropertyValue(varName);
          if (resolved && resolved.trim() !== "") {
            return resolved;
          }
        }

        // Método 2: Criar elemento temporário como fallback
        const temp = document.createElement("div");
        temp.style.fontFamily = value;
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.top = "-9999px";
        temp.style.left = "-9999px";
        temp.style.width = "1px";
        temp.style.height = "1px";
        document.body.appendChild(temp);

        // Forçar reflow
        temp.offsetHeight;

        const resolved = getComputedStyle(temp).fontFamily;
        document.body.removeChild(temp);

        return resolved || value;
      } catch (error) {
        console.warn("Erro ao resolver variável CSS:", value, error);
        return value;
      }
    }

    return value;
  }

  // Compatibilidade: registrar listener para mudança de tema
  static addThemeChangeListener(callback) {
    if (typeof callback !== "function") return;
    // Registrar no dispatch central do evento
    document.addEventListener("wfday:theme-changed", (e) => {
      try {
        callback(e.detail?.theme || WfDay.getTheme());
      } catch {}
    });
  }

  // Compatibilidade: remover listener (melhor esforço)
  static removeThemeChangeListener(callback) {
    // Como adicionamos listeners anônimos acima para compatibilidade,
    // oferecemos um fallback: nada a remover de forma segura.
    // Mantemos o método por compatibilidade com chamadas existentes.
  }
}

// Classe para processar CSS customizado
class SwDayCSSProcessor {
  constructor() {
    this.dayNightRegex = /day\(([^)]+)\)\s*night\(([^)]+)\)/g;
    this.processedStyles = new Set();
  }

  processAll() {
    this.processStyleSheets();
    this.processInlineStyles();
  }

  processStyleSheets() {
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        Array.from(sheet.cssRules || []).forEach((rule) => {
          if (rule instanceof CSSStyleRule) {
            this.processRule(rule);
          }
        });
      } catch (e) {
        // Erro de CORS ou outras limitações
      }
    });
  }

  processInlineStyles() {
    document.querySelectorAll('[style*="day("]').forEach((element) => {
      this.processElementStyle(element);
    });
  }

  processRule(rule) {
    const selector = rule.selectorText;
    if (!selector || this.processedStyles.has(selector)) return;

    let modified = false;
    const properties = rule.style;

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const value = properties.getPropertyValue(property);

      if (this.dayNightRegex.test(value)) {
        const processedValue = this.processDayNightValue(value);
        if (processedValue !== value) {
          properties.setProperty(property, processedValue);
          modified = true;
        }
      }
    }

    if (modified) {
      this.processedStyles.add(selector);
    }
  }

  processElementStyle(element) {
    const style = element.style;
    let modified = false;

    for (let i = 0; i < style.length; i++) {
      const property = style[i];
      const value = style.getPropertyValue(property);

      if (this.dayNightRegex.test(value)) {
        const processedValue = this.processDayNightValue(value);
        if (processedValue !== value) {
          style.setProperty(property, processedValue);
          modified = true;
        }
      }
    }
  }

  processDayNightValue(value) {
    const theme = WfDay.getTheme();

    return value.replace(this.dayNightRegex, (match, dayValue, nightValue) => {
      // Se o valor contém var(), usar diretamente
      if (dayValue.includes("var(") || nightValue.includes("var(")) {
        return theme === "night" ? nightValue : dayValue;
      }

      // Para valores diretos, aplicar normalmente
      return theme === "night" ? nightValue : dayValue;
    });
  }
}

// Registro no WebFull
if (window.WebFull) {
  window.WebFull.modules.WfDay = WfDay;
} else if (typeof window !== "undefined") {
  window.WfDay = WfDay;
}
