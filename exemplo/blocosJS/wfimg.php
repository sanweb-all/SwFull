<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfImg</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfImg</li>
        </ol>
      </nav>
    </div>
    <section class="wfimgx">
      <div class="g-xg">
        <!-- Cabeçalho do Componente -->
        <div class="l">
          <div class="co12-g">
            <h3>[Lightbox de Imagens]</h3>
            <p>
              O <b>WfImg</b> é um lightbox completo, ideal para galerias
              com navegação, resize animado e preload. Use em links (<code>&lt;a href="..." WfImg&gt;</code>).
            </p>
            <div
              style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-link wdest2-color f20"></i> ATIVAÇÃO POR
                LINKS:</b>
              Use <code>WfImg</code> em links que apontam para a imagem<br />
              <b><i class="wf wf-camera wdest2-color f20"></i> LIGHTBOX COM
                LOAD:</b>
              Loader animado e resize suave<br />
              <b><i class="wf wf-target-lock wdest2-color f20"></i>
                GRUPOS:</b>
              Use o mesmo valor no atributo para agrupar imagens
            </div>
          </div>
        </div>

        <!-- Uso Básico -->
        <div class="l">
          <div class="co6-g">
            <h3>Uso Básico</h3>
            <p>
              Para criar um lightbox, use <b>links</b> com o atributo
              <code>WfImg</code> apontando para imagens:
            </p>
            <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Link único para imagem -->
<a href="imagem-grande.jpg" WfImg WfImg-title="Título da imagem">
  <img src="thumb-pequeno.jpg" alt="Miniatura">
</a>

<!-- Grupo de imagens (mesmo valor no WfImg) -->
<div class="galeria">
  <a href="img1-grande.jpg" WfImg="galeria1" WfImg-title="Primeira imagem">
    <img src="img1-thumb.jpg" alt="Thumb 1">
  </a>
  <a href="img2-grande.jpg" WfImg="galeria1" WfImg-title="Segunda imagem">
    <img src="img2-thumb.jpg" alt="Thumb 2">
  </a>
  <a href="img3-grande.jpg" WfImg="galeria1" WfImg-title="Terceira imagem">
    <img src="img3-thumb.jpg" alt="Thumb 3">
  </a>
</div>

<!-- Alternativa com WfImg-wfimg -->
<a href="foto.jpg" WfImg="portfolio" WfImg-title="Meu Portfólio">
  <img src="foto-thumb.jpg" alt="Foto">
