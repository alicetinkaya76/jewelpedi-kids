import { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useSound } from '../../audio/SoundContext.jsx';
import { Coins, RotateCcw, Flame, Hammer, Award, Plus, Minus } from 'lucide-react';

/*
 * Lydia Mint — interactive simulator recreating how the ancient Lydians
 * minted the world's first standardized coins around 600 BCE.
 *
 * Stages:
 *   1. ingots — user picks Au and Ag ingot counts (each = 1 gram)
 *   2. melt — crucible animates, alloy purity & weight revealed
 *   3. stamp — pick Alyattes lion / Croesus split / plain punch
 *   4. result — minted coin + historical verdict vs real Lydian electrum
 *
 * Historical data:
 *   - Lydian natural electrum averaged 45-55% gold (collected from the
 *     Pactolus river near modern Manisa, Turkey).
 *   - Kroisos (Croesus, c. 560-546 BCE) later separated gold and silver
 *     to issue ~99% pure gold "staters" — a financial revolution.
 *   - 1 stater = ~10.7g. Smaller trites (1/3), hektes (1/6) also minted.
 */

const MAX_INGOTS = 15;
const GRAMS_PER_INGOT = 1;

const STAMPS = [
  {
    id: 'lion',
    historical: 'Alyattes (c. -600)',
    eraRange: [-600, -560],
    label: { tr: 'Alyattes Aslanı', en: 'Alyattes Lion', ar: 'أسد ألياتيس' },
    svg: (
      // Stylized lion head in profile
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 20 32 Q 16 25 22 19 Q 28 14 36 16 Q 42 14 46 20 Q 50 22 52 28 Q 54 34 50 38 Q 46 42 40 41 Q 36 42 34 40 Q 30 41 26 39 Q 22 37 20 32 Z" />
        <circle cx="30" cy="28" r="1.6" fill="currentColor" />
        <circle cx="42" cy="28" r="1.6" fill="currentColor" />
        <path d="M 34 34 Q 37 36 40 34" />
        <path d="M 18 20 L 14 16 M 22 16 L 19 10 M 28 13 L 27 7" opacity="0.6" />
      </g>
    ),
  },
  {
    id: 'split',
    historical: 'Kroisos (c. -560)',
    eraRange: [-560, -546],
    label: { tr: 'Kroisos İkili Darbe', en: 'Croesus Twin Punch', ar: 'ضربة كروسوس' },
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="16" y="22" width="14" height="14" />
        <rect x="34" y="22" width="14" height="14" />
        <circle cx="23" cy="29" r="2.5" fill="currentColor" />
        <circle cx="41" cy="29" r="2.5" fill="currentColor" />
      </g>
    ),
  },
  {
    id: 'punch',
    historical: 'Erken darbe (c. -650)',
    eraRange: [-650, -600],
    label: { tr: 'Basit Çentik', en: 'Simple Punch', ar: 'طعن بسيط' },
    svg: (
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="22" y="22" width="20" height="20" transform="rotate(45 32 32)" />
        <rect x="28" y="28" width="8" height="8" transform="rotate(45 32 32)" fill="currentColor" />
      </g>
    ),
  },
];

