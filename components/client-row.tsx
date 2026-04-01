"use client";

import type { Client } from "@/lib/types";
import { campaigns } from "@/lib/mock-data";
import { Avatar } from "./avatar";

interface Props {
  client: Client;
  onEdit: () => void;
}

export function ClientRow({ client, onEdit }: Props) {
  const campaignNames = campaigns
    .filter((c) => client.campaignAccess.includes(c.id))
    .map((c) => c.name);

  return (
    <div className="flex items-center py-4 px-5 border-b border-surface-container last:border-b-0 hover:bg-surface-container-low/30 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar
          name={client.name}
          size={40}
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-primary truncate">
            {client.name}
          </div>
          <div className="text-xs text-outline truncate">{client.email}</div>
        </div>
      </div>
      <div className="flex gap-1.5 flex-1 flex-wrap">
        {campaignNames.map((name) => (
          <span
            key={name}
            className="text-[11px] px-2.5 py-1 rounded-full bg-primary-fixed/30 text-primary font-medium"
          >
            {name}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            client.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {client.status === "active" ? "Active" : "Pending"}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-sm bg-surface-container text-outline capitalize">
          {client.role}
        </span>
        <button
          onClick={onEdit}
          className="px-3 py-1.5 rounded-sm border border-outline-variant/50 text-xs text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
