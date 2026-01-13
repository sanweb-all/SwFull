<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTableajax</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTableajax</li>
        </ol>
      </nav>
    </div>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WfTableAjax - Documentação | WEBFULL Framework</title>
    <link rel="stylesheet" href="../../assets/css/webfull.css">
    <link rel="stylesheet" href="../assets/docs.css">
</head>
<body>
    <div class="container">
        <header class="docs-header">
            <h1>WfTableAjax</h1>
            <p class="lead">Sistema de tabelas AJAX avançado similar ao DataTables</p>
        </header>

        <nav class="docs-nav">
            <ul>
                <li><a href="#overview">Visão Geral</a></li>
                <li><a href="#basic-usage">Uso Básico</a></li>
                <li><a href="#configuration">Configuração</a></li>
                <li><a href="#api">API JavaScript</a></li>
                <li><a href="#server-side">Lado Servidor</a></li>
                <li><a href="#examples">Exemplos</a></li>
            </ul>
        </nav>

        <main class="docs-content">
            <section id="overview">
                <h2>Visão Geral</h2>
                <p>O <strong>WfTableAjax</strong> é o sistema oficial de tabelas AJAX do WEBFULL Framework, oferecendo funcionalidades avançadas similares ao DataTables, incluindo:</p>
                
                <ul>
                    <li><strong>Carregamento exclusivo via AJAX</strong> - Todos os dados são carregados dinamicamente</li>
                    <li><strong>Paginação server-side</strong> - Processamento no servidor para grandes volumes de dados</li>
                    <li><strong>Busca em tempo real</strong> - Filtros aplicados no servidor</li>
                    <li><strong>Ordenação dinâmica</strong> - Classificação por qualquer coluna</li>
                    <li><strong>Design responsivo</strong> - Adaptação automática para dispositivos móveis</li>
                    <li><strong>Interface moderna</strong> - Visual consistente com o WfTable</li>
                    <li><strong>API completa</strong> - Controle programático total</li>
                </ul>

                <div class="alert alert-info">
                    <strong>Diferença do WfTable:</strong> Enquanto o WfTable trabalha com dados estáticos e dinâmicos, o WfTableAjax é exclusivamente AJAX, otimizado para grandes volumes de dados com processamento server-side.
                </div>
            </section>

            <section id="basic-usage">
                <h2>Uso Básico</h2>
                
                <h3>HTML Básico</h3>
                <pre><code>&lt;table WfTableAjax WfTableAjax-url="/api/users"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th data-field="id"&gt;ID&lt;/th&gt;
            &lt;th data-field="name"&gt;Nome&lt;/th&gt;
            &lt;th data-field="email"&gt;Email&lt;/th&gt;
            &lt;th data-field="created_at"&gt;Criado em&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
&lt;/table&gt;</code></pre>

                <h3>Exemplo Funcional</h3>
                <table WfTableAjax WfTableAjax-url="users-data.json" WfTableAjax-pageLength="5" WfTableAjax-serverSide="false">
                    <thead>
                        <tr>
                            <th data-field="id">ID</th>
                            <th data-field="name">Nome</th>
                            <th data-field="email">Email</th>
                            <th data-field="role">Função</th>
                            <th data-field="status" data-render="(data) => data === 'active' ? '<span style=&quot;color: #00d12b; font-weight: bold;&quot;>Ativo</span>' : '<span style=&quot;color: #ff2222; font-weight: bold;&quot;>Inativo</span>'">Status</th>
                        </tr>
                    </thead>
                </table>
            </section>

            <section id="configuration">
                <h2>Configuração</h2>

                <h3>Atributos HTML</h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Atributo</th>
                            <th>Tipo</th>
                            <th>Padrão</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>WfTableAjax-url</code></td>
                            <td>String</td>
                            <td>-</td>
                            <td>URL para carregar os dados via AJAX</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-pageLength</code></td>
                            <td>Number</td>
                            <td>10</td>
                            <td>Número de registros por página</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-searching</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Habilitar campo de busca</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-ordering</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Habilitar ordenação por colunas</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-paging</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Habilitar paginação</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-info</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Mostrar informações de registros</td>
                        </tr>
                        <tr>
                            <td><code>WfTableAjax-responsive</code></td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Habilitar design responsivo</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Configuração de Colunas</h3>
                <p>Configure as colunas usando atributos <code>data-*</code> nos elementos <code>&lt;th&gt;</code>:</p>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Atributo</th>
                            <th>Descrição</th>
                            <th>Exemplo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>data-field</code></td>
                            <td>Campo dos dados a ser exibido</td>
                            <td><code>data-field="user.name"</code></td>
                        </tr>
                        <tr>
                            <td><code>data-orderable</code></td>
                            <td>Se a coluna pode ser ordenada</td>
                            <td><code>data-orderable="false"</code></td>
                        </tr>
                        <tr>
                            <td><code>data-searchable</code></td>
                            <td>Se a coluna é pesquisável</td>
                            <td><code>data-searchable="false"</code></td>
                        </tr>
                        <tr>
                            <td><code>data-width</code></td>
                            <td>Largura da coluna</td>
                            <td><code>data-width="100px"</code></td>
                        </tr>
                        <tr>
                            <td><code>data-class</code></td>
                            <td>Classe CSS para a coluna</td>
                            <td><code>data-class="text-center"</code></td>
                        </tr>
                        <tr>
                            <td><code>data-render</code></td>
                            <td>Função de renderização personalizada</td>
                            <td><code>data-render="(data) => formatDate(data)"</code></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Configuração JSON</h3>
                <pre><code>&lt;table WfTableAjax='{
    "ajax": {
        "url": "/api/users",
        "type": "POST",
        "data": {"department": "IT"}
    },
    "pageLength": 25,
    "lengthMenu": [10, 25, 50, 100],
    "language": {
        "search": "Filtrar:",
        "processing": "Carregando dados..."
    }
}'&gt;</code></pre>
            </section>

            <section id="api">
                <h2>API JavaScript</h2>

                <h3>Inicialização</h3>
                <pre><code>// Inicialização automática
