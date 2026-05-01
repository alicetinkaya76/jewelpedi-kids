// Küçük yardımcılar

/** Get localized value from a { tr, en, ar } dict, fallback to tr. */
export function pick(dict, locale) {
  if (!dict) return '';
  if (typeof dict === 'string') return dict;
  return dict[locale] ?? dict.tr ?? dict.en ?? Object.values(dict)[0] ?? '';
}

/** Apply hall accent CSS variables as an inline style. */
export function hallTheme(hall) {
  if (!hall) return {};
  return {
    '--hall-accent': hall.accent,
    '--hall-soft': hall.soft,
    '--hall-ink': hall.ink || '#1b2845',
  };
}

/** Classnames helper. */
export function cx(...args) {
  return args.filter(Boolean).join(' ');
}

/** Format number as percentage */
export function pct(n) {
  return `${Math.round(n * 100)}%`;
}

/** Clamp numeric value. */
export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