export default function LydiaMint() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();
  const { play } = useSound();

  const [stage, setStage] = useState('ingots'); // ingots | melt | stamp | result
  const [auCount, setAuCount] = useState(5);
  const [agCount, setAgCount] = useState(5);
  const [meltProgress, setMeltProgress] = useState(0); // 0..1
  const [stampId, setStampId] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    completeLab('lydia');
  }, [completeLab]);

  const total = auCount + agCount;
  const totalGrams = total * GRAMS_PER_INGOT;
  const auPct = total > 0 ? (auCount / total) * 100 : 0;

  const L = strings[locale] || strings.tr;

  const goToMelt = () => {
    if (auCount + agCount < 3) return; // need at least 3 ingots
    play?.('open-case');
    setStage('melt');
    setMeltProgress(0);
    // Animate melting over ~2s
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / 2200);
      setMeltProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const goToStamp = () => setStage('stamp');

  const goToResult = (id) => {
    setStampId(id);
    play?.('page-turn');
    setStage('result');
    setSessionCount((c) => c + 1);
  };

  const restart = () => {
    setStage('ingots');
    setAuCount(5);
    setAgCount(5);
    setMeltProgress(0);
    setStampId(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-ink mb-1">
            {L.title}
          </h3>
          <p className="text-sm text-ink/60 max-w-xl">{L.subtitle}</p>
        </div>
        <StageDots stage={stage} L={L} />
      </div>

      {stage === 'ingots' && (
        <IngotStage
          auCount={auCount}
          agCount={agCount}
          setAuCount={setAuCount}
          setAgCount={setAgCount}
          totalGrams={totalGrams}
          auPct={auPct}
          onNext={goToMelt}
          L={L}
        />
      )}
      {stage === 'melt' && (
        <MeltStage
          auCount={auCount}
          agCount={agCount}
          progress={meltProgress}
          auPct={auPct}
          totalGrams={totalGrams}
          onNext={goToStamp}
          L={L}
        />
      )}
      {stage === 'stamp' && (
        <StampStage
          auPct={auPct}
          onPick={goToResult}
          L={L}
          locale={locale}
        />
      )}
      {stage === 'result' && (
        <ResultStage
          auPct={auPct}
          totalGrams={totalGrams}
          stampId={stampId}
          onRestart={restart}
          sessionCount={sessionCount}
          L={L}
          locale={locale}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Stage dots progress indicator
   ══════════════════════════════════════════════════════════ */
function StageDots({ stage, L }) {
  const order = ['ingots', 'melt', 'stamp', 'result'];
  const idx = order.indexOf(stage);
  return (
    <div className="flex items-center gap-2">
      {order.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-extrabold transition"
            style={{
              background: i <= idx ? '#d4a017' : '#e5e7eb',
              color: i <= idx ? '#fff' : '#9ca3af',
            }}
          >
            {i + 1}
          </span>
          {i < order.length - 1 && (
            <span
              className="w-4 h-0.5 transition"
              style={{ background: i < idx ? '#d4a017' : '#e5e7eb' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STAGE 1 — ingots
   ══════════════════════════════════════════════════════════ */
function IngotStage({ auCount, agCount, setAuCount, setAgCount, totalGrams, auPct, onNext, L }) {
  const canContinue = auCount + agCount >= 3;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Gold pile */}
      <IngotPile
        label={L.gold}
        sublabel="Au · 79"
        color="#f7c948"
        accent="#d4a017"
        count={auCount}
        setCount={setAuCount}
        L={L}
      />
      {/* Silver pile */}
      <IngotPile
        label={L.silver}
        sublabel="Ag · 47"
        color="#d5dbdb"
        accent="#85929e"
        count={agCount}
        setCount={setAgCount}
        L={L}
      />

      {/* Summary spanning both cols */}
      <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest font-extrabold text-amber-800">
              {L.crucibleReady}
            </div>
            <div className="font-display text-ink font-extrabold text-xl mt-0.5">
              {totalGrams}g · {auPct.toFixed(0)}% Au / {(100 - auPct).toFixed(0)}% Ag
            </div>
            {!canContinue && (
              <div className="text-xs text-amber-700 mt-1">
                {L.needAtLeast}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-700 text-white text-sm font-extrabold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-800"
          >
            <Flame size={16} />
            {L.melt}
          </button>
        </div>
      </div>
    </div>
  );
}

function IngotPile({ label, sublabel, color, accent, count, setCount, L }) {
  const cols = 5;
  const visual = Array.from({ length: MAX_INGOTS }, (_, i) => i);
  return (
    <div
      className="rounded-2xl p-5 border-2"
      style={{
        background: `color-mix(in srgb, ${color} 10%, white)`,
        borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color: accent }}>
            {sublabel}
          </div>
          <div className="font-display font-extrabold text-ink text-lg leading-tight mt-0.5">
            {label}
          </div>
        </div>
        <div className="text-stat-number text-3xl tabular-nums" style={{ color: accent }}>
          {count}
        </div>
      </div>

      {/* Ingot grid visual */}
      <div
        className="grid gap-1.5 mb-4"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {visual.map((i) => (
          <div
            key={i}
            className="aspect-[2/1] rounded-sm transition-all"
            style={{
              background: i < count ? color : `color-mix(in srgb, ${color} 15%, white)`,
              boxShadow: i < count
                ? `inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.15)`
                : undefined,
              opacity: i < count ? 1 : 0.3,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCount(Math.max(0, count - 1))}
          disabled={count === 0}
          className="w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center disabled:opacity-30"
          style={{ borderColor: accent, color: accent }}
          aria-label={L.decrement}
        >
          <Minus size={16} />
        </button>
        <input
          type="range"
          min={0}
          max={MAX_INGOTS}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: accent }}
        />
        <button
          type="button"
          onClick={() => setCount(Math.min(MAX_INGOTS, count + 1))}
          disabled={count === MAX_INGOTS}
          className="w-10 h-10 rounded-full text-white flex items-center justify-center disabled:opacity-30"
          style={{ background: accent }}
          aria-label={L.increment}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STAGE 2 — melt
   ══════════════════════════════════════════════════════════ */
function MeltStage({ auCount, agCount, progress, auPct, totalGrams, onNext, L }) {
  // Color evolves from separate metals to blended electrum
  const golden = '#f7c948';
  const silvery = '#d5dbdb';
  const electrum = blendColors(golden, silvery, auPct / 100);

  // Temperature rises 20°C → 1064°C during melting
  const temp = Math.round(20 + progress * (1064 - 20));
  const done = progress >= 1;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-orange-950 via-red-900 to-amber-900 p-8 text-center relative overflow-hidden">
      {/* Heat haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 70%, rgba(247,201,72,${progress * 0.4}), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="text-[10px] uppercase tracking-widest font-extrabold text-amber-200 mb-2">
          {L.crucible}
        </div>

        {/* Crucible SVG */}
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
          {/* Crucible bowl */}
          <path
            d="M 50 80 L 55 160 Q 55 175 70 178 L 130 178 Q 145 175 145 160 L 150 80 Z"
            fill="#1c1917"
            stroke="#78350f"
            strokeWidth={3}
          />
          {/* Molten metal inside */}
          <path
            d={`M 62 ${90 + (1 - progress) * 10} Q 100 ${86 + (1 - progress) * 10} 138 ${90 + (1 - progress) * 10} L 143 160 Q 143 170 130 172 L 70 172 Q 57 170 57 160 Z`}
            fill={electrum}
            opacity={0.85 + progress * 0.15}
          />
          {/* Ripple highlights */}
          <ellipse
            cx={100} cy={92 + (1 - progress) * 10}
            rx={35} ry={4}
            fill="rgba(255,255,255,0.4)"
          />

          {/* Flames underneath — animated */}
          {progress > 0.1 && (
            <>
              {[...Array(5)].map((_, i) => {
                const x = 60 + i * 20;
                const height = 20 + Math.sin(Date.now() / 200 + i) * 8 + progress * 25;
                return (
                  <path
                    key={i}
                    d={`M ${x} 190 Q ${x - 4} ${190 - height / 2} ${x} ${190 - height} Q ${x + 4} ${190 - height / 2} ${x} 190`}
                    fill={`url(#flameGrad)`}
                    opacity={0.8}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.6;1;0.6"
                      dur={`${0.4 + i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                );
              })}
            </>
          )}

          {/* Sparks when complete */}
          {done && [...Array(8)].map((_, i) => (
            <circle
              key={`spark-${i}`}
              cx={100 + Math.cos((i * Math.PI) / 4) * 40}
              cy={90 + Math.sin((i * Math.PI) / 4) * 15}
              r={1.5}
              fill="#fff"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${0.6 + i * 0.1}s`}
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          <defs>
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Temperature gauge */}
        <div className="mt-4 font-display text-stat-number text-3xl text-amber-200 tabular-nums">
          {temp}°C
        </div>
        <div className="text-[10px] uppercase tracking-widest font-bold text-amber-200/70 mt-1">
          {done
            ? L.meltDone.replace('{au}', auPct.toFixed(1))
            : L.melting}
        </div>

        {done && (
          <button
            type="button"
            onClick={onNext}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-300 text-amber-950 text-sm font-extrabold uppercase tracking-wider hover:bg-amber-200"
          >
            <Hammer size={16} />
            {L.toStamp}
          </button>
        )}
      </div>
    </div>
  );
}

function blendColors(a, b, t) {
  // Linear blend of two hex colors
  const ha = parseInt(a.slice(1), 16);
  const hb = parseInt(b.slice(1), 16);
  const ar = (ha >> 16) & 0xff, ag = (ha >> 8) & 0xff, ab = ha & 0xff;
  const br = (hb >> 16) & 0xff, bg = (hb >> 8) & 0xff, bb = hb & 0xff;
  const rr = Math.round(ar * t + br * (1 - t));
  const rg = Math.round(ag * t + bg * (1 - t));
  const rb = Math.round(ab * t + bb * (1 - t));
  return `#${((rr << 16) | (rg << 8) | rb).toString(16).padStart(6, '0')}`;
}

/* ══════════════════════════════════════════════════════════
   STAGE 3 — stamp
   ══════════════════════════════════════════════════════════ */
function StampStage({ auPct, onPick, L, locale }) {
  return (
    <div className="rounded-3xl bg-amber-50 border-2 border-amber-200 p-6">
      <div className="text-[10px] uppercase tracking-widest font-extrabold text-amber-800 mb-2 text-center">
        {L.chooseStamp}
      </div>
      <h4 className="font-display text-xl font-extrabold text-ink text-center mb-5">
        {L.whichMark}
      </h4>

      <div className="grid md:grid-cols-3 gap-4">
        {STAMPS.map((stamp) => (
          <button
            key={stamp.id}
            type="button"
            onClick={() => onPick(stamp.id)}
            className="group rounded-2xl bg-white border-2 border-amber-300 p-5 hover:border-amber-500 hover:shadow-museum transition text-left lift-on-hover"
          >
            <div
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-3 text-amber-900 group-hover:scale-105 transition"
              style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <svg viewBox="0 0 64 64" width={48} height={48}>
                {stamp.svg}
              </svg>
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-amber-700 text-center">
              {stamp.historical}
            </div>
            <div className="font-display font-extrabold text-ink text-center mt-0.5">
              {stamp.label[locale] || stamp.label.tr}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STAGE 4 — result
   ══════════════════════════════════════════════════════════ */
function ResultStage({ auPct, totalGrams, stampId, onRestart, sessionCount, L, locale }) {
  const stamp = STAMPS.find((s) => s.id === stampId);
  const verdict = useMemo(() => judgeCoin(auPct, stampId), [auPct, stampId]);

  const electrumColor = blendColors('#f7c948', '#d5dbdb', auPct / 100);

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
      {/* Minted coin */}
      <div className="mx-auto">
        <div
          className="w-56 h-56 rounded-full relative flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${lighten(electrumColor, 0.3)}, ${electrumColor} 60%, ${darken(electrumColor, 0.2)})`,
            boxShadow: `
              inset 2px 2px 6px rgba(255,255,255,0.4),
              inset -2px -2px 6px rgba(0,0,0,0.2),
              0 8px 20px rgba(0,0,0,0.25)
            `,
          }}
        >
          {/* Rim */}
          <div
            className="absolute inset-2 rounded-full border"
            style={{ borderColor: darken(electrumColor, 0.3), borderWidth: 2 }}
          />
          {/* Stamp */}
          {stamp && (
            <svg viewBox="0 0 64 64" width={130} height={130} style={{ color: darken(electrumColor, 0.4) }}>
              {stamp.svg}
            </svg>
          )}
        </div>
        <div className="mt-3 text-center">
          <div className="font-display text-stat-number text-2xl text-ink tabular-nums">
            {totalGrams}g
          </div>
          <div className="text-xs text-ink/60 font-bold">
            {auPct.toFixed(1)}% Au · {(100 - auPct).toFixed(1)}% Ag
          </div>
          {sessionCount > 1 && (
            <div className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">
              {L.coinNo.replace('{n}', sessionCount)}
            </div>
          )}
        </div>
      </div>

      {/* Verdict */}
      <div className="space-y-4">
        <div
          className="rounded-2xl p-5 border-2"
          style={{ borderColor: verdict.color, background: `color-mix(in srgb, ${verdict.color} 8%, white)` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} style={{ color: verdict.color }} />
            <span className="font-extrabold uppercase tracking-widest text-xs" style={{ color: verdict.color }}>
              {L.verdict}
            </span>
          </div>
          <h4 className="font-display text-xl font-extrabold text-ink">
            {L.verdicts[verdict.key].title}
          </h4>
          <p className="mt-2 text-sm text-ink/80 leading-relaxed">
            {L.verdicts[verdict.key].body}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-ink/10 p-5">
          <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink/50 mb-2">
            {L.historicalContext}
          </div>
          <ul className="space-y-1.5 text-sm text-ink/75">
            <li className="flex gap-2">
              <span className="text-amber-600">◆</span>
              <span>{L.fact1}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600">◆</span>
              <span>{L.fact2}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600">◆</span>
              <span>{L.fact3}</span>
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-xs font-extrabold uppercase tracking-wider hover:bg-ink/85"
        >
          <RotateCcw size={14} />
          {L.mintAnother}
        </button>
      </div>
    </div>
  );
}

/** Compare minted coin to Lydian historical standards. */
function judgeCoin(auPct, stampId) {
  // Natural Pactolus electrum: 45-55% gold
  // Kroisos pure gold stater: ~99%
  // Kroisos pure silver: ~0%
  if (stampId === 'split') {
    // Kroisos twin punch → expects near-pure metal
    if (auPct >= 90) return { key: 'kroisosPure', color: '#d4a017' };
    if (auPct <= 10) return { key: 'kroisosSilver', color: '#85929e' };
    return { key: 'kroisosMismatch', color: '#e67e22' };
  }
  // Lion or simple punch → expects electrum
  if (auPct >= 45 && auPct <= 55) return { key: 'authenticElectrum', color: '#16a085' };
  if (auPct < 45) return { key: 'tooSilvery', color: '#85929e' };
  return { key: 'tooGoldy', color: '#d4a017' };
}

function lighten(hex, amount) {
  return blendColors(hex, '#ffffff', 1 - amount);
}

function darken(hex, amount) {
  return blendColors(hex, '#000000', 1 - amount);
}

/* ══════════════════════════════════════════════════════════
   i18n
   ══════════════════════════════════════════════════════════ */
const strings = {
  tr: {
    title: 'Lidya Sikke Darphanesi',
    subtitle: 'M.Ö. 600\'de Lidyalı Kral Alyattes, Sart Irmağı\'nın altın-gümüş kumlarından dünyanın ilk standart parasını bastırdı. Sen de kendi elektron sikkeni basabilir misin?',
    gold: 'Altın Külçesi',
    silver: 'Gümüş Külçesi',
    increment: 'Ekle',
    decrement: 'Çıkar',
    crucibleReady: 'Pota için hazır',
    needAtLeast: 'En az 3 külçe koymalısın.',
    melt: 'Erit',
    crucible: 'Pota',
    melting: 'Eritiliyor...',
    meltDone: 'Elektron oluştu — {au}% altın',
    toStamp: 'Mühürlemeye geç',
    chooseStamp: 'Mühür Seçimi',
    whichMark: 'Sikkene hangi mührü vuracaksın?',
    verdict: 'Sonuç',
    coinNo: '{n}. sikke',
    historicalContext: 'Tarihsel Bağlam',
    fact1: 'Gerçek Lidya elektron sikkeleri %45-55 altın içerirdi (Sart Irmağı\'nın doğal karışımı).',
    fact2: 'M.Ö. 560 civarında Kral Kroisos altın ve gümüşü ayırıp tek-metal sikke basmaya başladı.',
    fact3: '"Karun kadar zengin" deyimi — İngilizcede "rich as Croesus" — bu kraldan gelir.',
    mintAnother: 'Başka Bir Sikke Bas',
    verdicts: {
      authenticElectrum: {
        title: 'Gerçek Lidya Elektronu ★',
        body: 'Mükemmel! %45-55 altın oranı Sart Irmağı\'nın doğal elektron oranıyla birebir. Alyattes senin ustalığına gülümserdi.',
      },
      tooSilvery: {
        title: 'Fazla Gümüş',
        body: 'Sikken gerçek bir Lidya elektronuna göre fazla gümüş içeriyor. Daha fazla altın külçesi eklemeyi dene.',
      },
      tooGoldy: {
        title: 'Fazla Altın',
        body: 'Sikken neredeyse saf altın — Lidya elektronu değil, "stater" gibi. Aslında Kroisos daha sonra tam bunu yaptı (~550 M.Ö.), ama Alyattes\'in döneminde elektron standarttı.',
      },
      kroisosPure: {
        title: 'Kroisos Stater\'i ★',
        body: 'Çift punch darbesi + yüksek altın saflığı — bu tam olarak Kroisos\'un parasal reformu! Tarihin ilk saf altın sikkesini bastın.',
      },
      kroisosSilver: {
        title: 'Kroisos Siglos\'u',
        body: 'Kroisos\'un gümüş sikkesi olan "siglos" tam böyle basılırdı. Altın stater\'in yanında daha ufak kullanıcılar için. Doğru bir tarihsel ikili!',
      },
      kroisosMismatch: {
        title: 'Karışım Sorunu',
        body: 'Kroisos mühürü saf metal bekler — ya tam altın (stater) ya tam gümüş (siglos). Bu orandaki elektronu mühürlemek için lion mührünü dene.',
      },
    },
  },
  en: {
    title: 'Lydian Mint',
    subtitle: 'Around 600 BCE, the Lydian King Alyattes minted the world\'s first standardized currency from Pactolus River\'s gold-silver sands. Can you strike your own electrum coin?',
    gold: 'Gold Ingot',
    silver: 'Silver Ingot',
    increment: 'Add',
    decrement: 'Remove',
    crucibleReady: 'Ready for crucible',
    needAtLeast: 'You need at least 3 ingots.',
    melt: 'Melt',
    crucible: 'Crucible',
    melting: 'Melting...',
    meltDone: 'Electrum formed — {au}% gold',
    toStamp: 'To stamping',
    chooseStamp: 'Choose your die',
    whichMark: 'Which mark will you strike?',
    verdict: 'Verdict',
    coinNo: 'Coin #{n}',
    historicalContext: 'Historical Context',
    fact1: 'Real Lydian electrum was 45-55% gold (the Pactolus River\'s natural mix).',
    fact2: 'Around 560 BCE King Croesus began separating gold and silver into mono-metallic coins.',
    fact3: 'The phrase "rich as Croesus" comes from that king.',
    mintAnother: 'Mint Another',
    verdicts: {
      authenticElectrum: {
        title: 'Authentic Lydian Electrum ★',
        body: 'Perfect! 45-55% gold matches the natural Pactolus ratio. Alyattes would smile at your craftsmanship.',
      },
      tooSilvery: {
        title: 'Too Silvery',
        body: 'Your coin has less gold than true Lydian electrum. Try adding more gold ingots.',
      },
      tooGoldy: {
        title: 'Too Golden',
        body: 'Your coin is almost pure gold — not electrum but a "stater." Kroisos actually did this around 550 BCE, but in Alyattes\' era, electrum was the standard.',
      },
      kroisosPure: {
        title: 'Croesus Stater ★',
        body: 'Twin punch + high gold purity — this is exactly Croesus\' monetary reform! You struck history\'s first pure-gold coin.',
      },
      kroisosSilver: {
        title: 'Croesus Siglos',
        body: 'Croesus\' silver "siglos" looked just like this. Used alongside the gold stater for smaller transactions. Historically spot-on!',
      },
      kroisosMismatch: {
        title: 'Mixing Problem',
        body: 'The Croesus die expects pure metal — either all gold (stater) or all silver (siglos). For electrum, try the lion die instead.',
      },
    },
  },
  ar: {
    title: 'دار سك ليديا',
    subtitle: 'حوالي 600 ق.م. سكّ الملك الليدي ألياتيس أول عملة معيارية. هل تستطيع سك إلكترونك؟',
    gold: 'سبيكة ذهب',
    silver: 'سبيكة فضة',
    increment: 'أضف',
    decrement: 'أزل',
    crucibleReady: 'جاهز للبوتقة',
    needAtLeast: 'تحتاج 3 سبائك على الأقل.',
    melt: 'اصهر',
    crucible: 'البوتقة',
    melting: 'ينصهر...',
    meltDone: 'تشكل الإلكترون — {au}% ذهب',
    toStamp: 'للدمغ',
    chooseStamp: 'اختر الختم',
    whichMark: 'أي علامة ستضرب؟',
    verdict: 'النتيجة',
    coinNo: 'عملة #{n}',
    historicalContext: 'السياق التاريخي',
    fact1: 'الإلكترون الليدي الحقيقي 45-55% ذهب.',
    fact2: 'حوالي 560 ق.م. فصل كروسوس الذهب عن الفضة.',
    fact3: 'عبارة "غني كقارون" تأتي من كروسوس.',
    mintAnother: 'اسك عملة أخرى',
    verdicts: {
      authenticElectrum: { title: 'إلكترون ليدي أصيل ★', body: 'ممتاز! 45-55% ذهب — تطابق تام.' },
      tooSilvery: { title: 'فضة زائدة', body: 'عملتك تحتاج ذهباً أكثر.' },
      tooGoldy: { title: 'ذهب زائد', body: 'عملتك قريبة من "الستاتير" الخالص.' },
      kroisosPure: { title: 'ستاتير كروسوس ★', body: 'إصلاح كروسوس النقدي!' },
      kroisosSilver: { title: 'سيغلوس كروسوس', body: 'السيغلوس الفضي لكروسوس.' },
      kroisosMismatch: { title: 'مشكلة خلط', body: 'ختم كروسوس يتطلب معدناً خالصاً.' },
    },
  },
};
