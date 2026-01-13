<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfText</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfText</li>
        </ol>
      </nav>
    </div>
<section class="wftextx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <h3>[Carrossel de Textos Animados]</h3>
               <p>
                  O <b>WfText</b> é um carrossel de textos animados que exibe frases, chamadas, depoimentos ou qualquer conteúdo textual de forma sequencial e atraente.
                  Oferece múltiplos efeitos de transição, autoplay configurável, navegação manual e integração total com WfDay.
               </p>
               <div style="background: var(--bg-bl); border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b>🎭 CARROSSEL TEXTO:</b> Rotação automática de frases e chamadas<br />
                  <b>✨ EFEITOS VARIADOS:</b> Fade, slide, zoom, bounce e muito mais<br />
                  <b>🎯 NAVEGAÇÃO COMPLETA:</b> Setas, indicadores e autoplay
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co6-g">
               <h3>Uso Básico</h3>
               <p>Use a classe <code>.wf-text-carousel</code> no container com itens <code>.wf-text-item</code>:</p>
               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div class="wf-text-carousel"
     WfText-effect="fade"
     WfText-interval="3000"
     WfText-arrows="true"
     WfText-indicators="true">
  <div class="wf-text-item">
    Empresa líder em <b>importação</b> e exportação.
  </div>
  <div class="wf-text-item">
    Atendimento <span style="color:#FFD700">personalizado</span> para sua empresa.
  </div>
  <div class="wf-text-item">
    Fale com nossos <a href="/contato">especialistas</a>
  </div>
