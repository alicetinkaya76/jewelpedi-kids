import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import { timelineEvents } from '../data/timelineEvents.js';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import { pick, cx } from '../utils/helpers.js';
import { ArrowUp, ArrowDown, Check, X, ChevronRight } from 'lucide-react';

/**
 * TimelineRush — sort 5 (or 7) historical events chronologically.
 *
 * Each round the game draws a spaced sample from the full timelineEvents
 * catalogue (80+ events spanning 4000 BCE → present). Difficulty controls
 * (a) how many cards per round, (b) how tight the year-gaps are, and
 * (c) whether ties on year are possible.
 *
 * Interaction: up/down arrows next to each card move it within the list.
 * A11y-friendly and mobile-friendly — no drag-and-drop.
 *
 * Scoring:
 *   +10 per correctly-placed card
 *   -3  per misplaced card
 *   +speed bonus proportional to time remaining
 *
 * 5 rounds total, 30-second budget per round. Badge unlocks on Usta with
 * 7/7 perfect cards across 5 rounds (i.e. 5 perfect rounds at Usta).
 */

const CONFIG = {
  cirak: { cards: 5, minGap: 200, roundTime: 45, roundsTotal: 5 },
  kalfa: { cards: 5, minGap: 60,  roundTime: 35, roundsTotal: 5 },
  usta:  { cards: 7, minGap: 25,  roundTime: 40, roundsTotal: 5 },
};

/** Pick N events from the pool that respect a minimum year-gap. */
function sampleRound(pool, n, minGap) {
  const copy = [...pool].sort(() => Math.random() - 0.5);
  const picked = [];
  for (const e of copy) {
    if (picked.every((p) => Math.abs(p.year - e.year) >= minGap)) {
      picked.push(e);
      if (picked.length >= n) break;
    }
  }
  // If not enough spacing was possible, fallback to any-distinct-year sample.
  if (picked.length < n) {
    const years = new Set(picked.map((p) => p.year));
    for (const e of copy) {
      if (!years.has(e.year)) {
        picked.push(e);
        years.add(e.year);
        if (picked.length >= n) break;
      }
    }
  }
  // Scramble display order so sorted != initial
  return picked.sort(() => Math.random() - 0.5);
}

function formatYear(y, locale) {
  if (y < 0) return `${Math.abs(y)} ${{ tr: 'MÖ', en: 'BCE', ar: 'ق.م' }[locale] || 'BCE'}`;
  return `${y} ${{ tr: 'MS', en: 'CE', ar: 'م' }[locale] || 'CE'}`;
}

