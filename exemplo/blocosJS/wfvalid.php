<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfValid</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfValid</li>
        </ol>
      </nav>
    </div>
    <section>
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h2>[Validação de Formulários]</h2>
            <p>
              O <strong>WfValid</strong> é o sistema de validação de formulários
              do WEBFULL. Ele oferece uma maneira declarativa e poderosa de
              validar campos de formulário com regras pré-definidas, mensagens de
              erro personalizáveis e feedback em tempo real para o usuário.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #8bc34a;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <strong><i class="wf wf-check-circle Taler f20"></i> DECLARATIVO:</strong>
              Adicione regras de validação diretamente no HTML.<br />
              <strong><i class="wf wf-comment-alt-dots Taler f20"></i> MENSAGENS
                CUSTOMIZÁVEIS:</strong>
              Personalize as mensagens de erro para cada regra.<br />
              <strong><i class="wf wf-bolt Taler f20"></i> VALIDAÇÃO EM TEMPO
                REAL:</strong>
              Feedback instantâneo para o usuário enquanto ele digita.<br />
              <strong><i class="wf wf-cogs Taler f20"></i> EXTENSÍVEL:</strong>
              Adicione suas próprias regras de validação customizadas.
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co7-g">
            <h3>Uso Básico</h3>
            <p>
              Para validar um formulário, adicione o atributo
              <code>WfValid</code> ao elemento <code>&lt;form&gt;</code>. Para
              cada campo, use o atributo <code>WfValid-rules</code> para definir
              as regras separadas por <code>|</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<form WfValid>
  <div>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome"
           WfValid-rules="required|min:3"
           WfValid-msg-required="O nome é obrigatório."
           WfValid-msg-min="O nome deve ter no mínimo 3 caracteres.">
    <div class="wfvalid-error"></div>
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"
           WfValid-rules="required|email">
    <div class="swvalid-error"></div>
  </div>

  <button type="submit">Enviar</button>
