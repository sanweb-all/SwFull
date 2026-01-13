<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfLoad</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfLoad</li>
        </ol>
      </nav>
    </div>
    <section class="wfloadx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Lazy Loading/Viewport]</h3>
            <p>
              O <strong>WfLoad</strong> é um sistema de
              <strong>Lazy Loading</strong> e carregamento sob demanda baseado na
              viewport. Usa <strong>IntersectionObserver</strong>
              para carregar elementos (especialmente imagens) apenas quando ficam
              visíveis, melhorando drasticamente a performance da página.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <strong><i class="wf wf-rocket Taler f20"></i> LAZY LOADING:</strong>
              Carrega apenas elementos visíveis<br />
              <strong><i class="wf wf-target-lock Taler f20"></i> INTERSECTION
                OBSERVER:</strong>
              API moderna e eficiente<br />
              <strong><i class="wf wf-palette Taler f20"></i> TEMAS:</strong>
              Integração total com WfDay
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>Para ativar o lazy loading, use o atributo <code>WfLoad</code>:</p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Lazy loading básico (min-display explícito) -->
<div WfLoad WfLoad-min-display="600">
  <p>Este conteúdo só carrega quando ficar visível!</p>
</div>

<!-- Imagem com lazy loading (min-display=600) -->
<img WfLoad WfLoad-src="imagem-grande.jpg" WfLoad-min-display="600" alt="Imagem">

<!-- Exemplo com spinner (padrão) -->
<div WfLoad WfLoad-loader="spinner" WfLoad-min-display="800">
  <div class="conteudo-pesado">
    <!-- Conteúdo que demora para carregar -->
  </div>
</div>

<!-- Exemplo simplificado: usar spinner (unificado) -->
<div WfLoad WfLoad-loader="spinner" WfLoad-min-display="800">
  <div class="card">
    <h3>Título do Card</h3>
    <p>Conteúdo do card...</p>
  </div>
</div>

