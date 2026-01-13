<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfAjax</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfAjax</li>
        </ol>
      </nav>
    </div>
<section class="wfajaxx">
    <div class="g-xg">
      <!-- Cabeçalho do Componente -->
      <div class="l">
        <div class="co12-g">
          <h3>[Sistema AJAX Avançado]</h3>
          <p>
            O <b>WfAjax</b> é o sistema oficial de AJAX do WEBFULL
            Framework. Oferece requisições AJAX com 30 animações, múltiplos
            temas e integração total com o sistema de temas.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b
              ><i class="wf wf-fast-forward-circle Taler f20"></i>
              IMPORTANTE:</b
            >
            Este é o sistema AJAX OFICIAL do WEBFULL!<br />
            <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use
            bibliotecas AJAX de terceiros desnecessárias<br />
            <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use
            WfAjax para consistência e performance
          </div>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b><i class="wf wf-refresh Taler f20"></i> ANIMAÇÕES:</b>
            30 efeitos de transição suaves<br />
            <b><i class="wf wf-palette Taler f20"></i> TEMAS:</b>
            Integração total com Day, Night e Auto<br />
            <b><i class="wf wf-award Taler f20"></i> PERFORMANCE:</b>
            Requisições otimizadas e cache inteligente<br />
            <b
              ><i class="wf wf-cog Taler f20"></i> CONFIGURÁVEL:</b
            >
            Timeout, retry, SEO e auto-loading<br />
            <b><i class="wf wf-mobile Taler f20"></i> RESPONSIVO:</b>
            Funciona perfeitamente em todos os dispositivos
          </div>
        </div>
      </div>

      <!-- 1. AJAX Externo -->
      <div class="l">
        <div class="co12-g">
          <h3>1. AJAX Externo</h3>
          <p>
            Carrega conteúdo de arquivos externos (HTML, JSON, APIs) com
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
            <button
              class="btn btnajax Bazul10 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'fade'})"
            >
              Fade
            </button>
            <button
              class="btn btnajax Bazul9 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'fadeLeft'})"
            >
              FadeLeft
            </button>
            <button
              class="btn btnajax Bazul8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'fadeRight'})"
            >
              FadeRight
            </button>
            <button
              class="btn btnajax Bazul7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'fadeTop'})"
            >
              FadeTop
            </button>
            <button
              class="btn btnajax Bazul6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'fadeBottom'})"
            >
              FadeBottom
            </button>
            <button
              class="btn btnajax Blima9 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'slideTop'})"
            >
              SlideTop
            </button>
            <button
              class="btn btnajax Blima8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-4.html', dest: 'ajaxContent01', effect: 'slideBottom'})"
            >
              SlideBottom
            </button>
            <button
              class="btn btnajax Broxo8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'bounce'})"
            >
              Bounce
            </button>
            <button
              class="btn btnajax Bindi6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'shake'})"
            >
              Shake
            </button>
            <button
              class="btn btnajax Bverd8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'pulse'})"
            >
              Pulse
            </button>
            <button
              class="btn btnajax Bpedr8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'rotate'})"
            >
              Rotate
            </button>
            <button
              class="btn btnajax Bcinz7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'scale'})"
            >
              Scale
            </button>
            <button
              class="btn btnajax Bverm6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'wobble'})"
            >
              Wobble
            </button>
            <button
              class="btn btnajax Bamar6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'rubberBand'})"
            >
              RubberBand
            </button>
            <button
              class="btn btnajax Bpedr7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'lightSpeed'})"
            >
              LightSpeed
            </button>
            <button
              class="btn btnajax Bcinz6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'hinge'})"
            >
              Hinge
            </button>
            <button
              class="btn btnajax Bverm5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'rollIn'})"
            >
              RollIn
            </button>
            <button
              class="btn btnajax Bcora4 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'jackInTheBox'})"
            >
              JackInTheBox
            </button>
            <button
              class="btn btnajax Bamar5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'heartBeat'})"
            >
              HeartBeat
            </button>
            <button
              class="btn btnajax Bpedr6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'jello'})"
            >
              Jello
            </button>
            <button
              class="btn btnajax Bcinz5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'ajaxContent01', effect: 'flipInX'})"
            >
              FlipInX
            </button>
            <button
              class="btn btnajax Bverm4 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'ajaxContent01', effect: 'flipInY'})"
            >
              FlipInY
            </button>
            <button
              class="btn btnajax Bverm3 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'ajaxContent01', effect: 'fadeInDown'})"
            >
              FadeInDown
            </button>
            <button
              class="btn btnajax Bverm6 Tbran"
              onclick="WfAjax.load({url: './arquivo-inexistente.html', dest: 'ajaxContent01'})"
            >
              Teste de Erro
            </button>
          </div>
          <!-- Espaço separador -->
          <div style="width: 100%;">
            <h3 class="ef1">Com Tags</h3>
          </div>
          <div class="btns">
            <!-- Botões com Chamadas por Tags -->
            <button
              class="btn btnajax Bazul10 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fade"
            >
              Fade
            </button>
            <button
              class="btn btnajax Bazul9 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fadeLeft"
            >
              FadeLeft
            </button>
            <button
              class="btn btnajax Bazul8 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fadeRight"
            >
              FadeRight
            </button>
            <button
              class="btn btnajax Bazul7 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fadeTop"
            >
              FadeTop
            </button>
            <button
              class="btn btnajax Bazul6 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fadeBottom"
            >
              FadeBottom
            </button>
            <button
              class="btn btnajax Blima8 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="slideLeft"
            >
              SlideLeft
            </button>
            <button
              class="btn btnajax Blima7 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="slideRight"
            >
              SlideRight
            </button>
            <button
              class="btn btnajax Blima6"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="slideTop"
            >
              SlideTop
            </button>
            <button
              class="btn btnajax Blima5"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="slideBottom"
            >
              SlideBottom
            </button>
            <button
              class="btn btnajax Broxo8 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="zoom"
            >
              Zoom
            </button>
            <button
              class="btn btnajax Brose7 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="bounce"
            >
              Bounce
            </button>
            <button
              class="btn btnajax Bindi6 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="flip"
            >
              Flip
            </button>
            <button
              class="btn btnajax Bverd8 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="shake"
            >
              Shake
            </button>
            <button
              class="btn btnajax Bcora6"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="pulse"
            >
              Pulse
            </button>
            <button
              class="btn btnajax Bamar6"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="elastic"
            >
              Elastic
            </button>
            <button
              class="btn btnajax Bpedr8 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="swing"
            >
              Swing
            </button>
            <button
              class="btn btnajax Bcinz7 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="rotate"
            >
              Rotate
            </button>
            <button
              class="btn btnajax Bverm6 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="scale"
            >
              Scale
            </button>
            <button
              class="btn btnajax Bcora5"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="wobble"
            >
              Wobble
            </button>
            <button
              class="btn btnajax Bamar6"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="tada"
            >
              Tada
            </button>
            <button
              class="btn btnajax Bpedr7 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="rubberBand"
            >
              RubberBand
            </button>
            <button
              class="btn btnajax Bcinz6 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="lightSpeed"
            >
              LightSpeed
            </button>
            <button
              class="btn btnajax Bverm5 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="hinge"
            >
              Hinge
            </button>
            <button
              class="btn btnajax Bcora4 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="rollIn"
            >
              RollIn
            </button>
            <button
              class="btn btnajax Bamar5 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="jackInTheBox"
            >
              JackInTheBox
            </button>
            <button
              class="btn btnajax Bpedr6 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="heartBeat"
            >
              HeartBeat
            </button>
            <button
              class="btn btnajax Bcinz5 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="jello"
            >
              Jello
            </button>
            <button
              class="btn btnajax Bverm4 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-1.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="flipInX"
            >
              FlipInX
            </button>
            <button
              class="btn btnajax Bverm3 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-2.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="flipInY"
            >
              FlipInY
            </button>
            <button
              class="btn btnajax Bverm2 Tbran"
              WfAjax
              WfAjax-url="exemplo/blocosTestes/teste-ajax-3.html"
              WfAjax-dest="ajaxContent01"
              WfAjax-effect="fadeInDown"
            >
              FadeInDown
            </button>
          </div>
        </div>
        <div class="co6-g">
          <br /><br /><br />
          <div
            id="ajaxContent01"
            style="
              min-height: 150px;
              border: 2px dashed #2196f3;
              border-radius: 8px;
              padding: 20px;
              background: transparent;
              text-align: center;
            "
          >
            <h3 style="color: #666; margin-bottom: 10px">Área AJAX Externo</h3>
            <p style="color: #888">
              Clique nos botões acima para carregar conteúdo externo!
            </p>
            <h3>Código de Exemplo</h3>
            <pre
              WfCode
              WfCode-language="html"
              style="text-align: left"
            ><script type="text/plain">
