# 📺 M3U8 Streaming Platform

> Plataforma web de streaming optimizada con **11,815 canales** de televisión en vivo de todo el mundo

[![Canales](https://img.shields.io/badge/Canales-11,815-blue.svg)](data/canales.js)
[![Categorías](https://img.shields.io/badge/Categorías-19-green.svg)](#categorías)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](#características)
[![Mobile](https://img.shields.io/badge/Mobile-Optimized-orange.svg)](#responsive)

## ✨ Características Principales

- 🚀 **Ultra Rápida**: Lazy loading con categorías colapsables
- 📱 **100% Responsive**: Optimizada para iPhone/iPad/Android
- 📥 **Carga Dinámica de Listas**: Importa M3U/M3U8 desde URL, archivos locales o repositorio
- 📺 **Apps IPTV**: Playlist M3U8 profesional (11,669 canales sin adultos)
- 🔒 **Control Parental**: Protección discreta para contenido +18
- 🔍 **Búsqueda Instantánea**: Encuentra canales en <50ms
- 📂 **19 Categorías**: Deportes, películas, series, noticias y más
- ⚡ **Sin Publicidad**: Experiencia limpia y rápida
- 🌐 **PWA**: Instalable en cualquier dispositivo

## 🚀 Inicio Rápido

### Opción 1: Servidor Optimizado para TV (Python) ⭐
```bash
python scripts/server-tv.py
# Abre automáticamente en http://localhost:8080
# Versión TV: http://localhost:8080/index-tv.html
# Playlist M3U8: http://[TU-IP]:8080/data/canales-tv.m3u8
```

### Opción 2: Servidor PowerShell
```powershell
cd scripts
.\server.ps1
```

### Opción 3: Python Simple
```bash
python -m http.server 8080
```

### 📺 Para Apps IPTV en TV (Xiaomi, Fire TV)
1. **Genera la playlist M3U8:**
   ```bash
   python scripts/generar-m3u8-tv.py
   ```
2. **Inicia el servidor:** `python scripts/server-tv.py`
3. **En tu TV:** Instala IPTV Smarters Pro / TiviMate
4. **Configura con:** `http://[TU-IP]:8080/data/canales-tv.m3u8`
5. **¡Disfruta 11,669 canales!** (sin contenido adulto)

📖 **Guía completa:** [CONFIGURACION-IPTV.md](docs/CONFIGURACION-IPTV.md)

### 📱 Acceso desde Móvil
1. Asegúrate de estar en la **misma red WiFi**
2. Usa la IP que muestra el servidor (ej: `http://192.168.1.100:8080`)
3. En iPhone: Safari → Compartir → "Añadir a pantalla de inicio"

## 📁 Estructura del Proyecto

```
m3u8hosting/
├── index.html              # 🏠 Página principal
│
├── data/                        # 📊 Base de datos (privada)
│   ├── canales.js              # 11,815 canales organizados (local)
│   ├── canales.example.js      # Plantilla de ejemplo
│   ├── canales.m3u             # Archivo M3U8 fuente (local)
│   ├── mascanales.m3u          # M3U8 adicional (local)
│   └── README.md               # Instrucciones de configuración
│
├── src/                         # 💻 Código fuente
│   ├── css/                    # Estilos CSS
│   └── js/                     # Scripts JavaScript
│
├── public/                      # 🌐 Archivos públicos
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   └── robots.txt              # SEO
│
├── assets/                      # 🎨 Recursos estáticos
│   └── icons/
│       └── favicon.svg         # Ícono de la app
│
├── scripts/                     # 🔧 Scripts de utilidad
│   ├── convertir-m3u.ps1       # Conversor M3U → JS
│   ├── combinar-canales-adulto.ps1  # Combina y detecta contenido
│   └── server.ps1              # Servidor local para móvil
│
├── docs/                        # 📚 Documentación
│   ├── README.md               # Documentación principal
│   ├── GUIA_COMPLETA.md        # Guía detallada
│   └── CHANGELOG.md            # Historial de cambios
│
├── .htaccess                    # Configuración Apache
└── .gitignore                   # Archivos protegidos
```

## 🎯 Optimizaciones Implementadas

### ⚡ Rendimiento
- **Lazy Loading**: Carga solo categorías visibles (1s vs 8-15s antes)
- **Búsqueda optimizada**: Debounced search con 300ms timeout
- **Categorías colapsables**: Reduce DOM a ~100 elementos visibles
- **Loading screen**: Feedback visual durante carga inicial

### 📱 Mobile & iOS
- **Safe Areas**: Soporte para notch y Dynamic Island
- **Touch Targets**: 44x44px mínimo (estándar Apple HIG)
- **No Zoom**: Inputs diseñados sin zoom automático
- **Viewport**: Optimizado con `viewport-fit=cover`
- **Gestos iOS**: Soporte completo touch/swipe

### 🔒 Control Parental
- **PIN Discreto**: Código 1818 para desbloquear contenido +18
- **Atajos secretos**: Escribe "adulto" o "1818" desde cualquier lugar
- **Persistencia**: localStorage mantiene estado entre sesiones
- **231 canales protegidos**: Detección automática de contenido adulto

## 📋 Categorías (11,815 canales totales)

| Categoría | Descripción | Icono |
|-----------|-------------|-------|
| 🌍 Internacional | Canales de todo el mundo | 🌍 |
| ⚽ Deportes | Fútbol, baloncesto, etc | ⚽ |
| 🎬 Películas | Cine 24/7 | 🎬 |
| 📺 Series | Maratones y episodios | 📺 |
| 📰 Noticias | Información en vivo | 📰 |
| 🎵 Música | Videos y conciertos | � |
| 👶 Infantil | Contenido para niños | 👶 |
| 🌍 Documentales | Naturaleza, historia | � |
| 💕 Novelas | Telenovelas y dramas | 💕 |
| 🔒 Adulto | Protegido con PIN | � |
| Y más... | | |

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con Grid/Flexbox y animaciones
- **JavaScript (ES6+)** - Lazy loading, debounce, localStorage
- **HLS.js v1.5.8** - Reproducción M3U8/HLS
- **PWA** - Progressive Web App instalable
- **Service Worker** - Caché offline y assets
- **PowerShell** - Scripts de automatización

## 📖 Guía de Uso

### 👀 Ver Canales

1. **Explorar categorías**: Haz clic en cualquier categoría para expandir/colapsar
2. **Buscar**: Escribe el nombre del canal en el buscador (instantáneo)
3. **Reproducir**: Clic en cualquier canal abre el reproductor modal
4. **Controles**: Play/Pausa, volumen, pantalla completa

### 🔒 Activar Control Parental

**Métodos discretos:**
- Haz clic en el botón 🔒 (esquina superior derecha)
- Escribe "adulto" desde cualquier lugar
- Escribe "1818" desde cualquier lugar

**PIN:** `1818`

El estado persiste entre sesiones (localStorage).

### 📥 Cargar Listas M3U/M3U8 Dinámicamente

**Nueva funcionalidad**: Importa listas de canales sin editar archivos.

1. Haz clic en **"📥 Cargar Lista M3U"** en la barra de controles
2. Elige una fuente:
   - **🌐 Desde URL**: Pega la URL de cualquier lista M3U/M3U8 web
   - **📁 Archivo Local**: Sube un archivo desde tu computadora
   - **📂 Repositorio**: Selecciona listas del directorio `data/`
3. (Opcional) Asigna una categoría por defecto
4. Haz clic en "⬇️ Cargar"

Los canales se fusionan automáticamente con los existentes y eliminan duplicados.

📖 **Guía detallada:** [CARGAR-LISTAS-M3U.md](docs/CARGAR-LISTAS-M3U.md)

### ➕ Agregar Tus Canales

#### Método 1: Desde M3U8 (Recomendado)

```powershell
# Coloca tu archivo .m3u en data/
cd scripts
.\combinar-canales-adulto.ps1
# Combina automáticamente y detecta contenido adulto
```

#### Método 2: Editar manualmente

1. Abre `data/canales.js`
2. Añade tu canal al array:

```javascript
{ 
    name: "Mi Canal HD", 
    logo: "https://ejemplo.com/logo.png", 
    url: "https://ejemplo.com/stream.m3u8", 
    category: "deportes",
    isAdult: false  // true para contenido +18
}
```

3. Recarga la página

#### Categorías disponibles
`deportes`, `peliculas`, `series`, `documentales`, `infantil`, `noticias`, `internacional`, `musica`, `novelas`, `adulto`

## 🔧 Scripts PowerShell Disponibles

### 📦 `combinar-canales-adulto.ps1`
Combina múltiples fuentes M3U, detecta contenido adulto y elimina duplicados.

```powershell
cd scripts
.\combinar-canales-adulto.ps1
```

**Características:**
- ✅ Detección automática de contenido +18 (30+ patrones)
- ✅ Eliminación de duplicados por URL
- ✅ Estadísticas detalladas (total, nuevos, duplicados)
- ✅ Combina múltiples archivos M3U

### 🔄 `convertir-m3u.ps1`
Convierte un archivo M3U a formato JavaScript.

```powershell
cd scripts
.\convertir-m3u.ps1
```

**Características:**
- ✅ Categorización inteligente
- ✅ Backup automático
- ✅ Validación de URLs

### 🌐 `server.ps1`
Servidor HTTP local optimizado para acceso móvil.

```powershell
cd scripts
.\server.ps1
```

**Características:**
- ✅ Detecta IP local automáticamente
- ✅ Configuración CORS
- ✅ Tipos MIME correctos
- ✅ Acceso desde móvil en misma red

## 📱 Compatibilidad

| Plataforma | Versión | Soporte | Notas |
|-----------|---------|---------|-------|
| Chrome Desktop | 90+ | ✅ Completo | - |
| Firefox Desktop | 88+ | ✅ Completo | - |
| Safari Desktop | 14+ | ✅ Completo | - |
| iOS Safari | 14+ | ✅ Optimizado | Safe areas, touch 44px |
| Android Chrome | 90+ | ✅ Completo | - |
| iPad Safari | 14+ | ✅ Completo | Soporte landscape |
| Edge | 90+ | ✅ Completo | - |

## 🚀 Rendimiento

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Tiempo de carga inicial | 8-15s | ~1s | **94% más rápido** |
| Elementos DOM visibles | 11,815 | ~100 | **99% menos** |
| Búsqueda | Lag perceptible | <50ms | **Instantánea** |
| Uso de memoria | ~500MB | ~80MB | **84% menos** |

**Técnicas aplicadas:**
- Lazy loading con categorías colapsables
- Debounced search (300ms)
- DOM virtual con renderizado selectivo
- Caché de búsquedas

## 🔐 Privacidad y Seguridad

- ✅ **Sin tracking**: No recopilamos datos de usuario
- ✅ **Sin analytics**: Sin Google Analytics ni similares
- ✅ **localStorage local**: Todo se guarda en tu dispositivo
- ✅ **Sin cookies**: No usamos cookies de terceros
- ✅ **Archivos protegidos**: `canales.js` no se sube al repositorio (`.gitignore`)

## 🎯 Roadmap

- [x] ~~Lazy loading y optimización~~
- [x] ~~Control parental discreto~~
- [x] ~~Responsive iOS/mobile~~
- [x] ~~11,815+ canales~~
- [ ] Sistema de favoritos con localStorage
- [ ] Historial de reproducción
- [ ] EPG (Guía de programación)
- [ ] Modo Picture-in-Picture
- [ ] Chromecast support
- [ ] Multi-idioma (EN/ES)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/NuevaCaracteristica`
3. Commit tus cambios: `git commit -m 'Añade nueva característica'`
4. Push a la rama: `git push origin feature/NuevaCaracteristica`
5. Abre un Pull Request

## 📄 Documentación

- 📘 [Guía Completa](docs/GUIA_COMPLETA.md) - Manual detallado de uso
- 📝 [Changelog](docs/CHANGELOG.md) - Historial de versiones
- 🔧 [Configuración](data/README.md) - Cómo añadir tus canales

## ⚠️ Aviso Legal

Esta plataforma es **únicamente un reproductor** de streams públicos disponibles en internet. 

- ❌ **No alojamos contenido** en nuestros servidores
- ❌ **No distribuimos streams** protegidos por derechos de autor
- ✅ Solo reproducimos URLs M3U8 públicas
- ✅ Uso educativo y personal únicamente

**Responsabilidad:** El usuario es responsable del contenido que reproduce. Los administradores no se hacen responsables del uso indebido de la plataforma.

## 📞 Soporte

¿Problemas o preguntas? 

- � **Issues**: [GitHub Issues](https://github.com/Kl4rkx/m3u8hosting/issues)
- � **Discussions**: [GitHub Discussions](https://github.com/Kl4rkx/m3u8hosting/discussions)
- 📧 **Email**: Abre un issue, respondemos en 24-48h

## � Estadísticas del Proyecto

- **11,815 canales** de todo el mundo
- **19 categorías** organizadas
- **231 canales** con control parental
- **3 scripts** PowerShell de automatización
- **~1 segundo** de carga inicial
- **100% gratuito** y sin publicidad

## 📜 Licencia

Licencia MIT © 2024 Kl4rkx

Se permite el uso, copia, modificación y distribución con atribución.

---

<div align="center">

**⭐ Si te gusta el proyecto, deja una estrella en GitHub ⭐**

Hecho con ❤️ para la comunidad de streaming

</div>

## 👤 Autor

**Kl4rkx**

- GitHub: [@Kl4rkx](https://github.com/Kl4rkx)

## 🌟 Agradecimientos

- HLS.js por el excelente reproductor
- Comunidad de streaming open source

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

Última actualización: Octubre 2025 | Versión 2.0.0
