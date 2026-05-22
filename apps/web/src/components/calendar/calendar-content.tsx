'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Bus,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Shirt,
  CalendarDays,
} from 'lucide-react'
import type { CalendarEvent, CalendarEventType } from '@gridiron/shared'
import { Badge, type BadgeProps } from '@/components/ui/badge'
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

function eventBadge(type: CalendarEventType): NonNullable<BadgeProps['variant']> {
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
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')
  const featured = events.find((event) => event.event_type === 'camp') || events[0]
  const filteredEvents = events.filter((event) => {
    if (activeFilter === 'Deadlines') return event.event_type === 'deadline'
    if (activeFilter === 'Varsity') return event.audience_label.toLowerCase().includes('varsity')
    if (activeFilter === 'JV') return event.audience_label.toLowerCase().includes('jv')
    if (activeFilter === 'C-Team') return event.audience_label.toLowerCase().includes('c-team') || event.audience_label.toLowerCase().includes('c team')
    return true
  })

  return (
    <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
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
            <p className="brand-kicker">Calendar</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Upcoming logistics</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
              A working agenda for key deadlines, football activities, camp, and travel windows.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={16} className="shrink-0 text-ink-500" />
            {filters.map((filter) => (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant={filter === activeFilter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/schedule/${event.id}`}
                  className="flex min-h-16 gap-3 rounded-lg border border-ink-200 p-3 transition-colors hover:bg-ink-50"
                >
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-xs font-bold uppercase text-ink-500">{dayLabel(event)}</p>
                    <p className="text-sm font-bold text-ink-950">{event.display_date}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-ink-950">{event.title}</h2>
                      <Badge variant={eventBadge(event.event_type)}>{eventTypeLabel(event.event_type)}</Badge>
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
              {filteredEvents.length === 0 && (
                <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                  No events match this filter right now.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          {featured && (
            <Card>
              <CardHeader>
                <p className="brand-kicker">Featured event</p>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <Badge variant={eventBadge(featured.event_type)}>{eventTypeLabel(featured.event_type)}</Badge>
                  <Badge variant="outline">{featured.audience_label}</Badge>
                </div>
                <CardTitle className="mt-1">{featured.title}</CardTitle>
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
              <p className="brand-kicker">Planning note</p>
              <CardTitle className="mt-1">{publishedSection?.title || 'Calendar note'}</CardTitle>
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
  )
}