WfTableAjax.initAll();

// Inicialização manual
const table = new WfTableAjax(document.querySelector('#myTable'));</code></pre>

                <h3>Métodos Principais</h3>
                
                <h4>ajax.reload()</h4>
                <pre><code>// Recarregar dados
table.ajax.reload();

// Recarregar mantendo página atual
table.ajax.reload(null, false);</code></pre>

                <h4>search()</h4>
                <pre><code>// Definir termo de busca
table.search('João');

// Obter termo atual
const currentSearch = table.search();</code></pre>

                <h4>page()</h4>
                <pre><code>// Ir para página específica
table.page(3);

// Obter página atual
const currentPage = table.page();</code></pre>

                <h4>order()</h4>
                <pre><code>// Ordenar por coluna
table.order(1, 'desc'); // Coluna 1, descendente

// Obter ordenação atual
const currentOrder = table.order();</code></pre>

                <h3>Eventos e Callbacks</h3>
                <pre><code>// Configurar callback após carregamento
const table = new WfTableAjax(element, {
    ajax: {
        url: '/api/data',
        data: function(d) {
            // Adicionar parâmetros customizados
            d.customParam = 'value';
            return d;
        }
    }
});</code></pre>
            </section>

            <section id="server-side">
                <h2>Implementação Server-Side</h2>

                <h3>Formato de Requisição</h3>
                <p>O WfTableAjax envia requisições no formato DataTables:</p>
                <pre><code>{
    "draw": 1,
    "start": 0,
    "length": 10,
    "search": {
        "value": "termo de busca",
        "regex": false
    },
    "order": [
        {
            "column": 0,
            "dir": "asc"
        }
    ],
    "columns": [
        {
            "data": "name",
            "name": "name",
            "searchable": true,
            "orderable": true
        }
    ]
}</code></pre>

                <h3>Formato de Resposta</h3>
                <pre><code>{
    "draw": 1,
    "recordsTotal": 1000,
    "recordsFiltered": 50,
    "data": [
        {
            "id": 1,
            "name": "João Silva",
            "email": "joao@email.com",
            "status": "active"
        }
    ]
}</code></pre>

                <h3>Exemplo PHP</h3>
                <pre><code>&lt;?php
$request = json_decode(file_get_contents('php://input'), true);

$start = $request['start'];
$length = $request['length'];
$search = $request['search']['value'];
$orderColumn = $request['order'][0]['column'] ?? 0;
$orderDir = $request['order'][0]['dir'] ?? 'asc';

// Sua lógica de consulta ao banco de dados aqui
$data = getUsersFromDatabase($start, $length, $search, $orderColumn, $orderDir);

