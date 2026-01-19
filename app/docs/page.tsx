"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Zap, Shield, ArrowRight, Code, Bot, FileText, Lock, BarChart3, FolderSync, Globe, Video, FileCheck } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DocModal } from "@/components/docs/DocModal";
import { CategoryModal } from "@/components/docs/CategoryModal";
import { categories, searchDocs, allArticles, type DocArticle } from "@/lib/docs";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  BookOpen,
  Bot,
  Shield,
  Code,
};

const aiFeatures = [
  { 
    icon: Video, 
    title: "From Video", 
    description: "Upload YouTube links or video files. AI extracts key information and generates structured documentation automatically."
  },
  { 
    icon: FileText, 
    title: "From Prompt", 
    description: "Describe what you need in natural language. AI creates comprehensive articles, guides and runbooks."
  },
  { 
    icon: Search, 
    title: "AI Search (RAG)", 
    description: "Ask questions in plain English. Semantic search finds answers across your entire knowledge base with cited sources."
  },
];

const enterpriseFeatures = [
  { icon: Lock, title: "SSO/SAML Integration", description: "Okta, Azure AD and Google Workspace" },
  { icon: Shield, title: "SOC 2 Type II", description: "Enterprise-grade compliance" },
  { icon: Globe, title: "GDPR Compliant", description: "EU data residency options" },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Usage insights and adoption metrics" },
  { icon: FileCheck, title: "Content Audit", description: "Document health and verification" },
  { icon: FolderSync, title: "Automated Backups", description: "Data protection and recovery" },
];

const apiDocs = [
  { icon: Code, title: "REST API Reference", description: "Complete API documentation with examples and SDKs", slug: "api-overview" },
  { icon: Globe, title: "Webhooks", description: "Real-time event notifications for document changes", slug: "webhooks" },
  { icon: FileText, title: "Local Development", description: "Set up local environment for API integration", slug: "local-development" },
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DocArticle[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<DocArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ title: string; articles: DocArticle[] } | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      setIsSearching(true);
      const results = searchDocs(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  const openArticle = (article: DocArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    setIsSearching(false);
    setSearchQuery("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const openCategoryModal = (category: { title: string; articles: DocArticle[] }) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('doc-search') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />

      <SiteNavbar currentPage="docs" />

      <DocModal article={selectedArticle} isOpen={isModalOpen} onClose={closeModal} />
      <CategoryModal 
        categoryTitle={selectedCategory?.title || ''}
        articles={selectedCategory?.articles || []}
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSelectArticle={openArticle}
      />

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {/* Docs Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <Image 
                src="/docs_logo1.webp" 
                alt="Documentation" 
                width={60} 
                height={60}
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
              Documentation
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '24px', lineHeight: 1.1 }}>
              Discover TyneBase
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.6 }}>
              Everything you need to build, manage and scale your knowledge base. 
              From quick start guides to advanced AI features and enterprise security.
            </p>
            
            {/* Search Box */}
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--text-muted)' }} />
                <input 
                  id="doc-search"
                  type="text" 
                  placeholder="Search documentation..." 
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 100px 18px 56px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <kbd style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>⌘</kbd>
                  <kbd style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--bg-tertiary)', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>K</kbd>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {isSearching && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  zIndex: 50,
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}>
                  {searchResults.length > 0 ? (
                    <div style={{ padding: '8px' }}>
                      {searchResults.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => openArticle(article)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                            {article.title}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {article.category} · {article.readTime} read
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Browse by category
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Find the documentation you need, organised by topic.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || Zap;
              return (
                <button 
                  key={category.id}
                  onClick={() => openCategoryModal(category)}
                  className="bento-item"
                  style={{ padding: '32px', display: 'flex', flexDirection: 'column', cursor: 'pointer', border: 'none', background: 'var(--bg-elevated)', textAlign: 'left', width: '100%' }}
                >
                  <div className={`feature-icon feature-icon-${category.color}`} style={{ marginBottom: '20px' }}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                    {category.description}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      {category.articles.length} articles
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {category.articles.slice(0, 3).map((article) => (
                        <div
                          key={article.id}
                          onClick={() => openArticle(article)}
                          style={{
                            background: 'transparent',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--bg-secondary)';
                            e.currentTarget.style.color = 'var(--brand)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          → {article.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Features Highlight */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              AI-Powered
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Generate Documentation with AI
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              TyneBase uses advanced AI models with EU-compliant data processing to help you create and find knowledge faster.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {aiFeatures.map((feature) => (
              <div 
                key={feature.title} 
                style={{ 
                  padding: '32px', 
                  background: 'var(--bg-elevated)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => {
                  const aiArticle = allArticles.find(a => a.title.toLowerCase().includes(feature.title.toLowerCase().replace('(rag)', '').trim()));
                  if (aiArticle) openArticle(aiArticle);
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="feature-icon feature-icon-purple" style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Popular Articles
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                The most read guides and tutorials from our documentation.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allArticles.slice(0, 6).map((article) => (
                <button 
                  key={article.id}
                  onClick={() => openArticle(article)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '20px 24px', 
                    background: 'var(--bg-elevated)', 
                    border: '1px solid var(--border-subtle)', 
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--brand)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <FileText style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {article.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        {article.category}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {article.readTime} read
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Enterprise
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Security & Compliance
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Enterprise-grade security features designed for organizations with strict compliance requirements.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {enterpriseFeatures.map((feature) => (
              <div 
                key={feature.title} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  padding: '24px', 
                  background: 'var(--bg-elevated)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => {
                  const secArticle = allArticles.find(a => 
                    a.category === 'Security & Compliance' && 
                    a.title.toLowerCase().includes(feature.title.toLowerCase().split('/')[0].trim())
                  );
                  if (secArticle) openArticle(secArticle);
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--brand)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div className="feature-icon feature-icon-brand" style={{ flexShrink: 0 }}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                API & Developer Resources
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                Build integrations and extend TyneBase with our developer tools.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {apiDocs.map((doc) => (
                <div 
                  key={doc.title} 
                  className="bento-item"
                  style={{ padding: '32px', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    const apiArticle = allArticles.find(a => a.slug === doc.slug);
                    if (apiArticle) openArticle(apiArticle);
                  }}
                >
                  <div className="feature-icon feature-icon-blue" style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {doc.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: '-16px', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple), var(--accent-pink))', opacity: 0.15, filter: 'blur(40px)', borderRadius: '24px' }} />
            <div style={{ position: 'relative', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Can't find what you need?
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                Our support team is here to help you succeed.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/community" className="btn btn-secondary">
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPage="docs" />
    </div>
  );
}
