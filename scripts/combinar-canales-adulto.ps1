# Script para combinar canales existentes con mascanales.m3u
# Detecta contenido adulto automáticamente y evita duplicados

$ErrorActionPreference = "Continue"
$rutaCanalesJs = "c:\Users\Klark\Documents\Proyectos\m3u8hosting\data\canales.js"
$rutaMasCanales = "c:\Users\Klark\Documents\Proyectos\m3u8hosting\data\mascanales.m3u"
$rutaSalida = "c:\Users\Klark\Documents\Proyectos\m3u8hosting\data\canales.js.new"

# Patrones para detectar contenido adulto
$patronesAdulto = @(
    'venus', 'xxx', 'porn', 'adult', 'sexy', 'playboy', 'private', 'dorcel',
    'hustler', 'penthouse', 'vivid', 'brazzers', 'bangbros', 'redlight',
    'erotic', 'hot\s', 'nude', 'anal', 'bigass', 'bigdick', 'blonde',
    'blowjob', 'fetish', 'hardcore', 'interracial', 'latina', 'lesbian',
    'livecams', 'milf', 'pornstar', 'pov', 'rough', 'russian', 'teen',
    'threesome', 'shot\stv', 'exxxotica'
)

# Categorías generales para otros canales
$categorias = @{
    'espn|deportes|sports|football|soccer|futbol|liga|premier|champions|uefa' = 'deportes'
    'hbo|cine|movie|film|pelicula' = 'peliculas'
    'cartoon|disney|nick|kids|infantil|детские' = 'infantil'
    'news|noticias|24h|bbc|cnn|fox news' = 'noticias'
    'music|musica|mtv|vh1|музыкальные' = 'musica'
    'discovery|natgeo|history|documentary|культура' = 'documentales'
    'comedy|comedia|entretenimiento|entertainment' = 'entretenimiento'
    'series|drama|thriller' = 'series'
    'radio|fm' = 'musica'
}

function Detectar-CategoriaAdulto {
    param([string]$nombre, [string]$url, [string]$groupTitle)
    
    $texto = "$nombre $url $groupTitle".ToLower()
    
    foreach ($patron in $patronesAdulto) {
        if ($texto -match $patron) {
            Write-Host "  [+18] Detectado: $nombre" -ForegroundColor Magenta
            return $true
        }
    }
    return $false
}

function Detectar-Categoria {
    param([string]$nombre, [string]$url, [string]$groupTitle)
    
    $texto = "$nombre $url $groupTitle".ToLower()
    
    foreach ($patron in $categorias.Keys) {
        if ($texto -match $patron) {
            return $categorias[$patron]
        }
    }
    return 'general'
}

Write-Host "`n=== COMBINANDO CANALES ===" -ForegroundColor Cyan
Write-Host "Leyendo canales existentes..." -ForegroundColor Yellow

# Leer canales existentes del JS
$contenidoJs = Get-Content $rutaCanalesJs -Raw -Encoding UTF8
$canalesExistentes = @{}
$contadorExistentes = 0
$contadorAdultosExistentes = 0

# Parsear canales existentes
$matches = [regex]::Matches($contenidoJs, '\{\s*name:\s*"([^"]+)"\s*,\s*logo:\s*"([^"]*)"\s*,\s*url:\s*"([^"]+)"\s*,\s*category:\s*"([^"]+)"\s*\}')
foreach ($match in $matches) {
    $nombre = $match.Groups[1].Value
    $logo = $match.Groups[2].Value
    $url = $match.Groups[3].Value
    $categoria = $match.Groups[4].Value
    
    $nombreNormalizado = $nombre.ToLower().Trim() -replace '\s+', ' '
    
    if (-not $canalesExistentes.ContainsKey($nombreNormalizado)) {
        $canalesExistentes[$nombreNormalizado] = @{
            name = $nombre
            logo = $logo
            url = $url
            category = $categoria
        }
        $contadorExistentes++
        if ($categoria -eq 'adulto') {
            $contadorAdultosExistentes++
        }
    }
}

Write-Host "  Encontrados: $contadorExistentes canales ($contadorAdultosExistentes adultos)" -ForegroundColor Green

Write-Host "`nParsing mascanales.m3u..." -ForegroundColor Yellow
$lineas = Get-Content $rutaMasCanales -Encoding UTF8
$nuevosCanales = @()
$contadorNuevos = 0
$contadorNuevosAdultos = 0
$contadorDuplicados = 0

