# 🚀 Nova Tech — AI Portfolio Landing Page

A modern, dark-themed portfolio website built for showcasing AI and technology services. Inspired by Vercel's minimalist design philosophy.

## 📁 Project Structure

```
portfolio-landing/
├── index.html              # Homepage — Hero + Features + Stats + CTA
├── projects.html           # Projects showcase with filter tabs
├── about.html              # About page — Mission, skills, timeline
├── contact.html            # Contact page with validated form
├── api-config.js           # Backend API configuration & helper
├── manifest.json           # PWA manifest
├── robots.txt              # SEO robot instructions
├── sitemap.xml             # SEO sitemap
├── docs/                   # Documentation for developers
│   └── backend-integration.md
├── css/                    # Modular stylesheets
│   ├── main.css            # Reset, variables, nav, buttons, footer
│   ├── hero.css            # Hero section + dots grid
│   ├── features.css        # Features grid
│   ├── stats.css           # Stats + CTA sections
│   ├── projects.css        # Projects page styles
│   ├── about.css           # About page styles
│   ├── contact.css         # Contact page styles
│   └── responsive.css      # Mobile/tablet breakpoints
└── js/                     # Modular JavaScript
    ├── main.js             # Bootstrap entry point
    ├── dots.js             # Pixel art grid + spotlight effect
    ├── typing.js           # Auto-typing text animation
    ├── counter.js          # Animated number counters
    ├── scroll.js           # Scroll-based animations
    ├── mobile-menu.js      # Hamburger menu toggle
    ├── projects.js         # Projects filtering + API
    └── contact-form.js     # Form validation + submission
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Full dark theme |
| Surface | `rgba(255, 255, 255, 0.03)` | Card backgrounds |
| Border | `rgba(255, 255, 255, 0.06)` | Grid lines, dividers |
| Text Primary | `#f5f5f7` | Headings, body text |
| Text Secondary | `rgba(245, 245, 247, 0.5)` | Descriptions |
| Text Tertiary | `rgba(245, 245, 247, 0.3)` | Labels |

**Fonts:** Inter (body), Geist Mono (code/labels)

**Style:** Pill-shaped buttons (border-radius: 9999px), grid borders (Vercel-style), no shadows

## 🚀 Quick Start

```bash
# No build step required — this is a static site
# Simply open index.html in a browser

# Or use a local server:
npx serve .
# or
python -m http.server 3000
```

## 🔌 Backend Integration

See [docs/backend-integration.md](docs/backend-integration.md) for complete API integration guide.

**Quick setup:**
1. Open `api-config.js`
2. Change `BASE_URL` to your backend URL
3. Adjust endpoints as needed
4. That's it — frontend will use your API automatically

## ✨ Features

- **Pixel Art Grid** — high-density 24x24 animated pixel monitor playing seven slow, readable looping micro-scenes: a typing terminal session (`> AI` → progress bar → `OK!`), a firing neural network signal, a scrolling NOVA marquee that pauses mid-screen, an AI chip power-up, a living robot (looks around, blinks, antenna), matrix-rain resolving into a `</>` logo flash, and a pulsing heart. Hovering pauses the show with a spotlight; leaving resumes exactly where it paused.
- **Spotlight Effect** — Cursor-following light within the grid
- **Loading Animation** — Horizontal scan + center pulse on page load
- **Auto-typing** — Rotating phrases with realistic typing speed
- **Animated Counters** — Numbers animate when scrolled into view
- **Scroll Animations** — Elements fade in on scroll
- **Mobile Menu** — Full-screen overlay with animated hamburger
- **Form Validation** — Real-time blur + input validation
- **SEO Ready** — Meta tags, Open Graph, sitemap, robots.txt
- **PWA Ready** — manifest.json included

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| ≤ 768px | Mobile |
| 769px – 900px | Tablet |
| > 900px | Desktop |

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Modular, custom properties, CSS Grid
- **Vanilla JavaScript** — No dependencies, IIFE modules
- **SVG** — Inline icons and logo

## 📄 License

This project is for portfolio purposes. Feel free to customize and use.

---

Built with ❤️ by Nova Tech
