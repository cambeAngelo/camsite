# Validation script for project structure (PowerShell)

Write-Host "=== CAMBE PORTFOLIO PROJECT VALIDATION ===" -ForegroundColor Cyan
Write-Host ""

function Check-File {
    param([string]$Path)
    if (Test-Path $Path -PathType Leaf) {
        Write-Host "✓ $Path" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Path (MISSING)" -ForegroundColor Red
        return $false
    }
}

function Check-Dir {
    param([string]$Path)
    if (Test-Path $Path -PathType Container) {
        Write-Host "✓ $Path/" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ $Path/ (MISSING)" -ForegroundColor Red
        return $false
    }
}

Write-Host "=== CLIENT STRUCTURE ===" -ForegroundColor Yellow
Check-Dir "client/src"
Check-Dir "client/src/components"
Check-Dir "client/src/components/ui"
Check-Dir "client/src/components/sections"
Check-Dir "client/src/pages"
Check-Dir "client/src/layouts"
Check-Dir "client/src/hooks"
Check-Dir "client/src/services"
Check-Dir "client/src/utils"
Check-Dir "client/src/styles"
Check-Dir "client/src/assets"
Check-File "client/src/App.tsx"
Check-File "client/src/main.tsx"
Check-File "client/src/index.css"
Check-File "client/package.json"

Write-Host ""
Write-Host "=== CLIENT COMPONENTS ===" -ForegroundColor Yellow
Check-File "client/src/components/sections/ContactForm.tsx"
Check-File "client/src/components/ui/ConfirmSendModal.tsx"
Check-File "client/src/components/ui/ResultModal.tsx"
Check-File "client/src/hooks/useContactForm.ts"
Check-File "client/src/services/contact.service.ts"
Check-File "client/src/services/api.ts"
Check-File "client/src/utils/cx.ts"
Check-File "client/src/utils/api-client.ts"

Write-Host ""
Write-Host "=== SERVER STRUCTURE ===" -ForegroundColor Yellow
Check-Dir "server/src"
Check-Dir "server/src/config"
Check-Dir "server/src/modules"
Check-Dir "server/src/modules/contact"
Check-Dir "server/src/middlewares"
Check-Dir "server/src/utils"
Check-Dir "server/src/db"
Check-File "server/src/app.js"
Check-File "server/src/server.js"
Check-File "server/package.json"
Check-File "server/.env"

Write-Host ""
Write-Host "=== SERVER MODULES ===" -ForegroundColor Yellow
Check-File "server/src/modules/contact/contact.routes.js"
Check-File "server/src/modules/contact/contact.controller.js"
Check-File "server/src/modules/contact/contact.service.js"
Check-File "server/src/modules/contact/contact.repository.js"
Check-File "server/src/modules/contact/contact.validator.js"
Check-File "server/src/modules/contact/contact.schema.js"

Write-Host ""
Write-Host "=== SERVER CONFIG & MIDDLEWARE ===" -ForegroundColor Yellow
Check-File "server/src/config/env.js"
Check-File "server/src/config/db.js"
Check-File "server/src/middlewares/error.middleware.js"
Check-File "server/src/middlewares/notfound.middleware.js"
Check-File "server/src/middlewares/validate.middleware.js"
Check-File "server/src/middlewares/auth.middleware.js"

Write-Host ""
Write-Host "=== SERVER UTILITIES ===" -ForegroundColor Yellow
Check-File "server/src/utils/logger.js"
Check-File "server/src/utils/helpers.js"

Write-Host ""
Write-Host "=== SHARED TYPES & CONTRACTS ===" -ForegroundColor Yellow
Check-File "shared/contact.contract.js"
Check-File "shared/contact.contract.d.ts"
Check-File "shared/index.js"

Write-Host ""
Write-Host "=== ROOT FILES ===" -ForegroundColor Yellow
Check-File "README.md"
Check-File ".gitignore"

Write-Host ""
Write-Host "=== VALIDATION COMPLETE ===" -ForegroundColor Cyan
