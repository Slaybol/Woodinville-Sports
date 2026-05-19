# Work Items

Implementation backlog for rebuilding Gridiron Connect around the Weekly Huddle command center.

GitHub issue creation files:

- [GitHub issue definitions](github-issues.json)
- [GitHub issue creation script](../scripts/create-github-issues.ps1)

Phase 0 audit:

- [Code Audit](code-audit.md)

Backend design:

- [Backend Design](backend-design.md)
- [Rebuild schema draft](../supabase/rebuild_schema.sql)
- [Rebuild seed data](../supabase/rebuild_seed.sql)

## Guiding Priorities

Build the app in the order families experience value:

1. Families can sign in and see the current Weekly Huddle.
2. Families can see what they need to do next.
3. Families can trust the calendar and event logistics.
4. Families can claim volunteer work.
5. Admins can publish and maintain the information without developer help.

Parent-to-parent messaging is intentionally out of scope for MVP. The app should prioritize official communication, action items, schedules, and volunteering before social/chat features.

## Phase 0: Project Reset

### 0.1 Audit Existing Code

Goal: decide what to keep, remove, or rewrite.

Tasks:

- Review existing web routes
- Review existing mobile routes
- Review shared package
- Review Supabase schema files
- Identify mock-data-only screens
- Identify reusable UI primitives
- Identify auth code that can be kept

Acceptance criteria:

- Short keep/remove/rewrite list exists
- No code is deleted until replacement direction is clear

### 0.2 Define MVP Scope

Goal: lock the first build target.

Tasks:

- Confirm MVP screen list
- Confirm non-MVP features
- Confirm roles and permissions
- Confirm whether mobile admin quick tools are included in MVP

Acceptance criteria:

- MVP scope is documented
- Deferred features are documented

## Phase 1: Data Model and Backend

### 1.1 Design New Supabase Schema

Goal: create a schema centered on huddles, action items, families, events, and volunteering.

Tables:

- `profiles`
- `families`
- `family_members`
- `players`
- `teams`
- `team_members`
- `huddles`
- `huddle_sections`
- `action_items`
- `family_action_status`
- `events`
- `volunteer_slots`
- `volunteer_signups`
- `documents`
- `notifications`

Acceptance criteria:

- SQL migration exists
- Tables have clear ownership and relationships
- Important enums/check constraints are defined
- Created/updated timestamps are consistent

### 1.2 Row Level Security

Goal: enforce permissions at the database layer.

Tasks:

- Define parent/family read access
- Define coach/team parent permissions
- Define FGIC admin permissions
- Lock down admin-only tables and writes
- Add policies for huddles, actions, events, volunteer slots, and family records

Acceptance criteria:

- Parents can only see relevant family/team data
- Admin roles can manage appropriate program data
- No admin-only permission depends only on client-side checks

### 1.3 Seed Data

Goal: make local development and demos realistic.

Seed examples:

- Varsity, JV, C-Team
- A current Weekly Huddle
- FinalForms action item
- CWU Camp action item
- FGIC membership action item
- A week of events
- Volunteer opportunities
- Sample family and player records

Acceptance criteria:

- New developer can seed a useful demo state
- Demo data matches the product language in the design docs

### 1.4 Shared Types

Goal: keep web, mobile, and backend contracts aligned.

Tasks:

- Generate or define database types
- Add domain types for huddles, actions, events, volunteer slots, profiles
- Add status enums
- Add lightweight validation helpers if needed

Acceptance criteria:

- Shared package exports useful typed models
- Web app imports shared types where appropriate

## Phase 2: App Shell and Design System

### 2.1 Tailwind Theme Tokens

Goal: translate design tokens into usable code.

Tasks:

- Add color tokens
- Add typography scale
- Add spacing/radius defaults
- Define semantic utility classes if useful

Acceptance criteria:

- UI uses the documented token palette
- No old one-off theme colors dominate the app

### 2.2 Core Components

Goal: create the small component set needed for MVP screens.

Components:

- App header
- Mobile bottom nav
- Button variants
- Input/select/textarea
- Card
- Badge
- Status pill
- List row
- Empty state
- Loading state
- Error state
- Page section

