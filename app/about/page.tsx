"use client";

import Link from "next/link";
import { ArrowRight, Users, Globe, Shield, Zap } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const values = [
  {
    icon: Users,
    title: "People First",
    description: "We build for real teams with real challenges. Every feature starts with understanding how people actually work."
  },
  {
    icon: Globe,
    title: "Privacy by Design",
    description: "EU-first infrastructure, GDPR compliant by default. Your data stays yours, always."
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "Security isn't an afterthought. SOC2, HIPAA, and enterprise-grade from day one."
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Performance matters. Sub-100ms response times because your team shouldn't wait."
  }
];

const team = [
  { name: "Daniel G", role: "CEO & Co-Founder", image: "/team/alex.jpg" },
  { name: "Mai P", role: "CTO & Co-Founder", image: "/Mai_headshoot.webp" },
  { name: "Marcus Johnson", role: "Hiring Soon", image: "/team/marcus.jpg" },
  { name: "Emma Davis", role: "Hiring Soon", image: "/team/emma.jpg" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />

      <SiteNavbar currentPage="other" />

      {/* Hero */}
      <section className="section pt-[180px] pb-[100px]">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <img 
              src="/logo.png" 
              alt="TyneBase" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain' 
              }} 
            />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>About Us</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '32px', textAlign: 'center' }}>
            Building the future of
            <br />
            <span className="text-gradient">team knowledge</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', textAlign: 'center' }}>
            We're on a mission to help teams build, share, and find knowledge effortlessly. 
            No more scattered docs, no more lost information.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section py-20">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '768px' }}>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                TyneBase was born from a simple frustration: knowledge management tools weren't keeping up with how modern teams actually work. 
                Documentation was scattered, search was broken, and AI felt like an afterthought.
              </p>
              <p>
                We started building TyneBase in 2024 with a clear vision: create a knowledge platform that's AI-native from the ground up, 
                privacy-first by design, and beautiful enough that people actually want to use it.
              </p>
              <p>
                Today, we're helping teams across the globe transform how they create, organize, and discover knowledge. 
                From startups to enterprises, from engineering teams to HR departments—TyneBase scales with your ambitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section py-20 bg-[var(--bg-secondary)]">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Our Values</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>The principles that guide everything we build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ width: '100%', maxWidth: '1152px' }}>
            {values.map((value) => (
              <div key={value.title} className="bento-item text-center">
                <div className="feature-icon feature-icon-brand mx-auto mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{value.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section py-20">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Meet the Team</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>The people behind TyneBase.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ width: '100%', maxWidth: '896px' }}>
            {team.map((member) => (
              <div key={member.name} className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {member.image === "/Mai_headshoot.webp" ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4" style={{ marginBottom: '20px' }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--accent-pink)] mx-auto mb-4 flex items-center justify-center" style={{ marginBottom: '20px' }}>
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <h4 className="font-semibold text-[var(--text-primary)]" style={{ marginBottom: '4px' }}>{member.name}</h4>
                <p className="text-sm text-[var(--text-muted)]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-20">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '896px' }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] opacity-20 blur-3xl rounded-3xl" />
            <div style={{ position: 'relative', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Join us on our mission
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '512px' }}>
                We're always looking for talented people who share our vision.
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/careers" className="btn btn-primary btn-lg">
                  View open positions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPage="about" />
    </div>
  );
}
