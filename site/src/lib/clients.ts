/**
 * Client logos shown under the Results section on the homepage. Consent for each
 * client is approved and filed by Manuel. Logos are single-color stencils in
 * public/clients/ (processed from <slug>-original.png): transparent background,
 * opaque shapes, rendered as a CSS mask in the muted text color.
 *
 * scripts/check-clients.mjs fails the build when an active client has a url that
 * is not https or a logo file that does not exist. It imports this file with
 * Node's type stripping, so keep the syntax to plain types (no enums, no imports).
 */
export type Client = {
  slug: string;
  /** Brand name, never translated. */
  name: string;
  /** Client website, https only, no tracking parameters. */
  url: string;
  /** Path under public/. */
  logo: string;
  /** Multiplies the base logo height so the marks read at equal visual weight. */
  sizeScale: number;
  active: boolean;
};

export const clients: Client[] = [
  {
    slug: 'tiva-properties',
    name: 'Tiva Properties',
    url: 'https://tiva.properties',
    logo: '/clients/tiva-properties.png',
    sizeScale: 1.1,
    active: true,
  },
  {
    slug: 'pro-roofing-siding',
    name: 'Pro Roofing & Siding',
    url: 'https://www.myproroofing.com',
    logo: '/clients/pro-roofing-siding.png',
    sizeScale: 1.1,
    active: true,
  },
  {
    slug: 'procommand',
    name: 'ProCommand',
    url: 'https://procommand.io',
    logo: '/clients/procommand.png',
    sizeScale: 0.95,
    active: true,
  },
  {
    slug: 'mercatus-media',
    name: 'Mercatus Media',
    url: 'https://mercatus.media',
    logo: '/clients/mercatus-media.png',
    sizeScale: 1,
    active: true,
  },
  {
    slug: 'ismael-abreu-farmers-insurance',
    name: 'Ismael Abreu, Authorized Farmers Insurance Agent',
    url: 'https://agents.farmers.com/mi/grand-rapids/ismael-abreu/',
    logo: '/clients/ismael-abreu-farmers-insurance.png',
    sizeScale: 1.3,
    active: true,
  },
  {
    slug: 'quisqueya-taxes',
    name: 'Quisqueya Taxes',
    url: 'https://www.quisqueyataxes.com/',
    logo: '/clients/quisqueya-taxes.png',
    sizeScale: 1.15,
    active: true,
  },
];

export const activeClients = clients.filter((c) => c.active);
