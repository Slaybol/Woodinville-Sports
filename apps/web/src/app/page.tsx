import Link from 'next/link'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { IPhoneFrame } from '@/components/layout/iphone-frame'
import { LiveDataFallback } from '@/components/layout/live-data-fallback'
import { ParentShell } from '@/components/layout/parent-shell'
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
      <IPhoneFrame>
        <main className="flex h-full min-h-screen items-center justify-center bg-ink-100 px-4 py-8 md:min-h-0 md:overflow-y-auto">
          <section className="w-full">
            <div className="mb-6 text-center">
              <WoodinvilleLogo size={56} priority className="mx-auto mb-4 rounded-lg bg-white ring-white/60" />
              <p className="brand-kicker justify-center">Woodinville Football</p>
              <h1 className="mt-2 font-display text-4xl text-ink-950">Gridiron Connect</h1>
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
      </IPhoneFrame>
    )
  }

  const huddleHome = await getCurrentHuddleHomeResult()

  return (
    <ParentShell
      activeNav="huddle"
      statusBadge={{
        label: huddleHome.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback',
        tone: huddleHome.source === 'supabase' ? 'live' : 'fallback',
      }}
      banner={
        huddleHome.source === 'demo' && huddleHome.reason
          ? { text: `Signed-in home is showing demo data. Reason: ${huddleHome.reason}`, tone: 'warning' }
          : null
      }
    >
      {huddleHome.source === 'supabase' ? (
        <HuddleHomeContent model={huddleHome.model} />
      ) : (
        <LiveDataFallback
          title="Home data unavailable"
          message={huddleHome.reason || 'The live Weekly Huddle could not be loaded for your account right now.'}
        />
      )}
    </ParentShell>
  )
}
