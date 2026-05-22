import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { PreviewShell } from '@/components/layout/preview-shell'
import { getVolunteerCenterResult } from '@/lib/data/volunteers'

export default async function VolunteerPreviewPage() {
  const volunteerCenter = await getVolunteerCenterResult()

  return (
    <PreviewShell
      title="Volunteer"
      subtitle="Volunteer preview"
      statusLabel={volunteerCenter.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback'}
      statusTone={volunteerCenter.source === 'supabase' ? 'live' : 'fallback'}
      banner={volunteerCenter.reason && volunteerCenter.source === 'demo' ? `Preview is showing demo data. Reason: ${volunteerCenter.reason}` : undefined}
    >
      <VolunteerContent model={volunteerCenter.model} publishedSection={volunteerCenter.publishedSection} preview />
    </PreviewShell>
  )
}
