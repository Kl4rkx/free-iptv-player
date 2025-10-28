# 📺 Configuración para Apps IPTV en TV

## 🎯 Playlist Optimizada

Se ha generado una **playlist M3U8 profesional** específicamente optimizada para apps IPTV:

**Archivo:** `data/canales-tv.m3u8`

### ✨ Características:

✅ **11,669 canales** de TV en vivo  
✅ **SIN canales adultos** (144 canales filtrados)  
✅ **Categorías organizadas** con `group-title`  
✅ **Logos incluidos** con `tvg-logo`  
✅ **EPG ID** preparado para guías de programación  
✅ **Formato estándar M3U8 Extended**  
✅ **Compatible con TODAS las apps IPTV**  

---

## 📱 Apps IPTV Recomendadas

### **1. IPTV Smarters Pro** ⭐ (La Mejor)

**Disponible en:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android móvil
- iOS (App Store)

**Características:**
- ✅ Interfaz moderna y rápida
- ✅ EPG (guía de programación)
- ✅ Favoritos y grabación
- ✅ Control parental con PIN
- ✅ Reproductor optimizado

### **2. TiviMate** ⭐ (Premium pero Excelente)

**Disponible en:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android móvil

**Características:**
- ✅ Mejor interfaz de todas
- ✅ EPG avanzado con timeline
- ✅ PVR (grabación programada)
- ✅ Múltiples playlists
- ⚠️ Requiere suscripción premium ($5/año)

### **3. Perfect Player**

**Disponible en:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android móvil

**Características:**
- ✅ Gratis y sin publicidad
- ✅ Muy personalizable
- ✅ EPG compatible
- ✅ Ligera y rápida

### **4. Kodi + PVR IPTV Simple Client**

**Disponible en:**
- Windows, Mac, Linux
- Android TV / Fire TV
- Raspberry Pi

**Características:**
- ✅ Suite multimedia completa
- ✅ Altamente personalizable
- ✅ Add-ons infinitos
- ⚠️ Más complejo de configurar

---

## 🔧 Configuración Paso a Paso

### **Método 1: Servidor Local** 🏠

#### 1️⃣ Iniciar Servidor

```bash
# En tu PC, ejecuta:
python scripts/server-tv.py
```

Verás la IP de tu servidor, ejemplo: `http://192.168.1.200:8080`

#### 2️⃣ Configurar App IPTV

**En IPTV Smarters Pro:**
```
1. Abre la app en tu TV
2. Selecciona "Load Your Playlist or File/URL"
3. Elige "M3U URL / Xtream Codes API"
4. Ingresa:
   • Playlist Name: Streaming TV
   • File/URL: http://192.168.1.200:8080/data/canales-tv.m3u8
   • Username: (dejar vacío)
   • Password: (dejar vacío)
5. Toca "Add User"
6. ¡Listo! 11,669 canales organizados por categorías
```

**En TiviMate:**
```
1. Settings → Playlists → Add playlist
2. Selecciona "URL"
3. URL: http://192.168.1.200:8080/data/canales-tv.m3u8
4. Playlist name: Streaming TV
5. Auto-update: Disabled
6. Save
```

**En Perfect Player:**
```
1. Settings → Playlists (EPG)
2. Add playlist
3. Name: Streaming TV
4. URL: http://192.168.1.200:8080/data/canales-tv.m3u8
5. OK → Refresh
```

**En Kodi:**
```
1. Add-ons → Install from repository
2. PVR clients → PVR IPTV Simple Client
3. Install y Configure
4. General → Location: Remote Path (Internet address)
5. M3U Play List URL: http://192.168.1.200:8080/data/canales-tv.m3u8
6. Enable → Restart Kodi
7. TV → Ver canales
```

---

### **Método 2: URL Pública** 🌐 (Avanzado)

Si quieres acceder desde **cualquier lugar** (no solo tu red local):

#### Opción A: Subir a la Nube

```bash
# 1. Sube canales-tv.m3u8 a:
#    - Google Drive (obtén link directo)
#    - Dropbox (obtén link directo)
#    - GitHub Pages

# 2. En la app IPTV, usa la URL pública
```

#### Opción B: Servidor Permanente (Raspberry Pi / VPS)

```bash
# 1. Copia canales-tv.m3u8 a tu servidor
# 2. Configura nginx/apache
# 3. Usa la IP pública del servidor
```

---

## 📊 Categorías Disponibles

La playlist incluye estas categorías organizadas:

