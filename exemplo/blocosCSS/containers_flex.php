<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Flex</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Flex</li>
        </ol>
      </nav>
    </div>
    <div WfAba>
      <div class="wfaba-tabs">
        <div class="wfaba-tab active" WfAba-tab="flexFlex">Flex</div>
        <div class="wfaba-tab" WfAba-tab="flexJustify">Justify</div>
        <div class="wfaba-tab" WfAba-tab="flexAlign">Align</div>
        <div class="wfaba-tab" WfAba-tab="flexSelf">Self</div>
        <div class="wfaba-tab" WfAba-tab="flexContent">Content</div>
        <div class="wfaba-tab" WfAba-tab="flexGrow">Grow</div>
        <div class="wfaba-tab" WfAba-tab="flexWrap">Wrap</div>
        <div class="wfaba-tab" WfAba-tab="flexOrder">Order</div>
        <div class="wfaba-tab" WfAba-tab="flexOutros">Outros</div>
      </div>
      <div class="wfaba-panels">
        <div class="wfaba-panel aniline-d active" id="flexFlex">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Flexível <small>[ Flex ]</small></h3>
                <p>
                  Aplique utilitários de exibição para criar um container flexbox e transformar elementos filhos diretos em itens flexíveis. Os containers e itens
                  flexíveis
                  podem ser modificados ainda mais com propriedades flexíveis adicionais.
                </p>
                <br />
                <p class="ee2">
                  <b>.d-f</b> - display: flex; <br />
                  <b>.d-if</b> - display: inline-flex;<br />
                </p>
                <br />
                <div class="d-f e1 Blila6 Tbran">Eu amo flexbox container!</div>
                <pre WfCode><script type="text/plain">
<div class="d-f e1">Eu amo flexbox container!</div>
</script>
</pre>
                <div class="d-if e1 Blila6 Tbran">Eu amo flexbox container!</div>
                <br />
                <pre WfCode><script type="text/plain">
<div class="d-if e1">Eu amo flexbox container!</div>
</script>
</pre>
                <hr />
                <h3>Flex Direction</h3>
                <p>Use <b>.f-r</b> para definir uma direção horizontal (o padrão do navegador) ou <b>.f-rr</b> para iniciar a direção horizontal do lado oposto.</p>
                <p>Use <b>.f-c</b> para definir uma direção vertical ou <b>.f-cr</b> para iniciar a direção vertical do lado oposto.</p>
                <br />
                <p class="ee2">
                  <b>.f-f</b> - flex: 1 1 auto; <br />
                  <b>.f-r</b> - flex-direction: row; <br />
                  <b>.f-c</b> - flex-direction: column;<br />
                  <b>.f-rr</b> - flex-direction: row-reverse;<br />
                  <b>.f-cr</b> - flex-direction: column-reverse;
                </p>
              </div>
              <div class="co6-g">
                <pre WfCode><script type="text/plain">
<div class="d-f f-r">
  <div class="e1">01</div>
  <div class="e1">02</div>
  <div class="e1">03</div>
</div>
<div class="d-f f-rr">
  <div class="e1">01</div>
  <div class="e1">02</div>
  <div class="e1">03</div>
</div>
</script>
</pre>
                <div class="d-f f-r Blima7 bord bord-bran Tpret">
                  <div class="e1 Blima5 bord bord-bran">01</div>
                  <div class="e1 Blima5 bord bord-bran">02</div>
                  <div class="e1 Blima5 bord bord-bran">03</div>
                </div>
                <br />
                <div class="d-f f-rr Blima7 bord bord-bran Tpret">
                  <div class="e1 Blima5 bord bord-bran">01</div>
                  <div class="e1 Blima5 bord bord-bran">02</div>
                  <div class="e1 Blima5 bord bord-bran">03</div>
                </div>
                <br />
                <pre WfCode><script type="text/plain">
<div class="d-f f-c">
  <div class="e1">01</div>
  <div class="e1">02</div>
  <div class="e1">03</div>
</div>
<div class="d-f f-cr">
  <div class="e1">01</div>
  <div class="e1">02</div>
  <div class="e1">03</div>
