# Estructura del archivo .env para el Chatbot

Crea un archivo llamado `.env` en la raíz de tu proyecto con la siguiente estructura:

## Variables Obligatorias

```env
# Token de API de Hugging Face (OBLIGATORIO)
# Obtén tu token en: https://huggingface.co/settings/tokens
HUGGING_FACE_TOKEN=your_hugging_face_token_here
```

## Variables Opcionales

```env
# URL de la API de Hugging Face (OPCIONAL - tiene valor por defecto)
# Por defecto usa: https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium

# Modelo específico de Hugging Face (OPCIONAL - tiene valor por defecto)
# Por defecto usa: microsoft/DialoGPT-medium
# Otros modelos populares:
# - microsoft/DialoGPT-large
# - microsoft/DialoGPT-small
# - facebook/blenderbot-400M-distill
HUGGING_FACE_MODEL=microsoft/DialoGPT-medium

# Longitud máxima de respuesta (OPCIONAL - por defecto: 150)
CHATBOT_MAX_LENGTH=150

# Temperatura para la generación (OPCIONAL - por defecto: 0.7)
# Valores entre 0.1 (más determinístico) y 1.0 (más creativo)
CHATBOT_TEMPERATURE=0.7

# Habilitar muestreo (OPCIONAL - por defecto: true)
# true = respuestas más variadas, false = respuestas más consistentes
CHATBOT_DO_SAMPLE=true
```

## Ejemplo de Configuración Completa

```env
# ========================================
# CONFIGURACIÓN DE HUGGING FACE PARA CHATBOT
# ========================================

# Token de API de Hugging Face (OBLIGATORIO)
HUGGING_FACE_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# URL de la API de Hugging Face (OPCIONAL)
HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/microsoft/DialoGPT-large

# Modelo específico de Hugging Face (OPCIONAL)
HUGGING_FACE_MODEL=microsoft/DialoGPT-large

# ========================================
# CONFIGURACIÓN DEL CHATBOT
# ========================================

# Longitud máxima de respuesta
CHATBOT_MAX_LENGTH=200

# Temperatura para la generación
CHATBOT_TEMPERATURE=0.8

# Habilitar muestreo
CHATBOT_DO_SAMPLE=true
```

## Instrucciones de Uso

1. **Obtén tu token de Hugging Face:**
   - Ve a https://huggingface.co/settings/tokens
   - Crea un nuevo token
   - Copia el token generado

2. **Crea el archivo .env:**
   - En la raíz de tu proyecto, crea un archivo llamado `.env`
   - Copia la estructura de arriba
   - Reemplaza `your_hugging_face_token_here` con tu token real

3. **Configuración adicional:**
   - Ajusta los parámetros del chatbot según tus necesidades
   - El archivo `.env` debe estar en `.gitignore` para no subirlo al repositorio

4. **Verificación:**
   - Abre la consola del navegador
   - Deberías ver: "Variables de entorno cargadas correctamente"
   - Y: "Configuración cargada: { HUGGING_FACE_TOKEN: '***CONFIGURADO***' }"

## Modelos Recomendados

- **microsoft/DialoGPT-medium** (por defecto) - Buen balance entre velocidad y calidad
- **microsoft/DialoGPT-large** - Mejor calidad, más lento
- **microsoft/DialoGPT-small** - Más rápido, menor calidad
- **facebook/blenderbot-400M-distill** - Alternativa interesante

## Solución de Problemas

- **"Hugging Face token no configurado"**: Verifica que el archivo `.env` existe y tiene el token correcto
- **"No se pudo cargar el archivo .env"**: Asegúrate de que el archivo está en la raíz del proyecto
- **Errores de API**: Verifica que tu token es válido y tiene permisos de lectura
