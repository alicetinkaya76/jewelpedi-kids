/**
 * Tiny Web Audio sound generator.
 *
 * We intentionally do NOT ship .mp3 assets in Phase 1 — they bloat the bundle
 * and complicate lazy loading. Instead each sound is synthesized with a short
 * oscillator envelope. The palette is intentionally small and subtle:
 *
 *   chime       → success / reward  (two-note C major glissando)
 *   open-case   → display case open  (low-to-mid pitch + soft click)
 *   page-turn   → subtle paper/page swish (filtered noise burst)
 *   correct     → quiz correct (bright two-tone)
 *   wrong       → quiz wrong  (descending minor second)
 *   click       → UI tap (very brief wood-block-like click)
 *
 * Web Audio context is created lazily on first user interaction to comply
 * with browser autoplay policies. Future Phase 4 can expand this palette.
 */

let _ctx = null;
function audio() {
  if (typeof window === 'undefined') return null;
  if (_ctx) return _ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    _ctx = new AC();
  } catch {
    _ctx = null;
  }
  return _ctx;
}

/**
 * Schedule one oscillator note with envelope.
 * @param {number} freq       Hz
 * @param {number} start      offset seconds
 * @param {number} dur        seconds
 * @param {number} peak       0-1 gain
 * @param {OscillatorType} type
 */
function note(ctx, out, freq, start, dur, peak = 0.2, type = 'sine') {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + start + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  osc.connect(g).connect(out);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + dur + 0.02);
}

/** Filtered noise burst — for page-turn and open-case transient. */
function noise(ctx, out, start, dur, peak = 0.1, cutoff = 2400) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = cutoff;
  filter.Q.value = 1.2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(peak, ctx.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  src.connect(filter).connect(g).connect(out);
  src.start(ctx.currentTime + start);
  src.stop(ctx.currentTime + start + dur + 0.02);
}

const SOUNDS = {
  chime(ctx, out) {
    note(ctx, out, 523.25, 0,    0.35, 0.18, 'triangle'); // C5
    note(ctx, out, 659.25, 0.05, 0.35, 0.16, 'triangle'); // E5
    note(ctx, out, 783.99, 0.1,  0.45, 0.15, 'triangle'); // G5
  },
  'open-case'(ctx, out) {
    noise(ctx, out, 0, 0.08, 0.07, 3800);
    note(ctx, out, 180, 0.03, 0.2, 0.14, 'sine');
    note(ctx, out, 360, 0.03, 0.35, 0.08, 'sine');
  },
  'page-turn'(ctx, out) {
    noise(ctx, out, 0,    0.15, 0.06, 4200);
    noise(ctx, out, 0.08, 0.08, 0.04, 2800);
  },
  correct(ctx, out) {
    note(ctx, out, 659.25, 0,    0.18, 0.2, 'triangle'); // E5
    note(ctx, out, 987.77, 0.09, 0.25, 0.18, 'triangle'); // B5
  },
  wrong(ctx, out) {
    note(ctx, out, 311.13, 0,    0.2, 0.16, 'sawtooth'); // E♭4
    note(ctx, out, 277.18, 0.12, 0.3, 0.14, 'sawtooth'); // D♭4
  },
  click(ctx, out) {
    note(ctx, out, 1400, 0, 0.04, 0.08, 'square');
  },
};

export const SOUND_KEYS = Object.keys(SOUNDS);

/**
 * Play a named sound. Returns silently if audio is unavailable or muted flag applies.
 * @param {string} name
 * @param {{ volume?: number }} [opts]
 */
export function playSound(name, opts = {}) {
  const ctx = audio();
  if (!ctx) return;
  const fn = SOUNDS[name];
  if (!fn) return;
  // Some browsers hold context in "suspended" state until user gesture.
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  const master = ctx.createGain();
  master.gain.value = typeof opts.volume === 'number' ? opts.volume : 0.9;
  master.connect(ctx.destination);
  try {
    fn(ctx, master);
  } catch {
    /* ignore synthesis errors */
  }
}