</div>
</script>
</pre>
                <div class="d-f f-c Blima8 bord bord-bran Tpret">
                  <div class="e1 Blima5 bord bord-bran">01</div>
                  <div class="e1 Blima5 bord bord-bran">02</div>
                  <div class="e1 Blima5 bord bord-bran">03</div>
                </div>
                <br />
                <div class="d-f f-cr Blima8 bord bord-bran Tpret">
                  <div class="e1 Blima5 bord bord-bran">01</div>
                  <div class="e1 Blima5 bord bord-bran">02</div>
                  <div class="e1 Blima5 bord bord-bran">03</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexJustify">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Justify Content <small>[ Flex ]</small></h3>
                <p class="ee2">
                  <b>.just-c-s</b> - justify-content: flex-start - Inicio;<br />
                  <b>.just-c-e</b> - justify-content: flex-end - Fim;<br />
                  <b>.just-c-c</b> - justify-content: center - Meio;<br />
                  <b>.just-c-b</b> - justify-content: space-between - Toda Area;<br />
                  <b>.just-c-a</b> - justify-content: space-around - Em volta;<br />
                  <b>.just-c-v</b> - justify-content: space-evenly - Uniformemente;<br />
                </p>
                <br />
                <div>
                  <div class="d-f just-c-s mf1 Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                  <div class="d-f just-c-e mf1 Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                  <div class="d-f just-c-c mf1 Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                  <div class="d-f just-c-b mf1 Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                  <div class="d-f just-c-a mf1 Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                  <div class="d-f just-c-v Bceu4 bord bord-bran">
                    <div class="e1 Bceu6 Tbran bord bord-bran">Esquerda</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord bord-bran">Direita</div>
                  </div>
                </div>
                <br />
                <hr />
              </div>
              <div class="co6-g">
                <pre WfCode><script type="text/plain">
<div class="d-f just-c-s mf4">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">Start</div>
</div>
<div class="d-f just-c-e mf4">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">End</div>
</div>
<div class="d-f just-c-c mf4">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">Center</div>
</div>
<div class="d-f just-c-b mf4">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">Entre</div>
</div>
<div class="d-f just-c-a mf4">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">Em volta</div>
</div>
<div class="d-f just-c-v">
    <div class="e1">Esquerda</div>
    <div class="e1">Centro</div>
    <div class="e1">Uniforme</div>
</div>
</script>
</pre>
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexAlign">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Align Items <small>[ Flex ]</small></h3>
                <p>
                  Use utilitários de alinhamento de itens em contêineres flexbox para alterar o alinhamento de itens flexíveis no eixo cruzado (o eixo y para iniciar, eixo
                  x
                  se direção flexível: coluna). Escolha entre início, fim, centro, linha de base ou alongamento (padrão do navegador).
                </p>
                <br />
                <p class="ee2">
                  <b>.align-i-s</b> - align-items: flex-start - Início;<br />
                  <b>.align-i-e</b> - align-items: flex-end - Fim;<br />
                  <b>.align-i-c</b> - align-items: center - Meio;<br />
                  <b>.align-i-b</b> - align-items: baseline - Alinhar base;<br />
                  <b>.align-i-st</b> - align-items: stretch - Esticar;<br />
                </p>
                <br />
                <div>
                  <div class="d-f just-c-c align-i-s mf1 Blila4 bord Lbran" style="height: 100px">
                    <div class="e1 Blila6 Tbran bord Lbran">Esquerda</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c align-i-e mf1 Blila4 bord Lbran"" style=" height: 100px">
                    <div class="e1 Blila6 Tbran bord Lbran">Esquerda</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c align-i-c mf1 Blila4 bord Lbran"" style=" height: 100px">
                    <div class="e1 Blila6 Tbran bord Lbran">Esquerda</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c align-i-be mf1 Blila4 bord Lbran"" style=" height: 100px">
                    <div class="e1 Blila6 Tbran bord Lbran">Esquerda</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Blila6 Tbran bord Lbran">Direita</div>
                  </div>
                </div>
                <br />
                <hr />
              </div>
              <div class="co6-g">
                <pre WfCode><script type="text/plain">
<div class="d-f just-c-c align-i-s mf1" style="height: 100px">
    <div class="e4">Esquerda</div>
    <div class="e4">Centro</div>
    <div class="e4">Direita</div>
</div>
<div class="d-f just-c-c align-i-e mf1" style="height: 100px">
    <div class="e4">Esquerda</div>
    <div class="e4">Centro</div>
    <div class="e4">Direita</div>
</div>
<div class="d-f just-c-c align-i-c mf1" style="height: 100px">
    <div class="e4">Esquerda</div>
    <div class="e4">Centro</div>
    <div class="e4">Direita</div>
