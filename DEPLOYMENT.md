# Dipriva Consulting Group - Landing Page Deployment Guide

## Project Overview

A luxury consulting landing page built with React 19, Tailwind CSS 4, Express 4, and tRPC 11. Features dark mode aesthetic with obsidian background, silver/gold accents, 3D abstract textures, and integrated lead capture with GoHighLevel (GHL) API.

**Live Dev Server:** https://3000-i4qe4xq1krivh1u24i815-b4d0ac40.us1.manus.computer

## Architecture

### Tech Stack
- **Frontend:** React 19, Tailwind CSS 4, Framer Motion, shadcn/ui
- **Backend:** Express 4, tRPC 11, Drizzle ORM
- **Database:** MySQL (via Manus)
- **Authentication:** Manus OAuth
- **Lead Integration:** GoHighLevel API (v2/contacts)
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
   - Lead Capture Form: Progressive single-field-at-a-time UX
   - Footer: Company info and navigation links

3. **Form & API Integration**
   - Dual submission: GHL primary, database fallback
   - Zod validation
   - Error handling with user-friendly messages
   - Form state tracking (idle, loading, success, error)

4. **Animations**
   - Framer Motion scroll-triggered animations
   - Card lift effects on scroll entry
   - Smooth transitions and micro-interactions

## Environment Variables

Required secrets (set via `webdev_request_secrets`):

```
GHL_PIT_TOKEN=your-ghl-pit-token
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

## Database Schema

### Leads Table
```sql
CREATE TABLE `leads` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `primaryChallenge` text NOT NULL,
  `ghlContactId` varchar(255),
  `ghlStatus` varchar(50) DEFAULT 'pending',
  `submittedAt` timestamp DEFAULT now(),
  `createdAt` timestamp DEFAULT now()
);
```

## API Integration

### GHL Contact Submission
**Endpoint:** `POST https://rest.gohighlevel.com/v2/contacts`

**Payload Structure:**
```json
{
  "locationId": "sAdThi71k3Nkr8LGM8P9",
  "contact": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "customField": {
      "primary_challenge": "string",
      "brand_interest": "Dipriva Consulting Group"
    }
  },
  "source": "Dipriva High-Fidelity Web Portal",
  "tags": ["Lead", "High-End UX", "2026_Campaign"]
}
```

**Error Handling:**
- If GHL submission fails, lead is saved to database with `ghlStatus: 'fallback'`
- User receives success message regardless (graceful degradation)
- Server logs all API errors for debugging

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

### Option 3: External Hosting (Vercel, Railway, etc.)
1. Export project code via GitHub integration
2. Push to your repository
3. Connect to hosting platform
4. Set environment variables in platform dashboard
5. Deploy via platform's CI/CD

## Testing Checklist

- [x] Page renders without CSS errors
- [x] Dark mode theme applied correctly
- [x] Playfair Display font loads and renders
- [x] Hero section displays with texture background
- [x] Services cards visible with glassmorphism effects
- [x] Form validation works correctly
- [x] GHL API integration tested
- [x] Database fallback functional
- [x] Mobile responsiveness verified
- [x] All animations smooth and performant
- [x] TypeScript compilation passes
- [x] All vitest tests passing (5/5)

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

### Database Monitoring
- Access via Management UI → Database panel
- View leads table: All form submissions stored
- Monitor GHL sync status via `ghlStatus` field

### Common Issues & Solutions

**Issue:** Form submissions not reaching GHL
- **Solution:** Verify GHL_PIT_TOKEN is set correctly
- Check GHL Location ID: `sAdThi71k3Nkr8LGM8P9`
- Review server logs for API errors

**Issue:** Styles not loading correctly
- **Solution:** Clear browser cache and restart dev server
- Verify Tailwind config is loaded: `tailwind.config.ts`
- Check for CSS utility conflicts

**Issue:** Database connection errors
- **Solution:** Verify DATABASE_URL environment variable
- Check MySQL connection from Management UI
- Ensure database user has correct permissions

## Future Enhancements

1. **Email Notifications**
   - Send confirmation email to leads
   - Admin notification on new submission
   - Integrate with email service (SendGrid, Mailgun)

2. **Advanced Analytics**
   - Track form completion rates
   - Monitor GHL sync success rates
   - Heatmaps and user journey tracking

3. **Dynamic Content**
   - CMS integration for service descriptions
   - Blog section for thought leadership
   - Case study showcase

4. **Lead Scoring**
   - Automatic lead qualification
   - Priority routing based on challenge type
   - Integration with CRM workflows

## Support & Documentation

- **Manus Help Center:** https://help.manus.im
- **Project README:** See root `README.md`
- **API Documentation:** See `server/routers.ts` for tRPC procedures
- **Component Library:** Check `client/src/components/` for reusable UI

## Version History

- **v1.0.0** (Current): Initial launch with full feature set
  - Dark mode luxury aesthetic
  - GHL API integration
  - Lead capture form
  - Framer Motion animations
  - Responsive design

---

**Last Updated:** March 20, 2026
**Checkpoint Version:** 69e88611
