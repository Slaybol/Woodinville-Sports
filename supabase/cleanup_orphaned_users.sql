-- Clean up orphaned users and fix profile issues
-- Run this in your Supabase SQL Editor

-- Step 1: Create profiles for existing users who don't have them
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', 'Unknown User'),
  COALESCE(u.raw_user_meta_data->>'role', 'parent')
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
AND u.email IS NOT NULL;

-- Step 2: Remove any duplicate profiles (keep the first one)
DELETE FROM public.profiles
WHERE id IN (
  SELECT id
  FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY id ORDER BY created_at) as rn
    FROM public.profiles
  ) t
  WHERE rn > 1
);

-- Step 3: Update profiles with missing information from auth metadata
UPDATE public.profiles p
SET 
  full_name = COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', 'Unknown User'),
  role = COALESCE(p.role, u.raw_user_meta_data->>'role', 'parent')
FROM auth.users u
WHERE p.id = u.id
AND u.email IS NOT NULL;

-- Step 4: Check for any remaining issues
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  CASE 
    WHEN p.id IS NULL THEN 'Missing Profile'
    ELSE 'Profile Exists'
  END as profile_status
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email IS NOT NULL
ORDER BY u.created_at DESC;
