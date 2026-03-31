# Editorial Juris Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a demo legal intake dashboard with "The Digital Barrister" editorial design system — filterable prospect table, animated donut chart, and sidebar navigation.

**Architecture:** Next.js 16 App Router with client components for interactivity. Persistent shell (Sidebar + Header) in root layout. Dashboard page composes section components and manages filter/chart state via `useState`. Typed mock data in `lib/` enables simulated interactivity.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, lucide-react, recharts, next/font/google (Newsreader + Inter)

**Spec:** `docs/superpowers/specs/2026-04-01-editorial-juris-dashboard-design.md`

**Next.js 16 Notes:**
- `params` and `searchParams` are now async Promises (must await). Our placeholder pages don't use them so this is only relevant if we add dynamic routes later.
- Turbopack is the default bundler. No webpack config needed.
- `next/font/google` API is unchanged.
- Client components (`"use client"`) are unchanged.

---

## File Structure

```
app/
  layout.tsx                  # Modify: replace Geist fonts, add shell
  page.tsx                    # Modify: replace with dashboard composition
  globals.css                 # Modify: replace with token system
  analytics/page.tsx          # Create: placeholder
  counsel/page.tsx            # Create: placeholder
  archives/page.tsx           # Create: placeholder
components/
  sidebar.tsx                 # Create: fixed left nav
  header.tsx                  # Create: sticky top bar
  client-distribution.tsx     # Create: recharts donut + legend
  performance-card.tsx        # Create: dark navy metrics card
  prospect-table.tsx          # Create: table container
  prospect-filters.tsx        # Create: filter dropdown popovers
  prospect-row.tsx            # Create: single table row
  avatar.tsx                  # Create: initials-based avatar
  floating-action-button.tsx  # Create: FAB with tooltip
lib/
  types.ts                    # Create: TypeScript interfaces
  mock-data.ts               # Create: static data + filter functions
```

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install lucide-react and recharts**

```bash
pnpm add lucide-react recharts
```

- [ ] **Step 2: Verify installation**

```bash
pnpm ls lucide-react recharts
```

Expected: Both packages listed with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add lucide-react and recharts dependencies"
```

---

### Task 2: Configure Tailwind v4 Token System & Base Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with full token system**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme inline {
  /* Primary */
  --color-primary: #041627;
  --color-on-primary: #ffffff;
  --color-primary-container: #1a2b3c;
  --color-on-primary-container: #8192a7;
  --color-primary-fixed: #d2e4fb;
  --color-primary-fixed-dim: #b7c8de;
  --color-on-primary-fixed: #0b1d2d;
  --color-on-primary-fixed-variant: #38485a;

  /* Secondary */
  --color-secondary: #775a19;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #fed488;
  --color-on-secondary-container: #785a1a;
  --color-secondary-fixed: #ffdea5;
  --color-secondary-fixed-dim: #e9c176;
  --color-on-secondary-fixed: #261900;
  --color-on-secondary-fixed-variant: #5d4201;

  /* Tertiary */
  --color-tertiary: #1f1300;
  --color-on-tertiary: #ffffff;
  --color-tertiary-container: #392700;
  --color-on-tertiary-container: #af8c47;
  --color-tertiary-fixed: #ffdea5;
  --color-tertiary-fixed-dim: #e9c176;
  --color-on-tertiary-fixed: #261900;
  --color-on-tertiary-fixed-variant: #5d4201;

  /* Surface */
  --color-surface: #f7f9fb;
  --color-on-surface: #191c1e;
  --color-surface-variant: #e0e3e5;
  --color-on-surface-variant: #44474c;
  --color-surface-dim: #d8dadc;
  --color-surface-bright: #f7f9fb;
  --color-surface-tint: #4f6073;
  --color-surface-container: #eceef0;
  --color-surface-container-low: #f2f4f6;
  --color-surface-container-high: #e6e8ea;
  --color-surface-container-highest: #e0e3e5;
  --color-surface-container-lowest: #ffffff;
  --color-inverse-surface: #2d3133;
  --color-inverse-on-surface: #eff1f3;
  --color-inverse-primary: #b7c8de;

  /* Outline */
  --color-outline: #74777d;
  --color-outline-variant: #c4c6cd;

  /* Error */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* Background */
  --color-background: #f7f9fb;
  --color-on-background: #191c1e;

  /* Fonts */
  --font-headline: var(--font-newsreader), serif;
  --font-body: var(--font-inter), sans-serif;
}

body {
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  font-family: var(--font-body);
}
```

