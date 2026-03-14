-- Test teams table and data
-- Run this in your Supabase SQL Editor

-- Check if teams table exists and has data
SELECT 
  'teams table exists' as status,
  COUNT(*) as team_count
FROM public.teams;

-- Show all teams
SELECT 
  id,
  name,
  sport,
  season,
  school_name
FROM public.teams 
ORDER BY name;

-- Check RLS policies on teams table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'teams';

-- Test if we can query teams as a regular user
-- (This should work if RLS allows it)
SELECT 'Testing public access' as test, COUNT(*) as count
FROM public.teams 
WHERE sport = 'football';
