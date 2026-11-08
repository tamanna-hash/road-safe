# RoadSafe — Road Safety Awareness & Accident Hotspot Reporting Platform


<img src="https://i.ibb.co.com/ccYrbwPm/Screenshot-2026-11-08-183808.png" height="300px" width="400px">


🌐 **Live Demo:** [https://road-safe-tau.vercel.app](https://road-safe-tau.vercel.app)

RoadSafe is a community-driven web application that helps people identify potentially dangerous road locations, report road safety issues, and stay informed about reported risks — all through an interactive map and a structured review workflow.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Live Features](#live-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Data & Limitations](#demo-data--limitations)
- [Application Routes](#application-routes)
- [Key Design Decisions](#key-design-decisions)
- [Deployment](#deployment)

---

## Project Overview

### Problem Statement

People often do not know which roads or locations have potential safety risks. Information about dangerous road conditions is scattered, and there is no convenient way for people to report such issues and track their progress.

### Solution

RoadSafe provides:
- An **interactive map** showing community-submitted road safety reports
- A **report submission form** where anyone can document a hazard
- An **admin dashboard** to review and update report statuses
- A **My Reports** page where reporters can track their submissions

### Target Users

| User | What they can do |
|------|-----------------|
| General Visitor | Browse the map, explore reports by category and severity |
| Reporter | Submit a report, track its progress in My Reports |
| Administrator | Review reports, update statuses, view dashboard statistics |

---

## Live Features

### 🗺️ Interactive Road Risk Map (`/explore`)
- Leaflet map centred on Dhaka, Bangladesh with OpenStreetMap tiles
- Colour-coded markers by issue category (8 categories)
- Marker size scales with severity (Low → Critical)
- Verified reports shown with solid rings; unverified with dashed rings; rejected dimmed
- Slide-in detail panel with full report information on marker click
- Filter toolbar: category, severity, and verified-only toggles (multi-select)
- Real-time marker update on filter change; empty state overlay when no matches
- Report count badge and map legend

### 📋 Report Submission Form (`/report`)
- React Hook Form + Zod validation
- Click-to-pin location picker using a mini Leaflet map
- Device GPS location support
- Issue category and severity dropdowns
- Drag-and-drop image upload with preview (JPEG/PNG/WebP/GIF, 5 MB max)
- Character counter on description field
- Loading state during submission
- Success state with report ID and direct link to the map

### 📊 Admin Dashboard (`/admin`)
- Six stat cards: Total, Pending, Verified, In Progress, Resolved, Rejected
- Tabbed report table filtered by status (with live counts per tab)
- Expandable rows with inline status update form
- Status transitions validated: PENDING → VERIFIED → IN_PROGRESS → RESOLVED (or REJECTED at any stage)
- Optional admin note attached to each status change
- Report detail dialog via eye icon
- "Reset demo data" button restores original seed reports

### 📁 Report List (`/reports`)
- Full searchable, filterable list of all reports
- Status and severity filter chips
- Expandable report detail dialog

### 🔍 My Reports & Status Timeline (`/my-reports`)
- Personal view of reports submitted in this browser session
- Visual 4-step timeline: Pending → Verified → In Progress → Resolved
- Rejection branch with admin note display
- Expandable accordion cards with full detail, photo, and timestamps

---

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16.4.5 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (base-nova style, @base-ui/react) |
| Icons | Lucide React |
| Map | Leaflet 1.9.4 + React-Leaflet 5.0.0 |
| Tile Layer | OpenStreetMap |
| Form Validation | React Hook Form 7 + Zod 3 |
| Data Persistence | Browser localStorage |
| Deployment | Vercel (static export capable) |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar + Footer + skip-link)
│   ├── page.tsx                # Landing home page
│   ├── explore/page.tsx        # Interactive map
│   ├── report/page.tsx         # Report submission form
│   ├── reports/page.tsx        # All reports list
│   ├── my-reports/page.tsx     # My Reports tracking
│   ├── admin/page.tsx          # Admin dashboard
│   └── not-found.tsx           # Custom 404 page
│
├── components/
│   ├── admin/                  # Admin dashboard components
│   │   ├── admin-dashboard-view.tsx
│   │   ├── admin-report-table.tsx
│   │   ├── stat-card.tsx
│   │   └── status-update-form.tsx
│   ├── map/                    # Map components (Leaflet)
│   │   ├── leaflet-map.tsx     # Core Leaflet component (client-only)
│   │   ├── map-wrapper.tsx     # Dynamic import wrapper (ssr: false)
│   │   ├── map-filter-panel.tsx
│   │   ├── report-detail-panel.tsx
│   │   └── empty-map-state.tsx
│   ├── reports/                # Report form and list components
│   │   ├── report-form.tsx
│   │   ├── report-card.tsx
│   │   ├── report-detail-dialog.tsx
│   │   ├── report-list-controls.tsx
│   │   ├── report-list-view.tsx
│   │   ├── my-reports-view.tsx
│   │   ├── my-report-card.tsx
│   │   ├── status-timeline.tsx
│   │   ├── location-picker.tsx
│   │   ├── location-picker-map.tsx
│   │   └── image-upload.tsx
│   ├── shared/                 # Reused across features
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── badges.tsx          # StatusBadge, SeverityBadge, CategoryBadge
│   └── ui/                     # shadcn/ui components
│
├── hooks/
│   └── use-reports.ts          # useReports, useReportFilters, useMyReports
│
├── lib/
│   ├── constants.ts            # Labels, colours, map config, transitions
│   ├── report-schema.ts        # Zod validation schema
│   ├── reports.ts              # localStorage data layer
│   └── seed-data.ts            # 12 sample Bangladesh reports
│
└── types/
    ├── report.ts               # Report, ReportStatus, Severity, etc.
    ├── components.ts           # Component prop type contracts
    └── index.ts                # Barrel export
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd RoadSafe

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create an optimised production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Demo Data & Limitations

### ⚠️ Important Disclaimer

> **All data in this application is fictional sample data created for demonstration purposes only. It is NOT official accident statistics, NOT verified by any government authority, and does NOT represent real incidents.**

The seed data includes 12 sample reports at real locations in Dhaka, Chittagong, and Sylhet, Bangladesh — but the reported issues are entirely fabricated.

### Data Persistence

- All data is stored in **browser localStorage** only
- No server, database, or API is used
- Data resets to seed reports if localStorage is cleared or on first visit
- The "Reset demo data" button in the Admin Dashboard restores the original 12 reports

### Authentication

- There is **no real user authentication** in this demonstration
- The reporter identity ("Demo Reporter") is simulated
- The admin dashboard has **no real access control** — it is entirely client-side
- Any visitor can access the admin dashboard

### Status Management

Reports follow this validation workflow:

```
PENDING → VERIFIED → IN_PROGRESS → RESOLVED
    ↓           ↓           ↓
REJECTED    REJECTED    REJECTED
```

Terminal states (RESOLVED, REJECTED) cannot be changed further.

### Cross-Component Sync

Status changes propagate across all open components via a custom DOM event (`roadsafe:reports-changed`) and the browser's `storage` event for cross-tab sync — no global state library required.

---

## Application Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with feature overview |
| `/explore` | Interactive Leaflet map with filters |
| `/report` | Report submission form |
| `/reports` | Searchable report list |
| `/my-reports` | Personal report tracking with status timeline |
| `/admin` | Admin dashboard (simulated, no auth) |

---

## Key Design Decisions

**Next.js App Router with Server Components** — Pages are Server Components by default; only components that need browser APIs (`useEffect`, geolocation, Leaflet) are Client Components, keeping the server bundle lean.

**Leaflet + `next/dynamic` with `ssr: false`** — Leaflet accesses the DOM on import, which breaks SSR. All Leaflet code is isolated behind a `dynamic()` import boundary. Custom SVG `divIcon` markers avoid the default icon webpack asset URL bug.

**Custom events for cross-component sync** — Rather than introducing a global state library (Redux, Zustand), a custom DOM event dispatched after every localStorage write keeps all `useReports()` hook instances in sync within the same tab. The browser's native `storage` event handles cross-tab sync.

**shadcn/ui v4 with `@base-ui/react`** — This version uses `render` prop for polymorphic components instead of the `asChild`/Radix Slot pattern. All Button-as-Link usages use `render={<Link href="..." />}`.

**Zod + React Hook Form** — Form validation is co-located with the form but the schema is in a separate `report-schema.ts` file so it can be reused independently.

---

## Deployment

### Deploy to Vercel

The project is configured for zero-configuration deployment on Vercel.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or connect your Git repository at vercel.com for automatic deploys
```

### Environment Variables

No environment variables are required. This is a fully client-side demonstration.

### Build Output

The production build generates fully static pages:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /admin
├ ○ /explore
├ ○ /my-reports
├ ○ /report
└ ○ /reports
○ (Static) prerendered as static content
```

---


## 💙 A Note from the Developer

Hello! I'm **Tamanna**.

RoadSafe is an early-stage concept demo, not a complete MVP or a fully developed road safety solution. It represents my idea of how technology could help address road accident risks in Bangladesh.

The goal is to create a platform where people can identify and report dangerous road locations, explore reported hazards through an interactive map, and help authorities recognize accident-prone areas and prioritize necessary actions.

This demo focuses on presenting the core idea, user experience, and key interactions to demonstrate how such a platform could work. The broader vision is to improve public awareness, make road hazard information more accessible, and support authorities in making informed decisions to reduce road accident risks.

There is still significant room for development, validation, and collaboration with relevant authorities to turn this concept into a practical solution.

**RoadSafe is a step toward exploring how technology can contribute to safer roads in Bangladesh.**

Thank you for checking out this application! ❤️

---
