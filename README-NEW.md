# 📺 M3U8 Streaming Platform

> Plataforma web moderna y optimizada para streaming de canales en vivo con soporte completo para M3U8/HLS

[![GitHub Pages](https://img.shields.io/badge/demo-live-success.svg)](https://tu-usuario.github.io/m3u8hosting)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

## ✨ Características

- 🚀 **Ultra Rápida**: Lazy loading y renderizado optimizado
- 📱 **100% Responsive**: Diseño adaptativo para todos los dispositivos
- 📥 **Carga Dinámica**: Importa listas M3U/M3U8 desde URL, archivos o repositorio
- 🎬 **Reproductor Avanzado**: Soporte HLS.js con fallback nativo
- 🔒 **Control Parental**: Protección discreta para contenido sensible
- 🔍 **Búsqueda Instantánea**: Encuentra canales en milisegundos
- 📂 **Categorización**: Organización automática por categorías
- 🌐 **PWA**: Instalable como aplicación nativa
- ⚡ **Sin Backend**: Funciona completamente en el cliente
- 🎨 **UI Moderna**: Diseño glassmorphism con animaciones suaves

## 🚀 Demo

👉 **[Ver Demo en Vivo](https://tu-usuario.github.io/m3u8hosting)**

## 📋 Tabla de Contenidos

- [Inicio Rápido](#-inicio-rápido)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Arquitectura](#-arquitectura)
- [Configuración](#️-configuración)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🎯 Inicio Rápido

### Opción 1: GitHub Pages (Recomendado)

1. **Fork este repositorio**
2. **Activa GitHub Pages**:
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
3. **Accede a tu sitio**: `https://tu-usuario.github.io/m3u8hosting`

### Opción 2: Servidor Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/m3u8hosting.git
cd m3u8hosting

# Iniciar servidor local (Python)
python -m http.server 8080

# O con Node.js
npx http-server -p 8080

# Abrir en navegador
open http://localhost:8080
```

## 📦 Instalación

### Prerrequisitos

- Servidor web (Apache, Nginx, Python, Node.js, o GitHub Pages)
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Opcionalmente: Listas M3U/M3U8 para importar

### Configuración Inicial

1. **Clonar el repositorio**:
```bash
git clone https://github.com/tu-usuario/m3u8hosting.git
cd m3u8hosting
```

2. **Configurar tus canales** (opcional):
```bash
# Copiar ejemplo
cp data/canales.example.js data/canales.js

# Editar con tus canales
nano data/canales.js
```

3. **Configurar para producción**:
```bash
# Si usas GitHub Pages, todo está listo
# Si usas servidor propio, verifica las rutas en manifest.json
```

## 💻 Uso

### Navegación Básica

1. **Explorar Canales**: Haz clic en una categoría para expandir
2. **Buscar**: Escribe en el buscador para filtrar instantáneamente
3. **Reproducir**: Clic en cualquier canal para abrir el reproductor
4. **Controles**: Expandir/Colapsar todas las categorías

### Cargar Listas M3U/M3U8

#### Desde URL
```
1. Click en "📥 Cargar Lista M3U"
2. Pestaña "🌐 Desde URL"
3. Pegar URL: https://ejemplo.com/lista.m3u8
4. (Opcional) Categoría: deportes
5. Click "⬇️ Cargar"
```

#### Desde Archivo Local
```
1. Click en "📥 Cargar Lista M3U"
2. Pestaña "📁 Archivo Local"
3. Seleccionar archivo .m3u o .m3u8
4. Click "⬇️ Cargar"
```

#### Desde Repositorio
```
1. Click en "📥 Cargar Lista M3U"
2. Pestaña "📂 Repositorio"
3. Seleccionar lista disponible
4. Click "⬇️ Cargar"
```

### Control Parental

Protege contenido sensible con PIN:

- **Activar**: Click en 🔒 o escribe "adulto" / "1818"
- **PIN por defecto**: `1818` (cambiar en `src/js/app.js`)
- **Desactivar**: Click en 🔓

## 🏗️ Arquitectura

### Estructura del Proyecto

```
m3u8hosting/
├── index.html              # HTML principal (solo estructura)
├── index-tv.html          # Versión optimizada para TV
│
├── src/                   # Código fuente
│   ├── css/
│   │   ├── styles.css     # Estilos principales
│   │   └── modal.css      # Estilos de modales
│   └── js/
│       ├── app.js         # Aplicación principal
│       ├── player.js      # Reproductor de video
│       ├── playlist-loader.js  # Cargador de playlists
│       └── m3u-parser.js  # Parser M3U/M3U8
│
├── data/                  # Datos (privados, no en git)
│   ├── canales.js         # Canales principales
│   ├── canales.example.js # Plantilla de ejemplo
│   └── *.m3u / *.m3u8     # Listas M3U
│
├── public/                # Archivos públicos
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service Worker
│   └── robots.txt        # SEO
│
├── assets/                # Recursos estáticos
│   └── icons/
│       └── favicon.svg    # Ícono de la app
│
├── docs/                  # Documentación
│   ├── CARGAR-LISTAS-M3U.md
│   ├── CONFIGURACION-IPTV.md
│   └── CHANGELOG.md
│
├── scripts/               # Scripts de utilidad
│   ├── generar-m3u8-tv.py
│   ├── server-tv.py
│   └── convertir-m3u.ps1
│
├── .gitignore            # Archivos ignorados por Git
├── .nojekyll             # Deshabilitar Jekyll en GitHub Pages
├── _config.yml           # Configuración GitHub Pages
└── README.md             # Este archivo
```

### Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Video**: HLS.js para reproducción M3U8
- **Arquitectura**: Modular (ES6 Modules)
- **Diseño**: Glassmorphism, Flexbox, CSS Grid
- **PWA**: Service Worker, Manifest, Offline-ready
- **SEO**: Meta tags, Open Graph, Schema.org

### Flujo de Datos

```
┌──────────────┐
│   Usuario    │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌─────────────┐
│   index.html │─────▶│   app.js    │
└──────────────┘      └──────┬──────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  player.js   │    │playlist-     │    │ m3u-parser.js│
│              │    │loader.js     │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────────────────────────────────────────┐
│                    HLS.js / Native                    │
└──────────────────────────────────────────────────────┘
```

## ⚙️ Configuración

### Personalización

#### Cambiar PIN de Control Parental

```javascript
// src/js/app.js
this.PIN_CORRECTO = '1818'; // Cambiar aquí
```

#### Agregar Categorías

```javascript
// src/js/app.js
this.categoryTitles = {
    "nueva-categoria": "🎯 Nueva Categoría",
    // ...
};
```

#### Modificar Estilos

```css
/* src/css/styles.css */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Personaliza tu gradiente */
}
```

## 🌐 Despliegue

### GitHub Pages

1. **Configurar repositorio**:
```bash
git remote add origin https://github.com/tu-usuario/m3u8hosting.git
git branch -M main
git push -u origin main
```

2. **Activar GitHub Pages**:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Save

3. **Acceder**: `https://tu-usuario.github.io/m3u8hosting`

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Drag & drop en https://app.netlify.com/drop
# O conectar con GitHub
```

### Servidor Propio

```bash
# Apache: Copiar a /var/www/html/
# Nginx: Copiar a /usr/share/nginx/html/
# Asegúrate de configurar CORS si cargas listas externas
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- **JavaScript**: ES6+, modular, documentado con JSDoc
- **CSS**: BEM naming, mobile-first
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más información.

## ⚠️ Disclaimer

Este proyecto es solo para **uso educativo**. Asegúrate de:
- Tener los derechos necesarios para transmitir el contenido
- Respetar las leyes de copyright de tu país
- Usar solo contenido legal y autorizado

## 🙏 Agradecimientos

- [HLS.js](https://github.com/video-dev/hls.js/) - Librería HLS
- [Font Awesome](https://fontawesome.com/) - Iconos
- Comunidad de código abierto

## 📧 Contacto

- **Repositorio**: [github.com/tu-usuario/m3u8hosting](https://github.com/tu-usuario/m3u8hosting)
- **Issues**: [github.com/tu-usuario/m3u8hosting/issues](https://github.com/tu-usuario/m3u8hosting/issues)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

**Made with ❤️ for the streaming community**
