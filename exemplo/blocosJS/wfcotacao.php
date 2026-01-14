<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfCotacao</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfCotacao</li>
            </ol>
         </nav>
      </div>
      <section class="swcotacaox">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>WfCotacao</h3>
                  <!--<span class="wfbag">PRONTO / BULLETPROOF</span>-->
                  <p>Sistema de cotações em tempo real usando a AwesomeAPI. Exibe moedas, criptomoedas e outros ativos com atualização automática e formatação inteligente.</p>
               </div>
            </div>
            <!-- Introdução -->
            <div class="l">
               <div class="co6-g">
                  <h3>O que é?</h3>
                  <p>O WfCotacao é um componente que consome a AwesomeAPI para exibir cotações de moedas em tempo real com diferentes modos de visualização e atualização automática.
                  </p>

                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-bar-chart Taler f20"></i> MÚLTIPLOS MODOS:</b> Tabela, individual, valor puro<br />
                     <b><i class="wf wf-refresh Taler f20"></i> AUTO-UPDATE:</b> Atualização automática configurável<br />
                     <b><i class="wf wf-palette Taler f20"></i> TEMAS:</b> Suporte completo ao WfDay (claro/escuro)
                  </div>
                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-wrench Taler f20"></i> Dependências:</b> Nenhuma<br />
                     <b><i class="wf wfs-zap Taler f20"></i> Suporte:</b> Todos os navegadores modernos<br />
                     <b><i class="wf wf-globe Taler f20"></i> API:</b> AwesomeAPI (economia.awesomeapi.com.br)<br />
                     <b><i class="wf wf-target-lock Taler f20"></i> Uso:</b> Classe "wf-cotacao"<br />
                     <b><i class="wf wf-refresh Taler f20"></i> AJAX:</b> WfCotacao.initAll()<br />
                     <b><i class="wf wf-palette Taler f20"></i> Temas:</b> CSS Variables + WfDay
                  </div>
               </div>
               <div class="co6-g">
                  <br />
                  <div class="wfpage-info">
                     <div class="wfpage-info-header"><i class="wf wf-info-circle"></i> Informações</div>
                     <br />
                     <div class="wfpage-info-content">
                        <b><i class="wf wf-folder Taler f20"></i> Arquivo:</b> js/WfCotacao.js<br />
                        <b><i class="wf wf-file Taler f20"></i> Tamanho:</b> ~8KB<br />
                        <b><i class="wf wf-wrench Taler f20"></i> Dependências:</b> Nenhuma<br />
                        <b><i class="wf wfs-zap Taler f20"></i> Suporte:</b> Todos os navegadores modernos<br />
                        <b><i class="wf wf-globe Taler f20"></i> API:</b> AwesomeAPI (economia.awesomeapi.com.br)<br />
                        <b><i class="wf wf-target-lock Taler f20"></i> Uso:</b> Classe "wf-cotacao"<br />
                        <b><i class="wf wf-refresh Taler f20"></i> AJAX:</b> WfCotacao.initAll()<br />
                        <b><i class="wf wf-palette Taler f20"></i> Temas:</b> CSS Variables + WfDay
                     </div>
                  </div>
               </div>
            </div>
            <!-- Uso Básico -->
            <div class="l">
               <div class="co12-g">
                  <h3>Uso Básico</h3>
                  <p>Para exibir cotações, use a classe <code>wf-cotacao</code> com os atributos de configuração:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Cotação única (modo individual) -->
<div class="wf-cotacao" WfCotacao-pares="USD-BRL"></div>

<!-- Múltiplas cotações (modo tabela) -->
<div class="wf-cotacao" WfCotacao-pares="USD-BRL,EUR-BRL,GBP-BRL"></div>

<!-- Com atualização automática -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL,EUR-BRL"
     WfCotacao-auto="true"
     WfCotacao-interval="60000"></div>

<!-- Modo valor puro (apenas o número) -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-mode="valor-puro"></div>

<!-- Modo valor com span -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-mode="valor"></div>

<!-- Com tipo específico (compra ou venda) -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-tipo="c"></div> <!-- c=compra, v=venda -->

