# Database Schema Migration Guide

## Overview

This guide documents the migration from the initial simplified schema to the complete PRD-aligned schema for TyneBase.

---

## Migration Path

### Step 1: Initial Schema (Already Run)
- `20240101000000_initial_schema.sql` - Basic tables (tenants, users, spaces, documents, invitations)
- `20240101000001_storage_buckets.sql` - Storage buckets and policies

### Step 2: PRD Complete Schema (NEW - Run This Next)
- `20240102000000_prd_complete_schema.sql` - Complete PRD-aligned schema

---

## What Changed

### Tables Added

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `categories` | Knowledge Centre categorization | Hierarchical structure with parent_id |
| `document_versions` | Version history tracking | Unique constraint on (document_id, version_number) |
| `document_embeddings` | AI/RAG vector search | pgvector extension, 1536-dim embeddings |
| `templates` | Document templates library | Public/private, approval workflow |
| `discussions` | Community forum threads | Solved/pinned/locked flags |
| `discussion_replies` | Forum replies | Nested threading support |
| `notifications` | User notifications | Read/unread tracking |
| `audit_logs` | Immutable audit trail | IP tracking, metadata JSONB |
| `ai_generation_jobs` | AI job queue | Status tracking, progress percentage |
| `content_audit_reports` | Content audit results | JSONB report data and summary |
| `user_consents` | GDPR consent management | Purpose-based consent tracking |

### Tables Removed

| Table | Reason | Replacement |
|-------|--------|-------------|
| `spaces` | Not in PRD | Use `categories` for organization |
| `invitations` | Simplified in PRD | Handle via email/auth flow |

### Tables Modified

