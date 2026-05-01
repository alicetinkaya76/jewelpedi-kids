import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useSound } from '../../audio/SoundContext.jsx';
import { pick } from '../../utils/helpers.js';
import { iconFor } from '../../utils/iconFor.js';
import { DisplayCase } from '../museum/index.js';
import { GemIcon } from '../icons/gems/index.js';

/**
 * ExhibitStand — a single exhibit card in a hall's grid.
 *
 * Phase 1 rebuild: now composed of:
 *   • DisplayCase  (vitrine chrome + spotlight + optional top number plaque)
 *   • GemIcon      (hand-drawn SVG, no emoji)
 *   • existing metadata (interactive badge, intro, visited state)
 *
 * An exhibit number is optional (pass `index` prop from the hall list). When
 * no index is given, the number plaque is hidden.
 */
export default function ExhibitStand({ exhibit, hallId, index }) {
  const { locale, t } = useLocale();
  const { visitedExhibits } = useProgress();
  const { play } = useSound();
  const visited = visitedExhibits.has(exhibit.id);

  const icon = iconFor(exhibit, hallId);
  const exhibitNumber = typeof index === 'number' ? index + 1 : undefined;

  return (
    <DisplayCase
      to={`/halls/${hallId}/${exhibit.id}`}
      emphasis={exhibit.accent}
      interactive
      number={exhibitNumber}
      onClick={() => play('open-case')}
      ariaLabel={pick(exhibit.name, locale)}
      corner={
        visited ? (
          <span
            className="w-6 h-6 rounded-full bg-gem/15 text-gem flex items-center justify-center"
            aria-label="Visited"
            title={t('achievements.unlocked')}
          >
            <CheckCircle2 size={14} />
          </span>
        ) : null
      }
      className="h-full"
    >
      <div className="flex items-start gap-3 mb-3">
        {/* Hand-drawn gem icon replaces emoji tile */}
        <span
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center
                     ring-4 ring-white/60 shadow-sm animate-revealGem"
          style={{
            background: `color-mix(in srgb, ${exhibit.accent} 14%, white)`,
          }}
          aria-hidden="true"
        >
          <GemIcon
            id={icon.id}
            size={40}
            animate={icon.animate}
            shimmer={icon.shimmer}
          />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display font-extrabold text-ink leading-tight">
            {pick(exhibit.name, locale)}
          </h3>
          {exhibit.interactive && (
            <span
              className="mt-1 inline-flex items-center gap-1 text-[10px] font-extrabold
                         uppercase tracking-wider px-1.5 py-0.5 rounded-full"
              style={{
                background: `color-mix(in srgb, ${exhibit.accent} 15%, white)`,
                color: exhibit.accent,
              }}
            >
              <Sparkles size={10} />
              {t('hall.interactive')}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
        {pick(exhibit.intro, locale)}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="exhibit-number">#{exhibit.id}</span>
        <span
          className="inline-flex items-center gap-1 text-sm font-bold transition"
          style={{ color: exhibit.accent }}
        >
          {t('common.open')} <ArrowUpRight size={14} />
        </span>
      </div>
    </DisplayCase>
  );
}
