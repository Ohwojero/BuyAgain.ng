// Service Worker for offline functionality
const CACHE_NAME = "buyagain-v2"
const urlsToCache = [
  "/",
  "/mobile",
  "/mobile/generate",
  "/mobile/scan",
  "/mobile/analytics",
  "/mobile/settings",
  "/dashboard",
  "/login",
  "/register",
  "/pricing",
  "/offline",
  "/manifest.json",
  "/icon-192x192.jpg",
  "/icon-512x512.jpg",
  "/buyagain-logo.png",
]

// Install event - cache essential resources
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching app shell and content")
      return cache.addAll(urlsToCache)
    }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Skip API requests to avoid intercepting backend calls
  const url = new URL(event.request.url)
  if (url.hostname !== self.location.hostname || url.port !== self.location.port) {
    return
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log("[SW] Serving from cache:", event.request.url)
          return response
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === "error") {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })

            return response
          })
          .catch(() => {
            // If both cache and network fail, show offline page
            console.log("[SW] Both cache and network failed, showing offline page")
            return caches.match("/offline")
          })
      })
      .catch(() => {
        // If cache match fails, show offline page
        return caches.match("/offline")
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  // Take control of all pages immediately
  return self.clients.claim()
})

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
