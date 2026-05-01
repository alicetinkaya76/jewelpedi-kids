import { useLocale } from '../../context/LocaleContext.jsx';
import { DIFFICULTIES, DIFFICULTY_LABELS } from '../../data/games.js';
import { pick, cx } from '../../utils/helpers.js';

/**
 * DifficultyPicker — 3 big buttons (Çırak / Kalfa / Usta).
 * Single source of truth for difficulty strings comes from games.js
 * so every game sees the same labels.
 */
export default function DifficultyPicker({
  value,
  onChange,
  accent = '#1b2845',
  descriptions, // optional { cirak, kalfa, usta } object of translated strings
}) {
  const { t, locale } = useLocale();

  return (
    <div>
      <div className="text-xs font-extrabold uppercase tracking-widest text-ink/60 mb-3">
        {t('quiz.difficulty')}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {DIFFICULTIES.map((lvl, idx) => {
          const isActive = value === lvl;
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onChange(lvl)}
              aria-pressed={isActive}
              className={cx(
                'relative rounded-2xl border-2 px-2 py-3 sm:py-4 text-center transition',
                'font-display font-extrabold',
                isActive
                  ? 'text-cream shadow-museum scale-[1.02]'
                  : 'bg-white border-ink/10 text-ink/80 hover:border-ink/30',
              )}
              style={
                isActive
                  ? { background: accent, borderColor: accent }
                  : undefined
              }
            >
              <div className="flex items-center justify-center gap-0.5 mb-1" aria-hidden="true">
                {Array.from({ length: idx + 1 }).map((_, i) => (
                  <span
                    key={i}
                    className={cx(
                      'text-xs',
                      isActive ? 'text-gold' : 'text-gold',
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="text-sm sm:text-base">
                {pick(DIFFICULTY_LABELS[lvl], locale)}
              </div>
              {descriptions?.[lvl] && (
                <div
                  className={cx(
                    'text-[10px] font-bold mt-1 leading-tight',
                    isActive ? 'text-cream/80' : 'text-ink/50',
                  )}
                >
                  {descriptions[lvl]}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
