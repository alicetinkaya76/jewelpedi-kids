import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

/**
 * Dark Gallery mode toggle.
 *
 * Two themes:
 *   - 'cream' (default) — warm, inviting. Kids-first.
 *   - 'dark'            — Dark Gallery. Dramatic, spotlight-on-objects.
 *
 * State is in-memory only. The project spec forbids localStorage.
 * We DO honour the user's OS-level preference on first load so visitors
 * who already prefer dark everywhere aren't blinded.
 */
const ThemeContext = createContext(null);

export const THEMES = ['cream', 'dark'];

function detectInitial() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'cream';
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'cream';
  } catch {
    return 'cream';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectInitial);

  // Sync to <html data-theme="..."> so CSS can respond.
  useEffect(() => {
    const el = document.documentElement;
    if (theme === 'dark') el.setAttribute('data-theme', 'dark');
    else el.removeAttribute('data-theme');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'cream' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
