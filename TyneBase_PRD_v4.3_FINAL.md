# TyneBase
## Complete Product Requirements Document
### Phase 1: Core Platform, AI Engine & White Label System

<div align="center">

**Version 4.3 — Final Execution-Ready Specification (Security Hardened + EU Compliant + Enhanced RAG)**

⚠️ **This is the complete, execution-ready PRD including all specifications for:**
- Multi-tenancy with subdomain routing (company.tynebase.com)
- White-label branding system with live preview
- Super Admin dashboard for tenant management
- Complete data isolation between tenants
- AI Document Assistant (From Prompt, From Video, Enhance)
- Content Audit Dashboard
- GDPR Compliance Framework
- **API Response Schemas & Error Handling**
- **Loading, Empty, and Error States**
- **Form Validation Rules**
- **Responsive Breakpoints**
- **Document Editor Specifications**
- **Search, Notifications, and RBAC UI**
- **🔒 Security Hardened RLS Policies**
- **🔒 Cold Start Handling for Workers**
- **🔒 WCAG AA Accessibility Compliance**
- **🇪🇺 EU/UK Data Compliant AI Providers**
- **🧠 Advanced RAG: Semantic Chunking + Reranking**

*Knowledge that scales with your team*

---

</div>

---

## Document Overview

This unified PRD consolidates all specifications for TyneBase Phase 1:

| Section | Content |
|---------|---------|
| **Part I** | Product Vision & Architecture |
| **Part II** | Design System & UI Specifications |
| **Part III** | Multi-Tenancy & Data Isolation |
| **Part IV** | AI Engine & RAG Pipeline |
| **Part V** | Document Lineage System |
| **Part VI** | GDPR Compliance Framework |
| **Part VII** | Database Schema |
| **Part VIII** | Milestone Deliverables |
| **Part VIII-B** | Fly.io Backend Architecture |
| **Part IX** | Subdomain Routing & Tenant Resolution |


| **Part X** | White-Label Branding System |
| **Part XI** | Super Admin Dashboard |
| **Part XII** | Data Isolation Verification |
| **Part XIII** | API Response Schemas |
| **Part XIV** | Loading & Skeleton States |
| **Part XV** | Empty States |
| **Part XVI** | Error States |
| **Part XVII** | Form Validation Rules |
| **Part XVIII** | Responsive Breakpoints |
| **Part XIX** | Document Editor Specifications |
| **Part XX** | Search UI Details |
| **Part XXI** | Notification System UI |
| **Part XXII** | Permission/RBAC UI |
| **Part XXIII** | Logic Fixes & Edge Cases |
| **Part XXIV** | 🔒 Security & Optimization Fixes |

---

# Part I: Product Vision & Architecture

## 1.1 Executive Summary

TyneBase is a multi-tenant SaaS platform that transforms how companies manage knowledge and collaborate. It combines secure document management, AI-assisted content creation, community forums, and intelligent search into a white-labeled platform.

### Core Value Propositions

| # | Value | Description |
|---|-------|-------------|
| 1 | **Multi-Tenant Architecture** | Click a button, create a new company instance with full data isolation |
| 2 | **White Label Branding** | Each client sees their logo, colors, and brand identity |
| 3 | **AI-Powered Knowledge** | Generate documents from videos, audio, PDFs, and prompts |
| 4 | **RAG-Based Intelligence** | AI that "knows" your company's knowledge base |
| 5 | **Content Audit** | Comprehensive analytics on content health and engagement |
| 6 | **Community Templates** | Crowd-sourced template library with admin moderation |
| 7 | **Community forum** | Community for your team members, with full forum like implementation per tennant |

## 1.2 Technology Stack

### Core Infrastructure

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           TYNEBASE ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                              ┌─────────────────┐                                │
│                              │     USERS       │                                │
│                              └────────┬────────┘                                │
│                                       │                                         │
│                                       ▼                                         │
│   ┌───────────────────────────────────────────────────────────────────────┐    │
│   │                         VERCEL (Frontend Only)                        │    │
│   │                                                                       │    │
│   │   • Next.js 14 App Router (SSR/SSG)                                  │    │
│   │   • Static assets & CDN                                               │    │
│   │   • Client-side React application                                     │    │
│   │   • No edge compute / No API routes                                   │    │
│   │                                                                       │    │
│   └───────────────────────────────┬───────────────────────────────────────┘    │
│                                   │                                             │
│                                   │ HTTPS API Calls                             │
│                                   ▼                                             │
│   ┌───────────────────────────────────────────────────────────────────────┐    │
│   │                         FLY.IO (Backend API)                          │    │
│   │                                                                       │    │
│   │   ┌─────────────────────┐    ┌─────────────────────┐                 │    │
│   │   │    API Server       │    │   Worker Machines   │                 │    │
│   │   │    (Node.js)        │    │   (Long-running)    │                 │    │
│   │   │                     │    │                     │                 │    │
│   │   │  • REST API         │    │  • Video ingestion  │                 │    │
│   │   │  • Auth validation  │    │  • YT processing    │                 │    │
│   │   │  • Tenant context   │    │  • Audio transcribe │                 │    │
│   │   │  • Rate limiting    │    │  • PDF processing   │                 │    │
│   │   │  • Request routing  │    │  • Embedding jobs   │                 │    │
│   │   │                     │    │  • AI generation    │                 │    │
│   │   └──────────┬──────────┘    └──────────┬──────────┘                 │    │
│   │              │                          │                             │    │
│   │              └────────────┬─────────────┘                             │    │
│   │                           │                                           │    │
│   └───────────────────────────┼───────────────────────────────────────────┘    │
│                               │                                                 │
│               ┌───────────────┼───────────────┐                                │
│               │               │               │                                │
│               ▼               ▼               ▼                                │
│   ┌───────────────┐   ┌─────────────┐   ┌─────────────────────┐              │
│   │   Supabase    │   │  Supabase   │   │   AI Providers      │              │
│   │   PostgreSQL  │   │   Storage   │   │   (EU Compliant)    │              │
│   │               │   │             │   │                     │              │
│   │  • pgvector   │   │  • Per-     │   │  • OpenAI (EU)      │              │
│   │  • RLS        │   │    tenant   │   │  • Vertex AI (UK)   │              │
│   │  • Auth       │   │    buckets  │   │  • Bedrock (UK)     │              │
│   │               │   │             │   │                     │              │
│   └───────────────┘   └─────────────┘   └─────────────────────┘              │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Stack Components

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript | SSR/SSG app on Vercel |
| **Styling** | Tailwind CSS, CSS Variables | Theming & white-label |
| **Backend API** | Node.js on Fly.io | Dedicated API server |
| **Long-Running Tasks** | Fly.io Machines | Video/audio processing, AI jobs |
| **Database** | Supabase PostgreSQL + pgvector | Data + vector search |
| **Auth** | Supabase Auth | Email, OAuth, Magic Links |
| **Storage** | Supabase Storage | Per-tenant file buckets |
| **AI Models** | See AI Provider Strategy below | EU-compliant AI processing |
| **Embeddings** | OpenAI text-embedding-3-large (EU) | RAG vector search |
| **Caching** | HTTP Cache-Control headers | Browser & CDN caching |
| **Monitoring** | Sentry + Fly.io Metrics | Error tracking, metrics |

### AI Provider Strategy (EU/UK Data Compliant)

All AI processing uses EU/UK data residency for GDPR compliance:

| Provider | Access Via | Region | Models | Use Case |
|----------|------------|--------|--------|----------|
| **OpenAI** | Direct API | EU (`eu.api.openai.com`) | GPT-5.2, Whisper | Primary text generation, transcription |
| **Google** | Vertex AI | europe-west2 (London) | Gemini 3 Pro/Flash | Video understanding, multimodal |
| **Anthropic** | AWS Bedrock | eu-west-2 (London) | Claude Sonnet, Opus 4.5 | Alternative text generation |

**User Preference Setting**: Tenant admins (or users) can select their preferred AI provider:

```
┌─────────────────────────────────────────────────────────────┐
│  AI Provider Preference                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ○ OpenAI ( GPT-5.2)         ← Default                │
│    Best for documentation & general tasks                   │
│                                                             │
│  ○ Google (Gemini 3)                                       │
│    Best for video understanding & research                  │
│                                                             │
│  ○ Anthropic (Claude)                                      │
│    Best for analysis & nuanced writing                      │
│                                                             │
│  All providers use EU/UK data centers for GDPR compliance.  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Required Setup (Per Provider)**:

| Provider | Account Needed | DPA Required | Setup Complexity |
|----------|----------------|--------------|------------------|
| OpenAI | OpenAI Platform | ✅ Click-through in dashboard | Low |
| Google | Google Cloud | ✅ Cloud agreement | Medium |
| Anthropic | AWS Account | ✅ AWS Bedrock terms | Medium |

**Implementation Note**: For MVP, implement OpenAI only. Add Vertex AI and Bedrock in Phase 2 when user preference feature is built.

### Caching Strategy (No External Cache Service)

Instead of Redis, we use a layered caching approach:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CACHING STRATEGY                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   LAYER 1: Browser Cache (Client)                                               │
│   ──────────────────────────────                                                │
│   • Static assets: Cache-Control: public, max-age=31536000, immutable           │
│   • API responses: Cache-Control: private, max-age=60, stale-while-revalidate   │
│   • Documents: ETag + If-None-Match for conditional requests                    │
│                                                                                 │
│   LAYER 2: CDN Cache (Vercel Edge Network)                                      │
│   ────────────────────────────────────────                                      │
│   • Static pages: ISR with revalidation                                         │
│   • Public assets: Long-term caching at edge                                    │
│   • Tenant branding assets: CDN cached per subdomain                            │
│                                                                                 │
│   LAYER 3: Server-Side Cache (Fly.io In-Memory)                                 │
│   ─────────────────────────────────────────────                                 │
│   • Tenant config: LRU cache, 5-minute TTL                                      │
│   • Embedding results: In-memory Map, cleared on document update                │
│   • AI prompt templates: Loaded once, refreshed on deploy                       │
│   • Rate limit counters: In-memory with sliding window                          │
│                                                                                 │
│   LAYER 4: Database-Level Cache (PostgreSQL)                                    │
│   ─────────────────────────────────────────                                     │
│   • Query result caching via prepared statements                                │
│   • Connection pooling via Supabase                                             │
│   • Materialized views for audit dashboards                                     │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Cache-Control Headers by Resource Type:**

```typescript
// /lib/cache/headers.ts

export const CACHE_HEADERS = {
  // Static assets (images, fonts, JS/CSS bundles)
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
  
  // Tenant branding assets (logos, favicons)
  branding: {
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  },
  
  // Document content (needs freshness)
  document: {
    'Cache-Control': 'private, max-age=0, must-revalidate',
    'ETag': true, // Generate from content hash
  },
  
  // Document list / search results
  documentList: {
    'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',
  },
  
  // AI-generated content (no cache during generation)
  aiGeneration: {
    'Cache-Control': 'no-store',
  },
  
  // Audit dashboard data
  audit: {
    'Cache-Control': 'private, max-age=300, stale-while-revalidate=600',
  },
  
  // User-specific data
  userProfile: {
    'Cache-Control': 'private, no-cache',
  },
};

---

# Part II: Design System & UI Specifications

## 2.1 Design Philosophy

### Aesthetic Direction: **"Tynebase Industrial"**

TyneBase embraces a **Swiss-Industrial** aesthetic—timeless, high-contrast, and authoritative. We utilize the "Tynebase Gradient" (representing the foundry process from coal to heat) as a signature visual element against a clean, off-white canvas.

**Key Principles:**
- **Swiss Typography**: Use of **Helvetica** for objective, clean readability.
- **High Contrast**: Deep blacks (`#000000`) against soft whites (`#F9F9F9`).
- **The Foundry Gradient**: A distinctive flow from Black → Red → Orange → Cream used for borders and key actions.
- **Industrial Accents**: Use of **Brand Orange** (`#E85002`) for primary calls-to-action.

### Design Tokens

```css
/* ═══════════════════════════════════════════════════════════════════════
   TYNEBASE DESIGN TOKENS (v4.3 - Industrial Palette)
   ═══════════════════════════════════════════════════════════════════════ */

:root {
  /* ─────────────────────────────────────────────────────────────────────
     BRAND COLORS (From Palette)
     ───────────────────────────────────────────────────────────────────── */
  --brand-primary: #E85002;           /* Branding Orange */
  --brand-primary-hover: #C10801;     /* Darker Orange/Red from gradient */
  --brand-black: #000000;             /* Primary Black */
  
  /* The Foundry Gradient: Coal -> Heat -> Molten -> Cooling */
  --brand-gradient: linear-gradient(90deg, #000000 0%, #C10801 33%, #F16001 66%, #D9C3AB 100%);
  
  /* ─────────────────────────────────────────────────────────────────────
     SURFACE COLORS (Light Mode)
     ───────────────────────────────────────────────────────────────────── */
  --surface-ground: #F9F9F9;          /* Canvas White (Not pure #FFF) */
  --surface-card: #FFFFFF;            /* Pure White (Elevated) */
  --surface-elevated: #FFFFFF;        /* Modals, dropdowns */
  --surface-overlay: rgba(0,0,0,0.6); /* Darker overlay for contrast */
  
  /* ─────────────────────────────────────────────────────────────────────
     TEXT COLORS
     ───────────────────────────────────────────────────────────────────── */
  --text-primary: #000000;            /* Primary Black (Headings) */
  --text-secondary: #333333;          /* Dark Gray (Body) */
  --text-tertiary: #646464;           /* Gray (Captions) */
  --text-inverse: #FFFFFF;            /* On dark/orange backgrounds */
  
  /* ─────────────────────────────────────────────────────────────────────
     BORDER & DIVIDERS
     ───────────────────────────────────────────────────────────────────── */
  --border-subtle: #E5E5E5;           /* Card borders */
  --border-default: #A7A7A7;          /* Light Gray (Inputs) */
  --border-strong: #000000;           /* Primary Black (Focus/Active) */
  
  /* ─────────────────────────────────────────────────────────────────────
     STATUS COLORS (WCAG AA Compliant)
     ───────────────────────────────────────────────────────────────────── */
  --status-success: #15803D;          /* Darker Green */
  --status-success-bg: #DCFCE7;
  --status-warning: #B45309;          /* Darker Amber */
  --status-warning-bg: #FEF3C7;
  --status-error: #B91C1C;            /* Darker Red */
  --status-error-bg: #FEF2F2;
  --status-info: #2563EB;             /* Blue */
  --status-info-bg: #EFF6FF;
  
  /* ─────────────────────────────────────────────────────────────────────
     TYPOGRAPHY (Helvetica Stack)
     ───────────────────────────────────────────────────────────────────── */
  --font-display: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  --font-body: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  
  /* Font Sizes (Fluid Scale) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
  
  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 700;
  
  /* ─────────────────────────────────────────────────────────────────────
     SPACING & RADIUS
     ───────────────────────────────────────────────────────────────────── */
  --radius-sm: 2px;      /* Sharper corners for industrial look */
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-full: 9999px;
  
  /* ─────────────────────────────────────────────────────────────────────
     SHADOWS
     ───────────────────────────────────────────────────────────────────── */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}

/* ═══════════════════════════════════════════════════════════════════════
   DARK MODE OVERRIDES
   ═══════════════════════════════════════════════════════════════════════ */

[data-theme="dark"] {
  --surface-ground: #000000;          /* Primary Black */
  --surface-card: #1A1A1A;            /* Dark surface */
  --surface-elevated: #333333;        /* Dark Gray */
  
  --text-primary: #FFFFFF;
  --text-secondary: #A7A7A7;          /* Light Gray */
  --text-tertiary: #646464;           /* Gray */
  
  --border-subtle: #333333;
  --border-default: #646464;
  --border-strong: #A7A7A7;
}
```

## 2.2 Application Layout

### Main Dashboard Structure

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║  ┌─────────────────────────────────────────────────────────────────────┐  ║
║  │                         TOP NAVIGATION BAR                          │  ║
║  │  ┌────────┐                                         ┌────┐ ┌────┐   │  ║
║  │  │ LOGO   │  ┌──────────────────────────────────┐   │ 🔔 │ │ 👤 │  │  ║
║  │  │        │  │ 🔍  Search knowledge base...     │   │    │ │    │   │  ║
║  │  └────────┘  └──────────────────────────────────┘   └────┘ └────┘   │  ║
║  │                                                                     │  ║
║  └─────────────────────────────────────────────────────────────────────┘  ║
║                                                                           ║
║  ┌──────────────┬──────────────────────────────────────────────────────┐  ║
║  │              │                                                      │  ║
║  │   SIDEBAR    │                                                      │  ║
║  │              │                                                      │  ║
║  │  ┌────────┐  │                                                      │  ║
║  │  │+ Create│  │                                                      │  ║
║  │  └────────┘  │                                                      │  ║
║  │              │                                                      │  ║
║  │  ──────────  │                  MAIN CONTENT                        │  ║
║  │              │                                                      │  ║
║  │  📚 Knowledge│                                                      │  ║
║  │  🤖 AI Assist│                                                      │  ║
║  │  📊 Audit    │                                                      │  ║
║  │  💬 Community│                                                      │  ║
║  │  📋 Templates│                                                      │  ║
║  │              │                                                      │  ║
║  │  ──────────  │                                                      │  ║
║  │              │                                                      │  ║
║  │  ⚙️ Settings │                                                      │  ║
║  │  👥 Users    │                                                      │  ║
║  │  🎨 Branding │                                                      │  ║
║  │              │                                                      │  ║
║  └──────────────┴──────────────────────────────────────────────────────┘  ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### Component: Sidebar Navigation

```typescript
// /components/layout/Sidebar.tsx

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number | string;
  children?: NavItem[];
  roles?: UserRole[];
}

const navigation: NavItem[] = [
  {
    id: 'knowledge',
    label: 'Knowledge',
    icon: <BookOpen className="w-5 h-5" />,
    href: '/dashboard/knowledge',
    children: [
      { id: 'articles', label: 'All Articles', href: '/dashboard/knowledge/articles' },
      { id: 'ai-index', label: 'AI Index', href: '/dashboard/knowledge/ai-index' },
    ],
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: <Sparkles className="w-5 h-5" />,
    href: '/dashboard/ai-assistant',
  },
  {
    id: 'audit',
    label: 'Content Audit',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/dashboard/audit',
    roles: ['admin', 'editor'],
  },
  {
    id: 'community',
    label: 'Community',
    icon: <Users className="w-5 h-5" />,
    href: '/dashboard/community',
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: <Layout className="w-5 h-5" />,
    href: '/dashboard/templates',
  },
];

const adminNavigation: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    href: '/dashboard/settings',
    roles: ['admin'],
  },
  {
    id: 'users',
    label: 'Users',
    icon: <UserCog className="w-5 h-5" />,
    href: '/dashboard/users',
    roles: ['admin'],
  },
  {
    id: 'branding',
    label: 'Branding',
    icon: <Palette className="w-5 h-5" />,
    href: '/dashboard/branding',
    roles: ['admin'],
  },
];
```

### Sidebar Visual Design

```
┌──────────────────────┐
│                      │
│  ┌────────────────┐  │
│  │   + Create     │  │  ← Primary CTA: Orange fill, white text
│  │                │  │    Hover: Scale 1.02, shadow elevation
│  └────────────────┘  │
│                      │
│  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  │  ← Subtle divider
│                      │
│  ┌────────────────┐  │
│  │ 📚  Knowledge  │  │  ← Active: Orange left border (3px)
│  │                │  │           Background: brand-primary-muted
│  │    ├ Articles  │  │           Text: text-primary
│  │    └ AI Index  │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ 🤖  AI Assist  │  │  ← Inactive: No border
│  └────────────────┘  │           Text: text-secondary
│                      │           Hover: surface-card bg
│  ┌────────────────┐  │
│  │ 📊  Audit      │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ 💬  Community  │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ 📋  Templates  │  │
│  └────────────────┘  │
│                      │
│  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  │
│                      │
│  ADMIN               │  ← Section label: text-tertiary, uppercase
│                      │    Font: 11px, letter-spacing: 0.05em
│  ┌────────────────┐  │
│  │ ⚙️  Settings   │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ 👥  Users      │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ 🎨  Branding   │  │
│  └────────────────┘  │
│                      │
└──────────────────────┘
     240px width
```

---

## 2.3 Landing Page

