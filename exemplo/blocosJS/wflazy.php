<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfLazy</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfLazy</li>
            </ol>
         </nav>
      </div>
      <section class="wflazyx">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>[Progressive Image Loading]</h3>
                  <p>
                     O <b>WfLazy</b> é um sistema de carregamento progressivo de imagens inspirado no <b>ccforward/progressive-image</b>.
                     Utiliza uma imagem de baixa resolução como preview com blur, que é substituída suavemente pela imagem de alta resolução quando visível no viewport.
                     Suporta <b>IntersectionObserver</b>, transições CSS elegantes, spinner opcional e múltiplos formatos de marcação.
                  </p>
                  <div style="background: var(--wf-bg-); border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-image Taler f20"></i> PROGRESSIVE LOADING:</b> Preview blur + alta resolução suave<br />
                     <b><i class="wf wf-target-lock Taler f20"></i> INTERSECTION OBSERVER:</b> Detecção precisa do viewport<br />
                     <b><i class="wf wf-refresh Taler f20"></i> SPINNER OPCIONAL:</b> Indicador de carregamento elegante<br />
                     <b><i class="wf wf-palette Taler f20"></i> TEMAS:</b> Integração total com WfDay
                  </div>
               </div>
            </div>

            <!-- Uso Básico -->
            <div class="l">
               <div class="co6-g">
                  <h3>Uso Básico</h3>
                  <p>Exemplos do novo sistema progressive image:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Método Recomendado: Container Progressive -->
<div class="progressive">
  <img class="preview" 
       data-src="https://picsum.photos/id/1015/1200/800" 
       src="https://picsum.photos/id/1015/60/40" 
       alt="Paisagem" />
</div>

<!-- Com Spinner -->
<div class="progressive">
  <img class="preview" 
       data-src="/assets/images/gallery/photo.jpg" 
       src="/assets/images/gallery/photo-small.jpg" 
       data-spinner="true"
       alt="Foto com spinner" />
</div>

<!-- Compatibilidade: Atributo WfLazy -->
<img WfLazy 
     WfLazy-src="/assets/images/gallery/photo.jpg" 
     src="/assets/images/gallery/photo-small.jpg" 
     alt="Compatibilidade legacy" />

<!-- Classe lazy simples -->
<img class="lazy" 
     data-src="/assets/images/gallery/photo.jpg" 
     src="/assets/images/gallery/photo-small.jpg" 
     alt="Classe lazy" />