<!-- Sem mostrar tipo (apenas o valor) -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-show-type="false"></div>
</script>
</pre>
               </div>
            </div>
            <!-- Exemplos Funcionais -->
            <div class="l">
               <div class="co6-g">
                  <h3>Modo Individual</h3>
                  <p>Uma cotação com visual destacado:</p>
                  <!-- Exemplo real funcionando -->
                  <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-auto="true" WfCotacao-interval="30000"></div>
                  <h5>Compra vs Venda:</h5>
                  <div style="display: flex; gap: 15px; margin: 15px 0">
                     <div>
                        <b>Compra:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="c" WfCotacao-mode="valor" WfCotacao-show-type="false"></div>
                     </div>
                     <div>
                        <b>Venda:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="v" WfCotacao-mode="valor" WfCotacao-show-type="false"></div>
                     </div>
                  </div>
               </div>
               <div class="co6-g">
                  <h3>Modo Tabela</h3>
                  <p>Múltiplas cotações em formato tabela:</p>

                  <!-- Exemplo real funcionando -->
                  <div class="wf-cotacao" WfCotacao-pares="USD-BRL,EUR-BRL,GBP-BRL" WfCotacao-auto="true" WfCotacao-interval="45000"></div>
               </div>
            </div>
            <div class="l">
               <div class="co4-g">
                  <h5>Modo Valor Puro</h5>
                  <p>Apenas o número, sem formatação:</p>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; text-align: center">
                     USD/BRL:
                     <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-mode="valor-puro" style="display: inline" WfCotacao-show-type="false"></div>
                  </div>
               </div>
               <div class="co4-g">
                  <h5>Modo Valor</h5>
                  <p>Valor com span para estilização:</p>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; text-align: center">
                     EUR/BRL:
                     <div class="wf-cotacao" WfCotacao-pares="EUR-BRL" WfCotacao-mode="valor" style="display: inline" WfCotacao-show-type="false"></div>
                  </div>
               </div>
               <div class="co4-g">
                  <h5>Sem Refresh</h5>
                  <p>Cotação sem botão de atualizar:</p>
                  <div class="wf-cotacao" WfCotacao-pares="GBP-BRL" WfCotacao-refresh="false"></div>
               </div>
            </div>
            <!-- Exemplos de Tipo -->
            <div class="l">
               <div class="co6-g">
                  <h3>Com Tipo (Compra/Venda)</h3>
                  <p>Mostrando claramente se é compra ou venda:</p>
                  <div style="display: flex; gap: 15px; margin: 15px 0">
                     <div>
                        <b>Compra:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="c" WfCotacao-show-type="true"></div>
                     </div>
                     <div>
                        <b>Venda:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="v" WfCotacao-show-type="true"></div>
                     </div>
                  </div>
               </div>

               <div class="co6-g">
                  <h3>Sem Tipo (Apenas Valor)</h3>
                  <p>Mostrando apenas o valor, sem "Compra" ou "Venda":</p>
                  <div style="display: flex; gap: 15px; margin: 15px 0">
                     <div class="wp100">
                        <b>Compra:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="c" WfCotacao-show-type="false"></div>
                     </div>
                     <div class="wp100">
                        <b>Venda:</b><br />
                        <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="v" WfCotacao-show-type="false"></div>
                     </div>
                  </div>
               </div>
            </div>
            <!-- Exemplos de Valor Puro -->
            <div class="l">
               <div class="co12-g">
                  <h3>💎 Valor Puro (Apenas o Número)</h3>
                  <p>Para usar apenas o valor em textos ou cálculos:</p>
               </div>
            </div>
            <div class="l">
               <div class="co4-g">
                  <h5>Valor Puro - Compra</h5>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; text-align: center">
                     O dólar está custando R$
                     <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="c" WfCotacao-mode="valor-puro" WfCotacao-show-type="false" style="display: inline"></div>
                     para compra.
                  </div>
               </div>

               <div class="co4-g">
                  <h5>Valor Puro - Venda</h5>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; text-align: center">
                     Para vender dólar: R$
                     <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="v" WfCotacao-mode="valor-puro" WfCotacao-show-type="false" style="display: inline"></div>
                  </div>
               </div>

               <div class="co4-g">
                  <h5>Valor com Span</h5>
                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; text-align: center">
                     <b>Dólar:</b>
                     <div class="wf-cotacao" WfCotacao-pares="USD-BRL" WfCotacao-tipo="c" WfCotacao-mode="valor" WfCotacao-show-type="false" style="display: inline"></div>
                  </div>
               </div>
            </div>

            <!-- Como Implementar Compra/Venda -->
            <div class="l">
               <div class="co12-g">
                  <h3><i class="wf wf-bulb Taler f20"></i> Como Implementar Compra/Venda</h3>
                  <p>O WfCotacao permite discriminar claramente entre valores de compra e venda usando dois atributos principais:</p>

                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00d12b">
                     <h3 style="margin-top: 0; color: #00d12b"><i class="wf wf-target"></i> Atributos para Compra/Venda:</h3>
                     <ul>
                        <li>
                           <b><code>WfCotacao-tipo</code>:</b> Define qual valor mostrar ("c"=compra, "v"=venda)
                        </li>
                        <li>
                           <b><code>WfCotacao-show-type</code>:</b> Controla se mostra o texto "Compra" ou "Venda"
                        </li>
                     </ul>
                  </div>
                  <div class="l">
                     <div class="co6-g">
                        <h3><i class="wf wf-clipboard Taler f20"></i> Exemplos Práticos:</h3>
                        <h5>1. Compra com Texto</h5>
                        <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Mostra: "USD/BRL: Compra 5,1234" -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-tipo="c"
     WfCotacao-show-type="true"></div>
