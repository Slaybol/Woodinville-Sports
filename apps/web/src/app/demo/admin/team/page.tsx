import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformRoster, platformStaff, platformTeams } from '@/lib/platform-demo-data'

export default function DemoAdminTeamPage() {
  return (
    <DemoAdminShell
      activeNav="team"
      title="Team Setup"
      description="Static team, roster, and staff setup for the fast demo lane."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {platformTeams.map((team) => (
          <Card key={team.name}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-ink-950">{team.name}</p>
                <Badge variant="outline">{team.rosterCount}</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-600">{team.focus}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Roster preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformRoster.map((player) => (
              <div key={player.name} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink-200 p-3">
                <div>
                  <p className="font-bold text-ink-950">#{player.number} {player.name}</p>
                  <p className="text-sm text-ink-600">{player.team} | {player.position}</p>
                </div>
                <Badge variant={player.status === 'Ready' ? 'success' : 'warning'}>{player.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff ownership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformStaff.map((staff) => (
              <div key={staff.name} className="rounded-lg bg-ink-50 p-3">
                <p className="font-bold text-ink-950">{staff.name}</p>
                <p className="mt-1 text-sm font-bold text-falcon-800">{staff.role} | {staff.team}</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">{staff.responsibilities.join(', ')}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DemoAdminShell>
  )
}
