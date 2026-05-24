import Link from 'next/link'
import { ArrowRight, FolderTree, Sparkles } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteResourceHubs } from '@/lib/site-extension-data'

export default function ResourcesPage() {
  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}
      banner={{
        text: 'These resource hubs are intentional demo stubs so the app shows the broader Woodinville Football platform shape.',
        tone: 'warning',
      }}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="info">Website companion</Badge>
              <Badge variant="outline">Private extension</Badge>
            </div>
            <p className="brand-kicker">Resource Hubs</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">More than the MVP core</h1>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              These hubs show where Gridiron Connect can extend the public Woodinville Football website into a more useful private family and staff experience.
            </p>
          </div>

          <Card className="bg-falcon-50">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <FolderTree size={20} className="mt-0.5 shrink-0 text-falcon-700" />
                <div>
                  <p className="font-bold text-falcon-950">Why these stubs exist</p>
                  <p className="mt-1 text-sm leading-6 text-falcon-900">
                    The current MVP proves the Weekly Huddle workflow. These stubs make the demo feel like a fuller private companion to the public website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {siteResourceHubs.map((hub) => (
              <Card key={hub.slug}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{hub.shortTitle}</Badge>
                    <Badge variant="info">Stub</Badge>
                  </div>
                  <CardTitle className="mt-1">{hub.title}</CardTitle>
                  <p className="text-sm leading-6 text-ink-600">{hub.summary}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {hub.websiteSections.slice(0, 5).map((section) => (
                      <Badge key={section} variant="outline">
                        {section}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/resources/${hub.slug}`}>
                    <Button className="w-full">
                      Open {hub.title}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <aside>
          <Card>
            <CardHeader>
              <CardTitle>What this signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
              <p>
                Gridiron Connect is not limited to huddles, tasks, calendar, and volunteer flows.
              </p>
              <p>
                It can grow into a private operating layer for team information, parent resources, FGIC operations, and program identity.
              </p>
              <div className="rounded-lg bg-ink-50 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <Sparkles size={15} className="text-gold-500" />
                  MVP 2.0 framing
                </p>
                <p className="mt-1 text-sm leading-6 text-ink-600">
                  The public website remains the front door. These stubs show how the private app becomes the companion behind it.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </ParentShell>
  )
}
