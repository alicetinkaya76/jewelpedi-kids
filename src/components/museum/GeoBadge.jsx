import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const LABEL = {
  tr: 'Nereden?',
  en: 'Origin',
  ar: 'من أين؟',
};

/**
 * GeoBadge — sergi üzerinde küçük, tıklanabilir bir coğrafi köken rozeti.
 *
 * geoPoint: { id, name:{tr,en,ar}, place:{tr,en,ar}, hintRegion:{tr,en,ar}, kind }
 *
 * Tıklanırsa Faz 6-D'de haritada o noktayı vurgular; şimdilik /map rotasına
 * gider (hash ile id taşınır; map sayfası Faz 6-D'de bunu okur).
 */
export default function GeoBadge({ geoPoint, locale }) {
  if (!geoPoint) return null;

  const place =
    pickFirst(geoPoint.place, locale) ||
    pickFirst(geoPoint.name, locale) ||
    '';
  const region = pickFirst(geoPoint.hintRegion, locale);

  return (
    <Link
      to={`/map#${encodeURIComponent(geoPoint.id)}`}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                 bg-white/80 border border-ink/10 hover:border-ink/30
                 text-sm font-bold text-ink/80 hover:text-ink lift-on-hover transition
                 max-w-full"
      aria-label={`${LABEL[locale] || LABEL.tr}: ${place}${region ? ', ' + region : ''}`}
    >
      <MapPin
        size={14}
        style={{ color: 'var(--hall-accent)' }}
        aria-hidden
      />
      <span className="text-label-plate text-ink/50 shrink-0">
        {LABEL[locale] || LABEL.tr}
      </span>
      <span className="truncate">
        {place}
        {region && <span className="text-ink/50 font-normal">, {region}</span>}
      </span>
    </Link>
  );
}

function pickFirst(obj, locale) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[locale] || obj.tr || obj.en || '';
}
