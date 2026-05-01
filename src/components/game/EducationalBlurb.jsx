import { Lightbulb } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { pick, cx } from '../../utils/helpers.js';

/**
 * EducationalBlurb — "Biliyor muydun?" box.
 * Rendered at the bottom of GameOverScreen, carries a context fact that
 * ties gameplay back to the museum content. Kept deliberately small;
 * per design philosophy: "tooltip, not PowerPoint slide".
 */
export default function EducationalBlurb({ fact, accent = '#d4a017', className }) {
  const { t, locale } = useLocale();

  const title = {
    tr: 'Biliyor muydun?',
    en: 'Did you know?',
    ar: 'هل تعلم؟',
  }[locale] || t('hall.funFact');

  if (!fact) return null;

  return (
    <div
      className={cx(
        'rounded-2xl border p-4 sm:p-5 flex gap-3 items-start animate-fadeUp',
        className,
      )}
      style={{
        background: `color-mix(in srgb, ${accent} 10%, white)`,
        borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
      }}
    >
      <span
        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
        style={{ background: accent }}
        aria-hidden="true"
      >
        <Lightbulb size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-[11px] uppercase tracking-widest font-extrabold mb-1"
          style={{ color: accent }}
        >
          {title}
        </div>
        <p className="text-sm leading-relaxed text-ink/85">{pick(fact, locale)}</p>
      </div>
    </div>
  );
}
