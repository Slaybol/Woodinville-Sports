import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Bell,
  ChevronRight,
  Compass,
  FileText,
  HeartHandshake,
  Shield,
  UserRound,
  Users,
} from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFamilyProfileData } from '@/lib/data/profile'

const menuItems = [
  {
    href: '/profile',
    title: 'Family profile',
    detail: 'Household, player, team, and notification details.',
    icon: UserRound,
  },
  {
    href: '/resources',
    title: 'Program resource hubs',
    detail: 'Team, parents, FGIC, sponsors, and website-companion stubs.',
    icon: Compass,
  },
  {
    href: '/documents',
    title: 'Documents',
    detail: 'Forms, guides, schedules, and downloadable resources.',
    icon: FileText,
  },
  {
    href: '/volunteers',
    title: 'Volunteer progress',
    detail: 'Open roles, signups, and family hour progress.',
    icon: HeartHandshake,
  },
  {
    href: '/emergency',
    title: 'Emergency guidance',
    detail: 'Urgent contact guidance and team-related safety context.',
    icon: Shield,
  },
]

export default async function MorePage() {
  const profileData = await getFamilyProfileData()

  if (!profileData) {
    redirect('/auth')
  }

  const statusLabel = profileData.setupComplete
    ? 'Family setup complete'
    : profileData.hasFamilyContext
      ? 'Family saved, add player'
      : 'Finish family setup'

  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: statusLabel, tone: profileData.setupComplete ? 'live' : 'fallback' }}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant={profileData.setupComplete ? 'success' : 'warning'}>{statusLabel}</Badge>
              <Badge variant="outline">{profileData.players.length} linked player{profileData.players.length === 1 ? '' : 's'}</Badge>
            </div>
            <p className="brand-kicker">More</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">
              {profileData.family?.name || 'Family and program menu'}
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              Use this area to move beyond the weekly feed into family settings, program resources, documents, and support tools.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg border border-ink-200 p-4 transition-colors hover:bg-ink-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                    <item.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-ink-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-ink-600">{item.detail}</p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-ink-400" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
              <div className="rounded-lg bg-falcon-50 p-3">
                <p className="flex items-center gap-2 font-bold text-falcon-950">
                  <Users size={15} />
                  Linked players
                </p>
                <p className="mt-1">{profileData.players.length > 0 ? `${profileData.players.length} connected to your household.` : 'Add a player in Family Profile to finish setup.'}</p>
              </div>
              <div className="rounded-lg bg-ink-50 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <Bell size={15} className="text-falcon-700" />
                  Notifications
                </p>
                <p className="mt-1">
                  Review alert preferences in Family Profile if you want to adjust huddle, action, event, or volunteer reminders.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </ParentShell>
  )
}
