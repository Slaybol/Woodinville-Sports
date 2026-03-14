-- Add Woodinville Falcons Football Teams
-- Run this in your Supabase SQL Editor

-- First, let's see what teams currently exist
SELECT * FROM public.teams ORDER BY name;

-- Clear any existing teams to avoid conflicts
DELETE FROM public.teams WHERE sport = 'Football';

-- Insert the Woodinville Falcons teams
INSERT INTO public.teams (id, name, sport, season, level, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Woodinville Falcons Varsity', 'Football', '2024-2025', 'Varsity', 'Woodinville High School Varsity Football Team'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Woodinville Falcons Jr. Varsity', 'Football', '2024-2025', 'Junior Varsity', 'Woodinville High School Junior Varsity Football Team'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Woodinville Falcons C-Team', 'Football', '2024-2025', 'C-Team', 'Woodinville High School C-Team Football Team'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Woodinville Football Program', 'Football', '2024-2025', 'Program', 'All Woodinville Football Teams - Admin Access')
ON CONFLICT (id) DO NOTHING;

-- Verify the teams were created
SELECT 
  id,
  name,
  level,
  description
FROM public.teams 
WHERE sport = 'Football'
ORDER BY 
  CASE level 
    WHEN 'Varsity' THEN 1
    WHEN 'Junior Varsity' THEN 2
    WHEN 'C-Team' THEN 3
    WHEN 'Program' THEN 4
    ELSE 5
  END;
