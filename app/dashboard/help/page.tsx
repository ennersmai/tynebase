"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, BookOpen, MessageSquare, Video, Mail, ChevronRight,
  FileText, Sparkles, Users, Shield, Zap, HelpCircle, ExternalLink
} from "lucide-react";

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of TyneBase",
    icon: Zap,
    color: "#10b981",
    articles: [
      { title: "Quick Start Guide", href: "#" },
      { title: "Creating Your First Document", href: "#" },
      { title: "Understanding the Dashboard", href: "#" },
      { title: "Inviting Team Members", href: "#" },
    ],
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Manage your documentation",
    icon: BookOpen,
    color: "#3b82f6",
    articles: [
      { title: "Organizing Articles", href: "#" },
      { title: "Using Categories & Tags", href: "#" },
      { title: "Version History", href: "#" },
      { title: "Publishing & Unpublishing", href: "#" },
    ],
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Generate content with AI",
    icon: Sparkles,
    color: "#8b5cf6",
    articles: [
      { title: "Generating from Prompts", href: "#" },
      { title: "Creating Docs from Videos", href: "#" },
      { title: "Enhancing Existing Content", href: "#" },
      { title: "AI Settings & Providers", href: "#" },
    ],
  },
  {
    id: "community",
    title: "Community & Forums",
    description: "Collaborate with your team",
    icon: Users,
    color: "#f59e0b",
    articles: [
      { title: "Creating Discussions", href: "#" },
      { title: "Moderation Tools", href: "#" },
      { title: "Mentions & Notifications", href: "#" },
      { title: "Best Practices", href: "#" },
    ],
  },
  {
    id: "templates",
    title: "Templates",
    description: "Use and create templates",
    icon: FileText,
    color: "#ef4444",
    articles: [
      { title: "Using Templates", href: "#" },
      { title: "Creating Custom Templates", href: "#" },
      { title: "Sharing Templates", href: "#" },
      { title: "Template Variables", href: "#" },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    description: "Manage your workspace",
    icon: Shield,
    color: "#06b6d4",
    articles: [
      { title: "User Management", href: "#" },
      { title: "Roles & Permissions", href: "#" },
      { title: "Branding & White-Label", href: "#" },
      { title: "Billing & Plans", href: "#" },
    ],
  },
];

const popularArticles = [
  { title: "How to get started with TyneBase", views: "2.3k" },
  { title: "Setting up your first knowledge base", views: "1.8k" },
  { title: "Using AI to generate documentation", views: "1.5k" },
  { title: "Inviting and managing team members", views: "1.2k" },
  { title: "Customizing your workspace branding", views: "980" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--dash-text-primary)]">Help Center</h1>
        <p className="text-[var(--dash-text-tertiary)] mt-2 text-lg">
          Find answers, guides, and support for TyneBase
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--dash-text-muted)]" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 text-lg transition-all"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/dashboard/community"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Ask Community
        </Link>
        <a
          href="mailto:support@tynebase.com"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
        >
          <Mail className="w-4 h-4" />
          Contact Support
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
        >
          <Video className="w-4 h-4" />
          Video Tutorials
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category) => (
          <div
            key={category.id}
            className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden hover:shadow-lg hover:border-[var(--dash-border-default)] transition-all group"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--dash-text-primary)] group-hover:text-[var(--brand)] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--dash-text-tertiary)] mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {category.articles.map((article) => (
                  <Link
                    key={article.title}
                    href={article.href}
                    className="flex items-center justify-between py-2 text-sm text-[var(--dash-text-secondary)] hover:text-[var(--brand)] transition-colors"
                  >
                    <span>{article.title}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--dash-border-subtle)]">
          <h2 className="font-semibold text-[var(--dash-text-primary)] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--brand)]" />
            Popular Articles
          </h2>
        </div>
        <div className="divide-y divide-[var(--dash-border-subtle)]">
          {popularArticles.map((article, index) => (
            <Link
              key={article.title}
              href="#"
              className="flex items-center justify-between px-6 py-4 hover:bg-[var(--surface-hover)] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[var(--surface-ground)] flex items-center justify-center text-sm font-medium text-[var(--dash-text-tertiary)]">
                  {index + 1}
                </span>
                <span className="text-[var(--dash-text-primary)] group-hover:text-[var(--brand)] transition-colors">
                  {article.title}
                </span>
              </div>
              <span className="text-sm text-[var(--dash-text-muted)]">{article.views} views</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Still need help?</h2>
        <p className="text-white/80 mt-2">
          Our support team is here to assist you with any questions or issues.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <a
            href="mailto:support@tynebase.com"
            className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--brand)] rounded-xl font-semibold hover:bg-white/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
          <Link
            href="/dashboard/community"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Community Forum
          </Link>
        </div>
      </div>
    </div>
  );
}
