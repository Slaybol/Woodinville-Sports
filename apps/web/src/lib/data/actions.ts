import type { ActionCenterModel } from '@gridiron/shared'
import { actionCenterDemo } from '@/lib/demo-data'

export async function getActionCenter(): Promise<ActionCenterModel> {
  return actionCenterDemo
}
