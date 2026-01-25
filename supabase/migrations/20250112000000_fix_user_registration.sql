-- Fix for handle_new_user function to properly handle individual users
-- This migration creates a default tenant for individual users

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the corrected function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_tenant_id UUID;
    user_account_type TEXT;
    user_company_name TEXT;
    user_subdomain TEXT;
BEGIN
    -- Extract metadata from auth.users (Raw metadata provided by Signup form)
    user_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'user');
    user_company_name := NEW.raw_user_meta_data->>'company_name';
    user_subdomain := NEW.raw_user_meta_data->>'subdomain';

    -- If company account, create tenant with company details
    IF user_account_type = 'company' AND user_company_name IS NOT NULL THEN
        INSERT INTO public.tenants (name, subdomain, plan)
        VALUES (user_company_name, user_subdomain, 'free'::subscription_plan)
        RETURNING id INTO new_tenant_id;
    ELSIF user_account_type = 'user' THEN
        -- For individual users, create a personal tenant
        INSERT INTO public.tenants (name, subdomain, plan)
        VALUES (
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Personal Workspace'),
            'user-' || substr(NEW.id::text, 1, 8),
            'free'::subscription_plan
        )
        RETURNING id INTO new_tenant_id;
    END IF;

    -- Create user profile linked to tenant
    INSERT INTO public.users (id, tenant_id, email, full_name, role)
    VALUES (
        NEW.id,
        new_tenant_id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE 
            WHEN new_tenant_id IS NOT NULL THEN 'admin'::user_role 
            ELSE 'view_only'::user_role 
        END
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
