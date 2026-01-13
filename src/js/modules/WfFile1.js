(function (window, document) {
  "use strict";

  // WfFile1.js - Componente de upload de imagem moderno
  // Uso: <div WfFile1></div>

  class WfFile1 {
    constructor(container, options = {}) {
      this.options = Object.assign(
        {
          accept: ["image/*"],
          onSelect: null,
          theme: "auto",
        },
        options
      );
      this.container =
        typeof container === "string"
          ? document.querySelector(container)
          : container;
      if (!this.container) return;
      if (this.container._wfFile1) return; // Evita reinicialização
      this.container._wfFile1 = this;

      // WfFile1.injectCSS(); // CSS moved to webfull.css

      // NOVO: detectar data-theme
      this.localTheme = this.container.getAttribute("data-theme");
      this.render();
      this.bindEvents();
      this.applyTheme();
    }

    render() {
      this.container.classList.add("wffile1-box");
      const acceptStr = Array.isArray(this.options.accept)
        ? this.options.accept.join(",")
        : String(this.options.accept || "image/*");
      this.container.innerHTML = `
      <div class="wffile1-label">Envio de Imagem</div>
      <div class="wffile1-info">Formatos: jpg | png | gif | webp</div>
      <div class="wffile1-dropzone" tabindex="0">
        <div class="wffile1-icon"><i class="wf wf-upload"></i></div>
        <div class="wffile1-text"><b>Clique para selecionar</b><br><span>ou arraste e solte aqui</span></div>
        <input type="file" class="wffile1-input" accept="${acceptStr}" multiple style="display:none" />
      </div>
      <div class="wffile1-preview" style="display:none"></div>
      <div class="wffile1-error" style="display:none"></div>
    `;
      this.dropzone = this.container.querySelector(".wffile1-dropzone");
      this.input = this.container.querySelector(".wffile1-input");
      this.preview = this.container.querySelector(".wffile1-preview");
      this.error = this.container.querySelector(".wffile1-error");
    }

    bindEvents() {
      this.dropzone.addEventListener("click", () => this.input.click());
      this.dropzone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") this.input.click();
      });
      this.input.addEventListener("change", (e) =>
        this.handleFiles(e.target.files)
      );
      this.dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        this.dropzone.classList.add("wffile1-drag");
      });
      this.dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("wffile1-drag");
      });
      this.dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("wffile1-drag");
        this.handleFiles(e.dataTransfer.files);
      });
    }

    handleFiles(files) {
      if (!files || !files.length) return;
      let validFiles = [];
      let error = null;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ok = (() => {
          const accepts = Array.isArray(this.options.accept)
            ? this.options.accept
            : [String(this.options.accept || "image/*")];
          return accepts.some((acc) => {
            acc = String(acc);
            if (acc.endsWith("/*")) {
              const pref = acc.slice(0, acc.length - 2);
              return String(file.type || "").startsWith(pref);
            }
            return acc === file.type;
          });
        })();
        if (!ok) {
          error = "Formato não suportado.";
          continue;
        }
        validFiles.push(file);
      }
      if (error && validFiles.length === 0) {
        this.showError(error);
        return;
      }
      this.showPreviews(validFiles);
      this.error.style.display = "none";
      if (typeof this.options.onSelect === "function") {
        validFiles.forEach((file) => this.options.onSelect(file));
      }
    }

    showPreviews(files) {
      if (!files || !files.length) return;
      this.preview.style.display = "flex";
      files.forEach((file) => {
        const wrapper = document.createElement("a");
        wrapper.className = "wffile1-link";
        wrapper.setAttribute("WfImg", "");
        wrapper.setAttribute("data-name", file.name);
        wrapper.setAttribute("WfImg-title", file.name);

        const img = document.createElement("img");
        img.className = "wffile1-img";
        img.alt = file.name;
        wrapper.appendChild(img);

        const remove = document.createElement("span");
        remove.className = "wffile1-remove";
        remove.title = "Remover imagem";
        remove.textContent = "×";
        wrapper.appendChild(remove);

        remove.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            wrapper.remove();
          } catch (_) {}
        });

        this.preview.appendChild(wrapper);

        const reader = new FileReader();
        reader.onload = (e) => {
          wrapper.setAttribute("WfImg-src", e.target.result);
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
      // Inicializa WfImg nas imagens de preview
      try {
        const initSwImg = () => {
          if (window.WfImg && typeof window.WfImg.initAll === "function") {
            window.WfImg.initAll(this.preview);
          } else if (
            window.SwPlugin &&
            typeof window.SwPlugin.initComponent === "function"
          ) {
            window.SwPlugin.initComponent("WfImg", this.preview);
          }
        };
        if (window.WebfullLoader) {
          window.WebfullLoader.load("sw-img").then(initSwImg).catch(initSwImg);
        } else {
          initSwImg();
        }
      } catch (_) {}
    }

    showError(msg) {
      this.error.textContent = msg;
      this.error.style.display = "block";
      this.preview.style.display = "none";
    }

    applyTheme() {
      // Suporte a tema local via data-theme
      if (this.localTheme === "day") {
        this.container.classList.remove("wffile1-dark");
        this.container.classList.add("wffile1-day");
        return;
      } else if (this.localTheme === "night") {
        this.container.classList.remove("wffile1-day");
        this.container.classList.add("wffile1-dark");
        return;
      }
      // Integração com WfDay (modo claro/escuro)
      const updateTheme = () => {
        let theme = "day";
        try {
          if (window.WfDay && typeof window.WfDay.getTheme === "function") {
            theme = window.WfDay.getTheme();
          } else if (
            document.documentElement.classList.contains("wfday-night")
          ) {
            theme = "night";
          }
        } catch (_) {}
        this.container.classList.remove("wffile1-day", "wffile1-dark");
        this.container.classList.add(
          theme === "night" ? "wffile1-dark" : "wffile1-day"
        );
      };
      updateTheme();
    window.addEventListener("wfday-theme-changed", updateTheme);
  }

  static initAll(container = document) {
      const els = (
        container instanceof HTMLElement ? container : document
      ).querySelectorAll("[WfFile1]");
      els.forEach((el) => {
        if (el._wfFile1) return;
        const cbName =
          el.getAttribute("data-wffile1-callback") ||
          el.getAttribute("data-swfile1-callback");
        let cb = null;
        if (cbName === "alert") {
          cb = (file) => alert("Arquivo selecionado: " + file.name);
        } else if (cbName === "console") {
          cb = (file) => console.log("Arquivo selecionado:", file);
        } else if (cbName && typeof window[cbName] === "function") {
          cb = window[cbName];
        }
        const acceptAttr =
          el.getAttribute("WfFile1-accept") ||
          el.getAttribute("wffile1-accept") ||
          el.getAttribute("data-accept") ||
          el.getAttribute("accept");
        let opts = {};
        if (cb) opts.onSelect = cb;
        if (acceptAttr) {
          opts.accept = String(acceptAttr)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        new WfFile1(el, Object.keys(opts).length ? opts : undefined);
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfFile1 = WfFile1;
    }
    window.WfFile1 = WfFile1;

    // Auto-init
    const init = () => {
      WfFile1.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        for (const mutation of mutations) {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1) {
                if (
                  (node.hasAttribute && node.hasAttribute("WfFile1")) ||
                  (node.querySelector && node.querySelector("[WfFile1]"))
                ) {
                  shouldInit = true;
                  break;
                }
              }
            }
          }
          if (shouldInit) break;
        }
        if (shouldInit) {
          WfFile1.initAll();
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
