"use client";

import { useState } from "react";
import Link from "next/link";
import type { Prospect, Conversation, ConversationFeedback } from "@/lib/types";
import { ChatMessage } from "./chat-message";
import { CallSummaryCard } from "./call-summary-card";
import FeedbackPanel from "./feedback-panel";
import { ArrowLeft } from "lucide-react";

export function ConversationDetail({
  prospect,
  conversation: initialConversation,
}: {
  prospect: Prospect;
  conversation: Conversation;
}) {
  const [conversation, setConversation] = useState(initialConversation);

  function handleFeedbackSubmit(feedback: ConversationFeedback) {
    setConversation((prev) => ({ ...prev, feedback }));
  }

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <div className="bg-primary text-on-primary px-7 py-5 flex items-center gap-4">
        <Link
          href="/"
          className="text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          Back to Prospects
        </Link>
        <div className="w-px h-6 bg-white/20" />
        <div>
          <h1 className="font-headline text-xl font-semibold">
            {prospect.fullName}
          </h1>
          <p className="text-[13px] opacity-60 mt-0.5">
            {prospect.campaign}
            {prospect.agent && ` · Agent: ${prospect.agent.name}`}
          </p>
        </div>
      </div>

      <div className="flex gap-6 px-7 py-6">
        <div className="flex-[2] flex flex-col gap-4 min-w-0">
          <div className="text-center text-[11px] text-outline uppercase tracking-wider my-2">
            {conversation.date} · {conversation.messages[0]?.timestamp}
          </div>

          {conversation.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          <CallSummaryCard prospect={prospect} conversation={conversation} />
        </div>

        <div className="flex-[1] min-w-[280px] max-w-[340px]">
          <div className="sticky top-6">
            <FeedbackPanel
              conversation={conversation}
              onSubmit={handleFeedbackSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
