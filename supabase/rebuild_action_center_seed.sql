-- Demo family seed patch for Action Center preview
--
-- Run this after rebuild_schema.sql and rebuild_seed.sql if you want the
-- Action Center preview to show real family/private status rows from Supabase.

insert into public.families (
  id,
  name,
  primary_contact_id,
  notes
)
values (
  '80000000-0000-0000-0000-000000000001',
  'Sabol family',
  null,
  'demo_preview'
)
on conflict (id) do update
set name = excluded.name,
    primary_contact_id = excluded.primary_contact_id,
    notes = excluded.notes;

insert into public.family_action_status (
  id,
  family_id,
  action_item_id,
  status,
  completed_by,
  completed_at,
  admin_note
)
values
  (
    '90000000-0000-0000-0000-000000000001',
    '80000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000001',
    'not_started',
    null,
    null,
    null
  ),
  (
    '90000000-0000-0000-0000-000000000002',
    '80000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    'in_progress',
    null,
    null,
    null
  ),
  (
    '90000000-0000-0000-0000-000000000003',
    '80000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000003',
    'not_started',
    null,
    null,
    null
  ),
  (
    '90000000-0000-0000-0000-000000000004',
    '80000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000004',
    'complete',
    null,
    '2026-05-18 09:00:00-07',
    null
  )
on conflict (family_id, action_item_id) do update
set status = excluded.status,
    completed_by = excluded.completed_by,
    completed_at = excluded.completed_at,
    admin_note = excluded.admin_note;
