#!/usr/bin/env node
/**
 * build-crossrefs.js — Faz 6-A
 *
 * Sergi/hikâye/timeline/geoPoint verilerini tarayıp tersine indeks üretir
 * ve src/data/crossRefs.js olarak yazar.
 *
 * Çalıştırma:
 *   node scripts/build-crossrefs.js
 *   npm run build:crossrefs
 *
 * Üretilen dosya:
 *   src/data/crossRefs.js
 *
 * İndeks şeması:
 *   {
 *     byExhibit: {
 *       'exhibit-id': {
 *         stories:   ['story-id', ...],   // bu sergiyi referans alan hikâyeler
 *         labs:      ['lab-id', ...],     // ilgili deneyler (enrichment'tan)
 *         quizzes:   ['category', ...],   // ilgili quiz kategorileri
 *         timeline:  [year, ...],         // bu sergiyi referans alan timeline yılları
 *         geoPoints: ['geo-id', ...],     // bu sergiye bağlı coğrafi noktalar
 *         related:   ['other-exhibit-id', ...] // sergi.related + comparison
 *       }
 *     },
 *     byStory:     { 'story-id': { exhibits: [...] } },
 *     byLab:       { 'lab-id': { exhibits: [...] } },
 *     byGeoPoint:  { 'geo-id': { exhibits: [...] } },
 *     byQuizCategory: { 'cat-id': { exhibits: [...] } },
 *     meta: {
 *       exhibitCount, storyCount, geoPointCount, generatedAt
 *     }
 *   }
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ─── Veri modüllerini dinamik olarak yükle ────────────────────
// ES module import'ları dinamik yapılabilir — Node 18+ ile çalışır
async function loadData() {
  const exhibits = await import(join(projectRoot, 'src/data/exhibits/index.js'));
  const stories = await import(join(projectRoot, 'src/data/stories.js'));
  const timeline = await import(join(projectRoot, 'src/data/timelineEvents.js'));
  const geo = await import(join(projectRoot, 'src/data/geoPoints.js'));

  return {
    exhibits: exhibits.allExhibits,
    stories: stories.stories || stories.default || [],
    timelineEvents: timeline.timelineEvents || [],
    geoPoints: geo.geoPoints || [],
  };
}

// ─── Boş bucket oluşturucu ────────────────────────────────────
function emptyExhibitBucket() {
  return {
    stories: [],
    labs: [],
    quizzes: [],
    timeline: [],
    geoPoints: [],
    related: [],
  };
}

// ─── İndeksi inşa et ─────────────────────────────────────────
function buildIndex({ exhibits, stories, timelineEvents, geoPoints }) {
  const byExhibit = {};
  const byStory = {};
  const byLab = {};
  const byGeoPoint = {};
  const byQuizCategory = {};

  // Tüm sergiler için boş bucket
  for (const ex of exhibits) {
    byExhibit[ex.id] = emptyExhibitBucket();
  }

  // 1) Enrichment'tan gelen doğrudan referanslar
  for (const ex of exhibits) {
    const bucket = byExhibit[ex.id];

    // related (mevcut alan)
    if (Array.isArray(ex.related)) {
      for (const rid of ex.related) {
        if (!bucket.related.includes(rid)) bucket.related.push(rid);
      }
    }

    // comparison.withExhibitId
    if (ex.comparison?.withExhibitId) {
      const rid = ex.comparison.withExhibitId;
      if (!bucket.related.includes(rid)) bucket.related.push(rid);
    }

    // relatedStories
    if (Array.isArray(ex.relatedStories)) {
      for (const sid of ex.relatedStories) {
        if (!bucket.stories.includes(sid)) bucket.stories.push(sid);
        if (!byStory[sid]) byStory[sid] = { exhibits: [] };
        if (!byStory[sid].exhibits.includes(ex.id)) byStory[sid].exhibits.push(ex.id);
      }
    }

    // relatedLabs
    if (Array.isArray(ex.relatedLabs)) {
      for (const lid of ex.relatedLabs) {
        if (!bucket.labs.includes(lid)) bucket.labs.push(lid);
        if (!byLab[lid]) byLab[lid] = { exhibits: [] };
        if (!byLab[lid].exhibits.includes(ex.id)) byLab[lid].exhibits.push(ex.id);
      }
    }

    // relatedQuizzes (kategori bazlı)
    if (Array.isArray(ex.relatedQuizzes)) {
      for (const cid of ex.relatedQuizzes) {
        if (!bucket.quizzes.includes(cid)) bucket.quizzes.push(cid);
        if (!byQuizCategory[cid]) byQuizCategory[cid] = { exhibits: [] };
        if (!byQuizCategory[cid].exhibits.includes(ex.id))
          byQuizCategory[cid].exhibits.push(ex.id);
      }
    }

    // geoPointId
    if (ex.geoPointId) {
      const gid = ex.geoPointId;
      if (!bucket.geoPoints.includes(gid)) bucket.geoPoints.push(gid);
      if (!byGeoPoint[gid]) byGeoPoint[gid] = { exhibits: [] };
      if (!byGeoPoint[gid].exhibits.includes(ex.id))
        byGeoPoint[gid].exhibits.push(ex.id);
    }

    // storyThread (Phase 2 alanı — tek hikâye)
    if (ex.storyThread) {
      const sid = ex.storyThread;
      if (!bucket.stories.includes(sid)) bucket.stories.push(sid);
      if (!byStory[sid]) byStory[sid] = { exhibits: [] };
      if (!byStory[sid].exhibits.includes(ex.id)) byStory[sid].exhibits.push(ex.id);
    }
  }

  // 2) Timeline olayları → sergi bucket'ına timeline yılları ekle
  for (const evt of timelineEvents) {
    if (evt.exhibit && byExhibit[evt.exhibit]) {
      const bucket = byExhibit[evt.exhibit];
      if (!bucket.timeline.includes(evt.year)) bucket.timeline.push(evt.year);
    }
  }

  // 3) geoPoints.exhibitIds → tersine
  for (const geo of geoPoints) {
    if (!Array.isArray(geo.exhibitIds)) continue;
    for (const eid of geo.exhibitIds) {
      if (byExhibit[eid]) {
        if (!byExhibit[eid].geoPoints.includes(geo.id)) {
          byExhibit[eid].geoPoints.push(geo.id);
        }
      }
      if (!byGeoPoint[geo.id]) byGeoPoint[geo.id] = { exhibits: [] };
      if (!byGeoPoint[geo.id].exhibits.includes(eid)) {
        byGeoPoint[geo.id].exhibits.push(eid);
      }
    }
  }

  // 4) stories → içlerinde sergi ID'si geçen var mı kontrol et (referans taraması)
  //    stories.js'te sergi ID'si sahnede/metinde geçiyor olabilir — temel
  //    bağlantıyı enrichment'tan aldık, bu aşama ilerki genişleme için.

  return {
    byExhibit,
    byStory,
    byLab,
    byGeoPoint,
    byQuizCategory,
    meta: {
      exhibitCount: exhibits.length,
      storyCount: Object.keys(byStory).length,
      geoPointCount: geoPoints.length,
      timelineCount: timelineEvents.length,
      generatedAt: new Date().toISOString(),
    },
  };
}

// ─── Dosyaya yaz ─────────────────────────────────────────────
function writeCrossRefs(index) {
  const header = `/**
 * crossRefs.js — OTOMATIK ÜRETİLDİ
 *
 * Bu dosya scripts/build-crossrefs.js tarafından üretilir. ELLE DÜZENLEME!
 * Yeniden üretmek için: npm run build:crossrefs
 *
 * Üretim zamanı: ${index.meta.generatedAt}
 * Sergi: ${index.meta.exhibitCount}, Hikâye ref: ${index.meta.storyCount},
 * Geo: ${index.meta.geoPointCount}, Timeline olay: ${index.meta.timelineCount}
 */

