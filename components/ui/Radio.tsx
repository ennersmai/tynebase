"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    outer: "w-4 h-4",
    inner: "w-2 h-2",
  },
  md: {
    outer: "w-5 h-5",
    inner: "w-2.5 h-2.5",
  },
  lg: {
    outer: "w-6 h-6",
    inner: "w-3 h-3",
  },
};

export function RadioGroup({
  value,
  onValueChange,
  options,
  orientation = "vertical",
  size = "md",
  className,
}: RadioGroupProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        orientation === "horizontal" ? "flex items-center gap-6" : "space-y-3",
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-start gap-3 cursor-pointer",
            option.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <button
            type="button"
            role="radio"
            aria-checked={value === option.value}
            disabled={option.disabled}
            onClick={() => !option.disabled && onValueChange(option.value)}
            className={cn(
              "flex items-center justify-center rounded-full border-2 transition-colors flex-shrink-0",
              sizes.outer,
              value === option.value
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]"
                : "border-[var(--border-default)] hover:border-[var(--border-strong)] bg-transparent"
            )}
          >
            {value === option.value && (
              <span className={cn("rounded-full bg-white", sizes.inner)} />
            )}
          </button>
          <div className="flex-1">
            <span
              className={cn(
                "text-sm font-medium",
                option.disabled
                  ? "text-[var(--text-tertiary)]"
                  : "text-[var(--text-primary)]"
              )}
            >
              {option.label}
            </span>
            {option.description && (
              <p className="text-sm text-[var(--text-tertiary)]">
                {option.description}
              </p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

interface RadioCardGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: (RadioOption & { icon?: React.ReactNode })[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function RadioCardGroup({
  value,
  onValueChange,
  options,
  columns = 2,
  className,
}: RadioCardGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3", gridCols[columns], className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={option.disabled}
          onClick={() => !option.disabled && onValueChange(option.value)}
          className={cn(
            "flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
            value === option.value
              ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
              : "border-[var(--border-subtle)] hover:border-[var(--border-default)]",
            option.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {option.icon && (
            <div
              className={cn(
                "mb-3",
                value === option.value
                  ? "text-[var(--brand-primary)]"
                  : "text-[var(--text-secondary)]"
              )}
            >
              {option.icon}
            </div>
          )}
          <span className="font-medium text-[var(--text-primary)]">
            {option.label}
          </span>
          {option.description && (
            <span className="text-sm text-[var(--text-tertiary)] mt-1">
              {option.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
