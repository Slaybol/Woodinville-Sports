# Gridiron Connect MVP Demo Guide

This guide is written for coaches, team parents, or admins who want to click through the current MVP on their own.

## Before You Start

Use the main demo site URL you were given.

Demo accounts expected by the current setup:

- Parent demo: `parent@demo.com`
- Coach demo: `coach@demo.com`

Use the password that was set for those accounts in Supabase Auth.

If the sign-in flow is unavailable for any reason, there are also preview pages:

- `/preview/huddle`
- `/preview/actions`
- `/preview/volunteers`

## What This Demo Shows

The current MVP is focused on one core job:

- helping families know what matters this week
- helping them complete required tasks
- helping them trust schedule details
- helping them claim volunteer roles
- giving coaches/admins a way to manage that information

This is not yet a messaging app, payment system, or full operations suite. It is the first working version of the Weekly Huddle command center.

## Part 1: Parent Experience

## 1. Sign In As A Parent

1. Open the app home page.
2. Click `Sign In / Accept Invite`.
3. Sign in with:
   `parent@demo.com`
4. Enter the demo password.
5. After sign-in, you should land on the parent home screen.

What to notice:

- This is the family-facing side of the app.
- The experience is designed around the Weekly Huddle, not a generic dashboard.

## 2. Home Screen: Weekly Huddle

1. Stay on `/`.
2. Review the home screen sections from top to bottom.

What to notice:

- The app highlights the current week first.
- Urgent or important items are surfaced before everything else.
- Families can quickly see action items, events, and volunteer needs in one place.
- This is meant to replace the need to search through emails and scattered links.

Suggested takeaway:

"A family should be able to open the app and understand the week in under 30 seconds."

## 3. Family Profile And Setup

1. Click `More` or go to `/profile`.
2. Review the family profile screen.

What to click:

- Look at family name, guardian info, player info, and team assignment.
- Scroll to notification preferences.
- Scroll to family progress and setup checklist.

Optional interaction:

1. Update a field like phone number, player position, or family notes.
2. Click `Save family profile`.

What to notice:

- The app is centered on the family as the main unit.
- Actions, volunteer tracking, and schedule context all depend on having the right family and player information.
- This is one of the pieces that makes the experience personalized rather than generic.

## 4. Action Center

1. Open `/actions`.
2. Review the checklist items.

What to click:

- Try filters like `Required`, `Due soon`, and `Complete`.
- Open one of the external links if you want to see how outside resources are attached.
- Click `Mark Complete` on one action item.

What to notice:

- This turns weekly communication into a structured checklist.
- Families can see what is urgent, what is due soon, and what is already done.
- Completion is tracked rather than left to memory.

Suggested takeaway:

"Instead of reading a newsletter and then making your own to-do list, the to-do list is already built for you."

## 5. Calendar And Event Detail

1. Open `/schedule`.
2. Review the event list.

What to click:

- Try the filters at the top.
- Click into one event to open the detail page.

What to notice on the schedule page:

- Events are organized as practical family logistics.
- Audience labels help show who the item applies to.
- This is meant to be the trusted calendar, not just a feed of announcements.

What to notice on the event detail page:

- Date and time
- Location and address
- Arrival or bus details
- Uniform or equipment notes
- Coach note
- Last updated time

Suggested takeaway:

"This page is trying to answer the parent questions: where do I go, when do I show up, what do I bring, and who is this for?"

## 6. Volunteer Screen

1. Open `/volunteers`.
2. Review the open roles and progress summary.

What to click:

- Try the category filters.
- Click `Sign Up` for an open role.
- Confirm the role appears under claimed or confirmed shifts.
- If helpful, click again to cancel and show that the change can be reversed.

What to notice:

- Volunteer work is visible inside the family experience, not hidden in a separate signup tool.
- Families can see both open opportunities and their own progress.
- This makes volunteer expectations easier to manage during the season.

## Part 2: Coach / Admin Experience

## 7. Sign In As A Coach

1. Sign out of the parent account.
2. Return to `/auth`.
3. Sign in with:
   `coach@demo.com`
4. Enter the demo password.
5. Open `/admin`.

What to notice:

- This is the admin side of the MVP.
- It is meant for coaches, team parents, or admins managing the weekly flow of information.

## 8. Admin Dashboard

1. Stay on `/admin`.
2. Review the dashboard cards and work queue.

What to notice:

- Current huddle status
- Action completion snapshot
- Volunteer gaps
- Families still missing setup
- Items needing admin attention

Suggested takeaway:

"This is not just a content page. It is an operational view of what needs attention before families receive the next update."

## 9. Huddle Editor

1. Open `/admin/huddles/new`.
2. Review the draft editor.

What to click:

- Look at the huddle details at the top.
- Review the structured sections.
- Scroll to `This Week's Playbook`.
- Look at the preview panel on the right.

Optional interaction:

1. Update the summary text or edit one action item title.
2. Click `Save Draft`.

What to notice:

- The Weekly Huddle is being treated as structured content, not just a long email.
- The same core content can drive the home screen, actions, and related sections.
- The live preview helps staff understand what families will actually see.

If you are comfortable testing it:

1. Click `Publish Huddle`.

What to notice:

- The MVP already includes a draft-to-publish workflow.

## 10. Action Manager

1. Open `/admin/actions`.
2. Review the current action items.

What to click:

- Click `Edit` on an existing action item.
- Review fields like title, importance, due date, audience, and external URL.

Optional interaction:

1. Create a new action item.
2. Save it.

What to notice:

- Admins can directly manage the checklist families see.
- Items can be marked as required, family-related, optional, or informational.
- This is one of the main tools for turning weekly communication into trackable tasks.

## 11. Calendar Manager

1. Open `/admin/calendar`.
2. Review the event list.

What to click:

- Click `Edit` on an event.
- Review fields for team, audience, date/time, location, arrival, bus, and gear notes.

Optional interaction:

1. Update an event detail.
2. Save it.

What to notice:

- Coaches/admins can keep event logistics current in one place.
- This is what supports the trusted event detail view on the parent side.

## 12. Volunteer Manager

1. Open `/admin/volunteers`.
2. Review the volunteer slots and gap counts.

What to click:

- Click `Edit` on a slot.
- Review fields like category, date/time, location, slots needed, and hour credit.

Optional interaction:

1. Create or edit a volunteer slot.
2. Save it.

What to notice:

- Admins can publish real volunteer needs and track coverage.
- The parent-facing volunteer view is directly connected to these records.

## Best Short Summary To Share

If you only want to describe the MVP in one paragraph, use this:

"Gridiron Connect is a private Weekly Huddle app for Woodinville Football families and staff. Parents can sign in, see what matters this week, track required tasks, check trusted event details, and claim volunteer roles. Coaches and admins can draft the Weekly Huddle and manage the action items, calendar events, and volunteer needs that families rely on."

## If Something Does Not Work

Try these checks:

- Refresh the page
- Confirm you are using the correct demo account
- Confirm you are on the correct route
- If sign-in is unavailable, use the preview routes instead

If a page shows fallback content, that usually means the UI loaded but the live Supabase data for that section was unavailable.
