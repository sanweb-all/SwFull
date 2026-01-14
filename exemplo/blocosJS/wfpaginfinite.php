<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfPaginfinite</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfPaginfinite</li>
            </ol>
         </nav>
      </div>
      <section class="swpaginfinitex">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>[Scroll Infinito]</h3>
                  <!--<span class="wfbag">PRONTO / BULLETPROOF</span>-->
                  <p>
                     O <b>WfPagInfinite</b> é um componente de scroll infinito para elementos HTML já carregados. Funciona como o WfPag, mas carrega automaticamente mais
                     itens
                     conforme o usuário rola, criando uma experiência fluida sem botões de navegação. Ideal para feeds, listas longas e galerias.
                  </p>
                  <div style="background: var(--wf-bl); border: 1px solid #9c27b0; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-infinite f20"></i> SCROLL INFINITO:</b> Carrega mais itens automaticamente ao rolar<br />
                     <b><i class="wf wf-file f20"></i> DETECÇÃO AUTOMÁTICA:</b> Monitora proximidade do fim do scroll<br />
                     <b><i class="wf wf-zoom f20"></i> SEM AJAX:</b> Trabalha com elementos DOM já carregados
                  </div>
               </div>
            </div>

            <!-- Uso Básico -->
            <div class="l">
               <div class="co6-g">
                  <h3>Uso Básico</h3>
                  <p>Use o atributo <code>WfPagInfinite</code> no container com <code>WfPagInfinite-items</code> para definir quantos itens mostrar inicialmente:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Scroll infinito básico - 6 itens iniciais -->
<div WfPagInfinite WfPagInfinite-items="6">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
  <div class="item">Item 6</div>
  <div class="item">Item 7</div>
  <div class="item">Item 8</div>
  <div class="item">Item 9</div>
  <div class="item">Item 10</div>
  <div class="item">Item 11</div>
  <div class="item">Item 12</div>
</div>

<!-- Com classe específica para filtrar itens -->
<div WfPagInfinite WfPagInfinite-items="8" WfPagInfinite-class="produto">
  <div class="produto">Produto A</div>
  <div class="produto">Produto B</div>
  <div class="produto">Produto C</div>
  <div class="outro">Não será paginado</div>
  <div class="produto">Produto D</div>
  <!-- ... mais produtos -->
</div>

