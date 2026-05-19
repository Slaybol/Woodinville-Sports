# Backend Design

Draft backend design for the Gridiron Connect rebuild.

## Files

- [Rebuild schema draft](../supabase/rebuild_schema.sql)
- [Rebuild seed data](../supabase/rebuild_seed.sql)

These files are drafts. They are intentionally separate from the existing prototype SQL files.

## Design Intent

The backend should support a private operations app, not a public website clone.

The core model is:

- Families receive Weekly Huddles.
- Huddles contain structured sections.
- Sections can reference action items, calendar events, volunteer needs, and highlights.
- Families have personalized action status.
- Admins publish and maintain the operational data.

## Main Tables

### Profiles

`profiles` extends Supabase `auth.users`.

Roles:

- `parent`
- `player`
- `coach`
- `team_parent`
- `fgic_admin`

### Families

Families are the parent-facing unit of personalization.

Related tables:

- `families`
- `family_members`
- `players`

A family can have multiple guardians and multiple players.

### Teams

Teams represent Varsity, JV, C-Team, and all-program targeting.

Related tables:

- `teams`
- `team_members`

### Huddles

Weekly Huddles are publishable content containers.

Related tables:

- `huddles`
- `huddle_sections`

Huddle sections are intentionally flexible with `section_type` and `metadata` so the editor can evolve without schema churn.

### Action Items

Action items represent things families need to do.

Related tables:

- `action_items`
- `family_action_status`

Examples:

- FinalForms Registration
- CWU Camp Registration
- FGIC Membership
- Review coach calendar

### Events

Events power the Calendar and Event Detail screens.

Important fields:

- `event_type`
- `starts_at`
- `display_date`
- `display_time`
- `location`
- `arrival_time`
- `bus_time`
- `uniform_note`
- `equipment_note`
- `notes`

The `display_*` fields exist because some program dates are announced before exact timestamps are known.

### Volunteering

Volunteer work is tracked through:

- `volunteer_slots`
- `volunteer_signups`

Slots support hour credit, category, coordinator, event linkage, and family signups.

### Notifications

Initial notification support:

- `notification_preferences`
- `in_app_notifications`

Push notifications can be added later once the mobile app is rebuilt.

## RLS Direction

The schema draft enables RLS and includes baseline policies.

Principles:

- Parents can see their own family data.
- Admin roles can manage program data.
- Published huddles are visible to authenticated users.
- Draft huddles are admin-only.
- Family action status and volunteer signups are scoped to the family.

Admin roles:

- `coach`
- `team_parent`
- `fgic_admin`

The RLS policies are a starting point and should be reviewed carefully before production data is added.

## Known Review Items

Before applying this schema to a real Supabase project:

- Confirm whether `player` should be a profile role for MVP or just a `players` record.
- Confirm whether team targeting should support multiple teams per huddle/action/event.
- Confirm whether action items should support grade-level targeting.
- Confirm whether volunteer signups should allow multiple slots per family for the same opportunity.
- Confirm whether families can self-update action status or only admins can mark official completion.
- Confirm whether dues/payment status will be manually tracked or integrated later.
- Confirm notification delivery model.

## Suggested Next Backend Steps

1. Review schema and seed files.
2. Decide whether to apply this as a fresh schema or migrate the old prototype schema.
3. Add generated TypeScript database types.
4. Add shared domain types in `packages/shared`.
5. Wire Huddle Home to `huddles`, `huddle_sections`, `action_items`, `events`, and `volunteer_slots`.
6. Wire Action Center to `action_items` and `family_action_status`.
7. Wire Calendar to `events`.
8. Wire Volunteer to `volunteer_slots` and `volunteer_signups`.
9. Wire Huddle Editor to save drafts and publish huddles.
