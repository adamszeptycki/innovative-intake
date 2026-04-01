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
