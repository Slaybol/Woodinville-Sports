import Link from 'next/link'
import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { SignedInHomeHeader } from '@/components/home/signed-in-home-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentHuddleHomeResult } from '@/lib/data/huddles'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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

  const huddleHome = await getCurrentHuddleHomeResult()

  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <SignedInHomeHeader />

      {huddleHome.source === 'demo' && huddleHome.reason && (
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
            Signed-in home is showing demo data. Reason: {huddleHome.reason}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <Badge className={huddleHome.source === 'supabase' ? 'bg-falcon-100 text-falcon-900' : 'bg-gold-100 text-amber-950'}>
          {huddleHome.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
        </Badge>
      </div>

      <HuddleHomeContent model={huddleHome.model} />
    </div>
  )
}
