/**
 * WfContainer - Container Universal para JavaScript (BULLETPROOF)
 * Garante que TODO JavaScript funcione em QUALQUER contexto
 * SandroWeb - 2025
 */

// ===== FUNÇÃO PRINCIPAL SWCONTAINER =====
function WfContainer(callback, options = {}) {
  // Configurações padrão
  const config = {
    maxExecutions: options.maxExecutions || 100, // Proteção contra loops infinitos
    delay: options.delay || 50, // Delay entre execuções
    context: options.context || "global", // Contexto de execução
    ...options,
  };

  let executionCount = 0;
  let isExecuting = false;

  // Função de execução protegida
  function safeExecute() {
    if (isExecuting || executionCount >= config.maxExecutions) {
      return;
    }

    isExecuting = true;
    executionCount++;

    try {
      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      console.warn("WfContainer: Erro na execução:", error);
    } finally {
      isExecuting = false;
    }
  }

  // Executa imediatamente
  safeExecute();

  // Observa mudanças no DOM (MELHORADO E MAIS ROBUSTO)
  const observer = new MutationObserver((mutations) => {
    let shouldExecute = false;

    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Verifica se há elementos relevantes sendo adicionados
        for (let node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            // Element node
            try {
              // Verifica se é um elemento relevante ou contém elementos relevantes
              const hasRelevantAttribute =
                node.hasAttribute &&
                (node.hasAttribute("WfAjax") ||
                  node.hasAttribute("WfDiv") ||
                  node.hasAttribute("WfContainer") ||
                  node.hasAttribute("WfAlert") ||
                  node.hasAttribute("WfModal") ||
                  node.hasAttribute("WfAba") ||
                  node.hasAttribute("WfAccord") ||
                  node.hasAttribute("SwNav"));

              const hasRelevantClass =
                node.className &&
                (node.className.includes("wfajax-content") ||
                  node.className.includes("wfdiv-content") ||
                  node.className.includes("sw-"));

              const hasRelevantChildren =
                node.querySelector &&
                (node.querySelector("[WfAjax]") ||
                  node.querySelector("[WfDiv]") ||
                  node.querySelector("[WfContainer]") ||
                  node.querySelector("[WfAlert]") ||
                  node.querySelector("[WfModal]") ||
                  node.querySelector("[WfAba]") ||
                  node.querySelector("[WfAccord]") ||
                  node.querySelector("[SwNav]") ||
                  node.querySelector(".wfajax-content") ||
                  node.querySelector(".wfdiv-content"));

              if (
                hasRelevantAttribute ||
                hasRelevantClass ||
                hasRelevantChildren
              ) {
                shouldExecute = true;
                break;
              }
            } catch (error) {
              // Em caso de erro, executa por segurança
              shouldExecute = true;
              break;
            }
          }
        }
      }
    });

    // Executa apenas se necessário
    if (shouldExecute) {
      setTimeout(safeExecute, config.delay);
    }
  });

  // Observa todo o documento com configuração melhorada
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });

  // ===== EVENTOS UNIVERSALES (BULLETPROOF) =====

  // Eventos do WfAjax
  [
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos do WfDiv (NOVO)
  [
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
    "wfdiv:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos de componentes (NOVO) - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Eventos de componentes (NOVO)
  [
    "wfmodal:opened",
    "wfmodal:closed",
    "wfaba:changed",
    "wfaccord:opened",
    "wfaccord:closed",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(safeExecute, config.delay);
    });
  });

  // Evento do WEBFULL (NOVO)
  document.addEventListener("webfull-ready", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de mudança de tema (NOVO)
  document.addEventListener("wfday:changed", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de redimensionamento (NOVO)
  window.addEventListener("resize", () => {
    setTimeout(safeExecute, config.delay);
  });

  // Evento de scroll (para componentes que dependem de scroll)
  window.addEventListener("scroll", () => {
    setTimeout(safeExecute, config.delay);
  });

  // ===== PROTEÇÃO CONTRA LOOPS INFINITOS =====
  let lastExecutionTime = 0;
  const minInterval = 100; // Mínimo 100ms entre execuções

  function throttledExecute() {
    const now = Date.now();
    if (now - lastExecutionTime >= minInterval) {
      lastExecutionTime = now;
      safeExecute();
    }
  }

  // Retorna o observer e funções de controle
  return {
    observer: observer,
    execute: safeExecute,
    throttledExecute: throttledExecute,
    disconnect: () => observer.disconnect(),
    executionCount: () => executionCount,
    reset: () => {
      executionCount = 0;
      isExecuting = false;
    },
  };
}

// ===== FUNÇÃO PARA ELEMENTOS ESPECÍFICOS (MELHORADA) =====
function SwContainerElement(selector, callback, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 50,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;
  let processedElements = new WeakSet();

  function processElements() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        if (!processedElements.has(element)) {
          processedElements.add(element);
          callback(element, index);
        }
      });
    } catch (error) {
      console.warn("SwContainerElement: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  processElements();

  // Observa mudanças com proteção
  const observer = new MutationObserver(() => {
    setTimeout(processElements, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(processElements, config.delay);
    });
  });

  return {
    observer: observer,
    process: processElements,
    disconnect: () => observer.disconnect(),
    reset: () => {
      processedElements = new WeakSet();
      executionCount = 0;
    },
  };
}