<!-- 1. Com JavaScript (onclick) -->
<button
   onclick="WfAjax.load({
      url: './teste-ajax-1.html',
      dest: 'ajaxContent',
      effect: 'elastic'
   })">
   Carregar com JS
</button>

<!-- 2. Com Atributos HTML -->
<button WfAjax
   WfAjax-url="pagina.html"
   WfAjax-dest="container"
   WfAjax-effect="slideTop">
  Carregar com HTML
</button>

<!-- 3. Container de destino -->
<div id="container">
  <!-- Conteúdo aparecerá aqui -->
</div>

<!-- 4. Div iniciar com um Ajax -->
<div
  id="container"
  WfAjax
  WfAjax-effect="fade"
  WfAjax-url="./pagina.html"
></div>

<!-- 5. IMPORTANTE: WfAjax com Tags -->
<!-- Para que o WfAjax funcione com tags, o elemento DEVE ter o atributo WfAjax -->
<!-- O sistema automaticamente adiciona event listeners de clique -->
<button WfAjax WfAjax-url="pagina.html" WfAjax-dest="container">
   Botão com Tags
</button>
</script>
</pre>

            <div
              style="
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
              "
            >
              <h5 style="color: #856404; margin-top: 0">
                <i class="wf wf-warning"></i> IMPORTANTE - WfAjax com Tags
              </h5>
              <p style="color: #856404; margin-bottom: 10px">
                <b>Para que o WfAjax funcione com atributos HTML:</b>
              </p>
              <ul style="color: #856404; margin: 0">
                <li>
                  O elemento <b>DEVE</b> ter o atributo
                  <code>WfAjax</code>
                </li>
                <li>
                  O sistema automaticamente adiciona event listeners de clique
                </li>
                <li>
                  Se não funcionar, verifique se o elemento tem o atributo
                  <code>WfAjax</code>
                </li>
                <li>
                  O WfAjax é inicializado automaticamente pelo
                  <code>webfull.js</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br /><br />

      <!-- 3. Carregamento Automático -->
      <div class="l">
        <div class="co12-g">
          <h3 style="color: #f57c00">
            3. Carregamento Automático
          </h3>
          <p>
            Carrega conteúdo <b>automaticamente</b> ao abrir a página,
            sem interação do usuário:
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>Código de Exemplo</h3>
          <pre WfCode WfCode-language="html"><script type="text/plain">
