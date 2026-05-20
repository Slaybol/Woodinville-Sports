-- Promote a signed-in user to Gridiron admin
--
-- Replace the email below with the account you use to sign in locally.
-- Run this in Supabase SQL Editor.

insert into public.profiles (
  id,
  email,
  full_name,
  role
)
select
  au.id,
  au.email,
  coalesce(
    nullif(au.raw_user_meta_data ->> 'full_name', ''),
    split_part(au.email, '@', 1)
  ) as full_name,
  'fgic_admin'::public.profile_role
from auth.users au
where au.email = 'tobysabol@gmail.com'
on conflict (id) do update
set
  email = excluded.email,
  full_name = excluded.full_name,
  role = 'fgic_admin'::public.profile_role;
