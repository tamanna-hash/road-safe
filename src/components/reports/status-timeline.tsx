"use client";

/**
 * StatusTimeline — visual step-by-step progress tracker for a report.
 *
 * Shows the standard progression:
 *   PENDING → VERIFIED → IN_PROGRESS → RESOLVED
 *
 * If the report is REJECTED at any point, shows a rejection branch
 * after the current step.
 */

import {
  Clock, CheckCircle2, ArrowUpCircle, CheckCheck, XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from "@/lib/constants";
import type { Report } from "@/types";

// ---------------------------------------------------------------------------
// Step definitions — the standard forward path
// ---------------------------------------------------------------------------

const FORWARD_STEPS = [
  {
    status: "PENDING" as const,
    icon: Clock,
    color: {
      done:    "bg-gray-500 text-white",
      current: "bg-gray-500 text-white ring-4 ring-gray-200",
      future:  "bg-gray-100 text-gray-400",
    },
    connector: { done: "bg-gray-400", future: "bg-gray-200" },
  },
  {
    status: "VERIFIED" as const,
    icon: CheckCircle2,
    color: {
      done:    "bg-blue-500 text-white",
      current: "bg-blue-500 text-white ring-4 ring-blue-200",
      future:  "bg-gray-100 text-gray-400",
    },
    connector: { done: "bg-blue-400", future: "bg-gray-200" },
  },
  {
    status: "IN_PROGRESS" as const,
    icon: ArrowUpCircle,
    color: {
      done:    "bg-yellow-500 text-white",
      current: "bg-yellow-500 text-white ring-4 ring-yellow-200",
      future:  "bg-gray-100 text-gray-400",
    },
    connector: { done: "bg-yellow-400", future: "bg-gray-200" },
  },
  {
    status: "RESOLVED" as const,
    icon: CheckCheck,
    color: {
      done:    "bg-green-500 text-white",
      current: "bg-green-500 text-white ring-4 ring-green-200",
      future:  "bg-gray-100 text-gray-400",
    },
    connector: { done: "bg-green-400", future: "bg-gray-200" },
  },
];

// Status order for determining "completeness"
const STATUS_ORDER: Record<string, number> = {
  PENDING: 0,
  VERIFIED: 1,
  IN_PROGRESS: 2,
  RESOLVED: 3,
  REJECTED: -1,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function StatusTimeline({ report }: { report: Report }) {
  const isRejected = report.status === "REJECTED";
  const currentOrder = STATUS_ORDER[report.status] ?? 0;

  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        Report Progress
      </p>

      {/* Forward path steps */}
      <div className="flex items-start gap-0">
        {FORWARD_STEPS.map((step, idx) => {
          const stepOrder = STATUS_ORDER[step.status];
          const isDone    = !isRejected && stepOrder < currentOrder;
          const isCurrent = !isRejected && step.status === report.status;
          const isFuture  = isRejected || stepOrder > currentOrder;
          const isLast    = idx === FORWARD_STEPS.length - 1;

          const colorClass = isDone
            ? step.color.done
            : isCurrent
            ? step.color.current
            : step.color.future;

          const Icon = step.icon;

          return (
            <div key={step.status} className="flex items-start flex-1">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full transition-all",
                    colorClass
                  )}
                  title={STATUS_LABELS[step.status]}
                >
                  <Icon className="size-4" />
                </div>
                <p className={cn(
                  "mt-1 text-center text-[10px] font-medium leading-tight w-14",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {STATUS_LABELS[step.status]}
                </p>
              </div>

              {/* Connector line (except after last step) */}
              {!isLast && (
                <div
                  className={cn(
                    "mt-4 h-0.5 flex-1",
                    isDone ? step.connector.done : step.connector.future
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Rejection branch */}
      {isRejected && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/40 dark:bg-red-950/20">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white ring-4 ring-red-200">
            <XCircle className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              {STATUS_LABELS.REJECTED}
            </p>
            <p className="mt-0.5 text-xs text-red-700/80 dark:text-red-400">
              {STATUS_DESCRIPTIONS.REJECTED}
            </p>
            {report.adminNote && (
              <p className="mt-1.5 text-xs text-red-700 dark:text-red-300 italic">
                Admin note: {report.adminNote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Current status description */}
      {!isRejected && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {STATUS_DESCRIPTIONS[report.status]}
        </p>
      )}
    </div>
  );
}
