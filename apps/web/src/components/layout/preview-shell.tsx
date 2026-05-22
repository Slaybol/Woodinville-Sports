import { Badge } from '@/components/ui/badge'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { IPhoneFrame } from '@/components/layout/iphone-frame'

interface PreviewShellProps {
  title: string
  subtitle: string
  statusLabel: string
  statusTone: 'live' | 'fallback'
  banner?: string
  children: React.ReactNode
}

function statusClass(tone: 'live' | 'fallback') {
  return tone === 'fallback'
    ? 'bg-gold-100 text-amber-950'
    : 'bg-falcon-100 text-falcon-900'
}

export function PreviewShell({
  subtitle,
  statusLabel,
  statusTone,
  banner,
  children,
}: PreviewShellProps) {
  return (
    <IPhoneFrame>
      <div className="flex h-full min-h-screen flex-col bg-ink-100 md:min-h-0">
        <header className="falcons-header z-30 shrink-0 border-b border-white/10 pt-0 md:pt-8">
          <div className="flex min-h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <WoodinvilleLogo size={40} priority />
              <div>
                <p className="font-display text-lg leading-none text-white">Gridiron Connect</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70">{subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-white/15 text-white">Preview mode</Badge>
              <Badge className={statusClass(statusTone)}>{statusLabel}</Badge>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {banner && (
            <div className="px-4 pt-4">
              <div className="rounded-lg border border-gold-100 bg-gold-100 px-4 py-3 text-sm text-amber-950">
                {banner}
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </IPhoneFrame>
  )
}
