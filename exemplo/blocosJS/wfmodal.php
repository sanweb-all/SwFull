<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfModal</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfModal</li>
        </ol>
      </nav>
    </div>
    <section class="wfmodalx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Sistema de Modais/Popups/Dialogs]</h3>
            <p>
              O <b>WfModal</b> é o sistema oficial de modais do WEBFULL
              Framework. Oferece múltiplos efeitos de animação, tamanhos
              configuráveis, acessibilidade completa e controle total via HTML e
              JavaScript.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            ">
              <b><i class="wf wf-fast-forward-circle Taler f20"></i>
                IMPORTANTE:</b>
              Este é o sistema de modais OFICIAL do WEBFULL!<br />
              <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use modais
              de terceiros desnecessários<br />
              <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use
              WfModal para consistência e performance
            </div>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            ">
              <b><i class="wf wf-airplay Taler f20"></i> RESPONSIVO:</b>
              Adaptação perfeita para todos os dispositivos<br />
              <b><i class="wf wf-universal-access Taler f20"></i>
                ACESSÍVEL:</b>
              Suporte completo a teclado (ESC, Tab) e ARIA<br />
              <b><i class="wf wf-zap Taler f20"></i> DINÂMICO:</b>
              Criação programática com uma linha de JavaScript<br />
              <b><i class="wf wf-layers Taler f20"></i> MÚLTIPLOS:</b>
              Suporte a modais empilhados e aninhados<br />
              <b><i class="wf wf-settings Taler f20"></i> CONFIGURÁVEL:</b>
              Tamanhos, efeitos e comportamentos personalizáveis
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>Existem duas formas de usar o WfModal:</p>
            <ol>
              <li>Um <b>botão gatilho</b> que aponta para um modal.</li>
              <li>
                O <b>modal</b> em si, que é um container com o conteúdo.
              </li>
            </ol>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- 1. O Botão Gatilho -->
<button WfModal-id="#meuModal">Abrir Modal</button>

<!-- 2. O Container do Modal (pode ficar em qualquer lugar do body) -->
<div WfModal id="meuModal">
  <div class="wfmodal-topo">
    <h3 class="wfmodal-title">Título do Modal</h3>
  </div>
  <div style="padding: 20px">
    <p>Este é o conteúdo do meu modal.</p>
    <p>Ele pode conter qualquer elemento HTML.</p>
  </div>