### Hero Section

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║                              [Subtle grid pattern background]                     ║
║                                                                                   ║
║     ┌─────────────────────────────────────────────────────────────────────────┐   ║
║     │  TYNEBASE        Features    Pricing    About         [Sign In] [Start] │   ║
║     └─────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                                                                                   ║
║                                                                                   ║
║                              ╭─────────────────────╮                              ║
║                              │   AI-POWERED  ✦     │   ← Pill badge              ║
║                              ╰─────────────────────╯     Orange border, muted bg  ║
║                                                                                   ║
║                                                                                   ║
║                       ██╗  ██╗███╗   ██╗ ██████╗ ██╗    ██╗                       ║
║                       ██║ ██╔╝████╗  ██║██╔═══██╗██║    ██║                       ║
║                       █████╔╝ ██╔██╗ ██║██║   ██║██║ █╗ ██║                       ║
║                       ██╔═██╗ ██║╚██╗██║██║   ██║██║███╗██║                       ║
║                       ██║  ██╗██║ ╚████║╚██████╔╝╚███╔███╔╝                       ║
║                       ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝                        ║
║                                                                                   ║
║                    K N O W L E D G E   T H A T   S C A L E S                      ║
║                                                                                   ║
║                          Transform how your team captures,                        ║
║                        organizes, and shares knowledge with                       ║
║                         AI-powered document intelligence.                         ║
║                                                                                   ║
║                                                                                   ║
║                  ┌──────────────────┐    ┌──────────────────┐                    ║
║                  │   Try Free →     │    │   Book Demo      │                    ║
║                  │                  │    │                  │                    ║
║                  └──────────────────┘    └──────────────────┘                    ║
║                    Orange fill, white      Ghost button,                          ║
║                    Scale on hover          border only                            ║
║                                                                                   ║
║                                                                                   ║
║                              ┌───────────────────┐                                ║
║                              │  Trusted by 50+   │                                ║
║                              │  companies        │                                ║
║                              └───────────────────┘                                ║
║                                                                                   ║
║                    [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                      ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Features Section

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║                                  WHY TYNEBASE                                     ║
║                                                                                   ║
║              Everything you need to build a world-class knowledge base            ║
║                                                                                   ║
║                                                                                   ║
║   ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  ║
║   │                         │  │                         │  │                 │  ║
║   │    ╭───────────────╮    │  │    ╭───────────────╮    │  │   ╭─────────╮   │  ║
║   │    │      🤖       │    │  │    │      🔒       │    │  │   │   👥    │   │  ║
║   │    │               │    │  │    │               │    │  │   │         │   │  ║
║   │    ╰───────────────╯    │  │    ╰───────────────╯    │  │   ╰─────────╯   │  ║
║   │                         │  │                         │  │                 │  ║
║   │    AI-Powered Docs      │  │    Secure & Compliant   │  │  Community     │  ║
║   │                         │  │                         │  │  Templates     │  ║
║   │    Generate articles    │  │    Enterprise-grade     │  │                 │  ║
║   │    from videos, audio,  │  │    security with GDPR   │  │  Share and     │  ║
║   │    and prompts. AI      │  │    compliance built     │  │  discover      │  ║
║   │    learns your style.   │  │    in from day one.     │  │  templates     │  ║
║   │                         │  │                         │  │  created by    │  ║
║   │                         │  │                         │  │  the community │  ║
║   │    [Learn more →]       │  │    [Learn more →]       │  │  [Browse →]    │  ║
║   │                         │  │                         │  │                 │  ║
║   └─────────────────────────┘  └─────────────────────────┘  └─────────────────┘  ║
║                                                                                   ║
║       Card styling:                                                               ║
║       - Background: surface-card                                                  ║
║       - Border: 1px border-subtle                                                 ║
║       - Border-radius: radius-xl (16px)                                           ║
║       - Padding: space-8 (32px)                                                   ║
║       - Hover: translateY(-4px), shadow-lg                                        ║
║       - Icon container: 64x64, radius-lg, brand-primary-muted bg                  ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Pricing Section

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║                              SIMPLE, TRANSPARENT PRICING                          ║
║                                                                                   ║
║                    Start free, upgrade when you need more power                   ║
║                                                                                   ║
║                                                                                   ║
║   ┌─────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐          ║
║   │                 │  │ ╭─────────────────────╮ │  │                 │          ║
║   │     FREE        │  │ │    MOST POPULAR     │ │  │   ENTERPRISE    │          ║
║   │                 │  │ ╰─────────────────────╯ │  │                 │          ║
║   │     $0          │  │                         │  │   Custom        │          ║
║   │    /month       │  │        PRO              │  │                 │          ║
║   │                 │  │                         │  │   Contact us    │          ║
║   │  ───────────    │  │       $49               │  │   for pricing   │          ║
║   │                 │  │      /month             │  │                 │          ║
║   │  ✓ 5 articles   │  │                         │  │  ───────────    │          ║
║   │  ✓ 10 AI gens   │  │  ───────────            │  │                 │          ║
║   │  ✓ 100MB store  │  │                         │  │  ✓ Unlimited    │          ║
║   │  ✓ 1 user       │  │  ✓ Unlimited articles  │  │  ✓ SSO/SAML     │          ║
║   │                 │  │  ✓ 500 AI generations  │  │  ✓ Dedicated    │          ║
║   │                 │  │  ✓ 50GB storage        │  │    support      │          ║
║   │  [Start Free]   │  │  ✓ 10 team members     │  │  ✓ Custom       │          ║
║   │                 │  │  ✓ Priority support    │  │    integrations │          ║
║   │  Ghost button   │  │  ✓ Content Audit       │  │  ✓ SLA          │          ║
║   │                 │  │                         │  │                 │          ║
║   │                 │  │  [Get Started →]        │  │  [Contact Us]   │          ║
║   │                 │  │                         │  │                 │          ║
║   │                 │  │  Orange fill button     │  │  Ghost button   │          ║
║   │                 │  │                         │  │                 │          ║
║   └─────────────────┘  └─────────────────────────┘  └─────────────────┘          ║
║                                                                                   ║
║        Default card           Highlighted card:              Default card         ║
║                               - Orange gradient border                            ║
║                               - Subtle orange glow                                ║
║                               - Scale: 1.02                                       ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 2.4 Knowledge Centre

### Articles List View

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   📚 Knowledge Centre                                                             ║
║                                                                                   ║
║   Your team's single source of truth                                              ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │  [All Articles]  [By Category]  [My Assigned]  [Drafts]      🔍 Search   │   ║
║   │       ▔▔▔▔▔▔▔▔                                                            │   ║
║   │       Active tab: orange underline (3px), bold text                       │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │  📄 Getting Started with TyneBase                                         │   ║
║   │     ╭──────────╮                                                          │   ║
║   │     │PUBLISHED │  •  Onboarding  •  Updated 2 days ago  •  1,234 views   │   ║
║   │     ╰──────────╯                                                          │   ║
║   │     Green badge                                                           │   ║
║   │                                                                           │   ║
║   │  Complete guide to setting up your workspace, inviting team members,      │   ║
║   │  and creating your first knowledge article...                             │   ║
║   │                                                                           │   ║
║   │     👁️ 1,234    💬 12    👍 89                              [···]        │   ║
║   │                                                                           │   ║
║   ├───────────────────────────────────────────────────────────────────────────┤   ║
║   │                                                                           │   ║
║   │  📄 Q1 2026 Product Roadmap                                               │   ║
║   │     ╭──────────╮                                                          │   ║
║   │     │IN REVIEW │  •  Product  •  Updated 5 hours ago                      │   ║
║   │     ╰──────────╯                                                          │   ║
║   │     Yellow/amber badge                                                    │   ║
║   │                                                                           │   ║
║   │  Strategic initiatives and feature releases planned for the first        │   ║
║   │  quarter of 2026...                                                       │   ║
║   │                                                                           │   ║
║   │     👁️ 89     💬 5     👍 12      🔔 Assigned to you          [···]       │   ║
║   │                                                                           │   ║
║   ├───────────────────────────────────────────────────────────────────────────┤   ║
║   │                                                                           │   ║
║   │  📄 Security Best Practices                                               │   ║
║   │     ╭───────╮                                                             │   ║
║   │     │ DRAFT │  •  Security  •  Updated yesterday                          │   ║
║   │     ╰───────╯                                                             │   ║
║   │     Gray badge                                                            │   ║
║   │                                                                           │   ║
║   │  Internal guidelines for maintaining security standards across            │   ║
║   │  all company operations...                                                │   ║
║   │                                                                           │   ║
║   │     👁️ 34     💬 2     👍 5                                  [···]        │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                           [← Previous]  1  2  3  ...  12  [Next →]                ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Document State Badges

```typescript
// /components/ui/StateBadge.tsx

const stateStyles = {
  draft: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    icon: FileEdit,
  },
  in_review: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: Clock,
  },
  published: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    icon: CheckCircle,
  },
  hidden: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    icon: EyeOff,
  },
  archived: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-500 dark:text-gray-500',
    icon: Archive,
  },
};
```

---

## 2.5 AI Document Assistant

### Hub Page

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🤖 AI Document Assistant                                                        ║
║                                                                                   ║
║   Generate professional documents from videos, prompts, or enhance                ║
║   existing content with AI-powered intelligence                                   ║
║                                                                                   ║
║                                                                                   ║
║   ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  ║
║   │                         │  │                         │  │                 │  ║
║   │  ┌───────────────────┐  │  │  ┌───────────────────┐  │  │  ┌───────────┐  │  ║
║   │  │                   │  │  │  │                   │  │  │  │           │  │  ║
║   │  │        ✨         │  │  │  │        🎥         │  │  │  │     ✏️    │  │  ║
║   │  │                   │  │  │  │                   │  │  │  │           │  │  ║
║   │  │   Gradient bg:    │  │  │  │   Gradient bg:    │  │  │  │ Gradient  │  │  ║
║   │  │   amber → orange  │  │  │  │   blue → indigo   │  │  │  │ green →   │  │  ║
║   │  │                   │  │  │  │                   │  │  │  │ emerald   │  │  ║
║   │  └───────────────────┘  │  │  └───────────────────┘  │  │  └───────────┘  │  ║
║   │                         │  │                         │  │                 │  ║
║   │      From Prompt        │  │      From Video         │  │ Enhance Content │  ║
║   │                         │  │                         │  │                 │  ║
║   │  Describe what you      │  │  Upload a video and     │  │ Improve existing│  ║
║   │  want and let AI        │  │  generate transcripts,  │  │ articles with   │  ║
║   │  write a complete       │  │  summaries, or full     │  │ AI-powered      │  ║
║   │  article for you        │  │  articles automatically │  │ suggestions     │  ║
║   │                         │  │                         │  │                 │  ║
║   │                         │  │                         │  │                 │  ║
║   │  ┌─────────────────┐    │  │  ┌─────────────────┐    │  │ ┌────────────┐  │  ║
║   │  │  Get Started →  │    │  │  │  Upload Video → │    │  │ │ Select  →  │  │  ║
║   │  └─────────────────┘    │  │  └─────────────────┘    │  │ └────────────┘  │  ║
║   │                         │  │                         │  │                 │  ║
║   └─────────────────────────┘  └─────────────────────────┘  └─────────────────┘  ║
║                                                                                   ║
║       Card hover effects:                                                         ║
║       - translateY(-8px)                                                          ║
║       - shadow-xl                                                                 ║
║       - Border: 1px brand-primary (subtle)                                        ║
║       - Transition: transition-spring                                             ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │  📋 Recent AI Generations                                    [View All →] │   ║
║   │                                                                           │   ║
║   │  ┌─────────────────────────────────────────────────────────────────────┐  │   ║
║   │  │                                                                     │  │   ║
║   │  │  ✨  Q4 Marketing Strategy Guide                                    │  │   ║
║   │  │      From Prompt  •  2 hours ago  •  1,847 words                   │  │   ║
║   │  │      ╭───────╮                                                      │  │   ║
║   │  │      │ DRAFT │                                                      │  │   ║
║   │  │      ╰───────╯                                                      │  │   ║
║   │  │                                                            [Open →] │  │   ║
║   │  │                                                                     │  │   ║
║   │  ├─────────────────────────────────────────────────────────────────────┤  │   ║
║   │  │                                                                     │  │   ║
║   │  │  🎥  Product Demo Transcript                                        │  │   ║
║   │  │      From Video  •  Yesterday  •  3,291 words                      │  │   ║
║   │  │      ╭───────────╮                                                  │  │   ║
║   │  │      │ PUBLISHED │                                                  │  │   ║
║   │  │      ╰───────────╯                                                  │  │   ║
║   │  │                                                            [Open →] │  │   ║
║   │  │                                                                     │  │   ║
║   │  ├─────────────────────────────────────────────────────────────────────┤  │   ║
║   │  │                                                                     │  │   ║
║   │  │  ✏️  Employee Onboarding Guide                                      │  │   ║
║   │  │      Enhanced  •  2 days ago  •  12 suggestions applied            │  │   ║
║   │  │      ╭───────╮                                                      │  │   ║
║   │  │      │ DRAFT │                                                      │  │   ║
║   │  │      ╰───────╯                                                      │  │   ║
║   │  │                                                            [Open →] │  │   ║
║   │  │                                                                     │  │   ║
║   │  └─────────────────────────────────────────────────────────────────────┘  │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │  📊 This Month's Usage                                                    │   ║
║   │                                                                           │   ║
║   │  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────┐   │   ║
║   │  │                     │  │                     │  │                 │   │   ║
║   │  │  AI Generations     │  │  Videos Processed   │  │  Enhancements   │   │   ║
║   │  │                     │  │                     │  │                 │   │   ║
║   │  │    23 / 50          │  │     5 / 10          │  │   12 / ∞        │   │   ║
║   │  │                     │  │                     │  │                 │   │   ║
║   │  │  ████████░░░░ 46%   │  │  █████░░░░░  50%    │  │   No limit     │   │   ║
║   │  │                     │  │                     │  │                 │   │   ║
║   │  └─────────────────────┘  └─────────────────────┘  └─────────────────┘   │   ║
║   │                                                                           │   ║
║   │                         [Upgrade for More →]                              │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### From Prompt Interface

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ← Back to AI Assistant                                                          ║
║                                                                                   ║
║   ✨ Generate from Prompt                                                         ║
║   Describe what you want to create and let AI write it for you                    ║
║                                                                                   ║
║   ┌───────────────────────────────────┬───────────────────────────────────────┐   ║
║   │                                   │                                       │   ║
║   │  What would you like to create?   │   📄 Live Preview                     │   ║
║   │                                   │                                       │   ║
║   │  ┌─────────────────────────────┐  │   ┌───────────────────────────────┐   │   ║
║   │  │                             │  │   │                               │   │   ║
║   │  │  Write a comprehensive      │  │   │   ┌─────────────────────────┐ │   │   ║
║   │  │  guide for new employees    │  │   │   │                         │ │   │   ║
║   │  │  on our company's security  │  │   │   │   # Security Guide      │ │   │   ║
║   │  │  policies, including        │  │   │   │                         │ │   │   ║
║   │  │  password requirements,     │  │   │   │   Welcome to our        │ │   │   ║
║   │  │  VPN usage, and data        │  │   │   │   comprehensive guide   │ │   │   ║
║   │  │  handling procedures...     │  │   │   │   to security best      │ │   │   ║
║   │  │                             │  │   │   │   practices at...       │ │   │   ║
║   │  │                             │  │   │   │                         │ │   │   ║
║   │  │                      📝 256 │  │   │   │   ## Password Policy    │ │   │   ║
║   │  └─────────────────────────────┘  │   │   │                         │ │   │   ║
║   │                                   │   │   │   Your password must:   │ │   │   ║
║   │                                   │   │   │   • Be at least 12...   │ │   │   ║
║   │  📋 Use Template                  │   │   │                         │ │   │   ║
║   │  ┌─────────────────────────────┐  │   │   │                         │ │   │   ║
║   │  │ Select a template...     ▼  │  │   │   │          ▼▼▼            │ │   │   ║
║   │  └─────────────────────────────┘  │   │   │      [Generating...]    │ │   │   ║
║   │                                   │   │   │                         │ │   │   ║
║   │                                   │   │   └─────────────────────────┘ │   │   ║
║   │  ⚙️ Generation Settings           │   │                               │   │   ║
║   │                                   │   │   Streaming output with       │   │   ║
║   │  Document Type                    │   │   typing animation            │   │   ║
║   │  ┌─────────────────────────────┐  │   │                               │   │   ║
║   │  │ 📖 Guide / How-To        ▼  │  │   └───────────────────────────────┘   │   ║
║   │  └─────────────────────────────┘  │                                       │   ║
║   │                                   │   ┌───────────────────────────────┐   │   ║
║   │  Tone of Voice                    │   │                               │   │   ║
║   │                                   │   │   After generation:           │   │   ║
║   │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │   │                               │   │   ║
║   │  │ Pro │ │Friend│ │Tech │ │Casual│ │   │   ┌───────────────────────┐ │   │   ║
║   │  │ ●   │ │ ○   │ │ ○   │ │ ○   │ │   │   │ Add to Knowledge Base?│ │   │   ║
║   │  └─────┘ └─────┘ └─────┘ └─────┘ │   │   │                       │ │   │   ║
║   │                                   │   │   │ This allows AI to use │ │   │   ║
║   │  Length                           │   │   │ this document as      │ │   │   ║
║   │  ┌─────────────────────────────┐  │   │   │ context for future    │ │   │   ║
║   │  │ ○ Short  ● Medium  ○ Long   │  │   │   │ generations.          │ │   │   ║
║   │  │   ~500    ~1,500    ~3,000  │  │   │   │                       │ │   │   ║
║   │  └─────────────────────────────┘  │   │   │ [Yes, Add] [Not Now]  │ │   │   ║
║   │                                   │   │   └───────────────────────┘ │   │   ║
║   │                                   │   │                               │   │   ║
║   │  🧠 Knowledge Context             │   │   [Save as Draft] [Publish]   │   │   ║
║   │  ☑️ Use existing knowledge base   │   │                               │   │   ║
║   │                                   │   └───────────────────────────────┘   │   ║
║   │                                   │                                       │   ║
║   │  ┌─────────────────────────────┐  │                                       │   ║
║   │  │    ✨ Generate Document     │  │                                       │   ║
║   │  │                             │  │                                       │   ║
║   │  │   Orange button, full width │  │                                       │   ║
║   │  │   Hover: scale 1.02, glow   │  │                                       │   ║
║   │  └─────────────────────────────┘  │                                       │   ║
║   │                                   │                                       │   ║
║   └───────────────────────────────────┴───────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### From Video Interface

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ← Back to AI Assistant                                                          ║
║                                                                                   ║
║   🎥 Generate from Video                                                          ║
║   Upload a video to generate transcripts, summaries, or full articles             ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │   ┌───────────────────────────────────────────────────────────────────┐   │   ║
║   │   │                                                                   │   │   ║
║   │   │                                                                   │   │   ║
║   │   │                      ┌─────────────────┐                          │   │   ║
║   │   │                      │                 │                          │   │   ║
║   │   │                      │    📁  +  🎬    │                          │   │   ║
║   │   │                      │                 │                          │   │   ║
║   │   │                      └─────────────────┘                          │   │   ║
║   │   │                                                                   │   │   ║
║   │   │              Drag and drop your video here                        │   │   ║
║   │   │                   or click to browse                              │   │   ║
║   │   │                                                                   │   │   ║
║   │   │         ╭──────────────────────────────────────────╮              │   │   ║
║   │   │         │  MP4, MOV, WebM, AVI  •  Max 500MB      │              │   │   ║
║   │   │         │  Maximum duration: 60 minutes           │              │   │   ║
║   │   │         ╰──────────────────────────────────────────╯              │   │   ║
║   │   │                                                                   │   │   ║
║   │   │   Drop zone styling:                                              │   │   ║
║   │   │   - Border: 2px dashed border-default                             │   │   ║
║   │   │   - Border-radius: radius-xl                                      │   │   ║
║   │   │   - Background: surface-card                                      │   │   ║
║   │   │   - Hover: border-brand-primary, bg-brand-primary-muted           │   │   ║
║   │   │   - Drag over: Scale 1.01, stronger border                        │   │   ║
║   │   │                                                                   │   │   ║
║   │   └───────────────────────────────────────────────────────────────────┘   │   ║
║   │                                                                           │   ║
║   │   ─────────────────────── OR paste a URL ───────────────────────────      │   ║
║   │                                                                           │   ║
║   │   ┌───────────────────────────────────────────────────────────────────┐   │   ║
║   │   │  https://                                                         │   │   ║
║   │   └───────────────────────────────────────────────────────────────────┘   │   ║
║   │                                                                           │   ║
║   │   Supported: YouTube, Vimeo, Loom, Google Drive                           │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                                                                                   ║
║   What would you like to generate?                                                ║
║                                                                                   ║
║   ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────┐  ║
║   │                         │  │                         │  │                 │  ║
║   │   ☑️ Transcript          │  │   ☑️ Summary             │  │   ☐ Full Article│  ║
║   │                         │  │                         │  │                 │  ║
║   │   Word-for-word         │  │   Key points and        │  │   Comprehensive │  ║
║   │   transcription with    │  │   main takeaways in     │  │   article based │  ║
║   │   timestamps            │  │   bullet form           │  │   on content    │  ║
║   │                         │  │                         │  │                 │  ║
║   │   ┌─────────────────┐   │  │   ┌─────────────────┐   │  │  ┌───────────┐  │  ║
║   │   │    Selected     │   │  │   │    Selected     │   │  │  │ Select    │  │  ║
║   │   │   ✓ checkmark   │   │  │   │   ✓ checkmark   │   │  │  │           │  │  ║
║   │   └─────────────────┘   │  │   └─────────────────┘   │  │  └───────────┘  │  ║
║   │                         │  │                         │  │                 │  ║
║   └─────────────────────────┘  └─────────────────────────┘  └─────────────────┘  ║
║                                                                                   ║
║       Selection card styling:                                                     ║
║       - Unselected: border-subtle, no shadow                                      ║
║       - Selected: border-brand-primary (2px), shadow-md                           ║
║       - Checkbox: custom, brand-primary fill when checked                         ║
║                                                                                   ║
║                                                                                   ║
║   Additional Options                                                              ║
║                                                                                   ║
║   ☐ Identify speakers (requires clear audio)                                      ║
║   ☐ Extract key quotes                                                            ║
║   ☐ Generate chapter markers                                                      ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                         🎥 Process Video                                  │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 2.6 Content Audit Dashboard

### Main Audit View

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   📊 Content Audit Dashboard                                                      ║
║                                                                                   ║
║   Comprehensive audit of your knowledge base content, quality,                    ║
║   and engagement metrics                                                          ║
║                                                                                   ║
║                                                                                   ║
║   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │      247        │  │      189        │  │       42        │  │     16      │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │  Total Articles │  │   Up to Date    │  │  Needs Review   │  │  Outdated   │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │   ↑ 12 this mo  │  │   ✓ 76.5%       │  │   ⚠ 17.0%       │  │   ✗ 6.5%   │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │   ─────────     │  │   ─────────     │  │   ─────────     │  │   ─────────  │ ║
║   │   Neutral bg    │  │   Green tint    │  │   Amber tint    │  │   Red tint  │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────┘ ║
║                                                                                   ║
║       Stat card styling:                                                          ║
║       - Large number: text-4xl, weight-bold                                       ║
║       - Label: text-sm, text-secondary                                            ║
║       - Trend/percentage: text-xs, colored by status                              ║
║       - Background: surface-card with subtle status tint                          ║
║       - Border-left: 4px solid status color                                       ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │   Content Status Overview                                 [Export Report] │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │                                                                     │ │   ║
║   │   │                    CONTENT HEALTH DISTRIBUTION                      │ │   ║
║   │   │                                                                     │ │   ║
║   │   │   ████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░   │ │   ║
║   │   │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒   │ │   ║
║   │   │                                                                     │ │   ║
║   │   │   ██ Up to Date (189)    ░░ Needs Review (42)    ▒▒ Outdated (16)   │ │   ║
║   │   │                                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   ┌──────────────────────────────┐  ┌──────────────────────────────────┐  │   ║
║   │   │                              │  │                                  │  │   ║
║   │   │   ENGAGEMENT TRENDS          │  │   TOP PERFORMING CONTENT         │  │   ║
║   │   │                              │  │                                  │  │   ║
║   │   │         ╭                    │  │   1. Getting Started Guide       │  │   ║
║   │   │        ╱ ╲     ╭╮            │  │      12,847 views • 94% helpful  │  │   ║
║   │   │   ╭───╯   ╲   ╱  ╲   ╭──     │  │                                  │  │   ║
║   │   │  ╱         ╲─╯    ╲─╯        │  │   2. API Documentation           │  │   ║
║   │   │ ╯                            │  │      8,234 views • 91% helpful   │  │   ║
║   │   │                              │  │                                  │  │   ║
║   │   │  Jan  Feb  Mar  Apr  May     │  │   3. Security Best Practices     │  │   ║
║   │   │                              │  │      6,129 views • 89% helpful   │  │   ║
║   │   │                              │  │                                  │  │   ║
║   │   └──────────────────────────────┘  └──────────────────────────────────┘  │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │   Content Requiring Attention                                             │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │                                                                     │ │   ║
║   │   │  [Outdated ▼]   [All Categories ▼]   [Sort: Last Updated ▼]   🔍   │ │   ║
║   │   │                                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │  ⚠️                                                                  │ │   ║
║   │   │  Legacy API Migration Guide                                         │ │   ║
║   │   │  ╭──────────╮                                                       │ │   ║
║   │   │  │ OUTDATED │  Last updated: 847 days ago                           │ │   ║
║   │   │  ╰──────────╯                                                       │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  This article hasn't been updated in over 2 years and may           │ │   ║
║   │   │  contain outdated information.                                      │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Engagement: 234 views (↓ 67%)  •  12 comments  •  45% helpful      │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Recommendation: Review and update or consider archiving            │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  [Update Article]  [Archive]  [Assign Review]  [View Details]       │ │   ║
║   │   │                                                                     │ │   ║
║   │   ├─────────────────────────────────────────────────────────────────────┤ │   ║
║   │   │  ⚠️                                                                  │ │   ║
║   │   │  Old Deployment Process                                             │ │   ║
║   │   │  ╭──────────╮                                                       │ │   ║
║   │   │  │ OUTDATED │  Last updated: 731 days ago                           │ │   ║
║   │   │  ╰──────────╯                                                       │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Low engagement combined with age suggests this content             │ │   ║
║   │   │  may no longer be relevant.                                         │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Engagement: 12 views (↓ 89%)  •  0 comments  •  33% helpful        │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Recommendation: Archive this article                               │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  [Update Article]  [Archive]  [Assign Review]  [View Details]       │ │   ║
║   │   │                                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │                          Showing 1-10 of 16 outdated articles             │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Audit Detail Modal

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                              [✕ Close]    │   ║
║   │                                                                           │   ║
║   │   📊 Audit Details: Legacy API Migration Guide                            │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │                                                                     │ │   ║
║   │   │   HEALTH SCORE                                                      │ │   ║
║   │   │                                                                     │ │   ║
║   │   │        ╭─────────────────╮                                          │ │   ║
║   │   │        │                 │                                          │ │   ║
║   │   │        │       32        │      ← Large circular gauge              │ │   ║
║   │   │        │      /100       │         Red fill, gray track             │ │   ║
║   │   │        │                 │         Animated on load                 │ │   ║
║   │   │        ╰─────────────────╯                                          │ │   ║
║   │   │                                                                     │ │   ║
║   │   │        CRITICAL - Immediate attention needed                        │ │   ║
║   │   │                                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │   ║
║   │   │ Freshness   │ │ Engagement  │ │ Accuracy    │ │ Completeness│        │   ║
║   │   │    12%      │ │    45%      │ │    ??%      │ │    78%      │        │   ║
║   │   │    ✗        │ │    ⚠        │ │   Unknown   │ │    ✓        │        │   ║
║   │   └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │   ║
║   │                                                                           │   ║
║   │   ─────────────────────────────────────────────────────────────────────   │   ║
║   │                                                                           │   ║
║   │   📈 Engagement Over Time                                                 │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │     ╭╮                                                              │ │   ║
║   │   │    ╱  ╲                                                             │ │   ║
║   │   │   ╱    ╲     ╭──╮                                                   │ │   ║
║   │   │  ╱      ╲───╯    ╲                                                  │ │   ║
║   │   │ ╱                  ╲────────────────────────                        │ │   ║
║   │   │                                                                     │ │   ║
║   │   │ 2024      Q1      Q2      Q3      Q4      2025      Q1      Now     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   Peak engagement: March 2024 (1,247 views)                               │   ║
║   │   Current month: 8 views (↓ 99% from peak)                                │   ║
║   │                                                                           │   ║
║   │   ─────────────────────────────────────────────────────────────────────   │   ║
║   │                                                                           │   ║
║   │   🎯 AI Recommendations                                                   │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │  1. Archive this article                                   [HIGH]   │ │   ║
║   │   │     Content appears to be superseded by newer documentation         │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  2. Create redirect to new API docs                        [MED]    │ │   ║
║   │   │     Users searching for this may need "Modern API Guide"            │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  3. Update or remove broken links                          [LOW]    │ │   ║
║   │   │     3 external links return 404 errors                              │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐   │   ║
║   │   │ Archive Article │  │ Assign to User  │  │ Schedule Review         │   │   ║
║   │   └─────────────────┘  └─────────────────┘  └─────────────────────────┘   │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### Content Audit Implementation

```typescript
// /lib/audit/content-audit.ts

interface ContentHealth {
  score: number;           // 0-100
  status: 'healthy' | 'needs_review' | 'outdated' | 'critical';
  factors: {
    freshness: HealthFactor;
    engagement: HealthFactor;
    completeness: HealthFactor;
    accuracy: HealthFactor;
  };
  recommendations: Recommendation[];
}

interface HealthFactor {
  score: number;           // 0-100
  weight: number;          // Contribution to overall score
  details: string;
  issues?: string[];
}

interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  reasoning: string;
  automatable: boolean;
}

interface AuditReport {
  generatedAt: Date;
  tenantId: string;
  summary: {
    totalArticles: number;
    healthyCount: number;
    needsReviewCount: number;
    outdatedCount: number;
    averageScore: number;
    scoreChange: number;    // vs last audit
  };
  distribution: {
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    byAge: Record<string, number>;
  };
  topPerformers: DocumentSummary[];
  needsAttention: DocumentAudit[];
  trends: {
    viewsOverTime: TimeSeriesData[];
    healthOverTime: TimeSeriesData[];
  };
}

// Audit calculation logic
async function calculateContentHealth(
  document: Document,
  metrics: DocumentMetrics
): Promise<ContentHealth> {
  const factors: ContentHealth['factors'] = {
    freshness: calculateFreshness(document),
    engagement: calculateEngagement(document, metrics),
    completeness: await calculateCompleteness(document),
    accuracy: { score: -1, weight: 0.2, details: 'Manual review required' },
  };

  // Weighted score calculation
  const score = Math.round(
    factors.freshness.score * factors.freshness.weight +
    factors.engagement.score * factors.engagement.weight +
    factors.completeness.score * factors.completeness.weight
  );

  // Determine status
  let status: ContentHealth['status'];
  if (score >= 80) status = 'healthy';
  else if (score >= 60) status = 'needs_review';
  else if (score >= 40) status = 'outdated';
  else status = 'critical';

  // Generate recommendations
  const recommendations = generateRecommendations(document, factors, metrics);

  return { score, status, factors, recommendations };
}

function calculateFreshness(document: Document): HealthFactor {
  const daysSinceUpdate = differenceInDays(new Date(), document.updatedAt);
  
  let score: number;
  let details: string;
  const issues: string[] = [];

  if (daysSinceUpdate <= 90) {
    score = 100;
    details = 'Recently updated';
  } else if (daysSinceUpdate <= 180) {
    score = 80;
    details = 'Updated within 6 months';
  } else if (daysSinceUpdate <= 365) {
    score = 60;
    details = 'Updated within 1 year';
    issues.push('Consider reviewing for accuracy');
  } else if (daysSinceUpdate <= 730) {
    score = 30;
    details = 'Over 1 year old';
    issues.push('High risk of outdated information');
  } else {
    score = 10;
    details = 'Over 2 years old';
    issues.push('Critical: Likely contains outdated information');
  }

  return { score, weight: 0.35, details, issues };
}

function calculateEngagement(
  document: Document,
  metrics: DocumentMetrics
): HealthFactor {
  const { viewCount, helpfulCount, commentCount, viewTrend } = metrics;
  
  // Normalize metrics relative to tenant averages
  const avgViews = metrics.tenantAverageViews || 100;
  const viewsRatio = viewCount / avgViews;
  
  // Calculate base score
  let score = Math.min(100, viewsRatio * 50);
  
  // Adjust for helpful percentage
  const helpfulRate = viewCount > 0 ? helpfulCount / viewCount : 0;
  score += helpfulRate * 30;
  
  // Adjust for trend (declining engagement is concerning)
  if (viewTrend < -50) {
    score -= 20;
  } else if (viewTrend < -25) {
    score -= 10;
  } else if (viewTrend > 25) {
    score += 10;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const issues: string[] = [];
  if (viewTrend < -50) issues.push('Engagement declining significantly');
  if (helpfulRate < 0.5 && viewCount > 50) issues.push('Low helpfulness rating');

  return {
    score,
    weight: 0.35,
    details: `${viewCount} views, ${Math.round(helpfulRate * 100)}% helpful`,
    issues,
  };
}

async function calculateCompleteness(document: Document): Promise<HealthFactor> {
  const issues: string[] = [];
  let score = 100;

  // Check for common completeness indicators
  const content = document.content || '';
  
  // Has meaningful content
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 100) {
    score -= 30;
    issues.push('Very short content');
  } else if (wordCount < 300) {
    score -= 15;
    issues.push('Consider expanding content');
  }

  // Has proper structure (headings)
  const hasHeadings = /^#{1,3}\s/m.test(content);
  if (!hasHeadings && wordCount > 300) {
    score -= 15;
    issues.push('Missing section headings');
  }

  // Check for broken links (simplified)
  const linkMatches = content.match(/\[.*?\]\(.*?\)/g) || [];
  // In real implementation, would validate links

  // Has metadata
  if (!document.categoryId) {
    score -= 10;
    issues.push('Not categorized');
  }

  return {
    score: Math.max(0, score),
    weight: 0.30,
    details: `${wordCount} words, ${linkMatches.length} links`,
    issues,
  };
}

function generateRecommendations(
  document: Document,
  factors: ContentHealth['factors'],
  metrics: DocumentMetrics
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Freshness-based recommendations
  if (factors.freshness.score < 30) {
    recommendations.push({
      id: 'archive',
      priority: 'high',
      action: 'Archive this article',
      reasoning: 'Content is over 2 years old with no recent updates',
      automatable: false,
    });
  } else if (factors.freshness.score < 60) {
    recommendations.push({
      id: 'review',
      priority: 'medium',
      action: 'Schedule content review',
      reasoning: 'Content may contain outdated information',
      automatable: true,
    });
  }

  // Engagement-based recommendations
  if (factors.engagement.score < 40 && factors.freshness.score < 50) {
    recommendations.push({
      id: 'consolidate',
      priority: 'medium',
      action: 'Consider consolidating with related articles',
      reasoning: 'Low engagement combined with age suggests redundancy',
      automatable: false,
    });
  }

  // Completeness-based recommendations
  if (factors.completeness.issues?.includes('Missing section headings')) {
    recommendations.push({
      id: 'structure',
      priority: 'low',
      action: 'Add section headings for better readability',
      reasoning: 'Structured content is easier to scan and reference',
      automatable: true,
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
```

### Audit Dashboard Component

```typescript
// /components/audit/AuditDashboard.tsx

interface AuditDashboardProps {
  report: AuditReport;
  onExport: () => void;
  onViewDetails: (documentId: string) => void;
  onBulkAction: (action: string, documentIds: string[]) => void;
}

export function AuditDashboard({
  report,
  onExport,
  onViewDetails,
  onBulkAction,
}: AuditDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Content Audit Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Comprehensive audit of your knowledge base content, quality,
            and engagement metrics
          </p>
        </div>
        <Button onClick={onExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          value={report.summary.totalArticles}
          label="Total Articles"
          trend={`↑ ${report.summary.newThisMonth} this month`}
          trendType="neutral"
        />
        <StatCard
          value={report.summary.healthyCount}
          label="Up to Date"
          percentage={report.summary.healthyCount / report.summary.totalArticles * 100}
          trendType="positive"
          accentColor="green"
        />
        <StatCard
          value={report.summary.needsReviewCount}
          label="Needs Review"
          percentage={report.summary.needsReviewCount / report.summary.totalArticles * 100}
          trendType="warning"
          accentColor="amber"
        />
        <StatCard
          value={report.summary.outdatedCount}
          label="Outdated"
          percentage={report.summary.outdatedCount / report.summary.totalArticles * 100}
          trendType="negative"
          accentColor="red"
        />
      </div>

      {/* Content Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Content Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Distribution Bar */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Content Health Distribution
              </h4>
              <HealthDistributionBar
                healthy={report.summary.healthyCount}
                needsReview={report.summary.needsReviewCount}
                outdated={report.summary.outdatedCount}
              />
            </div>

            {/* Top Performers */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Top Performing Content
              </h4>
              <div className="space-y-3">
                {report.topPerformers.slice(0, 5).map((doc, i) => (
                  <TopPerformerRow
                    key={doc.id}
                    rank={i + 1}
                    title={doc.title}
                    views={doc.viewCount}
                    helpfulRate={doc.helpfulRate}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementChart data={report.trends.viewsOverTime} />
        </CardContent>
      </Card>

      {/* Content Requiring Attention */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Content Requiring Attention</CardTitle>
            <div className="flex gap-2">
              <FilterDropdown
                options={['All', 'Outdated', 'Needs Review', 'Critical']}
                value={statusFilter}
                onChange={setStatusFilter}
              />
              <FilterDropdown
                options={['All Categories', ...categories]}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <AttentionCard
                key={item.id}
                document={item}
                onViewDetails={() => onViewDetails(item.id)}
                onAction={(action) => onBulkAction(action, [item.id])}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 2.7 Community Forum

### Discussion List

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   💬 Community                                                                    ║
║                                                                                   ║
║   Connect with your team, ask questions, and share knowledge                      ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │  [All Discussions]  [Announcements]  [Questions]  [Ideas]     [+ New]    │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │  📌                                                                       │   ║
║   │  Welcome to the TyneBase Community!                                       │   ║
║   │                                                                           │   ║
║   │  ╭─────────────────╮  ╭──────────╮                                        │   ║
║   │  │ 📢 Announcement │  │ 🔒 Locked │                                       │   ║
║   │  ╰─────────────────╯  ╰──────────╯                                        │   ║
║   │                                                                           │   ║
║   │  Introduction post with community guidelines and how to get started...    │   ║
║   │                                                                           │   ║
║   │  ┌──────┐                                                                 │   ║
║   │  │  👤  │  Admin  •  Posted Jan 1  •  23 replies  •  1.2k views          │   ║
║   │  └──────┘                                                                 │   ║
║   │                                                                           │   ║
║   ├───────────────────────────────────────────────────────────────────────────┤   ║
║   │                                                                           │   ║
║   │  How do I integrate TyneBase with Slack?                                  │   ║
║   │                                                                           │   ║
║   │  ╭────────────╮  ╭─────────╮                                              │   ║
║   │  │ ❓ Question │  │ ✓ Solved │                                            │   ║
║   │  ╰────────────╯  ╰─────────╯                                              │   ║
║   │      Blue badge      Green badge                                          │   ║
║   │                                                                           │   ║
║   │  I'm trying to set up notifications in Slack when new articles are...     │   ║
║   │                                                                           │   ║
║   │  ┌──────┐                                                                 │   ║
║   │  │  👤  │  Sarah M.  •  Posted 2 days ago  •  5 replies  •  89 views     │   ║
║   │  └──────┘                                                                 │   ║
║   │                                                                           │   ║
║   ├───────────────────────────────────────────────────────────────────────────┤   ║
║   │                                                                           │   ║
║   │  Feature Request: Dark mode for the editor                                │   ║
║   │                                                                           │   ║
║   │  ╭────────╮                                                               │   ║
║   │  │ 💡 Idea │                                                              │   ║
║   │  ╰────────╯                                                               │   ║
║   │      Purple badge                                                         │   ║
║   │                                                                           │   ║
║   │  Would love to see a dark mode option for the document editor...          │   ║
║   │                                                                           │   ║
║   │  ┌──────┐                                                                 │   ║
║   │  │  👤  │  James K.  •  Posted 5 hours ago  •  12 replies  •  234 views  │   ║
║   │  └──────┘                                                                 │   ║
║   │                                                                           │   ║
║   │       👍 47   •   Most upvoted this week                                  │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 2.8 Templates Library

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   📋 Templates                                                                    ║
║                                                                                   ║
║   Start with pre-built structures or create your own                              ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │  [All]  [My Templates]  [Public]  [Organization]      🔍  [+ Create]     │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║   ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐      ║
║   │                     │  │                     │  │                     │      ║
║   │  ┌───────────────┐  │  │  ┌───────────────┐  │  │  ┌───────────────┐  │      ║
║   │  │    📖        │  │  │  │    🎓        │  │  │  │    ❓        │  │      ║
║   │  │               │  │  │  │               │  │  │  │               │  │      ║
║   │  └───────────────┘  │  │  └───────────────┘  │  │  └───────────────┘  │      ║
║   │                     │  │                     │  │                     │      ║
║   │  User Guide         │  │  Tutorial           │  │  FAQ                │      ║
║   │                     │  │                     │  │                     │      ║
║   │  Step-by-step       │  │  Walk users through │  │  Answer common      │      ║
║   │  instructions for   │  │  completing a       │  │  questions in a     │      ║
║   │  using features     │  │  specific task      │  │  structured format  │      ║
║   │                     │  │                     │  │                     │      ║
║   │  ╭────────╮         │  │  ╭────────╮         │  │  ╭────────╮         │      ║
║   │  │ Public │         │  │  │ Public │         │  │  │ Public │         │      ║
║   │  ╰────────╯         │  │  ╰────────╯         │  │  ╰────────╯         │      ║
║   │                     │  │                     │  │                     │      ║
║   │  Used 1,234 times   │  │  Used 892 times     │  │  Used 756 times     │      ║
║   │                     │  │                     │  │                     │      ║
║   │  [Use Template]     │  │  [Use Template]     │  │  [Use Template]     │      ║
║   │                     │  │                     │  │                     │      ║
║   └─────────────────────┘  └─────────────────────┘  └─────────────────────┘      ║
║                                                                                   ║
║   ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐      ║
║   │                     │  │                     │  │                     │      ║
║   │  ┌───────────────┐  │  │  ┌───────────────┐  │  │  ┌───────────────┐  │      ║
║   │  │    📊        │  │  │  │    📝        │  │  │  │    📋        │  │      ║
║   │  └───────────────┘  │  │  └───────────────┘  │  │  └───────────────┘  │      ║
║   │                     │  │                     │  │                     │      ║
║   │  Report             │  │  Meeting Notes      │  │  Policy Document    │      ║
║   │                     │  │                     │  │                     │      ║
║   │  Present findings   │  │  Capture action     │  │  Define company     │      ║
║   │  and data in a      │  │  items and key      │  │  policies with      │      ║
║   │  professional format│  │  decisions          │  │  clear structure    │      ║
║   │                     │  │                     │  │                     │      ║
║   │  ╭────────╮         │  │  ╭────────────╮     │  │  ╭──────────────╮   │      ║
║   │  │ Public │         │  │  │ Organization│    │  │  │ Organization │   │      ║
║   │  ╰────────╯         │  │  ╰────────────╯     │  │  ╰──────────────╯   │      ║
║   │                     │  │                     │  │                     │      ║
║   │  Used 543 times     │  │  Used 234 times     │  │  Used 189 times     │      ║
║   │                     │  │                     │  │                     │      ║
║   │  [Use Template]     │  │  [Use Template]     │  │  [Use Template]     │      ║
║   │                     │  │                     │  │                     │      ║
║   └─────────────────────┘  └─────────────────────┘  └─────────────────────┘      ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

---

# Part III: Multi-Tenancy & Data Isolation

## 3.1 Isolation Architecture

TyneBase implements a **4-layer defense-in-depth** approach:

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                           MULTI-TENANCY ISOLATION LAYERS                          ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║   LAYER 1: NETWORK / DNS                                                          ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │  acme.tynebase.com  ──►  Tenant validation in middleware                    │ ║
║   │  globex.tynebase.com ──►  Invalid subdomain → 404                           │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                       │                                           ║
║                                       ▼                                           ║
║   LAYER 2: APPLICATION                                                            ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │  • Tenant ID extracted from JWT claims                                      │ ║
║   │  • All API routes validate tenant context                                   │ ║
║   │  • Service-layer tenant scoping                                             │ ║
║   │  • No cross-tenant API calls possible                                       │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                       │                                           ║
║                                       ▼                                           ║
║   LAYER 3: DATABASE (RLS)                                                         ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │  • All tables have tenant_id column                                         │ ║
║   │  • RLS policies enforce tenant filtering                                    │ ║
║   │  • Tenant context set via session variables                                 │ ║
║   │  • Even raw SQL cannot bypass RLS                                           │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                       │                                           ║
║                                       ▼                                           ║
║   LAYER 4: STORAGE                                                                ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │  • Per-tenant storage buckets (tenant-{uuid})                               │ ║
║   │  • Bucket-level RLS policies                                                │ ║
║   │  • Signed URLs include tenant validation                                    │ ║
║   │  • No direct public access                                                  │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

## 3.2 Row Level Security Policies

```sql
-- ════════════════════════════════════════════════════════════════════════════════
-- TENANT CONTEXT FUNCTIONS
-- ════════════════════════════════════════════════════════════════════════════════

-- Set tenant context (called at start of each request)
CREATE OR REPLACE FUNCTION set_tenant_context(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', p_tenant_id::TEXT, TRUE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get current tenant ID
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_tenant_id', TRUE), '')::UUID;
END;
$$ LANGUAGE plpgsql STABLE;

-- ════════════════════════════════════════════════════════════════════════════════
-- DOCUMENTS TABLE RLS
-- ════════════════════════════════════════════════════════════════════════════════

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- All users in tenant can view published documents
CREATE POLICY "documents_select_published" ON documents
  FOR SELECT
  USING (
    tenant_id = get_current_tenant_id()
    AND state = 'published'
  );

-- Editors/Admins can see all documents
CREATE POLICY "documents_select_all" ON documents
  FOR SELECT
  USING (
    tenant_id = get_current_tenant_id()
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND tenant_id = get_current_tenant_id()
      AND role IN ('admin', 'editor')
    )
  );

-- Contributors can see their own drafts
CREATE POLICY "documents_select_own_drafts" ON documents
  FOR SELECT
  USING (
    tenant_id = get_current_tenant_id()
    AND author_id = auth.uid()
  );

-- Insert: Admins, Editors, Contributors
CREATE POLICY "documents_insert" ON documents
  FOR INSERT
  WITH CHECK (
    tenant_id = get_current_tenant_id()
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND tenant_id = get_current_tenant_id()
      AND role IN ('admin', 'editor', 'contributor')
    )
  );

