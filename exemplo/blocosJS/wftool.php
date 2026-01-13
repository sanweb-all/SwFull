<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTool</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTool</li>
        </ol>
      </nav>
    </div>
    <section class="swtoolx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Tooltips Avançados]</h3>
            <p>
              O <b>WfTool</b> é o sistema oficial de tooltips do WEBFULL
              Framework. Oferece tooltips inteligentes com posicionamento
              automático, múltiplos temas e suporte completo a HTML rico.
            </p>
            <div
              style="
              background: var(--wbg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wcolor);
            ">
              <b><i class="sw sw-target-lock wdest2-color f20"></i>
                POSICIONAMENTO:</b>
              8 posições automáticas inteligentes<br />
              <b><i class="sw sw-palette wdest2-color f20"></i> ESTILOS:</b>
              Múltiplos temas e cores personalizáveis
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Uso Básico</h3>
            <p>
              Para criar tooltips, use o atributo <code>WfTool</code> com o texto
              da dica:
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Tooltip básico -->
<button WfTool="Esta é uma dica útil!">
  Passe o mouse aqui
</button>

<!-- Tooltip com HTML -->
<span WfTool="<b>Título:</b><br>Descrição detalhada" WfTool-html="true">
  Elemento com tooltip
</span>

<!-- Tooltip com posição específica -->
<div WfTool="Dica no topo" WfTool-position="top">
  Conteúdo
</div>

<!-- Tooltip com tema específico -->
<button WfTool="Tooltip tema claro" WfTool-theme="day">
  Tema Claro
</button>

<!-- Tooltip com tema automático (inverte WfDay) -->
<button WfTool="Tema automático" WfTool-auto-theme="true">
  Auto Tema
</button>

<!-- Tooltip que segue o mouse -->
<span WfTool="Segue o cursor" WfTool-position="mouse">
  Mouse Tracker