| Categoría | Canales | Descripción |
|-----------|---------|-------------|
| **General** | 6,282 | Canales variados |
| **Música** | 1,923 | Videos musicales, conciertos |
| **Internacional** | 1,750 | Canales de todo el mundo |
| **Películas** | 499 | Cine 24/7 |
| **Noticias** | 344 | Información en vivo |
| **Deportes** | 264 | Fútbol, baloncesto, etc |
| **Infantil** | 153 | Contenido para niños |
| **Series** | 106 | Maratones de series |
| **Documentales** | 92 | Naturaleza, historia |
| Y más... | 256 | Otras categorías |

**Total: 11,669 canales** (sin contenido adulto)

---

## 🔄 Regenerar Playlist

Si agregas más canales a `canales.js`, regenera el M3U8:

```bash
python scripts/generar-m3u8-tv.py
```

El script automáticamente:
- ✅ Filtra canales adultos
- ✅ Organiza por categorías
- ✅ Valida URLs
- ✅ Agrega metadata EPG
- ✅ Genera estadísticas

---

## 📋 Formato M3U8 Extended

Cada canal en la playlist tiene este formato:

```m3u8
#EXTINF:-1 tvg-id="canalid" tvg-name="Nombre Canal" tvg-logo="http://logo.png" group-title="Categoría",Nombre Canal
http://url-del-stream.m3u8
```

**Atributos:**
- `tvg-id`: ID único para EPG
- `tvg-name`: Nombre del canal
- `tvg-logo`: Logo/icono del canal
- `group-title`: Categoría (Deportes, Películas, etc.)

---

## 🎮 Control de la App IPTV en TV

### Control Remoto Xiaomi TV / Fire TV:

```
↑ ↓ ← →    : Navegar menú y categorías
[OK]       : Seleccionar canal y reproducir
[Back]     : Volver / Salir de reproducción
[Home]     : Volver al inicio
[Play/Pause]: Control de reproducción
[Info]     : Ver detalles del canal
```

### Funciones Útiles:

**IPTV Smarters Pro:**
- Mantén presionado [OK] en un canal → Agregar a favoritos
- [Menu] → Settings → Control Parental (PIN)
- [Menu] → EPG → Cargar guía de programación

**TiviMate:**
- Mantén [OK] → Opciones del canal (favorito, ocultar, etc.)
- [Guide] → Ver programación EPG
- [Rec] → Grabar canal (requiere Premium)

---

## ⚠️ Solución de Problemas

### "La playlist no carga"

```
✅ Verifica que el servidor esté corriendo
✅ Verifica que la URL sea correcta
✅ Prueba la URL en el navegador de tu PC primero
✅ Asegúrate de estar en la misma red WiFi
```

### "Algunos canales no reproducen"

```
✅ Es normal, algunos canales pueden estar offline
✅ Prueba con otro canal de la misma categoría
✅ Verifica tu velocidad de internet (mínimo 5 Mbps)
✅ Algunos canales pueden requerir VPN
```

### "No veo las categorías"

```
✅ La app debe soportar group-title (todas las modernas lo hacen)
✅ En IPTV Smarters: Ve a "Live TV" → verás categorías
✅ En TiviMate: Las categorías aparecen automáticamente
✅ Prueba refrescar la playlist
```

### "Quiero agregar canales adultos"

```
⚠️ Por defecto están filtrados para uso familiar
💡 Opción 1: Usa canales.m3u (incluye todos los canales)
💡 Opción 2: Edita generar-m3u8-tv.py y quita el filtro de adultos
```

---

## 🚀 Ventajas vs Navegador Web

| Característica | Navegador | App IPTV | Ganador |
|---------------|-----------|----------|---------|
| Velocidad | ⭐⭐ | ⭐⭐⭐⭐⭐ | App |
| Interfaz | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | App |
| EPG | ❌ | ✅ | App |
| Favoritos | ⚠️ | ✅ | App |
| Grabación | ❌ | ✅ | App |
| Control Remoto | ⭐⭐ | ⭐⭐⭐⭐⭐ | App |
| Sin instalación | ✅ | ❌ | Navegador |

**Recomendación:** Usa app IPTV nativa para mejor experiencia.

---

## 📞 Soporte

¿Problemas con la configuración?

1. Verifica que el servidor esté corriendo
2. Prueba la URL en VLC primero (PC)
3. Usa `http://IP:PORT/data/canales-tv.m3u8`
4. Asegúrate de tener internet estable (5+ Mbps)

---

## 📝 Notas Importantes

- ⚠️ **La playlist NO incluye canales adultos** (filtrados automáticamente)
- ⚠️ **Algunos canales pueden estar offline** (depende de la fuente)
- ⚠️ **No alojamos contenido** (solo URLs públicas)
- ✅ **Uso personal y educativo** únicamente

---

**¡Disfruta tus 11,669 canales organizados profesionalmente!** 📺✨
