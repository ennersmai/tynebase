-- Create document_embeddings table for vector similarity search
CREATE TABLE IF NOT EXISTS document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_content TEXT NOT NULL,
  embedding vector(3072) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_document_embeddings_document_id ON document_embeddings(document_id);
CREATE INDEX idx_document_embeddings_tenant_id ON document_embeddings(tenant_id);

-- Create HNSW index using halfvec for 3072 dimensions (pgvector 0.7.0+)
-- halfvec allows indexing up to 4,000 dimensions while maintaining good performance
-- Full precision is stored in the vector(3072) column, halfvec is only used for indexing
CREATE INDEX idx_document_embeddings_embedding ON document_embeddings 
USING hnsw ((embedding::halfvec(3072)) halfvec_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Enable Row Level Security
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only access embeddings from their tenant
CREATE POLICY tenant_isolation_policy ON document_embeddings
  FOR ALL
  USING (
    tenant_id IN (
      SELECT tenant_id FROM users WHERE id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- RLS Policy: Service role can access all embeddings
CREATE POLICY service_role_policy ON document_embeddings
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
