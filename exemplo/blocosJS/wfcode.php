<section>
   <div class="g-xg">
      <div class="topo">
         <h1>WfCode</h1>
         <nav class="listmenu-d">
            <ol class="listmenu">
               <li class="listmenu-item"><a href="#">Home</a></li>
               <li class="listmenu-item active">WfCode</li>
            </ol>
         </nav>
      </div>
      <section class="swcodex">
         <div class="g-xg">
            <!-- Cabeçalho do Componente -->
            <div class="l">
               <div class="co12-g">
                  <h3>[Sintaxe Highlighting]</h3>
                  <p>
                     O <b>WfCode</b> é o sistema oficial de exibição de código do WEBFULL Framework. Oferece syntax highlighting para múltiplas linguagens, temas
                     personalizáveis e integração total com o sistema de temas.
                  </p>
                  <div style="background: var(--wf-bg-); border: 1px solid #ff9800; padding: 15px; border-radius: 8px; margin: 15px 0">
                     <b><i class="wf wf-code Taler f20"></i> SYNTAX HIGHLIGHTING:</b> Suporte a 50+ linguagens<br />
                     <b><i class="wf wf-palette Taler f20"></i> MÚLTIPLOS TEMAS:</b> Day, Night e Auto com WfDay<br />
                     <b><i class="wf wfs-zap Taler f20"></i> PERFORMANCE:</b> Renderização otimizada e rápida
                  </div>
               </div>
            </div>
            <!-- Introdução -->
            <div class="l">
               <div class="co6-g">
                  <h3>O que é?</h3>
                  <p>
                     O WfCode é um sistema de highlight de código sem dependências externas, baseado no Prism.js com tema Okaidia, que oferece destaque de sintaxe para as principais
                     linguagens de programação.
                  </p>

                  <div style="background: var(--wf-bg-); border: 1px solid #9c27b0; padding: 20px; border-radius: 8px; margin: 15px 0; color: var(--wf-color)">
                     <b><i class="wf wf-code-alt Taler f20"></i> 5 LINGUAGENS:</b> HTML, CSS, JavaScript, PHP, JSON<br />
                     <b><i class="wf wf-copy Taler f20"></i> BOTÃO CÓPIA:</b> Automático em todos os blocos<br />
                     <b><i class="wf wf-palette Taler f20"></i> TEMA OKAIDIA:</b> Estilo escuro profissional<br />
                     <b><i class="wf wf-bolt-circle Taler f20"></i> SEM DEPENDÊNCIAS:</b> Tudo integrado no arquivo
                  </div>
               </div>
               <div class="co6-g">
                  <div class="wfpage-info SWcolor"><br />
                     <div class="wfpage-info-header"><i class="wf wf-info-circle Taler f20"></i> <small>Informações</small></div>
                     <div class="wfpage-info-content">
                        <b><i class="wf wf-file Taler f20"></i> Arquivo:</b> js/WfCode.js<br />
                        <b><i class="wf wf-package Taler f20"></i> Tamanho:</b> ~12KB<br />
                        <b><i class="wf wf-wrench Taler f20"></i> Dependências:</b> Nenhuma<br />
                        <b><i class="wf wf-mobile Taler f20"></i> Suporte:</b> Todos os navegadores modernos<br />
                        <b><i class="wf wf-palette Taler f20"></i> Tema:</b> Prism Okaidia integrado<br />
                        <b><i class="wf wf-target-lock Taler f20"></i> Uso:</b> Atributo WfCode<br />
                        <b><i class="wf wf-refresh Taler f20"></i> AJAX:</b> WfCode.initAll()<br />
                        <b><i class="wf wf-copy Taler f20"></i> Cópia:</b> Clipboard API
                     </div>
                  </div>
               </div>
            </div>
            <!-- Uso Básico -->
            <div class="l">
               <div class="co12-g">
                  <h3>Como Usar</h3>
                  <p>O WfCode é extremamente simples de usar. Basta adicionar o atributo <code>WfCode</code> no elemento <code>&lt;pre></code> e especificar a linguagem:</p>

                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3; color: var(--wf-color)">
                     <h3 style="margin-top: 0"><i class="wf wf-bulb Taler f20"></i> Formato Aceitos</h3>
                     <p>O WfCode aceita para especificar a linguagem:</p>
                     <ul style="color: var(--wf-color)">
                        <li><code>WfCode-lang="php"</code> - Formato completo</li>
                     </ul>
                  </div>

                  <h3>Exemplo 1: JavaScript</h3>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- Formato completo -->
<pre WfCode WfCode-lang="javascript">
<script type="text/plain">
   function saudacao(nome) {
      console.log('Olá, ' + nome + '!');
      return true;
   }
&lt;/script>
&lt;/pre>

