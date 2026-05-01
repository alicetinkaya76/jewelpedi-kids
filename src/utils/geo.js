/**
 * geo.js — simple geographic helpers for the World Tour game.
 *
 * The game needs two things:
 *  1. Convert SVG click coordinates to lat/lng (the map is an equirectangular
 *     projection — x maps linearly to longitude, y maps linearly to latitude).
 *  2. Compute great-circle distance between two lat/lng points (Haversine).
 *
 * Kept fully standalone — no imports — so it tree-shakes cleanly if other
 * parts of the app ever need just the distance fn.
 */

const R_KM = 6371;   // Earth radius

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Haversine great-circle distance in kilometres between two {lat, lng}.
 */
export function haversineKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLng / 2);
  const aa = s1 * s1 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * s2 * s2;
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R_KM * c;
}

/**
 * Map SVG local coordinates → lat/lng given the map's bounding box.
 * Assumes an equirectangular projection:
 *   x ∈ [0, width]  → lng ∈ [lngMin, lngMax]
 *   y ∈ [0, height] → lat ∈ [latMax, latMin]   (note: inverted)
 */
export function svgToLatLng({ x, y, width, height }, bbox) {
  const lng = bbox.lngMin + (x / width) * (bbox.lngMax - bbox.lngMin);
  const lat = bbox.latMax - (y / height) * (bbox.latMax - bbox.latMin);
  return { lat, lng };
}

/** Inverse — lat/lng → svg local pixels. Useful for rendering pins. */
export function latLngToSvg({ lat, lng }, bbox, width, height) {
  const x = ((lng - bbox.lngMin) / (bbox.lngMax - bbox.lngMin)) * width;
  const y = ((bbox.latMax - lat)  / (bbox.latMax - bbox.latMin)) * height;
  return { x, y };
}

/**
 * Convert raw km distance to a score tier & numeric points.
 * Matches the scoring brief in the game spec.
 */
export function distanceToScore(km) {
  if (km < 500)  return { points: 100, tier: 'bullseye' };
  if (km < 1000) return { points: 70,  tier: 'close' };
  if (km < 2000) return { points: 40,  tier: 'near' };
  if (km < 4000) return { points: 20,  tier: 'far' };
  return { points: 10, tier: 'cold' };
}

/** World bounding box — standard equirectangular, clipped to ±75° lat so
 *  the Arctic/Antarctica don't stretch disproportionately. */
export const WORLD_BBOX = {
  lngMin: -180, lngMax: 180,
  latMin: -60, latMax: 75,
};
