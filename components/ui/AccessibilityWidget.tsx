"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { Check, Contrast, Moon, Sun, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeChoice = "light" | "dark" | "system";

type ContrastMode = "normal" | "high";

function setDocumentContrast(mode: ContrastMode) {
  if (typeof document === "undefined") return;
  if (mode === "high") {
    document.documentElement.setAttribute("data-contrast", "high");
  } else {
    document.documentElement.removeAttribute("data-contrast");
  }
}

export function AccessibilityWidget() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [contrastMode, setContrastMode] = useState<ContrastMode>("normal");

  const currentTheme = useMemo<ThemeChoice>(() => {
    if (theme === "light" || theme === "dark" || theme === "system") return theme;
    return "system";
  }, [theme]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("contrast-mode") : null;
    const next = saved === "high" ? "high" : "normal";
    setContrastMode(next);
    setDocumentContrast(next);
  }, []);

  useEffect(() => {
    setDocumentContrast(contrastMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("contrast-mode", contrastMode);
    }
  }, [contrastMode]);

  const ThemeButton = ({
    value,
    label,
    icon,
  }: {
    value: ThemeChoice;
    label: string;
    icon: ReactNode;
  }) => {
    const active = currentTheme === value;
    return (
      <button
        onClick={() => setTheme(value)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
          active
            ? "border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)]"
            : "border-[var(--dash-border-subtle)] bg-[var(--surface-card)] text-[var(--dash-text-secondary)] hover:border-[var(--dash-border-default)]"
        )}
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        {active && <Check className="w-4 h-4" />}
      </button>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <>
          <div className="fixed inset-0 z-[59]" onClick={() => setOpen(false)} />
          <div className="absolute bottom-14 right-0 z-[61] w-[320px] rounded-2xl border border-[var(--dash-border-subtle)] bg-[var(--surface-card)] shadow-xl overflow-hidden">
            <div
              className="border-b border-[var(--dash-border-subtle)]"
              style={{ padding: "13px 12px" }}
            >
              <div className="flex items-center gap-2">
                <img src="/accessibility-2-128.ico" alt="Accessibility" className="w-4 h-4" />
                <p className="font-semibold text-[var(--dash-text-primary)]">Accessibility</p>
              </div>
              <p className="text-xs text-[var(--dash-text-tertiary)] mt-1">
                Personalize the UI for your environment.
              </p>
            </div>

            <div className="space-y-4" style={{ padding: "13px 12px" }}>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--dash-text-muted)]">Theme</p>
                <div className="grid grid-cols-1 gap-2">
                  <ThemeButton value="light" label="Light" icon={<Sun className="w-4 h-4" />} />
                  <ThemeButton value="dark" label="Dark" icon={<Moon className="w-4 h-4" />} />
                  <ThemeButton value="system" label="System" icon={<Laptop className="w-4 h-4" />} />
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--dash-border-subtle)] bg-[var(--surface-ground)] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--dash-text-primary)]">High contrast</p>
                    <p className="text-xs text-[var(--dash-text-tertiary)] mt-0.5">
                      Stronger borders and text contrast.
                    </p>
                  </div>
                  <button
                    onClick={() => setContrastMode((prev) => (prev === "high" ? "normal" : "high"))}
                    className={cn(
                      "w-12 h-7 rounded-full transition-colors relative",
                      contrastMode === "high" ? "bg-[var(--brand)]" : "bg-[var(--dash-border-default)]"
                    )}
                    aria-label="Toggle high contrast"
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform",
                        contrastMode === "high" && "translate-x-5"
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-[var(--dash-text-muted)] flex items-center gap-2">
                <Contrast className="w-3.5 h-3.5" />
                Preferences are saved locally on this device.
              </div>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] shadow-lg flex items-center justify-center hover:border-[var(--brand)] transition-colors"
        aria-label="Open accessibility settings"
      >
        <img src="/accessibility-2-128.ico" alt="Accessibility" className="w-8 h-8" />
      </button>
    </div>
  );
}
