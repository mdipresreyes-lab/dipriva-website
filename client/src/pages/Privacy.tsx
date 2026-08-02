import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/translations';

const privacyContent = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: August 2026',
    backToHome: '\u2190 Back to Home',
    intro: 'Dipriva Consulting Group (\u201cDipriva,\u201d \u201cwe,\u201d \u201cus\u201d) respects your privacy. This policy explains what information we collect through dipriva.com and our intake forms, how we use it, where it is stored, and the choices you have.',
    sections: [
      {
        title: 'Information We Collect',
        paragraphs: [
          'We collect information only when you choose to provide it through one of our forms.',
          'Contact information (lead capture form). When you submit the contact form on our website, we collect:',
        ],
        items: ['First name', 'Last name', 'Email address', 'Phone number', 'A description of your business challenge'],
        afterItems: 'Business and financial information (client intake form). Clients who engage us and complete our intake form provide additional business information used to prepare their strategy. This may include business profile details and financial figures such as revenue, costs, cash reserves, debt, equity, marketing spend, and customer metrics. This information is collected only from clients who choose to complete the intake form as part of an engagement.',
      },
      {
        title: 'How We Use Your Information',
        paragraphs: ['We use the information you provide to:'],
        items: [
          'Contact you to schedule and conduct a strategy session',
          'Understand your business challenges and needs',
          'Analyze your business and financial information to prepare your growth strategy and tailored recommendations',
          'Follow up on your inquiry',
          'Deliver and support our consulting services',
        ],
        afterItems: 'We do not use your information for any purpose unrelated to the services you request.',
      },
      {
        title: 'AI and Automation',
        paragraphs: [
          'Consistent with our work in AI and automation, we use AI-assisted tools to help analyze business and financial information and to help prepare strategy deliverables.',
        ],
        items: [
          'All output produced with these tools is reviewed by a member of our team before it is used or shared. No decisions affecting you are made solely by automated means.',
          'Information processed with these tools is handled under commercial terms that include confidentiality and data-protection commitments.',
        ],
      },
      {
        title: 'Data Storage',
        paragraphs: [
          'Your information is stored securely within enterprise-grade, third-party cloud services used under commercial terms that include data-protection and confidentiality commitments. Access is limited to authorized personnel who need it to serve you.',
        ],
      },
      {
        title: 'How We Protect Your Information',
        paragraphs: [
          'Your data is never sold. We do not share your information with data brokers or provide it to external organizations for their own marketing.',
          'We share information only with the service providers who help us operate, and only as needed to deliver our services. These providers process information on our behalf under their own terms and confidentiality obligations. They fall into the following categories:',
        ],
        items: [
          'Cloud storage and productivity services (where your submissions and files are stored)',
          'AI processing tools (used as described in the AI and Automation section)',
          'Website analytics and advertising services (described in the Analytics section)',
        ],
        afterItems: 'Some of these providers may transfer and store data on servers located outside your country.',
      },
      {
        title: 'Data Retention',
        paragraphs: [
          'We keep your information only as long as needed for the purposes described in this policy. Contact information is retained while we follow up on your inquiry and maintain our relationship. Business and financial information provided by clients is retained for the duration of the engagement and for 24 months afterward, unless a longer period is required by law, after which it is deleted.',
        ],
      },
    ],
    analytics: {
      title: 'Analytics',
      paragraphs: [
        'This website uses Google Analytics 4 (GA4), a web analytics service provided by Google LLC. GA4 uses cookies and similar tracking technologies to collect and analyze information about how visitors use this site. This data includes pages visited, time spent on the site, general geographic location, device type, and how you arrived at the site.',
        'This information is used solely to understand visitor behavior and improve the performance of dipriva.com. We do not sell this data or use it to personally identify you.',
      ],
      googlePrivacy: {
        text: 'Google may transfer and store this data on servers located outside your country. You can review Google\u2019s privacy practices at',
        url: 'https://policies.google.com/privacy',
      },
      optOut: {
        text: 'To opt out of Google Analytics tracking, you can install the Google Analytics Opt-Out Browser Add-On at',
        url: 'https://tools.google.com/dlpage/gaoptout',
      },
      remarketing: {
        text: 'This website also uses Google Ads remarketing, which allows us to show advertisements to previous visitors as they browse other websites and apps within the Google Display Network. These ads are served based on your prior visit to dipriva.com using cookies stored on your device. You can opt out of personalized advertising by visiting Google\u2019s Ads Settings or by using the NAI opt-out tool at',
        url: 'https://optout.networkadvertising.org',
      },
    },
    rights: {
      title: 'Your Rights and Choices',
      content: 'You may request access to, correction of, or deletion of your personal information at any time by contacting',
      email: 'manuel@dipriva.com',
      afterEmail: '. We will process deletion requests within 30 days.',
    },
    changes: {
      title: 'Changes to This Policy',
      content: 'We may update this policy as our practices evolve. The \u201cLast updated\u201d date above reflects the most recent revision.',
    },
    questions: {
      title: 'Questions',
      content: 'If you have any questions about this privacy policy or our data practices, contact us at',
      email: 'manuel@dipriva.com',
    },
  },
  es: {
    title: 'Pol\u00edtica de Privacidad',
    lastUpdated: '\u00daltima actualizaci\u00f3n: agosto de 2026',
    backToHome: '\u2190 Volver al Inicio',
    intro: 'Dipriva Consulting Group (\u201cDipriva\u201d, \u201cnosotros\u201d) respeta su privacidad. Esta pol\u00edtica explica qu\u00e9 informaci\u00f3n recopilamos a trav\u00e9s de dipriva.com y de nuestros formularios, c\u00f3mo la usamos, d\u00f3nde se almacena y qu\u00e9 opciones tiene usted.',
    sections: [
      {
        title: 'Informaci\u00f3n que recopilamos',
        paragraphs: [
          'Recopilamos informaci\u00f3n \u00fanicamente cuando usted decide proporcionarla a trav\u00e9s de uno de nuestros formularios.',
          'Informaci\u00f3n de contacto (formulario de captaci\u00f3n). Cuando usted env\u00eda el formulario de contacto en nuestro sitio web, recopilamos:',
        ],
        items: ['Nombre', 'Apellido', 'Correo electr\u00f3nico', 'N\u00famero de tel\u00e9fono', 'Una descripci\u00f3n de su desaf\u00edo empresarial'],
        afterItems: 'Informaci\u00f3n empresarial y financiera (formulario de cliente). Los clientes que nos contratan y completan nuestro formulario de admisi\u00f3n proporcionan informaci\u00f3n empresarial adicional que se utiliza para preparar su estrategia. Esto puede incluir datos del perfil del negocio y cifras financieras como ingresos, costos, reservas de efectivo, deuda, patrimonio neto, gasto en marketing y m\u00e9tricas de clientes. Esta informaci\u00f3n se recopila \u00fanicamente de los clientes que deciden completar el formulario como parte de un servicio contratado.',
      },
      {
        title: 'C\u00f3mo usamos su informaci\u00f3n',
        paragraphs: ['Usamos la informaci\u00f3n que usted proporciona para:'],
        items: [
          'Contactarle para programar y llevar a cabo una sesi\u00f3n de estrategia',
          'Comprender sus desaf\u00edos y necesidades empresariales',
          'Analizar su informaci\u00f3n empresarial y financiera para preparar su estrategia de crecimiento y recomendaciones personalizadas',
          'Dar seguimiento a su consulta',
          'Prestar y respaldar nuestros servicios de consultor\u00eda',
        ],
        afterItems: 'No usamos su informaci\u00f3n para ning\u00fan fin ajeno a los servicios que usted solicita.',
      },
      {
        title: 'Inteligencia artificial y automatizaci\u00f3n',
        paragraphs: [
          'En l\u00ednea con nuestro trabajo en inteligencia artificial y automatizaci\u00f3n, utilizamos herramientas asistidas por IA para ayudar a analizar informaci\u00f3n empresarial y financiera y para preparar los entregables de estrategia.',
        ],
        items: [
          'Todo resultado producido con estas herramientas es revisado por un miembro de nuestro equipo antes de usarse o compartirse. Ninguna decisi\u00f3n que le afecte se toma de forma \u00fanicamente automatizada.',
          'La informaci\u00f3n procesada con estas herramientas se maneja bajo t\u00e9rminos comerciales que incluyen compromisos de confidencialidad y de protecci\u00f3n de datos.',
        ],
      },
      {
        title: 'Almacenamiento de datos',
        paragraphs: [
          'Su informaci\u00f3n se almacena de forma segura en servicios de nube de terceros de nivel empresarial, utilizados bajo t\u00e9rminos comerciales que incluyen compromisos de protecci\u00f3n de datos y confidencialidad. El acceso se limita al personal autorizado que lo necesita para atenderle.',
        ],
      },
      {
        title: 'C\u00f3mo protegemos su informaci\u00f3n',
        paragraphs: [
          'Sus datos nunca se venden. No compartimos su informaci\u00f3n con intermediarios de datos ni la entregamos a organizaciones externas para su propio marketing.',
          'Compartimos informaci\u00f3n \u00fanicamente con los proveedores de servicios que nos ayudan a operar, y solo en la medida necesaria para prestar nuestros servicios. Estos proveedores procesan la informaci\u00f3n en nuestro nombre, bajo sus propios t\u00e9rminos y obligaciones de confidencialidad. Se agrupan en las siguientes categor\u00edas:',
        ],
        items: [
          'Servicios de almacenamiento en la nube y de productividad (donde se guardan sus env\u00edos y archivos)',
          'Herramientas de procesamiento con IA (utilizadas seg\u00fan se describe en la secci\u00f3n de Inteligencia artificial y automatizaci\u00f3n)',
          'Servicios de anal\u00edtica web y de publicidad (descritos en la secci\u00f3n de Anal\u00edtica)',
        ],
        afterItems: 'Algunos de estos proveedores pueden transferir y almacenar datos en servidores ubicados fuera de su pa\u00eds.',
      },
      {
        title: 'Conservaci\u00f3n de datos',
        paragraphs: [
          'Conservamos su informaci\u00f3n solo durante el tiempo necesario para los fines descritos en esta pol\u00edtica. La informaci\u00f3n de contacto se conserva mientras damos seguimiento a su consulta y mantenemos nuestra relaci\u00f3n. La informaci\u00f3n empresarial y financiera proporcionada por los clientes se conserva durante la vigencia del servicio y por 24 meses posteriores, salvo que la ley exija un plazo mayor, tras lo cual se elimina.',
        ],
      },
    ],
    analytics: {
      title: 'Anal\u00edtica',
      paragraphs: [
        'Este sitio web utiliza Google Analytics 4 (GA4), un servicio de anal\u00edtica web proporcionado por Google LLC. GA4 utiliza cookies y tecnolog\u00edas de seguimiento similares para recopilar y analizar informaci\u00f3n sobre c\u00f3mo los visitantes usan este sitio. Estos datos incluyen las p\u00e1ginas visitadas, el tiempo en el sitio, la ubicaci\u00f3n geogr\u00e1fica general, el tipo de dispositivo y c\u00f3mo lleg\u00f3 usted al sitio.',
        'Esta informaci\u00f3n se usa \u00fanicamente para comprender el comportamiento de los visitantes y mejorar el rendimiento de dipriva.com. No vendemos estos datos ni los usamos para identificarle personalmente.',
      ],
      googlePrivacy: {
        text: 'Google puede transferir y almacenar estos datos en servidores ubicados fuera de su pa\u00eds. Puede revisar las pr\u00e1cticas de privacidad de Google en',
        url: 'https://policies.google.com/privacy',
      },
      optOut: {
        text: 'Para excluirse del seguimiento de Google Analytics, puede instalar el complemento de exclusi\u00f3n de Google Analytics para el navegador en',
        url: 'https://tools.google.com/dlpage/gaoptout',
      },
      remarketing: {
        text: 'Este sitio web tambi\u00e9n utiliza remarketing de Google Ads, que nos permite mostrar anuncios a visitantes anteriores mientras navegan por otros sitios web y aplicaciones dentro de la Red de Display de Google. Estos anuncios se muestran en funci\u00f3n de su visita previa a dipriva.com mediante cookies almacenadas en su dispositivo. Puede excluirse de la publicidad personalizada visitando la Configuraci\u00f3n de anuncios de Google o usando la herramienta de exclusi\u00f3n de la NAI en',
        url: 'https://optout.networkadvertising.org',
      },
    },
    rights: {
      title: 'Sus derechos y opciones',
      content: 'Usted puede solicitar el acceso, la correcci\u00f3n o la eliminaci\u00f3n de su informaci\u00f3n personal en cualquier momento escribiendo a',
      email: 'manuel@dipriva.com',
      afterEmail: '. Procesaremos las solicitudes de eliminaci\u00f3n en un plazo de 30 d\u00edas.',
    },
    changes: {
      title: 'Cambios en esta pol\u00edtica',
      content: 'Podemos actualizar esta pol\u00edtica a medida que evolucionen nuestras pr\u00e1cticas. La fecha de \u201c\u00daltima actualizaci\u00f3n\u201d indicada arriba refleja la revisi\u00f3n m\u00e1s reciente.',
    },
    questions: {
      title: 'Preguntas',
      content: 'Si tiene alguna pregunta sobre esta pol\u00edtica de privacidad o sobre nuestras pr\u00e1cticas de datos, cont\u00e1ctenos en',
      email: 'manuel@dipriva.com',
    },
  },
};

