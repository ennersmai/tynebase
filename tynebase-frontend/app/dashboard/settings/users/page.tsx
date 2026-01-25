"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { UserPlus, Shield, Crown, MoreHorizontal, Mail, Search } from "lucide-react";
import { useState } from "react";

const roles = [
  { id: "admin", label: "Admin", description: "Full access, user management, settings, publishing", color: "#f97316" },
  { id: "editor", label: "Editor", description: "Create, edit, publish content, moderate community", color: "#3b82f6" },
  { id: "contributor", label: "Contributor", description: "Create and edit own content", color: "#10b981" },
  { id: "viewer", label: "View Only", description: "Read-only access to published content", color: "#6b7280" },
];

const mockUsers = [
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "editor", status: "active", lastActive: "2 hours ago" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "contributor", status: "active", lastActive: "1 day ago" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "viewer", status: "pending", lastActive: "Never" },
];

export default function UsersPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const getRoleColor = (role: string) => {
    const found = roles.find(r => r.id === role);
    return found?.color || "#6b7280";
  };

  return (
    <div className="w-full min-h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Users</h1>
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Manage team members and permissions
          </p>
        </div>
        <Button variant="primary">
          <UserPlus className="w-4 h-4" />
          Invite User
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
        />
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader className="border-b border-[var(--dash-border-subtle)] pb-4">
          <CardTitle className="text-base font-semibold">Team Members</CardTitle>
          <CardDescription>People who have access to this workspace</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--dash-border-subtle)]">
            {/* Current User */}
            <div className="px-6 py-4 flex items-center justify-between bg-[var(--brand-primary-muted)]/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--brand)] flex items-center justify-center text-white font-semibold">
                  {user?.full_name?.split(" ").map(n => n[0]).join("") || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--dash-text-primary)]">{user?.full_name || "You"}</p>
                    <span className="px-2 py-0.5 text-xs font-medium bg-[var(--status-info-bg)] text-[var(--status-info)] rounded-full">You</span>
                  </div>
                  <p className="text-sm text-[var(--dash-text-muted)]">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1" style={{ backgroundColor: `${getRoleColor(user?.role || "admin")}15`, color: getRoleColor(user?.role || "admin") }}>
                  <Crown className="w-3 h-3" />
                  {user?.role || "Admin"}
                </span>
              </div>
            </div>

            {/* Other Users */}
            {mockUsers.map((member) => (
              <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-ground)] flex items-center justify-center text-[var(--dash-text-tertiary)] font-semibold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-[var(--dash-text-primary)]">{member.name}</p>
                      {member.status === "pending" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[var(--status-warning-bg)] text-[var(--status-warning)] rounded-full">Pending</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--dash-text-muted)]">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--dash-text-muted)]">{member.lastActive}</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full capitalize" style={{ backgroundColor: `${getRoleColor(member.role)}15`, color: getRoleColor(member.role) }}>
                    {member.role}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-[var(--surface-ground)] text-[var(--dash-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader className="border-b border-[var(--dash-border-subtle)] pb-4">
          <CardTitle className="text-base font-semibold">Role Permissions</CardTitle>
          <CardDescription>Overview of role capabilities</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="hover:border-[var(--brand)] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${role.color}15` }}>
                      <Shield className="w-4 h-4" style={{ color: role.color }} />
                    </div>
                    <span className="font-medium text-[var(--dash-text-primary)]">{role.label}</span>
                  </div>
                  <p className="text-sm text-[var(--dash-text-muted)]">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Section */}
      <div className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Invite your team</h3>
            <p className="text-white/80 text-sm">Collaborate with your team on your knowledge base.</p>
          </div>
          <button className="px-4 py-2 bg-white text-[var(--brand)] rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
}
