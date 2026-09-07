/**
 * Single source of truth for per-route page metadata.
 *
 * Consumed by:
 *   - scripts/prerender-routes.mjs  → writes a real index.html per route into the
 *     build output so GitHub Pages serves HTTP 200 instead of falling back to
 *     404.html (which returns a 404 status and blocks indexing).
 *   - scripts/generate-bot-html.mjs → static HTML served to AI crawlers at /bot/*.
 *
 * The React page components under client/src/pages/ set the same title,
 * description, and JSON-LD client-side in a useEffect. Keep the values here in
 * sync with those components; this file is what crawlers read before any JS runs.
 */

const ORG = 'https://www.dipriva.com/#organization';

/** Routes with full metadata, pre-rendered with baked-in head tags. */
export const ROUTE_META = {
  '/services/startup-operations': {
    title: 'Startup Operations Consulting | Dipriva Consulting Group',
    description:
      'Dipriva helps founders of 10-50 person professional services firms in West Michigan build the operational structure to step back from day-to-day execution. Bilingual delivery in English and Spanish.',
    canonical: 'https://www.dipriva.com/services/startup-operations',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.dipriva.com/services/startup-operations#service',
      name: 'Startup Operations Consulting',
      description:
        'Operational structure and 90-day roadmap for founders of 10-50 person professional services firms in West Michigan.',
      provider: { '@id': ORG },
      areaServed: { '@type': 'State', name: 'Michigan' },
      availableLanguage: ['English', 'Spanish'],
      serviceType: 'Business Operations Consulting',
    },
  },

  '/services/corporate-strategy': {
    title: 'Corporate Strategy Consulting | Dipriva Consulting Group',
    description:
      'Dipriva architects structured execution plans for business owners and executives navigating growth, transition, or competitive pressure in West Michigan. Bilingual delivery in English and Spanish.',
    canonical: 'https://www.dipriva.com/services/corporate-strategy',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.dipriva.com/services/corporate-strategy#service',
      name: 'Corporate Strategy Consulting',
      description:
        'Strategic decision architecture, competitive positioning, operational due diligence, and 90-day execution roadmaps for West Michigan business owners and executives.',
      provider: { '@id': ORG },
      areaServed: { '@type': 'State', name: 'Michigan' },
      availableLanguage: ['English', 'Spanish'],
      serviceType: 'Business Strategy Consulting',
    },
  },

  '/services/ai-automation': {
    title: 'AI and Automation Consulting | Dipriva Consulting Group',
    description:
      'Dipriva identifies high-friction workflows and deploys AI and automation to eliminate operational drag for West Michigan business owners. Bilingual delivery in English and Spanish.',
    canonical: 'https://www.dipriva.com/services/ai-automation',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.dipriva.com/services/ai-automation#service',
      name: 'AI and Automation Consulting',
      description:
        'Workflow audit and AI and automation implementation to eliminate operational drag for West Michigan business owners and executives.',
      provider: { '@id': ORG },
      areaServed: { '@type': 'State', name: 'Michigan' },
      availableLanguage: ['English', 'Spanish'],
      serviceType: 'AI and Automation Consulting',
    },
  },

  '/about/manuel-dipres': {
    title: 'Manuel Diprés | Founder, Dipriva Consulting Group',
    description:
      'Manuel Diprés is the Founder of Dipriva Consulting Group, bringing over 20 years of experience building revenue operations and go-to-market systems for businesses in the Americas and Europe. Bilingual in English and Spanish.',
    canonical: 'https://www.dipriva.com/about/manuel-dipres',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.dipriva.com/#founder',
      name: 'Manuel Diprés',
      jobTitle: 'Founder',
      worksFor: { '@id': ORG },
      knowsLanguage: ['English', 'Spanish'],
      description:
        'Founder of Dipriva Consulting Group with over 20 years of experience in revenue operations, sales enablement, and go-to-market systems across the Americas and Europe.',
      sameAs: ['https://www.linkedin.com/in/manueldipres/'],
      url: 'https://www.dipriva.com/about/manuel-dipres',
    },
  },

  '/industries/west-michigan': {
    title: 'West Michigan Business Consulting | Dipriva Consulting Group',
    description:
      'Dipriva helps West Michigan business owners build the operational and sales systems to close deals consistently. Most are experts at their craft. Few have the infrastructure to sell it. Bilingual delivery in English and Spanish.',
    canonical: 'https://www.dipriva.com/industries/west-michigan',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.dipriva.com/industries/west-michigan#service',
      name: 'West Michigan Business Consulting',
      description:
        'Operational and sales infrastructure for West Michigan business owners who are experts at delivery but need a repeatable system to close new clients consistently.',
      provider: { '@id': ORG },
      areaServed: [
        { '@type': 'City', name: 'Grand Rapids' },
        { '@type': 'State', name: 'Michigan' },
      ],
      availableLanguage: ['English', 'Spanish'],
      serviceType: 'Business Operations Consulting',
    },
  },

  '/blog': {
    title: 'Dipriva Insights | Strategy. Capital. Growth.',
    description:
      'Perspectives on the decisions that compound — for founders and operators building businesses that last.',
    canonical: 'https://www.dipriva.com/blog',
    jsonLd: null, // Blog index JSON-LD is composed from posts at build time.
  },

  '/privacy': {
    title: 'Privacy Policy | Dipriva Consulting Group',
    description:
      'How Dipriva Consulting Group collects and protects visitor information.',
    canonical: 'https://www.dipriva.com/privacy',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy',
      url: 'https://www.dipriva.com/privacy',
      isPartOf: { '@type': 'WebSite', url: 'https://www.dipriva.com' },
    },
  },

  '/schedule': {
    title: 'Schedule a Strategy Session | Dipriva Consulting Group',
    description:
      'Tell us about your business needs and we will be in touch. Bilingual consulting in English and Spanish for West Michigan business owners and executives.',
    canonical: 'https://www.dipriva.com/schedule',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Schedule a Strategy Session',
      url: 'https://www.dipriva.com/schedule',
      isPartOf: { '@type': 'WebSite', url: 'https://www.dipriva.com' },
    },
  },
};

/**
 * Routes that must exist as real files so GitHub Pages returns 200, but that
 * keep the shell's default head tags. `/` is emitted by Vite itself.
 * `/client_form` gets its own noindex variant in the deploy workflow.
 */
export const PASSTHROUGH_ROUTES = ['/404'];
