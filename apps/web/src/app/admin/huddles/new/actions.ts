'use server'

import type { ActionImportance } from '@gridiron/shared'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAccess } from '@/lib/auth/admin'

function redirectWithStatus(status: string, message?: string, huddleId?: string) {
  const params = new URLSearchParams({ status })
  if (message) {
    params.set('message', message)
  }
  if (huddleId) {
    params.set('huddle', huddleId)
  }

  redirect(`/admin/huddles/new?${params.toString()}`)
}

interface DraftActionInput {
  id?: string
  title: string
  description: string
  importance: ActionImportance
  due_label: string
  audience_label: string
  external_url: string
}

interface DraftSectionInput {
  id?: string
  section_type: 'actions' | 'calendar' | 'volunteer' | 'highlights'
  title: string
  body: string
  sort_order: number
  metadata: Record<string, unknown>
}

function parseDraftActions(formData: FormData): DraftActionInput[] {
  const actions: DraftActionInput[] = []

  for (let index = 0; index < 3; index += 1) {
    const title = String(formData.get(`action_title_${index}`) || '').trim()
    const description = String(formData.get(`action_description_${index}`) || '').trim()
    const importance = String(formData.get(`action_importance_${index}`) || 'required').trim() as ActionImportance
    const dueLabel = String(formData.get(`action_due_label_${index}`) || '').trim()
    const audienceLabel = String(formData.get(`action_audience_label_${index}`) || 'All families').trim()
    const externalUrl = String(formData.get(`action_external_url_${index}`) || '').trim()
    const id = String(formData.get(`action_id_${index}`) || '').trim()

    if (!title) {
      continue
    }

    actions.push({
      id: id || undefined,
      title,
      description,
      importance,
      due_label: dueLabel,
      audience_label: audienceLabel || 'All families',
      external_url: externalUrl,
    })
  }

  return actions
}

function parseDraftSections(formData: FormData): DraftSectionInput[] {
  const sections: DraftSectionInput[] = []
  const sectionTypes = ['actions', 'calendar', 'volunteer', 'highlights'] as const

  for (let index = 0; index < sectionTypes.length; index += 1) {
    const sectionType = sectionTypes[index]
    const id = String(formData.get(`section_id_${index}`) || '').trim()
    const title = String(formData.get(`section_title_${index}`) || '').trim()
    const body = String(formData.get(`section_body_${index}`) || '').trim()

    if (!title && !body) {
      continue
    }

    const metadata =
      sectionType === 'highlights'
        ? {
            highlights: body
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean),
          }
        : {}

    sections.push({
      id: id || undefined,
      section_type: sectionType,
      title,
      body,
      sort_order: index + 1,
      metadata,
    })
  }

  return sections
}

async function getAuthenticatedAdminUserId() {
  const { supabase, user } = await requireAdminAccess({
    onUnauthenticated: 'redirect-to-auth',
    onUnauthorized: 'redirect-home',
  })

  const userId = user?.id

  if (!userId) {
    redirectWithStatus('auth_required', 'Sign in with an admin account before saving a draft.')
  }

  return { supabase, userId }
}

