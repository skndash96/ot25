"use client"
import CompleteProfile from '@/client/components/profile/CompleteProfile'
import useAuthGuard from '@/client/hooks/useAuthGuard'
import React from 'react'

export default function UpdateProfile() {
  useAuthGuard(false)

  return (
    <div>
      <CompleteProfile />
    </div>
  )
}