</script>
</pre>
               </div>
               <div class="co6-g">
                  <h3>🎨 Exemplos Básicos</h3>
                  <p>Role para baixo para ver as imagens carregando progressivamente:</p>

                  <div style="margin: 20px 0">
                     <h3><i class="wf wf-image Taler f20"></i> Galeria Progressive</h3>

                     <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 14px; color: #666">
                        <b><i class="wf wf-pin Taler f20"></i> Como funciona:</b> Cada imagem inicia com uma versão de baixa resolução (blur),
                        e quando entra no viewport, carrega a versão de alta resolução com transição suave.
                     </div>

                     <div class="example-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px">
                        <!-- Exemplo 1: Básico -->
                        <div class="example-item" style="text-align: center">
                           <h3>Básico (Blur Intenso)</h3>
                           <div class="progressive">
                              <img class="preview"
                                 data-src="https://picsum.photos/400/300?random=1"
                                 src="https://picsum.photos/40/30?random=1"
                                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"
                                 alt="Imagem exemplo 1" />
                           </div>
                        </div>

                        <!-- Exemplo 2: Blur Light -->
                        <div class="example-item" style="text-align: center">
                           <h3>Blur Light</h3>
                           <div class="progressive" data-blur="light">
                              <img class="preview"
                                 data-src="https://picsum.photos/400/300?random=2"
                                 src="https://picsum.photos/40/30?random=2"
                                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"
                                 alt="Imagem exemplo 2" />
                           </div>
                        </div>

                        <!-- Exemplo 3: Blur Heavy -->
                        <div class="example-item" style="text-align: center">
                           <h3>Blur Heavy</h3>
                           <div class="progressive" data-blur="heavy">
                              <img class="preview"
                                 data-src="https://picsum.photos/400/300?random=3"
                                 src="https://picsum.photos/40/30?random=3"
                                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"
                                 alt="Imagem exemplo 3" />
                           </div>
                        </div>

                        <!-- Exemplo 4: Blur Artistic -->
                        <div class="example-item" style="text-align: center">
                           <h3>Blur Artistic</h3>
                           <div class="progressive" data-blur="artistic">
                              <img class="preview"
                                 data-src="https://picsum.photos/400/300?random=4"
                                 src="https://picsum.photos/40/30?random=4"
                                 style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"
                                 alt="Imagem exemplo 4" />
                           </div>
                        </div>
                     </div>

                     <!-- Demonstração do Spinner -->
                     <div style="margin: 20px 0">
                        <h5><i class="wf wf-refresh-cw Taler f20"></i> Demonstração do Spinner</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0">
                           <!-- Imagem sem spinner -->
                           <div style="text-align: center">
                              <h3>Sem Spinner</h3>
                              <div class="progressive" style="height:150px; border-radius:8px; overflow:hidden;">
                                 <img class="preview"
                                    data-src="https://picsum.photos/id/1018/800/500"
                                    src="https://picsum.photos/id/1018/60/40"
                                    style="width:100%; height:150px; object-fit:cover; border-radius:8px; border:2px solid #ccc"
                                    alt="Sem Spinner" />
                              </div>
                           </div>

                           <!-- Imagem com spinner -->
                           <div style="text-align: center; position: relative">
                              <h3>Com Spinner</h3>
                              <div class="progressive" style="height:150px; border-radius:8px; overflow:hidden; position:relative;">
                                 <img class="preview"
                                    data-src="https://picsum.photos/id/1019/800/500"
                                    src="https://picsum.photos/id/1019/60/40"
                                    data-spinner="true"
                                    style="width:100%; height:150px; object-fit:cover; border-radius:8px; border:2px solid #2196f3"
                                    alt="Com Spinner" />
                              </div>
                           </div>
                        </div>
                        <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 14px; color: #666">
                           <b><i class="wf wf-pin Taler f20"></i> Como funciona o Spinner:</b><br />
                           • <code>data-spinner="true"</code> = Ativa spinner durante carregamento<br />
                           • Posicionamento automático no centro da imagem<br />
                           • Remove automaticamente após carregar<br />
                           • Animação CSS: rotação 360° contínua
                        </div>
                     </div>

                     <!-- Área de scroll para demonstração -->
                     <div style="height: 300px; background: var(--wf-bg-); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 20px 0">
                        <div style="text-align: center">
                           <h3>📜 Role para baixo</h3>
                           <p>Para ver mais imagens carregando progressivamente</p>
                        </div>
                     </div>

                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px">
                        <!-- Imagem 3 -->
                        <div style="text-align: center">
                           <div class="progressive scale" style="height:200px; border-radius:8px; overflow:hidden;">
                              <img class="preview"
                                 data-src="https://picsum.photos/id/1020/1200/800"
                                 src="https://picsum.photos/id/1020/60/40"
                                 style="width:100%; height:200px; object-fit:cover; border-radius:8px;"
                                 alt="Floresta Verde" />
                           </div>
                           <p><small>Floresta Verde (com escala)</small></p>
                        </div>

                        <!-- Imagem 4 -->
                        <div style="text-align: center">
                           <div class="progressive" style="height:200px; border-radius:8px; overflow:hidden;">
                              <img class="preview"
                                 data-src="https://picsum.photos/id/1021/1200/800"
                                 src="https://picsum.photos/id/1021/60/40"
                                 style="width:100%; height:200px; object-fit: cover; border-radius:8px;"
                                 alt="Oceano Azul" />
                           </div>
                           <p><small>Oceano Azul</small></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Configurações e Opções -->
            <div class="l">
               <div class="co6-g">
                  <h3>🌟 Efeitos de Blur</h3>
                  <p>O WfLazy oferece diferentes intensidades de blur para criar efeitos visuais únicos:</p>

                  <div class="blur-effects">
                     <div class="blur-item">
                        <h3>🔹 Light Blur</h3>
                        <p>Blur suave (8px) com leve saturação</p>
                        <code>&lt;div class="progressive" data-blur="light"&gt;</code>
                     </div>

                     <div class="blur-item">
                        <h3>🔸 Medium Blur</h3>
                        <p>Blur moderado (15px) com saturação e brilho</p>
                        <code>&lt;div class="progressive" data-blur="medium"&gt;</code>
                     </div>

                     <div class="blur-item">
                        <h3>🔶 Heavy Blur</h3>
                        <p>Blur intenso (25px) com saturação, brilho e contraste</p>
                        <code>&lt;div class="progressive" data-blur="heavy"&gt;</code>
                     </div>

                     <div class="blur-item">
                        <h3>🎨 Artistic Blur</h3>
                        <p>Blur artístico (35px) com saturação intensa, brilho, contraste e rotação de matiz</p>
                        <code>&lt;div class="progressive" data-blur="artistic"&gt;</code>
                     </div>

                     <div class="blur-item">
                        <h3>⚡ Default</h3>
                        <p>Blur padrão intenso (20px) com saturação e brilho</p>
                        <code>&lt;div class="progressive"&gt;</code>
                     </div>
                  </div>

                  <h3>Opções de Configuração</h3>
                  <table class="tabela">
                     <thead>
                        <tr>
                           <th>Opção</th>
                           <th>Tipo</th>
                           <th>Padrão</th>
                           <th>Descrição</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><code>lazyClass</code></td>
                           <td>string</td>
                           <td>'lazy'</td>
                           <td>Classe para imagens lazy simples</td>
                        </tr>
                        <tr>
                           <td><code>progressiveClass</code></td>
                           <td>string</td>
                           <td>'progressive'</td>
                           <td>Classe do container progressive</td>
                        </tr>
                        <tr>
                           <td><code>previewClass</code></td>
                           <td>string</td>
                           <td>'preview'</td>
                           <td>Classe da imagem preview</td>
                        </tr>
                        <tr>
                           <td><code>loadedClass</code></td>
                           <td>string</td>
                           <td>'loaded'</td>
                           <td>Classe aplicada após carregar</td>
                        </tr>
                        <tr>
                           <td><code>removePreview</code></td>
                           <td>boolean</td>
                           <td>true</td>
                           <td>Remove overlay após transição</td>
                        </tr>
                        <tr>
                           <td><code>scale</code></td>
                           <td>boolean</td>
                           <td>true</td>
                           <td>Aplica efeito de escala</td>
                        </tr>
                        <tr>
                           <td><code>rootMargin</code></td>
                           <td>string</td>
                           <td>'50px'</td>
                           <td>Margem do IntersectionObserver</td>
                        </tr>
                        <tr>
                           <td><code>threshold</code></td>
                           <td>number</td>
                           <td>0.1</td>
                           <td>Threshold do IntersectionObserver</td>
                        </tr>
                        <tr>
                           <td><code>spinner</code></td>
                           <td>boolean</td>
                           <td>false</td>
                           <td>Exibe spinner por padrão</td>
                        </tr>
                        <tr>
                           <td><code>blurIntensity</code></td>
                           <td>string</td>
                           <td>'default'</td>
                           <td>Intensidade padrão do blur</td>
                        </tr>
                        <tr>
                           <td><code>customBlur</code></td>
                           <td>string</td>
                           <td>null</td>
                           <td>Filtro CSS personalizado</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="co6-g">
                  <h3>Atributos HTML</h3>
                  <table class="tabela">
                     <thead>
                        <tr>
                           <th>Atributo</th>
                           <th>Elemento</th>
                           <th>Descrição</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td><code>data-src</code></td>
                           <td>img</td>
                           <td>URL da imagem de alta resolução</td>
                        </tr>
                        <tr>
                           <td><code>data-spinner</code></td>
                           <td>img</td>
                           <td>Ativa spinner para esta imagem</td>
                        </tr>
                        <tr>
                           <td><code>data-blur</code></td>
                           <td>div</td>
                           <td>Define intensidade do blur: "light", "medium", "heavy", "artistic"</td>
                        </tr>
                        <tr>
                           <td><code>WfLazy-src</code></td>
                           <td>img</td>
                           <td>Compatibilidade: URL alta resolução</td>
                        </tr>
                        <tr>
                           <td><code>WfLazy</code></td>
                           <td>img</td>
                           <td>Compatibilidade: ativa lazy loading</td>
                        </tr>
                        <tr>
                           <td><code>class="progressive"</code></td>
                           <td>div</td>
                           <td>Container progressive (recomendado)</td>
                        </tr>
                        <tr>
                           <td><code>class="preview"</code></td>
                           <td>img</td>
                           <td>Imagem preview com blur</td>
                        </tr>
                        <tr>
                           <td><code>class="lazy"</code></td>
                           <td>img</td>
                           <td>Lazy loading simples</td>
                        </tr>
                        <tr>
                           <td><code>class="scale"</code></td>
                           <td>div</td>
                           <td>Adiciona efeito de escala</td>
                        </tr>
                     </tbody>
                  </table>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-lightbulb Taler f20"></i> Transições CSS Automáticas:</b><br />
                     O WfLazy aplica automaticamente blur(5px), scale(1.05) na preview, depois transiciona suavemente para a imagem final com duração de 0.8s.
                  </div>
               </div>
            </div>

            <!-- Exemplos Avançados -->
            <div class="l">
               <div class="co12-g">
                  <h3>Exemplos Avançados</h3>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3>Configuração Personalizada</h3>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Container com classes utilitárias -->
