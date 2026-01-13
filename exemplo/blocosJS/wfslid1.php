<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfSlid1</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfSlid1</li>
        </ol>
      </nav>
    </div>
<section class="wfslid1x">
    <div class="g-xg">
      <!-- Cabeçalho do Componente -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">[Sistema de Carrossel/Slider]</h3>
          <p>
            O <b>WfSlid1</b> é o sistema oficial de carrossel do
            WEBFULL Framework. Oferece efeitos de transição suaves, autoplay
            configurável, navegação por setas e indicadores, com total controle
            sobre o comportamento.
          </p>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b
              ><i class="wf wf-fast-forward-circle Taler f20"></i>
              IMPORTANTE:</b
            >
            Este é o sistema de carrossel OFICIAL do WEBFULL!<br />
            <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use
            carrosseis de terceiros desnecessários<br />
            <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use
            WfSlid1 para consistência e performance
          </div>
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #2196f3;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
              color: var(--wf-color);
            "
          >
            <b><i class="wf wf-image Taler f20"></i> EFEITOS:</b>
            Fade, slide, zoom com transições suaves<br />
            <b><i class="wf wf-play Taler f20"></i> AUTOPLAY:</b>
            Configurável com pausa no hover<br />
            <b
              ><i class="wf wf-navigation Taler f20"></i> NAVEGAÇÃO:</b
            >
            Setas e indicadores opcionais<br />
            <b><i class="wf wf-mobile Taler f20"></i> RESPONSIVO:</b>
            Adaptação perfeita para todos os dispositivos<br />
            <b><i class="wf wf-repeat Taler f20"></i> LOOP:</b>
            Repetição infinita configurável
          </div>
        </div>
      </div>

      <!-- Uso Básico -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Uso Básico</h3>
          <p>
            Para usar, crie um container com o atributo <code>WfSlid1</code> e
            adicione os slides com a classe <code>.wfslid1-slide</code>.
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfSlid1>
  <div class="wfslid1-slide">
    <img src="https://placehold.co/800x400/000000/FFFFFF/png?text=Slide+1" alt="Slide 1">
    <div class="wfslid1-content">
      <h2>Slide 1</h2>
      <p>Descrição do slide 1</p>
    </div>
  </div>
  <div class="wfslid1-slide">
    <img src="https://placehold.co/800x400/333333/FFFFFF/png?text=Slide+2" alt="Slide 2">
    <div class="wfslid1-content">
      <h2>Slide 2</h2>
      <p>Descrição do slide 2</p>
    </div>
  </div>
