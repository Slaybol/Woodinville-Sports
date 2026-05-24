import { AlertTriangle, Phone, Shield } from 'lucide-react'
import { DemoShell } from '@/components/layout/demo-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DemoEmergencyPage() {
  return (
    <DemoShell activeNav="more">
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="destructive">Urgent guidance</Badge>
            <Badge variant="outline">Static demo</Badge>
          </div>
          <p className="brand-kicker">Emergency</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Safety guidance</h1>
          <p className="mt-3 text-sm leading-6 text-ink-600">
            A consistent place for urgent contacts, practice changes, and safety escalation notes.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>What families should do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-ink-700">
            <div className="flex gap-3 rounded-lg bg-red-50 p-3 text-red-950">
              <AlertTriangle size={18} className="mt-1 shrink-0" />
              <p>For immediate danger or a medical emergency, call 911 first.</p>
            </div>
            <div className="flex gap-3 rounded-lg bg-ink-50 p-3">
              <Phone size={18} className="mt-1 shrink-0 text-falcon-700" />
              <p>Use coach or school contacts for urgent team-specific updates after immediate safety is addressed.</p>
            </div>
            <div className="flex gap-3 rounded-lg bg-falcon-50 p-3 text-falcon-950">
              <Shield size={18} className="mt-1 shrink-0" />
              <p>Future urgent alerts can pin emergency guidance above the Weekly Huddle.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </DemoShell>
  )
}
