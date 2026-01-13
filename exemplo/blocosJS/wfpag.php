<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfPag</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfPag</li>
        </ol>
      </nav>
    </div>
<section class="swpagx">
    <div class="g-xg">
      <!-- Cabeçalho do Componente -->
      <div class="l">
        <div class="co12-g">
          <h3>[Paginação Client-Side]</h3>
          <p>
            O <b>WfPag</b> é um componente de paginação do lado do
            cliente (client-side) que divide uma lista de elementos HTML
            existentes em páginas. Ele cria automaticamente os controles de
            navegação e é ideal para listas de produtos, artigos, galerias ou
            qualquer conteúdo que já esteja presente no DOM.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #8bc34a;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            "
          >
            <b><i class="wf wf-copy Taler f20"></i> CLIENT-SIDE:</b>
            Pagina conteúdo já existente na página, sem recarregar.<br />
            <b><i class="wf wf-data Taler f20"></i> AUTOMÁTICO:</b>
            Cria os controles de navegação (números, próximo, etc.) sozinho.<br />
            <b
              ><i class="wf wf-universal-access Taler f20"></i>
              ACESSÍVEL:</b
            >
            Suporte a navegação por teclado e atributos ARIA.
          </div>
        </div>
      </div>

      <!-- Uso Básico -->
      <div class="l">
        <div class="co6-g">
          <h3>Uso Básico</h3>
          <p>
            Adicione o atributo <code>WfPag</code> ao container e use
            <code>WfPag-items-per-page</code> para definir quantos itens mostrar
            por página. O componente paginará todos os filhos diretos do
            container.
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Paginação com 3 itens por página -->
<div WfPag WfPag-items-per-page="3">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
  <div class="item">Item 6</div>
  ...
</div>
</script>
</pre>
          <div
            style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            "
          >
            <b><i class="wf wf-pin Taler f20"></i> Como Funciona:</b
            ><br />
            • <b>Container:</b> O elemento com o atributo
            <code>[WfPag]</code>.<br />
            • <b>Itens:</b> Os filhos diretos do container serão os
            itens a serem paginados.<br />
            • <b>Controles:</b> A barra de paginação é criada e
            inserida automaticamente após o container.
          </div>
        </div>
        <div class="co6-g">
          <h3>Exemplo Funcionando</h3>
          <p>
            A lista abaixo contém 12 itens, mas apenas 4 são exibidos por vez.
          </p>
          <div
            style="
              border: 1px solid var(--wf-border);
              border-radius: 8px;
              padding: 20px;
              margin-top: 20px;
              background: var(--wf-bl);
            "
          >
            <div WfPag WfPag-items-per-page="4">
              <div class="pag-item">
                <i class="wf wf-smartphone Tprin"></i> Item 1
              </div>
              <div class="pag-item">
                <i class="wf wf-laptop Tprin"></i> Item 2
              </div>
              <div class="pag-item">
                <i class="wf wf-desktop Tprin"></i> Item 3
              </div>
              <div class="pag-item">
                <i class="wf wf-watch Tprin"></i> Item 4
              </div>
              <div class="pag-item">
                <i class="wf wf-headphone Tprin"></i> Item 5
              </div>
              <div class="pag-item">
                <i class="wf wf-camera Tprin"></i> Item 6
              </div>
              <div class="pag-item">
                <i class="wf wf-mouse Tprin"></i> Item 7
              </div>
              <div class="pag-item">
                <i class="wf wf-keyboard Tprin"></i> Item 8
              </div>
              <div class="pag-item">
                <i class="wf wf-printer Tprin"></i> Item 9
              </div>
              <div class="pag-item">
                <i class="wf wf-hdd Tprin"></i> Item 10
              </div>
              <div class="pag-item">
                <i class="wf wf-usb Tprin"></i> Item 11
              </div>
              <div class="pag-item">
                <i class="wf wf-lightbulb Tprin"></i> Item 12
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Atributos de Configuração -->
      <div class="l">
        <div class="co12-g">
          <h3>Atributos de Configuração</h3>
          <p>
            Personalize o comportamento da paginação com estes atributos no
            elemento <code>[WfPag]</code>.
          </p>
          <table class="tabela">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Descrição</th>
                <th>Padrão</th>
                <th>Exemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>WfPag-items-per-page</code></td>
                <td>Número de itens a serem exibidos por página.</td>
                <td><code>10</code></td>
                <td><code>"5"</code></td>
              </tr>
              <tr>
                <td><code>WfPag-max-visible</code></td>
                <td>
                  Número máximo de botões de página numéricos a serem exibidos.
                </td>
                <td><code>5</code></td>
                <td><code>"7"</code></td>
              </tr>
              <tr>
                <td><code>WfPag-show-first-last</code></td>
                <td>
                  Define se os botões "Primeira" e "Última" devem ser exibidos
                  (<code>true</code>/<code>false</code>).
                </td>
                <td><code>true</code></td>
                <td><code>"false"</code></td>
              </tr>
              <tr>
                <td><code>WfPag-show-prev-next</code></td>
                <td>
                  Define se os botões "Anterior" e "Próxima" devem ser exibidos
                  (<code>true</code>/<code>false</code>).
                </td>
                <td><code>true</code></td>
                <td><code>"false"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- API JavaScript -->
      <div class="l">
        <div class="co12-g">
          <h3>API JavaScript e Eventos</h3>
          <p>
            Você pode controlar a paginação programaticamente e ouvir eventos de
            mudança de página.
          </p>
          <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obter instância da paginação
