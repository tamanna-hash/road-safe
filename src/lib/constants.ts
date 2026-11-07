/**
 * Application-wide constants for RoadSafe.
 *
 * All human-readable labels, colour mappings, and configuration values
 * live here so they can be updated in one place and shared everywhere.
 */

import {
  ReportCategory,
  ReportStatus,
  Severity,
  type ReportCategory as ReportCategoryType,
  type ReportStatus as ReportStatusType,
  type Severity as SeverityType,
} from "@/types";

// ---------------------------------------------------------------------------
// App metadata
// ---------------------------------------------------------------------------

export const APP_NAME = "RoadSafe";
export const APP_DESCRIPTION =
  "Community road safety awareness and accident hotspot reporting platform.";

/**
 * Demo disclaimer — must be displayed wherever sample data appears.
 * Never present this data as official accident statistics.
 */
export const DEMO_DISCLAIMER =
  "This platform displays community-submitted sample data for demonstration purposes only. " +
  "Reports are not official accident statistics and have not been verified by any government authority.";

// ---------------------------------------------------------------------------
// Demo user
// ---------------------------------------------------------------------------

/**
 * Simulated reporter identity used when no real auth exists.
 * Displayed on submitted reports in My Reports.
 */
export const DEMO_USER_ID = "demo-user-001";
export const DEMO_USER_NAME = "Demo Reporter";

// ---------------------------------------------------------------------------
// Map defaults — centred on Dhaka, Bangladesh
// ---------------------------------------------------------------------------

export const MAP_DEFAULT_CENTER: [number, number] = [23.7751, 90.3990];
export const MAP_DEFAULT_ZOOM = 7;
export const MAP_MIN_ZOOM = 6;
export const MAP_MAX_ZOOM = 18;

/**
 * Geographic bounds for Bangladesh.
 * Prevents users from panning outside the country.
 * [southWest, northEast] in [lat, lng] format.
 */
export const MAP_MAX_BOUNDS: [[number, number], [number, number]] = [
  [20.3, 87.9],   // south-west corner (with padding)
  [26.8, 92.8],   // north-east corner (with padding)
];

/**
 * Tighter tile bounds — only request tiles that cover Bangladesh.
 * This prevents the tile layer from loading tiles for the whole world.
 */
export const MAP_TILE_BOUNDS: [[number, number], [number, number]] = [
  [20.5, 88.0],
  [26.7, 92.7],
];

export const TILE_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// ---------------------------------------------------------------------------
// localStorage keys
// ---------------------------------------------------------------------------

export const STORAGE_KEY_REPORTS = "roadsafe_reports";
export const STORAGE_KEY_VERSION = "roadsafe_data_version";
export const STORAGE_DATA_VERSION = "2"; // bumped: added district field to all reports

// ---------------------------------------------------------------------------
// Report category labels & colours
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<ReportCategoryType, string> = {
  [ReportCategory.POTHOLE]: "Pothole",
  [ReportCategory.POOR_LIGHTING]: "Poor Lighting",
  [ReportCategory.MISSING_SIGNAGE]: "Missing Signage",
  [ReportCategory.ROAD_FLOODING]: "Road Flooding",
  [ReportCategory.DANGEROUS_CURVE]: "Dangerous Curve",
  [ReportCategory.ROAD_DAMAGE]: "Road Damage",
  [ReportCategory.BLOCKED_ROAD]: "Blocked Road",
  [ReportCategory.OTHER]: "Other",
};

/**
 * Tailwind background colour classes for category badges.
 * Using specific classes (not dynamic strings) so Tailwind includes them in the build.
 */
export const CATEGORY_COLORS: Record<ReportCategoryType, string> = {
  [ReportCategory.POTHOLE]: "bg-orange-100 text-orange-800",
  [ReportCategory.POOR_LIGHTING]: "bg-yellow-100 text-yellow-800",
  [ReportCategory.MISSING_SIGNAGE]: "bg-purple-100 text-purple-800",
  [ReportCategory.ROAD_FLOODING]: "bg-blue-100 text-blue-800",
  [ReportCategory.DANGEROUS_CURVE]: "bg-red-100 text-red-800",
  [ReportCategory.ROAD_DAMAGE]: "bg-amber-100 text-amber-800",
  [ReportCategory.BLOCKED_ROAD]: "bg-gray-100 text-gray-800",
  [ReportCategory.OTHER]: "bg-slate-100 text-slate-800",
};

/** Hex colours used for Leaflet map markers (one per category). */
export const CATEGORY_MARKER_COLORS: Record<ReportCategoryType, string> = {
  [ReportCategory.POTHOLE]: "#f97316",       // orange-500
  [ReportCategory.POOR_LIGHTING]: "#eab308",  // yellow-500
  [ReportCategory.MISSING_SIGNAGE]: "#a855f7", // purple-500
  [ReportCategory.ROAD_FLOODING]: "#3b82f6",  // blue-500
  [ReportCategory.DANGEROUS_CURVE]: "#ef4444", // red-500
  [ReportCategory.ROAD_DAMAGE]: "#d97706",    // amber-600
  [ReportCategory.BLOCKED_ROAD]: "#6b7280",   // gray-500
  [ReportCategory.OTHER]: "#64748b",          // slate-500
};

