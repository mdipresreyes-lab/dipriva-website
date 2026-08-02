# Dipriva Consulting Group - Landing Page Deployment Guide

## Project Overview

A luxury consulting landing page built with React 19, Tailwind CSS 4, Express 4, and tRPC 11. Features dark mode aesthetic with obsidian background, silver/gold accents, 3D abstract textures, and embedded Microsoft Forms for lead capture and client intake.

**Live Domain:** https://www.dipriva.com

## Architecture

### Tech Stack
- **Frontend:** React 19, Tailwind CSS 4, Framer Motion, shadcn/ui
- **Backend:** Express 4, tRPC 11, Drizzle ORM
- **Database:** MySQL (via Manus) — users table only
- **Authentication:** Manus OAuth
- **Forms:** Microsoft Forms (embedded via iframe)
- **Chat Widget:** GoHighLevel chat widget (widget ID: 67fda9c8047126869aaaac64)
- **Deployment:** Manus Hosting (built-in)

### Key Features Implemented

1. **Dark Mode Luxury Aesthetic**
   - Obsidian background (#0A0A0A)
   - Silver text (#E8E8E8)
   - Gold accents (#D4AF37)
   - Playfair Display typography with enhanced letter-spacing

2. **Page Sections**
   - Hero Section: 3D abstract texture background, headline, CTA button
   - Services Section: Bento Grid with three glassmorphism cards
   - About Section: Brand credibility and expertise messaging
   - Footer: Company info and navigation links

3. **Forms (Microsoft Forms embedded)**
   - `/schedule` — Lead Capture form (public, replaces old custom form)
   - `/client_form` — Client Intake form (private, noindex, direct-link only)
   - Both forms have bilingual consent text (EN/ES)
   - Data flows directly into Microsoft 365 (Forms → Excel in OneDrive)

4. **Chat Widget**
   - GHL chat widget retained for live chat capability
   - Widget ID: 67fda9c8047126869aaaac64
   - Loaded from widgets.leadconnectorhq.com

5. **Animations**
   - Framer Motion scroll-triggered animations
   - Card lift effects on scroll entry
   - Smooth transitions and micro-interactions

## Environment Variables

Required secrets (set via `webdev_request_secrets`):

```
VITE_APP_TITLE=Dipriva Consulting Group
VITE_APP_LOGO=https://your-logo-url.com/logo.png
```

Pre-configured system variables:
- `DATABASE_URL` - MySQL connection
- `JWT_SECRET` - Session signing
- `VITE_APP_ID` - Manus OAuth app ID
- `OAUTH_SERVER_URL` - OAuth backend
- `BUILT_IN_FORGE_API_KEY` - Manus API key
- `BUILT_IN_FORGE_API_URL` - Manus API endpoint

**Retired (no longer needed):**
- ~~`GHL_PIT_TOKEN`~~ — GHL CRM integration removed August 2026

## Database Schema

### Users Table (only active table)
```sql
CREATE TABLE `users` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `openId` varchar(64) NOT NULL UNIQUE,
  `name` text,
  `email` varchar(320),
  `loginMethod` varchar(64),
  `role` enum('user','admin') DEFAULT 'user' NOT NULL,
  `createdAt` timestamp DEFAULT now() NOT NULL,
  `updatedAt` timestamp DEFAULT now() ON UPDATE now() NOT NULL,
  `lastSignedIn` timestamp DEFAULT now() NOT NULL
);
```

### Leads Table (dormant — no longer written to)
The `leads` table still exists in the database but is no longer used. New leads flow through Microsoft Forms directly into the owner's Microsoft 365 environment. The table can be dropped at any time without affecting site functionality.

## Routes

| Route | Purpose | Indexed |
|-------|---------|---------|
| `/` | Homepage | Yes |
| `/schedule` | Lead Capture (MS Form embed) | Yes |
| `/client_form` | Client Intake (MS Form embed) | No (noindex via X-Robots-Tag + meta + robots.txt) |
| `/privacy` | Privacy Policy | Yes |

## Deployment Instructions

### Option 1: Manus Built-in Hosting (Recommended)
1. Click **Publish** button in Management UI (requires checkpoint)
2. Manus automatically handles:
   - Build optimization
   - SSL/TLS certificates
   - CDN distribution
   - Auto-scaling
   - Domain management

### Option 2: Custom Domain
1. In Management UI → Settings → Domains
2. Purchase new domain or bind existing domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned

## Testing Checklist

- [x] Page renders without CSS errors
- [x] Dark mode theme applied correctly
- [x] Playfair Display font loads and renders
- [x] Hero section displays with texture background
- [x] Services cards visible with glassmorphism effects
- [x] MS Forms iframes load on /schedule and /client_form
- [x] Consent text displays in both EN and ES
- [x] /client_form has noindex (X-Robots-Tag header + meta override)
- [x] GHL chat widget still loads
- [x] Mobile responsiveness verified
- [x] All animations smooth and performant
- [x] TypeScript compilation passes
- [x] All vitest tests passing
- [x] Privacy Policy renders new content in EN/ES

## Performance Metrics

- **Lighthouse Score:** Target 90+
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <2.5s
- **Cumulative Layout Shift:** <0.1

## Maintenance & Monitoring

### Logs
- Dev server logs: `.manus-logs/devserver.log`
- Browser console: `.manus-logs/browserConsole.log`
- Network requests: `.manus-logs/networkRequests.log`

### Common Issues & Solutions

**Issue:** MS Forms iframe not loading
- **Solution:** Verify the form is published and the embed URL is correct
- Check browser console for CSP or mixed-content errors
- Ensure the MS Form has not been deleted or moved

**Issue:** Styles not loading correctly
- **Solution:** Clear browser cache and restart dev server
- Verify Tailwind config is loaded: `tailwind.config.ts`
- Check for CSS utility conflicts

**Issue:** Database connection errors
- **Solution:** Verify DATABASE_URL environment variable
- Check MySQL connection from Management UI
- Ensure database user has correct permissions

## Version History

- **v2.0.0** (Current): GHL CRM removed, MS Forms migration
  - Replaced custom lead capture form with MS Forms iframe
  - Created /client_form page for client intake (private, noindex)
  - Removed GHL API integration and leads.submit procedure
  - Rewrote Privacy Policy with new EN/ES content
  - Cleaned up orphaned code (LeadCaptureForm, form translations, ghl.test.ts)
  - Retained GHL chat widget

- **v1.0.0**: Initial launch with full feature set
  - Dark mode luxury aesthetic
  - GHL API integration (now retired)
  - Lead capture form (now replaced)
  - Framer Motion animations
  - Responsive design

---

**Last Updated:** August 2, 2026