<!-- Configuração avançada -->
<img WfLoad
     WfLoad-src="foto.jpg"
     WfLoad-threshold="0.5"
     WfLoad-min-display="800">
        </script></pre>
          </div>
          <div class="co6-g">
            <h3>Como Funciona</h3>
            <p>O WfLoad monitora quando elementos entram na viewport:</p>

            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            ">
              <h3>
                <i class="wf wf-refresh-cw Taler f20"></i> Fluxo de Funcionamento:
              </h3>
              <ol style="margin: 10px 0; padding-left: 20px">
                <li>
                  <strong>1. Inicialização:</strong> Elemento recebe overlay de
                  loading
                </li>
                <li>
                  <strong>2. Observação:</strong> IntersectionObserver monitora a
                  viewport
                </li>
                <li>
                  <strong>3. Entrada:</strong> Elemento entra na área visível
                </li>
                <li>
                  <strong>4. Carregamento:</strong> Conteúdo/imagem é carregado
                </li>
                <li>
                  <strong>5. Exibição:</strong> Loading remove e conteúdo aparece
                </li>
              </ol>
            </div>

            <!-- Demonstração Funcional -->
            <h3>Demonstração Funcional</h3>
            <p>
              Role a página para baixo e veja os elementos carregando sob demanda:
            </p>

            <!-- Elemento de teste 1 -->
            <div
              style="
              height: 360px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--wf-bg-);
              margin: 20px 0;
              border-radius: 8px;
            ">
              <p style="font-size: 18px; color: #666">
                👇 Role para baixo para ver o lazy loading em ação
              </p>
            </div>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <!-- Demonstração com os 2 tipos de loader -->
            <div
              style="
              display: flex;
              gap: 20px;
              flex-wrap: wrap;
              justify-content: center;
            ">
              <!-- Spinner Loader -->
              <div
                WfLoad
                WfLoad-loader="spinner"
                WfLoad-min-display="1200"
                style="
                min-height: 120px;
                border: 2px solid #2196f3;
                border-radius: 8px;
                padding: 16px;
                text-align: center;
                background: var(--wf-bg-);
                max-width: 100%;
                flex: 1;
              ">
                <div class="wfload-content">
                  <h3 style="color: #2196f3; margin-bottom: 10px">
                    <i class="wf wf-zap Taler f20"></i> Spinner Loader
                  </h3>
                  <p style="color: #666; font-size: 14px">
                    Este card apareceu com um <strong>spinner</strong> animado
                    durante o carregamento.
                  </p>
                  <div style="margin-top: 10px; font-size: 12px; color: #888">
                    Tempo: 1200ms | Loader: spinner
                  </div>
                </div>
              </div>

              <!-- Spinner (exemplo alternativo) -->
              <div
                WfLoad
                WfLoad-loader="spinner"
                WfLoad-min-display="1500"
                style="
                min-height: 120px;
                border: 2px solid #ff9800;
                border-radius: 8px;
                padding: 16px;
                text-align: center;
                background: var(--wf-bg-);
                max-width: 100%;
                flex: 1;
              ">
                <div class="wfload-content">
                  <h3 style="color: #ff9800; margin-bottom: 10px">
                    Spinner (lento)
                  </h3>
                  <p style="color: #666; font-size: 14px">
                    Este card apareceu com um <strong>spinner</strong> durante o
                    carregamento (demo tempo maior).
                  </p>
                  <div style="margin-top: 10px; font-size: 12px; color: #888">
                    Tempo: 1500ms | Loader: spinner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configurações -->
        <div class="l et4">
          <div class="co6-g">
            <h3>Configurações do WfLoad</h3>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valores</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>WfLoad-loader</code></td>
                  <td>spinner | skeleton | null</td>
                  <td>Tipo de loading a exibir</td>
                </tr>
                <tr>
                  <td><code>WfLoad-threshold</code></td>
                  <td>0.0 - 1.0</td>
                  <td>% do elemento visível para ativar (padrão: 0.1)</td>
                </tr>
                <tr>
                  <td><code>WfLoad-root-margin</code></td>
                  <td>CSS margin</td>
                  <td>Margem extra da viewport (ex: "50px")</td>
                </tr>
                <tr>
                  <td><code>WfLoad-min-display</code></td>
                  <td>ms</td>
                  <td>Tempo mínimo do loading (padrão: 600ms)</td>
                </tr>
                <tr>
                  <td><code>WfLoad-src</code></td>
                  <td>URL</td>
                  <td>Para imagens: URL real da imagem</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h3>Exemplos de Uso</h3>

            <!-- Imagens Lazy Loading Real -->
            <div style="margin: 20px 0">
              <h3>
                <i class="wf wf-camera Taler f20"></i> Demonstração de Imagens
              </h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 15px">
                Role mais para baixo para ver as imagens carregando com diferentes
                loaders:
              </p>

              <!-- Spacer para scroll -->
              <div
                style="
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--wf-bg-);
                border-radius: 8px;
                margin: 20px 0;
                color: #666;
                font-size: 16px;
              ">
                👇 Continue rolando para ver as imagens 👇
              </div>

              <!-- Imagens com diferentes loaders -->
              <div
                style="
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
                justify-content: center;
              ">
                <div style="text-align: center">
                  <div style="margin-bottom: 8px; font-weight: bold">
                    Spinner:
                  </div>
                  <img
                    WfLoad
                    WfLoad-src="exemplo/images/demo/01.jpg"
                    WfLoad-loader="spinner"
                    WfLoad-min-display="600"
                    alt="Imagem com Spinner"
                    style="
                    width: 300px;
                    height: 200px;
                    border-radius: 8px;
                    background: var(--wf-bg-);
                    object-fit: cover;
                    border: 2px solid #2196f3;
                  " />
                </div>
                <div style="text-align: center">
                  <div style="margin-bottom: 8px; font-weight: bold">
                    Spinner (demo)
                  </div>
                  <img
                    WfLoad
                    WfLoad-src="exemplo/images/demo/02.jpg"
                    WfLoad-loader="spinner"
                    WfLoad-min-display="800"
                    alt="Imagem com Spinner"
                    style="
                    width: 300px;
                    height: 200px;
                    border-radius: 8px;
                    background: var(--wf-bg-);
                    object-fit: cover;
                    border: 2px solid #ff9800;
                  " />
                </div>
              </div>
            </div>

            <!-- Código das Imagens -->
            <div style="margin: 20px 0">
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Imagem com Spinner -->
<img WfLoad
     WfLoad-src="imagem.jpg"
     WfLoad-loader="spinner"
     WfLoad-min-display="600"
     alt="Imagem com Spinner" />

