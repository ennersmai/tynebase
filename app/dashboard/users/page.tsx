"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal, ModalFooter } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal,
  Mail,
  Shield,
  UserCog,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Send
} from "lucide-react";

// Mock team data
const teamMembers = [
  { 
    id: 1, 
    name: "Daniel G",
    email: "support@tynebase.com", 
    role: "SEO", 
    status: "active",
    avatar: null,
    lastActive: "Just now",
    documents: 45,
    joinedAt: "Jan 2024"
  },
  { 
    id: 2, 
    name: "Mai", 
    email: "ennersmai@gmail.com", 
    role: "CEO", 
    status: "active",
    avatar: null,
    lastActive: "2 hours ago",
    documents: 28,
    joinedAt: "Mar 2024"
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    email: "emily@company.com", 
    role: "Contributor", 
    status: "active",
    avatar: null,
    lastActive: "Yesterday",
    documents: 12,
    joinedAt: "Jun 2024"
  },
  { 
    id: 4, 
    name: "Mike Johnson", 
    email: "mike@company.com", 
    role: "Viewer", 
    status: "active",
    avatar: null,
    lastActive: "3 days ago",
    documents: 0,
    joinedAt: "Sep 2024"
  },
  { 
    id: 5, 
    name: "Lisa Wang", 
    email: "lisa@company.com", 
    role: "Editor", 
    status: "pending",
    avatar: null,
    lastActive: "Never",
    documents: 0,
    joinedAt: "Invited"
  },
];

const pendingInvites = [
  { id: 1, email: "alex@company.com", role: "Contributor", invitedAt: "2 days ago", invitedBy: "Sarah Chen" },
  { id: 2, email: "jordan@company.com", role: "Viewer", invitedAt: "5 days ago", invitedBy: "John Smith" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-purple-500/10 text-purple-600",
  Editor: "bg-blue-500/10 text-blue-600",
  Contributor: "bg-green-500/10 text-green-600",
  Viewer: "bg-gray-500/10 text-gray-600",
};

function getRoleBadgeClass(role: string) {
  return roleColors[role] ?? "bg-gray-500/10 text-gray-600";
}

function UsersPageHeader({ onInvite }: { onInvite: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Team Members</h1>
        <p className="text-[var(--text-tertiary)] mt-1">
          Manage your workspace members and their permissions
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="primary" className="gap-2 px-6" onClick={onInvite}>
          <Plus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>
    </div>
  );
}

function UsersStats({ totalCount, activeCount, pendingCount }: { totalCount: number; activeCount: number; pendingCount: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{totalCount}</p>
              <p className="text-sm text-[var(--text-tertiary)]">Total Members</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{activeCount}</p>
              <p className="text-sm text-[var(--text-tertiary)]">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{pendingCount}</p>
              <p className="text-sm text-[var(--text-tertiary)]">Pending Invites</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">4</p>
              <p className="text-sm text-[var(--text-tertiary)]">Roles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UsersFiltersBar({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3 lg:flex-1 lg:min-w-0">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Contributor">Contributor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 px-5">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
}

function MembersCard({ membersCount, children }: { membersCount: number; children: React.ReactNode }) {
  return (
    <Card className="flex flex-col min-h-0 flex-1">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          {membersCount} member{membersCount !== 1 ? "s" : ""} found
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0">
        <div className="divide-y divide-[var(--border-subtle)] overflow-auto">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function PendingInvitesCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-amber-500" />
          Pending Invitations
        </CardTitle>
        <CardDescription>Invitations that haven't been accepted yet</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[var(--border-subtle)]">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Contributor");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeCount = teamMembers.filter(m => m.status === "active").length;
  const pendingCount = teamMembers.filter(m => m.status === "pending").length + pendingInvites.length;

  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-8">
      <UsersPageHeader onInvite={() => setShowInviteModal(true)} />

      <UsersStats totalCount={teamMembers.length} activeCount={activeCount} pendingCount={pendingCount} />

      <UsersFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      <div className="flex flex-col gap-6 min-h-0 flex-1">
        <MembersCard membersCount={filteredMembers.length}>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-4 px-5 py-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between hover:bg-[var(--surface-ground)] transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <Avatar alt={member.name} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-medium text-[var(--text-primary)] truncate">{member.name}</p>
                    {member.status === "pending" && (
                      <span className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-600 rounded-full flex-shrink-0">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-tertiary)] truncate">{member.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="text-left sm:text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(member.role)}`}>
                    {member.role}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-left sm:text-right w-24">
                    <p className="text-sm text-[var(--text-primary)]">{member.documents}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">documents</p>
                  </div>
                  <div className="text-left sm:text-right w-28">
                    <p className="text-sm text-[var(--text-secondary)]">{member.lastActive}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">Last active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Button variant="ghost" size="icon-sm" title="Change role">
                    <UserCog className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="Send email">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="More options">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </MembersCard>

        {pendingInvites.length > 0 && (
          <PendingInvitesCard>
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex flex-col gap-4 px-5 py-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between hover:bg-[var(--surface-ground)] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface-ground)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[var(--text-tertiary)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-[var(--text-primary)] truncate">{invite.email}</p>
                    <p className="text-sm text-[var(--text-tertiary)] truncate">
                      Invited by {invite.invitedBy} • {invite.invitedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(invite.role)}`}>
                    {invite.role}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm" title="Resend invite">
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      title="Cancel invite"
                      className="text-red-500 hover:text-red-600"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </PendingInvitesCard>
        )}
      </div>

      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Team Member"
        description="Send an invitation to join your workspace"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--surface-ground)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Role
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--surface-ground)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
            >
              <option value="Viewer">Viewer - Read-only access</option>
              <option value="Contributor">Contributor - Can create & edit own docs</option>
              <option value="Editor">Editor - Can edit any document</option>
              <option value="Admin">Admin - Full access</option>
            </select>
          </div>

          <div className="bg-[var(--surface-ground)] rounded-lg p-5 text-sm text-[var(--text-tertiary)]">
            <p>An invitation email will be sent to this address. They'll be able to join your workspace once they accept.</p>
          </div>
        </div>

        <ModalFooter className="gap-4">
          <Button variant="ghost" className="px-6" onClick={() => setShowInviteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="gap-2 px-6">
            <Send className="w-4 h-4" />
            Send Invite
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