for ($i = 0; $i -lt $lineas.Count; $i++) {
    $linea = $lineas[$i].Trim()
    
    if ($linea -match '^#EXTINF:-1\s+(.*)') {
        $atributos = $matches[1]
        $nombre = ''
        $logo = ''
        $groupTitle = ''
        
        # Extraer nombre (último segmento después de la última coma)
        if ($atributos -match ',([^,]+)$') {
            $nombre = $matches[1].Trim()
        }
        
        # Extraer logo
        if ($atributos -match 'tvg-logo="([^"]+)"') {
            $logo = $matches[1]
        }
        
        # Extraer group-title
        if ($atributos -match 'group-title="([^"]+)"') {
            $groupTitle = $matches[1]
        }
        
        # Siguiente línea debería ser la URL
        if (($i + 1) -lt $lineas.Count) {
            $url = $lineas[$i + 1].Trim()
            
            # Validar que sea una URL válida
            if ($url -match '^(http|https|rtmp|rtsp):\/\/' -and $nombre -ne '') {
                $nombreNormalizado = $nombre.ToLower().Trim() -replace '\s+', ' '
                
                # Verificar duplicados
                if ($canalesExistentes.ContainsKey($nombreNormalizado)) {
                    $contadorDuplicados++
                    continue
                }
                
                # Detectar si es adulto
                $esAdulto = Detectar-CategoriaAdulto -nombre $nombre -url $url -groupTitle $groupTitle
                
                if ($esAdulto) {
                    $categoria = 'adulto'
                    $contadorNuevosAdultos++
                } else {
                    $categoria = Detectar-Categoria -nombre $nombre -url $url -groupTitle $groupTitle
                }
                
                # Añadir a canales existentes para evitar duplicados
                $canalesExistentes[$nombreNormalizado] = @{
                    name = $nombre
                    logo = $logo
                    url = $url
                    category = $categoria
                }
                
                $nuevosCanales += @{
                    name = $nombre
                    logo = $logo
                    url = $url
                    category = $categoria
                }
                
                $contadorNuevos++
                
                if ($contadorNuevos % 100 -eq 0) {
                    Write-Host "  Procesados: $contadorNuevos canales nuevos ($contadorNuevosAdultos adultos)..." -ForegroundColor Gray
                }
            }
        }
    }
}

Write-Host "`n=== RESUMEN ===" -ForegroundColor Cyan
Write-Host "Canales existentes: $contadorExistentes ($contadorAdultosExistentes adultos)" -ForegroundColor Green
Write-Host "Canales nuevos: $contadorNuevos ($contadorNuevosAdultos adultos)" -ForegroundColor Green
Write-Host "Duplicados omitidos: $contadorDuplicados" -ForegroundColor Yellow
Write-Host "Total combinado: $($contadorExistentes + $contadorNuevos)" -ForegroundColor Cyan

Write-Host "`nGenerando nuevo archivo canales.js..." -ForegroundColor Yellow

# Generar nuevo archivo JS
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("// ====================================")
[void]$sb.AppendLine("// CANALES DE STREAMING")
[void]$sb.AppendLine("// Total: $($contadorExistentes + $contadorNuevos) canales")
[void]$sb.AppendLine("// Adultos: $($contadorAdultosExistentes + $contadorNuevosAdultos) canales +18")
[void]$sb.AppendLine("// Actualizado: $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$sb.AppendLine("// ====================================")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("const CANALES_STREAMING = [")

# Primero los existentes
$contador = 0
foreach ($canal in $canalesExistentes.Values) {
    $contador++
    $coma = if ($contador -lt ($canalesExistentes.Count + $nuevosCanales.Count)) { "," } else { "" }
    
    $nombreEscapado = $canal.name -replace '"', '\"'
    $logoEscapado = $canal.logo -replace '"', '\"'
    $urlEscapada = $canal.url -replace '"', '\"'
    
    [void]$sb.AppendLine("    { name: `"$nombreEscapado`", logo: `"$logoEscapado`", url: `"$urlEscapada`", category: `"$($canal.category)`" }$coma")
}

[void]$sb.AppendLine("];")

# Guardar archivo
$sb.ToString() | Out-File -FilePath $rutaSalida -Encoding UTF8 -NoNewline

Write-Host "`n✅ Archivo generado: $rutaSalida" -ForegroundColor Green
Write-Host "`nPara aplicar los cambios:" -ForegroundColor Yellow
Write-Host "  1. Revisa el archivo: $rutaSalida" -ForegroundColor White
Write-Host "  2. Si está correcto, renombra:" -ForegroundColor White
Write-Host "     Move-Item -Force '$rutaSalida' '$rutaCanalesJs'" -ForegroundColor Cyan
Write-Host ""
