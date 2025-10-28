# Servidor Web Simple para M3U8 Hosting
# Puerto: 8080

param(
    [int]$Puerto = 8080
)

$ErrorActionPreference = "Stop"

Write-Host "`n🚀 Iniciando servidor web..." -ForegroundColor Cyan
Write-Host "📁 Ruta: $(Get-Location)" -ForegroundColor Gray

# Verificar si el puerto está en uso
$portInUse = Get-NetTCPConnection -LocalPort $Puerto -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️  Puerto $Puerto en uso. Intentando con otro puerto..." -ForegroundColor Yellow
    $Puerto = 8081
}

try {
    # Crear listener HTTP
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://+:$Puerto/")
    $listener.Start()

    # Obtener la IP local
    $ipLocal = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*" } | Select-Object -First 1).IPAddress

    Write-Host "`n✅ Servidor iniciado exitosamente!" -ForegroundColor Green
    Write-Host "`n📱 Accede desde tu móvil:" -ForegroundColor Cyan
    Write-Host "   http://$ipLocal`:$Puerto" -ForegroundColor White -BackgroundColor DarkGreen
    Write-Host "`n💻 Acceso local:" -ForegroundColor Cyan
    Write-Host "   http://localhost:$Puerto" -ForegroundColor White
    Write-Host "`n⏹️  Presiona Ctrl+C para detener el servidor`n" -ForegroundColor Yellow

    # Abrir navegador automáticamente
    Start-Process "http://localhost:$Puerto"

    # Loop principal
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Obtener ruta solicitada
        $path = $request.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }

        # Construir ruta completa
        $filePath = Join-Path (Get-Location) $path.TrimStart('/')
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($request.HttpMethod) $path" -ForegroundColor Gray

        if (Test-Path $filePath -PathType Leaf) {
            # Determinar Content-Type
            $contentType = switch ([System.IO.Path]::GetExtension($filePath).ToLower()) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                ".m3u"  { "audio/x-mpegurl; charset=utf-8" }
                ".m3u8" { "application/vnd.apple.mpegurl; charset=utf-8" }
                default { "application/octet-stream" }
            }

            try {
                # Leer y enviar archivo
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $content.Length
                $response.StatusCode = 200
                
                # Agregar headers CORS
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Cache-Control", "no-cache")
                
                $response.OutputStream.Write($content, 0, $content.Length)
                $response.OutputStream.Close()
            }
            catch {
                Write-Host "   ❌ Error al leer archivo: $_" -ForegroundColor Red
                $response.StatusCode = 500
                $response.Close()
            }
        }
        else {
            # 404 - Archivo no encontrado
            Write-Host "   ⚠️  404 - No encontrado: $filePath" -ForegroundColor Yellow
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            
            $html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>404 - No encontrado</title>
    <style>
        body { 
            font-family: Arial; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: rgba(0,0,0,0.3);
            padding: 40px;
            border-radius: 20px;
        }
        h1 { font-size: 4em; margin: 0; }
        p { font-size: 1.5em; }
        a { color: #fff; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Archivo no encontrado</p>
        <p><a href="/">← Volver al inicio</a></p>
    </div>
</body>
</html>
"@
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($html)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
        }
    }
}
catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
}
finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        $listener.Close()
        Write-Host "`n🛑 Servidor detenido" -ForegroundColor Yellow
    }
}
