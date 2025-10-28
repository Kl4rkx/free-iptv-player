# 🎬 Canales de Streaming

Plataforma web para reproducir canales de streaming en vivo con soporte para M3U8/HLS.

## 🚀 Características

- ✅ Soporte completo para streams M3U8/HLS
- ✅ Compatible con todos los navegadores modernos (Edge, Chrome, Firefox, Safari)
- ✅ Diseño responsive para móviles, tablets y PC
- ✅ Buscador de canales en tiempo real
- ✅ Organización por categorías
- ✅ Reproductor integrado con HLS.js
- ✅ Service Worker para mejor rendimiento
- ✅ PWA (Progressive Web App)
- ✅ Favicon personalizado

## 📋 Requisitos

- Navegador web moderno
- Live Server (VS Code) o cualquier servidor HTTP local

## 🛠️ Instalación y Uso

### Con Live Server (Recomendado)

1. Abre el proyecto en VS Code
2. Instala la extensión "Live Server" si no la tienes
3. Clic derecho en `index.html` → "Open with Live Server"
4. La página se abrirá automáticamente en tu navegador

### Con Python (Alternativa)

```bash
# Python 3
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```

### Con Node.js (Alternativa)

```bash
npx http-server -p 8000

# Luego abre http://localhost:8000 en tu navegador
```

## 📁 Estructura del Proyecto

```
m3u8hosting/
├── index.html          # Página principal
├── listam3u8.m3u8     # Lista de canales M3U8
├── favicon.svg         # Icono del sitio
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── .htaccess          # Configuración Apache (opcional)
└── README.md          # Este archivo
```

## 🎯 Cómo Funciona

1. La página carga la lista de canales desde el array JavaScript
2. Los canales se organizan automáticamente por categorías
3. Al hacer clic en un canal, se abre un modal con el reproductor
4. HLS.js se encarga de reproducir el stream M3U8 en navegadores de escritorio
5. Los móviles usan reproducción nativa de HLS

## 🔧 Personalización

### Agregar/Editar Canales

Edita el array `channels` en `index.html`:

```javascript
const channels = [
    { 
        name: "Nombre del Canal", 
        logo: "/ruta/logo.png", 
        url: "http://url-del-stream.m3u8", 
        category: "categoria" 
    },
    // ... más canales
];
```

### Cambiar Categorías

Edita el objeto `categoryTitles`:

```javascript
const categoryTitles = {
    "categoria": "🎯 Nombre de Categoría",
    // ... más categorías
};
```

## 🌐 Navegadores Compatibles

- ✅ Microsoft Edge (Windows/Mac)
- ✅ Google Chrome (Windows/Mac/Linux)
- ✅ Mozilla Firefox (Windows/Mac/Linux)
- ✅ Safari (Mac/iOS)
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)

## ⚠️ Solución de Problemas

### El video no se reproduce en PC

- Asegúrate de tener la última versión del navegador
- Verifica que HLS.js se cargó correctamente (revisa la consola)
- Comprueba que la URL del stream es válida

### Error 404 de VLC

- Cierra VLC si está abierto
- Desactiva VLC como reproductor predeterminado en Windows
- Recarga la página en el navegador

### Los logos no se muestran

- Verifica que las rutas de las imágenes sean correctas
- Asegúrate de que la carpeta `/posters/canales/` existe

## 📱 Instalar como App (PWA)

1. Abre el sitio en Chrome o Edge
2. Haz clic en el icono de instalación en la barra de direcciones
3. La app se instalará en tu sistema como una aplicación nativa

## 🔒 Seguridad

- El archivo `.htaccess` incluye headers de seguridad
- CORS está configurado para streams externos
- No se almacenan datos sensibles

## 📝 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Mejorar el código

## 📧 Soporte

Si tienes problemas o preguntas, verifica:
1. La consola del navegador (F12) para errores
2. Que las URLs de los streams sean accesibles
3. Que el servidor local esté funcionando

---

**Nota**: Este proyecto es solo para uso educativo. Asegúrate de tener los derechos necesarios para transmitir el contenido.
