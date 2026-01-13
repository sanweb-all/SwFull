<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WebFull</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item active">Home</li>
          <li class="listmenu-item"><a href="#" onclick="WfAjax.load({url: 'exemplo/blocosJS/wfajax.php', dest: 'Content', effect: 'fadeRight'})">Documentação</a></li>
          <li class="listmenu-item"><a href="https://github.com/SandroWeb/WebFull" target="_blank">GitHub</a></li>
        </ol>
      </nav>
    </div>

    <!-- Hero Section -->
    <div class="l">
      <div class="co12-g">
        <div style="text-align: center; padding: 4rem 1rem; background: var(--wf-bg-); border-radius: 8px; margin-bottom: 2rem;">
          <h1 style="font-size: 3.5rem; margin-bottom: 1rem; color: var(--prin);">WebFull Framework</h1>
          <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto 2rem;">
            O framework definitivo para desenvolvimento web moderno, leve e sem dependências.
            Construído com PHP, JavaScript e CSS puro para máxima performance.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://webfull.sanweb.com.br/dist/webfull.min.js" download class="btn btn-prim btn-lg">
              <i class="wf wf-download-alt"></i> Download JS (v1.0.0)
            </a>
            <a href="https://webfull.sanweb.com.br/dist/webfull.min.css" download class="btn btn-sec btn-lg">
              <i class="wf wf-download-alt"></i> Download CSS (v1.0.0)
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="l">
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div style="color: var(--prin); font-size: 2rem; margin-bottom: 1rem;">
            <i class="wf wf-bolt"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;">Ultra Leve</h3>
          <p style="color: var(--text-muted);">
            Menos de 600KB minificado. Sem jQuery, sem React, sem overhead. Apenas JavaScript puro otimizado para velocidade.
          </p>
        </div>
      </div>
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div style="color: var(--suce); font-size: 2rem; margin-bottom: 1rem;">
            <i class="wf wf-shield-check"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;">Sem Dependências</h3>
          <p style="color: var(--text-muted);">
            Esqueça o <code>node_modules</code> gigante. WebFull é autossuficiente e pronto para produção direto da caixa.
          </p>
        </div>
      </div>
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div style="color: var(--info); font-size: 2rem; margin-bottom: 1rem;">
            <i class="wf wf-layer-group"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;">Modular</h3>
          <p style="color: var(--text-muted);">
            Use apenas o que precisa. Carregamento automático de módulos e componentes on-demand.
          </p>
        </div>
      </div>
    </div>

    <!-- Installation Section -->
    <div class="l" style="margin-top: 2rem;">
      <div class="co6-g">
        <h2 class="wfpage"><i class="wf wf-rocket"></i> Instalação Rápida</h2>
        <p>Basta incluir os arquivos CSS e JS no seu projeto:</p>

        <div class="wf-tabs">
          <div class="wf-tab-content" style="display: block;">
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto WebFull</title>
    
    <!-- CSS Core -->
    <link rel="stylesheet" href="https://webfull.sanweb.com.br/dist/webfull.min.css">
</head>
<body>
    
    <div class="container">
        <h1>Olá, WebFull!</h1>
        <button class="btn btn-prim" WfBtn>Clique aqui</button>
    </div>

    <!-- JS Core (Module) -->
    <script type="module" src="https://webfull.sanweb.com.br/dist/webfull.min.js"></script>
