/*
 * WfCode - Highlight Universal (baseado em Prism.js Okaidia, sem dependências externas)
 * SandroWeb - 2025
 */

// Carregar CSS do componente
function wfcodeLoadComponentCSS() {
   const cssId = 'webfull-wfcode-css';
   if (!document.getElementById(cssId)) {
      const style = document.createElement('style');
      style.id = cssId;
      style.textContent = `
/* ===== WFCODE - HIGHLIGHT UNIVERSAL ===== */

/* Wrapper para posicionar botão de copiar */
.wfcode-wrap {
   position: relative !important;
   display: inline-block;
   width: 100%;
}

/* Elementos com WfCode */
[WfCode] {
    position: relative !important;
    background: #1e1e1ecf !important;
    color: #fff !important;
    border: 1px solid #404040 !important;
    border-radius: 6px !important;
    padding: 1.2rem 2rem !important;
    margin: 1em 0 !important;
    font-family: Consolas, Monaco, 'Courier New', monospace !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    overflow-x: auto !important;
    overflow-y: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

/* Reset para elementos internos */
[WfCode] pre {
   background: transparent !important;
   border: 0 !important;
   margin: 0 !important;
   padding: 0 !important;
}

[WfCode] code {
   background: transparent !important;
   color: inherit !important;
}

/* Tokens de syntax highlighting */
[WfCode] .token.cdata,
[WfCode] .token.comment,
[WfCode] .token.doctype,
[WfCode] .token.prolog {
   color: #8292a2 !important;
}

[WfCode] .token.entity,
[WfCode] .token.operator,
[WfCode] .token.punctuation,
[WfCode] .token.url,
[WfCode] .token.variable {
   color: #f8f8f2 !important;
}

[WfCode] .token.constant,
[WfCode] .token.deleted,
[WfCode] .token.property,
[WfCode] .token.symbol,
[WfCode] .token.tag {
   color: #f92672 !important;
}

[WfCode] .token.boolean,
[WfCode] .token.number {
   color: #ae81ff !important;
}

.language-css .token.string,
.style .token.string,
[WfCode] .token.attr-name,
[WfCode] .token.builtin,
[WfCode] .token.char,
[WfCode] .token.inserted,
[WfCode] .token.selector,
[WfCode] .token.string {
   color: #a6e22e !important;
}

[WfCode] .token.attr-value,
[WfCode] .token.class-name,
[WfCode] .token.function {
   color: #e6db74 !important;
}

[WfCode] .token.keyword {
   color: #66d9ef !important;
}

[WfCode] .token.important,
[WfCode] .token.regex {
   color: #fd971f !important;
}

[WfCode] .token.bold,
[WfCode] .token.important {
   font-weight: 700 !important;
}

[WfCode] .token.italic {
   font-style: italic !important;
}

[WfCode] .token.entity {
   cursor: help !important;
}

/* Botão de copiar */
.copy-button {
   position: absolute !important;
   top: 16px !important;
   right: 6px !important;
   z-index: 20 !important;
   background: rgba(45, 45, 45, 0.95) !important;
   color: #d3d3d3 !important;
   border: 1px solid #474747 !important;
   padding: 1px 8px !important;
   border-radius: 4px !important;
   font-size: 12px !important;
   cursor: pointer !important;
   opacity: 0.4 !important;
   transition: 0.2s !important;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

.copy-button:hover {
   opacity: 1 !important;
   background: #2d2d2d !important;
   color: #fff !important;
   border-color: #666 !important;
   transform: translateY(-1px) !important;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

.copy-button.copied {
   background: #4caf50 !important;
   color: #fff !important;
   border-color: #45a049 !important;
}

.copy-button.error {
   background: #f44336 !important;
   color: #fff !important;
   border-color: #d32f2f !important;
}

/* Scrollbar customizada */
[WfCode]::-webkit-scrollbar {
   width: 8px;
   height: 8px;
}

[WfCode]::-webkit-scrollbar-track {
   background: #2d2d2d;
}

[WfCode]::-webkit-scrollbar-thumb {
   background: #555;
   border-radius: 4px;
}

[WfCode]::-webkit-scrollbar-thumb:hover {
   background: #777;
}
      `;
      document.head.appendChild(style);
   }
}

// Carregar CSS quando o módulo for importado
wfcodeLoadComponentCSS();

