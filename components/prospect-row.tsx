"use client";

import { useState } from "react";
import type { Prospect } from "@/lib/types";
import { Avatar } from "./avatar";

const MAX_VISIBLE_REBUTTALS = 2;

export function ProspectRow({ prospect }: { prospect: Prospect }) {
  const [acknowledged, setAcknowledged] = useState(false);
  const visibleRebuttals = prospect.rebuttals.slice(0, MAX_VISIBLE_REBUTTALS);
  const extraCount = prospect.rebuttals.length - MAX_VISIBLE_REBUTTALS;

  return (
    <tr className="group bg-surface-container-lowest hover:bg-white transition-colors duration-200 shadow-[0_2px_4px_rgba(4,22,39,0.02)]">
      <td className="py-5 pl-4 rounded-l-sm">
        <span className="font-headline text-lg text-primary">
          {prospect.fullName}
        </span>
      </td>
      <td className="py-5">
        <span className="text-xs bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full font-medium">
          {prospect.campaign}
        </span>
      </td>
      <td className="py-5">
        {prospect.agent ? (
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Avatar name={prospect.agent.name} size={20} />
            {prospect.agent.name}
          </div>
        ) : (
          <span className="text-xs text-outline italic">Unassigned</span>
        )}
      </td>
      <td className="py-5">
        <p className="text-xs text-outline italic max-w-xs truncate">
          &ldquo;{prospect.transcriptionSnippet}&rdquo;
        </p>
      </td>
      <td className="py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-1 bg-surface-container rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full transition-all duration-300"
              style={{ width: `${prospect.aiScore}%` }}
            />
          </div>
          <span className="text-sm font-bold text-primary">
            {prospect.aiScore}
          </span>
        </div>
      </td>
      <td className="py-5">
        <div className="flex gap-1 flex-wrap">
          {visibleRebuttals.map((rebuttal) => (
            <span
              key={rebuttal}
              className="text-[10px] uppercase font-bold text-outline bg-surface-container px-2 py-0.5 rounded-sm"
            >
              {rebuttal}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[10px] font-bold text-secondary bg-secondary-fixed/30 px-2 py-0.5 rounded-sm">
              +{extraCount} more
            </span>
          )}
        </div>
      </td>
      <td className="py-5 pr-4 text-right rounded-r-sm">
        <button
          onClick={() => {
            setAcknowledged(true);
            setTimeout(() => setAcknowledged(false), 800);
          }}
          className={`opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-all ${
            acknowledged
              ? "bg-secondary text-on-secondary"
              : "bg-primary text-on-primary hover:bg-primary-container"
          }`}
        >
          {acknowledged ? "Noted" : "View Scenario"}
        </button>
      </td>
    </tr>
  );
}
