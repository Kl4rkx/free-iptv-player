# 🔐 GitHub Secrets Configuration Guide

## Configurar Variables de Entorno con GitHub Secrets

Esta guía te muestra cómo configurar la URL del proxy Vercel usando GitHub Secrets para una configuración segura y dinámica.

---

## 📋 Paso a Paso

### 1️⃣ Desplegar en Vercel

Primero, despliega tu proyecto en Vercel:

```bash
# Opción A: Desde la terminal
npm install -g vercel
vercel --prod

# Opción B: Desde vercel.com
# Importa el repositorio desde GitHub
```

**Anota tu URL de Vercel**, por ejemplo:
```
https://free-iptv-player.vercel.app
```

---

### 2️⃣ Configurar GitHub Secret

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Configura el secret:

   ```
   Name: VERCEL_PROXY_URL
   Value: https://tu-proyecto.vercel.app/api/xtream
   ```

6. Click en **Add secret**

---

### 3️⃣ Verificar la Configuración

El workflow de GitHub Actions automáticamente:
- Inyectará la URL del secret en cada despliegue
- Creará el archivo `public/config.js` con la configuración
- Desplegará a GitHub Pages

---

## 🔄 Cómo Funciona

### En Desarrollo (Local):
```javascript
// src/js/config.js usa localhost
LOCAL_PROXY_URL: 'http://localhost:4000/api/xtream'
```

### En Producción (GitHub Pages):
```javascript
// GitHub Actions inyecta el secret en public/config.js
window.__VERCEL_PROXY_URL__ = 'https://tu-proyecto.vercel.app/api/xtream';

// src/js/config.js lo usa automáticamente
VERCEL_PROXY_URL: window.__VERCEL_PROXY_URL__ || 'fallback-url'
```

---

## 📁 Archivos Involucrados

### `.github/workflows/deploy.yml`
```yaml
- name: Inject Vercel Proxy URL
  run: |
    cat > public/config.js << EOF
    window.__VERCEL_PROXY_URL__ = '${{ secrets.VERCEL_PROXY_URL }}';
    EOF
```

### `src/js/config.js`
```javascript
export const CONFIG = {
    VERCEL_PROXY_URL: window.__VERCEL_PROXY_URL__ || 'fallback',
    // ...
};
```

### `index.html`
```html
<!-- Runtime Configuration (injected by GitHub Actions) -->
<script src="./public/config.js"></script>
```

---

## 🔄 Actualizar la URL del Proxy

Si cambias tu URL de Vercel:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **VERCEL_PROXY_URL**
3. Click en **Update secret**
4. Introduce la nueva URL
5. Haz cualquier commit/push para forzar un redespliegue:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

---

## ✅ Ventajas de este Método

| Ventaja | Descripción |
|---------|-------------|
| 🔒 **Seguro** | La URL no está hardcodeada en el código |
| 🔄 **Dinámico** | Cambias el secret sin modificar código |
| 🌍 **Multi-entorno** | Diferentes URLs para staging/producción |
| 👥 **Colaborativo** | Cada fork puede tener su propia configuración |
| 📦 **Sin conflictos** | No hay merge conflicts por URLs diferentes |

---

## 🧪 Probar Localmente

Para desarrollo local, no necesitas configurar nada:

```bash
# Terminal 1: Proxy
node xtream-proxy.js

# Terminal 2: Servidor web
python -m http.server 8000
```

La app detecta automáticamente que está en localhost y usa el proxy local.

---

## 🐛 Troubleshooting

### El secret no se aplica

**Causa:** GitHub Actions no ha ejecutado después de crear el secret.

**Solución:**
```bash
git commit --allow-empty -m "Apply new secret"
git push
```

### Error: "window.__VERCEL_PROXY_URL__ is undefined"

**Causa:** El archivo `public/config.js` no se generó correctamente.

**Solución:**
1. Verifica que el secret existe en GitHub
2. Revisa los logs de GitHub Actions
3. Asegúrate de que el workflow tiene permisos de escritura

### La app usa la URL de fallback

**Causa:** El secret está vacío o mal configurado.

**Solución:**
- Verifica que el secret se llama exactamente `VERCEL_PROXY_URL`
- Verifica que la URL incluye `/api/xtream` al final
- Ejemplo correcto: `https://mi-proyecto.vercel.app/api/xtream`

---

## 🔐 Secrets Adicionales (Opcional)

Puedes configurar otros secrets útiles:

### Para Rate Limiting:
```
Name: PROXY_RATE_LIMIT
Value: 100
```

### Para Analytics:
```
Name: ANALYTICS_ID
Value: G-XXXXXXXXXX
```

Y usarlos en el código:
```javascript
const rateLimit = window.__PROXY_RATE_LIMIT__ || 100;
```

---

## 📚 Recursos

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**¿Necesitas ayuda?** Abre un issue en GitHub con la etiqueta `configuration`.
