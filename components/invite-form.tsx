"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { campaigns } from "@/lib/mock-data";
import { CampaignMultiSelect } from "./campaign-multi-select";

interface Props {
  initial?: Client;
  onSave: (data: { name: string; email: string; role: "admin" | "viewer"; campaignAccess: string[] }) => void;
  onCancel: () => void;
}

export function InviteForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<"admin" | "viewer">(initial?.role ?? "viewer");
  const [campaignAccess, setCampaignAccess] = useState<string[]>(
    initial?.campaignAccess ?? []
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || campaignAccess.length === 0) return;
    onSave({ name: name.trim(), email: email.trim(), role, campaignAccess });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-surface-container-lowest rounded-sm border-2 border-dashed border-outline-variant/50"
    >
      <h3 className="text-sm font-semibold text-primary mb-4">
        {initial ? "Edit Client" : "Invite Client"}
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Smith"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@lawfirm.com"
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
            className="mt-1 block w-full px-3.5 py-2.5 border border-outline-variant/50 rounded-sm text-sm bg-surface-container-lowest focus:outline-none focus:border-primary"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Campaign Access
          </label>
          <div className="mt-1">
            <CampaignMultiSelect
              campaigns={campaigns}
              selected={campaignAccess}
              onChange={setCampaignAccess}
            />
          </div>
        </div>
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
          {initial ? "Save Changes" : "Send Invite"}
        </button>
      </div>
    </form>
  );
}
