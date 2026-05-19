-- Gridiron Connect rebuild schema draft
-- Private Weekly Huddle command center for Woodinville Football.
--
-- This file is intentionally separate from the existing prototype schema.
-- Review before applying to a Supabase project.

create extension if not exists "uuid-ossp";

-- Shared timestamp helper.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Role and status enums.
do $$
begin
  create type public.profile_role as enum ('parent', 'player', 'coach', 'team_parent', 'fgic_admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.family_member_role as enum ('guardian', 'player');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.team_level as enum ('varsity', 'jv', 'c_team', 'all_program');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.huddle_status as enum ('draft', 'scheduled', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.huddle_section_type as enum ('playbook', 'urgent', 'actions', 'calendar', 'volunteer', 'highlights', 'links', 'custom');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.action_status as enum ('not_started', 'in_progress', 'complete', 'waived', 'not_applicable');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.action_importance as enum ('required', 'optional', 'family', 'info');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.event_type as enum ('practice', 'game', 'meeting', 'camp', 'travel', 'deadline', 'fundraiser', 'social', 'other');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.volunteer_category as enum ('game_day', 'meals', 'camp', 'travel', 'fundraising', 'events', 'other');
exception
  when duplicate_object then null;
end $$;

-- Profiles extend Supabase auth.users.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role public.profile_role not null default 'parent',
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.families (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  primary_contact_id uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_families_updated_at on public.families;
create trigger set_families_updated_at
before update on public.families
for each row execute function public.set_updated_at();

create table if not exists public.family_members (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid not null references public.families(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  role public.family_member_role not null,
  display_name text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (family_id, profile_id)
);

create table if not exists public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  level public.team_level not null,
  sport text not null default 'football',
  season text not null,
  school_name text not null default 'Woodinville High School',
  created_at timestamptz not null default now(),
  unique (level, season)
);

create table if not exists public.players (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid references public.families(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  full_name text not null,
  graduation_year integer,
  jersey_number text,
  position text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_players_updated_at on public.players;
create trigger set_players_updated_at
before update on public.players
for each row execute function public.set_updated_at();

create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  player_id uuid references public.players(id) on delete cascade,
  role public.profile_role not null default 'player',
  created_at timestamptz not null default now(),
  constraint team_member_has_person check (profile_id is not null or player_id is not null),
  unique (team_id, profile_id),
  unique (team_id, player_id)
);

create table if not exists public.huddles (
  id uuid primary key default uuid_generate_v4(),
  title text not null default 'Weekly Huddle',
  date_range text not null,
  starts_on date,
  ends_on date,
  summary text,
  status public.huddle_status not null default 'draft',
  target_team_id uuid references public.teams(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  published_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_huddles_updated_at on public.huddles;
create trigger set_huddles_updated_at
before update on public.huddles
for each row execute function public.set_updated_at();

create table if not exists public.huddle_sections (
  id uuid primary key default uuid_generate_v4(),
  huddle_id uuid not null references public.huddles(id) on delete cascade,
  section_type public.huddle_section_type not null default 'custom',
  title text not null,
  body text,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists huddle_sections_huddle_sort_idx
on public.huddle_sections (huddle_id, sort_order);

create table if not exists public.action_items (
  id uuid primary key default uuid_generate_v4(),
  huddle_id uuid references public.huddles(id) on delete set null,
  title text not null,
  description text,
  importance public.action_importance not null default 'required',
  default_status public.action_status not null default 'not_started',
  due_at timestamptz,
  due_label text,
  audience_label text not null default 'All families',
  target_team_id uuid references public.teams(id) on delete set null,
  external_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_action_items_updated_at on public.action_items;
create trigger set_action_items_updated_at
before update on public.action_items
for each row execute function public.set_updated_at();

create table if not exists public.family_action_status (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid not null references public.families(id) on delete cascade,
  action_item_id uuid not null references public.action_items(id) on delete cascade,
  status public.action_status not null default 'not_started',
  completed_by uuid references public.profiles(id) on delete set null,
  completed_at timestamptz,
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (family_id, action_item_id)
);

drop trigger if exists set_family_action_status_updated_at on public.family_action_status;
create trigger set_family_action_status_updated_at
before update on public.family_action_status
for each row execute function public.set_updated_at();

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  event_type public.event_type not null default 'other',
  team_id uuid references public.teams(id) on delete set null,
  audience_label text not null default 'All program',
  starts_at timestamptz,
  ends_at timestamptz,
  display_date text,
  display_time text,
  location text,
  address text,
  arrival_time text,
  bus_time text,
  uniform_note text,
  equipment_note text,
  notes text,
  external_url text,
  is_canceled boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create index if not exists events_starts_at_idx on public.events (starts_at);
create index if not exists events_team_id_idx on public.events (team_id);

create table if not exists public.volunteer_slots (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category public.volunteer_category not null default 'other',
  team_id uuid references public.teams(id) on delete set null,
  event_id uuid references public.events(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  display_date text,
  display_time text,
  location text,
  slots_needed integer not null default 1 check (slots_needed > 0),
  hour_credit numeric(4, 2) not null default 0 check (hour_credit >= 0),
  coordinator_profile_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_volunteer_slots_updated_at on public.volunteer_slots;
create trigger set_volunteer_slots_updated_at
before update on public.volunteer_slots
for each row execute function public.set_updated_at();

create table if not exists public.volunteer_signups (
  id uuid primary key default uuid_generate_v4(),
  slot_id uuid not null references public.volunteer_slots(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  status text not null default 'confirmed' check (status in ('confirmed', 'canceled', 'waitlist')),
  hours_credited numeric(4, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slot_id, family_id)
);

drop trigger if exists set_volunteer_signups_updated_at on public.volunteer_signups;
create trigger set_volunteer_signups_updated_at
before update on public.volunteer_signups
for each row execute function public.set_updated_at();

create table if not exists public.documents (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text not null default 'resource',
  file_url text,
  external_url text,
  target_team_id uuid references public.teams(id) on delete set null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_preferences (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  urgent_alerts boolean not null default true,
  huddle_published boolean not null default true,
  action_due_soon boolean not null default true,
  event_updates boolean not null default true,
  volunteer_reminders boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id)
);

drop trigger if exists set_notification_preferences_updated_at on public.notification_preferences;
create trigger set_notification_preferences_updated_at
before update on public.notification_preferences
for each row execute function public.set_updated_at();

create table if not exists public.in_app_notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  family_id uuid references public.families(id) on delete cascade,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint notification_has_target check (profile_id is not null or family_id is not null)
);

-- RLS is enabled here, but detailed policies should be reviewed before production use.
alter table public.profiles enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.team_members enable row level security;
alter table public.huddles enable row level security;
alter table public.huddle_sections enable row level security;
alter table public.action_items enable row level security;
alter table public.family_action_status enable row level security;
alter table public.events enable row level security;
alter table public.volunteer_slots enable row level security;
alter table public.volunteer_signups enable row level security;
alter table public.documents enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.in_app_notifications enable row level security;

-- Helper functions for RLS policies.
create or replace function public.current_profile_role()
returns public.profile_role
language sql
stable
as $$
  select role
  from public.profiles
  where id = auth.uid()
$$;

create or replace function public.is_program_admin()
returns boolean
language sql
stable
as $$
  select coalesce(public.current_profile_role() in ('coach', 'team_parent', 'fgic_admin'), false)
$$;

create or replace function public.is_family_member(target_family_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.family_members fm
    where fm.family_id = target_family_id
      and fm.profile_id = auth.uid()
  )
$$;

-- Baseline RLS policies. These are intentionally conservative and should be
-- expanded as workflows are implemented.

create policy "profiles can read self"
on public.profiles for select
using (id = auth.uid() or public.is_program_admin());

create policy "profiles can update self"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "admins can manage profiles"
on public.profiles for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "families visible to members and admins"
on public.families for select
using (public.is_family_member(id) or public.is_program_admin());

create policy "admins can manage families"
on public.families for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "family members visible to family and admins"
on public.family_members for select
using (public.is_family_member(family_id) or public.is_program_admin());

create policy "admins can manage family members"
on public.family_members for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "teams visible to authenticated users"
on public.teams for select
using (auth.role() = 'authenticated');

create policy "admins can manage teams"
on public.teams for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "players visible to family and admins"
on public.players for select
using (
  public.is_program_admin()
  or (family_id is not null and public.is_family_member(family_id))
);

create policy "admins can manage players"
on public.players for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "team members visible to authenticated users"
on public.team_members for select
using (auth.role() = 'authenticated');

create policy "admins can manage team members"
on public.team_members for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "published huddles visible to authenticated users"
on public.huddles for select
using (status = 'published' or public.is_program_admin());

create policy "admins can manage huddles"
on public.huddles for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "published huddle sections visible to authenticated users"
on public.huddle_sections for select
using (
  public.is_program_admin()
  or exists (
    select 1
    from public.huddles h
    where h.id = huddle_sections.huddle_id
      and h.status = 'published'
  )
);

create policy "admins can manage huddle sections"
on public.huddle_sections for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "action items visible to authenticated users"
on public.action_items for select
using (auth.role() = 'authenticated');

create policy "admins can manage action items"
on public.action_items for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "family action status visible to family and admins"
on public.family_action_status for select
using (public.is_family_member(family_id) or public.is_program_admin());

create policy "family can update own action status"
on public.family_action_status for update
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "admins can manage family action status"
on public.family_action_status for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "events visible to authenticated users"
on public.events for select
using (auth.role() = 'authenticated');

create policy "admins can manage events"
on public.events for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "volunteer slots visible to authenticated users"
on public.volunteer_slots for select
using (auth.role() = 'authenticated');

create policy "admins can manage volunteer slots"
on public.volunteer_slots for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "volunteer signups visible to family and admins"
on public.volunteer_signups for select
using (public.is_family_member(family_id) or public.is_program_admin());

create policy "family can manage own volunteer signups"
on public.volunteer_signups for all
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id));

create policy "admins can manage volunteer signups"
on public.volunteer_signups for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "documents visible to authenticated users"
on public.documents for select
using (auth.role() = 'authenticated');

create policy "admins can manage documents"
on public.documents for all
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "notification preferences visible to owner and admins"
on public.notification_preferences for select
using (profile_id = auth.uid() or public.is_program_admin());

create policy "owner can update notification preferences"
on public.notification_preferences for update
using (profile_id = auth.uid())
with check (profile_id = auth.uid());

create policy "notifications visible to target and admins"
on public.in_app_notifications for select
using (
  public.is_program_admin()
  or profile_id = auth.uid()
  or (family_id is not null and public.is_family_member(family_id))
);
