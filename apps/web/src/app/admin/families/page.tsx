import { AlertTriangle, CheckCircle2, ClipboardList, Users } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformFamilies, platformRequirements } from '@/lib/platform-demo-data'

export default function AdminFamiliesPage() {
  return (
    <AdminShell
      activeNav="families"
      title="Families"
      description="A demo-ready command center for family setup, player readiness, missing requirements, RSVP state, and volunteer progress."
      badge="MVP 2.0 Preview"
    >
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm font-bold text-ink-600">Families tracked</p>
            <p className="mt-2 font-display text-4xl text-ink-950">{platformFamilies.length}</p>
            <Badge variant="info" className="mt-3">Static demo data</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm font-bold text-ink-600">Complete setup</p>
            <p className="mt-2 font-display text-4xl text-ink-950">1</p>
            <Badge variant="success" className="mt-3">Ready</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm font-bold text-ink-600">Needs follow-up</p>
            <p className="mt-2 font-display text-4xl text-ink-950">2</p>
            <Badge variant="warning" className="mt-3">Action needed</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Roster and family status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformFamilies.map((family) => (
              <article key={family.family} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 font-bold text-ink-950">
                    <Users size={16} className="text-falcon-700" />
                    {family.family}
                  </p>
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
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  {item.status === 'Needs upload' ? (
                    <AlertTriangle size={16} className="text-red-700" />
                  ) : (
                    <ClipboardList size={16} className="text-falcon-700" />
                  )}
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-ink-600">{item.dueLabel}</p>
              </div>
            ))}
            <div className="rounded-lg bg-falcon-50 p-3 text-sm leading-6 text-falcon-950">
              <p className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} />
                Demo intent
              </p>
              <p className="mt-1">Show the secretary how missing paperwork and dues could be tracked before game week.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}
