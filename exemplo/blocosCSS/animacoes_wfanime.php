<style>
  .anime-bl {
    width: 30%;
    display: inline-grid;
    align-items: center;
    text-align: center;
    height: 130px;
    border: 8px solid white;
    margin: 8px 10px;
    box-shadow: 0 0 7px 2px #0000003d;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 500;
    color: white;
  }

  .wfanime- {
    display: block;
  }
</style>
<section>
  <div class="g-xg">
    <div class="topo">
      <h1>Wf-Anime</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">Wf-Anime</li>
        </ol>
      </nav>
    </div>
    <div class="l">
      <div class="co6-g">
        <h3>Wf-Anime: Esquema de Nomes</h3>
        <p><b>Wf-Anime</b> aplica animações na entrada da viewport (scroll). Use sempre o padrão abaixo:</p>
        <pre WfCode WfCode-language="html"><script type="text/plain">
wfanime-[tipo]-[tamanho]

tipo:   (sem sufixo) = fade | e = esquerda | d = direita | t = topo | f = final (botton)
        in = fade-in | out = fade-out | rot = rotate

tamanho: p = pequeno | m = médio | g = grande | gg = extra grande
</script></pre>
      </div>
      <div class="co6-g">
        <pre WfCode WfCode-language="html"><script type="text/plain">
<div class="wfanime-p">Fade P</div>
<div class="wfanime-m">Fade M</div>
<div class="wfanime-g">Fade G</div>
<div class="wfanime-gg">Fade GG</div>

<div class="wfanime-t-p">Topo P</div>
<div class="wfanime-d-m">Direita M</div>
<div class="wfanime-e-g">Esquerda G</div>
<div class="wfanime-f-gg">Final GG</div>

