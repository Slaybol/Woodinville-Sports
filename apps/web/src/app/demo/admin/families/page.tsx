import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformFamilies, platformRequirements } from '@/lib/platform-demo-data'

export default function DemoAdminFamiliesPage() {
  return (
    <DemoAdminShell
      activeNav="families"
      title="Families"
      description="Static family readiness, RSVP, volunteer, and requirement tracking for the fast demo lane."
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Family status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformFamilies.map((family) => (
              <article key={family.family} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-ink-950">{family.family}</p>
                  <Badge variant={family.setup === 'Complete' ? 'success' : 'warning'}>{family.setup}</Badge>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-ink-600 md:grid-cols-2">
                  <p><span className="font-bold text-ink-950">Players:</span> {family.players}</p>
                  <p><span className="font-bold text-ink-950">Requirements:</span> {family.requirements}</p>
                  <p><span className="font-bold text-ink-950">Volunteer:</span> {family.volunteer}</p>
                  <p><span className="font-bold text-ink-950">RSVP:</span> {family.rsvp}</p>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirement exceptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformRequirements.filter((item) => item.status !== 'Open').map((item) => (
              <div key={item.title} className="rounded-lg bg-ink-50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-ink-950">{item.title}</p>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
                <p className="mt-1 text-sm leading-6 text-ink-600">{item.dueLabel}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DemoAdminShell>
  )
}
