(function (window, document) {
  "use strict";

  class WfScrollSpy {
    constructor(navContainer, options = {}) {
      if (typeof navContainer === "string") {
        this.navContainer = document.querySelector(navContainer);
      } else {
        this.navContainer = navContainer;
      }

      if (!this.navContainer) {
        console.warn("WfScrollSpy: container element not found.");
        return;
      }

      // Evita dupla inicialização
      if (this.navContainer._wfScrollSpy) return this.navContainer._wfScrollSpy;
      this.navContainer._wfScrollSpy = this;

      this.options = Object.assign(
        {
          activeClass: "active",
          sectionSelector: "section",
          offset: 0,
          useObserver: true,
        },
        options
      );

      this.navLinks = Array.from(
        this.navContainer.querySelectorAll('a[href^="#"]')
      );
      this.sections = this.navLinks
        .map((link) => {
          const id = link.getAttribute("href").substring(1);
          return document.getElementById(id);
        })
        .filter((section) => section !== null);

      this.setActive = this.setActive.bind(this);
      this.onScroll = this.onScroll.bind(this);

      if (
        this.options.useObserver &&
        typeof IntersectionObserver !== "undefined"
      ) {
        const observer = new IntersectionObserver(
          (entries) => {
            let best = { idx: -1, ratio: 0 };
            entries.forEach((entry) => {
              const idx = this.sections.indexOf(entry.target);
              if (
                entry.isIntersecting &&
                entry.intersectionRatio >= best.ratio
              ) {
                best = { idx, ratio: entry.intersectionRatio };
              }
            });
            if (best.idx !== -1) this.setActive(best.idx);
          },
          {
            root: null,
            rootMargin: `-${this.options.offset}px 0px -40% 0px`,
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        );
        this.sections.forEach((sec) => observer.observe(sec));
        this._observer = observer;
      } else {
        window.addEventListener("scroll", this.onScroll);
        this.onScroll();
      }
      // Initial mark
      this.onScroll();
    }

    setActive(index) {
      this.navLinks.forEach((link, i) => {
        if (i === index) {
          link.classList.add(this.options.activeClass);
          link.setAttribute("aria-current", "true");
        } else {
          link.classList.remove(this.options.activeClass);
          link.removeAttribute("aria-current");
        }
      });
      this.sections.forEach((sec, i) => {
        if (i === index) sec.classList.add("inview");
        else sec.classList.remove("inview");
      });
    }

    onScroll() {
      const scrollPos = window.scrollY + this.options.offset + 1;
      let currentSectionIndex = -1;
      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i];
        if (section.offsetTop <= scrollPos) {
          currentSectionIndex = i;
        } else {
          break;
        }
      }
      if (currentSectionIndex !== -1) this.setActive(currentSectionIndex);
    }

    static initAll(container = document) {
      const elements = container.querySelectorAll("[WfScrollSpy]");
      elements.forEach((el) => {
        const off = parseInt(el.getAttribute("WfScrollSpy-offset") || "0", 10);
        new WfScrollSpy(el, { offset: isNaN(off) ? 0 : off });
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfScrollSpy = WfScrollSpy;
    }
    window.WfScrollSpy = WfScrollSpy;

    // Auto-init
    const init = () => {
      WfScrollSpy.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfScrollSpy.initAll();
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
