# MVP Design System

Design language for the first Gridiron Connect rebuild.

## Visual Mockups

- [MVP mobile screens](design-assets/mvp-mobile-screens.png)
- [MVP admin screens](design-assets/mvp-admin-screens.png)

Implementation backlog: [Work Items](work-items.md)

## Design Goal

Gridiron Connect should feel like a calm football operations center: fast, direct, trustworthy, and built for busy parents checking details on a phone.

The visual tone should be:

- Program-specific, not generic sports software
- Practical, not decorative
- Mobile-first
- Dense enough for repeated use
- Clear about urgency, deadlines, and completion
- Respectful of the public Woodinville Football brand

The interface should answer one question again and again:

> What does this family need to know or do next?

## MVP Screens

### 1. Sign In / Invite

Purpose: get families, coaches, and admins into the private app.

Primary content:

- Woodinville Football identity
- Email and password sign in
- Invitation code entry
- Forgot password link
- Short trust note: private family communication for Woodinville Football

Layout:

- Centered auth panel on desktop
- Full-width stacked form on mobile
- Program mark at top
- No marketing hero

### 2. Huddle Home

Purpose: the main landing screen and weekly command center.

Primary content:

- Current Weekly Huddle date range
- Urgent alert strip if active
- Due-soon action summary
- This week schedule preview
- Volunteer needs preview
- Latest highlights

Layout:

- Mobile: stacked sections
- Desktop: two-column dashboard with main huddle feed and right rail
- Top section must show the next most important thing, not generic welcome text

### 3. Action Center

Purpose: show what the family needs to complete.

Primary content:

- Completion summary
- Due soon
- Required actions
- Optional actions
- Completed actions

Layout:

- Status-filter tabs
- Action rows with due date, status, audience, and button
- Use compact rows rather than large cards when lists get long

### 4. Calendar

Purpose: trusted schedule for practices, games, camps, meetings, travel, and deadlines.

Primary content:

- Week view by default
- Filter by team and event type
- Upcoming events list
- Last-updated indicator

Layout:

- Mobile: agenda list with date dividers
- Desktop: week strip plus agenda
- Event rows should emphasize date, time, team, location, and event type

### 5. Event Detail

Purpose: answer every logistics question for one event.

Primary content:

- Event title
- Date and time
- Arrival/bus time
- Location and address
- Uniform/equipment notes
- Team audience
- Related links
- Last updated timestamp

Layout:

- Large event header
- Logistics grid
- Notes section
- Map/link action if address exists

### 6. Volunteer

Purpose: help families find and claim volunteer roles.

Primary content:

- Family hour progress
- Open opportunities
- Claimed shifts
- Interest-only roles
- Coordinator notes

Layout:

- Progress summary at top
- Filter chips for game day, events, meals, travel, fundraising
- Volunteer rows/cards with slots remaining and hour credit

### 7. Family Profile

Purpose: manage family, players, contacts, and notification preferences.

Primary content:

- Parent/guardian contact info
- Linked players
- Teams
- Emergency contact info
- Notification preferences
- Registration/checklist status summary

Layout:

- Profile summary
- Player cards
- Settings sections

### 8. Admin Dashboard

Purpose: give coaches and FGIC admins a clear operating view.

Primary content:

- Current huddle status
- Open action item completion
- Upcoming events needing attention
- Volunteer gaps
- Family/account exceptions

Layout:

- Compact metric tiles
- Work queues
- Quick create buttons

### 9. Huddle Editor

Purpose: create and publish the weekly structured huddle.

Primary content:

- Date range
- Summary
- Urgent items
- Action item links
- Calendar highlights
- Volunteer asks
- Program highlights
- Audience targeting
- Publish controls

Layout:

- Editor form on left
- Preview on right for desktop
- Mobile can use section-by-section editing

## Design Tokens

### Color

Use Woodinville green as the identity color, supported by neutral operational colors.

```css
:root {
  --color-falcon-green-950: #052e1b;
  --color-falcon-green-900: #064725;
  --color-falcon-green-800: #075c31;
  --color-falcon-green-700: #08743d;
  --color-falcon-green-600: #0a8a49;
  --color-falcon-green-500: #18a65b;
  --color-falcon-green-100: #dff4e8;
  --color-falcon-green-50: #f0fbf5;

  --color-ink-950: #111827;
  --color-ink-800: #1f2937;
  --color-ink-700: #374151;
  --color-ink-600: #4b5563;
  --color-ink-500: #6b7280;
  --color-ink-300: #d1d5db;
  --color-ink-200: #e5e7eb;
  --color-ink-100: #f3f4f6;
  --color-ink-50: #f9fafb;

  --color-field-white: #ffffff;
  --color-gold-500: #d6a820;
  --color-gold-100: #fbf0c9;
  --color-red-600: #dc2626;
  --color-red-100: #fee2e2;
  --color-blue-600: #2563eb;
  --color-blue-100: #dbeafe;
}
```

Usage:

- Primary actions: `falcon-green-700`
- Primary hover: `falcon-green-800`
- Header/nav: `falcon-green-900`
- Page background: `ink-50`
- Text: `ink-950`
- Secondary text: `ink-600`
- Borders: `ink-200`
- Urgent: red
- Due soon: gold
- Informational: blue
- Complete: green

