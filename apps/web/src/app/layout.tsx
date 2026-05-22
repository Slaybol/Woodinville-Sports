import type { Metadata } from 'next'
import { Abel, Alice, Oswald } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'

const abel = Abel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sans',
})

const alice = Alice({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-editorial',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Woodinville Sports - Gridiron Connect',
  description: 'Woodinville High School Falcons Football Communication Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${abel.variable} ${alice.variable} ${oswald.variable} font-sans`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