<!-- Com altura personalizada -->
<div WfPagInfinite WfPagInfinite-items="4" WfPagInfinite-height="300px">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <!-- ... mais itens -->
</div>
        </script></pre>

                  <div style="background: var(--bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-pin wdest2-color f20"></i> Como Funciona:</b><br />
                     • Container: <code>[WfPagInfinite]</code> com <code>WfPagInfinite-items="X"</code><br />
                     • Elementos: Filhos diretos ou por classe específica<br />
                     • Scroll: Criado automaticamente (max-height + overflow)<br />
                     • Carregamento: Automático ao rolar perto do fim (100px)
                  </div>
               </div>
               <div class="co6-g">
                  <h3>Exemplo Funcionando</h3>
                  <p>Scroll infinito real com 25 itens divididos em grupos de 5:</p>

                  <!-- Demonstração real do WfPagInfinite -->
                  <div style="border: 2px solid var(--color); border-radius: 8px; padding: 20px; margin: 20px 0; background: var(--bg-bl)">
                     <div WfPagInfinite WfPagInfinite-items="5" WfPagInfinite-height="600px" id="exemplo-principal">
                        <div style="padding: 12px; margin: 8px 0; background: #2196f3; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-smartphone wdest2-color f20"></i> Post 1 - Lançamento do novo app
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #ff9800; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-laptop wdest2-color f20"></i> Post 2 - Dicas de programação
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #4caf50; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-desktop wdest2-color f20"></i> Post 3 - Tendências em design
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #e91e63; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-watch wdest2-color f20"></i> Post 4 - Wearables em 2025
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #9c27b0; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-headphone wdest2-color f20"></i> Post 5 - Audio tech revolution
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #607d8b; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-camera wdest2-color f20"></i> Post 6 - Fotografia mobile
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #795548; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-mouse wdest2-color f20"></i> Post 7 - Interfaces do futuro
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #ff5722; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-keyboard wdest2-color f20"></i> Post 8 - Produtividade no trabalho
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #3f51b5; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-printer wdest2-color f20"></i> Post 9 - Impressão 3D acessível
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #009688; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-hdd wdest2-color f20"></i> Post 10 - Backup e segurança
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #ffc107; color: black; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-plug wdest2-color f20"></i> Post 11 - Energia sustentável
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #8bc34a; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-lightbulb wdest2-color f20"></i> Post 12 - IoT residencial
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #f44336; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-rocket wdest2-color f20"></i> Post 13 - IA generativa
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #673ab7; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-game wdest2-color f20"></i> Post 14 - Gaming cloud
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #00bcd4; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-globe wdest2-color f20"></i> Post 15 - Web3 explicado
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #ff6f00; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-bar-chart-2 wdest2-color f20"></i> Post 16 - Data analytics
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #6a1b9a; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-lock wdest2-color f20"></i> Post 17 - Cybersecurity trends
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #1565c0; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-cloud wdest2-color f20"></i> Post 18 - Cloud computing
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #2e7d32; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-smartphone wdest2-color f20"></i> Post 19 - App development
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #d32f2f; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-bot wdest2-color f20"></i> Post 20 - Automação inteligente
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #512da8; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-palette wdest2-color f20"></i> Post 21 - Design systems
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #0277bd; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-trending-up wdest2-color f20"></i> Post 22 - Growth hacking
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #388e3c; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-globe wdest2-color f20"></i> Post 23 - Sustentabilidade tech
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #f57c00; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-target wdest2-color f20"></i> Post 24 - Marketing digital
                        </div>
                        <div style="padding: 12px; margin: 8px 0; background: #7b1fa2; color: white; border-radius: 6px; text-align: center; font-weight: 600">
                           <i class="wf wf-rocket wdest2-color f20"></i> Post 25 - Futuro da tecnologia
                        </div>
                     </div>
                  </div>

                  <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin: 15px 0; text-align: center">
                     <small> <b><i class="wf wf-target wdest2-color f20"></i> Demonstração:</b> WfPagInfinite real funcionando com 5 itens iniciais. Role para baixo para
                        carregar mais posts automaticamente. </small>
                  </div>
               </div>
            </div>

            <!-- Atributos Disponíveis -->
            <div class="l">
               <div class="co6-g">
                  <h3>Atributos Disponíveis</h3>
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
                           <td><code>WfPagInfinite</code></td>
                           <td>-</td>
                           <td>Ativa o componente no elemento</td>
                        </tr>
                        <tr>
                           <td><code>WfPagInfinite-items</code></td>
                           <td>number</td>
                           <td>Itens mostrados inicialmente e por lote (padrão: 6)</td>
                        </tr>
                        <tr>
                           <td><code>WfPagInfinite-class</code></td>
                           <td>string</td>
                           <td>Classe CSS para filtrar elementos filhos (opcional)</td>
                        </tr>
                        <tr>
                           <td><code>WfPagInfinite-height</code></td>
                           <td>string</td>
                           <td>Altura personalizada do container (ex: "300px", "50vh")</td>
                        </tr>
                     </tbody>
                  </table>

                  <div style="background: var(--bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-pin wdest2-color f20"></i> Comportamento Automático:</b><br />
                     • <code>max-height: calc(100vh - 100px)</code> - Altura padrão (ou <code>WfPagInfinite-height</code> se definido)<br />
                     • <code>overflow-y: auto</code> - Scroll vertical<br />
                     • <code>100px</code> - Distância do fim para carregar mais<br />
                     • <code>position: relative</code> - Posicionamento
                  </div>
               </div>
               <div class="co6-g">
                  <h3>Exemplos Práticos</h3>

                  <!-- Feed de Posts -->
                  <h5 style="margin-top: 20px; color: var(--color)"><i class="wf wf-news wdest2-color f20"></i> Feed de Posts</h5>
                  <div style="margin: 15px 0; padding: 15px; background: var(--bg-bl); border-radius: 8px; border: 1px solid var(--color)">
                     <div WfPagInfinite WfPagInfinite-items="3" WfPagInfinite-height="200px">
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-news wdest2-color f20"></i>
                           Como implementar scroll infinito</div>
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-rocket wdest2-color f20"></i>
                           Performance em apps web</div>
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-laptop wdest2-color f20"></i>
                           UX/UI para mobile</div>
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-zap wdest2-color f20"></i>
                           Otimização de carregamento</div>
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-palette wdest2-color f20"></i>
                           Tendências em design</div>
                        <div style="padding: 10px; margin: 5px 0; background: var(--bg-bl); border: 1px solid #ddd; border-radius: 4px"><i class="wf wf-wrench wdest2-color f20"></i>
                           Ferramentas de desenvolvimento</div>
                     </div>
                  </div>

                  <!-- Lista de Produtos Filtrada -->
                  <h5 style="margin-top: 20px; color: var(--color)"><i class="wf wf-shopping-bag wdest2-color f20"></i> Produtos com Filtro</h5>
                  <div style="margin: 15px 0; padding: 15px; background: var(--bg-bl); border-radius: 8px; border: 1px solid var(--color)">
                     <div WfPagInfinite WfPagInfinite-items="2" WfPagInfinite-class="produto" WfPagInfinite-height="150px">
                        <div class="produto" style="padding: 12px; margin: 5px 0; background: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px; text-align: center">
                           <i class="wf wf-smartphone wdest2-color f20"></i> Smartphone Premium
                        </div>
                        <div class="outro" style="padding: 12px; margin: 5px 0; background: #ffebee; border: 1px solid #f44336; border-radius: 4px; text-align: center; opacity: 0.5">
                           <i class="wf wf-x-circle wdest2-color f20"></i> Não será paginado (classe "outro")
                        </div>
                        <div class="produto" style="padding: 12px; margin: 5px 0; background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; text-align: center">
                           <i class="wf wf-laptop wdest2-color f20"></i> Laptop Gamer
                        </div>
                        <div class="produto" style="padding: 12px; margin: 5px 0; background: #e8f5e8; border: 1px solid #4caf50; border-radius: 4px; text-align: center">
                           <i class="wf wf-headphone wdest2-color f20"></i> Headset Wireless
                        </div>
                        <div class="produto" style="padding: 12px; margin: 5px 0; background: #fce4ec; border: 1px solid #e91e63; border-radius: 4px; text-align: center">
                           <i class="wf wf-watch wdest2-color f20"></i> Smartwatch Sport
                        </div>
                     </div>
                  </div>

                  <!-- Exemplo com altura fixa -->
                  <h5 style="margin-top: 20px; color: var(--color)"><i class="wf wf-ruler wdest2-color f20"></i> Altura Fixa</h5>
                  <div style="margin: 15px 0; padding: 15px; background: var(--bg-bl); border-radius: 8px; border: 1px solid var(--color)">
                     <div WfPagInfinite WfPagInfinite-items="2" WfPagInfinite-height="200px">
                        <div style="padding: 12px; margin: 5px 0; background: #e8f5e8; border: 1px solid #4caf50; border-radius: 4px; text-align: center"><i
                              class="wf wf-clipboard wdest2-color f20"></i> Task 1 - Revisar código
                        </div>
                        <div style="padding: 12px; margin: 5px 0; background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; text-align: center">
                           <i class="wf wf-zap wdest2-color f20"></i> Task 2 - Otimizar performance
                        </div>
                        <div style="padding: 12px; margin: 5px 0; background: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px; text-align: center"><i
                              class="wf wf-wrench wdest2-color f20"></i> Task 3 - Corrigir bugs
                        </div>
                        <div style="padding: 12px; margin: 5px 0; background: #fce4ec; border: 1px solid #e91e63; border-radius: 4px; text-align: center"><i
                              class="wf wf-edit wdest2-color f20"></i> Task 4 - Documentar API
                        </div>
                        <div style="padding: 12px; margin: 5px 0; background: #f3e5f5; border: 1px solid #9c27b0; border-radius: 4px; text-align: center">
                           <i class="wf wf-rocket wdest2-color f20"></i> Task 5 - Deploy produção
                        </div>
                        <div style="padding: 12px; margin: 5px 0; background: #e0f2f1; border: 1px solid #009688; border-radius: 4px; text-align: center">
                           <i class="wf wf-target wdest2-color f20"></i> Task 6 - Métricas usuário
                        </div>
                     </div>
                  </div>

                  <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin: 15px 0">
                     <small>
                        <b><i class="wf wf-lightbulb wdest2-color f20"></i> Dicas:</b><br />
                        • Use <code>WfPagInfinite-class</code> quando nem todos os filhos devem ser paginados<br />
                        • Use <code>WfPagInfinite-height</code> para definir altura específica (ex: "300px", "50vh")
                     </small>
                  </div>
               </div>
            </div>

            <!-- API JavaScript -->
            <div class="l">
               <div class="co6-g">
                  <h3>Como Funciona</h3>
                  <div style="background: var(--bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-refresh wdest2-color f20"></i> Fluxo de Funcionamento:</b><br /><br />
                     <b>1.</b> Detecta elemento <code>[WfPagInfinite]</code><br />
                     <b>2.</b> Lê <code>WfPagInfinite-items</code> (padrão: 6)<br />
                     <b>3.</b> Lê <code>WfPagInfinite-class</code> (opcional)<br />
                     <b>4.</b> Lista elementos válidos<br />
                     <b>5.</b> Define container como scrollável<br />
                     <b>6.</b> Oculta todos os itens<br />
                     <b>7.</b> Mostra primeiros X itens<br />
                     <b>8.</b> Monitora evento de scroll<br />
                     <b>9.</b> Carrega mais ao chegar perto do fim
                  </div>

                  <div style="background: var(--bg); padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-ruler wdest2-color f20"></i> CSS Aplicado Automaticamente:</b><br />
                     • <code>max-height: calc(100vh - 100px)</code> (ou valor do <code>WfPagInfinite-height</code>)<br />
                     • <code>overflow-y: auto</code><br />
                     • <code>position: relative</code><br />
                     • <code>display: none</code> nos itens ocultos
                  </div>
               </div>
               <div class="co6-g">
                  <h3>API JavaScript</h3>
                  <p>Inicialização e controle programático:</p>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicializar automaticamente todos
