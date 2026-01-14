(function (window, document) {
  "use strict";

  class WfFile2 {
    static initAll(container = document) {
      // Cria o input file global, invisível e fora do fluxo AJAX, se ainda não existir
      if (!window._inputFileGlobal) {
        window._inputFileGlobal = document.createElement("input");
        window._inputFileGlobal.type = "file";
        window._inputFileGlobal.style.position = "absolute";
        window._inputFileGlobal.style.left = "-9999px";
        window._inputFileGlobal.id = "inputfileglobal";
        document.body.appendChild(window._inputFileGlobal);
      }
      const list = [];
      const root = container instanceof HTMLElement ? container : document;

      if (root.hasAttribute && root.hasAttribute("WfFile2")) list.push(root);

      root
        .querySelectorAll("span[WfFile2], [WfFile2]")
        .forEach((el) => list.push(el));

      list.forEach((el, idx) => {
        // Evita dupla inicialização
        if (el._wfFile2) return;
        el._wfFile2 = true;
        el._wffile2_files = [];

        // Lê atributos
        const accept = el.getAttribute("accept") || "image/*";
        const multiple = el.hasAttribute("multiple");
        const name = el.getAttribute("name") || "arquivo";
        const previewSelector = el.getAttribute("data-preview");
        const id =
          el.getAttribute("id") ||
          "wffile2-" + idx + "-" + Math.floor(Math.random() * 10000);

        // Cria estrutura interna usando classes CSS (sem estilos inline)
        el.innerHTML = `
        <label class="wffile2-btn" for="${id}">
          <span class="wffile2-icon"><i class='wf wf-file'></i></span>
          <span class="wffile2-text">Selecionar arquivo</span>
        </label>
      `;
        const label = el.querySelector(".wffile2-btn");

        // Se houver destino de preview (img externa), garantir que fique oculto inicialmente
        if (previewSelector) {
          try {
            const tgt = document.querySelector(previewSelector);
            if (tgt && tgt.tagName === "IMG") {
              tgt.removeAttribute("src");
              tgt.style.display = "none";
            }
          } catch (_) {}
        }

        if (!previewSelector) {
          const box = document.createElement("div");
          box.className = "wffile2-preview-box";
          // display: none é controlado via classe ou inline inicial
          box.style.display = "none";

          const img = document.createElement("img");
          img.className = "wffile2-preview-img";
          img.alt = "Preview";

          const remove = document.createElement("span");
          remove.className = "wffile2-remove";
          remove.title = "Remover imagem";
          remove.textContent = "×";

          box.appendChild(img);
          box.appendChild(remove);
          el.appendChild(box);

          remove.addEventListener("click", function () {
            try {
              img.src = "";
            } catch (_) {}
            box.style.display = "none";
            if (!multiple) {
              window._inputFileGlobal.value = "";
            } else {
              box.innerHTML = "";
            }
          });

          el._wffile2_box = box;
          el._wffile2_img = img;
        }

        // Associa o input de arquivo ao label
        label.addEventListener("click", function (e) {
          e.preventDefault();

          window._inputFileGlobal.accept = accept;
          window._inputFileGlobal.multiple = multiple;
          window._inputFileGlobal.name = name;
          window._inputFileGlobal.value = ""; // Limpa antes de abrir

          // Define o que fazer quando um arquivo for selecionado
          window._inputFileGlobal.onchange = function () {
            if (!this.files || this.files.length === 0) return;

            const files = Array.from(this.files);
            el._wffile2_files = files;

            const syncGlobalFiles = function () {
              if (!window._inputFileGlobal) return;
              try {
                const dt = new DataTransfer();
                (el._wffile2_files || []).forEach((file) => dt.items.add(file));
                window._inputFileGlobal.files = dt.files;
              } catch (_) {
                try {
                  window._inputFileGlobal.value = "";
                } catch (_) {}
              }
            };

            const previewTarget = previewSelector
              ? document.querySelector(previewSelector)
              : null;

            const initWfImg = (scope) => {
              try {
                if (
                  window.WfImg &&
                  typeof window.WfImg.initAll === "function"
                ) {
                  window.WfImg.initAll(scope);
                } else if (
                  window.SwPlugin &&
                  typeof window.SwPlugin.initComponent === "function"
                ) {
                  window.SwPlugin.initComponent("WfImg", scope);
                }
              } catch (_) {}
            };

            if (previewTarget) {
              previewTarget.innerHTML = "";

              if (multiple) {
                files.forEach((file) => {
                  const item = document.createElement("span");
                  item.className = "wffile2-link";
                  item.setAttribute("WfImg", "");
                  item.setAttribute("WfImg-title", file.name);

                  const img = document.createElement("img");
                  img.src = "";
                  img.className = "wffile2-preview-img wffile2-gallery-img";

                  const remove = document.createElement("span");
                  remove.className = "wffile2-remove";
                  remove.title = "Remover imagem";
                  remove.textContent = "×";

                  item.appendChild(img);
                  item.appendChild(remove);
                  previewTarget.appendChild(item);

                  remove.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    el._wffile2_files = (el._wffile2_files || []).filter(
                      (f) => f !== file
                    );
                    syncGlobalFiles();
                    try {
                      item.remove();
                    } catch (_) {}
                  });

                  const reader = new FileReader();
                  reader.onload = function (e) {
                    img.src = e.target.result;
                    item.setAttribute("WfImg-src", e.target.result);
                    initWfImg(previewTarget);
                  };
                  reader.readAsDataURL(file);
                });
              } else {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = function (e) {
                  if (previewTarget.tagName === "IMG") {
                    try {
                      previewTarget.classList.add("wffile2-preview-img");
                    } catch (_) {}

                    let wrapper = previewTarget._wffile2_wrapper;
                    if (!wrapper) {
                      wrapper = document.createElement("span");
                      wrapper.className = "wffile2-link";
                      wrapper.setAttribute("WfImg", "");
                      wrapper.setAttribute("WfImg-title", file.name);
                      const parent = previewTarget.parentNode;
                      if (parent) {
                        parent.insertBefore(wrapper, previewTarget);
                        wrapper.appendChild(previewTarget);
                      }
                      previewTarget._wffile2_wrapper = wrapper;
                    }

                    previewTarget.src = e.target.result;
                    previewTarget.style.display = "block";
                    wrapper.setAttribute("WfImg-src", e.target.result);
                    initWfImg(wrapper.parentNode);

                    let remove = previewTarget._wffile2_remove;
                    if (!remove) {
                      remove = document.createElement("span");
                      remove.className = "wffile2-remove";
                      remove.title = "Remover imagem";
                      remove.textContent = "×";
                      if (wrapper) {
                        wrapper.appendChild(remove);
                      } else if (previewTarget.parentNode) {
                        previewTarget.parentNode.appendChild(remove);
                      }
                      previewTarget._wffile2_remove = remove;
                    }

                    remove.onclick = function (ev) {
                      ev.preventDefault();
                      ev.stopPropagation();
                      try {
                        previewTarget.src = "";
                        previewTarget.style.display = "none";
                      } catch (_) {}
                      el._wffile2_files = [];
                      syncGlobalFiles();
                    };
                  } else {
                    const item = document.createElement("span");
                    item.className = "wffile2-link";
                    item.setAttribute("WfImg", "");
                    item.setAttribute("WfImg-title", file.name);

                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.className = "wffile2-preview-img";

                    const remove = document.createElement("span");
                    remove.className = "wffile2-remove";
                    remove.title = "Remover imagem";
                    remove.textContent = "×";

                    item.appendChild(img);
                    item.appendChild(remove);
                    previewTarget.appendChild(item);

                    remove.addEventListener("click", function (ev) {
                      ev.preventDefault();
                      ev.stopPropagation();
                      el._wffile2_files = [];
                      syncGlobalFiles();
                      try {
                        item.remove();
                      } catch (_) {}
                    });
                    item.setAttribute("WfImg-src", e.target.result);
                    initWfImg(previewTarget);
                  }
                };
                reader.readAsDataURL(file);
              }
            } else if (el._wffile2_box) {
              const box = el._wffile2_box;
              box.style.display = "block";
              // Box interno único: adicionar atributos ao box ou criar wrapper
              // O box já é o container visual. Vamos adicionar WfImg ao box.

              if (!multiple) {
                if (!box.querySelector(".wffile2-preview-img")) {
                  box.innerHTML = "";
                  box.setAttribute("WfImg", ""); // Habilitar WfImg

                  const img = document.createElement("img");
                  img.className = "wffile2-preview-img";
                  img.alt = "Preview";
                  const remove = document.createElement("span");
                  remove.className = "wffile2-remove";
                  remove.title = "Remover imagem";
                  remove.textContent = "×";

                  remove.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation(); // Importante para não abrir WfImg
                    box.style.display = "none";
                    el._wffile2_files = [];
                    syncGlobalFiles();
                  });

                  box.appendChild(img);
                  box.appendChild(remove);
                  el._wffile2_img = img;
                }
                // Atualizar title
                const file = files[0];
                box.setAttribute("WfImg-title", file.name);

                const reader = new FileReader();
                reader.onload = function (e) {
                  try {
                    el._wffile2_img.src = e.target.result;
                    box.setAttribute("WfImg-src", e.target.result);
                    initWfImg(el);
                  } catch (_) {}
                };
                reader.readAsDataURL(file);
              } else {
                box.removeAttribute("WfImg"); // Remover do box pai se for multiplo
                box.innerHTML = "";
                files.forEach((file) => {
                  const item = document.createElement("span");
                  item.className = "wffile2-link";
                  item.setAttribute("WfImg", "");
                  item.setAttribute("WfImg-title", file.name);

                  const img = document.createElement("img");
                  img.className = "wffile2-preview-img wffile2-gallery-img";
                  img.src = "";

                  const remove = document.createElement("span");
                  remove.className = "wffile2-remove";
                  remove.title = "Remover imagem";
                  remove.textContent = "×";

                  item.appendChild(img);
                  item.appendChild(remove);
                  box.appendChild(item);

                  remove.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    el._wffile2_files = (el._wffile2_files || []).filter(
                      (f) => f !== file
                    );
                    syncGlobalFiles();
                    try {
                      item.remove();
                    } catch (_) {}
                    if (!box.querySelector(".wffile2-link")) {
                      box.style.display = "none";
                    }
                  });

                  const reader = new FileReader();
                  reader.onload = function (e) {
                    img.src = e.target.result;
                    item.setAttribute("WfImg-src", e.target.result);
                    initWfImg(box);
                  };
                  reader.readAsDataURL(file);
                });
              }
            }
          };

          window._inputFileGlobal.click();
        });
      });
    }
  }

  // Global Export
  if (typeof window !== "undefined") {
    if (typeof window.WebFull !== "undefined") {
      window.WebFull.modules.WfFile2 = WfFile2;
    }
    window.WfFile2 = WfFile2;

    // Auto-init
    const init = () => {
      try {
        WfFile2.initAll();
      } catch (_) {}

      // Observer for dynamic content (Optimized)
      const observer = new MutationObserver((mutations) => {
        let shouldInit = false;
        for (const mutation of mutations) {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1) {
                if (
                  (node.hasAttribute && node.hasAttribute("WfFile2")) ||
                  (node.querySelector && node.querySelector("[WfFile2]"))
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
          try {
            WfFile2.initAll();
          } catch (_) {}
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
