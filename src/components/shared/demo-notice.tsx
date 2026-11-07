"use client";

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";

interface DemoNoticeProps {
  /** Override the default message. If omitted, uses the translated default. */
  messageKey?: "default" | "admin" | "short";
  /** Fully custom message (bypasses translation — use sparingly). */
  message?: string;
  className?: string;
  compact?: boolean;
}

export function DemoNotice({
  messageKey = "default",
  message,
  className,
  compact = false,
}: DemoNoticeProps) {
  const { t } = useLanguage();

  const text = message ?? (
    messageKey === "admin" ? t.app.demoAdmin
    : messageKey === "short" ? t.app.demoNoticeShort
    : t.app.demoNotice
  );

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300",
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
        className
      )}
    >
      <Info className={cn("shrink-0 mt-0.5", compact ? "size-3.5" : "size-4")} />
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}
