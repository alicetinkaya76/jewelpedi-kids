import { Clock, Heart, Sparkles } from 'lucide-react';
import { cx } from '../../utils/helpers.js';

/**
 * ScoreBoard — persistent header shown above every game.
 * Shows score, optional timer, optional lives, optional combo multiplier.
 * Fully responsive; pill-style items collapse gracefully on narrow mobile.
 *
 * Props are all optional; only the ones passed in are rendered.
 */
export default function ScoreBoard({
  score,
  time,         // seconds remaining (number) — rendered mm:ss
  lives,        // number of lives remaining
  maxLives = 3,
  combo,        // multiplier e.g. 1.5 → "×1.5"
  accent = '#1b2845',
  extra,        // free-form React node (e.g. "Round 3/5")
  className,
}) {
  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-2 sm:gap-3',
        'rounded-2xl bg-white/95 border border-ink/10 shadow-museum',
        'px-3 py-2 sm:px-4 sm:py-2.5',
        className,
      )}
    >
      {/* Score — always present */}
      <Pill
        icon={<Sparkles size={14} />}
        label={typeof score === 'number' ? score.toLocaleString() : '0'}
        accent={accent}
      />

      {typeof time === 'number' && (
        <Pill icon={<Clock size={14} />} label={formatTime(time)} accent="#1b2845" />
      )}

      {typeof lives === 'number' && (
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-ink/5"
          aria-label={`${lives}/${maxLives} lives`}
        >
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart
              key={i}
              size={14}
              className={i < lives ? 'text-rose-500' : 'text-ink/20'}
              fill={i < lives ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {combo > 1 && (
        <span
          className="px-2 py-1 rounded-full text-[11px] font-extrabold animate-popIn"
          style={{
            background: `color-mix(in srgb, ${accent} 15%, white)`,
            color: accent,
          }}
        >
          ×{combo.toFixed(combo % 1 === 0 ? 0 : 1)}
        </span>
      )}

      {extra && <span className="ml-auto text-xs font-bold text-ink/60">{extra}</span>}
    </div>
  );
}

function Pill({ icon, label, accent }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold"
      style={{
        background: `color-mix(in srgb, ${accent} 12%, white)`,
        color: accent,
      }}
    >
      {icon}
      {label}
    </span>
  );
}

function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