<!-- Formato abreviado (funciona igual) -->
<pre WfCode WfCode-lang="javascript">
<script type="text/plain">
   function saudacao(nome) {
      console.log('Olá, ' + nome + '!');
      return true;
   }
&lt;/script>
</pre>
                  </script>
                  </pre>

                  <h3>Exemplo 2: HTML (requer &lt;script type="text/plain">)</h3>
                  <p><b>IMPORTANTE:</b> Para código HTML/PHP que contenha tags, use <code>&lt;script type="text/plain"></code> para evitar que o navegador interprete o código:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<pre WfCode WfCode-lang="html">
<script type="text/plain">
   <!DOCTYPE html>
   <html lang="pt-br">
   <head>
      <meta charset="UTF-8">
      <title>Meu Site</title>
   </head>
   <body>
      <div class="container">
         <h1>Olá Mundo!</h1>
      </div>
   </body>
   </html>
&lt;/script>
</pre>
                  </script>
                  </pre>

                  <h3>Exemplo 3: CSS (não precisa de script)</h3>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- CSS pode ser direto, sem script -->
<pre WfCode WfCode-lang="css">
.container {
    display: flex;
    justify-content: center;
    padding: 20px;
}
</pre>
                  </script>
                  </pre>

                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; color: var(--wf-color)">
                     <h3 style="margin-top: 0"><i class="wf wf-warning Taler f20"></i> Quando usar &lt;script type="text/plain">:</h3>
                     <ul style="color: var(--wf-color)">
                        <li><b>HTML:</b> SEMPRE usar (contém tags que o navegador interpretaria)</li>
                        <li><b>PHP:</b> SEMPRE usar (contém tags &lt;?php, &lt;script>, etc)</li>
                        <li><b>JavaScript:</b> Opcional (mas recomendado se houver &lt;script>)</li>
                        <li><b>CSS:</b> NÃO precisa (não tem tags)</li>
                        <li><b>JSON:</b> NÃO precisa (não tem tags)</li>
                     </ul>
                     <p><b>Regra simples:</b> Se o código tem tags HTML/XML, use <code>&lt;script type="text/plain"></code>!</p>
                  </div>
               </div>
            </div>

            <!-- Compatibilidade AJAX -->
            <div class="l">
               <div class="co12-g">
                  <h3><i class="wf wf-refresh Taler f20"></i> Compatibilidade com AJAX</h3>
                  <p>O WfCode funciona perfeitamente com conteúdo carregado dinamicamente via <b>WfAjax</b>!</p>

                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50; color: var(--wf-color)">
                     <h3 style="margin-top: 0"><i class="wf wf-check Taler f20"></i> Como funciona:</h3>
                     <p>Quando você carrega conteúdo via AJAX que contém blocos <code>WfCode</code>, o componente:</p>
                     <ol style="color: var(--wf-color)">
                        <li>Detecta automaticamente os novos elementos</li>
                        <li>Aplica o syntax highlighting</li>
                        <li>Adiciona o botão de cópia</li>
                        <li>Tudo funciona sem configuração adicional!</li>
                     </ol>
                  </div>

                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Exemplo: Carregando código via WfAjax
const container = document.querySelector('#conteudo');

// WfAjax carrega o conteúdo e reinicializa automaticamente o WfCode
// Você não precisa fazer NADA - funciona automaticamente!

// Mas se quiser reinicializar manualmente:
WfCode.reinit();  // Limpa e reinicializa todos os blocos

// Ou inicializar apenas em um container específico:
WfCode.initAll(container);
</script>
</pre>

                  <p><b>Exemplo prático:</b> Esta própria página de exemplos do WebFull usa WfAjax para carregar conteúdo, e todos os blocos WfCode funcionam perfeitamente!</p>
               </div>
            </div>
            <!-- Exemplos das 5 Linguagens -->
            <div class="l">
               <div class="co6-g">
                  <h3>JavaScript</h3>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Exemplo JavaScript
function saudacao(nome) {
  const mensagem = `Olá, ${nome}!`;
  console.log(mensagem);
  return true;
}

// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}

const resultado = saudacao('SWFULL');
</script>
</pre>
               </div>

               <div class="co6-g">
                  <h3>HTML (Markup)</h3>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>SWFULL Framework</title>
  <link rel="stylesheet" href="swfull.css">
</head>
<body>
  <div class="container">
    <h1>Bem-vindo ao SWFULL</h1>
    <p class="destaque">Framework completo em português</p>
    <button WfModal WfModal-id="#modal1">
      Abrir Modal
    </button>
  </div>
  <script src="swfull.js"><\/script>
</body>
</html>
</script>
</pre>
               </div>
            </div>
            <!-- Outras Linguagens -->
            <div class="l">
               <div class="co4-g">
                  <h3>CSS</h3>
                  <pre WfCode WfCode-lang="css"><script type="text/plain">
