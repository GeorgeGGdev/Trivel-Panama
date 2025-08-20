# Configuración de Variables de Entorno - Trivel Panamá

## Descripción

Este proyecto utiliza un sistema de variables de entorno para manejar credenciales sensibles de forma segura, especialmente el token de Hugging Face para el chatbot.

## Archivos Implementados

### 📁 Archivos de Configuración
- `.env` - Archivo con las variables de entorno (NO incluir en Git)
- `.gitignore` - Protege archivos sensibles
- `public/JS/env-loader.js` - Cargador de variables de entorno para el frontend
- `public/JS/config.js` - Configuración centralizada del proyecto

### 📁 Archivos Actualizados
- `public/JS/chatbot.js` - Actualizado para usar variables de entorno
- Todas las páginas HTML - Incluyen el cargador de variables de entorno

## Configuración Inicial

### 1. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Hugging Face API Token
HUGGING_FACE_TOKEN=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
```

### 2. Verificar `.gitignore`

Asegúrate de que el archivo `.gitignore` incluya:

```gitignore
# Variables de entorno
.env
.env.local
.env.development
.env.production
```

## Cómo Funciona

### 🔄 Flujo de Carga

1. **Carga de página HTML** → Se incluye `env-loader.js`
2. **env-loader.js** → Intenta cargar el archivo `.env`
3. **Parseo** → Extrae las variables de entorno
4. **Configuración global** → Establece `window.CONFIG`
5. **Inicialización del chatbot** → Usa las variables cargadas

### 🛡️ Seguridad

- El archivo `.env` está protegido por `.gitignore`
- Las variables se cargan solo en el cliente cuando es necesario
- Fallback a configuración por defecto si no se puede cargar `.env`

## Uso en el Código

### En JavaScript

```javascript
// Acceder a la configuración
const token = window.CONFIG.HUGGING_FACE_TOKEN;
const apiUrl = window.CONFIG.HUGGING_FACE_API_URL;

// Configuración del chatbot
const maxLength = window.CONFIG.CHATBOT.maxLength;
const temperature = window.CONFIG.CHATBOT.temperature;
```

### En HTML

```html
<!-- Incluir antes del chatbot -->
<script src="JS/env-loader.js"></script>
<script src="JS/chatbot.js"></script>
```

## Configuración para Diferentes Entornos

### Desarrollo Local

```env
# .env
HUGGING_FACE_TOKEN=hf_tu_token_de_desarrollo
```

### Producción

```env
# .env.production
HUGGING_FACE_TOKEN=hf_tu_token_de_produccion
```

## Solución de Problemas

### ❌ Error: "No se pudo cargar el archivo .env"

**Causa**: El archivo `.env` no existe o no es accesible.

**Solución**:
1. Verificar que el archivo `.env` existe en la raíz del proyecto
2. Verificar permisos de lectura del archivo
3. El sistema usará configuración por defecto

### ❌ Error: "Token no válido"

**Causa**: El token de Hugging Face es incorrecto o ha expirado.

**Solución**:
1. Verificar el token en Hugging Face
2. Actualizar el archivo `.env` con el nuevo token
3. Reiniciar el servidor web

### ❌ Error: "Variables de entorno no cargadas"

**Causa**: El cargador de variables no se ejecutó correctamente.

**Solución**:
1. Verificar que `env-loader.js` está incluido antes de `chatbot.js`
2. Revisar la consola del navegador para errores
3. Verificar que el archivo `.env` tiene el formato correcto

## Verificación

### 1. Verificar Carga de Variables

Abre la consola del navegador y ejecuta:

```javascript
console.log('CONFIG:', window.CONFIG);
console.log('Token:', window.CONFIG.HUGGING_FACE_TOKEN);
```

### 2. Verificar Funcionamiento del Chatbot

1. Abrir cualquier página del sitio
2. Hacer clic en el botón del chatbot
3. Enviar un mensaje de prueba
4. Verificar que responde correctamente

### 3. Verificar Seguridad

```bash
# Verificar que .env no está en Git
git status
git ls-files | grep .env
```

## Mantenimiento

### Actualizar Token

1. Obtener nuevo token de Hugging Face
2. Actualizar el archivo `.env`
3. Reiniciar el servidor web
4. Probar el chatbot

### Agregar Nuevas Variables

1. Agregar la variable al archivo `.env`
2. Actualizar `env-loader.js` para cargar la nueva variable
3. Actualizar `config.js` para incluir la nueva configuración
4. Usar la variable en el código

## Notas Importantes

- ⚠️ **NUNCA** subir el archivo `.env` a Git
- 🔄 Reiniciar el servidor después de cambiar variables de entorno
- 🧪 Probar en desarrollo antes de subir a producción
- 📝 Documentar cualquier nueva variable de entorno

## Soporte

Para problemas adicionales:
1. Revisar la consola del navegador
2. Verificar que todos los archivos están en su lugar
3. Confirmar que el formato del archivo `.env` es correcto
4. Verificar que el token de Hugging Face es válido
