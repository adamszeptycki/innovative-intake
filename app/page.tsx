"use client";

import { useState, useMemo, useCallback } from "react";
import { ClientDistribution } from "@/components/client-distribution";
import { PerformanceCard } from "@/components/performance-card";
import { ProspectTable } from "@/components/prospect-table";
import { FloatingActionButton } from "@/components/floating-action-button";
import {
  prospects,
  chartDatasets,
  performanceMetrics,
  filterProspects,
} from "@/lib/mock-data";
import type { FilterState } from "@/lib/types";

const initialFilters: FilterState = {
  search: "",
  campaigns: [],
  aiScoreRange: "all",
  rebuttalRange: "all",
  scenarios: [],
};

export default function DashboardPage() {
  const [chartIndex, setChartIndex] = useState(0);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredProspects = useMemo(
    () => filterProspects(prospects, filters),
    [filters]
  );

  const handleFiltersChange = useCallback(
    (next: FilterState | ((prev: FilterState) => FilterState)) => {
      setFilters(next);
    },
    []
  );

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      {/* Top Section: Client Distribution + Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <ClientDistribution
            datasets={chartDatasets}
            selectedIndex={chartIndex}
            onSelectDataset={setChartIndex}
          />
        </div>
        <div className="lg:col-span-4 h-full">
          <PerformanceCard metrics={performanceMetrics} />
        </div>
      </section>

      {/* Bottom Section: Active Prospect List */}
      <ProspectTable
        prospects={filteredProspects}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <FloatingActionButton />
    </div>
  );
}
