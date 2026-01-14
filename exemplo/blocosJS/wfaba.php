<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfAba</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfAba</li>
        </ol>
      </nav>
    </div>
    <div class="l">
      <div class="co12-g">
        <h3>Abas/Tabs</h3>
        <p>
          O <b>WfAba</b> é um componente de abas (tabs) totalmente acessível e responsivo. Suporta múltiplas posições (top, bottom, left, right), animações
          suaves, navegação por teclado e integração completa com o sistema de temas SwDay.
        </p>
      </div>
    </div>
    <div class="l">
      <div class="co6-g">
        <h3>Uso Básico</h3>
        <p>Para criar abas, use o atributo <code>WfAba</code> no container principal:</p>
        <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAba>
  <div class="wfaba-tabs">
    <button class="wfaba-tab" WfAba-tab="tab1">Aba 1</button>
    <button class="wfaba-tab" WfAba-tab="tab2">Aba 2</button>
    <button class="wfaba-tab" WfAba-tab="tab3">Aba 3</button>
  </div>
  <div class="wfaba-panels">
    <div id="tab1" class="wfaba-panel">
      <h3>Conteúdo da Aba 1</h3>
      <p>Este é o conteúdo da primeira aba.</p>
    </div>
    <div id="tab2" class="wfaba-panel">
      <h3>Conteúdo da Aba 2</h3>
      <p>Este é o conteúdo da segunda aba.</p>
    </div>
    <div id="tab3" class="wfaba-panel">
      <h3>Conteúdo da Aba 3</h3>
      <p>Este é o conteúdo da terceira aba.</p>
    </div>
  </div>
</div>
</script>
</pre>
      </div>
      <div class="co6-g">
        <h3>Exemplo Funcionando</h3>
        <div WfAba style="height: 300px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="exemplo1-tab1">Aba 1</button>
            <button class="wfaba-tab" WfAba-tab="exemplo1-tab2">Aba 2</button>
            <button class="wfaba-tab" WfAba-tab="exemplo1-tab3">Aba 3</button>
          </div>
          <div class="wfaba-panels">
            <div id="exemplo1-tab1" class="wfaba-panel aniline-d">
              <h3>Conteúdo da Aba 1</h3>
              <p>Este é o conteúdo da primeira aba. Você pode navegar entre as abas clicando nelas ou usando as setas do teclado.</p>
              <button class="btn btn-primary">Botão de Exemplo</button>
            </div>
            <div id="exemplo1-tab2" class="wfaba-panel aniline-d">
              <h3>Conteúdo da Aba 2</h3>
              <p>Este é o conteúdo da segunda aba. O wfAba suporta qualquer tipo de conteúdo HTML.</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </div>
            <div id="exemplo1-tab3" class="wfaba-panel aniline-d">
              <h3>Conteúdo da Aba 3</h3>
              <p>Este é o conteúdo da terceira aba. Inclui um formulário de exemplo:</p>
              <form>
                <input type="text" placeholder="Digite algo..." style="width: 100%; padding: 8px; margin: 5px 0" />
                <button type="submit" class="btn btn-success">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Posições das Abas -->
    <div class="l">
      <div class="co12-g">
        <h3>Posições das Abas</h3>
        <p>
          O WfAba suporta 4 posições diferentes usando o atributo
          <code>WfAba-pos</code>:
        </p>
      </div>
    </div>

    <!-- Abas no Topo (padrão) -->
    <div class="l">
      <div class="co6-g">
        <h3>Topo (Padrão)</h3>
        <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAba WfAba-pos="top">
  <!-- Abas no topo -->
</div>
</script>
</pre>
        <br />
        <div WfAba WfAba-pos="top" style="height: 200px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="top-tab1">Home</button>
            <button class="wfaba-tab" WfAba-tab="top-tab2">Sobre</button>
            <button class="wfaba-tab" WfAba-tab="top-tab3">Contato</button>
          </div>
          <div class="wfaba-panels">
            <div id="top-tab1" class="wfaba-panel aniline-d">
              <h5>Página Inicial</h5>
              <p>Bem-vindo à nossa página inicial!</p>
            </div>
            <div id="top-tab2" class="wfaba-panel aniline-d">
              <h5>Sobre Nós</h5>
              <p>Conheça mais sobre nossa empresa.</p>
            </div>
            <div id="top-tab3" class="wfaba-panel aniline-d">
              <h5>Contato</h5>
              <p>Entre em contato conosco.</p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div class="co6-g">
        <h3>Fundo</h3>
        <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAba WfAba-pos="bottom">
  <!-- Abas no fundo -->
