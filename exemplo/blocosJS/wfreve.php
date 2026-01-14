<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfReve</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfReve</li>
        </ol>
      </nav>
    </div>
    <section class="swrevex">
      <div class="g-xg">
        <div class="l">
          <div class="co12-g">
            <h3>[Revela elemento ao rolar]</h3>
            <p>
              Use <code>WfReve</code> com atributo opcional
              <code>"threshold,animation"</code> (ex.:
              <code>WfReve="400,left"</code>) ou explicitamente com
              <code>WfReve-threshold</code> e <code>WfReve-animation</code>.
            </p>
          </div>
        </div>
        <div class="l">
          <div class="co12-g" style="height: 1200px">
            <div style="margin-bottom: 10px; color: var(--wcolor)">
              Cards fixos no centro começam ocultos e aparecem ao passar dos
              limites:
            </div>
            <div WfReve="300,top" class="swreve-demo" style="top: 50%">
              Apareço após 300px (top)
            </div>
            <div
              WfReve-threshold="350"
              WfReve-animation="bottom"
              class="swreve-demo"
              style="top: calc(50% + 50px)">
              Apareço após 350px (bottom)
            </div>
            <div
              WfReve-threshold="400"
              WfReve-animation="left"
              class="swreve-demo"
              style="top: calc(50% + 100px)">
              Apareço após 400px (left)
            </div>
            <div
              WfReve-threshold="450"
              WfReve-animation="right"
              class="swreve-demo"
              style="top: calc(50% + 150px)">
              Apareço após 450px (right)
            </div>
            <div
              WfReve-threshold="500"
              WfReve-animation="fade"
              class="swreve-demo"
              style="top: calc(50% + 200px)">
              Apareço após 500px (fade)
            </div>
            <style>
              .swreve-demo {
                position: fixed;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9998;
                background: var(--wf-bg-);
                color: var(--wcolor);
                border: 1px solid var(--wf-border);
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 6px 18px var(--wshadow--);
              }
            </style>
            <div style="margin-top: 12px; display: flex; gap: 8px">
              <button
                class="btn btn-prin"
                onclick="window.scrollTo({top: 320, behavior: 'smooth'})">
                Rolar 320px
              </button>
              <button
                class="btn btn-info"
                onclick="window.scrollTo({top: 520, behavior: 'smooth'})">
                Rolar 520px
              </button>
              <button
                class="btn btn-clar"
                onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                Voltar topo
              </button>
            </div>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Cards fixos no centro -->
<div WfReve="300,top" class="swreve-demo" style="position:fixed; left:50%; top:50%; transform:translateX(-50%)">Apareço após 300px</div>
<div WfReve-threshold="400" WfReve-animation="left" class="swreve-demo" style="position:fixed; left:50%; top:calc(50% + 100px); transform:translateX(-50%)">Apareço após 400px</div>
</script>
</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div
    style="
    position: fixed;
    right: 12px;
    bottom: 12px;
    z-index: 9999;
    background: var(--wf-bg-);
    border: 1px solid var(--wf-border);
    border-radius: 8px;
    padding: 8px;
    display: flex;
    gap: 6px;
    box-shadow: 0 4px 12px var(--wshadow--);
  ">
    <button
      class="btn btn-clar"
      onclick="window.scrollTo({top:0,behavior:'smooth'})">
      ↑ Topo
    </button>
    <button
      class="btn btn-prin"
      onclick="window.scrollTo({top:300,behavior:'smooth'})">
      300px
    </button>
    <button
      class="btn btn-info"
      onclick="window.scrollTo({top:500,behavior:'smooth'})">
      500px
    </button>
    <button
      class="btn btn-suce"
      onclick="window.scrollTo({top:1000,behavior:'smooth'})">
      1000px
    </button>
</section>