import { Bell, Megaphone, Send } from 'lucide-react'
import { AdminShell } from '@/components/layout/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformMessages } from '@/lib/platform-demo-data'

export default function AdminMessagesPage() {
  return (
    <AdminShell
      activeNav="messages"
      title="Messages"
      description="Compose and preview official announcements, urgent alerts, team updates, and read-status metadata before this becomes a live workflow."
      badge="MVP 2.0 Preview"
    >
      <section className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Compose preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-ink-200 p-4">
              <Badge variant="destructive">Urgent alert</Badge>
              <h2 className="mt-3 font-bold text-ink-950">Practice time update</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                Staff can stage a message, select an audience, preview the parent view, and later send by app, email, or text.
              </p>
            </div>
            <div className="grid gap-2 text-sm text-ink-600">
              <p><span className="font-bold text-ink-950">Audience:</span> All program families</p>
              <p><span className="font-bold text-ink-950">Sender:</span> Coach or team secretary</p>
              <p><span className="font-bold text-ink-950">Delivery:</span> App now, text/email later</p>
            </div>
            <Button className="w-full">
              <Send size={16} className="mr-2" />
              Preview send flow
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformMessages.map((message) => (
              <article key={message.title} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={message.type === 'Urgent alert' ? 'destructive' : 'info'}>{message.type}</Badge>
                  <Badge variant="outline">{message.status}</Badge>
                  <Badge variant="secondary">{message.readRate} read</Badge>
                </div>
                <h2 className="mt-3 font-bold text-ink-950">{message.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-600">{message.body}</p>
                <div className="mt-3 grid gap-2 text-sm text-ink-600 md:grid-cols-3">
                  <p><span className="font-bold text-ink-950">Audience:</span> {message.audience}</p>
                  <p><span className="font-bold text-ink-950">Sender:</span> {message.sentBy}</p>
                  <p><span className="font-bold text-ink-950">Timing:</span> {message.timing}</p>
                </div>
              </article>
            ))}
            <div className="rounded-lg bg-falcon-50 p-3 text-sm leading-6 text-falcon-950">
              <p className="flex items-center gap-2 font-bold">
                <Megaphone size={16} />
                Official first
              </p>
              <p className="mt-1">This intentionally models staff-to-family communication before open parent-to-parent chat.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Urgent alert behavior</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm leading-6 text-ink-700 md:flex-row">
          <div className="flex-1 rounded-lg bg-ink-50 p-3">
            <p className="flex items-center gap-2 font-bold text-ink-950">
              <Bell size={16} className="text-red-700" />
              High priority
            </p>
            <p className="mt-1">Weather, field changes, practice time moves, and travel updates should stand apart from regular announcements.</p>
          </div>
          <div className="flex-1 rounded-lg bg-ink-50 p-3">
            <p className="font-bold text-ink-950">Read receipts</p>
            <p className="mt-1">The demo shows read-rate metadata now; live delivery tracking can come after workflow decisions.</p>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
