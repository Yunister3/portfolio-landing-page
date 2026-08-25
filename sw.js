/* ============================================================
   Nova Tech — minimal service worker (PWA offline support)
   - Pages: network-first with cache fallback
   - Static assets: cache-first
   - Never touches non-GET requests or cross-origin traffic
   ============================================================ */

const CACHE_NAME = 'nova-tech-v2';

const CORE_ASSETS = [
    'index.html',
    'projects.html',
    'about.html',
    'contact.html',
    '404.html',
    'css/main.css',
    'css/hero.css',
    'css/features.css',
    'css/stats.css',
    'css/projects.css',
    'css/about.css',
    'css/contact.css',
    'css/responsive.css',
    'js/main.js',
    'js/dots.js',
    'js/typing.js',
    'js/counter.js',
    'js/scroll.js',
    'js/mobile-menu.js',
    'js/projects.js',
    'js/contact-form.js',
    'api-config.js',
    'assets/icons/favicon.svg',
    'manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;                 // never intercept API POSTs
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;      // fonts/CDN pass through

    const isPage = request.mode === 'navigate' || url.pathname.endsWith('.html');

    if (isPage) {
        // Network-first for pages so content stays fresh, cached when offline
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() =>
                    caches.match(request).then((cached) => cached || caches.match('index.html'))
                )
        );
    } else {
        // Cache-first for static assets
        event.respondWith(
            caches.match(request).then((cached) =>
                cached ||
                fetch(request).then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    return response;
                })
            )
        );
    }
});
