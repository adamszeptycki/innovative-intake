"use client";

import { useState, useMemo } from "react";
import { Avatar } from "./avatar";
import type { AgentMetrics, SortField, SortDirection } from "@/lib/agent-utils";
import { sortAgentMetrics } from "@/lib/agent-utils";

const MEDAL_GRADIENTS = [
  "linear-gradient(135deg, #FFD700, #FFA500)",
  "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
  "linear-gradient(135deg, #CD7F32, #A0522D)",
];

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

function scoreBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function rateColor(rate: number): string {
  if (rate >= 0.6) return "text-green-600";
  if (rate >= 0.4) return "text-amber-600";
  return "text-red-600";
}

interface Props {
  metrics: AgentMetrics[];
}

export function AgentLeaderboard({ metrics }: Props) {
  const [sortField, setSortField] = useState<SortField>("avgAiScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sorted = useMemo(
    () => sortAgentMetrics(metrics, sortField, sortDirection),
    [metrics, sortField, sortDirection]
  );

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

  function sortIndicator(field: SortField) {
    if (sortField !== field) return "";
    return sortDirection === "desc" ? " ▼" : " ▲";
  }

  return (
    <div className="bg-surface-container-lowest rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-container border-b-2 border-outline-variant/30">
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold w-14">
              #
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold">
              Agent
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("avgAiScore")}
            >
              Avg AI Score{sortIndicator("avgAiScore")}
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("conversions")}
            >
              Conversions{sortIndicator("conversions")}
            </th>
            <th
              className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleSort("conversionRate")}
            >
              Conv. Rate{sortIndicator("conversionRate")}
            </th>
            <th className="py-3.5 px-4 text-left text-[11px] uppercase tracking-wider text-outline font-semibold">
              Total Calls
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr
              key={m.agent.id}
              className="border-b border-surface-container last:border-b-0 hover:bg-surface-container-low/50 transition-colors"
            >
              <td className="py-4 px-4">
                {i < 3 ? (
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold"
                    style={{ background: MEDAL_GRADIENTS[i] }}
                  >
                    {i + 1}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-container text-outline text-xs font-semibold">
                    {i + 1}
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={m.agent.name} size={36} />
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      {m.agent.name}
                    </div>
                    <div className="text-[11px] text-outline">
                      {m.campaignCount} campaigns
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreBarColor(m.avgAiScore)}`}
                      style={{ width: `${m.avgAiScore}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold ${scoreColor(m.avgAiScore)}`}>
                    {m.avgAiScore.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm font-bold text-primary">
                  {m.conversions}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`text-sm font-bold ${rateColor(m.conversionRate)}`}>
                  {Math.round(m.conversionRate * 100)}%
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-on-surface-variant">
                  {m.totalCalls}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
