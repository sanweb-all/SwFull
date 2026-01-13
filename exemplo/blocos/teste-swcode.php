<h2>Teste WfCode - Debugging</h2>

<p>Exemplo de código JavaScript:</p>

<pre WfCode WfCode-language="javascript">
function hello() {
  console.log("Hello World!");
  const name = "WebFull";
  return name;
}
</pre>

<p>Exemplo de código HTML:</p>

<pre WfCode WfCode-language="html">
<div class="container">
  <h1>Título</h1>
  <p>Parágrafo</p>
</div>
</pre>

<p>Exemplo de código CSS:</p>

<pre WfCode WfCode-language="css">
.button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
</pre>

<script>
// Script para testar se WfCode foi carregado
console.log('[TESTE] WfCode disponível?', typeof WfCode !== 'undefined');
console.log('[TESTE] WfCode.reinit disponível?', typeof WfCode !== 'undefined' && typeof WfCode.reinit === 'function');

// Aguardar um pouco e verificar elementos
setTimeout(() => {
  const preElements = document.querySelectorAll('pre[WfCode]');
  console.log('[TESTE] Elementos pre[WfCode] encontrados:', preElements.length);
  preElements.forEach((el, i) => {
    console.log(`[TESTE] Elemento ${i}:`, {
      inicializado: el._swCodeInitialized,
      linguagem: el.getAttribute('WfCode-language'),
      innerHTML: el.innerHTML.substring(0, 100)
    });
  });
}, 1000);
</script>
