importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// שם המטמון (Cache)
const CACHE_NAME = 'mathstudio-v2';

// 1. שמירת ספריות חיצוניות (כמו math.js) וקבצי המערכת
workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
    new workbox.strategies.NetworkFirst({
        cacheName: 'static-resources',
    })
);

// 2. שמירת תמונות ואייקונים
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // שמירה ל-30 יום
            }),
        ],
    })
);

// הפעלה מיידית של העדכון
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
