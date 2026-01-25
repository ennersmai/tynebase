"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

interface AvatarGroupItem {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs -ml-2 first:ml-0",
  md: "h-9 w-9 text-sm -ml-3 first:ml-0",
  lg: "h-11 w-11 text-base -ml-3 first:ml-0",
};

const ringClasses = {
  sm: "ring-2",
  md: "ring-2",
  lg: "ring-3",
};

export function AvatarGroup({ avatars, max = 4, size = "md", className }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            "relative rounded-full ring-[var(--surface-card)]",
            sizeClasses[size],
            ringClasses[size]
          )}
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            className="w-full h-full"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-[var(--surface-ground)] text-[var(--text-secondary)] font-medium ring-[var(--surface-card)]",
            sizeClasses[size],
            ringClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
