-- Add default Woodinville teams for new user assignment
-- Run this in your Supabase SQL Editor

-- Insert default Woodinville teams if they don't exist
INSERT INTO public.teams (id, name, sport, season, level, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Woodinville Falcons Varsity', 'Football', '2024-2025', 'Varsity', 'Woodinville High School Varsity Football Team'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Woodinville Falcons JV', 'Football', '2024-2025', 'Junior Varsity', 'Woodinville High School Junior Varsity Football Team'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Woodinville Falcons Freshman', 'Football', '2024-2025', 'Freshman', 'Woodinville High School Freshman Football Team')
ON CONFLICT (id) DO NOTHING;

-- Add a default "All Teams" for coaches and team parents
INSERT INTO public.teams (id, name, sport, season, level, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Woodinville Football Program', 'Football', '2024-2025', 'Program', 'All Woodinville Football Teams')
ON CONFLICT (id) DO NOTHING;

-- Verify teams were created
SELECT * FROM public.teams ORDER BY level;
