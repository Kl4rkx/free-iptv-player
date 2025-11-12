# Deployment Script for Free IPTV Player
# This script helps deploy to Vercel and configure GitHub Secrets

Write-Host "🚀 Free IPTV Player - Deployment Helper" -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI no está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Yellow
    Write-Host "  1. Instalar Vercel CLI: npm install -g vercel" -ForegroundColor White
    Write-Host "  2. O desplegar manualmente desde vercel.com" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "¿Instalar Vercel CLI ahora? (s/n)"
    
    if ($choice -eq 's' -or $choice -eq 'S') {
        Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Cyan
        npm install -g vercel
    } else {
        Write-Host ""
        Write-Host "📖 Consulta docs/DEPLOYMENT.md para desplegar manualmente" -ForegroundColor Yellow
        exit
    }
}

Write-Host "✅ Vercel CLI disponible" -ForegroundColor Green
Write-Host ""

# Deploy to Vercel
Write-Host "🚀 Desplegando a Vercel..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "📋 Copia la URL de Vercel que apareció arriba" -ForegroundColor Yellow
Write-Host ""

$vercelUrl = Read-Host "Introduce tu URL de Vercel (ej: https://tu-proyecto.vercel.app)"

if ($vercelUrl) {
    $proxyUrl = "$vercelUrl/api/xtream"
    
    Write-Host ""
    Write-Host "🔐 Configurando GitHub Secret..." -ForegroundColor Cyan
    
    if ($ghInstalled) {
        # Usar GitHub CLI para configurar el secret
        Write-Host ""
        Write-Host "Se detectó GitHub CLI. Configurando secret automáticamente..." -ForegroundColor Green
        
        try {
            gh secret set VERCEL_PROXY_URL -b $proxyUrl
            Write-Host "✅ Secret VERCEL_PROXY_URL configurado correctamente" -ForegroundColor Green
        } catch {
            Write-Host "❌ Error al configurar el secret con GitHub CLI" -ForegroundColor Red
            Write-Host "Configúralo manualmente en GitHub Settings" -ForegroundColor Yellow
        }
    } else {
        Write-Host ""
        Write-Host "⚠️ GitHub CLI no está instalado" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Configura el secret manualmente:" -ForegroundColor Cyan
        Write-Host "  1. Ve a GitHub → Settings → Secrets and variables → Actions" -ForegroundColor White
        Write-Host "  2. Click en 'New repository secret'" -ForegroundColor White
        Write-Host "  3. Name: VERCEL_PROXY_URL" -ForegroundColor White
        Write-Host "  4. Value: $proxyUrl" -ForegroundColor Green
        Write-Host ""
        Write-Host "📖 Guía completa: docs/GITHUB-SECRETS.md" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "💡 Para instalar GitHub CLI: winget install GitHub.cli" -ForegroundColor Yellow
    }
    
    Write-Host ""
    $commit = Read-Host "¿Hacer commit y push a GitHub para activar el despliegue? (s/n)"
    
    if ($commit -eq 's' -or $commit -eq 'S') {
        git add .
        git commit -m "Configure Vercel proxy deployment"
        git push origin main
        
        Write-Host ""
        Write-Host "🎉 ¡Despliegue completado!" -ForegroundColor Green
        Write-Host ""
        Write-Host "GitHub Actions desplegará automáticamente con el nuevo secret" -ForegroundColor Cyan
        Write-Host "Revisa el progreso en: https://github.com/$(git config remote.origin.url | Select-String -Pattern '[\w-]+/[\w-]+(?=\.git)' | ForEach-Object { $_.Matches.Value })/actions" -ForegroundColor Blue
    } else {
        Write-Host ""
        Write-Host "⚠️ No olvides hacer commit y push manualmente:" -ForegroundColor Yellow
        Write-Host "   git add ." -ForegroundColor White
        Write-Host "   git commit -m 'Configure Vercel proxy deployment'" -ForegroundColor White
        Write-Host "   git push origin main" -ForegroundColor White
    }
} else {
    Write-Host "❌ No se proporcionó URL de Vercel" -ForegroundColor Red
}

Write-Host ""
Write-Host "📖 Más información:" -ForegroundColor Cyan
Write-Host "   • Despliegue: docs/DEPLOYMENT.md" -ForegroundColor White
Write-Host "   • GitHub Secrets: docs/GITHUB-SECRETS.md" -ForegroundColor White
