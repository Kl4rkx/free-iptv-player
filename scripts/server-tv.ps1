# Script de servidor HTTP para Android TV / Fire TV Stick
# Optimizado para acceso desde televisores

param(
    [int]$Port = 8080
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   SERVIDOR TV - M3U8 Platform" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio raíz del proyecto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = Split-Path -Parent $scriptPath
Set-Location $rootPath

# Obtener IP local
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.InterfaceAlias -notlike "*Loopback*" -and 
    $_.InterfaceAlias -notlike "*Bluetooth*" -and
    $_.IPAddress -like "192.168.*"
} | Select-Object -First 1).IPAddress

if (-not $localIP) {
    $localIP = "localhost"
}

Write-Host "📱 ACCESO DESDE TV:" -ForegroundColor Green
Write-Host "   └─ http://$($localIP):$Port" -ForegroundColor Yellow
Write-Host ""
Write-Host "📺 APPS RECOMENDADAS:" -ForegroundColor Green
Write-Host "   └─ Android TV: IPTV Smarters Pro, TiviMate" -ForegroundColor White
Write-Host "   └─ Fire TV: IPTV Smarters Pro, Kodi" -ForegroundColor White
Write-Host ""
Write-Host "🔗 CONFIGURAR M3U en app IPTV:" -ForegroundColor Green
Write-Host "   └─ URL: http://$($localIP):$Port/data/canales.m3u" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 WEB OPTIMIZADA TV:" -ForegroundColor Green
Write-Host "   └─ Navegador: http://$($localIP):$Port" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Asegúrate de:" -ForegroundColor Magenta
Write-Host "   1. Estar en la misma red WiFi" -ForegroundColor White
Write-Host "   2. Permitir el firewall si pregunta" -ForegroundColor White
Write-Host "   3. Usar el control remoto para navegar" -ForegroundColor White
Write-Host ""
Write-Host "Servidor iniciado... Presiona Ctrl+C para detener" -ForegroundColor Gray
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Crear listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$Port/")
$listener.Start()

# Tipos MIME optimizados para TV
$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.gif'  = 'image/gif'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.m3u'  = 'audio/x-mpegurl'
    '.m3u8' = 'application/vnd.apple.mpegurl'
    '.ts'   = 'video/mp2t'
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Obtener ruta solicitada
        $rawUrl = $request.RawUrl
        $path = if ($rawUrl -eq '/') { '/index.html' } else { $rawUrl }
        $path = $path.TrimStart('/')
        $filePath = Join-Path $rootPath $path

        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($request.HttpMethod) $rawUrl" -ForegroundColor Cyan

        # Headers CORS para TV
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

        if (Test-Path $filePath -PathType Leaf) {
            # Archivo existe
            $extension = [System.IO.Path]::GetExtension($filePath)
            $contentType = if ($mimeTypes.ContainsKey($extension)) { 
                $mimeTypes[$extension] 
            } else { 
                'application/octet-stream' 
            }

            $response.ContentType = $contentType
            $response.StatusCode = 200

            $fileContent = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $fileContent.Length
            $response.OutputStream.Write($fileContent, 0, $fileContent.Length)
            
            Write-Host "   └─ 200 OK ($contentType)" -ForegroundColor Green
        }
        else {
            # 404 - Archivo no encontrado
            $response.StatusCode = 404
            $response.ContentType = 'text/html; charset=utf-8'
            
            $html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - No encontrado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1a1a1a;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
        }
        h1 { font-size: 72px; margin: 0; color: #ff6b6b; }
        p { font-size: 24px; margin: 20px 0; }
        a { color: #4ecdc4; text-decoration: none; font-size: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Archivo no encontrado</p>
        <a href="/">← Volver al inicio</a>
    </div>
</body>
</html>
"@
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($html)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            
            Write-Host "   └─ 404 NOT FOUND" -ForegroundColor Red
        }

        $response.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "`nServidor detenido." -ForegroundColor Yellow
}
