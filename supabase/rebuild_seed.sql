-- Gridiron Connect rebuild seed data
-- Depends on supabase/rebuild_schema.sql.
--
-- This seed uses deterministic UUIDs for easy review and repeatable demos.

insert into public.teams (id, name, level, season, school_name)
values
  ('10000000-0000-0000-0000-000000000001', 'All Program', 'all_program', '2026', 'Woodinville High School'),
  ('10000000-0000-0000-0000-000000000002', 'Varsity', 'varsity', '2026', 'Woodinville High School'),
  ('10000000-0000-0000-0000-000000000003', 'JV', 'jv', '2026', 'Woodinville High School'),
  ('10000000-0000-0000-0000-000000000004', 'C-Team', 'c_team', '2026', 'Woodinville High School')
on conflict (level, season) do update
set name = excluded.name,
    school_name = excluded.school_name;

-- Optional demo profiles. These IDs must correspond to auth.users before
-- profile rows can be inserted in a real Supabase project.
-- Keep commented until demo auth users exist.
--
-- insert into public.profiles (id, email, full_name, role, phone)
-- values
--   ('20000000-0000-0000-0000-000000000001', 'admin@example.com', 'Gridiron Admin', 'fgic_admin', null),
--   ('20000000-0000-0000-0000-000000000002', 'parent@example.com', 'Demo Parent', 'parent', null)
-- on conflict (id) do update
-- set email = excluded.email,
--     full_name = excluded.full_name,
--     role = excluded.role,
--     phone = excluded.phone;

insert into public.huddles (
  id,
  title,
  date_range,
  starts_on,
  ends_on,
  summary,
  status,
  target_team_id,
  published_at
)
values (
  '30000000-0000-0000-0000-000000000001',
  '2026 Key Dates',
  'January 5-September 7, 2026',
  '2026-01-05',
  '2026-09-07',
  'Key dates and upcoming events are kept current on the website under the Parents tab.',
  'published',
  '10000000-0000-0000-0000-000000000001',
  '2026-01-05 00:00:00+00'
)
on conflict (id) do update
set date_range = excluded.date_range,
    starts_on = excluded.starts_on,
    ends_on = excluded.ends_on,
    summary = excluded.summary,
    status = excluded.status,
    target_team_id = excluded.target_team_id,
    published_at = excluded.published_at;

insert into public.huddles (
  id,
  title,
  date_range,
  starts_on,
  ends_on,
  summary,
  status,
  target_team_id
)
values (
  '30000000-0000-0000-0000-000000000002',
  '2026 Key Dates',
  'June 1-September 7, 2026',
  '2026-06-01',
  '2026-09-07',
  'Spring Practices : June 1st - 18th - More Details Coming.',
  'draft',
  '10000000-0000-0000-0000-000000000001'
)
on conflict (id) do update
set date_range = excluded.date_range,
    starts_on = excluded.starts_on,
    ends_on = excluded.ends_on,
    summary = excluded.summary,
    status = excluded.status,
    target_team_id = excluded.target_team_id;

insert into public.huddle_sections (
  id,
  huddle_id,
  section_type,
  title,
  body,
  sort_order,
  metadata
)
values
  (
    '31000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    'urgent',
    'CWU Camp Registration Deadline',
    'June 3rd Registration Deadline',
    1,
    '{"badge":"June 3"}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000001',
    'actions',
    'Complete all 3 registration steps below',
    'Register Online with CWU. Pay Camp Fee to Woodinville High School. Submit Hard Copies of Forms.',
    2,
    '{}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000001',
    'calendar',
    '2026 Key Dates',
    'Key dates and upcoming events are kept current on the website under the Parents tab.',
    3,
    '{}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000004',
    '30000000-0000-0000-0000-000000000001',
    'highlights',
    '2019 4A Academic State Champions (Football)',
    '3-PEAT 4A STATE SEMI-FINALISTS',
    4,
    '{"highlights":["2019 4A Academic State Champions (Football)","3-PEAT 4A STATE SEMI-FINALISTS","3-PEAT KINGCO 4A CHAMPIONS"]}'::jsonb
  )
