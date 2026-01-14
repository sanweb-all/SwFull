<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WebFull</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item active">Home</li>
          <li class="listmenu-item"><a href="https://github.com/sanweb-all/WebFull" target="_blank">GitHub</a></li>
        </ol>
      </nav>
    </div>

    <!-- Hero Section -->
    <div class="l">
      <div class="co12-g">
        <div style="text-align: center; padding: 4rem 1rem; background: var(--wf-bg-); border-radius: 8px; margin-bottom: 2rem;">
          <h1 style="margin-bottom: 1rem; color: var(--prin);">WebFull Framework</h1>
          <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto 2rem;">
            O framework definitivo para desenvolvimento web moderno, leve e sem dependências.
            Construído com PHP, JavaScript e CSS puro para máxima performance.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.min.js" download class="btn btn-prin btn-lg" target="_blank">
              <i class="wf wf-download-alt"></i> Download JS (Latest)
            </a>
            <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.min.css" download class="btn btn-secu btn-lg" target="_blank">
              <i class="wf wf-download-alt"></i> Download CSS (Latest)
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="l">
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div class="icon1">
            <i class="wf wf-stack-overflow"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;" class="c">Ultra Leve</h3>
          <p style="color: var(--text-muted);text-align: center;">
            Menos de 600KB minificado. Sem jQuery, sem React, sem overhead. Apenas JavaScript puro otimizado para velocidade.
          </p>
        </div>
      </div>
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div class="icon1">
            <i class="wf wf-beer"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;" class="c">Sem Dependências</h3>
          <p style="color: var(--text-muted);text-align: center;">
            Esqueça o <code>node_modules</code> gigante. WebFull é autossuficiente e pronto para produção direto da caixa.
          </p>
        </div>
      </div>
      <div class="co4-g">
        <div style="padding: 1.5rem; border: 1px solid var(--wf-border); border-radius: 8px; height: 100%; background: var(--wf-bl);">
          <div class="icon1">
            <i class="wf wf-layer"></i>
          </div>
          <h3 style="margin-bottom: 0.5rem;" class="c">Modular</h3>
          <p style="color: var(--text-muted);text-align: center;">
            Use apenas o que precisa. Carregamento automático de módulos e componentes on-demand.
          </p>
        </div>
      </div>
    </div>

    <!-- Installation Section -->
    <div class="l" style="margin-top: 2rem;">
      <div class="co6-g">
        <h3><i class="wf wf-rocket"></i> Instalação Rápida</h3>
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sanweb-all/WebFull@main/dist/webfull.min.css">
</head>
<body>
    <div class="container">
        <h1>Olá, WebFull!</h1>
        <button class="btn btn-prin" WfBtn>Clique aqui</button>
    </div>
    <!-- JS Core (Module) -->
    <script type="module" src="https://cdn.jsdelivr.net/gh/sanweb-all/WebFull@main/dist/webfull.min.js">&lt;/script>
