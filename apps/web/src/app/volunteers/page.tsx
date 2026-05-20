import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { toggleVolunteerSignup } from '@/app/family-actions'
import { getVolunteerCenterResult } from '@/lib/data/volunteers'

export default async function VolunteersPage() {
  const volunteerCenter = await getVolunteerCenterResult()

  return (
    <VolunteerContent
      model={volunteerCenter.model}
      familyId={volunteerCenter.familyId}
      onToggleSignup={toggleVolunteerSignup}
      publishedSection={volunteerCenter.publishedSection}
      dataState={{ source: volunteerCenter.source, reason: volunteerCenter.reason }}
    />
  )
}