</div>
</script>
</pre>
        <br />
        <div WfAba WfAba-pos="bottom" style="height: 200px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="bottom-tab1">Tab 1</button>
            <button class="wfaba-tab" WfAba-tab="bottom-tab2">Tab 2</button>
            <button class="wfaba-tab" WfAba-tab="bottom-tab3">Tab 3</button>
          </div>
          <div class="wfaba-panels">
            <div id="bottom-tab1" class="wfaba-panel aniline-d">
              <h5>Conteúdo 1</h5>
              <p>Abas posicionadas na parte inferior.</p>
            </div>
            <div id="bottom-tab2" class="wfaba-panel aniline-d">
              <h5>Conteúdo 2</h5>
              <p>Layout invertido com abas embaixo.</p>
            </div>
            <div id="bottom-tab3" class="wfaba-panel aniline-d">
              <h5>Conteúdo 3</h5>
              <p>Útil para interfaces específicas.</p>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>

    <!-- Abas Laterais -->
    <div class="l">
      <div class="co6-g">
        <h3>Esquerda</h3>
        <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAba WfAba-pos="left">
  <!-- Abas à esquerda -->
</div>
</script>
</pre>
        <br />
        <div WfAba WfAba-pos="left" style="height: 250px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="left-tab1">Dashboard</button>
            <button class="wfaba-tab" WfAba-tab="left-tab2">Relatórios</button>
            <button class="wfaba-tab" WfAba-tab="left-tab3">Configurações</button>
          </div>
          <div class="wfaba-panels">
            <div id="left-tab1" class="wfaba-panel aniline-d">
              <h5>Dashboard</h5>
              <p>Visão geral do sistema com abas laterais.</p>
              <div style="background: #f0f0f0; padding: 10px; border-radius: 4px">
                <small>Área de conteúdo principal</small>
              </div>
            </div>
            <div id="left-tab2" class="wfaba-panel aniline-d">
              <h5>Relatórios</h5>
              <p>Seção de relatórios e análises.</p>
              <ul>
                <li>Relatório mensal</li>
                <li>Análise de vendas</li>
                <li>Métricas de usuário</li>
              </ul>
            </div>
            <div id="left-tab3" class="wfaba-panel aniline-d">
              <h5>Configurações</h5>
              <p>Painel de configurações do sistema.</p>
              <label><input type="checkbox" /> Notificações</label><br />
              <label><input type="checkbox" /> Modo escuro</label><br />
              <label><input type="checkbox" /> Auto-save</label>
            </div>
          </div>
        </div>
      </div>
      <div class="co6-g">
        <h3>Direita</h3>
        <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAba WfAba-pos="right">
  <!-- Abas à direita -->
