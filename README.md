# Gridiron Connect

Private Weekly Huddle command center for Woodinville High School Falcons Football families, coaches, and Falcon Gridiron Club admins.

## Product Direction

The public Woodinville Football website is the program's front door: registration, schedules, sponsors, legacy pages, key dates, travel information, camp pages, and public Falcon Gridiron Club information.

Gridiron Connect should be the private operations layer behind that public site.

The goal is simple:

> Help every football family know what matters this week, what they need to do next, and where to find the trusted details.

This app should not duplicate the public website. It should turn the weekly communication rhythm of the program into a structured, personalized, mobile-friendly experience.

## Core Concept

Woodinville Football already sends a weekly email called the Weekly Huddle. That email is the clearest model for the product.

Gridiron Connect should become a living Weekly Huddle:

- Urgent action items
- Registration deadlines
- Camp and travel reminders
- FGIC membership and dues status
- Key dates
- Coach calendar updates
- Volunteer needs
- Team-specific alerts
- Program highlights and shout-outs

Instead of families hunting through email, website pages, PDFs, and group messages, the app should answer:

- What do I need to know this week?
- What does my player need to do?
- What deadlines are coming up?
- What have I not completed yet?
- Where do I go, when do I show up, and what should I bring?
- Who needs help from me?

## Primary Users

### Parents and Families

Parents need a clear view of the week, upcoming deadlines, player/team logistics, volunteer needs, and action items.

Expected jobs:

- View the current Weekly Huddle
- See due-soon tasks
- Track registration, dues, camp, and travel checklist items
- View upcoming practices, games, camps, meetings, and socials
- Claim volunteer opportunities
- Find emergency and program contacts
- Get urgent alerts

### Coaches

Coaches need a focused way to communicate schedule changes, reminders, team-specific instructions, and urgent updates.

Expected jobs:

- Publish announcements
- Send urgent alerts
- Update team schedules
- Share uniform, arrival, bus, and location details
- Target messages by team or group

### Team Parents and FGIC Admins

Team parents and Falcon Gridiron Club admins need operational tools for family coordination.

Expected jobs:

- Build and publish Weekly Huddles
- Manage action items and deadlines
- Track family completion status
- Manage volunteer roles and hours
- Coordinate events, meals, travel, and fundraisers
- Manage invitations and family accounts

## Key Product Areas

### 1. Weekly Huddle

The main home screen and communication object.

Each Weekly Huddle should support:

- Date range
- Intro or summary
- Urgent items
- Action items
- Key dates
- Linked resources
- Highlights
- Team-specific sections
- Publish status

### 2. Action Center

A personalized checklist of what a family needs to complete.

Examples:

- Complete FinalForms registration
- Pay FGIC membership dues
- Register for CWU Camp
- Review Hawaii travel information
- Submit waiver
- Sign up for volunteer hours
- Confirm player information

Each action item should support:

- Status: not started, in progress, complete, waived, not applicable
- Due date
- Audience: all families, team-specific, grade-specific, player-specific
- Link to public website or external form
- Admin notes

### 3. Calendar and Schedule

A trusted operational calendar, not just a list of events.

Events should support:

- Team: Varsity, JV, C-Team, all program
- Type: practice, game, meeting, camp, travel, fundraiser, social, deadline
- Start and end time
- Location and address
- Bus or arrival time
- Uniform or equipment notes
- Visibility and audience
- Last updated timestamp

### 4. Volunteering

The website explains that families are asked to consider at least 10 volunteer hours per season. The app should make that practical.

Volunteer tools should support:

- Open volunteer roles
- Date, time, and location
- Slots needed and filled
- Family signups
- Hours credited
- Coordinator notes
- Waitlist or interest-only roles

### 5. Family and Player Profiles

Families are the center of the private app.

Profiles should support:

- Parent and guardian accounts
- Player accounts or records
- Player-team assignment
- Multiple parents per player
- Multiple players per family
- Role-based permissions
- Registration and checklist status

### 6. Admin Publishing

Admins should be able to create structured communication once and publish it across the app.

Admin tools should support:

- Draft Weekly Huddle
- Create action items
- Attach links and documents
- Target teams or groups
- Publish now or schedule
- Send push/email notification later
- View completion and read status

## Initial App Navigation

Recommended parent-facing navigation:

- Huddle
- Actions
- Calendar
- Volunteer
- More

Recommended admin navigation:

- Huddles
- Actions
- Calendar
- Families
- Volunteers
- Settings

See [MVP Design System](docs/mvp-design-system.md) for the first 9-screen app design, visual language, design tokens, and component sizing.

See [Work Items](docs/work-items.md) for the phased implementation backlog.

See [Code Audit](docs/code-audit.md) for the initial keep/rewrite/remove decisions.

See [Backend Design](docs/backend-design.md) for the rebuild schema and seed-data notes.

## Technical Direction

This repository can remain a TypeScript monorepo.

Recommended stack:

- Web: Next.js, React, Tailwind CSS
- Mobile: Expo, React Native, expo-router
- Backend: Supabase Auth, Postgres, Storage, Realtime
- Shared package: TypeScript types and validation schemas

Supabase should be the source of truth for:

- Profiles
- Families
- Players
- Teams
- Team memberships
- Weekly huddles
- Action items
- Calendar events
- Volunteer slots
- Volunteer signups
- Documents
- Notifications

## Proposed Data Model

Core tables to design or revise:

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

The existing schema has useful starting points, but it should be revised around the Weekly Huddle and action-center model.

## Rebuild Plan

### Phase 1: Product Foundation

- Rewrite README around the new product direction
- Define data model
- Decide what existing code to keep
- Remove or replace mock-first screens

### Phase 2: Parent Experience

- Build the Huddle home screen
- Build Action Center
- Build Calendar view
- Build Volunteer view
- Add realistic empty, loading, and error states

### Phase 3: Admin Experience

- Build Huddle editor
- Build action item management
- Build family/player management
- Build volunteer management
- Restore secure role checks

### Phase 4: Mobile Experience

- Rebuild the Expo app around the same core workflows
- Prioritize Huddle, Actions, Calendar, and urgent alerts
- Add push notification support

## Development Commands

Install dependencies:

```bash
npm install
```

Run the web app:

```bash
npm run web
```

Preview the rebuilt Huddle screen without signing in:

```text
http://localhost:3000/preview/huddle
```

Run the mobile app:

```bash
npm run mobile
```

Build the web app:

```bash
npm run build:web
```

Run lint checks:

```bash
npm run lint
```

## Current Status

This repository currently contains an earlier prototype with a Next.js web app, Expo mobile app, shared TypeScript package, and Supabase SQL files.

That prototype should be treated as reference material, not the final design.

The next version should be rebuilt around the Weekly Huddle, family action items, team calendars, volunteering, and FGIC operations.
