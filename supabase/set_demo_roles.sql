-- Set demo roles for web-access walkthroughs
-- Run in the Supabase SQL Editor after the users have created accounts.
--
-- Recommended demo split:
-- - one parent account for the family-facing app
-- - one coach or team_parent account for /admin access
--
-- Replace the example emails below with the real accounts you want to demo.

-- Preview the matching profiles first.
select id, email, full_name, role, created_at
from public.profiles
where email in (
  'parent@demo.com',
  'coach@demo.com'
)
order by created_at asc;

-- Parent-facing demo account
update public.profiles
set role = 'parent'::public.profile_role
where email = 'parent@demo.com';

-- Admin-web demo account
-- Choose one of these:

update public.profiles
set role = 'coach'::public.profile_role
where email = 'coach@demo.com';

-- Or, if you want the second account to read as team parent instead:
-- update public.profiles
-- set role = 'team_parent'::public.profile_role
-- where email = 'coach@demo.com';

-- Verify the final roles.
select id, email, full_name, role
from public.profiles
where email in (
  'parent@demo.com',
  'coach@demo.com'
)
order by email asc;
