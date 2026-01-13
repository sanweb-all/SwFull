<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfSidebar</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfSidebar</li>
        </ol>
      </nav>
    </div>
    <section class="swsidebarx">
      <div class="g-xg">
        <!-- Cabecalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Menu Lateral Inteligente]</h3>
            <p>
              O <b>WfSidebar</b> é o sistema oficial de menus laterais
              do WEBFULL Framework. Oferece navegação lateral responsiva com
              múltiplos temas, animações suaves e integração total com o sistema
              de temas.
            </p>
            <div
              style="
              background: var(--bg-bl);
              border: 1px solid #ff9800;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-sidebar wdest1-color f16"></i> MENU
                LATERAL:</b>
              Navegação lateral responsiva e elegante<br />
              <b><i class="wf wf-palette wdest1-color f16"></i> MÚLTIPLOS
                TEMAS:</b>
              Day, Night e Auto com WfDay<br />
              <b><i class="wf wf-zap wdest1-color f16"></i> ANIMAÇÕES:</b>
              Transições suaves e responsivas
            </div>
            <div
              style="
              background: var(--bl);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--color);
            ">
              <b>Responsivo:</b> Desktop sempre visivel, mobile com
              toggle<br />
              <b>Acordeao:</b> Submenus expansaveis com animacoes
              suaves<br />
              <b>Tema integrado:</b> Cores automaticas para WfDay
              (dia/noite)<br />
              <b>AJAX compativel:</b> Funciona perfeitamente com
              conteudo dinamico<br />
              <b>Configuravel:</b> Multiplas opcoes via atributos
              HTML<br />
              <b>Lados flexiveis:</b> Escolha entre left ou right
            </div>
          </div>
        </div>

        <!-- Demonstração Interativa -->
        <div class="l">
          <div class="co6-g">
            <h3>Demonstracao</h3>
            <div
              id="sidebar-demo"
              WfSidebar
              WfSidebar-side="left"
              WfSidebar-close-on-outside="true"
              WfSidebar-close-on-click="true">
              <div class="sidebar-header">
                <h1>Sidebar</h1>
                <small>Exemplo</small>
              </div>
              <nav>
                <div class="menu-item">
                  <div class="menu-simple">
                    <i class="wf wf-home"></i>
                    <span>Início</span>
                  </div>
                </div>
                <div class="menu-item">
                  <div class="menu-header">
                    <i class="wf wf-folder"></i>
                    <span>Documentação</span>
                    <i class="wf wf-chevron-down arrow"></i>
                  </div>
                  <ul class="submenu">
                    <li><a href="#" noLink>Componentes</a></li>
                    <li><a href="#" noLink>Utilitários</a></li>
                    <li><a href="#" noLink>Exemplos</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div class="co6-g">
            <h4>Teste a Sidebar</h4>
            <div
              style="
              background: var(--bl);
              border: 1px solid #4caf50;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--color);
            ">
              <b>Funcionalidades Testáveis:</b><br />
              • Redimensione a janela para testar responsividade<br />
              • Clique nos menus para testar acordeão<br />
              • No mobile, use o botão ☰ para abrir/fechar<br />
              • Mude o tema (WfDay) para ver cores automáticas
            </div>
            <div
              style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin: 15px 0;
            ">
              <button
                onclick="WfSidebar.open('#sidebar-demo')"
                class="btn btn-prin">
                Abrir (forçar)
              </button>
              <button
                onclick="WfSidebar.close('#sidebar-demo')"
                class="btn btn-info">
                Fechar (forçar)
              </button>
            </div>
            <button
              onclick="(function(){const el=document.querySelector('#sidebar-demo'); if(el&&el._wfSidebar) el._wfSidebar.closeAllSubmenus();})()"
              class="btn btn-suce"
              style="width: 100%; margin: 8px 0">
              Fechar Submenus
            </button>
            <button
              onclick="(function(){const el=document.querySelector('#sidebar-demo'); if(!el) return; const cur=el.getAttribute('WfSidebar-side')||'left'; const nxt=cur==='left'?'right':'left'; el.setAttribute('WfSidebar-side',nxt); if(el._wfSidebar){ el._wfSidebar.side=nxt; el._wfSidebar.close(); }})()"
              class="btn btn-aler"
              style="width: 100%; margin: 8px 0">
              Alternar Lado
            </button>
            <button
              onclick="(function(){ try{ if(window.WfDay) WfDay.toggle(); }catch(_){ document.documentElement.classList.toggle('wfday-night'); } })()"
              class="btn btn-clar"
              style="width: 100%; margin: 8px 0">
              Alternar Tema
            </button>
          </div>
        </div>

        <!-- Configuracoes -->
        <div class="l">
          <div class="co12-g">
            <h3>Configuracoes</h3>
            <p>O WfSidebar aceita varios atributos para personalizacao:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Atributos Disponiveis</h4>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Padrao</th>
                  <th>Descricao</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>WfSidebar-breakpoint</code></td>
                  <td><code>790px</code></td>
                  <td>Breakpoint para responsividade</td>
                </tr>
                <tr>
                  <td><code>WfSidebar-close-on-outside</code></td>
                  <td><code>true</code></td>
                  <td>Fechar ao clicar fora (mobile)</td>
                </tr>
                <tr>
                  <td><code>WfSidebar-close-on-click</code></td>
                  <td><code>true</code></td>
                  <td>Fechar ao clicar em links (mobile)</td>
                </tr>
                <tr>
                  <td><code>WfSidebar-auto-close</code></td>
                  <td><code>true</code></td>
                  <td>Fechar automaticamente apos navegacao</td>
                </tr>
                <tr>
                  <td><code>WfSidebar-side</code></td>
                  <td><code>left</code></td>
                  <td>Lado da sidebar (left ou right)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h4>Exemplo de Configuracao</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar
     WfSidebar-breakpoint="790px"
     WfSidebar-close-on-outside="true"
     WfSidebar-close-on-click="true"
     WfSidebar-auto-close="true"
     WfSidebar-side="left">
   <!-- Conteudo da sidebar -->
