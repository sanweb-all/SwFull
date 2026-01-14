/**
 * WebFull - Biblioteca JavaScript Unificada
 * Versão: 1.0.0
 */

(function (window) {
  "use strict";

  // Definição principal da biblioteca
  const WebFull = {
    version: "1.0.0",

    // Objeto para armazenar módulos carregados
    modules: {},

    // Função de inicialização
    init: function () {
      this.setupGlobalEvents();
    },

    // Configuração de eventos globais
    setupGlobalEvents: function () {
      document.addEventListener("DOMContentLoaded", () => {
        this.initUI();
      });
    },

    // Inicialização da UI (para o framework CSS)
    initUI: function (container = document) {
      // Itera sobre todos os módulos registrados
      for (const key in this.modules) {
        if (this.modules.hasOwnProperty(key)) {
          const module = this.modules[key];

          // Verifica se o módulo tem um inicializador estático (padrão initAll ou autoInit)
          if (module && typeof module.initAll === "function") {
            try {
              module.initAll(container);
            } catch (e) {
              console.error(`Erro ao inicializar módulo ${key}:`, e);
            }
          } else if (module && typeof module.autoInit === "function") {
            // Suporte a nome alternativo
            try {
              module.autoInit(container);
            } catch (e) {
              console.error(`Erro ao inicializar módulo ${key}:`, e);
            }
          }
        }
      }
    },

    // Reinicializa todos os módulos em um container específico
    reinit: function (container = document) {
      this.initUI(container);
    },

    // Exemplo de um utilitário simples
    utils: {
      // Selecionar elemento (atalho)
      $: function (selector) {
        return document.querySelector(selector);
      },
      $$: function (selector) {
        return document.querySelectorAll(selector);
      },
    },
  };

  // Expor globalmente
  window.WebFull = WebFull;

  // Auto-inicialização se necessário, ou deixar para o usuário chamar
  WebFull.init();
})(window);
