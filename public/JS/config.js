// Configuración del proyecto
const CONFIG = {
    // Token de Hugging Face - se puede configurar desde variables de entorno
    HUGGING_FACE_TOKEN: window.HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE',
    
    // URL de la API de Hugging Face
    HUGGING_FACE_API_URL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    
    // Configuración del chatbot
    CHATBOT: {
        maxLength: 150,
        temperature: 0.7,
        doSample: true
    }
};

// Función para cargar configuración desde variables de entorno
function loadConfigFromEnv() {
    // En desarrollo, puedes definir la variable en el HTML
    if (window.HUGGING_FACE_TOKEN) {
        CONFIG.HUGGING_FACE_TOKEN = window.HUGGING_FACE_TOKEN;
    }
    
    // Para producción, puedes usar variables de entorno del servidor
    // que se inyecten en el HTML
}

// Cargar configuración al inicializar
loadConfigFromEnv();

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
