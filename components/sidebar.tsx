"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  FolderOpen,
  BarChart3,
  Archive,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dossier", icon: FolderOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/counsel", label: "Counsel", icon: Scale },
  { href: "/archives", label: "Archives", icon: Archive },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low flex flex-col z-20">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <Scale className="w-4 h-4 text-on-primary" />
          </div>
          <span className="font-headline text-xl text-primary">
            Juris Dashboard
          </span>
        </div>
        <p className="text-[0.75rem] text-outline uppercase tracking-widest font-medium">
          Premium Legal Workspace
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "text-primary font-bold border-r-2 border-primary bg-surface-container-high/50"
                  : "text-outline hover:bg-surface-container-high/30 hover:translate-x-1"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 bg-surface-container/50">
        <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 px-4 rounded-sm text-sm font-medium flex items-center justify-center gap-2 mb-6 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Case File
        </button>
        <div className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-outline text-xs hover:text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-outline text-xs hover:text-primary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </a>
        </div>
      </div>
    </aside>
  );
}
