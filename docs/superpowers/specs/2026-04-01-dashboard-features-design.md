# Dashboard Features — Analytics Leaderboard, Settings Page, Top Agents Widget

**Date:** 2026-04-01
**Status:** Approved

## Overview

Four features for the Juris Dashboard legal intake management app:

1. **Analytics Page — Agent Leaderboard**: Sortable table ranking agents by performance metrics
2. **Settings Page — Rebuttals Tab**: CRUD management of rebuttals organized by campaign
3. **Settings Page — Team Tab**: Invite clients (attorneys) with multi-select campaign access
4. **Homepage — Top 3 Agents Widget**: Replace the performance card with a weekly top agents ranking

All features use **interactive local state** (React `useState`) — functional for demo purposes, resets on page refresh. No backend/persistence required.

---

## Data Model Changes

### New Types (`lib/types.ts`)

**Agent** (expanded from `{ name: string }`):
```typescript
type Agent = {
  id: string
  name: string
}
```

**Campaign** (promoted from loose strings):
```typescript
type Campaign = {
  id: string
  name: string  // "Talc Class Action", "Hernia Mesh", etc.
}
```

**Rebuttal** (new entity):
```typescript
type Rebuttal = {
  id: string
  name: string        // e.g., "Cost Clarity"
  description: string // script/talking points for handling the objection
  campaignId: string  // tied to a specific campaign
}
```

**Client** (invited user):
```typescript
type Client = {
  id: string
  name: string
  email: string
  role: "admin" | "viewer"
  campaignAccess: string[]  // campaign IDs
  invitedAt: string
  status: "pending" | "active"
}
```

### Modified Types

**Prospect** — add `status` field:
```typescript
status: "active" | "converted" | "declined"
// "converted" = prospect forwarded to counsel (counts as a conversion)
```

### Derived Metrics (computed at render time, not stored)

Per-agent metrics computed from prospect data:
- **Avg AI Score**: average of all assigned prospects' `aiScore`
- **Conversion Count**: count of assigned prospects with `status: "converted"`
- **Conversion Rate**: conversions / total assigned prospects
- **Total Calls**: count of all assigned prospects

---

## Feature 1: Analytics Page — Agent Leaderboard

**Route:** `/analytics` (replaces "Coming Soon" placeholder)

### Layout
- Page header: "Agent Leaderboard" title + subtitle + week date range label
- Single sortable table below

### Table Columns
| Column | Content | Sortable |
|--------|---------|----------|
| # | Rank number with medal badges for top 3 (gold/silver/bronze gradient circles) | No |
| Agent | Avatar (initials, deterministic color) + name + campaign count subtitle | No |
| Avg AI Score | Mini progress bar + numeric value. Color: green (80+), amber (40-80), red (<40) | Yes |
| Conversions | Numeric count, bold | Yes |
| Conv. Rate | Percentage, color-coded: green (60%+), amber (40-59%), red (<40%) | Yes |
| Total Calls | Numeric count | No |

### Behavior
- **Default sort:** Avg AI Score descending
- **Click column header** to sort by that column. Active sort shows arrow indicator (▼/▲). Click again to reverse.
- **Top 3 ranks** get gradient medal badges (gold, silver, bronze). Ranks 4+ get plain gray numbered circles.
- Metrics are computed from the mock prospect data, grouping by agent assignment.

### New Components
- `app/analytics/page.tsx` — page component with state for sort column/direction
- `components/agent-leaderboard.tsx` — the sortable table

### Mock Data
Expand agent roster in mock data to 5 agents total (currently only Sarah Jenkins and David Miller are assigned). Add: Maria Rodriguez, James Taylor, and Kevin Brooks. Redistribute existing prospect assignments and add new prospects so each agent has 3-6 prospects with varied AI scores and conversion statuses, creating meaningful metric differences for the leaderboard.

---

## Feature 2: Settings Page — Rebuttals Tab

**Route:** `/settings` (new page)

### Layout
- Tab bar at top: "Rebuttals" | "Team"
- Campaign pill selector row (toggle buttons, active = filled dark, inactive = outlined)
- Rebuttal card list filtered by selected campaign
- "Add Rebuttal" button (secondary/gold color) at top-right

### Rebuttal Card
Each card displays:
- **Name** — bold title (e.g., "Immaterially Why")
- **Description** — the script/talking points text
- **Usage badge** — purple pill showing "Used X times" (computed from prospect rebuttal data)
- **Actions** — Edit and Delete buttons

### Add/Edit Form
- Appears **inline** below the card list (add) or replaces the card (edit)
- Fields: Name (text input) + Description/Script (textarea)
- Buttons: Cancel + Save Rebuttal
- On save: adds to local state array, card appears in the list
- On edit: pre-populated with existing values

### Delete
- Confirmation step before removal (simple `confirm()` dialog is fine for demo)

