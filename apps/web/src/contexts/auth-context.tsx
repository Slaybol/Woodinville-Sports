'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseClient, User } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string
  full_name: string
  role: 'coach' | 'team_parent' | 'parent' | 'player' | 'fgic_admin'
  phone?: string
  avatar_url?: string
  teams?: Array<{
    id: string
    name: string
    level: string
    role: string
  }>
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface TeamMembershipRow {
  role: string
  teams: Array<{
    id: string
    name: string
    level: string
  }>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.location.pathname.startsWith('/demo')
  })

  async function fetchProfile(supabase: SupabaseClient, userId: string) {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        setProfile(null)
        return
      }

      let teams: Profile['teams'] = []
      try {
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select(`
            role,
            teams!inner(id, name, level)
          `)
          .eq('profile_id', userId)

        if (!teamError && teamData) {
          teams = (teamData as TeamMembershipRow[]).map((teamMember) => ({
            id: teamMember.teams[0]?.id ?? '',
            name: teamMember.teams[0]?.name ?? '',
            level: teamMember.teams[0]?.level ?? '',
            role: teamMember.role,
          }))
        }
      } catch (teamError) {
        console.error('Team query error:', teamError)
      }

      setProfile({
        ...profileData,
        teams,
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    }
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    if (window.location.pathname.startsWith('/demo')) {
      return
    }

    const initAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(supabase, session.user.id)
        }
        
        setLoading(false)

        // Listen for auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(supabase, session.user.id)
          } else {
            setProfile(null)
          }
          
          setLoading(false)
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Auth initialization error:', error)
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const refreshProfile = async () => {
    if (user && typeof window !== 'undefined') {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        await fetchProfile(supabase, user.id)
      } catch (error) {
        console.error('Error refreshing profile:', error)
      }
    }
  }

  const signOut = async () => {
    if (typeof window === 'undefined') return
    
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
