# Chatbot de Trivel Panamá

## Descripción

Se ha implementado un chatbot inteligente con Hugging Face que aparece en todas las páginas HTML del sitio web de Trivel Panamá. El chatbot está diseñado para responder preguntas sobre destinos, servicios, reservas y proporcionar información general sobre la empresa.

## Características

### 🎯 Funcionalidades Principales
- **Chat en tiempo real** con respuestas contextuales
- **Botón flotante** en la esquina inferior izquierda
- **Interfaz moderna** y responsive
- **Respuestas inteligentes** basadas en el contenido del sitio
- **Integración con Hugging Face** para respuestas generales
- **Botones de acción rápida** para consultas comunes

### 🎨 Diseño y UX
- **Icono flotante** con animación y notificaciones
- **Chat expandible** con diseño moderno
- **Indicador de escritura** mientras el bot procesa
- **Historial de conversación** guardado localmente
- **Responsive design** para móviles y tablets
- **Soporte para modo oscuro**

### 🤖 Inteligencia del Chatbot
- **Respuestas contextuales** para destinos específicos:
  - Bocas del Toro
  - San Blas (Guna Yala)
  - Playa Venao
  - Playa Estrella
- **Información sobre servicios**:
  - Reservas y bookings
  - Precios y tarifas
  - Información de contacto
- **Respuestas generales** usando Hugging Face API
- **Fallbacks inteligentes** cuando no encuentra respuestas específicas

## Archivos Implementados

### 📁 JavaScript
- `public/JS/chatbot.js` - Lógica principal del chatbot

### 📁 CSS
- `public/CSS/chatbot.css` - Estilos del chatbot

### 📁 Páginas HTML Actualizadas
- `public/index.html`
- `public/pages/destinations.html`
- `public/pages/ContactUs.html`
- `public/pages/FAQs.html`
- `public/pages/bocas-del-toro.html`
- `public/pages/san-blas.html`
- `public/test-firebase.html`

## Configuración

### 🔑 Token de Hugging Face
El chatbot utiliza el token: `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`

### 🌐 API Endpoint
- **Modelo**: `microsoft/DialoGPT-medium`
- **URL**: `https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium`

## Uso

### Para Usuarios
1. **Abrir el chat**: Hacer clic en el icono de chat flotante
2. **Escribir mensaje**: Usar el campo de texto en la parte inferior
3. **Acciones rápidas**: Usar los botones de acción rápida para consultas comunes
4. **Cerrar chat**: Hacer clic en el botón X o fuera del chat

### Para Desarrolladores
1. **Personalizar respuestas**: Editar el método `getContextualResponse()` en `chatbot.js`
2. **Modificar estilos**: Editar `chatbot.css`
3. **Agregar nuevas páginas**: Incluir los enlaces CSS y JS del chatbot

## Respuestas Contextuales

### Destinos
- **Bocas del Toro**: Información sobre playas, snorkel, buceo
- **San Blas**: Cultura Guna, islas vírgenes, navegación
- **Playa Venao**: Surf, deportes acuáticos, atardeceres
- **Playa Estrella**: Estrellas de mar, snorkel, familias

### Servicios
- **Reservas**: WhatsApp, email, formulario web
- **Precios**: Paquetes básico, premium, VIP
- **Contacto**: Información de contacto completa

## Características Técnicas

### 🔧 Tecnologías Utilizadas
- **JavaScript ES6+** para la lógica
- **CSS3** con animaciones y transiciones
- **Hugging Face API** para IA
- **LocalStorage** para persistencia
- **Fetch API** para requests HTTP

### 📱 Responsive Design
- **Desktop**: Chat de 350px de ancho
- **Tablet**: Chat adaptativo
- **Mobile**: Chat a pantalla completa

### 🎭 Animaciones
- **Entrada suave** del chat
- **Indicador de escritura** animado
- **Notificaciones** con pulso
- **Hover effects** en botones

## Personalización

### Agregar Nuevas Respuestas Contextuales
```javascript
// En chatbot.js, método getContextualResponse()
if (message.includes('nuevo destino')) {
    return 'Respuesta personalizada para el nuevo destino';
}
```

### Modificar Estilos
```css
/* En chatbot.css */
.chatbot-toggle {
    /* Personalizar botón flotante */
}

.chatbot-container {
    /* Personalizar contenedor del chat */
}
```

### Agregar Nuevas Acciones Rápidas
```javascript
// En chatbot.js, método handleQuickAction()
const actions = {
    'nueva-accion': 'Respuesta para nueva acción',
    // ... más acciones
};
```

## Mantenimiento

### Verificar Funcionamiento
1. Abrir cualquier página del sitio
2. Verificar que aparece el botón flotante
3. Probar el chat con diferentes preguntas
4. Verificar respuestas contextuales

### Actualizar Token
Si el token de Hugging Face expira:
1. Obtener nuevo token de Hugging Face
2. Actualizar en `chatbot.js` línea 4
3. Probar funcionamiento

## Notas Importantes

- El chatbot requiere conexión a internet para funcionar
- Las respuestas se guardan en localStorage del navegador
- El token de Hugging Face tiene límites de uso
- El chatbot es compatible con todos los navegadores modernos

## Soporte

Para problemas o mejoras:
1. Verificar la consola del navegador para errores
2. Comprobar conexión a internet
3. Verificar que el token de Hugging Face sea válido
4. Revisar que todos los archivos estén correctamente enlazados 