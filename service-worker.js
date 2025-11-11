// ================================
// SERVICE WORKER - KaizenGO v4.0
// ================================

const CACHE_NAME = "kaizengo-cache-v4";
const FILES_TO_CACHE = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Instalação - Armazena arquivos no cache
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Instalando KaizenGO...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Cache armazenado com sucesso!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação - Remove caches antigos
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Ativando e limpando caches antigos...");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removendo cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Responde com cache primeiro, depois tenta rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Retorna cache se disponível
      }
      return fetch(event.request)
        .then((networkResponse) => {
          // Armazena nova resposta no cache
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Caso offline total
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
