(function(window, document) {
    'use strict';

    /**
     * WfText - Sistema de Campos de Texto Animados
     * @author SandroWeb
     * @version 4.0 - Animações via JS e Funcionalidade Completa
     * @since WEBFULL Framework v1.0
     */
    class WfText {
        constructor(element) {
            // Verificar se já foi inicializado
            if (element._wfText) return element._wfText;
            
            this.element = element;
            if (!this.element) return;

            // Salvar instância
            this.element._wfText = this;

            // Configurações
            this.effect = this.element.getAttribute('WfText-effect') || 'fade';
            this.interval = parseInt(this.element.getAttribute('WfText-interval')) || 4000;
            this.transition = parseInt(this.element.getAttribute('WfText-transition')) || 700;
            this.arrows = this.element.getAttribute('WfText-arrows') !== 'false';
            this.indicators = this.element.getAttribute('WfText-indicators') !== 'false';
            this.autoStart = this.element.getAttribute('WfText-autoplay') !== 'false';
            this.loop = this.element.getAttribute('WfText-loop') !== 'false';

            this.items = Array.from(this.element.querySelectorAll('.wf-text-item'));
            if (this.items.length === 0) return;

            this.currentIndex = 0;
            this.intervalId = null;
            this.isAnimating = false;

            this.init();
        }

    init() {
        this.loadCSS();
        this.setupComponent();
        this.createControls();
        this.updateActiveState();
        this.bindEvents();

        if (this.autoStart) {
            this.start();
        }
    }

    loadCSS() {
        if (document.getElementById('wftext-styles')) return;
        const style = document.createElement('style');
        style.id = 'wftext-styles';
        style.textContent = `
            .wf-text-carousel { position: relative; overflow: hidden; }
            .wf-text-carousel::before { display: none !important; content: none !important; }
            .wf-text-item { width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all var(--wftext-transition-duration, 0.7s) ease-in-out; }
            .wf-text-item:first-child { opacity: 1; visibility: visible; }
            .wftext-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(0,0,0,0.3); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.3s; }
            .wftext-arrow:hover { background: rgba(0,0,0,0.6); }
            .wftext-arrow-left { left: 10px; }
            .wftext-arrow-right { right: 10px; }
            .wftext-indicators { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; gap: 8px; }
            .wftext-indicator { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.2); cursor: pointer; padding: 0; transition: background 0.3s; }
            .wftext-indicator.active, .wftext-indicator:hover { background: white; }
        `;
        document.head.appendChild(style);
    }

    setupComponent() {
        this.element.style.position = 'relative';
        this.element.style.setProperty('--wftext-transition-duration', `${this.transition}ms`);
        this.items.forEach((item, index) => {
            item.style.opacity = index === 0 ? '1' : '0';
            item.style.visibility = index === 0 ? 'visible' : 'hidden';
            item.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease, visibility ${this.transition}ms ease`;
            item.style.willChange = 'transform, opacity';
        });
    }

    createControls() {
        if (this.items.length <= 1) return;
        if (this.arrows) {
            const leftArrow = document.createElement('button');
            leftArrow.className = 'wftext-arrow wftext-arrow-left';
            leftArrow.innerHTML = '‹';
            leftArrow.addEventListener('click', () => this.prev());
            this.element.appendChild(leftArrow);

            const rightArrow = document.createElement('button');
            rightArrow.className = 'wftext-arrow wftext-arrow-right';
            rightArrow.innerHTML = '›';
            rightArrow.addEventListener('click', () => this.next());
            this.element.appendChild(rightArrow);
        }
        if (this.indicators) {
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'wftext-indicators';
            this.items.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'wftext-indicator';
                indicator.dataset.index = index;
                indicator.addEventListener('click', () => this.goTo(index));
                indicatorsContainer.appendChild(indicator);
            });
            this.element.appendChild(indicatorsContainer);
        }
    }

    bindEvents() {
        if (this.autoStart) {
            this.element.addEventListener('mouseenter', () => this.pause());
            this.element.addEventListener('mouseleave', () => this.resume());
        }
    }

    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        if (!this.loop && (index < 0 || index >= this.items.length)) return;

        this.isAnimating = true;

        const currentItem = this.items[this.currentIndex];
        const nextIndex = (index + this.items.length) % this.items.length;
        const nextItem = this.items[nextIndex];
        const effect = nextItem.getAttribute('WfText-effect') || this.effect;

        // Garantir transição inline (fallback caso CSS não seja aplicado)
        if (nextItem) {
            nextItem.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease`;
            nextItem.style.willChange = 'transform, opacity';
        }
        if (currentItem) {
            currentItem.style.transition = `transform ${this.transition}ms ease, opacity ${this.transition}ms ease`;
            currentItem.style.willChange = 'transform, opacity';
        }

        // Prepare z-index layering
        if (currentItem) {
            currentItem.style.zIndex = '0';
        }
        nextItem.style.visibility = 'visible';
        nextItem.style.zIndex = '1';

        // Prepare IN start state for next item
        this._applyInStart(nextItem, effect);
        // Force reflow to ensure transition from start to end
        nextItem.getBoundingClientRect();
        // Animate IN to final state
        this._applyInEnd(nextItem, effect);

        // Animate OUT current item to final state
        if (currentItem) {
            this._applyOutEnd(currentItem, effect);
        }

        // Update index and indicators immediately
        this.currentIndex = nextIndex;
        this.updateActiveState();

        // Complete transition after duration
        setTimeout(() => {
            if (currentItem) {
                currentItem.style.visibility = 'hidden';
                currentItem.style.transform = 'none';
                currentItem.style.opacity = '0';
                currentItem.style.zIndex = '';
            }
            nextItem.style.zIndex = '';
            this.isAnimating = false;
        }, this.transition);
    }

    _applyInStart(item, effect) {
        // Common starting state
        item.style.opacity = '0';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
                item.style.transform = 'translateX(100%)';
                break;
            case 'slide-right':
                item.style.transform = 'translateX(-100%)';
                break;
            case 'slide-up':
                item.style.transform = 'translateY(100%)';
                break;
            case 'slide-down':
                item.style.transform = 'translateY(-100%)';
                break;
            case 'zoom-in':
                item.style.transform = 'scale(0.85)';
                break;
            case 'zoom-out':
                item.style.transform = 'scale(1.15)';
                break;
            case 'bounce':
                item.style.transform = 'scale(0.85)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    _applyInEnd(item, effect) {
        // Final visible state
        item.style.opacity = '1';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
            case 'slide-right':
                item.style.transform = 'translateX(0)';
                break;
            case 'slide-up':
            case 'slide-down':
                item.style.transform = 'translateY(0)';
                break;
            case 'zoom-in':
            case 'zoom-out':
            case 'bounce':
                item.style.transform = 'scale(1)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    _applyOutEnd(item, effect) {
        // Final hidden state for OUT animation (will be set to display:none after transition)
        item.style.opacity = '0';
        switch (effect) {
            case 'fade':
                item.style.transform = 'none';
                break;
            case 'slide-left':
                item.style.transform = 'translateX(-100%)';
                break;
            case 'slide-right':
                item.style.transform = 'translateX(100%)';
                break;
            case 'slide-up':
                item.style.transform = 'translateY(-100%)';
                break;
            case 'slide-down':
                item.style.transform = 'translateY(100%)';
                break;
            case 'zoom-in':
                item.style.transform = 'scale(0.85)';
                break;
            case 'zoom-out':
                item.style.transform = 'scale(1.15)';
                break;
            case 'bounce':
                item.style.transform = 'scale(0.85)';
                break;
            default:
                item.style.transform = 'none';
        }
    }

    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }

    updateActiveState() {
        if (this.indicators) {
            this.element.querySelectorAll('.wftext-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    start() {
        if (this.intervalId || this.items.length <= 1) return;
        this.intervalId = setInterval(() => this.next(), this.interval);
    }

    stop() { clearInterval(this.intervalId); this.intervalId = null; }
    pause() { this.stop(); }
    resume() { this.start(); }

    static initAll(container = document) {
        let elements = [];
        try {
            if (container === document || container === document.body || container === document.documentElement) {
                elements = document.querySelectorAll('.wf-text-carousel');
            } else {
                if (container.matches && container.matches('.wf-text-carousel')) {
                    elements = [container, ...container.querySelectorAll('.wf-text-carousel')];
                } else {
                    elements = container.querySelectorAll('.wf-text-carousel');
                }
            }
        } catch (_) {
            elements = document.querySelectorAll('.wf-text-carousel');
        }
        elements.forEach(element => {
            if (!element._wfText) {
                element._wfText = new WfText(element);
            }
        });
    }
}

// Registro no WebFull
if (typeof window !== 'undefined') {
    window.WfText = WfText;

    if (window.WebFull && window.WebFull.modules) {
        window.WebFull.modules.WfText = WfText;
    }
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
    document.addEventListener('DOMContentLoaded', () => WfText.initAll());

    // Initialize dynamically added .wf-text containers as they appear (e.g., via WfAjax)
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;
                const scope = node.matches?.('.wf-text-carousel') ? node : node.querySelector?.('.wf-text-carousel');
                if (scope) {
                    WfText.initAll(scope); // will safely skip already initialized elements
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

})(window, document);
