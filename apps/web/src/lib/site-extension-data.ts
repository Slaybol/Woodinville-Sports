export interface SiteResourceLink {
  label: string
  description: string
  href: string
}

export interface SiteResourceHub {
  slug: 'team' | 'parents' | 'fgic' | 'sponsors'
  title: string
  shortTitle: string
  summary: string
  intro: string
  websiteSections: string[]
  links: SiteResourceLink[]
  appOpportunities: string[]
}

export const siteResourceHubs: SiteResourceHub[] = [
  {
    slug: 'team',
    title: 'Team and Schedule',
    shortTitle: 'Team',
    summary: 'Bring Varsity, C-Team, coaching staff, and season logistics into a clearer private team view.',
    intro:
      'The public site already carries team pages, schedules, and coaching staff. This hub shows how Gridiron Connect can become the private place where that information turns into a family-ready workflow.',
    websiteSections: ['Team', 'Schedules', 'Varsity', 'C-Team', 'Coaching Staff', 'Calendar', 'Events'],
    links: [
      {
        label: 'Schedules',
        description: 'Public varsity and C-Team schedules that families already reference.',
        href: 'https://www.woodinvillefootball.com/schedules',
      },
      {
        label: 'C-Team Schedule',
        description: 'Dedicated C-Team schedule page on the public site.',
        href: 'https://www.woodinvillefootball.com/c-team-schedule',
      },
      {
        label: 'Varsity Team',
        description: 'Public varsity team page and roster-style visuals.',
        href: 'https://www.woodinvillefootball.com/varsity-team',
      },
      {
        label: 'Coaching Staff',
        description: 'Head coach, Varsity assistants, C-Team coaches, and support staff.',
        href: 'https://www.woodinvillefootball.com/coaches',
      },
    ],
    appOpportunities: [
      'Team-specific schedule views for Varsity, JV, and C-Team.',
      'Private logistics layered on top of public events: arrival time, bus details, uniform, and coach notes.',
      'Coach and support-staff directory with role-specific contact context.',
    ],
  },
  {
    slug: 'parents',
    title: 'Parents and Family Resources',
    shortTitle: 'Parents',
    summary: 'Collect parent-facing website content like key dates, FAQ, registration, dues, CWU Camp, and travel into one family hub.',
    intro:
      'Families already use the Parents area of the public site. In Gridiron Connect, that information can become easier to find, easier to act on, and easier to tie to a real household.',
    websiteSections: ['Parents', 'Key Dates', 'Events', 'Volunteering', 'FAQ', 'Register', 'Membership Dues', 'Hawaii Travel Hub', 'CWU Camp'],
    links: [
      {
        label: 'Welcome Parents',
        description: 'Public parent welcome page and orientation hub.',
        href: 'https://www.woodinvillefootball.com/welcome-parents',
      },
      {
        label: '2026 Key Dates',
        description: 'Season milestones, parent nights, practices, camp, and travel dates.',
        href: 'https://www.woodinvillefootball.com/keydates',
      },
      {
        label: 'FAQ',
        description: 'Common parent questions about schedules, pickups, team dinners, and game-day expectations.',
        href: 'https://www.woodinvillefootball.com/faq',
      },
      {
        label: 'Register for 2026',
        description: 'Public season registration entry point.',
        href: 'https://www.woodinvillefootball.com/',
      },
      {
        label: 'FGIC Dues',
        description: 'Membership dues and donation information on the public site.',
        href: 'https://www.woodinvillefootball.com/equipment-information',
      },
      {
        label: 'CWU Camp',
        description: 'Camp registration and trip details.',
        href: 'https://www.woodinvillefootball.com/cwucamp',
      },
      {
        label: 'Volunteering',
        description: 'Volunteer expectations and interest pathways.',
        href: 'https://www.woodinvillefootball.com/volunteering',
      },
    ],
    appOpportunities: [
      'A single family-facing hub for registration, dues, camp, travel, and season deadlines.',
      'FAQ answers connected to the current team and player context instead of static pages alone.',
      'Key Dates turned into reminders, action items, and due-soon prompts.',
    ],
  },
  {
    slug: 'fgic',
    title: 'FGIC and Program Operations',
    shortTitle: 'FGIC',
    summary: 'Show how Falcon Gridiron Club information can live alongside volunteer tracking, members, committees, and family operations.',
    intro:
      'FGIC already powers much of the program behind the scenes. This hub shows how the app can support that work with clearer private coordination tools while still pointing back to the public site.',
    websiteSections: ['FGIC', 'Club Info', 'Members', 'Board & Committees', 'Bylaws', 'Meeting Minutes', 'Corporate Matching'],
    links: [
      {
        label: 'Club Info',
        description: 'Public FGIC overview, tax status, and organization information.',
        href: 'https://www.woodinvillefootball.com/club-info',
      },
      {
        label: 'Members',
        description: 'Current FGIC member list on the public site.',
        href: 'https://www.woodinvillefootball.com/members',
      },
      {
        label: 'Board and Committees',
        description: 'Executive board, appointed roles, and active committees.',
        href: 'https://www.woodinvillefootball.com/board',
      },
      {
        label: 'Meeting Minutes',
        description: 'Archived board and general meeting minutes.',
        href: 'https://www.woodinvillefootball.com/meeting-minutes',
      },
      {
        label: 'Corporate Matching',
        description: 'Company matching-gift and volunteer-match information.',
        href: 'https://www.woodinvillefootball.com/corporate-matching',
      },
    ],
    appOpportunities: [
      'A private operations view for board members, team parents, and committee leads.',
      'Volunteer roles, committee ownership, and gaps connected to real households.',
      'A clearer handoff between public FGIC info and private program operations.',
    ],
  },
  {
    slug: 'sponsors',
    title: 'Sponsors and Legacy',
    shortTitle: 'Sponsors',
    summary: 'Expand the demo beyond weekly logistics into sponsor visibility, advertiser support, and the broader Woodinville Football story.',
    intro:
      'This hub is here to show that the product can grow beyond pure operations. Sponsors, advertisers, and legacy content matter to the program identity and should still feel connected to the private experience.',
    websiteSections: ['Sponsors', 'Our Sponsors', 'Our Advertisers', 'Become a Sponsor', 'Legacy'],
    links: [
      {
        label: 'Become a Sponsor',
        description: 'Public sponsorship packages and fundraising information.',
        href: 'https://www.woodinvillefootball.com/sponsorships',
      },
      {
        label: 'Our Advertisers',
        description: 'Public advertiser recognition page.',
        href: 'https://www.woodinvillefootball.com/our-advertisers',
      },
      {
        label: '44 Jersey / Legacy',
        description: 'One example of legacy-oriented public content tied to program identity.',
        href: 'https://www.woodinvillefootball.com/44-jersery',
      },
    ],
    appOpportunities: [
      'A stronger “program identity” layer so the app feels like Woodinville Football, not just a utility.',
      'Sponsor acknowledgements, advertiser visibility, and event tie-ins connected to the season calendar.',
      'Legacy and alumni content surfaced in ways that support culture, onboarding, and fundraising.',
    ],
  },
]

export function getSiteResourceHub(slug: string) {
  return siteResourceHubs.find((hub) => hub.slug === slug) || null
}
