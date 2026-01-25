-- 1. DROP EXISTING TRIGGER AND FUNCTION
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. RECREATE ROBUST FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
-- CRITICAL FIX: Explicitly set search_path so the function can find your tables and extensions
SECURITY DEFINER SET search_path = public, extensions 
AS $$
DECLARE
    new_tenant_id UUID;
    user_account_type TEXT;
    user_company_name TEXT;
    user_subdomain TEXT;
    clean_subdomain TEXT;
BEGIN
    -- Log start of execution (viewable in Supabase Database Logs)
    RAISE LOG 'handle_new_user triggered for user_id: %', NEW.id;

    -- Extract metadata
    user_account_type := COALESCE(NEW.raw_user_meta_data->>'account_type', 'user');
    user_company_name := NEW.raw_user_meta_data->>'company_name';
    user_subdomain := NEW.raw_user_meta_data->>'subdomain';

    -- Logic: Create Tenant if it's a company account
    IF user_account_type = 'company' AND user_company_name IS NOT NULL THEN
        
        -- Basic slugify for safety if subdomain is missing but company name exists
        IF user_subdomain IS NULL OR user_subdomain = '' THEN
             user_subdomain := lower(regexp_replace(user_company_name, '[^a-zA-Z0-9]', '', 'g'));
        END IF;

        -- Check if subdomain already exists to prevent crash
        IF EXISTS (SELECT 1 FROM public.tenants WHERE subdomain = user_subdomain) THEN
            -- Append 4 random hex chars to make it unique
            user_subdomain := user_subdomain || '-' || substr(md5(random()::text), 1, 4);
            RAISE LOG 'Subdomain collision, adjusted to: %', user_subdomain;
        END IF;

        INSERT INTO public.tenants (name, subdomain, plan)
        VALUES (user_company_name, user_subdomain, 'free'::subscription_plan)
        RETURNING id INTO new_tenant_id;
        
        RAISE LOG 'Created new tenant: %', new_tenant_id;
    END IF;

    -- Create user profile
    INSERT INTO public.users (id, tenant_id, email, full_name, role)
    VALUES (
        NEW.id,
        new_tenant_id, -- Can be NULL if not a company setup
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE 
            WHEN new_tenant_id IS NOT NULL THEN 'admin'::user_role 
            ELSE 'view_only'::user_role 
        END
    );

    RAISE LOG 'Created public.users profile for: %', NEW.id;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the specific database error so you can see it in the Dashboard
        RAISE LOG 'ERROR in handle_new_user: % %', SQLERRM, SQLSTATE;
        -- Return NEW anyway so Auth user is created, but log the profile failure? 
        -- NO: Better to fail hard so we don't have orphaned auth users.
        RAISE EXCEPTION 'Database error saving new user: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- 3. REBIND TRIGGER
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();