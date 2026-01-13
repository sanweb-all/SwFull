<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfPanel</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfPanel</li>
        </ol>
      </nav>
    </div>
<section class="wfpanelx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <h2>[Painéis Deslizantes]</h2>
               <div style="margin-top:8px">
                  <small><b>Observação:</b> O botão <code>×</code> no header é padrão. O título do header é preenchido automaticamente a partir do botão/link que abre o
                     painel (atributo <code>WfPanel-title</code> ou texto do botão).</small>
               </div>
               <p>
                  O <b>WfPanel</b> é um componente de painéis deslizantes para criação de sidebars, drawers e menus off-canvas. Oferece animações suaves, overlay
                  configurável, múltiplas direções (esquerda, direita, topo, bottom) e controle total via JavaScript. O WfPanel destina-se a conteúdo local (DIVs internas);
                  para painéis que carregam conteúdo via AJAX use o componente <code>WfPanel1</code>.
               </p>
               <div style="background: var(--wf-bg-); border: 1px solid #9c27b0; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-clipboard Taler f20"></i> PAINÉIS DESLIZANTES:</b> Sidebars e menus off-canvas elegantes<br />
                  <b><i class="wf wf-target-lock Taler f20"></i> MÚLTIPLAS DIREÇÕES:</b> Esquerda, direita, topo e bottom<br />
                  <b><i class="wf wfs-zap Taler f20"></i> OVERLAY:</b> Fundo escuro com fechamento automático<br />
                  <b><i class="wf wf-link Taler f20"></i> CONTEÚDO LOCAL:</b> Carrega conteúdo de DIVs internas da própria página
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co6-g">
               <h3>Uso Básico</h3>
               <p>
                  Use o atributo <code>WfPanel</code> no painel e
                  <code>WfPanel-target</code>
                  nos botões que abrem. O <code>WfPanel-size</code> aceita valores em pixels (px) ou porcentagem (%):
               </p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Exemplo mínimo -->
<div WfPanel WfPanel-side="left" WfPanel-size="300px" id="menuEsquerda"></div>

<button WfPanel-target="menuEsquerda" WfPanel-title="Menu Esquerda">Abrir Menu Esquerda</button>

<!-- Também funciona com links -->
<a href="#" WfPanel-target="menuEsquerda">Abrir Menu</a>
</script></pre>
            </div>
            <div class="co6-g">
               <h4>Exemplo Funcionando</h4>
               <p>Teste os painéis deslizantes em diferentes direções:</p>

               <!-- Botões de teste -->
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0">
                  <button WfPanel-target="demo-esquerda" class="btn btn-prin"><i class="wf wf-chevron-left"></i> Esquerda</button>
                  <button WfPanel-target="demo-direita" class="btn btn-suce"><i class="wf wf-chevron-right"></i> Direita</button>
                  <button WfPanel-target="demo-topo" class="btn btn-aler"><i class="wf wf-chevron-up"></i> Topo</button>
                  <button WfPanel-target="demo-bottom" class="btn btn-info"><i class="wf wf-chevron-down"></i> Bottom</button>
               </div>
               <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h3><i class="wf wf-pin Taler f20"></i> Como Funciona:</h3>
                  • <b>WfPanel-side:</b> "left", "right", "top", "bottom"<br />
                  • <b>WfModal-size:</b> "300px", "50%", "400px", etc<br />
                  • <b>Posicionamento:</b> <code>position: fixed</code> automático<br />
                  • <b>Animação:</b> <code>transform</code> suave<br />
                  • <b>Overlay:</b> Criado automaticamente (se habilitado)
               </div>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
