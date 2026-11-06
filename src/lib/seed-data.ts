/**
 * Seed data for RoadSafe — sample demonstration reports.
 *
 * IMPORTANT: These are fictional sample reports created for demonstration
 * purposes only. They are NOT official accident statistics, NOT verified
 * by any government authority, and do NOT represent real incidents.
 *
 * All locations are real places in Dhaka and Chittagong, Bangladesh, but
 * the reported issues are entirely fabricated for this frontend demo.
 */

import {
  ReportCategory,
  ReportStatus,
  Severity,
  type Report,
} from "@/types";
import { DEMO_USER_ID } from "@/lib/constants";

export const SEED_REPORTS: Report[] = [
  {
    id: "seed-001",
    title: "Deep pothole near Farmgate intersection",
    description:
      "A large pothole approximately 50cm wide and 20cm deep has formed at the Farmgate intersection on Kazi Nazrul Islam Avenue. Motorcyclists and rickshaws are at serious risk, especially after heavy rain when the hole fills with water and becomes invisible.",
    location: {
      lat: 23.7572,
      lng: 90.3919,
      address: "Kazi Nazrul Islam Avenue, Farmgate, Dhaka",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.HIGH,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-01T08:30:00.000Z",
    updatedAt: "2026-10-03T10:15:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Confirmed via field inspection. Road maintenance team scheduled for next week.",
  },
  {
    id: "seed-002",
    title: "Street lights completely out on Mirpur Road",
    description:
      "A 300-metre stretch of Mirpur Road between Shyamoli and Kallyanpur has had no functioning street lights for over two weeks. Pedestrians, especially women, feel unsafe after dark. Accidents have been reported at this location.",
    location: {
      lat: 23.7728,
      lng: 90.3623,
      address: "Mirpur Road, between Shyamoli and Kallyanpur, Dhaka",
    },
    category: ReportCategory.POOR_LIGHTING,
    severity: Severity.HIGH,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-05T21:00:00.000Z",
    updatedAt: "2026-10-08T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "DESCO notified. Electrical repair team dispatched.",
  },
  {
    id: "seed-003",
    title: "Missing traffic signs at Mohakhali intersection",
    description:
      "The directional and lane-marking signs at the busy Mohakhali flyover intersection have been knocked down. Drivers are merging unsafely and ignoring lane priorities. Peak-hour gridlock has worsened significantly.",
    location: {
      lat: 23.7806,
      lng: 90.4025,
      address: "Mohakhali Intersection, Dhaka",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.HIGH,
    status: ReportStatus.RESOLVED,
    submittedAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-28T16:30:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Replacement signs installed and posts re-anchored. Issue resolved.",
  },
  {
    id: "seed-004",
    title: "Severe flooding at Demra low-lying road",
    description:
      "The low-lying road near Demra becomes completely submerged during and after moderate rainfall. Vehicles including buses and CNGs regularly stall. There is no drainage infrastructure on this stretch. This has been an ongoing problem for three monsoon seasons.",
    location: {
      lat: 23.7207,
      lng: 90.4617,
      address: "Demra Road, near Demra Bus Stand, Dhaka",
    },
    category: ReportCategory.ROAD_FLOODING,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-10T07:45:00.000Z",
    updatedAt: "2026-10-11T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical issue confirmed. DWASA drainage authority engaged urgently.",
  },
  {
    id: "seed-005",
    title: "Dangerous blind curve on Chattogram Hill Tracts highway",
    description:
      "The approach road to Rangamati from Chattogram has a severely sharp blind curve at a hill pass with no advance warning signs, no guardrails, and insufficient road width for two-way heavy vehicle traffic. Near-misses are frequent.",
    location: {
      lat: 22.6547,
      lng: 92.1691,
      address: "Chattogram–Rangamati Highway, Kaptai Road, Chattogram",
    },
    category: ReportCategory.DANGEROUS_CURVE,
    severity: Severity.CRITICAL,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-14T18:20:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-006",
    title: "Severely cracked road surface on Sylhet-Tamabil highway",
    description:
      "A 200-metre section of the Sylhet–Tamabil highway near Jaflong has extensive surface cracking and pothole clusters. Heavy truck traffic to and from the stone quarries has accelerated deterioration. The road is dangerous for smaller vehicles.",
    location: {
      lat: 25.1533,
      lng: 92.0472,
      address: "Sylhet–Tamabil Highway, near Jaflong, Sylhet",
    },
    category: ReportCategory.ROAD_DAMAGE,
    severity: Severity.HIGH,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-007",
    title: "Construction materials blocking road in Uttara",
    description:
      "Sand and brick materials from an adjacent construction site have spilled onto the main road in Uttara Sector 7, blocking the left lane entirely. No warning cones or barriers have been placed. A vehicle has already scraped its underside on protruding rods.",
    location: {
      lat: 23.8638,
      lng: 90.3983,
      address: "Uttara Sector 7, Dhaka",
    },
    category: ReportCategory.BLOCKED_ROAD,
    severity: Severity.HIGH,
    status: ReportStatus.RESOLVED,
    submittedAt: "2026-10-07T06:15:00.000Z",
    updatedAt: "2026-10-07T14:30:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Dhaka North City Corporation rapid response cleared the obstruction. Site contractor warned.",
  },
  {
    id: "seed-008",
    title: "Multiple potholes on Gulshan Avenue near DNCC Market",
    description:
      "A cluster of potholes along Gulshan Avenue near the DNCC market is damaging vehicles and causing dangerous swerving during rush hour. Several auto-rickshaws have reportedly tipped. The worst potholes are 25–30cm deep.",
    location: {
      lat: 23.7935,
      lng: 90.4147,
      address: "Gulshan Avenue, near DNCC Market, Dhaka",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.MEDIUM,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-03T14:00:00.000Z",
    updatedAt: "2026-10-09T08:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Patching work has begun. Expected completion within one week.",
  },
  {
    id: "seed-009",
    title: "No pedestrian crossing signs outside Viqarunnisa School",
    description:
      "The pedestrian crossing outside Viqarunnisa Noon School on Bailey Road has no flashing amber lights, no zebra crossing paint, and no advance warning signs for drivers. School dismissal at 12:30 PM sees hundreds of students crossing with no driver warning whatsoever.",
    location: {
      lat: 23.7412,
      lng: 90.4101,
      address: "Bailey Road, near Viqarunnisa Noon School, Dhaka",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-06T13:30:00.000Z",
    updatedAt: "2026-10-07T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote:
      "Critical school zone hazard confirmed. Temporary signage placed immediately. Permanent installation and zebra crossing painting scheduled.",
  },
  {
    id: "seed-010",
    title: "Dim and flickering streetlights on Dhanmondi 27",
    description:
      "Multiple lamp posts on Road 27 in Dhanmondi are flickering or operating at very low brightness. The area around the lake-side walking path is particularly dark. Residents report feeling unsafe and two incidents of phone snatching occurred in the unlit stretch last month.",
    location: {
      lat: 23.7461,
      lng: 90.3742,
      address: "Road 27, Dhanmondi, Dhaka",
    },
    category: ReportCategory.POOR_LIGHTING,
    severity: Severity.MEDIUM,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T22:00:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-011",
    title: "Road surface subsidence near Motijheel Shapla Chattar",
    description:
      "A section of road near Shapla Chattar in Motijheel has subsided by approximately 15cm, creating a sharp drop. The area is extremely busy with bank employees, government workers, and buses. Motorcyclists are at risk of losing control.",
    location: {
      lat: 23.7288,
      lng: 90.4177,
      address: "Motijheel, near Shapla Chattar, Dhaka",
    },
    category: ReportCategory.ROAD_DAMAGE,
    severity: Severity.HIGH,
    status: ReportStatus.REJECTED,
    submittedAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-26T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote:
      "Duplicate report — this location is already under active repair order DNCC-2026-7821. No new action required.",
  },
  {
    id: "seed-012",
    title: "Unmanaged road works blocking lanes near Banani 11",
    description:
      "WASA utility digging works on Road 11 in Banani have been left unattended overnight with no warning cones, no lights, and an open trench partially crossing the road. This is a serious hazard for night-time drivers and cyclists.",
    location: {
      lat: 23.7938,
      lng: 90.4043,
      address: "Road 11, Banani, Dhaka",
    },
    category: ReportCategory.OTHER,
    severity: Severity.HIGH,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-15T07:30:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
];
