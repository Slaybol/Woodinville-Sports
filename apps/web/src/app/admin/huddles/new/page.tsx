'use client'

import Link from 'next/link'
import {
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sections = [
  {
    label: "This Week's Playbook",
    status: 'Ready',
    icon: ClipboardList,
    items: ['FinalForms Registration', 'CWU Camp Registration', 'FGIC Membership'],
  },
  {
    label: 'Calendar Highlights',
    status: 'Needs review',
    icon: CalendarDays,
    items: ['Spring Football begins', 'CWU Camp dates', 'Summer travel window'],
  },
  {
    label: 'Volunteer Asks',
    status: 'Ready',
    icon: Users,
    items: ['Concessions planning', 'Team meal support'],
  },
  {
    label: 'Program Highlights',
    status: 'Ready',
    icon: Megaphone,
    items: ['Gervais training turnout', 'Baseball champs', 'Track shout-out'],
  },
]

const previewActions = [
  'FinalForms Registration | Due May 26',
  'CWU Camp Registration | Due June 3',
  'FGIC Membership | Past due',
]

function statusVariant(status: string) {
  return status === 'Ready' ? 'success' : 'warning'
}

export default function HuddleEditorPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-base font-bold leading-5">Huddle Editor</p>
              <p className="text-xs text-white/75">Draft, target, preview, and publish</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-white text-falcon-900 hover:bg-falcon-50">
              <Save size={15} className="mr-1" />
              Save Draft
            </Button>
            <Button size="sm" className="hidden bg-gold-500 text-ink-950 hover:bg-gold-100 md:inline-flex">
              <Send size={15} className="mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="warning">Draft</Badge>
              <Badge variant="outline">May 24-31</Badge>
              <Badge variant="destructive">2 warnings</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">Weekly Huddle draft</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
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
                  className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue="May 24-31, 2026"
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-bold text-ink-700">Target audience</span>
                <select className="h-10 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500">
                  <option>All families</option>
                  <option>Varsity families</option>
                  <option>JV families</option>
                  <option>C-Team families</option>
                </select>
              </label>
              <label className="space-y-1.5 md:col-span-2">
                <span className="text-sm font-bold text-ink-700">Summary</span>
                <textarea
                  className="min-h-24 w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-falcon-500"
                  defaultValue="We are a couple weeks away from Spring Football. Please complete FinalForms, CWU Camp registration, and FGIC membership items before the listed deadlines."
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
              <Button size="sm" variant="outline">
                <Plus size={15} className="mr-1" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {sections.map((section) => (
                <div key={section.label} className="rounded-lg border border-ink-200 p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                        <section.icon size={18} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-ink-950">{section.label}</h2>
                          <Badge variant={statusVariant(section.status) as any}>{section.status}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {section.items.map((item) => (
                            <Badge key={item} variant="outline">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
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
                  <Badge variant="outline">May 24-31</Badge>
                </div>
                <p className="text-xl font-bold text-ink-950">Weekly Huddle</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  We are a couple weeks away from Spring Football. Please complete the required checklist items.
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
                  <CalendarDays size={16} />
                  Calendar highlights
                </div>
                <p className="text-sm leading-6 text-ink-600">
                  Spring Football begins soon. CWU Camp is June 20-23. Suggested summer travel window is July 27-August 7.
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

              <Button className="w-full">
                <Send size={16} className="mr-2" />
                Publish Huddle
              </Button>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  )
}
