"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MapPin, AlertTriangle, ClipboardList, LayoutDashboard, List, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Nav link definitions
// ---------------------------------------------------------------------------

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/explore",
    label: "Explore Map",
    icon: <MapPin className="size-4" />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <List className="size-4" />,
  },
  {
    href: "/report",
    label: "Report Issue",
    icon: <AlertTriangle className="size-4" />,
  },
  {
    href: "/my-reports",
    label: "My Reports",
    icon: <ClipboardList className="size-4" />,
  },
  {
    href: "/admin",
    label: "Admin",
    icon: <LayoutDashboard className="size-4" />,
  },
];

// ---------------------------------------------------------------------------
// Desktop nav link
// ---------------------------------------------------------------------------

function DesktopNavLink({ href, label, icon }: NavLink) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Mobile nav link (inside Sheet)
// ---------------------------------------------------------------------------

function MobileNavLink({ href, label, icon }: NavLink) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <SheetClose
      render={
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        />
      }
    >
      {icon}
      {label}
    </SheetClose>
  );
}

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Shield className="size-4" />
      </div>
      <span className="text-lg">{APP_NAME}</span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <DesktopNavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu" />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-4 py-3">
              <SheetTitle className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Shield className="size-3.5" />
                </div>
                {APP_NAME}
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => (
                <MobileNavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* Demo notice at bottom of mobile drawer */}
            <div className="mt-auto p-4">
              <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                Demo application — data is stored locally in your browser.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
