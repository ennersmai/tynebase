# TyneBase Core Product Requirements

## 1. Product Vision & Architecture

### Executive Summary
TyneBase is a multi-tenant SaaS platform that transforms how companies manage knowledge and collaborate. It combines secure document management, AI-assisted content creation, community forums, and intelligent search into a white-labeled platform.

### Core Value Propositions
1.  **Multi-Tenant Architecture**: Instant company instance creation with full data isolation.
2.  **White Label Branding**: Custom logo, colors, and brand identity for each client.
3.  **AI-Powered Knowledge**: Generate documents from videos, audio, PDFs, and prompts.
4.  **RAG-Based Intelligence**: AI that "knows" your company's knowledge base.
5.  **Content Audit**: Comprehensive analytics on content health and engagement.
6.  **Community Templates**: Crowd-sourced template library with moderation.
7.  **Community Forum**: Dedicated forum implementation per tenant.

### Technology Stack Overview
*   **Frontend**: Next.js 14 (App Router) on Vercel.
*   **Backend**: Node.js API Server and Worker Machines on Fly.io.
*   **Database**: Supabase PostgreSQL with pgvector and RLS.
*   **Storage**: Supabase Storage (Per-tenant buckets).
*   **AI Providers**: OpenAI (EU), Vertex AI (UK), AWS Bedrock (UK) for GDPR compliance.

### AI Provider Strategy (EU/UK Compliant)
All AI processing routes through EU/UK data centers.
*   **Text/Transcription**: OpenAI (EU Endpoint).
*   **Video/Multimodal**: Google Vertex AI (London).
*   **Analysis/Nuance**: Anthropic via AWS Bedrock (London).
*   **User Preference**: Tenants can select their preferred AI provider.

---

## 2. Design System & UI Specifications

### Design Philosophy: "Tynebase Industrial"
TyneBase embraces a **Swiss-Industrial** aesthetic—timeless, high-contrast, and authoritative.
*   **Typography**: Helvetica/Arial for objective readability.
*   **Palette**: High contrast Black & White with "Foundry Gradient" (Black → Red → Orange → Cream) accents.
*   **Signature Color**: Brand Orange for primary actions.

### Application Layout
*   **Sidebar Navigation**: Context-aware navigation (Knowledge, AI Assistant, Audit, Community).
*   **Top Bar**: Global search, Notifications, User profile.
*   **Main Content Area**: Focused workspace for reading/editing.

---

## 3. Multi-Tenancy & Data Isolation

### 4-Layer Defense-in-Depth
1.  **Network/DNS**: Subdomain-based routing (acme.tynebase.com) validates tenant existence.
2.  **Application**: JWT claims and middleware enforce tenant context on all requests.
3.  **Database (RLS)**: Row Level Security policies enforce strict tenant filtering at the database level.
4.  **Storage**: Per-tenant isolated storage buckets with signed URL access control.

---

## 4. AI Engine & RAG Pipeline

### AI Provider Routing
An intelligent router directs requests to the appropriate EU-compliant provider based on task type (video vs text) and tenant preferences.

### Intelligent Semantic Chunking
A **hybrid chunking strategy** (+50-70% accuracy improvement):
1.  **Structure Split**: Breaks down by headings and sections.
2.  **Semantic Chunking**: Further splits large sections based on semantic meaning.
3.  **Merging**: Combines small related chunks.
4.  **Contextualization**: Adds document title and hierarchy to every chunk to preserve context.

### Two-Stage RAG Retrieval
1.  **Vector Search**: Fast retrieval of top candidates using embeddings (OpenAI text-embedding-3-large).
2.  **Reranking**: Precision re-scoring of candidates using cross-encoder models to select the absolute best context.

### Document Normalization
All inputs (PDF, DOCX, HTML) are normalized to **Markdown** before processing to preserve structure (tables, headers) which improves LLM comprehension.

---

## 5. Document Lineage System

A comprehensive audit trail tracks the lifecycle of every document.
*   **Event Categories**: Creation, Modification, State Change, Access, AI Operations, Collaboration.
*   **AI Transparency**: Tracks which model was used, source files, and prompts for all AI-generated content.
*   **Compliance**: Lineage records are immutable.

---

## 6. GDPR Compliance Framework

*   **Data Minimization**: Only necessary data is collected.
*   **Consent Management**: Granular consent for Analytics, AI Processing, and Knowledge Base indexing.
*   **Rights Management**: Self-service tools for Data Export (JSON) and Account Deletion (Right to Erasure).
*   **Data Residency**: Strict enforcement of EU/UK processing regions.

---

## 7. White-Label Branding System

Tenants can customize the platform to match their brand identity.
*   **Assets**: Custom Logo and Favicon upload.
*   **Colors**: Primary and Secondary color configuration with live preview.
*   **Typography**: Font family selection.
*   **Theme**: Dark mode toggle support.

---

## 8. Key Features & Functionality

### Document Editor
*   **Engine**: TipTap (ProseMirror based).
*   **Features**: Markdown support, Real-time collaboration, Auto-save, Conflict detection, Version history.
*   **Formatting**: Tables, Images, Task lists, Code blocks with syntax highlighting.

### Global Search
*   **Scope**: Documents, Discussions, Templates, and People.
*   **Capabilities**: Full-text keyword search + Semantic vector search.
*   **UI**: Command palette (Cmd+K) style with recent searches and result highlighting.

### Notification System
*   **Channels**: In-app bell, Email.
*   **Types**: Comments, Approvals, Assignments, AI task completion.
*   **Management**: Mark as read, Mark all read, Unread badges.

### Super Admin Dashboard
*   **Overview**: Platform-wide metrics (Tenants, Users, MRR).
*   **Tenant Management**: Create, Suspend, Update plans, View usage stats.
*   **System Health**: Monitoring of critical services.

---

## 9. Roles & Permissions (RBAC)

*   **Super Admin**: Platform owner, manages tenants.
*   **Admin**: Tenant owner, full access to settings, users, and billing.
*   **Editor**: Can create, edit, publish, and manage all content.
*   **Contributor**: Can create and edit own content; cannot publish without approval.
*   **View Only**: Read-only access to published content.
