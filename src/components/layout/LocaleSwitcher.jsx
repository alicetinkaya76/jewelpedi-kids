import { useLocale } from '../../context/LocaleContext.jsx';
import { cx } from '../../utils/helpers.js';

export default function LocaleSwitcher({ className = '' }) {
  const { locale, setLocale, availableLocales, localeMeta } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cx(
        'inline-flex items-center gap-1 rounded-full bg-cream/70 backdrop-blur-sm',
        'border border-ink/10 p-1 shadow-sm',
        className,
      )}
    >
      {availableLocales.map((code) => {
        const meta = localeMeta[code];
        const active = code === locale;
        return (
          <button
            key={code}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cx(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition',
              active
                ? 'bg-ink text-cream shadow-sm'
                : 'text-ink/70 hover:bg-ink/5',
            )}
            title={meta.label}
          >
            <span aria-hidden>{meta.flag}</span>
            <span>{meta.short}</span>
          </button>
        );
      })}
    </div>
  );
}
