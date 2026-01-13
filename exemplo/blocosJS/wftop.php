<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfTop</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfTop</li>
        </ol>
      </nav>
    </div>
    <div class="wf-bg-oco">
      <section class="swtopx">
        <div class="g-xg">
          <!-- Cabeçalho do Componente -->
          <div class="l">
            <div class="co12-g">
              <h3>[Voltar ao Topo]</h3>
              <p>
                O <b>WfTop</b> é um componente elegante de "voltar ao
                topo". Oferece botão flutuante inteligente, múltiplas posições,
                animações suaves, detecção automática de scroll, personalização
                completa e integração total com o sistema de temas WfDay.
              </p>
              <div
                style="
              background: var(--wf-bg-);
              border: 1px solid #4caf50;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
                <b><i class="wf wf-refresh Taler f20"></i> SCROLL:</b>
                Botão flutuante para voltar ao topo da página<br />
                <b><i class="wf wf-brain Taler f20"></i> INTELIGENTE:</b>
                Aparece automaticamente após scroll<br />
                <b><i class="wf wf-palette Taler f20"></i> PERSONALIZÁVEL:</b>
                Múltiplas posições e estilos
              </div>
            </div>
          </div>

          <!-- Uso Básico -->
          <div class="l">
            <div class="co6-g">
              <h3>Uso Básico</h3>
              <p>
                Para adicionar o botão "voltar ao topo", use o atributo
                <code>WfTop</code>:
              </p>
              <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Botão básico (aparece automaticamente) -->

<div WfTop></div>

<!-- Botão personalizado -->

<button WfTop WfTop-position="left">
    Voltar ao Topo
</button>

<!-- Com configurações avançadas -->

<div WfTop
     WfTop-position="right"
     WfTop-offset="100"
     WfTop-duration="800">
</div>

<!-- Botão com todas as configurações -->

<div WfTop
     WfTop-position="left"
     WfTop-offset="500"
     WfTop-duration="1200"
     style="background: #007bff; color: white;">
</div>

