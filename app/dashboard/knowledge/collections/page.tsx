"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Plus,
  Search,
  Users,
  Lock,
  Globe,
  FileText,
  ArrowRight,
  Star,
} from "lucide-react";

type Visibility = "private" | "team" | "public";

type Collection = {
  id: string;
  name: string;
  description: string;
  visibility: Visibility;
  documents: number;
  updatedAt: string;
  starred?: boolean;
};

const mockCollections: Collection[] = [
  {
    id: "c1",
    name: "Onboarding",
    description: "Everything new teammates need in their first week.",
    visibility: "team",
    documents: 18,
    updatedAt: "2 hours ago",
    starred: true,
  },
  {
    id: "c2",
    name: "API Docs",
    description: "Public-facing and internal API reference & examples.",
    visibility: "public",
    documents: 42,
    updatedAt: "Yesterday",
  },
  {
    id: "c3",
    name: "Security & Compliance",
    description: "Policies, SSO setup, incident runbooks, and audits.",
    visibility: "private",
    documents: 11,
    updatedAt: "3 days ago",
  },
];

function VisibilityIcon({ visibility }: { visibility: Visibility }) {
  if (visibility === "private") return <Lock className="w-4 h-4 text-[var(--dash-text-muted)]" />;
  if (visibility === "team") return <Users className="w-4 h-4 text-[var(--status-info)]" />;
  return <Globe className="w-4 h-4 text-[var(--status-success)]" />;
}

export default function CollectionsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockCollections;
    return mockCollections.filter((c) =>
      `${c.name} ${c.description}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-full flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Collections</h1>
            <p className="text-[var(--dash-text-tertiary)] mt-1">
              Curate docs into structured collections with access control.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/knowledge/new"
              className="inline-flex items-center gap-2 h-11 px-5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
            >
              <FileText className="w-4 h-4" />
              New Document
            </Link>
            <button className="inline-flex items-center gap-2 h-11 px-6 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4" />
              New Collection
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections..."
              className="w-full pl-11 pr-4 py-3 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-sm font-medium text-[var(--dash-text-secondary)] hover:border-[var(--dash-border-default)] transition-all">
            <FolderOpen className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--brand)] transition-all h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--dash-text-primary)] truncate">
                      {c.name}
                    </h3>
                    {c.starred && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                  </div>
                  <p className="text-sm text-[var(--dash-text-tertiary)] mt-1 line-clamp-2">
                    {c.description}
                  </p>
                </div>
                <VisibilityIcon visibility={c.visibility} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[var(--surface-ground)] p-4">
                  <p className="text-xs text-[var(--dash-text-muted)]">Documents</p>
                  <p className="text-lg font-semibold text-[var(--dash-text-primary)]">{c.documents}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-ground)] p-4">
                  <p className="text-xs text-[var(--dash-text-muted)]">Updated</p>
                  <p className="text-sm font-medium text-[var(--dash-text-secondary)]">{c.updatedAt}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-[var(--dash-text-muted)] capitalize">{c.visibility}</span>
                <Link
                  href="/dashboard/knowledge"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline"
                >
                  Open
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
