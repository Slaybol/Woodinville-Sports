-- Fix RLS policies for teams table to allow authenticated users to read teams
-- Run this in your Supabase SQL Editor

-- First, check current RLS policies on teams
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

-- Drop existing team policies if they exist
DROP POLICY IF EXISTS "Team members can view teams" ON public.teams;

-- Create a simple policy that allows all authenticated users to read teams
CREATE POLICY "Allow authenticated users to read teams" ON public.teams
  FOR SELECT USING (auth.role() = 'authenticated');

-- Also allow users to insert teams (for admin setup)
CREATE POLICY "Allow authenticated users to insert teams" ON public.teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Verify the new policies
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
