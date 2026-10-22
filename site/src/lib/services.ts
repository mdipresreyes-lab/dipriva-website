/**
 * Service page content, English and Spanish. Ported from the live service pages
 * (client/src/pages/Services*.tsx) with the em dashes, the banned term "leverage"
 * and the West Michigan only scoping removed, and the Spanish moved to formal usted.
 * Claims are limited to the approved firm figures and what the live pages already state.
 */
import type { Lang } from './copy';

export type ServiceKey = 'strategy' | 'ops' | 'ai';

type Localized = {
  slug: string;
  /** Answer-first summary: two or three self-contained, quotable sentences for search and AI answers. */
  summary: string;
  visual: { center: string; nodes: string[] };
  name: string;
  meta: { title: string; description: string };
  h1: string;
  sub: string;
  problem: { h2: string; body: string };
  deliver: { h2: string; items: { title: string; body: string }[]; note: string };
  fit: { h2: string; items: string[] };
  faq: { q: string; a: string }[];
  cta: { h2: string; body: string };
};

export type Service = {
  key: ServiceKey;
  cluster: string;
  proof: number[];
  tool: { path: Record<Lang, string>; label: Record<Lang, string>; body: Record<Lang, string> };
  en: Localized;
  es: Localized;
};

export const servicePath = (s: Service, lang: Lang) =>
  lang === 'es' ? `/es/servicios/${s.es.slug}/` : `/services/${s.en.slug}/`;
export const servicesHubPath = (lang: Lang) => (lang === 'es' ? '/es/servicios/' : '/services/');

const startEn = {
  q: 'How does an engagement start?',
  a: 'With a free 30-minute strategy session. If there is a fit, you receive a written scope and price before work begins.',
};
const startEs = {
  q: '¿Cómo empieza un proyecto?',
  a: 'Con una sesión estratégica gratuita de 30 minutos. Si hay afinidad, recibe un alcance y un precio por escrito antes de iniciar el trabajo.',
};

