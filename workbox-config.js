module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,js,json,wasm,png,svg,css,ogg,mp3,woff2,xyz,mid,wav,exe,lmu,ini,ldb,lmt,txt}',
    'games/**/*.*'
  ],
  swDest: 'public/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 1024 * 1024 * 1024,
  runtimeCaching: [
    {
      urlPattern: /\.(?:wasm|exe|json|ldb|lmu|lmt|ini|mid|ogg|mp3|png|svg|js|css|txt)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'game-assets-cache',
        expiration: {
          maxEntries: 3000,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30日
        }
      }
    }
  ]
};
