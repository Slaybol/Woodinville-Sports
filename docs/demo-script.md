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

Use the main demo URL you were given.

Demo accounts:

- Parent demo: `parent@demo.com`
- Coach demo: `coach@demo.com`

Use the demo password set in Supabase Auth.

If sign-in is unavailable, preview routes exist:

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

1. Open the app home page.
2. Click `Sign In / Accept Invite`.
3. Sign in with `parent@demo.com`.
4. Enter the demo password.

You should land on the family-facing home screen.

What to notice:

- this is designed around the current week
- the experience starts with the Weekly Huddle, not a generic dashboard
- the app is trying to reduce the need for parents to search through email, texts, and website pages

## 2. Home Screen: Weekly Huddle

Stay on `/`.

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

1. Open `/profile`, or tap `More`.
2. Review the family profile screen.

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

## 4. Action Center

1. Open `/actions`.
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

## 5. Schedule And Event Detail

1. Open `/schedule`.
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

## 6. Volunteer Screen

1. Open `/volunteers`.
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

## 7. Sign In As A Coach

1. Sign out of the parent account.
2. Go to `/auth`.
3. Sign in with `coach@demo.com`.
4. Enter the demo password.
5. Open `/admin`.

What to notice:

- this is the staff/admin side of the product
- this is where the information families rely on gets created and maintained

## 8. Admin Dashboard

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

## 9. Huddle Editor

1. Open `/admin/huddles/new`.
2. Review the huddle editor.

What to look at:

- huddle summary
- structured sections
- action items
- preview panel

Optional interaction:

1. Edit the summary.
2. Edit one action title.
3. Click `Save Draft`.
4. If you want to test the full flow, click `Publish Huddle`.

After publishing:

1. Sign back in as the parent.
2. Confirm the updated summary and action item appear on the parent side.

Why this matters:

- the Weekly Huddle is treated as structured content, not just a newsletter
- one update can feed the home screen and the Action Center
- this reduces re-entering or duplicating the same information in multiple places
- it creates a path for items like Key Dates, Hawaii Travel Hub, CWU Camp, dues, and registration to show up in a guided private workflow

Good summary line:

"The same weekly update can power the whole family experience."

## 10. Action Manager

1. Open `/admin/actions`.
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

## 11. Calendar Manager

1. Open `/admin/calendar`.
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

## 12. Volunteer Manager

1. Open `/admin/volunteers`.
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
