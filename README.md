# 🎬 Free IPTV Player

> Modern HLS/M3U8 streaming player - 100% legal demo with educational purpose

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/Kl4rkx/free-iptv-player?style=for-the-badge)](https://github.com/Kl4rkx/free-iptv-player/stargazers)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-blue.svg?style=for-the-badge)](https://kl4rkx.github.io/free-iptv-player)
[![Legal](https://img.shields.io/badge/100%25-LEGAL-brightgreen.svg?style=for-the-badge)](./data/README-LEGAL.md)

**Read this in other languages:** [🇪🇸 Español](./README.es.md)

[🌐 **Live Demo**](https://kl4rkx.github.io/free-iptv-player) • [📖 **Documentation**](./docs/) • [⚖️ **Legal Info**](./data/README-LEGAL.md) • [🐛 **Report Bug**](https://github.com/Kl4rkx/free-iptv-player/issues)

</div>

## ⚠️ Legal Disclaimer

**This project is for educational and demonstration purposes only.**

- ✅ Demo includes **only legal, public domain content**
- ✅ No pirated streams or copyrighted material
- ✅ Compliant with Spanish and EU laws
- ❌ We do **NOT** promote or support piracy
- ❌ Users are responsible for their content sources

[📖 Read Full Legal Disclaimer](./data/README-LEGAL.md)

## ✨ Features

- 🎥 **HLS/M3U8 Player** - Modern streaming technology
- 🌍 **Multiple Sources** - Load from URL, local files, or repository
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🔍 **Instant Search** - Real-time channel filtering
- 🎨 **Modern UI** - Dark theme with glassmorphism effects
- 🌐 **Bilingual** - English and Spanish support
- 🔒 **Parental Controls** - PIN-protected categories
- ⚡ **PWA Ready** - Install on any device, offline support
- 🚫 **No Ads** - Clean, fast experience
- 🧪 **Demo Channels** - Legal test streams included

## 🎬 Demo Content

The live demo includes **100% legal channels**:
- 🐰 Blender Open Movies (Creative Commons)
- 🚀 NASA TV (Public Domain)
- 🧪 HLS Test Streams (Public)
- 📊 Technical Test Patterns

All demo content is legally available and properly licensed.

## 🚀 Quick Start

## 🛰️ Xtream Codes Backend Proxy

Para cargar listas Xtream Codes, necesitas un backend proxy que evite el bloqueo CORS.

### 🌐 Opción 1: Desplegar en Vercel (Producción - Recomendado)

1. **Desplegar el proyecto en Vercel**:
```bash
cd free-iptv-player
vercel --prod
```
   O importa el repositorio directamente desde [vercel.com](https://vercel.com)

2. **Configurar GitHub Secret** 🔐:
   - Ve a tu repositorio en GitHub
   - **Settings** → **Secrets and variables** → **Actions**
   - **New repository secret**:
     - Name: `VERCEL_PROXY_URL`
     - Value: `https://tu-proyecto.vercel.app/api/xtream`
   - Click **Add secret**

3. **Hacer push** - GitHub Actions desplegará automáticamente con la configuración

📖 **Guía detallada:** [docs/GITHUB-SECRETS.md](./docs/GITHUB-SECRETS.md)

---

### 💻 Opción 2: Proxy Local (Desarrollo)

Para desarrollo local:

#### 1. Instalar dependencias

```bash
cd free-iptv-player
npm install express node-fetch@2 cors
```

#### 2. Ejecutar el backend

```bash
node xtream-proxy.js
```
Por defecto se inicia en el puerto 4000.

#### 3. Usar en la app web

En la pestaña **Xtream Codes** de la aplicación:
1. **Servidor:** Introduce la URL de tu servidor Xtream (ej: `http://tu-servidor.com:8080`)
2. **Usuario:** Tu usuario Xtream
3. **Contraseña:** Tu contraseña Xtream

El proxy se conectará automáticamente al servidor Xtream por ti, evitando problemas de CORS.

---

### 📝 Cómo funciona

- **Desarrollo (localhost):** Usa el proxy local en puerto 4000
- **Producción (GitHub Pages):** Usa el proxy desplegado en Vercel
- El backend recibe las credenciales Xtream por POST
- Descarga la lista M3U o los canales en JSON y los devuelve a la app web
- Así evitas el bloqueo CORS desde cualquier navegador

### 🔒 Seguridad

No se almacenan credenciales ni datos privados. Cada usuario ejecuta su propio proxy.

---

### ⚡ Instant Start (Easiest)

**Windows:**
```cmd
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

That's it! The app will open automatically in your browser at `http://localhost:8080`

### 🌐 Online (No Installation)

Visit: **[kl4rkx.github.io/free-iptv-player](https://kl4rkx.github.io/free-iptv-player)**

> **⚠️ Important Note:** The online demo has limitations due to browser security (CORS) and GitHub Pages restrictions. Many external channels may not work properly. **For full functionality and to load your own playlists, we strongly recommend running locally.**

### 🛠️ Manual Setup (Alternative)

**Using Python:**
```bash
git clone https://github.com/Kl4rkx/free-iptv-player.git
cd free-iptv-player
python -m http.server 8080
```

**Using Node.js:**
```bash
npx http-server -p 8080
```

Open http://localhost:8080 in your browser

## 📚 Documentation

### 📖 English Documentation

- **[Complete Guide](./docs/COMPLETE-GUIDE.md)** - Full feature documentation and technical details
- **[IPTV App Configuration](./docs/IPTV-APP-CONFIGURATION.md)** - Setup for Smart TV apps
- **[Load M3U Playlists](./docs/LOAD-M3U-LISTS.md)** - How to import M3U/M3U8 lists
- **[Legal Information](./data/README-LEGAL.md)** - Legal compliance and guidelines
- **[Changelog](./docs/CHANGELOG.md)** - Version history and updates
- **[Code of Conduct](./docs/CODE_OF_CONDUCT.md)** - Community guidelines
- **[Contributors](./docs/CONTRIBUTORS.md)** - Hall of fame

### 📖 Documentación en Español

- **[Guía Completa](./docs/GUIA_COMPLETA.md)** - Documentación completa de características
- **[Configuración IPTV](./docs/CONFIGURACION-IPTV.md)** - Configuración para apps de TV
- **[Cargar Listas M3U](./docs/CARGAR-LISTAS-M3U.md)** - Cómo añadir listas M3U/M3U8

## 🤝 Contributing

Contributions are welcome! See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for guidelines.

Code of Conduct: **[docs/CODE_OF_CONDUCT.md](./docs/CODE_OF_CONDUCT.md)**

## �‍💻 Author

Created and maintained by **[Kl4rkx](https://github.com/Kl4rkx)**

- GitHub: [@Kl4rkx](https://github.com/Kl4rkx)
- Repository: [free-iptv-player](https://github.com/Kl4rkx/free-iptv-player)

## �📄 License

MIT License - see **[LICENSE](./LICENSE)** file for details.

## 🛡️ Security

See **[SECURITY.md](./SECURITY.md)** for our security policy.

---

<div align="center">

**Made with ❤️ by [Kl4rkx](https://github.com/Kl4rkx)**

[⬆ Back to top](#-free-iptv-player)

</div>