</div>
</script>
</pre>
        <br />
        <div WfAba WfAba-pos="right" style="height: 250px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="right-tab1">Perfil</button>
            <button class="wfaba-tab" WfAba-tab="right-tab2">Mensagens</button>
            <button class="wfaba-tab" WfAba-tab="right-tab3">Ajuda</button>
          </div>
          <div class="wfaba-panels">
            <div id="right-tab1" class="wfaba-panel aniline-d">
              <h5>Perfil do Usuário</h5>
              <p>Informações do perfil com navegação lateral direita.</p>
              <div style="display: flex; align-items: center; gap: 10px">
                <div style="width: 40px; height: 40px; background: #007bff; border-radius: 50%"></div>
                <div>
                  <strong>João Silva</strong><br />
                  <small>Desenvolvedor</small>
                </div>
              </div>
            </div>
            <div id="right-tab2" class="wfaba-panel aniline-d">
              <h5>Mensagens</h5>
              <p>Centro de mensagens e notificações.</p>
              <div style="background: #e9ecef; padding: 8px; border-radius: 4px; margin: 5px 0">
                <strong>Nova mensagem</strong><br />
                <small>Você tem 3 mensagens não lidas</small>
              </div>
            </div>
            <div id="right-tab3" class="wfaba-panel aniline-d">
              <h5>Central de Ajuda</h5>
              <p>Documentação e suporte técnico.</p>
              <a href="#" style="display: block; margin: 5px 0">📖 Documentação</a>
              <a href="#" style="display: block; margin: 5px 0">💬 Suporte</a>
              <a href="#" style="display: block; margin: 5px 0">🎥 Tutoriais</a>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>

    <!-- Opções e Configurações -->
    <div class="l">
      <div class="co12-g">
        <h3>Opções e Configurações</h3>
      </div>
    </div>

    <div class="l">
      <div class="co6-g">
        <h3>Atributos HTML</h3>
        <table class="tabela">
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Valores</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>WfAba</code></td>
              <td>-</td>
              <td>Ativa o componente de abas</td>
            </tr>
            <tr>
              <td><code>WfAba-pos</code></td>
              <td>top, bottom, left, right</td>
              <td>Posição das abas (padrão: top)</td>
            </tr>
            <tr>
              <td><code>WfAba-tab</code></td>
              <td>ID do painel</td>
              <td>Liga a aba ao painel correspondente</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="co6-g">
        <h3>Classes CSS</h3>
        <table class="tabela">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Elemento</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.wfaba-tabs</code></td>
              <td>Container</td>
              <td>Container das abas</td>
            </tr>
            <tr>
              <td><code>.wfaba-tab</code></td>
              <td>Button</td>
              <td>Botão da aba individual</td>
            </tr>
            <tr>
              <td><code>.wfaba-panels</code></td>
              <td>Container</td>
              <td>Container dos painéis</td>
            </tr>
            <tr>
              <td><code>.wfaba-panel</code></td>
              <td>Div</td>
              <td>Painel de conteúdo</td>
            </tr>
            <tr>
              <td><code>.active</code></td>
              <td>Tab/Panel</td>
              <td>Estado ativo (automático)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Navegação por Teclado -->
    <div class="l">
      <div class="co6-g">
        <h3>Navegação por Teclado</h3>
        <p>O WfAba é totalmente acessível e suporta navegação por teclado:</p>
        <table class="tabela">
          <thead>
            <tr>
              <th>Tecla</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><kbd>→</kbd> <kbd>↓</kbd></td>
              <td>Próxima aba</td>
            </tr>
            <tr>
              <td><kbd>←</kbd> <kbd>↑</kbd></td>
              <td>Aba anterior</td>
            </tr>
            <tr>
              <td><kbd>Home</kbd></td>
              <td>Primeira aba</td>
            </tr>
            <tr>
              <td><kbd>End</kbd></td>
              <td>Última aba</td>
            </tr>
            <tr>
              <td><kbd>Enter</kbd> <kbd>Space</kbd></td>
              <td>Ativar aba</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="co6-g">
        <h3>Teste de Acessibilidade</h3>
        <p>Teste a navegação por teclado no exemplo abaixo:</p>
        <div WfAba style="height: 200px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="keyboard-tab1">Tab 1</button>
            <button class="wfaba-tab" WfAba-tab="keyboard-tab2">Tab 2</button>
            <button class="wfaba-tab" WfAba-tab="keyboard-tab3">Tab 3</button>
            <button class="wfaba-tab" WfAba-tab="keyboard-tab4">Tab 4</button>
          </div>
          <div class="wfaba-panels">
            <div id="keyboard-tab1" class="wfaba-panel aniline-d">
              <h5>Primeira Aba</h5>
              <p>Use as setas do teclado para navegar entre as abas.</p>
            </div>
            <div id="keyboard-tab2" class="wfaba-panel aniline-d">
              <h5>Segunda Aba</h5>
              <p>Pressione Tab para focar nas abas, depois use as setas.</p>
            </div>
            <div id="keyboard-tab3" class="wfaba-panel aniline-d">
              <h5>Terceira Aba</h5>
              <p>Home/End levam para primeira/última aba.</p>
            </div>
            <div id="keyboard-tab4" class="wfaba-panel aniline-d">
              <h5>Quarta Aba</h5>
              <p>Enter ou Space ativam a aba focada.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Métodos JavaScript -->
    <div class="l">
      <div class="co12-g">
        <h3>Métodos JavaScript</h3>
      </div>
    </div>

    <div class="l">
      <div class="co6-g">
        <h3>Inicialização Manual</h3>
        <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicializar uma instância específica
const container = document.querySelector('#minha-aba');
const wfaba = new wfAba(container, {
  transitionDuration: 300,
  transitionEasing: 'ease-out'
});

