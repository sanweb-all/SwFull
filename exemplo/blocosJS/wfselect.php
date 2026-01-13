<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfSelect</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfSelect</li>
        </ol>
      </nav>
    </div>
    <section class="swselectx">
      <div class="g-xg">
        <!-- Header -->
        <div class="l">
          <div class="co12-g">
            <h3>[Selects Customizados com Busca]</h3>
            <p>
              O <b>WfSelect</b> transforma o elemento
              <code>&lt;select&gt;</code> padrão do navegador em um componente
              moderno, estilizado e funcional, com suporte a busca interna,
              placeholders customizáveis e total acessibilidade.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #9c27b0;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-search Taler f20"></i> BUSCA INTEGRADA:</b>
              Filtre as opções rapidamente, ideal para listas longas.<br />
              <b><i class="wf wf-palette Taler f20"></i> TOTALMENTE
                ESTILIZADO:</b>
              Aparência consistente em todos os navegadores e integrada ao
              WfDay.<br />
              <b><i class="wf wf-universal-access Taler f20"></i>
                ACESSÍVEL:</b>
              Suporte completo a navegação por teclado (Setas, Enter, ESC).
            </div>
          </div>
        </div>

        <!-- Basic Usage -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para usar, basta adicionar o atributo <code>WfSelect</code> a um
              elemento <code>&lt;select&gt;</code>.
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Select customizado simples -->
<select WfSelect>
  <option value="1">Opção 1</option>
  <option value="2">Opção 2</option>
  <option value="3">Opção 3</option>
</select>

<!-- Com busca habilitada -->
<select WfSelect WfSelect-search="true">
  ...
</select>
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
              • <b><code>[WfSelect]</code>:</b> Ativa o componente no
              select.<br />
              • O componente lê as <code>&lt;option&gt;</code> existentes e cria a
              versão estilizada.
            </div>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>Interaja com os selects customizados abaixo.</p>
            <form
              class="form"
              style="
              border: 1px solid var(--wf-border);
              padding: 20px;
              border-radius: 8px;
              background: var(--wf-bl);
            ">
              <div class="form-group">
                <label>Select Simples</label>
                <select WfSelect>
                  <option value="">Selecione um país</option>
                  <option value="br">Brasil</option>
                  <option value="us">Estados Unidos</option>
                  <option value="pt">Portugal</option>
                  <option value="jp">Japão</option>
                </select>
              </div>
              <div class="form-group">
                <label>Select com Busca</label>
                <select WfSelect WfSelect-search="true">
                  <option value="">Selecione um estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="BA">Bahia</option>
                  <option value="PR">Paraná</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        <!-- Configuration -->
        <div class="l">
          <div class="co12-g">
            <h3>Atributos de Configuração</h3>
            <p>
              Personalize o componente com os seguintes atributos na tag
              <code>&lt;select&gt;</code>.
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
                    <td><code>WfSelect-search</code></td>
                    <td>
                      Habilita ou desabilita o campo de busca
                      (<code>true</code>/<code>false</code>).
                    </td>
                    <td><code>false</code></td>
                    <td><code>"true"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSelect-placeholder</code></td>
                    <td>
                      Define um texto de placeholder customizado. Se não definido,
                      usa o texto da primeira option.
                    </td>
                    <td><code>null</code></td>
                    <td><code>"Escolha uma opção..."</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSelect-search-placeholder</code></td>
                    <td>Texto do placeholder para o campo de busca.</td>
                    <td><code>"Buscar..."</code></td>
                    <td><code>"Filtre aqui..."</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSelect-no-results-text</code></td>
                    <td>Texto exibido quando a busca não retorna resultados.</td>
                    <td><code>"Nenhum resultado encontrado"</code></td>
                    <td><code>"Ops, nada por aqui"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- More Examples -->
        <div class="l">
          <div class="co6-g">
            <h3>Select Desabilitado</h3>
            <p>
              O componente respeita o atributo <code>disabled</code> do select
              original.
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
                <label>Categoria (desabilitado)</label>
                <select WfSelect disabled>
                  <option value="1">Eletrônicos</option>
                  <option value="2">Livros</option>
                </select>
              </div>
            </form>
          </div>
          <div class="co6-g">
            <h3>Eventos</h3>
            <p>
              O WfSelect dispara um evento <code>change</code> no elemento
              <code>&lt;select&gt;</code> original, permitindo que você ouça as
              mudanças normalmente.
            </p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
const meuSelect = document.querySelector('#meu-select');

meuSelect.addEventListener('change', (event) => {
  console.log('Novo valor selecionado:', event.target.value);
});
</script>
</pre>
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
                  <i class="wf wf-check Taler f20"></i> Transforma selects nativos
                  em componentes modernos e pesquisáveis.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Campo de busca opcional
                  para filtrar listas longas.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Placeholders customizáveis
                  para o select e para a busca.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Totalmente acessível e
                  navegável via teclado.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Respeita o estado
                  <code>disabled</code> do select original.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Dispara eventos
                  <code>change</code> nativos, garantindo compatibilidade.
                </li>
                <li>
                  <i class="wf wf-check Taler f20"></i> Integrado com o sistema de
                  temas WfDay.
                </li>
              </ul>
            </div>
          </div>
        </div>
    </section>
</section>