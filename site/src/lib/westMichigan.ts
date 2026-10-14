/**
 * West Michigan page, English and Spanish. Ported from the live page
 * (client/src/pages/IndustriesWestMichigan.tsx) and restructured to match the
 * service pages: answer-first summary, problem, services, fit, results, tools, FAQ, CTA.
 *
 * Rules this page keeps:
 * - The three client results come from copy.ts as approved. They carry no location, so
 *   this page never calls them West Michigan clients (the live page did; that framing is dropped).
 * - No address, phone number or coordinates. Dipriva states only that it is based in
 *   West Michigan, which the home page, founder page and llms.txt already say.
 * - FAQ answers reuse facts already published on the site.
 * Spanish uses formal "usted". No em dashes.
 */
import type { Lang } from './copy';

export const westMichiganPath = (lang: Lang) =>
  lang === 'es' ? '/es/industrias/oeste-de-michigan/' : '/industries/west-michigan/';

type Localized = {
  meta: { title: string; description: string };
  crumb: string;
  home: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** Answer-first summary: three self-contained, quotable sentences. */
  summary: string;
  inShort: string;
  problem: { label: string; h2: string; body: string };
  services: { label: string; h2: string; body: string; explore: string };
  fit: { label: string; h2: string; items: string[] };
  proof: { label: string; h2: string; note: string };
  tools: { label: string; h2: string; body: string; get: string };
  faq: { label: string; h2: string; items: { q: string; a: string }[] };
  cta: { h2: string; body: string; button: string };
};

