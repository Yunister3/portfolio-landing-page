/**
 * Stats counter animation
 * Animates numbers when section scrolls into view
 */

(function() {
    'use strict';

    const statItems = document.querySelectorAll('.stat-item');
    if (!statItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => observer.observe(item));

    function animateCounter(el) {
        const numberEl = el.querySelector('.stat-number');
        const target = parseInt(numberEl.dataset.target);
        const suffix = numberEl.dataset.suffix;

        // Respect prefers-reduced-motion: jump straight to final value
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            numberEl.textContent = target + suffix;
            return;
        }

        let current = 0;
        const increment = target / 60;
        const stepTime = 2000 / 60;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            numberEl.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }
})();
