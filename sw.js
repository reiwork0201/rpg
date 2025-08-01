const CACHE_NAME = 'custom-cache-v1';

// index.json のパス（公開ルートにある前提）
const INDEX_JSON_URL = 'index.json';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const response = await fetch(INDEX_JSON_URL);
      const files = await response.json();

      const urlsToCache = Array.isArray(files) ? files : [];

      // index.json 自体もキャッシュに入れる
      urlsToCache.push(INDEX_JSON_URL);

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
