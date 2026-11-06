/**
 * StatCard — a single summary metric card for the admin dashboard.
 */

import { cn } from "@/lib/utils";
import type { ReportStats } from "@/types";

// ---------------------------------------------------------------------------
// Colour map — Tailwind classes for each accent colour
// ---------------------------------------------------------------------------

const COLOR_MAP = {
  blue:   { bg: "bg-blue-50 dark:bg-blue-950/30",   icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",   value: "text-blue-700 dark:text-blue-300" },
  yellow: { bg: "bg-yellow-50 dark:bg-yellow-950/30", icon: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400", value: "text-yellow-700 dark:text-yellow-300" },
  green:  { bg: "bg-green-50 dark:bg-green-950/30",  icon: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",  value: "text-green-700 dark:text-green-300" },
  orange: { bg: "bg-orange-50 dark:bg-orange-950/30", icon: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400", value: "text-orange-700 dark:text-orange-300" },
  red:    { bg: "bg-red-50 dark:bg-red-950/30",    icon: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",    value: "text-red-700 dark:text-red-300" },
  gray:   { bg: "bg-gray-50 dark:bg-gray-950/30",   icon: "bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400",   value: "text-gray-700 dark:text-gray-300" },
} as const;

export type StatCardColor = keyof typeof COLOR_MAP;

// ---------------------------------------------------------------------------
// Props & Component
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: number;
  color: StatCardColor;
  icon: React.ReactNode;
  description?: string;
}

export function StatCard({ label, value, color, icon, description }: StatCardProps) {
  const colors = COLOR_MAP[color];
  return (
    <div className={cn("flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/8", colors.bg)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={cn("flex size-8 items-center justify-center rounded-lg", colors.icon)}>
          {icon}
        </div>
      </div>
      <p className={cn("text-3xl font-bold tabular-nums", colors.value)}>{value}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// AdminStatsRow — renders all 6 stat cards from a ReportStats object
// ---------------------------------------------------------------------------

import {
  ClipboardList, Clock, CheckCircle2, ArrowUpCircle, CheckCheck, XCircle,
} from "lucide-react";

export function AdminStatsRow({ stats }: { stats: ReportStats }) {
  const cards: StatCardProps[] = [
    {
      label: "Total Reports",
      value: stats.total,
      color: "gray",
      icon: <ClipboardList className="size-4" />,
      description: "All community submissions",
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "yellow",
      icon: <Clock className="size-4" />,
      description: "Awaiting review",
    },
    {
      label: "Verified",
      value: stats.verified,
      color: "blue",
      icon: <CheckCircle2 className="size-4" />,
      description: "Confirmed issues",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      color: "orange",
      icon: <ArrowUpCircle className="size-4" />,
      description: "Work underway",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      color: "green",
      icon: <CheckCheck className="size-4" />,
      description: "Issues addressed",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      color: "red",
      icon: <XCircle className="size-4" />,
      description: "Not accepted",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
