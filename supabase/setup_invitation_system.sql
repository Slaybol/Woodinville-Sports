-- Complete Invitation System Setup
-- Run this in your Supabase SQL Editor

-- Step 1: Create invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('parent', 'team_parent', 'coach')),
  team_id UUID REFERENCES public.teams(id),
  invited_by UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  accepted_by UUID REFERENCES public.profiles(id),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Enable RLS for invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Step 3: Create invitation codes function
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'FALCON-' || UPPER(substr(encode(gen_random_bytes(4), 'hex'), 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create RLS policies for invitations
-- Drop existing policies first
DROP POLICY IF EXISTS "Coaches and Team Parents can manage invitations" ON public.invitations;
DROP POLICY IF EXISTS "Users can view their own invitations" ON public.invitations;

-- Create new policies (temporarily allow all authenticated users for testing)
CREATE POLICY "Allow authenticated users to manage invitations" ON public.invitations
  FOR ALL USING (auth.role() = 'authenticated');

-- Step 5: Create indexes
CREATE INDEX IF NOT EXISTS idx_invitations_code ON public.invitations(code);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON public.invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_expires_at ON public.invitations(expires_at);

-- Step 6: Test the function
SELECT generate_invitation_code() as test_code;

-- Step 7: Verify everything is set up
SELECT 
  'invitations table' as object_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'invitations') 
       THEN 'exists' 
       ELSE 'missing' 
  END as status

UNION ALL

SELECT 
  'generate_invitation_code function' as object_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'generate_invitation_code') 
       THEN 'exists' 
       ELSE 'missing' 
  END as status

UNION ALL

SELECT 
  'invitations RLS policies' as object_name,
  CASE WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'invitations') 
       THEN 'exists' 
       ELSE 'missing' 
  END as status;
