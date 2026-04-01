"use client";

import type { Rebuttal } from "@/lib/types";

interface Props {
  rebuttal: Rebuttal;
  usageCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function RebuttalCard({ rebuttal, usageCount, onEdit, onDelete }: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-sm p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-surface-container">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-base font-semibold text-primary">
              {rebuttal.name}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rebuttal-container text-on-rebuttal-container font-medium">
              Used {usageCount} times
            </span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {rebuttal.description}
          </p>
        </div>
        <div className="flex gap-1.5 ml-4 shrink-0">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-sm border border-outline-variant/50 text-xs text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-sm border border-error/30 bg-error/5 text-xs text-error hover:bg-error/10 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
