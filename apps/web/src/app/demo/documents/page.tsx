import { Download, FileText } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const documents = [
  { title: 'FinalForms registration guide', category: 'Registration', status: 'Website-backed' },
  { title: 'CWU Camp hard-copy packet', category: 'Camp', status: 'Due soon' },
  { title: '2026 Key Dates reference', category: 'Calendar', status: 'Current' },
  { title: 'Hawaii Travel Hub checklist', category: 'Travel', status: 'MVP 2.0 Preview' },
]

export default function DemoDocumentsPage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Documents</Badge>
            <Badge variant="outline">Static demo</Badge>
          </div>
          <p className="brand-kicker">Documents</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Forms and references</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            A fast app-native version of the documents families need most often.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Document library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.title} className="flex gap-3 rounded-lg border border-ink-200 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-ink-950">{doc.title}</p>
                    <Badge variant="outline">{doc.category}</Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-sm text-ink-600">
                    <Download size={14} />
                    {doc.status}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
