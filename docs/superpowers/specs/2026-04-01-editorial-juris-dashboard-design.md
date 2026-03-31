# The Editorial Juris — Dashboard UI Design Spec

## Overview

A demo legal intake dashboard implementing "The Digital Barrister" design system. Single-page focus with wired-up sidebar routing. Simulated interactivity with filterable data, chart switching, and hover effects. Light mode only.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with full Material Design 3-style token system via `@theme`
- **Fonts**: Newsreader (serif, headlines) + Inter (sans, body) via `next/font/google`
- **Icons**: `lucide-react` (no CDN dependencies)
- **Charts**: `recharts` for the donut chart
- **Images**: Initials-based avatars (no external images)
- **Dark mode**: None — light mode only

## Routing

| Path | Content |
|------|---------|
| `/` | Full dashboard (Client Distribution + Performance Card + Prospect Table) |
| `/analytics` | Placeholder page |
| `/counsel` | Placeholder page |
| `/archives` | Placeholder page |

Root layout renders Sidebar + Header as persistent shell. Sidebar highlights active route via `usePathname()`.

## Color Token System

All ~40 tokens defined in `globals.css` via Tailwind v4 `@theme`:

### Primary
- `--color-primary`: #041627
- `--color-on-primary`: #ffffff
- `--color-primary-container`: #1a2b3c
- `--color-on-primary-container`: #8192a7
- `--color-primary-fixed`: #d2e4fb
- `--color-primary-fixed-dim`: #b7c8de
- `--color-on-primary-fixed`: #0b1d2d
- `--color-on-primary-fixed-variant`: #38485a

### Secondary
- `--color-secondary`: #775a19
- `--color-on-secondary`: #ffffff
- `--color-secondary-container`: #fed488
- `--color-on-secondary-container`: #785a1a
- `--color-secondary-fixed`: #ffdea5
- `--color-secondary-fixed-dim`: #e9c176
- `--color-on-secondary-fixed`: #261900
- `--color-on-secondary-fixed-variant`: #5d4201

### Tertiary
- `--color-tertiary`: #1f1300
- `--color-on-tertiary`: #ffffff
- `--color-tertiary-container`: #392700
- `--color-on-tertiary-container`: #af8c47
- `--color-tertiary-fixed`: #ffdea5
- `--color-tertiary-fixed-dim`: #e9c176
- `--color-on-tertiary-fixed`: #261900
- `--color-on-tertiary-fixed-variant`: #5d4201

### Surface
- `--color-surface`: #f7f9fb
- `--color-on-surface`: #191c1e
- `--color-surface-variant`: #e0e3e5
- `--color-on-surface-variant`: #44474c
- `--color-surface-dim`: #d8dadc
- `--color-surface-bright`: #f7f9fb
- `--color-surface-tint`: #4f6073
- `--color-surface-container`: #eceef0
- `--color-surface-container-low`: #f2f4f6
- `--color-surface-container-high`: #e6e8ea
- `--color-surface-container-highest`: #e0e3e5
- `--color-surface-container-lowest`: #ffffff
- `--color-inverse-surface`: #2d3133
- `--color-inverse-on-surface`: #eff1f3
- `--color-inverse-primary`: #b7c8de

### Outline
- `--color-outline`: #74777d
- `--color-outline-variant`: #c4c6cd

### Error
- `--color-error`: #ba1a1a
- `--color-on-error`: #ffffff
- `--color-error-container`: #ffdad6
- `--color-on-error-container`: #93000a

### Background
- `--color-background`: #f7f9fb
- `--color-on-background`: #191c1e

## Typography

Registered in `@theme`:
- `--font-headline`: Newsreader, serif — case names, section headers, display metrics
- `--font-body`: Inter, sans-serif — nav, labels, body text, form fields

Font weights loaded:
- Newsreader: 400, 600, 700 + italic 400
- Inter: 400, 500, 600, 700

## Icon Mapping (Material Symbols → lucide-react)

| Mockup Icon | Lucide Equivalent | Used In |
|---|---|---|
| gavel | Scale | Logo, Counsel nav |
| folder_shared | FolderOpen | Dossier nav |
| analytics | BarChart3 | Analytics nav |
| inventory_2 | Archive | Archives nav |
| search | Search | Header search |
| notifications | Bell | Header |
| settings | Settings | Header |
| add | Plus | New Case File button |
| help_outline | HelpCircle | Support link |
| logout | LogOut | Logout link |
| filter_list | Filter | Campaign filter |
| keyboard_arrow_down | ChevronDown | Dropdown arrows |
| expand_more | ChevronDown | Select arrow |
| phone_in_talk | PhoneCall | FAB button |

## File Structure

```
app/
  layout.tsx                  # Root layout: fonts, Sidebar, Header, page slot
  page.tsx                    # Dashboard page: composes sections, holds state
  globals.css                 # Tailwind v4 @theme tokens, base styles
  analytics/page.tsx          # Placeholder
  counsel/page.tsx            # Placeholder
  archives/page.tsx           # Placeholder
components/
  sidebar.tsx                 # Fixed left nav, active route highlighting
  header.tsx                  # Sticky top bar, search, icons, avatar
  client-distribution.tsx     # Recharts donut + legend + dropdown
  performance-card.tsx        # Dark navy card with metrics
  prospect-table.tsx          # Table container, composes filters + rows
  prospect-filters.tsx        # Filter button group with dropdown popovers
  prospect-row.tsx            # Single table row with hover actions
  avatar.tsx                  # Initials-based avatar, deterministic color
  floating-action-button.tsx  # Fixed bottom-right FAB
lib/
  types.ts                    # TypeScript interfaces
  mock-data.ts                # Static data + filter functions
```