- [ ] **Step 2: Verify the dev server starts without errors**

```bash
pnpm dev
```

Open http://localhost:3000 — page should load (content will look different since we changed fonts/colors). Check terminal for no CSS compilation errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: configure Tailwind v4 token system with full MD3 palette"
```

---

### Task 3: Create TypeScript Interfaces

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: Create lib/types.ts**

```typescript
export interface Agent {
  name: string;
}

export interface Prospect {
  id: string;
  fullName: string;
  campaign: string;
  agent: Agent | null;
  transcriptionSnippet: string;
  aiScore: number;
  rebuttals: string[];
}

export interface ChartSegment {
  name: string;
  value: number;
  color: string;
}

export interface ChartDataset {
  label: string;
  total: string;
  totalLabel: string;
  segments: ChartSegment[];
}

export interface PerformanceMetrics {
  conversionRate: string;
  avgCallTime: string;
}

export type AiScoreRange = "all" | "90+" | "70-89" | "<70";
export type RebuttalRange = "all" | "none" | "1-2" | "3+";

export interface FilterState {
  search: string;
  campaigns: string[];
  aiScoreRange: AiScoreRange;
  rebuttalRange: RebuttalRange;
  scenarios: string[];
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add TypeScript interfaces for dashboard data model"
```

---

### Task 4: Create Mock Data & Filter Functions

**Files:**
- Create: `lib/mock-data.ts`

- [ ] **Step 1: Create lib/mock-data.ts with prospect data**

```typescript
import type {
  Prospect,
  ChartDataset,
  PerformanceMetrics,
  FilterState,
} from "./types";

export const prospects: Prospect[] = [
  {
    id: "1",
    fullName: "Jonathan Sterling",
    campaign: "Talc Class Action",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "...concerned about the long-term exposure and medical records from 2014...",
    aiScore: 88,
    rebuttals: ["Immaterially Why", "Service Proof", "Legal Standing", "Cost Clarity"],
  },
  {
    id: "2",
    fullName: "Eleanor Vance",
    campaign: "Hernia Mesh",
    agent: null,
    transcriptionSnippet:
      "Client reports significant pain after 2019 surgery. Requested counsel.",
    aiScore: 94,
    rebuttals: ["Recall Status"],
  },
  {
    id: "3",
    fullName: "Marcus Thorne",
    campaign: "Talc Class Action",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Client hesitant about litigation timeline. Needs reassurance.",
    aiScore: 72,
    rebuttals: ["Timeline Obj", "Cost Clarity"],
  },
  {
    id: "4",
    fullName: "Amara Okafor",
    campaign: "Auto Accident",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Multi-vehicle collision. Police report attached. Urgent review.",
    aiScore: 91,
    rebuttals: ["Fault Proof", "Medical Lien", "Insurance Gap"],
  },
  {
    id: "5",
    fullName: "Diane Prescott",
    campaign: "Medical Malpractice",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Post-surgical complications led to extended hospitalization. Reviewing records.",
    aiScore: 85,
    rebuttals: ["Standard of Care", "Causation"],
  },
  {
    id: "6",
    fullName: "Rafael Gutierrez",
    campaign: "Auto Accident",
    agent: null,
    transcriptionSnippet:
      "Rear-end collision on I-95. Whiplash and back injury reported.",
    aiScore: 67,
    rebuttals: [],
  },
  {
    id: "7",
    fullName: "Priya Sharma",
    campaign: "Hernia Mesh",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Mesh erosion confirmed by specialist. Seeking class action inclusion.",
    aiScore: 96,
    rebuttals: ["Device ID", "Recall Status", "Statute Check"],
  },
  {
    id: "8",
    fullName: "Thomas Whitfield",
    campaign: "Medical Malpractice",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Misdiagnosis led to delayed cancer treatment. Reviewing pathology reports.",
    aiScore: 79,
    rebuttals: ["Timeline Obj"],
  },
];

export const chartDatasets: ChartDataset[] = [
  {
    label: "Number of Calls",
    total: "1.2k",
    totalLabel: "Total Inbound",
    segments: [
      { name: "Class Action", value: 45, color: "#041627" },
      { name: "Personal Injury", value: 25, color: "#775a19" },
      { name: "Medical Malpractice", value: 20, color: "#38485a" },
      { name: "Employment Law", value: 10, color: "#b7c8de" },
    ],
  },
  {
    label: "Number of Minutes Spent",
    total: "8.4k",
    totalLabel: "Total Minutes",
    segments: [
      { name: "Class Action", value: 38, color: "#041627" },
      { name: "Personal Injury", value: 30, color: "#775a19" },
      { name: "Medical Malpractice", value: 22, color: "#38485a" },
      { name: "Employment Law", value: 10, color: "#b7c8de" },
    ],
  },
];

export const performanceMetrics: PerformanceMetrics = {
  conversionRate: "14.8%",
  avgCallTime: "12m 45s",
};

export const allCampaigns = [
  ...new Set(prospects.map((p) => p.campaign)),
];

export const allScenarios = ["Litigation", "Settlement", "Discovery", "Pre-Trial"];

export function filterProspects(
  data: Prospect[],
  filters: FilterState
): Prospect[] {
  return data.filter((prospect) => {
    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesName = prospect.fullName.toLowerCase().includes(query);
      const matchesSnippet = prospect.transcriptionSnippet
        .toLowerCase()
        .includes(query);
      if (!matchesName && !matchesSnippet) return false;
    }

    // Campaign filter
    if (
      filters.campaigns.length > 0 &&
      !filters.campaigns.includes(prospect.campaign)
    ) {
      return false;
    }

    // AI Score range filter
    switch (filters.aiScoreRange) {
      case "90+":
        if (prospect.aiScore < 90) return false;
        break;
      case "70-89":
        if (prospect.aiScore < 70 || prospect.aiScore >= 90) return false;
        break;
      case "<70":
        if (prospect.aiScore >= 70) return false;
        break;
    }

    // Rebuttal range filter
    switch (filters.rebuttalRange) {
      case "none":
        if (prospect.rebuttals.length !== 0) return false;
        break;
      case "1-2":
        if (prospect.rebuttals.length < 1 || prospect.rebuttals.length > 2)
          return false;
        break;
      case "3+":
        if (prospect.rebuttals.length < 3) return false;
        break;
    }

    // Scenario filter (maps to campaigns for demo)
    if (filters.scenarios.length > 0) {
      // For demo: scenarios are a secondary grouping, always pass
      // This filter exists to show the UI pattern
    }

    return true;
  });
}
```

- [ ] **Step 2: Verify TypeScript compilation**

```bash
pnpm exec tsc --noEmit lib/types.ts lib/mock-data.ts
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts lib/mock-data.ts
git commit -m "feat: add typed mock data with 8 prospects and filter logic"
```

---

### Task 5: Create Avatar Component

**Files:**
- Create: `components/avatar.tsx`

- [ ] **Step 1: Create components/avatar.tsx**

```tsx
"use client";

