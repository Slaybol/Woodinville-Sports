import Link from 'next/link'
import { MapPin, Pencil, Trash2 } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { deleteEvent, saveEvent } from './actions'

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string; status?: string; message?: string }>
}) {
  const params = (await searchParams) || {}
  const supabase = await createClient()
  const [{ data: events }, { data: teams }] = await Promise.all([
    supabase.from('events').select('*').order('starts_at', { ascending: true, nullsFirst: false }),
    supabase.from('teams').select('id, name, season').order('name'),
  ])
  const editItem = (events || []).find((item) => item.id === params.edit) || null
  const missingDetailsCount = (events || []).filter((event) => !event.display_time || !event.location || !event.notes).length
  const canceledCount = (events || []).filter((event) => event.is_canceled).length

  return (
    <AdminShell
      activeNav="calendar"
      title="Calendar Manager"
      description="Maintain the trusted schedule families use for deadlines, logistics, and travel planning."
      badge={
        params.status === 'saved'
          ? 'Event saved'
          : params.status === 'deleted'
            ? 'Event deleted'
            : params.status === 'save_failed'
              ? 'Save failed'
              : 'Live Supabase'
      }
    >
      {params.message && (
        <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
          {params.message}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Tracked events</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{events?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Need logistics detail</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{missingDetailsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Canceled</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{canceledCount}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{editItem ? 'Edit event' : 'Create event'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveEvent} className="space-y-4">
              <input type="hidden" name="event_id" value={editItem?.id || ''} />
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Title</span>
                <input name="title" defaultValue={editItem?.title || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Event type</span>
                <select name="event_type" defaultValue={editItem?.event_type || 'other'} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  {['practice', 'game', 'meeting', 'camp', 'travel', 'deadline', 'fundraiser', 'social', 'other'].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Team</span>
                <select name="team_id" defaultValue={editItem?.team_id || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option value="">All program</option>
                  {(teams || []).map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.season})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Audience label</span>
                <input name="audience_label" defaultValue={editItem?.audience_label || 'All program'} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Starts at</span>
                <input type="datetime-local" name="starts_at" defaultValue={editItem?.starts_at ? String(editItem.starts_at).slice(0, 16) : ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Ends at</span>
                <input type="datetime-local" name="ends_at" defaultValue={editItem?.ends_at ? String(editItem.ends_at).slice(0, 16) : ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Display date</span>
                <input name="display_date" defaultValue={editItem?.display_date || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Display time</span>
                <input name="display_time" defaultValue={editItem?.display_time || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Location</span>
                <input name="location" defaultValue={editItem?.location || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Address</span>
                <input name="address" defaultValue={editItem?.address || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Arrival time</span>
                <input name="arrival_time" defaultValue={editItem?.arrival_time || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Bus time</span>
                <input name="bus_time" defaultValue={editItem?.bus_time || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Uniform note</span>
                <input name="uniform_note" defaultValue={editItem?.uniform_note || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Equipment note</span>
                <input name="equipment_note" defaultValue={editItem?.equipment_note || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Related URL</span>
                <input name="external_url" defaultValue={editItem?.external_url || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Notes</span>
                <textarea name="notes" defaultValue={editItem?.notes || ''} className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-ink-200 p-3 text-sm font-bold text-ink-700">
                <input type="checkbox" name="is_canceled" defaultChecked={Boolean(editItem?.is_canceled)} className="h-4 w-4 accent-falcon-700" />
                Mark event as canceled
              </label>
              <Button type="submit" className="w-full">{editItem ? 'Save changes' : 'Create event'}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(events || []).map((event) => (
              <div key={event.id} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-ink-950">{event.title}</h2>
                      <Badge variant={event.is_canceled ? 'destructive' : 'outline'}>{event.event_type}</Badge>
                      <Badge variant="success">{event.audience_label}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-ink-600">
                      <span>{event.display_date || 'Date TBD'}</span>
                      <span>{event.display_time || 'Time TBD'}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location || 'Location TBD'}
                      </span>
                    </div>
                    {event.notes && <p className="mt-2 text-sm leading-6 text-ink-600">{event.notes}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/calendar?edit=${event.id}`}>
                      <Button size="sm" variant="outline">
                        <Pencil size={14} className="mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <form action={deleteEvent}>
                      <input type="hidden" name="event_id" value={event.id} />
                      <Button size="sm" variant="outline">
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}

            {(!events || events.length === 0) && (
              <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                No events exist yet. Create one to populate the parent calendar.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}
