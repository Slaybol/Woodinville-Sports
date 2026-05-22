import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LiveDataFallbackProps {
  title: string
  message: string
}

export function LiveDataFallback({ title, message }: LiveDataFallbackProps) {
  return (
    <main className="mx-auto max-w-[460px] px-4 py-6">
      <Card>
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-amber-950">
            <AlertTriangle size={18} />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-ink-600">{message}</p>
          <div className="flex flex-col gap-2">
            <Link href="/profile">
              <Button className="w-full">Review family profile</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">Return home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