Acceptance criteria:

- Components match the design-system sizing
- Components are reusable across parent and admin screens
- No nested card pattern is introduced

### 2.3 Layout Shells

Goal: support parent and admin navigation cleanly.

Tasks:

- Parent shell
- Admin shell
- Auth shell
- Responsive desktop content width
- Mobile bottom navigation

Acceptance criteria:

- Parent screens share consistent navigation
- Admin screens share consistent navigation
- Mobile layouts have stable tap targets

## Phase 3: Auth and Onboarding

### 3.1 Sign In / Invite Screen

Goal: let users sign in or accept an invitation.

Tasks:

- Email/password sign in
- Invitation code path
- Forgot password entry point
- Basic error states
- Loading states

Acceptance criteria:

- Existing users can sign in
- Invited users can begin account setup
- Errors are understandable

### 3.2 Family Setup

Goal: connect an account to a family/player/team context.

Tasks:

- Create or join family
- Link player records
- Assign team
- Capture contact info
- Set notification preferences

Acceptance criteria:

- Parent account has a usable family context
- User lands on Huddle Home after setup

## Phase 4: Parent MVP Screens

### 4.1 Huddle Home

Goal: show the current week and the most important family information.

Tasks:

- Current huddle header
- Urgent alert section
- Due-soon action summary
- This week schedule preview
- Volunteer needs preview
- Highlights section
- Empty state when no huddle is published

Acceptance criteria:

- Parent can understand this week's priorities in under 30 seconds
- Urgent and due-soon items appear before normal content

### 4.2 Action Center

Goal: show required, optional, and completed family tasks.

Tasks:

- Completion summary
- Status filters
- Action rows
- Due date badges
- External link handling
- Mark complete where allowed

Acceptance criteria:

- Parent can identify incomplete required items
- Deadlines are shown as absolute dates
- External resources are clearly labeled

### 4.3 Calendar

Goal: show a trusted agenda of events and deadlines.

Tasks:

- Week agenda view
- Team filter
- Event type filter
- Date dividers
- Event rows
- Last-updated indicator

Acceptance criteria:

- Parent can find upcoming practices, games, camps, meetings, and deadlines
- Events link to detail pages

### 4.4 Event Detail

Goal: answer event logistics without digging through email.

Tasks:

- Event header
- Date/time
- Arrival or bus time
- Location/address
- Uniform/equipment notes
- Team audience
- Related links
- Last-updated timestamp

Acceptance criteria:

- Parent can answer where, when, what to bring, and who it applies to

### 4.5 Volunteer

Goal: show open volunteer work and family progress.

Tasks:

- Hour progress
- Open slots
- Claimed shifts
- Slot detail
- Sign up
- Cancel signup if allowed

Acceptance criteria:

- Parent can claim an open volunteer slot
- Family hour progress updates or is clearly represented

### 4.6 Family Profile

Goal: manage family, players, contacts, and preferences.

Tasks:

- Parent/guardian contact info
- Linked players
- Team assignments
- Emergency contacts
- Notification preferences
- Checklist summary

Acceptance criteria:

- Parent can confirm their family/player context
- Notification preferences can be reviewed or edited

## Phase 5: Admin MVP Screens

### 5.1 Admin Dashboard

Goal: show what needs admin attention.

Tasks:

- Current huddle status
- Action completion summary
- Volunteer gaps
- Upcoming event issues
- Families missing setup
- Quick create buttons

Acceptance criteria:

- Admin can see operational exceptions first
- Admin can navigate to the right management screen quickly

### 5.2 Huddle Editor

Goal: create and publish structured Weekly Huddles.

Tasks:

- Date range
- Summary
- Urgent items
- Action item links
- Calendar highlights
- Volunteer asks
- Program highlights
- Audience targeting
- Save draft
- Publish huddle
- Preview panel on desktop

Acceptance criteria:

- Admin can draft and publish a current Weekly Huddle
- Parent Huddle Home updates from published content

### 5.3 Action Item Manager

Goal: create and manage family checklist items.

Tasks:

- Create action item
- Set due date
- Set audience
- Attach external link
- Track status summary
- Mark complete/waived for families if permitted

