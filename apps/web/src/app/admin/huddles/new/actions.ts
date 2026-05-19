'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function redirectWithStatus(status: string, message?: string) {
  const params = new URLSearchParams({ status })
  if (message) {
    params.set('message', message)
  }

  redirect(`/admin/huddles/new?${params.toString()}`)
}

export async function saveDraftHuddle(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before saving a draft.')
  }

  const userId = user?.id

  if (!userId) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before saving a draft.')
  }

  const draftId = String(formData.get('draft_id') || '').trim()
  const dateRange = String(formData.get('date_range') || '').trim()
  const startsOn = String(formData.get('starts_on') || '').trim()
  const endsOn = String(formData.get('ends_on') || '').trim()
  const summary = String(formData.get('summary') || '').trim()
  const targetTeamId = String(formData.get('target_team_id') || '').trim() || null

  if (!dateRange || !summary) {
    redirectWithStatus('validation_error', 'Date range and summary are required.')
  }

  const payload = {
    title: 'Weekly Huddle',
    date_range: dateRange,
    starts_on: startsOn || null,
    ends_on: endsOn || null,
    summary,
    status: 'draft',
    target_team_id: targetTeamId,
    created_by: userId,
  }

  const query = draftId
    ? supabase.from('huddles').update(payload).eq('id', draftId).select('id').single()
    : supabase.from('huddles').insert(payload).select('id').single()

  const { data, error } = await query

  if (error || !data) {
    redirectWithStatus(
      'save_failed',
      error?.message || 'Supabase did not return a saved draft row.'
    )
  }

  revalidatePath('/')
  revalidatePath('/preview/huddle')
  revalidatePath('/admin')
  revalidatePath('/admin/huddles/new')
  redirectWithStatus('saved')
}
