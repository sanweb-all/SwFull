<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfDiv</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfDiv</li>
        </ol>
      </nav>
    </div>
<section class="wfajaxx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <h3>[Conteúdo Dinâmico]</h3>
               <p>
                  O <b>WfDiv</b> é o sistema oficial de conteúdo dinâmico do WEBFULL Framework. Oferece carregamento de conteúdo via AJAX, múltiplos temas e integração
                  total com o sistema de temas.
               </p>
               <div style="background: var(--w-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b><i class="wf wf-square Taler f20"></i> CONTEÚDO DINÂMICO:</b> Carregamento via AJAX<br />
                  <b><i class="wf wf-palette Taler f20"></i> MÚLTIPLOS TEMAS:</b> Day, Night e Auto com WfDay<br />
                  <b><i class="wf wfs-zap Taler f20"></i> PERFORMANCE:</b> Carregamento otimizado e rápido
               </div>
            </div>
         </div>

         <!-- 1. WfDiv Básico -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #ff5722">1. WfDiv Básico</h3>
               <p>
                  Carrega conteúdo de <b>DIVs ocultas</b> da própria página com
                  <b>JavaScript</b> ou <b>atributos HTML</b>:
               </p>
            </div>
         </div>
         <br />

         <!-- -->
         <div class="l">
            <div class="co6-g">
               <div style="width: 100%;">
                  <h3 class="ef1">Com JavaScript</h3>
               </div>
               <div class="btns">
                  <button class="btn btnajax Bazul10 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'fade'})">Fade</button>
                  <button class="btn btnajax Bazul9 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'fadeLeft'})">FadeLeft</button>
                  <button class="btn btnajax Bazul8 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'fadeRight'})">FadeRight</button>
                  <button class="btn btnajax Bazul7 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'fadeTop'})">FadeTop</button>
                  <button class="btn btnajax Bazul6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'fadeBottom'})">FadeBottom</button>

                  <button class="btn btnajax Blima9 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'slideTop'})">SlideTop</button>
                  <button class="btn btnajax Blima8 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'slideBottom'})">SlideBottom</button>
                  <button class="btn btnajax Blima7 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'slideLeft'})">SlideLeft</button>
                  <button class="btn btnajax Blima6" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'slideRight'})">SlideRight</button>
                  <button class="btn btnajax Blima5" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'zoom'})">Zoom</button>
                  <button class="btn btnajax Broxo8 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'bounce'})">Bounce</button>
                  <button class="btn btnajax Brose7 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'flip'})">Flip</button>
                  <button class="btn btnajax Bindi6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'shake'})">Shake</button>
                  <button class="btn btnajax Bverd8 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'pulse'})">Pulse</button>
                  <button class="btn btnajax Bcora5" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'elastic'})">Elastic</button>
                  <button class="btn btnajax Bamar6" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'swing'})">Swing</button>
                  <button class="btn btnajax Bpedr8 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'rotate'})">Rotate</button>
                  <button class="btn btnajax Bcinz7 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'scale'})">Scale</button>
                  <button class="btn btnajax Bverm6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'wobble'})">Wobble</button>
                  <button class="btn btnajax Bcora5 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'tada'})">Tada</button>
                  <button class="btn btnajax Bamar6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'rubberBand'})">RubberBand</button>
                  <button class="btn btnajax Bpedr7 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'lightSpeed'})">LightSpeed</button>
                  <button class="btn btnajax Bcinz6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'hinge'})">Hinge</button>
                  <button class="btn btnajax Bverm5 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'rollIn'})">RollIn</button>
                  <button class="btn btnajax Bcora4 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'jackInTheBox'})">JackInTheBox</button>
                  <button class="btn btnajax Bamar5 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'heartBeat'})">HeartBeat</button>
                  <button class="btn btnajax Bpedr6 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-3', dest: 'swdivContent01', effect: 'jello'})">Jello</button>
                  <button class="btn btnajax Bcinz5 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-4', dest: 'swdivContent01', effect: 'flipInX'})">FlipInX</button>
                  <button class="btn btnajax Bverm4 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-1', dest: 'swdivContent01', effect: 'flipInY'})">FlipInY</button>
                  <button class="btn btnajax Bverm3 Tbran" onclick="WfDiv.load({div: 'swdiv-conteudo-2', dest: 'swdivContent01', effect: 'fadeInDown'})">FadeInDown</button>
               </div>

               <!-- Espaço separador -->
               <div style="width: 100%;">
                  <h3 class="ef1">Com Tags</h3>
               </div>
               <div class="btns">
                  <!-- Botões com Chamadas por Tags -->
                  <button class="btn btnajax Bazul10 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="fade">Fade</button>
                  <button class="btn btnajax Bazul9 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="fadeLeft">FadeLeft</button>
                  <button class="btn btnajax Bazul8 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="fadeRight">FadeRight</button>
                  <button class="btn btnajax Bazul7 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="fadeTop">FadeTop</button>
                  <button class="btn btnajax Bazul6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="fadeBottom">FadeBottom</button>
                  <button class="btn btnajax Blima8 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="slideLeft">SlideLeft</button>
                  <button class="btn btnajax Blima7 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="slideRight">SlideRight</button>
                  <button class="btn btnajax Blima6" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="slideTop">SlideTop</button>
                  <button class="btn btnajax Blima5" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="slideBottom">SlideBottom</button>
                  <button class="btn btnajax Broxo8 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="zoom">Zoom</button>
                  <button class="btn btnajax Brose7 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="bounce">Bounce</button>
                  <button class="btn btnajax Bindi6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="flip">Flip</button>
                  <button class="btn btnajax Bverd8 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="shake">Shake</button>
                  <button class="btn btnajax Bcora6" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="pulse">Pulse</button>
                  <button class="btn btnajax Bamar6" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="elastic">Elastic</button>
                  <button class="btn btnajax Bpedr8 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="swing">Swing</button>
                  <button class="btn btnajax Bcinz7 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="rotate">Rotate</button>
                  <button class="btn btnajax Bverm6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="scale">Scale</button>
                  <button class="btn btnajax Bcora5 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="wobble">Wobble</button>
                  <button class="btn btnajax Bamar6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="tada">Tada</button>
                  <button class="btn btnajax Bpedr7 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="rubberBand">RubberBand</button>
                  <button class="btn btnajax Bcinz6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="lightSpeed">LightSpeed</button>
                  <button class="btn btnajax Bverm5 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="hinge">Hinge</button>
                  <button class="btn btnajax Bcora4 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="rollIn">RollIn</button>
                  <button class="btn btnajax Bamar5 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="jackInTheBox">JackInTheBox</button>
                  <button class="btn btnajax Bpedr6 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="heartBeat">HeartBeat</button>
                  <button class="btn btnajax Bcinz5 Tbran" WfDiv WfDiv-div="swdiv-conteudo-3" WfDiv-dest="swdivContent01" WfDiv-effect="jello">Jello</button>
                  <button class="btn btnajax Bverm4 Tbran" WfDiv WfDiv-div="swdiv-conteudo-4" WfDiv-dest="swdivContent01" WfDiv-effect="flipInX">FlipInX</button>
                  <button class="btn btnajax Bverm3 Tbran" WfDiv WfDiv-div="swdiv-conteudo-1" WfDiv-dest="swdivContent01" WfDiv-effect="flipInY">FlipInY</button>
                  <button class="btn btnajax Bverm2 Tbran" WfDiv WfDiv-div="swdiv-conteudo-2" WfDiv-dest="swdivContent01" WfDiv-effect="fadeInDown">FadeInDown</button>
               </div>
            </div>
            <div class="co6-g">
               <br /><br /><br />
               <div id="swdivContent01" style="min-height: 150px; border: 2px dashed #ff5722; border-radius: 8px; padding: 20px; background: transparent; text-align: center">
                  <h4 style="color: #666; margin-bottom: 10px">Área WfDiv - AJAX Interno</h4>
                  <p style="color: #888">Clique nos botões acima para carregar conteúdo de DIVs locais!</p>
                  <h4>Código de Exemplo</h4>
                  <pre WfCode WfCode-language="html" style="text-align: left"><script type="text/plain">
