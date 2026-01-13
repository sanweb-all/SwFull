(function (window, document) {
  "use strict";

  /**
   * WfAlert - Sistema de Alertas Padrão do WEBFULL Framework
   * @author SandroWeb
   * @version 7.0 - Refatorado para Classe ES6
   */
  class WfAlert {
    // #region Propriedades Estáticas
    static #alertStacks = {};
    static #cssLoaded = false;

    static config = {
      defaultDuration: 3000,
      defaultPosition: "topRight",
      stackSpacing: 64, // Espaçamento entre alertas empilhados
    };
    // #endregion

    // #region API Pública (Métodos Estáticos)

    // --- Métodos de Alerta (Português) ---
    static sucesso(message, duration, position) {
      this.#createAlert(message, "sucesso", duration, position);
    }
    static erro(message, duration, position) {
      this.#createAlert(message, "erro", duration, position);
    }
    static alerta(message, duration, position) {
      this.#createAlert(message, "alerta", duration, position);
    }
    static infor(message, duration, position) {
      this.#createAlert(message, "infor", duration, position);
    }
    static ativado(message, duration, position) {
      this.#createAlert(message, "ativado", duration, position);
    }
    static desativado(message, duration, position) {
      this.#createAlert(message, "desativado", duration, position);
    }
    static base(message, duration, position) {
      this.#createAlert(message, "base", duration, position);
    }

    // --- Métodos de Alerta (Inglês) ---
    static success(message, duration, position) {
      this.sucesso(message, duration, position);
    }
    static error(message, duration, position) {
      this.erro(message, duration, position);
    }
    static warning(message, duration, position) {
      this.alerta(message, duration, position);
    }
    static info(message, duration, position) {
      this.infor(message, duration, position);
    }
    static activated(message, duration, position) {
      this.ativado(message, duration, position);
    }
    static deactivated(message, duration, position) {
      this.desativado(message, duration, position);
    }

    // --- Métodos Utilitários ---
    static show(message, type, duration, position) {
      this.#createAlert(message, type, duration, position);
    }

    static confirmar(message, callback) {
      this.#createConfirm(message, callback);
    }

    static clearAll() {
      const alerts = document.querySelectorAll('[class*="wfalert-"]');
      alerts.forEach((alert) => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      });
      // Limpar pilhas
      Object.keys(this.#alertStacks).forEach((key) => {
        this.#alertStacks[key] = [];
      });
    }

    static setConfig(newConfig) {
      Object.assign(this.config, newConfig);
    }

    // --- Compatibilidade com WebfullLoader ---
    static initAll(container) {
      this.#loadComponentCSS();
      try {
        this.#processPendingAlerts();
      } catch (_) {}
    }

    // #endregion

    // #region Lógica Interna (Métodos Privados Estáticos)
    static #processPendingAlerts() {
      try {
        let arr = [];
        try {
          const qs = new URLSearchParams(location.search).get("wfalert");
          if (qs) {
            try {
              arr = JSON.parse(decodeURIComponent(qs));
            } catch (_) {
              try {
                arr = JSON.parse(qs);
              } catch (_) {}
            }
          }
        } catch (_) {}
        if (!Array.isArray(arr) || arr.length === 0) {
          try {
            const m = (document.cookie || "").match(
              /(?:^|; )wf-alerts=([^;]+)/
            );
            if (m) {
              let raw = m[1];
              try {
                raw = decodeURIComponent(raw);
              } catch (_) {}
              try {
                arr = JSON.parse(raw);
              } catch (_) {
                try {
                  arr = JSON.parse(m[1]);
                } catch (_) {
                  arr = [];
                }
              }
            }
          } catch (_) {}
        }
        if (!Array.isArray(arr) || arr.length === 0) return;
        arr.forEach((it) => {
          const msg = it && it.message ? it.message : "";
          const t = it && it.type ? it.type : "infor";
          const d = it && it.duration ? it.duration : 3000;
          const p = it && it.position ? it.position : "topRight";
          if (typeof this[t] === "function") this[t](msg, d, p);
          else this.show(msg, t, d, p);
        });
        try {
          document.cookie =
            "wf-alerts=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        } catch (_) {}
        try {
          const url = new URL(location.href);
          url.searchParams.delete("wfalert");
          history.replaceState(null, "", url.toString());
        } catch (_) {}
      } catch (_) {}
    }

    static #createAlert(message, type, duration, position) {
      this.#loadComponentCSS();

      // Evita duplicatas exatas visíveis (opcional, mas bom para evitar spam)
      // Aqui vamos permitir alertas repetidos pois é comum, mas poderíamos filtrar.

      const alertType = type || "base";
      const alertPosition = position || this.config.defaultPosition;
      const alertDuration =
        duration !== undefined ? duration : this.config.defaultDuration;

      const alertElement = document.createElement("div");
      alertElement.className = `wfalert-${alertType}-custom wfalert-${alertPosition}`;
      alertElement.dataset.message = message; // Útil para debug ou controle

      const icons = {
        sucesso: "wf-check-circle",
        erro: "wf-x-circle",
        alerta: "wf-error",
        infor: "wf-info-circle",
        ativado: "wf-toggle-right",
        desativado: "wf-toggle-left",
        base: "wf-message-rounded",
      };
      const icon = icons[alertType] || icons.base;
      alertElement.innerHTML = `<i class="wf ${icon} wf-icon"></i><div class="wfalert-content">${message}</div>`;

      // Lógica de empilhamento
      if (!this.#alertStacks[alertPosition]) {
        this.#alertStacks[alertPosition] = [];
      }
      const stackIndex = this.#alertStacks[alertPosition].length;
      const stackedPos = this.#calculateStackedPosition(
        alertPosition,
        stackIndex
      );

      // Aplica a posição inicial para o empilhamento
      Object.keys(stackedPos).forEach((key) => {
        if (
          key === "top" ||
          key === "bottom" ||
          key === "left" ||
          key === "right"
        ) {
          alertElement.style[key] = stackedPos[key];
        }
      });

      this.#alertStacks[alertPosition].push(alertElement);
      document.body.appendChild(alertElement);

      setTimeout(() => {
        alertElement.classList.add("show");
      }, 50);

      if (alertDuration > 0) {
        setTimeout(() => {
          alertElement.classList.remove("show");
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
            const index =
              this.#alertStacks[alertPosition].indexOf(alertElement);
            if (index > -1) {
              this.#alertStacks[alertPosition].splice(index, 1);
            }
            this.#reorganizeAlerts(alertPosition);
          }, 400);
        }, alertDuration);
      }
    }

    static #createConfirm(message, callback) {
      this.#loadComponentCSS();

      const existingDialog = document.querySelector(".custom-confirm-dialog");
      if (existingDialog) {
        existingDialog.remove();
      }

      const dialog = document.createElement("div");
      dialog.className = "custom-confirm-dialog";
      // Atributos de Acessibilidade
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-labelledby", "wfalert-confirm-title");

      dialog.innerHTML = `
      <div class="custom-confirm-content">
          <h3 id="wfalert-confirm-title" style="margin:0 0 15px; font-size: 1.8rem; font-weight: 600;">Confirmação</h3>
          <p>${message}</p>
          <div class="custom-confirm-buttons">
              <button class="custom-confirm-btn custom-confirm-yes">Sim</button>
              <button class="custom-confirm-btn custom-confirm-no">Não</button>
          </div>
      </div>
    `;
      document.body.appendChild(dialog);

      const btnYes = dialog.querySelector(".custom-confirm-yes");
      const btnNo = dialog.querySelector(".custom-confirm-no");

      // --- Lógica de Focus Trap ---
      const focusableElements = [btnYes, btnNo];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const focusTrapHandler = (e) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      // --- Fim da Lógica de Focus Trap ---

      setTimeout(() => dialog.classList.add("show"), 10);

      const closeModal = (result) => {
        dialog.classList.remove("show");
        dialog.addEventListener(
          "transitionend",
          () => {
            if (dialog.parentNode) dialog.remove();
            // Limpar listeners
            document.removeEventListener("keydown", escHandler);
            dialog.removeEventListener("keydown", focusTrapHandler);
            if (typeof callback === "function") callback(result);
          },
          {
            once: true,
          }
        );
      };

      btnYes.onclick = () => closeModal(true);
      btnNo.onclick = () => closeModal(false);
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closeModal(false);
      });

      const escHandler = (e) => {
        if (e.key === "Escape") closeModal(false);
      };

      // Adicionar listeners
      document.addEventListener("keydown", escHandler);
      dialog.addEventListener("keydown", focusTrapHandler);

      setTimeout(() => btnYes.focus(), 100);
    }

    static #reorganizeAlerts(position) {
      if (
        !this.#alertStacks[position] ||
        this.#alertStacks[position].length === 0
      )
        return;
      this.#alertStacks[position].forEach((alert, index) => {
        if (!alert.parentNode) return;
        const newPos = this.#calculateStackedPosition(position, index);
        Object.keys(newPos).forEach((key) => {
          if (
            key === "top" ||
            key === "bottom" ||
            key === "left" ||
            key === "right"
          ) {
            alert.style[key] = newPos[key];
          }
        });
      });
    }

    static #calculateStackedPosition(position, stackIndex) {
      const basePositions = {
        topLeft: {
          top: "20px",
          left: "20px",
        },
        topCenter: {
          top: "20px",
          left: "50%",
        },
        topRight: {
          top: "20px",
          right: "20px",
        },
        centerLeft: {
          top: "50%",
          left: "20px",
        },
        center: {
          top: "50%",
          left: "50%",
        },
        centerRight: {
          top: "50%",
          right: "20px",
        },
        bottomLeft: {
          bottom: "20px",
          left: "20px",
        },
        bottomCenter: {
          bottom: "20px",
          left: "50%",
        },
        bottomRight: {
          bottom: "20px",
          right: "20px",
        },
      };

      const base = basePositions[position];
      if (!base) return {};

      const offset = stackIndex * this.config.stackSpacing;

      const style = {};
      if (base.top) style.top = `calc(${base.top} + ${offset}px)`;
      if (base.bottom) style.bottom = `calc(${base.bottom} + ${offset}px)`;
      if (base.left) style.left = base.left;
      if (base.right) style.right = base.right;

      return style;
    }

    static #loadComponentCSS() {
      if (this.#cssLoaded || document.getElementById("webfull-wfalert-css")) {
        this.#cssLoaded = true;
        return;
      }
      const style = document.createElement("style");
      style.id = "webfull-wfalert-css";
      style.textContent = `
/* WfAlert CSS - Sistema de Alertas do WEBFULL Framework */

/* Variáveis CSS */
:root {
  --wfalert-success: var(--prin);
  --wfalert-error: var(--peri);
  --wfalert-warning: var(--aler);
  --wfalert-info: var(--info);
  --wfalert-activated: var(--suce);
  --wfalert-deactivated: #910000;
  --wfalert-base: #666;
}

html.wfday-day {
 --c1:rgb(243, 243, 243);
 --c2:rgb(145, 145, 145);
 }
html.wfday-night {
 --c1:rgb(29, 29, 29);
 --c2:rgb(73, 73, 73);
 }

/* Alertas */
.wfalert-base-custom,
.wfalert-sucesso-custom,
.wfalert-erro-custom,
.wfalert-alerta-custom,
.wfalert-infor-custom,
.wfalert-ativado-custom,
.wfalert-desativado-custom {
  position: fixed;
  padding: 1.4rem 3rem 1.4rem 5rem;
  border-radius: 0.6rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 400;
  z-index: 9999;
  box-shadow: 0 0.8rem 3.2rem rgba(0, 0, 0, 0.3);
  min-width: 38rem;
  word-wrap: break-word;
  font-family: var(--font1, sans-serif);
  text-shadow: 0.1rem 0.1rem 0.3rem #000;
  backdrop-filter: blur(1rem);
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  opacity: 0;
}

/* Cores dos alertas */
.wfalert-sucesso-custom { background: var(--wfalert-success); }
.wfalert-erro-custom { background: var(--wfalert-error); }
.wfalert-alerta-custom { background: var(--wfalert-warning); }
.wfalert-infor-custom { background: var(--wfalert-info); }
.wfalert-ativado-custom { background: var(--wfalert-activated); }
.wfalert-desativado-custom { background: var(--wfalert-deactivated); }
.wfalert-base-custom { background: var(--wfalert-base); }

/* Posições iniciais (antes da animação) */
.wfalert-topLeft { top: 2rem; left: 2rem; transform: translateX(-100%); }
.wfalert-topCenter { top: 2rem; left: 50%; transform: translateX(-50%); }
.wfalert-topRight { top: 2rem; right: 2rem; transform: translateX(100%); }

.wfalert-centerLeft { top: 50%; left: 2rem; transform: translateX(-100%) translateY(-50%); }
.wfalert-center { top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%) scale(0.8); }
.wfalert-centerRight { top: 50%; right: 2rem; transform: translateX(100%) translateY(-50%); }

.wfalert-bottomLeft { bottom: 2rem; left: 2rem; transform: translateX(-100%) translateY(100%); }
.wfalert-bottomCenter { bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100%); }
.wfalert-bottomRight { bottom: 2rem; right: 2rem; transform: translateX(100%) translateY(100%); }

/* Estados de exibição - removido pois opacity é controlado pelas animações */

/* Animações finais (após a animação) */
.wfalert-topLeft.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-topRight.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-topCenter.show {
  transform: translateX(-50%) translateY(0) !important;
  opacity: 1 !important;
}

.wfalert-centerLeft.show {
  transform: translateX(0) translateY(-50%) !important;
  opacity: 1 !important;
}
.wfalert-centerRight.show {
  transform: translateX(0) translateY(-50%) !important;
  opacity: 1 !important;
}
.wfalert-center.show {
  transform: translateX(-50%) translateY(-50%) scale(1) !important;
  opacity: 1 !important;
}

.wfalert-bottomLeft.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-bottomRight.show {
  transform: translateX(0) translateY(0) !important;
  opacity: 1 !important;
}
.wfalert-bottomCenter.show {
  transform: translateX(-50%) translateY(0) !important;
  opacity: 1 !important;
}

/* Ícones */
.wfalert-base-custom .wf-icon,
.wfalert-sucesso-custom .wf-icon,
.wfalert-erro-custom .wf-icon,
.wfalert-alerta-custom .wf-icon,
.wfalert-infor-custom .wf-icon,
.wfalert-ativado-custom .wf-icon,
.wfalert-desativado-custom .wf-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
}

/* Conteúdo */
.wfalert-content {
  margin-left: 1rem;
}

/* Diálogo de confirmação */
.custom-confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none; /* Permite cliques através do backdrop */
}

.custom-confirm-dialog.show {
  opacity: 1;
}

.custom-confirm-content {
  background: var(--wf-bg, #fff);
  color: var(--wf-color, #222);
  padding: 3rem;
  border-radius: 1.2rem;
  width: min(40rem, 90%);
  text-align: center;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.4);
  transform: scale(0.7) translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: auto; /* Restaura cliques no conteúdo */
}

.custom-confirm-dialog.show .custom-confirm-content {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.custom-confirm-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.custom-confirm-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.custom-confirm-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.custom-confirm-btn:hover::before {
  left: 100%;
}

.custom-confirm-yes {
  background: var(--btn-suce, #28a745);
  color: white;
}

.custom-confirm-no {
  background: var(--btn-secu, #6c757d);
  color: white;
}

.custom-confirm-yes:hover {
  background: var(--btn-suce-hover, #218838);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.custom-confirm-no:hover {
  background: var(--btn-secu-hover, #5a6268);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
}

.custom-confirm-btn:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

/* Mobile */
@media (max-width: 768px) {
  .wfalert-base-custom,
  .wfalert-sucesso-custom,
  .wfalert-erro-custom,
  .wfalert-alerta-custom,
  .wfalert-infor-custom,
  .wfalert-ativado-custom,
  .wfalert-desativado-custom {
    min-width: 90%;
    margin: 0 1rem;
    font-size: 1.5rem;
    padding: 1.2rem 2.5rem 1.2rem 4rem;
  }

  .custom-confirm-content {
    margin: 1rem;
    padding: 2rem;
  }

  .custom-confirm-buttons {
    flex-direction: column;
  }
}
    `;
      document.head.appendChild(style);
      this.#cssLoaded = true;
    }
    // #endregion
  }

  // Registro no WebFull
  if (window.WebFull) {
    window.WebFull.modules.WfAlert = WfAlert;
  }
  window.WfAlert = WfAlert;

  // Auto-inicialização para processar alertas pendentes (URL/Cookie)
  document.addEventListener("DOMContentLoaded", () => {
    WfAlert.initAll();
  });
})(window, document);
