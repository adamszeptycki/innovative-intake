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
