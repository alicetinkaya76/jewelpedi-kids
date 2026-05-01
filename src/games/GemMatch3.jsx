import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import { GemIcon } from '../components/icons/gems/index.js';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import { cx } from '../utils/helpers.js';

/**
 * GemMatch3 — arcade match-3 puzzle.
 *
 * Player swaps adjacent gems to form 3+ lines; matched gems pop, new ones
 * cascade from above. Chains multiply score. Timer counts down; badge
 * unlocks on Usta difficulty at 500+ points.
 *
 * Interaction model: pointer events (works for touch AND mouse). To swap:
 *   - click/tap cell A → it highlights
 *   - click/tap adjacent cell B → swap animates → match resolution runs
 *   - click/tap any non-adjacent cell → selection moves
 *
 * No HTML5 drag-and-drop (spec requirement — mobile-hostile).
 *
 * Board representation: flat array of length SIZE*SIZE, each entry is a gem
 * id string or null (null = empty slot mid-cascade).
 */

const SIZE = 8;

// Gem pool per difficulty. More types = harder to match.
const POOLS = {
  cirak: ['emerald', 'ruby', 'sapphire', 'diamond', 'topaz', 'amethyst'],
  kalfa: ['emerald', 'ruby', 'sapphire', 'diamond', 'topaz', 'amethyst', 'garnet'],
  usta:  ['emerald', 'ruby', 'sapphire', 'diamond', 'topaz', 'amethyst', 'garnet', 'turquoise'],
};

const DURATIONS = { cirak: 60, kalfa: 90, usta: 120 };
const BADGE_THRESHOLD = { cirak: 9999, kalfa: 9999, usta: 500 };

/* Mini facts keyed by gem — used for micro-labels + final blurb. */
const GEM_MOHS = {
  diamond: 10, ruby: 9, sapphire: 9, topaz: 8,
  emerald: 7.5, amethyst: 7, garnet: 7, turquoise: 6,
};

const GEM_NAMES = {
  emerald:   { tr: 'Zümrüt',   en: 'Emerald',   ar: 'زمرد' },
  ruby:      { tr: 'Yakut',    en: 'Ruby',      ar: 'ياقوت' },
  sapphire:  { tr: 'Safir',    en: 'Sapphire',  ar: 'صفير' },
  diamond:   { tr: 'Elmas',    en: 'Diamond',   ar: 'ماس' },
  topaz:     { tr: 'Topaz',    en: 'Topaz',     ar: 'توباز' },
  amethyst:  { tr: 'Ametist',  en: 'Amethyst',  ar: 'جمشت' },
  garnet:    { tr: 'Garnet',   en: 'Garnet',    ar: 'غارنت' },
  turquoise: { tr: 'Turkuvaz', en: 'Turquoise', ar: 'فيروز' },
};

/* Create a random board with no pre-existing 3-in-a-row. */
function makeBoard(pool) {
  const n = SIZE * SIZE;
  const b = new Array(n);
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / SIZE);
    const c = i % SIZE;
    const blocked = [];
    // Avoid 3 in a row horizontally and vertically
    if (c >= 2 && b[i - 1] === b[i - 2]) blocked.push(b[i - 1]);
    if (r >= 2 && b[i - SIZE] === b[i - 2 * SIZE]) blocked.push(b[i - SIZE]);
    const options = pool.filter((g) => !blocked.includes(g));
    b[i] = options[Math.floor(Math.random() * options.length)];
  }
  return b;
}

/* Return a Set of indices participating in any 3+ horizontal or vertical run. */
function findMatches(board) {
  const matched = new Set();
  // Horizontal
  for (let r = 0; r < SIZE; r++) {
    let runStart = 0;
    for (let c = 1; c <= SIZE; c++) {
      const cur = c < SIZE ? board[r * SIZE + c] : null;
      const prev = board[r * SIZE + (c - 1)];
      if (cur !== prev) {
        const runLen = c - runStart;
        if (runLen >= 3 && prev != null) {
          for (let k = runStart; k < c; k++) matched.add(r * SIZE + k);
        }
        runStart = c;
      }
    }
  }
  // Vertical
  for (let c = 0; c < SIZE; c++) {
    let runStart = 0;
    for (let r = 1; r <= SIZE; r++) {
      const cur = r < SIZE ? board[r * SIZE + c] : null;
      const prev = board[(r - 1) * SIZE + c];
      if (cur !== prev) {
        const runLen = r - runStart;
        if (runLen >= 3 && prev != null) {
          for (let k = runStart; k < r; k++) matched.add(k * SIZE + c);
        }
        runStart = r;
      }
    }
  }
  return matched;
}