-- Update: Admins/Editors can update any, Contributors only their own
CREATE POLICY "documents_update" ON documents
  FOR UPDATE
  USING (
    tenant_id = get_current_tenant_id()
    AND (
      EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND tenant_id = get_current_tenant_id()
        AND role IN ('admin', 'editor')
      )
      OR author_id = auth.uid()
    )
  );

-- Delete: Only admins
CREATE POLICY "documents_delete" ON documents
  FOR DELETE
  USING (
    tenant_id = get_current_tenant_id()
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND tenant_id = get_current_tenant_id()
      AND role = 'admin'
    )
  );
```

## 3.3 Application-Layer Tenant Context

```typescript
// /lib/tenant/context.ts

export class TenantContext {
  private tenantId: string | null = null;
  private tenantData: Tenant | null = null;

  static async fromRequest(request: Request): Promise<TenantContext> {
    const context = new TenantContext();
    
    // Extract tenant from subdomain
    const hostname = request.headers.get('host') || '';
    const subdomain = hostname.split('.')[0];
    
    if (subdomain === 'www' || subdomain === 'tynebase') {
      return context; // Main domain, no tenant
    }
    
    // Validate tenant exists
    const supabase = createServerClient();
    const { data: tenant } = await supabase
      .from('tenants')
      .select('*')
      .eq('subdomain', subdomain)
      .single();
    
    if (tenant) {
      context.tenantId = tenant.id;
      context.tenantData = tenant;
    }
    
    return context;
  }

  async withDatabaseContext<T>(
    operation: (supabase: SupabaseClient) => Promise<T>
  ): Promise<T> {
    const supabase = createServerClient();
    
    // Set RLS context
    await supabase.rpc('set_tenant_context', { 
      p_tenant_id: this.getTenantId() 
    });
    
    return await operation(supabase);
  }
}
```

---

# Part IV: AI Engine & RAG Pipeline

## 4.1 AI Provider Routing (EU/UK Compliant)

All AI processing routes through EU/UK data centers for GDPR compliance.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        AI PROVIDER ROUTING                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   User/Tenant Preference                                                        │
│          │                                                                      │
│          ▼                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                      AI Router Service                                  │  │
│   │                                                                         │  │
│   │   preference = tenant.ai_provider || user.ai_provider || 'openai'       │  │
│   └───────────────────────────┬─────────────────────────────────────────────┘  │
│                               │                                                 │
│         ┌─────────────────────┼─────────────────────┐                          │
│         │                     │                     │                          │
│         ▼                     ▼                     ▼                          │
│   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                 │
│   │   OpenAI      │    │  Vertex AI    │    │  AWS Bedrock  │                 │
│   │   (Direct)    │    │  (Google)     │    │  (Anthropic)  │                 │
│   │               │    │               │    │               │                 │
│   │  EU Endpoint  │    │  London       │    │  London       │                 │
│   │  GPT-/5.2    │    │  Gemini 3 /pro/flash   │    │  Claude 4.5    │        │
│   │  Whisper      │    │               │    │               │                 │
│   └───────────────┘    └───────────────┘    └───────────────┘                 │
│         │                     │                     │                          │
│         └─────────────────────┼─────────────────────┘                          │
│                               │                                                 │
│                               ▼                                                 │
│                    ┌─────────────────────┐                                     │
│                    │   Unified Response  │                                     │
│                    │   (Same format)     │                                     │
│                    └─────────────────────┘                                     │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Provider Configuration

```typescript
// /lib/ai/providers.ts

export const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: {
      text: 'gpt-5.2',
      transcription: 'whisper-1',
      embedding: 'text-embedding-3-large',
    },
    baseUrl: 'https://eu.api.openai.com/v1',  // EU endpoint
    region: 'EU',
  },
  
  google: {
    name: 'Google (Gemini)',
    models: {
      text: 'gemini-3-pro', // Document generation, best multimodal understaning
      video: 'gemini-3-flash',  // Native video understanding
    },
    project: process.env.GCP_PROJECT_ID,
    region: 'europe-west2',  // London
  },
  
  anthropic: {
    name: 'Anthropic (Claude)',
    models: {
      text: 'anthropic.claude-sonnet-4.5',  // Document generation, claude quality   
    },
    region: 'eu-west-2',  // London via AWS Bedrock
  },
} as const;

export type AIProvider = keyof typeof AI_PROVIDERS;
```

### Provider Selection Logic

```typescript
// /lib/ai/router.ts

export async function getAIClient(
  tenantId: string, 
  userId?: string
): Promise<AIClient> {
  // Check user preference first, then tenant, then default
  const preference = await getAIPreference(tenantId, userId);
  
  switch (preference) {
    case 'openai':
      return new OpenAIClient({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://eu.api.openai.com/v1',
      });
      
    case 'google':
      return new VertexAIClient({
        project: process.env.GCP_PROJECT_ID,
        location: 'europe-west2',
      });
      
    case 'anthropic':
      return new BedrockClient({
        region: 'eu-west-2',
        credentials: fromEnv(),
      });
      
    default:
      return new OpenAIClient({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://eu.api.openai.com/v1',
      });
  }
}
```

## 4.2 Architecture Overview

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                              AI PIPELINE ARCHITECTURE                             ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║                           ┌─────────────────────┐                                 ║
║                           │    User Request     │                                 ║
║                           │  (Files + Prompt)   │                                 ║
║                           └──────────┬──────────┘                                 ║
║                                      │                                            ║
║                                      ▼                                            ║
║                           ┌─────────────────────┐                                 ║
║                           │   Input Processor   │                                 ║
║                           │  (Type Detection)   │                                 ║
║                           └──────────┬──────────┘                                 ║
║                                      │                                            ║
║             ┌────────────────────────┼────────────────────────┐                   ║
║             │                        │                        │                   ║
║             ▼                        ▼                        ▼                   ║
║      ┌─────────────┐         ┌─────────────┐         ┌─────────────┐             ║
║      │   Video     │         │   Audio     │         │  Document   │             ║
║      │  Processor  │         │  Processor  │         │  Processor  │             ║
║      │ (Vertex AI) │         │(OpenAI EU)  │         │  (Parser)   │             ║
║      └──────┬──────┘         └──────┬──────┘         └──────┬──────┘             ║
║             │                        │                        │                   ║
║             └────────────────────────┼────────────────────────┘                   ║
║                                      │                                            ║
║                                      ▼                                            ║
║                           ┌─────────────────────┐                                 ║
║                           │   Text Normalizer   │                                 ║
║                           │   (→ Markdown)      │                                 ║
║                           └──────────┬──────────┘                                 ║
║                                      │                                            ║
║             ┌────────────────────────┴────────────────────────┐                   ║
║             │                                                 │                   ║
║             ▼                                                 ▼                   ║
║   ┌─────────────────────┐                       ┌─────────────────────┐           ║
║   │  RAG Context        │                       │  Direct Generation  │           ║
║   │  Retrieval          │                       │  (if no KB match)   │           ║
║   │                     │                       │                     │           ║
║   │  1. Embed query     │                       │                     │           ║
║   │  2. Vector search   │                       │                     │           ║
║   │  3. Rerank results  │                       │                     │           ║
║   │  4. Build context   │                       │                     │           ║
║   └──────────┬──────────┘                       └──────────┬──────────┘           ║
║              │                                              │                     ║
║              └──────────────────┬───────────────────────────┘                     ║
║                                 │                                                 ║
║                                 ▼                                                 ║
║                      ┌─────────────────────┐                                      ║
║                      │   Selected LLM      │                                      ║
║                      │   (via AI Router)   │                                      ║
║                      │                     │                                      ║
║                      │   OpenAI / Gemini / │                                      ║
║                      │   Claude based on   │                                      ║
║                      │   user preference   │                                      ║
║                      └──────────┬──────────┘                                      ║
║                                 │                                                 ║
║                                 ▼                                                 ║
║                      ┌─────────────────────┐                                      ║
║                      │   Output Processor  │                                      ║
║                      │                     │                                      ║
║                      │   - Format output   │                                      ║
║                      │   - Save as Draft   │                                      ║
║                      │   - Log lineage     │                                      ║
║                      │   - Queue indexing  │                                      ║
║                      └─────────────────────┘                                      ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

## 4.3 Vector Embedding System

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Document embeddings table
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  chunk_tokens INTEGER NOT NULL,
  embedding vector(3072),  -- UPDATED: text-embedding-3-large dimension (was 1536)
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(document_id, chunk_index)
);

-- HNSW index for fast similarity search
CREATE INDEX document_embeddings_embedding_idx 
  ON document_embeddings 
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding vector(3072), -- UPDATED: 3072 dimensions for text-embedding-3-large
  match_tenant_id UUID,
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  document_title TEXT,
  chunk_text TEXT,
  chunk_index INT,
  similarity FLOAT,
  metadata JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    de.id,
    de.document_id,
    d.title as document_title,
    de.chunk_text,
    de.chunk_index,
    1 - (de.embedding <=> query_embedding) as similarity,
    de.metadata
  FROM document_embeddings de
  JOIN documents d ON d.id = de.document_id
  WHERE de.tenant_id = match_tenant_id
    AND d.is_public = TRUE
    AND 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

## 4.4 Document Normalization to Markdown

All documents are normalized to Markdown format before chunking. This preserves structure and improves LLM comprehension.

### Why Markdown Normalization?

- **Structure preservation**: Headings, tables, lists survive processing
- **LLM-friendly**: Models are trained extensively on Markdown
- **Consistent chunking**: Easier to split at semantic boundaries
- **Rich context**: Bold, links, code blocks provide semantic signals

### Normalization Pipeline

```typescript
// /lib/ai/normalization.ts

import { PyMuPDF4LLM } from 'pymupdf4llm';  // For PDFs
import mammoth from 'mammoth';               // For DOCX
import TurndownService from 'turndown';      // For HTML

interface NormalizedDocument {
  markdown: string;
  metadata: {
    title: string;
    headings: { level: number; text: string; position: number }[];
    tableCount: number;
    imageCount: number;
    wordCount: number;
  };
}

export async function normalizeToMarkdown(
  content: Buffer | string,
  mimeType: string,
  filename: string
): Promise<NormalizedDocument> {
  let markdown: string;
  
  switch (mimeType) {
    case 'application/pdf':
      // PyMuPDF4LLM preserves tables, headings, and structure
      markdown = await extractPdfToMarkdown(content);
      break;
      
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      // Mammoth converts DOCX with style preservation
      const result = await mammoth.convertToMarkdown({ buffer: content });
      markdown = result.value;
      break;
      
    case 'text/html':
      // Turndown converts HTML to clean Markdown
      const turndown = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
      });
      markdown = turndown.turndown(content.toString());
      break;
      
    case 'text/markdown':
      markdown = content.toString();
      break;
      
    default:
      // Plain text - wrap in basic structure
      markdown = `# ${filename}\n\n${content.toString()}`;
  }
  
  // Clean and normalize
  markdown = cleanMarkdown(markdown);
  
  // Extract metadata for chunking hints
  const metadata = extractMetadata(markdown);
  
  return { markdown, metadata };
}

function cleanMarkdown(md: string): string {
  return md
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    // Remove excessive blank lines (max 2)
    .replace(/\n{3,}/g, '\n\n')
    // Normalize header spacing
    .replace(/^(#{1,6})\s*/gm, '$1 ')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Normalize list markers
    .replace(/^[*+-]\s/gm, '- ')
    // Ensure headers have blank line before
    .replace(/([^\n])\n(#{1,6} )/g, '$1\n\n$2')
    .trim();
}

function extractMetadata(markdown: string) {
  const headings: { level: number; text: string; position: number }[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      position: match.index,
    });
  }
  
  return {
    title: headings[0]?.text || 'Untitled',
    headings,
    tableCount: (markdown.match(/\|.*\|/g) || []).length / 2,
    imageCount: (markdown.match(/!\[.*?\]\(.*?\)/g) || []).length,
    wordCount: markdown.split(/\s+/).length,
  };
}
```

---

## 4.5 Intelligent Semantic Chunking

Based on 2025 RAG research, we use a **hybrid chunking strategy** that preserves document structure while maintaining semantic coherence.

### Chunking Strategy Comparison

| Strategy | Accuracy Improvement | Best For |
|----------|---------------------|----------|
| Fixed-size | Baseline | Prototyping only |
| Recursive | +15-25% | General documents |
| Semantic | +40-70% | Knowledge bases, technical docs |
| By-Title/Heading | +30-45% | Structured reports, manuals |
| **Hybrid (Our Choice)** | **+50-70%** | **All document types** |

### Our Approach: Structure-Aware Semantic Chunking

1. **First pass**: Split by document structure (headings, sections)
2. **Second pass**: Apply semantic chunking within large sections
3. **Third pass**: Merge small adjacent chunks if semantically similar
4. **Final**: Add contextual prefix to each chunk (document title + parent heading)

```typescript
// /lib/ai/chunking.ts

import { encode, decode } from 'gpt-tokenizer';  // OpenAI tokenizer
import { OpenAI } from 'openai';

interface ChunkConfig {
  maxTokens: number;           // Target chunk size (256-512 optimal)
  overlapTokens: number;       // Overlap between chunks (10-20%)
  minChunkTokens: number;      // Minimum viable chunk
  semanticThreshold: number;   // Similarity threshold for merging (0.85)
  addContextPrefix: boolean;   // Prepend title + heading to each chunk
}

const DEFAULT_CONFIG: ChunkConfig = {
  maxTokens: 400,              // Sweet spot for retrieval precision
  overlapTokens: 50,           // ~12% overlap
  minChunkTokens: 50,          // Don't create tiny chunks
  semanticThreshold: 0.85,     // Merge highly similar adjacent chunks
  addContextPrefix: true,      // Critical for context preservation
};

interface Chunk {
  id: string;
  text: string;
  tokens: number;
  metadata: {
    documentId: string;
    documentTitle: string;
    sectionHeading: string | null;
    chunkIndex: number;
    startPosition: number;
    endPosition: number;
  };
}

export async function chunkDocument(
  normalizedDoc: NormalizedDocument,
  documentId: string,
  config: ChunkConfig = DEFAULT_CONFIG
): Promise<Chunk[]> {
  const { markdown, metadata } = normalizedDoc;
  const chunks: Chunk[] = [];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 1: Split by document structure (headings)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const sections = splitByHeadings(markdown, metadata.headings);
  
  for (const section of sections) {
    const sectionTokens = encode(section.content).length;
    
    if (sectionTokens <= config.maxTokens) {
      // Section fits in one chunk - use as-is
      chunks.push(createChunk(section, documentId, metadata.title, chunks.length, config));
    } else {
      // ═══════════════════════════════════════════════════════════════════════
      // PASS 2: Large section - apply semantic paragraph chunking
      // ═══════════════════════════════════════════════════════════════════════
      
      const subChunks = await semanticParagraphChunk(
        section.content,
        section.heading,
        config
      );
      
      for (const subChunk of subChunks) {
        chunks.push(createChunk(
          { ...section, content: subChunk },
          documentId,
          metadata.title,
          chunks.length,
          config
        ));
      }
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 3: Merge tiny adjacent chunks if semantically similar
  // ═══════════════════════════════════════════════════════════════════════════
  
  const mergedChunks = await mergeSmallChunks(chunks, config);
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PASS 4: Add contextual prefix to each chunk
  // ═══════════════════════════════════════════════════════════════════════════
  
  if (config.addContextPrefix) {
    return addContextualPrefixes(mergedChunks);
  }
  
  return mergedChunks;
}

/**
 * Split markdown by heading structure
 */
function splitByHeadings(
  markdown: string,
  headings: { level: number; text: string; position: number }[]
): { content: string; heading: string | null; level: number }[] {
  if (headings.length === 0) {
    return [{ content: markdown, heading: null, level: 0 }];
  }
  
  const sections: { content: string; heading: string | null; level: number }[] = [];
  
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].position;
    const end = headings[i + 1]?.position || markdown.length;
    const content = markdown.slice(start, end).trim();
    
    sections.push({
      content,
      heading: headings[i].text,
      level: headings[i].level,
    });
  }
  
  // Include any content before first heading
  if (headings[0].position > 0) {
    sections.unshift({
      content: markdown.slice(0, headings[0].position).trim(),
      heading: null,
      level: 0,
    });
  }
  
  return sections.filter(s => s.content.length > 0);
}

/**
 * Semantic paragraph chunking for large sections
 * Uses sentence boundaries and semantic similarity to find natural break points
 */
async function semanticParagraphChunk(
  text: string,
  sectionHeading: string | null,
  config: ChunkConfig
): Promise<string[]> {
  // Split into paragraphs first
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const chunks: string[] = [];
  let currentChunk = '';
  let currentTokens = 0;
  
  for (const para of paragraphs) {
    const paraTokens = encode(para).length;
    
    if (currentTokens + paraTokens <= config.maxTokens) {
      // Add paragraph to current chunk
      currentChunk += (currentChunk ? '\n\n' : '') + para;
      currentTokens += paraTokens;
    } else if (paraTokens > config.maxTokens) {
      // Paragraph too large - split by sentences
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
        currentTokens = 0;
      }
      
      const sentenceChunks = splitBySentences(para, config.maxTokens, config.overlapTokens);
      chunks.push(...sentenceChunks);
    } else {
      // Start new chunk
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = para;
      currentTokens = paraTokens;
    }
  }
  
  // Don't forget the last chunk
  if (currentChunk && encode(currentChunk).length >= config.minChunkTokens) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

/**
 * Split by sentences with overlap for very long paragraphs
 */
function splitBySentences(
  text: string,
  maxTokens: number,
  overlapTokens: number
): string[] {
  // Sentence boundary detection (handles abbreviations, decimals, etc.)
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [text];
  
  const chunks: string[] = [];
  let currentChunk = '';
  let currentTokens = 0;
  let overlapBuffer: string[] = [];
  
  for (const sentence of sentences) {
    const sentenceTokens = encode(sentence).length;
    
    if (currentTokens + sentenceTokens <= maxTokens) {
      currentChunk += sentence;
      currentTokens += sentenceTokens;
      overlapBuffer.push(sentence);
      
      // Keep only recent sentences for overlap
      while (encode(overlapBuffer.join('')).length > overlapTokens && overlapBuffer.length > 1) {
        overlapBuffer.shift();
      }
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      // Start new chunk with overlap from previous
      currentChunk = overlapBuffer.join('') + sentence;
      currentTokens = encode(currentChunk).length;
      overlapBuffer = [sentence];
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

/**
 * Add contextual prefix to each chunk for better retrieval
 * This is critical - chunks without context lose meaning
 */
function addContextualPrefixes(chunks: Chunk[]): Chunk[] {
  return chunks.map(chunk => {
    const prefix = [
      chunk.metadata.documentTitle,
      chunk.metadata.sectionHeading,
    ].filter(Boolean).join(' > ');
    
    const prefixedText = prefix 
      ? `[${prefix}]\n\n${chunk.text}`
      : chunk.text;
    
    return {
      ...chunk,
      text: prefixedText,
      tokens: encode(prefixedText).length,
    };
  });
}

function createChunk(
  section: { content: string; heading: string | null },
  documentId: string,
  documentTitle: string,
  index: number,
  config: ChunkConfig
): Chunk {
  return {
    id: `${documentId}-chunk-${index}`,
    text: section.content,
    tokens: encode(section.content).length,
    metadata: {
      documentId,
      documentTitle,
      sectionHeading: section.heading,
      chunkIndex: index,
      startPosition: 0,  // Would be calculated from original
      endPosition: section.content.length,
    },
  };
}
```

---

## 4.6 Embedding Generation (OpenAI EU)

```typescript
// /lib/ai/embeddings.ts

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://eu.api.openai.com/v1',  // EU endpoint for GDPR
});

// OpenAI text-embedding-3-large: 1536 dimensions, 8191 max tokens
const EMBEDDING_MODEL = 'text-embedding-3-large';
const EMBEDDING_DIMENSIONS = 1536;
const MAX_TOKENS_PER_REQUEST = 8191;
const BATCH_SIZE = 100;  // Max items per batch request

export async function generateEmbeddings(
  chunks: Chunk[]
): Promise<{ chunkId: string; embedding: number[] }[]> {
  const results: { chunkId: string; embedding: number[] }[] = [];
  
  // Process in batches
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch.map(c => c.text),
      dimensions: EMBEDDING_DIMENSIONS,
    });
    
    for (let j = 0; j < batch.length; j++) {
      results.push({
        chunkId: batch[j].id,
        embedding: response.data[j].embedding,
      });
    }
  }
  
  return results;
}

export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: query,
    dimensions: EMBEDDING_DIMENSIONS,
  });
  
  return response.data[0].embedding;
}
```

---

## 4.7 Two-Stage RAG Retrieval with Reranking

Research shows reranking improves retrieval accuracy by 20-48%. We use a two-stage approach:

    Stage 1: Fast vector similarity search (retrieve top 50)

    Stage 2: Cross-encoder reranking (select top 5-10)

Reranking Model Options
Model	Latency	Accuracy	Provider	Region
Cohere Rerank v3.5	200-400ms	Highest	AWS Bedrock	EU (Frankfurt)
Google Semantic Ranker	300-500ms	High	Vertex AI	EU (Netherlands)
Mixedbread mxbai-v2	100-200ms	High	Local (ONNX)	Local (Fly.io)

```typescript
// /lib/ai/rag.ts

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Initialize Bedrock in EU (Frankfurt) for GDPR compliance
const bedrock = new BedrockRuntimeClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

interface RAGConfig {
  initialRetrievalCount: number;  // How many to retrieve initially
  finalCount: number;             // How many to return after reranking
  similarityThreshold: number;    // Minimum similarity score
  maxContextTokens: number;       // Max tokens for LLM context
  useReranking: boolean;          // Enable cross-encoder reranking
}

const DEFAULT_RAG_CONFIG: RAGConfig = {
  initialRetrievalCount: 50,      // Retrieve 50 candidates
  finalCount: 5,                  // Return top 5 after reranking
  similarityThreshold: 0.5,       // Minimum cosine similarity
  maxContextTokens: 4000,         // Leave room for prompt and response
  useReranking: true,
};

interface RetrievedChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  text: string;
  similarity: number;
  rerankScore?: number;
}

export async function retrieveContext(
  tenantId: string,
  query: string,
  config: RAGConfig = DEFAULT_RAG_CONFIG
): Promise<{ context: string; sources: RetrievedChunk[] }> {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 1: Vector Similarity Search (Fast, Broad)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const queryEmbedding = await generateQueryEmbedding(query);
  
  const { data: candidates, error } = await supabase.rpc('match_document_chunks', {
    query_embedding: queryEmbedding,
    match_tenant_id: tenantId,
    match_threshold: config.similarityThreshold,
    match_count: config.initialRetrievalCount,
  });
  
  if (error || !candidates?.length) {
    return { context: '', sources: [] };
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 2: Cross-Encoder Reranking (Slow, Precise)
  // ═══════════════════════════════════════════════════════════════════════════
  
  let rankedChunks: RetrievedChunk[];
  
  if (config.useReranking && candidates.length > config.finalCount) {
    rankedChunks = await rerankWithBedrock(query, candidates, config.finalCount);
  } else {
    // Skip reranking if few results
    rankedChunks = candidates.slice(0, config.finalCount);
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BUILD CONTEXT STRING
  // ═══════════════════════════════════════════════════════════════════════════
  
  let context = '';
  let totalTokens = 0;
  const includedSources: RetrievedChunk[] = [];
  
  for (const chunk of rankedChunks) {
    const chunkTokens = encode(chunk.text).length;
    
    if (totalTokens + chunkTokens > config.maxContextTokens) {
      break;  // Context budget exhausted
    }
    
    // Format with source attribution
    context += `\n\n---\n**Source: ${chunk.documentTitle}**\n\n${chunk.text}`;
    totalTokens += chunkTokens;
    includedSources.push(chunk);
  }
  
  return {
    context: context.trim(),
    sources: includedSources,
  };
}

/**
 * Rerank using AWS Bedrock (hosting Cohere Rerank v3.5)
 * Ensures data stays within EU-Central-1 region
 */
async function rerankWithBedrock(
  query: string,
  chunks: RetrievedChunk[],
  topK: number
): Promise<RetrievedChunk[]> {
  try {
    const payload = {
      query: query,
      documents: chunks.map(c => c.text),
      top_n: topK,
      return_documents: false
    };

    const command = new InvokeModelCommand({
      modelId: "cohere.rerank-v3-5:0", // Available in EU (Frankfurt)
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await bedrock.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    // Map Bedrock results back to chunks
    // responseBody.results structure: [{ index: 0, relevance_score: 0.98 }, ...]
    return responseBody.results.map((result: any) => ({
      ...chunks[result.index],
      rerankScore: result.relevance_score,
    }));
    
  } catch (error) {
    console.error('AWS Bedrock rerank failed, falling back to vector similarity:', error);
    // Fallback: Return original vector search order
    return chunks.slice(0, topK);
  }
}
  
```
### Hybrid Search: Vector + Full-Text

For best results, combine vector similarity with PostgreSQL full-text search:

```sql
-- Hybrid search function combining vector and keyword matching
CREATE OR REPLACE FUNCTION hybrid_search(
  query_text TEXT,
  query_embedding vector(1536),
  match_tenant_id UUID,
  match_count INT DEFAULT 50,
  vector_weight FLOAT DEFAULT 0.7,
  text_weight FLOAT DEFAULT 0.3
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  document_title TEXT,
  chunk_text TEXT,
  combined_score FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT 
      de.id,
      de.document_id,
      d.title as document_title,
      de.chunk_text,
      1 - (de.embedding <=> query_embedding) as vector_score
    FROM document_embeddings de
    JOIN documents d ON d.id = de.document_id
    WHERE de.tenant_id = match_tenant_id
      AND d.state = 'published'
    ORDER BY de.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  text_results AS (
    SELECT 
      de.id,
      ts_rank(to_tsvector('english', de.chunk_text), plainto_tsquery('english', query_text)) as text_score
    FROM document_embeddings de
    WHERE de.tenant_id = match_tenant_id
      AND to_tsvector('english', de.chunk_text) @@ plainto_tsquery('english', query_text)
  )
  SELECT 
    v.id,
    v.document_id,
    v.document_title,
    v.chunk_text,
    (v.vector_score * vector_weight) + (COALESCE(t.text_score, 0) * text_weight) as combined_score
  FROM vector_results v
  LEFT JOIN text_results t ON v.id = t.id
  ORDER BY combined_score DESC
  LIMIT match_count;
END;
$$;
```

## 4.8 Model Router (EU-Compliant)

```typescript
// /lib/ai/router.ts

import OpenAI from 'openai';
import { VertexAI } from '@google-cloud/vertexai';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

// EU-Compliant Model Configuration (Jan 2026 SOTA)
const MODELS = {
  // OpenAI (EU Data Residency Endpoint)
  // Released Dec 2025. 400k context.
  'gpt-5.2': {
    provider: 'openai',
    capabilities: ['text', 'rag', 'reasoning', 'code', 'vision', 'agentic'],
    costPer1kTokens: 0.015,
    maxInputTokens: 400000,
  },
  'whisper-3-turbo': {
    provider: 'openai',
    capabilities: ['transcription', 'diarization'],
    costPerMinute: 0.004,
  },
  
  // Google Vertex AI (europe-west3 / Frankfurt)
  // Released Nov 2025. 2M context. 
  'gemini-3.0-pro': {
    provider: 'google',
    capabilities: ['text', 'rag', 'reasoning', 'multimodal', 'deep-research'],
    costPer1kTokens: 0.002, 
    maxInputTokens: 2000000,
  },
  'gemini-3.0-flash': {
    provider: 'google',
    capabilities: ['video', 'audio', 'image', 'multimodal', 'fast', 'low-latency'],
    costPer1kTokens: 0.0001, // Extremely cheap in 2026
    maxInputTokens: 1000000,
  },
  
  // Anthropic via AWS Bedrock (eu-central-1 / Frankfurt)
  // The "Reasoning" heavyweights
  'claude-sonnet-4.5': {
    provider: 'anthropic',
    capabilities: ['text', 'rag', 'reasoning', 'code', 'analysis', 'complex-instruction'],
    costPer1kTokens: 0.003,
    maxInputTokens: 500000,
  },
  'claude-opus-4.5': {
    provider: 'anthropic',
    capabilities: ['text', 'rag', 'reasoning', 'code', 'creative', 'nuance'],
    costPer1kTokens: 0.015,
    maxInputTokens: 500000,
  },
};

// Initialize clients (Strict EU Regions)
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // New 2026 EU-specific endpoint for strict data residency
  baseURL: 'https://api.eu.openai.com/v1', 
});

const vertexClient = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: 'europe-west3',  // Frankfurt (Primary EU AI Hub)
});

const bedrockClient = new BedrockRuntimeClient({
  region: 'eu-central-1',  // Frankfurt (Often gets new models before London)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

// Select model based on task and user preference
export async function selectModel(
  taskType: TaskType,
  preference: 'openai' | 'google' | 'anthropic',
  priority: 'quality' | 'speed' | 'cost' = 'quality'
): Promise<ModelConfig> {
  
  // Video/Audio → Gemini 3 Flash (Native Multimodal is unbeatable)
  if (['video_processing', 'native_video', 'audio_analysis'].includes(taskType)) {
    return MODELS['gemini-3.0-flash'];
  }
  
  // Pure Transcription → Whisper 3
  if (taskType === 'transcription') {
    return MODELS['whisper-3-turbo'];
  }
  
  // RAG / Text Generation Logic
  switch (preference) {
    case 'google':
      return priority === 'speed' 
        ? MODELS['gemini-3.0-flash'] 
        : MODELS['gemini-3.0-pro'];
    
    case 'anthropic':
      // Sonnet 4.5 is the new "Default High End", Opus is only for extreme nuance
      return priority === 'quality' 
        ? MODELS['claude-opus-4.5'] 
        : MODELS['claude-sonnet-4.5'];
    
    case 'openai':
    default:
      // GPT-5.2 is standard, use Flash/Mini equivalent if speed needed (omitted for brevity)
      return MODELS['gpt-5.2'];
  }
}

// Unified generation interface
export async function generateText(
  prompt: string,
  model: ModelConfig,
  options?: GenerationOptions
): Promise<GenerationResult> {
  switch (model.provider) {
    case 'openai':
      return await generateWithOpenAI(prompt, model, options);
    case 'google':
      return await generateWithVertex(prompt, model, options);
    case 'anthropic':
      return await generateWithBedrock(prompt, model, options);
  }
}
```

---

# Part V: Document Lineage System

## 5.1 Lineage Schema

```sql
-- Document relationships (parent-child)
CREATE TABLE document_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  parent_document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  child_document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,  -- 'derived_from', 'version_of', 'ai_generated_from'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (parent_document_id != child_document_id),
  UNIQUE(parent_document_id, child_document_id, relationship_type)
);

-- Document lineage (event log)
CREATE TABLE document_lineage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,  -- 'creation', 'modification', 'state_change', 'access', 'ai_operation'
  
  actor_type TEXT NOT NULL,  -- 'user', 'system', 'ai'
  actor_id UUID REFERENCES users(id),
  actor_name TEXT,
  
  event_data JSONB NOT NULL DEFAULT '{}',
  ai_metadata JSONB,  -- Model, tokens, cost, prompt hash
  source_files JSONB,  -- Array of source file info
  
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prevent deletion of lineage records (compliance)
REVOKE DELETE ON document_lineage FROM PUBLIC;
```

## 5.2 Event Types

```typescript
export const EVENT_CATEGORIES = {
  creation: [
    'document_created',
    'document_uploaded',
    'document_ai_generated',
    'document_cloned_from_template',
  ],
  modification: [
    'content_edited',
    'metadata_updated',
    'version_created',
    'version_restored',
  ],
  state_change: [
    'state_draft',
    'state_in_review',
    'state_published',
    'state_hidden',
    'state_archived',
  ],
  access: [
    'document_viewed',
    'document_downloaded',
    'document_shared',
  ],
  ai_operation: [
    'ai_generation_completed',
    'rag_context_retrieved',
    'document_indexed',
    'embedding_created',
  ],
  collaboration: [
    'document_assigned',
    'comment_added',
    'review_requested',
    'approval_granted',
  ],
};
```

---

# Part VI: GDPR Compliance Framework

## 6.1 Compliance Checklist

| Article | Requirement | Implementation |
|---------|-------------|----------------|
| Art. 5 | Data minimization | Only collect necessary data |
| Art. 6 | Lawful basis | Consent tracking, ToS acceptance |
| Art. 7 | Consent conditions | Granular consent options |
| Art. 15 | Right of access | Self-service data export |
| Art. 17 | Right to erasure | Account deletion with 30-day grace |
| Art. 20 | Data portability | JSON export format |
| Art. 25 | Privacy by design | RLS, encryption, minimal defaults |
| Art. 32 | Security | Encryption at rest/transit, access controls |
| Art. 33 | Breach notification | 72-hour procedure documented |

## 6.2 Consent Management

```typescript
export const CONSENT_PURPOSES = {
  essential: {
    name: 'Essential Services',
    description: 'Required for the platform to function',
    required: true,
    canWithdraw: false,
  },
  analytics: {
    name: 'Analytics',
    description: 'Help us understand how you use the platform',
    required: false,
    canWithdraw: true,
  },
  ai_processing: {
    name: 'AI Document Processing',
    description: 'Allow AI to process your documents',
    required: false,
    canWithdraw: true,
  },
  knowledge_base: {
    name: 'Knowledge Base Indexing',
    description: 'Allow documents to be indexed for AI context',
    required: false,
    canWithdraw: true,
  },
};
```

## 6.3 Data Export & Deletion

```typescript
// Data export includes:
interface ExportData {
  user: { profile, consents };
  documents: { created, assigned };
  discussions: { created, replies };
  templates: Template[];
  activity: { logins, actions };
  ai_usage: { generations, embeddings_count };
}

// Deletion process:
// 1. User requests deletion
// 2. 30-day grace period (can cancel)
// 3. Remove from AI index
// 4. Delete documents (cascade to versions, lineage)
// 5. Delete discussions and replies
// 6. Anonymize audit logs (keep for compliance)
// 7. Delete user record
// 8. Delete auth record
```

---

# Part VII: Database Schema

## 7.1 Complete Schema

```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE user_role AS ENUM (
  'super_admin', 'admin', 'editor', 'premium', 'contributor', 'view_only'
);

CREATE TYPE document_state AS ENUM (
  'draft', 'in_review', 'published', 'hidden', 'archived'
);

CREATE TYPE subscription_plan AS ENUM (
  'free', 'base', 'pro', 'company'
);

-- Tenants
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  plan subscription_plan NOT NULL DEFAULT 'free',
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#E85002',
  secondary_color TEXT DEFAULT '#000000',
  max_users INTEGER DEFAULT 5,
  max_storage_mb INTEGER DEFAULT 100,
  max_ai_generations_per_month INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'view_only',
  theme TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  content_type TEXT DEFAULT 'markdown',
  state document_state NOT NULL DEFAULT 'draft',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT FALSE,
  normalized_md TEXT,
  file_url TEXT,
  file_type TEXT,
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  current_version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ
);

-- Document Versions
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_id, version_number)
);

