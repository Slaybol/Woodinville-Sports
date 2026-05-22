'use client'

import { useState } from 'react'
import { AuthShell } from '@/components/layout/auth-shell'
import { Button } from '@/components/ui/button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage('Password reset link sent. Check your email for the next step.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Enter the email you use for Gridiron Connect and we’ll send a reset link."
      footerLink={{ href: '/auth', label: 'Back to Sign In' }}
    >
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-ink-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-md border border-ink-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-falcon-500"
            required
            placeholder="Enter your email address"
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
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </AuthShell>
  )
}
