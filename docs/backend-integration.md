# 🔌 Backend Integration Guide

This guide explains how to connect the Nova Tech frontend to your backend API.

## Quick Setup

### Step 1: Configure API Base URL

Open `api-config.js` and change the `BASE_URL`:

```javascript
const API_CONFIG = {
    // Change this to your backend URL
    BASE_URL: 'http://localhost:3000/api',  // ← Your API URL here
    // ...
};
```

### Step 2: Ensure Your API Endpoints Match

The frontend expects these endpoints (relative to `BASE_URL`):

| Endpoint | Method | Purpose | Request Body |
|----------|--------|---------|--------------|
| `/contact` | POST | Submit contact form | `{ name, email, subject, message }` |
| `/projects` | GET | Fetch projects list | — |

### Expected Response Formats

#### Contact Form Submission

**Request:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "project",
    "message": "I need an AI solution..."
}
```

**Response (success):**
```json
{
    "success": true,
    "message": "Message sent successfully"
}
```

**Response (error):**
```json
{
    "success": false,
    "message": "Error description"
}
```

#### Projects List

**Response:**
```json
[
    {
        "id": 1,
        "title": "AI Chatbot",
        "description": "Intelligent customer support bot",
        "category": "ai",
        "image": "assets/images/project1.jpg",
        "link": "https://example.com",
        "tags": ["Python", "NLP", "FastAPI"]
    }
]
```

## Using the `apiRequest` Helper

The frontend uses the `apiRequest()` function from `api-config.js`:

```javascript
// GET request
const projects = await apiRequest('/projects');

// POST request
const result = await apiRequest('/contact', {
    method: 'POST',
    body: { name, email, subject, message }
});
```

## CORS Configuration

If your backend runs on a different domain, enable CORS:

```javascript
// Node.js / Express example
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://portfolio-landing-page-psi-three.vercel.app'],
    methods: ['GET', 'POST'],
}));
```

## Fallback Behavior

If the API is unavailable:
- **Projects page** displays 6 sample projects (fallback data in `projects.js`)
- **Contact form** shows a success message without actual submission

This ensures the site works even during development.

## Deployment

1. Deploy your backend API
2. Update `API_CONFIG.BASE_URL` in `api-config.js`
3. Deploy the frontend (any static host works — Vercel, Netlify, GitHub Pages)

---

Questions? Open an issue or contact the frontend team.
