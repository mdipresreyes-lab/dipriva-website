import type { Lang } from './copy';

export const SITE_URL = 'https://www.dipriva.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const IS_PRODUCTION = import.meta.env.PUBLIC_IS_PRODUCTION === true;

export const CONTACT_EMAIL = 'manuel@dipriva.com';
/** Microsoft Bookings, 30-minute strategy session. Same link dipriva-growth outreach emails use (config/outreach.yaml). */
export const BOOKING_URL =
  'https://bookings.cloud.microsoft/bookwithme/user/df9f836ac682468ab12b1891f552c6d6@dipriva.com/meetingtype/6UWVEWsqzk-ufJSvC0xFfA2?anonymous&ismsaljsauthenabled&ep=mlink';
/** The one LinkedIn company URL: footer, company page and Organization sameAs all read this constant. */
export const LINKEDIN_COMPANY = 'https://www.linkedin.com/company/112996520';
export const LINKEDIN_FOUNDER = 'https://www.linkedin.com/in/manueldipres/';

export const homePath = (lang: Lang) => (lang === 'es' ? '/es/' : '/');

/**
 * Fixed URLs. The English paths are printed in downloads and social posts and
 * reviewed by LinkedIn and Meta, so they never change. Spanish pages use
 * Spanish slugs under /es/.
 */
export const paths = {
  schedule: { en: '/schedule/', es: '/es/agendar/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
  about: { en: '/about/', es: '/es/nosotros/' },
  founder: { en: '/about/manuel-dipres/', es: '/es/nosotros/manuel-dipres/' },
  clientForm: { en: '/client_form/', es: '/es/formulario-de-cliente/' },
  blog: { en: '/blog/', es: '/es/blog/' },
} as const;

export const schedulePath = (lang: Lang = 'en') => paths.schedule[lang];

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

/** Confirmed by Manuel 2026-10-13. Must match the Google Business Profile word for word. */
export const ADDRESS = {
  /** Full street line, exactly as on the Google Business Profile (structured data). */
  street: '2435 Eastern Ave SE Suite 202',
  /** The same address split for display: building, then suite. */
  line1: '2435 Eastern Ave SE',
  line2: 'Suite 202',
  city: 'Grand Rapids',
  region: 'MI',
  postalCode: '49507',
  country: 'US',
} as const;
export const FOUNDING_YEAR = '2019';
/** Registered company that operates the Dipriva Consulting Group brand. Shown in the footer and the privacy policy. */
export const LEGAL_NAME = 'Dipriva LLC';
/** Google Business Profile as a Maps link (built from its CID; both forms resolve). */
export const GBP_URL = 'https://www.google.com/maps?cid=1081221801602927364';
export const INSTAGRAM_URL = 'https://www.instagram.com/dipriva_consulting_group/';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61595351429088';

/** Names people search for. They belong in structured data, never in hidden page text. */
export const ALTERNATE_NAMES = ['Dipriva', 'Dipriva Consulting'];

/**
 * The organization, website and founder entities shared by every page.
 *
 * Left out on purpose: telephone. Manuel has no public number to share (2026-10-13).
 */
export function coreGraph() {
  return [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'Dipriva Consulting Group',
      alternateName: ALTERNATE_NAMES,
      legalName: LEGAL_NAME,
      foundingDate: FOUNDING_YEAR,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.region,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.country,
      },
      url: `${SITE_URL}/`,
      logo: absolute('/apple-touch-icon.png'),
      image: absolute('/og-image.png'),
      description:
        'Bilingual consulting in corporate strategy, startup operations and AI automation for companies with 10 to 500 employees.',
      founder: { '@id': FOUNDER_ID },
      areaServed: { '@type': 'Country', name: 'United States' },
      knowsLanguage: ['en', 'es'],
      knowsAbout: ['Corporate Strategy', 'Startup Operations', 'AI and Automation', 'Business Process Automation'],
      sameAs: [LINKEDIN_COMPANY, INSTAGRAM_URL, FACEBOOK_URL, GBP_URL],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        availableLanguage: ['English', 'Spanish'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'Dipriva Consulting Group',
      alternateName: ALTERNATE_NAMES,
      inLanguage: ['en', 'es'],
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Manuel Diprés',
      jobTitle: 'Founder',
      worksFor: { '@id': ORG_ID },
      knowsLanguage: ['en', 'es'],
      url: absolute('/about/manuel-dipres/'),
      sameAs: [LINKEDIN_FOUNDER],
    },
  ];
}

export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function formatDate(date: Date | null, lang: Lang = 'en') {
  if (!date) return null;
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-US' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 230));
