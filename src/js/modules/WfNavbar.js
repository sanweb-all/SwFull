(function (window, document) {
  "use strict";

  class WfNavbar {
    constructor(element) {
      if (element._wfNavbar) return element._wfNavbar;
      this.element = element;
      this.element._wfNavbar = this;
      this.init();
    }

    init() {
      WfNavbar.injectCSS();

      let expandAttr = (
        this.element.getAttribute("data-expand") || "lg"
      ).toLowerCase();
      const allowed = ["sm", "md", "lg", "xl", "none"];
      if (allowed.indexOf(expandAttr) === -1) expandAttr = "lg";
      this.expand = expandAttr;
      if (expandAttr !== "none") {
        this.element.classList.add("wfnavbar-expand-" + expandAttr);
      }

      const themeAttr = (
        this.element.getAttribute("data-theme") || "light"
      ).toLowerCase();
      if (themeAttr === "dark") {
        this.element.classList.add("wfnavbar-theme-dark");
      } else {
        this.element.classList.add("wfnavbar-theme-light");
      }

      const alignAttr = (
        this.element.getAttribute("data-menu-align") || ""
      ).toLowerCase();
      if (alignAttr === "center") {
        this.element.classList.add("wfnavbar-menu-center");
      } else if (alignAttr === "right") {
        this.element.classList.add("wfnavbar-menu-right");
      }

      this.toggleBtn = this.element.querySelector(".wfnavbar-toggle");
      this.collapse = this.element.querySelector(".wfnavbar-collapse");
      this.nav = this.element.querySelector(".wfnavbar-nav");

      this.bindToggle();
      this.bindDropdowns();
    }

    bindToggle() {
      if (!this.toggleBtn || !this.collapse) return;
      this.toggleBtn.setAttribute("aria-expanded", "false");
      this.toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = this.element.classList.toggle("wfnavbar-open");
        this.toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    bindDropdowns() {
      if (!this.nav) return;

      const items = this.nav.querySelectorAll("li");
      const self = this;

      items.forEach(function (li) {
        const submenu = li.querySelector("ul");
        const link = li.querySelector("a");
        if (!submenu || !link) return;

        li.classList.add("wfnavbar-has-submenu");

        link.addEventListener("click", function (e) {
          if (!self.isMobile()) return;
          if (!li.classList.contains("wfnavbar-sub-open")) {
            e.preventDefault();
            self.closeSubmenus(self.nav);
            li.classList.add("wfnavbar-sub-open");
          }
        });
      });

      document.addEventListener("click", (e) => {
        if (!this.element.contains(e.target)) {
          this.element.classList.remove("wfnavbar-open");
          this.closeSubmenus(this.nav);
        }
      });
    }

    closeSubmenus(container) {
      if (!container) return;
      const opened = container.querySelectorAll(".wfnavbar-sub-open");
      opened.forEach(function (li) {
        li.classList.remove("wfnavbar-sub-open");
      });
    }

    getBreakpoint() {
      if (this.expand === "sm") return 576;
      if (this.expand === "md") return 768;
      if (this.expand === "lg") return 992;
      if (this.expand === "xl") return 1200;
      return Infinity;
    }

    isMobile() {
      return window.innerWidth < this.getBreakpoint();
    }

    static injectCSS() {
      if (document.getElementById("wfnavbar-css")) return;
      const style = document.createElement("style");
      style.id = "wfnavbar-css";
      style.textContent =
        "[WfNavbar]{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;position:relative;z-index:1000;}" +
        "[WfNavbar] .wfnavbar-container{display:flex;align-items:center;width:100%;gap:16px;}" +
        "[WfNavbar] .wfnavbar-brand{font-size:1.1rem;font-weight:600;text-decoration:none;white-space:nowrap;color:inherit;}" +
        "[WfNavbar] .wfnavbar-toggle{display:inline-flex;flex-direction:column;justify-content:center;gap:4px;width:32px;height:28px;border:none;background:transparent;cursor:pointer;color:inherit;padding:0;}" +
        "[WfNavbar] .wfnavbar-toggle span{display:block;height:2px;width:100%;border-radius:999px;background:currentColor;transition:transform .2s ease,opacity .2s ease;}" +
        "[WfNavbar].wfnavbar-open .wfnavbar-toggle span:nth-child(1){transform:translateY(6px) rotate(45deg);}" +
        "[WfNavbar].wfnavbar-open .wfnavbar-toggle span:nth-child(2){opacity:0;}" +
        "[WfNavbar].wfnavbar-open .wfnavbar-toggle span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}" +
        "[WfNavbar] .wfnavbar-collapse{display:none;width:100%;}" +
        "[WfNavbar].wfnavbar-open .wfnavbar-collapse{display:flex;}" +
        "[WfNavbar] .wfnavbar-nav{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px;width:100%;}" +
        "[WfNavbar] .wfnavbar-nav li{position:relative;}" +
        "[WfNavbar] .wfnavbar-nav a{display:block;padding:8px 10px;text-decoration:none;color:inherit;transition:opacity .18s ease;}" +
        "[WfNavbar] .wfnavbar-nav a:hover{opacity:.85;}" +
        "[WfNavbar] .wfnavbar-nav li ul{position:static;display:none;margin:0;padding:6px 0;list-style:none;}" +
        "[WfNavbar] .wfnavbar-sub-open>ul{display:block;opacity:1;visibility:visible;transform:none;}" +
        "[WfNavbar] .wfnavbar-nav li ul li a{padding:8px 14px;}" +
        "[WfNavbar] .wfnavbar-has-submenu>a{position:relative;padding-right:18px;}" +
        "[WfNavbar] .wfnavbar-has-submenu>a::after{content:'▾';position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:.6em;opacity:.7;}" +
        "[WfNavbar] .wfnavbar-sub-open>a::after{transform:translateY(-50%) rotate(180deg);}" +
        "[WfNavbar].wfnavbar-theme-light{background:#ffffff;color:#333333;box-shadow:0 2px 6px rgba(0,0,0,.04);}" +
        "[WfNavbar].wfnavbar-theme-light .wfnavbar-nav li ul{background:#ffffff;box-shadow:0 8px 18px rgba(0,0,0,.08);}" +
        "[WfNavbar].wfnavbar-theme-dark{background:#111111;color:#f5f5f5;}" +
        "[WfNavbar].wfnavbar-theme-dark .wfnavbar-nav a{color:#f5f5f5;}" +
        "[WfNavbar].wfnavbar-theme-dark .wfnavbar-nav li ul{background:#1a1a1a;box-shadow:0 8px 18px rgba(0,0,0,.5);}" +
        "[WfNavbar].wfnavbar-menu-center .wfnavbar-nav{justify-content:center;}" +
        "[WfNavbar].wfnavbar-menu-right .wfnavbar-nav{justify-content:flex-end;}" +
        "[WfNavbar] .wfnavbar-ms-auto{margin-left:auto;}" +
        "@media (min-width:576px){" +
        "[WfNavbar].wfnavbar-expand-sm .wfnavbar-toggle{display:none;}" +
        "[WfNavbar].wfnavbar-expand-sm .wfnavbar-collapse{display:flex!important;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-sm .wfnavbar-nav{flex-direction:row;align-items:center;gap:12px;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-sm .wfnavbar-nav li ul{position:absolute;top:100%;left:0;min-width:220px;display:block;opacity:0;visibility:hidden;transform:translateY(8px);}" +
        "[WfNavbar].wfnavbar-expand-sm .wfnavbar-nav li:hover>ul{opacity:1;visibility:visible;transform:translateY(0);}" +
        "}" +
        "@media (min-width:768px){" +
        "[WfNavbar].wfnavbar-expand-md .wfnavbar-toggle{display:none;}" +
        "[WfNavbar].wfnavbar-expand-md .wfnavbar-collapse{display:flex!important;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-md .wfnavbar-nav{flex-direction:row;align-items:center;gap:12px;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-md .wfnavbar-nav li ul{position:absolute;top:100%;left:0;min-width:220px;display:block;opacity:0;visibility:hidden;transform:translateY(8px);}" +
        "[WfNavbar].wfnavbar-expand-md .wfnavbar-nav li:hover>ul{opacity:1;visibility:visible;transform:translateY(0);}" +
        "}" +
        "@media (min-width:992px){" +
        "[WfNavbar].wfnavbar-expand-lg .wfnavbar-toggle{display:none;}" +
        "[WfNavbar].wfnavbar-expand-lg .wfnavbar-collapse{display:flex!important;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-lg .wfnavbar-nav{flex-direction:row;align-items:center;gap:12px;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-lg .wfnavbar-nav li ul{position:absolute;top:100%;left:0;min-width:220px;display:block;opacity:0;visibility:hidden;transform:translateY(8px);}" +
        "[WfNavbar].wfnavbar-expand-lg .wfnavbar-nav li:hover>ul{opacity:1;visibility:visible;transform:translateY(0);}" +
        "}" +
        "@media (min-width:1200px){" +
        "[WfNavbar].wfnavbar-expand-xl .wfnavbar-toggle{display:none;}" +
        "[WfNavbar].wfnavbar-expand-xl .wfnavbar-collapse{display:flex!important;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-xl .wfnavbar-nav{flex-direction:row;align-items:center;gap:12px;width:auto;}" +
        "[WfNavbar].wfnavbar-expand-xl .wfnavbar-nav li ul{position:absolute;top:100%;left:0;min-width:220px;display:block;opacity:0;visibility:hidden;transform:translateY(8px);}" +
        "[WfNavbar].wfnavbar-expand-xl .wfnavbar-nav li:hover>ul{opacity:1;visibility:visible;transform:translateY(0);}" +
        "}";
      document.head.appendChild(style);
    }

    static initAll(container = document) {
      const els = container.querySelectorAll("[WfNavbar]");
      els.forEach(function (el) {
        new WfNavbar(el);
      });
    }
  }

  if (typeof window !== "undefined") {
    window.WfNavbar = WfNavbar;
    if (window.WebFull && window.WebFull.modules)
      window.WebFull.modules.WfNavbar = WfNavbar;

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        WfNavbar.initAll();
      });
    } else {
      WfNavbar.initAll();
    }
  }
})(window, document);
