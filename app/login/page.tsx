"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { createClient } from "@/lib/supabase/client";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const supabase = createClient();

  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      addToast({
        type: "success",
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      // Fetch user's tenant context for proper redirect
      if (data.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('tenant_id, tenants!inner(subdomain)')
          .eq('id', data.user.id)
          .single();
        
        if (userData?.tenant_id && userData.tenants && typeof userData.tenants === 'object' && 'subdomain' in userData.tenants) {
          // User has tenant - redirect to tenant subdomain
          window.location.href = `http://${(userData.tenants as any).subdomain}.tynebase.com/dashboard`;
          return;
        } else {
          // Individual user without tenant - redirect to main site dashboard
          router.push('/dashboard');
          return;
        }
      }

      // Fallback redirect
      router.push(redirect);
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Login failed",
        description: error.message || "Invalid email or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        },
      });

      if (error) throw error;

      addToast({
        type: "success",
        title: "Magic link sent!",
        description: "Check your email for the login link.",
      });
    } catch (error: any) {
      addToast({
        type: "error",
        title: "Failed to send magic link",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (!supabase) {
        throw new Error("Supabase is not configured");
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      addToast({
        type: "error",
        title: "OAuth failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="hero-gradient" />

      <SiteNavbar currentPage="other" />

      {/* Centered Modal Container */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ marginTop: '80px' }}>
        <div className="w-full max-w-md">
          {/* Modal Card */}
          <div style={{ 
            background: 'var(--bg-elevated)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '20px', 
            padding: '48px 40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Welcome back
              </h1>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                {isMagicLink ? "We'll send you a magic link" : "Sign in to your account"}
              </p>
            </div>

            <form onSubmit={isMagicLink ? handleMagicLink : handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    fontSize: '15px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 77, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-subtle)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {!isMagicLink && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                      Password
                    </label>
                    <Link href="/auth/reset-password" style={{ fontSize: '13px', color: 'var(--brand)' }}>
                      Forgot password?
                    </Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 48px 14px 16px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--brand)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 77, 0, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-subtle)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        padding: '4px'
                      }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px 24px', fontSize: '15px', fontWeight: 600, marginTop: '8px' }}
              >
                {isLoading ? "Signing in..." : isMagicLink ? "Send Magic Link" : "Sign In"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setIsMagicLink(!isMagicLink)}
                style={{ fontSize: '14px', color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isMagicLink ? "Use password instead" : "Sign in with magic link"}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '14px 24px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: 'var(--brand)', fontWeight: 500 }}>
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <SiteFooter currentPage="login" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-sm text-[var(--text-secondary)]">Loading…</div>
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
