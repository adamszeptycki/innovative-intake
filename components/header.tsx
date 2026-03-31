"use client";

import { Search, Bell, Settings } from "lucide-react";
import { Avatar } from "./avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center w-full px-8 py-4 bg-surface-container-low/50 bg-gradient-to-b from-surface-container-high/50 to-transparent">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-headline italic text-primary">
          The Editorial Juris
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline">
            <Search className="w-4 h-4" />
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/15 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest w-64 transition-all font-body"
            placeholder="Search dossier..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-outline hover:text-on-surface-variant transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-outline hover:text-on-surface-variant transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <Avatar name="James Crawford" size={32} />
        </div>
      </div>
    </header>
  );
}
