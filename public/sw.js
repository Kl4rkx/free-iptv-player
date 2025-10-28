// Service Worker para Canales de Streaming
const CACHE_NAME = 'streaming-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepción de peticiones
self.addEventListener('fetch', event => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') return;
  
  // No cachear streams M3U8
  if (event.request.url.includes('.m3u8') || 
      event.request.url.includes('167.17.67.240')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devolver desde cache o hacer petición de red
        return response || fetch(event.request);
      })
      .catch(() => {
        // Si falla, intentar devolver index.html para SPA
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});