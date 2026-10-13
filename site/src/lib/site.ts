import type { Lang } from './copy';

export const SITE_URL = 'https://www.dipriva.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const IS_PRODUCTION = import.meta.env.PUBLIC_IS_PRODUCTION === true;

export const CONTACT_EMAIL = 'manuel@dipriva.com';
export const LINKEDIN_COMPANY = 'https://www.linkedin.com/company/112996520';
export const LINKEDIN_FOUNDER = 'https://www.linkedin.com/in/manueldipres/';

export const homePath = (lang: Lang) => (lang === 'es' ? '/es/' : '/');
export const schedulePath = '/schedule/';

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

/** The organization, website and founder entities shared by every page. */
export function coreGraph() {
  return [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: 'Dipriva Consulting Group',
      url: `${SITE_URL}/`,
      logo: absolute('/apple-touch-icon.png'),
      image: absolute('/og-image.png'),
      description:
        'Bilingual consulting in corporate strategy, startup operations and AI automation for companies with 10 to 50 people.',
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