</div>
</script>
</pre>
        </div>
        <div class="co12-g et7_">
          <h3 class="wfpage">Demonstração</h3>
          <div WfSlid1>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/01.jpg" alt="Slide 1" />
              <div class="wfslid1-content">
                <h2>Slide 1</h2>
                <p>Descrição do slide 1</p>
              </div>
            </div>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/02.jpg" alt="Slide 2" />
              <div class="wfslid1-content">
                <h2>Slide 2</h2>
                <p>Descrição do slide 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Atributos e Configurações -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Atributos Disponíveis</h3>
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
                <td><code>WfSlid1-autoplay</code></td>
                <td>boolean</td>
                <td>Inicia o carrossel automaticamente (padrão: true).</td>
              </tr>
              <tr>
                <td><code>WfSlid1-interval</code></td>
                <td>number</td>
                <td>Intervalo do autoplay em milissegundos (padrão: 4000).</td>
              </tr>
              <tr>
                <td><code>WfSlid1-arrows</code></td>
                <td>boolean</td>
                <td>Exibe as setas de navegação (padrão: true).</td>
              </tr>
              <tr>
                <td><code>WfSlid1-indicators</code></td>
                <td>boolean</td>
                <td>Exibe os indicadores de navegação (padrão: true).</td>
              </tr>
              <tr>
                <td><code>WfSlid1-effect</code></td>
                <td>string</td>
                <td>
                  Efeito de transição: 'fade', 'slide' ou 'zoom' (padrão:
                  'fade').
                </td>
              </tr>
              <tr>
                <td><code>WfSlid1-loop</code></td>
                <td>boolean</td>
                <td>
                  Define se o carrossel deve voltar ao início após o último
                  slide (padrão: false).
                </td>
              </tr>
              <tr>
                <td><code>WfSlid1-pausehover</code></td>
                <td>boolean</td>
                <td>
                  Pausa o autoplay quando o mouse está sobre o carrossel
                  (padrão: false).
                </td>
              </tr>
              <tr>
                <td><code>WfSlid1-zoom</code></td>
                <td>boolean</td>
                <td>
                  Ativa o <b>zoom Ken Burns interno</b> para as
                  imagens do slide (padrão: false).
                </td>
              </tr>
              <tr>
                <td><code>WfSlid1-zoomdrift</code></td>
                <td>boolean</td>
                <td>
                  Habilita um <b>movimento sutil (drift)</b> adicional
                  no zoom Ken Burns (padrão: false).
                </td>
              </tr>
              <tr>
                <td><code>WfSlid1-text</code></td>
                <td>string</td>
                <td>
                  Alinha o conteúdo do slide: <code>left</code>,
                  <code>center</code> ou <code>right</code> (padrão:
                  <code>left</code>).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Exemplos de Configuração Avançada -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Exemplos de Configuração Avançada</h3>
          <p>
            Veja diferentes configurações do WfSlid1 para diversos cenários:
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Carrossel com Efeito Slide</h3>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfSlid1 
     WfSlid1-autoplay="true" 
     WfSlid1-interval="3000" 
     WfSlid1-effect="slide" 
     WfSlid1-arrows="true" 
     WfSlid1-indicators="true" 
     WfSlid1-loop="true" 
     WfSlid1-pausehover="true">
  
  <div class="wfslid1-slide">
    <img src="banner1.jpg" alt="Banner 1">
    <div class="wfslid1-content">
      <h2>Título do Slide 1</h2>
      <p>Descrição do primeiro slide</p>
      <button class="btn btn-primary">Saiba Mais</button>
    </div>
  </div>
  
  <div class="wfslid1-slide">
    <img src="banner2.jpg" alt="Banner 2">
    <div class="wfslid1-content">
      <h2>Título do Slide 2</h2>
      <p>Descrição do segundo slide</p>
      <button class="btn btn-success">Comprar Agora</button>
    </div>
  </div>
  
</div>
</script></pre>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">Exemplo Funcional - Efeito Slide</h3>
          <div
            WfSlid1
            WfSlid1-autoplay="true"
            WfSlid1-interval="4000"
            WfSlid1-effect="slide"
            WfSlid1-arrows="true"
            WfSlid1-indicators="true"
            WfSlid1-loop="true"
            WfSlid1-pausehover="true"
          >
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/03.jpg" alt="Slide 1" />
              <div class="wfslid1-content">
                <h3>Primeiro Slide</h3>
                <p>Carrossel com efeito de deslizamento suave</p>
                <button class="btn btn-primary">Ver Mais</button>
              </div>
            </div>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/04.jpg" alt="Slide 2" />
              <div class="wfslid1-content">
                <h3>Segundo Slide</h3>
                <p>Navegação com setas e indicadores</p>
                <button class="btn btn-success">Explorar</button>
              </div>
            </div>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/01.jpg" alt="Slide 3" />
              <div class="wfslid1-content">
                <h3>Terceiro Slide</h3>
                <p>Pausa automática no hover</p>
                <button class="btn btn-warning">Descobrir</button>
              </div>
            </div>
          </div>
          <p>
            <small
              ><i class="wf wf-play Taler f20"></i> Autoplay ativo •
              <i class="wf wf-pause Taler f20"></i> Pausa no hover •
              <i class="wf wf-repeat Taler f20"></i> Loop infinito</small
            >
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Carrossel com Efeito Zoom</h3>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfSlid1 
     WfSlid1-autoplay="false" 
     WfSlid1-effect="zoom" 
     WfSlid1-arrows="true" 
     WfSlid1-indicators="false" 
     WfSlid1-loop="false">
  
  <div class="wfslid1-slide">
    <img src="produto1.jpg" alt="Produto 1">
    <div class="wfslid1-content">
      <h2>Produto Destaque</h2>
      <p class="price">R$ 299,90</p>
      <button class="btn btn-primary">Comprar</button>
    </div>
  </div>
  
  <div class="wfslid1-slide">
    <img src="produto2.jpg" alt="Produto 2">
    <div class="wfslid1-content">
      <h2>Oferta Especial</h2>
      <p class="price">R$ 199,90</p>
      <button class="btn btn-danger">Aproveitar</button>
    </div>
  </div>
  
