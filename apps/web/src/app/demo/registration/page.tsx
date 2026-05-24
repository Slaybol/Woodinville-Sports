import Link from 'next/link'
import { FileCheck2 } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
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

export default function DemoRegistrationPage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="warning">Requirements hub</Badge>
            <Badge variant="outline">Static demo</Badge>
          </div>
          <p className="brand-kicker">Registration</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Ready-to-play checklist</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            FinalForms, physicals, dues, camp, travel, and document readiness in one fast demo view.
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
                <p className="mt-3 text-sm text-ink-600"><span className="font-bold text-ink-950">Owner:</span> {item.owner}</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Link href="/demo/messages">
          <Button className="w-full">
            <FileCheck2 size={16} className="mr-2" />
            Message families missing items
          </Button>
        </Link>
      </main>
    </DemoShell>
  )
}
