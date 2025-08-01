self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('easyrpg-cache-v1').then(async cache => {
      try {
        const response = await fetch('/index.json');
        const data = await response.json();

        const allFiles = [];

        function walk(obj, path = '') {
          for (const key in obj) {
            if (key === '_dirname') continue;
            const value = obj[key];
            if (typeof value === 'string') {
              allFiles.push(path + encodeURI(value));
            } else if (typeof value === 'object') {
              walk(value, path + (value._dirname ? value._dirname + '/' : ''));
            }
          }
        }

        if (data.cache) walk(data.cache);

        // 明示的に追加したいファイルを追加
        ['/', '/index.html', '/index.js', '/index.json'].forEach(f => allFiles.push(f));

        // 重複削除
        const uniqueFiles = [...new Set(allFiles)];

        console.log('Files to cache:', uniqueFiles);

        await cache.addAll(uniqueFiles);
      } catch (e) {
        console.error('Cache install failed:', e);
      }
    })
  );
});
