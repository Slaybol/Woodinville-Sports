'use client'

import Link from 'next/link'
import {
  Bus,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Filter,
  Home,
  MapPin,
  Menu,
  Shirt,
  Users,
} from 'lucide-react'
import type { CalendarEvent, CalendarEventType } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CalendarContentProps {
  events: CalendarEvent[]
  publishedSection?: {
    title: string
    body: string
  }
  dataState?: {
    source: 'supabase' | 'demo'
    reason?: string
  }
}

const filters = ['All', 'Varsity', 'JV', 'C-Team', 'Deadlines']

const navItems = [
  { label: 'Huddle', href: '/', icon: Home },
  { label: 'Actions', href: '/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/schedule', icon: CalendarDays },
  { label: 'Volunteer', href: '/volunteers', icon: Users },
  { label: 'More', href: '/profile', icon: Menu },
]

function eventBadge(type: CalendarEventType) {
  if (type === 'deadline') return 'warning'
  if (type === 'camp') return 'info'
  if (type === 'practice') return 'success'
  return 'outline'
}

function eventTypeLabel(type: CalendarEventType) {
  switch (type) {
    case 'deadline':
      return 'Deadline'
    case 'practice':
      return 'Practice'
    case 'game':
      return 'Game'
    case 'meeting':
      return 'Meeting'
    case 'camp':
      return 'Camp'
    case 'travel':
      return 'Travel'
    case 'fundraiser':
      return 'Fundraiser'
    case 'social':
      return 'Social'
    case 'other':
      return 'Other'
  }
}

function dayLabel(event: CalendarEvent) {
  if (event.display_date === 'May 26') return 'Tue'
  if (event.display_date === 'Jun 1') return 'Mon'
  if (event.display_date === 'Jun 3') return 'Wed'
  if (event.display_date === 'Jun 20') return 'Sat'
  if (event.display_date === 'Jul 27') return 'Mon'
  return 'Date'
}

export function CalendarContent({ events, publishedSection, dataState }: CalendarContentProps) {
  const featured = events.find((event) => event.event_type === 'camp') || events[0]

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <p className="text-base font-bold leading-5">Calendar</p>
              <p className="text-xs text-white/75">Practices, deadlines, camps, and travel</p>
            </div>
          </div>
          <Badge className="hidden bg-white/15 text-white md:inline-flex">Updated May 17</Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="space-y-6">
          {dataState && (
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={dataState.source === 'supabase' ? 'bg-falcon-100 text-falcon-900' : 'bg-gold-100 text-amber-950'}>
                {dataState.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
              </Badge>
              {dataState.reason && dataState.source === 'demo' && (
                <span className="text-sm text-ink-600">{dataState.reason}</span>
              )}
            </div>
          )}

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline">Coach calendar</Badge>
              <Badge variant="success">2026 season</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">Upcoming logistics</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
              A working agenda for key deadlines, football activities, camp, and travel windows.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={16} className="shrink-0 text-ink-500" />
            {filters.map((filter) => (
              <Button key={filter} size="sm" variant={filter === 'All' ? 'default' : 'outline'}>
                {filter}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/schedule?event=${encodeURIComponent(event.title)}`}
                  className="flex min-h-16 gap-3 rounded-lg border border-ink-200 p-3 transition-colors hover:bg-ink-50"
                >
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-xs font-bold uppercase text-ink-500">{dayLabel(event)}</p>
                    <p className="text-sm font-bold text-ink-950">{event.display_date}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-ink-950">{event.title}</h2>
                      <Badge variant={eventBadge(event.event_type) as any}>{eventTypeLabel(event.event_type)}</Badge>
                      <Badge variant="outline">{event.audience_label}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-600">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.display_time || 'Time TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location || 'Location TBD'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="mt-1 shrink-0 text-ink-400" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          {featured && (
            <Card>
              <CardHeader>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge variant={eventBadge(featured.event_type) as any}>{eventTypeLabel(featured.event_type)}</Badge>
                  <Badge variant="outline">{featured.audience_label}</Badge>
                </div>
                <CardTitle>{featured.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="mt-0.5 text-ink-500" />
                    <div>
                      <p className="font-bold text-ink-950">Date</p>
                      <p className="text-ink-600">{featured.display_date || 'Date TBD'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="mt-0.5 text-ink-500" />
                    <div>
                      <p className="font-bold text-ink-950">Time</p>
                      <p className="text-ink-600">{featured.display_time || 'Time TBD'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 text-ink-500" />
                    <div>
                      <p className="font-bold text-ink-950">Location</p>
                      <p className="text-ink-600">{featured.location || 'Location TBD'}</p>
                    </div>
                  </div>
                  {featured.arrival_time && (
                    <div className="flex items-start gap-3">
                      <Bus size={18} className="mt-0.5 text-ink-500" />
                      <div>
                        <p className="font-bold text-ink-950">Travel</p>
                        <p className="text-ink-600">{featured.arrival_time}</p>
                      </div>
                    </div>
                  )}
                  {featured.uniform_note && (
                    <div className="flex items-start gap-3">
                      <Shirt size={18} className="mt-0.5 text-ink-500" />
                      <div>
                        <p className="font-bold text-ink-950">Gear</p>
                        <p className="text-ink-600">{featured.uniform_note}</p>
                      </div>
                    </div>
                  )}
                </div>

                {featured.notes && (
                  <div className="rounded-lg bg-falcon-50 p-3">
                    <p className="text-sm leading-6 text-falcon-950">{featured.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>{publishedSection?.title || 'Calendar note'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-ink-600">
                {publishedSection?.body ||
                  'The coach calendar will continue to change throughout the season. Use the digital version as the source of truth.'}
              </p>
              <div className="mt-4 rounded-lg border border-ink-200 p-3 text-sm">
                <p className="font-bold text-ink-950">Suggested travel window</p>
                <p className="mt-1 text-ink-600">July 27-August 7, 2026</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                item.href === '/schedule' ? 'text-falcon-700' : 'text-ink-500'
              }`}
            >
              <item.icon size={21} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
