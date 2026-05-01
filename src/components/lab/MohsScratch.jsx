import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useSound } from '../../audio/SoundContext.jsx';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';

/*
 * MohsScratch — Faz 3 upgrade.
 *
 * Lab bench with two mineral slots (A and B). User picks a mineral from
 * the palette at bottom, clicks a slot to place it, presses "Scratch!"
 * The softer mineral gets a visible diagonal scratch mark + sound.
 *
 * Progress: each unique pair tested unlocks stars on the Mohs ladder.
 * Test all 10 Mohs tiers → "Mineralog" badge celebration.
 */

const minerals = [
  { id: 'talc',        mohs: 1,   color: '#e5e7eb', family: 'mineral',
    name: { tr: 'Talk', en: 'Talc', ar: 'تلك' } },
  { id: 'gypsum',      mohs: 2,   color: '#f1f5f9', family: 'mineral',
    name: { tr: 'Jips', en: 'Gypsum', ar: 'جبس' } },
  { id: 'fingernail',  mohs: 2.5, color: '#fde3c7', family: 'tool',
    name: { tr: 'Tırnak', en: 'Fingernail', ar: 'ظفر' } },
  { id: 'copper',      mohs: 3,   color: '#d97706', family: 'tool',
    name: { tr: 'Bakır Para', en: 'Copper Coin', ar: 'عملة نحاسية' } },
  { id: 'calcite',     mohs: 3,   color: '#fdfaf3', family: 'mineral',
    name: { tr: 'Kalsit', en: 'Calcite', ar: 'كالسيت' } },
  { id: 'fluorite',    mohs: 4,   color: '#c084fc', family: 'mineral',
    name: { tr: 'Florit', en: 'Fluorite', ar: 'فلوريت' } },
  { id: 'iron-nail',   mohs: 4.5, color: '#64748b', family: 'tool',
    name: { tr: 'Demir Çivi', en: 'Iron Nail', ar: 'مسمار' } },
  { id: 'apatite',     mohs: 5,   color: '#38bdf8', family: 'mineral',
    name: { tr: 'Apatit', en: 'Apatite', ar: 'أباتيت' } },
  { id: 'glass',       mohs: 5.5, color: '#dbeafe', family: 'tool',
    name: { tr: 'Cam', en: 'Glass', ar: 'زجاج' } },
  { id: 'feldspar',    mohs: 6,   color: '#fbbf24', family: 'mineral',
    name: { tr: 'Feldspat', en: 'Feldspar', ar: 'فلسبار' } },
  { id: 'steel',       mohs: 6.5, color: '#475569', family: 'tool',
    name: { tr: 'Çelik Bıçak', en: 'Steel Knife', ar: 'سكين فولاذي' } },
  { id: 'quartz',      mohs: 7,   color: '#f3e8ff', family: 'mineral',
    name: { tr: 'Kuvars', en: 'Quartz', ar: 'كوارتز' } },
  { id: 'emerald',     mohs: 7.5, color: '#16a34a', family: 'gem',
    name: { tr: 'Zümrüt', en: 'Emerald', ar: 'زمرد' } },
  { id: 'topaz',       mohs: 8,   color: '#fb923c', family: 'gem',
    name: { tr: 'Topaz', en: 'Topaz', ar: 'توباز' } },
  { id: 'ruby',        mohs: 9,   color: '#dc2626', family: 'gem',
    name: { tr: 'Yakut', en: 'Ruby', ar: 'ياقوت' } },
  { id: 'sapphire',    mohs: 9,   color: '#2563eb', family: 'gem',
    name: { tr: 'Safir', en: 'Sapphire', ar: 'صفير' } },
  { id: 'diamond',     mohs: 10,  color: '#bfdbfe', family: 'gem',
    name: { tr: 'Elmas', en: 'Elmas', ar: 'ماس' } },
];

