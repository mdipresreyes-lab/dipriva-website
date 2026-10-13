import leadForm from './leadForm.json';
import type { Lang } from './copy';
import type { ServiceKey } from './services';
import { IS_PRODUCTION } from './site';

// leadForm.json is a byte copy of config/lead-form.json in dipriva-social. The
// dipriva-leads Worker validates every submission against that file, so the two
// change together. scripts/check-lead-form.mjs fails the build on drift.
export { leadForm };

export type MagnetId = keyof typeof leadForm.magnets;

const PRODUCTION_ENDPOINT = 'https://dipriva-leads.dipriva.workers.dev/lead';
const PRODUCTION_SITE_KEY = '0x4AAAAAAFR5I3CWM37-aNoY';
// Cloudflare's public Turnstile test key: always passes, never reaches a real check.
const TEST_SITE_KEY = '1x00000000000000000000AA';

/**
 * Where the form posts. Production posts to the live Worker. Every other build
 * posts to PUBLIC_LEADS_ENDPOINT when one is set (a separate QA Worker with its
 * own database), and otherwise runs dry: it validates, shows the success state
 * and sends nothing. A QA build can never write to the production lead list.
 */
export const LEADS_ENDPOINT: string = IS_PRODUCTION
  ? PRODUCTION_ENDPOINT
  : (import.meta.env.PUBLIC_LEADS_ENDPOINT ?? '');

export const TURNSTILE_SITE_KEY: string = IS_PRODUCTION
  ? PRODUCTION_SITE_KEY
  : (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? TEST_SITE_KEY);

export interface DownloadFile {
  label: Record<Lang, string>;
  href: Record<Lang, string>;
  type: string;
}

interface Phase {
  label: string;
  title: string;
  body: string;
  example: [string, string, string];
}

type Preview =
  | { kind: 'startup'; columns: [string, string, string]; phases: Phase[]; rule: string }
  | {
      kind: 'strategy';
      columns: [string, string, string];
      touches: { n: number; day: string; purpose: string }[];
      notes: string[];
    }
  | {
      kind: 'ai';
      columns: [string, string, string, string, string];
      example: [string, string, string, string, string];
      formula: string;
      scales: string[];
      rule: string;
    };

export interface MagnetCopy {
  path: string;
  name: string;
  title: string;
  description: string;
  overline: string;
  h1: string;
  intro: string;
  /** Answer-first summary for search and AI engines. */
  summary: string;
  formats: string;
  insideHeading: string;
  inside: string[];
  formHeading: string;
  previewHeading: string;
  previewIntro: string;
  preview: Preview;
  faq: { q: string; a: string }[];
}

export interface Magnet {
  id: MagnetId;
  service: ServiceKey;
  /** Blog cluster whose posts relate to this tool. */
  cluster: string;
  files: DownloadFile[];
  en: MagnetCopy;
  es: MagnetCopy;
}

const dl = (name: string, ext: string) => ({
  en: `/downloads/${name}-en.${ext}`,
  es: `/downloads/${name}-es.${ext}`,
});

const PDF_TYPE = 'application/pdf';
const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const reply = {
  en: `Manuel reads every request and replies within ${leadForm.replyBusinessDays} business days with one suggestion based on your picks. Insights emails come only if you tick the box.`,
  es: `Manuel lee cada solicitud y responde en un plazo de ${leadForm.replyBusinessDays} días hábiles con una sugerencia basada en sus respuestas. Solo recibe correos con ideas si marca la casilla.`,
};

