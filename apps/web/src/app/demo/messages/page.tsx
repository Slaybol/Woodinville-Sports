import { Bell, Megaphone, MessageSquareText } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformMessages } from '@/lib/platform-demo-data'

function messageIcon(type: string) {
  if (type === 'Urgent alert') return Bell
  if (type === 'Team update') return MessageSquareText
  return Megaphone
}

export default function DemoMessagesPage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="success">Official communication</Badge>
            <Badge variant="outline">Static demo</Badge>
          </div>
          <p className="brand-kicker">Messages</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Announcements and alerts</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            Staff-controlled communication without live auth, delivery, or database calls.
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
                      <p className="mt-3 text-xs font-bold text-ink-500">{message.audience} | {message.readRate} read</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
