const APP_VERSION = "1.0.1";
const CACHE_NAME = `neon-games-${APP_VERSION}`;
const ASSETS = ["/","/index.html","/manifest.json","/icon-192.png","/icon-512.png"];
self.addEventListener("install", e => {e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate", e => {e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch", e => {e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request).then(r=>caches.open(CACHE_NAME).then(c=>{c.put(e.request,r.clone());return r;})).catch(()=>caches.match("/index.html"))));});
