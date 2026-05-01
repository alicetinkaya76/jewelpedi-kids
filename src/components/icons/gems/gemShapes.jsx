/**
 * Gem shape library — 15 gemstones, each drawn with its characteristic
 * cut and signature color palette.
 *
 * Design principles:
 *   • 24x24 viewBox so icons stay crisp from 16px to 200px.
 *   • useId() for unique gradient IDs so multiple instances on the same
 *     page don't step on each other.
 *   • Each gem has its OWN colour palette — never currentColor — because
 *     an emerald that's the wrong shade of green isn't really an emerald.
 *   • Subtle inner highlight + outer stroke gives each gem a 3D lift.
 *   • Optional `animate` prop adds a single twinkle star overlay.
 */

import { useId } from 'react';

/* ───────────────────────────────────────────────────────────
   Shared helpers
   ─────────────────────────────────────────────────────────── */

function baseProps(size, title) {
  return {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    xmlns: 'http://www.w3.org/2000/svg',
    role: title ? 'img' : 'presentation',
    'aria-label': title || undefined,
    'aria-hidden': title ? undefined : 'true',
  };
}

function Twinkle({ animate, className = '' }) {
  if (!animate) return null;
  return (
    <g className={`origin-center ${className} animate-twinkle`} style={{ transformOrigin: 'center' }}>
      <path
        d="M19.5 5.5 L20 3 L20.5 5.5 L23 6 L20.5 6.5 L20 9 L19.5 6.5 L17 6 Z"
        fill="#ffffff"
        opacity="0.85"
      />
    </g>
  );
}

/* ───────────────────────────────────────────────────────────
   DIAMOND — round brilliant, top view, 8-fold symmetry
   ─────────────────────────────────────────────────────────── */

export function DiamondIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-core`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e8f4fa" />
          <stop offset="100%" stopColor="#85c1e9" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5dade2" />
          <stop offset="100%" stopColor="#2874a6" />
        </linearGradient>
      </defs>
      {/* girdle octagon */}
      <polygon
        points="12,2 17.7,4.3 22,10 22,14 17.7,19.7 12,22 6.3,19.7 2,14 2,10 6.3,4.3"
        fill={`url(#${id}-core)`}
        stroke={`url(#${id}-edge)`}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* main facets radiating */}
      <g stroke="#2874a6" strokeWidth="0.4" strokeLinejoin="round" fill="none" opacity="0.7">
        <line x1="12" y1="2"   x2="12"   y2="22" />
        <line x1="2"  y1="12"  x2="22"   y2="12" />
        <line x1="6.3" y1="4.3" x2="17.7" y2="19.7" />
        <line x1="17.7" y1="4.3" x2="6.3" y2="19.7" />
      </g>
      {/* table highlight */}
      <circle cx="9.5" cy="8.5" r="2.1" fill="#ffffff" opacity="0.55" />
      <circle cx="9.5" cy="8.5" r="0.9" fill="#ffffff" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   RUBY — oval cut, rich red with step facets
   ─────────────────────────────────────────────────────────── */

export function RubyIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="40%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#78281f" />
        </radialGradient>
      </defs>
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="10"
        fill={`url(#${id}-g)`}
        stroke="#641e16"
        strokeWidth="0.6"
      />
      {/* step facet lines */}
      <g stroke="#7b241c" strokeWidth="0.35" fill="none" opacity="0.7">
        <ellipse cx="12" cy="12" rx="5.5" ry="7" />
        <ellipse cx="12" cy="12" rx="3" ry="4" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </g>
      {/* highlight */}
      <ellipse cx="9.5" cy="7" rx="2" ry="2.6" fill="#ffffff" opacity="0.35" />
      <ellipse cx="9.2" cy="6.5" rx="0.8" ry="1.2" fill="#ffffff" opacity="0.75" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   SAPPHIRE — cushion cut, royal blue
   ─────────────────────────────────────────────────────────── */

