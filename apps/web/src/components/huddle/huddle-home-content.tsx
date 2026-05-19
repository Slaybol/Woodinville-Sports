'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock,
  ExternalLink,
  Home,
  MapPin,
  Menu,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'
import type { ActionItem, HuddleHomeModel } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HuddleHomeContentProps {
  model: HuddleHomeModel
  preview?: boolean
}

const navItems = [
  { label: 'Huddle', href: '/', previewHref: '/preview/huddle', icon: Home },
  { label: 'Actions', href: '/actions', previewHref: '/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/schedule', previewHref: '/schedule', icon: CalendarDays },
  { label: 'Volunteer', href: '/volunteers', previewHref: '/volunteers', icon: Users },
  { label: 'More', href: '/profile', previewHref: '/profile', icon: Menu },
]

function isUrgentAction(action: ActionItem) {
  return action.due_label === 'Past due' || action.title === 'FinalForms Registration'
}

function actionIcon(action: ActionItem) {
  return isUrgentAction(action) ? <AlertTriangle size={17} /> : <Clock size={17} />
}

function actionTone(action: ActionItem) {
  return isUrgentAction(action)
    ? 'bg-statusRed-100 text-statusRed-600'
    : 'bg-gold-100 text-amber-900'
}

function actionBadge(action: ActionItem) {
  return isUrgentAction(action) ? 'destructive' : 'warning'
}

function eventLabel(eventTitle: string) {
  if (eventTitle.includes('deadline')) return 'Deadline'
  if (eventTitle.includes('Camp')) return 'Camp'
  return 'Practice'
}

function eventDay(displayDate?: string | null) {
  if (displayDate === 'May 26') return 'Tue'
  if (displayDate === 'Jun 1') return 'Mon'
  if (displayDate === 'Jun 20') return 'Sat'
  return 'Date'
}

export function HuddleHomeContent({ model, preview = false }: HuddleHomeContentProps) {
  const { huddle, urgent_actions, upcoming_events, volunteer_needs, family_progress } = model
  const highlights = (model.sections.find((section) => section.section_type === 'highlights')?.metadata
    .highlights || []) as string[]
  const primaryUrgent = urgent_actions[0]
  const huddleHref = preview ? '/preview/huddle' : '/'

  return (
    <>
      <nav className="hidden border-b border-ink-200 bg-white md:block">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-2 px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={preview ? item.previewHref : item.href}
              className="flex h-9 items-center gap-2 rounded-md px-3 text-sm font-bold text-ink-700 hover:bg-ink-100 hover:text-ink-950"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="success">Published</Badge>
              <Badge variant="outline">{huddle.date_range.replace(', 2026', '')}</Badge>
              {preview && <Badge variant="info">Preview</Badge>}
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">{huddle.title}</h1>
            {huddle.summary && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">{huddle.summary}</p>
            )}
          </div>

          {primaryUrgent && (
            <Card className="border-statusRed-100 bg-red-50">
              <CardContent className="pt-4 sm:pt-5">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 shrink-0 text-statusRed-600" size={20} />
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <p className="font-bold text-statusRed-600">Urgent: {primaryUrgent.title}</p>
                      {primaryUrgent.due_label && <Badge variant="destructive">{primaryUrgent.due_label}</Badge>}
                    </div>
                    <p className="text-sm leading-6 text-red-900">{primaryUrgent.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>This Week&apos;s Playbook</CardTitle>
                <p className="text-sm text-ink-600">Required family action items and deadlines.</p>
              </div>
              <Link href="/actions" className="hidden md:block">
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgent_actions.map((action) => (
                <div
                  key={action.id}
                  className="flex min-h-16 items-start gap-3 rounded-lg border border-ink-200 bg-white p-3"
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${actionTone(action)}`}>
                    {actionIcon(action)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-ink-950">{action.title}</p>
                      {action.due_label && <Badge variant={actionBadge(action)}>{action.due_label}</Badge>}
                      <Badge variant="outline">{action.importance === 'family' ? 'Family' : 'Required'}</Badge>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-ink-600">{action.description}</p>
                  </div>
                  {action.external_url && (
                    <a
                      href={action.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-falcon-700 hover:bg-falcon-50 md:flex"
                      aria-label={`Open ${action.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-sm leading-6 text-ink-700">
                  <Trophy size={17} className="mt-1 shrink-0 text-gold-500" />
                  <p>{highlight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          {family_progress && (
            <Card>
              <CardHeader>
                <CardTitle>Family Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-ink-950">Action items</span>
                    <span className="text-ink-600">
                      {family_progress.action_items_complete} of {family_progress.action_items_total} complete
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-100">
                    <div
                      className="h-2 rounded-full bg-falcon-700"
                      style={{
                        width: `${(family_progress.action_items_complete / family_progress.action_items_total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-bold text-ink-950">Volunteer hours</span>
                    <span className="text-ink-600">
                      {family_progress.volunteer_hours_complete} of {family_progress.volunteer_hours_goal} hours
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-100">
                    <div
                      className="h-2 rounded-full bg-gold-500"
                      style={{
                        width: `${(family_progress.volunteer_hours_complete / family_progress.volunteer_hours_goal) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>This Week</CardTitle>
              <Link href="/schedule" className="text-sm font-bold text-falcon-700">
                Calendar
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming_events.map((event) => (
                <div key={event.id} className="flex gap-3 rounded-lg border border-ink-200 p-3">
                  <div className="w-12 shrink-0 text-center">
                    <p className="text-xs font-bold uppercase text-ink-500">{eventDay(event.display_date)}</p>
                    <p className="text-sm font-bold text-ink-950">{event.display_date}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-ink-950">{event.title}</p>
                      <Badge variant={event.event_type === 'deadline' ? 'warning' : 'info'}>
                        {eventLabel(event.title)}
                      </Badge>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-sm text-ink-600">
                      <MapPin size={14} />
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Volunteer Needs</CardTitle>
              <Link href="/volunteers" className="text-sm font-bold text-falcon-700">
                Open slots
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {volunteer_needs.map((need) => (
                <div key={need.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 p-3">
                  <div>
                    <p className="font-bold text-ink-950">{need.title}</p>
                    <p className="text-sm text-ink-600">{need.slots_needed} slots open</p>
                  </div>
                  <Badge variant="success">{need.hour_credit} hr credit</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-falcon-50">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 shrink-0 text-falcon-700" size={20} />
                <div>
                  <p className="font-bold text-falcon-950">Coach calendar password</p>
                  <p className="mt-1 text-sm leading-6 text-falcon-900">
                    The coach calendar lives on the public site and uses password Falcons2026.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => {
            const href = preview ? item.previewHref : item.href
            return (
              <Link
                key={item.label}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                  href === huddleHref ? 'text-falcon-700' : 'text-ink-500'
                }`}
              >
                <item.icon size={21} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
