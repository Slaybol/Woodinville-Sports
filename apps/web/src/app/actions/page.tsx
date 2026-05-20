import { ActionCenterContent } from '@/components/actions/action-center-content'
import { updateFamilyActionStatus } from '@/app/family-actions'
import { getActionCenterResult } from '@/lib/data/actions'

export default async function ActionCenterPage() {
  const actionCenter = await getActionCenterResult()

  return (
    <ActionCenterContent
      model={actionCenter.model}
      onUpdateStatus={updateFamilyActionStatus}
      dataState={{ source: actionCenter.source, reason: actionCenter.reason }}
    />
  )
}
