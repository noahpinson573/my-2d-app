const CACHE="neon-cache-v9";
const FILES=[
  "./","./index.html","./style.css","./hub.js",
  "./manifest.json",
  "./game-platformer.js","./game-snake.js",
  "./game-tetris.js","./game-pong.js","./game-breakout.js",
  "./icon-192.png","./icon-512.png"
];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>x!==CACHE&&caches.delete(x)))));
  self.clients.claim();
});

self.addEventListener("fetch",e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