export default function MohsScratch() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();
  const { play } = useSound();

  const [slotA, setSlotA] = useState('glass');
  const [slotB, setSlotB] = useState('quartz');
  const [activeSlot, setActiveSlot] = useState('A');
  const [result, setResult] = useState(null); // { winnerId, loserId, tie }
  const [animating, setAnimating] = useState(false);
  const [testedPairs, setTestedPairs] = useState(new Set());

  useEffect(() => {
    completeLab('mohs');
  }, [completeLab]);

  const L = strings[locale] || strings.tr;

  const mA = minerals.find((m) => m.id === slotA);
  const mB = minerals.find((m) => m.id === slotB);

  const placeMineral = (id) => {
    if (animating) return;
    if (activeSlot === 'A') {
      setSlotA(id);
      setActiveSlot('B');
    } else {
      setSlotB(id);
      setActiveSlot('A');
    }
    setResult(null);
  };

  const doScratch = () => {
    if (!mA || !mB || animating) return;
    play?.('click');
    setAnimating(true);
    setResult(null);

    setTimeout(() => {
      let outcome;
      if (mA.mohs > mB.mohs) outcome = { winnerId: mA.id, loserId: mB.id };
      else if (mB.mohs > mA.mohs) outcome = { winnerId: mB.id, loserId: mA.id };
      else outcome = { tie: true, winnerId: mA.id, loserId: mB.id };

      setResult(outcome);
      setAnimating(false);

      // Track tested pair
      const key = [slotA, slotB].sort().join('+');
      setTestedPairs((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });

      play?.(outcome.tie ? 'click' : 'reveal');
    }, 900);
  };

  const reset = () => {
    setSlotA('glass');
    setSlotB('quartz');
    setActiveSlot('A');
    setResult(null);
  };

  // Tier progress (which Mohs integers have been included in any test)
  const tiersReached = useMemo(() => {
    const tiers = new Set();
    testedPairs.forEach((pair) => {
      pair.split('+').forEach((id) => {
        const m = minerals.find((mm) => mm.id === id);
        if (m) tiers.add(Math.floor(m.mohs));
      });
    });
    return tiers;
  }, [testedPairs]);

  const allTiers = tiersReached.size >= 10;

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-ink mb-1">
            {L.title}
          </h3>
          <p className="text-sm text-ink/60 max-w-lg">{L.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-ink/15 text-ink text-xs font-extrabold uppercase tracking-wider hover:border-ink/40"
        >
          <RotateCcw size={14} />
          {L.reset}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
        {/* LEFT: Bench + palette */}
        <div>
          <LabBench
            mA={mA} mB={mB}
            activeSlot={activeSlot} setActiveSlot={setActiveSlot}
            animating={animating}
            result={result}
            onScratch={doScratch}
            L={L}
            locale={locale}
          />

          {/* Palette */}
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-widest font-extrabold text-ink/50 mb-2">
              {L.palette}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {minerals.map((m) => (
                <MineralTile
                  key={m.id}
                  mineral={m}
                  locale={locale}
                  isActive={m.id === slotA || m.id === slotB}
                  onClick={() => placeMineral(m.id)}
                  disabled={animating}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Mohs ladder */}
        <MohsLadder
          tiersReached={tiersReached}
          locale={locale}
          L={L}
          allTiers={allTiers}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LabBench — two mineral slots + scratch button
   ══════════════════════════════════════════════════════════ */
function LabBench({ mA, mB, activeSlot, setActiveSlot, animating, result, onScratch, L, locale }) {
  const canScratch = mA && mB && !animating;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-ink/10 p-6 shadow-museum">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <Slot
          mineral={mA}
          label="A"
          isActive={activeSlot === 'A'}
          onClick={() => setActiveSlot('A')}
          animating={animating}
          isScratched={result && !result.tie && result.loserId === mA?.id}
          locale={locale}
        />

        {/* Center: scratch button */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={onScratch}
            disabled={!canScratch}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-xs font-extrabold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink/85 mb-2"
          >
            <Sparkles size={14} />
            {L.scratch}
          </button>
          {animating && (
            <div className="text-[10px] text-ink/50 font-bold uppercase tracking-wider animate-pulse">
              {L.testing}
            </div>
          )}
        </div>

        <Slot
          mineral={mB}
          label="B"
          isActive={activeSlot === 'B'}
          onClick={() => setActiveSlot('B')}
          animating={animating}
          isScratched={result && !result.tie && result.loserId === mB?.id}
          locale={locale}
        />
      </div>

      {/* Result message */}
      {result && !animating && (
        <ResultMessage result={result} mA={mA} mB={mB} L={L} locale={locale} />
      )}
    </div>
  );
}

function Slot({ mineral, label, isActive, onClick, animating, isScratched, locale }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-square rounded-3xl border-4 transition-all overflow-hidden ${
        isActive
          ? 'border-amber-400 bg-amber-50 scale-[1.02]'
          : 'border-ink/15 bg-white hover:border-ink/30'
      }`}
      aria-label={`Slot ${label}`}
    >
      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-widest font-extrabold text-ink/40">
        {label}
      </span>
      {mineral ? (
        <div className="absolute inset-4 rounded-2xl flex flex-col items-center justify-center"
             style={{
               background: `radial-gradient(circle at 35% 30%, ${lighten(mineral.color, 0.35)}, ${mineral.color} 60%, ${darken(mineral.color, 0.15)})`,
               boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(0,0,0,0.15)',
             }}
        >
          <div className="font-display font-extrabold text-ink text-sm drop-shadow-sm text-center px-2 leading-tight">
            {mineral.name[locale] || mineral.name.tr}
          </div>
          <div className="text-[10px] font-bold text-ink/70 mt-0.5">
            Mohs {mineral.mohs}
          </div>

          {/* Scratch mark */}
          {isScratched && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100" preserveAspectRatio="none"
            >
              <line
                x1="15" y1="25" x2="85" y2="75"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.9))',
                  strokeDasharray: 100,
                  strokeDashoffset: 100,
                  animation: 'scratchIn 0.6s ease-out forwards',
                }}
              />
              <line
                x1="18" y1="22" x2="78" y2="72"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="1"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: 100,
                  animation: 'scratchIn 0.6s ease-out forwards 0.05s',
                }}
              />
            </svg>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-ink/30 text-xs uppercase font-bold tracking-widest">
          {isActive ? '← select →' : '—'}
        </div>
      )}

      <style>{`
        @keyframes scratchIn {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </button>
  );
}

function MineralTile({ mineral, locale, isActive, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative rounded-xl p-2 border-2 transition text-left ${
        isActive
          ? 'border-amber-400 shadow-sm scale-[1.02]'
          : 'border-ink/10 hover:border-ink/30'
      } disabled:opacity-40 disabled:cursor-not-allowed`}
      style={{
        background: `linear-gradient(135deg, ${lighten(mineral.color, 0.35)}, ${mineral.color})`,
      }}
    >
      <div className="font-display font-extrabold text-ink text-xs leading-tight drop-shadow-sm">
        {mineral.name[locale] || mineral.name.tr}
      </div>
      <div className="text-[10px] font-bold text-ink/60 mt-0.5">
        {mineral.mohs}
      </div>
    </button>
  );
}

function ResultMessage({ result, mA, mB, L, locale }) {
  if (result.tie) {
    return (
      <div className="mt-4 rounded-xl bg-white border-2 border-ink/10 p-3 text-center">
        <div className="text-sm font-bold text-ink/70">
          {L.tie.replace('{mohs}', mA.mohs)}
        </div>
      </div>
    );
  }
  const winner = minerals.find((m) => m.id === result.winnerId);
  const loser = minerals.find((m) => m.id === result.loserId);
  return (
    <div
      className="mt-4 rounded-xl border-2 p-3 text-sm text-center"
      style={{
        background: 'color-mix(in srgb, #16a085 8%, white)',
        borderColor: 'color-mix(in srgb, #16a085 30%, transparent)',
      }}
    >
      <span className="font-extrabold text-emerald-800">
        {winner.name[locale] || winner.name.tr}
      </span>{' '}
      <span className="text-ink/60 text-xs">(Mohs {winner.mohs})</span>
      <span className="text-ink/50 mx-2">→</span>
      <span className="font-bold text-ink/80">
        {L.scratches} {loser.name[locale] || loser.name.tr}
      </span>{' '}
      <span className="text-ink/60 text-xs">(Mohs {loser.mohs})</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MohsLadder — vertical progress bar showing unlocked tiers
   ══════════════════════════════════════════════════════════ */
function MohsLadder({ tiersReached, locale, L, allTiers }) {
  const tiers = [
    { m: 10, ex: minerals.find((x) => x.id === 'diamond') },
    { m: 9,  ex: minerals.find((x) => x.id === 'ruby') },
    { m: 8,  ex: minerals.find((x) => x.id === 'topaz') },
    { m: 7,  ex: minerals.find((x) => x.id === 'quartz') },
    { m: 6,  ex: minerals.find((x) => x.id === 'feldspar') },
    { m: 5,  ex: minerals.find((x) => x.id === 'apatite') },
    { m: 4,  ex: minerals.find((x) => x.id === 'fluorite') },
    { m: 3,  ex: minerals.find((x) => x.id === 'calcite') },
    { m: 2,  ex: minerals.find((x) => x.id === 'gypsum') },
    { m: 1,  ex: minerals.find((x) => x.id === 'talc') },
  ];

  return (
    <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-museum">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-extrabold text-ink text-sm">
          {L.ladder}
        </h4>
        <div className="text-[10px] font-bold text-ink/50 tabular-nums">
          {tiersReached.size}/10
        </div>
      </div>

      <div className="space-y-1.5">
        {tiers.map(({ m, ex }) => {
          const unlocked = tiersReached.has(m);
          return (
            <div
              key={m}
              className={`flex items-center gap-2 rounded-lg p-1.5 transition ${
                unlocked ? '' : 'opacity-40 grayscale'
              }`}
              style={{
                background: unlocked
                  ? `color-mix(in srgb, ${ex.color} 18%, white)`
                  : 'transparent',
              }}
            >
              <span className="text-stat-number text-lg tabular-nums w-7 text-center text-ink">
                {m}
              </span>
              <span
                className="w-5 h-5 rounded-md shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${lighten(ex.color, 0.3)}, ${ex.color})`,
                  boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.5)',
                }}
              />
              <span className="font-bold text-xs text-ink/70 truncate">
                {ex.name[locale] || ex.name.tr}
              </span>
              {unlocked && (
                <span className="ml-auto text-[10px] font-extrabold text-emerald-600">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      {allTiers && (
        <div className="mt-4 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white p-3 text-center animate-fadeUp">
          <Trophy size={18} className="mx-auto mb-1" />
          <div className="text-[10px] uppercase tracking-widest font-extrabold opacity-90">
            {L.badge}
          </div>
          <div className="font-display font-extrabold text-base">
            {L.mineralogistTitle}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Color helpers (local — duplicates LydiaMint's for independence)
   ══════════════════════════════════════════════════════════ */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3
    ? h.split('').map((c) => c + c).join('')
    : h, 16);
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff];
}
function rgbToHex(r, g, b) {
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
function lighten(hex, amount) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    Math.round(r + (255 - r) * amount),
    Math.round(g + (255 - g) * amount),
    Math.round(b + (255 - b) * amount),
  );
}
function darken(hex, amount) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    Math.round(r * (1 - amount)),
    Math.round(g * (1 - amount)),
    Math.round(b * (1 - amount)),
  );
}

/* ══════════════════════════════════════════════════════════
   i18n
   ══════════════════════════════════════════════════════════ */
const strings = {
  tr: {
    title: 'Mohs Çizim Laboratuvarı',
    subtitle: 'Paletten iki malzeme seç, tezgâha yerleştir, ve Çiz butonuna bas. Daha sert olan yumuşak olanı çizer.',
    reset: 'Temizle',
    palette: 'Malzeme Paleti',
    scratch: 'Çiz!',
    testing: 'Test ediliyor...',
    ladder: 'Mohs Merdiveni',
    scratches: 'çizer',
    tie: 'Aynı sertlikte — Mohs {mohs}. Hiçbiri diğerini çizemez.',
    badge: 'Rozet',
    mineralogistTitle: 'Mineraloji Ustası',
  },
  en: {
    title: 'Mohs Scratch Lab',
    subtitle: 'Pick two materials from the palette, place them on the bench, then press Scratch. The harder one scratches the softer.',
    reset: 'Clear',
    palette: 'Material Palette',
    scratch: 'Scratch!',
    testing: 'Testing...',
    ladder: 'Mohs Ladder',
    scratches: 'scratches',
    tie: 'Same hardness — Mohs {mohs}. Neither scratches the other.',
    badge: 'Badge',
    mineralogistTitle: 'Mineralogy Master',
  },
  ar: {
    title: 'مختبر خدش موس',
    subtitle: 'اختر مادتين من اللوحة وضعهما على الطاولة ثم اضغط "اخدش".',
    reset: 'مسح',
    palette: 'لوحة المواد',
    scratch: 'اخدش!',
    testing: 'جار الاختبار...',
    ladder: 'سلم موس',
    scratches: 'يخدش',
    tie: 'نفس الصلابة — موس {mohs}.',
    badge: 'شارة',
    mineralogistTitle: 'خبير معادن',
  },
};