export const magnets: Magnet[] = [
  {
    id: 'startup',
    service: 'ops',
    cluster: 'Startup Operations',
    files: [
      { label: { en: 'PDF', es: 'PDF' }, href: dl('dipriva-90-day-operating-roadmap', 'pdf'), type: PDF_TYPE },
      { label: { en: 'Word', es: 'Word' }, href: dl('dipriva-90-day-operating-roadmap', 'docx'), type: DOCX_TYPE },
    ],
    en: {
      path: '/startup/',
      name: '90-Day Operating Roadmap',
      title: 'The 90-Day Operating Roadmap | Dipriva Consulting Group',
      description:
        'A one-page plan to move the work that runs through you to an owner with a date. Free download in English and Spanish, PDF and Word.',
      overline: 'Startup Operations',
      h1: 'Everything runs through you. Move it in 90 days.',
      intro:
        'The 90-Day Operating Roadmap is one page. Fifteen minutes to fill in. It names what leaves your desk, who owns it next, and the date it moves.',
      summary:
        'The 90-Day Operating Roadmap is a free one-page plan from Dipriva Consulting Group. In three 30-day phases, a founder writes down the three things that run only through them, gives each one an owner and a finish date, and then steps back while the new owner runs it.',
      formats: 'PDF and Word, in English and Spanish',
      insideHeading: 'What is inside',
      inside: [
        'Days 1 to 30: write down the three things that run only through you.',
        'Days 31 to 60: give each one an owner and a finish date.',
        'Days 61 to 90: run each one without you in the room. Fix what breaks.',
        'One rule that keeps the handoff clean.',
      ],
      formHeading: 'Get the roadmap',
      previewHeading: 'How the page works',
      previewIntro: 'Each phase has three columns. The examples below come from the printed page.',
      preview: {
        kind: 'startup',
        columns: ['What leaves my desk', 'New owner', 'Done by'],
        phases: [
          {
            label: 'Days 1 to 30',
            title: 'Write it down',
            body: 'Document the three things that run only through you.',
            example: ['Weekly client status update', 'Ops lead', 'Day 14'],
          },
          {
            label: 'Days 31 to 60',
            title: 'Hand it off',
            body: 'Give each one an owner and a finish date.',
            example: ['Quote approvals', 'Office manager', 'Day 45'],
          },
          {
            label: 'Days 61 to 90',
            title: 'Step back',
            body: 'Run each one without you in the room. Fix what breaks.',
            example: ['Monthly pricing review', 'Finance lead', 'Day 80'],
          },
        ],
        rule: 'One rule: nothing moves to a new owner until it is written down.',
      },
      faq: [
        {
          q: 'Who is the 90-Day Operating Roadmap for?',
          a: 'Founders and owners of companies with 10 to 50 people where approvals, client updates or pricing still wait on them.',
        },
        {
          q: 'What format is it?',
          a: 'A one-page PDF to print and a Word file to fill in on screen. Both come in English and Spanish.',
        },
        { q: 'What happens after I download it?', a: reply.en },
      ],
    },
    es: {
      path: '/es/hoja-de-ruta-operativa/',
      name: 'Hoja de ruta operativa de 90 días',
      title: 'Hoja de ruta operativa de 90 días | Dipriva Consulting Group',
      description:
        'Un plan de una página para pasar lo que depende de usted a un responsable con fecha. Descarga gratuita en inglés y español, en PDF y Word.',
      overline: 'Operaciones de startups',
      h1: 'Todo pasa por usted. Cámbielo en 90 días.',
      intro:
        'La hoja de ruta operativa de 90 días es una página. Quince minutos para completarla. Define qué sale de su escritorio, quién lo asume y en qué fecha.',
      summary:
        'La hoja de ruta operativa de 90 días es un plan gratuito de una página de Dipriva Consulting Group. En tres fases de 30 días, quien dirige la empresa documenta las tres cosas que dependen solo de su persona, asigna a cada una un responsable y una fecha, y luego se retira mientras el nuevo responsable las ejecuta.',
      formats: 'PDF y Word, en inglés y español',
      insideHeading: 'Qué incluye',
      inside: [
        'Días 1 a 30: documente las tres cosas que dependen solo de usted.',
        'Días 31 a 60: asigne a cada una un responsable y una fecha de cierre.',
        'Días 61 a 90: que cada una funcione sin usted presente. Corrija lo que falle.',
        'Una regla que mantiene ordenada la transferencia.',
      ],
      formHeading: 'Reciba la hoja de ruta',
      previewHeading: 'Cómo funciona la página',
      previewIntro: 'Cada fase tiene tres columnas. Los ejemplos vienen de la página impresa.',
      preview: {
        kind: 'startup',
        columns: ['Lo que sale de mi escritorio', 'Nuevo responsable', 'Fecha límite'],
        phases: [
          {
            label: 'Días 1 a 30',
            title: 'Póngalo por escrito',
            body: 'Documente las tres cosas que dependen solo de usted.',
            example: ['Informe semanal de estado al cliente', 'Líder de operaciones', 'Día 14'],
          },
          {
            label: 'Días 31 a 60',
            title: 'Delegue',
            body: 'Asigne a cada una un responsable y una fecha de entrega.',
            example: ['Aprobación de cotizaciones', 'Gerente de oficina', 'Día 45'],
          },
          {
            label: 'Días 61 a 90',
            title: 'Retírese',
            body: 'Ejecute cada una sin usted presente. Corrija lo que falle.',
            example: ['Revisión mensual de precios', 'Líder de finanzas', 'Día 80'],
          },
        ],
        rule: 'Una regla: nada pasa a un nuevo responsable hasta que esté por escrito.',
      },
      faq: [
        {
          q: '¿Para quién es la hoja de ruta operativa de 90 días?',
          a: 'Para fundadores y dueños de empresas de 10 a 50 personas donde las aprobaciones, los informes a clientes o los precios todavía esperan por ellos.',
        },
        {
          q: '¿En qué formato viene?',
          a: 'Un PDF de una página para imprimir y un archivo de Word para completar en pantalla. Ambos vienen en inglés y en español.',
        },
        { q: '¿Qué pasa después de descargarla?', a: reply.es },
      ],
    },
  },
  {
    id: 'strategy',
    service: 'strategy',
    cluster: 'Corporate Strategy',
    files: [
      { label: { en: 'PDF', es: 'PDF' }, href: dl('dipriva-sales-follow-up-kit', 'pdf'), type: PDF_TYPE },
      {
        label: { en: 'Excel tracker', es: 'Hoja de seguimiento en Excel' },
        href: dl('dipriva-sales-follow-up-tracker', 'xlsx'),
        type: XLSX_TYPE,
      },
    ],
    en: {
      path: '/strategy/',
      name: 'Sales Follow-Up Kit',
      title: 'The Sales Follow-Up Kit | Dipriva Consulting Group',
      description:
        'Five touches after every proposal, five messages ready to send, and an Excel tracker that dates each one. Free download in English and Spanish.',
      overline: 'Corporate Strategy',
      h1: 'Proposals go quiet. Follow-up wins them back.',
      intro:
        'The Sales Follow-Up Kit gives you five touches after every proposal and the message for each one. The Excel tracker sets every due date for you.',
      summary:
        'The Sales Follow-Up Kit is a free tool from Dipriva Consulting Group for companies that send proposals and then wait. It schedules five follow-up touches on days 1, 3, 7, 14 and 30 after a proposal, gives a ready message for each, and includes an Excel tracker that dates every touch.',
      formats: 'PDF and Excel, in English and Spanish',
      insideHeading: 'What is inside',
      inside: [
        'A five-touch schedule: day 1, 3, 7, 14 and 30 after the proposal.',
        'Five messages ready to send. Replace the brackets and go.',
        'An Excel tracker that dates each touch, moves weekends to Monday and shows what is next.',
      ],
      formHeading: 'Get the kit',
      previewHeading: 'The five touches',
      previewIntro: 'Each touch has one job. The kit gives you the full message for each.',
      preview: {
        kind: 'strategy',
        columns: ['Touch', 'When', 'Purpose'],
        touches: [
          { n: 1, day: 'Day 1', purpose: 'Confirm' },
          { n: 2, day: 'Day 3', purpose: 'Answer' },
          { n: 3, day: 'Day 7', purpose: 'Add value' },
          { n: 4, day: 'Day 14', purpose: 'Ask' },
          { n: 5, day: 'Day 30', purpose: 'Close the loop' },
        ],
        notes: [
          'Days count from the day you send the proposal. Weekend dates move to Monday.',
          'Replace the brackets. Send each message from your own email.',
        ],
      },
      faq: [
        {
          q: 'When does each follow-up go out?',
          a: 'On days 1, 3, 7, 14 and 30, counted from the day you send the proposal. A date that falls on a weekend moves to Monday.',
        },
        {
          q: 'What does the Excel tracker do?',
          a: 'Enter the date you sent each proposal. The tracker dates all five touches, moves weekend dates to Monday and shows the next one due.',
        },
        { q: 'What happens after I download it?', a: reply.en },
      ],
    },
    es: {
      path: '/es/kit-de-seguimiento-de-ventas/',
      name: 'Kit de seguimiento de ventas',
      title: 'Kit de seguimiento de ventas | Dipriva Consulting Group',
      description:
        'Cinco contactos después de cada propuesta, cinco mensajes listos para enviar y una hoja de Excel que fecha cada uno. Descarga gratuita en inglés y español.',
      overline: 'Estrategia corporativa',
      h1: 'Las propuestas se enfrían. El seguimiento las recupera.',
      intro:
        'El kit de seguimiento de ventas le da cinco contactos después de cada propuesta y el mensaje para cada uno. La hoja de Excel calcula cada fecha por usted.',
      summary:
        'El kit de seguimiento de ventas es una herramienta gratuita de Dipriva Consulting Group para empresas que envían propuestas y luego esperan. Programa cinco contactos los días 1, 3, 7, 14 y 30 después de la propuesta, ofrece un mensaje listo para cada uno e incluye una hoja de Excel que fecha cada contacto.',
      formats: 'PDF y Excel, en inglés y español',
      insideHeading: 'Qué incluye',
      inside: [
        'Un calendario de cinco contactos: días 1, 3, 7, 14 y 30 después de la propuesta.',
        'Cinco mensajes listos para enviar. Reemplace los corchetes y envíe.',
        'Una hoja de Excel que fecha cada contacto, pasa los fines de semana al lunes y muestra el siguiente paso.',
      ],
      formHeading: 'Reciba el kit',
      previewHeading: 'Los cinco contactos',
      previewIntro: 'Cada contacto tiene un propósito. El kit le da el mensaje completo para cada uno.',
      preview: {
        kind: 'strategy',
        columns: ['Contacto', 'Cuándo', 'Propósito'],
        touches: [
          { n: 1, day: 'Día 1', purpose: 'Confirmar' },
          { n: 2, day: 'Día 3', purpose: 'Responder' },
          { n: 3, day: 'Día 7', purpose: 'Aportar valor' },
          { n: 4, day: 'Día 14', purpose: 'Preguntar' },
          { n: 5, day: 'Día 30', purpose: 'Cerrar el ciclo' },
        ],
        notes: [
          'Los días cuentan desde que envía la propuesta. Las fechas de fin de semana pasan al lunes.',
          'Reemplace los corchetes. Envíe cada mensaje desde su propio correo.',
        ],
      },
      faq: [
        {
          q: '¿Cuándo se envía cada seguimiento?',
          a: 'Los días 1, 3, 7, 14 y 30, contados desde el día en que envía la propuesta. Una fecha que cae en fin de semana pasa al lunes.',
        },
        {
          q: '¿Qué hace la hoja de Excel?',
          a: 'Anote la fecha en que envió cada propuesta. La hoja fecha los cinco contactos, pasa las fechas de fin de semana al lunes y muestra el siguiente pendiente.',
        },
        { q: '¿Qué pasa después de descargarlo?', a: reply.es },
      ],
    },
  },
  {
    id: 'ai',
    service: 'ai',
    cluster: 'AI and Automation',
    files: [
      { label: { en: 'PDF', es: 'PDF' }, href: dl('dipriva-where-to-automate-first', 'pdf'), type: PDF_TYPE },
      {
        label: { en: 'Excel worksheet', es: 'Hoja de trabajo en Excel' },
        href: dl('dipriva-where-to-automate-first', 'xlsx'),
        type: XLSX_TYPE,
      },
    ],
    en: {
      path: '/ai-automation/',
      name: 'Where to Automate First',
      title: 'Where to Automate First | Dipriva Consulting Group',
      description:
        'Score the tasks your team repeats and find the one to automate first. Free worksheet in English and Spanish, PDF and Excel.',
      overline: 'AI and Automation',
      h1: 'Automate the right task first.',
      intro:
        'Where to Automate First is a one-page worksheet. List five tasks your team repeats. Score each one. The highest score goes first.',
      summary:
        'Where to Automate First is a free worksheet from Dipriva Consulting Group. It scores each repeated task as hours per week times repeatability, divided by the cost of a mistake, and the task with the highest score is the first one to automate, once its steps are written down.',
      formats: 'PDF and Excel, in English and Spanish',
      insideHeading: 'What is inside',
      inside: [
        'A scoring method: hours per week, how repeatable the task is, and the cost of a mistake.',
        'A worked example to copy.',
        'An Excel worksheet that scores and ranks your tasks and flags the first pick.',
      ],
      formHeading: 'Get the worksheet',
      previewHeading: 'The scoring method',
      previewIntro: 'One formula, five tasks, one first pick. Here is the worked example from the page.',
      preview: {
        kind: 'ai',
        columns: ['Task', 'Hours per week', 'Repeatable (1 to 3)', 'Cost of a mistake (1 to 3)', 'Score'],
        example: ['Enter new client details into the CRM', '4', '3', '1', '12'],
        formula: 'Score = hours per week x repeatable, divided by cost of a mistake.',
        scales: [
          'Repeatable: 1 = the steps change every time. 3 = the same steps every time.',
          'Cost of a mistake: 1 = easy to fix. 3 = expensive or hard to undo.',
        ],
        rule: 'Before you automate the top task, write down its steps. If you cannot list the steps, fix the process first.',
      },
      faq: [
        {
          q: 'How is each task scored?',
          a: 'Multiply the hours per week by how repeatable the task is (1 to 3), then divide by the cost of a mistake (1 to 3). The highest score is your first automation.',
        },
        {
          q: 'What if I cannot list the steps of the top task?',
          a: 'Fix the process first. Automating a process nobody has written down makes the same mistakes faster.',
        },
        { q: 'What happens after I download it?', a: reply.en },
      ],
    },
    es: {
      path: '/es/por-donde-automatizar-primero/',
      name: 'Por dónde automatizar primero',
      title: 'Por dónde automatizar primero | Dipriva Consulting Group',
      description:
        'Califique las tareas que su equipo repite y encuentre la primera que conviene automatizar. Hoja de trabajo gratuita en inglés y español, en PDF y Excel.',
      overline: 'IA y automatización',
      h1: 'Automatice primero la tarea correcta.',
      intro:
        'Por dónde automatizar primero es una hoja de trabajo de una página. Anote cinco tareas que su equipo repite. Califique cada una. La de mayor puntaje va primero.',
      summary:
        'Por dónde automatizar primero es una hoja de trabajo gratuita de Dipriva Consulting Group. Califica cada tarea repetida como horas por semana por su nivel de repetición, dividido entre el costo de un error, y la tarea con mayor puntaje es la primera que se automatiza, una vez documentados sus pasos.',
      formats: 'PDF y Excel, en inglés y español',
      insideHeading: 'Qué incluye',
      inside: [
        'Un método de calificación: horas por semana, qué tan repetible es la tarea y el costo de un error.',
        'Un ejemplo resuelto para guiarse.',
        'Una hoja de Excel que califica y ordena sus tareas y marca la primera opción.',
      ],
      formHeading: 'Reciba la hoja de trabajo',
      previewHeading: 'El método de calificación',
      previewIntro: 'Una fórmula, cinco tareas, una primera opción. Este es el ejemplo resuelto de la página.',
      preview: {
        kind: 'ai',
        columns: ['Tarea', 'Horas por semana', 'Repetible (1 a 3)', 'Costo de un error (1 a 3)', 'Puntaje'],
        example: ['Registrar datos de clientes nuevos en el CRM', '4', '3', '1', '12'],
        formula: 'Puntaje = horas por semana x repetible, dividido entre el costo de un error.',
        scales: [
          'Repetible: 1 = los pasos cambian cada vez. 3 = siempre los mismos pasos.',
          'Costo de un error: 1 = fácil de corregir. 3 = costoso o difícil de deshacer.',
        ],
        rule: 'Antes de automatizar la tarea con mayor puntaje, escriba sus pasos. Si no puede enumerarlos, corrija primero el proceso.',
      },
      faq: [
        {
          q: '¿Cómo se califica cada tarea?',
          a: 'Multiplique las horas por semana por qué tan repetible es la tarea (1 a 3) y divida entre el costo de un error (1 a 3). El puntaje más alto es su primera automatización.',
        },
        {
          q: '¿Qué pasa si no puedo enumerar los pasos de la tarea principal?',
          a: 'Corrija primero el proceso. Automatizar un proceso que nadie ha documentado solo repite los mismos errores más rápido.',
        },
        { q: '¿Qué pasa después de descargarla?', a: reply.es },
      ],
    },
  },
];

export const magnetById = (id: MagnetId) => magnets.find((m) => m.id === id)!;

export const magnetLabels = {
  en: {
    home: 'Home',
    tools: 'Free tools',
    inShort: 'In short',
    faq: 'Questions',
    free: 'Free',
    formats: 'Formats',
    related: 'Want it done with you?',
    relatedBody: 'This tool is the first step of our consulting work in this area.',
    explore: 'See the service',
    insights: 'Related insights',
    preview: 'Preview',
    sample: 'Sample row',
  },
  es: {
    home: 'Inicio',
    tools: 'Herramientas gratuitas',
    inShort: 'En resumen',
    faq: 'Preguntas',
    free: 'Gratis',
    formats: 'Formatos',
    related: '¿Prefiere hacerlo con acompañamiento?',
    relatedBody: 'Esta herramienta es el primer paso de nuestra consultoría en esta área.',
    explore: 'Ver el servicio',
    insights: 'Análisis relacionados',
    preview: 'Vista previa',
    sample: 'Fila de ejemplo',
  },
} as const;
