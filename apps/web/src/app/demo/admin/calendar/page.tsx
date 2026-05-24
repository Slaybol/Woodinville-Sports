import { Clock, MapPin } from 'lucide-react'
import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { demoEvents } from '@/lib/demo-data'

export default function DemoAdminCalendarPage() {
  return (
    <DemoAdminShell
      activeNav="calendar"
      title="Calendar Manager"
      description="Coach and secretary view for dates, logistics, locations, audience targeting, and schedule confidence."
    >
      <Card>
        <CardHeader>
          <CardTitle>Program calendar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoEvents.map((event) => (
            <article key={event.id} className="rounded-lg border border-ink-200 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={event.event_type === 'deadline' ? 'warning' : 'info'}>{event.event_type}</Badge>
                <Badge variant="outline">{event.audience_label}</Badge>
              </div>
              <h2 className="mt-3 font-bold text-ink-950">{event.title}</h2>
              <div className="mt-3 grid gap-2 text-sm text-ink-600 md:grid-cols-2">
                <p className="flex items-center gap-2">
                  <Clock size={15} className="text-falcon-700" />
                  {event.display_date || 'Date TBD'} | {event.display_time || 'Time TBD'}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={15} className="text-falcon-700" />
                  {event.location || 'Location TBD'}
                </p>
              </div>
              {event.notes && <p className="mt-3 rounded-lg bg-ink-50 p-3 text-sm leading-6 text-ink-700">{event.notes}</p>}
            </article>
          ))}
        </CardContent>
      </Card>
    </DemoAdminShell>
  )
}
