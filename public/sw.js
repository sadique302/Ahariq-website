// Service Worker for AharIQ (आहार IQ) PWA
const CACHE_NAME = "ahariq-pwa-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/icon.svg"
];

// Install event: cache static app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("PWA pre-cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Network-first for dynamic requests, cache fallback for shell
self.addEventListener("fetch", (event) => {
  // Skip non-GET or chrome-extension or external analytics
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // If requesting API or Open Food Facts, fetch network first
  if (url.pathname.startsWith("/api") || url.hostname.includes("openfoodfacts")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: "Offline mode - cached data unavailable" }), {
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    return;
  }

  // Stale-while-revalidate for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
