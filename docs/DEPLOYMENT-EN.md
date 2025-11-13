# 🚀 Deployment Guide - Free IPTV Player

## GitHub Pages + Vercel Deployment

This guide shows you how to deploy the complete application with Xtream Codes support.

### 📋 Prerequisites

- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))
- Git installed locally

---

## 🌐 Step 1: Deploy the Proxy on Vercel

### Option A: From the Web (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `free-iptv-player` repository
4. Vercel will automatically detect the configuration
5. Click **"Deploy"**
6. Wait for the deployment to complete
7. Note your Vercel URL (e.g., `https://free-iptv-player.vercel.app`)

### Option B: From Terminal

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd free-iptv-player

# Deploy
vercel

# For production
vercel --prod
```

---

## ⚙️ Step 2: Configure the Proxy URL

**Recommended Option: Use GitHub Secrets** 🔐

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Configure:
   - **Name:** `VERCEL_PROXY_URL`
   - **Value:** `https://YOUR-PROJECT.vercel.app/api/xtream`
5. Click **Add secret**

**GitHub Actions will automatically inject this URL in each deployment.**

📖 **Detailed guide:** [docs/GITHUB-SECRETS-EN.md](./GITHUB-SECRETS-EN.md)

---

## 📤 Step 3: Update GitHub Pages

```bash
# Commit changes
git add .
git commit -m "Configure Vercel proxy URL"

# Push to GitHub
git push origin main
```

GitHub Actions will automatically deploy changes to GitHub Pages.

---

## ✅ Step 4: Verify Deployment

1. Go to your GitHub Pages site: `https://your-username.github.io/free-iptv-player`
2. Click **"Load Playlist"** → **"Xtream Codes"**
3. Enter test credentials
4. If everything is configured correctly, channels should load

---

## 🔧 Local Development

For local development, the proxy automatically uses `localhost:4000`:

```bash
# Terminal 1: Local proxy
node xtream-proxy.js

# Terminal 2: Web server
python -m http.server 8000
```

---

## 🐛 Troubleshooting

### Error: "Could not connect to proxy server"

**Cause:** Proxy URL in `config.js` is incorrect.

**Solution:**
1. Verify your Vercel deployment is active
2. Update `VERCEL_PROXY_URL` in GitHub Secrets
3. Commit and push

### Error: "fetch is not defined" in Vercel

**Cause:** Incorrect node-fetch version.

**Solution:**
- `api/xtream.js` uses native `fetch` API from Node.js 18+
- Vercel uses Node.js 20+ by default via `engines` in `package.json`

### Channels don't load in production

**Solution:**
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for errors related to CORS or fetch
4. Verify proxy URL is correct
5. Check that Vercel deployment is active

---

## 🔄 Update Deployment

Each time you push to GitHub, both services update automatically:

- **GitHub Pages:** Via GitHub Actions
- **Vercel:** Via GitHub integration

---

## 📊 Architecture

```
┌─────────────────┐
│  GitHub Pages   │  ← Static frontend (HTML, CSS, JS)
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
│ Xtream Server   │  ← External IPTV server
│   (User's)      │
└─────────────────┘
```

---

## 💰 Costs

- **GitHub Pages:** Free (unlimited for public projects)
- **Vercel Free Plan:**
  - 100 GB bandwidth/month
  - 100 deployments/day
  - Unlimited serverless functions
  - Sufficient for personal projects

---

## 🔐 Security

- Xtream credentials **are never stored**
- Sent directly to proxy in each request
- Proxy uses them only to connect to Xtream server
- HTTPS on both ends (GitHub Pages + Vercel)

---

## 📝 Notes

- Vercel proxy may take ~500ms to start (cold start)
- After first request, responses are fast
- GitHub Pages may take 1-2 minutes to update after push

---

**Need help?** Open an issue on GitHub or check the complete documentation.
