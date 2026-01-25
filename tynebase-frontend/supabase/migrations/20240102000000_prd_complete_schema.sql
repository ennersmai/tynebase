-- ============================================================================
-- TYNEBASE COMPLETE SCHEMA (PRD v4.3 Aligned)
-- ============================================================================
-- This migration updates the schema to match the PRD requirements exactly
-- Run this AFTER the initial schema migration

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================================================
-- ENUMS
-- ============================================================================
DROP TYPE IF EXISTS user_role CASCADE;
CREATE TYPE user_role AS ENUM (
  'super_admin', 'admin', 'editor', 'premium', 'contributor', 'view_only'
);

CREATE TYPE document_state AS ENUM (
  'draft', 'in_review', 'published', 'hidden', 'archived'
);

CREATE TYPE subscription_plan AS ENUM (
  'free', 'base', 'pro', 'company'
);

-- ============================================================================
-- UPDATE TENANTS TABLE
-- ============================================================================
-- Add missing branding and limit fields
ALTER TABLE public.tenants 
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS favicon_url TEXT,
  ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#E85002',
  ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#000000',
  ADD COLUMN IF NOT EXISTS max_storage_mb INTEGER DEFAULT 100,
  ADD COLUMN IF NOT EXISTS max_ai_generations_per_month INTEGER DEFAULT 50;

-- Update plan column to use ENUM
-- First remove the CHECK constraint
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS tenants_plan_check;

-- Remove the default value temporarily
ALTER TABLE public.tenants ALTER COLUMN plan DROP DEFAULT;

-- Convert existing data to match new enum values
UPDATE public.tenants SET plan = CASE 
  WHEN plan = 'starter' THEN 'base'
  WHEN plan = 'professional' THEN 'pro' 
  WHEN plan = 'enterprise' THEN 'company'
  ELSE plan
END WHERE plan IN ('starter', 'professional', 'enterprise');

-- Now safely convert to ENUM
ALTER TABLE public.tenants 
  ALTER COLUMN plan TYPE subscription_plan USING plan::subscription_plan;

-- Set the new default
ALTER TABLE public.tenants 
  ALTER COLUMN plan SET DEFAULT 'free';

-- Rename max_storage_gb to max_storage_mb for consistency
ALTER TABLE public.tenants 
  DROP COLUMN IF EXISTS max_storage_gb;

-- ============================================================================
-- UPDATE USERS TABLE
-- ============================================================================
-- Add missing fields
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'system';

-- Update role column to use ENUM
-- First drop policies that depend on the role column
DROP POLICY IF EXISTS "Users can update their own tenant if admin/owner" ON public.tenants;
DROP POLICY IF EXISTS "Admins can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete spaces" ON public.spaces;
DROP POLICY IF EXISTS "Users can delete spaces" ON public.spaces;
DROP POLICY IF EXISTS "Users can update documents" ON public.documents;
DROP POLICY IF EXISTS "Users can delete their own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can create invitations" ON public.invitations;
DROP POLICY IF EXISTS "Admins can create invitations" ON public.invitations;

ALTER TABLE public.users 
  ALTER COLUMN role TYPE TEXT;

-- Remove the default value temporarily
ALTER TABLE public.users ALTER COLUMN role DROP DEFAULT;

-- Update existing data to match new enum values first
UPDATE public.users SET role = CASE 
  WHEN role = 'owner' THEN 'admin'
  WHEN role = 'admin' THEN 'admin'
  WHEN role = 'member' THEN 'contributor'
  WHEN role = 'viewer' THEN 'view_only'
  ELSE 'view_only'
END WHERE role IN ('owner', 'admin', 'member', 'viewer');

-- Now convert to ENUM
ALTER TABLE public.users 
  ALTER COLUMN role TYPE user_role USING role::text::user_role;

-- Set the new default
ALTER TABLE public.users 
  ALTER COLUMN role SET DEFAULT 'view_only';

