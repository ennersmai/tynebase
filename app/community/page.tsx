"use client";

import Link from "next/link";
import { MessageSquare, Users, BookOpen, ArrowRight, Lock, TrendingUp, HelpCircle, Bell, Shield } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function CommunityPage() {
  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />

      <SiteNavbar currentPage="other" />

      <section className="section pt-[180px] pb-[80px]">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <img 
              src="/comunity_logo3.webp"
              alt="Community" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain' 
              }} 
            />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Community</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '24px', textAlign: 'center' }}>
            Join the <span className="text-gradient">conversation</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', textAlign: 'center', marginBottom: '24px' }}>
            Connect with other TyneBase users, share knowledge, and get help from our vibrant community.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '40px' }}>
            <Lock className="w-4 h-4" />
            <span>Members-only access • Sign up to join</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Become a Member
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              Log in to Community
            </Link>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="section py-16">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '1152px' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bento-item text-center">
                <div className="feature-icon feature-icon-brand mx-auto mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Active Members</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Join thousands of knowledge workers</p>
                <p className="text-3xl font-bold text-[var(--brand)]">2,500+</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">and growing daily</p>
              </div>
              <div className="bento-item text-center">
                <div className="feature-icon feature-icon-blue mx-auto mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Discussions</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">In-depth conversations and Q&A</p>
                <p className="text-3xl font-bold text-[var(--accent-blue)]">5,000+</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">topics covered</p>
              </div>
              <div className="bento-item text-center">
                <div className="feature-icon feature-icon-purple mx-auto mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Resources</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Community-created guides & templates</p>
                <p className="text-3xl font-bold text-[var(--accent-purple)]">200+</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">shared resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="section py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>What You Get as a Member</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              Access exclusive community features and connect with fellow TyneBase users
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-brand">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Discussion Forums</h3>
                <p className="text-sm text-[var(--text-secondary)]">Ask questions, share insights, and engage in threaded discussions with the community</p>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-blue">
                    <Bell className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Product Updates</h3>
                <p className="text-sm text-[var(--text-secondary)]">Be the first to know about new features, updates, and announcements</p>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-purple">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Feature Requests</h3>
                <p className="text-sm text-[var(--text-secondary)]">Vote on and suggest new features to shape the future of TyneBase</p>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-brand">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Expert Help</h3>
                <p className="text-sm text-[var(--text-secondary)]">Get answers from experienced users and TyneBase team members</p>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-blue">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Shared Resources</h3>
                <p className="text-sm text-[var(--text-secondary)]">Access templates, guides, and best practices shared by the community</p>
              </div>

              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center" style={{ paddingTop: '18px', paddingBottom: '13px', paddingLeft: '13px', paddingRight: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div className="feature-icon feature-icon-purple">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Private & Secure</h3>
                <p className="text-sm text-[var(--text-secondary)]">Members-only access ensures a trusted, professional environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Ready to Join?</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                Sign up for TyneBase to unlock full community access and connect with thousands of users
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <Link href="/signup" className="btn btn-primary btn-lg">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pricing" className="btn btn-secondary btn-lg">
                  View Pricing
                </Link>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Already a member? <Link href="/login" className="text-[var(--brand)] hover:underline">Log in to access the community</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPage="community" />
    </div>
  );
}