<!-- 1. Carregamento automático com atributo -->
<div WfAjax-url="conteudo.html"
     WfAjax-dest="container"
     WfAjax-effect="fade"
     WfAjax-auto="true">
</div>

<!-- 2. Carregamento automático de DIV interna -->
<div WfAjax-div="conteudo-inicial"
     WfAjax-dest="container"
     WfAjax-effect="slideTop"
     WfAjax-auto="true">
</div>

<!-- 3. JavaScript com delay -->
<script>
setTimeout(() => {
  WfAjax.load({
    url: 'dados.json',
    dest: 'container',
    effect: 'zoom'
  });
}, 2000); // 2 segundos de delay
<\/script>

<!-- 4. IMPORTANTE: Carregamento Automático NÃO precisa do atributo WfAjax -->
<!-- O atributo WfAjax-auto="true" é suficiente para carregamento automático -->
<!-- O atributo WfAjax é necessário apenas para elementos clicáveis -->
</script></pre>
        </div>
        <div class="co6-g">
          <h3>
            <i class="wf wf-video Taler f20"></i> Demonstração
          </h3>
          <div
            id="auto-demo"
            style="
              min-height: 120px;
              border: 2px dashed #ff9800;
              border-radius: 8px;
              padding: 15px;
              background: transparent;
              text-align: center;
            "
          >
            <h5 style="color: #666; margin-bottom: 8px">
              <i class="wf wf-magic-wand"></i> Área de Carregamento Automático
            </h5>
            <p style="color: #888; font-size: 14px">
              Esta área pode ser configurada para carregar automaticamente!
            </p>
          </div>

          <div
            style="
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin-top: 15px;
            "
          >
            <h5 style="color: #856404; margin-top: 0">
              <i class="wf wf-info-circle Taler f20"></i> DIFERENÇA: WfAjax vs
              WfAjax-auto
            </h5>
            <ul style="color: #856404; margin: 0; font-size: 14px">
              <li>
                <b>WfAjax:</b> Para elementos clicáveis (botões,
                links)
              </li>
              <li>
                <b>WfAjax-auto="true":</b> Para carregamento
                automático (não precisa do atributo WfAjax)
              </li>
              <li>
                <b>Carregamento automático:</b> Funciona apenas com
                WfAjax-auto="true"
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 4. Re-inicialização de Componentes -->
      <div class="l">
        <div class="co12-g">
          <h3 style="color: #4caf50">
            <i class="wf wf-wrench Taler f30"></i> 4. Re-inicialização de
            Componentes
          </h3>
          <p>
            O WfAjax <b>re-inicializa automaticamente</b> outros
            componentes no conteúdo carregado:
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #4caf50;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b
              ><i class="wf wf-wrench Taler f20"></i> TODOS OS 48 COMPONENTES
              SUPORTADOS:</b
            >
            WfCode, WfAba, WfAlert, WfSidebar, WfModal, WfValid, WfMasc,
            WfTable, WfPag, WfAccord, WfPanel, WfNav, WfFile, WfImg, WfLazy,
            WfAnime, WfText, WfTextarea, WfTextLimit, WfSelect, WfSenha,
            WfSlid1, WfSlid2, WfSpy, WfTable1, WfContainer, WfBack, WfCalendar,
            WfComponentTemplate, WfCotacao, WfDiv, WfDrop, WfFile1, WfFile2,
            WfImg, WfLoad, WfMove, WfNolink, WfPageTransition, WfPagInfinite,
            WfPanelAjax, WfParallax, WfPreLoad, WfTool, WfTop, WfType, WfMix<br />
            <b
              ><i class="wf wf-cloud-lightning Taler f20"></i>
              FUNCIONAMENTO:</b
            >
            Após carregar conteúdo AJAX, TODOS os componentes são inicializados
            automaticamente<br />
            <b
              ><i class="wf wf-target-lock Taler f20"></i> RESULTADO:</b
            >
            Qualquer componente funciona perfeitamente em conteúdo carregado
            dinamicamente
          </div>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>
            <i class="wf wf-edit Taler f30"></i> Como Funciona
          </h3>
          <pre WfCode WfCode-language="javascript"><script type="text/plain">
