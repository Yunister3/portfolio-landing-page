/**
 * Smooth scroll for anchor links
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Dead placeholder links must not jump to the top of the page
            if (href === '#') {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        });
    });
})();