-- Document Embeddings
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  chunk_tokens INTEGER NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_id, chunk_index)
);

-- Templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussions
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_solved BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion Replies
CREATE TABLE discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
  parent_reply_id UUID REFERENCES discussion_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs (immutable)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Generation Jobs
CREATE TABLE ai_generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  progress INTEGER DEFAULT 0,
  result_document_ids UUID[],
  result_data JSONB,
  ai_metadata JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Content Audit Reports
CREATE TABLE content_audit_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  generated_by UUID REFERENCES users(id),
  report_data JSONB NOT NULL,
  summary JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Consents
CREATE TABLE user_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMPTZ,
  withdrawn_at TIMESTAMPTZ,
  consent_text_version TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, purpose)
);
```

---

# Part VIII: Milestone Deliverables

## 8.1 Milestone 1: UI Framework (Week 1)
**Payment**: €1,500

### Deliverables

**Frontend (Vercel)**
- [ ] Landing page (Hero, Features, Pricing, FAQ)
- [ ] Auth UI (Signup, Signin, Password Reset)
- [ ] Dashboard layout with sidebar navigation
- [ ] Knowledge Centre UI (Articles, Categories)
- [ ] AI Assistant hub (3 feature cards, recent generations)
- [ ] Content Audit dashboard UI
- [ ] Community forum UI
- [ ] Templates library UI
- [ ] Admin section UI (Settings, Users, Branding)

**Theming & White Label**
- [ ] CSS variable system for white-labeling
- [ ] White label configurator (live preview)
- [ ] Dark/Light theme toggle
- [ ] Mobile responsive design

**Deployment**
- [ ] Frontend deployed to Vercel staging
- [ ] API client configured (pointing to Fly.io staging)

### Acceptance Criteria

✅ All pages navigable with realistic mock data  
✅ Theme switching works (light/dark)  
✅ White label preview shows color changes  
✅ Mobile responsive on all breakpoints  
✅ Lighthouse score > 90  

---

## 8.2 Milestone 2: Backend & AI (Week 2)
**Payment**: €1,500

### Deliverables

**Database & Auth**
- [ ] Complete database schema deployed (Supabase)
- [ ] pgvector extension enabled
- [ ] All RLS policies active
- [ ] Supabase Auth configured

**Fly.io Backend API**
- [ ] API server deployed to Fly.io (lhr region)
- [ ] Tenant context middleware
- [ ] Document CRUD API endpoints
- [ ] Authentication validation layer
- [ ] In-memory rate limiting (no Redis)
- [ ] HTTP cache headers configured

**Fly.io Worker Machines**

    Video processing worker (yt-dlp, Gemini Native Multimodal)

    AI generation worker

    PostgreSQL-based job queue

    Job status polling endpoint

**AI Pipeline**
- [ ] AI Provider Router (OpenAI EU / Vertex AI / Bedrock)
- [ ] Chunking and embedding pipeline
- [ ] RAG retrieval with reranking
- [ ] AI generation (From Prompt)
- [ ] Video → transcript pipeline
- [ ] Content enhancement engine

**Core Features**
- [ ] Document lineage tracking
- [ ] Templates CRUD + approval
- [ ] Consent management

### Acceptance Criteria

✅ Fly.io API server responding at api.tynebase.com  
✅ Users can sign up and create tenants  
✅ Documents can be created, edited, published  
✅ AI generates documents from prompts  
✅ Video uploads produce transcripts (via Fly.io worker)  
✅ RAG retrieves relevant context  
✅ All events logged in lineage  
✅ Job queue processing long-running tasks  

---

## 8.3 Milestone 3: Community, Search & Polish (Week 3)
**Payment**: €800

### Deliverables

**Community**
- [ ] Discussion creation and threading
- [ ] User mentions with notifications
- [ ] Moderation tools

**Search & Audit**
- [ ] Global search (grouped results)
- [ ] Content Audit calculations
- [ ] Audit recommendations engine

**GDPR & Compliance**
- [ ] GDPR data export
- [ ] GDPR deletion flow
- [ ] Cookie consent
- [ ] Privacy/Terms pages

**Final Polish**
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Documentation

**Production Deployment**
- [ ] Vercel production deployment (frontend)
- [ ] Fly.io production deployment (API + workers)
- [ ] DNS configuration (tynebase.com, api.tynebase.com, *.tynebase.com)
- [ ] SSL certificates verified
- [ ] Sentry monitoring configured

### Acceptance Criteria

✅ Community fully functional with threading  
✅ Search returns grouped results  
✅ Audit shows health scores and recommendations  
✅ GDPR export downloads user data  
✅ WCAG 2.1 AA compliant  
✅ Documentation complete  
✅ Production live at tynebase.com  
✅ API live at api.tynebase.com  
✅ Wildcard subdomains working (*.tynebase.com)  

---

# Part VIII-B: Fly.io Backend Architecture

This section details the dedicated backend infrastructure running on Fly.io, which handles all API requests, authentication, and long-running AI tasks.

## 8B.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FLY.IO BACKEND ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   REGION: lhr (London) - Primary                                                │
│   REGION: ams (Amsterdam) - Failover                                            │
│                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────┐    │
│   │                         API MACHINES (auto-scale)                     │    │
│   │                                                                       │    │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│   │   │  Machine 1  │  │  Machine 2  │  │  Machine N  │                  │    │
│   │   │  (shared)   │  │  (shared)   │  │  (shared)   │                  │    │
│   │   │  512MB RAM  │  │  512MB RAM  │  │  512MB RAM  │                  │    │
│   │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                  │    │
│   │          │                │                │                          │    │
│   │          └────────────────┼────────────────┘                          │    │
│   │                           │                                           │    │
│   │   Handles:                │                                           │    │
│   │   • REST API requests     │                                           │    │
│   │   • Auth validation       │                                           │    │
│   │   • Tenant context        │                                           │    │
│   │   • Document CRUD         │                                           │    │
│   │   • Search queries        │                                           │    │
│   │                           │                                           │    │
│   └───────────────────────────┼───────────────────────────────────────────┘    │
│                               │                                                 │
│                               │ Internal API (private network)                  │
│                               ▼                                                 │
│   ┌───────────────────────────────────────────────────────────────────────┐    │
│   │                      WORKER MACHINES (on-demand)                      │    │
│   │                                                                       │    │
│   │   ┌─────────────────────────────────────────────────────────────────┐ │    │
│   │   │                    Video Processing Worker                      │ │    │
│   │   │                                                                 │ │    │
│   │   │   • YouTube URL ingestion (yt-dlp)                             │ │    │
│   │   │   • Video upload to GCS Temp Storage                            │ │    │
│   │   │   • Gemini 3 Flash Multimodal Ingestion                         │ │    │
│   │   │   • Transcript + Visual Context (OCR)                           │ │    │
│   │   │   • Chapter & Summary generation                                │ │    │
│   │   │                                                                 │ │    │
│   │   │   VM: 2 CPU, 2GB RAM, performance class                        │ │    │
│   │   │   Timeout: 30 minutes                                           │ │    │
│   │   │   Auto-stop after idle                                          │ │    │
│   │   └─────────────────────────────────────────────────────────────────┘ │    │
│   │                                                                       │    │
│   │   ┌─────────────────────────────────────────────────────────────────┐ │    │
│   │   │                    AI Generation Worker                         │ │    │
│   │   │                                                                 │ │    │
│   │   │   • Document generation from prompts                            │ │    │
│   │   │   • Content enhancement analysis                                │ │    │
│   │   │   • RAG context retrieval                                       │ │    │
│   │   │   • Embedding generation (batch)                                │ │    │
│   │   │   • Summary generation                                          │ │    │
│   │   │                                                                 │ │    │
│   │   │   VM: 1 CPU, 1GB RAM, shared class                             │ │    │
│   │   │   Timeout: 10 minutes                                           │ │    │
│   │   └─────────────────────────────────────────────────────────────────┘ │    │
│   │                                                                       │    │
│   │   ┌─────────────────────────────────────────────────────────────────┐ │    │
│   │   │                    Audit & Indexing Worker                      │ │    │
│   │   │                                                                 │ │    │
│   │   │   • Content health scoring (batch)                              │ │    │
│   │   │   • Search index updates                                        │ │    │
│   │   │   • Lineage graph generation                                    │ │    │
│   │   │   • GDPR export generation                                      │ │    │
│   │   │                                                                 │ │    │
│   │   │   VM: 1 CPU, 512MB RAM, shared class                           │ │    │
│   │   │   Runs on schedule (nightly)                                    │ │    │
│   │   └─────────────────────────────────────────────────────────────────┘ │    │
│   │                                                                       │    │
│   └───────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 8B.2 API Server Implementation

```typescript
// /backend/src/server.ts (Fly.io API Server)

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createClient } from '@supabase/supabase-js';

const app = Fastify({
  logger: true,
  trustProxy: true, // Behind Fly.io proxy
});

// CORS for frontend
await app.register(cors, {
  origin: [
    'https://tynebase.com',
    'https://*.tynebase.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000',
  ].filter(Boolean),
  credentials: true,
});

// Health check for Fly.io
app.get('/health', async () => ({ status: 'ok', region: process.env.FLY_REGION }));

// Tenant context middleware
app.addHook('preHandler', async (request, reply) => {
  const subdomain = extractSubdomain(request.headers.host);
  
  if (!subdomain) {
    return; // Main domain, no tenant
  }
  
  // Validate tenant (with in-memory cache)
  const tenant = await getTenantBySubdomain(subdomain);
  
  if (!tenant) {
    return reply.code(404).send({ error: 'Tenant not found' });
  }
  
  request.tenant = tenant;
  request.tenantId = tenant.id;
});

// API Routes
app.register(import('./routes/auth'), { prefix: '/api/auth' });
app.register(import('./routes/documents'), { prefix: '/api/documents' });
app.register(import('./routes/ai'), { prefix: '/api/ai' });
app.register(import('./routes/community'), { prefix: '/api/community' });
app.register(import('./routes/templates'), { prefix: '/api/templates' });
app.register(import('./routes/audit'), { prefix: '/api/audit' });
app.register(import('./routes/admin'), { prefix: '/api/admin' });

// Start server
const port = parseInt(process.env.PORT || '8080');
await app.listen({ port, host: '0.0.0.0' });
console.log(`API server running on port ${port}`);
```

## 8B.3 In-Memory Cache (No Redis)

```typescript
// /backend/src/lib/cache.ts

import { LRUCache } from 'lru-cache';

// Tenant config cache (5-minute TTL)
export const tenantCache = new LRUCache<string, Tenant>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes
});

// Rate limit counters (sliding window in memory)
const rateLimitCounters = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const counter = rateLimitCounters.get(key);
  
  if (!counter || counter.resetAt < now) {
    // New window
    rateLimitCounters.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  
  if (counter.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: counter.resetAt };
  }
  
  counter.count++;
  return { allowed: true, remaining: limit - counter.count, resetAt: counter.resetAt };
}

// Embedding cache (cleared on document update)
const embeddingCache = new LRUCache<string, number[]>({
  max: 1000,
  ttl: 1000 * 60 * 60, // 1 hour
});

export function getCachedEmbedding(documentId: string, chunkIndex: number): number[] | undefined {
  return embeddingCache.get(`${documentId}:${chunkIndex}`);
}

export function setCachedEmbedding(documentId: string, chunkIndex: number, embedding: number[]): void {
  embeddingCache.set(`${documentId}:${chunkIndex}`, embedding);
}

export function invalidateDocumentEmbeddings(documentId: string): void {
  // Clear all chunks for this document
  for (const key of embeddingCache.keys()) {
    if (key.startsWith(`${documentId}:`)) {
      embeddingCache.delete(key);
    }
  }
}

// Cleanup old rate limit entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, counter] of rateLimitCounters.entries()) {
    if (counter.resetAt < now) {
      rateLimitCounters.delete(key);
    }
  }
}, 60000);
```

## 8B.4 Video Processing Worker (Gemini 3 Native)

Architecture Change: We utilize Gemini 3.0 Flash's native multimodal capabilities via Vertex AI (London). We do not extract audio locally. We upload the video buffer directly to Google Cloud Storage (temp bucket) and let Gemini ingest it to generate transcript, chapters, and summary in a single pass.
code:
``` TypeScript

    
// /backend/src/workers/video-processor.ts

import { spawn } from 'child_process';
import { createClient } from '@supabase/supabase-js';
import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';
import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud clients (London Region)
const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: 'europe-west2',
});

const storage = new Storage();
const TEMP_BUCKET_NAME = process.env.GCP_TEMP_VIDEO_BUCKET || 'tynebase-temp-videos';

const model = vertexAI.getGenerativeModel({
  model: 'gemini-3.0-flash',
  safetySettings: [{
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  }],
  generationConfig: {
    temperature: 0.2, // Low temp for factual transcription
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
});

interface VideoJob {
  id: string;
  tenantId: string;
  userId: string;
  source: 'upload' | 'youtube' | 'url';
  sourceUrl?: string;
  sourceFile?: string; // S3/Supabase path
  options: {
    identifySpeakers: boolean; // Note: Gemini does speaker labels naturally
  };
}

export async function processVideoJob(job: VideoJob): Promise<void> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  let gcsUri = '';
  let localPath = '';

  try {
    // Update job status
    await updateJobStatus(job.id, 'processing', 10);
    
    // ═════════════════════════════════════════════════════════════════════════
    // STEP 1: Acquire Video & Move to GCS (Gemini needs GCS URI for >20MB)
    // ═════════════════════════════════════════════════════════════════════════
    
    if (job.source === 'youtube') {
      await updateJobStatus(job.id, 'downloading_youtube', 20);
      localPath = await downloadYouTubeVideo(job.sourceUrl!);
      gcsUri = await uploadToGCS(localPath, `jobs/${job.id}/video.mp4`);
    } else {
      // For uploads, we might need to copy from Supabase Storage to GCS
      // or stream directly if the worker has the file.
      // Assuming we download to temp first for reliability:
      await updateJobStatus(job.id, 'preparing_video', 20);
      localPath = await downloadFromSource(job.sourceFile!);
      gcsUri = await uploadToGCS(localPath, `jobs/${job.id}/video.mp4`);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // STEP 2: Multimodal Analysis (Single Pass)
    // ═════════════════════════════════════════════════════════════════════════
    
    await updateJobStatus(job.id, 'analyzing_multimodal', 50);

    const prompt = `
      Analyze this video. You are an expert AI documentation assistant.
      
      Task:
      1. Provide a verbatim transcript of the speech. Label speakers if distinct (e.g., Speaker 1, Speaker 2).
      2. Identify visual context (e.g., "The speaker points to the 'Settings' tab").
      3. Create a structured summary.
      4. Generate chapter markers with timestamps.

      Output JSON format:
      {
        "transcript": [{ "time": "MM:SS", "speaker": "Name", "text": "..." }],
        "summary": "...",
        "chapters": [{ "time": "MM:SS", "title": "..." }],
        "visual_notes": ["..."]
      }
    `;

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: 'video/mp4',
          fileUri: gcsUri,
        },
      },
      { text: prompt },
    ]);

    const responseText = result.response.candidates[0].content.parts[0].text;
    const aiData = JSON.parse(responseText);

    // ═════════════════════════════════════════════════════════════════════════
    // STEP 3: Save Results
    // ═════════════════════════════════════════════════════════════════════════
    
    await updateJobStatus(job.id, 'saving_results', 80);

    // Create the "Transcript" document
    // We format the JSON transcript into readable Markdown for the editor
    const formattedTranscript = formatTranscriptMarkdown(aiData.transcript, aiData.visual_notes);
    
    const docResults: any = {
      transcriptDocId: await saveDocument(supabase, {
        tenantId: job.tenantId,
        userId: job.userId,
        title: `Transcript: ${new Date().toLocaleString()}`,
        content: formattedTranscript,
        type: 'transcript',
        metadata: {
          chapters: aiData.chapters,
          summary: aiData.summary,
          source_video: job.sourceUrl || 'upload',
        }
      })
    };

    // ═════════════════════════════════════════════════════════════════════════
    // STEP 4: Cleanup
    // ═════════════════════════════════════════════════════════════════════════
    
    // Delete from GCS to save costs/privacy
    await storage.bucket(TEMP_BUCKET_NAME).file(`jobs/${job.id}/video.mp4`).delete();
    if (localPath) require('fs').unlinkSync(localPath);

    await completeJob(job.id, docResults);
    
    // Notify
    await sendNotification(supabase, job.userId, 'video_complete', 'Video analysis complete.');

  } catch (error) {
    console.error('Gemini video processing failed:', error);
    await failJob(job.id, error.message);
    
    // Attempt cleanup even on fail
    try {
      if (gcsUri) await storage.bucket(TEMP_BUCKET_NAME).file(`jobs/${job.id}/video.mp4`).delete();
    } catch (e) { /* ignore */ }
  }
}

// Helper: Convert Gemini JSON transcript to nice Markdown
function formatTranscriptMarkdown(transcript: any[], visualNotes: string[]): string {
  let md = `# Video Transcript\n\n`;
  
  if (visualNotes?.length) {
    md += `## Visual Context\nAI observed the following visuals:\n`;
    visualNotes.forEach(note => md += `- ${note}\n`);
    md += `\n---\n\n`;
  }

  md += `## Transcript\n\n`;
  transcript.forEach((entry: any) => {
    md += `**[${entry.time}] ${entry.speaker}:** ${entry.text}\n\n`;
  });

  return md;
}

async function uploadToGCS(localPath: string, destFileName: string): Promise<string> {
  const [file] = await storage.bucket(TEMP_BUCKET_NAME).upload(localPath, {
    destination: destFileName,
  });
  return `gs://${TEMP_BUCKET_NAME}/${destFileName}`;
}

async function downloadYouTubeVideo(url: string): Promise<string> {
  // yt-dlp logic remains same as before to get the mp4 file
  const outputPath = `/tmp/video-${Date.now()}.mp4`;
  return new Promise((resolve, reject) => {
    const ytdlp = spawn('yt-dlp', [
      '-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]',
      '--merge-output-format', 'mp4',
      '-o', outputPath,
      url,
    ]);
    ytdlp.on('close', (code) => code === 0 ? resolve(outputPath) : reject(new Error(`yt-dlp error ${code}`)));
  });
}

  
```

## 8B.5 Job Queue System (Database-based)

Since we're not using Redis, we use a PostgreSQL-based job queue:

```sql
-- Job queue table
CREATE TABLE job_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Job type
  job_type TEXT NOT NULL,  -- 'video_process', 'ai_generate', 'embedding_batch', 'audit_report'
  
  -- Job data
  payload JSONB NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending', 'processing', 'completed', 'failed'
  progress INTEGER DEFAULT 0,
  progress_message TEXT,
  
  -- Worker assignment
  worker_id TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Results
  result JSONB,
  error_message TEXT,
  
  -- Retry handling
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  next_retry_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_queue_status ON job_queue(status, created_at);
CREATE INDEX idx_job_queue_tenant ON job_queue(tenant_id);
CREATE INDEX idx_job_queue_pending ON job_queue(status, next_retry_at) 
  WHERE status IN ('pending', 'failed');

-- Function to claim a job
CREATE OR REPLACE FUNCTION claim_job(p_worker_id TEXT, p_job_types TEXT[])
RETURNS job_queue AS $$
DECLARE
  v_job job_queue;
BEGIN
  -- Find and lock a pending job
  SELECT * INTO v_job
  FROM job_queue
  WHERE status = 'pending'
    AND job_type = ANY(p_job_types)
    AND (next_retry_at IS NULL OR next_retry_at <= NOW())
  ORDER BY created_at
  FOR UPDATE SKIP LOCKED
  LIMIT 1;
  
  IF v_job.id IS NOT NULL THEN
    -- Claim the job
    UPDATE job_queue
    SET 
      status = 'processing',
      worker_id = p_worker_id,
      started_at = NOW(),
      attempts = attempts + 1,
      updated_at = NOW()
    WHERE id = v_job.id;
    
    -- Return updated job
    SELECT * INTO v_job FROM job_queue WHERE id = v_job.id;
  END IF;
  
  RETURN v_job;
END;
$$ LANGUAGE plpgsql;
```

```typescript
// /backend/src/lib/job-queue.ts

export class JobQueue {
  private supabase: SupabaseClient;
  private workerId: string;
  private isRunning = false;
  
  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
    this.workerId = `worker-${process.env.FLY_MACHINE_ID || crypto.randomUUID()}`;
  }
  
  async enqueue(
    tenantId: string,
    jobType: string,
    payload: any
  ): Promise<string> {
    const { data, error } = await this.supabase
      .from('job_queue')
      .insert({
        tenant_id: tenantId,
        job_type: jobType,
        payload,
      })
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  }
  
  async startWorker(
    jobTypes: string[],
    handlers: Record<string, (job: Job) => Promise<any>>
  ): Promise<void> {
    this.isRunning = true;
    
    while (this.isRunning) {
      try {
        // Claim a job
        const { data: job } = await this.supabase
          .rpc('claim_job', {
            p_worker_id: this.workerId,
            p_job_types: jobTypes,
          });
        
        if (!job?.id) {
          // No jobs available, wait before polling again
          await sleep(5000);
          continue;
        }
        
        // Process the job
        const handler = handlers[job.job_type];
        if (!handler) {
          await this.failJob(job.id, `No handler for job type: ${job.job_type}`);
          continue;
        }
        
        try {
          const result = await handler(job);
          await this.completeJob(job.id, result);
        } catch (error) {
          await this.failJob(job.id, error.message, job.attempts < job.max_attempts);
        }
        
      } catch (error) {
        console.error('Worker error:', error);
        await sleep(10000);
      }
    }
  }
  
  async updateProgress(jobId: string, progress: number, message?: string): Promise<void> {
    await this.supabase
      .from('job_queue')
      .update({
        progress,
        progress_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId);
  }
  
  private async completeJob(jobId: string, result: any): Promise<void> {
    await this.supabase
      .from('job_queue')
      .update({
        status: 'completed',
        result,
        completed_at: new Date().toISOString(),
        progress: 100,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId);
  }
  
  private async failJob(jobId: string, error: string, canRetry = false): Promise<void> {
    const update: any = {
      error_message: error,
      updated_at: new Date().toISOString(),
    };
    
    if (canRetry) {
      update.status = 'pending';
      update.next_retry_at = new Date(Date.now() + 60000).toISOString(); // Retry in 1 minute
    } else {
      update.status = 'failed';
      update.completed_at = new Date().toISOString();
    }
    
    await this.supabase
      .from('job_queue')
      .update(update)
      .eq('id', jobId);
  }
  
  stop(): void {
    this.isRunning = false;
  }
}
```

## 8B.6 Frontend API Client

```typescript
// /frontend/src/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

class APIClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Get auth token from Supabase
    const session = getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    return headers;
  }
  
  async get<T>(path: string, options?: { cache?: RequestCache }): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: this.getHeaders(),
      cache: options?.cache || 'default',
    });
    
    if (!response.ok) {
      throw new APIError(response.status, await response.json());
    }
    
    return response.json();
  }
  
  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new APIError(response.status, await response.json());
    }
    
    return response.json();
  }
  
  // Streaming response for AI generation
  async stream(
    path: string,
    body: any,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new APIError(response.status, await response.json());
    }
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  }
}

export const api = new APIClient();

// Usage examples:
// const documents = await api.get('/api/documents');
// const doc = await api.post('/api/documents', { title: 'New Doc', content: '...' });
// await api.stream('/api/ai/generate', { prompt: '...' }, (chunk) => setText(prev => prev + chunk));
```

---

# Appendices

## A. Environment Variables

### Frontend (Vercel)

```env
# Supabase (Public - exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx

# Backend API URL
NEXT_PUBLIC_API_URL=https://api.tynebase.com

# Domain
NEXT_PUBLIC_APP_URL=https://tynebase.com
```

### Backend API (Fly.io)

```env
# Supabase (Server-side)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# AI Services (All EU/UK Compliant)
# OpenAI - Uses EU endpoint automatically via baseURL in code
OPENAI_API_KEY=xxxxx

# Cohere - For reranking (improves retrieval accuracy 20-48%)
COHERE_API_KEY=xxxxx

# Google Cloud - Vertex AI (europe-west2 / London)
GCP_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# AWS Bedrock (eu-west-2 / London) - For Claude
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=eu-west-2

# Fly.io Internal
FLY_APP_NAME=tynebase-api
FLY_REGION=lhr  # London

# Security
JWT_SECRET=xxxxx  # 32+ character secret
ENCRYPTION_KEY=xxxxx  # 32-byte key for sensitive data

# Monitoring
SENTRY_DSN=xxxxx
```

### Fly.io Machine Configuration

```toml
# fly.toml

app = "tynebase-api"
primary_region = "lhr"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

  [http_service.concurrency]
    type = "requests"
    hard_limit = 250
    soft_limit = 200

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512

# Long-running worker machines for AI tasks
[[services]]
  internal_port = 8081
  protocol = "tcp"

  [services.concurrency]
    type = "connections"
    hard_limit = 25
    soft_limit = 20
```

### Fly.io Worker Machine (Video/AI Processing)

```toml
# fly.worker.toml

app = "tynebase-workers"
primary_region = "lhr"

[build]
  dockerfile = "Dockerfile.worker"

[env]
  NODE_ENV = "production"
  WORKER_TYPE = "ai-processor"

# No HTTP service - triggered via internal API

[[vm]]
  cpu_kind = "performance"  # Better for AI workloads
  cpus = 2
  memory_mb = 2048  # 2GB for video processing
