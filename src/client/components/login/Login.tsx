"use client"
import { useRouter } from 'next/navigation'
import React, { MouseEventHandler, useEffect } from 'react'
import { toast } from 'react-toastify'
import { signIn, useSession } from "next-auth/react"

export default function LoginComponent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loggingIn, setLoggingIn] = React.useState(false)

  const handleLogin : MouseEventHandler = async (e) => {
    e.preventDefault()

    setLoggingIn(true)
    try {
      await signIn("google", { redirect: true })
    } catch (error) {
      console.error("Login failed:", error)
      toast.error("Login failed. Please try again.")
      setLoggingIn(false)
    }
  }

  useEffect(() => {
    if (status === "loading") return

    if (session?.user) {
      if (session.user.rollNumber && session.user.rollNumber.length > 1) {
        router.push('/')
      } else {
        router.push('/profile/update')
      }
    }
  }, [status, session, router])

  return (
    <div className="mt-32 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-orange-400 mb-2">
        Login to Orientation{' '}&apos; 25
      </h1>
      <p className="text-orange-200/80 mb-8 max-w-md">
        Sign in to access your student profile, register for events, and stay updated!
      </p>
      <button
        type="button"
        className="flex items-center gap-3 px-6 py-2 bg-orange-400 text-black font-semibold rounded-md shadow hover:bg-orange-500 transition"
        disabled={loggingIn}
        onClick={handleLogin}
      >
        <svg
          fill="currentColor"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
        </svg>
        {loggingIn ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  )
}
