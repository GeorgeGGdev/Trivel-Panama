// Chatbot con Hugging Face
class TrivelChatbot {
    constructor() {
        this.isOpen = false;
        // Usar variables de entorno cargadas por env-loader.js
        this.token = window.HUGGING_FACE_TOKEN || window.CONFIG?.HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE';
        this.apiUrl = window.CONFIG?.HUGGING_FACE_API_URL || 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
        this.modelName = window.CONFIG?.HUGGING_FACE_MODEL || 'microsoft/DialoGPT-medium';
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.loadConversationHistory();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Toggle Button -->
            <div id="chatbot-toggle" class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="notification-badge" id="notification-badge" style="display: none;">1</span>
            </div>

            <!-- Chatbot Container -->
            <div id="chatbot-container" class="chatbot-container">
                <!-- Chatbot Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-content">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-info">
                            <h3>Trivel Assistant</h3>
                            <span class="status">Online</span>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Chat Messages -->
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            <div class="message-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="message-text">
                                <p>Hello! I'm your virtual assistant from Trivel Panama. How can I help you today? I can answer questions about our destinations, services, bookings and more.</p>
                            </div>
                        </div>
                        <div class="message-time">Now</div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <button class="quick-action-btn" data-action="destinos">🌴 Destinations</button>
                    <button class="quick-action-btn" data-action="reservas">📅 Bookings</button>
                    <button class="quick-action-btn" data-action="precios">💰 Prices</button>
                    <button class="quick-action-btn" data-action="contacto">📞 Contact</button>
                </div>

                <!-- Chat Input -->
                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <input type="text" id="chat-input" placeholder="Type your message..." maxlength="500">
                        <button id="chat-send" class="chat-send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="typing-indicator" id="typing-indicator" style="display: none;">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Close chatbot
        document.getElementById('chatbot-close').addEventListener('click', () => {
            this.closeChatbot();
        });

        // Send message
        document.getElementById('chat-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            const container = document.getElementById('chatbot-container');
            const toggle = document.getElementById('chatbot-toggle');
            
            if (this.isOpen && !container.contains(e.target) && !toggle.contains(e.target)) {
                this.closeChatbot();
            }
        });
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        document.getElementById('chatbot-container').classList.add('open');
        document.getElementById('chat-input').focus();
        this.hideNotification();
        this.scrollToBottom();
    }

    closeChatbot() {
        this.isOpen = false;
        document.getElementById('chatbot-container').classList.remove('open');
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get bot response
            const response = await this.getBotResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I\'m having technical issues. Please try again in a few moments.', 'bot');
            console.error('Chatbot error:', error);
        }
    }

    async getBotResponse(userMessage) {
        // Add to conversation history
        this.conversationHistory.push({ role: 'user', content: userMessage });

        // Check for specific keywords and provide contextual responses
        const contextualResponse = this.getContextualResponse(userMessage);
        if (contextualResponse) {
            this.conversationHistory.push({ role: 'assistant', content: contextualResponse });
            return contextualResponse;
        }

        // Use Hugging Face API for general responses
        try {
            // Verificar que tenemos el token antes de hacer la llamada
            if (!this.token || this.token === 'YOUR_HUGGING_FACE_TOKEN_HERE') {
                console.warn('Hugging Face token not configured. Using fallback response.');
                return this.getFallbackResponse(userMessage);
            }

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: userMessage,
                    parameters: {
                        max_length: window.CONFIG?.CHATBOT?.maxLength || 150,
                        temperature: window.CONFIG?.CHATBOT?.temperature || 0.7,
                        do_sample: window.CONFIG?.CHATBOT?.doSample || true
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            let botResponse = data[0]?.generated_text || 'I don\'t understand your question. Could you rephrase it?';

            // Clean up the response
            botResponse = this.cleanResponse(botResponse, userMessage);

            // Add to conversation history
            this.conversationHistory.push({ role: 'assistant', content: botResponse });

            return botResponse;
        } catch (error) {
            console.error('API Error:', error);
            return this.getFallbackResponse(userMessage);
        }
    }

    getContextualResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Destinos
        if (message.includes('bocas del toro') || message.includes('bocas')) {
            return '¡Bocas del Toro es un destino increíble! Es conocido por sus playas paradisíacas, aguas cristalinas y vida marina vibrante. Ofrecemos tours que incluyen snorkel, buceo y exploración de las islas. ¿Te gustaría saber más sobre nuestros paquetes para Bocas del Toro?';
        }
        
        if (message.includes('san blas') || message.includes('guna yala')) {
            return 'San Blas (Guna Yala) es un archipiélago de 365 islas con cultura indígena única. Es perfecto para experiencias auténticas, navegación y conexión con la naturaleza virgen. ¿Te interesa conocer nuestros tours culturales?';
        }
        
        if (message.includes('playa venao') || message.includes('venao')) {
            return 'Playa Venao es famosa por sus olas perfectas para surf y sus atardeceres espectaculares. Es ideal para deportes acuáticos y vida nocturna relajada. ¿Quieres información sobre nuestras opciones de alojamiento en Venao?';
        }
        
        if (message.includes('playa estrella') || message.includes('starfish beach')) {
            return 'Playa Estrella es conocida por sus estrellas de mar y aguas cristalinas. Es perfecta para familias y snorkel. ¿Te gustaría saber sobre nuestros tours a esta hermosa playa?';
        }

        // Servicios
        if (message.includes('reserva') || message.includes('reservar') || message.includes('booking')) {
            return '¡Perfecto! Para hacer una reserva puedes contactarnos por WhatsApp al +507 123-4567, enviarnos un email a info@trivelpanama.com, o usar nuestro formulario de contacto. ¿En qué destino estás interesado?';
        }
        
        if (message.includes('precio') || message.includes('costo') || message.includes('tarifa')) {
            return 'Nuestros precios varían según el destino y el tipo de experiencia. Los paquetes básicos empiezan desde $150 por persona. ¿Te gustaría que te envíe una cotización personalizada? Solo dime tu destino preferido y fechas.';
        }
        
        if (message.includes('contacto') || message.includes('contactar')) {
            return 'Puedes contactarnos de varias formas:\n📱 WhatsApp: +507 123-4567\n📧 Email: info@trivelpanama.com\n🌐 Web: Completa nuestro formulario de contacto\n¿En qué puedo ayudarte específicamente?';
        }

        // Información general
        if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas')) {
            return '¡Hola! Bienvenido a Trivel Panamá. Somos especialistas en crear experiencias únicas en Panamá. ¿En qué destino estás interesado o cómo puedo ayudarte hoy?';
        }
        
        if (message.includes('gracias') || message.includes('thank you')) {
            return '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas sobre nuestros destinos, servicios o quieres hacer una reserva, no dudes en preguntarme.';
        }

        // No contextual response found
        return null;
    }

    getFallbackResponse(userMessage) {
        const fallbacks = [
            'Entiendo tu pregunta. Te recomiendo contactar directamente con nuestro equipo al +507 123-4567 para obtener información más específica.',
            'Excelente pregunta. Para darte la mejor respuesta, ¿podrías ser más específico sobre lo que necesitas?',
            'Gracias por tu consulta. Nuestro equipo especializado puede ayudarte mejor. ¿Te gustaría que te conecte con ellos?',
            'Interesante pregunta. Te sugiero revisar nuestra página de destinos o contactarnos directamente para más detalles.'
        ];
        
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    cleanResponse(response, userMessage) {
        // Remove the user's message from the response if it appears
        let cleaned = response.replace(userMessage, '').trim();
        
        // Remove common prefixes
        cleaned = cleaned.replace(/^(bot|assistant|ai):\s*/i, '');
        
        // Limit length
        if (cleaned.length > 200) {
            cleaned = cleaned.substring(0, 200) + '...';
        }
        
        return cleaned || 'Thank you for your message. Is there something specific about Panama I can help you with?';
    }

    handleQuickAction(action) {
        const actions = {
            'destinos': 'Let me tell you about our most popular destinations:\n\n🌴 Bocas del Toro - Caribbean beaches and marine life\n🏝️ San Blas - Virgin islands and Guna culture\n🏄 Playa Venao - Surf and sunsets\n⭐ Playa Estrella - Starfish and snorkeling\n\nWhich one interests you most?',
            'reservas': 'To make a reservation you can:\n\n📱 Call +507 123-4567\n📧 Send email to info@trivelpanama.com\n🌐 Use our web form\n\nWhich destination do you want to book?',
            'precios': 'Our prices vary by package:\n\n💰 Basic: From $150/person\n💎 Premium: From $300/person\n👑 VIP: From $500/person\n\nWould you like a personalized quote?',
            'contacto': 'Our contact channels:\n\n📱 WhatsApp: +507 123-4567\n📧 Email: info@trivelpanama.com\n🌐 Web: trivelpanama.com\n📍 Office: Panama City\n\nWhich one do you prefer to use?'
        };

        const response = actions[action] || 'Sorry, I don\'t understand that action. Can you be more specific?';
        this.addMessage(response, 'bot');
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-avatar">
                    <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
                </div>
                <div class="message-text">
                    <p>${this.formatMessage(content)}</p>
                </div>
            </div>
            <div class="message-time">${time}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        this.saveConversationHistory();
    }

    formatMessage(content) {
        // Convert line breaks to <br> tags
        return content.replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        document.getElementById('typing-indicator').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    showNotification() {
        const badge = document.getElementById('notification-badge');
        badge.style.display = 'block';
    }

    hideNotification() {
        const badge = document.getElementById('notification-badge');
        badge.style.display = 'none';
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('trivel-chatbot-history', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Error saving conversation history:', error);
        }
    }

    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('trivel-chatbot-history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
        }
    }

    // Auto-show notification after 30 seconds if chatbot is closed
    startNotificationTimer() {
        if (!this.isOpen) {
            setTimeout(() => {
                if (!this.isOpen) {
                    this.showNotification();
                }
            }, 30000);
        }
    }
}

// Initialize chatbot when DOM is loaded and environment variables are ready
function initializeChatbot() {
    window.trivelChatbot = new TrivelChatbot();
    
    // Start notification timer
    setTimeout(() => {
        window.trivelChatbot.startNotificationTimer();
    }, 30000);
}

// Esperar a que las variables de entorno se carguen
document.addEventListener('DOMContentLoaded', function() {
    // Si las variables ya están cargadas, inicializar inmediatamente
    if (window.CONFIG && window.CONFIG.HUGGING_FACE_TOKEN) {
        initializeChatbot();
    } else {
        // Esperar a que se carguen las variables de entorno
        window.addEventListener('envLoaded', function() {
            initializeChatbot();
        });
    }
}); 