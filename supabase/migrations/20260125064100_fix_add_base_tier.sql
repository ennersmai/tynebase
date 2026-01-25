-- Migration: Fix - Add 'base' tier to tenants table
-- Corrects tier CHECK constraint to include all 4 tiers from pricing model
-- Tiers: free, base (€29/mo), pro (€99/mo), enterprise (custom)

-- Drop existing CHECK constraint
ALTER TABLE public.tenants DROP CONSTRAINT IF EXISTS tenants_tier_check;

-- Add new CHECK constraint with all 4 tiers
ALTER TABLE public.tenants 
ADD CONSTRAINT tenants_tier_check 
CHECK (tier IN ('free', 'base', 'pro', 'enterprise'));

-- Update comment to reflect all tiers
COMMENT ON COLUMN public.tenants.tier IS 'Subscription tier: free, base (€29/mo), pro (€99/mo), or enterprise (custom)';
