const fs = require("fs");
const path = require("path");

console.log("\n╔════════════════════════════════════════╗");
console.log("║   WebFull Build - Simples e Direto  ║");
console.log("╚════════════════════════════════════════╝\n");

const distDir = path.join(__dirname, "dist");

// Garantir que dist existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// ============ BUILD JAVASCRIPT ============
console.log("📦 Construindo JavaScript...");

let jsContent = "";

// Core
const corePath = path.join(__dirname, "src", "js", "webfull.js");
if (fs.existsSync(corePath)) {
  jsContent += fs.readFileSync(corePath, "utf8") + "\n\n";
  console.log("   ✓ Core adicionado");
}

// Módulos
const modulesDir = path.join(__dirname, "src", "js", "modules");
if (fs.existsSync(modulesDir)) {
  const files = fs.readdirSync(modulesDir).filter(f => f.endsWith(".js")).sort();
  console.log(`   ✓ ${files.length} módulos encontrados`);

  files.forEach(file => {
    const content = fs.readFileSync(path.join(modulesDir, file), "utf8");
    jsContent += `// ===== ${file} =====\n${content}\n\n`;
  });
}

// Salvar JavaScript completo
fs.writeFileSync(path.join(distDir, "webfull.js"), jsContent);
console.log(`   ✓ Criado: dist/webfull.js (${(jsContent.length / 1024).toFixed(2)} KB)`);

// Minificar JavaScript
try {
  const { minify } = require("terser");
  console.log("   ⚙️  Minificando...");

  minify(jsContent, {
    compress: { dead_code: true, drop_debugger: true },
    mangle: { keep_classnames: true },
    format: { comments: false }
  }).then(result => {
    fs.writeFileSync(path.join(distDir, "webfull.min.js"), result.code);
    console.log(`   ✓ Criado: dist/webfull.min.js (${(result.code.length / 1024).toFixed(2)} KB)`);

    buildCSS();
  });
} catch (e) {
  console.log("   ⚠️  Terser não instalado - copiando sem minificar");
  fs.writeFileSync(path.join(distDir, "webfull.min.js"), jsContent);
  buildCSS();
}

// ============ BUILD CSS ============
function buildCSS() {
  console.log("\n🎨 Construindo CSS...");

  let cssContent = "";

  const coreCssPath = path.join(__dirname, "src", "css", "webfull.css");
  if (fs.existsSync(coreCssPath)) {
    cssContent = fs.readFileSync(coreCssPath, "utf8");
    console.log("   ✓ Core CSS adicionado");
  }

  // Salvar CSS completo
  fs.writeFileSync(path.join(distDir, "webfull.css"), cssContent);
  console.log(`   ✓ Criado: dist/webfull.css (${(cssContent.length / 1024).toFixed(2)} KB)`);

  // Minificar CSS
  try {
    const CleanCSS = require("clean-css");
    console.log("   ⚙️  Minificando...");

    const result = new CleanCSS({ level: 2 }).minify(cssContent);
    fs.writeFileSync(path.join(distDir, "webfull.min.css"), result.styles);
    console.log(`   ✓ Criado: dist/webfull.min.css (${(result.styles.length / 1024).toFixed(2)} KB)`);
  } catch (e) {
    console.log("   ⚠️  CleanCSS não instalado - copiando sem minificar");
    fs.writeFileSync(path.join(distDir, "webfull.min.css"), cssContent);
  }

  finish();
}

// ============ FINALIZAR ============
function finish() {
  console.log("\n" + "=".repeat(50));
  console.log("✅ BUILD CONCLUÍDO!");
  console.log("=".repeat(50));
  console.log("\n📂 Arquivos gerados em dist/:");
  console.log("   - webfull.js");
  console.log("   - webfull.min.js");
  console.log("   - webfull.css");
  console.log("   - webfull.min.css");
  console.log("\n💡 Para minificar, instale: npm install terser clean-css\n");
}
