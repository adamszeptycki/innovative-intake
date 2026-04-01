import type { ConversationMessage } from "@/lib/types";
import { Layers } from "lucide-react";

export function ChatMessage({ message }: { message: ConversationMessage }) {
  const isAgent = message.sender === "agent";
  const isRebuttal = isAgent && !!message.rebuttalUsed;

  if (!isAgent) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[75%] bg-surface-container-lowest text-on-surface px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed ${
          isRebuttal
            ? "bg-rebuttal text-on-rebuttal"
            : "bg-primary text-on-primary"
        }`}
      >
        {message.text}
      </div>
      {isRebuttal && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rebuttal-container rounded-lg text-[11px] font-semibold text-on-rebuttal-container tracking-wide">
          <Layers size={12} />
          REBUTTAL DETECTED: {message.rebuttalUsed}
        </div>
      )}
    </div>
  );
}