```

## B. Rate Limits by Plan

| Feature | Free | Base | Pro | Company |
|---------|------|------|-----|---------|
| AI Generations/mo | 10 | 50 | 200 | Unlimited |
| Videos/mo | 2 | 10 | 50 | Unlimited |
| Video max duration | 5 min | 30 min | 60 min | 120 min |
| Storage | 100MB | 1GB | 10GB | 100GB |
| Users | 1 | 5 | 25 | Unlimited |

## C. Pre-seeded Templates

1. User Guide
2. Tutorial
3. FAQ
4. Report
5. Meeting Notes
6. Policy Document
7. Technical Documentation
8. Onboarding Checklist
9. Release Notes
10. Bug Report

---

# Part IX: Subdomain Routing & Tenant Resolution

This section details the complete subdomain-based multi-tenancy system that ensures each company gets their own branded instance at company.tynebase.com.

---

## 9.1 URL Structure

Every tenant gets their own branded subdomain:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SUBDOMAIN ROUTING                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   https://acme.tynebase.com          →  ACME Corporation's instance             │
│   https://globex.tynebase.com        →  Globex Inc's instance                   │
│   https://initech.tynebase.com       →  Initech's instance                      │
│   https://tynebase.com               →  Main marketing site / signup            │
│   https://app.tynebase.com           →  Super Admin dashboard                   │
│                                                                                 │
│   Each subdomain sees:                                                          │
│   ✓ Their own logo and favicon                                                  │
│   ✓ Their own color scheme                                                      │
│   ✓ Their own documents, users, templates                                       │
│   ✓ Complete isolation from other tenants                                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Middleware Implementation

```typescript
// /middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Extract subdomain from hostname
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);
  
  // Skip for main domain routes
  if (!subdomain || subdomain === 'www' || subdomain === 'app') {
    return response;
  }
  
  // Create Supabase client
  const supabase = createMiddlewareClient({ req: request, res: response });
  
  // Validate tenant exists
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('id, name, subdomain, logo_url, favicon_url, primary_color, secondary_color, font_family, dark_mode_enabled, plan')
    .eq('subdomain', subdomain)
    .single();
  
  if (error || !tenant) {
    // Invalid subdomain - redirect to main site
    return NextResponse.redirect(new URL('https://tynebase.com/not-found', request.url));
  }
  
  // Check if tenant is active (not suspended)
  if (tenant.plan === 'suspended') {
    return NextResponse.redirect(new URL('https://tynebase.com/account-suspended', request.url));
  }
  
  // Set tenant context in headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenant.id);
  requestHeaders.set('x-tenant-subdomain', tenant.subdomain);
  requestHeaders.set('x-tenant-name', tenant.name);
  
  // Pass tenant branding data for SSR
  requestHeaders.set('x-tenant-branding', JSON.stringify({
    logoUrl: tenant.logo_url,
    faviconUrl: tenant.favicon_url,
    primaryColor: tenant.primary_color,
    secondaryColor: tenant.secondary_color,
    fontFamily: tenant.font_family,
    darkModeEnabled: tenant.dark_mode_enabled,
  }));
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function extractSubdomain(hostname: string): string | null {
  // Handle localhost for development
  if (hostname.includes('localhost')) {
    // Use query param or cookie for local dev: localhost:3000?tenant=acme
    return null;
  }
  
  // Extract subdomain from hostname
  // acme.tynebase.com → acme
  // www.tynebase.com → www
  // tynebase.com → null
  const parts = hostname.split('.');
  
  if (parts.length >= 3) {
    return parts[0];
  }
  
  return null;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 9.3 Tenant Context Provider

```typescript
// /lib/tenant/TenantProvider.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface TenantBranding {
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  darkModeEnabled: boolean;
}

interface TenantContextValue {
  tenantId: string;
  tenantName: string;
  subdomain: string;
  branding: TenantBranding;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ 
  children,
  initialTenant,
}: { 
  children: React.ReactNode;
  initialTenant: TenantContextValue;
}) {
  const [tenant] = useState(initialTenant);
  
  // Apply branding CSS variables on mount and when branding changes
  useEffect(() => {
    applyBrandingToDocument(tenant.branding);
  }, [tenant.branding]);
  
  // Update favicon
  useEffect(() => {
    if (tenant.branding.faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement 
        || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = tenant.branding.faviconUrl;
      document.head.appendChild(link);
    }
  }, [tenant.branding.faviconUrl]);
  
  // Update document title with tenant name
  useEffect(() => {
    document.title = `${tenant.tenantName} | TyneBase`;
  }, [tenant.tenantName]);
  
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}

function applyBrandingToDocument(branding: TenantBranding) {
  const root = document.documentElement;
  
  // Apply primary brand color
  root.style.setProperty('--brand-primary', branding.primaryColor);
  root.style.setProperty('--brand-primary-hover', adjustColor(branding.primaryColor, 20));
  root.style.setProperty('--brand-primary-muted', `${branding.primaryColor}15`);
  
  // Apply secondary color
  root.style.setProperty('--brand-secondary', branding.secondaryColor);
  
  // Apply font family
  if (branding.fontFamily && branding.fontFamily !== 'Inter') {
    // Load Google Font dynamically
    loadGoogleFont(branding.fontFamily);
    root.style.setProperty('--font-display', `'${branding.fontFamily}', sans-serif`);
    root.style.setProperty('--font-body', `'${branding.fontFamily}', sans-serif`);
  }
  
  // Handle dark mode preference
  if (!branding.darkModeEnabled) {
    // Force light mode if tenant disabled dark mode
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
  }
}

function loadGoogleFont(fontFamily: string) {
  const linkId = `google-font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;
  
  if (document.getElementById(linkId)) return;
  
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

function adjustColor(hex: string, percent: number): string {
  // Lighten or darken a hex color
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
```

### 9.4 Root Layout Integration

```typescript
// /app/layout.tsx

import { headers } from 'next/headers';
import { TenantProvider } from '@/lib/tenant/TenantProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  
  // Get tenant data from middleware headers
  const tenantId = headersList.get('x-tenant-id');
  const tenantSubdomain = headersList.get('x-tenant-subdomain');
  const tenantName = headersList.get('x-tenant-name');
  const brandingJson = headersList.get('x-tenant-branding');
  
  const branding = brandingJson ? JSON.parse(brandingJson) : {
    logoUrl: null,
    faviconUrl: null,
    primaryColor: '#E85002',
    secondaryColor: '#000000',
    fontFamily: 'Inter',
    darkModeEnabled: true,
  };
  
  // If no tenant (main site), render without tenant context
  if (!tenantId) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dynamic favicon */}
        {branding.faviconUrl && (
          <link rel="icon" href={branding.faviconUrl} />
        )}
        
        {/* Preload custom font if specified */}
        {branding.fontFamily !== 'Inter' && (
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
        )}
        
        {/* Inject initial CSS variables for SSR */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --brand-primary: ${branding.primaryColor};
              --brand-primary-hover: ${branding.primaryColor}dd;
              --brand-primary-muted: ${branding.primaryColor}15;
              --brand-secondary: ${branding.secondaryColor};
            }
          `
        }} />
      </head>
      <body>
        <TenantProvider
          initialTenant={{
            tenantId: tenantId!,
            tenantName: tenantName || 'TyneBase',
            subdomain: tenantSubdomain || '',
            branding,
            isLoading: false,
          }}
        >
          {children}
        </TenantProvider>
      </body>
    </html>
  );
}
```

---

# Part X: White-Label Branding System

## 10.1 Theme Configurator UI

**Route**: `/dashboard/settings/branding` (Admin only)

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🎨 Branding Settings                                                            ║
║                                                                                   ║
║   Customize how your knowledge base looks to your team                            ║
║                                                                                   ║
║   ┌─────────────────────────────────────┬─────────────────────────────────────┐   ║
║   │                                     │                                     │   ║
║   │   BRANDING OPTIONS                  │   LIVE PREVIEW                      │   ║
║   │                                     │                                     │   ║
║   │   Logo                              │   ┌─────────────────────────────┐   │   ║
║   │   ┌─────────────────────────────┐   │   │                             │   │   ║
║   │   │                             │   │   │  ┌─────┐                    │   │   ║
║   │   │    ┌───────────────────┐    │   │   │  │LOGO │  Acme Corp        │   │   ║
║   │   │    │                   │    │   │   │  └─────┘                    │   │   ║
║   │   │    │    [Your Logo]    │    │   │   │                             │   │   ║
║   │   │    │                   │    │   │   │  ┌─────────────────────┐    │   │   ║
║   │   │    │   Click to upload │    │   │   │  │ 📚 Knowledge        │    │   │   ║
║   │   │    │    or drag here   │    │   │   │  │ 🤖 AI Assistant     │    │   │   ║
║   │   │    │                   │    │   │   │  │ 📊 Audit            │    │   │   ║
║   │   │    └───────────────────┘    │   │   │  │ 💬 Community        │    │   │   ║
║   │   │                             │   │   │  └─────────────────────┘    │   │   ║
║   │   │    PNG, SVG • Max 2MB       │   │   │                             │   │   ║
║   │   │    Recommended: 200x50px    │   │   │  Preview updates in         │   │   ║
║   │   │                             │   │   │  real-time as you make      │   │   ║
║   │   └─────────────────────────────┘   │   │  changes                    │   │   ║
║   │                                     │   │                             │   │   ║
║   │   Favicon                           │   │  ┌─────────────────────┐    │   │   ║
║   │   ┌─────────────────────────────┐   │   │  │                     │    │   │   ║
║   │   │  ┌────┐                     │   │   │  │  Sample Article     │    │   │   ║
║   │   │  │ 🔶 │  [Change Favicon]   │   │   │  │                     │    │   │   ║
║   │   │  └────┘                     │   │   │  │  This is how your   │    │   │   ║
║   │   │  Current: acme-icon.png     │   │   │  │  content will look  │    │   │   ║
║   │   └─────────────────────────────┘   │   │  │  with the selected  │    │   │   ║
║   │                                     │   │  │  branding...        │    │   │   ║
║   │                                     │   │  │                     │    │   │   ║
║   │   Primary Color                     │   │  │  [Button Example]   │    │   │   ║
║   │   ┌─────────────────────────────┐   │   │  │                     │    │   │   ║
║   │   │  ┌────┐                     │   │   │  └─────────────────────┘    │   │   ║
║   │   │  │████│  #E85002            │   │   │                             │   │   ║
║   │   │  └────┘  [Color Picker]     │   │   └─────────────────────────────┘   │   ║
║   │   │                             │   │                                     │   ║
║   │   │  Used for: buttons, links,  │   │                                     │   ║
║   │   │  active states, accents     │   │                                     │   ║
║   │   └─────────────────────────────┘   │                                     │   ║
║   │                                     │                                     │   ║
║   │   Secondary Color                   │                                     │   ║
║   │   ┌─────────────────────────────┐   │                                     │   ║
║   │   │  ┌────┐                     │   │                                     │   ║
║   │   │  │████│  #1A1A1A            │   │                                     │   ║
║   │   │  └────┘  [Color Picker]     │   │                                     │   ║
║   │   │                             │   │                                     │   ║
║   │   │  Used for: headings,        │   │                                     │   ║
║   │   │  dark backgrounds           │   │                                     │   ║
║   │   └─────────────────────────────┘   │                                     │   ║
║   │                                     │                                     │   ║
║   │   Font Family                       │                                     │   ║
║   │   ┌─────────────────────────────┐   │                                     │   ║
║   │   │  Inter                   ▼  │   │                                     │   ║
║   │   └─────────────────────────────┘   │                                     │   ║
║   │   Options: Inter, Satoshi, Plus     │                                     │   ║
║   │   Jakarta Sans, DM Sans, Outfit,    │                                     │   ║
║   │   Space Grotesk, Manrope            │                                     │   ║
║   │                                     │                                     │   ║
║   │   Dark Mode                         │                                     │   ║
║   │   ┌─────────────────────────────┐   │                                     │   ║
║   │   │  ☑️ Allow users to enable    │   │                                     │   ║
║   │   │     dark mode                │   │                                     │   ║
║   │   └─────────────────────────────┘   │                                     │   ║
║   │                                     │                                     │   ║
║   │                                     │                                     │   ║
║   │   ┌─────────────┐ ┌─────────────┐   │                                     │   ║
║   │   │Reset Default│ │Save Changes │   │                                     │   ║
║   │   │             │ │     ████████│   │                                     │   ║
║   │   └─────────────┘ └─────────────┘   │                                     │   ║
║   │    Ghost button    Orange button    │                                     │   ║
║   │                                     │                                     │   ║
║   └─────────────────────────────────────┴─────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### 10.2 Branding Configurator Component

```typescript
// /components/settings/BrandingConfigurator.tsx

'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/tenant/TenantProvider';
import { HexColorPicker } from 'react-colorful';

interface BrandingSettings {
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  darkModeEnabled: boolean;
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter (Default)' },
  { value: 'Satoshi', label: 'Satoshi' },
  { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Outfit', label: 'Outfit' },
  { value: 'Space Grotesk', label: 'Space Grotesk' },
  { value: 'Manrope', label: 'Manrope' },
];

export function BrandingConfigurator() {
  const { tenantId, branding: currentBranding } = useTenant();
  const [settings, setSettings] = useState<BrandingSettings>(currentBranding);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Track changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(currentBranding);
    setHasChanges(changed);
  }, [settings, currentBranding]);
  
  // Apply preview in real-time
  useEffect(() => {
    // Apply to CSS variables for live preview
    document.documentElement.style.setProperty('--brand-primary', settings.primaryColor);
    document.documentElement.style.setProperty('--brand-secondary', settings.secondaryColor);
  }, [settings.primaryColor, settings.secondaryColor]);
  
  const handleLogoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'logo');
    
    const response = await fetch('/api/tenant/upload-asset', {
      method: 'POST',
      body: formData,
    });
    
    const { url } = await response.json();
    setSettings(prev => ({ ...prev, logoUrl: url }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await fetch('/api/tenant/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      
      // Reload to apply changes globally
      window.location.reload();
    } catch (error) {
      console.error('Failed to save branding:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleReset = () => {
    setSettings({
      logoUrl: null,
      faviconUrl: null,
      primaryColor: '#E85002',
      secondaryColor: '#000000',
      fontFamily: 'Inter',
      darkModeEnabled: true,
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings Panel */}
      <div className="space-y-8">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Logo</label>
          <LogoUploader
            currentLogo={settings.logoUrl}
            onUpload={handleLogoUpload}
          />
          <p className="text-xs text-gray-500 mt-2">
            PNG or SVG • Max 2MB • Recommended: 200x50px
          </p>
        </div>
        
        {/* Favicon Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Favicon</label>
          <FaviconUploader
            currentFavicon={settings.faviconUrl}
            onUpload={(url) => setSettings(prev => ({ ...prev, faviconUrl: url }))}
          />
        </div>
        
        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
              style={{ backgroundColor: settings.primaryColor }}
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                primaryColor: e.target.value 
              }))}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
          <HexColorPicker
            color={settings.primaryColor}
            onChange={(color) => setSettings(prev => ({ ...prev, primaryColor: color }))}
            className="mt-4"
          />
          <p className="text-xs text-gray-500 mt-2">
            Used for: buttons, links, active states, accents
          </p>
        </div>
        
        {/* Secondary Color */}
        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-200"
              style={{ backgroundColor: settings.secondaryColor }}
            />
            <input
              type="text"
              value={settings.secondaryColor}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                secondaryColor: e.target.value 
              }))}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        
        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select
            value={settings.fontFamily}
            onChange={(e) => setSettings(prev => ({ 
              ...prev, 
              fontFamily: e.target.value 
            }))}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {FONT_OPTIONS.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Dark Mode Toggle */}
        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.darkModeEnabled}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                darkModeEnabled: e.target.checked 
              }))}
              className="w-5 h-5 rounded"
            />
            <span className="text-sm font-medium">
              Allow users to enable dark mode
            </span>
          </label>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="px-6 py-2 bg-[var(--brand-primary)] text-white rounded-lg 
                       hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      {/* Live Preview Panel */}
      <div className="lg:sticky lg:top-8">
        <div className="border rounded-xl overflow-hidden shadow-lg">
          <BrandingPreview settings={settings} />
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Preview updates in real-time as you make changes
        </p>
      </div>
    </div>
  );
}
```

---

# Part XI: Super Admin Dashboard

## 11.1 Dashboard UI

**Route**: `/admin` (Super Admin role only, accessed via app.tynebase.com)

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   🏢 Super Admin Dashboard                                                        ║
║                                                                                   ║
║   Manage all TyneBase tenants and platform settings                               ║
║                                                                                   ║
║   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │      47         │  │      412        │  │     $8,420      │  │   98.7%     │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │  Total Tenants  │  │  Total Users    │  │  Monthly MRR    │  │  Uptime     │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   │   ↑ 3 this mo   │  │   ↑ 28 this mo  │  │   ↑ 12%         │  │  Last 30d   │ ║
║   │                 │  │                 │  │                 │  │             │ ║
║   └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────┘ ║
║                                                                                   ║
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                           │   ║
║   │   Company Management                                      [+ New Tenant]  │   ║
║   │                                                                           │   ║
║   │   🔍 Search companies...                    [Plan ▼] [Status ▼] [Sort ▼]  │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │                                                                     │ │   ║
║   │   │  Company          Subdomain       Plan      Users   Storage  Actions│ │   ║
║   │   │  ─────────────────────────────────────────────────────────────────  │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  ┌────┐                                                             │ │   ║
║   │   │  │ACME│  ACME Corp     acme.tynebase    Pro      23    4.2 GB  [···]│ │   ║
║   │   │  └────┘                .com              $49/mo                     │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  ┌────┐                                                             │ │   ║
║   │   │  │ G  │  Globex Inc    globex.tynebase  Company  89    12.1 GB [···]│ │   ║
║   │   │  └────┘                .com              Custom                     │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  ┌────┐                                                             │ │   ║
║   │   │  │ I  │  Initech       initech.tynebase Base     5     234 MB  [···]│ │   ║
║   │   │  └────┘                .com              $20/mo                     │ │   ║
║   │   │                                                                     │ │   ║
║   │   │  ┌────┐                                                             │ │   ║
║   │   │  │ S  │  StartupXYZ    startupxyz       Free     2     45 MB   [···]│ │   ║
║   │   │  └────┘                .tynebase.com                                │ │   ║
║   │   │                                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   Showing 1-10 of 47 companies                    [← Previous] [Next →]   │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
║                                                                                   ║
║   [···] Menu options:                                                             ║
║   • View Details                                                                  ║
║   • Edit Settings                                                                 ║
║   • Impersonate Admin (login as tenant admin)                                     ║
║   • View Usage Stats                                                              ║
║   • Suspend Tenant                                                                ║
║   • Delete Tenant                                                                 ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### 11.2 Create Tenant Modal

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║   ┌───────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                              [✕ Close]    │   ║
║   │                                                                           │   ║
║   │   🏢 Create New Tenant                                                    │   ║
║   │                                                                           │   ║
║   │   Company Name *                                                          │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │  Acme Corporation                                                   │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   Subdomain *                                                             │   ║
║   │   ┌──────────────────────────────────┐                                    │   ║
║   │   │  acme                            │ .tynebase.com                      │   ║
║   │   └──────────────────────────────────┘                                    │   ║
║   │   ✓ Subdomain is available                                                │   ║
║   │                                                                           │   ║
║   │   Admin Email *                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │  admin@acme.com                                                     │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │   An invitation will be sent to this email                                │   ║
║   │                                                                           │   ║
║   │   Subscription Plan                                                       │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │  Pro ($49/month)                                                 ▼  │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   Initial Branding (Optional)                                             │   ║
║   │                                                                           │   ║
║   │   Primary Color          Logo                                             │   ║
║   │   ┌────────────────┐     ┌────────────────────────────┐                   │   ║
║   │   │ ████  #E85002  │     │  [Click to upload logo]    │                   │   ║
║   │   └────────────────┘     └────────────────────────────┘                   │   ║
║   │                                                                           │   ║
║   │                                                                           │   ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐ │   ║
║   │   │                        Create Tenant                                │ │   ║
║   │   └─────────────────────────────────────────────────────────────────────┘ │   ║
║   │                                                                           │   ║
║   │   This will:                                                              │   ║
║   │   • Create tenant database records                                        │   ║
║   │   • Set up isolated storage bucket                                        │   ║
║   │   • Send invitation email to admin                                        │   ║
║   │   • Apply branding settings                                               │   ║
║   │                                                                           │   ║
║   └───────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### 11.3 Tenant Creation API

```typescript
// /app/api/admin/tenants/route.ts

import { createServerClient } from '@supabase/ssr';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  const supabase = createServerClient(/* config */);
  
  // Verify super admin
  const { data: { user } } = await supabase.auth.getUser();
  const { data: adminUser } = await supabase
    .from('users')
    .select('role')
    .eq('id', user?.id)
    .single();
  
  if (adminUser?.role !== 'super_admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const body = await request.json();
  const { 
    name, 
    subdomain, 
    adminEmail, 
    plan, 
    primaryColor, 
    logoUrl 
  } = body;
  
  // Validate subdomain availability
  const { data: existing } = await supabase
    .from('tenants')
    .select('id')
    .eq('subdomain', subdomain)
    .single();
  
  if (existing) {
    return Response.json({ error: 'Subdomain already taken' }, { status: 400 });
  }
  
  // Create tenant
  const tenantId = crypto.randomUUID();
  
  const { error: tenantError } = await supabase
    .from('tenants')
    .insert({
      id: tenantId,
      name,
      subdomain,
      plan,
      primary_color: primaryColor || '#E85002',
      logo_url: logoUrl,
      // Set limits based on plan
      ...getPlanLimits(plan),
    });
  
  if (tenantError) {
    return Response.json({ error: tenantError.message }, { status: 500 });
  }
  
  // Create isolated storage bucket for tenant
  const { error: bucketError } = await supabase.storage.createBucket(
    `tenant-${tenantId}`,
    {
      public: false,
      allowedMimeTypes: [
        'image/*',
        'application/pdf',
        'video/*',
        'audio/*',
        'application/vnd.openxmlformats-officedocument.*',
      ],
      fileSizeLimit: 104857600, // 100MB
    }
  );
  
  if (bucketError) {
    // Rollback tenant creation
    await supabase.from('tenants').delete().eq('id', tenantId);
    return Response.json({ error: 'Failed to create storage bucket' }, { status: 500 });
  }
  
  // Create RLS policy for bucket
  await supabase.rpc('create_tenant_bucket_policy', {
    bucket_name: `tenant-${tenantId}`,
    tenant_id: tenantId,
  });
  
  // Send invitation email to admin
  const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
    adminEmail,
    {
      data: {
        tenant_id: tenantId,
        role: 'admin',
      },
      redirectTo: `https://${subdomain}.tynebase.com/auth/callback`,
    }
  );
  
  if (inviteError) {
    console.error('Failed to send invitation:', inviteError);
    // Don't fail the whole operation, admin can resend later
  }
  
  // Create default categories
  await createDefaultCategories(supabase, tenantId);
  
  // Create default templates
  await createDefaultTemplates(supabase, tenantId);
  
  return Response.json({
    success: true,
    tenant: {
      id: tenantId,
      subdomain,
      url: `https://${subdomain}.tynebase.com`,
    },
  });
}

function getPlanLimits(plan: string) {
  const limits = {
    free: {
      max_users: 1,
      max_storage_mb: 100,
      max_ai_generations_per_month: 10,
    },
    base: {
      max_users: 5,
      max_storage_mb: 1024,
      max_ai_generations_per_month: 50,
    },
    pro: {
      max_users: 25,
      max_storage_mb: 10240,
      max_ai_generations_per_month: 200,
    },
    company: {
      max_users: 999999,
      max_storage_mb: 102400,
      max_ai_generations_per_month: 999999,
    },
  };
  
  return limits[plan] || limits.free;
}
```

---

# Part XII: Complete Data Isolation Verification

## 12.1 Isolation Guarantee

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                         DATA ISOLATION GUARANTEE                                  ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                   ║
║   When logged into acme.tynebase.com, users can ONLY access:                      ║
║                                                                                   ║
║   ✓ ACME's documents, templates, discussions                                      ║
║   ✓ ACME's users and their profiles                                               ║
║   ✓ ACME's storage bucket (tenant-{acme-uuid})                                    ║
║   ✓ ACME's branding settings                                                      ║
║   ✓ ACME's audit logs and lineage data                                            ║
║   ✓ ACME's AI generation history                                                  ║
║   ✓ Public templates (shared across all tenants, read-only)                       ║
║                                                                                   ║
║   ─────────────────────────────────────────────────────────────────────────────   ║
║                                                                                   ║
║   Users can NEVER access:                                                         ║
║                                                                                   ║
║   ✗ Globex's documents (even with direct URL)                                     ║
║   ✗ Globex's users or user data                                                   ║
║   ✗ Globex's storage files                                                        ║
║   ✗ Globex's audit logs                                                           ║
║   ✗ Globex's AI generation history                                                ║
║   ✗ Any other tenant's data                                                       ║
║                                                                                   ║
║   ─────────────────────────────────────────────────────────────────────────────   ║
║                                                                                   ║
║   ENFORCEMENT LAYERS:                                                             ║
║                                                                                   ║
║   1. Middleware extracts tenant from subdomain                                    ║
║   2. JWT claims include tenant_id                                                 ║
║   3. API routes validate tenant context                                           ║
║   4. RLS policies filter ALL queries by tenant_id                                 ║
║   5. Storage buckets are tenant-specific                                          ║
║   6. Even direct database queries are filtered by RLS                             ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

### 12.2 Cross-Tenant Request Handling

```typescript
// Example: What happens if someone tries to access another tenant's document

// User is logged into acme.tynebase.com
// They try to access: /api/documents/globex-document-uuid

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tenant = await TenantContext.fromRequest(request);
  
  // tenant.tenantId = "acme-uuid" (from subdomain)
  
  const { data: document, error } = await tenant.withDatabaseContext(
    async (supabase) => {
      // This query includes RLS policy:
      // WHERE tenant_id = 'acme-uuid'
      
      return supabase
        .from('documents')
        .select('*')
        .eq('id', params.id)  // globex-document-uuid
        .single();
    }
  );
  
  // Result: document = null, error = "Row not found"
  // Because the document belongs to Globex (different tenant_id)
  // RLS automatically filters it out
  
  if (!document) {
    return Response.json({ error: 'Document not found' }, { status: 404 });
  }
  
  return Response.json(document);
}
```

---

## 12.3 Enhanced Tenant Database Schema

```sql
-- Tenants table with full branding support
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  
  -- Subscription
  plan subscription_plan NOT NULL DEFAULT 'free',
  plan_started_at TIMESTAMPTZ DEFAULT NOW(),
  plan_expires_at TIMESTAMPTZ,
  
  -- Branding
  logo_url TEXT,
  logo_dark_url TEXT,  -- Optional dark mode logo
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#E85002',
  secondary_color TEXT DEFAULT '#000000',
  font_family TEXT DEFAULT 'Inter',
  dark_mode_enabled BOOLEAN DEFAULT TRUE,
  custom_css TEXT,  -- Advanced: custom CSS overrides (Enterprise only)
  
  -- Limits (based on plan)
  max_users INTEGER DEFAULT 5,
  max_storage_mb INTEGER DEFAULT 100,
  max_ai_generations_per_month INTEGER DEFAULT 50,
  max_video_duration_minutes INTEGER DEFAULT 5,
  
  -- Usage Tracking
  current_storage_mb INTEGER DEFAULT 0,
  ai_generations_this_month INTEGER DEFAULT 0,
  ai_generations_reset_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'active',  -- 'active', 'suspended', 'cancelled'
  suspended_at TIMESTAMPTZ,
  suspended_reason TEXT,
  
  -- GDPR
  data_processing_agreement_signed BOOLEAN DEFAULT FALSE,
  dpa_signed_at TIMESTAMPTZ,
  data_region TEXT DEFAULT 'eu',  -- 'eu', 'us', 'apac'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,  -- Super admin who created it
  
  -- Indexes
  CONSTRAINT valid_subdomain CHECK (subdomain ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$')
);

CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX idx_tenants_status ON tenants(status);
CREATE INDEX idx_tenants_plan ON tenants(plan);
```

---

## 12.4 Multi-Tenancy Requirements Summary

| Requirement | Implementation | Section |
|-------------|----------------|---------|
| Subdomain routing (company.tynebase.com) | Middleware + DNS | Part IX |
| Dynamic branding per tenant | TenantProvider + CSS variables | Part X |
| White-Label Theme Configurator | Live preview UI | Part X |
| Super Admin Dashboard | Tenant CRUD + impersonation | Part XI |
| Data isolation guarantees | RLS + application layer | Part XII |
| Per-tenant storage buckets | Supabase Storage | Part IX |

---

# Part XIII: API Response Schemas

All API responses follow standardized formats for consistency across the application.

## 1.1 Standard Response Envelope

All API responses follow this structure:

```typescript
// Success Response
interface APIResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
    rateLimit?: RateLimitMeta;
  };
}

// Error Response
interface APIErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: ValidationError[] | Record<string, any>;
    requestId: string;  // For support tickets
  };
}

// Pagination Meta
interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Rate Limit Meta (included in headers too)
interface RateLimitMeta {
  limit: number;
  remaining: number;
  resetAt: string;  // ISO timestamp
}
```

## 1.2 Error Codes

```typescript
enum ErrorCode {
  // Authentication (1xxx)
  AUTH_REQUIRED = 'AUTH_REQUIRED',                    // 401
  AUTH_INVALID_TOKEN = 'AUTH_INVALID_TOKEN',          // 401
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',          // 401
  AUTH_INVALID_CREDENTIALS = 'AUTH_INVALID_CREDENTIALS', // 401
  
  // Authorization (2xxx)
  FORBIDDEN = 'FORBIDDEN',                            // 403
  INSUFFICIENT_ROLE = 'INSUFFICIENT_ROLE',            // 403
  TENANT_SUSPENDED = 'TENANT_SUSPENDED',              // 403
  PLAN_LIMIT_EXCEEDED = 'PLAN_LIMIT_EXCEEDED',        // 403
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',  // 403
  
  // Not Found (3xxx)
  NOT_FOUND = 'NOT_FOUND',                            // 404
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',              // 404
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',          // 404
  USER_NOT_FOUND = 'USER_NOT_FOUND',                  // 404
  
  // Validation (4xxx)
  VALIDATION_ERROR = 'VALIDATION_ERROR',              // 400
  INVALID_INPUT = 'INVALID_INPUT',                    // 400
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',                // 409
  
  // Rate Limiting (5xxx)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',        // 429
  AI_QUOTA_EXCEEDED = 'AI_QUOTA_EXCEEDED',            // 429
  
  // Server Errors (6xxx)
  INTERNAL_ERROR = 'INTERNAL_ERROR',                  // 500
  AI_GENERATION_FAILED = 'AI_GENERATION_FAILED',      // 500
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',  // 502
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',        // 503
}
```

## 1.3 Validation Error Format

```typescript
interface ValidationError {
  field: string;       // Dot notation path: "settings.primaryColor"
  code: string;        // Machine-readable: "too_short", "invalid_format"
  message: string;     // Human-readable: "Title must be at least 3 characters"
  params?: {           // For interpolation
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Example validation error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "code": "too_short",
        "message": "Title must be at least 3 characters",
        "params": { "min": 3 }
      },
      {
        "field": "subdomain",
        "code": "invalid_format",
        "message": "Subdomain can only contain lowercase letters, numbers, and hyphens",
        "params": { "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$" }
      }
    ],
    "requestId": "req_abc123"
  }
}
```

## 1.4 Paginated List Response

```typescript
// GET /api/documents?page=2&pageSize=20
{
  "success": true,
  "data": [
    { "id": "doc_1", "title": "Getting Started", ... },
    { "id": "doc_2", "title": "API Guide", ... },
    // ... 20 items
  ],
  "meta": {
    "pagination": {
      "page": 2,
      "pageSize": 20,
      "totalItems": 247,
      "totalPages": 13,
      "hasNextPage": true,
      "hasPrevPage": true
    }
  }
}
```

## 1.5 Job Status Response

```typescript
interface JobStatusResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;           // 0-100
  progressMessage?: string;   // "Transcribing audio..."
  result?: any;               // On completion
  error?: string;             // On failure
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  estimatedTimeRemaining?: number;  // Seconds
}

// Example: Video processing job
{
  "success": true,
  "data": {
    "id": "job_xyz789",
    "status": "processing",
    "progress": 45,
    "progressMessage": "Transcribing audio with Whisper...",
    "createdAt": "2026-01-08T10:00:00Z",
    "startedAt": "2026-01-08T10:00:05Z",
    "estimatedTimeRemaining": 120
  }
}
```

---

# Part XIV: Loading & Skeleton States

## 2.1 Skeleton Component Specifications

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SKELETON PATTERNS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   DOCUMENT LIST SKELETON                                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                           │  │
│   │  ░░░░░░░  ░░░░░░░░░  ░░░░░░░░░░░░                                       │  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │  │
│   │                                                                         │  │
│   │     ↑ Shimmer animation: left-to-right gradient sweep                   │  │
│   │       Duration: 1.5s, ease-in-out, infinite                             │  │
│   │                                                                         │  │
│   ├─────────────────────────────────────────────────────────────────────────┤  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                                     │  │
│   │  ░░░░░░░  ░░░░░░░░░                                                     │  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                   │  │
│   ├─────────────────────────────────────────────────────────────────────────┤  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                                 │  │
│   │  ░░░░░░░  ░░░░░░░░░  ░░░░░░░░░░                                         │  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STAT CARDS SKELETON                                                           │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│   │               │  │               │  │               │  │               │  │
│   │  ░░░░░░░░░    │  │  ░░░░░░░░░    │  │  ░░░░░░░░░    │  │  ░░░░░░░░░    │  │
│   │  ░░░░░░░░░░░  │  │  ░░░░░░░░░░░  │  │  ░░░░░░░░░░░  │  │  ░░░░░░░░░░░  │  │
│   │  ░░░░░░       │  │  ░░░░░░       │  │  ░░░░░░       │  │  ░░░░░░       │  │
│   │               │  │               │  │               │  │               │  │
│   └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘  │
│                                                                                 │
│   SIDEBAR NAVIGATION SKELETON                                                   │
│   ┌──────────────────────┐                                                      │
│   │  ░░░░░░░░░░░░░░░░░░  │  ← Button skeleton                                  │
│   │                      │                                                      │
│   │  ░░░░  ░░░░░░░░░░░░  │                                                      │
│   │  ░░░░  ░░░░░░░░░░    │                                                      │
│   │  ░░░░  ░░░░░░░░░░░░  │                                                      │
│   │  ░░░░  ░░░░░░░░      │                                                      │
│   │  ░░░░  ░░░░░░░░░░░░  │                                                      │
│   └──────────────────────┘                                                      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 2.2 Skeleton Component Implementation
```TypeScript

    
// /components/ui/Skeleton.tsx

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

// CSS for shimmer animation (Industrial Pulse)
const skeletonStyles = `
  @keyframes skeleton-wave {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .skeleton-wave {
    background: linear-gradient(
      90deg,
      var(--skeleton-base) 0%,
      var(--skeleton-highlight) 50%,
      var(--skeleton-base) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-wave 2s ease-in-out infinite; /* Slower, heavier feel */
  }
`;

// Design tokens for skeleton (Matched to Industrial Palette)
:root {
  /* Concrete / Light Gray tones for Light Mode */
  --skeleton-base: #D4D4D4; 
  --skeleton-highlight: #F9F9F9; /* Canvas White */
}

[data-theme="dark"] {
  /* Dark Metal / Machine tones for Dark Mode */
  --skeleton-base: #1A1A1A; 
  --skeleton-highlight: #333333; /* Dark Gray from palette */
}
```
  

## 2.3 Skeleton Presets
```TypeScript

    
// /components/skeletons/index.tsx

// Document list item skeleton
export function DocumentListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        // Sharp corners (rounded-sm) for industrial look
        <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-sm p-4 bg-white dark:bg-black">
          <Skeleton variant="text" width="60%" height={24} />
          <div className="flex gap-2 mt-2">
            <Skeleton variant="text" width={60} height={20} className="rounded-sm" />
            <Skeleton variant="text" width={80} height={20} className="rounded-sm" />
            <Skeleton variant="text" width={100} height={20} className="rounded-sm" />
          </div>
          <Skeleton variant="text" width="90%" height={16} className="mt-3" />
        </div>
      ))}
    </div>
  );
}

// Stat cards skeleton
export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-sm p-4 bg-white dark:bg-black">
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="60%" height={16} className="mt-2" />
          <Skeleton variant="text" width="30%" height={14} className="mt-1" />
        </div>
      ))}
    </div>
  );
}

// Document editor skeleton
export function EditorSkeleton() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm bg-white dark:bg-black">
      <div className="border-b border-neutral-200 dark:border-neutral-800 p-3 flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" width={32} height={32} className="rounded-sm" />
        ))}
      </div>
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="80%" height={36} className="mb-6" /> {/* Title */}
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="95%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
        <div className="h-4" />
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="85%" height={16} />
      </div>
    </div>
  );
}

