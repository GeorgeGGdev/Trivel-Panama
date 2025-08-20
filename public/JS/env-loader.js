// Cargador de variables de entorno para el frontend
class EnvLoader {
    constructor() {
        this.env = {};
        this.loaded = false;
    }

    // Cargar variables de entorno desde el archivo .env
    async loadEnvFile() {
        try {
            const response = await fetch('/.env');
            if (response.ok) {
                const envContent = await response.text();
                this.parseEnvContent(envContent);
                this.loaded = true;
                console.log('Variables de entorno cargadas correctamente');
            } else {
                console.warn('No se pudo cargar el archivo .env, usando configuración por defecto');
                this.loadDefaultConfig();
            }
        } catch (error) {
            console.warn('Error al cargar .env:', error);
            this.loadDefaultConfig();
        }
    }

    // Parsear el contenido del archivo .env
    parseEnvContent(content) {
        const lines = content.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join('=').trim();
                    // Remover comillas si las hay
                    this.env[key.trim()] = value.replace(/^["']|["']$/g, '');
                }
            }
        });
    }

    // Cargar configuración por defecto
    loadDefaultConfig() {
        this.env = {
            HUGGING_FACE_TOKEN: 'YOUR_HUGGING_FACE_TOKEN_HERE'
        };
    }

    // Obtener una variable de entorno
    get(key, defaultValue = '') {
        return this.env[key] || defaultValue;
    }

    // Configurar variables en window
    setupWindowVars() {
        // Configurar variables globales
        window.HUGGING_FACE_TOKEN = this.get('HUGGING_FACE_TOKEN');
        
        // Configurar objeto CONFIG global
        window.CONFIG = {
            HUGGING_FACE_TOKEN: this.get('HUGGING_FACE_TOKEN'),
            HUGGING_FACE_API_URL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            CHATBOT: {
                maxLength: 150,
                temperature: 0.7,
                doSample: true
            }
        };
    }
}

// Inicializar el cargador de variables de entorno
const envLoader = new EnvLoader();

// Cargar variables de entorno cuando se carga la página
document.addEventListener('DOMContentLoaded', async function() {
    await envLoader.loadEnvFile();
    envLoader.setupWindowVars();
    
    // Disparar evento personalizado cuando las variables estén listas
    window.dispatchEvent(new CustomEvent('envLoaded'));
});

// Exportar para uso global
window.EnvLoader = EnvLoader;
window.envLoader = envLoader;