</a>
        </script></pre>
          </div>
          <div class="co6-g">
            <h3>Exemplo Funcionando</h3>
            <p>Clique nas imagens para abrir o lightbox (grupo "demo"):</p>
            <div
              style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 10px;
              margin: 20px 0;
            ">
              <a
                href="https://picsum.photos/800/600?random=1"
                WfImg="demo"
                WfImg-title="<i class='wf wf-sunrise wdest2-color f20'></i> Paisagem Natural"
                style="
                display: block;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease;
              "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
                <img
                  src="https://picsum.photos/300/200?random=1"
                  alt="Imagem de exemplo 1"
                  style="
                  width: 100%;
                  height: 120px;
                  object-fit: cover;
                  cursor: pointer;
                  display: block;
                " />
              </a>

              <a
                href="https://picsum.photos/800/600?random=2"
                WfImg="demo"
                WfImg-title="<i class='wf wf-building wdest2-color f20'></i> Cidade Moderna"
                style="
                display: block;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease;
              "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
                <img
                  src="https://picsum.photos/300/200?random=2"
                  alt="Imagem de exemplo 2"
                  style="
                  width: 100%;
                  height: 120px;
                  object-fit: cover;
                  cursor: pointer;
                  display: block;
                " />
              </a>

              <a
                href="https://picsum.photos/800/600?random=3"
                WfImg="demo"
                WfImg-title="<i class='wf wf-droplet wdest2-color f20'></i> Oceano Azul"
                style="
                display: block;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease;
              "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
                <img
                  src="https://picsum.photos/300/200?random=3"
                  alt="Imagem de exemplo 3"
                  style="
                  width: 100%;
                  height: 120px;
                  object-fit: cover;
                  cursor: pointer;
                  display: block;
                " />
              </a>

              <a
                href="https://picsum.photos/800/600?random=4"
                WfImg="demo"
                WfImg-title="<i class='wf wf-tree wdest2-color f20'></i> Floresta Verde"
                style="
                display: block;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease;
              "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
                <img
                  src="https://picsum.photos/300/200?random=4"
                  alt="Imagem de exemplo 4"
                  style="
                  width: 100%;
                  height: 120px;
                  object-fit: cover;
                  cursor: pointer;
                  display: block;
                " />
              </a>
            </div>
            <p>
              <small><i class="wf wf-pointer wdest2-color f20"></i> Clique em qualquer
                imagem para abrir o lightbox com navegação entre as 4
                imagens!</small>
            </p>
          </div>
        </div>

        <!-- Navegação por Teclado -->
        <div class="l">
          <div class="co6-g">
            <h3>Navegação por Teclado</h3>
            <p>
              O WfImg oferece controle via teclado quando o lightbox está aberto:
            </p>
            <table class="tabela">
              <thead>
                <tr>
                  <th>Tecla</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>←</kbd> ArrowLeft</td>
                  <td>Imagem anterior (ou última se estiver na primeira)</td>
                </tr>
                <tr>
                  <td><kbd>→</kbd> ArrowRight</td>
                  <td>Próxima imagem (ou primeira se estiver na última)</td>
                </tr>
                <tr>
                  <td><kbd>ESC</kbd> Escape</td>
                  <td>Fechar lightbox</td>
                </tr>
              </tbody>
            </table>

            <div
              style="
              background: var(--bg);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-bulb wdest2-color f20"></i> Navegação
                Circular:</b><br />
              As setas fazem navegação circular - da última imagem volta para a
              primeira, e da primeira vai para a última.
            </div>
          </div>
          <div class="co6-g">
            <h3>Recursos do Lightbox</h3>
            <ul>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Resize Animado:</b> Caixa se redimensiona suavemente
                entre imagens
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Loader Animado:</b> Spinner durante carregamento de
                imagens
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Títulos Personalizados:</b> Usando atributo
                <code>WfImg-title</code> no link
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Transições Suaves:</b> Animações cubic-bezier
                elegantes
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Botão Fechar:</b> × no canto superior direito
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Clique no Overlay:</b> Fecha clicando na área escura
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Setas de Navegação:</b> ‹ › para navegar entre
                imagens
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Contador:</b> "Imagem X de Y" quando há múltiplas
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Responsivo:</b> Máximo 96vw × 80vh, adaptável
              </li>
              <li>
                <i class="wf wf-check-circle wdest2-color f20"></i>
                <b>Grupos:</b> Navegação automática entre imagens do
                mesmo grupo
              </li>
            </ul>
            <div
              style="
              background: var(--bg);
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
              <b><i class="wf wf-target wdest2-color f20"></i>
                Performance:</b>
              Pré-carrega imagens para transições instantâneas e aplica dimensões
              otimizadas automaticamente.
            </div>
          </div>
        </div>

        <!-- Grupos de Galerias -->
        <div class="l">
          <div class="co12-g">
            <h3>Grupos Separados</h3>
            <p>
              Exemplo de múltiplos grupos independentes usando diferentes valores
              no atributo WfImg:
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <div
              style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
              margin: 20px 0;
            ">
              <!-- Grupo Paisagens -->
              <div
                style="
                text-align: center;
                padding: 15px;
                background: var(--bg);
                border-radius: 8px;
              ">
                <h3 style="color: #2196f3; margin-bottom: 15px">
                  <i class="wf wf-sunrise wdest2-color f20"></i> Paisagens (Grupo
                  "paisagens")
                </h3>
                <div
                  style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
                  <a
                    href="https://picsum.photos/800/600?random=10"
                    WfImg="paisagens"
                    WfImg-title="<i class='wf wf-mountain wdest2-color f20'></i> Montanha Majestosa">
                    <img
                      src="https://picsum.photos/400/300?random=10"
                      alt="Montanha"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=11"
                    WfImg="paisagens"
                    WfImg-title="<i class='wf wf-image wdest2-color f20'></i> Lago Cristalino">
                    <img
                      src="https://picsum.photos/400/300?random=11"
                      alt="Lago"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=12"
                    WfImg="paisagens"
                    WfImg-title="<i class='wf wf-wheat wdest2-color f20'></i> Campo Dourado">
                    <img
                      src="https://picsum.photos/400/300?random=12"
                      alt="Campo"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=13"
                    WfImg="paisagens"
                    WfImg-title="<i class='wf wf-umbrella wdest2-color f20'></i> Praia Paradisíaca">
                    <img
                      src="https://picsum.photos/400/300?random=13"
                      alt="Praia"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px">
                  Clique para navegar apenas entre as 4 paisagens
                </p>
              </div>

              <!-- Grupo Urbano -->
              <div
                style="
                text-align: center;
                padding: 15px;
                background: var(--bg);
                border-radius: 8px;
              ">
                <h3 style="color: #ff9800; margin-bottom: 15px">
                  <i class="wf wf-building wdest2-color f20"></i> Urbano (Grupo
                  "urbano")
                </h3>
                <div
                  style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
                  <a
                    href="https://picsum.photos/800/600?random=20"
                    WfImg="urbano"
                    WfImg-title="<i class='wf wf-moon wdest2-color f20'></i> Cidade à Noite">
                    <img
                      src="https://picsum.photos/400/300?random=20"
                      alt="Cidade"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=21"
                    WfImg="urbano"
                    WfImg-title="<i class='wf wf-road wdest2-color f20'></i> Rua Movimentada">
                    <img
                      src="https://picsum.photos/400/300?random=21"
                      alt="Rua"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=22"
                    WfImg="urbano"
                    WfImg-title="<i class='wf wf-building wdest2-color f20'></i> Arquitetura Moderna">
                    <img
                      src="https://picsum.photos/400/300?random=22"
                      alt="Prédio"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=23"
                    WfImg="urbano"
                    WfImg-title="<i class='wf wf-bridge wdest2-color f20'></i> Ponte Iluminada">
                    <img
                      src="https://picsum.photos/400/300?random=23"
                      alt="Ponte"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px">
                  Clique para navegar apenas entre as 4 fotos urbanas
                </p>
              </div>

              <!-- Imagens Individuais -->
              <div
                style="
                text-align: center;
                padding: 15px;
                background: var(--bg);
                border-radius: 8px;
              ">
                <h3 style="color: #4caf50; margin-bottom: 15px">
                  <i class="wf wf-image wdest2-color f20"></i> Individuais (Sem
                  grupo)
                </h3>
                <div
                  style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
                  <a
                    href="https://picsum.photos/800/600?random=30"
                    WfImg
                    WfImg-title="<i class='wf wf-tree wdest2-color f20'></i> Foto Individual 1">
                    <img
                      src="https://picsum.photos/400/300?random=30"
                      alt="Individual 1"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=31"
                    WfImg
                    WfImg-title="<i class='wf wf-flower wdest2-color f20'></i> Foto Individual 2">
                    <img
                      src="https://picsum.photos/400/300?random=31"
                      alt="Individual 2"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=32"
                    WfImg
                    WfImg-title="<i class='wf wf-butterfly wdest2-color f20'></i> Foto Individual 3">
                    <img
                      src="https://picsum.photos/400/300?random=32"
                      alt="Individual 3"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                  <a
                    href="https://picsum.photos/800/600?random=33"
                    WfImg
                    WfImg-title="<i class='wf wf-droplet wdest2-color f20'></i> Foto Individual 4">
                    <img
                      src="https://picsum.photos/400/300?random=33"
                      alt="Individual 4"
                      style="
                      width: 100%;
                      height: 80px;
                      object-fit: cover;
                      border-radius: 4px;
                      cursor: pointer;
                    " />
                  </a>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 10px">
                  Cada imagem abre individualmente (sem navegação)
                </p>
              </div>
            </div>

            <!-- API e Resumo -->
            <div class="l" style="margin-top: 40px">
              <div class="co6-g">
                <h3>API JavaScript</h3>
                <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática via wffull.js
