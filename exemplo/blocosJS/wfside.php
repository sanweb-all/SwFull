<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfSide</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfSide</li>
        </ol>
      </nav>
    </div>
    <section class="wfsidex">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Menu Lateral Sempre Visível]</h3>
            <p>
              O <b>WfSide</b> é o sistema oficial de menu lateral do WEBFULL Framework.
              Um sidebar sempre visível que mostra apenas ícones (6rem) e expande suavemente para 22rem
              ao passar o mouse, oferecendo navegação intuitiva e moderna.
            </p>

            <div style="background: var(--wf-bg-); border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color);">
              <b><i class="wf wf-fast-forward-circle Taler f20"></i> IMPORTANTE:</b>
              Este é o sistema de sidebar OFICIAL do WEBFULL!<br />
              <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use sidebars de terceiros desnecessários<br />
              <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use WfSide para consistência e performance
            </div>

            <div style="background: var(--wf-bg-); border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color);">
              <b><i class="wf wf-eye Taler f20"></i> SEMPRE VISÍVEL:</b> Sidebar fixo mostrando ícones (6rem)<br />
              <b><i class="wf wf-expand Taler f20"></i> EXPANSÃO SUAVE:</b> Desliza para 22rem ao passar o mouse<br />
              <b><i class="wf wf-airplay Taler f20"></i> RESPONSIVO:</b> Em mobile não expande (mantém 6rem)<br />
              <b><i class="wf wf-zap Taler f20"></i> ANIMAÇÃO:</b> Transição cubic-bezier profissional (0.35s)<br />
              <b><i class="wf wf-palette Taler f20"></i> TEMAS:</b> Suporte automático ao WfDay (light/dark)
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Uso Básico</h3>
            <p>Simplesmente adicione o atributo <code>WfSide</code> em um elemento:</p>

            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- O Sidebar -->
<div id="meu-menu"
     WfSide
     WfSide-title="Admin"
     WfSide-subtitle="Sistema"
     WfSide-icon="wf-book-content"
     WfSide-position="left">
  <ul class="side-links">
    <h4><div class="menu-separator"></div></h4>
    <li><a href="/"><i class="wf wf-home-alt-2"></i>Principal</a></li>
    <li><a href="/users"><i class="wf wf-user-circle"></i>Usuários</a></li>
    <li><a href="/content"><i class="wf wf-detail"></i>Conteúdos</a></li>
    <h4><div class="menu-separator"></div></h4>
    <li><a href="/logout"><i class="wf wf-exit"></i>Sair</a></li>
  </ul>
</div>
</script></pre>

            <p><b>Nota:</b> O sidebar aparece automaticamente, sempre visível na lateral!</p>
          </div>

          <div class="co6-g">
            <h3 class="wfpage">Como Funciona</h3>
            <div class="card e3">
              <h4 class="e2"><i class="wf wf-info-circle Tprin"></i> Comportamento</h4>
              <ul class="e2">
                <li><b>Estado Colapsado:</b> 6rem de largura, mostra apenas ícones</li>
                <li><b>Ao Passar o Mouse:</b> Expande suavemente para 22rem</li>
                <li><b>Ao Sair o Mouse:</b> Retorna suavemente para 6rem</li>
                <li><b>Transição:</b> 0.35s com cubic-bezier profissional</li>
                <li><b>Ícones:</b> Escala de 1.0 → 1.1 ao hover</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Atributos de Configuração -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Atributos de Configuração</h3>
            <div class="card e3">
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
                    <td><code>WfSide-title</code></td>
                    <td>Título do sidebar</td>
                    <td>"Menu"</td>
                    <td><code>WfSide-title="Admin"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSide-subtitle</code></td>
                    <td>Subtítulo opcional</td>
                    <td>""</td>
                    <td><code>WfSide-subtitle="Sistema"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSide-icon</code></td>
                    <td>Classe do ícone do header (wf-*)</td>
                    <td>"wf-menu"</td>
                    <td><code>WfSide-icon="wf-book-content"</code></td>
                  </tr>
                  <tr>
                    <td><code>WfSide-position</code></td>
                    <td>Posição: "left" ou "right"</td>
                    <td>"left"</td>
                    <td><code>WfSide-position="right"</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        <!-- Exemplo Interativo -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Exemplo Interativo</h3>
            <div style="background: var(--wf-bg-); border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color);">
              <b><i class="wf wf-mouse-pointer Taler"></i> EXPERIMENTE:</b>
              Passe o mouse sobre o sidebar à direita para ver a animação de expansão!
            </div>
            <p>Este é um exemplo real do WfSide funcionando. Observe como ele expande suavemente de 6rem para 22rem ao passar o mouse.</p>
          </div>
        </div>

        <!-- Posições: Esquerda e Direita -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage">Sidebar Esquerdo</h3>
            <p>Menu lateral fixo à <b>esquerda</b> (padrão).</p>

            <pre WfCode WfCode-lang="html"><script type="text/plain">
