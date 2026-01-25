"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export function Checkbox({
  checked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label,
  description,
  className,
}: CheckboxProps) {
  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const checkboxElement = (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded border-2 transition-colors",
        sizeClasses[size],
        checked || indeterminate
          ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
          : "bg-transparent border-[var(--border-default)] hover:border-[var(--border-strong)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {indeterminate ? (
        <Minus className={cn("text-white", iconSizes[size])} />
      ) : checked ? (
        <Check className={cn("text-white", iconSizes[size])} />
      ) : null}
    </button>
  );

  if (label || description) {
    return (
      <div className="flex items-start gap-3">
        {checkboxElement}
        <div className="flex-1">
          {label && (
            <label
              className={cn(
                "text-sm font-medium cursor-pointer",
                disabled ? "text-[var(--text-tertiary)]" : "text-[var(--text-primary)]"
              )}
              onClick={handleClick}
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

  return checkboxElement;
}

interface CheckboxGroupProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  options: { value: string; label: string; description?: string; disabled?: boolean }[];
  className?: string;
}

export function CheckboxGroup({ value, onValueChange, options, className }: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValueChange([...value, optionValue]);
    } else {
      onValueChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          checked={value.includes(option.value)}
          onCheckedChange={(checked) => handleChange(option.value, checked)}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
}
