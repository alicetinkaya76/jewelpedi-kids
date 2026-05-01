import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocale } from '../context/LocaleContext.jsx';
import { useSound } from '../audio/SoundContext.jsx';
import ScoreBoard from '../components/game/ScoreBoard.jsx';
import { GemIcon } from '../components/icons/gems/index.js';
import { pick, cx } from '../utils/helpers.js';

/**
 * MohsClimb — endless vertical climber / dodger.
 *
 * Mineral "tokens" (circles labelled with their Mohs value) fall from the
 * top. The player occupies one of 5 lanes at the bottom. When a token
 * lands on the player's lane:
 *   Mohs > player level → LEVEL UP (avatar changes to next-harder gem)
 *   Mohs = player level → no-op (small score bonus)
 *   Mohs < player level → -1 life
 * First to Mohs 10 wins; out of lives = game over.
 *
 * Uses a requestAnimationFrame loop with a mutable ref of tokens. React
 * state only holds the "headline" numbers (level, score, lives) that the UI
 * actually reads — tokens re-render via a tiny version counter that bumps
 * each frame. This keeps React off the per-frame critical path.
 *
 * A11y: keyboard (←→), aria-labels on tokens, prefers-reduced-motion.
 */

const LEVELS = [
  { mohs: 1,  icon: 'pearl',      color: '#e5e7eb', name: { tr: 'Talk',     en: 'Talc',     ar: 'تلك' } },
  { mohs: 2,  icon: 'opal',       color: '#f5f3eb', name: { tr: 'Jips',     en: 'Gypsum',   ar: 'جبس' } },
  { mohs: 3,  icon: 'citrine',    color: '#fef3c7', name: { tr: 'Kalsit',   en: 'Calcite',  ar: 'كالسيت' } },
  { mohs: 4,  icon: 'amethyst',   color: '#c084fc', name: { tr: 'Florit',   en: 'Fluorite', ar: 'فلوريت' } },
  { mohs: 5,  icon: 'aquamarine', color: '#38bdf8', name: { tr: 'Apatit',   en: 'Apatite',  ar: 'أباتيت' } },
  { mohs: 6,  icon: 'turquoise',  color: '#fbbf24', name: { tr: 'Feldspat', en: 'Feldspar', ar: 'فلسبار' } },
  { mohs: 7,  icon: 'peridot',    color: '#a855f7', name: { tr: 'Kuvars',   en: 'Quartz',   ar: 'كوارتز' } },
  { mohs: 8,  icon: 'topaz',      color: '#fb923c', name: { tr: 'Topaz',    en: 'Topaz',    ar: 'توباز' } },
  { mohs: 9,  icon: 'ruby',       color: '#dc2626', name: { tr: 'Yakut',    en: 'Ruby',     ar: 'ياقوت' } },
  { mohs: 10, icon: 'diamond',    color: '#bfdbfe', name: { tr: 'Elmas',    en: 'Diamond',  ar: 'ماس' } },
];

const LEVEL_FACTS = {
  1:  { tr: 'Talk — en yumuşak. Tırnağınla bile çizebilirsin.', en: 'Talc — the softest. Even a fingernail scratches it.', ar: 'التلك — أطرى معدن؛ يخدشه الظفر.' },
  2:  { tr: 'Jips. Eski Mısır\'da alçı olarak kullanıldı.', en: 'Gypsum. Ancient Egyptians used it as plaster.', ar: 'جبس — استخدم في مصر القديمة جصاً.' },
  3:  { tr: 'Kalsit — bakır paradan hafif yumuşak. Mermerin ana bileşeni.', en: 'Calcite — softer than a copper coin. Main mineral in marble.', ar: 'كالسيت — أساس الرخام.' },
  4:  { tr: 'Florit, mor-yeşil-mavi pek çok renkte olur.', en: 'Fluorite comes in purple, green, blue — many colors.', ar: 'فلوريت — بألوان كثيرة.' },
  5:  { tr: 'Apatit. Kemiklerinde de apatit var — aynı aile!', en: 'Apatite. Your bones contain apatite too — same family!', ar: 'أباتيت — وهو في عظامك أيضاً!' },
  6:  { tr: 'Feldspat — dünyada en bol mineral. Granitin %50\'si!', en: 'Feldspar — most abundant mineral on Earth. 50% of granite!', ar: 'فلسبار — أكثر المعادن وفرة.' },
  7:  { tr: 'Kuvars. Camı çizer. Cep saatlerindeki kristal kuvars.', en: 'Quartz. Scratches glass. Watch crystals use it.', ar: 'كوارتز — يخدش الزجاج.' },
  8:  { tr: 'Topaz. Kuvarstan sert, yakuttan yumuşak.', en: 'Topaz. Harder than quartz, softer than ruby.', ar: 'توباز — أصلب من الكوارتز.' },
  9:  { tr: 'Yakut/Safir (korund). Pırlantadan sonra en sert.', en: 'Ruby/Sapphire (corundum). Second only to diamond.', ar: 'ياقوت/صفير — بعد الماس مباشرة.' },
  10: { tr: 'Elmas — en sert. Saf karbondan, volkanik derinliklerden.', en: 'Diamond — the hardest. Pure carbon from volcanic depths.', ar: 'الماس — الأصلب؛ كربون خالص من أعماق الأرض.' },
};

