# Code Audit

Phase 0 audit for the Gridiron Connect rebuild.

## Summary

The current repository is a useful prototype, but the product direction has changed. The app should be rebuilt around the Weekly Huddle, family action items, trusted calendar logistics, volunteering, and admin publishing.

The existing code should be treated as scaffolding and reference material. Keep the monorepo, basic app structure, Supabase client setup, and small UI primitives. Rewrite the product screens and revise the database model.

## Keep

### Repository Structure

- `apps/web`
- `apps/mobile`
- `packages/shared`
- `supabase`

The monorepo structure is a good fit for a web app, mobile app, shared types, and Supabase backend work.

### Web Foundation

- `apps/web/src/app/layout.tsx`
- `apps/web/src/lib/supabase/client.ts`
- `apps/web/src/lib/supabase/server.ts`
- `apps/web/src/lib/utils.ts`
- `apps/web/src/components/ui/button.tsx`
- `apps/web/src/components/ui/badge.tsx`
- `apps/web/src/components/ui/card.tsx`

These are reasonable starting points. They should be adjusted to match the new design system, but they do not need to be thrown away.

### Auth Context

- `apps/web/src/contexts/auth-context.tsx`

This can be kept as a starting point, but it needs review after the new family/player/team model is designed.

Useful parts:

- Session initialization
- Supabase auth state listener
- Profile fetch pattern
- Sign-out helper

Needs revision:

- Profile type should match the new shared types
- Team membership fetch should match the new schema
- Error handling can be cleaned up

### Shared Package

- `packages/shared/src/index.ts`
- `packages/shared/src/types/index.ts`

The shared package should remain, but the types should be replaced or expanded around huddles, families, action items, volunteer slots, and notification preferences.

## Rewrite

### Web Product Screens

Rewrite these around the new MVP design:

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/schedule/page.tsx`
- `apps/web/src/app/volunteers/page.tsx`
- `apps/web/src/app/admin/page.tsx`
- `apps/web/src/app/announcements/page.tsx`
- `apps/web/src/app/documents/page.tsx`
- `apps/web/src/app/emergency/page.tsx`

Reason:

- They are mostly mock-data screens.
- They reflect the old generic dashboard model.
- They do not center the Weekly Huddle or family action center.
- They use inconsistent page-level headers and navigation.

Recommended replacements:

- Huddle Home
- Action Center
- Calendar
- Event Detail
- Volunteer
- Family Profile
- Admin Dashboard
- Huddle Editor
- Action Item Manager
- Calendar/Event Manager
- Volunteer Manager

### Auth Screens

Revise these after the new onboarding model is defined:

- `apps/web/src/app/auth/page.tsx`
- `apps/web/src/app/auth/forgot-password/page.tsx`
- `apps/web/src/app/auth/reset-password/page.tsx`

Keep the basic idea, but rebuild the UI and invitation flow around family setup.

### Mobile App

Rewrite the Expo screens:

- `apps/mobile/app/(tabs)/home.tsx`
- `apps/mobile/app/(tabs)/schedule.tsx`
- `apps/mobile/app/(tabs)/announcements.tsx`
- `apps/mobile/app/(tabs)/volunteers.tsx`
- `apps/mobile/app/(tabs)/more.tsx`

Reason:

- Current mobile app is placeholder-level.
- Navigation should become Huddle, Actions, Calendar, Volunteer, More.
- Admin mobile quick tools should be added later as a focused workflow.

## Remove Later

Do not remove these immediately, but plan to delete or replace them once new screens exist:

- Old mock announcement arrays
- Old mock schedule arrays
- Old mock volunteer arrays
- Old documents and emergency screens if replaced by More/profile flows
- Old gradient helper classes
- Old generic sports-dashboard copy
- Temporary debug UI in admin forms

## Security Issues To Fix

### Admin Access

`apps/web/src/app/admin/page.tsx` currently forces admin access:

```ts
const hasAdminAccess = true
```

This must be removed before any real use. Admin access should be enforced by:

- Supabase Row Level Security
- Server-side route/data checks where possible
- Client-side role gating only as a UI convenience

### Data Access

The current prototype relies heavily on client-side Supabase calls. That is fine for some parent-facing data, but admin operations and private family data need clear RLS policies before real data is added.

## Database Assessment

Existing SQL is useful reference material:

- `supabase/schema.sql`
- `supabase/invitation_system.sql`
- `supabase/announcements_reactions_comments.sql`
- RLS fix scripts
- Team seed scripts

The schema should be revised, not patched endlessly.

Keep these concepts:

- Profiles
- Teams
- Team members
- Events
- Volunteer slots/signups
- Documents
- Invitations

Add or redesign around:

- Families
- Family members
- Players linked to families
- Huddles
- Huddle sections
- Action items
- Family action status
- Notification preferences

## Design System Status

Existing Tailwind/CSS already uses CSS variables and shadcn-style components. That is good.

Needed changes:

- Replace old HSL color variables with the documented Falcon/ink/gold/red/blue token system
- Remove gradient-based `falcons-header` styling
- Make cards flatter and more operational
- Adjust card title sizing down for dashboard surfaces
- Keep button/input/card radii at 6-8px
- Add layout/nav/list-row primitives

## Recommended First Implementation Steps

1. Implement documented Tailwind/CSS design tokens.
2. Add shared shell components for parent/admin/auth layouts.
3. Replace the current home page with a static Huddle Home prototype using realistic Weekly Huddle data.
4. Add static Action Center and Calendar screens.
5. Design the revised Supabase schema before wiring live data.

## Decision

Do not delete the existing app yet.

Use the current codebase as a scaffold while replacing screens one by one. Once the new Huddle Home, Action Center, Calendar, and Admin Dashboard are in place, remove old unused routes and mock-data files.
