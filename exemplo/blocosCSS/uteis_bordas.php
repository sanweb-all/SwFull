<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Bordas</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Bordas</li>
        </ol>
      </nav>
    </div>
    <div class="l">
      <div class="co6-g">
        <p>Use utilitários de borda para adicionar ou remover bordas de um elemento. Escolha entre todas as bordas ou uma de cada vez.</p>
        <b>Aditivo</b> - Adicione bordas a elementos personalizados;
        <br />
        <br />
        <p>
          <b>.bord</b>
          - Borda Geral;
          <br />
          <b>.bord-t</b>
          - Borda Só Topo;
          <br />
          <b>.bord-d</b>
          - Borda a direita;
          <br />
          <b>.bord-f</b>
          - Borda no final;
          <br />
          <b>.bord-e</b>
          - Borda a esquerda
          <br />
        </p>
        <br />
        <div class="C">
          <span class="bord bord-3 bbl"></span>
          <span class="bord-t bord-3 bbl"></span>
          <span class="bord-d bord-3 bbl"></span>
          <span class="bord-f bord-3 bbl"></span>
          <span class="bord-e bord-3 bbl"></span>
        </div>
        <pre WfCode><script type="text/plain">
<span class="bord"></span>
<span class="bord-t"></span>
<span class="bord-d"></span>
<span class="bord-f"></span>
<span class="bord-e"></span>
</script>
</pre>
        <hr />
        <b>Subtrativo</b>
        - Ou remova as bordas;
        <br />
        <br />
        <p>
          <b>.bord-0</b>
          - Remove Borda Geral;
          <br />
          <b>.bord-t0</b>
          - Remove Borda Topo;
          <br />
          <b>.bord-d0</b>
          - Remove Borda a direita;
          <br />
          <b>.bord-f0</b>
          - Remove Borda no final;
          <br />
          <b>.bord-e0</b>
          - Remove Borda a esquerda
          <br />
        </p>
        <br />
        <div class="C">
          <span class="bord bord-3 bord-0 bbl"></span>
          <span class="bord bord-3 bord-t0 bbl"></span>
          <span class="bord bord-3 bord-d0 bbl"></span>
          <span class="bord bord-3 bord-f0 bbl"></span>
          <span class="bord bord-3 bord-e0 bbl"></span>
        </div>
        <pre WfCode><script type="text/plain">
<span class="bord bord-0"></span>
<span class="bord bord-t0"></span>
<span class="bord bord-d0"></span>
<span class="bord bord-f0"></span>
<span class="bord bord-e0"></span>
</script>
</pre>
        <hr />
        <h3>Sizes</h3>
        <p>
          <b>.round</b>
          - ;
          <br />
          <b>.round-t</b>
          - round-top - topo;
          <br />
          <b>.round-d</b>
          - round-end - direita;
          <br />
          <b>.round-f</b>
          - round-bottom - final;
          <br />
          <b>.round-e</b>
          - round-start - esquerda;
          <br />
          <b>.round-c</b>
          - round-circle - circular;
          <br />
          <b>.round-p</b>
          - round-pill - pílula;
          <br />
        </p>
        <br />
        <p>
          Use as classes de escala para cantos arredondados maiores ou menores. Os tamanhos variam de 0 a 5 e podem ser configurados modificando a API dos
          utilitários.
        </p>
        <br />
        <p>
          <b>Ex.:</b>
          Round de 0 a 5, no geral;
        </p>
        <br />
        <div class="e1 C wp100 d-f f-wr just-c-c">
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-0 m1" alt="..." />
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-1 m1" alt="..." />
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-2 m1" alt="..." />
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-3 m1" alt="..." />
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-4 m1" alt="..." />
          <img src="exemplo/images/demo/02.jpg" class="bbl bord bord-4 Lverm6 round-5 m1" alt="..." />
        </div>
        <pre WfCode><script type="text/plain">
<img src="..." class="round-0" alt="..." />
<img src="..." class="round-1" alt="..." />
<img src="..." class="round-2" alt="..." />
<img src="..." class="round-3" alt="..." />
<img src="..." class="round-4" alt="..." />
<img src="..." class="round-5" alt="..." />
</script>
</pre>
        <hr />
        <p>Algumas variações:</p>
        <br />
        <div class="e1 C wp100 d-f f-wr just-c-c">
          <div class="bloc">
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lverm6 round-t1 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lverm6 round-t2 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lverm6 round-t3 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lverm6 round-t4 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lverm6 round-t5 m1" alt="..." />
          </div>
          <div class="bloc">
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Llila6 round-e1 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Llila6 round-e2 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Llila6 round-e3 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Llila6 round-e4 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Llila6 round-e5 m1" alt="..." />
          </div>
          <div class="bloc">
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lceu6 round-d1 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lceu6 round-d2 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lceu6 round-d3 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lceu6 round-d4 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lceu6 round-d5 m1" alt="..." />
          </div>
          <div class="bloc">
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lamar6 round-f1 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lamar6 round-f2 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lamar6 round-f3 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lamar6 round-f4 m1" alt="..." />
            <img src="exemplo/images/demo/03.jpg" class="bbl bord bord-4 Lamar6 round-f5 m1" alt="..." />
          </div>
        </div>
        <pre WfCode><script type="text/plain">
