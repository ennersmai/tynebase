"use client";

import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const customers = [
  { name: "TechCorp", industry: "Technology", size: "500+ employees" },
  { name: "FinanceHub", industry: "Finance", size: "1000+ employees" },
  { name: "HealthFirst", industry: "Healthcare", size: "250+ employees" },
  { name: "EduLearn", industry: "Education", size: "100+ employees" },
  { name: "RetailMax", industry: "Retail", size: "2000+ employees" },
  { name: "ConsultPro", industry: "Consulting", size: "150+ employees" }
];

const testimonials = [
  {
    quote: "TyneBase transformed how our engineering team shares knowledge. Documentation that used to take hours now takes minutes with AI assistance.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp"
  },
  {
    quote: "The white-label feature was a game-changer. Our clients now have a branded knowledge portal that feels completely custom.",
    author: "Marcus Williams",
    role: "Head of Product",
    company: "ConsultPro"
  },
  {
    quote: "Finally, a documentation tool that our team actually enjoys using. The search is incredibly fast and AI suggestions are spot-on.",
    author: "Emily Davis",
    role: "Director of Operations",
    company: "HealthFirst"
  }
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />
      <div className="grid-overlay" />

      <SiteNavbar currentPage="other" />

      <section className="section pt-[180px] pb-[80px]">
        <div className="container text-center">
          <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wider mb-4">Customers</p>
          <h1 className="text-5xl sm:text-6xl font-semibold text-[var(--text-primary)] leading-[1.05] tracking-[-0.02em] mb-6">
            Trusted by <span className="text-gradient text-glow">leading teams</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-[600px] mx-auto">
            Companies of all sizes use TyneBase to build and share knowledge.
          </p>
        </div>
      </section>

      <section className="section py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {customers.map((customer) => (
              <div key={customer.name} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] mx-auto mb-3 flex items-center justify-center text-lg font-bold text-[var(--text-primary)]">
                  {customer.name[0]}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">{customer.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{customer.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-12 text-center">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6">
                <Quote className="w-8 h-8 text-[var(--brand)] opacity-50 mb-4" />
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
                  <p className="text-sm text-[var(--text-muted)]">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Ready to join them?</h2>
          <p className="text-[var(--text-secondary)] mb-6">Start your free trial today.</p>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter currentPage="customers" />
    </div>
  );
}
