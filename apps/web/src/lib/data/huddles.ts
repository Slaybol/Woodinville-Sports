import type { HuddleHomeModel } from '@gridiron/shared'
import { huddleHomeDemo } from '@/lib/demo-data'

export async function getCurrentHuddleHome(): Promise<HuddleHomeModel> {
  return huddleHomeDemo
}
