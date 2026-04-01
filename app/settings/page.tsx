"use client";

import { useState } from "react";
import { SettingsTabs } from "@/components/settings-tabs";
import { RebuttalsTab } from "@/components/rebuttals-tab";
import { TeamTab } from "@/components/team-tab";

const TABS = [
  { id: "rebuttals", label: "Rebuttals" },
  { id: "team", label: "Team" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("rebuttals");

  return (
    <div className="max-w-7xl mx-auto">
      <SettingsTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="p-10">
        {activeTab === "rebuttals" && <RebuttalsTab />}
        {activeTab === "team" && <TeamTab />}
      </div>
    </div>
  );
}
