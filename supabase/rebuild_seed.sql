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
  'Weekly Huddle',
  'May 17-24, 2026',
  '2026-05-17',
  '2026-05-24',
  'This week''s playbook for registration, camp, dues, calendar updates, and program highlights.',
  'published',
  '10000000-0000-0000-0000-000000000001',
  '2026-05-17 17:12:00+00'
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
  'Weekly Huddle',
  'May 24-31, 2026',
  '2026-05-24',
  '2026-05-31',
  'We are a couple weeks away from Spring Football. Please complete the required checklist items before the listed deadlines.',
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
    'Urgent: FinalForms Registration',
    'Athletes must complete online forms before gear checkout, Spring Football, and CWU Camp.',
    1,
    '{"badge":"Due May 26"}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000001',
    'actions',
    'This Week''s Playbook',
    'Required family action items and deadlines.',
    2,
    '{}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000001',
    'calendar',
    'Coach Calendar',
    'Refer to the digital version regularly rather than printing it as a final schedule.',
    3,
    '{"password":"Falcons2026"}'::jsonb
  ),
  (
    '31000000-0000-0000-0000-000000000004',
    '30000000-0000-0000-0000-000000000001',
    'highlights',
    'Program Highlights',
    'Gervais training turnout has been strong this offseason. Congratulations to Woodinville Baseball and Jonah Leavengood.',
    4,
    '{}'::jsonb
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
    'Complete Northshore School District athletics forms and select both Summer Football and Fall Football.',
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
    'Follow the three-step registration process on the Woodinville Football CWU Camp page.',
    'required',
    'in_progress',
    '2026-06-03 23:59:00-07',
    'Due June 3',
    'Camp attendees',
    '10000000-0000-0000-0000-000000000001',
    'https://www.woodinvillefootball.com/cwucamp'
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000001',
    'FGIC Membership',
    'Membership dues help fund the player experience on and off the field.',
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
    'Review coach calendar',
    'Review the digital coach calendar regularly. Avoid printing it as a final schedule.',
    'optional',
    'not_started',
    null,
    'This week',
    'All families',
    '10000000-0000-0000-0000-000000000001',
    'https://www.woodinvillefootball.com/calendar'
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
    'Spring eligibility deadline',
    'deadline',
    '10000000-0000-0000-0000-000000000001',
    'All program',
    '2026-05-26 23:59:00-07',
    null,
    'May 26',
    '11:59 PM',
    'FinalForms',
    null,
    null,
    null,
    null,
    'Athletes must complete FinalForms before gear checkout and Spring Football.',
    'https://woodinville.nsd.org/athletics/register-for-athletics'
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    'Spring Football begins',
    'practice',
    '10000000-0000-0000-0000-000000000001',
    'All teams',
    '2026-06-01 15:00:00-07',
    null,
    'Jun 1',
    'After school',
    'Woodinville High School',
    null,
    null,
    null,
    'Practice gear',
    'Times will follow the coach calendar. Check the digital calendar for updates.',
    'https://www.woodinvillefootball.com/calendar'
  ),
  (
    '50000000-0000-0000-0000-000000000003',
    'CWU Camp registration deadline',
    'deadline',
    '10000000-0000-0000-0000-000000000001',
    'Camp attendees',
    '2026-06-03 23:59:00-07',
    null,
    'Jun 3',
    '11:59 PM',
    'WoodinvilleFootball.com',
    null,
    null,
    null,
    null,
    'Complete all three CWU Camp registration steps by the deadline.',
    'https://www.woodinvillefootball.com/cwucamp'
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
    'Travel details to be confirmed',
    null,
    'Camp gear checklist coming soon',
    null,
    'Camp dates are June 20-23, 2026. Watch the Weekly Huddle for travel and packing updates.',
    'https://www.woodinvillefootball.com/cwucamp'
  ),
  (
    '50000000-0000-0000-0000-000000000005',
    'Suggested summer travel window begins',
    'travel',
    '10000000-0000-0000-0000-000000000001',
    'All program',
    '2026-07-27 00:00:00-07',
    '2026-08-07 23:59:00-07',
    'Jul 27',
    'Jul 27-Aug 7',
    'Optional family travel window',
    null,
    null,
    null,
    null,
    'Weights, speed, and agility sessions continue for athletes who are not traveling.',
    null
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
    'Concessions planning',
    'Help prepare concession coverage for early season home events.',
    'game_day',
    '10000000-0000-0000-0000-000000000001',
    null,
    null,
    'June planning',
    'Flexible',
    'Remote / stadium',
    4,
    2
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'Team meal support',
    'Assist the team parent group with setup and cleanup.',
    'meals',
    '10000000-0000-0000-0000-000000000001',
    null,
    null,
    'Spring football',
    'TBD',
    'WHS cafeteria',
    2,
    1.5
  ),
  (
    '60000000-0000-0000-0000-000000000003',
    'CWU Camp packing check',
    'Support final gear organization before camp travel.',
    'camp',
    '10000000-0000-0000-0000-000000000001',
    '2026-06-18 18:00:00-07',
    null,
    'June 18',
    '6:00 PM',
    'Equipment room',
    3,
    1
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
