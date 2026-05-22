import { HuddleHomeContent } from '@/components/huddle/huddle-home-content'
import { PreviewShell } from '@/components/layout/preview-shell'
import { getCurrentHuddleHomeResult } from '@/lib/data/huddles'

export default async function HuddlePreviewPage() {
  const huddleHome = await getCurrentHuddleHomeResult()

  return (
    <PreviewShell
      title="Huddle"
      subtitle="Preview mode"
      statusLabel={huddleHome.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
      statusTone={huddleHome.source === 'supabase' ? 'live' : 'fallback'}
      banner={huddleHome.reason && huddleHome.source === 'demo' ? `Preview is showing demo data. Reason: ${huddleHome.reason}` : undefined}
    >
      <HuddleHomeContent model={huddleHome.model} preview />
    </PreviewShell>
  )
}