echo json_encode([
    'draw' => $request['draw'],
    'recordsTotal' => getTotalUsers(),
    'recordsFiltered' => getFilteredUsersCount($search),
    'data' => $data
]);
?&gt;</code></pre>
            </section>

            <section id="examples">
                <h2>Exemplos Avançados</h2>

                <h3>Tabela com Renderização Personalizada</h3>
                <table WfTableAjax WfTableAjax-url="users-data.json" WfTableAjax-pageLength="8" WfTableAjax-serverSide="false">
                    <thead>
                        <tr>
                            <th data-field="id" data-width="60px">ID</th>
                            <th data-field="name">Nome</th>
                            <th data-field="email">Email</th>
                            <th data-field="role">Função</th>
                            <th data-field="last_login" data-render="(data) => { const d = new Date(data); return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}); }">Último Login</th>
                            <th data-field="status" data-render="(data) => data === 'active' ? '<span style=&quot;color: #00d12b; font-weight: bold;&quot;>✓ Ativo</span>' : '<span style=&quot;color: #ff2222; font-weight: bold;&quot;>✗ Inativo</span>'">Status</th>
                        </tr>
                    </thead>
                </table>

                <h3>Configuração Completa</h3>
                <pre><code>&lt;table WfTableAjax='{
    "ajax": {
        "url": "/api/advanced-data",
        "type": "POST",
        "data": {
            "extra_search": "active_only"
        }
    },
    "pageLength": 15,
    "lengthMenu": [5, 10, 15, 25, 50],
    "searching": true,
    "ordering": true,
    "paging": true,
    "info": true,
    "responsive": true,
    "language": {
        "processing": "Processando...",
        "search": "Buscar:",
        "lengthMenu": "Mostrar _MENU_ registros",
        "info": "Exibindo _START_ a _END_ de _TOTAL_ registros",
        "paginate": {
            "first": "Primeiro",
            "previous": "Anterior", 
            "next": "Próximo",
            "last": "Último"
        }
    }
}'&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th data-field="id" data-width="60px"&gt;ID&lt;/th&gt;
            &lt;th data-field="name"&gt;Nome&lt;/th&gt;
            &lt;th data-field="email"&gt;Email&lt;/th&gt;
            &lt;th data-field="department"&gt;Departamento&lt;/th&gt;
            &lt;th data-field="created_at" data-render="formatDate"&gt;Criado&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
&lt;/table&gt;</code></pre>

                <h3>Controle Programático</h3>
                <pre><code>// Obter instância da tabela
const table = document.querySelector('#myTable')._swtableajax;

// Recarregar com novos parâmetros
table.config.ajax.data = { status: 'active' };
table.ajax.reload();

// Buscar programaticamente
table.search('termo de busca');

// Navegar para página específica
table.page(2);

// Ordenar por coluna
table.order(1, 'desc');</code></pre>
            </section>
        </main>

        <footer class="docs-footer">
            <p>&copy; 2025 WEBFULL Framework - WfTableAjax v4.0</p>
        </footer>
    </div>

    <script src="../../assets/components/webfull.js"></script>
    <script>
        // Funções auxiliares para os exemplos
        function formatDate(data) {
            if (!data) return '';
            const date = new Date(data);
            return date.toLocaleDateString('pt-BR');
        }

        function editProduct(id) {
            alert('Editar produto ID: ' + id);
        }

        // Simular dados para demonstração
        if (window.location.pathname.includes('wftableajax.html')) {
            // Mock server para demonstração
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                if (url.includes('/api/demo-users') || url.includes('/api/products')) {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            const mockData = url.includes('products') ? 
                                generateMockProducts() : generateMockUsers();
                            resolve({
                                ok: true,
                                json: () => Promise.resolve(mockData)
                            });
                        }, 500);
                    });
                }
                return originalFetch.apply(this, arguments);
            };
        }

        function generateMockUsers() {
            const users = [];
            for (let i = 1; i <= 50; i++) {
                users.push({
                    id: i,
                    name: `Usuário ${i}`,
                    email: `user${i}@email.com`,
                    status: i % 3 === 0 ? 'inactive' : 'active'
                });
            }
            return {
                draw: 1,
                recordsTotal: 50,
                recordsFiltered: 50,
                data: users.slice(0, 5)
            };
        }

        function generateMockProducts() {
            const products = [];
            const categories = ['Eletrônicos', 'Roupas', 'Casa', 'Livros'];
            for (let i = 1; i <= 30; i++) {
                products.push({
                    id: i,
                    name: `Produto ${i}`,
                    price: (Math.random() * 1000).toFixed(2),
                    category: categories[i % categories.length]
                });
            }
            return {
                draw: 1,
                recordsTotal: 30,
                recordsFiltered: 30,
                data: products.slice(0, 5)
            };
        }
    </script>
</body>
</html>