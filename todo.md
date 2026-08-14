# Dipriva Landing Page - Project TODO

## Phase 1: Project Setup & Configuration
- [x] Configure Tailwind CSS 4 with dark mode and custom color palette
- [x] Set up Playfair Display and system fonts via Google Fonts
- [x] Configure Framer Motion for scroll-triggered animations
- [x] Set up environment variables for GHL API and Supabase

## Phase 2: Design System & Global Styles
- [x] Create global dark mode styles with obsidian background (#0A0A0A)
- [x] Define typography scale with Playfair Display (0.13em letter-spacing)
- [x] Set up spacing system with 160px section padding (desktop)
- [x] Create reusable component variants for glassmorphism effects

## Phase 3: Generate Visual Assets
- [x] Generate obsidian and silver 3D abstract textures for hero section
- [x] Generate additional textures for negative space sections
- [x] Upload textures to CDN using manus-upload-file

## Phase 4: Build Page Sections
- [x] Hero section with video background, headline, and CTA button
- [x] Services Bento Grid with three cards (glassmorphism, 24px radius)
- [x] About section with brand voice copy
- [x] Lead capture form with progressive single-field-at-a-time UX
- [x] Footer with logo, domain, and LinkedIn link

## Phase 5: Animations & Interactions
- [x] Implement Intersection Observer for scroll-triggered animations
- [x] Add card lift (translateY -6px) and glow effects on scroll entry
- [x] Ensure animations fire on scroll only, not on page load
- [x] Test animation performance and smoothness

## Phase 6: Form & API Integration
- [x] Build form validation with Zod
- [x] Implement GHL API POST to v2/contacts with exact payload structure
- [x] Add Supabase backup layer for form submissions
- [x] Implement dual submission logic (GHL primary, Supabase fallback)
- [x] Add error handling and user-friendly error messages

## Phase 7: Testing & Validation
- [x] Test all page sections render correctly
- [x] Verify Playfair Display rendering and letter-spacing
- [x] Confirm section padding at 160px desktop minimum
- [x] Test Bento Grid visibility (max 2 cards in initial viewport)
- [x] Validate scroll animations fire correctly
- [x] Test form submission to GHL and Supabase
- [x] Test mobile responsiveness (375px minimum width)
- [x] Verify hero video muted and autoplaying
- [x] Test error handling and edge cases

## Phase 8: Luxury Refinement Protocol
- [x] Audit all copy and remove 30% of non-essential text
- [x] Verify double padding on all section containers
- [x] Enforce viewport card limit (max 2 visible)
- [x] Increase letter-spacing by 0.05em on headings
- [x] Confirm line-height 1.6 for body text
- [x] Remove decorative elements that don't serve conversion

## Phase 9: Deployment & Documentation
- [x] Create .env.local template with all required variables
- [x] Document GHL API integration and error handling
- [x] Document Supabase setup instructions
- [x] Prepare Vercel deployment configuration
- [x] Deploy to Vercel and provide live URL

## Completed Items
(None yet)

## Phase 10: Final Refinements
- [x] Add responsive hamburger menu for mobile/landscape views
- [x] Change default language from Spanish to English (visitors can toggle to ES)

## Phase 11: Analytics & Tracking
- [x] Add Google Analytics (GA4) tracking code to index.html (ID: G-GBW7DQ6T7V)
- [x] Add Analytics section to Privacy page (EN and ES) with working URLs for Google Analytics opt-out and NAI opt-out tools

## Phase 12: GDPR Cookie Consent Compliance
- [x] Remove GA4 script from index.html (move to consent-based loading)
- [x] Update CookieConsentBanner to properly load GA4 only after consent
- [x] Ensure analytics scripts are blocked until user accepts
- [x] Test form submission still reaches GHL after changes (GHL integration unaffected)
- [x] Verify cookie consent persists across page reloads

## Phase 13: Microsoft Clarity Integration
- [x] Install @microsoft/clarity npm package
- [x] Initialize Clarity in CookieConsentBanner after consent is granted
- [x] Add Clarity consent configuration (ad_Storage and analytics_Storage)
- [x] Add CTA click event tracking to Schedule Your Session button (CTASection)
- [x] Add CTA click event tracking to Schedule Your Session button (LeadCaptureForm submit)
- [x] Test Clarity initialization and event tracking

## Phase 14: Privacy Policy & Form Consent
- [x] Add Analytics section to translations.ts (EN and ES)
- [x] Render Analytics section on Privacy.tsx between Data Protection and Data Deletion
- [x] Add complete consent section to form translations (EN and ES)
- [x] Add required consent checkbox to LeadCaptureForm
- [x] Implement consent validation - form cannot submit without checkbox
- [x] Add Privacy Policy link to consent checkbox label (/privacy)
- [x] Test consent checkbox functionality and validation
- [x] Update checkbox text to remove manuel@dipriva.com reference (EN and ES)

## Phase 15: GHL Chat Widget Integration
- [x] Add GHL chat widget script to client/index.html
- [x] Configure widget to load on all pages
- [x] Verify widget appears in bottom-right corner
- [x] Test widget functionality across different pages

## Phase 16: CTA and Consent Updates
- [x] Delete "Schedule Strategy Session" button from home page header
- [x] Change "Schedule Your Session" to "Let's Learn About Your Needs" (EN) and "Dinos de Tu Necesidad" (ES) in contact section
- [x] Update consent checkbox to include SMS communications (EN and ES)

## Phase 17: Button Styling and Text Updates
- [x] Style CTA button to look like a traditional link (text color with hover effects)
- [x] Change Spanish CTA button text to "Dinos de Tus Necesidades" (plural)

## Phase 18: Visual Redesign (Premium Experience)
- [x] Fix Tailwind 4 CSS compilation (restore @import "tailwindcss" directive)
- [x] Apply Dipriva brand colors to CSS variables (#2F4059 + #F5F5DC)
- [x] Add Playfair Display font via @theme inline block
- [x] Redesign HeroSection with asymmetric grid layout and stats card
- [x] Redesign ServicesSection with sophisticated card styling
- [x] Redesign AboutSection with enhanced typography and metrics grid
- [x] Redesign CTASection with benefits card and timeline
- [x] Verify GHL integration untouched
- [x] Verify responsive design across devices

## Phase 19: OG Image & Favicon Rebrand
- [x] Generate new on-brand OG image (beige bg, charcoal text, Playfair Display typography)
- [x] Generate new on-brand favicon (D monogram, charcoal bg, beige letter)
- [x] Update index.html meta tags with new OG image URL
- [x] Update favicon and apple-touch-icon references
- [x] Update Twitter card image references

## Phase 20: Homepage Fixes
- [x] Make Dipriva logo a live link that returns visitors to top of homepage
- [x] Change "500+ Executives Served" to "150+" in hero section and about section
- [x] Replace "Learn More" buttons in Services cards with live link to Contact page: "Contact us to learn what this means for your business"

## Phase 21: GHL CRM Removal & MS Forms Migration

- [x] Replace custom LeadCaptureForm on /schedule with MS Forms iframe (JSX-safe)
- [x] Add Lead Capture consent text below iframe (EN/ES bilingual)
- [x] Create /client_form page with branded wrapper and Client Intake MS Form iframe
- [x] Add Client Intake consent text below iframe (EN/ES bilingual)
- [x] Add noindex meta tag to /client_form (not in nav, not in sitemap)
- [x] Register /client_form route in App.tsx
- [x] Remove GHL API call (POST to leadconnectorhq.com) from server/routers.ts
- [x] Remove leads.submit tRPC procedure entirely
- [x] Remove GHL_PIT_TOKEN from env schema and secrets
- [x] Delete LeadCaptureForm.tsx component file
- [x] Delete old form translations from translations.ts
- [x] Grep broadly for leads. references and remove all callers/dependencies
- [x] Rewrite Privacy Policy page with new EN/ES copy (all sections updated)
- [x] Ensure all Privacy Policy URLs are clickable links
- [x] Keep GHL chat widget untouched (widget ID 67fda9c8047126869aaaac64)
- [x] Verify build compiles with zero errors
- [x] Run tests and confirm no regressions

## Phase 22: GitHub Source Export

- [x] Export the complete Dipriva website codebase and project documentation to GitHub
