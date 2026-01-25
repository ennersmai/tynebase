-- ============================================================================
-- TYNEBASE INITIAL DATABASE SCHEMA
-- ============================================================================
-- This migration creates the core database structure for TyneBase
-- Run this after setting up your Supabase project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TENANTS TABLE
-- ============================================================================
-- Stores organization/company information
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    settings JSONB DEFAULT '{}'::JSONB,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'professional', 'enterprise')),
    max_users INTEGER DEFAULT 5,
    max_storage_gb INTEGER DEFAULT 5
);

-- Index for faster subdomain lookups
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);

-- ============================================================================
-- USERS TABLE (extends auth.users)
-- ============================================================================
-- Stores additional user profile information
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    account_type TEXT DEFAULT 'user' CHECK (account_type IN ('user', 'company')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ,
    preferences JSONB DEFAULT '{}'::JSONB
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON public.users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ============================================================================
-- SPACES TABLE
-- ============================================================================
-- Stores workspace/project spaces within a tenant
CREATE TABLE IF NOT EXISTS public.spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_archived BOOLEAN DEFAULT FALSE,
    settings JSONB DEFAULT '{}'::JSONB
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_spaces_tenant_id ON public.spaces(tenant_id);
CREATE INDEX IF NOT EXISTS idx_spaces_created_by ON public.spaces(created_by);
CREATE INDEX IF NOT EXISTS idx_spaces_archived ON public.spaces(is_archived);

-- ============================================================================
-- DOCUMENTS TABLE
-- ============================================================================
-- Stores all documents/pages
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled',
    content TEXT DEFAULT '',
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT FALSE,
    parent_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    position INTEGER DEFAULT 0,
    icon TEXT,
    cover_image TEXT,
    metadata JSONB DEFAULT '{}'::JSONB
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_space_id ON public.documents(space_id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON public.documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_by ON public.documents(created_by);
CREATE INDEX IF NOT EXISTS idx_documents_parent_id ON public.documents(parent_id);
CREATE INDEX IF NOT EXISTS idx_documents_published ON public.documents(is_published);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_documents_search ON public.documents USING gin(to_tsvector('english', title || ' ' || content));

-- ============================================================================
-- INVITATIONS TABLE
-- ============================================================================
-- Stores pending team invitations
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
    invited_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_invitations_tenant_id ON public.invitations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON public.invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.invitations(token);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Tenants policies
CREATE POLICY "Users can view their own tenant"
    ON public.tenants FOR SELECT
    USING (id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own tenant if admin/owner"
    ON public.tenants FOR UPDATE
    USING (id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('owner', 'admin')
    ));

-- Users policies
CREATE POLICY "Users can view users in their tenant"
    ON public.users FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
    ON public.users FOR INSERT
    WITH CHECK (id = auth.uid());

-- Spaces policies
CREATE POLICY "Users can view spaces in their tenant"
    ON public.spaces FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create spaces in their tenant"
    ON public.spaces FOR INSERT
    WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update spaces in their tenant"
    ON public.spaces FOR UPDATE
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Admins can delete spaces"
    ON public.spaces FOR DELETE
    USING (tenant_id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('owner', 'admin')
    ));

-- Documents policies
CREATE POLICY "Users can view documents in their tenant"
    ON public.documents FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create documents in their tenant"
    ON public.documents FOR INSERT
    WITH CHECK (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update documents in their tenant"
    ON public.documents FOR UPDATE
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can delete their own documents"
    ON public.documents FOR DELETE
    USING (
        created_by = auth.uid() OR
        tenant_id IN (
            SELECT tenant_id FROM public.users 
            WHERE id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

-- Invitations policies
CREATE POLICY "Users can view invitations for their tenant"
    ON public.invitations FOR SELECT
    USING (tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Admins can create invitations"
    ON public.invitations FOR INSERT
    WITH CHECK (tenant_id IN (
        SELECT tenant_id FROM public.users 
        WHERE id = auth.uid() AND role IN ('owner', 'admin')
    ));

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
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

CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON public.spaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user registration
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
        INSERT INTO public.tenants (name, subdomain)
        VALUES (user_company_name, user_subdomain)
        RETURNING id INTO new_tenant_id;
    END IF;

    -- Create user profile
    INSERT INTO public.users (id, tenant_id, full_name, account_type, role)
    VALUES (
        NEW.id,
        new_tenant_id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        user_account_type,
        CASE WHEN new_tenant_id IS NOT NULL THEN 'owner' ELSE 'member' END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- INITIAL DAA (Optional)
-- ============================================================================
-- You can add any initial data here if needed
