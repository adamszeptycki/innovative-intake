# Conversation Feedback — Supervisor Review Panel

## Context

Supervisors need a way to review and score agent conversations on the `/conversations/[id]` page. Currently the page shows the chat transcript and an AI-generated call summary, but there's no mechanism for human evaluation. This feature adds a structured feedback panel so supervisors can rate agent performance and leave coaching notes — creating a quality assurance loop alongside the existing AI scoring.

## Design

### Layout

The conversation detail page changes from a single-column layout to a **split layout**:

- **Left (~65%)**: Existing content — header (back link, prospect name, campaign, agent), chat messages, call summary card
- **Right (~35%)**: Feedback panel, always visible

The split is implemented at the `ConversationDetail` component level. The left column scrolls independently; the right panel is sticky/scrolls with the page.

### Feedback Panel Structure

Top to bottom:

1. **Panel header**: "Supervisor Feedback" with `ClipboardCheck` icon (lucide-react). Styled with rebuttal purple (`#6B21A8`) text on a light purple background (`bg-rebuttal/5` or similar).

2. **Four scoring sliders**, each containing:
   - **Category label** (left-aligned, `font-body text-sm font-semibold`)
   - **Score readout** (right-aligned, `text-lg font-bold text-rebuttal`)
   - **Slider track**: Purple filled track (`bg-rebuttal`) on light purple base (`bg-rebuttal/20`), with a draggable circular thumb
   - **End labels**: "1" on left, "10" on right (`text-xs text-outline`)
   - Default state: visually unset (track empty, no number shown) until the supervisor first interacts. Internally managed via React state (`null` until touched), not native `<input>` default.

   Categories:
   - Tone & Professionalism
   - Compliance
   - Objection Handling
   - Outcome / Conversion

3. **Notes textarea**: Optional free-text field for coaching comments. Styled with `bg-surface-container-lowest border border-outline-variant/15 rounded-sm`. Placeholder: "Add coaching notes..."

4. **Submit button**: Full-width, `bg-rebuttal text-white rounded-sm`. Disabled until all 4 scores are set. Label: "Submit Feedback"

### Post-Submission State

After submission, the form is replaced with a **read-only view**:

- Each category shows its score as a static filled bar (purple fill proportional to score) with the number
- Notes displayed as plain text (if provided)
- A "Submitted" badge with timestamp at the top of the panel (e.g., "Reviewed Apr 1, 2026 at 3:42 PM")
- No edit capability — feedback is permanent once submitted

### Data Model

New types added to `lib/types.ts`:

```typescript
interface ConversationFeedback {
  toneScore: number;           // 1-10
  complianceScore: number;     // 1-10
  objectionHandlingScore: number; // 1-10
  outcomeScore: number;        // 1-10
  notes: string;               // optional coaching notes
  reviewerName: string;        // supervisor who submitted
  submittedAt: string;         // ISO date string
}
```

The `Conversation` interface gets an optional field:

```typescript
interface Conversation {
  // ... existing fields
  feedback?: ConversationFeedback;
}
```

### Mock Data

- Most conversations start with no feedback (`feedback` field absent)
- 1-2 conversations in `conversation-data.ts` should have pre-populated feedback to demonstrate the read-only submitted state

### New Components

| Component | File | Purpose |
|-----------|------|---------|
| `FeedbackPanel` | `components/feedback-panel.tsx` | Container for the side panel — switches between form and read-only view based on whether `conversation.feedback` exists |
| `ScoreSlider` | `components/score-slider.tsx` | Reusable slider input for a single category — label, slider, number readout |

### Modified Files

| File | Change |
|------|--------|
| `lib/types.ts` | Add `ConversationFeedback` interface, add optional `feedback` field to `Conversation` |
| `lib/conversation-data.ts` | Add feedback data to 1-2 sample conversations |
| `components/conversation-detail.tsx` | Change to split layout, render `FeedbackPanel` on the right |

### Styling

- Follows existing design system: Tailwind utility classes, custom color tokens, `font-headline` / `font-body`
- Purple (`rebuttal`) color family used for the feedback panel — consistent with how the app already highlights review-related UI (rebuttal badges)
- Panel background: very light purple tint to visually distinguish from the white chat area
- Slider uses native `<input type="range">` styled with CSS to match the purple theme

## Verification

1. Navigate to `/conversations/1` — split layout visible with feedback panel on the right
2. All 4 sliders work, dragging updates the number readout
3. Submit button disabled until all 4 scores are set
4. After submission: form replaced with read-only scores + notes + timestamp
5. Navigate to a conversation with pre-populated feedback — read-only view shows immediately
6. Layout doesn't break at reasonable viewport widths (1024px+)
