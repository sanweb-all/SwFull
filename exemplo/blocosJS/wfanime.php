<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfAnime</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfAnime</li>
            </ol>
         </nav>
      </div>
      <section class="swanimex">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <div style="background: #eef7ff; border: 1px solid #b3e5fc; padding: 12px; border-radius: 6px; margin-top: 12px">
                     <b><i class="wf wf-info-circle"></i> Novo comportamento de saída</b><br />
                     Por padrão as animações de <code>WfAnime</code> usam uma saída simples (fade) quando o elemento sai da viewport — isso evita que uma animação longa continue rodando no fundo.
                     Se quiser que a saída seja a mesma animação da entrada, adicione <code>WfAnime-simpleOut="false"</code> ao elemento.
                     <br /><br />
                     <b>Exemplo:</b>
                     <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Entrada com animação lenta; saída será fade por padrão -->
<div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="GG">Elemento com entrada forte e saída simples</div>

<!-- Forçar saída espelhada (não recomendado para animações longas) -->
<div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="GG" WfAnime-simpleOut="false">Entrada e saída completas</div>
</script></pre>
                  </div>
                  <h3><i class="wf wf-zap"></i> WfAnime <small>[Sistema de Animações]</small></h3>
                  <!--<span class="wfbag">PRONTO / BULLETPROOF</span>-->
                  <p>
                     O <b>WfAnime</b> é o sistema oficial de animações do WEBFULL Framework. Oferece 50+ animações CSS3, múltiplos temas e integração total com o sistema de
                     temas.
                  </p>
                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wfs-zap wdest1-color f16"></i> ANIMAÇÕES:</b> 50+ efeitos CSS3 otimizados<br />
                     <b><i class="wf wf-palette wdest1-color f16"></i> MÚLTIPLOS TEMAS:</b> Day, Night e Auto com WfDay<br />
                     <b><i class="wf wf-home wdest1-color f16"></i> PERFORMANCE:</b> Animações suaves e responsivas
                  </div>
               </div>
            </div>

            <div class="l">
               <!-- Diferentes Velocidades -->
               <h3>Diferentes Velocidades</h3>
               <div class="swanime-demo">
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeIn (PP = 0.25s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (P = 0.5s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 1s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (G = 2s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (GG = 3s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (XG = 4s)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
               </div>
               <br />
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Diferentes velocidades -->
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="PP">PP (0.25s)</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="P">P (0.5s)</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M">M (1s)</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="G">G (2s)</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="GG">GG (3s)</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="XG">XG (4s)</div>
</script>
</pre>
            </div>
            <div class="l">
               <!-- Diferentes Distancias -->
               <h3>Diferentes Distancias</h3>
               <div class="swanime-demo">
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeIn (M = 20px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="20" class="anime-box">20px</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 40px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="40" class="anime-box">40px</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 60px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="60" class="anime-box">60px</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 80px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="80" class="anime-box">80px</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 100px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="100" class="anime-box">100px</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M = 120px)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="120" class="anime-box">120px</div>
                     </div>
                  </div>
               </div>
               <br />
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Diferentes distâncias -->
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="20">20px</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="40">40px</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="60">60px</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="80">80px</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="100">100px</div>
<div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" WfAnime-distance="120">120px</div>
</script>
</pre>
            </div>
            <div class="l">
               <h3>Todas animações disponíveis</h3>
               <div class="swanime-demo">
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fade (PP)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fade (P)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fade (M)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fade (G)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fade (GG)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fade (XG)</div>
                        <div WfAnime WfAnime-type="fade" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeIn (PP)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (P)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (M)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (G)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (GG)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeIn (XG)</div>
                        <div WfAnime WfAnime-type="fadeIn" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeLeft (PP)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeLeft (P)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeLeft (M)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeLeft (G)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeLeft (GG)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeLeft (XG)</div>
                        <div WfAnime WfAnime-type="fadeLeft" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeRight (PP)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeRight (P)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeRight (M)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeRight (G)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeRight (GG)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeRight (XG)</div>
                        <div WfAnime WfAnime-type="fadeRight" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeTop (PP)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeTop (P)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeTop (M)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeTop (G)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeTop (GG)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeTop (XG)</div>
                        <div WfAnime WfAnime-type="fadeTop" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">fadeBottom (PP)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">fadeBottom (P)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">fadeBottom (M)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">fadeBottom (G)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">fadeBottom (GG)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">fadeBottom (XG)</div>
                        <div WfAnime WfAnime-type="fadeBottom" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">zoom (PP)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">zoom (P)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">zoom (M)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">zoom (G)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">zoom (GG)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">zoom (XG)</div>
                        <div WfAnime WfAnime-type="zoom" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">bounce (PP)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">bounce (P)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">bounce (M)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">bounce (G)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">bounce (GG)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">bounce (XG)</div>
                        <div WfAnime WfAnime-type="bounce" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">pulse (PP)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">pulse (P)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">pulse (M)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">pulse (G)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">pulse (GG)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">pulse (XG)</div>
                        <div WfAnime WfAnime-type="pulse" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">rubberBand (PP)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">rubberBand (P)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">rubberBand (M)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">rubberBand (G)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">rubberBand (GG)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">rubberBand (XG)</div>
                        <div WfAnime WfAnime-type="rubberBand" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">jackInTheBox (PP)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">jackInTheBox (P)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">jackInTheBox (M)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">jackInTheBox (G)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">jackInTheBox (GG)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">jackInTheBox (XG)</div>
                        <div WfAnime WfAnime-type="jackInTheBox" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">rotate (PP)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">rotate (P)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">rotate (M)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">rotate (G)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">rotate (GG)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">rotate (XG)</div>
                        <div WfAnime WfAnime-type="rotate" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">swing (PP)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">swing (P)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">swing (M)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">swing (G)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">swing (GG)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">swing (XG)</div>
                        <div WfAnime WfAnime-type="swing" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">wobble (PP)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">wobble (P)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">wobble (M)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">wobble (G)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">wobble (GG)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">wobble (XG)</div>
                        <div WfAnime WfAnime-type="wobble" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">tada (PP)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">tada (P)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">tada (M)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">tada (G)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">tada (GG)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">tada (XG)</div>
                        <div WfAnime WfAnime-type="tada" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">rollIn (PP)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">rollIn (P)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">rollIn (M)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">rollIn (G)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">rollIn (GG)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">rollIn (XG)</div>
                        <div WfAnime WfAnime-type="rollIn" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">slide (PP)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">slide (P)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">slide (M)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">slide (G)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">slide (GG)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">slide (XG)</div>
                        <div WfAnime WfAnime-type="slide" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">slideInUp (PP)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">slideInUp (P)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">slideInUp (M)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">slideInUp (G)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">slideInUp (GG)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">slideInUp (XG)</div>
                        <div WfAnime WfAnime-type="slideInUp" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">slideInDown (PP)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">slideInDown (P)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">slideInDown (M)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">slideInDown (G)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">slideInDown (GG)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">slideInDown (XG)</div>
                        <div WfAnime WfAnime-type="slideInDown" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">slideInLeft (PP)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">slideInLeft (P)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">slideInLeft (M)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">slideInLeft (G)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">slideInLeft (GG)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">slideInLeft (XG)</div>
                        <div WfAnime WfAnime-type="slideInLeft" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">slideInRight (PP)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">slideInRight (P)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">slideInRight (M)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">slideInRight (G)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">slideInRight (GG)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">slideInRight (XG)</div>
                        <div WfAnime WfAnime-type="slideInRight" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">flip (PP)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">flip (P)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">flip (M)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">flip (G)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">flip (GG)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">flip (XG)</div>
                        <div WfAnime WfAnime-type="flip" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">flipInX (PP)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">flipInX (P)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">flipInX (M)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">flipInX (G)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">flipInX (GG)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">flipInX (XG)</div>
                        <div WfAnime WfAnime-type="flipInX" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">flipInY (PP)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">flipInY (P)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">flipInY (M)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">flipInY (G)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">flipInY (GG)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">flipInY (XG)</div>
                        <div WfAnime WfAnime-type="flipInY" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">lightSpeed (PP)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">lightSpeed (P)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">lightSpeed (M)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">lightSpeed (G)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">lightSpeed (GG)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">lightSpeed (XG)</div>
                        <div WfAnime WfAnime-type="lightSpeed" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">hinge (PP)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">hinge (P)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">hinge (M)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">hinge (G)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">hinge (GG)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">hinge (XG)</div>
                        <div WfAnime WfAnime-type="hinge" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">shake (PP)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">shake (P)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">shake (M)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">shake (G)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">shake (GG)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">shake (XG)</div>
                        <div WfAnime WfAnime-type="shake" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">heartBeat (PP)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">heartBeat (P)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">heartBeat (M)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">heartBeat (G)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">heartBeat (GG)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">heartBeat (XG)</div>
                        <div WfAnime WfAnime-type="heartBeat" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">flash (PP)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">flash (P)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">flash (M)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">flash (G)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">flash (GG)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">flash (XG)</div>
                        <div WfAnime WfAnime-type="flash" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
                  <div class="anime-grid">
                     <div>
                        <div class="legend">jello (PP)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="PP" class="anime-box">PP</div>
                     </div>
                     <div>
                        <div class="legend">jello (P)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="P" class="anime-box">P</div>
                     </div>
                     <div>
                        <div class="legend">jello (M)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="M" class="anime-box">M</div>
                     </div>
                     <div>
                        <div class="legend">jello (G)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="G" class="anime-box">G</div>
                     </div>
                     <div>
                        <div class="legend">jello (GG)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="GG" class="anime-box">GG</div>
                     </div>
                     <div>
                        <div class="legend">jello (XG)</div>
                        <div WfAnime WfAnime-type="jello" WfAnime-speed="XG" class="anime-box">XG</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <script>
         // Ensure demo boxes follow scroll by default (trigger 'auto').
         try {
            document.querySelectorAll('.swanime-demo .anime-box').forEach(el => {
               if (!el.hasAttribute('WfAnime-trigger')) el.setAttribute('WfAnime-trigger', 'auto');
            });
         } catch (e) {}
      </script>
</section>