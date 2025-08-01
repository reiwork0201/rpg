const CACHE_NAME = "easyrpg-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/Player.js",
  "/Player.wasm",
  "/manifest.json",
  "/style.css",
  "/game/RPG_RT.ldb",
  "/game/Map0001.lmu",
  "/game/…", // 必要なすべてのゲームデータを列挙
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