</body>
</html>
</script></pre>
          </div>
        </div>
      </div>

      <div class="co6-g">
        <h3><i class="wf wf-cloud-download"></i> Downloads</h3>
        <div class="wftable-responsive et4">
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
                <td>~248 KB</td>
                <td>Core JavaScript Minificado</td>
                <td>
                  <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.min.js" download class="btn btn-sm btn-prin" target="_blank">
                    <i class="wf wf-download"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td><code>webfull.min.css</code></td>
                <td>~524 KB</td>
                <td>Core CSS Minificado</td>
                <td>
                  <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.min.css" download class="btn btn-sm btn-secu" target="_blank">
                    <i class="wf wf-download"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td><code>webfull.css</code></td>
                <td>~318 KB</td>
                <td>Core CSS Fonte (Dev)</td>
                <td>
                  <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.css" download class="btn btn-sm btn-info" target="_blank">
                    <i class="wf wf-code"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td><code>webfull.js</code></td>
                <td>~853 KB</td>
                <td>JavaScript Fonte (Dev)</td>
                <td>
                  <a href="https://github.com/sanweb-all/WebFull/raw/main/dist/webfull.js" download class="btn btn-sm btn-aler" target="_blank">
                    <i class="wf wf-code"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--wf-bg-); border-radius: 4px; border-left: 4px solid var(--warn);">
          <b><i class="wf wf-info-circle"></i> Nota:</b>
          Para desenvolvimento local, recomendamos usar a versão não minificada para facilitar o debug. Em produção, use sempre as versões <code>.min</code>.
        </div>
      </div>
    </div>

    <!-- CSS Architecture Section -->
    <div class="l" style="margin-top: 3rem;">
      <div class="co12-g">
        <h3><i class="wf wf-paint-brush"></i> Arquitetura CSS</h3>
        <p>O WebFull utiliza uma arquitetura CSS moderna baseada em variáveis CSS (Custom Properties) e HSL para máxima flexibilidade.</p>

        <div class="l" style="margin-top: 1.5rem;">
          <div class="co6-g">
            <div style="padding: 1.5rem; background: var(--wf-bl); border: 1px solid var(--wf-border); border-radius: 8px;">
              <h3 style="margin-bottom: 1rem;"><i class="wf wf-palette"></i> Variáveis Globais</h3>
              <p>O sistema de cores é controlado via variáveis globais, permitindo fácil customização e temas.</p>
              <ul class="wf-ul" style="margin-top: 1rem;">
                <li style="margin-bottom: 0.5rem;"><code>--prin</code>: Cor Principal (Primary)</li>
                <li style="margin-bottom: 0.5rem;"><code>--secu</code>: Cor Secundária (Secondary)</li>
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
        <h3><i class="wf wf-grid"></i> Todos os Componentes (49+)</h3>
        <p>Explore a biblioteca completa de componentes modulares do WebFull. Clique para visualizar.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
          <!-- Core UI -->
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfaba.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-folder" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfAba</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfaccord.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-align-justify" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfAccord</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfajax.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-download" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfAjax</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfalert.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-alarm-exclamation" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfAlert</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfanime.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-party" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfAnime</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfbadge.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-badge" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfBadge</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfcode.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bracket" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfCode</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfcontainer.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-box" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfContainer</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfcotacao.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-money-withdraw" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfCotacao</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfday.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-brightness" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfDay</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfdiv.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-all" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfDiv</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wffile1.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-book-content" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfFile1</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wffile2.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-book-content" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfFile2</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosCSS/icones.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-party" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfIconsInit</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfimg.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-camera" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfImg</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wflazy.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-alarm" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfLazy</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wflessonstoggle.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-book-open" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfLessonsToggle</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wflgpd.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-shield-plus" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfLgpd</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfload.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-circle-quarter" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfLoad</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfmasc.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-brush" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfMasc</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfmodal.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-album" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfModal</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfmove.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-arrow-from-left" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfMove</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfnavbar.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-align-justify" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfNavbar</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfnolink.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-anchor" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfNolink</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfocult.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bell-off" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfOcult</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpag.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-book" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPag</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpaginfinite.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-circle-three-quarter" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPagInfinite</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpagetransition.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-arrow-from-right" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPageTransition</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpanel.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-outer" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPanel</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpanel1.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-outer" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPanel1</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfparallax.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-camera-movie" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfParallax</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfpreload.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-circle-quarter" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfPreLoad</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfreve.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-brightness-half" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfReve</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfscrollspy.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bullseye" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfScrollSpy</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfselect.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-align-left" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfSelect</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfside.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-left" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfSide</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfsidebar.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-right" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfSidebar</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfslid1.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-arrow-from-left" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfSlid1</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfslid2.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-arrow-from-right" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfSlid2</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftable.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-all" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTable</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftable1.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-all" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTable1</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftableajax.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-border-all" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTableAjax</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftext.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-align-left" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfText</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftextlimit.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bell-minus" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTextLimit</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftextarea.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-braille" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTextarea</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftool.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bulb" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTool</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftop.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-arrow-to-top" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfTop</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wftype.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-bold" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfType</b>
          </div>
          <div class="card-demo linkHome" WfAjax WfAjax-url="exemplo/blocosJS/wfvalid.php" WfAjax-dest="Content" WfAjax-effect="fadeRight">
            <i class="wf wf-badge-check" style="color: var(--prin); font-size: 1.8rem;"></i> <b>WfValid</b>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>