const AVATAR_COLORS = [
  "#4f6073",
  "#775a19",
  "#38485a",
  "#5d4201",
  "#041627",
  "#af8c47",
  "#74777d",
  "#1a2b3c",
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name,
  size = 32,
}: {
  name: string;
  size?: number;
}) {
  const color = AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length];
  const initials = getInitials(name);
  const fontSize = size * 0.4;

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize,
        lineHeight: 1,
      }}
    >
      <span className="text-white font-medium select-none">{initials}</span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/avatar.tsx
git commit -m "feat: add initials-based Avatar component"
```

---

### Task 6: Create Sidebar Component

**Files:**
- Create: `components/sidebar.tsx`

- [ ] **Step 1: Create components/sidebar.tsx**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  FolderOpen,
  BarChart3,
  Archive,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dossier", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/counsel", label: "Counsel", icon: Scale },
  { href: "/archives", label: "Archives", icon: Archive },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low flex flex-col z-20">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Scale className="w-4 h-4 text-on-primary" />
          </div>
          <span className="font-headline text-xl text-primary">
            Juris Dashboard
          </span>
        </div>
        <p className="text-[0.75rem] text-outline uppercase tracking-widest font-medium">
          Premium Legal Workspace
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                isActive
                  ? "text-primary font-bold border-r-2 border-primary bg-surface-container-high/50"
                  : "text-outline hover:bg-surface-container-high/30 hover:translate-x-1 transition-transform duration-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-outline-variant/15">
        <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 px-4 rounded-sm text-sm font-medium flex items-center justify-center gap-2 mb-6 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Case File
        </button>
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-outline text-xs hover:text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-outline text-xs hover:text-primary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </a>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sidebar.tsx
git commit -m "feat: add Sidebar component with active route highlighting"
```

