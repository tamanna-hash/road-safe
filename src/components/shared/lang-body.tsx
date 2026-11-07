"use client";

/**
 * LangBody — applies data-lang attribute to <body> so the CSS
 * font-switching rule in globals.css takes effect.
 * Also updates the <html lang> attribute for screen readers.
 */

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/language-context";

export function LangBody() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.body.setAttribute("data-lang", lang);
  }, [lang]);

  return null;
}