-- Recreate policies with updated role values
CREATE POLICY "Users can update their own tenant if admin/owner"
    ON public.tenants FOR UPDATE
    USING (id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
    ));

CREATE POLICY "Admins can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'logos' AND
    (storage.foldername(name))[1] IN (
        SELECT tenant_id::text FROM public.users 
        WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
    )
);

CREATE POLICY "Admins can update logos"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'logos' AND
    (storage.foldername(name))[1] IN (
        SELECT tenant_id::text FROM public.users 
        WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
    )
);

CREATE POLICY "Admins can delete logos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'logos' AND
    (storage.foldername(name))[1] IN (
        SELECT tenant_id::text FROM public.users 
        WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
    )
);

-- Remove account_type as it's not in PRD
ALTER TABLE public.users DROP COLUMN IF EXISTS account_type;

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_tenant_id ON public.categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);

-- ============================================================================
-- UPDATE DOCUMENTS TABLE
-- ============================================================================
-- Add missing fields from PRD
ALTER TABLE public.documents 
  ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'markdown',
  ADD COLUMN IF NOT EXISTS state document_state DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS normalized_md TEXT,
  ADD COLUMN IF NOT EXISTS file_url TEXT,
  ADD COLUMN IF NOT EXISTS file_type TEXT,
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS helpful_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS current_version INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_viewed_at TIMESTAMPTZ;

-- Rename fields to match PRD
ALTER TABLE public.documents 
  RENAME COLUMN created_by TO author_id_temp;
ALTER TABLE public.documents 
  DROP COLUMN IF EXISTS author_id_temp;

-- Remove fields not in PRD
ALTER TABLE public.documents 
  DROP COLUMN IF EXISTS space_id,
  DROP COLUMN IF EXISTS is_published,
  DROP COLUMN IF EXISTS parent_id,
  DROP COLUMN IF EXISTS position,
  DROP COLUMN IF EXISTS icon,
  DROP COLUMN IF EXISTS cover_image,
  DROP COLUMN IF EXISTS metadata;

-- Update state column
ALTER TABLE public.documents 
  ALTER COLUMN state TYPE document_state USING 'draft'::document_state;

CREATE INDEX IF NOT EXISTS idx_documents_category_id ON public.documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_author_id ON public.documents(author_id);
CREATE INDEX IF NOT EXISTS idx_documents_assigned_to ON public.documents(assigned_to);
CREATE INDEX IF NOT EXISTS idx_documents_state ON public.documents(state);

-- ============================================================================
-- DOCUMENT VERSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_document_versions_document_id ON public.document_versions(document_id);

-- ============================================================================
-- DOCUMENT EMBEDDINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  chunk_tokens INTEGER NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_id, chunk_index)
);

CREATE INDEX IF NOT EXISTS idx_document_embeddings_tenant_id ON public.document_embeddings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_document_embeddings_document_id ON public.document_embeddings(document_id);
CREATE INDEX IF NOT EXISTS idx_document_embeddings_vector ON public.document_embeddings USING ivfflat (embedding vector_cosine_ops);

-- ============================================================================
-- TEMPLATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_templates_tenant_id ON public.templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_templates_author_id ON public.templates(author_id);
CREATE INDEX IF NOT EXISTS idx_templates_is_public ON public.templates(is_public);

-- ============================================================================
-- DISCUSSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_solved BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discussions_tenant_id ON public.discussions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_discussions_author_id ON public.discussions(author_id);

-- ============================================================================
-- DISCUSSION REPLIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  parent_reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discussion_replies_discussion_id ON public.discussion_replies(discussion_id);
CREATE INDEX IF NOT EXISTS idx_discussion_replies_parent_id ON public.discussion_replies(parent_reply_id);
CREATE INDEX IF NOT EXISTS idx_discussion_replies_author_id ON public.discussion_replies(author_id);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- ============================================================================
-- AUDIT LOGS TABLE (immutable)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON public.audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- ============================================================================
-- AI GENERATION JOBS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.ai_generation_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_ai_generation_jobs_tenant_id ON public.ai_generation_jobs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_jobs_user_id ON public.ai_generation_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_jobs_status ON public.ai_generation_jobs(status);

