import { CalendarContent } from '@/components/calendar/calendar-content'
import { getCalendarEventsResult } from '@/lib/data/events'

export default async function CalendarPage() {
  const result = await getCalendarEventsResult()

  return (
    <CalendarContent
      events={result.events}
      publishedSection={result.publishedSection}
      dataState={{ source: result.source, reason: result.reason }}
    />
  )
}
