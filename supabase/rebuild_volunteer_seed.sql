-- Demo volunteer signup seed patch for Volunteer preview
--
-- Run this after:
-- - rebuild_schema.sql
-- - rebuild_seed.sql
-- - rebuild_action_center_seed.sql

insert into public.volunteer_signups (
  id,
  slot_id,
  family_id,
  profile_id,
  status,
  hours_credited
)
values
  (
    '91000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000001',
    '80000000-0000-0000-0000-000000000001',
    null,
    'confirmed',
    2
  ),
  (
    '91000000-0000-0000-0000-000000000002',
    '60000000-0000-0000-0000-000000000002',
    '80000000-0000-0000-0000-000000000001',
    null,
    'confirmed',
    2
  )
on conflict (slot_id, family_id) do update
set profile_id = excluded.profile_id,
    status = excluded.status,
    hours_credited = excluded.hours_credited;
