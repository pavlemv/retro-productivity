const CACHE_NAME = 'retro-productivity-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/data.js',
  '/js/todo.js',
  '/js/pomodoro.js',
  '/js/media.js',
  '/sounds/work.mp3',
  '/sounds/break.mp3',
  '/sounds/long-break.mp3',
  '/images/pomodoro-icon.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((response) => {
            // Cache new resources
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Return a fallback for failed image requests
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match('/images/fallback.png');
            }
            // Return a fallback for failed audio requests
            if (event.request.url.match(/\.(mp3|wav)$/)) {
              return new Response('Audio unavailable offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            }
          });
      })
  );
}); 