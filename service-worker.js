cacheName = 'v2.0'
self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll([
          `/`,
          `/index.html`,
          `/css/main.css`,
          `/js/main.js`
        ])
            .then(() => self.skipWaiting());
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
      })
    );
  });