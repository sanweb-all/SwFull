<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfDay</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfDay</li>
            </ol>
         </nav>
      </div>
      <section class="swdayx">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>[Sistema de Temas Dia/Noite BULLETPROOF]</h3>
                  <p>
                     O <b>WfDay</b> é o sistema oficial de temas do WEBFULL. Oferece alternância automática entre modo claro (dia) e escuro (noite), detecção de preferência
                     do sistema, persistência local e integração total com todos os componentes do framework. <b>Funciona em QUALQUER lugar</b> com proteção BULLETPROOF.
                  </p>
                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color)">
                     <b><i class="wf wf-globe Taler f20"></i> GLOBAL:</b> Este componente controla o tema de toda a aplicação!<br />
                     <b><i class="wf wf-bolt-circle Taler f20"></i> AUTOMÁTICO:</b> Detecta preferência do sistema operacional<br />
                     <b><i class="wf wf-save Taler f20"></i> PERSISTENTE:</b> Lembra da escolha do usuário<br />
                     <b><i class="wf wf-shield Taler f20"></i> BULLETPROOF:</b> Funciona em QUALQUER contexto (WfAjax, WfDiv, componentes)
                  </div>

                  <!-- NOVA FUNCIONALIDADE -->
                  <div style="background: var(--wb-bg-); border: 2px solid #4CAF50; padding: 20px; border-radius: 8px; margin: 20px 0; color: var(--wf-color)">
                     <h3 style="color: #4CAF50; margin-top: 0"><i class="wf wf-star Taler f24"></i> <i class="wf wf-plus-circle Taler f20"></i> NOVA FUNCIONALIDADE:
                        WfDay na Tag HTML</h3>
                     <p><b>Forma Recomendada (Nova):</b></p>
                     <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- WfDay na tag HTML (RECOMENDADO) -->
<html lang="pt-BR" WfDay>
    <head>...</head>
    <body>...</body>
</html>

<!-- Com posicionamento personalizado -->
<html lang="pt-BR" WfDay WfDay-pos="top-right">
    <head>...</head>
    <body>...</body>
</html>

<!-- Com ícones personalizados -->
<html lang="pt-BR" WfDay WfDay-day-icon="bxs-sun" WfDay-night-icon="bxs-moon">
    <head>...</head>
    <body>...</body>
</html>
</script></pre>

                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0">
                        <div style="padding: 15px; background: var(--wf-bg-); border: 1px solid #4CAF50; border-radius: 4px;">
                           <h3 style="color: #4CAF50; margin-top: 0"><i class="wf wf-check-circle Taler f20"></i> Vantagens:</h3>
                           <ul style="margin: 0; padding-left: 20px;">
                              <li><b>Escopo Global:</b> Tema afeta toda a página</li>
                              <li><b>Semântica Correta:</b> Tema é propriedade da página</li>
                              <li><b>Performance:</b> Não precisa procurar por divs</li>
                              <li><b>Simplicidade:</b> Menos HTML para escrever</li>
                              <li><b>Padrão Web:</b> Segue padrão de outros frameworks</li>
                           </ul>
                        </div>
                        <div style="padding: 15px; background: var(--wf-bg-); border: 1px solid #ff9800; border-radius: 4px;">
                           <h3 style="color: #ff9800; margin-top: 0"><i class="wf wf-info-circle Taler f20"></i> Compatibilidade:</h3>
                           <p style="margin: 0"><b>Forma Antiga:</b> Ainda funciona com <code>&lt;div WfDay&gt;</code></p>
                           <pre style="margin: 10px 0 0 0; font-size: 12px; background: var(--wf-bg); padding: 8px; border-radius: 4px;">
&lt;div WfDay&gt;&lt;/div&gt;</pre>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- 1. Uso Básico -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #4CAF50">1. Uso Básico</h3>
                  <p>
                     Para ativar o sistema de temas, você pode usar a <b>nova forma recomendada</b> na tag HTML ou a forma tradicional em divs:
                  </p>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-edit Taler f30"></i> Código HTML</h3>

                  <h5 style="color: #4CAF50; margin: 20px 0 10px 0"><i class="wf wf-star Taler f20"></i> Forma Recomendada (Nova):</h5>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- WfDay na tag HTML (RECOMENDADO) -->
<html lang="pt-BR" WfDay>
    <head>...</head>
    <body>...</body>
</html>

<!-- Com posicionamento personalizado -->
<html lang="pt-BR" WfDay WfDay-pos="top-right">
    <head>...</head>
    <body>...</body>
</html>

