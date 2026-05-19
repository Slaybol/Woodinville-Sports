'use client'

import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function SignedInHomeHeader() {
  const { user, profile, loading, signOut } = useAuth()

  return (
    <header className="falcons-header sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-lg font-bold text-white">
            W
          </div>
          <div>
            <p className="text-base font-bold leading-5">Gridiron Connect</p>
            <p className="text-xs text-white/75">Woodinville Football Weekly Huddle</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 text-sm text-white/85">
            <User size={16} />
            <span>{loading ? 'Loading...' : profile?.full_name || user?.email || 'Signed in'}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
