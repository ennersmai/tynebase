"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  Download,
  Search,
  FileText,
  User,
  Settings,
  Trash2,
  Edit3,
  Plus,
  Eye,
  LogIn,
  LogOut,
  Key,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const activityTypes = [
  { id: "all", label: "All Activity", icon: Activity },
  { id: "document", label: "Documents", icon: FileText },
  { id: "user", label: "Users", icon: User },
  { id: "auth", label: "Authentication", icon: Key },
  { id: "settings", label: "Settings", icon: Settings },
];

const auditLogs = [
  {
    id: 1,
    action: "document.published",
    actor: { name: "Sarah Chen", email: "sarah@company.com", avatar: "SC" },
    target: "Getting Started Guide",
    timestamp: "2026-01-11T14:32:00Z",
    ip: "192.168.1.1",
    type: "document",
    details: { version: 3, previousStatus: "draft" }
  },
  {
    id: 2,
    action: "user.invited",
    actor: { name: "John Smith", email: "john@company.com", avatar: "JS" },
    target: "mike@company.com",
    timestamp: "2026-01-11T13:15:00Z",
    ip: "192.168.1.2",
    type: "user",
    details: { role: "contributor" }
  },
  {
    id: 3,
    action: "auth.login",
    actor: { name: "Emily Davis", email: "emily@company.com", avatar: "ED" },
    target: null,
    timestamp: "2026-01-11T12:45:00Z",
    ip: "192.168.1.3",
    type: "auth",
    details: { method: "sso", provider: "google" }
  },
  {
    id: 4,
    action: "document.deleted",
    actor: { name: "Sarah Chen", email: "sarah@company.com", avatar: "SC" },
    target: "Old FAQ Page",
    timestamp: "2026-01-11T11:20:00Z",
    ip: "192.168.1.1",
    type: "document",
    details: { permanently: false }
  },
  {
    id: 5,
    action: "settings.updated",
    actor: { name: "John Smith", email: "john@company.com", avatar: "JS" },
    target: "Workspace branding",
    timestamp: "2026-01-11T10:05:00Z",
    ip: "192.168.1.2",
    type: "settings",
    details: { field: "logo" }
  },
  {
    id: 6,
    action: "user.role_changed",
    actor: { name: "Sarah Chen", email: "sarah@company.com", avatar: "SC" },
    target: "mike@company.com",
    timestamp: "2026-01-10T16:30:00Z",
    ip: "192.168.1.1",
    type: "user",
    details: { from: "viewer", to: "contributor" }
  },
  {
    id: 7,
    action: "document.created",
    actor: { name: "Mike Johnson", email: "mike@company.com", avatar: "MJ" },
    target: "API Integration Guide",
    timestamp: "2026-01-10T15:00:00Z",
    ip: "192.168.1.4",
    type: "document",
    details: { template: "API Documentation" }
  },
  {
    id: 8,
    action: "auth.logout",
    actor: { name: "Emily Davis", email: "emily@company.com", avatar: "ED" },
    target: null,
    timestamp: "2026-01-10T14:30:00Z",
    ip: "192.168.1.3",
    type: "auth",
    details: {}
  },
];

const getActionIcon = (action: string) => {
  if (action.includes("created") || action.includes("invited")) return Plus;
  if (action.includes("deleted")) return Trash2;
  if (action.includes("updated") || action.includes("published") || action.includes("role_changed")) return Edit3;
  if (action.includes("login")) return LogIn;
  if (action.includes("logout")) return LogOut;
  if (action.includes("viewed")) return Eye;
  return Activity;
};

const getActionColor = (action: string) => {
  if (action.includes("created") || action.includes("invited") || action.includes("login")) return "brand";
  if (action.includes("deleted") || action.includes("logout")) return "red";
  if (action.includes("updated") || action.includes("published")) return "brand";
  return "brand";
};

const formatAction = (action: string) => {
  return action
    .split(".")
    .pop()
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase()) || action;
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export default function AuditLogsPage() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesType = activeType === "all" || log.type === activeType;
    const matchesSearch =
      log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.target?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="h-full w-full min-h-0 flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Audit Logs</h1>
          <p className="text-[var(--text-tertiary)] mt-1">Track all activity in your workspace</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative w-full lg:flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search by user, action, or target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-ground)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 ${activeType === type.id
                      ? "bg-[var(--brand-primary)] text-white"
                      : "bg-[var(--surface-ground)] text-[var(--text-secondary)] hover:bg-[var(--surface-card)]"
                    }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="flex-1 min-h-0">
        <CardContent className="p-0 flex flex-col min-h-0">
          <div className="divide-y divide-[var(--border-subtle)] overflow-auto">
            {filteredLogs.map((log) => {
              const ActionIcon = getActionIcon(log.action);
              const actionColor = getActionColor(log.action);

              return (
                <div key={log.id} className="p-5 hover:bg-[var(--surface-ground)] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-start gap-4">
                      {/* Action Icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${actionColor === "red" ? "bg-red-500/10 text-red-500" :
                          "bg-[var(--brand)]/10 text-[var(--brand)]"
                        }`}>
                        <ActionIcon className="w-5 h-5" />
                      </div>

                      {/* Mobile Metadata (Top Right) -> Hidden on Desktop */}
                      <div className="text-right flex-shrink-0 sm:hidden ml-auto">
                        <p className="text-xs text-[var(--text-secondary)]">
                          {formatTimestamp(log.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pl-14 sm:pl-0 -mt-8 sm:mt-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-[var(--text-primary)]">
                          {log.actor.name}
                        </span>
                        <span className="text-[var(--text-secondary)]">
                          {formatAction(log.action).toLowerCase()}
                        </span>
                        {log.target && (
                          <span className="font-medium text-[var(--text-primary)]">
                            {log.target}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      {Object.keys(log.details).length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[var(--text-tertiary)]">
                          {Object.entries(log.details).map(([key, value]) => (
                            <span key={key} className="flex items-center gap-1">
                              <span className="capitalize">{key}:</span>
                              <span className="font-medium">{String(value)}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Mobile IP */}
                      <p className="text-xs text-[var(--text-tertiary)] sm:hidden mt-2">
                        IP: {log.ip}
                      </p>
                    </div>

                    {/* Desktop Metadata */}
                    <div className="text-right flex-shrink-0 hidden sm:block">
                      <p className="text-sm text-[var(--text-secondary)]">
                        {formatTimestamp(log.timestamp)}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        IP: {log.ip}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-tertiary)]">
          Showing {filteredLogs.length} of {auditLogs.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="px-3" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            2
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            3
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Retention Notice */}
      <Card className="bg-[var(--surface-ground)] border-[var(--border-subtle)]">
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-[var(--text-tertiary)]" />
            <div className="flex-1 sm:hidden">
              <p className="text-sm text-[var(--text-secondary)]">
                Audit logs are retained for <span className="font-medium">90 days</span> on your current plan.
              </p>
            </div>
          </div>
          <div className="hidden sm:block flex-1">
            <p className="text-sm text-[var(--text-secondary)]">
              Audit logs are retained for <span className="font-medium">90 days</span> on your current plan.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-sm text-[var(--brand-primary)] w-full sm:w-auto justify-start sm:justify-center pl-10 sm:pl-4">
            Upgrade for longer retention
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
