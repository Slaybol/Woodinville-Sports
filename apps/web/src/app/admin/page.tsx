import Link from 'next/link'
import {
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  Edit3,
  Home,
  Megaphone,
  Plus,
  Send,
  Settings,
  Users,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { data: drafts },
    { data: published },
    { data: actionItems },
    { data: actionStatuses },
    { data: volunteerSlots },
    { data: volunteerSignups },
    { data: families },
    { data: events },
    { data: sections },
    invitationsResult,
  ] = await Promise.all([
    supabase.from('huddles').select('*').eq('status', 'draft').order('updated_at', { ascending: false }).limit(1),
    supabase.from('huddles').select('*').eq('status', 'published').order('published_at', { ascending: false }).limit(1),
    supabase.from('action_items').select('*'),
    supabase.from('family_action_status').select('*'),
    supabase.from('volunteer_slots').select('*'),
    supabase.from('volunteer_signups').select('*').eq('status', 'confirmed'),
    supabase.from('families').select('*'),
    supabase.from('events').select('*').order('starts_at', { ascending: true, nullsFirst: false }),
    supabase.from('huddle_sections').select('*'),
    supabase.from('invitations').select('*').eq('status', 'pending'),
  ])

  const currentDraft = drafts?.[0] || null
  const currentPublished = published?.[0] || null
  const totalActions = actionItems?.length || 0
  const completeActions = (actionStatuses || []).filter((status) => status.status === 'complete').length
  const completionPercent = totalActions === 0 ? 0 : Math.round((completeActions / totalActions) * 100)
  const openVolunteerSlots = (volunteerSlots || []).reduce((sum, slot) => {
    const filled = (volunteerSignups || []).filter((signup) => signup.slot_id === slot.id).length
    return sum + Math.max(slot.slots_needed - filled, 0)
  }, 0)
  const pendingInvitations = invitationsResult.data?.length || 0
  const draftSectionCount = currentDraft
    ? (sections || []).filter((section) => section.huddle_id === currentDraft.id).length
    : 0

  const topIncompleteAction = (actionItems || []).find((action) => {
    const statuses = (actionStatuses || []).filter((status) => status.action_item_id === action.id)
    return statuses.some((status) => status.status !== 'complete') || statuses.length === 0
  })

  const topVolunteerGap = (volunteerSlots || [])
    .map((slot) => {
      const filled = (volunteerSignups || []).filter((signup) => signup.slot_id === slot.id).length
      return {
        slot,
        openCount: Math.max(slot.slots_needed - filled, 0),
      }
    })
    .sort((a, b) => b.openCount - a.openCount)[0]

  const nextEventMissingDetails = (events || []).filter(
    (event) => !event.display_time || !event.location || !event.notes
  )

  const workQueue = [
    topIncompleteAction
      ? {
          title: topIncompleteAction.title,
          detail: `${topIncompleteAction.due_label || 'No due date'}; ${Math.max(totalActions - completeActions, 0)} items still incomplete`,
          badge: topIncompleteAction.due_label === 'Past due' ? 'Urgent' : 'Due soon',
          tone: topIncompleteAction.due_label === 'Past due' ? ('destructive' as const) : ('warning' as const),
          icon: topIncompleteAction.due_label === 'Past due' ? AlertTriangle : ClipboardList,
        }
      : null,
    topVolunteerGap && topVolunteerGap.openCount > 0
      ? {
          title: topVolunteerGap.slot.title,
          detail: `${topVolunteerGap.openCount} slots still open`,
          badge: 'Volunteer',
          tone: 'success' as const,
          icon: Users,
        }
      : null,
    nextEventMissingDetails[0]
      ? {
          title: nextEventMissingDetails[0].title,
          detail: 'Missing one or more event details before families rely on it',
          badge: 'Calendar',
          tone: 'info' as const,
          icon: CalendarDays,
        }
      : null,
  ].filter(Boolean) as Array<{
    title: string
    detail: string
    badge: string
    tone: 'destructive' | 'warning' | 'success' | 'info'
    icon: typeof AlertTriangle
  }>

  const metrics = [
    {
      label: 'Current Huddle',
      value: currentDraft ? 'Draft' : currentPublished ? 'Published' : 'None',
      detail: currentDraft?.date_range || currentPublished?.date_range || 'No active huddle found',
      tone: currentDraft ? 'warning' : currentPublished ? 'success' : 'info',
    },
    {
      label: 'Action Completion',
      value: `${completionPercent}%`,
      detail: `${completeActions} of ${Math.max(totalActions, 1)} checklist states complete`,
      tone: completionPercent < 50 ? 'destructive' : completionPercent < 80 ? 'warning' : 'success',
    },
    {
      label: 'Volunteer Gaps',
      value: `${openVolunteerSlots}`,
      detail: `${volunteerSlots?.length || 0} slots currently tracked`,
      tone: openVolunteerSlots > 0 ? 'warning' : 'success',
    },
    {
      label: 'Families Missing Setup',
      value: `${pendingInvitations}`,
      detail: `${families?.length || 0} families in system`,
      tone: pendingInvitations > 0 ? 'info' : 'success',
    },
  ]

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
            <Badge className="hidden bg-white/15 text-white md:inline-flex">Live Supabase</Badge>
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
                  item.href === '/admin' ? 'bg-falcon-700 text-white' : 'text-ink-700 hover:bg-white hover:text-ink-950'
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
                <Badge variant={currentDraft ? 'warning' : 'success'}>
                  {currentDraft ? 'Draft waiting' : 'Published is current'}
                </Badge>
                <Badge variant={openVolunteerSlots > 0 ? 'destructive' : 'success'}>
                  {openVolunteerSlots > 0 ? `${openVolunteerSlots} open volunteer gaps` : 'Volunteer coverage healthy'}
                </Badge>
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
                {workQueue.length > 0 ? (
                  workQueue.map((item) => (
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
                  ))
                ) : (
                  <div className="rounded-lg border border-ink-200 p-3 text-sm text-ink-600">
                    No urgent admin gaps right now.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current draft</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-bold text-ink-950">
                      {currentDraft ? `Weekly Huddle | ${currentDraft.date_range}` : 'No active draft'}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">
                      {currentDraft
                        ? `${draftSectionCount} sections saved for the current draft.`
                        : 'Create a draft to start shaping the next family update.'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gold-100 p-3 text-sm leading-6 text-amber-950">
                    {nextEventMissingDetails[0]
                      ? `${nextEventMissingDetails[0].title} still needs fuller logistics before publish.`
                      : 'No obvious event-detail gaps were detected.'}
                  </div>
                  <Link href="/admin/huddles/new">
                    <Button className="w-full">{currentDraft ? 'Continue Editing' : 'Start Draft'}</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Events needing details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nextEventMissingDetails.slice(0, 3).length > 0 ? (
                    nextEventMissingDetails.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-2 text-sm leading-5 text-ink-700">
                        <AlertTriangle size={15} className="mt-0.5 shrink-0 text-gold-500" />
                        <span>{event.title}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-ink-600">No event-detail gaps detected.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
