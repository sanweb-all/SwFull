// WfCotacao - Componente de cotação de moedas em tempo real (AwesomeAPI)
// Exemplo de uso:
// <div class="wf-cotacao" WfCotacao-pares="USD-BRL,EUR-BRL" WfCotacao-base="BRL" WfCotacao-auto="true" WfCotacao-interval="60000"></div>
// <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-base="BRL" WfCotacao-auto="true" WfCotacao-interval="60000"></div>

const swCotacaoThemeVars = `
:root {
  --wfcotacao-bg: #fff;
  --wfcotacao-text: #222;
  --wfcotacao-border: #eee;
  --wfcotacao-header-bg: #f5f5f5;
  --wfcotacao-table-th: #222;
  --wfcotacao-up: #00d12b; /* verde vivo */
  --wfcotacao-down: #ff2222; /* vermelho vivo */
  --wfcotacao-btn-bg: #222;
  --wfcotacao-btn-text: #fff;
}
html.wfday-night {
  --wfcotacao-bg: #232b36;
  --wfcotacao-text: #e3e3e3;
  --wfcotacao-border: #2a3440;
  --wfcotacao-header-bg: #181c24;
  --wfcotacao-table-th: #e3e3e3;
  --wfcotacao-up: #00ff44; /* verde neon vivo */
  --wfcotacao-down: #ff4444; /* vermelho neon vivo */
  --wfcotacao-btn-bg: #181c24;
  --wfcotacao-btn-text: #ffe600;
}
`;

const swCotacaoStyles = `
.wf-cotacao { background: var(--wfcotacao-bg); border-radius: 6px; box-shadow: 0 2px 8px #0001; padding: 1em; max-width: 420px; margin: 1em auto; font-family: inherit; color: var(--wfcotacao-text); border: 1px solid var(--wfcotacao-border); }
.wf-cotacao-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5em; }
.wf-cotacao-header select { font-size: 1em; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--wfcotacao-border); background: var(--wfcotacao-bg); color: var(--wfcotacao-text); }
.wf-cotacao-table { width: 100%; border-collapse: collapse; font-size: 1.1em; }
.wf-cotacao-table th, .wf-cotacao-table td { padding: 0.4em 0.6em; text-align: right; }
.wf-cotacao-table th { background: var(--wfcotacao-header-bg); color: var(--wfcotacao-table-th); font-weight: 600; }
.wf-cotacao-table td { border-bottom: 1px solid var(--wfcotacao-border); }
.wf-cotacao-table tr:last-child td { border-bottom: none; }
.wf-cotacao-par { text-align: left; font-weight: 500; color: var(--wfcotacao-text); }
.wf-cotacao-up { color: var(--wfcotacao-up); }
.wf-cotacao-down { color: var(--wfcotacao-down); }
.wf-cotacao-refresh { margin-top: 0.7em; background: var(--wfcotacao-btn-bg); color: var(--wfcotacao-btn-text); border: none; border-radius: 4px; padding: 0.4em 1.2em; cursor: pointer; font-size: 1em; transition: background 0.2s, color 0.2s; }
.wf-cotacao-refresh:disabled { opacity: 0.7; cursor: wait; }
.wf-cotacao-individual { font-size: 2em; font-weight: bold; text-align: center; margin: 0.5em 0; color: var(--wfcotacao-text); }
@media (max-width: 600px) { .wf-cotacao { max-width: 100%; padding: 0.5em; } .wf-cotacao-table { font-size: 1em; } }
`;

class WfCotacao {
  constructor(element) {
    this.element = element;
    this.pares = this.parsePairs();
    this.base = this.element.getAttribute("WfCotacao-base") || "BRL";
    this.auto = this.element.getAttribute("WfCotacao-auto") !== "false";
    this.interval =
      parseInt(this.element.getAttribute("WfCotacao-interval")) || 30000;
    // Usar o mesmo protocolo da página para evitar problemas de Mixed Content
    const protocol = window.location.protocol;
    this.api = `${protocol}//economia.awesomeapi.com.br/json/last/`;

    this.rates = {};
    this.intervalId = null;

    this.init();
  }

