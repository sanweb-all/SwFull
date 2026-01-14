<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfMove</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfMove</li>
        </ol>
      </nav>
    </div>
    <section class="wfmovex">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Elementos Arrastáveis]</h3>
            <p>
              O <b>WfMove</b> neste projeto é um gerenciador de
              animações por scroll / visibilidade. Ele observa elementos com
              classes de animação (ex.: <code>anime-fade-in</code>) e aplica
              classes de entrada/saída automaticamente. Também suporta o atributo
              <code>WfMove</code> para configuração por container.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #673ab7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-play-circle Taler f20"></i> ANIMAÇÕES
                ON-SCROLL:</b>
              Ativa animações quando o elemento entra na viewport.<br />
              <b><i class="wf wf-dice-6 Taler f20"></i> COMPATIBILIDADE
                LEGADO:</b>
              Mapeia classes <code>anime-*</code> para
              <code>wfmove-*</code> automaticamente.<br />
              <b><i class="wf wf-moon Taler f20"></i> TEMA / NIGHT MODE:</b>
              Respeita o tema <code>wfday-night</code>.
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para ativar animações automáticas, adicione classes
              <code>anime-*</code> aos elementos ou coloque-os dentro de um
              container com o atributo <code>WfMove</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Usando classes legacy -->
<div class="anime-fade-in">Aparece com fade</div>

<!-- Usando classes new-style (wfmove-) -->
<div class="wfmove-slide-up">Sobe com slide</div>

<!-- Ativando um container com configurações -->
<div WfMove WfMove-simpleOut="true" WfMove-threshold="0.15">
  <div class="anime-stagger">Filhos animam em sequência</div>
