# Script para ejecutar comandos de Git
cd "C:\Users\Reynaldo Carpio\Documents\Expo Trivel\Trivel-Panama-1"

# Configurar Git para no usar pager
git config --global core.pager ""

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "Actualización de la página de Playa Venao, integración de Google Maps, correcciones en Destinations y actualización de imagen hero en Bocas del Toro"

# Hacer pull
git pull

Write-Host "Comandos de Git ejecutados exitosamente"

