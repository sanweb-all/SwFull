#!/usr/bin/env node
/**
 * Script de validação do SWFull
 * Verifica se todos os componentes foram incluídos corretamente no build
 */

const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════╗');
console.log('║   SWFull Validation - Verificação   ║');
console.log('╚════════════════════════════════════════╝\n');

// Lista de componentes esperados
// Nota: SwTable1.js exporta como SwTable (mesmo arquivo, nomes diferentes)
const expectedComponents = [
    'SwAba', 'SwAccord', 'SwAjax', 'SwAlert', 'SwAnime', 'SwBadge',
    'SwCode', 'SwContainer', 'SwCotacao', 'SwDay', 'SwDiv', 'SwFile1',
    'SwFile2', 'SwIconsInit', 'SwImg', 'SwLazy', 'SwLessonsToggle',
    'SwLgpd', 'SwLoad', 'SwMasc', 'SwModal', 'SwMove', 'SwNavbar',
    'SwNolink', 'SwOcult', 'SwPag', 'SwPageTransition', 'SwPagInfinite',
    'SwPanel', 'SwPanel1', 'SwParallax', 'SwPreLoad', 'SwReve',
    'SwScrollSpy', 'SwSelect', 'SwSide', 'SwSidebar', 'SwSlid1',
    'SwSlid2', 'SwTable', 'SwTableAjax', 'SwText',
    'SwTextarea', 'SwTextLimit', 'SwTool', 'SwTop', 'SwType', 'SwValid'
];

// Funções auxiliares
const funcs = [
    'SwContainer', 'SwContainerSafe', 'SwContainerMulti',
    'SwContainerContext', 'SwContainerDelay'
];

// Verificar arquivos de build
const distDir = path.join(__dirname, 'dist');
const files = {
    'swfull.js': path.join(distDir, 'swfull.js'),
    'swfull.min.js': path.join(distDir, 'swfull.min.js'),
    'swfull.css': path.join(distDir, 'swfull.css'),
    'swfull.min.css': path.join(distDir, 'swfull.min.css')
};

console.log('📋 Verificando arquivos de build...\n');

let allFilesExist = true;
Object.entries(files).forEach(([name, filepath]) => {
    if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ✓ ${name.padEnd(20)} ${sizeKB} KB`);
    } else {
        console.log(`   ✗ ${name.padEnd(20)} NÃO ENCONTRADO`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ ERRO: Alguns arquivos de build não foram encontrados!');
    process.exit(1);
}

console.log('\n📦 Verificando componentes no JavaScript...\n');

// Ler arquivo JS completo
const jsContent = fs.readFileSync(files['swfull.js'], 'utf8');

let missingComponents = [];
let foundComponents = [];

// Verificar cada componente
expectedComponents.forEach(component => {
    // Procurar por diferentes padrões de definição
    const patterns = [
        new RegExp(`class ${component}\\s*\\{`, 'g'),
        new RegExp(`window\\.${component}\\s*=`, 'g'),
        new RegExp(`const ${component}\\s*=`, 'g'),
        new RegExp(`var ${component}\\s*=`, 'g'),
        new RegExp(`function ${component}\\s*\\(`, 'g')
    ];

    const found = patterns.some(pattern => pattern.test(jsContent));

    if (found) {
        console.log(`   ✓ ${component}`);
        foundComponents.push(component);
    } else {
        console.log(`   ✗ ${component} - NÃO ENCONTRADO`);
        missingComponents.push(component);
    }
});

console.log('\n📊 Estatísticas:\n');
console.log(`   Total de componentes: ${expectedComponents.length}`);
console.log(`   Encontrados: ${foundComponents.length}`);
console.log(`   Faltando: ${missingComponents.length}`);

// Verificar sintaxe dos arquivos
console.log('\n🔍 Verificando sintaxe JavaScript...\n');

const { execSync } = require('child_process');

try {
    execSync('node -c dist/swfull.js', { stdio: 'pipe' });
    console.log('   ✓ swfull.js - Sintaxe válida');
} catch (e) {
    console.log('   ✗ swfull.js - ERRO DE SINTAXE');
    console.error(e.message);
    process.exit(1);
}

try {
    execSync('node -c dist/swfull.min.js', { stdio: 'pipe' });
    console.log('   ✓ swfull.min.js - Sintaxe válida');
} catch (e) {
    console.log('   ✗ swfull.min.js - ERRO DE SINTAXE');
    console.error(e.message);
    process.exit(1);
}

// Verificar tamanhos
console.log('\n📏 Verificando minificação...\n');

const jsSize = fs.statSync(files['swfull.js']).size;
const jsMinSize = fs.statSync(files['swfull.min.js']).size;
const cssSize = fs.statSync(files['swfull.css']).size;
const cssMinSize = fs.statSync(files['swfull.min.css']).size;

const jsReduction = ((1 - jsMinSize / jsSize) * 100).toFixed(2);
const cssReduction = ((1 - cssMinSize / cssSize) * 100).toFixed(2);

console.log(`   JavaScript: ${(jsSize/1024).toFixed(2)} KB → ${(jsMinSize/1024).toFixed(2)} KB (${jsReduction}% redução)`);
console.log(`   CSS: ${(cssSize/1024).toFixed(2)} KB → ${(cssMinSize/1024).toFixed(2)} KB (${cssReduction}% redução)`);

if (jsMinSize >= jsSize || cssMinSize >= cssSize) {
    console.log('\n   ⚠️  AVISO: A minificação não está reduzindo o tamanho dos arquivos!');
}

// Resultado final
console.log('\n' + '='.repeat(50));

if (missingComponents.length === 0 && allFilesExist) {
    console.log('✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('='.repeat(50));
    console.log('\n💡 Tudo está funcionando perfeitamente!\n');
    process.exit(0);
} else {
    console.log('❌ VALIDAÇÃO FALHOU!');
    console.log('='.repeat(50));
    if (missingComponents.length > 0) {
        console.log(`\n⚠️  Componentes faltando: ${missingComponents.join(', ')}\n`);
    }
    process.exit(1);
}
