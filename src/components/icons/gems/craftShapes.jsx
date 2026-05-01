/**
 * Craft shape library — iconographic glyphs for Turkish silversmithing
 * techniques. These aren't gemstones — they're small identity marks that
 * sit alongside gems in the museum library.
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

/* ───────────────────────────────────────────────────────────
   FILIGREE WIRE — Telkâri spiral curlicue
   Delicate looped wire pattern, gold-thread feel
   ─────────────────────────────────────────────────────────── */

export function FiligreeWireIcon({ size = 24, className = '', title }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7c948" />
          <stop offset="100%" stopColor="#b9770e" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        {/* outer ring */}
        <circle cx="12" cy="12" r="9" />
        {/* four spiral curls */}
        <path d="M 12 5 Q 14 8 12 10 Q 10 8 12 5" />
        <path d="M 19 12 Q 16 14 14 12 Q 16 10 19 12" />
        <path d="M 12 19 Q 10 16 12 14 Q 14 16 12 19" />
        <path d="M 5 12 Q 8 10 10 12 Q 8 14 5 12" />
        {/* center dot */}
      </g>
      <circle cx="12" cy="12" r="1" fill={`url(#${id}-g)`} />
      {/* tiny gold beads at cardinal points */}
      <g fill={`url(#${id}-g)`}>
        <circle cx="12" cy="3"  r="0.8" />
        <circle cx="21" cy="12" r="0.8" />
        <circle cx="12" cy="21" r="0.8" />
        <circle cx="3"  cy="12" r="0.8" />
      </g>
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   NIELLO PATTERN — Savat black inlay, geometric diamonds
   Dark niello alloy pressed into silver
   ─────────────────────────────────────────────────────────── */

export function NielloPatternIcon({ size = 24, className = '', title }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecf0f1" />
          <stop offset="100%" stopColor="#7f8c8d" />
        </linearGradient>
      </defs>
      {/* silver plaque */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        fill={`url(#${id}-silver)`}
        stroke="#4a5859"
        strokeWidth="0.5"
      />
      {/* niello diamond pattern — black interlocking rhombuses */}
      <g fill="#1b2631">
        <polygon points="6,12 8,9 10,12 8,15" />
        <polygon points="10,12 12,9 14,12 12,15" opacity="0.9" />
        <polygon points="14,12 16,9 18,12 16,15" />
        <polygon points="8,7 10,5 12,7 10,9" opacity="0.85" />
        <polygon points="12,7 14,5 16,7 14,9" opacity="0.85" />
        <polygon points="8,17 10,15 12,17 10,19" opacity="0.85" />
        <polygon points="12,17 14,15 16,17 14,19" opacity="0.85" />
      </g>
      {/* top shine */}
      <rect x="2.5" y="4.5" width="19" height="1.3" fill="#ffffff" opacity="0.35" rx="2" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────
   HASIR WEAVE — Trabzon chain-weave crosshatch
   Interlocked silver wires in a mat-like pattern
   ─────────────────────────────────────────────────────────── */

export function HasirWeaveIcon({ size = 24, className = '', title }) {
  const id = useId();
  return (
    <svg {...baseProps(size, title)} className={className}>
      <defs>
        <linearGradient id={`${id}-wire`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaecee" />
          <stop offset="60%" stopColor="#aab7b8" />
          <stop offset="100%" stopColor="#566573" />
        </linearGradient>
      </defs>
      {/* background tint */}
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#fcfcfc" stroke="#7f8c8d" strokeWidth="0.5" />
      {/* diagonal weave */}
      <g stroke={`url(#${id}-wire)`} strokeWidth="1.3" strokeLinecap="round" fill="none">
        {/* one direction */}
        <line x1="3"  y1="7"  x2="10" y2="14" />
        <line x1="7"  y1="3"  x2="17" y2="13" />
        <line x1="13" y1="3"  x2="21" y2="11" />
        <line x1="3"  y1="13" x2="10" y2="20" />
        <line x1="3"  y1="19" x2="5"  y2="21" />
        <line x1="13" y1="9"  x2="21" y2="17" />
        <line x1="13" y1="15" x2="19" y2="21" />
        {/* cross direction */}
        <line x1="10" y1="3"  x2="3"  y2="10" />
        <line x1="16" y1="3"  x2="3"  y2="16" />
        <line x1="21" y1="6"  x2="6"  y2="21" />
        <line x1="21" y1="12" x2="12" y2="21" />
        <line x1="21" y1="18" x2="18" y2="21" />
      </g>
    </svg>
  );
}
