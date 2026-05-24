import Link from 'next/link'
import { ExternalLink, FileCheck2, Plane, ReceiptText } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformRequirements } from '@/lib/platform-demo-data'

function requirementVariant(status: string) {
  if (status === 'Needs upload') return 'destructive' as const
  if (status === 'Due soon') return 'warning' as const
  if (status === 'MVP 2.0 Preview') return 'info' as const
  return 'success' as const
}

export default function RegistrationPage() {
  return (
    <ParentShell activeNav="more" statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}>
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="warning">Requirements hub</Badge>
            <Badge variant="outline">Static demo data</Badge>
          </div>
          <p className="brand-kicker">Registration</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Ready-to-play checklist</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            One family-facing hub for FinalForms, physicals, dues, camp, travel readiness, and documents.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Family requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformRequirements.map((item) => (
              <article key={item.title} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={requirementVariant(item.status)}>{item.status}</Badge>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <h2 className="mt-3 font-bold text-ink-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-600">{item.detail}</p>
                <div className="mt-3 grid gap-2 text-sm text-ink-600">
                  <p><span className="font-bold text-ink-950">Owner:</span> {item.owner}</p>
                  <p><span className="font-bold text-ink-950">Timing:</span> {item.dueLabel}</p>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What this becomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
            <div className="flex gap-3 rounded-lg bg-ink-50 p-3">
              <FileCheck2 size={18} className="mt-1 shrink-0 text-falcon-700" />
              <p>Parents see exactly what is complete, what is missing, and which item blocks participation.</p>
            </div>
            <div className="flex gap-3 rounded-lg bg-ink-50 p-3">
              <ReceiptText size={18} className="mt-1 shrink-0 text-falcon-700" />
              <p>Dues and payments stay as placeholders until we choose a payment workflow.</p>
            </div>
            <div className="flex gap-3 rounded-lg bg-ink-50 p-3">
              <Plane size={18} className="mt-1 shrink-0 text-falcon-700" />
              <p>Hawaii Travel Hub can graduate into itinerary, forms, deadlines, and family readiness tracking.</p>
            </div>
            <Link href="/documents">
              <Button className="w-full">
                Open documents
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </ParentShell>
  )
}
