// Service Worker - root scope for full control
const CACHE_VERSION = 'v2-2025-10-28';
const CACHE_NAME = `streaming-${CACHE_VERSION}`;

// Only cache same-origin, essential app shell assets
const ASSETS = [
  './',
  './index.html',
  './index-en.html',
  './assets/icons/favicon.svg',
  './public/manifest.json',
  './src/css/styles.css',
  './src/css/modal.css',
  './src/js/app.js',
  './src/js/player.js',
  './src/js/playlist-loader.js',
  './src/js/m3u-parser.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
    } catch (e) {
      // Avoid aborting install if any asset fails
      console.warn('[SW] Precache skipped some assets:', e);
    }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (key.startsWith('streaming-') && key !== CACHE_NAME) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET
  if (request.method !== 'GET') return;

  // Don’t try to handle cross-origin requests
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Bypass caching for HLS/streams
  if (url.pathname.endsWith('.m3u8')) return;

  if (sameOrigin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const network = await fetch(request);
        // Optionally cache navigations and static assets
        const cache = await caches.open(CACHE_NAME);
        // Heuristic: cache CSS/JS/HTML/icon
        if (/\.(?:html|css|js|svg)$/.test(url.pathname)) {
          cache.put(request, network.clone());
        }
        return network;
      } catch (e) {
        // Offline fallback for navigations
        if (request.mode === 'navigate') {
          const fallback = await caches.match('./index.html');
          if (fallback) return fallback;
        }
        throw e;
      }
    })());
  }
});
