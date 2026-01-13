/**
 * WfMove - Componente para animações CSS automáticas
 * Detecta elementos com classes anime-* e aplica animações automaticamente
 */
class WfMove {
   // Pool global de observers para otimização de performance
   static observerPool = new Map();
   static debounceTimers = new Map();
   
   // Configurações globais de performance
   static performanceConfig = {
      debounceDelay: 16, // ~60fps
      maxObservers: 5,
      reuseThreshold: 0.1
   };

   // Sistema de velocidades melhorado
   static speedMap = {
      'XS': { duration: '0.15s', class: 'swmove-speed-xs' },
      'S': { duration: '0.25s', class: 'swmove-speed-s' },
      'M': { duration: '0.6s', class: 'swmove-speed-m' },
      'L': { duration: '1s', class: 'swmove-speed-l' },
      'XL': { duration: '1.5s', class: 'swmove-speed-xl' },
      'XXL': { duration: '2s', class: 'swmove-speed-xxl' },
      // Aliases para compatibilidade
      'fast': { duration: '0.3s', class: 'swmove-speed-fast' },
      'normal': { duration: '0.6s', class: 'swmove-speed-normal' },
      'slow': { duration: '1s', class: 'swmove-speed-slow' },
      'very-slow': { duration: '1.5s', class: 'swmove-speed-very-slow' }
   };
   constructor(element) {
      this.element = element;
      this.animationType = this.element.getAttribute('WfMove') || 'fade-in';
      this.speed = this.element.getAttribute('WfMove-speed') || 'M';
      this.delay = parseInt(this.element.getAttribute('WfMove-delay')) || 0;
      this.threshold = parseFloat(this.element.getAttribute('WfMove-threshold')) || 0.1;
      this.repeat = this.element.getAttribute('WfMove-repeat') === 'true';
      this.onStart = this.element.getAttribute('WfMove-on-start');
      this.onEnd = this.element.getAttribute('WfMove-on-end');
      // Simple out: se true usa fade rápido ao sair da viewport
      this.simpleOut = this.element.getAttribute('WfMove-simpleOut') !== 'false';
      
      // Recursos avançados
      this.parallax = this.element.getAttribute('WfMove-parallax') === 'true';
      this.parallaxSpeed = parseFloat(this.element.getAttribute('WfMove-parallax-speed')) || 0.5;
      this.scrollProgress = this.element.getAttribute('WfMove-scroll-progress') === 'true';
      this.onProgress = this.element.getAttribute('WfMove-on-progress');
      this.progressStart = parseFloat(this.element.getAttribute('WfMove-progress-start')) || 0;
      this.progressEnd = parseFloat(this.element.getAttribute('WfMove-progress-end')) || 1;

      this.hasAnimated = false;
      this.isAnimating = false;
      // Drag & drop
      this.draggable = false;
      this.handleSelector = this.element.getAttribute('WfMove-handle') || null;
      this.boundarySelector = this.element.getAttribute('WfMove-boundary') || null;
      this.axis = this.element.getAttribute('WfMove-axis') || null; // 'x' or 'y'
      
      // Recursos avançados de drag & drop
      this.snapToGrid = this.element.getAttribute('WfMove-snap-grid') === 'true';
      this.gridSize = parseInt(this.element.getAttribute('WfMove-grid-size')) || 20;
      this.momentum = this.element.getAttribute('WfMove-momentum') === 'true';
      this.momentumDecay = parseFloat(this.element.getAttribute('WfMove-momentum-decay')) || 0.95;
      this.magneticTargets = this.element.getAttribute('WfMove-magnetic-targets') || null;
      // if element has WfMove and is absolutely positioned, enable dragging by default
      try { if (this.element.hasAttribute && this.element.hasAttribute('WfMove') && (this.element.style && this.element.style.position === 'absolute')) this.draggable = true; } catch(e){}

      this.loadCSS();
      // marcar container inicializado
      try { this.element.setAttribute('WfMove-initialized', '1'); } catch(e){}
      try { this.element._wfMove = this; } catch(e){}
      this.init();
      // if draggable, setup pointer handlers
      try { if (this.draggable) this.setupDrag(); } catch(e){}
   }

