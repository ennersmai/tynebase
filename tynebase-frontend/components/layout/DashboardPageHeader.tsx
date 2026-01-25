"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardPageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export function DashboardPageHeader({
  title,
  description,
  left,
  right,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-6",
        className
      )}
    >
      <div className="min-w-0 order-2 sm:order-none">{left}</div>
      <div className="min-w-0 order-1 sm:order-none flex flex-col items-center text-center">
        {title}
        {description}
      </div>
      <div className="min-w-0 order-3 sm:order-none flex justify-center sm:justify-end">
        {right}
      </div>
    </div>
  );
}
