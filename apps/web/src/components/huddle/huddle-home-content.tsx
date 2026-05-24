'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Trophy,
} from 'lucide-react'
import type { ActionItem, HuddleHomeModel } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HuddleHomeContentProps {
  model: HuddleHomeModel
  preview?: boolean
}

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
  const actionSection = model.sections.find((section) => section.section_type === 'actions')
  const calendarSection = model.sections.find((section) => section.section_type === 'calendar')
  const volunteerSection = model.sections.find((section) => section.section_type === 'volunteer')
  const highlights = (model.sections.find((section) => section.section_type === 'highlights')?.metadata
    .highlights || []) as string[]
  const actionCompletionPercent =
    family_progress && family_progress.action_items_total > 0
      ? Math.round((family_progress.action_items_complete / family_progress.action_items_total) * 100)
      : 0
  const volunteerCompletionPercent =
    family_progress && family_progress.volunteer_hours_goal > 0
      ? Math.min(Math.round((family_progress.volunteer_hours_complete / family_progress.volunteer_hours_goal) * 100), 100)
      : 0

  return (
    <main className="mx-auto max-w-[460px] px-4 py-6">
      <section className="grid gap-4">
        <div className="rounded-xl border border-ink-200 bg-white px-5 py-5 shadow-card sm:px-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="success">Published</Badge>
            <Badge variant="outline">{huddle.date_range.replace(', 2026', '')}</Badge>
            {preview && <Badge variant="info">Preview</Badge>}
          </div>
          <p className="brand-kicker">This Week&apos;s Huddle</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950 sm:text-[2.8rem]">
            {huddle.title}
          </h1>
          {huddle.summary && (
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-ink-700">{huddle.summary}</p>
          )}
        </div>

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
                  <div className="h-2 rounded-full bg-falcon-700" style={{ width: `${actionCompletionPercent}%` }} />
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
                  <div className="h-2 rounded-full bg-gold-500" style={{ width: `${volunteerCompletionPercent}%` }} />
                </div>
              </div>
              <div className="rounded-lg bg-ink-50 p-3 text-sm leading-6 text-ink-700">
                Your weekly command center should make deadlines and logistics obvious at a glance.
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="mt-6 grid gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <p className="brand-kicker">Actions</p>
                <CardTitle className="mt-1">{actionSection?.title || "This Week's Playbook"}</CardTitle>
                <p className="text-sm text-ink-600">{actionSection?.body || 'Required family action items and deadlines.'}</p>
              </div>
              <Link href="/actions">
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {urgent_actions.map((action) => (
                <div
                  key={action.id}
                  className="flex min-h-16 items-start gap-3 rounded-lg border border-ink-200 bg-white px-3 py-3"
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${actionTone(action)}`}>
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
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-falcon-700 hover:bg-falcon-50"
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
              <p className="brand-kicker">Program</p>
              <CardTitle className="mt-1">Program Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 text-sm leading-6 text-ink-700">
                  <Trophy size={17} className="mt-1 shrink-0 text-gold-500" />
                  <p className="font-editorial text-[15px] leading-7 text-ink-700">{highlight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <p className="brand-kicker">Calendar</p>
                <CardTitle className="mt-1">{calendarSection?.title || 'This Week'}</CardTitle>
                <p className="text-sm text-ink-600">{calendarSection?.body || 'Trusted logistics and schedule details for the week ahead.'}</p>
              </div>
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
              <div>
                <p className="brand-kicker">Volunteer</p>
                <CardTitle className="mt-1">{volunteerSection?.title || 'Volunteer Needs'}</CardTitle>
                <p className="text-sm text-ink-600">{volunteerSection?.body || 'Open roles and volunteer opportunities for families.'}</p>
              </div>
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
      </section>
    </main>
  )
}