</div>
</script>
</pre>
            <div
              style="
              background: var(--bl);
              border: 1px solid #ff9800;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--color);
            ">
              <b>?? Dica:</b> Todas as classes CSS s�o prefixadas com
              <code>[WfSidebar]</code> para evitar conflitos com outros estilos.
            </div>
          </div>
        </div>

        <!-- Classes CSS -->
        <div class="l">
          <div class="co12-g">
            <h3>Classes CSS</h3>
            <p>O WfSidebar usa classes CSS especificas para estilizacao:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Estrutura Principal</h4>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Uso</th>
                  <th>Exemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.sidebar-header</code></td>
                  <td>Cabecalho da sidebar</td>
                  <td><code>&lt;div class="sidebar-header"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>nav</code></td>
                  <td>Container da navegacao</td>
                  <td><code>&lt;nav&gt;</code></td>
                </tr>
                <tr>
                  <td><code>.menu-item</code></td>
                  <td>Item do menu</td>
                  <td><code>&lt;div class="menu-item"&gt;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h4>Tipos de Menu</h4>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Uso</th>
                  <th>Exemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>.menu-simple</code></td>
                  <td>Menu sem submenu</td>
                  <td><code>&lt;div class="menu-simple"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>.menu-header</code></td>
                  <td>Cabecalho de menu com submenu</td>
                  <td><code>&lt;div class="menu-header"&gt;</code></td>
                </tr>
                <tr>
                  <td><code>.submenu</code></td>
                  <td>Lista de submenu</td>
                  <td><code>&lt;ul class="submenu"&gt;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- API JavaScript -->
        <div class="l">
          <div class="co12-g">
            <h3>API JavaScript</h3>
            <p>
              O WfSidebar oferece uma API completa para controle programatico:
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Metodos Estaticos</h4>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Inicializar todos os WfSidebar na pagina
const instances = WfSidebar.initAll();

// Inicializar em um container especifico
const instances = WfSidebar.initAll(document.querySelector('.container'));

// Carregamento externo
WfSidebar.load(url, targetId, effect);
</script>
</pre>
          </div>
          <div class="co6-g">
            <h4>Metodos de Instancia</h4>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Obter instancia
const sidebar = instances[0];

// Abrir sidebar (mobile)
sidebar.open();

