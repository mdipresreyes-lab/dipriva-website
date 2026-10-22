/**
 * Privacy policy, English and Spanish. Ported sentence for sentence from the
 * live page (client/src/pages/Privacy.tsx). LinkedIn and Meta review this text
 * for app approval: do not drop, soften or add obligations.
 *
 * One change from the live text (2026-10-12), reworded 2026-10-21 with Manuel's
 * approval: social posts may be drafted with AI, pass automated brand and
 * compliance checks, and are reviewed by staff, who can hold or veto before
 * publication. The one sentence that describes it carries `approval`.
 *
 * One addition (2026-10-13), approved the same day: one paragraph on Microsoft
 * Bookings, which collects the name, email and phone a visitor enters.
 */
import type { Lang } from './copy';

/** A list item; `approval: true` marks the rewritten social approval wording. */
export type Item = string | { text: string; approval: true };

export type Block =
  /** A paragraph. `approval` is the rewritten social approval sentence that ends it. */
  | { kind: 'p'; text: string; approval?: string }
  | { kind: 'ul'; items: Item[] }
  /** Text, then a link, then closing text (for example a period). */
  | { kind: 'link'; text: string; href: string; label: string; after: string };

export type LegalSection = { id: string; title: string; blocks: Block[] };

export type Policy = {
  meta: { title: string; description: string };
  home: string;
  crumb: string;
  h1: string;
  lastUpdated: string;
  intro: string;
  /** Who the policy covers; also disambiguates the brand for search and AI engines. */
  identity: string;
  onThisPage: string;
  sections: LegalSection[];
};

export const PRIVACY_EMAIL = 'support@dipriva.com';

