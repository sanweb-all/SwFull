<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfContainer</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfContainer</li>
        </ol>
      </nav>
    </div>
<section class="wfajaxx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">

               <h3>[Container Universal]></h3>
               <p>
                  O <b>WfContainer</b> é o sistema oficial de containers do WEBFULL Framework. Oferece containers responsivos com múltiplos temas, animações suaves e
                  integração total com o sistema de temas.
               </p>
               <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-box Taler f20"></i> CONTAINER:</b> Sistema de containers responsivos<br />
                  <b><i class="wf wf-palette Taler f20"></i> MÚLTIPLOS TEMAS:</b> Day, Night e Auto com WfDay<br />
                  <b><i class="wf wfs-zap Taler f20"></i> RESPONSIVO:</b> Layout adaptável a todos os dispositivos
               </div>
            </div>
         </div>

         <!-- 1. WfContainer Básico -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #4CAF50">1. WfContainer Básico</h3>
               <p>
                  O <b>WfContainer</b> garante que seu JavaScript funcione em <b>QUALQUER contexto</b> com proteção BULLETPROOF:
               </p>
            </div>
         </div>
         <br />

         <!-- -->
         <div class="l">
            <div class="co12-g">
               <h4><i class="wf wf-edit Taler f30"></i> Código de Exemplo</h4>
               <pre WfCode lang="javascript"><script type="text/plain">
// 1. WfContainer Básico (BULLETPROOF)
WfContainer(() => {
   console.log('Este código roda SEMPRE em QUALQUER contexto!');

   // Seu JavaScript aqui
   document.querySelectorAll('.meu-elemento').forEach(el => {
      if (!el._processado) {
         el._processado = true;
         // Lógica do seu componente
      }
   });
});

// 2. WfContainer com Configurações
WfContainer(() => {
   // Seu JavaScript aqui
}, {
   maxExecutions: 50,  // Máximo de execuções
   delay: 100,         // Delay entre execuções
   context: 'sidebar'  // Contexto específico
});

// 3. WfContainerElement (para elementos específicos)
WfContainerElement('.menu-item', (element, index) => {
   element.addEventListener('click', () => {
      console.log('Menu item clicado:', index);
   });
});

// 4. WfContainerMulti (múltiplas ações)
WfContainerMulti([
   () => { /* ação 1 */ },
   () => { /* ação 2 */ },
   () => { /* ação 3 */ }
]);

