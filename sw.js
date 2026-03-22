const CACHE = 'todo-v1';
const FICHIERS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icone.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FICHIERS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker installé'))
    .catch(err => console.log('Erreur :', err));
}