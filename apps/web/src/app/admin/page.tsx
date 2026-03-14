'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Mail, Calendar, CheckCircle, XCircle, Clock, Plus } from 'lucide-react'

interface Invitation {
  id: string
  code: string
  email: string | null
  full_name: string | null
  role: 'parent' | 'team_parent' | 'coach'
  team_id: string
  team_name: string
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  expires_at: string
  accepted_at: string | null
  message: string | null
  created_at: string
}

export default function AdminDashboard() {
  const { user, profile } = useAuth()
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [teams, setTeams] = useState<Array<{id: string, name: string}>>([])

  // Check if user has admin access - temporarily disabled for testing
  const hasAdminAccess = true // profile?.role === 'coach' || profile?.role === 'team_parent'

  useEffect(() => {
    if (!hasAdminAccess) return
    
    loadInvitations()
    loadTeams()
  }, [hasAdminAccess])

  const loadInvitations = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { data, error } = await supabase
        .from('invitations')
        .select(`
          *,
          teams!inner(name)
        `)
        .eq('invited_by', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvitations(data || [])
    } catch (error) {
      console.error('Error loading invitations:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTeams = async () => {
    try {
      console.log('Loading teams...')
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .eq('sport', 'football')
        .order('name')

      console.log('Teams query result:', { data, error })
      
      if (error) {
        console.error('Teams query error:', error)
        throw error
      }
      
      console.log('Setting teams:', data)
      setTeams(data || [])
    } catch (error) {
      console.error('Error loading teams:', error)
    }
  }

  const createInvitation = async (formData: {
    email: string
    fullName: string
    role: 'parent' | 'team_parent' | 'coach'
    teamId: string
    message: string
  }) => {
    try {
      console.log('Creating invitation with data:', formData)
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      // Generate invitation code
      console.log('Generating invitation code...')
      const { data: codeData, error: codeError } = await supabase.rpc('generate_invitation_code')
      
      if (codeError) {
        console.error('Error generating code:', codeError)
        throw codeError
      }
      
      console.log('Generated code:', codeData)
      
      // Create invitation
      console.log('Creating invitation record...')
      const { error } = await supabase
        .from('invitations')
        .insert({
          code: codeData,
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          team_id: formData.teamId,
          invited_by: user?.id,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          message: formData.message,
        })

      if (error) {
        console.error('Error creating invitation:', error)
        throw error
      }

      console.log('Invitation created successfully')
      setShowCreateForm(false)
      loadInvitations()
    } catch (error) {
      console.error('Error in createInvitation:', error)
    }
  }

  const revokeInvitation = async (invitationId: string) => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase
        .from('invitations')
        .update({ status: 'revoked' })
        .eq('id', invitationId)

      if (error) throw error
      loadInvitations()
    } catch (error) {
      console.error('Error revoking invitation:', error)
    }
  }

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="falcons-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-green-100">Invitation Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Team Invitations</h2>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="falcons-button"
            >
              <Plus size={16} className="mr-2" />
              Create Invitation
            </Button>
          </div>
        </div>

        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Invitation</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateInvitationForm
                teams={teams}
                onSubmit={createInvitation}
                onCancel={() => setShowCreateForm(false)}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Sent Invitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading invitations...</p>
              </div>
            ) : invitations.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No invitations sent yet</p>
                <p className="text-sm text-gray-500 mt-2">Create your first invitation to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <InvitationCard
                    key={invitation.id}
                    invitation={invitation}
                    onRevoke={() => revokeInvitation(invitation.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function CreateInvitationForm({
  teams,
  onSubmit,
  onCancel
}: {
  teams: Array<{id: string, name: string}>
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    role: 'parent' as 'parent' | 'team_parent' | 'coach',
    teamId: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(formData)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value as any})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="parent">Parent</option>
            <option value="team_parent">Team Parent</option>
            <option value="coach">Coach</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team
          </label>
          <select
            value={formData.teamId}
            onChange={(e) => setFormData({...formData, teamId: e.target.value})}
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
          {/* Debug info */}
          <div className="mt-1 text-xs text-gray-500">
            Debug: Found {teams.length} teams
            {teams.length > 0 && `: ${teams.map(t => t.name).join(', ')}`}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Personal Message (Optional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
          placeholder="Welcome to the Woodinville Falcons Football team..."
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="falcons-button"
        >
          {loading ? 'Creating...' : 'Create Invitation'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

function InvitationCard({
  invitation,
  onRevoke
}: {
  invitation: Invitation
  onRevoke: () => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      case 'revoked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />
      case 'accepted': return <CheckCircle size={16} />
      case 'expired': return <XCircle size={16} />
      case 'revoked': return <XCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900">
              {invitation.full_name || invitation.email}
            </h3>
            <Badge className={getStatusColor(invitation.status)}>
              {getStatusIcon(invitation.status)}
              <span className="ml-1">{invitation.status}</span>
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Email:</span> {invitation.email}
            </div>
            <div>
              <span className="font-medium">Role:</span> {invitation.role.replace('_', ' ')}
            </div>
            <div>
              <span className="font-medium">Team:</span> {invitation.team_name}
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Code:</span> 
              <code className="ml-1 bg-gray-100 px-2 py-1 rounded">{invitation.code}</code>
            </div>
            <div className="mt-1">
              <span className="font-medium">Expires:</span> {new Date(invitation.expires_at).toLocaleDateString()}
            </div>
            {invitation.message && (
              <div className="mt-2">
                <span className="font-medium">Message:</span> {invitation.message}
              </div>
            )}
          </div>
        </div>

        {invitation.status === 'pending' && (
          <div className="ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onRevoke}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Revoke
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
