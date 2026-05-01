import tr from './tr.js';
import en from './en.js';
import ar from './ar.js';

export const locales = { tr, en, ar };
export const localeMeta = {
  tr: { label: 'Türkçe', short: 'TR', dir: 'ltr', flag: '🇹🇷' },
  en: { label: 'English', short: 'EN', dir: 'ltr', flag: '🇬🇧' },
  ar: { label: 'العربية', short: 'AR', dir: 'rtl', flag: '🇸🇦' },
};

export const availableLocales = Object.keys(locales);

/**
 * Safely read a dot-path from a nested object.
 * translate('nav.lobby', 'tr') -> 'Lobi'
 */
export function translate(path, localeCode = 'tr', fallback = 'tr') {
  const read = (code) => {
    const parts = path.split('.');
    let cur = locales[code];
    for (const p of parts) {
      if (cur == null) return undefined;
      cur = cur[p];
    }
    return cur;
  };
  const val = read(localeCode);
  if (val !== undefined) return val;
  const fb = read(fallback);
  return fb !== undefined ? fb : path;
}

/**
 * Interpolate variables: interpolate('Soru {n} / {total}', { n: 2, total: 8 })
 */
export function interpolate(str, vars = {}) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : `{${key}}`,
  );
}
