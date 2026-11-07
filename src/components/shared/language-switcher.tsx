"use client";

import { useLanguage, type Language } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Language; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "bn", label: "বাংলা",   short: "বাং" },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-border/60 bg-muted/40 p-0.5 gap-0">
      {LANGUAGES.map(({ code, label, short }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-label={`Switch to ${label}`}
          aria-pressed={lang === code}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
            lang === code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {compact ? short : label}
        </button>
      ))}
    </div>
  );
}
