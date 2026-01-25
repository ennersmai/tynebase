"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Tenant, TenantBranding } from "@/types";

interface TenantContextType {
  tenant: Tenant | null;
  branding: TenantBranding | null;
  isLoading: boolean;
  subdomain: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [branding, setBranding] = useState<TenantBranding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "tynebase.com";
    
    // Extract subdomain
    const parts = hostname.split(".");
    const baseParts = baseDomain.split(".");
    
    let extractedSubdomain: string | null = null;
    if (parts.length > baseParts.length) {
      extractedSubdomain = parts.slice(0, parts.length - baseParts.length).join(".");
    }
    
    setSubdomain(extractedSubdomain);

    // For MVP, we'll fetch tenant data here
    // In production, this would call the API
    if (extractedSubdomain && extractedSubdomain !== "www") {
      // Mock tenant data for development
      const tenantName = extractedSubdomain.charAt(0).toUpperCase() + extractedSubdomain.slice(1);
      setTenant({
        id: "mock-tenant-id",
        name: tenantName,
        subdomain: extractedSubdomain,
        plan: "base",
        primary_color: "#E85002",
        max_users: 10,
        max_storage_mb: 5120,
        max_ai_generations_per_month: 50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setBranding({
        primary_color: "#E85002",
        name: tenantName,
      });
    }

    setIsLoading(false);
  }, []);

  // Apply branding CSS variables
  useEffect(() => {
    if (branding?.primary_color) {
      document.documentElement.style.setProperty("--brand-primary", branding.primary_color);
    }
  }, [branding]);

  return (
    <TenantContext.Provider value={{ tenant, branding, isLoading, subdomain }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