<div class="progressive scale rounded">
  <img class="preview" 
       data-src="/assets/images/gallery/photo.jpg" 
       src="/assets/images/gallery/photo-small.jpg" 
       data-spinner="true"
       alt="Imagem com bordas arredondadas" />
</div>

<!-- Container círculo -->
<div class="progressive circle" style="width: 150px; height: 150px;">
  <img class="preview" 
       data-src="/assets/images/avatars/user.jpg" 
       src="/assets/images/avatars/user-small.jpg" 
       alt="Avatar do usuário" />
</div>

<!-- Container full-width -->
<div class="progressive full-width">
  <img class="preview" 
       data-src="/assets/images/banners/hero.jpg" 
       src="/assets/images/banners/hero-small.jpg" 
       alt="Banner hero" />
</div>

<!-- Compatibilidade legacy -->
<img WfLazy 
     WfLazy-src="/assets/images/gallery/photo.jpg" 
     src="/assets/images/gallery/photo-small.jpg" 
     alt="Compatibilidade com versão anterior" />
</script>
</pre>

                  <!-- Demonstração real -->
                  <div style="margin: 20px 0">
                     <h5><i class="wf wf-target Taler f20"></i> Demonstração Classes Utilitárias</h5>

                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0">
                        <!-- Imagem arredondada -->
                        <div style="text-align: center">
                           <h3>Bordas Arredondadas</h3>
                           <div class="progressive rounded" style="height:120px; overflow:hidden;">
                              <img class="preview"
                                 data-src="https://picsum.photos/id/1025/600/400"
                                 src="https://picsum.photos/id/1025/60/40"
                                 style="width: 100%; height: 120px; object-fit: cover;"
                                 alt="Bordas arredondadas" />
                           </div>
                        </div>

                        <!-- Imagem círculo -->
                        <div style="text-align: center">
                           <h3>Formato Círculo</h3>
                           <div class="progressive circle" style="width: 120px; height: 120px; margin: 0 auto;">
                              <img class="preview"
                                 data-src="https://picsum.photos/id/1027/400/400"
                                 src="https://picsum.photos/id/1027/60/60"
                                 style="width: 100%; height: 100%; object-fit: cover;"
                                 alt="Formato círculo" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="co6-g">
                  <h3>API JavaScript</h3>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática (padrão)