on conflict (id) do update
set huddle_id = excluded.huddle_id,
    section_type = excluded.section_type,
    title = excluded.title,
    body = excluded.body,
    sort_order = excluded.sort_order,
    metadata = excluded.metadata;

insert into public.action_items (
  id,
  huddle_id,
  title,
  description,
  importance,
  default_status,
  due_at,
  due_label,
  audience_label,
  target_team_id,
  external_url
)
values
  (
    '40000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    'FinalForms Registration',
    'In order to participate in the first day of summer conditioning/practice, tryouts or regular season practice, a FinalForms registration must be completed by both parent and student and a current sports physical must be on file with the WHS Athletic Office.',
    'required',
    'not_started',
    '2026-05-26 23:59:00-07',
    'Due May 26',
    'All players',
    '10000000-0000-0000-0000-000000000001',
    'https://woodinville.nsd.org/athletics/register-for-athletics'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000001',
    'CWU Camp Registration',
    'Complete all 3 registration steps below.',
    'required',
    'not_started',
    '2026-06-03 23:59:00-07',
    'Due June 3',
    'Camp attendees',
    '10000000-0000-0000-0000-000000000001',
    'https://www.woodinvillefootball.com/cwucamp'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000001',
    '2026 FGIC Membership',
    '$500/Family FGIC Membership dues help support the many resources that make the Woodinville High School Football program successful.',
    'family',
    'not_started',
    null,
    'Past due',
    'All families',
    '10000000-0000-0000-0000-000000000001',
    'https://www.woodinvillefootball.com/dues'
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    '30000000-0000-0000-0000-000000000001',
    '2026 Key Dates',
    'Key dates and upcoming events are kept current on the website under the Parents tab.',
    'info',
    'not_started',
    null,
    null,
    'All families',
    '10000000-0000-0000-0000-000000000001',
    'https://www.woodinvillefootball.com/keydates'
  )
on conflict (id) do update
set huddle_id = excluded.huddle_id,
    title = excluded.title,
    description = excluded.description,
    importance = excluded.importance,
    default_status = excluded.default_status,
    due_at = excluded.due_at,
    due_label = excluded.due_label,
    audience_label = excluded.audience_label,
    target_team_id = excluded.target_team_id,
    external_url = excluded.external_url;

insert into public.events (
  id,
  title,
  event_type,
  team_id,
  audience_label,
  starts_at,
  ends_at,
  display_date,
  display_time,
  location,
  arrival_time,
  bus_time,
  uniform_note,
  equipment_note,
  notes,
  external_url
)
values
  (
    '50000000-0000-0000-0000-000000000001',
    'CWU Camp Registration Deadline',
    'deadline',
    '10000000-0000-0000-0000-000000000001',
    'Camp attendees',
    '2026-06-03 23:59:00-07',
    null,
    'Jun 3',
    '11:59 PM',
    'Central Washington University',
    null,
    null,
    null,
    null,
    'Registration Deadline: June 3',
    'https://www.woodinvillefootball.com/cwucamp'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    'Spring Practices',
    'practice',
    '10000000-0000-0000-0000-000000000001',
    'All teams',
    '2026-06-01 15:00:00-07',
    '2026-06-18 18:00:00-07',
    'Jun 1',
    'June 1-18',
    null,
    null,
    null,
    null,
    null,
    'More Details Coming',
    'https://www.woodinvillefootball.com/keydates'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    'Travel trip to Hawaii',
    'travel',
    '10000000-0000-0000-0000-000000000001',
    'Seniors, Juniors & Sophomores',
    '2026-09-03 00:00:00-07',
    '2026-09-07 23:59:00-07',
    'Sep 3',
    'September 3-7',
    null,
    null,
    null,
    null,
    null,
    'Travel trip to Hawaii : September 3rd-7th - Seniors, Juniors & Sophomores',
    'https://www.woodinvillefootball.com/keydates'
  ),
  (
    '50000000-0000-0000-0000-000000000004',
    'CWU Camp',
    'camp',
    '10000000-0000-0000-0000-000000000001',
    'Camp attendees',
    '2026-06-20 08:00:00-07',
    '2026-06-23 17:00:00-07',
    'Jun 20',
    'June 20-23',
    'Central Washington University',
    null,
    null,
    null,
    null,
    'One of the most anticipated traditions of the summer and a highlight of the preseason for our players each year.',
    'https://www.woodinvillefootball.com/cwucamp'
  ),
  (
    '50000000-0000-0000-0000-000000000005',
    'Mini Camp',
    'practice',
    '10000000-0000-0000-0000-000000000001',
    'All program',
    '2026-07-21 00:00:00-07',
    '2026-07-23 23:59:00-07',
    'Jul 21',
    'July 21-23',
    'WHS Football Field',
    null,
    null,
    null,
    null,
    'Mini Camp : July 21st - 23rd @ WHS Football Field',
    'https://www.woodinvillefootball.com/keydates'
  ),
  (
    '50000000-0000-0000-0000-000000000006',
    'Start of WIAA Season',
    'other',
    '10000000-0000-0000-0000-000000000001',
    'All program',
    '2026-08-19 00:00:00-07',
    null,
    'Aug 19',
    null,
    null,
    null,
    null,
    null,
    null,
    'Start of WIAA Season : August 19th',
    'https://www.woodinvillefootball.com/keydates'
  )
