import Link from 'next/link'
import { WoodinvilleLogo } from '@/components/branding/woodinville-logo'
import { IPhoneFrame } from '@/components/layout/iphone-frame'
import { Card, CardContent } from '@/components/ui/card'

interface AuthShellProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footerLink?: {
    href: string
    label: string
  }
}

export function AuthShell({ title, subtitle, children, footerLink }: AuthShellProps) {
  return (
    <IPhoneFrame>
      <div className="flex h-full min-h-screen flex-col justify-center bg-ink-100 px-4 py-8 md:min-h-0 md:overflow-y-auto">
        <section className="w-full">
          <div className="pointer-events-none mb-6 text-center">
            <WoodinvilleLogo size={56} priority className="mx-auto mb-4 rounded-lg bg-white ring-white/60" />
            <p className="brand-kicker justify-center">Woodinville Football</p>
            <h1 className="mt-2 font-display text-4xl text-ink-950">Gridiron Connect</h1>
          </div>

          <Card className="overflow-hidden rounded-[24px] border-ink-200">
            <CardContent className="p-0">
              <div className="border-b border-ink-200 bg-white px-6 py-6">
                <p className="brand-kicker">Private access</p>
                <h2 className="mt-2 font-display text-3xl leading-none text-ink-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-600">{subtitle}</p>
              </div>
              <div className="bg-white px-6 py-6">
                {children}
                {footerLink && (
                  <div className="mt-5 text-center">
                    <Link href={footerLink.href} className="text-sm font-bold text-falcon-700 hover:text-falcon-800">
                      {footerLink.label}
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </IPhoneFrame>
  )
}
