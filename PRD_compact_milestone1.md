# TyneBase - Milestone 1 PRD
## UI Framework & Foundation

**Version**: 1.1  
**Milestone**: 1 of 3  
**Timeline**: 7 days  
**Budget**: £1,500

**Full Reference**: TyneBase_PRD_v4.2_FINAL.md

---

## 1. Product Overview

TyneBase is a multi-tenant SaaS knowledge management platform with AI-assisted document generation, community discussions, and white-label branding.

**This milestone delivers**: The complete UI framework, design system, authentication, tenant-aware routing, and marketing landing page.

📖 *Full details: Part I (Product Vision) in main PRD*

---

## 2. Tech Stack

📖 *Full details: Part I (Architecture) & Part VIII-B (Fly.io Backend) in main PRD*

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **API Server**: Fly.io (Node.js + Fastify) - setup only in M1

### Deployment
- **Frontend**: Vercel
- **Backend API**: Fly.io (London region)

### AI Providers (M2 Implementation)
All AI processing uses EU/UK data centers for GDPR compliance:
- **OpenAI**: Direct API with EU endpoint (`eu.api.openai.com`)
- **Google**: Vertex AI in europe-west2 (London)
- **Anthropic**: AWS Bedrock in eu-west-2 (London)

📖 *Full details: Part IV (AI Provider Routing) in main PRD*

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Git**: GitHub

---

## 3. Multi-Tenancy Architecture

📖 *Full details: Part III (Multi-Tenancy), Part IX (Subdomain Routing), Part XXIV (Security Fixes) in main PRD*

### Subdomain Routing
Each tenant (company) accesses their instance via subdomain:
- `acme.tynebase.com` → Acme Corp's instance
- `globex.tynebase.com` → Globex Inc's instance
- `tynebase.com` → Marketing site / Super Admin

### Tenant Resolution Flow
1. User visits `acme.tynebase.com`
2. Middleware extracts subdomain from hostname
3. Middleware queries `tenants` table for matching subdomain
4. If valid: Set tenant context, apply branding, proceed
5. If invalid: Show "Organization not found" page
6. If suspended: Show "Account suspended" page

### Reserved Subdomains
These cannot be used by tenants: `www`, `api`, `app`, `admin`, `auth`, `login`, `signup`, `mail`, `support`, `help`, `docs`, `blog`, `status`, `cdn`, `static`

---

## 4. User Roles

📖 *Full details: Part III (Roles), Part XXII (PermissionRBAC UI) in main PRD*

| Role | Access Level |
|------|--------------|
| **Admin** | Full access, user management, settings, publishing |
| **Editor** | Create, edit, publish content, moderate community |
| **Premium** | Enhanced AI and template access |
| **Contributor** | Create and edit own content |
| **View Only** | Read-only access to published content |

Additionally, **Super Admin** exists at platform level (not tenant level) for managing all tenants.

---

## 5. Authentication Requirements

📖 *Full details: Part VII (Database Schema - users table), Part XXIII (Auth Flows) in main PRD*

### Supported Methods
- Email/password (primary)
- Google OAuth
- Magic link (passwordless)

### Auth Flows to Implement
1. **Sign Up**: New user creates account + new tenant
2. **Sign In**: Existing user logs into their tenant
3. **Magic Link**: Passwordless login via email
4. **Password Reset**: Forgot password flow
5. **Invite Acceptance**: User joins existing tenant via invite link

### Session Handling
- JWT tokens via Supabase Auth
- Automatic token refresh
- Secure HTTP-only cookies
- Session timeout after inactivity

---

## 6. Design System

📖 *Full details: Part II (Design System & UI Specifications) in main PRD*

📖 Full details: Part II (Design System & UI Specifications) in main PRD
Color Palette (Tynebase Industrial)

