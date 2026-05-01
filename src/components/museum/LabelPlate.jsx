import { cx } from '../../utils/helpers.js';

/**
 * LabelPlate — a retro museum metal plaque.
 *
 * Visual: brass/gold metal gradient with inset shadow (dark mode switches
 * to bronze). Two lines — display title in hall color, small uppercase
 * caption in muted text.
 *
 * Props:
 *   title    string      — main line (display font)
 *   caption  string      — tiny uppercase subtitle (exhibit number, category…)
 *   accent   string      — override --hall-accent (e.g. "#d4a017")
 *   size     'sm'|'md'   — defaults "md"
 *   as       HTMLTag     — defaults "div"
 */
export default function LabelPlate({
  title,
  caption,
  accent,
  size = 'md',
  as: Tag = 'div',
  className = '',
  children,
}) {
  const style = accent ? { '--hall-accent': accent } : undefined;
  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : 'px-4 py-2 text-base';

  return (
    <Tag
      className={cx('label-plate shadow-plate', sizeClasses, className)}
      style={style}
    >
      {caption && (
        <span className="text-label-plate opacity-80">{caption}</span>
      )}
      {title && (
        <span
          className="font-display font-extrabold leading-tight mt-0.5"
          style={{ color: 'var(--hall-accent, #1b2845)' }}
        >
          {title}
        </span>
      )}
      {children}
    </Tag>
  );
}
