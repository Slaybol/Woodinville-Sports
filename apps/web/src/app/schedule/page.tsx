import { CalendarContent } from '@/components/calendar/calendar-content'
import { LiveDataFallback } from '@/components/layout/live-data-fallback'
import { ParentShell } from '@/components/layout/parent-shell'
import { getCalendarEventsResult } from '@/lib/data/events'

export default async function CalendarPage() {
  const result = await getCalendarEventsResult()

  return (
    <ParentShell
      activeNav="calendar"
      statusBadge={{
        label: result.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback',
        tone: result.source === 'supabase' ? 'live' : 'fallback',
      }}
      banner={
        result.source === 'demo' && result.reason
          ? { text: `Calendar is showing demo data. Reason: ${result.reason}`, tone: 'warning' }
          : null
      }
    >
      {result.source === 'supabase' ? (
        <CalendarContent
          events={result.events}
          publishedSection={result.publishedSection}
          dataState={{ source: result.source, reason: result.reason }}
        />
      ) : (
        <LiveDataFallback
          title="Calendar unavailable"
          message={result.reason || 'Live schedule data could not be loaded right now.'}
        />
      )}
    </ParentShell>
  )
}
