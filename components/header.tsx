"use client";

import { Bell, Settings } from "lucide-react";
import { Avatar } from "./avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center w-full px-8 py-4 bg-gradient-to-b from-surface-container-high/50 to-transparent">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-headline font-semibold text-primary">
          The Editorial Juris
        </h1>
      </div>
      <div className="flex items-center gap-6">
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