// ---------------------------------------------------------------------------
// Severity labels & colours
// ---------------------------------------------------------------------------

export const SEVERITY_LABELS: Record<SeverityType, string> = {
  [Severity.LOW]: "Low",
  [Severity.MEDIUM]: "Medium",
  [Severity.HIGH]: "High",
  [Severity.CRITICAL]: "Critical",
};

export const SEVERITY_COLORS: Record<SeverityType, string> = {
  [Severity.LOW]: "bg-green-100 text-green-800",
  [Severity.MEDIUM]: "bg-yellow-100 text-yellow-800",
  [Severity.HIGH]: "bg-orange-100 text-orange-800",
  [Severity.CRITICAL]: "bg-red-100 text-red-800",
};

/** Used to sort reports by severity (higher = more severe). */
export const SEVERITY_ORDER: Record<SeverityType, number> = {
  [Severity.LOW]: 1,
  [Severity.MEDIUM]: 2,
  [Severity.HIGH]: 3,
  [Severity.CRITICAL]: 4,
};

// ---------------------------------------------------------------------------
// Report status labels, colours & descriptions
// ---------------------------------------------------------------------------

export const STATUS_LABELS: Record<ReportStatusType, string> = {
  [ReportStatus.PENDING]: "Pending",
  [ReportStatus.VERIFIED]: "Verified",
  [ReportStatus.IN_PROGRESS]: "In Progress",
  [ReportStatus.RESOLVED]: "Resolved",
  [ReportStatus.REJECTED]: "Rejected",
};

export const STATUS_COLORS: Record<ReportStatusType, string> = {
  [ReportStatus.PENDING]: "bg-gray-100 text-gray-700",
  [ReportStatus.VERIFIED]: "bg-blue-100 text-blue-800",
  [ReportStatus.IN_PROGRESS]: "bg-yellow-100 text-yellow-800",
  [ReportStatus.RESOLVED]: "bg-green-100 text-green-800",
  [ReportStatus.REJECTED]: "bg-red-100 text-red-800",
};

export const STATUS_DESCRIPTIONS: Record<ReportStatusType, string> = {
  [ReportStatus.PENDING]: "Report received and awaiting review.",
  [ReportStatus.VERIFIED]: "Issue has been confirmed by a reviewer.",
  [ReportStatus.IN_PROGRESS]: "Repair or remediation work is underway.",
  [ReportStatus.RESOLVED]: "The reported issue has been addressed.",
  [ReportStatus.REJECTED]:
    "Report was not accepted (duplicate, insufficient detail, or out of scope).",
};

/**
 * Valid status transitions — an admin may only move a report to these
 * next statuses from the current one. Prevents nonsensical jumps.
 */
