<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfAlert</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfAlert</li>
        </ol>
      </nav>
    </div>
<section class="swalertx">
      <div class="g-xg">
         <!-- Cabeçalho do Componente -->
         <div class="l">
            <div class="co12-g">
               <h3>[Sistema de Alertas]</h3>
               <p>
                  O <b>WfAlert</b> é o sistema oficial de alertas do WEBFULL Framework. Oferece 7 tipos de alerta, 9 posições diferentes na tela, animações suaves e
                  integração perfeita com o sistema AJAX.
               </p>
               <div style="background: var(--wf-bg-); border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color);">
                  <b><i class="wf wf-fast-forward-circle Taler f20"></i> IMPORTANTE:</b> Este é o sistema de alertas OFICIAL do WEBFULL!<br />
                  <b><i class="wf wf-x Taler f20"></i> NUNCA</b> use alert() simples do JavaScript<br />
                  <b><i class="wf wf-check Taler f20"></i> SEMPRE</b> use WfAlert para consistência e UX superior
               </div>
               <div style="background: var(--wf-bg-); border: 1px solid #2196f3; padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color);">
                  <b><i class="wf wf-target-lock Taler f20"></i> 9 POSIÇÕES:</b> Top, center, bottom combinados com left, center, right<br />
                  <b><i class="wf wf-palette Taler f20"></i> 7 TIPOS:</b> Sucesso, erro, alerta, info, ativado, desativado, base<br />
                  <b><i class="wf wf-video Taler f20"></i> ANIMAÇÕES:</b> Transições suaves para cada posição<br />
                  <b><i class="wf wf-mobile Taler f20"></i> RESPONSIVO:</b> Adaptação perfeita para mobile<br />
                  <b><i class="wf wf-globe Taler f20"></i> DUAL LANGUAGE:</b> Métodos em português e inglês
               </div>
            </div>
         </div>

         <!-- Uso Básico -->
         <div class="l">
            <div class="co6-g">
               <h3>Uso Básico</h3>
               <p>O WfAlert oferece métodos simples para diferentes tipos de alerta:</p>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Alertas básicos (português)
WfAlert.sucesso('Operação realizada com sucesso!');
WfAlert.erro('Erro ao processar solicitação!');
WfAlert.alerta('Atenção: Verifique os dados!');
WfAlert.infor('Informação importante para o usuário.');

// Alertas básicos (inglês - aliases)
WfAlert.success('Operation completed successfully!');
WfAlert.error('Error processing request!');
WfAlert.warning('Warning: Check the data!');
WfAlert.info('Important information for user.');

