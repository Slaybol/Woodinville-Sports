import Link from 'next/link'
import { CalendarDays, ClipboardList, MessageSquareText, Trophy, Users, UsersRound } from 'lucide-react'
import { DemoPublishPanel } from '@/components/demo/demo-publish-panel'
import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformFamilies, platformMessages, platformRsvps, platformTeams } from '@/lib/platform-demo-data'

const adminTiles = [
  { href: '/demo/admin/team', label: 'Team setup', detail: `${platformTeams.length} demo teams`, icon: UsersRound },
  { href: '/demo/admin/families', label: 'Families', detail: `${platformFamilies.length} family records`, icon: Users },
  { href: '/demo/admin/messages', label: 'Messages', detail: `${platformMessages.length} queued examples`, icon: MessageSquareText },
  { href: '/demo/admin/game-day', label: 'Game Day', detail: `${platformRsvps[2]?.unknown || 0} RSVP unknown`, icon: Trophy },
  { href: '/demo/admin/actions', label: 'Actions', detail: 'Registration and camp tasks', icon: ClipboardList },
  { href: '/demo/admin/calendar', label: 'Calendar', detail: 'Key dates and logistics', icon: CalendarDays },
]

export default function DemoAdminPage() {
  return (
    <DemoAdminShell
      activeNav="dashboard"
      title="Self-Contained Admin Demo"
      description="A fast coach and secretary walkthrough that uses local static data plus a browser-only publish simulation."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminTiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="h-full transition-colors hover:bg-ink-50">
              <CardContent className="pt-5">
                <tile.icon size={20} className="text-falcon-700" />
                <p className="mt-3 font-bold text-ink-950">{tile.label}</p>
                <p className="mt-1 text-sm text-ink-600">{tile.detail}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <DemoPublishPanel />

        <Card>
          <CardHeader>
            <CardTitle>Demo guarantees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
            <div className="rounded-lg bg-falcon-50 p-3 text-falcon-950">
              <p className="font-bold">No backend wait</p>
              <p className="mt-1">This route does not call Supabase, auth, or server actions.</p>
            </div>
            <div className="rounded-lg bg-ink-50 p-3">
              <p className="font-bold text-ink-950">Role switching</p>
              <p className="mt-1">Use Parent Demo to jump back to the phone-frame walkthrough.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Coach</Badge>
              <Badge variant="info">Secretary</Badge>
              <Badge variant="outline">Team parent</Badge>
            </div>
            <Link href="/demo/admin/calendar">
              <Button variant="outline" className="w-full">
                <CalendarDays size={16} className="mr-2" />
                Open admin calendar
              </Button>
            </Link>
            <Link href="/demo/admin/actions">
              <Button variant="outline" className="w-full">
                <ClipboardList size={16} className="mr-2" />
                Open admin actions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </DemoAdminShell>
  )
}
