"use client";

import { PhoneCall } from "lucide-react";

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-[0_8px_32px_rgba(4,22,39,0.15)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 group">
      <PhoneCall className="w-6 h-6" />
      <span className="absolute right-full mr-4 px-3 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_4px_16px_rgba(4,22,39,0.1)]">
        Enter Call Center
      </span>
    </button>
  );
}