<div id="menu-left"
     WfSide
     WfSide-title="Admin"
     WfSide-position="left">
  <ul class="side-links">
    <li><a href="/"><i class="wf wf-home-alt-2"></i>Home</a></li>
  </ul>
</div>
</script></pre>

            <p><i class="wf wf-info-circle Tprin"></i> Ideal para navegação principal do sistema</p>
          </div>

          <div class="co6-g">
            <h3 class="wfpage">Sidebar Direito</h3>
            <p>Menu lateral fixo à <b>direita</b>.</p>

            <pre WfCode WfCode-lang="html"><script type="text/plain">
<div id="menu-right"
     WfSide
     WfSide-title="Configurações"
     WfSide-position="right">
  <ul class="side-links">
    <li><a href="#"><i class="wf wf-palette"></i>Temas</a></li>
  </ul>
</div>
</script></pre>

            <p><i class="wf wf-info-circle Tprin"></i> Ideal para configurações e ações secundárias</p>
          </div>
        </div>

        <!-- Estrutura HTML dos Links -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Estrutura dos Links</h3>
            <p>Use a classe <code>side-links</code> para estilizar os links:</p>

            <pre WfCode WfCode-lang="html"><script type="text/plain">
<ul class="side-links">
  <!-- Separador com título -->
  <h4>DASHBOARD</h4>

  <!-- Link normal -->
  <li><a href="/"><i class="wf wf-home-alt-2"></i>Home</a></li>

  <!-- Link ativo -->
  <li><a href="/users" class="active"><i class="wf wf-user"></i>Usuários</a></li>

  <!-- Separador visual -->
  <h4><div class="menu-separator"></div></h4>

  <!-- Mais links -->
  <li><a href="/logout"><i class="wf wf-exit"></i>Sair</a></li>
</ul>
</script></pre>

            <div style="background: var(--wf-bg-); border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin-top: 15px; color: var(--wf-color);">
              <b><i class="wf wf-lightbulb Taler"></i> Dica:</b>
              Os ícones têm tamanho 3rem e escalam para 1.1 ao hover, criando um efeito visual agradável.
            </div>
          </div>
        </div>
        <br />
        <!-- Temas Dark/Light -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Integração com WfDay (Temas)</h3>
            <p>O WfSide se adapta automaticamente aos temas do WfDay:</p>

            <div class="card e3">
              <h4 class="e2"><i class="wf wf-sun Taler"></i> Modo Claro (wfday-day)</h4>
              <ul class="e2">
                <li><b>Background:</b> var(--prin--)</li>
                <li><b>Ícone Header:</b> var(--bran)</li>
                <li><b>Ícones Links:</b> var(--bran)</li>
                <li><b>Hover:</b> var(--azul4)</li>
              </ul>
            </div>

            <div class="card e3" style="margin-top: 15px;">
              <h4 class="e2"><i class="wf wf-moon Taler"></i> Modo Escuro (wfday-night)</h4>
              <ul class="e2">
                <li><b>Background:</b> var(--neut11)</li>
                <li><b>Texto:</b> var(--neut2)</li>
                <li><b>Ícone Header:</b> var(--prin)</li>
                <li><b>Ícones Links:</b> var(--neut4)</li>
                <li><b>Hover:</b> var(--azul4)</li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <!-- Responsividade -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Comportamento Responsivo</h3>
            <div class="card e3">
              <h4 class="e2"><i class="wf wf-desktop Tprin"></i> Desktop (> 768px)</h4>
              <ul class="e2">
                <li>Largura colapsada: <b>6rem</b></li>
                <li>Largura expandida ao hover: <b>22rem</b></li>
                <li>Transição suave de 0.35s</li>
              </ul>

              <h4 class="e2" style="margin-top: 20px;"><i class="wf wf-mobile-alt Tsecu"></i> Mobile (≤ 768px)</h4>
              <ul class="e2">
                <li>Largura fixa: <b>6rem</b></li>
                <li>Não expande ao hover (usabilidade mobile)</li>
                <li>Apenas ícones visíveis</li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <!-- Dicas e Boas Práticas -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Dicas e Boas Práticas</h3>
            <div class="card e3">
              <ul class="e2">
                <li><b>Ícones:</b> Use sempre ícones WebFont (wf-*) para consistência visual.</li>
                <li><b>Texto:</b> Mantenha os textos dos links curtos e objetivos.</li>
                <li><b>Hierarquia:</b> Use separadores (h4) para agrupar itens relacionados.</li>
                <li><b>Links Ativos:</b> Adicione a classe <code>active</code> no link da página atual.</li>
                <li><b>Layout:</b> Ajuste o margin-left do conteúdo principal para 6rem.</li>
                <li><b>Performance:</b> Usa will-change: width para otimização de GPU.</li>
                <li><b>Z-index:</b> O sidebar tem z-index: 200 para ficar acima de outros elementos.</li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <!-- Exemplo Completo -->
        <div class="l">
          <div class="co12-g">
            <h3 class="wfpage">Exemplo Completo de Sistema Admin</h3>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!DOCTYPE html>
