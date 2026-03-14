-- Check your current user role and update to coach/admin if needed
-- Run this in your Supabase SQL Editor

-- First, find your user profile
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM public.profiles p
ORDER BY p.created_at DESC
LIMIT 5;

-- If you need to update your role to see the admin dashboard, run this:
-- UPDATE public.profiles 
-- SET role = 'coach' 
-- WHERE email = 'your-email@example.com';

-- Or update to team_parent:
-- UPDATE public.profiles 
-- SET role = 'team_parent' 
-- WHERE email = 'your-email@example.com';
