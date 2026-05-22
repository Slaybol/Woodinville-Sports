import { ActionCenterContent } from '@/components/actions/action-center-content'
import { PreviewShell } from '@/components/layout/preview-shell'
import { getActionCenterResult } from '@/lib/data/actions'

export default async function ActionCenterPreviewPage() {
  const actionCenter = await getActionCenterResult()

  return (
    <PreviewShell
      title="Action Center"
      subtitle="Action Center preview"
      statusLabel={actionCenter.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
      statusTone={actionCenter.source === 'supabase' ? 'live' : 'fallback'}
      banner={actionCenter.reason && actionCenter.source === 'demo' ? `Preview is showing demo data. Reason: ${actionCenter.reason}` : undefined}
    >
      <ActionCenterContent model={actionCenter.model} preview />
    </PreviewShell>
  )
}
