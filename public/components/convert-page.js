// Script para convertir páginas existentes para usar componentes
// Este script puede ser ejecutado en la consola del navegador para ayudar en la conversión

class PageConverter {
    constructor() {
        this.components = {
            header: {
                selector: 'header',
                replacement: '<div id="header-component"></div>'
            },
            footer: {
                selector: 'footer',
                replacement: '<div id="footer-component"></div>'
            }
        };
    }

    // Método para detectar si una página ya usa componentes
    detectComponents() {
        const headerComponent = document.getElementById('header-component');
        const footerComponent = document.getElementById('footer-component');
        
        return {
            hasHeaderComponent: !!headerComponent,
            hasFooterComponent: !!footerComponent,
            needsConversion: !headerComponent || !footerComponent
        };
    }

    // Método para generar el código HTML necesario
    generateHTMLTemplate() {
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/pages/');
        
        let template = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tu Título - Trivel Panamá</title>
    <link rel="stylesheet" href="${isInSubfolder ? '../' : ''}CSS/styles.css">
    <link rel="stylesheet" href="${isInSubfolder ? '../' : ''}CSS/components.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .page-content {
            margin-top: 80px; /* Espacio para el header fijo */
        }
    </style>
</head>
<body>
    <!-- Contenedor para el header -->
    <div id="header-component"></div>
    
    <!-- Tu contenido aquí -->
    <main class="page-content">
        <!-- Reemplaza esto con tu contenido actual -->
    </main>
    
    <!-- Contenedor para el footer -->
    <div id="footer-component"></div>
    
    <!-- Scripts -->
    <script src="${isInSubfolder ? '../' : ''}components/components.js"></script>
    
    <!-- Firebase (si es necesario) -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="${isInSubfolder ? '../' : ''}JS/firebaseConfig.js"></script>
</body>
</html>`;
        
        return template;
    }

    // Método para mostrar instrucciones de conversión
    showConversionInstructions() {
        const detection = this.detectComponents();
        const template = this.generateHTMLTemplate();
        
        console.log('=== CONVERSIÓN DE PÁGINA A COMPONENTES ===');
        console.log('');
        
        if (!detection.needsConversion) {
            console.log('✅ Esta página ya usa componentes!');
            return;
        }
        
        console.log('📋 INSTRUCCIONES DE CONVERSIÓN:');
        console.log('');
        
        if (!detection.hasHeaderComponent) {
            console.log('1. Reemplaza el <header> existente con:');
            console.log('   <div id="header-component"></div>');
            console.log('');
        }
        
        if (!detection.hasFooterComponent) {
            console.log('2. Reemplaza el <footer> existente con:');
            console.log('   <div id="footer-component"></div>');
            console.log('');
        }
        
        console.log('3. Agrega estos enlaces CSS en el <head>:');
        console.log('   <link rel="stylesheet" href="components.css">');
        console.log('   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">');
        console.log('');
        
        console.log('4. Agrega este script antes del cierre de </body>:');
        console.log('   <script src="components/components.js"></script>');
        console.log('');
        
        console.log('5. Agrega la clase "page-content" a tu contenido principal');
        console.log('   y agrega margin-top: 80px para el header fijo');
        console.log('');
        
        console.log('📄 TEMPLATE COMPLETO:');
        console.log(template);
        console.log('');
        
        console.log('💡 CONSEJOS:');
        console.log('- Copia el template y reemplaza el contenido de tu página');
        console.log('- Ajusta las rutas según la ubicación de tu archivo');
        console.log('- Mantén los scripts específicos de tu página');
        console.log('- Prueba la página después de la conversión');
    }

    // Método para validar la conversión
    validateConversion() {
        const detection = this.detectComponents();
        const hasComponentsScript = !!document.querySelector('script[src*="components.js"]');
        const hasComponentsCSS = !!document.querySelector('link[href*="components.css"]');
        
        console.log('=== VALIDACIÓN DE CONVERSIÓN ===');
        console.log('');
        console.log(`✅ Header Component: ${detection.hasHeaderComponent ? 'SÍ' : 'NO'}`);
        console.log(`✅ Footer Component: ${detection.hasFooterComponent ? 'SÍ' : 'NO'}`);
        console.log(`✅ Components Script: ${hasComponentsScript ? 'SÍ' : 'NO'}`);
        console.log(`✅ Components CSS: ${hasComponentsCSS ? 'SÍ' : 'NO'}`);
        console.log('');
        
        if (detection.hasHeaderComponent && detection.hasFooterComponent && hasComponentsScript && hasComponentsCSS) {
            console.log('🎉 ¡Conversión exitosa! La página está usando componentes correctamente.');
        } else {
            console.log('⚠️  La conversión no está completa. Revisa las instrucciones anteriores.');
        }
    }
}

// Crear instancia global
window.PageConverter = PageConverter;

// Función de conveniencia para mostrar instrucciones
function showConversionHelp() {
    const converter = new PageConverter();
    converter.showConversionInstructions();
}

// Función de conveniencia para validar
function validatePageConversion() {
    const converter = new PageConverter();
    converter.validateConversion();
}

console.log('🛠️  PageConverter cargado!');
console.log('Usa showConversionHelp() para ver instrucciones de conversión');
console.log('Usa validatePageConversion() para validar la conversión'); 