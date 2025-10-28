# 📺 M3U8 Hosting Platform - Guía Completa

## 🎯 Resumen del Proyecto

Plataforma de streaming web con **2,708 canales** de televisión en vivo de todo el mundo. Reproduce streams M3U8/HLS directamente en el navegador usando HLS.js.

## 📊 Estadísticas

- **Total de Canales**: 2,708
- **Categorías**: 19 diferentes
- **Países Representados**: 30+ (Perú, Colombia, España, Rusia, USA, etc.)
- **Formatos Soportados**: M3U8, HLS
- **Compatibilidad**: Chrome, Firefox, Edge, Safari, móviles

## 🗂️ Estructura del Proyecto

```
m3u8hosting/
├── index.html          # Aplicación principal (564 líneas)
├── canales.js          # Base de datos de canales (2,708 canales, 0.48MB)
├── canales.m3u         # Archivo M3U8 fuente original
├── manifest.json       # Configuración PWA
├── sw.js               # Service Worker para PWA
├── robots.txt          # SEO configuration
├── README.md           # Documentación del proyecto
├── CHANGELOG.md        # Historial de cambios
└── posters/
    └── canales/        # Logos de canales
```

## 📋 Categorías Disponibles

| Categoría | Emoji | Descripción |
|-----------|-------|-------------|
| Deportes | ⚽ | ESPN, Fox Sports, BeIN, Win Sports, etc. |
| Películas | 🎬 | HBO, Golden, Cinemax, Star, Sony, Warner |
| Series & Shows | 📺 | AXN, A&E, AMC, Universal TV |
| Documentales | 🌍 | Discovery, Nat Geo, Animal Planet, History |
| Infantil | 👶 | Disney, Nickelodeon, Cartoon Network |
| Noticias | 📰 | CNN, BBC, DW, France24, Al Jazeera |
| Perú | 🇵🇪 | ATV, Latina, América, Willax, RPP |
| Colombia | 🇨🇴 | Caracol, RCN, City TV, Telepacifico |
| España | 🇪🇸 | TVE, LA 2, Antena 3 |
| Internacional | 🌍 | Canales de 30+ países |
| Música | 🎵 | MTV, HTV, Telehit, 100hitz |
| Novelas | 💕 | Tlnovelas, Pasiones, KANAL D |
| Religioso | ✝️ | EWTN, Enlace, Bethel, 3ABN |
| Gourmet | 🍽️ | Canales de cocina |
| 24/7 | 📡 | Simpsons, Chavo, Dragon Ball |
| Premium | ⭐ | Canales HBO premium |
| Entretenimiento | 🎭 | Variedad y entretenimiento |

## 🚀 Cómo Usar

### 🌐 Versión Online