<!-- 1. DIVs de conteúdo ocultas -->
<div id="conteudo-1" style="display: none;">
   <h3>Conteúdo 1</h3>
   <p>Este conteúdo será mostrado dinamicamente.</p>
</div>

<div id="conteudo-2" style="display: none;">
   <h3>Conteúdo 2</h3>
   <p>Outro conteúdo para demonstração.</p>
</div>

<!-- 2. Com JavaScript (onclick) -->
<button onclick="WfDiv.load({
   div: 'conteudo-1',
   dest: 'container',
   effect: 'fade'
})">
   Carregar com JS
</button>

<!-- 3. Com Atributos HTML -->
<button WfDiv
   WfDiv-div="conteudo-2"
   WfDiv-dest="container"
   WfDiv-effect="slideTop">
   Carregar com HTML
</button>

<!-- 4. Container de destino -->
<div id="container">
   <!-- Conteúdo aparecerá aqui -->
</div>

<!-- 5. IMPORTANTE: WfDiv com Tags -->
<!-- Para que o WfDiv funcione com tags, o elemento DEVE ter o atributo WfDiv -->
<!-- O sistema automaticamente adiciona event listeners de clique -->
<button WfDiv WfDiv-div="conteudo-1" WfDiv-dest="container">
   Botão com Tags
