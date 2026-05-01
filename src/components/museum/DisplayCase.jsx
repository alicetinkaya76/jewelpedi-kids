import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/helpers.js';

/**
 * DisplayCase — the museum vitrine card.
 *
 * A single display case contains an object (usually a <GemIcon>), a
 * decorative number plaque along the top edge and a soft spotlight
 * that turns on when the case is hovered or focused.
 *
 * Two rendering modes:
 *   - Link/button style (`to` or `onClick`): adds interactive spotlight,
 *     keyboard focus ring and a gentle hover lift.
 *   - Static (default): just the vitrine frame around arbitrary content.
 *
 * Color theming comes from CSS variable `--hall-accent`, which pages
 * set via hallTheme() helper. Pass `emphasis` to override per-case.
 *
 * @param {object} props
 * @param {number|string} [props.number]   Exhibit number shown as "Nº 042"
 * @param {string}  [props.emphasis]       CSS color — overrides --hall-accent locally
 * @param {boolean} [props.interactive]    Enable hover lift + spotlight
 * @param {boolean} [props.spotlight]      Force spotlight on (dark gallery look)
 * @param {string}  [props.to]             If set, renders as <Link>
 * @param {Function}[props.onClick]        If set (and no `to`), renders as <button>
 * @param {string}  [props.ariaLabel]      Accessible label for interactive cases
 * @param {string}  [props.className]      Extra classes on root
 * @param {string}  [props.padding]        Padding class — defaults "p-5"
 * @param {React.ReactNode} [props.corner] Optional corner badge (e.g. "visited")
 * @param {React.ReactNode} props.children Case contents
 */
const DisplayCase = forwardRef(function DisplayCase(
  {
    number,
    emphasis,
    interactive = false,
    spotlight = false,
    to,
    onClick,
    ariaLabel,
    className = '',
    padding = 'p-5',
    corner,
    children,
    ...rest
  },
  ref,
) {
  const isInteractive = interactive || Boolean(to) || Boolean(onClick);

  const style = useMemo(() => {
    if (!emphasis) return undefined;
    return { '--hall-accent': emphasis };
  }, [emphasis]);

  const body = (
    <>
      {/* Spotlight overlay */}
      <span
        className={cx(
          'case-spotlight case-spotlight--accent',
          spotlight && 'opacity-100',
        )}
        aria-hidden="true"
      />

      {/* Top number plaque */}
      {number !== undefined && number !== null && (
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                     px-3 py-1 rounded-full bg-parchment border border-ink/10
                     exhibit-number shadow-sm whitespace-nowrap"
          aria-hidden="true"
        >
          Nº {String(number).padStart(3, '0')}
        </span>
      )}

      {/* Optional corner badge (e.g. visited checkmark) */}
      {corner && (
        <span className="absolute top-3 right-3 z-10">{corner}</span>
      )}

      {/* Content area */}
      <div className={cx('relative z-[1]', padding)}>{children}</div>
    </>
  );

  const rootClass = cx(
    'display-case relative block',
    isInteractive && 'display-case--interactive lift-on-hover cursor-pointer',
    'animate-fadeUp',
    className,
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={rootClass}
        style={style}
        aria-label={ariaLabel}
        {...rest}
      >
        {body}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cx(rootClass, 'text-left w-full')}
        style={style}
        aria-label={ariaLabel}
        {...rest}
      >
        {body}
      </button>
    );
  }
  return (
    <div ref={ref} className={rootClass} style={style} {...rest}>
      {body}
    </div>
  );
});

export default DisplayCase;
