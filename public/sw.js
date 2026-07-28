// Service worker minimal : cache les ressources visitées pour permettre un
// usage hors ligne après une première visite. Stratégie "réseau d'abord,
// repli sur le cache" — toujours à jour en ligne, disponible hors ligne.
const CACHE_NAME = "ru-app-cache-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const shell = await cache.match(self.registration.scope);
          if (shell) return shell;
        }
        throw new Error("network-and-cache-miss");
      }
    })
  );
});
