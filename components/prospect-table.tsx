"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import type { Prospect, FilterState } from "@/lib/types";
import { ProspectFilters } from "./prospect-filters";
import { ProspectRow } from "./prospect-row";

export function ProspectTable({
  prospects,
  filters,
  onFiltersChange,
}: {
  prospects: Prospect[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
}) {
  const [searchInput, setSearchInput] = useState(filters.search);

  const onFiltersChangeRef = useRef(onFiltersChange);
  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange;
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChangeRef.current((prev: FilterState) => ({
        ...prev,
        search: searchInput,
      }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl text-primary">
            Active Prospect List
          </h2>
          <p className="text-sm text-outline">
            Live monitoring of legal intakes and active rebuttals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-outline">
              <Search className="w-3 h-3" />
            </span>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-8 pr-4 py-2 bg-surface-container-low border border-outline-variant/15 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest w-48 transition-all font-body"
              placeholder="Search prospects..."
              type="text"
            />
          </div>
          <ProspectFilters filters={filters} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[0.65rem] uppercase tracking-widest text-outline font-bold">
              <th className="pb-2 pl-4">Full Name</th>
              <th className="pb-2">Campaign</th>
              <th className="pb-2">Agent Name</th>
              <th className="pb-2">Transcription Snippet</th>
              <th className="pb-2">AI Score</th>
              <th className="pb-2">Rebuttals</th>
              <th className="pb-2 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <ProspectRow key={prospect.id} prospect={prospect} />
            ))}
            {prospects.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-outline italic font-headline text-lg"
                >
                  No prospects match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
