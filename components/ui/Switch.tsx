"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  description?: string;
}

const sizeClasses = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    translate: "translate-x-4",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    translate: "translate-x-5",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-6 h-6",
    translate: "translate-x-7",
  },
};

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
  label,
  description,
}: SwitchProps) {
  const sizes = sizeClasses[size];

  const toggle = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const switchElement = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
        checked ? "bg-[var(--brand-primary)]" : "bg-[var(--border-default)]",
        disabled && "opacity-50 cursor-not-allowed",
        sizes.track,
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out",
          checked ? sizes.translate : "translate-x-0.5",
          sizes.thumb
        )}
        style={{ marginTop: "2px" }}
      />
    </button>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {switchElement}
        <div className="flex-1">
          {label && (
            <label
              className={cn(
                "text-sm font-medium cursor-pointer",
                disabled ? "text-[var(--text-tertiary)]" : "text-[var(--text-primary)]"
              )}
              onClick={toggle}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-[var(--text-tertiary)]">{description}</p>
          )}
        </div>
      </div>
    );
  }

  return switchElement;
}
