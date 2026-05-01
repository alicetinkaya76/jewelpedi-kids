/**
 * geoKinds.js — Faz 6-Z
 *
 * geoPoints.js'te kullanılan 6 `kind` değeri için etiket + renk + emoji
 * sözlüğü. Tek kaynak — WorldMapPage ve LeafletMap bileşenleri bunu
 * paylaşır (daha önce ikisinde de kopya vardı).
 *
 * kind: 'mine' | 'workshop' | 'museum' | 'site' | 'trade-hub' | 'deposit'
 */

export const KIND_LABELS = {
  mine:        { tr: 'Madenler',      en: 'Mines',        ar: 'مناجم',        emoji: '⛏️' },
  workshop:    { tr: 'Atölyeler',     en: 'Workshops',    ar: 'ورش',          emoji: '🔨' },
  museum:      { tr: 'Müzeler',       en: 'Museums',      ar: 'متاحف',        emoji: '🏛️' },
  site:        { tr: 'Sitler',        en: 'Sites',        ar: 'مواقع',        emoji: '📍' },
  'trade-hub': { tr: 'Ticaret merk.', en: 'Trade hubs',   ar: 'مراكز تجارة',  emoji: '🏪' },
  deposit:     { tr: 'Yataklar',      en: 'Deposits',     ar: 'رواسب',        emoji: '💎' },
};

export const KIND_COLORS = {
  mine:        '#d4a017',
  workshop:    '#c0392b',
  museum:      '#1b2845',
  site:        '#8e44ad',
  'trade-hub': '#2980b9',
  deposit:     '#27ae60',
};

export const ALL_KINDS = Object.keys(KIND_LABELS);
