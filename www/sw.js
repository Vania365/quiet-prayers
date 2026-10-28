const CACHE = "quiet-prayers-v10";
const FILES = ["./", "./index.html", "./theme.css","./personal.js", "./people_music.js", "./share_card.js", "./quiet_mode.js","./prayers_more.js", "./prayers_lovable.js", "./prayers_365a.js", "./prayers_365b.js", "./prayers_365c.js", "./prayers_365d.js", "./prayers_thanks.js", "./nav_buttons.js", "./native_bridge.js", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // network first so updates (new prayers) show up right away; cache when offline
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("./index.html")))
  );
});