### Campaign Filtering
- Pills for each campaign at the top
- Selecting a campaign filters the rebuttal list to only that campaign's rebuttals
- First campaign selected by default

### New Components
- `app/settings/page.tsx` — page with tab state management
- `components/settings-tabs.tsx` — tab bar component
- `components/rebuttals-tab.tsx` — rebuttals management tab content
- `components/rebuttal-card.tsx` — individual rebuttal display card
- `components/rebuttal-form.tsx` — add/edit form

### Mock Data
Create initial rebuttal entries in `lib/mock-data.ts` for each campaign, seeded from the existing rebuttal names used in conversation data (e.g., "Immaterially Why", "Service Proof", "Legal Standing", "Cost Clarity", etc.). Each gets a description explaining the objection-handling strategy.

---

## Feature 3: Settings Page — Team Tab (Invite Client)

### Layout
- Same tab bar, "Team" tab active
- Header: "Team Members" title + count + "Invite Client" button (secondary/gold)
- Client list (card-style rows)

### Client Row
Each row displays:
- **Avatar** — initials circle (gray for pending, colored for active)
- **Name + Email** — stacked
- **Campaign access** — blue pill badges for each assigned campaign
- **Status** — green "Active" or yellow "Pending" badge
- **Role** — gray label "Admin" or "Viewer"
- **Edit button** — opens inline edit form

### Invite Form
Appears inline below the client list when "Invite Client" is clicked:
- **Name** — text input
- **Email** — text input
- **Role** — dropdown (Viewer / Admin)
- **Campaign Access** — tag-style multi-select: selected campaigns shown as removable blue pills with × button, "+ Add campaign..." text opens dropdown of remaining campaigns
- Buttons: Cancel + Send Invite

### Edit
Same form, pre-populated. Can change role and campaign access.

### New Components
- `components/team-tab.tsx` — team management tab content
- `components/client-row.tsx` — individual client display row
- `components/invite-form.tsx` — invite/edit client form
- `components/campaign-multi-select.tsx` — reusable tag-style multi-select for campaigns

### Mock Data
3 pre-seeded clients in `lib/mock-data.ts`:
- Rachel Chen (Admin, Active, 2 campaigns)
- Michael Park (Viewer, Active, 3 campaigns)
- Lisa Santos (Viewer, Pending, 1 campaign)

---

## Feature 4: Homepage — Top 3 Agents of the Week

### What Changes
Replace the `<PerformanceCard>` component on the dashboard with a new `<TopAgentsCard>` in the same grid slot.

### Layout
- Same warm `primary-container` background as the current performance card
- Title: "Top Agents This Week" (uppercase, small, centered)
- 3 agent rows stacked vertically

### Agent Row
- **Avatar** with gold/silver/bronze mini-badge overlaid (top-right corner)
- **Name** — bold
- **Subtitle** — "X conversions · Y avg score"
- **Large conversion rate** — right-aligned, bold

### Visual Hierarchy
- Row backgrounds use decreasing white opacity: 35% (1st), 20% (2nd), 12% (3rd)
- 1st place is most visually prominent

### Data
Top 3 agents by conversion rate for the current week, computed from the same mock data used by the leaderboard. Since all mock data is "this week," the ranking matches the leaderboard's default view.

### New Components
- `components/top-agents-card.tsx` — replaces `performance-card.tsx` in the dashboard

---

## Navigation Changes

### Sidebar Updates
Add "Settings" to the sidebar navigation:
- Dashboard (existing)
- Analytics (existing)
- Settings (new — gear icon)

---

## State Management

All new features use React `useState` for local state:
- **Rebuttals tab**: `useState<Rebuttal[]>` initialized from mock data. Add/edit/delete modify this array.
- **Team tab**: `useState<Client[]>` initialized from mock data. Invite/edit modify this array.
- **Leaderboard sort**: `useState` for sort column and direction.
- **Tab selection**: `useState` for active settings tab.

No global state library, no persistence. Consistent with how the rest of the app manages state (e.g., filters in the prospect table).

---

## File Structure Summary

```
app/
  analytics/page.tsx        ← rewrite (replace placeholder)
  settings/page.tsx         ← new
components/
  agent-leaderboard.tsx     ← new
  top-agents-card.tsx       ← new (replaces performance-card.tsx usage)
  settings-tabs.tsx         ← new
  rebuttals-tab.tsx         ← new
  rebuttal-card.tsx         ← new
  rebuttal-form.tsx         ← new
  team-tab.tsx              ← new
  client-row.tsx            ← new
  invite-form.tsx           ← new
  campaign-multi-select.tsx ← new
  sidebar.tsx               ← modify (add Settings nav item)
lib/
  types.ts                  ← modify (add Agent, Campaign, Rebuttal, Client types; add status to Prospect)
  mock-data.ts              ← modify (add agents roster, rebuttals catalog, clients, prospect statuses; expand agent assignments)
```
