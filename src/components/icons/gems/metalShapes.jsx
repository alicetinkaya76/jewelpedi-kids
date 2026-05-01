/**
 * Metal shape library — gold bar, gold coin, silver coin, platinum nugget.
 * Each drawn with a metallic specular highlight and characteristic detail.
 */

import { useId } from 'react';

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

function Shimmer({ shimmer, className = '' }) {
  if (!shimmer) return null;
  return (
    <g className={`${className} animate-shimmer`} style={{ mixBlendMode: 'screen' }}>
      <path d="M 4 10 L 20 6 L 20 8 L 4 12 Z" fill="#ffffff" opacity="0.18" />
    </g>
  );
}

/* ───────────────────────────────────────────────────────────
   GOLD BAR — trapezoid brick with embossed "GOLD" and fine bevel
   ─────────────────────────────────────────────────────────── */

export function GoldBarIcon({ size = 24, className = '', title, shimmer = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff4c4" />
          <stop offset="30%" stopColor="#f7c948" />
          <stop offset="70%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#7a5c0a" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff4c4" />
          <stop offset="100%" stopColor="#f7c948" />
        </linearGradient>
      </defs>
      {/* slight perspective trapezoid */}
      <polygon
        points="3,9 21,9 20,21 4,21"
        fill={`url(#${id}-g)`}
        stroke="#7a5c0a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* top face (perspective) */}
      <polygon
        points="4,9 20,9 18,6 6,6"
        fill={`url(#${id}-top)`}
        stroke="#7a5c0a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* inscription bar */}
      <rect x="6.5" y="12" width="11" height="6" rx="0.6" fill="#b9770e" opacity="0.45" />
      {/* "999.9" micro-text — hinted as dashes */}
      <g stroke="#fff4c4" strokeWidth="0.4" opacity="0.85">
        <line x1="8"  y1="14" x2="16" y2="14" />
        <line x1="8"  y1="16" x2="14" y2="16" />
      </g>
      <line x1="4.2" y1="9.3" x2="19.8" y2="9.3" stroke="#fff4c4" strokeWidth="0.4" opacity="0.9" />
      <Shimmer shimmer={shimmer} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   GOLD COIN — round, embossed star + rope border
   ─────────────────────────────────────────────────────────── */

export function GoldCoinIcon({ size = 24, className = '', title, shimmer = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff4c4" />
          <stop offset="45%" stopColor="#f7c948" />
          <stop offset="100%" stopColor="#b9770e" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-g)`} stroke="#7a5c0a" strokeWidth="0.7" />
      {/* outer rope border — short ticks */}
      <g stroke="#7a5c0a" strokeWidth="0.5" opacity="0.7">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 360) / 16;
          const r1 = 8.5, r2 = 9.8;
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={12 + r1 * Math.cos(rad)}
              y1={12 + r1 * Math.sin(rad)}
              x2={12 + r2 * Math.cos(rad)}
              y2={12 + r2 * Math.sin(rad)}
            />
          );
        })}
      </g>
      {/* inner star motif */}
      <polygon
        points="12,6 13.5,10.5 18,10.5 14.2,13.2 15.7,17.5 12,14.8 8.3,17.5 9.8,13.2 6,10.5 10.5,10.5"
        fill="#b9770e"
        opacity="0.7"
      />
      {/* specular */}
      <ellipse cx="8" cy="8" rx="3" ry="1.7" fill="#ffffff" opacity="0.55" />
      <Shimmer shimmer={shimmer} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   SILVER COIN — cooler gradient, double-ring
   ─────────────────────────────────────────────────────────── */

export function SilverCoinIcon({ size = 24, className = '', title, shimmer = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#d6d6d6" />
          <stop offset="100%" stopColor="#6e7b7d" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}-g)`} stroke="#4a5859" strokeWidth="0.7" />
      <circle cx="12" cy="12" r="8.3" fill="none" stroke="#4a5859" strokeWidth="0.5" opacity="0.7" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#4a5859" strokeWidth="0.4" opacity="0.55" />
      {/* crescent motif — Ottoman/silver Anatolian feel */}
      <path
        d="M 9 8 A 4 4 0 1 0 9 16 A 3 3 0 1 1 9 8 Z"
        fill="#4a5859"
        opacity="0.55"
      />
      <ellipse cx="8" cy="8" rx="3" ry="1.6" fill="#ffffff" opacity="0.7" />
      <Shimmer shimmer={shimmer} />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   PLATINUM NUGGET — irregular metallic pebble
   ─────────────────────────────────────────────────────────── */

export function PlatinumNuggetIcon({ size = 24, className = '', title, shimmer = false }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#d5dbdb" />
          <stop offset="100%" stopColor="#515a5a" />
        </radialGradient>
      </defs>
      {/* organic irregular blob */}
      <path
        d="M 4 11
           Q 3 6 8 4
           Q 13 3 16 6
           Q 22 7 21 12
           Q 22 17 17 19
           Q 13 21 9 20
           Q 3 20 3 14
           Q 3 12 4 11 Z"
        fill={`url(#${id}-g)`}
        stroke="#2c3436"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* inner creases */}
      <g stroke="#2c3436" strokeWidth="0.35" fill="none" opacity="0.6">
        <path d="M 7 10 Q 11 8 15 10 Q 18 12 16 15" />
        <path d="M 6 15 Q 10 14 13 16" />
      </g>
      {/* specular highlights */}
      <ellipse cx="9" cy="8" rx="3" ry="1.6" fill="#ffffff" opacity="0.7" />
      <ellipse cx="16" cy="11" rx="1.2" ry="0.8" fill="#ffffff" opacity="0.5" />
      <Shimmer shimmer={shimmer} />
    </svg>
  );
}
