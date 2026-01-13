<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfAccord</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfAccord</li>
        </ol>
      </nav>
    </div>
<section class="wfabax">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">

               <h3>[Acordeão/Accordion]</h3>
               <p>
                  O <b>WfAccord</b> é um componente de acordeão vertical para organização de conteúdo expansível.
                  Diferente do <b>WfAba</b> (que é para navegação), o WfAccord é ideal para FAQ, documentação,
                  listas de conteúdo e organização vertical de informações.
               </p>

               <!-- Diferença entre WfAba e WfAccord -->
               <div style="background: var(--wf-bg-); padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid var(--prin)">
                  <h3 style="margin-top: 0; color: var(--prin)"><i class="wf wf-clipboard Taler f20"></i> Quando usar WfAccord vs WfAba?</h3>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem">
                     <div>
                        <h3 style="color: var(--prin); margin-bottom: 0.5rem"><i class="wf wf-target-lock Taler f20"></i> WfAccord (Acordeão)</h3>
                        <ul style="margin: 0; padding-left: 1.2rem">
                           <li>FAQ e Perguntas Frequentes</li>
                           <li>Documentação técnica</li>
                           <li>Listas de conteúdo organizado</li>
                           <li>Seções expansíveis verticais</li>
                           <li>Conteúdo que pode ficar aberto simultaneamente</li>
                        </ul>
                     </div>
                     <div>
                        <h3 style="color: var(--prin); margin-bottom: 0.5rem">📑 WfAba (Abas)</h3>
                        <ul style="margin: 0; padding-left: 1.2rem">
                           <li>Navegação entre seções</li>
                           <li>Menu principal do site</li>
                           <li>Painéis de configuração</li>
                           <li>Conteúdo que se alterna</li>
                           <li>Layout horizontal/vertical/lateral</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co6-g">
               <h3>Uso Básico</h3>
               <p>Para criar um acordeão, use o atributo <code>WfAccord</code> no container principal:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAccord>
  <div WfAccordItem>
    <div WfAccordHeader>Pergunta 1</div>
    <div WfAccordContent>
      <p>Resposta da primeira pergunta.</p>
    </div>
  </div>
  <div WfAccordItem>
    <div WfAccordHeader>Pergunta 2</div>
    <div WfAccordContent>
      <p>Resposta da segunda pergunta.</p>
    </div>
  </div>
</div>
</script>
</pre>
            </div>
            <div class="co6-g">
               <h3>Exemplo Funcionando</h3>
               <div WfAccord style="margin: 0">
                  <div WfAccordItem>
                     <div WfAccordHeader>Como funciona o WfAccord?</div>
                     <div WfAccordContent>
                        <p>O WfAccord é um componente JavaScript que cria acordeões verticais expansíveis. Ideal para organizar conteúdo em seções que podem ser abertas e fechadas
                           independentemente.</p>
                        <p>Diferente do WfAba (que é para navegação), o WfAccord é focado em organização de conteúdo vertical.</p>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>Quando usar WfAccord vs WfAba?</div>
                     <div WfAccordContent>
                        <p><b>WfAccord:</b> Use para FAQ, documentação, listas organizadas e conteúdo que pode ficar aberto simultaneamente.</p>
                        <p><b>WfAba:</b> Use para navegação, menus principais e conteúdo que se alterna (uma aba por vez).</p>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>Quais são os recursos do WfAccord?</div>
                     <div WfAccordContent>
                        <p>O WfAccord oferece:</p>
                        <ul>
                           <li>Múltiplas seções abertas simultaneamente</li>
                           <li>Efeitos de animação suaves</li>
                           <li>Navegação por teclado completa</li>
                           <li>Integração com WfDay (tema dia/noite)</li>
                           <li>Design responsivo e acessível</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Atributos de Configuração -->
         <div class="l">
            <div class="co12-g">
               <h3>Atributos de Configuração</h3>
               <p>O WfAccord suporta vários atributos para personalizar seu comportamento:</p>
            </div>
         </div>

         <div class="l">
            <div class="co4-g">
               <h3>WfAccord-multiple</h3>
               <p>Permite que múltiplas seções sejam abertas simultaneamente:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAccord WfAccord-multiple="true">
  <!-- Múltiplas seções podem estar abertas -->
