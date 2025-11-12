# 🚀 Deployment Guide - Free IPTV Player

## GitHub Pages + Vercel Deployment

Esta guía te muestra cómo desplegar la aplicación completa con soporte para Xtream Codes.

### 📋 Requisitos Previos

- Cuenta de GitHub
- Cuenta de Vercel (gratis en [vercel.com](https://vercel.com))
- Git instalado localmente

---

## 🌐 Paso 1: Desplegar el Proxy en Vercel

### Opción A: Desde la Web (Más Fácil)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click en **"Add New Project"**
3. Importa tu repositorio `free-iptv-player`
4. Vercel detectará automáticamente la configuración
5. Click en **"Deploy"**
6. Espera a que termine el despliegue
7. Anota tu URL de Vercel (ej: `https://free-iptv-player.vercel.app`)

### Opción B: Desde la Terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Navegar al proyecto
cd free-iptv-player

# Desplegar
vercel

# Para producción
vercel --prod
```

---

## ⚙️ Paso 2: Configurar la URL del Proxy

**Opción Recomendada: Usar GitHub Secrets** 🔐

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Configura:
   - **Name:** `VERCEL_PROXY_URL`
   - **Value:** `https://TU-PROYECTO.vercel.app/api/xtream`
5. Click en **Add secret**

**GitHub Actions inyectará automáticamente esta URL en cada despliegue.**

📖 **Guía detallada:** [docs/GITHUB-SECRETS.md](./GITHUB-SECRETS.md)

---

**Opción Alternativa: Editar directamente (no recomendado)**

Si prefieres hardcodear la URL:

1. Abre `src/js/config.js`
2. Actualiza:
   ```javascript
   VERCEL_PROXY_URL: 'https://TU-PROYECTO.vercel.app/api/xtream',
   ```

---

## 📤 Paso 3: Actualizar GitHub Pages

```bash
# Hacer commit de los cambios
git add .
git commit -m "Configure Vercel proxy URL"

# Subir a GitHub
git push origin main
```

GitHub Actions desplegará automáticamente los cambios a GitHub Pages.

---

## ✅ Paso 4: Verificar el Despliegue

1. Ve a tu sitio en GitHub Pages: `https://tu-usuario.github.io/free-iptv-player`
2. Click en **"Cargar Playlist"** → **"Xtream Codes"**
3. Introduce las credenciales de prueba
4. Si todo está bien configurado, los canales deberían cargar correctamente

---

## 🔧 Desarrollo Local

Para desarrollo local, el proxy usa automáticamente `localhost:4000`:

```bash
# Terminal 1: Proxy local
node xtream-proxy.js

# Terminal 2: Servidor web
python -m http.server 8000
```

---

## 🐛 Troubleshooting

### Error: "No se pudo conectar al servidor proxy"

**Causa:** La URL del proxy en `config.js` no es correcta.

**Solución:**
1. Verifica que tu despliegue en Vercel esté activo
2. Actualiza `VERCEL_PROXY_URL` en `src/js/config.js`
3. Haz commit y push

### Error: "fetch is not defined" en Vercel

**Causa:** Versión incorrecta de node-fetch.

**Solución:**
- El archivo `api/xtream.js` usa la API nativa `fetch` de Node.js 18+
- Vercel usa Node.js 18+ por defecto, no debería haber problemas
- Si persiste, agrega `package.json` con `"type": "module"`

### Los canales no se cargan en producción

**Solución:**
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores relacionados con CORS o fetch
4. Verifica que la URL del proxy sea correcta
5. Comprueba que el despliegue en Vercel esté activo

---

## 🔄 Actualizar el Despliegue

Cada vez que hagas push a GitHub, ambos servicios se actualizan automáticamente:

- **GitHub Pages:** A través de GitHub Actions
- **Vercel:** Mediante su integración con GitHub

---

## 📊 Arquitectura

```
┌─────────────────┐
│  GitHub Pages   │  ← Frontend estático (HTML, CSS, JS)
│  (free-iptv)    │
└────────┬────────┘
         │
         │ fetch()
         │
         ▼
┌─────────────────┐
│     Vercel      │  ← Serverless Function (proxy)
│  /api/xtream    │
└────────┬────────┘
         │
         │ fetch()
         │
         ▼
┌─────────────────┐
│ Xtream Server   │  ← Servidor IPTV externo
│   (Usuario)     │
└─────────────────┘
```

---

## 💰 Costos

- **GitHub Pages:** Gratis (uso ilimitado para proyectos públicos)
- **Vercel Free Plan:**
  - 100 GB bandwidth/mes
  - 100 deployments/día
  - Serverless functions ilimitadas
  - Suficiente para proyectos personales

---

## 🔐 Seguridad

- Las credenciales Xtream **nunca se almacenan**
- Se envían directamente al proxy en cada petición
- El proxy las usa solo para conectarse al servidor Xtream
- HTTPS en ambos extremos (GitHub Pages + Vercel)

---

## 📝 Notas

- El proxy en Vercel puede tardar ~500ms en iniciar (cold start)
- Después de la primera petición, las respuestas son rápidas
- GitHub Pages puede tardar 1-2 minutos en actualizar después de un push

---

**¿Necesitas ayuda?** Abre un issue en GitHub o consulta la documentación completa.
