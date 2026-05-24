import Link from 'next/link'
import { CalendarDays, ClipboardList, Home, Megaphone, MessageSquareText, MonitorSmartphone, Trophy, Users, UsersRound } from 'lucide-react'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type DemoAdminNavKey = 'dashboard' | 'huddles' | 'team' | 'families' | 'messages' | 'gameDay' | 'actions' | 'calendar' | 'volunteers'

const demoAdminNav: Array<{
  key: DemoAdminNavKey
  label: string
  href: string
  icon: typeof Home
}> = [
  { label: 'Dashboard', href: '/demo/admin', icon: Home, key: 'dashboard' },
  { label: 'Huddle', href: '/demo/admin', icon: Megaphone, key: 'huddles' },
  { label: 'Team', href: '/demo/admin/team', icon: UsersRound, key: 'team' },
  { label: 'Families', href: '/demo/admin/families', icon: Users, key: 'families' },
  { label: 'Messages', href: '/demo/admin/messages', icon: MessageSquareText, key: 'messages' },
  { label: 'Game Day', href: '/demo/admin/game-day', icon: Trophy, key: 'gameDay' },
  { label: 'Actions', href: '/demo/admin/actions', icon: ClipboardList, key: 'actions' },
  { label: 'Calendar', href: '/demo/admin/calendar', icon: CalendarDays, key: 'calendar' },
  { label: 'Volunteer', href: '/demo/admin/volunteers', icon: Users, key: 'volunteers' },
]

interface DemoAdminShellProps {
  activeNav: DemoAdminNavKey
  title: string
  description?: string
  children: React.ReactNode
}

export function DemoAdminShell({ activeNav, title, description, children }: DemoAdminShellProps) {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="falcons-header sticky top-0 z-50 border-b border-white/10">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <WoodinvilleLogo size={40} priority />
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Self-contained demo</p>
              <p className="mt-1 font-display text-2xl leading-none text-white">Gridiron Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="hidden bg-falcon-100 text-falcon-900 md:inline-flex">No Supabase</Badge>
            <Link href="/demo">
              <Button size="sm" className="bg-white text-falcon-900 hover:bg-falcon-50">
                <MonitorSmartphone size={15} className="mr-1" />
                Parent Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {demoAdminNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`flex h-10 items-center gap-2 rounded-md px-3 text-sm font-bold ${
                  item.key === activeNav ? 'bg-falcon-700 text-white' : 'text-ink-700 hover:bg-white hover:text-ink-950'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <section>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="success">Fast demo mode</Badge>
              <Badge variant="outline">Static data</Badge>
            </div>
            <p className="brand-kicker">Coach and secretary walkthrough</p>
            <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">{title}</h1>
            {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">{description}</p>}
          </section>

          {children}
        </main>
      </div>
    </div>
  )
}
