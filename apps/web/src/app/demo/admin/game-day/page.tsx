import { Film, MapPin, Trophy } from 'lucide-react'
import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformGameDay, platformRsvps } from '@/lib/platform-demo-data'

export default function DemoAdminGameDayPage() {
  const gameRsvp = platformRsvps.find((item) => item.event === 'Friday night game') || platformRsvps[0]

  return (
    <DemoAdminShell
      activeNav="gameDay"
      title="Game Day"
      description="Static game logistics, RSVP summary, score placeholder, and media placeholders."
    >
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Game logistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-falcon-700 p-5 text-white">
              <Badge className="bg-white/15 text-white">{platformGameDay.result}</Badge>
              <h2 className="mt-3 font-display text-4xl leading-none">Woodinville vs {platformGameDay.opponent}</h2>
              <p className="mt-3 text-sm text-white/80">{platformGameDay.date}</p>
            </div>
            <p className="flex items-center gap-2 rounded-lg border border-ink-200 p-3 text-sm text-ink-700">
              <MapPin size={16} className="text-falcon-700" />
              {platformGameDay.location} | {platformGameDay.arrival} | {platformGameDay.kickoff}
            </p>
            {platformGameDay.logistics.map((item) => (
              <p key={item} className="rounded-lg bg-ink-50 p-3 text-sm leading-6 text-ink-700">{item}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSVP and media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">{gameRsvp.yes} going</Badge>
              <Badge variant="destructive">{gameRsvp.no} no</Badge>
              <Badge variant="warning">{gameRsvp.unknown} unknown</Badge>
            </div>
            <div className="rounded-lg bg-ink-50 p-3">
              <p className="flex items-center gap-2 font-bold text-ink-950">
                <Trophy size={16} className="text-falcon-700" />
                {platformGameDay.score} | {platformGameDay.result}
              </p>
            </div>
            {platformGameDay.links.map((link) => (
              <div key={link.label} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-ink-200 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <Film size={16} className="text-falcon-700" />
                  {link.label}
                </p>
                <Badge variant="outline">{link.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DemoAdminShell>
  )
}