<!-- Imagem com Spinner -->
<img WfLoad
     WfLoad-src="imagem.jpg"
     WfLoad-loader="spinner"
     WfLoad-min-display="800"
     alt="Imagem com Spinner" />
          </script></pre>
            </div>

            <!-- Exemplos Avançados -->
            <div style="margin: 30px 0">
              <h3><i class="wf wf-cog Taler f20"></i> Configurações Avançadas</h3>

              <!-- Spacer para separar -->
              <div
                style="
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--wf-bg-);
                border-radius: 8px;
                margin: 20px 0;
                color: #666;
                font-size: 16px;
              ">
                👇 Role para ver threshold personalizado 👇
              </div>

              <!-- Threshold 50% -->
              <div
                WfLoad
                WfLoad-loader="spinner"
                WfLoad-threshold="0.5"
                WfLoad-min-display="1000"
                style="
                min-height: 150px;
                border: 2px solid #9c27b0;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                background: var(--wf-bg-);
                margin: 20px 0;
              ">
                <div class="swload-content">
                  <h3 style="color: #9c27b0; margin-bottom: 10px">
                    <i class="wf wf-target Taler f20"></i> Threshold 50%
                  </h3>
                  <p style="color: #666; font-size: 14px">
                    Este elemento só carregou quando <strong>50%</strong> dele
                    estava visível na viewport.
                  </p>
                  <div style="margin-top: 10px; font-size: 12px; color: #888">
                    WfLoad-threshold="0.5" | WfLoad-min-display="1000"
                  </div>
                </div>
              </div>

              <!-- Spacer para separar -->
              <div
                style="
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--wf-bg-);
                border-radius: 8px;
                margin: 20px 0;
                color: #666;
                font-size: 16px;
              ">
                👇 Role para ver root margin 👇
              </div>

              <!-- Root Margin -->
              <div
                WfLoad
                WfLoad-loader="skeleton"
                WfLoad-root-margin="200px"
                WfLoad-min-display="800"
                style="
                min-height: 150px;
                border: 2px solid #4caf50;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                background: var(--wf-bg-);
                margin: 20px 0;
              ">
                <div class="swload-content">
                  <h3 style="color: #4caf50; margin-bottom: 10px">
                    <i class="wf wf-ruler Taler f20"></i> Root Margin 200px
                  </h3>
                  <p style="color: #666; font-size: 14px">
                    Este elemento começou a carregar
                    <strong>200px antes</strong> de entrar na viewport.
                  </p>
                  <div style="margin-top: 10px; font-size: 12px; color: #888">
                    WfLoad-root-margin="200px" | WfLoad-min-display="800"
                  </div>
                </div>
              </div>
            </div>

            <!-- Códigos dos Exemplos Avançados -->
            <div style="margin: 20px 0">
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Threshold Personalizado (50%) -->
<div WfLoad
     WfLoad-loader="spinner"
     WfLoad-threshold="0.5"
     WfLoad-min-display="1000">
  <h3>Threshold 50%!</h3>
  <p>Só carrega quando 50% está visível.</p>
</div>

<!-- Root Margin (pré-carregamento) -->
<div WfLoad
     WfLoad-loader="skeleton"
     WfLoad-root-margin="200px"
     WfLoad-min-display="800">
  <h3>Root Margin 200px!</h3>
  <p>Carrega 200px antes de entrar na viewport.</p>
