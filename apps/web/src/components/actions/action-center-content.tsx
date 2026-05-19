'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Clock,
  ExternalLink,
  FileCheck2,
  Filter,
  Home,
  Menu,
  Users,
} from 'lucide-react'
import type { ActionCenterModel, ActionItem, ActionStatus } from '@gridiron/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ActionCenterContentProps {
  model: ActionCenterModel
}

const filters = ['All', 'Required', 'Due soon', 'Complete']

const navItems = [
  { label: 'Huddle', href: '/', icon: Home },
  { label: 'Actions', href: '/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/schedule', icon: CalendarDays },
  { label: 'Volunteer', href: '/volunteers', icon: Users },
  { label: 'More', href: '/profile', icon: Menu },
]

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

export function ActionCenterContent({ model }: ActionCenterContentProps) {
  const urgentCount = model.items.filter(({ action, status }) => isUrgent(action, status.status)).length
  const dueSoonCount = model.items.filter(({ action, status }) => isDueSoon(action, status.status)).length
  const percent =
    model.progress.action_items_total === 0
      ? 0
      : Math.round((model.progress.action_items_complete / model.progress.action_items_total) * 100)

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <p className="text-base font-bold leading-5">Action Center</p>
              <p className="text-xs text-white/75">Family checklist and deadlines</p>
            </div>
          </div>
          <Badge className="hidden bg-white/15 text-white md:inline-flex">
            {model.progress.action_items_complete} of {model.progress.action_items_total} complete
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="destructive">{urgentCount} urgent</Badge>
              <Badge variant="warning">{dueSoonCount} due soon</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">What your family needs to do</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
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
            <Button key={filter} size="sm" variant={filter === 'All' ? 'default' : 'outline'}>
              {filter}
            </Button>
          ))}
        </div>

        <Card>
          <CardContent className="space-y-3 pt-4 sm:pt-5">
            {model.items.map(({ action, status }) => {
              const tone = getTone(action, status.status)
              const Icon = tone.icon

              return (
                <div key={action.id} className="flex min-h-16 flex-col gap-3 rounded-lg border border-ink-200 p-3 md:flex-row md:items-start">
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
                  {action.external_url ? (
                    <a href={action.external_url} target="_blank" rel="noreferrer">
                      <Button variant={status.status === 'complete' ? 'outline' : 'default'} size="sm" className="w-full md:w-auto">
                        {status.status === 'complete' ? 'View' : 'Open'}
                        <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                      View
                    </Button>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                item.href === '/actions' ? 'text-falcon-700' : 'text-ink-500'
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
