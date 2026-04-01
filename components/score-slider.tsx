"use client";

interface ScoreSliderProps {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
}

export default function ScoreSlider({ label, value, onChange }: ScoreSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="font-body text-sm font-semibold text-primary">
          {label}
        </span>
        {value !== null && (
          <span className="text-lg font-bold text-rebuttal">{value}</span>
        )}
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value ?? 5}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="score-slider w-full"
        />
        <div className="flex justify-between text-[10px] text-outline -mt-0.5">
          <span>1</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
