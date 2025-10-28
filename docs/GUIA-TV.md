# 📺 Guía para Android TV / Fire TV Stick

Cómo ver tus 11,815 canales en tu **Xiaomi TV con Android TV** o **Amazon Fire TV Stick**.

## 🎯 Método 1: Apps IPTV Nativas (RECOMENDADO)

### Apps Recomendadas

#### Para Android TV (Xiaomi TV)
- **IPTV Smarters Pro** ⭐ (Gratis, la mejor)
- **TiviMate** (Premium, muy potente)
- **Perfect Player** (Gratis)
- **GSE Smart IPTV** (Gratis)

#### Para Fire TV Stick
- **IPTV Smarters Pro** ⭐
- **Kodi** + PVR IPTV Simple Client
- **Perfect Player**

### Configuración Paso a Paso

#### 1️⃣ Instalar la App

**Xiaomi TV Android:**
```
1. Abre Google Play Store en tu TV
2. Busca "IPTV Smarters Pro"
3. Instala la app
4. Abre la app
```

**Fire TV Stick:**
```
1. Busca en el menú principal
2. Selecciona "Buscar" 
3. Escribe "IPTV Smarters Pro"
4. Descarga e instala
```

#### 2️⃣ Iniciar Servidor Local

En tu PC, ejecuta:
```powershell
cd c:\Users\Klark\Documents\Proyectos\m3u8hosting\scripts
.\server-tv.ps1
```

Verás algo como:
```
📱 ACCESO DESDE TV:
   └─ http://192.168.1.100:8080

🔗 CONFIGURAR M3U en app IPTV:
   └─ URL: http://192.168.1.100:8080/data/canales.m3u
```

#### 3️⃣ Configurar la App IPTV

**En IPTV Smarters Pro:**
```
1. Selecciona "Load Your Playlist or File/URL"
2. Selecciona "M3U URL / Xtream Codes API"
3. Ingresa:
   - Playlist Name: M3U8 Platform
   - File/URL: http://[TU-IP]:8080/data/canales.m3u
   - Username: (dejar vacío)
   - Password: (dejar vacío)
4. Toca "Add User"
5. ¡Disfruta tus 11,815 canales!
```

**En TiviMate:**
```
1. Settings > Playlists > Add playlist
2. Selecciona "URL"
3. Ingresa: http://[TU-IP]:8080/data/canales.m3u
4. Name: M3U8 Platform
5. Sync EPG: No
6. Save
```

**En Kodi:**
```
1. Add-ons > Install from repository
2. PVR clients > PVR IPTV Simple Client
3. Install y Configure
4. M3U Play List URL: http://[TU-IP]:8080/data/canales.m3u
5. Enable y reinicia Kodi
6. Ve a TV para ver los canales
```

## 🌐 Método 2: Navegador Web en TV

### Para Xiaomi TV Android

#### Instalar Navegador
```
1. Google Play Store en tu TV
2. Busca e instala uno de estos:
   - "Puffin TV Browser" ⭐ (el mejor para TV)
   - "TV Bro Browser"
   - "Google Chrome"
```

#### Usar el Navegador
```
1. Inicia servidor: .\server-tv.ps1
2. Abre el navegador en tu TV
3. Navega a: http://[TU-IP]:8080
4. Usa el control remoto para navegar
5. Haz clic en un canal para reproducir
```

### Para Fire TV Stick

#### Navegadores Compatibles
```
1. "Silk Browser" (pre-instalado)
2. "Firefox for Fire TV"
```

#### Navegación
```
1. Abre Silk Browser
2. Ve a: http://[TU-IP]:8080
3. Usa el control remoto de Fire TV
4. Reproduce canales directamente
```

### 💡 Consejos para Navegador en TV
- **Control remoto**: Usa las flechas direccionales para navegar
- **Búsqueda**: Usa el teclado virtual del TV
- **Pantalla completa**: Algunos navegadores tienen modo teatro
- **Favoritos**: Guarda la URL en favoritos para acceso rápido

## 📱 Método 3: Cast desde Móvil (Chromecast)

### Para Xiaomi TV (Chromecast integrado)

```
1. Asegúrate de estar en la misma WiFi
2. Abre Chrome en tu móvil
3. Ve a: http://[TU-IP]:8080
4. Toca los 3 puntos (⋮) > "Transmitir..."
5. Selecciona tu Xiaomi TV
6. Reproduce un canal
7. Se verá en tu TV
```