</div>
          </script></pre>
            </div>

            <div
              style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <strong><i class="wf wf-bulb Taler f20"></i> Dicas de
                Performance:</strong><br />
              • <code>WfLoad-min-display="600-1200"</code> - Tempos ideais para UX
              em produção<br />
              • <code>WfLoad-threshold="0.5"</code> - Carrega quando 50% estiver
              visível<br />
              • <code>WfLoad-root-margin="50px"</code> - Pré-carrega elementos
              50px antes<br />
              • <code>WfLoad-loader="skeleton"</code> - Melhor UX para conteúdo
              estruturado<br />
              • <code>WfLoad-loader="spinner"</code> - Ideal para carregamentos
              rápidos<br />
              •
              <strong><i class="wf wf-rocket Taler f20"></i> Performance:</strong>
              Componente limpo, sem console logs desnecessários
            </div>
          </div>
        </div>

        <!-- Uso Programático -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Programático</h3>
            <p>Você também pode usar o WfLoad via JavaScript:</p>

            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicializar elementos específicos
const elemento = document.querySelector('.meu-elemento');
new WfLoad(elemento, {
  loader: 'spinner',
  threshold: 0.3,
  minDisplayTime: 800,
  onVisible: (el) => {
    console.log('Elemento visível:', el);
  }
});

// Inicializar todos os elementos [WfLoad] em um container
WfLoad.initAll(document.querySelector('.container'));

// Configurações avançadas
new WfLoad('.galeria img', {
  loader: 'skeleton',
  rootMargin: '50px',
  onVisible: (img) => {
    // Callback executado quando imagem fica visível
    console.log('Imagem carregada:', img.src);
  }
});
        </script></pre>
          </div>
          <div class="co6-g">
            <h3>Casos de Uso Comuns</h3>

            <div style="margin: 20px 0">
              <h3><i class="wf wf-image Taler f20"></i> Galeria de Imagens</h3>
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Galeria com lazy loading -->
<div class="galeria">
  <img WfLoad
       WfLoad-src="foto1.jpg"
       WfLoad-loader="skeleton"
       WfLoad-min-display="600"
       alt="Foto 1">
  <img WfLoad
       WfLoad-src="foto2.jpg"
       WfLoad-loader="skeleton"
       WfLoad-min-display="600"
       alt="Foto 2">
  <img WfLoad
       WfLoad-src="foto3.jpg"
       WfLoad-loader="skeleton"
       WfLoad-min-display="600"
       alt="Foto 3">
</div>
          </script></pre>
            </div>

            <div style="margin: 20px 0">
              <h3><i class="wf wf-file-text Taler f20"></i> Cards de Conteúdo</h3>
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Cards que carregam sob demanda -->
<div WfLoad
     WfLoad-loader="spinner"
     WfLoad-threshold="0.2"
     WfLoad-min-display="800">
  <article class="card">
    <h3>Título do Artigo</h3>
    <p>Conteúdo pesado que só carrega quando necessário...</p>
    <button>Leia mais</button>
  </article>
</div>
          </script></pre>
            </div>

            <div style="margin: 20px 0">
              <h3>
                <i class="wf wf-bar-chart-2 Taler f20"></i> Gráficos e Widgets
              </h3>
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Widget com carregamento pesado -->
<div WfLoad
     WfLoad-loader="skeleton"
     WfLoad-min-display="1200"
     aria-label="Gráfico carregando">
  <div class="widget-grafico">
    <canvas id="grafico"></canvas>
    <div class="widget-dados">
      <!-- Dados do gráfico -->
    </div>
  </div>
</div>
          </script></pre>
            </div>

            <div style="margin: 20px 0">
              <h3>
                <i class="wf wf-universal-access Taler f20"></i> Acessibilidade
              </h3>
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Elemento totalmente acessível -->
<div WfLoad
     WfLoad-loader="spinner"
     aria-label="Conteúdo carregando dinamicamente"
     role="region"
     aria-live="polite">
  <h3>Conteúdo Acessível</h3>
  <p>Suporte completo a leitores de tela e navegação por teclado.</p>
</div>
          </script></pre>
            </div>

            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #ff9800;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <strong><i class="wf wfs-zap Taler f20"></i> Benefícios de
                Performance:</strong><br />
              • Reduz tempo de carregamento inicial da página<br />
              • Economia de largura de banda<br />
              • Melhor experiência do usuário<br />
              • SEO otimizado com carregamento progressivo
            </div>
          </div>
        </div>
    </section>
</section>