</form>
</script>
</pre>
            <p>
              O componente irá automaticamente interceptar o envio do formulário,
              realizar a validação e exibir as mensagens de erro no elemento
              <code>.swvalid-error</code> mais próximo.
            </p>
          </div>
          <div class="co5-g">
            <h3>Exemplo Funcionando</h3>
            <p>
              Tente enviar o formulário abaixo sem preencher os campos
              corretamente.
            </p>
            <form WfValid class="wfvalid-container">
              <div style="margin-bottom: 15px">
                <label class="label" for="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  class="input"
                  WfValid-rules="required|min:3"
                  WfValid-msg-required="O nome é obrigatório."
                  WfValid-msg-min="O nome precisa ter pelo menos 3 letras." />
                <div class="wfvalid-error"></div>
              </div>
              <div style="margin-bottom: 15px">
                <label class="label" for="demo_email">E-mail</label>
                <input
                  type="email"
                  id="demo_email"
                  name="demo_email"
                  class="input"
                  WfValid-rules="required|email"
                  WfValid-msg-email="Este não parece um e-mail válido." />
                <div class="wfvalid-error"></div>
              </div>
              <div style="margin-bottom: 15px">
                <label class="label" for="demo_senha">Senha</label>
                <input
                  type="password"
                  id="demo_senha"
                  name="demo_senha"
                  class="input"
                  WfValid-rules="required|min:6"
                  WfValid-msg-min="A senha deve ter no mínimo 6 caracteres." />
                <div class="wfvalid-error"></div>
              </div>
              <button type="submit" class="btn btn-suce">Cadastrar</button>
            </form>
          </div>
        </div>

        <!-- Regras Disponíveis -->
        <div class="l">
          <div class="co12-g">
            <h3>Regras de Validação Disponíveis</h3>
            <p>
              O WfValid vem com um conjunto completo de regras prontas para uso.
            </p>
            <div class="wftable-responsive">
              <table class="tabela">
                <thead>
                  <tr>
                    <th>Regra</th>
                    <th>Parâmetro</th>
                    <th>Descrição</th>
                    <th>Exemplo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>required</code></td>
                    <td>-</td>
                    <td>O campo não pode estar vazio.</td>
                    <td><code>required</code></td>
                  </tr>
                  <tr>
                    <td><code>email</code></td>
                    <td>-</td>
                    <td>O valor deve ser um endereço de e-mail válido.</td>
                    <td><code>email</code></td>
                  </tr>
                  <tr>
                    <td><code>min</code></td>
                    <td>Número</td>
                    <td>
                      Mínimo de caracteres (para strings) ou valor (para números).
                    </td>
                    <td><code>min:3</code></td>
                  </tr>
                  <tr>
                    <td><code>max</code></td>
                    <td>Número</td>
                    <td>
                      Máximo de caracteres (para strings) ou valor (para números).
                    </td>
                    <td><code>max:255</code></td>
                  </tr>
                  <tr>
                    <td><code>numeric</code></td>
                    <td>-</td>
                    <td>O valor deve ser numérico.</td>
                    <td><code>numeric</code></td>
                  </tr>
                  <tr>
                    <td><code>integer</code></td>
                    <td>-</td>
                    <td>O valor deve ser um número inteiro.</td>
                    <td><code>integer</code></td>
                  </tr>
                  <tr>
                    <td><code>equals</code></td>
                    <td>ID de outro campo</td>
                    <td>
                      O valor deve ser igual ao de outro campo (ex: confirmação de
                      senha).
                    </td>
                    <td><code>equals:senha</code></td>
                  </tr>
                  <tr>
                    <td><code>url</code></td>
                    <td>-</td>
                    <td>O valor deve ser uma URL válida.</td>
                    <td><code>url</code></td>
                  </tr>
                  <tr>
                    <td><code>cpf</code></td>
                    <td>-</td>
                    <td>O valor deve ser um CPF válido.</td>
                    <td><code>cpf</code></td>
                  </tr>
                  <tr>
                    <td><code>cnpj</code></td>
                    <td>-</td>
                    <td>O valor deve ser um CNPJ válido.</td>
                    <td><code>cnpj</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Configurações Avançadas -->
        <div class="l">
          <div class="co6-g">
            <h3>Mensagens de Erro</h3>
            <p>
              Você pode customizar as mensagens de erro para cada regra em cada
              campo usando o atributo <code>WfValid-msg-[regra]</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<input type="text" name="username"
       WfValid-rules="required|min:4"
       WfValid-msg-required="O nome de usuário é obrigatório."
       WfValid-msg-min="O usuário deve ter no mínimo 4 caracteres.">
<div class="wfvalid-error"></div>
</script>
</pre>
            <p>
              Se nenhuma mensagem customizada for fornecida, o WfValid usará uma
              mensagem padrão.
            </p>
          </div>
          <div class="co6-g">
            <h3>API JavaScript</h3>
            <p>Você também pode interagir com o validador via JavaScript.</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obtém a instância do validador de um formulário
const form = document.querySelector('#meu-form');
const validator = form.swValidator;

// Valida o formulário programaticamente
const isValid = validator.validate();

if (isValid) {
  console.log('Formulário é válido!');
} else {
  console.log('Formulário inválido. Erros:', validator.getErrors());
}

// Adicionar uma regra customizada
WfValid.addRule('startsWithA', (value) => {
  return value.startsWith('A');
}, 'O valor deve começar com a letra A.');

// Limpar os erros de um formulário
validator.clearErrors();
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
                  <i class="wf wf-check Taler f20"></i> Validação automática no
                  envio do formulário.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Validação em tempo real
                  nos eventos <code>blur</code> e <code>input</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Conjunto rico de regras de
                  validação prontas para uso.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Mensagens de erro
                  totalmente personalizáveis por campo e por regra.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> API JavaScript para
                  validação programática e extensão de regras.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Integração automática com
                  WfAjax para formulários em conteúdo dinâmico.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Leve, performático e sem
                  dependências.
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
</section>