</div>
</script></pre>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">Exemplo Funcional - Efeito Zoom</h3>
          <div
            WfSlid1
            WfSlid1-autoplay="false"
            WfSlid1-effect="zoom"
            WfSlid1-arrows="true"
            WfSlid1-indicators="false"
            WfSlid1-loop="false"
          >
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/02.jpg" alt="Produto 1" />
              <div class="wfslid1-content">
                <h3>Produto Destaque</h3>
                <p style="font-size: 1.2em; color: #e74c3c; font-weight: bold">
                  R$ 299,90
                </p>
                <button class="btn btn-primary">Comprar Agora</button>
              </div>
            </div>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/03.jpg" alt="Produto 2" />
              <div class="wfslid1-content">
                <h3>Oferta Especial</h3>
                <p style="font-size: 1.2em; color: #9c27b0; font-weight: bold">
                  R$ 199,90
                </p>
                <button class="btn btn-danger">Aproveitar Oferta</button>
              </div>
            </div>
            <div class="wfslid1-slide">
              <img src="exemplo/images/demo/04.jpg" alt="Produto 3" />
              <div class="wfslid1-content">
                <h3>Lançamento</h3>
                <p style="font-size: 1.2em; color: #607d8b; font-weight: bold">
                  R$ 399,90
                </p>
                <button class="btn btn-info">Pré-venda</button>
              </div>
            </div>
          </div>
          <p>
            <small
              ><i class="wf wf-hand Taler f20"></i> Navegação manual •
              <i class="wf wf-zoom-in Taler f20"></i> Efeito zoom •
              <i class="wf wf-x Taler f20"></i> Sem loop</small
            >
          </p>
        </div>
      </div>

      <!-- Uso Dinâmico com JavaScript -->
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Uso Dinâmico com JavaScript</h3>
          <p>Controle o WfSlid1 programaticamente com JavaScript:</p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Métodos Disponíveis</h3>
          <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obter instância do carrossel
const carrossel = document.querySelector('[WfSlid1]');
const wfslid1 = carrossel.WfSlid1Instance;

// Métodos de controle
wfslid1.next();           // Próximo slide
wfslid1.prev();           // Slide anterior
wfslid1.goTo(2);          // Ir para slide específico (índice)
wfslid1.play();           // Iniciar autoplay
wfslid1.pause();          // Pausar autoplay
wfslid1.stop();           // Parar e resetar

// Adicionar slides dinamicamente
wfslid1.addSlide({
  image: 'novo-slide.jpg',
  title: 'Novo Slide',
  content: 'Conteúdo do novo slide',
  button: { text: 'Clique aqui', class: 'btn btn-primary' }
});

// Remover slide
wfslid1.removeSlide(1);   // Remove slide por índice

// Eventos
wfslid1.on('slideChange', (currentSlide, previousSlide) => {
  console.log('Mudou para slide:', currentSlide);
});

wfslid1.on('autoplayStart', () => {
  console.log('Autoplay iniciado');
});

