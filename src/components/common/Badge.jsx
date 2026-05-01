import { Lock } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { pick, cx } from '../../utils/helpers.js';

/**
 * Başarım rozeti kartı. unlocked=false ise soluk + kilit ikonu.
 */
export default function Badge({ badge, unlocked }) {
  const { locale } = useLocale();
  return (
    <div
      className={cx(
        'relative rounded-3xl p-5 border text-center transition',
        unlocked
          ? 'bg-gradient-to-br from-gold/10 to-gold/0 border-gold/40 shadow-museum animate-popIn'
          : 'bg-ink/5 border-ink/10 opacity-70',
      )}
    >
      <div
        className={cx(
          'w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl',
          unlocked ? 'bg-white ring-4 ring-gold/30 shadow-sm' : 'bg-ink/5 grayscale',
        )}
        aria-hidden
      >
        {badge.emoji}
      </div>
      <h4 className="font-display font-extrabold mt-3 text-ink">{pick(badge.name, locale)}</h4>
      <p className="text-xs text-ink/60 leading-relaxed mt-1.5">{pick(badge.desc, locale)}</p>

      {!unlocked && (
        <span
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ink/10 text-ink/50
                     flex items-center justify-center"
          aria-hidden
        >
          <Lock size={12} />
        </span>
      )}
    </div>
  );
}
