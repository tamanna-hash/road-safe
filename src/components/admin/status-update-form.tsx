"use client";

/**
 * StatusUpdateForm — inline form for changing a report's status.
 * Shows only valid next statuses based on VALID_STATUS_TRANSITIONS.
 * Terminal statuses (RESOLVED, REJECTED) disable the form.
 */

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/badges";
import { VALID_STATUS_TRANSITIONS, STATUS_LABELS } from "@/lib/constants";
import type { Report, ReportStatus } from "@/types";

interface StatusUpdateFormProps {
  report: Report;
  onUpdate: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onCancel?: () => void;
}

export function StatusUpdateForm({ report, onUpdate, onCancel }: StatusUpdateFormProps) {
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | "">("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validTransitions = VALID_STATUS_TRANSITIONS[report.status];
  const isTerminal = validTransitions.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;
    setIsSubmitting(true);
    // Small delay to show loading state (localStorage is synchronous)
    await new Promise((r) => setTimeout(r, 300));
    onUpdate(report.id, selectedStatus as ReportStatus, note.trim() || undefined);
    setIsSubmitting(false);
    setSelectedStatus("");
    setNote("");
  };

  if (isTerminal) {
    return (
      <div className="rounded-lg bg-muted/50 p-3 text-center">
        <p className="text-xs text-muted-foreground">
          This report is in a terminal state (<strong>{STATUS_LABELS[report.status]}</strong>)
          and cannot be updated further.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Current status */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Current status:</span>
        <StatusBadge status={report.status} />
      </div>

      {/* New status select */}
      <div className="space-y-1.5">
        <Label htmlFor={`status-${report.id}`} className="text-xs">
          Update status to
        </Label>
        <Select
          value={selectedStatus}
          onValueChange={(val) => setSelectedStatus(val as ReportStatus)}
        >
          <SelectTrigger id={`status-${report.id}`} className="w-full text-xs h-8">
            <SelectValue placeholder="Select new status…" />
          </SelectTrigger>
          <SelectContent>
            {(validTransitions as ReportStatus[]).map((s) => (
              <SelectItem key={s} value={s} className="text-xs">
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Admin note */}
      <div className="space-y-1.5">
        <Label htmlFor={`note-${report.id}`} className="text-xs">
          Admin note <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id={`note-${report.id}`}
          placeholder="Add a note for the reporter…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="text-xs resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          disabled={!selectedStatus || isSubmitting}
          className="gap-1.5 flex-1"
        >
          {isSubmitting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="size-3.5" />
          )}
          {isSubmitting ? "Updating…" : "Update status"}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
