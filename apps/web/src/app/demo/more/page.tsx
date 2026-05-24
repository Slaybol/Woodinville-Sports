import Link from 'next/link'
import { ChevronRight, ClipboardCheck, FileText, HeartHandshake, MessageSquareText, Shield, Trophy, UsersRound } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const demoMenuItems = [
  {
    href: '/demo/team',
    title: 'Team',
    detail: 'Roster, program teams, coaching staff, and team-specific context.',
    icon: UsersRound,
  },
  {
    href: '/demo/messages',
    title: 'Messages',
    detail: 'Official announcements, urgent alerts, and read-status previews.',
    icon: MessageSquareText,
  },
  {
    href: '/demo/registration',
    title: 'Registration',
    detail: 'FinalForms, physicals, dues, camp, travel, and document readiness.',
    icon: ClipboardCheck,
  },
  {
    href: '/demo/game-day',
    title: 'Game Day',
    detail: 'Opponent logistics, arrival, uniform, RSVP, result, and film placeholders.',
    icon: Trophy,
  },
  {
    href: '/demo/volunteers',
    title: 'Volunteer progress',
    detail: 'Open roles, signups, and family hour progress.',
    icon: HeartHandshake,
  },
  {
    href: '/demo/documents',
    title: 'Documents',
    detail: 'Demo document cards for forms, schedules, and program resources.',
    icon: FileText,
  },
  {
    href: '/demo/emergency',
    title: 'Emergency guidance',
    detail: 'Demo safety and urgent-contact guidance in the same shell.',
    icon: Shield,
  },
  {
    href: '/demo/resources',
    title: 'Resources',
    detail: 'Website companion hubs for team, parents, FGIC, and sponsors.',
    icon: FileText,
  },
]

export default function DemoMorePage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">No login needed</Badge>
            <Badge variant="outline">Self-contained</Badge>
          </div>
          <p className="brand-kicker">More</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Demo menu</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            These routes are optimized for walkthrough speed and do not wait for Supabase.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Program surfaces</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-ink-200 p-4 transition-colors hover:bg-ink-50"
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
      </main>
    </DemoShell>
  )
}