   loadCSS() {
      if (!document.getElementById('wfmove-styles')) {
         const style = document.createElement('style');
         style.id = 'wfmove-styles';
         style.textContent = `
/**
 * WfMove.css - Estilos do Sistema de Animações Automáticas
 * SandroWeb - 2025
 */

/* ===== CONTAINER PRINCIPAL ===== */
.wfmove-container {
   position: relative;
   overflow: hidden;
}

/* ===== ELEMENTOS ANIMADOS ===== */
.wfmove-element {
   opacity: 0;
   transform: translateY(30px);
   transition: all 0.6s ease-out;
   will-change: opacity, transform;
}

.wfmove-element.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

/* ===== ANIMAÇÕES BÁSICAS ===== */
.wfmove-fade-in {
   opacity: 0;
   transition: opacity 0.6s ease-out;
}

.wfmove-fade-in.wfmove-active {
   opacity: 1;
}

.wfmove-slide-up {
   opacity: 0;
   transform: translateY(50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-up.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-slide-down {
   opacity: 0;
   transform: translateY(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-down.wfmove-active {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-slide-left {
   opacity: 0;
   transform: translateX(50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-left.wfmove-active {
   opacity: 1;
   transform: translateX(0);
}

.wfmove-slide-right {
   opacity: 0;
   transform: translateX(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-slide-right.wfmove-active {
   opacity: 1;
   transform: translateX(0);
}

.wfmove-zoom-in {
   opacity: 0;
   transform: scale(0.8);
   transition: all 0.6s ease-out;
}

.wfmove-zoom-in.wfmove-active {
   opacity: 1;
   transform: scale(1);
}

.wfmove-zoom-out {
   opacity: 0;
   transform: scale(1.2);
   transition: all 0.6s ease-out;
}

.wfmove-zoom-out.wfmove-active {
   opacity: 1;
   transform: scale(1);
}

.wfmove-rotate-in {
   opacity: 0;
   transform: rotate(-180deg) scale(0.8);
   transition: all 0.6s ease-out;
}

.wfmove-rotate-in.wfmove-active {
   opacity: 1;
   transform: rotate(0deg) scale(1);
}

/* ===== VELOCIDADES MELHORADAS ===== */
.wfmove-speed-xs {
   transition-duration: 0.15s !important;
}

.wfmove-speed-s {
   transition-duration: 0.25s !important;
}

.wfmove-speed-m {
   transition-duration: 0.6s !important;
}

.wfmove-speed-l {
   transition-duration: 1s !important;
}

.wfmove-speed-xl {
   transition-duration: 1.5s !important;
}

.wfmove-speed-xxl {
   transition-duration: 2s !important;
}

/* ===== VELOCIDADES (Compatibilidade) ===== */
.wfmove-speed-fast {
   transition-duration: 0.3s !important;
}

.wfmove-speed-normal {
   transition-duration: 0.6s !important;
}

.wfmove-speed-slow {
   transition-duration: 1s !important;
}

.wfmove-speed-very-slow {
   transition-duration: 1.5s !important;
}

/* ===== DELAYS ===== */
.wfmove-delay-100 {
   transition-delay: 0.1s !important;
}

.wfmove-delay-200 {
   transition-delay: 0.2s !important;
}

.wfmove-delay-300 {
   transition-delay: 0.3s !important;
}

.wfmove-delay-400 {
   transition-delay: 0.4s !important;
}

.wfmove-delay-500 {
   transition-delay: 0.5s !important;
}

.wfmove-delay-600 {
   transition-delay: 0.6s !important;
}

.wfmove-delay-700 {
   transition-delay: 0.7s !important;
}

.wfmove-delay-800 {
   transition-delay: 0.8s !important;
}

.wfmove-delay-900 {
   transition-delay: 0.9s !important;
}

.wfmove-delay-1000 {
   transition-delay: 1s !important;
}

/* ===== EFEITOS ESPECIAIS ===== */
.wfmove-bounce {
   transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
}

.wfmove-elastic {
   transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.wfmove-back {
   transition-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045) !important;
}

.wfmove-smooth {
   transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

/* ===== ANIMAÇÕES AVANÇADAS ===== */
.wfmove-flip-x {
   opacity: 0;
   transform: perspective(400px) rotateX(90deg);
   transition: all 0.6s ease-out;
   transform-origin: center center;
}

.wfmove-flip-x.wfmove-active {
   opacity: 1;
   transform: perspective(400px) rotateX(0deg);
}

.wfmove-flip-y {
   opacity: 0;
   transform: perspective(400px) rotateY(90deg);
   transition: all 0.6s ease-out;
   transform-origin: center center;
}

.wfmove-flip-y.wfmove-active {
   opacity: 1;
   transform: perspective(400px) rotateY(0deg);
}

.wfmove-scale-up {
   opacity: 0;
   transform: scale(0.5) translateY(50px);
   transition: all 0.6s ease-out;
}

.wfmove-scale-up.wfmove-active {
   opacity: 1;
   transform: scale(1) translateY(0);
}

.wfmove-scale-down {
   opacity: 0;
   transform: scale(1.5) translateY(-50px);
   transition: all 0.6s ease-out;
}

.wfmove-scale-down.wfmove-active {
   opacity: 1;
   transform: scale(1) translateY(0);
}

/* ===== ANIMAÇÕES EM SEQUÊNCIA ===== */
.wfmove-stagger > * {
   opacity: 0;
   transform: translateY(30px);
   transition: all 0.6s ease-out;
}

.wfmove-stagger.wfmove-active > * {
   opacity: 1;
   transform: translateY(0);
}

.wfmove-stagger > *:nth-child(1) { transition-delay: 0.1s; }
.wfmove-stagger > *:nth-child(2) { transition-delay: 0.2s; }
.wfmove-stagger > *:nth-child(3) { transition-delay: 0.3s; }
.wfmove-stagger > *:nth-child(4) { transition-delay: 0.4s; }
.wfmove-stagger > *:nth-child(5) { transition-delay: 0.5s; }
.wfmove-stagger > *:nth-child(6) { transition-delay: 0.6s; }
.wfmove-stagger > *:nth-child(7) { transition-delay: 0.7s; }
.wfmove-stagger > *:nth-child(8) { transition-delay: 0.8s; }
.wfmove-stagger > *:nth-child(9) { transition-delay: 0.9s; }
.wfmove-stagger > *:nth-child(10) { transition-delay: 1s; }

/* ===== ANIMAÇÕES INFINITAS ===== */
.wfmove-infinite {
   animation-iteration-count: infinite;
}

.wfmove-pulse {
   animation: wfmove-pulse 2s infinite;
}

@keyframes wfmove-pulse {
   0%, 100% { transform: scale(1); }
   50% { transform: scale(1.05); }
}

.wfmove-bounce-animation {
   animation: wfmove-bounce-animation 2s infinite;
}

@keyframes wfmove-bounce-animation {
   0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
   40%, 43% { transform: translate3d(0, -8px, 0); }
   70% { transform: translate3d(0, -4px, 0); }
   90% { transform: translate3d(0, -2px, 0); }
}

.wfmove-shake {
   animation: wfmove-shake 0.5s infinite;
}

@keyframes wfmove-shake {
   0%, 100% { transform: translateX(0); }
   25% { transform: translateX(-5px); }
   75% { transform: translateX(5px); }
}

/* ===== ANIMAÇÕES DE SAÍDA ESPECÍFICAS ===== */
.wfmove-exiting {
   transition-duration: 0.3s !important; /* Saída mais rápida */
}

.wfmove-fade-in.wfmove-exiting {
   opacity: 0;
}

.wfmove-slide-up.wfmove-exiting {
   opacity: 0;
   transform: translateY(-30px);
}

.wfmove-slide-down.wfmove-exiting {
   opacity: 0;
   transform: translateY(30px);
}

.wfmove-slide-left.wfmove-exiting {
   opacity: 0;
   transform: translateX(-30px);
}

.wfmove-slide-right.wfmove-exiting {
   opacity: 0;
   transform: translateX(30px);
}

.wfmove-zoom-in.wfmove-exiting {
   opacity: 0;
   transform: scale(0.7);
}

.wfmove-zoom-out.wfmove-exiting {
   opacity: 0;
   transform: scale(1.3);
}

.wfmove-rotate-in.wfmove-exiting {
   opacity: 0;
   transform: rotate(180deg) scale(0.7);
}

.wfmove-flip-x.wfmove-exiting {
   opacity: 0;
   transform: perspective(400px) rotateX(-90deg);
}

.wfmove-flip-y.wfmove-exiting {
   opacity: 0;
   transform: perspective(400px) rotateY(-90deg);
}

.wfmove-scale-up.wfmove-exiting {
   opacity: 0;
   transform: scale(0.3) translateY(-50px);
}

.wfmove-scale-down.wfmove-exiting {
   opacity: 0;
   transform: scale(1.7) translateY(50px);
}

/* ===== ESTADOS ESPECIAIS ===== */
.wfmove-loading {
   position: relative;
}

.wfmove-loading::after {
   content: '';
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 20px;
   height: 20px;
   border: 2px solid #f3f3f3;
   border-top: 2px solid #2196f3;
   border-radius: 50%;
   animation: wfmove-spin 1s linear infinite;
}

@keyframes wfmove-spin {
   0% { transform: translate(-50%, -50%) rotate(0deg); }
   100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.wfmove-disabled {
   opacity: 0.5;
   pointer-events: none;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
   .wfmove-slide-up,
   .wfmove-slide-down {
      transform: translateY(30px);
   }

   .wfmove-slide-left,
   .wfmove-slide-right {
      transform: translateX(30px);
   }

   .wfmove-zoom-in,
   .wfmove-zoom-out {
      transform: scale(0.9);
   }
}

@media (max-width: 480px) {
   .wfmove-slide-up,
   .wfmove-slide-down {
      transform: translateY(20px);
   }

   .wfmove-slide-left,
   .wfmove-slide-right {
      transform: translateX(20px);
   }

   .wfmove-zoom-in,
   .wfmove-zoom-out {
      transform: scale(0.95);
   }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
   .wfmove-element,
   .wfmove-fade-in,
   .wfmove-slide-up,
   .wfmove-slide-down,
   .wfmove-slide-left,
   .wfmove-slide-right,
   .wfmove-zoom-in,
   .wfmove-zoom-out,
   .wfmove-rotate-in,
   .wfmove-flip-x,
   .wfmove-flip-y,
   .wfmove-scale-up,
   .wfmove-scale-down,
   .wfmove-stagger > * {
      transition: none !important;
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
   }

   .wfmove-pulse,
   .wfmove-bounce-animation,
   .wfmove-shake {
      animation: none !important;
   }
}

/* ===== FOCUS STATES ===== */
.wfmove-element:focus-within {
   outline: 2px solid #2196f3;
   outline-offset: 2px;
}

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfmove-element {
   /* Mantém as mesmas animações no tema noite */
}

html.wfday-night .wfmove-loading::after {
   border-color: #444;
   border-top-color: #4a90e2;
}

/* ===== UTILITÁRIOS ===== */
.wfmove-hidden {
   opacity: 0 !important;
   visibility: hidden !important;
}

.wfmove-visible {
   opacity: 1 !important;
   visibility: visible !important;
}

.wfmove-no-transition {
   transition: none !important;
}

.wfmove-instant {
   transition-duration: 0s !important;
}

/* ===== DEBUG ===== */
.wfmove-debug {
   border: 2px dashed #ff0000;
   background: rgba(255, 0, 0, 0.1);
}

.wfmove-debug::before {
   content: 'WfMove Debug';
   position: absolute;
   top: -20px;
   left: 0;
   background: #ff0000;
   color: white;
   padding: 2px 6px;
   font-size: 10px;
   border-radius: 2px;
}

/* ===== DRAG & DROP AVANÇADO ===== */
.wfmove-dragging { 
   z-index: 9999 !important; 
   transform: scale(1.05) !important; 
   box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
   transition: none !important;
}

.wfmove-snap-grid { 
   background-image: 
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
   background-size: var(--swmove-grid-size, 20px) var(--swmove-grid-size, 20px);
}

.wfmove-magnetic-target {
   position: relative;
}

.wfmove-magnetic-target::before {
   content: '';
   position: absolute;
   top: -25px; left: -25px; right: -25px; bottom: -25px;
   border: 2px dashed rgba(74, 144, 226, 0.3);
   border-radius: 50px;
   opacity: 0;
   transition: opacity 0.3s ease;
   pointer-events: none;
}

.wfmove-magnetic-target.wfmove-magnetic-active::before {
   opacity: 1;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfmove-container::-webkit-scrollbar {
   width: 6px;
   height: 6px;
}

.wfmove-container::-webkit-scrollbar-track {
   background: #f1f1f1;
   border-radius: 3px;
}

.wfmove-container::-webkit-scrollbar-thumb {
   background: #c1c1c1;
   border-radius: 3px;
}

.wfmove-container::-webkit-scrollbar-thumb:hover {
   background: #a8a8a8;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-track {
   background: #2a2a2a;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-thumb {
   background: #555;
}

html.wfday-night .wfmove-container::-webkit-scrollbar-thumb:hover {
   background: #666;
}
         `;
         document.head.appendChild(style);
      }
   }

