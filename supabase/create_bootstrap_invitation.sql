-- Bootstrap invitation for local/dev sign-up
--
-- Edit the two values below, then run this in Supabase SQL Editor:
--   signup_email: the email you want to register with
--   invite_code:  the code you'll type into /auth
--
-- This script:
-- - finds the first existing auth user to act as inviter
-- - creates a matching inviter profile if missing
-- - creates or updates a pending invitation for your signup email

do $$
declare
  signup_email text := 'tobysabol@gmail.com';
  invite_code text := 'FALCON-TOBY2026';
  inviter_user_id uuid;
  inviter_email text;
  football_team_id uuid;
begin
  select au.id, au.email
  into inviter_user_id, inviter_email
  from auth.users au
  order by au.created_at asc
  limit 1;

  if inviter_user_id is null then
    raise exception 'No auth.users rows exist yet. Create any user first, then rerun this script.';
  end if;

  insert into public.profiles (
    id,
    email,
    full_name,
    role
  )
  values (
    inviter_user_id,
    coalesce(inviter_email, 'bootstrap-admin@example.com'),
    coalesce(split_part(inviter_email, '@', 1), 'Bootstrap Admin'),
    'fgic_admin'::public.profile_role
  )
  on conflict (id) do update
  set
    email = excluded.email,
    role = 'fgic_admin'::public.profile_role;

  select id
  into football_team_id
  from public.teams
  where sport = 'football'
  order by
    case when level = 'all_program' then 0 else 1 end,
    created_at asc
  limit 1;

  insert into public.invitations (
    code,
    email,
    full_name,
    role,
    team_id,
    invited_by,
    status,
    expires_at,
    message
  )
  values (
    upper(invite_code),
    lower(signup_email),
    null,
    'parent',
    football_team_id,
    inviter_user_id,
    'pending',
    now() + interval '30 days',
    'Bootstrap invitation for local dev access.'
  )
  on conflict (code) do update
  set
    email = excluded.email,
    role = excluded.role,
    team_id = excluded.team_id,
    invited_by = excluded.invited_by,
    status = 'pending',
    expires_at = now() + interval '30 days',
    message = excluded.message;
end $$;