</script></pre>
                        <p><b>Resultado:</b> Exibe o valor de compra com o texto "Compra"</p>
                     </div>

                     <div class="co6-g">
                        <h5>2. Venda com Texto</h5>
                        <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Mostra: "USD/BRL: Venda 5,1234" -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-tipo="v"
     WfCotacao-show-type="true"></div>
</script></pre>
                        <p><b>Resultado:</b> Exibe o valor de venda com o texto "Venda"</p>
                     </div>
                  </div>
                  <div class="l">
                     <div class="co6-g">
                        <h5>3. Compra sem Texto</h5>
                        <pre WfCode><script type="text/plain">
<!-- Mostra: "USD/BRL: 5,1234" -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-tipo="c"
     WfCotacao-show-type="false"></div>
</script></pre>
                        <p><b>Resultado:</b> Exibe apenas o valor de compra</p>
                     </div>

                     <div class="co6-g">
                        <h5>4. Venda sem Texto</h5>
                        <pre WfCode><script type="text/plain">
 <!-- Mostra: "USD/BRL: 5,1234" -->
 <div class="wf-cotacao"
      WfCotacao-pares="USD-BRL"
      WfCotacao-tipo="v"
      WfCotacao-show-type="false"></div>
 </script></pre>
                        <p><b>Resultado:</b> Exibe apenas o valor de venda</p>
                     </div>

                     <div class="co6-g">
                        <h5>5. Apenas o Valor (Sem Nome)</h5>
                        <pre WfCode><script type="text/plain">
 <!-- Mostra: "5,1234" (apenas o número) -->
 <div class="wf-cotacao"
      WfCotacao-pares="USD-BRL"
      WfCotacao-tipo="c"
      WfCotacao-mode="valor-puro"
      WfCotacao-show-type="false"></div>
 </script></pre>
                        <p><b>Resultado:</b> Exibe apenas o valor, sem "USD/BRL:" nem "Compra/Venda"</p>
                     </div>

                     <div class="co6-g">
                        <h5>6. Valor com Span (Sem Nome)</h5>
                        <pre WfCode><script type="text/plain">
 <!-- Mostra: "<span>5,1234</span>" -->
 <div class="wf-cotacao"
      WfCotacao-pares="USD-BRL"
      WfCotacao-tipo="v"
      WfCotacao-mode="valor"
      WfCotacao-show-type="false"></div>
 </script></pre>
                        <p><b>Resultado:</b> Exibe apenas o valor dentro de um span para estilização</p>
                     </div>
                  </div>

                  <!-- Casos de Uso -->
                  <div class="l">
                     <h3>🏦 Casos de Uso Práticos</h3>

                     <div class="co4-g">
                        <h5><i class="wf wf-bar-chart-2 Taler f20"></i> Comparação Compra/Venda</h5>
                        <pre WfCode><script type="text/plain">
