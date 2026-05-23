'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function familyNameFromContact(fullName: string) {
  const lastName = fullName.trim().split(/\s+/).filter(Boolean).slice(-1)[0]
  return lastName ? `${lastName} family` : 'Woodinville family'
}

function checkboxValue(formData: FormData, key: string) {
  return String(formData.get(key) || '') === 'on'
}

async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    redirect('/auth')
  }

  return { supabase, user }
}

async function ensureGuardianMembership(params: {
  supabase: Awaited<ReturnType<typeof createClient>>
  familyId: string
  userId: string
  displayName: string
}) {
  const { data: existingMembership, error: membershipLookupError } = await params.supabase
    .from('family_members')
    .select('family_id')
    .eq('family_id', params.familyId)
    .eq('profile_id', params.userId)
    .maybeSingle()

  if (membershipLookupError) {
    return membershipLookupError
  }

  if (existingMembership?.family_id) {
    return null
  }

  const { error } = await params.supabase.from('family_members').insert({
    family_id: params.familyId,
    profile_id: params.userId,
    role: 'guardian',
    display_name: params.displayName,
    is_primary: true,
  })

  return error
}

async function resolveExistingFamilyId(params: {
  supabase: Awaited<ReturnType<typeof createClient>>
  userId: string
}) {
  const { data: membership } = await params.supabase
    .from('family_members')
    .select('family_id, created_at')
    .eq('profile_id', params.userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (membership?.family_id) {
    return membership.family_id as string
  }

  const { data: primaryContactFamily } = await params.supabase
    .from('families')
    .select('id, created_at')
    .eq('primary_contact_id', params.userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (primaryContactFamily?.id as string | undefined) || ''
}

async function resolveExistingPlayerId(params: {
  supabase: Awaited<ReturnType<typeof createClient>>
  familyId: string
}) {
  const { data: player } = await params.supabase
    .from('players')
    .select('id, created_at')
    .eq('family_id', params.familyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (player?.id as string | undefined) || ''
}

export async function saveFamilyProfile(formData: FormData) {
  const { supabase, user } = await getCurrentUser()

  const fullName = String(formData.get('full_name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const familyId = String(formData.get('family_id') || '').trim()
  const familyName = String(formData.get('family_name') || '').trim() || familyNameFromContact(fullName)
  const familyNotes = String(formData.get('family_notes') || '').trim()
  const playerId = String(formData.get('player_id') || '').trim()
  const playerName = String(formData.get('player_name') || '').trim()
  const teamId = String(formData.get('team_id') || '').trim()
  const graduationYearRaw = String(formData.get('graduation_year') || '').trim()
  const jerseyNumber = String(formData.get('jersey_number') || '').trim()
  const position = String(formData.get('position') || '').trim()

  if (!fullName || !familyName) {
    redirect('/profile?status=validation_error')
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      phone: phone || null,
    })
    .eq('id', user.id)

  if (profileError) {
    redirect(`/profile?status=save_failed&message=${encodeURIComponent(profileError.message)}`)
  }

  let resolvedFamilyId = familyId || (await resolveExistingFamilyId({ supabase, userId: user.id }))
  const familyPayload = {
    name: familyName,
    notes: familyNotes || null,
    primary_contact_id: user.id,
  }

  const { data: savedFamily, error: familyError } = await supabase
    .from('families')
    .upsert(
      resolvedFamilyId
        ? { id: resolvedFamilyId, ...familyPayload }
        : familyPayload,
      { onConflict: 'primary_contact_id' }
    )
    .select('id')
    .single()

  if (familyError || !savedFamily?.id) {
    redirect(`/profile?status=save_failed&message=${encodeURIComponent(familyError?.message || 'Unable to save family.')}`)
  }

  resolvedFamilyId = savedFamily.id

  const membershipError = await ensureGuardianMembership({
    supabase,
    familyId: resolvedFamilyId,
    userId: user.id,
    displayName: fullName,
  })

  if (membershipError) {
    redirect(`/profile?status=save_failed&message=${encodeURIComponent(membershipError.message)}`)
  }

  if (playerName) {
    const resolvedPlayerId = playerId || (await resolveExistingPlayerId({ supabase, familyId: resolvedFamilyId }))
    const payload = {
      family_id: resolvedFamilyId,
      full_name: playerName,
      team_id: teamId || null,
      graduation_year: graduationYearRaw ? Number(graduationYearRaw) : null,
      jersey_number: jerseyNumber || null,
      position: position || null,
    }

    if (resolvedPlayerId) {
      const { error: playerError } = await supabase.from('players').update(payload).eq('id', resolvedPlayerId)

      if (playerError) {
        redirect(`/profile?status=save_failed&message=${encodeURIComponent(playerError.message)}`)
      }
    } else {
      const { error: playerError } = await supabase.from('players').insert(payload)

      if (playerError) {
        redirect(`/profile?status=save_failed&message=${encodeURIComponent(playerError.message)}`)
      }
    }
  }

  revalidatePath('/')
  revalidatePath('/actions')
  revalidatePath('/volunteers')
  revalidatePath('/profile')

  redirect('/profile?status=saved')
}

export async function saveNotificationSettings(formData: FormData) {
  const { supabase, user } = await getCurrentUser()

  const payload = {
    profile_id: user.id,
    urgent_alerts: checkboxValue(formData, 'urgent_alerts'),
    huddle_published: checkboxValue(formData, 'huddle_published'),
    action_due_soon: checkboxValue(formData, 'action_due_soon'),
    event_updates: checkboxValue(formData, 'event_updates'),
    volunteer_reminders: checkboxValue(formData, 'volunteer_reminders'),
  }

  const { error } = await supabase
    .from('notification_preferences')
    .upsert(payload, { onConflict: 'profile_id' })

  if (error) {
    redirect(`/profile?status=save_failed&message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/profile')
  redirect('/profile?status=notifications_saved')
}
