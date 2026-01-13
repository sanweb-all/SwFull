/**
 * WfLessonsToggle
 * Toggle simples com efeito deslizar (slide) para abrir/fechar o formulário "Nova Aula" dentro do SwPanelAjax.
 * Sem dependência de WfAccord. Foco em robustez e simplicidade.
 */

class WfLessonsToggle {
  static _bound = false;

  // Utilitários de animação (slide)
  static _slideDown(el, duration = 250) {
    if (!el) return Promise.resolve();
    return new Promise((resolve) => {
      // Preparação: exibir o elemento
      el.style.removeProperty("display");
      const display = getComputedStyle(el).display;
      if (display === "none") el.style.display = "block";

      const height = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = "0px";
      el.style.transition = `height ${duration}ms ease`;
      // forçar reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.height = height + "px";

      const done = () => {
        el.removeEventListener("transitionend", done);
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition");
        el.style.display = "block";
        el.classList.add("wf-slide-open");
        resolve();
      };
      el.addEventListener("transitionend", done);
      // Fallback caso transitionend não dispare
      setTimeout(done, duration + 50);
    });
  }

  static _slideUp(el, duration = 250) {
    if (!el) return Promise.resolve();
    return new Promise((resolve) => {
      const height = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = height + "px";
      el.style.transition = `height ${duration}ms ease`;
      // forçar reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.height = "0px";

      const done = () => {
        el.removeEventListener("transitionend", done);
        el.style.display = "none";
        el.style.removeProperty("height");
        el.style.removeProperty("overflow");
        el.style.removeProperty("transition");
        el.classList.remove("wf-slide-open");
        resolve();
      };
      el.addEventListener("transitionend", done);
      setTimeout(done, duration + 50);
    });
  }

  static _slideToggle(el, duration = 250) {
    const isOpen = WfLessonsToggle._isOpen(el);
    return isOpen
      ? WfLessonsToggle._slideUp(el, duration)
      : WfLessonsToggle._slideDown(el, duration);
  }

  // Resolve o alvo (container do formulário) a partir do botão/DOM atual
  static _resolveTarget(toggleBtn, root = document) {
    if (!root) root = document;

    // 1) data-target-id ou data-accord-id
    const dataId = toggleBtn
      ? toggleBtn.getAttribute("data-target-id") ||
        toggleBtn.getAttribute("data-accord-id")
      : null;
    if (dataId) {
      const el =
        root.querySelector(`#${dataId}`) || document.getElementById(dataId);
      if (el) return el;
    }

    // 2) data-target ou data-accord-selector
    const dataSel = toggleBtn
      ? toggleBtn.getAttribute("data-target") ||
        toggleBtn.getAttribute("data-accord-selector")
      : null;
    if (dataSel) {
      const el = root.querySelector(dataSel) || document.querySelector(dataSel);
      if (el) return el;
    }

    // 3) IDs convencionais
    const idCandidate =
      root.querySelector("#lesson-create-accord") ||
      document.querySelector("#lesson-create-accord");
    if (idCandidate) return idCandidate;

    // 4) Buscar próximo alvo no container do painel
    const scope = toggleBtn
      ? toggleBtn.closest(".wfpanel1-content") || root
      : root;
    const selectors = [
      // Preferir containers diretos de formulário
      "#lesson-create",
      "#lesson-create-accord",
      ".lesson-create-accord",
      '[id*="lesson-create"]',
      // Tentar encontrar bloco de conteúdo conhecido
      "#lesson-create",
      ".lesson-create-accord",
      '[id*="lesson-create"]',
    ];
    for (const sel of selectors) {
      try {
        const candidate = scope.querySelector(sel);
        if (candidate) {
          return candidate;
        }
      } catch (_) {}
    }

    return null;
  }

  static _setBtnState(btn, isOpen) {
    if (!btn) return;
    const iconCls = isOpen ? "wf-toggle-left" : "wf-toggle-right";
    const label = isOpen ? "Fechar Formulário" : "Abrir Formulário";
    btn.innerHTML = `<i class='wf ${iconCls}'></i> ${label}`;
  }

  static _isOpen(target) {
    if (!target) return false;
    const cs = getComputedStyle(target);
    if (cs.display !== "none") return true;
    return (
      target.classList.contains("wf-slide-open") ||
      target.classList.contains("active") ||
      target.classList.contains("is-open")
    );
  }

