<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfScrollspy</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfScrollspy</li>
        </ol>
      </nav>
    </div>
    <section class="wfscrollspyx">
      <div class="g-xg">
        <div class="l">
          <div class="co12-g">
            <h3>[Ativa link conforme seção]</h3>
            <p>
              Use <code>WfScrollSpy</code> em um container de navegação com links
              para seções (<code>#id</code>).
            </p>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <nav
              WfScrollSpy
              WfScrollSpy-offset="60"
              class="listmenu"
              style="
              position: sticky;
              top: 10px;
              background: var(--wf-bg-);
              padding: 8px;
              border: 1px solid var(--wf-border);
              border-radius: 6px;
            ">
              <a href="#sec1" class="llistmenu-item">Seção 1</a>
              <a href="#sec2" class="llistmenu-item">Seção 2</a>
              <a href="#sec3" class="llistmenu-item">Seção 3</a>
            </nav>
            <style>
              nav.listmenu {
                display: flex;
                justify-content: center;
                gap: 3rem;
              }

              .listmenu .llistmenu-item {
                transition: color 0.25s ease, background-color 0.25s ease,
                  border-color 0.25s ease;
                padding: 10px;
              }

              .listmenu .llistmenu-item.active {
                color: var(--suce);
                font-weight: 600;
                border-bottom: 2px solid var(--suce);
                background: var(--wf-bg-);
              }

              .spy-section {
                opacity: 0.75;
                transition: opacity 0.35s ease;
              }

              .spy-section.inview {
                opacity: 1;
              }
            </style>
            <div style="margin: 10px 0; display: flex; gap: 8px">
              <button
                class="btn btn-prin"
                onclick="document.getElementById('sec1').scrollIntoView({behavior:'smooth'})">
                Ir Seção 1
              </button>
              <button
                class="btn btn-info"
                onclick="document.getElementById('sec2').scrollIntoView({behavior:'smooth'})">
                Ir Seção 2
              </button>
              <button
                class="btn btn-suce"
                onclick="document.getElementById('sec3').scrollIntoView({behavior:'smooth'})">
                Ir Seção 3
              </button>
            </div>
            <section
              id="sec1"
              class="spy-section"
              style="height: 800px; margin: 12px 0; background: var(--neut3)"></section>
            <section
              id="sec2"
              class="spy-section"
              style="height: 800px; margin: 12px 0; background: var(--neut4)"></section>
            <section
              id="sec3"
              class="spy-section"
              style="height: 800px; margin: 12px 0; background: var(--neut5)"></section>
            <script>
              (function() {
                var nav = document.querySelector("[WfScrollSpy]");
                if (!nav) return;
                nav.addEventListener("click", function(e) {
                  var a = e.target.closest('a[href^="#"]');
                  if (!a) return;
                  e.preventDefault();
                  var id = a.getAttribute("href").slice(1);
                  var el = document.getElementById(id);
                  if (el)
                    el.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                });
              })();
            </script>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <pre WfCode WfCode-language="html"><script type="text/plain">
<nav WfScrollSpy>
  <a href="#sec1">Seção 1</a>
  <a href="#sec2">Seção 2</a>
  <a href="#sec3">Seção 3</a>
</nav>
<section id="sec1"></section>
<section id="sec2"></section>
<section id="sec3"></section>
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
  ">
    <button
      class="btn btn-clar"
      onclick="window.scrollTo({top:0,behavior:'smooth'})">
      ↑ Topo
    </button>
    <button
      class="btn btn-prin"
      onclick="document.getElementById('sec1').scrollIntoView({behavior:'smooth'})">
      Seção 1
    </button>
    <button
      class="btn btn-info"
      onclick="document.getElementById('sec2').scrollIntoView({behavior:'smooth'})">
      Seção 2
    </button>
    <button
      class="btn btn-suce"
      onclick="document.getElementById('sec3').scrollIntoView({behavior:'smooth'})">
      Seção 3
    </button>
</section>