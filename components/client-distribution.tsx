"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import type { ChartDataset } from "@/lib/types";

export function ClientDistribution({
  datasets,
  selectedIndex,
  onSelectDataset,
}: {
  datasets: ChartDataset[];
  selectedIndex: number;
  onSelectDataset: (index: number) => void;
}) {
  const dataset = datasets[selectedIndex];

  return (
    <div className="bg-surface-container-lowest p-8 rounded-sm shadow-[0_2px_8px_rgba(4,22,39,0.04)]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-headline text-2xl text-primary">
          Client Distribution
        </h2>
        <div className="relative">
          <select
            value={selectedIndex}
            onChange={(e) => onSelectDataset(Number(e.target.value))}
            className="appearance-none bg-surface-container-low border border-outline-variant/15 px-4 py-2 pr-10 text-sm font-medium text-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer font-body"
          >
            {datasets.map((ds, i) => (
              <option key={ds.label} value={i}>
                {ds.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataset.segments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
                animationDuration={600}
              >
                {dataset.segments.map((segment) => (
                  <Cell key={segment.name} fill={segment.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-headline text-primary">
              {dataset.total}
            </span>
            <span className="text-[0.65rem] uppercase tracking-widest text-outline font-bold">
              {dataset.totalLabel}
            </span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6 w-full">
          {dataset.segments.map((segment) => (
            <div key={segment.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-on-surface-variant">
                  {segment.name}
                </span>
              </div>
              <p className="text-xl font-headline pl-5">{segment.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
