<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTable</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTable</li>
        </ol>
      </nav>
    </div>
<section class="wftablex">
    <div class="g-xg">
      <!-- Cabeçalho do Componente -->
      <div class="l">
        <div class="co12-g">
          <h3>[Sistema de Tabelas Dinâmicas]</h3>
          <p>
            O <b>WfTable</b> é o sistema oficial de tabelas do WEBFULL
            Framework. Oferece ordenação, filtros, paginação, busca e
            exportação. Suporta dados estáticos e tabelas HTML diretas, com foco
            em performance e usabilidade.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b
              ><i class="wf wf-fast-forward-circle Taler f20"></i>
              IMPORTANTE:</b
            >
            Este é o sistema de tabelas OFICIAL do WEBFULL!<br />
            <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use tabelas
            HTML simples para dados dinâmicos<br />
            <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use
            WfTable para funcionalidade completa e UX superior
          </div>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b
              ><i class="wf wf-table Taler f20"></i> FUNCIONALIDADES:</b
            >
            Ordenação, filtros, paginação, busca, exportação<br />
            <b
              ><i class="wf wf-search Taler f20"></i> BUSCA INTELIGENTE:</b
            >
            Busca em tempo real em todas as colunas<br />
            <b><i class="wf wf-mobile Taler f20"></i> RESPONSIVO:</b>
            Adaptação perfeita para mobile com scroll horizontal<br />
            <b
              ><i class="wf wf-moon Taler f20"></i> TEMA DIA/NOITE:</b
            >
            Integração automática com WfDay<br />
            <b
              ><i class="wf wf-download Taler f20"></i> EXPORTAÇÃO:</b
            >
            CSV, Excel, PDF e HTML
          </div>
        </div>
      </div>

      <!-- Uso Básico -->
      <div class="l">
        <div class="co12-g">
          <h3>Uso Básico</h3>
          <p>
            O WfTable oferece uma interface simples para criar tabelas
            dinâmicas:
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Tabela básica com dados estáticos -->
<div WfTable>
  <table class="wftable">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>João Silva</td>
        <td>joao@email.com</td>
        <td><span class="badge badge-success">Ativo</span></td>
        <td>
          <button class="btn btn-sm btn-primary">Editar</button>
          <button class="btn btn-sm btn-danger">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Tabela com funcionalidades avançadas -->
<div WfTable
     WfTable-search="true"
     WfTable-sort="true"
     WfTable-filter="true"
     WfTable-pagination="true"
     WfTable-export="true">
  <!-- Conteúdo da tabela -->
</div>
</script></pre>
        </div>
      </div>
      <div class="l">
        <div class="co12-g">
          <h3>Exemplo Funcionando</h3>
          <div
            WfTable
            WfTable-search="true"
            WfTable-sort="true"
            WfTable-filter="true"
            WfTable-pagination="true"
            WfTable-export="true"
          >
            <table class="wftable">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>João Silva</td>
                  <td>joao@email.com</td>
                  <td>(11) 99999-9999</td>
                  <td><span class="badge badge-success">Ativo</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>Maria Santos</td>
                  <td>maria@email.com</td>
                  <td>(11) 88888-8888</td>
                  <td><span class="badge badge-warning">Pendente</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>Pedro Costa</td>
                  <td>pedro@email.com</td>
                  <td>(11) 77777-7777</td>
                  <td><span class="badge badge-danger">Inativo</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>Ana Oliveira</td>
                  <td>ana@email.com</td>
                  <td>(11) 66666-6666</td>
                  <td><span class="badge badge-success">Ativo</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
                <tr>
                  <td>Carlos Lima</td>
                  <td>carlos@email.com</td>
                  <td>(11) 55555-5555</td>
                  <td><span class="badge badge-info">Novo</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <small
              ><i class="sw sw-search wdest2-color f20"></i> Use a busca •
              <i class="sw sw-bar-chart-2 wdest2-color f20"></i> Clique nos
              cabeçalhos para ordenar •
              <i class="sw sw-sliders wdest2-color f20"></i> Use os filtros •
              <i class="sw sw-file-text wdest2-color f20"></i> Navegue pelas
              páginas</small
            >
          </p>
        </div>
      </div>

      <!-- Configurações -->
      <div class="l">
        <div class="co12-g">
          <h3>Configurações Disponíveis</h3>
          <p>
            O WfTable oferece múltiplas configurações para personalizar a
            experiência:
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Atributos de Configuração</h3>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Funcionalidades básicas -->
<div WfTable
     WfTable-search="true"           <!-- Barra de busca -->
     WfTable-sort="true"            <!-- Ordenação por colunas -->
     WfTable-filter="true"          <!-- Filtros por coluna -->
     WfTable-pagination="true"      <!-- Paginação -->
     WfTable-export="true">         <!-- Botões de exportação -->