export default function TimelineRush({ difficulty, accent, onFinish }) {
  const { locale } = useLocale();
  const { play } = useSound();

  const cfg = CONFIG[difficulty] || CONFIG.cirak;

  // Pool is stable across rounds so the same event can't show twice in one game.
  const pool = useMemo(() => {
    // Exclude duplicate years on Çırak to keep spacing guarantees
    return timelineEvents.filter((e) => e.title && e.description);
  }, []);

  const [roundIdx, setRoundIdx] = useState(0);
  const [usedIds, setUsedIds] = useState(new Set());
  const [order, setOrder] = useState(() => sampleRound(pool, cfg.cards, cfg.minGap));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cfg.roundTime);
  const [phase, setPhase] = useState('sorting');  // 'sorting' | 'reveal'
  const [reveal, setReveal] = useState(null);     // { correctCount, deltaScore }
  const [perfectRounds, setPerfectRounds] = useState(0);

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  /* Timer — only counts down during the sorting phase. */
  useEffect(() => {
    if (phase !== 'sorting') return;
    if (timeLeft <= 0) {
      submitRound();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const move = (idx, dir) => {
    if (phase !== 'sorting') return;
    const next = [...order];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next);
    play?.('click');
  };

  const submitRound = () => {
    const correctSorted = [...order].sort((a, b) => a.year - b.year);
    let correctCount = 0;
    order.forEach((e, i) => {
      if (correctSorted[i].year === e.year && correctSorted[i].title === e.title) {
        correctCount++;
      }
    });
    const deltaPos = correctCount * 10;
    const deltaNeg = (order.length - correctCount) * 3;
    const speedBonus = correctCount === order.length ? Math.round(timeLeft * 1.5) : 0;
    const delta = Math.max(0, deltaPos - deltaNeg) + speedBonus;
    const isPerfect = correctCount === order.length;

    setScore((s) => s + delta);
    setReveal({ correctCount, delta, isPerfect, correctSorted });
    setPhase('reveal');
    if (isPerfect) {
      play?.('success');
      setPerfectRounds((p) => p + 1);
    } else if (correctCount < order.length / 2) {
      play?.('error');
    } else {
      play?.('reveal');
    }
  };

  const nextRound = () => {
    const finalScore = score;
    const finalPerfect = perfectRounds;
    if (roundIdx + 1 >= cfg.roundsTotal) {
      const maxRoundScore = cfg.cards * 10 + Math.round(cfg.roundTime * 1.5);
      const bestOf = cfg.roundsTotal * maxRoundScore;
      const won = difficulty === 'usta' && finalPerfect === cfg.roundsTotal;
      onFinishRef.current({
        score: finalScore,
        won,
        bestOf,
        summary: {
          tr: `${finalPerfect}/${cfg.roundsTotal} tur mükemmel tamamlandı.`,
          en: `${finalPerfect}/${cfg.roundsTotal} rounds played perfectly.`,
          ar: `${finalPerfect}/${cfg.roundsTotal} جولات مثالية.`,
        },
        blurb: {
          tr: 'Zaman çizgisinde 6000 yıllık mücevher tarihi var. Sar-i Sang lapisi MÖ 4000\'de başladı, Varna nekropolünde dünyanın en eski altın takıları bulundu. Zaman Çizgisi sayfasını ziyaret edip karıştırdığın olayları tekrar gör!',
          en: 'The timeline holds 6,000 years of jewelry history — from Sar-i Sang lapis (4000 BCE) to modern lab diamonds. Visit the Timeline page to see the events you missed in context.',
          ar: 'الخط الزمني يغطي 6000 عام من تاريخ المجوهرات. زر الصفحة لتعيد ترتيب الأحداث.',
        },
        breakdown: [
          {
            label: { tr: 'Mükemmel tur', en: 'Perfect rounds', ar: 'جولات مثالية' },
            value: `${finalPerfect}/${cfg.roundsTotal}`,
          },
          {
            label: { tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' },
            value: { cirak: 'Çırak', kalfa: 'Kalfa', usta: 'Usta' }[difficulty],
          },
        ],
      });
      return;
    }
    // Prepare next round with unused events preferred
    setUsedIds((prev) => {
      const next = new Set(prev);
      order.forEach((e) => next.add(`${e.year}-${JSON.stringify(e.title)}`));
      return next;
    });
    const nextPool = pool.filter(
      (e) => !usedIds.has(`${e.year}-${JSON.stringify(e.title)}`),
    );
    setOrder(sampleRound(nextPool.length >= cfg.cards * 2 ? nextPool : pool, cfg.cards, cfg.minGap));
    setRoundIdx((i) => i + 1);
    setTimeLeft(cfg.roundTime);
    setPhase('sorting');
    setReveal(null);
  };

  const correctSorted = useMemo(
    () => phase === 'reveal' && reveal ? reveal.correctSorted : null,
    [phase, reveal],
  );

  return (
    <div className="space-y-4">
      <ScoreBoard
        score={score}
        time={phase === 'sorting' ? timeLeft : undefined}
        accent={accent}
        extra={
          <span>
            {{ tr: 'Tur', en: 'Round', ar: 'جولة' }[locale]} {roundIdx + 1}/{cfg.roundsTotal}
          </span>
        }
      />

      <p className="text-sm font-bold text-ink/70 text-center">
        {phase === 'sorting'
          ? {
              tr: 'Olayları EN ESKİDEN EN YENİYE sırala. Her kartı oklarla yukarı/aşağı taşı.',
              en: 'Sort events OLDEST to NEWEST. Use the arrows to move each card up or down.',
              ar: 'رتّب الأحداث من الأقدم إلى الأحدث باستخدام الأسهم.',
            }[locale]
          : {
              tr: 'Senin sıralamanın yanında doğrusu gösteriliyor.',
              en: 'Your order is shown next to the correct one.',
              ar: 'ترتيبك وترتيب صحيح جنباً إلى جنب.',
            }[locale]
        }
      </p>

      {/* Cards */}
      <div className="space-y-2">
        {order.map((e, i) => {
          const correct =
            reveal && correctSorted[i].year === e.year && correctSorted[i].title === e.title;
          return (
            <div key={`${i}-${e.year}`} className="flex items-stretch gap-2">
              <div
                className={cx(
                  'flex-1 rounded-2xl p-3 sm:p-4 border transition',
                  phase === 'reveal'
                    ? correct
                      ? 'bg-gem/10 border-gem'
                      : 'bg-red-50 border-red-300'
                    : 'bg-white border-ink/10 hover:border-ink/20',
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cx(
                      'inline-flex items-center justify-center shrink-0',
                      'w-7 h-7 rounded-lg text-xs font-extrabold',
                      phase === 'reveal'
                        ? correct
                          ? 'bg-gem text-white'
                          : 'bg-red-400 text-white'
                        : 'bg-ink/10 text-ink/60',
                    )}
                  >
                    {phase === 'reveal' ? (correct ? <Check size={14} /> : <X size={14} />) : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-extrabold text-ink leading-tight text-sm sm:text-base">
                      {pick(e.title, locale)}
                    </h4>
                    {phase === 'reveal' && (
                      <p className="text-xs text-ink/70 leading-relaxed mt-1">
                        <strong className="text-ink">{formatYear(e.year, locale)}</strong>
                        {' — '}
                        {pick(e.description, locale)}
                      </p>
                    )}
                  </div>
                  {phase === 'reveal' && !correct && (
                    <span className="text-[10px] font-extrabold text-red-600">
                      {{
                        tr: 'Doğrusu sıra',
                        en: 'Correct slot',
                        ar: 'الموضع الصحيح',
                      }[locale]}{' '}
                      {correctSorted.findIndex(
                        (x) => x.year === e.year && x.title === e.title,
                      ) + 1}
                    </span>
                  )}
                </div>
              </div>

              {/* Move arrows */}
              {phase === 'sorting' && (
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className={cx(
                      'w-9 h-9 rounded-xl flex items-center justify-center border text-ink',
                      'bg-white border-ink/10 hover:border-ink/30 disabled:opacity-30',
                    )}
                    aria-label={{ tr: 'Yukarı taşı', en: 'Move up', ar: 'للأعلى' }[locale]}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, +1)}
                    disabled={i === order.length - 1}
                    className={cx(
                      'w-9 h-9 rounded-xl flex items-center justify-center border text-ink',
                      'bg-white border-ink/10 hover:border-ink/30 disabled:opacity-30',
                    )}
                    aria-label={{ tr: 'Aşağı taşı', en: 'Move down', ar: 'للأسفل' }[locale]}
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-2">
        {phase === 'sorting' ? (
          <button
            type="button"
            onClick={submitRound}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       text-cream font-extrabold shadow-museum"
            style={{ background: accent }}
          >
            {{ tr: 'Gönder', en: 'Submit', ar: 'إرسال' }[locale]}
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="text-center">
            <div className="mb-2">
              <span className="text-sm font-bold text-ink/60">
                {{
                  tr: 'Bu tur',
                  en: 'This round',
                  ar: 'هذه الجولة',
                }[locale]}
              </span>
              <span
                className="ml-2 rtl:ml-0 rtl:mr-2 font-display text-xl font-extrabold"
                style={{ color: accent }}
              >
                +{reveal.delta} {reveal.isPerfect && '🌟'}
              </span>
              {reveal.isPerfect && (
                <p className="text-xs font-bold text-gold mt-0.5">
                  {{ tr: 'Mükemmel!', en: 'Perfect!', ar: 'ممتاز!' }[locale]}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={nextRound}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-ink text-cream font-extrabold shadow-museum"
            >
              {roundIdx + 1 >= cfg.roundsTotal
                ? { tr: 'Sonuçlar', en: 'Finish', ar: 'النتائج' }[locale]
                : { tr: 'Sıradaki Tur', en: 'Next round', ar: 'الجولة التالية' }[locale]}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