async function persistHuddle(formData: FormData, nextStatus: 'draft' | 'published') {
  const { supabase, userId } = await getAuthenticatedAdminUserId()

  const draftId = String(formData.get('draft_id') || '').trim()
  const dateRange = String(formData.get('date_range') || '').trim()
  const startsOn = String(formData.get('starts_on') || '').trim()
  const endsOn = String(formData.get('ends_on') || '').trim()
  const summary = String(formData.get('summary') || '').trim()
  const targetTeamId = String(formData.get('target_team_id') || '').trim() || null
  const actions = parseDraftActions(formData)
  const sections = parseDraftSections(formData)

  if (!dateRange || !summary) {
    redirectWithStatus('validation_error', 'Date range and summary are required.')
  }

  const payload = {
    title: 'Weekly Huddle',
    date_range: dateRange,
    starts_on: startsOn || null,
    ends_on: endsOn || null,
    summary,
    status: nextStatus,
    target_team_id: targetTeamId,
    created_by: userId,
    published_by: nextStatus === 'published' ? userId : null,
    published_at: nextStatus === 'published' ? new Date().toISOString() : null,
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

  const huddleId = data?.id

  if (!huddleId) {
    redirectWithStatus('save_failed', 'Supabase did not return a draft id.')
  }

  if (nextStatus === 'published') {
    const { error: archiveError } = await supabase
      .from('huddles')
      .update({ status: 'archived' })
      .eq('status', 'published')
      .neq('id', huddleId)

    if (archiveError) {
      redirectWithStatus('save_failed', archiveError.message)
    }
  }

  const persistedActionIds: string[] = []
  const persistedSectionIds: string[] = []

  for (const action of actions) {
    const actionPayload = {
      huddle_id: huddleId,
      title: action.title,
      description: action.description || null,
      importance: action.importance,
      default_status: 'not_started' as const,
      due_label: action.due_label || null,
      audience_label: action.audience_label,
      target_team_id: targetTeamId,
      external_url: action.external_url || null,
      created_by: userId,
    }

    const actionQuery = action.id
      ? supabase.from('action_items').update(actionPayload).eq('id', action.id).select('id').single()
      : supabase.from('action_items').insert(actionPayload).select('id').single()

    const { data: savedAction, error: actionError } = await actionQuery

    if (actionError) {
      redirectWithStatus('save_failed', actionError.message)
    }

    if (savedAction?.id) {
      persistedActionIds.push(savedAction.id)
    }
  }

  for (const section of sections) {
    const sectionPayload = {
      huddle_id: huddleId,
      section_type: section.section_type,
      title: section.title,
      body: section.body || null,
      sort_order: section.sort_order,
      metadata: section.metadata,
    }

    const sectionQuery = section.id
      ? supabase.from('huddle_sections').update(sectionPayload).eq('id', section.id).select('id').single()
      : supabase.from('huddle_sections').insert(sectionPayload).select('id').single()

    const { data: savedSection, error: sectionError } = await sectionQuery

    if (sectionError) {
      redirectWithStatus('save_failed', sectionError.message)
    }

    if (savedSection?.id) {
      persistedSectionIds.push(savedSection.id)
    }
  }

  if (draftId) {
    const { data: existingActions, error: existingActionsError } = await supabase
      .from('action_items')
      .select('id')
      .eq('huddle_id', huddleId)

    if (existingActionsError) {
      redirectWithStatus('save_failed', existingActionsError.message)
    }

    const idsToDelete = (existingActions || [])
      .map((item) => item.id)
      .filter((id) => !persistedActionIds.includes(id))

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase.from('action_items').delete().in('id', idsToDelete)

      if (deleteError) {
        redirectWithStatus('save_failed', deleteError.message)
      }
    }

    const { data: existingSections, error: existingSectionsError } = await supabase
      .from('huddle_sections')
      .select('id')
      .eq('huddle_id', huddleId)

    if (existingSectionsError) {
      redirectWithStatus('save_failed', existingSectionsError.message)
    }

    const sectionIdsToDelete = (existingSections || [])
      .map((item) => item.id)
      .filter((id) => !persistedSectionIds.includes(id))

    if (sectionIdsToDelete.length > 0) {
      const { error: deleteSectionsError } = await supabase.from('huddle_sections').delete().in('id', sectionIdsToDelete)

      if (deleteSectionsError) {
        redirectWithStatus('save_failed', deleteSectionsError.message)
      }
    }
  }

  revalidatePath('/')
  revalidatePath('/preview/huddle')
  revalidatePath('/preview/actions')
  revalidatePath('/admin')
  revalidatePath('/admin/huddles/new')
  revalidatePath('/actions')
  revalidatePath('/schedule')
  revalidatePath('/volunteers')

  return { nextStatus, huddleId }
}

export async function saveDraftHuddle(formData: FormData) {
  const { huddleId } = await persistHuddle(formData, 'draft')
  redirectWithStatus('saved', undefined, huddleId)
}

export async function publishHuddle(formData: FormData) {
  const { huddleId } = await persistHuddle(formData, 'published')
  redirectWithStatus('published', undefined, huddleId)
}
