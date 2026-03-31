import type { PerformanceMetrics } from "@/lib/types";

export function PerformanceCard({
  metrics,
}: {
  metrics: PerformanceMetrics;
}) {
  return (
    <div className="bg-primary-container text-on-primary p-8 rounded-sm h-full flex flex-col justify-between">
      <div>
        <span className="text-[0.65rem] uppercase tracking-widest text-on-primary-container font-bold mb-2 block">
          Weekly Performance
        </span>
        <h3 className="font-headline text-2xl mb-4 italic text-on-primary">
          The Barrister&apos;s Standard
        </h3>
        <p className="text-on-primary-container text-sm leading-relaxed mb-6">
          Efficiency in counsel is measured not just in volume, but in the
          precision of the rebuttal and the clarity of the brief.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <span className="text-xs text-on-primary-container">
            Conversion Rate
          </span>
          <span className="text-lg font-headline text-secondary-fixed">
            {metrics.conversionRate}
          </span>
        </div>
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <span className="text-xs text-on-primary-container">
            Avg. Call Time
          </span>
          <span className="text-lg font-headline text-secondary-fixed">
            {metrics.avgCallTime}
          </span>
        </div>
      </div>
    </div>
  );
}
