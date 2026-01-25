import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--brand-primary)] text-white",
        secondary: "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
        success: "bg-[var(--status-success-bg)] text-[var(--status-success)] border border-[var(--status-success)]",
        warning: "bg-[var(--status-warning-bg)] text-[var(--status-warning)] border border-[var(--status-warning)]",
        error: "bg-[var(--status-error-bg)] text-[var(--status-error)] border border-[var(--status-error)]",
        info: "bg-[var(--status-info-bg)] text-[var(--status-info)] border border-[var(--status-info)]",
        outline: "text-[var(--text-primary)] border-2 border-[var(--border-strong)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
