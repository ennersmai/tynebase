-- Migration: User Consents Table
-- Task: 1.9 - Create User Consents Table
-- Purpose: Track user consent preferences for GDPR compliance

-- Create user_consents table
CREATE TABLE IF NOT EXISTS public.user_consents (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    ai_processing BOOLEAN NOT NULL DEFAULT true,
    analytics_tracking BOOLEAN NOT NULL DEFAULT true,
    knowledge_indexing BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_user_consents_user_id ON public.user_consents(user_id);

-- Enable RLS
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own consents
CREATE POLICY "Users can view own consents"
    ON public.user_consents
    FOR SELECT
    USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own consents
CREATE POLICY "Users can insert own consents"
    ON public.user_consents
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only update their own consents
CREATE POLICY "Users can update own consents"
    ON public.user_consents
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users cannot delete their consents (only update)
-- No DELETE policy - consents should persist for audit trail

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_consents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_consents_updated_at
    BEFORE UPDATE ON public.user_consents
    FOR EACH ROW
    EXECUTE FUNCTION update_user_consents_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON public.user_consents TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
