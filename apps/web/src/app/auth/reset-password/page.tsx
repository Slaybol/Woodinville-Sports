'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Check if we have the reset token in the URL
    const token = searchParams.get('token')
    if (!token) {
      setError('Invalid reset link. Please try again.')
    }
  }, [searchParams])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      if (!mounted) return

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setMessage('Password updated successfully!')
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Woodinville Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Woodinville Sports</h1>
          <p className="text-gray-600">Falcons Football • Gridiron Connect</p>
        </div>

        <Card className="falcons-card">
          <CardHeader>
            <CardTitle className="text-center text-gray-900">
              Set New Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full falcons-button"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/auth" className="text-green-600 hover:text-green-800 text-sm">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For Woodinville High School Falcons Football families</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
