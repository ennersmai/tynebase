-- ============================================================================
-- FIX RLS INFINITE RECURSION
-- ============================================================================

-- 1. Drop the problematic recursive policy
DROP POLICY IF EXISTS "Users can view users in their tenant" ON public.users;

-- 2. Recreate it with a "Recursion Breaker"
-- We allow "id = auth.uid()" first. This stops the database from needing to 
-- query the table again to find out if you are you.
CREATE POLICY "Users can view users in their tenant"
ON public.users FOR SELECT
USING (
    -- RECURSION BREAKER: Allow access to own profile immediately
    id = auth.uid() 
    OR 
    -- Then check for tenant match (only runs for other users)
    tenant_id IN (
        SELECT tenant_id 
        FROM public.users 
        WHERE id = auth.uid()
    )
);

-- 3. Ensure the Insert policy is simple (Standard check)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile"
ON public.users FOR INSERT
WITH CHECK (id = auth.uid());

-- 4. Ensure the Update policy is simple
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE
USING (id = auth.uid());