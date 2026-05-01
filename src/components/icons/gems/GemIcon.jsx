/**
 * GemIcon — central dispatcher for the gem/metal/craft icon library.
 *
 * Usage:
 *   <GemIcon id="diamond" size={64} animate />
 *   <GemIcon id="gold-bar" size={48} shimmer />
 *   <GemIcon id="filigree-wire" size={32} title="Telkâri" />
 *
 * If `id` isn't recognised, renders a neutral fallback glyph so the UI
 * never breaks (and we get a clear visual hint during development).
 */

import {
  DiamondIcon,
  RubyIcon,
  SapphireIcon,
  EmeraldIcon,
  TurquoiseIcon,
  AmethystIcon,
  OpalIcon,
  AquamarineIcon,
  TopazIcon,
  PearlIcon,
  PeridotIcon,
  GarnetIcon,
  CitrineIcon,
  TourmalineIcon,
  LapisIcon,
} from './gemShapes.jsx';

import {
  GoldBarIcon,
  GoldCoinIcon,
  SilverCoinIcon,
  PlatinumNuggetIcon,
} from './metalShapes.jsx';

import {
  FiligreeWireIcon,
  NielloPatternIcon,
  HasirWeaveIcon,
} from './craftShapes.jsx';

/** All registered icons keyed by string id. */
export const GEM_REGISTRY = {
  // Gems (15)
  diamond: DiamondIcon,
  ruby: RubyIcon,
  sapphire: SapphireIcon,
  emerald: EmeraldIcon,
  turquoise: TurquoiseIcon,
  amethyst: AmethystIcon,
  opal: OpalIcon,
  aquamarine: AquamarineIcon,
  topaz: TopazIcon,
  pearl: PearlIcon,
  peridot: PeridotIcon,
  garnet: GarnetIcon,
  citrine: CitrineIcon,
  tourmaline: TourmalineIcon,
  lapis: LapisIcon,
  // Metals (4)
  'gold-bar': GoldBarIcon,
  'gold-coin': GoldCoinIcon,
  'silver-coin': SilverCoinIcon,
  'platinum-nugget': PlatinumNuggetIcon,
  // Craft (3)
  'filigree-wire': FiligreeWireIcon,
  'niello-pattern': NielloPatternIcon,
  'hasir-weave': HasirWeaveIcon,
};

export const GEM_IDS = Object.keys(GEM_REGISTRY);

/** Fallback gem when id is unknown — a neutral cushion-cut placeholder. */
function UnknownGem({ size = 24, className = '', title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
    >
      <polygon
        points="12,3 19,9 16,21 8,21 5,9"
        fill="#d6eaf8"
        stroke="#1b2845"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <line x1="5" y1="9" x2="19" y2="9" stroke="#1b2845" strokeWidth="0.5" opacity="0.5" />
      <line x1="9" y1="9" x2="12" y2="21" stroke="#1b2845" strokeWidth="0.4" opacity="0.4" />
      <line x1="15" y1="9" x2="12" y2="21" stroke="#1b2845" strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}

/**
 * @param {object} props
 * @param {string} props.id         registry key (e.g. "diamond")
 * @param {number} [props.size=48]  pixel size
 * @param {string} [props.className]
 * @param {string} [props.title]    accessible name (omit to mark presentational)
 * @param {boolean}[props.animate]  adds twinkle overlay (gems)
 * @param {boolean}[props.shimmer]  adds highlight sweep (metals / pearl)
 */
export default function GemIcon({
  id,
  size = 48,
  className,
  title,
  animate = false,
  shimmer = false,
  ...rest
}) {
  const Cmp = GEM_REGISTRY[id] || UnknownGem;
  return (
    <Cmp
      size={size}
      className={className}
      title={title}
      animate={animate}
      shimmer={shimmer}
      {...rest}
    />
  );
}
