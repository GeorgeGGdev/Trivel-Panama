# Script para actualizar botones de autenticación en todas las páginas
# Agrega el botón de registrarse y envuelve el texto en spans

$files = @(
    "bocas-del-toro.html",
    "san-blas.html", 
    "playa-veracruz.html",
    "playa-venao.html",
    "playa-estrella.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Actualizando $file..."
        
        # Leer el contenido del archivo
        $content = Get-Content $file -Raw
        
        # Reemplazar el header de autenticación
        $oldHeader = '<div class="auth-buttons">\s*<button id="loginBtn" class="auth-btn login-btn">\s*<i class="fas fa-sign-in-alt"></i>\s*Iniciar Sesión\s*</button>\s*</div>'
        $newHeader = '<div class="auth-buttons">
            <button id="loginBtn" class="auth-btn login-btn">
                <i class="fas fa-sign-in-alt"></i>
                <span>Iniciar Sesión</span>
            </button>
            <button id="registerBtn" class="auth-btn register-btn">
                <i class="fas fa-user-plus"></i>
                <span>Registrarse</span>
            </button>
        </div>'
        
        $content = $content -replace $oldHeader, $newHeader
        
        # Guardar el archivo actualizado
        Set-Content $file $content -NoNewline
        Write-Host "$file actualizado correctamente"
    } else {
        Write-Host "Archivo $file no encontrado"
    }
}

Write-Host "Proceso completado!"
