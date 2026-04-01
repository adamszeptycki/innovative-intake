"use client";

import { useState } from "react";

interface Props {
  initialName?: string;
  initialDescription?: string;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export function RebuttalForm({
  initialName = "",
  initialDescription = "",
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onSave(name.trim(), description.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-surface-container-lowest rounded-sm border-2 border-dashed border-outline-variant/50"
    >
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cost Clarity"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Description / Script
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="The talking points or strategy for handling this objection..."
            rows={3}
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary resize-vertical font-body"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-sm border border-outline-variant/50 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-sm bg-primary text-on-primary text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Save Rebuttal
          </button>
        </div>
      </div>
    </form>
  );
}
