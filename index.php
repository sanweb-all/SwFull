<!DOCTYPE html>
<?php
// Define a URL base do projeto
define('URL', '');
?>
<html lang="pt-br" WfDay>

<head>
  <base href="/" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WebFull - Framework JavaScript e CSS</title>
  
  <link
    rel="stylesheet"
    href="<?php echo URL; ?>dist/webfull.min.css" />
  <link
    rel="stylesheet"
    href="<?php echo URL; ?>exemplo/css/alls.css" />
    lin
</head>

<body class="aniline">
  <main>
    <nav
      WfSidebar
      WfSidebar-close-on-outside="true"
      WfSidebar-close-on-click="true"
      WfSidebar-auto-close="true"
      WfSidebar-side="left">
      <div class="sidebar-header">
        <img
          src="<?php echo URL; ?>exemplo/images/sw.png"
          alt="SW" />
        <h1>
          WebFull
          <small>Documentação</small>
        </h1>
      </div>
      <!-- Menu -->
      <div class="menu-item">
        <div
          class="menu-simple"
          WfAjax
          WfAjax-url="<?php echo URL; ?>exemplo/blocos/_home.php"
          WfAjax-dest="Content"
          WfAjax-effect="fadeRight">
          <i class="wf wf-home-alt-2"></i>
          <span>Página Inicial</span>
        </div>
      </div>
      <!-- Cores -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-palette"></i>
          <span>Cores</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/cores_backgrounds.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-palette"></i> Backgrounds
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/cores_padroes.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-palette"></i> Cores Padrões
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/cores_degrade.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-palette"></i> Degrades e Efeitos
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/cores_textos.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-palette"></i> Cores em Textos
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/cores_padronizacoes.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-palette"></i> Padronizações
          </li>
        </ul>
      </div>

      <!-- Fontes -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-font"></i>
          <span>Fontes</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/fontes_tipos.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font"></i> Tipos
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/fontes_tamanhos.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font"></i> Tamanhos
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/fontes_espacamentos.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font"></i> Espaçamentos
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/fontes_margens.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font"></i> Margens
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/fontes_wrapbreak.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font"></i> Wrap/Break
          </li>
        </ul>
      </div>

      <!-- Containers -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-window"></i>
          <span>Containers</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_grades.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Grades
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_tabelas.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Tabelas
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_displays.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Displays
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_flex.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Flex
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_grid.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Grid
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_width.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Width
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/containers_height.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-window"></i> Height
          </li>
        </ul>
      </div>

      <!-- Animações -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-font-family"></i>
          <span>Animações</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/animacoes_animeline.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font-family"></i> Anime Line
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/animacoes_animemove.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font-family"></i> Anime Move
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/animacoes_wfanime.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-font-family"></i> Wf-Anime
          </li>
        </ul>
      </div>

      <!-- Página Inicial -->
      <div class="menu-item">
        <div
          class="menu-simple"
          WfAjax
          WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/icones.php"
          WfAjax-dest="Content"
          WfAjax-effect="fadeRight">
          <i class="wf wf-rocket"></i>
          <span>Icones</span>
        </div>
      </div>

      <!-- Úteis -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-box"></i>
          <span>Úteis</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_cards.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Cards
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_listmenu.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Listmenu
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_bordas.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Bordas
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_shadows.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Shadows
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_opacidades.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Opacidades
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_objectfit.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Object-Fit
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_overflow.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Overflow
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/uteis_zoons.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-box"></i> Zoons
          </li>
        </ul>
      </div>
      <!-- Formulários -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-file"></i>
          <span>Formulários</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/forms_forms.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i> Forms
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/forms_inputs.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i> Inputs
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/forms_selects.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i> Selects
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/forms_checks.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i> Checks & Radios
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosCSS/forms_btns.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-file"></i> Btns
          </li>
        </ul>
      </div>

      <!-- WF Core -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-crown"></i>
          <span>WF Core</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfajax.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfAjax
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfcontainer.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfContainer
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfdiv.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfDiv
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfday.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfDay
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfalert.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfAlert
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfcode.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-crown"></i> WfCode
          </li>
        </ul>
      </div>

      <!-- WF Conteúdos -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-cabinet"></i>
          <span>WF Conteúdos</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfaba.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfAba
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfaccord.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfAccord
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfmodal.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfModal
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpanel.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfPanel
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpanel1.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> SwPanelAjax
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wflessonstoggle.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfLessonsToggle
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfbadge.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfBadge
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftextarea.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-cabinet"></i> WfTextarea
          </li>
        </ul>
      </div>
      <!-- WF Animações -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-movie-play"></i>
          <span>WF Animações</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfanime.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfAnime
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfmove.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfMove
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wflazy.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfLazy
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfparallax.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfParallax
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfocult.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfOcult
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfreve.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfReve
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpagetransition.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-movie-play"></i> WfPageTransition
          </li>
        </ul>
      </div>

      <!-- WF Data -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-calendar-edit"></i>
          <span>WF Data</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftable.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-calendar-edit"></i> WfTable
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftable1.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-calendar-edit"></i> WfTableAjax
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfcotacao.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-calendar-edit"></i> WfCotacao
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpag.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-calendar-edit"></i> WfPag
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpaginfinite.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-calendar-edit"></i> WfPagInfinite
          </li>
        </ul>
      </div>

      <!-- WF Mídia -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-image-alt"></i>
          <span>WF Mídia</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfimg.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-image-alt"></i> WfImg
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfslid1.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-image-alt"></i> WfSlid1
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftext.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-image-alt"></i> WfText
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftype.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-image-alt"></i> WfType
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfload.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-image-alt"></i> WfLoad
          </li>
        </ul>
      </div>

      <!-- WF Utilitários -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-shape-square"></i>
          <span>WF Utilitários</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfpreload.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-shape-square"></i> WfPreLoad
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfnolink.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-shape-square"></i> WfNolink
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftool.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-shape-square"></i> WfTool
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftop.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-shape-square"></i> WfTop
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wflgpd.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-shape-square"></i> WfLgpd
          </li>
        </ul>
      </div>

      <!-- WF Navegação -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-navigation"></i>
          <span>WF Navegação</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfsidebar.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-navigation"></i> WfSidebar
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfscrollspy.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-navigation"></i> WfScrollSpy
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfnavbar.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-navigation"></i> WfNavbar
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfside.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-navigation"></i> WfSide
          </li>
        </ul>
      </div>

      <!-- WF Formulários -->
      <div class="menu-item">
        <div class="menu-header">
          <i class="wf wf-right-indent"></i>
          <span>WF Formulários</span>
          <i class="wf wf-chevron-down arrow"></i>
        </div>
        <ul class="submenu">
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wffile1.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfFile1
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wffile2.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfFile2
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wftextlimit.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfTextLimit
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfselect.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfSelect
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfmasc.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfMasc
          </li>
          <li
            WfAjax
            WfAjax-url="<?php echo URL; ?>exemplo/blocosJS/wfvalid.php"
            WfAjax-dest="Content"
            WfAjax-effect="fadeRight">
            <i class="wf wf-right-indent"></i> WfValid
          </li>
        </ul>
      </div>
    </nav>
    <article
      WfAjax
      id="Content"
      WfAjax-url="<?php echo URL; ?>exemplo/blocos/_home.php"
      WfAjax-dest="Content"
      WfAjax-effect="fadeRight"
      WfAjax-auto="true"></article>
  </main>
  <div WfTop></div>
  <script
    type="module"
    src="<?php echo URL; ?>dist/webfull.min.js"></script>
</body>

</html>