</script></pre>
            </div>
            <div class="co6-g">
              <h3>Exemplo Funcionando</h3>
              <p>Role a página para baixo para ver o botão aparecer:</p>

              <!-- Botão WfTop ativo -->
              <div WfTop WfTop-position="right" WfTop-offset="200"></div>

              <div
                style="
              background: var(--wf-bg-);
              border: 1px solid #dee2e6;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            ">
                <h3>
                  <i class="wf wf-refresh Taler f20"></i> Conteúdo para Demonstração
                </h3>
                <p>
                  Role a página para baixo para ver o botão "voltar ao topo"
                  aparecer no canto inferior direito.
                </p>

                <div
                  style="
                height: 200px;
                background: linear-gradient(45deg, #e3f2fd, #f3e5f5);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px 0;
              ">
                  <div style="text-align: center">
                    <h3 style="color: var(--wf-color)">
                      <i class="wf wf-refresh Taler f20"></i> Área de Demonstração
                    </h3>
                    <p style="color: var(--wf-color)">
                      Continue rolando para baixo...
                    </p>
                  </div>
                </div>

                <div
                  style="
                height: 200px;
                background: linear-gradient(45deg, #e8f5e8, #fff3e0);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px 0;
              ">
                  <div style="text-align: center">
                    <h3 style="color: var(--wf-color)">
                      <i class="wf wf-refresh Taler f20"></i> Mais Conteúdo
                    </h3>
                    <p style="color: var(--wf-color)">
                      O botão deve aparecer agora!
                    </p>
                  </div>
                </div>

                <div
                  style="
                height: 200px;
                background: linear-gradient(45deg, #fff3e0, #fce4ec);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px 0;
              ">
                  <div style="text-align: center">
                    <h3 style="color: var(--wf-color)">
                      <i class="wf wf-refresh Taler f20"></i> Clique no Botão
                    </h3>
                    <p style="color: var(--wf-color)">
                      Use o botão flutuante para voltar ao topo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Posicionamento -->
          <div class="l">
            <div class="co6-g">
              <h3>Posições Disponíveis</h3>
              <p>
                O WfTop oferece posicionamento personalizável usando CSS ou
                atributos:
              </p>
              <tawf-bg-e class="tabela">
                <thead>
                  <tr>
                    <th>Propriedade</th>
                    <th>Atributo</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>Posição</code></td>
                    <td>Via CSS</td>
                    <td>bottom: 20px; right: 20px; (padrão)</td>
                  </tr>
                  <tr>
                    <td><code>Tamanho</code></td>
                    <td>Via CSS</td>
                    <td>width: 40px; height: 40px;</td>
                  </tr>
                  <tr>
                    <td><code>Cores</code></td>
                    <td>Via CSS Variawf-bg-es</td>
                    <td>--wftop-bg, --wftop-color</td>
                  </tr>
                  <tr>
                    <td><code>Raio</code></td>
                    <td>Via CSS Variawf-bg-es</td>
                    <td>--swtop-radius (padrão: 50%)</td>
                  </tr>
                </tbody>
              </tawf-bg-e>
            </div>
            <div class="co6-g">
              <h3>Configurações Avançadas</h3>
              <tawf-bg-e class="tabela">
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>WfTop-offset</code></td>
                    <td>100-1000px</td>
                    <td>Pixels de scroll para aparecer (padrão: 300px)</td>
                  </tr>
                  <tr>
                    <td><code>WfTop-smooth</code></td>
                    <td>true/false</td>
                    <td>Scroll suave (padrão: true)</td>
                  </tr>
                  <tr>
                    <td><code>WfTop-duration</code></td>
                    <td>300-2000ms</td>
                    <td>Duração da animação (padrão: 800ms)</td>
                  </tr>
                  <tr>
                    <td><code>WfTop-hide-delay</code></td>
                    <td>1000-5000ms</td>
                    <td>Tempo para esconder após parar scroll</td>
                  </tr>
                </tbody>
              </tawf-bg-e>

              <div
                style="
              background: var(--wf-bg-);
              padding: 10px;
              border-radius: 4px;
              margin: 10px 0;
            ">
                <small><b><i class="wf wf-lightbulb Taler f20"></i> Dica:</b>
                  O botão aparece automaticamente quando você rola a página para
                  baixo e desaparece quando volta ao topo!</small>
              </div>
            </div>
          </div>

          <!-- Personalização -->
          <div class="l">
            <div class="co6-g">
              <h3>Estilos Personalizados</h3>
              <p>Você pode personalizar a aparência do botão com CSS:</p>
              <pre WfCode WfCode-lang="css"><script type="text/plain">
/* Personalizar o botão WfTop */
.swtop-button {
  background: linear-gradient(45deg, #007bff, #28a745);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.swtop-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

/* Posição personalizada */
.swtop-custom {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
        </script></pre>
            </div>
            <div class="co6-g">
              <h3>Integração com WfDay</h3>
              <p>O WfTop se adapta automaticamente ao tema claro/escuro:</p>
              <div
                style="
              background: var(--wf-bg-);
              padding: 15px;
              border-radius: 4px;
              margin: 10px 0;
            ">
                <h3>
                  <i class="wf wf-refresh wdest2-bg f20"></i> Exemplo de Uso
                  Avançado
                </h3>
                <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Botão com todas as configurações -->
<div WfTop
     WfTop-position="left"
     WfTop-offset="500"
     WfTop-smooth="true"
     WfTop-duration="1200"
     WfTop-hide-delay="3000"
     style="background: #007bff; color: white;">
  🔼
</div>
          </script></pre>
              </div>
            </div>
          </div>

          <!-- Resumo -->
          <div class="l">
            <div class="co12-g">
              <h3>Resumo</h3>
              <div
                style="
              background: var(--wf-bg-);
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #28a745;
            ">
                <h3 style="margin-top: 0">
                  <i class="wf wf-refresh Taler f20"></i> Características do WfTop
                </h3>
                <ul>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> Scroll
                      Inteligente:</b>
                    Aparece automaticamente após scroll definido
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> 4 Posições:</b>
                    Right, left, center e custom
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> Animação
                      Suave:</b>
                    Scroll suave até o topo da página
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> Configurável:</b>
                    Offset, duração e delay personalizáveis
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> Temas
                      Adaptativos:</b>
                    Integração total com WfDay
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> Responsivo:</b>
                    Funciona perfeitamente em dispositivos móveis
                  </li>
                  <li>
                    <b><i class="wf wf-zap Taler f20"></i> Leve:</b>
                    Código otimizado e performático
                  </li>
                  <li>
                    <b><i class="wf wf-refresh Taler f20"></i> AJAX Ready:</b>
                    Funciona em conteúdo carregado dinamicamente
                  </li>
                </ul>
              </div>

              <div
                style="
              background: var(--wf-bg-);
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            ">
                <b><i class="wf wf-lightbulb Taler f20"></i> Nota:</b> O
                WfTop é especialmente útil em páginas longas, documentações e sites
                com muito conteúdo. Melhora significativamente a experiência do
                usuário!
              </div>
            </div>
          </div>
        </div>
      </section>
      <div WfTop WfTop-position="left"></div>
</section>