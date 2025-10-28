# 📊 Carpeta Data - Configuración de Canales

## ⚠️ Archivos Privados

Los archivos de canales (`canales.js`, `canales.m3u`, etc.) están en `.gitignore` por razones de privacidad y no se suben al repositorio.

## 🚀 Configuración Inicial

### 1. Crear tu archivo de canales

Copia el archivo de ejemplo y renómbralo:

```bash
# Windows (PowerShell)
Copy-Item canales.example.js canales.js

# Linux/Mac
cp canales.example.js canales.js
```

### 2. Editar con tus canales

Abre `canales.js` y agrega tus propios canales siguiendo el formato:

```javascript
const CANALES_STREAMING = [
    { 
        name: "Nombre del Canal", 
        logo: "/posters/canales/logo.png", 
        url: "http://stream-url.com/playlist.m3u8", 
        category: "categoria" 
    },
    // Más canales...
];
```

## 📋 Estructura de un Canal

Cada canal debe tener estos campos:

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `name` | String | Nombre del canal | `"ESPN HD"` |
| `logo` | String | URL o ruta del logo | `"/posters/canales/espn.png"` |
| `url` | String | URL del stream M3U8 | `"http://ejemplo.com/stream.m3u8"` |
| `category` | String | Categoría del canal | `"deportes"` |

## 🏷️ Categorías Disponibles

- `deportes` - Canales deportivos
- `peliculas` - Películas
- `series` - Series y shows
- `nacionales` - Canales nacionales
- `peru` - Canales de Perú
- `colombia` - Canales de Colombia
- `espana` - Canales de España
- `internacional` - Canales internacionales
- `infantil` - Contenido infantil
- `documentales` - Documentales
- `novelas` - Novelas y telenovelas
- `musica` - Canales de música
- `religioso` - Contenido religioso
- `gourmet` - Cocina y gastronomía
- `24/7` - Programación 24/7 (Simpsons, etc.)
- `noticias` - Noticias
- `premium` - Canales premium
- `entretenimiento` - Entretenimiento general

## 🔧 Método Alternativo: Convertir desde M3U

Si tienes un archivo `.m3u` con tus canales:

### 1. Crea o edita `canales.m3u`

```m3u
#EXTM3U
#EXTINF:-1,ESPN
http://stream-url.com/espn/playlist.m3u8
#EXTINF:-1,HBO
http://stream-url.com/hbo/playlist.m3u8
```

### 2. Ejecuta el script de conversión

```bash
cd ..\scripts
.\convertir-m3u.ps1
```

### 3. Reemplaza el archivo generado

```bash
Move-Item ..\data\canales_nuevo.js ..\data\canales.js -Force
```

## ✅ Verificación

Después de crear tu archivo `canales.js`, verifica que:

1. ✅ El archivo existe en `/data/canales.js`
2. ✅ Tiene el formato correcto (array de objetos)
3. ✅ Cada canal tiene todos los campos requeridos
4. ✅ Las categorías son válidas
5. ✅ Las URLs de streams son M3U8 válidas

## 🔒 Seguridad

**IMPORTANTE:** 
- ❌ NO subas `canales.js` a repositorios públicos
- ❌ NO compartas URLs de streams privados
- ✅ Usa el archivo de ejemplo para demostración
- ✅ Mantén tus streams privados en local

## 📝 Formato M3U8

Las URLs de streams deben apuntar a archivos M3U8 válidos:

```
✅ http://ejemplo.com/stream/playlist.m3u8
✅ https://cdn.ejemplo.com/live/channel.m3u8
❌ http://ejemplo.com/video.mp4 (no es HLS)
❌ rtmp://ejemplo.com/stream (protocolo diferente)
```

## 🆘 Solución de Problemas

### "No se cargan los canales"
- Verifica que `canales.js` existe
- Revisa la consola del navegador (F12)
- Confirma que el formato es correcto

### "Canal no reproduce"
- Verifica la URL del stream en VLC
- Comprueba que sea formato M3U8/HLS
- Revisa posibles bloqueos CORS

### "Categoría no aparece"
- Verifica que el nombre de la categoría esté en la lista válida
- Revisa mayúsculas/minúsculas (debe ser minúsculas)

## 📚 Recursos

- [HLS.js Documentation](https://github.com/video-dev/hls.js/)
- [M3U8 Format Specification](https://tools.ietf.org/html/rfc8216)
- [Guía Completa del Proyecto](../docs/GUIA_COMPLETA.md)

---

**Recuerda:** Este archivo README se sube al repositorio, pero tus canales reales (`canales.js`) permanecen privados en local.
