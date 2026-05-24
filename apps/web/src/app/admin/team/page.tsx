import { ClipboardList, UsersRound } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformRoster, platformStaff, platformTeams } from '@/lib/platform-demo-data'

export default function AdminTeamPage() {
  return (
    <AdminShell
      activeNav="team"
      title="Team Setup"
      description="Preview the program, team, roster, and staff management surfaces that turn Gridiron into a full football operations tool."
      badge="MVP 2.0 Preview"
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {platformTeams.map((team) => (
          <Card key={team.name}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-ink-950">{team.name}</p>
                <Badge variant="outline">{team.rosterCount}</Badge>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-falcon-700">{team.season}</p>
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
              <div key={player.name} className="grid gap-3 rounded-lg border border-ink-200 p-3 md:grid-cols-[80px_minmax(0,1fr)_160px] md:items-center">
                <div className="flex items-center gap-2 font-bold text-ink-950">
                  <span className="rounded-md bg-falcon-700 px-2 py-1 font-display text-white">{player.number}</span>
                  {player.team}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-ink-950">{player.name}</p>
                  <p className="text-sm text-ink-600">{player.position} | Class of {player.gradYear}</p>
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
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <UsersRound size={16} className="text-falcon-700" />
                  {staff.name}
                </p>
                <p className="mt-1 text-sm font-bold text-falcon-800">{staff.role} | {staff.team}</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">{staff.responsibilities.join(', ')}</p>
              </div>
            ))}
            <div className="rounded-lg border border-gold-200 bg-gold-100 p-3 text-sm leading-6 text-amber-950">
              <p className="flex items-center gap-2 font-bold">
                <ClipboardList size={16} />
                Next workflow
              </p>
              <p className="mt-1">Coach and secretary permissions can later control who edits roster, staff, and team assignments.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}
