'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Edit3,
  Home,
  Megaphone,
  Plus,
  Send,
  Settings,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const metrics = [
  {
    label: 'Current Huddle',
    value: 'Draft',
    detail: 'May 24-31 needs review',
    tone: 'warning',
  },
  {
    label: 'Action Completion',
    value: '42%',
    detail: 'FinalForms still low',
    tone: 'destructive',
  },
  {
    label: 'Volunteer Gaps',
    value: '9',
    detail: 'Open slots across 3 needs',
    tone: 'warning',
  },
  {
    label: 'Families Missing Setup',
    value: '14',
    detail: 'Need invitation follow-up',
    tone: 'info',
  },
]

const queues = [
  {
    title: 'FinalForms Registration',
    detail: 'Deadline May 26; 58% incomplete',
    badge: 'Urgent',
    tone: 'destructive' as const,
    icon: AlertTriangle,
  },
  {
    title: 'CWU Camp Registration',
    detail: 'Deadline June 3; reminder should go in next huddle',
    badge: 'Due soon',
    tone: 'warning' as const,
    icon: ClipboardList,
  },
  {
    title: 'Concessions planning',
    detail: '4 slots open; assign coordinator follow-up',
    badge: 'Volunteer',
    tone: 'success' as const,
    icon: Users,
  },
  {
    title: 'Spring Football begins',
    detail: 'Confirm first-week schedule details before publishing',
    badge: 'Calendar',
    tone: 'info' as const,
    icon: CalendarDays,
  },
]

const eventsNeedingDetails = [
  'Spring Football first week times',
  'CWU Camp travel instructions',
  'Summer weights + speed/agility schedule',
]

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Huddles', href: '/admin/huddles/new', icon: Megaphone },
  { label: 'Actions', href: '/admin/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
  { label: 'Families', href: '/admin/families', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

function metricBadge(tone: string) {
  if (tone === 'destructive') return 'destructive'
  if (tone === 'warning') return 'warning'
  if (tone === 'info') return 'info'
  return 'success'
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-base font-bold leading-5">Gridiron Admin</p>
            <p className="text-xs text-white/75">Weekly Huddle operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/huddles/new">
              <Button size="sm" className="bg-white text-falcon-900 hover:bg-falcon-50">
                <Plus size={15} className="mr-1" />
                New Huddle
              </Button>
            </Link>
            <Badge className="hidden bg-white/15 text-white md:inline-flex">Admin preview</Badge>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-10 items-center gap-2 rounded-md px-3 text-sm font-bold ${
                  item.href === '/admin'
                    ? 'bg-falcon-700 text-white'
                    : 'text-ink-700 hover:bg-white hover:text-ink-950'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="warning">Draft waiting</Badge>
                <Badge variant="destructive">2 urgent gaps</Badge>
              </div>
              <h1 className="text-3xl font-bold leading-9 text-ink-950">Admin Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
                Review what needs attention before families receive the next Weekly Huddle.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Send size={16} className="mr-2" />
                Quick Alert
              </Button>
              <Link href="/admin/huddles/new">
                <Button>
                  <Edit3 size={16} className="mr-2" />
                  Edit Huddle
                </Button>
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="pt-4 sm:pt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-ink-600">{metric.label}</p>
                    <Badge variant={metricBadge(metric.tone) as any}>{metric.value}</Badge>
                  </div>
                  <p className="text-sm leading-5 text-ink-600">{metric.detail}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Work queue</CardTitle>
                  <p className="text-sm text-ink-600">Exceptions and gaps that need admin attention.</p>
                </div>
                <Button size="sm" variant="outline">View All</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {queues.map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-lg border border-ink-200 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink-100 text-ink-700">
                      <item.icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-ink-950">{item.title}</h2>
                        <Badge variant={item.tone}>{item.badge}</Badge>
                      </div>
                      <p className="mt-1 text-sm leading-5 text-ink-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current draft</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-bold text-ink-950">Weekly Huddle | May 24-31</p>
                    <p className="mt-1 text-sm text-ink-600">4 sections drafted, 2 warnings before publish.</p>
                  </div>
                  <div className="rounded-lg bg-gold-100 p-3 text-sm leading-6 text-amber-950">
                    Add confirmed Spring Football times before publishing.
                  </div>
                  <Link href="/admin/huddles/new">
                    <Button className="w-full">Continue Editing</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Events needing details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {eventsNeedingDetails.map((event) => (
                    <div key={event} className="flex items-start gap-2 text-sm leading-5 text-ink-700">
                      <AlertTriangle size={15} className="mt-0.5 shrink-0 text-gold-500" />
                      <span>{event}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