// Confirmação com callback
WfAlert.confirmar('Deseja continuar?', function(resultado) {
  if (resultado) {
    console.log('Usuário confirmou');
  }
});
</script>
</pre>
            </div>
            <div class="co6-g">
               <h3>Teste os Alertas</h3>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0">
                  <button onclick="WfAlert.sucesso('Sucesso! Operação concluída.')" class="btn btn-suce">Sucesso</button>
                  <button onclick="WfAlert.erro('Erro! Algo deu errado.')" class="btn btn-peri">Erro</button>
                  <button onclick="WfAlert.infor('Informação importante!')" class="btn btn-info">Informação</button>
                  <button onclick="WfAlert.alerta('Atenção necessária!')" class="btn btn-aler">Alerta</button>
               </div>
               <button onclick="WfAlert.confirmar('Deseja continuar com esta ação?', function(resultado){
                  if (resultado === true) {
                     WfAlert.sucesso('Ação confirmada!');
                  } else {
                     WfAlert.erro('Ação cancelada!');
                  }
               })" class="btn btn-prin" style="width: 100%; margin: 8px 0">
                  Confirmação
               </button>
               <button onclick="WfAlert.ativado('Recurso ativado!')" class="btn btn-notu" style="width: 100%; margin: 8px 0">Ativado</button>
               <button onclick="WfAlert.desativado('Recurso desativado!')" class="btn btn-clar" style="width: 100%; margin: 8px 0">Desativado</button>
            </div>
         </div>

         <!-- Posições -->
         <div class="l">
            <div class="co12-g">
               <h3>Posições Disponíveis</h3>
               <p>O WfAlert suporta 9 posições diferentes na tela. Teste cada posição:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Posições - Top</h3>
               <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0">
                  <button onclick="WfAlert.sucesso('Top-Left!', 3000, 'topLeft')" class="btn btn-suce">topLeft</button>
                  <button onclick="WfAlert.erro('Top-Center!', 3000, 'topCenter')" class="btn btn-peri">topCenter</button>
                  <button onclick="WfAlert.alerta('Top-Right!', 3000, 'topRight')" class="btn btn-aler">topRight</button>
               </div>
            </div>
            <div class="co6-g">
               <h3>Posições - Center</h3>
               <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0">
                  <button onclick="WfAlert.infor('Center-Left!', 3000, 'centerLeft')" class="btn btn-info">centerLeft</button>
                  <button onclick="WfAlert.sucesso('Center!', 3000, 'center')" class="btn btn-suce">center</button>
                  <button onclick="WfAlert.erro('Center-Right!', 3000, 'centerRight')" class="btn btn-peri">centerRight</button>
               </div>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Posições - Bottom</h3>
               <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0">
                  <button onclick="WfAlert.ativado('Bottom-Left!', 3000, 'bottomLeft')" class="btn btn-notu">bottomLeft</button>
                  <button onclick="WfAlert.desativado('Bottom-Center!', 3000, 'bottomCenter')" class="btn btn-clar">bottomCenter</button>
                  <button onclick="WfAlert.base('Bottom-Right!', 3000, 'bottomRight')" class="btn btn-secu">bottomRight</button>
               </div>
            </div>
            <div class="co6-g">
               <h3>Grid de Posições</h3>
               <pre WfCode WfCode-lang="text"><script type="text/plain">
┌─────────────┬─────────────┬─────────────┐
│  topLeft    │ topCenter   │  topRight   │
├─────────────┼─────────────┼─────────────┤
│centerLeft   │   center    │centerRight  │
├─────────────┼─────────────┼─────────────┤
│bottomLeft   │bottomCenter │bottomRight  │
└─────────────┴─────────────┴─────────────┘
</script>
</pre>
            </div>
         </div>

         <!-- Tipos de Alerta -->
         <div class="l">
            <div class="co12-g">
               <h3>Tipos de Alerta</h3>
               <p>O WfAlert oferece 7 tipos diferentes de alerta, cada um com cor e ícone específicos:</p>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Alertas Principais</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Método</th>
                        <th>Uso</th>
                        <th>Cor</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfAlert.sucesso()</code></td>
                        <td>Operações bem-sucedidas</td>
                        <td style="background: #43a047; color: white">Verde</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.erro()</code></td>
                        <td>Erros e falhas</td>
                        <td style="background: #e53935; color: white">Vermelho</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.infor()</code></td>
                        <td>Informações gerais</td>
                        <td style="background: #0380e6; color: white">Azul</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.alerta()</code></td>
                        <td>Avisos importantes</td>
                        <td style="background: #ff9100; color: white">Laranja</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="co6-g">
               <h3>Alertas Especiais</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Método</th>
                        <th>Uso</th>
                        <th>Cor</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfAlert.ativado()</code></td>
                        <td>Recursos ativados</td>
                        <td style="background: #188a34; color: white">Verde Escuro</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.desativado()</code></td>
                        <td>Recursos desativados</td>
                        <td style="background: #910000; color: white">Vermelho Escuro</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.base()</code></td>
                        <td>Alerta padrão</td>
                        <td style="background: #666; color: white">Cinza</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.confirmar()</code></td>
                        <td>Confirmações</td>
                        <td style="background: #333; color: white">Dialog</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         <!-- Diálogos de Confirmação -->
         <div class="l">
            <div class="co12-g">
               <h3>Diálogos de Confirmação</h3>
               <p>O WfAlert oferece um sistema robusto de confirmação com callback para ações importantes:</p>
            </div>
         </div>

         <div class="l">
            <div class="co12-g">
               <h3>Uso Básico</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Confirmação simples
