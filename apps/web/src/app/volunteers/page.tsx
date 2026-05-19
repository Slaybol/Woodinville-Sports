import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { getVolunteerCenterResult } from '@/lib/data/volunteers'

export default async function VolunteersPage() {
  const volunteerCenter = await getVolunteerCenterResult()

  return <VolunteerContent model={volunteerCenter.model} dataState={{ source: volunteerCenter.source, reason: volunteerCenter.reason }} />
}