const CONFIG = {
  cirak: { lives: 3, spawnEvery: 1400, speed: 90,  gapWindow: 1, randomChance: 0 },
  kalfa: { lives: 3, spawnEvery: 1100, speed: 110, gapWindow: 2, randomChance: 0.25 },
  usta:  { lives: 2, spawnEvery: 900,  speed: 140, gapWindow: 10, randomChance: 1 },
};

/* Court logical coordinates — scaled by CSS to actual render size. */
const COURT_W = 480;
const COURT_H = 540;
const LANES = 5;
const PLAYER_Y = COURT_H - 70;
const PLAYER_R = 28;
const TOKEN_R = 26;

export default function MohsClimb({ difficulty, accent, onFinish }) {
  const { locale } = useLocale();
  const { play } = useSound();
  const cfg = CONFIG[difficulty] || CONFIG.cirak;

  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(cfg.lives);
  const [score, setScore] = useState(0);
  const [lane, setLane] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [toast, setToast] = useState(null);
  const [, bump] = useState(0);

  /* rAF-owned state (mutable refs). */
  const tokensRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const lastFrameRef = useRef(0);
  const laneRef = useRef(lane);
  const levelRef = useRef(level);
  const livesRef = useRef(lives);
  const scoreRef = useRef(score);
  const seqRef = useRef(0);
  const runningRef = useRef(true);
  const onFinishRef = useRef(onFinish);
  const endedRef = useRef(false);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' &&
          window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  onFinishRef.current = onFinish;
  laneRef.current = lane;
  levelRef.current = level;
  livesRef.current = lives;
  scoreRef.current = score;

  /* Keyboard controls */
  useEffect(() => {
    const onKey = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft')  { setLane((l) => Math.max(0, l - 1)); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setLane((l) => Math.min(LANES - 1, l + 1)); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameOver]);

  /* Build payload and end the game. */
  const endGame = useCallback((won) => {
    if (endedRef.current) return;
    endedRef.current = true;
    runningRef.current = false;
    setGameOver(true);
    const maxLevel = levelRef.current;
    const finalScore = scoreRef.current + (won ? 200 : 0);
    onFinishRef.current({
      score: finalScore,
      won,
      summary: won
        ? { tr: 'Mohs 10\'a ulaştın — Elmas seviyesi!',
            en: 'You reached Mohs 10 — diamond tier!',
            ar: 'وصلت إلى موس 10 — الماس!' }
        : { tr: `En yüksek Mohs ${maxLevel}.`,
            en: `Top reached: Mohs ${maxLevel}.`,
            ar: `الأعلى: موس ${maxLevel}.` },
      blurb: won
        ? { tr: 'Elmas saf karbondur; dünyanın 150+ km altında oluşur ve volkanik kimberlit borularıyla yüzeye çıkar. Mohs skalası 1812\'de Friedrich Mohs tarafından oluşturuldu — GÖRECELİ bir ölçektir: Elmas (10) kuvarstan (7) yaklaşık 140× daha serttir.',
            en: 'Diamond is pure carbon, formed 150+ km underground and carried up by volcanic kimberlite pipes. The Mohs scale (Friedrich Mohs, 1812) is RELATIVE, not linear — diamond (10) is ~140× harder than quartz (7).',
            ar: 'الماس كربون نقي من أعماق 150+ كم. مقياس موس (1812) نسبي: الماس أصلب بـ140 ضعفاً من الكوارتز.' }
        : { tr: `Mohs skalası GÖRECELİ bir ölçektir — aralar eşit değil. Sen ${pick(LEVELS[maxLevel - 1].name, locale)} seviyesinde kaldın. Tekrar dene, bu sefer daha dikkatli.`,
            en: `The Mohs scale is RELATIVE — the gaps aren't equal. You stopped at ${pick(LEVELS[maxLevel - 1].name, locale)}. Try again, more carefully.`,
            ar: `مقياس موس نسبي. توقفت عند ${pick(LEVELS[maxLevel - 1].name, locale)}.` },
      breakdown: [
        { label: { tr: 'En yüksek Mohs', en: 'Top Mohs', ar: 'أعلى موس' }, value: `${maxLevel}/10` },
        { label: { tr: 'Kalan can', en: 'Lives left', ar: 'أرواح متبقية' }, value: Math.max(0, livesRef.current) },
        { label: { tr: 'Zorluk', en: 'Difficulty', ar: 'الصعوبة' }, value: { cirak: 'Çırak', kalfa: 'Kalfa', usta: 'Usta' }[difficulty] },
      ],
    });
  }, [difficulty, locale]);

  /* rAF main loop */
  useEffect(() => {
    let raf;
    const tick = (ts) => {
      if (!runningRef.current) return;
      const dt = lastFrameRef.current ? Math.min(0.1, (ts - lastFrameRef.current) / 1000) : 0;
      lastFrameRef.current = ts;

      // Spawn
      if (ts - lastSpawnRef.current > cfg.spawnEvery) {
        const cur = levelRef.current;
        let mohs;
        if (Math.random() < cfg.randomChance) {
          mohs = 1 + Math.floor(Math.random() * 10);
        } else {
          const lo = Math.max(1, cur - cfg.gapWindow);
          const hi = Math.min(10, cur + cfg.gapWindow);
          mohs = lo + Math.floor(Math.random() * (hi - lo + 1));
        }
        tokensRef.current.push({
          id: ++seqRef.current,
          lane: Math.floor(Math.random() * LANES),
          y: -TOKEN_R,
          mohs,
        });
        lastSpawnRef.current = ts;
      }

      // Move + collide
      const speed = cfg.speed + levelRef.current * 5;
      const next = [];
      for (const t of tokensRef.current) {
        t.y += dt * speed;
        // Collision window
        if (t.lane === laneRef.current &&
            t.y >= PLAYER_Y - PLAYER_R && t.y <= PLAYER_Y + PLAYER_R) {
          handleCollision(t);
          continue;
        }
        if (t.y > COURT_H + TOKEN_R) continue;
        next.push(t);
      }
      tokensRef.current = next;
      bump((v) => (v + 1) % 1000);

      if (runningRef.current) raf = requestAnimationFrame(tick);
    };

    const handleCollision = (tok) => {
      if (tok.mohs > levelRef.current) {
        const newLvl = Math.min(10, levelRef.current + 1);
        setLevel(newLvl);
        setScore((s) => s + tok.mohs * 10);
        play?.('reveal');
        setToast({ kind: 'up', level: newLvl, text: LEVEL_FACTS[newLvl] });
        setTimeout(() => setToast(null), 2000);
        if (newLvl >= 10) {
          setTimeout(() => endGame(true), 1200);
        }
      } else if (tok.mohs === levelRef.current) {
        setScore((s) => s + 2);
      } else {
        const newLives = livesRef.current - 1;
        setLives(newLives);
        play?.('error');
        setToast({
          kind: 'down',
          text: {
            tr: `Dikkat! Mohs ${tok.mohs} senden yumuşak.`,
            en: `Watch out! Mohs ${tok.mohs} is softer than you.`,
            ar: `انتبه! موس ${tok.mohs} أنعم منك.`,
          },
        });
        setTimeout(() => setToast(null), 1800);
        if (newLives <= 0) setTimeout(() => endGame(false), 800);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      runningRef.current = false;
      cancelAnimationFrame(raf);
    };
  }, [cfg.spawnEvery, cfg.speed, cfg.gapWindow, cfg.randomChance, play, endGame]);

  const levelMeta = LEVELS[level - 1];

  return (
    <div className="space-y-3">
      <ScoreBoard
        score={score}
        lives={lives}
        maxLives={cfg.lives}
        accent={accent}
        extra={
          <span>
            Mohs <strong>{level}</strong> · {pick(levelMeta.name, locale)}
          </span>
        }
      />

      <div
        className="relative mx-auto rounded-3xl overflow-hidden border border-ink/10 shadow-museum select-none touch-none"
        style={{
          width: '100%',
          maxWidth: COURT_W,
          aspectRatio: `${COURT_W} / ${COURT_H}`,
          background: 'linear-gradient(180deg, #0b0f1a 0%, #141b2d 60%, #2a3451 100%)',
        }}
      >
        {/* Lane dividers */}
        {Array.from({ length: LANES + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white/5"
            style={{ left: `${(i / LANES) * 100}%` }}
            aria-hidden="true"
          />
        ))}

        {/* Tokens */}
        {tokensRef.current.map((t) => {
          const xPct = (t.lane + 0.5) / LANES;
          const yPct = t.y / COURT_H;
          const meta = LEVELS[t.mohs - 1];
          const isGood = t.mohs > level;
          const isBad = t.mohs < level;
          const tokenSizePct = (TOKEN_R * 2) / COURT_W * 100;
          return (
            <div
              key={t.id}
              className="absolute flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: `${tokenSizePct}%`,
                aspectRatio: '1 / 1',
                left: `${xPct * 100}%`,
                top: `${yPct * 100}%`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${meta.color} 0%, color-mix(in srgb, ${meta.color} 55%, #000) 90%)`,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: isGood ? '#22c55e' : isBad ? '#ef4444' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Mohs ${t.mohs} ${pick(meta.name, locale)}`}
            >
              <span
                className="font-display font-extrabold text-xs sm:text-sm"
                style={{ color: t.mohs >= 7 && t.mohs !== 10 ? '#fff' : '#1b2845' }}
              >
                {t.mohs}
              </span>
            </div>
          );
        })}

        {/* Player */}
        <div
          className={cx(
            'absolute flex items-center justify-center rounded-full bg-white ring-4 ring-gold',
            reducedMotion ? '' : 'transition-[left] duration-150 ease-out',
          )}
          style={{
            width: `${(PLAYER_R * 2) / COURT_W * 100}%`,
            aspectRatio: '1 / 1',
            left: `${((lane + 0.5) / LANES) * 100}%`,
            top: `${(PLAYER_Y / COURT_H) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-label={`Player Mohs ${level}`}
        >
          <GemIcon id={levelMeta.icon} size={42} animate={!reducedMotion} />
        </div>

        {/* Lane tap zones — full court height for max touch target */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: LANES }).map((_, i) => (
            <button
              key={i}
              type="button"
              onPointerDown={() => setLane(i)}
              className="flex-1 bg-transparent hover:bg-white/5 transition"
              aria-label={`Lane ${i + 1}`}
            />
          ))}
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={cx(
              'absolute left-1/2 top-3 -translate-x-1/2 max-w-[92%] px-3 py-2',
              'rounded-xl text-xs sm:text-sm font-bold shadow-museum animate-popIn pointer-events-none z-10',
              toast.kind === 'up' ? 'bg-gem text-cream' : 'bg-red-500 text-white',
            )}
            role="status"
          >
            {toast.kind === 'up' && (
              <strong className="mr-1 rtl:mr-0 rtl:ml-1">
                Mohs {toast.level}!
              </strong>
            )}
            {pick(toast.text, locale)}
          </div>
        )}
      </div>

      {/* Mohs ladder reference — always visible */}
      <div className="flex items-center gap-0.5 px-1" aria-label="Mohs scale">
        {LEVELS.map((l) => (
          <div
            key={l.mohs}
            className={cx(
              'flex-1 text-center rounded-md py-1 text-[10px] font-extrabold transition',
              l.mohs < level  && 'bg-gem/20 text-gem',
              l.mohs === level && 'bg-gold text-ink ring-2 ring-gold',
              l.mohs > level  && 'bg-ink/5 text-ink/40',
            )}
            title={pick(l.name, locale)}
          >
            {l.mohs}
          </div>
        ))}
      </div>

      <p className="text-center text-xs font-bold text-ink/50">
        {{
          tr: 'Dokun ya da ← → ile şerit değiştir. Sadece SENDEN SERT olanı yut.',
          en: 'Tap a lane or use ← → keys. Only eat minerals HARDER than you.',
          ar: 'انقر أو استخدم ← → لتغيير المسار. اجمع الأصلب فقط.',
        }[locale]}
      </p>
    </div>
  );
}
