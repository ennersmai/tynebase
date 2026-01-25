-- CORRECTED: Individual users should NOT automatically create tenants
-- This follows the proper multi-tenant architecture from the PRD

-- 1. DROP EXISTING TRIGGER AND FUNCTION
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. RECREATE FUNCTION WITH CORRECT LOGIC
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER SET search_path = public, extensions 
AS $$
DECLARE
    user_account_type TEXT;
    user_company_name TEXT;
    user_subdomain TEXT;
    user_full_name TEXT;
BEGIN
    -- Log start of execution
    RAISE LOG 'handle_new_user triggered for user_id: %, email: %', NEW.id, NEW.email;

    -- Extract metadata
    user_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'user');
    user_company_name := NEW.raw_user_meta_data->>'company_name';
    user_subdomain := NEW.raw_user_meta_data->>'subdomain';
    user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'User');

    -- Logic: Only create tenant for COMPANY accounts
    -- Individual users get created without tenant_id (NULL)
    IF user_account_type = 'company' AND user_company_name IS NOT NULL THEN
        DECLARE
            new_tenant_id UUID;
            tenant_name TEXT;
        BEGIN
            -- Company tenant creation
            tenant_name := user_company_name;
            
            -- Basic slugify for safety if subdomain is missing
            IF user_subdomain IS NULL OR user_subdomain = '' THEN
                 user_subdomain := lower(regexp_replace(user_company_name, '[^a-zA-Z0-9]', '', 'g'));
            END IF;

            -- Check if subdomain already exists
            IF EXISTS (SELECT 1 FROM public.tenants WHERE subdomain = user_subdomain) THEN
                user_subdomain := user_subdomain || '-' || substr(md5(random()::text), 1, 4);
                RAISE LOG 'Company subdomain collision, adjusted to: %', user_subdomain;
            END IF;

            -- Insert tenant record
            INSERT INTO public.tenants (name, subdomain, plan)
            VALUES (tenant_name, user_subdomain, 'free'::subscription_plan)
            RETURNING id INTO new_tenant_id;
            
            RAISE LOG 'Created new tenant (%) for company: %', new_tenant_id, NEW.id;

            -- Create user profile linked to tenant
            INSERT INTO public.users (id, tenant_id, email, full_name, role)
            VALUES (
                NEW.id,
                new_tenant_id,
                NEW.email,
                user_full_name,
                'admin'::user_role -- Company creators are admins
            );

            RAISE LOG 'Created public.users profile for company user: % with tenant: %', NEW.id, new_tenant_id;
        END;
    ELSE
        -- Individual user creation - NO TENANT
        INSERT INTO public.users (id, tenant_id, email, full_name, role)
        VALUES (
            NEW.id,
            NULL, -- No tenant for individual users
            NEW.email,
            user_full_name,
            'view_only'::user_role -- Default role for individual users
        );

        RAISE LOG 'Created public.users profile for individual user: % (no tenant)', NEW.id;
    END IF;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the specific database error
        RAISE LOG 'ERROR in handle_new_user for user %: % %', NEW.id, SQLERRM, SQLSTATE;
        RAISE EXCEPTION 'Database error saving new user: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- 3. REBIND TRIGGER
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. ADD INDEX FOR BETTER PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);

-- 5. ADD INDEX FOR USERS WITHOUT TENANTS (for individual user lookups)
CREATE INDEX IF NOT EXISTS idx_users_tenant_null ON public.users(tenant_id) WHERE tenant_id IS NULL;
