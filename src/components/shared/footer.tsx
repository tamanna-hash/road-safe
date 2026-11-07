"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-context";

function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>{year ?? "2026"}</>;
}

export function Footer() {
  const { t } = useLanguage();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  const LINKS = [
    { href: "/explore",    label: t.nav.exploreMap },
    { href: "/reports",    label: t.nav.reports },
    { href: "/report",     label: t.nav.reportIssue },
    { href: "/my-reports", label: t.nav.myReports },
    { href: "/admin",      label: t.nav.admin },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Shield className="size-4" />
              </div>
              <span className="text-base tracking-tight">{t.app.name}</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-1">
            <p className="col-span-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1 sm:col-span-1">
              {t.footer.navigation}
            </p>
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright(year, t.app.name)}
          </p>
          <p className="text-xs text-muted-foreground">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
