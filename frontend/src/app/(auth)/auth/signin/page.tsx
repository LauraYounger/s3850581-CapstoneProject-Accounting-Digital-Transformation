'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()

  const {
    user,
    loading,
    signInWithEmail,
    signInWithGoogle,
  } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('verification') === 'sent') {
      toast.success(
        'We sent a verification email to the provided email address. Please verify your email before proceeding.'
      )
    }
  }, [])

  if (loading) {
    return <FullPageSpinner />
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)

      toast.success('Log in successful')

      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes('email-not-verified')
      ) {
        toast.error(
          'Please verify your email address before attempting to sign in again.'
        )
      } else {
        toast.error('Invalid email address or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()

      router.replace('/team')
      router.refresh()
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#26282d] px-4 py-4">
      {/* Dotted background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(120,125,140,0.22)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Login card */}
      <section className="relative z-10 w-full max-w-[460px] rounded-2xl border border-zinc-700 bg-[#181a1f] px-7 py-7 shadow-2xl shadow-black/40">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 text-white"
            aria-hidden="true"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5 21a7 7 0 0 1 14 0" />
          </svg>
        </div>

        {/*Header for Sign in*/}
        <div className="mb-6 space-y-1 text-center">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-white">
            Welcome
          </h1>

          <p className="text-sm text-zinc-400">
            Sign in to your existing account.
          </p>
        </div>

        {/*Login form with email and password input fields*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email address user input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide text-zinc-400"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? 'email-error' : undefined
              }
              placeholder="youremail@example.com"
              className="h-[48px] w-full rounded-lg border border-zinc-700 bg-[#101114] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 aria-invalid:border-red-500"
              {...register('email')}
            />

            {errors.email && (
              <p
                id="email-error"
                className="text-xs text-red-400"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wide text-zinc-400"
              >
                Password
              </label>

              <Link
                href="/auth/reset-password"
                className="text-xs font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password
                  ? 'password-error'
                  : undefined
              }
              placeholder="••••••••"
              className="h-[48px] w-full rounded-lg border border-zinc-700 bg-[#101114] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-zinc-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 aria-invalid:border-red-500"
              {...register('password')}
            />

            {errors.password && (
              <p
                id="password-error"
                className="text-xs text-red-400"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-[48px] w-full items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/*Divider between login form and Google sign in button*/}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-700" />

          <span className="text-xs uppercase tracking-wider text-zinc-500">
            or
          </span>

          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        {/* Google connect login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-[#101114] px-4 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />

            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />

            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />

            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>

          Continue with Google
        </button>

        {/* Sign up registration link */}
        <p className="mt-5 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-400 transition hover:text-blue-300 hover:underline"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  )
}