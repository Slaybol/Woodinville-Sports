import type {
  ActionItem,
  Family,
  FamilyActionStatus,
  FamilyProgressSummary,
  NotificationPreferences,
  Player,
  Profile,
  Team,
  VolunteerSignup,
} from '@gridiron/shared'
import { createClient } from '@/lib/supabase/server'
import { buildFamilyProgressSummary, resolveReadableFamily } from '@/lib/data/family'

export interface GuardianSummary {
  id: string
  full_name: string
  email: string
  phone?: string | null
  display_name?: string | null
  is_primary: boolean
}

export interface PlayerSummary extends Player {
  team?: Team | null
}

export interface FamilyProfileDataResult {
  profile: Profile
  family: Family | null
  guardians: GuardianSummary[]
  players: PlayerSummary[]
  preferences: NotificationPreferences | null
  teams: Team[]
  progress: FamilyProgressSummary
  hasFamilyContext: boolean
  setupComplete: boolean
}

export async function getFamilyProfileData(): Promise<FamilyProfileDataResult | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return null
  }

  const [
    { data: profile },
    { data: preferences },
    { data: teams },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('notification_preferences').select('*').eq('profile_id', user.id).maybeSingle(),
    supabase.from('teams').select('*').order('level', { ascending: true }),
  ])

  if (!profile) {
    return null
  }

  const family = await resolveReadableFamily(supabase)

  if (!family) {
    return {
      profile: profile as Profile,
      family: null,
      guardians: [],
      players: [],
      preferences: (preferences as NotificationPreferences | null) || null,
      teams: (teams as Team[]) || [],
      progress: buildFamilyProgressSummary({
        actionItemsComplete: 0,
        actionItemsTotal: 0,
        volunteerSignups: [],
      }),
      hasFamilyContext: false,
      setupComplete: false,
    }
  }

  const [
    { data: familyMembers },
    { data: players },
    { data: latestHuddle },
    { data: volunteerSignups },
  ] = await Promise.all([
    supabase.from('family_members').select('*').eq('family_id', family.id).order('created_at', { ascending: true }),
    supabase.from('players').select('*').eq('family_id', family.id).order('created_at', { ascending: true }),
    supabase
      .from('huddles')
      .select('id')
      .eq('status', 'published')
      .order('starts_on', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('volunteer_signups')
      .select('*')
      .eq('family_id', family.id)
      .eq('status', 'confirmed'),
  ])

  const guardianProfileIds = (familyMembers || [])
    .filter((member) => member.profile_id)
    .map((member) => member.profile_id as string)

  const { data: guardianProfiles } = guardianProfileIds.length
    ? await supabase.from('profiles').select('*').in('id', guardianProfileIds)
    : { data: [] as Profile[] }

  const publishedActions = latestHuddle?.id
    ? await supabase
        .from('action_items')
        .select('*')
        .eq('huddle_id', latestHuddle.id)
        .order('due_at', { ascending: true, nullsFirst: false })
    : { data: [] as ActionItem[] }

  const actionStatuses = latestHuddle?.id
    ? await supabase.from('family_action_status').select('*').eq('family_id', family.id)
    : { data: [] as FamilyActionStatus[] }

  const guardians: GuardianSummary[] = (familyMembers || [])
    .filter((member) => member.role === 'guardian')
    .map((member) => {
      const linkedProfile = (guardianProfiles || []).find((candidate) => candidate.id === member.profile_id)

      return {
        id: member.id,
        full_name: linkedProfile?.full_name || member.display_name || 'Guardian',
        email: linkedProfile?.email || '',
        phone: linkedProfile?.phone || null,
        display_name: member.display_name || null,
        is_primary: member.is_primary,
      }
    })

  const typedTeams = (teams as Team[]) || []
  const playerSummaries: PlayerSummary[] = ((players as Player[]) || []).map((player) => ({
    ...player,
    team: typedTeams.find((team) => team.id === player.team_id) || null,
  }))

  const typedActions = (publishedActions.data as ActionItem[]) || []
  const typedStatuses = (actionStatuses.data as FamilyActionStatus[]) || []
  const actionItemsComplete = typedActions.filter((action) => {
    const matched = typedStatuses.find((status) => status.action_item_id === action.id)
    return matched?.status === 'complete'
  }).length

  return {
    profile: profile as Profile,
    family: family as Family,
    guardians,
    players: playerSummaries,
    preferences: (preferences as NotificationPreferences | null) || null,
    teams: typedTeams,
    progress: buildFamilyProgressSummary({
      actionItemsComplete,
      actionItemsTotal: typedActions.length,
      volunteerSignups: ((volunteerSignups as { data?: VolunteerSignup[] }).data || []) as VolunteerSignup[],
    }),
    hasFamilyContext: true,
    setupComplete: playerSummaries.length > 0,
  }
}
