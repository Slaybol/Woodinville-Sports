import type { ActionItem, CalendarEvent, Huddle, HuddleHomeModel, HuddleSection, VolunteerSlot } from '@gridiron/shared'
import { demoFamilyProgress, huddleHomeDemo } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'

export interface HuddleHomeDataResult {
  model: HuddleHomeModel
  source: 'supabase' | 'demo'
  reason?: string
}

export async function getCurrentHuddleHomeResult(): Promise<HuddleHomeDataResult> {
  try {
    const supabase = await createClient()

    const { data: huddle, error: huddleError } = await supabase
      .from('huddles')
      .select('*')
      .eq('status', 'published')
      .order('starts_on', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle()

    if (huddleError || !huddle) {
      return {
        model: huddleHomeDemo,
        source: 'demo',
        reason: huddleError?.message || 'No published huddle rows were readable.',
      }
    }

    const [
      { data: sections, error: sectionsError },
      { data: actions, error: actionsError },
      { data: events, error: eventsError },
      { data: volunteerSlots, error: volunteerSlotsError },
    ] = await Promise.all([
      supabase
        .from('huddle_sections')
        .select('*')
        .eq('huddle_id', huddle.id)
        .order('sort_order', { ascending: true }),
      supabase
        .from('action_items')
        .select('*')
        .eq('huddle_id', huddle.id)
        .order('due_at', { ascending: true, nullsFirst: false }),
      supabase
        .from('events')
        .select('*')
        .order('starts_at', { ascending: true, nullsFirst: false })
        .limit(6),
      supabase
        .from('volunteer_slots')
        .select('*')
        .order('starts_at', { ascending: true, nullsFirst: false })
        .limit(4),
    ])

    if (sectionsError || actionsError || eventsError || volunteerSlotsError) {
      return {
        model: huddleHomeDemo,
        source: 'demo',
        reason:
          sectionsError?.message ||
          actionsError?.message ||
          eventsError?.message ||
          volunteerSlotsError?.message ||
          'Related tables were not readable.',
      }
    }

    const actionItems = (actions || []) as ActionItem[]

    return {
      source: 'supabase',
      model: {
        huddle: huddle as Huddle,
        sections: (sections || []) as HuddleSection[],
        urgent_actions: actionItems.filter((action) => action.importance === 'required' || action.importance === 'family'),
        due_soon_actions: actionItems,
        upcoming_events: (events || []) as CalendarEvent[],
        volunteer_needs: (volunteerSlots || []) as VolunteerSlot[],
        family_progress: demoFamilyProgress,
      },
    }
  } catch {
    return {
      model: huddleHomeDemo,
      source: 'demo',
      reason: 'Supabase query failed before data could be loaded.',
    }
  }
}

export async function getCurrentHuddleHome(): Promise<HuddleHomeModel> {
  const result = await getCurrentHuddleHomeResult()
  return result.model
}
