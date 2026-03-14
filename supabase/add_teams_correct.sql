-- Add Woodinville Falcons Football Teams (Corrected for actual table structure)
-- Run this in your Supabase SQL Editor

-- First, let's see what teams currently exist
SELECT * FROM public.teams ORDER BY name;

-- Clear any existing teams to avoid conflicts
DELETE FROM public.teams WHERE sport = 'football';

-- Insert the Woodinville Falcons teams using correct column names
INSERT INTO public.teams (id, name, sport, season, school_name, logo_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Woodinville Falcons Varsity', 'football', '2024-2025', 'Woodinville High School', NULL),
  ('550e8400-e29b-41d4-a716-446655440002', 'Woodinville Falcons Jr. Varsity', 'football', '2024-2025', 'Woodinville High School', NULL),
  ('550e8400-e29b-41d4-a716-446655440003', 'Woodinville Falcons C-Team', 'football', '2024-2025', 'Woodinville High School', NULL),
  ('550e8400-e29b-41d4-a716-446655440000', 'Woodinville Football Program', 'football', '2024-2025', 'Woodinville High School', NULL)
ON CONFLICT (id) DO NOTHING;

-- Verify the teams were created
SELECT 
  id,
  name,
  sport,
  season,
  school_name
FROM public.teams 
WHERE sport = 'football'
ORDER BY name;