</button>
</script></pre>

                  <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                     <h5 style="color: #856404; margin-top: 0;"><i class="wf wf-error Taler f20"></i> IMPORTANTE - WfDiv com Tags</h5>
                     <p style="color: #856404; margin-bottom: 10px;"><b>Para que o WfDiv funcione com atributos HTML:</b></p>
                     <ul style="color: #856404; margin: 0;">
                        <li>O elemento <b>DEVE</b> ter o atributo <code>WfDiv</code></li>
                        <li>O sistema automaticamente adiciona event listeners de clique</li>
                        <li>Se não funcionar, verifique se o elemento tem o atributo <code>WfDiv</code></li>
                        <li>O WfDiv é inicializado automaticamente pelo <code>webfull.js</code></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <br /><br />

         <!-- 2. Carregamento Automático -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #f57c00">2. Carregamento Automático</h3>
               <p>Carrega conteúdo <b>automaticamente</b> ao abrir a página, sem interação do usuário:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4>Código de Exemplo</h4>
               <pre WfCode WfCode-language="html"><script type="text/plain">
<!-- 1. Carregamento automático com atributo -->
<div WfDiv-div="conteudo-inicial"
     WfDiv-dest="container"
     WfDiv-effect="fade"
     WfDiv-auto="true">
</div>

<!-- 2. JavaScript com delay -->
<script>
setTimeout(() => {
  WfDiv.load({
    div: 'conteudo-padrao',
    dest: 'container',
    effect: 'zoom'
  });
}, 2000); // 2 segundos de delay
</script>