</div>
<div class="d-f just-c-c align-i-b mf1" style="height: 100px">
    <div class="e4">Esquerda</div>
    <div class="e4">Centro</div>
    <div class="e4">Direita</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexSelf">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Alinhar-se <small>[ Align Self ]</small></h3>
                <p>
                  Use os utilitários <b>align-s</b> em itens flexbox para alterar individualmente seu alinhamento no eixo transversal (o eixo y para start, eixo x se
                  flex-direction: column). Escolha entre as mesmas opções que align-items: start, end, center, baseline ou stretch (padrão do navegador).
                </p>
                <br />
                <p class="ee2">
                  <b>.align-s-a</b> - align-self: auto;<br />
                  <b>.align-s-s</b> - align-self: flex-start - Início;<br />
                  <b>.align-s-e</b> - align-self: flex-end - Fim;<br />
                  <b>.align-s-c</b> - align-self: center - Meio;<br />
                  <b>.align-s-b</b> - align-self: baseline - alinhar Base;<br />
                  <b>.align-s-st</b> - align-self: stretch - Esticar;<br />
                </p>
                <br />
                <div>
                  <div class="d-f just-c-c mf1 wc100 Bceu3" style="height: 100px">
                    <div class="e1 Bceu6 Tbran bord Lbran">Esquerda</div>
                    <div class="align-s-s e1 Bceu6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c mf1 wc100 Bceu3" style="height: 100px">
                    <div class="e1 Bceu6 Tbran bord Lbran">Esquerda</div>
                    <div class="align-s-e e1 Bceu6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c mf1 wc100 Bceu3" style="height: 100px">
                    <div class="e1 Bceu6 Tbran bord Lbran">Esquerda</div>
                    <div class="align-s-c e1 Bceu6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c mf1 wc100 Bceu3" style="height: 100px">
                    <div class="e1 Bceu6 Tbran bord Lbran">Esquerda</div>
                    <div class="align-s-b e1 Bceu6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord Lbran">Direita</div>
                  </div>
                  <div class="d-f just-c-c wc100 Bceu3" style="height: 100px">
                    <div class="e1 Bceu6 Tbran bord Lbran">Esquerda</div>
                    <div class="align-s-st e1 Bceu6 Tbran bord Lbran">Centro</div>
                    <div class="e1 Bceu6 Tbran bord Lbran">Direita</div>
                  </div>
                </div>
              </div>
              <div class="co6-g">
                <pre WfCode><script type="text/plain">
<div class="d-f just-c-c mf1" style="height: 100px">
    <div class="e1">Esquerda</div>
    <div class="align-s-s e1">Centro</div>
    <div class="e1">Direita</div>
</div>
<div class="d-f just-c-c mf1" style="height: 100px">
    <div class="e1">Esquerda</div>
    <div class="align-s-e e1">Centro</div>
    <div class="e1">Direita</div>
</div>
<div class="d-f just-c-c mf1" style="height: 100px">
    <div class="e1">Esquerda</div>
    <div class="align-s-c e1">Centro</div>
    <div class="e1">Direita</div>
</div>
<div class="d-f just-c-c mf1" style="height: 100px">
    <div class="e1">Esquerda</div>
    <div class="align-s-b e1">Centro</div>
    <div class="e1">Direita</div>
</div>
<div class="d-f just-c-c" style="height: 100px">
    <div class="e1">Esquerda</div>
    <div class="align-s-st e1">Centro</div>
    <div class="e1">Direita</div>
