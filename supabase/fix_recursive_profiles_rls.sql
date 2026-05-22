-- Fix recursive RLS on public.profiles
--
-- Symptom:
-- - signed-in pages fall back to demo data with "stack depth limit exceeded"
--
-- Cause:
-- - the profiles SELECT policy path can recurse through current_profile_role()
--   and is_program_admin() when evaluating access on public.profiles itself.
--
-- Safe fix:
-- - keep self-read/self-update behavior on profiles
-- - remove the recursive ALL policy for SELECT
-- - add non-SELECT admin policies separately

drop policy if exists "profiles can read self" on public.profiles;
drop policy if exists "profiles can update self" on public.profiles;
drop policy if exists "admins can manage profiles" on public.profiles;
drop policy if exists "profiles can insert self" on public.profiles;
drop policy if exists "admins can insert profiles" on public.profiles;
drop policy if exists "admins can update profiles" on public.profiles;
drop policy if exists "admins can delete profiles" on public.profiles;

create policy "profiles can read self"
on public.profiles for select
using (id = auth.uid());

create policy "profiles can insert self"
on public.profiles for insert
with check (id = auth.uid());

create policy "profiles can update self"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "admins can insert profiles"
on public.profiles for insert
with check (public.is_program_admin());

create policy "admins can update profiles"
on public.profiles for update
using (public.is_program_admin())
with check (public.is_program_admin());

create policy "admins can delete profiles"
on public.profiles for delete
using (public.is_program_admin());
