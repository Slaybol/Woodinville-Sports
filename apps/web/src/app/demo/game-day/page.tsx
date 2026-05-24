import Link from 'next/link'
import { Film, MapPin, Shirt, Trophy, UsersRound } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformGameDay, platformRsvps } from '@/lib/platform-demo-data'

export default function DemoGameDayPage() {
  const gameRsvp = platformRsvps.find((item) => item.event === 'Friday night game') || platformRsvps[0]

  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="info">{platformGameDay.result}</Badge>
            <Badge variant="outline">{platformGameDay.date}</Badge>
          </div>
          <p className="brand-kicker">Game Day</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Woodinville vs {platformGameDay.opponent}</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            Game logistics, RSVP visibility, score placeholder, and film links with no live backend dependency.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Logistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg bg-falcon-50 p-4">
              <p className="flex items-center gap-2 font-bold text-falcon-950">
                <MapPin size={16} />
                {platformGameDay.location}
              </p>
              <p className="mt-2 text-sm text-falcon-900">{platformGameDay.arrival} | {platformGameDay.kickoff}</p>
            </div>
            <div className="rounded-lg border border-ink-200 p-3">
              <p className="flex items-center gap-2 text-sm font-bold text-ink-950">
                <Shirt size={15} className="text-falcon-700" />
                Uniform
              </p>
              <p className="mt-2 text-sm text-ink-600">{platformGameDay.uniform}</p>
            </div>
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">{gameRsvp.yes} going</Badge>
              <Badge variant="destructive">{gameRsvp.no} unavailable</Badge>
              <Badge variant="warning">{gameRsvp.unknown} unknown</Badge>
            </div>
            <div className="rounded-lg border border-ink-200 p-3">
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
            <Link href="/demo/messages">
              <Button variant="outline" className="w-full">
                <UsersRound size={16} className="mr-2" />
                Message families without responses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
