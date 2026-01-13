<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfParallax</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfParallax</li>
            </ol>
         </nav>
      </div>
      <section class="wfparallaxx">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>[Efeito Parallax Avançado]</h3>
                  <!--<span class="wfbag">PRONTO / BULLETPROOF</span>-->
                  <p>
                     O <b>WfParallax</b> oferece <b>3 tipos de parallax</b>: background (backgroundPosition), elemento (transform) e mouse (segue cursor). Com
                     controle de velocidade, direção, alcance, inversão e responsividade configurável.
                  </p>
                  <div style="background: var(--wf-bg); border: 1px solid #9c27b0; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-image Taler f20"></i> BACKGROUND PARALLAX:</b> Move backgroundPosition durante scroll<br />
                     <b><i class="wf wf-target-lock Taler f20"></i> ELEMENT PARALLAX:</b> Move elementos com transform<br />
                     <b><i class="wf wf-mouse Taler f20"></i> MOUSE PARALLAX:</b> Movimento baseado na posição do cursor
                  </div>
               </div>
            </div>

            <!-- Uso Básico -->
            <div class="l">
               <div class="co6-g">
                  <h3>Uso Básico</h3>
                  <p>
                     Use o atributo <code>WfParallax</code> com <code>WfParallax-type</code>
                     para escolher o tipo de parallax:
                  </p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- 1. Background Parallax (padrão) -->
<div WfParallax
     WfParallax-type="background"
     WfParallax-speed="0.5"
     style="background-image: url('/assets/images/bg/hero.jpg');">
  Conteúdo sobre background parallax
</div>

<!-- 2. Element Parallax -->
<div WfParallax
     WfParallax-type="element"
     WfParallax-speed="0.3"
     WfParallax-direction="vertical">
  Elemento que se move com transform
</div>

<!-- 3. Mouse Parallax -->
<div WfParallax
     WfParallax-type="mouse"
     WfParallax-speed="0.2"
     WfParallax-range="50">
  Elemento que segue o cursor do mouse
