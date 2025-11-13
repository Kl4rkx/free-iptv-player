# 🔐 GitHub Secrets Configuration Guide

## Configure Environment Variables with GitHub Secrets

This guide shows you how to configure the Vercel proxy URL using GitHub Secrets for secure and dynamic configuration.

---

## 📋 Step by Step

### 1️⃣ Deploy on Vercel

First, deploy your project on Vercel:

```bash
# Option A: From terminal
npm install -g vercel
vercel --prod

# Option B: From vercel.com
# Import repository from GitHub
```

**Note your Vercel URL**, for example:
```
https://free-iptv-player.vercel.app
```

---

### 2️⃣ Configure GitHub Secret

1. Go to your repository on GitHub
2. Click **Settings**
3. In sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Configure the secret:

   ```
   Name: VERCEL_PROXY_URL
   Value: https://your-project.vercel.app/api/xtream
   ```

6. Click **Add secret**

---

### 3️⃣ Verify Configuration

The secret is now configured. Next push will inject it automatically:

```bash
git commit --allow-empty -m "Apply Vercel proxy secret"
git push
```

**GitHub Actions will:**
1. Read the `VERCEL_PROXY_URL` secret
2. Inject it into `public/config.js`
3. Deploy to GitHub Pages with the configuration

---

## 🔄 How It Works

### In Development (Local):
```javascript
// src/js/config.js uses localhost
LOCAL_PROXY_URL: 'http://localhost:4000/api/xtream'
```

### In Production (GitHub Pages):
```javascript
// GitHub Actions injects the secret into public/config.js
window.__VERCEL_PROXY_URL__ = 'https://your-project.vercel.app/api/xtream';

// src/js/config.js uses it automatically
VERCEL_PROXY_URL: window.__VERCEL_PROXY_URL__ || 'fallback-url'
```

---

## 📁 Involved Files

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

## 🔄 Update Proxy URL

If you change your Vercel URL:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on **VERCEL_PROXY_URL**
3. Click **Update secret**
4. Enter new URL
5. Make any commit/push to force redeployment:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

---

## ✅ Advantages of This Method

| Advantage | Description |
|---------|-------------|
| 🔒 **Secure** | URL not hardcoded in code |
| 🔄 **Dynamic** | Change secret without modifying code |
| 🌍 **Multi-environment** | Different URLs for staging/production |
| 👥 **Collaborative** | Each fork can have its own configuration |
| 📦 **No conflicts** | No merge conflicts due to different URLs |

---

## 🧪 Test Locally

For local development, you don't need to configure anything:

```bash
# Terminal 1: Proxy
node xtream-proxy.js

# Terminal 2: Web server
python -m http.server 8000
```

The app automatically detects it's on localhost and uses the local proxy.

---

## 🐛 Troubleshooting

### Secret not applied

**Cause:** GitHub Actions hasn't run after creating the secret.

**Solution:**
```bash
git commit --allow-empty -m "Apply new secret"
git push
```

### Error: "window.__VERCEL_PROXY_URL__ is undefined"

**Cause:** `public/config.js` file wasn't generated correctly.

**Solution:**
1. Verify the secret exists in GitHub
2. Check GitHub Actions logs
3. Ensure workflow has write permissions

### App uses fallback URL

**Cause:** Secret is empty or misconfigured.

**Solution:**
- Verify secret is named exactly `VERCEL_PROXY_URL`
- Verify URL includes `/api/xtream` at the end
- Correct example: `https://my-project.vercel.app/api/xtream`

---

## 🔐 Additional Secrets (Optional)

You can configure other useful secrets:

### For Rate Limiting:
```
Name: PROXY_RATE_LIMIT
Value: 100
```

### For Analytics:
```
Name: ANALYTICS_ID
Value: G-XXXXXXXXXX
```

And use them in code:
```javascript
const rateLimit = window.__PROXY_RATE_LIMIT__ || 100;
```

---

## 📚 Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Contexts](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Need help?** Open an issue on GitHub with the `configuration` label.
