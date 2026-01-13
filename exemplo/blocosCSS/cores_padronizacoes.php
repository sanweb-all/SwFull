<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Cores Padronizações</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Cores Padronizações</li>
        </ol>
      </nav>
    </div>
    <div class="l">
      <div class="co6-g">
        <p>
          Depois de muito quebrar a cabeça, eu decidi criar uma padronização de
          cores para facilitar a vida de todos.
        </p>
        <p>
          É um esquema de cores que si for respeitadas lhe ajudara muito no
          desenvolvimento de seus projetos. Principalmente si for trabalhar com
          o WfDay.
        </p>
        <br />
        <p>No WebFull.css, descomente estas linhas e coloque a cor desejada.</p>
        <br />
        <br />
      </div>
      <div class="co6-g">
        <pre WfCode WfCode-lang="css"><script type="text/plain">
/**/
:root {
   /* Você pode subistituir as cores pelas que desejar */
    --principal: hsl(206, 74%, 36%);
    --secundaria: hsl(258, 97%, 60%);
    --sucesso: hsl(142, 100%, 28%);
    --informacao: hsl(195, 74%, 50%);
    --alerta: hsl(45, 100%, 50%);
    --perigo: hsl(0, 100%, 50%);
    --claro: hsl(210, 18%, 95%);
    --noturno: hsl(210, 17%, 10%);
}
</script>
</pre>
      </div>
    </div>
    <div class="l">
      <div class="co12-g">
        <div class="colors1 bloco">
          <ul>
            <div class="titulo">Principal <small>[.Bprin]</small></div>
            <li class="Bprin Tbran">.Bprin<small>--prin</small></li>
            <li class="Bsecu Tbran">.Bsecu<small>--secu</small></li>
            <li class="Bsuce Tbran">.Bsuce<small>--suce</small></li>
            <li class="Binfo Tpret">.Binfo<small>--info</small></li>
            <li class="Baler Tpret">.Baler<small>--aler</small></li>
            <li class="Bperi Tbran">.Bperi<small>--peri</small></li>
            <li class="Bclar Tpret">.Bclar<small>--clar</small></li>
            <li class="Bnotu Tbran">.Bnotu<small>--notu</small></li>
          </ul>
        </div>
        <br />
        <p>
          Com isto você já tem total controle nos btn, modals, alerts, etc.<br />
          <br />
          Utilize estas classes para aplicar as cores de destaque em seus
          projetos.
        </p>
        <br />
      </div>
    </div>
    <div class="l">
      <div class="co6-g">
        <p>Segue base de cores e esquema para o WfDay.</p>
        <br />
        <div class="colors1 bloco">
            <ul>
              <div class="titulo">BG <small>[.wf-bg]</small></div>
              <li class="wf-bg Tneut6 bord Lneut3">.wf-bg<small>--wf-bg</small></li>
              <li class="wf-bg- Tneut6 bord Lneut3">.wf-bg-<small>--wf-bg-</small></li>
              <li class="wf-bg-- Tbran">.wf-bg--<small>--wf-bg--</small></li>
              <li class="wf-bg_ Tbran">.wf-bg_<small>--wf-bg_</small></li>
            </ul>

            <ul>
              <div class="titulo">BL <small>[.wf-bl]</small></div>
              <li class="wbl Tneut6 bord Lneut3">.wf-bl<small>--wf-bl</small></li>
              <li class=" wf-bl- Tneut6 bord Lneut3">.wf-bl-<small>--wf-bl-</small></li>
              <li class="wf-bl-- Tbran">.wf-bl--<small>--wf-bl--</small></li>
              <li class="wf-bl_ Tbran">.wf-bl_<small>--wf-bl_</small></li>
            </ul>

            <ul>
              <div class="titulo">COLOR <small>[.wf-color]</small></div>
              <li class="wcolor"><b>.wf-color<small>--wf-color</small></b></li>
              <li class="wf-color-"><b>.wf-color-<small>--wf-color-</small></b></li>
              <li class="wf-color--"><b>.wf-color--<small>--wf-color--</small></b></li>
              <li class="wf-color_"><b>.wf-color_<small>--wf-color_</small></b></li>
            </ul>
            <style>
              .colors1 ul li a {
                  color: var(--aa);
              }

              .colors1 ul li a:hover {
                  color: var(--bb);
              }
            </style>
            <ul>
              <div class="titulo">LINK e HOVER <small>[.wf-link e .wf-hover]</small></div>
              <li><a style="--aa: var(--wf-link); --bb: var(--wf-hover);"><b>.wf-link<small>--wf-link</small></b></a></li>
              <li><a style="--aa: var(--wf-link-); --bb: var(--wf-hover-);"><b>.wf-link-<small>--wf-link-</small></b></a></li>
              <li><a style="--aa: var(--wf-link--); --bb: var(--wf-hover--);"><b>.wf-link--<small>--wf-link--</small></b></a></li>
              <li class="Bneut3"><a style="--aa: var(--wf-link_); --bb: var(--wf-hover_);"><b>.wf-link_<small>--wf-link_</small></b></a></li>
            </ul>
            <style>
              .wbloc {
                  background: var(--wf-bg);
                  color: var(--wf-color);
                  width: 100px;
                  height: 70px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 5px 5px 10px var(--cc);
              }
            </style>
            <ul>
              <div class="titulo">SHADOW <small>[.wf-shadow]</small></div>
              <li>
                  <div class="wbloc" style="--cc: var(--wf-shadow);"><small>.wf-shadow</small></div>
              </li>
              <li>
                  <div class="wbloc" style="--cc: var(--wf-shadow-);"><small>.wf-shadow-</small></div>
              </li>
              <li>
                  <div class="wbloc" style="--cc: var(--wf-shadow--);"><small>.wf-shadow--</small></div>
              </li>
              <li>
                  <div class="wbloc" style="--cc: var(--wf-shadow_);"><small>.wf-shadow_</small></div>
              </li>
            </ul>
            <style>
              .wblo {
                  background: var(--wf-bg);
                  color: var(--wf-color);
                  width: 100px;
                  height: 70px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 5px solid var(--dd);
              }
            </style>
            <ul>
              <div class="titulo">BORDER <small>[.wf-border]</small></div>
              <li>
                  <div class="wblo" style="--dd: var(--wf-border);"><small>.wf-border</small></div>
              </li>
              <li>
                  <div class="wblo" style="--dd: var(--wf-border-);"><small>.wf-border-</small></div>
              </li>
              <li>
                  <div class="wblo" style="--dd: var(--wf-border--);"><small>.wf-border--</small></div>
              </li>
              <li>
                  <div class="wblo" style="--dd: var(--wf-border_);"><small><div class="">                                                                                          </div>wf-border_</small></div>
              </li>
            </ul>
        </div>
      </div>
      <div class="co6-g">
        <pre WfCode WfCode-lang="css"><script type="text/plain">