</div>
</script>
</pre>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>Clique no botão para ver o modal básico em ação.</p>
            <button class="btn btn-prin" WfModal-id="#modalBasico">
              Abrir Modal Básico
            </button>

            <div WfModal id="modalBasico" WfModal-size="p" role="dialog">
              <div class="wfmodal-topo Bprin">
                <h3 class="wfmodal-title" id="modalBasico_title">Modal Básico</h3>
              </div>
              <div style="padding: 20px">
                <p>Este é um exemplo de um modal funcional.</p>
                <p>
                  Você pode fechá-lo clicando no 'X', no botão abaixo, no fundo
                  escuro ou pressionando a tecla ESC.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Atributos de Configuração -->
        <div class="l">
          <div class="co12-g">
            <h3>Atributos de Configuração</h3>
            <p>
              Personalize o comportamento e a aparência do modal com estes
              atributos no elemento <code>[WfModal]</code>.
            </p>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valores (Exemplo)</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>WfModal-effect</code></td>
                  <td>
                    <code>fade</code>, <code>slide</code>, <code>zoom</code>,
                    <code>bounce</code>, <code>flip</code>, <code>rotate</code>
                  </td>
                  <td>
                    Define a animação de entrada do modal. O padrão é
                    <code>fade</code>.
                  </td>
                </tr>
                <tr>
                  <td><code>WfModal-size</code></td>
                  <td>
                    <code>pp</code>, <code>p</code>, <code>m</code>,
                    <code>g</code>, <code>gg</code>, <code>full</code>
                  </td>
                  <td>Define a largura do modal. O padrão é <code>m</code>.</td>
                </tr>
                <tr>
                  <td><code>WfModal-bgcolor</code></td>
                  <td><code>rgba(0,0,0,0.8)</code></td>
                  <td>Cor de fundo do overlay.</td>
                </tr>
                <tr>
                  <td><code>WfModal-content-bgcolor</code></td>
                  <td><code>#f0f0f0</code></td>
                  <td>Cor de fundo do conteúdo do modal.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Demonstração de Efeitos e Tamanhos -->
        <div class="l">
          <div class="co6-g">
            <h3>Demonstração de Efeitos</h3>
            <p>Teste as diferentes animações de entrada.</p>
            <div class="btn-group">
              <button
                class="btn btn-suce"
                onclick="WfModal.show({ title: 'Efeito Fade', content: 'Animação padrão.', effect: 'fade' })">
                Fade
              </button>
              <button
                class="btn btn-prin"
                onclick="WfModal.show({ title: 'Efeito Slide', content: 'Animação de deslizamento.', effect: 'slide' })">
                Slide
              </button>
              <button
                class="btn btn-secu"
                onclick="WfModal.show({ title: 'Efeito Zoom', content: 'Animação de zoom.', effect: 'zoom' })">
                Zoom
              </button>
              <button
                class="btn btn-aler"
                onclick="WfModal.show({ title: 'Efeito Bounce', content: 'Animação com &quot;pulo&quot;.', effect: 'bounce' })">
                Bounce
              </button>
              <button
                class="btn btn-peri"
                onclick="WfModal.show({ title: 'Efeito Flip', content: 'Animação de virada 3D.', effect: 'flip' })">
                Flip
              </button>
              <button
                class="btn btn-clar"
                onclick="WfModal.show({ title: 'Efeito Rotate', content: 'Animação de rotação.', effect: 'rotate' })">
                Rotate
              </button>
            </div>
          </div>
          <div class="co6-g">
            <h3>Demonstração de Tamanhos</h3>
            <p>Teste os diferentes tamanhos predefinidos.</p>
            <div class="btn-group">
              <button
                class="btn btn-prin"
                onclick="WfModal.show({ title: 'Tamanho PP', content: 'Ideal para pequenos alertas.', size: 'pp' })">
                PP (Pequeno)
              </button>
              <button
                class="btn btn-secu"
                onclick="WfModal.show({ title: 'Tamanho M', content: 'Tamanho padrão.', size: 'm' })">
                M (Médio)
              </button>
              <button
                class="btn btn-aler"
                onclick="WfModal.show({ title: 'Tamanho G', content: 'Para conteúdos maiores.', size: 'g' })">
                G (Grande)
              </button>
              <button
                class="btn btn-peri"
                onclick="WfModal.show({ title: 'Tamanho Full', content: 'Ocupa quase a tela toda.', size: 'full' })">
                Full (Tela Cheia)
              </button>
            </div>
          </div>
        </div>

        <!-- API JavaScript -->
        <div class="l">
          <div class="co12-g">
            <h3>API JavaScript</h3>
            <p>
              Controle total dos modais via JavaScript. Ideal para criar
              interações dinâmicas.
            </p>
          </div>
          <div class="co6-g">
            <h3>Abrir e Fechar</h3>
            <p>Abra ou feche qualquer modal existente usando seu seletor.</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Abrir um modal pelo seu ID
WfModal.open('#meuModal');

// Fechar um modal pelo seu ID
WfModal.close('#meuModal');

// Fechar todos os modais abertos
WfModal.closeAll();
</script>
</pre>
            <button class="btn btn-secu" onclick="WfModal.open('#modalBasico')">
              Abrir Modal Básico (via JS)
            </button>
          </div>
          <div class="co6-g">
            <h3>
              Modais Dinâmicos com <code>WfModal.show()</code>
            </h3>
            <p>
              Crie alertas e confirmações rapidamente, sem precisar escrever HTML.
            </p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Alerta simples (apenas mensagem)
WfModal.show('Operação realizada com sucesso!');

// Modal com título e conteúdo
WfModal.show({
  title: 'Confirmação',
  content: 'Deseja realmente excluir este item?',
  btn: 'Confirmar'
});