export default function Privacy() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  const content = privacyContent[language];

  return (
    <div className="min-h-screen bg-obsidian text-silver">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-obsidian/80 backdrop-blur-md border-b border-silver/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation('/')}
            className="text-silver hover:text-gold transition-colors"
          >
            {content.backToHome}
          </button>
          <h1 className="text-lg font-playfair font-bold" style={{ letterSpacing: '0.05em' }}>
            {content.title}
          </h1>
          <div className="w-24" />
        </div>
      </nav>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16"
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-4xl sm:text-5xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.18em' }}
            >
              {content.title}
            </h1>
            <p className="text-silver/60">{content.lastUpdated}</p>
          </div>

          {/* Intro */}
          <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
            {content.intro}
          </p>

          {/* Main Sections */}
          {content.sections.map((section, idx) => (
            <section key={idx}>
              <h2
                className="text-2xl font-playfair font-bold text-silver mb-4"
                style={{ letterSpacing: '0.13em' }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
                  {para}
                </p>
              ))}
              {section.items && (
                <ul className="list-disc list-inside space-y-2 text-silver/80 ml-4 mb-4" style={{ lineHeight: '1.6' }}>
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                  ))}
                </ul>
              )}
              {section.afterItems && (
                <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
                  {section.afterItems}
                </p>
              )}
            </section>
          ))}

          {/* Analytics */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {content.analytics.title}
            </h2>
            {content.analytics.paragraphs.map((para, idx) => (
              <p key={idx} className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
                {para}
              </p>
            ))}
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {content.analytics.googlePrivacy.text}{' '}
              <a href={content.analytics.googlePrivacy.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {content.analytics.googlePrivacy.url}
              </a>
              .
            </p>
            <p className="text-silver/80 mb-4" style={{ lineHeight: '1.6' }}>
              {content.analytics.optOut.text}{' '}
              <a href={content.analytics.optOut.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {content.analytics.optOut.url}
              </a>
              .
            </p>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {content.analytics.remarketing.text}{' '}
              <a href={content.analytics.remarketing.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors">
                {content.analytics.remarketing.url}
              </a>
              .
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {content.rights.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {content.rights.content}{' '}
              <a href={`mailto:${content.rights.email}`} className="text-gold hover:text-gold/80 transition-colors">
                {content.rights.email}
              </a>
              {content.rights.afterEmail}
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {content.changes.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {content.changes.content}
            </p>
          </section>

          {/* Questions */}
          <section>
            <h2
              className="text-2xl font-playfair font-bold text-silver mb-4"
              style={{ letterSpacing: '0.13em' }}
            >
              {content.questions.title}
            </h2>
            <p className="text-silver/80" style={{ lineHeight: '1.6' }}>
              {content.questions.content}{' '}
              <a href={`mailto:${content.questions.email}`} className="text-gold hover:text-gold/80 transition-colors">
                {content.questions.email}
              </a>
              .
            </p>
          </section>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-silver/10">
            <Button
              onClick={() => setLocation('/')}
              className="px-8 py-3 bg-gold text-obsidian font-semibold hover:bg-gold/90 transition-all duration-300 rounded-lg"
            >
              {t('notFound.cta', language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
