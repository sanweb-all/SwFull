(function(window, document) {
    'use strict';

    /**
     * WfIconsInit
     * Carrega e popula automaticamente listas <ul id="wficons-list"> quando a página
     * é carregada ou quando o WfAjax injeta conteúdo.
     */
    const WfIconsInit = {
        initAll: function(container = document) {
            const lists = container.querySelectorAll('#wficons-list');
            lists.forEach(el => this.populate(el));
        },

        populate: function(el) {
            if (!el) return;
            if (el.dataset.wfIconsInit === 'skip') return;
            if (el.dataset.wfIconsInit) return;
            el.dataset.wfIconsInit = '1';

            // Bust cache during development: add timestamp when requested via global flag or on localhost
            let url = '/assets/components/wf-icons.json';
            try {
                const nocache = (window && (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || window.__WF_NO_CACHE));
                if (nocache) url += (url.indexOf('?') === -1 ? '?t=' : '&t=') + Date.now();
            } catch (e) { /* ignore */ }

            fetch(url, { cache: 'no-store' })
                .then(r => { if (!r.ok) throw new Error('wf-icons.json not found'); return r.json(); })
                .then(map => {
                    el.innerHTML = '';
                    const items = Object.values(map).sort((a,b)=> (a.name||'').localeCompare(b.name||''));
                    for (const it of items) {
                        const li = document.createElement('li');
                        const a = document.createElement('a'); a.href = '';
                        const wrap = document.createElement('div');
                        // sempre usar a fonte via classe 'wf wf-<name>' — evita inserir SVGs cru
                        let cls = (it.class || '').trim();
                        if (!cls && it.name) cls = 'wf-' + it.name;
                        cls = cls.replace(/^wfl-/, 'wf-').replace(/^wfs-/, 'wf-');
                        if (!cls) cls = 'wf-icon';
                        wrap.innerHTML = `<i class="wf ${cls}"></i>`;
                        const p = document.createElement('p');
                        p.textContent = cls;
                        a.appendChild(wrap); a.appendChild(p); li.appendChild(a); el.appendChild(li);
                    }
                    // console.log('WfIconsInit: populado', el, items.length);
                })
                .catch(err => {
                    console.error('WfIconsInit: erro ao carregar wf-icons.json', err);
                });
        }
    };

    // Exportação Global
    if (typeof window !== 'undefined') {
        window.WfIconsInit = WfIconsInit;
        if (window.WebFull) {
            window.WebFull.modules.WfIconsInit = WfIconsInit;
        }
    }

    // Auto-inicialização
    if (typeof document !== 'undefined') {
        const init = () => WfIconsInit.initAll();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Roda quando WfAjax injeta conteúdo: usa eventos públicos do framework
        ['swajax:loaded','swajax:processed','swajax:complete','swdiv:loaded','webfull-ready'].forEach(evt => {
            document.addEventListener(evt, () => {
                try { init(); } catch(e){ console.warn('WfIconsInit event handler', e); }
            });
        });

        // MutationObserver para elementos dinâmicos
        const observer = new MutationObserver((mutations) => {
            let shouldInit = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    shouldInit = true;
                    break;
                }
            }
            if (shouldInit) init();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

})(window, document);