-- Create job status enum
CREATE TYPE job_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Create job_queue table for asynchronous task processing
CREATE TABLE IF NOT EXISTS job_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status job_status NOT NULL DEFAULT 'pending',
  payload JSONB DEFAULT '{}'::jsonb,
  result JSONB DEFAULT '{}'::jsonb,
  worker_id TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  next_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create indexes for performance
CREATE INDEX idx_job_queue_tenant_id ON job_queue(tenant_id);
CREATE INDEX idx_job_queue_status_created_at ON job_queue(status, created_at);
CREATE INDEX idx_job_queue_type ON job_queue(type);

-- Enable Row Level Security
ALTER TABLE job_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only access jobs from their tenant
CREATE POLICY tenant_isolation_policy ON job_queue
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

-- RLS Policy: Service role can access all jobs
CREATE POLICY service_role_policy ON job_queue
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
