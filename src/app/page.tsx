"use client";

import Link from "next/link";
import {
  MapPin, AlertTriangle, ClipboardList,
  LayoutDashboard, ArrowRight, Shield, List,
  CheckCircle2, Users, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/shared/footer";
import { useLanguage } from "@/lib/i18n/language-context";

export default function HomePage() {
  const { t } = useLanguage();
  const h = t.home;

  const FEATURES = [
    { href: "/explore",    icon: <MapPin className="size-5" />,         accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",   ...h.features.explore },
    { href: "/reports",    icon: <List className="size-5" />,           accent: "bg-teal-500/10 text-teal-600 dark:text-teal-400",   ...h.features.reports },
    { href: "/report",     icon: <AlertTriangle className="size-5" />,  accent: "bg-orange-500/10 text-orange-600 dark:text-orange-400", ...h.features.report },
    { href: "/my-reports", icon: <ClipboardList className="size-5" />,  accent: "bg-green-500/10 text-green-600 dark:text-green-400", ...h.features.myReports },
    { href: "/admin",      icon: <LayoutDashboard className="size-5" />, accent: "bg-purple-500/10 text-purple-600 dark:text-purple-400", ...h.features.admin },
  ] as const;

  const STATS = [
    { icon: <Users className="size-5 text-primary" />, value: "82", label: h.stats.sampleReports },
    { icon: <TrendingUp className="size-5 text-primary" />, value: "8", label: h.stats.categories },
    { icon: <CheckCircle2 className="size-5 text-primary" />, value: "5", label: h.stats.statusStages },
  ];

  const HOW_STEPS = [
    h.howItWorks.step1,
    h.howItWorks.step2,
    h.howItWorks.step3,
  ];

  return (
    <div className="flex flex-col flex-1">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 sm:py-28">

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Shield className="size-3" />
            {h.hero.badge}
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {h.hero.headline1}
              <br />
              <span className="text-primary">{h.hero.headline2}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              {h.hero.subheadline}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/explore" />}
              className="gap-2 px-6"
            >
              <MapPin className="size-4" />
              {h.hero.ctaExplore}
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/report" />}
              className="gap-2 px-6"
            >
              <AlertTriangle className="size-4" />
              {h.hero.ctaReport}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            {STATS.map(({ icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                {icon}
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/70">{h.hero.demoNote}</p>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground">{h.features.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{h.features.subheading}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURES.map(({ href, icon, title, desc, cta, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 transition-all hover:border-border hover:shadow-sm"
            >
              <div className={`flex size-10 items-center justify-center rounded-xl ${accent}`}>
                {icon}
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                {cta}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground">{h.howItWorks.heading}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{h.howItWorks.subheading}</p>
          </div>

          <div className="relative grid gap-8 sm:grid-cols-3">
            <div className="absolute top-5 left-[16.66%] right-[16.66%] hidden h-px bg-border sm:block" />
            {HOW_STEPS.map(({ title, desc }, i) => (
              <div key={i} className="relative flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
                <div className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