## Data Model

```typescript
interface Prospect {
  id: string;
  fullName: string;
  campaign: string;
  agent: Agent | null;       // null = "Unassigned"
  transcriptionSnippet: string;
  aiScore: number;           // 0-100
  rebuttals: string[];
}

interface Agent {
  name: string;
}

interface ChartDataset {
  label: string;             // "Number of Calls" | "Number of Minutes Spent"
  total: string;             // Display value e.g. "1.2k"
  totalLabel: string;        // "Total Inbound"
  segments: ChartSegment[];
}

interface ChartSegment {
  name: string;
  value: number;             // percentage
  color: string;             // CSS color value
}

interface PerformanceMetrics {
  conversionRate: string;
  avgCallTime: string;
}
```

Mock data includes:
- 2 chart datasets (calls vs minutes, different distributions)
- 6-8 prospect rows (4 from mockup + extras for meaningful filtering)
- Performance metrics

## Component Details

### Sidebar
- Fixed left, 256px wide, `bg-surface-container-low`
- Logo: Scale icon in `bg-primary` square + "Juris Dashboard" in serif
- Subtitle: "PREMIUM LEGAL WORKSPACE" in small caps tracking
- Nav links: active state = bold + `border-r-2 border-primary` + `bg-surface-container-high/50`
- Inactive = `text-outline` with hover translate-x animation
- Bottom: "New Case File" button (primary-container gradient), Support, Logout

### Header
- Sticky top, gradient from `surface-container-high/50` to transparent
- Left: "The Editorial Juris" in serif italic
- Right: search input + Bell + Settings icons + Avatar
- No visible border — tonal separation per design system

### ClientDistribution
- 8-col grid span on large screens
- `bg-surface-container-lowest` card (white pops against surface)
- Header: serif title + native select dropdown
- Recharts `PieChart` with custom center label (total count)
- 2x2 legend grid with colored dots + serif percentages
- Dropdown switch animates chart transition

### PerformanceCard
- 4-col grid span, full height
- `bg-primary-container` (dark navy), white/gold text
- Editorial copy in serif italic
- Two metrics with `secondary-fixed` (gold) values
- Separated by `border-white/10` lines (exception: inside dark container)

### ProspectTable
- Full width section below the grid
- Header: serif title + subtitle + filter toolbar
- Filter buttons: `bg-surface-container`, popover on click with options
- Active filter: visual badge/indicator
- Table with `border-separate border-spacing-y-3` for row gaps
- Thead: tiny uppercase tracking labels
- Click outside closes filter popovers

### ProspectRow
- `bg-surface-container-lowest` with hover to white
- Subtle ambient shadow `shadow-[0_2px_4px_rgba(0,0,0,0.02)]`
- Columns: serif name, campaign pill, agent+avatar, truncated transcript, AI score bar, rebuttal tags, hover-reveal button
- AI score: thin progress bar + bold number
- Rebuttals: small uppercase tags, "+N more" in gold if >2

### Avatar
- Takes `name` string + optional `size` (default 32px)
- Extracts first letter of first + last name
- Deterministic background color from name hash
- White text, rounded full

### FloatingActionButton
- Fixed bottom-8 right-8, 56px circle
- `bg-secondary` (gold), white PhoneCall icon
- Hover: scale-105 + tooltip slides in from right
- Tooltip: `bg-primary` dark pill with "Enter Call Center" text

## Interactivity

### Search
- Debounced input (300ms) in prospect section header
- Filters by `fullName` and `transcriptionSnippet`
- Case-insensitive substring match

### Filter Dropdowns
- **Campaign**: Multi-select checkboxes from distinct values
- **AI Score**: Radio — All, 90+, 70-89, Below 70
- **Rebuttals Used**: Radio — All, None, 1-2, 3+
- **Scenario**: Multi-select checkboxes (for demo, maps to campaign categories — provides a second filter axis over the same data)
- Active filters show count badge on button
- Click outside or re-click button closes popover

### Chart Switching
- Native `<select>` swaps between two ChartDataset objects
- Recharts animates segment transitions
- Center label updates with new total

### Table Row Hover
- "View Scenario" button fades in (opacity 0→100)
- Click shows brief visual acknowledgment (no navigation)

### FAB Hover
- Tooltip fades in from right side

### State Management
- All state in `app/page.tsx` via `useState`
- Filter state: `{ search, campaigns, aiScoreRange, rebuttalRange }`
- Chart state: selected dataset index
- Filtered prospects computed from state + mock data
- No external state library

## Design System Rules Enforced

1. **No-Line Rule**: No 1px solid borders for content separation. Boundaries via background color shifts only.
2. **No-Divider Rule**: No horizontal dividers in lists. Separation via spacing and alternating backgrounds.
3. **Ghost Border**: Input fields use `outline-variant` at 15% opacity for accessibility.
4. **Ambient Shadows**: Tinted with `primary` color at 4-6% opacity, 24-40px blur.
5. **Typography Contrast**: Newsreader for "The Case" (editorial), Inter for "The Data" (functional).
6. **No Success Green**: Gold (secondary) palette for positive states.
7. **WCAG AA**: `on-surface` (#191c1e) for all primary body text.
