/**
 * iconFor — given an exhibit object (or id + hall), return a { id, props }
 * pair describing which GemIcon to render.
 *
 * We prefer explicit per-exhibit mapping when known. When an exhibit isn't
 * mapped (likely in Phase 2 as 45+ new stands arrive), we fall back to the
 * hall's default icon. That means new content gets a sensible visual
 * identity without needing to touch this file.
 */

import { GEM_REGISTRY } from '../components/icons/gems/index.js';

/** Explicit per-exhibit overrides. Everything else uses hall defaults. */
const EXHIBIT_MAP = {
  // Gold Hall
  'ceyrek-altin':    { id: 'gold-coin', shimmer: true },
  'tam-altin':       { id: 'gold-coin', shimmer: true },
  'yarim-altin':     { id: 'gold-coin', shimmer: true },
  'bilezik':         { id: 'filigree-wire' },
  'ayar-sistemi':    { id: 'gold-bar',  shimmer: true },
  'altin-tarihcesi': { id: 'gold-bar',  shimmer: true },

  // Silver Hall
  '925-ayar':        { id: 'silver-coin', shimmer: true },
  'gumus-bakimi':    { id: 'silver-coin', shimmer: true },
  'trabzon-hasiri':  { id: 'hasir-weave' },
  'telkari':         { id: 'filigree-wire' },
  'savat':           { id: 'niello-pattern' },

  // Diamond Hall
  '4c-sistemi':            { id: 'diamond', animate: true },
  'kesim-sekilleri':       { id: 'diamond', animate: true },
  'pirlanta-nasil-olusur': { id: 'diamond', animate: true },
  'lab-pirlantasi':        { id: 'diamond', animate: true },
  'mohs-skalasi':          { id: 'diamond' },
  // Famous diamonds (Phase 2-A additions)
  'cullinan':              { id: 'diamond', animate: true, shimmer: true },
  'hope-pirlantasi':       { id: 'sapphire', animate: true },  // blue diamond
  'koh-i-noor':            { id: 'diamond', animate: true, shimmer: true },

  // Colored Stones
  'zumrut':       { id: 'emerald',    animate: true },
  'yakut':        { id: 'ruby',       animate: true },
  'safir':        { id: 'sapphire',   animate: true },
  'turkuvaz':     { id: 'turquoise' },
  // New colored stones (Phase 2-A additions)
  'ametist':      { id: 'amethyst',   animate: true },
  'akuamarin':    { id: 'aquamarine', animate: true },
  'lapis-lazuli': { id: 'lapis' },
  // New colored stones (Phase 2-B additions)
  'opal':         { id: 'opal',       animate: true, shimmer: true },
  'tourmaline':   { id: 'tourmaline', animate: true },
  'topaz':        { id: 'topaz',      animate: true },
  'peridot':      { id: 'peridot',    animate: true },
  'garnet':       { id: 'garnet',     animate: true },

  // Platinum
  'platin-nedir':    { id: 'platinum-nugget', shimmer: true },
  'platin-vs-altin': { id: 'platinum-nugget', shimmer: true },
  'platin-tarihi':   { id: 'platinum-nugget', shimmer: true },
  'platin-endustri': { id: 'platinum-nugget', shimmer: true },

  // Jewelry
  'yuzuk':  { id: 'sapphire',      animate: true },
  'kolye':  { id: 'pearl',         shimmer: true },
  'kupe':   { id: 'ruby',          animate: true },
  'brosh':  { id: 'emerald',       animate: true },
  'tac':    { id: 'diamond',       animate: true, shimmer: true },

  // Craft
  'kapalicarsi':      { id: 'filigree-wire' },
  'kazaz':            { id: 'hasir-weave' },
  'mine':             { id: 'niello-pattern' },
  'eskisehir-lutasi': { id: 'pearl' },   // soft, creamy-white match
};

/** Hall-level fallbacks. Used when the exhibit isn't individually mapped. */
const HALL_FALLBACK = {
  altin:           { id: 'gold-bar',        shimmer: true },
  gumus:           { id: 'silver-coin',     shimmer: true },
  pirlanta:        { id: 'diamond',         animate: true },
  'renkli-taslar': { id: 'amethyst',        animate: true },
  platin:          { id: 'platinum-nugget', shimmer: true },
  taki:            { id: 'ruby',            animate: true },
  zanaat:          { id: 'filigree-wire' },
};

/**
 * @param {{ id: string, cat?: string } | string} exhibitOrId
 * @param {string} [hallIdHint]
 * @returns {{ id: string, animate?: boolean, shimmer?: boolean }}
 */
export function iconFor(exhibitOrId, hallIdHint) {
  const exhibitId =
    typeof exhibitOrId === 'string' ? exhibitOrId : exhibitOrId?.id;
  const hallId =
    hallIdHint || (typeof exhibitOrId === 'object' ? exhibitOrId?.cat : undefined);

  const mapped = EXHIBIT_MAP[exhibitId];
  if (mapped) return mapped;

  const fallback = hallId && HALL_FALLBACK[hallId];
  if (fallback) return fallback;

  // Last-ditch fallback — a neutral gem.
  return { id: 'diamond' };
}

/** Quick existence check — useful in tests or dev tooling. */
export function hasIcon(id) {
  return Object.prototype.hasOwnProperty.call(GEM_REGISTRY, id);
}
