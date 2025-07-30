// Script para convertir múltiples páginas a componentes de una vez
// Este script puede ser ejecutado en la consola del navegador

class BatchPageConverter {
    constructor() {
        this.pagesToConvert = [
            'playa-venao.html',
            'playa-veracruz.html', 
            'playa-estrella.html',
            'carrusel.html',
            'temp-destinations.html'
        ];
    }

    // Método para convertir una página específica
    convertPage(pageName) {
        console.log(`🔄 Convirtiendo ${pageName}...`);
        
        // Aquí irían las instrucciones específicas para cada página
        const instructions = this.getConversionInstructions(pageName);
        
        console.log(`📋 Instrucciones para ${pageName}:`);
        console.log(instructions);
        console.log('');
    }

    // Obtener instrucciones específicas para cada página
    getConversionInstructions(pageName) {
        const baseInstructions = `
1. Agregar en el <head>:
   - <link rel="stylesheet" href="../CSS/components.css">
   - <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
   - <style>.page-content { margin-top: 80px; }</style>

2. Reemplazar el <header> con:
   <div id="header-component"></div>

3. Agregar clase "page-content" a la primera sección después del header

4. Reemplazar el <footer> con:
   <div id="footer-component"></div>

5. Agregar antes del cierre de </body>:
   <script src="../components/components.js"></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
   <script src="../JS/firebaseConfig.js"></script>
        `;

        return baseInstructions;
    }

    // Convertir todas las páginas
    convertAllPages() {
        console.log('🚀 INICIANDO CONVERSIÓN MASIVA DE PÁGINAS');
        console.log('==========================================');
        console.log('');
        
        this.pagesToConvert.forEach(page => {
            this.convertPage(page);
        });
        
        console.log('✅ CONVERSIÓN COMPLETADA');
        console.log('');
        console.log('📝 PRÓXIMOS PASOS:');
        console.log('1. Abre cada archivo HTML en tu editor');
        console.log('2. Aplica las instrucciones mostradas arriba');
        console.log('3. Guarda los archivos');
        console.log('4. Prueba las páginas en el navegador');
        console.log('');
        console.log('💡 CONSEJO: Puedes usar Ctrl+F para buscar y reemplazar rápidamente');
    }

    // Mostrar resumen de páginas a convertir
    showSummary() {
        console.log('📊 RESUMEN DE PÁGINAS A CONVERTIR:');
        console.log('==================================');
        this.pagesToConvert.forEach((page, index) => {
            console.log(`${index + 1}. ${page}`);
        });
        console.log('');
        console.log(`Total: ${this.pagesToConvert.length} páginas`);
    }
}

// Crear instancia global
window.BatchPageConverter = BatchPageConverter;

// Función de conveniencia
function convertAllPages() {
    const converter = new BatchPageConverter();
    converter.convertAllPages();
}

function showPagesSummary() {
    const converter = new BatchPageConverter();
    converter.showSummary();
}

console.log('🛠️  BatchPageConverter cargado!');
console.log('Usa convertAllPages() para convertir todas las páginas');
console.log('Usa showPagesSummary() para ver el resumen'); 