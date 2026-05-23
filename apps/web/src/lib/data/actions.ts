import type {
  ActionCenterModel,
  ActionItem,
  Family,
  FamilyActionStatus,
  FamilyProgressSummary,
  VolunteerSignup,
} from '@gridiron/shared'
import { actionCenterDemo } from '@/lib/demo-data'
import { buildFamilyProgressSummary, getAuthenticatedUserId, resolveReadableFamily } from '@/lib/data/family'
import { createClient } from '@/lib/supabase/server'

export interface ActionCenterDataResult {
  model: ActionCenterModel
  source: 'supabase' | 'demo'
  reason?: string
  requiresSetup?: boolean
}

function buildProgress(
  statuses: FamilyActionStatus[],
  volunteerSignups: VolunteerSignup[] = []
): FamilyProgressSummary {
  return buildFamilyProgressSummary({
    actionItemsComplete: statuses.filter((status) => status.status === 'complete').length,
    actionItemsTotal: statuses.length,
    volunteerSignups,
    volunteerHoursGoal: actionCenterDemo.progress.volunteer_hours_goal,
  })
}

export async function getActionCenterResult(): Promise<ActionCenterDataResult> {
  try {
    const supabase = await createClient()
    const userId = await getAuthenticatedUserId(supabase)

    const { data: currentHuddle } = await supabase
      .from('huddles')
      .select('id')
      .eq('status', 'published')
      .order('starts_on', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle()

    const { data: actions, error: actionsError } = await supabase
      .from('action_items')
      .select('*')
      .eq('huddle_id', currentHuddle?.id || '')
      .order('due_at', { ascending: true, nullsFirst: false })
    const family = await resolveReadableFamily(supabase, userId)

    if (actionsError || !actions || actions.length === 0) {
      return {
        model: actionCenterDemo,
        source: 'demo',
        reason: actionsError?.message || 'No action items were readable.',
      }
    }

    if (!family) {
      return {
        model: actionCenterDemo,
        source: 'demo',
        reason: 'Finish family setup before tracking checklist progress.',
        requiresSetup: true,
      }
    }

    const { data: statuses, error: statusesError } = await supabase
      .from('family_action_status')
      .select('*')
      .eq('family_id', family.id)

    if (statusesError) {
      return {
        model: actionCenterDemo,
        source: 'demo',
        reason: statusesError.message,
      }
    }

    const typedActions = actions as ActionItem[]
    const typedFamily = family as Family
    const typedStatuses = (statuses || []) as FamilyActionStatus[]
    const { data: volunteerSignups } = await supabase
      .from('volunteer_signups')
      .select('*')
      .eq('family_id', family.id)
      .eq('status', 'confirmed')

    const mergedItems = typedActions.map((action) => {
      const matchedStatus = typedStatuses.find((status) => status.action_item_id === action.id)

      return {
        action,
        status:
          matchedStatus ||
          ({
            id: `fallback-status-${action.id}`,
            family_id: typedFamily.id,
            action_item_id: action.id,
            status: action.default_status,
            completed_by: null,
            completed_at: null,
            admin_note: null,
            created_at: action.created_at,
            updated_at: action.updated_at,
          } satisfies FamilyActionStatus),
      }
    })

    return {
      source: 'supabase',
      model: {
        family: typedFamily,
        items: mergedItems,
        progress: buildProgress(mergedItems.map((item) => item.status), volunteerSignups || []),
      },
    }
  } catch {
    return {
      model: actionCenterDemo,
      source: 'demo',
      reason: 'Supabase query failed before action center data could be loaded.',
    }
  }
}

export async function getActionCenter(): Promise<ActionCenterModel> {
  const result = await getActionCenterResult()
  return result.model
}