   init() {
      // Aplicar sistema de Intersection Observer para anime views
      this.setupAnimeViews();
      
      // Configurar recursos avançados
      if (this.parallax || this.scrollProgress) {
         this.setupAdvancedFeatures();
      }
   }

   // Configurar recursos avançados (parallax, scroll progress)
   setupAdvancedFeatures() {
      // Throttled scroll handler para performance
      let ticking = false;
      
      const handleScroll = () => {
         if (!ticking) {
            requestAnimationFrame(() => {
               this.updateAdvancedEffects();
               ticking = false;
            });
            ticking = true;
         }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Cleanup no destroy
      this._scrollHandler = handleScroll;
   }

   // Atualizar efeitos avançados baseados no scroll
   updateAdvancedEffects() {
      const rect = this.element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calcular progresso do scroll (0 = elemento fora da tela embaixo, 1 = elemento fora da tela em cima)
      const scrollProgress = Math.max(0, Math.min(1, 
         (windowHeight - elementTop) / (windowHeight + elementHeight)
      ));

      // Aplicar parallax
      if (this.parallax) {
         const parallaxOffset = (scrollProgress - 0.5) * 100 * this.parallaxSpeed;
         this.element.style.transform = `translateY(${parallaxOffset}px)`;
      }

      // Callback de progresso
      if (this.scrollProgress && this.onProgress) {
         const normalizedProgress = Math.max(0, Math.min(1,
            (scrollProgress - this.progressStart) / (this.progressEnd - this.progressStart)
         ));
         
         try {
            new Function('progress', 'element', this.onProgress).call(this, normalizedProgress, this.element);
         } catch (e) {
            console.error('WfMove onProgress error', e);
         }
      }
   }

   // Drag & drop setup
   setupDrag() {
      // determine handle element
      this._dragging = false;
      this._dragStart = { x: 0, y: 0 };
      this._startPos = { x: 0, y: 0 };
      this._velocity = { x: 0, y: 0 };
      this._lastMoveTime = 0;
      this._lastPosition = { x: 0, y: 0 };
      this._handleEl = this.handleSelector ? this.element.querySelector(this.handleSelector) : this.element;
      if (!this._handleEl) this._handleEl = this.element;
      // event bindings
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._handleEl.style.touchAction = 'none';
      this._handleEl.addEventListener('pointerdown', this._onPointerDown);
      // store bounding references
      try { this.element.classList.add('swmove-draggable'); } catch(e){}
   }

   _onPointerDown(e) {
      // only left button
      if (e.button && e.button !== 0) return;
      e.preventDefault();
      this._dragging = true;
      this._dragId = e.pointerId;
      this._dragStart.x = e.clientX;
      this._dragStart.y = e.clientY;
      const rect = this.element.getBoundingClientRect();
      this._startPos.x = rect.left + window.scrollX;
      this._startPos.y = rect.top + window.scrollY;
      // set pointer capture
      try { e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch(e){}
      document.addEventListener('pointermove', this._onPointerMove);
      document.addEventListener('pointerup', this._onPointerUp);
      // dispatch start event
      this._dispatchEvent('swmove:start', { x: this._startPos.x, y: this._startPos.y });
   }

   _onPointerMove(e) {
      if (!this._dragging || e.pointerId !== this._dragId) return;
      e.preventDefault();
      
      const now = performance.now();
      const dx = e.clientX - this._dragStart.x;
      const dy = e.clientY - this._dragStart.y;
      let nx = this._startPos.x + dx;
      let ny = this._startPos.y + dy;
      
      // Calcular velocidade para momentum
      if (this.momentum && this._lastMoveTime > 0) {
         const deltaTime = now - this._lastMoveTime;
         if (deltaTime > 0) {
            this._velocity.x = (nx - this._lastPosition.x) / deltaTime;
            this._velocity.y = (ny - this._lastPosition.y) / deltaTime;
         }
      }
      
      this._lastMoveTime = now;
      this._lastPosition = { x: nx, y: ny };
      
      // apply axis constraint
      if (this.axis === 'x') ny = this._startPos.y;
      if (this.axis === 'y') nx = this._startPos.x;
      
      // Snap to grid
      if (this.snapToGrid) {
         nx = Math.round(nx / this.gridSize) * this.gridSize;
         ny = Math.round(ny / this.gridSize) * this.gridSize;
      }
      
      // Magnetic targets
      if (this.magneticTargets) {
         const magneticElements = document.querySelectorAll(this.magneticTargets);
         magneticElements.forEach(target => {
            const targetRect = target.getBoundingClientRect();
            const targetX = targetRect.left + window.scrollX + targetRect.width / 2;
            const targetY = targetRect.top + window.scrollY + targetRect.height / 2;
            const distance = Math.sqrt(Math.pow(nx - targetX, 2) + Math.pow(ny - targetY, 2));
            
            if (distance < 50) { // Magnetic range
               const strength = Math.max(0, 1 - distance / 50);
               nx += (targetX - nx) * strength * 0.3;
               ny += (targetY - ny) * strength * 0.3;
            }
         });
      }
      
      // boundary constraint
      if (this.boundarySelector) {
         try {
            const boundary = document.querySelector(this.boundarySelector);
            if (boundary) {
               const bRect = boundary.getBoundingClientRect();
               const elRect = this.element.getBoundingClientRect();
               const minX = bRect.left + window.scrollX;
               const minY = bRect.top + window.scrollY;
               const maxX = minX + bRect.width - elRect.width;
               const maxY = minY + bRect.height - elRect.height;
               nx = Math.max(minX, Math.min(nx, maxX));
               ny = Math.max(minY, Math.min(ny, maxY));
            }
         } catch(e){}
      }
      
      // apply position
      try {
         this.element.style.left = (nx - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().left + window.scrollX : 0)) + 'px';
         this.element.style.top = (ny - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().top + window.scrollY : 0)) + 'px';
      } catch(e){}
      this._dispatchEvent('swmove:move', { x: nx, y: ny });
   }

