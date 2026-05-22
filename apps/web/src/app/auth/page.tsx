'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthShell } from '@/components/layout/auth-shell'
import { Button } from '@/components/ui/button'

type InviteRole = 'parent' | 'team_parent' | 'coach'

interface TeamOption {
  id: string
  name: string
}

function familyNameFromContact(fullName: string) {
  const lastName = fullName.trim().split(/\s+/).filter(Boolean).slice(-1)[0]
  return lastName ? `${lastName} family` : 'Woodinville family'
}

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<InviteRole>('parent')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const [teams, setTeams] = useState<TeamOption[]>([])
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const loadTeams = async () => {
      if (!mounted) return

      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data } = await supabase.from('teams').select('id, name').eq('sport', 'football').order('name')
        setTeams(data || [])
      } catch (teamError) {
        console.error('Error loading teams:', teamError)
      }
    }

    loadTeams()
  }, [mounted])

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (!mounted) return

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      if (isSignUp) {
        if (!invitationCode.trim()) {
          throw new Error('Invitation code is required.')
        }

        if (!fullName.trim()) {
          throw new Error('Full name is required.')
        }

        let signedInUser: { id: string; email?: string | null; email_confirmed_at?: string | null } | null = null

        const existingSignIn = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (existingSignIn.data.user) {
          signedInUser = existingSignIn.data.user
        } else {
          const signUpResult = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName.trim(),
              },
            },
          })

          if (signUpResult.error) {
            throw signUpResult.error
          }

          signedInUser = signUpResult.data.user
        }

        if (!signedInUser?.id) {
          throw new Error('We could not create or restore your account session.')
        }

        const { data: invitation, error: invitationError } = await supabase
          .from('invitations')
          .select('*')
          .eq('code', invitationCode.trim().toUpperCase())
          .eq('email', email)
          .eq('status', 'pending')
          .maybeSingle()

        if (invitationError || !invitation) {
          throw new Error('Invitation not found for this email address.')
        }

        if (new Date(invitation.expires_at) < new Date()) {
          throw new Error('Invitation has expired.')
        }

        const invitedRole = (invitation.role as InviteRole) || role
        const invitedTeamId = invitation.team_id || selectedTeam || null

        const { error: profileError } = await supabase.from('profiles').upsert(
          {
            id: signedInUser.id,
            email,
            full_name: fullName.trim(),
            role: invitedRole,
          },
          { onConflict: 'id' }
        )

        if (profileError) {
          throw profileError
        }

        if (invitedRole === 'parent') {
          const { data: existingMembership } = await supabase
            .from('family_members')
            .select('family_id')
            .eq('profile_id', signedInUser.id)
            .limit(1)
            .maybeSingle()

          if (!existingMembership?.family_id) {
            const { data: createdFamily, error: familyError } = await supabase
              .from('families')
              .insert({
                name: familyNameFromContact(fullName),
                primary_contact_id: signedInUser.id,
              })
              .select('id')
              .single()

            if (familyError || !createdFamily?.id) {
              throw familyError || new Error('Unable to create a family profile.')
            }

            const { error: familyMemberError } = await supabase.from('family_members').insert({
              family_id: createdFamily.id,
              profile_id: signedInUser.id,
              role: 'guardian',
              display_name: fullName.trim(),
              is_primary: true,
            })

            if (familyMemberError) {
              throw familyMemberError
            }
          }
        } else if (invitedTeamId) {
          const { error: teamMemberError } = await supabase.from('team_members').upsert(
            {
              profile_id: signedInUser.id,
              team_id: invitedTeamId,
              role: invitedRole,
            },
            { onConflict: 'team_id,profile_id' }
          )

          if (teamMemberError) {
            throw teamMemberError
          }
        }

        const { error: invitationUpdateError } = await supabase
          .from('invitations')
          .update({
            status: 'accepted',
            accepted_at: new Date().toISOString(),
            accepted_by: signedInUser.id,
          })
          .eq('id', invitation.id)

        if (invitationUpdateError) {
          throw invitationUpdateError
        }

        if (!signedInUser.email_confirmed_at) {
          setMessage('Account created. If email confirmation is enabled, verify your email before signing in again.')
        } else {
          router.push(invitedRole === 'parent' ? '/profile?setup=1' : '/')
        }
      } else {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) {
          throw authError
        }

        if (authData.user) {
          router.push('/')
        }
      }
    } catch (authError: any) {
      setError(authError.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-ink-50" />
  }

  return (
    <AuthShell
      title={isSignUp ? 'Accept Invitation' : 'Sign In'}
      subtitle={
        isSignUp
          ? 'Create access using the invitation details sent by your coach or team admin.'
          : 'Sign in to view this week’s huddle, family action items, calendar logistics, and volunteer needs.'
      }
      footerLink={
        isSignUp
          ? { href: '/auth', label: 'Already have an account? Sign in' }
          : { href: '/auth/forgot-password', label: 'Forgot your password?' }
      }
    >
      <form onSubmit={handleAuth} className="space-y-4">
        {isSignUp && (
          <>
            <label className="block space-y-1.5">
              <span className="text-sm font-bold text-ink-700">Invitation code</span>
              <input
                type="text"
                value={invitationCode}
                onChange={(event) => setInvitationCode(event.target.value)}
                className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm uppercase outline-none focus:ring-2 focus:ring-falcon-500"
                placeholder="FALCON-XXXXXX"
                required
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-sm font-bold text-ink-700">Full name</span>
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
                required
              />
            </label>
          </>
        )}

        <label className="block space-y-1.5">
          <span className="text-sm font-bold text-ink-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            required
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-bold text-ink-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            required
            minLength={6}
          />
        </label>

        {isSignUp && (
          <div className="rounded-lg border border-ink-200 bg-ink-50 p-3 text-sm leading-6 text-ink-600">
            Invitations usually carry your role and team assignment already. The fields below are only a fallback for older invites.
          </div>
        )}

        {isSignUp && (
          <label className="block space-y-1.5">
            <span className="text-sm font-bold text-ink-700">Fallback role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as InviteRole)}
              className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            >
              <option value="parent">Parent</option>
              <option value="team_parent">Team Parent</option>
              <option value="coach">Coach</option>
            </select>
          </label>
        )}

        {isSignUp && (
          <label className="block space-y-1.5">
            <span className="text-sm font-bold text-ink-700">Fallback team</span>
            <select
              value={selectedTeam}
              onChange={(event) => setSelectedTeam(event.target.value)}
              className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            >
              <option value="">Select team if needed</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {error && (
          <div className="rounded-md border border-statusRed-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-md border border-falcon-100 bg-falcon-50 px-3 py-2 text-sm text-falcon-900">
            {message}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Working...' : isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-5 border-t border-ink-200 pt-5 text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
            setMessage('')
          }}
          className="text-sm font-bold text-falcon-700 hover:text-falcon-800"
        >
          {isSignUp ? 'Already have an account? Sign in' : 'Need to accept an invitation? Start here'}
        </button>
      </div>
    </AuthShell>
  )
}
