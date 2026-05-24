import Link from 'next/link'
import { Bell, CheckCircle2, Megaphone, MessageSquareText } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformMessages } from '@/lib/platform-demo-data'

function messageIcon(type: string) {
  if (type === 'Urgent alert') return Bell
  if (type === 'Team update') return MessageSquareText
  return Megaphone
}

export default function MessagesPage() {
  return (
    <ParentShell activeNav="more" statusBadge={{ label: 'MVP 2.0 Preview', tone: 'live' }}>
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Official communication</Badge>
            <Badge variant="outline">No parent chat yet</Badge>
          </div>
          <p className="brand-kicker">Messages</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Announcements and alerts</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            A staff-controlled message center for announcements, urgent alerts, read status, and team updates.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Inbox preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformMessages.map((message) => {
              const Icon = messageIcon(message.type)

              return (
                <article key={message.title} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-falcon-50 text-falcon-700">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={message.type === 'Urgent alert' ? 'destructive' : 'info'}>{message.type}</Badge>
                        <Badge variant="outline">{message.status}</Badge>
                      </div>
                      <h2 className="mt-2 font-bold text-ink-950">{message.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-ink-600">{message.body}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-ink-500">
                        <span>{message.audience}</span>
                        <span>|</span>
                        <span>{message.timing}</span>
                        <span>|</span>
                        <span>{message.readRate} read</span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Read-status model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
            <div className="flex gap-3 rounded-lg bg-falcon-50 p-3">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-falcon-700" />
              <p>
                Staff can see which families received the message, which families still need follow-up, and which
                audience the update was intended for.
              </p>
            </div>
            <Link href="/team">
              <Button variant="outline" className="w-full">View team context</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </ParentShell>
  )
}
