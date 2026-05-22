import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { redirect } from 'next/navigation'
import { LiveDataFallback } from '@/components/layout/live-data-fallback'
import { ParentShell } from '@/components/layout/parent-shell'
import { toggleVolunteerSignup } from '@/app/family-actions'
import { getVolunteerCenterResult } from '@/lib/data/volunteers'

export default async function VolunteersPage() {
  const volunteerCenter = await getVolunteerCenterResult()

  if (volunteerCenter.requiresSetup) {
    redirect('/profile?setup=1')
  }

  return (
    <ParentShell
      activeNav="volunteer"
      statusBadge={{
        label: volunteerCenter.source === 'supabase' ? 'Live Supabase' : 'Demo Fallback',
        tone: volunteerCenter.source === 'supabase' ? 'live' : 'fallback',
      }}
      banner={
        volunteerCenter.source === 'demo' && volunteerCenter.reason
          ? { text: `Volunteer is showing demo data. Reason: ${volunteerCenter.reason}`, tone: 'warning' }
          : null
      }
    >
      {volunteerCenter.source === 'supabase' ? (
        <VolunteerContent
          model={volunteerCenter.model}
          familyId={volunteerCenter.familyId}
          onToggleSignup={toggleVolunteerSignup}
          publishedSection={volunteerCenter.publishedSection}
          dataState={{ source: volunteerCenter.source, reason: volunteerCenter.reason }}
        />
      ) : (
        <LiveDataFallback
          title="Volunteer data unavailable"
          message={volunteerCenter.reason || 'Live volunteer slots could not be loaded right now.'}
        />
      )}
    </ParentShell>
  )
}
