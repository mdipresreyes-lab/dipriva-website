import leadForm from './leadForm.json';

// leadForm.json is a copy of config/lead-form.json in dipriva-social. The
// dipriva-leads Worker validates against that file, so change both together.
export { leadForm };

export const LEADS_ENDPOINT = 'https://dipriva-leads.dipriva.workers.dev/lead';
export const TURNSTILE_SITE_KEY = '0x4AAAAAAFR5I3CWM37-aNoY';
// Cloudflare's public test key: always passes, for local previews only.
export const TURNSTILE_TEST_KEY = '1x00000000000000000000AA';

export type MagnetId = keyof typeof leadForm.magnets;
export type Lang = 'en' | 'es';

type DownloadFile = { label: Record<Lang, string>; href: Record<Lang, string> };

type PageCopy = {
  overline: string;
  h1: string;
  intro: string;
  insideHeading: string;
  inside: string[];
  formHeading: string;
};

export type MagnetPage = {
  id: MagnetId;
  path: string;
  title: string;
  description: string;
  files: DownloadFile[];
  copy: Record<Lang, PageCopy>;
};

const dl = (name: string, ext: string) => ({
  en: `/downloads/${name}-en.${ext}`,
  es: `/downloads/${name}-es.${ext}`,
});

const PDF = { en: 'PDF', es: 'PDF' };

export const MAGNET_PAGES: Record<MagnetId, MagnetPage> = {
  startup: {
    id: 'startup',
    path: '/startup',
    title: 'The 90-Day Operating Roadmap | Dipriva Consulting Group',
    description:
      'A one-page plan to move the work that runs through you to an owner with a date. Free download in English and Spanish, PDF and Word.',
    files: [
      { label: PDF, href: dl('dipriva-90-day-operating-roadmap', 'pdf') },
      { label: { en: 'Word', es: 'Word' }, href: dl('dipriva-90-day-operating-roadmap', 'docx') },
    ],
    copy: {
      en: {
        overline: 'Startup Operations',
        h1: 'Everything runs through you. Move it in 90 days.',
        intro:
          'The 90-Day Operating Roadmap is one page. Fifteen minutes to fill in. It names what leaves your desk, who owns it next, and the date it moves.',
        insideHeading: 'What is inside',
        inside: [
          'Days 1 to 30: write down the three things that run only through you.',
          'Days 31 to 60: give each one an owner and a finish date.',
          'Days 61 to 90: run each one without you in the room. Fix what breaks.',
          'One rule that keeps the handoff clean.',
        ],
        formHeading: 'Get the roadmap',
      },
      es: {
        overline: 'Operaciones de startups',
        h1: 'Todo pasa por usted. Cámbielo en 90 días.',
        intro:
          'La hoja de ruta operativa de 90 días es una página. Quince minutos para completarla. Define qué sale de su escritorio, quién lo asume y en qué fecha.',
        insideHeading: 'Qué incluye',
        inside: [
          'Días 1 a 30: documente las tres cosas que dependen solo de usted.',
          'Días 31 a 60: asigne a cada una un responsable y una fecha de cierre.',
          'Días 61 a 90: que cada una funcione sin usted presente. Corrija lo que falle.',
          'Una regla que mantiene ordenada la transferencia.',
        ],
        formHeading: 'Reciba la hoja de ruta',
      },
    },
  },
  strategy: {
    id: 'strategy',
    path: '/strategy',
    title: 'The Sales Follow-Up Kit | Dipriva Consulting Group',
    description:
      'Five touches after every proposal, five messages ready to send, and an Excel tracker that dates each one. Free download in English and Spanish.',
    files: [
      { label: PDF, href: dl('dipriva-sales-follow-up-kit', 'pdf') },
      {
        label: { en: 'Excel tracker', es: 'Hoja de seguimiento en Excel' },
        href: dl('dipriva-sales-follow-up-tracker', 'xlsx'),
      },
    ],
    copy: {
      en: {
        overline: 'Corporate Strategy',
        h1: 'Proposals go quiet. Follow-up wins them back.',
        intro:
          'The Sales Follow-Up Kit gives you five touches after every proposal and the message for each one. The Excel tracker sets every due date for you.',
        insideHeading: 'What is inside',
        inside: [
          'A five-touch schedule: day 1, 3, 7, 14 and 30 after the proposal.',
          'Five messages ready to send. Replace the brackets and go.',
          'An Excel tracker that dates each touch, moves weekends to Monday and shows what is next.',
        ],
        formHeading: 'Get the kit',
      },
      es: {
        overline: 'Estrategia corporativa',
        h1: 'Las propuestas se enfrían. El seguimiento las recupera.',
        intro:
          'El kit de seguimiento de ventas le da cinco contactos después de cada propuesta y el mensaje para cada uno. La hoja de Excel calcula cada fecha por usted.',
        insideHeading: 'Qué incluye',
        inside: [
          'Un calendario de cinco contactos: días 1, 3, 7, 14 y 30 después de la propuesta.',
          'Cinco mensajes listos para enviar. Reemplace los corchetes y envíe.',
          'Una hoja de Excel que fecha cada contacto, pasa los fines de semana al lunes y muestra el siguiente paso.',
        ],
        formHeading: 'Reciba el kit',
      },
    },
  },
  ai: {
    id: 'ai',
    path: '/ai-automation',
    title: 'Where to Automate First | Dipriva Consulting Group',
    description:
      'Score the tasks your team repeats and find the one to automate first. Free worksheet in English and Spanish, PDF and Excel.',
    files: [
      { label: PDF, href: dl('dipriva-where-to-automate-first', 'pdf') },
      { label: { en: 'Excel worksheet', es: 'Hoja de trabajo en Excel' }, href: dl('dipriva-where-to-automate-first', 'xlsx') },
    ],
    copy: {
      en: {
        overline: 'AI and Automation',
        h1: 'Automate the right task first.',
        intro:
          'Where to Automate First is a one-page worksheet. List five tasks your team repeats. Score each one. The highest score goes first.',
        insideHeading: 'What is inside',
        inside: [
          'A scoring method: hours per week, how repeatable the task is, and the cost of a mistake.',
          'A worked example to copy.',
          'An Excel worksheet that scores and ranks your tasks and flags the first pick.',
        ],
        formHeading: 'Get the worksheet',
      },
      es: {
        overline: 'IA y automatización',
        h1: 'Automatice primero la tarea correcta.',
        intro:
          'Por dónde automatizar primero es una hoja de trabajo de una página. Anote cinco tareas que su equipo repite. Califique cada una. La de mayor puntaje va primero.',
        insideHeading: 'Qué incluye',
        inside: [
          'Un método de calificación: horas por semana, qué tan repetible es la tarea y el costo de un error.',
          'Un ejemplo resuelto para guiarse.',
          'Una hoja de Excel que califica y ordena sus tareas y marca la primera opción.',
        ],
        formHeading: 'Reciba la hoja de trabajo',
      },
    },
  },
};
