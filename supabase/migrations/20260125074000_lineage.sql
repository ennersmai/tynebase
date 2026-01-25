-- Migration: Document Lineage Table
-- Purpose: Immutable audit trail for all document lifecycle events
-- Task: 1.8 - Create Document Lineage Table

-- Create enum for event types
CREATE TYPE lineage_event_type AS ENUM (
  'created',
  'ai_generated',
  'converted_from_video',
  'converted_from_pdf',
  'converted_from_docx',
  'converted_from_url',
  'published',
  'unpublished',
  'ai_enhanced',
  'edited'
);

-- Create document_lineage table
CREATE TABLE document_lineage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  event_type lineage_event_type NOT NULL,
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_document_lineage_document_id ON document_lineage(document_id);
CREATE INDEX idx_document_lineage_created_at ON document_lineage(created_at DESC);
CREATE INDEX idx_document_lineage_event_type ON document_lineage(event_type);

-- Create trigger function to prevent UPDATE and DELETE operations
CREATE OR REPLACE FUNCTION prevent_lineage_modification()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Document lineage records are immutable and cannot be modified or deleted';
END;
$$ LANGUAGE plpgsql;

-- Create triggers to enforce immutability
CREATE TRIGGER prevent_lineage_update
  BEFORE UPDATE ON document_lineage
  FOR EACH ROW
  EXECUTE FUNCTION prevent_lineage_modification();

CREATE TRIGGER prevent_lineage_delete
  BEFORE DELETE ON document_lineage
  FOR EACH ROW
  EXECUTE FUNCTION prevent_lineage_modification();

-- Enable RLS
ALTER TABLE document_lineage ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view lineage for documents in their tenant
CREATE POLICY lineage_tenant_isolation ON document_lineage
  FOR SELECT
  USING (
    document_id IN (
      SELECT id FROM documents 
      WHERE tenant_id = current_setting('app.current_tenant_id', true)::uuid
    )
    OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_super_admin = true
    )
  );

-- RLS Policy: Users can insert lineage events for documents in their tenant
CREATE POLICY lineage_insert_policy ON document_lineage
  FOR INSERT
  WITH CHECK (
    document_id IN (
      SELECT id FROM documents 
      WHERE tenant_id = current_setting('app.current_tenant_id', true)::uuid
    )
  );

-- Add comment for documentation
COMMENT ON TABLE document_lineage IS 'Immutable audit trail for document lifecycle events. Records cannot be updated or deleted once created.';
COMMENT ON COLUMN document_lineage.metadata IS 'Additional context for the event (e.g., AI model used, source URL, file name)';
