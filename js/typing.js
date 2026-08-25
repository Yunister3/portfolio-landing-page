/**
 * Auto-typing text effect
 * Cycles through phrases with realistic typing speed
 */

(function() {
    'use strict';

    const phrases = [
        'change the world?',
        'redefine the future?',
        'break the limits?',
        'build something new?'
    ];

    const typingEl = document.getElementById('typingLine');
    if (!typingEl) return;

    // Respect prefers-reduced-motion: show the phrase statically
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typingEl.textContent = phrases[0];
        return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else {
                typingSpeed = 70 + Math.random() * 60;
            }
        } else {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);
})();
