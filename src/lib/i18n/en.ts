/**
 * English translation dictionary.
 * All user-facing strings in the application.
 */
export const en = {
  // ── App ──────────────────────────────────────────────────────────────────
  app: {
    name: "RoadSafe",
    tagline: "Bangladesh Road Safety Platform",
    demoNotice: "This is a frontend demonstration. All data is stored locally in your browser — no server is involved.",
    demoNoticeShort: "Demo app · Data stored in browser localStorage · No server required",
    demoAdmin: "Simulated admin interface — no real authentication or access control. Changes persist only in your browser.",
    demoIdentity: (name: string) => `Showing reports attributed to "${name}" — simulated identity, no real authentication.`,
  },

  // ── Navigation ───────────────────────────────────────────────────────────
  nav: {
    exploreMap: "Explore Map",
    reports: "Reports",
    reportIssue: "Report Issue",
    myReports: "My Reports",
    admin: "Admin",
    openMenu: "Open menu",
  },

  // ── Home page ────────────────────────────────────────────────────────────
  home: {
    hero: {
      badge: "Bangladesh Road Safety Platform",
      headline1: "Safer Roads Start With",
      headline2: "Community Reports",
      subheadline: "RoadSafe lets anyone report dangerous road conditions, track their status, and help make Bangladesh's roads safer — one report at a time.",
      ctaExplore: "Explore the Map",
      ctaReport: "Report an Issue",
      demoNote: "Frontend demonstration · Data stored in browser localStorage · No server required",
    },
    stats: {
      sampleReports: "Demo Reports",
      categories: "Categories",
      statusStages: "Status Stages",
    },
    features: {
      heading: "Everything in one place",
      subheading: "Five features working together to improve road safety awareness.",
      explore: { title: "Explore the Map", desc: "Browse road safety reports on an interactive map. Filter by category, severity, and verification status.", cta: "Open Map" },
      reports: { title: "All Reports", desc: "Search and filter the full list of community-submitted road safety reports.", cta: "View Reports" },
      report:  { title: "Report an Issue", desc: "Spotted a road hazard? Submit a report with location, category, and a photo.", cta: "Submit Report" },
      myReports: { title: "Track Your Reports", desc: "Follow the progress of your submissions through a clear status timeline.", cta: "My Reports" },
      admin:   { title: "Admin Dashboard", desc: "Review reports, update statuses, and monitor resolution progress.", cta: "Dashboard" },
    },
    howItWorks: {
      heading: "How it works",
      subheading: "Three steps from spotting a hazard to seeing it resolved.",
      step1: { title: "Submit a Report", desc: "Pin the location on the map, describe the hazard, pick a category and severity, and optionally attach a photo." },
      step2: { title: "Review & Verify", desc: "An administrator reviews the report and marks it Verified, In Progress, or Resolved — with an explanatory note." },
      step3: { title: "Track Progress", desc: "Open My Reports to see the current status and any admin updates on every report you've submitted." },
    },
  },

  // ── Explore page ─────────────────────────────────────────────────────────
  explore: {
    title: "Explore Map",
    loadingMap: "Loading map…",
    reportCount: (n: number, total: number) => `${n} of ${total} report${total !== 1 ? "s" : ""}`,
    legend: { unverified: "Unverified", verified: "Verified", critical: "Critical" },
    disclaimer: "This platform displays community-submitted sample data for demonstration purposes only. Reports are not official accident statistics.",
    emptyState: {
      title: "No reports match your filters",
      desc: "Try adjusting or clearing the active filters.",
      clearFilters: "Clear filters",
    },
  },

  // ── Filters ───────────────────────────────────────────────────────────────
  filters: {
    filtersLabel: "Filters",
    category: "Category",
    severity: "Severity",
    district: "District",
    verification: "Verification",
    verifiedOnly: "✓ Verified only",
    clearAll: "Clear",
    clearAllFilters: "Clear all filters",
    ofReports: (n: number, total: number) => `Showing ${n} of ${total} reports`,
  },

  // ── Report form ──────────────────────────────────────────────────────────
  reportForm: {
    pageTitle: "Report a Road Safety Issue",
    pageDesc: "Describe the hazard, pick a location on the map, and submit. Your report appears on the map immediately.",
    title: { label: "Issue title", hint: "A short, clear description of the problem (e.g. 'Large pothole on Mirpur Road')", placeholder: "e.g. Deep pothole causing accidents near Farmgate" },
    category: { label: "Issue category", placeholder: "Select a category…" },
    severity: { label: "Severity level", hint: "How dangerous is this issue right now?", placeholder: "Select severity…" },
    description: { label: "Description", hint: "Describe the hazard in detail — what it looks like, when it's dangerous, who is at risk.", placeholder: "Describe the road safety issue in detail…" },
    location: { label: "Location", hint: "Click 'Pick on map' to drop a pin, or use your device's GPS location." },
    photo: { label: "Photo (optional)", hint: "Attach a photo of the hazard to help reviewers understand the issue." },
    submit: "Submit Report",
    submitting: "Submitting…",
    errorTitle: "Submission failed",
    errorDesc: "Something went wrong while saving your report. Please try again.",
    success: {
      title: "Report submitted!",
      desc: "Your report has been saved and is now visible on the map as a pending community submission.",
      demoNote: "Report saved to your browser only — no data sent to any server.",
      viewOnMap: "View on map",
      submitAnother: "Submit another report",
    },
  },

  // ── Location picker ───────────────────────────────────────────────────────
  locationPicker: {
    pickOnMap: "Pick on map",
    hideMap: "Hide map",
    useMyLocation: "Use my location",
    clear: "Clear",
    mapInstruction: "Click anywhere on the map to pin the location",
    noLocation: 'No location selected. Click "Pick on map" or use your current location.',
  },

  // ── Image upload ──────────────────────────────────────────────────────────
  imageUpload: {
    title: "Add a photo (optional)",
    dropTitle: "Drop the image here",
    hint: "JPEG, PNG, WebP or GIF · max 5 MB",
    chooseFile: "Choose file",
    removePhoto: "Remove photo",
  },

  // ── Reports list ─────────────────────────────────────────────────────────
  reportList: {
    pageTitle: "All Reports",
    pageDesc: "Browse community-submitted road safety reports.",
    viewOnMap: "View on map",
    reportIssue: "Report issue",
    empty: {
      filterTitle: "No reports match your filters",
      filterDesc: "Try removing some filters to see more results.",
      emptyTitle: "No reports yet",
      emptyDesc: "Be the first to report a road safety issue in your area.",
      clearFilters: "Clear all filters",
      submitReport: "Submit a report",
    },
    search: { placeholder: "Search reports…" },
    statusFilter: "Status",
    severityFilter: "Severity",
    results: (n: number, total: number) => `Showing ${n} of ${total} reports`,
  },

  // ── My Reports ───────────────────────────────────────────────────────────
  myReports: {
    pageTitle: "My Reports",
    pageDesc: "Track the progress of your submitted road safety reports.",
    viewOnMap: "View on map",
    newReport: "New report",
    count: (n: number) => `${n} report${n !== 1 ? "s" : ""} · Click any card to expand details`,
    empty: {
      title: "No reports yet",
      desc: "Reports you submit will appear here with a live status timeline.",
      cta: "Submit your first report",
    },
  },

  // ── Report card ───────────────────────────────────────────────────────────
  reportCard: {
    sampleData: "Sample data — not official statistics",
    reportId: "ID",
    submittedOn: "Submitted",
    updatedOn: "Last updated",
    adminNote: "Admin Note",
    photo: "Photo",
    location: "Location",
    coordinatesOnly: "Coordinates only",
    description: "Description",
    demoReporter: "Demo Reporter (simulated identity)",
    progress: "Report Progress",
  },

  // ── Status ────────────────────────────────────────────────────────────────
  status: {
    PENDING: "Pending",
    VERIFIED: "Verified",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    REJECTED: "Rejected",
    descriptions: {
      PENDING: "Report received and awaiting review.",
      VERIFIED: "Issue has been confirmed by a reviewer.",
      IN_PROGRESS: "Repair or remediation work is underway.",
      RESOLVED: "The reported issue has been addressed.",
      REJECTED: "Report was not accepted (duplicate, insufficient detail, or out of scope).",
    },
  },

  // ── Category ──────────────────────────────────────────────────────────────
  category: {
    POTHOLE: "Pothole",
    POOR_LIGHTING: "Poor Lighting",
    MISSING_SIGNAGE: "Missing Signage",
    ROAD_FLOODING: "Road Flooding",
    DANGEROUS_CURVE: "Dangerous Curve",
    ROAD_DAMAGE: "Road Damage",
    BLOCKED_ROAD: "Blocked Road",
    OTHER: "Other",
  },

  // ── Severity ──────────────────────────────────────────────────────────────
  severity: {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: "Critical",
  },

  // ── Admin ─────────────────────────────────────────────────────────────────
  admin: {
    pageTitle: "Admin Dashboard",
    pageDesc: "Review and manage community road safety reports.",
    resetData: "Reset data",
    resetConfirm: "Reset all data to the original sample reports? This cannot be undone.",
    tableTitle: "Reports",
    tableHint: "Use ↓ to update status · 👁 to view details",
    tabs: {
      all: "All",
    },
    statusUpdate: {
      currentStatus: "Current status:",
      updateTo: "Update status to",
      selectStatus: "Select new status…",
      adminNote: "Admin note",
      adminNotePlaceholder: "Add a note for the reporter…",
      adminNoteOptional: "(optional)",
      update: "Update status",
      updating: "Updating…",
      cancel: "Cancel",
      terminal: (status: string) => `This report is in a terminal state (${status}) and cannot be updated further.`,
    },
    stats: {
      total: "Total Reports",
      pending: "Pending",
      verified: "Verified",
      inProgress: "In Progress",
      resolved: "Resolved",
      rejected: "Rejected",
    },
    viewDetails: "View details",
    collapseRow: "Collapse",
    expandRow: "Update status",
  },

  // ── Common actions ────────────────────────────────────────────────────────
  common: {
    close: "Close",
    map: "Map",
    report: "Report",
    back: "Back",
    loading: "Loading…",
    error404: "Page not found",
    error404Desc: "The page you're looking for doesn't exist or has been moved.",
    backToHome: "Back to home",
    seeOnMap: "See on map",
    exploreMap: "Explore map",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "Community road safety awareness and hazard reporting for Bangladesh. A frontend demonstration project.",
    navigation: "Navigation",
    copyright: (year: number | null, name: string) =>
      `© ${year ?? 2026} ${name} · Frontend demonstration · No real data`,
    builtWith: "Built with Next.js · Tailwind CSS · Leaflet · OpenStreetMap",
  },
} as const;

export type TranslationDictionary = typeof en;

// Ensure Bangla dictionary has the same shape as English
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type RecursiveStringify<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends object
  ? { [K in keyof T]: RecursiveStringify<T[K]> }
  : T;