<img src="..." class="round-t1" alt="..." />
<img src="..." class="round-t2" alt="..." />
<img src="..." class="round-t3" alt="..." />
<img src="..." class="round-t4" alt="..." />
<img src="..." class="round-t5" alt="..." />

<img src="..." class="round-e1" alt="..." />
<img src="..." class="round-e2" alt="..." />
<img src="..." class="round-e3" alt="..." />
<img src="..." class="round-e4" alt="..." />
<img src="..." class="round-e5" alt="..." />

<img src="..." class="round-d1" alt="..." />
<img src="..." class="round-d2" alt="..." />
<img src="..." class="round-d3" alt="..." />
<img src="..." class="round-d4" alt="..." />
<img src="..." class="round-d5" alt="..." />

<img src="..." class="round-f1 m1" alt="..." />
<img src="..." class="round-f2 m1" alt="..." />
<img src="..." class="round-f3 m1" alt="..." />
<img src="..." class="round-f4 m1" alt="..." />
<img src="..." class="round-f5 m1" alt="..." />
</script>
</pre>
      </div>
      <div class="co6-g">
        <h3>Cores</h3>
        <p>Todas as cores da tabela pode ser mudadas acrescente um Lantes das 4 primeiras letras da cor.</p>
        <p>
          <b>.Lprin</b>
          - Cor principal;
          <br />
          <b>.Lsuce</b>
          - Cor secundaria;
          <br />
          <b>.Lneut</b>
          - Cor Neutra;
          <br />
          <b>.Lgold5</b>
          - Cor Gold 5;
          <br />
          <b>.Lteal</b>
          - Cor Teal;
          <br />
          <b>.Lnavy8</b>
          - Cor Navy 8;
          <br />
          <b>.Llila3</b>
          - Cor Lilas 3;
          <br />
          <b>.Lrose</b>
          - Cor Rose;
          <br />
        </p>
        <br />
        <div class="Tbran C">
          <span class="bord bord-4 Lprin bbl"></span>
          <span class="bord bord-4 Lsecu bbl"></span>
          <span class="bord bord-4 Lsuce bbl"></span>
          <span class="bord bord-4 Linfo bbl"></span>
          <span class="bord bord-4 Lperi bbl"></span>
          <span class="bord bord-4 Lnotu bbl"></span>
          <span class="bord bord-4 Llara8 bbl"></span>
          <span class="bord bord-4 Lgold5 bbl"></span>
          <span class="bord bord-4 Lrosa5 bbl"></span>
          <span class="bord bord-4 Llila5 bbl"></span>
          <span class="bord bord-4 Lceu8 bbl"></span>
          <span class="bord bord-4 Lrose5 bbl"></span>
          <span class="bord bord-4 Lazul8 bbl"></span>
          <span class="bord bord-4 Lviol6 bbl"></span>
          <span class="bord bord-4 Lverm3 bbl"></span>
          <span class="bord bord-4 Llara5 bbl"></span>
          <span class="bord bord-4 Lpedr5 bbl"></span>
          <span class="bord bord-4 Loliv5 bbl"></span>
          <span class="bord bord-4 Lroxo5 bbl"></span>
          <span class="bord bord-4 Lpret bbl"></span>
        </div>
        <pre WfCode><script type="text/plain">
