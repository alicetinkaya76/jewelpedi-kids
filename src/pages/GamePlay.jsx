import { useParams, Navigate } from 'react-router-dom';
import { Suspense, lazy, useMemo } from 'react';
import { GameProvider } from '../context/GameContext.jsx';
import GameShell from '../components/game/GameShell.jsx';
import LoadingFallback from '../components/common/LoadingFallback.jsx';
import { getGame } from '../data/games.js';

/**
 * GamePlay — /games/:gameId route.
 *
 * Resolves the game from the id param, lazy-loads the corresponding game
 * module, wraps it in GameProvider (per-mount session state), and lets
 * GameShell orchestrate the idle/playing/over lifecycle.
 *
 * Games communicate result data via the `onFinish` payload:
 *   onFinish({
 *     score,     // required: final numeric score
 *     summary,   // optional { tr, en, ar } one-line outcome
 *     blurb,     // optional { tr, en, ar } educational fact
 *     breakdown, // optional [{ label: {tr,en,ar}, value }, ...]
 *     bestOf,    // optional max possible score
 *     won,       // optional boolean — triggers badge unlock
 *   })
 *
 * Two lazy layers matter here: GamePlay itself is lazy at the App.jsx level,
 * and each game module is *also* lazy so switching between games only
 * fetches the one you want.
 */
export default function GamePlay() {
  const { gameId } = useParams();
  const game = getGame(gameId);

  if (!game) return <Navigate to="/games" replace />;

  const LazyGame = useMemo(() => lazy(game.componentLoader), [game.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <GameProvider>
        <GameShell game={game}>
          {(gameProps) => (
            <Suspense fallback={<LoadingFallback />}>
              <LazyGame {...gameProps} />
            </Suspense>
          )}
        </GameShell>
      </GameProvider>
    </div>
  );
}
