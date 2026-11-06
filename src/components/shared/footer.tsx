"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { APP_NAME, DEMO_DISCLAIMER } from "@/lib/constants";

/** Renders the current year only on the client to satisfy Next.js 16 prerender rules. */
function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year ?? "2026"}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Top row — logo + nav links */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Shield className="size-3.5" />
              </div>
              <span>{APP_NAME}</span>
            </Link>
            <p className="max-w-xs text-xs text-muted-foreground">
              Community road safety awareness and accident hotspot reporting platform.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-1.5 text-sm">
            <p className="font-medium text-foreground">Quick Links</p>
            {[
              { href: "/explore", label: "Explore Map" },
              { href: "/reports", label: "All Reports" },
              { href: "/report", label: "Report an Issue" },
              { href: "/my-reports", label: "My Reports" },
              { href: "/admin", label: "Admin Dashboard" },
            ].map(({ href, label }) => (
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

        {/* Demo disclaimer */}
        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 dark:border-yellow-900/40 dark:bg-yellow-950/20">
          <p className="text-xs leading-relaxed text-yellow-800 dark:text-yellow-300">
            <span className="font-semibold">Demo Notice: </span>
            {DEMO_DISCLAIMER}
          </p>
        </div>

        {/* Bottom row — copyright */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; <CopyrightYear /> {APP_NAME}. Frontend demonstration project.</p>
          <p>Built with Next.js · Tailwind CSS · Leaflet · OpenStreetMap</p>
        </div>
      </div>
    </footer>
  );
}
