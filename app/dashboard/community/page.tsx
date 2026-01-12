"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  Users, Plus, MessageSquare, ThumbsUp, Eye, Pin, Search, TrendingUp,
  CheckCircle2, HelpCircle, Flame, Bell, BookmarkPlus, Lock, Reply,
  MoreHorizontal, Flag, Share2, Award, AtSign, Image as ImageIcon,
  Link2, Code, Bold, Italic, List, Send, Filter, ArrowUp, Clock
} from "lucide-react";

// Forum categories with detailed info
const categories = [
  { id: "all", label: "All Discussions", count: 156, description: "Browse all community discussions" },
  { id: "announcements", label: "Announcements", count: 12, icon: Bell, color: "#ef4444", description: "Official updates and news" },
  { id: "questions", label: "Questions", count: 45, icon: HelpCircle, color: "#3b82f6", description: "Get help from the community" },
  { id: "ideas", label: "Ideas & Feedback", count: 34, icon: TrendingUp, color: "#8b5cf6", description: "Share suggestions and vote" },
  { id: "general", label: "General Discussion", count: 65, icon: MessageSquare, color: "#10b981", description: "Chat about anything" },
];

const discussions = [
  {
    id: 1,
    title: "Welcome to the TyneBase Community!",
    excerpt: "Introduce yourself and let us know what brings you here. We're excited to have you!",
    author: "Sarah Chen",
    avatar: null,
    category: "announcements",
    createdAt: "2 hours ago",
    replies: 24,
    views: 342,
    likes: 56,
    isPinned: true,
    isResolved: false,
    tags: ["welcome", "introduction"],
  },
  {
    id: 2,
    title: "How to set up webhooks for real-time notifications?",
    excerpt: "I'm trying to configure webhooks to get notified when documents are updated. Can someone guide me through the process?",
    author: "John Smith",
    avatar: null,
    category: "questions",
    createdAt: "5 hours ago",
    replies: 8,
    views: 127,
    likes: 12,
    isPinned: false,
    isResolved: true,
    tags: ["webhooks", "integrations"],
  },
  {
    id: 3,
    title: "Feature Request: Dark mode for the editor",
    excerpt: "Would love to see a dedicated dark mode for the document editor. The current theme is great but would be nice to have more contrast options.",
    author: "Emily Davis",
    avatar: null,
    category: "ideas",
    createdAt: "Yesterday",
    replies: 15,
    views: 234,
    likes: 89,
    isPinned: false,
    isResolved: false,
    tags: ["feature-request", "editor", "ui"],
  },
  {
    id: 4,
    title: "Best practices for organizing large knowledge bases",
    excerpt: "As our documentation grows, what are some recommended approaches for keeping everything organized and easily searchable?",
    author: "Mike Johnson",
    avatar: null,
    category: "questions",
    createdAt: "2 days ago",
    replies: 21,
    views: 456,
    likes: 34,
    isPinned: false,
    isResolved: false,
    tags: ["organization", "best-practices"],
  },
  {
    id: 5,
    title: "Monthly Community Roundup - January 2026",
    excerpt: "Here's a summary of all the amazing contributions from our community this month. Thank you all for being part of this journey!",
    author: "TyneBase Team",
    avatar: null,
    category: "announcements",
    createdAt: "3 days ago",
    replies: 7,
    views: 289,
    likes: 45,
    isPinned: true,
    isResolved: false,
    tags: ["roundup", "community"],
  },
];

const trendingTopics = [
  { tag: "api-integration", count: 34 },
  { tag: "ai-features", count: 28 },
  { tag: "templates", count: 22 },
  { tag: "collaboration", count: 19 },
  { tag: "version-history", count: 15 },
];