WfAlert.confirmar('Deseja continuar?', function(resultado) {
  if (resultado === true) {
    console.log('Usuário confirmou');
    // Executar ação
  } else {
    console.log('Usuário cancelou');
    // Não executar ação
  }
});
</script></pre>
            </div>
         </div>

         <div class="l">
            <div class="co12-g">
               <h3>Casos de Uso Comuns</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Confirmação de exclusão
WfAlert.confirmar('Deseja excluir este item?', function(resultado) {
  if (resultado) {
    // Usuário confirmou - excluir item
    excluirItem();
    WfAlert.sucesso('Item excluído!', 2000, 'center');
  } else {
    // Usuário cancelou
    WfAlert.infor('Operação cancelada', 2000, 'center');
  }
});

// Confirmação de saída sem salvar
WfAlert.confirmar('Deseja sair sem salvar as alterações?', function(resultado) {
  if (resultado) {
    // Usuário confirmou - sair sem salvar
    window.location.href = '/dashboard';
  } else {
    // Usuário cancelou - permanecer na página
    WfAlert.sucesso('Continue editando...', 2000, 'topCenter');
  }
});
</script></pre>
            </div>
         </div>

         <!-- Configurações Avançadas -->
         <div class="l">
            <div class="co12-g">
               <h3>Configurações Avançadas</h3>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Sintaxe Completa</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Formato: WfAlert.tipo(mensagem, duração, posição)
WfAlert.sucesso('Mensagem de sucesso!', 5000, 'center');
WfAlert.erro('Erro crítico!', 8000, 'topCenter');
WfAlert.alerta('Atenção!', 3000, 'bottomRight');

// Parâmetros:
// 1. mensagem (string) - Texto do alerta
// 2. duração (number) - Tempo em ms (opcional, padrão: 3000)
// 3. posição (string) - Posição na tela (opcional, padrão: 'topRight')
</script>
</pre>
            </div>
            <div class="co6-g">
               <h3>Métodos Utilitários</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Método genérico
WfAlert.show('Mensagem personalizada', 'sucesso', 3000, 'center');

// Limpar todos os alertas
WfAlert.clearAll();

// Confirmação com callback
WfAlert.confirmar('Deseja excluir?', function(resultado) {
  if (resultado) {
    WfAlert.sucesso('Item excluído!', 2000, 'center');
  } else {
    WfAlert.infor('Operação cancelada', 2000, 'center');
  }
});
</script>
</pre>
            </div>
         </div>



         <!-- Casos de Uso -->
         <div class="l">
            <div class="co12-g">
               <h3>Casos de Uso</h3>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Feedback de Formulários</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Validação de formulário
function validarFormulario() {
  if (!nome) {
    WfAlert.erro('Nome é obrigatório!', 3000, 'topCenter');
    return false;
  }

  if (!email) {
    WfAlert.erro('Email é obrigatório!', 3000, 'topCenter');
    return false;
  }

  WfAlert.sucesso('Formulário válido!', 2000, 'center');
  return true;
}
</script>
</pre>
            </div>
            <div class="co6-g">
               <h3>Status de Operações</h3>
               <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Sistema de login
function fazerLogin() {
  if (loginValido) {
    WfAlert.sucesso('Login realizado!', 3000, 'center');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);
  } else {
    WfAlert.erro('Usuário ou senha incorretos!', 3000, 'topCenter');
  }
}

