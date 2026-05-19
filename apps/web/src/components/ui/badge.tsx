import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex min-h-[22px] items-center rounded-full border px-2 text-xs font-bold leading-4 transition-colors focus:outline-none focus:ring-2 focus:ring-falcon-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-falcon-700 text-white',
        secondary:
          'border-transparent bg-ink-100 text-ink-700',
        destructive:
          'border-transparent bg-statusRed-100 text-statusRed-600',
        outline: 'border-ink-300 text-ink-700',
        warning:
          'border-transparent bg-gold-100 text-amber-900',
        success:
          'border-transparent bg-falcon-100 text-falcon-800',
        info:
          'border-transparent bg-statusBlue-100 text-statusBlue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
