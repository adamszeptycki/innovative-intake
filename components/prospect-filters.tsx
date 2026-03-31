"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import type { FilterState, AiScoreRange, RebuttalRange } from "@/lib/types";
import { allCampaigns, allScenarios } from "@/lib/mock-data";

function FilterButton({
  label,
  icon,
  isActive,
  activeCount,
  onClick,
}: {
  label: string;
  icon: "filter" | "chevron";
  isActive: boolean;
  activeCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-semibold rounded-sm flex items-center gap-2 transition-colors ${
        isActive
          ? "bg-surface-container-high text-primary"
          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
      }`}
    >
      {label}
      {activeCount > 0 && (
        <span className="bg-secondary text-on-secondary text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
          {activeCount}
        </span>
      )}
      {icon === "filter" ? (
        <Filter className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </button>
  );
}

function Popover({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full mt-2 left-0 bg-surface-container-lowest rounded-sm shadow-[0_4px_24px_rgba(4,22,39,0.06)] p-4 min-w-[200px] z-20"
    >
      {children}
    </div>
  );
}

export function ProspectFilters({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  function toggleFilter(name: string) {
    setOpenFilter(openFilter === name ? null : name);
  }

  function toggleCampaign(campaign: string) {
    const next = filters.campaigns.includes(campaign)
      ? filters.campaigns.filter((c) => c !== campaign)
      : [...filters.campaigns, campaign];
    onChange({ ...filters, campaigns: next });
  }

  function toggleScenario(scenario: string) {
    const next = filters.scenarios.includes(scenario)
      ? filters.scenarios.filter((s) => s !== scenario)
      : [...filters.scenarios, scenario];
    onChange({ ...filters, scenarios: next });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Campaign Filter */}
      <div className="relative">
        <FilterButton
          label="Campaign"
          icon="filter"
          isActive={openFilter === "campaign"}
          activeCount={filters.campaigns.length}
          onClick={() => toggleFilter("campaign")}
        />
        <Popover
          open={openFilter === "campaign"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {allCampaigns.map((campaign) => (
              <label
                key={campaign}
                className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.campaigns.includes(campaign)}
                  onChange={() => toggleCampaign(campaign)}
                  className="rounded-sm border-outline-variant/30 text-primary focus:ring-primary/20"
                />
                {campaign}
              </label>
            ))}
          </div>
        </Popover>
      </div>

      {/* AI Score Filter */}
      <div className="relative">
        <FilterButton
          label="AI Score"
          icon="chevron"
          isActive={openFilter === "aiScore"}
          activeCount={filters.aiScoreRange !== "all" ? 1 : 0}
          onClick={() => toggleFilter("aiScore")}
        />
        <Popover
          open={openFilter === "aiScore"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {(["all", "90+", "70-89", "<70"] as AiScoreRange[]).map(
              (range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
                >
                  <input
                    type="radio"
                    name="aiScore"
                    checked={filters.aiScoreRange === range}
                    onChange={() =>
                      onChange({ ...filters, aiScoreRange: range })
                    }
                    className="border-outline-variant/30 text-primary focus:ring-primary/20"
                  />
                  {range === "all" ? "All" : range}
                </label>
              )
            )}
          </div>
        </Popover>
      </div>

      {/* Rebuttals Filter */}
      <div className="relative">
        <FilterButton
          label="Rebuttals Used"
          icon="chevron"
          isActive={openFilter === "rebuttals"}
          activeCount={filters.rebuttalRange !== "all" ? 1 : 0}
          onClick={() => toggleFilter("rebuttals")}
        />
        <Popover
          open={openFilter === "rebuttals"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {(["all", "none", "1-2", "3+"] as RebuttalRange[]).map(
              (range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rebuttals"
                    checked={filters.rebuttalRange === range}
                    onChange={() =>
                      onChange({ ...filters, rebuttalRange: range })
                    }
                    className="border-outline-variant/30 text-primary focus:ring-primary/20"
                  />
                  {range === "all"
                    ? "All"
                    : range === "none"
                      ? "None"
                      : range}
                </label>
              )
            )}
          </div>
        </Popover>
      </div>

      {/* Scenario Filter */}
      <div className="relative">
        <FilterButton
          label="Scenario"
          icon="chevron"
          isActive={openFilter === "scenario"}
          activeCount={filters.scenarios.length}
          onClick={() => toggleFilter("scenario")}
        />
        <Popover
          open={openFilter === "scenario"}
          onClose={() => setOpenFilter(null)}
        >
          <div className="space-y-2">
            {allScenarios.map((scenario) => (
              <label
                key={scenario}
                className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.scenarios.includes(scenario)}
                  onChange={() => toggleScenario(scenario)}
                  className="rounded-sm border-outline-variant/30 text-primary focus:ring-primary/20"
                />
                {scenario}
              </label>
            ))}
          </div>
        </Popover>
      </div>
    </div>
  );
}
