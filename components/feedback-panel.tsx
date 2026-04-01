"use client";

import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import type { Conversation, ConversationFeedback } from "@/lib/types";
import ScoreSlider from "./score-slider";

interface FeedbackPanelProps {
  conversation: Conversation;
  onSubmit: (feedback: ConversationFeedback) => void;
}

const CATEGORIES = [
  { key: "toneScore", label: "Tone & Professionalism" },
  { key: "complianceScore", label: "Compliance" },
  { key: "objectionHandlingScore", label: "Objection Handling" },
  { key: "outcomeScore", label: "Outcome / Conversion" },
] as const;

function FeedbackForm({ onSubmit }: { onSubmit: (feedback: ConversationFeedback) => void }) {
  const [scores, setScores] = useState<Record<string, number | null>>({
    toneScore: null,
    complianceScore: null,
    objectionHandlingScore: null,
    outcomeScore: null,
  });
  const [notes, setNotes] = useState("");

  const allScoresSet = Object.values(scores).every((v) => v !== null);

  function handleSubmit() {
    if (!allScoresSet) return;
    onSubmit({
      toneScore: scores.toneScore!,
      complianceScore: scores.complianceScore!,
      objectionHandlingScore: scores.objectionHandlingScore!,
      outcomeScore: scores.outcomeScore!,
      notes,
      reviewerName: "Supervisor",
      submittedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-5">
      {CATEGORIES.map(({ key, label }) => (
        <ScoreSlider
          key={key}
          label={label}
          value={scores[key]}
          onChange={(value) => setScores((prev) => ({ ...prev, [key]: value }))}
        />
      ))}

      <div className="space-y-1.5">
        <label className="font-body text-sm font-semibold text-primary">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add coaching notes..."
          rows={3}
          className="w-full resize-none rounded-sm border border-outline-variant/15 bg-surface-container-lowest px-3 py-2 font-body text-sm text-primary placeholder:text-outline/50 focus:outline-none focus:ring-1 focus:ring-rebuttal/30"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allScoresSet}
        className="w-full rounded-sm bg-rebuttal px-4 py-2.5 font-body text-sm font-semibold text-on-rebuttal transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Feedback
      </button>
    </div>
  );
}

function FeedbackReadOnly({ feedback }: { feedback: ConversationFeedback }) {
  const submittedDate = new Date(feedback.submittedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-sm bg-rebuttal/10 px-3 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-rebuttal" />
        <span className="font-body text-xs text-rebuttal">
          Reviewed {submittedDate}
        </span>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map(({ key, label }) => {
          const score = feedback[key as keyof ConversationFeedback] as number;
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-body text-sm font-medium text-primary">
                  {label}
                </span>
                <span className="text-sm font-bold text-rebuttal">{score}</span>
              </div>
              <div className="h-1.5 rounded-full bg-rebuttal-container">
                <div
                  className="h-1.5 rounded-full bg-rebuttal transition-all"
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {feedback.notes && (
        <div className="space-y-1.5">
          <span className="font-body text-sm font-medium text-primary">
            Notes
          </span>
          <p className="font-body text-sm leading-relaxed text-outline">
            {feedback.notes}
          </p>
        </div>
      )}

      <p className="font-body text-xs text-outline/60">
        By {feedback.reviewerName}
      </p>
    </div>
  );
}

export default function FeedbackPanel({ conversation, onSubmit }: FeedbackPanelProps) {
  return (
    <div className="h-full rounded-sm bg-rebuttal/[0.03] border border-rebuttal/10 p-5">
      <div className="mb-5 flex items-center gap-2">
        <ClipboardCheck className="h-4 w-4 text-rebuttal" />
        <h2 className="font-headline text-sm font-semibold text-rebuttal">
          Supervisor Feedback
        </h2>
      </div>

      {conversation.feedback ? (
        <FeedbackReadOnly feedback={conversation.feedback} />
      ) : (
        <FeedbackForm onSubmit={onSubmit} />
      )}
    </div>
  );
}