---

### Task 7: Create Header Component

**Files:**
- Create: `components/header.tsx`

- [ ] **Step 1: Create components/header.tsx**

```tsx
"use client";

import { Search, Bell, Settings } from "lucide-react";
import { Avatar } from "./avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center w-full px-8 py-4 bg-surface-container-low/50 bg-gradient-to-b from-surface-container-high/50 to-transparent">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-headline italic text-primary">
          The Editorial Juris
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline">
            <Search className="w-4 h-4" />
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/15 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest w-64 transition-all font-body"
            placeholder="Search dossier..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-outline hover:text-on-surface-variant transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-outline hover:text-on-surface-variant transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <Avatar name="James Crawford" size={32} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/header.tsx
git commit -m "feat: add Header component with search and user avatar"
```

---

### Task 8: Update Root Layout & Create Placeholder Routes

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/analytics/page.tsx`
- Create: `app/counsel/page.tsx`
- Create: `app/archives/page.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

Replace the entire contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Juris Pro | The Editorial Juris",
  description: "Premium Legal Workspace — The Digital Barrister",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface font-body">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create app/analytics/page.tsx**

```tsx
export default function AnalyticsPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h2 className="font-headline text-3xl text-primary">Analytics</h2>
        <p className="text-sm text-outline">Coming Soon</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create app/counsel/page.tsx**

```tsx
export default function CounselPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h2 className="font-headline text-3xl text-primary">Counsel</h2>
        <p className="text-sm text-outline">Coming Soon</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create app/archives/page.tsx**

```tsx
export default function ArchivesPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h2 className="font-headline text-3xl text-primary">Archives</h2>
        <p className="text-sm text-outline">Coming Soon</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify the shell renders**

```bash
pnpm dev
```

Open http://localhost:3000 — you should see: sidebar on the left with nav items, header at top with "The Editorial Juris" in serif italic, and the default content area. Click sidebar links to verify routing to /analytics, /counsel, /archives works with placeholder text. Active nav item should be highlighted.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/analytics/page.tsx app/counsel/page.tsx app/archives/page.tsx
git commit -m "feat: add root layout shell with sidebar, header, and placeholder routes"
```

---

### Task 9: Create PerformanceCard Component

**Files:**
- Create: `components/performance-card.tsx`

- [ ] **Step 1: Create components/performance-card.tsx**