export function SapphireIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#5499e0" />
          <stop offset="40%" stopColor="#2471a3" />
          <stop offset="100%" stopColor="#1a4365" />
        </radialGradient>
      </defs>
      {/* cushion — rounded square */}
      <path
        d="M 6 3 Q 3 3 3 6 L 3 18 Q 3 21 6 21 L 18 21 Q 21 21 21 18 L 21 6 Q 21 3 18 3 Z"
        fill={`url(#${id}-g)`}
        stroke="#1b4f72"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g stroke="#1a5276" strokeWidth="0.35" fill="none" opacity="0.7">
        <path d="M 7 4.5 Q 4.5 4.5 4.5 7 L 4.5 17 Q 4.5 19.5 7 19.5 L 17 19.5 Q 19.5 19.5 19.5 17 L 19.5 7 Q 19.5 4.5 17 4.5 Z" />
        <line x1="4.5" y1="7" x2="19.5" y2="17" />
        <line x1="19.5" y1="7" x2="4.5" y2="17" />
      </g>
      <ellipse cx="9" cy="8" rx="2" ry="1.6" fill="#ffffff" opacity="0.45" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   EMERALD — emerald (step) cut, jardín-green
   ─────────────────────────────────────────────────────────── */

export function EmeraldIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#58d68d" />
          <stop offset="50%" stopColor="#229954" />
          <stop offset="100%" stopColor="#145a32" />
        </linearGradient>
      </defs>
      {/* step-cut rectangle with chamfered corners */}
      <polygon
        points="7,3 17,3 21,7 21,17 17,21 7,21 3,17 3,7"
        fill={`url(#${id}-g)`}
        stroke="#0b5345"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* table */}
      <polygon
        points="8,5 16,5 19,8 19,16 16,19 8,19 5,16 5,8"
        fill="none"
        stroke="#117a65"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <polygon
        points="9,7 15,7 17,9 17,15 15,17 9,17 7,15 7,9"
        fill="none"
        stroke="#148f77"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />
      {/* table highlight */}
      <polygon points="9.5,7.3 14.5,7.3 16.7,9.3 10,10" fill="#ffffff" opacity="0.28" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   TURQUOISE — cabochon with matrix veins
   ─────────────────────────────────────────────────────────── */

export function TurquoiseIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#48c9b0" />
          <stop offset="60%" stopColor="#17a589" />
          <stop offset="100%" stopColor="#0e6655" />
        </radialGradient>
      </defs>
      {/* irregular cab — rounded pebble */}
      <path
        d="M 7 4
           Q 12 2 17 5
           Q 22 9 21 14
           Q 19 20 13 21
           Q 6 21 3 16
           Q 2 9 7 4 Z"
        fill={`url(#${id}-g)`}
        stroke="#0b5345"
        strokeWidth="0.7"
      />
      {/* matrix veins — dark organic lines */}
      <g stroke="#4a1f0c" strokeWidth="0.55" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M 6 9 Q 10 11 13 9 T 18 10" />
        <path d="M 5 14 Q 9 16 14 14 T 20 15" />
        <path d="M 11 6 Q 12 10 10 14 T 12 19" />
      </g>
      {/* highlight */}
      <ellipse cx="9" cy="7.5" rx="2.4" ry="1.6" fill="#ffffff" opacity="0.45" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   AMETHYST — hexagonal crystal cluster, purple
   ─────────────────────────────────────────────────────────── */

export function AmethystIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bb8fce" />
          <stop offset="50%" stopColor="#7d3c98" />
          <stop offset="100%" stopColor="#4a235a" />
        </linearGradient>
      </defs>
      {/* 3 crystals stacked — front tall, 2 smaller behind */}
      {/* back left */}
      <polygon
        points="4,22 4,11 7,8 10,11 10,22"
        fill={`url(#${id}-g)`}
        stroke="#512e5f"
        strokeWidth="0.5"
        opacity="0.8"
      />
      {/* back right */}
      <polygon
        points="15,22 15,10 18,7 21,10 21,22"
        fill={`url(#${id}-g)`}
        stroke="#512e5f"
        strokeWidth="0.5"
        opacity="0.85"
      />
      {/* front center */}
      <polygon
        points="8,22 8,8 12,3 16,8 16,22"
        fill={`url(#${id}-g)`}
        stroke="#4a235a"
        strokeWidth="0.6"
      />
      {/* facet lines */}
      <line x1="12" y1="3" x2="12" y2="22" stroke="#6c3483" strokeWidth="0.4" />
      {/* highlight */}
      <polygon points="9,8.5 11.5,4 12,10" fill="#ffffff" opacity="0.35" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   OPAL — cabochon with play-of-color patches
   ─────────────────────────────────────────────────────────── */