// Sidebar skeleton
export function SidebarSkeleton() {
  return (
    <div className="w-60 border-r border-neutral-200 dark:border-neutral-800 p-4 space-y-4 bg-[#F9F9F9] dark:bg-black h-screen">
      <Skeleton variant="rectangular" width="100%" height={40} className="rounded-sm" />
      <div className="space-y-2 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-2">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width="70%" height={20} />
          </div>
        ))}
      </div>
    </div>
  );
}

  
```

## 2.4 AI Generation Progress UI

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           AI GENERATION PROGRESS                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   STATE 1: Queued                                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  ⏳ Waiting in queue...                                                  │  │
│   │  Position: 3                                                             │  │
│   │  Estimated wait: ~2 minutes                                              │  │
│   │                                                                          │  │
│   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%      │  │
│   │                                                                          │  │
│   │  [Cancel]                                                                │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STATE 2: Processing                                                           │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  🔄 Generating your document...                                          │  │
│   │                                                                          │  │
│   │  ███████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  45%        │  │
│   │                                                                          │  │
│   │  ✓ Retrieving context from knowledge base                               │  │
│   │  ✓ Building prompt with 3 source documents                              │  │
│   │  ◉ Generating content with Claude 4.5...                                │  │
│   │  ○ Formatting output                                                     │  │
│   │  ○ Creating document                                                     │  │
│   │                                                                          │  │
│   │  Estimated time remaining: ~45 seconds                                   │  │
│   │                                                                          │  │
│   │  [Cancel]                                                                │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STATE 3: Streaming (when applicable)                                          │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                          │  │
│   │  # Security Best Practices                                               │  │
│   │                                                                          │  │
│   │  This comprehensive guide covers the essential security                  │  │
│   │  practices that every employee should follow...█                         │  │
│   │                                                                          │  │
│   │  ─────────────────────────────────────────────────────────────────────   │  │
│   │  Generating... 847 words • 2.3 KB                                        │  │
│   │                                                                          │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STATE 4: Completed                                                            │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  ✅ Document generated successfully!                                     │  │
│   │                                                                          │  │
│   │  📄 Security Best Practices Guide                                        │  │
│   │  1,847 words • Created just now                                          │  │
│   │                                                                          │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  Preview of generated content...                                  │  │  │
│   │  │                                                                   │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                          │  │
│   │  [Edit Document]  [Add to Knowledge Base]  [Discard]                     │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STATE 5: Failed                                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  ❌ Generation failed                                                    │  │
│   │                                                                          │  │
│   │  The AI service encountered an error while generating your document.    │  │
│   │                                                                          │  │
│   │  Error: AI_GENERATION_FAILED                                             │  │
│   │  Request ID: req_abc123xyz                                               │  │
│   │                                                                          │  │
│   │  [Try Again]  [Contact Support]                                          │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 2.5 Polling Configuration

```typescript
// /lib/polling.ts

export const POLLING_CONFIG = {
  // AI generation jobs
  aiGeneration: {
    initialInterval: 1000,      // 1 second
    maxInterval: 5000,          // 5 seconds
    backoffMultiplier: 1.5,     // Exponential backoff
    maxDuration: 5 * 60 * 1000, // 5 minutes max
  },
  
  // Video processing jobs (longer running)
  videoProcessing: {
    initialInterval: 2000,      // 2 seconds
    maxInterval: 10000,         // 10 seconds
    backoffMultiplier: 1.5,
    maxDuration: 30 * 60 * 1000, // 30 minutes max
  },
  
  // GDPR export jobs
  dataExport: {
    initialInterval: 3000,
    maxInterval: 15000,
    backoffMultiplier: 2,
    maxDuration: 60 * 60 * 1000, // 1 hour max
  },
  
  // Audit report generation
  auditReport: {
    initialInterval: 2000,
    maxInterval: 10000,
    backoffMultiplier: 1.5,
    maxDuration: 10 * 60 * 1000, // 10 minutes max
  },
};

// Polling hook
export function useJobPolling(
  jobId: string | null,
  config: typeof POLLING_CONFIG.aiGeneration
) {
  const [job, setJob] = useState<JobStatusResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef(config.initialInterval);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!jobId) return;
    
    startTimeRef.current = Date.now();
    let timeoutId: NodeJS.Timeout;
    
    const poll = async () => {
      try {
        const response = await api.get<JobStatusResponse>(`/api/jobs/${jobId}`);
        setJob(response);
        
        if (response.status === 'completed' || response.status === 'failed') {
          return; // Stop polling
        }
        
        // Check max duration
        if (Date.now() - startTimeRef.current! > config.maxDuration) {
          setError(new Error('Job timed out'));
          return;
        }
        
        // Schedule next poll with backoff
        intervalRef.current = Math.min(
          intervalRef.current * config.backoffMultiplier,
          config.maxInterval
        );
        timeoutId = setTimeout(poll, intervalRef.current);
        
      } catch (err) {
        setError(err as Error);
      }
    };
    
    poll();
    
    return () => clearTimeout(timeoutId);
  }, [jobId]);
  
  return { job, error };
}
```

## 2.6 Upload Progress UI

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FILE UPLOAD PROGRESS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   UPLOADING STATE                                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  📹 product-demo-jan-2026.mp4                                           │  │
│   │  245 MB • Uploading...                                                  │  │
│   │                                                                         │  │
│   │  ████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  67%          │  │
│   │  164.2 MB / 245 MB • 2.3 MB/s • ~35 seconds remaining                   │  │
│   │                                                                         │  │
│   │  [Cancel Upload]                                                        │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   PROCESSING STATE (after upload)                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  📹 product-demo-jan-2026.mp4                                           │  │
│   │  245 MB • Uploaded ✓                                                    │  │
│   │                                                                         │  │
│   │  ████████████████████████████████████████████████████████████  100%     │  │
│   │                                                                         │  │
│   │  ⏳ Queued for processing...                                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   MULTI-FILE UPLOAD                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  Uploading 3 files                                           [Cancel All]│  │
│   │                                                                         │  │
│   │  ┌─────────────────────────────────────────────────────────────────┐   │  │
│   │  │ 📄 document.pdf              2.3 MB    ████████████████ 100% ✓   │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │ 📹 video.mp4                 45 MB     ████████░░░░░░░░  45%    │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │ 🎵 audio.mp3                 12 MB     ░░░░░░░░░░░░░░░░  0%     │   │  │
│   │  └─────────────────────────────────────────────────────────────────┘   │  │
│   │                                                                         │  │
│   │  Overall: 47.3 MB / 59.3 MB • 79% complete                              │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# Part XV: Empty States

## 3.1 Empty State Designs

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EMPTY STATE PATTERNS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   NO DOCUMENTS YET                                                              │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                         ╭───────────────╮                               │  │
│   │                         │               │                               │  │
│   │                         │      📄       │                               │  │
│   │                         │     ════      │                               │  │
│   │                         │     ────      │                               │  │
│   │                         │     ────      │                               │  │
│   │                         │               │                               │  │
│   │                         ╰───────────────╯                               │  │
│   │                                                                         │  │
│   │                    No documents yet                                     │  │
│   │                                                                         │  │
│   │        Start building your knowledge base by creating                   │  │
│   │          your first document or using AI to generate one.               │  │
│   │                                                                         │  │
│   │                                                                         │  │
│   │          ┌───────────────────┐    ┌───────────────────┐                │  │
│   │          │  + Create Document │    │  ✨ Generate with AI│              │  │
│   │          └───────────────────┘    └───────────────────┘                │  │
│   │           Primary button           Secondary button                     │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO SEARCH RESULTS                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              🔍                                         │  │
│   │                                                                         │  │
│   │                   No results for "kubernetes deployment"                │  │
│   │                                                                         │  │
│   │                  Try adjusting your search or filters:                  │  │
│   │                  • Check for typos                                      │  │
│   │                  • Use fewer or different keywords                      │  │
│   │                  • Clear category filters                               │  │
│   │                                                                         │  │
│   │                        [Clear Filters]                                  │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO DISCUSSIONS                                                                │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              💬                                         │  │
│   │                                                                         │  │
│   │                    Start the conversation                               │  │
│   │                                                                         │  │
│   │          No discussions yet. Be the first to ask a question,            │  │
│   │             share an idea, or start a conversation!                     │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │  + Start a Discussion  │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO TEMPLATES                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              📋                                         │  │
│   │                                                                         │  │
│   │                    No templates available                               │  │
│   │                                                                         │  │
│   │           Create reusable templates to standardize your                 │  │
│   │              team's documentation and save time.                        │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │   + Create Template    │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   │      💡 Tip: Browse public templates from the TyneBase community        │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO TEAM MEMBERS (Tenant has no users)                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              👥                                         │  │
│   │                                                                         │  │
│   │                        Invite your team                                 │  │
│   │                                                                         │  │
│   │         Collaborate with your team by inviting them to join.            │  │
│   │        You can invite up to 25 team members on the Pro plan.            │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │    + Invite Members    │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   │                  Current plan: Pro • 0/25 seats used                    │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   EMPTY AUDIT REPORT                                                            │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              📊                                         │  │
│   │                                                                         │  │
│   │                   Not enough data for audit                             │  │
│   │                                                                         │  │
│   │          The content audit requires at least 5 published                │  │
│   │            documents to generate meaningful insights.                   │  │
│   │                                                                         │  │
│   │                     Current: 2 published documents                      │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │    View Documents      │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO AI GENERATIONS                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              ✨                                         │  │
│   │                                                                         │  │
│   │                   No AI generations yet                                 │  │
│   │                                                                         │  │
│   │          Use AI to generate documents from prompts, videos,             │  │
│   │             or enhance your existing content.                           │  │
│   │                                                                         │  │
│   │        ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│   │        │ From Prompt │  │ From Video  │  │  Enhance    │               │  │
│   │        └─────────────┘  └─────────────┘  └─────────────┘               │  │
│   │                                                                         │  │
│   │           Remaining this month: 47/50 generations                       │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3.2 Empty State Component

```typescript
// /components/ui/EmptyState.tsx

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  tip?: string;
  metadata?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  tip,
  metadata,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 flex items-center justify-center text-4xl text-gray-400 mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {description}
      </p>
      
      {(primaryAction || secondaryAction) && (
        <div className="flex gap-3">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>
              {primaryAction.icon}
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
      
      {tip && (
        <p className="mt-6 text-xs text-gray-500 flex items-center gap-1">
          💡 {tip}
        </p>
      )}
      
      {metadata && (
        <p className="mt-4 text-xs text-gray-400">
          {metadata}
        </p>
      )}
    </div>
  );
}
```

---

# Part XVI: Error States

## 4.1 Error Page Designs

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ERROR STATE PATTERNS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   NETWORK ERROR                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              📡                                         │  │
│   │                              ╳                                          │  │
│   │                                                                         │  │
│   │                     Connection lost                                     │  │
│   │                                                                         │  │
│   │        We couldn't connect to our servers. Please check your            │  │
│   │          internet connection and try again.                             │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │       Try Again        │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   403 FORBIDDEN (Insufficient Role)                                             │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              🔒                                         │  │
│   │                                                                         │  │
│   │                     Access denied                                       │  │
│   │                                                                         │  │
│   │      You don't have permission to access this page. This action         │  │
│   │       requires the Editor or Admin role.                                │  │
│   │                                                                         │  │
│   │        Current role: Contributor                                        │  │
│   │                                                                         │  │
│   │       ┌────────────────────┐   ┌────────────────────┐                  │  │
│   │       │    Go Back         │   │  Request Access    │                  │  │
│   │       └────────────────────┘   └────────────────────┘                  │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   404 NOT FOUND                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              🔍                                         │  │
│   │                              ❓                                         │  │
│   │                                                                         │  │
│   │                     Page not found                                      │  │
│   │                                                                         │  │
│   │      The page you're looking for doesn't exist or has been moved.       │  │
│   │                                                                         │  │
│   │       ┌────────────────────┐   ┌────────────────────┐                  │  │
│   │       │    Go Home         │   │    Go Back         │                  │  │
│   │       └────────────────────┘   └────────────────────┘                  │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   RATE LIMIT EXCEEDED                                                           │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              ⏱️                                         │  │
│   │                                                                         │  │
│   │                   Too many requests                                     │  │
│   │                                                                         │  │
│   │       You've made too many requests. Please wait a moment               │  │
│   │         before trying again.                                            │  │
│   │                                                                         │  │
│   │              Retry available in: 00:45                                  │  │
│   │              ░░░░░░░░░░░░░░█████████████████████████                    │  │
│   │                                                                         │  │
│   │                   [Try Again] (disabled until timer)                    │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   TENANT SUSPENDED                                                              │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              ⚠️                                         │  │
│   │                                                                         │  │
│   │                   Account suspended                                     │  │
│   │                                                                         │  │
│   │       Your organization's account has been suspended.                   │  │
│   │                                                                         │  │
│   │           Reason: Payment failed                                        │  │
│   │           Suspended: January 5, 2026                                    │  │
│   │                                                                         │  │
│   │       Please contact your administrator or our support team             │  │
│   │         to resolve this issue.                                          │  │
│   │                                                                         │  │
│   │                   ┌────────────────────────┐                            │  │
│   │                   │    Contact Support     │                            │  │
│   │                   └────────────────────────┘                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   STORAGE QUOTA EXCEEDED                                                        │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              💾                                         │  │
│   │                                                                         │  │
│   │                   Storage limit reached                                 │  │
│   │                                                                         │  │
│   │       You've used all available storage on your current plan.           │  │
│   │                                                                         │  │
│   │             ████████████████████████████████████████  10.0 / 10 GB     │  │
│   │                                                                         │  │
│   │       ┌─────────────────────┐   ┌─────────────────────┐                │  │
│   │       │   Manage Storage    │   │   Upgrade Plan      │                │  │
│   │       └─────────────────────┘   └─────────────────────┘                │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   AI GENERATION FAILED                                                          │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │                              🤖                                         │  │
│   │                              ❌                                         │  │
│   │                                                                         │  │
│   │                   AI generation failed                                  │  │
│   │                                                                         │  │
│   │       We encountered an issue while generating your document.           │  │
│   │         This might be a temporary problem with our AI service.          │  │
│   │                                                                         │  │
│   │           Error: EXTERNAL_SERVICE_ERROR                                 │  │
│   │           Request ID: req_xyz789                                        │  │
│   │                                                                         │  │
│   │       ┌─────────────────────┐   ┌─────────────────────┐                │  │
│   │       │     Try Again       │   │  Report Problem     │                │  │
│   │       └─────────────────────┘   └─────────────────────┘                │  │
│   │                                                                         │  │
│   │       💡 Your prompt has been saved. You won't be charged for           │  │
│   │          failed generations.                                            │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 4.2 Error Boundary Component

```typescript
// /components/ErrorBoundary.tsx

interface ErrorFallbackProps {
  error: Error;
  errorCode?: ErrorCode;
  requestId?: string;
  resetError: () => void;
}

export function ErrorFallback({
  error,
  errorCode,
  requestId,
  resetError,
}: ErrorFallbackProps) {
  const errorConfig = getErrorConfig(errorCode);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="text-5xl mb-4">{errorConfig.icon}</div>
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {errorConfig.title}
      </h2>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-4">
        {errorConfig.description}
      </p>
      
      {errorConfig.details && (
        <div className="text-xs text-gray-500 mb-4 space-y-1">
          <p>Error: {errorCode}</p>
          {requestId && <p>Request ID: {requestId}</p>}
        </div>
      )}
      
      <div className="flex gap-3">
        {errorConfig.primaryAction && (
          <Button onClick={errorConfig.primaryAction.action}>
            {errorConfig.primaryAction.label}
          </Button>
        )}
        {errorConfig.secondaryAction && (
          <Button variant="outline" onClick={errorConfig.secondaryAction.action}>
            {errorConfig.secondaryAction.label}
          </Button>
        )}
      </div>
      
      {errorConfig.tip && (
        <p className="mt-6 text-xs text-gray-500">
          💡 {errorConfig.tip}
        </p>
      )}
    </div>
  );
}

function getErrorConfig(code?: ErrorCode) {
  const configs: Record<ErrorCode, ErrorConfigType> = {
    NETWORK_ERROR: {
      icon: '📡',
      title: 'Connection lost',
      description: "We couldn't connect to our servers. Please check your internet connection.",
      primaryAction: { label: 'Try Again', action: () => window.location.reload() },
    },
    FORBIDDEN: {
      icon: '🔒',
      title: 'Access denied',
      description: "You don't have permission to access this page.",
      primaryAction: { label: 'Go Back', action: () => history.back() },
      secondaryAction: { label: 'Request Access', action: () => {} },
    },
    NOT_FOUND: {
      icon: '🔍',
      title: 'Page not found',
      description: "The page you're looking for doesn't exist or has been moved.",
      primaryAction: { label: 'Go Home', action: () => window.location.href = '/dashboard' },
      secondaryAction: { label: 'Go Back', action: () => history.back() },
    },
    RATE_LIMIT_EXCEEDED: {
      icon: '⏱️',
      title: 'Too many requests',
      description: "You've made too many requests. Please wait before trying again.",
      details: true,
    },
    TENANT_SUSPENDED: {
      icon: '⚠️',
      title: 'Account suspended',
      description: "Your organization's account has been suspended.",
      primaryAction: { label: 'Contact Support', action: () => window.open('mailto:support@tynebase.com') },
    },
    STORAGE_QUOTA_EXCEEDED: {
      icon: '💾',
      title: 'Storage limit reached',
      description: "You've used all available storage on your current plan.",
      primaryAction: { label: 'Manage Storage', action: () => {} },
      secondaryAction: { label: 'Upgrade Plan', action: () => {} },
    },
    AI_GENERATION_FAILED: {
      icon: '🤖',
      title: 'AI generation failed',
      description: 'We encountered an issue while generating your document.',
      primaryAction: { label: 'Try Again', action: () => {} },
      secondaryAction: { label: 'Report Problem', action: () => {} },
      tip: "Your prompt has been saved. You won't be charged for failed generations.",
      details: true,
    },
    // ... more error configs
  };
  
  return configs[code!] || {
    icon: '❌',
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    primaryAction: { label: 'Try Again', action: () => window.location.reload() },
  };
}
```

## 4.3 Toast Notifications for Errors

```typescript
// /lib/toast.ts

export const toast = {
  error: (message: string, options?: ToastOptions) => {
    showToast({
      type: 'error',
      message,
      duration: options?.duration || 5000,
      action: options?.action,
    });
  },
  
  networkError: () => {
    showToast({
      type: 'error',
      message: 'Network error. Check your connection.',
      duration: 0, // Don't auto-dismiss
      action: {
        label: 'Retry',
        onClick: () => window.location.reload(),
      },
    });
  },
  
  rateLimitError: (resetAt: Date) => {
    const seconds = Math.ceil((resetAt.getTime() - Date.now()) / 1000);
    showToast({
      type: 'error',
      message: `Too many requests. Try again in ${seconds}s`,
      duration: seconds * 1000,
    });
  },
  
  validationError: (errors: ValidationError[]) => {
    showToast({
      type: 'error',
      message: errors.map(e => e.message).join('. '),
      duration: 5000,
    });
  },
};
```

---

# Part XVII: Form Validation Rules

## 5.1 Validation Schema

```typescript
// /lib/validation/schemas.ts

import { z } from 'zod';

// Reserved subdomains that cannot be used
const RESERVED_SUBDOMAINS = [
  'www', 'api', 'app', 'admin', 'dashboard', 'auth', 'login', 'signup',
  'register', 'mail', 'email', 'support', 'help', 'docs', 'blog',
  'static', 'assets', 'cdn', 'media', 'images', 'files', 'download',
  'billing', 'pay', 'payment', 'checkout', 'account', 'settings',
  'status', 'health', 'test', 'demo', 'staging', 'dev', 'development',
  'prod', 'production', 'internal', 'private', 'public', 'beta', 'alpha',
];

// Document title
export const documentTitleSchema = z
  .string()
  .min(3, 'Title must be at least 3 characters')
  .max(200, 'Title must be less than 200 characters')
  .regex(
    /^[a-zA-Z0-9\s\-_.,!?'"()[\]]+$/,
    'Title contains invalid characters'
  );

// Subdomain
export const subdomainSchema = z
  .string()
  .min(3, 'Subdomain must be at least 3 characters')
  .max(50, 'Subdomain must be less than 50 characters')
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    'Subdomain can only contain lowercase letters, numbers, and hyphens (cannot start or end with hyphen)'
  )
  .refine(
    (val) => !val.includes('--'),
    'Subdomain cannot contain consecutive hyphens'
  )
  .refine(
    (val) => !RESERVED_SUBDOMAINS.includes(val.toLowerCase()),
    'This subdomain is reserved'
  );

// Email
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email must be less than 255 characters')
  .transform((val) => val.toLowerCase().trim());

// Password
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Hex color
export const hexColorSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color format')
  .transform((val) => val.toUpperCase());

// File upload
export const fileUploadSchema = z.object({
  name: z.string().max(255),
  size: z.number().max(
    500 * 1024 * 1024, // 500MB
    'File size must be less than 500MB'
  ),
  type: z.string().refine(
    (type) => ALLOWED_MIME_TYPES.includes(type),
    'File type not allowed'
  ),
});

const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  // Documents
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // Video
  'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo',
  // Audio
  'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg',
  // Text
  'text/plain', 'text/markdown', 'text/csv',
];

// Video-specific limits
export const videoUploadSchema = z.object({
  size: z.number().max(
    500 * 1024 * 1024,
    'Video must be less than 500MB'
  ),
  type: z.enum([
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'
  ]),
  duration: z.number().max(
    60 * 60, // 60 minutes (varies by plan, checked server-side)
    'Video duration exceeds your plan limit'
  ).optional(),
});

// Logo upload
export const logoUploadSchema = z.object({
  size: z.number().max(
    2 * 1024 * 1024, // 2MB
    'Logo must be less than 2MB'
  ),
  type: z.enum(['image/png', 'image/svg+xml']),
  width: z.number().max(1000, 'Logo width must be less than 1000px').optional(),
  height: z.number().max(500, 'Logo height must be less than 500px').optional(),
});

// Username / Display name
export const displayNameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(
    /^[\p{L}\p{M}\s\-'.]+$/u, // Unicode letters, marks, spaces, hyphens, apostrophes, periods
    'Name contains invalid characters'
  );

// Discussion/comment content
export const contentSchema = z
  .string()
  .min(1, 'Content cannot be empty')
  .max(50000, 'Content must be less than 50,000 characters');

// AI prompt
export const aiPromptSchema = z
  .string()
  .min(10, 'Prompt must be at least 10 characters')
  .max(10000, 'Prompt must be less than 10,000 characters');

// URL
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL must be less than 2048 characters');

// YouTube URL specifically
export const youtubeUrlSchema = z
  .string()
  .regex(
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]{11}(\S*)?$/,
    'Invalid YouTube URL'
  );
```

## 5.2 Form Validation Component

```typescript
// /components/forms/FormField.tsx

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
  showPasswordStrength?: boolean;
  // ... other props
}

