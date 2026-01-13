<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfType</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfType</li>
        </ol>
      </nav>
    </div>
    <section class="swtypex">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Efeito de Digitação]</h3>
            <p>
              O <b>WfType</b> é um componente leve e poderoso para criar
              o famoso "efeito de digitação" em qualquer elemento de texto. É
              perfeito para destacar títulos, slogans ou frases de impacto de
              forma dinâmica e atraente.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #ff9800;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-text Tperi f20"></i> MÚLTIPLAS FRASES:</b>
              Digita e apaga uma lista de frases em sequência.<br />
              <b><i class="wf wf-fast-forward Tperi f20"></i> VELOCIDADE
                AJUSTÁVEL:</b>
              Controle total sobre a velocidade de digitação e de apagar.<br />
              <b><i class="wf wf-repeat Tperi f20"></i> LOOP INFINITO:</b>
              Opção para que a animação continue em um ciclo eterno.<br />
              <b><i class="wf wf-edit-alt Tperi f20"></i> CURSOR
                CUSTOMIZÁVEL:</b>
              Altere o caractere do cursor piscante.
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para usar, adicione o atributo <code>WfType</code> a um elemento
              (como <code>&lt;span&gt;</code> ou <code>&lt;h1&gt;</code>) e
              forneça as palavras com <code>WfType-words</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<h1>
  WEBFULL é
  <span WfType
        WfType-words='["rápido.", "moderno.", "completo."]'
        class="Tprin">
  </span>
</h1>
</script>
</pre>
            <div
              style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-pin Tperi f20"></i> Como Funciona:</b><br />
              • <b>WfType:</b> Ativa o componente no elemento.<br />
              • <b>WfType-words:</b> Um array JSON com as strings que
              serão digitadas.
            </div>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>Veja o efeito de digitação em ação no título abaixo.</p>
            <div
              class="E"
              style="
              background: var(--wf-bl-);
              padding: 40px 20px;
              border-radius: 8px;
            ">
              <h2 style="font-size: 2.8rem; margin: 0">
                Desenvolva de forma
                <span
                  WfType
                  WfType-words='["inteligente.", "produtiva.", "elegante."]'
                  WfType-loop="true"
                  class="Tprin fwb">
                </span>
              </h2>
            </div>
          </div>
        </div>

        <!-- Atributos de Configuração -->
        <div class="l">
          <div class="co12-g">
            <h3>Atributos de Configuração</h3>
            <p>
              Personalize a animação com os seguintes atributos no elemento
              <code>[WfType]</code>.
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
                    <td><code>WfType-words</code></td>
                    <td>Array JSON com as strings a serem digitadas.</td>
                    <td><code>[]</code></td>
                    <td><code>'["Olá", "Mundo"]'</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-speed</code></td>
                    <td>Velocidade de digitação em milissegundos.</td>
                    <td><code>100</code></td>
                    <td><code>"50"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-back-speed</code></td>
                    <td>Velocidade para apagar o texto em milissegundos.</td>
                    <td><code>50</code></td>
                    <td><code>"25"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-delay</code></td>
                    <td>Pausa em milissegundos antes de começar a apagar.</td>
                    <td><code>1500</code></td>
                    <td><code>"2000"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-loop</code></td>
                    <td>
                      Se a animação deve repetir
                      (<code>true</code>/<code>false</code>).
                    </td>
                    <td><code>false</code></td>
                    <td><code>"true"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-cursor</code></td>
                    <td>Caractere a ser usado como cursor.</td>
                    <td><code>|</code></td>
                    <td><code>"_"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfType-shuffle</code></td>
                    <td>
                      Embaralha a ordem das palavras
                      (<code>true</code>/<code>false</code>).
                    </td>
                    <td><code>false</code></td>
                    <td><code>"true"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Demonstrações -->
        <div class="l">
          <div class="co6-g">
            <h4>Velocidade e Cursor</h4>
            <p>Exemplo com digitação mais rápida e cursor diferente.</p>
            <div
              class="E"
              style="background: var(--wf-bl-); padding: 20px; border-radius: 8px">
              <p style="font-size: 2rem; margin: 0">
                Animação:
                <span
                  WfType
                  WfType-words='["Super rápida!", "Com cursor customizado."]'
                  WfType-speed="30"
                  WfType-back-speed="15"
                  WfType-cursor="_"
                  WfType-loop="true"
                  class="Tsuce fwb">
                </span>
              </p>
            </div>
          </div>
          <div class="co6-g">
            <h4>Sem Loop</h4>
            <p>A animação para após digitar a última palavra.</p>
            <div
              class="E"
              style="background: var(--wf-bl-); padding: 20px; border-radius: 8px">
              <p style="font-size: 2rem; margin: 0">
                Status:
                <span
                  WfType
                  WfType-words='["Digitando...", "Finalizado."]'
                  WfType-loop="false"
                  class="Tperi fwb">
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Resumo -->
        <div class="l et3">
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
                  <i class="wf wf-check Tperi f20"></i> Ativação simples via
                  atributo <code>[WfType]</code>.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Animação de múltiplas
                  frases em sequência.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Controle de velocidade de
                  digitação e de apagar.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Opção de loop infinito
                  para animação contínua.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Cursor piscante
                  customizável.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Opção para embaralhar a
                  ordem das frases.
                </li>
                <li>
                  <i class="wf wf-check Tperi f20"></i> Leve, performático e sem
                  dependências externas.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Variações de Atributos -->
        <div class="l et3">
          <div class="co6-g">
            <h3>Compatibilidade de Atributos</h3>
            <p>
              O WfType reconhece variações de nomenclatura para facilitar
              integração com diferentes estilos:
            </p>
            <ul>
              <li>
                <code>[WfType]</code>, <code>[swtype]</code> ou
                <code>[sw-type]</code> para ativação.
              </li>
              <li>
                <code>WfType-speed</code>, <code>swtype-speed</code> ou
                <code>sw-type-speed</code> para velocidade.
              </li>
              <li>
                O mesmo vale para <code>back-speed</code>, <code>delay</code>,
                <code>loop</code>, <code>cursor</code> e <code>shuffle</code>.
              </li>
            </ul>
          </div>
          <div class="co6-g">
            <h4>Exemplo com variação</h4>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<p>
   Compatível:
   <span sw-type
         sw-type-words='["Aceita", "variações"]'
         sw-type-speed="120"
         sw-type-loop="true"
         class="Tsuce"></span>