</div>
</script>
</pre>
            </div>
            <div class="co6-g et7_">
               <div style="background: var(--bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b>📌 Estrutura Obrigatória:</b><br /><br />
                  • Container: <code>.wf-text-carousel</code> (classe CSS)<br />
                  • Itens: <code>.wf-text-item</code><br />
                  • CSS: Injetado automaticamente<br />
                  • Inicialização: Automática via <code>WfText.initAll()</code>
               </div>
            </div>
            <div class="co12-g">
               <h3>Exemplos de Animações</h3>
               <p>Diferentes tipos de animação para textos com velocidades variadas:</p>

               <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; border-radius: 8px; margin: 15px 0; color: white">
                  <b>⚡ Controle de Velocidade:</b><br /><br />
                  • <b>WfText-transition</b>: Controla a velocidade da animação (padrão: 700ms)<br />
                  • <b>1500ms</b> = Suave e elegante<br />
                  • <b>2000ms</b> = Muito suave (ideal para fade)<br />
                  • <b>2500ms+</b> = Ultra suave e cinematográfico<br />
                  • <b>1000ms</b> = Normal (para efeitos rápidos)
               </div>

               <h3 style="margin-top: 20px; color: var(--color)">🎭 Fade Clássico (Transição Ultra Suave - 2500ms)</h3>

               <div class="wf-text-carousel" WfText-effect="fade" WfText-interval="4000" WfText-transition="2500" WfText-arrows="false" WfText-indicators="true" WfText-autoplay="true" style="
                  height: 120px;
                  background: var(--bg-bl);
                  border: 2px solid #2196f3;
                  border-radius: 8px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               ">
                  <div class="wf-text-item" style="font-size: 20px; font-weight: bold; color: #2196f3; text-align: center">💼 Soluções empresariais completas</div>
                  <div class="wf-text-item" style="font-size: 20px; font-weight: bold; color: #2196f3; text-align: center">🚀 Tecnologia de última geração</div>
                  <div class="wf-text-item" style="font-size: 20px; font-weight: bold; color: #2196f3; text-align: center">⭐ Atendimento 24/7 especializado</div>
               </div>

               <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin: 15px 0; text-align: center">
                  <small> <b>🎭 Demonstração:</b> Transição muito suave de 1500ms (1.5 segundos) - perfeito para fade elegante </small>
               </div>

               <!-- Exemplo 2: Slides Dinâmicos -->
               <h3 style="margin-top: 30px; color: var(--color)">🎬 Slides Dinâmicos (Transição Suave - 1200ms)</h3>
               <p>
                  <small>Diferentes direções de movimento com transição bem visível</small>
               </p>
               <div class="wf-text-carousel" WfText-effect="slide-left" WfText-interval="3000" WfText-transition="1200" WfText-arrows="true" WfText-indicators="false" WfText-autoplay="true" style="
                  height: 120px;
                  background: var(--bg-bl);
                  border: 2px solid #ff9800;
                  border-radius: 8px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               ">
                  <div class="wf-text-item" WfText-effect="slide-left" style="font-size: 18px; font-weight: 600; color: #ff9800; text-align: center">← Deslizando da esquerda</div>
                  <div class="wf-text-item" WfText-effect="slide-right" style="font-size: 18px; font-weight: 600; color: #ff9800; text-align: center">Deslizando da direita →</div>
                  <div class="wf-text-item" WfText-effect="slide-up" style="font-size: 18px; font-weight: 600; color: #ff9800; text-align: center">↑ Subindo do fundo</div>
                  <div class="wf-text-item" WfText-effect="slide-down" style="font-size: 18px; font-weight: 600; color: #ff9800; text-align: center">↓ Descendo do topo</div>
               </div>

               <!-- Exemplo 3: Zoom & Bounce -->
               <h3 style="margin-top: 30px; color: var(--color)">🎯 Zoom & Bounce (Transição Normal - 800ms)</h3>
               <p>
                  <small>Efeitos de escala e salto com animação bem visível</small>
               </p>
               <div class="wf-text-carousel" WfText-effect="zoom-in" WfText-interval="2500" WfText-transition="800" WfText-arrows="false" WfText-indicators="true" WfText-autoplay="true" style="
                  height: 120px;
                  background: var(--bg-bl);
                  border: 2px solid #4caf50;
                  border-radius: 8px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               ">
                  <div class="wf-text-item" WfText-effect="zoom-in" style="font-size: 22px; font-weight: bold; color: #4caf50; text-align: center">🎯 ZOOM IN!</div>
                  <div class="wf-text-item" WfText-effect="zoom-out" style="font-size: 22px; font-weight: bold; color: #4caf50; text-align: center">📤 Zoom Out!</div>
                  <div class="wf-text-item" WfText-effect="bounce" style="font-size: 22px; font-weight: bold; color: #4caf50; text-align: center">🏀 BOUNCE!</div>
               </div>

               <!-- Exemplo 4: Chamadas de Marketing -->
               <h3 style="margin-top: 30px; color: var(--color)">📢 Chamadas de Marketing (Transição Balanceada - 1000ms)</h3>
               <p>
                  <small>Estilo visual atrativo com gradiente e animação equilibrada</small>
               </p>
               <div class="wf-text-carousel" WfText-effect="fade" WfText-interval="4000" WfText-transition="1000" WfText-arrows="true" WfText-indicators="true" WfText-autoplay="true" style="
                  height: 140px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 12px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
               ">
                  <div class="wf-text-item" WfText-effect="slide-up"
                     style="font-size: 24px; font-weight: bold; color: #fff; text-align: center; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)">
                     🔥 PROMOÇÃO LIMITADA
                  </div>
                  <div class="wf-text-item" WfText-effect="zoom-in"
                     style="font-size: 20px; font-weight: 600; color: #fff; text-align: center; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)">
                     💎 Qualidade Premium Garantida
                  </div>
                  <div class="wf-text-item" WfText-effect="bounce"
                     style="font-size: 18px; font-weight: 500; color: #fff; text-align: center; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)">
                     📞 Fale Conosco: (11) 99999-9999
                  </div>
                  <div class="wf-text-item" WfText-effect="slide-right"
                     style="font-size: 22px; font-weight: bold; color: #fff; text-align: center; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)">
                     ⚡ Entrega em 24h para SP
                  </div>
               </div>

               <!-- Exemplo 5: Rápido & Dinâmico -->
               <h3 style="margin-top: 30px; color: var(--color)">⚡ Rápido & Dinâmico (Transição Rápida - 500ms)</h3>
               <p>
                  <small>Transições rápidas porém visíveis - ideal para indicadores de status</small>
               </p>
               <div class="wf-text-carousel" WfText-effect="slide-left" WfText-interval="1800" WfText-transition="500" WfText-arrows="false" WfText-indicators="false" WfText-autoplay="true"
                  style="
                  height: 80px;
                  background: var(--bg-bl);
                  border: 2px solid #e91e63;
                  border-radius: 8px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               ">
                  <div class="wf-text-item" WfText-effect="slide-left" style="font-size: 16px; font-weight: 600; color: #e91e63; text-align: center">🚀 Carregando...</div>
                  <div class="wf-text-item" WfText-effect="slide-right" style="font-size: 16px; font-weight: 600; color: #e91e63; text-align: center">✅ Processando dados</div>
                  <div class="wf-text-item" WfText-effect="bounce" style="font-size: 16px; font-weight: 600; color: #e91e63; text-align: center">🎉 Pronto! Sucesso!</div>
                  <div class="wf-text-item" WfText-effect="fade" style="font-size: 16px; font-weight: 600; color: #e91e63; text-align: center">🔄 Reiniciando...</div>
               </div>
            </div>
         </div>

         <!-- Atributos e Configurações -->
         <div class="l">
            <div class="co6-g">
               <h3>Atributos Disponíveis</h3>
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
                        <td><code>WfText-effect</code></td>
                        <td>string</td>
                        <td>Efeito global de transição (padrão: "fade")</td>
                     </tr>
                     <tr>
                        <td><code>WfText-interval</code></td>
                        <td>number</td>
                        <td>Tempo entre trocas automáticas em ms (padrão: 4000)</td>
                     </tr>
                     <tr>
                        <td><code>WfText-transition</code></td>
                        <td>number</td>
                        <td>Duração da animação em ms (padrão: 700)</td>
                     </tr>
                     <tr>
                        <td><code>WfText-arrows</code></td>
                        <td>boolean</td>
                        <td>Exibir setas de navegação (padrão: true)</td>
                     </tr>
                     <tr>
                        <td><code>WfText-indicators</code></td>
                        <td>boolean</td>
                        <td>Exibir indicadores (bolinhas) (padrão: true)</td>
                     </tr>
                     <tr>
                        <td><code>WfText-autoplay</code></td>
                        <td>boolean</td>
                        <td>Reprodução automática (padrão: true)</td>
                     </tr>
                  </tbody>
               </table>

               <div style="background: var(--wf-bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                  <b>⚠️ Importante:</b><br /><br />
                  • Cada <code>.wf-text-item</code> pode ter seu próprio <code>WfText-effect</code><br />
                  • CSS é injetado automaticamente no &lt;head&gt;<br />
                  • Navegação por setas e indicadores criada automaticamente<br />
                  • Inicialização automática via <code>WfText.initAll()</code>
               </div>
            </div>
            <div class="co6-g">
               <h3>Efeitos de Transição</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Efeito</th>
                        <th>Descrição</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>fade</code></td>
                        <td>Transição com opacity (padrão)</td>
                     </tr>
                     <tr>
                        <td><code>slide-left</code></td>
                        <td>Desliza da direita para esquerda</td>
                     </tr>
                     <tr>
                        <td><code>slide-right</code></td>
                        <td>Desliza da esquerda para direita</td>
                     </tr>
                     <tr>
                        <td><code>slide-up</code></td>
                        <td>Desliza de baixo para cima</td>
                     </tr>
                     <tr>
                        <td><code>slide-down</code></td>
                        <td>Desliza de cima para baixo</td>
                     </tr>
                     <tr>
                        <td><code>zoom-in</code></td>
                        <td>Zoom de pequeno para normal</td>
                     </tr>
                     <tr>
                        <td><code>zoom-out</code></td>
                        <td>Zoom de grande para normal</td>
                     </tr>
                     <tr>
                        <td><code>bounce</code></td>
                        <td>Efeito de "pulo" com transform</td>
                     </tr>
                  </tbody>
               </table>

               <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin: 15px 0">
                  <small> <b>💡 Dica:</b> Combine efeitos diferentes em cada item para criar experiências visuais únicas e dinâmicas! </small>
               </div>
            </div>
         </div>

         <!-- Exemplos Práticos -->
         <div class="l">
            <div class="co6-g">
               <h3>Efeitos Combinados</h3>
               <p>Baseado no teste real com diferentes efeitos por item:</p>

               <pre WfCode WfCode-lang="html"><script type="text/plain">
