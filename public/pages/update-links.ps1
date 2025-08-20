# Script para actualizar enlaces incorrectos en los footers
# Reemplaza "carrusel.html" con "marketplace.html" en todas las páginas

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
        $content = Get-Content $file -Raw
        $content = $content -replace 'carrusel\.html', 'marketplace.html'
        Set-Content $file $content -NoNewline
        Write-Host "$file actualizado correctamente"
    } else {
        Write-Host "Archivo $file no encontrado"
    }
}

Write-Host "Proceso completado!"
