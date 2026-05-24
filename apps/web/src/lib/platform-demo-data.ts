export const platformTeams = [
  {
    name: 'All Program',
    level: 'Program',
    season: '2026 season',
    focus: 'One place for registration, announcements, volunteer coverage, and key dates across Woodinville Football.',
    rosterCount: 132,
    nextEvent: 'Spring practice window',
  },
  {
    name: 'Varsity',
    level: 'Varsity',
    season: 'Fall 2026',
    focus: 'Game-day logistics, travel readiness, film links, and weekly opponent prep.',
    rosterCount: 58,
    nextEvent: 'Friday night game preview',
  },
  {
    name: 'JV',
    level: 'JV',
    season: 'Fall 2026',
    focus: 'Practice schedule, development reps, parent updates, and weekday game logistics.',
    rosterCount: 42,
    nextEvent: 'JV schedule confirmation',
  },
  {
    name: 'C-Team',
    level: 'C-Team',
    season: 'Fall 2026',
    focus: 'New-family onboarding, equipment reminders, and first-season communication.',
    rosterCount: 32,
    nextEvent: 'C-Team family orientation',
  },
]

export const platformStaff = [
  {
    name: 'Wayne Maxwell',
    role: 'Head Coach',
    team: 'All Program',
    responsibilities: ['Program message', 'Coach announcements', 'Football operations'],
  },
  {
    name: 'Team Secretary',
    role: 'Team Secretary',
    team: 'All Program',
    responsibilities: ['Registration tracking', 'Calendar updates', 'Family follow-up'],
  },
  {
    name: 'Team Parent Lead',
    role: 'Volunteer Coordinator',
    team: 'All Program',
    responsibilities: ['Volunteer gaps', 'Game-day support', 'Parent coordination'],
  },
  {
    name: 'Varsity Staff',
    role: 'Position Coaches',
    team: 'Varsity',
    responsibilities: ['Roster notes', 'Game logistics', 'Film follow-up'],
  },
]

export const platformRoster = [
  { name: 'Demo Player 12', team: 'Varsity', gradYear: 2027, position: 'WR / DB', number: '12', status: 'Ready' },
  { name: 'Demo Player 27', team: 'Varsity', gradYear: 2026, position: 'RB / LB', number: '27', status: 'Physical due' },
  { name: 'Demo Player 55', team: 'JV', gradYear: 2028, position: 'OL / DL', number: '55', status: 'Ready' },
  { name: 'Demo Player 8', team: 'C-Team', gradYear: 2029, position: 'QB / S', number: '8', status: 'FinalForms due' },
]

export const platformMessages = [
  {
    title: 'CWU Camp registration reminder',
    type: 'Announcement',
    audience: 'Camp families',
    status: 'Scheduled',
    sentBy: 'Team Secretary',
    readRate: '82%',
    timing: 'Sends Monday at 7:00 PM',
    body: 'Complete CWU Camp registration, payment, and hard-copy forms before the listed deadline.',
  },
  {
    title: 'Practice time update',
    type: 'Urgent alert',
    audience: 'All program families',
    status: 'Draft',
    sentBy: 'Coach',
    readRate: 'Preview',
    timing: 'Ready for coach approval',
    body: 'Spring practice logistics can be pushed as a high-priority alert when timing changes.',
  },
  {
    title: 'Volunteer gaps for Friday',
    type: 'Team update',
    audience: 'Varsity families',
    status: 'Preview',
    sentBy: 'Team Parent Lead',
    readRate: '64%',
    timing: 'Follow-up recommended',
    body: 'Concessions and chain crew coverage can be highlighted before the next home game.',
  },
]

export const platformRsvps = [
  { event: 'Spring practice window', date: 'May 24-31', team: 'All Program', yes: 74, no: 3, unknown: 18, familyStatus: 'Going' },
  { event: 'CWU Camp', date: 'Jun 20-23', team: 'Camp families', yes: 41, no: 5, unknown: 22, familyStatus: 'Needs response' },
  { event: 'Friday night game', date: 'Sep 11', team: 'Varsity', yes: 52, no: 1, unknown: 5, familyStatus: 'Going' },
]

export const platformRequirements = [
  {
    title: 'FinalForms Registration',
    category: 'Registration',
    status: 'Due soon',
    owner: 'Parent + student',
    dueLabel: 'Due before first practice',
    detail: 'Family account, student forms, and program eligibility details.',
  },
  {
    title: 'Current Sports Physical',
    category: 'Registration',
    status: 'Needs upload',
    owner: 'Parent',
    dueLabel: 'Required before participation',
    detail: 'Physical must be current and visible before the player participates.',
  },
  {
    title: 'FGIC Membership Dues',
    category: 'Dues',
    status: 'Open',
    owner: 'Family',
    dueLabel: 'Season support item',
    detail: 'Program dues and booster support tracking for families.',
  },
  {
    title: 'CWU Camp',
    category: 'Camp',
    status: 'Due soon',
    owner: 'Camp families',
    dueLabel: 'Camp deadline',
    detail: 'Registration, camp fee, and hard-copy documents for CWU Camp.',
  },
  {
    title: 'Hawaii Travel Readiness',
    category: 'Travel',
    status: 'MVP 2.0 Preview',
    owner: 'Travel families',
    dueLabel: 'Future workflow',
    detail: 'Travel hub readiness for passport, payment, itinerary, and family communications.',
  },
]

export const platformGameDay = {
  opponent: 'Bothell Cougars',
  date: 'Friday, September 11',
  location: 'Pop Keeney Stadium',
  arrival: '5:00 PM player arrival',
  kickoff: '7:00 PM kickoff',
  uniform: 'Green jerseys / white pants',
  result: 'Pre-game',
  score: '0-0',
  logistics: [
    'Players arrive dressed with cleats, mouthguard, and water.',
    'Families use the game-day volunteer board for concessions and chain crew coverage.',
    'Film and highlight links will appear here after the game.',
  ],
  links: [
    { label: 'Film placeholder', status: 'Post-game' },
    { label: 'Highlights placeholder', status: 'MVP 2.0 Preview' },
    { label: 'Scorekeeping placeholder', status: 'Future workflow' },
  ],
}

export const platformFamilies = [
  {
    family: 'Bergerin Family',
    players: '1 Varsity player',
    setup: 'Complete',
    requirements: '3 of 5 complete',
    volunteer: '1.5 of 10 hours',
    rsvp: 'Going',
  },
  {
    family: 'Demo JV Family',
    players: '1 JV player',
    setup: 'Needs physical',
    requirements: '2 of 5 complete',
    volunteer: '0 of 10 hours',
    rsvp: 'Needs response',
  },
  {
    family: 'Demo C-Team Family',
    players: '1 C-Team player',
    setup: 'FinalForms due',
    requirements: '1 of 5 complete',
    volunteer: '2 of 10 hours',
    rsvp: 'Going',
  },
]
