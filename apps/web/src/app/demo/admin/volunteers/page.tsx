import { Users } from 'lucide-react'
import { DemoAdminShell } from '@/components/layout/demo-admin-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { demoVolunteerSlotsWithSummary } from '@/lib/demo-data'

export default function DemoAdminVolunteersPage() {
  return (
    <DemoAdminShell
      activeNav="volunteers"
      title="Volunteer Manager"
      description="Coach, secretary, and team-parent view for open roles, coverage gaps, and family hour tracking."
    >
      <Card>
        <CardHeader>
          <CardTitle>Open roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoVolunteerSlotsWithSummary.map((slot) => {
            const openSlots = Math.max(slot.slots_needed - slot.slots_filled, 0)

            return (
              <article key={slot.id} className="rounded-lg border border-ink-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{slot.category}</Badge>
                  <Badge variant={openSlots > 0 ? 'warning' : 'success'}>{openSlots} open</Badge>
                  <Badge variant="secondary">{slot.hour_credit} hr credit</Badge>
                </div>
                <h2 className="mt-3 font-bold text-ink-950">{slot.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-600">{slot.description || 'No description posted yet.'}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-600">
                  <p className="flex items-center gap-2">
                    <Users size={15} className="text-falcon-700" />
                    {slot.slots_filled} filled of {slot.slots_needed}
                  </p>
                  <p>{slot.display_date || 'Date TBD'}</p>
                  <p>{slot.location || 'Location TBD'}</p>
                </div>
              </article>
            )
          })}
        </CardContent>
      </Card>
    </DemoAdminShell>
  )
}
