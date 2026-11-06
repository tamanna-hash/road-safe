/**
 * Zod validation schema for the report submission form.
 *
 * Kept separate from the form component so it can be imported and
 * tested independently. The inferred type is the single source of
 * truth for what React Hook Form manages.
 */

import { z } from "zod";
import { ReportCategory, Severity } from "@/types";

// ---------------------------------------------------------------------------
// Location sub-schema
// ---------------------------------------------------------------------------

const locationSchema = z.object({
  lat: z
    .number({ invalid_type_error: "Latitude must be a number" })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lng: z
    .number({ invalid_type_error: "Longitude must be a number" })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  address: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Main report form schema
// ---------------------------------------------------------------------------

export const reportFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be 100 characters or less")
    .trim(),

  description: z
    .string()
    .min(20, "Please describe the issue in at least 20 characters")
    .max(1000, "Description must be 1000 characters or less")
    .trim(),

  location: locationSchema.nullable().refine((val) => val !== null, {
    message: "Please select a location on the map",
  }),

  category: z.enum(
    Object.values(ReportCategory) as [string, ...string[]],
    { errorMap: () => ({ message: "Please select a category" }) }
  ),

  severity: z.enum(
    Object.values(Severity) as [string, ...string[]],
    { errorMap: () => ({ message: "Please select a severity level" }) }
  ),

  // imageFile is optional — not validated strictly, just type-checked
  imageFile: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5 MB max
      },
      { message: "Image must be 5 MB or smaller" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type
        );
      },
      { message: "Image must be JPEG, PNG, WebP, or GIF" }
    ),
});

// ---------------------------------------------------------------------------
// Inferred TypeScript type — used by React Hook Form
// ---------------------------------------------------------------------------

export type ReportFormValues = z.infer<typeof reportFormSchema>;
