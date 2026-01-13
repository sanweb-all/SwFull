// WfTable.js - Tabela interativa completa (ordenar, paginar, buscar, dados dinâmicos)
// SandroWeb 2025

(function(window, document) {
  'use strict';

  // Rastreamento global de instâncias para evitar duplicação
  window.SwTableInstances = window.SwTableInstances || new WeakMap();

  class WfTable {
    constructor(element) {
      // Check for existing instance
      if (element._wfTable) return element._wfTable;
      
      this.element = element;
      element._wfTable = this;
      
      this.container = element; // Definir container como o próprio element
      // Support multiple attribute naming conventions for backwards compatibility
      this.sortable =
        this.element.getAttribute("WfTable-sort") === "true" ||
        this.element.getAttribute("WfTable-sortable") === "true";
      this.searchable =
        this.element.getAttribute("WfTable-search") === "true" ||
        this.element.getAttribute("WfTable-searchable") === "true";
      this.paginated =
        this.element.getAttribute("WfTable-pagination") === "true" ||
        this.element.getAttribute("WfTable-paginated") === "true";
      // page size supports both WfTable-items-per-page and WfTable-pageSize
      this.itemsPerPage =
        parseInt(
          this.element.getAttribute("WfTable-items-per-page") ||
            this.element.getAttribute("WfTable-pageSize")
        ) || 10;
      this.responsive =
        this.element.getAttribute("WfTable-responsive") !== "false";
      this.striped = this.element.getAttribute("WfTable-striped") === "true";
      this.hoverable = this.element.getAttribute("WfTable-hoverable") === "true";

      // Configurações padrão
      this.options = {
        data: [],
        url: null,
        columns: [],
        pageSize: this.itemsPerPage,
        lengthMenu: [10, 25, 50, 100],
        search: this.searchable,
        pagination: this.paginated,
        sortable: this.sortable,
        labels: {
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          empty: "Nenhum dado encontrado",
        },
      };

      this.data = [];
      this.filteredData = [];
      this.currentPage = 1;
      this.sortColumn = null;
      this.sortDirection = "asc";
      this.searchTerm = "";

      this.init();
    }

    async init() {
      this.loadCSS();

      // Verificar se é uma tabela dinâmica (com dados configurados)
      const hasConfig =
        this.element.hasAttribute("WfTable-config") ||
        this.element.hasAttribute("WfTable-url") ||
        this.element.hasAttribute("WfTable-data");

      if (hasConfig) {
        // Carregar configurações
        this.loadConfig();
        if (typeof this.options.loadData === "function") {
          await this.options.loadData.call(this);
        } else {
          await this.loadData();
        }
        this.renderTable();
      } else {
        // Tabela HTML estática - aplicar parsing se houver uma <table> interna ou o elemento for uma TABLE
        const isTableElement =
          this.element.tagName && this.element.tagName.toUpperCase() === "TABLE";
        const hasInnerTable = !!(
          this.element.querySelector &&
          this.element.querySelector("table.wftable, table")
        );
        if (isTableElement || hasInnerTable) {
          this.parseHtmlTable();
          this.renderTable();
        }
      }
    }

    loadConfig() {
      // Carregar configuração JSON
      const configAttr = this.element.getAttribute("WfTable-config");
      if (configAttr) {
        try {
          const config = JSON.parse(configAttr);
          this.options = { ...this.options, ...config };
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear configuração JSON:", error);
          }
        }
      }

      // Carregar atributos individuais
      const url = this.element.getAttribute("WfTable-url");
      if (url) this.options.url = url;

      const data = this.element.getAttribute("WfTable-data");
      if (data) {
        try {
          this.options.data = JSON.parse(data);
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao parsear dados JSON:", error);
          }
        }
      }
    }

    async loadData() {
      if (this.options.data) {
        this.data = Array.isArray(this.options.data) ? this.options.data : [];
      } else if (this.options.url) {
        try {
          const res = await fetch(this.options.url);
          this.data = await res.json();
        } catch (error) {
          // Log silencioso em produção, apenas warn em desenvolvimento
          if (
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
          ) {
            console.warn("WfTable: Erro ao carregar dados:", error);
          }
          this.data = [];
        }
      }
      this.filteredData = [...this.data];
    }

    parseHtmlTable() {
      // Extrai dados da tabela HTML existente
      if (!this.container) {
        console.warn("WfTable: container não encontrado");
        return;
      }

      const table =
        this.container.tagName === "TABLE"
          ? this.container
          : this.container.querySelector("table");
      if (!table) {
        console.warn("WfTable: tabela HTML não encontrada");
        return;
      }

      if (!table.tHead || !table.tBodies[0]) {
        console.warn("WfTable: estrutura de tabela inválida");
        return;
      }

      const headers = Array.from(table.tHead.rows[0].cells).map((th) =>
        th.textContent.trim()
      );
      // Preserve inner HTML so action icons/buttons keep rendering
      // Ignora linhas técnicas/ocultas (ex.: CSRF) e garante fallback vazio
      const rows = Array.from(table.tBodies[0].rows)
        .filter((tr) => {
          try {
            if (tr.classList && tr.classList.contains("js-csrf-row"))
              return false;
            const styleAttr = tr.getAttribute("style") || "";
            if (/display\s*:\s*none/i.test(styleAttr)) return false;
            const dataIgnore = tr.getAttribute("data-ignore");
            if (dataIgnore && String(dataIgnore).toLowerCase() === "true")
              return false;
          } catch (e) {}
          return true;
        })
        .map((tr) =>
          Array.from(tr.cells).map((td) => (td.innerHTML || "").trim())
        );
      this.options.columns = headers;
      this.data = rows.map((row) => {
        const obj = {};
        headers.forEach((h, i) => (obj[h] = row[i] !== undefined ? row[i] : ""));
        return obj;
      });
      this.filteredData = [...this.data];

      // Não limpar o conteúdo aqui - deixar para o renderTable fazer isso
    }

    renderTable() {
      this.container.innerHTML = "";
      // Wrapper responsivo
      this.respDiv = document.createElement("div");
      this.respDiv.className = "wftable-container";
      this.container.appendChild(this.respDiv);
      this.renderTopBar();
      this.renderTableElement();
      this.renderBottomBar();
      this.updateTable();
      // Inicializa componentes após renderização dinâmica
      if (window.SwFullInitAll) {
        setTimeout(() => {
          window.SwFullInitAll(this.container);
        }, 100);
      }
    }

    renderTopBar() {
      // Barra superior: dropdown esquerda, busca direita
      const topBar = document.createElement("div");
      topBar.className = "wftable-topbar";
      // Dropdown quantidade (esquerda)
      const left = document.createElement("div");
      left.className = "wftable-topbar-left";
      const select = document.createElement("select");
      select.className = "wftable-length-select";

      // Adicionar opções ao select
      this.options.lengthMenu.forEach((n) => {
        if (n != null && n !== "") {
          const opt = document.createElement("option");
          opt.value = String(n);
          opt.textContent = n;
          if (String(n) === String(this.options.pageSize)) opt.selected = true;
          select.appendChild(opt);
        }
      });

      // Adicionar event listener para mudança de página
      select.addEventListener("change", (e) => {
        this.options.pageSize = parseInt(e.target.value);
        this.currentPage = 1;
        this.updateTable();
      });

      // Adicionar elementos ao container esquerdo
      const showLabel = document.createElement("span");
      showLabel.textContent = "Mostrar";
      const recordsLabel = document.createElement("span");
      recordsLabel.textContent = "registros";

      left.appendChild(showLabel);
      left.appendChild(select);
      left.appendChild(recordsLabel);
      topBar.appendChild(left);
      // Busca (direita)
      if (this.options.search) {
        const right = document.createElement("div");
        right.className = "wftable-topbar-right";

        // Criar campo de busca
        const searchLabel = document.createElement("label");
        searchLabel.className = "wftable-search-label";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "wftable-search-input";
        searchInput.placeholder = "Buscar...";

        // Adicionar event listener para busca (debounced)
        let debounceTimer = null;
        searchInput.addEventListener("input", (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.currentPage = 1;
            this.filterData(e.target.value);
          }, 200);
        });

        searchLabel.appendChild(searchInput);
        right.appendChild(searchLabel);
        topBar.appendChild(right);
      }
      this.respDiv.appendChild(topBar);
    }

    renderTableElement() {
      this.tableEl = document.createElement("table");
      this.tableEl.className = "wftable";
      this.respDiv.appendChild(this.tableEl);
    }

    renderBottomBar() {
      // Barra inferior: info esquerda, paginação centro
      const bottomBar = document.createElement("div");
      bottomBar.className = "wftable-bottombar";
      // Info (esquerda)
      this.infoDiv = document.createElement("div");
      this.infoDiv.className = "wftable-info";
      bottomBar.appendChild(this.infoDiv);
      // Paginação (centro)
      this.paginationDiv = document.createElement("div");
      this.paginationDiv.className = "wftable-pagination";
      bottomBar.appendChild(this.paginationDiv);
      this.respDiv.appendChild(bottomBar);
    }

    filterData(query) {
      if (!query) {
        this.filteredData = [...this.data];
      } else {
        const q = query.toLowerCase();
        this.filteredData = this.data.filter((row) =>
          Object.values(row).some((val) => String(val).toLowerCase().includes(q))
        );
      }
      this.updateTable();
    }

    showEmpty() {
      // Esconder a tabela e mostrar mensagem vazia
      if (this.tableEl) {
        this.tableEl.style.display = "none";
      }
      if (this.infoDiv) {
        this.infoDiv.textContent = "Nenhum dado encontrado";
      }

      // Adicionar mensagem vazia se não existir
      if (!this.respDiv.querySelector(".wftable-empty")) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "wftable-empty";
        emptyDiv.innerHTML = `
          <i class="wf wf-inbox"></i>
          <span>${this.options.labels.empty}</span>
        `;
        this.respDiv.appendChild(emptyDiv);
      }
    }

    updateTable() {
      // Remover mensagem vazia se existir
      const emptyDiv = this.respDiv.querySelector(".wftable-empty");
      if (emptyDiv) {
        emptyDiv.remove();
      }

      // Verificar se há dados
      if (this.filteredData.length === 0) {
        this.showEmpty();
        return;
      }

      // Mostrar tabela
      this.tableEl.style.display = "table";

      // Cabeçalho
      const cols = this.options.columns || Object.keys(this.data[0] || {});
      let thead = "<thead><tr>";
      cols.forEach((col, i) => {
        thead += `<th WfTable-col="${i}">${col} ${
          this.sortColumn === i ? (this.sortDirection === "asc" ? "▲" : "▼") : ""
        }</th>`;
      });
      thead += "</tr></thead>";
      // Paginação
      let pageSize = this.options.pagination
        ? this.options.pageSize
        : this.filteredData.length;

      let totalPages = Math.max(
        1,
        Math.ceil(this.filteredData.length / pageSize)
      );
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      const start = (this.currentPage - 1) * pageSize;
      const end = start + pageSize;
      const pageRows = this.filteredData.slice(start, end);

      // Corpo
      let tbody = "<tbody>";
      pageRows.forEach((row) => {
        tbody +=
          "<tr>" + cols.map((col) => `<td>${row[col]}</td>`).join("") + "</tr>";
      });
      tbody += "</tbody>";
      this.tableEl.innerHTML = thead + tbody;
      // after render attach keyboard navigation and set role attributes for accessibility
      try {
        this.tableEl.setAttribute("role", "table");
        this.tableEl.querySelectorAll("th").forEach((th, i) => {
          th.setAttribute("role", "columnheader");
          th.tabIndex = 0;
          th.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              th.click();
            }
          });
        });
        this.tableEl.querySelectorAll("tbody tr").forEach((tr) => {
          tr.setAttribute("role", "row");
        });
      } catch (e) {}
      // Eventos de ordenação
      this.tableEl.querySelectorAll("th").forEach((th) => {
        th.onclick = () => {
          const colIdx = parseInt(th.getAttribute("WfTable-col"));
          this.sortByColumn(colIdx);
        };
      });
      // Info
      const total = this.filteredData.length;
      const info = this.options.labels.info
        .replace("_START_", total === 0 ? 0 : start + 1)
        .replace("_END_", Math.min(end, total))
        .replace("_TOTAL_", total);
      this.infoDiv.textContent = info;
      // Paginação
      if (this.options.pagination) this.renderPagination(totalPages);
      // Responsividade
      this.tableEl.parentElement.style.overflowX = "auto";
    }

    sortByColumn(index) {
      if (this.sortColumn === index) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = index;
        this.sortDirection = "asc";
      }
      const col = (this.options.columns || Object.keys(this.data[0] || {}))[
        index
      ];
      this.filteredData.sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return this.sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        } else {
          return this.sortDirection === "asc"
            ? String(aVal).localeCompare(bVal)
            : String(bVal).localeCompare(aVal);
        }
      });
      this.currentPage = 1;
      this.updateTable();
    }

    renderPagination(totalPages) {
      this.paginationDiv.innerHTML = "";
      // Botão primeira página
      const first = document.createElement("button");
      first.textContent = "«";
      first.disabled = this.currentPage === 1;
      first.onclick = () => {
        this.currentPage = 1;
        this.updateTable();
      };
      this.paginationDiv.appendChild(first);
      // Botão anterior
      const prev = document.createElement("button");
      prev.textContent = "‹";
      prev.disabled = this.currentPage === 1;
      prev.onclick = () => {
        this.currentPage--;
        this.updateTable();
      };
      this.paginationDiv.appendChild(prev);
      // Números de página (máx 5 visíveis)
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }
      for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === this.currentPage;
        if (i === this.currentPage) btn.className = "active";
        btn.onclick = () => {
          this.currentPage = i;
          this.updateTable();
        };
        this.paginationDiv.appendChild(btn);
      }
      // Botão próximo
      const next = document.createElement("button");
      next.textContent = "›";
      next.disabled = this.currentPage === totalPages;
      next.onclick = () => {
        this.currentPage++;
        this.updateTable();
      };
      this.paginationDiv.appendChild(next);
      // Botão última página
      const last = document.createElement("button");
      last.textContent = "»";
      last.disabled = this.currentPage === totalPages;
      last.onclick = () => {
        this.currentPage = totalPages;
        this.updateTable();
      };
      this.paginationDiv.appendChild(last);
    }

    loadCSS() {
      if (!document.getElementById("wftable-styles")) {
        // Inject internal component CSS to avoid external 404/500 issues
        const s = document.createElement("style");
        s.id = "wftable-styles";
        s.textContent = `
/* WfTable component internal styles - polished 'old' look with WfDay theme support */
:root {
  --swtable-bg: var(--bran);
  --swtable-border: var(--neut2);
  --swtable-head-bg: var(--neut2);
  --swtable-primary: var(--prin);
  --swtable-text: var(--neut10);
  --swtable-muted: var(--neut6);
  --swtable-row-odd: var(--bran); /* cor sim */
  --swtable-row-even: var(--neut1); /* cor não */
  --swtable-hover: var(--neut2);
}

.wftable-container { width: 100%; margin: 0.75rem 0; font-family: inherit; color: var(--swtable-text); }
.wftable-topbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:6px; }
.wftable-topbar-left { display:flex; align-items:center; gap:8px; color: var(--swtable-muted); }
.wftable-length-select { padding:6px 8px; border:1px solid var(--swtable-border); background:var(--swtable-bg); border-radius:4px; }
.wftable-topbar-right { display:flex; align-items:center; gap:8px; }
.wftable-search-label { display:block; }
.wftable-search-input { padding:8px 10px; border:1px solid var(--swtable-border); border-radius:6px; min-width:180px; background: var(--bran); }

.wftable { border-collapse: separate; border-spacing: 0; width:100%; background: var(--swtable-bg); box-shadow: 0 1px 2px rgba(0,0,0,0.02); font-family: var(--font1); }
.wftable thead th { position: sticky; top:0; z-index:2; background: var(--swtable-head-bg); padding:8px; text-align:left; font-family: var(--font1b); border-bottom:1px solid var(--swtable-border); cursor:pointer; }
.wftable tbody td { padding:10px; border-bottom:1px solid var(--swtable-border); vertical-align:middle; font-size:13px; }
.wftable tbody tr:nth-child(odd) { background: var(--swtable-row-odd); }
.wftable tbody tr:nth-child(even) { background: var(--swtable-row-even); }
.wftable tbody tr:hover { background: var(--swtable-hover); }

.wftable-info { font-size:1.2rem; color:var(--swtable-muted); padding:0 0 12px 0; }
.wftable-bottombar { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:2px; }
.wftable-pagination { display:flex; gap:6px; align-items:center; }
.wftable-pagination button { padding:3px 10px; background:var(--swtable-bg); cursor:pointer; border-radius:4px; color:var(--swtable-text); }
.wftable-pagination button.active { background: var(--swtable-primary); color: #fff; border-color: var(--swtable-primary); }
.wftable-empty { padding: 18px; text-align:center; color:var(--swtable-muted); }

/* small badges and action buttons inside table cells */
.wftable .badge { display:inline-block; padding:4px 8px; border-radius:12px; font-size:0.85rem; }
.badge-success { background:var(--suc); color:var(--bran); }
.badge-warning { background:var(--aler); color:var(--neut10); }
.badge-danger { background:var(--notu); color:var(--bran); }

/* responsive adjustments */
@media (max-width:900px){
  .wftable-topbar { flex-direction:column; align-items:stretch; gap:6px; }
  .wftable-search-input { width:100%; min-width:0; }
}

/* WfDay night mode */
html.wfday-night {
  --swtable-bg: var(--neut12);
  --swtable-border: var(--neut10);
  --swtable-head-bg: var(--neut12);
  --swtable-primary: var(--prin-);
  --swtable-text: var(--neut3);
  --swtable-muted: var(--neut6);
   --swtable-row-odd: var(--neut11);
  --swtable-row-even: var(--neut10);
  --swtable-hover: var(--neut12);
}
`;
        document.head.appendChild(s);
      }
    }

    _injectFallbackCSS() {
      if (document.getElementById("wftable-fallback-styles")) return;
      try {
        const s = document.createElement("style");
        s.id = "wftable-fallback-styles";
        s.textContent = `
/* fallback minimal WfTable styles */
.wftable { border-collapse: collapse; width: 100%; }
.wftable th, .wftable td { padding: 8px; border: 1px solid #e0e0e0; }
.wftable th { background: #f5f5f5; }
.wftable-container { width: 100%; overflow-x: auto; }
.wftable-topbar { display: flex; justify-content: space-between; margin-bottom: 10px; }
.wftable-bottombar { display: flex; justify-content: space-between; margin-top: 10px; }
.wftable-pagination button { margin: 0 2px; padding: 5px 10px; }
.wftable-empty { text-align: center; padding: 20px; color: #666; }
`;
        document.head.appendChild(s);
      } catch (e) {
        console.warn("WfTable: Erro ao injetar CSS fallback:", e);
      }
    }

    // API pública
    reload() {
      this.init();
    }
    getData() {
      return this.filteredData;
    }

    // Export current view (filteredData) as CSV
    exportCSV(filename = "export.csv") {
      try {
        const cols = this.options.columns || Object.keys(this.data[0] || {});
        const rows = [cols];
        this.filteredData.forEach((r) => {
          rows.push(
            cols.map((c) =>
              r[c] != null ? String(r[c]).replace(/"/g, '""') : ""
            )
          );
        });
        const csv = rows
          .map((r) => r.map((cell) => `"${cell}"`).join(","))
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV error", e);
      }
    }

    // Inicialização automática
    static initAll(container = document) {
      // Support both: explicit containers with attribute [WfTable] and plain <table class="wftable"> markup
      const selector = "[WfTable], table.wftable";
      let elements = container.querySelectorAll(selector);
      const instances = [];

      // If no elements found in document root, we might be initializing too early — retry a few times
      if (elements.length === 0 && container === document) {
        WfTable._initRetries = (WfTable._initRetries || 0) + 1;
        if (WfTable._initRetries <= 5) {
          // schedule a retry after short delay
          setTimeout(() => WfTable.initAll(document), 150);
          console.debug &&
            console.debug(
              "WfTable.initAll: no elements found, retrying",
              WfTable._initRetries
            );
          return instances;
        }
      }

      elements = container.querySelectorAll(selector);
      elements.forEach((el) => {
        // Ignorar elementos que pertençam ao WfTableAjax (docs/demos usam WfTableAjax)
        try {
          if (
            (el.hasAttribute && el.hasAttribute("WfTableAjax")) ||
            (el.closest && el.closest("[WfTableAjax]")) ||
            (el.classList && el.classList.contains("wftableajax"))
          ) {
            // pular este elemento, ele é gerenciado pelo WfTableAjax
            return;
          }
        } catch (e) {}

        if (!el._swtableInitialized && !el._wfTable) {
          try {
            // If the element is a TABLE inside a wrapper with [WfTable], prefer initializing the wrapper
            let host = el;
            try {
              if (el.tagName && el.tagName.toUpperCase() === "TABLE") {
                const closest = el.closest("[WfTable]");
                if (closest) host = closest;
              }
            } catch (e) {}

            // Check if host already has instance
            if (host._wfTable) {
                instances.push(host._wfTable);
                return;
            }

            const instance = new WfTable(host);
            // attach instance to both host and inner table if present
            try {
              host._wfTable = instance;
              host._swtableInitialized = true;
            } catch (e) {}
            try {
              const innerTable =
                host.tagName && host.tagName.toUpperCase() === "TABLE"
                  ? host
                  : host.querySelector && host.querySelector("table.wftable");
              if (innerTable) {
                innerTable._wfTable = instance;
                innerTable._swtableInitialized = true;
              }
            } catch (e) {}
            instances.push(instance);
          } catch (error) {
            console.warn("WfTable: Erro ao inicializar elemento:", error);
          }
        }
      });

      return instances;
    }

    // Métodos estáticos de conveniência
    static getData(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      const data = [];
      elements.forEach((el) => {
        if (el._wfTable) {
          data.push(el._wfTable.getData());
        }
      });
      return data;
    }

    // Static helper: export CSV for a table element or wrapper
    static exportCSV(tableElement, filename = "export.csv") {
      try {
        const inst =
          tableElement &&
          (tableElement._wfTable ||
            (tableElement.querySelector &&
              tableElement.querySelector("table") &&
              tableElement.querySelector("table")._wfTable));
        if (inst && typeof inst.exportCSV === "function")
          return inst.exportCSV(filename);
        // fallback: try parse static table
        const table =
          tableElement &&
          tableElement.tagName &&
          tableElement.tagName.toUpperCase() === "TABLE"
            ? tableElement
            : tableElement && tableElement.querySelector
            ? tableElement.querySelector("table")
            : null;
        if (!table) return;
        const headers = Array.from(
          table.tHead ? table.tHead.rows[0].cells : []
        ).map((th) => th.textContent.trim());
        const rows = Array.from(table.tBodies[0].rows).map((tr) =>
          Array.from(tr.cells).map((td) => td.textContent.trim())
        );
        const data = [headers].concat(rows);
        const csv = data
          .map((r) =>
            r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
          )
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      } catch (e) {
        console.error("WfTable.exportCSV static fallback error", e);
      }
    }

    static reload(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      elements.forEach((el) => {
        if (el._wfTable) {
          el._wfTable.reload();
        }
      });
    }

    static destroy(container = document) {
      const elements = container.querySelectorAll("table.wftable");
      elements.forEach((el) => {
        if (el._wfTable) {
          delete el._wfTable;
          delete el._swtableInitialized;
        }
      });
    }
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfTable = WfTable;
  } else if (typeof window !== 'undefined') {
    window.WfTable = WfTable;
  }

  // Auto-inicialização apenas se WebFull não estiver presente
  if (typeof window !== 'undefined' && !window.WebFull) {
    const init = () => WfTable.initAll();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

})(window, document);
