module.exports = {
  globDirectory: './',   
  globPatterns: [
    '**/*.{html,js,json,wasm,png,svg,css,ogg,mp3,woff2,xyz,mid,wav,exe,lmu,ini,ldb,lmt,txt}',
    'games/**/*.*'             
  ],
  swDest: 'public/sw.js',     
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 1 * 1024 * 1024 * 1024
};
