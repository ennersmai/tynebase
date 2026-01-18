"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Hash,
  Plus,
  Search,
  Sparkles,
  FileText,
  ArrowRight,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

type Tag = {
  id: string;
  name: string;
  description: string;
  documents: number;
  updatedAt: string;
  trend: "up" | "flat" | "down";
  aiSuggested?: boolean;
};

const mockTags: Tag[] = [
  {
    id: "t1",
    name: "sso",
    description: "Single Sign-On setup, providers, and troubleshooting.",
    documents: 14,
    updatedAt: "Today",
    trend: "up",
    aiSuggested: true,
  },
  {
    id: "t2",
    name: "api",
    description: "Endpoints, authentication, rate limits, and examples.",
    documents: 32,
    updatedAt: "Yesterday",
    trend: "up",
  },
  {
    id: "t3",
    name: "onboarding",
    description: "Guides for new hires, tooling access, and internal processes.",
    documents: 18,
    updatedAt: "3 days ago",
    trend: "flat",
  },
  {
    id: "t4",
    name: "incident",
    description: "Incident workflow, postmortems, runbooks.",
    documents: 9,
    updatedAt: "1 week ago",
    trend: "down",
  },
  {
    id: "t5",
    name: "rbac",
    description: "Roles, permissions, access reviews, and policy patterns.",
    documents: 21,
    updatedAt: "2 days ago",
    trend: "up",
  },
  {
    id: "t6",
    name: "billing",
    description: "Invoices, subscriptions, proration, refunds, and webhooks.",
    documents: 12,
    updatedAt: "5 days ago",
    trend: "flat",
  },
  {
    id: "t7",
    name: "observability",
    description: "Logging, tracing, metrics dashboards, and alerting playbooks.",
    documents: 27,
    updatedAt: "Last week",
    trend: "up",
  },
  {
    id: "t8",
    name: "security",
    description: "Threat model notes, secure defaults, and hardening checklists.",
    documents: 16,
    updatedAt: "1 week ago",
    trend: "flat",
    aiSuggested: true,
  },
  {
    id: "t9",
    name: "performance",
    description: "Caching, query tuning, profiling, and load testing results.",
    documents: 11,
    updatedAt: "2 weeks ago",
    trend: "up",
  },
  {
    id: "t10",
    name: "docs-style",
    description: "Writing guidelines, templates, tone of voice, and examples.",
    documents: 8,
    updatedAt: "3 weeks ago",
    trend: "flat",
  },
  {
    id: "t11",
    name: "integrations",
    description: "Partner APIs, OAuth apps, webhook consumers, and sync jobs.",
    documents: 19,
    updatedAt: "Last month",
    trend: "down",
  },
  {
    id: "t12",
    name: "database",
    description: "Migrations, indexing strategy, backups, and restore drills.",
    documents: 24,
    updatedAt: "Last month",
    trend: "flat",
  },
];

function TrendBadge({ trend }: { trend: Tag["trend"] }) {
  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-[var(--status-success-bg)] text-[var(--status-success)]">
        <TrendingUp className="w-3 h-3" />
        Trending
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-[var(--status-error-bg)] text-[var(--status-error)]">
        Cooling
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-[var(--surface-ground)] text-[var(--dash-text-tertiary)]">
      Stable
    </span>
  );
}

export default function TagsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockTags;
    return mockTags.filter((t) => `${t.name} ${t.description}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto flex min-h-full flex-col px-2 sm:px-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Tags</h1>
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Organize docs with tags. Use AI suggestions to reduce duplicates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/knowledge"
            className="inline-flex items-center gap-2 h-11 px-5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
          >
            <FileText className="w-4 h-4" />
            Browse Docs
          </Link>
          <button className="inline-flex items-center gap-2 h-11 px-6 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4" />
            New Tag
          </button>
        </div>
      </div>

      <div className="h-6" />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)] pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tags..."
            className="w-full h-12 pl-12 pr-4 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all leading-none"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 h-12 px-5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--dash-border-default)] transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="h-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 flex-1 content-start">
        {filtered.map((t) => (
          <Card
            key={t.id}
            className="hover:shadow-lg hover:border-[var(--brand)] transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-[var(--surface-ground)] flex items-center justify-center">
                      <Hash className="w-5 h-5 text-[var(--dash-text-tertiary)]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[var(--dash-text-primary)] truncate">#{t.name}</h3>
                      <p className="text-xs text-[var(--dash-text-muted)]">{t.documents} docs</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--dash-text-tertiary)] mt-3 line-clamp-2">{t.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <TrendBadge trend={t.trend} />
                  {t.aiSuggested && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-[var(--brand)]/10 text-[var(--brand)]">
                      <Sparkles className="w-3 h-3" />
                      AI
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--dash-text-muted)]">Updated {t.updatedAt}</span>
                <Link
                  href="/dashboard/knowledge"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline"
                >
                  View docs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