// Inicializar todas as abas na página
try {
  const app = (typeof getSwFull === 'function') ? getSwFull() : null;
  if (app && typeof app.initComponent === 'function') {
    app.initComponent('wfAba', document);
  } else if (window.wfAba && typeof wfAba.initAll === 'function') {
    // fallback
    wfAba.initAll();
  }
} catch (e) {}

// Inicializar abas em um container específico
try {
  const app = (typeof getSwFull === 'function') ? getSwFull() : null;
  const container = document.querySelector('#container');
  if (app && typeof app.initComponent === 'function') {
    app.initComponent('wfAba', container);
  } else if (window.wfAba && typeof wfAba.initAll === 'function') {
    // fallback
    wfAba.initAll(container);
  }
} catch (e) {}
        </script></pre>
      </div>
      <div class="co6-g">
        <h3>Métodos de Instância</h3>
        <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obter aba ativa
const activeTab = wfaba.getActiveTab();

// Ativar uma aba específica
const tab = document.querySelector('[wfAba-tab="tab2"]');
wfaba.activateTab(tab);

// Destruir instância
wfaba.destroy();
        </script></pre>
      </div>
    </div>

    <!-- Eventos -->
    <div class="l">
      <div class="co6-g">
        <h3>Eventos Disponíveis</h3>
        <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Evento de inicialização
container.addEventListener('wfaba:initialized', (e) => {
  console.log('wfAba inicializado:', e.detail);
});

// Evento de mudança de tema (SwDay)
document.addEventListener('swday:theme-changed', (e) => {
  console.log('Tema alterado:', e.detail.isDay);
});
        </script></pre>
      </div>
      <div class="co6-g">
        <h3>Exemplo com Eventos</h3>
        <div WfAba id="evento-exemplo" style="height: 180px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="evento-tab1">Evento 1</button>
            <button class="wfaba-tab" WfAba-tab="evento-tab2">Evento 2</button>
            <button class="wfaba-tab" WfAba-tab="evento-tab3">Evento 3</button>
          </div>
          <div class="wfaba-panels">
            <div id="evento-tab1" class="wfaba-panel aniline-d">
              <h5>Eventos em Ação</h5>
              <p>Abra o console para ver os eventos sendo disparados.</p>
            </div>
            <div id="evento-tab2" class="wfaba-panel aniline-d">
              <h5>Monitoramento</h5>
              <p>Cada clique dispara eventos personalizados.</p>
            </div>
            <div id="evento-tab3" class="wfaba-panel aniline-d">
              <h5>Debug</h5>
              <p>Use F12 para acompanhar os eventos no console.</p>
            </div>
          </div>
        </div>
        <script>
          // Exemplo de monitoramento de eventos
          WebFull.container(() => {
            const eventoExemplo = document.querySelector('#evento-exemplo');
            if (eventoExemplo && !eventoExemplo._eventosAdicionados) {
              eventoExemplo._eventosAdicionados = true;

              eventoExemplo.addEventListener('wfaba:initialized', e => {
                console.log('🎉 wfAba inicializado:', e.detail);
              });

              // Monitorar cliques nas abas
              eventoExemplo.querySelectorAll('.wfaba-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                  console.log('<i class="sw sw-mouse wdest2-color f20"></i> Aba clicada:', tab.textContent);
                });
              });
            }
          });
        </script>
      </div>
    </div>

    <!-- Integração com AJAX -->
    <div class="l">
      <div class="co12-g">
        <h3>Integração com AJAX</h3>
        <p>O wfAba funciona perfeitamente com o sistema AJAX do WEBFULL, sendo reinicializado automaticamente em conteúdo carregado dinamicamente.</p>
      </div>
    </div>

    <div class="l">
      <div class="co6-g">
        <h3>Abas Aninhadas</h3>
        <p>Exemplo de abas dentro de conteúdo carregado via AJAX:</p>
        <div WfAba style="height: 300px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="ajax-tab1">Conteúdo Estático</button>
            <button class="wfaba-tab" WfAba-tab="ajax-tab2">Conteúdo AJAX</button>
          </div>
          <div class="wfaba-panels">
            <div id="ajax-tab1" class="wfaba-panel">
              <h5>Conteúdo Estático</h5>
              <p>Esta aba contém conteúdo estático normal.</p>
              <div WfAba WfAba-pos="bottom" style="height: 150px; border: 1px solid #eee">
                <div class="wfaba-tabs">
                  <button class="wfaba-tab" WfAba-tab="nested-1">Sub 1</button>
                  <button class="wfaba-tab" WfAba-tab="nested-2">Sub 2</button>
                </div>
                <div class="wfaba-panels">
                  <div id="nested-1" class="wfaba-panel">
                    <p>Aba aninhada 1 - funciona perfeitamente!</p>
                  </div>
                  <div id="nested-2" class="wfaba-panel">
                    <p>Aba aninhada 2 - sem conflitos!</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="ajax-tab2" class="wfaba-panel">
              <h5>Simulação de Conteúdo AJAX</h5>
              <p>Este conteúdo simula o que seria carregado via AJAX:</p>
              <div id="ajax-content-demo" style="padding: 15px; background: #f8f9fa; border-radius: 4px">
                <p>Carregando conteúdo...</p>
              </div>
              <button onclick="simularAjax()" class="btn btn-primary" style="margin-top: 10px">Simular Carregamento AJAX</button>
            </div>
          </div>
        </div>
      </div>
      <div class="co6-g">
        <h3>Código de Integração</h3>
        <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// O wfAba é automaticamente reinicializado
