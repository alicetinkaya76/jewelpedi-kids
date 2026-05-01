#!/usr/bin/env node
/**
 * extract-turkey-50m.mjs — Faz 6-D
 *
 * world-atlas countries-50m TopoJSON'undan yalnızca Türkiye feature'ını
 * çıkarır, `public/geo/turkey-50m.geojson` olarak yazar. Dünya haritası
 * 110m kullanırken Türkiye zoom'unda daha detaylı sınır için.
 *
 * Çalıştırma: node scripts/extract-turkey-50m.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function loadTopojson() {
  const candidates = [
    join(projectRoot, 'node_modules/topojson-client/dist/topojson-client.js'),
    '/tmp/topojson-tmp/package/dist/topojson-client.js',
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      const code = readFileSync(p, 'utf8');
      const factory = new Function(
        'exports', 'module', 'globalThis',
        code + '\nreturn typeof exports !== "undefined" ? exports : globalThis.topojson;',
      );
      return factory({}, { exports: {} }, {});
    }
  }
  throw new Error('topojson-client not found');
}

async function loadTopo50m() {
  const candidates = [
    join(projectRoot, 'node_modules/world-atlas/countries-50m.json'),
    '/tmp/world-atlas-tmp/package/countries-50m.json',
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      return JSON.parse(readFileSync(p, 'utf8'));
    }
  }
  throw new Error('countries-50m.json not found');
}

async function main() {
  const topojson = await loadTopojson();
  const topo = await loadTopo50m();
  const fc = topojson.feature(topo, topo.objects.countries);

  // Türkiye: NE id "792", name "Turkey"
  const turkey =
    fc.features.find((f) => f.properties?.name === 'Turkey') ||
    fc.features.find((f) => String(f.id) === '792');

  if (!turkey) {
    throw new Error('Turkey feature not found in countries-50m');
  }

  const out = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          id: turkey.id,
          name: turkey.properties?.name || 'Turkey',
        },
        geometry: roundCoords(turkey.geometry, 3),
      },
    ],
  };

  const outPath = join(projectRoot, 'public/geo/turkey-50m.geojson');
  writeFileSync(outPath, JSON.stringify(out));
  const size = readFileSync(outPath).length;
  console.log(`✓ Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
}

function roundCoords(geom, precision) {
  if (!geom) return geom;
  const p = Math.pow(10, precision);
  const round = (n) => Math.round(n * p) / p;
  const walk = (coords) =>
    typeof coords[0] === 'number'
      ? [round(coords[0]), round(coords[1])]
      : coords.map(walk);
  return { type: geom.type, coordinates: walk(geom.coordinates) };
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
