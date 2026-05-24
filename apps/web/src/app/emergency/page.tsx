import { AlertTriangle, Mail, Phone, Shield, Users } from 'lucide-react'
import { ParentShell } from '@/components/layout/parent-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const emergencyContacts = [
  {
    role: 'Head Coach',
    name: 'Wayne Maxwell',
    phone: '(425) 555-0101',
    email: 'coach@woodinvillefootball.com',
  },
  {
    role: 'Team Secretary',
    name: 'Program Operations Contact',
    phone: '(425) 555-0102',
    email: 'secretary@woodinvillefootball.com',
  },
  {
    role: 'Athletic Trainer',
    name: 'Training Room',
    phone: '(425) 555-0103',
    email: 'trainer@woodinvillefootball.com',
  },
  {
    role: 'School Main Office',
    name: 'Woodinville High School',
    phone: '(425) 555-0104',
    email: 'office@woodinvillehs.edu',
  },
]

export default function EmergencyPage() {
  return (
    <ParentShell
      activeNav="more"
      statusBadge={{ label: 'Support and safety', tone: 'live' }}
    >
      <main className="mx-auto grid max-w-[460px] gap-6 px-4 py-6">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="destructive">Urgent guidance</Badge>
              <Badge variant="outline">Team contacts</Badge>
            </div>
            <p className="brand-kicker">Emergency</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">Urgent team contacts</h1>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              This is where families should be able to quickly confirm who to call for team-related urgent matters without searching through old emails.
            </p>
          </div>

          <Card className="border-statusRed-100 bg-red-50">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-statusRed-600" />
                <div>
                  <p className="font-bold text-red-900">For life-threatening emergencies</p>
                  <p className="mt-1 text-sm leading-6 text-red-900">
                    Call 911 first. Use the contacts below for program-related urgent updates, player pickup changes, practice issues, and time-sensitive team questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact list</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.role} className="rounded-lg border border-ink-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-falcon-50 text-falcon-700">
                      <Users size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold uppercase tracking-wide text-ink-500">{contact.role}</p>
                      <p className="mt-1 font-bold text-ink-950">{contact.name}</p>
                      <div className="mt-3 space-y-2 text-sm text-ink-700">
                        <p className="flex items-center gap-2">
                          <Phone size={14} className="text-falcon-700" />
                          {contact.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail size={14} className="text-falcon-700" />
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={`tel:${contact.phone}`}>
                      <Button size="sm">
                        <Phone size={14} className="mr-2" />
                        Call
                      </Button>
                    </a>
                    <a href={`mailto:${contact.email}`}>
                      <Button variant="outline" size="sm">
                        <Mail size={14} className="mr-2" />
                        Email
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="bg-falcon-50">
            <CardContent className="pt-4 sm:pt-5">
              <div className="flex gap-3">
                <Shield size={20} className="mt-0.5 shrink-0 text-falcon-700" />
                <div>
                  <p className="font-bold text-falcon-950">Why this matters in the app</p>
                  <p className="mt-1 text-sm leading-6 text-falcon-900">
                    Emergency and support information should live beside the family profile, not in a separate old page or buried website footer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </ParentShell>
  )
}
