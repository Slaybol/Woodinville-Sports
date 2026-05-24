import { cn } from '@/lib/utils'

interface WoodinvilleLogoProps {
  size?: number
  className?: string
  priority?: boolean
}

export function WoodinvilleLogo({
  size = 48,
  className,
}: WoodinvilleLogoProps) {
  const fontSize = Math.round(size * 0.62)

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-md border border-white/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Woodinville Football logo"
      role="img"
    >
      <span
        className="select-none font-black uppercase italic leading-none text-[#148000]"
        style={{
          fontSize,
          fontFamily: 'Georgia, Times New Roman, serif',
          textShadow:
            '-1.5px 0 #142457, 0 1.5px #142457, 1.5px 0 #142457, 0 -1.5px #142457, -1px -1px #142457, 1px -1px #142457, -1px 1px #142457, 1px 1px #142457',
          transform: 'translateY(-2%) scaleX(1.04)',
        }}
      >
        W
      </span>
    </div>
  )
}
