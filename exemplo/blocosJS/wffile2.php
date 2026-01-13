<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfFile2</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfFile2</li>
        </ol>
      </nav>
    </div>
    <section class="swfile2x">
      <div class="g-xg">
        <div class="l">
          <div class="co12-g">
            <h2>[Input de Arquivo]</h2>
            <p>
              Componente simples para seleção de arquivos com preview. Use
              <code>&lt;span WfFile2&gt;</code> com atributos.
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3>Demonstração (Imagem única)</h3>
            <span
              WfFile2
              accept="image/*"
              name="img"
              data-preview="#preview1"></span>
            <div style="margin-top: 10px">
              <img
                id="preview1"
                style="
                display: none;
                max-width: 260px;
                border: 1px solid var(--wf-border);
                border-radius: 6px;
              "
                alt="Preview" />
            </div>
          </div>
          <div class="co6-g">
            <h3>Demonstração (Múltiplas imagens)</h3>
            <span
              WfFile2
              accept="image/*"
              name="galeria"
              multiple
              data-preview="#preview2"></span>
            <div
              id="preview2"
              style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap"></div>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>Demonstração (Preview interno padrão)</h3>
            <p>
              Sem <code>data-preview</code> o componente cria um preview interno
              com botão de remover.
            </p>
            <span WfFile2 accept="image/*" name="foto"></span>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>Como Usar</h3>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Botão de seleção e destino de preview -->
<span WfFile2 accept="image/*" name="foto" data-preview="#previewFoto"></span>
<img id="previewFoto" alt="Preview" />

<!-- Galeria (múltiplos) -->
<span WfFile2 accept="image/*" name="galeria" multiple data-preview="#galeriaPreview"></span>
<div id="galeriaPreview"></div>
          </script></pre>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>Atributos</h3>
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
                  <td><code>accept</code></td>
                  <td>Tipos aceitos no input</td>
                  <td><code>image/*</code>, <code>.pdf</code></td>
                </tr>
                <tr>
                  <td><code>name</code></td>
                  <td>Nome do campo para envio</td>
                  <td><code>foto</code></td>
                </tr>
                <tr>
                  <td><code>multiple</code></td>
                  <td>Permite selecionar múltiplos arquivos</td>
                  <td><code>multiple</code></td>
                </tr>
                <tr>
                  <td><code>data-preview</code></td>
                  <td>Seletor do elemento destino do preview</td>
                  <td><code>#preview1</code></td>
                </tr>
              </tbody>
            </table>
            <h3 style="margin-top: 16px">Classes de Estilo (Internas)</h3>
            <ul>
              <li><code>.wffile2-btn</code> botão de upload</li>
              <li><code>.wffile2-icon</code> ícone do botão</li>
              <li>
                <code>.wffile2-preview-box</code> container padrão do preview
              </li>
              <li><code>.wffile2-preview-img</code> imagem do preview</li>
              <li><code>.wffile2-remove</code> botão de remover</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>

  <script>
    (function() {
      try {
        var root = document.querySelector(".swfile2x") || document;
        if (window.WebfullLoader) {
          WebfullLoader.load("WfFile2")
            .then(function() {
              if (window.WfFile2 && typeof WfFile2.initAll === "function")
                WfFile2.initAll(root);
            })
            .catch(function() {
              if (window.WfFile2 && typeof WfFile2.initAll === "function")
                WfFile2.initAll(root);
            });
        } else if (window.WfFile2 && typeof WfFile2.initAll === "function") {
          WfFile2.initAll(root);
        }
      } catch (_) {}
    })();
  </script>