/* CSS com variáveis e gradientes */
:root {
  --primary-color: #007bff;
  --secondary-color: #28a745;
  --border-radius: 8px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius);
  padding: 20px;
  opacity: 0.9;
}

.btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}
</script>
</pre>
               </div>

               <div class="co4-g">
                  <h3>PHP</h3>
                  <pre WfCode WfCode-lang="php"><script type="text/plain">
< ?php
class Usuario
{
   private $nome;
   private $email;
   private $ativo;

   public function __construct($nome, $email)
   {
      $this->nome = $nome;
      $this->email = $email;
      $this->ativo = true;
   }

   public function getNome()
   {
      return $this->nome;
   }

   public function validarEmail()
   {
      return filter_var($this->email, FILTER_VALIDATE_EMAIL);
   }

   public function ativar()
   {
      $this->ativo = true;
      return $this;
   }
}

$usuario = new Usuario('João', 'joao@email.com');
echo $usuario->getNome();
if ($usuario->validarEmail()) {
   echo "Email válido!";
}
?>
</script>
</pre>
               </div>

               <div class="co4-g">
                  <h3>JSON</h3>
                  <pre WfCode WfCode-lang="json"><script type="text/plain">
{
  "nome": "SWFULL Framework",
  "versao": "1.1.0",
  "descricao": "Framework web completo em português",
  "autor": "SandroWeb",
  "componentes": {
    "css": [
      "cores",
      "containers",
      "displays",
      "utilitarios"
    ],
    "javascript": [
      "WfAjax",
      "WfModal",
      "WfTable",
      "WfCode"
    ]
  },
  "configuracao": {
    "tema": "auto",
    "cache": true,
    "debug": false
  },
  "dependencias": [],
  "licenca": "MIT"
}
</script>
</pre>
               </div>
            </div>

            <!-- Problema do </script> -->
            <div class="l">
               <div class="co12-g">
                  <h3><i class="wf wf-warning Taler f20"></i> Problema do &lt;/script&gt;</h3>
                  <p>Quando você precisa mostrar código HTML que contém <code>&lt;/script&gt;</code>, há um conflito. Aqui estão as soluções:</p>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3><i class="wf wf-error Taler f20"></i> Problema</h3>
                  <p>Isso <b>NÃO funciona</b> porque o <code>&lt;/script&gt;</code> fecha o script antes da hora:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- ISSO NÃO FUNCIONA -->
<pre WfCode WfCode-lang="html">
  <script src="app.js">&lt;/script>  <!-- Fecha aqui! -->
  <div>Resto do código...&lt;/div>
&lt;/pre>
</script>
</pre>
               </div>

               <div class="co6-g">
                  <h3><i class="wf wf-check Taler f20"></i> Solução 1: Escapar</h3>
                  <p>Use <code>&lt;\/script&gt;</code> (escape a barra):</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- SOLUÇÃO 1: Escapar a barra -->
<pre WfCode WfCode-lang="html">
  <script type="text/plain">
    <script src="app.js">&lt;/script>
    <div>Resto do código...&lt;/div>
  &lt;/script>
&lt;/pre>
</script>
</pre>
               </div>
            </div>

            <div class="l">
               <div class="co6-g">
                  <h3><i class="wf wf-check  Taler f20"></i> Solução 2: Entidades HTML</h3>
                  <p>Use <code>&amp;lt;/script></code>:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- SOLUÇÃO 2: Entidades HTML -->
<pre WfCode WfCode-lang="html">
  <script type="text/plain">
    <script src="app.js">&lt;/script&gt;
    <div>Resto do código...&lt;/div&gt;
  &lt;/script>
&lt;/pre>
</script>
</pre>
               </div>

               <div class="co6-g">
                  <h3><i class="wf wf-check Taler f20"></i> Solução 3: JavaScript</h3>
                  <p>Defina o código via JavaScript:</p>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// SOLUÇÃO 3: Via JavaScript
const codeBlock = document.querySelector('#meu-codigo');
codeBlock.textContent = `
  <script src="app.js">< /script>
  <div>Resto do código...</div>
`;
WfCode.highlightAll();
</script>
</pre>
               </div>
            </div>

            <div class="l">
               <div class="co12-g">
                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; color: var(--wf-color)">
                     <h3 style="margin-top: 0"><i class="wf wf-bulb Taler f20"></i> Recomendação:</h3>
                     <p><b>Use a Solução 1 (escapar)</b> - é a mais simples e funciona perfeitamente:</p>
                     <ul>
                        <li><i class="wf wf-check Taler f20"></i> Apenas adicione <code>\</code> antes da <code>/</code></li>
                        <li><i class="wf wf-check Taler f20"></i> O WfCode processa automaticamente</li>
                        <li><i class="wf wf-check Taler f20"></i> Não afeta a legibilidade do código</li>
                        <li><i class="wf wf-check Taler f20"></i> Funciona com qualquer tag que tenha fechamento</li>
                     </ul>
                     <p>
                        <b>Exemplo prático:</b> <code>&lt;script&gt;</code> vira <code>&lt;script&gt;</code> e <code>&lt;/script&gt;</code> vira <code>&lt;\/script&gt;</code>
                     </p>
                  </div>
               </div>
            </div>

            <!-- Métodos JavaScript -->
            <div class="l">
               <div class="co6-g">
                  <h3>Métodos JavaScript</h3>
                  <p>O WfCode fornece métodos JavaScript para controle manual:</p>
                  <pre WfCode WfCode-lang="javascript"><script type="text/plain">