Avoid large dark-blue sections, heavy gradients, and generic sports-black themes. The app should feel like Woodinville, not a fantasy football product.

### Typography

Use a modern system stack for speed and readability.

```css
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Scale:

- Page title: 28px / 36px / 700
- Section title: 20px / 28px / 700
- Card title: 16px / 24px / 700
- Body: 15px / 24px / 400
- Small body: 14px / 20px / 400
- Metadata: 12px / 16px / 500
- Button: 14px / 20px / 700

Rules:

- No negative letter spacing
- No viewport-based font sizing
- Keep dashboard text compact
- Use bold sparingly for action labels, deadlines, and titles

### Spacing

Use a 4px base scale.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

Layout defaults:

- Mobile page padding: 16px
- Desktop page padding: 24px
- Section gap: 24px
- Card padding: 16px mobile, 20px desktop
- Row gap: 12px
- Inline control gap: 8px

### Radius

Keep the app practical and crisp.

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-full: 999px;
```

Usage:

- Buttons: 6px
- Inputs: 6px
- Cards: 8px
- Badges: 999px
- Modals/sheets: 8px

### Borders and Shadows

```css
--border-subtle: 1px solid #e5e7eb;
--shadow-card: 0 1px 2px rgba(17, 24, 39, 0.06);
--shadow-popover: 0 12px 24px rgba(17, 24, 39, 0.14);
```

Usage:

- Prefer borders over heavy shadows
- Use shadows only for popovers, menus, and overlays
- Cards should feel like grouped information, not floating marketing panels

## Component Sizes

### App Header

- Desktop height: 64px
- Mobile height: 56px
- Background: falcon green 900
- Content max width: 1200px
- Logo block: 36px square desktop, 32px mobile

### Bottom Navigation

Mobile only.

- Height: 64px
- 5 items max
- Icon: 22px
- Label: 11px / 14px / 600
- Active color: falcon green 700

### Buttons

Sizes:

- Small: 32px height, 12px horizontal padding
- Medium: 40px height, 16px horizontal padding
- Large: 48px height, 18px horizontal padding

Variants:

- Primary: green fill
- Secondary: white fill, gray border
- Ghost: transparent
- Danger: red fill or red outline

### Inputs

- Height: 40px
- Padding: 12px horizontal
- Border: ink 300
- Focus ring: 2px falcon green 500
- Error ring: red 600

### Cards

- Radius: 8px
- Border: ink 200
- Background: white
- Padding: 16-20px
- Header gap: 8px

Use cards for repeated objects:

- Action item
- Event
- Volunteer slot
- Player
- Admin metric

Do not nest cards inside cards.

### Badges

- Height: 22px
- Padding: 8px horizontal
- Font: 12px / 16px / 700
- Radius: full

Badge types:

- Urgent
- Due soon
- Complete
- Optional
- Team
- Draft
- Published

### List Rows

- Minimum height: 64px
- Padding: 12px 16px
- Left: icon or status mark
- Center: title, metadata
- Right: status, chevron, or action

Use rows for dense operational lists.

## Screen Patterns

### Huddle Section

Each huddle section should have:

- Section title
- Optional short description
- 1-5 structured items
- Clear action link if needed

Avoid long newsletter-style walls of text. Break email content into scannable operational blocks.

### Action Item Row

Required fields:

- Title
- Status
- Due date
- Audience
- Source/link

Recommended display:

- Left status icon
- Title and short note
- Due date badge
- Primary action button

### Event Row

Required fields:

- Date
- Time
- Event title
- Team
- Location

Recommended display:

- Date block on left
- Title/details center
- Event type badge right

### Admin Work Queue

Admin lists should show exceptions first:

- Urgent unpublished huddle
- Actions due within 7 days
- Volunteer slots below required coverage
- Families missing required setup
- Events missing location/time details

## Responsive Layout

Mobile first:

- Single column
- Bottom nav
- Sticky urgent alerts where appropriate
- Large tap targets

Tablet:

- Two-column huddle home where useful
- Side panels can become drawers

Desktop:

- Max content width: 1200px
- Main content plus right rail
- Admin editor can use editor + preview split

Breakpoints:

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

## Interaction Rules

- Urgent items must be visually distinct and appear before normal content.
- Every action item needs a clear next step.
- Every external link should indicate that it leaves the app.
- Deadlines should show absolute dates, not only relative labels.
- Empty states should explain what is missing and what happens next.
- Admin screens should prefer save drafts before publishing.
- Destructive actions require confirmation.

## Content Style

Use direct, operational language.

Good:

- Complete FinalForms by May 26
- Register for CWU Camp by June 3
- 2 volunteer slots still open
- Bus departs at 3:45 PM

Avoid:

- Welcome to your dashboard
- Check out these exciting features
- Stay tuned
- Click here for more information

## MVP Build Priority

Build in this order:

1. Sign In / Invite
2. Huddle Home
3. Action Center
4. Calendar
5. Event Detail
6. Volunteer
7. Family Profile
8. Admin Dashboard
9. Huddle Editor

The first usable version should prove the Weekly Huddle model before expanding into full roster, payment, sponsor, or travel management.