export const privacy: Record<Lang, Policy> = {
  en: {
    meta: {
      title: 'Privacy Policy | Dipriva Consulting Group',
      description:
        'How Dipriva Consulting Group collects, uses, stores and protects the information you provide through dipriva.com and its forms, and the choices you have.',
    },
    home: 'Home',
    crumb: 'Privacy Policy',
    h1: 'Privacy Policy',
    lastUpdated: 'Last updated: October 2026',
    intro:
      'Dipriva Consulting Group (“Dipriva,” “we,” “us”) respects your privacy. This policy explains what information we collect through dipriva.com and our intake forms, how we use it, where it is stored, and the choices you have.',
    identity:
      'This policy covers Dipriva Consulting Group, also known as Dipriva or Dipriva Consulting, the independent firm that operates dipriva.com. Dipriva Consulting Group is operated by Dipriva LLC, 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507. Dipriva is not affiliated with any company or product of a similar name, and information you give Dipriva is never shared with them.',
    onThisPage: 'On this page',
    sections: [
      {
        id: 'information-we-collect',
        title: 'Information We Collect',
        blocks: [
          { kind: 'p', text: 'We collect information only when you choose to provide it through one of our forms.' },
          {
            kind: 'p',
            text: 'Contact information (lead capture form). When you submit the contact form on our website, we collect:',
          },
          {
            kind: 'ul',
            items: ['First name', 'Last name', 'Email address', 'Phone number', 'A description of your business challenge'],
          },
          {
            kind: 'p',
            text: 'Business and financial information (client intake form). Clients who engage us and complete our intake form provide additional business information used to prepare their strategy. This may include business profile details and financial figures such as revenue, costs, cash reserves, debt, equity, marketing spend, and customer metrics. This information is collected only from clients who choose to complete the intake form as part of an engagement.',
          },
          {
            kind: 'p',
            text: 'If you book a strategy session through Microsoft Bookings, Microsoft Bookings collects the name, email address and phone number you enter, and Microsoft processes that information under its own privacy terms.',
          },
        ],
      },
      {
        id: 'download-requests',
        title: 'Download Requests and Insights Emails',
        blocks: [
          { kind: 'p', text: 'When you request a free download on dipriva.com, we collect:' },
          {
            kind: 'ul',
            items: [
              'Name',
              'Email address',
              'Business name',
              'Team size, if you choose to give it',
              'The challenges you select, and an optional one-line note',
              'Whether you ticked the insights box, and the version of the consent wording you saw',
              'The link or campaign that brought you to the page, when there is one',
            ],
          },
          {
            kind: 'p',
            text: 'We use these details to send your download and to reply to your request. We do not store your phone number or IP address with your request. Cloudflare Turnstile checks that each request comes from a person, and Cloudflare processes technical information about your browser for that check under its own privacy policy. The insights box is unticked by default. We send Dipriva insights emails only if you tick it, and every insights email includes a way to unsubscribe. Leaving the box unticked does not affect your download.',
          },
        ],
      },
      {
        id: 'chat-assistant',
        title: 'Chat Assistant (Lea)',
        blocks: [
          {
            kind: 'p',
            text: 'Lea is an AI assistant on dipriva.com, and Lea tells visitors it is an AI. What you type in the chat window is sent to an AI service provider so it can generate replies.',
          },
          {
            kind: 'p',
            text: 'If you ask to speak with our team, Lea asks for your business name, your name, your phone number and email address, your biggest business challenge in your own words, and any additional context you choose to share. We use this information only to prepare for and reply to your inquiry. It is sent by email to Dipriva’s founder through an email delivery provider and saved in a Microsoft 365 list that Dipriva uses to manage inquiries.',
          },
          {
            kind: 'p',
            text: 'To limit abuse, the chat service temporarily uses your IP address to count messages for one hour. To ask for access to or deletion of what you shared, email support@dipriva.com.',
          },
        ],
      },
      {
        id: 'how-we-use-your-information',
        title: 'How We Use Your Information',
        blocks: [
          { kind: 'p', text: 'We use the information you provide to:' },
          {
            kind: 'ul',
            items: [
              'Contact you to schedule and conduct a strategy session',
              'Understand your business challenges and needs',
              'Analyze your business and financial information to prepare your growth strategy and tailored recommendations',
              'Follow up on your inquiry',
              'Deliver and support our consulting services',
            ],
          },
          { kind: 'p', text: 'We do not use your information for any purpose unrelated to the services you request.' },
        ],
      },
      {
        id: 'business-outreach',
        title: 'Business outreach',
        blocks: [
          {
            kind: 'p',
            text: 'We may contact business owners and executives whose contact details are published in public sources. We use only business contact details, store them in our secure business systems, and stop contacting anyone who replies UNSUBSCRIBE or asks us to stop. You can also ask us to delete your details at support@dipriva.com.',
          },
        ],
      },
      {
        id: 'ai-and-automation',
        title: 'AI and Automation',
        blocks: [
          {
            kind: 'p',
            text: 'Consistent with our work in AI and automation, we use AI-assisted tools to help analyze business and financial information and to help prepare strategy deliverables.',
          },
          {
            kind: 'ul',
            items: [
              'All output produced with these tools is reviewed by a member of our team before it is used or shared. No decisions affecting you are made solely by automated means.',
              'Information processed with these tools is handled under commercial terms that include confidentiality and data-protection commitments.',
            ],
          },
        ],
      },
      {
        id: 'social-media-publishing',
        title: 'Social Media Publishing',
        blocks: [
          {
            kind: 'p',
            text: 'Dipriva publishes its own content to its official social media accounts on LinkedIn, Facebook, Instagram, and TikTok. We use an internal publishing tool, Dipriva Community Engine, that connects to these platforms through their official application programming interfaces (APIs).',
          },
          {
            kind: 'p',
            text: 'When an authorized Dipriva administrator connects a Dipriva account to this tool, the platform asks the administrator to approve specific permissions. We use those permissions to publish content we have prepared to Dipriva’s own pages and profiles.',
            approval:
              'Social posts may be drafted with AI. Each post passes automated brand and compliance checks, and staff reviews it and can hold or veto before it is published.',
          },
          { kind: 'p', text: 'What this means for you:' },
          {
            kind: 'ul',
            items: [
              'We do not use these integrations to collect personal information about the people who view, follow, or engage with our posts.',
              'We do not use data obtained through these platforms for advertising targeting, sales prospecting, recruiting, or building audience lists.',
              'Access credentials issued by these platforms are kept in encrypted secret storage, are limited to authorized personnel, and are revoked when no longer needed.',
              'Where a platform offers a label for AI-generated content, we apply it.',
            ],
          },
          {
            kind: 'p',
            text: 'Each platform processes information under its own terms and privacy policy. To request deletion of any information we hold that relates to our social media accounts, contact support@dipriva.com. We process deletion requests within 30 days.',
          },
        ],
      },
      {
        id: 'data-storage',
        title: 'Data Storage',
        blocks: [
          {
            kind: 'p',
            text: 'Your information is stored securely within enterprise-grade, third-party cloud services used under commercial terms that include data-protection and confidentiality commitments. Access is limited to authorized personnel who need it to serve you.',
          },
        ],
      },
      {
        id: 'how-we-protect-your-information',
        title: 'How We Protect Your Information',
        blocks: [
          {
            kind: 'p',
            text: 'Your data is never sold. We do not share your information with data brokers or provide it to external organizations for their own marketing.',
          },
          {
            kind: 'p',
            text: 'We share information only with the service providers who help us operate, and only as needed to deliver our services. These providers process information on our behalf under their own terms and confidentiality obligations. They fall into the following categories:',
          },
          {
            kind: 'ul',
            items: [
              'Cloud storage and productivity services (where your submissions and files are stored)',
              'AI processing tools (used as described in the AI and Automation section)',
              'Website analytics and advertising services (described in the Analytics section)',
              'Spam protection for our forms (Cloudflare Turnstile)',
            ],
          },
          { kind: 'p', text: 'Some of these providers may transfer and store data on servers located outside your country.' },
        ],
      },
      {
        id: 'data-retention',
        title: 'Data Retention',
        blocks: [
          {
            kind: 'p',
            text: 'We keep your information only as long as needed for the purposes described in this policy. Contact information is retained while we follow up on your inquiry and maintain our relationship. Business and financial information provided by clients is retained for the duration of the engagement and for 24 months afterward, unless a longer period is required by law, after which it is deleted.',
          },
          {
            kind: 'p',
            text: 'We keep download and newsletter information for 24 months after your last activity, chat transcripts for 12 months, and business outreach records for 12 months after our last contact. If you unsubscribe, we keep a minimal record so we do not contact you again. We delete data on request within 30 days, except records we must keep by law, such as contracts and invoices. Deleted data clears from our encrypted backups within 30 days.',
          },
        ],
      },
      {
        id: 'analytics',
        title: 'Analytics',
        blocks: [
          {
            kind: 'p',
            text: 'This website uses Google Analytics 4 (GA4), a web analytics service provided by Google LLC. GA4 uses cookies and similar tracking technologies to collect and analyze information about how visitors use this site. This data includes pages visited, time spent on the site, general geographic location, device type, and how you arrived at the site.',
          },
          {
            kind: 'p',
            text: 'This information is used solely to understand visitor behavior and improve the performance of dipriva.com. We do not sell this data or use it to personally identify you.',
          },
          {
            kind: 'link',
            text: 'Google may transfer and store this data on servers located outside your country. You can review Google’s privacy practices at',
            href: 'https://policies.google.com/privacy',
            label: 'https://policies.google.com/privacy',
            after: '.',
          },
          {
            kind: 'link',
            text: 'To opt out of Google Analytics tracking, you can install the Google Analytics Opt-Out Browser Add-On at',
            href: 'https://tools.google.com/dlpage/gaoptout',
            label: 'https://tools.google.com/dlpage/gaoptout',
            after: '.',
          },
          {
            kind: 'link',
            text: 'This website may also use Google Ads remarketing, which allows us to show advertisements to previous visitors as they browse other websites and apps within the Google Display Network. These ads are served based on your prior visit to dipriva.com using cookies stored on your device. You can opt out of personalized advertising by visiting Google’s Ads Settings or by using the NAI opt-out tool at',
            href: 'https://optout.networkadvertising.org',
            label: 'https://optout.networkadvertising.org',
            after: '.',
          },
          {
            kind: 'link',
            text: 'This website may also use Microsoft Clarity, a behavior analytics service provided by Microsoft Corporation. Clarity collects information such as pages visited, clicks, scrolling, and session recordings to help us understand how visitors use the site and improve it. Clarity loads only after you accept analytics cookies. You can review Microsoft’s privacy practices at',
            href: 'https://privacy.microsoft.com/privacystatement',
            label: 'https://privacy.microsoft.com/privacystatement',
            after: '.',
          },
        ],
      },
      {
        id: 'your-rights',
        title: 'Your Rights and Choices',
        blocks: [
          {
            kind: 'link',
            text: 'You may request access to, correction of, or deletion of your personal information at any time by contacting',
            href: `mailto:${PRIVACY_EMAIL}`,
            label: PRIVACY_EMAIL,
            after: '. We will process deletion requests within 30 days.',
          },
        ],
      },
      {
        id: 'changes',
        title: 'Changes to This Policy',
        blocks: [
          {
            kind: 'p',
            text: 'We may update this policy as our practices evolve. The “Last updated” date above reflects the most recent revision.',
          },
        ],
      },
      {
        id: 'questions',
        title: 'Questions',
        blocks: [
          {
            kind: 'link',
            text: 'If you have any questions about this privacy policy or our data practices, contact us at',
            href: `mailto:${PRIVACY_EMAIL}`,
            label: PRIVACY_EMAIL,
            after: '.',
          },
        ],
      },
    ],
  },

  es: {
    meta: {
      title: 'Política de privacidad | Dipriva Consulting Group',
      description:
        'Cómo Dipriva Consulting Group recopila, usa, almacena y protege la información que usted proporciona a través de dipriva.com y sus formularios, y qué opciones tiene.',
    },
    home: 'Inicio',
    crumb: 'Política de privacidad',
    h1: 'Política de privacidad',
    lastUpdated: 'Última actualización: octubre de 2026',
    intro:
      'Dipriva Consulting Group (“Dipriva”, “nosotros”) respeta su privacidad. Esta política explica qué información recopilamos a través de dipriva.com y de nuestros formularios, cómo la usamos, dónde se almacena y qué opciones tiene usted.',
    identity:
      'Esta política cubre a Dipriva Consulting Group, también conocida como Dipriva o Dipriva Consulting, la firma independiente que opera dipriva.com. Dipriva Consulting Group es operada por Dipriva LLC, 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507. Dipriva no tiene ninguna relación con empresas o productos de nombre similar, y la información que usted comparte con Dipriva nunca se comparte con ellos.',
    onThisPage: 'En esta página',
    sections: [
      {
        id: 'informacion-que-recopilamos',
        title: 'Información que recopilamos',
        blocks: [
          {
            kind: 'p',
            text: 'Recopilamos información únicamente cuando usted decide proporcionarla a través de uno de nuestros formularios.',
          },
          {
            kind: 'p',
            text: 'Información de contacto (formulario de captación). Cuando usted envía el formulario de contacto en nuestro sitio web, recopilamos:',
          },
          {
            kind: 'ul',
            items: ['Nombre', 'Apellido', 'Correo electrónico', 'Número de teléfono', 'Una descripción de su desafío empresarial'],
          },
          {
            kind: 'p',
            text: 'Información empresarial y financiera (formulario de cliente). Los clientes que nos contratan y completan nuestro formulario de admisión proporcionan información empresarial adicional que se utiliza para preparar su estrategia. Esto puede incluir datos del perfil del negocio y cifras financieras como ingresos, costos, reservas de efectivo, deuda, patrimonio neto, gasto en marketing y métricas de clientes. Esta información se recopila únicamente de los clientes que deciden completar el formulario como parte de un servicio contratado.',
          },
          {
            kind: 'p',
            text: 'Si usted reserva una sesión de estrategia a través de Microsoft Bookings, Microsoft Bookings recopila el nombre, el correo electrónico y el número de teléfono que usted ingresa, y Microsoft procesa esa información conforme a sus propios términos de privacidad.',
          },
        ],
      },
      {
        id: 'solicitudes-de-descarga',
        title: 'Solicitudes de descarga y correos de ideas',
        blocks: [
          { kind: 'p', text: 'Cuando usted solicita una descarga gratuita en dipriva.com, recopilamos:' },
          {
            kind: 'ul',
            items: [
              'Nombre',
              'Correo electrónico',
              'Nombre del negocio',
              'Tamaño del equipo, si decide indicarlo',
              'Los desafíos que seleccione y una nota opcional de una línea',
              'Si marcó la casilla de ideas y la versión del texto de consentimiento que vio',
              'El enlace o la campaña que le trajo a la página, cuando lo haya',
            ],
          },
          {
            kind: 'p',
            text: 'Usamos estos datos para enviarle su descarga y responder a su solicitud. No guardamos su número de teléfono ni su dirección IP con su solicitud. Cloudflare Turnstile verifica que cada solicitud provenga de una persona, y Cloudflare procesa información técnica de su navegador para esa verificación conforme a su propia política de privacidad. La casilla de ideas aparece sin marcar. Solo le enviamos correos de ideas de Dipriva si usted la marca, y cada uno incluye una forma de darse de baja. Dejar la casilla sin marcar no afecta su descarga.',
          },
        ],
      },
      {
        id: 'asistente-de-chat',
        title: 'Asistente de chat (Lea)',
        blocks: [
          {
            kind: 'p',
            text: 'Lea es una asistente de IA en dipriva.com, y Lea informa a los visitantes de que es una IA. Lo que usted escribe en la ventana de chat se envía a un proveedor de servicios de IA para generar las respuestas.',
          },
          {
            kind: 'p',
            text: 'Si usted solicita hablar con nuestro equipo, Lea le pide el nombre de su negocio, su nombre, su número de teléfono y correo electrónico, su mayor desafío empresarial en sus propias palabras y cualquier contexto adicional que decida compartir. Usamos esta información solo para preparar y responder a su consulta. Se envía por correo electrónico al fundador de Dipriva mediante un proveedor de envío de correos y se guarda en una lista de Microsoft 365 que Dipriva utiliza para gestionar las consultas.',
          },
          {
            kind: 'p',
            text: 'Para limitar el abuso, el servicio de chat utiliza temporalmente su dirección IP para contar los mensajes durante una hora. Para solicitar acceso a lo que compartió, o su eliminación, escriba a support@dipriva.com.',
          },
        ],
      },
      {
        id: 'como-usamos-su-informacion',
        title: 'Cómo usamos su información',
        blocks: [
          { kind: 'p', text: 'Usamos la información que usted proporciona para:' },
          {
            kind: 'ul',
            items: [
              'Contactarle para programar y llevar a cabo una sesión de estrategia',
              'Comprender sus desafíos y necesidades empresariales',
              'Analizar su información empresarial y financiera para preparar su estrategia de crecimiento y recomendaciones personalizadas',
              'Dar seguimiento a su consulta',
              'Prestar y respaldar nuestros servicios de consultoría',
            ],
          },
          { kind: 'p', text: 'No usamos su información para ningún fin ajeno a los servicios que usted solicita.' },
        ],
      },
      {
        id: 'contacto-comercial',
        title: 'Contacto comercial',
        blocks: [
          {
            kind: 'p',
            text: 'Podemos contactar a propietarios y ejecutivos de empresas cuyos datos de contacto estén publicados en fuentes públicas. Utilizamos únicamente datos de contacto comercial, los almacenamos en nuestros sistemas empresariales seguros y dejamos de contactar a cualquier persona que responda con la palabra UNSUBSCRIBE o nos pida que dejemos de hacerlo. Usted también puede solicitar la eliminación de sus datos escribiendo a support@dipriva.com.',
          },
        ],
      },
      {
        id: 'inteligencia-artificial-y-automatizacion',
        title: 'Inteligencia artificial y automatización',
        blocks: [
          {
            kind: 'p',
            text: 'En línea con nuestro trabajo en inteligencia artificial y automatización, utilizamos herramientas asistidas por IA para ayudar a analizar información empresarial y financiera y para preparar los entregables de estrategia.',
          },
          {
            kind: 'ul',
            items: [
              'Todo resultado producido con estas herramientas es revisado por un miembro de nuestro equipo antes de usarse o compartirse. Ninguna decisión que le afecte se toma de forma únicamente automatizada.',
              'La información procesada con estas herramientas se maneja bajo términos comerciales que incluyen compromisos de confidencialidad y de protección de datos.',
            ],
          },
        ],
      },
      {
        id: 'publicacion-en-redes-sociales',
        title: 'Publicación en redes sociales',
        blocks: [
          {
            kind: 'p',
            text: 'Dipriva publica su propio contenido en sus cuentas oficiales de redes sociales en LinkedIn, Facebook, Instagram y TikTok. Utilizamos una herramienta interna de publicación, Dipriva Community Engine, que se conecta a estas plataformas mediante sus interfaces de programación de aplicaciones (API) oficiales.',
          },
          {
            kind: 'p',
            text: 'Cuando un administrador autorizado de Dipriva conecta una cuenta de Dipriva a esta herramienta, la plataforma solicita al administrador que apruebe permisos específicos. Utilizamos esos permisos para publicar el contenido que hemos preparado en las páginas y perfiles propios de Dipriva.',
            approval:
              'Las publicaciones en redes sociales pueden redactarse con IA. Cada publicación supera controles automatizados de marca y cumplimiento, y el personal la revisa y puede detenerla o vetarla antes de su difusión.',
          },
          { kind: 'p', text: 'Lo que esto significa para usted:' },
          {
            kind: 'ul',
            items: [
              'No utilizamos estas integraciones para recopilar información personal de las personas que ven, siguen o interactúan con nuestras publicaciones.',
              'No utilizamos los datos obtenidos a través de estas plataformas para segmentación publicitaria, prospección de ventas, reclutamiento ni para crear listas de audiencia.',
              'Las credenciales de acceso que emiten estas plataformas se conservan en almacenamiento cifrado de secretos, se limitan al personal autorizado y se revocan cuando dejan de ser necesarias.',
              'Cuando una plataforma ofrece una etiqueta para contenido generado por IA, la aplicamos.',
            ],
          },
          {
            kind: 'p',
            text: 'Cada plataforma procesa la información conforme a sus propios términos y política de privacidad. Para solicitar la eliminación de cualquier información que conservemos relacionada con nuestras cuentas de redes sociales, escriba a support@dipriva.com. Procesamos las solicitudes de eliminación en un plazo de 30 días.',
          },
        ],
      },
      {
        id: 'almacenamiento-de-datos',
        title: 'Almacenamiento de datos',
        blocks: [
          {
            kind: 'p',
            text: 'Su información se almacena de forma segura en servicios de nube de terceros de nivel empresarial, utilizados bajo términos comerciales que incluyen compromisos de protección de datos y confidencialidad. El acceso se limita al personal autorizado que lo necesita para atenderle.',
          },
        ],
      },
      {
        id: 'como-protegemos-su-informacion',
        title: 'Cómo protegemos su información',
        blocks: [
          {
            kind: 'p',
            text: 'Sus datos nunca se venden. No compartimos su información con intermediarios de datos ni la entregamos a organizaciones externas para su propio marketing.',
          },
          {
            kind: 'p',
            text: 'Compartimos información únicamente con los proveedores de servicios que nos ayudan a operar, y solo en la medida necesaria para prestar nuestros servicios. Estos proveedores procesan la información en nuestro nombre, bajo sus propios términos y obligaciones de confidencialidad. Se agrupan en las siguientes categorías:',
          },
          {
            kind: 'ul',
            items: [
              'Servicios de almacenamiento en la nube y de productividad (donde se guardan sus envíos y archivos)',
              'Herramientas de procesamiento con IA (utilizadas según se describe en la sección de Inteligencia artificial y automatización)',
              'Servicios de analítica web y de publicidad (descritos en la sección de Analítica)',
              'Protección contra spam en nuestros formularios (Cloudflare Turnstile)',
            ],
          },
          {
            kind: 'p',
            text: 'Algunos de estos proveedores pueden transferir y almacenar datos en servidores ubicados fuera de su país.',
          },
        ],
      },
      {
        id: 'conservacion-de-datos',
        title: 'Conservación de datos',
        blocks: [
          {
            kind: 'p',
            text: 'Conservamos su información solo durante el tiempo necesario para los fines descritos en esta política. La información de contacto se conserva mientras damos seguimiento a su consulta y mantenemos nuestra relación. La información empresarial y financiera proporcionada por los clientes se conserva durante la vigencia del servicio y por 24 meses posteriores, salvo que la ley exija un plazo mayor, tras lo cual se elimina.',
          },
          {
            kind: 'p',
            text: 'Conservamos la información de descargas y boletines durante 24 meses después de su última actividad, las transcripciones de chat durante 12 meses y los registros de contacto comercial durante 12 meses después de nuestro último contacto. Si usted se da de baja, conservamos un registro mínimo para no volver a contactarle. Eliminamos los datos a solicitud en un plazo de 30 días, salvo los registros que la ley nos obligue a conservar, como contratos y facturas. Los datos eliminados se borran de nuestras copias de seguridad cifradas en un plazo de 30 días.',
          },
        ],
      },
      {
        id: 'analitica',
        title: 'Analítica',
        blocks: [
          {
            kind: 'p',
            text: 'Este sitio web utiliza Google Analytics 4 (GA4), un servicio de analítica web proporcionado por Google LLC. GA4 utiliza cookies y tecnologías de seguimiento similares para recopilar y analizar información sobre cómo los visitantes usan este sitio. Estos datos incluyen las páginas visitadas, el tiempo en el sitio, la ubicación geográfica general, el tipo de dispositivo y cómo llegó usted al sitio.',
          },
          {
            kind: 'p',
            text: 'Esta información se usa únicamente para comprender el comportamiento de los visitantes y mejorar el rendimiento de dipriva.com. No vendemos estos datos ni los usamos para identificarle personalmente.',
          },
          {
            kind: 'link',
            text: 'Google puede transferir y almacenar estos datos en servidores ubicados fuera de su país. Puede revisar las prácticas de privacidad de Google en',
            href: 'https://policies.google.com/privacy',
            label: 'https://policies.google.com/privacy',
            after: '.',
          },
          {
            kind: 'link',
            text: 'Para excluirse del seguimiento de Google Analytics, puede instalar el complemento de exclusión de Google Analytics para el navegador en',
            href: 'https://tools.google.com/dlpage/gaoptout',
            label: 'https://tools.google.com/dlpage/gaoptout',
            after: '.',
          },
          {
            kind: 'link',
            text: 'Este sitio web también puede utilizar remarketing de Google Ads, que nos permite mostrar anuncios a visitantes anteriores mientras navegan por otros sitios web y aplicaciones dentro de la Red de Display de Google. Estos anuncios se muestran en función de su visita previa a dipriva.com mediante cookies almacenadas en su dispositivo. Puede excluirse de la publicidad personalizada visitando la Configuración de anuncios de Google o usando la herramienta de exclusión de la NAI en',
            href: 'https://optout.networkadvertising.org',
            label: 'https://optout.networkadvertising.org',
            after: '.',
          },
          {
            kind: 'link',
            text: 'Este sitio web también puede utilizar Microsoft Clarity, un servicio de analítica de comportamiento proporcionado por Microsoft Corporation. Clarity recopila información como las páginas visitadas, los clics, el desplazamiento y las grabaciones de sesión para ayudarnos a comprender cómo los visitantes usan el sitio y mejorarlo. Clarity se carga solo después de que usted acepta las cookies de analítica. Puede revisar las prácticas de privacidad de Microsoft en',
            href: 'https://privacy.microsoft.com/privacystatement',
            label: 'https://privacy.microsoft.com/privacystatement',
            after: '.',
          },
        ],
      },
      {
        id: 'sus-derechos-y-opciones',
        title: 'Sus derechos y opciones',
        blocks: [
          {
            kind: 'link',
            text: 'Usted puede solicitar el acceso, la corrección o la eliminación de su información personal en cualquier momento escribiendo a',
            href: `mailto:${PRIVACY_EMAIL}`,
            label: PRIVACY_EMAIL,
            after: '. Procesaremos las solicitudes de eliminación en un plazo de 30 días.',
          },
        ],
      },
      {
        id: 'cambios-en-esta-politica',
        title: 'Cambios en esta política',
        blocks: [
          {
            kind: 'p',
            text: 'Podemos actualizar esta política a medida que evolucionen nuestras prácticas. La fecha de “Última actualización” indicada arriba refleja la revisión más reciente.',
          },
        ],
      },
      {
        id: 'preguntas',
        title: 'Preguntas',
        blocks: [
          {
            kind: 'link',
            text: 'Si tiene alguna pregunta sobre esta política de privacidad o sobre nuestras prácticas de datos, contáctenos en',
            href: `mailto:${PRIVACY_EMAIL}`,
            label: PRIVACY_EMAIL,
            after: '.',
          },
        ],
      },
    ],
  },
};
