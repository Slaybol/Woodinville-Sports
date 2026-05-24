import Image from 'next/image'
import { cn } from '@/lib/utils'

interface WoodinvilleLogoProps {
  size?: number
  className?: string
  priority?: boolean
}

export function WoodinvilleLogo({
  size = 48,
  className,
  priority = false,
}: WoodinvilleLogoProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-white/95 ring-1 ring-white/25',
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/woodinville-w-logo.png"
        alt="Woodinville Football logo"
        fill
        priority={priority}
        unoptimized
        sizes={`${size}px`}
        className="object-contain p-0.5"
      />
    </div>
  )
}
