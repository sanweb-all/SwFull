(function(window, document) {
'use strict';

// WfPageTransition.js - Transições de Página/Conteúdo inspiradas no Codrops PageTransitions
// https://tympanus.net/Development/PageTransitions/
// Autor: SandroWeb + AI

const swptCSS = `
.pt-perspective {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  transform-style: preserve-3d;
}
.pt-page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
.pt-page-current,
.no-js .pt-page {
  visibility: visible;
  z-index: 1;
}
.pt-page-ontop {
  z-index: 999;
}

/* --- Efeitos principais do Codrops --- */
.pt-page-moveToLeft { animation: pt-moveToLeft 0.7s both; }
.pt-page-moveFromRight { animation: pt-moveFromRight 0.7s both; }
.pt-page-moveToRight { animation: pt-moveToRight 0.7s both; }
.pt-page-moveFromLeft { animation: pt-moveFromLeft 0.7s both; }
.pt-page-moveToTop { animation: pt-moveToTop 0.7s both; }
.pt-page-moveFromBottom { animation: pt-moveFromBottom 0.7s both; }
.pt-page-moveToBottom { animation: pt-moveToBottom 0.7s both; }
.pt-page-moveFromTop { animation: pt-moveFromTop 0.7s both; }

@keyframes pt-moveToLeft { to { transform: translateX(-100%); } }
@keyframes pt-moveFromRight { from { transform: translateX(100%); } to { transform: none; } }
@keyframes pt-moveToRight { to { transform: translateX(100%); } }
@keyframes pt-moveFromLeft { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes pt-moveToTop { to { transform: translateY(-100%); } }
@keyframes pt-moveFromBottom { from { transform: translateY(100%); } to { transform: none; } }
@keyframes pt-moveToBottom { to { transform: translateY(100%); } }
@keyframes pt-moveFromTop { from { transform: translateY(-100%); } to { transform: none; } }

.pt-page-fade { animation: pt-fade 0.7s both; }
.pt-page-fadeFromRight { animation: pt-fadeFromRight 0.7s both; }
.pt-page-fadeFromLeft { animation: pt-fadeFromLeft 0.7s both; }
.pt-page-fadeFromTop { animation: pt-fadeFromTop 0.7s both; }
.pt-page-fadeFromBottom { animation: pt-fadeFromBottom 0.7s both; }
@keyframes pt-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes pt-fadeFromRight { from { opacity: 0; transform: translateX(100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromLeft { from { opacity: 0; transform: translateX(-100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromTop { from { opacity: 0; transform: translateY(-100%);} to { opacity: 1; transform: none; } }
@keyframes pt-fadeFromBottom { from { opacity: 0; transform: translateY(100%);} to { opacity: 1; transform: none; } }

.pt-page-scaleDown { animation: scaleDown .7s ease both; }
.pt-page-scaleUp { animation: scaleUp .7s ease both; }
@keyframes scaleDown { to { transform: scale(.8); } }
@keyframes scaleUp { from { transform: scale(.8); } }

.pt-page-flipRight { animation: pt-flipRight 0.7s both; }
.pt-page-flipLeft { animation: pt-flipLeft 0.7s both; }
.pt-page-flipTop { animation: pt-flipTop 0.7s both; }
.pt-page-flipBottom { animation: pt-flipBottom 0.7s both; }
@keyframes pt-flipRight { from { transform: perspective(600px) rotateY(0); } to { transform: perspective(600px) rotateY(1turn); } }
@keyframes pt-flipLeft { from { transform: perspective(600px) rotateY(0); } to { transform: perspective(600px) rotateY(-1turn); } }
@keyframes pt-flipTop { from { transform: perspective(600px) rotateX(0); } to { transform: perspective(600px) rotateX(-1turn); } }
@keyframes pt-flipBottom { from { transform: perspective(600px) rotateX(0); } to { transform: perspective(600px) rotateX(1turn); } }

/* --- Efeitos adicionais do Codrops --- */
.pt-page-pushToLeft { animation: pt-pushToLeft 0.7s both; }
.pt-page-pushFromRight { animation: pt-pushFromRight 0.7s both; }
.pt-page-pushToRight { animation: pt-pushToRight 0.7s both; }
.pt-page-pushFromLeft { animation: pt-pushFromLeft 0.7s both; }
.pt-page-pushToTop { animation: pt-pushToTop 0.7s both; }
.pt-page-pushFromBottom { animation: pt-pushFromBottom 0.7s both; }
.pt-page-pushToBottom { animation: pt-pushToBottom 0.7s both; }
.pt-page-pushFromTop { animation: pt-pushFromTop 0.7s both; }
@keyframes pt-pushToLeft { to { transform: translateX(-100%) scale(.8); } }
@keyframes pt-pushFromRight { from { transform: translateX(100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToRight { to { transform: translateX(100%) scale(.8); } }
@keyframes pt-pushFromLeft { from { transform: translateX(-100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToTop { to { transform: translateY(-100%) scale(.8); } }
@keyframes pt-pushFromBottom { from { transform: translateY(100%) scale(.8); } to { transform: none; } }
@keyframes pt-pushToBottom { to { transform: translateY(100%) scale(.8); } }
@keyframes pt-pushFromTop { from { transform: translateY(-100%) scale(.8); } to { transform: none; } }

.pt-page-foldLeft { animation: pt-foldLeft 0.7s both; }
.pt-page-moveFromRight.pt-page-ontop { animation: pt-moveFromRight 0.7s both; }
@keyframes pt-foldLeft { to { transform: rotateY(90deg) scale(.8); } }

.pt-page-roomToLeft { animation: pt-roomToLeft 0.7s both; }
.pt-page-roomFromRight { animation: pt-roomFromRight 0.7s both; }
@keyframes pt-roomToLeft { to { transform: translateX(-100%) rotateY(90deg); } }
@keyframes pt-roomFromRight { from { transform: translateX(100%) rotateY(-90deg); } to { transform: none; } }

.pt-page-cubeToLeft { animation: pt-cubeToLeft 0.7s both; }
.pt-page-cubeFromRight { animation: pt-cubeFromRight 0.7s both; }
@keyframes pt-cubeToLeft { to { transform: translateX(-100%) rotateY(90deg); } }
@keyframes pt-cubeFromRight { from { transform: translateX(100%) rotateY(-90deg); } to { transform: none; } }

.pt-page-carouselToLeft { animation: pt-carouselToLeft 0.7s both; }
.pt-page-carouselFromRight { animation: pt-carouselFromRight 0.7s both; }
@keyframes pt-carouselToLeft { to { transform: translateX(-100%) scale(.8) rotateY(30deg); } }
@keyframes pt-carouselFromRight { from { transform: translateX(100%) scale(.8) rotateY(-30deg); } to { transform: none; } }

.pt-page-fall { animation: pt-fall 0.7s both; }
@keyframes pt-fall { to { transform: translateY(100%) rotateZ(30deg) scale(.8); } }

.pt-page-newspaper { animation: pt-newspaper 0.7s both; }
@keyframes pt-newspaper { to { transform: scale(0.2) rotateZ(720deg); } }

.pt-page-glueLeft { animation: pt-glueLeft 0.7s both; }
.pt-page-glueFromRight { animation: pt-glueFromRight 0.7s both; }
@keyframes pt-glueLeft { to { transform: translateX(-100%) skewX(30deg); } }
@keyframes pt-glueFromRight { from { transform: translateX(100%) skewX(-30deg); } to { transform: none; } }

.pt-page-sideLeft { animation: pt-sideLeft 0.7s both; }
.pt-page-sideFromRight { animation: pt-sideFromRight 0.7s both; }
@keyframes pt-sideLeft { to { transform: translateX(-100%) scaleY(.8); } }
@keyframes pt-sideFromRight { from { transform: translateX(100%) scaleY(.8); } to { transform: none; } }

/* Adicione outros efeitos conforme necessário */

.pt-page-animating { pointer-events: none; }

@media (max-width: 600px) {
  .pt-page { min-height: 120px; }
}
`;

// Mapeamento dos efeitos para classes de entrada/saída (Codrops)
const EFFECTS = {
  // Move
  moveToLeft: {
    outClass: "pt-page-moveToLeft",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  moveToRight: {
    outClass: "pt-page-moveToRight",
    inClass: "pt-page-moveFromLeft pt-page-ontop",
  },
  moveToTop: {
    outClass: "pt-page-moveToTop",
    inClass: "pt-page-moveFromBottom pt-page-ontop",
  },
  moveToBottom: {
    outClass: "pt-page-moveToBottom",
    inClass: "pt-page-moveFromTop pt-page-ontop",
  },
  moveFromLeft: {
    outClass: "pt-page-moveFromLeft",
    inClass: "pt-page-moveToRight pt-page-ontop",
  },
  moveFromRight: {
    outClass: "pt-page-moveFromRight",
    inClass: "pt-page-moveToLeft pt-page-ontop",
  },
  moveFromTop: {
    outClass: "pt-page-moveFromTop",
    inClass: "pt-page-moveToBottom pt-page-ontop",
  },
  moveFromBottom: {
    outClass: "pt-page-moveFromBottom",
    inClass: "pt-page-moveToTop pt-page-ontop",
  },

  // Fade
  fade: { outClass: "pt-page-fade", inClass: "pt-page-fade pt-page-ontop" },
  fadeFromRight: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromRight pt-page-ontop",
  },
  fadeFromLeft: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromLeft pt-page-ontop",
  },
  fadeFromTop: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromTop pt-page-ontop",
  },
  fadeFromBottom: {
    outClass: "pt-page-fade",
    inClass: "pt-page-fadeFromBottom pt-page-ontop",
  },
  fadeLeft: {
    outClass: "pt-page-fadeFromLeft",
    inClass: "pt-page-fadeFromRight pt-page-ontop",
  },
  fadeRight: {
    outClass: "pt-page-fadeFromRight",
    inClass: "pt-page-fadeFromLeft pt-page-ontop",
  },
  fadeTop: {
    outClass: "pt-page-fadeFromTop",
    inClass: "pt-page-fadeFromBottom pt-page-ontop",
  },
  fadeBottom: {
    outClass: "pt-page-fadeFromBottom",
    inClass: "pt-page-fadeFromTop pt-page-ontop",
  },

  // Push
  pushToLeft: {
    outClass: "pt-page-pushToLeft",
    inClass: "pt-page-pushFromRight pt-page-ontop",
  },
  pushToRight: {
    outClass: "pt-page-pushToRight",
    inClass: "pt-page-pushFromLeft pt-page-ontop",
  },
  pushToTop: {
    outClass: "pt-page-pushToTop",
    inClass: "pt-page-pushFromBottom pt-page-ontop",
  },
  pushToBottom: {
    outClass: "pt-page-pushToBottom",
    inClass: "pt-page-pushFromTop pt-page-ontop",
  },
  pushFromLeft: {
    outClass: "pt-page-pushFromLeft",
    inClass: "pt-page-pushToRight pt-page-ontop",
  },
  pushFromRight: {
    outClass: "pt-page-pushFromRight",
    inClass: "pt-page-pushToLeft pt-page-ontop",
  },
  pushFromTop: {
    outClass: "pt-page-pushFromTop",
    inClass: "pt-page-pushToBottom pt-page-ontop",
  },
  pushFromBottom: {
    outClass: "pt-page-pushFromBottom",
    inClass: "pt-page-pushToTop pt-page-ontop",
  },

  // Fold
  foldLeft: {
    outClass: "pt-page-foldLeft",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  // foldRight, foldTop, foldBottom podem ser implementados conforme o CSS

  // Room
  roomToLeft: {
    outClass: "pt-page-roomToLeft",
    inClass: "pt-page-roomFromRight pt-page-ontop",
  },
  // roomToRight, roomToTop, roomToBottom podem ser implementados conforme o CSS

  // Cube
  cubeToLeft: {
    outClass: "pt-page-cubeToLeft",
    inClass: "pt-page-cubeFromRight pt-page-ontop",
  },
  // cubeToRight, cubeToTop, cubeToBottom podem ser implementados conforme o CSS

  // Carousel
  carouselToLeft: {
    outClass: "pt-page-carouselToLeft",
    inClass: "pt-page-carouselFromRight pt-page-ontop",
  },
  // carouselToRight, carouselToTop, carouselToBottom podem ser implementados conforme o CSS

  // Glue
  glueLeft: {
    outClass: "pt-page-glueLeft",
    inClass: "pt-page-glueFromRight pt-page-ontop",
  },
  // glueRight, glueTop, glueBottom podem ser implementados conforme o CSS

  // Side
  sideLeft: {
    outClass: "pt-page-sideLeft",
    inClass: "pt-page-sideFromRight pt-page-ontop",
  },
  // sideRight, sideTop, sideBottom podem ser implementados conforme o CSS

  // Outros efeitos
  fall: {
    outClass: "pt-page-fall",
    inClass: "pt-page-moveFromBottom pt-page-ontop",
  },
  newspaper: {
    outClass: "pt-page-newspaper",
    inClass: "pt-page-moveFromRight pt-page-ontop",
  },
  scaleDown: {
    outClass: "pt-page-scaleDown",
    inClass: "pt-page-scaleUp pt-page-ontop",
  },
  scaleUp: {
    outClass: "pt-page-scaleUp",
    inClass: "pt-page-scaleDown pt-page-ontop",
  },
  flipRight: {
    outClass: "pt-page-flipRight",
    inClass: "pt-page-flipRight pt-page-ontop",
  },
  flipLeft: {
    outClass: "pt-page-flipLeft",
    inClass: "pt-page-flipLeft pt-page-ontop",
  },
  flipTop: {
    outClass: "pt-page-flipTop",
    inClass: "pt-page-flipTop pt-page-ontop",
  },
  flipBottom: {
    outClass: "pt-page-flipBottom",
    inClass: "pt-page-flipBottom pt-page-ontop",
  },
};

class WfPageTransition {
  static injectCSS() {
    if (!document.getElementById("wfpt-styles")) {
      const style = document.createElement("style");
      style.id = "wfpt-styles";
      style.textContent = swptCSS;
      document.head.appendChild(style);
    }
  }

  /**
   * Troca para a página de índice ou id fornecido, aplicando o efeito desejado.
   * @param {string|number} container - Seletor ou elemento do container principal (deve ter .pt-perspective)
   * @param {number|string} to - Índice ou id da página destino
   * @param {string} effect - Nome do efeito (moveToLeft, fade, etc)
   */
  static transitionTo(container, to, effect = "moveToLeft") {
    WfPageTransition.injectCSS();
    if (typeof container === "string")
      container = document.querySelector(container);
    if (!container) return;
    if (!EFFECTS[effect]) effect = "moveToLeft";
    const pages = Array.from(container.querySelectorAll(".pt-page"));
    if (!pages.length) return;

    let current = pages.findIndex((p) =>
      p.classList.contains("pt-page-current")
    );
    if (current === -1) current = 0;
    let next =
      typeof to === "number"
        ? to
        : pages.findIndex(
            (p) => p.id === to || p.getAttribute("data-id") === to
          );
    if (next === -1 || next === current) return;

    const currentPage = pages[current];
    const nextPage = pages[next];
    const { outClass, inClass } = EFFECTS[effect];

    // Prepara
    container.classList.add("pt-page-animating");
    let animCount = 0;
    let endCurrPage = false;
    let endNextPage = false;
    function cleanPageClasses(page) {
      // Mantém apenas pt-page, pt-page-current e pageX
      page.className = page.className
        .split(" ")
        .filter(
          (c) =>
            c === "pt-page" || c === "pt-page-current" || c.startsWith("page")
        )
        .join(" ");
    }
    function onCurrAnimEnd() {
      currentPage.removeEventListener("animationend", onCurrAnimEnd);
      currentPage.removeEventListener("webkitAnimationEnd", onCurrAnimEnd);
      endCurrPage = true;
      if (endNextPage) finishTransition();
    }
    function onNextAnimEnd() {
      nextPage.removeEventListener("animationend", onNextAnimEnd);
      nextPage.removeEventListener("webkitAnimationEnd", onNextAnimEnd);
      endNextPage = true;
      if (endCurrPage) finishTransition();
    }
    // Fallback de segurança caso animationend não dispare
    let safetyTimer = setTimeout(() => {
      finishTransition();
    }, 900);
    function finishTransition() {
      if (safetyTimer) { try { clearTimeout(safetyTimer); } catch (_) {} }
      // Limpa classes de efeito e .pt-page-ontop
      pages.forEach((p, i) => {
        p.classList.remove("pt-page-current", "pt-page-ontop");
        p.style.visibility = "hidden";
        cleanPageClasses(p);
      });
      nextPage.classList.add("pt-page-current");
      nextPage.style.visibility = "visible";
      container.classList.remove("pt-page-animating");
    }
    // Aplica classes de efeito
    nextPage.classList.add(...inClass.split(" "));
    nextPage.style.visibility = "visible";
    currentPage.classList.add(...outClass.split(" "));
    // Escuta animationend em ambas
    currentPage.addEventListener("animationend", onCurrAnimEnd);
    currentPage.addEventListener("webkitAnimationEnd", onCurrAnimEnd);
    nextPage.addEventListener("animationend", onNextAnimEnd);
    nextPage.addEventListener("webkitAnimationEnd", onNextAnimEnd);
  }

  // Inicialização declarativa: botões com WfPageTransition, data-to, data-effect
  static initAll(container = document) {
    WfPageTransition.injectCSS();
    // Garantir containers preparados
    const containers = container.querySelectorAll(".pt-perspective");
    containers.forEach((c) => {
      const pages = Array.from(c.querySelectorAll(".pt-page"));
      if (!pages.length) return;
      let current = pages.find((p) => p.classList.contains("pt-page-current"));
      if (!current) {
        current = pages[0];
        current.classList.add("pt-page-current");
      }
      pages.forEach((p) => {
        p.style.visibility = p === current ? "visible" : "hidden";
      });
    });
    const triggers = container.querySelectorAll("[WfPageTransition]");
    triggers.forEach((btn) => {
      if (btn._swptInit) return;
      btn._swptInit = true;
      btn.addEventListener("click", (e) => {
        const targetSel = btn.getAttribute("data-target") || ".pt-perspective";
        const to =
          btn.getAttribute("data-to") || btn.getAttribute("data-id") || 1;
        const effect =
          btn.getAttribute("data-effect") ||
          btn.getAttribute("WfPageTransition") ||
          "moveToLeft";
        WfPageTransition.transitionTo(
          targetSel,
          isNaN(to) ? to : parseInt(to),
          effect
        );
      });
    });
  }
}

  // Global Export
  if (typeof window !== 'undefined') {
    if (typeof window.WebFull !== 'undefined') {
      window.WebFull.modules.WfPageTransition = WfPageTransition;
    }
    window.WfPageTransition = WfPageTransition;
    
    // Auto-init
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => WfPageTransition.initAll());
    } else {
      WfPageTransition.initAll();
    }
  }
})(window, document);
