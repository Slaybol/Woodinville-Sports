import type { ActionCenterModel, ActionItem, Family, FamilyActionStatus, FamilyProgressSummary } from '@gridiron/shared'
import { actionCenterDemo } from '@/lib/demo-data'
import { createClient } from '@/lib/supabase/server'

export interface ActionCenterDataResult {
  model: ActionCenterModel
  source: 'supabase' | 'demo'
  reason?: string
}

function buildProgress(statuses: FamilyActionStatus[]): FamilyProgressSummary {
  return {
    action_items_complete: statuses.filter((status) => status.status === 'complete').length,
    action_items_total: statuses.length,
    volunteer_hours_complete: actionCenterDemo.progress.volunteer_hours_complete,
    volunteer_hours_goal: actionCenterDemo.progress.volunteer_hours_goal,
  }
}

export async function getActionCenterResult(): Promise<ActionCenterDataResult> {
  try {
    const supabase = await createClient()

    const [
      { data: actions, error: actionsError },
      { data: family, error: familyError },
    ] = await Promise.all([
      supabase
        .from('action_items')
        .select('*')
        .order('due_at', { ascending: true, nullsFirst: false }),
      supabase
        .from('families')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle(),
    ])

    if (actionsError || !actions || actions.length === 0) {
      return {
        model: actionCenterDemo,
        source: 'demo',
        reason: actionsError?.message || 'No action items were readable.',
      }
    }

    if (familyError || !family) {
      return {
        model: actionCenterDemo,
        source: 'demo',
        reason: familyError?.message || 'No readable family row was available.',
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
        progress: buildProgress(mergedItems.map((item) => item.status)),
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
