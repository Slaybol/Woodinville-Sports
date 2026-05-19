-- Public preview policy patch for Gridiron Connect rebuild
--
-- Use this if you want the unauthenticated preview routes to read published
-- content from Supabase instead of falling back to demo data.
--
-- Safe scope:
-- - published huddles
-- - sections belonging to published huddles
-- - action items attached to published huddles
-- - events
-- - volunteer slots
--
-- Family-private tables remain protected.

create policy "published huddles visible to anon preview"
on public.huddles for select
using (status = 'published');

create policy "published huddle sections visible to anon preview"
on public.huddle_sections for select
using (
  exists (
    select 1
    from public.huddles h
    where h.id = huddle_sections.huddle_id
      and h.status = 'published'
  )
);

create policy "published action items visible to anon preview"
on public.action_items for select
using (
  exists (
    select 1
    from public.huddles h
    where h.id = action_items.huddle_id
      and h.status = 'published'
  )
);

create policy "events visible to anon preview"
on public.events for select
using (true);

create policy "volunteer slots visible to anon preview"
on public.volunteer_slots for select
using (true);