// O WfAjax automaticamente executa:
// 1. Carrega o conteúdo
// 2. Aplica a animação
// 3. Re-inicializa TODOS os 48 componentes:

const allComponents = [
  'WfAba', 'WfAccord', 'WfAnime', 'WfBack', 'WfCalendar', 'WfComponentTemplate',
  'WfContainer', 'WfCotacao', 'WfDay', 'WfDiv', 'WfDrop', 'WfFile1', 'WfFile2',
  'WfImg', 'WfLazy', 'WfLoad', 'WfMasc', 'WfMix', 'WfModal', 'WfMove',
  'WfNav', 'WfNolink', 'WfPag', 'WfPageTransition', 'WfPagInfinite', 'WfPanel',
  'WfPanelAjax', 'WfParallax', 'WfPreLoad', 'WfSelect', 'WfSenha', 'WfSlid1',
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
          <h3>
            <i class="wf wf-video Taler f26"></i> Demonstração
          </h3>
          <div class="btns">
            <button
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-componentes-1.html', dest: 'component-demo', effect: 'fade'})"
              class="btn Bprin Tbran"
            >
              <i class="wf wf-refresh f26"></i> Carregar com WfCode
            </button>
            <button
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-componentes-2.html', dest: 'component-demo', effect: 'slideTop'})"
              class="btn Bsecu Tbran"
            >
              <i class="wf wf-refresh f26"></i> Carregar com WfAba
            </button>
            <button
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-accord-1.html?t=' + Date.now(), dest: 'component-demo', effect: 'fade'})"
              class="btn Baler Tbran"
            >
              <i class="wf wf-refresh f26"></i> Carregar com WfAccord
            </button>
          </div>
          <div
            id="component-demo"
            style="
              min-height: 120px;
              border: 2px dashed #4caf50;
              border-radius: 8px;
              padding: 15px;
              background: transparent;
              text-align: center;
              margin-top: 15px;
            "
          >
            <h5 style="color: #666; margin-bottom: 8px">
              <i class="wf wf-wrench Taler f20"></i> Área de Teste de
              Componentes
            </h5>
            <p style="color: #888; font-size: 14px">
              Carregue conteúdo para ver WfCode e WfAba funcionando!
            </p>
          </div>
        </div>
      </div>

      <!-- 3. Todas as Animações Disponíveis -->
      <div class="l">
        <div class="co12-g">
          <h3 style="color: #9c27b0">
            5. Todas as Animações Disponíveis
          </h3>
          <p>
            O WfAjax oferece <b>30 animações diferentes</b> para
            transições suaves e elegantes:
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3>
            <i class="wf wf-refresh Taler f30"></i> Animações Fade (5)
          </h3>
          <div class="btns">
            <button
              class="btn btn-sm Bazul10 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'fade'})"
            >
              Fade
            </button>
            <button
              class="btn btn-sm Bazul9 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'fadeLeft'})"
            >
              FadeLeft
            </button>
            <button
              class="btn btn-sm Bazul8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'fadeRight'})"
            >
              FadeRight
            </button>
            <button
              class="btn btn-sm Bazul7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'fadeTop'})"
            >
              FadeTop
            </button>
            <button
              class="btn btn-sm Bazul6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'fadeBottom'})"
            >
              FadeBottom
            </button>
          </div>

          <h3>
            <i class="wf wf-ruler Taler f30"></i> Animações Slide (4)
          </h3>
          <div class="btns">
            <button
              class="btn btn-sm Blima10 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'slideLeft'})"
            >
              SlideLeft
            </button>
            <button
              class="btn btn-sm Blima9 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'slideRight'})"
            >
              SlideRight
            </button>
            <button
              class="btn btn-sm Blima8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'slideTop'})"
            >
              SlideTop
            </button>
            <button
              class="btn btn-sm Blima7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'slideBottom'})"
            >
              SlideBottom
            </button>
          </div>

          <h3>
            <i class="wf wf-target-lock Taler f30"></i> Animações Básicas (9)
          </h3>
          <div class="btns">
            <button
              class="btn btn-sm Broxo10 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'zoom'})"
            >
              Zoom
            </button>
            <button
              class="btn btn-sm Brose9 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'bounce'})"
            >
              Bounce
            </button>
            <button
              class="btn btn-sm Bindi8 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'flip'})"
            >
              Flip
            </button>
            <button
              class="btn btn-sm Bverd7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'shake'})"
            >
              Shake
            </button>
            <button
              class="btn btn-sm Bcora6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'pulse'})"
            >
              Pulse
            </button>
            <button
              class="btn btn-sm Bamar5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'elastic'})"
            >
              Elastic
            </button>
            <button
              class="btn btn-sm Bpedr4 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'swing'})"
            >
              Swing
            </button>
            <button
              class="btn btn-sm Bcinz3 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'rotate'})"
            >
              Rotate
            </button>
            <button
              class="btn btn-sm Bverm2 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'scale'})"
            >
              Scale
            </button>
          </div>

          <h3>
            <i class="wf wf-book-content Taler f30"></i> Animações Avançadas
            (12)
          </h3>
          <div class="btns">
            <button
              class="btn btn-sm Bcora5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'wobble'})"
            >
              Wobble
            </button>
            <button
              class="btn btn-sm Bamar6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'tada'})"
            >
              Tada
            </button>
            <button
              class="btn btn-sm Bpedr7 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'rubberBand'})"
            >
              RubberBand
            </button>
            <button
              class="btn btn-sm Bcinz6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'lightSpeed'})"
            >
              LightSpeed
            </button>
            <button
              class="btn btn-sm Bverm5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'hinge'})"
            >
              Hinge
            </button>
            <button
              class="btn btn-sm Bcora4 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'rollIn'})"
            >
              RollIn
            </button>
            <button
              class="btn btn-sm Bamar5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'jackInTheBox'})"
            >
              JackInTheBox
            </button>
            <button
              class="btn btn-sm Bpedr6 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'jello'})"
            >
              Jello
            </button>
            <button
              class="btn btn-sm Bcinz5 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-3.html', dest: 'animacoes-demo', effect: 'flipInX'})"
            >
              FlipInX
            </button>
            <button
              class="btn btn-sm Bverm4 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-1.html', dest: 'animacoes-demo', effect: 'flipInY'})"
            >
              FlipInY
            </button>
            <button
              class="btn btn-sm Bverm3 Tbran"
              onclick="WfAjax.load({url: 'exemplo/blocosTestes/teste-ajax-2.html', dest: 'animacoes-demo', effect: 'fadeInDown'})"
            >
              FadeInDown
            </button>
          </div>
        </div>
        <div class="co6-g">
          <h3>
            <i class="wf wf-video Taler f30"></i> Área de Demonstração
          </h3>
          <div
            id="animacoes-demo"
            style="
              min-height: 200px;
              border: 2px dashed #9c27b0;
              border-radius: 8px;
              padding: 20px;
              background: transparent;
              text-align: center;
            "
          >
            <h5 style="color: var(--wf-color); margin-bottom: 10px">
              <i class="wf wf-magic-wand"></i> Teste Todas as Animações
            </h5>
            <p style="color: var(--wf-color); font-size: 14px">
              Clique nos botões ao lado para ver cada animação em ação!
            </p>
            <div
              style="
                margin-top: 20px;
                padding: 15px;
                background: rgba(156, 39, 176, 0.1);
                border-radius: 6px;
              "
            >
              <b>30 Animações Disponíveis:</b><br />
              <small
                ><b>Fade (5):</b> fade, fadeLeft, fadeRight, fadeTop,
                fadeBottom<br />
                <b>Slide (4):</b> slideLeft, slideRight, slideTop,
                slideBottom<br />
                <b>Básicas (9):</b> zoom, bounce, flip, shake, pulse,
                elastic, swing, rotate, scale<br />
                <b>Avançadas (12):</b> wobble, tada, rubberBand,
                lightSpeed, hinge, rollIn, jackInTheBox, heartBeat, jello,
                flipInX, flipInY, fadeInDown</small
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Resumo Final -->
      <div class="l">
        <div class="co12-g">
          <h3>
            <i class="wf wf-bar-chart Taler f30"></i> Resumo Completo do WfAjax
          </h3>
          <div
            style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2196f3;
              color: var(--wf-color);
            "
          >
            <h3 style="margin-top: 0; color: var(--wf-color)">
              <i class="wf wf-rocket"></i> 4 Funcionalidades Principais:
            </h3>
            <div
              style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 15px 0;
                color: var(--wf-color);
              "
            >
              <div>
                <h5 style="color: #1976d2; margin: 0 0 8px 0">
                  <i class="wf wf-globe f30"></i> 1. AJAX Externo
                </h5>
                <ul style="margin: 0; font-size: 14px">
                  <li>Carrega arquivos HTML, JSON, APIs</li>
                  <li>JavaScript ou atributos HTML</li>
                  <li>30 animações diferentes</li>
                </ul>
              </div>
              <div>
                <h5 style="color: #388e3c; margin: 0 0 8px 0">
                  <i class="wf wf-refresh f30"></i> 2. AJAX Interno
                </h5>
                <ul style="margin: 0; font-size: 14px">
                  <li>Carrega DIVs ocultas da página</li>
                  <li>Performance otimizada</li>
                  <li>Sem requisições HTTP</li>
                </ul>
              </div>
              <div>
                <h5 style="color: #f57c00; margin: 0 0 8px 0">
                  <i class="wf wfs-magic-wand f30"></i> 3. Carregamento
                  Automático
                </h5>
                <ul style="margin: 0; font-size: 14px">
                  <li>Carrega ao abrir a página</li>
                  <li>Experiência imediata</li>
                  <li>Configurável com delay</li>
                </ul>
              </div>
              <div>
                <h5 style="color: #4caf50; margin: 0 0 8px 0">
                  <i class="wf wf-wrench f30"></i> 4. Re-inicialização de
                  Componentes
                </h5>
                <ul style="margin: 0; font-size: 14px">
                  <li>TODOS os 48 componentes funcionam</li>
                  <li>WfCode, WfAba, WfAlert, WfModal, WfSidebar</li>
                  <li>WfValid, WfMasc, WfTable, WfPag, WfContainer</li>
                  <li>E todos os outros componentes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DIVs de conteúdo para demonstração -->
      <div id="demo-conteudo-1" style="display: none">
        <h3>Conteúdo 1 - Fade</h3>
        <p>Este é o primeiro conteúdo que será mostrado com efeito fade.</p>
        <p>O WfAjax permite carregar conteúdo interno de forma dinâmica.</p>
      </div>

      <div id="demo-conteudo-2" style="display: none">
        <h3>Conteúdo 2 - Slide Top</h3>
        <p>Este é o segundo conteúdo que será mostrado com efeito slideTop.</p>
        <p>Perfeito para criar interfaces dinâmicas e interativas.</p>
      </div>

      <div id="demo-conteudo-3" style="display: none">
        <h3>Conteúdo 3 - Bounce</h3>
        <p>Este é o terceiro conteúdo que será mostrado com efeito bounce.</p>
        <p>20 efeitos diferentes disponíveis para suas animações.</p>
      </div>
  </section>
</section>