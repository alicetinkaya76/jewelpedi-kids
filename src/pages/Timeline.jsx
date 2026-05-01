import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Info, Filter } from 'lucide-react';
import {
  timelineEvents,
  timelineCategories,
  getSortedEvents,
} from '../data/timelineEvents.js';
import { getExhibit } from '../data/exhibits/index.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import { GemIcon } from '../components/icons/gems/index.js';
import { LabelPlate } from '../components/museum/index.js';
import SpotLight from '../components/museum/SpotLight.jsx';
import { iconFor } from '../utils/iconFor.js';

const CATEGORY_COLOR = {
  mining: '#a04000',
  metallurgy: '#d4a017',
  gemology: '#5dade2',
  craft: '#566573',
  culture: '#8e44ad',
  discovery: '#27ae60',
};

export default function Timeline() {
  const { locale } = useLocale();
  const [activeCat, setActiveCat] = useState('all');

  const events = useMemo(() => {
    const sorted = getSortedEvents();
    return activeCat === 'all'
      ? sorted
      : sorted.filter((e) => e.category === activeCat);
  }, [activeCat]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <SpotLight variant="cool" corner="tr" intensity={0.45} />

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <LabelPlate
            caption={
              { tr: 'Zaman Çizgisi', en: 'Timeline', ar: 'الخط الزمني' }[locale]
            }
            size="sm"
          />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink leading-tight text-engraved">
          {{
            tr: '6000 Yıllık Yolculuk',
            en: '6,000 Years of Journey',
            ar: 'رحلة 6000 عام',
          }[locale]}
        </h1>
        <p className="mt-3 text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed">
          {{
            tr: 'Varna\'dan 4000 yıl önce başlayıp günümüze uzanan mücevher ve zanaat tarihi. Sağa kaydırarak zamanda ilerle.',
            en: 'From Varna 6,000 years ago to today — the history of jewelry and craft. Scroll right to move forward in time.',
            ar: 'من فارنا قبل 6000 سنة إلى اليوم. اسحب لليمين للمضي قُدماً في الزمن.',
          }[locale]}
        </p>
      </header>

      {/* Category filter */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2">
        <Filter size={14} className="text-ink/50 shrink-0" />
        {timelineCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCat(c.id)}
            className={cx(
              'px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap border transition',
              activeCat === c.id
                ? 'bg-ink text-cream border-ink'
                : 'bg-white/80 text-ink/70 border-ink/15 hover:border-ink/30',
            )}
            aria-pressed={activeCat === c.id}
          >
            <span className="mr-1" aria-hidden>{c.emoji}</span>
            {pick(c, locale)}
          </button>
        ))}
      </div>

      {/* Count & hint */}
      <p className="text-xs text-ink/50 uppercase tracking-widest font-bold mb-4 text-center">
        {events.length} {{ tr: 'olay', en: 'events', ar: 'حدث' }[locale]} ·{' '}
        {{
          tr: 'Yatay olarak kaydırın →',
          en: 'Scroll horizontally →',
          ar: 'اسحب أفقياً →',
        }[locale]}
      </p>

      <TimelineStrip events={events} locale={locale} />

      {/* Legend */}
      <section className="mt-10 grid sm:grid-cols-3 md:grid-cols-6 gap-3">
        {timelineCategories
          .filter((c) => c.id !== 'all')
          .map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 text-xs text-ink/70"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: CATEGORY_COLOR[c.id] }}
                aria-hidden="true"
              />
              <span className="font-bold">{pick(c, locale)}</span>
              <span className="text-ink/40">
                ({timelineEvents.filter((e) => e.category === c.id).length})
              </span>
            </div>
          ))}
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TimelineStrip — horizontal scrollable events on axis
   ══════════════════════════════════════════════════════════ */