wfslid1.on('autoplayStop', () => {
  console.log('Autoplay parado');
});
</script></pre>
        </div>
        <div class="co6-g">
          <h3 class="wfpage">Exemplo de Controle Externo</h3>
          <div style="margin-bottom: 15px">
            <button
              class="btn btn-primary"
              onclick="controlarCarrossel('prev')"
            >
              <i class="wf wf-chevron-left"></i> Anterior
            </button>
            <button
              class="btn btn-success"
              onclick="controlarCarrossel('play')"
            >
              <i class="wf wf-play"></i> Play
            </button>
            <button
              class="btn btn-warning"
              onclick="controlarCarrossel('pause')"
            >
              <i class="wf wf-pause"></i> Pause
            </button>
            <button
              class="btn btn-primary"
              onclick="controlarCarrossel('next')"
            >
              Próximo <i class="wf wf-chevron-right"></i>
            </button>
          </div>

          <div
            WfSlid1
            WfSlid1-autoplay="true"
            WfSlid1-interval="5000"
            WfSlid1-effect="fade"
            WfSlid1-arrows="false"
            WfSlid1-indicators="true"
            WfSlid1-zoom="true"
            WfSlid1-zoomdrift="true"
            WfSlid1-text="left"
            style="
              height: 500px;
              position: relative;
              overflow: hidden;
              border-radius: 0;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            "
          >
            <!-- Estilos de zoom Ken Burns e drift são injetados automaticamente pelo componente WfSlid1; nenhum CSS extra é necessário aqui. -->
            <div class="wfslid1-slide">
              <!-- Imagem de fundo -->
              <img
                src="exemplo/images/demo/01.jpg"
                alt="Oficina Mecânica Especializada"
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                "
              />

              <!-- Overlay gradiente profissional -->
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    135deg,
                    rgba(44, 62, 80, 0.4) 0%,
                    rgba(52, 73, 94, 0.3) 50%,
                    rgba(44, 62, 80, 0.4) 100%
                  );
                  z-index: 2;
                "
              ></div>

              <div
                class="banner-content"
                style="
                  position: relative;
                  z-index: 10;
                  padding: 60px;
                  color: white;
                  width: 65%;
                  max-width: 800px;
                "
              >
                <div style="margin-bottom: 20px">
                  <span
                    style="
                      background: rgba(231, 76, 60, 0.9);
                      color: white;
                      padding: 8px 20px;
                      font-size: 0.9rem;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    "
                    >Há mais de 20 anos no mercado</span
                  >
                </div>

                <h1
                  class="banner-title"
                  style="
                    font-size: 2.4rem;
                    font-weight: 300;
                    margin: 0 0 10px 0;
                    color: #ecf0f1;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.2;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                  "
                >
                  Serviços Automotivos
                </h1>

                <h2
                  class="banner-subtitle"
                  style="
                    font-size: 3.2rem;
                    font-weight: 700;
                    margin: 0 0 25px 0;
                    color: #e74c3c;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.1;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  "
                >
                  Especializados
                </h2>

                <p
                  style="
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin: 0 0 35px 0;
                    color: #bdc3c7;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    max-width: 500px;
                  "
                >
                  Diagnóstico completo, reparos especializados e manutenção
                  preventiva com tecnologia de ponta e garantia total.
                </p>

                <div
                  style="display: flex; align-items: center; flex-wrap: wrap"
                >
                  <button class="banner-btn">Solicitar Orçamento</button>
                  <button class="banner-btn-secondary">Nossos Serviços</button>
                </div>
              </div>
            </div>

            <!-- Slides 2 e 3 restaurados para funcionar o slide corretamente -->
            <div class="wfslid1-slide">
              <!-- Imagem de fundo -->
              <img
                src="exemplo/images/demo/02.jpg"
                alt="Qualidade e Garantia"
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  z-index: 1;
                "
              />

              <!-- Overlay gradiente diferente -->
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    135deg,
                    rgba(39, 174, 96, 0.4) 0%,
                    rgba(46, 204, 113, 0.3) 50%,
                    rgba(39, 174, 96, 0.4) 100%
                  );
                  z-index: 2;
                "
              ></div>

              <div
                class="banner-content"
                style="
                  position: relative;
                  z-index: 10;
                  padding: 60px;
                  color: white;
                  width: 65%;
                  max-width: 800px;
                "
              >
                <div style="margin-bottom: 20px">
                  <span
                    style="
                      background: rgba(241, 196, 15, 0.9);
                      color: #2c3e50;
                      padding: 8px 20px;
                      font-size: 0.9rem;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    "
                    >Garantia de qualidade</span
                  >
                </div>

                <h1
                  class="banner-title"
                  style="
                    font-size: 2.4rem;
                    font-weight: 300;
                    margin: 0 0 10px 0;
                    color: #ecf0f1;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.2;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                  "
                >
                  Resultados
                </h1>

                <h2
                  class="banner-subtitle"
                  style="
                    font-size: 3.2rem;
                    font-weight: 700;
                    margin: 0 0 25px 0;
                    color: #f1c40f;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.1;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  "
                >
                  Garantidos
                </h2>

                <p
                  style="
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin: 0 0 35px 0;
                    color: #ecf0f1;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    max-width: 500px;
                  "
                >
                  Técnicos certificados, equipamentos modernos e peças
                  originais. Seu veículo em mãos experientes com garantia total.
                </p>

                <div
                  style="display: flex; align-items: center; flex-wrap: wrap"
                >
                  <button
                    class="banner-btn"
                    style="
                      background: linear-gradient(45deg, #f1c40f, #f39c12);
                      box-shadow: 0 4px 15px rgba(241, 196, 15, 0.3);
                    "
                  >
                    Agendar Serviço
                  </button>
                  <button class="banner-btn-secondary">Fale Conosco</button>
                </div>
              </div>
            </div>

            <!-- Slide 3: Atendimento Premium -->
            <div class="wfslid1-slide">
              <!-- Imagem de fundo -->
              <img
                src="exemplo/images/demo/03.jpg"
                alt="Atendimento Premium"
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  z-index: 1;
                "
              />

              <!-- Overlay gradiente premium -->
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    135deg,
                    rgba(142, 68, 173, 0.4) 0%,
                    rgba(155, 89, 182, 0.3) 50%,
                    rgba(142, 68, 173, 0.4) 100%
                  );
                  z-index: 2;
                "
              ></div>

              <div
                class="banner-content"
                style="
                  position: relative;
                  z-index: 10;
                  padding: 60px;
                  color: white;
                  width: 65%;
                  max-width: 800px;
                "
              >
                <div style="margin-bottom: 20px">
                  <span
                    style="
                      background: rgba(155, 89, 182, 0.9);
                      color: white;
                      padding: 8px 20px;
                      font-size: 0.9rem;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    "
                    >Atendimento diferenciado</span
                  >
                </div>

                <h1
                  class="banner-title"
                  style="
                    font-size: 2.4rem;
                    font-weight: 300;
                    margin: 0 0 10px 0;
                    color: #ecf0f1;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.2;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                  "
                >
                  Experiência
                </h1>

                <h2
                  class="banner-subtitle"
                  style="
                    font-size: 3.2rem;
                    font-weight: 700;
                    margin: 0 0 25px 0;
                    color: #e67e22;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.1;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  "
                >
                  Premium
                </h2>

                <p
                  style="
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin: 0 0 35px 0;
                    color: #ecf0f1;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                    max-width: 500px;
                  "
                >
                  Sala de espera confortável, café premium, Wi-Fi gratuito e
                  acompanhamento em tempo real do seu serviço.
                </p>

                <div
                  style="display: flex; align-items: center; flex-wrap: wrap"
                >
                  <button
                    class="banner-btn"
                    style="
                      background: linear-gradient(45deg, #e67e22, #d35400);
                      box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
                    "
                  >
                    Conheça Nossa Estrutura
                  </button>
                  <button class="banner-btn-secondary">Localização</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">Código do Banner</h3>
          <p>
            Este banner usa apenas estilos inline, sem dependências externas:
          </p>
          <pre WfCode WfCode-lang="html"><script type="text/plain">
<div WfSlid1 WfSlid1-autoplay="true" WfSlid1-interval="5000" WfSlid1-effect="fade" 
     style="height: 400px; position: relative; overflow: hidden;">
  
  <!-- Slide 1 -->
  <div class="wfslid1-slide" style="position: relative; height: 100%;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);"></div>
    
    <div class="wfslid1-content" style="position: absolute; left: 5%; top: 50%; 
                                       transform: translateY(-50%); color: white; z-index: 10;">
      <h2 style="font-size: 2.5rem; color: #ecf0f1;">
        EXPERT TEAM OF<br>
        <span style="color: #e74c3c; font-size: 3rem;">TECHNICIANS</span>
      </h2>
      <p style="color: #bdc3c7;">Equipe especializada...</p>
      <button class="btn" style="background: #e74c3c; color: white;">SAIBA MAIS</button>
    </div>
  </div>
  
  <!-- Slide 2 -->
  <div class="wfslid1-slide" style="position: relative; height: 100%;">
    <!-- Conteúdo do segundo slide... -->
  </div>
  
</div>
</script></pre>
        </div>
      </div>

      <!-- Conclusão -->
      <div class="l">
        <div class="co12-g">
          <div
            style="
              background: var(--wf-bg-);
              border: 1px solid #4caf50;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              color: var(--wf-color);
            "
          >
            <h3 style="margin-top: 0; color: #4caf50">
              <i class="wf wf-check-circle Taler f20"></i> WfSlid1 - Sistema
              Completo de Carrossel
            </h3>
            <p style="margin-bottom: 0">
              O <b>WfSlid1</b> é a solução definitiva para carrosseis no WEBFULL
              Framework. Com múltiplos efeitos, controle total via JavaScript,
              acessibilidade completa e responsividade perfeita, oferece uma
              experiência de usuário superior para qualquer aplicação web.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- Script necessário para o WfSlid1 funcionar -->
