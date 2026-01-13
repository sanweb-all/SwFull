(function(window, document) {
    'use strict';

    /**
     * WfPanel1 - Painéis com AJAX Integrado
     *
     * @author SandroWeb
     * @version 3.0
     * @since WEBFULL Framework v1.0
     */
    class WfPanel1 {
        constructor(element) {
            // Singleton pattern
            if (element._wfPanelAjax) return element._wfPanelAjax;

            this.element = element;
            element._wfPanelAjax = this;
            // backwards compatibility
            element._wfPanel1 = this;

            // aceitar atributos com e sem sufixo 1 para compatibilidade
            this.side = this.element.getAttribute('WfPanel1-side') || this.element.getAttribute('WfPanel-side') || 'right';
            this.size = this.element.getAttribute('WfPanel1-size') || this.element.getAttribute('WfPanel-size') || 'medium';
            // largura customizada opcional (ex.: 65%)
            this.customWidth = this.element.getAttribute('WfPanel1-width') || this.element.getAttribute('WfPanel-width');
            this.overlay = (this.element.getAttribute('WfPanel1-overlay') || this.element.getAttribute('WfPanel-overlay')) !== 'false';
            // Suporta WfPanel1-url ou href (mais prático em links)
            this.ajaxUrl = this.element.getAttribute('WfPanel1-url') || this.element.getAttribute('href') || this.element.getAttribute('WfPanel-url');
            this.ajaxTarget = this.element.getAttribute('WfPanel1-ajax-target') || '.wfpanelajax-content';
            this.closeOnOutside = (this.element.getAttribute('WfPanel1-close-on-outside') || this.element.getAttribute('WfPanel-close-on-outside')) !== 'false';
            this.closeOnEsc = (this.element.getAttribute('WfPanel1-close-on-esc') || this.element.getAttribute('WfPanel-close-on-esc') || this.element.getAttribute('WfPanel-close-on-escape')) !== 'false';
            // Título pode vir de WfPanel1-title, WfPanel-title ou do atributo title/texto do link
            this.title = this.element.getAttribute('WfPanel1-title') || this.element.getAttribute('WfPanel-title') || this.element.getAttribute('title') || this.element.textContent.trim() || 'Painel';
            this.loading = this.element.getAttribute('WfPanel1-loading') || this.element.getAttribute('WfPanel-loading') || 'Carregando...';
            // duração opcional
            this.durationMs = (function(d){
                if(!d) return 300;
                const s = String(d).trim();
                if(/^\d+ms$/.test(s)) return parseInt(s.replace('ms',''), 10);
                if(/^\d+$/.test(s)) return parseInt(s, 10);
                if(s==='slow') return 800;
                if(s==='fast') return 150;
                return 300;
            })(this.element.getAttribute('WfPanel1-duration') || this.element.getAttribute('WfPanel-duration'));
            this.onSuccess = this.element.getAttribute('WfPanel-on-success') || this.element.getAttribute('WfPanel1-on-success');
            this.onError = this.element.getAttribute('WfPanel-on-error') || this.element.getAttribute('WfPanel1-on-error');
            this.onClose = this.element.getAttribute('WfPanel-on-close') || this.element.getAttribute('WfPanel1-on-close');

            this.isOpen = false;
            this.isLoading = false;
            this.overlayElement = null;
            this.panelElement = null;
            this.contentElement = null;
            this.escapeHandler = null;

            this.loadCSS();
            this.init();
        }

        static initAll(container = document) {
            const triggers = container.querySelectorAll('[WfPanel1-url], [WfPanel-url], [WfPanel1], [WfPanelAjax], [wfpanelajax]');
            triggers.forEach(el => {
                if (!el._wfPanelAjax) new WfPanel1(el);
            });
        }

        loadCSS() {
            if (!document.getElementById('wfpanel1-styles')) {
                const style = document.createElement('style');
                style.id = 'wfpanel1-styles';
                style.textContent = `
/**
 * WfPanel1.css - Estilos dos Painéis com AJAX Integrado
 * SandroWeb - 2025
 */

/* ===== TRIGGER ===== */
.wfpanel1-trigger {
    cursor: pointer;
    transition: all 0.3s ease;
}
.wfpanel1-trigger:hover {
    opacity: 0.8;
}

/* ===== OVERLAY ===== */
.wfpanel1-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(2px);
}
.wfpanel1-overlay.wfpanel1-active {
    opacity: 1;
}

/* ===== PAINEL PRINCIPAL ===== */
.wfpanel1-panel {
    position: fixed;
    background: var(--wbg-, #fff);
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    z-index: 10000;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0;
}
.wfpanel1-panel.wfpanel1-active {
    transform: translate(0, 0) !important;
}

/* ===== HEADER ===== */
.wfpanel1-header {
    background: var(--prin, #2196f3);
    color: white;
    padding: 1rem 1.5rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.wfpanel1-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--bran, #fff);
    flex: 1;
}
.wfpanel1-close {
    background: none;
    border: none;
    color: white;
    font-size: 4rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}
.wfpanel1-close:hover {
    background: rgba(255,255,255,0.2);
    color: var(--amar, #ffeb3b);
    transform: scale(1.1);
}
.wfpanel1-close:focus {
    outline: 2px solid var(--amar, #ffeb3b);
    outline-offset: 2px;
}

/* ===== CONTEÚDO ===== */
.wfpanel1-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    position: relative;
    background: var(--bg, #fff);
}

/* ===== LOADING ===== */
.wfpanel1-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text, #666);
    font-size: 14px;
    flex-direction: column;
    gap: 12px;
}
.wfpanel1-loading-icon {
    font-size: 24px;
    animation: wfpanel1-spin 1s linear infinite;
}
.wfpanel1-loading-text {
    font-weight: 500;
}
@keyframes wfpanel1-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ===== ERRO ===== */
.wfpanel1-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--error, #f44336);
    font-size: 14px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
}
.wfpanel1-error-icon {
    font-size: 32px;
}
.wfpanel1-error-text {
    font-weight: 500;
}

/* ===== SEM URL ===== */
.wfpanel1-no-url {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--warning, #ff9800);
    font-size: 14px;
    text-align: center;
    font-weight: 500;
}

/* ===== TAMANHOS ===== */
.wfpanel1-small { min-width: 400px; min-height: 300px; }
.wfpanel1-medium { min-width: 600px; min-height: 400px; }
.wfpanel1-large { min-width: 800px; min-height: 500px; }
.wfpanel1-xlarge { min-width: 1000px; min-height: 600px; }
.wfpanel1-full { width: 100vw !important; height: 100vh !important; }

/* ===== POSICIONAMENTOS ===== */
.wfpanel1-panel[style*="left: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="right: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="top: 0"] { border-radius: 0; }
.wfpanel1-panel[style*="bottom: 0"] { border-radius: 0; }

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
    .wfpanel1-panel {
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0 !important;
    }
    .wfpanel1-header { padding: 12px 16px; }
    .wfpanel1-title { font-size: 16px; }
    .wfpanel1-content { padding: 16px; }
    .wfpanel1-close { width: 28px; height: 28px; font-size: 20px; }
}
@media (max-width: 480px) {
    .wfpanel1-header { padding: 10px 12px; }
    .wfpanel1-title { font-size: 14px; }
    .wfpanel1-content { padding: 12px; }
    .wfpanel1-loading, .wfpanel1-error { font-size: 12px; }
}

/* ===== ACESSIBILIDADE ===== */
@media (prefers-reduced-motion: reduce) {
    .wfpanel1-panel, .wfpanel1-overlay, .wfpanel1-close { transition: none !important; }
    .wfpanel1-loading-icon { animation: none !important; }
}

/* ===== FOCUS STATES ===== */
.wfpanel1-panel:focus-within {
    outline: 2px solid var(--prin, #2196f3);
    outline-offset: 2px;
}

/* ===== SCROLLBAR PERSONALIZADA ===== */
.wfpanel1-content::-webkit-scrollbar { width: 6px; height: 6px; }
.wfpanel1-content::-webkit-scrollbar-track { background: var(--bg-light, #f5f5f5); border-radius: 3px; }
.wfpanel1-content::-webkit-scrollbar-thumb { background: var(--border, #ddd); border-radius: 3px; }
.wfpanel1-content::-webkit-scrollbar-thumb:hover { background: var(--text-light, #999); }

/* ===== TEMA NOITE (WfDay) ===== */
html.wfday-night .wfpanel1-panel { background: var(--bg-dark, #1a1a1a); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
html.wfday-night .wfpanel1-header { background: var(--prin-dark, #1976d2); border-bottom-color: rgba(255,255,255,0.1); }
html.wfday-night .wfpanel1-content { background: var(--bg-dark, #1a1a1a); color: var(--text-dark, #e0e0e0); }
html.wfday-night .wfpanel1-loading { color: var(--text-dark, #999); }
html.wfday-night .wfpanel1-error { color: var(--error-dark, #ff6b6b); }
html.wfday-night .wfpanel1-no-url { color: var(--warning-dark, #ffb74d); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-track { background: var(--bg-dark-light, #2a2a2a); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-thumb { background: var(--border-dark, #444); }
html.wfday-night .wfpanel1-content::-webkit-scrollbar-thumb:hover { background: var(--text-dark-light, #666); }

/* ===== ANIMAÇÕES ESPECIAIS ===== */
@keyframes wfpanel1-slide-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.wfpanel1-content > * { animation: wfpanel1-slide-in 0.3s ease-out; }

/* ===== ESTADOS ESPECIAIS ===== */
.wfpanel1-loading .wfpanel1-loading-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.wfpanel1-error .wfpanel1-error-icon { filter: drop-shadow(0 2px 4px rgba(244,67,54,0.2)); }

/* ===== UTILITÁRIOS ===== */
.wfpanel1-hidden { display: none !important; }
.wfpanel1-visible { display: flex !important; }
.wfpanel1-no-overflow { overflow: hidden !important; }

/* ===== DEBUG ===== */
.wfpanel1-debug { border: 2px dashed #ff0000; background: rgba(255,0,0,0.1); }
.wfpanel1-debug::before {
    content: 'WfPanel1 Debug';
    position: absolute;
    top: -20px;
    left: 0;
    background: #ff0000;
    color: white;
    padding: 2px 6px;
    font-size: 10px;
    border-radius: 2px;
    z-index: 10001;
}
                `;
                document.head.appendChild(style);
            }
        }

        init() {
            this.setupComponent();
            this.bindEvents();
        }

        setupComponent() {
            this.element.classList.add('wfpanel1-trigger');
            this.processSizes();
        }

        processSizes() {
            const sizes = {
                small: '400px',
                medium: '600px',
                large: '800px',
                xlarge: '1000px',
                full: '100vw'
            };

            const isVertical = (this.side === 'top' || this.side === 'bottom');

            if (isVertical) {
                // usar 100% para evitar overflow causado por scrollbars quando usamos 100vw
                this.width = this.customWidth || '100%';
                this.height = (this.size && sizes[this.size]) ? sizes[this.size] : sizes.medium;
            } else {
                this.width = this.customWidth || ((this.size && sizes[this.size]) ? sizes[this.size] : sizes.medium);
                this.height = '100vh';
            }
        }

        bindEvents() {
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        }

        async open() {
            if (this.isOpen) return;

            try {
                this.isOpen = true;
                this.isLoading = true;

                this.createPanel();
                this.showPanel();
                await this.loadContent();
            } catch (error) {
                // Erro silencioso: evitar logs desnecessários em produção
                this.showError();
            }
        }

        createPanel() {
            if (this.overlay) {
                this.overlayElement = document.createElement('div');
                this.overlayElement.className = 'wfpanel1-overlay';

                if (this.closeOnOutside) {
                    this.overlayElement.addEventListener('click', () => this.close());
                }

                document.body.appendChild(this.overlayElement);
            }

            const position = this.getPanelPosition();

            this.panelElement = document.createElement('div');
            this.panelElement.className = 'wfpanel1-panel';
            this.panelElement.classList.add(`wfpanel1-${this.size}`);
            this.panelElement.style.cssText = `
                position: fixed;
                ${position}
                width: ${this.width};
                height: ${this.height};
                transform: ${this.getInitialTransform()};
            `;
            try {
               const url = this.ajaxUrl || '';
               this.panelElement.setAttribute('data-url', url);
               const m = url.match(/\/forms\/edit\/(\d+)/);
               if(m && m[1]) this.panelElement.setAttribute('data-id', String(parseInt(m[1],10)));
            } catch(e){}

            // aplicar duração de transição se definido (inline para garantir)
            try {
                this.panelElement.style.transition = `transform ${this.durationMs}ms ease`;
            } catch (e) {}

            const header = document.createElement('div');
            header.className = 'wfpanel1-header';

            const title = document.createElement('h3');
            title.textContent = this.title;
            title.className = 'wfpanel1-title';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.className = 'wfpanel1-close';
            closeBtn.addEventListener('click', () => this.close());

            header.appendChild(title);
            header.appendChild(closeBtn);

            this.contentElement = document.createElement('div');
            this.contentElement.className = 'wfpanel1-content';
            this.contentElement.innerHTML = `
                <div class="wfpanel1-loading">
                    <div class="wfpanel1-loading-icon">⏳</div>
                    <div class="wfpanel1-loading-text">${this.loading}</div>
                </div>
            `;

            this.panelElement.appendChild(header);
            this.panelElement.appendChild(this.contentElement);
            document.body.appendChild(this.panelElement);

            // Garantir box-sizing e largura correta para top/bottom (evitar overflow 100vw)
            try {
                this.panelElement.style.boxSizing = 'border-box';
                if(this.side === 'top' || this.side === 'bottom') {
                    // garantir posicionamento que respeite a viewport sem overflow
                    this.panelElement.style.left = '0';
                    this.panelElement.style.right = '0';
                    this.panelElement.style.width = '100vw';
                    this.panelElement.style.maxWidth = '100vw';
                }
            } catch(err) {
                // silencioso
            }

            if (this.closeOnEsc) {
                this.escapeHandler = (e) => {
                    if (e.key === 'Escape') {
                        this.close();
                    }
                };
                document.addEventListener('keydown', this.escapeHandler);
            }
        }

        getInitialTransform() {
            switch (this.side) {
                case 'left': return 'translateX(-100%)';
                case 'right': return 'translateX(100%)';
                case 'top': return 'translateY(-100%)';
                case 'bottom': return 'translateY(100%)';
                default: return 'translateX(100%)';
            }
        }

        getPanelPosition() {
            switch (this.side) {
                case 'left': return 'top: 0; left: 0;';
                case 'right': return 'top: 0; right: 0;';
                case 'top': return 'top: 0; left: 0; right: 0;';
                case 'bottom': return 'bottom: 0; left: 0; right: 0;';
                default: return 'top: 0; right: 0;';
            }
        }

        showPanel() {
            // ativar overlay e painel usando RAF para garantir repaint antes da transição
            if (this.overlayElement) {
                requestAnimationFrame(() => {
                    this.overlayElement.classList.add('wfpanel1-active');
                });
            }

            requestAnimationFrame(() => {
                // forçar reflow
                void this.panelElement.offsetHeight;
                this.panelElement.classList.add('wfpanel1-active');

                // prevenir scroll do body enquanto painel aberto - salvar estado anterior para restaurar depois
                try {
                    this._prevBodyOverflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                } catch(e) {}
            });
        }

        async loadContent() {
            if (!this.ajaxUrl) {
                this.contentElement.innerHTML = '<div class="wfpanel1-no-url">Nenhuma URL configurada</div>';
                return;
            }

            try {
                const response = await fetch(this.ajaxUrl, {
                    credentials: 'same-origin'
                });
                const html = await response.text();
                // Se um seletor alvo foi definido, extrair apenas o conteúdo correspondente
                let injected = html;
                const selector = (this.ajaxTarget||'').trim();
                if(selector) {
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const target = doc.querySelector(selector);
                        if(target) {
                            injected = target.innerHTML;
                        }
                    } catch(e) {
                        // Se parsing falhar, segue com HTML completo
                    }
                }

                this.contentElement.innerHTML = injected;
                this.isLoading = false;
                try {
                    const hid = this.contentElement.querySelector("input[name='id']");
                    const hv = hid && hid.value;
                    if(hv && /^\d+$/.test(hv)) this.panelElement.setAttribute('data-id', String(parseInt(hv,10)));
                    const innerData = this.contentElement.querySelector("[data-id]");
                    const iv = innerData && (innerData.getAttribute('data-id') || (innerData.dataset && innerData.dataset.id));
                    if(iv && /^\d+$/.test(iv)) this.panelElement.setAttribute('data-id', String(parseInt(iv,10)));
                } catch(e) {}

                // Inicializar componentes dentro do conteúdo carregado (igual WfAjax)
                try {
                    if (window.WebFull && typeof window.WebFull.initAll === 'function') {
                        window.WebFull.initAll(this.contentElement);
                    } else if (typeof this.reinitializeComponents === 'function') {
                        this.reinitializeComponents(this.contentElement);
                    }
                } catch(err) {
                    // silencioso
                }

                // Disparar evento com bubble/composed para permitir listeners globais (ex.: document)
                this.element.dispatchEvent(new CustomEvent('wfpanel1:loaded', {
                    detail: { url: this.ajaxUrl, content: injected, full: html },
                    bubbles: true,
                    composed: true
                }));

                // Chamar callback onSuccess se definido
                try {
                    if (this.onSuccess && typeof window[this.onSuccess] === 'function') {
                        window[this.onSuccess](this.element);
                    }
                } catch (err) {
                    // silencioso
                }
            } catch (error) {
                // Tentar retry se houver atributo WfPanel-ajax-retry
                const retryCount = parseInt(this.element.getAttribute('WfPanel-ajax-retry') || this.element.getAttribute('WfPanel1-ajax-retry') || '0', 10);
                if (!this._retryAttempts) this._retryAttempts = 0;
                if (this._retryAttempts < retryCount) {
                    this._retryAttempts++;
                    setTimeout(() => this.loadContent(), 300);
                    return;
                }
                this.showError();
            }
        }

        showError() {
            this.contentElement.innerHTML = `
                <div class="wfpanel1-error">
                    <div class="wfpanel1-error-icon">⚠️</div>
                    <div class="wfpanel1-error-text">Erro ao carregar conteúdo</div>
                </div>
            `;
            this.isLoading = false;
            // Chamar callback onError se definido
            try {
                if (this.onError && typeof window[this.onError] === 'function') {
                    window[this.onError](this.element);
                }
            } catch (err) {
                // silencioso
            }
        }

        close() {
            if (!this.isOpen) return;

            this.isOpen = false;

            if (this.overlayElement && this.overlayElement.classList && typeof this.overlayElement.classList.remove === 'function') {
                try { this.overlayElement.classList.remove('wfpanel1-active'); } catch(_) {}
            }

            if (this.panelElement && this.panelElement.classList && typeof this.panelElement.classList.remove === 'function') {
                try { this.panelElement.classList.remove('wfpanel1-active'); } catch(_) {}
            }

            setTimeout(() => {
                try {
                    if (this.overlayElement && typeof this.overlayElement.remove === 'function') this.overlayElement.remove();
                } catch(_) {}
                try {
                    if (this.panelElement && typeof this.panelElement.remove === 'function') this.panelElement.remove();
                } catch(_) {}

                this.overlayElement = null;
                this.panelElement = null;
                this.contentElement = null;

                if (this.escapeHandler) {
                    document.removeEventListener('keydown', this.escapeHandler);
                    this.escapeHandler = null;
                }

                // restaurar overflow
                try {
                   if (this._prevBodyOverflow !== undefined) {
                       document.body.style.overflow = this._prevBodyOverflow;
                   } else {
                       document.body.style.overflow = '';
                   }
                } catch(e) {}

                // Chamar callback onClose se definido
                try {
                    if (this.onClose && typeof window[this.onClose] === 'function') {
                        window[this.onClose](this.element);
                    }
                } catch (err) {
                    // silencioso
                }
            }, 300); // tempo da transição
        }
    }

    // Exportação Global
    if (typeof window !== 'undefined') {
        window.WfPanel1 = WfPanel1;
        if (typeof window.WebFull !== 'undefined') {
            window.WebFull.modules.WfPanel1 = WfPanel1;
        }
    }

    // Auto-inicialização
    if (typeof window !== 'undefined') {
        const init = () => {
            WfPanel1.initAll();

            // Observer para elementos dinâmicos
            const observer = new MutationObserver((mutations) => {
                let shouldInit = false;
                for (const mutation of mutations) {
                    if (mutation.addedNodes.length) {
                        shouldInit = true;
                        break;
                    }
                }
                if (shouldInit) {
                    WfPanel1.initAll();
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})(window, document);
