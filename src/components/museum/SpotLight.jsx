import { cx } from '../../utils/helpers.js';

/**
 * SpotLight — atmospheric overhead light pool.
 *
 * Renders a radial gradient disk that sits as an absolutely-positioned
 * overlay behind or above exhibit content. Primarily for Dark Gallery
 * atmosphere but also useful in cream mode for emphasis.
 *
 * Props:
 *   tone    'warm'|'cool'|'accent' — default 'warm'
 *   size    'sm'|'md'|'lg'         — default 'md'
 *   flicker boolean                 — subtle candle-like flicker, default false
 *   origin  'top'|'center'|'bottom' — light source position, default 'top'
 *   className — layout position
 */
export default function SpotLight({
  tone = 'warm',
  size = 'md',
  flicker = false,
  origin = 'top',
  className = '',
}) {
  const toneStyle =
    tone === 'accent'
      ? { background: `radial-gradient(ellipse at ${originTo(origin)}, color-mix(in srgb, var(--hall-accent, #d4a017) 40%, transparent) 0%, transparent 60%)` }
      : tone === 'cool'
      ? { background: `radial-gradient(ellipse at ${originTo(origin)}, rgba(93, 173, 226, 0.3) 0%, transparent 60%)` }
      : { background: `radial-gradient(ellipse at ${originTo(origin)}, rgba(247, 201, 72, 0.3) 0%, transparent 60%)` };

  const sizeClass =
    size === 'sm' ? 'w-48 h-48'
    : size === 'lg' ? 'w-[32rem] h-[32rem]'
    : 'w-80 h-80';

  return (
    <span
      className={cx(
        'absolute pointer-events-none',
        sizeClass,
        flicker && 'animate-spotlightFlicker',
        className,
      )}
      style={{
        ...toneStyle,
        mixBlendMode: 'soft-light',
      }}
      aria-hidden="true"
    />
  );
}

function originTo(o) {
  if (o === 'bottom') return '50% 100%';
  if (o === 'center') return '50% 50%';
  return '50% 0%';
}