<div class="wf-text-carousel" WfText-effect="fade" WfText-interval="2500">
  <div class="wf-text-item" WfText-effect="fade">
    Texto com efeito Fade
  </div>
  <div class="wf-text-item" WfText-effect="slide-left">
    Texto com Slide Left
  </div>
  <div class="wf-text-item" WfText-effect="slide-right">
    Texto com Slide Right
  </div>
  <div class="wf-text-item" WfText-effect="zoom-in">
    Texto com Zoom In
  </div>
  <div class="wf-text-item" WfText-effect="bounce">
    Texto com Bounce
  </div>
</div>
        </script></pre>
            </div>
            <div class="co6-g">
               <h3>API JavaScript</h3>
               <p>Métodos disponíveis para controle programático:</p>

               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática (executada pelo WfFull)
WfText.initAll();

// Inicialização em container específico
WfText.initAll(document.querySelector('.minha-secao'));

// Instância individual
const textCarousel = new WfText('.wf-text-carousel');

// Métodos da instância
textCarousel.next();          // Próximo item
textCarousel.prev();          // Item anterior
textCarousel.show(2);         // Ir para índice específico
textCarousel.start(); // Iniciar autoplay
textCarousel.stop();  // Parar autoplay
        </script></pre>

               <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin: 15px 0">
                  <small> <b>📌 Nota:</b> O WfText usa seletor de classe <code>.wf-text-carousel</code> para encontrar os elementos. Use sempre a classe CSS, não atributos.
                  </small>
               </div>
            </div>
         </div>

         <!-- Resumo -->
         <div class="l">
            <div class="co12-g">
               <h3>Resumo</h3>
               <div style="background: var(--bg-bl); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745">
                  <h3 style="margin-top: 0">✅ Características do WfText</h3>
                  <ul>
                     <li><b>🎭 Carrossel de Textos:</b> Rotação automática de frases e chamadas</li>
                     <li><b>✨ Efeitos Variados:</b> 8 tipos de transição (fade, slide, zoom, bounce)</li>
                     <li><b>🎯 Navegação Completa:</b> Setas automáticas e indicadores visuais</li>
                     <li><b>⚙️ Configuração Individual:</b> Cada item pode ter seu próprio efeito</li>
                     <li><b>⏰ Autoplay Configurável:</b> Intervalo e transição personalizáveis</li>
                     <li><b>🎨 CSS Integrado:</b> Estilos injetados automaticamente no head</li>
                     <li><b>📱 Totalmente Responsivo:</b> Adaptação automática para mobile</li>
                     <li><b>⚡ WfFull Integrado:</b> Inicialização automática via WfAjax</li>
                  </ul>

                  <div style="margin-top: 20px; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 8px">
                     <b>🎯 Objetivo Principal:</b> Exibir conteúdo textual de forma rotativa e animada, ideal para frases de destaque, depoimentos, chamadas promocionais
                     e
                     qualquer conteúdo que precisa alternar automaticamente.
                  </div>
               </div>
            </div>
         </div>
      </div>

<script>
  try { if (window.WfText && typeof window.WfText.initAll === 'function') { WfText.initAll(document); } } catch (e) {}
</script>

</section>