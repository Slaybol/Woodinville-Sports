'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateFamilyActionStatus(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return
  }

  const familyId = String(formData.get('family_id') || '').trim()
  const actionItemId = String(formData.get('action_item_id') || '').trim()
  const nextStatus = String(formData.get('next_status') || '').trim()

  if (!familyId || !actionItemId || !nextStatus) {
    return
  }

  const payload = {
    family_id: familyId,
    action_item_id: actionItemId,
    status: nextStatus,
    completed_by: nextStatus === 'complete' ? user.id : null,
    completed_at: nextStatus === 'complete' ? new Date().toISOString() : null,
    admin_note: null,
  }

  await supabase
    .from('family_action_status')
    .upsert(payload, { onConflict: 'family_id,action_item_id' })

  revalidatePath('/')
  revalidatePath('/actions')
  revalidatePath('/profile')
  revalidatePath('/preview/huddle')
  revalidatePath('/preview/actions')
  revalidatePath('/admin')
}

export async function toggleVolunteerSignup(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return
  }

  const familyId = String(formData.get('family_id') || '').trim()
  const slotId = String(formData.get('slot_id') || '').trim()
  const hoursCredited = Number(formData.get('hours_credited') || 0)
  const actionType = String(formData.get('action_type') || '').trim()

  if (!familyId || !slotId || !actionType) {
    return
  }

  if (actionType === 'cancel') {
    await supabase
      .from('volunteer_signups')
      .delete()
      .eq('family_id', familyId)
      .eq('slot_id', slotId)
  } else {
    const payload = {
      family_id: familyId,
      slot_id: slotId,
      profile_id: user.id,
      status: 'confirmed',
      hours_credited: hoursCredited,
    }

    await supabase
      .from('volunteer_signups')
      .upsert(payload, { onConflict: 'slot_id,family_id' })
  }

  revalidatePath('/')
  revalidatePath('/volunteers')
  revalidatePath('/profile')
  revalidatePath('/preview/volunteers')
  revalidatePath('/admin')
}