export const crossRefs = ${JSON.stringify(
    {
      byExhibit: index.byExhibit,
      byStory: index.byStory,
      byLab: index.byLab,
      byGeoPoint: index.byGeoPoint,
      byQuizCategory: index.byQuizCategory,
      meta: index.meta,
    },
    null,
    2,
  )};

export default crossRefs;
`;

  const outPath = join(projectRoot, 'src/data/crossRefs.js');
  writeFileSync(outPath, header, 'utf8');
  return outPath;
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('→ Loading data modules…');
  const data = await loadData();

  console.log(
    `  ${data.exhibits.length} exhibits, ${data.stories.length} stories,` +
      ` ${data.geoPoints.length} geoPoints, ${data.timelineEvents.length} timeline events`,
  );

  console.log('→ Building cross-reference index…');
  const index = buildIndex(data);

  console.log('→ Writing src/data/crossRefs.js…');
  const path = writeCrossRefs(index);

  console.log(`✓ Wrote ${path}`);
  console.log(`  byExhibit keys:      ${Object.keys(index.byExhibit).length}`);
  console.log(`  byStory keys:        ${Object.keys(index.byStory).length}`);
  console.log(`  byLab keys:          ${Object.keys(index.byLab).length}`);
  console.log(`  byGeoPoint keys:     ${Object.keys(index.byGeoPoint).length}`);
  console.log(`  byQuizCategory keys: ${Object.keys(index.byQuizCategory).length}`);
}

main().catch((err) => {
  console.error('✗ build-crossrefs failed:', err);
  process.exit(1);
});
