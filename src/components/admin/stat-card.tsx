import { cn } from "@/lib/utils";
import type { ReportStats } from "@/types";
import { ClipboardList, Clock, CheckCircle2, ArrowUpCircle, CheckCheck, XCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

const COLOR_MAP = {
  blue:   { border: "border-blue-200 dark:border-blue-900/40",   icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",   value: "text-blue-700 dark:text-blue-300" },
  yellow: { border: "border-yellow-200 dark:border-yellow-900/40", icon: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400", value: "text-yellow-700 dark:text-yellow-300" },
  green:  { border: "border-green-200 dark:border-green-900/40",  icon: "bg-green-500/10 text-green-600 dark:text-green-400",  value: "text-green-700 dark:text-green-300" },
  orange: { border: "border-orange-200 dark:border-orange-900/40", icon: "bg-orange-500/10 text-orange-600 dark:text-orange-400", value: "text-orange-700 dark:text-orange-300" },
  red:    { border: "border-red-200 dark:border-red-900/40",    icon: "bg-red-500/10 text-red-600 dark:text-red-400",    value: "text-red-700 dark:text-red-300" },
  gray:   { border: "border-border",                             icon: "bg-muted text-muted-foreground",                       value: "text-foreground" },
} as const;

export type StatCardColor = keyof typeof COLOR_MAP;

interface StatCardProps {
  label: string;
  value: number;
  color: StatCardColor;
  icon: React.ReactNode;
}

export function StatCard({ label, value, color, icon }: StatCardProps) {
  const c = COLOR_MAP[color];
  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-2xl border bg-card p-4",
      c.border
    )}>
      <div className="flex items-center justify-between gap-2">
        <div className={cn("flex size-8 items-center justify-center rounded-xl", c.icon)}>
          {icon}
        </div>
      </div>
      <div>
        <p className={cn("text-2xl font-bold tabular-nums leading-none", c.value)}>{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function AdminStatsRow({ stats }: { stats: ReportStats }) {
  const { t } = useLanguage();
  const s = t.admin.stats;
  const cards: (StatCardProps)[] = [
    { label: s.total,      value: stats.total,      color: "gray",   icon: <ClipboardList className="size-4" /> },
    { label: s.pending,    value: stats.pending,    color: "yellow", icon: <Clock className="size-4" /> },
    { label: s.verified,   value: stats.verified,   color: "blue",   icon: <CheckCircle2 className="size-4" /> },
    { label: s.inProgress, value: stats.inProgress, color: "orange", icon: <ArrowUpCircle className="size-4" /> },
    { label: s.resolved,   value: stats.resolved,   color: "green",  icon: <CheckCheck className="size-4" /> },
    { label: s.rejected,   value: stats.rejected,   color: "red",    icon: <XCircle className="size-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
