self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open('easyrpg-cache-v1');
        const response = await fetch('index.json');
        const data = await response.json();

        const allFiles = [];

        function walk(obj, path = '') {
          for (const key in obj) {
            if (key === '_dirname') continue;
            const value = obj[key];
            if (typeof value === 'string') {
              allFiles.push(`games/default/${path}${value}`);
            } else if (typeof value === 'object') {
              const subdir = value._dirname ? `${value._dirname}/` : '';
              walk(value, `${path}${subdir}`);
            }
          }
        }

        if (data.cache) {
          walk(data.cache);
        }

        allFiles.push('/', 'index.html', 'index.js', 'index.json');
        const uniqueFiles = [...new Set(allFiles)];

        console.log('Caching files:', uniqueFiles);
        await cache.addAll(uniqueFiles);
      } catch (e) {
        console.error('SW install error:', e);
      }
    })()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
