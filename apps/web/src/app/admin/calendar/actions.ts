'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAccess } from '@/lib/auth/admin'

function redirectWithStatus(status: string, message?: string) {
  const params = new URLSearchParams({ status })
  if (message) {
    params.set('message', message)
  }
  redirect(`/admin/calendar?${params.toString()}`)
}

async function getAdminClient() {
  const { supabase, user } = await requireAdminAccess({
    onUnauthenticated: 'redirect-to-auth',
    onUnauthorized: 'redirect-home',
  })

  if (!user?.id) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before managing calendar events.')
  }

  return { supabase, userId: user.id }
}

export async function saveEvent(formData: FormData) {
  const { supabase, userId } = await getAdminClient()
  const eventId = String(formData.get('event_id') || '').trim()
  const payload = {
    title: String(formData.get('title') || '').trim(),
    event_type: String(formData.get('event_type') || 'other').trim(),
    team_id: String(formData.get('team_id') || '').trim() || null,
    audience_label: String(formData.get('audience_label') || 'All program').trim(),
    starts_at: String(formData.get('starts_at') || '').trim() || null,
    ends_at: String(formData.get('ends_at') || '').trim() || null,
    display_date: String(formData.get('display_date') || '').trim() || null,
    display_time: String(formData.get('display_time') || '').trim() || null,
    location: String(formData.get('location') || '').trim() || null,
    address: String(formData.get('address') || '').trim() || null,
    arrival_time: String(formData.get('arrival_time') || '').trim() || null,
    bus_time: String(formData.get('bus_time') || '').trim() || null,
    uniform_note: String(formData.get('uniform_note') || '').trim() || null,
    equipment_note: String(formData.get('equipment_note') || '').trim() || null,
    notes: String(formData.get('notes') || '').trim() || null,
    external_url: String(formData.get('external_url') || '').trim() || null,
    is_canceled: String(formData.get('is_canceled') || '') === 'on',
    created_by: userId,
  }

  if (!payload.title) {
    redirectWithStatus('validation_error', 'Event title is required.')
  }

  const query = eventId
    ? supabase.from('events').update(payload).eq('id', eventId)
    : supabase.from('events').insert(payload)

  const { error } = await query

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/schedule')
  revalidatePath('/admin')
  revalidatePath('/admin/calendar')
  redirectWithStatus('saved')
}

export async function deleteEvent(formData: FormData) {
  const { supabase } = await getAdminClient()
  const eventId = String(formData.get('event_id') || '').trim()

  if (!eventId) {
    redirectWithStatus('validation_error', 'Event id is required.')
  }

  const { error } = await supabase.from('events').delete().eq('id', eventId)

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/schedule')
  revalidatePath('/admin')
  revalidatePath('/admin/calendar')
  redirectWithStatus('deleted')
}