```tsx
import type { PerformanceMetrics } from "@/lib/types";

export function PerformanceCard({
  metrics,
}: {
  metrics: PerformanceMetrics;
}) {
  return (
    <div className="bg-primary-container text-on-primary p-8 rounded-sm h-full flex flex-col justify-between">
      <div>
        <span className="text-[0.65rem] uppercase tracking-widest text-on-primary-container font-bold mb-2 block">
          Weekly Performance
        </span>
        <h3 className="font-headline text-2xl mb-4 italic text-on-primary">
          The Barrister&apos;s Standard
        </h3>
        <p className="text-on-primary-container text-sm leading-relaxed mb-6">
          Efficiency in counsel is measured not just in volume, but in the
          precision of the rebuttal and the clarity of the brief.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <span className="text-xs text-on-primary-container">
            Conversion Rate
          </span>
          <span className="text-lg font-headline text-secondary-fixed">
            {metrics.conversionRate}
          </span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <span className="text-xs text-on-primary-container">
            Avg. Call Time
          </span>
          <span className="text-lg font-headline text-secondary-fixed">
            {metrics.avgCallTime}
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/performance-card.tsx
git commit -m "feat: add PerformanceCard component with editorial styling"
```

---

### Task 10: Create ClientDistribution Component (Recharts)

**Files:**
- Create: `components/client-distribution.tsx`

- [ ] **Step 1: Create components/client-distribution.tsx**

```tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import type { ChartDataset } from "@/lib/types";

export function ClientDistribution({
  datasets,
  selectedIndex,
  onSelectDataset,
}: {
  datasets: ChartDataset[];
  selectedIndex: number;
  onSelectDataset: (index: number) => void;
}) {
  const dataset = datasets[selectedIndex];

  return (
    <div className="bg-surface-container-lowest p-8 rounded-sm shadow-[0_2px_8px_rgba(4,22,39,0.04)]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-headline text-2xl text-primary">
          Client Distribution
        </h2>
        <div className="relative">
          <select
            value={selectedIndex}
            onChange={(e) => onSelectDataset(Number(e.target.value))}
            className="appearance-none bg-surface-container-low border border-outline-variant/15 px-4 py-2 pr-10 text-sm font-medium text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer font-body"
          >
            {datasets.map((ds, i) => (
              <option key={ds.label} value={i}>
                {ds.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataset.segments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={600}
              >
                {dataset.segments.map((segment) => (
                  <Cell key={segment.name} fill={segment.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-headline text-primary">
              {dataset.total}
            </span>
            <span className="text-[0.65rem] uppercase tracking-widest text-outline font-bold">
              {dataset.totalLabel}
            </span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6 w-full">
          {dataset.segments.map((segment) => (
            <div key={segment.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-on-surface-variant">
                  {segment.name}
                </span>
              </div>
              <p className="text-xl font-headline pl-5">{segment.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/client-distribution.tsx
git commit -m "feat: add ClientDistribution component with recharts donut chart"
```

---

### Task 11: Create ProspectRow Component

**Files:**
- Create: `components/prospect-row.tsx`

- [ ] **Step 1: Create components/prospect-row.tsx**

