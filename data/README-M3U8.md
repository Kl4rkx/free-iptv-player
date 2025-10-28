# 📂 Directorio de Datos - Canales

Este directorio contiene los archivos de canales de streaming.

## 📺 Archivos Principales

### `canales.js` (Privado)
- **Descripción:** Base de datos completa de canales en formato JavaScript
- **Canales:** 11,815 canales totales
- **Incluye:** Todos los canales (incluidos 231 canales +18)
- **Uso:** Web application (index.html, index-tv.html)
- **Protegido:** ✅ En `.gitignore` (no se sube al repositorio)

### `canales-tv.m3u8` ⭐ (Recomendado para TV)
- **Descripción:** Playlist M3U8 optimizada para apps IPTV
- **Canales:** 11,669 canales (SIN contenido adulto)
- **Formato:** M3U8 Extended con categorías
- **Uso:** Apps IPTV (IPTV Smarters Pro, TiviMate, Kodi, etc.)
- **Características:**
  - ✅ Categorías con `group-title`
  - ✅ Logos incluidos con `tvg-logo`
  - ✅ EPG ID preparado con `tvg-id`
  - ✅ Compatible con todas las apps IPTV
  - ✅ Sin canales adultos (filtrado automático)
- **URL:** `http://[TU-IP]:8080/data/canales-tv.m3u8`

### `canales.m3u` (Privado)
- **Descripción:** Archivo M3U original (primera fuente)
- **Canales:** ~2,519 canales
- **Protegido:** ✅ En `.gitignore`

### `mascanales.m3u` (Privado)
- **Descripción:** Archivo M3U adicional (segunda fuente)
- **Canales:** ~21,955 líneas (múltiples canales)
- **Protegido:** ✅ En `.gitignore`

### `canales.example.js` (Público)
- **Descripción:** Plantilla de ejemplo para otros usuarios
- **Canales:** 4 canales de ejemplo
- **Uso:** Documentación y referencia

---

## 🔄 Regenerar Playlist M3U8

Si modificas `canales.js` (agregas/quitas canales), regenera el M3U8:

```bash
python scripts/generar-m3u8-tv.py
```

Este script automáticamente:
1. ✅ Lee `canales.js`
2. ✅ Filtra canales adultos (category: "adulto" o isAdult: true)
3. ✅ Organiza por categorías
4. ✅ Valida URLs
5. ✅ Genera metadata EPG (tvg-id, tvg-name, tvg-logo)
6. ✅ Crea `canales-tv.m3u8`
7. ✅ Muestra estadísticas

---

## 📊 Estadísticas

### `canales.js` (Base de datos completa)
```
Total:      11,815 canales
Adultos:       231 canales (+18)
Limpios:    11,584 canales (aptos para todos)
```

### `canales-tv.m3u8` (Playlist IPTV)
```
Total:      11,669 canales (sin adultos)
Filtrados:     146 canales (adultos + inválidos)
Categorías:     19 categorías organizadas
Tamaño:       2.65 MB
```

**Distribución por categoría:**
- General: 6,282 (53.8%)
- Música: 1,923 (16.5%)
- Internacional: 1,750 (15.0%)
- Películas: 499 (4.3%)
- Noticias: 344 (2.9%)
- Deportes: 264 (2.3%)
- Otras: 607 (5.2%)

---

## 🔧 Configurar Apps IPTV

### Método Rápido:

1. **Inicia el servidor:**
   ```bash
   python scripts/server-tv.py
   ```

2. **Copia la URL que aparece:**
   ```
   http://192.168.1.XXX:8080/data/canales-tv.m3u8
   ```

3. **En tu app IPTV (TV/móvil):**
   - IPTV Smarters Pro: "Load Playlist" → "M3U URL" → Pega la URL
   - TiviMate: Settings → Playlists → Add → URL → Pega la URL
   - Kodi: PVR IPTV Simple Client → M3U Play List URL → Pega la URL

4. **¡Disfruta 11,669 canales organizados!**

📖 **Guía completa:** [docs/CONFIGURACION-IPTV.md](../docs/CONFIGURACION-IPTV.md)

---

## 🔒 Privacidad

Los siguientes archivos están protegidos en `.gitignore`:
- `canales.js` (base de datos completa con adultos)
- `canales.m3u` (fuente original)
- `mascanales.m3u` (fuente adicional)
- `*.m3u` (cualquier archivo M3U)

El archivo `canales-tv.m3u8` **puede** subirse al repositorio si lo deseas (es seguro, sin adultos).

---

## 📝 Formato de Canales

### En `canales.js`:
```javascript
{
    name: "Canal HD",
    logo: "https://ejemplo.com/logo.png",
    url: "https://ejemplo.com/stream.m3u8",
    category: "deportes",
    isAdult: false
}
```

### En `canales-tv.m3u8`:
```m3u8
#EXTINF:-1 tvg-id="canalhd" tvg-name="Canal HD" tvg-logo="https://ejemplo.com/logo.png" group-title="Deportes",Canal HD
https://ejemplo.com/stream.m3u8
```

---

## ⚠️ Notas Importantes

1. **Canales offline:** Algunos canales pueden estar temporalmente offline (normal en streaming)
2. **URLs externas:** No controlamos la disponibilidad de los streams
3. **Contenido adulto:** Filtrado automáticamente en `canales-tv.m3u8`
4. **Uso responsable:** Solo para uso personal y educativo
5. **Sin alojamiento:** No alojamos contenido, solo URLs públicas

---

**¿Necesitas ayuda?** Consulta la [guía completa](../docs/CONFIGURACION-IPTV.md) o la [guía para TV](../GUIA-XIAOMI-TV.md)
