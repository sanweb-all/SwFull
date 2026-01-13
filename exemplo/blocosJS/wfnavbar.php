<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfNavbar</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfNavbar</li>
        </ol>
      </nav>
    </div>
    <section class="wfnavbarx">
      <nav
        WfNavbar
        data-theme="dark"
        data-fixed="false"
        data-menu-align="center"
        style="margin-bottom: 12px">
        <div slot="brand"><i class="wf wf-rocket ed1"></i> Webfull</div>
        <button
          class="btn btn-prin navbar-toggle"
          onclick="WfNavbarSideOpen('#navbar-side')">
          <i class="wf wf-menu"></i> Menu
        </button>
        <ul>
          <li><a href="#">Home</a></li>
          <li>
            <a href="#">Docs</a>
            <ul>
              <li><a href="#">Guia</a></li>
              <li><a href="#">Componentes</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Mais</a>
            <ul>
              <li>
                <a href="#">Submenu</a>
                <ul>
                  <li><a href="#">Item A</a></li>
                  <li><a href="#">Item B</a></li>
                </ul>
              </li>
              <li><a href="#">Item 2</a></li>
            </ul>
          </li>
        </ul>
        <div slot="search">
          <input
            type="text"
            class="input"
            placeholder="Buscar"
            style="height: 32px" />
        </div>
        <img slot="avatar" src="exemplo/images/sw.png" alt="avatar" />
      </nav>



      <div class="g-xg">
        <style>
          [WfNavbar] .navbar-toggle {
            display: none;
          }

          @media (max-width: 900px) {
            [WfNavbar] .navbar-toggle {
              display: inline-flex;
              align-items: center;
              gap: 0.4rem;
            }

            [WfNavbar] ul {
              display: none;
            }
          }

          .wfnavbar-side {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            display: none;
            z-index: 1100;
          }

          .wfnavbar-side.open {
            display: block;
          }

          .wfnavbar-side .panel {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 280px;
            background: var(--wfnavbar-bg);
            color: var(--wfnavbar-color);
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.24);
            padding: 12px;
            overflow-y: auto;
          }

          .wfnavbar-side .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 4px;
            font-weight: 600;
          }

          .wfnavbar-side .nb-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .wfnavbar-side .nb-item {
            border-bottom: 1px solid var(--wfnavbar-border);
          }

          .wfnavbar-side .nb-link {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.8rem;
            color: var(--wfnavbar-color);
            text-decoration: none;
          }

          .wfnavbar-side .nb-link:hover {
            background: var(--wfnavbar-hover);
          }

          .wfnavbar-side .nb-submenu {
            display: none;
            list-style: none;
            margin: 0;
            padding: 0 0 0.8rem 1.6rem;
          }

          .wfnavbar-side .nb-item.open>.nb-submenu {
            display: block;
          }

          .wfnavbar-side .nb-arrow {
            margin-left: auto;
          }
        </style>

        <div class="l">
          <div class="co12-g">
            <h3>[Navbar Responsiva]</h3>
            <p>
              Navbar acessível, com suporte a temas e dropdowns por
              <code>hover</code>/<code>focus</code>. Use o atributo
              <code>WfNavbar</code> no elemento raiz.
            </p>
          </div>
        </div>
        <div class="l">
          <div class="co12-g">
            <div id="navbar-side" class="wfnavbar-side" style="margin-top: 70px">
              <div class="panel">
                <div class="panel-header">
                  <span>Menu</span>
                  <button
                    class="btn btn-clar"
                    onclick="WfNavbarSideClose('#navbar-side')">
                    <i class="wf wf-x"></i>
                  </button>
                </div>
                <nav>
                  <ul class="nb-list">
                    <li class="nb-item">
                      <a href="#" class="nb-link"><i class="wf wf-home"></i><span>Home</span></a>
                    </li>
                    <li class="nb-item">
                      <a
                        href="#"
                        class="nb-link"
                        onclick="WfNavbarToggleSub(this); return false;"><i class="wf wf-folder"></i><span>Docs</span><i class="wf wf-chevron-down nb-arrow"></i></a>
                      <ul class="nb-submenu">
                        <li><a href="#" class="nb-link">Guia</a></li>
                        <li><a href="#" class="nb-link">Componentes</a></li>
                      </ul>
                    </li>
                    <li class="nb-item">
                      <a
                        href="#"
                        class="nb-link"
                        onclick="WfNavbarToggleSub(this); return false;"><i class="wf wf-grid"></i><span>Mais</span><i class="wf wf-chevron-down nb-arrow"></i></a>
                      <ul class="nb-submenu">
                        <li><a href="#" class="nb-link">Item A</a></li>
                        <li><a href="#" class="nb-link">Item B</a></li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>[WfSide - Menu Lateral]</h3>
            <p>
              Observe a barra lateral direita nesta página. Ela foi gerada automaticamente pelo componente <code>WfSide</code>.
              Basta adicionar o atributo <code>WfSide</code> e <code>WfSide-position="right"</code> em um container.
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3>Como Usar</h3>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<nav WfNavbar data-theme="light" data-fixed="true" data-menu-align="left">
  <div slot="brand">Minha Marca</div>
  <button class="btn btn-prin navbar-toggle" onclick="WfNavbarSideOpen('#navbar-side')">Menu</button>
  <ul>
    <li><a href="#">Home</a></li>
    <li>
      <a href="#">Docs</a>
      <ul>
        <li><a href="#">Guia</a></li>
        <li><a href="#">API</a></li>
      </ul>
    </li>
  </ul>
  <div slot="extra">
    <button class="btn btn-sm">Login</button>
  </div>
  <img slot="avatar" src="/assets/images/demo/wf.png" alt="avatar"/>
