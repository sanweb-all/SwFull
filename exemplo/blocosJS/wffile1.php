<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfFile1</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfFile1</li>
        </ol>
      </nav>
    </div>
    <section class="swfile1x">
      <div class="g-xg">
        <div class="l">
          <div class="co12-g">
            <h3>[Upload de Imagem com Preview]</h3>
            <p>Componente moderno com dropzone, preview instantâneo e integração com tema (WfDay). Aceita JPG/PNG/GIF por padrão.</p>
          </div>
        </div>

        <div class="l e5">
          <div class="co4-g">
            <h3>Padrão (auto tema)</h3>
            <br>
            <div WfFile1></div>
          </div>
          <div class="co4-g">
            <br>
            <h3>Tema Day</h3>
            <div WfFile1 data-theme="day"></div>
          </div>
          <div class="co4-g">
            <br>
            <h3>Tema Night</h3>
            <div WfFile1 data-theme="night"></div>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3>Callback</h3>
            <p>Use <code>data-swfile1-callback</code> para definir o callback de seleção (ex.: <code>alert</code>, <code>console</code> ou uma função global).</p>
            <div WfFile1 data-swfile1-callback="alert"></div>
          </div>
          <div class="co6-g">
            <h3>Aceite personalizado</h3>
            <p>Por padrão aceita imagens. Para outros tipos, crie via JS: <code>new WfFile1(el, { accept:["image/jpeg","image/png"] })</code>.</p>
            <div id="file1-accept"></div>
            <script>
              (function() {
                var el = document.getElementById('file1-accept');
                if (!el) return;
                if (window.WfFile1) {
                  new WfFile1(el, {
                    accept: ["image/jpeg", "image/png"]
                  });
                }
              })();
            </script>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>Como Usar</h3>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Básico (auto WfDay) -->
<div WfFile1></div>

<!-- Controlar tema local -->
<div WfFile1 data-theme="day"></div>
<div WfFile1 data-theme="night"></div>

<!-- Callback pronto -->
<div WfFile1 data-wffile1-callback="alert"></div>

<!-- Aceite por atributo (várias formas) -->
<div WfFile1 WfFile1-accept="image/*"></div>
<div WfFile1 accept="image/webp,image/avif"></div>
<div WfFile1 data-accept="image/jpeg,image/png"></div>

<!-- Personalizado via JS -->
<div id="myFile1"></div>
<script>
  new WfFile1(document.getElementById('myFile1'), { accept:["image/jpeg","image/png"] })
<\/script>

<!-- Observações:
1) As prévias são clicáveis e abrem no WfImg automaticamente.
2) As prévias acumulam; use o "×" para remover individualmente.
3) Para aceitar todas as imagens, use image/*.
-->
          </script></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
  <script>
    (function() {
      var root = document.querySelector('.swfile1x') || document;
      if (window.WebfullLoader) {
        WebfullLoader.load('sw-file1').then(function() {
          if (window.WfFile1 && typeof WfFile1.initAll === 'function') WfFile1.initAll(root);
        }).catch(function() {
          if (window.WfFile1 && typeof WfFile1.initAll === 'function') WfFile1.initAll(root);
        });
      } else if (window.WfFile1 && typeof WfFile1.initAll === 'function') {
        WfFile1.initAll(root);
      }
    })();
  </script>