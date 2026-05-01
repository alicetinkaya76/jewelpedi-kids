import { createContext, useContext, useMemo, useReducer, useCallback } from 'react';

/**
 * GameContext — per-session state for the active /games/:gameId route.
 *
 * Unlike ProgressContext (which is app-wide), this context wraps only the
 * GamePlay page and resets whenever the route changes or the player hits
 * "back to hub". Games read their current difficulty / phase / score from
 * here and dispatch actions to advance state.
 *
 * Phases:
 *   idle    — DifficultyPicker shown, player hasn't started yet
 *   playing — the game component is mounted and running
 *   over    — GameOverScreen shown with final score + badge + blurb
 *
 * Per spec: no localStorage. State lives only for the mount lifetime.
 */

const GameContext = createContext(null);

const initialState = {
  phase: 'idle',
  difficulty: 'cirak',
  score: 0,
  stats: null,          // game-specific payload (e.g. matches, combos)
  startedAt: null,
  finishedAt: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'PICK_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };
    case 'START':
      return {
        ...state,
        phase: 'playing',
        score: 0,
        stats: null,
        startedAt: Date.now(),
        finishedAt: null,
      };
    case 'FINISH':
      return {
        ...state,
        phase: 'over',
        score: action.score ?? state.score,
        stats: action.stats ?? null,
        finishedAt: Date.now(),
      };
    case 'RESET':
      return { ...initialState, difficulty: state.difficulty };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pickDifficulty = useCallback(
    (difficulty) => dispatch({ type: 'PICK_DIFFICULTY', difficulty }),
    [],
  );
  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const finish = useCallback(
    (payload = {}) => dispatch({ type: 'FINISH', ...payload }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const value = useMemo(
    () => ({ ...state, pickDifficulty, start, finish, reset }),
    [state, pickDifficulty, start, finish, reset],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