</span>
</script>
</pre>
          </div>
          <div class="co6-g">
            <h3 class="wfpage">Exemplos Funcionando</h3>
            <p>Passe o mouse sobre os elementos para ver os tooltips:</p>
            <div
              style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            ">
              <button
                WfTool="<i class='wf wf-lightbulb'></i> Este é um tooltip básico!"
                class="btn btn-prin">
                Tooltip Básico
              </button>

              <button
                WfTool="<b><i class='sw sw-palette'></i> HTML Rico</b><br>Você pode usar <em>formatação</em> e <u>estilos</u>!"
                WfTool-html="true"
                class="btn btn-suce">
                Tooltip com HTML
              </button>

              <button
                WfTool="<i class='sw sw-sun'></i> Tooltip tema claro"
                WfTool-theme="day"
                class="btn btn-aler">
                Tema Claro
              </button>

              <button
                WfTool="<i class='sw sw-moon'></i> Tooltip tema escuro"
                WfTool-theme="night"
                class="btn btn-info">
                Tema Escuro
              </button>

              <button
                WfTool="<i class='sw sw-refresh'></i> Tema automático (inverte WfDay)"
                WfTool-auto-theme="true"
                class="btn btn-peri">
                Auto Tema
              </button>
            </div>
            <br />
            <div style="margin: 20px 0">
              <span
                WfTool="<i class='sw sw-file-text'></i> Tooltips funcionam em qualquer elemento!"
                style="
                background: var(--neut8);
                padding: 8px 12px;
                border-radius: 4px;
                cursor: help;
                color: white;
              ">
                Texto com tooltip
              </span>
              <br /><br /><br />
              <img
                WfTool="<i class='sw sw-image'></i> Imagens também podem ter tooltips!"
                src="https://picsum.photos/60/60?random=1"
                alt="Exemplo"
                style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin: 0 10px;
                cursor: help;
                vertical-align: middle;
              " />
              <br />
              <a
                href="#"
                WfTool="<i class='sw sw-link'></i> Links com informações adicionais"
                style="text-decoration: none; color: #007bff">
                Link com tooltip
              </a>
            </div>
          </div>
        </div>

        <!-- Posicionamento -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Posicionamento Automático</h3>
            <p>
              O WfTool detecta automaticamente a melhor posição para exibir o
              tooltip, evitando que saia da tela:
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Posições Disponíveis</h3>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Atributo</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>top</code></td>
                  <td><code>WfTool-position="top"</code></td>
                  <td>Acima do elemento (padrão)</td>
                </tr>
                <tr>
                  <td><code>bottom</code></td>
                  <td><code>WfTool-position="bottom"</code></td>
                  <td>Abaixo do elemento</td>
                </tr>
                <tr>
                  <td><code>left</code></td>
                  <td><code>WfTool-position="left"</code></td>
                  <td>À esquerda do elemento</td>
                </tr>
                <tr>
                  <td><code>right</code></td>
                  <td><code>WfTool-position="right"</code></td>
                  <td>À direita do elemento</td>
                </tr>
                <tr>
                  <td><code>mouse</code></td>
                  <td><code>WfTool-position="mouse"</code></td>
                  <td>Segue o cursor do mouse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h3 class="wfpage">Teste de Posições</h3>
            <p>Teste os tooltips em diferentes posições:</p>
            <div
              style="
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 10px;
              margin: 20px 0;
            ">
              <button
                WfTool="<i class='sw sw-chevron-up wdest2-color'></i> Tooltip no topo"
                WfTool-position="top"
                class="btn btn-prin">
                Top
              </button>
              <button
                WfTool="<i class='sw sw-chevron-down wdest2-color'></i> Tooltip embaixo"
                WfTool-position="bottom"
                class="btn btn-prin">
                Bottom
              </button>
              <button
                WfTool="<i class='sw sw-chevron-left wdest2-color'></i> Tooltip à esquerda"
                WfTool-position="left"
                class="btn btn-prin">
                Left
              </button>
              <button
                WfTool="<i class='sw sw-chevron-right wdest2-color'></i> Tooltip à direita"
                WfTool-position="right"
                class="btn btn-prin">
                Right
              </button>
              <button
                WfTool="<i class='sw sw-mouse wdest2-color'></i> Segue o mouse"
                WfTool-position="mouse"
                class="btn btn-prin">
                Mouse
              </button>
              <button
                WfTool="<i class='sw sw-refresh-cw wdest2-color'></i> Posição padrão (top)"
                class="btn btn-prin">
                Padrão
              </button>
            </div>

            <!-- Teste nos cantos -->
            <div
              style="
              position: relative;
              height: 150px;
              border: 1px dashed #ccc;
              border-radius: 8px;
              margin: 20px 0;
            ">
              <button
                WfTool="<i class='sw sw-arrow-up-left wdest2-color f20'></i> Canto superior esquerdo - posição automática"
                WfTool-position="bottom"
                class="btn btn-sm btn-prin"
                style="position: absolute; top: 10px; left: 10px">
                <i class="sw sw-arrow-up-left wdest2-color f20"></i>
              </button>
              <button
                WfTool="<i class='sw sw-arrow-up-right wdest2-color f20'></i> Canto superior direito - posição automática"
                WfTool-position="bottom"
                class="btn btn-sm btn-suce"
                style="position: absolute; top: 10px; right: 10px">
                <i class="sw sw-arrow-up-right wdest2-color f20"></i>
              </button>
              <button
                WfTool="<i class='sw sw-arrow-down-left wdest2-color f20'></i> Canto inferior esquerdo - posição automática"
                WfTool-position="top"
                class="btn btn-sm btn-aler"
                style="position: absolute; bottom: 10px; left: 10px">
                <i class="sw sw-arrow-down-left wdest2-color f20"></i>
              </button>
              <button
                WfTool="<i class='sw sw-arrow-down-right wdest2-color f20'></i> Canto inferior direito - posição automática"
                WfTool-position="top"
                class="btn btn-sm btn-peri"
                style="position: absolute; bottom: 10px; right: 10px">
                <i class="sw sw-arrow-down-right wdest2-color f20"></i>
              </button>
              <div
                style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
              ">
                <small>Teste os tooltips nos cantos</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Configurações Avançadas -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Configurações Avançadas</h3>
            <p>Atributos especiais para personalização:</p>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valor</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>WfTool-html</code></td>
                  <td>true</td>
                  <td>Permite HTML no conteúdo do tooltip</td>
                </tr>
                <tr>
                  <td><code>WfTool-theme</code></td>
                  <td>day | night</td>
                  <td>Força um tema específico</td>
                </tr>
                <tr>
                  <td><code>WfTool-position</code></td>
                  <td>top | bottom | left | right | mouse</td>
                  <td>Define a posição do tooltip</td>
                </tr>
                <tr>
                  <td><code>WfTool-auto-theme</code></td>
                  <td>true</td>
                  <td>
                    Inverte automaticamente o tema baseado no WfDay (dia=escuro,
                    noite=claro)
                  </td>
                </tr>
              </tbody>
            </table>

            <div style="margin: 15px 0">
              <button
                WfTool="<i class='bx bx-star'></i> Ícone no tooltip"
                WfTool-html="true"
                WfTool-theme="day"
                class="btn btn-sm btn-prin">
                HTML + Tema
              </button>
              <button
                WfTool="Tooltip que segue o cursor"
                WfTool-position="mouse"
                class="btn btn-sm btn-prin">
                Mouse Tracker
              </button>
              <button
                WfTool="<b>Formatação</b><br><em>Rica</em> com <u>HTML</u>"
                WfTool-html="true"
                WfTool-position="right"
                class="btn btn-sm btn-prin">
                HTML Rico
              </button>
              <button
                WfTool="<i class='sw sw-refresh-cw wdest2-color f20'></i> Tema automático"
                WfTool-auto-theme="true"
                class="btn btn-sm btn-peri">
                Auto Tema
              </button>
            </div>
          </div>

          <div class="co6-g">
            <h3 class="wfpage">Estilos e Temas</h3>
            <p>O WfTool oferece dois temas principais:</p>

            <div style="margin: 15px 0">
              <button
                WfTool="Tema escuro (padrão)"
                WfTool-theme="night"
                class="btn btn-sm btn-notu">
                <i class="sw sw-moon wdest2-color f20"></i> Tema Night
              </button>
              <button
                WfTool="Tema claro"
                WfTool-theme="day"
                class="btn btn-sm btn-clar">
                <i class="sw sw-sun wdest2-color f20"></i> Tema Day
              </button>
            </div>

            <div
              style="
              background: var(--bg-bl);
              padding: 10px;
              border-radius: 4px;
              margin: 10px 0;
            ">
              <small><b><i class="sw sw-bulb wdest2-color f20"></i> Dica:</b>
                Use <code>WfTool-theme="day"</code> ou
                <code>WfTool-theme="night"</code> para forçar um tema
                específico!</small>
            </div>
          </div>
        </div>

        <!-- Inicialização JavaScript -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Inicialização JavaScript</h3>
            <p>
              O WfTool é inicializado automaticamente, mas você pode controlá-lo
              manualmente:
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Inicialização Automática</h3>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática no DOMContentLoaded
// Não precisa fazer nada, o WfTool funciona automaticamente!

