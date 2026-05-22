import type { Family, FamilyProgressSummary, VolunteerSignup } from '@gridiron/shared'

interface SupabaseAuthLike {
  auth: {
    getUser: () => Promise<{ data: { user: { id: string } | null } }>
  }
}

interface QueryBuilder {
  eq: (column: string, value: string) => QueryBuilder
  order: (column: string, options: { ascending: boolean }) => QueryBuilder
  limit: (count: number) => QueryBuilder
  maybeSingle: () => Promise<{ data: unknown }>
}

interface SupabaseQueryLike {
  from: (table: string) => {
    select: (columns: string) => QueryBuilder
  }
}

interface FamilyMembershipRow {
  family_id?: string
}

export async function resolveReadableFamily(supabase: unknown): Promise<Family | null> {
  const authClient = supabase as SupabaseAuthLike
  const queryClient = supabase as SupabaseQueryLike
  const {
    data: { user },
  } = await authClient.auth.getUser()

  if (user?.id) {
    const { data: membership } = await queryClient
      .from('family_members')
      .select('family_id')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const membershipRow = membership as FamilyMembershipRow | null

    if (membershipRow?.family_id) {
      const { data: family } = await queryClient
        .from('families')
        .select('*')
        .eq('id', membershipRow.family_id)
        .maybeSingle()

      if (family) {
        return family as Family
      }
    }

    const { data: primaryContactFamily } = await queryClient
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

  const { data: fallbackFamily } = await queryClient
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
