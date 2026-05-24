'use client'

import Link from 'next/link'
import { CalendarDays, ClipboardList, Home, Menu, Monitor, UserRound, Users } from 'lucide-react'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { IPhoneFrame } from '@/components/layout/iphone-frame'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type DemoNavKey = 'huddle' | 'actions' | 'calendar' | 'volunteer' | 'more'

const navItems: Array<{
  key: DemoNavKey
  label: string
  href: string
  icon: typeof Home
}> = [
  { key: 'huddle', label: 'Huddle', href: '/demo', icon: Home },
  { key: 'actions', label: 'Actions', href: '/demo/actions', icon: ClipboardList },
  { key: 'calendar', label: 'Calendar', href: '/demo/schedule', icon: CalendarDays },
  { key: 'volunteer', label: 'Volunteer', href: '/demo/volunteers', icon: Users },
  { key: 'more', label: 'More', href: '/demo/more', icon: Menu },
]

interface DemoShellProps {
  activeNav: DemoNavKey
  children: React.ReactNode
  roleLabel?: string
}

export function DemoShell({ activeNav, children, roleLabel = 'Parent demo' }: DemoShellProps) {
  return (
    <IPhoneFrame>
      <div className="flex h-full min-h-screen flex-col bg-ink-100 md:min-h-0">
        <header className="falcons-header z-30 shrink-0 border-b border-white/10 pt-0 md:pt-8">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4">
            <div className="flex min-w-0 items-center gap-3">
              <WoodinvilleLogo size={40} priority />
              <div className="min-w-0">
                <p className="truncate font-display text-lg leading-none text-white">Gridiron Connect</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70">Self-contained demo</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Badge className="hidden bg-falcon-100 text-falcon-900 sm:inline-flex">{roleLabel}</Badge>
              <Link href="/demo/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Switch to coach demo"
                >
                  <Monitor size={16} />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Switch to parent demo"
                >
                  <UserRound size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">{children}</div>

        <nav className="shrink-0 border-t border-ink-200 bg-white">
          <div className="grid h-16 grid-cols-5">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
                  item.key === activeNav ? 'text-falcon-700' : 'text-ink-500'
                }`}
              >
                <item.icon size={21} />
                <span className="font-bold">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </IPhoneFrame>
  )
}