</div>
</script>
</pre>
               </div>
               <div class="co6-g">
                  <h4>Exemplo Funcionando</h4>
                  <p>Role a página para ver o efeito parallax em ação:</p>

                  <!-- Demonstração de Parallax -->
                  <div style="position: relative; height: 530px; overflow: hidden; border-radius: 8px; margin: 20px 0">
                     <!-- Background parallax -->
                     <style>
                        /* page-specific WfParallax demo styles */
                        .wfparallax-demo-wrapper {
                           position: relative;
                           height: 530px;
                           overflow: hidden;
                           border-radius: 8px;
                           margin: 20px 0
                        }

                        .swparallax-bg-demo {
                           position: absolute;
                           top: 0;
                           left: 0;
                           right: 0;
                           height: 100%;
                           background-size: cover;
                           background-position: center;
                           z-index: 1
                        }

                        .wfparallax-circle {
                           position: absolute;
                           top: 50px;
                           left: 30px;
                           width: 80px;
                           height: 80px;
                           background: rgba(255, 255, 255, 0.9);
                           border-radius: 50%;
                           z-index: 2;
                           display: flex;
                           align-items: center;
                           justify-content: center;
                           font-size: 24px
                        }

                        .wfparallax-target-box {
                           position: absolute;
                           top: 120px;
                           right: 40px;
                           width: 60px;
                           height: 60px;
                           background: rgba(255, 255, 255, 0.8);
                           border-radius: 8px;
                           z-index: 2;
                           display: flex;
                           align-items: center;
                           justify-content: center
                        }

                        .wfparallax-main-content {
                           position: absolute;
                           top: 50%;
                           left: 50%;
                           transform: translate(-50%, -50%);
                           text-align: center;
                           color: white;
                           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                           z-index: 3;
                           background: rgba(0, 0, 0, 0.3);
                           padding: 20px;
                           border-radius: 8px
                        }
                     </style>

                     <div WfParallax WfParallax-type="background" WfParallax-speed="0.3" class="wfparallax-bg-demo"
                        style="background-image: url('https://picsum.photos/800/400?random=301');"></div>

                     <!-- Elementos com element parallax -->
                     <div WfParallax WfParallax-type="element" WfParallax-speed="0.5" WfParallax-direction="vertical" class="swparallax-circle">⭐</div>

                     <div WfParallax WfParallax-type="element" WfParallax-speed="0.7" WfParallax-direction="horizontal" class="swparallax-target-box"><i
                           class="wf wf-target Taler f20"></i></div>

                     <!-- Conteúdo principal -->
                     <div class="wfparallax-main-content">
                        <h3><i class="wf wf-theater Taler f20"></i> WfParallax Funcionando</h3>
                        <p>Role para ver os 3 tipos em ação</p>
                        <small>Background, Element e Mouse parallax</small>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Atributos e Configurações -->
            <div class="l">
               <div class="co6-g">
                  <h4>Atributos Disponíveis</h4>
                  <table class="tabela">
                     <thead>
                        <tr>
                           <th>Atributo</th>
                           <th>Tipo</th>
                           <th>Descrição</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><code>WfParallax-type</code></td>
                           <td>string</td>
                           <td>"background" | "element" | "mouse" (padrão: "background")</td>
                        </tr>
                        <tr>
                           <td><code>WfParallax-speed</code></td>
                           <td>number</td>
                           <td>Velocidade do movimento (padrão: 0.5)</td>
                        </tr>
                        <tr>
                           <td><code>WfParallax-direction</code></td>
                           <td>string</td>
                           <td>"vertical" | "horizontal" | qualquer outro = ambas (padrão: "vertical")</td>
                        </tr>
                        <tr>
                           <td><code>WfParallax-range</code></td>
                           <td>number</td>
                           <td>Alcance do movimento em pixels (padrão: 200)</td>
                        </tr>
                        <tr>
                           <td><code>WfParallax-invert</code></td>
                           <td>boolean</td>
                           <td>Inverte direção do movimento</td>
                        </tr>
                        <tr>
                           <td><code>WfParallax-mobile</code></td>
                           <td>boolean</td>
                           <td>Ativa/desativa em dispositivos móveis (padrão: true). Use <code>WfParallax-mobile="false"</code> para desativar.</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="co6-g">
                  <h4>Tipos Detalhados</h4>

                  <div class="wfparallax-utils-box">
                     <h5><i class="wf wf-image Taler f20"></i> Background Parallax</h5>
                     <ul style="margin: 10px 0">
                        <li>Move <code>backgroundPosition</code> da imagem de fundo</li>
                        <li>Ideal para hero sections e fundos</li>
                        <li>Funciona com <code>background-image</code></li>
                        <li>Aplica <code>background-attachment: fixed</code></li>
                     </ul>
                  </div>

                  <div class="swparallax-utils-box">
                     <h5><i class="wf wf-target-lock Taler f20"></i> Element Parallax</h5>
                     <ul style="margin: 10px 0">
                        <li>Move elementos usando <code>transform</code></li>
                        <li>Ideal para ícones, cards, elementos decorativos</li>
                        <li>Aplica <code>will-change: transform</code></li>
                        <li>Performance otimizada com GPU</li>
                     </ul>
                  </div>

                  <div class="swparallax-utils-box">
                     <h5><i class="wf wf-mouse Taler f20"></i> Mouse Parallax</h5>
                     <ul style="margin: 10px 0">
                        <li>Segue posição do cursor do mouse</li>
                        <li>Ideal para elementos interativos</li>
                        <li>Funciona com <code>mousemove</code></li>
                        <li>Suporta movimento combinado X+Y</li>
                     </ul>
                  </div>
               </div>
            </div>

            <!-- Demonstração de Velocidades -->
            <div class="l">
               <div class="co12-g">
                  <h3>Diferentes Velocidades</h3>
                  <p>Role para ver como diferentes velocidades afetam o movimento:</p>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h4>Super Lento (0.1)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.1" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=301');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
               ">
                     Velocidade: 0.1
                  </div>
               </div>

               <div class="co6-g">
                  <h4>Lento (0.3)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.3" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=302');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
               ">
                     Velocidade: 0.3
                  </div>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h4>Rápido (0.7)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.7" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=303');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
               ">
                     Velocidade: 0.7
                  </div>
               </div>

               <div class="co6-g">
                  <h4>Super Rápido (1.5)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="1.5" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=304');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
               ">
                     Velocidade: 1.5
                  </div>
               </div>
            </div>

            <!-- Demonstração de Direções -->
            <div class="l">
               <div class="co12-g">
                  <h3>Diferentes Direções</h3>
                  <p>Teste movimento vertical, horizontal e invertido:</p>
               </div>
            </div>

            <div class="l">
               <div class="co4-g">
                  <h4>Vertical (Padrão)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.3" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=305');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Movimento Vertical
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Horizontal</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.7" WfParallax-direction="horizontal" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=306');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Movimento Horizontal
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Invertido</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="1.2" WfParallax-invert style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=307');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Movimento Invertido
                  </div>
               </div>
            </div>

            <!-- Demonstração de Ranges -->
            <div class="l">
               <div class="co12-g">
                  <h3>Diferentes Ranges</h3>
                  <p>Controle o alcance do movimento em pixels:</p>
               </div>
            </div>

            <div class="l">
               <div class="co4-g">
                  <h4>Range Pequeno (100px)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.2" WfParallax-range="100" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=308');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Range: 100px
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Range Médio (300px)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.6" WfParallax-range="300" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=309');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Range: 300px
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Range Grande (600px)</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="1.0" WfParallax-range="600" style="
                  height: 200px;
                  background-image: url('https://picsum.photos/600/400?random=310');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Range: 600px
                  </div>
               </div>
            </div>

            <!-- Mouse Parallax -->
            <div class="l">
               <div class="co12-g">
                  <h3>Mouse Parallax</h3>
                  <p>Mova o mouse sobre os elementos para ver o efeito:</p>
               </div>
            </div>

            <div class="l">
               <div class="co3-g">
                  <h4>Mouse Vertical</h4>
                  <div WfParallax WfParallax-type="mouse" WfParallax-speed="0.2" WfParallax-direction="vertical" style="
                  height: 180px;
                  background: linear-gradient(45deg, #333, #555);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  cursor: pointer;
                  font-weight: bold;
               ">
                     Mouse Vertical
                  </div>
               </div>

               <div class="co3-g">
                  <h4>Mouse Horizontal</h4>
                  <div WfParallax WfParallax-type="mouse" WfParallax-speed="0.3" WfParallax-direction="horizontal" style="
                  height: 180px;
                  background: linear-gradient(45deg, #555, #777);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  cursor: pointer;
                  font-weight: bold;
               ">
                     Mouse Horizontal
                  </div>
               </div>

               <div class="co3-g">
                  <h4>Mouse Ambas Direções</h4>
                  <div WfParallax WfParallax-type="mouse" WfParallax-speed="0.4" WfParallax-direction="both" style="
                  height: 180px;
                  background: linear-gradient(45deg, #777, #999);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  cursor: pointer;
                  font-weight: bold;
               ">
                     Mouse X + Y
                  </div>
               </div>

               <div class="co3-g">
                  <h4>Mouse Invertido</h4>
                  <div WfParallax WfParallax-type="mouse" WfParallax-speed="0.5" WfParallax-invert style="
                  height: 180px;
                  background: linear-gradient(45deg, #999, #bbb);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  cursor: pointer;
                  font-weight: bold;
               ">
                     Mouse Invertido
                  </div>
               </div>
            </div>

            <!-- Element Parallax -->
            <div class="l">
               <div class="co12-g">
                  <h3>Element Parallax</h3>
                  <p>Elementos que se movem usando transform durante o scroll:</p>
               </div>
            </div>

            <div class="l">
               <div class="co4-g">
                  <h4>Elemento Vertical</h4>
                  <div style="
                  height: 200px;
                  background: var(--wf-bg);
                  border: 2px solid var(--wf-color);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
               ">
                     <div WfParallax WfParallax-type="element" WfParallax-speed="0.3" style="
                     width: 100px;
                     height: 100px;
                     background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                     border-radius: 8px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     color: white;
                     font-weight: bold;
                  ">
                        Elemento
                     </div>
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Elemento Horizontal</h4>
                  <div style="
                  height: 200px;
                  background: var(--wf-bg);
                  border: 2px solid var(--wf-color);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
               ">
                     <div WfParallax WfParallax-type="element" WfParallax-speed="0.4" WfParallax-direction="horizontal" style="
                     width: 100px;
                     height: 100px;
                     background: linear-gradient(45deg, #667eea, #764ba2);
                     border-radius: 8px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     color: white;
                     font-weight: bold;
                  ">
                        Horizontal
                     </div>
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Elemento com Range</h4>
                  <div style="
                  height: 200px;
                  background: var(--wf-bg);
                  border: 2px solid var(--wf-color);
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
               ">
                     <div WfParallax WfParallax-type="element" WfParallax-speed="0.6" WfParallax-range="150" style="
                     width: 100px;
                     height: 100px;
                     background: linear-gradient(45deg, #f093fb, #f5576c);
                     border-radius: 50%;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     color: white;
                     font-weight: bold;
                  ">
                        Range 150px
                     </div>
                  </div>
               </div>
            </div>

            <!-- Combinações Avançadas -->
            <div class="l">
               <div class="co12-g">
                  <h3>Combinações Avançadas</h3>
                  <p>Combine múltiplos atributos para efeitos únicos:</p>
               </div>
            </div>

            <div class="l">
               <div class="co4-g">
                  <h4>Super Rápido + Horizontal + Range Grande</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="1.5" WfParallax-direction="horizontal" WfParallax-range="600" style="
                  height: 180px;
                  background-image: url('https://picsum.photos/600/400?random=320');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Combinação 1
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Super Lento + Invertido + Range Pequeno</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.1" WfParallax-invert WfParallax-range="100" style="
                  height: 180px;
                  background-image: url('https://picsum.photos/600/400?random=321');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Combinação 2
                  </div>
               </div>

               <div class="co4-g">
                  <h4>Velocidade Média + Range Médio</h4>
                  <div WfParallax WfParallax-type="background" WfParallax-speed="0.6" WfParallax-range="300" style="
                  height: 180px;
                  background-image: url('https://picsum.photos/600/400?random=322');
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                  text-align: center;
                  font-weight: bold;
               ">
                     Combinação 3
                  </div>
               </div>
            </div>

            <!-- Exemplos de Código -->
            <div class="l">
               <div class="co6-g">
                  <h4>Códigos dos Exemplos</h4>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Velocidades diferentes -->
<div WfParallax WfParallax-type="background" WfParallax-speed="0.1">Super Lento</div>
<div WfParallax WfParallax-type="background" WfParallax-speed="1.5">Super Rápido</div>

<!-- Direções diferentes -->
<div WfParallax WfParallax-type="background" WfParallax-direction="horizontal">Horizontal</div>
<div WfParallax WfParallax-type="background" WfParallax-invert>Invertido</div>

<!-- Ranges diferentes -->
<div WfParallax WfParallax-type="background" WfParallax-range="100">Range Pequeno</div>
<div WfParallax WfParallax-type="background" WfParallax-range="600">Range Grande</div>

<!-- Mouse parallax -->
<div WfParallax WfParallax-type="mouse" WfParallax-direction="both">Mouse X + Y</div>
<div WfParallax WfParallax-type="mouse" WfParallax-invert>Mouse Invertido</div>

<!-- Element parallax -->
<div WfParallax WfParallax-type="element" WfParallax-speed="0.5">Elemento</div>
        </script></pre>
               </div>
               <div class="co6-g">
                  <h4>API JavaScript</h4>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática (padrão)
WfParallax.initAll();

// Inicialização em container específico
WfParallax.initAll(document.querySelector('.minha-secao'));

// Instância individual
const parallax = new WfParallax(element);

// Destruir instância
parallax.destroy();

// Verificar se elemento tem parallax
if (element._wfparallax) {
  console.log('Elemento tem parallax ativo');
}

// Nota: o construtor atual aceita apenas o elemento; passe opções via atributos ou API
// Exemplo para criar com atributos no DOM ou usar initAll
        </script></pre>

                  <div class="swparallax-utils-box">
                     <b><i class="wf wf-lightbulb Taler f20"></i> Dica Avançada:</b><br />
                     Para mouse parallax com movimento em ambas direções, use
                     <code>WfParallax-direction="both"</code> ou qualquer valor que não seja "vertical" ou "horizontal".
                  </div>
               </div>
            </div>

            <!-- Resumo -->
            <div class="l">
               <div class="co12-g">
                  <h3>Resumo</h3>
                  <div class="swparallax-utils-box">
                     <h4 style="margin-top: 0"><i class="wf wf-check-circle Taler f20"></i> Características do WfParallax</h4>
                     <ul>
                        <li><b><i class="wf wf-image Taler f20"></i> Background Parallax:</b> Move backgroundPosition durante scroll para hero sections</li>
                        <li><b><i class="wf wf-target-lock Taler f20"></i> Element Parallax:</b> Move elementos com transform otimizado por GPU</li>
                        <li><b><i class="wf wf-mouse Taler f20"></i> Mouse Parallax:</b> Movimento baseado na posição do cursor do mouse</li>
                        <li><b><i class="wf wf-cog Taler f20"></i> Configuração Flexível:</b> Velocidade, direção, alcance e inversão personalizáveis</li>
                        <li><b><i class="wf wf-image Taler f20"></i> Responsividade:</b> Controle específico para dispositivos móveis</li>
                        <li><b><i class="wf wfs-zap Taler f20"></i> Performance:</b> willChange e otimizações para movimento fluido</li>
                        <li><b><i class="wf wf-wrench Taler f20"></i> API Simples:</b> Métodos destroy() e initAll() para controle programático</li>
                        <li><b><i class="wf wf-target-lock Taler f20"></i> Múltiplos Elementos:</b> Suporte a vários parallax na mesma página</li>
                     </ul>

                     <div style="margin-top: 20px; padding: 15px; background: rgba(156, 39, 176, 0.1); border-radius: 8px">
                        <b><i class="wf wf-target Taler f20"></i> Objetivo Principal:</b> Proporcionar efeitos parallax avançados com 3 tipos distintos (background,
                        element, mouse) para criar experiências
                        visuais
                        envolventes e interativas.
                     </div>
                  </div>
               </div>
            </div>
      </section>
</section>