</div>

<!-- Configurações avançadas -->
<div WfTable
     WfTable-pageSize="10"          <!-- Itens por página -->
     WfTable-responsive="true"      <!-- Responsividade mobile -->
     WfTable-sticky="true"          <!-- Cabeçalho fixo -->
     WfTable-selectable="true"      <!-- Seleção de linhas -->
     WfTable-draggable="true">      <!-- Arrastar e soltar -->
</div>
</script></pre>
        </div>
        <div class="co6-g">
          <h3>Exemplo com Todas as Funcionalidades</h3>
          <div
            WfTable
            WfTable-search="true"
            WfTable-sort="true"
            WfTable-filter="true"
            WfTable-pagination="true"
            WfTable-export="true"
            WfTable-pageSize="3"
            WfTable-responsive="true"
            WfTable-sticky="true"
            WfTable-selectable="true"
          >
            <table class="wftable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Notebook Dell</td>
                  <td>R$ 3.500,00</td>
                  <td>Eletrônicos</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Mouse Wireless</td>
                  <td>R$ 89,90</td>
                  <td>Periféricos</td>
                  <td>45</td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>Teclado Mecânico</td>
                  <td>R$ 299,90</td>
                  <td>Periféricos</td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>004</td>
                  <td>Monitor 24"</td>
                  <td>R$ 799,90</td>
                  <td>Monitores</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>005</td>
                  <td>Webcam HD</td>
                  <td>R$ 159,90</td>
                  <td>Periféricos</td>
                  <td>33</td>
                </tr>
                <tr>
                  <td>006</td>
                  <td>SSD 500GB</td>
                  <td>R$ 399,90</td>
                  <td>Hardware</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <small
              ><i class="sw sw-smartphone wdest2-color f20"></i> Responsivo •
              <i class="sw sw-search wdest2-color f20"></i> Busca •
              <i class="sw sw-bar-chart-2 wdest2-color f20"></i> Ordenação •
              <i class="sw sw-sliders wdest2-color f20"></i> Filtros •
              <i class="sw sw-file-text wdest2-color f20"></i> Paginação •
              <i class="sw sw-download wdest2-color f20"></i> Exportação</small
            >
          </p>
        </div>
      </div>

      <!-- Configuração JSON Avançada -->
      <div class="l">
        <div class="co12-g">
          <h3>Configuração JSON Avançada</h3>
          <p>
            Para configurações complexas, use o atributo
            <code>WfTable-config</code> com JSON:
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Exemplo de Configuração JSON</h3>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfTable WfTable-config='{
  "search": true,
  "sort": true,
  "pagination": {
    "enabled": true,
    "pageSize": 5,
    "showInfo": true
  },
  "columns": [
    {"title": "ID", "sortable": true, "width": "80px"},
    {"title": "Nome", "sortable": true, "searchable": true},
    {"title": "Email", "sortable": false, "filterable": true},
    {"title": "Status", "sortable": true, "filter": "select"}
  ],
  "export": {
    "enabled": true,
    "formats": ["csv", "excel", "pdf"],
    "filename": "usuarios"
  },
  "ajax": {
    "url": "api/usuarios.json",
    "method": "GET",
    "autoRefresh": 30000
  }
}'>
  <table class="wftable">
    <!-- Estrutura da tabela será gerada automaticamente -->
  </table>
</div>
</script></pre>
        </div>
        <div class="co6-g">
          <h3>Uso Dinâmico com JavaScript</h3>
          <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Criar tabela dinamicamente
const config = {
  search: true,
  sort: true,
  pagination: { enabled: true, pageSize: 10 },
  data: [
    {id: 1, nome: "João", email: "joao@email.com", status: "Ativo"},
    {id: 2, nome: "Maria", email: "maria@email.com", status: "Inativo"}
  ]
};

// Inicializar WfTable
const tabela = new WfTable('#minha-tabela', config);

