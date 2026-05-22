import type { Family, FamilyProgressSummary, VolunteerSignup } from '@gridiron/shared'

interface SupabaseLike {
  auth: {
    getUser: () => Promise<{ data: { user: { id: string } | null } }>
  }
  from: (table: string) => {
    select: (columns: string) => any
  }
}

export async function resolveReadableFamily(supabase: SupabaseLike): Promise<Family | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user?.id) {
    const { data: membership } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (membership?.family_id) {
      const { data: family } = await supabase
        .from('families')
        .select('*')
        .eq('id', membership.family_id)
        .maybeSingle()

      if (family) {
        return family as Family
      }
    }

    const { data: primaryContactFamily } = await supabase
      .from('families')
      .select('*')
      .eq('primary_contact_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (primaryContactFamily) {
      return primaryContactFamily as Family
    }

    return null
  }

  const { data: fallbackFamily } = await supabase
    .from('families')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  return (fallbackFamily as Family | null) || null
}

export function buildFamilyProgressSummary(params: {
  actionItemsComplete: number
  actionItemsTotal: number
  volunteerSignups: VolunteerSignup[]
  volunteerHoursGoal?: number
}): FamilyProgressSummary {
  const volunteerHoursComplete = params.volunteerSignups.reduce(
    (sum, signup) => sum + Number(signup.hours_credited || 0),
    0
  )

  return {
    action_items_complete: params.actionItemsComplete,
    action_items_total: params.actionItemsTotal,
    volunteer_hours_complete: volunteerHoursComplete,
    volunteer_hours_goal: params.volunteerHoursGoal ?? 10,
  }
}
