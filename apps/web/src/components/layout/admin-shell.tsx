import Link from 'next/link'
import { CalendarDays, ClipboardList, Home, Megaphone, Users } from 'lucide-react'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: Home, key: 'dashboard' },
  { label: 'Huddle', href: '/admin/huddles/new', icon: Megaphone, key: 'huddles' },
  { label: 'Actions', href: '/admin/actions', icon: ClipboardList, key: 'actions' },
  { label: 'Calendar', href: '/admin/calendar', icon: CalendarDays, key: 'calendar' },
  { label: 'Volunteer', href: '/admin/volunteers', icon: Users, key: 'volunteers' },
] as const

interface AdminShellProps {
  activeNav: (typeof adminNav)[number]['key']
  title: string
  kicker?: string
  description?: string
  badge?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function AdminShell({
  activeNav,
  title,
  kicker = 'Operations',
  description,
  badge = 'Live Supabase',
  actions,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-ink-50">
      <header className="falcons-header sticky top-0 z-50 border-b border-white/10">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <WoodinvilleLogo size={40} priority />
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Woodinville Football</p>
              <p className="mt-1 font-display text-2xl leading-none text-white">Gridiron Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="hidden bg-white/15 text-white md:inline-flex">{badge}</Badge>
            {actions}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {adminNav.map((item) => (
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
          <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="brand-kicker">{kicker}</p>
              <h1 className="mt-2 font-display text-4xl leading-none text-ink-950">{title}</h1>
              {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600">{description}</p>}
            </div>
          </section>

          {children}
        </main>
      </div>
    </div>
  )
}

export function AdminPrimaryActionLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link href={href}>
      <Button size="sm" className="bg-white text-brandNavy-900 hover:bg-brandNavy-50">
        {label}
      </Button>
    </Link>
  )
}
