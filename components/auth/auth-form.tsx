'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AuthMode = 'signin' | 'signup' | 'verify'

interface AuthFormProps {
  onAuthSuccess: () => void
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [verificationEmail, setVerificationEmail] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setVerificationEmail(email)
      setMode('verify')
      setMessage({
        type: 'success',
        text: 'Check your email for the verification link!',
      })
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to sign up',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user && !data.user.email_confirmed_at) {
        setMessage({
          type: 'error',
          text: 'Please verify your email before signing in. Check your inbox.',
        })
        setMode('verify')
        setVerificationEmail(email)
        return
      }

      onAuthSuccess()
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to sign in',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: verificationEmail || email,
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Verification email sent! Check your inbox.',
      })
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to resend verification email',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="title-solo-leveling text-3xl mb-2">
            <span>SOLO</span>
            <span className="title-line-2">LEVELING</span>
          </h1>
          <p className="text-text-secondary text-sm">Shadow Monarch System</p>
        </div>

        {mode === 'verify' ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-text-primary mb-2">Email Verification Required</p>
              <p className="text-text-secondary text-sm">
                We sent a verification link to <strong>{verificationEmail || email}</strong>
              </p>
            </div>
            <Button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full"
              variant="outline"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </Button>
            <Button
              onClick={() => {
                setMode('signin')
                setMessage(null)
              }}
              className="w-full"
              variant="ghost"
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => {
                  setMode('signin')
                  setMessage(null)
                }}
                variant="ghost"
                className={`flex-1 transition-all ${
                  mode === 'signin'
                    ? 'bg-primary/30 backdrop-blur-md text-white border-2 border-primary/50 shadow-lg shadow-primary/20 hover:bg-primary/40'
                    : 'text-text-primary hover:bg-primary/10'
                }`}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setMode('signup')
                  setMessage(null)
                }}
                variant="ghost"
                className={`flex-1 transition-all ${
                  mode === 'signup'
                    ? 'bg-primary/30 backdrop-blur-md text-white border-2 border-primary/50 shadow-lg shadow-primary/20 hover:bg-primary/40'
                    : 'text-text-primary hover:bg-primary/10'
                }`}
              >
                Sign Up
              </Button>
            </div>

            <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hunter@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="mt-1"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === 'success'
                      ? 'bg-success/20 text-success border border-success/50'
                      : 'bg-danger/20 text-danger border border-danger/50'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-primary text-white hover:bg-primary/90">
                {loading ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