Brand Colors (Derived from Palette Image):

    Brand Orange: #E85002 (Main Action Color)

    Primary Black: #000000 (Headings, Navbar, Strong Borders)

    Tynebase Gradient: linear-gradient(to right, #000000, #C10801, #F16001, #D9C3AB)
    (Used for: Hero text effects, primary button hover states, distinctive borders)

Neutrals & Surfaces:

    Canvas White: #F9F9F9 (Main App Background - Note: Not pure white)

    Card White: #FFFFFF (Elevated Surfaces)

    Dark Gray: #333333 (Secondary text, dark mode surfaces)

    Mid Gray: #646464 (Tertiary text, icons)

    Light Gray: #A7A7A7 (Borders, placeholders)

Semantic Colors (WCAG AA Compliant):

    Success: #15803D (Darker Green)

    Warning: #B45309 (Darker Amber)

    Error: #B91C1C (Darker Red)

    Info: #2563EB (Blue)

Typography

    Font Family: Helvetica, Helvetica Neue, Arial, sans-serif.
    (Clean, Swiss-style, authoritative. Falls back to system sans if unavailable).

    Headings: Helvetica (Bold / 700)

    Body: Helvetica (Regular / 400)

    Monospace: JetBrains Mono (for code blocks)

``` TypeScript


    // tailwind.config.ts

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#E85002',
          black: '#000000',
          darkGray: '#333333',
          gray: '#646464',
          lightGray: '#A7A7A7',
          white: '#F9F9F9', // Off-white background
        },
      },
      backgroundImage: {
        'tynebase-gradient': 'linear-gradient(90deg, #000000 0%, #C10801 33%, #F16001 66%, #D9C3AB 100%)',
      },
    },
  },
}
```
---

## 7. Marketing Landing Page

📖 *Full details: Part II (Marketing Site wireframes) in main PRD*

The main domain `tynebase.com` serves as the marketing landing page for new customers.

### Page Sections

**Hero Section**
- Headline: Value proposition (e.g., "Knowledge that scales with your team")
- Subheadline: Brief platform description
- CTA buttons: "Start Free Trial" → signup, "Book Demo" → contact form
- Hero image/illustration of the platform

**Features Section**
- Knowledge Centre: Centralized documentation with version control
- AI Assistant: Generate docs from prompts, videos, screenshots
- Community: Discussion forums with threading and notifications
- White-Label: Custom branding per organization

**How It Works**
- Step 1: Sign up and create your workspace
- Step 2: Upload content or generate with AI
- Step 3: Collaborate with your team

**Pricing Section**
- Display plan tiers (Free, Base, Pro, Company)
- Feature comparison table
- "Contact Sales" for Company tier

**Testimonials/Social Proof**
- Customer quotes (placeholder for MVP)
- Company logos (placeholder for MVP)

**Footer**
- Navigation links: Features, Pricing, About, Contact
- Legal links: Privacy Policy, Terms of Service
- Social media links
- Copyright notice

### Design Requirements
- Responsive (mobile-first)
- Fast loading (optimize images)
- Clear CTAs above the fold
- Consistent with app design system
- Dark mode support

---

## 8. Page Structure

📖 *Full details: Part II (UI Specifications - Page Layouts) in main PRD*

### Public Pages (No Auth Required)
- `/` - Marketing landing page
- `/pricing` - Pricing details
- `/login` - Sign in
- `/signup` - Create account + tenant
- `/auth/callback` - OAuth callback
- `/auth/verify` - Magic link verification
- `/auth/reset-password` - Password reset

### Protected Pages (Auth Required)
- `/dashboard` - Main dashboard with stats
- `/dashboard/documents` - Document list
- `/dashboard/documents/new` - Create document
- `/dashboard/documents/[id]` - View/edit document
- `/dashboard/ai-assistant` - AI generation hub
- `/dashboard/community` - Discussions list
- `/dashboard/templates` - Template library
- `/dashboard/settings` - Tenant settings
- `/dashboard/settings/branding` - White-label customization
- `/dashboard/settings/users` - User management (Admin only)

### Super Admin Pages
- `/admin` - Super Admin dashboard
- `/admin/tenants` - Manage all tenants
- `/admin/tenants/new` - Create tenant

---

## 9. Core Components

📖 *Full details: Part II (Component Specifications), Part XIV (Loading States), Part XV (Empty States) in main PRD*

### Layout Components
- `AppShell` - Main layout wrapper with sidebar and header
- `Sidebar` - Navigation sidebar (collapsible on tablet, drawer on mobile)
- `Header` - Top bar with search, notifications, user menu
- `MobileNav` - Bottom navigation bar for mobile

### Navigation
- Sidebar shows: Knowledge Base, AI Assistant, Community, Templates
- Admin-only items: Settings, Users, Branding
- Active state highlighting
- Collapse to icons on tablet

### Common UI Components
- `Button` - Primary, secondary, outline, ghost, destructive variants
- `Input` - Text, email, password with validation states
- `Select` - Dropdown selection
- `Modal` - Dialog overlays
- `Toast` - Notification toasts (success, error, warning, info)
- `Card` - Content containers
- `Badge` - Status badges (document states, roles)
- `Avatar` - User avatars with fallback initials
- `Skeleton` - Loading placeholders
- `EmptyState` - Empty content placeholders with CTAs

---

## 10. Tenant Branding System

📖 *Full details: Part X (White-Label Branding System) in main PRD*

### Configurable Elements
- Primary color
- Logo (light and dark versions)
- Favicon
- Company name

### Implementation
- Store branding config in `tenants` table
- Load tenant branding in middleware
- Apply via CSS custom properties
- Provide live preview in branding settings

---

## 11. Form Validation Rules

📖 *Full details: Part XVII (Form Validation Rules) in main PRD*

### Document Title
- Minimum: 3 characters
- Maximum: 200 characters
- Allowed: Letters, numbers, spaces, basic punctuation

### Subdomain
- Minimum: 3 characters
- Maximum: 50 characters
- Allowed: Lowercase letters, numbers, hyphens
- Cannot start or end with hyphen
- Cannot be reserved word

### Email
- Valid email format
- Maximum: 255 characters

### Password
- Minimum: 12 characters
- Require: Uppercase, lowercase, number, special character

---

## 12. Error Handling

📖 *Full details: Part XVI (Error States) in main PRD*

### Error Page Types
- **404**: Page not found
- **403**: Access denied (insufficient permissions)
- **500**: Server error
- **Tenant Not Found**: Invalid subdomain
- **Tenant Suspended**: Account suspended

### Toast Notifications
- Position: Top-right
- Auto-dismiss: Success (3s), Info (5s), Warning (5s), Error (manual)
- Stack limit: 3 visible

---

## 13. Milestone 1 Acceptance Criteria

📖 *Full details: Part VIII (Milestone Deliverables) in main PRD*

### Must Have
- [x] Next.js 14 project initialized with TypeScript
- [x] Tailwind CSS + shadcn/ui configured
- [x] Supabase project connected
- [ ] Marketing landing page live at vercel.tynebase.app
- [x] Authentication working (email/password)
- [ ] Subdomain-based tenant routing functional
- [x] Protected routes requiring authentication
- [x] Role-based access control (UI-level)
- [x] Responsive layout (mobile, tablet, desktop)
- [ ] Dark mode toggle functional
- [x] All layout components built (AppShell, Sidebar, Header)
- [x] Core UI components built (Button, Input, Modal, Toast, etc.)
- [ ] Branding settings page with live preview
- [x] Empty dashboard pages scaffolded
- [x] Error pages (404, 403, tenant not found)
- [ ] Deployed to Vercel (staging environment)

### Nice to Have
- [ ] Fly.io API server scaffolded
- [x] Notification bell component (UI only)
- [x] Search bar component (UI only, no backend)

---

## 14. Kanban Task List - Milestone 1

### 📋 Backlog

| ID | Task | Priority | Estimate |
|----|------|----------|----------|
| M1-01 | Initialize Next.js 14 project with TypeScript | High | 1h |
| M1-02 | Configure Tailwind CSS | High | 30m |
| M1-03 | Install and configure shadcn/ui | High | 1h |
| M1-04 | Set up project folder structure | High | 30m |
| M1-05 | Create Supabase project | High | 30m |
| M1-06 | Configure Supabase Auth providers | High | 1h |
| M1-07 | Create tenants table in Supabase | High | 30m |
| M1-08 | Create users table in Supabase | High | 30m |
| M1-09 | Set up environment variables | High | 30m |
| M1-10 | Build middleware for subdomain extraction | High | 2h |
| M1-11 | Build TenantProvider context | High | 2h |
| M1-12 | Create auth pages (login, signup, reset) | High | 3h |
| M1-13 | Implement email/password auth flow | High | 2h |
| M1-14 | Implement Google OAuth flow | High | 1h |
| M1-15 | Implement magic link flow | High | 1h |
| M1-16 | **Build landing page - Hero section** | High | 2h |
| M1-17 | **Build landing page - Features section** | High | 2h |
| M1-18 | **Build landing page - How It Works section** | Medium | 1h |
| M1-19 | **Build landing page - Pricing section** | Medium | 2h |
| M1-20 | **Build landing page - Footer** | Medium | 1h |
| M1-21 | Build AppShell layout component | High | 2h |
| M1-22 | Build Sidebar component | High | 2h |
| M1-23 | Build Header component | High | 1h |
| M1-24 | Build MobileNav component | High | 1h |
| M1-25 | Create design tokens (CSS variables) | High | 1h |
| M1-26 | Implement dark mode toggle | Medium | 1h |
| M1-27 | Build Button component variants | Medium | 1h |
| M1-28 | Build Input component with validation | Medium | 1h |
| M1-29 | Build Modal component | Medium | 1h |
| M1-30 | Build Toast notification system | Medium | 1h |
| M1-31 | Build Card component | Medium | 30m |
| M1-32 | Build Badge component | Medium | 30m |
| M1-33 | Build Avatar component | Medium | 30m |
| M1-34 | Build Skeleton loader component | Medium | 30m |
| M1-35 | Build EmptyState component | Medium | 30m |
| M1-36 | Create 404 error page | Medium | 30m |
| M1-37 | Create 403 error page | Medium | 30m |
| M1-38 | Create tenant-not-found page | Medium | 30m |
| M1-39 | Create tenant-suspended page | Medium | 30m |
| M1-40 | Build branding settings page | Medium | 2h |
| M1-41 | Implement branding live preview | Medium | 1h |
| M1-42 | Scaffold dashboard page | Medium | 1h |
| M1-43 | Scaffold documents list page | Medium | 1h |
| M1-44 | Scaffold AI assistant page | Medium | 1h |
| M1-45 | Scaffold community page | Medium | 1h |
| M1-46 | Scaffold templates page | Medium | 1h |
| M1-47 | Scaffold settings pages | Medium | 1h |
| M1-48 | Implement responsive sidebar collapse | Medium | 1h |
| M1-49 | Implement mobile drawer navigation | Medium | 1h |
| M1-50 | Set up Vercel deployment | High | 1h |
| M1-51 | Configure Vercel environment variables | High | 30m |
| M1-52 | Test subdomain routing on Vercel | High | 1h |
| M1-53 | Create role-based route guards | Medium | 2h |
| M1-54 | Build user menu dropdown | Medium | 1h |
| M1-55 | Build notification bell (UI only) | Low | 1h |

---

### 📊 Task Summary

| Category | Tasks | Est. Hours |
|----------|-------|------------|
| Project Setup | 9 | 6h |
| Authentication | 6 | 8h |
| **Landing Page** | **5** | **8h** |
| Layout & Navigation | 7 | 10h |
| UI Components | 10 | 7h |
| Error Pages | 4 | 2h |
| Branding | 2 | 3h |
| Page Scaffolding | 6 | 6h |
| Deployment | 3 | 2.5h |
| Access Control | 2 | 3h |
| **TOTAL** | **55** | **~56h** |

---

## 15. Dependencies for M2

Milestone 1 must deliver these for Milestone 2 to proceed:

1. Working authentication system
2. Tenant context available throughout app
3. All layout components functional
4. Protected route infrastructure
5. Staging deployment accessible
6. Marketing landing page live
7. Supabase tables: `tenants`, `users`

---

## 16. Quick Reference - Main PRD Sections

When you need deeper implementation details, look up these sections in **TyneBase_PRD_v4.2_FINAL.md**:

| Need Details On... | Look Up |
|--------------------|---------|
| Database tables & schema | Part VII |
| RLS security policies | Part III, Part XXIV |
| **AI Provider Routing (EU compliant)** | **Part IV** |
| API response formats | Part XIII |
| Skeleton/loading states | Part XIV |
| Empty state designs | Part XV |
| Error handling patterns | Part XVI |
| Form validation (Zod schemas) | Part XVII |
| Responsive breakpoints | Part XVIII |
| Document editor specs | Part XIX |
| Search implementation | Part XX |
| Notifications (realtime) | Part XXI |
| Role permissions matrix | Part XXII |
| Auth flow logic | Part XXIII |
| Security hardening | Part XXIV |
| Fly.io backend setup | Part VIII-B |
| Branding system | Part X |
| Super Admin dashboard | Part XI |

---

*End of Milestone 1 PRD*