### Para Fire TV Stick (AirPlay/Miracast)

```
1. Habilita Display Mirroring en Fire TV:
   Settings > Display & Sounds > Enable Display Mirroring

2. En iPhone: Centro de Control > Duplicar Pantalla
3. En Android: Configuración > Conectar y compartir > Transmitir
4. Selecciona Fire TV Stick
5. Abre la web en tu móvil
```

## 🔧 Método 4: Servidor Permanente (Avanzado)

### Opción A: Subir M3U a la Nube

```
1. Sube canales.m3u a:
   - Google Drive (obtén enlace directo)
   - Dropbox (obtén enlace directo)
   - GitHub Pages

2. En la app IPTV, usa la URL pública
3. Ventaja: Funciona sin PC encendida
```

### Opción B: Raspberry Pi / NAS

```
1. Copia canales.m3u a tu Raspberry Pi o NAS
2. Configura servidor HTTP (nginx/apache)
3. Usa la IP del dispositivo en la app IPTV
4. Ventaja: Servidor 24/7
```

## 📋 Comparación de Métodos

| Método | Pros | Contras | Recomendado |
|--------|------|---------|-------------|
| **App IPTV Nativa** | ⭐⭐⭐⭐⭐ Mejor experiencia, EPG, grabación | Requiere app | ✅ SÍ |
| **Navegador Web** | ⭐⭐⭐ Fácil, sin instalación | Control remoto incómodo | 🟡 OK |
| **Chromecast** | ⭐⭐⭐⭐ Fácil desde móvil | Necesitas móvil siempre | 🟡 OK |
| **Servidor Cloud** | ⭐⭐⭐⭐⭐ Funciona 24/7 | Requiere subir archivo | ✅ SÍ |

## 🎮 Controles en TV

### Control Remoto Xiaomi TV
```
↑ ↓ ← → : Navegar
[OK]     : Seleccionar/Reproducir
[Back]   : Volver/Cerrar reproductor
[Home]   : Salir a inicio
```

### Control Remoto Fire TV
```
Circular Pad : Navegar
[Seleccionar]: Reproducir
[Back]       : Volver
[Home]       : Salir
[Play/Pause] : Control reproducción
```

## ⚠️ Solución de Problemas

### "No se puede conectar al servidor"
```
✅ Verifica que el servidor está corriendo (.\server-tv.ps1)
✅ Verifica que estás en la misma red WiFi
✅ Prueba la IP en el navegador de tu PC primero
✅ Desactiva firewall temporalmente para probar
```

### "Los canales no cargan"
```
✅ Algunos canales pueden estar offline (normal)
✅ Prueba con otro canal
✅ Verifica tu velocidad de internet (mínimo 5 Mbps)
✅ Reinicia la app IPTV
```

### "La web va lenta en el navegador"
```
✅ Usa una app IPTV nativa en su lugar (más optimizada)
✅ El navegador web es menos eficiente en TV
✅ IPTV Smarters Pro es 10x más rápido
```

### "Canales +18 visibles en TV"
```
⚠️ El control parental (PIN 1818) solo funciona en navegador web
⚠️ En apps IPTV nativas, los canales adultos estarán visibles
💡 Solución: Crea un archivo canales-limpio.m3u sin categoría "adulto"
```

## 🚀 Configuración Óptima

### Recomendación Final ⭐

```
1. Instala IPTV Smarters Pro en tu TV
2. Ejecuta server-tv.ps1 en tu PC
3. Configura la app con: http://[TU-IP]:8080/data/canales.m3u
4. ¡Disfruta tus 11,815 canales con la mejor experiencia!
```

### Para Uso Diario
```
Si vas a usar todos los días:
└─ Considera subir canales.m3u a Google Drive/Dropbox
   └─ Así no necesitas PC encendida
   └─ Funcionará desde cualquier lugar
```

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Verifica la IP con `ipconfig` en PowerShell
2. Prueba primero en el navegador de tu PC
3. Asegúrate de estar en la misma red WiFi
4. Prueba con diferentes apps IPTV

---

**¡Disfruta tus 11,815 canales en pantalla grande!** 📺✨