export const services: Service[] = [
  {
    key: 'strategy',
    cluster: 'Corporate Strategy',
    proof: [0, 1],
    tool: {
      path: { en: '/strategy/', es: '/es/estrategia/' },
      label: { en: 'Sales Follow-Up Kit', es: 'Kit de seguimiento de ventas' },
      body: {
        en: 'Five touches after every proposal and the message for each one. Free in English and Spanish.',
        es: 'Cinco contactos después de cada propuesta y el mensaje para cada uno. Gratis en inglés y en español.',
      },
    },
    en: {
      slug: 'corporate-strategy',
      summary:
        'Dipriva Consulting Group provides corporate strategy consulting for companies with 10 to 500 employees. An engagement covers decision architecture, competitive positioning and operational due diligence, and ends with a 90-day execution roadmap that names an owner and a date for every initiative. Engagements are delivered in English or Spanish and start with a free 30-minute strategy session.',
      visual: { center: 'days', nodes: ['Decide'] },
      name: 'Corporate Strategy',
      meta: {
        title: 'Corporate Strategy Consulting | Dipriva Consulting Group',
        description:
          'Corporate strategy consulting for companies with 10 to 500 employees: decision architecture, positioning and a 90-day execution roadmap, in English or Spanish.',
      },
      h1: 'Corporate strategy consulting that turns decisions into execution.',
      sub: 'Your strategy needs more than a plan. It needs infrastructure. Dipriva architects the decisions that set your trajectory and the 90-day execution roadmap that carries them, for companies with 10 to 500 employees.',
      problem: {
        h2: 'The gap between strategy and execution',
        body: 'Most companies do not fail because of a bad strategy. They fail because the strategy never became a system. Decisions get made in meetings, initiatives get launched, and six months later the organization is back where it started: busy, but not advancing. The gap between strategic intent and operational reality is where growth stalls.',
      },
      deliver: {
        h2: 'What a corporate strategy engagement delivers',
        items: [
          { title: 'Decision architecture', body: 'The few decisions that set your trajectory, framed with options, trade-offs and an owner.' },
          { title: 'Competitive positioning', body: 'Where you win, against whom, and the pricing that position supports.' },
          { title: 'Operational due diligence', body: 'A clear read on whether the operation can carry the plan, before you commit to it.' },
          { title: '90-day execution roadmap', body: 'Every initiative with an owner and a date, so leadership executes without you in every decision.' },
        ],
        note: 'The outcome is a documented strategy your leadership team can execute without you present for every decision.',
      },
      fit: {
        h2: 'Who this is for',
        items: [
          'Owners and executives of companies with 10 to 500 employees facing a growth inflection',
          'Organizations navigating an ownership transition, a market expansion or a competitive shift',
          'Leadership teams where strategy exists on paper but has not become disciplined execution',
          'Founders preparing for a key hire, a capital raise or a structural reorganization',
        ],
      },
      faq: [
        startEn,
        {
          q: 'What do I have at the end?',
          a: 'A documented strategy and a 90-day execution roadmap with an owner and a date on every initiative.',
        },
        {
          q: 'How is this different from a strategic plan?',
          a: 'A plan describes intent. This engagement builds the decisions, owners and dates that turn intent into execution.',
        },
        {
          q: 'Do you only work with West Michigan companies?',
          a: 'No. Dipriva is based in West Michigan and works with companies across the United States and its territories, in English or Spanish.',
        },
      ],
      cta: {
        h2: 'Architect the decision.',
        body: 'If your organization is moving fast but not advancing, that is the gap we close. Start with a free 30-minute strategy session.',
      },
    },
    es: {
      slug: 'estrategia-corporativa',
      summary:
        'Dipriva Consulting Group ofrece consultoría en estrategia corporativa para empresas de 10 a 500 empleados. Un proyecto cubre arquitectura de decisiones, posicionamiento competitivo y debida diligencia operacional, y termina con una hoja de ruta de ejecución de 90 días con un responsable y una fecha para cada iniciativa. Se entrega en inglés o en español y empieza con una sesión estratégica gratuita de 30 minutos.',
      visual: { center: 'días', nodes: ['Decidir'] },
      name: 'Estrategia corporativa',
      meta: {
        title: 'Consultoría en estrategia corporativa | Dipriva',
        description:
          'Consultoría en estrategia corporativa para empresas de 10 a 500 empleados: arquitectura de decisiones, posicionamiento y una hoja de ruta de ejecución de 90 días.',
      },
      h1: 'Consultoría en estrategia corporativa que convierte decisiones en ejecución.',
      sub: 'Su estrategia necesita más que un plan. Necesita infraestructura. Dipriva diseña las decisiones que definen su rumbo y la hoja de ruta de ejecución de 90 días que las sostiene, para empresas de 10 a 500 empleados.',
      problem: {
        h2: 'La brecha entre estrategia y ejecución',
        body: 'La mayoría de las empresas no fracasa por tener una mala estrategia. Fracasa porque la estrategia nunca se convirtió en un sistema. Las decisiones se toman en reuniones, se lanzan iniciativas y, seis meses después, la organización está donde empezó: ocupada, pero sin avanzar. La brecha entre la intención estratégica y la realidad operacional es donde el crecimiento se detiene.',
      },
      deliver: {
        h2: 'Qué entrega un proyecto de estrategia corporativa',
        items: [
          { title: 'Arquitectura de decisiones', body: 'Las pocas decisiones que definen su rumbo, con opciones, ventajas, desventajas y un responsable.' },
          { title: 'Posicionamiento competitivo', body: 'Dónde gana, frente a quién, y los precios que esa posición sostiene.' },
          { title: 'Debida diligencia operacional', body: 'Una lectura clara de si la operación puede sostener el plan, antes de comprometerse con él.' },
          {
            title: 'Hoja de ruta de ejecución de 90 días',
            body: 'Cada iniciativa con un responsable y una fecha, para que su equipo directivo ejecute sin que usted intervenga en cada decisión.',
          },
        ],
        note: 'El resultado es una estrategia documentada que su equipo directivo puede ejecutar sin que usted esté presente en cada decisión.',
      },
      fit: {
        h2: 'Para quién es',
        items: [
          'Dueños y directivos de empresas de 10 a 500 empleados ante un punto de inflexión en su crecimiento',
          'Organizaciones que atraviesan una transición de propiedad, una expansión de mercado o un cambio competitivo',
          'Equipos directivos con una estrategia en papel que todavía no se convierte en ejecución disciplinada',
          'Fundadores que se preparan para una contratación clave, una ronda de capital o una reorganización estructural',
        ],
      },
      faq: [
        startEs,
        {
          q: '¿Qué tengo al final?',
          a: 'Una estrategia documentada y una hoja de ruta de ejecución de 90 días con un responsable y una fecha en cada iniciativa.',
        },
        {
          q: '¿En qué se diferencia de un plan estratégico?',
          a: 'Un plan describe la intención. Este proyecto construye las decisiones, los responsables y las fechas que convierten la intención en ejecución.',
        },
        {
          q: '¿Solo trabajan con empresas de West Michigan?',
          a: 'No. Dipriva tiene su sede en West Michigan y trabaja con empresas en todo Estados Unidos y sus territorios, en inglés o en español.',
        },
      ],
      cta: {
        h2: 'Diseñe la decisión.',
        body: 'Si su organización se mueve rápido pero no avanza, esa es la brecha que cerramos. Empiece con una sesión estratégica gratuita de 30 minutos.',
      },
    },
  },
  {
    key: 'ops',
    cluster: 'Startup Operations',
    proof: [2],
    tool: {
      path: { en: '/startup/', es: '/es/startup/' },
      label: { en: '90-Day Operating Roadmap', es: 'Hoja de ruta operativa de 90 días' },
      body: {
        en: 'A one-page plan that names what leaves your desk, who owns it next and the date it moves.',
        es: 'Un plan de una página que define qué sale de su escritorio, quién lo asume y en qué fecha.',
      },
    },
    en: {
      slug: 'startup-operations',
      summary:
        'Dipriva Consulting Group provides startup operations consulting for founder-led companies with 10 to 500 employees. An engagement inventories the work that runs only through the founder, assigns an owner and a finish date to each process, documents the procedures and ends with a 90-day operating roadmap the team executes without the founder in the room. Engagements are delivered in English or Spanish.',
      visual: { center: 'You', nodes: ['Sales', 'Delivery', 'Finance', 'Hiring'] },
      name: 'Startup Operations',
      meta: {
        title: 'Startup Operations Consulting | Dipriva Consulting Group',
        description:
          'Operations consulting for founders of companies with 10 to 500 employees: documented processes, clear owners and a 90-day roadmap, in English or Spanish.',
      },
      h1: 'Startup operations consulting that moves the business off your desk.',
      sub: 'You built the business. Now build the operating system. Dipriva gives founders of companies with 10 to 500 employees the structure to step back from day-to-day execution.',
      problem: {
        h2: 'Everything runs through you',
        body: 'Most founders of growing service firms reach the same wall. Revenue is up, the team is expanding, and yet every decision, every client issue and every internal process still lands on your desk. Stepping back feels impossible because there is no structure underneath you to hold it. That is not a leadership problem. It is an operations problem.',
      },
      deliver: {
        h2: 'What a startup operations engagement delivers',
        items: [
          { title: 'Process inventory', body: 'The work that runs only through you, written down task by task.' },
          { title: 'Ownership map', body: 'A named owner and a finish date for every process that leaves your desk.' },
          { title: 'Documented procedures', body: 'Steps your team can follow without asking you.' },
          { title: '90-day operating roadmap', body: 'The primary deliverable: a roadmap your team executes without you in the room.' },
        ],
        note: 'Every engagement is delivered in English or Spanish and concludes with one primary deliverable: the 90-day roadmap.',
      },
      fit: {
        h2: 'Who this is for',
        items: [
          'Founders of service businesses with 10 to 500 employees',
          'Companies where growth has outpaced internal structure and process',
          'Founders who need to delegate but have nothing documented to delegate',
          'Leadership teams preparing for a key hire, a funding round or an ownership transition',
        ],
      },
      faq: [
        {
          q: 'Is this only for startups?',
          a: 'No. Startup Operations is for any founder-led company with 10 to 500 employees whose operations still depend on the founder.',
        },
        {
          q: 'What is the main deliverable?',
          a: 'A 90-day operating roadmap your team executes without you in the room.',
        },
        startEn,
        { q: 'Can my team work in Spanish?', a: 'Yes. Every engagement is delivered in English or Spanish.' },
      ],
      cta: {
        h2: 'Move the work off your desk.',
        body: 'If your business depends entirely on you to function, that is the problem we solve. Start with a free 30-minute strategy session.',
      },
    },
    es: {
      slug: 'operaciones-de-startups',
      summary:
        'Dipriva Consulting Group ofrece consultoría en operaciones de startups para empresas de 10 a 500 empleados dirigidas por su fundador. Un proyecto documenta el trabajo que depende solo del fundador, asigna un responsable y una fecha de cierre a cada proceso, documenta los procedimientos y termina con una hoja de ruta operativa de 90 días que el equipo ejecuta sin el fundador en la sala. Se entrega en inglés o en español.',
      visual: { center: 'Usted', nodes: ['Ventas', 'Entrega', 'Finanzas', 'Personal'] },
      name: 'Operaciones de startups',
      meta: {
        title: 'Consultoría en operaciones de startups | Dipriva',
        description:
          'Consultoría en operaciones para fundadores de empresas de 10 a 500 empleados: procesos documentados, responsables claros y una hoja de ruta de 90 días.',
      },
      h1: 'Consultoría en operaciones de startups que saca el negocio de su escritorio.',
      sub: 'Usted construyó el negocio. Ahora construya el sistema operativo. Dipriva les da a los fundadores de empresas de 10 a 500 empleados la estructura para soltar la ejecución del día a día.',
      problem: {
        h2: 'Todo pasa por usted',
        body: 'La mayoría de los fundadores de empresas de servicios en crecimiento choca con el mismo muro. Los ingresos aumentan, el equipo crece y, aun así, cada decisión, cada problema de un cliente y cada proceso interno sigue llegando a su escritorio. Dar un paso atrás parece imposible porque no hay una estructura debajo que lo sostenga. Eso no es un problema de liderazgo. Es un problema de operaciones.',
      },
      deliver: {
        h2: 'Qué entrega un proyecto de operaciones de startups',
        items: [
          { title: 'Inventario de procesos', body: 'El trabajo que depende solo de usted, documentado tarea por tarea.' },
          { title: 'Mapa de responsables', body: 'Un responsable y una fecha de cierre para cada proceso que sale de su escritorio.' },
          { title: 'Procedimientos documentados', body: 'Pasos que su equipo puede seguir sin consultarle.' },
          {
            title: 'Hoja de ruta operativa de 90 días',
            body: 'El entregable principal: una hoja de ruta que su equipo ejecuta sin que usted esté en la sala.',
          },
        ],
        note: 'Cada proyecto se entrega en inglés o en español y concluye con un entregable principal: la hoja de ruta de 90 días.',
      },
      fit: {
        h2: 'Para quién es',
        items: [
          'Fundadores de empresas de servicios de 10 a 500 empleados',
          'Empresas donde el crecimiento superó la estructura interna y los procesos',
          'Fundadores que necesitan delegar, pero no tienen nada documentado para hacerlo',
          'Equipos directivos que se preparan para una contratación clave, una ronda de financiamiento o una transición de propiedad',
        ],
      },
      faq: [
        {
          q: '¿Es solo para startups?',
          a: 'No. Operaciones de startups es para cualquier empresa de 10 a 500 empleados dirigida por su fundador cuya operación todavía depende del fundador.',
        },
        {
          q: '¿Cuál es el entregable principal?',
          a: 'Una hoja de ruta operativa de 90 días que su equipo ejecuta sin que usted esté en la sala.',
        },
        startEs,
        { q: '¿Pueden trabajar en español con mi equipo?', a: 'Sí. Cada proyecto se entrega en inglés o en español.' },
      ],
      cta: {
        h2: 'Saque el trabajo de su escritorio.',
        body: 'Si su negocio depende completamente de usted para funcionar, ese es el problema que resolvemos. Empiece con una sesión estratégica gratuita de 30 minutos.',
      },
    },
  },
  {
    key: 'ai',
    cluster: 'AI and Automation',
    proof: [],
    tool: {
      path: { en: '/ai-automation/', es: '/es/ia-automatizacion/' },
      label: { en: 'Where to Automate First', es: 'Por dónde automatizar primero' },
      body: {
        en: 'Score the tasks your team repeats and find the one to automate first. Free in English and Spanish.',
        es: 'Califique las tareas que su equipo repite y encuentre la primera que conviene automatizar. Gratis en inglés y en español.',
      },
    },
    en: {
      slug: 'ai-automation',
      summary:
        'Dipriva Consulting Group provides AI and automation consulting for companies with 10 to 500 employees. An engagement starts with a workflow audit, ranks automation candidates by time returned and risk, deploys the automation and documents it so the team operates it independently, with human checks where an error is costly. Engagements are delivered in English or Spanish.',
      visual: { center: '', nodes: ['Task', 'Audit', 'Rank', 'Build', 'Ship'] },
      name: 'AI and Automation',
      meta: {
        title: 'AI and Automation Consulting | Dipriva Consulting Group',
        description:
          'AI and automation consulting for companies with 10 to 500 employees: a workflow audit, then automation deployed and documented for your team, in English or Spanish.',
      },
      h1: 'AI and automation consulting that eliminates operational drag.',
      sub: 'Eliminate the work that should not require you. Dipriva audits your highest-friction workflows and deploys AI and automation where they return the most time, with controls your team can trust.',
      problem: {
        h2: 'Operational drag is a revenue problem',
        body: 'Every hour your team spends on manual data entry, repetitive follow-up or disconnected handoffs is an hour not spent on execution that moves the business forward. Most owners know the drag exists. Few have the bandwidth to architect the fix. That is exactly what this engagement does.',
      },
      deliver: {
        h2: 'What an AI and automation engagement delivers',
        items: [
          { title: 'Workflow audit', body: 'Your highest-friction workflows, mapped task by task.' },
          { title: 'Ranked opportunities', body: 'Each candidate scored on time returned and risk, so the first build is the right one.' },
          { title: 'Deployed automation', body: 'Systems that reduce manual effort without adding complexity.' },
          {
            title: 'Documentation and controls',
            body: 'Documented automation your team operates independently, with checks where an error is costly.',
          },
        ],
        note: 'No theoretical frameworks. No vendor recommendations without implementation.',
      },
      fit: {
        h2: 'Who this is for',
        items: [
          'Owners whose teams spend significant time on manual, repeatable tasks',
          'Operations leaders managing disconnected tools and manual handoffs between systems',
          'Companies where administrative load has grown faster than headcount',
          'Founders who want AI in the business but do not know where to start without adding complexity',
        ],
      },
      faq: [
        {
          q: 'Where does an AI and automation engagement start?',
          a: 'With a workflow audit. Nothing gets automated until the process is clear enough to automate.',
        },
        {
          q: 'Do you only recommend tools?',
          a: 'No. Every engagement ends with deployed, documented automation your team operates independently.',
        },
        {
          q: 'How do you keep AI reliable?',
          a: 'With controls: documented steps, a named owner and a human check where an error is costly. Dipriva runs its own marketing the same way.',
        },
        startEn,
      ],
      cta: {
        h2: 'Eliminate the drag.',
        body: 'If your team is working hard but the business is not accelerating, operational drag is the most likely cause. Start with a free 30-minute strategy session.',
      },
    },
    es: {
      slug: 'ia-y-automatizacion',
      summary:
        'Dipriva Consulting Group ofrece consultoría en IA y automatización para empresas de 10 a 500 empleados. Un proyecto empieza con una auditoría de flujos de trabajo, prioriza las oportunidades por tiempo recuperado y riesgo, implementa la automatización y la documenta para que el equipo la opere de forma independiente, con verificaciones humanas donde un error es costoso. Se entrega en inglés o en español.',
      visual: { center: '', nodes: ['Tarea', 'Auditar', 'Priorizar', 'Construir', 'Entregar'] },
      name: 'IA y automatización',
      meta: {
        title: 'Consultoría en IA y automatización | Dipriva',
        description:
          'Consultoría en IA y automatización para empresas de 10 a 500 empleados: auditoría de flujos de trabajo y automatización implementada y documentada para su equipo.',
      },
      h1: 'Consultoría en IA y automatización que elimina la fricción operacional.',
      sub: 'Elimine el trabajo que no debería requerirlo a usted. Dipriva audita sus flujos de trabajo de mayor fricción e implementa IA y automatización donde más tiempo devuelven, con controles en los que su equipo puede confiar.',
      problem: {
        h2: 'La fricción operacional es un problema de ingresos',
        body: 'Cada hora que su equipo dedica a capturar datos, a seguimientos repetitivos o a traspasos desconectados es una hora que no dedica a la ejecución que hace avanzar el negocio. La mayoría de los dueños sabe que esa fricción existe. Pocos tienen el tiempo para diseñar la solución. Eso es exactamente lo que hace este proyecto.',
      },
      deliver: {
        h2: 'Qué entrega un proyecto de IA y automatización',
        items: [
          { title: 'Auditoría de flujos de trabajo', body: 'Sus flujos de mayor fricción, mapeados tarea por tarea.' },
          {
            title: 'Oportunidades priorizadas',
            body: 'Cada candidata calificada por tiempo recuperado y riesgo, para que la primera implementación sea la correcta.',
          },
          { title: 'Automatización implementada', body: 'Sistemas que reducen el esfuerzo manual sin agregar complejidad.' },
          {
            title: 'Documentación y controles',
            body: 'Automatización documentada que su equipo opera de forma independiente, con verificaciones donde un error es costoso.',
          },
        ],
        note: 'Sin marcos teóricos. Sin recomendaciones de proveedores sin implementación.',
      },
      fit: {
        h2: 'Para quién es',
        items: [
          'Dueños cuyos equipos dedican mucho tiempo a tareas manuales y repetibles',
          'Líderes de operaciones que gestionan herramientas desconectadas y traspasos manuales entre sistemas',
          'Empresas donde la carga administrativa creció más rápido que el equipo',
          'Fundadores que quieren IA en el negocio, pero no saben por dónde empezar sin agregar complejidad',
        ],
      },
      faq: [
        {
          q: '¿Dónde empieza un proyecto de IA y automatización?',
          a: 'Con una auditoría de flujos de trabajo. Nada se automatiza hasta que el proceso es lo bastante claro para automatizarlo.',
        },
        {
          q: '¿Solo recomiendan herramientas?',
          a: 'No. Cada proyecto termina con automatización implementada y documentada que su equipo opera de forma independiente.',
        },
        {
          q: '¿Cómo mantienen confiable la IA?',
          a: 'Con controles: pasos documentados, un responsable designado y una verificación humana donde un error es costoso. Dipriva opera su propio marketing de la misma forma.',
        },
        startEs,
      ],
      cta: {
        h2: 'Elimine la fricción.',
        body: 'Si su equipo trabaja duro pero el negocio no acelera, la fricción operacional es la causa más probable. Empiece con una sesión estratégica gratuita de 30 minutos.',
      },
    },
  },
];