// --- WfCode Highlight Core (adaptado do Prism.js, highlight básico universal) ---
class WfCode {
   constructor(element) {
      this.element = element;

      // Detecção completa de linguagem - todos os métodos suportados
      let lang = this.element.getAttribute('WfCode-language') ||
                 this.element.getAttribute('WfCode-lang') ||
                 this.element.getAttribute('lang');

      // Se não encontrou nos atributos, procurar nas classes
      if (!lang) {
         const match = this.element.className.match(/(?:lang(?:uage)?-)([\w-]+)/i);
         if (match) lang = match[1];
      }

      // Se ainda não tem linguagem, usar plaintext
      this.language = lang || 'plaintext';

      this.theme = this.element.getAttribute('WfCode-theme') || 'default';
      this.lineNumbers = this.element.getAttribute('WfCode-line-numbers') === 'true';
      this.copyButton = this.element.getAttribute('WfCode-copy-button') !== 'false';
      this.highlight = this.element.getAttribute('WfCode-highlight') || '';

      this.init();
   }

   addCopyButton() {
      // Verificar se já existe um wrapper
      if (this.element.parentNode && this.element.parentNode.classList.contains('wfcode-wrap')) {
         // Se já existe wrapper, apenas atualizar o botão se necessário
         const existingBtn = this.element.parentNode.querySelector('.copy-button');
         if (existingBtn) {
            return; // Botão já existe
         }
      }

      // Cria wrapper para posicionar botão
      const wrapper = document.createElement('div');
      wrapper.className = 'wfcode-wrap';
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      wrapper.style.width = '100%';

      // Inserir wrapper antes do elemento
      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);

      // Cria botão
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-button';
      btn.innerHTML = 'Copiar';