export function OpalIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-base`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#fef9e7" />
          <stop offset="80%" stopColor="#fae5d3" />
          <stop offset="100%" stopColor="#d5a6bd" />
        </radialGradient>
      </defs>
      <ellipse cx="12" cy="12" rx="9.5" ry="8" fill={`url(#${id}-base)`} stroke="#b7950b" strokeWidth="0.5" />
      {/* color patches — opal "fire" */}
      <g opacity="0.7">
        <path d="M 5 10 Q 8 7 10 10 Q 9 13 5 12 Z" fill="#27ae60" />
        <path d="M 12 6 Q 15 6 15 9 Q 13 10 11 9 Z" fill="#3498db" />
        <path d="M 16 12 Q 19 12 19 15 Q 16 16 15 13 Z" fill="#e74c3c" />
        <path d="M 7 15 Q 11 15 11 18 Q 8 19 6 17 Z" fill="#f4d03f" />
        <path d="M 13 16 Q 16 17 15 19 Q 12 20 12 17 Z" fill="#9b59b6" />
      </g>
      {/* overall sheen */}
      <ellipse cx="9" cy="8" rx="3" ry="2" fill="#ffffff" opacity="0.55" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   AQUAMARINE — hexagonal prism, pale blue
   ─────────────────────────────────────────────────────────── */

export function AquamarineIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6eaf8" />
          <stop offset="55%" stopColor="#76d7c4" />
          <stop offset="100%" stopColor="#148f77" />
        </linearGradient>
      </defs>
      {/* hexagonal prism — flat on top, pointed bottom */}
      <polygon
        points="8,3 16,3 20,7 20,18 12,22 4,18 4,7"
        fill={`url(#${id}-g)`}
        stroke="#117a65"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* facet lines down the prism */}
      <g stroke="#117a65" strokeWidth="0.35" fill="none" opacity="0.6">
        <line x1="8" y1="3" x2="8" y2="20" />
        <line x1="16" y1="3" x2="16" y2="20" />
        <line x1="12" y1="3" x2="12" y2="22" />
        <line x1="4" y1="7" x2="20" y2="7" />
      </g>
      {/* top face */}
      <polygon points="8,3 16,3 20,7 4,7" fill="#d1f2eb" opacity="0.8" />
      <polygon points="8,3 12,3 12,7 8,7" fill="#ffffff" opacity="0.35" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   TOPAZ — pear (teardrop) cut, amber
   ─────────────────────────────────────────────────────────── */

export function TopazIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="45%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#fad7a0" />
          <stop offset="50%" stopColor="#f39c12" />
          <stop offset="100%" stopColor="#935116" />
        </radialGradient>
      </defs>
      {/* pear outline */}
      <path
        d="M 12 2 Q 16 6 18 12 Q 18 19 12 22 Q 6 19 6 12 Q 8 6 12 2 Z"
        fill={`url(#${id}-g)`}
        stroke="#7d3c00"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* star facets */}
      <g stroke="#7d3c00" strokeWidth="0.35" fill="none" opacity="0.65">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <path d="M 12 2 Q 14 14 12 22" />
        <path d="M 12 2 Q 10 14 12 22" />
      </g>
      <ellipse cx="10" cy="7" rx="1.5" ry="2.5" fill="#ffffff" opacity="0.45" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   PEARL — sphere, soft iridescent highlight
   ─────────────────────────────────────────────────────────── */

