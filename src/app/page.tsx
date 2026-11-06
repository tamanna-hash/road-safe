import Link from "next/link";
import {
  MapPin,
  AlertTriangle,
  ClipboardList,
  LayoutDashboard,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Feature card data
// ---------------------------------------------------------------------------

const FEATURES = [
  {
    href: "/explore",
    icon: <MapPin className="size-6" />,
    title: "Explore the Map",
    description:
      "Browse reported road safety issues on an interactive map. Filter by category, severity, and verification status to find risks near you.",
    cta: "Open Map",
    color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40",
  },
  {
    href: "/report",
    icon: <AlertTriangle className="size-6" />,
    title: "Report an Issue",
    description:
      "Spotted a dangerous road condition? Submit a report with location, category, severity, and an optional photo. Your report goes live on the map immediately.",
    cta: "Submit Report",
    color:
      "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/40",
  },
  {
    href: "/my-reports",
    icon: <ClipboardList className="size-6" />,
    title: "Track Your Reports",
    description:
      "Follow the progress of reports you have submitted. See when a report is verified, actioned, or resolved through a clear status timeline.",
    cta: "My Reports",
    color:
      "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/40",
  },
  {
    href: "/admin",
    icon: <LayoutDashboard className="size-6" />,
    title: "Admin Dashboard",
    description:
      "Review submitted reports, update statuses, and track resolution progress. Simulated admin interface — no real authentication required for this demo.",
    cta: "Open Dashboard",
    color:
      "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/40",
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-24">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="size-3.5" />
            Community Road Safety Platform
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Make Roads Safer,{" "}
            <span className="text-primary">Together</span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-xl text-lg text-muted-foreground">
            {APP_NAME} helps communities identify dangerous road conditions,
            report hazards, and track progress — all on an interactive map.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              render={<Link href="/explore" />}
              className="flex items-center gap-2"
            >
              <MapPin className="size-4" />
              Explore the Map
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/report" />}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="size-4" />
              Report an Issue
            </Button>
          </div>

          {/* Demo notice */}
          <p className="text-xs text-muted-foreground">
            Frontend demonstration — all data is stored locally in your browser.
          </p>
        </div>
      </section>

      {/* Feature cards section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-foreground">
            Everything you need
          </h2>
          <p className="mt-2 text-muted-foreground">
            Four core features working together to improve road safety awareness.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ href, icon, title, description, cta, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              {/* Icon */}
              <div className={`flex size-12 items-center justify-center rounded-lg ${color}`}>
                {icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                {cta}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              How it works
            </h2>
            <p className="mt-2 text-muted-foreground">
              A simple three-step workflow from report to resolution.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit a Report",
                desc: "Pin the location on the map, describe the hazard, choose a category and severity level, and optionally attach a photo.",
              },
              {
                step: "02",
                title: "Review & Verify",
                desc: "An administrator reviews the report and marks it as Verified, In Progress, Resolved, or Rejected with an explanatory note.",
              },
              {
                step: "03",
                title: "Track Progress",
                desc: "Check My Reports at any time to see the current status of your submissions and any updates from the admin team.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
