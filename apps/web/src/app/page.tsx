'use client'

import Link from 'next/link'
import { LogOut, User } from 'lucide-react'
import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { huddleHomeDemo } from '@/lib/demo-data'

export default function HomePage() {
  const { user, profile, loading, signOut } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-falcon-900 text-2xl font-bold text-white">
            W
          </div>
          <p className="text-sm text-ink-600">Loading Gridiron Connect...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-10">
        <section className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-falcon-900 text-2xl font-bold text-white">
              W
            </div>
            <h1 className="text-2xl font-bold text-ink-950">Gridiron Connect</h1>
            <p className="mt-1 text-sm text-ink-600">
              Private Weekly Huddle command center for Woodinville Football families.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign in to continue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-5 text-sm leading-6 text-ink-600">
                View this week&apos;s huddle, family action items, calendar logistics, and volunteer needs.
              </p>
              <Link href="/auth">
                <Button className="w-full">Sign In / Accept Invite</Button>
              </Link>
              <Link href="/preview/huddle" className="mt-3 block text-center text-sm font-bold text-falcon-700">
                Preview without signing in
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
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
              <span>{profile?.full_name || user.email}</span>
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

      <HuddleHomeContent model={huddleHomeDemo} />
    </div>
  )
}
