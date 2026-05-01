import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { playSound, SOUND_KEYS } from './sounds.js';

/**
 * Sound preferences context.
 *
 * Default state is MUTED (spec A.7) — users opt-in via the header toggle.
 * Once unmuted, useSound()'s play() dispatches to the Web Audio synthesizer
 * in sounds.js. All synthesis is runtime; nothing is loaded from disk.
 */
const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(true);

  const play = useCallback(
    (name, opts) => {
      if (muted) return;
      if (!SOUND_KEYS.includes(name)) return;
      playSound(name, opts);
    },
    [muted],
  );

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const value = useMemo(
    () => ({
      muted,
      setMuted,
      toggleMute,
      play,
      available: SOUND_KEYS,
    }),
    [muted, play, toggleMute],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used inside SoundProvider');
  return ctx;
}