Visita: **[kl4rkx.github.io/free-iptv-player](https://kl4rkx.github.io/free-iptv-player)**

> **⚠️ Limitación Importante:** La demo online tiene limitaciones significativas debido a:
> - **Restricciones CORS** - Muchos streams externos serán bloqueados por seguridad del navegador
> - **Restricciones de GitHub Pages** - Limitado solo a streams HTTPS
> - **Bloqueo de contenido mixto** - Los streams HTTP no funcionarán
> 
> **Recomendación:** Para funcionalidad completa y cargar tus propias listas, ejecuta localmente usando uno de los métodos siguientes.

### 💻 Ejecución Local

### Opción 1: Servidor Local Python
```bash
cd c:\Users\Klark\Documents\Proyectos\m3u8hosting
python -m http.server 8000
# Abrir: http://localhost:8000
```

### Opción 2: Node.js (npx serve)
```bash
cd c:\Users\Klark\Documents\Proyectos\m3u8hosting
npx serve
# Abrir: http://localhost:3000
```

### Opción 3: VS Code Live Server
1. Instalar extensión "Live Server"
2. Clic derecho en `index.html`
3. Seleccionar "Open with Live Server"

## 🎮 Características

### ✅ Funcionalidades Actuales

- **Reproducción M3U8**: Streaming HLS directo en navegador
- **Búsqueda en Tiempo Real**: Filtro instantáneo por nombre
- **Organización por Categorías**: 19 categorías con contadores
- **Diseño Responsivo**: Funciona en desktop, tablet y móvil
- **Modo Teatro**: Reproductor en modal pantalla completa
- **Indicadores de Carga**: Estado de conexión y buffering
- **Manejo de Errores**: Reconexión automática y recovery
- **PWA Ready**: Instalable como aplicación
- **Service Worker**: Caché offline
- **SEO Optimizado**: Meta tags y robots.txt

### 🎨 Interfaz

- **Tema Oscuro**: Diseño moderno con gradientes
- **Cards Interactivas**: Hover effects y animaciones
- **Logos de Canales**: Placeholder + logos reales
- **Contadores**: Número de canales por categoría
- **Badges**: Indicadores visuales
- **Grid Responsivo**: Adaptable a cualquier pantalla

### 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y gradientes
- **JavaScript (ES6+)**: Lógica moderna
- **HLS.js**: Reproducción M3U8
- **PWA**: Progressive Web App
- **Service Worker**: Caché y offline

## 📝 Cómo Agregar Canales

### Método 1: Editar canales.js Directamente

```javascript
const CANALES_STREAMING = [
    // ... canales existentes ...
    { 
        name: "Nuevo Canal HD", 
        logo: "https://url-del-logo.png", 
        url: "https://stream.url/playlist.m3u8", 
        category: "deportes" 
    },
];
```

### Método 2: Actualizar canales.m3u y Regenerar

1. Agregar canales al archivo `canales.m3u`:
```
#EXTINF:-1,Mi Canal Nuevo
http://stream-url.com/playlist.m3u8
```

2. Ejecutar script de conversión (PowerShell):
```powershell
# Script disponible en el historial de comandos
# Buscar: "Parsing M3U file to extract all channels"
```

## 🔍 Categorías Válidas

Usar una de estas categorías al agregar canales:

- `deportes`
- `peliculas`
- `series`
- `nacionales`
- `peru`
- `colombia`
- `espana`
- `internacional`
- `infantil`
- `documentales`
- `novelas`
- `musica`
- `religioso`
- `gourmet`
- `24/7`
- `noticias`
- `premium`
- `entretenimiento`

## 🐛 Solución de Problemas

### Canal no reproduce

1. **Verificar URL**: Probar URL en VLC media player
2. **CORS Issues**: Algunos streams bloquean reproducción en navegador
3. **Stream Offline**: El canal puede estar temporalmente fuera de línea
4. **Formato Incorrecto**: Debe ser M3U8/HLS válido

### Indicador de carga infinito

1. **Refrescar la página**
2. **Limpiar caché del navegador**
3. **Verificar consola del navegador** (F12)
4. **Probar con otro navegador**

### Búsqueda no funciona

- Verificar que `canales.js` esté cargado correctamente
- Abrir consola (F12) y buscar errores JavaScript

## 📱 Soporte de Navegadores

| Navegador | Versión Mínima | Soporte HLS |
|-----------|----------------|-------------|
| Chrome | 90+ | ✅ HLS.js |
| Firefox | 88+ | ✅ HLS.js |
| Safari | 13+ | ✅ Nativo |
| Edge | 90+ | ✅ HLS.js |
| iOS Safari | 13+ | ✅ Nativo |
| Android Chrome | 90+ | ✅ HLS.js |

## 🔐 Consideraciones Legales

- **Contenido de Terceros**: Los streams provienen de fuentes externas
- **Uso Personal**: Para uso educativo y personal únicamente
- **Derechos de Autor**: Respetar las leyes de copyright locales
- **Responsabilidad**: Los administradores no alojan ningún contenido

## 📞 Mantenimiento

### Actualización de Canales

- **Frecuencia recomendada**: Mensual
- **Verificación de URLs**: Usar herramientas como VLC o FFmpeg
- **Limpieza de canales offline**: Eliminar URLs no funcionales

### Backup

```bash
# Backup de configuración
xcopy /E /I canales.js canales.js.backup
xcopy /E /I canales.m3u canales.m3u.backup
```

## 🌟 Próximas Características

- [ ] Sistema de favoritos persistente
- [ ] Historial de reproducción
- [ ] Estadísticas de uso
- [ ] Sistema de calificación
- [ ] EPG (Guía de programación)
- [ ] Chat en vivo
- [ ] Modo PIP (Picture-in-Picture)
- [ ] Múltiples calidades de stream
- [ ] Subtítulos
- [ ] Compartir en redes sociales

## 🤝 Contribuciones

Para contribuir:
1. Agregar canales con URLs funcionales
2. Actualizar logos de canales
3. Reportar canales offline
4. Mejorar la UI/UX
5. Traducir a otros idiomas

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

## 👤 Autor

Desarrollado como plataforma de streaming M3U8/HLS.

---

**Última Actualización**: Diciembre 2024
**Versión**: 2.0.0
**Canales**: 2,708
