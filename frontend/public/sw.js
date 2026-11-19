// OFG.ai Studio Service Worker (PWA Mobile Shell & Cache v10)
const CACHE_NAME = "ofg-studio-cache-v10";
const ASSETS_TO_CACHE = [
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // No interceptar peticiones a la API o streams pesados de audio
  if (url.pathname.startsWith("/api") || url.pathname.endsWith(".m4a")) {
    return;
  }

  // NAVEGACIÓN Y HTML: NETWORK FIRST (siempre la versión más fresca)
  if (event.request.mode === "navigate" || event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // OTROS RECURSOS ESTÁTICOS
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request);
    })
  );
});