-- ============================================================================
-- CONTENT AUDIT REPORTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.content_audit_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  generated_by UUID REFERENCES public.users(id),
  report_data JSONB NOT NULL,
  summary JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_audit_reports_tenant_id ON public.content_audit_reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_content_audit_reports_generated_by ON public.content_audit_reports(generated_by);

-- ============================================================================
-- USER CONSENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMPTZ,
  withdrawn_at TIMESTAMPTZ,
  consent_text_version TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, purpose)
);

CREATE INDEX IF NOT EXISTS idx_user_consents_user_id ON public.user_consents(user_id);

-- ============================================================================
-- DROP TABLES NOT IN PRD
-- ============================================================================
DROP TABLE IF EXISTS public.spaces CASCADE;
DROP TABLE IF EXISTS public.invitations CASCADE;

-- ============================================================================
-- RLS POLICIES FOR NEW TABLES
-- ============================================================================

-- Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view categories in their tenant"
  ON public.categories FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.users 
    WHERE id = auth.uid() AND role IN ('super_admin'::user_role, 'admin'::user_role)
  ));

-- Document Versions
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view document versions in their tenant"
  ON public.document_versions FOR SELECT
  USING (document_id IN (
    SELECT id FROM public.documents 
    WHERE tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  ));

-- Document Embeddings
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view embeddings in their tenant"
  ON public.document_embeddings FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Templates
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public templates or their tenant templates"
  ON public.templates FOR SELECT
  USING (
    is_public = TRUE OR 
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can create templates in their tenant"
  ON public.templates FOR INSERT
  WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Discussions
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view discussions in their tenant"
  ON public.discussions FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create discussions in their tenant"
  ON public.discussions FOR INSERT
  WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Discussion Replies
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view replies in their tenant"
  ON public.discussion_replies FOR SELECT
  USING (discussion_id IN (
    SELECT id FROM public.discussions 
    WHERE tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  ));

-- Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Audit Logs (read-only for admins)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs for their tenant"
  ON public.audit_logs FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.users 
    WHERE id = auth.uid() AND role IN ('super_admin'::user_role, 'admin'::user_role)
  ));

-- AI Generation Jobs
ALTER TABLE public.ai_generation_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own jobs"
  ON public.ai_generation_jobs FOR SELECT
  USING (user_id = auth.uid());

-- Content Audit Reports
ALTER TABLE public.content_audit_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view audit reports in their tenant"
  ON public.content_audit_reports FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- User Consents
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consents"
  ON public.user_consents FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own consents"
  ON public.user_consents FOR ALL
  USING (user_id = auth.uid());

-- ============================================================================
-- UPDATE TRIGGERS
-- ============================================================================

-- Add updated_at triggers for new tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- UPDATE USER REGISTRATION FUNCTION
-- ============================================================================

DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_tenant_id UUID;
    user_account_type TEXT;
    user_company_name TEXT;
    user_subdomain TEXT;
BEGIN
    -- Extract metadata from auth.users
    user_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'user');
    user_company_name := NEW.raw_user_meta_data->>'company_name';
    user_subdomain := NEW.raw_user_meta_data->>'subdomain';

    -- If company account, create tenant
    IF user_account_type = 'company' AND user_company_name IS NOT NULL THEN
        INSERT INTO public.tenants (name, subdomain, plan)
        VALUES (user_company_name, user_subdomain, 'free'::subscription_plan)
        RETURNING id INTO new_tenant_id;
    END IF;

    -- Create user profile
    INSERT INTO public.users (id, tenant_id, email, full_name, role)
    VALUES (
        NEW.id,
        new_tenant_id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE WHEN new_tenant_id IS NOT NULL THEN 'admin'::user_role ELSE 'view_only'::user_role END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
