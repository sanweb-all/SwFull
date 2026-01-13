<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfLgpd</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfLgpd</li>
        </ol>
      </nav>
    </div>
    <section class="wflgpdx">
      <div class="g-xg">
        <div class="l">
          <div class="co12-g">
            <h3>[Consentimento de Cookies]</h3>
            <p>
              Banner de consentimento para LGPD/Privacy. Insira um container com
              <code>WfLgpd</code> e o componente exibe/oculta automaticamente
              conforme o estado de aceite.
            </p>
          </div>
        </div>

        <div class="l">
          <div class="co6-g">
            <h3>Demonstração</h3>
            <div WfLgpd data-modelo="1"></div>
            <div style="margin-top: 12px; display: flex; gap: 8px">
              <button
                class="btn Bsecu"
                onclick="window.WfLgpd && WfLgpd.reopen(document.querySelector('.wflgpdx'), {localStorageKey: 'wflgpd_accepted'})">
                Reexibir
              </button>
              <button
                class="btn Baler"
                onclick="window.WfLgpd && WfLgpd.clearConsent('wflgpd_accepted'); WfLgpd.reopen(document.querySelector('.wflgpdx'))">
                Limpar Aceite
              </button>
            </div>
          </div>
          <div class="co6-g">
            <h3>Como Usar (Rápido)</h3>
            <pre WfCode WfCode-language="html"><script type="text/plain">
<!-- 1) Adicione o container em sua página -->
<div WfLgpd data-modelo="1"></div>

<!-- 2) Garanta que o agregador esteja carregado -->
</script></pre>
            <h3>Opções</h3>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Inicialização programática
WfLgpd.initAll(document, {
  modelo: 3,              // 1..4 (visual)
  localStorageKey: 'wflgpd_accepted',
  messageText: 'Usamos cookies para melhorar sua experiência.',
  acceptText: 'Aceitar',
  rejectText: 'Rejeitar',
  onlyAccept: false,
  cookieExpireDays: 365,
  onAccept: () => console.log('Aceitou'),
  onReject: () => console.log('Rejeitou')
});
          </script></pre>
          </div>
        </div>

        <div class="l">
          <div class="co12-g">
            <h3>API Rápida</h3>
            <pre WfCode WfCode-language="javascript"><script type="text/plain">
// Limpar consentimento e reexibir o banner
WfLgpd.clearConsent('wflgpd_accepted');
WfLgpd.reopen(document);

// Inicializar manualmente (geralmente desnecessário)
WfLgpd.initAll(document, { localStorageKey: 'wflgpd_accepted' });
          </script></pre>
          </div>
        </div>
    </section>
</section>