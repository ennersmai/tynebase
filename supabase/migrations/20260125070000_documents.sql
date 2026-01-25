-- Migration: 002_documents.sql
-- Create Knowledge Base Tables: documents and templates
-- Phase 1: Foundation (Database & Auth)

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT, -- Markdown content
    yjs_state BYTEA, -- Y.js binary state for real-time collaboration
    parent_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    published_at TIMESTAMPTZ,
    last_indexed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for documents table
CREATE INDEX idx_documents_tenant_id ON public.documents(tenant_id);
CREATE INDEX idx_documents_author_id ON public.documents(author_id);
CREATE INDEX idx_documents_parent_id ON public.documents(parent_id);
CREATE INDEX idx_documents_status ON public.documents(status);
CREATE INDEX idx_documents_last_indexed_at ON public.documents(last_indexed_at) WHERE last_indexed_at IS NOT NULL;

-- Create templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE, -- NULL for global templates
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- Markdown template content
    category TEXT,
    visibility TEXT NOT NULL DEFAULT 'internal' CHECK (visibility IN ('internal', 'public')),
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for templates table
CREATE INDEX idx_templates_tenant_id ON public.templates(tenant_id);
CREATE INDEX idx_templates_created_by ON public.templates(created_by);
CREATE INDEX idx_templates_visibility ON public.templates(visibility);
CREATE INDEX idx_templates_is_approved ON public.templates(is_approved) WHERE is_approved = TRUE;
CREATE INDEX idx_templates_category ON public.templates(category) WHERE category IS NOT NULL;

-- Add updated_at triggers
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
    BEFORE UPDATE ON public.templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.documents IS 'Knowledge base documents with hierarchical structure and real-time collaboration support';
COMMENT ON TABLE public.templates IS 'Document templates (global or tenant-specific)';
COMMENT ON COLUMN public.documents.content IS 'Normalized markdown content for display and search';
COMMENT ON COLUMN public.documents.yjs_state IS 'Binary Y.js CRDT state for real-time collaboration';
COMMENT ON COLUMN public.documents.parent_id IS 'Parent document for hierarchical organization (folders)';
COMMENT ON COLUMN public.documents.status IS 'Publication status: draft or published';
COMMENT ON COLUMN public.documents.last_indexed_at IS 'Timestamp of last RAG indexing operation';
COMMENT ON COLUMN public.templates.tenant_id IS 'NULL for global templates, set for tenant-specific templates';
COMMENT ON COLUMN public.templates.visibility IS 'Template visibility: internal (tenant-only) or public (marketplace)';
COMMENT ON COLUMN public.templates.is_approved IS 'Whether template is approved for public marketplace';
