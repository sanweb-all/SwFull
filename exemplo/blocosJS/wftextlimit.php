<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTextlimit</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTextlimit</li>
        </ol>
      </nav>
    </div>
    <section class="swtextlimitx">
      <div class="g-xg">
        <!-- Header -->
        <div class="l">
          <div class="co12-g">
            <h3>[Contador e Limite de Caracteres]</h3>
            <p>
              O <b>WfTextLimit</b> é um componente simples e eficaz para
              adicionar um contador de caracteres e impor um limite máximo em
              elementos <code>&lt;textarea&gt;</code>. Ele fornece feedback visual
              em tempo real para o usuário.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #795548;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-sort-numeric-down-alt Taler f20"></i> CONTADOR EM
                TEMPO REAL:</b>
              Mostra a contagem de caracteres enquanto o usuário digita.<br />
              <b><i class="wf wf-shield-alt Taler f20"></i> LIMITE RÍGIDO:</b>
              Impede que o usuário digite mais do que o máximo permitido.<br />
              <b><i class="wf wf-comment-alt-edit Taler f20"></i> TEXTO
                CUSTOMIZÁVEL:</b>
              Personalize o texto do contador.
            </div>
          </div>
        </div>

        <!-- Basic Usage -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para usar, adicione o atributo <code>WfTextLimit</code> em
              <code>&lt;textarea&gt;</code> ou
              <code>&lt;input type="text"&gt;</code> e defina o limite com
              <code>WfTextLimit-max</code> ou <code>maxlength</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Textarea com limite de 150 caracteres -->
<textarea WfTextLimit WfTextLimit-max="150"></textarea>

<!-- Com texto do contador personalizado -->
<textarea WfTextLimit
          WfTextLimit-max="200"
          WfTextLimit-text="Restam: {remaining}">
</textarea>

<!-- Input com limite usando maxlength -->
<input type="text" WfTextLimit maxlength="80" placeholder="Seu nome" />
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
              • <b><code>[WfTextLimit]</code>:</b> Ativa o componente na
              textarea.<br />
              • <b><code>[WfTextLimit-max]</code>:</b> Define o número
              máximo de caracteres.<br />
              • O contador é criado e inserido automaticamente após a textarea.
            </div>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>
              Digite nos campos abaixo para ver o contador em ação. O limite é de
              250 caracteres na textarea e 60 caracteres no input.
            </p>
            <form
              class="form"
              style="
              border: 1px solid var(--wf-border);
              padding: 20px;
              border-radius: 8px;
              background: var(--wf-bl);
            ">
              <div class="form-group">
                <label for="bio">Biografia</label>
                <textarea
                  id="bio"
                  WfTextLimit
                  WfTextLimit-max="250"
                  rows="5"
                  placeholder="Digite sua biografia aqui..."></textarea>
              </div>
              <div class="form-group">
                <label for="apelido">Apelido</label>
                <input
                  id="apelido"
                  type="text"
                  WfTextLimit
                  maxlength="60"
                  placeholder="Seu apelido" />
              </div>
            </form>
          </div>
        </div>

        <!-- Configuration -->
        <div class="l">
          <div class="co12-g">
            <h3>Atributos de Configuração</h3>
            <p>
              Personalize o contador com os seguintes atributos na tag
              <code>&lt;textarea&gt;</code>.
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
                    <td><code>WfTextLimit-max</code></td>
                    <td>O número máximo de caracteres permitidos.</td>
                    <td><code>150</code></td>
                    <td><code>"500"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfTextLimit-text</code></td>
                    <td>
                      O template do texto do contador. Use as variáveis:<br />
                      <code>{count}</code>: caracteres atuais<br />
                      <code>{max}</code>: máximo de caracteres<br />
                      <code>{remaining}</code>: caracteres restantes
                    </td>
                    <td><code>"{count}/{max}"</code></td>
                    <td><code>"Restam {remaining} caracteres"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Custom Text Example -->
        <div class="l">
          <div class="co12-g">
            <h3>Exemplo com Texto Customizado</h3>
            <p>
              Este exemplo mostra os caracteres restantes em vez da contagem
              total.
            </p>
            <form
              class="form"
              style="
              border: 1px solid var(--wf-border);
              padding: 20px;
              border-radius: 8px;
              background: var(--wf-bl);
            ">
              <div class="form-group">
                <label for="comentario">Comentário</label>
                <textarea
                  id="comentario"
                  WfTextLimit
                  WfTextLimit-max="100"
                  WfTextLimit-text="Restam {remaining} caracteres"
                  rows="4"
                  placeholder="Deixe seu comentário..."></textarea>
              </div>
            </form>
          </div>
        </div>

        <!-- Summary -->
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
                  <i class="wf wf-check Taler f20"></i> Adiciona um contador de
                  caracteres a qualquer <code>&lt;textarea&gt;</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Impede o usuário de
                  digitar além do limite definido em <code>WfTextLimit-max</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> O contador é atualizado em
                  tempo real (enquanto digita).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> O texto do contador é
                  totalmente personalizável com <code>WfTextLimit-text</code>.
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
  </div>
  <script>
    (function() {
      try {
        var root = document.querySelector(".swtextlimitx") || document;
        if (window.WebfullLoader) {
          WebfullLoader.load("sw-text-limit")
            .then(function() {
              if (window.WfTextLimit && typeof WfTextLimit.initAll === "function")
                WfTextLimit.initAll(root);
            })
            .catch(function() {
              if (window.WfTextLimit && typeof WfTextLimit.initAll === "function")
                WfTextLimit.initAll(root);
            });
        } else if (
          window.WfTextLimit &&
          typeof WfTextLimit.initAll === "function"
        ) {
          WfTextLimit.initAll(root);
        }
      } catch (_) {}
    })();
  </script>