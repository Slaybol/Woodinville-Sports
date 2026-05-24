import Link from 'next/link'
import { CalendarDays, ChevronRight, ClipboardList, UsersRound } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformRoster, platformStaff, platformTeams } from '@/lib/platform-demo-data'

export default function TeamPage() {
  return (
    <ParentShell activeNav="more" statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}>
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Program view</Badge>
            <Badge variant="outline">Varsity, JV, C-Team</Badge>
          </div>
          <p className="brand-kicker">Team</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Football program hub</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            A mobile home for rosters, coaching staff, team-specific notes, and schedule context.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformTeams.map((team) => (
              <div key={team.name} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-ink-950">{team.name}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-falcon-700">{team.level}</p>
                  </div>
                  <Badge variant="outline">{team.rosterCount} players</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-600">{team.focus}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-bold text-ink-800">
                  <CalendarDays size={15} className="text-falcon-700" />
                  {team.nextEvent}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roster preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformRoster.map((player) => (
              <div key={player.name} className="flex gap-3 rounded-lg bg-ink-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-falcon-700 font-display text-lg text-white">
                  {player.number}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-ink-950">{player.name}</p>
                    <Badge variant={player.status === 'Ready' ? 'success' : 'warning'}>{player.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-600">
                    {player.team} | {player.position} | Class of {player.gradYear}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coaching staff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformStaff.map((staff) => (
              <div key={staff.name} className="rounded-lg border border-ink-200 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-ink-950">{staff.name}</p>
                  <Badge variant="outline">{staff.team}</Badge>
                </div>
                <p className="mt-1 text-sm font-bold text-falcon-800">{staff.role}</p>
                <p className="mt-2 text-sm leading-6 text-ink-600">{staff.responsibilities.join(', ')}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/game-day">
            <Button className="w-full justify-between">
              Game Day
              <ChevronRight size={16} />
            </Button>
          </Link>
          <Link href="/registration">
            <Button variant="outline" className="w-full justify-between">
              Requirements
              <ClipboardList size={16} />
            </Button>
          </Link>
        </div>

        <Link href="/messages" className="flex items-center justify-between rounded-lg border border-ink-200 bg-white p-4 text-sm font-bold text-ink-950">
          <span className="flex min-w-0 items-center gap-2">
            <UsersRound size={16} className="shrink-0 text-falcon-700" />
            Official team messages
          </span>
          <ChevronRight size={16} className="shrink-0 text-ink-400" />
        </Link>
      </main>
    </ParentShell>
  )
}