// Inicialização automática (DOM completo)
WfCode.highlightAll();

// Inicializar em container específico
const container = document.querySelector('.meu-container');
WfCode.highlightAll(container);

// Limpar estado (remove flags de inicialização)
WfCode.clearState();

// Reinicializar (limpa e inicializa novamente)
WfCode.reinit();

// Compatibilidade com WfAjax (alias de highlightAll)
WfCode.initAll(container);
</script>
</pre>

                  <h3>Detecção Automática de Linguagem</h3>
                  <p>O WfCode detecta a linguagem de múltiplas formas:</p>
                  <ul style="color: var(--wf-color)">
                     <li><code>WfCode-lang="javascript"</code> ✅ Formato completo</li>
                     <li><code>WfCode-lang="php"</code> ✅ Formato abreviado</li>
                     <li><code>lang="css"</code> ✅ Atributo HTML padrão</li>
                     <li><code>class="lang-html"</code> ✅ Classe Prism.js</li>
                     <li><code>class="lang-php"</code> ✅ Classe abreviada</li>
                  </ul>
                  <p><b>Linguagens suportadas:</b> javascript, html, css, php, json</p>
               </div>

               <div class="co6-g">
                  <h3>Botão de Cópia</h3>
                  <p>Todos os blocos recebem automaticamente um botão de cópia:</p>
                  <pre WfCode WfCode-lang="html"><script type="text/plain">
<!-- O WfCode adiciona automaticamente: -->
<div class="wfcode-wrap" style="position: relative;">
  <pre WfCode WfCode-lang="javascript">
    // Seu código aqui
  &lt;/pre>
   <button class="copy-button" style="position: absolute; top: 6px; right: 9px;">
      Copiar
   </button>
</div>
</script>
</pre>

                  <div style="background: var(--wf-bg-); padding: 15px; border-radius: 8px; margin: 15px 0; color: var(--wf-color)">
                     <h3><i class="wf wf-bulb Taler f20"></i> Características do Botão:</h3>
                     <ul style="color: var(--color)">
                        <li><i class="wf wf-check Taler f20"></i> Posicionamento automático no canto superior direito</li>
                        <li><i class="wf wf-check Taler f20"></i> Feedback visual "Copiado!" por 1.2s</li>
                        <li><i class="wf wf-check Taler f20"></i> Usa Clipboard API nativa</li>
                        <li><i class="wf wf-check Taler f20"></i> Estilo integrado ao tema</li>
                        <li><i class="wf wf-check Taler f20"></i> Hover com transição suave</li>
                     </ul>
                  </div>
               </div>
            </div>
            <!-- Resumo -->
            <div class="l">
               <div class="co12-g">
                  <h3>Resumo</h3>
                  <div style="background: var(--wf-bg-); padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; color: var(--wf-color)">
                     <h3 style="margin-top: 0"><i class="wf wf-check Taler f20"></i> Características do WfCode</h3>
                     <ul style="color: var(--wf-color)">
                        <li><b><i class="wf wf-code-alt Taler f20"></i> 15+ Linguagens:</b> HTML, CSS, JavaScript, PHP, Python, SQL, JSON, Bash e mais</li>
                        <li><b><i class="wf wf-palette Taler f20"></i> Highlight Inteligente:</b> Destaque de sintaxe preciso e colorido</li>
                        <li><b><i class="wf wf-copy Taler f20"></i> Cópia Automática:</b> Botão de cópia em todos os blocos</li>
                        <li><b><i class="wf wf-list-ol Taler f20"></i> Numeração:</b> Linhas numeradas opcionais</li>
                        <li><b><i class="wf wf-moon Taler f20"></i> Temas Adaptativos:</b> Integração total com WfDay</li>
                        <li><b><i class="wf wf-mobile Taler f20"></i> Responsivo:</b> Funciona perfeitamente em mobile</li>
                        <li><b><i class="wf wf-bolt-circle Taler f20"></i> Performance:</b> Carregamento rápido e otimizado</li>
                        <li><b><i class="wf wf-refresh Taler f20"></i> AJAX Ready:</b> Funciona em conteúdo carregado dinamicamente</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>