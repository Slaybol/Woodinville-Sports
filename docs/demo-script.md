# Gridiron Connect Demo Walkthrough

This walkthrough is meant for a coach, team secretary, team parent, or program admin who is seeing Gridiron Connect for the first time.

The goal is not just to click through pages. The goal is to understand:

- what the app already does
- how it could reduce confusion for families
- how it could reduce repetitive communication work for staff

## What This App Is Trying To Solve

Woodinville Football families usually need answers to the same questions every week:

- What matters right now?
- What do I still need to do?
- When and where do we need to be?
- What changed?
- Where do I find the official details?

Staff usually deal with the same communication problems every week:

- repeating the same reminders in multiple places
- answering the same parent questions again and again
- chasing incomplete forms or deadlines
- keeping schedule details current
- filling volunteer gaps

Gridiron Connect is meant to become the private weekly command center that sits behind the public website.

The public website stays the front door.

This app is the private operating layer for:

- Weekly Huddle communication
- action tracking
- trusted event logistics
- volunteer coordination
- family-specific context

Over time, it should feel like a natural extension of the Woodinville Football website, especially the areas families and staff already know:

- Team
- Schedules
- Varsity
- C-Team
- Coaching Staff
- Calendar
- Parents
- Key Dates
- Events
- Volunteering
- FAQ
- Register
- Membership Dues
- Hawaii Travel Hub
- CWU Camp
- Sponsors
- Our Sponsors
- Our Advertisers
- Become a Sponsor
- FGIC
- Club Info
- Members
- Board & Committees
- Bylaws
- Meeting Minutes
- Corporate Matching
- Legacy

## What This Demo Shows

This demo focuses on two sides of the product:

1. The parent experience
2. The coach/admin experience

As you go through it, think about two questions:

1. Would this make life easier for families?
2. Would this reduce the amount of manual follow-up from staff?

Also keep this in mind:

- the public website should still be the front door
- this app should become the private companion behind it
- the long-term opportunity is to make important website information easier to act on

## Before You Start

Use the fast demo URL first:

- `/demo`

This route is self-contained. It does not require Supabase, login, seeded auth users, or a live database connection.

Use the live app only when you specifically want to test Supabase-backed persistence:

- `/`

Demo accounts:

- Parent demo: `parent@demo.com`
- Coach demo: `coach@demo.com`

Use the demo password set in Supabase Auth.

If sign-in is unavailable, use the self-contained demo route:

- `/demo`

Older preview routes also exist:

- `/preview/huddle`
- `/preview/actions`
- `/preview/volunteers`

## Suggested Framing Before You Begin

If you are introducing the app live, this is a good opening:

"This is not trying to replace the public website. It is trying to give families one private place to see the weekly huddle, complete action items, check event details, and handle volunteer needs."

You can also say:

"Over time, this should feel like the private extension of the Woodinville Football website, bringing key dates, registration items, camp details, volunteer needs, and team logistics into one guided family experience."

## Part 1: What A Family Would Experience

## 1. Sign In As A Parent

1. Open `/demo`.
2. Start on the parent-facing Weekly Huddle.
3. Use the bottom navigation to move through Actions, Calendar, Volunteer, and More.

You should land on the family-facing home screen.

What to notice:

- this is designed around the current week
- the experience starts with the Weekly Huddle, not a generic dashboard
- the app is trying to reduce the need for parents to search through email, texts, and website pages
- this route is intentionally fast because it does not wait on live data

## 2. Home Screen: Weekly Huddle

Stay on `/demo`.

Review the home screen from top to bottom.

What to notice:

- the Weekly Huddle is the center of the experience
- the page brings together updates, action items, schedule, and volunteer needs
- this is trying to answer "what do I need to know this week?" very quickly
- this is where important website-backed details can be surfaced in a more useful weekly format

Why this matters for staff:

- families are less dependent on scattered reminders
- one published huddle can support multiple views across the app
- important public information can be moved from "go find it" into "here is what matters now"

Good summary line:

"Instead of making families piece the week together themselves, the week is assembled for them."

## 3. Family Profile

1. Tap `More`.
2. Explain that Family Profile exists in the live app, while the fast demo keeps the walkthrough focused on program operations.

What to notice:

- household information
- guardian information
- player information
- team assignment
- notification preferences
- family progress

Optional interaction:

1. Update a field like phone number, notes, position, or player details.
2. Click `Save family profile`.

Why this matters:

- this is what makes the app specific to a real family
- it gives future action tracking, notifications, and volunteer records the right context
- it can reduce "which team is this for?" confusion
- it lays the groundwork for team-specific experiences like Varsity, C-Team, and parent-specific information

## 4. More Menu: Program Platform Preview

1. Tap `More`.
2. Review the new program areas:
   - `Team`
   - `Messages`
   - `Registration`
   - `Game Day`
   - `Documents`
   - `Emergency`
   - `Resources`

