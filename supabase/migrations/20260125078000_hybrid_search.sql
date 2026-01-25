-- Migration: Create Hybrid Search RPC Function
-- Combines vector similarity search (70% weight) with full-text search (30% weight)
-- Task 1.12: [DB] Create Hybrid Search RPC Function

-- Create tsvector column for full-text search on document_embeddings
ALTER TABLE document_embeddings 
ADD COLUMN IF NOT EXISTS content_tsvector tsvector 
GENERATED ALWAYS AS (to_tsvector('english', chunk_content)) STORED;

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_document_embeddings_content_tsvector 
ON document_embeddings USING GIN(content_tsvector);

-- Create hybrid_search function
CREATE OR REPLACE FUNCTION hybrid_search(
  query_embedding vector(3072),
  query_text text,
  p_tenant_id uuid,
  match_count int DEFAULT 50
)
RETURNS TABLE (
  id uuid,
  document_id uuid,
  chunk_index integer,
  chunk_content text,
  metadata jsonb,
  created_at timestamptz,
  similarity_score float,
  text_rank_score float,
  combined_score float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH vector_search AS (
    SELECT 
      de.id,
      de.document_id,
      de.chunk_index,
      de.chunk_content,
      de.metadata,
      de.created_at,
      -- Calculate cosine similarity (1 - cosine distance)
      1 - (de.embedding::halfvec(3072) <=> query_embedding::halfvec(3072)) AS similarity
    FROM document_embeddings de
    WHERE de.tenant_id = p_tenant_id
  ),
  text_search AS (
    SELECT 
      de.id,
      -- Calculate text rank score normalized to 0-1 range
      COALESCE(ts_rank(de.content_tsvector, websearch_to_tsquery('english', query_text)), 0) AS rank_score
    FROM document_embeddings de
    WHERE de.tenant_id = p_tenant_id
      AND de.content_tsvector @@ websearch_to_tsquery('english', query_text)
  ),
  combined AS (
    SELECT 
      vs.id,
      vs.document_id,
      vs.chunk_index,
      vs.chunk_content,
      vs.metadata,
      vs.created_at,
      vs.similarity,
      COALESCE(ts.rank_score, 0) AS text_rank,
      -- Combine scores: 70% vector similarity + 30% text rank
      (vs.similarity * 0.7) + (COALESCE(ts.rank_score, 0) * 0.3) AS combined
    FROM vector_search vs
    LEFT JOIN text_search ts ON vs.id = ts.id
  )
  SELECT 
    c.id,
    c.document_id,
    c.chunk_index,
    c.chunk_content,
    c.metadata,
    c.created_at,
    c.similarity::float AS similarity_score,
    c.text_rank::float AS text_rank_score,
    c.combined::float AS combined_score
  FROM combined c
  ORDER BY c.combined DESC
  LIMIT match_count;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION hybrid_search IS 'Hybrid search combining vector similarity (70%) and full-text search (30%) with tenant isolation';
