<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfNolink</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfNolink</li>
        </ol>
      </nav>
    </div>
    <section class="swnolinkx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Navegação Suave]</h3>
            <p>
              O <b>WfNolink</b> é um sistema de
              <b>navegação suave</b> que remove âncoras da URL e realiza
              scroll suave até elementos alvo. Usa
              <b>history.replaceState</b> para limpar a URL e
              <b>scrollTo</b> com behavior smooth para navegação
              elegante.
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #ff9800;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-rocket Taler f20"></i> NAVEGAÇÃO SUAVE:</b>
              Scroll suave sem âncoras na URL<br />
              <b><i class="wf wf-target-lock Taler f20"></i>
                POSICIONAMENTO:</b>
              8 posições automáticas inteligentes<br />
              <b><i class="wf wf-palette Taler f20"></i> TEMAS:</b>
              Integração total com WfDay
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para navegação suave sem âncoras, use o atributo
              <code>noLink</code>:
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Navegação básica -->
<a href="#secao1" noLink>
  Ir para Seção 1
</a>

<!-- Link para elemento específico -->
<a href="#sobre" noLink>
  Sobre Nós
</a>

<!-- Menu de navegação -->
<nav>
  <a href="#home" noLink>Home</a>
  <a href="#servicos" noLink>Serviços</a>
  <a href="#contato" noLink>Contato</a>
</nav>
<!-- Elementos alvo -->
<section id="home">
  <h2>Home</h2>
  <p>Conteúdo da home...</p>
</section>
<section id="servicos">
  <h2>Serviços</h2>
  <p>Nossos serviços...</p>
</section>
<section id="contato">
  <h2>Contato</h2>
  <p>Entre em contato...</p>
