import { ActionCenterContent } from '@/components/actions/action-center-content'
import { getActionCenter } from '@/lib/data/actions'

export default async function ActionCenterPage() {
  const actionCenter = await getActionCenter()

  return <ActionCenterContent model={actionCenter} />
}
