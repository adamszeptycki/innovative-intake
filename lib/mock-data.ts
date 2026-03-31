import type {
  Prospect,
  ChartDataset,
  PerformanceMetrics,
  FilterState,
} from "./types";

export const prospects: Prospect[] = [
  {
    id: "1",
    fullName: "Jonathan Sterling",
    campaign: "Talc Class Action",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "...concerned about the long-term exposure and medical records from 2014...",
    aiScore: 88,
    rebuttals: ["Immaterially Why", "Service Proof", "Legal Standing", "Cost Clarity"],
  },
  {
    id: "2",
    fullName: "Eleanor Vance",
    campaign: "Hernia Mesh",
    agent: null,
    transcriptionSnippet:
      "Client reports significant pain after 2019 surgery. Requested counsel.",
    aiScore: 94,
    rebuttals: ["Recall Status"],
  },
  {
    id: "3",
    fullName: "Marcus Thorne",
    campaign: "Talc Class Action",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Client hesitant about litigation timeline. Needs reassurance.",
    aiScore: 72,
    rebuttals: ["Timeline Obj", "Cost Clarity"],
  },
  {
    id: "4",
    fullName: "Amara Okafor",
    campaign: "Auto Accident",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Multi-vehicle collision. Police report attached. Urgent review.",
    aiScore: 91,
    rebuttals: ["Fault Proof", "Medical Lien", "Insurance Gap"],
  },
  {
    id: "5",
    fullName: "Diane Prescott",
    campaign: "Medical Malpractice",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Post-surgical complications led to extended hospitalization. Reviewing records.",
    aiScore: 85,
    rebuttals: ["Standard of Care", "Causation"],
  },
  {
    id: "6",
    fullName: "Rafael Gutierrez",
    campaign: "Auto Accident",
    agent: null,
    transcriptionSnippet:
      "Rear-end collision on I-95. Whiplash and back injury reported.",
    aiScore: 67,
    rebuttals: [],
  },
  {
    id: "7",
    fullName: "Priya Sharma",
    campaign: "Hernia Mesh",
    agent: { name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Mesh erosion confirmed by specialist. Seeking class action inclusion.",
    aiScore: 96,
    rebuttals: ["Device ID", "Recall Status", "Statute Check"],
  },
  {
    id: "8",
    fullName: "Thomas Whitfield",
    campaign: "Medical Malpractice",
    agent: { name: "David Miller" },
    transcriptionSnippet:
      "Misdiagnosis led to delayed cancer treatment. Reviewing pathology reports.",
    aiScore: 79,
    rebuttals: ["Timeline Obj"],
  },
];

export const chartDatasets: ChartDataset[] = [
  {
    label: "Number of Calls",
    total: "1.2k",
    totalLabel: "Total Inbound",
    segments: [
      { name: "Class Action", value: 45, color: "#041627" },
      { name: "Personal Injury", value: 25, color: "#775a19" },
      { name: "Medical Malpractice", value: 20, color: "#38485a" },
      { name: "Employment Law", value: 10, color: "#b7c8de" },
    ],
  },
  {
    label: "Number of Minutes Spent",
    total: "8.4k",
    totalLabel: "Total Minutes",
    segments: [
      { name: "Class Action", value: 38, color: "#041627" },
      { name: "Personal Injury", value: 30, color: "#775a19" },
      { name: "Medical Malpractice", value: 22, color: "#38485a" },
      { name: "Employment Law", value: 10, color: "#b7c8de" },
    ],
  },
];

export const performanceMetrics: PerformanceMetrics = {
  conversionRate: "14.8%",
  avgCallTime: "12m 45s",
};

export const allCampaigns = [
  ...new Set(prospects.map((p) => p.campaign)),
];

export const allScenarios = ["Litigation", "Settlement", "Discovery", "Pre-Trial"];

export function filterProspects(
  data: Prospect[],
  filters: FilterState
): Prospect[] {
  return data.filter((prospect) => {
    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesName = prospect.fullName.toLowerCase().includes(query);
      const matchesSnippet = prospect.transcriptionSnippet
        .toLowerCase()
        .includes(query);
      if (!matchesName && !matchesSnippet) return false;
    }

    // Campaign filter
    if (
      filters.campaigns.length > 0 &&
      !filters.campaigns.includes(prospect.campaign)
    ) {
      return false;
    }

    // AI Score range filter
    switch (filters.aiScoreRange) {
      case "90+":
        if (prospect.aiScore < 90) return false;
        break;
      case "70-89":
        if (prospect.aiScore < 70 || prospect.aiScore >= 90) return false;
        break;
      case "<70":
        if (prospect.aiScore >= 70) return false;
        break;
    }

    // Rebuttal range filter
    switch (filters.rebuttalRange) {
      case "none":
        if (prospect.rebuttals.length !== 0) return false;
        break;
      case "1-2":
        if (prospect.rebuttals.length < 1 || prospect.rebuttals.length > 2)
          return false;
        break;
      case "3+":
        if (prospect.rebuttals.length < 3) return false;
        break;
    }

    // Scenario filter (maps to campaign categories for demo)
    if (filters.scenarios.length > 0) {
      const scenarioToCampaigns: Record<string, string[]> = {
        Litigation: ["Talc Class Action", "Hernia Mesh"],
        Settlement: ["Auto Accident"],
        Discovery: ["Medical Malpractice"],
        "Pre-Trial": ["Talc Class Action", "Auto Accident"],
      };
      const allowed = new Set(
        filters.scenarios.flatMap((s) => scenarioToCampaigns[s] ?? [])
      );
      if (!allowed.has(prospect.campaign)) return false;
    }

    return true;
  });
}
