import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { ProfileRole } from '@gridiron/shared'

type AdminGuardFailureMode = 'redirect-to-auth' | 'redirect-home'
const adminWebRoles: ProfileRole[] = ['coach', 'team_parent', 'fgic_admin']

interface EnsureAdminOptions {
  onUnauthenticated?: AdminGuardFailureMode
  onUnauthorized?: AdminGuardFailureMode
}

function handleFailure(mode: AdminGuardFailureMode): never {
  if (mode === 'redirect-home') {
    redirect('/')
  }

  redirect('/auth')
}

export async function requireAdminAccess(options: EnsureAdminOptions = {}) {
  const {
    onUnauthenticated = 'redirect-to-auth',
    onUnauthorized = 'redirect-home',
  } = options

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    handleFailure(onUnauthenticated)
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (error || !profile?.role || !adminWebRoles.includes(profile.role as ProfileRole)) {
    handleFailure(onUnauthorized)
  }

  return { supabase, user, profile }
}