```tsx
"use client";

import type { Prospect } from "@/lib/types";
import { Avatar } from "./avatar";

const MAX_VISIBLE_REBUTTALS = 2;

export function ProspectRow({ prospect }: { prospect: Prospect }) {
  const visibleRebuttals = prospect.rebuttals.slice(0, MAX_VISIBLE_REBUTTALS);
  const extraCount = prospect.rebuttals.length - MAX_VISIBLE_REBUTTALS;

  return (
    <tr className="group bg-surface-container-lowest hover:bg-white transition-colors duration-200 shadow-[0_2px_4px_rgba(4,22,39,0.02)]">
      <td className="py-5 pl-4 rounded-l-sm">
        <span className="font-headline text-lg text-primary">
          {prospect.fullName}
        </span>
      </td>
      <td className="py-5">
        <span className="text-xs bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full font-medium">
          {prospect.campaign}
        </span>
      </td>
      <td className="py-5">
        {prospect.agent ? (
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Avatar name={prospect.agent.name} size={20} />
            {prospect.agent.name}
          </div>
        ) : (
          <span className="text-xs text-outline italic">Unassigned</span>
        )}
      </td>
      <td className="py-5">
        <p className="text-xs text-outline italic max-w-xs truncate">
          &ldquo;{prospect.transcriptionSnippet}&rdquo;
        </p>
      </td>
      <td className="py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-1 bg-surface-container rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full transition-all duration-300"
              style={{ width: `${prospect.aiScore}%` }}
            />
          </div>
          <span className="text-sm font-bold text-primary">
            {prospect.aiScore}
          </span>
        </div>
      </td>
      <td className="py-5">
        <div className="flex gap-1 flex-wrap">
          {visibleRebuttals.map((rebuttal) => (
            <span
              key={rebuttal}
              className="text-[10px] uppercase font-bold text-outline bg-surface-container px-2 py-0.5 rounded-sm"
            >
              {rebuttal}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[10px] font-bold text-secondary bg-secondary-fixed/30 px-2 py-0.5 rounded-sm">
              +{extraCount} more
            </span>
          )}
        </div>
      </td>
      <td className="py-5 pr-4 text-right rounded-r-sm">
        <button className="opacity-0 group-hover:opacity-100 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all hover:bg-primary-container">
          View Scenario
        </button>
      </td>
    </tr>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/prospect-row.tsx
git commit -m "feat: add ProspectRow component with hover-reveal actions"
```

---

### Task 12: Create ProspectFilters Component

**Files:**
- Create: `components/prospect-filters.tsx`

- [ ] **Step 1: Create components/prospect-filters.tsx**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import type { FilterState, AiScoreRange, RebuttalRange } from "@/lib/types";
import { allCampaigns, allScenarios } from "@/lib/mock-data";

