self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('easyrpg-cache-v1').then(async cache => {
      const response = await fetch('index.json');
      const data = await response.json();

      const allFiles = [];

      function walk(obj, path = '') {
        for (const key in obj) {
          if (key === '_dirname') continue;
          const value = obj[key];
          if (typeof value === 'string') {
            allFiles.push(`${path}${value}`);
          } else if (typeof value === 'object') {
            walk(value, `${path}${value._dirname ? value._dirname + '/' : ''}`);
          }
        }
      }

      if (data.cache) {
        walk(data.cache);
      }

      allFiles.push('/', 'index.html', 'index.js', 'index.json');
      await cache.addAll(allFiles);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