<div style="display: flex; gap: 15px;">
   <div>
      <b>Compra:</b><br />
      <div class="wf-cotacao"
           WfCotacao-pares="USD-BRL"
           WfCotacao-tipo="c"
           WfCotacao-show-type="true"></div>
   </div>
   <div>
      <b>Venda:</b><br />
      <div class="wf-cotacao"
           WfCotacao-pares="USD-BRL"
           WfCotacao-tipo="v"
           WfCotacao-show-type="true"></div>
   </div>
</div>
</script></pre>
                     </div>

                     <div class="co4-g">
                        <h5>💰 Cálculo de Spread</h5>
                        <pre WfCode><script type="text/plain">
<div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
   <h6>Spread USD/BRL:</h6>
   <div class="wf-cotacao"
        WfCotacao-pares="USD-BRL"
        WfCotacao-tipo="c"
        WfCotacao-show-type="true"></div>
   <div class="wf-cotacao"
        WfCotacao-pares="USD-BRL"
        WfCotacao-tipo="v"
        WfCotacao-show-type="true"></div>
</div>
</script></pre>
                     </div>

                     <div class="co4-g">
                        <h5><i class="wf wf-trending-up Taler f20"></i> Dashboard Financeiro</h5>
                        <pre WfCode><script type="text/plain">
<div class="dashboard">
   <div class="card">
      <h6>Dólar Compra</h6>
      <div class="wf-cotacao"
           WfCotacao-pares="USD-BRL"
           WfCotacao-tipo="c"
           WfCotacao-show-type="false"></div>
   </div>
   <div class="card">
      <h6>Dólar Venda</h6>
      <div class="wf-cotacao"
           WfCotacao-pares="USD-BRL"
           WfCotacao-tipo="v"
           WfCotacao-show-type="false"></div>
   </div>
</div>
</script></pre>
                     </div>
                  </div>

                  <!-- Dicas Importantes -->
                  <div class="l">
                     <div class="co12-g">
                        <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800">
                           <h3 style="margin-top: 0"><i class="wf wf-bulb Taler f20"></i> Dicas Importantes:</h3>
                           <ul>
                              <li><b>Valor de Compra (bid):</b> Preço que o banco/casa de câmbio paga para comprar a moeda</li>
                              <li><b>Valor de Venda (ask):</b> Preço que o banco/casa de câmbio cobra para vender a moeda</li>
                              <li><b>Spread:</b> Diferença entre venda e compra (sempre venda > compra)</li>
                              <li><b>Padrão:</b> Se não especificar <code>WfCotacao-tipo</code>, mostra compra (bid)</li>
                              <li><b>Texto:</b> <code>WfCotacao-show-type="true"</code> adiciona "Compra"/"Venda" e nome da moeda</li>
                              <li><b>Valor Puro:</b> Use <code>WfCotacao-mode="valor-puro"</code> + <code>WfCotacao-show-type="false"</code> para apenas o número</li>
                           </ul>
                        </div>

                        <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00d12b">
                           <h3 style="margin-top: 0; color: #00d12b"><i class="wf wf-target Taler f20"></i> Como Usar Apenas o Valor:</h3>
                           <p><b>Para mostrar apenas o número da cotação (sem texto):</b></p>
                           <pre WfCode><script type="text/plain">
<!-- Combinação para valor puro -->
WfCotacao-mode="valor-puro" + WfCotacao-show-type="false"

<!-- Exemplo prático -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL"
     WfCotacao-tipo="c"
     WfCotacao-mode="valor-puro"
     WfCotacao-show-type="false"></div>

