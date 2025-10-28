# Script de Conversión M3U a JavaScript
# Convierte archivo canales.m3u a canales.js con categorización automática

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando conversión de M3U a JavaScript..." -ForegroundColor Cyan

# Leer archivo M3U desde la carpeta data
Write-Host "📖 Leyendo archivo data/canales.m3u..." -ForegroundColor Yellow
$content = Get-Content "..\data\canales.m3u" -Encoding UTF8
$channels = @()
$i = 0

Write-Host "🔄 Parseando canales..." -ForegroundColor Yellow

# Parsear archivo M3U
while ($i -lt $content.Count) {
    if ($content[$i] -match '^#EXTINF:') {
        $line = $content[$i]
        
        # Extraer nombre del canal
        $name = $line -replace '^#EXTINF:-?\d+\s*,\s*', ''
        $name = $name -replace '[✅⭐]', ''
        $name = $name.Trim()
        
        # Obtener URL (siguiente línea)
        if ($i + 1 -lt $content.Count -and $content[$i + 1] -notmatch '^#') {
            $url = $content[$i + 1].Trim()
            
            # Solo procesar URLs válidas
            if ($url -match '^http') {
                # Categorización automática
                $category = 'internacional'
                
                if ($name -match 'ESPN|Fox Sports|DAZN|Win|Sports|Gol|Liga|Deportes|Sport|Futbol|TyC|DirectV|Sky Sport|BeIN|Tigo|Claro Sport') {
                    $category = 'deportes'
                } 
                elseif ($name -match 'HBO|Golden|Cinemax|Star|Sony|Universal|TNT|Paramount|Cine|Space|Warner|FX') {
                    $category = 'peliculas'
                } 
                elseif ($name -match 'Discovery|National|Animal|History|H2|Film\&Arts|Love Nature') {
                    $category = 'documentales'
                } 
                elseif ($name -match 'Disney|Nick|Cartoon|Infantil|Kids|Baby|Tooncast') {
                    $category = 'infantil'
                } 
                elseif ($name -match 'CNN|BBC|France|DW|RT|Noticias|News|Al Jazeera|CGTN') {
                    $category = 'noticias'
                } 
                elseif ($name -match 'ATV|Latina|Willax|Peru|RPP|América|GOL PER|Panamericana') {
                    $category = 'peru'
                } 
                elseif ($name -match 'Caracol|RCN|Colombia|City|Telepacifico') {
                    $category = 'colombia'
                } 
                elseif ($name -match 'TVE|LA 2|España|Antena|A3') {
                    $category = 'espana'
                } 
                elseif ($name -match 'MTV|HTV|Music|Musica|Telehit|Hit|FM') {
                    $category = 'musica'
                } 
                elseif ($name -match 'Novela|Pasion|Tlnovelas|Drama|Kanal') {
                    $category = 'novelas'
                } 
                elseif ($name -match 'EWTN|Enlace|Bethel|Solidaridad|Religios|3ABN') {
                    $category = 'religioso'
                } 
                elseif ($name -match 'A\&E|AMC|Series|AXN|Telemundo|Las Estrellas') {
                    $category = 'series'
                }
                elseif ($name -match 'Simpson|Chavo|Dragon Ball') {
                    $category = '24/7'
                }
                elseif ($name -match 'Gourmet|Cocina|Food') {
                    $category = 'gourmet'
                }
                
                # Crear objeto de canal
                $channel = @{
                    name = $name
                    url = $url
                    category = $category
                }
                
                $channels += $channel
            }
        }
        
        $i += 2
    } else {
        $i++
    }
}

Write-Host "✅ Parseados $($channels.Count) canales" -ForegroundColor Green

# Generar código JavaScript
Write-Host "🔨 Generando código JavaScript..." -ForegroundColor Yellow

$jsHeader = @"
// ====================================
// CANALES DE STREAMING
// Total: $($channels.Count) canales
// Generado: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
// Fuente: canales.m3u
// ====================================

const CANALES_STREAMING = [
"@

$jsFooter = @"

];

// Exportar para uso en index.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CANALES_STREAMING;
}
"@

$jsBody = ""
foreach ($channel in $channels) {
    $nameClean = $channel.name -replace '"', '\"'
    $jsBody += "    { name: `"$nameClean`", logo: `"https://i.imgur.com/placeholder.png`", url: `"$($channel.url)`", category: `"$($channel.category)`" },`n"
}

# Guardar archivo
$jsComplete = $jsHeader + "`n" + $jsBody + $jsFooter
$jsComplete | Out-File "..\data\canales_nuevo.js" -Encoding UTF8 -NoNewline

Write-Host "💾 Archivo generado: data/canales_nuevo.js" -ForegroundColor Green

# Estadísticas
Write-Host "`n📊 Estadísticas:" -ForegroundColor Cyan
$stats = $channels | Group-Object category | Sort-Object Count -Descending
foreach ($stat in $stats) {
    Write-Host "   $($stat.Name): $($stat.Count) canales" -ForegroundColor White
}

# Resumen
Write-Host "`n✨ Conversión completada exitosamente!" -ForegroundColor Green
Write-Host "📁 Archivo de salida: data/canales_nuevo.js" -ForegroundColor Yellow
Write-Host "📝 Total de canales: $($channels.Count)" -ForegroundColor Yellow
Write-Host "📂 Categorías: $($stats.Count)" -ForegroundColor Yellow

Write-Host "`n⚠️  IMPORTANTE:" -ForegroundColor Red
Write-Host "1. Revisa el archivo data/canales_nuevo.js" -ForegroundColor White
Write-Host "2. Si todo está correcto, reemplaza canales.js:" -ForegroundColor White
Write-Host "   Move-Item ..\data\canales_nuevo.js ..\data\canales.js -Force" -ForegroundColor Cyan
Write-Host "3. Refresca el navegador para ver los cambios" -ForegroundColor White

# Crear backup del archivo actual
if (Test-Path "..\data\canales.js") {
    $backupName = "..\data\canales_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss').js"
    Copy-Item "..\data\canales.js" $backupName
    Write-Host "`n💾 Backup creado: $backupName" -ForegroundColor Green
}
