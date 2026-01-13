<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfPanel1</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfPanel1</li>
        </ol>
      </nav>
    </div>
<section class="WfPanelAjaxx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <h3>[Painéis com AJAX Integrado]</h3>
               <p>
                  O <b>WfPanelAjax</b> combina a funcionalidade do WfPanel com WfAjax, criando painéis que carregam conteúdo automaticamente via AJAX. É a evolução do
                  WfPanel
                  tradicional, oferecendo simplicidade máxima com apenas um link para criar painéis completos com conteúdo dinâmico.
               </p>
               <div style="background: var(--wf-bg-); border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-link Taler f20"></i> LINK DIRETO:</b> Apenas um link, sem necessidade de divs<br />
                  <b><i class="wf wfs-zap Taler f20"></i> AJAX AUTOMÁTICO:</b> Carregamento automático de conteúdo<br />
                  <b><i class="wf wf-target-lock Taler f20"></i> SIMPLICIDADE:</b> Reduz código de ~20 linhas para 1 linha<br />
                  <b><i class="wf wf-refresh Taler f20"></i> INTEGRAÇÃO:</b> Combina painel + AJAX automaticamente<br />
                  <b><i class="wf wfs-zap Taler f20"></i> RESPONSIVO:</b> Adapta-se automaticamente ao tamanho da tela<br />
                  <b><i class="wf wf-universal-access Taler f20"></i> ACESSÍVEL:</b> Suporte a teclado e navegação
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co6-g">
               <h3>Uso Básico</h3>
               <p>Simplesmente adicione o atributo <code>WfPanelAjax</code> em um link. O componente automaticamente cria o painel e carrega o conteúdo via AJAX:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Uso básico -->
<a href="api/usuarios" WfPanelAjax>Ver Usuários</a>

<!-- Com título customizado -->
<a href="api/albuns" WfPanelAjax WfPanel-title="Gerenciar Álbuns">Gerenciar Álbuns</a>

