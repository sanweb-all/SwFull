<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfPreload</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfPreload</li>
        </ol>
      </nav>
    </div>
    <section class="wfpreloadx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <div class="icoTipo aniline-d-gg">
              <span WfTool="JavaScript">
                <i class="wf wf-code-alt"></i> <small>JS</small>
              </span>
            </div>
            <h2 class="wfpage">
              WfPreload <small>[Tela de Carregamento]</small>
            </h2>
            <span class="wfbag">PRONTO / BULLETPROOF</span>
            <p>
              O <strong>WfPreload</strong> é o sistema de tela de carregamento
              (preloader) do WEBFULL. Ele exibe uma animação enquanto a página e
              seus recursos são carregados, melhorando a experiência do usuário. É
              altamente configurável, com múltiplos estilos, temas e efeitos de
              transição.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #00bcd4;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <strong><i class="wf wf-hourglass-start Taler f20"></i>
                AUTOMÁTICO:</strong>
              Detecta o fim do carregamento da página (DOMContentLoaded).<br />
              <strong><i class="wf wf-palette Taler f20"></i> CUSTOMIZÁVEL:</strong>
              Vários estilos de spinner, temas de cores e tamanhos.<br />
              <strong><i class="wf wf-clock Taler f20"></i> CONTROLE DE TEMPO:</strong>
              Garante um tempo mínimo de exibição para uma UX consistente.
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Uso Básico</h3>
            <p>
              Para usar, adicione um elemento com o atributo
              <code>WfPreLoad</code> logo após a abertura da tag
              <code>&lt;body&gt;</code>. O conteúdo dentro dele será o preloader.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Preloader padrão (spinner e texto) -->
<div WfPreLoad>
  <div class="wfpreload-content">
    <div class="wfpreload-spinner"></div>
    <p class="wfpreload-text">Carregando...</p>
  </div>
</div>

<!-- Preloader com tempo mínimo de 2 segundos -->
<div WfPreLoad WfPreLoad-min-display-time="2000">
  <!-- ... conteúdo ... -->
</div>

<!-- Preloader com efeito de saída 'zoomout' -->
<div WfPreLoad WfPreLoad-effect="zoomout">
  <!-- ... conteúdo ... -->
</div>
</script>
</pre>
            <p>
              O componente se encarrega de ocultar o preloader automaticamente
              quando a página estiver pronta.
            </p>
          </div>
          <div class="co6-g">
            <h3 class="wfpage">Demonstração Interativa</h3>
            <p>
              Clique nos botões para simular um preloader com diferentes estilos e
              temas.
            </p>
            <div class="btn-group">
              <button
                class="btn btn-prin"
                onclick="testarPreloader({ theme: 'wfpreload-theme-primary', spinner: 'wfpreload-spinner-dots' })">
                Tema Primário
              </button>
              <button
                class="btn btn-suce"
                onclick="testarPreloader({ theme: 'wfpreload-theme-success', spinner: 'wfpreload-spinner-pulse' })">
                Tema Sucesso
              </button>
              <button
                class="btn btn-peri"
                onclick="testarPreloader({ theme: 'wfpreload-theme-danger', spinner: 'wfpreload-spinner-bars' })">
                Tema Perigo
              </button>
              <button
                class="btn btn-secu"
                onclick="testarPreloader({ theme: 'wfpreload-theme-dark' })">
                Tema Escuro
              </button>
            </div>
          </div>
        </div>

        <!-- Atributos de Configuração -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Atributos de Configuração</h3>
            <p>
              Personalize o comportamento do preloader com estes atributos no
              elemento <code>[WfPreLoad]</code>.
            </p>
            <div class="wftable-responsive">
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
                    <td><code>WfPreLoad-effect</code></td>
                    <td>
                      Efeito de animação ao sair. Valores: <code>fadeup</code>,
                      <code>fadedown</code>, <code>fadeleft</code>,
                      <code>faderight</code>, <code>zoomout</code>,
                      <code>zoomin</code>, <code>fade</code>.
                    </td>
                    <td><code>fadeup</code></td>
                    <td><code>"zoomout"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfPreLoad-min-display-time</code></td>
                    <td>
                      Tempo mínimo em milissegundos que o preloader ficará
                      visível.
                    </td>
                    <td><code>1000</code></td>
                    <td><code>"2000"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfPreLoad-transition-duration</code></td>
                    <td>Duração da animação de saída em milissegundos.</td>
                    <td><code>900</code></td>
                    <td><code>"500"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfPreLoad-max-wait</code></td>
                    <td>
                      Tempo máximo de espera (timeout) para forçar o fechamento.
                    </td>
                    <td><code>5000</code></td>
                    <td><code>"10000"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfPreLoad-on-finish</code></td>
                    <td>
                      Nome de uma função global a ser chamada quando o preloader
                      terminar.
                    </td>
                    <td><code>null</code></td>
                    <td><code>"minhaFuncao"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Estilos e Temas -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Estilos e Temas</h3>
            <p>
              Adicione classes CSS ao elemento <code>[WfPreLoad]</code> para mudar
              sua aparência.
            </p>
          </div>
          <div class="co4-g">
            <h4 class="wfpage">Temas de Cores</h4>
            <p>
              Use classes como <code>wfpreload-theme-dark</code>,
              <code>wfpreload-theme-primary</code>, etc.
            </p>
            <button
              class="btn btn-sec"
              onclick="testarPreloader({ theme: 'wfpreload-theme-warning' })">
              Testar Tema "Warning"
            </button>
          </div>
          <div class="co4-g">
            <h4 class="wfpage">Estilos de Spinner</h4>
            <p>
              Use <code>wfpreload-spinner-dots</code>,
              <code>wfpreload-spinner-pulse</code>, ou
              <code>wfpreload-spinner-bars</code> no elemento do spinner.
            </p>
            <button
              class="btn btn-sec"
              onclick="testarPreloader({ spinner: 'wfpreload-spinner-dots' })">
              Testar Spinner "Dots"
            </button>
          </div>
          <div class="co4-g">
            <h4 class="wfpage">Tamanhos</h4>
            <p>
              Use <code>wfpreload-small</code> ou
              <code>wfpreload-large</code> para alterar o tamanho do conteúdo.
            </p>
            <button
              class="btn btn-sec"
              onclick="testarPreloader({ size: 'wfpreload-large' })">
              Testar Tamanho "Large"
            </button>
          </div>
        </div>

        <!-- API JavaScript -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">API JavaScript</h3>
            <p>Crie e controle preloaders dinamicamente.</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Cria e exibe um preloader com opções
