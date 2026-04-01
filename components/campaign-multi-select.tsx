"use client";

import { useState, useRef, useEffect } from "react";
import type { Campaign } from "@/lib/types";

interface Props {
  campaigns: Campaign[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CampaignMultiSelect({ campaigns, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const available = campaigns.filter((c) => !selected.includes(c.id));
  const selectedCampaigns = campaigns.filter((c) => selected.includes(c.id));

  function handleRemove(id: string) {
    onChange(selected.filter((s) => s !== id));
  }

  function handleAdd(id: string) {
    onChange([...selected, id]);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <div className="min-h-[42px] px-3 py-2 border border-outline-variant/50 rounded-sm flex flex-wrap gap-1.5 items-center">
        {selectedCampaigns.map((c) => (
          <span
            key={c.id}
            className="text-xs px-2.5 py-1 rounded-full bg-primary text-on-primary flex items-center gap-1"
          >
            {c.name}
            <button
              type="button"
              onClick={() => handleRemove(c.id)}
              className="opacity-70 hover:opacity-100 text-sm leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {available.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-xs text-outline hover:text-primary transition-colors"
          >
            + Add campaign...
          </button>
        )}
      </div>
      {open && available.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant/50 rounded-sm shadow-lg z-10">
          {available.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleAdd(c.id)}
              className="block w-full text-left px-3.5 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
