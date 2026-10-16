/**
 * All homepage, chrome and blog copy, in English and Spanish.
 * Claims rule: the only numbers allowed here are the approved firm figures
 * (90-day execution roadmap, 10 to 500 employee companies, 20+ years of experience,
 * 30-minute strategy session) and the three proof points, worded as approved.
 * Spanish uses formal "usted" throughout. No em dashes anywhere.
 */
export type Lang = 'en' | 'es';

export const copy = {
  en: {
    meta: {
      title: 'Strategy, Operations and AI Automation Consulting | Dipriva',
      description:
        'Dipriva engineers operational clarity for companies with 10 to 500 employees: corporate strategy, startup operations and AI automation, in English and Spanish.',
    },
    banner: 'Design prototype for review. Not the live site.',
    nav: {
      services: 'Services',
      method: 'Method',
      results: 'Results',
      insights: 'Insights',
      about: 'About',
      menu: 'Menu',
      close: 'Close',
      cta: 'Schedule a Session',
      skip: 'Skip to content',
      theme: 'Switch color theme',
      switchLang: 'Español',
      switchLangShort: 'ES',
      home: 'Dipriva home',
    },
    hero: {
      eyebrow: 'Corporate Strategy · Startup Operations · AI and Automation',
      h1: ['We engineer ', 'operational clarity', ' for companies outgrowing their systems.'],
      sub: 'Corporate strategy, startup operations and AI automation for companies with 10 to 500 employees. One 90-day execution roadmap. Delivered in English and Spanish.',
      ctaPrimary: 'Schedule a Strategy Session',
      ctaSecondary: 'Run the Clarity Check',
      roadmap: {
        label: '90-day execution roadmap',
        phases: [
          { days: 'Days 1 to 30', text: 'Name the work that runs only through you.' },
          { days: 'Days 31 to 60', text: 'Give each item an owner and a finish date.' },
          { days: 'Days 61 to 90', text: 'Run it without you in the room.' },
        ],
        cta: 'Get the free roadmap',
      },
      stats: [
        { value: '90-day', label: 'execution roadmap' },
        { value: '10 to 500', label: 'employees per client company' },
        { value: '20+ years', label: 'of experience' },
        { value: 'EN · ES', label: 'bilingual delivery' },
      ],
    },
    marquee: {
      label: 'Built for owners of',
      items: [
        'Insurance agencies',
        'Roofing companies',
        'Tax practices',
        'Professional services firms',
        'Founder-led teams',
        'Bilingual workforces',
      ],
    },
    problem: {
      label: 'The constraint',
      h2: 'Growth stalls where the owner becomes the system.',
      body: 'Most companies with 10 to 500 employees hit the same wall. Revenue grows. Decisions still route through one desk. Follow-up depends on who has time. The team repeats work a system should carry.',
      cards: [
        {
          title: 'Every decision waits on you.',
          body: 'Approvals, pricing and hiring stall when you are out. The business moves at the speed of your inbox.',
        },
        {
          title: 'Proposals go quiet.',
          body: 'Sales live in memory, not in a system. Deals cool while the team handles delivery.',
        },
        {
          title: 'Manual work compounds.',
          body: 'Data entry, status updates and handoffs consume hours that automation returns to the team.',
        },
      ],
      close:
        'Dipriva replaces the bottleneck with infrastructure: clear priorities, owned processes and automation that holds.',
    },
    services: {
      label: 'Services',
      h2: 'Three service lines. One standard of execution.',
      lines: [
        {
          key: 'strategy',
          name: 'Corporate Strategy',
          headline: 'Architect the decisions that set your trajectory.',
          body: 'Positioning, pricing and growth decisions translated into a structured execution plan with owners and dates.',
          href: '/services/corporate-strategy/',
          cta: 'Explore Corporate Strategy',
        },
        {
          key: 'ops',
          name: 'Startup Operations',
          headline: 'Build the systems that run without you.',
          body: "Documented processes, clear ownership and a 90-day roadmap that moves work off the founder's desk.",
          href: '/services/startup-operations/',
          cta: 'Explore Startup Operations',
        },
        {
          key: 'ai',
          name: 'AI and Automation',
          headline: 'Eliminate the manual work that slows your team.',
          body: 'A workflow audit first. Then AI and automation deployed where they return the most time, with controls that keep them reliable.',
          href: '/services/ai-automation/',
          cta: 'Explore AI and Automation',
        },
      ],
      bilingual: {
        title: 'Bilingual by design',
        body: 'Consulting delivered in English or Spanish, with the same precision in both.',
      },
      tools: {
        title: 'Free working tools',
        body: 'Three working kits in English and Spanish. Free to download.',
        links: [
          { label: '90-Day Operating Roadmap', href: '/startup/' },
          { label: 'Sales Follow-Up Kit', href: '/strategy/' },
          { label: 'Where to Automate First', href: '/ai-automation/' },
        ],
      },
      session: {
        title: 'Start with 30 minutes',
        body: 'A free 30-minute strategy session to name the first constraint.',
        cta: 'Schedule a Strategy Session',
      },
    },
    method: {
      label: 'Method',
      h2: 'Five levers. One roadmap.',
      intro:
        'Every engagement starts by measuring the five levers that move a company with 10 to 500 employees. We fix the constraint with the highest return first.',
      levers: [
        { key: 'pricing', name: 'Pricing', body: 'What you charge, and how you defend it.' },
        { key: 'retention', name: 'Retention', body: 'Why clients renew, and why they leave.' },
        { key: 'acquisition', name: 'Acquisition', body: 'How leads become signed work.' },
        { key: 'operations', name: 'Operations', body: 'Who owns each process, and where it breaks.' },
        { key: 'leadership', name: 'Strategy and Leadership', body: 'Where the company is going, and who decides.' },
      ],
      nodeLabels: ['Pricing', 'Retention', 'Acquisition', 'Operations', ['Strategy and', 'Leadership']],
      center: ['90-day', 'roadmap'],
      steps: [
        { title: 'Diagnose', body: 'Measure the five levers against your numbers.' },
        { title: 'Prioritize', body: 'Rank constraints by return. Pick the first one.' },
        {
          title: 'Build',
          body: 'Processes, owners and automation. Each task has a do-it-yourself path and a Dipriva-assisted path.',
        },
        { title: 'Hand off', body: 'Your team runs the system. The roadmap holds the dates.' },
      ],
    },
    diagnostic: {
      label: 'Clarity Check',
      h2: 'Find the constraint in three questions.',
      intro:
        'A preview of the Dipriva diagnostic. Three questions, one score, one next step. Your answers stay in your browser.',
      questions: [
        {
          id: 'q1',
          dim: 'ops',
          q: 'When you are out for a week, what happens to decisions?',
          options: ['They wait for me.', 'Some wait, some move.', 'The team decides.'],
        },
        {
          id: 'q2',
          dim: 'strategy',
          q: 'What happens after you send a proposal?',
          options: ['We follow up when someone remembers.', 'One person tracks it on a list.', 'A fixed schedule runs every time.'],
        },
        {
          id: 'q3',
          dim: 'ai',
          q: "How much of your team's week goes to repeated manual tasks?",
          options: ['More than a day.', 'A few hours.', 'Very little.'],
        },
      ],
      scoreLabel: 'Clarity score',
      pending: 'Answer all three to see your score.',
      note: 'Preview scoring. A full engagement measures all five levers.',
      results: {
        ops: {
          text: 'Your first constraint: decisions route through you. Start with the 90-Day Operating Roadmap.',
          cta: 'Get the roadmap',
          href: '/startup/',
        },
        strategy: {
          text: 'Your first constraint: follow-up depends on memory. Start with the Sales Follow-Up Kit.',
          cta: 'Get the kit',
          href: '/strategy/',
        },
        ai: {
          text: 'Your first constraint: manual work consumes the week. Start with Where to Automate First.',
          cta: 'Get the worksheet',
          href: '/ai-automation/',
        },
        none: {
          text: 'No single constraint dominates. Pressure-test the plan in a 30-minute strategy session.',
          cta: 'Schedule a Strategy Session',
          href: '/schedule/',
        },
      },
      secondary: 'Prefer a conversation? Schedule a Strategy Session.',
      noscript: 'The Clarity Check runs in your browser and needs JavaScript. The 90-Day Operating Roadmap works without it.',
    },
    proof: {
      label: 'Results',
      h2: 'Results from client work.',
      cards: [
        {
          segment: 'Insurance agency',
          figures: [
            { to: 1000, prefix: '+$', suffix: '', label: 'per-client policy premiums' },
            { to: 13, prefix: '', suffix: '%', label: 'improvement in renewal rates' },
          ],
          statement:
            'Defined sales strategy increased per-client policy premiums by $1,000 and improved renewal rates by 13%.',
        },
        {
          segment: 'Roofing company',
          figures: [{ to: 20, prefix: '', suffix: '%', label: 'improvement in lead-to-close ratio' }],
          statement: 'Sales team alignment improved the lead-to-close ratio by 20% over a 6-month window.',
        },
        {
          segment: 'Tax agency',
          figures: [{ to: 9, prefix: '', suffix: ' pts', label: 'increase in re-purchase rate' }],
          statement:
            'Re-purchase rate increased by 9 percentage points and services were upsold to Schedule C clients.',
        },
      ],
      note: 'Results from specific client engagements. Your results depend on your starting point.',
    },
    clients: {
      label: 'Companies we are proud to work with',
      newTab: 'opens in a new tab',
    },
    system: {
      label: 'Proof of practice',
      h2: 'We run Dipriva on the systems we build.',
      intro:
        'Our own marketing runs on governed AI. Agents draft every post. Nothing publishes until it clears every gate.',
      steps: [
        { title: 'Plan', body: 'A weekly plan set by cadence rules and verified trends.' },
        { title: 'Draft', body: 'Scheduled AI agents write each post to the brand standard.' },
        { title: 'Code checks', body: 'Brand terms, platform limits and every figure against an approved source.' },
        { title: 'Independent review', body: 'A separate AI reviewer scores each post. Every score must reach 4 or higher.' },
        { title: 'Veto window', body: 'Approved batches wait 12 hours. The owner can hold any post.' },
        { title: 'Publish', body: 'Official platform APIs only. Every result logged.' },
      ],
      facts: [
        'Outside figures publish only when the exact sentence appears on the cited page.',
        'No social data feeds a lead list. A lead exists only when a person submits their own details.',
      ],
      close:
        'This is the standard we install for clients: AI that does the work, under controls that make it safe to trust.',
      cta: 'See AI and Automation',
      href: '/services/ai-automation/',
    },
    next: {
      label: 'Next steps',
      h2: 'What happens after you reach out.',
      steps: [
        { when: 'Immediately', body: 'Your request is logged the moment you submit it.' },
        { when: 'Within 2 business days', body: 'Manuel reads your request and replies personally.' },
        { when: 'Strategy session', body: 'A free 30-minute session to name the first constraint.' },
        { when: 'Written scope', body: 'If we proceed, you receive a written scope and price before any work begins.' },
      ],
    },
    insights: {
      label: 'Insights',
      h2: 'Field notes on strategy, operations and AI.',
      intro: 'Analysis for owners and executives who run on numbers.',
      all: 'All insights',
      minRead: 'min read',
      langNote: '',
    },
    about: {
      label: 'Founder-led',
      h2: 'Judge us by the work product.',
      body: 'Dipriva is founder-led. Manuel Diprés built it after more than 20 years building revenue operations and go-to-market systems for businesses in the Americas and Europe. He works in English and Spanish, and he reads every request himself.',
      role: 'Founder, Dipriva Consulting Group',
      cta: "Read Manuel's background",
      href: '/about/manuel-dipres/',
      documents: ['Implementation Playbook', 'Client Strategy Draft', '90-Day Execution Roadmap'],
      sample: 'Sample',
      confidential: 'Confidential',
      page: 'Page 1',
      standards: [
        'Owners and dates on every line.',
        'Every figure carries its source.',
        'Every deliverable marked confidential.',
        'English or Spanish, same precision.',
      ],
    },
    faq: {
      label: 'Questions',
      h2: 'Questions owners ask first.',
      items: [
        {
          q: 'Who does Dipriva work with?',
          a: 'Owners and executives of companies with 10 to 500 employees that are growing faster than their systems. Larger companies are welcome. Our published client results come from an insurance agency, a roofing company and a tax agency.',
        },
        {
          q: 'How does an engagement start?',
          a: 'With a free 30-minute strategy session. If there is a fit, you receive a written scope and price before work begins.',
        },
        {
          q: 'What do I receive?',
          a: 'A 90-day execution roadmap with owners and dates. Implementation follows the scope you approve, with a do-it-yourself path or a Dipriva-assisted path for each task.',
        },
        {
          q: 'Do you work in Spanish?',
          a: 'Yes. Manuel works with clients in English and Spanish, and every free tool on this site is available in both languages.',
        },
        {
          q: 'Where is Dipriva based?',
          a: 'Dipriva is based in West Michigan and works with companies across the United States and its territories.',
        },
      ],
    },
    final: {
      h2: 'Find the constraint. Then remove it.',
      body: 'Schedule a free 30-minute strategy session. We will name the first constraint to remove.',
      primary: 'Schedule a Strategy Session',
      secondary: 'Download a free tool',
    },
    footer: {
      tagline: 'Engineering operational clarity.',
      servicesTitle: 'Services',
      toolsTitle: 'Free tools',
      companyTitle: 'Company',
      contactTitle: 'Contact',
      company: [
        { label: 'About', href: '/about/' },
        { label: 'Insights', href: '/blog/' },
        { label: 'West Michigan', href: '/industries/west-michigan/' },
        { label: 'Privacy', href: '/privacy/' },
      ],
      based: 'West Michigan · United States and territories',
    },
    lea: {
      open: 'Chat with Lea',
      title: 'Lea',
      subtitle: 'Powered by AI · Dipriva Consulting Group',
      greeting:
        "I am Lea, Dipriva's AI assistant. I answer questions about our services and route you to Manuel. What are you working on?",
      placeholder: 'Type a message',
      send: 'Send',
      close: 'Close chat',
      demoReply:
        'This QA build does not connect to the live assistant. Schedule a Strategy Session, or write to manuel@dipriva.com.',
      thinking: 'Lea is typing',
      errorFallback: 'I cannot continue this conversation right now. Please email manuel@dipriva.com directly.',
    },
    mobileCta: 'Schedule a Strategy Session',
  },

  es: {
    meta: {
      title: 'Consultoría en estrategia, operaciones e IA | Dipriva',
      description:
        'Dipriva diseña claridad operacional para empresas de 10 a 500 empleados: estrategia corporativa, operaciones de startups y automatización con IA, en inglés y en español.',
    },
    banner: 'Prototipo de diseño para revisión. No es el sitio en vivo.',
    nav: {
      services: 'Servicios',
      method: 'Método',
      results: 'Resultados',
      insights: 'Análisis',
      about: 'Nosotros',
      menu: 'Menú',
      close: 'Cerrar',
      cta: 'Agende una sesión',
      skip: 'Saltar al contenido',
      theme: 'Cambiar el tema de color',
      switchLang: 'English',
      switchLangShort: 'EN',
      home: 'Inicio de Dipriva',
    },
    hero: {
      eyebrow: 'Estrategia corporativa · Operaciones de startups · IA y automatización',
      h1: ['Diseñamos ', 'claridad operacional', ' para empresas que crecen más rápido que sus sistemas.'],
      sub: 'Estrategia corporativa, operaciones de startups y automatización con IA para empresas de 10 a 500 empleados. Una hoja de ruta de ejecución de 90 días. En inglés y en español.',
      ctaPrimary: 'Agende una sesión estratégica',
      ctaSecondary: 'Haga el diagnóstico de claridad',
      roadmap: {
        label: 'Hoja de ruta de ejecución de 90 días',
        phases: [
          { days: 'Días 1 a 30', text: 'Identifique el trabajo que depende solo de usted.' },
          { days: 'Días 31 a 60', text: 'Asigne a cada tarea un responsable y una fecha de cierre.' },
          { days: 'Días 61 a 90', text: 'Que funcione sin usted presente.' },
        ],
        cta: 'Reciba la hoja de ruta gratuita',
      },
      stats: [
        { value: '90 días', label: 'hoja de ruta de ejecución' },
        { value: '10 a 500', label: 'empleados por empresa cliente' },
        { value: '20+ años', label: 'de experiencia' },
        { value: 'EN · ES', label: 'atención bilingüe' },
      ],
    },
    marquee: {
      label: 'Diseñado para dueños de',
      items: [
        'Agencias de seguros',
        'Empresas de techado',
        'Oficinas de impuestos',
        'Firmas de servicios profesionales',
        'Equipos dirigidos por su fundador',
        'Equipos bilingües',
      ],
    },
    problem: {
      label: 'La restricción',
      h2: 'El crecimiento se detiene cuando el dueño se convierte en el sistema.',
      body: 'La mayoría de las empresas de 10 a 500 empleados choca con el mismo muro. Los ingresos crecen. Las decisiones siguen pasando por un solo escritorio. El seguimiento depende de quién tenga tiempo. El equipo repite trabajo que un sistema debería absorber.',
      cards: [
        {
          title: 'Cada decisión lo espera a usted.',
          body: 'Aprobaciones, precios y contrataciones se detienen cuando usted no está. La empresa avanza al ritmo de su bandeja de entrada.',
        },
        {
          title: 'Las propuestas se enfrían.',
          body: 'Las ventas viven en la memoria, no en un sistema. Los negocios se enfrían mientras el equipo atiende la operación.',
        },
        {
          title: 'El trabajo manual se acumula.',
          body: 'Captura de datos, reportes de avance y traspasos consumen horas que la automatización le devuelve al equipo.',
        },
      ],
      close:
        'Dipriva reemplaza el cuello de botella con infraestructura: prioridades claras, procesos con responsable y automatización que se sostiene.',
    },
    services: {
      label: 'Servicios',
      h2: 'Tres líneas de servicio. Un mismo estándar de ejecución.',
      lines: [
        {
          key: 'strategy',
          name: 'Estrategia corporativa',
          headline: 'Diseñe las decisiones que definen su rumbo.',
          body: 'Posicionamiento, precios y decisiones de crecimiento convertidos en un plan de ejecución estructurado, con responsables y fechas.',
          href: '/es/servicios/estrategia-corporativa/',
          cta: 'Ver Estrategia corporativa',
        },
        {
          key: 'ops',
          name: 'Operaciones de startups',
          headline: 'Construya los sistemas que operan sin usted.',
          body: 'Procesos documentados, responsables claros y una hoja de ruta de 90 días que saca el trabajo del escritorio del fundador.',
          href: '/es/servicios/operaciones-de-startups/',
          cta: 'Ver Operaciones de startups',
        },
        {
          key: 'ai',
          name: 'IA y automatización',
          headline: 'Elimine el trabajo manual que frena a su equipo.',
          body: 'Primero, una auditoría de flujos de trabajo. Después, IA y automatización donde más tiempo devuelven, con controles que las mantienen confiables.',
          href: '/es/servicios/ia-y-automatizacion/',
          cta: 'Ver IA y automatización',
        },
      ],
      bilingual: {
        title: 'Bilingüe por diseño',
        body: 'Consultoría en inglés o en español, con la misma precisión en ambos idiomas.',
      },
      tools: {
        title: 'Herramientas de trabajo gratuitas',
        body: 'Tres kits de trabajo en inglés y en español. Descarga gratuita.',
        links: [
          { label: 'Hoja de ruta operativa de 90 días', href: '/es/startup/' },
          { label: 'Kit de seguimiento de ventas', href: '/es/estrategia/' },
          { label: 'Por dónde automatizar primero', href: '/es/ia-automatizacion/' },
        ],
      },
      session: {
        title: 'Empiece con 30 minutos',
        body: 'Una sesión estratégica gratuita de 30 minutos para identificar la primera restricción.',
        cta: 'Agende una sesión estratégica',
      },
    },
    method: {
      label: 'Método',
      h2: 'Cinco palancas. Una hoja de ruta.',
      intro:
        'Cada proyecto empieza midiendo las cinco palancas que mueven a una empresa de 10 a 500 empleados. Primero resolvemos la restricción con mayor retorno.',
      levers: [
        { key: 'pricing', name: 'Precios', body: 'Cuánto cobra y cómo lo sostiene.' },
        { key: 'retention', name: 'Retención', body: 'Por qué renuevan sus clientes y por qué se van.' },
        { key: 'acquisition', name: 'Adquisición', body: 'Cómo los prospectos se convierten en contratos firmados.' },
        { key: 'operations', name: 'Operaciones', body: 'Quién es responsable de cada proceso y dónde falla.' },
        { key: 'leadership', name: 'Estrategia y liderazgo', body: 'Hacia dónde va la empresa y quién decide.' },
      ],
      nodeLabels: ['Precios', 'Retención', 'Adquisición', 'Operaciones', ['Estrategia y', 'liderazgo']],
      center: ['Hoja de ruta', 'de 90 días'],
      steps: [
        { title: 'Diagnosticar', body: 'Medimos las cinco palancas con sus cifras.' },
        { title: 'Priorizar', body: 'Ordenamos las restricciones por retorno y elegimos la primera.' },
        {
          title: 'Construir',
          body: 'Procesos, responsables y automatización. Cada tarea tiene una opción para hacerla usted mismo y otra con apoyo de Dipriva.',
        },
        { title: 'Transferir', body: 'Su equipo opera el sistema. La hoja de ruta fija las fechas.' },
      ],
    },
    diagnostic: {
      label: 'Diagnóstico de claridad',
      h2: 'Encuentre la restricción en tres preguntas.',
      intro:
        'Una vista previa del diagnóstico de Dipriva. Tres preguntas, una puntuación, un siguiente paso. Sus respuestas no salen de su navegador.',
      questions: [
        {
          id: 'q1',
          dim: 'ops',
          q: 'Cuando usted se ausenta una semana, ¿qué pasa con las decisiones?',
          options: ['Me esperan a mí.', 'Algunas esperan, otras avanzan.', 'El equipo decide.'],
        },
        {
          id: 'q2',
          dim: 'strategy',
          q: '¿Qué pasa después de enviar una propuesta?',
          options: [
            'Damos seguimiento cuando alguien se acuerda.',
            'Una persona la registra en una lista.',
            'Un calendario fijo se cumple siempre.',
          ],
        },
        {
          id: 'q3',
          dim: 'ai',
          q: '¿Cuánto de la semana de su equipo se va en tareas manuales repetidas?',
          options: ['Más de un día.', 'Algunas horas.', 'Muy poco.'],
        },
      ],
      scoreLabel: 'Puntuación de claridad',
      pending: 'Responda las tres preguntas para ver su puntuación.',
      note: 'Puntuación preliminar. Un proyecto completo mide las cinco palancas.',
      results: {
        ops: {
          text: 'Su primera restricción: las decisiones pasan por usted. Empiece con la hoja de ruta operativa de 90 días.',
          cta: 'Reciba la hoja de ruta',
          href: '/es/startup/',
        },
        strategy: {
          text: 'Su primera restricción: el seguimiento depende de la memoria. Empiece con el kit de seguimiento de ventas.',
          cta: 'Reciba el kit',
          href: '/es/estrategia/',
        },
        ai: {
          text: 'Su primera restricción: el trabajo manual consume la semana. Empiece con Por dónde automatizar primero.',
          cta: 'Reciba la hoja de trabajo',
          href: '/es/ia-automatizacion/',
        },
        none: {
          text: 'Ninguna restricción domina. Ponga a prueba el plan en una sesión estratégica de 30 minutos.',
          cta: 'Agende una sesión estratégica',
          href: '/es/agendar/',
        },
      },
      secondary: '¿Prefiere conversar? Agende una sesión estratégica.',
      noscript:
        'El diagnóstico de claridad funciona en su navegador y requiere JavaScript. La hoja de ruta operativa de 90 días funciona sin él.',
    },
    proof: {
      label: 'Resultados',
      h2: 'Resultados del trabajo con clientes.',
      cards: [
        {
          segment: 'Agencia de seguros',
          figures: [
            { to: 1000, prefix: '+$', suffix: '', label: 'en primas por cliente' },
            { to: 13, prefix: '', suffix: '%', label: 'de mejora en renovaciones' },
          ],
          statement:
            'Una estrategia de ventas definida aumentó las primas por cliente en $1,000 y mejoró la tasa de renovación en un 13%.',
        },
        {
          segment: 'Empresa de techado',
          figures: [{ to: 20, prefix: '', suffix: '%', label: 'de mejora en la tasa de cierre' }],
          statement:
            'La alineación del equipo de ventas mejoró la tasa de conversión de prospecto a cierre en un 20% en un periodo de 6 meses.',
        },
        {
          segment: 'Agencia de impuestos',
          figures: [{ to: 9, prefix: '', suffix: ' pts', label: 'más en la tasa de recompra' }],
          statement:
            'La tasa de recompra aumentó 9 puntos porcentuales y se vendieron servicios adicionales a clientes del Anexo C (Schedule C).',
        },
      ],
      note: 'Resultados de proyectos específicos con clientes. Sus resultados dependen de su punto de partida.',
    },
    clients: {
      label: 'Empresas con las que nos enorgullece trabajar',
      newTab: 'se abre en una pestaña nueva',
    },
    system: {
      label: 'Prueba en la práctica',
      h2: 'Operamos Dipriva con los sistemas que construimos.',
      intro:
        'Nuestro propio marketing funciona con IA gobernada. Agentes de IA redactan cada publicación. Nada se publica sin superar cada control.',
      steps: [
        { title: 'Plan', body: 'Un plan semanal según reglas de cadencia y tendencias verificadas.' },
        { title: 'Redacción', body: 'Agentes de IA programados redactan cada publicación con el estándar de la marca.' },
        {
          title: 'Controles de código',
          body: 'Términos de marca, límites de cada plataforma y cada cifra contra una fuente aprobada.',
        },
        {
          title: 'Revisión independiente',
          body: 'Un revisor de IA independiente califica cada publicación. Cada puntuación debe ser 4 o más.',
        },
        { title: 'Periodo de veto', body: 'Los lotes aprobados esperan 12 horas. El dueño puede detener cualquier publicación.' },
        { title: 'Publicación', body: 'Solo APIs oficiales de cada plataforma. Cada resultado queda registrado.' },
      ],
      facts: [
        'Las cifras externas se publican solo cuando la frase exacta aparece en la página citada.',
        'Ningún dato de redes sociales alimenta una lista de prospectos. Un prospecto existe solo cuando una persona envía sus propios datos.',
      ],
      close:
        'Este es el estándar que instalamos para nuestros clientes: IA que hace el trabajo, con controles que la hacen confiable.',
      cta: 'Ver IA y automatización',
      href: '/es/servicios/ia-y-automatizacion/',
    },
    next: {
      label: 'Siguientes pasos',
      h2: 'Qué pasa después de contactarnos.',
      steps: [
        { when: 'De inmediato', body: 'Su solicitud queda registrada en el momento en que la envía.' },
        { when: 'En 2 días hábiles', body: 'Manuel lee su solicitud y le responde personalmente.' },
        { when: 'Sesión estratégica', body: 'Una sesión gratuita de 30 minutos para identificar la primera restricción.' },
        {
          when: 'Alcance por escrito',
          body: 'Si avanzamos, recibe un alcance y un precio por escrito antes de iniciar cualquier trabajo.',
        },
      ],
    },
    insights: {
      label: 'Análisis',
      h2: 'Notas de campo sobre estrategia, operaciones e IA.',
      intro: 'Análisis para dueños y directivos que dirigen con números.',
      all: 'Todos los análisis',
      minRead: 'min de lectura',
      langNote: '',
    },
    about: {
      label: 'Dirigida por su fundador',
      h2: 'Júzguenos por el trabajo entregado.',
      body: 'Dipriva es una firma dirigida por su fundador. Manuel Diprés la creó después de más de 20 años construyendo operaciones de ingresos y sistemas comerciales para empresas en las Américas y Europa. Trabaja en inglés y en español, y lee personalmente cada solicitud.',
      role: 'Fundador, Dipriva Consulting Group',
      cta: 'Conozca la trayectoria de Manuel',
      href: '/es/nosotros/manuel-dipres/',
      documents: ['Manual de implementación', 'Borrador de estrategia', 'Hoja de ruta de 90 días'],
      sample: 'Muestra',
      confidential: 'Confidencial',
      page: 'Página 1',
      standards: [
        'Responsables y fechas en cada línea.',
        'Cada cifra lleva su fuente.',
        'Cada entregable marcado como confidencial.',
        'Inglés o español, con la misma precisión.',
      ],
    },
    faq: {
      label: 'Preguntas',
      h2: 'Lo primero que preguntan los dueños.',
      items: [
        {
          q: '¿Con quién trabaja Dipriva?',
          a: 'Con dueños y directivos de empresas de 10 a 500 empleados que crecen más rápido que sus sistemas. También trabajamos con empresas más grandes. Nuestros resultados publicados provienen de una agencia de seguros, una empresa de techado y una agencia de impuestos.',
        },
        {
          q: '¿Cómo empieza un proyecto?',
          a: 'Con una sesión estratégica gratuita de 30 minutos. Si hay afinidad, recibe un alcance y un precio por escrito antes de iniciar el trabajo.',
        },
        {
          q: '¿Qué recibo?',
          a: 'Una hoja de ruta de ejecución de 90 días con responsables y fechas. La implementación sigue el alcance que usted aprueba, con una opción para hacerla usted mismo o con apoyo de Dipriva en cada tarea.',
        },
        {
          q: '¿Trabajan en español?',
          a: 'Sí. Manuel trabaja con clientes en inglés y en español, y cada herramienta gratuita de este sitio está disponible en ambos idiomas.',
        },
        {
          q: '¿Dónde está Dipriva?',
          a: 'Dipriva tiene su sede en West Michigan y trabaja con empresas en todo Estados Unidos y sus territorios.',
        },
      ],
    },
    final: {
      h2: 'Encuentre la restricción. Después, elimínela.',
      body: 'Agende una sesión estratégica gratuita de 30 minutos. Identificaremos la primera restricción a eliminar.',
      primary: 'Agende una sesión estratégica',
      secondary: 'Descargue una herramienta gratuita',
    },
    footer: {
      tagline: 'Ingeniería de claridad operacional.',
      servicesTitle: 'Servicios',
      toolsTitle: 'Herramientas gratuitas',
      companyTitle: 'Empresa',
      contactTitle: 'Contacto',
      company: [
        { label: 'Nosotros', href: '/es/nosotros/' },
        { label: 'Análisis', href: '/es/blog/' },
        { label: 'West Michigan', href: '/es/industrias/oeste-de-michigan/' },
        { label: 'Privacidad', href: '/es/privacidad/' },
      ],
      based: 'West Michigan · Estados Unidos y territorios',
    },
    lea: {
      open: 'Converse con Lea',
      title: 'Lea',
      subtitle: 'Con tecnología de IA · Dipriva Consulting Group',
      greeting:
        'Soy Lea, la asistente de IA de Dipriva. Respondo preguntas sobre nuestros servicios y le pongo en contacto con Manuel. ¿En qué está trabajando?',
      placeholder: 'Escriba un mensaje',
      send: 'Enviar',
      close: 'Cerrar el chat',
      demoReply:
        'Esta versión de QA no está conectada a la asistente en vivo. Agende una sesión estratégica o escriba a manuel@dipriva.com.',
      thinking: 'Lea está escribiendo',
      errorFallback: 'No puedo continuar esta conversación en este momento. Por favor escriba directamente a manuel@dipriva.com.',
    },
    mobileCta: 'Agende una sesión estratégica',
  },
} as const;

