<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfPagetransition</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfPagetransition</li>
        </ol>
      </nav>
    </div>
<section class="swptx">
    <div class="g-xg">
      <div class="l">
        <div class="co12-g">
          <h3>[Transições de páginas/conteúdos]</h3>
          <p>Use transições entre elementos <code>.pt-page</code> dentro de um container <code>.pt-perspective</code>. Controle por JavaScript ou declarativo com <code>WfPageTransition</code>.</p>
        </div>
      </div>
      <!-- Demo principal: 3 páginas + seletor de efeito -->
      <div class="l">
        <div class="co12-g">
          <div class="pt-perspective" id="pt-demo" style="height:500px;border:1px solid var(--wf-border);border-radius:6px;overflow:hidden;background:var(--wf-bg-)">
            <div class="pt-page pt-page-current pageA" data-id="A" style="display:block;padding:18px">Página A<br/><small>Conteúdo inicial</small></div>
            <div class="pt-page pageB" data-id="B" style="padding:18px">Página B<br/><small>Conteúdo secundário</small></div>
            <div class="pt-page pageC" data-id="C" style="padding:18px">Página C<br/><small>Conteúdo final</small></div>
          </div>
          <div style="margin-top:10px;display:flex;gap:10px;align-items:center">
            <label class="label" for="pt-effect">Efeito</label>
            <select id="pt-effect" class="select form-m" style="max-width:240px">
              <option value="moveToLeft">moveToLeft</option>
              <option value="moveToRight">moveToRight</option>
              <option value="moveToTop">moveToTop</option>
              <option value="moveToBottom">moveToBottom</option>
              <option value="fade">fade</option>
              <option value="fadeFromRight">fadeFromRight</option>
              <option value="fadeFromLeft">fadeFromLeft</option>
              <option value="pushToLeft">pushToLeft</option>
              <option value="cubeToLeft">cubeToLeft</option>
              <option value="fall">fall</option>
              <option value="newspaper">newspaper</option>
              <option value="scaleDown">scaleDown</option>
              <option value="flipRight">flipRight</option>
            </select>
            <button class="btn btn-info" onclick="(function(){var eff=document.getElementById('pt-effect').value;var cont='#pt-demo';var pages=Array.from(document.querySelector(cont).querySelectorAll('.pt-page'));var idx=pages.findIndex(p=>p.classList.contains('pt-page-current'));var next=(idx+1)%pages.length;WfPageTransition.transitionTo(cont,next,eff)})()">Próxima</button>
            <button class="btn btn-clar" onclick="(function(){var eff=document.getElementById('pt-effect').value;var cont='#pt-demo';var pages=Array.from(document.querySelector(cont).querySelectorAll('.pt-page'));var idx=pages.findIndex(p=>p.classList.contains('pt-page-current'));var prev=(idx-1+pages.length)%pages.length;WfPageTransition.transitionTo(cont,prev,eff)})()">Anterior</button>
          </div>
        </div>
      </div>
      <!-- Demo declarativa: botões com WfPageTransition -->
      <div class="l">
        <div class="co12-g">
          <div style="margin-top:16px;margin-bottom:6px">Declarativo com <code>WfPageTransition</code>:</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-prin" WfPageTransition data-target="#pt-demo" data-to="A" data-effect="moveToLeft">A (moveToLeft)</button>
            <button class="btn btn-info" WfPageTransition data-target="#pt-demo" data-to="B" data-effect="fade">B (fade)</button>
            <button class="btn btn-secu" WfPageTransition data-target="#pt-demo" data-to="C" data-effect="pushToLeft">C (pushToLeft)</button>
            <button class="btn btn-clar" WfPageTransition data-target="#pt-demo" data-to="B" data-effect="cubeToLeft">B (cubeToLeft)</button>
            <button class="btn btn-aler" WfPageTransition data-target="#pt-demo" data-to="A" data-effect="newspaper">A (newspaper)</button>
          </div>
        </div>
      </div>
      <!-- Código de uso -->
      <div class="l">
        <div class="co12-g">
          <h3>Como usar</h3>
          <pre WfCode WfCode-language="html"><script type="text/plain">
<div class="pt-perspective" id="demo">
  <div class="pt-page pt-page-current" data-id="A">Página A</div>
  <div class="pt-page" data-id="B">Página B</div>
  <div class="pt-page" data-id="C">Página C</div>
</div>

<!-- Declarativo -->
<button WfPageTransition data-target="#demo" data-to="B" data-effect="fade">Ir para B</button>

<!-- JS -->
<script>
  WfPageTransition.transitionTo('#demo', 'C', 'pushToLeft')
<\/script>
          </script></pre>
        </div>
      </div>
  </section>
</section>
<style>
  .pageA{background-color: var(--prin);color: white;}
  .pageB{background-color: var(--secu);color: white;}
  .pageC{background-color: var(--suce);color: white;}
</style>