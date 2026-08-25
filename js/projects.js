/**
 * Projects Page — Load projects from API or use fallback data
 */

(function() {
    'use strict';

    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    // ─── Fallback Projects Data ───
    // Backend developers: Replace with API call using apiRequest(API_CONFIG.PROJECTS)
    const fallbackProjects = [
        {
            id: 1,
            title: 'AI Code Reviewer',
            desc: 'Intelligent code review system that analyzes pull requests, detects bugs, and suggests improvements using LLMs.',
            tags: ['Python', 'LLM', 'API'],
            category: 'ai',
            icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
        },
        {
            id: 2,
            title: 'Smart Analytics Dashboard',
            desc: 'Real-time analytics platform with predictive insights, custom reports, and automated anomaly detection.',
            tags: ['React', 'D3.js', 'Node.js'],
            category: 'web',
            icon: '<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        },
        {
            id: 3,
            title: 'Automated Testing Pipeline',
            desc: 'CI/CD pipeline with AI-powered test generation, parallel execution, and intelligent flaky test detection.',
            tags: ['CI/CD', 'Python', 'Docker'],
            category: 'automation',
            icon: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        },
        {
            id: 4,
            title: 'REST API Gateway',
            desc: 'High-performance API gateway with rate limiting, authentication, request transformation, and monitoring.',
            tags: ['Node.js', 'Redis', 'PostgreSQL'],
            category: 'api',
            icon: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        },
        {
            id: 5,
            title: 'NLP Content Generator',
            desc: 'AI-powered content generation tool with multi-language support, tone adjustment, and SEO optimization.',
            tags: ['Python', 'Transformers', 'FastAPI'],
            category: 'ai',
            icon: '<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/></svg>',
        },
        {
            id: 6,
            title: 'E-Commerce Platform',
            desc: 'Full-stack e-commerce solution with AI recommendations, real-time inventory, and automated fulfillment.',
            tags: ['Next.js', 'Stripe', 'MongoDB'],
            category: 'web',
            icon: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
        },
    ];

    let currentFilter = 'all';
    let projects = [];

    // ─── Safe rendering helpers (XSS hardening for future API data) ───
    const FALLBACK_ICON = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>';

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Only plain inline <svg> markup is accepted for icons; anything else
    // (scripts, event handlers, javascript: URLs…) falls back to a neutral icon.
    function safeIcon(markup) {
        if (typeof markup !== 'string') return FALLBACK_ICON;
        const trimmed = markup.trim();
        const looksLikeSvg = /^<svg[\s\S]*<\/svg>$/i.test(trimmed);
        const dangerous = /<\s*(script|iframe|img|object|embed|foreignObject|animate)/i.test(trimmed) ||
            /(on[a-z]+\s*=|javascript:)/i.test(trimmed);
        return (looksLikeSvg && !dangerous) ? trimmed : FALLBACK_ICON;
    }

    // ─── Load Projects ───
    async function loadProjects() {
        try {
            // Try to fetch from API
            const data = await apiRequest(API_CONFIG.PROJECTS);
            projects = data.projects || data;
        } catch (error) {
            // API unavailable — built-in fallback dataset keeps the section alive.
            projects = fallbackProjects;
        }

        renderProjects(projects);
    }

    // ─── Render Projects ───
    function renderProjects(projectList) {
        projectsGrid.innerHTML = '';

        projectList.forEach((project) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.category = project.category;

            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        ${safeIcon(project.icon)}
                    </div>
                    <div class="project-arrow">
                        <svg viewBox="0 0 24 24"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                    </div>
                </div>
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-desc">${escapeHtml(project.desc)}</p>
                <div class="project-preview">
                    <span class="project-preview-placeholder">[ Project Preview ]</span>
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            `;

            projectsGrid.appendChild(card);
        });
    }

    // ─── Filter Tabs ───
    function initFilters() {
        const tabs = document.querySelectorAll('.filter-tab');

        const syncPressedState = () => {
            tabs.forEach(t => t.setAttribute('aria-pressed', String(t.classList.contains('active'))));
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                syncPressedState();

                currentFilter = tab.dataset.filter;
                filterProjects();
            });
        });

        syncPressedState();
    }

    function filterProjects() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            if (currentFilter === 'all' || card.dataset.category === currentFilter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ─── Initialize ───
    loadProjects();
    initFilters();

})();
