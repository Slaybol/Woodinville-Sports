import type { CalendarEvent } from '@gridiron/shared'
import { demoEvents } from '@/lib/demo-data'

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return demoEvents
}
