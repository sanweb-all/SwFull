<section>
  <div class="g-xg">
    <div class="topo">
      <h1>WfLessonstoggle</h1>
      <nav class="listmenu-d">
        <ol class="listmenu">
          <li class="listmenu-item"><a href="#">Home</a></li>
          <li class="listmenu-item active">WfLessonstoggle</li>
        </ol>
      </nav>
    </div>
<section class="wflessonstogglex">
    <div class="g-xg">
      <div class="l">
        <div class="co12-g">
          <h3 class="wfpage">[Abrir/Fechar Formulário de Aula]</h3>
          <p>
            Componente para alternar (abrir/fechar) o formulário "Nova Aula"
            dentro de um painel. Usa animações de slide e não depende de
            <b>WfAccord</b>.
          </p>
        </div>
      </div>

      <div class="l">
        <div class="co6-g">
          <h3 class="wfpage">Demonstração</h3>
          <button
            id="lesson-create-toggle-btn"
            data-target="#lesson-create-accord"
            class="btn Bprin Tbran"
          >
            <i class="wf wf-toggle-right"></i> Abrir Formulário
          </button>
          <div
            id="lesson-create-accord"
            style="
              display: none;
              margin-top: 12px;
              border: 1px dashed var(--wf-border);
              padding: 12px;
              border-radius: 6px;
            "
          >
            <h5 class="wfpage" style="margin: 0 0 8px 0">Nova Aula</h5>
            <div class="l">
              <div class="co12-g">
                <label class="label">Título da Aula</label>
                <input
                  type="text"
                  class="input"
                  placeholder="Ex.: Aula 01 - Introdução"
                />
              </div>
              <div class="co12-g">
                <label class="label">Descrição</label>
                <textarea
                  class="textarea"
                  rows="3"
                  placeholder="Descrição breve"
                ></textarea>
              </div>
              <div class="co12-g">
                <button class="btn Bsuce">Salvar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="co6-g">
          <h4 class="wfpage">Como Usar</h4>
          <pre WfCode WfCode-language="html"><script type="text/plain">
<!-- Botão de toggle -->
<button id="lesson-create-toggle-btn"
        data-target="#lesson-create-accord">
  Abrir Formulário
</button>

<!-- Container do formulário -->
<div id="lesson-create-accord" style="display:none">
  <!-- Conteúdo do formulário aqui -->
</div>

<!-- Opcional: por data-attributes alternativos -->
<button class="lesson-create-toggle-btn" data-accord-selector="#lesson-create-accord">Abrir</button>
          </script></pre>
          <p>
            O componente procura automaticamente por botões com
            <code>#lesson-create-toggle-btn</code>,
            <code>.lesson-create-toggle-btn</code> ou
            <code>[data-lessons-toggle]</code> e identifica o alvo via
            <code>data-target</code>, <code>data-accord-selector</code> ou id
            padrão <code>lesson-create-accord</code>.
          </p>
        </div>
      </div>
  </section>
</section>