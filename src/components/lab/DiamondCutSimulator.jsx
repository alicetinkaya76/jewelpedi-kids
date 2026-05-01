import { useState, useEffect, useMemo } from 'react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { Sparkles, Target, RotateCcw, Info } from 'lucide-react';

/*
 * Diamond Cut Simulator — Faz 3.
 *
 * Kullanıcı 4 parametreyi kontrol eder:
 *  - Table (%): pırlantanın üst yüzeyinin çapa oranı (50-70)
 *  - Crown angle (°): taç açısı (25-42)
 *  - Pavilion angle (°): kaide açısı (38-45)
 *  - Depth (%): yüksekliğin çapa oranı (55-66)
 *
 * "Tolkowsky İdeal" referans noktası:
 *   Table 57.5%, Crown 34.5°, Pavilion 40.75°, Depth 59.5%
 *
 * Basitleştirilmiş fizik modeli:
 * Elmasın kritik açısı 24.4° (sin θc = 1/n, n_diamond = 2.417).
 * Pavilion açısı < 39°: ışık pavilion'dan kaçar (alt sızıntı) → donuk
 * Pavilion açısı > 43°: ışık yanlardan kaçar (fisheye) → parlamaz
 * 40-42° arası: TIR ile iki kez yansıyıp üstten çıkar → parlak
 *
 * Skoru hesaplarken:
 *   - Pavilion ideal (40.5-41.5°) → 50 puan
 *   - Crown ideal (32-36°) → 25 puan
 *   - Table ideal (54-59%) → 15 puan
 *   - Depth ideal (57-62%) → 10 puan
 * Uç noktalara gittikçe her faktör Gaussian ile sönümlenir.
 */

const IDEAL = {
  table: 57.5,
  crown: 34.5,
  pavilion: 40.75,
  depth: 59.5,
};

/** Gaussian falloff: 1.0 at ideal, decays smoothly. */
function gauss(x, ideal, sigma) {
  return Math.exp(-Math.pow((x - ideal) / sigma, 2));
}

function computeScore({ table, crown, pavilion, depth }) {
  const pScore = gauss(pavilion, IDEAL.pavilion, 1.5) * 50; // weight 50
  const cScore = gauss(crown, IDEAL.crown, 3) * 25;         // weight 25
  const tScore = gauss(table, IDEAL.table, 4) * 15;         // weight 15
  const dScore = gauss(depth, IDEAL.depth, 3) * 10;         // weight 10
  return Math.round(pScore + cScore + tScore + dScore);
}

function gradeFromScore(score) {
  if (score >= 90) return { grade: 'ideal', color: '#16a085' };
  if (score >= 75) return { grade: 'excellent', color: '#27ae60' };
  if (score >= 55) return { grade: 'good', color: '#f39c12' };
  if (score >= 35) return { grade: 'fair', color: '#e67e22' };
  return { grade: 'poor', color: '#c0392b' };
}

