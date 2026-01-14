(function (window, document) {
  "use strict";

  /**
   * WfImg - Lightbox de Imagens
   * Baseado no Lightbox2, com resize animado e loader
   * @version 7.0 - Refatorado para Classe ES6
   */
  class WfImg {
    // #region Propriedades Estáticas
    static #cssLoaded = false;
    // #endregion

    // #region Construtor
    constructor(element) {
      // Evita dupla inicialização
      if (element._wfImg) return element._wfImg;

      this.element = element;
      this.element._wfImg = this; // Marca como inicializado

      this.#init();
    }
    // #endregion

    // #region Métodos Privados
    #init() {
      this.element.addEventListener("click", (e) => {
        e.preventDefault();
        this.#handleClick();
      });
    }

    #handleClick() {
      // Buscar elementos do mesmo grupo se houver valor no atributo
      const groupName =
        this.element.getAttribute("WfImg") ||
        this.element.getAttribute("wfimg") ||
        this.element.getAttribute("WfImg");
      let groupAnchors;

      if (groupName && groupName !== "") {
        const selector = `a[WfImg="${groupName}"]`;
        groupAnchors = document.querySelectorAll(selector);
      } else {
        groupAnchors = [this.element];
      }

      WfImg.open(this.element, groupAnchors);
    }
    // #endregion

    // #region API Pública (Métodos Estáticos)
    static initAll(root = document) {
      WfImg.#loadComponentCSS();

      // Busca links com atributo WfImg
      const anchors = root.querySelectorAll
        ? root.querySelectorAll("a[WfImg]")
        : document.querySelectorAll("a[WfImg]");

      anchors.forEach((a) => new WfImg(a));

      // Se root é um elemento específico e é um link WfImg
      if (
        root.nodeType === 1 &&
        root.hasAttribute &&
        (root.hasAttribute("WfImg") ||
          root.hasAttribute("wfimg") ||
          root.hasAttribute("WfImg"))
      ) {
        new WfImg(root);
      }
    }

    static open(anchor, allEls) {
      WfImg.#loadComponentCSS();
      const group =
        anchor.getAttribute("WfImg-group") ||
        anchor.getAttribute("WfImg") ||
        anchor.dataset.wfimg ||
        "";

      // Converte NodeList/Array para Array real
      let groupEls = Array.from(allEls || [anchor]);

      // Se não foi passado allEls, tenta descobrir o grupo
      if (!allEls) {
        if (group) {
          groupEls = Array.from(
            document.querySelectorAll(
              `a[WfImg="${group}"], a[swimg="${group}"], a[sw-img="${group}"]`
            )
          );
        } else {
          groupEls = [anchor];
        }
      }

      let idx = groupEls.indexOf(anchor);
      if (idx < 0) idx = 0;

      let overlay = document.createElement("div");
      overlay.className = "wfimg-overlay";
      overlay.tabIndex = 0;
      overlay.innerHTML = `<div class="wfimg-box"><span class="wfimg-loader"></span><button class="wfimg-close" title="Fechar" style="opacity:0"></button><img class="wfimg-img" draggable="false"><div class="wfimg-caption" style="opacity:0"></div><div class="wfimg-counter" style="opacity:0"></div><button class="wfimg-arrow swimg-prev" style="display:none;opacity:0">&#10094;</button><button class="wfimg-arrow swimg-next" style="display:none;opacity:0">&#10095;</button></div>`;
      document.body.appendChild(overlay);

      const box = overlay.querySelector(".wfimg-box");
      const img = overlay.querySelector(".wfimg-img");
      const loader = overlay.querySelector(".wfimg-loader");
      const caption = overlay.querySelector(".wfimg-caption");
      const counter = overlay.querySelector(".wfimg-counter");
      const btnClose = overlay.querySelector(".wfimg-close");
      btnClose.innerHTML = "&times;";
      // Botões
      const btnPrev = overlay.querySelector(".swimg-prev");
      const btnNext = overlay.querySelector(".swimg-next");

      let loading = false,
        transitioning = false;
      let lastW = 0,
        lastH = 0;

      function show(idxNew, animate = true) {
        if (loading || transitioning) return;
        transitioning = true;
        idx = idxNew;
        const a = groupEls[idx];

        const href = a.getAttribute("WfImg-src") || a.getAttribute("href");
        const title = a.getAttribute("WfImg-title") || a.title || "";
        const alt =
          a.getAttribute("WfImg-alt") || a.querySelector("img")?.alt || "";

        img.classList.remove("wfimg-img-loaded");
        box.classList.add("wfimg-loading");
        loader.style.display = "block";
        caption.style.opacity = 0;
        counter.style.opacity = 0;
        btnPrev.style.opacity = 0;
        btnNext.style.opacity = 0;
        btnClose.style.opacity = 0;

        const preload = new window.Image();
        preload.onload = function () {
          const w = Math.min(preload.naturalWidth, window.innerWidth * 0.96);
          const h = Math.min(preload.naturalHeight, window.innerHeight * 0.8);

          const finishShow = () => {
            lastW = w;
            lastH = h;
            showNewImg();
          };

          if (animate && (Math.abs(w - lastW) > 2 || Math.abs(h - lastH) > 2)) {
            WfImg.#animateResize(box, w, h, finishShow);
          } else {
            box.style.width = w + "px";
            box.style.height = h + "px";
            finishShow();
          }
        };

        preload.onerror = function () {
          box.classList.remove("wfimg-loading");
          loader.style.display = "none";
          img.style.display = "none";

          caption.innerHTML = `<span style="color:#ff5252"><i class="wf wf-warning"></i> Erro ao carregar imagem</span><br><small>${href}</small>`;
          caption.style.opacity = 1;
          btnClose.style.opacity = 1;

          // Ajustar tamanho para msg de erro
          box.style.width = "300px";
          box.style.height = "auto";
          box.style.padding = "20px";

          loading = false;
          transitioning = false;
        };

        preload.src = href;

        function showNewImg() {
          setTimeout(() => {
            img.src = href;
            img.alt = alt;
            img.onload = () => {
              void img.offsetWidth; // Force reflow

              img.classList.add("wfimg-img-loaded");
              box.classList.remove("wfimg-loading");
              loader.style.display = "none";

              setTimeout(() => {
                caption.style.opacity = 1;
                counter.style.opacity = 1;
                btnClose.style.opacity = 1;

                if (groupEls.length > 1) {
                  btnPrev.style.display = "";
                  btnNext.style.display = "";
                  btnPrev.style.opacity = 1;
                  btnNext.style.opacity = 1;
                } else {
                  btnPrev.style.display = "none";
                  btnNext.style.display = "none";
                }

                loading = false;
                transitioning = false;
              }, 300);
            };
          }, 50);
        }

        try {
          const containsHtml =
            typeof title === "string" && /<[^>]+>/.test(title);
          const allowHtmlAttr =
            a.hasAttribute("WfImg-html") &&
            a.getAttribute("WfImg-html") !== "false";
          if ((allowHtmlAttr || containsHtml) && title) {
            caption.innerHTML = title;
          } else {
            caption.textContent = title || "";
          }
        } catch (err) {
          caption.textContent = title || "";
        }
        counter.textContent =
          groupEls.length > 1 ? `Imagem ${idx + 1} de ${groupEls.length}` : "";
      }

      function close() {
        WfImg.#animateBoxOut(overlay, box, () => {
          overlay.classList.remove("wfimg-open");
          setTimeout(() => {
            overlay.remove();
          }, 400);
          document.removeEventListener("keydown", onKey);
        });
      }

      function prev() {
        if (idx > 0) show(idx - 1);
        else show(groupEls.length - 1);
      }

      function next() {
        if (idx < groupEls.length - 1) show(idx + 1);
        else show(0);
      }

      function onKey(e) {
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }

      overlay.onclick = (e) => {
        if (e.target === overlay) close();
      };
      btnClose.onclick = close;
      btnPrev.onclick = prev;
      btnNext.onclick = next;
      document.addEventListener("keydown", onKey);

      setTimeout(() => {
        overlay.classList.add("wfimg-open");
        WfImg.#animateBoxIn(overlay, box, () => {
          setTimeout(() => {
            show(idx, false);
          }, 100);
        });
      }, 10);
    }
    // #endregion

    // #region Métodos Estáticos Privados (Helpers)
    static #animateBoxIn(overlay, box, cb) {
      setTimeout(() => {
        overlay.classList.add("wfimg-box-in");
        setTimeout(cb, 400);
      }, 10);
    }

    static #animateBoxOut(overlay, box, cb) {
      overlay.classList.remove("wfimg-box-in");
      setTimeout(cb, 400);
    }

    static #animateResize(box, w, h, cb) {
      box.style.transition =
        "width 0.4s cubic-bezier(.23,1,.32,1), height 0.4s cubic-bezier(.23,1,.32,1)";
      box.style.width = w + "px";
      box.style.height = h + "px";
      setTimeout(() => {
        box.style.transition = "";
        cb();
      }, 400);
    }

    static #loadComponentCSS() {
      if (this.#cssLoaded || document.getElementById("wfimg-css")) {
        this.#cssLoaded = true;
        return;
      }
      const style = document.createElement("style");
      style.id = "wfimg-css";
      style.textContent = `
/* WfImg - Lightbox de Imagens */

.wfimg-overlay {
   position: fixed; left:0; top:0; width:100vw; height:100vh;
   background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center;
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1); pointer-events: none;
}
.wfimg-overlay.wfimg-open { opacity: 1; pointer-events: auto; }

.wfimg-box {
   position: relative; display: flex; flex-direction: column; align-items: center;
   background: none; border-radius: 8px; box-shadow: 0 8px 32px #000a;
   opacity: 0; transform: scale(0.7); transition: all 0.4s cubic-bezier(.23,1,.32,1);
   max-width: 96vw; max-height: 92vh; min-width: 40px; min-height: 40px;
   overflow: visible; width: auto; height: auto;
}
.wfimg-overlay.wfimg-box-in .wfimg-box { opacity: 1; transform: scale(1); }

.wfimg-img {
   display: block; max-width: 96vw; max-height: 80vh; border-radius: 6px;
   background: #222; opacity: 0; transition: opacity 0.6s cubic-bezier(.23,1,.32,1);
   box-shadow: 0 8px 32px #000a; width: auto; height: auto;
}
.wfimg-img.wfimg-img-loaded { opacity: 1; }

.wfimg-caption { 
   color: #fff; margin: 10px 0 0 0; font-size: 1.1em; text-align: center; text-shadow: 0 2px 8px #000b; 
   opacity: 0; transition: opacity 0.5s cubic-bezier(.23,1,.32,1);
}
.wfimg-counter { 
   color: #bbb; font-size: 0.95em; margin-top: 2px; text-align: center; 
   opacity: 0; transition: opacity 0.5s cubic-bezier(.23,1,.32,1);
}
.wfimg-close { 
   position: absolute; top: -6px; right: 12px; font-size: 2.2em; color: #fff; background: none; border: none; cursor: pointer; z-index: 2; text-shadow: 0 2px 8px #000b; 
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1);
}

.wfimg-arrow {
   position: absolute; top: 50%; transform: translateY(-50%); font-size: 3em; color: #fff; background: none; border: none; cursor: pointer; z-index: 2;
   opacity: 0; transition: opacity 0.4s cubic-bezier(.23,1,.32,1); text-shadow: 0 2px 8px #000b;
}
.wfimg-arrow:hover { opacity: 1 !important; }
.wfimg-arrow.swimg-prev { left: 12px; }
.wfimg-arrow.swimg-next { right: 12px; }

.wfimg-loader { 
   position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 48px; height: 48px; border: 5px solid #fff3; border-top: 5px solid #fff; border-radius: 50%; animation: wfimg-spin 1s linear infinite; z-index: 10; display: none; 
   opacity: 0; transition: opacity 0.3s ease;
}
.wfimg-box.wfimg-loading .wfimg-loader { display: block; opacity: 1; }
@keyframes wfimg-spin { 100% { transform: translate(-50%,-50%) rotate(360deg); } }

@media (max-width: 600px) {
   .wfimg-img { max-width: 98vw; max-height: 60vh; }
   .wfimg-caption { font-size: 1em; }
   .wfimg-arrow { font-size: 2.2em; }
   .wfimg-close { font-size: 1.7em; }
}
      `;
      document.head.appendChild(style);
      this.#cssLoaded = true;
    }
    // #endregion
  }

  // Global Export
  if (typeof window !== "undefined") {
    window.WfImg = WfImg;

    // Registrar no WebFull quando disponível
    if (typeof window.WebFull !== "undefined" && window.WebFull.modules) {
      window.WebFull.modules.WfImg = WfImg;
    }

    // Auto-init
    const init = () => {
      WfImg.initAll();

      // Observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            shouldInit = true;
          }
        });
        if (shouldInit) {
          WfImg.initAll();
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
