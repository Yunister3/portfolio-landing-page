/**
 * Mobile Menu - Modern Redesign
 * Handles open/close with animations, active link detection, and escape key support
 */

(function() {
    'use strict';

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Get current page path to highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Highlight active link
    menuLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active-link');
        }
    });

    // Open menu
    function openMenu() {
        mobileMenuBtn.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Move focus into the dialog for keyboard and screen-reader users
        const firstFocusable = mobileMenu.querySelector('a[href], button');
        if (firstFocusable) firstFocusable.focus();
    }

    // Close menu
    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close when clicking outside links
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('menu-inner')) {
            closeMenu();
        }
    });

    // Close on link click
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
            mobileMenuBtn.focus();
        }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Basic focus trap while the overlay dialog is open
    mobileMenu.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab' || !mobileMenu.classList.contains('active')) return;
        const focusables = mobileMenu.querySelectorAll('a[href], button');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
})();
