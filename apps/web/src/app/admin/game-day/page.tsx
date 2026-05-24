import { CalendarClock, Film, MapPin, Shirt, Trophy, UsersRound } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformGameDay, platformRsvps } from '@/lib/platform-demo-data'

export default function AdminGameDayPage() {
  const gameRsvp = platformRsvps.find((item) => item.event === 'Friday night game') || platformRsvps[0]

  return (
    <AdminShell
      activeNav="gameDay"
      title="Game Day"
      description="A coach and secretary workspace for logistics, arrival time, uniform, RSVP gaps, score/result placeholders, and film links."
      badge="MVP 2.0 Preview"
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
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-ink-200 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <MapPin size={16} className="text-falcon-700" />
                  Location
                </p>
                <p className="mt-2 text-sm text-ink-600">{platformGameDay.location}</p>
              </div>
              <div className="rounded-lg border border-ink-200 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <CalendarClock size={16} className="text-falcon-700" />
                  Timing
                </p>
                <p className="mt-2 text-sm text-ink-600">{platformGameDay.arrival} | {platformGameDay.kickoff}</p>
              </div>
              <div className="rounded-lg border border-ink-200 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <Shirt size={16} className="text-falcon-700" />
                  Uniform
                </p>
                <p className="mt-2 text-sm text-ink-600">{platformGameDay.uniform}</p>
              </div>
            </div>
            <div className="space-y-2">
              {platformGameDay.logistics.map((item) => (
                <p key={item} className="rounded-lg bg-ink-50 p-3 text-sm leading-6 text-ink-700">{item}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RSVP summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-falcon-50 p-3">
                  <p className="font-display text-3xl text-falcon-900">{gameRsvp.yes}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-falcon-700">Going</p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="font-display text-3xl text-red-900">{gameRsvp.no}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-red-700">No</p>
                </div>
                <div className="rounded-lg bg-gold-100 p-3">
                  <p className="font-display text-3xl text-amber-950">{gameRsvp.unknown}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-900">Unknown</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <UsersRound size={16} className="mr-2" />
                Draft RSVP follow-up
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Result and media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-ink-50 p-3">
                <p className="flex items-center gap-2 font-bold text-ink-950">
                  <Trophy size={16} className="text-falcon-700" />
                  Score placeholder
                </p>
                <p className="mt-1 text-sm text-ink-600">{platformGameDay.score} | {platformGameDay.result}</p>
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
        </div>
      </section>
    </AdminShell>
  )
}
