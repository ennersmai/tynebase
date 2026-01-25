"use client";

import { Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
    { id: 1, title: "New comment on your article", time: "5 min ago", unread: true, description: "Sarah commented: Great work on this section!" },
    { id: 2, title: "Document approved for publishing", time: "1 hour ago", unread: true, description: "The 'Getting Started' guide has been approved." },
    { id: 3, title: "Weekly content audit complete", time: "2 hours ago", unread: false, description: "No major issues found in the content audit." },
    { id: 4, title: "New team member joined", time: "1 day ago", unread: false, description: "Alex Johnson has joined the Engineering team." },
];

export default function NotificationsPage() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--dash-text-primary)]">Notifications</h1>
                    <p className="text-[var(--dash-text-tertiary)] mt-2">Stay updated with your workspace activity</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand-primary-muted)] rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                    Mark all as read
                </button>
            </div>

            <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl overflow-hidden shadow-sm">
                <div className="divide-y divide-[var(--dash-border-subtle)]">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={cn(
                                "p-6 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer flex gap-4 items-start",
                                notif.unread ? "bg-[var(--brand-primary-muted)]/30" : ""
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                notif.unread ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "bg-[var(--surface-ground)] text-[var(--dash-text-muted)]"
                            )}>
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className={cn(
                                        "text-base font-semibold",
                                        notif.unread ? "text-[var(--dash-text-primary)]" : "text-[var(--dash-text-secondary)]"
                                    )}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs text-[var(--dash-text-tertiary)] whitespace-nowrap">{notif.time}</span>
                                </div>
                                <p className="text-sm text-[var(--dash-text-secondary)] mt-1">{notif.description}</p>
                            </div>
                            {notif.unread && (
                                <div className="w-2 h-2 rounded-full bg-[var(--brand)] mt-2" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