/* ===== SWDAY ===== */
html.swday-day {

--wf-bg: var(--neut1);
--wf-bg-: var(--bran);
--wf-bg--: var(--neut3);
--wf-bg_: var(--neut10);

--wf-bl: var(--bran);
--wf-bl-: var(--neut3);
--wf-bl--: var(--prin);
--wf-bl_: var(--neut8);

--wf-color: var(--neut12);
--wf-color-: var(--neut9);
--wf-color--: var(--neut7);
--wf-color_: var(--neut3);

--wf-link: var(--prin);
--wf-link-: var(--aler);
--wf-link--: var(--notu);
--wf-link_: var(--bran);

--wf-hover: var(--prin-);
--wf-hover-: var(--aler-);
--wf-hover--: var(--notu-);
--wf-hover_: var(--bran5);

--wf-border: var(--neut4);
--wf-border-: var(--neut6);
--wf-border--: var(--neut8);
--wf-border_: var(--neut12);

--wf-shadow: var(--neut12);
--wf-shadow-: var(--neut12);
--wf-shadow--: var(--neut12);
--wf-shadow_: 0 1px 3px rgba(0, 0, 0, 0.12);
}
/**/
html.swday-night {

--wf-bg: var(--neut11);
--wf-bg-: var(--neut9);
--wf-bg--: var(--neut7);
--wf-bg_: var(--neut2);

--wf-bl: var(--neut10);
--wf-bl-: var(--neut8);
--wf-bl--: var(--neut10);
--wf-bl_: var(--neut4);

--wf-color: var(--neut3);
--wf-color-: var(--neut1);
--wf-color--: var(--neut6);
--wf-color_: var(--neut11);

--wf-link: var(--prin-);
--wf-link-: var(--aler-);
--wf-link--: var(--notu-);
--wf-link_: var(--pret);

--wf-hover: var(--prin--);
--wf-hover-: var(--aler--);
--wf-hover--: var(--notu--);
--wf-hover_: var(--neut8);

--wf-border: var(--neut10);
--wf-border-: var(--neut8);
--wf-border--: var(--neut6);
--wf-border_: var(--neut1);

--wf-shadow: var(--neut12);
--wf-shadow-: var(--neut12);
--wf-shadow--: var(--neut12);
--wf-shadow_: 0 1px 2px rgba(0, 0, 0, 0.24);
}
</script>
</pre>
        </div>
      </div>
    </div>
  </div>
</section>
