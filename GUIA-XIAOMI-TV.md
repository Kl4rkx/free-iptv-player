# 📺 Guía Rápida para Xiaomi TV

## 🚀 Inicio Rápido (2 pasos)

### 1️⃣ Iniciar Servidor
En tu PC:
```bash
python scripts/server-tv.py
```

### 2️⃣ Acceder desde TV
En el navegador de tu Xiaomi TV, abre:
```
http://192.168.1.200:8080
```
*(Usa la IP que aparece en la terminal)*

---

## 🎯 Versión Optimizada para TV

Creamos una versión especial para navegadores básicos de TV:

**URL Optimizada:**
```
http://192.168.1.200:8080/index-tv.html
```

**Diferencias vs versión normal:**
- ✅ Botones más grandes (fácil con control remoto)
- ✅ Menos animaciones (mejor rendimiento)
- ✅ JavaScript más simple (compatible con navegadores básicos)
- ✅ Texto más grande (legible desde lejos)
- ✅ Menos efectos (carga más rápida)

---

## 🎮 Navegación con Control Remoto

```
↑ ↓ ← →  : Navegar entre elementos
[OK]     : Seleccionar/Reproducir canal
[Back]   : Cerrar reproductor
```

**Trucos:**
- Los botones y canales tienen **focus** visual (borde azul)
- Puedes usar el **OK** para expandir/colapsar categorías
- El buscador es **grande** para facilitar escritura

---

## 🔧 Optimizaciones Incluidas

### En el Servidor Python (`server-tv.py`):
✓ **Compresión gzip** - Archivos grandes se comprimen automáticamente  
✓ **Cache inteligente** - Assets estáticos con cache, streams sin cache  
✓ **CORS habilitado** - Permite reproducción HLS.js  
✓ **Buffer 64KB** - Streaming más fluido  
✓ **MIME types** - Correctos para M3U8/HLS  

### En la Web (`index-tv.html`):
✓ **Botones grandes** - 15px padding, 20px font  
✓ **Tarjetas grandes** - 280px mínimo, hover destacado  
✓ **Modal fullscreen** - 95% ancho, video 16:9  
✓ **Sin animaciones complejas** - Solo transiciones básicas  
✓ **JavaScript simple** - Compatible ES5+  

---

## 📱 Alternativa: App IPTV (MEJOR)

Si el navegador va lento, usa una **app IPTV nativa**:

### IPTV Smarters Pro (Recomendado):
1. Descarga desde Google Play Store
2. "Load Your Playlist" → "M3U URL"
3. Ingresa: `http://192.168.1.200:8080/data/canales.m3u`
4. ¡Disfruta con mejor rendimiento!

**Ventajas:**
- 🚀 10x más rápido que navegador
- 📺 Interfaz diseñada para TV
- 🎮 Control remoto optimizado
- 📖 EPG (guía de programación)
- ⭐ Favoritos y grabación

---

## ⚡ Comparación de Rendimiento

| Método | Velocidad | Facilidad | Calidad | Recomendado |
|--------|-----------|-----------|---------|-------------|
| **index-tv.html** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Para probar |
| **index.html** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🟡 Móvil/PC |
| **IPTV Smarters** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Uso diario |

---

## 🐛 Solución de Problemas

### "No puedo acceder a la IP"
```
✅ Verifica que estés en la misma WiFi
✅ Verifica que el servidor Python esté corriendo
✅ Intenta con http://192.168.1.200:8080/index-tv.html
✅ Desactiva firewall temporalmente
```

### "La web va lenta"
```
✅ Usa index-tv.html en vez de index.html
✅ Cierra otras apps en tu TV
✅ Mejor: Instala IPTV Smarters Pro
```

### "Los canales no reproducen"
```
✅ Algunos canales pueden estar offline (normal)
✅ Prueba con otro canal
✅ Verifica tu velocidad de internet (mínimo 5 Mbps)
```

---

## 📊 Estadísticas

- **11,815 canales** disponibles
- **19 categorías** organizadas
- **Optimizado** para navegadores básicos
- **Compatible** con Android TV 5.0+

---

**¡Disfruta tus canales en pantalla grande!** 🎉