Acceptance criteria:

- Admin can create an action item that appears in parent Action Center

### 5.4 Calendar/Event Manager

Goal: maintain trusted schedule information.

Tasks:

- Create event
- Edit event
- Set team/audience
- Set event type
- Add arrival/bus/uniform notes
- Mark cancellation or update

Acceptance criteria:

- Admin-created events appear in Calendar and Event Detail

### 5.5 Volunteer Manager

Goal: manage volunteer slots and gaps.

Tasks:

- Create slot
- Set date/time/location
- Set slots needed
- Set hour credit
- View signups
- Identify unfilled needs

Acceptance criteria:

- Admin-created volunteer slots appear in parent Volunteer screen

## Phase 6: Mobile Admin Quick Tools

These are useful but can be included after the parent MVP and desktop admin basics.

### 6.1 Mobile Admin Home

Goal: show quick admin work queues on a phone.

Tasks:

- Current huddle status
- Volunteer gaps
- Families missing setup
- Upcoming events
- Quick alert button

Acceptance criteria:

- Admin can triage the program from mobile

### 6.2 Quick Alert

Goal: send urgent targeted messages from a phone.

Tasks:

- Message composer
- Audience selector
- Urgency toggle
- Send confirmation

Acceptance criteria:

- Admin can send an urgent update without desktop access

### 6.3 Quick Event Update

Goal: update logistics from the field.

Tasks:

- Select event
- Edit arrival/bus time
- Edit location
- Edit uniform/equipment notes
- Save update

Acceptance criteria:

- Admin can update event logistics quickly from mobile

### 6.4 Huddle Review

Goal: preview and publish a draft from mobile.

Tasks:

- Show current draft
- Show target audience
- Publish button
- Basic validation warnings

Acceptance criteria:

- Admin can review and publish, but heavy editing remains desktop-first

## Phase 7: Notifications

### 7.1 Notification Preferences

Goal: let families control notification categories.

Categories:

- Urgent alerts
- Weekly Huddle published
- Action item due soon
- Event updates
- Volunteer reminders

Acceptance criteria:

- Preferences are saved per profile or family member

### 7.2 Notification Delivery

Goal: notify families when important changes happen.

Channels:

- In-app notifications
- Email later if needed
- Push notifications for mobile later

Acceptance criteria:

- Publishing a huddle can create in-app notifications
- Urgent alerts can be surfaced prominently

## Phase 8: Quality and Release Readiness

### 8.1 Accessibility

Tasks:

- Keyboard navigation
- Focus states
- Color contrast
- Form labels
- Screen reader labels for icons

Acceptance criteria:

- Core flows are usable without a mouse
- Color is not the only indicator of status

### 8.2 Responsive QA

Tasks:

- Test mobile widths
- Test tablet widths
- Test desktop widths
- Check text wrapping
- Check bottom nav
- Check admin tables/lists

Acceptance criteria:

- No important text overlaps or escapes containers
- Core actions remain reachable on mobile

### 8.3 Security Review

Tasks:

- Verify RLS policies
- Verify admin route protection
- Verify client-side role checks mirror database rules
- Review invitation flow

Acceptance criteria:

- Parent cannot access another family's private data
- Non-admin cannot create or publish admin content

### 8.4 Demo Release

Tasks:

- Seed demo data
- Run type checks
- Run lint/build
- Document setup
- Create walkthrough script

Acceptance criteria:

- App can be demoed end to end with realistic Woodinville Football data

## Deferred Features

These should not block MVP:

- Parent-to-parent messaging
- Full family directory
- Payment processing
- Sponsor management
- Full travel management
- Rich email campaign builder
- Native push notifications if web MVP comes first
- Advanced analytics
- Roster stats or player performance tracking

## Suggested First Sprint

1. Audit existing code and decide keep/remove/rewrite.
2. Draft new Supabase schema for huddles, actions, events, families, and volunteers.
3. Implement Tailwind design tokens.
4. Build app shells and core components.
5. Replace the current home page with a static Huddle Home using realistic data.
6. Build static Action Center and Calendar screens.

The first sprint should produce a believable clickable prototype before deeper backend integration.
