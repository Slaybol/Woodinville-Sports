import Link from 'next/link'
import {
  ExternalLink,
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  Megaphone,
  Plus,
  Save,
  Send,
  Users,
} from 'lucide-react'
import type { ActionImportance } from '@gridiron/shared'
import { demoTeams } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { publishHuddle, saveDraftHuddle } from './actions'

const sections = [
  {
    section_type: 'actions',
    label: "This Week's Playbook",
    status: 'Ready',
    icon: ClipboardList,
    defaultBody: 'Register Online with CWU. Pay Camp Fee to Woodinville High School. Submit Hard Copies of Forms.',
  },
  {
    section_type: 'calendar',
    label: 'Calendar Highlights',
    status: 'Needs review',
    icon: CalendarDays,
    defaultBody: 'Spring Practices : June 1st - 18th - More Details Coming.\nCWU Camp : June 20th - 23rd - Register Here.\nMini Camp : July 21st - 23rd @ WHS Football Field.',
  },
  {
    section_type: 'volunteer',
    label: 'Volunteer Asks',
    status: 'Ready',
    icon: Users,
    defaultBody: 'It takes a huge team behind the scenes to support Woodinville High School Football. We ask that each family consider volunteering at least 10 hours per season to help keep the program running strong.',
  },
  {
    section_type: 'highlights',
    label: 'Program Highlights',
    status: 'Ready',
    icon: Megaphone,
    defaultBody: '2019 4A ACADEMIC STATE CHAMPIONS (FOOTBALL)\n3-PEAT 4A STATE SEMI-FINALISTS\n3-PEAT KINGCO 4A CHAMPIONS',
  },
]

const defaultDraftActions = [
  {
    title: 'FinalForms Registration',
    description: 'In order to participate in the first day of summer conditioning/practice, tryouts or regular season practice, a FinalForms registration must be completed by both parent and student and a current sports physical must be on file with the WHS Athletic Office.',
    importance: 'required' as ActionImportance,
    due_label: 'Due May 26',
    audience_label: 'All players',
    external_url: 'https://woodinville.nsd.org/athletics/register-for-athletics',
  },
  {
    title: 'CWU Camp Registration',
    description: 'Complete all 3 registration steps below.',
    importance: 'required' as ActionImportance,
    due_label: 'Due June 3',
    audience_label: 'Camp attendees',
    external_url: 'https://www.woodinvillefootball.com/cwucamp',
  },
  {
    title: '2026 FGIC Membership',
    description: '$500/Family FGIC Membership dues help support the many resources that make the Woodinville High School Football program successful.',
    importance: 'family' as ActionImportance,
    due_label: 'Past due',
    audience_label: 'All families',
    external_url: 'https://www.woodinvillefootball.com/dues',
  },
]

function statusVariant(status: string): NonNullable<BadgeProps['variant']> {
  return status === 'Ready' ? 'success' : 'warning'
}

interface DraftActionRow {
  id: string
  title: string
  description?: string | null
  importance: ActionImportance
  due_label?: string | null
  audience_label?: string | null
  external_url?: string | null
}

interface DraftSectionRow {
  id: string
  section_type: string
  title?: string | null
  body?: string | null
  metadata?: {
    highlights?: string[]
  } | null
}

function statusTone(status?: string) {
  if (status === 'saved') return 'bg-falcon-100 text-falcon-900'
  if (status === 'published') return 'bg-falcon-100 text-falcon-900'
  if (status === 'auth_required' || status === 'save_failed' || status === 'validation_error') {
    return 'bg-gold-100 text-amber-950'
  }
  return 'bg-white/15 text-white'
}