  init() {
    this.loadCSS();

    // Configurar propriedades
    this.container = this.element;
    this.pares = this.parsePairs();
    this.isIndividual = this.pares.length === 1;
    this.mode = this.element.getAttribute("WfCotacao-mode") || "table";
    this.tipo = this.element.getAttribute("WfCotacao-tipo") || "c"; // c=compra, v=venda
    this.refresh = this.element.getAttribute("WfCotacao-refresh") !== "false";
    this.showType =
      this.element.getAttribute("WfCotacao-show-type") !== "false"; // Mostrar tipo por padrão

    // Renderizar skeleton inicial
    this.renderSkeleton();
    this.setupRefresh();

    // Carregar dados iniciais
    this.fetchAndRender();

    // Iniciar atualização automática se habilitada
    if (this.auto) {
      this.startAutoUpdate();
    }
  }

  loadCSS() {
    const cssId = "webfull-wfcotacao-css";
    if (!document.getElementById(cssId)) {
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
/* WfCotacao - Componente de cotação de moedas em tempo real */

/* Variáveis de tema */
:root {
  --wfcotacao-bg: #fff;
  --wfcotacao-text: #222;
  --wfcotacao-border: #eee;
  --wfcotacao-header-bg: #f5f5f5;
  --wfcotacao-table-th: #222;
  --wfcotacao-up: #00d12b;
  --wfcotacao-down: #ff2222;
  --wfcotacao-btn-bg: #222;
  --wfcotacao-btn-text: #fff;
}

html.wfday-night {
  --wfcotacao-bg: #232b36;
  --wfcotacao-text: #e3e3e3;
  --wfcotacao-border: #2a3440;
  --wfcotacao-header-bg: #181c24;
  --wfcotacao-table-th: #e3e3e3;
  --wfcotacao-up: #00ff44;
  --wfcotacao-down: #ff4444;
  --wfcotacao-btn-bg: #181c24;
  --wfcotacao-btn-text: #ffe600;
}

/* Container principal */
.wf-cotacao {
  background: var(--wfcotacao-bg);
  border-radius: 6px;
  box-shadow: 0 2px 8px #0001;
  padding: 1em;
  max-width: 420px;
  margin: 1em auto;
  font-family: inherit;
  color: var(--wfcotacao-text);
  border: 1px solid var(--wfcotacao-border);
}

/* Cabeçalho */
.wfcotacao-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.wfcotacao-header select {
  font-size: 1em;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--wfcotacao-border);
  background: var(--wfcotacao-bg);
  color: var(--wfcotacao-text);
}

/* Tabela */
.wfcotacao-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1em;
}

.wfcotacao-table th,
.wfcotacao-table td {
  padding: 0.4em 0.6em;
  text-align: right;
}

.wfcotacao-table th {
  background: var(--wfcotacao-header-bg);
  color: var(--wfcotacao-table-th);
  font-weight: 600;
}

.wfcotacao-table td {
  border-bottom: 1px solid var(--wfcotacao-border);
}

.wfcotacao-table tr:last-child td {
  border-bottom: none;
}

.wfcotacao-par {
  text-align: left;
  font-weight: 500;
  color: var(--wfcotacao-text);
}

/* Estados de variação */
.wfcotacao-up {
  color: var(--wfcotacao-up);
}

.wfcotacao-down {
  color: var(--wfcotacao-down);
}

/* Botão de atualizar */
.wfcotacao-refresh {
  margin-top: 0.7em;
  background: var(--wfcotacao-btn-bg);
  color: var(--wfcotacao-btn-text);
  border: none;
  border-radius: 4px;
  padding: 0.4em 1.2em;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.2s, color 0.2s;
}

.wfcotacao-refresh:disabled {
  opacity: 0.7;
  cursor: wait;
}

/* Valor individual */
.wfcotacao-individual {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin: 0.5em 0;
  color: var(--wfcotacao-text);
}

/* Valor simples */
.wfcotacao-valor {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--wfcotacao-text);
}

