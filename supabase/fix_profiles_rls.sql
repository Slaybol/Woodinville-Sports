-- Fix for Profiles RLS - Add missing INSERT policy for user registration
-- Run this in your Supabase SQL Editor

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can view profiles in their teams" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create comprehensive profiles policies
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view profiles in their teams" ON public.profiles
  FOR SELECT USING (
    id IN (
      SELECT tm.user_id FROM public.team_members tm
      WHERE tm.team_id IN (
        SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Also allow users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Optional: Allow users to delete their own profile
CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);