</div>
</script>
</pre>
            <div
              style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-pin Taler f20"></i> Como Funciona:</b><br />
              • <b>WfMove:</b> Ativa o componente no elemento.<br />
              • <b>WfMove-handle:</b> (Opcional) Seletor CSS para a alça
              que inicia o arraste.
            </div>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>
              Arraste os quadrados abaixo. O primeiro pode ser arrastado por
              qualquer parte, o segundo apenas pela barra cinza.
            </p>
            <div
              style="
              position: relative;
              height: 300px;
              border: 2px dashed #ccc;
              border-radius: 8px;
              padding: 10px;
              margin-top: 20px;
            ">
              <!-- Elemento 1: Arrastável por completo -->
              <div
                WfMove
                style="
                position: absolute;
                top: 20px;
                left: 20px;
                width: 120px;
                height: 120px;
                background: var(--prin);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: move;
                border-radius: 8px;
                z-index: 10;
              ">
                Arraste-me
              </div>

              <!-- Elemento 2: Arrastável pela alça -->
              <div
                WfMove
                WfMove-handle=".handle"
                style="
                position: absolute;
                top: 150px;
                left: 150px;
                width: 200px;
                background: var(--suce);
                color: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 10;
              ">
                <div
                  class="handle"
                  style="
                  padding: 8px;
                  background: rgba(0, 0, 0, 0.2);
                  border-radius: 8px 8px 0 0;
                  cursor: move;
                ">
                  <i class="wf wf-move"></i> Arraste aqui
                </div>
                <div style="padding: 15px">Conteúdo fixo.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Atributos de Configuração -->
        <div class="l">
          <div class="co12-g">
            <h3>Atributos de Configuração</h3>
            <p>
              Personalize o comportamento do arraste com estes atributos no
              elemento <code>[WfMove]</code>.
            </p>
            <div class="wftable-responsive">
              <table class="tabela">
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Descrição</th>
                    <th>Exemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>WfMove</code></td>
                    <td>
                      Ativa o observador de animações para o container (ou use
                      classes diretas nos elementos).
                    </td>
                    <td><code>&lt;div WfMove&gt;</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-speed</code></td>
                    <td>
                      Define a velocidade padrão das transições:
                      <code>fast</code>, <code>normal</code>, <code>slow</code>.
                    </td>
                    <td><code>"slow"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-delay</code></td>
                    <td>
                      Delay em ms antes de executar a animação (aplicado por
                      container).
                    </td>
                    <td><code>"200"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-threshold</code></td>
                    <td>
                      Porcentagem visível para disparar (0.0 - 1.0). Ex.:
                      <code>0.1</code> = 10%.
                    </td>
                    <td><code>"0.1"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-repeat</code></td>
                    <td>
                      Se <code>true</code>, animação repete quando elemento
                      reentra na viewport.
                    </td>
                    <td><code>"true"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-simpleOut</code></td>
                    <td>
                      Se <code>true</code> (padrão), aplica um fade rápido na
                      saída, interrompendo animações longas.
                    </td>
                    <td><code>"true"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-on-start</code></td>
                    <td>
                      JS inline executado quando a animação começa (string de
                      função).
                    </td>
                    <td><code>"console.log('start')"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfMove-on-end</code></td>
                    <td>
                      JS inline executado quando a animação termina / é
                      interrompida.
                    </td>
                    <td><code>"console.log('end')"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Demonstrações Avançadas -->
        <div class="l">
          <div class="co6-g">
            <h4>Limite de Movimento (Boundary)</h4>
            <p>O elemento só pode ser movido dentro da área tracejada.</p>
            <div
              id="boundary-demo"
              style="
              position: relative;
              height: 250px;
              border: 2px dashed var(--peri);
              border-radius: 8px;
              padding: 10px;
              margin-top: 20px;
            ">
              <div
                WfMove
                WfMove-boundary="#boundary-demo"
                style="
                position: absolute;
                top: 50px;
                left: 50px;
                width: 100px;
                height: 100px;
                background: var(--peri);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: move;
                border-radius: 8px;
              ">
                Limitado
              </div>
            </div>
          </div>
          <div class="co6-g">
            <h4>Movimento por Eixo</h4>
            <p>Restrinja o movimento para apenas horizontal ou vertical.</p>
            <div
              style="
              position: relative;
              height: 250px;
              border: 2px dashed var(--aler);
              border-radius: 8px;
              padding: 10px;
              margin-top: 20px;
            ">
              <!-- Apenas Vertical -->
              <div
                WfMove
                WfMove-axis="y"
                style="
                position: absolute;
                top: 20px;
                left: 40px;
                width: 100px;
                height: 50px;
                background: var(--aler);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: ns-resize;
                border-radius: 8px;
              ">
                Vertical
              </div>
              <!-- Apenas Horizontal -->
              <div
                WfMove
                WfMove-axis="x"
                style="
                position: absolute;
                top: 120px;
                left: 100px;
                width: 100px;
                height: 50px;
                background: var(--info);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: ew-resize;
                border-radius: 8px;
              ">
                Horizontal
              </div>
            </div>
          </div>
        </div>

        <!-- API JavaScript e Eventos -->
        <div class="l">
          <div class="co6-g">
            <h3>API JavaScript</h3>
            <p>Controle o componente programaticamente.</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicializar todos os elementos [WfMove]
WfMove.initAll();

// Inicializar em um container específico
WfMove.initAll(document.querySelector('#meu-app'));

// Obter a instância de um elemento
const el = document.querySelector('#meu-elemento-arrastavel');
const moveInstance = el._swMove;

// Destruir a funcionalidade de arraste
moveInstance.destroy();
</script>
</pre>
          </div>
          <div class="co6-g">
            <h3>Eventos</h3>
            <p>Execute código em resposta a ações de arraste.</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
const el = document.querySelector('#meu-elemento-arrastavel');

// Início do arraste
el.addEventListener('wfmove:start', (e) => {
  console.log('Começou a arrastar!', e.detail);
});

// Durante o arraste
el.addEventListener('swmove:move', (e) => {
  console.log('Movendo...', e.detail.x, e.detail.y);
});

// Fim do arraste
el.addEventListener('wfmove:end', (e) => {
  console.log('Terminou de arrastar!', e.detail);
});
</script>
</pre>
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
            ">
              <ul>
                <li>
                  <i class="wf wf-check Taler f20"></i> Ativação simples via
                  atributo <code>[WfMove]</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Suporte a alça de arraste
                  customizável (<code>WfMove-handle</code>).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Limitação de movimento a
                  um container (<code>WfMove-boundary</code>).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Restrição de movimento por
                  eixo (<code>WfMove-axis</code>).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Suporte completo a mouse e
                  touch (dispositivos móveis).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Eventos customizados
                  (<code>wfmove:start</code>, <code>wfmove:move</code>,
                  <code>wfmove:end</code>).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Leve, performático e sem
                  dependências externas.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
</section>