/* Botão de Fechar o WfPanel */
<button onclick="document.getElementById('demo-esquerda')._wfPanel.close()">✕</button>
</script>
</pre>

               <!-- Painéis de demonstração -->
               <!-- Painel Esquerda -->
               <div WfPanel WfPanel-side="left" WfPanel-size="280px" id="demo-esquerda">
                  <div style="padding: 20px; box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); height: 100%">
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                        <h3><i class="wf wf-clipboard Taler f20"></i> Menu Esquerda (280px)</h3>
                        <button onclick="document.getElementById('demo-esquerda')._wfPanel.close()"
                           style="background: none; border: none; font-size: 20px; cursor: pointer">✕</button>
                     </div>
                     <ul style="list-style: none; padding: 0">
                        <li style="margin: 10px 0">
                           <a href="#" style="text-decoration: none; color: #333; padding: 8px; display: block; border-radius: 4px" onmouseover="this.style.background='#f0f0f0'"
                              onmouseout="this.style.background='transparent'">
                              🏠 Início
                           </a>
                        </li>
                        <li style="margin: 10px 0">
                           <a href="#" style="text-decoration: none; color: #333; padding: 8px; display: block; border-radius: 4px" onmouseover="this.style.background='#f0f0f0'"
                              onmouseout="this.style.background='transparent'">
                              <i class="wf wf-bar-chart-2 Taler f20"></i> Dashboard
                           </a>
                        </li>
                        <li style="margin: 10px 0">
                           <a href="#" style="text-decoration: none; color: #333; padding: 8px; display: block; border-radius: 4px" onmouseover="this.style.background='#f0f0f0'"
                              onmouseout="this.style.background='transparent'">
                              <i class="wf wf-cog Taler f20"></i> Configurações
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>

               <!-- Painel Direita -->
               <div WfPanel WfPanel-side="right" WfPanel-size="40%" id="demo-direita">
                  <div style="padding: 20px; box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); height: 100%">
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                        <h3><i class="wf wf-bell Taler f20"></i> Notificações (40%)</h3>
                        <button onclick="document.getElementById('demo-direita')._wfPanel.close()"
                           style="background: none; border: none; font-size: 20px; cursor: pointer">✕</button>
                     </div>
                     <div>
                        <div style="padding: 12px; background: #e3f2fd; border-radius: 6px; margin-bottom: 10px">
                           <b style="color: #1976d2">Nova mensagem</b>
                           <p style="margin: 5px 0 0 0; font-size: 14px; color: #666">João Silva enviou uma mensagem</p>
                        </div>
                        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px; margin-bottom: 10px">
                           <b style="color: #388e3c">Tarefa concluída</b>
                           <p style="margin: 5px 0 0 0; font-size: 14px; color: #666">Relatório mensal finalizado</p>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- Painel Topo -->
               <div WfPanel WfPanel-side="top" WfPanel-size="200px" id="demo-topo">
                  <div style="padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); height: 100%">
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px">
                        <h3><i class="wf wf-broadcast Taler f20"></i> Barra Superior (200px)</h3>
                        <button onclick="document.getElementById('demo-topo')._wfPanel.close()" style="background: none; border: none; font-size: 20px; cursor: pointer">✕</button>
                     </div>
                     <p style="color: #666; margin: 0">Painel superior ideal para alertas, barras de progresso ou informações importantes.</p>
                  </div>
               </div>

               <!-- Painel Bottom -->
               <div WfPanel WfPanel-side="bottom" WfPanel-size="180px" id="demo-bottom">
                  <div style="padding: 20px; box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); height: 100%">
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px">
                        <h3><i class="wf wf-cookie Taler f20"></i> Barra Inferior (180px)</h3>
                        <button onclick="document.getElementById('demo-bottom')._wfPanel.close()"
                           style="background: none; border: none; font-size: 20px; cursor: pointer">✕</button>
                     </div>
                     <p style="color: #666; margin: 0 0 10px 0">Painel inferior perfeito para avisos de cookies, termos de uso ou ações rápidas.</p>
                     <button class="btn btn-primary" style="margin-right: 10px">Aceitar</button>
                     <button class="btn btn-secondary">Rejeitar</button>
                  </div>
               </div>
            </div>
         </div>

         <!-- Tamanhos de Painel -->
         <div class="l">
            <div class="co12-g">
               <h3>Tamanhos de Painel</h3>
               <p>
                  O WfPanel suporta 5 tamanhos pré-definidos usando o atributo <code>WfPanel-size</code>:
                  <b>small (400px)</b>, <b>medium (600px)</b>, <b>large (800px)</b>, <b>xlarge (1000px)</b> e <b>full (100vw)</b>.
               </p>
               <div class="btns">
                  <button WfPanel-target="painel-small" WfPanel-title="Painel Small" class="btn btn-prin">Small (400px)</button>
                  <button WfPanel-target="painel-medium" WfPanel-title="Painel Medium" class="btn btn-suce">Medium (600px)</button>
                  <button WfPanel-target="painel-large" WfPanel-title="Painel Large" class="btn btn-aler">Large (800px)</button>
                  <button WfPanel-target="painel-xlarge" WfPanel-title="Painel XLarge" class="btn btn-info">XLarge (1000px)</button>
                  <button WfPanel-target="painel-full" WfPanel-title="Painel Full" class="btn btn-peri">Full (100vw)</button>
               </div>
               <p style="font-size: 14px; color: var(--neut11); margin-top: 10px">
                  <b>Nota:</b> Você também pode usar tamanhos customizados como <code>WfPanel-size="350px"</code> ou <code>WfPanel-size="45%"</code>.
               </p>
            </div>
         </div>

         <!-- Painéis de Tamanhos -->
         <div WfPanel WfPanel-side="right" WfPanel-size="400px" id="painel-small">
            <div style="padding: 20px; height: 100%">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                  <h3>Painel Small (400px)</h3>
                  <button onclick="document.getElementById('painel-small')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel tem largura de <b>400px</b>, ideal para menus laterais compactos ou informações rápidas.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="right" WfPanel-size="600px" id="painel-medium">
            <div style="padding: 20px; height: 100%">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                  <h3>Painel Medium (600px)</h3>
                  <button onclick="document.getElementById('painel-medium')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel tem largura de <b>600px</b>, perfeito para formulários ou listagens médias.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="right" WfPanel-size="800px" id="painel-large">
            <div style="padding: 20px; height: 100%">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                  <h3>Painel Large (800px)</h3>
                  <button onclick="document.getElementById('painel-large')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel tem largura de <b>800px</b>, ótimo para dashboards ou conteúdo extenso.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="right" WfPanel-size="1000px" id="painel-xlarge">
            <div style="padding: 20px; height: 100%">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                  <h3>Painel XLarge (1000px)</h3>
                  <button onclick="document.getElementById('painel-xlarge')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel tem largura de <b>1000px</b>, ideal para tabelas grandes ou múltiplas colunas.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="right" WfPanel-size="100vw" id="painel-full">
            <div style="padding: 20px; height: 100%">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px">
                  <h3>Painel Full (100vw)</h3>
                  <button onclick="document.getElementById('painel-full')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel ocupa <b>100% da largura da tela</b>, perfeito para conteúdo fullscreen ou modais grandes.</p>
            </div>
         </div>

         <!-- Direções do Painel -->
         <div class="l">
            <div class="co12-g">
               <h3>Direções do Painel</h3>
               <p>
                  Use o atributo <code>WfPanel-side</code> para definir de qual lado o painel deve deslizar.
                  Para painéis <code>top</code> e <code>bottom</code>, a largura é automaticamente ajustada para <code>100vw</code>:
               </p>
               <div class="btns">
                  <button WfPanel-target="painel-esquerda" WfPanel-title="Painel Esquerda" class="btn btn-prin">
                     <i class="wf wf-chevron-left Taler f20"></i> Esquerda
                  </button>
                  <button WfPanel-target="painel-direita" WfPanel-title="Painel Direita" class="btn btn-suce">
                     <i class="wf wf-chevron-right Taler f20"></i> Direita
                  </button>
                  <button WfPanel-target="painel-topo" WfPanel-title="Painel Topo" class="btn btn-aler">
                     <i class="wf wf-chevron-up Taler f20"></i> Topo
                  </button>
                  <button WfPanel-target="painel-baixo" WfPanel-title="Painel Baixo" class="btn btn-info">
                     <i class="wf wf-chevron-down Taler f20"></i> Baixo
                  </button>
               </div>
               <p style="font-size: 14px; color: var(--neut11); margin-top: 10px">
                  <b>Nota:</b> Painéis <code>top</code> e <code>bottom</code> ocupam toda a largura da tela (100vw) e a altura é baseada no atributo <code>WfPanel-size</code>.
               </p>
            </div>
         </div>

         <!-- Painéis de Direções -->
         <div WfPanel WfPanel-side="left" WfPanel-size="500px" id="painel-esquerda">
            <div style="padding: 20px; height: 100%; background: #f9f9f9">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #2196f3; padding-bottom: 15px">
                  <h3><i class="wf wf-chevron-left Taler f20"></i> Painel Esquerda</h3>
                  <button onclick="document.getElementById('painel-esquerda')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel desliza da <b>esquerda para direita</b>.</p>
               <p>Ideal para menus de navegação principais, filtros ou sidebars.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="right" WfPanel-size="500px" id="painel-direita">
            <div style="padding: 20px; height: 100%; background: #f9f9f9">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #4caf50; padding-bottom: 15px">
                  <h3><i class="wf wf-chevron-right Taler f20"></i> Painel Direita</h3>
                  <button onclick="document.getElementById('painel-direita')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel desliza da <b>direita para esquerda</b>.</p>
               <p>Perfeito para carrinho de compras, notificações ou configurações.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="top" WfPanel-size="250px" id="painel-topo">
            <div style="padding: 20px; height: 100%; background: #fff3e0">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px">
                  <h3><i class="wf wf-chevron-up Taler f20"></i> Painel Topo</h3>
                  <button onclick="document.getElementById('painel-topo')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel desliza de <b>cima para baixo</b>.</p>
               <p>Ideal para alertas importantes, banners ou barras de progresso.</p>
            </div>
         </div>

         <div WfPanel WfPanel-side="bottom" WfPanel-size="200px" id="painel-baixo">
            <div style="padding: 20px; height: 100%; background: #e3f2fd">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px">
                  <h3><i class="wf wf-chevron-down Taler f20"></i> Painel Baixo</h3>
                  <button onclick="document.getElementById('painel-baixo')._wfPanel.close()" style="background: none; border: none; font-size: 24px; cursor: pointer">×</button>
               </div>
               <p>Este painel desliza de <b>baixo para cima</b>.</p>
               <p>Perfeito para avisos de cookies, termos de uso ou ações rápidas.</p>
            </div>
         </div>

         <!-- Configurações Disponíveis -->
         <div class="l">
            <div class="co6-g">
               <h4>Atributos WfPanel-*</h4>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Atributo</th>
                        <th>Tipo</th>
                        <th>Padrão</th>
                        <th>Descrição</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfPanel-side</code></td>
                        <td>string</td>
                        <td>"left"</td>
                        <td>Lado do painel: "left", "right", "top", "bottom"</td>
                     </tr>
                     <tr>
                        <td><code>WfModal-size</code></td>
                        <td>string</td>
                        <td>"300px"</td>
                        <td>Tamanho do painel: "300px", "50%", "400px", etc</td>
                     </tr>
                     <tr>
                        <td><code>WfPanel-url</code></td>
                        <td>string</td>
                        <td>null</td>
                        <td>URL para carregar conteúdo via AJAX</td>
                     </tr>
                     <tr>
                        <td><code>WfPanel-trigger</code></td>
                        <td>string</td>
                        <td>null</td>
                        <td>Seletor do elemento que abre o painel</td>
                     </tr>
                     <tr>
                        <td><code>WfPanel-overlay</code></td>
                        <td>string</td>
                        <td>"true"</td>
                        <td>Exibir overlay: "true" ou "false"</td>
                     </tr>
                  </tbody>
               </table>

               <h5 style="margin-top: 20px"><i class="wf wf-target wdest2-bg f20"></i> Atributo para Botões</h5>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Atributo</th>
                        <th>Uso</th>
                        <th>Descrição</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfPanel-target</code></td>
                        <td>Em botões/links</td>
                        <td>ID do painel que deve abrir ao clicar</td>
                     </tr>
                  </tbody>
               </table>

               <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-pin Taler f20"></i> Uso Direto via Tags:</b><br />
                  <code>&lt;button WfPanel-target="meuPainel"&gt;Abrir&lt;/button&gt;</code><br />
                  <b><i class="wf wf-pin Taler f20"></i> Com AJAX:</b><br />
                  <code>WfPanel-side="left" WfPanel-size="350px" WfPanel-url="conteudo.html"</code><br />
                  <b><i class="wf wf-pin Taler f20"></i> Sem Overlay:</b><br />
                  <code>WfPanel-side="right" WfPanel-size="400px" WfPanel-overlay="false"</code>
               </div>
            </div>
            <div class="co6-g">
               <h4>Exemplos de Configuração</h4>

               <!-- Painel Rápido -->
               <h5 style="margin-top: 20px; color: var(--wf-color)"><i class="wf wf-zap Taler f20"></i> Painel Rápido</h5>
               <div style="margin: 15px 0; padding: 15px; background: var(--wf-bg-); border-radius: 8px; border: 1px solid var(--wf-color)">
                  <button WfPanel-target="painel-rapido" class="btn btn-prin"><i class="wf wf-zap Taler f20"></i> Painel Rápido</button>
                  <div WfPanel WfPanel-side="right" WfPanel-size="250px" id="painel-rapido">
                     <div style="background: white; padding: 20px; height: 100%">
                        <h4><i class="wf wf-zap Taler f20"></i> Super Rápido</h4>
                        <p>Animação de apenas 150ms!</p>
                        <button onclick="document.getElementById('painel-rapido')._wfPanel.close()" class="btn btn-secondary">Fechar</button>
                     </div>
                  </div>
               </div>

               <!-- Painel Sem Overlay -->
               <h5 style="margin-top: 20px; color: var(--wf-color)">🚫 Sem Overlay</h5>
               <div style="margin: 15px 0; padding: 15px; background: var(--bg-bl); border-radius: 8px; border: 1px solid var(--wf-color)">
                  <button WfPanel-target="painel-sem-overlay" class="btn btn-suce">🚫 Sem Overlay</button>
                  <div WfPanel WfPanel-side="left" WfPanel-size="280px" WfPanel-overlay="false" id="painel-sem-overlay">
                     <div style="background: white; padding: 20px; border-right: 2px solid #ddd; height: 100%">
                        <h4>🚫 Sem Overlay</h4>
                        <p>Não há fundo escuro e só fecha pelo botão.</p>
                        <button onclick="document.getElementById('painel-sem-overlay')._wfPanel.close()" class="btn btn-warning">Fechar</button>
                     </div>
                  </div>
               </div>

               <!-- Painel Lento -->
               <h5 style="margin-top: 20px; color: var(--wf-color)">🐌 Painel Lento</h5>
               <div style="margin: 15px 0; padding: 15px; background: var(--bg-bl); border-radius: 8px; border: 1px solid var(--wf-color)">
                  <button WfPanel-target="painel-lento" class="btn btn-info">🐌 Painel Lento</button>
                  <div WfPanel WfPanel-side="top" WfPanel-size="150px" id="painel-lento">
                     <div style="background: white; padding: 20px; height: 100%">
                        <div style="display: flex; justify-content: space-between; align-items: center">
                           <h4>🐌 Animação Lenta</h4>
                           <button onclick="document.getElementById('painel-lento')._wfPanel.close()" style="background: none; border: none; font-size: 20px; cursor: pointer">
                              ✕
                           </button>
                        </div>
                        <p>Animação suave de 800ms com easing "ease-out".</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- API JavaScript -->
         <div class="l">
            <div class="co6-g">
               <h4>Como Funciona</h4>
               <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-refresh-cw Taler f20"></i> Fluxo de Funcionamento:</b><br /><br />
                  <b>1.</b> Detecta elemento <code>[WfPanel]</code><br />
                  <b>2.</b> Lê configurações dos atributos <code>WfPanel-*</code><br />
                  <b>3.</b> Aplica posicionamento <code>position: fixed</code><br />
                  <b>4.</b> Cria overlay (se habilitado)<br />
                  <b>5.</b> Define transform inicial (oculto)<br />
                  <b>6.</b> Adiciona event listeners<br />
                  <b>7.</b> Pronto para <code>.open()</code>, <code>.close()</code>, <code>.toggle()</code>
               </div>

               <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-target Taler f20"></i> CSS Aplicado Automaticamente:</b><br />
                  • <code>position: fixed</code><br />
                  • <code>z-index: 1000</code><br />
                  • <code>transform: translateX(-100%)</code> (ou similar)<br />
                  • <code>transition: transform 300ms ease-in-out</code>
               </div>
            </div>
            <div class="co6-g">
               <h4>JavaScript (Opcional)</h4>
               <p>Funciona automaticamente via tags, mas você pode controlar via JavaScript se precisar:</p>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Controle direto (se necessário)