#### `tenants`
**Added Fields:**
- `logo_url` - Company logo
- `favicon_url` - Custom favicon
- `primary_color` - Brand primary color (#E85002 default)
- `secondary_color` - Brand secondary color
- `max_storage_mb` - Storage limit (was max_storage_gb)
- `max_ai_generations_per_month` - AI usage limit

**Changed:**
- `plan` - Now uses ENUM `subscription_plan` (free, base, pro, company)

#### `users`
**Added Fields:**
- `email` - User email (for quick access)
- `theme` - Theme preference (system, light, dark)

**Changed:**
- `role` - Now uses ENUM `user_role` with 6 roles: super_admin, admin, editor, premium, contributor, view_only

**Removed:**
- `account_type` - Not needed in PRD

#### `documents`
**Added Fields:**
- `content_type` - markdown, html, etc.
- `state` - ENUM (draft, in_review, published, hidden, archived)
- `category_id` - Link to categories
- `author_id` - Document author
- `assigned_to` - Assigned user
- `is_public` - Public visibility flag
- `normalized_md` - Normalized markdown
- `file_url` - Attached file URL
- `file_type` - File MIME type
- `view_count` - View counter
- `helpful_count` - Helpful votes
- `current_version` - Current version number
- `last_viewed_at` - Last view timestamp

**Removed:**
- `space_id` - Replaced by category_id
- `is_published` - Replaced by state
- `parent_id` - Not in PRD
- `position` - Not in PRD
- `icon` - Not in PRD
- `cover_image` - Not in PRD
- `metadata` - Not in PRD

---

## New ENUMs

```sql
CREATE TYPE user_role AS ENUM (
  'super_admin', 'admin', 'editor', 'premium', 'contributor', 'view_only'
);

CREATE TYPE document_state AS ENUM (
  'draft', 'in_review', 'published', 'hidden', 'archived'
);

CREATE TYPE subscription_plan AS ENUM (
  'free', 'base', 'pro', 'company'
);
```

---

## Key Features Enabled

### 1. Knowledge Centre
- **Categories**: Hierarchical organization
- **Documents**: Full lifecycle (draft → review → published)
- **Versions**: Complete version history
- **Search**: Full-text search + vector embeddings

### 2. AI Assistant
- **Job Queue**: Track AI generation jobs
- **Embeddings**: Vector search for RAG
- **Templates**: Pre-built content templates

### 3. Community Forum
- **Discussions**: Forum threads
- **Replies**: Nested threading
- **Moderation**: Pin, lock, mark as solved

### 4. Content Audit
- **Reports**: Automated content analysis
- **Metrics**: Health scores and recommendations

### 5. User Management
- **Roles**: 6-tier permission system
- **Notifications**: In-app notifications
- **Consents**: GDPR compliance

### 6. Compliance
- **Audit Logs**: Immutable activity tracking
- **Consents**: Purpose-based consent management
- **Data Export**: GDPR-compliant data export

---

## Running the Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project → **SQL Editor**
2. Click **"New Query"**
3. Copy contents of `supabase/migrations/20240102000000_prd_complete_schema.sql`
4. Paste and click **"Run"**
5. Verify in **Table Editor** that all new tables appear

### Option 2: Supabase CLI

```bash
# If using local Supabase
supabase db reset

# Or push to remote
supabase db push
```

---

## Verification Checklist

After running the migration, verify:

- [ ] All 18 tables exist in Table Editor
- [ ] ENUMs created: `user_role`, `document_state`, `subscription_plan`
- [ ] `tenants` table has branding fields
- [ ] `users` table has 6 roles
- [ ] `documents` table has state and category_id
- [ ] `categories` table exists
- [ ] `document_versions` table exists
- [ ] `document_embeddings` table exists (with vector column)
- [ ] `templates` table exists
- [ ] `discussions` and `discussion_replies` tables exist
- [ ] `notifications` table exists
- [ ] `audit_logs` table exists
- [ ] `ai_generation_jobs` table exists
- [ ] `content_audit_reports` table exists
- [ ] `user_consents` table exists
- [ ] RLS policies active on all tables
- [ ] Vector extension enabled (`CREATE EXTENSION vector`)

---

## Breaking Changes

⚠️ **Important**: This migration includes breaking changes:

1. **`spaces` table removed** - Any references to spaces will break
2. **`invitations` table removed** - Invitation flow needs rework
3. **`users.role` changed** - Role values changed (owner→admin, member→contributor, viewer→view_only)
4. **`documents` structure changed** - Many fields added/removed

### Migration Strategy for Existing Data

If you have existing data:

1. **Backup your database** before running migration
2. **Map old roles to new roles**:
   - `owner` → `admin`
   - `admin` → `admin`
   - `member` → `contributor`
   - `viewer` → `view_only`
3. **Migrate spaces to categories** (if you have spaces data)
4. **Update application code** to use new schema

---

## TypeScript Types Updated

The `types/database.ts` file has been updated to match the new schema:

- All interfaces now match PRD schema exactly
- New interfaces added for all new tables
- ENUMs updated to match database ENUMs

---

## Next Steps

After migration:

1. **Test signup flow** - Verify user and tenant creation works
2. **Test document creation** - Verify documents can be created with categories
3. **Update dashboard pages** - Connect UI to new schema
4. **Implement AI features** - Use embeddings and job queue
5. **Build community features** - Implement discussions
6. **Add notifications** - Implement notification system

---

## Rollback Plan

If you need to rollback:

1. Restore from backup
2. Or manually drop new tables:

```sql
DROP TABLE IF EXISTS public.user_consents CASCADE;
DROP TABLE IF EXISTS public.content_audit_reports CASCADE;
DROP TABLE IF EXISTS public.ai_generation_jobs CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.discussion_replies CASCADE;
DROP TABLE IF EXISTS public.discussions CASCADE;
DROP TABLE IF EXISTS public.templates CASCADE;
DROP TABLE IF EXISTS public.document_embeddings CASCADE;
DROP TABLE IF EXISTS public.document_versions CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS document_state CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
```

---

## Support

For issues or questions:
- Check Supabase logs for migration errors
- Verify pgvector extension is installed
- Ensure all foreign key relationships are valid
- Review RLS policies if access issues occur
