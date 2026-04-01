"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { initialClients } from "@/lib/mock-data";
import { ClientRow } from "./client-row";
import { InviteForm } from "./invite-form";

export function TeamTab() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleInvite(data: {
    name: string;
    email: string;
    role: "admin" | "viewer";
    campaignAccess: string[];
  }) {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      ...data,
      invitedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setClients((prev) => [...prev, newClient]);
    setShowInviteForm(false);
  }

  function handleEdit(
    id: string,
    data: {
      name: string;
      email: string;
      role: "admin" | "viewer";
      campaignAccess: string[];
    }
  ) {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
    setEditingId(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="font-headline text-lg font-semibold text-primary">
            Team Members
          </h2>
          <p className="text-sm text-outline mt-0.5">
            {clients.length} clients invited
          </p>
        </div>
        <button
          onClick={() => {
            setShowInviteForm(true);
            setEditingId(null);
          }}
          className="px-5 py-2 rounded-sm bg-secondary text-on-secondary text-sm font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Invite Client
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {clients.map((client) =>
          editingId === client.id ? (
            <div key={client.id} className="p-4">
              <InviteForm
                initial={client}
                onSave={(data) => handleEdit(client.id, data)}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <ClientRow
              key={client.id}
              client={client}
              onEdit={() => {
                setEditingId(client.id);
                setShowInviteForm(false);
              }}
            />
          )
        )}
      </div>

      {showInviteForm && (
        <div className="mt-4">
          <InviteForm
            onSave={handleInvite}
            onCancel={() => setShowInviteForm(false)}
          />
        </div>
      )}
    </div>
  );
}
