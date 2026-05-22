'use client'

import { useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
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
  preview?: boolean
  familyId?: string
  onToggleSignup?: (formData: FormData) => void | Promise<void>
  publishedSection?: {
    title: string
    body: string
  }
  dataState?: {
    source: 'supabase' | 'demo'
    reason?: string
  }
}

const filters = ['All', 'Game day', 'Meals', 'Camp', 'Fundraising']

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

export function VolunteerContent({
  model,
  preview = false,
  familyId,
  onToggleSignup,
  publishedSection,
  dataState,
}: VolunteerContentProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')
  const remaining = Math.max(model.volunteer_hours_goal - model.volunteer_hours_complete, 0)
  const percent =
    model.volunteer_hours_goal === 0
      ? 0
      : Math.min(Math.round((model.volunteer_hours_complete / model.volunteer_hours_goal) * 100), 100)
  const filteredSlots = model.slots.filter((slot) => {
    if (activeFilter === 'Game day') return slot.category === 'game_day'
    if (activeFilter === 'Meals') return slot.category === 'meals'
    if (activeFilter === 'Camp') return slot.category === 'camp'
    if (activeFilter === 'Fundraising') return slot.category === 'fundraising'
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
              <Badge variant="success">{model.volunteer_hours_complete} hours credited</Badge>
              <Badge variant="warning">{remaining} hours remaining</Badge>
            </div>
            <p className="brand-kicker">Volunteer</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Volunteer opportunities</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
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
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Open roles</CardTitle>
                <p className="text-sm text-ink-600">Claim a role or contact the coordinator with questions.</p>
              </div>
              <div className="inline-flex items-center rounded-md border border-ink-200 px-3 py-2 text-xs font-bold text-ink-500">
                Filter roles below
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredSlots.map((slot) => {
                const openSlots = Math.max(slot.slots_needed - slot.slots_filled, 0)
                const isSignedUp = familyId ? slot.signed_up_family_ids.includes(familyId) : false

                return (
                  <div key={slot.id} className="rounded-lg border border-ink-200 p-3">
                    <div className="flex flex-col gap-3">
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
                      {onToggleSignup && familyId && !preview ? (
                        <form action={onToggleSignup}>
                          <input type="hidden" name="family_id" value={familyId} />
                          <input type="hidden" name="slot_id" value={slot.id} />
                          <input type="hidden" name="hours_credited" value={slot.hour_credit} />
                          <input type="hidden" name="action_type" value={isSignedUp ? 'cancel' : 'signup'} />
                          <Button size="sm" variant={isSignedUp ? 'outline' : 'default'} className="w-full">
                            {isSignedUp ? 'Cancel' : 'Sign Up'}
                          </Button>
                        </form>
                      ) : (
                        <Button size="sm" className="w-full">Sign Up</Button>
                      )}
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-ink-600 sm:grid-cols-2">
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
              {filteredSlots.length === 0 && (
                <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                  No volunteer roles match this filter right now.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <p className="brand-kicker">Confirmed</p>
              <CardTitle className="mt-1">Claimed shifts</CardTitle>
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
              <p className="brand-kicker">Coordinator note</p>
              <CardTitle className="mt-1">{publishedSection?.title || 'Coordinator notes'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-600">
              <p>
                {publishedSection?.body || 'Volunteer needs will grow as spring football, camp, and game day planning get closer.'}
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
  )
}