</div>
</script>
</pre>
               <div WfAccord WfAccord-multiple="true" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader>Seção 1</div>
                     <div WfAccordContent>
                        <p>Esta seção pode ficar aberta junto com outras.</p>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>Seção 2</div>
                     <div WfAccordContent>
                        <p>Esta também pode ficar aberta simultaneamente.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>WfAccord-effect</h3>
               <p>Define o efeito de animação para abrir/fechar:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAccord WfAccord-effect="fade">
  <!-- Usa animação fade -->
</div>
</script>
</pre>
               <div WfAccord WfAccord-effect="fade" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader>Efeito Fade</div>
                     <div WfAccordContent>
                        <p>Esta seção usa o efeito fade para abrir e fechar.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>WfAccord-active</h3>
               <p>Define qual seção deve estar aberta inicialmente:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAccord WfAccord-active="2">
  <!-- A segunda seção (índice 1) estará aberta -->
</div>
</script>
</pre>
               <div WfAccord WfAccord-active="2" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader>Seção 1</div>
                     <div WfAccordContent>
                        <p>Esta seção está fechada inicialmente.</p>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>Seção 2 (Ativa)</div>
                     <div WfAccordContent>
                        <p>Esta seção está aberta inicialmente.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Efeitos de Animação -->
         <div class="l">
            <div class="co12-g">
               <h3>Efeitos de Animação</h3>
               <p>O WfAccord suporta diferentes efeitos de animação. Teste cada um:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Efeito Slide (Padrão)</h3>
               <div WfAccord WfAccord-effect="slide" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-chevron-down Taler f16"></i> Efeito Slide</div>
                     <div WfAccordContent>
                        <p>O efeito slide é o padrão do WfAccord. Ele desliza suavemente o conteúdo para baixo e para cima.</p>
                        <p>É o efeito mais suave e natural para acordeões.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co6-g">
               <h3>Efeito Fade</h3>
               <div WfAccord WfAccord-effect="fade" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-eye Taler f16"></i> Efeito Fade</div>
                     <div WfAccordContent>
                        <p>O efeito fade faz o conteúdo aparecer e desaparecer suavemente.</p>
                        <p>Ideal para transições mais sutis e elegantes.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Efeito Zoom</h3>
               <div WfAccord WfAccord-effect="zoom" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-zoom-in Taler f16"></i> Efeito Zoom</div>
                     <div WfAccordContent>
                        <p>O efeito zoom faz o conteúdo aumentar e diminuir de tamanho.</p>
                        <p>Cria uma sensação de profundidade e foco no conteúdo.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co6-g">
               <h3>Efeito Bounce</h3>
               <div WfAccord WfAccord-effect="bounce" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-bounce Taler f16"></i> Efeito Bounce</div>
                     <div WfAccordContent>
                        <p>O efeito bounce adiciona um pequeno "quicar" na animação.</p>
                        <p>Perfeito para interfaces mais dinâmicas e divertidas.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Temas e Cores -->
         <div class="l">
            <div class="co12-g">
               <h3>Temas e Cores</h3>
               <p>O WfAccord suporta diferentes temas que se adaptam ao sistema WfDay:</p>
            </div>
         </div>

         <div class="l">
            <div class="co4-g">
               <h3>Tema Primary</h3>
               <div WfAccord class="wfaccord-primary" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-info-circle Taler f16"></i> Tema Primary</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema primary com cores azuis.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tema Success</h3>
               <div WfAccord class="wfaccord-success" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-check-circle Taler f16"></i> Tema Success</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema success com cores verdes.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tema Warning</h3>
               <div WfAccord class="wfaccord-warning" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-exclamation-triangle Taler f16"></i> Tema Warning</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema warning com cores amarelas.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co4-g">
               <h3>Tema Danger</h3>
               <div WfAccord class="wfaccord-danger" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-times-circle Taler f16"></i> Tema Danger</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema danger com cores vermelhas.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tema Info</h3>
               <div WfAccord class="wfaccord-info" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-info-circle Taler f16"></i> Tema Info</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema info com cores azuis claras.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tema Dark</h3>
               <div WfAccord class="wfaccord-dark" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-moon Taler f16"></i> Tema Dark</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tema dark com cores escuras.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Tamanhos -->
         <div class="l">
            <div class="co12-g">
               <h3>Tamanhos</h3>
               <p>O WfAccord suporta diferentes tamanhos para diferentes contextos:</p>
            </div>
         </div>

         <div class="l">
            <div class="co4-g">
               <h3>Tamanho Small</h3>
               <div WfAccord class="wfaccord-small" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-minus Taler f16"></i> Tamanho Small</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tamanho small, ideal para espaços compactos.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tamanho Normal (Padrão)</h3>
               <div WfAccord style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-minus Taler f16"></i> Tamanho Normal</div>
                     <div WfAccordContent>
                        <p>Este é o tamanho padrão do WfAccord, ideal para a maioria dos casos.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div class="co4-g">
               <h3>Tamanho Large</h3>
               <div WfAccord class="wfaccord-large" style="margin: 1rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader><i class="wf wf-minus Taler f16"></i> Tamanho Large</div>
                     <div WfAccordContent>
                        <p>Este acordeão usa o tamanho large, ideal para prinque e melhor legibilidade.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Acessibilidade -->
         <div class="l">
            <div class="co12-g">
               <h3>Acessibilidade</h3>
               <p>O WfAccord é totalmente acessível e suporta:</p>
               <ul>
                  <li><b>Navegação por teclado</b> - Use Tab para navegar e Enter/Space para abrir/fechar</li>
                  <li><b>Atributos ARIA</b> - Roles e estados apropriados para leitores de tela</li>
                  <li><b>Reduced Motion</b> - Respeita as preferências de movimento reduzido</li>
                  <li><b>Focus Management</b> - Gerenciamento adequado do foco</li>
               </ul>
            </div>
         </div>

         <!-- Métodos JavaScript -->
         <div class="l">
            <div class="co12-g">
               <h3>Métodos JavaScript</h3>
               <p>O WfAccord oferece métodos para controle programático:</p>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Abrir uma seção específica