<!-- Com ícones personalizados -->
<html lang="pt-BR" WfDay WfDay-day-icon="bxs-sun" WfDay-night-icon="bxs-moon">
    <head>...</head>
    <body>...</body>
</html>
</script></pre>

                  <h5 style="color: #ff9800; margin: 20px 0 10px 0"><i class="wf wf-info-circle Taler f20"></i> Forma Tradicional (Compatibilidade):</h5>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Botão de alternância de tema -->
<div WfDay></div>

<!-- Ou em um botão personalizado -->
<button WfDay><i class="wf wf-sun Taler f16"></i>/<i class="wf wf-moon Taler f16"></i> Alternar Tema</button>

<!-- Container que detecta mudanças -->
<div WfDay WfDay-auto="true"></div>

<!-- Com posicionamento personalizado -->
<div WfDay WfDay-pos="top-right"></div>

<!-- Com ícones personalizados -->
<div WfDay WfDay-day-icon="bxs-sun" WfDay-night-icon="bxs-moon"></div>
</script></pre>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-target-lock Taler f30"></i> Demonstração</h3>
                  <div>
                     <div WfDay style="display: inline-block; margin: 0 10px"></div>
                     <p>Use os ícones no lado direito ao centro da página para alternar entre os temas claro e escuro.</p>
                  </div>
                  <div
                     style="padding: 20px; border: 1px solid var(--wborder--); border-radius: 8px; margin: 10px 0; background: var(--bl); transition: all 0.3s ease; color: var(--wf-color)">
                     <h3 class="wfpage"><i class="wf wf-palette Taler f20"></i> Demonstração Visual</h3>
                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0">
                        <div
                           style="padding: 15px; background: var(--wf-bg-, #f8f9fa); border: 1px solid var(--wf-border, #ddd); border-radius: 4px; transition: all 0.3s ease; color: var(--wf-color)">
                           <b><i class="wf wf-sun Taler f16"></i> Modo Claro</b><br />
                           <small>Cores suaves e claras</small>
                        </div>
                        <div style="
                        padding: 15px;
                        background: var(--wf-bg-, #e9ecef);
                        border: 1px solid var(--wf-border--, #ccc);
                        border-radius: 4px;
                        color: var(--wf-color, #555);
                        transition: all 0.3s ease;
                     ">
                           <b><i class="wf wf-moon Taler f16"></i> Modo Escuro</b><br />
                           <small>Cores escuras e contrastantes</small>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- 2. Funcionalidades Avançadas -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #2196F3">2. Funcionalidades Avançadas</h3>
                  <p>O WfDay oferece recursos especiais para troca automática de imagens e fontes baseada no tema atual:</p>
               </div>
            </div>

            <!-- Troca de Imagem -->
            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-image Taler f30"></i> Troca Automática de Imagem</h3>
                  <p>
                     Use os atributos <code>WfDay-img-day</code> e <code>WfDay-img-night</code> para trocar imagens automaticamente com <b>efeito fade suave</b>:
                  </p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Imagem que muda com o tema (COM FADE AUTOMÁTICO) -->
<img
  WfDay-img-day="./img/logo-claro.png"
  WfDay-img-night="./img/logo-escuro.png"
  alt="Logo"
/>

<!-- Background que muda com o tema (COM FADE AUTOMÁTICO) -->
<div
  WfDay-bg-day="url('./img/bg-claro.jpg')"
  WfDay-bg-night="url('./img/bg-escuro.jpg')"
  style="height: 200px;">
</div>

<!-- Imagem com transições suaves (FADE OTIMIZADO) -->
<img
  WfDay-img-day="https://picsum.photos/200/200?random=1"
  WfDay-img-night="https://picsum.photos/200/200?random=2"
  alt="Imagem responsiva"
  style="transition: all 0.3s ease;"
/>

<!-- <i class="wf wf-bolt-circle"></i> VELOCIDADE OTIMIZADA: Fade-out (100ms) + Troca + Fade-in (200ms) -->
</script></pre>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-video Taler f30"></i> Demonstração de Imagens</h3>
                  <div style="text-align: center; margin: 20px 0; padding: 20px; background: var(--wf-bg-); border-radius: 8px; border: 1px solid var(--wf-border, #ddd)">
                     <h3 style="color: var(--wf-color, #333); margin-top: 0"><i class="wf wf-image Taler f20"></i> Teste Real - Clique no botão sol/lua acima!</h3>

                     <!-- IMAGEM REAL QUE MUDA -->
                     <img id="demo-img" src="exemplo/images/demo/01.jpg" WfDay-img-day="exemplo/images/demo/01.jpg" WfDay-img-night="exemplo/images/demo/02.jpg"
                        alt="Demonstração de troca de imagem"
                        style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; display: block; margin: 15px auto" />
                     <p style="color: var(--wf-color, #666)">
                        <small><i class="wf wf-refresh Taler f16"></i> Esta imagem muda automaticamente!</small>
                     </p>

                     <!-- BACKGROUND REAL QUE MUDA -->
                     <div id="demo-bg" WfDay-bg-day="linear-gradient(135deg, #4CAF50, #81C784)" WfDay-bg-night="linear-gradient(135deg, #1A1A1A, #424242)" style="
                        width: 250px;
                        height: 80px;
                        margin: 15px auto;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        transition: all 0.3s ease;
                     ">
                        Background Temático
                     </div>
                     <p style="color: var(--wf-color, #666)">
                        <small><i class="wf wf-palette Taler f16"></i> Este background muda automaticamente!</small>
                     </p>
                  </div>
               </div>
            </div>

            <!-- Sistema de Fade -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #ff9800"><i class="wf wf-bolt-circle Taler f30"></i> Sistema de Fade Otimizado</h3>
                  <p>
                     O WfDay agora inclui um sistema de fade automático para imagens e backgrounds, com <b>velocidade otimizada</b>:
                  </p>
                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color)">
                     <h5 style="margin: 0 0 10px 0; color: #ff9800"><i class="wf wf-video Taler f20"></i> Como Funciona o Fade:</h5>
                     <ol style="margin: 0; padding-left: 20px; color: var(--wf-color)">
                        <li><b>Fade-out (100ms):</b> Imagem atual desaparece suavemente</li>
                        <li><b>Troca instantânea:</b> Nova imagem é carregada</li>
                        <li><b>Fade-in (200ms):</b> Nova imagem aparece suavemente</li>
                     </ol>
                     <p style="margin: 10px 0 0 0; font-size: 14px; color: var(--wf-color-)">
                        <b><i class="wf wf-bolt-circle Taler f16"></i> Total: 300ms</b> - Muito mais rápido que antes!
                     </p>
                  </div>
               </div>
            </div>

            <!-- Troca de Fonte -->
            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-font Taler f30"></i> Troca Automática de Fonte</h3>
                  <p>
                     Use os atributos <code>WfDay-font-day</code> e <code>WfDay-font-night</code> para trocar fontes automaticamente:
                  </p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Texto que muda fonte com o tema -->
<h3
  WfDay-font-day="'Arial', sans-serif"
  WfDay-font-night="'Courier New', monospace">
  Título Responsivo
</h3>

<!-- Peso da fonte que muda com o tema -->
<p
  WfDay-font-day="normal"
  WfDay-font-night="bold"
  WfDay-font-weight="true">
  Texto com peso variável
</p>

<!-- Fonte com transições suaves -->
<p
  WfDay-font-day="'Georgia', serif"
  WfDay-font-night="'Impact', sans-serif"
  style="transition: font-family 0.3s ease;">
  Fonte que muda suavemente
</p>
</script></pre>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-video Taler f30"></i> Demonstração de Fontes</h3>
                  <div style="
                  text-align: center;
                  margin: 20px 0;
                  padding: 20px;
                  background: var(--wf-bg-);
                  border-radius: 8px;
                  border: 1px solid var(--wf-border, #ddd);
                  transition: all 0.3s ease;
               ">
                     <h3 WfDay-font-day='var(--font4)' WfDay-font-night='var(--font6)' style="margin: 0 0 15px 0; transition: font-family 0.3s ease; color: var(--wf-color, #333)">
                        <i class="wf wf-font Taler f20"></i> Título com Fonte Variável
                     </h3>
                     <p WfDay-font-day="normal" WfDay-font-night="bold" WfDay-font-weight="true"
                        style="margin: 0 0 10px 0; transition: font-weight 0.3s ease; color: var(--wf-color, #333)">
                        Este texto muda de peso: Normal ↔ Bold
                     </p>
                     <p WfDay-font-day='var(--font2b)' WfDay-font-night='var(--font5)'
                        style="margin: 0; transition: font-family 0.3s ease; color: var(--wf-color, #333); font-size: 18px">
                        Fonte: Roboto Bold ↔ Dancing Script
                     </p>
                     <p style="margin-top: 15px; color: var(--wf-color, #666)">
                        <small><i class="wf wf-font Taler f16"></i> Fontes e pesos mudam automaticamente!</small>
                     </p>
                  </div>
               </div>
            </div>

            <!-- 3. JavaScript e Eventos -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #ff5722">3. JavaScript e Eventos</h3>
                  <p>O WfDay oferece uma API completa para controle programático e integração:</p>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-cog Taler f30"></i> Controle Programático</h3>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Obter tema atual
const currentTheme = WfDay.getTheme();
console.log('Tema atual:', currentTheme);

// Alternar tema programaticamente
WfDay.toggleTheme();

// Definir tema específico
WfDay.setTheme('night'); // ou 'day'

// Inicializar troca de imagens
WfDay.initImageSwitchers();

// Inicializar troca de fontes
WfDay.initFontSwitchers();

// Inicializar todos os elementos WfDay
WfDay.initAll();

// Inicializar em container específico
WfDay.initAll(document.getElementById('meu-container'));
</script></pre>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-info-circle Taler f30"></i> Eventos Disponíveis</h3>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Escutar mudanças de tema
document.addEventListener('swday:theme-changed', (e) => {
  console.log('Tema alterado:', e.detail.theme);
  console.log('Tema anterior:', e.detail.previousTheme);
});

// Evento global de mudança de tema
window.addEventListener('swday-theme-changed', (e) => {
  console.log('Tema alterado globalmente:', e.detail.theme);
});

// Detectar preferência do sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log('Sistema prefere:', prefersDark ? 'escuro' : 'claro');

// Escutar mudanças na preferência do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  console.log('Preferência do sistema mudou:', e.matches ? 'escuro' : 'claro');
});
</script></pre>
               </div>
            </div>

            <!-- 4. Integração com Componentes -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #9c27b0">4. Integração com Componentes</h3>
                  <p>Todos os componentes WEBFULL se adaptam automaticamente ao tema:</p>
                  <div style="background: var(--wf-bg-); border: 1px solid #9c27b0; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color)">
                     <b><i class="wf wf-link Taler f20"></i> INTEGRAÇÃO TOTAL:</b> Todos os componentes se adaptam automaticamente<br />
                     <b><i class="wf wf-palette Taler f20"></i> TEMAS DINÂMICOS:</b> WfModal, WfAlert, WfTable, WfAba, WfAccord<br />
                     <b><i class="wf wf-refresh Taler f20"></i> RE-INICIALIZAÇÃO:</b> Funciona perfeitamente dentro de WfAjax e WfDiv<br />
                     <b><i class="wf wf-shield Taler f20"></i> BULLETPROOF:</b> Funciona em QUALQUER contexto e profundidade
                  </div>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-list-ul Taler f30"></i> Componentes Suportados</h3>
                  <ul style="color: var(--wf-color)">
                     <li><i class="wf wf-check-circle"></i> <b>WfModal:</b> Modais com tema dinâmico</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfAlert:</b> Alertas com cores adaptáveis</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfTable:</b> Tabelas responsivas ao tema</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfAba:</b> Abas com transições suaves</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfAccord:</b> Acordeões temáticos</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfContainer:</b> Container universal com tema</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfAjax:</b> Conteúdo AJAX com tema</li>
                     <li><i class="wf wf-check-circle"></i> <b>WfDiv:</b> Conteúdo interno com tema</li>
                     <li><i class="wf wf-check-circle"></i> <b>Todos os outros:</b> Integração total</li>
                  </ul>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-bulb Taler f30"></i> Dicas de Uso</h3>
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 4px; margin: 10px 0; color: var(--neut10); transition: all 0.3s ease">
                     <small><b><i class="wf wf-bulb Taler f16"></i> Dica:</b> Teste alternando o tema e veja como todos os componentes se adaptam
                        instantaneamente!</small>
                  </div>
                  <div style="background: #fff3e0; padding: 15px; border-radius: 4px; margin: 10px 0; color: var(--neut10); transition: all 0.3s ease">
                     <small><b><i class="wf wf-wrench Taler f16"></i> Técnica:</b> Use WfDay dentro de WfAjax e WfDiv para temas dinâmicos em conteúdo
                        carregado!</small>
                  </div>
                  <div style="background: #f3e5f5; padding: 15px; border-radius: 4px; margin: 10px 0; color: var(--neut10); transition: all 0.3s ease">
                     <small><b><i class="wf wf-target-lock Taler f16"></i> Posicionamento:</b> Use WfDay-pos para controlar onde o botão aparece na página!</small>
                  </div>
               </div>
            </div>

            <!-- 5. Variáveis CSS e Personalização -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage" style="color: #ff9800">5. Variáveis CSS e Personalização</h3>
                  <p>Você pode personalizar as cores dos temas usando variáveis CSS:</p>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-palette Taler f30"></i> Variáveis CSS Reais</h3>
                  <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Tema Claro - Aplicado via .swday-day */
.wfday-day {
  --bg: var(--neut1);           /* Fundo principal */
  --bg-bl: var(--bran);         /* Fundo branco */
  --wf-color: var(--neut14);       /* Texto principal */
  --border: var(--neut7);       /* Bordas */
  --container: #ffffff;         /* Container */
}

/* Tema Escuro - Aplicado via .swday-night */
.wfday-night {
  --bg: var(--neut12);          /* Fundo principal escuro */
  --bg-bl: var(--neut11);       /* Fundo "branco" escuro */
  --wf-color: var(--neut1);        /* Texto claro */
  --border: var(--neut8);       /* Bordas escuras */
  --container: #232323;         /* Container escuro */
}

/* Transições suaves para todos os elementos */
* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease;
}
</script></pre>
               </div>
               <div class="co6-g">
                  <h3 class="wfpage"><i class="wf wf-wrench Taler f30"></i> Exemplo de Uso</h3>
                  <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Usar as variáveis em seus componentes */

