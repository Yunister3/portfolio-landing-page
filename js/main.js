/**
 * Nova Tech Portfolio — Main Entry
 * Shared behaviors for every page: copyright year, header CTA,
 * and service-worker registration (PWA).
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Dynamic copyright year
        document.querySelectorAll('[data-copy-year]').forEach(function(el) {
            el.textContent = String(new Date().getFullYear());
        });

        // Header "Get Started" button (replaces inline onclick handlers)
        document.querySelectorAll('.nav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                window.location.href = 'contact.html';
            });
        });

    });

    // Register the service worker for offline support — only over https
    // or on localhost, where service workers are allowed to run.
    if ('serviceWorker' in navigator &&
        (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').catch(function() {
                // Offline support is progressive enhancement — failures are silently ignored.
            });
        });
    }
})();