<html class="wfday-day">
<head>
  <link rel="stylesheet" href="assets/components/webfull.min.css">
</head>
<body>
  <!-- Sidebar -->
  <div id="admin-menu"
       WfSide
       WfSide-title="Admin"
       WfSide-subtitle="Painel"
       WfSide-icon="wf-shield-alt"
       WfSide-position="left">
    <ul class="side-links">
      <h4>DASHBOARD</h4>
      <li><a href="/" class="active"><i class="wf wf-home-alt-2"></i>Principal</a></li>
      <li><a href="/analytics"><i class="wf wf-chart-line"></i>Análises</a></li>

      <h4>GERENCIAR</h4>
      <li><a href="/users"><i class="wf wf-users"></i>Usuários</a></li>
      <li><a href="/products"><i class="wf wf-box"></i>Produtos</a></li>
      <li><a href="/orders"><i class="wf wf-shopping-cart"></i>Pedidos</a></li>

      <h4><div class="menu-separator"></div></h4>
      <li><a href="/settings"><i class="wf wf-cog"></i>Configurações</a></li>
      <li><a href="/logout"><i class="wf wf-sign-out-alt"></i>Sair</a></li>
    </ul>
  </div>

  <!-- Conteúdo Principal -->
  <div class="content" style="margin-left: 6rem;">
    <h1>Dashboard</h1>
    <p>Seu conteúdo aqui...</p>
  </div>

  <script type="module" src="assets/components/webfull.js"></script>
</body>
</html>
</script></pre>
          </div>
        </div>

        <!-- Compatibilidade -->
        <div class="l">
          <div class="co6-g">
            <h3 class="wfpage ee2">Compatibilidade</h3>
            <div class="card e3">
              <ul class="e2">
                <li><i class="wf wf-check Tsuce"></i> Chrome/Edge (últimas 2 versões)</li>
                <li><i class="wf wf-check Tsuce"></i> Firefox (últimas 2 versões)</li>
                <li><i class="wf wf-check Tsuce"></i> Safari (últimas 2 versões)</li>
                <li><i class="wf wf-check Tsuce"></i> Opera (últimas 2 versões)</li>
              </ul>
            </div>
          </div>

          <div class="co6-g">
            <h3 class="wfpage ee2">Performance</h3>
            <div class="card e3">
              <ul class="e2">
                <li><i class="wf wf-check Taler"></i> Transição GPU-accelerated</li>
                <li><i class="wf wf-check Taler"></i> will-change otimizado</li>
                <li><i class="wf wf-check Taler"></i> CSS puro (sem JavaScript)</li>
                <li><i class="wf wf-check Taler"></i> Box-shadow otimizada</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- WfSide Demo Interativo -->
    <div id="demo-wfside-right"
      WfSide
      WfSide-title="Configurações"
      WfSide-subtitle="Demo"
      WfSide-icon="wf-palette"
      WfSide-position="right">
      <ul class="side-links">
        <h4>
          <div class="menu-separator"></div>
        </h4>
        <li><a href="#" onclick="return false;"><i class="wf wf-palette"></i>Temas</a></li>
        <li><a href="#" onclick="return false;"><i class="wf wf-moon"></i>Modo Escuro</a></li>
        <li><a href="#" onclick="return false;"><i class="wf wf-bell"></i>Notificações</a></li>
        <h4>
          <div class="menu-separator"></div>
        </h4>
        <li><a href="#" onclick="return false;"><i class="wf wf-user-circle"></i>Perfil</a></li>
        <li><a href="#" onclick="return false;"><i class="wf wf-lock-alt"></i>Segurança</a></li>
        <h4>
          <div class="menu-separator"></div>
        </h4>
        <li><a href="#" onclick="return false;"><i class="wf wf-cog"></i>Configurações</a></li>
      </ul>
    </div>

</section>