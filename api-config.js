/**
 * Nova Tech Portfolio — API Configuration
 * 
 * Backend developers: Change only BASE_URL to connect frontend to your API.
 * All endpoints are relative to BASE_URL.
 */

const API_CONFIG = {
    // ─── Main API Base URL ───
    // Change this to your backend URL
    // Example: 'http://localhost:3000/api' or 'https://api.yourdomain.com'
    BASE_URL: 'http://localhost:3000/api',

    // ─── Endpoints ───
    CONTACT: '/contact',
    PROJECTS: '/projects',
    ABOUT: '/about',
    BLOG: '/blog',

    // ─── Headers ───
    HEADERS: {
        'Content-Type': 'application/json',
    },

    // ─── Options ───
    TIMEOUT: 10000, // ms
    RETRIES: 2,
};

/**
 * Make an API request
 * @param {string} endpoint - API endpoint (relative to BASE_URL)
 * @param {object} options - fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const defaultOptions = {
        method: options.method || 'GET',
        headers: {
            ...API_CONFIG.HEADERS,
            ...options.headers,
        },
        signal: (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function')
            ? AbortSignal.timeout(API_CONFIG.TIMEOUT)
            : undefined,
    };

    if (options.body && typeof options.body === 'object') {
        defaultOptions.body = JSON.stringify(options.body);
    }

    const mergedOptions = { ...defaultOptions, ...options, headers: defaultOptions.headers, body: defaultOptions.body };

    // Retry logic — GET requests only. Retrying a non-idempotent request
    // such as POST /contact could submit the same message multiple times.
    const retriable = (options.method || 'GET').toUpperCase() === 'GET';
    let lastError;
    for (let i = 0; i <= (retriable ? API_CONFIG.RETRIES : 0); i++) {
        try {
            const response = await fetch(url, mergedOptions);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, apiRequest };
}
