import { CalendarContent } from '@/components/calendar/calendar-content'
import { getCalendarEvents } from '@/lib/data/events'

export default async function CalendarPage() {
  const events = await getCalendarEvents()

  return <CalendarContent events={events} />
}