/* Remove matched cells and collapse: gems fall down, top refills. */
function collapseAndRefill(board, matched, pool) {
  const next = [...board];
  // Null out matched
  matched.forEach((i) => { next[i] = null; });
  // Per column: compact non-null entries at bottom, fill top with fresh gems
  for (let c = 0; c < SIZE; c++) {
    const col = [];
    for (let r = SIZE - 1; r >= 0; r--) {
      const v = next[r * SIZE + c];
      if (v != null) col.push(v);
    }
    while (col.length < SIZE) {
      col.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    // col[0] is bottom, col[SIZE-1] is top
    for (let r = SIZE - 1; r >= 0; r--) {
      next[r * SIZE + c] = col[SIZE - 1 - r];
    }
  }
  return next;
}

function areAdjacent(a, b) {
  const ra = Math.floor(a / SIZE), ca = a % SIZE;
  const rb = Math.floor(b / SIZE), cb = b % SIZE;
  return (ra === rb && Math.abs(ca - cb) === 1) ||
         (ca === cb && Math.abs(ra - rb) === 1);
}

export default function GemMatch3({ difficulty, accent, onFinish }) {
  const { locale } = useLocale();
  const { play } = useSound();

  const pool = POOLS[difficulty] || POOLS.cirak;
  const duration = DURATIONS[difficulty] || 60;

  const [board, setBoard] = useState(() => makeBoard(pool));
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [selected, setSelected] = useState(null); // index or null
  const [matched, setMatched] = useState(new Set()); // indices currently popping
  const [timeLeft, setTimeLeft] = useState(duration);
  const [poppedCounts, setPoppedCounts] = useState({}); // gemId → count
  const [lastPop, setLastPop] = useState(null);        // gemId for the micro-label

  const busyRef = useRef(false);  // true while cascade animation running
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  /* Timer — decrements each second. Finishes game when it hits 0. */
  useEffect(() => {
    if (timeLeft <= 0) {
      const top = Object.entries(poppedCounts).sort((a, b) => b[1] - a[1])[0];
      const won = score >= BADGE_THRESHOLD[difficulty];
      onFinishRef.current({
        score,
        won,
        summary: {
          tr: `${Object.values(poppedCounts).reduce((s, n) => s + n, 0)} taş patlattın!`,
          en: `You burst ${Object.values(poppedCounts).reduce((s, n) => s + n, 0)} gems!`,
          ar: `فجّرت ${Object.values(poppedCounts).reduce((s, n) => s + n, 0)} حجراً!`,
        },
        blurb: top
          ? buildTopGemBlurb(top[0], top[1])
          : undefined,
        breakdown: [
          {
            label: { tr: 'Taşlar', en: 'Gems', ar: 'أحجار' },
            value: Object.values(poppedCounts).reduce((s, n) => s + n, 0),
          },
          {
            label: { tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' },
            value: { cirak: 'Çırak', kalfa: 'Kalfa', usta: 'Usta' }[difficulty],
          },
        ],
      });
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, score, difficulty, poppedCounts]);

  /* Resolve matches after any board change; chain into more matches. */
  const resolveMatches = useCallback((startBoard, currentCombo) => {
    const found = findMatches(startBoard);
    if (found.size === 0) {
      busyRef.current = false;
      setCombo(1);
      return;
    }
    busyRef.current = true;
    setMatched(found);
    play?.('reveal');

    // Score formula: base 10/cell, scaled by combo chain multiplier.
    const base = found.size * 10;
    const chainBonus = found.size >= 5 ? 50 : found.size >= 4 ? 25 : 0;
    const total = Math.round((base + chainBonus) * currentCombo);
    setScore((s) => s + total);

    // Track popped gem counts for end-screen summary
    const popped = {};
    found.forEach((i) => {
      const g = startBoard[i];
      popped[g] = (popped[g] || 0) + 1;
    });
    setPoppedCounts((prev) => {
      const next = { ...prev };
      for (const [g, n] of Object.entries(popped)) {
        next[g] = (next[g] || 0) + n;
      }
      return next;
    });
    // Remember the "hero" gem (most-popped this match) for floating label
    const heroGem = Object.entries(popped).sort((a, b) => b[1] - a[1])[0][0];
    setLastPop(heroGem);
    setTimeout(() => setLastPop(null), 1200);

    // After pop animation, collapse & refill, then recurse for chains
    setTimeout(() => {
      const next = collapseAndRefill(startBoard, found, pool);
      setBoard(next);
      setMatched(new Set());
      const newCombo = Math.min(currentCombo + 0.5, 5);
      setCombo(newCombo);
      if (found.size >= 4) play?.('success');
      setTimeout(() => resolveMatches(next, newCombo), 180);
    }, 280);
  }, [pool, play]);

  /* Tap handler — selects a cell or attempts a swap. */
  const handleTap = (idx) => {
    if (busyRef.current) return;
    if (selected == null) {
      setSelected(idx);
      play?.('click');
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    if (!areAdjacent(selected, idx)) {
      setSelected(idx);
      play?.('click');
      return;
    }
    // Attempt swap
    const a = selected, b = idx;
    const after = [...board];
    [after[a], after[b]] = [after[b], after[a]];
    const found = findMatches(after);
    if (found.size === 0) {
      // Invalid swap — small wobble via error sound, revert
      play?.('error');
      setSelected(null);
      return;
    }
    setSelected(null);
    setBoard(after);
    busyRef.current = true;
    // Reset combo at the start of a player-initiated match chain
    setTimeout(() => resolveMatches(after, 1), 100);
  };

  const totalPopped = Object.values(poppedCounts).reduce((s, n) => s + n, 0);

  return (
    <div className="space-y-4">
      {/* Scoreboard */}
      <ScoreBoard
        score={score}
        time={timeLeft}
        combo={combo}
        accent={accent}
        extra={
          <span>
            {{ tr: 'Taş', en: 'Gems', ar: 'حجر' }[locale]}: {totalPopped}
          </span>
        }
      />

      {/* Last-pop micro-label — flies across top briefly */}
      <div className="relative h-6 sm:h-7">
        {lastPop && (
          <span
            key={lastPop + Date.now()} // force remount per pop
            className="absolute inset-x-0 mx-auto w-fit px-3 py-1 rounded-full
                       bg-ink text-cream text-xs font-extrabold shadow-museum
                       animate-popIn"
          >
            <span className="text-gold">
              {GEM_NAMES[lastPop]?.[locale] || lastPop}
            </span>
            <span className="mx-1.5 opacity-40">·</span>
            Mohs {GEM_MOHS[lastPop]}
          </span>
        )}
      </div>

      {/* Board — CSS grid, flex-centered with max width */}
      <div className="flex justify-center">
        <div
          className="grid gap-1 p-2 rounded-3xl bg-ink/5 border border-ink/10"
          style={{
            gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
            maxWidth: 'min(100%, 480px)',
            width: '100%',
          }}
          role="grid"
          aria-label="Gem match board"
        >
          {board.map((gem, idx) => {
            const isSel = selected === idx;
            const isMatched = matched.has(idx);
            return (
              <button
                key={idx}
                type="button"
                role="gridcell"
                aria-selected={isSel}
                aria-label={gem ? GEM_NAMES[gem]?.[locale] || gem : 'empty'}
                onClick={() => handleTap(idx)}
                className={cx(
                  'aspect-square rounded-xl flex items-center justify-center bg-white/80',
                  'border transition select-none',
                  isSel
                    ? 'ring-4 ring-gold border-gold scale-95 z-10'
                    : 'border-ink/5 hover:border-ink/20 active:scale-95',
                  isMatched && 'animate-popOut',
                )}
                style={{
                  transform: isSel ? 'scale(0.92)' : undefined,
                }}
              >
                {gem && (
                  <GemIcon
                    id={gem}
                    size={36}
                    animate={isMatched}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-xs font-bold text-ink/50 mt-1">
        {{
          tr: 'Bir taşa dokun, ardından komşusuna dokun — yer değiştirirler. 3 veya daha fazlası yan yana gelirse patlar.',
          en: 'Tap a gem, then tap a neighbor — they swap. Line up 3 or more to pop them.',
          ar: 'انقر حجراً ثم جاره — يتبادلان. اصطف 3 فأكثر لينفجرا.',
        }[locale]}
      </p>
    </div>
  );
}

function buildTopGemBlurb(gemId, count) {
  const name = GEM_NAMES[gemId];
  const mohs = GEM_MOHS[gemId];
  return {
    tr: `En çok ${name?.tr} patlattın (${count} adet). ${name?.tr} Mohs ${mohs} sertliğinde — ${mohs >= 9 ? 'dünyanın en sert taşlarından biri.' : mohs >= 7 ? 'cam (Mohs 5.5) tarafından çizilmez.' : 'bıçakla çizilebilir, dikkatli takılmalı.'}`,
    en: `You popped ${name?.en} the most (${count}). ${name?.en} is Mohs ${mohs} — ${mohs >= 9 ? 'one of the hardest gems on Earth.' : mohs >= 7 ? 'unscratchable by glass (Mohs 5.5).' : 'soft enough to scratch with a knife — handle with care.'}`,
    ar: `فجّرت ${name?.ar} أكثر من غيره (${count}). ${name?.ar} صلابته موس ${mohs} — ${mohs >= 9 ? 'من أصلب الأحجار.' : mohs >= 7 ? 'لا يخدشه الزجاج.' : 'ناعم نسبياً، تعامل بحذر.'}`,
  };
}