<div class="wfanime-in-p">Fade-In P</div>
<div class="wfanime-out-m">Fade-Out M</div>
<div class="wfanime-rot-g">Rotate G</div>
<div class="wfanime-rot-gg">Rotate GG</div>
</script></pre>
      </div>
    </div>
    <div class="l">
      <div class="co6-g">
        <h3>Quando pode não funcionar</h3>
        <p>
          <b>animation-timeline / animation-range (View Timeline API)</b><br>
          Não é suportado na maioria dos navegadores (não funciona no Firefox nem no Safari; só funciona em alguns Chrome/Chromium recentes e mesmo assim pode depender de
          flags). Se o CSS depende só disso, a animação não será acionada.
        </p>
        <p>
          <b>Propriedades e sintaxes modernas</b><br>
          translate: shorthand (Transforms Level 2) e outras sintaxes novas podem ser ignoradas em navegadores antigos; use transform: translateX(...) / translateY(...)
          para melhor compatibilidade.
        </p>
        <p>
          <b>Duração faltando / animation-duration = 0</b><br>
          Se não houver animation-duration (ou for 0), o navegador não executa a animação visivelmente.
        </p>
        <p>
          <b>Keyframes mal definidos</b><br>
          Keyframes sem 100% ou inconsistentes podem não produzir o efeito esperado em alguns navegadores.
        </p>
        <p>
          <b>Ambientes restritos</b><br>
          Webviews antigos, clientes de email, previews PDFs e alguns modos embed podem não suportar animações CSS avançadas.
        </p>
      </div>
      <div class="co6-g">
        <p>
          <b>Como detectar rapidamente</b><br>
          Abra DevTools → aba Elements → selecione o elemento e verifique animation-name e animation-duration nas propriedades computadas.
        </p>
        <p>
          <b>Abra DevTools → aba Animations (Chrome) para ver se a animação aparece e sua timeline.</b><br>
          Verifique console por warnings de CSS parse.
        </p>
        <p>
          <b>Correções possíveis (CSS / JS)</b><br>
          Sem JS (CSS-only):
          Remover dependência de animation-timeline e usar animation normal com animation-duration/animation-fill-mode + classes que são aplicadas no HTML (compatível com
          todos os navegadores modernos).
        </p>
        <p>
          <b>Com JS (mais robusto)</b><br>
          Usar IntersectionObserver para adicionar classes quando o elemento entra na viewport (garante comportamento consistente em todos os navegadores modernos).
        </p>
        <p>
          <b>Fallback</b><br>
          As classes <code>anime-*</code> antigas continuam como alias via CSS e podem ser usadas, mas o padrão oficial é <code>wfanime-*</code>.
        </p>
        <p>
          Para compatibilidade máxima, recomendo manter <code>wfanime-*</code> e, se necessário, adicionar fallback com IntersectionObserver.
        </p>
      </div>
    </div>
    <div class="l">
      <div class="bloco mt5">
        <div class="wfanime-">
          <div class="anime-bl Bazul5 wfanime-e-p">wfanime-e-p</div>
          <div class="anime-bl Bamar5 wfanime-p">wfanime-p</div>
          <div class="anime-bl Bverm5 wfanime-d-p">wfanime-d-p</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bazul5 wfanime-e-m">wfanime-e-m</div>
          <div class="anime-bl Bamar5 wfanime-m">wfanime-m</div>
          <div class="anime-bl Bverm5 wfanime-d-m">wfanime-d-m</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bazul5 wfanime-e-g">wfanime-e-g</div>
          <div class="anime-bl Bamar5 wfanime-g">wfanime-g</div>
          <div class="anime-bl Bverm5 wfanime-d-g">wfanime-d-g</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bazul5 wfanime-e-gg">wfanime-e-gg</div>
          <div class="anime-bl Bamar5 wfanime-gg">wfanime-gg</div>
          <div class="anime-bl Bverm5 wfanime-d-gg">wfanime-d-gg</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Brose8 wfanime-in-p">wfanime-in-p</div>
          <div class="anime-bl Brose8 wfanime-in-p">wfanime-in-p</div>
          <div class="anime-bl Brose8 wfanime-in-p">wfanime-in-p</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Brose6 wfanime-in-m">wfanime-in-m</div>
          <div class="anime-bl Brose6 wfanime-in-m">wfanime-in-m</div>
          <div class="anime-bl Brose6 wfanime-in-m">wfanime-in-m</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Brose4 wfanime-in-g">wfanime-in-g</div>
          <div class="anime-bl Brose4 wfanime-in-g">wfanime-in-g</div>
          <div class="anime-bl Brose4 wfanime-in-g">wfanime-in-g</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Brose8 wfanime-in-gg">wfanime-in-gg</div>
          <div class="anime-bl Brose8 wfanime-in-gg">wfanime-in-gg</div>
          <div class="anime-bl Brose8 wfanime-in-gg">wfanime-in-gg</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bverd6 wfanime-out-p">wfanime-out-p</div>
          <div class="anime-bl Bverd6 wfanime-out-p">wfanime-out-p</div>
          <div class="anime-bl Bverd6 wfanime-out-p">wfanime-out-p</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bverd4 wfanime-out-m">wfanime-out-m</div>
          <div class="anime-bl Bverd4 wfanime-out-m">wfanime-out-m</div>
          <div class="anime-bl Bverd4 wfanime-out-m">wfanime-out-m</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bverd8 wfanime-out-g">wfanime-out-g</div>
          <div class="anime-bl Bverd8 wfanime-out-g">wfanime-out-g</div>
          <div class="anime-bl Bverd8 wfanime-out-g">wfanime-out-g</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Bverd6 wfanime-out-gg">wfanime-out-gg</div>
          <div class="anime-bl Bverd6 wfanime-out-gg">wfanime-out-gg</div>
          <div class="anime-bl Bverd6 wfanime-out-gg">wfanime-out-gg</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Broxo8 wfanime-t-p">wfanime-t-p</div>
          <div class="anime-bl Bcinz8 wfanime-rot-p">wfanime-rot-p</div>
          <div class="anime-bl Bceu8 wfanime-b-p">wfanime-b-p</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Broxo6 wfanime-t-m">wfanime-t-m</div>
          <div class="anime-bl Bcinz6 wfanime-rot-m">wfanime-rot-m</div>
          <div class="anime-bl Bceu6 wfanime-b-m">wfanime-b-m</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Broxo4 wfanime-t-g">wfanime-t-g</div>
          <div class="anime-bl Bcinz4 wfanime-rot-g">wfanime-rot-g</div>
          <div class="anime-bl Bceu4 wfanime-b-g">wfanime-b-g</div>
        </div>
        <div class="wfanime-">
          <div class="anime-bl Broxo8 wfanime-t-gg">wfanime-t-gg</div>
          <div class="anime-bl Bcinz8 wfanime-rot-gg">wfanime-rot-gg</div>
          <div class="anime-bl Bceu8 wfanime-b-gg">wfanime-b-gg</div>
        </div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
    </div>
  </div>
</section>