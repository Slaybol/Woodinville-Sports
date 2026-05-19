'use client'

import Link from 'next/link'
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Home,
  Mail,
  Menu,
  Phone,
  Shield,
  User,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const players = [
  {
    name: 'Player Sabol',
    team: 'Varsity',
    grade: 'Class of 2027',
    status: 'Active',
  },
]

const checklist = [
  { label: 'FinalForms', status: 'Not started', tone: 'destructive' as const },
  { label: 'FGIC Membership', status: 'Past due', tone: 'destructive' as const },
  { label: 'CWU Camp', status: 'In progress', tone: 'warning' as const },
  { label: 'Contact Info', status: 'Complete', tone: 'success' as const },
]

const preferences = [
  'Urgent alerts',
  'Weekly Huddle published',
  'Action item due soon',
  'Event updates',
  'Volunteer reminders',
]

const navItems = [
  { label: 'Huddle', href: '/', icon: Home },
  { label: 'Actions', href: '/actions', icon: ClipboardList },
  { label: 'Calendar', href: '/schedule', icon: CalendarDays },
  { label: 'Volunteer', href: '/volunteers', icon: Users },
  { label: 'More', href: '/profile', icon: Menu },
]

export default function FamilyProfilePage() {
  return (
    <div className="min-h-screen bg-ink-50 pb-20 md:pb-0">
      <header className="falcons-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <p className="text-base font-bold leading-5">Family Profile</p>
              <p className="text-xs text-white/75">Players, contacts, and preferences</p>
            </div>
          </div>
          <Badge className="hidden bg-white/15 text-white md:inline-flex">Sabol family</Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <section className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline">Parent account</Badge>
              <Badge variant="success">1 linked player</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-9 text-ink-950">Sabol family</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
              Confirm the family and player details used for huddles, team targeting, calendar context, and notifications.
            </p>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Parent contacts</CardTitle>
                <p className="text-sm text-ink-600">Primary account details for family communication.</p>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-ink-200 p-3">
                <div className="mb-2 flex items-center gap-2 font-bold text-ink-950">
                  <User size={17} />
                  Toby Sabol
                </div>
                <p className="flex items-center gap-2 text-sm text-ink-600">
                  <Mail size={14} />
                  tobysabol@gmail.com
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-600">
                  <Phone size={14} />
                  Add phone number
                </p>
              </div>
              <div className="rounded-lg border border-dashed border-ink-300 p-3">
                <p className="font-bold text-ink-950">Add another guardian</p>
                <p className="mt-1 text-sm leading-5 text-ink-600">
                  Invite another parent or guardian to receive huddles and action reminders.
                </p>
                <Button size="sm" variant="outline" className="mt-3">Invite</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Linked players</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {players.map((player) => (
                <div key={player.name} className="flex flex-col gap-3 rounded-lg border border-ink-200 p-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-ink-950">{player.name}</h2>
                      <Badge variant="success">{player.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-ink-600">
                      {player.team} | {player.grade}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">View Player</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checklist status</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={17} className={item.tone === 'success' ? 'text-falcon-700' : 'text-ink-400'} />
                    <span className="font-bold text-ink-950">{item.label}</span>
                  </div>
                  <Badge variant={item.tone}>{item.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preferences.map((preference) => (
                <div key={preference} className="flex items-center justify-between rounded-lg border border-ink-200 p-3">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-falcon-700" />
                    <span className="text-sm font-bold text-ink-950">{preference}</span>
                  </div>
                  <span className="h-6 w-10 rounded-full bg-falcon-700 p-0.5">
                    <span className="ml-auto block h-5 w-5 rounded-full bg-white" />
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-statusRed-100 p-3">
                <div className="mb-1 flex items-center gap-2 font-bold text-statusRed-600">
                  <Shield size={16} />
                  Team-related urgent matters
                </div>
                <p className="text-sm leading-6 text-red-900">
                  For life-threatening emergencies, call 911 first. Team emergency contacts will appear here after setup.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                item.href === '/profile' ? 'text-falcon-700' : 'text-ink-500'
              }`}
            >
              <item.icon size={21} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
