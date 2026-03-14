'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'parent' | 'team_parent' | 'coach'>('parent')
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [invitationCode, setInvitationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const [teams, setTeams] = useState<Array<{id: string, name: string}>>([])
  const [invitationData, setInvitationData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Load teams when component mounts
    const loadTeams = async () => {
      if (!mounted) return
      
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('teams')
          .select('id, name')
          .eq('sport', 'football')
          .order('name')

        if (error) throw error
        setTeams(data || [])
        
        // Auto-select first team for parents
        if (data && data.length > 0 && role === 'parent') {
          setSelectedTeam(data[0].id)
        }
      } catch (error) {
        console.error('Error loading teams:', error)
      }
    }

    loadTeams()
  }, [mounted, role])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!mounted) return

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      if (isSignUp) {
        // Validate invitation code first
        if (!invitationCode) {
          throw new Error('Invitation code is required')
        }

        const { data: invitation, error: invitationError } = await supabase
          .from('invitations')
          .select('*')
          .eq('code', invitationCode.toUpperCase())
          .eq('status', 'pending')
          .single()

        if (invitationError || !invitation) {
          throw new Error('Invalid or expired invitation code')
        }

        // Check if invitation has expired
        if (new Date(invitation.expires_at) < new Date()) {
          throw new Error('Invitation has expired')
        }

        // Pre-fill form with invitation data
        if (invitation.email && !email) setEmail(invitation.email)
        if (invitation.full_name && !fullName) setFullName(invitation.full_name)
        if (invitation.role && role === 'parent') setRole(invitation.role)
        if (invitation.team_id && !selectedTeam) setSelectedTeam(invitation.team_id)

        setInvitationData(invitation)

        // Check if user already exists first
        const { data: existingUser } = await supabase.auth.signInWithPassword({
          email: email || invitation.email,
          password,
        })

        if (existingUser.user) {
          // User already exists, sign them in
          router.push('/')
          return
        }

        // Sign up new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email || invitation.email,
          password,
          options: {
            data: {
              full_name: fullName || invitation.full_name,
              role: role || invitation.role,
            }
          }
        })

        if (authError) throw authError

        if (authData.user) {
          // Create profile record - use upsert to handle existing profiles
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: authData.user.id,
              email: authData.user.email!,
              full_name: fullName || invitation.full_name,
              role: role || invitation.role,
            }, {
              onConflict: 'id' // Handle conflicts on the id column
            })

          if (profileError) throw profileError

          // Assign user to team from invitation
          const finalTeamId = selectedTeam || invitation.team_id
          if (finalTeamId) {
            const { error: teamMemberError } = await supabase
              .from('team_members')
              .insert({
                user_id: authData.user.id,
                team_id: finalTeamId,
                role: role || invitation.role,
                joined_at: new Date().toISOString(),
              })

            if (teamMemberError) throw teamMemberError
          }

          // Mark invitation as accepted
          await supabase
            .from('invitations')
            .update({ 
              status: 'accepted',
              accepted_at: new Date().toISOString(),
              accepted_by: authData.user.id
            })
            .eq('id', invitation.id)

          // For development: if email confirmation is disabled, sign in immediately
          if (!authData.user.email_confirmed_at) {
            // User created but email not confirmed
            setMessage('Account created! Please check your email to verify your account.')
          } else {
            // Email confirmation disabled, sign in immediately
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: email || invitation.email,
              password,
            })
            if (signInError) throw signInError
            router.push('/')
          }
        }
      } else {
        // Sign in
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) throw authError

        if (authData.user) {
          router.push('/')
        }
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Woodinville Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Woodinville Sports</h1>
          <p className="text-gray-600">Falcons Football • Gridiron Connect</p>
        </div>

        <Card className="falcons-card">
          <CardHeader>
            <CardTitle className="text-center text-gray-900">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invitation Code *
                  </label>
                  <input
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
                    placeholder="FALCON-XXXXXX"
                    required
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Enter the invitation code you received from your coach or team admin
                  </div>
                  {invitationData && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm">
                      <div><strong>Invitation for:</strong> {invitationData.full_name}</div>
                      <div><strong>Role:</strong> {invitationData.role.replace('_', ' ')}</div>
                      <div><strong>Team:</strong> {invitationData.teams?.name || 'Assigned Team'}</div>
                      {invitationData.message && (
                        <div className="mt-1"><strong>Message:</strong> {invitationData.message}</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    placeholder={invitationData?.full_name || 'Enter your full name'}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'parent', label: 'Parent', desc: 'View & sign up' },
                      { value: 'team_parent', label: 'Team Parent', desc: 'Manage volunteers' },
                      { value: 'coach', label: 'Coach', desc: 'Full access' }
                    ].map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value as any)}
                        className={`p-2 rounded-lg border-2 text-center transition-colors ${
                          role === r.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium">{r.label}</div>
                        <div className="text-xs text-gray-500">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Assignment
                  </label>
                  <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a team...</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-1 text-xs text-gray-500">
                    {role === 'coach' || role === 'team_parent' 
                      ? 'Coaches and Team Parents can access all teams'
                      : 'Select your player\'s team'
                    }
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full falcons-button"
              >
                {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                className="text-green-600 hover:text-green-800 text-sm"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            {!isSignUp && (
              <div className="mt-4 text-center">
                <Link href="/auth/forgot-password" className="text-green-600 hover:text-green-800 text-sm">
                  Forgot your password?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For Woodinville High School Falcons Football families</p>
          <p className="mt-1">Questions? Contact the Falcon Gridiron Club</p>
        </div>
      </div>
    </div>
  )
}
