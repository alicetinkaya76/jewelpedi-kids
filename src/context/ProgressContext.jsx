import { createContext, useContext, useMemo, useReducer, useCallback } from 'react';

const ProgressContext = createContext(null);

/*
 * State shape:
 * {
 *   visitedExhibits: Set<string>   // exhibit IDs
 *   visitedHalls: Set<string>      // hall IDs
 *   quizStars: Record<category, number>  // best star count per category
 *   badges: Set<string>            // badge IDs unlocked
 *   labsCompleted: Set<string>     // lab experiment IDs completed
 * }
 *
 * Per spec: no localStorage — state is in-memory only.
 */

const initialState = {
  visitedExhibits: new Set(),
  visitedHalls: new Set(),
  quizStars: {},
  badges: new Set(),
  labsCompleted: new Set(),
  /* Oyun başına en yüksek skor:
   *   gameBests[gameId][difficulty] = score
   * Spec gereği in-memory; sayfa yenileme ile sıfırlanır. */
  gameBests: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'VISIT_EXHIBIT': {
      const next = new Set(state.visitedExhibits);
      next.add(action.id);
      return { ...state, visitedExhibits: next };
    }
    case 'VISIT_HALL': {
      const next = new Set(state.visitedHalls);
      next.add(action.id);
      return { ...state, visitedHalls: next };
    }
    case 'COMPLETE_LAB': {
      const next = new Set(state.labsCompleted);
      next.add(action.id);
      return { ...state, labsCompleted: next };
    }
    case 'SET_QUIZ_STARS': {
      const prev = state.quizStars[action.category] ?? 0;
      const best = Math.max(prev, action.stars);
      return {
        ...state,
        quizStars: { ...state.quizStars, [action.category]: best },
      };
    }
    case 'UNLOCK_BADGE': {
      if (state.badges.has(action.id)) return state;
      const next = new Set(state.badges);
      next.add(action.id);
      return { ...state, badges: next };
    }
    case 'SET_GAME_BEST': {
      const { gameId, difficulty, score } = action;
      const gamePrev = state.gameBests[gameId] || {};
      const prevBest = gamePrev[difficulty] ?? 0;
      if (score <= prevBest) return state;
      return {
        ...state,
        gameBests: {
          ...state.gameBests,
          [gameId]: { ...gamePrev, [difficulty]: score },
        },
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const visitExhibit = useCallback((id, hallId) => {
    dispatch({ type: 'VISIT_EXHIBIT', id });
    if (hallId) dispatch({ type: 'VISIT_HALL', id: hallId });
  }, []);
  const visitHall = useCallback((id) => dispatch({ type: 'VISIT_HALL', id }), []);
  const completeLab = useCallback((id) => dispatch({ type: 'COMPLETE_LAB', id }), []);
  const setQuizStars = useCallback(
    (category, stars) => dispatch({ type: 'SET_QUIZ_STARS', category, stars }),
    [],
  );
  const unlockBadge = useCallback((id) => dispatch({ type: 'UNLOCK_BADGE', id }), []);
  const setGameBest = useCallback(
    (gameId, difficulty, score) =>
      dispatch({ type: 'SET_GAME_BEST', gameId, difficulty, score }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const totalStars = useMemo(
    () => Object.values(state.quizStars).reduce((s, n) => s + n, 0),
    [state.quizStars],
  );

  const value = useMemo(
    () => ({
      ...state,
      totalStars,
      visitExhibit,
      visitHall,
      completeLab,
      setQuizStars,
      unlockBadge,
      setGameBest,
      reset,
    }),
    [state, totalStars, visitExhibit, visitHall, completeLab, setQuizStars, unlockBadge, setGameBest, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