on conflict (id) do update
set title = excluded.title,
    event_type = excluded.event_type,
    team_id = excluded.team_id,
    audience_label = excluded.audience_label,
    starts_at = excluded.starts_at,
    ends_at = excluded.ends_at,
    display_date = excluded.display_date,
    display_time = excluded.display_time,
    location = excluded.location,
    arrival_time = excluded.arrival_time,
    bus_time = excluded.bus_time,
    uniform_note = excluded.uniform_note,
    equipment_note = excluded.equipment_note,
    notes = excluded.notes,
    external_url = excluded.external_url;

insert into public.volunteer_slots (
  id,
  title,
  description,
  category,
  team_id,
  starts_at,
  ends_at,
  display_date,
  display_time,
  location,
  slots_needed,
  hour_credit
)
values
  (
    '60000000-0000-0000-0000-000000000001',
    'Director of Game Day Operations',
    'Open',
    'game_day',
    '10000000-0000-0000-0000-000000000001',
    null,
    null,
    'Open',
    null,
    null,
    1,
    0
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'Team Dinners',
    'Team Dinners happen the night before a Varsity game.',
    'meals',
    '10000000-0000-0000-0000-000000000001',
    null,
    null,
    'Night before a Varsity game',
    null,
    null,
    1,
    0
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    'Friday Night Lights',
    'A community scrimmage event (usually the Friday before school) where the Woodinville team plays, junior football pairs with high school buddies, cheer leads the crowd — a fun kickoff night for the season.',
    'events',
    '10000000-0000-0000-0000-000000000001',
    null,
    null,
    'Usually the Friday before school',
    null,
    null,
    1,
    0
  )
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    category = excluded.category,
    team_id = excluded.team_id,
    starts_at = excluded.starts_at,
    ends_at = excluded.ends_at,
    display_date = excluded.display_date,
    display_time = excluded.display_time,
    location = excluded.location,
    slots_needed = excluded.slots_needed,
    hour_credit = excluded.hour_credit;

insert into public.documents (
  id,
  title,
  description,
  category,
  external_url,
  target_team_id
)
values
  (
    '70000000-0000-0000-0000-000000000001',
    'FinalForms Registration',
    'Northshore School District athletics registration.',
    'registration',
    'https://woodinville.nsd.org/athletics/register-for-athletics',
    '10000000-0000-0000-0000-000000000001'
  ),
  (
    '70000000-0000-0000-0000-000000000002',
    'CWU Camp',
    'Camp registration and details page.',
    'camp',
    'https://www.woodinvillefootball.com/cwucamp',
    '10000000-0000-0000-0000-000000000001'
  ),
  (
    '70000000-0000-0000-0000-000000000003',
    'FGIC Membership',
    'Membership dues page.',
    'dues',
    'https://www.woodinvillefootball.com/dues',
    '10000000-0000-0000-0000-000000000001'
  )
on conflict (id) do update
set title = excluded.title,
    description = excluded.description,
    category = excluded.category,
    external_url = excluded.external_url,
    target_team_id = excluded.target_team_id;
