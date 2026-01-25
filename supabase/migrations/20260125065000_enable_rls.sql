-- Migration: Enable Row Level Security on Identity Tables
-- Task 1.3: Add RLS policies for tenants and users tables
-- Phase 1: Foundation (Database & Auth)

-- Enable RLS on tenants table
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TENANTS TABLE POLICIES
-- ============================================================

-- Policy: Super admins can see all tenants
CREATE POLICY "super_admin_all_tenants"
ON public.tenants
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.is_super_admin = TRUE
    )
);

-- Policy: Users can see their own tenant
CREATE POLICY "users_own_tenant"
ON public.tenants
FOR SELECT
TO authenticated
USING (
    id IN (
        SELECT tenant_id FROM public.users
        WHERE users.id = auth.uid()
    )
);

-- Policy: Users can update their own tenant (admin only)
CREATE POLICY "admins_update_own_tenant"
ON public.tenants
FOR UPDATE
TO authenticated
USING (
    id IN (
        SELECT tenant_id FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
);

-- ============================================================
-- USERS TABLE POLICIES
-- ============================================================

-- Policy: Super admins can see all users
CREATE POLICY "super_admin_all_users"
ON public.users
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.users AS u
        WHERE u.id = auth.uid()
        AND u.is_super_admin = TRUE
    )
);

-- Policy: Users can see users in their own tenant
CREATE POLICY "users_same_tenant"
ON public.users
FOR SELECT
TO authenticated
USING (
    tenant_id IN (
        SELECT tenant_id FROM public.users
        WHERE users.id = auth.uid()
    )
);

-- Policy: Users can update their own profile
CREATE POLICY "users_update_own_profile"
ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Policy: Admins can update users in their tenant
CREATE POLICY "admins_update_tenant_users"
ON public.users
FOR UPDATE
TO authenticated
USING (
    tenant_id IN (
        SELECT tenant_id FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
);

-- Policy: Admins can insert users in their tenant
CREATE POLICY "admins_insert_tenant_users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (
    tenant_id IN (
        SELECT tenant_id FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
);

-- ============================================================
-- SESSION VARIABLE SUPPORT (for testing and API usage)
-- ============================================================

-- Policy: Allow access via session variable (for API/testing)
CREATE POLICY "tenant_context_variable"
ON public.tenants
FOR SELECT
TO authenticated
USING (
    id::text = current_setting('app.current_tenant_id', TRUE)
);

-- Add comments for documentation
COMMENT ON POLICY "super_admin_all_tenants" ON public.tenants IS 'Super admins have full access to all tenants';
COMMENT ON POLICY "users_own_tenant" ON public.tenants IS 'Users can view their own tenant data';
COMMENT ON POLICY "admins_update_own_tenant" ON public.tenants IS 'Tenant admins can update their tenant settings';
COMMENT ON POLICY "super_admin_all_users" ON public.users IS 'Super admins have full access to all users';
COMMENT ON POLICY "users_same_tenant" ON public.users IS 'Users can view other users in their tenant';
COMMENT ON POLICY "users_update_own_profile" ON public.users IS 'Users can update their own profile';
COMMENT ON POLICY "admins_update_tenant_users" ON public.users IS 'Admins can update users in their tenant';
COMMENT ON POLICY "admins_insert_tenant_users" ON public.users IS 'Admins can add users to their tenant';
COMMENT ON POLICY "tenant_context_variable" ON public.tenants IS 'Allow tenant access via session variable for API context';
