'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAccess } from '@/lib/auth/admin'

function redirectWithStatus(status: string, message?: string) {
  const params = new URLSearchParams({ status })
  if (message) {
    params.set('message', message)
  }
  redirect(`/admin/actions?${params.toString()}`)
}

async function getAdminClient() {
  const { supabase, user } = await requireAdminAccess({
    onUnauthenticated: 'redirect-to-auth',
    onUnauthorized: 'redirect-home',
  })

  if (!user?.id) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before managing actions.')
  }

  return { supabase, userId: user.id }
}

export async function saveActionItem(formData: FormData) {
  const { supabase, userId } = await getAdminClient()
  const actionId = String(formData.get('action_id') || '').trim()
  const payload = {
    huddle_id: String(formData.get('huddle_id') || '').trim() || null,
    title: String(formData.get('title') || '').trim(),
    description: String(formData.get('description') || '').trim() || null,
    importance: String(formData.get('importance') || 'required').trim(),
    due_at: String(formData.get('due_at') || '').trim() || null,
    due_label: String(formData.get('due_label') || '').trim() || null,
    audience_label: String(formData.get('audience_label') || 'All families').trim(),
    target_team_id: String(formData.get('target_team_id') || '').trim() || null,
    external_url: String(formData.get('external_url') || '').trim() || null,
    created_by: userId,
  }

  if (!payload.title) {
    redirectWithStatus('validation_error', 'Action title is required.')
  }

  const query = actionId
    ? supabase.from('action_items').update(payload).eq('id', actionId)
    : supabase.from('action_items').insert(payload)

  const { error } = await query

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/actions')
  revalidatePath('/admin')
  revalidatePath('/admin/actions')
  redirectWithStatus('saved')
}

export async function deleteActionItem(formData: FormData) {
  const { supabase } = await getAdminClient()
  const actionId = String(formData.get('action_id') || '').trim()

  if (!actionId) {
    redirectWithStatus('validation_error', 'Action id is required.')
  }

  const { error } = await supabase.from('action_items').delete().eq('id', actionId)

  if (error) {
    redirectWithStatus('save_failed', error.message)
  }

  revalidatePath('/')
  revalidatePath('/actions')
  revalidatePath('/admin')
  revalidatePath('/admin/actions')
  redirectWithStatus('deleted')
}
