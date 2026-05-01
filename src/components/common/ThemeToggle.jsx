import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useLocale } from '../../context/LocaleContext.jsx';
import { cx } from '../../utils/helpers.js';

/**
 * Dark Gallery toggle. Icon swaps between Sun (in dark mode → click to return
 * to cream) and Moon (in cream mode → click to enter Dark Gallery).
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLocale();
  const label = isDark ? t('theme.toCream') : t('theme.toDark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cx(
        'relative p-2 rounded-lg hover:bg-ink/5 transition',
        'focus-visible:outline-none',
        className,
      )}
      aria-label={label}
      title={label}
    >
      <span
        className="relative block w-5 h-5"
        style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {isDark ? (
          <Sun size={20} className="text-[#f7c948]" />
        ) : (
          <Moon size={20} className="text-ink/70" />
        )}
      </span>
    </button>
  );
}
