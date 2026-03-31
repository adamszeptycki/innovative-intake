export interface Agent {
  name: string;
}

export interface Prospect {
  id: string;
  fullName: string;
  campaign: string;
  agent: Agent | null;
  transcriptionSnippet: string;
  aiScore: number;
  rebuttals: string[];
}

export interface ChartSegment {
  name: string;
  value: number;
  color: string;
}

export interface ChartDataset {
  label: string;
  total: string;
  totalLabel: string;
  segments: ChartSegment[];
}

export interface PerformanceMetrics {
  conversionRate: string;
  avgCallTime: string;
}

export type AiScoreRange = "all" | "90+" | "70-89" | "<70";
export type RebuttalRange = "all" | "none" | "1-2" | "3+";

export interface FilterState {
  search: string;
  campaigns: string[];
  aiScoreRange: AiScoreRange;
  rebuttalRange: RebuttalRange;
  scenarios: string[];
}
