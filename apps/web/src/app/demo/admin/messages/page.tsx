import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platformMessages } from '@/lib/platform-demo-data'

export default function DemoAdminMessagesPage() {
  return (
    <DemoAdminShell
      activeNav="messages"
      title="Messages"
      description="Static official announcements, urgent alerts, and read-status metadata."
    >
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
              <p className="mt-3 text-sm text-ink-600">{message.audience} | {message.sentBy} | {message.timing}</p>
            </article>
          ))}
        </CardContent>
      </Card>
    </DemoAdminShell>
  )
}
