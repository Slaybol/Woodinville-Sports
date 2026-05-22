import { ActionCenterContent } from '@/components/actions/action-center-content'
import { redirect } from 'next/navigation'
import { LiveDataFallback } from '@/components/layout/live-data-fallback'
import { ParentShell } from '@/components/layout/parent-shell'
import { updateFamilyActionStatus } from '@/app/family-actions'
import { getActionCenterResult } from '@/lib/data/actions'

export default async function ActionCenterPage() {
  const actionCenter = await getActionCenterResult()

  if (actionCenter.requiresSetup) {
    redirect('/profile?setup=1')
  }

  return (
    <ParentShell
      activeNav="actions"
      statusBadge={{
        label: actionCenter.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback',
        tone: actionCenter.source === 'supabase' ? 'live' : 'fallback',
      }}
      banner={
        actionCenter.source === 'demo' && actionCenter.reason
          ? { text: `Action Center is showing demo data. Reason: ${actionCenter.reason}`, tone: 'warning' }
          : null
      }
    >
      {actionCenter.source === 'supabase' ? (
        <ActionCenterContent
          model={actionCenter.model}
          onUpdateStatus={updateFamilyActionStatus}
          dataState={{ source: actionCenter.source, reason: actionCenter.reason }}
        />
      ) : (
        <LiveDataFallback
          title="Action Center unavailable"
          message={actionCenter.reason || 'Your live family action items could not be loaded right now.'}
        />
      )}
    </ParentShell>
  )
}
