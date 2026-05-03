import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { translate, interpolate, availableLocales, localeMeta } from '../i18n/index.js';

const LocaleContext = createContext(null);

function detectInitial() {
  // Default locale is always TR (Turkish jewelry/craft heritage focus,
  // sponsor in Turkey). Users can switch to EN/AR via the locale switcher
  // in the header. Browser language is intentionally not detected because:
  //  - Developers often run English-locale browsers
  //  - VPN/proxy users get misclassified
  //  - The locale switcher is one tap away
  return 'tr';
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(detectInitial);

  // Update document direction and lang attribute on change
  useEffect(() => {
    const meta = localeMeta[locale] || localeMeta.tr;
    document.documentElement.dir = meta.dir;
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (path, vars) => {
      const raw = translate(path, locale);
      return vars ? interpolate(raw, vars) : raw;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      meta: localeMeta[locale] || localeMeta.tr,
      availableLocales,
      localeMeta,
    }),
    [locale, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}