<!-- Com tamanho específico -->
<a href="api/formulario" WfPanelAjax WfPanel-size="large">Formulário Grande</a>
</script></pre>
            </div>
            <div class="co6-g">
               <h4>Exemplo Funcionando</h4>
               <div class="btns">
                  <a href="exemplo/blocosTestes/teste-ajax-1.html" WfPanelAjax WfPanel-title="Teste AJAX 1" WfPanel-size="medium" class="btn btn-prin">Teste AJAX 1</a>
                  <a href="exemplo/blocosTestes/teste-ajax-2.html" WfPanelAjax WfPanel-title="Teste AJAX 2" WfPanel-size="medium" class="btn btn-suce">Teste AJAX 2</a>
                  <a href="exemplo/blocosTestes/teste-ajax-3.html" WfPanelAjax WfPanel-title="Teste AJAX 3" WfPanel-size="medium" class="btn btn-aler">Teste AJAX 3</a>
                  <a href="exemplo/blocosTestes/teste-ajax-4.html" WfPanelAjax WfPanel-title="Teste AJAX 4" WfPanel-size="medium" class="btn btn-info">Teste AJAX 4</a>
                  <a href="exemplo/blocosTestes/teste-componentes-1.html" WfPanelAjax WfPanel-title="Teste Componentes 1" WfPanel-size="medium" class="btn btn-peri">Teste Comp 1</a>
                  <a href="exemplo/blocosTestes/teste-componentes-2.html" WfPanelAjax WfPanel-title="Teste Componentes 2" WfPanel-size="medium" class="btn btn-secu">Teste Comp 2</a>
               </div>
               <p style="font-size: 14px; color: var(--neut11); margin-top: 10px">
                  Clique no botão acima para ver o WfPanelAjax em ação. O painel abrirá automaticamente e carregará o conteúdo via AJAX.
               </p>
            </div>
         </div>

         <!-- Tamanhos de Painel -->
         <div class="l">
            <div class="co12-g">
               <h3>Tamanhos de Painel</h3>
               <p>
                  O WfPanelAjax suporta 5 tamanhos diferentes usando o atributo
                  <code>WfPanel-size</code>:
               </p>
               <div class="btns">
                  <a href="exemplo/blocosTestes/teste-ajax-2.html" WfPanelAjax WfPanel-title="Painel Pequeno" WfPanel-size="small" class="btn btn-prin btnajax"> Small (400px) </a>
                  <a href="exemplo/blocosTestes/teste-ajax-3.html" WfPanelAjax WfPanel-title="Painel Médio" WfPanel-size="medium" class="btn btn-suce btnajax"> Medium (600px) </a>
                  <a href="exemplo/blocosTestes/teste-ajax-1.html" WfPanelAjax WfPanel-title="Painel Grande" WfPanel-size="large" class="btn btn-aler btnajax"> Large (800px) </a>
                  <a href="exemplo/blocosTestes/teste-ajax-2.html" WfPanelAjax WfPanel-title="Painel Extra Grande" WfPanel-size="xlarge" class="btn btn-info btnajax"> XLarge (1000px)
                  </a>
                  <a href="exemplo/blocosTestes/teste-ajax-3.html" WfPanelAjax WfPanel-title="Painel Full" WfPanel-size="full" class="btn btn-peri btnajax"> Full (100vw) </a>
               </div>
            </div>
         </div>

         <!-- Direções do Painel -->
         <div class="l">
            <div class="co12-g">
               <h3>Direções do Painel</h3>
               <p>
                  Use o atributo <code>WfPanel-side</code> para definir de qual lado o painel deve deslizar. Para painéis <code>top</code> e <code>bottom</code>, a largura é
                  automaticamente ajustada para <code>100vw</code>:
               </p>
               <div class="btns">
                  <a href="exemplo/blocosTestes/teste-ajax-1.html" WfPanelAjax WfPanel-title="Painel Esquerda" WfPanel-side="left" WfPanel-size="medium" class="btn btn-prin btnajax">
                     <i class="wf wf-chevron-left Taler f20"></i> Esquerda
                  </a>
                  <a href="exemplo/blocosTestes/teste-ajax-2.html" WfPanelAjax WfPanel-title="Painel Direita" WfPanel-side="right" WfPanel-size="medium" class="btn btn-suce btnajax">
                     <i class="wf wf-chevron-right Taler f20"></i> Direita
                  </a>
                  <a href="exemplo/blocosTestes/teste-ajax-3.html" WfPanelAjax WfPanel-title="Painel Topo" WfPanel-side="top" WfPanel-size="medium" class="btn btn-aler btnajax"> <i
                        class="wf wf-chevron-up Taler f20"></i> Topo
                  </a>
                  <a href="exemplo/blocosTestes/teste-ajax-1.html" WfPanelAjax WfPanel-title="Painel Bottom" WfPanel-side="bottom" WfPanel-size="medium" class="btn btn-info btnajax">
                     <i class="wf wf-chevron-down Taler f20"></i> Bottom
                  </a>
               </div>
               <p style="font-size: 14px; color: var(--neut11); margin-top: 10px">
                  <b>Nota:</b> Painéis <code>top</code> e <code>bottom</code> ocupam toda a largura da tela (100vw) e a altura é baseada no atributo
                  <code>WfPanel-size</code>.
               </p>
            </div>
         </div>

         <!-- Callbacks e Eventos -->
         <div class="l">
            <div class="co6-g">
               <h3>Callbacks e Eventos</h3>
               <p>O WfPanelAjax suporta callbacks para eventos de sucesso, erro e fechamento:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<a href="admin/usuarios/editar/123"
   WfPanelAjax
   WfPanel-title="Editar Usuário"
   WfPanel-size="large"
   WfPanel-on-success="refreshUserList"
   WfPanel-on-error="showErrorMessage"
   WfPanel-on-close="onEditClose"
   class="btn btn-prin">
   Editar Usuário
</a>

<script>
function refreshUserList(panel) {
    console.log('Painel carregado com sucesso:', panel);
    WfAlert.success('Usuário carregado!');
}

function showErrorMessage(panel) {
    console.log('Erro ao carregar painel:', panel);
    WfAlert.error('Erro ao carregar!');
}

function onEditClose(panel) {
    console.log('Painel fechado:', panel);
    WfAlert.info('Painel fechado!');
}
<\/script>
</script></pre>
            </div>
            <div class="co6-g">
               <h4>Exemplo com Callbacks</h4>
               <div class="btns">
                  <a href="exemplo/blocosTestes/teste-ajax-2.html" WfPanelAjax WfPanel-title="Com Callbacks" WfPanel-on-success="onPanelSuccess" WfPanel-on-error="onPanelError"
                     WfPanel-on-close="onPanelClose" class="btn btn-peri">
                     Testar Callbacks
                  </a>
               </div>
               <p style="font-size: 14px; color: var(--neut11); margin-top: 10px">Abra o console do navegador para ver os callbacks sendo executados.</p>
            </div>
         </div>

         <!-- Comparação: WfPanel vs WfPanelAjax -->
         <div class="l">
            <div class="co12-g">
               <h3>Comparação: WfPanel vs WfPanelAjax</h3>
               <p>Veja a diferença entre o WfPanel tradicional e o novo WfPanelAjax:</p>

               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0">
                  <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107">
                     <h4 style="margin: 0 0 10px 0; color: #856404">WfPanel Tradicional (Antes)</h4>
                     <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- HTML necessário -->