WfLazy.fire();

// Inicialização com opções personalizadas
const wflazy = new WfLazy({
  el: document.querySelector('.gallery'),
  progressiveClass: 'progressive',
  previewClass: 'preview',
  loadedClass: 'loaded',
  removePreview: true,
  scale: true,
  rootMargin: '100px',
  threshold: 0.1,
  spinner: false,
  onLoad: (img, container) => {
    console.log('Imagem carregada:', img.src);
    container.classList.add('animation-complete');
  },
  onError: (img, container) => {
    console.error('Erro ao carregar:', img.dataset.src);
    container.classList.add('load-error');
  }
});

// Métodos estáticos
WfLazy.initAll(document, { spinner: true });
WfLazy.load('.specific-image');

// Destruir instância
wflazy.destroy();
</script>
</pre>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-cog Taler f20"></i> Inicialização Automática:</b><br />
                     O WfLazy é inicializado automaticamente no DOMContentLoaded para todos os elementos compatíveis.
                  </div>
               </div>
            </div>

            <!-- CSS Customização -->
            <div class="l">
               <div class="co6-g">
                  <h3>CSS Customização</h3>
                  <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Customizar duração da transição */
.progressive img.preview,
.progressive .progressive-overlay {
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Customizar blur da preview */
.progressive img.preview {
  filter: blur(8px);
  transform: scale(1.1);
}

/* Customizar efeito de escala */
.progressive.scale img.preview {
  transform: scale(1.15);
}

.progressive.scale img.loaded {
  transform: scale(1);
}

/* Customizar spinner */
.progressive .progressive-spinner::after {
  width: 32px;
  height: 32px;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.3);
  border-top-color: #4caf50;
}

