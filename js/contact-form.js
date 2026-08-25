/**
 * Contact Form — Validation + API Submission
 */

(function() {
    'use strict';

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    // ─── Validation Rules ───
    function validateField(name, value) {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email';
                return '';

            case 'subject':
                if (!value) return 'Please select a subject';
                return '';

            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';

            default:
                return '';
        }
    }

    function showError(fieldId, message) {
        const errorEl = document.getElementById(fieldId + 'Error');
        const inputEl = document.getElementById(fieldId);

        if (errorEl) errorEl.textContent = message;
        if (inputEl) inputEl.style.borderColor = '#ff6b6b';
    }

    function clearError(fieldId) {
        const errorEl = document.getElementById(fieldId + 'Error');
        const inputEl = document.getElementById(fieldId);

        if (errorEl) errorEl.textContent = '';
        if (inputEl) inputEl.style.borderColor = '';
    }

    // ─── Real-time Validation ───
    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input) return;

        input.addEventListener('blur', () => {
            const error = validateField(field, input.value);
            if (error) {
                showError(field, error);
            } else {
                clearError(field);
            }
        });

        input.addEventListener('input', () => {
            clearError(field);
        });
    });

    // ─── Form Submit ───
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const formData = {};

        fields.forEach(field => {
            const input = document.getElementById(field);
            const error = validateField(field, input.value);

            if (error) {
                showError(field, error);
                isValid = false;
            } else {
                clearError(field);
                formData[field] = input.value.trim();
            }
        });

        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            // Send to API
            await apiRequest(API_CONFIG.CONTACT, {
                method: 'POST',
                body: formData,
            });

            // Success
            formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);

            // Honest failure state: never fake a success when the API is
            // unreachable, and keep the user's input so nothing is lost.
            formStatus.textContent = 'Could not reach the server. Please try again later or email us at hello@novatech.dev.';
            formStatus.className = 'form-status warning';
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

})();
