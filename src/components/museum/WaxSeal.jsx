import { cx } from '../../utils/helpers.js';

/**
 * WaxSeal — a red wax seal on top of curator notes or special exhibits.
 *
 * Renders a raised red "blob" with an embossed letter in the center.
 * On hover it wobbles slightly ("sealBobble" keyframe).
 *
 * Props:
 *   letter  string   — single character, default "C" (Curator)
 *   color   string   — override wax color gradient base (defaults red)
 *   size    'sm'|'md'|'lg' — defaults "md"
 *   title   string   — accessible tooltip + aria-label
 *   bobble  boolean  — enable hover bobble (default true)
 */
export default function WaxSeal({
  letter = 'C',
  color,
  size = 'md',
  title = 'Curator Note',
  bobble = true,
  className = '',
}) {
  const dims =
    size === 'sm' ? { w: '2rem', h: '2rem', fs: '0.85rem' }
    : size === 'lg' ? { w: '3.5rem', h: '3.5rem', fs: '1.5rem' }
    : { w: '2.8rem', h: '2.8rem', fs: '1.1rem' };

  // Override wax gradient if a custom color given.
  const style = color
    ? {
        width: dims.w,
        height: dims.h,
        fontSize: dims.fs,
        background: `radial-gradient(circle at 35% 30%, ${color} 0%, color-mix(in srgb, ${color} 65%, #000) 60%, color-mix(in srgb, ${color} 40%, #000) 100%)`,
      }
    : { width: dims.w, height: dims.h, fontSize: dims.fs };

  return (
    <span
      className={cx(
        'wax-seal select-none',
        bobble && 'hover:animate-sealBobble',
        className,
      )}
      style={style}
      role="img"
      aria-label={title}
      title={title}
    >
      <span className="relative z-[1]">{letter}</span>
    </span>
  );
}
