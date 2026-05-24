import Link from 'next/link'
import { ChevronRight, Compass } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const resources = [
  { title: 'Team', detail: 'Varsity, JV, C-Team, coaching staff, and team context.', href: '/demo/team' },
  { title: 'Parents', detail: 'Key dates, events, volunteering, FAQ, registration, dues, camp, and travel.', href: '/demo/registration' },
  { title: 'FGIC', detail: 'Club info, board and committees, bylaws, minutes, matching, and legacy.', href: '/demo/more' },
  { title: 'Sponsors', detail: 'Sponsors, advertisers, and sponsor growth opportunities.', href: '/demo/more' },
]

export default function DemoResourcesPage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Website companion</Badge>
            <Badge variant="outline">Static demo</Badge>
          </div>
          <p className="brand-kicker">Resources</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Program resource hubs</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            Demo stubs that show how the public website sections can become actionable inside the private app.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Website sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resources.map((resource) => (
              <Link key={resource.title} href={resource.href} className="flex gap-3 rounded-lg border border-ink-200 p-4 hover:bg-ink-50">
                <Compass size={18} className="mt-1 shrink-0 text-falcon-700" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink-950">{resource.title}</p>
                  <p className="mt-1 text-sm leading-5 text-ink-600">{resource.detail}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ink-400" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