WfPagInfinite.initAll();

// Inicializar específico
const container = document.querySelector('#meu-container');
const pagInfinite = new WfPagInfinite(container);

// Propriedades da instância
console.log(pagInfinite.container);     // Elemento container
console.log(pagInfinite.items);         // Array dos elementos
console.log(pagInfinite.currentIndex);  // Índice atual
console.log(pagInfinite.loading);       // Se está carregando
console.log(pagInfinite.itemsPerPage);  // Itens por lote
console.log(pagInfinite.className);     // Classe de filtro
console.log(pagInfinite.customHeight);  // Altura personalizada

// Não há métodos públicos - funciona automaticamente
// O carregamento é baseado apenas no scroll do usuário
        </script></pre>

                  <div style="background: var(--bg); padding: 10px; border-radius: 4px; margin: 10px 0">
                     <small><b><i class="wf wf-lightbulb wdest2-color f20"></i> Dica:</b> O WfPagInfinite é totalmente automático - apenas funciona com scroll!</small>
                  </div>
               </div>
            </div>

            <!-- Resumo -->
            <div class="l">
               <div class="co12-g">
                  <h3>Resumo</h3>
                  <div style="background: var(--bg-bl); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745">
                     <h3 style="margin-top: 0"><i class="wf wf-check-circle wdest2-color f20"></i> Características do WfPagInfinite</h3>
                     <ul>
                        <li><b><i class="wf wf-infinity wdest2-color f20"></i> Scroll Infinito:</b> Carrega elementos HTML já carregados conforme o usuário rola</li>
                        <li><b><i class="wf wf-wrench wdest2-color f20"></i> Configuração Mínima:</b> Apenas <code>[WfPagInfinite]</code> e <code>WfPagInfinite-items</code>
                        </li>
                        <li><b><i class="wf wf-ruler wdest2-color f20"></i> Container Automático:</b> Define altura e scroll automaticamente</li>
                        <li><b><i class="wf wf-target wdest2-color f20"></i> Detecção Inteligente:</b> Carrega mais itens ao chegar a 100px do fim</li>
                        <li><b><i class="wf wf-sliders wdest2-color f20"></i> Filtro por Classe:</b> Permite paginar apenas elementos com classe específica</li>
                        <li><b><i class="wf wf-zap wdest2-color f20"></i> Performance:</b> Apenas mostra/oculta elementos, sem recarregamentos</li>
                        <li><b><i class="wf wf-smartphone wdest2-color f20"></i> Responsivo:</b> Funciona em desktop e mobile automaticamente</li>
                        <li><b><i class="wf wf-refresh wdest2-color f20"></i> Automático:</b> Funciona sem intervenção do usuário ou programação adicional</li>
                        <li><b><i class="wf wf-sparkles wdest2-color f20"></i> Smooth UX:</b> Experiência fluida sem botões ou quebras de página</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- FORÇAR WfPagInfinite-height FUNCIONAR (IGNORAR CACHE) -->
      <script>
         // 🔥 FORÇA BRUTA - IGNORA CACHE COMPLETAMENTE
         (function() {
            console.log('🚨 FORÇANDO WfPagInfinite-height SEM CACHE');

            // Função para aplicar WfPagInfinite-height diretamente
            function forceDataHeight() {
               const containers = document.querySelectorAll('[WfPagInfinite]');
               console.log(`<i class="wf wf-wrench wdest2-color f20"></i> Encontrados ${containers.length} containers WfPagInfinite`);

               containers.forEach((container, index) => {
                  const dataHeight = container.getAttribute('WfPagInfinite-height');
                  if (dataHeight) {
                     console.log(`📏 Container ${index + 1}: Aplicando ${dataHeight}`);
                     container.style.maxHeight = dataHeight;
                     container.style.overflowY = 'auto';
                     container.style.position = 'relative';

                     // Verificar se aplicou corretamente
                     setTimeout(() => {
                        const applied = container.style.maxHeight;
                        console.log(`<i class="wf wf-check-circle wdest2-color f20"></i> Container ${index + 1}: Aplicado = ${applied}`);
                     }, 100);
                  }
               });
            }

            // Aplicar imediatamente
            forceDataHeight();

            // Aplicar após WfAjax carregar (se houver)
            setTimeout(forceDataHeight, 500);
            setTimeout(forceDataHeight, 1000);
            setTimeout(forceDataHeight, 2000);

            // Re-aplicar se WfPagInfinite for carregado depois
            const observer = new MutationObserver(() => {
               forceDataHeight();
            });

            observer.observe(document.body, {
               childList: true,
               subtree: true,
               attributes: true,
               attributeFilter: ['style'],
            });

            console.log('<i class="wf wf-target wdest2-color f20"></i> FORÇA BRUTA ATIVADA - WfPagInfinite-height será aplicado!');
         })();
      </script>

      <!-- Carregamento do WebFull Framework -->
      <!-- Inicialização direta do WfPagInfinite -->
      <script type="module">
         import WfPagInfinite from '/assets/components/compJs/WfPagInfinite.js';

         // Aguardar DOM e inicializar
         if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => WfPagInfinite.initAll());
         } else {
            WfPagInfinite.initAll();
         }
      </script>
</section>