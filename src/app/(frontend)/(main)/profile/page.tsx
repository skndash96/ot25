'use client'
import useAuthGuard from '@/client/hooks/useAuthGuard'
import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { generateAndDownloadIDCard } from '@/client/utils/qrcode'
import Image from 'next/image'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [attendance, setAttendance] = React.useState<
    {
      id: string
      timestamp: string
      event: { id: string; title: string; type: string }
      manager: string
    }[]
  >([])

  const user = useMemo(() => {
    return session?.user || null
  }, [session])

  useAuthGuard()

  const fetchAttendance = async () => {
    try {
      const res = await fetch('/api/attendance')
      const { data } = await res.json()
      setAttendance(data)
    } catch (error) {
      toast.error('Failed to fetch attendance records. Please try again.')
      console.error('Failed to fetch attendance records:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchAttendance()
    }
  }, [user])

  const handleDownload = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/qr')
      const { token } = await res.json()

      if (!token) {
        throw new Error('Failed to generate QR code token')
      }

      if (!user) {
        throw new Error('No user data available for profile download')
      }

      await generateAndDownloadIDCard(user, token)
    } catch (error) {
      console.error('Failed to download profile:', error)
      toast.error('Failed to download profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut({ redirect: false })
      router.push('/login')
    } catch (error) {
      toast.error('Logout failed. Please try again.')
      console.error('Logout failed:', error)
      setLoggingOut(false)
    }
  }

  if (status === 'loading') {
    return <div className="mt-20 text-center text-amber-300">Loading profile...</div>
  }

  if (!user) {
    return <div className="mt-20 text-center text-amber-300">No profile data found.</div>
  }

  return (
    <div className="px-6 pt-10 text-amber-200">
      <div className="w-full max-w-sm mx-auto bg-neutral-900 rounded-xl shadow-md p-8 border border-amber-600">
        <div className="flex gap-4 justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-amber-400">Profile</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-amber-300 hover:text-amber-400 hover:bg-neutral-700 grid place-items-center w-8 h-8 rounded-full">
              <svg
                fill="currentColor"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-900 border border-neutral-700">
              <DropdownMenuItem asChild>
                <Link
                  href="/profile/update"
                  className="text-amber-300 focus:text-amber-300 focus:bg-neutral-800"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-amber-300 focus:text-amber-300 focus:bg-neutral-800"
              >
                {loggingOut ? 'Logging out...' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Avatar */}
        <div className="w-32 h-32 relative border border-amber-400 mx-auto flex justify-center mb-8 rounded-full overflow-hidden">
          {user.image ? (
            <Image className="" fill src={user.image} alt="Profile Picture" />
          ) : (
            <div className="bg-amber-400 text-black text-2xl font-bold grid place-items-center">
              {user.name
                ?.split(' ')
                .slice(0, 2)
                .map((word) => word[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Grid Info */}
        <div className="text-amber-200">
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <p className="text-sm text-amber-300/80">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <p className="text-sm text-amber-300/80">Roll Number</p>
            <p className="text-lg font-semibold">{user.rollNumber}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <p className="text-sm text-amber-300/80">Department</p>
            <p className="text-lg font-semibold">{user.department}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <p className="text-sm text-amber-300/80">Gender</p>
            <p className="text-lg font-semibold capitalize">{user.gender}</p>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <p className="text-sm text-amber-300/80">Phone</p>
            <p className="text-lg font-semibold">{user.phoneNumber}</p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button
            disabled={loading}
            onClick={handleDownload}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition"
          >
            {loading ? 'Downloading...' : 'Download Profile'}
          </button>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="w-full max-w-4xl mx-auto mt-8 bg-neutral-900 rounded-xl shadow-md p-8 border border-amber-600">
        <h2 className="text-2xl font-bold text-amber-400 mb-6">Attendance Records</h2>
        
        {attendance.length === 0 ? (
          <div className="text-center text-amber-300/70 py-8">
            <p>No attendance records found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {attendance.map((record) => (
              <div
                key={record.id}
                className="bg-neutral-800 rounded-lg p-4 border border-amber-600/30 hover:border-amber-600/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-amber-300 font-semibold text-lg mb-1">
                      {record.event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-amber-200/80">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Manager: {record.manager}
                      </span>
                    </div>
                  </div>
                  <div className="text-amber-300/90 text-sm font-medium">
                    {new Date(record.timestamp).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}