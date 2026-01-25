"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

interface AlertProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  default: {
    container: "bg-[var(--surface-ground)] border-[var(--border-subtle)]",
    icon: "text-[var(--text-secondary)]",
    title: "text-[var(--text-primary)]",
    content: "text-[var(--text-secondary)]",
    defaultIcon: Info,
  },
  success: {
    container: "bg-green-500/10 border-green-500/20",
    icon: "text-green-500",
    title: "text-green-600",
    content: "text-green-600/80",
    defaultIcon: CheckCircle2,
  },
  warning: {
    container: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-500",
    title: "text-amber-600",
    content: "text-amber-600/80",
    defaultIcon: AlertTriangle,
  },
  error: {
    container: "bg-red-500/10 border-red-500/20",
    icon: "text-red-500",
    title: "text-red-600",
    content: "text-red-600/80",
    defaultIcon: AlertCircle,
  },
  info: {
    container: "bg-blue-500/10 border-blue-500/20",
    icon: "text-blue-500",
    title: "text-blue-600",
    content: "text-blue-600/80",
    defaultIcon: Info,
  },
};

export function Alert({
  variant = "default",
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const styles = variantStyles[variant];
  const IconComponent = styles.defaultIcon;

  return (
    <div
      className={cn(
        "relative flex gap-3 p-4 rounded-lg border",
        styles.container,
        className
      )}
      role="alert"
    >
      <div className={cn("flex-shrink-0", styles.icon)}>
        {icon || <IconComponent className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className={cn("font-medium mb-1", styles.title)}>{title}</h5>
        )}
        <div className={cn("text-sm", styles.content)}>{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            "flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors",
            styles.icon
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDescription({ children, className }: AlertDescriptionProps) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}