// Upload de arquivo
function uploadArquivo() {
  WfAlert.infor('Iniciando upload...', 2000, 'topRight');
  setTimeout(() => {
    WfAlert.sucesso('Arquivo enviado!', 3000, 'topRight');
  }, 2000);
}
</script>
</pre>
            </div>
         </div>

         <!-- Métodos JavaScript -->
         <div class="l">
            <div class="co12-g">
               <h3>Métodos JavaScript</h3>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Métodos em Português</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Método</th>
                        <th>Descrição</th>
                        <th>Parâmetros</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfAlert.sucesso()</code></td>
                        <td>Alerta de sucesso</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.erro()</code></td>
                        <td>Alerta de erro</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.alerta()</code></td>
                        <td>Alerta de aviso</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.infor()</code></td>
                        <td>Alerta de informação</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.ativado()</code></td>
                        <td>Alerta de ativado</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.desativado()</code></td>
                        <td>Alerta de desativado</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.base()</code></td>
                        <td>Alerta base</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="co6-g">
               <h3>Métodos em Inglês</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Método</th>
                        <th>Descrição</th>
                        <th>Parâmetros</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfAlert.success()</code></td>
                        <td>Success alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.error()</code></td>
                        <td>Error alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.warning()</code></td>
                        <td>Warning alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.info()</code></td>
                        <td>Info alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.activated()</code></td>
                        <td>Activated alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.deactivated()</code></td>
                        <td>Deactivated alert</td>
                        <td>(msg, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.confirmar()</code></td>
                        <td>Confirmation dialog</td>
                        <td>(msg, callback)</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <!-- Posições Disponíveis -->
         <div class="l">
            <div class="co12-g">
               <h3>Posições Disponíveis</h3>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Posições - Top</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Posição</th>
                        <th>Descrição</th>
                        <th>Animação</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>topLeft</code></td>
                        <td>Canto superior esquerdo</td>
                        <td>Desliza da esquerda</td>
                     </tr>
                     <tr>
                        <td><code>topCenter</code></td>
                        <td>Topo centralizado</td>
                        <td>Desliza de cima</td>
                     </tr>
                     <tr>
                        <td><code>topRight</code></td>
                        <td>Canto superior direito</td>
                        <td>Desliza da direita</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="co6-g">
               <h3>Posições - Center</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Posição</th>
                        <th>Descrição</th>
                        <th>Animação</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>centerLeft</code></td>
                        <td>Centro esquerdo</td>
                        <td>Desliza da esquerda</td>
                     </tr>
                     <tr>
                        <td><code>center</code></td>
                        <td>Centro da tela</td>
                        <td>Zoom</td>
                     </tr>
                     <tr>
                        <td><code>centerRight</code></td>
                        <td>Centro direito</td>
                        <td>Desliza da direita</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <div class="l">
            <div class="co6-g">
               <h3>Posições - Bottom</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Posição</th>
                        <th>Descrição</th>
                        <th>Animação</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>bottomLeft</code></td>
                        <td>Canto inferior esquerdo</td>
                        <td>Desliza da esquerda</td>
                     </tr>
                     <tr>
                        <td><code>bottomCenter</code></td>
                        <td>Baixo centralizado</td>
                        <td>Desliza de baixo</td>
                     </tr>
                     <tr>
                        <td><code>bottomRight</code></td>
                        <td>Canto inferior direito</td>
                        <td>Desliza da direita</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="co6-g">
               <h3>Métodos Utilitários</h3>
               <table class="tabela">
                  <thead>
                     <tr>
                        <th>Método</th>
                        <th>Descrição</th>
                        <th>Parâmetros</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td><code>WfAlert.show()</code></td>
                        <td>Método genérico</td>
                        <td>(msg, type, dur, pos)</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.clearAll()</code></td>
                        <td>Limpar todos os alertas</td>
                        <td>()</td>
                     </tr>
                     <tr>
                        <td><code>WfAlert.confirmar()</code></td>
                        <td>Dialog de confirmação</td>
                        <td>(msg, callback)</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <!-- Resumo e Conclusão -->
         <div class="l">
            <div class="co12-g">
               <h3>Resumo</h3>
               <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; color: var(--wf-color)">
                  <h3 style="margin-top: 0"><i class="wf wf-check Taler f20"></i> Características do WfAlert</h3>
                  <ul>
                     <li><b><i class="wf wf-fast-forward-circle  Taler f20"></i> 9 Posições:</b> Top, center, bottom combinados com left, center, right</li>
                     <li><b><i class="wf wf-palette Taler f20"></i> 7 Tipos:</b> Sucesso, erro, alerta, info, ativado, desativado, base</li>
                     <li><b><i class="wf wf-video Taler f20"></i> Animações Suaves:</b> Transições CSS otimizadas para cada posição</li>
                     <li><b><i class="wf wf-mobile Taler f20"></i> Responsivo:</b> Adaptação perfeita para mobile e desktop</li>
                     <li><b><i class="wf wf-globe Taler f20"></i> Dual Language:</b> Métodos em português e inglês</li>
                     <li><b><i class="wf wf-refresh Taler f20"></i> AJAX Ready:</b> Funciona automaticamente em conteúdo dinâmico</li>
                     <li><b><i class="wf wf-bolt-circle Taler f20"></i> Performance:</b> CSS integrado, zero dependências externas</li>
                     <li><b><i class="wf wf-wrench Taler f20"></i> Flexível:</b> Múltiplos alertas simultâneos</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<script>
   // Funções de teste para WfAlert - Definidas no escopo global
   window.testarMultiplos = function () {
      console.log('[WfAlert] Testando múltiplos alertas...');

      // Testar todas as 9 posições simultaneamente
      WfAlert.sucesso('Top-Left!', 4000, 'topLeft');
      WfAlert.erro('Top-Center!', 4000, 'topCenter');
      WfAlert.alerta('Top-Right!', 4000, 'topRight');

      WfAlert.infor('Center-Left!', 4000, 'centerLeft');
      WfAlert.ativado('Center!', 4000, 'center');
      WfAlert.desativado('Center-Right!', 4000, 'centerRight');

      WfAlert.base('Bottom-Left!', 4000, 'bottomLeft');
      WfAlert.sucesso('Bottom-Center!', 4000, 'bottomCenter');
      WfAlert.erro('Bottom-Right!', 4000, 'bottomRight');
   };

   window.testarCantos = function () {
      console.log('[WfAlert] Testando cantos...');

      // Testar apenas os 4 cantos
      WfAlert.sucesso('Canto Superior Esquerdo!', 3000, 'topLeft');
      WfAlert.erro('Canto Superior Direito!', 3000, 'topRight');
      WfAlert.infor('Canto Inferior Esquerdo!', 3000, 'bottomLeft');
      WfAlert.alerta('Canto Inferior Direito!', 3000, 'bottomRight');
   };

   // Funções de teste para confirmação
   window.testarConfirmacaoSimples = function () {
      console.log('[WfAlert] Testando confirmação simples...');

      WfAlert.confirmar('Deseja continuar com esta ação?', function (resultado) {
         console.log('[WfAlert] Resultado da confirmação:', resultado, typeof resultado);

         // SOLUÇÃO DIRETA - Criar o elemento se não existir
         let resultadoDiv = document.getElementById('resultadoConfirmacao');

         if (!resultadoDiv) {
            console.log('[WfAlert] Elemento não encontrado, criando...');
            resultadoDiv = document.createElement('div');
            resultadoDiv.id = 'resultadoConfirmacao';
            resultadoDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; display: block;';

            // SOLUÇÃO SIMPLES - Inserir após o botão
            const botao = document.querySelector('button[onclick*="testarConfirmacaoSimples"]');
            if (botao && botao.parentNode) {
               botao.parentNode.appendChild(resultadoDiv);
            } else {
               document.body.appendChild(resultadoDiv);
            }
         }

         resultadoDiv.style.display = 'block';

         if (resultado === true) {
            resultadoDiv.style.background = '#d4edda';
            resultadoDiv.style.color = '#155724';
            resultadoDiv.innerHTML = '<i class="wf wf-check-circle"></i> CONFIRMADO: Usuário clicou em "Sim"';
            console.log('[WfAlert] <i class="wf wf-check-circle"></i> Mostrando resultado: CONFIRMADO');
         } else if (resultado === false) {
            resultadoDiv.style.background = '#f8d7da';
            resultadoDiv.style.color = '#721c24';
            resultadoDiv.innerHTML = '<i class="wf wf-x-circle"></i> CANCELADO: Usuário clicou em "Não" ou cancelou';
            console.log('[WfAlert] <i class="wf wf-x-circle"></i> Mostrando resultado: CANCELADO');
         } else {
            resultadoDiv.style.background = '#fff3cd';
            resultadoDiv.style.color = '#856404';
            resultadoDiv.innerHTML = '<i class="wf wf-help-circle"></i> RESULTADO INVÁLIDO: ' + resultado;
            console.log('[WfAlert] <i class="wf wf-help-circle"></i> Mostrando resultado: INVÁLIDO');
         }
      });
   };

   window.testarConfirmacaoExclusao = function () {
      console.log('[WfAlert] Testando confirmação de exclusão...');

      WfAlert.confirmar('<i class="wf wf-alert-triangle"></i> ATENÇÃO: Deseja excluir este item permanentemente?', function (resultado) {
         console.log('[WfAlert] Resultado da exclusão:', resultado, typeof resultado);

         // SOLUÇÃO DIRETA - Criar o elemento se não existir
         let resultadoDiv = document.getElementById('resultadoConfirmacao');

         if (!resultadoDiv) {
            console.log('[WfAlert] Elemento não encontrado, criando...');
            resultadoDiv = document.createElement('div');
            resultadoDiv.id = 'resultadoConfirmacao';
            resultadoDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; display: block;';

            // SOLUÇÃO SIMPLES - Inserir após o botão
            const botao = document.querySelector('button[onclick*="testarConfirmacaoExclusao"]');
            if (botao && botao.parentNode) {
               botao.parentNode.appendChild(resultadoDiv);
            } else {
               document.body.appendChild(resultadoDiv);
            }
         }

         resultadoDiv.style.display = 'block';

         if (resultado === true) {
            resultadoDiv.style.background = '#d4edda';
            resultadoDiv.style.color = '#155724';
            resultadoDiv.innerHTML = '<i class="wf wf-trash Taler f20"></i> ITEM EXCLUÍDO: Usuário confirmou a exclusão';
            WfAlert.sucesso('Item excluído com sucesso!', 2000, 'center');
            console.log('[WfAlert] <i class="wf wf-check-circle Taler f20"></i> Mostrando resultado: ITEM EXCLUÍDO');
         } else if (resultado === false) {
            resultadoDiv.style.background = '#f8d7da';
            resultadoDiv.style.color = '#721c24';
            resultadoDiv.innerHTML = '🚫 EXCLUSÃO CANCELADA: Usuário cancelou a operação';
            WfAlert.infor('Operação cancelada pelo usuário', 2000, 'center');
            console.log('[WfAlert] <i class="wf wf-x-circle Taler f20"></i> Mostrando resultado: EXCLUSÃO CANCELADA');
         } else {
            resultadoDiv.style.background = '#fff3cd';
            resultadoDiv.style.color = '#856404';
            resultadoDiv.innerHTML = '❓ RESULTADO INVÁLIDO: ' + resultado;
            console.log('[WfAlert] ❓ Mostrando resultado: INVÁLIDO');
         }
      });
   };

   // Função de teste isolado para WfAlert.confirmar
   window.testarConfirmarIsolado = function () {
      console.log('[WfAlert] Testando WfAlert.confirmar isoladamente...');

      WfAlert.confirmar('<i class="wf wf-test-tube"></i> TESTE ISOLADO: Clique em "Sim" para confirmar ou "Não" para cancelar', function (resultado) {
         console.log('[WfAlert] Resultado do teste isolado:', resultado, typeof resultado);

         let resultadoDiv = document.getElementById('resultadoConfirmacao');
         if (!resultadoDiv) {
            resultadoDiv = document.createElement('div');
            resultadoDiv.id = 'resultadoConfirmacao';
            resultadoDiv.style.cssText = 'margin: 15px 0; padding: 15px; border-radius: 8px; display: block;';
            document.body.appendChild(resultadoDiv);
         }

         resultadoDiv.style.display = 'block';

         if (resultado === true) {
            resultadoDiv.style.background = '#d4edda';
            resultadoDiv.style.color = '#155724';
            resultadoDiv.innerHTML = '<i class="wf wf-check-circle"></i> CONFIRMADO: Usuário clicou em "Sim"';
            console.log('[WfAlert] <i class="wf wf-check-circle"></i> Mostrando resultado: CONFIRMADO');
         } else if (resultado === false) {
            resultadoDiv.style.background = '#f8d7da';
            resultadoDiv.style.color = '#721c24';
            resultadoDiv.innerHTML = '<i class="wf wf-x-circle"></i> CANCELADO: Usuário clicou em "Não" ou cancelou';
            console.log('[WfAlert] <i class="wf wf-x-circle"></i> Mostrando resultado: CANCELADO');
         } else {
            resultadoDiv.style.background = '#fff3cd';
            resultadoDiv.style.color = '#856404';
            resultadoDiv.innerHTML = '<i class="wf wf-help-circle"></i> RESULTADO INVÁLIDO: ' + resultado;
            console.log('[WfAlert] <i class="wf wf-help-circle"></i> Mostrando resultado: INVÁLIDO');
         }
      });
   };

   // Log para confirmar que as funções foram carregadas
   console.log('[WfAlert] Funções de teste carregadas:', {
      testarMultiplos: typeof window.testarMultiplos,
      testarCantos: typeof window.testarCantos,
      testarConfirmacaoSimples: typeof window.testarConfirmacaoSimples,
      testarConfirmacaoExclusao: typeof window.testarConfirmacaoExclusao,
      testarConfirmarIsolado: typeof window.testarConfirmarIsolado
   });

   // FUNÇÃO DE TESTE DIRETO
   window.testeDireto = function () {
      console.log('[TESTE] Iniciando teste direto...');

      // Teste 1: Verificar se WfAlert existe
      if (typeof WfAlert === 'undefined') {
         alert('<i class="wf wf-x-circle Taler f20"></i> ERRO: WfAlert não está disponível!');
         return;
      }

      // Teste 2: Verificar se o método confirmar existe
      if (typeof WfAlert.confirmar !== 'function') {
         alert('<i class="wf wf-x-circle Taler f20"></i> ERRO: WfAlert.confirmar não é uma função!');
         return;
      }

      // Teste 3: Executar confirmação simples
      WfAlert.confirmar('🧪 TESTE DIRETO: Clique no backdrop (fundo escuro) para testar cancelamento', function (resultado) {
         console.log('[TESTE] Resultado:', resultado, typeof resultado);

         if (resultado === true) {
            alert('<i class="wf wf-check-circle Taler f20"></i> CONFIRMADO: Usuário clicou em Sim');
         } else if (resultado === false) {
            alert('<i class="wf wf-x-circle Taler f20"></i> CANCELADO: Usuário clicou em Não ou no backdrop');
         } else {
            alert('<i class="wf wf-help-circle Taler f20"></i> INVÁLIDO: Resultado inesperado: ' + resultado);
         }
      });

      console.log('[TESTE] Teste direto executado com sucesso!');
   };
</script>