// Para conteúdo carregado via AJAX:
WfTool.initAll(container);

// Exemplo com WfAjax:
document.addEventListener('swajax:complete', function(e) {
  WfTool.initAll(e.detail.container);
});
</script>
</pre>
          </div>

          <div class="co6-g">
            <h3 class="wfpage">Configuração Global</h3>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Criar instância com configurações personalizadas
const swTool = new WfTool({
  showDelay: 300,    // Delay para mostrar (ms)
  hideDelay: 100     // Delay para esconder (ms)
});

// Métodos úteis:
WfTool.initAll();           // Inicializar todos os tooltips
WfTool.destroyAll();        // Destruir todos os tooltips
WfTool.destroy(element);    // Destruir tooltip específico
</script>
</pre>
          </div>
        </div>

        <!-- Resumo -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Resumo</h3>
            <div
              style="
              background: var(--bg-bl);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #28a745;
            ">
              <h3 style="margin-top: 0">
                <i class="sw sw-check-circle wdest2-color f20"></i>
                Características do WfTool
              </h3>
              <ul>
                <li>
                  <b><i class="sw sw-message-circle wdest2-color f20"></i>
                    Tooltips Inteligentes:</b>
                  Dicas contextuais elegantes e informativas
                </li>
                <li>
                  <b><i class="sw sw-target wdest2-color f20"></i> Posicionamento
                    Automático:</b>
                  5 posições (top, bottom, left, right, mouse) com detecção
                  inteligente de viewport
                </li>
                <li>
                  <b><i class="sw sw-palette wdest2-color f20"></i> HTML
                    Rico:</b>
                  Suporte completo a formatação HTML com
                  <code>WfTool-html="true"</code>
                </li>
                <li>
                  <b><i class="sw sw-moon wdest2-color f20"></i> Temas
                    Personalizáveis:</b>
                  Temas Day e Night com <code>WfTool-theme</code> e
                  <code>WfTool-auto-theme</code>
                </li>
                <li>
                  <b><i class="sw sw-mouse wdest2-color f20"></i> Mouse
                    Tracking:</b>
                  Tooltip que segue o cursor com
                  <code>WfTool-position="mouse"</code>
                </li>
                <li>
                  <b><i class="sw sw-smartphone wdest2-color f20"></i>
                    Responsivo:</b>
                  Funciona perfeitamente em dispositivos móveis
                </li>
                <li>
                  <b><i class="sw sw-zap wdest2-color f20"></i>
                    Performance:</b>
                  Otimizado com lazy loading e remoção automática do DOM
                </li>
                <li>
                  <b><i class="sw sw-refresh-cw wdest2-color f20"></i> AJAX
                    Ready:</b>
                  Funciona em conteúdo carregado dinamicamente com
                  <code>WfTool.initAll()</code>
                </li>
                <li>
                  <b><i class="sw sw-universal-access wdest2-color f20"></i>
                    Acessibilidade:</b>
                  Suporte completo a <code>aria-describedby</code> e eventos de
                  foco
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
</section>