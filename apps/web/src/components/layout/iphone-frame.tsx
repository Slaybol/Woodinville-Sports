import { cn } from '@/lib/utils'

interface IPhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(220,235,220,0.85),_rgba(243,244,246,0.98)_38%,_rgba(232,236,242,1)_100%)]">
      <div className="mx-auto flex min-h-screen items-center justify-center px-0 md:px-6 md:py-12">
        <div className="w-full md:w-[430px]">
          <div
            data-testid="phone-frame"
            className={cn(
              'relative min-h-screen overflow-hidden bg-white md:h-[844px] md:min-h-0 md:rounded-[34px] md:border md:border-white/70 md:shadow-[0_28px_70px_rgba(17,24,39,0.16),0_8px_24px_rgba(17,24,39,0.08)] md:ring-1 md:ring-ink-950/6',
              className
            )}
          >
            <div
              data-testid="phone-frame-sheen"
              className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] md:block"
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