What to notice:

- this is where Gridiron starts to feel like a full team app, not only a weekly huddle
- these areas are intentionally marked as `MVP 2.0 Preview`
- the five-tab parent navigation stays simple, while deeper features live under `More`
- the visual language stays inside the same mobile shell instead of sending families to disconnected pages

Good summary line:

"The Huddle is the home base, and More is where the broader football program starts to come into view."

## 5. Team

1. Open `/demo/team`, or tap `Team` from `More`.
2. Review the program teams, roster preview, and coaching staff cards.

What to notice:

- Varsity, JV, C-Team, and All Program are represented
- roster and staff information is presented as app-native content
- this creates a path toward team-specific schedules, messages, and logistics

Why this matters:

- coaches and secretaries can point families to a trusted team context
- new families can understand where team, staff, and schedule information belongs
- this makes the app feel connected to the public website sections like Team, Varsity, C-Team, and Coaching Staff

## 6. Messages

1. Open `/demo/messages`, or tap `Messages` from `More`.
2. Review official announcements, urgent alerts, and team updates.

What to notice:

- communication is staff-controlled
- read-status metadata is visible as a product direction
- this does not introduce parent-to-parent chat yet

Why this matters:

- official communication should come before open chat
- urgent items like practice changes or weather updates need to stand apart from normal announcements
- secretaries and coaches can imagine one place for app, email, and future text delivery

## 7. Registration

1. Open `/demo/registration`, or tap `Registration` from `More`.
2. Review FinalForms, sports physical, FGIC dues, CWU Camp, and Hawaii Travel Hub readiness.

What to notice:

- website-backed requirements become a family checklist
- unfinished payment or travel workflows are clearly marked as preview items
- parents can see what is due, who owns it, and why it matters

Why this matters:

- registration, camp, dues, and travel details are some of the highest-friction family tasks
- this gives the secretary a future dashboard for chasing missing requirements
- it extends public website sections like Register, Membership Dues, CWU Camp, and Hawaii Travel Hub

## 8. Game Day

1. Open `/demo/game-day`, or tap `Game Day` from `More`.
2. Review opponent, location, arrival time, uniform, RSVP summary, score placeholder, and film links.

What to notice:

- the parent view answers game-day logistics in one place
- RSVP and attendance data are represented without making it a live workflow yet
- scorekeeping, film, and highlights are placeholders for future build-out

Why this matters:

- game day is where schedule, communication, volunteer needs, and team logistics all collide
- this is the area most directly comparable to broader team-management tools
- the Woodinville-specific value is keeping it tied to the Weekly Huddle and program operations

## 9. Action Center

1. Open `/demo/actions`.
2. Review the checklist.

What to click:

- try `Required`
- try `Due soon`
- try `Complete`
- click `Mark Complete` on one item
- click `Open Link` if you want to see how outside website resources connect into the app

What to notice:

- this turns reminders into trackable tasks
- parents can immediately see what is urgent and what is done
- the staff no longer has to rely only on "we sent the reminder"

Why this matters for coaches and secretaries:

- it reduces ambiguity
- it creates a clearer completion workflow
- it shows how Weekly Huddle content can become structured, actionable information
- it creates a better bridge between public pages like Register, Dues, CWU Camp, and what a family still needs to do

Good summary line:

"The to-do list is already built for the family instead of being buried inside a message."

## 10. Schedule And Event Detail

1. Open `/demo/schedule`.
2. Review the event list.
3. Open an event detail page.

What to notice:

- this is meant to become the trusted schedule
- the app can show audience, location, arrival details, notes, and last updated time
- this is trying to answer the real parent questions before they need to ask them

Why this matters for staff:

- fewer repeated questions like:
  - what time do we arrive?
  - where is it?
  - is this varsity only?
  - what do they wear?
- it gives staff one place to keep logistics current
- it opens the door for clearer schedule views tied to the public calendar, key dates, team schedules, and event pages

Good summary line:

"This is where a family goes to confirm details, not guess."

## 11. Volunteer Screen

1. Open `/demo/volunteers`.
2. Review the open roles and volunteer progress.
3. Click `Sign Up` on one role.

What to notice:

- volunteer needs are built into the family workflow
- signups and progress are visible in the same app as the weekly communication
- families can see both open needs and their own contribution

Why this matters for staff:

- volunteer asks become clearer and more visible
- the app can reduce the need for separate signup tools and repeated reminders
- it pairs naturally with the public Parents, Volunteering, FAQ, and FGIC sections families already use

## Transition To Staff View

At this point, the key idea to explain is:

"Everything the parent just saw depends on staff being able to manage the information once and publish it cleanly."

Now switch to the coach/admin side.

## Part 2: What Staff Would Manage

## 12. Sign In As A Coach

1. Tap the admin/monitor icon in the demo header, or open `/demo/admin`.
2. Review the coach and secretary dashboard.

