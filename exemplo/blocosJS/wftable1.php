<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTable1</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTable1</li>
        </ol>
      </nav>
    </div>
<script>
  // Função de renderização para os exemplos - deve estar disponível antes da inicialização
  function renderRole(data) {
    const key = String(data || "").toLowerCase();
    const roles = {
      admin: '<span class="badge badge-danger">Administrador</span>',
      editor: '<span class="badge badge-primary">Editor</span>',
      viewer: '<span class="badge badge-info">Viewer</span>',
      user: '<span class="badge badge-primary">Usuário</span>',
      moderator: '<span class="badge badge-warning">Moderador</span>',
    };
    return roles[key] || data;
  }
</script>

<section class="wftableajax">
    <div class="g-xg">
      <!-- Cabeçalho do Componente -->
      <div class="l">
        <div class="co12-g">

          <h2 class="wfpage">
            WfTableAjax
            <small>[Tabelas AJAX Avançadas - Similar ao DataTables]</small>
          </h2>
          <span class="wfbag">NOVO / AVANÇADO</span>
          <p>
            O <strong>WfTableAjax</strong> é o sistema avançado de tabelas AJAX
            do WEBFULL Framework, oferecendo funcionalidades similares ao
            DataTables. Ele cria tabelas de dados ricas e interativas
            <strong>exclusivamente via AJAX</strong>, otimizado para grandes
            volumes de dados com processamento server-side.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #007bff;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            "
          >
            <strong
              ><i class="wf wf-link Taler f20"></i> AJAX EXCLUSIVO:</strong
            >
            Carregamento dinâmico de todos os dados.<br />
            <strong><i class="wf wf-server Taler f20"></i> SERVER-SIDE:</strong>
            Processamento otimizado no servidor para grandes volumes.<br />
            <strong
              ><i class="wf wf-search Taler f20"></i> BUSCA EM TEMPO
              REAL:</strong
            >
            Filtros aplicados instantaneamente.<br />
            <strong><i class="wf wf-mobile Taler f20"></i> RESPONSIVO:</strong>
            Design adaptativo para dispositivos móveis.<br />
            <strong><i class="wf wf-code Taler f20"></i> API COMPLETA:</strong>
            Controle programático total via JavaScript.
          </div>
        </div>
      </div>

      <!-- Uso Básico -->
      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Uso Básico</h3>
          <p>
            Para criar uma tabela, adicione o atributo
            <code>WfTableAjax</code> a uma tag <code>&lt;table&gt;</code> e
            configure a URL e as colunas.
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<table WfTableAjax WfTableAjax-url="/api/users">
   <thead>
      <tr>
         <th data-field="id">ID</th>
         <th data-field="name">Nome</th>
         <th data-field="email">E-mail</th>
         <th data-field="status">Status</th>
      </tr>
   </thead>
</table>
</script>
</pre>
          <p><strong>Atributos principais:</strong></p>
          <p>
            • <strong>WfTableAjax:</strong> Ativa o componente.<br />
            • <strong>WfTableAjax-url:</strong> URL da API que retorna dados no
            formato DataTables.<br />
            • <strong>data-field:</strong> Campo dos dados a ser exibido em cada
            coluna.
          </p>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">Exemplo Funcional</h3>
          <table
            WfTableAjax='{"ajax":{"type":"GET"}}'
            class="wftableajax"
            WfTableAjax-url="exemplo/blocosJS/users-data.json"
            WfTableAjax-pageLength="5"
            WfTableAjax-searching="true"
            WfTableAjax-ordering="true"
            width="100%"
          >
            <thead>
              <tr>
                <th data-field="id" data-width="60px">ID</th>
                <th data-field="name">Nome</th>
                <th data-field="email">E-mail</th>
                <th data-field="role">Função</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <!-- Configurações -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Configurações Disponíveis</h3>
          <table class="table table-striped" width="100%">
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
        </div>
      </div>

      <!-- Configuração de Colunas -->
      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Configuração de Colunas</h3>
          <p>
            Configure as colunas usando atributos <code>data-*</code> nos
            elementos <code>&lt;th&gt;</code>:
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<th data-field="name" 
    data-orderable="true" 
    data-searchable="true"
    data-width="200px"
    data-class="text-center"
    data-render="formatName">Nome</th>
</script>
</pre>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">Configuração JSON</h3>
          <p>Para configurações avançadas, use JSON:</p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<table WfTableAjax='{
   "ajax": {
      "url": "/api/users",
      "type": "POST",
      "data": {"department": "IT"}
   },
   "pageLength": 25,
   "lengthMenu": [10, 25, 50, 100],
   "language": {
      "search": "Filtrar:",
      "processing": "Carregando..."
   }
}'>
</script>
</pre>
        </div>
      </div>

      <!-- Exemplos Avançados -->
      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Exemplo com Renderização</h3>
          <table
            WfTableAjax='{"ajax":{"type":"GET"}}'
            class="wftableajax"
            WfTableAjax-url="exemplo/blocosJS/users-data.json"
            WfTableAjax-pageLength="4"
            width="100%"
          >
            <thead>
              <tr>
                <th data-field="id" data-width="60px">ID</th>
                <th data-field="name">Nome</th>
                <th data-field="email">E-mail</th>
                <th data-field="role" data-render="renderRole">Função</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">API JavaScript</h3>
          <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obter instância da tabela
const table = document.querySelector('#myTable')._swtableajax;

// Recarregar dados
table.ajax.reload();

// Buscar
table.search('termo');

// Navegar páginas
table.page(2);

// Ordenar
table.order(1, 'desc');
</script>
</pre>
        </div>
      </div>

      <!-- Server-Side -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Implementação Server-Side</h3>
          <p>
            O WfTableAjax é compatível com o formato DataTables. Para grandes
            volumes de dados, implemente o processamento no servidor.
          </p>

          <h4>Formato de Requisição:</h4>
          <pre WfCode WfCode-lang="json"><script type="text/plain">
{
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
}
</script>
</pre>

          <h4>Formato de Resposta:</h4>
          <pre WfCode WfCode-lang="json"><script type="text/plain">
{
   "draw": 1,
   "recordsTotal": 1000,
   "recordsFiltered": 50,
   "data": [
      {
         "id": 1,
         "name": "João Silva",
         "email": "joao@email.com",
         "role": "admin"
      }
   ]
}
</script>
</pre>
        </div>
      </div>

      <!-- Migração -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Migração do WfTable1</h3>
          <div
            style="
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            "
          >
            <strong><i class="wf wf-info-circle"></i> IMPORTANTE:</strong> O
            WfTable1 foi renomeado para WfTableAjax. Para migrar, substitua
            todos os atributos <code>WfTable1-*</code> por
            <code>WfTableAjax-*</code>.
          </div>

          <h4>Antes (WfTable1):</h4>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<table WfTable1 
   WfTable1-url="/api/data"
   WfTable1-page-size="10"
   WfTable1-columns='[...]'>
</table>
</script>
</pre>

          <h4>Depois (WfTableAjax):</h4>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<table WfTableAjax 
   WfTableAjax-url="/api/data"
   WfTableAjax-pageLength="10">
   <thead>
      <tr>
         <th data-field="id">ID</th>
         <th data-field="name">Nome</th>
      </tr>
   </thead>
</table>
</script>
</pre>
        </div>
      </div>
  </section>
</section>