<!-- 3. IMPORTANTE: Carregamento Automático NÃO precisa do atributo WfDiv -->
<!-- O atributo WfDiv-auto="true" é suficiente para carregamento automático -->
<!-- O atributo WfDiv é necessário apenas para elementos clicáveis -->
</script></pre>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-video Taler f20"></i> Demonstração</h4>
               <div id="swdiv-auto-demo" style="min-height: 120px; border: 2px dashed #ff9800; border-radius: 8px; padding: 15px; background: transparent; text-align: center">
                  <h5 style="color: #666; margin-bottom: 8px"><i class="wf wf-bolt-circle Taler f20"></i> Área de Carregamento Automático</h5>
                  <p style="color: #888; font-size: 14px">Esta área pode ser configurada para carregar automaticamente!</p>
               </div>

               <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 15px;">
                  <h5 style="color: #856404; margin-top: 0;"><i class="wf wf-info-circle Taler f20"></i> DIFERENÇA: WfDiv vs WfDiv-auto</h5>
                  <ul style="color: #856404; margin: 0; font-size: 14px;">
                     <li><b>WfDiv:</b> Para elementos clicáveis (botões, links)</li>
                     <li><b>WfDiv-auto="true":</b> Para carregamento automático (não precisa do atributo WfDiv)</li>
                     <li><b>Carregamento automático:</b> Funciona apenas com WfDiv-auto="true"</li>
                  </ul>
               </div>
            </div>
         </div>

         <!-- 3. Re-inicialização de Componentes -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #4caf50"><i class="wf wf-wrench Taler f20"></i> 3. Re-inicialização de Componentes</h3>
               <p>O WfDiv <b>re-inicializa automaticamente</b> outros componentes no conteúdo carregado:</p>
               <div style="background: var(--wf-bg-); border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0;color: var(--color);">
                  <b><i class="wf wf-wrench Taler f20"></i> TODOS OS 48 COMPONENTES SUPORTADOS:</b> WfCode, WfAba, WfAlert, WfSidebar, WfModal, WfValid, WfMasc,
                  WfTable, WfPag,
                  WfAccord, WfPanel, WfNav,
                  WfFile, WfImg, WfLazy, WfAnime, WfText, WfTextarea, WfTextLimit, WfSelect, WfSenha, WfSlid1, WfSlid2, WfSpy, WfTable1, WfContainer, WfBack, WfCalendar,
                  WfComponentTemplate, WfCotacao, WfDiv, WfDrop, WfFile1, WfFile2, WfImg, WfLoad, WfMove, WfNolink, WfPageTransition, WfPagInfinite, WfPanel1, WfParallax,
                  WfPreLoad, WfTool, WfTop, WfType, WfMix<br />
                  <b><i class="wf wf-bulb Taler f20"></i> FUNCIONAMENTO:</b> Após carregar conteúdo interno, TODOS os componentes são inicializados
                  automaticamente<br />
                  <b><i class="wf wf-target-lock Taler f20"></i> RESULTADO:</b> Qualquer componente funciona perfeitamente em conteúdo carregado dinamicamente
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4><i class="wf wf-edit Taler f20"></i> Como Funciona</h4>
               <pre WfCode WfCode-language="javascript"><script type="text/plain">
// O WfDiv automaticamente executa:
// 1. Carrega o conteúdo da DIV interna
// 2. Aplica a animação
// 3. Re-inicializa TODOS os 48 componentes:

const allComponents = [
  'WfAba', 'WfAccord', 'WfAnime', 'WfBack', 'WfCalendar', 'WfComponentTemplate',
  'WfContainer', 'WfCotacao', 'WfDay', 'WfDiv', 'WfDrop', 'WfFile1', 'WfFile2',
  'WfImg', 'WfLazy', 'WfLoad', 'WfMasc', 'WfMix', 'WfModal', 'WfMove',
  'WfNav', 'WfNolink', 'WfPag', 'WfPageTransition', 'WfPagInfinite', 'WfPanel',
  'WfPanel1', 'WfParallax', 'WfPreLoad', 'WfSelect', 'WfSenha', 'WfSlid1',
  'WfSlid2', 'WfSpy', 'WfTable', 'WfTable1', 'WfText', 'WfTextarea', 'WfTextLimit',
  'WfTool', 'WfTop', 'WfType', 'WfValid'
];