WfAccord.open('.meu-acordeao', 0);

// Fechar uma seção específica
WfAccord.close('.meu-acordeao', 0);

// Fechar todas as seções
WfAccord.closeAll('.meu-acordeao');

// Obter instância do acordeão
const accordion = document.querySelector('[WfAccord]')._swAccord;

// Obter seções ativas
const activeItems = accordion.getActiveItems();

// Abrir seção por índice
accordion.openItemByIndex(1);

// Fechar seção por índice
accordion.closeItemByIndex(1);
</script>
</pre>
            </div>
         </div>

         <!-- Integração com WfDay -->
         <div class="l">
            <div class="co12-g">
               <h3>Integração com WfDay</h3>
               <p>O WfAccord se integra automaticamente com o sistema de temas WfDay:</p>
               <ul>
                  <li><b>Tema Dia</b> - Cores claras e contrastes adequados</li>
                  <li><b>Tema Noite</b> - Cores escuras e contrastes suaves</li>
                  <li><b>Transições Suaves</b> - Mudança de tema sem interrupções</li>
                  <li><b>Ícones Adaptativos</b> - Ícones que se adaptam ao tema</li>
               </ul>
               <p>Mude o tema usando o componente WfDay para ver a integração em ação!</p>
            </div>
         </div>

         <!-- Responsividade -->
         <div class="l">
            <div class="co12-g">
               <h3>Responsividade</h3>
               <p>O WfAccord é totalmente responsivo e se adapta a diferentes tamanhos de tela:</p>
               <ul>
                  <li><b>Mobile</b> - Otimizado para telas pequenas</li>
                  <li><b>Tablet</b> - Layout intermediário</li>
                  <li><b>Desktop</b> - Layout completo</li>
                  <li><b>Touch</b> - Suporte completo para dispositivos touch</li>
               </ul>
            </div>
         </div>

         <!-- Exemplo Completo -->
         <div class="l">
            <div class="co12-g">
               <h3>Exemplo Completo</h3>
               <p>Aqui está um exemplo completo com todas as funcionalidades:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfAccord WfAccord-multiple="true" WfAccord-effect="slide" class="wfaccord-primary">
  <div WfAccordItem>
    <div WfAccordHeader>
      <i class="wf wf-info-circle Taler f16"></i>
      Informações Importantes
    </div>
    <div WfAccordContent>
      <p>Este é um exemplo completo do WfAccord com ícones, múltiplas seções abertas e tema personalizado.</p>
      <p>Você pode incluir qualquer conteúdo HTML dentro das seções.</p>
    </div>
  </div>
  <div WfAccordItem>
    <div WfAccordHeader>
      <i class="wf wf-settings Taler f16"></i>
      Configurações
    </div>
    <div WfAccordContent>
      <p>Configure suas preferências aqui.</p>
      <button class="btn btn-primary">Salvar</button>
    </div>
  </div>
  <div WfAccordItem>
    <div WfAccordHeader>
      <i class="wf wf-help-circle Taler f16"></i>
      Ajuda
    </div>
    <div WfAccordContent>
      <p>Precisa de ajuda? Consulte nossa documentação.</p>
      <a href="#" class="btn btn-secondary">Ver Documentação</a>
    </div>
  </div>
