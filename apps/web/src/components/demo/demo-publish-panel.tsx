'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Trash2 } from 'lucide-react'
import { getDemoStorageKey } from '@/components/demo/demo-published-huddle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DemoPublishPanel() {
  const [title, setTitle] = useState('Coach update for this week')
  const [summary, setSummary] = useState('Practice logistics are confirmed. Please review registration, camp, and volunteer items before the next huddle.')
  const [saved, setSaved] = useState(false)

  function publishDemoUpdate() {
    window.localStorage.setItem(
      getDemoStorageKey(),
      JSON.stringify({
        title,
        summary,
        publishedAt: new Date().toISOString(),
      })
    )
    setSaved(true)
  }

  function resetDemoUpdate() {
    window.localStorage.removeItem(getDemoStorageKey())
    setSaved(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">Simulated publish</Badge>
          {saved && <Badge variant="info">Parent demo updated</Badge>}
        </div>
        <CardTitle>Publish a demo huddle update</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block text-sm font-bold text-ink-950" htmlFor="demo-title">
          Huddle title
        </label>
        <input
          id="demo-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-950 outline-none focus:border-falcon-500 focus:ring-2 focus:ring-falcon-100"
        />
        <label className="block text-sm font-bold text-ink-950" htmlFor="demo-summary">
          Summary
        </label>
        <textarea
          id="demo-summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          rows={5}
          className="w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm leading-6 text-ink-950 outline-none focus:border-falcon-500 focus:ring-2 focus:ring-falcon-100"
        />
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={publishDemoUpdate}>
            <Send size={16} className="mr-2" />
            Publish to parent demo
          </Button>
          <Button type="button" variant="outline" onClick={resetDemoUpdate}>
            <Trash2 size={16} className="mr-2" />
            Reset
          </Button>
          <Link href="/demo">
            <Button type="button" variant="outline">View parent demo</Button>
          </Link>
        </div>
        <p className="text-sm leading-6 text-ink-600">
          This writes only to this browser&apos;s demo storage. It proves the end-to-end story without touching Supabase.
        </p>
      </CardContent>
    </Card>
  )
}
