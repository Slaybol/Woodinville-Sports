'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  Filter,
} from 'lucide-react'
import type { ActionCenterModel, ActionItem, ActionStatus } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ActionCenterContentProps {
  model: ActionCenterModel
  preview?: boolean
  onUpdateStatus?: (formData: FormData) => void | Promise<void>
  dataState?: {
    source: 'supabase' | 'demo'
    reason?: string
  }
}

const filters = ['All', 'Required', 'Due soon', 'Complete']

function statusLabel(status: ActionStatus) {
  switch (status) {
    case 'not_started':
      return 'Not started'
    case 'in_progress':
      return 'In progress'
    case 'complete':
      return 'Complete'
    case 'waived':
      return 'Waived'
    case 'not_applicable':
      return 'Not applicable'
  }
}

function isUrgent(action: ActionItem, status: ActionStatus) {
  return status !== 'complete' && (action.due_label === 'Past due' || action.title === 'FinalForms Registration')
}

function isDueSoon(action: ActionItem, status: ActionStatus) {
  return status !== 'complete' && action.due_label?.startsWith('Due')
}

function getTone(action: ActionItem, status: ActionStatus) {
  if (status === 'complete') {
    return {
      icon: CheckCircle2,
      iconClass: 'bg-falcon-100 text-falcon-800',
      badge: 'success' as const,
    }
  }

  if (isUrgent(action, status)) {
    return {
      icon: AlertTriangle,
      iconClass: 'bg-statusRed-100 text-statusRed-600',
      badge: 'destructive' as const,
    }
  }

  if (isDueSoon(action, status)) {
    return {
      icon: Clock,
      iconClass: 'bg-gold-100 text-amber-900',
      badge: 'warning' as const,
    }
  }

  return {
    icon: FileCheck2,
    iconClass: 'bg-statusBlue-100 text-statusBlue-600',
    badge: 'info' as const,
  }
}

function importanceLabel(action: ActionItem) {
  if (action.importance === 'family') return 'Family'
  if (action.importance === 'required') return 'Required'
  if (action.importance === 'optional') return 'Optional'
  return 'Info'
}

export function ActionCenterContent({ model, preview = false, onUpdateStatus, dataState }: ActionCenterContentProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All')
  const urgentCount = model.items.filter(({ action, status }) => isUrgent(action, status.status)).length
  const dueSoonCount = model.items.filter(({ action, status }) => isDueSoon(action, status.status)).length
  const percent =
    model.progress.action_items_total === 0
      ? 0
      : Math.round((model.progress.action_items_complete / model.progress.action_items_total) * 100)
  const filteredItems = model.items.filter(({ action, status }) => {
    if (activeFilter === 'Required') {
      return action.importance === 'required' || action.importance === 'family'
    }
    if (activeFilter === 'Due soon') {
      return isUrgent(action, status.status) || isDueSoon(action, status.status)
    }
    if (activeFilter === 'Complete') {
      return status.status === 'complete'
    }
    return true
  })

  return (
    <main className="mx-auto max-w-[460px] px-4 py-6">
        {dataState && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge className={dataState.source === 'supabase' ? 'bg-falcon-100 text-falcon-900' : 'bg-gold-100 text-amber-950'}>
              {dataState.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
            </Badge>
            {dataState.reason && dataState.source === 'demo' && (
              <span className="text-sm text-ink-600">{dataState.reason}</span>
            )}
          </div>
        )}

        <section className="mb-6 grid gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="destructive">{urgentCount} urgent</Badge>
              <Badge variant="warning">{dueSoonCount} due soon</Badge>
            </div>
            <p className="brand-kicker">Action Center</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">What your family needs to do</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
              Required, optional, and completed items for the {model.family.name}.
            </p>
          </div>

          <Card>
            <CardContent className="pt-4 sm:pt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold text-ink-950">Checklist progress</span>
                <span className="text-ink-600">{percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-ink-100">
                <div className="h-2 rounded-full bg-falcon-700" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 text-sm leading-5 text-ink-600">
                {model.progress.action_items_total - model.progress.action_items_complete} items still need attention.
              </p>
            </CardContent>
          </Card>
        </section>

        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
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
          <CardContent className="space-y-3 pt-4 sm:pt-5">
            {filteredItems.map(({ action, status }) => {
              const tone = getTone(action, status.status)
              const Icon = tone.icon

              return (
                <div key={action.id} className="flex min-h-16 flex-col gap-3 rounded-lg border border-ink-200 p-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${tone.iconClass}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-ink-950">{action.title}</h2>
                      <Badge variant={tone.badge}>{statusLabel(status.status)}</Badge>
                      <Badge variant="outline">{importanceLabel(action)}</Badge>
                    </div>
                    {action.description && (
                      <p className="mt-1 text-sm leading-5 text-ink-600">{action.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-ink-600">
                      <span>Due: {action.due_label || 'No due date'}</span>
                      <span className="text-ink-300">|</span>
                      <span>{action.audience_label}</span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    {onUpdateStatus && !preview && (
                      <form action={onUpdateStatus}>
                        <input type="hidden" name="family_id" value={status.family_id} />
                        <input type="hidden" name="action_item_id" value={action.id} />
                        <input
                          type="hidden"
                          name="next_status"
                          value={status.status === 'complete' ? 'not_started' : 'complete'}
                        />
                        <Button variant={status.status === 'complete' ? 'outline' : 'default'} size="sm" className="w-full">
                          {status.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                        </Button>
                      </form>
                    )}

                    {action.external_url ? (
                      <a href={action.external_url} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm" className="w-full">
                          Open Link
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </a>
                    ) : (
                      <div className="rounded-md border border-ink-200 px-3 py-2 text-center text-xs font-bold text-ink-500">
                        No external link
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            {filteredItems.length === 0 && (
              <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                No action items match this filter right now.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
  )
}
