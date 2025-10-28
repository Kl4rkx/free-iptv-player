# 📚 Free IPTV Player - Documentation

Complete documentation for the Free IPTV Player project. Available in English and Spanish.

## 📖 Documentation Index

### 🇬🇧 English Documentation

| Document | Description |
|----------|-------------|
| [Complete Guide](./COMPLETE-GUIDE.md) | Full feature documentation and technical details |
| [IPTV App Configuration](./IPTV-APP-CONFIGURATION.md) | Setup guide for Smart TV IPTV apps |
| [Load M3U Playlists](./LOAD-M3U-LISTS.md) | How to import M3U/M3U8 playlists |
| [Changelog](./CHANGELOG.md) | Version history and updates |
| [Code of Conduct](./CODE_OF_CONDUCT.md) | Community guidelines |
| [Contributors](./CONTRIBUTORS.md) | Project contributors |

### 🇪🇸 Documentación en Español

| Documento | Descripción |
|-----------|-------------|
| [Guía Completa](./GUIA_COMPLETA.md) | Documentación completa de características y detalles técnicos |
| [Configuración IPTV](./CONFIGURACION-IPTV.md) | Guía de configuración para apps IPTV en Smart TV |
| [Cargar Listas M3U](./CARGAR-LISTAS-M3U.md) | Cómo importar listas de reproducción M3U/M3U8 |

---

## 🚀 Quick Links

- [Main README](../README.md) - Project overview (English)
- [README Español](../README.es.md) - Descripción del proyecto (Español)
- [Legal Information](../data/README-LEGAL.md) - Legal compliance and guidelines
- [Live Demo](https://kl4rkx.github.io/free-iptv-player) - Try it online

## � Getting Started

### New Users
1. Start with the [Complete Guide](./COMPLETE-GUIDE.md) (English) or [Guía Completa](./GUIA_COMPLETA.md) (Spanish)
2. Learn how to [Load M3U Playlists](./LOAD-M3U-LISTS.md)
3. Read the [Legal Information](../data/README-LEGAL.md)

### Smart TV Users
- Follow the [IPTV App Configuration](./IPTV-APP-CONFIGURATION.md) guide
- Or [Configuración IPTV](./CONFIGURACION-IPTV.md) en español

### Developers
- Check the [Complete Guide - Technical Details](./COMPLETE-GUIDE.md#-technical-details)
- Review [Code of Conduct](./CODE_OF_CONDUCT.md)
- See [Changelog](./CHANGELOG.md) for recent updates

---

## 🌟 Feature Highlights

- 🎥 **HLS/M3U8 Player** - Modern streaming technology
- 🌍 **Multiple Sources** - Load from URL, local files, or repository
- 📱 **Fully Responsive** - Works on all devices
- 🔍 **Instant Search** - Real-time filtering
- 🔒 **Parental Controls** - PIN-protected categories
- ⚡ **PWA Ready** - Install as an app
- 🌐 **Bilingual** - English and Spanish

---

## 🆘 Need Help?

- 📖 Check the documentation above
- 🐛 [Report a bug](https://github.com/Kl4rkx/free-iptv-player/issues)
- 💡 [Request a feature](https://github.com/Kl4rkx/free-iptv-player/issues)
- 🤝 [Contribute](../CONTRIBUTING.md)

---

**Made with ❤️ for the open source community**

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
