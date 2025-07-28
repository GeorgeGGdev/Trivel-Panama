# Componentes Reutilizables - Trivel Panamá

Este directorio contiene componentes reutilizables para el sitio web de Trivel Panamá.

## Archivos Incluidos

- `header.html` - Componente del header/navegación
- `footer.html` - Componente del footer
- `components.js` - Script para cargar dinámicamente los componentes
- `components.css` - Estilos específicos para los componentes
- `page-template.html` - Template para páginas en subcarpetas (ej: /pages/)
- `page-template-root.html` - Template para páginas en la raíz

## Cómo Usar los Componentes

### 1. Para Páginas en Subcarpetas (ej: /pages/)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Página - Trivel Panamá</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../CSS/styles.css">
    <link rel="stylesheet" href="../CSS/components.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Contenedor para el header -->
    <div id="header-component"></div>
    
    <!-- Tu contenido aquí -->
    <main class="page-content">
        <h1>Tu Contenido</h1>
        <p>Contenido de tu página...</p>
    </main>
    
    <!-- Contenedor para el footer -->
    <div id="footer-component"></div>
    
    <!-- Scripts -->
    <script src="../components/components.js"></script>
    
    <!-- Firebase (si es necesario) -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="../JS/firebaseConfig.js"></script>
</body>
</html>
```

### 2. Para Páginas en la Raíz

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Página - Trivel Panamá</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="CSS/styles.css">
    <link rel="stylesheet" href="CSS/components.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Contenedor para el header -->
    <div id="header-component"></div>
    
    <!-- Tu contenido aquí -->
    <main class="page-content">
        <h1>Tu Contenido</h1>
        <p>Contenido de tu página...</p>
    </main>
    
    <!-- Contenedor para el footer -->
    <div id="footer-component"></div>
    
    <!-- Scripts -->
    <script src="components/components.js"></script>
    
    <!-- Firebase (si es necesario) -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="JS/firebaseConfig.js"></script>
</body>
</html>
```

## Características

### Header Component
- Logo con enlace al home
- Navegación principal
- Área de autenticación (login/logout)
- Detección automática de página activa
- Rutas relativas automáticas

### Footer Component
- Logo y marca
- Enlaces de navegación
- Redes sociales
- Información legal
- Rutas relativas automáticas

### Component Loader
- Carga automática de componentes
- Detección de ubicación de archivo
- Manejo de errores
- Inicialización de funcionalidades específicas
- Soporte para Firebase Auth

## Estilos CSS

Los componentes utilizan las siguientes clases CSS principales:

### Header
- `.header` - Contenedor principal
- `.modern-header` - Estilo moderno
- `.logo` - Logo y marca
- `.nav-menu` - Menú de navegación
- `.auth-btn` - Botones de autenticación

### Footer
- `.footer` - Contenedor principal
- `.creative-footer` - Estilo creativo
- `.minimal-footer` - Estilo minimalista
- `.footer-links` - Enlaces del footer
- `.social-icon` - Iconos de redes sociales

## Personalización

Para personalizar los componentes:

1. **Modificar el header**: Edita `header.html`
2. **Modificar el footer**: Edita `footer.html`
3. **Agregar funcionalidad**: Edita `components.js`
4. **Cambiar estilos**: Edita `components.css`

## Notas Importantes

- Los componentes se cargan dinámicamente usando `fetch()`
- Las rutas se ajustan automáticamente según la ubicación del archivo
- El sistema de autenticación requiere Firebase
- Los enlaces internos (#) se ajustan automáticamente
- El componente detecta la página activa y la marca en la navegación

## Troubleshooting

### Error: "Error loading component"
- Verifica que las rutas sean correctas
- Asegúrate de que los archivos CSS estén incluidos
- Revisa la consola del navegador para más detalles

### Los enlaces no funcionan
- Verifica que las rutas en los componentes sean correctas
- Asegúrate de que el archivo esté en la ubicación correcta

### Firebase no funciona
- Verifica que los scripts de Firebase estén incluidos
- Asegúrate de que `firebaseConfig.js` esté configurado correctamente 