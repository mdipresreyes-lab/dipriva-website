/**
 * Company page (/about/ and /es/nosotros/), English and Spanish. It names the firm for
 * branded search ("Dipriva", "Dipriva Consulting", "Dipriva Consulting Group") and says who it is,
 * what it does, who it is for, where it is based and in which languages.
 *
 * Every fact here already appears elsewhere on the site (home page, service pages, founder
 * page, llms.txt). Not stated, on purpose, until Manuel confirms them: legal name, street
 * address, phone number and founding date. Client results come from copy.ts as approved.
 * Spanish uses formal "usted". No em dashes.
 */
import type { Lang } from './copy';

export const AKA = ['Dipriva', 'Dipriva Consulting'] as const;

export const company = {
  en: {
    meta: {
      title: 'About Dipriva Consulting Group | Bilingual Consulting',
      description:
        'Dipriva Consulting Group is a founder-led, bilingual consulting firm in West Michigan for companies with 10 to 500 employees across the United States.',
    },
    crumbs: { home: 'Home', about: 'About' },
    eyebrow: 'Company',
    h1: 'Dipriva Consulting Group engineers operational clarity for companies outgrowing their systems.',
    sub: 'A founder-led, bilingual consulting firm in corporate strategy, startup operations and AI automation.',
    inShortLabel: 'In short',
    inShort:
      'Dipriva Consulting Group, also known as Dipriva or Dipriva Consulting, is a founder-led, bilingual consulting firm based in West Michigan. It serves companies with 10 to 500 employees across the United States and its territories in corporate strategy, startup operations and AI automation, delivered in English and Spanish and built around a 90-day execution roadmap. Manuel Diprés founded the firm after more than 20 years building revenue operations and go-to-market systems.',
    who: {
      label: 'Who we are',
      h2: 'Founder-led. Manuel reads every request himself.',
      body: [
        'Dipriva is founder-led. Manuel Diprés built it after more than 20 years building revenue operations and go-to-market systems for businesses in the Americas and Europe.',
        'He works in English and Spanish, and he reads every request himself. Every engagement starts with a free 30-minute strategy session, and you receive a written scope and price before any work begins.',
      ],
      cta: 'Read Manuel’s background',
    },
    what: {
      label: 'What we do',
      h2: 'Three service lines, one 90-day execution roadmap.',
      body: 'Every engagement is built around a 90-day execution roadmap with an owner and a date on every item. The work falls into three service lines.',
      explore: 'Explore',
    },
    forWhom: {
      label: 'Who we work with',
      h2: 'Companies with 10 to 500 employees growing faster than their systems.',
      body: 'Dipriva works with owners and executives of companies with 10 to 500 employees. Larger companies are welcome.',
      items: [
        'Owners and executives of companies with 10 to 500 employees facing a growth inflection',
        'Founders of service businesses with 10 to 500 employees',
        'Owners whose teams spend significant time on manual, repeatable tasks',
        'Leadership teams where strategy exists on paper but has not become disciplined execution',
      ],
    },
    where: {
      label: 'Where and in which language',
      h2: 'Based in West Michigan. Working across the United States and its territories, in English and Spanish.',
      cards: [
        {
          title: 'Where',
          body: 'Dipriva is based in West Michigan and works with companies across the United States and its territories.',
          link: { label: 'West Michigan business consulting' },
        },
        {
          title: 'Languages',
          body: 'Dipriva delivers consulting in English and Spanish, and every free tool on this site is available in both languages.',
          link: null,
        },
      ],
    },
    results: { label: 'Client results' },
    standardsLabel: 'Our standard',
    facts: {
      label: 'Company facts',
      rows: [
        { term: 'Name', value: 'Dipriva Consulting Group' },
        { term: 'Also known as', value: 'Dipriva, Dipriva Consulting' },
        { term: 'Founder', value: 'Manuel Diprés' },
        { term: 'Based in', value: 'West Michigan' },
        { term: 'Serves', value: 'Companies with 10 to 500 employees across the United States and its territories' },
        { term: 'Languages', value: 'English and Spanish' },
        { term: 'Services', value: 'Corporate strategy, startup operations, AI and automation' },
      ],
    },
    faq: {
      label: 'Questions',
      h2: 'What owners ask about Dipriva.',
      items: [
        {
          q: 'What is Dipriva Consulting Group?',
          a: 'Dipriva Consulting Group, also known as Dipriva or Dipriva Consulting, is a founder-led, bilingual consulting firm that delivers corporate strategy, startup operations and AI automation to companies with 10 to 500 employees, built around a 90-day execution roadmap.',
        },
        {
          q: 'Who does Dipriva work with?',
          a: 'Owners and executives of companies with 10 to 500 employees that are growing faster than their systems. Larger companies are welcome. Our published client results come from an insurance agency, a roofing company and a tax agency.',
        },
        {
          q: 'Where is Dipriva based?',
          a: 'Dipriva is based in West Michigan and works with companies across the United States and its territories.',
        },
        {
          q: 'Does Dipriva work in Spanish?',
          a: 'Yes. Manuel works with clients in English and Spanish, and every free tool on this site is available in both languages.',
        },
        {
          q: 'How does an engagement start?',
          a: 'With a free 30-minute strategy session. If there is a fit, you receive a written scope and price before work begins.',
        },
      ],
    },
    cta: {
      h2: 'Start with a conversation.',
      body: 'Schedule a free 30-minute strategy session. We will name the first constraint to remove.',
      button: 'Schedule a Strategy Session',
      email: 'Or write to',
    },
  },
  es: {
    meta: {
      title: 'Sobre Dipriva Consulting Group | Consultoría bilingüe',
      description:
        'Dipriva Consulting Group es una firma de consultoría bilingüe dirigida por su fundador, con sede en West Michigan, para empresas de 10 a 500 empleados en EE. UU.',
    },
    crumbs: { home: 'Inicio', about: 'Nosotros' },
    eyebrow: 'Empresa',
    h1: 'Dipriva Consulting Group diseña claridad operacional para empresas que crecen más rápido que sus sistemas.',
    sub: 'Una firma de consultoría bilingüe, dirigida por su fundador, en estrategia corporativa, operaciones de startups y automatización con IA.',
    inShortLabel: 'En resumen',
    inShort:
      'Dipriva Consulting Group, también conocida como Dipriva o Dipriva Consulting, es una firma de consultoría bilingüe, dirigida por su fundador, con sede en West Michigan. Atiende a empresas de 10 a 500 empleados en todo Estados Unidos y sus territorios en estrategia corporativa, operaciones de startups y automatización con IA, en inglés y en español, y organizada en torno a una hoja de ruta de ejecución de 90 días. Manuel Diprés fundó la firma después de más de 20 años construyendo operaciones de ingresos y sistemas comerciales.',
    who: {
      label: 'Quiénes somos',
      h2: 'Dirigida por su fundador. Manuel lee cada solicitud personalmente.',
      body: [
        'Dipriva está dirigida por su fundador. Manuel Diprés la creó después de más de 20 años construyendo operaciones de ingresos y sistemas comerciales para empresas de las Américas y Europa.',
        'Trabaja en inglés y en español, y lee personalmente cada solicitud. Cada proyecto empieza con una sesión estratégica gratuita de 30 minutos, y usted recibe un alcance y un precio por escrito antes de iniciar cualquier trabajo.',
      ],
      cta: 'Conozca la trayectoria de Manuel',
    },
    what: {
      label: 'Qué hacemos',
      h2: 'Tres líneas de servicio, una hoja de ruta de ejecución de 90 días.',
      body: 'Cada proyecto se organiza en una hoja de ruta de ejecución de 90 días con un responsable y una fecha en cada punto. El trabajo se divide en tres líneas de servicio.',
      explore: 'Ver',
    },
    forWhom: {
      label: 'Con quién trabajamos',
      h2: 'Empresas de 10 a 500 empleados que crecen más rápido que sus sistemas.',
      body: 'Dipriva trabaja con dueños y directivos de empresas de 10 a 500 empleados. Las empresas más grandes son bienvenidas.',
      items: [
        'Dueños y directivos de empresas de 10 a 500 empleados ante un punto de inflexión en su crecimiento',
        'Fundadores de empresas de servicios de 10 a 500 empleados',
        'Dueños cuyos equipos dedican mucho tiempo a tareas manuales y repetibles',
        'Equipos directivos con una estrategia en papel que todavía no se convierte en ejecución disciplinada',
      ],
    },
    where: {
      label: 'Dónde y en qué idioma',
      h2: 'Con sede en West Michigan. Trabajamos en todo Estados Unidos y sus territorios, en inglés y en español.',
      cards: [
        {
          title: 'Dónde',
          body: 'Dipriva tiene su sede en West Michigan y trabaja con empresas en todo Estados Unidos y sus territorios.',
          link: { label: 'Consultoría empresarial en West Michigan' },
        },
        {
          title: 'Idiomas',
          body: 'Dipriva presta servicios de consultoría en inglés y en español, y todas las herramientas gratuitas de este sitio están disponibles en ambos idiomas.',
          link: null,
        },
      ],
    },
    results: { label: 'Resultados con clientes' },
    standardsLabel: 'Nuestro estándar',
    facts: {
      label: 'Datos de la empresa',
      rows: [
        { term: 'Nombre', value: 'Dipriva Consulting Group' },
        { term: 'También conocida como', value: 'Dipriva, Dipriva Consulting' },
        { term: 'Fundador', value: 'Manuel Diprés' },
        { term: 'Sede', value: 'West Michigan' },
        { term: 'Atiende a', value: 'Empresas de 10 a 500 empleados en todo Estados Unidos y sus territorios' },
        { term: 'Idiomas', value: 'Inglés y español' },
        { term: 'Servicios', value: 'Estrategia corporativa, operaciones de startups, IA y automatización' },
      ],
    },
    faq: {
      label: 'Preguntas',
      h2: 'Lo que los dueños preguntan sobre Dipriva.',
      items: [
        {
          q: '¿Qué es Dipriva Consulting Group?',
          a: 'Dipriva Consulting Group, también conocida como Dipriva o Dipriva Consulting, es una firma de consultoría bilingüe, dirigida por su fundador, que ofrece estrategia corporativa, operaciones de startups y automatización con IA a empresas de 10 a 500 empleados, organizada en torno a una hoja de ruta de ejecución de 90 días.',
        },
        {
          q: '¿Con quién trabaja Dipriva?',
          a: 'Con dueños y directivos de empresas de 10 a 500 empleados que crecen más rápido que sus sistemas. Las empresas más grandes son bienvenidas. Nuestros resultados publicados provienen de una agencia de seguros, una empresa de techado y una agencia de impuestos.',
        },
        {
          q: '¿Dónde tiene su sede Dipriva?',
          a: 'Dipriva tiene su sede en West Michigan y trabaja con empresas en todo Estados Unidos y sus territorios.',
        },
        {
          q: '¿Dipriva trabaja en español?',
          a: 'Sí. Manuel trabaja con clientes en inglés y en español, y todas las herramientas gratuitas de este sitio están disponibles en ambos idiomas.',
        },
        {
          q: '¿Cómo empieza un proyecto?',
          a: 'Con una sesión estratégica gratuita de 30 minutos. Si hay afinidad, recibe un alcance y un precio por escrito antes de iniciar el trabajo.',
        },
      ],
    },
    cta: {
      h2: 'Empiece con una conversación.',
      body: 'Agende una sesión estratégica gratuita de 30 minutos. Nombraremos la primera restricción que hay que eliminar.',
      button: 'Agende una sesión estratégica',
      email: 'O escriba a',
    },
  },
} satisfies Record<Lang, unknown>;