</div>
</script>
</pre>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexContent">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Alinhar Conteúdo <small>[ Align Content ]</small></h3>
                <p>
                  Use os utilitários align-content em container flexbox para alinhar itens flex juntos no eixo transversal. Escolha entre start (padrão do navegador), end,
                  center, between, around ou stretch. Para demonstrar esses utilitários, aplicamos flex-wrap: wrap e aumentamos o número de itens flex.
                </p>
                <p>Atenção! Esta propriedade não tem efeito em linhas únicas de itens flexíveis.</p>
                <p>
                  <b>.align-c-s</b> - align-content-start - Início;<br />
                  <b>.align-c-e</b> - align-content-end - Fim;<br />
                  <b>.align-c-c</b> - align-content-center - Meio;<br />
                  <b>.align-c-b</b> - align-content-between - Entre;<br />
                  <b>.align-c-b</b> - align-content-around - Em volta;<br />
                  <b>.align-c-st</b> - align-content-stretch - Esticar;<br />
                </p>
                <br />
                <p><b>.align-c-s</b></p>
                <div>
                  <div class="d-f align-c-s f-wr mf1 Bceu6 Tpret" style="height: 250px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-s f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
                <p><b>.align-c-e</b></p>
                <div>
                  <div class="d-f align-c-e f-wr mf1 Bceu6 Tpret" style="height: 250px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-e f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
                <p><b>.align-c-c</b></p>
                <div>
                  <div class="d-f align-c-c f-wr mf1 Bceu6 Tpret" style="height: 250px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-c f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
              </div>
              <div class="co6-g">
                <br />
                <p><b>.align-c-b</b></p>
                <div>
                  <div class="d-f align-c-b f-wr mf1 Bceu6 Tpret" style="height: 280px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-b f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
                <p><b>.align-c-a</b></p>
                <div>
                  <div class="d-f align-c-a f-wr mf1 Bceu6 Tpret" style="height: 280px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-a f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
                <p><b>.align-c-st</b></p>
                <div>
                  <div class="d-f align-c-st f-wr mf1 Bceu6 Tpret" style="height: 280px">
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu3 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f align-c-st f-wr mf1 Tpret" style="height: 250px">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexGrow">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Crescer e encolher <small>[ Grow e shrink ]</small></h3>
                <p>
                  Use os utilitários <b>.f-g*</b> para alternar a capacidade de um item flexível crescer para preencher o espaço disponível. No exemplo abaixo, os
                  elementos
                  <b>.f-g1</b> usam todo o espaço disponível que podem, enquanto permitem aos dois itens flexíveis restantes o espaço necessário.
                </p>
                <br />
                <p>
                  Use os utilitários <b>.f-s*</b> para alternar a capacidade de vermução de um item flexível, se necessário. No exemplo abaixo, o segundo item flexível com
                  <b>.f-s1</b> é forçado a agrupar seu conteúdo em uma nova linha, “encolhendo” para permitir mais espaço para o item flexível anterior com .wp100.
                </p>
                <br />
                <p>
                  <b>.f-g0</b> - flex-grow: 0; <br />
                  <b>.f-g1</b> - flex-grow: 1; <br />
                  <b>.f-s0</b> - flex-shrink: 0; <br />
                  <b>.f-s1</b> - flex-shrink: 1; <br />
                  <b>.f-wr</b> - flex-wrap: wrap; <br />
                  <b>.f-nowr</b> - flex-wrap: nowrap;<br />
                  <b>.f-wr-r</b> - flex-wrap: wrap-reverse;<br />
                </p>
              </div>
              <div class="co6-g">
                <pre WfCode><script type="text/plain">
<div class="d-f">
    <div class="e1 f-g1">01</div>
    <div class="e1">02</div>
    <div class="e1">03</div>
</div>
</script>
</pre>
                <div class="d-f">
                  <div class="e1 f-g1 Blila3 bord Lbran">01</div>
                  <div class="e1 Blila6 Tbran bord Lbran">02</div>
                  <div class="e1 Blila6 Tbran bord Lbran">03</div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f">
    <div class="e1 wp100">01</div>
    <div class="e1 f-s1">02</div>
</div>
</script>
</pre>
                <div class="d-f">
                  <div class="e1 wp100 bord Lbran Bverm3">01</div>
                  <div class="e1 f-s1 bord Lbran Bverm5 Tbran">02</div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexWrap">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Enrolar <small>[ Wrap ]</small></h3>
                <p>
                  Altere a forma como os itens flexíveis são agrupados em um contêiner flexível. Escolha entre nenhum empacotamento (o padrão do navegador) com .f-nowr,
                  empacotamento com .f-wr ou empacotamento reverso com .f-wr-r.
                </p>
                <br />
                <p>
                  <b>.f-wr</b> - flex-wrap: wrap; <br />
                  <b>.f-nowr</b> - flex-wrap: nowrap;<br />
                  <b>.f-wr-r</b> - flex-wrap: wrap-reverse;<br />
                </p>
                <br />
                <div>
                  <div class="d-f f-nowr Bceu2 bord Lbran e1 Tpret" style="width: 180px">
                    <div class="e1 Bceu6 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f f-nowr e1" style="width: 180px;">
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
                <div>
                  <div class="d-f f-wr Bceu2 bord Lbran e1 Tpret">
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 1</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 2</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 3</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 4</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 5</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 6</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 7</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 8</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 9</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 10</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 11</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 12</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 13</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 14</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f f-wr">
    <div class="e1">Conteúdo 1</div>
    <div class="e1">Conteúdo 2</div>
    <div class="e1">Conteúdo 3</div>
    <div class="e1">Conteúdo 4</div>
    <div class="e1">Conteúdo 5</div>
    <div class="e1">Conteúdo 6</div>
    <div class="e1">Conteúdo 7</div>
    <div class="e1">Conteúdo 8</div>
    <div class="e1">Conteúdo 9</div>
    <div class="e1">Conteúdo 10</div>
    <div class="e1">Conteúdo 11</div>
    <div class="e1">Conteúdo 12</div>
    <div class="e1">Conteúdo 13</div>
    <div class="e1">Conteúdo 14</div>
