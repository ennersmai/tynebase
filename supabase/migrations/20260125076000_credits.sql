-- Migration: 007_credits.sql
-- Description: Create credit tracking tables for tenant credit pools and query usage logging
-- Task: 1.10 [DB] Create Credit Tracking Tables

-- =====================================================
-- Table: credit_pools
-- Purpose: Track monthly credit allocations per tenant
-- =====================================================
CREATE TABLE IF NOT EXISTS credit_pools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    month_year TEXT NOT NULL, -- Format: YYYY-MM
    total_credits INTEGER NOT NULL DEFAULT 0,
    used_credits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure one pool per tenant per month
    UNIQUE(tenant_id, month_year),
    
    -- Ensure credits are non-negative
    CONSTRAINT credit_pools_total_credits_positive CHECK (total_credits >= 0),
    CONSTRAINT credit_pools_used_credits_positive CHECK (used_credits >= 0),
    CONSTRAINT credit_pools_used_not_exceed_total CHECK (used_credits <= total_credits)
);

-- Index for fast tenant lookups
CREATE INDEX idx_credit_pools_tenant_id ON credit_pools(tenant_id);

-- Index for querying current month
CREATE INDEX idx_credit_pools_month_year ON credit_pools(month_year);

-- Composite index for tenant + month queries
CREATE INDEX idx_credit_pools_tenant_month ON credit_pools(tenant_id, month_year);

-- =====================================================
-- Table: query_usage
-- Purpose: Log all AI queries for audit and billing
-- =====================================================
CREATE TABLE IF NOT EXISTS query_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    query_type TEXT NOT NULL, -- 'ai_generate', 'rag_chat', 'enhance', 'video_ingest', 'document_convert', 'url_scrape'
    ai_model TEXT, -- 'gpt-5.2', 'claude-sonnet-4.5', 'claude-opus-4.5', 'gemini-3-flash'
    tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0,
    credits_charged INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- Additional context (document_id, job_id, etc.)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure credits charged is positive
    CONSTRAINT query_usage_credits_positive CHECK (credits_charged >= 0),
    CONSTRAINT query_usage_tokens_positive CHECK (tokens_input >= 0 AND tokens_output >= 0)
);

-- Index for tenant queries
CREATE INDEX idx_query_usage_tenant_id ON query_usage(tenant_id);

-- Index for user queries
CREATE INDEX idx_query_usage_user_id ON query_usage(user_id);

-- Index for time-based queries
CREATE INDEX idx_query_usage_created_at ON query_usage(created_at DESC);

-- Composite index for tenant + time range queries
CREATE INDEX idx_query_usage_tenant_time ON query_usage(tenant_id, created_at DESC);

-- Index for query type analytics
CREATE INDEX idx_query_usage_query_type ON query_usage(query_type);

-- =====================================================
-- Enable Row Level Security
-- =====================================================
ALTER TABLE credit_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_usage ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies: credit_pools
-- =====================================================

-- Policy: Users can view their own tenant's credit pools
CREATE POLICY credit_pools_select_own_tenant ON credit_pools
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users WHERE id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- Policy: Only system/admin can insert credit pools (typically done via backend)
CREATE POLICY credit_pools_insert_admin ON credit_pools
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND tenant_id = credit_pools.tenant_id 
            AND role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- Policy: Only system/admin can update credit pools
CREATE POLICY credit_pools_update_admin ON credit_pools
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND tenant_id = credit_pools.tenant_id 
            AND role = 'admin'
        )
        OR
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- Policy: No direct deletes (CASCADE handles cleanup)
CREATE POLICY credit_pools_delete_admin ON credit_pools
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- =====================================================
-- RLS Policies: query_usage
-- =====================================================

-- Policy: Users can view their own tenant's query usage
CREATE POLICY query_usage_select_own_tenant ON query_usage
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id FROM users WHERE id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- Policy: System can insert query usage logs
CREATE POLICY query_usage_insert_system ON query_usage
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id FROM users WHERE id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- Policy: No updates to query usage (immutable audit log)
-- No UPDATE policy = no updates allowed

-- Policy: Only super admin can delete query usage
CREATE POLICY query_usage_delete_admin ON query_usage
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND is_super_admin = true
        )
    );

-- =====================================================
-- Function: Atomic credit decrement with row-level lock
-- Purpose: Safely deduct credits preventing race conditions
-- =====================================================
CREATE OR REPLACE FUNCTION deduct_credits(
    p_tenant_id UUID,
    p_credits INTEGER,
    p_month_year TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM')
)
RETURNS TABLE(
    success BOOLEAN,
    remaining_credits INTEGER,
    message TEXT
) AS $$
DECLARE
    v_pool_id UUID;
    v_total INTEGER;
    v_used INTEGER;
    v_available INTEGER;
BEGIN
    -- Lock the row for update to prevent race conditions
    SELECT id, total_credits, used_credits
    INTO v_pool_id, v_total, v_used
    FROM credit_pools
    WHERE tenant_id = p_tenant_id 
      AND month_year = p_month_year
    FOR UPDATE;
    
    -- If no pool exists, return failure
    IF v_pool_id IS NULL THEN
        RETURN QUERY SELECT false, 0, 'No credit pool found for this month'::TEXT;
        RETURN;
    END IF;
    
    -- Calculate available credits
    v_available := v_total - v_used;
    
    -- Check if sufficient credits
    IF v_available < p_credits THEN
        RETURN QUERY SELECT false, v_available, 'Insufficient credits'::TEXT;
        RETURN;
    END IF;
    
    -- Deduct credits atomically
    UPDATE credit_pools
    SET used_credits = used_credits + p_credits,
        updated_at = NOW()
    WHERE id = v_pool_id;
    
    -- Return success with remaining credits
    v_available := v_available - p_credits;
    RETURN QUERY SELECT true, v_available, 'Credits deducted successfully'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Get current credit balance
-- =====================================================
CREATE OR REPLACE FUNCTION get_credit_balance(
    p_tenant_id UUID,
    p_month_year TEXT DEFAULT TO_CHAR(NOW(), 'YYYY-MM')
)
RETURNS TABLE(
    total_credits INTEGER,
    used_credits INTEGER,
    available_credits INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.total_credits,
        cp.used_credits,
        (cp.total_credits - cp.used_credits) AS available_credits
    FROM credit_pools cp
    WHERE cp.tenant_id = p_tenant_id 
      AND cp.month_year = p_month_year;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Trigger: Update updated_at on credit_pools
-- =====================================================
CREATE OR REPLACE FUNCTION update_credit_pools_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_credit_pools_updated_at
    BEFORE UPDATE ON credit_pools
    FOR EACH ROW
    EXECUTE FUNCTION update_credit_pools_updated_at();

-- =====================================================
-- Comments for documentation
-- =====================================================
COMMENT ON TABLE credit_pools IS 'Monthly credit allocations per tenant for AI operations';
COMMENT ON TABLE query_usage IS 'Immutable audit log of all AI query usage and credit charges';
COMMENT ON FUNCTION deduct_credits IS 'Atomically deduct credits with row-level locking to prevent race conditions';
COMMENT ON FUNCTION get_credit_balance IS 'Get current credit balance for a tenant';