const preloader = WfPreLoad.create({
  effect: 'zoomout',
  minDisplayTime: 1500,
  onFinish: 'minhaFuncaoCallback'
});

// Força o fechamento de todos os preloaders
WfPreLoad.hide();

// Inicializa manualmente os preloaders declarados em HTML
// (geralmente não é necessário, pois é automático)
WfPreLoad.initAll();
</script>
</pre>
          </div>
        </div>

        <!-- Resumo -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Resumo dos Recursos</h3>
            <div
              style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid var(--prin);
            ">
              <ul>
                <li>
                  <i class="wf wf-check Taler f20"></i> Ativação automática via
                  atributo <code>[WfPreLoad]</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Múltiplos efeitos de
                  transição de saída.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Controle de tempo mínimo
                  de exibição para melhor UX.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Vários estilos de spinner
                  (padrão, dots, pulse, bars).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Temas de cores
                  pré-definidos e integração com WfDay.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> API JavaScript para
                  criação e controle dinâmico.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Timeout de segurança para
                  evitar que o preloader fique preso.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Leve, performático e sem
                  dependências.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <script>
      window.testarPreloader = async function(options = {}) {
        // Remove preloader anterior se existir
        const existing = document.getElementById("wfpreload-demo");
        if (existing) {
          existing.remove();
        }

        // Cria o elemento do preloader
        const preloader = document.createElement("div");
        preloader.id = "wfpreload-demo";
        preloader.setAttribute("WfPreLoad", "");
        preloader.setAttribute("WfPreLoad-min-display-time", "1500");
        preloader.setAttribute("WfPreLoad-effect", options.effect || "fadeup");

        // Adiciona classes de tema e tamanho
        if (options.theme) preloader.classList.add(options.theme);
        if (options.size) preloader.classList.add(options.size);

        // Cria o conteúdo interno
        preloader.innerHTML = `
            <div class="wfpreload-content">
               <div class="wfpreload-spinner ${options.spinner || ""}"></div>
               <p class="wfpreload-text">Carregando Demonstração...</p>
            </div>
         `;

        // Adiciona ao body e inicializa
        document.body.appendChild(preloader);
        try {
          if (window.WebfullLoader && typeof WebfullLoader.load === "function") {
            await WebfullLoader.load("wf-preload");
          }
        } catch (_) {}
        if (window.WfPreLoad) {
          new WfPreLoad(preloader);
        }
      };
    </script>
</section>