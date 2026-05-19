-- Public preview policy patch for Action Center family demo data
--
-- This is intentionally narrow and meant only for local/dev preview routes.
-- It allows the unauthenticated preview route to read:
-- - the seeded demo family row
-- - action status rows for that demo family

drop policy if exists "demo preview family visible to anon" on public.families;
create policy "demo preview family visible to anon"
on public.families for select
using (id = '80000000-0000-0000-0000-000000000001');

drop policy if exists "demo preview family action status visible to anon" on public.family_action_status;
create policy "demo preview family action status visible to anon"
on public.family_action_status for select
using (family_id = '80000000-0000-0000-0000-000000000001');
