class WfNolink {
   static _options = {};
   static _delegated = false;

   static handleClick(event) {
      event.preventDefault();
      const el = event.currentTarget;
      const targetId = el.getAttribute('href')?.substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
         WfNolink.scrollToElement(targetElement, WfNolink._options);
         WfNolink.ocultarAncora();
         targetElement.setAttribute('tabindex', '-1');
         targetElement.focus({ preventScroll: true });
         targetElement.dispatchEvent(new CustomEvent('sw:nolink:scrolled', { bubbles: true }));
      }
   }

   static scrollToElement(targetElement, options = {}) {
      const offset = typeof options.offset === 'function' ? options.offset() : options.offset || 0;
      const behavior = options.behavior || 'smooth';
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = rect.top + window.scrollY - offset;

      window.scrollTo({
         top: scrollTop,
         behavior: behavior,
      });
   }

   static ocultarAncora() {
      const urlAtual = window.location.href;
      const novaUrl = urlAtual.split('#')[0];
      history.replaceState(null, '', novaUrl);
   }

   static initAll(container = document, options = {}) {
      WfNolink.delegate(container, options);
   }

   static delegate(container = document, options = {}) {
      if (WfNolink._delegated) return;
      WfNolink._options = options;
      container.addEventListener('click', event => {
         const el = event.target.closest('[noLink]');
         if (el) {
            event.preventDefault();
            const targetId = el.getAttribute('href')?.substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
               WfNolink.scrollToElement(targetElement, WfNolink._options);
               WfNolink.ocultarAncora();
               targetElement.setAttribute('tabindex', '-1');
               targetElement.focus({ preventScroll: true });
               targetElement.dispatchEvent(new CustomEvent('sw:nolink:scrolled', { bubbles: true }));
            }
         }
      });
      WfNolink._delegated = true;
   }

   static destroyAll() {
      // A delegação de eventos não requer a remoção de listeners individuais.
      // Se necessário, um método para remover o listener do container pode ser implementado.
      WfNolink._delegated = false;
   }
}

// Registro no WebFull
if (window.WebFull) {
   window.WebFull.modules.WfNolink = WfNolink;
} else if (typeof window !== 'undefined') {
   window.WfNolink = WfNolink;
}

// Auto-inicialização apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
   document.addEventListener('DOMContentLoaded', () => WfNolink.delegate(document));
}

