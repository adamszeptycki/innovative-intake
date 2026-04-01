export interface Agent {
  id: string;
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
  status: "active" | "converted" | "declined";
}

export interface Campaign {
  id: string;
  name: string;
}

export interface Rebuttal {
  id: string;
  name: string;
  description: string;
  campaignId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  role: "admin" | "viewer";
  campaignAccess: string[];
  invitedAt: string;
  status: "pending" | "active";
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

export interface ConversationMessage {
  id: string;
  sender: "agent" | "prospect";
  text: string;
  timestamp: string;
  rebuttalUsed?: string;
}

export interface ConversationFeedback {
  toneScore: number;
  complianceScore: number;
  objectionHandlingScore: number;
  outcomeScore: number;
  notes: string;
  reviewerName: string;
  submittedAt: string;
}

export interface Conversation {
  id: string;
  prospectId: string;
  date: string;
  duration: string;
  messages: ConversationMessage[];
  feedback?: ConversationFeedback;
}
