# ============================================
# M3U8 Streaming Platform - Quick Start (PowerShell)
# ============================================

Write-Host "🚀 Iniciando M3U8 Streaming Platform..." -ForegroundColor Cyan
Write-Host ""

$PORT = 8080

Write-Host "🌐 Puerto: $PORT" -ForegroundColor Yellow
Write-Host ""

# Función para abrir navegador
function Open-Browser {
    $url = "http://localhost:$PORT"
    Write-Host "🌐 Abriendo navegador en $url..." -ForegroundColor Green
    Start-Process $url
}

# Verificar si Python está instalado
if (Get-Command python3 -ErrorAction SilentlyContinue) {
    Write-Host "✅ Python 3 encontrado" -ForegroundColor Green
    Write-Host "🚀 Iniciando servidor..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📍 Accede a: http://localhost:$PORT" -ForegroundColor Yellow
    Write-Host "📍 Desde móvil: http://$(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike '*Loopback*'} | Select-Object -First 1 -ExpandProperty IPAddress):$PORT" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "⌨️  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador después de 2 segundos
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 2
        Start-Process "http://localhost:$using:PORT"
    } | Out-Null
    
    # Iniciar servidor
    python3 -m http.server $PORT
}
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "✅ Python encontrado" -ForegroundColor Green
    Write-Host "🚀 Iniciando servidor..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📍 Accede a: http://localhost:$PORT" -ForegroundColor Yellow
    Write-Host "📍 Desde móvil: http://$(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike '*Loopback*'} | Select-Object -First 1 -ExpandProperty IPAddress):$PORT" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "⌨️  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador después de 2 segundos
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 2
        Start-Process "http://localhost:$using:PORT"
    } | Out-Null
    
    # Iniciar servidor
    python -m http.server $PORT
}
elseif (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✅ Node.js encontrado" -ForegroundColor Green
    
    if (Get-Command npx -ErrorAction SilentlyContinue) {
        Write-Host "🚀 Iniciando servidor con http-server..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📍 Accede a: http://localhost:$PORT" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "⌨️  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
        Write-Host ""
        
        # Abrir navegador después de 2 segundos
        Start-Job -ScriptBlock {
            Start-Sleep -Seconds 2
            Start-Process "http://localhost:$using:PORT"
        } | Out-Null
        
        # Iniciar servidor
        npx http-server -p $PORT
    }
    else {
        Write-Host "❌ Error: npx no está disponible" -ForegroundColor Red
        Write-Host "💡 Instala http-server: npm install -g http-server" -ForegroundColor Yellow
        exit 1
    }
}
else {
    Write-Host "❌ Error: No se encontró Python ni Node.js" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor instala uno de los siguientes:" -ForegroundColor Yellow
    Write-Host "  - Python 3: https://www.python.org/downloads/"
    Write-Host "  - Node.js: https://nodejs.org/"
    exit 1
}