</p>
</script></pre>
            <div
              class="E"
              style="background: var(--wf-bl-); padding: 20px; border-radius: 8px">
              <p style="font-size: 2rem; margin: 0">
                Compatível:
                <span
                  sw-type
                  sw-type-words='["Aceita", "variações"]'
                  sw-type-speed="120"
                  sw-type-loop="true"
                  class="Tsuce fwb"></span>
              </p>
            </div>
          </div>
        </div>

        <!-- Formato das Palavras -->
        <div class="l">
          <div class="co6-g">
            <h3>Formato das Palavras</h3>
            <p>
              Você pode fornecer as palavras como JSON (recomendado) ou como uma
              lista separada por vírgulas.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- JSON -->
<span WfType WfType-words='["rápido", "moderno", "versátil"]'></span>

<!-- Vírgulas -->
<span WfType WfType-words="rápido, moderno, versátil"></span>
</script></pre>
            <div
              class="E"
              style="background: var(--wf-bl-); padding: 20px; border-radius: 8px">
              <p style="margin: 0; font-size: 2rem">
                JSON:
                <span
                  WfType
                  WfType-words='["rápido", "moderno", "versátil"]'
                  WfType-loop="true"
                  class="Tperi fwb"></span>
              </p>
              <p style="margin: 8px 0 0; font-size: 2rem">
                Vírgulas:
                <span
                  WfType
                  WfType-words="rápido, moderno, versátil"
                  WfType-loop="true"
                  class="Tperi fwb"></span>
              </p>
            </div>
          </div>
          <div class="co6-g">
            <h3>Shuffle e Delay</h3>
            <p>
              Use <code>WfType-shuffle="true"</code> para embaralhar a ordem das
              palavras e <code>WfType-delay</code> para controlar a pausa antes de
              apagar.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<span WfType
      WfType-words='["embaralhado", "aleatório", "divertido"]'
      WfType-shuffle="true"
      WfType-speed="80"
      WfType-back-speed="40"
      WfType-delay="1000"
      WfType-loop="true"></span>
</script></pre>
            <div
              class="C"
              style="background: var(--wf-bl-); padding: 20px; border-radius: 8px">
              <p style="margin: 0; font-size: 2rem">
                <span
                  WfType
                  WfType-words='["embaralhado", "aleatório", "divertido"]'
                  WfType-shuffle="true"
                  WfType-speed="80"
                  WfType-back-speed="40"
                  WfType-delay="1000"
                  WfType-loop="true"
                  class="Tsuce fwb"></span>
              </p>
            </div>
          </div>
        </div>

        <!-- Integração e Inicialização -->
        <div class="l">
          <div class="co12-g">
            <h3>Integração e Inicialização</h3>
            <p>
              Com o agregador <code>webfull.js</code>, a inicialização é
              automática ao carregar a página. Se você inserir conteúdo
              dinamicamente (ex.: via <code>WfAjax</code>), inicialize manualmente
              no container:
            </p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Após injetar HTML com elementos [WfType]
if (window.WfType && typeof WfType.initAll === 'function') {
   // Passe o container pai para incluir o próprio container e seus descendentes
   WfType.initAll(container);
}
</script></pre>
          </div>
        </div>

        <!-- Dicas & Troubleshooting -->
        <div class="l">
          <div class="co12-g">
            <h3>Dicas & Troubleshooting</h3>
            <div
              style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid var(--prin);
            ">
              <ul>
                <li>
                  Verifique se o atributo <code>WfType-words</code> está presente
                  e válido (JSON ou vírgulas).
                </li>
                <li>
                  Para parar na última palavra, defina
                  <code>WfType-loop="false"</code> (o texto final permanece
                  exibido).
                </li>
                <li>
                  Para conteúdo carregado dinamicamente, chame
                  <code>WfType.initAll</code> com o container pai.
                </li>
                <li>
                  Use <code>WfType-cursor</code> para personalizar o cursor (ex.:
                  <code>"_"</code>, <code>"|"</code>).
                </li>
                <li>
                  Se nada aparecer, abra o console e execute: <br /><code>document.querySelectorAll('[WfType], [swtype],
                    [sw-type]').length</code>
                  e <code>WfType.initAll(document)</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <script>
      try {
        if (window.WfType && typeof window.WfType.initAll === "function") {
          window.WfType.initAll(document);
        }
      } catch (e) {}
    </script>
</section>