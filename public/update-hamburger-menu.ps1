# PowerShell script to update all HTML pages with hamburger menu
# This script will add the hamburger menu CSS and JS to all HTML files

Write-Host "Updating HTML files with hamburger menu..." -ForegroundColor Green

# Get all HTML files in the pages directory
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    
    # Add hamburger menu CSS link if not already present
    if ($content -notmatch "hamburger-menu\.css") {
        $content = $content -replace '(<link rel="stylesheet" href="[^"]*\.css">\s*)+', '$0    <link rel="stylesheet" href="../CSS/hamburger-menu.css">' + "`n"
    }
    
    # Replace old hamburger div with new button
    $content = $content -replace '<div class="hamburger">\s*<span></span>\s*<span></span>\s*<span></span>\s*</div>', '<button class="hamburger-btn">`n            <span></span>`n            <span></span>`n            <span></span>`n        </button>'
    
    # Add hamburger menu JS script if not already present
    if ($content -notmatch "hamburger-menu\.js") {
        # Find the last script tag and add before it
        $content = $content -replace '(\s*<!-- Scripts -->\s*<script[^>]*>.*?</script>)', '$1`n    <script src="../JS/hamburger-menu.js"></script>'
    }
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
}

Write-Host "All HTML files have been updated with hamburger menu!" -ForegroundColor Green
