const CACHE_NAME = 'baolong-v20261128v15';
const CORE_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './style.css?v=20261128v15',
  './data.js?v=20261128v15',
  './speech.js?v=20261128v15',
  './math.js?v=20261128v15',
  './ethics.js?v=20261128v15',
  './english.js?v=20261128v15',
  './japanese.js?v=20261128v15',
  './science_life.js?v=20261128v15',
  './arts_pe.js?v=20261128v15',
  './arcade.js?v=20261128v15',
  './dragons.js?v=20261128v15',
  './dino_dragon_games.js?v=20261128v15',
  './story_scenes.js?v=20261128v15',
  './learning_plus.js?v=20261128v15',
  './living_media.js?v=20261128v15',
  './app.js?v=20261128v15',
  './images/icons/icon-192.png',
  './images/icons/icon-512.png',
  './images/ethics/sit_shinkansen.svg',
  './images/ethics/sit_spill_water.svg',
  './images/ethics/sit_help_friend.svg',
  './images/ethics/sit_stranger_gate.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || req.headers.get('range')) return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isMedia = url.pathname.includes('/audio/') || url.pathname.includes('/images/');
  if (isMedia) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => cached || Response.error());
      })
    );
    return;
  }

  event.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
