'use client'

import Link from 'next/link'
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Clock,
  Home,
  MapPin,
  Menu,
  Plus,
  Utensils,
  Users,
} from 'lucide-react'
import type { VolunteerCenterModel, VolunteerCategory } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VolunteerContentProps {
  model: VolunteerCenterModel
}

const filters = ['All', 'Game day', 'Meals', 'Camp', 'Fundraising']

const navItems = [
  { label: 'Huddle', href: '/', icon: Home },
  { label: 'Actions', href: '/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/schedule', icon: CalendarDays },
  { label: 'Volunteer', href: '/volunteers', icon: Users },
  { label: 'More', href: '/profile', icon: Menu },
]

function categoryLabel(category: VolunteerCategory) {
  switch (category) {
    case 'game_day':
      return 'Game day'
    case 'meals':
      return 'Meals'
    case 'camp':
      return 'Camp'
    case 'travel':
      return 'Travel'
    case 'fundraising':
      return 'Fundraising'
    case 'events':
      return 'Events'
    case 'other':
      return 'Other'
  }
}

export function VolunteerContent({ model }: VolunteerContentProps) {
  const remaining = Math.max(model.volunteer_hours_goal - model.volunteer_hours_complete, 0)
  const percent =
    model.volunteer_hours_goal === 0
      ? 0
      : Math.min(Math.round((model.volunteer_hours_complete / model.volunteer_hours_goal) * 100), 100)

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <p className="text-base font-bold leading-5">Volunteer</p>
              <p className="text-xs text-white/75">Family hours and open roles</p>
            </div>
          </div>
          <Badge className="hidden bg-white/15 text-white md:inline-flex">
            {model.volunteer_hours_complete} of {model.volunteer_hours_goal} hours
          </Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="success">{model.volunteer_hours_complete} hours credited</Badge>
              <Badge variant="warning">{remaining} hours remaining</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">Volunteer opportunities</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
              Track your family&apos;s volunteer progress and claim roles that help the program run.
            </p>
          </div>

          <Card>
            <CardContent className="pt-4 sm:pt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold text-ink-950">Family volunteer progress</span>
                <span className="text-ink-600">
                  {model.volunteer_hours_complete} of {model.volunteer_hours_goal} hours
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-100">
                <div className="h-2 rounded-full bg-gold-500" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 text-sm leading-5 text-ink-600">
                The program asks families to consider at least {model.volunteer_hours_goal} volunteer hours each season.
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <Button key={filter} size="sm" variant={filter === 'All' ? 'default' : 'outline'}>
                {filter}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Open roles</CardTitle>
                <p className="text-sm text-ink-600">Claim a role or contact the coordinator with questions.</p>
              </div>
              <Button size="sm" variant="outline" className="hidden md:inline-flex">
                <Plus size={15} className="mr-1" />
                Interest
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {model.slots.map((slot) => {
                const openSlots = Math.max(slot.slots_needed - slot.slots_filled, 0)

                return (
                  <div key={slot.id} className="rounded-lg border border-ink-200 p-3">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-ink-950">{slot.title}</h2>
                          <Badge variant="outline">{categoryLabel(slot.category)}</Badge>
                          <Badge variant="success">{slot.hour_credit} hr credit</Badge>
                        </div>
                        {slot.description && (
                          <p className="mt-1 text-sm leading-5 text-ink-600">{slot.description}</p>
                        )}
                      </div>
                      <Button size="sm" className="w-full md:w-auto">Sign Up</Button>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-ink-600 sm:grid-cols-2 lg:grid-cols-4">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {slot.display_date || 'Date TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {slot.display_time || 'Time TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {slot.location || 'Location TBD'}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-ink-700">
                        <Users size={14} />
                        {openSlots} slots open
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Claimed shifts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {model.claimed_shifts.map((shift) => (
                <div key={shift.id} className="flex gap-3 rounded-lg border border-ink-200 p-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-falcon-700" />
                  <div>
                    <p className="font-bold text-ink-950">{shift.title}</p>
                    <p className="mt-1 text-sm text-ink-600">
                      {shift.date_label} | {shift.hours_credited} hr credited
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordinator notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-600">
              <p>
                Volunteer needs will grow as spring football, camp, and game day planning get closer.
              </p>
              <div className="rounded-lg bg-falcon-50 p-3 text-falcon-950">
                <div className="mb-1 flex items-center gap-2 font-bold">
                  <Utensils size={16} />
                  Meals and concessions
                </div>
                <p>Team parent leads will publish more specific slots after schedules are finalized.</p>
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
                item.href === '/volunteers' ? 'text-falcon-700' : 'text-ink-500'
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
