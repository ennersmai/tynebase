"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="dashboard-shell h-screen w-full overflow-hidden bg-[var(--surface-ground)]">
      <div className="h-full w-full grid grid-cols-[240px_13px_1fr]">
        <DashboardSidebar />

        <div aria-hidden="true" />

        <div className="min-w-0 flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0">
            <DashboardHeader onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          </div>

          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <main
              className={cn(
                "flex-1 min-h-0 min-w-0 overflow-auto px-8 py-8 sm:px-10 sm:py-10 lg:px-12",
                className
              )}
            >
              <div className="w-full max-w-none min-h-0 flex flex-col">
                <div className="flex-1 min-h-0 min-w-0 min-h-full">
                  {children}
                </div>
              </div>
            </main>

            <footer className="flex-shrink-0 border-t border-[var(--dash-border-subtle)] bg-[var(--surface-card)] px-8 py-3">
              <div className="flex items-center justify-between text-xs text-[var(--dash-text-muted)]">
                <span>© 2024 TyneBase. All rights reserved.</span>
                <div className="flex items-center gap-6">
                  <Link href="/dashboard/help" className="hover:text-[var(--dash-text-secondary)] transition-colors">Help</Link>
                  <Link href="/privacy" className="hover:text-[var(--dash-text-secondary)] transition-colors">Privacy</Link>
                  <Link href="/terms" className="hover:text-[var(--dash-text-secondary)] transition-colors">Terms</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}
