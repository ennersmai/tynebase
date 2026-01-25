# Dashboard UI Functionality Status

This document tracks which dashboard pages are ready for real data integration vs. which are still using mock data.

---

## Current Status Overview

### ✅ Ready for Production
- Landing page (commercial/marketing)
- Auth pages (signup, login, password reset)
- Static pages (about, careers, security, community, etc.)

### 🔨 Needs Database Integration
All dashboard pages currently use mock data and need to be connected to the Supabase backend.

---

## Dashboard Pages Status

### 1. Knowledge Centre (`/dashboard/knowledge`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `documents`, `categories`, `document_versions`

**What Needs to Be Done**:
- [ ] Connect to Supabase to fetch documents
- [ ] Implement category filtering
- [ ] Add document CRUD operations
- [ ] Implement search functionality
- [ ] Add version history display
- [ ] Connect document state workflow (draft → review → published)

**Key Features**:
- Document list with filters (state, category, author)
- Create/edit documents with rich text editor
- Category management
- Version history
- Document assignment workflow

---

### 2. AI Assistant (`/dashboard/ai-assistant`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `ai_generation_jobs`, `documents`, `templates`

**What Needs to Be Done**:
- [ ] Connect to AI job queue
- [ ] Implement "From Prompt" generation
- [ ] Implement "From Video" processing
- [ ] Implement "Enhance Existing" feature
- [ ] Show recent generations from `ai_generation_jobs`
- [ ] Track job status and progress
- [ ] Save generated content to `documents`

**Key Features**:
- 3 AI generation modes (Prompt, Video, Enhance)
- Job queue with status tracking
- Recent generations list
- AI provider selection
- Template integration

---

### 3. Templates (`/dashboard/templates`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `templates`, `users`

**What Needs to Be Done**:
- [ ] Fetch templates from database
- [ ] Implement template CRUD
- [ ] Add template approval workflow (for admins)
- [ ] Track usage count
- [ ] Filter by public/private
- [ ] Implement "Use Template" action

**Key Features**:
- Template library with search
- Featured templates section
- Category filters
- Usage statistics
- Public/private templates
- Approval workflow for public templates

---

### 4. Content Audit (`/dashboard/content-audit`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `content_audit_reports`, `documents`

**What Needs to Be Done**:
- [ ] Generate audit reports from documents
- [ ] Calculate health scores
- [ ] Identify outdated content
- [ ] Find duplicate content
- [ ] Detect missing metadata
- [ ] Generate recommendations
- [ ] Store reports in `content_audit_reports`

**Key Features**:
- Overall health score
- Outdated content detection
- Duplicate detection
- Missing metadata alerts
- Actionable recommendations
- Historical audit reports

---

### 5. Community Forum (`/dashboard/community`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `discussions`, `discussion_replies`, `users`, `notifications`

**What Needs to Be Done**:
- [ ] Fetch discussions from database
- [ ] Implement discussion CRUD
- [ ] Add reply threading
- [ ] Implement user mentions (@username)
- [ ] Add moderation tools (pin, lock, mark solved)
- [ ] Create notifications for mentions and replies
- [ ] Track view counts

**Key Features**:
- Discussion threads with replies
- Nested reply threading
- User mentions with notifications
- Solved/pinned/locked status
- Moderation tools
- View counters

---

### 6. Settings (`/dashboard/settings`)

**Current State**: Partially functional  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `users`, `tenants`, `user_consents`

**What Needs to Be Done**:
- [ ] Connect profile settings to `users` table
- [ ] Implement white-label branding (save to `tenants`)
- [ ] Add team member management
- [ ] Implement consent management UI
- [ ] Add notification preferences
- [ ] Save theme preference to `users.theme`

**Key Features**:
- Profile management
- White-label branding configurator
- Team member management
- Notification settings
- Privacy & consent management
- Theme preferences

---

### 7. Admin Section (`/dashboard/admin`)

**Current State**: Mock data  
**Schema Ready**: ✅ Yes  
**Tables Needed**: `users`, `tenants`, `audit_logs`, `documents`, `templates`

**What Needs to Be Done**:
- [ ] User management (list, roles, permissions)
- [ ] Tenant settings management
- [ ] Audit log viewer
- [ ] Template approval workflow
- [ ] Usage analytics
- [ ] Billing management

**Key Features**:
- User management with role assignment
- Audit log viewer (immutable logs)
- Template approval queue
- Usage statistics
- Tenant configuration
- Billing & subscription management

---

## Priority Implementation Order

Based on PRD Milestone 1 (UI Framework) and Milestone 2 (Backend & AI):

### Phase 1: Core Functionality (Week 1-2)
1. **Knowledge Centre** - Document CRUD with categories
2. **Settings** - Profile and tenant management
3. **AI Assistant** - Basic job queue integration

### Phase 2: AI & Content (Week 2-3)
4. **Templates** - Template library with approval
5. **Content Audit** - Basic audit calculations
6. **AI Assistant** - Full AI pipeline integration

### Phase 3: Community & Admin (Week 3)
7. **Community Forum** - Discussions and replies
8. **Admin Section** - User management and audit logs
9. **Notifications** - System-wide notifications

---

## Technical Requirements

### Supabase Client Setup
All dashboard pages need:
```typescript
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

### Authentication Context
Use existing `AuthContext` for:
- Current user info
- Tenant context
- Role-based permissions

### Real-time Subscriptions (Optional)
For live updates:
```typescript
supabase
  .channel('documents')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'documents' 
  }, handleChange)
  .subscribe();
```

### Row Level Security (RLS)
All queries automatically filtered by:
- Tenant context (multi-tenancy)
- User permissions (role-based)

---

## API Endpoints Needed

For Milestone 2, these API endpoints will be built on Fly.io:

### Documents API
- `GET /api/documents` - List documents with filters
- `POST /api/documents` - Create document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/:id/versions` - Get version history

### AI API
- `POST /api/ai/generate` - Generate from prompt
- `POST /api/ai/video` - Process video
- `POST /api/ai/enhance` - Enhance existing
- `GET /api/ai/jobs/:id` - Get job status

### Templates API
- `GET /api/templates` - List templates
- `POST /api/templates` - Create template
- `PUT /api/templates/:id/approve` - Approve template

### Community API
- `GET /api/discussions` - List discussions
- `POST /api/discussions` - Create discussion
- `POST /api/discussions/:id/replies` - Add reply

### Audit API
- `POST /api/audit/generate` - Generate audit report
- `GET /api/audit/reports` - List reports

---

## Next Steps

1. **Run the PRD migration** (`20240102000000_prd_complete_schema.sql`)
2. **Verify all tables** are created in Supabase
3. **Start with Knowledge Centre** - Connect to real data
4. **Build API endpoints** on Fly.io (Milestone 2)
5. **Integrate AI pipeline** with job queue
6. **Implement remaining features** in priority order

---

## Notes

- All UI components are already built and styled
- Focus is now on **data integration**, not UI design
- PRD schema is now complete and ready
- RLS policies ensure proper data isolation
- Multi-tenancy is built into the schema
- All dashboard features are documented in PRD v4.3

---

**Status**: Ready to shift focus from landing pages to dashboard functionality ✅
