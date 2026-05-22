import { cn } from '@/lib/utils'

interface IPhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(220,235,220,0.9),_rgba(243,244,246,1)_55%)]">
      <div className="mx-auto flex min-h-screen items-center justify-center px-0 md:px-6 md:py-10">
        <div className="w-full md:w-[430px]">
          <div
            className={cn(
              'relative min-h-screen bg-ink-100 md:h-[844px] md:min-h-0 md:overflow-hidden md:rounded-[42px] md:border-[10px] md:border-ink-950 md:shadow-[0_32px_80px_rgba(17,24,39,0.28)]',
              className
            )}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden justify-center md:flex">
              <div className="mt-3 h-7 w-40 rounded-full bg-ink-950" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