export const VALID_STATUS_TRANSITIONS: Record<ReportStatusType, ReportStatusType[]> = {
  [ReportStatus.PENDING]: [
    ReportStatus.VERIFIED,
    ReportStatus.REJECTED,
  ],
  [ReportStatus.VERIFIED]: [
    ReportStatus.IN_PROGRESS,
    ReportStatus.REJECTED,
  ],
  [ReportStatus.IN_PROGRESS]: [
    ReportStatus.RESOLVED,
    ReportStatus.REJECTED,
  ],
  [ReportStatus.RESOLVED]: [],   // terminal state
  [ReportStatus.REJECTED]: [],   // terminal state
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const DEFAULT_PAGE_SIZE = 10;

// ---------------------------------------------------------------------------
// Districts — all 64 districts of Bangladesh
// Each entry: { en, bn, division }
// ---------------------------------------------------------------------------

export interface DistrictInfo {
  en: string;
  bn: string;
  division: string;
}

export const DISTRICTS: DistrictInfo[] = [
  // Dhaka Division
  { en: "Dhaka",        bn: "ঢাকা",        division: "Dhaka" },
  { en: "Gazipur",      bn: "গাজীপুর",     division: "Dhaka" },
  { en: "Narayanganj",  bn: "নারায়ণগঞ্জ",  division: "Dhaka" },
  { en: "Munshiganj",   bn: "মুন্সীগঞ্জ",  division: "Dhaka" },
  { en: "Manikganj",    bn: "মানিকগঞ্জ",   division: "Dhaka" },
  { en: "Narsingdi",    bn: "নরসিংদী",     division: "Dhaka" },
  { en: "Kishoreganj",  bn: "কিশোরগঞ্জ",   division: "Dhaka" },
  { en: "Tangail",      bn: "টাঙ্গাইল",    division: "Dhaka" },
  { en: "Gopalganj",    bn: "গোপালগঞ্জ",   division: "Dhaka" },
  { en: "Madaripur",    bn: "মাদারীপুর",   division: "Dhaka" },
  { en: "Shariatpur",   bn: "শরীয়তপুর",   division: "Dhaka" },
  { en: "Faridpur",     bn: "ফরিদপুর",     division: "Dhaka" },
  { en: "Rajbari",      bn: "রাজবাড়ী",    division: "Dhaka" },
  // Mymensingh Division
  { en: "Mymensingh",   bn: "ময়মনসিংহ",   division: "Mymensingh" },
  { en: "Jamalpur",     bn: "জামালপুর",    division: "Mymensingh" },
  { en: "Sherpur",      bn: "শেরপুর",      division: "Mymensingh" },
  { en: "Netrokona",    bn: "নেত্রকোনা",   division: "Mymensingh" },
  // Chittagong Division
  { en: "Chattogram",   bn: "চট্টগ্রাম",   division: "Chittagong" },
  { en: "Cox's Bazar",  bn: "কক্সবাজার",   division: "Chittagong" },
  { en: "Bandarban",    bn: "বান্দরবান",   division: "Chittagong" },
  { en: "Rangamati",    bn: "রাঙামাটি",    division: "Chittagong" },
  { en: "Khagrachhari", bn: "খাগড়াছড়ি",  division: "Chittagong" },
  { en: "Feni",         bn: "ফেনী",        division: "Chittagong" },
  { en: "Noakhali",     bn: "নোয়াখালী",   division: "Chittagong" },
  { en: "Lakshmipur",   bn: "লক্ষ্মীপুর", division: "Chittagong" },
  { en: "Chandpur",     bn: "চাঁদপুর",    division: "Chittagong" },
  { en: "Cumilla",      bn: "কুমিল্লা",   division: "Chittagong" },
  { en: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া", division: "Chittagong" },
  // Sylhet Division
  { en: "Sylhet",       bn: "সিলেট",      division: "Sylhet" },
  { en: "Habiganj",     bn: "হবিগঞ্জ",    division: "Sylhet" },
  { en: "Moulvibazar",  bn: "মৌলভীবাজার", division: "Sylhet" },
  { en: "Sunamganj",    bn: "সুনামগঞ্জ",  division: "Sylhet" },
  // Rajshahi Division
  { en: "Rajshahi",     bn: "রাজশাহী",    division: "Rajshahi" },
  { en: "Chapai Nawabganj", bn: "চাঁপাই নবাবগঞ্জ", division: "Rajshahi" },
  { en: "Natore",       bn: "নাটোর",      division: "Rajshahi" },
  { en: "Bogura",       bn: "বগুড়া",      division: "Rajshahi" },
  { en: "Joypurhat",    bn: "জয়পুরহাট",  division: "Rajshahi" },
  { en: "Naogaon",      bn: "নওগাঁ",      division: "Rajshahi" },
  { en: "Sirajganj",    bn: "সিরাজগঞ্জ",  division: "Rajshahi" },
  { en: "Pabna",        bn: "পাবনা",      division: "Rajshahi" },
  // Rangpur Division
  { en: "Rangpur",      bn: "রংপুর",      division: "Rangpur" },
  { en: "Dinajpur",     bn: "দিনাজপুর",   division: "Rangpur" },
  { en: "Thakurgaon",   bn: "ঠাকুরগাঁও",  division: "Rangpur" },
  { en: "Panchagarh",   bn: "পঞ্চগড়",    division: "Rangpur" },
  { en: "Nilphamari",   bn: "নীলফামারী",  division: "Rangpur" },
  { en: "Lalmonirhat",  bn: "লালমনিরহাট", division: "Rangpur" },
  { en: "Gaibandha",    bn: "গাইবান্ধা",  division: "Rangpur" },
  { en: "Kurigram",     bn: "কুড়িগ্রাম",  division: "Rangpur" },
  // Khulna Division
  { en: "Khulna",       bn: "খুলনা",      division: "Khulna" },
  { en: "Bagerhat",     bn: "বাগেরহাট",   division: "Khulna" },
  { en: "Satkhira",     bn: "সাতক্ষীরা",  division: "Khulna" },
  { en: "Jashore",      bn: "যশোর",       division: "Khulna" },
  { en: "Magura",       bn: "মাগুরা",     division: "Khulna" },
  { en: "Narail",       bn: "নড়াইল",     division: "Khulna" },
  { en: "Chuadanga",    bn: "চুয়াডাঙ্গা", division: "Khulna" },
  { en: "Meherpur",     bn: "মেহেরপুর",   division: "Khulna" },
  { en: "Kushtia",      bn: "কুষ্টিয়া",  division: "Khulna" },
  { en: "Jhenaidah",    bn: "ঝিনাইদহ",   division: "Khulna" },
  // Barisal Division
  { en: "Barishal",     bn: "বরিশাল",    division: "Barisal" },
  { en: "Bhola",        bn: "ভোলা",      division: "Barisal" },
  { en: "Patuakhali",   bn: "পটুয়াখালী", division: "Barisal" },
  { en: "Barguna",      bn: "বরগুনা",    division: "Barisal" },
  { en: "Pirojpur",     bn: "পিরোজপুর",  division: "Barisal" },
  { en: "Jhalokati",    bn: "ঝালকাঠি",   division: "Barisal" },
];

/** Quick lookup: district English name → Bangla name */
export const DISTRICT_BN: Record<string, string> = Object.fromEntries(
  DISTRICTS.map((d) => [d.en, d.bn])
);
