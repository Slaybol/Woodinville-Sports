-- Bootstrap demo account data after the Auth users already exist.
--
-- Expected Auth users:
-- - parent@demo.com
-- - coach@demo.com
--
-- What this does:
-- - ensures public.profiles rows exist
-- - sets demo roles
-- - creates a family for the parent demo user
-- - creates a guardian membership for that family
-- - creates a demo player for the family
-- - links the coach demo user to a team

do $$
declare
  parent_user_id uuid;
  coach_user_id uuid;
  target_team_id uuid;
  parent_family_id uuid;
  existing_player_id uuid;
begin
  select id into parent_user_id
  from auth.users
  where email = 'parent@demo.com'
  limit 1;

  select id into coach_user_id
  from auth.users
  where email = 'coach@demo.com'
  limit 1;

  if parent_user_id is null then
    raise exception 'Auth user not found for parent@demo.com';
  end if;

  if coach_user_id is null then
    raise exception 'Auth user not found for coach@demo.com';
  end if;

  select id into target_team_id
  from public.teams
  where sport = 'football'
  order by
    case
      when lower(name) like '%varsity%' then 0
      when lower(name) like '%all%' then 1
      else 2
    end,
    created_at asc
  limit 1;

  insert into public.profiles (id, email, full_name, role)
  values (parent_user_id, 'parent@demo.com', 'Demo Parent', 'parent')
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role;

  insert into public.profiles (id, email, full_name, role)
  values (coach_user_id, 'coach@demo.com', 'Demo Coach', 'coach')
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role;

  select id into parent_family_id
  from public.families
  where primary_contact_id = parent_user_id
  order by created_at asc
  limit 1;

  if parent_family_id is null then
    insert into public.families (name, primary_contact_id)
    values ('Demo Family', parent_user_id)
    returning id into parent_family_id;
  end if;

  insert into public.family_members (family_id, profile_id, role, display_name, is_primary)
  values (parent_family_id, parent_user_id, 'guardian', 'Demo Parent', true)
  on conflict do nothing;

  select id into existing_player_id
  from public.players
  where family_id = parent_family_id
  order by created_at asc
  limit 1;

  if existing_player_id is null then
    insert into public.players (family_id, full_name, graduation_year, team_id, position, jersey_number)
    values (parent_family_id, 'Demo Player', 2027, target_team_id, 'WR', '11')
    returning id into existing_player_id;
  end if;

  if target_team_id is not null then
    insert into public.team_members (team_id, profile_id, role)
    values (target_team_id, coach_user_id, 'coach')
    on conflict do nothing;
  end if;
end $$;