</section>
</script>
</pre>
          </div>
          <div class="co6-g">
            <h3>Como Funciona</h3>
            <p>O WfNolink processa links de navegação interna:</p>

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
                  <b>1. Clique Interceptado:</b> preventDefault()
                  bloqueia comportamento padrão
                </li>
                <li>
                  <b>2. URL Limpa:</b> history.replaceState() remove
                  âncora da URL
                </li>
                <li>
                  <b>3. Elemento Encontrado:</b> getElementById()
                  localiza o alvo
                </li>
                <li>
                  <b>4. Scroll Suave:</b> scrollTo() com behavior smooth
                </li>
                <li>
                  <b>5. Foco Definido:</b> focus() para acessibilidade
                </li>
                <li>
                  <b>6. Evento Disparado:</b> sw:nolink:scrolled
                  customizado
                </li>
              </ol>
            </div>

            <!-- Menu de Demonstração -->
            <div style="margin: 20px 0">
              <h3>📍 Navegação de Teste</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 15px">
                Clique nos links abaixo para testar a navegação suave:
              </p>

              <nav
                style="
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                padding: 15px;
                background: var(--wf-bg-);
                border-radius: 8px;
                border: 1px solid #ddd;
              ">
                <a
                  href="#demo-secao1"
                  noLink
                  style="
                  color: #2196f3;
                  text-decoration: none;
                  padding: 8px 16px;
                  border: 1px solid #2196f3;
                  border-radius: 4px;
                  transition: all 0.3s;
                "
                  onmouseover="this.style.background='#e3f2fd'"
                  onmouseout="this.style.background='transparent'">
                  📍 Seção 1
                </a>
                <a
                  href="#demo-secao2"
                  noLink
                  style="
                  color: #ff9800;
                  text-decoration: none;
                  padding: 8px 16px;
                  border: 1px solid #ff9800;
                  border-radius: 4px;
                  transition: all 0.3s;
                "
                  onmouseover="this.style.background='#fff3e0'"
                  onmouseout="this.style.background='transparent'">
                  📍 Seção 2
                </a>
                <a
                  href="#demo-secao3"
                  noLink
                  style="
                  color: #4caf50;
                  text-decoration: none;
                  padding: 8px 16px;
                  border: 1px solid #4caf50;
                  border-radius: 4px;
                  transition: all 0.3s;
                "
                  onmouseover="this.style.background='#e8f5e8'"
                  onmouseout="this.style.background='transparent'">
                  📍 Seção 3
                </a>
              </nav>
            </div>

            <!-- Seções de Demonstração -->
            <div style="margin: 40px 0">
              <div
                id="demo-secao1"
                style="
                padding: 30px;
                background: var(--wf-bg-);
                border: 2px solid #2196f3;
                border-radius: 12px;
                margin: 30px 0;
                text-align: center;
              ">
                <h3 style="color: #2196f3; margin-bottom: 15px">📍 Seção 1</h3>
                <p>
                  Esta é a primeira seção de demonstração. A navegação foi suave e
                  a URL não contém âncora!
                </p>
                <p style="font-size: 14px; color: #666">
                  Verifique a URL - não há #demo-secao1 visível
                </p>
              </div>

              <div
                id="demo-secao2"
                style="
                padding: 30px;
                background: var(--wf-bg-);
                border: 2px solid #ff9800;
                border-radius: 12px;
                margin: 30px 0;
                text-align: center;
              ">
                <h3 style="color: #ff9800; margin-bottom: 15px">📍 Seção 2</h3>
                <p>
                  Segunda seção com scroll suave e foco automático para
                  acessibilidade.
                </p>
                <p style="font-size: 14px; color: #666">
                  O elemento recebeu foco automaticamente (tabindex="-1")
                </p>
              </div>

              <div
                id="demo-secao3"
                style="
                padding: 30px;
                background: var(--wf-bg-);
                border: 2px solid #4caf50;
                border-radius: 12px;
                margin: 30px 0;
                text-align: center;
              ">
                <h3 style="color: #4caf50; margin-bottom: 15px">📍 Seção 3</h3>
                <p>
                  Terceira seção demonstrando o evento customizado
                  'sw:nolink:scrolled'.
                </p>
                <p style="font-size: 14px; color: #666">
                  Verifique o console para ver o evento disparado
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Configurações e API -->
        <div class="l">
          <div class="co6-g">
            <h3>Configurações</h3>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Configuração</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>offset</code></td>
                  <td>number | function</td>
                  <td>Offset em pixels do scroll final</td>
                </tr>
                <tr>
                  <td><code>behavior</code></td>
                  <td>smooth | auto</td>
                  <td>Comportamento do scroll (padrão: smooth)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h3>Métodos Estáticos</h3>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Parâmetros</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>initAll()</code></td>
                  <td>container, options</td>
                  <td>Inicializa todos elementos [noLink]</td>
                </tr>
                <tr>
                  <td><code>delegate()</code></td>
                  <td>container, options</td>
                  <td>Delega eventos (recomendado)</td>
                </tr>
                <tr>
                  <td><code>destroyAll()</code></td>
                  <td>-</td>
                  <td>Remove todos event listeners</td>
                </tr>
                <tr>
                  <td><code>ocultarAncora()</code></td>
                  <td>-</td>
                  <td>Remove âncora da URL atual</td>
                </tr>
              </tbody>
            </table>

            <div
              style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-bulb Taler f20"></i> Dica de Performance:</b><br />
              Use <code>WfNolink.delegate()</code> em vez de
              <code>initAll()</code>
              para melhor performance com muitos links.
            </div>
          </div>
        </div>

        <!-- Uso Programático -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Programático</h3>
            <p>API JavaScript do WfNolink:</p>
            <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização com delegação (recomendado)
