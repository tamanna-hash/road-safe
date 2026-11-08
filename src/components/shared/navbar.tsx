"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu, MapPin, AlertTriangle, ClipboardList,
  LayoutDashboard, List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader,
  SheetTitle, SheetTrigger, SheetClose,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

function useIsActive(href: string) {
  const pathname = usePathname();
  return pathname === href || pathname.startsWith(href + "/");
}

interface NavLinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function DesktopNavLink({ href, label, icon }: NavLinkItem) {
  const isActive = useIsActive(href);
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, icon }: NavLinkItem) {
  const isActive = useIsActive(href);
  return (
    <SheetClose
      render={
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        />
      }
    >
      <span className={cn(
        "flex size-8 items-center justify-center rounded-lg",
        isActive ? "bg-primary-foreground/20" : "bg-muted"
      )}>
        {icon}
      </span>
      {label}
    </SheetClose>
  );
}

export function Navbar() {
  const { t } = useLanguage();

  const NAV_LINKS: NavLinkItem[] = [
    { href: "/explore",    label: t.nav.exploreMap,   icon: <MapPin className="size-4" /> },
    { href: "/reports",    label: t.nav.reports,       icon: <List className="size-4" /> },
    { href: "/report",     label: t.nav.reportIssue,   icon: <AlertTriangle className="size-4" /> },
    { href: "/my-reports", label: t.nav.myReports,     icon: <ClipboardList className="size-4" /> },
    { href: "/admin",      label: t.nav.admin,         icon: <LayoutDashboard className="size-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground shrink-0">
          <div className="flex size-8 items-center justify-center rounded-xl overflow-hidden shadow-sm">
            <Image src="/road.jpg" alt={APP_NAME} width={32} height={32} className="object-cover w-full h-full" />
          </div>
          <span className="text-base tracking-tight">{APP_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <DesktopNavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Language switcher (desktop) + mobile trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={t.nav.openMenu}
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-0 flex flex-col">
              <SheetHeader className="px-5 py-4 border-b border-border/60">
                <SheetTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-base font-bold">
                    <div className="flex size-8 items-center justify-center rounded-xl overflow-hidden">
                      <Image src="/road.jpg" alt={APP_NAME} width={32} height={32} className="object-cover w-full h-full" />
                    </div>
                    {APP_NAME}
                  </span>
                  <LanguageSwitcher compact />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-3 flex-1">
                {NAV_LINKS.map((link) => (
                  <MobileNavLink key={link.href} {...link} />
                ))}
              </nav>

              <div className="p-4 border-t border-border/60">
                <p className="rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                  {t.app.demoNoticeShort}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
