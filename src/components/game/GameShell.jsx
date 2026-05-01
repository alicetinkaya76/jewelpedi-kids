import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext.jsx';
import { useGame } from '../../context/GameContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { pick, cx } from '../../utils/helpers.js';
import { badges as allBadges } from '../../data/achievements.js';
import DifficultyPicker from './DifficultyPicker.jsx';
import GameOverScreen from './GameOverScreen.jsx';
import { GemIcon } from '../icons/gems/index.js';

/**
 * GameShell — wraps every game in a consistent idle / playing / over flow.
 *
 * Phases are driven by GameContext. In "playing", the shell steps aside and
 * renders the game (child render-function). When the game calls onFinish,
 * the shell flips to "over" and renders GameOverScreen from the payload —
 * so each game file owns all of its own result copy and breakdown stats.
 *
 * Expected usage:
 *   <GameShell game={...}>
 *     {({ difficulty, accent, onFinish }) => <ActualGame ... />}
 *   </GameShell>
 *
 * onFinish payload shape:
 *   { score, won?, summary?, blurb?, breakdown?, bestOf? }
 */
export default function GameShell({ game, children }) {
  const { locale, t } = useLocale();
  const { unlockBadge, badges, gameBests, setGameBest } = useProgress();
  const {
    phase,
    difficulty,
    score,
    stats,
    pickDifficulty,
    start,
    finish,
    reset,
  } = useGame();

  const accent = game.accent;

  /* Unlock badge on result screen when game reports win. */
  const earnBadge = phase === 'over' && stats?.won === true;
  const badgeAlreadyOwned = badges.has(game.badgeId);

  useEffect(() => {
    if (earnBadge && !badgeAlreadyOwned) {
      unlockBadge(game.badgeId);
    }
  }, [earnBadge, badgeAlreadyOwned, unlockBadge, game.badgeId]);

  /* Record personal best. setGameBest is a no-op when score ≤ current best,
   * so it's safe to call on every "over" phase render — but we still gate
   * with an effect to avoid rerun when the shell re-renders for unrelated
   * reasons. */
  const previousBest = gameBests?.[game.id]?.[difficulty] ?? 0;
  const isNewBest = phase === 'over' && score > previousBest;

  useEffect(() => {
    if (phase === 'over' && score > 0) {
      setGameBest(game.id, difficulty, score);
    }
  }, [phase, score, difficulty, game.id, setGameBest]);

  /* ─── IDLE ───────────────────────────────────────────────── */
  if (phase === 'idle') {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          to="/games"
          className="inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink mb-4"
        >
          <ChevronLeft size={16} /> {t('common.back')}
        </Link>

        <div
          className="relative rounded-[2rem] overflow-hidden border shadow-museum p-6 sm:p-8 bg-white/90"
          style={{ borderLeftWidth: 6, borderLeftColor: accent }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
          />

          <div className="relative flex items-start gap-4">
            <span
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center
                         ring-4 ring-white/70 shrink-0"
              style={{ background: `color-mix(in srgb, ${accent} 22%, white)` }}
              aria-hidden="true"
            >
              <GemIcon id={game.icon} size={56} animate />
            </span>
            <div className="flex-1 min-w-0">
              <div
                className="text-[11px] uppercase tracking-widest font-extrabold"
                style={{ color: accent }}
              >
                ~{game.durationMin} {{ tr: 'dk', en: 'min', ar: 'د' }[locale]}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight mt-1">
                {pick(game.title, locale)}
              </h1>
              <p className="text-ink/70 mt-2 leading-relaxed text-sm sm:text-base">
                {pick(game.description, locale)}
              </p>
            </div>
          </div>

          {game.learningGoals && (
            <div className="mt-5 rounded-2xl bg-ink/5 p-4">
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/60 mb-2">
                {{
                  tr: 'Ne öğreneceksin',
                  en: 'What you\'ll learn',
                  ar: 'ماذا ستتعلم',
                }[locale]}
              </div>
              <ul className="text-sm text-ink/80 space-y-1">
                {pick(game.learningGoals, locale).map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: accent }} aria-hidden="true">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <DifficultyPicker
              value={difficulty}
              onChange={pickDifficulty}
              accent={accent}
            />
          </div>

          <button
            type="button"
            onClick={start}
            className={cx(
              'mt-6 w-full inline-flex items-center justify-center gap-2',
              'px-6 py-4 rounded-2xl text-cream font-extrabold',
              'font-display text-lg shadow-museum',
              'hover:scale-[1.01] active:scale-[0.99] transition',
            )}
            style={{ background: accent }}
          >
            <Play size={18} fill="currentColor" />
            {{ tr: 'Başla', en: 'Start', ar: 'ابدأ' }[locale]}
          </button>
        </div>
      </div>
    );
  }

  /* ─── PLAYING ────────────────────────────────────────────── */
  if (phase === 'playing') {
    const gameProps = {
      difficulty,
      accent,
      game,
      onFinish: (payload = {}) => finish({ score: payload.score ?? 0, stats: payload }),
    };
    return (
      <div className="mx-auto max-w-5xl">
        {typeof children === 'function' ? children(gameProps) : children}
      </div>
    );
  }

  /* ─── OVER ───────────────────────────────────────────────── */
  const badgeMeta = allBadges.find((b) => b.id === game.badgeId);
  const relatedLabel = {
    tr: 'İlgili sergiye göz at',
    en: 'Explore the related exhibit',
    ar: 'استكشف المعرض ذو الصلة',
  };

  return (
    <div className="mx-auto max-w-3xl">
      <GameOverScreen
        score={score}
        bestOf={stats?.bestOf}
        won={stats?.won}
        summary={stats?.summary}
        blurb={stats?.blurb}
        stats={stats?.breakdown || []}
        accent={accent}
        relatedHref={game.relatedHall}
        relatedLabel={relatedLabel}
        badgeUnlocked={earnBadge}
        badgeName={badgeMeta?.name}
        personalBest={previousBest}
        isNewBest={isNewBest}
        difficultyLabel={difficulty}
        onPlayAgain={() => {
          reset();
          start();
        }}
      />
    </div>
  );
}
