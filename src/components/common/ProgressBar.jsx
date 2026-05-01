import { clamp } from '../../utils/helpers.js';

/**
 * Basit ilerleme çubuğu.
 * value: 0-1 arası sayı (0.45 = %45)
 */
export default function ProgressBar({ value = 0, label, tone = 'gold' }) {
  const v = clamp(value, 0, 1);
  const pctStr = `${Math.round(v * 100)}%`;

  const toneClass = {
    gold: 'progress-gold',
    ink: 'bg-ink',
    gem: 'bg-gem',
  }[tone] || 'progress-gold';

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between text-xs font-bold text-ink/60 mb-1.5">
          <span>{label}</span>
          <span>{pctStr}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(v * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 w-full rounded-full bg-ink/10 overflow-hidden shadow-inner"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${toneClass}`}
          style={{ width: pctStr }}
        />
      </div>
    </div>
  );
}