<div id="Create" WfPanel WfPanel-side="right" WfPanel-size="600px">
  <div class="panel-header">
    <h3>Create Album</h3>
    <button class="panel-close" onclick="this.closest('[WfPanel]')._swPanel.close()">×</button>
  </div>
  <div class="wfpanel-content">
    <p>Carregando...</p>
  </div>
</div>

<!-- JavaScript necessário -->
<script>
document.querySelector('[WfPanel-target="Create"]').addEventListener('click', function() {
    const panel = document.querySelector('#Create')._swPanel;
    panel.open();

    // Carregar conteúdo via AJAX
    WfAjax.load({
        url: '/admin/albuns/create',
        dest: 'Create',
        effect: 'fade-in'
    });
});
<\/script>
</script>
</pre>
                     <p style="margin: 10px 0 0 0; font-size: 14px; color: #856404">
                        <b>~20 linhas de código</b><br />
                        Precisa de divs + JavaScript
                     </p>
                  </div>

                  <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745">
                     <h4 style="margin: 0 0 10px 0; color: #155724">WfPanelAjax (Agora)</h4>
                     <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Apenas um link! -->
<a href="admin/albuns/create"
   WfPanelAjax
   WfPanel-title="Criar Novo Álbum"
   WfPanel-size="large"
   class="btn btn-prin">
   <i class='bx bx-plus-circle'></i> Novo Álbum
</a>
</script>
</pre>
                     <p style="margin: 10px 0 0 0; font-size: 14px; color: #155724">
                        <b>1 linha de código</b><br />
                        Sem divs, sem JavaScript
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <!-- Atributos Disponíveis -->
         <div class="l">
            <div class="co12-g">
               <h3>Atributos Disponíveis</h3>
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
                           <td><code>href</code> ou <code>WfPanel-url</code></td>
                           <td>URL para carregar via AJAX</td>
                           <td><em>Obrigatório</em></td>
                           <td><code>href="api/usuarios"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-title</code></td>
                           <td>Título do painel</td>
                           <td>"Painel"</td>
                           <td><code>WfPanel-title="Gerenciar Álbuns"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-size</code></td>
                           <td>Tamanho: small, medium, large, xlarge, full</td>
                           <td>"medium"</td>
                           <td><code>WfPanel-size="large"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-side</code></td>
                           <td>Lado: left, right, top, bottom</td>
                           <td>"right"</td>
                           <td><code>WfPanel-side="left"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-width</code></td>
                           <td>Largura customizada (px, %, vw). Para top/bottom: sempre 100vw</td>
                           <td>Baseado no size</td>
                           <td><code>WfPanel-width="800px"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-height</code></td>
                           <td>Altura customizada (px, %, vh). Para left/right: sempre 100vh</td>
                           <td>Baseado no side</td>
                           <td><code>WfPanel-height="80vh"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-loading</code></td>
                           <td>Mensagem de carregamento</td>
                           <td>"Carregando..."</td>
                           <td><code>WfPanel-loading="Aguarde..."</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-error</code></td>
                           <td>Mensagem de erro</td>
                           <td>"Erro ao carregar"</td>
                           <td><code>WfPanel-error="Falha na conexão"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-overlay</code></td>
                           <td>Mostrar overlay (true/false)</td>
                           <td>"true"</td>
                           <td><code>WfPanel-overlay="false"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-close-on-overlay</code></td>
                           <td>Fechar ao clicar no overlay</td>
                           <td>"true"</td>
                           <td><code>WfPanel-close-on-overlay="false"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-close-on-escape</code></td>
                           <td>Fechar com tecla ESC</td>
                           <td>"true"</td>
                           <td><code>WfPanel-close-on-escape="false"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-ajax-timeout</code></td>
                           <td>Timeout do AJAX (ms)</td>
                           <td>10000</td>
                           <td><code>WfPanel-ajax-timeout="15000"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-ajax-retry</code></td>
                           <td>Tentativas de retry</td>
                           <td>3</td>
                           <td><code>WfPanel-ajax-retry="5"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-on-success</code></td>
                           <td>Função chamada no sucesso</td>
                           <td>-</td>
                           <td><code>WfPanel-on-success="refreshTable"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-on-error</code></td>
                           <td>Função chamada no erro</td>
                           <td>-</td>
                           <td><code>WfPanel-on-error="showError"</code></td>
                        </tr>
                        <tr>
                           <td><code>WfPanel-on-close</code></td>
                           <td>Função chamada ao fechar</td>
                           <td>-</td>
                           <td><code>WfPanel-on-close="onClose"</code></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <!-- Exemplo Completo -->
         <div class="l">
            <div class="co12-g">
               <h3>Exemplo Completo</h3>
               <p>Aqui está um exemplo completo de como usar o WfPanelAjax em um sistema real:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Lista de álbuns com ações -->
