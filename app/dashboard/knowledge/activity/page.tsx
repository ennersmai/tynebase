"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Search,
  Filter,
  FileText,
  MessageSquare,
  CheckCircle,
  Upload,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react";

type ActivityType = "created" | "edited" | "commented" | "published" | "imported";

type FeedItem = {
  id: string;
  type: ActivityType;
  actor: string;
  target: string;
  time: string;
  detail?: string;
};

const feed: FeedItem[] = [
  {
    id: "a1",
    type: "edited",
    actor: "Sarah Chen",
    target: "API Authentication",
    time: "8 min ago",
    detail: "Updated OAuth examples and added rate limit notes.",
  },
  {
    id: "a2",
    type: "commented",
    actor: "Mike Johnson",
    target: "Security Best Practices",
    time: "35 min ago",
    detail: "Asked to add SSO provider matrix.",
  },
  {
    id: "a3",
    type: "published",
    actor: "Emily Davis",
    target: "Getting Started Guide",
    time: "2 hours ago",
    detail: "Published v2.1",
  },
  {
    id: "a4",
    type: "imported",
    actor: "System",
    target: "Notion Import",
    time: "Today",
    detail: "Imported 128 items.",
  },
];

function TypeIcon({ type }: { type: ActivityType }) {
  if (type === "commented") return <MessageSquare className="w-4 h-4" />;
  if (type === "published") return <CheckCircle className="w-4 h-4" />;
  if (type === "imported") return <Upload className="w-4 h-4" />;
  return <FileText className="w-4 h-4" />;
}

function TypeColor({ type }: { type: ActivityType }) {
  if (type === "commented") return { fg: "#3b82f6", bg: "#3b82f615" };
  if (type === "published") return { fg: "#10b981", bg: "#10b98115" };
  if (type === "imported") return { fg: "#8b5cf6", bg: "#8b5cf615" };
  if (type === "created") return { fg: "#f59e0b", bg: "#f59e0b15" };
  return { fg: "#6b7280", bg: "#6b728015" };
}

export default function KnowledgeActivityPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return feed;
    return feed.filter((i) => `${i.actor} ${i.target} ${i.detail ?? ""}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-full flex flex-col gap-8 pb-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--dash-text-primary)]" />
            <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Activity</h1>
          </div>
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Track edits, comments, publishes and imports across the knowledge base.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/community"
            className="inline-flex items-center gap-2 h-10 px-6 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            Community
          </Link>
          <button className="inline-flex items-center gap-2 h-10 px-6 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4" />
            New Update
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--dash-text-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activity..."
            className="w-full box-border h-12 pl-12 pr-4 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm leading-[1.2] text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--dash-border-default)] transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden flex-1 min-h-0">
        {filtered.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-medium text-[var(--dash-text-primary)]">No activity found</p>
            <p className="text-sm text-[var(--dash-text-tertiary)] mt-1">Try a different search.</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--dash-border-subtle)]">
            {filtered.map((item) => {
              const colors = TypeColor({ type: item.type });
              return (
                <div key={item.id} className="px-5 py-4 hover:bg-[var(--surface-hover)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <span style={{ color: colors.fg }}>
                        <TypeIcon type={item.type} />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--dash-text-secondary)]">
                        <span className="font-semibold text-[var(--dash-text-primary)]">{item.actor}</span>{" "}
                        {item.type}{" "}
                        <span className="font-semibold text-[var(--dash-text-primary)]">{item.target}</span>
                      </p>
                      {item.detail && (
                        <p className="text-sm text-[var(--dash-text-tertiary)] mt-1">{item.detail}</p>
                      )}
                      <p className="text-xs text-[var(--dash-text-muted)] mt-2 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="text-xs text-[var(--dash-text-muted)]">
        Next: wire this into audit logs, mentions, and per-document history.
      </div>
    </div>
  );
}
