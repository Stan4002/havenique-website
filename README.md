# Havenique Home Based Nursing Care — Website

Official website for **Havenique Home Based Nursing Care**, a professional home-based nursing service based in Lusaka, Zambia.

---

## Tech Stack

- **React 18** + TypeScript
- **Vite** (build tool)
- **React Router v6** (routing)
- **CSS Modules** (styling)
- **Tailwind CSS** (utility classes)

---

For local development this defaults to `http://localhost:3000/api`.

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Pages

### Public
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About Us |
| `/services` | Services |
| `/team` | Our Team |
| `/pricing` | Pricing |
| `/blog` | Blog |
| `/blog/:slug` | Single Blog Post |
| `/contact` | Contact Us |
| `/faq` | FAQ |
| `/testimonials` | Testimonials |
| `/privacy` | Privacy Policy |

### Admin (protected)
| Route | Page |
|-------|------|
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Overview & Stats |
| `/admin/settings` | Site Settings |
| `/admin/about` | Edit About Content |
| `/admin/services` | Manage Services |
| `/admin/staff` | Manage Staff |
| `/admin/pricing` | Manage Pricing |
| `/admin/blog` | Manage Blog Posts |
| `/admin/faq` | Manage FAQs |
| `/admin/testimonials` | Approve Testimonials |
| `/admin/inbox` | Contact Submissions |

---

## Backend

This frontend connects to a separate Node.js/Express backend.
Repository: `havenique-backend`
API Base: configured via `VITE_API_BASE` environment variable.

---

## Deployment

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** Supabase (PostgreSQL)

---

## Client

**Havenique Home Based Nursing Care**
Lusaka, Zambia
haveniquecare.z,@gmail.com

---

## Developer

**Stanley Kapeta** — Freelance Web Developer
stanleykapeta10@gmail.com
Ndola, ZUT
