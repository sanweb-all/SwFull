class WfBadge {
  constructor(element, options = {}) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    } else if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      console.warn("WfBadge: elemento inválido.");
      return;
    }
    this.type = options.type || "primary"; // primary, success, warning, danger, info
    this.init();
  }

  init() {
    if (!this.element.classList.contains("wfbadge")) {
      this.element.classList.add("wfbadge");
    }
    const existing = Array.from(this.element.classList).find(
      (c) => c.startsWith("wfbadge-") && c !== "wfbadge"
    );
    if (!existing) {
      this.element.classList.add(`wfbadge-${this.type}`);
    }
  }

  setContent(content) {
    this.element.textContent = content;
  }

  setType(type) {
    this.element.classList.remove(`wfbadge-${this.type}`);
    this.type = type;
    this.element.classList.add(`wfbadge-${this.type}`);
  }

  static initAll(container = document) {
    const badges = container.querySelectorAll(
      `[WfBadge], .wfbadge, .wfbadge-prin, .wfbadge-suce, .wfbadge-aler, .wfbadge-peri, .wfbadge-info`
    );
    badges.forEach((badge) => new WfBadge(badge));
  }
}

// CSS padrão do WfBadge
(function () {
  if (document.getElementById("wfbadge-css")) return;
  const style = document.createElement("style");
  style.id = "wfbadge-css";
  style.textContent = `
  [WfBadge]{display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:999px;font-size:12px;line-height:1;border:1px solid var(--wf-border);background:var(--wf-bg);color:var(--wf-color)}
  .wfbadge-primary{background:var(--princ);border-color:var(--princ);color:var(--bran)}
  .wfbadge-success{background:var(--suces);border-color:var(--suces);color:var(--bran)}
  .wfbadge-warning{background:var(--alert);border-color:var(--alert);color:var(--neut11)}
  .wfbadge-danger{background:var(--perig);border-color:var(--perig);color:var(--bran)}
  .wfbadge-info{background:var(--infor);border-color:var(--infor);color:var(--bran)}
  .wfbadge-prin{background:var(--princ);border-color:var(--princ);color:var(--bran)}
  .wfbadge-suce{background:var(--suces);border-color:var(--suces);color:var(--bran)}
  .wfbadge-aler{background:var(--alert);border-color:var(--alert);color:var(--neut11)}
  .wfbadge-peri{background:var(--perig);border-color:var(--perig);color:var(--bran)}
  .wfbadge-info{background:var(--infor);border-color:var(--infor);color:var(--bran)}
  `;
  document.head.appendChild(style);
})();

// Registro no WebFull
if (window.WebFull) {
    window.WebFull.modules.WfBadge = WfBadge;
} else if (typeof window !== "undefined") {
    window.WfBadge = WfBadge;
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== "undefined" && !window.WebFull) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => WfBadge.initAll());
  } else {
    WfBadge.initAll();
  }
}