What to notice:

- this is the staff/admin side of the product
- this is where the information families rely on gets created and maintained

## 13. Admin Dashboard

Stay on `/admin`.

Review the cards and work queue.

What to notice:

- huddle status
- action completion snapshot
- volunteer gaps
- family setup gaps
- issues that may need follow-up

Why this matters:

- it starts to shift the app from "content publishing" into "program operations"
- staff can see where attention is needed before families ever receive the next update

Good summary line:

"This is not just a page builder. It starts to become a control panel for the week."

## 14. Huddle Editor

1. Open `/demo/admin`.
2. Review the simulated publish panel.

What to look at:

- huddle summary
- structured sections
- action items
- preview panel

Optional interaction:

1. Edit the summary.
2. Click `Publish to parent demo`.
3. Click `View parent demo`.

After publishing:

1. Confirm the update appears at the top of `/demo`.
2. Explain that this is browser-only demo storage, not Supabase persistence.

Why this matters:

- the Weekly Huddle is treated as structured content, not just a newsletter
- one update can feed the home screen and the Action Center
- this reduces re-entering or duplicating the same information in multiple places
- it creates a path for items like Key Dates, Hawaii Travel Hub, CWU Camp, dues, and registration to show up in a guided private workflow

Good summary line:

"The same weekly update can power the whole family experience."

## 15. Team Manager Preview

1. Open `/demo/admin/team`.
2. Review the team cards, roster preview, and staff ownership.

What to notice:

- the program structure is visible to staff
- roster and staff management are represented without a schema change
- this is where team-specific targeting can eventually be managed

## 16. Families Manager Preview

1. Open `/demo/admin/families`.
2. Review family setup, requirements, volunteer progress, and RSVP status.

What to notice:

- the secretary can quickly see which families need follow-up
- missing physicals, FinalForms, dues, camp, and travel readiness have a natural home
- this is the operational view behind the family-facing checklist

## 17. Messages Manager Preview

1. Open `/demo/admin/messages`.
2. Review the compose preview and message queue.

What to notice:

- staff can imagine drafting official announcements and urgent alerts
- read-rate metadata is shown as a future workflow
- communication stays official and staff-owned first

## 18. Game Day Manager Preview

1. Open `/demo/admin/game-day`.
2. Review logistics, RSVP summary, result placeholder, and film placeholders.

What to notice:

- this is the staff side of game-day readiness
- RSVP follow-up, score/result tracking, and film links have obvious future homes
- it shows how the app can move closer to TeamSnap/GameChanger-style utility while staying Woodinville-specific

## 19. Action Manager

1. Open `/demo/actions`.
2. Review the action items.

What to notice:

- title
- importance
- audience
- due date
- external link

Why this matters:

- staff can directly manage the tasks families see
- required items can be kept visible and organized
- this can help reduce missed deadlines and manual chasing
- this is where public website information becomes actionable, especially registration, dues, travel prep, and camp requirements

## 20. Calendar Manager

1. Open `/demo/schedule`.
2. Review the event list.

What to notice:

- team or audience targeting
- location and logistics
- arrival and bus details
- equipment or uniform notes

Why this matters:

- it supports a single source of truth for schedule detail
- it helps families trust the app instead of asking around
- it supports future team-specific schedule views and better integration with public calendar content

## 21. Volunteer Manager

1. Open `/demo/volunteers`.
2. Review the volunteer slots and gaps.

What to notice:

- categories
- time and location
- slots needed
- hour credit

Why this matters:

- this connects staff planning directly to the family-facing volunteer view
- it shows how the app could help manage real season operations, not just messages
- it also supports the broader coordination work that connects to FGIC, parent support, and public volunteer information

## What To Say At The End

If you want a strong closing summary, use this:

"Gridiron Connect is a private weekly command center for Woodinville Football. Families can open one app to understand the week, complete action items, check trusted event details, and sign up for volunteer needs. Staff can manage that information once and publish it in a more structured, useful way than email alone."

If you want a version that emphasizes the website relationship, use this:

"The public website remains the front door for Woodinville Football. Gridiron Connect becomes the private companion behind it, helping families act on schedules, key dates, camp info, registration items, volunteer needs, and team communication more easily."

## Future Potential To Point Out

If you want to talk about where this could go next, mention:

- urgent alerts
- richer team targeting
- Team, Messages, Registration, Game Day, and Families workflows
- better completion tracking
- document and form access
- stronger volunteer coordination
- a more complete family and player record
- deeper integration with public website sections like team pages, coaching staff, FAQs, sponsors, FGIC resources, and legacy content

## If Something Does Not Work

Try these checks:

- refresh the page
- confirm the correct account is being used
- confirm the correct route
- if sign-in is unavailable, use the preview routes

If a page shows fallback content, that usually means the interface loaded but the live Supabase data for that section was unavailable.