</nav>
          </script></pre>
          </div>
          <div class="co6-g">
            <h3>Atributos</h3>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Opções/Valores</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>data-theme</code></td>
                  <td>
                    <code>light</code> | <code>dark</code> | <code>custom</code>
                  </td>
                  <td>Tema visual do navbar</td>
                </tr>
                <tr>
                  <td><code>data-brand-align</code></td>
                  <td><code>right</code></td>
                  <td>Move a marca para a direita</td>
                </tr>
                <tr>
                  <td><code>data-fixed</code></td>
                  <td><code>true</code> | <code>false</code></td>
                  <td>Fixa o navbar no topo</td>
                </tr>
                <tr>
                  <td><code>data-overlay</code></td>
                  <td><code>true</code> | <code>false</code></td>
                  <td>Overlay para mobile</td>
                </tr>
                <tr>
                  <td><code>data-menu-align</code></td>
                  <td>
                    <code>left</code> | <code>center</code> | <code>right</code>
                  </td>
                  <td>Alinhamento dos itens do menu</td>
                </tr>
                <tr>
                  <td><code>navbar-toggle</code></td>
                  <td>-</td>
                  <td>
                    Botão mobile que chama
                    <code>WfNavbarSideOpen('#navbar-side')</code>
                  </td>
                </tr>
                <tr>
                  <td><code>slot</code></td>
                  <td>
                    <code>brand</code>, <code>search</code>, <code>extra</code>,
                    <code>avatar</code>
                  </td>
                  <td>Áreas nomeadas para conteúdo adicional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>

  <script>
    function WfNavbarSideOpen(id) {
      var el = typeof id === 'string' ? document.querySelector(id) : id;
      if (!el) return;
      el.classList.add('open')
    }

    function WfNavbarSideClose(id) {
      var el = typeof id === 'string' ? document.querySelector(id) : id;
      if (!el) return;
      el.classList.remove('open')
    }

    function WfNavbarToggleSub(link) {
      var li = link.closest('.nb-item');
      if (!li) return;
      li.classList.toggle('open')
    }
    (function() {
      var side = document.getElementById('navbar-side');
      if (!side) return;
      side.addEventListener('click', function(e) {
        if (e.target === side) WfNavbarSideClose(side)
      })
    })();
  </script>