// (já está ativa para elementos com WfImg)

// Inicialização manual se necessário
import WfImg from '../../assets/components/compJs/WfImg.js';
WfImg.initAll(); // Inicializa todos os links [WfImg]

// Ou escopo específico
const container = document.querySelector('.galeria');
WfImg.initAll(container);
            </script></pre>
              </div>
              <div class="co6-g">
                <h3>Estrutura CSS Incluída</h3>
                <p>O WfImg inclui automaticamente seus estilos CSS:</p>
                <ul style="font-size: 14px">
                  <li>
                    <i class="wf wf-check-circle wdest2-color f20"></i>
                    <b>Overlay escuro:</b> rgba(0,0,0,0.92)
                  </li>
                  <li>
                    <i class="wf wf-check-circle wdest2-color f20"></i>
                    <b>Transições suaves:</b> cubic-bezier(.23,1,.32,1)
                  </li>
                  <li>
                    <i class="wf wf-check-circle wdest2-color f20"></i>
                    <b>Box responsivo:</b> max 96vw × 80vh
                  </li>
                  <li>
                    <i class="wf wf-check-circle wdest2-color f20"></i>
                    <b>Loader animado:</b> Spinner CSS puro
                  </li>
                  <li>
                    <i class="wf wf-check-circle wdest2-color f20"></i>
                    <b>Mobile otimizado:</b> @media queries incluídas
                  </li>
                </ul>

                <div
                  style="
                  background: var(--bg);
                  padding: 15px;
                  border-radius: 8px;
                  margin: 15px 0;
                ">
                  <b><i class="wf wf-target wdest2-color f20"></i> Zero
                    Configuração:</b><br />
                  Adicione WfImg nos links e está pronto para usar!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <script>
    // O WebfullLoader já inicializa automaticamente todos os componentes
    // incluindo o WfImg - nenhuma inicialização manual necessária
    document.addEventListener("DOMContentLoaded", function() {
      console.log(
        "WfImg documentação carregada - WebfullLoader cuidará da inicialização"
      );
    });
  </script>