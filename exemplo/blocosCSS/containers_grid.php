<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Grid</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Grid</li>
        </ol>
      </nav>
    </div>
    <div WfAba WfAba-pos="top">
      <div class="wfaba-tabs">
        <div class="wfaba-tab active" WfAba-tab="painel1">Grid</div>
        <div class="wfaba-tab" WfAba-tab="painel2">Linhas</div>
        <div class="wfaba-tab" WfAba-tab="painel3">Colunas</div>
        <div class="wfaba-tab" WfAba-tab="painel4">Gap</div>
      </div>
      <div class="wfaba-panels">
        <div class="wfaba-panel aniline-d active" id="painel1">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Display Grid</h3>
                <p>
                  Criamos um sistema de grid completo e personalizável para ajudar a criar layouts responsivos e flexíveis. Este sistema é composto por sete componentes
                  principais: Container de Grid, Itens de Grid, Modelos de Grid, Gaps de Grid, Alinhamento de Grid, Auto-Posicionamento de Grid e Densidade de Grid.
                </p>
                <br />
                <p>
                  <b>.grid</b>
                  - display: grid;
                  <br />
                  <b>.grid-item</b>
                  - Itens;
                  <br />
                  <b>.grid-t-co{1|12}</b>
                  - grid-template-columns;
                  <br />
                  <b>.grid-t-l{1|12}</b>
                  - grid-template-rows;
                  <br />
                  <b>.grid-gap-{pp|p|m|g|gg|xg}</b>
                  - grid-gap;
                  <br />
                  <b>.grid-just</b>
                  - justify-items;
                  <br />
                  <b>.grid-align-i</b>
                  - align-item;
                  <br />
                  <b>.grid-auto</b>
                  - grid-auto;
                  <br />
                  <b>.grid-dens</b>
                  - grid-density;
                  <br />
                </p>
              </div>
              <div class="co6-g">
                <p>
                  <b>Exemplo 1:</b>
                  Grid Simples com 2 Colunas;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co2 grid-gap-p Tpret">
                    <div class="Bverm3 e1 bord bord-bran">Item 1</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 2</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 3</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 4</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co2 grid-gap-p">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</div>
</script>
</pre>
                <hr />

                <p>
                  <b>Exemplo 2:</b>
                  Grid com 3 Colunas e Itens Centralizados;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co3 grid-gap-m grid-just-c Tpret">
                    <div class="Bverm3 e1 bord bord-bran">Item 1</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 2</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 3</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 4</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 5</div>
                    <div class="Bverm3 e1 bord bord-bran">Item 6</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co3 grid-gap-m grid-just-c">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="painel2">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Grid Template Rows</h3>
                <p>
                  <b>.grid-t-ln{1|12}</b>
                  - grid-template-rows;
                  <br />
                </p>
                <br />
                <p>
                  <b>Exemplo 1:</b>
                  Grid com 2 linhas e 4 colunas;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co4 grid-t-ln2 Tpret">
                    <div class="Bverm5 e1 bord bord-bran">Item 1</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 2</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 3</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 4</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 5</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 6</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 7</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 8</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co4 grid-t-ln2">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
</div>
</script>
</pre>
                <hr />
              </div>
              <div class="co6-g">
                <p>
                  <b>Exemplo 1:</b>
                  Grid com 5 linhas e 2 colunas;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co2 grid-t-ln5 Tpret">
                    <div class="Bverm5 e1 bord bord-bran">Item 1</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 2</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 3</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 4</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 5</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 6</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 7</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 8</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 9</div>
                    <div class="Bverm5 e1 bord bord-bran">Item 10</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co2 grid-t-ln5">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="painel3">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Grid Template Rows</h3>
                <p>
                  <b>.grid-t-l{1|12}</b>
                  - grid-template-rows;
                  <br />
                </p>
                <br />
                <p>
                  <b>Exemplo 1:</b>
                  Grid com 1 colunas;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co1 Tpret">
                    <div class="Bceu5 e1 bord bord-bran">Item 1</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 2</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 3</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 4</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 5</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 6</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 7</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 8</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co1">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
</div>
</script>
</pre>
                <hr />
              </div>
              <div class="co6-g">
                <p>
                  <b>Exemplo 1:</b>
                  Grid com 2 linhas e 5 colunas;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co5 grid-t-l2 Tpret">
                    <div class="Bceu5 e1 bord bord-bran">Item 1</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 2</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 3</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 4</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 5</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 6</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 7</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 8</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 9</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 10</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co5 grid-t-l2">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="painel4">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Grid Gap</h3>
                <p>
                  <b>.grid-gap-{pp|p|m|g|gg|xg}</b>
                  - grid-gap;
                  <br />
                </p>
                <br />
                <p>
                  <b>Exemplo 1:</b>
                  Grid com gap M entre os itens;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co3 grid-gap-m Tpret">
                    <div class="Bceu5 e1 bord bord-bran">Item 1</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 2</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 3</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co3 grid-gap-m">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
</script>
</pre>
                <hr />
                <br />
                <p>
                  <b>Exemplo 1:</b>
                  Grid com gap PP entre os itens;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co2 grid-gap-pp Tpret">
                    <div class="Bceu5 e1 bord bord-bran">Item 1</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 2</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co2 grid-gap-pp">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
</script>
</pre>
                <hr />
              </div>
              <div class="co6-g">
                <br />
                <p>
                  <b>Exemplo 1:</b>
                  Grid com gap GG entre os itens;
                </p>
                <div class="Bbran e1">
                  <div class="grid grid-t-co2 grid-gap-gg Tpret">
                    <div class="Bceu5 e1 bord bord-bran">Item 1</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 2</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 3</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 4</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 5</div>
                    <div class="Bceu5 e1 bord bord-bran">Item 6</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="grid grid-t-co2 grid-gap-gg">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
    <div>Item 5</div>
    <div>Item 6</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>