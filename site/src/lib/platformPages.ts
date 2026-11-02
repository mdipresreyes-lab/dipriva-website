import type { Lang } from './copy';
import { schedulePath } from './site';

// Short pages that social posts name instead of a long address: dipriva.com/instagram,
// later /facebook and /linkedin. Each lists the four free offers. Every link carries
// UTM tags, so Google Analytics can tell which platform sent the visit.
//
// The offer wording below is the wording Manuel approved for calls to action in
// dipriva-social (config/cta.json). The two files change together.

export type PlatformId = 'instagram' | 'facebook' | 'linkedin';

export const UTM_CAMPAIGN = 'profile-page';

export interface PlatformOffer {
  id: string;
  /** Page the offer opens, per language. */
  path: Record<Lang, string>;
  /** The approved call to action wording. */
  action: Record<Lang, string>;
  /** One line on what the visitor gets. */
  line: Record<Lang, string>;
  /** Button label. */
  cta: Record<Lang, string>;
}

export const platformOffers: PlatformOffer[] = [
  {
    id: 'book-session',
    path: { en: schedulePath('en'), es: schedulePath('es') },
    action: { en: 'Book a free 30-minute strategy session', es: 'Reserve una sesión estratégica gratuita de 30 minutos' },
    line: {
      en: 'Thirty minutes on where your business is stuck and what to fix first.',
      es: 'Treinta minutos sobre dónde se ha estancado su negocio y qué corregir primero.',
    },
    cta: { en: 'Book a session', es: 'Reservar una sesión' },
  },
  {
    id: 'sales-kit',
    path: { en: '/strategy/', es: '/es/estrategia/' },
    action: { en: 'Get the free Sales Follow-Up Kit', es: 'Obtenga gratis el Kit de seguimiento de ventas' },
    line: {
      en: 'Five touches after every proposal, the message for each one, and a tracker that dates them.',
      es: 'Cinco contactos después de cada propuesta, el mensaje para cada uno y una hoja que los fecha.',
    },
    cta: { en: 'Get the kit', es: 'Obtener el kit' },
  },
  {
    id: 'automate-first',
    path: { en: '/ai-automation/', es: '/es/ia-automatizacion/' },
    action: { en: 'Get the free Where to Automate First worksheet', es: 'Obtenga gratis la hoja de trabajo Por dónde automatizar primero' },
    line: {
      en: 'Score the tasks your team repeats and find the one to automate first.',
      es: 'Califique las tareas que su equipo repite y encuentre la primera que conviene automatizar.',
    },
    cta: { en: 'Get the worksheet', es: 'Obtener la hoja de trabajo' },
  },
  {
    id: 'roadmap-90',
    path: { en: '/startup/', es: '/es/startup/' },
    action: { en: 'Get the free 90-Day Operating Roadmap', es: 'Obtenga gratis la Hoja de ruta operativa de 90 días' },
    line: {
      en: 'One page that moves the work running through you to an owner with a date.',
      es: 'Una página que pasa el trabajo que depende de usted a un responsable con fecha.',
    },
    cta: { en: 'Get the roadmap', es: 'Obtener la hoja de ruta' },
  },
];

export interface PlatformCopy {
  path: Record<Lang, string>;
  name: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  eyebrow: Record<Lang, string>;
  h1: Record<Lang, string>;
  intro: Record<Lang, string>;
  home: Record<Lang, string>;
  crumb: Record<Lang, string>;
}

export const platformPages: Partial<Record<PlatformId, PlatformCopy>> = {
  instagram: {
    path: { en: '/instagram/', es: '/es/instagram/' },
    name: 'Instagram',
    title: {
      en: 'From Instagram: four free resources | Dipriva Consulting Group',
      es: 'Desde Instagram: cuatro recursos gratuitos | Dipriva Consulting Group',
    },
    description: {
      en: 'Everything Dipriva mentions on Instagram, in one place: a free strategy session and three free tools.',
      es: 'Todo lo que Dipriva menciona en Instagram, en un solo lugar: una sesión estratégica gratuita y tres herramientas gratuitas.',
    },
    eyebrow: { en: 'Dipriva on Instagram', es: 'Dipriva en Instagram' },
    h1: { en: 'What you saw on Instagram, in one place.', es: 'Lo que vio en Instagram, en un solo lugar.' },
    intro: {
      en: 'Four free resources from Dipriva Consulting Group. Pick the one that fits where your business is now.',
      es: 'Cuatro recursos gratuitos de Dipriva Consulting Group. Elija el que corresponde al momento de su negocio.',
    },
    home: { en: 'Home', es: 'Inicio' },
    crumb: { en: 'Instagram', es: 'Instagram' },
  },
};

/** A link to an offer, tagged for Google Analytics. */
export const taggedPath = (path: string, platform: PlatformId): string =>
  `${path}?utm_source=${platform}&utm_medium=social&utm_campaign=${UTM_CAMPAIGN}`;