// em conteúdo carregado via SwAjax
SwFull.container(() => {
  console.log('wfAba funcionando em AJAX!');

  // Código que executa em cada container AJAX
  const abas = document.querySelectorAll('[wfAba]');
  abas.forEach(aba => {
    aba.addEventListener('wfaba:initialized', () => {
      console.log('Nova aba inicializada via AJAX');
    });
  });
});

// Carregar conteúdo com abas via AJAX
SwAjax.load({
  url: 'pagina-com-abas.html',
  dest: 'container',
  effect: 'fade'
});
</script>
</pre>

        <h3>Tema Dinâmico</h3>
        <p>As abas se adaptam automaticamente ao tema SwDay:</p>
        <div style="padding: 10px; background: var(--bg-bl); border-radius: 4px; margin: 10px 0">
          <small><strong><i class="sw sw-bulb SWdestC- f16"></i> Dica:</strong> Use o botão de tema no canto superior direito para ver as abas se adaptarem automaticamente
            ao modo claro/escuro!</small>
        </div>
      </div>
    </div>

    <!-- Exemplos Avançados -->
    <div class="l">
      <div class="co12-g">
        <h3>Exemplos Avançados</h3>
      </div>
    </div>

    <div class="l">
      <div class="co6-g">
        <h3>Abas com Formulários</h3>
        <div WfAba style="height: 280px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="form-tab1">Login</button>
            <button class="wfaba-tab" WfAba-tab="form-tab2">Cadastro</button>
            <button class="wfaba-tab" WfAba-tab="form-tab3">Recuperar</button>
          </div>
          <div class="wfaba-panels">
            <div id="form-tab1" class="wfaba-panel aniline-d">
              <h5>Login</h5>
              <form>
                <input type="email" placeholder="Email" style="width: 100%; padding: 8px; margin: 5px 0" />
                <input type="password" placeholder="Senha" style="width: 100%; padding: 8px; margin: 5px 0" />
                <button type="submit" class="btn btn-primary">Entrar</button>
              </form>
            </div>
            <div id="form-tab2" class="wfaba-panel aniline-d">
              <h5>Cadastro</h5>
              <form>
                <input type="text" placeholder="Nome" style="width: 100%; padding: 8px; margin: 5px 0" />
                <input type="email" placeholder="Email" style="width: 100%; padding: 8px; margin: 5px 0" />
                <input type="password" placeholder="Senha" style="width: 100%; padding: 8px; margin: 5px 0" />
                <button type="submit" class="btn btn-success">Cadastrar</button>
              </form>
            </div>
            <div id="form-tab3" class="wfaba-panel aniline-d">
              <h5>Recuperar Senha</h5>
              <form>
                <input type="email" placeholder="Email para recuperação" style="width: 100%; padding: 8px; margin: 5px 0" />
                <button type="submit" class="btn btn-warning">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="co6-g">
        <h3>Abas com Conteúdo Dinâmico</h3>
        <div WfAba style="height: 280px;">
          <div class="wfaba-tabs">
            <button class="wfaba-tab" WfAba-tab="dynamic-tab1">Dashboard</button>
            <button class="wfaba-tab" WfAba-tab="dynamic-tab2">Gráficos</button>
            <button class="wfaba-tab" WfAba-tab="dynamic-tab3">Relatórios</button>
          </div>
          <div class="wfaba-panels">
            <div id="dynamic-tab1" class="wfaba-panel aniline-d">
              <h5>Dashboard</h5>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                <div style="background: #28a745; color: white; padding: 15px; border-radius: 4px; text-align: center">
                  <strong>150</strong><br /><small>Usuários</small>
                </div>
                <div style="background: #007bff; color: white; padding: 15px; border-radius: 4px; text-align: center">
                  <strong>89%</strong><br /><small>Performance</small>
                </div>
              </div>
            </div>
            <div id="dynamic-tab2" class="wfaba-panel aniline-d">
              <h5>Gráficos</h5>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; text-align: center">
                <div style="
                              height: 100px;
                              background: linear-gradient(45deg, #007bff, #28a745);
                              border-radius: 4px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              color: white;
                           ">
                  <i class="sw sw-bar-chart"></i> Gráfico Simulado
                </div>
              </div>
            </div>
            <div id="dynamic-tab3" class="wfaba-panel">
              <h5>Relatórios</h5>
              <ul style="list-style: none; padding: 0">
                <li style="padding: 8px; border-bottom: 1px solid #eee"><i class="sw sw-file-text wdest2-color f20"></i> Relatório Mensal</li>
                <li style="padding: 8px; border-bottom: 1px solid #eee"><i class="sw sw-trending-up wdest2-color f20"></i> Análise de Vendas</li>
                <li style="padding: 8px; border-bottom: 1px solid #eee"><i class="sw sw-users wdest2-color f20"></i> Métricas de Usuário</li>
                <li style="padding: 8px"><i class="sw sw-dollar-sign wdest2-color f20"></i> Relatório Financeiro</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumo e Conclusão -->
    <div class="l">
      <div class="co12-g">
        <h3>Resumo</h3>
        <div style="background: var(--bg-bl); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745">
          <h3 style="margin-top: 0"><i class="sw sw-check-circle"></i> Características do wfAba</h3>
          <ul>
            <li><strong><i class="sw sw-smartphone"></i> Responsivo:</strong> Funciona perfeitamente em dispositivos móveis e desktop</li>
            <li><strong><i class="sw sw-palette"></i> Múltiplas Posições:</strong> Top, bottom, left, right com layouts automáticos</li>
            <li><strong><i class="sw sw-moon"></i> Tema Dinâmico:</strong> Integração completa com SwDay (modo claro/escuro)</li>
            <li><strong><i class="sw sw-zap"></i> Transições Suaves:</strong> Animações CSS3 otimizadas</li>
            <li><strong><i class="sw sw-refresh"></i> AJAX Ready:</strong> Funciona com SwAjax.initAll(container)</li>
            <li><strong><i class="sw sw-wrench"></i> Personalizável:</strong> CSS e JavaScript totalmente customizáveis</li>
          </ul>
        </div>
      </div>
    </div>

    <script>
      // Função para simular carregamento AJAX
      function simularAjax() {
        const container = document.getElementById('ajax-content-demo');
        container.innerHTML = '<p>⏳ Carregando...</p>';

        setTimeout(() => {
          container.innerHTML = `
            <div WfAba WfAba-pos="top" style="height: 120px; border: 1px solid #ddd;">
              <div class="wfaba-tabs">
                <button class="wfaba-tab" WfAba-tab="ajax-loaded-1">Dados</button>
                <button class="wfaba-tab" WfAba-tab="ajax-loaded-2">Config</button>
              </div>
              <div class="wfaba-panels">
                <div id="ajax-loaded-1" class="wfaba-panel">
                  <p><i class="sw sw-check-circle wdest2-color f20"></i> Conteúdo carregado via AJAX com abas funcionando!</p>
                </div>
                <div id="ajax-loaded-2" class="wfaba-panel">
                  <p><i class="sw sw-wrench"></i> Configurações carregadas dinamicamente.</p>
                </div>
              </div>
            </div>
          `;

          // Reinicializar wfAba no novo conteúdo
          try {
            const app = typeof getSwFull === 'function' ? getSwFull() : null;
            if (app && typeof app.initComponent === 'function') {
              app.initComponent('wfAba', container);
            } else if (window.wfAba && typeof wfAba.initAll === 'function') {
              wfAba.initAll(container);
            }
          } catch (e) {}
        }, 1000);
      }
    </script>
  </div>
</section>