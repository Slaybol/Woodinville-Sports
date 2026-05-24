import { AlertTriangle, ExternalLink } from 'lucide-react'
import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { demoActionItems } from '@/lib/demo-data'

function actionVariant(label?: string | null) {
  if (label === 'Past due') return 'destructive' as const
  if (label?.startsWith('Due')) return 'warning' as const
  return 'info' as const
}

export default function DemoAdminActionsPage() {
  return (
    <DemoAdminShell
      activeNav="actions"
      title="Action Manager"
      description="Coach and secretary view for family tasks, deadlines, outside links, and follow-up priority."
    >
      <Card>
        <CardHeader>
          <CardTitle>Published action items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoActionItems.map((action) => (
            <article key={action.id} className="rounded-lg border border-ink-200 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={actionVariant(action.due_label)}>{action.due_label || 'No due date'}</Badge>
                <Badge variant="outline">{action.importance}</Badge>
                <Badge variant="secondary">{action.audience_label}</Badge>
              </div>
              <h2 className="mt-3 font-bold text-ink-950">{action.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">{action.description}</p>
              {action.external_url && (
                <p className="mt-3 flex items-center gap-2 break-words text-sm font-bold text-falcon-700">
                  <ExternalLink size={15} />
                  {action.external_url}
                </p>
              )}
            </article>
          ))}
          <div className="rounded-lg bg-gold-100 p-3 text-sm leading-6 text-amber-950">
            <p className="flex items-center gap-2 font-bold">
              <AlertTriangle size={16} />
              Admin intent
            </p>
            <p className="mt-1">This is where staff would manage tasks that appear in the parent Action Center.</p>
          </div>
        </CardContent>
      </Card>
    </DemoAdminShell>
  )
}
