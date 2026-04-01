"use client";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export function SettingsTabs({ activeTab, onTabChange, tabs }: Props) {
  return (
    <div className="flex bg-surface-container-lowest border-b-2 border-outline-variant/30 px-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-4 text-sm transition-colors relative ${
            activeTab === tab.id
              ? "text-primary font-semibold"
              : "text-outline hover:text-primary"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary -mb-[1px]" />
          )}
        </button>
      ))}
    </div>
  );
}