</div>
</script>
</pre>
              </div>
              <div class="co6-g">
                <div>
                  <div class="d-f f-wr-r Bceu2 bord Lbran e1 Tpret">
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 1</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 2</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 3</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 4</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 6</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 6</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 7</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 8</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 9</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 10</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 11</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 12</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 13</div>
                    <div class="e1 Bceu6 bord Lbran">Conteúdo 14</div>
                  </div>
                  <pre WfCode><script type="text/plain">
<div class="d-f f-wr-r">
    <div class="e1">Conteúdo 1</div>
    <div class="e1">Conteúdo 2</div>
    <div class="e1">Conteúdo 3</div>
    <div class="e1">Conteúdo 4</div>
    <div class="e1">Conteúdo 5</div>
    <div class="e1">Conteúdo 6</div>
    <div class="e1">Conteúdo 7</div>
    <div class="e1">Conteúdo 8</div>
    <div class="e1">Conteúdo 9</div>
    <div class="e1">Conteúdo 10</div>
    <div class="e1">Conteúdo 11</div>
    <div class="e1">Conteúdo 12</div>
    <div class="e1">Conteúdo 13</div>
    <div class="e1">Conteúdo 14</div>
</div>
</script>
</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexOrder">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Ordem <small>[ Order ]</small></h3>
                <p>
                  Altere a ordem visual de itens flex específicos com um punhado de utilitários de ordem. Nós fornecemos apenas opções para tornar um item o primeiro ou o
                  último, bem como uma redefinição para usar a ordem DOM. Como a ordem aceita qualquer valor inteiro de 0 a 5, adicione CSS personalizado para quaisquer
                  valores adicionais necessários.
                </p>
                <br />
                <p>
                  <b>.or-f</b> - order: -1; <br />
                  <b>.or-0</b> - order: 0; <br />
                  <b>.or-1</b> - order: 1; <br />
                  <b>.or-2</b> - order: 2; <br />
                  <b>.or-3</b> - order: 3; <br />
                  <b>.or-4</b> - order: 4; <br />
                  <b>.or-5</b> - order: 5; <br />
                  <b>.or-l</b> - order: 6; <br />
                </p>
              </div>
              <div class="co6-g">
                <div>
                  <div class="d-f f-nowr Bazul2">
                    <div class="or-3 e1 bord Lbran Bazul4 Tbran">01</div>
                    <div class="or-2 e1 bord Lbran Bazul4 Tbran">02</div>
                    <div class="or-1 e1 bord Lbran Bazul4 Tbran">03</div>
                  </div>
                  <pre WfCode><script type="text/plain">
<div class="d-f f-nowr">
    <div class="or-3 e1">01</div>
    <div class="or-2 e1">02</div>
    <div class="or-1 e1">03</div>
</div>

<div class="d-f f-rr">
    <div class="or-1 e1">01</div>
    <div class="or-2 e1">02</div>
    <div class="or-3 e1">03</div>
</div>
</script>
</pre>
                  <div class="d-f f-rr Brose2">
                    <div class="or-1 e1 bord Lbran Brose4 Tbran">01</div>
                    <div class="or-2 e1 bord Lbran Brose4 Tbran">02</div>
                    <div class="or-3 e1 bord Lbran Brose4 Tbran">03</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wfaba-panel aniline-d" id="flexOutros">
          <div class="g-xg">
            <div class="l">
              <div class="co6-g">
                <h3>Preenchimento flexível <small>[ Flex Fill ]</small></h3>
                <p>
                  Use a classe <b>.f-f</b> em uma série de elementos irmãos para forçá-los a ter larguras iguais ao seu conteúdo (ou larguras iguais se o conteúdo não
                  ultrapassar suas caixas de borda) enquanto ocupa todo o espaço horizontal disponível.
                </p>
                <br />
                <p><b>.f-f</b> - flex: 1 1 auto;<br /></p>
                <br />
                <div>
                  <div class="d-f Tpret">
                    <div class="e1 f-f Bviol3 bord bord-bran">Maior Texto</div>
                    <div class="e1 Bviol3 bord bord-bran">Conteúdo</div>
                    <div class="e1 Bviol3 bord bord-bran">Conteúdo</div>
                  </div>
                </div>
                <pre WfCode><script type="text/plain">
<div class="d-f">
    <div class="e1 f-f">Maior Texto</div>
    <div class="e1">Conteúdo</div>
    <div class="e1">Conteúdo</div>
</div>
</script>
</pre>
              </div>
              <div class="co6-g"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>