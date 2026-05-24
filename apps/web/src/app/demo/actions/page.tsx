import { ActionCenterContent } from '@/components/actions/action-center-content'
import { DemoShell } from '@/components/layout/demo-shell'
import { actionCenterDemo } from '@/lib/demo-data'

export default function DemoActionsPage() {
  return (
    <DemoShell activeNav="actions">
      <ActionCenterContent
        model={actionCenterDemo}
        preview
        dataState={{ source: 'demo', reason: 'Self-contained demo data. No Supabase request is made.' }}
      />
    </DemoShell>
  )
}
