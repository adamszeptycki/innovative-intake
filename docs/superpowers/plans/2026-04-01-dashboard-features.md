# Dashboard Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add analytics leaderboard, settings page (rebuttals + team tabs), and top agents homepage widget to the Juris Dashboard demo app.

**Architecture:** All features are client-side React with local state (useState). Mock data provides the foundation; computed metrics derive from it. No backend, no persistence — state resets on page refresh.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide React icons, TypeScript 5. No test runner is configured — verification is via `pnpm build` (type-checks) and visual inspection with `pnpm dev`.

**Spec:** `docs/superpowers/specs/2026-04-01-dashboard-features-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `lib/agent-utils.ts` | Compute agent metrics (avg AI score, conversions, conversion rate) from prospect data |
| `app/analytics/page.tsx` | Analytics page with leaderboard (rewrite of placeholder) |
| `components/agent-leaderboard.tsx` | Sortable agent ranking table |
| `app/settings/page.tsx` | Settings page shell with tab routing |
| `components/settings-tabs.tsx` | Tab bar component (Rebuttals / Team) |
| `components/rebuttals-tab.tsx` | Rebuttals management — state, filtering, list rendering |
| `components/rebuttal-card.tsx` | Single rebuttal display card with edit/delete |
| `components/rebuttal-form.tsx` | Add/edit rebuttal inline form |
| `components/team-tab.tsx` | Team management — state, client list rendering |
| `components/client-row.tsx` | Single client display row |
| `components/invite-form.tsx` | Invite/edit client form with campaign multi-select |
| `components/campaign-multi-select.tsx` | Tag-style multi-select for campaigns |
| `components/top-agents-card.tsx` | Top 3 agents of the week widget for homepage |

### Modified Files
| File | Changes |
|------|---------|
| `lib/types.ts` | Add Agent.id, Prospect.status, Campaign, Rebuttal, Client types |
| `lib/mock-data.ts` | Add agents roster, new prospects, rebuttals catalog, clients list, campaigns array |
| `components/sidebar.tsx` | Add Settings nav item with Settings icon |
| `app/page.tsx` | Replace `<PerformanceCard>` with `<TopAgentsCard>` |

---

### Task 1: Update Types

**Files:**
- Modify: `lib/types.ts`

- [ ] **Step 1: Add new types and update existing ones**

Replace the full contents of `lib/types.ts`:

```typescript
export interface Agent {
  id: string;
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
  status: "active" | "converted" | "declined";
}

export interface Campaign {
  id: string;
  name: string;
}