export function FormField({
  name,
  label,
  type = 'text',
  error,
  touched,
  required,
  hint,
  showPasswordStrength,
  ...props
}: FormFieldProps) {
  const showError = touched && error;
  
  return (
    <div className="space-y-1">
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Input
        id={name}
        name={name}
        type={type}
        className={cn(
          showError && 'border-red-500 focus:ring-red-500'
        )}
        aria-invalid={showError}
        aria-describedby={showError ? `${name}-error` : undefined}
        {...props}
      />
      
      {showPasswordStrength && type === 'password' && props.value && (
        <PasswordStrengthMeter password={props.value as string} />
      )}
      
      {hint && !showError && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
      
      {showError && (
        <p 
          id={`${name}-error`}
          className="text-xs text-red-500 flex items-center gap-1"
          role="alert"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// Password strength meter
function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);
  
  const levels = [
    { min: 0, label: 'Very weak', color: 'bg-red-500' },
    { min: 25, label: 'Weak', color: 'bg-orange-500' },
    { min: 50, label: 'Fair', color: 'bg-yellow-500' },
    { min: 75, label: 'Strong', color: 'bg-green-500' },
    { min: 90, label: 'Very strong', color: 'bg-green-600' },
  ];
  
  const level = [...levels].reverse().find(l => strength >= l.min)!;
  
  return (
    <div className="space-y-1">
      <div className="h-1 w-full bg-gray-200 rounded">
        <div 
          className={cn('h-full rounded transition-all', level.color)}
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{level.label}</p>
    </div>
  );
}
```

## 5.3 Plan-Based Validation

```typescript
// /lib/validation/plan-limits.ts

interface PlanLimits {
  maxUsers: number;
  maxStorageMB: number;
  maxAiGenerationsPerMonth: number;
  maxVideoDurationMinutes: number;
  maxFileUploadMB: number;
}

const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    maxUsers: 1,
    maxStorageMB: 100,
    maxAiGenerationsPerMonth: 10,
    maxVideoDurationMinutes: 5,
    maxFileUploadMB: 10,
  },
  base: {
    maxUsers: 5,
    maxStorageMB: 1024,
    maxAiGenerationsPerMonth: 50,
    maxVideoDurationMinutes: 30,
    maxFileUploadMB: 50,
  },
  pro: {
    maxUsers: 25,
    maxStorageMB: 10240,
    maxAiGenerationsPerMonth: 200,
    maxVideoDurationMinutes: 60,
    maxFileUploadMB: 200,
  },
  company: {
    maxUsers: Infinity,
    maxStorageMB: 102400,
    maxAiGenerationsPerMonth: Infinity,
    maxVideoDurationMinutes: 120,
    maxFileUploadMB: 500,
  },
};

export function validateAgainstPlanLimits(
  plan: SubscriptionPlan,
  action: 'upload' | 'invite' | 'generate',
  value: number,
  currentUsage: number
): ValidationResult {
  const limits = PLAN_LIMITS[plan];
  
  switch (action) {
    case 'upload':
      if (currentUsage + value > limits.maxStorageMB * 1024 * 1024) {
        return {
          valid: false,
          error: 'STORAGE_QUOTA_EXCEEDED',
          message: `This upload would exceed your storage limit of ${limits.maxStorageMB}MB`,
          upgradeUrl: '/settings/billing?upgrade=storage',
        };
      }
      break;
      
    case 'invite':
      if (currentUsage + 1 > limits.maxUsers) {
        return {
          valid: false,
          error: 'PLAN_LIMIT_EXCEEDED',
          message: `You've reached the maximum of ${limits.maxUsers} users on your plan`,
          upgradeUrl: '/settings/billing?upgrade=users',
        };
      }
      break;
      
    case 'generate':
      if (currentUsage + 1 > limits.maxAiGenerationsPerMonth) {
        return {
          valid: false,
          error: 'AI_QUOTA_EXCEEDED',
          message: `You've used all ${limits.maxAiGenerationsPerMonth} AI generations this month`,
          upgradeUrl: '/settings/billing?upgrade=ai',
        };
      }
      break;
  }
  
  return { valid: true };
}
```

---

# Part XVIII: Responsive Breakpoints

## 6.1 Breakpoint System

```typescript
// /lib/breakpoints.ts

export const BREAKPOINTS = {
  xs: 0,      // 0px - 479px: Small phones
  sm: 480,    // 480px - 639px: Large phones
  md: 640,    // 640px - 767px: Small tablets
  lg: 768,    // 768px - 1023px: Tablets
  xl: 1024,   // 1024px - 1279px: Small laptops
  '2xl': 1280, // 1280px+: Desktops
} as const;

// Tailwind config alignment
// sm: 640px → Our 'md'
// md: 768px → Our 'lg'
// lg: 1024px → Our 'xl'
// xl: 1280px → Our '2xl'

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,      // 0-639px
  tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`, // 640-1023px
  desktop: `(min-width: ${BREAKPOINTS.xl}px)`,         // 1024px+
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
};
```

## 6.2 Responsive Behaviors

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           RESPONSIVE BEHAVIORS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   NAVIGATION                                                                    │
│   ─────────────────────────────────────────────────────────────────────────     │
│                                                                                 │
│   Desktop (≥1024px):                                                            │
│   ┌──────────────────────────────────────────────────────────────────────────┐  │
│   │  ┌──────────┐                                                            │  │
│   │  │          │                                                            │  │
│   │  │  SIDEBAR │                    MAIN CONTENT                            │  │
│   │  │          │                                                            │  │
│   │  │  240px   │                                                            │  │
│   │  │  fixed   │                                                            │  │
│   │  │          │                                                            │  │
│   │  └──────────┘                                                            │  │
│   └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   Tablet (768px - 1023px):                                                      │
│   ┌──────────────────────────────────────────────────────────────────────────┐  │
│   │  ┌────┐                                                                  │  │
│   │  │    │  SIDEBAR COLLAPSED                                               │  │
│   │  │ 64 │  Icons only                                                      │  │
│   │  │ px │  Tooltip on hover                   MAIN CONTENT                 │  │
│   │  │    │  Expand on click/hover                                           │  │
│   │  └────┘                                                                  │  │
│   └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   Mobile (<768px):                                                              │
│   ┌──────────────────────────────────────────────────────────────────────────┐  │
│   │  ┌────────────────────────────────────────────────────────────────────┐  │  │
│   │  │  [☰]  TYNEBASE                                     [🔔] [👤]      │  │  │
│   │  └────────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                          │  │
│   │                                                                          │  │
│   │                         MAIN CONTENT                                     │  │
│   │                         Full width                                       │  │
│   │                                                                          │  │
│   │                                                                          │  │
│   │  ┌────────────────────────────────────────────────────────────────────┐  │  │
│   │  │  [📚]     [🤖]     [📊]     [💬]     [📋]                         │  │  │
│   │  │  Home   AI Assist  Audit  Community Templates                      │  │  │
│   │  └────────────────────────────────────────────────────────────────────┘  │  │
│   └──────────────────────────────────────────────────────────────────────────┘  │
│       ↑ Bottom navigation bar (fixed)                                          │
│       ↑ Hamburger menu opens slide-out drawer                                   │
│                                                                                 │
│   DOCUMENT LIST → CARDS ON MOBILE                                               │
│   ─────────────────────────────────────────────────────────────────────────     │
│                                                                                 │
│   Desktop:                                                                      │
│   ┌──────────────────────────────────────────────────────────────────────────┐  │
│   │  Title                  Category    Status    Updated      Views  Actions│  │
│   │  ─────────────────────────────────────────────────────────────────────── │  │
│   │  Getting Started        Onboarding  Published 2 days ago   1,234   [···] │  │
│   │  API Documentation      Technical   Draft     5 hours ago    89    [···] │  │
│   └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   Mobile:                                                                       │
│   ┌─────────────────────────────────┐                                           │
│   │  Getting Started                │                                           │
│   │  ╭───────────╮                  │                                           │
│   │  │ Published │  Onboarding      │                                           │
│   │  ╰───────────╯                  │                                           │
│   │  Updated 2 days ago • 1,234 👁️  │                                           │
│   ├─────────────────────────────────┤                                           │
│   │  API Documentation              │                                           │
│   │  ╭───────╮                      │                                           │
│   │  │ Draft │  Technical           │                                           │
│   │  ╰───────╯                      │                                           │
│   │  Updated 5 hours ago • 89 👁️    │                                           │
│   └─────────────────────────────────┘                                           │
│                                                                                 │
│   STAT CARDS                                                                    │
│   ─────────────────────────────────────────────────────────────────────────     │
│                                                                                 │
│   Desktop: 4 columns                                                            │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                                      │
│   │       │ │       │ │       │ │       │                                      │
│   └───────┘ └───────┘ └───────┘ └───────┘                                      │
│                                                                                 │
│   Tablet: 2 columns                                                             │
│   ┌───────────┐ ┌───────────┐                                                   │
│   │           │ │           │                                                   │
│   └───────────┘ └───────────┘                                                   │
│   ┌───────────┐ ┌───────────┐                                                   │
│   │           │ │           │                                                   │
│   └───────────┘ └───────────┘                                                   │
│                                                                                 │
│   Mobile: Horizontal scroll or 1 column                                         │
│   ┌─────────────────────────────────┐                                           │
│   │  247 Total Articles  ↑ 12      │ ← Swipe →                                 │
│   └─────────────────────────────────┘                                           │
│                                                                                 │
│   SIDEBAR DRAWER (Mobile)                                                       │
│   ─────────────────────────────────────────────────────────────────────────     │
│   ┌───────────────────────┬─────────────────────────────────────────────────┐  │
│   │                       │                                                 │  │
│   │  ┌───────────────┐    │                                                 │  │
│   │  │    LOGO       │    │          (Dimmed overlay)                       │  │
│   │  └───────────────┘    │                                                 │  │
│   │                       │           Click to close                        │  │
│   │  ┌───────────────┐    │                                                 │  │
│   │  │ + Create      │    │                                                 │  │
│   │  └───────────────┘    │                                                 │  │
│   │                       │                                                 │  │
│   │  📚 Knowledge         │                                                 │  │
│   │  🤖 AI Assistant      │                                                 │  │
│   │  📊 Content Audit     │                                                 │  │
│   │  💬 Community         │                                                 │  │
│   │  📋 Templates         │                                                 │  │
│   │                       │                                                 │  │
│   │  ────────────────     │                                                 │  │
│   │                       │                                                 │  │
│   │  ⚙️ Settings          │                                                 │  │
│   │  👤 Profile           │                                                 │  │
│   │  🚪 Sign Out          │                                                 │  │
│   │                       │                                                 │  │
│   │   280px width         │                                                 │  │
│   │   Slide from left     │                                                 │  │
│   │   Animation: 200ms    │                                                 │  │
│   └───────────────────────┴─────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 6.3 Responsive Hooks

```typescript
// /hooks/useBreakpoint.ts

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS>('xl');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.sm) setBreakpoint('xs');
      else if (width < BREAKPOINTS.md) setBreakpoint('sm');
      else if (width < BREAKPOINTS.lg) setBreakpoint('md');
      else if (width < BREAKPOINTS.xl) setBreakpoint('lg');
      else if (width < BREAKPOINTS['2xl']) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return {
    breakpoint,
    isMobile: ['xs', 'sm'].includes(breakpoint),
    isTablet: ['md', 'lg'].includes(breakpoint),
    isDesktop: ['xl', '2xl'].includes(breakpoint),
  };
}

// /hooks/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
}
```

---

# Part XIX: Document Editor Specifications

## 7.1 Editor Choice & Configuration

```typescript
// /components/editor/DocumentEditor.tsx

// Using TipTap (based on ProseMirror) for:
// - Markdown support
// - Collaborative editing potential
// - Extensible architecture
// - Good mobile support

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

const EDITOR_CONFIG = {
  // Auto-save configuration
  autoSave: {
    enabled: true,
    interval: 30000,        // 30 seconds
    debounce: 2000,         // 2 seconds after typing stops
    showIndicator: true,    // Show "Saving..." indicator
  },
  
  // Conflict detection
  conflictCheck: {
    enabled: true,
    pollInterval: 60000,    // Check for conflicts every 60 seconds
  },
  
  // Undo/Redo limits
  history: {
    depth: 100,
    newGroupDelay: 500,
  },
};

export function DocumentEditor({
  initialContent,
  documentId,
  onSave,
  readOnly = false,
}: DocumentEditorProps) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasConflict, setHasConflict] = useState(false);
  const [serverVersion, setServerVersion] = useState<number | null>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: EDITOR_CONFIG.history,
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        // Syntax highlighting languages
      }),
    ],
    content: initialContent,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });
  
  // Auto-save with debounce
  const debouncedSave = useDebouncedCallback(
    async () => {
      if (!editor || readOnly) return;
      
      setIsSaving(true);
      try {
        const content = editor.getJSON();
        await onSave(content);
        setLastSaved(new Date());
      } catch (error) {
        toast.error('Failed to save. Changes will be retried.');
      } finally {
        setIsSaving(false);
      }
    },
    EDITOR_CONFIG.autoSave.debounce
  );
  
  // Listen for content changes
  useEffect(() => {
    if (!editor) return;
    
    editor.on('update', () => {
      debouncedSave();
    });
  }, [editor, debouncedSave]);
  
  // Periodic conflict check
  useEffect(() => {
    if (!documentId || !EDITOR_CONFIG.conflictCheck.enabled) return;
    
    const interval = setInterval(async () => {
      const { data } = await api.get(`/api/documents/${documentId}/version`);
      if (data.version > serverVersion!) {
        setHasConflict(true);
      }
    }, EDITOR_CONFIG.conflictCheck.pollInterval);
    
    return () => clearInterval(interval);
  }, [documentId, serverVersion]);
  
  return (
    <div className="relative">
      {/* Toolbar */}
      <EditorToolbar editor={editor} />
      
      {/* Conflict warning */}
      {hasConflict && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This document has been modified by another user.
            </p>
          </div>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="outline" onClick={handleReload}>
              Load latest version
            </Button>
            <Button size="sm" variant="outline" onClick={handleMerge}>
              Compare changes
            </Button>
          </div>
        </div>
      )}
      
      {/* Editor content */}
      <EditorContent editor={editor} />
      
      {/* Save indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        {isSaving ? (
          <span className="flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Saving...
          </span>
        ) : lastSaved ? (
          <span>Saved {formatDistanceToNow(lastSaved)} ago</span>
        ) : null}
      </div>
    </div>
  );
}
```

## 7.2 Version Comparison UI

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           VERSION COMPARISON                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  Comparing versions                                      [Close]        │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────┐    ┌───────────────────────────┐        │  │
│   │  │ Version 5 (Current)    ▼ │    │ Version 4 (Previous)   ▼ │        │  │
│   │  └───────────────────────────┘    └───────────────────────────┘        │  │
│   │                                                                         │  │
│   │  ┌─────────────────────────────┬─────────────────────────────┐         │  │
│   │  │                             │                             │         │  │
│   │  │  # Security Guide           │  # Security Guide           │         │  │
│   │  │                             │                             │         │  │
│   │  │  Welcome to our ██████████  │  Welcome to our security    │         │  │
│   │  │  ██████ guide...            │  guide...                   │         │  │
│   │  │                             │                             │         │  │
│   │  │  ## Password Policy         │  ## Password Policy         │         │  │
│   │  │                             │                             │         │  │
│   │  │  Your password must:        │  Your password must:        │         │  │
│   │  │  - Be at least 12 chars     │  - Be at least 8 chars      │         │  │
│   │  │  ████████████████████████   │                             │         │  │
│   │  │  - ██████████████████████   │                             │         │  │
│   │  │                             │                             │         │  │
│   │  │      ↑ Added (green bg)     │      ↑ Removed (red bg)     │         │  │
│   │  │      ↑ Changed (yellow bg)  │                             │         │  │
│   │  │                             │                             │         │  │
│   │  └─────────────────────────────┴─────────────────────────────┘         │  │
│   │                                                                         │  │
│   │  Changes summary: +2 additions, -0 deletions, 1 modification            │  │
│   │                                                                         │  │
│   │  ┌─────────────────────┐    ┌─────────────────────┐                    │  │
│   │  │  Restore Version 4  │    │  Keep Current       │                    │  │
│   │  └─────────────────────┘    └─────────────────────┘                    │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# Part XX: Search UI Details

## 8.1 Search Configuration

```typescript
// /lib/search/config.ts

export const SEARCH_CONFIG = {
  // Input behavior
  debounce: 300,              // ms to wait after typing
  minQueryLength: 2,          // Minimum characters to trigger search
  maxQueryLength: 200,        // Maximum query length
  
  // Results
  resultsPerGroup: 5,         // Items per category in quick results
  maxResults: 50,             // Max results on full search page
  
  // Recent searches
  maxRecentSearches: 10,      // Number of recent searches to store
  recentSearchesKey: 'tynebase_recent_searches',
  
  // Highlighting
  highlightTag: 'mark',
  highlightClass: 'bg-yellow-200 dark:bg-yellow-800 rounded px-0.5',
};

// Search result grouping
export const SEARCH_GROUPS = [
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'discussions', label: 'Discussions', icon: MessageSquare },
  { key: 'templates', label: 'Templates', icon: Layout },
  { key: 'users', label: 'People', icon: Users },
] as const;
```

## 8.2 Search UI Components

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SEARCH UI                                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   SEARCH INPUT (Collapsed - in header)                                          │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  🔍  Search knowledge base...                              ⌘K           │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│       ↑ Click or ⌘K to open search modal                                        │
│                                                                                 │
│   SEARCH MODAL (Expanded)                                                       │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  🔍  security best practices█                                    │  │  │
│   │  │                                                           [ESC]   │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  FILTERS                                                          │  │  │
│   │  │  ┌─────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────┐       │  │  │
│   │  │  │All Types│ │All Categories│ │ Any Date    ▼│ │Any Status│       │  │  │
│   │  │  └─────────┘ └─────────────┘ └──────────────┘ └──────────┘       │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │  ── 📄 Documents (3) ───────────────────────────────────────────────   │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  📄 <mark>Security</mark> <mark>Best</mark> <mark>Practices</mark> │  │  │
│   │  │     Guide                                                         │  │  │
│   │  │     ...covers essential <mark>security</mark> measures including  │  │  │
│   │  │     password policies, VPN usage, and data handling...            │  │  │
│   │  │     ╭───────────╮ Onboarding • Updated 2 days ago                 │  │  │
│   │  │     │ Published │                                                 │  │  │
│   │  │     ╰───────────╯                                                 │  │  │
│   │  ├───────────────────────────────────────────────────────────────────┤  │  │
│   │  │  📄 VPN <mark>Security</mark> Configuration                       │  │  │
│   │  │     How to set up and maintain <mark>secure</mark> VPN access...  │  │  │
│   │  │     ╭───────╮ IT • Updated 1 week ago                             │  │  │
│   │  │     │ Draft │                                                     │  │  │
│   │  │     ╰───────╯                                                     │  │  │
│   │  ├───────────────────────────────────────────────────────────────────┤  │  │
│   │  │  📄 Password <mark>Best</mark> <mark>Practices</mark>             │  │  │
│   │  │     Guidelines for creating and managing <mark>secure</mark>...   │  │  │
│   │  │     ╭───────────╮ Security • Updated 1 month ago                  │  │  │
│   │  │     │ Published │                                                 │  │  │
│   │  │     ╰───────────╯                                                 │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │  [View all 3 documents →]                                               │  │
│   │                                                                         │  │
│   │  ── 💬 Discussions (2) ─────────────────────────────────────────────   │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  💬 Question about <mark>security</mark> audit requirements       │  │  │
│   │  │     Posted by Sarah M. • 5 replies • 3 days ago                   │  │  │
│   │  ├───────────────────────────────────────────────────────────────────┤  │  │
│   │  │  💬 <mark>Best</mark> <mark>practices</mark> for API keys         │  │  │
│   │  │     Posted by John D. • 12 replies • 1 week ago                   │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │  [View all 2 discussions →]                                             │  │
│   │                                                                         │  │
│   │  ── No templates match ─────────────────────────────────────────────   │  │
│   │                                                                         │  │
│   │  ────────────────────────────────────────────────────────────────────   │  │
│   │                                                                         │  │
│   │  💡 Recent searches:                                                    │  │
│   │  onboarding • api documentation • team meeting notes                    │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   NO RESULTS STATE                                                              │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  🔍  kubernetes deployment guide█                                │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │                              🔍                                         │  │
│   │                                                                         │  │
│   │          No results for "kubernetes deployment guide"                   │  │
│   │                                                                         │  │
│   │              Try:                                                       │  │
│   │              • Using different keywords                                 │  │
│   │              • Checking for typos                                       │  │
│   │              • Removing filters                                         │  │
│   │                                                                         │  │
│   │              ┌────────────────────────────────────────┐                │  │
│   │              │  ✨ Generate with AI                   │                │  │
│   │              │  Create a document about this topic    │                │  │
│   │              └────────────────────────────────────────┘                │  │
│   │                                                                         │  │
│   │  ────────────────────────────────────────────────────────────────────   │  │
│   │  💡 Recent searches:                                                    │  │
│   │  onboarding • api documentation • team meeting notes                    │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 8.3 Search Implementation

```typescript
// /components/search/GlobalSearch.tsx

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    SEARCH_CONFIG.recentSearchesKey,
    []
  );
  
  // Debounced search
  const debouncedQuery = useDebouncedValue(query, SEARCH_CONFIG.debounce);
  
  // Search query
  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery, filters],
    queryFn: () => api.get('/api/search', { 
      params: { q: debouncedQuery, ...filters } 
    }),
    enabled: debouncedQuery.length >= SEARCH_CONFIG.minQueryLength,
  });
  
  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Save recent search
  const saveRecentSearch = (term: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== term);
      return [term, ...filtered].slice(0, SEARCH_CONFIG.maxRecentSearches);
    });
  };
  
  // Highlight matching text
  const highlightMatches = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className={SEARCH_CONFIG.highlightClass}>
          {part}
        </mark>
      ) : part
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <button className="...">
          <Search className="w-4 h-4" />
          <span>Search...</span>
          <kbd className="...">⌘K</kbd>
        </button>
      </DialogTrigger>
      
      {/* Search modal content */}
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-2 border-b pb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search knowledge base..."
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Filters */}
        <SearchFilters filters={filters} onChange={setFilters} />
        
        {/* Results */}
        <div className="overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <SearchResultsSkeleton />
          ) : results ? (
            <GroupedSearchResults 
              results={results} 
              query={query}
              highlightMatches={highlightMatches}
            />
          ) : query.length < SEARCH_CONFIG.minQueryLength ? (
            <RecentSearches 
              searches={recentSearches}
              onSelect={(term) => { setQuery(term); saveRecentSearch(term); }}
            />
          ) : (
            <NoSearchResults 
              query={query}
              onGenerateWithAI={() => {/* Navigate to AI assistant */}}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

# Part XXI: Notification System UI

## 9.1 Notification Components

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           NOTIFICATION SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   NOTIFICATION BELL (Header)                                                    │
│   ┌───────────────┐                                                             │
│   │      🔔       │ ← Bell icon                                                │
│   │      ⬤       │ ← Red dot badge (unread count > 0)                         │
│   │       3      │ ← Count (if > 0, max "9+")                                  │
│   └───────────────┘                                                             │
│                                                                                 │
│   NOTIFICATION DROPDOWN                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  Notifications                                    [Mark all as read]   │  │
│   │                                                                         │  │
│   │  ┌─────────────────────────────────────────────────────────────────┐   │  │
│   │  │  ⬤  📄 New comment on "Security Guide"                          │   │  │
│   │  │     Sarah M. commented: "Great guide! One question..."          │   │  │
│   │  │     2 minutes ago                                                │   │  │
│   │  │                                                           [···] │   │  │
│   │  │     ↑ Blue dot = unread                                          │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │  ⬤  ✅ Your document was approved                                │   │  │
│   │  │     "API Documentation" is now published                         │   │  │
│   │  │     15 minutes ago                                               │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │  ⬤  📋 You were assigned a document                              │   │  │
│   │  │     "Q1 Roadmap" needs your review                               │   │  │
│   │  │     1 hour ago                                                   │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │     🎥 Video processing complete                                 │   │  │
│   │  │     "Product Demo" transcript is ready                           │   │  │
│   │  │     Yesterday                                                    │   │  │
│   │  │     ↑ No dot = read                                              │   │  │
│   │  ├─────────────────────────────────────────────────────────────────┤   │  │
│   │  │     💬 New reply to your discussion                              │   │  │
│   │  │     John replied to "Best practices for..."                      │   │  │
│   │  │     2 days ago                                                   │   │  │
│   │  └─────────────────────────────────────────────────────────────────┘   │  │
│   │                                                                         │  │
│   │                         [View all notifications]                        │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│       Width: 380px                                                              │
│       Max height: 480px (scrollable)                                            │
│       Position: Right-aligned under bell                                        │
│                                                                                 │
│   TOAST NOTIFICATIONS                                                           │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │   Position: Top-right                                                   │  │
│   │   Stack: Max 3 visible                                                  │  │
│   │   Animation: Slide in from right                                        │  │
│   │                                                                         │  │
│   │                          ┌─────────────────────────────────────────┐   │  │
│   │                          │  ✅ Document saved successfully         │   │  │
│   │                          │                                    [×] │   │  │
│   │                          └─────────────────────────────────────────┘   │  │
│   │                                                                         │  │
│   │                          ┌─────────────────────────────────────────┐   │  │
│   │                          │  ⚠️ Upload failed                        │   │  │
│   │                          │  File exceeds 500MB limit               │   │  │
│   │                          │                         [Retry] [×]     │   │  │
│   │                          └─────────────────────────────────────────┘   │  │
│   │                                                                         │  │
│   │   Auto-dismiss:                                                         │  │
│   │   - Success: 3 seconds                                                  │  │
│   │   - Info: 5 seconds                                                     │  │
│   │   - Warning: 5 seconds                                                  │  │
│   │   - Error: No auto-dismiss (requires manual close)                      │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 9.2 Real-time Updates Strategy

```typescript
// /lib/notifications/realtime.ts

// Using Supabase Realtime for notifications
// Falls back to polling if WebSocket fails

export const NOTIFICATION_CONFIG = {
  // Polling fallback
  pollingInterval: 30000,     // 30 seconds
  
  // WebSocket
  reconnectAttempts: 5,
  reconnectDelay: 1000,       // Start with 1 second
  maxReconnectDelay: 30000,   // Max 30 seconds
  
  // UI
  maxVisibleToasts: 3,
  toastDurations: {
    success: 3000,
    info: 5000,
    warning: 5000,
    error: 0,  // No auto-dismiss
  },
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  
  const supabase = useSupabaseClient();
  const { user, tenantId } = useAuth();
  
  // Subscribe to realtime notifications
  useEffect(() => {
    if (!user || !tenantId) return;
    
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new as Notification;
          setNotifications(prev => [notification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show toast for important notifications
          if (notification.showToast) {
            toast.custom((t) => (
              <NotificationToast 
                notification={notification}
                onDismiss={() => toast.dismiss(t.id)}
              />
            ));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CLOSED') {
          setConnectionStatus('disconnected');
        }
      });
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, tenantId]);
  
  // Fallback polling when WebSocket is disconnected
  useEffect(() => {
    if (connectionStatus === 'connected') return;
    
    const interval = setInterval(async () => {
      const { data } = await api.get('/api/notifications', {
        params: { unreadOnly: true, since: lastFetchTime },
      });
      
      if (data?.length > 0) {
        setNotifications(prev => [...data, ...prev]);
        setUnreadCount(prev => prev + data.length);
      }
    }, NOTIFICATION_CONFIG.pollingInterval);
    
    return () => clearInterval(interval);
  }, [connectionStatus]);
  
  // Mark as read
  const markAsRead = async (notificationId: string) => {
    await api.post(`/api/notifications/${notificationId}/read`);
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  const markAllAsRead = async () => {
    await api.post('/api/notifications/read-all');
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };
  
  return {
    notifications,
    unreadCount,
    connectionStatus,
    markAsRead,
    markAllAsRead,
  };
}
```

---

# Part XXII: Permission/RBAC UI

## 10.1 Role-Based UI Adaptations

```typescript
// /lib/rbac/permissions.ts

export const PERMISSIONS = {
  // Documents
  'documents.create': ['admin', 'editor', 'contributor'],
  'documents.edit_own': ['admin', 'editor', 'contributor'],
  'documents.edit_any': ['admin', 'editor'],
  'documents.delete_own': ['admin', 'editor', 'contributor'],
  'documents.delete_any': ['admin'],
  'documents.publish': ['admin', 'editor'],
  'documents.archive': ['admin', 'editor'],
  
  // Templates
  'templates.create': ['admin', 'editor'],
  'templates.approve': ['admin'],
  
  // Community
  'discussions.create': ['admin', 'editor', 'premium', 'contributor', 'view_only'],
  'discussions.moderate': ['admin', 'editor'],
  'discussions.pin': ['admin'],
  'discussions.lock': ['admin', 'editor'],
  
  // Users
  'users.view': ['admin'],
  'users.invite': ['admin'],
  'users.remove': ['admin'],
  'users.change_role': ['admin'],
  
  // Settings
  'settings.view': ['admin'],
  'settings.edit': ['admin'],
  'branding.edit': ['admin'],
  
  // Audit
  'audit.view': ['admin', 'editor'],
  'audit.export': ['admin'],
  
  // AI
  'ai.generate': ['admin', 'editor', 'premium', 'contributor'],
  'ai.video_upload': ['admin', 'editor', 'premium'],
} as const;

export function hasPermission(
  userRole: UserRole,
  permission: keyof typeof PERMISSIONS
): boolean {
  return PERMISSIONS[permission]?.includes(userRole) ?? false;
}

// Hook for components
export function usePermission(permission: keyof typeof PERMISSIONS): boolean {
  const { user } = useAuth();
  return hasPermission(user?.role, permission);
}

// Component wrapper
export function RequirePermission({
  permission,
  children,
  fallback,
}: {
  permission: keyof typeof PERMISSIONS;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const hasAccess = usePermission(permission);
  
  if (!hasAccess) {
    return fallback || null;
  }
  
  return <>{children}</>;
}
```

## 10.2 Disabled States & Upgrade CTAs

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PERMISSION UI PATTERNS                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   DISABLED BUTTON (Insufficient Role)                                           │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │   ┌────────────────────────────┐                                        │  │
│   │   │   🔒 Publish Document      │  ← Grayed out, lock icon               │  │
│   │   └────────────────────────────┘                                        │  │
│   │                                                                         │  │
│   │   Hover tooltip:                                                        │  │
│   │   ┌────────────────────────────────────────────────────────┐           │  │
│   │   │  You need the Editor or Admin role to publish          │           │  │
│   │   │  documents. Contact your administrator for access.     │           │  │
│   │   └────────────────────────────────────────────────────────┘           │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   UPGRADE CTA (Plan Limit)                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │   ┌────────────────────────────┐                                        │  │
│   │   │   ✨ Generate with AI      │  ← Still clickable                     │  │
│   │   └────────────────────────────┘                                        │  │
│   │                                                                         │  │
│   │   On click (if quota exceeded):                                         │  │
│   │   ┌─────────────────────────────────────────────────────────────────┐  │  │
│   │   │                                                                 │  │  │
│   │   │           ✨ AI Generation Limit Reached                        │  │  │
│   │   │                                                                 │  │  │
│   │   │   You've used all 10 AI generations this month on the          │  │  │
│   │   │   Free plan. Upgrade to Pro for 200 generations/month.         │  │  │
│   │   │                                                                 │  │  │
│   │   │   ████████████████████████████████████████  10/10 used          │  │  │
│   │   │                                                                 │  │  │
│   │   │   Resets in: 23 days                                           │  │  │
│   │   │                                                                 │  │  │
│   │   │   ┌─────────────────┐   ┌─────────────────┐                    │  │  │
│   │   │   │  Upgrade to Pro │   │  Maybe Later    │                    │  │  │
│   │   │   │    $49/month    │   │                 │                    │  │  │
│   │   │   └─────────────────┘   └─────────────────┘                    │  │  │
│   │   │                                                                 │  │  │
│   │   └─────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   ROLE BADGES IN USER LIST                                                      │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  ┌────────────────────────────────────────────────────────────────────┐ │  │
│   │  │  👤 Sarah Mitchell   sarah@acme.com                                │ │  │
│   │  │     ╭───────╮                                                      │ │  │
│   │  │     │ Admin │  ← Purple badge                                      │ │  │
│   │  │     ╰───────╯                                                      │ │  │
│   │  ├────────────────────────────────────────────────────────────────────┤ │  │
│   │  │  👤 John Doe         john@acme.com                                 │ │  │
│   │  │     ╭────────╮                                                     │ │  │
│   │  │     │ Editor │  ← Blue badge                                       │ │  │
│   │  │     ╰────────╯                                                     │ │  │
│   │  ├────────────────────────────────────────────────────────────────────┤ │  │
│   │  │  👤 Jane Smith       jane@acme.com                                 │ │  │
│   │  │     ╭─────────────╮                                                │ │  │
│   │  │     │ Contributor │  ← Green badge                                 │ │  │
│   │  │     ╰─────────────╯                                                │ │  │
│   │  ├────────────────────────────────────────────────────────────────────┤ │  │
│   │  │  👤 Guest User       guest@acme.com                                │ │  │
│   │  │     ╭───────────╮                                                  │ │  │
│   │  │     │ View Only │  ← Gray badge                                    │ │  │
│   │  │     ╰───────────╯                                                  │ │  │
│   │  └────────────────────────────────────────────────────────────────────┘ │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   HIDDEN NAV ITEMS (No Permission)                                              │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │  Contributor sees:          Admin sees:                                 │  │
│   │                                                                         │  │
│   │  📚 Knowledge                📚 Knowledge                               │  │
│   │  🤖 AI Assistant             🤖 AI Assistant                            │  │
│   │  💬 Community                📊 Content Audit                           │  │
│   │  📋 Templates                💬 Community                               │  │
│   │                              📋 Templates                               │  │
│   │  (No Settings, Users,        ─────────────                              │  │
│   │   Audit, or Branding)        ⚙️ Settings                                │  │
│   │                              👥 Users                                   │  │
│   │                              🎨 Branding                                │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 10.3 Role Badge Component

```typescript
// /components/ui/RoleBadge.tsx

const ROLE_STYLES: Record<UserRole, { bg: string; text: string; label: string }> = {
  super_admin: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Super Admin' },
  admin: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Admin' },
  editor: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Editor' },
  premium: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Premium' },
  contributor: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Contributor' },
  view_only: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', label: 'View Only' },
};

export function RoleBadge({ role }: { role: UserRole }) {
  const style = ROLE_STYLES[role];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      style.bg,
      style.text
    )}>
      {style.label}
    </span>
  );
}
```

---

# Part XXIII: Logic Fixes & Edge Cases

## 11.1 Subdomain Routing Fixes

```typescript
// /middleware.ts (Updated)

const RESERVED_SUBDOMAINS = [
  'www', 'api', 'app', 'admin', 'dashboard', 'auth', 'login', 'signup',
  'mail', 'support', 'help', 'docs', 'blog', 'status', 'cdn', 'static',
];

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);
  
  // Handle www redirect
  if (subdomain === 'www') {
    const url = new URL(request.url);
    url.host = url.host.replace('www.', '');
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // Handle reserved subdomains
  if (subdomain && RESERVED_SUBDOMAINS.includes(subdomain)) {
    // Allow api.tynebase.com to pass through to Fly.io
    if (subdomain === 'api') {
      return NextResponse.next();
    }
    
    // app.tynebase.com is Super Admin dashboard
    if (subdomain === 'app') {
      // Validate super admin auth
      const token = request.cookies.get('auth_token');
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url));
      }
      return NextResponse.next();
    }
    
    // Other reserved subdomains → 404
    return NextResponse.rewrite(new URL('/404', request.url));
  }
  
  // No subdomain = main marketing site
  if (!subdomain) {
    return NextResponse.next();
  }
  
  // Validate tenant subdomain
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('id, name, subdomain, status, logo_url, primary_color')
    .eq('subdomain', subdomain)
    .single();
  
  // Invalid subdomain → Custom 404 page
  if (error || !tenant) {
    return NextResponse.rewrite(new URL('/tenant-not-found', request.url));
  }
  
  // Suspended tenant → Custom error page
  if (tenant.status === 'suspended') {
    return NextResponse.rewrite(new URL('/tenant-suspended', request.url));
  }
  
  // Valid tenant → Set context headers
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenant.id);
  response.headers.set('x-tenant-subdomain', tenant.subdomain);
  
  return response;
}
```

## 11.2 Auth Flow Clarifications

```typescript
// /lib/auth/flows.ts

/**
 * AUTH FLOW MATRIX
 * 
 * 1. MAIN SITE SIGNUP (tynebase.com/signup)
 *    - User creates account
 *    - User creates new tenant (with subdomain)
 *    - User becomes Admin of new tenant
 *    - Redirect to {subdomain}.tynebase.com/dashboard
 * 
 * 2. TENANT INVITE ACCEPTANCE
 *    - Admin sends invite → User receives email
 *    - User clicks link → /auth/accept-invite?token=xxx
 *    - If user exists: Link to tenant, redirect to dashboard
 *    - If new user: Create account, link to tenant, redirect to set password
 * 
 * 3. TENANT SUBDOMAIN LOGIN ({subdomain}.tynebase.com/login)
 *    - User enters email/password
 *    - Validate user belongs to this tenant
 *    - If not in tenant: "You don't have access to this organization"
 *    - If valid: Create session, redirect to dashboard
 * 
 * 4. MAGIC LINK FLOW
 *    - User requests magic link
 *    - Email sent with token
 *    - Click link → /auth/verify?token=xxx&type=magiclink
 *    - Validate token, create session
 *    - If multi-tenant user: Show tenant picker
 *    - If single tenant: Redirect to that tenant's dashboard
 */

// Tenant selection for multi-tenant users
export async function getUserTenants(userId: string): Promise<Tenant[]> {
  const { data } = await supabase
    .from('users')
    .select('tenant:tenants(*)')
    .eq('id', userId);
  
  return data?.map(u => u.tenant) || [];
}

// Main site signup with tenant creation
export async function signupWithTenant(params: {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
  subdomain: string;
}): Promise<{ user: User; tenant: Tenant }> {
  // 1. Validate subdomain is available
  const { data: existing } = await supabase
    .from('tenants')
    .select('id')
    .eq('subdomain', params.subdomain)
    .single();
  
  if (existing) {
    throw new ValidationError('subdomain', 'already_taken', 'This subdomain is already in use');
  }
  
  // 2. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: { full_name: params.fullName },
    },
  });
  
  if (authError) throw authError;
  
  // 3. Create tenant
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      name: params.companyName,
      subdomain: params.subdomain,
      plan: 'free',
    })
    .select()
    .single();
  
  if (tenantError) {
    // Rollback: Delete auth user
    await supabase.auth.admin.deleteUser(authData.user!.id);
    throw tenantError;
  }
  
  // 4. Create storage bucket
  try {
    await supabase.storage.createBucket(`tenant-${tenant.id}`, {
      public: false,
      fileSizeLimit: 100 * 1024 * 1024, // 100MB for free plan
    });
  } catch (bucketError) {
    // Rollback: Delete tenant and auth user
    await supabase.from('tenants').delete().eq('id', tenant.id);
    await supabase.auth.admin.deleteUser(authData.user!.id);
    throw new Error('Failed to create storage. Please try again.');
  }
  
  // 5. Create user record linked to tenant
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user!.id,
      tenant_id: tenant.id,
      email: params.email,
      full_name: params.fullName,
      role: 'admin', // First user is admin
    })
    .select()
    .single();
  
  if (userError) {
    // Rollback everything
    await supabase.storage.deleteBucket(`tenant-${tenant.id}`);
    await supabase.from('tenants').delete().eq('id', tenant.id);
    await supabase.auth.admin.deleteUser(authData.user!.id);
    throw userError;
  }
  
  return { user, tenant };
}

// Invite acceptance flow
export async function acceptInvite(params: {
  token: string;
  password?: string;
}): Promise<{ user: User; tenant: Tenant; needsPassword: boolean }> {
  // 1. Validate token
  const { data: invite, error } = await supabase
    .from('invites')
    .select('*, tenant:tenants(*)')
    .eq('token', params.token)
    .single();
  
  if (error || !invite) {
    throw new Error('Invalid or expired invitation');
  }
  
  if (new Date(invite.expires_at) < new Date()) {
    throw new Error('This invitation has expired');
  }
  
  // 2. Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', invite.email)
    .single();
  
  if (existingUser) {
    // User exists - just link to tenant
    await supabase
      .from('users')
      .insert({
        id: existingUser.id,
        tenant_id: invite.tenant_id,
        email: invite.email,
        role: invite.role,
      });
    
    return {
      user: existingUser,
      tenant: invite.tenant,
      needsPassword: false,
    };
  }
  
  // 3. New user - create account
  if (!params.password) {
    // Need to collect password first
    return {
      user: null as any,
      tenant: invite.tenant,
      needsPassword: true,
    };
  }
  
  // Create auth user with password
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: invite.email,
    password: params.password,
  });
  
  if (authError) throw authError;
  
  // Create user record
  const { data: user } = await supabase
    .from('users')
    .insert({
      id: authData.user!.id,
      tenant_id: invite.tenant_id,
      email: invite.email,
      role: invite.role,
    })
    .select()
    .single();
  
  // Mark invite as used
  await supabase
    .from('invites')
    .update({ used_at: new Date().toISOString() })
    .eq('id', invite.id);
  
  return {
    user: user!,
    tenant: invite.tenant,
    needsPassword: false,
  };
}
```

## 11.3 AI Generation Timeout Handling

```typescript
// /components/ai/GenerationProgress.tsx

const TIMEOUT_CONFIG = {
  maxDuration: 5 * 60 * 1000,  // 5 minutes
  warningThreshold: 4 * 60 * 1000,  // 4 minutes (show warning)
};

