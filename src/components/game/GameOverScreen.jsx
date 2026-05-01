import { Link } from 'react-router-dom';
import { RotateCw, Home, Trophy, ArrowRight } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { pick, cx } from '../../utils/helpers.js';
import EducationalBlurb from './EducationalBlurb.jsx';

/**
 * GameOverScreen — shared result screen for every game.
 *
 * The host game passes:
 *   - score:          final numeric score
 *   - won:            boolean to tint the trophy cream/gold vs neutral
 *   - summary:        { tr, en, ar } — one-line outcome (e.g. "12 eşleşme!")
 *   - bestOf:         optional max-possible score (renders as "score / best")
 *   - blurb:          educational fact dict
 *   - relatedHref:    where "İlgili Sergiler" link points (from game metadata)
 *   - relatedLabel:   { tr, en, ar } — what the related link says
 *   - stats:          optional list of [{ label: {tr,en,ar}, value }]
 *   - accent:         game accent color
 *   - onPlayAgain:    restart callback (reset → idle)
 *   - badgeUnlocked:  optional boolean to show "rozet kazandın!" banner
 */
export default function GameOverScreen({
  score = 0,
  bestOf,
  won = false,
  summary,
  blurb,
  relatedHref,
  relatedLabel,
  stats = [],
  accent = '#1b2845',
  onPlayAgain,
  badgeUnlocked = false,
  badgeName,
  personalBest,
  isNewBest = false,
  difficultyLabel,
}) {
  const { locale } = useLocale();

  const L = {
    tr: {
      title: won ? 'Harika iş!' : 'Süre bitti!',
      score: 'Puanın',
      playAgain: 'Tekrar Oyna',
      backToHub: 'Oyun Merkezine Dön',
      explore: 'İlgili sergiye göz at',
      badge: 'Rozet kazandın:',
      newBest: 'YENİ REKOR!',
      previousBest: 'Önceki en iyi',
    },
    en: {
      title: won ? 'Great job!' : 'Time\'s up!',
      score: 'Your score',
      playAgain: 'Play again',
      backToHub: 'Back to Games',
      explore: 'Explore the related exhibit',
      badge: 'Badge earned:',
      newBest: 'NEW RECORD!',
      previousBest: 'Previous best',
    },
    ar: {
      title: won ? 'أحسنت!' : 'انتهى الوقت!',
      score: 'نتيجتك',
      playAgain: 'العب مجدداً',
      backToHub: 'العودة للألعاب',
      explore: 'استكشف المعرض ذو الصلة',
      badge: 'حصلت على شارة:',
      newBest: 'رقم قياسي جديد!',
      previousBest: 'أفضل سابق',
    },
  }[locale] || {};

  return (
    <div className="animate-popIn">
      {/* Banner — outcome hero */}
      <div
        className="relative rounded-[2rem] overflow-hidden p-6 sm:p-8 text-center border"
        style={{
          background: `linear-gradient(135deg,
            color-mix(in srgb, ${accent} 18%, white) 0%,
            #fff 60%)`,
          borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
        }}
      >
        <Trophy
          size={56}
          className="mx-auto mb-2"
          style={{ color: won ? '#d4a017' : accent }}
        />
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
          {L.title}
        </h2>
        {summary && (
          <p className="text-ink/70 mt-2 text-sm sm:text-base">
            {pick(summary, locale)}
          </p>
        )}

        {/* Big score */}
        <div className="mt-5 mb-1">
          <div className="text-[11px] uppercase tracking-widest font-extrabold text-ink/50">
            {L.score}
          </div>
          <div
            className="font-display text-5xl sm:text-6xl font-extrabold leading-none mt-1"
            style={{ color: accent }}
          >
            {score.toLocaleString()}
            {typeof bestOf === 'number' && (
              <span className="text-xl text-ink/40 font-bold ml-2 rtl:ml-0 rtl:mr-2">
                / {bestOf.toLocaleString()}
              </span>
            )}
          </div>

          {/* Personal best / new record */}
          {isNewBest && score > 0 && (
            <div
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full
                         bg-gold text-ink font-extrabold text-xs
                         shadow-museum animate-popIn"
            >
              <span aria-hidden="true">🔥</span>
              <span className="tracking-widest">{L.newBest}</span>
            </div>
          )}
          {!isNewBest && typeof personalBest === 'number' && personalBest > 0 && score > 0 && (
            <div className="mt-3 text-[11px] font-bold text-ink/50 uppercase tracking-widest">
              {L.previousBest}: <span className="text-ink/80">{personalBest.toLocaleString()}</span>
              {difficultyLabel && (
                <span className="ml-1.5 rtl:ml-0 rtl:mr-1.5 text-ink/40">
                  ({difficultyLabel})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Badge banner */}
        {badgeUnlocked && (
          <div
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full
                       bg-gold-soft border border-gold/40 text-ink font-extrabold animate-fadeUp"
          >
            <span className="text-xl">🏆</span>
            <span className="text-sm">
              {L.badge} <span className="text-gold">{pick(badgeName, locale)}</span>
            </span>
          </div>
        )}
      </div>

      {/* Stats grid (optional) */}
      {stats.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/90 border border-ink/5 p-3 text-center"
            >
              <div className="font-display text-2xl font-extrabold text-ink">
                {s.value}
              </div>
              <div className="text-[11px] font-bold text-ink/60 mt-0.5">
                {pick(s.label, locale)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Educational blurb */}
      {blurb && <div className="mt-5"><EducationalBlurb fact={blurb} accent={accent} /></div>}

      {/* CTA row */}
      <div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
        <button
          onClick={onPlayAgain}
          className={cx(
            'inline-flex items-center gap-2 px-5 py-3 rounded-full',
            'font-extrabold text-cream shadow-museum transition',
            'hover:scale-[1.03] active:scale-[0.98]',
          )}
          style={{ background: accent }}
        >
          <RotateCw size={16} />
          {L.playAgain}
        </button>

        <Link
          to="/games"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full
                     bg-white border border-ink/10 font-bold text-ink
                     hover:bg-ink/5 transition"
        >
          <Home size={14} />
          {L.backToHub}
        </Link>
      </div>

      {/* Related museum link */}
      {relatedHref && (
        <div className="mt-5 text-center">
          <Link
            to={relatedHref}
            className="inline-flex items-center gap-1.5 text-sm font-bold
                       text-ink/60 hover:text-ink underline-offset-4 hover:underline"
          >
            {relatedLabel ? pick(relatedLabel, locale) : L.explore}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