export default function DiamondCutSimulator() {
  const { locale } = useLocale();
  const { completeLab } = useProgress();

  const [table, setTable] = useState(57.5);
  const [crown, setCrown] = useState(34.5);
  const [pavilion, setPavilion] = useState(40.75);
  const [depth, setDepth] = useState(59.5);

  useEffect(() => {
    completeLab('light');
  }, [completeLab]);

  const score = useMemo(
    () => computeScore({ table, crown, pavilion, depth }),
    [table, crown, pavilion, depth],
  );
  const { grade, color } = gradeFromScore(score);

  const L = strings[locale] || strings.tr;

  const snapToIdeal = () => {
    setTable(IDEAL.table);
    setCrown(IDEAL.crown);
    setPavilion(IDEAL.pavilion);
    setDepth(IDEAL.depth);
  };

  const reset = () => {
    setTable(57.5);
    setCrown(34.5);
    setPavilion(40.75);
    setDepth(59.5);
  };

  return (
    <div>
      {/* Header row */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-ink mb-1">
            {L.title}
          </h3>
          <p className="text-sm text-ink/60 max-w-lg">{L.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={snapToIdeal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-cream text-xs font-extrabold uppercase tracking-wider hover:bg-ink/85"
          >
            <Target size={14} />
            {L.ideal}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-ink/15 text-ink text-xs font-extrabold uppercase tracking-wider hover:border-ink/40"
          >
            <RotateCcw size={14} />
            {L.reset}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* LEFT: SVG visualization */}
        <DiamondVisualization
          table={table}
          crown={crown}
          pavilion={pavilion}
          depth={depth}
          score={score}
          color={color}
          L={L}
        />

        {/* RIGHT: controls + score */}
        <div className="space-y-5">
          <ScoreDisplay score={score} grade={grade} color={color} L={L} />

          <Slider
            label={L.table}
            unit="%"
            min={50} max={70} step={0.5}
            value={table}
            ideal={IDEAL.table}
            onChange={setTable}
          />
          <Slider
            label={L.crown}
            unit="°"
            min={25} max={42} step={0.25}
            value={crown}
            ideal={IDEAL.crown}
            onChange={setCrown}
          />
          <Slider
            label={L.pavilion}
            unit="°"
            min={38} max={45} step={0.25}
            value={pavilion}
            ideal={IDEAL.pavilion}
            onChange={setPavilion}
          />
          <Slider
            label={L.depth}
            unit="%"
            min={55} max={66} step={0.5}
            value={depth}
            ideal={IDEAL.depth}
            onChange={setDepth}
          />
        </div>
      </div>

      {/* Feedback panel */}
      <FeedbackPanel
        table={table} crown={crown} pavilion={pavilion} depth={depth}
        L={L}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Visualization — side view cross-section with light rays
   ══════════════════════════════════════════════════════════ */
function DiamondVisualization({ table, crown, pavilion, depth, score, color, L }) {
  // SVG viewBox: 400 wide, 400 tall. Diamond centered at (200, 180).
  // Girdle (widest) at y=180, radius = 100px.
  const cx = 200;
  const girdleY = 180;
  const halfWidth = 100;

  // Table half-width (top flat surface)
  const tableHalfW = (table / 100) * halfWidth;

  // Crown height: crown angle gives vertical drop from table edge to girdle
  // halfWidth - tableHalfW = horizontal run of crown facet
  // crownHeight = (halfWidth - tableHalfW) * tan(crownAngle)
  const crownRun = halfWidth - tableHalfW;
  const crownH = crownRun * Math.tan((crown * Math.PI) / 180);

  // Pavilion: runs from girdle to culet (bottom point)
  // pavilionHeight = halfWidth * tan(pavilionAngle)
  const pavilionH = halfWidth * Math.tan((pavilion * Math.PI) / 180);

  const tableY = girdleY - crownH;
  const culetY = girdleY + pavilionH;

  // Light rays: 5 parallel rays entering from above
  const rayCount = 5;
  const rayXs = Array.from({ length: rayCount }, (_, i) =>
    cx - tableHalfW * 0.8 + (i * tableHalfW * 1.6) / (rayCount - 1),
  );

  // Classify each ray's outcome
  const rayOutcomes = rayXs.map((x) =>
    traceRay(x, table, crown, pavilion, depth, cx, girdleY, halfWidth, tableY, culetY),
  );

  // Overall sparkle intensity based on score
  const sparkleOpacity = score / 100;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 border border-ink/10 relative overflow-hidden">
      {/* Ambient sparkles behind */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              opacity: sparkleOpacity * (0.3 + Math.random() * 0.4),
              animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-auto max-w-md mx-auto relative">
        {/* Top light source label */}
        <text x={200} y={18} textAnchor="middle"
              fill="#6b7280" fontSize="11" fontWeight="700"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {L.lightSource}
        </text>

        {/* Incoming parallel light rays above the crown */}
        {rayXs.map((x, i) => (
          <line
            key={`in-${i}`}
            x1={x} y1={30}
            x2={x} y2={tableY - 2}
            stroke="#f7c948"
            strokeWidth={2}
            opacity={0.7}
            strokeLinecap="round"
          />
        ))}

        {/* Internal rays (computed outcomes) */}
        {rayOutcomes.map((path, i) => (
          <g key={`ray-${i}`}>
            {path.segments.map((seg, j) => (
              <line
                key={j}
                x1={seg.x1} y1={seg.y1}
                x2={seg.x2} y2={seg.y2}
                stroke={path.color}
                strokeWidth={2}
                opacity={path.opacity}
                strokeLinecap="round"
                strokeDasharray={path.escape ? '3 3' : undefined}
              />
            ))}
            {/* Marker where ray exits */}
            {path.escape && (
              <circle
                cx={path.segments[path.segments.length - 1].x2}
                cy={path.segments[path.segments.length - 1].y2}
                r={3}
                fill={path.color}
                opacity={0.9}
              />
            )}
          </g>
        ))}

        {/* Diamond outline */}
        <polygon
          points={`
            ${cx - tableHalfW},${tableY}
            ${cx + tableHalfW},${tableY}
            ${cx + halfWidth},${girdleY}
            ${cx},${culetY}
            ${cx - halfWidth},${girdleY}
          `}
          fill="url(#diamondGradient)"
          fillOpacity={0.35}
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* Girdle reference line */}
        <line
          x1={cx - halfWidth - 20} y1={girdleY}
          x2={cx + halfWidth + 20} y2={girdleY}
          stroke="#9ca3af"
          strokeWidth={1}
          strokeDasharray="2 3"
          opacity={0.5}
        />
        <text x={cx + halfWidth + 24} y={girdleY + 4}
              fill="#6b7280" fontSize="10" fontWeight="600">
          {L.girdle}
        </text>

        {/* Angle labels */}
        <text x={cx - halfWidth - 8} y={tableY - 4}
              textAnchor="end" fill="#6b7280" fontSize="10" fontWeight="600">
          {table.toFixed(0)}%
        </text>
        <text x={cx + halfWidth + 6} y={(tableY + girdleY) / 2 + 3}
              fill="#6b7280" fontSize="10" fontWeight="600">
          {crown.toFixed(1)}°
        </text>
        <text x={cx + halfWidth + 6} y={(girdleY + culetY) / 2 + 3}
              fill="#6b7280" fontSize="10" fontWeight="600">
          {pavilion.toFixed(1)}°
        </text>

        <defs>
          <linearGradient id="diamondGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs font-bold">
        <LegendItem color="#16a085" label={L.returnLight} />
        <LegendItem color="#c0392b" label={L.leakageBottom} dashed />
        <LegendItem color="#e67e22" label={L.leakageSide} dashed />
      </div>
    </div>
  );
}

function LegendItem({ color, label, dashed }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink/70">
      <svg width={22} height={10}>
        <line x1={1} y1={5} x2={21} y2={5}
              stroke={color} strokeWidth={2.5} strokeLinecap="round"
              strokeDasharray={dashed ? '3 3' : undefined} />
      </svg>
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   Simplified ray tracing — approximate single-ray outcome
   ══════════════════════════════════════════════════════════ */
function traceRay(xIn, table, crown, pavilion, depth, cx, girdleY, halfWidth, tableY, culetY) {
  // Enters straight down through the table
  // Approximate: pavilion dictates behavior
  // - pavilion < 39°: ray reaches pavilion at shallow angle, refracts out bottom (leakage)
  // - pavilion 39-43°: total internal reflection, bounces to other pavilion, exits crown
  // - pavilion > 43°: refracts out side (fisheye / side leakage)

  const yHit1 = culetY - (Math.abs(xIn - cx) / halfWidth) * (culetY - girdleY);
  const segments = [];
  let escape = false;
  let color = '#f7c948';
  let opacity = 0.85;

  // Entry ray: from table surface down to pavilion
  segments.push({ x1: xIn, y1: tableY, x2: xIn, y2: yHit1 });

  if (pavilion < 39) {
    // Leakage through pavilion (bottom escape)
    escape = true;
    color = '#c0392b';
    opacity = 0.55;
    // Ray continues straight down through diamond culet
    segments.push({ x1: xIn, y1: yHit1, x2: xIn, y2: culetY + 40 });
  } else if (pavilion > 43) {
    // Side leakage — ray reflects too steeply, exits side
    escape = true;
    color = '#e67e22';
    opacity = 0.6;
    // Ray bounces to opposite pavilion then exits through girdle
    const xAcross = cx - (xIn - cx);
    const yAcross = culetY - (Math.abs(xAcross - cx) / halfWidth) * (culetY - girdleY);
    segments.push({ x1: xIn, y1: yHit1, x2: xAcross, y2: yAcross });
    const xExit = xAcross + (xAcross - cx) * 0.4;
    segments.push({ x1: xAcross, y1: yAcross, x2: xExit, y2: girdleY + 10 });
  } else {
    // Good cut — TIR bounces, exits through crown
    color = '#16a085';
    opacity = 0.9;
    const xAcross = cx - (xIn - cx);
    const yAcross = culetY - (Math.abs(xAcross - cx) / halfWidth) * (culetY - girdleY);
    segments.push({ x1: xIn, y1: yHit1, x2: xAcross, y2: yAcross });
    // Exit upward through crown
    segments.push({ x1: xAcross, y1: yAcross, x2: xAcross, y2: tableY + 5 });
    segments.push({ x1: xAcross, y1: tableY + 5, x2: xAcross - (xIn - cx) * 0.3, y2: 30 });
  }

  return { segments, color, opacity, escape };
}

/* ══════════════════════════════════════════════════════════
   Score display
   ══════════════════════════════════════════════════════════ */
function ScoreDisplay({ score, grade, color, L }) {
  return (
    <div
      className="rounded-2xl p-5 border-2 text-center relative overflow-hidden"
      style={{
        borderColor: color,
        background: `color-mix(in srgb, ${color} 8%, white)`,
      }}
    >
      <Sparkles
        size={18}
        className="absolute top-3 right-3 opacity-50"
        style={{ color }}
      />
      <div className="text-[10px] uppercase tracking-widest font-extrabold" style={{ color }}>
        {L.brilliance}
      </div>
      <div className="font-display text-stat-number text-6xl mt-1" style={{ color }}>
        {score}
      </div>
      <div className="text-[10px] text-ink/50 font-bold uppercase tracking-wider mt-0.5">
        / 100
      </div>
      <div
        className="mt-3 inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-extrabold text-white"
        style={{ background: color }}
      >
        {L.grades[grade]}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Slider with ideal marker
   ══════════════════════════════════════════════════════════ */
function Slider({ label, unit, min, max, step, value, ideal, onChange }) {
  const isIdeal = Math.abs(value - ideal) < (step * 2);
  const idealPct = ((ideal - min) / (max - min)) * 100;

  return (
    <div>
      <label className="flex justify-between text-sm font-bold text-ink/70 mb-1.5">
        <span className="uppercase tracking-wide text-xs">{label}</span>
        <span className="font-display text-ink tabular-nums">
          {value.toFixed(1)}{unit}
          {isIdeal && (
            <span className="ml-1.5 text-xs font-extrabold text-emerald-600">✓</span>
          )}
        </span>
      </label>
      <div className="relative">
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-diamond"
        />
        {/* Ideal marker tick */}
        <div
          className="absolute -top-0.5 w-0.5 h-2 bg-emerald-500 pointer-events-none"
          style={{ left: `calc(${idealPct}% - 1px)` }}
          aria-hidden="true"
        />
      </div>
      <div className="flex justify-between text-[10px] text-ink/40 font-bold mt-0.5">
        <span>{min}{unit}</span>
        <span className="text-emerald-600">{ideal.toFixed(1)}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Feedback — written advice based on current settings
   ══════════════════════════════════════════════════════════ */
function FeedbackPanel({ table, crown, pavilion, depth, L }) {
  const issues = [];

  if (pavilion < 39)
    issues.push(L.feedback.pavilionShallow);
  else if (pavilion > 43)
    issues.push(L.feedback.pavilionDeep);

  if (crown < 30)
    issues.push(L.feedback.crownShallow);
  else if (crown > 37)
    issues.push(L.feedback.crownSteep);

  if (table < 54)
    issues.push(L.feedback.tableSmall);
  else if (table > 60)
    issues.push(L.feedback.tableLarge);

  if (issues.length === 0) {
    return (
      <div className="mt-6 rounded-2xl p-4 bg-emerald-50 border-2 border-emerald-200 flex items-start gap-3">
        <Sparkles size={18} className="text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <div className="font-extrabold text-emerald-900 text-sm mb-0.5">
            {L.feedback.greatTitle}
          </div>
          <div className="text-sm text-emerald-800">
            {L.feedback.greatBody}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl p-4 bg-amber-50 border-2 border-amber-200">
      <div className="flex items-center gap-2 mb-2">
        <Info size={16} className="text-amber-700" />
        <span className="font-extrabold text-amber-900 text-sm">
          {L.feedback.tipsTitle}
        </span>
      </div>
      <ul className="space-y-1 text-sm text-amber-900">
        {issues.map((msg, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-amber-600">→</span>
            <span>{msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   i18n strings
   ══════════════════════════════════════════════════════════ */
const strings = {
  tr: {
    title: 'Pırlanta Kesim Simülatörü',
    subtitle: 'Dört açıyı oynayarak ışığın içeriden nasıl geri döndüğünü ya da kaçtığını gör. Tolkowsky\'nin 1919\'da hesapladığı ideal noktayı bulabilir misin?',
    ideal: 'Tolkowsky İdeal',
    reset: 'Sıfırla',
    table: 'Table (tabla)',
    crown: 'Crown Açısı',
    pavilion: 'Pavilion Açısı',
    depth: 'Depth (derinlik)',
    brilliance: 'Parlaklık',
    girdle: 'Girdle',
    lightSource: 'Işık Kaynağı',
    returnLight: 'Üstten geri dönen ışık',
    leakageBottom: 'Alt sızıntı',
    leakageSide: 'Yan sızıntı',
    grades: {
      ideal: 'İdeal ★',
      excellent: 'Mükemmel',
      good: 'İyi',
      fair: 'Orta',
      poor: 'Zayıf',
    },
    feedback: {
      greatTitle: 'Harika kesim!',
      greatBody: 'Işık üsten giriyor, iki kez yansıyıp yine üstten "parlayarak" çıkıyor. Bu "toplam iç yansıma" — pırlantanın sihri.',
      tipsTitle: 'İpuçları',
      pavilionShallow: 'Pavilion açısı çok düşük — ışık dibe kaçıyor, taş donuk görünecek ("fish eye" etkisi).',
      pavilionDeep: 'Pavilion açısı çok yüksek — ışık yanlardan kaçıyor, taş koyu görünecek ("nail head" etkisi).',
      crownShallow: 'Crown açısı çok düşük — taç fazla düz, ışık dağıtamıyor.',
      crownSteep: 'Crown açısı çok dik — ışığın yolu değişiyor, kenar sızıntıları artıyor.',
      tableSmall: 'Table çok küçük — ışık girmek için yeterince alan yok.',
      tableLarge: 'Table çok büyük — taç yüzeyleri azalıyor, ateş (dispersion) düşüyor.',
    },
  },
  en: {
    title: 'Diamond Cut Simulator',
    subtitle: 'Adjust four angles to see how light returns through the crown — or leaks away. Can you find the ideal point Tolkowsky calculated in 1919?',
    ideal: 'Tolkowsky Ideal',
    reset: 'Reset',
    table: 'Table',
    crown: 'Crown Angle',
    pavilion: 'Pavilion Angle',
    depth: 'Depth',
    brilliance: 'Brilliance',
    girdle: 'Girdle',
    lightSource: 'Light Source',
    returnLight: 'Light returning through crown',
    leakageBottom: 'Bottom leakage',
    leakageSide: 'Side leakage',
    grades: {
      ideal: 'Ideal ★',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
    },
    feedback: {
      greatTitle: 'Beautiful cut!',
      greatBody: 'Light enters the top, bounces twice via total internal reflection, and exits sparkling through the crown. This is the magic of a diamond.',
      tipsTitle: 'Tips',
      pavilionShallow: 'Pavilion too shallow — light leaks through the bottom, the stone looks dull ("fish-eye" effect).',
      pavilionDeep: 'Pavilion too deep — light escapes through the sides, the stone looks dark ("nail-head" effect).',
      crownShallow: 'Crown too shallow — the top is too flat, light scatters poorly.',
      crownSteep: 'Crown too steep — light path shifts, side leakages grow.',
      tableSmall: 'Table too small — not enough opening for light to enter.',
      tableLarge: 'Table too large — fewer crown facets, less fire (dispersion).',
    },
  },
  ar: {
    title: 'محاكي قطع الماس',
    subtitle: 'عدّل أربع زوايا لترى كيف يعود الضوء أو يتسرّب. هل تجد الزاوية المثالية التي حسبها تولكوفسكي عام 1919؟',
    ideal: 'مثالي (تولكوفسكي)',
    reset: 'إعادة',
    table: 'الطاولة',
    crown: 'زاوية التاج',
    pavilion: 'زاوية القاعدة',
    depth: 'العمق',
    brilliance: 'اللمعان',
    girdle: 'الحزام',
    lightSource: 'مصدر الضوء',
    returnLight: 'ضوء يعود من التاج',
    leakageBottom: 'تسرب سفلي',
    leakageSide: 'تسرب جانبي',
    grades: {
      ideal: 'مثالي ★',
      excellent: 'ممتاز',
      good: 'جيد',
      fair: 'متوسط',
      poor: 'ضعيف',
    },
    feedback: {
      greatTitle: 'قطع رائع!',
      greatBody: 'الضوء يدخل من الأعلى، ينعكس داخلياً مرتين، ويخرج لامعاً — هذا سحر الماسة.',
      tipsTitle: 'نصائح',
      pavilionShallow: 'القاعدة ضحلة جداً — الضوء يتسرب.',
      pavilionDeep: 'القاعدة عميقة — يفقد الماس بريقه.',
      crownShallow: 'التاج مسطح.',
      crownSteep: 'التاج شديد الانحدار.',
      tableSmall: 'الطاولة صغيرة.',
      tableLarge: 'الطاولة كبيرة.',
    },
  },
};