const elemento = document.getElementById('meuPainel');
elemento._wfPanel.open();    // Abrir
elemento._wfPanel.close();   // Fechar
elemento._wfPanel.toggle();  // Alternar

// Eventos (para integração)
document.addEventListener('wfpanel:open', (e) => {
  console.log('Painel aberto:', e.detail.panel.side);
});

document.addEventListener('wfpanel:close', (e) => {
  console.log('Painel fechado');
});

// Acessar configurações
console.log(elemento._wfPanel.side);     // "left", "right", etc
console.log(elemento._wfPanel.size);     // "300px", "50%", etc
console.log(elemento._wfPanel.isOpen);   // true/false
        </script></pre>

               <div style="background: var(--wf-bg-); padding: 10px; border-radius: 4px; margin: 10px 0">
                  <small><b><i class="wf wf-lightbulb Taler f20"></i> Dica:</b> Use ESC para fechar painéis automaticamente!</small>
               </div>
            </div>
         </div>

         <!-- Resumo -->
         <div class="l">
            <div class="co12-g">
               <h3>Resumo</h3>
               <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745">
                  <h4 style="margin-top: 0"><i class="wf wf-check-circle Taler f20"></i> Características do WfPanel</h4>
                  <ul>
                     <li><b><i class="wf wf-clipboard Taler f20"></i> Painéis Deslizantes:</b> Sidebars e menus off-canvas com animações suaves</li>
                     <li><b><i class="wf wf-target-lock Taler f20"></i> Múltiplas Direções:</b> Left, right, top, bottom com transforms automáticos</li>
                     <li><b><i class="wf wfs-zap Taler f20"></i> Overlay Configurável:</b> Fundo escuro opcional com fechamento por clique</li>
                     <li>
                        <b><i class="wf wf-wrench Taler f20"></i> Configuração Simples:</b> Atributos
                        <code>WfPanel-*</code>
                        intuitivos (side, size, url, overlay)
                     </li>
                     <li><b><i class="wf wf-broadcast Taler f20"></i> Suporte AJAX:</b> Carregamento dinâmico de conteúdo via <code>WfPanel-url</code></li>
                     <li><b><i class="wf wfs-keyboard Taler f20"></i> Controle por Teclado:</b> ESC para fechar automaticamente</li>
                     <li><b><i class="wf wf-palette Taler f20"></i> Acessibilidade:</b> Atributos ARIA e foco automático</li>
                     <li><b><i class="wf wfs-zap Taler f20"></i> Responsivo:</b> Funciona perfeitamente em mobile e desktop</li>
                     <li><b><i class="wf wfs-rocket Taler f20"></i> Performance:</b> Animações CSS com GPU acceleration</li>
                     <li><b><i class="wf wf-refresh Taler f20"></i> Eventos Customizados:</b> Hooks para before-open, open, before-close, close</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </section>

   <script>
      // WfPanel funciona automaticamente via WfPanel-target
      // Não precisa de funções JavaScript manuais!

      // A inicialização automática de WfPanel já ocorre via webfull; removemos logs de debug desta documentação.
   </script>
</section>