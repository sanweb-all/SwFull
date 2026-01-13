<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfOcult</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfOcult</li>
        </ol>
      </nav>
    </div>
<section class="swocultx">
    <div class="g-xg">
      <div class="l">
        <div class="co12-g">
          <div class="icoTipo aniline-d-g">
            <span WfTool="JavaScript"
              ><i class="wf wf-code-alt"></i> <small>Js</small></span
            >
          </div>
          <h2 class="wfpage">
            WfOcult <small>[Oculta elemento ao rolar]</small>
          </h2>
          <p>
            Oculta um elemento após atingir um limite de rolagem. Ideal para
            esconder banners, botões ou avisos quando o usuário avança na
            página.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid var(--wborder--);
              padding: 12px;
              border-radius: 8px;
              margin: 12px 0;
            "
          >
            <strong>Como usar:</strong>
            <ul class="lista-simples">
              <li>
                Forma curta: <code>WfOcult="threshold,animation"</code> (ex.:
                <code>WfOcult="600,top"</code>)
              </li>
              <li>
                Forma explícita: <code>WfOcult-threshold="600"</code>
                <code>WfOcult-animation="top"</code>
              </li>
              <li>
                Animations: <code>top</code>, <code>bottom</code>,
                <code>left</code>, <code>right</code>, <code>fade</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="l">
        <div class="co12-g">
          <div style="margin: 6px 0 10px; color: var(--wcolor)">
            Exemplos FIXOS no centro da tela:
          </div>
          <div WfOcult="300,top" class="swocult-demo" style="top: 50%">
            Oculto após 300px (top)
          </div>
          <div
            WfOcult-threshold="350"
            WfOcult-animation="bottom"
            class="swocult-demo"
            style="top: calc(50% + 50px)"
          >
            Oculto após 350px (bottom)
          </div>
          <div
            WfOcult-threshold="400"
            WfOcult-animation="left"
            class="swocult-demo"
            style="top: calc(50% + 100px)"
          >
            Oculto após 400px (left)
          </div>
          <div
            WfOcult-threshold="450"
            WfOcult-animation="right"
            class="swocult-demo"
            style="top: calc(50% + 150px)"
          >
            Oculto após 450px (right)
          </div>
          <div
            WfOcult-threshold="500"
            WfOcult-animation="fade"
            class="swocult-demo"
            style="top: calc(50% + 200px)"
          >
            Oculto após 500px (fade)
          </div>
          <style>
            .swocult-demo {
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
        </div>
      </div>
      <div class="l">
        <div class="co12-g" style="height: 1300px">
          <div style="margin-bottom: 10px; color: var(--wcolor)">
            Role ou use os botões. Os cards fixos no centro ocultam ao atingir
            seus limites.
          </div>
          <button WfOcult="300,top" class="btn btn-info">
            Ocultar ao passar 300px (top)
          </button>
          <button
            WfOcult-threshold="500"
            WfOcult-animation="left"
            class="btn btn-aler"
            style="margin-left: 8px"
          >
            Ocultar ao passar 500px (left)
          </button>
          <div style="margin-top: 12px; display: flex; gap: 8px">
            <button
              class="btn btn-prin"
              onclick="window.scrollTo({top: 320, behavior: 'smooth'})"
            >
              Rolar 320px
            </button>
            <button
              class="btn btn-info"
              onclick="window.scrollTo({top: 520, behavior: 'smooth'})"
            >
              Rolar 520px
            </button>
            <button
              class="btn btn-clar"
              onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
            >
              Voltar topo
            </button>
          </div>
        </div>
      </div>
      <div class="l">
        <div class="co12-g">
          <pre WfCode WfCode-language="html"><script type="text/plain">
<!-- Forma curta -->
<button WfOcult="300,top" class="btn btn-info">Ocultar depois de rolar</button>

<!-- Forma explícita -->
<button WfOcult-threshold="500" WfOcult-animation="left" class="btn btn-aler">Ocultar depois de rolar</button>
          </script></pre>
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
  "
>
  <button
    class="btn btn-clar"
    onclick="window.scrollTo({top:0,behavior:'smooth'})"
  >
    ↑ Topo
  </button>
  <button
    class="btn btn-prin"
    onclick="window.scrollTo({top:300,behavior:'smooth'})"
  >
    300px
  </button>
  <button
    class="btn btn-info"
    onclick="window.scrollTo({top:500,behavior:'smooth'})"
  >
    500px
  </button>
  <button
    class="btn btn-suce"
    onclick="window.scrollTo({top:1000,behavior:'smooth'})"
  >
    1000px
  </button>
</section>