export default async function HuddleEditorPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string; message?: string }>
}) {
  const params = (await searchParams) || {}
  const supabase = await createClient()

  const [{ data: drafts }, { data: teams }] = await Promise.all([
    supabase
      .from('huddles')
      .select('*')
      .eq('status', 'draft')
      .order('updated_at', { ascending: false })
      .limit(1),
    supabase.from('teams').select('id, name, level, season'),
  ])

  const draft = drafts?.[0]
  const { data: draftActions } = draft
    ? await supabase
        .from('action_items')
        .select('*')
        .eq('huddle_id', draft.id)
        .order('created_at', { ascending: true })
    : { data: [] as DraftActionRow[] }
  const { data: draftSections } = draft
    ? await supabase
        .from('huddle_sections')
        .select('*')
        .eq('huddle_id', draft.id)
        .order('sort_order', { ascending: true })
    : { data: [] as DraftSectionRow[] }

  const teamOptions =
    teams && teams.length > 0
      ? teams
      : demoTeams.map((team) => ({
          id: team.id,
          name: team.name,
          level: team.level,
          season: team.season,
        }))

  const editableActions = defaultDraftActions.map((action, index) => ({
    ...action,
    ...(draftActions?.[index] || {}),
  }))
  const editableSections = sections.map((section, index) => {
    const savedSection = draftSections?.find((item) => item.section_type === section.section_type)
    const savedHighlights = Array.isArray(savedSection?.metadata?.highlights)
      ? savedSection.metadata.highlights.join('\n')
      : ''

    return {
      ...section,
      id: savedSection?.id || '',
      title: savedSection?.title || section.label,
      body:
        section.section_type === 'highlights'
          ? savedHighlights || section.defaultBody
          : savedSection?.body || section.defaultBody,
      sort_order: index + 1,
    }
  })

  const previewActions = editableActions
    .filter((action) => action.title)
    .map((action) => `${action.title} | ${action.due_label || 'No due date'}`)
  const previewCalendar = editableSections.find((section) => section.section_type === 'calendar')
  const previewVolunteer = editableSections.find((section) => section.section_type === 'volunteer')

  return (
    <form action={saveDraftHuddle} className="min-h-screen bg-ink-50">
      <input type="hidden" name="draft_id" value={draft?.id || ''} />

      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ArrowLeft size={20} />
            </Link>
            <WoodinvilleLogo size={40} priority />
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Woodinville Football</p>
              <p className="mt-1 font-display text-2xl leading-none text-white">Huddle Editor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={statusTone(params.status)}>
              {params.status === 'saved'
                ? 'Draft saved'
                : params.status === 'published'
                  ? 'Huddle published'
                : params.status === 'auth_required'
                  ? 'Admin sign-in required'
                  : params.status === 'save_failed'
                    ? 'Save failed'
                    : params.status === 'validation_error'
                      ? 'Validation issue'
                      : 'Draft mode'}
            </Badge>
            <Button type="submit" size="sm" className="bg-white text-falcon-900 hover:bg-falcon-50">
              <Save size={15} className="mr-1" />
              Save Draft
            </Button>
            <Button formAction={publishHuddle} size="sm" className="hidden bg-gold-500 text-ink-950 hover:bg-gold-100 md:inline-flex">
              <Send size={15} className="mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <section className="space-y-6">
          {params.message && (
            <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
              {params.message}
            </div>
          )}

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="warning">Draft</Badge>
              <Badge variant="outline">{draft?.date_range || 'May 24-31'}</Badge>
              <Badge variant="destructive">2 warnings</Badge>
            </div>
            <p className="brand-kicker">Publishing workflow</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Weekly Huddle draft</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
              Create structured content once, then publish it to the parent Huddle, Action Center, Calendar, and Volunteer surfaces.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Huddle details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Date range</span>
                <input
                  name="date_range"
                  className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue={draft?.date_range || 'May 24-31, 2026'}
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Target audience</span>
                <select
                  name="target_team_id"
                  className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue={draft?.target_team_id || teamOptions[0]?.id}
                >
                  {teamOptions.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.season})
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Starts on</span>
                <input
                  name="starts_on"
                  type="date"
                  className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue={draft?.starts_on || '2026-05-24'}
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Ends on</span>
                <input
                  name="ends_on"
                  type="date"
                  className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue={draft?.ends_on || '2026-05-31'}
                />
              </label>
              <label className="space-y-1.5 md:col-span-2">
                <span className="text-sm font-bold text-ink-700">Summary</span>
                <textarea
                  name="summary"
                  className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue={
                    draft?.summary ||
                    'We are a couple weeks away from Spring Football. Please complete FinalForms, CWU Camp registration, and FGIC membership items before the listed deadlines.'
                  }
                />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Sections</CardTitle>
                <p className="text-sm text-ink-600">Each section becomes structured app content, not a wall of newsletter text.</p>
              </div>
              <Button type="button" size="sm" variant="outline">
                <Plus size={15} className="mr-1" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {editableSections.map((section, index) => (
                <div key={section.label} className="rounded-lg border border-ink-200 p-3">
                  <input type="hidden" name={`section_id_${index}`} value={section.id || ''} />
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                        <section.icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-ink-950">{section.label}</h2>
                          <Badge variant={statusVariant(section.status)}>{section.status}</Badge>
                        </div>
                        <div className="mt-3 space-y-3">
                          <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-ink-700">Section title</span>
                            <input
                              name={`section_title_${index}`}
                              className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                              defaultValue={section.title}
                            />
                          </label>
                          <label className="block space-y-1.5">
                            <span className="text-sm font-bold text-ink-700">
                              {section.section_type === 'highlights' ? 'Highlights (one per line)' : 'Section body'}
                            </span>
                            <textarea
                              name={`section_body_${index}`}
                              className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-falcon-500"
                              defaultValue={section.body}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button type="button" size="sm" variant="outline">Structured</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week&apos;s Playbook</CardTitle>
              <p className="text-sm text-ink-600">These items save into `action_items` and power the Action Center.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {editableActions.map((action, index) => (
                <div key={`draft-action-${index}`} className="rounded-lg border border-ink-200 p-4">
                  <input type="hidden" name={`action_id_${index}`} value={action.id || ''} />

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-1.5 md:col-span-2">
                      <span className="text-sm font-bold text-ink-700">Action title</span>
                      <input
                        name={`action_title_${index}`}
                        className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.title}
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-sm font-bold text-ink-700">Importance</span>
                      <select
                        name={`action_importance_${index}`}
                        className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.importance}
                      >
                        <option value="required">Required</option>
                        <option value="family">Family</option>
                        <option value="optional">Optional</option>
                        <option value="info">Info</option>
                      </select>
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-sm font-bold text-ink-700">Due label</span>
                      <input
                        name={`action_due_label_${index}`}
                        className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.due_label || ''}
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-sm font-bold text-ink-700">Audience label</span>
                      <input
                        name={`action_audience_label_${index}`}
                        className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.audience_label || 'All families'}
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-sm font-bold text-ink-700">External URL</span>
                      <input
                        name={`action_external_url_${index}`}
                        className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.external_url || ''}
                      />
                    </label>

                    <label className="space-y-1.5 md:col-span-2">
                      <span className="text-sm font-bold text-ink-700">Description</span>
                      <textarea
                        name={`action_description_${index}`}
                        className="min-h-20 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-falcon-500"
                        defaultValue={action.description || ''}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-gold-100 bg-gold-100">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-900" />
                <div>
                  <p className="font-bold text-amber-950">Publish warnings</p>
                  <p className="mt-1 text-sm leading-6 text-amber-950">
                    Confirm first-week Spring Football times and CWU Camp travel details before publishing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Live preview</CardTitle>
                <p className="text-sm text-ink-600">Parent-facing summary.</p>
              </div>
              <Eye size={18} className="text-ink-500" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="warning">Draft</Badge>
                  <Badge variant="outline">{draft?.date_range || 'May 24-31'}</Badge>
                </div>
                <p className="text-xl font-bold text-ink-950">Weekly Huddle</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  {draft?.summary || 'We are a couple weeks away from Spring Football. Please complete the required checklist items.'}
                </p>
              </div>

              <div className="rounded-lg border border-statusRed-100 bg-red-50 p-3">
                <div className="mb-1 flex items-center gap-2 font-bold text-statusRed-600">
                  <AlertTriangle size={16} />
                  Urgent action items
                </div>
                <div className="space-y-2">
                  {previewActions.map((action) => (
                    <p key={action} className="text-sm leading-5 text-red-900">{action}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-ink-200 p-3">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <ExternalLink size={16} />
                  Saved action items
                </div>
                <p className="text-sm leading-6 text-ink-600">
                  Saving this draft now updates the Huddle row and the three checklist items families will see in Action Center.
                </p>
              </div>

              <div className="rounded-lg border border-ink-200 p-3">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <CalendarDays size={16} />
                  Calendar highlights
                </div>
                <p className="text-sm leading-6 text-ink-600">
                  {previewCalendar?.body || 'Spring Football begins soon. CWU Camp is June 20-23. Suggested summer travel window is July 27-August 7.'}
                </p>
              </div>

              <div className="rounded-lg border border-ink-200 p-3">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <Users size={16} />
                  Volunteer asks
                </div>
                <p className="text-sm leading-6 text-ink-600">
                  {previewVolunteer?.body || 'It takes a huge team behind the scenes to support Woodinville High School Football. We ask that each family consider volunteering at least 10 hours per season to help keep the program running strong.'}
                </p>
              </div>

              <div className="rounded-lg border border-ink-200 p-3">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <FileText size={16} />
                  Publish checklist
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-falcon-800">
                    <CheckCircle2 size={15} />
                    Action items attached
                  </p>
                  <p className="flex items-center gap-2 text-falcon-800">
                    <CheckCircle2 size={15} />
                    Audience selected
                  </p>
                  <p className="flex items-center gap-2 text-amber-900">
                    <AlertTriangle size={15} />
                    Calendar details need review
                  </p>
                </div>
              </div>

              <Button formAction={publishHuddle} className="w-full">
                <Send size={16} className="mr-2" />
                Publish Huddle
              </Button>
            </CardContent>
          </Card>
        </aside>
      </main>
    </form>
  )
}
