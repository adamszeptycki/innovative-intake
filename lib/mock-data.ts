import type {
  Prospect,
  ChartDataset,
  PerformanceMetrics,
  FilterState,
  Agent,
  Campaign,
  Rebuttal,
  Client,
} from "./types";

export const agents: Agent[] = [
  { id: "agent-1", name: "Sarah Jenkins" },
  { id: "agent-2", name: "David Miller" },
  { id: "agent-3", name: "Maria Rodriguez" },
  { id: "agent-4", name: "James Taylor" },
  { id: "agent-5", name: "Kevin Brooks" },
];

export const campaigns: Campaign[] = [
  { id: "camp-1", name: "Talc Class Action" },
  { id: "camp-2", name: "Hernia Mesh" },
  { id: "camp-3", name: "Auto Accident" },
  { id: "camp-4", name: "Medical Malpractice" },
];

export const prospects: Prospect[] = [
  {
    id: "1",
    fullName: "Jonathan Sterling",
    campaign: "Talc Class Action",
    agent: { id: "agent-1", name: "Sarah Jenkins" },
    transcriptionSnippet:
      "...concerned about the long-term exposure and medical records from 2014...",
    aiScore: 88,
    rebuttals: ["Immaterially Why", "Service Proof", "Legal Standing", "Cost Clarity"],
    status: "converted",
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
    status: "active",
  },
  {
    id: "3",
    fullName: "Marcus Thorne",
    campaign: "Talc Class Action",
    agent: { id: "agent-2", name: "David Miller" },
    transcriptionSnippet:
      "Client hesitant about litigation timeline. Needs reassurance.",
    aiScore: 72,
    rebuttals: ["Timeline Obj", "Cost Clarity"],
    status: "declined",
  },
  {
    id: "4",
    fullName: "Amara Okafor",
    campaign: "Auto Accident",
    agent: { id: "agent-1", name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Multi-vehicle collision. Police report attached. Urgent review.",
    aiScore: 91,
    rebuttals: ["Fault Proof", "Medical Lien", "Insurance Gap"],
    status: "converted",
  },
  {
    id: "5",
    fullName: "Diane Prescott",
    campaign: "Medical Malpractice",
    agent: { id: "agent-2", name: "David Miller" },
    transcriptionSnippet:
      "Post-surgical complications led to extended hospitalization. Reviewing records.",
    aiScore: 85,
    rebuttals: ["Standard of Care", "Causation"],
    status: "converted",
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
    status: "active",
  },
  {
    id: "7",
    fullName: "Priya Sharma",
    campaign: "Hernia Mesh",
    agent: { id: "agent-1", name: "Sarah Jenkins" },
    transcriptionSnippet:
      "Mesh erosion confirmed by specialist. Seeking class action inclusion.",
    aiScore: 96,
    rebuttals: ["Device ID", "Recall Status", "Statute Check"],
    status: "converted",
  },
  {
    id: "8",
    fullName: "Thomas Whitfield",
    campaign: "Medical Malpractice",
    agent: { id: "agent-2", name: "David Miller" },
    transcriptionSnippet:
      "Misdiagnosis led to delayed cancer treatment. Reviewing pathology reports.",
    aiScore: 79,
    rebuttals: ["Timeline Obj"],
    status: "declined",
  },
  {
    id: "9",
    fullName: "Catherine Wells",
    campaign: "Talc Class Action",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet: "Long-term talc product user. Reviewing medical history for correlation.",
    aiScore: 83,
    rebuttals: ["Immaterially Why", "Cost Clarity"],
    status: "converted",
  },
  {
    id: "10",
    fullName: "Daniel Okonkwo",
    campaign: "Auto Accident",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet: "T-bone collision at intersection. Other driver ran red light.",
    aiScore: 76,
    rebuttals: ["Fault Proof"],
    status: "active",
  },
  {
    id: "11",
    fullName: "Susan Lee",
    campaign: "Hernia Mesh",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet: "Mesh revision surgery required after initial implant failure.",
    aiScore: 89,
    rebuttals: ["Recall Status", "Device ID"],
    status: "converted",
  },
  {
    id: "12",
    fullName: "Robert Harrison",
    campaign: "Medical Malpractice",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet: "Surgical instrument left inside during routine procedure. Seeking damages.",
    aiScore: 71,
    rebuttals: ["Standard of Care"],
    status: "declined",
  },
  {
    id: "13",
    fullName: "Jennifer Cruz",
    campaign: "Talc Class Action",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet: "Occupational exposure to talc in cosmetics manufacturing facility.",
    aiScore: 92,
    rebuttals: ["Legal Standing", "Service Proof", "Cost Clarity"],
    status: "converted",
  },
  {
    id: "14",
    fullName: "William Patel",
    campaign: "Auto Accident",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet: "Rear-end collision. Disputing fault with other driver's insurance company.",
    aiScore: 68,
    rebuttals: ["Insurance Gap"],
    status: "declined",
  },
  {
    id: "15",
    fullName: "Angela Torres",
    campaign: "Hernia Mesh",
    agent: { id: "agent-3", name: "Maria Rodriguez" },
    transcriptionSnippet: "Chronic pain and complications two years post-mesh implant surgery.",
    aiScore: 87,
    rebuttals: ["Recall Status", "Statute Check"],
    status: "converted",
  },
  {
    id: "16",
    fullName: "Steven Kim",
    campaign: "Medical Malpractice",
    agent: { id: "agent-4", name: "James Taylor" },
    transcriptionSnippet: "Delayed diagnosis of appendicitis leading to emergency surgery.",
    aiScore: 81,
    rebuttals: ["Causation", "Timeline Obj"],
    status: "active",
  },
  {
    id: "17",
    fullName: "Lisa Chen",
    campaign: "Talc Class Action",
    agent: { id: "agent-5", name: "Kevin Brooks" },
    transcriptionSnippet: "Decades of talc product use. Family history of related conditions.",
    aiScore: 74,
    rebuttals: ["Immaterially Why"],
    status: "converted",
  },
];

export const rebuttalsCatalog: Rebuttal[] = [
  { id: "reb-1", name: "Immaterially Why", description: "When a prospect questions why the case matters or expresses doubt about the significance of their claim, redirect focus to the real-world impact and legal precedent.", campaignId: "camp-1" },
  { id: "reb-2", name: "Service Proof", description: "When a prospect asks for evidence of successful outcomes, provide concrete examples of past case results and client testimonials without making specific guarantees.", campaignId: "camp-1" },
  { id: "reb-3", name: "Legal Standing", description: "When a prospect doubts whether they have a valid legal claim, walk through the qualifying criteria and explain how their situation meets the threshold for action.", campaignId: "camp-1" },
  { id: "reb-4", name: "Cost Clarity", description: "When a prospect is concerned about legal costs or fees, explain the contingency fee structure and emphasize there is no upfront cost to the client.", campaignId: "camp-1" },
  { id: "reb-5", name: "Recall Status", description: "When a prospect asks about the current recall status of their mesh device, provide the latest FDA and manufacturer recall information relevant to their product.", campaignId: "camp-2" },
  { id: "reb-6", name: "Device ID", description: "When a prospect needs help identifying their specific mesh product, guide them through obtaining surgical records and device identification numbers.", campaignId: "camp-2" },
  { id: "reb-7", name: "Statute Check", description: "When a prospect is concerned about statute of limitations, explain the discovery rule and how the filing window may extend from when they learned of the defect.", campaignId: "camp-2" },
  { id: "reb-8", name: "Fault Proof", description: "When a prospect is concerned about proving fault in the accident, explain how police reports, witness statements, and traffic camera footage build the evidence chain.", campaignId: "camp-3" },
  { id: "reb-9", name: "Medical Lien", description: "When a prospect has medical liens and is worried about coverage, explain how liens are negotiated as part of the settlement process and the client's rights.", campaignId: "camp-3" },
  { id: "reb-10", name: "Insurance Gap", description: "When a prospect's insurance coverage is insufficient, explain uninsured/underinsured motorist options and how to pursue the at-fault driver's assets.", campaignId: "camp-3" },
  { id: "reb-11", name: "Standard of Care", description: "When discussing whether the medical provider deviated from standard of care, reference expert medical opinions and established treatment protocols.", campaignId: "camp-4" },
  { id: "reb-12", name: "Causation", description: "When a prospect needs to establish a direct link between the provider's actions and their injury, explain how medical experts trace the causal chain.", campaignId: "camp-4" },
  { id: "reb-13", name: "Timeline Obj", description: "When a prospect is concerned about the timeline of events or delayed filing, explain how medical malpractice discovery rules work in their jurisdiction.", campaignId: "camp-4" },
];

export const initialClients: Client[] = [
  { id: "client-1", name: "Rachel Chen", email: "rachel.chen@lawfirm.com", role: "admin", campaignAccess: ["camp-1", "camp-2"], invitedAt: "2026-03-15", status: "active" },
  { id: "client-2", name: "Michael Park", email: "m.park@associates.com", role: "viewer", campaignAccess: ["camp-3", "camp-4", "camp-1"], invitedAt: "2026-03-18", status: "active" },
  { id: "client-3", name: "Lisa Santos", email: "l.santos@legal.com", role: "viewer", campaignAccess: ["camp-2"], invitedAt: "2026-03-25", status: "pending" },
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
  {
    label: "Number of Rebounds",
    total: "340",
    totalLabel: "Total Rebounds",
    segments: [
      { name: "Class Action", value: 42, color: "#041627" },
      { name: "Personal Injury", value: 28, color: "#775a19" },
      { name: "Medical Malpractice", value: 18, color: "#38485a" },
      { name: "Employment Law", value: 12, color: "#b7c8de" },
    ],
  },
];

export const performanceMetrics: PerformanceMetrics = {
  conversionRate: "14.8%",
  avgCallTime: "12m 45s",
};

export const allCampaigns = campaigns.map((c) => c.name);

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
