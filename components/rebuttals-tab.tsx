"use client";

import { useState, useMemo } from "react";
import type { Rebuttal } from "@/lib/types";
import { campaigns, rebuttalsCatalog, prospects } from "@/lib/mock-data";
import { RebuttalCard } from "./rebuttal-card";
import { RebuttalForm } from "./rebuttal-form";

export function RebuttalsTab() {
  const [rebuttals, setRebuttals] = useState<Rebuttal[]>(rebuttalsCatalog);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0].id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = useMemo(
    () => rebuttals.filter((r) => r.campaignId === selectedCampaignId),
    [rebuttals, selectedCampaignId]
  );

  const usageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of prospects) {
      for (const name of p.rebuttals) {
        counts[name] = (counts[name] || 0) + 1;
      }
    }
    return counts;
  }, []);

  function handleAdd(name: string, description: string) {
    const newRebuttal: Rebuttal = {
      id: `reb-${Date.now()}`,
      name,
      description,
      campaignId: selectedCampaignId,
    };
    setRebuttals((prev) => [...prev, newRebuttal]);
    setShowAddForm(false);
  }

  function handleEdit(id: string, name: string, description: string) {
    setRebuttals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name, description } : r))
    );
    setEditingId(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this rebuttal?")) return;
    setRebuttals((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCampaignId(c.id);
                setShowAddForm(false);
                setEditingId(null);
              }}
              className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                selectedCampaignId === c.id
                  ? "bg-primary text-on-primary font-semibold"
                  : "border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
          }}
          className="px-5 py-2 rounded-sm bg-secondary text-on-secondary text-sm font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Add Rebuttal
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((rebuttal) =>
          editingId === rebuttal.id ? (
            <RebuttalForm
              key={rebuttal.id}
              initialName={rebuttal.name}
              initialDescription={rebuttal.description}
              onSave={(name, desc) => handleEdit(rebuttal.id, name, desc)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <RebuttalCard
              key={rebuttal.id}
              rebuttal={rebuttal}
              usageCount={usageCounts[rebuttal.name] || 0}
              onEdit={() => {
                setEditingId(rebuttal.id);
                setShowAddForm(false);
              }}
              onDelete={() => handleDelete(rebuttal.id)}
            />
          )
        )}
      </div>

      {showAddForm && (
        <div className="mt-4">
          <RebuttalForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
    </div>
  );
}
