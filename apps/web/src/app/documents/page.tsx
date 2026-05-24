'use client'

import { useState } from 'react'
import { Download, ExternalLink, FileText, Folder, Search } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type DocumentCategory = 'schedule' | 'form' | 'waiver' | 'fgic' | 'fundraising' | 'guide'

interface DocumentItem {
  id: string
  title: string
  description: string
  category: DocumentCategory
  fileType: string
  fileSize: string
  uploadedAt: string
}

const documents: DocumentItem[] = [
  {
    id: 'doc-1',
    title: '2026 Key Dates One-Pager',
    description: 'A printable summary of major football dates, parent milestones, and camp timing.',
    category: 'schedule',
    fileType: 'PDF',
    fileSize: '214 KB',
    uploadedAt: 'May 10, 2026',
  },
  {
    id: 'doc-2',
    title: 'Family Registration Checklist',
    description: 'A simple guide for FinalForms, physicals, and required pre-season items.',
    category: 'form',
    fileType: 'PDF',
    fileSize: '166 KB',
    uploadedAt: 'May 12, 2026',
  },
  {
    id: 'doc-3',
    title: 'CWU Camp Packing and Travel Notes',
    description: 'Trip expectations, suggested packing items, and staff travel reminders.',
    category: 'guide',
    fileType: 'PDF',
    fileSize: '428 KB',
    uploadedAt: 'May 16, 2026',
  },
  {
    id: 'doc-4',
    title: 'Volunteer Expectations Overview',
    description: 'A quick explanation of volunteer hours, common roles, and season support needs.',
    category: 'fundraising',
    fileType: 'PDF',
    fileSize: '142 KB',
    uploadedAt: 'May 14, 2026',
  },
  {
    id: 'doc-5',
    title: 'FGIC Family Support Guide',
    description: 'Membership context, committee support, and common parent questions.',
    category: 'fgic',
    fileType: 'PDF',
    fileSize: '312 KB',
    uploadedAt: 'May 8, 2026',
  },
  {
    id: 'doc-6',
    title: 'Travel Release and Permissions',
    description: 'Permission and waiver packet for away travel and team-related transport.',
    category: 'waiver',
    fileType: 'PDF',
    fileSize: '198 KB',
    uploadedAt: 'May 18, 2026',
  },
]

const categoryLabels: Record<DocumentCategory, string> = {
  schedule: 'Schedules',
  form: 'Forms',
  waiver: 'Waivers',
  fgic: 'FGIC',
  fundraising: 'Volunteer',
  guide: 'Guides',
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'all'>('all')

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      query.length === 0 ||
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  const categories = Object.keys(categoryLabels) as DocumentCategory[]

  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}
      banner={{
        text: 'Documents is a styled stub showing how forms, guides, schedules, and FGIC resources can live inside the private app.',
        tone: 'warning',
      }}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="info">Website companion</Badge>
              <Badge variant="outline">Documents</Badge>
            </div>
            <p className="brand-kicker">Family Resources</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Documents and guides</h1>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              This is where schedules, forms, waivers, FGIC references, and parent guides can feel like part of the same private family workflow.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-4 pt-4 sm:pt-5">
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search documents"
                  className="h-10 w-full rounded-md border border-ink-300 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Folder size={15} className="shrink-0 text-ink-500" />
                <Button size="sm" variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => setActiveCategory('all')}>
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category)}
                  >
                    {categoryLabels[category]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-ink-950">{doc.title}</p>
                        <Badge variant="outline">{categoryLabels[doc.category]}</Badge>
                        <Badge variant="info">{doc.fileType}</Badge>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-ink-600">{doc.description}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-500">
                        {doc.fileSize} | Updated {doc.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Preview
                      <ExternalLink size={14} className="ml-2" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Download
                      <Download size={14} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-600">
                  No resources match this filter right now.
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why this belongs here</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
              <p>
                Families already hunt for documents across the public site, email threads, and shared links.
              </p>
              <p>
                In a stronger MVP 2.0 flow, these items would sit next to the Weekly Huddle, team schedules, registration, dues, and volunteer work.
              </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </ParentShell>
  )
}
