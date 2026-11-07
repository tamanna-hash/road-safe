"use client";

/**
 * Language context for RoadSafe bilingual support (English / বাংলা).
 *
 * Architecture:
 *   - LanguageProvider wraps the root layout
 *   - useLanguage() hook gives any component access to:
 *       t  — the active translation dictionary
 *       lang — current language code ('en' | 'bn')
 *       setLang — switch language
 *   - Selected language is persisted in localStorage
 *   - Default on first visit: 'en'
 */

import React, {
  createContext, useContext, useState,
  useEffect, useCallback, useMemo,
} from "react";
import { en } from "./en";
import { bn } from "./bn";
import type { TranslationDictionary } from "./en";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Language = "en" | "bn";

const DICTIONARIES: Record<Language, any> = { en, bn };
const STORAGE_KEY = "roadsafe_lang";
const DEFAULT_LANG: Language = "en";

interface LanguageContextValue {
  lang: Language;
  t: TranslationDictionary;
  setLang: (lang: Language) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  t: en,
  setLang: () => {},
});

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "en" || stored === "bn") {
        setLangState(stored);
      }
    } catch {
      // localStorage unavailable — use default
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ lang, t: DICTIONARIES[lang], setLang }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
