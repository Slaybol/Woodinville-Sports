'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string
  full_name: string
  role: 'coach' | 'team_parent' | 'parent'
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

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

  const fetchProfile = async (supabase: any, userId: string) => {
    try {
      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        // Don't throw error, just set basic profile without teams
        setProfile(null)
        return
      }

      // Get user's teams (with error handling)
      let teams = []
      try {
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select(`
            role,
            teams!inner(id, name, level)
          `)
          .eq('user_id', userId)

        if (!teamError && teamData) {
          teams = teamData.map((tm: any) => ({
            id: tm.teams.id,
            name: tm.teams.name,
            level: tm.teams.level,
            role: tm.role
          }))
        }
      } catch (teamError) {
        console.error('Team query error:', teamError)
        // Continue without teams if query fails
      }

      const profileWithTeams = {
        ...profileData,
        teams: teams
      }

      setProfile(profileWithTeams)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    }
  }

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