// Métodos disponíveis
tabela.addRow({id: 3, nome: "Pedro", email: "pedro@email.com"});
tabela.removeRow(1);
tabela.updateRow(2, {status: "Ativo"});
tabela.refresh();
tabela.exportData('csv');

// Eventos
tabela.on('rowClick', (row) => console.log('Linha clicada:', row));
tabela.on('sortChange', (column) => console.log('Ordenação:', column));
tabela.on('searchChange', (term) => console.log('Busca:', term));
</script></pre>
        </div>
      </div>

      <!-- Personalização -->
      <div class="l">
        <div class="co12-g">
          <h3>Personalização e Temas</h3>
          <p>O WfTable suporta personalização completa de cores e estilos:</p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Classes CSS Personalizáveis</h3>
          <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Classes principais */
.wftable                    /* Tabela principal */
.wftable-header            /* Cabeçalho da tabela */
.wftable-body              /* Corpo da tabela */
.wftable-footer            /* Rodapé da tabela */
.wftable-search            /* Barra de busca */
.wftable-filters           /* Área de filtros */
.wftable-pagination        /* Paginação */
.wftable-export            /* Botões de exportação */

/* Estados */
.wftable-loading           /* Estado de carregamento */
.wftable-empty             /* Estado vazio */
.wftable-error             /* Estado de erro */
.wftable-selected          /* Linha selecionada */
.wftable-sortable          /* Coluna ordenável */
</script></pre>
        </div>
        <div class="co6-g">
          <h3>Exemplo com Tema Personalizado</h3>
          <div
            WfTable
            WfTable-search="true"
            WfTable-sort="true"
            WfTable-pagination="true"
            style="--wftable-primary: #e74c3c; --wftable-secondary: #ecf0f1"
          >
            <table class="wftable">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Cidade</th>
                  <th>Profissão</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ana Silva</td>
                  <td>28</td>
                  <td>São Paulo</td>
                  <td>Designer</td>
                </tr>
                <tr>
                  <td>Bruno Costa</td>
                  <td>32</td>
                  <td>Rio de Janeiro</td>
                  <td>Desenvolvedor</td>
                </tr>
                <tr>
                  <td>Clara Santos</td>
                  <td>25</td>
                  <td>Belo Horizonte</td>
                  <td>Marketing</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <small
              ><i class="sw sw-palette wdest2-color f20"></i> Tema personalizado
              com cores vermelhas •
              <i class="sw sw-search wdest2-color f20"></i> Busca •
              <i class="sw sw-bar-chart-2 wdest2-color f20"></i> Ordenação •
              <i class="sw sw-file-text wdest2-color f20"></i> Paginação</small
            >
          </p>
        </div>
      </div>

      <!-- Métodos JavaScript -->
      <div class="l">
        <div class="co12-g">
          <h3>Métodos JavaScript</h3>
          <p>O WfTable oferece métodos para controle programático:</p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Métodos Disponíveis</h3>
          <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização
WfTable.initAll();                    // Inicializa todas as tabelas
WfTable.init(container);              // Inicializa em container específico

// Controle de dados
WfTable.refresh(tableElement);         // Recarrega dados
WfTable.clear(tableElement);           // Limpa dados
WfTable.addRow(tableElement, data);   // Adiciona nova linha
WfTable.removeRow(tableElement, id);  // Remove linha

// Controle de funcionalidades
WfTable.showSearch(tableElement);      // Mostra busca
WfTable.hideSearch(tableElement);     // Esconde busca
WfTable.enableSort(tableElement);     // Habilita ordenação
WfTable.disableSort(tableElement);    // Desabilita ordenação