<span class="bord bord-4 Lprin"></span>
<span class="bord bord-4 Lsecu"></span>
<span class="bord bord-4 Lsuce"></span>
<span class="bord bord-4 Linfo"></span>
<span class="bord bord-4 Lperi"></span>
<span class="bord bord-4 Lnotu"></span>
<span class="bord bord-4 Llara8"></span>
<span class="bord bord-4 Lgold5"></span>
<span class="bord bord-4 Lrosa5"></span>
<span class="bord bord-4 Llila5"></span>
<span class="bord bord-4 Lceu8"></span>
<span class="bord bord-4 Lrose5"></span>
<span class="bord bord-4 Lazul8"></span>
<span class="bord bord-4 Lviol6"></span>
<span class="bord bord-4 Lverm3"></span>
<span class="bord bord-4 Llara5"></span>
<span class="bord bord-4 Lpedr5"></span>
<span class="bord bord-4 Loliv5"></span>
<span class="bord bord-4 Lroxo5"></span>
<span class="bord bord-4 Lpret"></span>
</script>
</pre>
        <hr />
        <h3>
          Largura da Borda
          <small>[ Width ]</small>
        </h3>
        <p>
          <b>.bord-1</b>
          - 1px;
          <br />
          <b>.bord-3</b>
          - 2px;
          <br />
          <b>.bord-3</b>
          - 3px;
          <br />
          <b>.bord-4</b>
          - 4px;
          <br />
          <b>.bord-5</b>
          - 5px;
          <br />
          <b>.bord-6</b>
          - 6px;
          <br />
          <b>.bord-7</b>
          - 7px;
          <br />
          <b>.bord-8</b>
          - 8px;
          <br />
          <b>.bord-9</b>
          - 9px;
          <br />
          <b>.bord-10</b>
          - 10px;
          <br />
        </p>
        <div class="Tneut p10 C">
          <span class="bord bord-1 bbl">1</span>
          <span class="bord bord-3 bbl">2</span>
          <span class="bord bord-3 bbl">3</span>
          <span class="bord bord-4 bbl">4</span>
          <span class="bord bord-5 bbl">5</span>
          <span class="bord bord-6 bbl">6</span>
          <span class="bord bord-7 bbl">7</span>
          <span class="bord bord-8 bbl">8</span>
          <span class="bord bord-9 bbl">9</span>
          <span class="bord bord-10 bbl">10</span>
        </div>
        <p></p>
        <pre WfCode><script type="text/plain">
<span class="bord bord-1">1</span>
<span class="bord bord-3">2</span>
<span class="bord bord-3">3</span>
<span class="bord bord-4">4</span>
<span class="bord bord-5">5</span>
<span class="bord bord-6">6</span>
<span class="bord bord-7">7</span>
<span class="bord bord-8">8</span>
<span class="bord bord-9">9</span>
<span class="bord bord-10">10</span>
</script>
</pre>
        <hr />
        <h3>
          Curvas
          <small>[ Raidus ]</small>
        </h3>
        <p>
          <b>.rai2</b>
          - 2px;
          <br />
          <b>.rai4</b>
          - 4px;
          <br />
          <b>.rai6</b>
          - 6px;
          <br />
          <b>.rai8</b>
          - 8px;
          <br />
          <b>.rai10</b>
          - 10px;
          <br />
          <b>.rai12</b>
          - 12px;
          <br />
          <b>.rai14</b>
          - 14px;
          <br />
          <b>.rai16</b>
          - 16px;
          <br />
          <b>.rai18</b>
          - 18px;
          <br />
          <b>.rai20</b>
          - 20px;
          <br />
          <b>.raip1</b>
          - 10%;
          <br />
          <b>.raip2</b>
          - 20%;
          <br />
          <b>.raip3</b>
          - 30%;
          <br />
          <b>.raip4</b>
          - 40%;
          <br />
          <b>.raip5</b>
          - 50%;
          <br />
        </p>
        <div class="Tneut e1 C">
          <span class="bord bord-3 rai2 bbl">2px</span>
          <span class="bord bord-3 rai4 bbl">4px</span>
          <span class="bord bord-3 rai6 bbl">6px</span>
          <span class="bord bord-3 rai8 bbl">8px</span>
          <span class="bord bord-3 rai10 bbl">10px</span>
          <span class="bord bord-3 rai12 bbl">12px</span>
          <span class="bord bord-3 rai14 bbl">14px</span>
          <span class="bord bord-3 rai16 bbl">16px</span>
          <span class="bord bord-3 rai18 bbl">18px</span>
          <span class="bord bord-3 rai20 bbl">20px</span>
          <span class="bord bord-3 raip1 bbl">10%</span>
          <span class="bord bord-3 raip2 bbl">20%</span>
          <span class="bord bord-3 raip3 bbl">30%</span>
          <span class="bord bord-3 raip4 bbl">40%</span>
          <span class="bord bord-3 raip5 bbl">50%</span>
        </div>
        <pre WfCode><script type="text/plain">
<span class="bord rai2">2px</span>
<span class="bord rai4">4px</span>
<span class="bord rai6">6px</span>
<span class="bord rai8">8px</span>
<span class="bord rai10">10px</span>
<span class="bord rai12">12px</span>
<span class="bord rai14">14px</span>
<span class="bord rai16">16px</span>
<span class="bord rai18">18px</span>
<span class="bord rai20">20px</span>
<span class="bord raip1">10%</span>
<span class="bord raip2">20%</span>
<span class="bord raip3">30%</span>
<span class="bord raip4">40%</span>
<span class="bord raip5">50%</span>
</script>
</pre>
        <hr />
      </div>
    </div>
  </div>
</section>