   _onPointerUp(e) {
      if (!this._dragging || e.pointerId !== this._dragId) return;
      this._dragging = false;
      try { document.removeEventListener('pointermove', this._onPointerMove); document.removeEventListener('pointerup', this._onPointerUp); } catch(e){}
      try { e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId); } catch(e){}
      
      // Aplicar momentum se habilitado
      if (this.momentum && (Math.abs(this._velocity.x) > 0.1 || Math.abs(this._velocity.y) > 0.1)) {
         this._applyMomentum();
      }
      
      this._dispatchEvent('swmove:end', { x: this.element.offsetLeft, y: this.element.offsetTop });
   }

   // Aplicar momentum após soltar o elemento
   _applyMomentum() {
      const animate = () => {
         // Reduzir velocidade gradualmente
         this._velocity.x *= this.momentumDecay;
         this._velocity.y *= this.momentumDecay;
         
         // Parar se velocidade for muito baixa
         if (Math.abs(this._velocity.x) < 0.01 && Math.abs(this._velocity.y) < 0.01) {
            return;
         }
         
         // Calcular nova posição
         const currentRect = this.element.getBoundingClientRect();
         let nx = currentRect.left + window.scrollX + this._velocity.x * 16; // 16ms frame
         let ny = currentRect.top + window.scrollY + this._velocity.y * 16;
         
         // Aplicar restrições de eixo
         if (this.axis === 'x') ny = currentRect.top + window.scrollY;
         if (this.axis === 'y') nx = currentRect.left + window.scrollX;
         
         // Snap to grid durante momentum
         if (this.snapToGrid) {
            nx = Math.round(nx / this.gridSize) * this.gridSize;
            ny = Math.round(ny / this.gridSize) * this.gridSize;
         }
         
         // Aplicar restrições de boundary
         if (this.boundarySelector) {
            try {
               const boundary = document.querySelector(this.boundarySelector);
               if (boundary) {
                  const bRect = boundary.getBoundingClientRect();
                  const elRect = this.element.getBoundingClientRect();
                  const minX = bRect.left + window.scrollX;
                  const minY = bRect.top + window.scrollY;
                  const maxX = minX + bRect.width - elRect.width;
                  const maxY = minY + bRect.height - elRect.height;
                  
                  if (nx < minX || nx > maxX) this._velocity.x = 0;
                  if (ny < minY || ny > maxY) this._velocity.y = 0;
                  
                  nx = Math.max(minX, Math.min(nx, maxX));
                  ny = Math.max(minY, Math.min(ny, maxY));
               }
            } catch(e){}
         }
         
         // Aplicar posição
         try {
            this.element.style.left = (nx - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().left + window.scrollX : 0)) + 'px';
            this.element.style.top = (ny - (this.element.offsetParent ? this.element.offsetParent.getBoundingClientRect().top + window.scrollY : 0)) + 'px';
         } catch(e){}
         
         this._dispatchEvent('swmove:momentum', { x: nx, y: ny, velocity: this._velocity });
         
         // Continuar animação
         requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
   }

   _dispatchEvent(name, detail) {
      try { this.element.dispatchEvent(new CustomEvent(name, { detail })); } catch(e){}
   }

   destroy() {
      try { if (this._handleEl) this._handleEl.removeEventListener('pointerdown', this._onPointerDown); } catch(e){}
      try { document.removeEventListener('pointermove', this._onPointerMove); document.removeEventListener('pointerup', this._onPointerUp); } catch(e){}
      try { if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler); } catch(e){}
      try { this.element._wfMove = null; } catch(e){}
   }

   // Helper: mapear classes e detectar a animação principal do elemento
   static mapAnimationClass(el) {
      if (!el || !el.classList) return null;
      for (const c of el.classList) {
         if (c.indexOf('swmove-') === 0) return c;
         if (c.indexOf('anime-') === 0) return 'swmove-' + c.slice(6);
      }
      return null;
   }

   // Sistema de pooling de observers para performance
   static getOrCreateObserver(threshold, rootMargin) {
      const key = `${threshold}-${rootMargin}`;
      
      if (WfMove.observerPool.has(key)) {
         return WfMove.observerPool.get(key);
      }

      // Limitar número de observers
      if (WfMove.observerPool.size >= WfMove.performanceConfig.maxObservers) {
         // Reutilizar observer mais próximo
         for (const [existingKey, observer] of WfMove.observerPool) {
            const [existingThreshold] = existingKey.split('-');
            if (Math.abs(parseFloat(existingThreshold) - threshold) <= WfMove.performanceConfig.reuseThreshold) {
               return observer;
            }
         }
      }

      const observer = new IntersectionObserver(
         WfMove.debounceIntersectionCallback,
         { threshold, rootMargin }
      );

      WfMove.observerPool.set(key, observer);
      return observer;
   }

   // Callback com debounce para melhor performance
   static debounceIntersectionCallback(entries) {
      const now = performance.now();
      
      entries.forEach(entry => {
         const element = entry.target;
         const elementId = element._swmoveId || (element._swmoveId = Math.random().toString(36));
         
         // Debounce por elemento
         if (WfMove.debounceTimers.has(elementId)) {
            clearTimeout(WfMove.debounceTimers.get(elementId));
         }

         WfMove.debounceTimers.set(elementId, setTimeout(() => {
            WfMove.handleIntersection(entry);
            WfMove.debounceTimers.delete(elementId);
         }, WfMove.performanceConfig.debounceDelay));
      });
   }

   // Handler otimizado para intersections
   static handleIntersection(entry) {
      const el = entry.target;
      const swmoveInstance = el._swmoveInstance;
      
      if (!swmoveInstance) return;

      if (entry.isIntersecting) {
         WfMove.handleElementEnter(el, swmoveInstance);
      } else {
         WfMove.handleElementExit(el, swmoveInstance);
      }
   }

   // Aplicar classe de velocidade ao elemento
   static applySpeedClass(el, speed) {
      // Remover classes de velocidade existentes
      Object.values(WfMove.speedMap).forEach(speedConfig => {
         el.classList.remove(speedConfig.class);
      });
      
      // Aplicar nova classe de velocidade
      const speedConfig = WfMove.speedMap[speed];
      if (speedConfig) {
         el.classList.add(speedConfig.class);
      }
   }

   // Lógica separada para entrada na viewport
   static handleElementEnter(el, instance) {
      // Elemento entrou na viewport, iniciar animação do zero
      el.classList.remove('swmove-exiting');
      
      // mapear nome de animação para classe
      const cls = WfMove.mapAnimationClass(el) || 'swmove-fade-in';
      
      // Aplicar velocidade se especificada
      const speed = el.getAttribute('WfMove-speed') || instance.speed;
      if (speed) {
         WfMove.applySpeedClass(el, speed);
      }
      
      // garantir restart: limpar estado e forçar reflow para reiniciar
      if (!el.classList.contains('swmove-element')) el.classList.add('swmove-element');
      
      // attach listeners once
      if (!el._swmove_listenersAttached) {
         el.addEventListener('transitionstart', () => { el._isAnimating = true; });
         el.addEventListener('transitionend', () => { el._isAnimating = false; });
         el._swmove_listenersAttached = true;
      }
      
      el._isAnimating = true;
      el.classList.remove('swmove-active');
      void el.offsetWidth; // Force reflow
      el.classList.add('swmove-active');
      
      // disparar callback onStart se existir
      const owner = el.closest && el.closest('[WfMove]');
      const onStartCode = el.getAttribute('WfMove-on-start') || (owner && owner.getAttribute && owner.getAttribute('WfMove-on-start'));
      if (onStartCode) {
         try { new Function(onStartCode).call(el); } catch (e) { console.error('WfMove onStart error', e); }
      }
   }

   // Lógica separada para saída da viewport
   static handleElementExit(el, instance) {
      if ((el._isAnimating || el.classList.contains('swmove-active')) && instance.simpleOut) {
         // aplicar saída rápida: fade-out
         el.classList.remove('swmove-active');
         el.classList.add('swmove-exiting');
         
         // after short timeout, limpar estado
         setTimeout(() => {
            el.classList.remove('swmove-exiting');
            el._isAnimating = false;
            const owner = el.closest && el.closest('[WfMove]');
            const onEndCode = el.getAttribute('WfMove-on-end') || (owner && owner.getAttribute && owner.getAttribute('WfMove-on-end'));
            if (onEndCode) {
               try { new Function(onEndCode).call(el); } catch (e) { console.error('WfMove onEnd error', e); }
            }
         }, 180);
      } else {
         // apenas remover a classe ativa
         el.classList.remove('swmove-active');
      }
   }

   setupAnimeViews() {
      // Encontrar todos os elementos com classes anime-* (compat) ou swmove-*
      const selector = '[class*="anime-"], [class*="wfmove-"]';
      let animeElements = Array.from(this.element.querySelectorAll(selector));
      // Se o próprio container também tiver a classe, incluí-lo
      try { if (this.element.matches && this.element.matches(selector)) animeElements.unshift(this.element); } catch(e){}
      if (animeElements.length === 0) return;

      // Usar observer pool para melhor performance
      const rootMargin = '0px 0px -50px 0px';
      const observer = WfMove.getOrCreateObserver(this.threshold, rootMargin);

      // Observar cada elemento com classe anime-*
      animeElements.forEach(el => {
         // normalizar classes legacy: anime-* -> swmove-*
         Array.from(el.classList).forEach(c => {
            if (c.indexOf('anime-') === 0) {
               el.classList.add('swmove-' + c.slice(6));
            }
         });
         
         // marcar que este elemento tem controle de animação
         el._isAnimating = false;
         el._swmoveInstance = this; // Referência para callbacks
         if (!el.classList.contains('swmove-element')) el.classList.add('swmove-element');
         observer.observe(el);
      });
   }

   // Método estático para inicialização
   static initAll(container = document) {
      // Se container for document, usa o comportamento global
      if (container === document) {
         // Verificar se já foi inicializado globalmente
         if (window.SwMoveInitialized) {
            return;
         }

         window.SwMoveInitialized = true;

         // Aguardar um pouco para garantir que o DOM esteja pronto
         setTimeout(() => {
            // Inicializar elementos com atributo WfMove
            const moveElements = document.querySelectorAll('[WfMove]');
            moveElements.forEach(element => {
               if (!element.hasAttribute('WfMove-initialized')) {
                  new WfMove(element);
               }
            });

            // Inicializar elementos com classes anime-* automaticamente
            const animeElements = document.querySelectorAll('[class*="anime-"], [class*="wfmove-"]');

            // Agrupar elementos por container pai para otimização
            const containers = new Set();
            animeElements.forEach(element => {
               const container = element.closest('[WfMove]') || document.body;
               containers.add(container);
            });

            // Inicializar WfMove para cada container único (inclui document.body quando necessário)
            containers.forEach(container => {
               if (!container.hasAttribute('WfMove-initialized')) {
                  new WfMove(container);
               }
            });
         }, 100);
      } else {
         // Inicialização em container específico
         WfMove.initInContainer(container);
      }
   }

   // Método para inicializar em um container específico
   static initInContainer(container = document) {
      // Inicializar elementos com atributo WfMove
      const moveElements = container.querySelectorAll('[WfMove]');
      moveElements.forEach(element => {
         if (!element.hasAttribute('WfMove-initialized')) {
            new WfMove(element);
         }
      });

      // Inicializar elementos com classes anime-* automaticamente
      const animeElements = container.querySelectorAll('[class*="anime-"]');

      if (animeElements.length > 0) {
         if (!container.hasAttribute('WfMove-initialized')) {
            new WfMove(container);
         }
      }
   }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfMove = WfMove;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfMove = WfMove;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfMove.initAll());
   } else {
      setTimeout(() => WfMove.initAll(), 0);
   }
}
