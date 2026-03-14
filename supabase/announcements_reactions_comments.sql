-- Add reactions and comments to announcements
-- Run this in your Supabase SQL editor

-- Announcement reactions table
CREATE TABLE public.announcement_reactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  announcement_id UUID REFERENCES public.announcements(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'thumbs_up', 'celebrate', 'pray')) DEFAULT 'like',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(announcement_id, user_id) -- One reaction per user per announcement
);

-- Announcement comments table
CREATE TABLE public.announcement_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  announcement_id UUID REFERENCES public.announcements(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.announcement_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reactions
CREATE POLICY "Users can view reactions for their team announcements" ON public.announcement_reactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.announcements a
      JOIN public.team_members tm ON a.team_id = tm.team_id
      WHERE a.id = announcement_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert reactions for their team announcements" ON public.announcement_reactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.announcements a
      JOIN public.team_members tm ON a.team_id = tm.team_id
      WHERE a.id = announcement_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own reactions" ON public.announcement_reactions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own reactions" ON public.announcement_reactions
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for comments
CREATE POLICY "Users can view comments for their team announcements" ON public.announcement_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.announcements a
      JOIN public.team_members tm ON a.team_id = tm.team_id
      WHERE a.id = announcement_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert comments for their team announcements" ON public.announcement_comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.announcements a
      JOIN public.team_members tm ON a.team_id = tm.team_id
      WHERE a.id = announcement_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own comments" ON public.announcement_comments
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON public.announcement_comments
  FOR DELETE USING (user_id = auth.uid());

-- Indexes for better performance
CREATE INDEX idx_announcement_reactions_announcement_id ON public.announcement_reactions(announcement_id);
CREATE INDEX idx_announcement_reactions_user_id ON public.announcement_reactions(user_id);
CREATE INDEX idx_announcement_comments_announcement_id ON public.announcement_comments(announcement_id);
CREATE INDEX idx_announcement_comments_user_id ON public.announcement_comments(user_id);
CREATE INDEX idx_announcement_comments_created_at ON public.announcement_comments(created_at DESC);
