import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { getVolunteerCenter } from '@/lib/data/volunteers'

export default async function VolunteersPage() {
  const volunteerCenter = await getVolunteerCenter()

  return <VolunteerContent model={volunteerCenter} />
}
