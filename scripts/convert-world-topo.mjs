#!/usr/bin/env node
/**
 * convert-world-topo.mjs — Faz 6-D one-shot veri dönüşümü
 *
 * world-atlas npm paketindeki countries-110m TopoJSON dosyasını alır,
 * topojson-client ile GeoJSON'a dönüştürür, optimize eder ve
 * public/geo/countries-110m.geojson olarak yazar.
 *
 * Çalıştırma: node scripts/convert-world-topo.mjs
 *
 * Bu script tekil çalışır; çıktısı public'e commit edilir. Projede
 * topojson veya world-atlas runtime dependency olarak yoktur.
 *
 * Lisans: world-atlas (ISC), Natural Earth (public domain).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// topojson-client UMD bundle'ını inline çalıştır.
// (Kurulu olmadığında da çalışsın diye /tmp'den okumaya da izin verir.)
async function loadTopojson() {
  const candidates = [
    join(projectRoot, 'node_modules/topojson-client/dist/topojson-client.js'),
    '/tmp/topojson-tmp/package/dist/topojson-client.js',
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      const code = readFileSync(p, 'utf8');
      const factory = new Function('exports', 'module', 'globalThis', code + '\nreturn typeof exports !== "undefined" ? exports : globalThis.topojson;');
      const exports = {};
      const module = { exports };
      const globalThisShim = {};
      return factory(exports, module, globalThisShim);
    }
  }
  throw new Error('topojson-client not found in node_modules or /tmp');
}

async function loadTopoData() {
  const candidates = [
    join(projectRoot, 'node_modules/world-atlas/countries-110m.json'),
    '/tmp/world-atlas-tmp/package/countries-110m.json',
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      return JSON.parse(readFileSync(p, 'utf8'));
    }
  }
  throw new Error('world-atlas countries-110m.json not found');
}

async function main() {
  console.log('Loading topojson-client...');
  const topojson = await loadTopojson();
  console.log('Loading world-atlas countries-110m...');
  const topo = await loadTopoData();

  const featureCollection = topojson.feature(topo, topo.objects.countries);
  console.log(`  → ${featureCollection.features.length} countries`);

  // Sadeleştirilmiş GeoJSON: properties'ten id ve name dışında her şeyi at,
  // float precision 3 ondalığa yuvarla (~100m hassasiyet; Z0-Z6 için fazlasıyla yeterli).
  const simplified = {
    type: 'FeatureCollection',
    features: featureCollection.features.map((f) => ({
      type: 'Feature',
      properties: {
        id: f.id,
        name: f.properties?.name || null,
      },
      geometry: roundCoords(f.geometry, 3),
    })),
  };

  const outDir = join(projectRoot, 'public/geo');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, 'countries-110m.geojson');
  writeFileSync(outPath, JSON.stringify(simplified));
  const stat = readFileSync(outPath).length;
  console.log(`✓ Wrote ${outPath} (${(stat / 1024).toFixed(1)} KB)`);
}

function roundCoords(geom, precision) {
  if (!geom) return geom;
  const p = Math.pow(10, precision);
  const round = (n) => Math.round(n * p) / p;
  function walk(coords) {
    if (typeof coords[0] === 'number') {
      return [round(coords[0]), round(coords[1])];
    }
    return coords.map(walk);
  }
  return {
    type: geom.type,
    coordinates: walk(geom.coordinates),
  };
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