<table class="wftable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Álbum de Férias</td>
      <td><span class="status-active">Ativo</span></td>
      <td>
        <!-- WfPanelAjax para visualizar -->
        <a href="admin/albuns/view/1"
           WfPanelAjax
           WfPanel-title="Visualizar Álbum"
           WfPanel-size="large"
           class="btn btn-sm btn-info">
          <i class='bx bx-eye'></i>
        </a>

        <!-- WfPanelAjax para editar -->
        <a href="admin/albuns/edit/1"
           WfPanelAjax
           WfPanel-title="Editar Álbum"
           WfPanel-size="large"
           WfPanel-on-success="refreshTable"
           class="btn btn-sm btn-warning">
          <i class='bx bx-edit'></i>
        </a>

        <!-- WfPanelAjax para gerenciar imagens -->
        <a href="admin/albuns/images/1"
           WfPanelAjax
           WfPanel-title="Gerenciar Imagens"
           WfPanel-size="xlarge"
           WfPanel-loading="Carregando galeria..."
           class="btn btn-sm btn-success">
          <i class='bx bx-images'></i>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<script>
function refreshTable() {
    // Atualizar tabela após edição
    WfTableAjax.refresh('tabela-albuns');
    WfAlert.success('Álbum atualizado com sucesso!');
}
<\/script>
</script>
</pre>
            </div>
         </div>

         <!-- Vantagens do WfPanelAjax -->
         <div class="l">
            <div class="co12-g">
               <h3>Vantagens do WfPanelAjax</h3>
               <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin: 20px 0">
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50">
                     <h4 style="margin: 0 0 10px 0; color: #2e7d32"><i class="wf wf-rocket Taler f20"></i> Simplicidade</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Apenas um link, sem necessidade de criar divs ou estruturas HTML complexas</p>
                  </div>
                  <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3">
                     <h4 style="margin: 0 0 10px 0; color: #1976d2"><i class="wf wf-zap Taler f20"></i> Integração</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Combina painel + AJAX automaticamente, sem configuração adicional</p>
                  </div>
                  <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800">
                     <h4 style="margin: 0 0 10px 0; color: #f57c00"><i class="wf wf-smartphone Taler f20"></i> Responsivo</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Adapta-se automaticamente ao tamanho da tela e dispositivos móveis</p>
                  </div>
                  <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #9c27b0">
                     <h4 style="margin: 0 0 10px 0; color: #7b1fa2"><i class="wf wf-universal-access Taler f20"></i> Acessibilidade</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Suporte completo a teclado, navegação e leitores de tela</p>
                  </div>
                  <div style="background: #e0f2f1; padding: 15px; border-radius: 8px; border-left: 4px solid #009688">
                     <h4 style="margin: 0 0 10px 0; color: #00695c"><i class="wf wf-refresh-cw Taler f20"></i> Callbacks</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Funções para eventos de sucesso, erro e fechamento</p>
                  </div>
                  <div style="background: #fce4ec; padding: 15px; border-radius: 8px; border-left: 4px solid #e91e63">
                     <h4 style="margin: 0 0 10px 0; color: #c2185b"><i class="wf wf-target Taler f20"></i> Reutilizável</h4>
                     <p style="margin: 0; font-size: 14px; color: var(--neut12)">Funciona em qualquer lugar do projeto, mantendo consistência</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>

   <script>
      // Funções de callback para demonstração
      function onPanelSuccess(panel) {
         console.log('Painel carregado com sucesso:', panel);
         WfAlert.success('Painel carregado com sucesso!');
      }

      function onPanelError(panel) {
         console.log('Erro ao carregar painel:', panel);
         WfAlert.error('Erro ao carregar painel!');
      }

      function onPanelClose(panel) {
         console.log('Painel fechado:', panel);
         WfAlert.info('Painel fechado!');
      }
   </script>

</section>