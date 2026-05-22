import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { deleteVolunteerSlot, saveVolunteerSlot } from './actions'

export default async function AdminVolunteersPage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string; status?: string; message?: string }>
}) {
  const params = (await searchParams) || {}
  const supabase = await createClient()
  const [{ data: slots }, { data: signups }, { data: teams }, { data: events }] = await Promise.all([
    supabase.from('volunteer_slots').select('*').order('starts_at', { ascending: true, nullsFirst: false }),
    supabase.from('volunteer_signups').select('*').eq('status', 'confirmed'),
    supabase.from('teams').select('id, name, season').order('name'),
    supabase.from('events').select('id, title').order('starts_at', { ascending: true, nullsFirst: false }),
  ])
  const editItem = (slots || []).find((item) => item.id === params.edit) || null
  const openGapCount = (slots || []).reduce((sum, slot) => {
    const filled = (signups || []).filter((signup) => signup.slot_id === slot.id).length
    return sum + Math.max(slot.slots_needed - filled, 0)
  }, 0)

  return (
    <AdminShell
      activeNav="volunteers"
      title="Volunteer Manager"
      description="Publish volunteer roles, track open coverage, and keep hour-credit expectations visible."
      badge={
        params.status === 'saved'
          ? 'Volunteer saved'
          : params.status === 'deleted'
            ? 'Volunteer deleted'
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
            <p className="text-sm font-bold text-ink-600">Volunteer slots</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{slots?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Confirmed signups</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{signups?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Open gaps</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{openGapCount}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{editItem ? 'Edit volunteer slot' : 'Create volunteer slot'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveVolunteerSlot} className="space-y-4">
              <input type="hidden" name="slot_id" value={editItem?.id || ''} />
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Title</span>
                <input name="title" defaultValue={editItem?.title || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Description</span>
                <textarea name="description" defaultValue={editItem?.description || ''} className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Category</span>
                <select name="category" defaultValue={editItem?.category || 'other'} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  {['game_day', 'meals', 'camp', 'travel', 'fundraising', 'events', 'other'].map((category) => (
                    <option key={category} value={category}>{category}</option>
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
                <span className="text-sm font-bold text-ink-700">Linked event</span>
                <select name="event_id" defaultValue={editItem?.event_id || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option value="">No linked event</option>
                  {(events || []).map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
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
                <span className="text-sm font-bold text-ink-700">Slots needed</span>
                <input type="number" min="1" name="slots_needed" defaultValue={editItem?.slots_needed || 1} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Hour credit</span>
                <input type="number" min="0" step="0.5" name="hour_credit" defaultValue={editItem?.hour_credit || 0} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <Button type="submit" className="w-full">{editItem ? 'Save changes' : 'Create volunteer slot'}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open volunteer needs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(slots || []).map((slot) => {
              const filled = (signups || []).filter((signup) => signup.slot_id === slot.id).length
              const openCount = Math.max(slot.slots_needed - filled, 0)

              return (
                <div key={slot.id} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-ink-950">{slot.title}</h2>
                        <Badge variant="outline">{slot.category}</Badge>
                        <Badge variant={openCount > 0 ? 'warning' : 'success'}>{openCount} open</Badge>
                      </div>
                      {slot.description && <p className="mt-2 text-sm leading-6 text-ink-600">{slot.description}</p>}
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-600">
                        <span>{slot.display_date || 'Date TBD'}</span>
                        <span>{slot.display_time || 'Time TBD'}</span>
                        <span>{slot.location || 'Location TBD'}</span>
                        <span>{filled} confirmed</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/volunteers?edit=${slot.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil size={14} className="mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <form action={deleteVolunteerSlot}>
                        <input type="hidden" name="slot_id" value={slot.id} />
                        <Button size="sm" variant="outline">
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              )
            })}

            {(!slots || slots.length === 0) && (
              <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                No volunteer slots exist yet. Create one to populate the parent Volunteer screen.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}
