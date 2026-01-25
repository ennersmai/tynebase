import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { extractSubdomain } from "@/lib/utils";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "tynebase.com";

const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/login",
  "/signup",
  "/auth/callback",
  "/auth/verify",
  "/auth/reset-password",
];

const RESERVED_SUBDOMAINS = [
  "www", "api", "app", "admin", "auth", "login", "signup",
  "mail", "support", "help", "docs", "blog", "status",
  "cdn", "static"
];

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  
  const hostname = request.headers.get("host") || "";
  const subdomain = extractSubdomain(hostname, BASE_DOMAIN);
  const pathname = request.nextUrl.pathname;

  // Root domain (marketing site)
  if (!subdomain || subdomain === "www") {
    // Allow access to marketing pages
    if (PUBLIC_ROUTES.includes(pathname)) {
      return supabaseResponse;
    }
    
    // Handle dashboard access on main site (for individual users)
    if (pathname.startsWith("/dashboard")) {
      if (!user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
      // Allow individual users to access main site dashboard
      return supabaseResponse;
    }
    
    return supabaseResponse;
  }

  // Check for reserved subdomains
  if (RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
    const notFoundUrl = new URL("/tenant-not-found", request.url);
    return NextResponse.rewrite(notFoundUrl);
  }

  // Tenant subdomain - verify tenant exists
  // For now, we'll add tenant verification in a later step when we have the database
  // This is a placeholder that allows all non-reserved subdomains

  // Public routes on tenant subdomains
  if (PUBLIC_ROUTES.includes(pathname)) {
    return supabaseResponse;
  }

  // Protected routes - require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Add tenant context to response headers
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });
  
  response.headers.set("x-tenant-subdomain", subdomain);
  
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