export interface Rebuttal {
  id: string;
  name: string;
  description: string;
  campaignId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  role: "admin" | "viewer";
  campaignAccess: string[];
  invitedAt: string;
  status: "pending" | "active";
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

export interface ConversationMessage {
  id: string;
  sender: "agent" | "prospect";
  text: string;
  timestamp: string;
  rebuttalUsed?: string;
}

export interface ConversationFeedback {
  toneScore: number;
  complianceScore: number;
  objectionHandlingScore: number;
  outcomeScore: number;
  notes: string;
  reviewerName: string;
  submittedAt: string;
}

export interface Conversation {
  id: string;
  prospectId: string;
  date: string;
  duration: string;
  messages: ConversationMessage[];
  feedback?: ConversationFeedback;
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd /Users/justme/Developer/JetBridge/demos/innovative-intake && npx tsc --noEmit 2>&1 | head -20`

Expected: Type errors in `mock-data.ts` because prospects now require `status`. This is expected — Task 2 will fix it.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "feat: add Campaign, Rebuttal, Client types and Prospect.status"
```

---

### Task 2: Update Mock Data

**Files:**
- Modify: `lib/mock-data.ts`

- [ ] **Step 1: Add agents roster, campaigns, and status to existing prospects**

Add at the top of `lib/mock-data.ts` (after imports), and update the existing prospects array to include `status` and use agent objects with IDs:

```typescript
import type {
  Prospect,
  ChartDataset,
  PerformanceMetrics,
  FilterState,
  Agent,
  Campaign,
  Rebuttal,
  Client,
} from "./types";

export const agents: Agent[] = [
  { id: "agent-1", name: "Sarah Jenkins" },
  { id: "agent-2", name: "David Miller" },
  { id: "agent-3", name: "Maria Rodriguez" },
  { id: "agent-4", name: "James Taylor" },
  { id: "agent-5", name: "Kevin Brooks" },
];

export const campaigns: Campaign[] = [
  { id: "camp-1", name: "Talc Class Action" },
  { id: "camp-2", name: "Hernia Mesh" },
  { id: "camp-3", name: "Auto Accident" },
  { id: "camp-4", name: "Medical Malpractice" },
];
```

Update the existing 8 prospects to include `status` field and add `id` to their agent objects (the `Agent` type now requires `id`):
- Prospect 1 (Jonathan Sterling): `agent: { id: "agent-1", name: "Sarah Jenkins" }`, `status: "converted"`
- Prospect 2 (Eleanor Vance): `agent: null`, `status: "active"`
- Prospect 3 (Marcus Thorne): `agent: { id: "agent-2", name: "David Miller" }`, `status: "declined"`
- Prospect 4 (Amara Okafor): `agent: { id: "agent-1", name: "Sarah Jenkins" }`, `status: "converted"`
- Prospect 5 (Diane Prescott): `agent: { id: "agent-2", name: "David Miller" }`, `status: "converted"`
- Prospect 6 (Rafael Gutierrez): `agent: null`, `status: "active"`
- Prospect 7 (Priya Sharma): `agent: { id: "agent-1", name: "Sarah Jenkins" }`, `status: "converted"`
- Prospect 8 (Thomas Whitfield): `agent: { id: "agent-2", name: "David Miller" }`, `status: "declined"`

Then add 9 new prospects after the existing 8:

```typescript
  {
    id: "9",
    fullName: "Catherine Wells",
    campaign: "Talc Class Action",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet:
      "Long-term talc product user. Reviewing medical history for correlation.",
    aiScore: 83,
    rebuttals: ["Immaterially Why", "Cost Clarity"],
    status: "converted",
  },
  {
    id: "10",
    fullName: "Daniel Okonkwo",
    campaign: "Auto Accident",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet:
      "T-bone collision at intersection. Other driver ran red light.",
    aiScore: 76,
    rebuttals: ["Fault Proof"],
    status: "active",
  },
  {
    id: "11",
    fullName: "Susan Lee",
    campaign: "Hernia Mesh",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet:
      "Mesh revision surgery required after initial implant failure.",
    aiScore: 89,
    rebuttals: ["Recall Status", "Device ID"],
    status: "converted",
  },
  {
    id: "12",
    fullName: "Robert Harrison",
    campaign: "Medical Malpractice",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet:
      "Surgical instrument left inside during routine procedure. Seeking damages.",
    aiScore: 71,
    rebuttals: ["Standard of Care"],
    status: "declined",
  },
  {
    id: "13",
    fullName: "Jennifer Cruz",
    campaign: "Talc Class Action",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet:
      "Occupational exposure to talc in cosmetics manufacturing facility.",
    aiScore: 92,
    rebuttals: ["Legal Standing", "Service Proof", "Cost Clarity"],
    status: "converted",
  },
  {
    id: "14",
    fullName: "William Patel",
    campaign: "Auto Accident",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet:
      "Rear-end collision. Disputing fault with other driver's insurance company.",
    aiScore: 68,
    rebuttals: ["Insurance Gap"],
    status: "declined",
  },
  {
    id: "15",
    fullName: "Angela Torres",
    campaign: "Hernia Mesh",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet:
      "Chronic pain and complications two years post-mesh implant surgery.",
    aiScore: 87,
    rebuttals: ["Recall Status", "Statute Check"],
    status: "converted",
  },
  {
    id: "16",
    fullName: "Steven Kim",
    campaign: "Medical Malpractice",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet:
      "Delayed diagnosis of appendicitis leading to emergency surgery.",
    aiScore: 81,
    rebuttals: ["Causation", "Timeline Obj"],
    status: "active",
  },
  {
    id: "17",
    fullName: "Lisa Chen",
    campaign: "Talc Class Action",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet:
      "Decades of talc product use. Family history of related conditions.",
    aiScore: 74,
    rebuttals: ["Immaterially Why"],
    status: "converted",
  },
```

- [ ] **Step 2: Add rebuttals catalog**

Add after the `campaigns` array:

```typescript
export const rebuttalsCatalog: Rebuttal[] = [
  // Talc Class Action
  {
    id: "reb-1",
    name: "Immaterially Why",
    description:
      "When a prospect questions why the case matters or expresses doubt about the significance of their claim, redirect focus to the real-world impact and legal precedent.",
    campaignId: "camp-1",
  },
  {
    id: "reb-2",
    name: "Service Proof",
    description:
      "When a prospect asks for evidence of successful outcomes, provide concrete examples of past case results and client testimonials without making specific guarantees.",
    campaignId: "camp-1",
  },
  {
    id: "reb-3",
    name: "Legal Standing",
    description:
      "When a prospect doubts whether they have a valid legal claim, walk through the qualifying criteria and explain how their situation meets the threshold for action.",
    campaignId: "camp-1",
  },
  {
    id: "reb-4",
    name: "Cost Clarity",
    description:
      "When a prospect is concerned about legal costs or fees, explain the contingency fee structure and emphasize there is no upfront cost to the client.",
    campaignId: "camp-1",
  },
  // Hernia Mesh
  {
    id: "reb-5",
    name: "Recall Status",
    description:
      "When a prospect asks about the current recall status of their mesh device, provide the latest FDA and manufacturer recall information relevant to their product.",
    campaignId: "camp-2",
  },
  {
    id: "reb-6",
    name: "Device ID",
    description:
      "When a prospect needs help identifying their specific mesh product, guide them through obtaining surgical records and device identification numbers.",
    campaignId: "camp-2",
  },
  {
    id: "reb-7",
    name: "Statute Check",
    description:
      "When a prospect is concerned about statute of limitations, explain the discovery rule and how the filing window may extend from when they learned of the defect.",
    campaignId: "camp-2",
  },
  // Auto Accident
  {
    id: "reb-8",
    name: "Fault Proof",
    description:
      "When a prospect is concerned about proving fault in the accident, explain how police reports, witness statements, and traffic camera footage build the evidence chain.",
    campaignId: "camp-3",
  },
  {
    id: "reb-9",
    name: "Medical Lien",
    description:
      "When a prospect has medical liens and is worried about coverage, explain how liens are negotiated as part of the settlement process and the client's rights.",
    campaignId: "camp-3",
  },
  {
    id: "reb-10",
    name: "Insurance Gap",
    description:
      "When a prospect's insurance coverage is insufficient, explain uninsured/underinsured motorist options and how to pursue the at-fault driver's assets.",
    campaignId: "camp-3",
  },
  // Medical Malpractice
  {
    id: "reb-11",
    name: "Standard of Care",
    description:
      "When discussing whether the medical provider deviated from standard of care, reference expert medical opinions and established treatment protocols.",
    campaignId: "camp-4",
  },
  {
    id: "reb-12",
    name: "Causation",
    description:
      "When a prospect needs to establish a direct link between the provider's actions and their injury, explain how medical experts trace the causal chain.",
    campaignId: "camp-4",
  },
  {
    id: "reb-13",
    name: "Timeline Obj",
    description:
      "When a prospect is concerned about the timeline of events or delayed filing, explain how medical malpractice discovery rules work in their jurisdiction.",
    campaignId: "camp-4",
  },
];
```

- [ ] **Step 3: Add clients list**

Add after the rebuttals catalog:

```typescript
export const initialClients: Client[] = [
  {
    id: "client-1",
    name: "Rachel Chen",
    email: "rachel.chen@lawfirm.com",
    role: "admin",
    campaignAccess: ["camp-1", "camp-2"],
    invitedAt: "2026-03-15",
    status: "active",
  },
  {
    id: "client-2",
    name: "Michael Park",
    email: "m.park@associates.com",
    role: "viewer",
    campaignAccess: ["camp-3", "camp-4", "camp-1"],
    invitedAt: "2026-03-18",
    status: "active",
  },
  {
    id: "client-3",
    name: "Lisa Santos",
    email: "l.santos@legal.com",
    role: "viewer",
    campaignAccess: ["camp-2"],
    invitedAt: "2026-03-25",
    status: "pending",
  },
];
```

- [ ] **Step 4: Update allCampaigns derivation**

Replace the existing `allCampaigns` line:

```typescript
export const allCampaigns = campaigns.map((c) => c.name);
```

- [ ] **Step 5: Verify build**

Run: `cd /Users/justme/Developer/JetBridge/demos/innovative-intake && npx tsc --noEmit 2>&1 | head -20`

Expected: Clean (no errors). If Agent type errors appear on existing prospect agent objects, ensure all agent objects have `id` field added.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts lib/mock-data.ts
git commit -m "feat: expand mock data with agents, rebuttals, clients, and prospect statuses"
```

---

### Task 3: Add Agent Metrics Utility

**Files:**
- Create: `lib/agent-utils.ts`

- [ ] **Step 1: Create agent metrics computation**

```typescript
import type { Agent, Prospect } from "./types";

export interface AgentMetrics {
  agent: Agent;
  avgAiScore: number;
  conversions: number;
  conversionRate: number;
  totalCalls: number;
}

export function computeAgentMetrics(
  agents: Agent[],
  prospects: Prospect[]
): AgentMetrics[] {
  return agents.map((agent) => {
    const assigned = prospects.filter((p) => p.agent?.name === agent.name);
    const totalCalls = assigned.length;
    const conversions = assigned.filter((p) => p.status === "converted").length;
    const avgAiScore =
      totalCalls > 0
        ? assigned.reduce((sum, p) => sum + p.aiScore, 0) / totalCalls
        : 0;
    const conversionRate = totalCalls > 0 ? conversions / totalCalls : 0;

    return { agent, avgAiScore, conversions, conversionRate, totalCalls };
  });
}

export type SortField = "avgAiScore" | "conversions" | "conversionRate";
export type SortDirection = "asc" | "desc";

export function sortAgentMetrics(
  metrics: AgentMetrics[],
  field: SortField,
  direction: SortDirection
): AgentMetrics[] {
  return [...metrics].sort((a, b) => {
    const diff = a[field] - b[field];
    return direction === "desc" ? -diff : diff;
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/agent-utils.ts
git commit -m "feat: add agent metrics computation utility"
```

---

### Task 4: Update Sidebar with Settings Nav

**Files:**
- Modify: `components/sidebar.tsx`

- [ ] **Step 1: Add Settings icon import and nav item**

In `components/sidebar.tsx`, add `Settings` to the lucide import:

```typescript
import { Scale, FolderOpen, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react";
```

Add Settings to the `navItems` array:

```typescript
const navItems = [
  { href: "/", label: "Dashboard", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];
```

- [ ] **Step 2: Verify visually**

Run: `pnpm dev` and check sidebar at `http://localhost:3000`. Settings link should appear below Analytics.

- [ ] **Step 3: Commit**

```bash
git add components/sidebar.tsx
git commit -m "feat: add Settings nav item to sidebar"
```

---

### Task 5: Analytics Page — Agent Leaderboard

**Files:**
- Create: `components/agent-leaderboard.tsx`
- Modify: `app/analytics/page.tsx`

- [ ] **Step 1: Create the leaderboard component**

Create `components/agent-leaderboard.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import { Avatar } from "./avatar";
import type { AgentMetrics, SortField, SortDirection } from "@/lib/agent-utils";
import { sortAgentMetrics } from "@/lib/agent-utils";

const MEDAL_GRADIENTS = [
  "linear-gradient(135deg, #FFD700, #FFA500)",
  "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
  "linear-gradient(135deg, #CD7F32, #A0522D)",
];

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

function scoreBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function rateColor(rate: number): string {
  if (rate >= 0.6) return "text-green-600";
  if (rate >= 0.4) return "text-amber-600";
  return "text-red-600";
}

interface Props {
  metrics: AgentMetrics[];
}

export function AgentLeaderboard({ metrics }: Props) {
  const [sortField, setSortField] = useState<SortField>("avgAiScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sorted = useMemo(
    () => sortAgentMetrics(metrics, sortField, sortDirection),
    [metrics, sortField, sortDirection]
  );

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

  function sortIndicator(field: SortField) {
    if (sortField !== field) return "";
    return sortDirection === "desc" ? " ▼" : " ▲";
  }

  return (
    <div className="bg-surface-container-lowest rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-container border-b-2 border-outline-variant/30">
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold w-14">
              #
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold">
              Agent
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("avgAiScore")}
            >
              Avg AI Score{sortIndicator("avgAiScore")}
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("conversions")}
            >
              Conversions{sortIndicator("conversions")}
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("conversionRate")}
            >
              Conv. Rate{sortIndicator("conversionRate")}
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold">
              Total Calls
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr
              key={m.agent.id}
              className="border-b border-surface-container last:border-b-0 hover:bg-surface-container-low/50 transition-colors"
            >
              <td className="py-4 px-4">
                {i < 3 ? (
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold"
                    style={{ background: MEDAL_GRADIENTS[i] }}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-container text-outline text-xs font-semibold">
                    {i + 1}
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={m.agent.name} size={36} />
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      {m.agent.name}
                    </div>
                    <div className="text-[11px] text-outline">
                      {m.totalCalls} prospects
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreBarColor(m.avgAiScore)}`}
                      style={{ width: `${m.avgAiScore}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold ${scoreColor(m.avgAiScore)}`}>
                    {m.avgAiScore.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm font-bold text-primary">
                  {m.conversions}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`text-sm font-bold ${rateColor(m.conversionRate)}`}>
                  {Math.round(m.conversionRate * 100)}%
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-on-surface-variant">
                  {m.totalCalls}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the analytics page**

Replace `app/analytics/page.tsx`:

```typescript
"use client";

import { useMemo } from "react";
import { AgentLeaderboard } from "@/components/agent-leaderboard";
import { computeAgentMetrics } from "@/lib/agent-utils";
import { agents, prospects } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const metrics = useMemo(
    () => computeAgentMetrics(agents, prospects),
    []
  );

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-headline text-2xl font-semibold text-primary">
              Agent Leaderboard
            </h1>
            <p className="text-sm text-outline mt-1">
              Performance rankings across all campaigns
            </p>
          </div>
          <span className="text-xs text-outline bg-surface-container px-3 py-1.5 rounded-sm">
            This Week: Mar 24 – Mar 30
          </span>
        </div>
      </div>
      <AgentLeaderboard metrics={metrics} />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `pnpm build` — should compile cleanly. Then `pnpm dev` and visit `/analytics`. Verify:
- Table shows 5 agents sorted by Avg AI Score descending
- Gold/silver/bronze medals on top 3
- Clicking column headers re-sorts
- Score and rate colors are correct

- [ ] **Step 4: Commit**

```bash
git add components/agent-leaderboard.tsx app/analytics/page.tsx
git commit -m "feat: add agent leaderboard to analytics page"
```

---

### Task 6: Settings Page Shell with Tabs

**Files:**
- Create: `app/settings/page.tsx`
- Create: `components/settings-tabs.tsx`

- [ ] **Step 1: Create the tab bar component**

Create `components/settings-tabs.tsx`:

```typescript
"use client";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export function SettingsTabs({ activeTab, onTabChange, tabs }: Props) {
  return (
    <div className="flex bg-surface-container-lowest border-b-2 border-outline-variant/30 px-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-4 text-sm transition-colors relative ${
            activeTab === tab.id
              ? "text-primary font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary -mb-[1px]" />
          )}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create the settings page shell**

Create `app/settings/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { SettingsTabs } from "@/components/settings-tabs";
import { RebuttalsTab } from "@/components/rebuttals-tab";
import { TeamTab } from "@/components/team-tab";

const TABS = [
  { id: "rebuttals", label: "Rebuttals" },
  { id: "team", label: "Team" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("rebuttals");

  return (
    <div className="max-w-7xl mx-auto">
      <SettingsTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="p-10">
        {activeTab === "rebuttals" && <RebuttalsTab />}
        {activeTab === "team" && <TeamTab />}
      </div>
    </div>
  );
}
```

Note: This will not compile yet — `RebuttalsTab` and `TeamTab` are created in Tasks 7 and 8. Proceed to Task 7 immediately.

- [ ] **Step 3: Commit**

```bash
git add app/settings/page.tsx components/settings-tabs.tsx
git commit -m "feat: add settings page shell with tab navigation"
```

---

### Task 7: Rebuttals Tab

**Files:**
- Create: `components/rebuttals-tab.tsx`
- Create: `components/rebuttal-card.tsx`
- Create: `components/rebuttal-form.tsx`

- [ ] **Step 1: Create the rebuttal form component**

Create `components/rebuttal-form.tsx`:

```typescript
"use client";

import { useState } from "react";

interface Props {
  initialName?: string;
  initialDescription?: string;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export function RebuttalForm({
  initialName = "",
  initialDescription = "",
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onSave(name.trim(), description.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-surface-container-lowest rounded-sm border-2 border-dashed border-outline-variant/50"
    >
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cost Clarity"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Description / Script
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="The talking points or strategy for handling this objection..."
            rows={3}
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary resize-vertical font-body"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-sm border border-outline-variant/50 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-sm bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Save Rebuttal
          </button>
        </div>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Create the rebuttal card component**

Create `components/rebuttal-card.tsx`:

```typescript
"use client";

import type { Rebuttal } from "@/lib/types";

interface Props {
  rebuttal: Rebuttal;
  usageCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function RebuttalCard({ rebuttal, usageCount, onEdit, onDelete }: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-sm p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-surface-container">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-base font-semibold text-primary">
              {rebuttal.name}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rebuttal-container text-on-rebuttal-container font-medium">
              Used {usageCount} times
            </span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {rebuttal.description}
          </p>
        </div>
        <div className="flex gap-1.5 ml-4 shrink-0">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-sm border border-outline-variant/50 text-xs text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-sm border border-error/30 bg-error/5 text-xs text-error hover:bg-error/10 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the rebuttals tab component**

Create `components/rebuttals-tab.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import type { Rebuttal } from "@/lib/types";
import { campaigns, rebuttalsCatalog, prospects } from "@/lib/mock-data";
import { RebuttalCard } from "./rebuttal-card";
import { RebuttalForm } from "./rebuttal-form";

export function RebuttalsTab() {
  const [rebuttals, setRebuttals] = useState<Rebuttal[]>(rebuttalsCatalog);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0].id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = useMemo(
    () => rebuttals.filter((r) => r.campaignId === selectedCampaignId),
    [rebuttals, selectedCampaignId]
  );

  const usageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of prospects) {
      for (const name of p.rebuttals) {
        counts[name] = (counts[name] || 0) + 1;
      }
    }
    return counts;
  }, []);

  function handleAdd(name: string, description: string) {
    const newRebuttal: Rebuttal = {
      id: `reb-${Date.now()}`,
      name,
      description,
      campaignId: selectedCampaignId,
    };
    setRebuttals((prev) => [...prev, newRebuttal]);
    setShowAddForm(false);
  }

  function handleEdit(id: string, name: string, description: string) {
    setRebuttals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name, description } : r))
    );
    setEditingId(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this rebuttal?")) return;
    setRebuttals((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCampaignId(c.id);
                setShowAddForm(false);
                setEditingId(null);
              }}
              className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                selectedCampaignId === c.id
                  ? "bg-primary text-on-primary font-semibold"
                  : "border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
          }}
          className="px-5 py-2 rounded-sm bg-secondary text-on-secondary text-sm font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Add Rebuttal
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((rebuttal) =>
          editingId === rebuttal.id ? (
            <RebuttalForm
              key={rebuttal.id}
              initialName={rebuttal.name}
              initialDescription={rebuttal.description}
              onSave={(name, desc) => handleEdit(rebuttal.id, name, desc)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <RebuttalCard
              key={rebuttal.id}
              rebuttal={rebuttal}
              usageCount={usageCounts[rebuttal.name] || 0}
              onEdit={() => {
                setEditingId(rebuttal.id);
                setShowAddForm(false);
              }}
              onDelete={() => handleDelete(rebuttal.id)}
            />
          )
        )}
      </div>

      {showAddForm && (
        <div className="mt-4">
          <RebuttalForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `pnpm build` — should compile (assuming TeamTab placeholder exists or is created in Task 8 simultaneously). If build fails due to missing TeamTab, create a minimal placeholder:

```typescript
// components/team-tab.tsx (temporary)
export function TeamTab() {
  return <div>Team tab placeholder</div>;
}
```

Then `pnpm dev` → visit `/settings`. Verify:
- Campaign pills filter rebuttals
- Add form appears inline
- Edit transforms card into form
- Delete shows confirm dialog and removes card

- [ ] **Step 5: Commit**

```bash
git add components/rebuttals-tab.tsx components/rebuttal-card.tsx components/rebuttal-form.tsx
git commit -m "feat: add rebuttals management tab to settings"
```

---

### Task 8: Team Tab — Invite Client

**Files:**
- Create: `components/campaign-multi-select.tsx`
- Create: `components/invite-form.tsx`
- Create: `components/client-row.tsx`
- Create: `components/team-tab.tsx`

- [ ] **Step 1: Create the campaign multi-select component**

Create `components/campaign-multi-select.tsx`:

```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import type { Campaign } from "@/lib/types";

interface Props {
  campaigns: Campaign[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CampaignMultiSelect({ campaigns, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const available = campaigns.filter((c) => !selected.includes(c.id));
  const selectedCampaigns = campaigns.filter((c) => selected.includes(c.id));

  function handleRemove(id: string) {
    onChange(selected.filter((s) => s !== id));
  }

  function handleAdd(id: string) {
    onChange([...selected, id]);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <div className="min-h-[42px] px-3 py-2 border border-outline-variant/50 rounded-sm flex flex-wrap gap-1.5 items-center">
        {selectedCampaigns.map((c) => (
          <span
            key={c.id}
            className="text-xs px-2.5 py-1 rounded-full bg-primary text-on-primary flex items-center gap-1"
          >
            {c.name}
            <button
              type="button"
              onClick={() => handleRemove(c.id)}
              className="opacity-70 hover:opacity-100 text-sm leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {available.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-xs text-outline hover:text-primary transition-colors"
          >
            + Add campaign...
          </button>
        )}
      </div>
      {open && available.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant/50 rounded-sm shadow-lg z-10">
          {available.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleAdd(c.id)}
              className="block w-full text-left px-3.5 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create the invite form component**

Create `components/invite-form.tsx`:

```typescript
"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { campaigns } from "@/lib/mock-data";
import { CampaignMultiSelect } from "./campaign-multi-select";

interface Props {
  initial?: Client;
  onSave: (data: { name: string; email: string; role: "admin" | "viewer"; campaignAccess: string[] }) => void;
  onCancel: () => void;
}

export function InviteForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<"admin" | "viewer">(initial?.role ?? "viewer");
  const [campaignAccess, setCampaignAccess] = useState<string[]>(
    initial?.campaignAccess ?? []
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || campaignAccess.length === 0) return;
    onSave({ name: name.trim(), email: email.trim(), role, campaignAccess });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-surface-container-lowest rounded-sm border-2 border-dashed border-outline-variant/50"
    >
      <h3 className="text-sm font-semibold text-primary mb-4">
        {initial ? "Edit Client" : "Invite Client"}
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Smith"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@lawfirm.com"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Campaign Access
          </label>
          <div className="mt-1">
            <CampaignMultiSelect
              campaigns={campaigns}
              selected={campaignAccess}
              onChange={setCampaignAccess}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-sm border border-outline-variant/50 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-sm bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          {initial ? "Save Changes" : "Send Invite"}
        </button>
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Create the client row component**

Create `components/client-row.tsx`:

```typescript
"use client";

import type { Client } from "@/lib/types";
import { campaigns } from "@/lib/mock-data";
import { Avatar } from "./avatar";

interface Props {
  client: Client;
  onEdit: () => void;
}

export function ClientRow({ client, onEdit }: Props) {
  const campaignNames = campaigns
    .filter((c) => client.campaignAccess.includes(c.id))
    .map((c) => c.name);

  return (
    <div className="flex items-center py-4 px-5 border-b border-surface-container last:border-b-0 hover:bg-surface-container-low/30 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar
          name={client.name}
          size={40}
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-primary truncate">
            {client.name}
          </div>
          <div className="text-xs text-outline truncate">{client.email}</div>
        </div>
      </div>
      <div className="flex gap-1.5 flex-1 flex-wrap">
        {campaignNames.map((name) => (
          <span
            key={name}
            className="text-[11px] px-2.5 py-1 rounded-full bg-primary-fixed/30 text-primary font-medium"
          >
            {name}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            client.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {client.status === "active" ? "Active" : "Pending"}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-sm bg-surface-container text-outline capitalize">
          {client.role}
        </span>
        <button
          onClick={onEdit}
          className="px-3 py-1.5 rounded-sm border border-outline-variant/50 text-xs text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create the team tab component**

Create `components/team-tab.tsx` (replace the placeholder if one was created in Task 7):

```typescript
"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { initialClients } from "@/lib/mock-data";
import { ClientRow } from "./client-row";
import { InviteForm } from "./invite-form";

export function TeamTab() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleInvite(data: {
    name: string;
    email: string;
    role: "admin" | "viewer";
    campaignAccess: string[];
  }) {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      ...data,
      invitedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setClients((prev) => [...prev, newClient]);
    setShowInviteForm(false);
  }

  function handleEdit(
    id: string,
    data: {
      name: string;
      email: string;
      role: "admin" | "viewer";
      campaignAccess: string[];
    }
  ) {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
    setEditingId(null);
  }

  const editingClient = clients.find((c) => c.id === editingId);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-headline text-lg font-semibold text-primary">
            Team Members
          </h2>
          <p className="text-sm text-outline mt-0.5">
            {clients.length} clients invited
          </p>
        </div>
        <button
          onClick={() => {
            setShowInviteForm(true);
            setEditingId(null);
          }}
          className="px-5 py-2 rounded-sm bg-secondary text-on-secondary text-sm font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Invite Client
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {clients.map((client) =>
          editingId === client.id ? (
            <div key={client.id} className="p-4">
              <InviteForm
                initial={client}
                onSave={(data) => handleEdit(client.id, data)}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <ClientRow
              key={client.id}
              client={client}
              onEdit={() => {
                setEditingId(client.id);
                setShowInviteForm(false);
              }}
            />
          )
        )}
      </div>

      {showInviteForm && (
        <div className="mt-4">
          <InviteForm
            onSave={handleInvite}
            onCancel={() => setShowInviteForm(false)}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `pnpm build` — should compile cleanly. Then `pnpm dev` → visit `/settings`. Verify:
- Tabs switch between Rebuttals and Team
- Team tab shows 3 pre-seeded clients
- "Invite Client" opens form with campaign multi-select
- Edit button opens pre-populated form
- Campaign pills are addable/removable

- [ ] **Step 6: Commit**

```bash
git add components/campaign-multi-select.tsx components/invite-form.tsx components/client-row.tsx components/team-tab.tsx
git commit -m "feat: add team management tab with client invitations"
```

---

### Task 9: Homepage — Top 3 Agents Card

**Files:**
- Create: `components/top-agents-card.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the top agents card component**

Create `components/top-agents-card.tsx`:

```typescript
"use client";

import { useMemo } from "react";
import { Avatar } from "./avatar";
import { computeAgentMetrics, sortAgentMetrics } from "@/lib/agent-utils";
import { agents, prospects } from "@/lib/mock-data";

const MEDAL_GRADIENTS = [
  "linear-gradient(135deg, #FFD700, #FFA500)",
  "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
  "linear-gradient(135deg, #CD7F32, #A0522D)",
];

const ROW_OPACITY = ["bg-white/35", "bg-white/20", "bg-white/[0.12]"];

export function TopAgentsCard() {
  const top3 = useMemo(() => {
    const all = computeAgentMetrics(agents, prospects);
    return sortAgentMetrics(all, "conversionRate", "desc").slice(0, 3);
  }, []);

  return (
    <div className="bg-primary-container text-on-primary p-8 rounded-sm h-full flex flex-col">
      <div className="text-center mb-5">
        <span className="text-[0.65rem] uppercase tracking-widest text-on-primary-container font-bold">
          Top Agents This Week
        </span>
      </div>
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {top3.map((m, i) => (
          <div
            key={m.agent.id}
            className={`flex items-center gap-3 ${ROW_OPACITY[i]} rounded-sm px-4 py-3`}
          >
            <div className="relative">
              <Avatar name={m.agent.name} size={40} />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                style={{ background: MEDAL_GRADIENTS[i] }}
              >
                {i + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-on-primary truncate">
                {m.agent.name}
              </div>
              <div className="text-[11px] text-on-primary-container">
                {m.conversions} conversions · {m.avgAiScore.toFixed(0)} avg score
              </div>
            </div>
            <div className="text-xl font-bold text-on-primary">
              {Math.round(m.conversionRate * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update the dashboard page**

In `app/page.tsx`, replace the `PerformanceCard` import and usage with `TopAgentsCard`:

Replace the import:
```typescript
import { TopAgentsCard } from "@/components/top-agents-card";
```

Remove this import:
```typescript
import { PerformanceCard } from "@/components/performance-card";
```

Also remove the `performanceMetrics` import from `@/lib/mock-data` (it's no longer needed on this page).

Replace in the JSX:
```typescript
<div className="lg:col-span-4 h-full">
  <TopAgentsCard />
</div>
```

The full updated imports should be:
```typescript
import { ClientDistribution } from "@/components/client-distribution";
import { TopAgentsCard } from "@/components/top-agents-card";
import { ProspectTable } from "@/components/prospect-table";
import { FloatingActionButton } from "@/components/floating-action-button";
import {
  prospects,
  chartDatasets,
  filterProspects,
} from "@/lib/mock-data";
import type { FilterState } from "@/lib/types";
```

- [ ] **Step 3: Verify**

Run: `pnpm build` — should compile cleanly. Then `pnpm dev` → visit `/`. Verify:
- Top 3 agents card replaces the old performance card
- Gold/silver/bronze badges on avatars
- Shows conversion count, avg score, and conversion rate
- Same warm primary-container background as before

- [ ] **Step 4: Commit**

```bash
git add components/top-agents-card.tsx app/page.tsx
git commit -m "feat: replace performance card with top 3 agents widget"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Full build check**

Run: `cd /Users/justme/Developer/JetBridge/demos/innovative-intake && pnpm build`

Expected: Clean build with no errors.

- [ ] **Step 2: Visual walkthrough**

Run `pnpm dev` and verify all features:

1. **Homepage** (`/`): Top 3 agents card shows in place of old performance card with correct medals and data
2. **Analytics** (`/analytics`): Leaderboard with 5 agents, sortable columns, medal badges
3. **Settings → Rebuttals** (`/settings`): Campaign pills filter rebuttals, add/edit/delete works
4. **Settings → Team** (`/settings`, Team tab): Client list, invite form with campaign multi-select, edit works
5. **Sidebar**: Dashboard, Analytics, Settings links all work with active state indicators

- [ ] **Step 3: Commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: address final verification issues"
```
