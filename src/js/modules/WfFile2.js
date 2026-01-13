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

      if (
        root.hasAttribute &&
        root.hasAttribute("WfFile2")
      )
        list.push(root);
      
      root
        .querySelectorAll("span[WfFile2], [WfFile2]")
        .forEach((el) => list.push(el));

      list.forEach((el, idx) => {
        // Evita dupla inicialização
        if (el._wfFile2) return;
        el._wfFile2 = true;

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

            const previewTarget = previewSelector
              ? document.querySelector(previewSelector)
              : null;
            
            if (previewTarget) {
              // Limpa o conteúdo anterior do preview
              previewTarget.innerHTML = "";

              // Se o modo é múltiplo, itera e cria todas as imagens.
              if (multiple) {
                Array.from(this.files).forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    // Classes externas podem estilizar isso, ou adicionamos classe padrão
                    img.className = "wffile2-preview-img wffile2-gallery-img"; 
                    previewTarget.appendChild(img);
                  };
                  reader.readAsDataURL(file);
                });
              }
              // Senão, mantém o comportamento original de imagem única.
              else {
                const reader = new FileReader();
                reader.onload = function (e) {
                  // Se o alvo do preview é uma <img>, apenas muda o src.
                  if (previewTarget.tagName === "IMG") {
                    previewTarget.src = e.target.result;
                    previewTarget.style.display = "block";
                  }
                  // Se não, cria uma nova imagem dentro do alvo.
                  else {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.className = "wffile2-preview-img";
                    previewTarget.appendChild(img);
                  }
                };
                reader.readAsDataURL(this.files[0]);
              }
            } else if (el._wffile2_box) {
              const box = el._wffile2_box;
              box.style.display = "block";
              
              if (!multiple) {
                // Modo Single (Interno)
                // Restaura estrutura se foi limpa pelo modo multiplo
                if (!box.querySelector('.wffile2-preview-img')) {
                    box.innerHTML = '';
                    const img = document.createElement("img");
                    img.className = "wffile2-preview-img";
                    img.alt = "Preview";
                    const remove = document.createElement("span");
                    remove.className = "wffile2-remove";
                    remove.title = "Remover imagem";
                    remove.textContent = "×";
                    
                    remove.addEventListener("click", function () {
                        box.style.display = "none";
                        window._inputFileGlobal.value = "";
                    });
                    
                    box.appendChild(img);
                    box.appendChild(remove);
                    el._wffile2_img = img;
                }
                
                const reader = new FileReader();
                reader.onload = function (e) {
                  try {
                    el._wffile2_img.src = e.target.result;
                  } catch (_) {}
                };
                reader.readAsDataURL(this.files[0]);
              } else {
                // Modo Multiplo (Interno)
                box.innerHTML = "";
                Array.from(this.files).forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.className = "wffile2-preview-img wffile2-gallery-img";
                    img.src = e.target.result;
                    box.appendChild(img);
                  };
                  reader.readAsDataURL(file);
                });
                const remove = document.createElement("span");
                remove.className = "wffile2-remove";
                remove.title = "Remover imagens";
                remove.textContent = "×";
                remove.addEventListener("click", function () {
                  box.style.display = "none";
                  box.innerHTML = "";
                  window._inputFileGlobal.value = "";
                });
                box.appendChild(remove);
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