export function GenerationProgress({ jobId }: { jobId: string }) {
  const { job, error } = useJobPolling(jobId, POLLING_CONFIG.aiGeneration);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const startTimeRef = useRef(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      
      if (elapsed > TIMEOUT_CONFIG.warningThreshold) {
        setShowTimeoutWarning(true);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle client-side timeout
  if (error?.message === 'Job timed out') {
    return (
      <div className="...">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
        <h3>Generation is taking longer than expected</h3>
        <p>
          Your document is still being generated in the background.
          We'll notify you when it's ready.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => window.location.href = '/dashboard/ai-assistant/history'}>
            View in History
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Check Status
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="...">
      {/* Normal progress UI */}
      <ProgressBar progress={job?.progress || 0} />
      <p>{job?.progressMessage}</p>
      
      {/* Timeout warning */}
      {showTimeoutWarning && job?.status === 'processing' && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
          <p className="text-yellow-700 dark:text-yellow-300">
            This is taking longer than usual. You can safely leave this page -
            we'll notify you when the generation is complete.
          </p>
        </div>
      )}
    </div>
  );
}
```

## 11.4 Tenant Creation Rollback Strategy

```typescript
// /lib/tenant/creation.ts

interface RollbackStep {
  name: string;
  execute: () => Promise<void>;
}

export async function createTenantWithRollback(params: TenantCreateParams): Promise<Tenant> {
  const rollbackSteps: RollbackStep[] = [];
  
  try {
    // Step 1: Create tenant record
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: params.name,
        subdomain: params.subdomain,
        plan: params.plan || 'free',
      })
      .select()
      .single();
    
    if (tenantError) throw tenantError;
    
    rollbackSteps.push({
      name: 'tenant_record',
      execute: async () => {
        await supabase.from('tenants').delete().eq('id', tenant.id);
      },
    });
    
    // Step 2: Create storage bucket
    const bucketName = `tenant-${tenant.id}`;
    const { error: bucketError } = await supabase.storage.createBucket(bucketName, {
      public: false,
      fileSizeLimit: getPlanStorageLimit(params.plan || 'free'),
    });
    
    if (bucketError) throw bucketError;
    
    rollbackSteps.push({
      name: 'storage_bucket',
      execute: async () => {
        await supabase.storage.deleteBucket(bucketName);
      },
    });
    
    // Step 3: Create RLS policy for bucket
    const { error: policyError } = await supabase.rpc('create_tenant_bucket_policy', {
      bucket_name: bucketName,
      tenant_id: tenant.id,
    });
    
    if (policyError) throw policyError;
    
    rollbackSteps.push({
      name: 'bucket_policy',
      execute: async () => {
        await supabase.rpc('drop_tenant_bucket_policy', { bucket_name: bucketName });
      },
    });
    
    // Step 4: Create admin user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: params.adminEmail,
      email_confirm: true,
      user_metadata: { tenant_id: tenant.id },
    });
    
    if (userError) throw userError;
    
    rollbackSteps.push({
      name: 'admin_user',
      execute: async () => {
        await supabase.auth.admin.deleteUser(user.user.id);
      },
    });
    
    // Step 5: Link user to tenant
    const { error: linkError } = await supabase
      .from('users')
      .insert({
        id: user.user.id,
        tenant_id: tenant.id,
        email: params.adminEmail,
        role: 'admin',
      });
    
    if (linkError) throw linkError;
    
    // Step 6: Send invitation email
    const { error: inviteError } = await sendTenantInvitationEmail({
      email: params.adminEmail,
      tenantName: params.name,
      subdomain: params.subdomain,
    });
    
    if (inviteError) {
      // Email failure is non-fatal - log but continue
      console.error('Failed to send invitation email:', inviteError);
    }
    
    // Step 7: Create default categories
    await createDefaultCategories(tenant.id);
    
    // Success!
    return tenant;
    
  } catch (error) {
    // Rollback in reverse order
    console.error('Tenant creation failed, rolling back...', error);
    
    for (const step of rollbackSteps.reverse()) {
      try {
        console.log(`Rolling back: ${step.name}`);
        await step.execute();
      } catch (rollbackError) {
        console.error(`Failed to rollback ${step.name}:`, rollbackError);
        // Continue with other rollbacks
      }
    }
    
    throw error;
  }
}
```

---

# Summary: Changes to Main PRD

This addendum should be integrated into the main PRD. Key sections to update:

1. **Add API Response Schemas** → After Tech Stack section
2. **Add Skeleton/Loading specs** → Inside Part II (Design System)
3. **Add Empty States** → Inside Part II (Design System)
4. **Add Error States** → New subsection in Part II
5. **Add Validation Rules** → New section after Database Schema
6. **Update Breakpoints** → In Design Tokens section
7. **Add Document Editor specs** → New section in Part II
8. **Add Search UI specs** → Inside Part II
9. **Add Notification specs** → Inside Part II
10. **Add RBAC UI specs** → Inside Part II
11. **Update Middleware** → In Part IX (Subdomain Routing)
12. **Add Auth Flows** → After Supabase Auth section
13. **Update Polling Config** → In Part VIII-B (Fly.io)
14. **Add Rollback Strategy** → In Part XI (Super Admin)

---

# Part XXIV: Security & Optimization Fixes

**Priority**: CRITICAL — Must be implemented before any production deployment

---

# 🚨 Critical Fix 1: Hardened RLS Policies (Subdomain Auth Trap)

## The Vulnerability

Supabase Auth cookies are set on `.tynebase.com` (root domain) for SSO convenience. This means:

1. User logs into `acme.tynebase.com` → Cookie set on `.tynebase.com`
2. User manually navigates to `globex.tynebase.com`
3. Cookie is still valid → `auth.uid()` returns the Acme user's ID
4. If RLS only checks `tenant_id = get_current_tenant_id()` (from subdomain header), data could leak

## The Fix: Double-Verification RLS

**Every single RLS policy must verify the user belongs to the tenant.**

```sql
-- ═══════════════════════════════════════════════════════════════════════════════
-- HARDENED RLS POLICIES - ENFORCE USER-TENANT MEMBERSHIP
-- ═══════════════════════════════════════════════════════════════════════════════

-- Helper function to verify user belongs to current tenant
CREATE OR REPLACE FUNCTION user_belongs_to_tenant()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND tenant_id = get_current_tenant_id()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ─────────────────────────────────────────────────────────────────────────────
-- DOCUMENTS TABLE - All policies hardened
-- ─────────────────────────────────────────────────────────────────────────────

-- SELECT: Own tenant + user must belong to tenant
DROP POLICY IF EXISTS documents_select_all ON documents;
CREATE POLICY documents_select_all ON documents
  FOR SELECT
  USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()  -- CRITICAL: Added check
  );

-- SELECT: Published docs (still requires tenant membership)
DROP POLICY IF EXISTS documents_select_published ON documents;
CREATE POLICY documents_select_published ON documents
  FOR SELECT
  USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()  -- CRITICAL: Added check
    AND state = 'published'
  );

-- INSERT: Must belong to tenant
DROP POLICY IF EXISTS documents_insert ON documents;
CREATE POLICY documents_insert ON documents
  FOR INSERT
  WITH CHECK (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()  -- CRITICAL: Added check
    AND created_by = auth.uid()
  );

-- UPDATE: Must belong to tenant + own doc or editor/admin
DROP POLICY IF EXISTS documents_update ON documents;
CREATE POLICY documents_update ON documents
  FOR UPDATE
  USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()  -- CRITICAL: Added check
    AND (
      created_by = auth.uid()
      OR get_user_role() IN ('admin', 'editor')
    )
  );

-- DELETE: Must belong to tenant + own doc or admin
DROP POLICY IF EXISTS documents_delete ON documents;
CREATE POLICY documents_delete ON documents
  FOR DELETE
  USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()  -- CRITICAL: Added check
    AND (
      created_by = auth.uid()
      OR get_user_role() = 'admin'
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- APPLY TO ALL OTHER TABLES
-- ─────────────────────────────────────────────────────────────────────────────

-- Categories
DROP POLICY IF EXISTS categories_select ON categories;
CREATE POLICY categories_select ON categories
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- Templates
DROP POLICY IF EXISTS templates_select ON templates;
CREATE POLICY templates_select ON templates
  FOR SELECT USING (
    (tenant_id = get_current_tenant_id() AND user_belongs_to_tenant())
    OR is_public = true  -- Public templates are visible to all authenticated users
  );

-- Discussions
DROP POLICY IF EXISTS discussions_select ON discussions;
CREATE POLICY discussions_select ON discussions
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- Discussion Replies
DROP POLICY IF EXISTS discussion_replies_select ON discussion_replies;
CREATE POLICY discussion_replies_select ON discussion_replies
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- Notifications (user-specific, but still tenant-scoped)
DROP POLICY IF EXISTS notifications_select ON notifications;
CREATE POLICY notifications_select ON notifications
  FOR SELECT USING (
    user_id = auth.uid()
    AND tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- Audit Logs
DROP POLICY IF EXISTS audit_logs_select ON audit_logs;
CREATE POLICY audit_logs_select ON audit_logs
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
    AND get_user_role() IN ('admin', 'editor')  -- Only admins/editors see audit logs
  );

-- Document Embeddings
DROP POLICY IF EXISTS document_embeddings_select ON document_embeddings;
CREATE POLICY document_embeddings_select ON document_embeddings
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- AI Generation Jobs
DROP POLICY IF EXISTS ai_generation_jobs_select ON ai_generation_jobs;
CREATE POLICY ai_generation_jobs_select ON ai_generation_jobs
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
    AND (user_id = auth.uid() OR get_user_role() = 'admin')
  );

-- Job Queue
DROP POLICY IF EXISTS job_queue_select ON job_queue;
CREATE POLICY job_queue_select ON job_queue
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
  );

-- Content Audit Reports
DROP POLICY IF EXISTS content_audit_reports_select ON content_audit_reports;
CREATE POLICY content_audit_reports_select ON content_audit_reports
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND user_belongs_to_tenant()
    AND get_user_role() IN ('admin', 'editor')
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- USERS TABLE - Special case (no circular reference)
-- ─────────────────────────────────────────────────────────────────────────────

-- Users can see other users in their tenant
DROP POLICY IF EXISTS users_select ON users;
CREATE POLICY users_select ON users
  FOR SELECT USING (
    tenant_id = get_current_tenant_id()
    AND tenant_id IN (
      SELECT tenant_id FROM users WHERE id = auth.uid()
    )
  );

-- Users can update their own profile
DROP POLICY IF EXISTS users_update_own ON users;
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (
    id = auth.uid()
    AND tenant_id = get_current_tenant_id()
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- STORAGE BUCKET POLICIES - Equally critical
-- ─────────────────────────────────────────────────────────────────────────────

-- Storage policy must also verify tenant membership
CREATE POLICY storage_tenant_access ON storage.objects
  FOR ALL USING (
    -- Bucket name format: tenant-{tenant_id}
    bucket_id = 'tenant-' || get_current_tenant_id()::text
    AND EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND tenant_id = get_current_tenant_id()
    )
  );
```

## Application Layer Defense (Belt AND Suspenders)

Even with hardened RLS, add application-level verification:

```typescript
// /backend/src/middleware/tenantAuth.ts

import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Middleware that verifies user actually belongs to the tenant
 * from the subdomain. This is DEFENSE IN DEPTH on top of RLS.
 */
export async function verifyTenantMembership(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tenantId = request.tenantId;  // From subdomain extraction
  const userId = request.userId;       // From JWT
  
  if (!tenantId || !userId) {
    return reply.code(401).send({ 
      error: 'AUTH_REQUIRED',
      message: 'Authentication required' 
    });
  }
  
  // Query the database to verify membership
  const { data: membership, error } = await request.supabase
    .from('users')
    .select('id, tenant_id, role')
    .eq('id', userId)
    .eq('tenant_id', tenantId)
    .single();
  
  if (error || !membership) {
    // Log this - could be an attack attempt
    console.warn('Tenant membership verification failed', {
      userId,
      tenantId,
      subdomain: request.headers['x-tenant-subdomain'],
      ip: request.ip,
    });
    
    return reply.code(403).send({
      error: 'FORBIDDEN',
      message: 'You do not have access to this organization',
    });
  }
  
  // Attach verified role to request
  request.userRole = membership.role;
}

// Apply to all authenticated routes
app.addHook('preHandler', async (request, reply) => {
  // Skip for public routes
  if (isPublicRoute(request.url)) return;
  
  // Verify JWT
  await verifyJWT(request, reply);
  
  // Verify tenant membership (CRITICAL)
  await verifyTenantMembership(request, reply);
});
```

---

# 🚨 Critical Fix 2: Pre-Check User Existence (Ghost Tenant Prevention)

## The Vulnerability

Current flow:
1. Create tenant record ✓
2. Create storage bucket ✓
3. Create user in Supabase Auth ← **FAILS if email exists globally**
4. Ghost tenant exists with no accessible admin

## The Fix: Pre-Check + Conditional Flow

```typescript
// /backend/src/lib/tenant/creation.ts (UPDATED)

interface TenantCreateParams {
  name: string;
  subdomain: string;
  adminEmail: string;
  plan?: SubscriptionPlan;
}

interface TenantCreateResult {
  tenant: Tenant;
  user: User;
  isExistingUser: boolean;
  requiresPasswordSet: boolean;
}

export async function createTenantSafe(
  params: TenantCreateParams
): Promise<TenantCreateResult> {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 0: PRE-VALIDATION (Before any database writes)
  // ═══════════════════════════════════════════════════════════════════════════
  
  // 0a. Validate subdomain is available
  const { data: existingTenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('subdomain', params.subdomain)
    .single();
  
  if (existingTenant) {
    throw new ValidationError('subdomain', 'already_taken', 'This subdomain is already in use');
  }
  
  // 0b. Check if user exists in Supabase Auth (CRITICAL PRE-CHECK)
  let existingAuthUser: User | null = null;
  
  try {
    const { data } = await supabase.auth.admin.listUsers({
      filter: { email: params.adminEmail },
    });
    existingAuthUser = data?.users?.[0] || null;
  } catch (e) {
    // If we can't check, fail safely
    throw new Error('Unable to verify user status. Please try again.');
  }
  
  // 0c. If user exists, check if they're already in another tenant
  if (existingAuthUser) {
    const { data: existingMembership } = await supabase
      .from('users')
      .select('tenant_id, tenants(name)')
      .eq('id', existingAuthUser.id);
    
    // User exists and is in at least one tenant - handle multi-tenancy
    if (existingMembership?.length > 0) {
      console.log(`User ${params.adminEmail} exists in ${existingMembership.length} tenant(s)`);
      // This is okay - we'll link them to the new tenant
    }
  }
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STEP 1: Create Tenant Record
  // ═══════════════════════════════════════════════════════════════════════════
  
  const rollbackSteps: RollbackStep[] = [];
  
  try {
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: params.name,
        subdomain: params.subdomain,
        plan: params.plan || 'free',
      })
      .select()
      .single();
    
    if (tenantError) throw tenantError;
    
    rollbackSteps.push({
      name: 'tenant_record',
      execute: () => supabase.from('tenants').delete().eq('id', tenant.id),
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 2: Create Storage Bucket
    // ═══════════════════════════════════════════════════════════════════════════
    
    const bucketName = `tenant-${tenant.id}`;
    const { error: bucketError } = await supabase.storage.createBucket(bucketName, {
      public: false,
      fileSizeLimit: getPlanStorageLimit(params.plan || 'free'),
    });
    
    if (bucketError) throw bucketError;
    
    rollbackSteps.push({
      name: 'storage_bucket',
      execute: () => supabase.storage.deleteBucket(bucketName),
    });
    
    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 3: Handle User (CONDITIONAL BASED ON PRE-CHECK)
    // ═══════════════════════════════════════════════════════════════════════════
    
    let userId: string;
    let isExistingUser = false;
    let requiresPasswordSet = false;
    
    if (existingAuthUser) {
      // ─────────────────────────────────────────────────────────────────────────
      // CASE A: User already exists in Supabase Auth
      // ─────────────────────────────────────────────────────────────────────────
      userId = existingAuthUser.id;
      isExistingUser = true;
      
      // Check if they already have a user record in our public.users table
      const { data: existingUserRecord } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();
      
      if (!existingUserRecord) {
        // User in Auth but not in public.users (edge case - maybe they signed up
        // via OAuth but never completed onboarding). Create the record.
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: userId,
            tenant_id: tenant.id,
            email: params.adminEmail,
            role: 'admin',
          });
        
        if (userError) throw userError;
      } else {
        // User exists - just link them to new tenant
        // Note: In a multi-tenant setup, users table might have multiple rows per user
        // OR you might have a separate user_tenants junction table
        const { error: linkError } = await supabase
          .from('users')
          .insert({
            id: userId,
            tenant_id: tenant.id,
            email: params.adminEmail,
            role: 'admin',
          });
        
        if (linkError) {
          // If duplicate key, user is already in this tenant (shouldn't happen)
          if (linkError.code === '23505') {
            throw new Error('This user is already associated with this organization');
          }
          throw linkError;
        }
      }
      
      rollbackSteps.push({
        name: 'user_tenant_link',
        execute: () => supabase
          .from('users')
          .delete()
          .eq('id', userId)
          .eq('tenant_id', tenant.id),
      });
      
    } else {
      // ─────────────────────────────────────────────────────────────────────────
      // CASE B: New user - Create in Supabase Auth
      // ─────────────────────────────────────────────────────────────────────────
      
      // Generate a temporary random password (user will set their own via email)
      const tempPassword = crypto.randomUUID() + crypto.randomUUID();
      
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: params.adminEmail,
        password: tempPassword,
        email_confirm: false,  // They'll need to verify
        user_metadata: {
          tenant_id: tenant.id,
          role: 'admin',
        },
      });
      
      if (authError) throw authError;
      
      userId = authData.user.id;
      requiresPasswordSet = true;
      
      rollbackSteps.push({
        name: 'auth_user',
        execute: () => supabase.auth.admin.deleteUser(userId),
      });
      
      // Create user record
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: userId,
          tenant_id: tenant.id,
          email: params.adminEmail,
          role: 'admin',
        });
      
      if (userError) throw userError;
      
      rollbackSteps.push({
        name: 'user_record',
        execute: () => supabase.from('users').delete().eq('id', userId),
      });
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 4: Send Appropriate Email
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (isExistingUser) {
      // Existing user - send "You've been added to a new organization" email
      await sendEmail({
        to: params.adminEmail,
        template: 'tenant-added-existing-user',
        data: {
          tenantName: params.name,
          subdomain: params.subdomain,
          loginUrl: `https://${params.subdomain}.tynebase.com/login`,
        },
      });
    } else {
      // New user - send "Set your password" email
      const { data: resetLink } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        email: params.adminEmail,
        options: {
          redirectTo: `https://${params.subdomain}.tynebase.com/auth/set-password`,
        },
      });
      
      await sendEmail({
        to: params.adminEmail,
        template: 'tenant-created-new-user',
        data: {
          tenantName: params.name,
          subdomain: params.subdomain,
          setPasswordUrl: resetLink.properties.action_link,
        },
      });
    }
    
    // ═══════════════════════════════════════════════════════════════════════════
    // STEP 5: Create Default Data
    // ═══════════════════════════════════════════════════════════════════════════
    
    await createDefaultCategories(tenant.id);
    await createDefaultTemplates(tenant.id);
    
    // ═══════════════════════════════════════════════════════════════════════════
    // SUCCESS
    // ═══════════════════════════════════════════════════════════════════════════
    
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .eq('tenant_id', tenant.id)
      .single();
    
    return {
      tenant,
      user: user!,
      isExistingUser,
      requiresPasswordSet,
    };
    
  } catch (error) {
    // Rollback in reverse order
    console.error('Tenant creation failed, rolling back...', error);
    
    for (const step of rollbackSteps.reverse()) {
      try {
        await step.execute();
        console.log(`Rolled back: ${step.name}`);
      } catch (rollbackError) {
        console.error(`Failed to rollback ${step.name}:`, rollbackError);
      }
    }
    
    throw error;
  }
}
```

---

# 🚨 Critical Fix 3: Fly.io Worker Cold Start Handling

## The Vulnerability

Worker machines have `auto_stop_machines = true`. Cold start takes 3-10 seconds.
If API client times out, job dispatch fails silently.

## The Fix: Retry Logic + Explicit Wake

```typescript
// /backend/src/lib/flyio/workers.ts

import { Fly } from '@fly-io/fly-node';

const fly = new Fly({ token: process.env.FLY_API_TOKEN });

const WORKER_CONFIG = {
  appName: 'tynebase-workers',
  region: 'lhr',
  
  // Retry configuration for cold starts
  maxRetries: 3,
  initialRetryDelay: 2000,  // 2 seconds
  maxRetryDelay: 10000,     // 10 seconds
  backoffMultiplier: 2,
  
  // Timeout for job dispatch
  dispatchTimeout: 30000,   // 30 seconds (accounts for cold start)
};

/**
 * Dispatch a job to a Fly.io worker machine with cold-start handling
 */
export async function dispatchToWorker(
  jobType: 'video' | 'ai' | 'audit',
  payload: any
): Promise<{ success: boolean; jobId: string }> {
  
  const machineId = await getOrWakeMachine(jobType);
  
  let lastError: Error | null = null;
  let retryDelay = WORKER_CONFIG.initialRetryDelay;
  
  for (let attempt = 1; attempt <= WORKER_CONFIG.maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(),
        WORKER_CONFIG.dispatchTimeout
      );
      
      const response = await fetch(
        `http://${machineId}.vm.${WORKER_CONFIG.appName}.internal:8081/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeout);
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, jobId: data.jobId };
      }
      
      // 502/503 = machine still waking up
      if (response.status === 502 || response.status === 503) {
        console.log(`Worker not ready (${response.status}), retry ${attempt}/${WORKER_CONFIG.maxRetries}`);
        lastError = new Error(`Worker returned ${response.status}`);
        
        // Wait before retry with exponential backoff
        await sleep(retryDelay);
        retryDelay = Math.min(retryDelay * WORKER_CONFIG.backoffMultiplier, WORKER_CONFIG.maxRetryDelay);
        continue;
      }
      
      // Other errors are not retryable
      throw new Error(`Worker error: ${response.status} ${await response.text()}`);
      
    } catch (error) {
      if (error.name === 'AbortError') {
        lastError = new Error('Worker dispatch timed out');
      } else {
        lastError = error as Error;
      }
      
      console.error(`Worker dispatch attempt ${attempt} failed:`, lastError.message);
      
      if (attempt < WORKER_CONFIG.maxRetries) {
        await sleep(retryDelay);
        retryDelay = Math.min(retryDelay * WORKER_CONFIG.backoffMultiplier, WORKER_CONFIG.maxRetryDelay);
      }
    }
  }
  
  throw lastError || new Error('Worker dispatch failed after all retries');
}

/**
 * Get an available machine or wake one up
 */
async function getOrWakeMachine(jobType: string): Promise<string> {
  // Get list of machines
  const machines = await fly.machines.list(WORKER_CONFIG.appName);
  
  // Find a machine that handles this job type and is running
  const runningMachine = machines.find(
    m => m.config.env?.WORKER_TYPE === jobType && m.state === 'started'
  );
  
  if (runningMachine) {
    return runningMachine.id;
  }
  
  // Find a stopped machine to wake
  const stoppedMachine = machines.find(
    m => m.config.env?.WORKER_TYPE === jobType && m.state === 'stopped'
  );
  
  if (stoppedMachine) {
    console.log(`Waking machine ${stoppedMachine.id} for ${jobType} job`);
    
    // Explicitly start the machine
    await fly.machines.start(WORKER_CONFIG.appName, stoppedMachine.id);
    
    // Wait for machine to be ready (poll state)
    let ready = false;
    for (let i = 0; i < 30; i++) {  // Max 30 seconds
      const machine = await fly.machines.get(WORKER_CONFIG.appName, stoppedMachine.id);
      if (machine.state === 'started') {
        ready = true;
        break;
      }
      await sleep(1000);
    }
    
    if (!ready) {
      throw new Error('Machine failed to start within timeout');
    }
    
    return stoppedMachine.id;
  }
  
  throw new Error(`No ${jobType} worker machines available`);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Updated fly.worker.toml

```toml
# fly.worker.toml

app = "tynebase-workers"
primary_region = "lhr"

[build]
  dockerfile = "Dockerfile.worker"

[env]
  NODE_ENV = "production"
  WORKER_TYPE = "video"  # Set per machine: video, ai, audit

# IMPORTANT: Keep at least one machine warm for faster response
[http_service]
  internal_port = 8081
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1  # Keep 1 warm to avoid ALL cold starts

  [http_service.concurrency]
    type = "connections"
    hard_limit = 25
    soft_limit = 20

[[vm]]
  cpu_kind = "performance"
  cpus = 2
  memory_mb = 2048
```

---

# ⚠️ Optimization Fix 4: Remove Normalized Markdown Redundancy

## The Problem

Storing `content`, `normalized_md`, and `document_embeddings` = 3x storage bloat.

## The Fix: Compute `normalized_md` On-Demand

```sql
-- Remove normalized_md column from documents table
ALTER TABLE documents DROP COLUMN IF EXISTS normalized_md;

-- Add a computed/generated column OR compute in application layer
```

```typescript
// /backend/src/lib/documents/normalization.ts

/**
 * Normalize content for embedding/RAG on-demand
 * DO NOT store this - compute when needed
 */
export function normalizeForEmbedding(content: string, contentType: ContentType): string {
  switch (contentType) {
    case 'markdown':
      // Markdown is already normalized, just clean it
      return cleanMarkdown(content);
      
    case 'prosemirror':
      // Convert ProseMirror JSON to plain text
      return prosemirrorToText(JSON.parse(content));
      
    case 'html':
      // Strip HTML tags, normalize whitespace
      return htmlToText(content);
      
    default:
      return content;
  }
}

function cleanMarkdown(md: string): string {
  return md
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Normalize headers
    .replace(/^(#{1,6})\s+/gm, '$1 ')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}

// When generating embeddings:
export async function generateEmbeddingsForDocument(doc: Document) {
  // Normalize on-the-fly
  const normalizedContent = normalizeForEmbedding(doc.content, doc.content_type);
  
  // Chunk the normalized content
  const chunks = chunkContent(normalizedContent);
  
  // Generate embeddings for chunks
  const embeddings = await generateEmbeddings(chunks);
  
  // Store only the embeddings, not the normalized text
  await storeEmbeddings(doc.id, embeddings);
}
```

## Updated Documents Table

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Content (store ONLY the original)
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,              -- Original content (Markdown, HTML, or ProseMirror JSON)
  content_type TEXT DEFAULT 'markdown', -- 'markdown', 'html', 'prosemirror'
  -- REMOVED: normalized_md TEXT,       -- No longer stored!
  
  -- Metadata
  category_id UUID REFERENCES categories(id),
  state document_state DEFAULT 'draft',
  
  -- ... rest of columns
);
```

---

# ⚠️ Optimization Fix 5: Search Request Cancellation

## The Problem

Race condition: "Secur" results can return after "Security" results.

## The Fix: AbortController in Search Hook

```typescript
// /frontend/src/hooks/useSearch.ts

import { useEffect, useRef, useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface SearchResult {
  documents: Document[];
  discussions: Discussion[];
  templates: Template[];
}

export function useSearch(query: string, filters: SearchFilters) {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Keep track of the current request's AbortController
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Track the query that the current results belong to
  const resultsQueryRef = useRef<string>('');
  
  const debouncedQuery = useDebounce(query, 300);
  
  const executeSearch = useCallback(async (searchQuery: string) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Don't search for short queries
    if (searchQuery.length < 2) {
      setResults(null);
      setIsLoading(false);
      return;
    }
    
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/search?${new URLSearchParams({
          q: searchQuery,
          ...filters,
        })}`,
        {
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Check if this request was aborted while waiting
      if (abortController.signal.aborted) {
        return;  // Silently ignore aborted requests
      }
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Final check: only update if this is still the current query
      // (protects against race conditions)
      if (searchQuery === debouncedQuery) {
        setResults(data);
        resultsQueryRef.current = searchQuery;
      }
      
    } catch (err) {
      // Don't set error state for aborted requests
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err as Error);
    } finally {
      // Only clear loading if this is still the current request
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [filters, debouncedQuery]);
  
  // Execute search when debounced query changes
  useEffect(() => {
    executeSearch(debouncedQuery);
    
    // Cleanup: abort on unmount or query change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, executeSearch]);
  
  // Clear results when query is cleared
  useEffect(() => {
    if (query === '') {
      setResults(null);
      resultsQueryRef.current = '';
    }
  }, [query]);
  
  return {
    results,
    isLoading,
    error,
    // Expose whether results match the current query
    isStale: resultsQueryRef.current !== debouncedQuery,
  };
}
```

---

# 📝 Minor Fix 6: Plan Limits - Count Active Users

## The Problem

Limit checks might count deactivated/removed users.

## The Fix: Query Active Users Only

```typescript
// /backend/src/lib/plans/limits.ts

export async function checkUserLimit(
  tenantId: string,
  plan: SubscriptionPlan
): Promise<{ allowed: boolean; current: number; limit: number }> {
  
  const limit = PLAN_LIMITS[plan].maxUsers;
  
  // Count ACTIVE users only
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', tenantId)
    .eq('status', 'active')  // CRITICAL: Only count active users
    .is('deleted_at', null); // CRITICAL: Exclude soft-deleted users
  
  if (error) throw error;
  
  return {
    allowed: (count || 0) < limit,
    current: count || 0,
    limit,
  };
}

// When inviting a user:
export async function canInviteUser(tenantId: string): Promise<boolean> {
  const tenant = await getTenant(tenantId);
  const { allowed } = await checkUserLimit(tenantId, tenant.plan);
  return allowed;
}
```

## Updated Users Table

```sql
-- Add status and soft-delete columns if not present
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Constraint for valid statuses
ALTER TABLE users 
  ADD CONSTRAINT users_status_check 
  CHECK (status IN ('active', 'inactive', 'suspended', 'pending'));

-- Index for efficient active user queries
CREATE INDEX IF NOT EXISTS idx_users_tenant_active 
  ON users(tenant_id) 
  WHERE status = 'active' AND deleted_at IS NULL;
```

---

# 📝 Minor Fix 7: Color Contrast (WCAG AA)

## The Problem

`--state-draft: #737373` on `bg-gray-100` (#F3F4F6) fails WCAG AA.

Contrast ratio: **4.0:1** (needs 4.5:1 for AA)

## The Fix: Darken Text Colors

```css
/* ═══════════════════════════════════════════════════════════════════════
   UPDATED STATUS COLORS - WCAG AA COMPLIANT
   ═══════════════════════════════════════════════════════════════════════ */

:root {
  /* Document States - UPDATED for accessibility */
  --state-draft: #525252;           /* Was #737373 - Now 7.0:1 contrast ✓ */
  --state-draft-bg: #F5F5F5;
  
  --state-review: #B45309;          /* Was #D97706 - Now 4.7:1 contrast ✓ */
  --state-review-bg: #FEF3C7;
  
  --state-published: #15803D;       /* Was #16A34A - Now 4.8:1 contrast ✓ */
  --state-published-bg: #DCFCE7;
  
  --state-hidden: #6B7280;          /* Acceptable 5.5:1 ✓ */
  --state-hidden-bg: #F3F4F6;
  
  --state-archived: #64748B;        /* Acceptable 5.0:1 ✓ */
  --state-archived-bg: #F1F5F9;
  
  /* Health Status - UPDATED */
  --health-healthy: #15803D;        /* Darker green */
  --health-healthy-bg: #DCFCE7;
  
  --health-warning: #B45309;        /* Darker amber */
  --health-warning-bg: #FEF3C7;
  
  --health-critical: #B91C1C;       /* Darker red */
  --health-critical-bg: #FEE2E2;
  
  /* Text colors - ensure all pass AA */
  --text-primary: #0F0F0F;          /* 18.1:1 ✓ */
  --text-secondary: #404040;        /* Was #525252 - Now 9.4:1 ✓ */
  --text-tertiary: #525252;         /* Was #8A8A8A - Now 7.0:1 ✓ */
  --text-muted: #6B7280;            /* 5.5:1 - AA for large text ✓ */
}

/* Dark mode - also needs checking */
[data-theme="dark"] {
  --state-draft: #A3A3A3;           /* 7.2:1 on dark bg ✓ */
  --state-draft-bg: #262626;
  
  --state-review: #FCD34D;          /* 8.9:1 on dark bg ✓ */
  --state-review-bg: #422006;
  
  --state-published: #86EFAC;       /* 12.1:1 on dark bg ✓ */
  --state-published-bg: #14532D;
  
  --text-primary: #FAFAFA;          /* 18.1:1 ✓ */
  --text-secondary: #D4D4D4;        /* 11.7:1 ✓ */
  --text-tertiary: #A3A3A3;         /* 7.2:1 ✓ */
}
```

## Badge Component Update

```typescript
// /components/ui/StatusBadge.tsx

const STATUS_STYLES: Record<DocumentState, { bg: string; text: string }> = {
  draft: { 
    bg: 'bg-gray-100 dark:bg-gray-800', 
    text: 'text-gray-700 dark:text-gray-300'  // Updated for contrast
  },
  in_review: { 
    bg: 'bg-amber-100 dark:bg-amber-900/30', 
    text: 'text-amber-800 dark:text-amber-200'  // Updated for contrast
  },
  published: { 
    bg: 'bg-green-100 dark:bg-green-900/30', 
    text: 'text-green-800 dark:text-green-200'  // Updated for contrast
  },
  hidden: { 
    bg: 'bg-slate-100 dark:bg-slate-800', 
    text: 'text-slate-700 dark:text-slate-300' 
  },
  archived: { 
    bg: 'bg-slate-100 dark:bg-slate-800', 
    text: 'text-slate-600 dark:text-slate-400' 
  },
};
```

---

# Summary of Changes

| Issue | Severity | Fix Location |
|-------|----------|--------------|
| Subdomain Auth Trap | 🚨 CRITICAL | Hardened RLS policies + app-layer verification |
| Ghost Tenant Creation | 🚨 CRITICAL | Pre-check user existence before transaction |
| Fly.io Cold Start | 🚨 CRITICAL | Retry logic + explicit machine wake |
| Markdown Bloat | ⚠️ HIGH | Remove `normalized_md`, compute on-demand |
| Search Race Condition | ⚠️ HIGH | AbortController in search hook |
| Plan Limits Bug | 📝 MEDIUM | Count active users only |
| Color Contrast | 📝 MEDIUM | WCAG AA compliant color values |

---

<div align="center">

**— END OF DOCUMENT —**

*TyneBase PRD v4.3 • January 2026 • Security Hardened • EU Compliant • Enhanced RAG*

*This document is the single source of truth for Phase 1 development.*

**Total Specifications**: 24 Parts covering all UI, API, security, and logic requirements.

</div>
