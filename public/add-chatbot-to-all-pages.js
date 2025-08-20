// Script para agregar el chatbot a todas las páginas HTML
// Este script debe ejecutarse en cada página HTML

function addChatbotToPage() {
    // Verificar si el chatbot ya existe
    if (document.getElementById('chatbot-container')) {
        return;
    }

    // Agregar el CSS del chatbot si no existe
    if (!document.querySelector('link[href*="chatbot.css"]')) {
        const chatbotCSS = document.createElement('link');
        chatbotCSS.rel = 'stylesheet';
        chatbotCSS.href = 'CSS/chatbot.css';
        document.head.appendChild(chatbotCSS);
    }

    // Agregar el JavaScript del chatbot si no existe
    if (!document.querySelector('script[src*="chatbot.js"]')) {
        const chatbotJS = document.createElement('script');
        chatbotJS.src = 'JS/chatbot.js';
        document.body.appendChild(chatbotJS);
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addChatbotToPage);
} else {
    addChatbotToPage();
} 