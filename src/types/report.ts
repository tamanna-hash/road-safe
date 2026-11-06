/**
 * Core domain types for the RoadSafe application.
 *
 * These types are shared across all features: the map, the report form,
 * the admin dashboard, and the My Reports tracking page.
 */

// ---------------------------------------------------------------------------
// Enums — using const objects instead of TypeScript enums so that the
// values are plain strings at runtime (easier to store in localStorage).
// ---------------------------------------------------------------------------

export const ReportStatus = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
} as const;

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

// ---------------------------------------------------------------------------

export const ReportCategory = {
  POTHOLE: "POTHOLE",
  POOR_LIGHTING: "POOR_LIGHTING",
  MISSING_SIGNAGE: "MISSING_SIGNAGE",
  ROAD_FLOODING: "ROAD_FLOODING",
  DANGEROUS_CURVE: "DANGEROUS_CURVE",
  ROAD_DAMAGE: "ROAD_DAMAGE",
  BLOCKED_ROAD: "BLOCKED_ROAD",
  OTHER: "OTHER",
} as const;

export type ReportCategory = (typeof ReportCategory)[keyof typeof ReportCategory];

// ---------------------------------------------------------------------------

export const Severity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type Severity = (typeof Severity)[keyof typeof Severity];

// ---------------------------------------------------------------------------
// Data shapes
// ---------------------------------------------------------------------------

/**
 * A geographic location with coordinates and an optional human-readable address.
 */
export interface Location {
  /** Latitude in decimal degrees */
  lat: number;
  /** Longitude in decimal degrees */
  lng: number;
  /** Human-readable address or landmark name (optional) */
  address?: string;
}

/**
 * A single road safety report — the central data object of the application.
 *
 * IMPORTANT: This is community-submitted or sample demonstration data.
 * It must never be presented as official accident statistics or verified
 * government data.
 */
export interface Report {
  /** Unique identifier, generated client-side (e.g. crypto.randomUUID) */
  id: string;

  /** Short title summarising the issue */
  title: string;

  /** Detailed description provided by the reporter */
  description: string;

  /** Where the issue was observed */
  location: Location;

  /** Type of road safety issue */
  category: ReportCategory;

  /** How severe the reporter believes the issue to be */
  severity: Severity;

  /** Current status in the review workflow */
  status: ReportStatus;

  /** ISO-8601 timestamp of when the report was submitted */
  submittedAt: string;

  /** ISO-8601 timestamp of when the status was last changed (optional) */
  updatedAt?: string;

  /**
   * Demo-user identifier.
   * This is a simulated identity — there is no real authentication in this
   * frontend demonstration.
   */
  submittedBy: string;

  /**
   * Optional base64-encoded image or a URL to an uploaded photo.
   * Stored in localStorage for demo purposes only.
   */
  imageUrl?: string;

  /**
   * Free-text note added by an admin when updating the status.
   * Helps reporters understand what action was taken.
   */
  adminNote?: string;
}

// ---------------------------------------------------------------------------
// Form / input types
// ---------------------------------------------------------------------------

/**
 * The data collected by the report submission form.
 * Does not include server-assigned fields (id, status, submittedAt, etc.).
 */
export type ReportFormData = Pick<
  Report,
  "title" | "description" | "location" | "category" | "severity"
> & {
  /** Raw File object from the image upload input (optional) */
  imageFile?: File;
};

// ---------------------------------------------------------------------------
// Filter types — used by the map and report list
// ---------------------------------------------------------------------------

export interface ReportFilters {
  categories: ReportCategory[];
  severities: Severity[];
  statuses: ReportStatus[];
  /** When true, show only reports that have been verified (status !== PENDING && status !== REJECTED) */
  verifiedOnly: boolean;
  searchQuery: string;
}

// ---------------------------------------------------------------------------
// Stats type — used by the admin dashboard
// ---------------------------------------------------------------------------

export interface ReportStats {
  total: number;
  pending: number;
  verified: number;
  inProgress: number;
  resolved: number;
  rejected: number;
}