</body>
</html>
</script></pre>
          </div>
        </div>
      </div>

      <div class="co6-g">
        <h2 class="wfpage"><i class="wf wf-cloud-download"></i> Downloads</h2>
        <div class="wftable-responsive">
          <table class="tabela">
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Tamanho</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>webfull.min.js</code></td>
                <td>~526 KB</td>
                <td>Core JavaScript Minificado</td>
                <td>
                  <a href="https://webfull.sanweb.com.br/dist/webfull.min.js" download class="btn btn-sm btn-prim">
                    <i class="wf wf-download"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td><code>webfull.min.css</code></td>
                <td>~245 KB</td>
                <td>Core CSS Minificado</td>
                <td>
                  <a href="https://webfull.sanweb.com.br/dist/webfull.min.css" download class="btn btn-sm btn-sec">
                    <i class="wf wf-download"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td><code>webfull.js</code></td>
                <td>~841 KB</td>
                <td>JavaScript Fonte (Dev)</td>
                <td>
                  <a href="https://webfull.sanweb.com.br/dist/webfull.js" download class="btn btn-sm btn-info">
                    <i class="wf wf-code"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--wf-bg-); border-radius: 4px; border-left: 4px solid var(--warn);">
          <strong><i class="wf wf-info-circle"></i> Nota:</strong>
          Para desenvolvimento local, recomendamos usar a versão não minificada para facilitar o debug. Em produção, use sempre as versões <code>.min</code>.
        </div>
      </div>
    </div>

    <!-- CSS Architecture Section -->
    <div class="l" style="margin-top: 3rem;">
      <div class="co12-g">
        <h2 class="wfpage"><i class="wf wf-paint-brush"></i> Arquitetura CSS</h2>
        <p>O WebFull utiliza uma arquitetura CSS moderna baseada em variáveis CSS (Custom Properties) e HSL para máxima flexibilidade.</p>

        <div class="l" style="margin-top: 1.5rem;">
          <div class="co6-g">
            <div style="padding: 1.5rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 8px;">
              <h3 style="margin-bottom: 1rem;"><i class="wf wf-palette"></i> Variáveis Globais</h3>
              <p>O sistema de cores é controlado via variáveis globais, permitindo fácil customização e temas.</p>
              <ul class="wf-ul" style="margin-top: 1rem;">
                <li style="margin-bottom: 0.5rem;"><code>--prin</code>: Cor Principal (Primary)</li>
                <li style="margin-bottom: 0.5rem;"><code>--sec</code>: Cor Secundária (Secondary)</li>
                <li style="margin-bottom: 0.5rem;"><code>--suce</code>: Sucesso (Success)</li>
                <li style="margin-bottom: 0.5rem;"><code>--erro</code>: Erro (Danger)</li>
                <li style="margin-bottom: 0.5rem;"><code>--wf-bg</code>: Background Global</li>
                <li style="margin-bottom: 0.5rem;"><code>--wf-color</code>: Texto Global</li>
              </ul>
            </div>
          </div>

          <div class="co6-g">
            <div style="padding: 1.5rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 8px;">
              <h3 style="margin-bottom: 1rem;"><i class="wf wf-moon"></i> Dark Mode Automático</h3>
              <p>O framework já vem preparado para Dark Mode. As variáveis <code>--wf-bg</code> e <code>--wf-color</code> se adaptam automaticamente ou via classe.</p>
              <div style="margin-top: 1rem; padding: 1rem; background: var(--neut10); color: var(--neut1); border-radius: 4px;">
                <small>Exemplo de CSS:</small>
                <pre style="margin: 0.5rem 0 0; color: #a5d6ff;">:root {
  --wf-bg: var(--neut1);
  --wf-color: var(--neut12);
}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Showcase Preview -->
    <div class="l" style="margin-top: 2rem; margin-bottom: 3rem;">
      <div class="co12-g">
        <h2 class="wfpage"><i class="wf wf-grid"></i> Todos os Componentes (49+)</h2>
        <p>Explore a biblioteca completa de componentes modulares do WebFull.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
          <!-- Core UI -->
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-folder" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfAba</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-list" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfAccord</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-refresh" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfAjax</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-exclamation-triangle" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfAlert</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-magic" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfAnime</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-tag" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfBadge</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-code" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfCode</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-square" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfContainer</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-dollar" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfCotacao</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-sun" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfDay</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-th-large" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfDiv</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-file" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfFile1</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-file" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfFile2</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-icons" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfIconsInit</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-image" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfImg</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-hourglass" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfLazy</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-book" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfLessonsToggle</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-lock" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfLgpd</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-spinner" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfLoad</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-edit" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfMasc</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-window-maximize" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfModal</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-arrows-alt" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfMove</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-bars" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfNavbar</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-link" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfNolink</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-eye-slash" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfOcult</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-copy" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPag</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-infinity" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPagInfinite</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-random" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPageTransition</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-columns" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPanel</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-columns" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPanel1</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-image" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfParallax</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-spinner" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfPreLoad</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-eye" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfReve</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-crosshairs" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfScrollSpy</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-list-ul" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfSelect</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-columns" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfSide</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-columns" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfSidebar</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-arrows-h" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfSlid1</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-arrows-h" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfSlid2</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-table" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTable</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-table" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTable1</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-table" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTableAjax</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-font" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfText</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-minus-circle" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTextLimit</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-edit" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTextarea</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-info-circle" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTool</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-arrow-up" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfTop</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-keyboard" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfType</strong>
          </div>
          <div class="card-demo" style="padding: 1rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 6px;">
            <i class="wf wf-check-circle" style="color: var(--prin); font-size: 1.2rem;"></i> <strong>WfValid</strong>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>