// 5. WfContainerContext (contexto específico)
WfContainerContext(document.getElementById('sidebar'), (context) => {
   // Código que roda apenas no contexto do sidebar
   console.log('Sidebar atualizado:', context);
});
</script></pre>
            </div>
         </div>

         <!-- 2. Contextos Suportados -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #2196F3">2. Contextos Suportados (BULLETPROOF)</h3>
               <p>O WfContainer funciona em <b>TODOS estes contextos</b> com proteção total:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4><i class="wf wf-refresh Taler f20"></i> WfAjax</h4>
               <div style="background: #e3f2fd; border: 1px solid #2196F3; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #1565c0; margin-top: 0;"><i class="wf wf-check Taler f20"></i> Eventos Detectados</h5>
                  <ul style="color: #1565c0; margin: 0;">
                     <li><b>swajax:loaded:</b> Conteúdo carregado</li>
                     <li><b>swajax:processed:</b> Processamento concluído</li>
                     <li><b>swajax:success:</b> Sucesso na operação</li>
                     <li><b>swajax:complete:</b> Operação finalizada</li>
                  </ul>
               </div>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-package Taler f20"></i> WfDiv</h4>
               <div style="background: #fff3e0; border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #e65100; margin-top: 0;"><i class="wf wf-check Taler f20"></i> Eventos Detectados</h5>
                  <ul style="color: #e65100; margin: 0;">
                     <li><b>swdiv:loaded:</b> Conteúdo carregado</li>
                     <li><b>swdiv:processed:</b> Processamento concluído</li>
                     <li><b>swdiv:success:</b> Sucesso na operação</li>
                     <li><b>swdiv:complete:</b> Operação finalizada</li>
                  </ul>
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4><i class="wf wf-cabinet Taler f20"></i> Componentes Aninhados</h4>
               <div style="background: #f3e5f5; border: 1px solid #9c27b0; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #7b1fa2; margin-top: 0;"><i class="wf wf-check Taler f20"></i> Até 6 Níveis de Profundidade</h5>
                  <ul style="color: #7b1fa2; margin: 0;">
                     <li><b>WfModal:</b> wfmodal:opened, wfmodal:closed</li>
                     <li><b>WfAba:</b> wfaba:changed</li>
                     <li><b>WfAccord:</b> wfaccord:opened, wfaccord:closed</li>
                     <li><b>WfDay:</b> swday:changed</li>
                  </ul>
               </div>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-globe Taler f20"></i> Eventos Globais</h4>
               <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #2e7d32; margin-top: 0;"><i class="wf wf-check Taler f20"></i> Eventos do Sistema</h5>
                  <ul style="color: #2e7d32; margin: 0;">
                     <li><b>webfull-ready:</b> Sistema carregado</li>
                     <li><b>resize:</b> Redimensionamento</li>
                     <li><b>scroll:</b> Scroll da página</li>
                     <li><b>DOM:</b> Mudanças no DOM</li>
                  </ul>
               </div>
            </div>
         </div>

         <!-- 3. Proteção BULLETPROOF -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #ff5722"><i class="wf wf-shield Taler f30"></i> 3. Proteção BULLETPROOF</h3>
               <p>O WfContainer oferece <b>proteção total</b> contra problemas comuns:</p>
               <div style="background: var(--bl); border: 1px solid #ff5722; padding: 15px; border-radius: 8px; margin: 15px 0;color: var(--color);">
                  <b><i class="wf wf-shield Taler f20"></i> PROTEÇÕES IMPLEMENTADAS:</b> Loops infinitos, execuções simultâneas, erros de JavaScript,
                  performance<br />
                  <b><i class="wf wf-bolt-circle Taler f20"></i> THROTTLING:</b> Mínimo 100ms entre execuções para evitar sobrecarga<br />
                  <b><i class="wf wf-lock Taler f20"></i> CONTROLE:</b> Limite de execuções, contexto de execução, tratamento de erros<br />
                  <b><i class="wf wf-target-lock Taler f20"></i> RESULTADO:</b> JavaScript sempre funcional, sem travamentos ou loops infinitos
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co12-g">
               <h4><i class="wf wf-edit Taler f20"></i> Como Funciona</h4>
               <pre WfCode lang="javascript"><script type="text/plain">
// 1. Proteção contra loops infinitos
const config = {
   maxExecutions: 100,  // Máximo de execuções
   delay: 50,           // Delay entre execuções
   context: 'global'    // Contexto de execução
};

// 2. Proteção contra execuções simultâneas
let isExecuting = false;
let executionCount = 0;

function safeExecute() {
   if (isExecuting || executionCount >= config.maxExecutions) {
      return; // Para execução
   }

   isExecuting = true;
   executionCount++;

   try {
      // Seu código aqui
      callback();
   } catch (error) {
      console.warn('WfContainer: Erro na execução:', error);
   } finally {
      isExecuting = false;
   }
}

// 3. Throttling para performance
let lastExecutionTime = 0;
const minInterval = 100;

function throttledExecute() {
   const now = Date.now();
   if (now - lastExecutionTime >= minInterval) {
      lastExecutionTime = now;
      safeExecute();
   }
}

// 4. Detecção inteligente de mudanças no DOM
const observer = new MutationObserver((mutations) => {
   let shouldExecute = false;

   mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
         for (let node of mutation.addedNodes) {
            if (node.nodeType === 1) { // Element node
               if (node.matches && (
                  node.matches('[WfAjax]') ||
                  node.matches('[WfDiv]') ||
                  node.matches('[WfContainer]') ||
                  node.querySelector('[WfAjax]') ||
                  node.querySelector('[WfDiv]') ||
                  node.querySelector('[WfContainer]')
               )) {
                  shouldExecute = true;
                  break;
               }
            }
         }
      }
   });

   if (shouldExecute) {
      setTimeout(safeExecute, config.delay);
   }
});

