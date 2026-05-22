import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bus, CalendarDays, Clock, ExternalLink, MapPin, Shirt, Users } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEventDetailResult } from '@/lib/data/events'

function eventTypeLabel(type: string) {
  switch (type) {
    case 'deadline':
      return 'Deadline'
    case 'practice':
      return 'Practice'
    case 'game':
      return 'Game'
    case 'meeting':
      return 'Meeting'
    case 'camp':
      return 'Camp'
    case 'travel':
      return 'Travel'
    case 'fundraiser':
      return 'Fundraiser'
    case 'social':
      return 'Social'
    default:
      return 'Event'
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getEventDetailResult(id)

  if (!result.event) {
    notFound()
  }

  const event = result.event

  return (
    <ParentShell
      activeNav="calendar"
      statusBadge={{
        label: result.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback',
        tone: result.source === 'supabase' ? 'live' : 'fallback',
      }}
      banner={
        result.source === 'demo' && result.reason
          ? { text: `Event detail is showing demo data. Reason: ${result.reason}`, tone: 'warning' }
          : null
      }
    >
      <main className="mx-auto max-w-[460px] px-4 py-6">
        <div className="mb-6">
          <Link href="/schedule" className="inline-flex items-center gap-2 text-sm font-bold text-falcon-700 hover:text-falcon-800">
            <ArrowLeft size={16} />
            Back to calendar
          </Link>
        </div>

        <div className="grid gap-6">
          <section className="space-y-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant={event.is_canceled ? 'destructive' : 'outline'}>{eventTypeLabel(event.event_type)}</Badge>
                <Badge variant="success">{event.audience_label}</Badge>
              </div>
              <p className="brand-kicker">Event Detail</p>
              <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">{event.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">
                Use this page as the source of truth for when to arrive, where to go, what to bring, and who this applies to.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Logistics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <CalendarDays size={16} />
                    Date
                  </div>
                  <p className="text-sm text-ink-600">{event.display_date || 'Date TBD'}</p>
                </div>
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <Clock size={16} />
                    Time
                  </div>
                  <p className="text-sm text-ink-600">{event.display_time || 'Time TBD'}</p>
                </div>
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <MapPin size={16} />
                    Location
                  </div>
                  <p className="text-sm text-ink-600">{event.location || 'Location TBD'}</p>
                  {event.address && <p className="mt-1 text-sm text-ink-500">{event.address}</p>}
                </div>
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <Users size={16} />
                    Audience
                  </div>
                  <p className="text-sm text-ink-600">{event.audience_label}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Arrival and gear</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <Bus size={16} />
                    Arrival / bus
                  </div>
                  <p className="text-sm text-ink-600">{event.arrival_time || event.bus_time || 'No arrival or bus detail posted yet.'}</p>
                  {event.bus_time && event.arrival_time && (
                    <p className="mt-1 text-sm text-ink-500">Bus: {event.bus_time}</p>
                  )}
                </div>
                <div className="rounded-lg border border-ink-200 p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                    <Shirt size={16} />
                    Uniform / equipment
                  </div>
                  <p className="text-sm text-ink-600">{event.uniform_note || 'Uniform note not posted yet.'}</p>
                  {event.equipment_note && <p className="mt-1 text-sm text-ink-500">{event.equipment_note}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coach note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-ink-600">{event.notes || 'No additional event note has been posted yet.'}</p>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-ink-600">
                <div className="rounded-lg bg-falcon-50 p-3 text-falcon-950">
                  <p className="font-bold">Last updated</p>
                  <p className="mt-1">{new Date(event.updated_at).toLocaleString()}</p>
                </div>
                {event.external_url ? (
                  <a href={event.external_url} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full">
                      <ExternalLink size={16} className="mr-2" />
                      Open related link
                    </Button>
                  </a>
                ) : (
                  <div className="rounded-lg border border-ink-200 p-3">
                    No external link is attached to this event.
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </ParentShell>
  )
}
