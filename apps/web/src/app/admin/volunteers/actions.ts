'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAccess } from '@/lib/auth/admin'

function redirectWithStatus(status: string, message?: string) {
  const params = new URLSearchParams({ status })
  if (message) {
    params.set('message', message)
  }
  redirect(`/admin/volunteers?${params.toString()}`)
}

async function getAdminClient() {
  const { supabase, user } = await requireAdminAccess({
    onUnauthenticated: 'redirect-to-auth',
    onUnauthorized: 'redirect-home',
  })

  if (!user?.id) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before managing volunteer slots.')
  }

  return { supabase, userId: user.id }
}

export async function saveVolunteerSlot(formData: FormData) {
  const { supabase, userId } = await getAdminClient()
  const slotId = String(formData.get('slot_id') || '').trim()
  const payload = {
    title: String(formData.get('title') || '').trim(),
    description: String(formData.get('description') || '').trim() || null,
    category: String(formData.get('category') || 'other').trim(),
    team_id: String(formData.get('team_id') || '').trim() || null,
    event_id: String(formData.get('event_id') || '').trim() || null,
    starts_at: String(formData.get('starts_at') || '').trim() || null,
    ends_at: String(formData.get('ends_at') || '').trim() || null,
    display_date: String(formData.get('display_date') || '').trim() || null,
    display_time: String(formData.get('display_time') || '').trim() || null,
    location: String(formData.get('location') || '').trim() || null,
    slots_needed: Number(formData.get('slots_needed') || 1),
    hour_credit: Number(formData.get('hour_credit') || 0),
    created_by: userId,
  }

  if (!payload.title) {
    redirectWithStatus('validation_error', 'Volunteer slot title is required.')
  }

  const query = slotId
    ? supabase.from('volunteer_slots').update(payload).eq('id', slotId)
    : supabase.from('volunteer_slots').insert(payload)

  const { error } = await query

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/volunteers')
  revalidatePath('/admin')
  revalidatePath('/admin/volunteers')
  redirectWithStatus('saved')
}

export async function deleteVolunteerSlot(formData: FormData) {
  const { supabase } = await getAdminClient()
  const slotId = String(formData.get('slot_id') || '').trim()

  if (!slotId) {
    redirectWithStatus('validation_error', 'Volunteer slot id is required.')
  }

  const { error } = await supabase.from('volunteer_slots').delete().eq('id', slotId)

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/volunteers')
  revalidatePath('/admin')
  revalidatePath('/admin/volunteers')
  redirectWithStatus('deleted')
}