WfNolink.delegate(document, {
  offset: 80,                    // Offset de 80px
  behavior: 'smooth'             // Scroll suave
});
// Inicialização direta
WfNolink.initAll(document, {
  offset: () => {                // Offset dinâmico
    const header = document.querySelector('header');
    return header ? header.offsetHeight : 0;
  }
});
// Navegação manual
WfNolink.handleClick(event, {
  offset: 100,
  behavior: 'auto'               // Scroll instantâneo
});
// Scroll direto para elemento
const elemento = document.getElementById('secao');
WfNolink.scrollToElement(elemento, {
  offset: 50,
  behavior: 'smooth'
});
// Limpar URL (remover âncora)
WfNolink.ocultarAncora();
// Limpar event listeners
WfNolink.destroyAll();
</script>
</pre>
          </div>
          <div class="co6-g">
            <h3>Casos de Uso Comuns</h3>
            <p>Situações típicas para usar WfNolink:</p>

            <div style="margin: 30px 0">
              <h3><i class="wf wf-file Taler f20"></i> Páginas Longas</h3>
              <p style="font-size: 14px; color: #666">
                Navegação suave em páginas com múltiplas seções, como landing
                pages ou documentação.
              </p>
            </div>

            <div style="margin: 30px 0">
              <h3><i class="wf wf-compass Taler f20"></i> Menus de Navegação</h3>
              <p style="font-size: 14px; color: #666">
                Menus que levam a seções da mesma página sem mostrar âncoras na
                URL.
              </p>
            </div>

            <div style="margin: 30px 0">
              <h3>
                <i class="wf wf-clipboard Taler f20"></i> Índices e Sumários
              </h3>
              <p style="font-size: 14px; color: #666">
                Links de índice que levam a seções específicas com scroll suave.
              </p>
            </div>

            <div style="margin: 30px 0">
              <h3><i class="wf wf-target-lock Taler f20"></i> Call-to-Actions</h3>
              <p style="font-size: 14px; color: #666">
                Botões que levam a formulários ou seções específicas da página.
              </p>
            </div>

            <div style="margin: 30px 0">
              <h3>
                <i class="wf wf-universal-access Taler f20"></i> Acessibilidade
              </h3>
              <p style="font-size: 14px; color: #666">
                Navegação que mantém o foco adequado para leitores de tela.
              </p>
            </div>

            <div style="margin: 30px 0">
              <h3><i class="wf wf-palette Taler f20"></i> UX Limpo</h3>
              <p style="font-size: 14px; color: #666">
                URLs limpas sem âncoras visíveis, mantendo uma experiência
                profissional.
              </p>
            </div>
          </div>
        </div>

        <!-- Resumo -->
        <div class="l">
          <div class="co12-g">
            <h3>Resumo</h3>
            <div
              style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2196f3;
            ">
              <h3 style="margin-top: 0">
                <i class="wf wf-check-circle Taler f20"></i> Características do
                WfNolink
              </h3>
              <ul>
                <li>
                  <b><i class="wf wf-rocket Taler f20"></i> Navegação
                    Suave:</b>
                  Scroll suave sem âncoras visíveis na URL
                </li>
                <li>
                  <b><i class="wf wf-link Taler f20"></i> URLs Limpas:</b>
                  Remove automaticamente # da URL usando history.replaceState
                </li>
                <li>
                  <b><i class="wf wf-universal-access Taler f20"></i>
                    Acessibilidade:</b>
                  Foco automático no elemento alvo para leitores de tela
                </li>
                <li>
                  <b><i class="wf wf-cog Taler f20"></i> Offset
                    Personalizado:</b>
                  Configuração de offset fixo ou dinâmico
                </li>
                <li>
                  <b><i class="wf wf-target-lock Taler f20"></i> Comportamento
                    Configurável:</b>
                  Scroll suave ou instantâneo conforme necessário
                </li>
                <li>
                  <b><i class="wf wf-wrench Taler f20"></i> Delegação de
                    Eventos:</b>
                  Performance otimizada com event delegation
                </li>
                <li>
                  <b><i class="wf wf-candles Taler f20"></i> Responsivo:</b>
                  Funciona perfeitamente em desktop e mobile
                </li>
                <li>
                  <b><i class="wf wf-party Taler f20"></i> Eventos
                    Customizados:</b>
                  Dispara sw:nolink:scrolled para integração
                </li>
              </ul>

              <div
                style="
                margin-top: 20px;
                padding: 15px;
                background: rgba(33, 150, 243, 0.1);
                border-radius: 8px;
              ">
                <b><i class="wf wf-target Taler f20"></i> Objetivo
                  Principal:</b>
                Proporcionar navegação interna elegante mantendo URLs limpas e
                oferecendo scroll suave com excelente acessibilidade.
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Event listener para demonstrar o evento customizado
        document.addEventListener("sw:nolink:scrolled", function(e) {
          console.log(
            "🎉 Evento sw:nolink:scrolled disparado para:",
            e.target.id
          );
        });
      </script>
    </section>
</section>