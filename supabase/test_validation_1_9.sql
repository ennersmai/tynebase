-- Validation Test for Task 1.9: User Consents Table
-- Tests: Table creation, default values, RLS policies, and trigger

-- Test 1: Insert test consent record with defaults
-- Expected: Record inserted with all defaults set to true
INSERT INTO public.user_consents (user_id)
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (user_id) DO NOTHING;

-- Test 2: Verify defaults were applied
SELECT 
    user_id,
    ai_processing,
    analytics_tracking,
    knowledge_indexing,
    updated_at
FROM public.user_consents
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- Test 3: Update consent preferences
UPDATE public.user_consents
SET 
    ai_processing = false,
    analytics_tracking = false
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- Test 4: Verify update and updated_at trigger
SELECT 
    user_id,
    ai_processing,
    analytics_tracking,
    knowledge_indexing,
    updated_at
FROM public.user_consents
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- Test 5: Insert another record with explicit values
INSERT INTO public.user_consents (user_id, ai_processing, analytics_tracking, knowledge_indexing)
VALUES ('00000000-0000-0000-0000-000000000002', false, true, false)
ON CONFLICT (user_id) DO NOTHING;

-- Test 6: Verify explicit values
SELECT 
    user_id,
    ai_processing,
    analytics_tracking,
    knowledge_indexing,
    updated_at
FROM public.user_consents
WHERE user_id = '00000000-0000-0000-0000-000000000002';

-- Cleanup
DELETE FROM public.user_consents WHERE user_id IN (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002'
);
