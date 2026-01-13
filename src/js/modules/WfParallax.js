// WfParallax - Efeito Parallax para SWMVC
// Suporte: background, elemento, mouse, múltiplos na página
// Configuração via data-attributes: data-type, data-speed, data-direction, data-range, data-invert, data-responsive

class WfParallax {
   constructor(element) {
      this.element = element;
      this.speed = parseFloat(this.element.getAttribute('WfParallax-speed')) || 0.5;
      this.direction = this.element.getAttribute('WfParallax-direction') || 'vertical';
      this.type = this.element.getAttribute('WfParallax-type') || 'background';
      this.offset = parseInt(this.element.getAttribute('WfParallax-offset')) || 0;
      this.mobile = this.element.getAttribute('WfParallax-mobile') !== 'false';

      // Adicionar propriedades que estavam faltando
      this.range = parseInt(this.element.getAttribute('WfParallax-range')) || 200;
      this.invert = this.element.getAttribute('WfParallax-invert') === 'true';

      this.initialY = 0;
      this.initialX = 0;
      this.isActive = true;

      // Debug para verificar configurações
      console.log(`[WfParallax] Inicializando elemento:`, {
         tagName: this.element.tagName,
         type: this.type,
         speed: this.speed,
         direction: this.direction,
         range: this.range,
         invert: this.invert,
      });

      this.init();
   }

   init() {
      this.loadCSS();

      if (this.type === 'background') {
         this.initBackground();
      } else if (this.type === 'element') {
         this.initElement();
      } else if (this.type === 'mouse') {
         this.initMouse();
      }
   }

   loadCSS() {
      // Load external component CSS; if it fails, inject minimal fallback CSS
      if (document.querySelector('link[href$="WfParallax.css"]')) return;
      try {
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = '/assets/components/css/WfParallax.css';
         link.id = 'swparallax-styles';
         link.onload = () => { /* loaded */ };
         link.onerror = (err) => { this._injectFallbackCSS(); console.warn('WfParallax: fallback CSS injected due to load error', err); };
         document.head.appendChild(link);
         // if browser doesn't support onerror on link, schedule a check and fallback
         setTimeout(() => { if (!document.getElementById('swparallax-styles') || !(document.querySelector('link[href$="WfParallax.css"]'))) this._injectFallbackCSS(); }, 1200);
      } catch (err) {
         this._injectFallbackCSS();
         if (window.SwLogger && typeof SwLogger.warn === 'function') {
            SwLogger.warn('WfParallax: falha ao carregar CSS externo, fallback aplicado', err);
         }
      }
   }

   _injectFallbackCSS() {
      if (document.getElementById('swparallax-fallback')) return;
      try {
         const s = document.createElement('style');
         s.id = 'swparallax-fallback';
         s.textContent = `
/* fallback styles for WfParallax demo */
.wfparallax-bg-demo { background-size: cover; background-position: center; width:100%; height:100%; }
.wfparallax-circle, .wfparallax-target-box { will-change: transform; transition: transform 0.2s linear; }
`;
         document.head.appendChild(s);
      } catch(e){}
   }

   initBackground() {
      this.element.style.backgroundAttachment = 'fixed';
      this.element.style.backgroundRepeat = 'no-repeat';
      this.element.style.backgroundSize = 'cover';

      // Usar bind para manter o contexto
      // use RAF wrapper for scroll to avoid layout thrashing
      this._rafScheduled = false;
      this.handleScroll = this.handleScroll.bind(this);
      this._onScroll = () => { if (!this._rafScheduled) { this._rafScheduled = true; requestAnimationFrame(() => { this._rafScheduled = false; this.handleScroll(); }); } };
      window.addEventListener('scroll', this._onScroll, { passive: true });
      this.handleScroll();
   }