/* Estados de carregamento personalizados */
.progressive.loading {
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200% 100%;
  animation: wflazy-shimmer 2s infinite;
}

/* Modo escuro personalizado */
html.wfday-night .progressive.loading {
  background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
}
</script>
</pre>
               </div>
               <div class="co6-g">
                  <h3>Eventos Personalizados</h3>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Escutar eventos do WfLazy
document.addEventListener('wflazy:loaded', (event) => {
  const { src, element, container } = event.detail;
  console.log('Imagem carregada:', src);
  
  // Adicionar animação personalizada
  element.style.transform = 'scale(1.05)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 200);
});

document.addEventListener('wflazy:error', (event) => {
  const { element, container } = event.detail;
  console.error('Erro ao carregar imagem');
  
  // Mostrar imagem de fallback
  element.src = '/assets/images/placeholder-error.jpg';
  container.classList.add('load-failed');
});

// Carregar imagem específica programaticamente
const img = document.querySelector('.my-image');
const wflazy = new WfLazy();
wflazy.loadImage(img);
</script>
</pre>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-zap Taler f20"></i> Eventos Disponíveis:</b><br />
                     • <code>wflazy:loaded</code> - Disparado quando imagem carrega<br />
                     • <code>wflazy:error</code> - Disparado quando ocorre erro<br />
                     • Ambos incluem detalhes do elemento e container
                  </div>
               </div>
            </div>

            <!-- Recursos Avançados -->
            <div class="l">
               <div class="co6-g">
                  <h3>Recursos Incluídos</h3>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <h5><i class="wf wf-sparkles Taler f20"></i> Transições Progressive:</h5>
                     <ul style="margin: 10px 0">
                        <li><b>Preview Blur:</b> filter: blur(5px) com transição suave</li>
                        <li><b>Scale Effect:</b> transform: scale(1.05) → scale(1)</li>
                        <li><b>Overlay System:</b> Transição via background-image overlay</li>
                        <li><b>Duração:</b> 0.8s com cubic-bezier otimizado</li>
                     </ul>
                  </div>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <h5><i class="wf wf-refresh-cw Taler f20"></i> Spinner Integrado:</h5>
                     <ul style="margin: 10px 0">
                        <li>Spinner CSS puro com animação de rotação</li>
                        <li>Ativa via <code>data-spinner="true"</code> ou opção global</li>
                        <li>Posicionamento automático centralizado</li>
                        <li>Remove automaticamente após carregamento</li>
                        <li>Suporte a temas claro/escuro</li>
                     </ul>
                  </div>
               </div>

               <div class="co6-g">
                  <h3>Compatibilidade</h3>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <h5><i class="wf wf-smartphone Taler f20"></i> Suporte Nativo:</h5>
                     <ul style="margin: 10px 0">
                        <li><b>IntersectionObserver:</b> API principal para detecção</li>
                        <li><b>Fallback Legacy:</b> Carregamento direto se não houver suporte</li>
                        <li><b>Progressive Enhancement:</b> Funciona mesmo sem JavaScript</li>
                     </ul>
                  </div>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <h5>♿ Acessibilidade:</h5>
                     <ul style="margin: 10px 0">
                        <li><code>aria-busy="true/false"</code> durante carregamento</li>
                        <li>Spinner com <code>aria-hidden="true"</code></li>
                        <li>Suporte a <code>prefers-reduced-motion</code></li>
                        <li>Preservação de atributos <code>alt</code> e <code>title</code></li>
                     </ul>
                  </div>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <h5><i class="wf wf-target Taler f20"></i> Casos de Uso Ideais:</h5>
                     <ul style="margin: 10px 0">
                        <li>Galerias de imagens com preview</li>
                        <li>E-commerce com produtos visuais</li>
                        <li>Blogs e portfólios</li>
                        <li>Feeds de redes sociais</li>
                        <li>Landing pages com hero images</li>
                     </ul>
                  </div>
               </div>
            </div>

            <!-- Resumo -->
            <div class="l">
               <div class="co12-g">
                  <h3>Resumo</h3>
                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50">
                     <h3 style="margin-top: 0"><i class="wf wf-check-circle Taler f20"></i> Características do WfLazy Progressive</h3>
                     <ul>
                        <li><b><i class="wf wf-image Taler f20"></i> Progressive Loading:</b> Preview blur + alta resolução com transição suave</li>
                        <li><b><i class="wf wf-target Taler f20"></i> IntersectionObserver:</b> Detecção precisa com rootMargin configurável</li>
                        <li><b><i class="wf wf-sparkles Taler f20"></i> Overlay System:</b> Transição via background-image para máxima suavidade</li>
                        <li><b><i class="wf wf-refresh Taler f20"></i> Spinner Elegante:</b> Indicador de carregamento CSS puro opcional</li>
                        <li><b><i class="wf wf-cog Taler f20"></i> Classes Utilitárias:</b> .rounded, .circle, .full-width, .scale</li>
                        <li><b><i class="wf wf-zap Taler f20"></i> Eventos Personalizados:</b> swlazy:loaded e swlazy:error</li>
                        <li><b><i class="wf wf-wrench Taler f20"></i> API Flexível:</b> Múltiplos formatos de marcação suportados</li>
                        <li><b><i class="wf wf-shield Taler f20"></i> Compatibilidade:</b> Suporte a atributos WfLazy legacy</li>
                        <li><b><i class="wf wf-smartphone Taler f20"></i> Responsivo:</b> Funciona perfeitamente em todos os dispositivos</li>
                        <li><b><i class="wf wf-refresh Taler f20"></i> Auto-inicialização:</b> Configuração zero via DOMContentLoaded</li>
                     </ul>

                     <div style="margin-top: 20px; padding: 15px; background: rgba(76, 175, 80, 0.1); border-radius: 8px">
                        <b><i class="wf wf-target Taler f20"></i> Objetivo Principal:</b> Proporcionar carregamento progressivo de imagens com a melhor experiência visual possível,
                        inspirado no ccforward/progressive-image, com preview blur suave, transições elegantes e máxima performance.
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>

   <!-- Script do WfLazy -->
   <script src="../../assets/components/compJs/WfLazy.js?v=3"></script>
   <script>
      // Debug simples
      console.log('Script carregado');
      console.log('WfLazy disponível?', typeof WfLazy);

      // Aguardar um pouco e tentar novamente
      setTimeout(() => {
         console.log('Após timeout - WfLazy disponível?', typeof WfLazy);

         if (typeof WfLazy !== 'undefined') {
            console.log('✅ WfLazy encontrado! Inicializando...');

            // Inicializar manualmente
            const wflazy = new WfLazy({
               spinner: true,
               rootMargin: '50px'
            });

            console.log('WfLazy inicializado:', wflazy);
         } else {
            console.error('❌ WfLazy ainda não está disponível');
         }
      }, 100);
   </script>