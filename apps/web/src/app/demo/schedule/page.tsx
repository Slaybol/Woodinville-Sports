import { CalendarContent } from '@/components/calendar/calendar-content'
import { DemoShell } from '@/components/layout/demo-shell'
import { demoEvents } from '@/lib/demo-data'

export default function DemoSchedulePage() {
  return (
    <DemoShell activeNav="calendar">
      <CalendarContent
        events={demoEvents}
        routePrefix="/demo"
        dataState={{ source: 'demo', reason: 'Self-contained demo data. No Supabase request is made.' }}
      />
    </DemoShell>
  )
}
