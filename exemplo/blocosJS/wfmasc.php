<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfMasc</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfMasc</li>
        </ol>
      </nav>
    </div>
    <section class="swmascx">
      <div class="g-xg">
        <!-- Header -->
        <div class="l">
          <div class="co12-g">
            <h3>[Máscaras de Input]</h3>
            <p>
              O <b>WfMasc</b> é um componente leve e eficiente para
              aplicar máscaras de formatação em campos de input. Ele guia o
              usuário durante a digitação, garantindo que os dados sejam inseridos
              no formato correto para CPF, CNPJ, telefone, datas, valores
              monetários e muito mais.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #03a9f4;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-edit-alt Taler f20"></i> EM TEMPO REAL:</b>
              A máscara é aplicada enquanto o usuário digita.<br />
              <b><i class="wf wf-list-ul Taler f20"></i> MÁSCARAS PRONTAS:</b>
              Dezenas de máscaras comuns no Brasil prontas para uso.<br />
              <b><i class="wf wf-x Taler f20"></i> CUSTOMIZÁVEL:</b>
              Crie suas próprias máscaras de forma simples.
            </div>
          </div>
        </div>

        <!-- Basic Usage -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para usar, adicione o atributo <code>WfMasc</code> ao seu
              <code>&lt;input&gt;</code> e especifique a máscara desejada com
              <code>WfMasc-mask</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Máscara de CPF -->
<input type="text" WfMasc WfMasc-mask="cpf">

<!-- Máscara de Telefone -->
<input type="text" WfMasc WfMasc-mask="phone">

<!-- Máscara de Data -->
<input type="text" WfMasc WfMasc-mask="date">
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
              • <b><code>[WfMasc]</code>:</b> Ativa o componente no
              input.<br />
              • <b><code>[WfMasc-mask]</code>:</b> Define qual máscara
              será aplicada.
            </div>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>Teste as máscaras mais comuns nos campos abaixo.</p>
            <form class="wfmasc-container">
              <div class="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="cpf"
                  placeholder="000.000.000-00" />
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="phone"
                  placeholder="(00) 00000-0000" />
              </div>
              <div class="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="cep"
                  placeholder="00000-000" />
              </div>
              <div class="form-group">
                <label>Dinheiro (R$)</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="money"
                  placeholder="R$ 1.234,56" />
              </div>
              <div class="form-group">
                <label>Dinheiro (sem símbolo)</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="money"
                  WfMasc-symbol="off"
                  placeholder="1.234,56" />
              </div>
            </form>
          </div>
        </div>

        <!-- Available Masks -->
        <div class="l">
          <div class="co12-g">
            <h3>Máscaras Prontas Disponíveis</h3>
            <p>O componente já vem com as máscaras mais utilizadas no Brasil.</p>
            <div class="wftable-responsive">
              <table class="tabela">
                <thead>
                  <tr>
                    <th>Valor para <code>WfMasc-mask</code></th>
                    <th>Formato</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>cpf</code></td>
                    <td><code>999.999.999-99</code></td>
                  </tr>
                  <tr>
                    <td><code>cnpj</code></td>
                    <td><code>99.999.999/9999-99</code></td>
                  </tr>
                  <tr>
                    <td><code>phone</code></td>
                    <td>
                      Dinâmica: <code>(99) 9999-9999</code> ou
                      <code>(99) 99999-9999</code>
                    </td>
                  </tr>
                  <tr>
                    <td><code>cep</code></td>
                    <td><code>99999-999</code></td>
                  </tr>
                  <tr>
                    <td><code>date</code></td>
                    <td><code>99/99/9999</code></td>
                  </tr>
                  <tr>
                    <td><code>time</code></td>
                    <td><code>99:99</code></td>
                  </tr>
                  <tr>
                    <td><code>datetime</code></td>
                    <td><code>99/99/9999 99:99</code></td>
                  </tr>
                  <tr>
                    <td><code>money</code></td>
                    <td>
                      Formato monetário com prefixo "R$ ", separador de milhar e
                      vírgula.
                    </td>
                  </tr>
                  <tr>
                    <td><code>percent</code></td>
                    <td>Formato de porcentagem com até 2 casas decimais.</td>
                  </tr>
                  <tr>
                    <td><code>integer</code></td>
                    <td>Permite apenas números inteiros.</td>
                  </tr>
                  <tr>
                    <td><code>number</code></td>
                    <td>Permite números com casas decimais.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Custom Masks -->
        <div class="l">
          <div class="co6-g">
            <h3>Máscaras Customizadas</h3>
            <p>
              Você pode criar sua própria máscara diretamente no atributo
              <code>WfMasc-mask</code> usando os seguintes caracteres curinga:
            </p>
            <ul>
              <li><code>9</code>: Representa um dígito numérico (0-9).</li>
              <li><code>a</code>: Representa uma letra (a-z, A-Z).</li>
              <li>
                <code>*</code>: Representa um caractere alfanumérico (0-9, a-z,
                A-Z).
              </li>
            </ul>
            <p>
              Qualquer outro caractere (<code>.</code>, <code>-</code>,
              <code>/</code>, etc.) será tratado como um literal fixo na máscara.
            </p>
          </div>
          <div class="co6-g">
            <h4>Exemplos de Máscaras Customizadas</h4>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Placa de carro (padrão antigo) -->
<input WfMasc WfMasc-mask="aaa-9999">

<!-- Placa de carro (Mercosul) -->
<input WfMasc WfMasc-mask="aaa-9*99">

<!-- Número de processo -->
<input WfMasc WfMasc-mask="99999.999999/9999-99">

<!-- Código de produto -->
<input WfMasc WfMasc-mask="PROD-9999-**">
</script>
</pre>
            <form
              class="form"
              style="
              border: 1px solid var(--wf-border);
              padding: 20px;
              border-radius: 8px;
              background: var(--wf-bl);
              margin-top: 1rem;
            ">
              <div class="form-group">
                <label>Placa Mercosul</label>
                <input
                  type="text"
                  WfMasc
                  WfMasc-mask="aaa-9*99"
                  placeholder="ABC-1D23" />
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
                  <i class="wf wf-check Taler f20"></i> Aplicação de máscara em
                  tempo real, durante a digitação.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Ativação simples via
                  atributos <code>[WfMasc]</code> e <code>[WfMasc-mask]</code>.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Suporte a dezenas de
                  máscaras prontas (CPF, CNPJ, telefone, etc.).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Máscara de telefone
                  dinâmica que se ajusta para 8 ou 9 dígitos.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Máscara monetária
                  inteligente com prefixo e separadores.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Criação de máscaras
                  customizadas com padrões simples (<code>9</code>,
                  <code>a</code>, <code>*</code>).
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Leve, performático e sem
                  dependências externas.
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
</section>