export const serviceLabels = {
  en: {
    home: 'Home',
    services: 'Services',
    inShort: 'In short',
    problem: 'The problem',
    deliver: 'Deliverables',
    method: 'How it runs',
    fit: 'Who it is for',
    proof: 'Client results',
    practice: 'Proof of practice',
    practiceBody:
      'Dipriva runs its own marketing on governed AI: scheduled agents draft, automated checks gate every post, and staff reviews each one and can hold or veto it before it publishes.',
    practiceLink: 'See the full pipeline',
    tool: 'Free tool',
    getTool: 'Get the',
    faq: 'Questions',
    related: 'Related insights',
    others: 'Other services',
    cta: 'Schedule a Strategy Session',
    hubTitle: 'Consulting Services | Dipriva Consulting Group',
    hubDescription:
      'Corporate strategy, startup operations and AI and automation consulting for companies with 10 to 500 employees, delivered in English or Spanish.',
    hubH1: 'Consulting services for companies outgrowing their systems.',
    hubIntro:
      'Three service lines, one standard of execution. Every engagement starts with a free 30-minute strategy session and is built around a 90-day execution roadmap.',
    explore: 'Explore',
  },
  es: {
    home: 'Inicio',
    services: 'Servicios',
    inShort: 'En resumen',
    problem: 'El problema',
    deliver: 'Entregables',
    method: 'Cómo funciona',
    fit: 'Para quién es',
    proof: 'Resultados con clientes',
    practice: 'Prueba en la práctica',
    practiceBody:
      'Dipriva opera su propio marketing con IA gobernada: agentes programados redactan, controles automatizados validan cada publicación, y el personal la revisa y puede detenerla o vetarla antes de su difusión.',
    practiceLink: 'Vea el proceso completo',
    tool: 'Herramienta gratuita',
    getTool: 'Reciba:',
    faq: 'Preguntas',
    related: 'Análisis relacionados',
    others: 'Otros servicios',
    cta: 'Agende una sesión estratégica',
    hubTitle: 'Servicios de consultoría | Dipriva Consulting Group',
    hubDescription:
      'Consultoría en estrategia corporativa, operaciones de startups e IA y automatización para empresas de 10 a 500 empleados, en inglés o en español.',
    hubH1: 'Servicios de consultoría para empresas que crecen más rápido que sus sistemas.',
    hubIntro:
      'Tres líneas de servicio, un mismo estándar de ejecución. Cada proyecto empieza con una sesión estratégica gratuita de 30 minutos y se organiza en una hoja de ruta de ejecución de 90 días.',
    explore: 'Ver',
  },
} as const;
