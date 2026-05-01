import { MapPin, Calendar, Package, ShieldAlert } from 'lucide-react';
import { pick } from '../../utils/helpers.js';

/**
 * WorkshopHero — Faz 6-G
 *
 * Aktif atölyenin step-by-step içeriğinin ÜSTÜNDE render edilir.
 * 4 bölüm (hepsi opsiyonel):
 *   - intro paragrafı (subtitle'dan daha derin)
 *   - origin meta strip (yer + dönem)
 *   - materials grid (4-6 öğe)
 *   - safetyNote alert
 *
 * Atölyenin kendi "steps" walkthrough'u bu bölümün ALTINDA durur;
 * hero ona hiç dokunmaz.
 *
 * props:
 *   intro?:      {tr,en,ar}
 *   origin?:     {place:{tr,en,ar}, era?:{start,end}}
 *   materials?:  [{emoji, name:{tr,en,ar}, note?:{tr,en,ar}}]
 *   safetyNote?: {tr,en,ar}
 *   tone:        string — renk (active.tone)
 *   locale:      'tr' | 'en' | 'ar'
 */
export default function WorkshopHero({
  intro,
  origin,
  materials,
  safetyNote,
  tone,
  locale = 'tr',
}) {
  const hasAny = intro || origin || (materials?.length) || safetyNote;
  if (!hasAny) return null;

  const eraStr = origin?.era ? formatEra(origin.era, locale) : null;

  return (
    <div className="mb-6">
      {/* Intro */}
      {intro && (
        <p className="text-ink/80 leading-relaxed text-base sm:text-lg mb-4">
          {pick(intro, locale)}
        </p>
      )}

      {/* Origin strip (place + era) */}
      {origin && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {origin.place && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{
                background: `color-mix(in srgb, ${tone} 12%, white)`,
                color: `color-mix(in srgb, ${tone} 90%, black)`,
              }}
            >
              <MapPin size={12} />
              {pick(origin.place, locale)}
            </span>
          )}
          {eraStr && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{
                background: 'rgba(27,40,69,0.06)',
                color: 'rgba(27,40,69,0.8)',
              }}
            >
              <Calendar size={12} />
              {eraStr}
            </span>
          )}
        </div>
      )}

      {/* Materials grid */}
      {Array.isArray(materials) && materials.length > 0 && (
        <div
          className="rounded-2xl p-4 border mb-4"
          style={{
            background: `color-mix(in srgb, ${tone} 6%, white)`,
            borderColor: `color-mix(in srgb, ${tone} 25%, transparent)`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-cream"
              style={{ background: tone }}
              aria-hidden
            >
              <Package size={14} />
            </span>
            <h3 className="text-label-plate" style={{ color: tone }}>
              {{ tr: 'Gereksinimler', en: 'Materials', ar: 'الأدوات والمواد' }[locale] || 'Materials'}
            </h3>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {materials.map((m, i) => (
              <li key={i} className="flex items-start gap-2 leading-snug">
                <span className="shrink-0 text-base" aria-hidden>{m.emoji || '•'}</span>
                <span className="text-ink/85">
                  <strong className="font-bold">{pick(m.name, locale)}</strong>
                  {m.note && (
                    <span className="block text-ink/55 text-xs mt-0.5">
                      {pick(m.note, locale)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety note */}
      {safetyNote && (
        <aside
          className="rounded-xl p-3 flex items-start gap-2 border text-sm mb-2"
          style={{
            background: 'rgba(231, 126, 34, 0.06)',
            borderColor: 'rgba(231, 126, 34, 0.25)',
          }}
        >
          <ShieldAlert
            size={16}
            className="shrink-0 mt-0.5"
            style={{ color: '#b9660e' }}
            aria-hidden
          />
          <div>
            <div
              className="text-label-plate mb-0.5"
              style={{ color: '#b9660e' }}
            >
              {{ tr: 'Not', en: 'Note', ar: 'ملاحظة' }[locale] || 'Note'}
            </div>
            <p className="text-ink/85 leading-relaxed">
              {pick(safetyNote, locale)}
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}

function formatEra(era, locale) {
  const s = era.start;
  const e = era.end;
  const present = { tr: 'bugün', en: 'today', ar: 'اليوم' }[locale] || 'today';
  if (e === null || e === undefined) {
    return `${s} → ${present}`;
  }
  return `${s} → ${e}`;
}
