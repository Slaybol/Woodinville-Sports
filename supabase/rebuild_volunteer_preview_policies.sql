-- Public preview policy patch for Volunteer family demo data
--
-- This is intentionally narrow and meant only for local/dev preview routes.
-- It allows the unauthenticated preview route to read confirmed signups for
-- the seeded demo family.

drop policy if exists "demo preview volunteer signups visible to anon" on public.volunteer_signups;
create policy "demo preview volunteer signups visible to anon"
on public.volunteer_signups for select
using (
  family_id = '80000000-0000-0000-0000-000000000001'
  and status = 'confirmed'
);
