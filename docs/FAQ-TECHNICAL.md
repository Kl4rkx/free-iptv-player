# ❓ Preguntas Técnicas Frecuentes (FAQ Technical)

## 🔧 Reproducción de Streams

### ¿Qué tecnología usa el reproductor web para reproducir streams M3U8?

El reproductor web utiliza dos tecnologías diferentes dependiendo del navegador:

1. **HLS.js (v1.4.14)** - Para navegadores como Chrome, Firefox, Edge
2. **Soporte Nativo HLS** - Para Safari, iOS y algunos navegadores móviles

### ¿Qué User Agent utiliza el reproductor?

**El reproductor NO utiliza un User Agent personalizado.** Utiliza el User Agent nativo del navegador que estés usando.

Ejemplos de User Agents según el navegador:

- **Chrome/Edge:** `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`
- **Firefox:** `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0`
- **Safari:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15`

### ¿Cómo funciona HLS.js?

HLS.js es una librería JavaScript que:
1. Descarga el manifest M3U8 usando **Fetch API** del navegador
2. Parsea los segmentos de video
3. Los descarga y los decodifica en el navegador
4. Los reproduce usando el elemento `<video>` de HTML5

**Importante:** Todas las peticiones HTTP se realizan desde el navegador del usuario, usando el User Agent del navegador.

### ¿Qué headers HTTP usa el reproductor?

#### Para cargar listas M3U/M3U8 (playlist-loader.js):
```javascript
{
  'Accept': 'application/x-mpegURL, application/vnd.apple.mpegurl, text/plain, */*'
}
```

#### Para reproducir streams (HLS.js):
HLS.js usa los headers por defecto del navegador. No se configuran headers personalizados adicionales.

---

## 🚫 Error 403 Forbidden en Jellyfin/FFmpeg

### ¿Por qué me da error 403 en Jellyfin pero funciona en el reproductor web?

El error 403 (Forbidden) suele ocurrir porque:

1. **User Agent diferente:** FFmpeg/Jellyfin usa un User Agent diferente al navegador
2. **Protección del servidor:** Algunos servidores de streaming bloquean User Agents conocidos como FFmpeg
3. **Falta de headers:** FFmpeg puede no enviar todos los headers que el servidor espera
4. **Referer:** Algunos servidores requieren un header Referer específico

### ¿Cómo solucionar el error 403 en Jellyfin/FFmpeg?

#### Opción 1: Especificar User Agent en FFmpeg
```bash
ffmpeg -user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -i "URL_DEL_STREAM.m3u8" ...
```

#### Opción 2: Agregar headers adicionales
```bash
ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Referer: https://example.com/" -i "URL_DEL_STREAM.m3u8" ...
```

#### Opción 3: Configurar Jellyfin
En Jellyfin, puedes configurar el User Agent en:
1. `Panel de Control` → `Reproducción`
2. Buscar opciones de FFmpeg
3. Agregar parámetros personalizados de FFmpeg

**Ejemplo de configuración:**
```
-user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
```

### ¿Puedo usar el mismo User Agent que el reproductor web?

Sí, pero **recuerda que el User Agent varía según el navegador que uses**. Te recomendamos:

1. **Chrome/Edge User Agent (más compatible):**
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   ```

2. **Firefox User Agent:**
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
   ```

---

## 🔍 Debugging y Análisis

### ¿Cómo puedo ver qué User Agent está usando mi navegador?

1. Abre las **DevTools** del navegador (F12)
2. Ve a la pestaña **Console**
3. Escribe: `navigator.userAgent`
4. Presiona Enter

### ¿Cómo puedo ver las peticiones HTTP que hace el reproductor?

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Network** (Red)
3. Filtra por `m3u8` o `ts` (segmentos de video)
4. Reproduce un canal
5. Verás todas las peticiones HTTP con sus headers

### ¿Cómo puedo probar si un stream funciona con FFmpeg?

```bash
# Probar descarga simple
ffmpeg -i "URL_DEL_STREAM.m3u8" -t 10 -c copy test.mp4

# Probar con User Agent personalizado
ffmpeg -user_agent "Mozilla/5.0" -i "URL_DEL_STREAM.m3u8" -t 10 -c copy test.mp4

# Ver información del stream sin descargarlo
ffprobe "URL_DEL_STREAM.m3u8"
```

---

## 📊 Configuración de HLS.js en el Reproductor

El reproductor usa la siguiente configuración de HLS.js (ver `src/js/player.js`):

```javascript
{
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90,
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
  manifestLoadingTimeOut: 10000,
  manifestLoadingMaxRetry: 3,
  levelLoadingTimeOut: 10000,
  levelLoadingMaxRetry: 4,
  fragLoadingTimeOut: 20000,
  fragLoadingMaxRetry: 6,
  // ... más configuraciones
}
```

Esta configuración está optimizada para:
- ✅ Baja latencia
- ✅ Recuperación automática de errores
- ✅ Múltiples reintentos
- ✅ Buffer optimizado

---

## 🛠️ Más Información

- **Código del reproductor:** `src/js/player.js`
- **Carga de playlists:** `src/js/playlist-loader.js`
- **HLS.js Documentation:** https://github.com/video-dev/hls.js/
- **FFmpeg Documentation:** https://ffmpeg.org/documentation.html

---

## 📞 ¿Necesitas más ayuda?

Si tienes más preguntas técnicas, por favor:
1. Revisa el código fuente en `/src/js/`
2. Consulta la documentación de HLS.js
3. Abre un issue en GitHub con detalles específicos

---

**Última actualización:** 2025-11-09
