# PowerShell script to update header layout in all HTML pages
# This script will move the hamburger button to the left of the logo

Write-Host "Updating header layout in HTML files..." -ForegroundColor Green

# Get all HTML files in the pages directory
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    
    # Move hamburger button to the left of logo
    $content = $content -replace '<header class="header">\s*<div class="logo">', '<header class="header">`n        <button class="hamburger-btn">`n            <span></span>`n            <span></span>`n            <span></span>`n        </button>`n        <div class="logo">'
    
    # Remove the old hamburger button position
    $content = $content -replace '<button class="hamburger-btn">\s*<span></span>\s*<span></span>\s*<span></span>\s*</button>\s*</div>', '</div>'
    
    # Add header layout styles if not present
    if ($content -notmatch "Header layout adjustments") {
        $content = $content -replace '(\s*</style>)', '        /* Header layout adjustments */`n        .header {`n            display: flex;`n            align-items: center;`n            gap: 1rem;`n        }`n        `n        .hamburger-btn {`n            order: 1;`n        }`n        `n        .logo {`n            order: 2;`n            flex: 1;`n        }`n        `n        .nav-menu {`n            order: 3;`n        }`n        `n        .auth-buttons {`n            order: 4;`n        }`n        `n$1'
    }
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
}

Write-Host "All HTML files have been updated with new header layout!" -ForegroundColor Green