// Modal completo com tamanho e efeito
WfModal.show({
  title: 'Bem-vindo!',
  content: 'Aproveite nosso novo painel.',
  btn: 'Começar',
  size: 'g',
  effect: 'bounce'
});
</script>
</pre>
            <button
              class="btn btn-peri"
              onclick="WfModal.show({ title: 'Modal Dinâmico', content: 'Este modal foi criado 100% via JavaScript!', btn: 'Incrível!' })">
              Testar <code>WfModal.show()</code>
            </button>
          </div>
        </div>

        <!-- Conteúdo AJAX -->
        <div class="l">
          <div class="co12-g">
            <h3>Carregando Conteúdo com AJAX</h3>
            <p>
              A combinação do <b>WfModal</b> com o
              <b>WfAjax</b> é extremamente poderosa. Você pode carregar
              o conteúdo de um modal dinamicamente a partir de um arquivo ou rota
              do backend.
            </p>
          </div>
          <div class="co6-g">
            <p>
              Basta criar um botão com os atributos <code>WfAjax</code> e fazer
              com que o destino (<code>WfAjax-dest</code>) seja o seletor do
              conteúdo do seu modal. O WfModal é inteligente o suficiente para
              esperar o AJAX terminar antes de exibir o conteúdo.
            </p>
            <button
              class="btn btn-info"
              WfModal-id="#modalAjax"
              WfAjax
              WfAjax-url="/docs/parts/ajax-content.html"
              WfAjax-dest="#modalAjax .wfmodal-content-ajax"
              WfAjax-loading="true">
              Carregar Conteúdo via AJAX
            </button>

            <!-- Modal para receber o conteúdo AJAX -->
            <div
              WfModal
              id="modalAjax"
              WfModal-size="g"
              role="dialog"
              aria-modal="true"
              tabindex="-1">
              <div class="wfmodal-topo" style="background: var(--info)">
                <h3 class="wfmodal-title" id="modalAjax_title">
                  Conteúdo Carregado via AJAX
                </h3>
              </div>
              <!-- O conteúdo será injetado aqui -->
              <div
                class="wfmodal-content-ajax"
                style="padding: 20px; min-height: 200px">
                <!-- O WfAjax colocará um loader aqui automaticamente -->
              </div>
            </div>
          </div>
          <div class="co6-g">
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- O botão que dispara o AJAX e abre o modal -->
<button class="btn"
   WfModal-id="#modalAjax"
   WfAjax
   WfAjax-url="/docs/parts/ajax-content.html"
   WfAjax-dest="#modalAjax .wfmodal-content-ajax"
   WfAjax-loading="true">
   Carregar Conteúdo
</button>

<!-- O modal que receberá o conteúdo -->
<div WfModal id="modalAjax" WfModal-size="g">
   <div class="wfmodal-topo">
      <h3 class="wfmodal-title">Título</h3>
   </div>
   <!-- Container de destino para o AJAX -->
   <div class="wfmodal-content-ajax" style="padding: 20px;">
      <!-- O conteúdo será injetado aqui -->
   </div>
</div>
</script>
</pre>
          </div>
        </div>

        <!-- Acessibilidade e Eventos -->
        <div class="l">
          <div class="co6-g">
            <h3>Acessibilidade</h3>
            <div
              style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #28a745;
            ">
              <h3 style="margin-top: 0">
                <i class="wf wf-check-circle Taler f20"></i> Recursos de
                Acessibilidade
              </h3>
              <ul>
                <li>
                  <b>Focus Trap:</b> O foco do teclado (Tab) fica preso
                  dentro do modal, como deve ser.
                </li>
                <li>
                  <b>Tecla ESC:</b> Pressionar a tecla 'Escape' fecha o
                  modal.
                </li>
                <li>
                  <b>Atributos ARIA:</b> Usa
                  <code>role="dialog"</code> e <code>aria-modal="true"</code> para
                  leitores de tela.
                </li>
                <li>
                  <b>Foco Inicial:</b> O foco é movido para dentro do
                  modal assim que ele abre.
                </li>
                <li>
                  <b>Retorno do Foco:</b> Ao fechar, o foco retorna para
                  o elemento que abriu o modal.
                </li>
              </ul>
            </div>
          </div>
          <div class="co6-g">
            <h3>Eventos JavaScript</h3>
            <p>
              Você pode ouvir eventos para executar código quando um modal abre ou
              fecha.
            </p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
const meuModal = document.querySelector('#meuModal');

// Evento disparado quando o modal termina de abrir
meuModal.addEventListener('wfmodal:opened', (event) => {
  console.log('Modal aberto!', event.detail.id);
  // Ex: Iniciar um vídeo, carregar um mapa, etc.
});

// Evento disparado quando o modal termina de fechar
meuModal.addEventListener('wfmodal:closed', (event) => {
  console.log('Modal fechado!', event.detail.id);
  // Ex: Pausar um vídeo, limpar um formulário, etc.
});
</script>
</pre>
          </div>
        </div>
    </section>
</section>