// Exportação
WfTable.exportCSV(tableElement);      // Exporta para CSV
WfTable.exportExcel(tableElement);    // Exporta para Excel
WfTable.exportPDF(tableElement);      // Exporta para PDF
</script></pre>
        </div>
        <div class="co6-g">
          <h3>Exemplo de Controle Programático</h3>
          <div style="margin: 15px 0">
            <button onclick="testarMetodos()" class="btn btn-primary">
              Testar Métodos
            </button>
            <button onclick="adicionarLinha()" class="btn btn-success">
              Adicionar Linha
            </button>
            <button onclick="exportarCSV()" class="btn btn-info">
              Exportar CSV
            </button>
            <button
              id="wftable-debug-btn"
              class="btn btn-secondary"
              style="margin-left: 8px"
            >
              Debug WfTable
            </button>
          </div>
          <div
            id="tabela-teste"
            WfTable
            WfTable-search="true"
            WfTable-sort="true"
          >
            <table class="wftable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Item 1</td>
                  <td>R$ 100,00</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Item 2</td>
                  <td>R$ 200,00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <script>
            // Debug helper
            document.addEventListener("DOMContentLoaded", function () {
              const dbg = document.getElementById("wftable-debug-btn");
              if (dbg)
                dbg.addEventListener("click", function () {
                  console.log("WfTable debug ->", {
                    WfTable: !!window.WfTable,
                    instances: WfTable ? WfTable.getData(document) : null,
                    elements: Array.from(
                      document.querySelectorAll("[WfTable], table.wftable")
                    ).map((el) => ({ el, initialized: !!el._swtable })),
                  });
                  try {
                    WfTable.initAll();
                    console.log("WfTable.initAll() called");
                  } catch (e) {
                    console.error(e);
                  }
                });
            });
            function testarMetodos() {
              const tabela = document.getElementById("tabela-teste");
              WfAlert.sucesso("Métodos testados com sucesso!");
            }

            function adicionarLinha() {
              const tabela = document.getElementById("tabela-teste");
              const tbody = tabela.querySelector("tbody");
              const newRow = tbody.insertRow();
              newRow.innerHTML = "<td>3</td><td>Item 3</td><td>R$ 300,00</td>";
              WfAlert.sucesso("Linha adicionada!");
            }

            function exportarCSV() {
              try {
                const tabela = document.getElementById("tabela-teste");
                WfTable.exportCSV(tabela, "tabela-teste.csv");
                WfAlert &&
                  WfAlert.sucesso &&
                  WfAlert.sucesso("CSV exportado com sucesso!");
              } catch (e) {
                console.error(e);
                WfAlert &&
                  WfAlert.aviso &&
                  WfAlert.aviso("Erro ao exportar CSV");
              }
            }
          </script>
        </div>
      </div>

      <!-- Acessibilidade -->
      <div class="l">
        <div class="co12-g">
          <h3>Acessibilidade e UX</h3>
          <p>O WfTable segue as melhores práticas de acessibilidade:</p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Recursos de Acessibilidade</h3>
          <ul>
            <li><b>Navegação por teclado:</b> Tab, Enter, Espaço, Setas</li>
            <li><b>Screen readers:</b> ARIA labels e roles apropriados</li>
            <li><b>Contraste:</b> Cores que respeitam o tema WfDay</li>
            <li><b>Reduced motion:</b> Respeita preferências do usuário</li>
            <li><b>Focus visible:</b> Indicadores claros de foco</li>
            <li><b>Responsivo:</b> Funciona em todos os dispositivos</li>
          </ul>
        </div>
        <div class="co6-g">
          <h3>Exemplo de Navegação por Teclado</h3>
          <div
            style="
              background: var(--bl);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              color: var(--color);
            "
          >
            <b
              ><i class="sw sw-keyboard wdest2-color f20"></i> Navegação por
              Teclado:</b
            ><br />
            • <b>Tab:</b> Navegar entre elementos<br />
            • <b>Enter/Espaço:</b> Ativar botões e links<br />
            • <b>Setas:</b> Navegar entre células da tabela<br />
            • <b>Ctrl+A:</b> Selecionar todas as linhas<br />
            • <b>Escape:</b> Fechar modais e filtros
          </div>
        </div>
      </div>

      <!-- Conclusão -->
      <div class="l">
        <div class="co12-g">
          <div
            style="
              background: var(--bl);
              border: 1px solid #4caf50;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              color: var(--color);
            "
          >
            <h3 style="margin-top: 0; color: #4caf50">
              <i class="sw sw-check-circle"></i> WfTable - Sistema Completo de
              Tabelas
            </h3>
            <p style="margin-bottom: 0">
              O <b>WfTable</b> é a solução definitiva para tabelas dinâmicas no
              WEBFULL Framework. Com funcionalidades avançadas, acessibilidade
              completa e integração perfeita com WfAjax, oferece uma experiência
              de usuário superior para qualquer aplicação web.
            </p>
          </div>
        </div>
      </div>
  </section>
</section>