   initElement() {
      this.element.style.willChange = 'transform';

      // Usar bind para manter o contexto
      // element transform-based parallax also uses RAF wrapper
      this._rafScheduled = false;
      this.handleScroll = this.handleScroll.bind(this);
      this._onScroll = () => { if (!this._rafScheduled) { this._rafScheduled = true; requestAnimationFrame(() => { this._rafScheduled = false; this.handleScroll(); }); } };
      window.addEventListener('scroll', this._onScroll, { passive: true });
      this.handleScroll();
   }

   initMouse() {
      this.element.style.willChange = 'transform';

      // Usar bind para manter o contexto
      this.handleMouse = this.handleMouse.bind(this);
      // use passive listener for mousemove as we don't call preventDefault
      window.addEventListener('mousemove', this.handleMouse, { passive: true });
   }

   handleScroll() {
      if (!this.isActive) return;

      const rect = this.element.getBoundingClientRect();
      const winH = window.innerHeight;
      const percent = (rect.top + rect.height / 2 - winH / 2) / winH;
      let move = percent * this.range * this.speed;

      if (this.invert) move = -move;

      if (this.type === 'background') {
         if (this.direction === 'vertical') {
            this.element.style.backgroundPosition = `center calc(50% + ${move}px)`;
         } else if (this.direction === 'horizontal') {
            this.element.style.backgroundPosition = `calc(50% + ${move}px) center`;
         } else {
            // Movimento em ambas direções
            this.element.style.backgroundPosition = `calc(50% + ${move}px) calc(50% + ${move}px)`;
         }
      } else if (this.type === 'element') {
         if (this.direction === 'vertical') {
            this.element.style.transform = `translateY(${move}px)`;
         } else if (this.direction === 'horizontal') {
            this.element.style.transform = `translateX(${move}px)`;
         } else {
            // Movimento em ambas direções
            this.element.style.transform = `translate(${move}px, ${move}px)`;
         }
      }
   }

   handleMouse(e) {
      if (!this.isActive) return;

      const rect = this.element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      let moveX = dx * this.range * this.speed;
      let moveY = dy * this.range * this.speed;

      if (this.invert) {
         moveX = -moveX;
         moveY = -moveY;
      }

      if (this.direction === 'vertical') {
         this.element.style.transform = `translateY(${moveY}px)`;
      } else if (this.direction === 'horizontal') {
         this.element.style.transform = `translateX(${moveX}px)`;
      } else {
         // Movimento em ambas direções
         this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
   }

   destroy() {
      this.isActive = false;
      if (this.handleScroll) window.removeEventListener('scroll', this.handleScroll);
      if (this.handleMouse) window.removeEventListener('mousemove', this.handleMouse);
      this.element.style.transform = '';
      this.element.style.backgroundPosition = '';
      this.element._swparallax = null;
   }

   static initAll(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      const instances = [];

      elements.forEach(el => {
         if (!el._swparallaxInitialized) {
            try {
               const instance = new WfParallax(el);
               el._swparallax = instance;
               el._swparallaxInitialized = true;
               instances.push(instance);
            } catch (error) {
               if (window.SwLogger && typeof SwLogger.warn === 'function') {
                  SwLogger.warn('WfParallax: Erro ao inicializar elemento:', error);
               } else {
                  console.warn('WfParallax: Erro ao inicializar elemento:', error);
               }
            }
         }
      });

      return instances;
   }

   // Métodos estáticos de conveniência
   static destroy(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.destroy();
            delete el._swparallax;
            delete el._swparallaxInitialized;
         }
      });
   }

   static pause(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.isActive = false;
         }
      });
   }

   static resume(container = document) {
      const elements = container.querySelectorAll('[WfParallax]');
      elements.forEach(el => {
         if (el._swparallax) {
            el._swparallax.isActive = true;
         }
      });
   }
}

// Exportação Global
if (typeof window !== 'undefined') {
   window.WfParallax = WfParallax;
   if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfParallax = WfParallax;
   }
}

// Auto-inicialização
if (typeof window !== 'undefined') {
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfParallax.initAll());
   } else {
      setTimeout(() => WfParallax.initAll(), 0);
   }
}