</div>
</script>
</pre>
            </div>
         </div>

         <!-- Exemplo Funcionando -->
         <div class="l">
            <div class="co12-g">
               <h3>Exemplo Funcionando Completo</h3>
               <div WfAccord WfAccord-multiple="true" WfAccord-effect="slide" class="wfaccord-primary" style="margin: 2rem 0">
                  <div WfAccordItem>
                     <div WfAccordHeader>
                        <i class="wf wf-info-circle Taler f16"></i>
                        Informações Importantes
                     </div>
                     <div WfAccordContent>
                        <p>Este é um exemplo completo do WfAccord com ícones, múltiplas seções abertas e tema personalizado.</p>
                        <p>Você pode incluir qualquer conteúdo HTML dentro das seções, incluindo formulários, botões e outros componentes.</p>
                        <div style="margin-top: 1rem">
                           <button class="btn btn-primary">Ação Primária</button>
                           <button class="btn btn-secondary">Ação Secundária</button>
                        </div>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>
                        <i class="wf wf-settings Taler f16"></i>
                        Configurações
                     </div>
                     <div WfAccordContent>
                        <p>Configure suas preferências aqui. Este exemplo mostra como o WfAccord pode conter formulários e controles.</p>
                        <form style="margin-top: 1rem">
                           <div style="margin-bottom: 1rem">
                              <label>Nome:</label>
                              <input type="text" placeholder="Digite seu nome" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem">
                           </div>
                           <div style="margin-bottom: 1rem">
                              <label>Email:</label>
                              <input type="email" placeholder="Digite seu email" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem">
                           </div>
                           <button type="submit" class="btn btn-suce">Salvar Configurações</button>
                        </form>
                     </div>
                  </div>
                  <div WfAccordItem>
                     <div WfAccordHeader>
                        <i class="wf wf-help-circle Taler f16"></i>
                        Ajuda e Suporte
                     </div>
                     <div WfAccordContent>
                        <p>Precisa de ajuda? Consulte nossa documentação completa ou entre em contato com nosso suporte.</p>
                        <div style="margin-top: 1rem">
                           <a href="#" class="btn btn-info">Ver Documentação</a>
                           <a href="#" class="btn btn-aler">Contatar Suporte</a>
                        </div>
                        <div style="margin-top: 1rem; padding: 1rem; background: var(--wf-bg-); border-radius: 4px">
                           <h3>Dicas Rápidas:</h3>
                           <ul>
                              <li>Use Tab para navegar entre as seções</li>
                              <li>Pressione Enter ou Space para abrir/fechar</li>
                              <li>Múltiplas seções podem estar abertas simultaneamente</li>
                              <li>O componente é totalmente responsivo</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<script>
// Fallback de inicialização manual para garantir funcionamento sem refresh
(function(){
  function initializeSwAccord() {
    try {
      const container = document;
      if (window.WebfullLoader && typeof WebfullLoader.initAll === 'function') {
        WebfullLoader.initAll(container);
        if (typeof WebfullLoader.startObserving === 'function') WebfullLoader.startObserving();
      }
    } catch(e) {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.warn('wfaccord.html: erro ao inicializar WebfullLoader', e);
      }
    }
    
    // Verificar se WfAccord está disponível antes de inicializar
    if (window.WfAccord && typeof window.WfAccord.initAll === 'function') {
      try {
        window.WfAccord.initAll(document);
      } catch(e) {
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
          console.warn('wfaccord.html: erro ao inicializar WfAccord', e);
        }
      }
    } else {
      // Se WfAccord não estiver carregado ainda, tentar novamente após um delay
      setTimeout(initializeSwAccord, 100);
    }
  }
  
  // Iniciar a inicialização
  initializeSwAccord();
})();
</script>
