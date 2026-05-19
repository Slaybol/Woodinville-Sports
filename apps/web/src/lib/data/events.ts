import type { CalendarEvent } from '@gridiron/shared'
import { demoEvents } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'

export interface CalendarEventsDataResult {
  events: CalendarEvent[]
  source: 'supabase' | 'demo'
  reason?: string
}

export async function getCalendarEventsResult(): Promise<CalendarEventsDataResult> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('starts_at', { ascending: true, nullsFirst: false })

    if (error || !data || data.length === 0) {
      return {
        events: demoEvents,
        source: 'demo',
        reason: error?.message || 'No events were readable.',
      }
    }

    return {
      events: data as CalendarEvent[],
      source: 'supabase',
    }
  } catch {
    return {
      events: demoEvents,
      source: 'demo',
      reason: 'Supabase query failed before calendar data could be loaded.',
    }
  }
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const result = await getCalendarEventsResult()
  return result.events
}
