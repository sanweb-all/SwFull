<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfSlid2</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfSlid2</li>
        </ol>
      </nav>
    </div>
<section class="swtextx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <div class="icoTipo aniline-d-g">
                  <span WfTool="JavaScript"> <i class="bx bx-code-alt"></i> <small>JS</small> </span>
               </div>
               <h2 class="wfpage">WfSlid2 <small>[Carrossel de Imagens Simples]</small></h2>
               <p>
                  O <strong>WfSlid2</strong> é um componente de carrossel de imagens simples e funcional, ideal para exibir banners e outros conteúdos de forma dinâmica.
               </p>
               <div style="background: var(--bg-bl); border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <strong>🎠 CARROSSEL SIMPLES:</strong> Funcionalidade de carrossel com autoplay, navegação por setas e indicadores.<br />
                  <strong>✨ EFEITOS DE TRANSIÇÃO:</strong> Inclui efeitos de fade e slide (horizontal e vertical).<br />
                  <strong>🔄 CONTROLE TOTAL:</strong> Opções para loop, pausar no hover e muito mais.
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co12-g">
               <h3 class="wfpage">Uso Básico</h3>
               <p>Para usar, crie um container com o atributo <code>WfSlid2</code> e adicione os slides com a classe <code>.wfslid2-slide</code>.</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfSlid2>
  <div class="wfslid2-slide">
    <img src="https://placehold.co/800x400/000000/FFFFFF/png?text=Slide+1" alt="Slide 1">
  </div>
  <div class="wfslid2-slide">
    <img src="https://placehold.co/800x400/333333/FFFFFF/png?text=Slide+2" alt="Slide 2">
  </div>
</div>
</script>
</pre>
            </div>
            <div class="co12-g et7_">
                <h4 class="wfpage">Demonstração</h4>
                <div WfSlid2>
                  <div class="wfslid2-slide">
                    <img src="https://placehold.co/800x400/000000/FFFFFF/png?text=Slide+1" alt="Slide 1">
                  </div>
                  <div class="wfslid2-slide">
                    <img src="https://placehold.co/800x400/333333/FFFFFF/png?text=Slide+2" alt="Slide 2">
                  </div>
                </div>
            </div>
         </div>

        <!-- Atributos e Configurações -->
         <div class="l">
            <div class="co12-g">
               <h4 class="wfpage">Atributos Disponíveis</h4>
               <table class="table">
                  <thead>
                     <tr>
                        <th>Atributo</th>
                        <th>Tipo</th>
                        <th>Descrição</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfSlid2-autoplay</code></td>
                        <td>boolean</td>
                        <td>Inicia o carrossel automaticamente (padrão: false).</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-interval</code></td>
                        <td>number</td>
                        <td>Intervalo do autoplay em milissegundos (padrão: 4000).</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-transition</code></td>
                        <td>string</td>
                        <td>Efeito de transição: 'fade' ou 'slider' (padrão: 'fade').</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-direction</code></td>
                        <td>string</td>
                        <td>Direção da transição do slider: 'horizontal' ou 'vertical' (padrão: 'horizontal').</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-duration</code></td>
                        <td>number</td>
                        <td>Duração da transição em milissegundos.</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-arrows</code></td>
                        <td>boolean</td>
                        <td>Exibe as setas de navegação (padrão: true).</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-indicators</code></td>
                        <td>boolean</td>
                        <td>Exibe os indicadores de navegação (padrão: true).</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-pausehover</code></td>
                        <td>boolean</td>
                        <td>Pausa o autoplay quando o mouse está sobre o carrossel (padrão: false).</td>
                     </tr>
                     <tr>
                        <td><code>WfSlid2-loop</code></td>
                        <td>boolean</td>
                        <td>Define se o carrossel deve voltar ao início após o último slide (padrão: false).</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
  </section>
</section>