export type Copy = (typeof copy)['en'];

type BlogCta = { title: string; body: string; cta: string; href: string };

export const blogCopy: Record<
  Lang,
  {
    title: string;
    metaTitle: string;
    description: string;
    h1: string;
    intro: string;
    all: string;
    by: string;
    minRead: string;
    onThisPage: string;
    related: string;
    back: string;
    home: string;
    undated: string;
    takeaways: string;
    faq: string;
    sources: string;
    publishedOn: string;
    retrievedOn: string;
    updated: string;
    share: { label: string; linkedin: string; facebook: string; x: string; email: string; copy: string; copied: string };
    ctaByCluster: Record<string, BlogCta>;
  }
> = {
  en: {
    title: 'Dipriva Insights',
    metaTitle: 'Insights on Strategy, Operations and AI | Dipriva',
    description:
      'Analysis for owners and executives of companies with 10 to 500 employees: corporate strategy, startup operations and AI automation.',
    h1: 'Field notes on strategy, operations and AI.',
    intro: 'Analysis for owners and executives of companies with 10 to 500 employees. Written to be used.',
    all: 'All',
    by: 'By',
    minRead: 'min read',
    onThisPage: 'On this page',
    related: 'Related insights',
    back: 'All insights',
    home: 'Home',
    undated: 'Undated',
    takeaways: 'Key takeaways',
    faq: 'Frequently asked questions',
    sources: 'Sources',
    publishedOn: 'Published',
    retrievedOn: 'Retrieved',
    updated: 'Updated',
    share: { label: 'Share', linkedin: 'Share on LinkedIn', facebook: 'Share on Facebook', x: 'Share on X', email: 'Share by email', copy: 'Copy link', copied: 'Link copied' },
    ctaByCluster: {
      'Corporate Strategy': {
        title: 'Proposals go quiet. Follow-up wins them back.',
        body: 'Five touches after every proposal and the message for each one. Free in English and Spanish.',
        cta: 'Get the Sales Follow-Up Kit',
        href: '/strategy/',
      },
      'Startup Operations': {
        title: 'Everything runs through you. Move it in 90 days.',
        body: 'A one-page plan that names what leaves your desk, who owns it next and the date it moves.',
        cta: 'Get the 90-Day Operating Roadmap',
        href: '/startup/',
      },
      'AI and Automation': {
        title: 'Find where to automate first.',
        body: 'Score the tasks your team repeats and find the one to automate first. Free in English and Spanish.',
        cta: 'Get the worksheet',
        href: '/ai-automation/',
      },
    },
  },
  es: {
    title: 'Análisis de Dipriva',
    metaTitle: 'Análisis de estrategia, operaciones e IA | Dipriva',
    description:
      'Análisis para dueños y directivos de empresas de 10 a 500 empleados: estrategia corporativa, operaciones de startups y automatización con IA.',
    h1: 'Notas de campo sobre estrategia, operaciones e IA.',
    intro: 'Análisis para dueños y directivos de empresas de 10 a 500 empleados. Escrito para usarse.',
    all: 'Todos',
    by: 'Por',
    minRead: 'min de lectura',
    onThisPage: 'En esta página',
    related: 'Análisis relacionados',
    back: 'Todos los análisis',
    home: 'Inicio',
    undated: 'Sin fecha',
    takeaways: 'Puntos clave',
    faq: 'Preguntas frecuentes',
    sources: 'Fuentes',
    publishedOn: 'Publicado',
    retrievedOn: 'Consultado',
    updated: 'Actualizado',
    share: { label: 'Compartir', linkedin: 'Compartir en LinkedIn', facebook: 'Compartir en Facebook', x: 'Compartir en X', email: 'Compartir por correo', copy: 'Copiar enlace', copied: 'Enlace copiado' },
    ctaByCluster: {
      'Corporate Strategy': {
        title: 'Las propuestas se enfrían. El seguimiento las recupera.',
        body: 'Cinco contactos después de cada propuesta y el mensaje para cada uno. Gratis en inglés y en español.',
        cta: 'Reciba el kit de seguimiento de ventas',
        href: '/es/estrategia/',
      },
      'Startup Operations': {
        title: 'Todo pasa por usted. Muévalo en 90 días.',
        body: 'Un plan de una página que nombra lo que sale de su escritorio, quién lo asume y la fecha en que cambia de manos.',
        cta: 'Reciba la hoja de ruta operativa de 90 días',
        href: '/es/startup/',
      },
      'AI and Automation': {
        title: 'Encuentre por dónde automatizar primero.',
        body: 'Califique las tareas que su equipo repite y encuentre la primera que conviene automatizar. Gratis en inglés y en español.',
        cta: 'Reciba la hoja de trabajo',
        href: '/es/ia-automatizacion/',
      },
    },
  },
};