export function PearlIcon({ size = 24, className = '', title, animate = false, shimmer = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fef9e7" />
          <stop offset="80%" stopColor="#f5e9d1" />
          <stop offset="100%" stopColor="#b9a077" />
        </radialGradient>
        <radialGradient id={`${id}-rim`} cx="60%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#fcd5ce" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#aed6f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-g)`} stroke="#b9a077" strokeWidth="0.5" />
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-rim)`} />
      <ellipse cx="8.5" cy="8" rx="3.2" ry="2" fill="#ffffff" opacity="0.85" />
      <ellipse cx="7.5" cy="7" rx="1.1" ry="0.8" fill="#ffffff" />
      {(animate || shimmer) && <Twinkle animate />}
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   PERIDOT — oval cut, olive green
   ─────────────────────────────────────────────────────────── */

export function PeridotIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#d4efdf" />
          <stop offset="45%" stopColor="#82e0aa" />
          <stop offset="100%" stopColor="#558c3e" />
        </radialGradient>
      </defs>
      <ellipse cx="12" cy="12" rx="9" ry="10" fill={`url(#${id}-g)`} stroke="#3c6e2d" strokeWidth="0.6" />
      <g stroke="#3c6e2d" strokeWidth="0.35" fill="none" opacity="0.7">
        <ellipse cx="12" cy="12" rx="6" ry="7" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </g>
      <ellipse cx="9" cy="7" rx="2.2" ry="2.8" fill="#ffffff" opacity="0.4" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   GARNET — round brilliant, deep wine-red
   ─────────────────────────────────────────────────────────── */

export function GarnetIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e6b0aa" />
          <stop offset="35%" stopColor="#a93226" />
          <stop offset="100%" stopColor="#4a1010" />
        </radialGradient>
      </defs>
      <polygon
        points="12,2 18,5 21,12 18,19 12,22 6,19 3,12 6,5"
        fill={`url(#${id}-g)`}
        stroke="#3a0a0a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g stroke="#4a1010" strokeWidth="0.35" fill="none" opacity="0.65">
        <polygon points="12,5 16,7 18,12 16,17 12,19 8,17 6,12 8,7" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </g>
      <ellipse cx="9.5" cy="7" rx="1.8" ry="1.4" fill="#ffffff" opacity="0.35" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   CITRINE — cushion cut, warm yellow
   ─────────────────────────────────────────────────────────── */

export function CitrineIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fef5c4" />
          <stop offset="45%" stopColor="#f1c40f" />
          <stop offset="100%" stopColor="#7d5a00" />
        </radialGradient>
      </defs>
      <path
        d="M 6 3 Q 3 3 3 6 L 3 18 Q 3 21 6 21 L 18 21 Q 21 21 21 18 L 21 6 Q 21 3 18 3 Z"
        fill={`url(#${id}-g)`}
        stroke="#7d5a00"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g stroke="#9a7d0a" strokeWidth="0.35" fill="none" opacity="0.6">
        <path d="M 7 4.5 L 17 4.5 M 7 19.5 L 17 19.5 M 4.5 7 L 4.5 17 M 19.5 7 L 19.5 17" />
        <line x1="4.5" y1="7" x2="19.5" y2="17" />
        <line x1="19.5" y1="7" x2="4.5" y2="17" />
      </g>
      <ellipse cx="8.5" cy="7.5" rx="2.2" ry="1.6" fill="#ffffff" opacity="0.55" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   TOURMALINE — long crystal, bicolor (watermelon)
   ─────────────────────────────────────────────────────────── */

export function TourmalineIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d98880" />
          <stop offset="45%" stopColor="#c0392b" />
          <stop offset="50%" stopColor="#f8f9f9" />
          <stop offset="55%" stopColor="#82e0aa" />
          <stop offset="100%" stopColor="#196f3d" />
        </linearGradient>
      </defs>
      {/* tall rectangular prism with bevelled corners */}
      <polygon
        points="8,2 16,2 18,4 18,20 16,22 8,22 6,20 6,4"
        fill={`url(#${id}-g)`}
        stroke="#512e5f"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g stroke="#512e5f" strokeWidth="0.35" fill="none" opacity="0.6">
        <line x1="8" y1="2" x2="8" y2="22" />
        <line x1="16" y1="2" x2="16" y2="22" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="6" y1="12" x2="18" y2="12" />
      </g>
      {/* highlight */}
      <rect x="8.6" y="3" width="2" height="8" fill="#ffffff" opacity="0.3" />
      <Twinkle animate={animate} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   LAPIS LAZULI — cabochon, deep ultramarine with gold flecks
   ─────────────────────────────────────────────────────────── */

export function LapisIcon({ size = 24, className = '', title, animate = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3498db" />
          <stop offset="50%" stopColor="#1f4e79" />
          <stop offset="100%" stopColor="#0e2748" />
        </radialGradient>
      </defs>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="5"
        fill={`url(#${id}-g)`}
        stroke="#0e2748"
        strokeWidth="0.6"
      />
      {/* pyrite flecks — small gold dots */}
      <g fill="#d4a017" opacity="0.9">
        <circle cx="7"  cy="9"   r="0.6" />
        <circle cx="14" cy="7.5" r="0.5" />
        <circle cx="17" cy="10"  r="0.7" />
        <circle cx="9"  cy="14"  r="0.5" />
        <circle cx="13" cy="15.5" r="0.6" />
        <circle cx="18" cy="15"  r="0.45" />
        <circle cx="5"  cy="13"  r="0.4" />
      </g>
      <ellipse cx="8" cy="8" rx="2.5" ry="1.4" fill="#ffffff" opacity="0.25" />
      <Twinkle animate={animate} />
    </svg>
  );
}