// 5. Eventos universais detectados
['swajax:loaded', 'swajax:processed', 'swajax:success', 'swajax:complete',
 'swdiv:loaded', 'swdiv:processed', 'swdiv:success', 'swdiv:complete',
 'webfull-ready', 'wfmodal:opened', 'wfmodal:closed', 'wfaba:changed',
 'wfaccord:opened', 'wfaccord:closed', 'swday:changed'].forEach(event => {
   document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
   });
});
</script></pre>
            </div>
         </div>

         <!-- 4. Vantagens do WfContainer -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #9c27b0">4. Vantagens do WfContainer</h3>
               <p>O WfContainer oferece <b>vantagens únicas</b> para desenvolvimento:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4><i class="wf wf-rocket Taler f20"></i> Universalidade</h4>
               <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #2e7d32; margin-top: 0;"><i class="wf wf-check f30"></i> Funciona em QUALQUER Contexto</h5>
                  <ul style="color: #2e7d32; margin: 0;">
                     <li><b>WfAjax:</b> Conteúdo carregado via AJAX</li>
                     <li><b>WfDiv:</b> Conteúdo carregado internamente</li>
                     <li><b>Componentes:</b> Modais, abas, accordions</li>
                     <li><b>Aninhamento:</b> Até 6 níveis de profundidade</li>
                  </ul>
               </div>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-bulb Taler f20"></i> Casos de Uso</h4>
               <div style="background: #fff3e0; border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #e65100; margin-top: 0;"><i class="wf wf-target-lock f30"></i> Quando Usar WfContainer</h5>
                  <ul style="color: #e65100; margin: 0;">
                     <li><b>JavaScript dinâmico:</b> Código que precisa funcionar sempre</li>
                     <li><b>Event listeners:</b> Adicionar listeners em elementos novos</li>
                     <li><b>Inicialização:</b> Inicializar componentes dinamicamente</li>
                     <li><b>Manipulação DOM:</b> Modificar elementos carregados via AJAX</li>
                  </ul>
               </div>
            </div>
         </div>

         <!-- Resumo Final -->
         <div class="l">
            <div class="co12-g">
               <h3><i class="wf wf-bar-chart Taler f20"></i> Resumo Completo do WfContainer</h3>
               <div style="background: var(--bl); padding: 20px; border-radius: 8px; border-left: 4px solid #4CAF50; color: var(--color)">
                  <h4 style="margin-top: 0; color: var(--color)"><i class="wf wf-shield Taler f20"></i> 5 Funcionalidades Principais:</h4>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0; color: var(--color)">
                     <div>
                        <h5 style="color: #4CAF50; margin: 0 0 8px 0"><i class="wf wf-shield f20"></i> 1. Proteção BULLETPROOF</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Proteção contra loops infinitos</li>
                           <li>Execuções simultâneas controladas</li>
                           <li>Tratamento de erros automático</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #2196F3; margin: 0 0 8px 0"><i class="wf wf-globe f20"></i> 2. Universalidade</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Funciona em QUALQUER contexto</li>
                           <li>WfAjax, WfDiv, componentes</li>
                           <li>Até 6 níveis de aninhamento</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #ff5722; margin: 0 0 8px 0"><i class="wf wf-bolt-circle f20"></i> 3. Performance Otimizada</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Throttling automático</li>
                           <li>Delay configurável</li>
                           <li>Limite de execuções</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #9c27b0; margin: 0 0 8px 0"><i class="wf wf-cog f20"></i> 4. Múltiplas Funções</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>WfContainer (básico)</li>
                           <li>WfContainerElement (elementos)</li>
                           <li>WfContainerMulti (múltiplas ações)</li>
                           <li>WfContainerContext (contexto)</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #ff9800; margin: 0 0 8px 0"><i class="wf wf-target-lock f20"></i> 5. Detecção Inteligente</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Eventos do WfAjax e WfDiv</li>
                           <li>Mudanças no DOM</li>
                           <li>Eventos de componentes</li>
                           <li>Eventos globais do sistema</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<script>
   // WfContainer para demonstrar funcionamento
   WfContainer(() => {
      console.log('WfContainer funcionando na documentação!');
   }, { maxExecutions: 10 });
</script>
