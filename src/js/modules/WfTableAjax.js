(function(window, document) {
'use strict';

// WfTableAjax.js - Tabela AJAX Avançada similar ao DataTables
// SandroWeb 2025 - Versão 4.0 - Funcionalidades Completas AJAX

class WfTableAjax {
  constructor(element) {
      this.element = element;
      this.isTable = (this.element.tagName || '').toLowerCase() === 'table';
      this.config = this.parseConfig();
      this.currentPage = 1;
      this.itemsPerPage = parseInt(this.config.pageLength || 10);
      this.totalItems = 0;
      this.totalPages = 0;
      this.data = [];
      this.filteredData = [];
      this.sortColumn = null;
      this.sortDirection = 'asc';
      this.searchTerm = '';
      this.isLoading = false;
      this.columns = [];
      this.columnDefs = [];
      this.processing = false;
      this.serverSide = true; // Sempre AJAX
      this.drawCounter = 0;
      this.wrapper = null;
      this.tableEl = null;
      // aplicar ordenação inicial da configuração
      try {
         const initOrder = this.config && this.config.order ? this.config.order : null;
         if (Array.isArray(initOrder)) {
            const first = initOrder[0];
            if (first && typeof first.column === 'number') {
               this.sortColumn = first.column;
               this.sortDirection = (first.dir || 'asc').toLowerCase();
            } else if (Array.isArray(first)) {
               // formato [[index, dir]]
               this.sortColumn = parseInt(first[0], 10) || 0;
               this.sortDirection = String(first[1] || 'asc').toLowerCase();
            }
         } else if (initOrder && typeof initOrder === 'object' && initOrder.column !== undefined) {
            this.sortColumn = parseInt(initOrder.column, 10) || 0;
            this.sortDirection = String(initOrder.dir || 'asc').toLowerCase();
         }
      } catch (e) {}
      
      this.init();
  }

   parseConfig() {
      let config = {
         ajax: {
            url: null,
            type: 'POST',
            data: null,
            dataSrc: 'data'
         },
         columns: [],
         columnDefs: [],
         pageLength: 10,
         lengthMenu: [10, 25, 50, 100],
         searching: true,
         ordering: true,
         paging: true,
         info: true,
         processing: true,
         serverSide: true,
         responsive: true,
         language: {
            processing: 'Processando...',
            search: 'Buscar:',
            lengthMenu: 'Exibir _MENU_ registros por página',
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 a 0 de 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros no total)',
            loadingRecords: 'Carregando...',
            zeroRecords: 'Nenhum registro encontrado',
            emptyTable: 'Nenhum dado disponível na tabela',
            paginate: {
               first: '««',
               previous: '‹',
               next: '›',
               last: '»»'
            }
         }
      };

      // Parse main config
      try {
         const mainConfigAttr = this.element.getAttribute('WfTableAjax');
         if (mainConfigAttr) {
            const parsed = JSON.parse(mainConfigAttr);
            config = { ...config, ...parsed };
         }
      } catch (e) {
         console.warn('WfTableAjax: JSON inválido no atributo WfTableAjax:', e);
      }

      // Parse individual attributes
      const url = this.element.getAttribute('WfTableAjax-url');
      if (url) config.ajax.url = url;

      const serverSideAttr = this.element.getAttribute('WfTableAjax-serverSide');
      if (serverSideAttr !== null) config.serverSide = serverSideAttr !== 'false';

      const pageLength = this.element.getAttribute('WfTableAjax-pageLength');
      if (pageLength) config.pageLength = parseInt(pageLength, 10);

      const searching = this.element.getAttribute('WfTableAjax-searching');
      if (searching !== null) config.searching = searching !== 'false';

      const ordering = this.element.getAttribute('WfTableAjax-ordering');
      if (ordering !== null) config.ordering = ordering !== 'false';

      const paging = this.element.getAttribute('WfTableAjax-paging');
      if (paging !== null) config.paging = paging !== 'false';

      const info = this.element.getAttribute('WfTableAjax-info');
      if (info !== null) config.info = info !== 'false';

      const responsive = this.element.getAttribute('WfTableAjax-responsive');
      if (responsive !== null) config.responsive = responsive !== 'false';

      // Parse default order from attribute
      try {
         const orderAttr = this.element.getAttribute('WfTableAjax-order');
         if (orderAttr) {
            const parsedOrder = JSON.parse(orderAttr);
            config.order = parsedOrder;
         }
      } catch (e) {
         console.warn('WfTableAjax: JSON inválido em WfTableAjax-order:', e);
      }

      // Parse columns from table headers
      const headers = this.element.querySelectorAll('thead th');
      if (headers.length > 0 && config.columns.length === 0) {
         headers.forEach((th, index) => {
            const columnConfig = {
               data: th.getAttribute('data-field') || index.toString(),
               title: th.textContent.trim(),
               orderable: th.getAttribute('data-orderable') !== 'false',
               searchable: th.getAttribute('data-searchable') !== 'false',
               visible: th.getAttribute('data-visible') !== 'false',
               width: th.getAttribute('data-width') || null,
               className: th.getAttribute('data-class') || null
            };
            
            const render = th.getAttribute('data-render');
            if (render) {
               try {
                  columnConfig.render = new Function('data', 'type', 'row', 'meta', `return ${render}(data, type, row, meta)`);
               } catch (e) {
                  console.warn(`WfTableAjax: Erro ao criar função de renderização para coluna ${index}:`, e);
               }
            }
            
            config.columns.push(columnConfig);
         });
      }

      this.serverSide = config.serverSide === true;
      return config;
   }

   async init() {
      this.loadCSS();
      this.renderContainer();
      await this.loadData();
   }

   loadCSS() {
      if (document.getElementById('wftableajax-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'wftableajax-styles';
      style.textContent = `
         :root {
           --wftableajax-bg: var(--bran, #fff);
           --wftableajax-border: var(--neut2, #dee2e6);
           --wftableajax-head-bg: var(--neut1, #f8f9fa);
           --wftableajax-primary: var(--prin, #007bff);
           --wftableajax-text: var(--neut10, #212529);
           --wftableajax-muted: var(--neut6, #6c757d);
           --wftableajax-row-odd: var(--bran, #fff);
           --wftableajax-row-even: var(--neut1, #f8f9fa);
           --wftableajax-hover: var(--neut2, #e9ecef);
           --wftableajax-active: var(--prin, #007bff);
           --wftableajax-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
         }
         
         html.wfday-night {
           --wftableajax-bg: var(--neut11, #2d3748);
           --wftableajax-border: var(--neut9, #4a5568);
           --wftableajax-head-bg: var(--neut10, #1a202c);
           --wftableajax-primary: var(--prin-, #4299e1);
           --wftableajax-text: var(--neut2, #e2e8f0);
           --wftableajax-muted: var(--neut5, #a0aec0);
           --wftableajax-row-odd: var(--neut11, #2d3748);
           --wftableajax-row-even: var(--neut10, #1a202c);
           --wftableajax-hover: var(--neut9, #4a5568);
         }

         .wftableajax-wrapper {
            width: 100%;
            margin: 1rem 0;
            font-family: inherit;
            color: var(--wftableajax-text);
            background: var(--wftableajax-bg);
            border-radius: 8px;
            box-shadow: var(--wftableajax-shadow);
            overflow: hidden;
         }

         .wftableajax-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--wftableajax-head-bg);
            border-bottom: 1px solid var(--wftableajax-border);
            gap: 1rem;
            flex-wrap: wrap;
         }

         .wftableajax-header-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
         }

         .wftableajax-header-right {
            display: flex;
            align-items: center;
            gap: 0.5rem;
         }

         .wftableajax-length-select {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            border-radius: 0.375rem;
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            font-size: 1.4rem;
         }

         .wftableajax-search-input {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            border-radius: 0.375rem;
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            font-size: 1.4rem;
            min-width: 200px;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
         }

         .wftableajax-search-input:focus {
            outline: none;
            border-color: var(--wftableajax-primary);
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
         }

         .wftableajax-table-container {
            overflow-x: auto;
            max-height: 70vh;
         }

         .wftableajax-table {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 0 !important;
            background: var(--wftableajax-bg) !important;
            margin: 0 !important;
         }

         .wftableajax-table thead th {
            position: sticky !important;
            top: 0 !important;
            z-index: 10 !important;
            background: var(--wftableajax-head-bg) !important;
            padding: 0.75rem !important;
            text-align: left !important;
            border-bottom: 2px solid var(--wftableajax-border) !important;
            font-weight: 600 !important;
            font-size: 1.4rem !important;
            white-space: nowrap !important;
            user-select: none !important;
            color: var(--wftableajax-text) !important;
         }

         .wftableajax-table thead th.sortable {
            cursor: pointer;
            transition: background-color 0.15s ease;
         }

         .wftableajax-table thead th.sortable:hover {
            background: var(--wftableajax-hover);
         }

         .wftableajax-table thead th .sort-icon {
            margin-left: 0.5rem;
            opacity: 0.5;
            transition: opacity 0.15s ease;
         }

         .wftableajax-table thead th.sorting .sort-icon {
            opacity: 1;
         }

         .wftableajax-table tbody td {
            padding: 0.75rem !important;
            border-bottom: 1px solid var(--wftableajax-border) !important;
            vertical-align: middle !important;
            font-size: 1.3rem !important;
            color: var(--wftableajax-text) !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
         }

         .wftableajax-table tbody tr:nth-child(odd) {
            background: var(--wftableajax-row-odd) !important;
         }

         .wftableajax-table tbody tr:nth-child(even) {
            background: var(--wftableajax-row-even) !important;
         }

         .wftableajax-table tbody tr:hover {
            background: var(--wftableajax-hover) !important;
         }

         .wftableajax-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: var(--wftableajax-head-bg);
            border-top: 1px solid var(--wftableajax-border);
            gap: 1rem;
            flex-wrap: wrap;
         }

         .wftableajax-info {
            color: var(--wftableajax-muted);
            font-size: 1.3rem;
         }

         .wftableajax-pagination {
            display: flex;
            gap: 0.25rem;
            align-items: center;
         }

         .wftableajax-pagination button {
            padding: 0.375rem 0.75rem;
            border: 1px solid var(--wftableajax-border);
            background: var(--wftableajax-bg);
            color: var(--wftableajax-text);
            cursor: pointer;
            border-radius: 0.375rem;
            font-size: 1.3rem;
            transition: all 0.15s ease;
         }

         .wftableajax-pagination button:hover:not(:disabled) {
            background: var(--wftableajax-hover);
         }

         .wftableajax-pagination button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
         }

         .wftableajax-pagination button.active {
            background: var(--wftableajax-primary);
            color: white;
            border-color: var(--wftableajax-primary);
         }

         .wftableajax-processing {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 8px;
         }

         html.wfday-night .wftableajax-processing {
            background: rgba(45, 55, 72, 0.8);
         }

         .wftableajax-processing-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 1.5rem;
            background: var(--wftableajax-bg);
            border-radius: 0.5rem;
            box-shadow: var(--wftableajax-shadow);
         }

         .wftableajax-spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid var(--wftableajax-border);
            border-top: 2px solid var(--wftableajax-primary);
            border-radius: 50%;
            animation: wftableajax-spin 1s linear infinite;
         }

         @keyframes wftableajax-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
         }

         .wftableajax-empty {
            padding: 3rem;
            text-align: center;
            color: var(--wftableajax-muted);
            font-size: 1.6rem;
         }

         .wftableajax-error {
            padding: 1rem;
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 0.375rem;
            margin: 1rem;
         }

         html.wfday-night .wftableajax-error {
            background: #2d1b1e;
            color: #f8d7da;
            border-color: #842029;
         }

         @media (max-width: 768px) {
            .wftableajax-header,
            .wftableajax-footer {
               flex-direction: column;
               align-items: stretch;
            }

            .wftableajax-header-left,
            .wftableajax-header-right {
               justify-content: center;
            }

            .wftableajax-search-input {
               min-width: auto;
               width: 100%;
            }

            .wftableajax-table thead th,
            .wftableajax-table tbody td {
               padding: 0.5rem;
               font-size: 1.2rem;
            }
         }
      `;
      document.head.appendChild(style);
   }

  renderContainer() {
      if (this.isTable) {
         const table = this.element;
         const parent = table.parentNode;
         const wrapper = document.createElement('div');
         wrapper.className = 'wftableajax-wrapper';
         wrapper.style.position = 'relative';
         if (parent) {
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
         } else {
            // fallback: wrap by creating a sibling container
            table.insertAdjacentElement('beforebegin', wrapper);
            wrapper.appendChild(table);
         }
         // Ensure tbody exists
         if (!table.querySelector('tbody')) {
            const tbody = document.createElement('tbody');
            table.appendChild(tbody);
         }
         this.wrapper = wrapper;
         this.tableEl = table;
      } else {
         this.element.innerHTML = '';
         
         this.wrapper = document.createElement('div');
         this.wrapper.className = 'wftableajax-wrapper';
         this.wrapper.style.position = 'relative';
         
         this.element.appendChild(this.wrapper);
      }
  }

   async loadData() {
      if (!this.config.ajax.url) {
         this.showError('URL AJAX não configurada');
         return;
      }

      this.setProcessing(true);
      this.drawCounter++;

      try {
         const requestData = this.buildRequestData();
         const response = await this.makeAjaxRequest(requestData);
         if (this.serverSide) {
            this.processResponse(response);
         } else {
            this.dataAll = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : []);
            this.totalItems = this.dataAll.length;
            this.filteredItems = this.dataAll.length;
            this.totalPages = Math.ceil(this.filteredItems / this.itemsPerPage) || 1;
            this.applyClientFilters();
         }
         this.renderTable();
         
      } catch (error) {
         console.error('WfTableAjax: Erro ao carregar dados:', error);
         this.showError(`Erro ao carregar dados: ${error.message}`);
      } finally {
         this.setProcessing(false);
      }
   }

   applyClientFilters() {
      const term = (this.searchTerm || '').toLowerCase();
      let filtered = Array.isArray(this.dataAll) ? this.dataAll.slice() : [];
      if (term) {
         filtered = filtered.filter(row => {
            return this.config.columns.some(col => {
               const key = col.data;
               const v = (row && row[key] !== undefined && row[key] !== null) ? String(row[key]).toLowerCase() : '';
               return v.includes(term);
            });
         });
      }
      if (this.sortColumn !== null && this.config.ordering) {
         const col = this.config.columns[this.sortColumn];
         const key = col ? col.data : null;
         if (key) {
            filtered.sort((a,b)=>{
               const va = a[key];
               const vb = b[key];
               if (va === vb) return 0;
               if (this.sortDirection === 'asc') return (va > vb) ? 1 : -1;
               return (va < vb) ? 1 : -1;
            });
         }
      }
      this.filteredItems = filtered.length;
      this.totalPages = Math.ceil((this.filteredItems || 0) / this.itemsPerPage) || 1;
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.data = filtered.slice(start, end);
   }

   buildRequestData() {
      const data = {
         draw: this.drawCounter,
         start: (this.currentPage - 1) * this.itemsPerPage,
         length: this.itemsPerPage,
         search: {
            value: this.searchTerm,
            regex: false
         },
         order: [],
         columns: []
      };

      // Add column information
      this.config.columns.forEach((col, index) => {
         data.columns.push({
            data: col.data,
            name: col.data,
            searchable: col.searchable !== false,
            orderable: col.orderable !== false,
            search: {
               value: '',
               regex: false
            }
         });
      });

      // Add sorting information
      if (this.sortColumn !== null) {
         data.order.push({
            column: this.sortColumn,
            dir: this.sortDirection
         });
      }

      // Merge with custom data
      if (this.config.ajax.data) {
         if (typeof this.config.ajax.data === 'function') {
            return { ...data, ...this.config.ajax.data(data) };
         } else {
            return { ...data, ...this.config.ajax.data };
         }
      }

      return data;
   }

   async makeAjaxRequest(data) {
      const url = this.config.ajax.url;
      const method = this.serverSide ? (this.config.ajax.type || 'POST') : 'GET';

      const options = {
         method: method,
         headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
         }
      };

      if (method.toUpperCase() === 'POST' && this.serverSide) {
         options.body = JSON.stringify(data);
      } else if (method.toUpperCase() === 'GET' && this.serverSide) {
         const params = new URLSearchParams();
         Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object') {
               params.append(key, JSON.stringify(data[key]));
            } else {
               params.append(key, data[key]);
            }
         });
         const separator = url.includes('?') ? '&' : '?';
         const finalUrl = `${url}${separator}${params.toString()}`;
         options.url = finalUrl;
      }

      const response = await fetch(method.toUpperCase() === 'GET' && options.url ? options.url : url, options);

      if (!response.ok) {
         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
   }

   processResponse(response) {
      // Support DataTables format
      if (response.data && Array.isArray(response.data)) {
         this.data = response.data;
         this.totalItems = parseInt(response.recordsTotal || response.recordsFiltered || response.data.length);
         this.filteredItems = parseInt(response.recordsFiltered || response.recordsTotal || response.data.length);
      } else if (Array.isArray(response)) {
         this.data = response;
         this.totalItems = response.length;
         this.filteredItems = response.length;
      } else {
         throw new Error('Formato de resposta inválido');
      }

      this.totalPages = Math.ceil(this.filteredItems / this.itemsPerPage);
      
      // Ensure current page is valid
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
         this.currentPage = this.totalPages;
      }
   }

   renderTable() {
      this.wrapper.innerHTML = '';

      // Render header
      if (this.config.searching || this.config.paging) {
         this.renderHeader();
      }

      // Render table
      this.renderTableElement();

      // Render footer
      if (this.config.info || this.config.paging) {
         this.renderFooter();
      }

      this.setupEventListeners();
   }

   renderHeader() {
      const header = document.createElement('div');
      header.className = 'wftableajax-header';

      const leftSide = document.createElement('div');
      leftSide.className = 'wftableajax-header-left';

      if (this.config.paging) {
         const lengthLabel = document.createElement('span');
         lengthLabel.textContent = 'Mostrar ';
         leftSide.appendChild(lengthLabel);

         this.lengthSelect = document.createElement('select');
         this.lengthSelect.className = 'wftableajax-length-select';
         
         this.config.lengthMenu.forEach(length => {
            const option = document.createElement('option');
            option.value = length;
            option.textContent = length;
            option.selected = length === this.itemsPerPage;
            this.lengthSelect.appendChild(option);
         });

         leftSide.appendChild(this.lengthSelect);

         const entriesLabel = document.createElement('span');
         entriesLabel.textContent = ' registros';
         leftSide.appendChild(entriesLabel);
      }

      const rightSide = document.createElement('div');
      rightSide.className = 'wftableajax-header-right';

      if (this.config.searching) {
         const searchLabel = document.createElement('span');
         searchLabel.textContent = this.config.language.search + ' ';
         rightSide.appendChild(searchLabel);

         this.searchInput = document.createElement('input');
         this.searchInput.type = 'text';
         this.searchInput.className = 'wftableajax-search-input';
         this.searchInput.placeholder = 'Digite para buscar...';
         this.searchInput.value = this.searchTerm;
         rightSide.appendChild(this.searchInput);
      }

      header.appendChild(leftSide);
      header.appendChild(rightSide);
      this.wrapper.appendChild(header);
   }

  renderTableElement() {
      const tableContainer = document.createElement('div');
      tableContainer.className = 'wftableajax-table-container';
      let table, thead, tbody;
      if (this.isTable) {
         table = this.tableEl;
         table.classList.add('wftableajax-table');
         thead = table.querySelector('thead');
         tbody = table.querySelector('tbody');
         if (!thead) {
            thead = document.createElement('thead');
            table.insertBefore(thead, table.firstChild);
         }
         // decorate existing header
         const headerCells = thead.querySelectorAll('tr th');
         headerCells.forEach((th, index) => {
            const col = this.config.columns[index];
            th.dataset.column = index;
            if (col && col.orderable !== false && this.config.ordering) {
               th.classList.add('sortable');
               let sortIcon = th.querySelector('.sort-icon');
               if (!sortIcon) {
                  sortIcon = document.createElement('span');
                  sortIcon.className = 'sort-icon';
                  th.appendChild(sortIcon);
               }
               if (this.sortColumn === index) {
                  th.classList.add('sorting');
                  sortIcon.textContent = this.sortDirection === 'asc' ? ' ↑' : ' ↓';
               } else {
                  sortIcon.textContent = ' ↕';
               }
            }
         });
      } else {
         table = document.createElement('table');
         table.className = 'wftableajax-table';
         thead = document.createElement('thead');
         const headerRow = document.createElement('tr');
         this.config.columns.forEach((col, index) => {
            const th = document.createElement('th');
            th.textContent = col.title;
            th.dataset.column = index;
            if (col.orderable !== false && this.config.ordering) {
               th.classList.add('sortable');
               const sortIcon = document.createElement('span');
               sortIcon.className = 'sort-icon';
               if (this.sortColumn === index) {
                  th.classList.add('sorting');
                  sortIcon.textContent = this.sortDirection === 'asc' ? ' ↑' : ' ↓';
               } else {
                  sortIcon.textContent = ' ↕';
               }
               th.appendChild(sortIcon);
            }
            if (col.width) th.style.width = col.width;
            if (col.className) th.classList.add(col.className);
            headerRow.appendChild(th);
         });
         thead.appendChild(headerRow);
         table.appendChild(thead);
         tbody = document.createElement('tbody');
      }
      // render body rows
      tbody.innerHTML = '';
      if (this.data.length === 0) {
         const emptyRow = document.createElement('tr');
         const emptyCell = document.createElement('td');
         emptyCell.colSpan = this.config.columns.length;
         emptyCell.className = 'wftableajax-empty';
         emptyCell.textContent = this.config.language.emptyTable;
         emptyRow.appendChild(emptyCell);
         tbody.appendChild(emptyRow);
      } else {
         this.data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            this.config.columns.forEach((col, colIndex) => {
               const td = document.createElement('td');
               let cellData = this.getCellData(row, col.data);
               if (col.render && typeof col.render === 'function') {
                  try {
                     cellData = col.render(cellData, 'display', row, { row: rowIndex, col: colIndex });
                  } catch (e) {
                     console.warn(`WfTableAjax: Erro na função render da coluna ${colIndex}:`, e);
                  }
               }
               if (typeof cellData === 'string' || typeof cellData === 'number') {
                  if (typeof cellData === 'string' && /<[^>]+>/.test(cellData)) {
                     td.innerHTML = cellData;
                  } else {
                     td.textContent = cellData;
                  }
               } else {
                  td.innerHTML = cellData;
               }
               if (col.className) td.classList.add(col.className);
               tr.appendChild(td);
            });
            tbody.appendChild(tr);
         });
      }
      if (!this.isTable) {
         table.appendChild(tbody);
      }
      tableContainer.appendChild(table);
      this.wrapper.appendChild(tableContainer);
  }

   getCellData(row, dataPath) {
      if (typeof dataPath === 'number') {
         return Object.values(row)[dataPath] || '';
      }

      const keys = dataPath.split('.');
      let value = row;

      for (const key of keys) {
         if (value && typeof value === 'object' && key in value) {
            value = value[key];
         } else {
            return '';
         }
      }

      return value !== null && value !== undefined ? value : '';
   }

   renderFooter() {
      const footer = document.createElement('div');
      footer.className = 'wftableajax-footer';

      // Info
      if (this.config.info) {
         this.infoElement = document.createElement('div');
         this.infoElement.className = 'wftableajax-info';
         this.updateInfo();
         footer.appendChild(this.infoElement);
      }

      // Pagination
      if (this.config.paging && this.totalPages > 1) {
         this.paginationElement = document.createElement('div');
         this.paginationElement.className = 'wftableajax-pagination';
         this.renderPagination();
         footer.appendChild(this.paginationElement);
      }

      this.wrapper.appendChild(footer);
   }

   updateInfo() {
      if (!this.infoElement) return;

      const start = this.data.length > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
      const end = Math.min(start + this.data.length - 1, this.filteredItems);

      let infoText = this.config.language.info;
      infoText = infoText.replace('_START_', start.toLocaleString());
      infoText = infoText.replace('_END_', end.toLocaleString());
      infoText = infoText.replace('_TOTAL_', this.filteredItems.toLocaleString());

      if (this.filteredItems < this.totalItems) {
         infoText += ' ' + this.config.language.infoFiltered.replace('_MAX_', this.totalItems.toLocaleString());
      }

      this.infoElement.textContent = infoText;
   }

   renderPagination() {
      if (!this.paginationElement) return;

      this.paginationElement.innerHTML = '';

      // First button
      const firstBtn = this.createPaginationButton(this.config.language.paginate.first, 1);
      firstBtn.disabled = this.currentPage === 1;
      this.paginationElement.appendChild(firstBtn);

      // Previous button
      const prevBtn = this.createPaginationButton(this.config.language.paginate.previous, this.currentPage - 1);
      prevBtn.disabled = this.currentPage === 1;
      this.paginationElement.appendChild(prevBtn);

      // Page numbers
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
         const pageBtn = this.createPaginationButton(i.toString(), i);
         if (i === this.currentPage) {
            pageBtn.classList.add('active');
         }
         this.paginationElement.appendChild(pageBtn);
      }

      // Next button
      const nextBtn = this.createPaginationButton(this.config.language.paginate.next, this.currentPage + 1);
      nextBtn.disabled = this.currentPage === this.totalPages;
      this.paginationElement.appendChild(nextBtn);

      // Last button
      const lastBtn = this.createPaginationButton(this.config.language.paginate.last, this.totalPages);
      lastBtn.disabled = this.currentPage === this.totalPages;
      this.paginationElement.appendChild(lastBtn);
   }

   createPaginationButton(text, page) {
      const button = document.createElement('button');
      button.textContent = text;
      button.dataset.page = page;
      return button;
   }

   setupEventListeners() {
      // Search input
      if (this.searchInput) {
         let searchTimeout;
         this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
               this.searchTerm = e.target.value;
               this.currentPage = 1;
               if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
            }, 300);
         });
      }

      // Length select
      if (this.lengthSelect) {
         this.lengthSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
         });
      }

      // Sorting
      if (this.config.ordering) {
         const sortableHeaders = this.wrapper.querySelectorAll('th.sortable');
         sortableHeaders.forEach(th => {
            th.addEventListener('click', () => {
               const column = parseInt(th.dataset.column);
               
               if (this.sortColumn === column) {
                  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
               } else {
                  this.sortColumn = column;
                  this.sortDirection = 'asc';
               }
               
               this.currentPage = 1;
               if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
            });
         });
      }

      // Pagination
      if (this.paginationElement) {
         this.paginationElement.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
               const page = parseInt(e.target.dataset.page);
               if (page && page !== this.currentPage) {
                  this.currentPage = page;
                  if (this.serverSide) this.loadData(); else { this.applyClientFilters(); this.renderTable(); }
               }
            }
         });
      }
   }

   setProcessing(show) {
      this.processing = show;

      // Remove existing processing overlay
      const existingOverlay = this.wrapper.querySelector('.wftableajax-processing');
      if (existingOverlay) {
         existingOverlay.remove();
      }

      if (show && this.config.processing) {
         const overlay = document.createElement('div');
         overlay.className = 'wftableajax-processing';

         const content = document.createElement('div');
         content.className = 'wftableajax-processing-content';

         const spinner = document.createElement('div');
         spinner.className = 'wftableajax-spinner';

         const text = document.createElement('span');
         text.textContent = this.config.language.processing;

         content.appendChild(spinner);
         content.appendChild(text);
         overlay.appendChild(content);
         this.wrapper.appendChild(overlay);
      }
   }

   showError(message) {
      this.wrapper.innerHTML = '';
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'wftableajax-error';
      errorDiv.textContent = message;
      
      this.wrapper.appendChild(errorDiv);
   }

   // Public API methods
   ajax = {
      reload: (callback, resetPaging = true) => {
         if (resetPaging) {
            this.currentPage = 1;
         }
         this.loadData().then(() => {
            if (callback) callback();
         });
      },
      
      url: (newUrl) => {
         if (newUrl !== undefined) {
            this.config.ajax.url = newUrl;
            return this;
         }
         return this.config.ajax.url;
      }
   };

   page = (page) => {
      if (page !== undefined) {
         this.currentPage = Math.max(1, Math.min(page, this.totalPages));
         this.loadData();
         return this;
      }
      return this.currentPage;
   };

   search = (value) => {
      if (value !== undefined) {
         this.searchTerm = value;
         if (this.searchInput) {
            this.searchInput.value = value;
         }
         this.currentPage = 1;
         this.loadData();
         return this;
      }
      return this.searchTerm;
   };

   order = (column, direction) => {
      if (column !== undefined) {
         this.sortColumn = column;
         this.sortDirection = direction || 'asc';
         this.currentPage = 1;
         this.loadData();
         return this;
      }
      return { column: this.sortColumn, direction: this.sortDirection };
   };

   destroy() {
      if (this.element) {
         this.element.innerHTML = '';
         delete this.element._wftableajax;
      }
   }

   static initAll(container = document) {
      const elements = container.querySelectorAll('[WfTableAjax]');
      elements.forEach(el => {
         if (!el._wftableajax) {
            try {
               el._wftableajax = new WfTableAjax(el);
            } catch (error) {
               console.warn('WfTableAjax: Erro ao inicializar elemento:', error);
            }
         }
      });
   }
}

  // Exportação Global
  if (typeof window !== 'undefined') {
     window.WfTableAjax = WfTableAjax;
     if (typeof window.WebFull !== 'undefined') {
        window.WebFull.modules.WfTableAjax = WfTableAjax;
     }
  }

  // Auto-inicialização
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfTableAjax.initAll());
    } else {
      WfTableAjax.initAll();
    }
  }
})(window, document);