const pagElement = document.querySelector('[WfPag]');
const pagInstance = pagElement._swPag; // A instância é armazenada no elemento

// Métodos disponíveis
pagInstance.goToPage(3); // Ir para a página 3

// Se você adicionar ou remover itens dinamicamente,
// chame refresh() para recalcular a paginação.
pagInstance.refresh();

// Ouvindo o evento de mudança de página
pagElement.addEventListener('swpag:page-changed', (event) => {
  console.log('Página mudou para:', event.detail.currentPage);
  console.log('Total de páginas:', event.detail.totalPages);
});
</script>
</pre>
          <div
            style="
              background: var(--wf-bg-);
              padding: 10px;
              border-radius: 4px;
              margin: 10px 0;
            "
          >
            <small
              ><b
                ><i class="wf wf-lightbulb-on Taler f20"></i> Dica:</b
              >
              Use o método <code>refresh()</code> sempre que adicionar ou
              remover itens do container dinamicamente com JavaScript.</small
            >
          </div>
        </div>
      </div>

      <!-- Resumo -->
      <div class="l">
        <div class="co12-g">
          <h3>Resumo dos Recursos</h3>
          <div
            style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid var(--prin);
            "
          >
            <ul>
              <li>
                <i class="wf wf-check Taler f20"></i> Paginação client-side de
                elementos HTML existentes.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Ativação simples via
                atributo <code>[WfPag]</code>.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Geração automática de
                controles de navegação.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Navegação inteligente que
                exibe reticências (...) para muitas páginas.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Totalmente acessível com
                suporte a teclado e ARIA.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Design responsivo que se
                adapta a telas menores.
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> API JavaScript para
                controle programático (<code>goToPage</code>,
                <code>refresh</code>).
              </li>
              <li>
                <i class="wf wf-check Taler f20"></i> Dispara um evento
                customizado (<code>wfpag:page-changed</code>) ao mudar de
                página.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <style>
    .pag-item {
      padding: 15px;
      margin: 8px 0;
      background: var(--wf-bl-);
      color: var(--wf-color);
      border-radius: 6px;
      font-weight: 600;
      border: 1px solid var(--wf-border);
    }
    .pag-item i {
      margin-right: 10px;
    }
  </style>
</section>