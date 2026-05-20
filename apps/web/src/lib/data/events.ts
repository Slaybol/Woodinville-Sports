import type { CalendarEvent } from '@gridiron/shared'
import { demoEvents } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'

export interface PublishedSectionContent {
  title: string
  body: string
}

export interface CalendarEventsDataResult {
  events: CalendarEvent[]
  publishedSection?: PublishedSectionContent
  source: 'supabase' | 'demo'
  reason?: string
}

export async function getCalendarEventsResult(): Promise<CalendarEventsDataResult> {
  try {
    const supabase = await createClient()

    const [{ data, error }, { data: publishedHuddle }] = await Promise.all([
      supabase.from('events').select('*').order('starts_at', { ascending: true, nullsFirst: false }),
      supabase
        .from('huddles')
        .select('id')
        .eq('status', 'published')
        .order('starts_on', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle(),
    ])

    if (error || !data || data.length === 0) {
      return {
        events: demoEvents,
        source: 'demo',
        reason: error?.message || 'No events were readable.',
      }
    }

    let publishedSection: PublishedSectionContent | undefined

    if (publishedHuddle?.id) {
      const { data: section } = await supabase
        .from('huddle_sections')
        .select('title, body')
        .eq('huddle_id', publishedHuddle.id)
        .eq('section_type', 'calendar')
        .maybeSingle()

      if (section?.title || section?.body) {
        publishedSection = {
          title: section.title || 'Calendar note',
          body: section.body || '',
        }
      }
    }

    return {
      events: data as CalendarEvent[],
      publishedSection,
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
