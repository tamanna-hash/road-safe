"use client";

/**
 * ReportForm — full road safety report submission form.
 *
 * Uses React Hook Form + Zod for validation.
 * Saves to localStorage via the useReports hook on valid submission.
 * Shows a success state with a link to view the report on the map.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationPicker } from "@/components/reports/location-picker";
import { ImageUpload } from "@/components/reports/image-upload";

import { reportFormSchema, type ReportFormValues } from "@/lib/report-schema";
import { useReports } from "@/hooks/use-reports";
import { CATEGORY_LABELS, SEVERITY_LABELS } from "@/lib/constants";
import { ReportCategory, Severity, type Report } from "@/types";
import type { ReportFormData } from "@/types";

// ---------------------------------------------------------------------------
// Field wrapper — label + input + error message
// ---------------------------------------------------------------------------

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertTriangle className="size-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

function SuccessState({
  report,
  onReset,
}: {
  report: Report;
  onReset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
        <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Report submitted!
        </h2>
        <p className="text-muted-foreground max-w-sm">
          Your report has been saved and is now visible on the map as a pending
          community submission.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          ID: {report.id}
        </p>
      </div>

      {/* Demo notice */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-300 max-w-sm">
        <strong>Demo: </strong>Report saved to your browser's localStorage. No
        data was sent to any server.
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={() => router.push("/explore")}
          className="gap-2"
        >
          <MapPin className="size-4" />
          View on map
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" onClick={onReset}>
          Submit another report
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main form component
// ---------------------------------------------------------------------------

export function ReportForm() {
  const { submitReport } = useReports();
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: undefined,
      category: undefined,
      severity: undefined,
      imageFile: undefined,
    },
  });

  const descriptionValue = watch("description") ?? "";

  const onSubmit = async (data: ReportFormValues) => {
    setSubmitError(null);
    try {
      const formData: ReportFormData = {
        title: data.title,
        description: data.description,
        location: data.location!,
        category: data.category as ReportFormData["category"],
        severity: data.severity as ReportFormData["severity"],
        imageFile: data.imageFile ?? undefined,
      };
      const newReport = await submitReport(formData);
      setSubmittedReport(newReport);
    } catch {
      setSubmitError(
        "Something went wrong while saving your report. Please try again."
      );
    }
  };

  const handleReset = () => {
    setSubmittedReport(null);
    setSubmitError(null);
    reset();
  };

  // ---- Success state -------------------------------------------------------
  if (submittedReport) {
    return <SuccessState report={submittedReport} onReset={handleReset} />;
  }

  // ---- Form ----------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Submit error */}
      {submitError && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Submission failed</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Title */}
      <Field
        label="Issue title"
        htmlFor="title"
        required
        error={errors.title?.message}
        hint="A short, clear description of the problem (e.g. 'Large pothole on Mirpur Road')"
      >
        <Input
          id="title"
          placeholder="e.g. Deep pothole causing accidents near Farmgate"
          aria-invalid={!!errors.title}
          {...register("title")}
        />
      </Field>

      {/* Category */}
      <Field
        label="Issue category"
        htmlFor="category"
        required
        error={errors.category?.message}
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={(val) => field.onChange(val)}
            >
              <SelectTrigger
                id="category"
                className="w-full"
                aria-invalid={!!errors.category}
              >
                <SelectValue placeholder="Select a category…" />
              </SelectTrigger>
              <SelectContent>
                {(Object.values(ReportCategory) as string[]).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Severity */}
      <Field
        label="Severity level"
        htmlFor="severity"
        required
        error={errors.severity?.message}
        hint="How dangerous is this issue right now?"
      >
        <Controller
          name="severity"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={(val) => field.onChange(val)}
            >
              <SelectTrigger
                id="severity"
                className="w-full"
                aria-invalid={!!errors.severity}
              >
                <SelectValue placeholder="Select severity…" />
              </SelectTrigger>
              <SelectContent>
                {(Object.values(Severity) as string[]).map((sev) => (
                  <SelectItem key={sev} value={sev}>
                    {SEVERITY_LABELS[sev as keyof typeof SEVERITY_LABELS]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Description */}
      <Field
        label="Description"
        htmlFor="description"
        required
        error={errors.description?.message}
        hint="Describe the hazard in detail — what it looks like, when it's dangerous, who is at risk."
      >
        <div className="space-y-1">
          <Textarea
            id="description"
            placeholder="Describe the road safety issue in detail…"
            rows={4}
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          <p className="text-right text-xs text-muted-foreground">
            {descriptionValue.length} / 1000
          </p>
        </div>
      </Field>

      {/* Location */}
      <Field
        label="Location"
        required
        error={errors.location?.message}
        hint="Click 'Pick on map' to drop a pin, or use your device's GPS location."
      >
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <LocationPicker
              value={field.value ?? null}
              onChange={(loc) => field.onChange(loc)}
              error={errors.location?.message}
            />
          )}
        />
      </Field>

      {/* Image upload */}
      <Field
        label="Photo (optional)"
        error={errors.imageFile?.message}
        hint="Attach a photo of the hazard to help reviewers understand the issue."
      >
        <Controller
          name="imageFile"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value ?? null}
              onChange={(file) => field.onChange(file)}
              error={errors.imageFile?.message}
            />
          )}
        />
      </Field>

      {/* Demo notice */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300">
        <strong>Demo: </strong>This report will be saved to your browser's
        localStorage only. No data is sent to any server. The report will appear
        on the map with a Pending status.
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gap-2"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <AlertTriangle className="size-4" />
            Submit Report
          </>
        )}
      </Button>
    </form>
  );
}
