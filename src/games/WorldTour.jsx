import { useState, useRef, useMemo, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import { pick, cx } from '../utils/helpers.js';
import { worldOrigins } from '../data/worldOrigins.js';
import { MAP_WIDTH, MAP_HEIGHT, CONTINENTS } from '../data/worldMapSvg.js';
import {
  haversineKm, svgToLatLng, latLngToSvg, distanceToScore, WORLD_BBOX,
} from '../utils/geo.js';
import { ChevronRight, MapPin } from 'lucide-react';

/**
 * WorldTour — geography quiz: pin origins on a world map.
 *
 * Each round the game prompts with a stone/artifact. Player taps the map;
 * distance from the true origin (km, Haversine) determines points:
 *   < 500 km → 100p (bullseye)
 *   < 1000   → 70p
 *   < 2000   → 40p
 *   < 4000   → 20p
 *   ≥ 4000   → 10p
 *
 * 10 rounds per game. Difficulty controls:
 *   Çırak → continent hint shown above prompt
 *   Kalfa → no hint, full continent labels on map
 *   Usta  → no hint, continent labels removed
 *
 * Badge unlocks on Usta at 800+ total points.
 *
 * After each guess: red pin (your guess) + green pin (truth) + line between +
 * km distance + fact card. "Sıradaki" advances.
 */

const CONFIG = {
  cirak: { rounds: 10, showHint: true, showLabels: true, shufflePool: true },
  kalfa: { rounds: 10, showHint: false, showLabels: true, shufflePool: true },
  usta:  { rounds: 10, showHint: false, showLabels: false, shufflePool: true },
};

const BADGE_THRESHOLD = 800;

export default function WorldTour({ difficulty, accent, onFinish }) {
  const { locale } = useLocale();
  const { play } = useSound();
  const cfg = CONFIG[difficulty] || CONFIG.cirak;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  /* Build round order once per mount. */
  const rounds = useMemo(() => {
    const arr = [...worldOrigins];
    if (cfg.shufflePool) arr.sort(() => Math.random() - 0.5);
    return arr.slice(0, cfg.rounds);
  }, [cfg.rounds, cfg.shufflePool]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [guess, setGuess] = useState(null);     // { lat, lng } | null
  const [phase, setPhase] = useState('guessing');
  const [score, setScore] = useState(0);
  const [bullseyes, setBullseyes] = useState(0);
  const [history, setHistory] = useState([]);   // [{ km, points, prompt, place }]

  const svgRef = useRef(null);
  const cur = rounds[roundIdx];

  /* Tap map → SVG-local coord → lat/lng → set guess (does not submit). */
  const onMapClick = (evt) => {
    if (phase !== 'guessing') return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = (evt.clientX - rect.left) * (MAP_WIDTH / rect.width);
    const y = (evt.clientY - rect.top)  * (MAP_HEIGHT / rect.height);
    const ll = svgToLatLng({ x, y, width: MAP_WIDTH, height: MAP_HEIGHT }, WORLD_BBOX);
    setGuess(ll);
    play?.('click');
  };

  const submit = () => {
    if (!guess) return;
    const km = haversineKm(guess, { lat: cur.lat, lng: cur.lng });
    const { points, tier } = distanceToScore(km);
    setScore((s) => s + points);
    if (tier === 'bullseye') {
      setBullseyes((b) => b + 1);
      play?.('success');
    } else if (points <= 20) {
      play?.('error');
    } else {
      play?.('reveal');
    }
    setHistory((h) => [...h, { km, points, prompt: cur.prompt, place: cur.place }]);
    setPhase('reveal');
  };

  const advance = () => {
    if (roundIdx + 1 >= rounds.length) {
      finalize();
      return;
    }
    setRoundIdx((i) => i + 1);
    setGuess(null);
    setPhase('guessing');
  };

  const finalize = () => {
    const won = difficulty === 'usta' && score >= BADGE_THRESHOLD;
    onFinishRef.current({
      score,
      won,
      bestOf: rounds.length * 100,
      summary: {
        tr: `${bullseyes}/${rounds.length} tam isabet — ${Math.round((bullseyes / rounds.length) * 100)}% doğruluk.`,
        en: `${bullseyes}/${rounds.length} bullseyes — ${Math.round((bullseyes / rounds.length) * 100)}% accuracy.`,
        ar: `${bullseyes}/${rounds.length} إصابة مثالية.`,
      },
      blurb: {
        tr: 'Taşlar dünya üzerinde rastgele dağılmaz: her biri çok spesifik bir jeolojik koşulun ürünü. Lapis sadece Sar-i Sang\'da; opal %95 Avustralya\'da; Keşmir safirleri 1935\'ten beri tükenmiş sayıyor. Taşların hikâyesi — coğrafyanın hikâyesi!',
        en: 'Gems aren\'t randomly distributed. Each needs a specific geological setup: lapis only at Sar-i Sang; 95% of opal in Australia; Kashmir sapphires considered depleted since 1935. Geography is destiny.',
        ar: 'الأحجار ليست عشوائية التوزيع — كل منها يحتاج ظروفاً جيولوجية خاصة.',
      },
      breakdown: [
        { label: { tr: 'Tam isabet', en: 'Bullseyes', ar: 'إصابات مثالية' }, value: `${bullseyes}/${rounds.length}` },
        { label: { tr: 'Ortalama km', en: 'Avg km', ar: 'متوسط كم' }, value: Math.round(history.reduce((s, h) => s + h.km, 0) / Math.max(1, history.length)) },
        { label: { tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' }, value: { cirak: 'Çırak', kalfa: 'Kalfa', usta: 'Usta' }[difficulty] },
      ],
    });
  };

  if (!cur) {
    return <div className="text-center py-20 text-ink/60">…</div>;
  }

  /* Convert current guess / truth to SVG coords for rendering pins. */
  const guessPx  = guess ? latLngToSvg(guess, WORLD_BBOX, MAP_WIDTH, MAP_HEIGHT) : null;
  const truthPx  = latLngToSvg({ lat: cur.lat, lng: cur.lng }, WORLD_BBOX, MAP_WIDTH, MAP_HEIGHT);
  const lastResult = phase === 'reveal' && history.length > 0 ? history[history.length - 1] : null;

  return (
    <div className="space-y-3">
      <ScoreBoard
        score={score}
        accent={accent}
        extra={
          <span>
            {{ tr: 'Tur', en: 'Round', ar: 'جولة' }[locale]} {roundIdx + 1}/{rounds.length}
            {' · '}🎯 {bullseyes}
          </span>
        }
      />

      {/* Prompt card */}
      <div
        className="rounded-2xl bg-white border p-4"
        style={{ borderLeftWidth: 5, borderLeftColor: accent }}
      >
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/50">
          {{ tr: 'Bu nerede üretilir?', en: 'Where does this come from?', ar: 'من أين يأتي؟' }[locale]}
        </div>
        <div className="font-display text-xl font-extrabold text-ink mt-1">
          {pick(cur.prompt, locale)}
        </div>
        {cfg.showHint && (
          <div className="text-xs font-bold text-ink/60 mt-1">
            💡 {{ tr: 'İpucu', en: 'Hint', ar: 'تلميح' }[locale]}: {pick(cur.hintRegion, locale)}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-3xl overflow-hidden border border-ink/10 shadow-museum bg-sky-50">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          onClick={onMapClick}
          style={{ width: '100%', height: 'auto', display: 'block', cursor: phase === 'guessing' ? 'crosshair' : 'default' }}
          role="img"
          aria-label={{
            tr: 'Dünya haritası — bir noktaya tıkla',
            en: 'World map — click a point',
            ar: 'خريطة العالم — انقر نقطة',
          }[locale]}
        >
          {/* Ocean */}
          <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#cde4f4" />

          {/* Latitude guides */}
          {[0, 23.5, -23.5].map((lat) => {
            const y = latLngToSvg({ lat, lng: 0 }, WORLD_BBOX, MAP_WIDTH, MAP_HEIGHT).y;
            return (
              <line
                key={lat}
                x1="0" x2={MAP_WIDTH} y1={y} y2={y}
                stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="4 4"
                opacity="0.5"
              />
            );
          })}

          {/* Continents */}
          {CONTINENTS.map((c) => (
            <g key={c.id}>
              <path
                d={c.d}
                fill="#a3d9a5"
                stroke="#4b7c4b"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
          ))}

          {/* Continent labels (difficulty-dependent) */}
          {cfg.showLabels && CONTINENTS.filter((c) =>
            !['uk', 'madagascar'].includes(c.id),
          ).map((c) => {
            // Rough label position — centroid of path's bbox. Cheap estimate.
            const coords = c.d.match(/-?\d+\.?\d*/g)?.map(Number) || [];
            const xs = coords.filter((_, i) => i % 2 === 0);
            const ys = coords.filter((_, i) => i % 2 === 1);
            const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
            const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
            return (
              <text
                key={c.id}
                x={cx} y={cy}
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#1b2845"
                opacity="0.55"
                pointerEvents="none"
              >
                {pick(c.name, locale)}
              </text>
            );
          })}

          {/* Pending guess pin (not yet submitted) */}
          {phase === 'guessing' && guessPx && (
            <g transform={`translate(${guessPx.x} ${guessPx.y})`} pointerEvents="none">
              <circle r="8" fill="#c0392b" opacity="0.4" />
              <circle r="4" fill="#c0392b" />
            </g>
          )}

          {/* Reveal: guess pin + truth pin + line */}
          {phase === 'reveal' && guessPx && (
            <>
              <line
                x1={guessPx.x} y1={guessPx.y}
                x2={truthPx.x} y2={truthPx.y}
                stroke="#1b2845" strokeWidth="1.2" strokeDasharray="4 3"
                pointerEvents="none"
              />
              <g transform={`translate(${guessPx.x} ${guessPx.y})`} pointerEvents="none">
                <circle r="10" fill="#c0392b" opacity="0.3" />
                <circle r="5" fill="#c0392b" stroke="#fff" strokeWidth="1.5" />
              </g>
              <g transform={`translate(${truthPx.x} ${truthPx.y})`} pointerEvents="none">
                <circle r="12" fill="#16a34a" opacity="0.3" />
                <circle r="6" fill="#16a34a" stroke="#fff" strokeWidth="1.5" />
                <circle r="2" fill="#fff" />
              </g>
            </>
          )}
        </svg>
      </div>

      {/* Action row */}
      {phase === 'guessing' && (
        <div className="flex items-center gap-3">
          <p className="flex-1 text-xs font-bold text-ink/60 flex items-center gap-1">
            <MapPin size={14} className={guess ? 'text-red-600' : 'text-ink/40'} />
            {guess
              ? {
                  tr: 'Tahmin konuldu. Onaylamak için butona bas.',
                  en: 'Pin placed. Confirm to submit.',
                  ar: 'تم وضع الدبوس — أكّد الإرسال.',
                }[locale]
              : {
                  tr: 'Harita üzerinde bir nokta seç.',
                  en: 'Click a point on the map.',
                  ar: 'اختر نقطة على الخريطة.',
                }[locale]}
          </p>
          <button
            type="button"
            onClick={submit}
            disabled={!guess}
            className={cx(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold shadow-museum transition',
              guess ? 'text-cream' : 'bg-ink/10 text-ink/40 cursor-not-allowed',
            )}
            style={guess ? { background: accent } : undefined}
          >
            {{ tr: 'Onayla', en: 'Submit', ar: 'تأكيد' }[locale]}
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Reveal feedback */}
      {phase === 'reveal' && lastResult && (
        <div
          className={cx(
            'rounded-2xl p-4 border animate-popIn',
            lastResult.points === 100 ? 'bg-gem/10 border-gem/40' :
            lastResult.points >= 40   ? 'bg-gold-soft border-gold/40' :
                                        'bg-red-50 border-red-200',
          )}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="font-display text-2xl font-extrabold"
              style={{ color: accent }}
            >
              +{lastResult.points}
            </span>
            <span className="text-sm font-bold text-ink/70">
              {Math.round(lastResult.km).toLocaleString()} km
            </span>
            <span className="text-xs font-bold text-ink/50 ml-auto">
              {pick(cur.place, locale)}
            </span>
          </div>
          <p className="text-sm text-ink/80 leading-relaxed mt-2">
            {pick(cur.fact, locale)}
          </p>
          <button
            type="button"
            onClick={advance}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full
                       bg-ink text-cream font-extrabold shadow-museum"
          >
            {roundIdx + 1 >= rounds.length
              ? { tr: 'Sonuçlar', en: 'Finish', ar: 'النتائج' }[locale]
              : { tr: 'Sıradaki', en: 'Next', ar: 'التالي' }[locale]}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
