"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  Database,
  FileSearch,
  HeartPulse,
  Layers,
  Tags,
  Download,
  Sparkles,
  BarChart3,
  FileText,
  Settings,
  UserCog,
  Palette,
  LayoutDashboard,
  MessageSquare,
  Activity,
  FolderTree,
  FileEdit,
  Video,
  Wand2,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  badge?: number | string;
  roles?: string[];
}

const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "#3b82f6",
  },
];

const knowledgeNavigation: NavItem[] = [
  {
    id: "knowledge",
    label: "All Articles",
    icon: BookOpen,
    href: "/dashboard/knowledge",
    color: "#8b5cf6",
  },
  {
    id: "categories",
    label: "Categories",
    icon: FolderTree,
    href: "/dashboard/knowledge/categories",
    color: "#06b6d4",
  },
  {
    id: "collections",
    label: "Collections",
    icon: Layers,
    href: "/dashboard/knowledge/collections",
    color: "#3b82f6",
  },
  {
    id: "tags",
    label: "Tags",
    icon: Tags,
    href: "/dashboard/knowledge/tags",
    color: "#ec4899",
  },
  {
    id: "imports",
    label: "Imports",
    icon: Download,
    href: "/dashboard/knowledge/imports",
    color: "#10b981",
  },
  {
    id: "activity",
    label: "Activity",
    icon: Activity,
    href: "/dashboard/knowledge/activity",
    color: "#f59e0b",
  },
  {
    id: "drafts",
    label: "My Drafts",
    icon: FileEdit,
    href: "/dashboard/knowledge/drafts",
    color: "#f59e0b",
  },
];

const sourcesNavigation: NavItem[] = [
  {
    id: "sources",
    label: "Sources",
    icon: Database,
    href: "/dashboard/sources",
    color: "#0ea5e9",
  },
  {
    id: "sources-normalized",
    label: "Normalized Markdown",
    icon: FileSearch,
    href: "/dashboard/sources/normalized",
    color: "#8b5cf6",
  },
  {
    id: "sources-query",
    label: "Query Workspace",
    icon: Sparkles,
    href: "/dashboard/sources/query",
    color: "#ec4899",
  },
  {
    id: "sources-health",
    label: "Index Health",
    icon: HeartPulse,
    href: "/dashboard/sources/health",
    color: "#10b981",
  },
];

const aiNavigation: NavItem[] = [
  {
    id: "ai-prompt",
    label: "From Prompt",
    icon: Sparkles,
    href: "/dashboard/ai-assistant",
    color: "#ec4899",
  },
  {
    id: "ai-video",
    label: "From Video",
    icon: Video,
    href: "/dashboard/ai-assistant/video",
    color: "#ef4444",
  },
  {
    id: "ai-enhance",
    label: "Enhance",
    icon: Wand2,
    href: "/dashboard/ai-assistant/enhance",
    color: "#8b5cf6",
  },
];

const toolsNavigation: NavItem[] = [
  {
    id: "audit",
    label: "Content Audit",
    icon: BarChart3,
    href: "/dashboard/audit",
    color: "#10b981",
  },
  {
    id: "community",
    label: "Community",
    icon: MessageSquare,
    href: "/dashboard/community",
    color: "#3b82f6",
    badge: 3,
  },
  {
    id: "templates",
    label: "Templates",
    icon: FileText,
    href: "/dashboard/templates",
    color: "#f97316",
  },
];

const adminNavigation: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "#6b7280",
  },
  {
    id: "users",
    label: "Users & Teams",
    icon: UserCog,
    href: "/dashboard/users",
    color: "#8b5cf6",
    roles: ["admin", "super_admin"],
  },
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
    href: "/dashboard/settings/branding",
    color: "#ec4899",
    roles: ["admin", "super_admin"],
  },
  {
    id: "audit-logs",
    label: "Activity Log",
    icon: Activity,
    href: "/dashboard/settings/audit-logs",
    color: "#06b6d4",
    roles: ["admin", "super_admin"],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const hasAccess = (item: NavItem) => {
    if (!item.roles) return true;
    return user?.role && item.roles.includes(user.role);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          active
            ? "bg-[var(--brand)]/10 text-[var(--brand)]"
            : "text-[var(--dash-text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--dash-text-primary)]"
        )}
      >
        <span 
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${item.color}15` }}
        >
          <span style={{ color: item.color }}>
            <Icon className="w-5 h-5" />
          </span>
        </span>
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[var(--brand)] text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[11px] font-semibold text-[var(--dash-text-muted)]">
      {children}
    </p>
  );

  return (
    <aside className="h-screen sticky top-0 bg-[var(--surface-card)] border-r border-[var(--dash-border-subtle)] flex flex-col">
      {/* Logo Header */}
      <div className="h-16 flex items-center pr-2">
        <div className="w-5" />
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="nav-logo-glow-dash">
            <Image 
              src="/logo.png" 
              alt="TyneBase" 
              width={34} 
              height={34} 
              className="logo-image"
              style={{ 
                minWidth: '34px', 
                maxWidth: '34px', 
                height: 'auto',
                display: 'block'
              }} 
            />
          </span>
          <span className="shine-text-dash text-xl font-bold">
            TyneBase
          </span>
        </Link>
      </div>

      {/* Create Button */}
      <div className="px-8 pt-2 pb-4" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-7 pb-10 dashboard-scroll flex flex-col">
        <div className="space-y-8">
          {/* Main */}
          <div className="space-y-2">
            {mainNavigation.filter(hasAccess).map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>

          {/* Knowledge Base */}
          <div>
            <SectionLabel>Knowledge Base</SectionLabel>
            <div className="mt-3 space-y-2">
              {knowledgeNavigation.filter(hasAccess).map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Knowledge Sources (RAG) */}
          <div>
            <SectionLabel>Knowledge Sources (RAG)</SectionLabel>
            <div className="mt-3 space-y-2">
              {sourcesNavigation.filter(hasAccess).map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* AI Assistant */}
          <div>
            <SectionLabel>AI Assistant</SectionLabel>
            <div className="mt-3 space-y-2">
              {aiNavigation.filter(hasAccess).map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <SectionLabel>Tools</SectionLabel>
            <div className="mt-3 space-y-2">
              {toolsNavigation.filter(hasAccess).map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Push Admin toward bottom so links aren't bunched in the middle */}
        <div className="mt-auto pt-10">
          <div className="h-px bg-[var(--dash-border-subtle)] mb-7" />
          <SectionLabel>Admin</SectionLabel>
          <div className="mt-3 space-y-2">
            {adminNavigation.filter(hasAccess).map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
