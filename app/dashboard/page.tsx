"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTenant } from "@/contexts/TenantContext";
import Link from "next/link";
import { DashboardPageHeader } from "@/components/layout/DashboardPageHeader";
import {
  BookOpen,
  Sparkles,
  Users,
  FileText,
  Plus,
  TrendingUp,
  Eye,
  Clock,
  ArrowRight,
  BarChart3,
  CheckCircle,
  AlertCircle,
  FileQuestion,
} from "lucide-react";

const recentDocuments = [
  { id: 1, title: "Getting Started Guide", state: "published", views: 234, updated: "2 hours ago" },
  { id: 2, title: "API Documentation", state: "draft", views: 0, updated: "5 hours ago" },
  { id: 3, title: "Best Practices for Teams", state: "published", views: 156, updated: "1 day ago" },
  { id: 4, title: "Security Overview", state: "in_review", views: 0, updated: "2 days ago" },
];

const recentActivity = [
  { id: 1, user: "Sarah Chen", action: "commented on", target: "API Documentation", time: "10 min ago" },
  { id: 2, user: "Mike Johnson", action: "published", target: "Getting Started Guide", time: "2 hours ago" },
  { id: 3, user: "Emily Davis", action: "created", target: "New feature request", time: "5 hours ago" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { branding, subdomain } = useTenant();

  const getStateColor = (state: string) => {
    switch (state) {
      case "published": return "bg-[var(--status-success-bg)] text-[var(--status-success)]";
      case "draft": return "bg-[var(--dash-border-subtle)] text-[var(--dash-text-tertiary)]";
      case "in_review": return "bg-[var(--status-warning-bg)] text-[var(--status-warning)]";
      default: return "bg-[var(--dash-border-subtle)] text-[var(--dash-text-tertiary)]";
    }
  };

  // Individual user vs tenant user content
  const isIndividualUser = !subdomain;
  const welcomeTitle = isIndividualUser 
    ? `Welcome back, ${user?.full_name || user?.email?.split('@')[0]}!`
    : `Welcome back to ${branding?.name || 'your workspace'}!`;

  const welcomeSubtitle = isIndividualUser
    ? "Manage your personal knowledge base"
    : "Manage your team's knowledge and documentation";

  // Customize stats based on user type
  const quickStats = isIndividualUser ? [
    { label: "Total Documents", value: "24", change: "+3 this week", icon: BookOpen, color: "var(--brand)" },
    { label: "AI Generations", value: "47", change: "12 remaining", icon: Sparkles, color: "var(--accent-purple)" },
    { label: "Storage Used", value: "2.3GB", change: "5GB free", icon: TrendingUp, color: "var(--accent-blue)" },
    { label: "Content Health", value: "87%", change: "Good", icon: BarChart3, color: "var(--status-success)" },
  ] : [
    { label: "Total Documents", value: "24", change: "+3 this week", icon: BookOpen, color: "var(--brand)" },
    { label: "Team Members", value: "8", change: "+1 this month", icon: Users, color: "var(--accent-blue)" },
    { label: "AI Generations", value: "47", change: "12 remaining", icon: Sparkles, color: "var(--accent-purple)" },
    { label: "Content Health", value: "87%", change: "Good", icon: BarChart3, color: "var(--status-success)" },
  ];

  return (
    <div className="h-full min-h-0 flex flex-col gap-8">
      {/* Welcome Header */}
      <DashboardPageHeader
        title={
          <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">
            {welcomeTitle}
          </h1>
        }
        description={
          <p className="text-sm text-[var(--dash-text-tertiary)] mt-1">{welcomeSubtitle}</p>
        }
        right={
          <Link href="/dashboard/knowledge/new">
            <button className="flex items-center gap-2 h-9 px-5 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white rounded-lg text-sm font-medium transition-all">
              <Plus className="w-4 h-4" />
              New Document
            </button>
          </Link>
        }
      />

      <div className="flex-1 min-h-0 flex flex-col gap-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-7 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--dash-text-tertiary)]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--dash-text-primary)] mt-1">{stat.value}</p>
                  <p className="text-xs text-[var(--dash-text-muted)] mt-1">{stat.change}</p>
                </div>
                <div
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/ai-assistant" className="group">
            <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-7 hover:shadow-md hover:border-[var(--brand)] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-lg bg-[var(--brand-primary-muted)]">
                  <Sparkles className="w-6 h-6 text-[var(--brand)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--dash-text-primary)] group-hover:text-[var(--brand)]">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-[var(--dash-text-tertiary)]">Generate content with AI</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--dash-text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/templates" className="group">
            <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-7 hover:shadow-md hover:border-[var(--accent-purple)] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-lg bg-purple-50">
                  <FileText className="w-6 h-6 text-[var(--accent-purple)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--dash-text-primary)] group-hover:text-[var(--accent-purple)]">
                    Templates
                  </h3>
                  <p className="text-sm text-[var(--dash-text-tertiary)]">Browse template library</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--dash-text-muted)] group-hover:text-[var(--accent-purple)] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/audit" className="group">
            <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-7 hover:shadow-md hover:border-[var(--accent-blue)] transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-lg bg-blue-50">
                  <BarChart3 className="w-6 h-6 text-[var(--accent-blue)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--dash-text-primary)] group-hover:text-[var(--accent-blue)]">
                    Content Audit
                  </h3>
                  <p className="text-sm text-[var(--dash-text-tertiary)]">Analyze content health</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--dash-text-muted)] group-hover:text-[var(--accent-blue)] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl flex flex-col min-h-0">
            <div className="px-6 py-5 border-b border-[var(--dash-border-subtle)] flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[var(--dash-text-primary)]">Recent Documents</h2>
                <p className="text-sm text-[var(--dash-text-tertiary)]">Your latest articles and pages</p>
              </div>
              <Link href="/dashboard/knowledge" className="text-sm text-[var(--brand)] hover:underline">
                View all
              </Link>
            </div>
            <div className="flex-1 min-h-0 overflow-auto divide-y divide-[var(--dash-border-subtle)] dashboard-scroll">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/dashboard/knowledge/${doc.id}`}
                  className="flex items-center gap-4 px-6 py-5 hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--surface-ground)]">
                    <FileText className="w-5 h-5 text-[var(--dash-text-tertiary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--dash-text-primary)] truncate">{doc.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStateColor(doc.state)}`}>
                        {doc.state.replace("_", " ")}
                      </span>
                      <span className="text-xs text-[var(--dash-text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {doc.updated}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--dash-text-muted)]">
                    <Eye className="w-4 h-4" />
                    {doc.views}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl flex flex-col min-h-0">
            <div className="px-6 py-5 border-b border-[var(--dash-border-subtle)]">
              <h2 className="font-semibold text-[var(--dash-text-primary)]">Recent Activity</h2>
              <p className="text-sm text-[var(--dash-text-tertiary)]">Team updates</p>
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-6 space-y-4 dashboard-scroll">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--brand-primary-muted)] flex items-center justify-center text-[var(--brand)] font-semibold text-xs flex-shrink-0">
                    {activity.user.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--dash-text-secondary)]">
                      <span className="font-medium text-[var(--dash-text-primary)]">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium text-[var(--dash-text-primary)]">{activity.target}</span>
                    </p>
                    <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-[var(--dash-border-subtle)]">
              <Link href="/dashboard/community" className="text-sm text-[var(--brand)] hover:underline">
                View all activity
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Health Summary */}
      <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-[var(--dash-text-primary)]">Content Health Summary</h2>
            <p className="text-sm text-[var(--dash-text-tertiary)]">Quick overview of your knowledge base</p>
          </div>
          <Link href="/dashboard/audit" className="text-sm text-[var(--brand)] hover:underline">
            View full audit
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--status-success-bg)]">
            <CheckCircle className="w-5 h-5 text-[var(--status-success)]" />
            <div>
              <p className="text-lg font-bold text-[var(--status-success)]">18</p>
              <p className="text-xs text-[var(--status-success)]">Up to date</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--status-warning-bg)]">
            <AlertCircle className="w-5 h-5 text-[var(--status-warning)]" />
            <div>
              <p className="text-lg font-bold text-[var(--status-warning)]">4</p>
              <p className="text-xs text-[var(--status-warning)]">Needs review</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--status-error-bg)]">
            <Clock className="w-5 h-5 text-[var(--status-error)]" />
            <div>
              <p className="text-lg font-bold text-[var(--status-error)]">2</p>
              <p className="text-xs text-[var(--status-error)]">Outdated</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--status-info-bg)]">
            <FileQuestion className="w-5 h-5 text-[var(--status-info)]" />
            <div>
              <p className="text-lg font-bold text-[var(--status-info)]">3</p>
              <p className="text-xs text-[var(--status-info)]">Missing info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
