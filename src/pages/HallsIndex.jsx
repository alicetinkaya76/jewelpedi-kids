import { Link } from 'react-router-dom';
import { halls } from '../data/halls.js';
import { getExhibitsByHall } from '../data/exhibits/index.js';
import { useLocale } from '../context/LocaleContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { pick, cx } from '../utils/helpers.js';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HallsIndex() {
  const { t, locale } = useLocale();
  const { visitedHalls } = useProgress();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
        {t('nav.halls')}
      </h1>
      <p className="text-ink/60 mb-8 max-w-2xl">
        {{
          tr: 'Yedi farklı sergi salonu, her birinde ayrı bir dünya. Birini seç ve keşfe başla.',
          en: 'Seven different exhibit halls, each a world of its own. Pick one and begin exploring.',
          ar: 'سبع قاعات معارض، كل واحدة عالم قائم بذاته. اختر إحداها وابدأ الاستكشاف.',
        }[locale] || 'Yedi farklı sergi salonu, her birinde ayrı bir dünya.'}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {halls.map((hall, i) => {
          const count = getExhibitsByHall(hall.id).length;
          const visited = visitedHalls.has(hall.id);
          return (
            <Link
              key={hall.id}
              to={`/halls/${hall.id}`}
              className={cx(
                'relative block rounded-3xl p-6 border shadow-museum lift-on-hover animate-fadeUp',
                visited && 'ring-2 ring-gem/40',
              )}
              style={{
                background: `linear-gradient(140deg, ${hall.soft}, white 80%)`,
                borderColor: `color-mix(in srgb, ${hall.accent} 25%, transparent)`,
                animationDelay: `${i * 50}ms`,
              }}
            >
              {visited && (
                <CheckCircle2
                  size={18}
                  className="absolute top-4 right-4 text-gem"
                  aria-label="Ziyaret edildi"
                />
              )}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ring-4 ring-white/70 mb-4"
                style={{ background: `color-mix(in srgb, ${hall.accent} 20%, white)` }}
              >
                {hall.emoji}
              </div>
              <h2
                className="font-display text-2xl font-extrabold mb-1"
                style={{ color: hall.ink }}
              >
                {pick(hall.name, locale)}
              </h2>
              <p className="text-sm text-ink/70 leading-snug mb-3">{pick(hall.tagline, locale)}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-ink/50">
                  {count} {t('hall.stands')}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-sm font-bold"
                  style={{ color: hall.accent }}
                >
                  {t('lobby.enterHall')} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