function FilterButton({
  label,
  icon,
  isActive,
  activeCount,
  onClick,
}: {
  label: string;
  icon: "filter" | "chevron";
  isActive: boolean;
  activeCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-semibold rounded-sm flex items-center gap-2 transition-colors ${
        isActive
          ? "bg-surface-container-high text-primary"
          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
      }`}
    >
      {label}
      {activeCount > 0 && (
        <span className="bg-secondary text-on-secondary text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
          {activeCount}
        </span>
      )}
      {icon === "filter" ? (
        <Filter className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );
}

function Popover({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full mt-2 left-0 bg-surface-container-lowest rounded-sm shadow-[0_4px_24px_rgba(4,22,39,0.06)] p-4 min-w-[200px] z-20"
    >
      {children}
    </div>
  );
}

export function ProspectFilters({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  function toggleFilter(name: string) {
    setOpenFilter(openFilter === name ? null : name);
  }

  function toggleCampaign(campaign: string) {
    const next = filters.campaigns.includes(campaign)
      ? filters.campaigns.filter((c) => c !== campaign)
      : [...filters.campaigns, campaign];
    onChange({ ...filters, campaigns: next });
  }

  function toggleScenario(scenario: string) {
    const next = filters.scenarios.includes(scenario)
      ? filters.scenarios.filter((s) => s !== scenario)
      : [...filters.scenarios, scenario];
    onChange({ ...filters, scenarios: next });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Campaign Filter */}
      <div className="relative">
        <FilterButton
          label="Campaign"
          icon="filter"
          isActive={openFilter === "campaign"}
          activeCount={filters.campaigns.length}
          onClick={() => toggleFilter("campaign")}
        />
        <Popover
          open={openFilter === "campaign"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {allCampaigns.map((campaign) => (
              <label
                key={campaign}
                className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.campaigns.includes(campaign)}
                  onChange={() => toggleCampaign(campaign)}
                  className="rounded-sm border-outline-variant/30 text-primary focus:ring-primary/20"
                />
                {campaign}
              </label>
            ))}
          </div>
        </Popover>
      </div>

      {/* AI Score Filter */}
      <div className="relative">
        <FilterButton
          label="AI Score"
          icon="chevron"
          isActive={openFilter === "aiScore"}
          activeCount={filters.aiScoreRange !== "all" ? 1 : 0}
          onClick={() => toggleFilter("aiScore")}
        />
        <Popover
          open={openFilter === "aiScore"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {(["all", "90+", "70-89", "<70"] as AiScoreRange[]).map(
              (range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
                >
                  <input
                    type="radio"
                    name="aiScore"
                    checked={filters.aiScoreRange === range}
                    onChange={() =>
                      onChange({ ...filters, aiScoreRange: range })
                    }
                    className="border-outline-variant/30 text-primary focus:ring-primary/20"
                  />
                  {range === "all" ? "All" : range}
                </label>
              )
            )}
          </div>
        </Popover>
      </div>

      {/* Rebuttals Filter */}
      <div className="relative">
        <FilterButton
          label="Rebuttals Used"
          icon="chevron"
          isActive={openFilter === "rebuttals"}
          activeCount={filters.rebuttalRange !== "all" ? 1 : 0}
          onClick={() => toggleFilter("rebuttals")}
        />
        <Popover
          open={openFilter === "rebuttals"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {(["all", "none", "1-2", "3+"] as RebuttalRange[]).map(
              (range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rebuttals"
                    checked={filters.rebuttalRange === range}
                    onChange={() =>
                      onChange({ ...filters, rebuttalRange: range })
                    }
                    className="border-outline-variant/30 text-primary focus:ring-primary/20"
                  />
                  {range === "all"
                    ? "All"
                    : range === "none"
                      ? "None"
                      : range}
                </label>
              )
            )}
          </div>
        </Popover>
      </div>

      {/* Scenario Filter */}
      <div className="relative">
        <FilterButton
          label="Scenario"
          icon="chevron"
          isActive={openFilter === "scenario"}
          activeCount={filters.scenarios.length}
          onClick={() => toggleFilter("scenario")}
        />
        <Popover
          open={openFilter === "scenario"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {allScenarios.map((scenario) => (
              <label
                key={scenario}
                className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.scenarios.includes(scenario)}
                  onChange={() => toggleScenario(scenario)}
                  className="rounded-sm border-outline-variant/30 text-primary focus:ring-primary/20"
                />
                {scenario}
              </label>
            ))}
          </div>
        </Popover>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/prospect-filters.tsx
git commit -m "feat: add ProspectFilters with dropdown popovers and active indicators"
```

---

### Task 13: Create ProspectTable Component

**Files:**
- Create: `components/prospect-table.tsx`

- [ ] **Step 1: Create components/prospect-table.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { Prospect, FilterState } from "@/lib/types";
import { ProspectFilters } from "./prospect-filters";
import { ProspectRow } from "./prospect-row";

export function ProspectTable({
  prospects,
  filters,
  onFiltersChange,
}: {
  prospects: Prospect[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}) {
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFiltersChange({ ...filters, search: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, filters, onFiltersChange]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl text-primary">
            Active Prospect List
          </h2>
          <p className="text-sm text-outline">
            Live monitoring of legal intakes and active rebuttals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-outline">
              <Search className="w-3 h-3" />
            </span>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-8 pr-4 py-2 bg-surface-container-low border border-outline-variant/15 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest w-48 transition-all font-body"
              placeholder="Search prospects..."
              type="text"
            />
          </div>
          <ProspectFilters filters={filters} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[0.65rem] uppercase tracking-widest text-outline font-bold">
              <th className="pb-2 pl-4">Full Name</th>
              <th className="pb-2">Campaign</th>
              <th className="pb-2">Agent Name</th>
              <th className="pb-2">Transcription Snippet</th>
              <th className="pb-2">AI Score</th>
              <th className="pb-2">Rebuttals</th>
              <th className="pb-2 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <ProspectRow key={prospect.id} prospect={prospect} />
            ))}
            {prospects.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-outline italic font-headline text-lg"
                >
                  No prospects match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/prospect-table.tsx
git commit -m "feat: add ProspectTable with debounced search and empty state"
```

---

### Task 14: Create FloatingActionButton Component

**Files:**
- Create: `components/floating-action-button.tsx`

- [ ] **Step 1: Create components/floating-action-button.tsx**

```tsx
"use client";

import { PhoneCall } from "lucide-react";

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-[0_8px_32px_rgba(4,22,39,0.15)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 group">
      <PhoneCall className="w-6 h-6" />
      <span className="absolute right-full mr-4 px-3 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_4px_16px_rgba(4,22,39,0.1)]">
        Enter Call Center
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/floating-action-button.tsx
git commit -m "feat: add FloatingActionButton with hover tooltip"
```

---

### Task 15: Create Dashboard Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with dashboard composition**

Replace the entire contents of `app/page.tsx` with:

```tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { ClientDistribution } from "@/components/client-distribution";
import { PerformanceCard } from "@/components/performance-card";
import { ProspectTable } from "@/components/prospect-table";
import { FloatingActionButton } from "@/components/floating-action-button";
import {
  prospects,
  chartDatasets,
  performanceMetrics,
  filterProspects,
} from "@/lib/mock-data";
import type { FilterState } from "@/lib/types";

const initialFilters: FilterState = {
  search: "",
  campaigns: [],
  aiScoreRange: "all",
  rebuttalRange: "all",
  scenarios: [],
};

export default function DashboardPage() {
  const [chartIndex, setChartIndex] = useState(0);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredProspects = useMemo(
    () => filterProspects(prospects, filters),
    [filters]
  );

  const handleFiltersChange = useCallback((next: FilterState) => {
    setFilters(next);
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      {/* Top Section: Client Distribution + Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <ClientDistribution
            datasets={chartDatasets}
            selectedIndex={chartIndex}
            onSelectDataset={setChartIndex}
          />
        </div>
        <div className="lg:col-span-4 h-full">
          <PerformanceCard metrics={performanceMetrics} />
        </div>
      </section>

      {/* Bottom Section: Active Prospect List */}
      <ProspectTable
        prospects={filteredProspects}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <FloatingActionButton />
    </div>
  );
}
```

- [ ] **Step 2: Verify the full dashboard renders**

```bash
pnpm dev
```

Open http://localhost:3000 and verify:
- Sidebar with 4 nav links, "Dossier" highlighted
- Header with "The Editorial Juris" in serif italic
- Client Distribution donut chart with legend
- Performance card in dark navy
- Prospect table with 8 rows
- Filter dropdowns work (Campaign, AI Score, Rebuttals, Scenario)
- Search filters rows by name/transcription
- Chart dropdown switches between "Number of Calls" and "Number of Minutes Spent"
- Row hover reveals "View Scenario" button
- FAB in bottom-right with hover tooltip
- Sidebar navigation works to /analytics, /counsel, /archives

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose dashboard page with chart, metrics, and filterable prospect table"
```

---

### Task 16: Final Verification & Cleanup

- [ ] **Step 1: Run TypeScript check**

```bash
pnpm exec tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run linter**

```bash
pnpm exec eslint app/ components/ lib/
```

Fix any issues that arise.

- [ ] **Step 3: Full visual verification**

Open http://localhost:3000 and confirm all design system rules:

1. **No-Line Rule**: No 1px solid borders for content separation — check sidebar, cards, table
2. **No-Divider Rule**: Table rows separated by spacing, not dividers
3. **Ghost Borders**: Input fields have subtle outline-variant/15 borders
4. **Ambient Shadows**: Cards use tinted primary shadows at low opacity
5. **Typography**: Newsreader for names/titles/metrics, Inter for labels/body
6. **Color tokens**: Primary navy, secondary gold, surface layers all correct
7. **Interactivity**: All filters, search, chart switching, hover effects work

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address lint issues and final polish"
```

Only run this step if there were actual fixes. Skip if clean.
