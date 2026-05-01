import { Quote } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { pick } from '../../utils/helpers.js';

/**
 * Bir sergi salonu veya önemli bölümün başında görünen küçük metin
 * bloğu. Küratörün ziyaretçiye hoş geldin dediği an.
 */
export default function CuratorNote({ note, subject }) {
  const { locale, t } = useLocale();
  return (
    <aside
      className="relative rounded-4xl p-5 sm:p-6 border"
      style={{
        borderColor: 'color-mix(in srgb, var(--hall-accent) 20%, transparent)',
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--hall-soft) 90%, white) 0%, transparent 120%)',
      }}
    >
      <div className="flex items-start gap-4">
        <span
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-cream"
          style={{ background: 'var(--hall-accent)' }}
          aria-hidden
        >
          <Quote size={18} />
        </span>
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.18em] font-extrabold mb-1"
            style={{ color: 'var(--hall-accent)' }}
          >
            {t('hall.curatorNote')}
          </div>
          {subject && (
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-ink mb-1">
              {subject}
            </h3>
          )}
          <p className="text-ink/75 leading-relaxed">{pick(note, locale)}</p>
        </div>
      </div>
    </aside>
  );
}
