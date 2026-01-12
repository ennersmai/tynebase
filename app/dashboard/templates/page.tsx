"use client";

import { useState } from "react";
import { Code, Users, BookOpen, Rocket, Shield, Settings, Zap, Search, Plus, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DashboardPageHeader } from "@/components/layout/DashboardPageHeader";

const templateCategories = [
  { id: 'all', label: 'All', count: 24 },
  { id: 'engineering', label: 'Engineering', count: 8 },
  { id: 'product', label: 'Product', count: 6 },
  { id: 'hr', label: 'HR & People', count: 5 },
  { id: 'security', label: 'Security', count: 5 },
];

const templates = [
  { id: 1, title: 'API Documentation', description: 'Document REST APIs with endpoints, parameters, and examples', category: 'engineering', icon: Code, color: '#3b82f6', usageCount: 1234, featured: true },
  { id: 2, title: 'Product Roadmap', description: 'Plan and communicate product features and timelines', category: 'product', icon: Rocket, color: '#8b5cf6', usageCount: 892, featured: true },
  { id: 3, title: 'Onboarding Guide', description: 'Welcome new team members with essential information', category: 'hr', icon: Users, color: '#ec4899', usageCount: 756, featured: true },
  { id: 4, title: 'Security Policy', description: 'Define security standards and compliance requirements', category: 'security', icon: Shield, color: '#f97316', usageCount: 543, featured: false },
  { id: 5, title: 'Technical Spec', description: 'Detail system architecture and implementation plans', category: 'engineering', icon: Settings, color: '#06b6d4', usageCount: 621, featured: false },
  { id: 6, title: 'Release Notes', description: 'Communicate product updates and changes', category: 'product', icon: Zap, color: '#3b82f6', usageCount: 445, featured: false },
  { id: 7, title: 'Meeting Notes', description: 'Capture action items and decisions from meetings', category: 'all', icon: BookOpen, color: '#8b5cf6', usageCount: 1102, featured: false },
  { id: 8, title: 'Incident Report', description: 'Document and track incidents for postmortems', category: 'engineering', icon: Shield, color: '#ef4444', usageCount: 334, featured: false },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTemplates = templates.filter(t => t.featured);
  const placeholderTemplates = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="h-full w-full min-h-0 flex flex-col gap-8">
      {/* Header */}
      <DashboardPageHeader
        title={<h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">Templates</h1>}
        description={
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Start with pre-built templates for common documentation needs
          </p>
        }
        right={
          <Button className="gap-2" size="md">
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        }
      />

      <div className="flex-1 flex flex-col gap-8 min-h-0">
        {/* Featured Templates */}
        <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-2xl p-6 sm:p-7">
          <h2 className="text-sm font-semibold text-[var(--dash-text-primary)] mb-5 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Featured Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl px-6 pt-7 pb-6 hover:shadow-md hover:border-[var(--brand)] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${template.color}15` }}>
                  <template.icon className="w-6 h-6" style={{ color: template.color }} />
                </div>
                <h3 className="font-semibold text-[var(--dash-text-primary)] mb-1 group-hover:text-[var(--brand)] transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-[var(--dash-text-tertiary)] mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--dash-text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {template.usageCount.toLocaleString()} uses
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs font-medium">
                    Use Template
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-2xl p-6 sm:p-7 min-h-0 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 leading-none pl-10 pr-4 bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2.5 max-w-full">
              {templateCategories.map((cat) => (
                <div key={cat.id} className="inline-flex items-stretch">
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-l-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-[var(--brand)] text-white'
                        : 'bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] border-r-0 text-[var(--dash-text-secondary)] hover:border-[var(--brand)]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {cat.label === 'Engineering' && <span className="ml-2" />}
                  </button>
                  <span
                    className={`px-3 py-2 rounded-r-lg text-sm font-semibold tabular-nums ${
                      activeCategory === cat.id
                        ? 'bg-[var(--brand-dark)] text-white'
                        : 'bg-[var(--surface-card)] text-[var(--dash-text-primary)] border border-[var(--dash-border-subtle)]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex flex-col">
            <h2 className="text-sm font-semibold text-[var(--dash-text-primary)] mb-5">
              {filteredTemplates.length} Templates
            </h2>
            {filteredTemplates.length === 0 ? (
              <div className="space-y-6">
                <div className="bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl p-8">
                  <div className="max-w-xl">
                    <h3 className="text-base font-semibold text-[var(--dash-text-primary)]">No templates found</h3>
                    <p className="text-sm text-[var(--dash-text-tertiary)] mt-2">
                      Try adjusting your search or changing categories.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button variant="secondary" size="md" onClick={() => setSearchQuery("")}>Clear search</Button>
                      <Button variant="secondary" size="md" onClick={() => setActiveCategory("all")}>Show all</Button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {placeholderTemplates.map((i) => (
                    <div
                      key={i}
                      className="bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--surface-card)] animate-pulse" />
                        <div className="w-4 h-4 rounded bg-[var(--surface-card)] animate-pulse" />
                      </div>
                      <div className="h-4 w-2/3 rounded bg-[var(--surface-card)] animate-pulse" />
                      <div className="mt-2 h-3 w-full rounded bg-[var(--surface-card)] animate-pulse" />
                      <div className="mt-1 h-3 w-4/5 rounded bg-[var(--surface-card)] animate-pulse" />
                      <div className="mt-4 flex items-center justify-between">
                        <div className="h-3 w-16 rounded bg-[var(--surface-card)] animate-pulse" />
                        <div className="h-3 w-20 rounded bg-[var(--surface-card)] animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl px-5 pt-6 pb-5 hover:shadow-md hover:border-[var(--brand)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${template.color}15` }}>
                        <template.icon className="w-5 h-5" style={{ color: template.color }} />
                      </div>
                      {template.featured && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <h3 className="font-medium text-[var(--dash-text-primary)] mb-1 group-hover:text-[var(--brand)] transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-[var(--dash-text-tertiary)] line-clamp-2 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-[var(--dash-text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {template.usageCount.toLocaleString()}
                      </span>
                      <span className="capitalize">{template.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Community Templates CTA */}
        <div className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] rounded-xl p-7 text-white mt-auto">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Share your templates with the community</h3>
              <p className="text-white/80 text-sm">Help others by publishing your best templates to the community library.</p>
            </div>
            <Button variant="secondary" size="md" className="bg-white text-[var(--brand)] hover:bg-white/90 border-0">
              Publish Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
