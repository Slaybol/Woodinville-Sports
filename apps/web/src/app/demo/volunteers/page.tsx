import { DemoShell } from '@/components/layout/demo-shell'
import { VolunteerContent } from '@/components/volunteer/volunteer-content'
import { demoFamily, volunteerCenterDemo } from '@/lib/demo-data'

export default function DemoVolunteersPage() {
  return (
    <DemoShell activeNav="volunteer">
      <VolunteerContent
        model={volunteerCenterDemo}
        preview
        familyId={demoFamily.id}
        dataState={{ source: 'demo', reason: 'Self-contained demo data. No Supabase request is made.' }}
      />
    </DemoShell>
  )
}
