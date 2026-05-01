// Tüm sergi standlarını tek yerden ihraç eder ve yardımcı fonksiyonlar sunar.
// Faz 6-A: _enrichment.js üzerinden tüm sergilere specs/sources/audioScript
// gibi yeni alanlar merge edilir. Orijinal dosyalar (altin.js, gumus.js vb.)
// dokunulmaz; enrichment tek noktadan yönetilir.

import altin from './altin.js';
import gumus from './gumus.js';
import pirlanta from './pirlanta.js';
import renkliTaslar from './renkliTaslar.js';
import platin from './platin.js';
import taki from './taki.js';
import zanaat from './zanaat.js';
import { enrichExhibit } from './_enrichment.js';

// Hall-başı dizileri enrichment ile zenginleştir (immutable; orijinaller korunur)
const altinEnriched = altin.map(enrichExhibit);
const gumusEnriched = gumus.map(enrichExhibit);
const pirlantaEnriched = pirlanta.map(enrichExhibit);
const renkliTaslarEnriched = renkliTaslar.map(enrichExhibit);
const platinEnriched = platin.map(enrichExhibit);
const takiEnriched = taki.map(enrichExhibit);
const zanaatEnriched = zanaat.map(enrichExhibit);

export const allExhibits = [
  ...altinEnriched,
  ...gumusEnriched,
  ...pirlantaEnriched,
  ...renkliTaslarEnriched,
  ...platinEnriched,
  ...takiEnriched,
  ...zanaatEnriched,
];

export const exhibitsByHall = {
  altin: altinEnriched,
  gumus: gumusEnriched,
  pirlanta: pirlantaEnriched,
  'renkli-taslar': renkliTaslarEnriched,
  platin: platinEnriched,
  taki: takiEnriched,
  zanaat: zanaatEnriched,
};

export function getExhibit(id) {
  return allExhibits.find((e) => e.id === id);
}

export function getExhibitsByHall(hallId) {
  return exhibitsByHall[hallId] || [];
}

export function totalExhibitCount() {
  return allExhibits.length;
}