// Fechar sidebar (mobile)
sidebar.close();

// Verificar se esta aberta
const isOpen = sidebar.isOpen();

// Fechar todos os submenus
sidebar.closeAllSubmenus();

// Verificar breakpoint
const breakpoint = sidebar.getBreakpointValue();
</script>
</pre>
          </div>
        </div>

        <!-- Eventos -->
        <div class="l">
          <div class="co12-g">
            <h3>Eventos</h3>
            <p>O WfSidebar dispara eventos personalizados para integracao:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Eventos da Sidebar</h4>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Eventos da Sidebar
const el = document.querySelector('#sidebar-demo');
el.addEventListener('wfsidebar:opened', (e) => {
  console.log('Sidebar aberta', e.detail);
});
el.addEventListener('wfsidebar:closed', (e) => {
  console.log('Sidebar fechada', e.detail);
});
</script>
</pre>
          </div>
          <div class="co6-g">
            <h4>Eventos do Submenu</h4>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Submenu aberto
element.addEventListener('wfsidebar:submenu:open', (e) => {
   console.log('Submenu aberto:', e.detail.submenu);
});

// Submenu fechado
element.addEventListener('wfsidebar:submenu:close', (e) => {
   console.log('Submenu fechado:', e.detail.submenu);
});
</script>
</pre>
          </div>
        </div>

        <!-- Exemplos Pr�ticos -->
        <div class="l">
          <div class="co12-g">
            <h3>Exemplos Praticos</h3>
            <p>Diferentes configuracoes e usos do WfSidebar:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Sidebar Simples</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar>
   <div class="sidebar-header">
      <h1>Minha App</h1>
   </div>
   <nav>
      <div class="menu-item">
         <div class="menu-simple">
            <i class="wf wf-home"></i>
            <span>Inicio</span>
         </div>
      </div>
   </nav>
</div>
</script>
</pre>
          </div>
          <div class="co6-g">
            <h4>Sidebar com Submenus</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar>
   <nav>
      <div class="menu-item">
         <div class="menu-header">
            <i class="wf wf-folder"></i>
            <span>Documentacao</span>
            <i class="wf wf-chevron-down arrow"></i>
         </div>
         <ul class="submenu">
            <li><a href="#">Componentes</a></li>
            <li><a href="#">Utilitarios</a></li>
         </ul>
      </div>
   </nav>
</div>
</script>
</pre>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Sidebar Left (Padrao)</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar WfSidebar-side="left">
   <nav>
      <div class="menu-item">
         <div class="menu-simple">
            <i class="wf wf-home"></i>
            <span>Inicio</span>
         </div>
      </div>
   </nav>
</div>
</script>
</pre>
          </div>
          <div class="co6-g">
            <h4>Sidebar Right</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar WfSidebar-side="right">
   <nav>
      <div class="menu-item">
         <div class="menu-simple">
            <i class="wf wf-cog"></i>
            <span>Configuracoes</span>
         </div>
      </div>
   </nav>
</div>
</script>
</pre>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h4>Sidebar com WfAjax</h4>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<div WfSidebar WfSidebar-side="left">
   <nav>
      <div class="menu-item">
         <div class="menu-simple"
              WfAjax
              WfAjax-url="./page/_home.php"
              WfAjax-dest="ContentAjax"
              WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i>
            <span>Página</span>
         </div>
      </div>
   </nav>
