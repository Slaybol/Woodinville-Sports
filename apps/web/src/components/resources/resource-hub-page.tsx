'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  CalendarDays,
  HandHeart,
  Landmark,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import type { SiteResourceHub } from '@/lib/site-extension-data'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function hubIcon(slug: SiteResourceHub['slug']) {
  if (slug === 'team') return <CalendarDays size={20} className="mt-0.5 shrink-0 text-falcon-700" />
  if (slug === 'parents') return <HandHeart size={20} className="mt-0.5 shrink-0 text-falcon-700" />
  if (slug === 'fgic') return <Landmark size={20} className="mt-0.5 shrink-0 text-falcon-700" />
  return <Megaphone size={20} className="mt-0.5 shrink-0 text-falcon-700" />
}

export function ResourceHubPage({ hub }: { hub: SiteResourceHub }) {
  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}
      banner={{
        text: 'These hubs are demo-ready stubs that show how Gridiron Connect can grow into a private companion to the public website.',
        tone: 'warning',
      }}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="info">Website companion</Badge>
              <Badge variant="outline">{hub.shortTitle}</Badge>
            </div>
            <p className="brand-kicker">MVP 2.0 Preview</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">{hub.title}</h1>
            <p className="mt-3 text-sm leading-6 text-ink-600">{hub.summary}</p>
          </div>

          <Card className="bg-falcon-50">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                {hubIcon(hub.slug)}
                <div>
                  <p className="font-bold text-falcon-950">How this should feel</p>
                  <p className="mt-1 text-sm leading-6 text-falcon-900">{hub.intro}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website sections this connects to</CardTitle>
              <p className="text-sm text-ink-600">These are the public-site areas this private app experience should extend.</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {hub.websiteSections.map((section) => (
                <Badge key={section} variant="outline">
                  {section}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Public site today</CardTitle>
              <p className="text-sm text-ink-600">Direct website links families and staff already know how to use.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {hub.links.map((link) => (
                <div key={link.label} className="rounded-lg border border-ink-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-ink-950">{link.label}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-600">{link.description}</p>
                    </div>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        Open
                        <ArrowUpRight size={14} className="ml-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What this becomes in the app</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hub.appOpportunities.map((opportunity) => (
                <div key={opportunity} className="flex gap-3 rounded-lg border border-ink-200 p-3">
                  <Sparkles size={16} className="mt-1 shrink-0 text-gold-500" />
                  <p className="text-sm leading-6 text-ink-700">{opportunity}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why this matters for the demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
              <p>
                These pages are here to show the shape of the product, not just the narrowest working MVP.
              </p>
              <p>
                A coach or secretary should be able to see that Gridiron Connect can grow beyond huddles and tasks into a fuller private program hub.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gold-100">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-900" />
                <div>
                  <p className="font-bold text-amber-950">Demo note</p>
                  <p className="mt-1 text-sm leading-6 text-amber-950">
                    This is a structured stub. It is intentionally present so the app feels like an extension of the website even before every workflow is fully built.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/resources">
            <Button className="w-full">
              <Users size={16} className="mr-2" />
              Back to resource hubs
            </Button>
          </Link>
        </aside>
      </main>
    </ParentShell>
  )
}
