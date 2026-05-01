/**
 * content.js — Faz 6-A
 *
 * İçerik manipülasyonu için yardımcılar:
 *  - resolveCitations:  inline "[cite:source-id]" tag'lerini footnote'lara çevirir
 *  - findRelated:       cross-ref grafında BFS ile yakın içerik bulur
 *  - pickByCategory:    sergi → quiz kategori → örnek soru gibi türetmeler
 *  - formatSpecValue:   number/string değerleri locale'e göre biçimlendirir
 *
 * Not: Bu modül saf fonksiyonlar barındırır — yan etki yok, test edilmesi kolay.
 * Faz 6-Z'de Vitest ile smoke testler eklenecek.
 */

import { getSources, formatSource } from '../data/sources.js';

// ─────────────────────────────────────────────────────────────
// resolveCitations
// ─────────────────────────────────────────────────────────────

/**
 * Metin içinde "[cite:source-id]" veya "[cite:source-a,source-b]" formatındaki
 * marker'ları numaralı dipnotlara çevirir.
 *
 * Döner:
 *   {
 *     body:      "…sayılır [1]. Yüzyıllar öncesinde [2,3] keşfedildi…",
 *     footnotes: [{n:1,source:{…}}, {n:2,source:{…}}, {n:3,source:{…}}]
 *   }
 *
 * Aynı kaynak tekrar geçerse yeni numara üretilmez.
 */
const CITE_PATTERN = /\[cite:([a-z0-9\-,]+)\]/gi;

export function resolveCitations(text) {
  if (typeof text !== 'string' || !text) {
    return { body: text || '', footnotes: [] };
  }

  const order = []; // source.id listesi; unique, sırayla
  const idxOf = new Map();

  const body = text.replace(CITE_PATTERN, (_match, idList) => {
    const ids = idList.split(',').map((s) => s.trim()).filter(Boolean);
    const nums = ids.map((id) => {
      if (!idxOf.has(id)) {
        order.push(id);
        idxOf.set(id, order.length);
      }
      return idxOf.get(id);
    });
    return `[${nums.join(',')}]`;
  });

  const footnotes = getSources(order).map((s, i) => ({ n: i + 1, source: s }));
  return { body, footnotes };
}

/**
 * Kısayol: dipnot listesini görsel formata çevirir.
 * ["1. Mohs (1812), …", "2. GIA, …"]
 */
export function formatFootnotes(footnotes, locale = 'tr') {
  return footnotes.map((f) => `${f.n}. ${formatSource(f.source, locale)}`);
}

// ─────────────────────────────────────────────────────────────
// findRelated — cross-ref graph traversal
// ─────────────────────────────────────────────────────────────

/**
 * Bir sergi ID'sinden başlayarak cross-refs grafında BFS yapıp yakın ilgili
 * içerikleri döner. crossRefs bağımlılığı injection ile geçer — bu modül
 * veriye doğrudan bağımlı değildir (test edilmesi kolay, circular import yok).
 *
 * @param {Object} opts
 * @param {string} opts.exhibitId      başlangıç sergi ID
 * @param {Object} opts.crossRefs      build-crossrefs.js'ten üretilmiş indeks
 * @param {number} opts.depth          BFS derinliği (default 2)
 * @param {number} opts.limit          döndürülecek max sonuç (default 6)
 * @returns {Array} [{id, type, distance}] — type ∈ {'exhibit','story','lab','quiz'}
 */
export function findRelated({ exhibitId, crossRefs, depth = 2, limit = 6 }) {
  if (!exhibitId || !crossRefs) return [];

  const visited = new Set([`exhibit:${exhibitId}`]);
  const queue = [{ id: exhibitId, type: 'exhibit', distance: 0 }];
  const results = [];

  while (queue.length > 0 && results.length < limit) {
    const current = queue.shift();
    if (current.distance > 0) {
      results.push(current);
      if (results.length >= limit) break;
    }
    if (current.distance >= depth) continue;

    const neighbors = getNeighbors(current, crossRefs);
    for (const n of neighbors) {
      const key = `${n.type}:${n.id}`;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ ...n, distance: current.distance + 1 });
      }
    }
  }

  return results;
}

function getNeighbors(node, crossRefs) {
  const out = [];
  if (node.type === 'exhibit') {
    const bucket = crossRefs.byExhibit?.[node.id] || {};
    for (const sid of bucket.stories || []) out.push({ id: sid, type: 'story' });
    for (const lid of bucket.labs || []) out.push({ id: lid, type: 'lab' });
    for (const qid of bucket.quizzes || []) out.push({ id: qid, type: 'quiz' });
    for (const eid of bucket.related || []) out.push({ id: eid, type: 'exhibit' });
  } else if (node.type === 'story') {
    const bucket = crossRefs.byStory?.[node.id] || {};
    for (const eid of bucket.exhibits || []) out.push({ id: eid, type: 'exhibit' });
  } else if (node.type === 'lab') {
    const bucket = crossRefs.byLab?.[node.id] || {};
    for (const eid of bucket.exhibits || []) out.push({ id: eid, type: 'exhibit' });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// pickByCategory — sergi → quiz vb. türetmeler
// ─────────────────────────────────────────────────────────────

export function pickByCategory(items, category, limit = 3) {
  if (!Array.isArray(items) || !category) return [];
  return items.filter((it) => it.cat === category || it.category === category).slice(0, limit);
}

// ─────────────────────────────────────────────────────────────
// formatSpecValue — görünüm formatlayıcı
// ─────────────────────────────────────────────────────────────

/**
 * Specs objesindeki değerleri UI'da tutarlı göstermek için.
 *  - number ise locale'e göre binlik ayraç
 *  - "1.75 g" gibi zaten string ise olduğu gibi
 *  - null/undefined ise "—"
 */
export function formatSpecValue(value, locale = 'tr') {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'number') {
    try {
      return value.toLocaleString(locale === 'tr' ? 'tr-TR' : locale === 'ar' ? 'ar' : 'en-US');
    } catch {
      return String(value);
    }
  }
  return String(value);
}

// ─────────────────────────────────────────────────────────────
// citationStyle — formatSource kısayolu (geri uyumluluk için)
// ─────────────────────────────────────────────────────────────

export function citationStyle(source, locale = 'tr') {
  return formatSource(source, locale);
}
