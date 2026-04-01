import type { Prospect } from "@/lib/types";
import type { Conversation } from "@/lib/types";
import { Activity } from "lucide-react";

export function CallSummaryCard({
  prospect,
  conversation,
}: {
  prospect: Prospect;
  conversation: Conversation;
}) {
  const rebuttalCount = conversation.messages.filter(
    (m) => m.rebuttalUsed
  ).length;

  const scoreColor =
    prospect.aiScore >= 80
      ? "text-green-500"
      : prospect.aiScore >= 40
        ? "text-amber-500"
        : "text-red-500";

  const barColor =
    prospect.aiScore >= 80
      ? "bg-green-500"
      : prospect.aiScore >= 40
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="mt-4 bg-surface-container-lowest rounded-2xl p-5 shadow-[0_2px_12px_rgba(4,22,39,0.06)]">
      <div className="flex items-center gap-2.5 mb-3.5">
        <Activity size={18} className="text-primary" />
        <span className="font-headline text-[15px] font-semibold text-primary">
          Call Summary
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className={`font-headline text-4xl font-bold ${scoreColor}`}>
            {prospect.aiScore}
          </div>
          <div className="text-[11px] text-outline uppercase tracking-wider">
            AI Score
          </div>
        </div>
        <div className="w-px h-12 bg-surface-variant" />
        <div className="flex-1">
          <div className="flex justify-between text-[13px] text-outline mb-1.5">
            <span>Confidence</span>
            <span className="font-semibold text-on-surface">
              {prospect.aiScore}%
            </span>
          </div>
          <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full`}
              style={{ width: `${prospect.aiScore}%` }}
            />
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <div>
              <span className="text-outline">Duration:</span>{" "}
              <span className="text-on-surface font-medium">
                {conversation.duration}
              </span>
            </div>
            <div>
              <span className="text-outline">Rebuttals:</span>{" "}
              <span className="text-rebuttal font-semibold">
                {rebuttalCount} detected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
