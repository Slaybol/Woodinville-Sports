import type { ActionItem, CalendarEvent, Huddle, HuddleHomeModel, HuddleSection, VolunteerSignup, VolunteerSlot } from '@gridiron/shared'
import { demoFamilyProgress, huddleHomeDemo } from '@/lib/demo-data'
import { buildFamilyProgressSummary, getAuthenticatedUserId, resolveReadableFamily } from '@/lib/data/family'
import { createClient } from '@/lib/supabase/server'

export interface HuddleHomeDataResult {
  model: HuddleHomeModel
  source: 'supabase' | 'demo'
  reason?: string
}

export async function getCurrentHuddleHomeResult(existingSupabase?: Awaited<ReturnType<typeof createClient>>): Promise<HuddleHomeDataResult> {
  try {
    const supabase = existingSupabase || await createClient()
    const userId = await getAuthenticatedUserId(supabase)

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
    const family = await resolveReadableFamily(supabase, userId)
    let familyProgress = buildFamilyProgressSummary({
      actionItemsComplete: 0,
      actionItemsTotal: actionItems.length,
      volunteerSignups: [],
      volunteerHoursGoal: demoFamilyProgress.volunteer_hours_goal,
    })

    if (family) {
      const [{ data: statuses }, { data: volunteerSignups }] = await Promise.all([
        supabase.from('family_action_status').select('*').eq('family_id', family.id),
        supabase
          .from('volunteer_signups')
          .select('*')
          .eq('family_id', family.id)
          .eq('status', 'confirmed'),
      ])

      const completeCount = actionItems.filter((action) => {
        const matched = (statuses || []).find((status) => status.action_item_id === action.id)
        return matched?.status === 'complete'
      }).length

      familyProgress = buildFamilyProgressSummary({
        actionItemsComplete: completeCount,
        actionItemsTotal: actionItems.length,
        volunteerSignups: (volunteerSignups || []) as VolunteerSignup[],
        volunteerHoursGoal: demoFamilyProgress.volunteer_hours_goal,
      })
    }

    return {
      source: 'supabase',
      model: {
        huddle: huddle as Huddle,
        sections: (sections || []) as HuddleSection[],
        urgent_actions: actionItems.filter((action) => action.importance === 'required' || action.importance === 'family'),
        due_soon_actions: actionItems,
        upcoming_events: (events || []) as CalendarEvent[],
        volunteer_needs: (volunteerSlots || []) as VolunteerSlot[],
        family_progress: familyProgress,
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