<!-- Resultado: apenas "5,1234" -->
</script></pre>
                           <p><b>Use quando:</b> Quiser integrar o valor em textos, fazer cálculos, ou usar em dashboards personalizados.</p>
                        </div>
                     </div>
                  </div>

                  <!-- Configurações -->
                  <div class="l">
                     <div class="co6-g">
                        <h3>Atributos de Configuração</h3>
                        <table class="tabela">
                           <thead>
                              <tr>
                                 <th>Atributo</th>
                                 <th>Valor</th>
                                 <th>Descrição</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td><code>WfCotacao-pares</code></td>
                                 <td>string</td>
                                 <td>Pares de moedas separados por vírgula (ex: "USD-BRL,EUR-BRL")</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-base</code></td>
                                 <td>string</td>
                                 <td>Moeda base (padrão: "BRL")</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-auto</code></td>
                                 <td>boolean</td>
                                 <td>Atualização automática (padrão: true)</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-interval</code></td>
                                 <td>number</td>
                                 <td>Intervalo em ms (padrão: 30000)</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-mode</code></td>
                                 <td>string</td>
                                 <td>"valor-puro", "valor" ou padrão (tabela/individual)</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-tipo</code></td>
                                 <td>string</td>
                                 <td>"c" (compra), "v" (venda) ou padrão (compra)</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-refresh</code></td>
                                 <td>boolean</td>
                                 <td>Mostrar botão de atualizar (padrão: true)</td>
                              </tr>
                              <tr>
                                 <td><code>WfCotacao-show-type</code></td>
                                 <td>boolean</td>
                                 <td>Mostrar "Compra"/"Venda" e nome da moeda (padrão: true)</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>

                     <div class="co6-g">
                        <h3>Modos de Exibição</h3>
                        <table class="tabela">
                           <thead>
                              <tr>
                                 <th>Modo</th>
                                 <th>Descrição</th>
                                 <th>Uso</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td><b>Padrão</b></td>
                                 <td>Tabela (múltiplos) ou individual (único)</td>
                                 <td>Exibição completa com formatação</td>
                              </tr>
                              <tr>
                                 <td><code>valor-puro</code></td>
                                 <td>Apenas o número da cotação</td>
                                 <td>Para integração em textos</td>
                              </tr>
                              <tr>
                                 <td><code>valor</code></td>
                                 <td>Valor dentro de um span</td>
                                 <td>Para estilização personalizada</td>
                              </tr>
                           </tbody>
                        </table>

                        <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0">
                           <h3><i class="wf wf-globe Taler f20"></i> API Utilizada</h3>
                           <p><b>AwesomeAPI:</b> economia.awesomeapi.com.br</p>
                           <ul>
                              <li><i class="wf wf-check-circle Taler f20"></i> Gratuita e sem necessidade de chave</li>
                              <li><i class="wf wf-check-circle Taler f20"></i> Dados em tempo real</li>
                              <li><i class="wf wf-check-circle Taler f20"></i> Suporte a múltiplas moedas</li>
                              <li><i class="wf wf-check-circle Taler f20"></i> Valores de compra e venda</li>
                              <li><i class="wf wf-check-circle Taler f20"></i> Variação percentual</li>
                           </ul>
                        </div>
                     </div>

                     <!-- API JavaScript -->
                     <div class="l">
                        <div class="co6-g">
                           <h3>API JavaScript</h3>
                           <p>Controle programático das cotações:</p>
                           <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicializar todas as cotações
WfCotacao.initAll();

// Inicializar em container específico
WfCotacao.initAll(document.querySelector('.meu-container'));

// Criar instância manual
const container = document.querySelector('.wf-cotacao');
const cotacao = new WfCotacao(container);

// Métodos da instância
cotacao.fetchAndRender();     // Atualizar agora
cotacao.startAutoUpdate();    // Iniciar auto-update
cotacao.stopAutoUpdate();     // Parar auto-update

// Configuração via JavaScript
const cotacao2 = new WfCotacao(container, {
  pares: ['USD-BRL', 'EUR-BRL'],
  auto: true,
  interval: 30000,
  mode: 'valor',
  tipo: 'c'
});
</script>
</pre>
                        </div>

                        <div class="co6-g">
                           <h3>Temas e Estilização</h3>
                           <p>O WfCotacao usa CSS Variables para temas:</p>
                           <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Variáveis CSS (modo claro) */
