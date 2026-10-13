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

/** Names people search for. They belong in structured data, never in hidden page text. */
export const ALTERNATE_NAMES = ['Dipriva', 'Dipriva Consulting'];

/**
 * The organization, website and founder entities shared by every page.
 *
 * Left out on purpose until Manuel confirms them (docs/HANDOFF.md, M6): legalName, address,
 * telephone, foundingDate, and sameAs entries for the Facebook Page, the Instagram profile
 * (@dipriva_consulting_group) and the Google Business Profile. Do not guess them.
 */
export function coreGraph() {
  return [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'Dipriva Consulting Group',
      alternateName: ALTERNATE_NAMES,
      url: `${SITE_URL}/`,
      logo: absolute('/apple-touch-icon.png'),
      image: absolute('/og-image.png'),
      description:
        'Bilingual consulting in corporate strategy, startup operations and AI automation for companies with 10 to 500 employees.',
      founder: { '@id': FOUNDER_ID },
      areaServed: { '@type': 'Country', name: 'United States' },
      knowsLanguage: ['en', 'es'],
      knowsAbout: ['Corporate Strategy', 'Startup Operations', 'AI and Automation', 'Business Process Automation'],
      sameAs: [LINKEDIN_COMPANY],
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
