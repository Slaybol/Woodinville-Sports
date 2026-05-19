import type { VolunteerCenterModel } from '@gridiron/shared'
import { volunteerCenterDemo } from '@/lib/demo-data'

export async function getVolunteerCenter(): Promise<VolunteerCenterModel> {
  return volunteerCenterDemo
}
