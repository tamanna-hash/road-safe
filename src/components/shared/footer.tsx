"use client";

import Link from "next/link";
import { Shield, MapPin, AlertTriangle, ClipboardList, LayoutDashboard, List } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { t } = useLanguage();

  const LINKS = [
    { href: "/explore",    label: t.nav.exploreMap,  icon: <MapPin className="size-3.5" /> },
    { href: "/reports",    label: t.nav.reports,      icon: <List className="size-3.5" /> },
    { href: "/report",     label: t.nav.reportIssue,  icon: <AlertTriangle className="size-3.5" /> },
    { href: "/my-reports", label: t.nav.myReports,    icon: <ClipboardList className="size-3.5" /> },
    { href: "/admin",      label: t.nav.admin,        icon: <LayoutDashboard className="size-3.5" /> },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Shield className="size-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">{t.app.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {t.footer.navigation}
            </p>
            <ul className="space-y-2.5">
              {LINKS.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-muted-foreground/50 group-hover:text-primary transition-colors">
                      {icon}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo notice column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {t.app.tagline}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.app.demoNotice}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
