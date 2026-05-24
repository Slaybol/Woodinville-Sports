'use client'

import Link from 'next/link'
import { LogOut, Menu, ClipboardList, CalendarDays, Home, Users } from 'lucide-react'
import { IPhoneFrame } from '@/components/layout/iphone-frame'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

type ParentNavKey = 'huddle' | 'actions' | 'calendar' | 'volunteer' | 'more'

const navItems: Array<{
  key: ParentNavKey
  label: string
  href: string
  icon: typeof Home
}> = [
  { key: 'huddle', label: 'Huddle', href: '/', icon: Home },
  { key: 'actions', label: 'Actions', href: '/actions', icon: ClipboardList },
  { key: 'calendar', label: 'Calendar', href: '/schedule', icon: CalendarDays },
  { key: 'volunteer', label: 'Volunteer', href: '/volunteers', icon: Users },
  { key: 'more', label: 'More', href: '/more', icon: Menu },
]

interface ParentShellProps {
  activeNav: ParentNavKey
  children: React.ReactNode
  statusBadge?: {
    label: string
    tone?: 'live' | 'fallback'
  }
  banner?: {
    text: string
    tone?: 'warning'
  } | null
}

function statusTone(tone?: 'live' | 'fallback') {
  return tone === 'fallback'
    ? 'bg-gold-100 text-amber-950'
    : 'bg-falcon-100 text-falcon-900'
}

export function ParentShell({ activeNav, children, statusBadge, banner }: ParentShellProps) {
  const { user, profile, loading, signOut } = useAuth()

  return (
    <IPhoneFrame>
      <div className="flex h-full min-h-screen flex-col bg-ink-100 md:min-h-0">
        <header className="falcons-header z-30 shrink-0 border-b border-white/10 pt-0 md:pt-8">
          <div className="flex min-h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <WoodinvilleLogo size={40} priority />
              <div>
                <p className="font-display text-lg leading-none text-white">Gridiron Connect</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                  Woodinville Football Weekly Huddle
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {statusBadge && (
                <Badge className={`${statusTone(statusBadge.tone)} max-w-[130px] truncate`}>
                  {statusBadge.label}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="h-9 w-9 text-white hover:bg-white/10 hover:text-white"
                aria-label={loading ? 'Loading account' : `Sign out ${profile?.full_name || user?.email || 'account'}`}
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {banner && (
            <div className="px-4 pt-4">
              <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
                {banner.text}
              </div>
            </div>
          )}

          {children}
        </div>

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
