const CACHE="neon-cache-v5";
const FILES=[
  "./","./index.html","./style.css","./hub.js",
  "./manifest.json","./icon-192.png","./icon-512.png",
  "./game-snake.js","./game-tetris.js","./game-platformer.js",
  "./game-pong.js","./game-breakout.js"
];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("fetch",e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