</div>
</script>
</pre>
          </div>
        </div>

        <!-- Melhores Praticas -->
        <div class="l">
          <div class="co12-g">
            <h3>Melhores Praticas</h3>
            <p>Guia para usar o WfSidebar de forma eficiente:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Faca</h4>
            <ul>
              <li>Use icones do Boxicons (classe <code>sw</code>)</li>
              <li>Configure breakpoint adequado ao seu design</li>
              <li>Teste em diferentes tamanhos de tela</li>
              <li>Use submenus para organizar conteudo</li>
              <li>Integre com WfAjax para navega��o fluida</li>
              <li>Mantenha estrutura HTML consistente</li>
            </ul>
          </div>
          <div class="co6-g">
            <h4>Evite</h4>
            <ul>
              <li>Muitos niveis de submenu (maximo 2)</li>
              <li>Textos muito longos nos menus</li>
              <li>Breakpoints muito baixos</li>
              <li>Desabilitar fechamento automatico</li>
              <li>Usar CSS customizado que conflite</li>
              <li>Estrutura HTML incorreta</li>
            </ul>
          </div>
        </div>

        <!-- Solucao de Problemas -->
        <div class="l">
          <div class="co12-g">
            <h3>Solucao de Problemas</h3>
            <p>Problemas comuns e suas solucoes:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Problemas Comuns</h4>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Problema</th>
                  <th>Causa</th>
                  <th>Solucao</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Submenu nao abre</td>
                  <td>Estrutura HTML incorreta</td>
                  <td>
                    Verifique se <code>.menu-header</code> est� dentro de
                    <code>.menu-item</code>
                  </td>
                </tr>
                <tr>
                  <td>Sidebar n�o fecha no mobile</td>
                  <td>CSS conflitante</td>
                  <td></td>
                  <td>
                    Verifique se nao ha CSS que force <code>display: block</code>
                  </td>
                </tr>
                <tr>
                  <td>Eventos nao funcionam apos AJAX</td>
                  <td>Re-inicializacao nao aconteceu</td>
                  <td>O WfAjax j� re-inicializa automaticamente</td>
                </tr>
                <tr>
                  <td>Cores nao mudam com WfDay</td>
                  <td>CSS customizado sobrescrevendo</td>
                  <td>Use as variaveis CSS do WfSidebar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="co6-g">
            <h4>Debug e Verificacao</h4>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Verificar se WfSidebar esta carregado
console.log('WfSidebar:', typeof WfSidebar);

// Verificar instancias ativas
const instances = WfSidebar.initAll();
console.log('Inst�ncias:', instances.length);

// Verificar estrutura HTML
const sidebar = document.querySelector('[WfSidebar]');
console.log('Sidebar encontrada:', !!sidebar);

// Verificar submenus
const submenus = document.querySelectorAll('.submenu');
console.log('Submenus encontrados:', submenus.length);
</script>
</pre>
          </div>
        </div>

        <!-- Performance -->
        <div class="l">
          <div class="co12-g">
            <h3>Performance</h3>
            <p>Otimizacoes e recomendacoes para melhor performance:</p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h4>Otimizacoes Automaticas</h4>
            <ul>
              <li>Event listeners otimizados</li>
              <li>CSS com seletores espec�ficos</li>
              <li>Anima��es com GPU acceleration</li>
              <li>Lazy loading de funcionalidades</li>
              <li>Re-inicializa��o inteligente</li>
              <li>Cache de elementos DOM</li>
            </ul>
          </div>
          <div class="co6-g">
            <h4>Recomendacoes</h4>
            <ul>
              <li>Use poucos submenus por sidebar</li>
              <li>Evite muitos elementos no menu</li>
              <li>Configure breakpoint adequado</li>
              <li>Teste em dispositivos reais</li>
              <li>Monitore performance em mobile</li>
              <li>Use icones vetoriais (Boxicons)</li>
            </ul>
          </div>
        </div>

        <!-- Conclusao -->
        <div class="l">
          <div class="co12-g">
            <h3>Conclusao</h3>
            <p>
              O <b>WfSidebar</b> e um componente robusto e flexivel que
              oferece uma solucao completa para navegacao lateral responsiva. Com
              sua integracao perfeita com WfDay e WfAjax, ele se torna uma
              ferramenta essencial para qualquer aplicacao WEBFULL.
            </p>
            <div
              style="
              background: var(--bl);
              border: 1px solid #4caf50;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--color);
            ">
              <b>?? Pronto para usar!</b> O WfSidebar est� 100%
              funcional e integrado ao sistema WEBFULL.
            </div>
          </div>
        </div>
      </div>
      <script>
        (function() {
          var el = document.getElementById("sidebar-demo");
          if (!el) return;
          try {
            if (window.WebfullLoader)
              WebfullLoader.load("sw-sidebar").then(function() {
                if (window.WfSidebar && typeof WfSidebar.initAll === "function")
                  WfSidebar.initAll(el);
              });
          } catch (_) {}
        })();
      </script>
    </section>
</section>