// ===== FUNÇÃO PARA MÚLTIPLAS AÇÕES (MELHORADA) =====
function SwContainerMulti(actions, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 50,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;

  function executeAll() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      actions.forEach((action, index) => {
        if (typeof action === "function") {
          action();
        }
      });
    } catch (error) {
      console.warn("SwContainerMulti: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  executeAll();

  // Observa mudanças
  const observer = new MutationObserver(() => {
    setTimeout(executeAll, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(executeAll, config.delay);
    });
  });

  return {
    observer: observer,
    execute: executeAll,
    disconnect: () => observer.disconnect(),
    reset: () => {
      executionCount = 0;
    },
  };
}

// ===== FUNÇÃO PARA CONTEXTO ESPECÍFICO (NOVO) =====
function SwContainerContext(context, callback, options = {}) {
  const config = {
    maxExecutions: options.maxExecutions || 30,
    delay: options.delay || 50,
    ...options,
  };

  let executionCount = 0;

  function executeInContext() {
    if (executionCount >= config.maxExecutions) {
      return;
    }

    executionCount++;

    try {
      // Executa no contexto específico
      if (typeof callback === "function") {
        callback(context);
      }
    } catch (error) {
      console.warn("SwContainerContext: Erro na execução:", error);
    }
  }

  // Executa imediatamente
  executeInContext();

  // Observa mudanças
  const observer = new MutationObserver(() => {
    setTimeout(executeInContext, config.delay);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Eventos universais - Priorizar webfull-ready
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfdiv:loaded",
    "wfdiv:processed",
    "wfdiv:success",
  ].forEach((event) => {
    document.addEventListener(event, () => {
      setTimeout(executeInContext, config.delay);
    });
  });

  return {
    observer: observer,
    execute: executeInContext,
    disconnect: () => observer.disconnect(),
    reset: () => {
      executionCount = 0;
    },
  };
}

// ===== DISPONIBILIZA GLOBALMENTE =====
window.WfContainer = WfContainer;
window.SwContainerElement = SwContainerElement;
window.SwContainerMulti = SwContainerMulti;
window.SwContainerContext = SwContainerContext;

// ===== EXEMPLOS DE USO =====
// Exemplo 1: Código simples (BULLETPROOF)
// WfContainer(() => {
//    // exemplo: código executado em qualquer contexto
// });

// Exemplo 2: Menu acordeão (MELHORADO)
// WfContainer(() => {
//    document.querySelectorAll('.menu-header').forEach(header => {
//       if (!header._accordionSetup) {
//          header._accordionSetup = true;
//          header.addEventListener('click', () => {
//             const submenu = header.parentElement.querySelector('.submenu');
//             submenu.classList.toggle('active');
//             header.classList.toggle('active');
//          });
//       }
//    });
// });

// Exemplo 3: Elementos específicos (PROTEGIDO)
// SwContainerElement('.sidebar-toggle', (element) => {
//    element.addEventListener('click', () => {
//       document.querySelector('.sidebar').classList.toggle('open');
//    });
// });

// Exemplo 4: Múltiplas ações (SEGURAS)
// SwContainerMulti([
//    () => { /* ação 1 */ },
//    () => { /* ação 2 */ },
//    () => { /* ação 3 */ }
// ]);

// Exemplo 5: Contexto específico (NOVO)
// SwContainerContext(document.getElementById('sidebar'), (context) => {
//    // Código que roda apenas no contexto do sidebar
// });
