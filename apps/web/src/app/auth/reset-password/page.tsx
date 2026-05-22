'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthShell } from '@/components/layout/auth-shell'
import { Button } from '@/components/ui/button'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(() =>
    searchParams.get('token') ? '' : 'Invalid reset link. Please request a new password reset email.'
  )
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      setMessage('Password updated successfully. Redirecting to sign in...')
      setTimeout(() => {
        router.push('/auth')
      }, 1800)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Set New Password"
      subtitle="Choose a new password for your Gridiron Connect account."
      footerLink={{ href: '/auth', label: 'Back to Sign In' }}
    >
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-ink-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            required
            minLength={6}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold text-ink-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="rounded-md border border-statusRed-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-md border border-falcon-100 bg-falcon-50 px-3 py-2 text-sm text-falcon-900">
            {message}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </AuthShell>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-50" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
