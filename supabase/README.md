# Supabase Workflow

This repo now has local Supabase CLI scaffolding and a first rebuild migration:

- `supabase/migrations/20260521060000_rebuild_schema.sql`
- seed files configured in `supabase/config.toml`

## Local Commands

From the repo root:

```bash
npm run db:start
npm run db:reset
```

Useful local URLs after `db:start`:

- API: `http://127.0.0.1:54321`
- Studio: `http://127.0.0.1:54323`
- Inbucket: `http://127.0.0.1:54324`

## What `db:reset` applies

1. `supabase/migrations/20260521060000_rebuild_schema.sql`
2. `supabase/rebuild_seed.sql`
3. `supabase/rebuild_action_center_seed.sql`
4. `supabase/rebuild_volunteer_seed.sql`

## Admin bootstrap

After creating a local user in Supabase Auth, run:

- `supabase/promote_user_to_admin.sql`

That script upserts the matching `public.profiles` row and sets the role to `fgic_admin`.

## Notes

- New auth signups now auto-create `public.profiles` and default `notification_preferences`.
- The older prototype SQL files are still present for reference, but the rebuild migration is the current path forward.
