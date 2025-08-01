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

        // 必要なファイルを追加（重複しないようセットで管理）
        const extraFiles = ['/', '/index.html', '/index.js', '/index.json'];
        extraFiles.forEach(f => {
          if (!allFiles.includes(f)) allFiles.push(f);
        });

        await cache.addAll(allFiles);
        console.log('Cached files:', allFiles);
      } catch (e) {
        console.error('Cache install failed:', e);
      }
    })
  );
});