:root {
  --wfcotacao-bg: #fff;
  --wfcotacao-text: #222;
  --wfcotacao-border: #eee;
  --wfcotacao-header-bg: #f5f5f5;
  --wfcotacao-table-th: #222;
  --wfcotacao-up: #00d12b;
  --wfcotacao-down: #ff2222;
  --wfcotacao-btn-bg: #222;
  --wfcotacao-btn-text: #fff;
}

/* Modo escuro (WfDay) */
html.wfday-night {
  --wfcotacao-bg: #232b36;
  --wfcotacao-text: #e3e3e3;
  --wfcotacao-border: #2a3440;
  --wfcotacao-header-bg: #181c24;
  --wfcotacao-up: #00ff44;
  --wfcotacao-down: #ff4444;
  --wfcotacao-btn-bg: #181c24;
  --wfcotacao-btn-text: #ffe600;
}
</script></pre>
                        </div>
                     </div>

                     <!-- Lista Completa de Moedas -->
                     <div class="l">
                        <div class="co12-g">
                           <h3>Moedas Disponíveis</h3>
                           <p>Lista completa de pares de moedas suportados pela AwesomeAPI:</p>
                        </div>
                     </div>

                     <div class="l">
                        <div class="co3-g">
                           <h3>💰 Moedas Principais</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>USD-BRL</code> - Dólar Americano</li>
                              <li><code>EUR-BRL</code> - Euro</li>
                              <li><code>GBP-BRL</code> - Libra Esterlina</li>
                              <li><code>JPY-BRL</code> - Iene Japonês</li>
                              <li><code>CHF-BRL</code> - Franco Suíço</li>
                              <li><code>CAD-BRL</code> - Dólar Canadense</li>
                              <li><code>AUD-BRL</code> - Dólar Australiano</li>
                              <li><code>CNY-BRL</code> - Yuan Chinês</li>
                              <li><code>ARS-BRL</code> - Peso Argentino</li>
                              <li><code>ILS-BRL</code> - Novo Shekel Israelense</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3>₿ Criptomoedas</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>BTC-BRL</code> - Bitcoin</li>
                              <li><code>ETH-BRL</code> - Ethereum</li>
                              <li><code>LTC-BRL</code> - Litecoin</li>
                              <li><code>XRP-BRL</code> - XRP</li>
                              <li><code>DOGE-BRL</code> - Dogecoin</li>
                              <li><code>SOL-BRL</code> - Solana</li>
                              <li><code>BNB-BRL</code> - Binance Coin</li>
                              <li><code>BRETT-BRL</code> - Brett</li>
                           </ul>

                           <h3>🏆 Commodities</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>XAU-USD</code> - Ouro/Dólar</li>
                              <li><code>XAU-EUR</code> - Ouro/Euro</li>
                              <li><code>XAU-BRL</code> - Ouro/Real</li>
                              <li><code>XAG-USD</code> - Prata/Dólar</li>
                              <li><code>XAG-EUR</code> - Prata/Euro</li>
                              <li><code>XAG-BRL</code> - Prata/Real</li>
                              <li><code>XBR-USD</code> - Petróleo Brent</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3>🌎 América Latina</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>ARS-BRL</code> - Peso Argentino</li>
                              <li><code>CLP-BRL</code> - Peso Chileno</li>
                              <li><code>COP-BRL</code> - Peso Colombiano</li>
                              <li><code>PEN-BRL</code> - Sol Peruano</li>
                              <li><code>UYU-BRL</code> - Peso Uruguaio</li>
                              <li><code>PYG-BRL</code> - Guarani Paraguaio</li>
                              <li><code>BOB-BRL</code> - Boliviano</li>
                              <li><code>MXN-BRL</code> - Peso Mexicano</li>
                              <li><code>CRC-BRL</code> - Colón Costarriquenho</li>
                              <li><code>NIO-USD</code> - Córdoba Nicaraguense</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3><i class="wf wf-globe Taler f20"></i> Outras Regiões</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>RUB-BRL</code> - Rublo Russo</li>
                              <li><code>INR-BRL</code> - Rúpia Indiana</li>
                              <li><code>KRW-BRL</code> - Won Sul-Coreano</li>
                              <li><code>THB-BRL</code> - Baht Tailandês</li>
                              <li><code>SGD-BRL</code> - Dólar de Singapura</li>
                              <li><code>HKD-BRL</code> - Dólar de Hong Kong</li>
                              <li><code>TWD-BRL</code> - Dólar Taiwanês</li>
                              <li><code>ZAR-BRL</code> - Rand Sul-Africano</li>
                              <li><code>TRY-BRL</code> - Lira Turca</li>
                              <li><code>EGP-BRL</code> - Libra Egípcia</li>
                           </ul>
                        </div>
                     </div>

                     <!-- Mais Moedas -->
                     <div class="l">
                        <div class="co3-g">
                           <h3>🇪🇺 Europa</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>SEK-BRL</code> - Coroa Sueca</li>
                              <li><code>NOK-BRL</code> - Coroa Norueguesa</li>
                              <li><code>DKK-BRL</code> - Coroa Dinamarquesa</li>
                              <li><code>PLN-BRL</code> - Zlóti Polonês</li>
                              <li><code>HUF-BRL</code> - Florim Húngaro</li>
                              <li><code>CZK-BRL</code> - Coroa Checa</li>
                              <li><code>RON-BRL</code> - Leu Romeno</li>
                              <li><code>RSD-BRL</code> - Dinar Sérvio</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3>🏦 Pares Cruzados</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>EUR-USD</code> - Euro/Dólar</li>
                              <li><code>GBP-USD</code> - Libra/Dólar</li>
                              <li><code>USD-JPY</code> - Dólar/Iene</li>
                              <li><code>USD-CHF</code> - Dólar/Franco</li>
                              <li><code>AUD-USD</code> - Dólar Australiano/USD</li>
                              <li><code>NZD-USD</code> - Dólar Neozelandês/USD</li>
                              <li><code>EUR-GBP</code> - Euro/Libra</li>
                              <li><code>GBP-JPY</code> - Libra/Iene</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3>🌏 Ásia & Oriente Médio</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>SAR-BRL</code> - Riyal Saudita</li>
                              <li><code>AED-BRL</code> - Dirham dos Emirados</li>
                              <li><code>JOD-USD</code> - Dinar Jordaniano</li>
                              <li><code>KWD-USD</code> - Dinar Kuwaitiano</li>
                              <li><code>PHP-BRL</code> - Peso Filipino</li>
                              <li><code>MYR-USD</code> - Ringgit Malaio</li>
                              <li><code>IDR-USD</code> - Rupia Indonésia</li>
                              <li><code>VND-USD</code> - Dong Vietnamita</li>
                           </ul>
                        </div>

                        <div class="co3-g">
                           <h3><i class="wf wf-refresh-cw Taler f20"></i> Turismo</h3>
                           <ul style="font-size: 14px; line-height: 1.6">
                              <li><code>USD-BRLT</code> - Dólar Turismo</li>
                              <li><code>EUR-BRLT</code> - Euro Turismo</li>
                              <li><code>USD-BRLPTAX</code> - Dólar PTAX</li>
                              <li><code>EUR-BRLPTAX</code> - Euro PTAX</li>
                              <li><code>GBP-BRLPTAX</code> - Libra PTAX</li>
                              <li><code>JPY-BRLPTAX</code> - Iene PTAX</li>
                              <li><code>CHF-BRLPTAX</code> - Franco PTAX</li>
                              <li><code>CAD-BRLPTAX</code> - Dólar Canadense PTAX</li>
                           </ul>
                        </div>
                     </div>

                     <!-- Dica de Uso -->
                     <div class="l">
                        <div class="co12-g">
                           <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800">
                              <h3 style="margin-top: 0"><i class="wf wf-bulb Taler f20"></i> Como usar qualquer par de moedas:</h3>
                              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Exemplo com múltiplas moedas -->