function TimelineStrip({ events, locale }) {
  const scrollRef = useRef(null);

  // Drag-to-scroll support
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const down = (e) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = (e.pageX || e.touches?.[0].pageX || 0) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const up = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };
    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.pageX || e.touches?.[0].pageX || 0) - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseleave', up);
    el.addEventListener('mouseup', up);
    el.addEventListener('mousemove', move);
    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mouseleave', up);
      el.removeEventListener('mouseup', up);
      el.removeEventListener('mousemove', move);
    };
  }, [events]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-6 cursor-grab select-none rounded-3xl"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="relative inline-block min-w-full" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
          {/* Axis line */}
          <div
            className="absolute left-0 right-0 h-1 rounded-full pointer-events-none"
            style={{
              top: '50%',
              background: 'linear-gradient(to right, #e6d9b8, #d4b16a, #e6d9b8)',
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-6 py-8 relative">
            {events.map((ev, i) => (
              <EventCard key={i} event={ev} index={i} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, index, locale }) {
  const isAbove = index % 2 === 0;
  const color = CATEGORY_COLOR[event.category] || '#8e44ad';
  const title = pick(event.title, locale);
  const desc = pick(event.description, locale);
  const year = formatYear(event.year, locale);
  const linkedExhibit = event.exhibit ? getExhibit(event.exhibit) : null;
  const iconInfo = linkedExhibit
    ? iconFor(linkedExhibit, linkedExhibit.cat)
    : null;

  const cardContent = (
    <div
      className={cx(
        'w-56 rounded-2xl p-4 bg-white/95 shadow-museum border border-ink/8 transition',
        linkedExhibit && 'hover:shadow-museum hover:-translate-y-0.5',
      )}
      style={{ borderLeftWidth: 4, borderLeftColor: color }}
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-extrabold mb-1" style={{ color }}>
        <span>{pick(timelineCategories.find((c) => c.id === event.category), locale)}</span>
      </div>
      <div className="font-display font-extrabold text-ink leading-snug text-sm mb-2">
        {title}
      </div>
      <p className="text-xs text-ink/65 leading-snug">{desc}</p>
      {iconInfo && (
        <div className="mt-3 pt-3 border-t border-ink/5 flex items-center gap-2 text-[11px] font-bold text-ink/60">
          <GemIcon id={iconInfo.id} size={18} />
          <span className="truncate">→ {pick(linkedExhibit.name, locale)}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="shrink-0 relative flex flex-col items-center" style={{ width: '14rem' }}>
      {isAbove ? (
        <>
          {/* Card above */}
          {linkedExhibit ? (
            <Link to={`/halls/${linkedExhibit.cat}/${linkedExhibit.id}`} className="block">
              {cardContent}
            </Link>
          ) : (
            cardContent
          )}
          {/* Connector */}
          <div
            className="w-px h-4"
            style={{ background: color }}
            aria-hidden="true"
          />
          {/* Dot */}
          <div
            className="w-5 h-5 rounded-full ring-4 ring-cream relative z-10 flex items-center justify-center"
            style={{ background: color }}
            aria-hidden="true"
          />
          {/* Year */}
          <div
            className="mt-2 font-display text-lg font-extrabold tabular-nums"
            style={{ color }}
          >
            {year}
          </div>
        </>
      ) : (
        <>
          {/* Year */}
          <div
            className="mb-2 font-display text-lg font-extrabold tabular-nums"
            style={{ color }}
          >
            {year}
          </div>
          {/* Dot */}
          <div
            className="w-5 h-5 rounded-full ring-4 ring-cream relative z-10"
            style={{ background: color }}
            aria-hidden="true"
          />
          {/* Connector */}
          <div
            className="w-px h-4"
            style={{ background: color }}
            aria-hidden="true"
          />
          {/* Card below */}
          {linkedExhibit ? (
            <Link to={`/halls/${linkedExhibit.cat}/${linkedExhibit.id}`} className="block">
              {cardContent}
            </Link>
          ) : (
            cardContent
          )}
        </>
      )}
    </div>
  );
}

function formatYear(y, locale) {
  const str = String(y);
  if (str.startsWith('-')) {
    const n = str.slice(1);
    const prefix = { tr: 'M.Ö.', en: 'BCE', ar: 'ق.م' }[locale] || 'BCE';
    return `${prefix} ${n}`;
  }
  return str;
}