const topContributors = [
  { name: "Sarah Chen", posts: 45, helpful: 89 },
  { name: "John Smith", posts: 32, helpful: 67 },
  { name: "Emily Davis", posts: 28, helpful: 54 },
  { name: "Mike Johnson", posts: 24, helpful: 41 },
];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "unanswered">("recent");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredDiscussions = discussions.filter((d) => {
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (sortBy === "popular") return b.likes - a.likes;
    if (sortBy === "unanswered") return a.replies - b.replies;
    return 0;
  });

  const stats = [
    { label: "Discussions", value: "156", icon: MessageSquare, color: "#3b82f6" },
    { label: "Resolved", value: "89", icon: CheckCircle2, color: "#10b981" },
    { label: "Members", value: "234", icon: Users, color: "#8b5cf6" },
    { label: "Active Today", value: "12", icon: Flame, color: "#f59e0b" },
  ];

  const getCategoryBadge = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat || !cat.icon) return null;
    const Icon = cat.icon;
    return (
      <span 
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
      >
        <Icon className="w-3 h-3" />
        {cat.label}
      </span>
    );
  };

  return (
    <div className="h-full min-h-0 w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Community Forum</h1>
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Connect with your team, ask questions, and share knowledge
          </p>
        </div>
        <Button variant="primary" size="lg" className="gap-2 px-7" asChild>
          <Link href="/dashboard/community/new">
          <Plus className="w-5 h-5" />
          New Discussion
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--dash-text-primary)]">{stat.value}</p>
              <p className="text-sm text-[var(--dash-text-tertiary)]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-0 self-start">
          {/* Categories */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl">
            <div className="px-4 py-3 border-b border-[var(--dash-border-subtle)]">
              <h3 className="font-semibold text-[var(--dash-text-primary)]">Categories</h3>
            </div>
            <div className="p-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id
                      ? "bg-[var(--brand-primary-muted)] text-[var(--brand)]"
                      : "text-[var(--dash-text-secondary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cat.icon && <cat.icon className="w-4 h-4" />}
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-xs">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 min-h-0 min-w-0">
          {/* Search & Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="px-5"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
                <div className="flex items-center bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg p-1">
                  {(["recent", "popular", "unanswered"] as const).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                        sortBy === sort
                          ? "bg-[var(--brand)] text-white"
                          : "text-[var(--dash-text-secondary)] hover:text-[var(--dash-text-primary)]"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--dash-border-subtle)]">
                  <h3 className="font-semibold text-[var(--dash-text-primary)] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[var(--brand)]" />
                    Trending
                  </h3>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic.tag}
                      className="px-2.5 py-1.5 text-xs bg-[var(--surface-ground)] text-[var(--dash-text-secondary)] rounded-full hover:bg-[var(--brand-primary-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      #{topic.tag}
                      <span className="ml-2 text-[10px] text-[var(--dash-text-muted)]">{topic.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--dash-border-subtle)]">
                  <h3 className="font-semibold text-[var(--dash-text-primary)]">Top Contributors</h3>
                </div>
                <div className="p-4 space-y-3">
                  {topContributors.map((user, index) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--surface-ground)] flex items-center justify-center text-xs font-medium text-[var(--dash-text-muted)]">
                        {index + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary-muted)] flex items-center justify-center text-[var(--brand)] font-semibold text-xs">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--dash-text-primary)] truncate">{user.name}</p>
                        <p className="text-xs text-[var(--dash-text-muted)]">{user.posts} posts · {user.helpful} helpful</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Discussions List */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden flex-1 min-h-0 flex flex-col">
            <div className="px-5 py-3 border-b border-[var(--dash-border-subtle)] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold text-[var(--dash-text-primary)] truncate">Threads</div>
                <div className="text-xs text-[var(--dash-text-muted)]">
                  Showing {sortedDiscussions.length} of {discussions.length}
                </div>
              </div>
              <div className="hidden md:grid grid-cols-[1fr_80px_80px_120px] gap-3 text-xs text-[var(--dash-text-muted)] font-medium">
                <div className="text-right">Replies</div>
                <div className="text-right">Views</div>
                <div className="text-right">Activity</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto dashboard-scroll divide-y divide-[var(--dash-border-subtle)]">
              {sortedDiscussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  href={`/dashboard/community/${discussion.id}`}
                  className="block px-5 py-4 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_80px_120px] gap-4 items-start">
                    <div className="flex gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary-muted)] flex items-center justify-center text-[var(--brand)] font-semibold text-sm flex-shrink-0">
                        {discussion.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {discussion.isPinned && (
                            <Pin className="w-3 h-3 text-[var(--brand)]" />
                          )}
                          {discussion.isResolved && (
                            <CheckCircle2 className="w-4 h-4 text-[var(--status-success)]" />
                          )}
                          {getCategoryBadge(discussion.category)}
                        </div>
                        <h3 className="font-semibold text-[var(--dash-text-primary)] group-hover:text-[var(--brand)] transition-colors truncate">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-[var(--dash-text-tertiary)] line-clamp-2 mt-1">
                          {discussion.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-xs text-[var(--dash-text-muted)]">
                            <span className="font-medium text-[var(--dash-text-secondary)]">{discussion.author}</span>
                            <span className="mx-2">·</span>
                            {discussion.createdAt}
                          </span>
                          <span className="hidden sm:flex items-center gap-1 text-xs text-[var(--dash-text-muted)]">
                            <ThumbsUp className="w-3 h-3" />
                            {discussion.likes}
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {discussion.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 text-xs bg-[var(--surface-ground)] text-[var(--dash-text-muted)] rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-[var(--dash-text-tertiary)] hover:bg-[var(--surface-ground)]"
                          title="Bookmark"
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-end gap-2 text-sm text-[var(--dash-text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[var(--dash-text-muted)]" />
                        {discussion.replies}
                      </span>
                    </div>

                    <div className="hidden md:flex items-center justify-end gap-2 text-sm text-[var(--dash-text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[var(--dash-text-muted)]" />
                        {discussion.views}
                      </span>
                    </div>

                    <div className="hidden md:flex items-center justify-end text-sm text-[var(--dash-text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--dash-text-muted)]" />
                        {discussion.createdAt}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="md" className="px-5" disabled>
              Previous
            </Button>
            <Button variant="primary" size="md" className="px-5">
              1
            </Button>
            <Button variant="outline" size="md" className="px-5">
              2
            </Button>
            <Button variant="outline" size="md" className="px-5">
              3
            </Button>
            <Button variant="outline" size="md" className="px-5">
              Next
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Search discussions"
        description="Search threads, filter by category, and quickly jump to what you need."
        size="lg"
        className="max-w-2xl"
      >
        <div className="space-y-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="Search by title, tag, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[var(--surface-card)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.filter(c => c.id !== "all").map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={
                  "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm transition-colors " +
                  (activeCategory === cat.id
                    ? "border-[var(--brand)] bg-[var(--brand-primary-muted)]"
                    : "border-[var(--dash-border-subtle)] hover:bg-[var(--surface-hover)]")
                }
              >
                <span className="flex items-center gap-2 text-[var(--dash-text-primary)]">
                  {cat.icon && <cat.icon className="w-4 h-4" style={{ color: cat.color }} />}
                  {cat.label}
                </span>
                <span className="text-xs text-[var(--dash-text-muted)]">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-[var(--dash-text-tertiary)]">
              Tip: use the category chips to narrow down results.
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="px-5"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="px-6"
                onClick={() => setIsSearchOpen(false)}
              >
                Show results
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
