"use client";

import { useMemo } from "react";
import { Avatar } from "./avatar";
import { computeAgentMetrics, sortAgentMetrics } from "@/lib/agent-utils";
import { agents, prospects } from "@/lib/mock-data";

const MEDAL_GRADIENTS = [
  "linear-gradient(135deg, #FFD700, #FFA500)",
  "linear-gradient(135deg, #C0C0C0, #A0A0A0)",
  "linear-gradient(135deg, #CD7F32, #A0522D)",
];

const ROW_OPACITY = ["bg-white/35", "bg-white/20", "bg-white/[0.12]"];

export function TopAgentsCard() {
  const top3 = useMemo(() => {
    const all = computeAgentMetrics(agents, prospects);
    return sortAgentMetrics(all, "conversionRate", "desc").slice(0, 3);
  }, []);

  return (
    <div className="bg-primary-container text-on-primary p-8 rounded-sm h-full flex flex-col">
      <div className="text-center mb-5">
        <span className="text-[0.65rem] uppercase tracking-widest text-on-primary-container font-bold">
          Top Agents This Week
        </span>
      </div>
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {top3.map((m, i) => (
          <div
            key={m.agent.id}
            className={`flex items-center gap-3 ${ROW_OPACITY[i]} rounded-sm px-4 py-3`}
          >
            <div className="relative">
              <Avatar name={m.agent.name} size={40} />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                style={{ background: MEDAL_GRADIENTS[i] }}
              >
                {i + 1}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-on-primary truncate">
                {m.agent.name}
              </div>
              <div className="text-[11px] text-on-primary-container">
                {m.conversions} conversions · {m.avgAiScore.toFixed(0)} avg score
              </div>
            </div>
            <div className="text-xl font-bold text-on-primary">
              {Math.round(m.conversionRate * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