      // Função copiar
      btn.onclick = () => {
         try {
            let code = this.element.textContent || this.element.innerText;

            // Fallback para navegadores antigos
            if (navigator.clipboard && window.isSecureContext) {
               navigator.clipboard
                  .writeText(code)
                  .then(() => {
                     btn.innerHTML = 'Copiado!';
                     btn.classList.add('copied');
                     setTimeout(() => {
                        btn.innerHTML = 'Copiar';
                        btn.classList.remove('copied');
                     }, 1200);
                  })
                  .catch(() => {
                     // Fallback se clipboard API falhar
                     this.fallbackCopy(code, btn);
                  });
            } else {
               // Fallback para navegadores sem clipboard API
               this.fallbackCopy(code, btn);
            }
         } catch (error) {
            // Log silencioso em produção, apenas warn em desenvolvimento
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
               console.warn('WfCode: Erro ao copiar código:', error);
            }
            btn.innerHTML = 'Erro!';
            btn.classList.add('error');
            setTimeout(() => {
               btn.innerHTML = 'Copiar';
               btn.classList.remove('error');
            }, 1200);
         }
      };

      wrapper.appendChild(btn);
   }

   fallbackCopy(text, btn) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
         document.execCommand('copy');
         btn.innerHTML = 'Copiado!';
         btn.classList.add('copied');
         setTimeout(() => {
            btn.innerHTML = 'Copiar';
            btn.classList.remove('copied');
         }, 1200);
      } catch (error) {
         btn.innerHTML = 'Erro!';
         btn.classList.add('error');
         setTimeout(() => {
            btn.innerHTML = 'Copiar';
            btn.classList.remove('error');
         }, 1200);
      } finally {
         document.body.removeChild(textArea);
      }
   }

   static highlightAll(container = document) {
      // CSS já está carregado via loadComponentCSS()

      // Seleciona todos os <pre> ou <code> com WfCode OU com classe language-xxx/lang-xxx
      const elements = container.querySelectorAll(
         'pre[WfCode], code[WfCode], pre[WfCode-language], code[WfCode-language], pre[WfCode-lang], code[WfCode-lang], pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]'
      );

      elements.forEach((el, index) => {
         // Verificar se já foi inicializado
         if (!el._wfCodeInitialized) {
            // Detecta linguagem pela classe se não houver WfCode-lang
            let lang = el.getAttribute('WfCode-language') || el.getAttribute('WfCode-lang') || el.getAttribute('lang');
            if (!lang) {
               const match = el.className.match(/(?:lang(?:uage)?-)([\w-]+)/i);
               if (match) lang = match[1];
            }

            // Se ainda não tem linguagem, usar plaintext
            if (!lang) {
               lang = 'plaintext';
            }

            if (lang && !el.classList.contains('language-' + lang)) {
               el.classList.add('language-' + lang);
            }

            try {
               new WfCode(el);
               el._wfCodeInitialized = true;
            } catch (error) {
               console.error(`[WfCode] Erro ao inicializar elemento ${index}:`, error);
            }
         }
      });
   }

   // Limpa estado dos elementos para permitir reinicialização
   static clearState(container = document) {
      const elements = container.querySelectorAll('pre[WfCode], code[WfCode], pre[WfCode-language], code[WfCode-language], pre[WfCode-lang], code[WfCode-lang], pre[class*="language-"], code[class*="language-"], pre[class*="lang-"], code[class*="lang-"]');
      elements.forEach(el => {
         delete el._wfCodeInitialized;
         // Limpar instância se necessário
         if (el._wfCodeInstance) {
            delete el._wfCodeInstance;
         }
      });
   }

   // Reinicializa elementos (limpa e reinicializa)
   static reinit(container = document) {
      this.clearState(container);
      WfCode.highlightAll(container);
   }

   init() {
      let code;

      // PRIORIDADE 1: Buscar em <script type="text/plain"> (para HTML que precisa de tags literais)
      const script = this.element.querySelector('script[type="text/plain"]');

      // PRIORIDADE 2: Buscar em <code> interno (padrão Prism.js)
      const codeElement = this.element.querySelector('code');

      if (script) {
         // Código dentro de <script type="text/plain">
         code = script.textContent;
      } else if (codeElement) {
         // Código dentro de <code> (já pode estar com entidades HTML)
         code = codeElement.textContent || codeElement.innerHTML;
      } else {
         // Código direto no <pre> (já pode estar com entidades HTML)
         code = this.element.textContent || this.element.innerHTML;
      }

      // Limpar espaços extras do início/fim
      code = code.trim();

      // Usar a linguagem já detectada no construtor
      let html = WfCode.highlight(code, this.language);

      this.element.innerHTML = html;

      // Adicionar botão de copiar se habilitado
      if (this.copyButton) {
         this.addCopyButton();
      }
   }

   // --- Highlight universal (markup, js, css, php, etc) ---
   static highlight(code, lang) {
      // Pequeno parser para cada linguagem (markup, js, css, php, json)
      if (lang === 'js' || lang === 'javascript') {
         return WfCode.js(code);
      } else if (lang === 'css') {
         return WfCode.css(code);
      } else if (lang === 'php') {
         return WfCode.php(code);
      } else if (lang === 'json') {
         return WfCode.json(code);
      } else {
         // Default: markup/html
         return WfCode.markup(code);
      }
   }

   static markup(code) {
      // Decodificar entidades HTML básicas primeiro
      code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      // Escapar HTML antes de tudo
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Comentários
      code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>');
      // Tags
      code = code.replace(/(&lt;\/?[a-zA-Z0-9\-]+)([\s\S]*?)(&gt;)/g, function (m, tag, attrs, close) {
         // Atributos
         attrs = attrs.replace(
            /([a-zA-Z0-9\-:]+)(=)("[^"]*"|'[^']*')/g,
            '<span class="token attr-name">$1</span><span class="token punctuation">$2</span><span class="token attr-value">$3</span>'
         );
         return '<span class="token tag">' + tag + '</span>' + attrs + '<span class="token tag">' + close + '</span>';
      });
      return code;
   }

   static js(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Usar placeholders temporários para evitar conflitos
      const tokens = [];
      let tokenIndex = 0;

      // Função para criar placeholder
      function createPlaceholder(content, className) {
         const placeholder = `__TOKEN_${tokenIndex}__`;
         tokens[tokenIndex] = `<span class="token ${className}">${content}</span>`;
         tokenIndex++;
         return placeholder;
      }

      // 1. Comments primeiro (para não interferir)
      code = code.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, match => createPlaceholder(match, 'comment'));

      // 2. Strings (incluindo template literals)
      code = code.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|`[^`\\]*(?:\\.[^`\\]*)*`)/g, match => createPlaceholder(match, 'string'));

      // 3. Keywords
      code = code.replace(
         /\b(const|let|var|function|return|if|else|for|while|break|continue|switch|case|default|try|catch|finally|throw|new|class|extends|super|import|from|export|async|await|this|typeof|instanceof)\b/g,
         match => createPlaceholder(match, 'keyword')
      );

      // 4. Booleans/null
      code = code.replace(/\b(true|false|null|undefined)\b/g, match => createPlaceholder(match, 'boolean'));

      // 5. Numbers
      code = code.replace(/\b(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, match => createPlaceholder(match, 'number'));

      // 6. Functions (excluir keywords que já foram processadas)
      code = code.replace(/\b([a-zA-Z_$][\w$]*)\s*(?=\()/g, (match, funcName) => {
         // Não processar se for um placeholder de keyword
         if (funcName.startsWith('__TOKEN_')) {
            return match;
         }
         return createPlaceholder(funcName, 'function') + match.slice(funcName.length);
      });

      // 7. Punctuation
      code = code.replace(/([{}\[\];(),.:])/g, match => createPlaceholder(match, 'punctuation'));

      // Substituir placeholders pelos tokens finais
      for (let i = 0; i < tokens.length; i++) {
         code = code.replace(`__TOKEN_${i}__`, tokens[i]);
      }

      return code;
   }

   static css(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // comments
      code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>');
      // selectors
      // evitar consumir quebras de linha ou chaves no selector
      code = code.replace(/(^|\}|\n)([^\{\n]+?)(\s*\{)/g, (m, pre, sel, brace) => `${pre}<span class="token selector">${sel.trim()}</span>${brace}`);
      // properties
      code = code.replace(/([\w\-]+)(\s*:\s*)/g, '<span class="token property">$1</span>$2');
      // values
      code = code.replace(/(:\s*)([^;\}]+)/g, '$1<span class="token value">$2</span>');
      // numbers
      code = code.replace(/(\b\d+(?:\.\d+)?(px|em|rem|%|vh|vw|ch|ex|cm|mm|in|pt|pc)?\b)/g, '<span class="token number">$1</span>');
      // punctuation
      code = code.replace(/([{}:;,])/g, '<span class="token punctuation">$1</span>');
      return code;
   }

   static php(code) {
      // Escapar HTML primeiro (sempre)
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Usar placeholders temporários para evitar conflitos
      const tokens = [];
      let tokenIndex = 0;

      // Função para criar placeholder
      function createPlaceholder(content, className) {
         const placeholder = `__TOKEN_${tokenIndex}__`;
         tokens[tokenIndex] = `<span class="token ${className}">${content}</span>`;
         tokenIndex++;
         return placeholder;
      }

      // 1. PHP Tags primeiro
      code = code.replace(/(&lt;\?php|&lt;\?)/gi, match => createPlaceholder(match, 'important'));
      code = code.replace(/(\?&gt;)/gi, match => createPlaceholder(match, 'important'));

      // 2. Comentários
      code = code.replace(/(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)/g, match => createPlaceholder(match, 'comment'));

      // 3. Strings (aspas duplas e simples)
      code = code.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, match => createPlaceholder(match, 'string'));

      // 4. Keywords
      code = code.replace(
         /\b(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/g,
         match => createPlaceholder(match, 'keyword')
      );

      // 5. Variables ($variavel)
      code = code.replace(/(\$[a-zA-Z_][\w]*)/g, match => createPlaceholder(match, 'variable'));

      // 6. Numbers
      code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, match => createPlaceholder(match, 'number'));

      // 7. Functions (nome antes de parênteses)
      code = code.replace(/\b([a-zA-Z_][\w]*)\s*(?=\()/g, (match, funcName) => {
         // Não processar se for um placeholder
         if (funcName.startsWith('__TOKEN_')) {
            return match;
         }
         return createPlaceholder(funcName, 'function') + match.slice(funcName.length);
      });

      // 8. Punctuation
      code = code.replace(/([{}\[\];(),.:])/g, match => createPlaceholder(match, 'punctuation'));

      // Substituir placeholders pelos tokens finais
      for (let i = 0; i < tokens.length; i++) {
         code = code.replace(`__TOKEN_${i}__`, tokens[i]);
      }

      return code;
   }

   static json(code) {
      // Escapar HTML primeiro
      code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // strings
      code = code.replace(/("[^"]*")/g, '<span class="token string">$1</span>');
      // numbers
      code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>');
      // booleans/null
      code = code.replace(/\b(true|false|null)\b/g, '<span class="token boolean">$1</span>');
      // punctuation
      code = code.replace(/([{}\[\]:,])/g, '<span class="token punctuation">$1</span>');
      return code;
   }
}

// Método initAll para compatibilidade com WfAjax
WfCode.initAll = function (container = document) {
   // Inicializar imediatamente
   WfCode.highlightAll(container);
};

// Registro no WebFull - SEMPRE registrar no window também
if (typeof window !== 'undefined') {
   window.WfCode = WfCode;

   if (window.WebFull) {
      window.WebFull.modules.WfCode = WfCode;
   }
}

// Inicialização automática apenas se WebFull não estiver presente
if (typeof window !== 'undefined' && !window.WebFull) {
   // Função para inicializar
   function initWfCode() {
      try {
         WfCode.highlightAll(document);
      } catch (error) {
         console.error('WfCode: Erro ao inicializar:', error);
      }
   }

   // Inicialização automática após carregamento
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWfCode);
   } else {
      initWfCode();
   }
}
