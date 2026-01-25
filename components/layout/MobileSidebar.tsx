"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { DashboardSidebar } from "./DashboardSidebar"; // Reuse the existing sidebar content if possible, or refactor Sidebar to separate Content vs Container.
// Ideally, DashboardSidebar should separate its logic so we can reuse just the nav links.
// For now, I will modify DashboardSidebar to accept a "mobile" prop or just reuse it wrapped in a slide-over.

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div
                className={`fixed inset-y-0 left-0 w-[280px] bg-[var(--surface-card)] z-[100] shadow-xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="absolute top-2 right-2 z-50">
                    <button onClick={onClose} className="p-2 text-[var(--dash-text-muted)] hover:text-[var(--dash-text-primary)]">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* We can just render the DashboardSidebar here, but we might need to adjust it to fit the mobile context (e.g., hidden sticky behavior) */}
                {/* A better approach is to refactor DashboardSidebar to export `SidebarContent` but for speed, I'll wrap it. 
            However, DashboardSidebar has `h-screen` and sticky classes which might conflict. 
            I will modify DashboardSidebar to accept `className` and `style` props to override layout styles for mobile.
        */}
                <div className="h-full overflow-hidden">
                    <DashboardSidebar mobile />
                </div>
            </div>
        </>,
        document.body
    );
}