allComponents.forEach(componentName => {
  if (window[componentName] && typeof window[componentName].initAll === 'function') {
    window[componentName].initAll(container);
  }
});
</script></pre>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-video Taler f20"></i> Demonstração</h4>
               <div class="btns">
                  <button onclick="WfDiv.load({div: 'swdiv-componentes-1', dest: 'swdiv-component-demo', effect: 'fade'})" class="btn btn-prin Tbran"><i
                        class="wf wf-refresh f20"></i>
                     Carregar com
                     WfCode</button>
                  <button onclick="WfDiv.load({div: 'swdiv-componentes-2', dest: 'swdiv-component-demo', effect: 'slideTop'})" class="btn btn-secu Tbran"><i
                        class="wf wf-refresh f20"></i> Carregar
                     com
                     WfAba</button>
               </div>
               <div id="swdiv-component-demo"
                  style="min-height: 120px; border: 2px dashed #4caf50; border-radius: 8px; padding: 15px; background: transparent; text-align: center; margin-top: 15px">
                  <h5 style="color: #666; margin-bottom: 8px"><i class="wf wf-wrench"></i> Área de Teste de Componentes</h5>
                  <p style="color: #888; font-size: 14px">Carregue conteúdo para ver WfCode e WfAba funcionando!</p>
               </div>
            </div>
         </div>

         <!-- 4. Vantagens do WfDiv -->
         <div class="l">
            <div class="co12-g">
               <h3 style="color: #9c27b0">4. Vantagens do WfDiv</h3>
               <p>O WfDiv oferece <b>vantagens únicas</b> em relação ao AJAX externo:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h4><i class="wf wf-rocket Taler f20"></i> Performance</h4>
               <div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #2e7d32; margin-top: 0;"><i class="wf wf-bolt-circle Taler f20"></i> Carregamento Instantâneo</h5>
                  <ul style="color: #2e7d32; margin: 0;">
                     <li><b>Sem requisições HTTP:</b> Conteúdo já está na página</li>
                     <li><b>Sem latência de rede:</b> Carregamento imediato</li>
                     <li><b>Sem dependência de servidor:</b> Funciona offline</li>
                     <li><b>Performance otimizada:</b> Ideal para conteúdo estático</li>
                  </ul>
               </div>
            </div>
            <div class="co6-g">
               <h4><i class="wf wf-bulb Taler f20"></i> Casos de Uso</h4>
               <div style="background: #fff3e0; border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <h5 style="color: #e65100; margin-top: 0;"><i class="wf wf-target-lock Taler f20"></i> Quando Usar WfDiv</h5>
                  <ul style="color: #e65100; margin: 0;">
                     <li><b>Conteúdo estático:</b> Textos, imagens, formulários</li>
                     <li><b>Interfaces dinâmicas:</b> Abas, painéis, modais</li>
                     <li><b>Conteúdo pré-carregado:</b> Dados já disponíveis</li>
                     <li><b>Aplicações offline:</b> Funciona sem internet</li>
                  </ul>
               </div>
            </div>
         </div>

         <!-- Resumo Final -->
         <div class="l">
            <div class="co12-g">
               <h3><i class="wf wf-bar-chart Taler f20"></i> Resumo Completo do WfDiv</h3>
               <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #ff5722; color: var(--wf-color)">
                  <h4 style="margin-top: 0; color: var(--wf-color)"><i class="wf wf-rocket Taler f20"></i> 4 Funcionalidades Principais:</h4>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0; color: var(--wf-color)">
                     <div>
                        <h5 style="color: #ff5722; margin: 0 0 8px 0"><i class="wf wf-target-lock f20"></i> 1. AJAX Interno</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Carrega DIVs ocultas da página</li>
                           <li>JavaScript ou atributos HTML</li>
                           <li>30 animações diferentes</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #f57c00; margin: 0 0 8px 0"><i class="wf wf-bolt-circle f20"></i> 2. Carregamento Automático</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Carrega ao abrir a página</li>
                           <li>Experiência imediata</li>
                           <li>Configurável com delay</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #4caf50; margin: 0 0 8px 0"><i class="wf wf-wrench f20"></i> 3. Re-inicialização de Componentes</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>TODOS os 48 componentes funcionam</li>
                           <li>WfCode, WfAba, WfAlert, WfModal</li>
                           <li>WfValid, WfMasc, WfTable, WfPag</li>
                           <li>E todos os outros componentes</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #9c27b0; margin: 0 0 8px 0"><i class="wf wf-bolt-circle f20"></i> 4. Performance Otimizada</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Sem requisições HTTP</li>
                           <li>Carregamento instantâneo</li>
                           <li>Funciona offline</li>
                           <li>Ideal para conteúdo estático</li>
                        </ul>
                     </div>
                     <div>
                        <h5 style="color: #ff9800; margin: 0 0 8px 0"><i class="wf wf-palette f20"></i> 5. Animações Compartilhadas</h5>
                        <ul style="margin: 0; font-size: 14px">
                           <li>Usa as mesmas animações do WfAjax</li>
                           <li>30 efeitos visuais disponíveis</li>
                           <li>Consistência visual no projeto</li>
                           <li>Sem duplicação de código CSS</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- DIVs de conteúdo para demonstração -->
         <div id="swdiv-conteudo-1" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; text-align: center;height: 600px;">
               <h3><i class="wf wf-target"></i> Conteúdo 1 - Fade</h3>
               <p>Este conteúdo foi carregado de uma DIV oculta da página!</p>
               <p><b>Performance:</b> Carregamento instantâneo, sem requisições HTTP.</p>
            </div>
         </div>

         <div id="swdiv-conteudo-2" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 10px; text-align: center;height: 600px;">
               <h3><i class="wf wf-bolt-circle Taler f20"></i> Conteúdo 2 - FadeLeft</h3>
               <p>Outro conteúdo carregado de DIV interna!</p>
               <p><b>Vantagem:</b> Funciona offline, sem dependência de servidor.</p>
            </div>
         </div>

         <div id="swdiv-conteudo-3" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 10px; text-align: center;height: 600px;">
               <h3><i class="wf wf-rocket"></i> Conteúdo 3 - FadeRight</h3>
               <p>Mais um exemplo de conteúdo interno!</p>
               <p><b>Benefício:</b> Ideal para interfaces dinâmicas e interativas.</p>
            </div>
         </div>

         <div id="swdiv-conteudo-4" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 10px; text-align: center;height: 600px;">
               <h3><i class="wf wf-bulb Taler f20"></i> Conteúdo 4 - FadeTop</h3>
               <p>Conteúdo estático pré-carregado!</p>
               <p><b>Uso:</b> Perfeito para abas, painéis e modais.</p>
            </div>
         </div>

         <!-- DIVs para demonstração de componentes -->
         <div id="swdiv-componentes-1" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; text-align: center;height: 600px;">
               <h3><i class="wf wf-wrench"></i> WfCode Re-inicializado!</h3>
               <p>Este conteúdo foi carregado via WfDiv e o <b>WfCode</b> foi re-inicializado automaticamente!</p>

               <div style="margin-top: 20px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: left;">
                  <h4><i class="wf wf-edit"></i> Código JavaScript:</h4>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
// Este código foi carregado via WfDiv
// e o WfCode foi re-inicializado automaticamente!

function exemplo() {
   console.log('WfCode funcionando após WfDiv!');
   return 'Sucesso na re-inicialização!';
}

// Teste a função
exemplo();
                  </script></pre>
               </div>
            </div>
         </div>

         <div id="swdiv-componentes-2" style="display: none;">
            <div style="padding: 20px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 10px; text-align: center;">
               <h3><i class="wf wf-file Taler f20"></i> WfAba Re-inicializado!</h3>
               <p>Este conteúdo foi carregado via WfDiv e o <b>WfAba</b> foi re-inicializado automaticamente!</p>

               <div style="margin-top: 20px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: left;">
                  <h4><i class="wf wf-list-ul Taler f20"></i> Abas Funcionais:</h4>
                  <div WfAba>
                     <div WfAba-titulo="Informações">Conteúdo da primeira aba com informações sobre WfDiv.</div>
                     <div WfAba-titulo="Código">Aqui você pode ver código de exemplo carregado via WfDiv.</div>
                     <div WfAba-titulo="Configurações">Configurações e opções do componente WfAba funcionando.</div>
                  </div>
               </div>
            </div>
         </div>
  </section>
</section>