<div class="wf-cotacao"
     WfCotacao-pares="USD-BRL,EUR-BRL,BTC-BRL,XAU-USD"
     WfCotacao-auto="true"
     WfCotacao-interval="60000"></div>

<!-- Exemplo com criptomoedas -->
<div class="wf-cotacao"
     WfCotacao-pares="BTC-BRL,ETH-BRL,SOL-BRL,BNB-BRL"></div>

<!-- Exemplo com commodities -->
<div class="wf-cotacao"
     WfCotacao-pares="XAU-BRL,XAG-BRL,XBR-USD"></div>
</script></pre>
                              <p><b>Total:</b> Mais de 200 pares de moedas disponíveis na AwesomeAPI!</p>
                           </div>
                        </div>
                     </div>

                     <!-- Resumo -->
                     <div class="l">
                        <div class="co12-g">
                           <h3>Resumo</h3>
                           <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0">
                              <h3 style="margin-top: 0"><i class="wf wf-check-circle Taler f20"></i> Características do WfCotacao</h3>
                              <ul>
                                 <li><b><i class="wf wf-globe Taler f20"></i> AwesomeAPI:</b> Integração com API gratuita e confiável</li>
                                 <li><b><i class="wf wf-dollar-sign Taler f20"></i> +200 Pares:</b> Moedas, criptos, commodities disponíveis</li>
                                 <li><b><i class="wf wf-bar-chart-2 Taler f20"></i> Modos Flexíveis:</b> Tabela, individual, valor puro</li>
                                 <li><b><i class="wf wf-refresh-cw Taler f20"></i> Auto-Update:</b> Atualização automática configurável</li>
                                 <li><b><i class="wf wf-trending-up Taler f20"></i> Indicadores Visuais:</b> Cores para alta/baixa</li>
                                 <li><b><i class="wf wf-palette Taler f20"></i> Temas Integrados:</b> Suporte completo ao WfDay</li>
                                 <li><b><i class="wf wf-cog Taler f20"></i> Configurável:</b> 7 atributos de personalização</li>
                                 <li><b><i class="wf wf-smartphone Taler f20"></i> Responsivo:</b> Layout adaptável</li>
                                 <li><b><i class="wf wf-wrench Taler f20"></i> API Simples:</b> WfCotacao.initAll()</li>
                                 <li><b><i class="wf wf-bulb Taler f20"></i> Plug & Play:</b> Adicione a classe e funciona</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>

   <!-- Carregamento do WebFull Framework -->
   <script>
      // Inicializar WfCotacao quando a página carregar
      document.addEventListener('DOMContentLoaded', function() {
         console.log('DOM carregado, iniciando verificações...');

         // Verificar se há elementos .wf-cotacao na página
         const elementos = document.querySelectorAll('.wf-cotacao');
         console.log(`Encontrados ${elementos.length} elementos .wf-cotacao`);

         // Aguardar um pouco para garantir que o componente foi carregado
         setTimeout(function() {
            if (window.WfCotacao) {
               console.log('WfCotacao encontrado, inicializando...');
               const instancias = WfCotacao.initAll();
               console.log(`WfCotacao inicializado com sucesso! ${instancias.length} instâncias criadas.`);

               // Verificar se os elementos foram inicializados
               elementos.forEach((el, index) => {
                  if (el._swcotacaoInitialized) {
                     console.log(`Elemento ${index + 1} inicializado com sucesso`);
                  } else {
                     console.warn(`Elemento ${index + 1} NÃO foi inicializado`);
                  }
               });
            } else {
               console.warn('WfCotacao não encontrado. Tentando novamente...');
               // Tentar novamente após mais um tempo
               setTimeout(function() {
                  if (window.WfCotacao) {
                     console.log('WfCotacao encontrado na segunda tentativa, inicializando...');
                     const instancias = WfCotacao.initAll();
                     console.log(`WfCotacao inicializado com sucesso (segunda tentativa)! ${instancias.length} instâncias criadas.`);
                  } else {
                     console.error('WfCotacao não pôde ser carregado.');
                  }
               }, 1000);
            }
         }, 500);
      });
   </script>