export const westMichigan: Record<Lang, Localized> = {
  en: {
    meta: {
      title: 'West Michigan Business Consulting | Dipriva Consulting Group',
      description:
        'Dipriva is based in West Michigan and builds sales and operating systems for companies with 10 to 500 employees, in English and Spanish.',
    },
    crumb: 'West Michigan',
    home: 'Home',
    eyebrow: 'West Michigan',
    h1: 'West Michigan business consulting: build the system that sells your work.',
    sub: 'You are excellent at what you do. Dipriva builds the sales and operating system that turns that skill into a steady stream of new clients.',
    inShort: 'In short',
    summary:
      'Dipriva Consulting Group is based in West Michigan and serves companies with 10 to 500 employees there and across the United States and its territories, in English and Spanish. It builds the sales and operating systems that turn strong delivery into consistent new business: corporate strategy, startup operations and AI automation, tied together by one 90-day execution roadmap. Every engagement starts with a free 30-minute strategy session.',
    problem: {
      label: 'The problem',
      h2: 'Excellent operators, no system that sells their work',
      body: 'West Michigan has exceptional operators: builders, service providers and specialists who are deeply skilled at delivering for their clients. What many owners lack is a repeatable system for winning new ones. The pipeline is inconsistent. Follow-up falls through. Proposals go out and disappear. The problem is not the expertise. It is the absence of an operating system that sells it.',
    },
    services: {
      label: 'What Dipriva builds',
      h2: 'Three service lines, one 90-day execution roadmap.',
      body: 'Dipriva closes the gap between delivery excellence and sales consistency. We find where deals stall, then build the structure that turns expertise into a repeatable close, with an owner and a date on every step.',
      explore: 'Explore',
    },
    fit: {
      label: 'Who it is for',
      h2: 'Owners who win on skill and want to win on a system.',
      items: [
        'Owners of companies with 10 to 500 employees who win on referrals but cannot scale beyond them',
        'Founders whose close rate depends on their personal involvement in every deal',
        'Service businesses where proposals go out but follow-up is inconsistent or absent',
        'Growing companies where the owner is both the best salesperson and the main delivery resource',
      ],
    },
    proof: {
      label: 'Client results',
      h2: 'Results from client work.',
      note: 'These results come from client engagements and are not tied to a location. Your results depend on your starting point.',
    },
    tools: {
      label: 'Free tools',
      h2: 'Start with a free tool, in English or Spanish.',
      body: 'Each tool is the first step of the consulting work in its area. No call is needed to get one.',
      get: 'Get the tool',
    },
    faq: {
      label: 'Questions',
      h2: 'Questions owners here ask first.',
      items: [
        {
          q: 'Is Dipriva a West Michigan consulting firm?',
          a: 'Yes. Dipriva is based in West Michigan and works with companies of 10 to 500 employees across the United States and its territories. Larger companies are welcome.',
        },
        {
          q: 'Do you only work with West Michigan companies?',
          a: 'No. Dipriva is based in West Michigan and works with companies across the United States and its territories, in English or Spanish.',
        },
        {
          q: 'Do you work with West Michigan businesses in Spanish?',
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
    },
  },
  es: {
    meta: {
      title: 'Consultoría empresarial en West Michigan | Dipriva Consulting Group',
      description:
        'Dipriva tiene su sede en West Michigan y construye sistemas comerciales y operativos para empresas de 10 a 500 empleados, en inglés y en español.',
    },
    crumb: 'West Michigan',
    home: 'Inicio',
    eyebrow: 'West Michigan',
    h1: 'Consultoría empresarial en West Michigan: construya el sistema que vende su trabajo.',
    sub: 'Usted es excelente en lo que hace. Dipriva construye el sistema comercial y operativo que convierte esa habilidad en un flujo constante de clientes nuevos.',
    inShort: 'En resumen',
    summary:
      'Dipriva Consulting Group tiene su sede en West Michigan y atiende a empresas de 10 a 500 empleados en esa región y en todo Estados Unidos y sus territorios, en inglés y en español. Construye los sistemas comerciales y operativos que convierten una buena ejecución en clientes nuevos de forma constante: estrategia corporativa, operaciones de startups y automatización con IA, unidas por una hoja de ruta de ejecución de 90 días. Cada proyecto comienza con una sesión estratégica gratuita de 30 minutos.',
    problem: {
      label: 'El problema',
      h2: 'Operadores excelentes, sin un sistema que venda su trabajo',
      body: 'West Michigan tiene operadores excepcionales: constructores, prestadores de servicios y especialistas con gran habilidad para cumplirles a sus clientes. A muchos dueños les falta un sistema repetible para conseguir clientes nuevos. El flujo de prospectos es irregular. El seguimiento se pierde. Las propuestas salen y desaparecen. El problema no es la experiencia. Es la ausencia de un sistema operativo que la venda.',
    },
    services: {
      label: 'Qué construye Dipriva',
      h2: 'Tres líneas de servicio, una hoja de ruta de ejecución de 90 días.',
      body: 'Dipriva cierra la brecha entre la excelencia en la entrega y la constancia en las ventas. Identificamos dónde se estancan los negocios y construimos la estructura que convierte la experiencia en un cierre repetible, con un responsable y una fecha en cada paso.',
      explore: 'Ver',
    },
    fit: {
      label: 'Para quién es',
      h2: 'Dueños que ganan por su habilidad y quieren ganar con un sistema.',
      items: [
        'Dueños de empresas de 10 a 500 empleados que ganan clientes por recomendación, pero no pueden crecer más allá de ellas',
        'Fundadores cuya tasa de cierre depende de su participación personal en cada negocio',
        'Empresas de servicios donde las propuestas salen, pero el seguimiento es irregular o inexistente',
        'Empresas en crecimiento donde el dueño es a la vez el mejor vendedor y el principal recurso de entrega',
      ],
    },
    proof: {
      label: 'Resultados con clientes',
      h2: 'Resultados del trabajo con clientes.',
      note: 'Estos resultados provienen de proyectos con clientes y no están ligados a una ubicación. Sus resultados dependen de su punto de partida.',
    },
    tools: {
      label: 'Herramientas gratuitas',
      h2: 'Empiece con una herramienta gratuita, en inglés o en español.',
      body: 'Cada herramienta es el primer paso de la consultoría en su área. No necesita una llamada para recibirla.',
      get: 'Reciba la herramienta',
    },
    faq: {
      label: 'Preguntas',
      h2: 'Las preguntas que los dueños de la región hacen primero.',
      items: [
        {
          q: '¿Dipriva es una firma de consultoría de West Michigan?',
          a: 'Sí. Dipriva tiene su sede en West Michigan y trabaja con empresas de 10 a 500 empleados en todo Estados Unidos y sus territorios. Las empresas más grandes son bienvenidas.',
        },
        {
          q: '¿Solo trabajan con empresas de West Michigan?',
          a: 'No. Dipriva tiene su sede en West Michigan y trabaja con empresas en todo Estados Unidos y sus territorios, en inglés o en español.',
        },
        {
          q: '¿Trabajan en español con negocios de West Michigan?',
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
    },
  },
};
