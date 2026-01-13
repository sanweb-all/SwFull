(function (window, document) {
  "use strict";

  class WfTextarea {
    constructor(el, options = {}) {
      if (el._wfta) return el._wfta;
      el._wfta = this;

      this.el = el;
      this.options = options;
      this.name =
        el.getAttribute("name") || el.getAttribute("data-name") || "wftextarea";
      this.placeholder =
        el.getAttribute("WfTextarea-placeholder") ||
        el.getAttribute("wftextarea-placeholder") ||
        "";
      this.height = parseInt(
        el.getAttribute("WfTextarea-height") ||
          el.getAttribute("wftextarea-height") ||
          "100",
        10
      );
      this.minHeight = parseInt(
        el.getAttribute("WfTextarea-min-height") ||
          el.getAttribute("wftextarea-min-height") ||
          "100",
        10
      );
      this.maxHeight = parseInt(
        el.getAttribute("WfTextarea-max-height") ||
          el.getAttribute("wftextarea-max-height") ||
          "800",
        10
      );
      this.resizable = el.getAttribute("WfTextarea-resizable") !== "false";
      this.value = el.value || el.getAttribute("data-value") || "";
      this.render();
      this.bind();
    }

    render() {
      const box = document.createElement("div");
      box.className = "wfta-box";

      const toolbar = document.createElement("div");
      toolbar.className = "wfta-toolbar";

      // Select de fonte
      const fontSel = document.createElement("select");
      fontSel.className = "wfta-font";
      const wfFonts = [
        ["Poppins-light", "font1l", "Poppins Light"],
        ["Poppins-normal", "font1", "Poppins"],
        ["Poppins-bold", "font1b", "Poppins Bold"],
        ["Roboto-light", "font2l", "Roboto Light"],
        ["Roboto-normal", "font2", "Roboto"],
        ["Roboto-bold", "font2b", "Roboto Bold"],
        ["AlumniSans-light", "font3l", "Alumni Sans Light"],
        ["AlumniSans-normal", "font3", "Alumni Sans"],
        ["AlumniSans-bold", "font3b", "Alumni Sans Bold"],
        ["MeowScript-normal", "font4", "Meow Script"],
        ["DancingScript-normal", "font5", "Dancing Script"],
        ["PlaywriteBR-normal", "font6", "Playwrite BR"],
      ];
      fontSel.innerHTML = wfFonts
        .map(
          ([face, cls, label]) =>
            `<option value="${face}" data-class="${cls}">${label}</option>`
        )
        .join("");

      // Input de cor de fundo
      const backColorInput = document.createElement("input");
      backColorInput.type = "color";
      backColorInput.className = "wfta-color-back";
      backColorInput.value = "#ffff00";
      backColorInput.style.cssText =
        "position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;";

      // Input de cor de fonte
      const foreColorInput = document.createElement("input");
      foreColorInput.type = "color";
      foreColorInput.className = "wfta-color-fore";
      foreColorInput.value = "#000000";
      foreColorInput.style.cssText =
        "position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;";

      // Grupos de botões (usando símbolos Unicode como fallback)
      const groups = [
        [
          ["bold", "wf-bold", "Negrito (Ctrl+B)", "B"],
          ["italic", "wf-italic", "Itálico (Ctrl+I)", "I"],
          ["underline", "wf-underline", "Sublinhado (Ctrl+U)", "U"],
          ["strikeThrough", "wf-strikethrough", "Tachado", "S"],
        ],
        [
          ["foreColor", "wf-palette", "Cor da Fonte", "A"],
          ["backColor", "wf-color", "Cor de Fundo", "◧"],
          ["clean", "wf-eraser", "Limpar Formatação", "✖"],
        ],
        [
          ["justifyLeft", "wf-align-left", "Alinhar à Esquerda", "≡"],
          ["justifyCenter", "wf-align-middle", "Centralizar", "≣"],
          ["justifyRight", "wf-align-right", "Alinhar à Direita", "≡"],
          ["justifyFull", "wf-align-justify", "Justificar", "▤"],
        ],
        [
          ["insertUnorderedList", "wf-list-ul", "Lista", "•"],
          ["insertOrderedList", "wf-list-ol", "Lista Numerada", "№"],
          ["hr", "wf-minus", "Linha Horizontal", "─"],
          ["link", "wf-link", "Link (Ctrl+K)", "🔗"],
          ["image", "wf-image", "Imagem", "🖼"],
          ["theme", "wf-moon", "Tema Escuro", "🌙"],
          ["code", "wf-code", "Código HTML", "<>"],
          ["fullscreen", "wf-fullscreen", "Tela Cheia", "⛶"],
        ],
      ];

      toolbar.innerHTML = groups
        .map(
          (grp) =>
            `<div class="wfta-group">${grp
              .map(
                ([cmd, icon, title, fallback]) =>
                  `<button type="button" class="wfta-btn" data-cmd="${cmd}" title="${title}">
                  <i class="wf ${icon}"></i><span class="wfta-fallback">${
                    fallback || ""
                  }</span>
                </button>`
              )
              .join("")}</div>`
        )
        .join("");

      // Adicionar select de formato
      const formatGroup = document.createElement("div");
      formatGroup.className = "wfta-group wfta-group-format";
      const format = document.createElement("select");
      format.className = "wfta-format";
      format.innerHTML = [
        ["P", "P"],
        ["H1", "H1"],
        ["H2", "H2"],
        ["H3", "H3"],
        ["H4", "H4"],
        ["H5", "H5"],
        ["H6", "H6"],
      ]
        .map(([tag, label]) => `<option value="${tag}">${label}</option>`)
        .join("");
      formatGroup.appendChild(format);

      // Adicionar select de fonte
      const fontGroup = document.createElement("div");
      fontGroup.className = "wfta-group wfta-group-font";
      fontGroup.appendChild(fontSel);

      // Inserir grupos especiais
      toolbar.insertBefore(formatGroup, toolbar.firstChild);
      const secondGroup = toolbar.querySelector(".wfta-group:nth-child(2)");
      if (secondGroup) {
        toolbar.insertBefore(fontGroup, secondGroup);
      }

      // Adicionar inputs de cor ao toolbar
      toolbar.appendChild(backColorInput);
      toolbar.appendChild(foreColorInput);

      // Conectar inputs de cor aos botões após renderizar
      setTimeout(() => {
        const backColorBtn = toolbar.querySelector('[data-cmd="backColor"]');
        if (backColorBtn) {
          backColorBtn.style.position = "relative";
          backColorBtn.appendChild(backColorInput);
          backColorInput.style.cssText =
            "position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;";
        }

        const foreColorBtn = toolbar.querySelector('[data-cmd="foreColor"]');
        if (foreColorBtn) {
          foreColorBtn.style.position = "relative";
          foreColorBtn.appendChild(foreColorInput);
          foreColorInput.style.cssText =
            "position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;";
        }
      }, 0);

      // Editor
      const editorWrap = document.createElement("div");
      editorWrap.className = "wfta-editor-wrap";

      const editor = document.createElement("div");
      editor.className = "wfta-editor";
      editor.contentEditable = "true";
      editor.style.minHeight = this.height + "px";
      editor.setAttribute("placeholder", this.placeholder);
      if (this.value) {
        editor.innerHTML = this.value;
      } else {
        editor.innerHTML = "<p><br></p>";
      }

      editorWrap.appendChild(editor);

      // Textarea código
      const code = document.createElement("textarea");
      code.className = "wfta-code";
      code.style.display = "none";
      code.value = editor.innerHTML;
      code.spellcheck = false;

      editorWrap.appendChild(code);

      // Input hidden
      const input = document.createElement("textarea");
      input.className = "wfta-input";
      input.name = this.name;
      input.style.display = "none";
      input.value = editor.innerHTML;

      // Resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "wfta-resize-handle";
      resizeHandle.innerHTML = '<i class="wf wf-grip-lines"></i>';
      if (!this.resizable) {
        resizeHandle.style.display = "none";
      }

      // Status bar
      const statusBar = document.createElement("div");
      statusBar.className = "wfta-status";
      statusBar.innerHTML = '<span class="wfta-chars">0 caracteres</span>';

      // Montar estrutura
      box.appendChild(toolbar);
      box.appendChild(editorWrap);
      box.appendChild(resizeHandle);
      box.appendChild(statusBar);
      box.appendChild(input);

      this.el.parentNode.insertBefore(box, this.el.nextSibling);
      if (this.el.tagName.toLowerCase() === "textarea")
        this.el.style.display = "none";

      this.box = box;
      this.toolbar = toolbar;
      this.editorWrap = editorWrap;
      this.editor = editor;
      this.code = code;
      this.input = input;
      this.formatSel = format;
      this.fontSel = fontSel;
      this.backColorInput = backColorInput;
      this.foreColorInput = foreColorInput;
      this.resizeHandle = resizeHandle;
      this.statusBar = statusBar;

      WfTextarea.injectCSS();
      this.updateStatus();
      this.syncWithWfDay();
    }

    syncWithWfDay() {
      // Sincronizar com WfDay.js se estiver disponível
      if (typeof window.WfDay !== "undefined") {
        // Aplicar tema inicial do WfDay
        const currentTheme = window.WfDay.getTheme();
        this.applyWfDayTheme(currentTheme);

        // Escutar mudanças de tema globais
        window.addEventListener("wfday-theme-changed", (e) => {
          this.applyWfDayTheme(e.detail.theme);
        });

        // Fazer o botão de tema disparar o WfDay ao invés de controle local
        const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
        if (themeBtn) {
          themeBtn._wfdayIntegrated = true;
        }
      }
    }

    applyWfDayTheme(theme) {
      // theme = "day" ou "night"
      const isDark = theme === "night";
      this.box.classList.toggle("wfta-dark", isDark);

      // Atualizar ícone do botão
      const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
      if (themeBtn) {
        const icon = themeBtn.querySelector("i");
        if (isDark) {
          icon.className = "wf wf-sun";
          themeBtn.title = "Tema Claro";
        } else {
          icon.className = "wf wf-moon";
          themeBtn.title = "Tema Escuro";
        }
      }
    }

    saveSelection() {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          try {
            this.savedSelection = sel.getRangeAt(0).cloneRange();
          } catch (e) {
            this.savedSelection = null;
          }
        }
      }
    }

    restoreSelection() {
      if (this.savedSelection) {
        try {
          if (window.getSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(this.savedSelection);
          }
        } catch (e) {
          // Seleção inválida, ignorar
        }
      }
    }

    restoreFocus() {
      this.editor.focus();
      if (this.savedSelection) {
        this.restoreSelection();
      }
    }

    updateActiveButtons() {
      // Remover classe active de todos os botões
      this.toolbar.querySelectorAll(".wfta-btn").forEach((btn) => {
        btn.classList.remove("wfta-active");
      });

      // Lista completa de comandos que podem ter estado ativo
      const commands = [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "insertUnorderedList",
        "insertOrderedList",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "insertHorizontalRule",
        "createLink",
      ];

      // Verificar quais comandos estão ativos
      commands.forEach((cmd) => {
        try {
          if (document.queryCommandState(cmd)) {
            const btn = this.toolbar.querySelector(`[data-cmd="${cmd}"]`);
            if (btn) btn.classList.add("wfta-active");
          }
        } catch (e) {
          // Alguns comandos podem não suportar queryCommandState
        }
      });

      // Verificar comandos especiais por nome de comando customizado
      const specialCommands = {
        hr: "insertHorizontalRule",
        link: "createLink",
      };

      Object.entries(specialCommands).forEach(([customCmd, execCmd]) => {
        try {
          if (document.queryCommandState(execCmd)) {
            const btn = this.toolbar.querySelector(`[data-cmd="${customCmd}"]`);
            if (btn) btn.classList.add("wfta-active");
          }
        } catch (e) {}
      });

      // Marcar botão code se estiver no modo código
      if (this.code.style.display === "block") {
        const codeBtn = this.toolbar.querySelector('[data-cmd="code"]');
        if (codeBtn) codeBtn.classList.add("wfta-active");
      }

      // Marcar botão fullscreen se estiver em tela cheia
      if (this.box.classList.contains("wfta-fullscreen")) {
        const fullscreenBtn = this.toolbar.querySelector(
          '[data-cmd="fullscreen"]'
        );
        if (fullscreenBtn) fullscreenBtn.classList.add("wfta-active");
      }

      // Atualizar select de formato
      try {
        const formatBlock = document.queryCommandValue("formatBlock");
        if (formatBlock) {
          this.formatSel.value = formatBlock.toUpperCase();
        }
      } catch (e) {}
    }

    bind() {
      // Salvar referência da seleção
      this.savedSelection = null;

      // Salvar a seleção sempre que mudar
      this.editor.addEventListener("mouseup", () => this.saveSelection());
      this.editor.addEventListener("keyup", () => this.saveSelection());
      this.editor.addEventListener("focus", () => this.saveSelection());

      // Salvar seleção quando clicar nos inputs de cor
      this.backColorInput.addEventListener("mousedown", () => {
        this.saveSelection();
      });

      this.foreColorInput.addEventListener("mousedown", () => {
        this.saveSelection();
      });

      // Botões da toolbar - usar mousedown para prevenir perda de foco
      this.toolbar.addEventListener("mousedown", (e) => {
        const btn = e.target.closest(".wfta-btn");
        if (!btn) return;

        const cmd = btn.getAttribute("data-cmd");

        // Salvar seleção sempre
        this.saveSelection();

        // Para os botões de cor, deixar os inputs de cor internos lidar
        if (cmd === "backColor" || cmd === "foreColor") {
          return;
        }

        e.preventDefault(); // Previne que o botão roube o foco

        // Executar comando
        this.exec(cmd);

        // Restaurar foco e atualizar botões
        setTimeout(() => {
          this.editor.focus();
          this.updateActiveButtons();
        }, 0);
      });

      // Select de formato
      this.formatSel.addEventListener("change", () => {
        const tag = this.formatSel.value;
        document.execCommand("formatBlock", false, tag);
        this.sync();
        this.editor.focus();
        this.updateActiveButtons();
      });

      // Select de fonte
      this.fontSel.addEventListener("change", () => {
        const f = this.fontSel.value;
        document.execCommand("fontName", false, f);
        this.sync();
        this.editor.focus();
        this.updateActiveButtons();
      });

      // Cor de fundo - restaurar seleção antes de aplicar
      this.backColorInput.addEventListener("input", () => {
        this.editor.focus();
        this.restoreSelection();
        document.execCommand("hiliteColor", false, this.backColorInput.value);
        this.sync();
      });

      // Cor da fonte - restaurar seleção antes de aplicar
      this.foreColorInput.addEventListener("input", () => {
        this.editor.focus();
        this.restoreSelection();
        document.execCommand("foreColor", false, this.foreColorInput.value);
        this.sync();
      });

      // Editor events
      this.editor.addEventListener("input", () => {
        this.sync();
        this.updateStatus();
      });
      this.editor.addEventListener("keyup", () => {
        this.updateActiveButtons();
      });
      this.editor.addEventListener("mouseup", () => {
        this.updateActiveButtons();
      });
      this.editor.addEventListener("keydown", (e) => this.shortcuts(e));

      // Code events
      this.code.addEventListener("input", () => {
        this.sync();
        this.updateStatus();
      });
      this.code.addEventListener("keydown", (e) => this.shortcuts(e));

      // Resize handle
      if (this.resizable) {
        this.bindResize();
      }
    }

    bindResize() {
      let startY = 0;
      let startHeight = 0;

      const onMouseMove = (e) => {
        const delta = e.clientY - startY;
        const newHeight = Math.max(
          this.minHeight,
          Math.min(this.maxHeight, startHeight + delta)
        );
        this.editorWrap.style.height = newHeight + "px";
        this.editor.style.minHeight = newHeight + "px";
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        this.box.classList.remove("wfta-resizing");
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };

      this.resizeHandle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        startY = e.clientY;
        startHeight = this.editorWrap.offsetHeight;
        this.box.classList.add("wfta-resizing");
        document.body.style.userSelect = "none";
        document.body.style.cursor = "ns-resize";
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }

    exec(cmd) {
      if (cmd === "fontname") {
        this.fontSel.focus();
        return;
      }
      // backColor agora é tratado diretamente no evento click do toolbar
      if (cmd === "code") {
        const toCode = this.code.style.display === "none";
        if (toCode) {
          this.code.value = this.editor.innerHTML;
          this.editor.style.display = "none";
          this.code.style.display = "block";
          this.box.classList.add("wfta-codeview");
        } else {
          this.editor.innerHTML = this.code.value;
          this.code.style.display = "none";
          this.editor.style.display = "block";
          this.box.classList.remove("wfta-codeview");
        }
        this.sync();
        this.updateActiveButtons();
        return;
      }
      if (cmd === "clean") {
        document.execCommand("removeFormat");
        document.execCommand("unlink");
        this.sync();
        return;
      }
      if (cmd === "hr") {
        document.execCommand("insertHorizontalRule");
        this.sync();
        return;
      }
      if (cmd === "link") {
        const url = prompt("Digite a URL:");
        if (url) {
          document.execCommand("createLink", false, url);
        }
        this.sync();
        return;
      }
      if (cmd === "image") {
        const url = prompt("Digite a URL da imagem:");
        if (url) {
          document.execCommand("insertImage", false, url);
        }
        this.sync();
        return;
      }
      if (cmd === "theme") {
        // Se WfDay estiver disponível, usar ele para controle global
        if (typeof window.WfDay !== "undefined") {
          window.WfDay.toggleTheme();
          // O evento "wfday-theme-changed" vai atualizar automaticamente
        } else {
          // Fallback: controle manual local
          const isDark = this.box.classList.contains("wfta-dark");
          this.box.classList.toggle("wfta-dark", !isDark);

          // Atualizar ícone do botão
          const themeBtn = this.toolbar.querySelector('[data-cmd="theme"]');
          const icon = themeBtn.querySelector("i");
          if (isDark) {
            // Voltando ao claro
            icon.className = "wf wf-moon";
            themeBtn.title = "Tema Escuro";
          } else {
            // Indo para escuro
            icon.className = "wf wf-sun";
            themeBtn.title = "Tema Claro";
          }
        }
        return;
      }
      if (cmd === "fullscreen") {
        const on = !this.box.classList.contains("wfta-fullscreen");
        this.box.classList.toggle("wfta-fullscreen", on);
        document.body.style.overflow = on ? "hidden" : "";
        if (on) {
          this.editorWrap.style.height = "calc(100% - 120px)";
        } else {
          this.editorWrap.style.height = "";
        }
        this.updateActiveButtons();
        return;
      }
      if (cmd === "undo" || cmd === "redo") {
        document.execCommand(cmd);
        this.sync();
        return;
      }

      // Para comandos de formatação, garantir que o editor tenha foco e seleção
      this.editor.focus();

      // Restaurar seleção se existir
      if (this.savedSelection) {
        this.restoreSelection();
      }

      document.execCommand(cmd);
      this.sync();
    }

    sync() {
      if (this.code.style.display === "block") {
        this.input.value = this.code.value;
      } else {
        this.input.value = this.editor.innerHTML;
        this.code.value = this.editor.innerHTML;
      }
    }

    updateStatus() {
      const text = this.editor.innerText || "";
      const chars = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      this.statusBar.querySelector(
        ".wfta-chars"
      ).textContent = `${chars} caracteres · ${words} palavras`;
    }

    shortcuts(e) {
      const c = e.ctrlKey || e.metaKey;
      if (!c) return;
      const k = e.key.toLowerCase();

      const shortcuts = {
        b: () => this.exec("bold"),
        i: () => this.exec("italic"),
        u: () => this.exec("underline"),
        k: () => this.exec("link"),
        z: () => this.exec("undo"),
        y: () => this.exec("redo"),
        0: () => document.execCommand("formatBlock", false, "P"),
        1: () => document.execCommand("formatBlock", false, "H1"),
        2: () => document.execCommand("formatBlock", false, "H2"),
        3: () => document.execCommand("formatBlock", false, "H3"),
        4: () => document.execCommand("formatBlock", false, "H4"),
        5: () => document.execCommand("formatBlock", false, "H5"),
        6: () => document.execCommand("formatBlock", false, "H6"),
      };

      if (k === "enter") {
        e.preventDefault();
        this.exec("hr");
      } else if (shortcuts[k]) {
        e.preventDefault();
        shortcuts[k]();
        this.sync();
      }
    }

    static injectCSS() {
      if (document.getElementById("wftextarea-css")) return;
      const s = document.createElement("style");
      s.id = "wftextarea-css";
      s.textContent = `
    .wfta-box {
      border: 1px solid var(--wf-border);
      border-radius: 0 0 6px 6px;
      background: #fff;
      color: #333;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin-bottom: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .wfta-box:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    }
    .wfta-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px;
      border-bottom: 1px solid  var(--wf-border);
      background: linear-gradient(to bottom, #fafafa, #f5f5f5);
      flex-wrap: wrap;
      transition: all 0.3s ease;
    }
    .wfta-group {
      display: flex;
      gap: 2px;
      padding: 0 5px;
      border-right: 1px solid var(--wf-border);
    }
    .wfta-group select {
      margin-bottom: 0 !important;
    }
    .wfta-group:last-of-type {
      border-right: none;
    }
    .wfta-btn {
      background: #fff;
      border: 1px solid  var(--wf-border);
      border-radius: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin: 0;
      padding: 0;
      color: #555;
      font-size: 16px;
      transition: all 0.2s;
      position: relative;
    }
    .wfta-btn .wf {
      display: inline-block;
    }
    .wfta-btn .wfta-fallback {
      display: none;
      font-size: 14px;
      font-weight: bold;
    }
    .wfta-btn .wf:empty + .wfta-fallback,
    .wfta-btn .wf:not(:before) + .wfta-fallback {
      display: inline-block;
    }
    .wfta-btn:hover {
      background: #f0f0f0;
      border-color: #bbb;
      color: #000;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .wfta-btn:active {
      transform: translateY(0);
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }
    .wfta-btn.wfta-active {
      background: #4a90e2;
      border-color: #4a90e2;
      color: #fff;
      box-shadow: 0 2px 6px rgba(74,144,226,0.3);
    }
    .wfta-btn.wfta-active:hover {
      background: #357abd;
      border-color: #357abd;
      color: #fff;
    }
    .wfta-format,
    .wfta-font {
      background: #fff;
      color: #333;
      border: 1px solid  var(--wf-border);
      border-radius: 0;
      padding: 3px 8px;
      font-size: 13px;
      cursor: pointer;
      outline: none;
      transition: all 0.2s;
      min-width: 110px;
    }
    .wfta-format:hover,
    .wfta-font:hover {
      border-color: #bbb;
      background: #f9f9f9;
    }
    .wfta-format:focus,
    .wfta-font:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74,144,226,0.1);
    }
    .wfta-group-format {
      border-right: 1px solid  var(--wf-border);
      padding-right: 8px;
    }
    .wfta-group-font {
      border-right: 1px solid  var(--wf-border);
      padding-right: 8px;
    }
    .wfta-editor-wrap {
      position: relative;
      background: #fff;
    }
    .wfta-editor {
      padding: 2px 8px;
      min-height: 100px !important;
      max-height: 100px;
      overflow-y: auto;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #333;
      transition: all 0.3s ease;
    }
    .wfta-editor[placeholder]:empty:before {
      content: attr(placeholder);
      color: #aaa;
      font-style: italic;
    }
    .wfta-editor:focus {
      background: #fafafa;
    }
    .wfta-editor p {
      margin: 0 0 1em 0;
    }
    .wfta-editor h1, .wfta-editor h2, .wfta-editor h3,
    .wfta-editor h4, .wfta-editor h5, .wfta-editor h6 {
      margin: 1em 0 0.5em 0;
      font-weight: 600;
    }
    .wfta-editor ul, .wfta-editor ol {
      margin: 0.5em 0;
      padding-left: 2em;
    }
    .wfta-editor hr {
      border: none;
      border-top: 2px solid  var(--wf-border);
      margin: 1.5em 0;
    }
    .wfta-editor img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin: 1em 0;
    }
    .wfta-editor a {
      color: #4a90e2;
      text-decoration: underline;
    }
    .wfta-code {
      display: none;
      width: 100%;
      min-height: 300px;
      padding: 16px;
      border: none;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 13px;
      background: #1e1e1e;
      color: var(--neut3) !important;
      outline: none;
      resize: none;
      line-height: 1.5;
    }
    .wfta-codeview .wfta-code {
      display: block;
    }
    .wfta-codeview .wfta-editor {
      display: none;
    }
    .wfta-resize-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5px;
      background: linear-gradient(to bottom, #f5f5f5, #fafafa);
      border-top: 1px solid var(--wf-border);
      cursor: ns-resize;
      color: #999;
      font-size: 12px;
      transition: all 0.2s;
    }
    .wfta-resize-handle:hover {
      background: #f0f0f0;
      color: #666;
    }
    .wfta-resizing .wfta-resize-handle {
      background: #e0e0e0;
      color: #333;
    }
    .wfta-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 16px;
      background: #fafafa;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666;
    }
    .wfta-input {
      display: none;
    }
    .wfta-fullscreen {
      position: fixed;
      inset: 0;
      z-index: 99999;
      border-radius: 0;
      margin: 0;
    }
    .wfta-fullscreen .wfta-editor-wrap {
      height: calc(100vh - 120px);
    }
    .wfta-fullscreen .wfta-editor {
      min-height: 100%;
      max-height: none;
    }

    /* Tema Escuro Manual (classe .wfta-dark) ou Automático (html.wfday-night) */
    .wfta-box.wfta-dark,
    html.wfday-night .wfta-box {
      border-color: var(--wf-border, #3a3a3a);
      background: var(--wf-bg, #1e1e1e);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-toolbar,
    html.wfday-night .wfta-box .wfta-toolbar {
      background: var(--wf-bg-, linear-gradient(to bottom, #252525, #1e1e1e));
      border-bottom-color: var(--wf-border, #3a3a3a);
    }
    .wfta-box.wfta-dark .wfta-group,
    html.wfday-night .wfta-box .wfta-group {
      border-right-color: var(--wf-border, #3a3a3a);
    }
    .wfta-box.wfta-dark .wfta-btn,
    html.wfday-night .wfta-box .wfta-btn {
      background: var(--wf-bg--, #2a2a2a);
      border-color: var(--wf-border-, #444);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-btn:hover,
    html.wfday-night .wfta-box .wfta-btn:hover {
      background: var(--wf-hover, #333);
      border-color: var(--wf-border, #555);
      color: var(--wf-color-, #fff);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .wfta-box.wfta-dark .wfta-btn.wfta-active,
    html.wfday-night .wfta-box .wfta-btn.wfta-active {
      background: var(--wf-link, #5a9fd4);
      border-color: var(--wf-link, #5a9fd4);
      color: #fff;
      box-shadow: 0 2px 6px rgba(90,159,212,0.4);
    }
    .wfta-box.wfta-dark .wfta-btn.wfta-active:hover,
    html.wfday-night .wfta-box .wfta-btn.wfta-active:hover {
      background: var(--wf-hover, #4a8fc4);
      border-color: var(--wf-hover, #4a8fc4);
      color: #fff;
    }
    .wfta-box.wfta-dark .wfta-format,
    .wfta-box.wfta-dark .wfta-font,
    html.wfday-night .wfta-box .wfta-format,
    html.wfday-night .wfta-box .wfta-font {
      background: var(--wf-bg--, #2a2a2a);
      border-color: var(--wf-border-, #444);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-format:hover,
    .wfta-box.wfta-dark .wfta-font:hover,
    html.wfday-night .wfta-box .wfta-format:hover,
    html.wfday-night .wfta-box .wfta-font:hover {
      background: var(--wf-bg-, #333);
      border-color: var(--wf-border, #555);
    }
    .wfta-box.wfta-dark .wfta-format:focus,
    .wfta-box.wfta-dark .wfta-font:focus,
    html.wfday-night .wfta-box .wfta-format:focus,
    html.wfday-night .wfta-box .wfta-font:focus {
      border-color: var(--wf-link, #5a9fd4);
      box-shadow: 0 0 0 2px rgba(90,159,212,0.2);
    }
    .wfta-box.wfta-dark .wfta-editor-wrap,
    html.wfday-night .wfta-box .wfta-editor-wrap {
      background: var(--wf-bg, #1e1e1e);
    }
    .wfta-box.wfta-dark .wfta-editor,
    html.wfday-night .wfta-box .wfta-editor {
      background: var(--wf-bg, #1e1e1e);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-editor:focus,
    html.wfday-night .wfta-box .wfta-editor:focus {
      background: var(--wf-bg-, #252525);
    }
    .wfta-box.wfta-dark .wfta-editor[placeholder]:empty:before,
    html.wfday-night .wfta-box .wfta-editor[placeholder]:empty:before {
      color: var(--wf-color--, #666);
    }
    .wfta-box.wfta-dark .wfta-editor hr,
    html.wfday-night .wfta-box .wfta-editor hr {
      border-top-color: var(--wf-border, #444);
    }
    .wfta-box.wfta-dark .wfta-editor a,
    html.wfday-night .wfta-box .wfta-editor a {
      color: var(--wf-link, #5a9fd4);
    }
    .wfta-box.wfta-dark .wfta-code,
    html.wfday-night .wfta-box .wfta-code {
      background: var(--wf-bg_, #0d0d0d);
      color: var(--wf-color, #e0e0e0);
    }
    .wfta-box.wfta-dark .wfta-resize-handle,
    html.wfday-night .wfta-box .wfta-resize-handle {
      background: var(--wf-bg-, linear-gradient(to bottom, #1e1e1e, #252525));
      border-top-color: var(--wf-border, #3a3a3a);
      color: var(--wf-color--, #666);
    }
    .wfta-box.wfta-dark .wfta-resize-handle:hover,
    html.wfday-night .wfta-box .wfta-resize-handle:hover {
      background: var(--wf-bg--, #2a2a2a);
      color: var(--wf-color-, #999);
    }
    .wfta-box.wfta-dark .wfta-status,
    html.wfday-night .wfta-box .wfta-status {
      background: var(--wf-bg, #1e1e1e);
      border-top-color: var(--wf-border, #3a3a3a);
      color: var(--wf-color--, #888);
    }

    /* Destaque no botão de tema quando ativo */
    .wfta-box.wfta-dark .wfta-btn[data-cmd="theme"],
    html.wfday-night .wfta-box .wfta-btn[data-cmd="theme"] {
      background: #3a3a3a;
      border-color: #5a9fd4;
      color: #ffd700;
    }
    .wfta-box.wfta-dark .wfta-btn[data-cmd="theme"]:hover,
    html.wfday-night .wfta-box .wfta-btn[data-cmd="theme"]:hover {
      background: #444;
      color: #ffed4e;
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
    }

    /* Dark mode automático (prefers-color-scheme) */
    @media (prefers-color-scheme: dark) {
      .wfta-box:not(.wfta-dark) {
        /* Mantém claro por padrão, só muda com o botão ou classe global */
      }
    }
    `;
      document.head.appendChild(s);
    }

    static initAll(container = document) {
      const nodes = container.querySelectorAll("[WfTextarea], [wftextarea]");
      nodes.forEach((el) => {
        if (!el._wfta) {
          el._wfta = new WfTextarea(el);
        }
      });
    }
  }

  // Exportação Global
  if (typeof window !== "undefined") {
    window.WfTextarea = WfTextarea;
    if (window.WebFull) {
      window.WebFull.modules.WfTextarea = WfTextarea;
    }
  }

  // Auto-inicialização
  if (typeof document !== "undefined") {
    const init = () => WfTextarea.initAll();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // MutationObserver para elementos dinâmicos
    const observer = new MutationObserver((mutations) => {
      let shouldInit = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          shouldInit = true;
          break;
        }
      }
      if (shouldInit) init();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
})(window, document);
