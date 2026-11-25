const CACHE = 'pocket-guide-enc-v11';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './epub.enc.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('endpoint.json') || e.request.url.includes('/api/')) {
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});