.meu-componente {
  background: var(--bg);
  color: var(--wf-color);
  border: 1px solid var(--border);
}

.meu-botao {
  background: var(--accent-color);
  color: var(--bg);
}

/* Componente com tema dinâmico */
.minha-card {
  background: var(--bg-bl);
  border: 1px solid var(--border);
  color: var(--wf-color);
  transition: all 0.3s ease;
}

/* Hover que funciona em ambos os temas */
.minha-card:hover {
  background: var(--bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</script></pre>
               </div>
            </div>

            <!-- Resumo Final -->
            <div class="l">
               <div class="co12-g">
                  <h3 class="wfpage"><i class="wf wf-bar-chart Taler f30"></i> Resumo Completo do WfDay</h3>
                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; color: var(--wf-color)">
                     <h3 style="margin-top: 0; color: var(--wf-color)"><i class="wf wf-globe Taler f20"></i> 8 Funcionalidades Principais:</h3>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0; color: var(--wf-color)">
                        <div>
                           <h5 style="color: #ff9800; margin: 0 0 8px 0"><i class="wf wf-sun Taler f16"></i> 1. Tema Claro</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>Tema padrão com cores suaves</li>
                              <li>Variáveis CSS organizadas</li>
                              <li>Transições suaves</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #9c27b0; margin: 0 0 8px 0"><i class="wf wf-moon Taler f16"></i> 2. Tema Escuro</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>Tema alternativo escuro</li>
                              <li>Cores contrastantes</li>
                              <li>Adaptação automática</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #4caf50; margin: 0 0 8px 0"><i class="wf wf-image Taler f16"></i> 3. Troca de Imagens</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>WfDay-img-day/night</li>
                              <li>Backgrounds dinâmicos</li>
                              <li><b>FADE AUTOMÁTICO OTIMIZADO</b></li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #2196F3; margin: 0 0 8px 0"><i class="wf wf-font Taler f16"></i> 4. Troca de Fontes</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>WfDay-font-day/night</li>
                              <li>Peso de fonte variável</li>
                              <li>Família de fonte dinâmica</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #ff5722; margin: 0 0 8px 0"><i class="wf wf-bolt-circle Taler f16"></i> 5. Detecção Automática</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>Preferência do sistema</li>
                              <li>Media queries</li>
                              <li>Adaptação inteligente</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #607d8b; margin: 0 0 8px 0"><i class="wf wf-save Taler f16"></i> 6. Persistência</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>localStorage automático</li>
                              <li>Sincronização entre abas</li>
                              <li>Lembrança de preferência</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #795548; margin: 0 0 8px 0"><i class="wf wf-link Taler f16"></i> 7. Integração Total</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>Todos os componentes</li>
                              <li>WfAjax e WfDiv</li>
                              <li>Funciona em QUALQUER lugar</li>
                           </ul>
                        </div>
                        <div>
                           <h5 style="color: #e91e63; margin: 0 0 8px 0"><i class="wf wf-shield Taler f16"></i> 8. BULLETPROOF</h5>
                           <ul style="margin: 0; font-size: 14px">
                              <li>Proteção contra erros</li>
                              <li>Re-inicialização automática</li>
                              <li>Funcionamento garantido</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>

   <script>
      // WfDay para demonstrar funcionamento
      if (typeof WfDay !== 'undefined') {
         WfDay.initAll();
      }
   </script>