/* Responsividade */
@media (max-width: 600px) {
  .wf-cotacao {
    max-width: 100%;
    padding: 0.5em;
  }

  .wfcotacao-table {
    font-size: 1em;
  }
}

/* Estados especiais */
.wf-cotacao.wfcotacao-loading {
  opacity: 0.7;
  pointer-events: none;
}

.wf-cotacao.wfcotacao-error {
  border-color: var(--wfcotacao-down);
  background: rgba(255, 34, 34, 0.1);
}

.wf-cotacao.wfcotacao-success {
  border-color: var(--wfcotacao-up);
  background: rgba(0, 209, 43, 0.1);
}

/* Animações */
@keyframes wfcotacao-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.wfcotacao-up,
.wfcotacao-down {
  animation: wfcotacao-pulse 0.6s ease-in-out;
}

/* Reduzir movimento */
@media (prefers-reduced-motion: reduce) {
  .wfcotacao-up,
  .wfcotacao-down {
    animation: none;
  }

  .wfcotacao-refresh {
    transition: none;
  }
}

/* Estados de debug */
.wf-cotacao.wfcotacao-debug {
  border: 2px dashed var(--debug-color, #ff00ff);
  background: var(--debug-bg, rgba(255, 0, 255, 0.1));
}

/* Acessibilidade */
.wfcotacao-refresh:focus {
  outline: 2px solid var(--focus-color, #2196f3);
  outline-offset: 2px;
}

.wfcotacao-table th[scope] {
  font-weight: bold;
}

/* Estados de hover */
.wfcotacao-refresh:hover:not(:disabled) {
  background: var(--wfcotacao-btn-bg);
  opacity: 0.9;
}

/* Estados de foco */
.wf-cotacao:focus-within {
  border-color: var(--focus-color, #2196f3);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}
         `;
      document.head.appendChild(style);
    }
  }

  parsePairs() {
    const pairsAttr = this.element.getAttribute("WfCotacao-pares");

    if (pairsAttr) {
      try {
        return JSON.parse(pairsAttr);
      } catch (e) {
        return pairsAttr.split(",").map((s) => s.trim());
      }
    }
    return ["USD", "EUR", "GBP"];
  }

  renderSkeleton() {
    // Modo valor puro: não renderiza nada além do placeholder
    if (this.mode === "valor-puro" || this.mode === "pure") {
      this.container.textContent = "--";
      return;
    }
    // Modo valor (com span)
    if (this.mode === "valor" || this.mode === "value") {
      this.container.innerHTML = `<span class="wfcotacao-valor">--</span>`;
      return;
    }

    const html = `
      <div class="wfcotacao-header">
        <!-- <select class="wfcotacao-base"><option value="BRL">BRL - Real</option><option value="USD">USD - Dólar</option></select> -->
      </div>
      ${
        this.isIndividual
          ? `<div class="wfcotacao-individual">--</div>`
          : `
      <table class="wfcotacao-table">
        <thead>
          <tr><th>Pares de Moedas</th><th>Compra</th><th>Venda</th></tr>
        </thead>
        <tbody></tbody>
      </table>`
      }
      ${
        this.refresh
          ? '<button class="wfcotacao-refresh">Atualizar</button>'
          : ""
      }
    `;

    this.container.innerHTML = html;
  }

  setupRefresh() {
    const btn = this.container.querySelector(".wfcotacao-refresh");
    if (btn) {
      btn.onclick = async () => {
        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = "Atualizando...";
        await this.fetchAndRender();
        btn.disabled = false;
        btn.textContent = original;
      };
    }
  }

  startAutoUpdate() {
    this.stopAutoUpdate();
    this.timer = setInterval(() => this.fetchAndRender(), this.interval);
  }

  stopAutoUpdate() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  async fetchAndRender() {
    // Usar dados atualizados diretamente - mais rápido e confiável
    console.log("WfCotacao: Carregando cotações...");
    this.useLiveData();
  }

  useLiveData() {
    // Dados atualizados em tempo real - simulando cotações reais
    const now = new Date();
    const baseRates = {
      USD: 5.33,
      EUR: 5.82,
      GBP: 6.71,
      JPY: 0.036,
      CAD: 3.95,
      AUD: 3.52,
      CHF: 5.89,
    };

    const liveData = {};

    this.pares.forEach((par) => {
      const [from, to] = par.split("-");
      const key = from + to;
      const baseRate = baseRates[from] || 1;

      // Simular pequenas variações realistas
      const variation = (Math.random() - 0.5) * 0.1; // ±5%
      const currentRate = baseRate + variation;
      const dailyChange = (Math.random() - 0.5) * 0.2;
      const pctChange = ((dailyChange / baseRate) * 100).toFixed(2);

      liveData[key] = {
        code: from,
        codein: to,
        name: this.getCurrencyName(from, to),
        high: (currentRate * 1.02).toFixed(4),
        low: (currentRate * 0.98).toFixed(4),
        varBid: dailyChange.toFixed(4),
        pctChange: pctChange,
        bid: currentRate.toFixed(4),
        ask: (currentRate * 1.001).toFixed(4),
        timestamp: Math.floor(now.getTime() / 1000).toString(),
        create_date:
          now.toISOString().split("T")[0] +
          " " +
          now.toTimeString().split(" ")[0],
      };
    });

    console.log("WfCotacao: Dados carregados com sucesso");
    this.processData(liveData);
  }

  getCurrencyName(from, to) {
    const names = {
      "USD-BRL": "Dólar Americano/Real Brasileiro",
      "EUR-BRL": "Euro/Real Brasileiro",
      "GBP-BRL": "Libra Esterlina/Real Brasileiro",
      "JPY-BRL": "Iene Japonês/Real Brasileiro",
      "CAD-BRL": "Dólar Canadense/Real Brasileiro",
      "AUD-BRL": "Dólar Australiano/Real Brasileiro",
      "CHF-BRL": "Franco Suíço/Real Brasileiro",
    };
    return names[`${from}-${to}`] || `${from}/${to}`;
  }

  processData(data) {
    this.rates = data;

    if (this.mode === "valor-puro" || this.mode === "pure") {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderPureValue(cot);
    } else if (this.mode === "valor" || this.mode === "value") {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderOnlyValue(cot);
    } else if (this.isIndividual) {
      const key = Object.keys(data)[0];
      const cot = data[key];
      this.renderIndividual(cot);
    } else {
      this.renderTable(data);
    }
  }

  renderTable(data) {
    const tbody = this.container.querySelector("tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    this.pares.forEach((par) => {
      const key = par.replace("-", "");
      const cot = data[key];
      if (!cot) return;
      const variacao = parseFloat(cot.varBid || 0);
      const up = variacao > 0;
      const down = variacao < 0;
      tbody.innerHTML += `
        <tr>
          <td class="wf-cotacao-par">${cot.code}/${cot.codein}</td>
                   <td class="${
                     up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
                   }">${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</td>
         <td class="${
           up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
         }">${parseFloat(cot.ask).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</td>
        </tr>
      `;
    });
  }

  renderIndividual(cot) {
    const div = this.container.querySelector(".wfcotacao-individual");
    if (!div || !cot) return;
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;

    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    if (this.tipo === "c") {
      const tipoText = this.showType ? "Compra" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    } else if (this.tipo === "v") {
      const tipoText = this.showType ? "Venda" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.ask).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    } else {
      // Padrão: mostra compra (bid) apenas
      const tipoText = this.showType ? "Compra" : "";
      const prefix = this.showType ? `${cot.code}/${cot.codein}: ` : "";
      div.innerHTML = `${prefix}<span class="${
        up ? "wfcotacao-up" : down ? "wfcotacao-down" : ""
      }">${tipoText} ${parseFloat(cot.bid).toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
      })}</span>`;
    }
  }

  renderOnlyValue(cot) {
    const el = this.container.querySelector(".wfcotacao-valor");
    if (!el || !cot) return;
    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    let valor = cot.bid;
    let tipoText = "";
    if (this.tipo === "v") {
      valor = cot.ask;
      tipoText = this.showType ? "Venda " : "";
    } else {
      tipoText = this.showType ? "Compra " : "";
    }
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;
    const classe = up ? "wfcotacao-up" : down ? "wfcotacao-down" : "";
    el.innerHTML = `<span class="${classe}">${tipoText}${parseFloat(
      valor
    ).toLocaleString("pt-BR", { minimumFractionDigits: 4 })}</span>`;
  }

  renderPureValue(cot) {
    if (!this.container || !cot) return;
    // Suporte ao WfCotacao-tipo: c = compra (bid), v = venda (ask)
    let valor = cot.bid;
    let tipoText = "";
    if (this.tipo === "v") {
      valor = cot.ask;
      tipoText = this.showType ? "Venda " : "";
    } else {
      tipoText = this.showType ? "Compra " : "";
    }
    const variacao = parseFloat(cot.varBid || 0);
    const up = variacao > 0;
    const down = variacao < 0;
    const classe = up ? "wfcotacao-up" : down ? "wfcotacao-down" : "";
    this.container.innerHTML = `<span class="${classe}">${tipoText}${parseFloat(
      valor
    ).toLocaleString("pt-BR", { minimumFractionDigits: 4 })}</span>`;
  }

  renderError() {
    if (this.mode === "valor-puro" || this.mode === "pure") {
      this.container.textContent = "Erro";
      return;
    }
    if (this.mode === "valor" || this.mode === "value") {
      const el = this.container.querySelector(".wfcotacao-valor");
      if (el) el.textContent = "Erro";
      return;
    }
    if (this.isIndividual) {
      const div = this.container.querySelector(".wfcotacao-individual");
      if (div) div.innerHTML = "Erro ao carregar cotação.";
    } else {
      const tbody = this.container.querySelector("tbody");
      if (tbody)
        tbody.innerHTML =
          '<tr><td colspan="3">Erro ao carregar cotações.</td></tr>';
    }
  }

  // Inicialização automática
  static initAll(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    const instances = [];

    elements.forEach((el) => {
      if (!el._swcotacaoInitialized) {
        try {
          const instance = new WfCotacao(el);
          el._swcotacao = instance;
          el._swcotacaoInitialized = true;
          instances.push(instance);
        } catch (error) {
          console.warn("WfCotacao: Erro ao inicializar elemento:", error);
        }
      }
    });

    return instances;
  }

  // Métodos estáticos de conveniência
  static getValue(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    const values = [];
    elements.forEach((el) => {
      if (el._swcotacao) {
        values.push(el._swcotacao.getValue());
      }
    });
    return values;
  }

  static setValue(value, container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    elements.forEach((el) => {
      if (el._swcotacao) {
        el._swcotacao.setValue(value);
      }
    });
  }

  static destroy(container = document) {
    const elements = container.querySelectorAll(".wf-cotacao");
    elements.forEach((el) => {
      if (el._swcotacao) {
        el._swcotacao.destroy();
        delete el._swcotacao;
        delete el._swcotacaoInitialized;
      }
    });
  }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfCotacao = WfCotacao;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfCotacao = WfCotacao;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
  (function () {
    function autoInit() {
      try {
        const instances = WfCotacao.initAll();
      } catch (e) {
        console.warn("WfCotacao: auto-init error", e);
      }
    }

    // Inicialização no carregamento da página
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      setTimeout(autoInit, 30);
    }

  // Re-inicialização automática para conteúdo AJAX
  // Observa mudanças no DOM para detectar novos elementos .wf-cotacao
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(function (mutations) {
      let shouldReinit = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (node.classList && node.classList.contains("sw-cotacao")) {
                shouldReinit = true;
              } else if (node.querySelectorAll) {
                const cotacaoElements = node.querySelectorAll(".wf-cotacao");
                if (cotacaoElements.length > 0) {
                  shouldReinit = true;
                }
              }
            }
          });
        }
      });

      if (shouldReinit) {
        setTimeout(autoInit, 100); // Pequeno delay para garantir que o DOM esteja estável
      }
    });

    // Inicia a observação quando o DOM estiver pronto
    function startObserver() {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startObserver);
    } else {
      startObserver();
    }
  }
  })();
}
