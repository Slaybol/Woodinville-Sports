import Link from 'next/link'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { deleteActionItem, saveActionItem } from './actions'

function toneForImportance(importance: string): NonNullable<BadgeProps['variant']> {
  if (importance === 'required') return 'destructive'
  if (importance === 'family') return 'warning'
  if (importance === 'info') return 'info'
  return 'outline'
}

export default async function AdminActionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string; status?: string; message?: string }>
}) {
  const params = (await searchParams) || {}
  const supabase = await createClient()
  const [
    { data: actions },
    { data: huddles },
    { data: teams },
    { data: statuses },
  ] = await Promise.all([
    supabase.from('action_items').select('*').order('created_at', { ascending: false }),
    supabase.from('huddles').select('id, date_range, status').order('starts_on', { ascending: false, nullsFirst: false }),
    supabase.from('teams').select('id, name, season').order('name'),
    supabase.from('family_action_status').select('action_item_id, status'),
  ])

  const editItem = (actions || []).find((item) => item.id === params.edit) || null
  const incompleteCount = (statuses || []).filter((status) => status.status !== 'complete').length
  const linkedCount = (actions || []).filter((item) => item.huddle_id).length

  return (
    <AdminShell
      activeNav="actions"
      title="Action Manager"
      description="Create and maintain the checklist items families see in Action Center."
      badge={
        params.status === 'saved'
          ? 'Action saved'
          : params.status === 'deleted'
            ? 'Action deleted'
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
            <p className="text-sm font-bold text-ink-600">Checklist items</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{actions?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Still incomplete</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{incompleteCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-5">
            <p className="text-sm font-bold text-ink-600">Attached to huddles</p>
            <p className="mt-2 text-3xl font-display text-ink-950">{linkedCount}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{editItem ? 'Edit action item' : 'Create action item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveActionItem} className="space-y-4">
              <input type="hidden" name="action_id" value={editItem?.id || ''} />
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Title</span>
                <input name="title" defaultValue={editItem?.title || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Description</span>
                <textarea name="description" defaultValue={editItem?.description || ''} className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Importance</span>
                <select name="importance" defaultValue={editItem?.importance || 'required'} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option value="required">Required</option>
                  <option value="family">Family</option>
                  <option value="optional">Optional</option>
                  <option value="info">Info</option>
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Due date</span>
                <input type="datetime-local" name="due_at" defaultValue={editItem?.due_at ? String(editItem.due_at).slice(0, 16) : ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Due label</span>
                <input name="due_label" defaultValue={editItem?.due_label || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Audience label</span>
                <input name="audience_label" defaultValue={editItem?.audience_label || 'All families'} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Team</span>
                <select name="target_team_id" defaultValue={editItem?.target_team_id || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option value="">All program</option>
                  {(teams || []).map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.season})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Linked huddle</span>
                <select name="huddle_id" defaultValue={editItem?.huddle_id || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option value="">Standalone action</option>
                  {(huddles || []).map((huddle) => (
                    <option key={huddle.id} value={huddle.id}>
                      {huddle.date_range} ({huddle.status})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-bold text-ink-700">External URL</span>
                <input name="external_url" defaultValue={editItem?.external_url || ''} className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500" />
              </label>
              <Button type="submit" className="w-full">{editItem ? 'Save changes' : 'Create action item'}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current action items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(actions || []).map((item) => {
              const completionCount = (statuses || []).filter((status) => status.action_item_id === item.id && status.status === 'complete').length
              const totalCount = (statuses || []).filter((status) => status.action_item_id === item.id).length

              return (
                <div key={item.id} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-ink-950">{item.title}</h2>
                        <Badge variant={toneForImportance(item.importance)}>{item.importance}</Badge>
                        {item.due_label && <Badge variant="outline">{item.due_label}</Badge>}
                      </div>
                      {item.description && <p className="mt-2 text-sm leading-6 text-ink-600">{item.description}</p>}
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-600">
                        <span>{item.audience_label}</span>
                        <span>{totalCount > 0 ? `${completionCount} of ${totalCount} complete` : 'No family completions yet'}</span>
                        {item.external_url && (
                          <a href={item.external_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-falcon-700 hover:text-falcon-800">
                            <ExternalLink size={14} />
                            Link
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/actions?edit=${item.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil size={14} className="mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <form action={deleteActionItem}>
                        <input type="hidden" name="action_id" value={item.id} />
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

            {(!actions || actions.length === 0) && (
              <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                No action items exist yet. Create one to populate the parent Action Center.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}
