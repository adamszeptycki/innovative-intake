import { notFound } from "next/navigation";
import { prospects } from "@/lib/mock-data";
import { getConversationByProspectId } from "@/lib/conversation-data";
import { ConversationDetail } from "@/components/conversation-detail";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prospect = prospects.find((p) => p.id === id);
  const conversation = getConversationByProspectId(id);

  if (!prospect || !conversation) {
    notFound();
  }

  return <ConversationDetail prospect={prospect} conversation={conversation} />;
}