  static _open(target) {
    if (!target) return;
    target.classList.add("active");
    target.classList.add("is-open");
    return WfLessonsToggle._slideDown(target);
  }

  static _close(target) {
    if (!target) return;
    target.classList.remove("active");
    target.classList.remove("is-open");
    return WfLessonsToggle._slideUp(target);
  }

  static _ensureClosed(target, btn) {
    if (!target) return;
    target.classList.remove("active");
    target.classList.remove("is-open");
    target.style.display = "none";
    WfLessonsToggle._setBtnState(btn, false);
  }

  static initAll(container = document) {
    // Encontrar possíveis botões de toggle:
    const candidates = [];
    // ID convencional
    const byId = container.querySelectorAll("#lesson-create-toggle-btn");
    byId.forEach((el) => candidates.push(el));
    // data attribute
    const byData = container.querySelectorAll("[data-lessons-toggle]");
    byData.forEach((el) => candidates.push(el));
    // classe opcional
    const byClass = container.querySelectorAll(".lesson-create-toggle-btn");
    byClass.forEach((el) => candidates.push(el));

    // Se nenhum encontrado, tentar documento inteiro como fallback
    if (candidates.length === 0) {
      const globalById = document.querySelectorAll("#lesson-create-toggle-btn");
      globalById.forEach((el) => candidates.push(el));
    }

    // Anexar para cada botão encontrado
    candidates.forEach((toggleBtn) => {
      if (!toggleBtn || toggleBtn.dataset.wfBound) return;
      const target = WfLessonsToggle._resolveTarget(toggleBtn, container);
      if (!target) return;

      // marcar bound
      toggleBtn.dataset.wfBound = "1";

      // Estado inicial: respeitar estado atual, não fechar se já estiver aberto
      const isOpenInit = WfLessonsToggle._isOpen(target);
      if (isOpenInit) {
        try {
          target.style.display = "block";
        } catch (_) {}
        WfLessonsToggle._setBtnState(toggleBtn, true);
      } else {
        WfLessonsToggle._ensureClosed(target, toggleBtn);
      }

      // Listener do botão
      toggleBtn.addEventListener("click", function (ev) {
        try {
          ev.preventDefault();
        } catch (_) {}
        try {
          ev.stopPropagation();
        } catch (_) {}
        const isOpen = WfLessonsToggle._isOpen(target);
        if (isOpen) WfLessonsToggle._close(target);
        else WfLessonsToggle._open(target);
        WfLessonsToggle._setBtnState(toggleBtn, !isOpen);
      });
    });

    WfLessonsToggle._bound = true;
  }
}

// Exportação Global
if (typeof window !== "undefined") {
  window.WfLessonsToggle = WfLessonsToggle;
  if (typeof window.WebFull !== "undefined") {
    window.WebFull.modules.WfLessonsToggle = WfLessonsToggle;
  }
}

// Auto-inicialização
if (typeof window !== "undefined") {
  const rebind = () => {
    try {
      WfLessonsToggle.initAll(document);
    } catch (e) {
      /* silencioso */
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rebind);
  } else {
    setTimeout(rebind, 0);
  }

  // Escutar eventos de carregamento dinâmico
  [
    "webfull-ready",
    "wfajax:loaded",
    "wfajax:processed",
    "wfajax:success",
    "wfajax:complete",
    "wfpanel1:loaded",
  ].forEach((evt) => {
    document.addEventListener(evt, rebind);
  });

  // Fallback por delegação: garante funcionamento mesmo se initAll não vinculou listeners
  document.addEventListener(
    "click",
    function _wf_lessons_toggle_delegate(ev) {
      try {
        const btn =
          ev.target &&
          ev.target.closest &&
          ev.target.closest(
            "[data-lessons-toggle], #lesson-create-toggle-btn, .lesson-create-toggle-btn"
          );
        if (!btn) return;
        // Se já existe listener vinculado, não intercepta
        if (btn.dataset && btn.dataset.wfBound) return;
        ev.preventDefault();
        ev.stopPropagation();
        const target = WfLessonsToggle._resolveTarget(btn, document);
        if (!target) return;
        const isOpen = WfLessonsToggle._isOpen(target);
        if (isOpen) WfLessonsToggle._close(target);
        else WfLessonsToggle._open(target);
        WfLessonsToggle._setBtnState(btn, !isOpen);
        // marcar como bound para evitar duplicação em futuros cliques
        try {
          btn.dataset.wfBound = "1";
        } catch (_) {}
      } catch (_) {}
    },
    true
  );
}
