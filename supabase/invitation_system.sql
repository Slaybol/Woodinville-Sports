-- Invitation system for secure registration
-- Run this in your Supabase SQL Editor

-- Create invitations table
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

-- Enable RLS for invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS policies for invitations
CREATE POLICY "Coaches and Team Parents can manage invitations" ON public.invitations
  FOR ALL USING (
    invited_by IN (
      SELECT user_id FROM public.team_members 
      WHERE user_id = auth.uid() AND role IN ('coach', 'team_parent')
    )
  );

CREATE POLICY "Users can view their own invitations" ON public.invitations
  FOR SELECT USING (email = auth.email());

-- Create invitation codes function
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'FALCON-' || UPPER(substr(encode(gen_random_bytes(4), 'hex'), 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_invitations_code ON public.invitations(code);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON public.invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_expires_at ON public.invitations(expires_at);

-- Clean up expired invitations (you can run this periodically)
DELETE FROM public.invitations 
WHERE status = 'pending' AND expires_at < NOW() - INTERVAL '7 days';
