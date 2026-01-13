# WebFull Framework

O **WebFull** é um framework Full Stack moderno, ultra leve e modular, desenvolvido para oferecer máxima performance, segurança e padronização. Construído com **PHP 8+**, **JavaScript Puro (Vanilla ES6+)** e **CSS Moderno (Variables/HSL)**, sem dependências externas.

![WebFull Banner](exemplo/images/sw.png)

## 🚀 Destaques

- **Zero Dependências**: Adeus `node_modules` gigante. Tudo o que você precisa em um único pacote.
- **Full Stack Puro**: Integração nativa entre PHP, JS e CSS sem frameworks pesados.
- **Ultra Leve**: Core minificado otimizado para alta performance.
- **Modular e Seguro**: Carregamento sob demanda e práticas de segurança (Prepared Statements, CSP friendly).
- **Dark Mode Nativo**: Arquitetura CSS com variáveis globais (`--wf-*`) para temas claro/escuro automáticos.
- **49+ Componentes**: De máscaras de input a tabelas dinâmicas, modais e validações.
- **Padronização Rigorosa**: Convenções de nomenclatura claras (`Wf*` para JS, `wf-*` para CSS) para evitar conflitos.

## 📦 Instalação

### Via CDN (Recomendado)

Adicione os arquivos diretamente no seu `<head>` e antes do fechamento do `<body>`:

```html
<!-- CSS Core -->
<link
  rel="stylesheet"
  href="https://webfull.sanweb.com.br/dist/webfull.min.css"
/>

<!-- JS Core (Module) -->
<script
  type="module"
  src="https://webfull.sanweb.com.br/dist/webfull.min.js"
></script>
```

### Download Manual

Você pode baixar os arquivos compilados diretamente da pasta `dist/` deste repositório:

- `dist/webfull.min.js`
- `dist/webfull.min.css`

## 🛠️ Como Usar

O WebFull utiliza atributos HTML personalizados (ex: `WfBtn`, `WfMasc`) para inicializar componentes automaticamente.

### Exemplo Básico

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <title>Exemplo WebFull</title>
    <link
      rel="stylesheet"
      href="https://webfull.sanweb.com.br/dist/webfull.min.css"
    />
  </head>
  <body>
    <div class="container">
      <!-- Botão com efeito Ripple -->
      <button class="btn btn-prim" WfBtn>Clique Aqui</button>

      <!-- Input com Máscara de CPF -->
      <input type="text" WfMasc="cpf" placeholder="000.000.000-00" />

      <!-- Modal Trigger -->
      <button class="btn btn-sec" onclick="WfModal.show('meuModal')">
        Abrir Modal
      </button>
    </div>

    <!-- Modal Structure -->
    <div id="meuModal" class="wfmodal">
      <div class="wfmodal-content">
        <h3>Olá Mundo!</h3>
        <p>Este é um modal do WebFull.</p>
      </div>
    </div>

    <script
      type="module"
      src="https://webfull.sanweb.com.br/dist/webfull.min.js"
    ></script>
  </body>
</html>
```

## 📂 Estrutura do Projeto

```
WebFull/
├── dist/               # Arquivos compilados para produção
│   ├── webfull.min.css
│   └── webfull.min.js
├── src/                # Código fonte
│   ├── css/            # Estilos CSS (webfull.css)
│   └── js/
│       ├── modules/    # Módulos individuais (Wf*.js)
│       └── webfull.js  # Core Loader
├── exemplo/            # Exemplos e documentação visual
└── build.js            # Script de build (Node.js)
```

## 🧩 Componentes Disponíveis

O framework inclui uma vasta gama de componentes:

- **UI Básica**: `WfBtn`, `WfContainer`, `WfBadge`, `WfAlert`
- **Formulários**: `WfMasc` (Máscaras), `WfValid` (Validação), `WfSelect`, `WfTextarea`
- **Layout**: `WfNavbar`, `WfSidebar`, `WfPanel`, `WfGrid`
- **Interatividade**: `WfModal`, `WfAba` (Tabs), `WfAccord` (Accordion), `WfSlid` (Sliders)
- **Utilitários**: `WfAjax`, `WfLoad`, `WfLazy` (Lazy Load), `WfScrollSpy`

## 💻 Desenvolvimento

Para editar o framework e compilar suas próprias versões:

1. Instale as dependências (apenas para o script de build):

   ```bash
   npm install
   ```

2. Execute o build:
   ```bash
   npm run build
   ```

## 📄 Licença

Proprietário. Todos os direitos reservados.
Desenvolvido por **Sandro**.
