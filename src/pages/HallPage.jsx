import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ChevronLeft, BookOpen, BadgeCheck, Headphones, MapPin } from 'lucide-react';
import { getHall } from '../data/halls.js';
import { getExhibitsByHall } from '../data/exhibits/index.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { pick, hallTheme } from '../utils/helpers.js';
import CuratorNote from '../components/common/CuratorNote.jsx';
import ExhibitStand from '../components/common/ExhibitStand.jsx';

const STATS_LABELS = {
  stands: { tr: 'sergi', en: 'exhibits', ar: 'معرض' },
  sourced: { tr: 'kaynaklı', en: 'with sources', ar: 'موثق' },
  audio: { tr: 'sesli anlatımlı', en: 'with narration', ar: 'مع سرد' },
  geo: { tr: 'haritalı', en: 'on the map', ar: 'على الخريطة' },
};

export default function HallPage() {
  const { hallId } = useParams();
  const { t, locale } = useLocale();
  const { visitHall } = useProgress();
  const hall = getHall(hallId);

  useEffect(() => {
    if (hall) visitHall(hall.id);
  }, [hall, visitHall]);

  if (!hall) return <Navigate to="/halls" replace />;
  const exhibits = getExhibitsByHall(hall.id);

  // Faz 6-B: hall-level enrichment istatistikleri
  const stats = {
    total: exhibits.length,
    sourced: exhibits.filter(
      (e) => (e.sources && e.sources.length > 0) ||
             (e.specs && Array.isArray(e.specs.cite) && e.specs.cite.length > 0),
    ).length,
    audio: exhibits.filter((e) => !!e.audioScript).length,
    geo: exhibits.filter((e) => !!e.geoPointId).length,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 hall-theme" style={hallTheme(hall)}>
      <Link
        to="/halls"
        className="inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink mb-4"
      >
        <ChevronLeft size={16} /> {t('hall.backToHalls')}
      </Link>

      {/* Hall header */}
      <div
        className="rounded-[2.5rem] p-6 sm:p-10 mb-8 border shadow-museum"
        style={{
          background: `linear-gradient(135deg, ${hall.soft}, white 65%)`,
          borderColor: `color-mix(in srgb, ${hall.accent} 25%, transparent)`,
        }}
      >
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-5xl ring-8 ring-white/70"
            style={{ background: `color-mix(in srgb, ${hall.accent} 22%, white)` }}
          >
            {hall.emoji}
          </div>
          <div>
            <h1
              className="font-display text-4xl sm:text-5xl font-extrabold leading-tight"
              style={{ color: hall.ink }}
            >
              {pick(hall.name, locale)}
            </h1>
            <p className="mt-2 text-lg text-ink/70">{pick(hall.tagline, locale)}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest"
                  style={{ color: hall.accent }}>
              {exhibits.length} {t('hall.stands')}
            </span>
          </div>
        </div>
      </div>

      {/* Faz 6-B: Hall enrichment stats strip */}
      {stats.total > 0 && (
        <HallStatsStrip stats={stats} accent={hall.accent} locale={locale} />
      )}

      <div className="mb-8">
        <CuratorNote note={hall.curatorNote} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
        {exhibits.map((ex, i) => (
          <div key={ex.id} style={{ animationDelay: `${i * 40}ms` }}>
            <ExhibitStand exhibit={ex} hallId={hall.id} index={i} />
          </div>
        ))}
      </div>

      {exhibits.length === 0 && (
        <div className="rounded-3xl p-10 text-center bg-white/70 border border-ink/5 text-ink/60 font-bold">
          {{
            tr: 'Bu salon henüz hazırlanıyor. Yakında!',
            en: 'This hall is being prepared. Coming soon!',
            ar: 'يتم إعداد هذه القاعة. قريباً!',
          }[locale] || 'Bu salon henüz hazırlanıyor. Yakında!'}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   HallStatsStrip — Faz 6-B: 4 small stat chips at hall level
   ────────────────────────────────────────────────────────────── */
function HallStatsStrip({ stats, accent, locale }) {
  const items = [
    { key: 'total',   Icon: BookOpen,    n: stats.total,   label: STATS_LABELS.stands },
    { key: 'sourced', Icon: BadgeCheck,  n: stats.sourced, label: STATS_LABELS.sourced },
    { key: 'audio',   Icon: Headphones,  n: stats.audio,   label: STATS_LABELS.audio },
    { key: 'geo',     Icon: MapPin,      n: stats.geo,     label: STATS_LABELS.geo },
  ].filter((item) => item.n > 0);

  if (items.length === 0) return null;

  return (
    <div
      className="rounded-3xl mb-6 p-4 sm:p-5 border bg-white/70 flex flex-wrap gap-4 sm:gap-6 items-center"
      style={{
        borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`,
      }}
    >
      {items.map(({ key, Icon, n, label }) => (
        <div key={key} className="flex items-center gap-2 text-sm">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-cream"
            style={{ background: accent }}
            aria-hidden
          >
            <Icon size={14} />
          </span>
          <div className="leading-tight">
            <span className="font-display font-extrabold text-ink text-lg">
              {n}
            </span>
            <span className="text-ink/60 ml-1.5">
              {label[locale] || label.tr}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
