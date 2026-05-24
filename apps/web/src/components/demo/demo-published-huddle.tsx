'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const demoStorageKey = 'gridiron-demo-huddle'

interface DemoHuddleUpdate {
  title: string
  summary: string
  publishedAt: string
}

export function DemoPublishedHuddle() {
  const [update] = useState<DemoHuddleUpdate | null>(() => {
    if (typeof window === 'undefined') return null

    const raw = window.localStorage.getItem(demoStorageKey)
    if (!raw) return null

    try {
      return JSON.parse(raw) as DemoHuddleUpdate
    } catch {
      window.localStorage.removeItem(demoStorageKey)
      return null
    }
  })

  if (!update) return null

  return (
    <div className="px-4 pt-4">
      <Card className="border-falcon-200 bg-falcon-50">
        <CardContent className="pt-4 sm:pt-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Published in demo</Badge>
            <Badge variant="outline">{new Date(update.publishedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Badge>
          </div>
          <p className="font-bold text-falcon-950">{update.title}</p>
          <p className="mt-2 text-sm leading-6 text-falcon-900">{update.summary}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function getDemoStorageKey() {
  return demoStorageKey
}
