-- ============================================================================
-- TYNEBASE PRODUCTION SCHEMA (UNIFIED v1.0)
-- ============================================================================
-- Description: Complete database setup matching PRD v4.3
-- Dependencies: Supabase Auth, Storage
-- ============================================================================

-- 1. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'super_admin', 'admin', 'editor', 'premium', 'contributor', 'view_only'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_state AS ENUM (
        'draft', 'in_review', 'published', 'hidden', 'archived'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_plan AS ENUM (
        'free', 'base', 'pro', 'company'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. STORAGE BUCKETS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('avatars', 'avatars', true),
    ('documents', 'documents', false),
    ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- 4. TABLES
-- ============================================================================

-- Tenants
CREATE TABLE IF NOT EXISTS public.tenants (
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

-- Users (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'view_only',
    theme TEXT DEFAULT 'system',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled',
    content TEXT DEFAULT '',
    content_type TEXT DEFAULT 'markdown',
    state document_state NOT NULL DEFAULT 'draft',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
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

-- Document Embeddings (Vector Search)
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

-- Templates
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

-- Discussions
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

-- Discussion Replies
CREATE TABLE IF NOT EXISTS public.discussion_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
    parent_reply_id UUID REFERENCES public.discussion_replies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
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

-- Audit Logs
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

-- AI Generation Jobs
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

-- Content Audit Reports
CREATE TABLE IF NOT EXISTS public.content_audit_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    generated_by UUID REFERENCES public.users(id),
    report_data JSONB NOT NULL,
    summary JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Consents
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

-- 5. INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON public.users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_categories_tenant_id ON public.categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON public.documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_category_id ON public.documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_state ON public.documents(state);
CREATE INDEX IF NOT EXISTS idx_documents_search ON public.documents USING gin(to_tsvector('english', title || ' ' || COALESCE(content, '')));
CREATE INDEX IF NOT EXISTS idx_document_embeddings_vector ON public.document_embeddings USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

-- Tenants Policies
CREATE POLICY "Users can view their own tenant"
    ON public.tenants FOR SELECT
    USING (id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own tenant if admin/owner"
    ON public.tenants FOR UPDATE
    USING (id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
    ));

-- Users Policies
CREATE POLICY "Users can view users in their tenant"
    ON public.users FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
    ON public.users FOR INSERT
    WITH CHECK (id = auth.uid());

-- Category Policies
CREATE POLICY "Users can view categories in their tenant"
    ON public.categories FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    USING (tenant_id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('super_admin'::user_role, 'admin'::user_role)
    ));

-- Document Policies
CREATE POLICY "Users can view documents in their tenant"
    ON public.documents FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create documents in their tenant"
    ON public.documents FOR INSERT
    WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update documents in their tenant"
    ON public.documents FOR UPDATE
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can delete documents if admin or author"
    ON public.documents FOR DELETE
    USING (
        author_id = auth.uid() OR
        tenant_id IN (
            SELECT tenant_id FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
        )
    );

-- Template Policies
CREATE POLICY "Users can view public templates or their tenant templates"
    ON public.templates FOR SELECT
    USING (
        is_public = TRUE OR 
        tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
    );

CREATE POLICY "Users can create templates in their tenant"
    ON public.templates FOR INSERT
    WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Discussion Policies
CREATE POLICY "Users can view discussions in their tenant"
    ON public.discussions FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create discussions in their tenant"
    ON public.discussions FOR INSERT
    WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

-- Notification Policies
CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
    ON public.notifications FOR UPDATE
    USING (user_id = auth.uid());

-- Storage Policies
CREATE POLICY "Admins can upload logos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'logos' AND
        (storage.foldername(name))[1] IN (
            SELECT tenant_id::text FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin'::user_role, 'super_admin'::user_role)
        )
    );

-- 7. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration from Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_tenant_id UUID;
    user_account_type TEXT;
    user_company_name TEXT;
    user_subdomain TEXT;
BEGIN
    -- Extract metadata from auth.users (Raw metadata provided by Signup form)
    user_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'user');
    user_company_name := NEW.raw_user_meta_data->>'company_name';
    user_subdomain := NEW.raw_user_meta_data->>'subdomain';

    -- If company account, create tenant
    IF user_account_type = 'company' AND user_company_name IS NOT NULL THEN
        INSERT INTO public.tenants (name, subdomain, plan)
        VALUES (user_company_name, user_subdomain, 'free'::subscription_plan)
        RETURNING id INTO new_tenant_id;
    END IF;

    -- Create user profile linked to tenant
    INSERT INTO public.users (id, tenant_id, email, full_name, role)
    VALUES (
        NEW.id,
        new_tenant_id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE 
            WHEN new_tenant_id IS NOT NULL THEN 'admin'::user_role 
            ELSE 'view_only'::user_role 
        END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================