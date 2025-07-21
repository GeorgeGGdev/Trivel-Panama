$content = Get-Content -Path 'destinations.html' -Raw

# Actualizar enlaces para Bocas del Toro
$content = $content -replace '(?s)(<div class="card-content">.*?Bocas del Toro.*?<div class="card-footer">.*?)(<a href="playa-venao.html" class="learn-more">more information</a>)(.*?)(</div>.*?</div>)', '$1<a href="bocas-del-toro.html" class="learn-more">more information</a>$3$4'

# Actualizar enlaces para San Blas
$content = $content -replace '(?s)(<div class="card-content">.*?San Blas.*?<div class="card-footer">.*?)(<a href="playa-venao.html" class="learn-more">more information</a>)(.*?)(</div>.*?</div>)', '$1<a href="san-blas.html" class="learn-more">more information</a>$3$4'

# Guardar cambios
Set-Content -Path 'destinations.html' -Value $content
