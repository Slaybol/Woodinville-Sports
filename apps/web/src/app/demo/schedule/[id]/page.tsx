import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { demoEvents } from '@/lib/demo-data'

export function generateStaticParams() {
  return demoEvents.map((event) => ({ id: event.id }))
}

export default async function DemoScheduleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = demoEvents.find((candidate) => candidate.id === id)

  if (!event) {
    notFound()
  }

  return (
    <DemoShell activeNav="calendar">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <Link href="/demo/schedule">
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back to calendar
          </Button>
        </Link>

        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="info">{event.event_type}</Badge>
            <Badge variant="outline">{event.audience_label}</Badge>
          </div>
          <p className="brand-kicker">Event detail</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">{event.title}</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            Static event detail for the self-contained demo route.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Logistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
            <p className="flex items-center gap-2">
              <Clock size={16} className="text-falcon-700" />
              {event.display_date || 'Date TBD'} | {event.display_time || 'Time TBD'}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-falcon-700" />
              {event.location || 'Location TBD'}
            </p>
            {event.notes && <p className="rounded-lg bg-falcon-50 p-3 text-falcon-950">{event.notes}</p>}
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
