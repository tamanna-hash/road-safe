/**
 * Seed data for RoadSafe — sample demonstration reports.
 *
 * IMPORTANT: These are fictional sample reports created for demonstration
 * purposes only. They are NOT official accident statistics, NOT verified
 * by any government authority, and do NOT represent real incidents.
 *
 * Covers all 64 districts of Bangladesh — at least one report per district.
 * Locations are real places; reported issues are entirely fabricated for demo.
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
    title_bn: "ফার্মগেট মোড়ের কাছে গভীর গর্ত",
    description:
      "A large pothole approximately 50cm wide and 20cm deep has formed at the Farmgate intersection on Kazi Nazrul Islam Avenue. Motorcyclists and rickshaws are at serious risk, especially after heavy rain when the hole fills with water and becomes invisible.",
    description_bn:
      "কাজী নজরুল ইসলাম অ্যাভিনিউতে ফার্মগেট মোড়ে প্রায় ৫০ সেমি চওড়া ও ২০ সেমি গভীর একটি বড় গর্ত তৈরি হয়েছে। মোটরসাইকেল ও রিকশাচালকরা গুরুতর ঝুঁকিতে আছেন, বিশেষ করে ভারী বৃষ্টির পর যখন গর্তটি পানিতে ভরে অদৃশ্য হয়ে যায়।",
    location: {
      lat: 23.7572,
      lng: 90.3919,
      address: "Kazi Nazrul Islam Avenue, Farmgate, Dhaka", district: "Dhaka",
      address_bn: "কাজী নজরুল ইসলাম অ্যাভিনিউ, ফার্মগেট, ঢাকা",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.HIGH,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-01T08:30:00.000Z",
    updatedAt: "2026-10-03T10:15:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Confirmed via field inspection. Road maintenance team scheduled for next week.",
    adminNote_bn: "মাঠ পরিদর্শনের মাধ্যমে নিশ্চিত করা হয়েছে। আগামী সপ্তাহে সড়ক রক্ষণাবেক্ষণ দল নির্ধারিত আছে।",
  },
  {
    id: "seed-002",
    title: "Street lights completely out on Mirpur Road",
    title_bn: "মিরপুর রোডে রাস্তার বাতি সম্পূর্ণ নিভে গেছে",
    description:
      "A 300-metre stretch of Mirpur Road between Shyamoli and Kallyanpur has had no functioning street lights for over two weeks. Pedestrians, especially women, feel unsafe after dark. Accidents have been reported at this location.",
    description_bn:
      "শ্যামলী ও কল্যাণপুরের মধ্যবর্তী মিরপুর রোডের ৩০০ মিটার অংশে দুই সপ্তাহেরও বেশি সময় ধরে রাস্তার বাতি জ্বলছে না। পথচারীরা, বিশেষত মহিলারা, রাতে নিরাপত্তাহীনতা অনুভব করছেন। এই স্থানে দুর্ঘটনার ঘটনা রিপোর্ট করা হয়েছে।",
    location: {
      lat: 23.7728,
      lng: 90.3623,
      address: "Mirpur Road, between Shyamoli and Kallyanpur, Dhaka", district: "Dhaka",
      address_bn: "মিরপুর রোড, শ্যামলী ও কল্যাণপুরের মধ্যে, ঢাকা",
    },
    category: ReportCategory.POOR_LIGHTING,
    severity: Severity.HIGH,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-05T21:00:00.000Z",
    updatedAt: "2026-10-08T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "DESCO notified. Electrical repair team dispatched.",
    adminNote_bn: "ডেসকো-কে অবহিত করা হয়েছে। বৈদ্যুতিক মেরামত দল প্রেরণ করা হয়েছে।",
  },
  {
    id: "seed-003",
    title: "Missing traffic signs at Mohakhali intersection",
    title_bn: "মহাখালী মোড়ে ট্রাফিক সাইন অনুপস্থিত",
    description:
      "The directional and lane-marking signs at the busy Mohakhali flyover intersection have been knocked down. Drivers are merging unsafely and ignoring lane priorities. Peak-hour gridlock has worsened significantly.",
    description_bn:
      "ব্যস্ত মহাখালী ফ্লাইওভার মোড়ে দিকনির্দেশক ও লেন-চিহ্নিত সাইনগুলো ভেঙে পড়েছে। চালকরা অনিরাপদভাবে লেন পরিবর্তন করছেন এবং লেনের অগ্রাধিকার মানছেন না। পিক আওয়ারে যানজট উল্লেখযোগ্যভাবে বেড়ে গেছে।",
    location: {
      lat: 23.7806,
      lng: 90.4025,
      address: "Mohakhali Intersection, Dhaka", district: "Dhaka",
      address_bn: "মহাখালী মোড়, ঢাকা",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.HIGH,
    status: ReportStatus.RESOLVED,
    submittedAt: "2026-09-20T09:00:00.000Z",
    updatedAt: "2026-09-28T16:30:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Replacement signs installed and posts re-anchored. Issue resolved.",
    adminNote_bn: "প্রতিস্থাপন সাইন স্থাপন করা হয়েছে এবং খুঁটি পুনরায় স্থির করা হয়েছে। সমস্যা সমাধান হয়েছে।",
  },
  {
    id: "seed-004",
    title: "Severe flooding at Demra low-lying road",
    title_bn: "ডেমরার নিচু রাস্তায় তীব্র জলাবদ্ধতা",
    description:
      "The low-lying road near Demra becomes completely submerged during and after moderate rainfall. Vehicles including buses and CNGs regularly stall. There is no drainage infrastructure on this stretch. This has been an ongoing problem for three monsoon seasons.",
    description_bn:
      "ডেমরার কাছের নিচু রাস্তাটি মাঝারি বৃষ্টিতেও সম্পূর্ণ ডুবে যায়। বাস ও সিএনজিসহ যানবাহনগুলো নিয়মিত বন্ধ হয়ে যাচ্ছে। এই অংশে কোনো ড্রেনেজ অবকাঠামো নেই। তিনটি বর্ষা মৌসুম ধরে এটি একটি চলমান সমস্যা।",
    location: {
      lat: 23.7207,
      lng: 90.4617,
      address: "Demra Road, near Demra Bus Stand, Dhaka", district: "Dhaka",
      address_bn: "ডেমরা রোড, ডেমরা বাস স্ট্যান্ডের কাছে, ঢাকা",
    },
    category: ReportCategory.ROAD_FLOODING,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-10T07:45:00.000Z",
    updatedAt: "2026-10-11T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical issue confirmed. DWASA drainage authority engaged urgently.",
    adminNote_bn: "গুরুতর সমস্যা নিশ্চিত করা হয়েছে। ওয়াসার ড্রেনেজ কর্তৃপক্ষকে জরুরিভাবে যুক্ত করা হয়েছে।",
  },
  {
    id: "seed-005",
    title: "Dangerous blind curve on Chattogram Hill Tracts highway",
    title_bn: "চট্টগ্রাম পার্বত্য সড়কে বিপজ্জনক অদৃশ্য বাঁক",
    description:
      "The approach road to Rangamati from Chattogram has a severely sharp blind curve at a hill pass with no advance warning signs, no guardrails, and insufficient road width for two-way heavy vehicle traffic. Near-misses are frequent.",
    description_bn:
      "চট্টগ্রাম থেকে রাঙামাটির প্রবেশ সড়কে একটি পাহাড়ি গিরিপথে অত্যন্ত তীক্ষ্ণ একটি অদৃশ্য বাঁক রয়েছে — কোনো পূর্ব সতর্কতা সাইন নেই, রেলিং নেই এবং দ্বিমুখী ভারী যান চলাচলের জন্য রাস্তা যথেষ্ট চওড়া নয়। প্রায়ই মারাত্মক দুর্ঘটনা এড়ানো যাচ্ছে কোনোমতে।",
    location: {
      lat: 22.6547,
      lng: 92.1691,
      address: "Chattogram–Rangamati Highway, Kaptai Road, Chattogram", district: "Chattogram",
      address_bn: "চট্টগ্রাম–রাঙামাটি মহাসড়ক, কাপ্তাই রোড, চট্টগ্রাম",
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
    title_bn: "সিলেট-তামাবিল মহাসড়কে মারাত্মক ফাটা রাস্তা",
    description:
      "A 200-metre section of the Sylhet–Tamabil highway near Jaflong has extensive surface cracking and pothole clusters. Heavy truck traffic to and from the stone quarries has accelerated deterioration. The road is dangerous for smaller vehicles.",
    description_bn:
      "জাফলংয়ের কাছে সিলেট–তামাবিল মহাসড়কের ২০০ মিটার অংশে ব্যাপক পৃষ্ঠীয় ফাটল ও গর্তের সমষ্টি রয়েছে। পাথর খনি থেকে ভারী ট্রাক চলাচল ক্ষতিকে ত্বরান্বিত করেছে। ছোট যানবাহনের জন্য রাস্তাটি বিপজ্জনক।",
    location: {
      lat: 25.1533,
      lng: 92.0472,
      address: "Sylhet–Tamabil Highway, near Jaflong, Sylhet", district: "Sylhet",
      address_bn: "সিলেট–তামাবিল মহাসড়ক, জাফলংয়ের কাছে, সিলেট",
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
    title_bn: "উত্তরায় নির্মাণ সামগ্রীতে রাস্তা বন্ধ",
    description:
      "Sand and brick materials from an adjacent construction site have spilled onto the main road in Uttara Sector 7, blocking the left lane entirely. No warning cones or barriers have been placed. A vehicle has already scraped its underside on protruding rods.",
    description_bn:
      "উত্তরা সেক্টর ৭-এর পাশের একটি নির্মাণস্থল থেকে বালু ও ইটের সামগ্রী প্রধান সড়কে ছড়িয়ে পড়েছে, বাম লেন সম্পূর্ণ বন্ধ হয়ে গেছে। কোনো সতর্কতা কোণ বা বাধা রাখা হয়নি। ইতিমধ্যে একটি যানবাহনের তলা বেরিয়ে আসা রডে আঘাত পেয়েছে।",
    location: {
      lat: 23.8638,
      lng: 90.3983,
      address: "Uttara Sector 7, Dhaka", district: "Dhaka",
      address_bn: "উত্তরা সেক্টর ৭, ঢাকা",
    },
    category: ReportCategory.BLOCKED_ROAD,
    severity: Severity.HIGH,
    status: ReportStatus.RESOLVED,
    submittedAt: "2026-10-07T06:15:00.000Z",
    updatedAt: "2026-10-07T14:30:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Dhaka North City Corporation rapid response cleared the obstruction. Site contractor warned.",
    adminNote_bn: "ঢাকা উত্তর সিটি করপোরেশনের দ্রুত সাড়া দল বাধা সরিয়ে ফেলেছে। সাইট ঠিকাদারকে সতর্ক করা হয়েছে।",
  },
  {
    id: "seed-008",
    title: "Multiple potholes on Gulshan Avenue near DNCC Market",
    title_bn: "গুলশান অ্যাভিনিউতে ডিএনসিসি মার্কেটের কাছে একাধিক গর্ত",
    description:
      "A cluster of potholes along Gulshan Avenue near the DNCC market is damaging vehicles and causing dangerous swerving during rush hour. Several auto-rickshaws have reportedly tipped. The worst potholes are 25–30cm deep.",
    description_bn:
      "ডিএনসিসি মার্কেটের কাছে গুলশান অ্যাভিনিউতে গর্তের একটি সমষ্টি যানবাহনের ক্ষতি করছে এবং ব্যস্ত সময়ে বিপজ্জনক মোড় নেওয়ার কারণ হচ্ছে। কয়েকটি অটোরিকশা উল্টে যাওয়ার খবর পাওয়া গেছে। সবচেয়ে খারাপ গর্তগুলো ২৫–৩০ সেমি গভীর।",
    location: {
      lat: 23.7935,
      lng: 90.4147,
      address: "Gulshan Avenue, near DNCC Market, Dhaka", district: "Dhaka",
      address_bn: "গুলশান অ্যাভিনিউ, ডিএনসিসি মার্কেটের কাছে, ঢাকা",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.MEDIUM,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-03T14:00:00.000Z",
    updatedAt: "2026-10-09T08:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Patching work has begun. Expected completion within one week.",
    adminNote_bn: "প্যাচিং কাজ শুরু হয়েছে। এক সপ্তাহের মধ্যে সম্পন্ন হওয়ার প্রত্যাশা।",
  },
  {
    id: "seed-009",
    title: "No pedestrian crossing signs outside Viqarunnisa School",
    title_bn: "ভিকারুননিসা স্কুলের সামনে পথচারী পারাপারের সাইন নেই",
    description:
      "The pedestrian crossing outside Viqarunnisa Noon School on Bailey Road has no flashing amber lights, no zebra crossing paint, and no advance warning signs for drivers. School dismissal at 12:30 PM sees hundreds of students crossing with no driver warning whatsoever.",
    description_bn:
      "বেইলি রোডে ভিকারুননিসা নূন স্কুলের সামনের পথচারী পারাপারে কোনো ফ্ল্যাশিং অ্যাম্বার লাইট নেই, কোনো জেব্রা ক্রসিং রঙ নেই এবং চালকদের জন্য কোনো পূর্ব সতর্কতা সাইন নেই। দুপুর ১২:৩০-এ ছুটির সময় শত শত ছাত্রছাত্রী চালকদের কোনো সতর্কবার্তা ছাড়াই রাস্তা পার হচ্ছে।",
    location: {
      lat: 23.7412,
      lng: 90.4101,
      address: "Bailey Road, near Viqarunnisa Noon School, Dhaka", district: "Dhaka",
      address_bn: "বেইলি রোড, ভিকারুননিসা নূন স্কুলের কাছে, ঢাকা",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-06T13:30:00.000Z",
    updatedAt: "2026-10-07T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote:
      "Critical school zone hazard confirmed. Temporary signage placed immediately. Permanent installation and zebra crossing painting scheduled.",
    adminNote_bn:
      "স্কুল জোনের গুরুতর বিপদ নিশ্চিত হয়েছে। তাৎক্ষণিকভাবে অস্থায়ী সাইন স্থাপন করা হয়েছে। স্থায়ী স্থাপনা ও জেব্রা ক্রসিং রঙ করার কাজ নির্ধারিত আছে।",
  },
  {
    id: "seed-010",
    title: "Dim and flickering streetlights on Dhanmondi 27",
    title_bn: "ধানমন্ডি ২৭ নম্বরে ম্লান ও জ্বলছে-নিভছে রাস্তার বাতি",
    description:
      "Multiple lamp posts on Road 27 in Dhanmondi are flickering or operating at very low brightness. The area around the lake-side walking path is particularly dark. Residents report feeling unsafe and two incidents of phone snatching occurred in the unlit stretch last month.",
    description_bn:
      "ধানমন্ডির ২৭ নম্বর রোডে একাধিক ল্যাম্পপোস্ট জ্বলছে-নিভছে বা অত্যন্ত কম আলো দিচ্ছে। লেকসাইড হাঁটার পথের আশেপাশের এলাকা বিশেষভাবে অন্ধকার। বাসিন্দারা নিরাপত্তাহীনতা অনুভব করছেন এবং গত মাসে অন্ধকার অংশে ফোন ছিনতাইয়ের দুটি ঘটনা ঘটেছে।",
    location: {
      lat: 23.7461,
      lng: 90.3742,
      address: "Road 27, Dhanmondi, Dhaka", district: "Dhaka",
      address_bn: "রোড ২৭, ধানমন্ডি, ঢাকা",
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
    title_bn: "মতিঝিল শাপলা চত্বরের কাছে রাস্তার পৃষ্ঠ ধেবে যাচ্ছে",
    description:
      "A section of road near Shapla Chattar in Motijheel has subsided by approximately 15cm, creating a sharp drop. The area is extremely busy with bank employees, government workers, and buses. Motorcyclists are at risk of losing control.",
    description_bn:
      "মতিঝিলের শাপলা চত্বরের কাছে রাস্তার একটি অংশ প্রায় ১৫ সেমি ধেবে গেছে, একটি তীক্ষ্ণ ঢাল তৈরি করেছে। এলাকাটি ব্যাংক কর্মী, সরকারি কর্মচারী ও বাসে অত্যন্ত ব্যস্ত। মোটরসাইকেলচালকরা নিয়ন্ত্রণ হারানোর ঝুঁকিতে আছেন।",
    location: {
      lat: 23.7288,
      lng: 90.4177,
      address: "Motijheel, near Shapla Chattar, Dhaka", district: "Dhaka",
      address_bn: "মতিঝিল, শাপলা চত্বরের কাছে, ঢাকা",
    },
    category: ReportCategory.ROAD_DAMAGE,
    severity: Severity.HIGH,
    status: ReportStatus.REJECTED,
    submittedAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-26T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote:
      "Duplicate report — this location is already under active repair order DNCC-2026-7821. No new action required.",
    adminNote_bn:
      "ডুপ্লিকেট রিপোর্ট — এই স্থানটি ইতিমধ্যে সক্রিয় মেরামত আদেশ DNCC-2026-7821-এর অধীনে আছে। নতুন কোনো পদক্ষেপের প্রয়োজন নেই।",
  },
  {
    id: "seed-012",
    title: "Unmanaged road works blocking lanes near Banani 11",
    title_bn: "বনানী ১১-এর কাছে অব্যবস্থাপিত সড়ক কাজ লেন বন্ধ করছে",
    description:
      "WASA utility digging works on Road 11 in Banani have been left unattended overnight with no warning cones, no lights, and an open trench partially crossing the road. This is a serious hazard for night-time drivers and cyclists.",
    description_bn:
      "বনানীর ১১ নম্বর রোডে ওয়াসার ইউটিলিটি খনন কাজ কোনো সতর্কতা কোণ, কোনো আলো এবং রাস্তা আংশিকভাবে পার করা একটি খোলা পরিখা রেখে রাতে অযত্নশীল রাখা হয়েছে। রাত্রিকালীন চালক ও সাইকেলচালকদের জন্য এটি একটি গুরুতর বিপদ।",
    location: {
      lat: 23.7938,
      lng: 90.4043,
      address: "Road 11, Banani, Dhaka", district: "Dhaka",
      address_bn: "রোড ১১, বনানী, ঢাকা",
    },
    category: ReportCategory.OTHER,
    severity: Severity.HIGH,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-15T07:30:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-013",
    title: "Multiple potholes on Airport Road near Jasimuddin Avenue",
    title_bn: "জসিমউদ্দিন অ্যাভিনিউর কাছে এয়ারপোর্ট রোডে একাধিক গর্ত",
    description:
      "A series of deep potholes on Airport Road near the Jasimuddin Avenue intersection is causing vehicles to slow abruptly during rush hour. The rightmost lane has three holes deeper than 15cm. Motorcycles and CNGs are swerving dangerously into other lanes.",
    description_bn:
      "জসিমউদ্দিন অ্যাভিনিউ মোড়ের কাছে এয়ারপোর্ট রোডে একসারি গভীর গর্ত ব্যস্ত সময়ে যানবাহনগুলোকে হঠাৎ ধীর করতে বাধ্য করছে। ডানদিকের লেনে ১৫ সেমি-র বেশি গভীর তিনটি গর্ত রয়েছে। মোটরসাইকেল ও সিএনজি বিপজ্জনকভাবে অন্য লেনে সরে যাচ্ছে।",
    location: {
      lat: 23.8127,
      lng: 90.4253,
      address: "Airport Road, near Jasimuddin Avenue, Dhaka", district: "Dhaka",
      address_bn: "এয়ারপোর্ট রোড, জসিমউদ্দিন অ্যাভিনিউর কাছে, ঢাকা",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.MEDIUM,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-08T09:15:00.000Z",
    updatedAt: "2026-10-10T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Verified via site visit. Patching work added to maintenance schedule.",
    adminNote_bn: "সাইট পরিদর্শনের মাধ্যমে যাচাই করা হয়েছে। রক্ষণাবেক্ষণের সময়সূচিতে প্যাচিং কাজ যোগ করা হয়েছে।",
  },
  {
    id: "seed-014",
    title: "Broken traffic light at Tejgaon Rail Gate crossing",
    title_bn: "তেজগাঁও রেল গেট ক্রসিংয়ে ট্রাফিক লাইট নষ্ট",
    description:
      "The traffic signal at Tejgaon rail gate crossing has been non-functional for over a week. Manual traffic control by police is unreliable, leading to long delays and near-misses. Pedestrians crossing are particularly at risk.",
    description_bn:
      "তেজগাঁও রেল গেট ক্রসিংয়ে ট্রাফিক সিগন্যাল এক সপ্তাহেরও বেশি সময় ধরে কাজ করছে না। পুলিশের ম্যানুয়াল ট্রাফিক নিয়ন্ত্রণ অনির্ভরযোগ্য, দীর্ঘ বিলম্ব ও মারাত্মক দুর্ঘটনার কাছাকাছি পরিস্থিতি তৈরি হচ্ছে। রাস্তা পার হওয়া পথচারীরা বিশেষভাবে ঝুঁকিতে আছেন।",
    location: {
      lat: 23.7587,
      lng: 90.3954,
      address: "Tejgaon Rail Gate, Dhaka", district: "Dhaka",
      address_bn: "তেজগাঁও রেল গেট, ঢাকা",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.HIGH,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-11T16:00:00.000Z",
    updatedAt: "2026-10-13T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Dhaka Traffic Police notified. Signal repair contractor dispatched.",
    adminNote_bn: "ঢাকা ট্রাফিক পুলিশকে অবহিত করা হয়েছে। সিগন্যাল মেরামত ঠিকাদার প্রেরণ করা হয়েছে।",
  },
  {
    id: "seed-015",
    title: "Sharp curve with no guardrail on Chattogram Marine Drive",
    title_bn: "চট্টগ্রাম মেরিন ড্রাইভে রেলিংবিহীন তীক্ষ্ণ বাঁক",
    description:
      "The elevated section of Chattogram Marine Drive near Patenga has a sharp curve with no guardrail protection. The drop on the seaward side is over 10 meters. During rain or at night, visibility is poor and several vehicles have skidded off-course.",
    description_bn:
      "পতেঙ্গার কাছে চট্টগ্রাম মেরিন ড্রাইভের উঁচু অংশে কোনো রেলিং সুরক্ষা ছাড়াই একটি তীক্ষ্ণ বাঁক রয়েছে। সমুদ্রের দিকে নামার উচ্চতা ১০ মিটারেরও বেশি। বৃষ্টিতে বা রাতে দৃশ্যমানতা কম এবং কয়েকটি যানবাহন পথ থেকে ছিটকে পড়েছে।",
    location: {
      lat: 22.2347,
      lng: 91.7919,
      address: "Marine Drive, near Patenga, Chattogram", district: "Chattogram",
      address_bn: "মেরিন ড্রাইভ, পতেঙ্গার কাছে, চট্টগ্রাম",
    },
    category: ReportCategory.DANGEROUS_CURVE,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-09T12:00:00.000Z",
    updatedAt: "2026-10-12T14:30:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical hazard confirmed. Barrier installation urgent. Chattogram City Corporation contacted.",
    adminNote_bn: "গুরুতর বিপদ নিশ্চিত হয়েছে। ব্যারিয়ার স্থাপন জরুরি। চট্টগ্রাম সিটি করপোরেশনকে যোগাযোগ করা হয়েছে।",
  },
  {
    id: "seed-016",
    title: "Road flooding near Rampura Bridge underpass",
    title_bn: "রামপুরা ব্রিজ আন্ডারপাসের কাছে রাস্তায় জলাবদ্ধতা",
    description:
      "The underpass near Rampura Bridge floods with as little as 20 minutes of moderate rain. Pumps are either broken or absent. Vehicles regularly stall, and pedestrians wade through knee-deep water. This happens during every monsoon.",
    description_bn:
      "রামপুরা ব্রিজের কাছের আন্ডারপাসে মাত্র ২০ মিনিটের মাঝারি বৃষ্টিতেই পানি ভরে যায়। পাম্পগুলো নষ্ট বা অনুপস্থিত। যানবাহনগুলো নিয়মিত বন্ধ হয়ে যাচ্ছে এবং পথচারীরা হাঁটু-পানি দিয়ে হাঁটছেন। প্রতিটি বর্ষায় এটি ঘটে।",
    location: {
      lat: 23.7592,
      lng: 90.4281,
      address: "Rampura Bridge Underpass, Dhaka", district: "Dhaka",
      address_bn: "রামপুরা ব্রিজ আন্ডারপাস, ঢাকা",
    },
    category: ReportCategory.ROAD_FLOODING,
    severity: Severity.HIGH,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-14T06:30:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-017",
    title: "No streetlights on Jatrabari–Demra Link Road",
    title_bn: "যাত্রাবাড়ী–ডেমরা লিংক রোডে রাস্তার বাতি নেই",
    description:
      "A 2km stretch of the Jatrabari–Demra Link Road has no functional street lighting. This area is frequented by industrial workers commuting late at night. Multiple robberies and accidents have been reported. Residents are demanding immediate action.",
    description_bn:
      "যাত্রাবাড়ী–ডেমরা লিংক রোডের ২ কিলোমিটার অংশে কোনো কার্যকর রাস্তার বাতি নেই। এই এলাকায় রাত দেরিতে শিল্প কর্মীরা যাতায়াত করেন। একাধিক ডাকাতি ও দুর্ঘটনার ঘটনা রিপোর্ট করা হয়েছে। বাসিন্দারা তাৎক্ষণিক ব্যবস্থার দাবি জানাচ্ছেন।",
    location: {
      lat: 23.7095,
      lng: 90.4513,
      address: "Jatrabari–Demra Link Road, Dhaka", district: "Dhaka",
      address_bn: "যাত্রাবাড়ী–ডেমরা লিংক রোড, ঢাকা",
    },
    category: ReportCategory.POOR_LIGHTING,
    severity: Severity.CRITICAL,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-10T20:00:00.000Z",
    updatedAt: "2026-10-11T15:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Urgent safety concern. DESCO emergency lighting team deployed immediately.",
    adminNote_bn: "জরুরি নিরাপত্তা উদ্বেগ। ডেসকোর জরুরি আলোক দল তাৎক্ষণিকভাবে মোতায়েন করা হয়েছে।",
  },
  {
    id: "seed-018",
    title: "Cracked and uneven road surface on Mirpur 10 Golchattar",
    title_bn: "মিরপুর ১০ গোলচত্বরে ফাটা ও অসমান সড়কের পৃষ্ঠ",
    description:
      "The road around Mirpur 10 Golchattar has multiple cracks and uneven patches from repeated utility digging. The surface is jagged and causes vehicles to bounce violently. Rickshaws and motorcycles struggle to navigate safely.",
    description_bn:
      "মিরপুর ১০ গোলচত্বরের আশেপাশের রাস্তায় বারবার ইউটিলিটি খননের কারণে একাধিক ফাটল ও অসমান অংশ রয়েছে। পৃষ্ঠটি এবড়োখেবড়ো এবং যানবাহনগুলো প্রচণ্ডভাবে লাফ দিচ্ছে। রিকশা ও মোটরসাইকেল নিরাপদে চলতে হিমশিম খাচ্ছে।",
    location: {
      lat: 23.8068,
      lng: 90.3687,
      address: "Mirpur 10 Golchattar, Dhaka", district: "Dhaka",
      address_bn: "মিরপুর ১০ গোলচত্বর, ঢাকা",
    },
    category: ReportCategory.ROAD_DAMAGE,
    severity: Severity.MEDIUM,
    status: ReportStatus.RESOLVED,
    submittedAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-10-05T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Road resurfacing completed. Issue resolved.",
    adminNote_bn: "সড়ক পুনরায় পৃষ্ঠায়ন সম্পন্ন হয়েছে। সমস্যা সমাধান হয়েছে।",
  },
  {
    id: "seed-019",
    title: "Missing speed limit signs on Dhaka–Aricha Highway",
    title_bn: "ঢাকা–আরিচা মহাসড়কে গতি সীমার সাইন অনুপস্থিত",
    description:
      "A long stretch of the Dhaka–Aricha Highway near Savar has no speed limit signage despite being adjacent to residential and school zones. Heavy trucks and buses speed dangerously through populated areas with no enforcement or warnings.",
    description_bn:
      "সাভারের কাছে ঢাকা–আরিচা মহাসড়কের একটি দীর্ঘ অংশে আবাসিক ও স্কুল জোনের পাশ হওয়া সত্ত্বেও কোনো গতি সীমার সাইন নেই। ভারী ট্রাক ও বাস জনবহুল এলাকায় কোনো প্রয়োগ বা সতর্কতা ছাড়াই বিপজ্জনকভাবে গতিতে চলছে।",
    location: {
      lat: 23.8475,
      lng: 90.2639,
      address: "Dhaka–Aricha Highway, near Savar, Dhaka", district: "Dhaka",
      address_bn: "ঢাকা–আরিচা মহাসড়ক, সাভারের কাছে, ঢাকা",
    },
    category: ReportCategory.MISSING_SIGNAGE,
    severity: Severity.HIGH,
    status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T08:00:00.000Z",
    submittedBy: DEMO_USER_ID,
  },
  {
    id: "seed-020",
    title: "Construction debris blocking half of Banasree Main Road",
    title_bn: "বনশ্রী মেইন রোডের অর্ধেক বন্ধ নির্মাণ ধ্বংসাবশেষ",
    description:
      "Building demolition debris has been dumped on Banasree Main Road, narrowing it to a single lane. No warning signs or barriers have been placed. The blockage is causing severe traffic congestion during peak hours and is a collision hazard at night.",
    description_bn:
      "বনশ্রী মেইন রোডে ভবন ভাঙার ধ্বংসাবশেষ ফেলা হয়েছে, রাস্তাটি একটি লেনে সংকুচিত হয়ে গেছে। কোনো সতর্কতা সাইন বা বাধা রাখা হয়নি। ব্লকেজটি পিক আওয়ারে তীব্র যানজট সৃষ্টি করছে এবং রাতে সংঘর্ষের বিপদ হয়ে উঠছে।",
    location: {
      lat: 23.7618,
      lng: 90.4374,
      address: "Banasree Main Road, Block C, Dhaka", district: "Dhaka",
      address_bn: "বনশ্রী মেইন রোড, ব্লক সি, ঢাকা",
    },
    category: ReportCategory.BLOCKED_ROAD,
    severity: Severity.HIGH,
    status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-13T11:00:00.000Z",
    updatedAt: "2026-10-14T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Debris removal in progress. Expected clearance within 24 hours.",
    adminNote_bn: "ধ্বংসাবশেষ অপসারণ চলছে। ২৪ ঘণ্টার মধ্যে পরিষ্কার হওয়ার প্রত্যাশা।",
  },
  {
    id: "seed-021",
    title: "Large pothole cluster near Badda Link Road",
    title_bn: "বাড্ডা লিংক রোডের কাছে বড় গর্তের সমষ্টি",
    description:
      "A cluster of six interconnected potholes on Badda Link Road near Aftabnagar has formed a hazardous zone spanning nearly 4 meters. Vehicles cannot avoid them without entering the opposite lane. Two-wheelers are particularly at risk of falling.",
    description_bn:
      "আফতাবনগরের কাছে বাড্ডা লিংক রোডে ছয়টি পরস্পর সংযুক্ত গর্তের একটি সমষ্টি প্রায় ৪ মিটার বিস্তৃত একটি বিপজ্জনক অঞ্চল তৈরি করেছে। বিপরীত লেনে না গিয়ে যানবাহনগুলো এগুলো এড়াতে পারছে না। দুই চাকার যানগুলো পড়ে যাওয়ার বিশেষ ঝুঁকিতে আছে।",
    location: {
      lat: 23.7806,
      lng: 90.4254,
      address: "Badda Link Road, near Aftabnagar, Dhaka", district: "Dhaka",
      address_bn: "বাড্ডা লিংক রোড, আফতাবনগরের কাছে, ঢাকা",
    },
    category: ReportCategory.POTHOLE,
    severity: Severity.HIGH,
    status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-09T14:30:00.000Z",
    updatedAt: "2026-10-11T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "High-risk cluster confirmed. Emergency patching scheduled within 48 hours.",
    adminNote_bn: "উচ্চ-ঝুঁকির সমষ্টি নিশ্চিত হয়েছে। ৪৮ ঘণ্টার মধ্যে জরুরি প্যাচিং নির্ধারিত আছে।",
  },

  // ── Remaining 61 districts ────────────────────────────────────────────────

  // Gazipur
  {
    id: "seed-022",
    title: "Road collapse near Tongi Industrial Area",
    title_bn: "টঙ্গী শিল্প এলাকার কাছে সড়ক ধস",
    description: "A section of the road near Tongi Industrial Area has collapsed due to heavy truck traffic from nearby factories. The road surface has sunk by nearly 30cm, making it impassable for smaller vehicles at night.",
    description_bn: "কাছের কারখানা থেকে ভারী ট্রাক চলাচলের কারণে টঙ্গী শিল্প এলাকার কাছে রাস্তার একটি অংশ ধসে পড়েছে। রাস্তার পৃষ্ঠ প্রায় ৩০ সেমি নেমে গেছে, যা রাতে ছোট যানবাহনের জন্য অপ্রবেশযোগ্য করে তুলেছে।",
    location: { lat: 23.8897, lng: 90.4016, address: "Tongi Industrial Area, Gazipur", district: "Gazipur", address_bn: "টঙ্গী শিল্প এলাকা, গাজীপুর" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-05T08:00:00.000Z", updatedAt: "2026-10-06T12:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical collapse confirmed. Emergency barricades placed. Repair scheduled.",
    adminNote_bn: "গুরুতর ধস নিশ্চিত হয়েছে। জরুরি ব্যারিকেড স্থাপন করা হয়েছে। মেরামত নির্ধারিত আছে।",
  },

  // Narayanganj
  {
    id: "seed-023",
    title: "No traffic signals at busy Narayanganj Chashara crossing",
    title_bn: "নারায়ণগঞ্জ চাষাড়া মোড়ে ব্যস্ত সড়কে কোনো ট্রাফিক সিগন্যাল নেই",
    description: "The main Chashara crossing in Narayanganj city has no working traffic signals. Hundreds of vehicles and pedestrians compete for space throughout the day, causing near-daily accidents.",
    description_bn: "নারায়ণগঞ্জ শহরের প্রধান চাষাড়া মোড়ে কোনো কার্যকর ট্রাফিক সিগন্যাল নেই। সারাদিন শত শত যানবাহন ও পথচারী একসাথে জায়গার জন্য প্রতিযোগিতা করছে, প্রায় প্রতিদিন দুর্ঘটনা ঘটছে।",
    location: { lat: 23.6238, lng: 90.4995, address: "Chashara Crossing, Narayanganj", district: "Narayanganj", address_bn: "চাষাড়া মোড়, নারায়ণগঞ্জ" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-08T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Munshiganj
  {
    id: "seed-024",
    title: "Flooded road at Munshiganj Padma riverbank approach",
    title_bn: "মুন্সীগঞ্জ পদ্মা নদীর তীরের কাছে রাস্তায় জলাবদ্ধতা",
    description: "The approach road to the Padma riverbank in Munshiganj town floods during high tide and heavy rain, making the route inaccessible for up to 6 hours at a time.",
    description_bn: "মুন্সীগঞ্জ শহরে পদ্মা নদীর তীরের দিকে যাওয়ার রাস্তাটি জোয়ার ও ভারী বৃষ্টির সময় ডুবে যায়, একবারে ৬ ঘণ্টা পর্যন্ত পথটি অপ্রবেশযোগ্য হয়ে পড়ে।",
    location: { lat: 23.5422, lng: 90.5302, address: "Padma Riverbank Road, Munshiganj", district: "Munshiganj", address_bn: "পদ্মা নদীর তীরের রাস্তা, মুন্সীগঞ্জ" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-11T07:30:00.000Z", updatedAt: "2026-10-12T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "BIWTA and Roads & Highways contacted. Temporary pumping in progress.",
    adminNote_bn: "বিআইডব্লিউটিএ এবং সড়ক ও জনপথ বিভাগকে যোগাযোগ করা হয়েছে। অস্থায়ী পাম্পিং চলছে।",
  },

  // Manikganj
  {
    id: "seed-025",
    title: "Deep potholes on Manikganj–Dhaka highway near Saturia",
    title_bn: "সাটুরিয়ার কাছে মানিকগঞ্জ–ঢাকা মহাসড়কে গভীর গর্ত",
    description: "Several deep potholes have formed on the Manikganj–Dhaka highway near Saturia after seasonal flooding. The largest is over 40cm deep and 1 metre wide. Bus services have been disrupted.",
    description_bn: "মৌসুমী বন্যার পর সাটুরিয়ার কাছে মানিকগঞ্জ–ঢাকা মহাসড়কে বেশ কয়েকটি গভীর গর্ত তৈরি হয়েছে। সবচেয়ে বড়টি ৪০ সেমি-র বেশি গভীর ও ১ মিটার চওড়া। বাস সেবা ব্যাহত হয়েছে।",
    location: { lat: 23.8326, lng: 90.0002, address: "Manikganj–Dhaka Highway, near Saturia", district: "Manikganj", address_bn: "মানিকগঞ্জ–ঢাকা মহাসড়ক, সাটুরিয়ার কাছে" },
    category: ReportCategory.POTHOLE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T14:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Narsingdi
  {
    id: "seed-026",
    title: "No lighting on Narsingdi–Bhairab highway night stretch",
    title_bn: "নরসিংদী–ভৈরব মহাসড়কের রাতের অংশে কোনো আলো নেই",
    description: "A 5km stretch of the Narsingdi–Bhairab highway is completely unlit at night. Multiple accidents have been reported in the last month, with two involving fatalities.",
    description_bn: "নরসিংদী–ভৈরব মহাসড়কের ৫ কিলোমিটার অংশ রাতে সম্পূর্ণ অন্ধকার। গত মাসে একাধিক দুর্ঘটনার ঘটনা রিপোর্ট করা হয়েছে, যার মধ্যে দুটিতে মৃত্যুর ঘটনা রয়েছে।",
    location: { lat: 23.9178, lng: 90.7153, address: "Narsingdi–Bhairab Highway, Narsingdi", district: "Narsingdi", address_bn: "নরসিংদী–ভৈরব মহাসড়ক, নরসিংদী" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.CRITICAL, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-09T21:00:00.000Z", updatedAt: "2026-10-10T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical. BREB emergency lighting team dispatched. Interim police patrolling.",
    adminNote_bn: "অতি গুরুতর। বিআরইবির জরুরি আলোক দল প্রেরণ করা হয়েছে। অন্তর্বর্তীকালীন পুলিশ টহল চলছে।",
  },

  // Kishoreganj
  {
    id: "seed-027",
    title: "Dangerous curve with no guardrail on Kishoreganj bypass",
    title_bn: "কিশোরগঞ্জ বাইপাসে রেলিংবিহীন বিপজ্জনক বাঁক",
    description: "A sharp curve on the Kishoreganj bypass road has no guardrail, no warning signs, and poor lane markings. Heavy vehicles regularly cut into the opposite lane on this bend.",
    description_bn: "কিশোরগঞ্জ বাইপাস সড়কে একটি তীক্ষ্ণ বাঁকে কোনো রেলিং নেই, কোনো সতর্কতা সাইন নেই এবং লেন চিহ্নিতকরণ দুর্বল। এই বাঁকে ভারী যানবাহন নিয়মিত বিপরীত লেনে চলে আসছে।",
    location: { lat: 24.4444, lng: 90.7762, address: "Kishoreganj Bypass, Kishoreganj", district: "Kishoreganj", address_bn: "কিশোরগঞ্জ বাইপাস, কিশোরগঞ্জ" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-07T09:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Mymensingh
  {
    id: "seed-028",
    title: "Road surface damage on Mymensingh–Tangail highway",
    title_bn: "ময়মনসিংহ–টাঙ্গাইল মহাসড়কে রাস্তার পৃষ্ঠের ক্ষতি",
    description: "The Mymensingh–Tangail highway has large sections of broken asphalt and exposed sub-base near Phulpur. Heavy trucks from the local agricultural market have accelerated the damage.",
    description_bn: "ফুলপুরের কাছে ময়মনসিংহ–টাঙ্গাইল মহাসড়কে ভাঙা পিচ ও উন্মুক্ত সাব-বেসের বড় অংশ রয়েছে। স্থানীয় কৃষিপণ্যের বাজার থেকে ভারী ট্রাক ক্ষতিকে ত্বরান্বিত করেছে।",
    location: { lat: 24.7471, lng: 90.4203, address: "Mymensingh–Tangail Highway, near Phulpur", address_bn: "ময়মনসিংহ–টাঙ্গাইল মহাসড়ক, ফুলপুরের কাছে" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-06T11:00:00.000Z", updatedAt: "2026-10-08T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Repair crew mobilised. Full resurfacing expected within 2 weeks.",
    adminNote_bn: "মেরামত দল মোতায়েন হয়েছে। ২ সপ্তাহের মধ্যে সম্পূর্ণ পুনরায় পৃষ্ঠায়নের প্রত্যাশা।",
  },

  // Jamalpur
  {
    id: "seed-029",
    title: "Flood-damaged road between Jamalpur and Islampur",
    title_bn: "জামালপুর ও ইসলামপুরের মধ্যে বন্যায় ক্ষতিগ্রস্ত রাস্তা",
    description: "Seasonal Brahmaputra flooding has destroyed a 400m section of the Jamalpur–Islampur road. The embankment has eroded and the road surface has completely washed away.",
    description_bn: "মৌসুমী ব্রহ্মপুত্র বন্যা জামালপুর–ইসলামপুর রাস্তার ৪০০ মিটার অংশ ধ্বংস করে দিয়েছে। বাঁধ ক্ষয় পেয়েছে এবং রাস্তার পৃষ্ঠ সম্পূর্ণ ভেসে গেছে।",
    location: { lat: 24.9375, lng: 89.9458, address: "Jamalpur–Islampur Road, Jamalpur", district: "Jamalpur", address_bn: "জামালপুর–ইসলামপুর রোড, জামালপুর" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.RESOLVED,
    submittedAt: "2026-09-15T08:00:00.000Z", updatedAt: "2026-10-01T16:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Emergency reconstruction completed. Road reopened to traffic.",
    adminNote_bn: "জরুরি পুনর্নির্মাণ সম্পন্ন হয়েছে। রাস্তা যানবাহন চলাচলের জন্য পুনরায় খুলে দেওয়া হয়েছে।",
  },

  // Sherpur
  {
    id: "seed-030",
    title: "Missing bridge warning signs near Sherpur Nalitabari",
    title_bn: "শেরপুর নালিতাবাড়ীর কাছে সেতুর সতর্কতা সাইন অনুপস্থিত",
    description: "A narrow single-lane bridge on the Sherpur–Nalitabari road has no weight limit signs, no approach warnings, and no reflective markers. Heavy trucks regularly attempt to cross simultaneously from both ends.",
    description_bn: "শেরপুর–নালিতাবাড়ী রোডে একটি সরু একক-লেন সেতুতে কোনো ওজন সীমার সাইন নেই, কোনো অ্যাপ্রোচ সতর্কতা নেই এবং কোনো প্রতিফলক মার্কার নেই। ভারী ট্রাক নিয়মিত উভয় দিক থেকে একসাথে পার হওয়ার চেষ্টা করছে।",
    location: { lat: 25.0204, lng: 90.0144, address: "Sherpur–Nalitabari Road, Sherpur", district: "Sherpur", address_bn: "শেরপুর–নালিতাবাড়ী রোড, শেরপুর" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T13:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Netrokona
  {
    id: "seed-031",
    title: "Waterlogged road after heavy rain in Netrokona Haor area",
    title_bn: "নেত্রকোনা হাওর এলাকায় ভারী বৃষ্টির পর জলমগ্ন রাস্তা",
    description: "The rural road connecting Mohanganj to Khaliajuri in Netrokona remains waterlogged for days after heavy rain due to insufficient drainage and low embankment height.",
    description_bn: "নেত্রকোনায় মোহনগঞ্জ থেকে খালিয়াজুড়িকে সংযোগকারী গ্রামীণ রাস্তাটি অপর্যাপ্ত ড্রেনেজ ও নিচু বাঁধের উচ্চতার কারণে ভারী বৃষ্টির পর দিনের পর দিন জলমগ্ন থাকে।",
    location: { lat: 24.8701, lng: 90.7277, address: "Mohanganj–Khaliajuri Road, Netrokona", district: "Netrokona", address_bn: "মোহনগঞ্জ–খালিয়াজুড়ি রোড, নেত্রকোনা" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Tangail
  {
    id: "seed-032",
    title: "Pothole cluster on Tangail bypass near Jamurki",
    title_bn: "জামুর্কির কাছে টাঙ্গাইল বাইপাসে গর্তের সমষ্টি",
    description: "A cluster of potholes has appeared on the Tangail bypass near Jamurki after the last monsoon. Several potholes are more than 20cm deep and are causing daily vehicle damage.",
    description_bn: "গত বর্ষার পর জামুর্কির কাছে টাঙ্গাইল বাইপাসে গর্তের একটি সমষ্টি তৈরি হয়েছে। বেশ কয়েকটি গর্ত ২০ সেমি-র বেশি গভীর এবং প্রতিদিন যানবাহনের ক্ষতি করছে।",
    location: { lat: 24.2513, lng: 89.9167, address: "Tangail Bypass, near Jamurki", district: "Tangail", address_bn: "টাঙ্গাইল বাইপাস, জামুর্কির কাছে" },
    category: ReportCategory.POTHOLE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-04T09:00:00.000Z", updatedAt: "2026-10-05T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Verified. Patching work scheduled for this weekend.",
    adminNote_bn: "যাচাই করা হয়েছে। এই সপ্তাহান্তে প্যাচিং কাজ নির্ধারিত আছে।",
  },

  // Rajshahi
  {
    id: "seed-033",
    title: "Broken streetlights on Rajshahi Zero Point to Shaheb Bazar road",
    title_bn: "রাজশাহী জিরো পয়েন্ট থেকে সাহেব বাজার রোডে ভাঙা রাস্তার বাতি",
    description: "More than half the streetlights on the main Rajshahi city road from Zero Point to Shaheb Bazar are non-functional. The evening and early morning hours are especially dangerous for pedestrians.",
    description_bn: "জিরো পয়েন্ট থেকে সাহেব বাজার পর্যন্ত রাজশাহী শহরের প্রধান রাস্তায় অর্ধেকেরও বেশি রাস্তার বাতি অকার্যকর। সন্ধ্যা ও ভোরের সময়গুলো পথচারীদের জন্য বিশেষভাবে বিপজ্জনক।",
    location: { lat: 24.3745, lng: 88.6042, address: "Zero Point to Shaheb Bazar Road, Rajshahi", district: "Rajshahi", address_bn: "জিরো পয়েন্ট থেকে সাহেব বাজার রোড, রাজশাহী" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.MEDIUM, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-07T20:00:00.000Z", updatedAt: "2026-10-09T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "NESCO repair crew assigned. Works started on 10 faulty poles.",
    adminNote_bn: "নেসকোর মেরামত দল নিযুক্ত হয়েছে। ১০টি ত্রুটিপূর্ণ খুঁটিতে কাজ শুরু হয়েছে।",
  },

  // Chapai Nawabganj
  {
    id: "seed-034",
    title: "Eroded road shoulder on Chapai Nawabganj–Shibganj highway",
    title_bn: "চাঁপাই নবাবগঞ্জ–শিবগঞ্জ মহাসড়কে ক্ষয়প্রাপ্ত রাস্তার পাশ",
    description: "The road shoulder on the Chapai Nawabganj–Shibganj highway has severely eroded near the Mahananda river embankment. Vehicles pulling off the road risk falling into a 2-metre ditch.",
    description_bn: "মহানন্দা নদীর বাঁধের কাছে চাঁপাই নবাবগঞ্জ–শিবগঞ্জ মহাসড়কের রাস্তার পাশ মারাত্মকভাবে ক্ষয় পেয়েছে। রাস্তার পাশে সরে যাওয়া যানবাহন ২ মিটার গভীর খাদে পড়ার ঝুঁকিতে আছে।",
    location: { lat: 24.5960, lng: 88.2743, address: "Chapai Nawabganj–Shibganj Highway", district: "Chapai Nawabganj", address_bn: "চাঁপাই নবাবগঞ্জ–শিবগঞ্জ মহাসড়ক" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T09:30:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Natore
  {
    id: "seed-035",
    title: "Pothole-riddled road in Natore Lalpur upazila",
    title_bn: "নাটোর লালপুর উপজেলায় গর্তে ভরা রাস্তা",
    description: "The main road through Lalpur upazila in Natore is riddled with potholes following recent heavy rains. Local farmers using this road to transport produce are facing significant losses due to vehicle damage.",
    description_bn: "সাম্প্রতিক ভারী বৃষ্টির পর নাটোরের লালপুর উপজেলার মধ্য দিয়ে যাওয়া প্রধান রাস্তাটি গর্তে ভরে গেছে। এই রাস্তায় ফসল পরিবহনকারী স্থানীয় কৃষকরা যানবাহনের ক্ষতির কারণে উল্লেখযোগ্য ক্ষতির সম্মুখীন হচ্ছেন।",
    location: { lat: 24.1033, lng: 88.9489, address: "Lalpur Upazila Main Road, Natore", district: "Natore", address_bn: "লালপুর উপজেলা মেইন রোড, নাটোর" },
    category: ReportCategory.POTHOLE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-14T12:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Bogura
  {
    id: "seed-036",
    title: "No pedestrian crossing at Bogura Satmatha intersection",
    title_bn: "বগুড়া সাতমাথা মোড়ে পথচারী পারাপার নেই",
    description: "The busy Satmatha intersection in Bogura city has no designated pedestrian crossings, zebra markings, or pedestrian signals. Hundreds of shoppers cross dangerously between fast-moving vehicles.",
    description_bn: "বগুড়া শহরের ব্যস্ত সাতমাথা মোড়ে কোনো নির্ধারিত পথচারী পারাপার, জেব্রা চিহ্নিতকরণ বা পথচারী সিগন্যাল নেই। শত শত ক্রেতা দ্রুতগামী যানবাহনের মধ্য দিয়ে বিপজ্জনকভাবে পার হচ্ছেন।",
    location: { lat: 24.8465, lng: 89.3773, address: "Satmatha Intersection, Bogura", district: "Bogura", address_bn: "সাতমাথা মোড়, বগুড়া" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-06T13:00:00.000Z", updatedAt: "2026-10-07T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Confirmed high-pedestrian-traffic zone. Zebra painting and signal installation queued.",
    adminNote_bn: "উচ্চ পথচারী-যানজটের এলাকা নিশ্চিত হয়েছে। জেব্রা রঙ করা ও সিগন্যাল স্থাপনের কাজ নির্ধারিত আছে।",
  },

  // Joypurhat
  {
    id: "seed-037",
    title: "Crumbling road surface near Joypurhat Sugar Mill",
    title_bn: "জয়পুরহাট চিনিকল এলাকার কাছে ভেঙে পড়া রাস্তার পৃষ্ঠ",
    description: "The road near Joypurhat Sugar Mill has been severely damaged by heavy sugarcane trucks. The surface has completely broken down along a 300m stretch.",
    description_bn: "জয়পুরহাট চিনিকল এলাকার কাছের রাস্তা ভারী আখ বোঝাই ট্রাকের কারণে মারাত্মকভাবে ক্ষতিগ্রস্ত হয়েছে। ৩০০ মিটার অংশ জুড়ে পৃষ্ঠ সম্পূর্ণভাবে ভেঙে পড়েছে।",
    location: { lat: 25.1028, lng: 89.0224, address: "Near Joypurhat Sugar Mill, Joypurhat", district: "Joypurhat", address_bn: "জয়পুরহাট চিনিকলের কাছে, জয়পুরহাট" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-09T08:30:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Sirajganj
  {
    id: "seed-038",
    title: "Flooding blocks Sirajganj–Pabna highway near Belkuchi",
    title_bn: "বেলকুচির কাছে সিরাজগঞ্জ–পাবনা মহাসড়ক বন্যায় বন্ধ",
    description: "Seasonal flooding from the Jamuna river has inundated a 2km section of the Sirajganj–Pabna highway near Belkuchi. The road is impassable and alternative routes add over an hour to journey times.",
    description_bn: "যমুনা নদীর মৌসুমী বন্যা বেলকুচির কাছে সিরাজগঞ্জ–পাবনা মহাসড়কের ২ কিলোমিটার অংশ ডুবিয়ে দিয়েছে। রাস্তাটি অপ্রবেশযোগ্য এবং বিকল্প পথে যাতায়াতের সময় এক ঘণ্টারও বেশি বেড়ে যাচ্ছে।",
    location: { lat: 24.4533, lng: 89.7150, address: "Sirajganj–Pabna Highway, near Belkuchi", district: "Sirajganj", address_bn: "সিরাজগঞ্জ–পাবনা মহাসড়ক, বেলকুচির কাছে" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.CRITICAL, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-10T07:00:00.000Z", updatedAt: "2026-10-11T08:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Emergency alert issued. Alternative route signage deployed.",
    adminNote_bn: "জরুরি সতর্কতা জারি করা হয়েছে। বিকল্প পথের সাইন স্থাপন করা হয়েছে।",
  },

  // Pabna
  {
    id: "seed-039",
    title: "Sharp blind curve on Pabna–Ishwardi railway crossing road",
    title_bn: "পাবনা–ঈশ্বরদী রেল ক্রসিং রোডে তীক্ষ্ণ অদৃশ্য বাঁক",
    description: "A sharp blind curve immediately before the Pabna–Ishwardi railway level crossing has no warning signs. Vehicles frequently brake suddenly on the tracks when trains approach.",
    description_bn: "পাবনা–ঈশ্বরদী রেল লেভেল ক্রসিংয়ের ঠিক আগে একটি তীক্ষ্ণ অদৃশ্য বাঁকে কোনো সতর্কতা সাইন নেই। ট্রেন আসার সময় যানবাহন প্রায়ই ট্র্যাকে হঠাৎ ব্রেক করছে।",
    location: { lat: 24.0065, lng: 89.2439, address: "Pabna–Ishwardi Railway Crossing Road, Pabna", district: "Pabna", address_bn: "পাবনা–ঈশ্বরদী রেল ক্রসিং রোড, পাবনা" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.CRITICAL, status: ReportStatus.PENDING,
    submittedAt: "2026-10-14T17:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Khulna
  {
    id: "seed-040",
    title: "Waterlogged road in Khulna Sonadanga residential area",
    title_bn: "খুলনা সোনাডাঙ্গা আবাসিক এলাকায় জলাবদ্ধ রাস্তা",
    description: "The main road in Khulna's Sonadanga residential area floods with every moderate rain due to blocked drainage channels. Residents have complained repeatedly for two years with no action.",
    description_bn: "অবরুদ্ধ ড্রেনেজ চ্যানেলের কারণে খুলনার সোনাডাঙ্গা আবাসিক এলাকার প্রধান রাস্তা প্রতিটি মাঝারি বৃষ্টিতে ডুবে যায়। বাসিন্দারা দুই বছর ধরে বারবার অভিযোগ করেছেন কিন্তু কোনো ব্যবস্থা নেওয়া হয়নি।",
    location: { lat: 22.8208, lng: 89.5477, address: "Sonadanga Residential Area, Khulna", district: "Khulna", address_bn: "সোনাডাঙ্গা আবাসিক এলাকা, খুলনা" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-08T09:00:00.000Z", updatedAt: "2026-10-09T12:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "KCC drainage division engaged. Desilting work to begin next week.",
    adminNote_bn: "কেসিসি ড্রেনেজ বিভাগকে যুক্ত করা হয়েছে। আগামী সপ্তাহে পলি অপসারণ কাজ শুরু হবে।",
  },

  // Bagerhat
  {
    id: "seed-041",
    title: "Broken road near Bagerhat Sundarban ferry ghat",
    title_bn: "বাগেরহাট সুন্দরবন ফেরি ঘাটের কাছে ভাঙা রাস্তা",
    description: "The road leading to the Sundarban ferry ghat in Bagerhat is heavily damaged with potholes and broken edges. Tourist vehicles and local residents face daily difficulties.",
    description_bn: "বাগেরহাটে সুন্দরবন ফেরি ঘাটের দিকে যাওয়ার রাস্তাটি গর্ত ও ভাঙা প্রান্তে ব্যাপকভাবে ক্ষতিগ্রস্ত। পর্যটক যানবাহন ও স্থানীয় বাসিন্দারা প্রতিদিন সমস্যার সম্মুখীন হচ্ছেন।",
    location: { lat: 22.6543, lng: 89.7854, address: "Sundarban Ferry Ghat Road, Bagerhat", district: "Bagerhat", address_bn: "সুন্দরবন ফেরি ঘাট রোড, বাগেরহাট" },
    category: ReportCategory.POTHOLE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T11:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Satkhira
  {
    id: "seed-042",
    title: "Tidal flooding on Satkhira–Shyamnagar coastal road",
    title_bn: "সাতক্ষীরা–শ্যামনগর উপকূলীয় রোডে জোয়ারের বন্যা",
    description: "The coastal road connecting Satkhira to Shyamnagar floods during high tide, particularly during the rainy season. Sections remain under water for 3–4 hours daily.",
    description_bn: "সাতক্ষীরা থেকে শ্যামনগর সংযোগকারী উপকূলীয় রাস্তাটি জোয়ারের সময়, বিশেষ করে বর্ষা মৌসুমে, ডুবে যায়। কিছু অংশ প্রতিদিন ৩–৪ ঘণ্টা পানির নিচে থাকে।",
    location: { lat: 22.3321, lng: 89.0722, address: "Satkhira–Shyamnagar Coastal Road, Satkhira", district: "Satkhira", address_bn: "সাতক্ষীরা–শ্যামনগর উপকূলীয় রোড, সাতক্ষীরা" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T06:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Jessore (Jashore)
  {
    id: "seed-043",
    title: "No road markings on Jessore–Benapole highway approach",
    title_bn: "যশোর–বেনাপোল মহাসড়কের প্রবেশপথে কোনো রোড মার্কিং নেই",
    description: "The approach road to Benapole port from Jessore has faded road markings and no lane dividers for the last 8km. International freight trucks frequently straddle lanes unsafely.",
    description_bn: "যশোর থেকে বেনাপোল বন্দরের প্রবেশপথের শেষ ৮ কিলোমিটারে রোড মার্কিং ম্লান হয়ে গেছে এবং কোনো লেন বিভাজক নেই। আন্তর্জাতিক মালবাহী ট্রাক প্রায়ই অনিরাপদভাবে লেন পার হচ্ছে।",
    location: { lat: 23.1722, lng: 89.1608, address: "Jessore–Benapole Highway, Jashore", district: "Jashore", address_bn: "যশোর–বেনাপোল মহাসড়ক, যশোর" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-05T10:00:00.000Z", updatedAt: "2026-10-07T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Road marking repainting crew deployed on highway section.",
    adminNote_bn: "মহাসড়ক অংশে রোড মার্কিং পুনরায় রঙ করার দল মোতায়েন হয়েছে।",
  },

  // Magura
  {
    id: "seed-044",
    title: "Unpaved and muddy rural road in Magura Sreepur",
    title_bn: "মাগুরা শ্রীপুরে অপরিচ্ছন্ন ও কাদাময় গ্রামীণ রাস্তা",
    description: "The rural road connecting Sreepur upazila centre to local villages in Magura remains unpaved and becomes dangerously muddy during rains. School children and farmers are severely affected.",
    description_bn: "মাগুরায় শ্রীপুর উপজেলা কেন্দ্র থেকে স্থানীয় গ্রামগুলোকে সংযোগকারী গ্রামীণ রাস্তাটি পাকা নয় এবং বৃষ্টিতে বিপজ্জনকভাবে কাদাময় হয়ে পড়ে। স্কুলের শিশু ও কৃষকরা মারাত্মকভাবে ক্ষতিগ্রস্ত হচ্ছেন।",
    location: { lat: 23.4884, lng: 89.4206, address: "Sreepur Upazila Road, Magura", district: "Magura", address_bn: "শ্রীপুর উপজেলা রোড, মাগুরা" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T12:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Narail
  {
    id: "seed-045",
    title: "Blocked road due to construction near Narail bus terminal",
    title_bn: "নড়াইল বাস টার্মিনালের কাছে নির্মাণের কারণে রাস্তা বন্ধ",
    description: "Ongoing construction work near Narail bus terminal has narrowed the main approach road to a single lane with no proper traffic management or warning signs in place.",
    description_bn: "নড়াইল বাস টার্মিনালের কাছে চলমান নির্মাণ কাজ প্রধান প্রবেশ রাস্তাকে একটি লেনে সংকুচিত করেছে এবং কোনো সঠিক ট্রাফিক ব্যবস্থাপনা বা সতর্কতা সাইন নেই।",
    location: { lat: 23.1726, lng: 89.5010, address: "Near Narail Bus Terminal, Narail", district: "Narail", address_bn: "নড়াইল বাস টার্মিনালের কাছে, নড়াইল" },
    category: ReportCategory.BLOCKED_ROAD, severity: Severity.MEDIUM, status: ReportStatus.RESOLVED,
    submittedAt: "2026-10-01T09:00:00.000Z", updatedAt: "2026-10-03T16:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Construction site ordered to clear road. Traffic flow restored.",
    adminNote_bn: "নির্মাণস্থলকে রাস্তা পরিষ্কার করার নির্দেশ দেওয়া হয়েছে। ট্রাফিক প্রবাহ পুনরুদ্ধার করা হয়েছে।",
  },

  // Chuadanga
  {
    id: "seed-046",
    title: "Pothole-damaged road near Chuadanga Alamdanga",
    title_bn: "চুয়াডাঙ্গা আলমডাঙ্গার কাছে গর্তে ক্ষতিগ্রস্ত রাস্তা",
    description: "The road near Alamdanga in Chuadanga district has numerous potholes caused by heavy sugarcane transport vehicles. At night, the potholes are invisible and have caused several accidents.",
    description_bn: "চুয়াডাঙ্গা জেলার আলমডাঙ্গার কাছের রাস্তায় ভারী আখ পরিবহন যানবাহনের কারণে অনেক গর্ত তৈরি হয়েছে। রাতে গর্তগুলো অদৃশ্য থাকে এবং বেশ কয়েকটি দুর্ঘটনার কারণ হয়েছে।",
    location: { lat: 23.8994, lng: 88.9243, address: "Alamdanga Road, Chuadanga", district: "Chuadanga", address_bn: "আলমডাঙ্গা রোড, চুয়াডাঙ্গা" },
    category: ReportCategory.POTHOLE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T14:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Meherpur
  {
    id: "seed-047",
    title: "No lighting on Meherpur–Mujibnagar road at night",
    title_bn: "মেহেরপুর–মুজিবনগর সড়কে রাতে কোনো আলো নেই",
    description: "The historic road leading to Mujibnagar from Meherpur town has no street lighting. Despite being a tourist destination, the road is completely dark after sunset, posing risks to visitors.",
    description_bn: "মেহেরপুর শহর থেকে মুজিবনগরের দিকে যাওয়া ঐতিহাসিক রাস্তায় কোনো রাস্তার বাতি নেই। পর্যটন গন্তব্য হওয়া সত্ত্বেও, সূর্যাস্তের পর রাস্তাটি সম্পূর্ণ অন্ধকার, যা পর্যটকদের জন্য ঝুঁকি তৈরি করছে।",
    location: { lat: 23.7621, lng: 88.6318, address: "Meherpur–Mujibnagar Road, Meherpur", address_bn: "মেহেরপুর–মুজিবনগর সড়ক, মেহেরপুর" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T20:30:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Kushtia
  {
    id: "seed-048",
    title: "Dangerous road condition near Kushtia Hardinge Bridge approach",
    title_bn: "কুষ্টিয়া হার্ডিঞ্জ সেতুর কাছে বিপজ্জনক সড়ক অবস্থা",
    description: "The approach road to the Hardinge Bridge from Kushtia town has severely cracked and uneven surfaces. Large trucks and buses frequently lose control on the uneven sections.",
    description_bn: "কুষ্টিয়া শহর থেকে হার্ডিঞ্জ সেতুর প্রবেশপথে রাস্তার পৃষ্ঠ মারাত্মকভাবে ফাটা ও অসমান। ভারী ট্রাক ও বাস প্রায়ই অসমান অংশে নিয়ন্ত্রণ হারাচ্ছে।",
    location: { lat: 23.9062, lng: 89.1205, address: "Hardinge Bridge Approach Road, Kushtia", district: "Kushtia", address_bn: "হার্ডিঞ্জ সেতুর প্রবেশপথ, কুষ্টিয়া" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-08T10:00:00.000Z", updatedAt: "2026-10-09T15:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Verified. Roads & Highways Dept. Kushtia zone alerted. Repair queued.",
    adminNote_bn: "যাচাই করা হয়েছে। সড়ক ও জনপথ বিভাগ কুষ্টিয়া জোনকে সতর্ক করা হয়েছে। মেরামত নির্ধারিত আছে।",
  },

  // Jhenaidah
  {
    id: "seed-049",
    title: "Road blocked by fallen tree near Jhenaidah Kaliganj",
    title_bn: "ঝিনাইদহ কালীগঞ্জের কাছে গাছ পড়ে রাস্তা বন্ধ",
    description: "A large tree fell across the Jhenaidah–Kaliganj road during a storm, blocking traffic completely. The tree has not been removed and emergency services cannot pass.",
    description_bn: "ঝড়ের সময় একটি বড় গাছ ঝিনাইদহ–কালীগঞ্জ রোডে পড়ে যানবাহন সম্পূর্ণ বন্ধ করে দিয়েছে। গাছটি সরানো হয়নি এবং জরুরি সেবা পার হতে পারছে না।",
    location: { lat: 23.0753, lng: 89.1699, address: "Jhenaidah–Kaliganj Road, Jhenaidah", district: "Jhenaidah", address_bn: "ঝিনাইদহ–কালীগঞ্জ রোড, ঝিনাইদহ" },
    category: ReportCategory.BLOCKED_ROAD, severity: Severity.CRITICAL, status: ReportStatus.RESOLVED,
    submittedAt: "2026-10-03T06:00:00.000Z", updatedAt: "2026-10-03T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Tree cleared by fire service. Road fully reopened.",
    adminNote_bn: "ফায়ার সার্ভিস কর্তৃক গাছ সরিয়ে ফেলা হয়েছে। রাস্তা সম্পূর্ণরূপে পুনরায় খুলে দেওয়া হয়েছে।",
  },

  // Barisal (Barishal)
  {
    id: "seed-050",
    title: "Road flooding near Barisal Launch Terminal",
    title_bn: "বরিশাল লঞ্চ টার্মিনালের কাছে রাস্তায় জলাবদ্ধতা",
    description: "The road near Barisal Launch Terminal floods frequently during the monsoon. Passengers alighting from river launches have to wade through dirty water, and vehicle engines regularly stall.",
    description_bn: "বর্ষা মৌসুমে বরিশাল লঞ্চ টার্মিনালের কাছের রাস্তা ঘন ঘন ডুবে যায়। নদীর লঞ্চ থেকে নামা যাত্রীদের নোংরা পানির মধ্য দিয়ে হাঁটতে হচ্ছে এবং যানবাহনের ইঞ্জিন নিয়মিত বন্ধ হয়ে যাচ্ছে।",
    location: { lat: 22.7010, lng: 90.3535, address: "Near Barisal Launch Terminal, Barishal", district: "Barishal", address_bn: "বরিশাল লঞ্চ টার্মিনালের কাছে, বরিশাল" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-07T08:00:00.000Z", updatedAt: "2026-10-08T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Barisal City Corporation drainage team deployed. Pumps installed.",
    adminNote_bn: "বরিশাল সিটি করপোরেশনের ড্রেনেজ দল মোতায়েন হয়েছে। পাম্প স্থাপন করা হয়েছে।",
  },

  // Bhola
  {
    id: "seed-051",
    title: "Eroded coastal road in Bhola Charfashion",
    title_bn: "ভোলা চরফ্যাশনে ক্ষয়প্রাপ্ত উপকূলীয় রাস্তা",
    description: "The coastal road in Charfashion upazila of Bhola district has been severely eroded by tidal action. Over 500m of road surface has slipped into the river, leaving the area inaccessible by vehicle.",
    description_bn: "ভোলা জেলার চরফ্যাশন উপজেলার উপকূলীয় রাস্তাটি জোয়ারের ক্রিয়ায় মারাত্মকভাবে ক্ষয় পেয়েছে। ৫০০ মিটারেরও বেশি রাস্তার পৃষ্ঠ নদীতে চলে গেছে, যানবাহনে এলাকাটি অপ্রবেশযোগ্য করে ফেলছে।",
    location: { lat: 22.2008, lng: 90.9699, address: "Charfashion Coastal Road, Bhola", district: "Bhola", address_bn: "চরফ্যাশন উপকূলীয় রোড, ভোলা" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.PENDING,
    submittedAt: "2026-10-09T09:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Patuakhali
  {
    id: "seed-052",
    title: "No warning signs before Patuakhali Kuakata beach road sharp turn",
    title_bn: "পটুয়াখালী কুয়াকাটা সমুদ্র সৈকত সড়কের তীক্ষ্ণ বাঁকের আগে কোনো সতর্কতা সাইন নেই",
    description: "The road to Kuakata beach from Patuakhali town has a sharp 90-degree turn with no warning signs. Tourist buses at high speed have narrowly avoided accidents at this bend multiple times.",
    description_bn: "পটুয়াখালী শহর থেকে কুয়াকাটা সমুদ্র সৈকতের পথে একটি তীক্ষ্ণ ৯০ ডিগ্রি বাঁকে কোনো সতর্কতা সাইন নেই। পর্যটক বাস দ্রুতগতিতে চলতে গিয়ে একাধিকবার এই বাঁকে দুর্ঘটনা থেকে কোনোমতে বেঁচে গেছে।",
    location: { lat: 22.2766, lng: 90.3282, address: "Kuakata Beach Road, Patuakhali", district: "Patuakhali", address_bn: "কুয়াকাটা সমুদ্র সৈকত রোড, পটুয়াখালী" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-06T10:00:00.000Z", updatedAt: "2026-10-07T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Warning signs ordered. Temporary reflective markers placed.",
    adminNote_bn: "সতর্কতা সাইন অর্ডার করা হয়েছে। অস্থায়ী প্রতিফলক মার্কার স্থাপন করা হয়েছে।",
  },

  // Barguna
  {
    id: "seed-053",
    title: "Muddy and broken road near Barguna Amtali upazila",
    title_bn: "বরগুনা আমতলী উপজেলার কাছে কাদাময় ও ভাঙা রাস্তা",
    description: "The road near Amtali upazila in Barguna becomes completely impassable in the rainy season due to deep mud and broken asphalt. Ambulances cannot reach local health centres.",
    description_bn: "বরগুনার আমতলী উপজেলার কাছের রাস্তাটি গভীর কাদা ও ভাঙা পিচের কারণে বর্ষা মৌসুমে সম্পূর্ণ অপ্রবেশযোগ্য হয়ে পড়ে। অ্যাম্বুলেন্স স্থানীয় স্বাস্থ্য কেন্দ্রে পৌঁছাতে পারছে না।",
    location: { lat: 22.0919, lng: 90.2293, address: "Amtali Upazila Road, Barguna", district: "Barguna", address_bn: "আমতলী উপজেলা রোড, বরগুনা" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T09:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Pirojpur
  {
    id: "seed-054",
    title: "Road subsidence near Pirojpur Mathbaria",
    title_bn: "পিরোজপুর মঠবাড়িয়ার কাছে রাস্তা দেবে যাওয়া",
    description: "A road near Mathbaria in Pirojpur has subsided by 20cm in a 100m stretch due to waterlogging under the base layer. The surface is now cracked and vehicles bounce dangerously.",
    description_bn: "পিরোজপুরের মঠবাড়িয়ার কাছে একটি রাস্তায় বেস লেয়ারের নিচে জলাবদ্ধতার কারণে ১০০ মিটার অংশে ২০ সেমি দেবে গেছে। পৃষ্ঠটি এখন ফাটা এবং যানবাহন বিপজ্জনকভাবে লাফ দিচ্ছে।",
    location: { lat: 22.0638, lng: 89.9690, address: "Mathbaria Road, Pirojpur", district: "Pirojpur", address_bn: "মঠবাড়িয়া রোড, পিরোজপুর" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T13:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Jhalokati
  {
    id: "seed-055",
    title: "Flooding blocks road between Jhalokati and Kathalia",
    title_bn: "ঝালকাঠি ও কাঠালিয়ার মধ্যে বন্যায় রাস্তা বন্ধ",
    description: "The road between Jhalokati town and Kathalia upazila floods every monsoon for extended periods. The road is only accessible by boat for 3–4 months per year.",
    description_bn: "ঝালকাঠি শহর ও কাঠালিয়া উপজেলার মধ্যবর্তী রাস্তাটি প্রতি বর্ষায় দীর্ঘ সময়ের জন্য প্লাবিত হয়। বছরে ৩–৪ মাস রাস্তাটি শুধু নৌকায় পৌঁছানো সম্ভব।",
    location: { lat: 22.6369, lng: 90.1986, address: "Jhalokati–Kathalia Road, Jhalokati", district: "Jhalokati", address_bn: "ঝালকাঠি–কাঠালিয়া রোড, ঝালকাঠি" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.CRITICAL, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-02T10:00:00.000Z", updatedAt: "2026-10-03T13:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Long-standing issue. Road elevation project proposed to LGD.",
    adminNote_bn: "দীর্ঘস্থায়ী সমস্যা। এলজিডি-তে রাস্তা উচ্চতা প্রকল্প প্রস্তাব করা হয়েছে।",
  },

  // Comilla (Cumilla)
  {
    id: "seed-056",
    title: "Pothole damage on Cumilla–Chandpur highway near Daudkandi",
    title_bn: "দাউদকান্দির কাছে কুমিল্লা–চাঁদপুর মহাসড়কে গর্তের ক্ষতি",
    description: "The Cumilla–Chandpur highway near Daudkandi has a 1km pothole-riddled stretch that forces vehicles to slow to walking speed. The damage was made worse by heavy rains in September.",
    description_bn: "দাউদকান্দির কাছে কুমিল্লা–চাঁদপুর মহাসড়কে ১ কিলোমিটার গর্তে ভরা অংশ রয়েছে যা যানবাহনকে হাঁটার গতিতে ধীর করতে বাধ্য করে। সেপ্টেম্বরে ভারী বৃষ্টিতে ক্ষতি আরও বেড়েছে।",
    location: { lat: 23.5319, lng: 90.7295, address: "Cumilla–Chandpur Highway, near Daudkandi", district: "Cumilla", address_bn: "কুমিল্লা–চাঁদপুর মহাসড়ক, দাউদকান্দির কাছে" },
    category: ReportCategory.POTHOLE, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-05T09:00:00.000Z", updatedAt: "2026-10-07T11:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Patching work 50% complete. Full repair expected by end of month.",
    adminNote_bn: "প্যাচিং কাজ ৫০% সম্পন্ন। মাসের শেষের মধ্যে সম্পূর্ণ মেরামতের প্রত্যাশা।",
  },

  // Chandpur
  {
    id: "seed-057",
    title: "No lighting on Chandpur–Hajiganj ferry road at night",
    title_bn: "চাঁদপুর–হাজীগঞ্জ ফেরি রোডে রাতে কোনো আলো নেই",
    description: "The road from Chandpur town to the Hajiganj ferry ghat is completely unlit at night. Ferry passengers travelling late at night face significant safety risks.",
    description_bn: "চাঁদপুর শহর থেকে হাজীগঞ্জ ফেরি ঘাটের রাস্তাটি রাতে সম্পূর্ণ অন্ধকার। রাত দেরিতে ফেরির যাত্রীরা উল্লেখযোগ্য নিরাপত্তা ঝুঁকির সম্মুখীন হচ্ছেন।",
    location: { lat: 23.2332, lng: 90.6517, address: "Chandpur–Hajiganj Ferry Road, Chandpur", district: "Chandpur", address_bn: "চাঁদপুর–হাজীগঞ্জ ফেরি রোড, চাঁদপুর" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T22:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Lakshmipur
  {
    id: "seed-058",
    title: "Debris-blocked road near Lakshmipur Ramgati ferry crossing",
    title_bn: "লক্ষ্মীপুর রামগতি ফেরি ক্রসিংয়ের কাছে ধ্বংসাবশেষে আটকানো রাস্তা",
    description: "Silt and debris deposited by recent flooding have blocked sections of the approach road to Ramgati ferry crossing in Lakshmipur, reducing it to a single narrow lane.",
    description_bn: "সাম্প্রতিক বন্যায় জমা পলি ও ধ্বংসাবশেষ লক্ষ্মীপুরের রামগতি ফেরি ক্রসিংয়ের প্রবেশপথের কিছু অংশ আটকে দিয়েছে, এটিকে একটি সরু লেনে পরিণত করেছে।",
    location: { lat: 22.8536, lng: 90.8332, address: "Ramgati Ferry Crossing Road, Lakshmipur", district: "Lakshmipur", address_bn: "রামগতি ফেরি ক্রসিং রোড, লক্ষ্মীপুর" },
    category: ReportCategory.BLOCKED_ROAD, severity: Severity.MEDIUM, status: ReportStatus.RESOLVED,
    submittedAt: "2026-10-04T08:00:00.000Z", updatedAt: "2026-10-06T15:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Silt removed by RHD team. Road cleared.",
    adminNote_bn: "আরএইচডি দল কর্তৃক পলি সরিয়ে ফেলা হয়েছে। রাস্তা পরিষ্কার হয়েছে।",
  },

  // Noakhali
  {
    id: "seed-059",
    title: "Flooded road on Noakhali–Companiganj coastal route",
    title_bn: "নোয়াখালী–কোম্পানীগঞ্জ উপকূলীয় রুটে প্লাবিত রাস্তা",
    description: "The coastal route from Noakhali to Companiganj frequently floods during tidal surges and monsoon rain. The road is inaccessible for 4–6 hours during flood peaks.",
    description_bn: "নোয়াখালী থেকে কোম্পানীগঞ্জের উপকূলীয় পথ জলোচ্ছ্বাস ও বর্ষার বৃষ্টিতে ঘন ঘন প্লাবিত হয়। বন্যার শিখরে রাস্তাটি ৪–৬ ঘণ্টা অপ্রবেশযোগ্য থাকে।",
    location: { lat: 22.8696, lng: 91.0996, address: "Noakhali–Companiganj Coastal Road, Noakhali", district: "Noakhali", address_bn: "নোয়াখালী–কোম্পানীগঞ্জ উপকূলীয় রোড, নোয়াখালী" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T07:30:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Feni
  {
    id: "seed-060",
    title: "Road damage on Feni–Noakhali highway after flooding",
    title_bn: "বন্যার পর ফেনী–নোয়াখালী মহাসড়কে রাস্তার ক্ষতি",
    description: "After recent flash flooding, the Feni–Noakhali highway has multiple sections of damaged asphalt and exposed subgrade. Some road edges have collapsed entirely.",
    description_bn: "সাম্প্রতিক আকস্মিক বন্যার পর, ফেনী–নোয়াখালী মহাসড়কে ক্ষতিগ্রস্ত পিচ ও উন্মুক্ত সাবগ্রেডের একাধিক অংশ রয়েছে। কিছু রাস্তার প্রান্ত সম্পূর্ণভাবে ধসে পড়েছে।",
    location: { lat: 23.0258, lng: 91.3997, address: "Feni–Noakhali Highway, Feni", district: "Feni", address_bn: "ফেনী–নোয়াখালী মহাসড়ক, ফেনী" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-06T09:00:00.000Z", updatedAt: "2026-10-08T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Emergency repairs underway. Affected sections temporarily marked with barriers.",
    adminNote_bn: "জরুরি মেরামত চলছে। ক্ষতিগ্রস্ত অংশগুলো অস্থায়ীভাবে ব্যারিকেড দিয়ে চিহ্নিত করা হয়েছে।",
  },

  // Cox's Bazar
  {
    id: "seed-061",
    title: "Dangerous cliff-edge road on Cox's Bazar Marine Drive",
    title_bn: "কক্সবাজার মেরিন ড্রাইভে বিপজ্জনক পাহাড়ের কিনারের রাস্তা",
    description: "A section of Cox's Bazar Marine Drive near Inani Beach runs along a cliff edge with a 15-metre drop to the sea. There are no guardrails, reflectors, or warning signs. Night accidents are common.",
    description_bn: "ইনানী সমুদ্র সৈকতের কাছে কক্সবাজার মেরিন ড্রাইভের একটি অংশ সমুদ্রে ১৫ মিটার নামার পাহাড়ের কিনারে চলছে। কোনো রেলিং, প্রতিফলক বা সতর্কতা সাইন নেই। রাতের দুর্ঘটনা সাধারণ ঘটনা।",
    location: { lat: 21.5435, lng: 92.0065, address: "Marine Drive near Inani Beach, Cox's Bazar", district: "Cox's Bazar", address_bn: "ইনানী সমুদ্র সৈকতের কাছে মেরিন ড্রাইভ, কক্সবাজার" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.CRITICAL, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-09T10:00:00.000Z", updatedAt: "2026-10-10T13:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Highly critical tourist route. Guardrail installation approved. Contractor mobilising.",
    adminNote_bn: "অত্যন্ত গুরুত্বপূর্ণ পর্যটন রুট। রেলিং স্থাপন অনুমোদিত হয়েছে। ঠিকাদার মোতায়েন হচ্ছে।",
  },

  // Bandarban
  {
    id: "seed-062",
    title: "Landslide blocking Bandarban–Ruma hill road",
    title_bn: "বান্দরবান–রুমা পাহাড়ি রাস্তা ভূমিধসে আটকানো",
    description: "A landslide has partially blocked the main hill road from Bandarban town to Ruma upazila. Debris covers one lane and the road edge is undermined. Heavy rain is expected to worsen the situation.",
    description_bn: "একটি ভূমিধস বান্দরবান শহর থেকে রুমা উপজেলার প্রধান পাহাড়ি রাস্তাটি আংশিকভাবে আটকে দিয়েছে। ধ্বংসাবশেষ একটি লেন ঢেকে দিয়েছে এবং রাস্তার প্রান্ত ক্ষয়প্রাপ্ত হয়েছে। ভারী বৃষ্টি পরিস্থিতি আরও খারাপ করবে বলে আশঙ্কা।",
    location: { lat: 22.1946, lng: 92.3194, address: "Bandarban–Ruma Hill Road, Bandarban", district: "Bandarban", address_bn: "বান্দরবান–রুমা পাহাড়ি রোড, বান্দরবান" },
    category: ReportCategory.BLOCKED_ROAD, severity: Severity.CRITICAL, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-11T08:00:00.000Z", updatedAt: "2026-10-11T15:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Army engineering unit deployed. Road partially cleared. Under monitoring.",
    adminNote_bn: "সেনাবাহিনীর প্রকৌশল দল মোতায়েন হয়েছে। রাস্তা আংশিকভাবে পরিষ্কার হয়েছে। পর্যবেক্ষণে আছে।",
  },

  // Rangamati
  {
    id: "seed-063",
    title: "No guardrails on Rangamati lake road hairpin bends",
    title_bn: "রাঙামাটি লেক রোডের হেয়ারপিন বাঁকে কোনো রেলিং নেই",
    description: "The scenic road around Kaptai Lake in Rangamati has multiple hairpin bends with no guardrails on the lake side. Tourist buses and private cars are at high risk of going over the edge.",
    description_bn: "রাঙামাটিতে কাপ্তাই লেকের চারপাশের দর্শনীয় রাস্তায় লেকের দিকে কোনো রেলিং ছাড়াই একাধিক হেয়ারপিন বাঁক রয়েছে। পর্যটক বাস ও ব্যক্তিগত গাড়ি প্রান্ত থেকে পড়ে যাওয়ার উচ্চ ঝুঁকিতে আছে।",
    location: { lat: 22.6352, lng: 92.2055, address: "Kaptai Lake Road, Rangamati", district: "Rangamati", address_bn: "কাপ্তাই লেক রোড, রাঙামাটি" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.CRITICAL, status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Khagrachhari
  {
    id: "seed-064",
    title: "Road washed away near Khagrachhari Matiranga",
    title_bn: "খাগড়াছড়ি মাটিরাঙার কাছে রাস্তা ভেসে গেছে",
    description: "Flash flooding has washed away a 200m section of road near Matiranga in Khagrachhari district. The road serves several villages with no alternative connection.",
    description_bn: "আকস্মিক বন্যায় খাগড়াছড়ি জেলার মাটিরাঙার কাছে রাস্তার ২০০ মিটার অংশ ভেসে গেছে। রাস্তাটি কোনো বিকল্প সংযোগ ছাড়াই বেশ কয়েকটি গ্রামে সেবা দেয়।",
    location: { lat: 23.0000, lng: 91.9750, address: "Matiranga Road, Khagrachhari", district: "Khagrachhari", address_bn: "মাটিরাঙা রোড, খাগড়াছড়ি" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-08T07:00:00.000Z", updatedAt: "2026-10-09T09:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Temporary footbridge deployed. Road reconstruction budgeted.",
    adminNote_bn: "অস্থায়ী ফুটব্রিজ স্থাপন করা হয়েছে। রাস্তা পুনর্নির্মাণের বাজেট বরাদ্দ হয়েছে।",
  },

  // Brahmanbaria
  {
    id: "seed-065",
    title: "Broken road surface on Brahmanbaria–Sarail highway",
    title_bn: "ব্রাহ্মণবাড়িয়া–সরাইল মহাসড়কে ভাঙা রাস্তার পৃষ্ঠ",
    description: "The Brahmanbaria–Sarail highway is heavily damaged with cracked asphalt and subsidence along much of its length. Overloaded brick-laden trucks are the primary cause.",
    description_bn: "ব্রাহ্মণবাড়িয়া–সরাইল মহাসড়ক তার বেশিরভাগ দৈর্ঘ্য জুড়ে ফাটা পিচ ও দেবে যাওয়ায় ব্যাপকভাবে ক্ষতিগ্রস্ত। অতিরিক্ত বোঝাই ইটভর্তি ট্রাক প্রাথমিক কারণ।",
    location: { lat: 23.9571, lng: 91.1114, address: "Brahmanbaria–Sarail Highway, Brahmanbaria", district: "Brahmanbaria", address_bn: "ব্রাহ্মণবাড়িয়া–সরাইল মহাসড়ক, ব্রাহ্মণবাড়িয়া" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-07T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Habiganj
  {
    id: "seed-066",
    title: "No road markings on Habiganj–Srimangal tea estate road",
    title_bn: "হবিগঞ্জ–শ্রীমঙ্গল চা বাগানের রাস্তায় কোনো রোড মার্কিং নেই",
    description: "The winding road through the tea estates between Habiganj and Srimangal has no lane markings, no warning signs for curves, and no reflectors. Fog during winter makes this stretch extremely dangerous.",
    description_bn: "হবিগঞ্জ ও শ্রীমঙ্গলের মধ্যবর্তী চা বাগানের মধ্য দিয়ে যাওয়া আঁকাবাঁকা রাস্তায় কোনো লেন চিহ্নিতকরণ নেই, বাঁকের জন্য কোনো সতর্কতা সাইন নেই এবং কোনো প্রতিফলক নেই। শীতে কুয়াশায় এই অংশ অত্যন্ত বিপজ্জনক হয়ে ওঠে।",
    location: { lat: 24.3745, lng: 91.4156, address: "Habiganj–Srimangal Tea Estate Road, Habiganj", district: "Habiganj", address_bn: "হবিগঞ্জ–শ্রীমঙ্গল চা বাগান রোড, হবিগঞ্জ" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T11:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Moulvibazar
  {
    id: "seed-067",
    title: "Road collapsed near Moulvibazar Srimangal tea garden bridge",
    title_bn: "মৌলভীবাজার শ্রীমঙ্গল চা বাগান সেতুর কাছে রাস্তা ধসে পড়েছে",
    description: "A bridge approach road near a tea garden in Srimangal, Moulvibazar has collapsed on one side due to soil erosion. Only motorcycles can pass; all other vehicles are diverted.",
    description_bn: "মৌলভীবাজারের শ্রীমঙ্গলে একটি চা বাগানের কাছে সেতুর প্রবেশপথের রাস্তা মাটি ক্ষয়ের কারণে এক পাশে ধসে পড়েছে। শুধু মোটরসাইকেল পার হতে পারছে; অন্য সব যানবাহন অন্য পথে যাচ্ছে।",
    location: { lat: 24.3095, lng: 91.7305, address: "Tea Garden Bridge Road, Srimangal, Moulvibazar", district: "Moulvibazar", address_bn: "চা বাগান সেতুর রোড, শ্রীমঙ্গল, মৌলভীবাজার" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-05T08:30:00.000Z", updatedAt: "2026-10-06T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Structural assessment done. Emergency repair in progress.",
    adminNote_bn: "কাঠামোগত মূল্যায়ন সম্পন্ন হয়েছে। জরুরি মেরামত চলছে।",
  },

  // Sunamganj
  {
    id: "seed-068",
    title: "Haor road flooded for months in Sunamganj",
    title_bn: "সুনামগঞ্জে হাওর রোড মাসের পর মাস ধরে প্লাবিত",
    description: "The road connecting Sunamganj town to remote haor villages remains completely submerged during monsoon. Communities depend entirely on boats for 5–6 months of the year.",
    description_bn: "সুনামগঞ্জ শহরকে দূরবর্তী হাওর গ্রামগুলোর সাথে সংযোগকারী রাস্তাটি বর্ষায় সম্পূর্ণ ডুবে থাকে। সম্প্রদায়গুলো বছরের ৫–৬ মাস সম্পূর্ণভাবে নৌকার উপর নির্ভর করে।",
    location: { lat: 24.8877, lng: 91.3960, address: "Haor Connecting Road, Sunamganj", district: "Sunamganj", address_bn: "হাওর সংযোগ রোড, সুনামগঞ্জ" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.CRITICAL, status: ReportStatus.PENDING,
    submittedAt: "2026-10-14T09:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Rajshahi (rural — second report for division, Rajshahi city is seed-033)
  // Natore already covered. Adding remaining Rajshahi Division districts:

  // Dinajpur
  {
    id: "seed-069",
    title: "Pothole-riddled road near Dinajpur Kantaji Temple",
    title_bn: "দিনাজপুর কান্তাজী মন্দিরের কাছে গর্তে ভরা রাস্তা",
    description: "The tourist road leading to Kantaji Temple in Dinajpur is heavily pitted with potholes. Tourist vehicles frequently get tyre damage. The surface has not been repaired in over three years.",
    description_bn: "দিনাজপুরে কান্তাজী মন্দিরে যাওয়ার পর্যটন রাস্তাটি গর্তে ব্যাপকভাবে ক্ষতিগ্রস্ত। পর্যটক যানবাহনের টায়ার ঘন ঘন নষ্ট হচ্ছে। তিন বছরেরও বেশি সময় ধরে পৃষ্ঠের মেরামত হয়নি।",
    location: { lat: 25.7591, lng: 88.6134, address: "Kantaji Temple Road, Dinajpur", district: "Dinajpur", address_bn: "কান্তাজী মন্দির রোড, দিনাজপুর" },
    category: ReportCategory.POTHOLE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Thakurgaon
  {
    id: "seed-070",
    title: "No lighting on Thakurgaon–Baliadangi road at night",
    title_bn: "ঠাকুরগাঁও–বালিয়াডাঙ্গী সড়কে রাতে কোনো আলো নেই",
    description: "The entire Thakurgaon–Baliadangi road has no street lighting. In winter, fog combined with darkness causes accidents almost nightly. Pedestrians cross the highway in complete darkness.",
    description_bn: "সম্পূর্ণ ঠাকুরগাঁও–বালিয়াডাঙ্গী সড়কে কোনো রাস্তার বাতি নেই। শীতে, কুয়াশা ও অন্ধকার মিলে প্রায় প্রতিরাতে দুর্ঘটনার কারণ হয়। পথচারীরা সম্পূর্ণ অন্ধকারে মহাসড়ক পার হচ্ছেন।",
    location: { lat: 26.0336, lng: 88.4594, address: "Thakurgaon–Baliadangi Road, Thakurgaon", district: "Thakurgaon", address_bn: "ঠাকুরগাঁও–বালিয়াডাঙ্গী সড়ক, ঠাকুরগাঁও" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T20:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Panchagarh
  {
    id: "seed-071",
    title: "Damaged road on Panchagarh–Tetulia highway near Bangladeshi-Indian border",
    title_bn: "বাংলাদেশ-ভারত সীমান্তের কাছে পঞ্চগড়–তেঁতুলিয়া মহাসড়কে ক্ষতিগ্রস্ত রাস্তা",
    description: "The road from Panchagarh to Tetulia near the Indian border has deep cracks and subsidence. Heavy tea and agricultural transport trucks have caused significant structural damage.",
    description_bn: "ভারতীয় সীমান্তের কাছে পঞ্চগড় থেকে তেঁতুলিয়ার পথে রাস্তায় গভীর ফাটল ও দেবে যাওয়া রয়েছে। ভারী চা ও কৃষিপণ্য পরিবহন ট্রাক উল্লেখযোগ্য কাঠামোগত ক্ষতি করেছে।",
    location: { lat: 26.3389, lng: 88.5581, address: "Panchagarh–Tetulia Highway, Panchagarh", district: "Panchagarh", address_bn: "পঞ্চগড়–তেঁতুলিয়া মহাসড়ক, পঞ্চগড়" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-08T09:00:00.000Z", updatedAt: "2026-10-09T12:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Verified. Budget allocated. Repair to start after monsoon ends.",
    adminNote_bn: "যাচাই করা হয়েছে। বাজেট বরাদ্দ হয়েছে। বর্ষা শেষ হলে মেরামত শুরু হবে।",
  },

  // Nilphamari
  {
    id: "seed-072",
    title: "Blind curve accident hotspot on Nilphamari–Syedpur road",
    title_bn: "নীলফামারী–সৈয়দপুর সড়কে অদৃশ্য বাঁকে দুর্ঘটনাপ্রবণ স্থান",
    description: "A blind curve on the Nilphamari–Syedpur road near Dimla has been the site of five recorded accidents in the past year. No advance warning signs or reflectors are present.",
    description_bn: "ডিমলার কাছে নীলফামারী–সৈয়দপুর সড়কের একটি অদৃশ্য বাঁকে গত বছরে পাঁচটি রেকর্ডকৃত দুর্ঘটনা ঘটেছে। কোনো পূর্ব সতর্কতা সাইন বা প্রতিফলক নেই।",
    location: { lat: 25.9312, lng: 88.9174, address: "Nilphamari–Syedpur Road, near Dimla", district: "Nilphamari", address_bn: "নীলফামারী–সৈয়দপুর সড়ক, ডিমলার কাছে" },
    category: ReportCategory.DANGEROUS_CURVE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-07T11:00:00.000Z", updatedAt: "2026-10-08T14:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Confirmed accident hotspot. Warning signs and delineators ordered.",
    adminNote_bn: "দুর্ঘটনাপ্রবণ স্থান নিশ্চিত হয়েছে। সতর্কতা সাইন ও ডিলিনিয়েটর অর্ডার করা হয়েছে।",
  },

  // Lalmonirhat
  {
    id: "seed-073",
    title: "Road flooding near Lalmonirhat Teesta barrage approach",
    title_bn: "লালমনিরহাট তিস্তা ব্যারেজ প্রবেশপথের কাছে রাস্তায় জলাবদ্ধতা",
    description: "The approach road to the Teesta barrage in Lalmonirhat floods whenever the Teesta river is in spate. Essential vehicle access to the barrage area is cut off during monsoon.",
    description_bn: "তিস্তা নদীতে বন্যা হলে লালমনিরহাটে তিস্তা ব্যারেজের প্রবেশপথ প্লাবিত হয়। বর্ষা মৌসুমে ব্যারেজ এলাকায় অপরিহার্য যানবাহনের প্রবেশ বন্ধ হয়ে যায়।",
    location: { lat: 25.9038, lng: 89.3712, address: "Teesta Barrage Approach Road, Lalmonirhat", district: "Lalmonirhat", address_bn: "তিস্তা ব্যারেজ প্রবেশপথ, লালমনিরহাট" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T08:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Rangpur
  {
    id: "seed-074",
    title: "Deep potholes on Rangpur city bypass near Medical College",
    title_bn: "রংপুর সিটি বাইপাসে মেডিকেল কলেজের কাছে গভীর গর্ত",
    description: "The Rangpur city bypass near Rangpur Medical College has developed deep potholes that are causing ambulances to take longer alternative routes to the hospital, risking patient lives.",
    description_bn: "রংপুর মেডিকেল কলেজের কাছে রংপুর সিটি বাইপাসে গভীর গর্ত তৈরি হয়েছে যা অ্যাম্বুলেন্সকে হাসপাতালে দীর্ঘ বিকল্প পথ নিতে বাধ্য করছে, রোগীদের জীবন ঝুঁকিতে ফেলছে।",
    location: { lat: 25.7359, lng: 89.2527, address: "Rangpur City Bypass, near Medical College", district: "Rangpur", address_bn: "রংপুর সিটি বাইপাস, মেডিকেল কলেজের কাছে" },
    category: ReportCategory.POTHOLE, severity: Severity.CRITICAL, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-09T09:00:00.000Z", updatedAt: "2026-10-10T12:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Critical — medical access route. Emergency patch repair completed. Full resurface pending.",
    adminNote_bn: "অতি গুরুতর — চিকিৎসা প্রবেশ রুট। জরুরি প্যাচ মেরামত সম্পন্ন হয়েছে। সম্পূর্ণ পুনরায় পৃষ্ঠায়ন মুলতবি।",
  },

  // Gaibandha
  {
    id: "seed-075",
    title: "Road washed out near Gaibandha Fulchhari char area",
    title_bn: "গাইবান্ধা ফুলছড়ি চর এলাকার কাছে রাস্তা ভেসে গেছে",
    description: "Brahmaputra flooding has washed out a key access road to Fulchhari char area in Gaibandha. Over a thousand families are cut off from the main district town.",
    description_bn: "ব্রহ্মপুত্র বন্যা গাইবান্ধার ফুলছড়ি চর এলাকায় একটি মূল প্রবেশ রাস্তা ভাসিয়ে দিয়েছে। এক হাজারেরও বেশি পরিবার জেলা সদর থেকে বিচ্ছিন্ন হয়ে পড়েছে।",
    location: { lat: 25.3313, lng: 89.5416, address: "Fulchhari Char Road, Gaibandha", district: "Gaibandha", address_bn: "ফুলছড়ি চর রোড, গাইবান্ধা" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.CRITICAL, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-06T07:00:00.000Z", updatedAt: "2026-10-07T10:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "LGED engaged for emergency reconstruction. Temporary boat service arranged.",
    adminNote_bn: "এলজিইডি জরুরি পুনর্নির্মাণের জন্য নিযুক্ত হয়েছে। অস্থায়ী নৌকা সেবা ব্যবস্থা করা হয়েছে।",
  },

  // Kurigram
  {
    id: "seed-076",
    title: "No lighting on Kurigram–Chilmari ferry route road",
    title_bn: "কুড়িগ্রাম–চিলমারী ফেরি রুট সড়কে কোনো আলো নেই",
    description: "The road from Kurigram town to Chilmari ferry ghat has no street lighting for its entire 18km length. Night travellers and ferry passengers face extreme danger especially in winter fog.",
    description_bn: "কুড়িগ্রাম শহর থেকে চিলমারী ফেরি ঘাটের সম্পূর্ণ ১৮ কিলোমিটার পথে কোনো রাস্তার বাতি নেই। রাতের যাত্রী ও ফেরির যাত্রীরা বিশেষ করে শীতের কুয়াশায় চরম বিপদের মুখোমুখি হচ্ছেন।",
    location: { lat: 25.8073, lng: 89.6364, address: "Kurigram–Chilmari Ferry Road, Kurigram", district: "Kurigram", address_bn: "কুড়িগ্রাম–চিলমারী ফেরি রোড, কুড়িগ্রাম" },
    category: ReportCategory.POOR_LIGHTING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T21:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Jashore duplicate — already have seed-043, add another district:
  // Adding remaining missing districts alphabetically:

  // Gopalganj
  {
    id: "seed-077",
    title: "Broken road on Gopalganj–Tungipara highway",
    title_bn: "গোপালগঞ্জ–টুঙ্গিপাড়া মহাসড়কে ভাঙা রাস্তা",
    description: "The road from Gopalganj to Tungipara, a historically significant route, has multiple sections of broken asphalt and subsidence. Heavy visitor traffic to the Bangabandhu memorial has worsened the road.",
    description_bn: "গোপালগঞ্জ থেকে টুঙ্গিপাড়ার পথ, একটি ঐতিহাসিকভাবে গুরুত্বপূর্ণ রুট, ভাঙা পিচ ও দেবে যাওয়ার একাধিক অংশ রয়েছে। বঙ্গবন্ধুর স্মৃতিসৌধে ভারী দর্শনার্থী যানবাহন রাস্তার ক্ষতি করেছে।",
    location: { lat: 23.0023, lng: 89.8267, address: "Gopalganj–Tungipara Highway, Gopalganj", district: "Gopalganj", address_bn: "গোপালগঞ্জ–টুঙ্গিপাড়া মহাসড়ক, গোপালগঞ্জ" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.MEDIUM, status: ReportStatus.IN_PROGRESS,
    submittedAt: "2026-10-07T11:00:00.000Z", updatedAt: "2026-10-08T15:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Partial repairs done. Full resurfacing planned for next quarter.",
    adminNote_bn: "আংশিক মেরামত হয়েছে। পরবর্তী প্রান্তিকে সম্পূর্ণ পুনরায় পৃষ্ঠায়নের পরিকল্পনা আছে।",
  },

  // Madaripur
  {
    id: "seed-078",
    title: "Flooding blocks Madaripur–Faridpur highway near Shibchar",
    title_bn: "শিবচরের কাছে মাদারীপুর–ফরিদপুর মহাসড়কে বন্যায় রাস্তা বন্ধ",
    description: "The Madaripur–Faridpur highway near Shibchar floods badly every monsoon, disrupting travel between the two districts. Water remains on the road for up to 10 days.",
    description_bn: "শিবচরের কাছে মাদারীপুর–ফরিদপুর মহাসড়ক প্রতি বর্ষায় মারাত্মকভাবে প্লাবিত হয়, দুই জেলার মধ্যে যাতায়াত ব্যাহত করে। রাস্তায় ১০ দিন পর্যন্ত পানি থাকে।",
    location: { lat: 23.2385, lng: 90.0141, address: "Madaripur–Faridpur Highway, near Shibchar", district: "Madaripur", address_bn: "মাদারীপুর–ফরিদপুর মহাসড়ক, শিবচরের কাছে" },
    category: ReportCategory.ROAD_FLOODING, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-11T09:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Shariatpur
  {
    id: "seed-079",
    title: "No signs or lighting on Shariatpur–Janjira ferry road",
    title_bn: "শরীয়তপুর–জাঞ্জিরা ফেরি রোডে কোনো সাইন বা আলো নেই",
    description: "The Shariatpur–Janjira ferry approach road has no road signs, no lighting, and no lane markings. It serves heavy commuter ferry traffic but is completely unmarked and unlit.",
    description_bn: "শরীয়তপুর–জাঞ্জিরা ফেরির প্রবেশপথের রাস্তায় কোনো রোড সাইন নেই, কোনো আলো নেই এবং কোনো লেন চিহ্নিতকরণ নেই। এটি ভারী যাত্রীবাহী ফেরি যানবাহনের সেবা দেয় কিন্তু সম্পূর্ণ অচিহ্নিত ও আলোহীন।",
    location: { lat: 23.2462, lng: 90.4315, address: "Shariatpur–Janjira Ferry Road, Shariatpur", district: "Shariatpur", address_bn: "শরীয়তপুর–জাঞ্জিরা ফেরি রোড, শরীয়তপুর" },
    category: ReportCategory.MISSING_SIGNAGE, severity: Severity.HIGH, status: ReportStatus.PENDING,
    submittedAt: "2026-10-13T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Faridpur
  {
    id: "seed-080",
    title: "Pothole cluster near Faridpur Bhanga market road",
    title_bn: "ফরিদপুর ভাঙ্গা বাজার রোডের কাছে গর্তের সমষ্টি",
    description: "The road near Bhanga market in Faridpur has a dangerous cluster of potholes filled with muddy water. Heavy market traffic causes daily bottlenecks and vehicle damage.",
    description_bn: "ফরিদপুরে ভাঙ্গা বাজারের কাছের রাস্তায় কাদামাখা পানিতে ভরা গর্তের একটি বিপজ্জনক সমষ্টি রয়েছে। ভারী বাজার যানবাহনের কারণে প্রতিদিন যানজট ও যানবাহনের ক্ষতি হচ্ছে।",
    location: { lat: 23.6099, lng: 89.8444, address: "Bhanga Market Road, Faridpur", district: "Faridpur", address_bn: "ভাঙ্গা বাজার রোড, ফরিদপুর" },
    category: ReportCategory.POTHOLE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-12T12:00:00.000Z", submittedBy: DEMO_USER_ID,
  },

  // Rajbari
  {
    id: "seed-081",
    title: "Road damage near Rajbari Goalanda ferry terminal",
    title_bn: "রাজবাড়ী গোয়ালন্দ ফেরি টার্মিনালের কাছে রাস্তার ক্ষতি",
    description: "The road near Goalanda ferry terminal in Rajbari has badly cracked and damaged sections due to constant heavy ferry traffic. The surface is extremely rough and damages vehicle suspensions.",
    description_bn: "রাজবাড়ীতে গোয়ালন্দ ফেরি টার্মিনালের কাছের রাস্তায় ক্রমাগত ভারী ফেরি যানবাহনের কারণে ব্যাপকভাবে ফাটা ও ক্ষতিগ্রস্ত অংশ রয়েছে। পৃষ্ঠটি অত্যন্ত এবড়োখেবড়ো এবং যানবাহনের সাসপেনশনের ক্ষতি করছে।",
    location: { lat: 23.7571, lng: 89.6428, address: "Goalanda Ferry Terminal Road, Rajbari", district: "Rajbari", address_bn: "গোয়ালন্দ ফেরি টার্মিনাল রোড, রাজবাড়ী" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.HIGH, status: ReportStatus.VERIFIED,
    submittedAt: "2026-10-08T10:30:00.000Z", updatedAt: "2026-10-09T13:00:00.000Z",
    submittedBy: DEMO_USER_ID,
    adminNote: "Verified. Repair scheduled after ferry traffic peak season.",
    adminNote_bn: "যাচাই করা হয়েছে। ফেরি যানবাহনের পিক সিজনের পরে মেরামত নির্ধারিত আছে।",
  },

  // Habiganj (already have seed-066), replacing with last remaining: 
  // Netrokona already have seed-031.
  // Let's cover remaining:

  // Chapai Nawabganj already seed-034. 
  // Add Naogaon:
  {
    id: "seed-082",
    title: "Road damaged near Naogaon Paharpur archaeological site",
    title_bn: "নওগাঁ পাহাড়পুর প্রত্নতাত্ত্বিক স্থানের কাছে রাস্তার ক্ষতি",
    description: "The road to Paharpur archaeological site in Naogaon is badly damaged with large cracks and subsidence. Heavy archaeological tourism vehicles and lack of maintenance over years have led to severe deterioration.",
    description_bn: "নওগাঁতে পাহাড়পুর প্রত্নতাত্ত্বিক স্থানের পথের রাস্তাটি বড় ফাটল ও দেবে যাওয়ায় ব্যাপকভাবে ক্ষতিগ্রস্ত। বছরের পর বছর ধরে প্রত্নতাত্ত্বিক পর্যটন যানবাহন ও রক্ষণাবেক্ষণের অভাব মারাত্মক অবনতি ঘটিয়েছে।",
    location: { lat: 25.0304, lng: 88.9778, address: "Paharpur Archaeological Site Road, Naogaon", district: "Naogaon", address_bn: "পাহাড়পুর প্রত্নতাত্ত্বিক স্থান রোড, নওগাঁ" },
    category: ReportCategory.ROAD_DAMAGE, severity: Severity.MEDIUM, status: ReportStatus.PENDING,
    submittedAt: "2026-10-10T10:00:00.000Z", submittedBy: DEMO_USER_ID,
  },
];





